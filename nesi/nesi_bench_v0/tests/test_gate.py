"""Stage 3 gate -- guardrail #72 (gate-incapacity) starts here: these test
the geometry alone has no notion of eligibility, readiness, or a default
verb. It only answers narrow yes/no questions about where things are."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.gate import (
    gate_seam_x, gate_y_bounds, segment_crosses_vertical,
    swept_box_crosses, is_straddling, resolve_crossing, CrossingOutcome,
)
from nesi_bench_v0.layout import REGION_RECTS
from nesi_bench_v0.graph import Edge


def test_gate_seam_is_the_gate_landing_boundary():
    x = gate_seam_x()
    gate = REGION_RECTS["gate"]
    landing = REGION_RECTS["landing"]
    assert x == gate.x + gate.w == landing.x


def test_segment_crossing_within_bounds():
    assert segment_crosses_vertical(0, 10, 100, 10, 50, 0, 20) is True


def test_segment_crossing_outside_y_bounds():
    assert segment_crosses_vertical(0, 500, 100, 500, 50, 0, 20) is False


def test_segment_not_crossing_same_side():
    assert segment_crosses_vertical(0, 10, 40, 10, 50, 0, 20) is False


def test_swept_box_catches_fast_flick_over_the_seam():
    # object jumps from well left of the seam to well right of it in one
    # frame -- point-sampling only the end position would miss this.
    x_line = 500
    assert swept_box_crosses(prev_cx=400, curr_cx=650, half_w=20, x_line=x_line) is True


def test_swept_box_false_when_travel_stays_on_one_side():
    assert swept_box_crosses(prev_cx=100, curr_cx=150, half_w=20, x_line=500) is False


def test_is_straddling_true_when_box_spans_seam():
    assert is_straddling(cx=500, half_w=20, x_line=505) is True


def test_is_straddling_false_when_box_clears_seam():
    assert is_straddling(cx=500, half_w=20, x_line=600) is False


def test_forward_crossing_ratifies_crossed_and_severs_bypassed():
    e1 = Edge(a="obj-a", b="obj-x", type="derived-from", state="proposed")
    e2 = Edge(a="obj-a", b="obj-y", type="this-touches", state="proposed")
    flags = {("obj-a", "obj-x", "derived-from"): True, ("obj-a", "obj-y", "this-touches"): False}
    outcomes = resolve_crossing([e1, e2], "obj-a", "gate", "landing", flags)
    by_edge = {o.edge_key: o.outcome for o in outcomes}
    assert by_edge[("obj-a", "obj-x", "derived-from")] == "ratified"
    assert by_edge[("obj-a", "obj-y", "this-touches")] == "severed"


def test_uncross_reverts_crossed_and_severs_bypassed():
    e1 = Edge(a="obj-a", b="obj-x", type="derived-from", state="ratified")
    flags = {("obj-a", "obj-x", "derived-from"): True}
    outcomes = resolve_crossing([e1], "obj-a", "landing", "gate", flags)
    assert outcomes[0].outcome == "reverted"


def test_no_landing_transition_leaves_edges_unchanged():
    e1 = Edge(a="obj-a", b="obj-x", type="derived-from", state="proposed")
    flags = {("obj-a", "obj-x", "derived-from"): True}
    outcomes = resolve_crossing([e1], "obj-a", "staging", "gate", flags)
    assert outcomes[0].outcome == "unchanged"


if __name__ == "__main__":
    test_gate_seam_is_the_gate_landing_boundary()
    test_segment_crossing_within_bounds()
    test_segment_crossing_outside_y_bounds()
    test_segment_not_crossing_same_side()
    test_swept_box_catches_fast_flick_over_the_seam()
    test_swept_box_false_when_travel_stays_on_one_side()
    test_is_straddling_true_when_box_spans_seam()
    test_is_straddling_false_when_box_clears_seam()
    test_forward_crossing_ratifies_crossed_and_severs_bypassed()
    test_uncross_reverts_crossed_and_severs_bypassed()
    test_no_landing_transition_leaves_edges_unchanged()
    print("gate clean: seam geometry, swept detection, and crossing resolution hold")
