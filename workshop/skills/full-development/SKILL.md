---
name: full-development
description: Run the full development process on a piece of writing or a framework — compost and scatter, inventory, audit, diverge, converge, dream, ground, route and place. Use when asked to "run the full development process", "develop this piece", "run the dev process", or to audit and rebuild a draft rather than merely edit it. Requires a target file.
---

# Full development

The documented failure mode of drafting: each pass makes the prose smoother and
the argument no truer. Rewriting is not development. A piece can be tightened
six times and still rest on a claim nobody ever attacked.

This procedure exists to prevent that specific outcome. It separates the work
that improves a draft (converge, route, place) from the work that can destroy
it (audit, ground) — and it runs the destructive work **first**, on principle,
because a defect found after the polish costs the polish.

## Inputs

- **Target** (required): path to the draft. Snapshot it before touching it.
- **Corpus** (optional): the body of work the piece draws on, if any.
- **Audience** (optional): who it is for. Changes converge only — audit
  holds fixed regardless of audience.

## The stages

Run in order. Stages 2–4 are independent and should fan out to parallel
subagents; the rest are sequential and yours.

### 1. Compost and scatter

Break the piece back into parts. Every distinct claim, move, image and
structural decision becomes a separate item, detached from the order it
arrived in. The order is the thing being tested — keep it and you will only
ever defend it.

Every item is judged on its own merit at this stage, regardless of how well it reads.

### 2. Inventory

List what is actually there, not what was intended. For each item: what it
asserts, what it depends on, what depends on it. Items nothing depends on and
which depend on nothing are decoration; mark them.

### 3. Audit (adversarial — fan out)

A subagent whose only job is to break the piece. Default to *unearned* when
uncertain. A thin list of real defects beats a full list of maybes.

Test every claim for: **false** · **unearned** (asserted, never argued) ·
**circular** (definition and example proving each other) · **unfalsifiable**
(no state of the world counts against it) · **redundant** (quote both
instances) · **contradictory** (against another claim in the same piece) ·
**metaphor doing argumentative work it has not earned** (flag every load-bearing
slide from a physical analogy to a human or institutional claim).

Also flag: sentences that sound authoritative and say nothing; flattery of the
reader or of the thesis; aphorisms surviving only because they scan.

Verify every number, name, date and technical fact independently. Do not
accept a fact because the draft is confident about it.

Output: numbered defects, verbatim quote, type, one line of why, suggested fix
or "cut". Most severe first.

### 4. Ground (fan out)

Take the piece's governing claim and hunt for the case that kills it. Search
the real world, not the draft. Build a counterexample table: *case · who bore
the cost · defeats the claim? · why*.

Then name the single strongest challenge and write **the minimal honest
reformulation** — the smallest change to the claim that survives the
counterexample without gutting it.

A ground pass that returns "the claim holds" without having found a hard case
did not run. Cite sources.

### 5. Diverge (fan out)

Five genuinely different *shapes* for the same material — not five orderings of
the same sections. At least one inverts the argument, one is non-sectional, one
is radically shorter. For each: what it gains, what it loses.

Then alternative openings in different registers, as finished prose. Artifacts,
not advice.

### 6. Dream

Ignore the draft. What is the one idea here that is new and worth the reader's
time — in one sentence? What is the piece burying that should be its spine?
What is missing entirely: the distinction or move that would make it land
rather than merely cohere? What dies if it loses 40%? Write the ending it
deserves.

### 7. Converge

Yours, not a subagent's. Rule on every audit defect and every ground
counterexample: accept, reject with reason, or reformulate. A defect rejected
without a reason is a defect accepted quietly.

Where the ground pass produced a reformulation, prefer the version that keeps
the author's claim and sharpens it over the version that replaces it. A
counterexample that violates a condition the claim already states is not a
refutation — it is the corruption case, and it should be **named** and added to
the taxonomy.

### 8. Route and place

Every surviving item gets one location and one job. Anything that cannot be
assigned a location is cut, not parked. Two items doing the same job means one
of them is cut.

Then rebuild — a rebuild, not a patch. Patching preserves the order that was
supposed to be under test.

### 9. Verify — not optional, regardless of the piece's size or stakes

A fresh subagent that has not seen the reasoning. Give it the before file, the
after file, and the defect list. It reports FIXED / PARTIAL / NOT FIXED /
REGRESSED per defect, verbatim, and re-verifies every fact from scratch,
including facts introduced by the revision.

Revisions introduce defects. A run that skips this stage has not been developed;
it has been rewritten confidently. **This is not a judgment call to weigh
against the piece's length or how "operational" it looks** — on 2026-08-27,
two short operational drafts skipped this stage as "not earning its cost,"
and an independently-run verify pass on both, requested after the fact, found
real regressions the converge stage had introduced on *both*: a fabricated
quote, an inverted fact, an overclaimed instrument coverage, a miscounted
figure. Two for two. Stage 9 always runs; the only thing "size of the piece"
may resize is stage 5 (diverge).

## Ending a run

The last message says exactly one of:

- **DEVELOPED** — here is the rebuilt piece, here is what audit and ground
  found, here is what changed structurally and why, here is the word count
  against target, and **here is stage 9's per-defect verify table**, run by a
  fresh subagent against the actual before/after files. A piece is not
  DEVELOPED until verify has run against the specific revision being called
  done — if converge changes anything after verify ran, verify runs again.
- **BLOCKED** — here is the defect or counterexample that cannot be resolved
  without a decision only the author can make. Name the decision.

Exactly one of these two applies. "Strengthened throughout, ready for another
pass" is the failure mode wearing a hat. So is "DEVELOPED, verify deferred."

## Deferral accounting

End every run by answering these three in one line each:

- What did this add that nothing calls?
- What did it name that it did not build?
- What did it defer?

Any non-empty answer gets reported in full. A clean-looking run with an
unstated deferral is worse than an honest BLOCKED.

## What this procedure does not do

It does not polish. It does not produce a new framework, doctrine, or named
instrument as a byproduct. If a run ends by proposing another development
process, that run was BLOCKED and should say so.
