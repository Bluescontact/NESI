#!/usr/bin/env python3
"""
NESI WHOLE BODY v0 — the stage-6 close. Standard library only.
Built session 2026-07-21, stage 6 of the pass-3 rewrite
(_INTAKE/RETURN_rebuild_pass3_2026-07-21.md).

Two jobs, both read-only, both stopping at reporting:
  count_definitions() — lands the three counts as a DEFINITION (what each
    number actually measures), not a fourth reconciliation attempt. The
    cross-instrument reconciliation itself (the GHOST-GATE move) is named
    as a candidate here, never performed.
  coherence_check()   — runs one benign turn through front.handle() in
    stub mode (engine untouched) as the whole-body run-through: does the
    organism route, sense, and remember without raising? Pass/fail only,
    no marks, no writes to gate/marks/canon.

Nothing here crosses, marks, or ratifies. This module is the reporting
surface for the pass-3 close, not a new organ with its own authority.
"""

import json
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

GATE_DATA = core.DSS / "gate" / "data" / "gate_data.json"
MEMBRANE_RECORDS = core.DSS / "membrane" / "transition_records"
FOLDED = core.CANON / "_folded"


def _now():
    return datetime.now().isoformat(timespec="seconds")


def count_definitions() -> dict:
    """Three genuinely different measures, stated plainly. Live counts,
    read fresh — this does not cache or trust a prior number."""
    on_disk = len(list(core.CANON.glob("*.md")))
    folded = len(list(FOLDED.glob("*.md"))) if FOLDED.exists() else 0
    try:
        gate = json.loads(GATE_DATA.read_text(encoding="utf-8"))
        canon_global = gate.get("canon_global")
    except Exception:
        canon_global = None
    crossed = (len(list(MEMBRANE_RECORDS.glob("*.json")))
               if MEMBRANE_RECORDS.exists() else None)
    return {
        "on_disk": {
            "value": on_disk,
            "definition": "every .md file directly in patterns/ right now, "
                          "crossed-with-record or not",
            "excludes": f"patterns/_folded/ ({folded} files) — a separate "
                       "subdirectory, standing relative to canon unresolved",
        },
        "canon": {
            "value": canon_global,
            "definition": "gate_data.json's own canon_global field — a "
                          "running count maintained by whatever process "
                          "updates that file; this reads the field, it does "
                          "not audit the process",
        },
        "crossed": {
            "value": crossed,
            "definition": "count of individual .json files in "
                          "membrane/transition_records/ — patterns with an "
                          "explicit, dated crossing record on file",
        },
        "reconciliation_candidate": "the three instruments would need to "
            "agree on this three-way definition, and ideally cross-reference "
            "each other automatically (the GHOST-GATE move already proved "
            "this once, 2026-07-14), to stop diverging by construction. "
            "Named as a later-phase candidate, not performed here.",
    }


def coherence_check() -> dict:
    """One benign turn through front.handle(), stub mode, engine untouched.
    Confirms the whole body routes end-to-end without raising. Not a build
    verification of any specific stage — a smoke pass over the stitched
    whole."""
    import front
    probe = "where was I"
    try:
        out = front.handle(probe)
        ok = isinstance(out, dict) and "kind" in out and "lines" in out
        return {"ran": True, "ok": ok, "probe": probe,
                "kind": out.get("kind"), "lines": out.get("lines", [])[:3]}
    except Exception as e:
        return {"ran": True, "ok": False, "probe": probe,
                "error": str(e)[:300]}


def assemble_close(outside_zero_note: str = "") -> dict:
    """The stage-6 payload: counts, coherence check, and the held map from
    held_map.py — everything the final RETURN's whole-body-close section
    needs, gathered in one call. Writes nothing; the caller decides what
    (if anything) to persist."""
    import held_map
    import skin
    return {
        "ts": _now(),
        "counts": count_definitions(),
        "coherence": coherence_check(),
        "held": held_map.held_map(),
        "skin": {"law": skin.law_summary(), "registers": skin.registers(),
                 "gap": skin.trickster_detector()},
        "outside_zero": outside_zero_note or (
            "THE_ASSEMBLY.html (DSS root, 2026-07-15) — coherence check, "
            "not a validation; its own verdict was never marked by Kevin."),
    }


if __name__ == "__main__":
    print(json.dumps(assemble_close(), indent=2, ensure_ascii=False, default=str))
