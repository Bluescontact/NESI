---
name: boundary-audit
description: Before trusting that a stated rule, limit, or scope actually holds, check whether it's enforced as a mechanical fact — a missing file, a nonexistent parameter, a hard collision a script can't complete past — or whether it's just a sentence a session is expected to read and comply with. Use when asked "is this boundary real," "does this gate actually gate," "run a boundary audit," "is this enforced or just documented," or before relying on any freeze, scope limit, one-per-unit rule, or "never do X" instruction to actually hold under a session that doesn't read carefully. Not the-closing-check (which is five pre-build questions about a new mechanic) and not the gate/gate.mjs wired jurisdiction — this audits whether an *existing* stated boundary, anywhere in a project, is structurally enforced. Born from nesi/mind/LEARNED.md laws 11, 22, and 24 — a rule stated in prose is only as strong as the session currently reading it, and a guard that repairs the result after the fact instead of refusing the act breaks the very law it claims to serve.
---

# Boundary audit

A rule that lives only in prose — a CLAUDE.md line, a comment, an
instruction in a skill file — binds exactly as hard as the next session's
attention span. This corpus named the difference directly: *"a gate that
holds is one the machine cannot talk past — a file, a hash, a row only a
hand can write, a parameter that does not exist. Not an instruction a
session reads and complies with."* Most stated boundaries in a fast-moving
project are still at the prose stage, because prose is cheaper to write than
a mechanism — which is exactly why it's worth checking which stage a given
boundary is actually at before depending on it.

## The procedure

### 1. Name the boundary exactly

State the rule as a single sentence with its scope: what may not happen, to
what, under what condition. "One manifest per tetra" and "never delete a
comment thread" are boundaries; "be careful with X" is not specific enough
to audit — narrow it first or report that it can't be audited as stated.

### 2. Find the enforcement point

Locate where — if anywhere — this boundary is actually checked in code,
config, permissions, or file structure, as opposed to where it is merely
*described*. A line in a markdown file describing the rule is not an
enforcement point. A function that returns early, a file lock, a schema
constraint, a missing credential, a permission the caller doesn't have —
those are.

### 3. Classify what you found

- **Filesystem fact (law 22)** — the boundary is enforced by something that
  doesn't exist, can't be reached, or physically blocks completion:
  a missing file the code checks for, a parameter that isn't defined, a
  lock another process holds. Name the exact mechanism.
- **Refusal (law 24, the healthy half)** — the boundary is enforced by the
  act itself being refused before it happens: a validation that stops
  execution, a guard clause that returns without doing the thing.
- **Silent correction (law 24, the defect)** — the act is *allowed to
  happen* and something downstream quietly fixes, truncates, or reverts the
  result afterward. This looks like enforcement from the outside (the bad
  state doesn't persist) but it isn't — the boundary was crossed, and
  whatever the correction missed is now the actual behavior. Flag this even
  though the outcome looks fine; the corpus paid for this exact shape once
  (a 500-word write silently destroyed instead of the write being refused).
- **Prose only** — nothing in step 2 exists. The boundary is an instruction
  a session reads. Say so plainly; this is the majority case and naming it
  isn't a failure, it's the finding the audit exists to produce.

### 4. Test it, don't just read it, when the boundary is scriptable

If step 3 found a mechanism, try to cross the boundary deliberately (in a
disposable/test context, never against real state) and confirm it actually
refuses. A mechanism that exists but has a gap — an unchecked second path,
a race condition, a case the missing-file check doesn't cover — is worth
exactly as little as prose until it's been pushed on.

## Ending states

- **MECHANICAL** — enforced by a filesystem fact or an actual refusal, and
  (where testable) confirmed to hold under a deliberate attempt to cross it.
- **PARTIAL** — a mechanism exists but has a known or found gap; name the
  gap precisely.
- **CORRECTIVE** — the act is allowed and repaired afterward rather than
  refused; name what the correction actually loses or overwrites.
- **PROSE ONLY** — no mechanism found. This is not a demand to go build one;
  it's a statement of what the boundary currently is, so nothing downstream
  depends on it as if it were stronger.

## Sibling lenses

One of six recurring checks named in `nesi/mind/DRAFT_SIX_SHAPES_2026-08-20.md`
(seated 2026-08-21) — this one is lens 3, *is this boundary a fact, or just a
sentence*. The other five: `instrument-audit` (does the check prove
anything), `conservation-harness` (does the material conserve),
`record-audit` (is the record honest), `authority-check` (whose call is
this), and `unrouted-gifts` (is capacity found or left dead).
