#!/usr/bin/env python3
"""OPEN_GATES.jsonl - the durable ledger of open gates (Boundary 4, Kevin's mark 2026-07-30 22:01).

A gate = anything a session leaves pointed at Kevin: a manifest holding, a
body-question unanswered, a surface awaiting marks. Sessions die; gates don't.

  python tools/gates.py open  --gate "<text>" --source <session/slug>
  python tools/gates.py close --match "<substring>" [--why "<text>"]
  python tools/gates.py status          # one line for the floor indicator

Same append-only discipline as marks.py: close never deletes, it appends a
closure line; status derives, never stores (derive-don't-store).
"""
import argparse, json, sys, io
from datetime import datetime
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
LOG = Path(__file__).resolve().parent.parent / "OPEN_GATES.jsonl"

def _read():
    if not LOG.exists(): return []
    return [json.loads(l) for l in LOG.read_text(encoding="utf-8").splitlines() if l.strip()]

def _append(rec):
    with LOG.open("a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")

def _open_gates(rows):
    latest = {}
    for r in rows:
        latest[r["gate"]] = r
    return [r for r in latest.values() if r["event"] == "open"]


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


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    o = sub.add_parser("open");  o.add_argument("--gate", required=True); o.add_argument("--source", default="")
    # An edge is declared where it is NOTICED, never in a mapping pass (Kevin's mark
    # 2026-08-06). A gate is already the record that names what is being waited on,
    # so this is the most natural of the three places --blocks lives.
    o.add_argument("--blocks", action="append", default=None,
                   help="id/text of an open thing this gate blocks; repeatable")
    c = sub.add_parser("close"); c.add_argument("--match", required=True); c.add_argument("--why", default="")
    sub.add_parser("status")
    a = p.parse_args()
    now = datetime.now().isoformat(timespec="seconds")

    if a.cmd == "open":
        _append({"ts": now, "event": "open", "gate": a.gate, "source": a.source,
                 "blocks": _parse_edges(getattr(a, "blocks", None))})
        print(f"[gate] open: {a.gate[:70]}")
    elif a.cmd == "close":
        rows = _read()
        hits = [r for r in _open_gates(rows) if a.match.lower() in r["gate"].lower()]
        if not hits:
            print(f"[gate] no open gate matches: {a.match}"); return
        for r in hits:
            _append({"ts": now, "event": "close", "gate": r["gate"], "why": a.why})
            print(f"[gate] closed: {r['gate'][:70]}")
    else:
        gates = _open_gates(_read())
        print(f"[gates] {len(gates)} open")
        for r in sorted(gates, key=lambda x: x["ts"]):
            print(f"  {r['ts'][5:16]}  {r['gate'][:88]}")

if __name__ == "__main__":
    main()
