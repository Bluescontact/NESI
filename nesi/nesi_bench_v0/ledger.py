"""The dry-run gate ledger (v1 Sec 12, named as a v0 deliverable, built 2026-07-21).

Python-side, stdlib-only persistence: `record()` appends one JSON line per
mark-worthy event to `nesi_bench_v0/ledger/dry_run.jsonl`. This is what makes
`failure.write-not-recorded` and `failure.mark-not-written` (strings/registry.py)
finally testable -- until this module existed there was no write-capable
operation anywhere in v0 that could fail, so those two strings sat registered
and unreachable.

`failure.engine-dark` stays correctly unwired here on purpose: it fires only
when an engine call returns nothing, and this module makes no engine call --
wiring it would be inventing a failure that structurally cannot happen while
the engine is dark, the opposite of "render the structural consequence."

Honest limit, named rather than smoothed over: this module has no live call
site yet. The rendered surface (render.py's HTML_TEMPLATE) is pure client-side
JS with no server round-trip -- there is no write path from a pointerup mark
event back into this Python module today. Wiring one requires crossing the
renderer seam (seam.py's own law: "nothing should import webview directly
outside renderer/pywebview_renderer.py") via pywebview's js_api bridge, which
is a real architectural decision -- which renderer implementations get a
callback path, whether NullRenderer needs a headless stub -- not something to
improvise unilaterally into the shared, renderer-agnostic JS template. This
module is real, tested, and ready; the last wire is a named open question, not
a build task quietly skipped.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

LEDGER_DIR = Path(__file__).resolve().parent / "ledger"
LEDGER_PATH = LEDGER_DIR / "dry_run.jsonl"


class LedgerWriteError(Exception):
    """Raised when a ledger append fails -- the caller decides whether that
    maps to failure.write-not-recorded or failure.mark-not-written; this
    module only guarantees the failure is loud, never silent."""


def record(event: str, detail: dict[str, Any] | None = None, *, path: Path | None = None) -> dict:
    """Append one line: {"event": event, "detail": detail}. No timestamp
    field -- this module has no clock primitive of its own (same discipline
    guardrail #71 holds the rendered surface to); a caller that wants one
    passes it inside `detail` explicitly, so provenance is never silently
    invented here.

    Returns the entry actually written. Raises LedgerWriteError, loudly, on
    any I/O failure -- never swallows a failed write."""
    entry = {"event": event, "detail": detail or {}}
    target = path or LEDGER_PATH
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        with target.open("a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except OSError as exc:
        raise LedgerWriteError(f"ledger append failed for event {event!r}: {exc}") from exc
    return entry


def read_all(*, path: Path | None = None) -> list[dict]:
    """Read every recorded entry, in order. Empty list if the ledger has
    never been written to -- an empty ledger is a true, unremarkable state,
    not an error."""
    target = path or LEDGER_PATH
    if not target.exists():
        return []
    entries = []
    with target.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                entries.append(json.loads(line))
    return entries


if __name__ == "__main__":
    e = record("smoke-test", {"source": "ledger.py:__main__"})
    print(f"wrote: {e}", file=sys.stderr)
    print(f"ledger now holds {len(read_all())} entries at {LEDGER_PATH}", file=sys.stderr)
