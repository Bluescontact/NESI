"""Stage 1 gate: the rendered surface is silent by default, local-only, and
carries no region label/badge outside the explicit inspection toggle."""

import re
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.render import build_surface_html
from nesi_bench_v0.regions import ALL_REGION_KEYS

FORBIDDEN_GREETING_PHRASES = (
    "welcome back", "here's where you left off", "awaiting", "get started",
    "your workspace", "no objects yet", "drop something",
)


def _render() -> str:
    out_dir = Path(tempfile.mkdtemp())
    out_path = build_surface_html(out_dir / "surface_test.html")
    return out_path.read_text(encoding="utf-8")


def test_renders_no_remote_resources():
    html = _render()
    # the SVG XML namespace URI is a required constant for createElementNS,
    # not a network fetch -- excluded here, not a loophole for real remote
    # resources (src=, href=, @import, fetch/XHR targets).
    scrubbed = html.replace("http://www.w3.org/2000/svg", "")
    for forbidden in ("http://", "https://", "ws://", "wss://"):
        assert forbidden not in scrubbed


def test_all_region_keys_present_as_data_only():
    html = _render()
    for key in ALL_REGION_KEYS:
        assert key in html  # present in the embedded JSON / dataset attrs


def test_region_tag_hidden_by_default():
    html = _render()
    # the region-tag element must be display:none until .inspect is toggled
    assert re.search(r"\.region-tag\{[^}]*display:none", html)


def test_no_greeting_or_coaching_text():
    html = _render().lower()
    for phrase in FORBIDDEN_GREETING_PHRASES:
        assert phrase not in html, f"found forbidden phrase: {phrase!r}"


def test_tethers_hidden_at_rest_guardrail_29():
    html = _render()
    # the default graph state renders no full graph -- tethers must start
    # at opacity 0 and only reach opacity 1 under an explicit .lit class.
    assert re.search(r"\.tether\{[^}]*opacity:0\b", html)
    assert re.search(r"\.tether\.lit\{[^}]*opacity:1\b", html)


def test_strut_and_ratified_and_proposed_are_visually_distinct_guardrail_31():
    html = _render()
    assert ".tether-strut{" in html
    assert ".tether-ratified{" in html
    assert ".tether-proposed{" in html


def test_no_error_or_danger_styling_on_tension_guardrail_35():
    # scoped to the <style> block only -- object content is exact,
    # unconditionally lawful user text (e.g. "unanchored" contains "red")
    # and must never be scanned as if it were UI styling.
    html = _render()
    style_block = html.split("<style>", 1)[1].split("</style>", 1)[0].lower()
    for forbidden in ("red", "#f00", "danger", "warning", "error"):
        assert forbidden not in style_block, f"tension styling used a fault-state word: {forbidden!r}"


def test_proposed_edges_apply_no_force_only_visual_stretch_class():
    from nesi_bench_v0 import render as render_module
    src = render_module.HTML_TEMPLATE
    # scope to physicsTick's body specifically -- other functions (e.g.
    # attend()) also contain "} else {" and would otherwise be picked up
    # by a bare split, silently testing the wrong branch.
    tick_body = src.split("function physicsTick() {{")[1].split("requestAnimationFrame(physicsTick);")[0]
    # the proposed branch of physicsTick must only toggle a class, never
    # call applySpring/applyCorrection (guardrail #31 -- proposed pulls
    # nothing).
    proposed_branch = tick_body.split("} else {")[1].split("e.el.setAttribute")[0]
    assert "applySpring" not in proposed_branch
    assert "applyCorrection" not in proposed_branch
    assert "classList.toggle('stretched'" in proposed_branch


def test_gate_seam_line_hidden_by_default_guardrail_54():
    html = _render()
    assert re.search(r"\.gate-seam\{[^}]*display:none", html)


def test_no_confirm_dialog_or_default_focused_verb_guardrail_17_18():
    html = _render().lower()
    for forbidden in ("confirm(", "window.confirm", "are you sure", "autofocus"):
        assert forbidden not in html


