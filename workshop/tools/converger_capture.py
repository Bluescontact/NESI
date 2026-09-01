#!/usr/bin/env python3
"""
converger_capture.py — the session-native Converger-pass record.

THE GAP THIS CLOSES (2026-07-25, the keeper's mark, "the converger needs a
reimagining"): membrane-controller Condition 1 (amended 2026-07-20) made
"the Converger ran" machine-verifiable by requiring a producing-pass record
(substrate brief / workflow record / GATE delta) on disk. That check has no
path for a Converger pass the keeper writes himself, directly, in chat — a DREAM /
DEVELOPMENT / CONVERGER block ending "yours to mark." The safeguard against
Claude self-attesting accidentally erased the keeper's own authorship as a valid
pass: both looked like silence to a grep.

This tool is the fix, scoped narrowly: it captures a Converger pass VERBATIM,
at the moment it happens, bound to the keeper's own words — never a paraphrase or
summary an agent could fabricate. It is deliberately NOT part of marks.py:
marks.py's own docstring reserves it to MARKS_LOG.jsonl only ("NEVER patterns/
or crossing records"); a second peer ledger for a second record type keeps
that boundary intact rather than smuggling scope into an existing tool.

Binding rule (load-bearing, checked by the tool, not just documented):
source MUST be "the keeper". A capture with any other source is refused — this
record type exists to prove the keeper did the converging himself; anything else
reopens the self-attestation hole Condition 1 was built to close.

Usage:
  python tools/converger_capture.py capture --item "no_completion_function" \
      --text "<verbatim Converger-pass text, the keeper's own words>" \
      --source the keeper
  python tools/converger_capture.py list
"""
import json, os, sys, argparse, datetime, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR  = os.path.join(ROOT, "membrane", "converger_passes")

def _now():
    return datetime.datetime.now().isoformat(timespec="seconds")

def _slug(s):
    return re.sub(r'[^a-z0-9]+', '-', (s or '').lower()).strip('-')[:60]

def capture(item, text, source, pile_count=None, landing=None):
    if source != "the keeper":
        print(f"[converger-capture] REFUSED — source must be 'the keeper', got '{source}'. "
              f"This record type only exists to bind a Converger pass to the keeper's own "
              f"authorship; no other source may write it.")
        sys.exit(1)
    if not text or not text.strip():
        print("[converger-capture] REFUSED — no verbatim text supplied. A record with no "
              "text is indistinguishable from no pass at all.")
        sys.exit(1)
    os.makedirs(DIR, exist_ok=True)
    ts = _now()
    fname = f"{ts[:10]}_{_slug(item)}.json"
    path = os.path.join(DIR, fname)
    record = {
        "record_type": "session_converger_pass",
        "item": item,
        "ts": ts,
        "source": source,
        "verbatim_text": text,
        # wired 2026-07-27, the keeper's mark — S1, Converger threshold recalibration.
        # Both optional and untouched by anything else this tool does; they exist
        # only so `recalibrate` below has real data to read. Neither is required —
        # a pass with no pile_count/landing is still a complete, valid record.
        "pile_count": pile_count,
        "landing": landing,
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(record, f, ensure_ascii=False, indent=2)
    print(f"[converger-capture] recorded: {path}")
    return path

def list_passes():
    if not os.path.isdir(DIR):
        print("no converger passes captured yet")
        return
    files = sorted(os.listdir(DIR))
    if not files:
        print("no converger passes captured yet")
        return
    for fn in files:
        try:
            r = json.load(open(os.path.join(DIR, fn), encoding="utf-8"))
            print(f"{r['ts']}  {r['item']}  ({len(r['verbatim_text'])} chars, source={r['source']})")
        except Exception as e:
            print(f"{fn}  [unreadable: {e}]")

def recalibrate(n=10):
    """S1 — read-only. Never applies anything; only proposes, for the keeper's felt-read.
    THE_CONVERGER.html §6 calibrated 2026-06-14: stop fires at pile>15 or per-
    presentation count>3. This reads real passes since then and states,
    factually, whether that number still matches what's actually happened —
    it does not change §6, and it never will on its own."""
    if not os.path.isdir(DIR):
        print("no converger passes captured yet — nothing to recalibrate against")
        return
    records = []
    for fn in sorted(os.listdir(DIR)):
        try:
            records.append(json.load(open(os.path.join(DIR, fn), encoding="utf-8")))
        except Exception:
            continue
    with_data = [r for r in records if r.get("pile_count") is not None]
    print(f"[recalibrate] {len(records)} total passes captured, {len(with_data)} carry a pile_count.")
    if len(with_data) < n:
        print(f"[recalibrate] fewer than {n} data-bearing passes — no proposal yet. "
              f"Keep capturing pile_count/landing on real passes; this stays silent until there's enough to read.")
        return
    counts = [r["pile_count"] for r in with_data]
    landings = [r.get("landing") for r in with_data if r.get("landing")]
    print(f"[recalibrate] pile_count range across {len(with_data)} passes: {min(counts)}-{max(counts)}, "
          f"average {sum(counts)/len(counts):.1f}. Current §6 stop-line: 15.")
    print(f"[recalibrate] {len(landings)} passes carry a landing signal. Read them yourself before touching §6 — "
          f"this tool counts, it does not judge whether the number should move.")
    for r in with_data[-n:]:
        print(f"  {r['ts'][:10]}  {r['item']}  pile={r['pile_count']}  landing={r.get('landing') or '[none]'}")

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("capture")
    c.add_argument("--item", required=True)
    c.add_argument("--text", required=True)
    c.add_argument("--source", default="the keeper")
    c.add_argument("--pile-count", type=int, default=None)
    c.add_argument("--landing", default=None)
    sub.add_parser("list")
    r = sub.add_parser("recalibrate")
    r.add_argument("--n", type=int, default=10)
    a = ap.parse_args()
    if a.cmd == "capture":
        capture(a.item, a.text, a.source, a.pile_count, a.landing)
    elif a.cmd == "list":
        list_passes()
    elif a.cmd == "recalibrate":
        recalibrate(a.n)

if __name__ == "__main__":
    main()
