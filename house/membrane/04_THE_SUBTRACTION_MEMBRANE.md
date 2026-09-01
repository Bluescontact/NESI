# The Subtraction Membrane

Adding to a collection feels like contribution; removing from one feels
like accusation. So collections grow forever while their accuracy falls —
public removal queues sit undrained for years. This project refuses that
drift structurally: removal runs on a schedule, enforced by the project's
own gate, with a check that cannot be satisfied by paperwork.

## The rule

A **subtraction pass** must run at least every fourteen days (the quota
lives in the gate's configuration, `gate.conf`). If the quota lapses, the
gate refuses to report the project healthy, and says why, in the open.

## The law of a pass

1. **Its only permitted output is removal or demotion.** A pass where the
   operator added good work and took nothing away does not count.
2. **It must remove at least one thing.**
3. **Every removal is recorded with a cause** — an id and a stated
   reason, appended to the compost record. Nothing is removed to the
   void.
4. **The unfakeable check:** the target file must be smaller after the
   pass than before, verified in bytes by the enforcement tool itself
   (`workshop/game-gate/gate/instruments/05-subtract.mjs`). A pass that
   didn't shrink the target didn't subtract, and nothing is recorded.
5. **The full original is kept.** Before a pass, the target is backed up
   whole at a named path. Subtraction demotes material out of the live
   surface; it never erases the record.

## What a pass may and may not remove

- **May remove, on the operator's own authority:** derived and
  self-generated material — run logs, machine-appended records, generated
  accounting nothing reads, duplicates. The test: removing it changes no
  tool's verdict and no person's record.
- **May propose, never remove:** anything a person decided into the
  project — patterns, essays, admitted contributions, the decisions
  themselves. For those, a pass produces a proposal with a cause; the
  removal is a decision, and decisions here belong to the keeper.
- **May never touch:** another person's records, or the compost record
  itself — the outflow ledger is not subject to its own outflow.

## The first pass

The membrane's first act was on the gate's own ledger: 155 lines of the
gate logging its own runs — records nothing reads — removed with cause,
the file cut from 244 KB to 3 KB, the full original kept at a named
backup. It subtracted from the bookkeeping, not from the work.

---

**How to show this wrong:** the tool's own refusals are the test. If the
quota lapses, the gate says so publicly; if a pass claims removals while
the target didn't shrink, the tool refuses to record it; if compost
entries appear without causes, the compost record itself shows the
violation. The deeper test: watch whether removal proposals against
decided material actually get decided, or pile up the way removal queues
everywhere do. If they pile up, this membrane has outflow for bookkeeping
but not for substance, and this document must say so.

*Record: built 2026-09-01, closing a question left open since the tool
was written ("where does the removal quota live" — answer: in the gate's
own configuration). Decision history in the workshop and commit log.*