def test_disclosure_hidden_by_default_and_sourced_from_registry():
    html = _render()
    assert re.search(r"#disclosure\{[^}]*display:none", html)
    # the disclosure text must come from DATA.strings, never a literal
    # sentence written directly into attend() (guardrail #50).
    from nesi_bench_v0.render import HTML_TEMPLATE
    attend_fn = HTML_TEMPLATE.split("function attend(id) {{")[1].split("\n  function releaseAttention", 1)[0]
    assert "DATA.strings[" in attend_fn
    assert "disclosureEl.textContent = lines.join" in attend_fn


def test_disclosure_strings_present_and_lawful():
    from nesi_bench_v0.strings.registry import STRINGS, LAWFUL_CLASSES
    for key in ("disclosure.proposed-thread", "link.type.coherent-tension", "link.type.derived-from"):
        assert key in STRINGS
        assert STRINGS[key]["class"] in LAWFUL_CLASSES


def test_severed_edge_is_removed_not_faded():
    from nesi_bench_v0.render import HTML_TEMPLATE
    sever_fn = HTML_TEMPLATE.split("function severEdge(e) {{")[1].split("}}", 1)[0]
    assert "splice" in sever_fn
    assert "removeChild" in sever_fn
    assert "opacity" not in sever_fn and "fade" not in sever_fn


def test_gate_shear_resists_only_the_perpendicular_axis():
    # v1 Sec 5.2 gate shear: resistance perpendicular to the seam (X, since
    # X_GATE is a vertical line) only -- Y must never be touched by the
    # freeze, unlike break's static-breakaway which caps both axes.
    from nesi_bench_v0.render import HTML_TEMPLATE
    shear_branch = HTML_TEMPLATE.split(
        "}} else if (region === 'gate' || region === 'landing') {{"
    )[1].split("}}\n      // all other regions", 1)[0]
    assert "targetX = shearAnchorX" in shear_branch
    assert "targetY" not in shear_branch  # Y is never reassigned in this branch
    assert "physics.gate_shear_threshold" in shear_branch
    assert "physics.gate_intersection_padding" in shear_branch


def test_gate_shear_releases_and_rearms_per_carry():
    # freeze-then-release, not a permanent lock: once perpTravel clears the
    # threshold it releases for the rest of the carry (shearReleased),
    # and leaving the zone without releasing re-arms the anchor for the
    # next approach (shearAnchorX reset to null) rather than staying stuck.
    from nesi_bench_v0.render import HTML_TEMPLATE
    shear_branch = HTML_TEMPLATE.split(
        "}} else if (region === 'gate' || region === 'landing') {{"
    )[1].split("}}\n      // all other regions", 1)[0]
    assert "shearReleased = true" in shear_branch
    assert "shearAnchorX = null" in shear_branch
    # reset on every new carry (pointerdown), same discipline as breakawayDone
    pointerdown_fn = HTML_TEMPLATE.split("el.addEventListener('pointerdown', ev => {{")[1].split(
        "el.setPointerCapture", 1
    )[0]
    assert "shearAnchorX = null" in pointerdown_fn
    assert "shearReleased = false" in pointerdown_fn


if __name__ == "__main__":
    test_renders_no_remote_resources()
    test_all_region_keys_present_as_data_only()
    test_region_tag_hidden_by_default()
    test_no_greeting_or_coaching_text()
    test_tethers_hidden_at_rest_guardrail_29()
    test_strut_and_ratified_and_proposed_are_visually_distinct_guardrail_31()
    test_no_error_or_danger_styling_on_tension_guardrail_35()
    test_proposed_edges_apply_no_force_only_visual_stretch_class()
    test_gate_seam_line_hidden_by_default_guardrail_54()
    test_no_confirm_dialog_or_default_focused_verb_guardrail_17_18()
    test_disclosure_hidden_by_default_and_sourced_from_registry()
    test_disclosure_strings_present_and_lawful()
    test_severed_edge_is_removed_not_faded()
    test_gate_shear_resists_only_the_perpendicular_axis()
    test_gate_shear_releases_and_rearms_per_carry()
    print("render clean: local-only, silent by default, graph + gate guardrails hold")
