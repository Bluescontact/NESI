#!/usr/bin/env python3
"""
lint_bridge.py — attach pattern-library lint to a staged object, in place.

The conductor stays stdlib; this bridge is a separate process that reuses
tools/codex_index (which owns its own installed deps: chromadb +
sentence-transformers). Reuse, not a new dependency of the conductor.

Usage: python lint_bridge.py <staged_object.json>

Lint vocabulary is codex_index's own: FOLD (dist < 0.25, already canon),
HOLD (0.25-0.50, close to a pattern — the crookedness worth a look),
PASS (>= 0.50, no close match). A pre-filter, not a judge.
"""

import json
import os
import sys

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DSS = os.path.abspath(os.path.join(THIS_DIR, "..", ".."))
CODEX = os.path.join(DSS, "tools", "codex_index")
sys.path.insert(0, CODEX)
os.chdir(CODEX)  # query.py resolves its db relative to itself

from query import match, FOLD_THRESHOLD, HOLD_THRESHOLD  # noqa: E402


def read_of(dist):
    if dist < FOLD_THRESHOLD:
        return "FOLD"
    if dist < HOLD_THRESHOLD:
        return "HOLD"
    return "PASS"


def main(path):
    obj = json.load(open(path, encoding="utf-8"))
    items = obj.get("object", {}).get("items", [])
    for it in items:
        text = it.get("item", "")
        if not text.strip():
            it["lint"] = None
            continue
        hits = match(text, n=1)
        if hits:
            top = hits[0]
            it["lint"] = {"nearest": top["pattern"],
                          "dist": round(top["distance"], 3),
                          "read": read_of(top["distance"])}
        else:
            it["lint"] = {"nearest": None, "dist": None, "read": "PASS"}
    reads = [it["lint"]["read"] for it in items if it.get("lint")]
    obj["lint"] = {
        "by": "codex_index (pattern library)",
        "items_linted": len(reads),
        "folds": reads.count("FOLD"),
        "holds": reads.count("HOLD"),
        "passes": reads.count("PASS"),
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
    print(f"linted {os.path.basename(path)}: {obj['lint']}")


if __name__ == "__main__":
    main(sys.argv[1])
