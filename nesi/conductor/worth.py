#!/usr/bin/env python3
"""
THE WORTH ORGAN — surface-and-mark (migration pass D).

The fourth recognition mechanic, and the only one that had no organ. Value ->
circulation-witness, capacity -> heartwood, skill -> floor-pattern already hold
three; worth is the core — non-comparative, non-conditional, the one worth-apps
always corrupt into a score. This organ surfaces a person's own raw material and
lets THEM mark what carries charge — it never assigns, rates, or ranks.

Governing law: patterns/the_recognition_law.md — the mechanic never does the
recognizing. Spec: _INTAKE/SPEC_the_worth_organ_2026-07-24.md.

The one loop (same shape as the tension-table — the board holds; only you register
that it lit):
  SURFACE  — lay the raw material out, unranked/unsorted/unscored.
  MARK     — the person marks what carries charge. Binary, first-person: this one
             carries · this one doesn't (yet). No 1-10, no stars, no weight.
  HOLD     — the marked set accretes as a standing mirror (never a leaderboard).
  WITNESS  — the ONLY comparison is to your own past marks, rendered as a witness,
             never a score: what you marked then, what you mark now. No delta, no
             trend-line, no "improved".

Hard NOs (build-constraints, not preferences — violating one is a build failure):
  · no worth-score/rank/tier/%/grade, for a person or an item — ever.
  · no leaderboard / no cross-person comparison — single owner, always.
  · no assignment — the organ surfaces; the person marks.
  · no conditional worth — no streaks/points/badges/unlock.
  · no inferred marks — never marks on the person's behalf.
  · the only comparison is your own past, as a witness, opt-in and unscored.

Data model — a thin LOG, not a judge (derive, don't store a count): one line per
mark event {item, source, charge(bool), marked_at}. The marked-set is DERIVED from
the log; no running "worth total" is ever kept (a stored total is a score by the
back door). Placement (7th organ / convener content / separate vessel) stays
Kevin's open fork — this is the law-abiding CORE any placement uses.

Stdlib only. Frozen-aware. Store: nesi/worth/charge_log.jsonl. Run: python worth.py
"""
import json
import sys
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

WORTH = NESI / "worth"
LOG = WORTH / "charge_log.jsonl"


def surface(items):
    """Lay raw material out — unranked, unsorted-by-worth, unscored. `items` are
    the person's own work-object pointers (from soil / their drop-path). Order is
    arrival only; this function exists to GUARANTEE no worth-ordering — it never
    sorts by charge or any magnitude, because none exists."""
    return list(items)


def mark(item, *, source="kevin", charge=True, now_iso, write=True):
    """The person marks what carries charge. First-person, binary. Appends a log
    line — never a score. `charge=False` withdraws the mark (the unmark: a mark
    that can't be lifted becomes a permanent scoreboard)."""
    entry = {"item": str(item), "source": str(source),
             "charge": bool(charge), "marked_at": str(now_iso)}
    if write:
        WORTH.mkdir(parents=True, exist_ok=True)
        with LOG.open("a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    return entry


def unmark(item, *, source="kevin", now_iso, write=True):
    """Withdraw charge from an item — charge can always be lifted."""
    return mark(item, source=source, charge=False, now_iso=now_iso, write=write)


def _events():
    out = []
    if LOG.exists():
        for line in LOG.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                out.append(json.loads(line))
            except Exception:
                pass
    return out


def marked_set(events=None):
    """The mirror — DERIVED from the log, never stored. Returns the items whose
    LATEST event has charge=True, each with its marked_at. No count is persisted;
    the caller may len() the list, but the organ keeps no running total."""
    evs = _events() if events is None else events
    latest = {}
    for e in evs:
        latest[e.get("item")] = e   # log order = chronological; last wins
    return [{"item": e["item"], "source": e.get("source", ""),
             "marked_at": e.get("marked_at", "")}
            for e in latest.values() if e.get("charge")]


def witness(events=None):
    """The ONLY comparison — to your own past, as a witness, never a score.
    Returns the marked mirror ordered by when you marked it: 'here is what carried
    charge, and when'. There is deliberately NO delta, NO trend, NO number-of-
    change, NO 'improved' — growth is shown, never graded."""
    ms = marked_set(events)
    ms.sort(key=lambda m: m.get("marked_at", ""))
    return {"marked_over_time": ms,
            "note": "your own hand, then and now — held, never judged"}


def _selftest():
    # in-memory only (write=False) — no store side effects
    now = "2026-07-25T00:00:00"
    passed = failed = 0

    def check(name, cond):
        nonlocal passed, failed
        if cond:
            passed += 1; print(f"  PASS  {name}")
        else:
            failed += 1; print(f"  FAIL  {name}")

    # SURFACE never scores/orders by worth
    items = [{"id": "a"}, {"id": "b"}, {"id": "c"}]
    s = surface(items)
    check("surface returns items unranked (arrival order preserved)", s == items)

    # MARK is boolean, first-person, no magnitude
    e = mark("ember-1", now_iso=now, write=False)
    check("mark is boolean charge, no score/magnitude field",
          e["charge"] is True and not any(k in e for k in ("score", "rank", "weight", "worth", "stars")))

    # build an event stream in memory and derive the mirror
    evs = [mark("a", now_iso="t1", write=False),
           mark("b", now_iso="t2", write=False),
           mark("c", now_iso="t3", write=False),
           unmark("b", now_iso="t4", write=False)]   # withdraw b
    ms = marked_set(evs)
    ids = sorted(m["item"] for m in ms)
    check("marked_set derived from log (a,c marked; b withdrawn)", ids == ["a", "c"])
    check("unmark actually lifts charge (b not in mirror)", "b" not in ids)

    # no stored total — the organ keeps no count field anywhere
    check("no running worth-total is stored (derive, don't store)",
          not LOG.exists() or "total" not in LOG.read_text(encoding="utf-8"))

    # WITNESS has no delta / trend / number-of-change / 'improved'
    w = witness(evs)
    wblob = json.dumps(w).lower()
    check("witness has no delta/trend/score/improved (growth shown, not graded)",
          not any(k in wblob for k in ("delta", "trend", "improved", "score", "rank", "percent")))
    check("witness is own-past only (no other person appears)",
          "other" not in wblob and "vs" not in wblob)

    print(f"\nRESULT: {passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(_selftest())
