# THE WORKBENCH — level 12's reveal, and what opens after it

**Started 2026-08-21**, on Kevin's own words, this session: *"The lines of the
shell are retraced backward, with a light... when the whole structure is lit,
a silver mycelium colonized each face turning the structure from a wire frame
into mirrored faces. At level 12 complete, we site the full workbench. Each of
the preceding 12 levels was the tutorial. At level 12 the whole workshop
opens."* And, on what the workbench is for: *"the second half is the
foundation, and capacities of all of the tools together as a personal
platform... I want to have AI, running processes at the user's game-based
interactions."*

This is a design pass, not a build — same register as `THE_THREE_DYNAMICS.md`'s
own 08-20 pass. Everything below is marked **built** (real, checked),
**proposed** (this session's read, offered for you to cut), or **his**
(a naming or a choice only you make). Nothing here is adopted by being
written down.

Confirmed the same day, from the dependency-map pass: the tutorial/platform
split and `PROGRESSION.md`'s four circuits are not competing models. Every
one of the four circuits classifies, edge by edge, as `fall, fall, turn,
rise, rise, return` — identically, all four times, verified against
`solid.js`. The tutorial is the falling half of every circuit at once; the
platform (this document's subject) is the rising half of all four.

---

## 0 · WHAT'S ALREADY TRUE, COMPUTED

- **The trigger.** Level 12 = "water's twelve" (the 8 `fall` + 4 `turn`
  edges) all returned = 5 of the solid's 6 windows charged = `z-` is the one
  fold-hinge left unspent. `THE_THREE_DYNAMICS.md` §4 computed this; nothing
  new here.
- **The six rising seats.** `HELIOSTAT, OVERWINTERING, CAST, LENS, GARDEN,
  SEATING` (`solid.js`'s `SEATS`, `fall:false`). Four of them —
  `OVERWINTERING, CAST, GARDEN, SEATING` — are the top square, `z-`, the
  hinge that opens at level 12. The other two, `HELIOSTAT` and `LENS`, sit on
  windows already spent during the tutorial (`HELIOSTAT` on `x+`/`y-`) — they
  are rising seats, but their own windows are not what level 12 unlocks.
- **The platform's own twelve levels** = the top-12 edge set (8 `rise` + 4
  `return`) — the rising half of all four circuits, per the reconciliation
  above. Twelve real edges, same as the tutorial's twelve, not a separate
  count invented for this document.

---

## 1 · THE THRESHOLD — the reveal itself

**Built, already:** a walked edge's own line in `ascent.html`'s wireframe map
brightens toward full as its root deepens (`seatAmbient`/`rootStanding`,
2026-08-21) — not a flat "walked = lit," a continuous one. A junction seat
(two or more of its own water edges returned) draws larger, a real node with
more than one wire arriving.

**Not built:** anything that fills a FACE. `solid.js`'s own header counts 14
faces (8 triangles + 6 squares) as a first-class part of the solid, alongside
its 12 seats and 24 edges — but nothing today reads or renders a face as a
surface, only its bordering edges as lines. "A silver mycelium colonized each
face, turning the structure from a wireframe into mirrored faces" is a face-
fill mechanic, and no face-fill exists yet.

**Proposed — the fill, built the same way the charge already is:**
`windowCharge` already aggregates every seam aimed at a window, four seams
per window, into a single `windowStanding()` (0..1, no number shown). A
face's own fill would be the same aggregation one level up — not seams onto
a window, but the standing of the edges that border a face onto that face.
`facesOf`/`facesAlong` already exist in `solid.js` and already resolve which
triangle and square border any given seat or member; this reuses them rather
than inventing new geometry lookups. **Concretely:** a face's fill opacity =
the mean `rootStanding` of its own bordering edges (0 where none have
rooted, full silver where all have). Every one of the fourteen faces
brightens on its own schedule, driven by exactly the edges a hand has
already walked near it — never a global "level 12 = flip a switch."

**What this implies for the still-open fold-vs-cutscene question
(`THE_THREE_DYNAMICS.md` §4, unresolved, yours):** if the fill above is how
silvering actually works, the reveal is *already* incremental and playable
by construction — each face finishes on its own as the edges around it
root, no separate trigger needed. Under that read, "the flash — two
seconds, the whole solid" (`PROGRESSION.md`) would be the moment the *last*
face silvers, not a cutscene laid on top of an otherwise-invisible fold.
This is offered as a reading in favor of **playable fold**, not a ruling —
still yours to confirm, replace, or split (the last face's own completion
could still carry a two-second held beat, playable and ceremonial at once).

---

## 2 · WHAT THE WORKBENCH IS — proposed shape

Not a thirteenth mechanic bolted onto the existing loop. The same
interaction shape the whole corpus already stands on — *the world takes the
writing* (`THE_GIFT.md`) — pointed at a different destination once the hinge
opens:

| | tutorial (built) | platform (proposed) |
|---|---|---|
| the act | write, sort, aim | write |
| what receives it | `seam.js`'s water/light/root | a real tool, sited at the seat |
| what closes the level | `isReturned()` + `weekComplete()` | the tool's own act — see §4 |
| what's shown back | fraction/window/root depth, no number | the tool's own output, read through the same no-number law |

Each of the twelve platform edges stays a level in exactly
`LEVEL_LIBRARY.md`'s own sense — same template, same fields (`LEVEL`,
`ENTERS FROM`, `MECHANIC`, `TEXT BEAT`, `PACING`, `CLOSES ON`, `OPENS`). What
changes is the `MECHANIC` and `TEXT BEAT` fields: `MECHANIC` names which real
tool the seat routes to; `TEXT BEAT` is no longer only a prompt for what a
hand writes toward the world — it is *literally what gets handed to that
tool as input*. A player writing at `CAST`, once the workbench is open, is
not writing a diary entry about a gift. They are opening a mark.

---

## 3 · THE MAPPING — reconsidered, 2026-08-21, against the real registry

> **■ SUPERSEDED, same day.** The table this replaces guessed six candidate
> tools against the six rising *seats*, by name-resonance alone. Kevin's own
> correction — *"work backward from the workspace... elements of it are in
> the 12 stages... none of it assembled"* — points at something realer: `nesi/
> bench/bench.json` is a **ratified registry of exactly twelve organs**
> (`_meta.authority`: "nesi_job_grammar_2026-07-15.md — RATIFIED v2.1"), each
> with a real `accepts`, `stages_to`, `hard_limits`, and `default_tier`
> already defined — not a name to guess at, a spec to read. Its own status
> field says plainly: *"REGISTRY ONLY — nothing repointed... bench copies are
> mirrors-in-waiting."* Twelve real organs, sited nowhere. The old table is
> kept below this notice, not deleted, per this corpus's own layering
> convention — wrong enough to replace, not wrong enough to hide.

**Why edges, not seats.** The registry holds twelve entries. The platform
half of the solid holds twelve edges (the `rise`+`return` set, verified
against `solid.js`), not six — the six rising seats are where those edges
land, but the edge is still the level, per every ruling this corpus has made
about what a level is. Twelve organs onto twelve edges is an exact count,
no remainder, no seat holding two organs or none.

**The shape of the pairing.** Each of the four circuits' own platform arc is
two `rise` edges then one `return` (mirroring the tutorial's own two `fall`
then one `turn`, confirmed 08-21). Paired so that shape carries meaning: the
first rise edge is an *intake*-shaped organ (something new enters), the
second is a *processing/verifying* one, and the return — the edge that
closes the circuit — is a *delivery or closing* organ, echoing what a `turn`
already is on the falling side.

| edge | circuit | its own resonance | organ | why |
|---|---|---|---|---|
| `HELIOSTAT—OVERWINTERING` | 0, rise | aim meets season | `infrastructure` | a status query, literally seasonal — the heliostat's own aim, read as a report |
| `CAST—OVERWINTERING` | 0, rise | the gift meets patience | `morning-pages-channel` | a long drop, harvested slowly — CAST's gift, OVERWINTERING's own wait |
| `CAST—DAM` | 0, **return** | the gift meets what was held back | `mark-record` | the gift crystallizing into a record — closes circuit 0 |
| `GARDEN—HELIOSTAT` | 1, rise | growth meets aim | `substrate` | rich writing worked into pattern — a garden's own slow extraction |
| `GARDEN—SEATING` | 1, rise | growth meets the convened | `coordination` | monitors exchange quality across seated agents — SEATING's own word |
| `DAM—SEATING` | 1, **return** | release meets the convened | `graduated-trust` | an action logged, a tier read — trust released at the table, closes circuit 1 |
| `GARDEN—LENS` | 2, rise | growth meets focus | `provenance` | verifies what's grown — LENS's own "tight and easy to find" |
| `GARDEN—OVERWINTERING` | 2, rise | growth meets season | `metabolize` | a pile worked into disposition — what a season's growth leaves behind |
| `OVERWINTERING—TANK` | 2, **return** | season meets the writing tetra | `daily-cycle` | day-gated open/close, the same shape `growRoot()` already uses — closes circuit 2 back at TANK, where writing began |
| `CAST—SEATING` | 3, rise | the gift meets the convened | `field-kit-engine` | a gift built into apparatus for others — a convened audience's own use |
| `LENS—SEATING` | 3, rise | focus meets the convened | `miro-handler` | a shared surface a seated group looks through — LENS made literal |
| `DEEP—LENS` | 3, **return** | the sounding meets focus | `transmission-engine` | what the deep brings up, focused and sent out — closes circuit 3 |

Every one of the twelve registry organs used exactly once. Still a naming
act (`LEARNED.md` law 19) — offered whole so the shape is visible, nothing
in it load-bearing until you say so. A row can be kept, swapped, or emptied
with no cost to the other eleven.

**What "assembled" would concretely require, named plainly:** `ascent.html`
is zero-dependency by its own instrument (`zero_dependencies_check.js` —
no `package.json`, no remote script, no fetch). None of these twelve organs
can be invoked from inside that page as it stands — they are Claude Code
skills, run by a session, not by a browser. Assembling this mapping into
something real needs a bridge (a local file-based signal the game writes and
a session reads, most likely, matching the "no port, no network" discipline
`bench/geometric_bench/STANDING_NOTE.md` already fought to keep true) —
that bridge does not exist yet, and is its own design pass, not a
consequence of this table.

---

### The superseded table, kept whole

| seat | its own resonance | candidate tool | why |
|---|---|---|---|
| **HELIOSTAT** | aims a beam outward; `THE_24.md`'s own read, "the bottom is the source" | `transmission-engine` | takes a finished thing and aims it at an audience — the same shape a heliostat aims light |
| **OVERWINTERING** | day-gated, dormant, patient — the seat root's own law already borrowed for | `daily-cycle` | the corpus's own open/close session ritual, the same day-gated shape `growRoot()` already uses |
| **CAST** | already named — "the gift at the gate" (`THE_GIFT.md:101`) | `mark-record` | opens a mark-record slot the instant something real is given |
| **LENS** | focus, near-mirror — "a small, sharp landing, tight and easy to find" (`WINDOW_AXES.y`) | `provenance` or `record-audit` | close, verifying inspection — the two skills built this session for exactly that |
| **GARDEN** | tended, grown, over real time | `infrastructure` (its aquaponics half) | the literal system this corpus already monitors under that name |
| **SEATING** | where an agent is convened — the corpus's own word for its multi-voice panel | `coordination` | monitors exchange quality across seated agents, same word, same register |

---

## 4 · THE TRIGGER MECHANISM — proposed, and the one safety-relevant fork

**Proposed:** the write at a platform level *is* the tool invocation — same
shape as §2's table, no second interaction system grown alongside the one
already built. What scales is not whether the tool runs, but what comes
back: `seatAmbient`/`rootStanding` (already built) could scale how much of a
tool's own output surfaces — a freshly-touched seat shows only a summary; a
seat returned across several real days (the week-cycle already built) shows
more. This reuses mechanics that already exist rather than inventing a
readout.

**The hard boundary — already law, not new here.** The `infrastructure`
skill's own definition already states it plainly: *"never autonomously
actuates physical equipment. Monitor and recommend only — Kevin decides all
physical actions."* Nothing in this pass proposes loosening that. A play
action at `GARDEN` or `OVERWINTERING` should read, mechanically, as invoking
that skill's own read-only report — never a control action — exactly as the
skill already refuses to do more, on its own, independent of anything this
game ever asks of it.

**What this pass leaves open, and names as the real gate:** which of the
twelve mapped organs are read-only by nature (`mark-record`, `provenance`,
`coordination`, `graduated-trust`, `daily-cycle`, `metabolize`, `substrate` —
logging, reading, staging a delta) versus which could ever plausibly
propose a *write* reaching outside the game (`transmission-engine` can draft
and publish; `field-kit-engine` can build apparatus for a real dispute;
`miro-handler` touches a real board; `infrastructure` explicitly cannot act
at all — its own `hard_limits` field already says so). That split — not the
edge mapping in §3 — is the actual boundary a `boundary-audit` pass should
run before any of levels 13–24 get built, and it should run against
whatever the final mapping turns out to be, not this proposed one. Every one
of these twelve already carries its own `hard_limits` line in `bench.json`
— none of that needs re-deriving, only reading.

---

## WHAT THIS PASS DID NOT DO

- Did not build anything. Design only, same register as
  `THE_THREE_DYNAMICS.md`'s own 08-20 pass.
- Did not choose fold-vs-cutscene. Offered a reading (incremental face-fill
  implies playable fold) for you to confirm, not a ruling.
- Did not confirm §3's mapping — reconsidered once already, 08-21, from a
  guessed six-seat table to a grounded twelve-edge one against the real
  `bench.json` registry. Still proposed, still yours to keep, replace, or
  reject edge by edge.
- Did not design the bridge §3 names as the real gap — `ascent.html` is
  zero-dependency and cannot invoke a Claude Code skill from inside the
  page. Named plainly, not designed: that's its own pass.
- Did not design what an organ's own output looks like once read back
  through a level's face/window UI — a real next pass, once a mapping and a
  bridge both exist.
- Did not run the boundary-audit §4 itself names as owed before build.
