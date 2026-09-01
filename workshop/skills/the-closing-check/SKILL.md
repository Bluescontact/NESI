---
name: the-closing-check
description: Five questions to answer, in writing, before any new mechanic enters a build — a portable trigger-by-name copy of the check already living in .claude/agents/game-craft.md's mechanics-catalog section, for use by sessions or agents that aren't running as that lens. Use when asked "is this ready to build," "run the closing check," or "run the five questions," before writing code for a mechanic that hasn't been checked against it yet. Not the same instrument as this project's own gate/gate.mjs — that's a separate, wired, ledgered jurisdiction; don't say "run the gate" for this one, it collides.
---

# The closing check

This is not new material. The five questions below already exist, verbatim
in substance, in `.claude/agents/game-craft.md`'s mechanics-catalog section —
that file is the source, this skill is a portable copy for triggering by name
from a session or agent that isn't the game-craft lens itself. If the two
ever disagree, the agent file is the one to trust and this file is stale.

A mechanic earns build status by being checked against this; reasoned about
alone, it stays a spec wearing the clothes of a build. This corpus paid for that distinction
more than once: an unreachable beacon sited behind a planet, a knife-edge
target inside its own miss-radius, a mirror range nobody re-checked after the
geometry moved, an opening frame that read as intended in the plan and
unreadably dark in the actual render. Every one of them was invisible to the
reasoning that produced it.

**Question 4 alone would have caught both real bugs found on 2026-08-19,
before either shipped.** `index.html`'s TANK seat and `ascent.html`'s 8-face
menu were both, at the moment they were built, fully-reasoned, code-complete
mechanics — and neither had an actually-reachable chamber from spawn: one
routed to a retired file, the other crashed under the project's own
documented serving mode with no fallback. Both were found afterward, by a
walk (`cold-walk`), at real cost. Asking "name the actual chamber a player
walks through to reach this" *before* the code was written would have
forced the same finding for free. This is not hypothetical — it is this
build's own two most expensive defects this session, restated as evidence
for why question 4 is not decoration.

## The five questions — answer all of them, in writing, before code

1. **Decision, not action.** Does the player choose something, or only
   perform something? A button with one outcome is an action; a fork with
   more than one live path is a decision.

2. **World physics, not UI.** Does the game answer through its own rules —
   the material's own behavior — rather than through a toast, a counter, a
   progress bar, or a menu telling the player what happened?
   **For any ambient readout specifically (a fill level, a glow, a density,
   anything read continuously rather than clicked) — the freshet test:**
   would this respond identically to two wildly different bodies of real
   content, because it reads structure/flow and has no access to anything
   else? A readout that would look different for a thousand words of grief
   than a thousand words of grocery lists has started reading content, not
   flow — and content-reading is exactly what a progress bar smuggles in
   under a different shape. Routed from
   `nesi/world3d/.walk/_snapshot/scripts/spires.gd:21-36` (gift
   `inbox/gift_2026-08-27_10_freshet_test.md`), where a converging ring's
   radius passes this test by construction: driven only by the mean of
   three live gate-release rates, never accumulating, returning to rest the
   instant a gate shuts.

3. **Irreversible record.** What remembers this act, and can that record
   only grow, never quietly reset or get overwritten to make the build
   simpler later?

4. **Reachable from spawn.** Name the actual chamber a player walks through
   to reach this, starting from the game's own front door — not from
   knowing the filename. A mechanic with no named path in is a spec, not a
   build, no matter how complete the code behind it is.

5. **The want-check for the rung below this one.** Quote the keeper's own words
   that asked for this, or write `WANT-CHECK: none` exactly. Those are the
   only two forms this line takes, and it is written before the build, not
   defended after it.

## The one rule that keeps this from being theater

**A weak or missing answer is the finding.** Answer once, from the design as
it stands — going back to strengthen the mechanic so the answer reads better
reorders cause and effect, producing an honest-looking checklist over a
decision this check only appears to have tested. Report the actual answer,
including "no" and "none," and stop there. A weak answer on question 4 or 5
stays the keeper's fork, named and held open — the session that wants to keep
building doesn't get to default it.

## Ending state

Five answers, each quoted or explicitly `none`/`no chamber named`/etc. A weak
answer is reported as the outcome of the check, visible, before any patching.
