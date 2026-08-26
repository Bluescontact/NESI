#!/usr/bin/env python3
"""
THE GATE — backend. One owned tool, Python standard library only.

No pip, no npm, no CDN, no cloud. The only dependency is the Python
runtime itself — which is the point: own what you depend on (GROUND).

It STAGES and DISPLAYS. It never CLOSES. The mark happens off-panel,
from the body, as an act; this tool only RECORDS that a mark already
happened. There is, by law, no "approve" verb.

The four laws are enforced here, not just described:
  1. GROUND          — `build` inlines the data into a static HTML file
                       that renders with everything unplugged.
  2. NO-CLOSE        — there is no verb that decides. `mark`/`hold`/
                       `compost` record an act you already took.
  3. DISPLACED-ZERO  — `validate()` REFUSES to build if any item carries
                       a score/verdict/recommendation, or if a Body gauge
                       carries anything but a log. The tool will not
                       display the thing that decides.
  4. SUBTRACTION     — nothing hard-deletes. `compost` is a status; the
                       record stays (a wrongly-composted pattern returns).
                       `stats` reports when a panel's removal test is met.

Usage:
  python gate.py build [--live]      # regenerate the snapshot (or fetch variant)
  python gate.py serve [--host H] [--port P]
  python gate.py daemon [--interval N] [--no-serve]   # persistent: keep snapshot+gauge fresh, serve panel
  python gate.py stage <queue|tray|gauges> --json '<obj>'
  python gate.py mark   <queue|tray> <#|substring>     # record the mark (act)
  python gate.py hold   <queue|tray> <#|substring>
  python gate.py compost<queue|tray> <#|substring>     # status, never deletion
  python gate.py consent <gauge-substring>             # record a leak consented by name
  python gate.py stats                                 # counts, pile rule, removal-test flags
  python gate.py show                                  # print current state, no decisions

Deploying this to oursharedgifts.org (repo push + public auth hardening)
is the gate-holder's hand, not this tool's. See README.
"""

import sys, json, html, http.server, socketserver, secrets, hmac, argparse, datetime, threading, signal, os
from pathlib import Path
from urllib.parse import urlparse, parse_qs

# Terminal output must never die on Unicode that lives in the data (em-dashes,
# arrows). The canonical artifact is the HTML; the console is a convenience.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT      = Path(__file__).resolve().parent
DATA      = ROOT / "data" / "gate_data.json"
TEMPLATE  = ROOT / "template.html"
SNAPSHOT  = ROOT / "THE_GATE.html"
LIVE      = ROOT / "THE_GATE.live.html"
MUTATIONS = ROOT / "data" / "mutations.jsonl"   # append-only audit; nothing hard-deletes
HISTORY   = ROOT / "data" / "count_history.jsonl"
TOKENFILE = ROOT / "data" / ".gate_token"       # single-user secret (gitignored)
DAEMON_PID = ROOT / "data" / ".gate_daemon"     # daemon heartbeat/pid (gitignored); presence = a service is running

PANELS = {"queue": "felt_read_queue", "tray": "staging_tray", "gauges": "ledger_gauges"}

ALLOWED_STATUS = {"staged", "held", "marked", "composted"}
ALLOWED_SIZE   = {"small", "medium", "large"}
# DISPLACED-ZERO: fields that would let the panel decide. Their presence fails the build.
FORBIDDEN = {"recommendation", "recommend", "score", "verdict", "decision",
             "ratify", "approve", "felt_read_outcome", "should"}


# ── store ────────────────────────────────────────────────────────────────────
def load():
    return json.loads(DATA.read_text(encoding="utf-8"))

def save(d):
    DATA.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def today():
    return datetime.date.today().isoformat()

def now():
    return datetime.datetime.now().isoformat(timespec="seconds")

def log_mutation(action, panel, target, frm, to):
    rec = {"ts": now(), "action": action, "panel": panel,
           "target": target, "from": frm, "to": to}
    with MUTATIONS.open("a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")


