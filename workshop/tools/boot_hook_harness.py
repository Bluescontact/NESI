#!/usr/bin/env python
"""THE HARNESS BOOT HOOK — check_harness.js, as a filesystem fact.

Created 2026-08-23, on the keeper's mark: "wire check_harness.js into the boot
path." Sibling to boot_hook.py, which does the same move for LEARNED.md:
CLAUDE.md can name an instrument, but naming is a sentence a session reads.
This hook runs the instrument and puts its reading in context before the
session's first thought, every time — the same law 22 shape boot_hook.py's
own header already cites.

WHY A SEPARATE HOOK, NOT A LINE ADDED TO boot_hook.py: check_harness.js is
its own jurisdiction, sited at tools/, with its own runner and its own
report grammar — the same relationship gate.mjs has to check_all.js. Folding
it into the LEARNED.md hook would mean one hook's failure could silence the
other's deposit; a broken instrument and an unreadable law need different
hands, the same distinction check_all.js's own header draws between CRASH
and FAIL.

WHY --summary AND NOT THE FULL REPORT: the full `check_harness.js` run walks
every skill/agent file's `git log --follow` history — about 9 seconds over
today's file count, all of it spent proving something that changes maybe
once a session, not once a boot. Injecting that into every SessionStart
would tax every session for a reading nobody asked for yet. This hook calls
each registered instrument directly with --summary: pure file/log reads,
well under a second combined, one line each. The full dated reading is one
command away for a hand that wants it, named in the line itself.

Five instruments as of 2026-08-31: framing_check_skills.js (is the
negative-framing shape reproducing in new skills/agents), lens_usage_check.js
and agent_usage_check.js (are skills/agents named vs. actually invoked, per
MARKS_LOG.jsonl — a mark-log mention, which is presence in a decision, not
proof of a run), and skill_invocation_check.js / agent_invocation_check.js
(the same question asked of the REAL record instead: session transcripts'
own "commandName"/"subagent_type" fields, written by the harness itself
when something actually runs). The last two exist because the keeper caught the
gap directly, 2026-08-31: "the keeper uses the 7 with one mention" — the
mark-log proxy undercounted real use by a wide margin (full-development:
1 mark-log mention, 38 real invocations) and in one case overcounted it
(record-audit: 3 mark-log mentions, 0 real invocations). Both signals are
kept, not merged — they measure genuinely different things. Listed in
INSTRUMENTS below by name, never by glob, for the same reason check_all.js
names its own instruments explicitly.

FRAMING, same rule boot_hook.py already states from the keeper's 2026-08-17 mark:
negative form only where it is a lint or a container's edge. What this hook
prints is read by every session, so it is held to that rule like every other
line on the boot path.
"""
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INSTRUMENTS = [
    "framing_check_skills.js",
    "lens_usage_check.js",
    "agent_usage_check.js",
    "skill_invocation_check.js",
    "agent_invocation_check.js",
]


def emit(text):
    sys.stdout.write(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": text,
        }
    }))


def run_one(name):
    path = os.path.join(ROOT, "tools", name)
    if not os.path.exists(path):
        return name + ": GONE — not on disk"
    try:
        result = subprocess.run(
            ["node", path, "--summary"],
            cwd=ROOT, capture_output=True, text=True, encoding="utf-8", timeout=10
        )
        line = (result.stdout or "").strip()
        if result.returncode != 0 or not line:
            err = (result.stderr or "").strip().splitlines()
            return name + ": exited " + str(result.returncode) + " with no usable output" + \
                ((" (" + err[-1] + ")") if err else "")
        return line
    except Exception as exc:
        return name + ": could not run (%s)" % exc


def main():
    lines = [run_one(name) for name in INSTRUMENTS]
    emit(
        "THE HARNESS — " + "  ||  ".join(lines) +
        "  Sourced by tools/boot_hook_harness.py, sibling to boot_hook.py; "
        "report-only, refuses nothing, the reading is a hand's. "
        "Run `node tools/check_harness.js` for the full, dated reading of both."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
