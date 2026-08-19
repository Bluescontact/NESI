---
name: seed-construction-language
description: "SEED, uncrossed — construction language for NESI: Alexander's pattern-language as the grammar for specifying and composing organs; structural patterns as the load-bearing layer"
metadata:
  type: project
  status: PARTIALLY CANONIZED — lines 1·2·3·5 crossed by Kevin 2026-07-19 (see CANON section); lines 4 (entrance rule) and 6 (booking-membrane spec) HELD in returns/NESI_CONSTRUCTION_LANG_2026-07-19.md
---

# Seed — a construction language for NESI

*Kevin's insight, night of 2026-07-18, named for capture 2026-07-19 (last day at
Brian & Joana's). A seed, not a build. Development waits on his mark.*

## The direction, in his words (paraphrase-close)
Thinking about a construction language for NESI — and the Christopher Alexander
overlap is perfect. The structural patterns are the most important part of the
process; Kevin works above and behind the project, and the build coheres when
the patterns hold, not when the details do.

## What the overlap actually is
- Alexander's *A Pattern Language*: a generative vocabulary of named, numbered
  patterns, each stating a recurring problem + the force-field around it + a
  resolved form, composable from large scale down to small. Buildings emerge
  from applying patterns in sequence, not from blueprints.
- NESI already runs this shape without naming it: the 89-pattern library is the
  lint (machinist's flat table); organs are specified by grammar (job grammar
  v2.1) not by implementation; the tetrahedral geometry is the compression
  engine; ARTIFACT_GRAMMAR.md fixes the vocabulary.
- The seed: make the construction language EXPLICIT — a pattern-language layer
  for building NESI itself, where each organ/surface is specified as a pattern
  (problem · forces · form · falsifier) before any code, and composition order
  is part of the language.

## Why it matters now (build-sequence implication)
Kevin's 2026-07-19 sequencing mark: **internal organs first, workbench last** —
because building the other pieces is what reveals what the workbench needs to
be. That IS Alexander's method: the language generates the design through use;
you don't spec the center first. The construction language would make this
sequencing principle a stated rule rather than a felt one.

## Adjacent, already on disk
- `patterns/` — the 89-pattern canon (the existing language, membrane-governed)
- `nesi/mind/ARTIFACT_GRAMMAR.md` — vocabulary law (IS / IS NOT lines)
- `_INTAKE/nesi_job_grammar_2026-07-15.md` (v2.1) — organ grammar
- Open research thread (2026-07-15, not yet run): Open Source Ecology's
  categorization of process/tool — same question, different library.
- `patterns/anatomy_is_not_the_cockpit.md` — the governing build law any
  construction language must not violate.

## Open (Kevin's marks, when ripe)
- Does the construction language live as a new document, or as a new field on
  existing patterns (problem/forces/form/falsifier per pattern)?
- Is the composition order (which pattern before which) itself canon material?
- Relationship to the tetrahedral cycle — is the tetra the language's sentence
  structure?

*Falsifier: if this layer ever produces specification without construction —
documents about building instead of built organs — it is a monument; cut it.*

