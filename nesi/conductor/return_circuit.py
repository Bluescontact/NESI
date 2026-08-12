#!/usr/bin/env python3
"""
NESI RETURN CIRCUIT v0 — the organ that brings held things back.
Standard library only. DETERMINISTIC BY LAW: no engine call anywhere.

Reads the hold tray and asks ONE question per item: is this condition of a
kind I can check, and has it anchored true? If yes, the item is RETURNED TO
THE GATE as a question — never through it. This organ does not mark, does
not promote, and never crosses anything. Kevin marks, with his existing
verbs, through his existing channel.

IT MUST NOT FABRICATE "CONDITION MET." Most hold-conditions are felt or
Kevin-gated (audit 2026-07-17: 0 date / 0 artifact / 23 felt). Prose is
never parsed for meaning. The circuit fires ONLY on explicit machine tags
in a held item's note:

    until 2026-08-01                → fires when that date has passed
    when file:patterns\\x.md exists  → fires when DSS-relative path exists

No tag, no fire. Felt holds are untouched here — their accumulation is the
interrogator's Move B alarm (aggregate staleness); the return circuit is
per-item and anchor-fired. No item surfaces from both: Move B skips holds
with named conditions; this circuit acts only on anchored tags.

Derived view, not a store: holds and conditions live in gate_data.json
AND, since 2026-07-19 (Mark 5, Kevin's cross), in NESI staged holds — a
hold recorded through core.record_mark may carry mark.condition, an anchor
tag in the same two-shape grammar. Both trays are scanned; this module
still writes nothing, anywhere.

SEAM (built 2026-07-19, Mark 5): hold-time condition typing — the hold
gesture may capture an anchor tag (core.record_mark condition arg; blank
stays a felt hold and never fires here). Felt holds remain Move B's.
"""

import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parents[0]
else:
    NESI = Path(__file__).resolve().parents[1]
DSS       = NESI.parent
GATE_DATA = DSS / "gate" / "data" / "gate_data.json"
STAGED    = NESI / "staged"

# the anchor grammar. Two shapes are COMPUTABLE — the circuit checks them and
# may fire on its own (a date passes, a file appears). The third, added in
# Rebuild pass 3 Step 5 (2026-07-22) for latent capacities, is DELIBERATELY NOT
# computable: 'when resourced' fires only when KEVIN marks the resourcing event
# (held_record.mark_resourced) — the system never decides resourcing happened.
# This keeps the never-fabricate-condition-met law intact: computable anchors
# are verified; the felt/resourcing anchor is Kevin's mark, surfaced not fired.
_DATE_TAG = re.compile(r"\buntil (\d{4}-\d{2}-\d{2})\b", re.IGNORECASE)
_FILE_TAG = re.compile(r"\bwhen file:([^\s]+) exists\b", re.IGNORECASE)
_RESOURCED_TAG = re.compile(r"\bwhen resourced\b", re.IGNORECASE)   # Kevin-marked, not computed


def _check(note: str):
    """Returns (condition_text, evidence) if an explicit anchor has fired,
    else None. Misses quietly; never guesses at prose."""
    m = _DATE_TAG.search(note or "")
    if m:
        try:
            if date.today() > date.fromisoformat(m.group(1)):
                return (f"until {m.group(1)}",
                        f"date anchor · {m.group(1)} has passed "
                        f"(today {date.today().isoformat()})")
        except ValueError:
            pass   # malformed date = no anchor, not an error to act on
    m = _FILE_TAG.search(note or "")
    if m:
        rel = m.group(1).strip("\"'")
        target = DSS / rel
        if target.exists():
            return (f"when file:{rel} exists",
                    f"artifact anchor · {rel} now on disk")
    return None


def scan() -> list:
    """All fired returns, or [] — silence when nothing anchors.
    Each return: {title, condition, evidence, question}."""
    try:
        gate = json.loads(GATE_DATA.read_text(encoding="utf-8"))
    except Exception:
        return []   # unreadable tray = silence, not a fabricated return
    out = []
    for t in gate.get("staging_tray", []):
        if t.get("status") != "held":
            continue
        fired = _check(t.get("note", ""))
        if not fired:
            continue
        cond, evidence = fired
        out.append({
            "title": t.get("title", ""),
            "condition": cond,
            "evidence": evidence,
            "question": (f"This was held until [{cond}]. That has anchored "
                         f"true. Return to the gate, re-hold with a fresh "
                         f"condition, or compost?")})
    # NESI staged holds (Mark 5 seam, 2026-07-19): a hold recorded with an
    # anchor tag carries it at mark.condition. Same grammar, same silence.
    try:
        for p in sorted(STAGED.glob("*.json")):
            try:
                obj = json.loads(p.read_text(encoding="utf-8"))
            except Exception:
                continue
            mark = obj.get("mark") or {}
            if mark.get("verdict") != "hold" or not mark.get("condition"):
                continue
            fired = _check(mark["condition"])
            if not fired:
                continue
            cond, evidence = fired
            out.append({
                "title": obj.get("pile", p.stem),
                "condition": cond,
                "evidence": evidence,
                "question": (f"This was held until [{cond}]. That has anchored "
                             f"true. Return to the gate, re-hold with a fresh "
                             f"condition, or compost?")})
    except Exception:
        pass   # unreadable staged tray = silence, not a fabricated return
    return out


