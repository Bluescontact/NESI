---
name: instrument-audit
description: Audit a verification instrument itself — a check, a script, a test, a grading pass — for the specific defects that let it pass while proving nothing, before trusting what it reports. Use when a check is proposed or already exists and hasn't been examined for what it actually selects and measures, when asked "does this check actually check anything," "audit this instrument," "is this test real," or before treating any green result as settled. Distinct from cold-walk (which walks a live surface as a stranger) — this skill examines the checking code or process itself, not the thing being checked. Born from nesi/mind/LEARNED.md laws 3, 5, 6, and 23 — a check that grades a proxy instead of the object, that measures data no eye would ever see, or that infers state from a symptom instead of asking the object directly, all pass clean while catching nothing.
---

# Instrument audit

A green check is direct evidence about the instrument. Whether it's also
evidence about the thing it claims to verify is a separate question, and
takes asking. This corpus paid for that distinction
four separate times: a selector that read a neighboring label instead of the
object it named (`cold_walk.js:162`), a pixel-accurate measurement that a
human eye would still see as wrong the next day, a harness that inferred a
state from a symptom instead of asking the object itself, and a verifier
whose authority was argued from *who built it* rather than from what it
actually re-evaluates. None of these instruments were lying on purpose —
each one was trusted because it ran and returned green, and the defect only
showed up when someone asked what it was actually looking at.

This skill exists to ask that question before the trust, not after a defect
is found the expensive way.

## The procedure

Answer each question in writing, against the actual code or process, not
against what the instrument was intended to do.

### 1. Selector honesty (law 6)

What does the check actually select — the object itself, or something next
to it? A check reading a caption, a wrapper element, a cached copy, or a
"should be equivalent" proxy grades the proxy, not the thing named. Quote
the actual selector, query, or lookup, and confirm it resolves to the real
object.

### 2. Perceptible measurement (law 5)

If a human would look at the result and judge it by eye — layout, contrast,
timing, feel — does the check measure something in that same register, or
does it measure an adjacent number that can diverge from what's visible?
"Read the pixels, not the plan": a check that passes on the spec while the
render is wrong has measured the wrong layer.

### 3. Ask, don't infer (law 23)

Does the check query the object's actual state, or does it infer state from
a side effect, a log line, a timestamp, or an absence of an error? Inferring
state from a symptom is exactly the failure that let a harness report
success it never actually saw. Name what the check queries and confirm it's
the state itself, not a stand-in for it.

### 4. Structural authority, not identity (law 3)

Would this check's verdict change if a different hand ran it, or if it were
re-run independently later? A check earns trust by being general and
re-evaluating — trust that traces to what the check itself does, not to
which particular person or session happened to run it. If the check's
credibility rests on "I ran it and I'm trustworthy" rather than on what the
check itself does, that is the defect, regardless of how trustworthy the
runner actually is.

### 5. The vacuous-pass test (law 4)

Would this check pass against an empty, blank, or absent version of the
thing it's supposed to verify? A test passable by absence only proves that
it runs, not that anything was checked. If
you can't immediately say what a blank or missing implementation would score,
try it — feed the check a stub that does nothing and confirm it fails.

## Ending states

- **SOUND** — the check selects the real object, measures the perceptible
  layer, queries state directly, and would fail against an absent
  implementation. Name the evidence for each of the four questions, not just
  the verdict.
- **PROXY** — the check passes on something adjacent to the real object
  (question 1 or 2 failed). Name exactly what it's actually measuring
  instead.
- **VACUOUS** — the check would pass on absence or a stub (question 5
  failed). This is the most expensive kind of false confidence, because the
  check has likely been "passing" the whole time regardless of the real
  work.
- **UNVERIFIABLE** — one or more questions couldn't be answered from reading
  the code or process (e.g. the selector is dynamic and its target can't be
  confirmed without running it). Say which question, and what would need to
  happen to answer it.

A weak answer to any question is the finding. Report what the instrument
actually does today, before any strengthening pass.

## Sibling lenses

One of six recurring checks named in `nesi/mind/DRAFT_SIX_SHAPES_2026-08-20.md`
(seated 2026-08-21) — this one is lens 1, *does this only look verified, or
is it*. The other five: `conservation-harness` (does the material conserve),
`boundary-audit` (is the boundary a fact or a sentence), `record-audit` (is
the record honest), `authority-check` (whose call is this), and
`unrouted-gifts` (is capacity found or left dead).
