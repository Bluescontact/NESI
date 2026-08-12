#!/usr/bin/env python3
"""
annotations.py — the sidecar for the daily-light act (Rebuild pass 3, Step 8,
2026-07-22; OM6 default). Standard library only.

Canon is immutable in place. But the daily-light act still needs a way to say
something about a standing pattern — a note in passing — without touching it.
So annotations live in a SIDECAR (nesi/annotations/<slug>.jsonl), never in the
pattern body. The pattern's bytes are never changed; the guard never trips; the
note is Kevin's, timestamped, append-only.

This is the light act on canon: annotate / re-lint / spawn — none of which
enters the deepdive chamber or edits canon in place.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

ANNOT = core.NESI / "annotations"


def annotate(slug: str, note: str) -> dict:
    """Append a note to a pattern's sidecar. Canon body untouched — the note
    lives beside it, never in it."""
    note = (note or "").strip()
    if not note:
        return {"error": "empty note"}
    ANNOT.mkdir(parents=True, exist_ok=True)
    rec = {"ts": core.now(), "note": note}
    with open(ANNOT / f"{slug}.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    return {"slug": slug, "note": note}


def get_annotations(slug: str) -> list:
    p = ANNOT / f"{slug}.jsonl"
    if not p.exists():
        return []
    out = []
    for line in p.read_text(encoding="utf-8").splitlines():
        try:
            out.append(json.loads(line))
        except Exception:
            pass
    return out


def count(slug: str) -> int:
    return len(get_annotations(slug))
