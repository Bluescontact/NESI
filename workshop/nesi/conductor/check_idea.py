#!/usr/bin/env python3
"""
check_idea.py — Tool 1: "Already built, or new?"

Exposes the same pattern-library check lint_bridge.py already runs on every
metabolizer drop (codex_index's semantic match, FOLD/HOLD/PASS) as its own
standalone entry point — no file drop required. Type or paste an idea, get
back a plain answer: already built (here's the file), close to something
(worth a look), or genuinely new.

No new search logic. This calls the exact same tools/codex_index/query.py
match() that lint_bridge.py uses — reuse, not a second index.

Usage:
    python nesi/conductor/check_idea.py "the idea, in a sentence or two"
    python nesi/conductor/check_idea.py          (interactive: type, Enter, repeat; blank line to quit)
"""

import os
import sys

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DSS = os.path.abspath(os.path.join(THIS_DIR, "..", ".."))
CODEX = os.path.join(DSS, "tools", "codex_index")
sys.path.insert(0, CODEX)
os.chdir(CODEX)  # query.py resolves its db relative to itself

from query import match, disposition  # noqa: E402


def check(text: str) -> str:
    """Run the existing codex match and phrase the result the way this
    session kept re-deriving it by hand: already built / close / new."""
    text = (text or "").strip()
    if not text:
        return "(nothing to check)"
    results = match(text, n=3)
    if not results:
        return "GENUINELY NEW — no codex match at all (empty index, or truly unmatched)."
    top = results[0]
    verdict = top["verdict"]
    if verdict == "FOLD":
        return (f"ALREADY BUILT: `{top['pattern']}`  (distance {top['distance']})\n"
                f"  -> read patterns/{top['pattern']}.md before building anything new.")
    if verdict == "HOLD":
        others = ", ".join(f"`{r['pattern']}` ({r['distance']})" for r in results[1:] if r["verdict"] != "PASS")
        extra = f"\n  also close: {others}" if others else ""
        return (f"CLOSE TO SOMETHING: `{top['pattern']}`  (distance {top['distance']})\n"
                f"  -> worth a look before assuming this is new.{extra}")
    return f"GENUINELY NEW — nearest is `{top['pattern']}` but far ({top['distance']}, {verdict})."


def main():
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
        print()
        print(check(text))
        print()
        return
    print("Already built, or new? Type an idea and press Enter (blank line to quit).\n")
    while True:
        try:
            text = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if not text:
            break
        print()
        print(check(text))
        print()


if __name__ == "__main__":
    main()
