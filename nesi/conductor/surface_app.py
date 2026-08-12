"""NESI SURFACE APP — the native window that IS NESI's face.

Loads NESI_surface.html in a real pywebview window and hands it the bridge
(surface_bridge.Api) as `window.pywebview.api`, so the face reads/writes NESI's
real disk (inbox/staged/marks) and talks to the local engine (hermes3) — no
browser, no CORS, no login, no cloud.

Run:  python nesi/conductor/surface_app.py     (or the launcher .bat)
Freeze later:  PyInstaller onefile windowed, entry = this file.
"""
import sys
from pathlib import Path

_HERE = Path(__file__).resolve()
NESI = Path(sys.executable).resolve().parent if getattr(sys, "frozen", False) else _HERE.parents[1]
sys.path.insert(0, str(NESI / "conductor"))

import webview                      # noqa: E402
from surface_bridge import Api      # noqa: E402


def main():
    html = NESI / "NESI_surface.html"
    if not html.exists():
        raise SystemExit(f"NESI_surface.html not found at {html}")
    api = Api()
    webview.create_window(
        "NESI",
        url=html.as_uri(),
        js_api=api,
        width=1000, height=780,
        min_size=(720, 560),
        background_color="#f7f5f0",
    )
    webview.start()


if __name__ == "__main__":
    main()
