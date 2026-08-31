# ■ STRUCK — 2026-08-30, Kevin's mark: "strike the cold-walk skill too" (same session as the strike of LEARNED law 2, the stranger-verification law this skill stood on). No SKILL.md remains, so nothing loads this as a skill. The full text stands below, byte-for-byte, as a record — available to quarry only when Kevin names it back.

---
name: cold-walk
description: Verify a new or changed player-facing surface by actually walking it cold â€” cleared state, a stranger's hand, no foreknowledge of the source â€” and hand the transcript to a party that did not build it for the verdict. Use before calling any interactive surface WALKABLE, when a build session wants to claim a feature "works," or when asked to "walk this cold," "stranger-check this," "is this WALKABLE," or "cold-walk the build." Never returns WALKABLE itself â€” only BLOCKED or UNWITNESSED. Born from nesi/game2d/tools/cold_walk.js and cold_walk_prepare.js, and from a defect paid for once already: a builder's own cold-walk script was demoted 2026-08-12 because "an author cannot be their own stranger." Proven twice on 2026-08-19: found index.html's TANK seat routed to a retired file, and found ascent.html's 8-face menu crashing under this project's own documented serving mode with Escape routing straight into it â€” both invisible to a source-only read.
---

# Cold walk

A build session grading its own build produces its own opinion. That is the
same defect this method was already demoted for once, in the file this skill
is drawn from: *"the instrument grading the stranger-gate was written by the builder,
including a carve-out the counsel itself ruled on. An author cannot be their
own stranger."* No amount of care by the authoring session fixes this â€” it is
a structural fact about who is asking the question, not a quality problem
with the answer.

**UNWITNESSED is the default state; WALKABLE is earned only by a second
party's own hand writing it.** This skill exists to make that handoff actually
happen, rather than let it get skipped because it's the same session and
faster to just say it works.

## The procedure

### 1. Name the slice

State the smallest complete unit under test in four parts: way in, act,
consequence, way out. A mechanism needs a way in to count as a slice â€” if it
has none yet, name that instead of testing it.

### 2. Clear the state, honestly

If the surface persists anything (localStorage, a save file, a session
store), start from genuinely empty â€” not "empty in the parts I remember to
reset." Prefer an isolated copy over the live store if one is easy to make;
if it isn't, clear the live store deliberately and say so, the way
`cold_walk_prepare.js` builds an isolated profile so the check "cannot touch
live data." An instrument or a walk tests what a stranger actually meets only when it
runs against genuinely cleared state.

### 3. Walk it as a stranger would, not as the builder does

No shortcuts from knowing the filename, the keyboard shortcut, or which
element is "the important one." Click what the surface visibly offers, in the
order a first-time hand would try it. Type something a stranger might
actually type â€” not a known-good test string chosen because it exercises the
right code path.

### 4. Run the structural pre-check

This catches geometry; the felt experience of a walk is judged by the human
handoff in step 6. Adapt these to the surface at hand (they're drawn from `cold_walk.js`'s
C1â€“C8):

- Does the page/screen fit, or does it genuinely scroll â€” not overflow with
  no way to reach what's below?
- Is everything interactive inside the visible frame?
- Does every act the surface invites visibly change something, at the moment
  it happens â€” not eventually, not only in storage?
- Does every control name itself, on its own face or a caption that's
  actually on screen â€” never a neighboring label doing the naming for it?
- If the stranger's own act produced something (a mark, a stone, a value),
  is it perceptible on screen, not just present in the store?
- Does every distinct room/state/screen name itself, and name itself
  correctly â€” not the name of the place the hand just left?
- Is the first act's consequence visible *outside* the act's own surface, at
  the moment it lands â€” not only inside the box the hand was typing into?

A pre-check that passes all of these still covers geometry only â€” what the
session was actually like is judged separately, by the human handoff. Record
it as PRE-CHECK PASSES / FAILS â€” that's a separate finding from WALKABLE.

### 5. Record the transcript verbatim

What was clicked, what was typed, what appeared, what didn't. This is the
evidence the second party judges â€” not a summary of your impression of the
walk, the actual sequence.

### 6. Hand it off â€” this step is not optional and not yours to skip

Only a human who didn't write the code may write WALKABLE. A second read run
through this same tool ecosystem â€” another agent call, another session,
under whatever name â€” is not independent verification; it is the same hand
in a different glove (`LEARNED.md` law 3: a check holds a load by being
structural, "never because a different hand ran it"). That kind of second
read may still run the structural pre-check (step 4) and produce a second
UNWITNESSED read â€” real and worth having â€” but it may never write WALKABLE
itself, no matter how clean its language sounds.

**â–  Corrected 2026-08-21**, on Kevin's mark, naming a leak caught a second
time. What this step said before, and why it was wrong, is kept whole â€” not
here, so a mechanical filter reading this file for the collision it once
carried isn't asked to parse a quotation as an instruction â€” at
`SKILL.md.superseded_step6_2026-08-21.md` in this same folder.

### 7. The honest limit of what this skill can enforce

Being plain about this rather than overstating it: nothing in a SKILL.md can
stop the authoring session from typing the word WALKABLE itself â€” a prose
instruction not to is the same shape as the demoted script named above, an
obligation stated by the same hand it binds. What this skill *can* do, and
must: require the transcript from step 5 to exist as a written artifact
(a file, or a quoted return value) independent of anyone's memory of the
walk, so that the handoff in step 6 has something concrete to judge â€” the
way `nesi/game2d/tools/played.js` makes "he played" a row a separate script
checks rather than a claim the runner takes on faith. If a project has (or
can cheaply get) an append-only log outside the current session's own
edit surface, prefer writing the verdict there over writing it in this
session's own output, for the same reason: a fact a future reader can check
independently outbinds an instruction the same hand that needs to follow it
also wrote.

### 8. A tool gotcha worth knowing before you trust a blank result

If the walk is run through a headless/automated browser pane rather than a
human's own eyes: a backgrounded or non-composited tab can report
`document.hidden: true` even when tooling reports it as "fronted" or
"active," and page-reading tools built on the accessibility tree can return
a false empty result in that state â€” this was mistaken for a real blank
page more than once on 2026-08-19 before being caught. Before recording a
surface as broken or empty from a tool's read, cross-check with a direct
`document.body.innerHTML.length` (or equivalent) via script execution. A
tool that can't see is a different finding than a page with nothing on it,
and conflating them produces a false BLOCKED.

## Ending states

- **WALKABLE** â€” quote the outside party's own words, from the transcript
  artifact in step 5, not from memory of what they said. Never write this
  yourself.
- **BLOCKED** â€” a hard failure the pre-check or the walk actually found; name
  it, quote the exact evidence (a missing link, a silent act, an unlabeled
  control), don't soften it into UNWITNESSED to avoid saying something is
  broken.
- **UNWITNESSED** â€” the honest default whenever no non-authoring party has
  actually walked it yet, even if the pre-check passed clean. Say plainly
  what's still unanswered and who would need to answer it.

Exactly one of these three states applies, always.