def scan_capacities() -> list:
    """The third anchor, surfaced not fired: capacities Kevin has marked
    resourced and that await his second read (Step 6). This reads the held_record
    store; it still writes nothing and computes no verdict — it only returns the
    resourced-eligible capacities to the gate as questions."""
    try:
        import held_record
    except Exception:
        return []
    out = []
    for r in held_record.eligible_for_second_read():
        base = r.get("first_read") or "(no baseline recorded)"
        out.append({
            "title": r.get("entry_ref", r["id"]),
            "condition": "when resourced",
            "evidence": f"resourcing marked {r.get('resourced_at', '?')} · "
                        f"latency was {r.get('latency_type') or 'unnamed'}",
            "question": (f"Capacity held: \"{r.get('entry_ref')}\". First read: "
                         f"{base}. You marked it resourced. Second read — did it "
                         f"move? Moved = capability (mark it live); unmoved though "
                         f"resourced = named aspiration."),
            "capacity_id": r["id"],
        })
    return out


def gate_mtime() -> float:
    """Change signal for the app's rescan — cheaper than re-reading."""
    try:
        return GATE_DATA.stat().st_mtime
    except Exception:
        return 0.0


# ---------------------------------------------------------------------------
# Circuit 1 — the condition circuit closed (Pass 4, 2026-07-22).
# Before this: scan()/scan_capacities() evaluated the anchors but there was no
# named TICK, no persisted record that the loop ran, and a fired anchor
# resurfaced only as a free-floating question — not as a SOCKET in the socket
# circuit (Circuit 4). These three additions close the loop:
#   hold → TICK (on open + on demand) → FIRE → resurface as SOCKET → Kevin's
#   mark → resolve to exactly one terminal (cross / re-hold=re-arm / compost).
# The circuit's law is untouched: reads only, never fabricates condition-met,
# never marks — Kevin's mark at the gate is the terminal.
# ---------------------------------------------------------------------------
TICK_LOG = NESI / "held" / "_last_tick.json"


def tick(reason: str = "open") -> dict:
    """The tick pass. Evaluate every anchor — staged/tray date+file holds AND
    the resourcing anchor (resourced-eligible capacities) — on open and on
    demand. Returns the fired set and records that the loop ran (a persisted
    tick, so 'the circuit ticked' is real state, not an ephemeral call). Writes
    NO condition-met and computes NO verdict: a fired anchor is surfaced, never
    resolved. Re-arm: when Kevin re-holds a resolved item with a fresh anchor,
    that new anchor persists on the item and this same tick fires it again when
    it next anchors true — the loop closes on itself without a human remembering."""
    fired = scan() + scan_capacities()
    try:
        TICK_LOG.parent.mkdir(parents=True, exist_ok=True)
        TICK_LOG.write_text(json.dumps(
            {"at": datetime.now().isoformat(timespec="seconds"),
             "reason": reason, "n_fired": len(fired)}, ensure_ascii=False),
            encoding="utf-8")
    except Exception:
        pass   # the tick still returns its read even if the log can't be written
    return {"reason": reason, "n": len(fired), "fired": fired}


def last_tick() -> dict:
    try:
        return json.loads(TICK_LOG.read_text(encoding="utf-8"))
    except Exception:
        return {}


def circuit_sockets() -> list:
    """Circuit 4 binding — every FIRED-but-unresolved condition (C1) and every
    PENDING second-read (C2) rendered as a labeled awaiting-slot. A socket here
    means: an anchor has fired and awaits Kevin's terminal mark. The socket
    closes when he marks (the fired item leaves scan(); the read capacity leaves
    eligible) — a socket cannot persist past its condition being met."""
    out = []
    for r in scan():                       # C1: date/file anchor fired, held item
        out.append({
            "label": f"held: {r['title']}",
            "awaiting": f"a terminal — {r['condition']} anchored true",
            "kind": "fired_condition",
            "condition": r["condition"],
            "terminals": ["cross", "re-hold (re-arms)", "compost"],
            "question": r["question"]})
    for c in scan_capacities():            # C2: resourced capacity awaiting 2nd read
        out.append({
            "label": f"capacity: {c['title']}",
            "awaiting": "the second read — did it move?",
            "kind": "pending_second_read",
            "capacity_id": c["capacity_id"],
            "terminals": ["capability→live", "aspiration→(re-hold|compost)"],
            "question": c["question"]})
    return out


def open_sockets(slug: str = None) -> list:
    """The unified socket view (Circuit 4). The workbench-level open ends from
    the circuits (circuit_sockets) plus, when a pattern is in hand, that entry's
    own library gaps (missing lineage parent / drift / raw coverage). One place
    to see every open end wherever a circuit is still open."""
    out = list(circuit_sockets())
    if slug:
        try:
            import library
            for s in library.sockets(slug):
                out.append({**s, "kind": s.get("kind", "library"), "slug": slug})
        except Exception:
            pass
    return out


if __name__ == "__main__":
    t = tick("demand")
    print(json.dumps(t, ensure_ascii=False, indent=1) if t["fired"]
          else "(silence — no anchor has fired)")
