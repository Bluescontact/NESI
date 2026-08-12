#!/usr/bin/env python3
"""One-off script that ran the smoke test and wrote its own output to disk,
kept as the reproducible proof — not hand-fabricated HTML/SVG. Re-run any
time to regenerate the samples from the live composer.py and the live
staged/ objects."""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
import composer  # noqa: E402

STAGED = HERE.parent.parent.parent / "staged"

LEASE_OBJ = json.loads((STAGED / "2026-07-19_made_id_like_to_build_a_lease_3e1350.json")
                       .read_text(encoding="utf-8"))
FLOOR_OBJ = json.loads((STAGED / "2026-07-17_made_a_floor_that_holds_a_stranger_without_ex_0be5d0.json")
                       .read_text(encoding="utf-8"))
DSL_TEXT = (HERE / "lease.dsl.yaml").read_text(encoding="utf-8")

# --- object 1: real bench object + hand-authored DSL -> full render path ---
lease = composer.compose(LEASE_OBJ, DSL_TEXT, "lease.dsl.yaml")
(HERE / "lease_card.html").write_text(
    f"<style>{composer.REGISTER_CSS}</style>{lease['card']['html']}", encoding="utf-8")
(HERE / "lease_infographic.svg").write_text(lease["infographic"]["svg"], encoding="utf-8")
(HERE / "lease_doc.html").write_text(
    f"<style>{composer.REGISTER_CSS}</style>{lease['doc']['html']}", encoding="utf-8")

# --- object 2: staged object with NO DSL -> flagged, never fabricated ---
floor = composer.compose(FLOOR_OBJ, None, "")
(HERE / "floor_textonly_card.html").write_text(
    f"<style>{composer.REGISTER_CSS}</style>{floor['card']['html']}", encoding="utf-8")
(HERE / "floor_textonly_doc.html").write_text(
    f"<style>{composer.REGISTER_CSS}</style>{floor['doc']['html']}", encoding="utf-8")

print(json.dumps({
    "lease_diagram_status": lease["diagram_status"],
    "floor_diagram_status": floor["diagram_status"],
    "files_written": [p.name for p in HERE.glob("*.html")] + [p.name for p in HERE.glob("*.svg")],
}, indent=1))
