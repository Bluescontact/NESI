"""Stage 3 -- the gate carry (v1 Sec 6, guardrails Sec D).

Pure geometry only. No rendering, no DOM, no drag handling -- render.py
mirrors these functions in JS (documented per-function below) because the
crossing test must run every animation frame against live pointer
coordinates, and duplicating a handful of arithmetic functions is cheaper
and clearer than round-tripping through Python mid-drag. tests/test_gate.py
exercises the Python copies directly; test_render.py checks the JS mirror
stays byte-for-byte in step with the guardrail intent (continuous sweep,
Y-bounds test, no default-focused verb).

The gate is not a button (guardrail #17-18): nothing here computes
readiness, eligibility, or a "ready to cross" signal. These functions only
answer one narrow geometric question each -- did a line cross a point,
does a swept box cross a line, is a box currently straddling it. Kevin's
drag is the only thing that ever calls them.
"""

from __future__ import annotations

from dataclasses import dataclass

from .layout import REGION_RECTS


def gate_seam_x() -> float:
    """X_gate -- the seam an object carries across, defined as the shared
    boundary between the gate and landing rects (guardrail #14 -- no
    boundary is invented separately from the rects layout.py already owns)."""
    gate = REGION_RECTS["gate"]
    landing = REGION_RECTS["landing"]
    assert abs((gate.x + gate.w) - landing.x) < 1e-6, "gate/landing rects are not adjacent"
    return gate.x + gate.w


def gate_y_bounds() -> tuple[float, float]:
    gate = REGION_RECTS["gate"]
    return gate.y, gate.y + gate.h


def segment_crosses_vertical(x1, y1, x2, y2, x_line, y_min, y_max) -> bool:
    """Does the segment (x1,y1)-(x2,y2) cross the vertical line x=x_line at
    a y within [y_min, y_max]? Used for the per-link intersection test
    (v1 Sec 6): a link's own connecting vector, not the object's box."""
    if (x1 - x_line) == 0 and (x2 - x_line) == 0:
        return y_min <= y1 <= y_max or y_min <= y2 <= y_max
    if (x1 < x_line) == (x2 < x_line):
        return False  # both endpoints on the same side -- no crossing
    t = (x_line - x1) / (x2 - x1)
    y_at = y1 + t * (y2 - y1)
    return y_min <= y_at <= y_max


def swept_box_crosses(prev_cx: float, curr_cx: float, half_w: float, x_line: float) -> bool:
    """Continuous sweep test between two frames (guardrail: fast flicks
    must not skip the seam -- this is the swept-AABB/segment substitute for
    frame-by-frame point collision). True if the object's bounding box, at
    ANY point along its travel from prev to curr center-x, overlaps x_line."""
    lo = min(prev_cx, curr_cx) - half_w
    hi = max(prev_cx, curr_cx) + half_w
    return lo <= x_line <= hi


def is_straddling(cx: float, half_w: float, x_line: float) -> bool:
    """The object's current box spans the seam -- the UNCOMMITTED state
    (v1 Sec 6): not yet landed, not simply back in gate. A complete,
    legitimate state on its own, not a loading spinner."""
    return (cx - half_w) < x_line < (cx + half_w)


@dataclass(frozen=True)
class CrossingOutcome:
    edge_key: tuple  # (a, b, type) -- matches graph.Edge identity
    outcome: str      # "ratified" | "severed" | "reverted" | "unchanged"


def resolve_crossing(
    edges_touching_object,
    object_id: str,
    start_region: str,
    end_region: str,
    crossed_flags: dict,
) -> list[CrossingOutcome]:
    """Given the edges touching a just-released object, whether it moved
    gate->landing (a cross) or landing->gate (an uncross), and which edges
    were flagged as having geometrically crossed the seam during the carry,
    decide each edge's outcome. No confirmation, no eligibility check --
    this runs only after Kevin's drag has already completed the gesture.

    - forward crossing (gate -> landing): a proposed edge that crossed
      within its Y-bounds during the window ratifies; one that didn't
      cross severs -- it does not silently stay proposed forever
      (guardrail: bypassed links sever, master Sec 4).
    - uncross (landing -> gate): a ratified edge that crossed back within
      the window reverts to proposed (`returned-from`, never framed as
      failure -- guardrail #28); one that didn't re-cross severs, on the
      same logic as the forward case.
    - anything else (no landing transition at all) leaves every edge
      exactly as it was -- an ordinary move within gate or staging is not
      a crossing.
    """
    outcomes = []
    forward = start_region != "landing" and end_region == "landing"
    backward = start_region == "landing" and end_region != "landing"

    for edge in edges_touching_object:
        key = (edge.a, edge.b, edge.type)
        crossed = crossed_flags.get(key, False)

        if forward and edge.state == "proposed":
            outcomes.append(CrossingOutcome(key, "ratified" if crossed else "severed"))
        elif backward and edge.state == "ratified":
            outcomes.append(CrossingOutcome(key, "reverted" if crossed else "severed"))
        else:
            outcomes.append(CrossingOutcome(key, "unchanged"))

    return outcomes
