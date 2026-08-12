#!/usr/bin/env python3
"""
NESI READER v0 — the structural second-read, externalized. Standard library
only. Built session 2026-07-20 (§ NESI SESSION 3/3).

Kevin has always run a second read on his own drafts — load paths named,
passive voice caught, the uncomfortable thing said first, drift from an
earlier position noticed. This module is that read, externalized enough to
run on demand instead of only in his head. What it does NOT do while the
engine is dark: understand meaning. The three checks below are mechanical
(pattern lookup, regex, marks.jsonl lookup) — honest work, not a reading.
The actual reading is op="read" through the one socket, stubbed, always
empty until login. This organ never fabricates a finding to look alive.

Shared, not duplicated (S2's default, reaffirmed by name in S3 §2A/§3): ONE
reader, called from bench.run_break() (session 2's bench) AND from
interrogator.check_reader() (below) — not two copies of this logic anywhere.
Flip to two only if the reads a bench draft needs and a raw front-drop needs
ever actually diverge; nothing here assumes they will.

UNCOMFORTABLE-FIRST is a presentation law, not a content law: findings are
tagged 'uncomfortable' or 'neutral' by the deterministic checks themselves
(passive voice and drift are always uncomfortable; load-paths are always
neutral/informational), then sorted so uncomfortable leads. The socket's own
findings (once real) carry their own severity tag and sort the same way —
no special-casing needed when the engine lights.

The reader reads. It never marks, never fabricates certainty, never asks
Kevin to confirm anything — it hands back a list, ordered, and stops.
"""

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import bench   # the one socket — bench.invoke(); no cycle (bench never imports reader)
import core

MARKLOG = core.MARKLOG

# a heuristic, not a grammar: catches the common "to be" + past-participle
# shape. Misses quietly (irregular participles, split constructions); never
# fabricates a flag. Good enough for "notice it exists," not a linter.
_PASSIVE_RE = re.compile(
    r"\b(is|are|was|were|be|been|being)\s+\w+ed\b", re.IGNORECASE)


def _passive_flags(text: str) -> list:
    if not text:
        return []
    hits = sorted(set(m.group(0).lower() for m in _PASSIVE_RE.finditer(text)))
    if not hits:
        return []
    return [{
        "severity": "uncomfortable",
        "text": f"passive voice: {', '.join(hits[:5])}"
                + (f" (+{len(hits) - 5} more)" if len(hits) > 5 else "")
                + " — who's doing it?",
    }]


def _load_paths(obj: dict) -> list:
    """What this object already names as bearing on it — its own provenance,
    read off the object's own fields. Never inferred, only reported."""
    pulled = obj.get("pulled") or []
    if not pulled:
        return []
    names = ", ".join(p.get("title", p.get("file", "?")) for p in pulled[:6])
    more = f" (+{len(pulled) - 6} more)" if len(pulled) > 6 else ""
    return [{"severity": "neutral", "text": f"load paths: {names}{more}"}]


def _drift_check(obj: dict) -> list:
    """Same pile, prior verdict on record, being drafted again — a real
    signal (this ground was marked before), not a fabricated one. Reads
    marks.jsonl only; writes nothing. Skips quietly if the object carries no
    pile name (e.g. a bare front-drop with no provenance to check)."""
    pile = obj.get("pile") or obj.get("intent")
    if not pile:
        return []
    try:
        lines = MARKLOG.read_text(encoding="utf-8").strip().splitlines()
    except Exception:
        return []
    prior = None
    for line in lines:
        try:
            m = json.loads(line)
        except Exception:
            continue
        if m.get("pile") == pile and m.get("verdict") in ("compost", "hold", "cross"):
            prior = m   # last one wins — most recent verdict on this pile
    if not prior:
        return []
    return [{
        "severity": "uncomfortable",
        "text": f"this pile was already marked {prior['verdict']} on "
                f"{prior.get('ts', '?')[:10]} — same ground again, is the "
                "reason for returning to it named?",
    }]


def _structural_checks(obj: dict) -> list:
    """The deterministic floor — no socket call, no engine. Exposed
    separately from read() so a caller (e.g. bench's break stub) can ask for
    just the mechanical part without paying for a socket round-trip twice."""
    text = obj.get("draft") or obj.get("text") or ""
    return _passive_flags(text) + _drift_check(obj) + _load_paths(obj)


def read(obj: dict) -> dict:
    """THE reader's one entry point. `obj` may be a full bench working-object
    (draft/pulled/intent/pile/history) or a bare dict carrying at least
    'draft' or 'text' — front-drop callers pass the latter. Missing fields
    degrade to skipped checks, never fabricated ones.

    Returns {'lines': [...ordered uncomfortable-first...], 'engine', 'stub'}.
    """
    findings = list(_structural_checks(obj))
    sem = bench.invoke("read", {"object": obj})
    for f in sem["output"].get("findings", []):
        findings.append({"severity": f.get("severity", "uncomfortable"),
                         "text": f.get("text", "")})
    findings.sort(key=lambda f: 0 if f["severity"] == "uncomfortable" else 1)
    return {"lines": [f["text"] for f in findings],
            "engine": sem["engine"], "stub": sem["stub"]}


if __name__ == "__main__":
    demo = {"draft": "The decision was made quietly and it was assumed that "
                     "the cost would be handled later.",
            "pulled": [{"title": "load_to_form", "file": "load_to_form.md"}],
            "pile": "demo-pile-does-not-exist.md"}
    r = read(demo)
    print(json.dumps(r, ensure_ascii=False, indent=1) if r["lines"]
          else "(silence — nothing to read)")
