"""NESI bench — geometric layer, cycle 1. Launch entry point.

Opens a new, separate local window (NOT the running NESI.exe) that shows
bench objects as position-only markers traveling across six regions —
intake, staging, break, gate, landing, held-bay, compost. Position is the
only carrier of state; nothing is relabeled. Driven by a mock feed
(mock_feed.json); the gate records a dry-run mark to a local ledger
(dry_run_gate_ledger.jsonl); no engine call, no port, no network.

See STANDING_NOTE.md for what this renders, where the renderer seam is,
and what is deferred to cycles 2 (diction) and 3 (visual polish).
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from bridge_api import BridgeAPI  # noqa: E402
from pywebview_renderer import PywebviewRenderer  # noqa: E402

HTML_PATH = HERE / "renderer" / "index.html"


def main():
    if not HTML_PATH.exists():
        raise SystemExit(f"renderer not found: {HTML_PATH}")
    api = BridgeAPI()
    renderer = PywebviewRenderer()
    renderer.open(
        title="NESI bench — geometric layer (cycle 1)",
        html_path=str(HTML_PATH),
        api=api,
    )


if __name__ == "__main__":
    main()
