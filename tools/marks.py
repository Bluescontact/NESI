#!/usr/bin/env python3
"""
marks.py — the fail-safe brake + the floor indicator for Kevin's marks.

THE FAIL-SAFE BRAKE ("de-energize to engage"): a mark is caught durably the instant
it is received, BEFORE anything acts on it. The clipboard is a single point of failure
(it died in the pane 2026-07-22); MARKS_LOG.jsonl is the brake that holds when the
clipboard fails. Append-only. The safe state (the mark is recorded) is the default.

THE FLOOR INDICATOR ("you always see the car's real position"): `status` derives a
one-line readout of what recent marks DID — logged / acted / crossed — read live from
MARKS_LOG + membrane/transition_records (derive-not-store, per the 2026-07-22 boundary).
The author puts this line in L0 of every widget so Kevin never guesses whether a mark took.

Scope: writes only MARKS_LOG.jsonl (a peer ledger). NEVER patterns/ or crossing records.

THE ACT VALVE (added 2026-07-30, Kevin's mark — "build the valve"): the log had a
one-way defect: acted-state entered as pending and could never be written back, so
the discharge shore silted (172/195 OPEN at build time). `act` closes a mark WITHOUT
violating append-only: it appends an overlay record {"act_of": <ts>, "mark_key": ...,
"acted": ...} and readers DERIVE the current acted-state (derive-not-store). The
original catch line is never touched. Fail-close: no match or ambiguous match = no write.

Usage:
  python tools/marks.py catch --mark "PROMOTE: X" --source kevin [--acted "crossed X"]
  python tools/marks.py status [--n 5]      # the floor-indicator line for L0
  python tools/marks.py act --ts 2026-07-25T16:15 --acted "evidence of discharge" [--match "substring"]
  python tools/marks.py act --batch overlays.jsonl   # many closures at once (Kevin-marked batches)
"""
import json, os, sys, argparse, datetime, glob, re

# 2026-08-16: compost had never fired once in 1068 marks. It was not unused — it
# CRASHED, UnicodeEncodeError on cp1252, at the first mark containing "→". His own
# punctuation killed the only subtraction organ in the system, silently, every time.
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass

ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG    = os.path.join(ROOT, "MARKS_LOG.jsonl")
RECORDS= os.path.join(ROOT, "membrane", "transition_records")

def _now():
    return datetime.datetime.now().isoformat(timespec="seconds")

def _norm(s):
    return re.sub(r'[^a-z0-9]+', '', (s or '').lower())

def _crossing_index():
    idx = {}
    for j in glob.glob(os.path.join(RECORDS, "*.json")):
        base = os.path.basename(j)[:-5]
        aid = base
        try:
            aid = json.load(open(j, encoding='utf-8')).get('artifact_id', base)
        except Exception:
            pass
        idx[_norm(aid)] = base
    return idx


def _parse_edges(vals):
    """An edge may arrive as a bare id or as a JSON object {"to":..., "rel":...}.

    The named form is the one that matters (Kevin's naming 2026-08-06: the relation
    IS the naming), and it has to survive a trip through the shell, so it comes in as
    a JSON string. A value that does not parse as an object stays a bare id — the old
    form is never rejected, only understood as relation "blocks".
    """
    out = []
    for v in vals or []:
        if isinstance(v, dict):
            out.append(v); continue
        s = str(v).strip()
        if s.startswith("{"):
            try:
                d = json.loads(s)
                if isinstance(d, dict) and d.get("to"):
                    out.append({"to": str(d["to"]), "rel": str(d.get("rel") or "blocks")})
                    continue
            except Exception:
                pass
        out.append(s)
    return out


def catch(mark, source, acted, ts=None, blocks=None):
    entry = {"ts": ts or _now(), "mark": mark, "source": source or "kevin", "acted": acted}
    # Declared in the same call that catches the mark, when the dependency is already
    # in view. Absent means no edge, never an unknown edge — nothing is inferred.
    if blocks:
        entry["blocks"] = _parse_edges(blocks)
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print(f"[brake] caught: {entry['ts']} · {mark[:70]}" + (f"  (acted: {acted})" if acted else "  (acted: pending)"))
    return entry