# ── law 3 guard ──────────────────────────────────────────────────────────────
def validate(d):
    """Refuse to proceed if the data would make the panel decide. Fail closed."""
    errs = []
    for key in ("felt_read_queue", "staging_tray"):
        for it in d.get(key, []):
            for f in FORBIDDEN:
                if f in it:
                    errs.append(f"DISPLACED-ZERO: {key} item '{it.get('title','?')}' carries '{f}'")
            st = it.get("status")
            if st not in ALLOWED_STATUS:
                errs.append(f"status '{st}' not in {sorted(ALLOWED_STATUS)} ({it.get('title','?')})")
            ms = it.get("mark_size")
            if ms is not None and ms not in ALLOWED_SIZE:
                errs.append(f"mark_size '{ms}' not in {sorted(ALLOWED_SIZE)} ({it.get('title','?')})")
    for g in d.get("ledger_gauges", []):
        is_body = g.get("type") == "body" or g.get("name", "").strip().lower() == "body"
        if is_body:
            # The Body gauge has no widget; only its log may ever appear.
            illegal = [k for k in g if k not in ("name", "type", "log")]
            if illegal:
                errs.append("DISPLACED-ZERO: the Body gauge may carry only a log, "
                            f"never {illegal}")
        for f in FORBIDDEN:
            if f in g:
                errs.append(f"DISPLACED-ZERO: gauge '{g.get('name','?')}' carries '{f}'")
    if errs:
        raise SystemExit("BUILD REFUSED - four-laws guard:\n  - " + "\n  - ".join(errs))


# ── law 1: build the static, offline-legible snapshot ────────────────────────
def build(live=False):
    d = load()
    validate(d)
    tpl = TEMPLATE.read_text(encoding="utf-8")
    if not live:
        payload = json.dumps(d, indent=2, ensure_ascii=False)
        out = tpl.replace("__GATE_DATA__", payload)
        SNAPSHOT.write_text(out, encoding="utf-8")
        return SNAPSHOT
    # live variant: data comes from the authed API; wrap the single inline
    # script in an async IIFE so the top-level await is legal.
    payload = "await (await fetch('/api/gate',{credentials:'include'})).json()"
    out = tpl.replace("__GATE_DATA__", payload)
    head, _, rest = out.partition("<script>")
    body, _, tail = rest.rpartition("</script>")
    out = head + "<script>\n(async()=>{\n" + body + "\n})();\n</script>" + tail
    LIVE.write_text(out, encoding="utf-8")
    return LIVE


# ── mutations (record acts; never decide) ────────────────────────────────────
def _find(lst, ident):
    if ident.isdigit():
        i = int(ident) - 1
        if 0 <= i < len(lst):
            return i
        raise SystemExit(f"no item #{ident} (panel holds {len(lst)})")
    hits = [i for i, it in enumerate(lst) if ident.lower() in it.get("title", "").lower()]
    if not hits:
        raise SystemExit(f"no item matching '{ident}'")
    if len(hits) > 1:
        raise SystemExit("ambiguous '{}': {}".format(
            ident, [lst[i]["title"] for i in hits]))
    return hits[0]

def set_status(panel, ident, new):
    if panel not in ("queue", "tray"):
        raise SystemExit("mark/hold/compost apply to queue or tray")
    d = load()
    lst = d[PANELS[panel]]
    i = _find(lst, ident)
    old = lst[i].get("status", "?")
    lst[i]["status"] = new
    save(d)
    log_mutation("status", panel, lst[i]["title"], old, new)
    build()
    print(f"recorded: '{lst[i]['title']}'  {old} -> {new}")
    print("  (the mark itself was yours, off-panel. this only writes it down.)")

def stage(panel, obj):
    d = load()
    obj.setdefault("status", "staged")
    d[PANELS[panel]].append(obj)
    save(d)
    log_mutation("stage", panel, obj.get("title", "?"), None, obj["status"])
    build()
    print(f"staged into {panel}: '{obj.get('title','?')}'")

def consent(ident):
    d = load()
    for gge in d["ledger_gauges"]:
        if ident.lower() in gge["name"].lower():
            gge.setdefault("leak", {})["consented"] = True
            gge["state"] = "CONSENTED — IN LEDGER"
            gge["state_class"] = "green"
            save(d)
            log_mutation("consent", "gauges", gge["name"], "unconsented", "consented")
            build()
            print(f"recorded: leak '{gge['name']}' consented by name.")
            print("  (your felt-read entered it. this writes the entry, it does not make it.)")
            return
    raise SystemExit(f"no gauge matching '{ident}'")


