"""Stage 5 -- the build-level tests (guardrails #70-76), wired for real.

Honest scope note, stated once here rather than silently assumed: this
project has no JS execution harness (no jsdom, no headless-browser test
runner) inside this Python-only test suite. Guardrails #70-76 as written
describe *runtime* scripted paths ("open the Bench, restore, move an
object..."). Without a way to actually execute the template's JS and
inspect the live DOM, each test below is a **static/structural proxy**:
it inspects the actual source of `HTML_TEMPLATE` and the pure-Python
modules for the *capability* the guardrail forecloses, rather than running
the scripted path and observing the result. This is the same approach
Stage 3 used for guardrail-adjacent checks, made explicit and complete
here rather than assumed. If a real browser-driven test runner is ever
added to this project, these should be re-verified live, the same way
Stage 1-2's in-browser drag/hover checks were, and Stage 3's blocked
verification (STANDING.md) should finally be closed out too.
"""

import re
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.render import HTML_TEMPLATE, build_surface_html
from nesi_bench_v0 import graph as graph_module


def _render_html() -> str:
    out_dir = Path(tempfile.mkdtemp())
    return build_surface_html(out_dir / "surface_test.html").read_text(encoding="utf-8")


def _function_body(name: str, end_marker: str) -> str:
    return HTML_TEMPLATE.split(f"function {name}", 1)[1].split(end_marker, 1)[0]


# --- #70 silence regression -------------------------------------------------
# Proxy: the silent-path code (region creation, object creation, an ordinary
# endDrag with no crossing) may only ever write two kinds of text --
# DATA.strings[...] lookups (structural nouns, lawful unconditionally) and
# obj.content (exact object content, lawful unconditionally). No other
# textContent/innerHTML write may appear in those code paths.
def test_silence_regression_on_ordinary_paths():
    region_loop = HTML_TEMPLATE.split("for (const key in rects) {{\n    const r = rects[key];\n    const el = document.createElement", 1)[1].split("bench.appendChild(el);\n  }}", 1)[0]
    object_loop = HTML_TEMPLATE.split("DATA.objects.forEach(obj => {{\n    const el = document.createElement", 1)[1].split("state[obj.id] = {{", 1)[0]

    for label, body in (("region-creation loop", region_loop), ("object-creation loop", object_loop)):
        writes = re.findall(r"\.textContent\s*=\s*([^;]+);", body)
        for w in writes:
            assert "DATA.strings[" in w or w.strip() == "obj.content" or w.strip() == "key", (
                f"{label} writes unregistered text: {w!r}"
            )
        assert "innerHTML" not in body, f"{label} uses innerHTML"


# --- #71 held-time -----------------------------------------------------------
# Proxy: no timer/clock primitive exists anywhere in the rendered surface,
# so nothing CAN derive an age, a "waiting since", or a duration-triggered
# appearance change for a held object -- there is no incapacity to bypass
# because there is no mechanism to bypass.
def test_held_time_has_no_clock_or_timer_primitive():
    html = _render_html()
    for forbidden in ("setInterval(", "setTimeout(", "Date.now(", "new Date("):
        assert forbidden not in html, f"a timer/clock primitive exists: {forbidden!r}"


# --- #72 gate-incapacity ------------------------------------------------------
# Proxy: (a) the carry only starts on a trusted pointer event -- a
# script-dispatched drag cannot open the crossing window at all; (b) the
# functions that write a mark (ratifyEdge/revertEdge/severEdge) are never
# exposed on `window` and are only ever called from inside endDrag(), never
# from physicsTick, load-time setup, or any other reachable path.
def test_carry_requires_a_trusted_pointer_event():
    pointerdown_body = HTML_TEMPLATE.split("el.addEventListener('pointerdown', ev => {{", 1)[1].split("el.setPointerCapture(ev.pointerId);", 1)[0]
    assert "ev.isTrusted" in pointerdown_body
    # the trust check must appear before dragging state is entered, not after
    assert pointerdown_body.index("ev.isTrusted") < pointerdown_body.index("s.dragging = true")


def test_mark_functions_not_exposed_globally():
    html = _render_html()
    for name in ("ratifyEdge", "revertEdge", "severEdge"):
        assert f"window.{name}" not in html
        assert f"window['{name}']" not in html


def test_mark_functions_only_called_from_end_drag():
    end_drag_body = _function_body("endDrag() {{", "\n    el.addEventListener('pointerup'")
    for name in ("ratifyEdge", "severEdge", "revertEdge"):
        assert f"{name}(" in end_drag_body, f"{name} is never called from endDrag at all"

    # and nowhere else in the file calls them
    outside = HTML_TEMPLATE.replace(end_drag_body, "")
    for name in ("ratifyEdge", "severEdge", "revertEdge"):
        call_sites = re.findall(rf"(?<!function ){re.escape(name)}\(", outside)
        assert call_sites == [], f"{name} called outside endDrag: {call_sites}"


# --- #73 adjacency ------------------------------------------------------------
# Proxy: graph.py, the sole edge-producing module, must contain no notion
# of position, distance, or proximity at all -- if it can't compute
# distance, it structurally cannot produce a proximity-derived edge.
def test_graph_module_has_no_spatial_computation():
    src = Path(graph_module.__file__).read_text(encoding="utf-8")
    for forbidden in ("distance", "proximity", ".x", ".y", "position"):
        assert forbidden not in src, f"graph.py references spatial data: {forbidden!r}"


# --- #74 engine-dark -----------------------------------------------------------
# Proxy: no engine-invocation primitive (network call, websocket, engine
# module import) exists anywhere in the rendered surface or the Python
# build modules -- consistent with "the engine stays dark" being true by
# absence, not by a guard around a call that could otherwise happen.
def test_no_engine_invocation_exists_anywhere():
    html = _render_html()
    for forbidden in ("fetch(", "XMLHttpRequest", "WebSocket(", "import(", "require("):
        assert forbidden not in html, f"an engine-invocation primitive exists: {forbidden!r}"


# --- #75 microcopy audit -------------------------------------------------------
# This one has a REAL runtime harness already (strings/lint.py), verified
# in Stage 4 by injecting a real violation and watching it fail. Wire it
# here as the release-gating call the guardrail names, rather than leaving
# it implicit in test_lint.py alone.
def test_microcopy_audit_passes_lint():
    from nesi_bench_v0.strings import run_all
    violations = run_all()
    assert violations == [], "\n".join(violations)


# --- #76 visual-persuasion audit ----------------------------------------------
# Proxy: no verb/command UI (a cross/hold/compost button) exists in v0 at
# all yet -- the mark is purely gesture-driven. That means there is
# nothing yet to render with a persuasive default-focus, size, or color
# hierarchy between lawful movements. This test asserts that absence is
# still true (so if a later stage adds buttons without re-auditing, this
# test will need to change, not silently pass); it does not certify a
# verb UI that doesn't exist yet.
def test_no_command_buttons_exist_to_bias_yet():
    html = _render_html()
    assert "<button" not in html
    assert "autofocus" not in html.lower()


if __name__ == "__main__":
    test_silence_regression_on_ordinary_paths()
    test_held_time_has_no_clock_or_timer_primitive()
    test_carry_requires_a_trusted_pointer_event()
    test_mark_functions_not_exposed_globally()
    test_mark_functions_only_called_from_end_drag()
    test_graph_module_has_no_spatial_computation()
    test_no_engine_invocation_exists_anywhere()
    test_microcopy_audit_passes_lint()
    test_no_command_buttons_exist_to_bias_yet()
    print("foreclosures clean: #70-76 static/structural proxies hold (see module docstring for scope)")
