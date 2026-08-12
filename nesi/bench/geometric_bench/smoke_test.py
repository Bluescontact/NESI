"""Headless smoke test for the geometric bench, cycle 1.

Runs without opening a window. Checks: imports clean, the renderer seam
is actually an abstraction pywebview sits behind, the mock feed is
well-shaped, the bridge API round-trips a dry-run mark to a throwaway
ledger (not the real one), and two falsifiers are checked directly
against source: no networking primitive appears anywhere in this
package's own code, and exactly one call site in the front end is
allowed to move an object into 'landing' (the true-gate rule).

Run: python smoke_test.py
"""

import json
import re
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

results = []


def check(name, fn):
    try:
        ok, detail = fn()
    except Exception as e:  # noqa: BLE001 - smoke test wants to report, not raise
        ok, detail = False, f"raised {type(e).__name__}: {e}"
    results.append((name, ok, detail))


def check_imports():
    import renderer_seam  # noqa: F401
    import pywebview_renderer  # noqa: F401
    import bridge_api  # noqa: F401
    import bench_geo  # noqa: F401
    return True, "renderer_seam, pywebview_renderer, bridge_api, bench_geo all import clean"


def check_seam_abstraction():
    from renderer_seam import RendererSeam
    from pywebview_renderer import PywebviewRenderer
    is_subclass = issubclass(PywebviewRenderer, RendererSeam)
    has_open = hasattr(PywebviewRenderer, "open")
    # renderer_seam.py itself must not import webview - that's the seam law
    seam_src = (HERE / "renderer_seam.py").read_text(encoding="utf-8")
    seam_clean = "import webview" not in seam_src
    ok = is_subclass and has_open and seam_clean
    return ok, (
        f"PywebviewRenderer subclasses RendererSeam: {is_subclass}, "
        f"has open(): {has_open}, seam file free of pywebview import: {seam_clean}"
    )


def check_mock_feed_shape():
    data = json.loads((HERE / "mock_feed.json").read_text(encoding="utf-8"))
    objs = data.get("objects", [])
    if not objs:
        return False, "mock_feed.json has zero objects"
    ids = set()
    for o in objs:
        if not isinstance(o.get("id"), str) or not o["id"]:
            return False, f"object missing string id: {o}"
        if not isinstance(o.get("label"), str) or not o["label"]:
            return False, f"object missing string label: {o}"
        if o["id"] in ids:
            return False, f"duplicate id: {o['id']}"
        ids.add(o["id"])
    return True, f"{len(objs)} well-shaped objects, ids unique"


def check_bridge_api_roundtrip():
    from bridge_api import BridgeAPI

    with tempfile.TemporaryDirectory() as tmp:
        ledger_path = Path(tmp) / "smoke_ledger.jsonl"
        api = BridgeAPI(feed_path=HERE / "mock_feed.json", ledger_path=ledger_path)

        feed = api.get_mock_feed()
        if not feed:
            return False, "get_mock_feed() returned nothing"

        result = api.record_dry_run_mark(
            {"id": "smoke-selftest", "label": "smoke test object", "disposition": "cross", "at": "smoke"}
        )
        if not result.get("ok"):
            return False, f"record_dry_run_mark() did not return ok: {result}"

        lines = ledger_path.read_text(encoding="utf-8").strip().splitlines()
        if len(lines) != 1:
            return False, f"expected exactly 1 ledger line, got {len(lines)}"
        line = json.loads(lines[0])
        if line.get("id") != "smoke-selftest" or line.get("disposition") != "cross":
            return False, f"ledger line missing expected fields: {line}"
        if "DRY-RUN GATE" not in line.get("stub", ""):
            return False, "ledger line not loud-stubbed as dry-run"
        return True, f"fed {len(feed)} objects, one dry-run mark round-tripped clean: {line['stub']}"


FORBIDDEN_TOKENS = [
    "socket.socket(",
    "bind(",
    "http.server",
    "HTTPServer",
    "ThreadingHTTPServer",
    "urllib.request",
    "requests.get(",
    "requests.post(",
    "http_server=True",
    "listen(",
]


def check_no_networking_in_source():
    py_files = sorted(HERE.glob("*.py"))
    hits = []
    for f in py_files:
        if f.name == "smoke_test.py":
            continue  # this file legitimately names the forbidden tokens above
        src = f.read_text(encoding="utf-8")
        for tok in FORBIDDEN_TOKENS:
            if tok in src:
                hits.append(f"{f.name}: {tok}")
    if hits:
        return False, "forbidden networking tokens found: " + "; ".join(hits)
    return True, f"scanned {len(py_files)} .py files, zero networking primitives"


def check_true_gate_single_writer():
    js_src = (HERE / "renderer" / "app.js").read_text(encoding="utf-8")
    # every place the literal region string 'landing' is written as a target
    writers = re.findall(r"moveObject\([^)]*'landing'[^)]*\)", js_src)
    if len(writers) != 1:
        return False, f"expected exactly 1 call writing region='landing', found {len(writers)}: {writers}"
    # and that one call must live inside crossGate, not advance/hold/compost
    fn_match = re.search(r"function crossGate\([^)]*\)\s*\{([^}]*)\}", js_src, re.S)
    if not fn_match or "'landing'" not in fn_match.group(1):
        return False, "the sole 'landing' writer is not inside crossGate()"
    return True, "landing is written from exactly one call site, inside crossGate()"


def check_html_present():
    p = HERE / "renderer" / "index.html"
    return p.exists(), str(p)


def main():
    check("imports", check_imports)
    check("renderer seam is a real abstraction", check_seam_abstraction)
    check("mock feed well-shaped", check_mock_feed_shape)
    check("bridge API round-trip (throwaway ledger)", check_bridge_api_roundtrip)
    check("no networking primitive in THIS package's own source", check_no_networking_in_source)
    check("true gate: landing has exactly one writer", check_true_gate_single_writer)
    check("renderer html present", check_html_present)

    print("NESI bench — geometric layer, cycle 1 — smoke test")
    print("-" * 60)
    all_ok = True
    for name, ok, detail in results:
        mark = "PASS" if ok else "FAIL"
        if not ok:
            all_ok = False
        print(f"[{mark}] {name}")
        print(f"       {detail}")
    print("-" * 60)
    print("ALL GREEN" if all_ok else "SMOKE TEST FAILED")
    return 0 if all_ok else 1


if __name__ == "__main__":
    sys.exit(main())