# ── apply: mechanical delta ingestion, schema-tolerant ────────────────────────
# Built 2026-08-25 on Kevin's mark ("gate py needs to be routed appropriately
# without kevin manually routing") — the daily-cycle skill's own instructions
# describe `gate.py apply <delta>`, but no such command ever existed; every
# delta since needed hand-merging, which stopped happening after 07-30 and
# left 71 files unapplied. This closes the gap mechanically. It does NOT
# remove the felt gate: apply still only runs the merge for a delta a human
# points it at (or --all, which still prints a dry-run report first — see
# ON OPEN step 1c's own amendment, "the apply/skip decision stays felt and
# his"). What changes is that "yes, apply" now maps to one real command
# instead of an ad-hoc hand-merge nobody actually did at scale.
TRAY_KEYS  = ("staging_tray_additions", "staging_tray_add", "staging_tray")
QUEUE_KEYS = ("felt_read_queue_additions", "felt_read_queue_add", "felt_read_queue")
COMPOST_KEYS = ("compost_ledger_additions", "compost_ledger_add", "compost_ledger")
TRAY_FIELDS  = {"title", "class", "note", "status"}
QUEUE_FIELDS = {"title", "origin", "mark_size", "changes", "status"}

def _first_present(dd, keys):
    for k in keys:
        v = dd.get(k)
        if v:
            return v, k
    return None, None

def _clean(obj, allowed):
    """Keep only panel-legal fields — never carry a delta's own verdict/
    recommendation language into the gate (DISPLACED-ZERO, law 3)."""
    if isinstance(obj, str):
        return {"title": obj}
    return {k: v for k, v in obj.items() if k in allowed}

def inventory_delta(path):
    """Read-only: what a delta proposes, and whether it's already present.
    This is the mining/inventory pass — writes nothing."""
    dd = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    if dd.get("_meta", {}).get("applied") is True:
        return {"path": str(path), "already_applied": True, "tray": [], "queue": [], "compost": []}
    d = load()
    existing_titles = ({it.get("title","") for it in d["staging_tray"]}
                        | {it.get("title","") for it in d["felt_read_queue"]})
    tray_raw, _  = _first_present(dd, TRAY_KEYS)
    queue_raw, _ = _first_present(dd, QUEUE_KEYS)
    compost_raw, _ = _first_present(dd, COMPOST_KEYS)
    def mark(items):
        out = []
        for it in (items or []):
            title = it if isinstance(it, str) else it.get("title", "?")
            out.append({"title": title, "already_present": title in existing_titles})
        return out
    return {
        "path": str(path),
        "already_applied": False,
        "date": dd.get("date") or dd.get("staged") or dd.get("delta_date") or "?",
        "session": dd.get("session") or dd.get("slug") or dd.get("delta_slug") or "?",
        "tray": mark(tray_raw),
        "queue": mark(queue_raw),
        "compost": [c if isinstance(c, str) else c.get("title","?") for c in (compost_raw or [])],
    }

