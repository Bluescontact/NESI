"""Entry point for the NESI bench v0 dry-run surface (Stage 0 rails only).

Stage 0 proves the rails: renderer seam, mock feed, string registry + lint,
physics config. It does not render objects yet -- that is Stage 1. Running
this opens the empty, silent surface.html and loads the mock feed into
memory to prove the feed path works; nothing is drawn from it yet.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .feed import load_mock_feed
from .strings import run_all as lint_all
from .renderer import NullRenderer
from .render import build_surface_html


def run(headless: bool = False) -> int:
    violations = lint_all()
    if violations:
        for v in violations:
            print(v, file=sys.stderr)
        return 1

    objects = load_mock_feed()
    print(f"mock feed loaded: {len(objects)} objects", file=sys.stderr)

    surface_html = build_surface_html()

    if headless:
        renderer = NullRenderer()
    else:
        from .renderer import PywebviewRenderer
        renderer = PywebviewRenderer()

    renderer.open(surface_html, "NESI")
    assert renderer.opened_network_port is False
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="NESI bench v0 dry-run surface")
    parser.add_argument("--headless", action="store_true", help="use NullRenderer, no window")
    args = parser.parse_args()
    return run(headless=args.headless)


if __name__ == "__main__":
    raise SystemExit(main())
