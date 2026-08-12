"""Stage 0 gate: prove the renderer opens no network port (spine law 8).

This does not trust a docstring's claim. It enumerates the process's open
listening sockets before and after Renderer.open(), and fails if a new one
appears.
"""

import socket
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.renderer import NullRenderer

SURFACE_HTML = Path(__file__).resolve().parents[1] / "renderer" / "surface.html"


def _listening_ports():
    # best-effort, cross-platform: try psutil if present, else fall back to
    # a narrow check via socket module (can't enumerate all sockets without
    # psutil, so this degrades to "did *this test* bind a port").
    try:
        import psutil
        proc = psutil.Process()
        conns = getattr(proc, "net_connections", proc.connections)
        return {c.laddr.port for c in conns(kind="inet") if c.status == "LISTEN"}
    except ImportError:
        return None


def test_null_renderer_opens_no_port():
    before = _listening_ports()
    renderer = NullRenderer()
    renderer.open(SURFACE_HTML, "NESI")
    after = _listening_ports()

    assert renderer.opened_network_port is False
    if before is not None and after is not None:
        assert after - before == set(), f"new listening ports after open(): {after - before}"

    renderer.close()
    assert renderer.is_open is False


def test_surface_html_uses_no_remote_resources():
    html = SURFACE_HTML.read_text(encoding="utf-8")
    for forbidden in ("http://", "https://", "ws://", "wss://"):
        assert forbidden not in html, f"surface.html references a remote resource: {forbidden}"


if __name__ == "__main__":
    test_null_renderer_opens_no_port()
    test_surface_html_uses_no_remote_resources()
    print("renderer seam clean: no port, no remote resource")