def apply_delta(path, dry_run=False):
    """Merge one delta's genuinely-new items into gate_data.json. Dedupes by
    exact title. Never applies a decision — only routes what a prior session
    already staged, through the same stage()/log_mutation() path a hand-typed
    `gate.py stage` would use."""
    inv = inventory_delta(path)
    if inv["already_applied"]:
        print(f"skip (already applied): {path}")
        return
    new_tray  = [t for t in inv["tray"]  if not t["already_present"]]
    new_queue = [q for q in inv["queue"] if not q["already_present"]]
    print(f"{path}  [{inv['date']}]  {inv['session']}")
    print(f"  tray: {len(new_tray)} new / {len(inv['tray'])} proposed")
    print(f"  queue: {len(new_queue)} new / {len(inv['queue'])} proposed")
    print(f"  compost lines: {len(inv['compost'])}")
    if dry_run:
        for t in new_tray:  print(f"    + tray  : {t['title']}")
        for q in new_queue: print(f"    + queue : {q['title']}")
        return
    dd = json.loads(Path(path).read_text(encoding="utf-8"))
    tray_raw, _  = _first_present(dd, TRAY_KEYS)
    queue_raw, _ = _first_present(dd, QUEUE_KEYS)
    compost_raw, _ = _first_present(dd, COMPOST_KEYS)
    existing = {t["title"] for t in inv["tray"] if t["already_present"]} | \
               {q["title"] for q in inv["queue"] if q["already_present"]}
    for it in (tray_raw or []):
        obj = _clean(it, TRAY_FIELDS)
        if obj.get("title") in existing: continue
        obj.setdefault("class", "restore")
        obj.setdefault("note", f"applied from {Path(path).name}, staged {inv['date']}")
        stage("tray", obj)
    for it in (queue_raw or []):
        obj = _clean(it, QUEUE_FIELDS)
        if obj.get("title") in existing: continue
        obj.setdefault("mark_size", "medium")
        obj.setdefault("origin", f"applied from {Path(path).name}, staged {inv['date']}")
        stage("queue", obj)
    if compost_raw:
        d = load()
        for c in compost_raw:
            line = c if isinstance(c, str) else json.dumps(c, ensure_ascii=False)
            if line not in d["compost_ledger"]:
                d["compost_ledger"].append(line)
        save(d)
        log_mutation("stage", "compost_ledger", f"{len(compost_raw)} line(s)", None, "composted")
    dd["_meta"] = dd.get("_meta", {})
    dd["_meta"]["applied"] = True
    dd["_meta"]["applied_ts"] = now()
    dd["_meta"]["superseded_by"] = f"Merged live into gate_data.json via gate.py apply on {today()}."
    Path(path).write_text(json.dumps(dd, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"  applied. {path} marked _meta.applied=true.")


# ── law 4: subtraction reporting (mechanical only; no felt outcomes) ─────────
def stats():
    d = load()
    counts = {
        "queue": len(d["felt_read_queue"]),
        "tray":  len(d["staging_tray"]),
        "gauges": len(d["ledger_gauges"]),
    }
    # append a reading; apply the pile rule (red if any count grew two reads running)
    prev = []
    if HISTORY.exists():
        prev = [json.loads(l) for l in HISTORY.read_text(encoding="utf-8").splitlines() if l.strip()]
    grew_twice = False
    if len(prev) >= 2:
        a, b = prev[-2]["counts"], prev[-1]["counts"]
        grew_twice = any(counts[k] > b.get(k, 0) > a.get(k, 0) for k in counts)
    with HISTORY.open("a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": now(), "counts": counts}, ensure_ascii=False) + "\n")
    for gge in d["ledger_gauges"]:
        if gge["name"].lower().startswith("pile"):
            gge["reading"] = (f"spine {gge.get('_spine','14')} · hold {gge.get('_hold','5')} · "
                              f"queue {counts['queue']} · tray {counts['tray']}")
            gge["state"] = "GROWING" if grew_twice else "SHRINKING"
            gge["state_class"] = "red" if grew_twice else "green"
    save(d)
    build()
    print("counts:", counts, "| pile:", "GROWING (two reads running)" if grew_twice else "shrinking/steady")
    _removal_flags()

def _removal_flags():
    """Print, mechanically, where a panel's printed removal test may be met."""
    if not MUTATIONS.exists():
        print("removal tests: no mutation history yet.")
        return
    muts = [json.loads(l) for l in MUTATIONS.read_text(encoding="utf-8").splitlines() if l.strip()]
    last = {}
    for m in muts:
        last[m["panel"]] = m["ts"]
    tray_ts = last.get("tray")
    if tray_ts:
        days = (datetime.datetime.now() - datetime.datetime.fromisoformat(tray_ts)).days
        if days >= 30:
            print(f"SUBTRACTION flag: staging tray idle {days}d (removal test: 30d). "
                  "ask why the work stopped staging.")


def show():
    d = load()
    print(f"THE GATE - staged {d.get('staged','?')}  (display only; nothing decides here)\n")
    print("FELT-READ QUEUE")
    for i, it in enumerate(d["felt_read_queue"], 1):
        print(f"  {i:02d}  [{it['status']}/{it.get('mark_size','?')}] {it['title']}")
    print("\nSTAGING TRAY")
    for it in d["staging_tray"]:
        print(f"   ·  [{it['status']}] {it['title']}")
    print("\nLEDGER GAUGES")
    for g in d["ledger_gauges"]:
        print(f"   ·  {g['name']}: {g.get('state','(log-only)')}")
    print("\nthe mark is not collected here. the reaching is not the mark.")


# ── law 1+2: the convenience server (single-user, fail-closed, no UI writes) ──
def _token():
    if TOKENFILE.exists():
        return TOKENFILE.read_text(encoding="utf-8").strip()
    tok = secrets.token_urlsafe(32)
    TOKENFILE.write_text(tok, encoding="utf-8")
    return tok