# --------------------------------------------------------------------- compost
# Kevin's mark, 2026-08-06: "extend the compost window to marks too."
#
# A mark not acted on degrades the same way a decision not held does. The rate is
# read from the SAME authority the decisions ledger keeps — a `compost_rate` event
# on DECISIONS_OFFERED.jsonl — so there is one window for the whole system and no
# second number to drift. Change it in one place with:
#     python tools/decisions.py compost --set-rate N
#
# What compost is NOT: deletion. The mark stays in MARKS_LOG forever, whole. A
# `composted` record is appended beside it (append-only, nothing rewritten), which
# stops it being reported as standing and turns it into readable soil. It fed the
# tree; it goes back to the tree.
DECISIONS_LEDGER_PATH = os.path.join(ROOT, "DECISIONS_OFFERED.jsonl")
DEFAULT_COMPOST_DAYS = 7
NL = chr(10)


def _parse_ts(x):
    for cut in (19, 16, 10):
        try:
            return datetime.datetime.fromisoformat((x or "")[:cut])
        except Exception:
            continue
    return None


def _compost_window():
    """(days, clock_start) — read from the decisions ledger, the single authority."""
    days, start = DEFAULT_COMPOST_DAYS, None
    if not os.path.exists(DECISIONS_LEDGER_PATH):
        return days, start
    for line in open(DECISIONS_LEDGER_PATH, encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        try:
            r = json.loads(line)
        except Exception:
            continue
        if r.get("event") == "compost_rate":
            try:
                days = int(r.get("days"))
            except Exception:
                pass
            if start is None:
                start = _parse_ts(r.get("ts"))
    return days, start


def compost(dry_run=False, do_list=False, limit=20):
    raw = _read_raw()
    composted = {m.get("composts") for m in raw if m.get("composts")}
    acted = {m.get("act_of") for m in raw if m.get("act_of")}

    if do_list:
        rows = [m for m in raw if m.get("event") == "composted"]
        print(f"[compost] {len(rows)} mark(s) composted — kept whole, feeding back")
        for m in rows[-limit:]:
            print(f"  [{m.get('ts','')[:16]}] {str(m.get('mark',''))[:100]}")
        return 0

    days, start = _compost_window()
    if start is None:
        print("[compost] DENY — no rate has ever been set, so the clock has never "
              "started. Run `python tools/decisions.py compost --set-rate 7` first.")
        return 1

    now = datetime.datetime.now()
    standing = [m for m in raw
                if m.get("mark") and not m.get("act_of") and not m.get("acted")
                and m.get("ts") not in acted and m.get("ts") not in composted
                and m.get("event") != "composted"]

    due = []
    for m in standing:
        offered = _parse_ts(m.get("ts"))
        if offered is None:
            continue
        clock = max(offered, start)          # nothing composts on age it had before the rule
        age = (now - clock).days
        if age >= days:
            due.append((m, age))

    print(f"[compost] marks · window {days}d · clock started {start.date()} · "
          f"{len(standing)} standing · {len(due)} past the window")
    if not due:
        if standing:
            soonest = min(max(_parse_ts(m.get('ts')) or now, start) for m in standing)
            print(f"[compost] nothing drops yet — the oldest standing mark composts in "
                  f"{max(0, days - (now - soonest).days)} day(s)")
        return 0

    for m, age in due:
        print(f"  {'would compost' if dry_run else 'composted'} · {age}d · {str(m.get('mark',''))[:90]}")
    if dry_run:
        print("[compost] --dry-run: nothing written")
        return 0

    ts = _now()
    with open(LOG, "a", encoding="utf-8") as f:
        for m, age in due:
            f.write(json.dumps({
                "ts": ts, "event": "composted", "composts": m.get("ts"),
                "mark": m.get("mark"), "age_days": age,
                "reason": f"unacted past the {days}-day window",
                "source": "compost_rate",
            }, ensure_ascii=False) + NL)
    print(f"[compost] {len(due)} mark(s) dropped — kept whole in MARKS_LOG, feeding back. "
          f"Read them with `marks.py compost --list`.")
    return 0


def _read_raw():
    if not os.path.exists(LOG):
        return []
    out = []
    for line in open(LOG, encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        try:
            out.append(json.loads(line))
        except Exception:
            pass
    return out

def _key(ts, mark):
    return ts + "|" + (mark or "")[:40]

def _read_log():
    """Base catch entries with act-overlays resolved (derive-not-store)."""
    base, overlays = [], {}
    for r in _read_raw():
        if "act_of" in r:
            overlays[_key(r["act_of"], r.get("mark_key", ""))] = r
        else:
            base.append(r)
    for r in base:
        ov = overlays.get(_key(r["ts"], r.get("mark", "")))
        if ov:
            r["acted"] = ov.get("acted")
            r["acted_ts"] = ov.get("ts")
    return base

def _find_open(ts_prefix, match):
    rows = _read_log()
    hits = [r for r in rows
            if r["ts"].startswith(ts_prefix)
            and (not match or match.lower() in r.get("mark", "").lower())]
    return hits

def act(ts_prefix, acted, match=None, source="kevin"):
    """Append an overlay closing one mark. Fail-close on 0 or >1 matches."""
    if not acted or not acted.strip():
        print("[valve] DENY — empty acted evidence; nothing written")
        return False
    hits = _find_open(ts_prefix, match)
    if len(hits) == 0:
        print(f"[valve] DENY — no mark matches ts~{ts_prefix}" + (f" + \"{match}\"" if match else "") + "; nothing written")
        return False
    if len(hits) > 1:
        print(f"[valve] DENY — {len(hits)} marks match; disambiguate with --match. Nothing written. Candidates:")
        for h in hits[:6]:
            print(f"    {h['ts']} · {h['mark'][:60]}")
        return False
    r = hits[0]
    ov = {"ts": _now(), "act_of": r["ts"], "mark_key": r["mark"][:40], "acted": acted, "source": source}
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(ov, ensure_ascii=False) + "\n")
    print(f"[valve] closed: {r['ts']} · {r['mark'][:56]}")
    print(f"        acted: {acted[:80]}")
    return True

def act_batch(path, source="kevin"):
    """Apply many closures from a jsonl of {ts, match?, acted}. Each row fail-closes independently."""
    ok = deny = 0
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        try:
            row = json.loads(line)
        except Exception:
            print(f"[valve] DENY — unparseable row skipped: {line[:60]}")
            deny += 1
            continue
        if act(row.get("ts", ""), row.get("acted", ""), row.get("match"), source):
            ok += 1
        else:
            deny += 1
    print(f"[valve] batch done: {ok} closed · {deny} denied (denied rows need disambiguation or evidence)")

def status(n):
    rows = _read_log()
    total = len(rows)
    recent = rows[-n:]
    xr = _crossing_index()
    if not recent:
        print("no marks logged yet")
        return
    # per-mark landed state: acted set → acted; else if a slug in the mark matches a crossing record → crossed; else logged
    def landed(r):
        if r.get("acted"):
            return "acted"
        n_mark = _norm(r.get("mark", ""))
        for k in xr:
            if len(k) >= 6 and k in n_mark:
                return "crossed"
        return "logged"
    last = recent[-1]
    line = "  ".join(f"{r['ts'][11:16]} {landed(r)}:{r['mark'][:32]}" for r in recent)
    print(f"[floor] {total} marks logged · last: {last['ts'][11:16]} \"{last['mark'][:48]}\" [{landed(last)}]")
    print(f"[recent] {line}")

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("catch")
    c.add_argument("--mark", required=True)
    c.add_argument("--source", default="kevin")
    c.add_argument("--acted", default=None)
    c.add_argument("--ts", default=None)
    c.add_argument("--blocks", action="append", default=None,
                   help="id/text of an open thing this mark blocks; repeatable")
    s = sub.add_parser("status")
    s.add_argument("--n", type=int, default=5)
    k = sub.add_parser("compost")
    k.add_argument("--dry-run", action="store_true")
    k.add_argument("--list", action="store_true")
    k.add_argument("--limit", type=int, default=20)
    v = sub.add_parser("act")
    v.add_argument("--ts", default=None)
    v.add_argument("--match", default=None)
    v.add_argument("--acted", default=None)
    v.add_argument("--source", default="kevin")
    v.add_argument("--batch", default=None)
    a = ap.parse_args()
    if a.cmd == "catch":
        catch(a.mark, a.source, a.acted, a.ts, getattr(a, "blocks", None))
    elif a.cmd == "compost":
        return compost(a.dry_run, a.list, a.limit)
    elif a.cmd == "status":
        status(a.n)
    elif a.cmd == "act":
        if a.batch:
            act_batch(a.batch, a.source)
        elif a.ts:
            act(a.ts, a.acted, a.match, a.source)
        else:
            print("[valve] DENY — need --ts (with --acted) or --batch; nothing written")

if __name__ == "__main__":
    main()
