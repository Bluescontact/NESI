#!/usr/bin/env python3
"""
V2 BOARD DATA — the board's live data layer (migration pass B).

Aggregates the real organs into one plain dict the board renders:
  · embers   — the forest store (the warm ones grown)
  · heartwood— the accreted self (patterns · crossings · growth-ring months) — the TREE
  · held     — everything held, each with its named gap (held.build_index)
  · returns  — what has come back (return_circuit.scan); [] = quiet, honored

Read-only, derived from disk each call, never scores (law 1). Every organ import is
guarded independently so a missing organ degrades that section, never the surface.
Stdlib only. Frozen-aware.
"""
import json
import sys
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(NESI / "conductor"))
FOREST = NESI / "forest"


def _embers():
    out = []
    if FOREST.exists():
        for f in sorted(FOREST.glob("*.json")):
            try:
                g = json.loads(f.read_text(encoding="utf-8"))
            except Exception:
                continue
            t = str(g.get("true_thing", "")).strip()
            if t:
                out.append({"t": t})
    return out


def _heartwood():
    try:
        import heartwood
        patterns, crossings = heartwood.gather()
        rings = heartwood.rings_by_month(crossings)
        return {"patterns": len(patterns), "crossings": len(crossings),
                "rings": list(rings)}
    except Exception:
        return {"patterns": 0, "crossings": 0, "rings": []}


def _held():
    try:
        import held
        out = []
        for h in held.build_index():
            out.append({"title": str(h.get("title", ""))[:60],
                        "gap": str(h.get("gap", ""))[:80],
                        "kind": str(h.get("kind", ""))})
        return out
    except Exception:
        return []


def _returns():
    try:
        import return_circuit
        return list(return_circuit.scan())
    except Exception:
        return []


def _signs():
    """The intake + membrane organs' read-only state (pass C): the door (glance
    gauges), the membrane (skin law + tension-table category counts), the
    reach-back (interrogator's one line). Each guarded; missing = empty."""
    out = {"gauges": [], "skin_law": "", "categories": {}, "reach": "", "worth_marked": 0}
    try:
        import worth
        out["worth_marked"] = len(worth.marked_set())
    except Exception:
        pass
    try:
        import glance
        gi = glance.build_index()
        out["gauges"] = [{"name": str(g.get("name", "")), "state": str(g.get("state", ""))}
                         for g in gi.get("gauges", [])]
    except Exception:
        pass
    try:
        import skin
        out["skin_law"] = str(skin.law_summary())
    except Exception:
        pass
    try:
        import tension_table
        ci = tension_table.canon_index()
        out["categories"] = dict(ci.get("counts", {}))
    except Exception:
        pass
    try:
        import interrogator
        r = interrogator.open_reach()
        lines = r.get("lines") if isinstance(r, dict) else None
        out["reach"] = str(lines[0]) if lines else ""
    except Exception:
        pass
    return out


def collect():
    """One dict for the board. All real, all derived, none scored."""
    return {
        "embers": _embers(),
        "heartwood": _heartwood(),
        "held": _held(),
        "returns": _returns(),
        "signs": _signs(),
    }


if __name__ == "__main__":
    d = collect()
    print("embers:", len(d["embers"]),
          "| heartwood:", d["heartwood"]["patterns"], "patterns /",
          d["heartwood"]["crossings"], "crossings /", d["heartwood"]["rings"],
          "| held:", len(d["held"]), "| returns:", len(d["returns"]))