def _make_server(host="127.0.0.1", port=8787):
    """Build the snapshot, construct the single-user fail-closed server.
    GROUND: the snapshot is canonical; the server is only a convenience."""
    tok = _token()
    build()  # snapshot current before first request

    class H(http.server.BaseHTTPRequestHandler):
        def _authed(self):
            # single user. token via Authorization: Bearer, ?key=, or cookie. fail closed.
            given = ""
            auth = self.headers.get("Authorization", "")
            if auth.startswith("Bearer "):
                given = auth[7:]
            q = parse_qs(urlparse(self.path).query)
            if not given and "key" in q:
                given = q["key"][0]
            if not given:
                for c in self.headers.get("Cookie", "").split(";"):
                    if c.strip().startswith("gate="):
                        given = c.strip()[5:]
            return bool(given) and hmac.compare_digest(given, tok)

        def _deny(self):
            self.send_response(401)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write("401 — single-user gate, fail closed. append ?key=<token>.".encode("utf-8"))

        def log_message(self, *a):  # quiet
            pass

        def do_GET(self):
            if not self._authed():
                return self._deny()
            path = urlparse(self.path).path
            if path in ("/", "/index.html"):
                body = SNAPSHOT.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                # set cookie so the offline snapshot stays reachable after ?key
                q = parse_qs(urlparse(self.path).query)
                if "key" in q:
                    self.send_header("Set-Cookie", f"gate={tok}; HttpOnly; SameSite=Strict; Path=/")
                self.end_headers()
                self.wfile.write(body)
            elif path == "/api/gate":
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(DATA.read_bytes())
            else:
                self.send_response(404); self.end_headers()

        def do_POST(self):
            if not self._authed():
                return self._deny()
            path = urlparse(self.path).path
            n = int(self.headers.get("Content-Length", 0) or 0)
            raw = self.rfile.read(n).decode("utf-8") if n else "{}"
            try:
                payload = json.loads(raw or "{}")
            except json.JSONDecodeError:
                self.send_response(400); self.end_headers(); return
            try:
                # write API mirrors the CLI verbs. NO close/approve verb exists.
                if path == "/api/stage":
                    stage(payload["panel"], payload["item"])
                elif path in ("/api/mark", "/api/hold", "/api/compost"):
                    set_status(payload["panel"], str(payload["ident"]),
                               {"/api/mark": "marked", "/api/hold": "held",
                                "/api/compost": "composted"}[path])
                elif path == "/api/consent":
                    consent(payload["gauge"])
                else:
                    self.send_response(404); self.end_headers(); return
            except SystemExit as e:
                self.send_response(409)
                self.send_header("Content-Type", "text/plain"); self.end_headers()
                self.wfile.write(str(e).encode("utf-8")); return
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self.end_headers()
            self.wfile.write(b'{"ok":true,"note":"recorded; snapshot rebuilt. the mark was yours."}')

    httpd = socketserver.TCPServer((host, port), H)
    return httpd, tok


def serve(host="127.0.0.1", port=8787):
    httpd, tok = _make_server(host, port)
    print(f"THE GATE - http://{host}:{port}  (single-user, fail-closed, localhost)")
    print(f"  token: data/.gate_token   open:  http://{host}:{port}/?key={tok}")
    print( "  writes are session/CLI-facing only - the panel has no buttons, by law (NO-CLOSE).")
    print( "  public deployment (HTTPS, secure cookies, oursharedgifts) is the gate-holder's hand.")
    with httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped. last snapshot is still legible offline (GROUND).")


def _safe_build(tag="daemon"):
    """Build, but never let a bad hand-edit kill the loop. Fail closed: keep the last good snapshot."""
    try:
        build(); return True
    except SystemExit as e:
        print(f"[{tag}] BUILD REFUSED (four-laws guard) - last good snapshot kept:\n{e}")
        return False


