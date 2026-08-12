#!/usr/bin/env python3
"""
PULSE WIRE — the metabolizer behind the board (migration pass A).

Connects the v2 strata (soil / coordination / board) to the REAL metabolizer
(core.py) — the kept pulse. It is NOT a new pipeline: it hands composted material
to core.capture_paste (the same intake write-path the left pane has always
watched), so the pulse runs poll_once -> stage -> metabolize exactly as before;
and it reads core.state() so the board can show the real pulse (inbox/staged),
not a toy store.

Guarded: if core can't import (rare — e.g. a stripped context), the wire reports
unavailable instead of crashing the surface. Stdlib only. Frozen-aware.
"""
import sys
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(NESI / "conductor"))


def _core():
    import core
    return core


def available():
    """True if the real pulse (core) is importable."""
    try:
        _core()
        return True
    except Exception:
        return False


def _text_of(material):
    if isinstance(material, dict):
        for k in ("text", "true_thing", "offer", "body", "content"):
            v = str(material.get(k, "")).strip()
            if v:
                return v
        return ""
    return str(material).strip()


def feed(material):
    """Hand composted material to the REAL intake path (core.capture_paste),
    so the pulse metabolizes it. `material` is text or a record with a
    text-bearing field. Returns the INBOX Path, or None if unavailable/empty."""
    text = _text_of(material)
    if not text:
        return None
    try:
        return _core().capture_paste(text)
    except Exception:
        return None


def pulse_state():
    """The real pulse state for the board: {engine, inbox:[...], staged:[...]}.
    Empty shell if the pulse is unavailable (surface never crashes)."""
    try:
        return _core().state()
    except Exception:
        return {"engine": None, "inbox": [], "staged": []}


if __name__ == "__main__":
    print("pulse available:", available())
    st = pulse_state()
    print("engine:", st.get("engine"),
          "| inbox:", len(st.get("inbox", [])),
          "| staged:", len(st.get("staged", [])))
