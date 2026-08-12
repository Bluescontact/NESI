#!/usr/bin/env python3
"""
THE SOIL — where what comes in composts into substrate.

NESI v2, pass 2. The bed the forest grows from. Everything that enters — Kevin's
own drops, and external drops AFTER Kevin's gate admits them — breaks down here
into substrate the forest can grow gifts from.

Two laws, enforced here:
  1. The mechanic never does the recognizing — the soil never scores or ranks what
     composts. It breaks things down; it never judges them.
  2. Show the shape, speak plainly — a substrate record is plain fields, no jargon.

Kevin's gate (hard-wired):
  admit() is THE action Kevin's gate-mark triggers for an EXTERNAL drop. It refuses
  to run without an explicit Kevin mark — nothing from outside composts into the
  soil on its own. Kevin's own material composts freely (it's already inside).

FALLOW (boundary contract, nesi/spec/boundary.md):
  An empty compost — nothing carries charge — is a LAWFUL, honored terminal state.
  Not an error, not a "try again" nag. It composts inward and returns clean.

Stdlib only. Self-contained store at nesi/soil/. ENGINE SEAM to core.py marked.
Run directly for the self-test:  python soil.py
"""
import json
import sys
import re
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

SOIL = NESI / "soil"

_slug_re = re.compile(r"[^a-z0-9]+")


def _slug(s, n=44):
    return _slug_re.sub("-", str(s).strip().lower()).strip("-")[:n] or "substrate"


class GateClosed(Exception):
    """External intake tried to enter the soil without Kevin's gate mark."""


def _carries_charge(item):
    """The felt-read gate at the soil's mouth: does anything here carry charge?
    Plain structural check only (law 1 — NESI never decides worth): there is real
    content to break down. An item with no offer/body/text is chargeless → FALLOW."""
    if not isinstance(item, dict):
        return bool(str(item).strip())
    for k in ("offer", "body", "text", "content", "true_thing"):
        if str(item.get(k, "")).strip():
            return True
    return False


def compost(item, *, now_iso, source, write=True, feed_pulse=False):
    """Break an item down into substrate. `source` is 'kevin' or 'external'.
    Returns a substrate record, or a FALLOW record if nothing carries charge —
    both are lawful. Never raises on emptiness (FALLOW is honored, not an error).

    feed_pulse=True hands the composted material to the REAL metabolizer via
    pulse_wire (migration pass A): the same intake path the pulse has always
    watched. Off by default so the pure compost stays testable without side
    effects; the admit path turns it on (admitted material enters the pulse)."""
    if not _carries_charge(item):
        # FALLOW — honored, composts inward, no nag, no counter.
        return {"status": "fallow", "source": source, "composted_at": now_iso,
                "note": "nothing carried charge — a real, honored empty round"}

    text = ""
    if isinstance(item, dict):
        text = str(item.get("offer") or item.get("body") or item.get("text")
                   or item.get("content") or item.get("true_thing") or "").strip()
        handle = str(item.get("sender") or item.get("from") or source).strip()
    else:
        text = str(item).strip()
        handle = source

    record = {
        "status": "substrate",
        "source": source,                 # kevin | external (post-gate)
        "from": handle,
        "text": text,
        "composted_at": now_iso,
        # law 1: no score/worth/rank field, by construction.
    }
    if write:
        SOIL.mkdir(parents=True, exist_ok=True)
        name = f"{_slug(now_iso)}_{_slug(handle)}_{_slug(text)}.json"
        (SOIL / name).write_text(json.dumps(record, ensure_ascii=False, indent=2),
                                 encoding="utf-8")
        record["_stored_as"] = name
    if feed_pulse:
        # migration pass A: hand it to the real metabolizer (the kept pulse).
        try:
            import pulse_wire
            fed = pulse_wire.feed(record)
            if fed is not None:
                record["_fed_pulse"] = getattr(fed, "name", str(fed))
        except Exception:
            pass  # surface never crashes on a wire miss
    return record


def admit(coordination_record, *, kevin_mark, now_iso, write=True, feed_pulse=True):
    """THE gated action for an EXTERNAL drop. Called ONLY when Kevin's gate-mark
    admits a staged coordination record (status 'pending_gate'). Refuses without
    the mark — nothing from outside enters the soil on its own. On admit, the drop
    composts into substrate exactly like Kevin's own material (the outside no
    longer negotiates; it has crossed the membrane on Kevin's mark)."""
    if not kevin_mark:
        raise GateClosed(
            "external intake cannot enter the soil without Kevin's gate-mark — "
            "the surface stages; only Kevin admits"
        )
    return compost(coordination_record, now_iso=now_iso, source="external",
                   write=write, feed_pulse=feed_pulse)


# ENGINE SEAM (wires to the pulse): the real metabolizer (core.py) is the deeper
# compost — surfacing + gate + ledger. soil.compost() is the mouth that feeds it.
# In the wired build, compost() hands `record` to core.stage(...) so an admitted
# or own drop flows into the same metabolization the pulse already runs. Kept as a
# seam here so pass 2 is testable without importing the whole engine.


def _selftest():
    now = "2026-07-25T00:00:00"
    passed, failed = 0, 0

    def check(name, cond):
        nonlocal passed, failed
        if cond:
            passed += 1; print(f"  PASS  {name}")
        else:
            failed += 1; print(f"  FAIL  {name}")

    # Kevin's own material composts freely
    s = compost({"true_thing": "made a floor that holds a stranger"},
                now_iso=now, source="kevin", write=False)
    check("kevin's material composts to substrate", s["status"] == "substrate")
    check("substrate carries no score field (law 1)",
          not any(k in s for k in ("score", "rank", "worth")))

    # FALLOW — empty composts inward, honored, not an error
    f = compost({"offer": "   "}, now_iso=now, source="kevin", write=False)
    check("empty compost => FALLOW (honored, no error)", f["status"] == "fallow")

    # external intake needs Kevin's gate mark
    ext = {"sender": "ana", "instrument": "gift", "offer": "two extra dinners",
           "status": "pending_gate"}
    try:
        admit(ext, kevin_mark=False, now_iso=now, write=False)
        check("external without gate-mark refused", False)
    except GateClosed:
        check("external without gate-mark refused", True)

    a = admit(ext, kevin_mark=True, now_iso=now, write=False)
    check("external WITH gate-mark composts", a["status"] == "substrate" and a["source"] == "external")
    check("admitted external keeps its handle", a["from"] == "ana")

    print(f"\nRESULT: {passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(_selftest())
