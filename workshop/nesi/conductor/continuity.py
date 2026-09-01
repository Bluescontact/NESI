#!/usr/bin/env python3
"""
NESI CONTINUITY v0 — the persistence layer, so the keeper stops being it.
Standard library only. DETERMINISTIC BY LAW: no engine call anywhere.

A derived resume-VIEW, never a source of truth. The ledgers and queues
(staged/, inbox/, marks.jsonl, gate_data.json) remain authoritative;
continuity reads them, persists a fast-resume snapshot, and renders it.
Nothing here is operated and nothing here asks the keeper to feed it — if a
change makes the keeper maintain continuity by hand, it broke the gift.

Write side (called from nesi_app, never from core):
  checkpoint()      — derive resume-state, write nesi/continuity/state.json.
                      Cheap: skipped when the derived state hasn't changed.
  close_snapshot()  — final checkpoint + timestamped copy into
                      nesi/continuity/history/ (NESI's yesterday), pruned to
                      the configured retention.
Read side:
  resume()          — last sitting's state.json, or None on first run
                      (first run renders nothing; no error).

SEAM (documented, not built): interrogator Move B may later read
history/close_*.json to sense drift across sittings — schema below is the
contract. Continuity leaves the yesterday; it never does the comparison.

Snapshot schema (state.json and every history file):
  {closed_at, where_it_closed,               # derived one-liner, never authored
   open_threads: [{id, pile, summary, engine}],   # staged, unmarked
   inbox: [names],                            # dropped, not yet staged
   held_count, felt_read_count,
   last_marks: [{ts, pile, verdict}]}         # tail of marks.jsonl, newest first
"""

import json
import sys
from datetime import datetime
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]
DSS       = NESI.parent
CONT      = NESI / "continuity"
STATE     = CONT / "state.json"
HISTORY   = CONT / "history"
CONFIG    = CONT / "config.json"
MARKLOG   = NESI / "marks" / "marks.jsonl"
GATE_DATA = DSS / "gate" / "data" / "gate_data.json"

DEFAULTS = {"snapshot_retention": 14, "checkpoint_on_mutation": True}

_last_written = None   # in-process change detector; cheap, resets each boot


def _now():
    return datetime.now().isoformat(timespec="seconds")


def load_config() -> dict:
    try:
        cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
        return {**DEFAULTS, **{k: v for k, v in cfg.items() if k in DEFAULTS}}
    except Exception:
        return dict(DEFAULTS)


def _tail_marks(n=3) -> list:
    try:
        lines = MARKLOG.read_text(encoding="utf-8").strip().splitlines()
    except Exception:
        return []
    out = []
    for line in reversed(lines):
        try:
            m = json.loads(line)
        except Exception:
            continue
        if m.get("verdict") in ("cross", "hold", "compost", "uncross"):
            out.append({"ts": m.get("ts", ""), "pile": m.get("pile", ""),
                        "verdict": m["verdict"]})
        if len(out) >= n:
            break
    return out


def derive(core_state: dict) -> dict:
    """Resume-state, all derived — nothing authored, nothing asked of the keeper."""
    open_threads = []
    for o in core_state.get("staged", []):
        if (o.get("mark") or {}).get("verdict") or o.get("crossed"):
            continue
        open_threads.append({
            "id": o.get("id", ""), "pile": o.get("pile", ""),
            "summary": ((o.get("object") or {}).get("summary") or "")[:140],
            "engine": ((o.get("run") or {}).get("engine") or "")[:60]})
    held_count = felt_count = None
    try:
        gate = json.loads(GATE_DATA.read_text(encoding="utf-8"))
        held_count = sum(1 for t in gate.get("staging_tray", [])
                         if t.get("status") == "held")
        felt_count = len(gate.get("felt_read_queue", []))
    except Exception:
        pass   # the board shows "unreadable" rather than a fabricated number
    last = _tail_marks(3)
    where = (f"last mark: {last[0]['verdict']} on {last[0]['pile']} · {last[0]['ts']}"
             if last else "no marks yet")
    return {"closed_at": _now(), "where_it_closed": where,
            "open_threads": open_threads,
            "inbox": [p["name"] for p in core_state.get("inbox", [])],
            "held_count": held_count, "felt_read_count": felt_count,
            "last_marks": last}


def checkpoint(core_state: dict) -> bool:
    """Small write, only when the derived state actually changed."""
    global _last_written
    snap = derive(core_state)
    key = json.dumps({k: v for k, v in snap.items() if k != "closed_at"},
                     sort_keys=True, ensure_ascii=False)
    if key == _last_written:
        return False
    CONT.mkdir(parents=True, exist_ok=True)
    tmp = STATE.with_suffix(".tmp")
    tmp.write_text(json.dumps(snap, indent=1, ensure_ascii=False),
                   encoding="utf-8")
    tmp.replace(STATE)
    _last_written = key
    return True


def close_snapshot(core_state: dict) -> None:
    """Final checkpoint + the retained yesterday. Never raises into the
    close path — a failed snapshot must not trap the window open."""
    try:
        checkpoint(core_state)
        if not STATE.exists():
            return
        HISTORY.mkdir(parents=True, exist_ok=True)
        stamp = _now().replace(":", "-")
        (HISTORY / f"close_{stamp}.json").write_text(
            STATE.read_text(encoding="utf-8"), encoding="utf-8")
        keep = load_config()["snapshot_retention"]
        snaps = sorted(HISTORY.glob("close_*.json"))
        for old in snaps[:-keep] if keep > 0 else []:
            old.unlink()
    except Exception:
        pass


def resume() -> dict | None:
    """Last sitting, or None on first run — first run renders nothing."""
    try:
        return json.loads(STATE.read_text(encoding="utf-8"))
    except Exception:
        return None


if __name__ == "__main__":
    # headless check: derive+checkpoint from live core state, then resume
    sys.path.insert(0, str(Path(__file__).parent))
    import core
    st = core.state()
    print("checkpoint wrote:", checkpoint(st))
    close_snapshot(st)
    print(json.dumps(resume(), ensure_ascii=False, indent=1))
