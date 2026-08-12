#!/usr/bin/env python3
"""PLACE_STONES helper — one double-click after GENERATE.

Finds the newest downloaded stones*.json in the user's Downloads folder,
checks it is a stones file (format nesi_stones_v1, a "stones" list), and
copies it VERBATIM to nesi\\world3d\\export\\web\\stones.json where the 3D
world reads it at load. No analysis, no scoring, no network — a file copy.
"""
import glob
import json
import os
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DEST = os.path.join(HERE, "..", "world3d", "export", "web", "stones.json")
DOWNLOADS = os.path.join(os.path.expanduser("~"), "Downloads")


def main() -> int:
    candidates = glob.glob(os.path.join(DOWNLOADS, "stones*.json"))
    if not candidates:
        print("No stones*.json found in", DOWNLOADS)
        print('Click "place stones in the world" in the Log Book first.')
        return 1
    newest = max(candidates, key=os.path.getmtime)
    try:
        with open(newest, encoding="utf-8") as f:
            data = json.load(f)
        stones = data.get("stones")
        assert data.get("format") == "nesi_stones_v1" and isinstance(stones, list)
    except Exception as e:
        print("Not a stones file:", newest, "-", e)
        return 1
    dest = os.path.abspath(DEST)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copyfile(newest, dest)  # verbatim copy — the file is not rewritten
    print("Placed", len(stones), "stone(s):")
    print(" ", newest, "->", dest)
    print("Open the world (nesi\\world3d\\PLAY_WORLD.bat) — the stones lie on the Shore.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
