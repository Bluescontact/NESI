#!/usr/bin/env python
"""THE BOOT HOOK — the deposit, as a filesystem fact.

Created 2026-08-17 on Kevin's mark: "set up the hook layer."

WHY THIS EXISTS, from his own law 22: "a gate that holds is one the machine
cannot talk past: an opened file and a read line, a hash before and after, a row
that only a hand can write, a parameter that does not exist." That line is a
container edge, quoted whole.

CLAUDE.md routes LEARNED.md by asking a session to read it, which leaves the
reading to judgement. This hook reads the file and puts the laws in context
before the session's first thought, every time.

IT SURFACES AND STEPS BACK. Law 21: "attach a small visible token to the act
itself, so the cheapness stops being silent." It carries the laws and one token,
and everything stays available to Kevin — law 20 holds.

IF THE DEPOSIT IS UNREADABLE it says so in one line and the session continues.

FRAMING, on Kevin's mark 2026-08-17: "i want to remove all negative framing...
thats fine if the negative framing is a lint, or the edge of a container... but
a generalized or specific negative assert creates a leakage in the context
lense." What this hook injects is read by every session, so its framing
propagates furthest of anything in the tree. Negatives here are kept only where
they are a lint or a container edge, and quoted lines of his stay verbatim.
"""
import io
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPOSIT = os.path.join(ROOT, "nesi", "mind", "LEARNED.md")


def emit(text):
    sys.stdout.write(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": text,
        }
    }))


def main():
    try:
        laws = io.open(DEPOSIT, encoding="utf8").read()
    except Exception as exc:
        emit("BOOT HOOK: nesi/mind/LEARNED.md was unreadable (%s). Read it by "
             "hand before substantive work, or say plainly that it is "
             "unavailable. The session continues either way." % exc)
        return 0

    emit(
        "THE DEPOSIT — nesi/mind/LEARNED.md, injected at boot by "
        "tools/boot_hook.py. This is the file itself. Every line is sourced to "
        "the mark that bought it. Its own admission rule: additions require a "
        "mark and a provenance, so a session proposes a line and Kevin's mark "
        "admits it. Its own falsifier, verbatim: if a session reads it at boot "
        "and the corpus still re-learns one of these the hard way, the line was "
        "written wrong — fix the line, do not add another.\n\n"
        "TOKEN — WANT-CHECK: open, and it is Kevin's to run. Law 1 names it the "
        "only gate. The token keeps it visible and leaves it with him.\n\n"
        "FRAMING — Kevin's mark 2026-08-17: negative framing belongs in a lint "
        "or at the edge of a container. Stated as a general or specific "
        "assertion it leaks into the context lens and narrows what comes after. "
        "Write what holds, what is available, and what a thing does.\n\n"
        "---\n\n" + laws
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
