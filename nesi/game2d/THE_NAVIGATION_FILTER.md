# THE NAVIGATION FILTER — a dead end is navigation data

**Kevin's mark, 2026-08-22** (against `CLAUDE.md` FRAMING, admitted into
`nesi/mind/LEARNED.md` as law 27 the same day):

> *"i think i need to institute a new filter. I want to strip negtive framing
> out of the returns i get. The negative framing has become increadingly
> problematic, and limiting, and i'd like positive framing. A dead end, a
> lititation, a failure can be navigation data, and used to develop composite
> solutions when recognized as an place that needs an upstream deposit."*

This file is the same law, read on this build's own vocabulary — seats,
gates, edges, circuits, compost — the way `THE_UPSTREAM_FILTERS.md` and
`THE_FILTER.md` each read a general law against this build's specific parts.
It establishes nothing new; it sites law 27 here.

---

## WHAT IT SAYS ON THIS BUILD

A refused gate, a seat that won't complete its circuit, an edge that drops
the gift it was meant to carry — none of it reports back as "broken."
`gate/gate.mjs` already holds the shape this law asks for: what doesn't
route isn't discarded, it's held — in `gate/COMPOST.jsonl`, in `gate/LEDGER.jsonl`
— as the record of an unmet upstream condition, not a verdict on the mechanic
that hit it.

A blocked seat names which deposit the circuit is still waiting on. An
instrument in `tools/check_all.js` refusing green names which condition the
build hasn't paid for yet, the same way law 22 already requires (**a gate is
a filesystem fact, not an exhortation**) — the refusal is data about the
gate, not a verdict on the session.

## WHAT THIS DOES NOT CHANGE

- **The instruments still refuse or hold exactly as built.** This law governs
  how a refusal is *read and returned*, not whether an instrument fires.
  `check_all.js`, `gate.mjs`, and every refusal in `refusal_check` stay
  exactly as they are — law 27 does not soften a gate; softening a gate to
  avoid a negative reading would itself be law 20's lever, giving Kevin a
  false green instead of the real state.
- **A stranger's BLOCKED or UNWITNESSED verdict (`cold-walk`) is still
  reported in full.** Reading a block as navigation data means naming what it
  points to, not omitting that it fired.

## THE COMPOSITE-SOLUTION STEP

When the same gate refuses more than once, that repetition is itself the
signal — the corpus already has language for it (`THE_UPSTREAM_FILTERS.md`
§4, "the fixes"): the second and third refusal at the same seat is the place
that names its own missing upstream deposit. The composite solution gets
built from naming that place, not from re-describing the refusal each time it
recurs.

**Built 2026-08-23: `gate/deposits.mjs`.** A read-only layer over
`gate/LEDGER.jsonl`'s full run history — groups every REFUSE by instrument id
+ exact reason text, surfaces count and standing span for any that repeat.
Runnable standalone (`node gate/deposits.mjs`) and printed automatically at
the end of every `gate.mjs` run as a `named deposits` section. It never
refuses, holds, or passes, has no exit code of its own, and is not registered
into any suite — it changes how a repeat is *read*, exactly as law 27
requires, and nothing about whether any of the nine instruments still fire.
First real output, at build time: `08-return` refused identically 30 times
since 2026-08-21; `02-selfuse` refused identically 27 times on 2026-08-18
before its own condition changed. Both are the ledger naming itself, not this
tool inventing a reading.
