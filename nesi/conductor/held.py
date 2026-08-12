#!/usr/bin/env python3
"""
NESI HELD VIEW v0 — everything held, each with its named gap. Standard
library only, read-only.

Two sources, concatenated:
  1. marks.jsonl verdict=hold — Kevin's own holds on staged objects, each
     carrying whatever condition/anchor he gave it (core.py's hold-anchor
     seam, 2026-07-19). The gap named is that condition, or "felt hold —
     no anchor given" when he left it blank (that is itself the honest
     name: an unnamed condition, not a missing feature).
  2. STANDING gaps — named, structural holds that live in the system's
     own memory/build-notes rather than in a single mark record: engine
     dark, the Trickster Detector (form-side of the extractor adversarial
     organ, never built), the brief-only holds, the shared missing
     register, the unread briefs pile. These are hardcoded here because
     they are exactly that — standing, not derived from a query — and
     the rule below is what keeps them honest.

THE RULE: a hold whose gap can't be named renders flagged (gap == "").
Never fabricate a plausible-sounding gap to fill the field.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

STANDING_GAPS = [
    {
        "title": "Engine dark",
        "gap": "bench.invoke is a stub on every op (draft/break/refine/semantic_pull). "
               "No engine is wired this build — Kevin's mark: internal-complete first. "
               "The socket is real; the content behind it is placeholder, loudly badged.",
        "source": "bench.py header · NESI clickable-surface build constraint",
    },
    {
        "title": "Trickster Detector — form-side, never built",
        "gap": "load_off_the_vulnerable_node crossed to canon 2026-07-21 (actor-side "
               "built). The form-side counterpart, the Trickster Detector, was carried "
               "as HOLD in the same crossing and has not been developed.",
        "source": "mind/project_extractor_adversarial_organ.md",
    },
    {
        "title": "~20 brief-only holds",
        "gap": "Roughly 20 patterns exist only inside substrate briefs in _INTAKE — "
               "never re-screened, never crossed, never composted. No single record "
               "names which twenty; this count is the standing estimate.",
        "source": "mind/project_pattern_promotion_and_holds.md",
    },
    {
        "title": "The shared missing register",
        "gap": "A register named as missing across more than one hold — what it would "
               "contain and where it would live has not been specified.",
        "source": "mind/project_pattern_promotion_and_holds.md",
    },
    {
        "title": "~90 unread briefs",
        "gap": "Substrate briefs staged in _INTAKE that have not been opened and read "
               "against canon since staging. No per-brief record — a pile count, not a list.",
        "source": "mind/project_substrate_brief_pattern_marks.md",
    },
]


def _read_marks() -> list:
    out = []
    if not core.MARKLOG.exists():
        return out
    for line in core.MARKLOG.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            out.append(json.loads(line))
        except Exception:
            continue
    return out


def build_index() -> list:
    """One entry per held thing — marks.jsonl holds first (most recent
    first), then the standing structural gaps. Each entry:
    {kind, title, gap, source, flagged}."""
    out = []
    marks = [m for m in _read_marks() if m.get("verdict") == "hold"]
    marks.sort(key=lambda m: m.get("at", ""), reverse=True)
    for m in marks:
        cond = (m.get("condition") or "").strip()
        gap = cond if cond else ""
        out.append({
            "kind": "mark",
            "title": m.get("id", m.get("pile", "?")),
            "gap": gap if gap else "felt hold — no anchor given",
            "source": "marks/marks.jsonl",
            "flagged": not gap,   # unnamed anchor — still real, just flagged
        })
    for g in STANDING_GAPS:
        out.append({
            "kind": "standing",
            "title": g["title"],
            "gap": g["gap"],
            "source": g["source"],
            "flagged": not g["gap"],
        })
    return out
