#!/usr/bin/env python3
"""
whats_up.py — Tool 2: "Where things stand," always fresh.

A one-glance dashboard over core.py's own state() and marks.jsonl — the same
data NESI.md tries to hold by hand, except this reads it live instead of
being written once and going stale the moment anything changes.

No new data. No new pipeline. Reads what core.py and the mark ledger already
produce; prints a plain summary.

Usage:
    python nesi/conductor/whats_up.py
"""

import json
import os
import sys

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, THIS_DIR)

import core  # noqa: E402


def _tail_marks(n=5):
    if not core.MARKLOG.exists():
        return []
    lines = core.MARKLOG.read_text(encoding="utf-8").splitlines()
    out = []
    for line in lines[-n:]:
        try:
            out.append(json.loads(line))
        except Exception:
            pass
    return out


def _fmt_mark(m):
    verdict = m.get("verdict") or m.get("annotation") or "?"
    pile = m.get("pile", m.get("id", "?"))
    cond = f"  (until {m['condition']})" if m.get("condition") else ""
    return f"{m.get('ts', '?')}  {verdict:<10} {pile}{cond}"


def main():
    st = core.state()
    marks = _tail_marks(5)

    print()
    print("=" * 60)
    print(f"NESI - where things stand   ({st['ts']})")
    print(f"engine: {st['engine']}")
    print("=" * 60)

    print(f"\nINBOX - {len(st['inbox'])} item(s) not yet run through the organ:")
    if not st["inbox"]:
        print("  (empty)")
    for item in st["inbox"]:
        print(f"  - {item['name']}  ({item['bytes']} bytes)")

    awaiting = [s for s in st["staged"] if not (s.get("mark") or {}).get("verdict")]
    marked = [s for s in st["staged"] if (s.get("mark") or {}).get("verdict")]

    print(f"\nSTAGED, AWAITING YOUR MARK - {len(awaiting)}:")
    if not awaiting:
        print("  (nothing waiting)")
    for s in awaiting:
        obj = s.get("object") or {}
        summary = obj.get("summary", "")[:70]
        print(f"  - {s['id']}   {summary}")

    print(f"\nALREADY MARKED (this run) - {len(marked)} of {len(st['staged'])} staged total")

    print(f"\nLAST {len(marks)} MARKS (from marks.jsonl):")
    if not marks:
        print("  (no marks recorded yet)")
    for m in marks:
        print(f"  - {_fmt_mark(m)}")

    print()


if __name__ == "__main__":
    main()
