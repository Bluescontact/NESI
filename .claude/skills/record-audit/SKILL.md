---
name: record-audit
description: Check whether a written record — a log entry, a mark, a deposit, a claim about what happened — is actually sourced, undistorted, and honest about its own limits, before it gets treated as settled fact. Use when asked "audit this record," "is this sourced," "did we actually check the log or just assume," "is this claim grounded," or before letting any deposit, summary, or status file stand as authoritative. Also fires when a draft is about to declare someone's internal state, motive, or feelings rather than quote their words, or when a file is about to be edited/overwritten rather than superseded-and-kept. Born from nesi/mind/LEARNED.md laws 1, 9, 14, 17, and 19 — this corpus's own record was wrong at least twice from checking one source (git status) and skipping an adjacent one (git log) that held the actual answer, and from declaring a state instead of quoting a verbatim mark.
---

# Record audit

The corpus's own admission rule — every line sourced, none composed — exists
because unsourced lines are cheap to write and expensive to unwind once
something else has been built on top of them. `SKILLS_SWEEP_2026-08-19.md`
is the concrete cost: its first draft stated a file was "never committed,"
checked only against `git status`; `git log --all` held a commit five
minutes older that made the claim false the moment it was written. The
correction mattered more than the original deposit. This skill exists to
run that second check before the first draft ships, not after.

## The procedure

### 1. Trace every factual claim to its source

For each claim in the record ("X happened," "Y was never marked," "Z is
untracked"), name the exact file, command output, or quote it rests on. A
claim earns "fact" only once it traces to a named source; until then, flag
it as unsourced.

### 2. Check the adjacent source, not just the first one

The `git status`-vs-`git log` gap is the general shape: a status check tells
you the *current* state, a history check tells you what actually happened
and whether it was already addressed. Before claiming "never happened,"
"first time," or "untracked," check at least one adjacent source that would
hold the counter-evidence if it existed — history, not just present state;
the full log, not just the most recent entry; the sibling file, not just the
one you opened first.

### 3. Quote, don't declare, anyone's state

Scan the record for any sentence that asserts what a person felt, intended,
or was thinking, rather than quoting their own words. "Kevin was frustrated
with X" is a declared state; "Kevin's own words: '...'" is a record. Replace
or flag every instance of the former. Context is not cause — a sequence of
events around a mark does not license a claim about why it was made.

### 4. Check that divergence is held, not averaged

If the record covers more than one source, session, or seat that disagreed,
confirm the disagreement is stated as itself — "A found X, B found
not-X" — rather than smoothed into a single synthesized conclusion. An
averaged record erases the actual finding, which is often the divergence.

### 5. Confirm supersession, not erasure

If this record replaces or corrects an earlier one, check that the earlier
version still exists somewhere (a backup, a git history, an explicit
"superseded by" note) rather than having been silently overwritten. A
correction that destroys what it's correcting removes the evidence a future
reader would need to judge whether the correction itself was right.

### 6. Check names against load, not habit

If the record introduces or repeats a name for a thing, confirm the name is
carrying actual weight (referenced again, decided on, load-bearing) rather
than being reused out of habit for something that was actually abandoned or
never finished.

## Ending states

- **SOURCED** — every claim traces to a named source, at least one adjacent
  source was checked per unsourced-feeling claim, no declared states, and
  supersession is layered not erased.
- **UNSOURCED CLAIMS FOUND** — list them individually with what source
  should have been checked. Don't fix them silently inside the audit; name
  them so the record's author can correct the record itself.
- **STATE-DECLARED** — list every sentence asserting an internal state
  instead of quoting words, with the quote that should replace it if one
  exists, or a note that none was found (in which case the sentence should
  be removed, not replaced).
- **ERASURE FOUND** — a prior version appears to have been overwritten
  rather than superseded; name what's now unrecoverable if this is
  irreversible, before it becomes so.

## Sibling lenses

One of six recurring checks named in `nesi/mind/DRAFT_SIX_SHAPES_2026-08-20.md`
(seated 2026-08-21) — this one is lens 4, *is the record honest about what
happened*. The other five: `instrument-audit` (does the check prove
anything), `conservation-harness` (does the material conserve),
`boundary-audit` (is the boundary a fact or a sentence), `authority-check`
(whose call is this), and `unrouted-gifts` (is capacity found or left dead).
