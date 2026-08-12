"""pywebview implementation of the renderer seam (held recommendation).

pywebview opens a native OS window and loads a local file:// URL directly --
no HTTP server, no bound port, no socket. That is the property this build
must prove (spine law 8), not merely assert. test_renderer_seam.py checks it
by inspecting open sockets/ports before and after open(), not by trusting
this docstring.
"""

from __future__ import annotations

from pathlib import Path

from .seam import Renderer


class PywebviewRenderer(Renderer):
    def __init__(self):
        self._window = None

    def open(self, html_path: Path, title: str) -> None:
        try:
            import webview
        except ImportError as exc:
            raise RuntimeError(
                "pywebview is not installed -- run `pip install pywebview` "
                "or use NullRenderer for a headless smoke test"
            ) from exc
        url = html_path.resolve().as_uri()
        self._window = webview.create_window(title, url)
        webview.start()

    def close(self) -> None:
        if self._window is not None:
            self._window.destroy()
            self._window = None

    @property
    def opened_network_port(self) -> bool:
        # pywebview loads a local file:// URL directly; it does not bind a
        # server socket to serve that content. Verified structurally in
        # tests/test_renderer_seam.py, not asserted here.
        return False
