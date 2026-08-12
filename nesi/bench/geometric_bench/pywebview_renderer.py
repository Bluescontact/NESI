"""pywebview implementation of the renderer seam.

Kevin's mark, cycle 1 session law: "Recommended substrate: pywebview —
native local window rendering local HTML/CSS/JS, no server, no port. The
lawful swap from the tkinter Canvas." This is the only file anywhere in
the geometric bench that imports `webview` — everything else talks to
RendererSeam, never to pywebview directly.
"""

import webview

from renderer_seam import RendererSeam


class PywebviewRenderer(RendererSeam):
    def open(self, title, html_path, api, width=1000, height=820):
        webview.create_window(
            title,
            url=html_path,
            js_api=api,
            width=width,
            height=height,
        )
        # http_server=False (pywebview's own default) is kept explicit for
        # the audit trail, but it does NOT mean no port: pywebview always
        # runs its own small BottleServer on 127.0.0.1 (random port) when
        # any window loads a local file — that's how it carries the js_api
        # bridge. Verified live 2026-07-20 via netstat; loopback-only,
        # never reachable off this machine. Full account, corrected after
        # the manifest overclaimed "no port": STANDING_NOTE.md.
        webview.start(http_server=False)