def daemon(host="127.0.0.1", port=8787, interval=60, serve_panel=True):
    """The persistent gate daemon (Kevin's architecture mark, 2026-06-09).

    A long-running, single-user, localhost process that keeps the canonical
    snapshot fresh (rebuild on data change) and the pile-gauge current (a daily
    stats tick), and optionally serves the read-only panel.

    It honours the four laws unchanged: it NEVER marks (NO-CLOSE); it validates
    before every build and fails closed, keeping the last good snapshot
    (DISPLACED-ZERO); it never deletes (SUBTRACTION). GROUND holds even here -
    the static snapshot stays the canonical artifact, so if this process dies
    the last snapshot still renders with everything unplugged. This is a
    *running service*; by DARK_GATE it is among the services stopped when the
    gate-holder goes permanently dark.
    """
    stop = threading.Event()
    def _shutdown(*_):
        stop.set()
    signal.signal(signal.SIGINT, _shutdown)
    try:
        signal.signal(signal.SIGTERM, _shutdown)
    except (ValueError, AttributeError, OSError):
        pass  # SIGTERM not always settable (platform / non-main-thread)

    DAEMON_PID.write_text(json.dumps(
        {"pid": os.getpid(), "started": now(), "host": host, "port": port,
         "note": "presence = the gate daemon is running. removed on clean stop."},
        ensure_ascii=False), encoding="utf-8")

    _safe_build()  # current the snapshot at startup, fail-closed

    httpd = None
    if serve_panel:
        try:
            httpd, tok = _make_server(host, port)
            threading.Thread(target=httpd.serve_forever, daemon=True).start()
            print(f"[daemon] panel: http://{host}:{port}/?key={tok}  (single-user, fail-closed)")
        except OSError as e:
            print(f"[daemon] panel not started ({e}); maintenance loop continues. GROUND: snapshot still canonical.")

    try:
        last_mtime = DATA.stat().st_mtime
    except OSError:
        last_mtime = 0
    last_stats_day = today()
    print(f"[daemon] running. pid {os.getpid()}. interval {interval}s. panel {'on' if serve_panel else 'off'}.")
    print( "[daemon] GROUND: if this dies, the last snapshot still renders unplugged.")
    print( "[daemon] NO-CLOSE: this process never marks. the mark is always yours, off-panel.")
    print( "[daemon] stop: Ctrl-C, or kill the pid in data/.gate_daemon. DARK_GATE stops it in the dark.")

    while not stop.wait(interval):
        try:
            m = DATA.stat().st_mtime
        except OSError:
            continue
        if m != last_mtime:
            if _safe_build():
                last_mtime = m
                print(f"[daemon] data changed -> snapshot rebuilt {now()}")
        if today() != last_stats_day:
            try:
                stats()
            except SystemExit as e:
                print(f"[daemon] stats refused (four-laws guard): {e}")
            last_stats_day = today()

    if httpd:
        httpd.shutdown()
    try:
        DAEMON_PID.unlink()
    except OSError:
        pass
    print("[daemon] stopped. last snapshot legible offline (GROUND). pidfile cleared.")


# ── cli ──────────────────────────────────────────────────────────────────────
def main(argv):
    p = argparse.ArgumentParser(prog="gate", description="THE GATE — stages, never closes.")
    sub = p.add_subparsers(dest="cmd", required=True)

    b = sub.add_parser("build"); b.add_argument("--live", action="store_true")
    s = sub.add_parser("serve"); s.add_argument("--host", default="127.0.0.1"); s.add_argument("--port", type=int, default=8787)
    dm = sub.add_parser("daemon"); dm.add_argument("--host", default="127.0.0.1"); dm.add_argument("--port", type=int, default=8787); dm.add_argument("--interval", type=int, default=60); dm.add_argument("--no-serve", action="store_true")
    st = sub.add_parser("stage"); st.add_argument("panel", choices=PANELS); st.add_argument("--json", required=True, dest="obj")
    for verb in ("mark", "hold", "compost"):
        v = sub.add_parser(verb); v.add_argument("panel", choices=("queue", "tray")); v.add_argument("ident")
    c = sub.add_parser("consent"); c.add_argument("ident")
    sub.add_parser("stats")
    sub.add_parser("show")
    ap = sub.add_parser("apply"); ap.add_argument("delta", nargs="?"); ap.add_argument("--all", action="store_true"); ap.add_argument("--dry-run", action="store_true")

    a = p.parse_args(argv)
    if a.cmd == "build":
        out = build(live=a.live); print(f"built: {out.name}")
    elif a.cmd == "serve":
        serve(a.host, a.port)
    elif a.cmd == "daemon":
        daemon(a.host, a.port, a.interval, not a.no_serve)
    elif a.cmd == "stage":
        stage(a.panel, json.loads(a.obj))
    elif a.cmd in ("mark", "hold", "compost"):
        set_status(a.panel, a.ident, {"mark": "marked", "hold": "held", "compost": "composted"}[a.cmd])
    elif a.cmd == "consent":
        consent(a.ident)
    elif a.cmd == "stats":
        stats()
    elif a.cmd == "show":
        show()
    elif a.cmd == "apply":
        if a.all:
            for f in sorted((ROOT / "data").glob("_delta_*.json")):
                try:
                    apply_delta(f, dry_run=a.dry_run)
                except Exception as e:
                    print(f"ERROR reading {f}: {e}")
                print()
        elif a.delta:
            apply_delta(Path(a.delta), dry_run=a.dry_run)
        else:
            raise SystemExit("apply needs a delta path or --all")

if __name__ == "__main__":
    main(sys.argv[1:])
