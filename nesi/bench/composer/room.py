#!/usr/bin/env python3
"""
NESI ROOM v0 — the living render surface. Standard library only.

Stage 5 BUILD of the Composer Cycle (nesi/returns/NESI_COMPOSER_CYCLE_*.md).
Sits one layer above composer.py, exactly as composer.py sits one layer
above bench.py: nothing beneath either is touched by this file.

Three pure(ish) functions — the whole of this organ's surface:

    build_index(staged_objects=None) -> list[dict]   one entry per object
    derive_edges(index)              -> list[dict]   {from, to, kind}
    render_room_canvas(index, edges, canvas, width, height)  draws it

THE ENTRANCE is a new "room" tab in nesi_app.py (wired separately, per the
Stage 4 fork Kevin settled: a new tab, the bench tab's own canvas untouched).
This file has no tkinter import at module scope beyond what
render_room_canvas needs to draw with (a canvas-like object is passed in,
never created here), so it stays smoke-testable headless exactly as
composer.py was at its own birth.

REUSE, NOT REINVENTION — composer.py's own invariance law, extended
upward: ink/paper/line colors are imported from composer.py, never
retyped. The four edge dash-kinds are copied verbatim from
composer.py's render_diagram_svg (that map is a local literal there, not
an exported name — a change to it is a signal to update this copy by
hand, never silently re-derived). No fifth edge-kind. No per-node color.
The boundary-band-first ordering (symbol law) is enforced here exactly as
inside one diagram: the largest, most persistent shape, drawn before any
node.

STOPS: never marks, never crosses, never writes to disk (this remains
true of every read the room performs). The one exception, added this
build (Step 7, the node space): a Kevin-initiated drag writes ONLY the
node's own x/y to room_layout.json next to the exe — never touches
staged/, marks/, or patterns/. It is furniture-arrangement, not a mark.
A snapped cable (an edge whose target isn't in this room) is simply not
drawn — the node stays, intact; the missing cable is the diagnostic,
not a warning icon.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import composer  # noqa: E402 — the existing register/constants, reused verbatim

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "conductor"))
import core  # noqa: E402 — core.state(), the same source every other tab reads
import bench  # noqa: E402 — bench.compose_preview(), the honest-stub fallback

BANDS = ("staged", "held", "canon", "compost")

# node-space layout persistence (Step 7) — one JSON dict, id -> [x, y],
# living next to the exe exactly like inbox/staged/marks (core.NESI is
# already the frozen-safe base every other organ resolves against).
LAYOUT_PATH = core.NESI / "room_layout.json"


def load_layout() -> dict:
    if not LAYOUT_PATH.exists():
        return {}
    try:
        return json.loads(LAYOUT_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_layout(layout: dict) -> None:
    LAYOUT_PATH.write_text(json.dumps(layout, indent=2), encoding="utf-8")


def set_node_position(node_id: str, x: float, y: float) -> dict:
    """One node's drag-drop lands here — read-modify-write the whole
    layout file (it's small; no need for a partial-update seam)."""
    layout = load_layout()
    layout[node_id] = [x, y]
    save_layout(layout)
    return layout

# Copied verbatim from composer.py's render_diagram_svg — not an exported
# name there, so this is a hand-kept copy, not an import. If composer.py's
# own map ever changes, this one needs the same hand-edit; it must never
# grow a fifth kind on its own.
DASH_FOR = {"drain": (4, 3), "feed": None, "loop": (2, 3), "block": (1, 3)}


def _band_for(obj: dict) -> str:
    """Band assignment — Stage 4's own open question, resolved here: crossed
    state and mark.verdict are read directly off the object; nothing is
    guessed past what's actually recorded. mark.verdict == null (the common
    case for freshly staged objects) lands in 'staged', same as the mark
    queue's own default reading of an unmarked object."""
    if obj.get("crossed") and not obj.get("uncrossed"):
        return "canon"
    verdict = (obj.get("mark") or {}).get("verdict")
    if verdict == "hold":
        return "held"
    if verdict == "compost":
        return "compost"
    return "staged"


def build_index(staged_objects=None) -> list:
    """One entry per staged object: {id, band, obj, composed}. Reuses the
    `composed` cache bench.land()/compose_preview() already write into a
    staged object's own JSON when present (Stage 2's own finding) — never
    recomposes an object that already carries one. Calls
    bench.compose_preview() only as a fallback for objects staged before
    that wiring existed (2026-07-20) and so have no cache."""
    if staged_objects is None:
        staged_objects = core.state()["staged"]
    index = []
    for obj in staged_objects:
        composed = obj.get("composed")
        if composed is None:
            try:
                composed = bench.compose_preview(obj)
            except Exception:
                composed = {"diagram_status": "missing"}
        index.append({
            "id": obj.get("id", ""),
            "band": _band_for(obj),
            "obj": obj,
            "composed": composed,
        })
    return index


def derive_edges(index: list) -> list:
    """Inter-object edges from a field already on every staged object today
    — no new schema. object.items[].target + disposition already give an
    object-to-pattern reference (confirmed on a real staged object, Stage 4
    gather). An edge is only drawn when its target is itself a node in this
    room — targets naming a pattern file rather than a staged object id are
    real information this room-scale index does not yet carry a node for;
    named here, not silently dropped, and left as the EXTENDS-parsing gap
    the Stage 4 spec already flagged as out of scope this pass."""
    edges = []
    ids = {e["id"] for e in index}
    for entry in index:
        obj = entry["obj"]
        src = entry["id"]
        items = (obj.get("object") or {}).get("items", [])
        for it in items:
            target = it.get("target")
            if not target or target not in ids:
                continue
            disp = (it.get("disposition") or "").lower()
            kind = {"applied": "feed", "held": "loop",
                    "composted": "drain", "blocked": "block"}.get(disp, "feed")
            edges.append({"from": src, "to": target, "kind": kind})
    return edges


def render_room_canvas(index: list, edges: list, tk_canvas, width=860, height=480,
                        layout: dict = None):
    """Native draw — parallel to composer.py's render_diagram_svg and
    nesi_app.py's existing _draw_composed(): boundary bands drawn first
    (largest, most persistent), nodes/edges layered on top, flat ink only,
    no per-node or per-band color. `tk_canvas` needs only delete/
    create_rectangle/create_text/create_line — a plain object satisfying
    that surface is enough to smoke-test this headless (see __main__).

    `layout` (Step 7): a {node_id: [x, y]} dict of Kevin-dragged overrides.
    A node with a saved position renders there instead of at its band's
    default slot; every node still gets a "draggable" tag plus its own
    "n::<id>" tag so the caller (nesi_app.py) can bind drag events without
    this module importing tkinter itself. Returns {id: (x, y)} of what was
    actually drawn, so the caller can persist a drop without recomputing
    band math."""
    tk_canvas.delete("all")
    INK, LINE, FAINT, PAPER = composer.INK, composer.LINE, composer.FAINT, composer.PAPER
    layout = layout or {}

    by_band = {b: [e for e in index if e["band"] == b] for b in BANDS}
    band_h = height / len(BANDS)
    positions = {}

    for bi, band in enumerate(BANDS):
        y0 = bi * band_h
        tk_canvas.create_rectangle(2, y0 + 4, width - 2, y0 + band_h - 4,
                                    outline=LINE, dash=(2, 2))
        tk_canvas.create_text(10, y0 + 14, anchor="w", text=band.upper(),
                               font=("Courier New", 8), fill=FAINT)
        entries = by_band[band]
        m = len(entries)
        for i, entry in enumerate(entries):
            default_x = width / 2 if m <= 1 else 60 + (width - 120) * i / (m - 1)
            default_y = y0 + band_h / 2 + 8
            saved = layout.get(entry["id"])
            positions[entry["id"]] = tuple(saved) if saved else (default_x, default_y)

    for e in edges:
        if e["from"] not in positions or e["to"] not in positions:
            continue  # snapped cable — the node renders; the cable simply doesn't
        x1, y1 = positions[e["from"]]
        x2, y2 = positions[e["to"]]
        kw = {"fill": LINE, "width": 1, "arrow": "last"}
        d = DASH_FOR.get(e["kind"])
        if d:
            kw["dash"] = d
        tk_canvas.create_line(x1, y1, x2, y2, **kw)

    for entry in index:
        pos = positions.get(entry["id"])
        if not pos:
            continue
        x, y = pos
        label = (entry["obj"].get("bench", {}) or {}).get("intent") \
            or entry["obj"].get("id", "")
        tags = ("draggable", f"n::{entry['id']}")
        tk_canvas.create_rectangle(x - 46, y - 13, x + 46, y + 13,
                                    fill=PAPER, outline=LINE, tags=tags)
        tk_canvas.create_text(x, y, text=label[:22], font=("Courier New", 7),
                               fill=INK, tags=tags)
    return positions


if __name__ == "__main__":
    # headless smoke test — same posture composer.py had at its own birth:
    # real data, a stub in place of tk.Canvas, no window required.
    class _StubCanvas:
        def __init__(self):
            self.calls = []

        def delete(self, *a):
            pass

        def create_rectangle(self, *a, **k):
            self.calls.append(("rect", a, k))

        def create_text(self, *a, **k):
            self.calls.append(("text", a, k))

        def create_line(self, *a, **k):
            self.calls.append(("line", a, k))

    idx = build_index()
    edges = derive_edges(idx)
    c = _StubCanvas()
    render_room_canvas(idx, edges, c)
    print(f"objects: {len(idx)} · edges: {len(edges)} · canvas calls: {len(c.calls)}")
    for b in BANDS:
        print(f"  {b}: {sum(1 for e in idx if e['band'] == b)}")
