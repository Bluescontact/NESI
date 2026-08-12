#!/usr/bin/env python3
"""
NESI GLANCE v0 — the light daily surface. Standard library only.

Proprioception made visible: projects and ideas shown at their stage of
development, read entirely from local state already on disk. No
generation anywhere in this module — it assembles what other organs
already wrote (gate_data.json, marks.jsonl, patterns/, membrane
transition_records) into one flat list of items, each carrying a stage
label, so the tab can render "where is everything" at a glance.

Stages, in the order Kevin's material actually moves through the gate:
    ledger      — standing system gauges (gate_data.ledger_gauges)
    ripe        — felt_read_queue: decisions actually waiting on a mark
    staging     — staging_tray: substrate developed, pre-membrane
    held        — marks.jsonl verdict=hold, not yet re-screened
    crossed     — marks.jsonl verdict=cross (this session's marks; the
                   full canon count comes from gate_data.canon_global)
    canon       — patterns/ on disk right now (library.build_index())

Read-only. Never marks, never writes, never calls the model.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core
import library

GATE_DATA = core.DSS / "gate" / "data" / "gate_data.json"


def _read_json(path: Path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def _read_marks() -> list:
    out = []
    if not core.MARKLOG.exists():
        return out
    for line in core.MARKLOG.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            out.append(json.loads(line))
        except Exception:
            continue
    return out


def build_index() -> dict:
    """Returns {gauges, items} — items is a flat list of dicts, each:
    {stage, title, detail, source} — ready to render as one card each."""
    gate = _read_json(GATE_DATA, {})
    gauges = gate.get("ledger_gauges", [])
    items = []

    for g in gauges:
        items.append({
            "stage": "ledger", "title": g.get("name", "?"),
            "detail": f"{g.get('reading','')}\n\n{g.get('note','')}",
            "source": "gate_data.json · ledger_gauges",
        })

    for q in gate.get("felt_read_queue", []):
        items.append({
            "stage": "ripe", "title": q.get("title", "?"),
            "detail": f"{q.get('changes','')}\n\nmark size: {q.get('mark_size','?')}",
            "source": q.get("origin", "gate_data.json · felt_read_queue"),
        })

    for s in gate.get("staging_tray", []):
        items.append({
            "stage": "staging", "title": s.get("title", "?"),
            "detail": f"class: {s.get('class','?')} · status: {s.get('status','?')}"
                      f"\n\n{s.get('note','')}",
            "source": "gate_data.json · staging_tray",
        })

    marks = _read_marks()
    for m in marks:
        v = m.get("verdict")
        if v not in ("hold", "cross"):
            continue
        items.append({
            "stage": "held" if v == "hold" else "crossed",
            "title": m.get("id", m.get("pile", "?")),
            "detail": f"verdict: {v} · at: {m.get('at','?')}"
                      + (f" · condition: {m.get('condition')}" if m.get("condition") else ""),
            "source": "marks/marks.jsonl",
        })

    canon_count = gate.get("canon_global")
    if canon_count is None:
        idx = library.build_index()
        canon_count = len([e for e in idx if e["state"] == "canon"])
    items.append({
        "stage": "canon", "title": f"{canon_count} patterns standing in the library",
        "detail": "the pattern library tab holds the full browsable list, "
                  "with lineage links.",
        "source": "patterns/ on disk",
    })

    return {"gauges": gauges, "items": items}


STAGE_ORDER = ["ripe", "staging", "held", "crossed", "ledger", "canon"]
STAGE_LABEL = {
    "ripe": "RIPE — waiting on your mark",
    "staging": "STAGING — developed, pre-membrane",
    "held": "HELD",
    "crossed": "CROSSED (this session)",
    "ledger": "STANDING GAUGES",
    "canon": "CANON",
}
