# RECONCILIATION — three organ systems, one corpus

**Date:** 2026-08-31. **Asked for:** Kevin, after a survey pass turned up three
separate, non-overlapping "organs" vocabularies coexisting in this corpus —
"reconcile the three organ systems first."

**What this is not.** This is not three competing answers to the same
question, adjudicated down to one. Reading all three whole (`nesi/game2d/ORGANS.json`
in full via structured extraction, `nesi/NESI_V2_ORGANS.md` and
`nesi/spec/THE_WHOLE_NAMING_2026-07-31.md` and `nesi/spec/NESI_AS_A_WHOLE_2026-08-04.md`
read end to end) shows they are three different technical layers of NESI,
built in three different technical eras, each of which independently
reached for the word "organ" as its own organizing metaphor. They don't
disagree about what an organ is. They were never talking to each other.

---

## The three systems, named by what they actually are

### 1 · `nesi/game2d/ORGANS.json` — the game2d pattern library

**What it is.** Not game lore. A cross-domain design-pattern catalog for the
live HTML/JS build (`nesi/game2d/index.html`, the game this deposit's
`game/` folder actually ships). 27 organs — concrete mechanisms
(append-only log, token bucket, closure predicate, content-addressed store
with no `list()`...) — each assigned to one of 12 abstract **gesture-seats**:
TANK, DAM, FILTER, STATIONS, GROUND, DEEP, LENS, HELIOSTAT, SEATING,
OVERWINTERING, GARDEN, CAST. Admission requires **the recurrence test**: an
organ is confirmed only at three or more sightings in three or more
*unrelated* real-world domains (storage, biology, messaging...) — "one
project doing a clever thing is a trick. The same mechanism in storage, in
graphics and in biology is an organ." (`ORGANS.json` header, Kevin's mark
2026-08-16.)

**Status, by count:** 21 built, 3 by-law, 1 partial, 3 absent (never sighted
enough to admit; kept as open slots, not deleted rows).

**What it's for.** These 12 gesture-seats are literally the UI grounds in
`index.html` — the boot harness's own framing check names them directly
("FILTER (never routed), STATIONS (never routed), GROUND (never routed)...").
This is the vocabulary of the *currently live, currently deposited* build.

### 2 · THE_WHOLE_NAMING / NESI_AS_A_WHOLE — the world's seven places

