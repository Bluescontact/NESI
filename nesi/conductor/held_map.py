#!/usr/bin/env python3
"""
NESI HELD MAP v0 — homes for the still-open items, not builds of them.
Standard library only. Built session 2026-07-21, stage 5 of the pass-3
rewrite (_INTAKE/RETURN_rebuild_pass3_2026-07-21.md).

Each entry below seats one held item in its organ-site in the re-formed
body. Nothing here resolves, builds, or grants new capability to any of
them — this is a map, read-only, the same discipline as skin.py. Live
counts (where cheap and already-available, e.g. the gate's own tray size)
are read fresh each call; everything else is the static placement named in
the pass-2/pass-3 RETURNs.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

GATE_DATA = core.DSS / "gate" / "data" / "gate_data.json"
PROMOTE_READY = core.DSS / "_INTAKE" / "promote_ready"


def _tray_count() -> int | None:
    try:
        gate = json.loads(GATE_DATA.read_text(encoding="utf-8"))
        return len(gate.get("staging_tray", []))
    except Exception:
        return None


def held_map() -> list:
    """The five named held items, each seated at its organ-site. Read-only —
    calling this changes nothing; it only reports where things sit."""
    return [
        {
            "item": "engine (voice/motor)",
            "site": "gate — deliberately unfinished, not a task",
            "status": "dark by design",
            "note": "no /login, no live wiring. Per the elevator-sequence "
                    "law: rails before motor, stub as a construction phase, "
                    "not debt.",
        },
        {
            "item": "Trickster Detector (form-side)",
            "site": "skin — the one open gap",
            "status": "HOLD since 2026-07-01",
            "note": "see skin.trickster_detector(). Actor-side reflex "
                    "(Displaced Load) is built and crossed; this member is not.",
        },
        {
            "item": "~20 brief-only holds (nesi-the-loads, gift-aporia, "
                    "the 07-18 swarm, bench-center, substack DEV9)",
            "site": "digestive tract — mid-process",
            "status": f"gate staging_tray currently holds {_tray_count()} items "
                      "(live count; not all of these are the ~20 — this is the "
                      "gate's own running tray size, reported honestly as a "
                      "proxy, not a match)",
            "note": "shared missing register (evidence-accrual / "
                    "dependency-depth for gate_as_f4, unholdable_delegation, "
                    "same_quartet_assembly_standing) carried as a held "
                    "candidate for a small future addition — not built.",
        },
        {
            "item": "~90 unread substrate briefs",
            "site": "post-build metabolism — backlog for the existing "
                    "digestive organ (bench + interrogator's shared reader)",
            "status": "unpointed-at",
            "note": "the organ that would process these already exists; "
                    "it has not been pointed at this backlog. Not swept "
                    "this pass, per explicit instruction.",
        },
        {
            "item": "stale promote_ready/ folder",
            "site": "necrotic tissue — already-absorbed material never cleared",
            "status": ("present" if PROMOTE_READY.exists() else "already cleared"),
            "note": "2 of its 5 files verified (pass 2) as already superseded "
                    "by canon files under different names "
                    "(iteration_cannot_find_absence.md, "
                    "live_hands_ratification.md). Marked compost — low-risk, "
                    "cleared or deferred at Kevin's convenience.",
        },
    ]


if __name__ == "__main__":
    print(json.dumps(held_map(), indent=2, ensure_ascii=False))
