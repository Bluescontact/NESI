#!/usr/bin/env python3
"""
NESI v2 — the launcher (the machine you run).

Regenerates the board from the live stores (the wire), then opens it. The Python
engine (the pulse: core.py / gate / ledger / continuity) and the strata (soil,
forest, coordination_surface) live alongside as importable infrastructure — the
board is the visible surface over them.

Run:  python nesi_v2.py        (or double-click NESI.bat)
Frozen-aware: when packaged, reads/writes stores next to the exe.
"""
import sys
import webbrowser
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parent

sys.path.insert(0, str(NESI / "conductor"))


def main():
    import build_board  # regenerates board.html from the live organs
    d = build_board.regenerate()
    board = NESI / "board.html"
    print(f"NESI v2 — board regenerated ({d['embers']} embers · {d['held']} held · "
          f"{d['crossings']} crossings · {d['returns']} returns). Opening {board} ...")
    try:
        webbrowser.open(board.as_uri())
    except Exception as e:
        print(f"(couldn't auto-open a browser: {e}) — open this file yourself:\n  {board}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
