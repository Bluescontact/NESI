"""The one object exposed to the geometric bench's page as
window.pywebview.api. Exactly two calls cross this bridge:

  get_mock_feed()        — seeds intake with the fixtures in mock_feed.json
  record_dry_run_mark()  — appends one line when the gate fires cross/uncross

Nothing else crosses. No real engine call, no real mark, no real canon
write — every ledger line is loud-stubbed as dry-run, cycle 1.
"""

import json
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
LEDGER_PATH = HERE / "dry_run_gate_ledger.jsonl"
FEED_PATH = HERE / "mock_feed.json"


class BridgeAPI:
    def __init__(self, feed_path=None, ledger_path=None):
        # Overridable so the smoke test can point at a throwaway ledger
        # instead of writing test litter into the real dry-run file.
        self.feed_path = Path(feed_path) if feed_path else FEED_PATH
        self.ledger_path = Path(ledger_path) if ledger_path else LEDGER_PATH

    def get_mock_feed(self):
        data = json.loads(self.feed_path.read_text(encoding="utf-8"))
        return data.get("objects", [])

    def record_dry_run_mark(self, payload):
        payload = payload or {}
        line = {
            "stub": "[DRY-RUN GATE — cycle 1, geometry layer, not real canon]",
            "id": payload.get("id"),
            "label": payload.get("label"),
            "disposition": payload.get("disposition"),
            "at_js": payload.get("at"),
            "recorded_at": datetime.now(timezone.utc).isoformat(),
        }
        with self.ledger_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(line, ensure_ascii=False) + "\n")
        return {"ok": True}
