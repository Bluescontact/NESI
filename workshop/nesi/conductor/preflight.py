#!/usr/bin/env python3
"""
NESI PREFLIGHT v0 — the two-sign-off seam-clean check. Standard library
only. Built session 2026-07-20 (§ NESI SESSION 3/3), engine dark, no login
attempted, no live call made anywhere in this module.

The motor gates go-live on two sign-offs: metabolizer (core.py's own
metabolize() seam) and bench (bench.py's invoke() socket). This module
answers one question, structurally, for each: if the engine goes live right
now, does the fallback-loudly law still hold — or does something above the
seam assume a real engine and crash instead of falling back?

STRUCTURAL ONLY. This never calls the real engine, not even to test it.
metabolizer's claude-cli path is a live subprocess call
(core._metabolize_claude_cli); invoking it here to "check" it would BE the
live call this session is forbidden from making. So the metabolizer check
is shape-only: the ENGINES registry has the right keys, current_engine()
resolves without raising. The bench check IS a real dry-run, safely: bench
has no 'claude-cli' entry in its own op table at all, by design (S2's mark:
internal-complete before the engine) — so forcing the socket to believe a
real engine is selected can only ever hit invoke()'s own try/except
fallback path. Structurally impossible for it to reach a live call.

check() returns a report; nothing here marks, blocks, or gates by itself —
it's read by whoever wires the actual display (nesi_app.py, on boot). No
login state is inferred or asserted anywhere in this module.
"""

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core
import bench


def _check_metabolizer() -> dict:
    ok = True
    detail = []
    if not callable(getattr(core, "metabolize", None)):
        ok = False
        detail.append("core.metabolize is not callable")
    engines = getattr(core, "ENGINES", {})
    if "stub" not in engines:
        ok = False
        detail.append("no 'stub' engine registered")
    if "claude-cli" not in engines:
        ok = False
        detail.append("no 'claude-cli' engine registered — go-live has nothing to flip to")
    try:
        core.current_engine()
    except Exception as e:
        ok = False
        detail.append(f"current_engine() raised: {str(e)[:120]}")
    return {"ok": ok, "detail": detail or
            ["structure intact — stub + claude-cli registered, seam callable"]}


def _check_bench() -> dict:
    if not callable(getattr(bench, "invoke", None)):
        return {"ok": False, "detail": ["bench.invoke is not callable"]}
    if "stub" not in bench._ENGINE_OPS:
        return {"ok": False, "detail": ["no 'stub' op table registered at the bench"]}
    ok, detail = True, []
    # dry-run: force the socket to believe a real engine is selected. Bench
    # has no claude-cli entry (by design), so this can only ever hit the
    # try/except fallback inside invoke() — never a live call, structurally.
    prior = os.environ.get("NESI_ENGINE")
    os.environ["NESI_ENGINE"] = "claude-cli"
    try:
        r = bench.invoke("draft", {"intent": "preflight dry-run", "patterns": []})
        if not r.get("stub"):
            ok = False
            detail.append("invoke() did NOT fall back to stub under a forced "
                          "unregistered engine — the fallback law is broken")
        elif "FALLBACK" not in r.get("engine", ""):
            ok = False
            detail.append("fell back but did not badge the fallback honestly")
        else:
            detail.append("dry-run under forced claude-cli: fell back to "
                          "stub, badged honestly — no live call reached")
    except Exception as e:
        ok = False
        detail.append(f"invoke() raised instead of falling back: {str(e)[:160]}")
    finally:
        if prior is None:
            os.environ.pop("NESI_ENGINE", None)
        else:
            os.environ["NESI_ENGINE"] = prior
    return {"ok": ok, "detail": detail}


def check() -> dict:
    """The two sign-offs, structurally verified, no live call made anywhere
    in this function. Safe to run at any time, engine dark or lit."""
    m = _check_metabolizer()
    b = _check_bench()
    return {"metabolizer": m, "bench": b, "overall_ok": m["ok"] and b["ok"]}


if __name__ == "__main__":
    import json
    print(json.dumps(check(), ensure_ascii=False, indent=1))