## The elevator sequence (Kevin's words, 2026-07-19 — the build order named)
Marked the same day he settled the undo-button fork ("keep undo, update the
rules") and the order ("settle first"), with the engine explicitly NOT plugged
in yet. Verbatim-close:

> We are building this like an elevator. The end goal is that the infrastructure
> becomes invisible in its operation, because it's simplified to a single button
> push. We set up the rigging in the hoistway, and set the floor marks, and plumb
> lines... we start bringing the rails into the hoistway and getting them set,
> and then we bring the platform in, and we install a false car running on a temp
> motor to start moving upwards. Each floor has its own entrance. We do the rails
> all the way to the top, then hook up the cables, and motor hooked up, and then
> when it's running on its own power we build the cab, and entrances, and the
> hoistway-to-car door interfaces.

The mapping this names (staged as reading, not ratified):
- rigging / floor marks / plumb lines = the spec, laws, and vocabulary — set first, everything checked against them
- rails = the organs, set true one at a time, all the way to the top before power
- the false car on a temp motor = the STUB ENGINE — the loop moving under temp power, which is exactly what runs today; not scaffolding to apologize for, a required construction phase
- cables + motor on its own power = the engine login (Mark 1) — which comes only after the rails are done to the top
- cab, entrances, door interfaces = the surfaces people actually touch — built LAST, once it runs on its own power
- the single button = the finish test: infrastructure invisible in operation

Consequence Kevin's order carries: "rails to the top" precedes the motor — the
remaining organ/law work (the sheets, the fork now settled, the migration tail)
is rail-setting, and the engine stays a temp-motor phase until the rails are done.

---

# CANON — crossed by Kevin's mark, 2026-07-19
*("Write the crossed lines into the seed file as canon, marked with today's date.")
Lines 4 (entrance rule) and 6 (booking-membrane spec) were NOT crossed — they hold
in `returns/NESI_CONSTRUCTION_LANG_2026-07-19.md`, unratified.*

## Line 1 · The two axes (CANON 2026-07-19)
The construction language has two axes, both Kevin's:
- **Coherence (the pattern axis):** an organ is specified as a pattern before any
  code — the recurring **problem** it resolves · the **forces** pushing around
  it · the resolved **form** (with its boundary: takes in / hands off / stops) ·
  the **falsifier** that composts it. The falsifier field is Kevin's addition to
  Alexander's quad and is what lets the grammar fail a bad organ on paper.
- **Sequence (the elevator axis):** plumb before load. The laws beneath an organ
  must be true before it is raised; it runs as a badged false car before any real
  motor; it interlocks against what must wait; no stage carries the next until
  it is signed off with a mark. (Source: the elevator sequence, verbatim above.)

## Line 2 · The spec form (CANON 2026-07-19)
Every future organ fills this before code. If PROBLEM or FALSIFIER won't fill,
the organ is scaffold or premature — stop on paper.

```text
ORGAN:      <name>
PROBLEM     the recurring problem it resolves, in a breath
FORCES      what pushes and pulls around it
FORM        the resolved shape · boundary: takes in / hands off / stops
FALSIFIER   the observation that composts it
PLUMB       what must be true beneath it before it's raised
FALSE CAR   its honest badged stub while the motor's out
ENTRANCE    its own way in
INTERLOCK   what it must NOT do until a later organ exists
SIGN-OFF    the mark that lets the next stage carry load
```
*(Note: the ENTRANCE field remains in the form; the standing RULE about
entrances — "each organ its own way in, none reached through another's door" —
is Line 4, HELD, not canon.)*

## Line 3 · The generative rule (CANON 2026-07-19)
**Use names the next organ.** The next organ to raise is named by friction in
real operation, never by a diagram. This is Kevin's workbench-last law stated
generally: the language generates the design through use; you don't spec the
center first. Corollary of the sequence axis: each raising step preserves what
is beneath it, and none can be skipped.

## Line 5 · The centers enrichment (CANON 2026-07-19 — adopted with provenance flag)
An optional second reading of the coherence axis, imported from Alexander's
*The Nature of Order* (NOT from Kevin's original seed — adopted knowingly):
an organ is a **strong center** (one clear thing, namable in a breath) with a
**boundary** (a felt edge), earning its place by **strengthening the centers
around it** (if it strengthens none, it is scaffold), leaving **the void**
intact (space that should stay empty — e.g. the held tray — stays empty), and
carrying **inner calm** (its one thing, without ornament; calm is earned last).
Use this reading as a cross-check on a filled spec, not as a second form.

**■ CONFIRMED AS THE SAME LAW, not an analogy, 2026-08-18.** `solid.js`'s F5
ruling — a seam completes when both its faces are inhabited, never by one act
alone — is "strengthens the centers around it" stated in geometry instead of
architecture. Found independently, five weeks apart, by two different
disciplines applied to two different scales (an organ's worth; a seam's
completion). See `nesi/game2d/THE_CENTRE.md` and `nesi/game2d/tank.html`'s
seam-completion logic.