**What it is.** The world3d (Godot) game's geography. Seven places, each
with (at most) one organ underneath: **The Shore** (none — ground) · **The
Three Spires** — Grown, Given, Woven (organ: HEARTWOOD) · **The Workshop**
(none — the seventh place itself, a private build space) · **The Hearth**
(organ: CONTINUATION) · **The Heliostat** (organ: CONVENER) · **The Lake**
(organ: SOIL) · **The Membrane** (organ: CIRCULATION-WITNESS). Governed by
`THE_WHOLE_NAMING_2026-07-31.md`, accepted and amended through §7e
(2026-08-02, Kevin's marks) — a world that is a tetrahedron, water as the
operating medium, a dam, a weather cycle.

**Status, per `NESI_AS_A_WHOLE_2026-08-04.md` page 5's own honest ledger:**
Godot terrain through stage 4 is real and human-walked — 40 regions,
an orchard of 170/176 patterns placed by kinship, the Shore round-trip
closed. But **built and unvisited**: no gift has crossed the Membrane, no
Guest exists, the Given and Woven Spires stand empty. Named, adopted, and
explicitly not built: the dam, the tetrahedron world-form, the weather
cycle. The terrain seed still derives from a mark-count, not the word-count
clock the naming now names — "that disagreement is recorded rather than
smoothed." Page 10's own diagnosis: the world is read-only; **no verb set
has been chosen**; nothing above craft-polish matters until one is.

### 3 · `nesi/NESI_V2_ORGANS.md` — the Python board app's module inventory

**What it is.** Not lore, not a pattern library — a migration manifest for
a Python/tkinter+web-board application (`nesi/nesi_v2.py`,
`nesi/build_board.py`, packaged as `nesi/NESI_v2.exe`). ~28 modules
("organs" in this system's own sense = features/modules) grouped into five
strata: PULSE (engine/metabolism: `core`, `engine_local`, `continuity`,
`library`...), SOIL (intake→compost: `soil`, `front`, `glance`...), FOREST
(the grown self + gifts: `heartwood`, `forest`, `held`, `bench`...),
MEMBRANE (boundary/coordination: `coordination_surface`, `skin`,
`tension_table`...), FACE (`board`, `surface_bridge`). Plus six SPEC'd,
still-unbuilt expressions (`SPEC_the_worth_organ`, `tetra_transaction_face`,
`integrity_organ_spec`, `receiving_organ_design`,
`draft_instrument_witnessing_a_gift_without_merging`, and the player
surface).

**Status:** self-declared **MIGRATION COMPLETE, passes A–E, 2026-07-25** —
the same single day it started. `worth.py` (7/7) is named as the one
fully-shipped spec'd expression; the rest are explicitly deferred as "each
its own focused build."

**What this file is actually related to.** Not system 1. This is a Python
*implementation attempt* of system 2's vocabulary — its own strata map to
system 2's places directly (`soil`↔The Lake, `heartwood`↔The Spire(s),
`skin`/`coordination_surface`↔The Membrane, `forest`↔the orchard). System 3
is the Python-board rendering of system 2's world-naming, not a fourth,
independent thing.

---

## The real collision: gesture-seat names vs. place names

Three names appear in **both** system 1 and system 2, meaning **different
things** in each:

| Name | System 1 (game2d gesture) | System 2 (world place/organ) |
|---|---|---|
| **HELIOSTAT** | "I AIM" — sample-and-hold, partition-of-unity (built) | The Heliostat / CONVENER — computed overlap of yes-marks |
| **DEEP** | "I LET IT GO DOWN" — content-addressed store, no `list()` (by-law); visibility culling (built) | THE DEEP — the Lake's dark, unrendered part; never renders, even to Kevin |
| **GROUND** | "I LET IT SETTLE" — relaxation to rest (built); background compaction (by-law) | the accretion rule — terrain as pure function of the ledgers, ground rises where marks land |

**DECIDED, 2026-08-31 (Kevin's mark: "decide the HELIOSTAT/DEEP/GROUND
naming collisions"):** on inspection, all three are the same mechanism,
independently invented. game2d's "partition of unity" (weights across
contributors summing to one) IS the world's computed-overlap CONVENER.
game2d's "content-addressed store with no `list()`" IS "the Deep never
renders, even to Kevin." game2d's "relaxation to rest" IS the accretion
rule's "ground unwalked flattens slowly, never to zero." Not renamed, not
merged in code — different codebases, both names earned — but each now
carries a fifth sighting in `ORGANS.json` recording the world-naming layer
as an independent confirming domain, per that file's own recurrence-test
law (three-plus sightings in three-plus unrelated domains is what makes a
mechanism a real organ, not a trick).

---

## Which system is live

**game2d (system 1) is the active build.** `index.html` was last touched
2026-08-27; the gate has admitted 16 marks; this is the corpus's daily
work, and it's what this session's deposit pipeline (`tools/build_deposit.js`,
`tools/build_deposit_public.js`) ships to `Bluescontact/NESI` right now.

**NESI v2 (system 3) went dormant the day it finished.** `nesi_v2.py` was
last modified 2026-07-25 15:23 — the same afternoon its own migration
manifest declared "MIGRATION COMPLETE." No mark since touches it. It was
never formally retired; it simply stopped being worked, the same week
game2d's own history starts gathering pace. **Superseded by inactivity, not
by a mark** — said plainly rather than left ambiguous, per this corpus's
own rule that a thing not built for a month is a fact, not a judgment.

**The world3d/naming system (system 2) — CLOSED, 2026-08-31 (Kevin's mark).**
Not an open fork after all. Kevin's ruling: both system 2 (world3d) and
system 3 (NESI v2) are abandoned projects — they imploded under the weight
of their own debris, not paused pending a decision. Both are now **SOIL**:
composted, not deleted, explicitly available to extract from and mine for
game2d, the repo this session's deposit pipeline actually ships. This
supersedes the "genuinely open fork" reading two paragraphs up — caught to
`MARKS_LOG.jsonl` 2026-08-31T09:56:58.

What "soil" means here in practice: nothing is ported wholesale. `worth.py`
(system 3's one flagship-complete spec'd organ — "completes the recognition
law's four mechanics"), the accretion rule and dam mechanic (system 2, real
design, never built), and the 40-region Godot terrain layout are all real
material a later extraction pass can draw single mechanisms from — the same
relationship `tools/library_lens.js` already has to `world2d/`, `bench/`,
and `game2d/_compost` for gift-sourcing. Neither codebase is revived as its
own thing; neither is silently deleted.

---

## What this reconciliation does and does not decide

**Decided, by evidence, not by mark:** the three systems are not
duplicates of each other and none needs to be deleted or merged into
another. game2d is the live build.

**Decided, by Kevin's mark, 2026-08-31:** the HELIOSTAT/DEEP/GROUND
collisions (same organs, independently sighted — see above). NESI v2 and
world3d are both soil — composted, available to mine, neither revived nor
erased.

**Not decided, and not this document's to decide:** which specific
mechanisms from that soil are worth actually extracting into game2d, and
when. That's the next pass, not this one.
only Kevin makes.

*Nothing here is crossed. This is the map, so the three bodies are held
apart correctly rather than blended by accident — the same purpose the
2026-08-02 `RECONCILIATION` this file is named after served for one build
thread.*
