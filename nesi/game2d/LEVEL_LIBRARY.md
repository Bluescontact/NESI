# THE LEVEL LIBRARY — building the 24 as a progression

**Started 2026-08-20**, on Kevin's mark: *"let's go ahead and compost past
level design... let's build the library for the levels, and work them as a
progression... I've already articulated the first 4 stage progression... I'm
aiming for each level to be about 5 to 10 minutes, to balance the level and
text."* Supersedes `THE_SIX_MANIFESTS.md` as the build's own ladder of record
(composted the same mark, layered notice at that file's own head).

This is a library, not a script: one entry per level, built to the same
template, so the library grows one level at a time without redesigning the
container each time. Nothing in it overrides the geometry (`solid.js`,
`THE_24.md`) or the two rulings that govern every level's content:

- **A level is an edge; a tetra is a developed object** (MARKS_LOG.jsonl
  2026-08-20T20:45:00) — a level doesn't need four faces to count, but it can
  be developed into that shape if there's reason to.
- **The sort keeps physical fractions, and a gift falls out at the end of a
  full circuit** (2026-08-20T21:05:00, THE_FILTER.md's fork, ruled "Both").
- **Light is aim, plus a persisting per-window charge** (built and verified
  2026-08-20, `seam.js`: `windowCharge`/`windowStanding`).

---

## THE ENTRY TEMPLATE

Every level in the library gets these fields. Fields marked **(his)** are
never authored by a session — they're placeholders until Kevin writes them,
per the naming law (`LEARNED.md` 19: a name only when it carries weight, and
it's his to give).

```
LEVEL        <from>—<to>, kind, tool, window          (computed, THE_24.md)
ENTERS FROM  which level/seat a hand arrives from
MECHANIC     what's already built here (sort/aim/root/window-charge) vs what
             this level needs beyond the generic seam that no other level has
TEXT BEAT    what the player is actually writing here, and why THIS moment
             asks for it — (his) to name the prompt/framing, if any framing
             exists beyond the open page. **■ The mechanism itself is built,
             2026-08-21** — every edge now has its own write step
             (fractionControl's "write" button, SEAM.WRITE_CAP=40, tagged to
             that edge's own id via SEAM.tagWritten and gating the door
             alongside isReturned/weekComplete). Still open, per-level: only
             the PROMPT/framing text, if any beyond the open page — the act
             of writing needs no further build to exist at any of the 24.
PACING       a real budget: write time + mechanic time, and what it assumes
CLOSES ON    what makes this level done (today: isReturned() — fraction set
             + light aimed — AND SEAM.hasWritten() — this edge's own entry
             kept and tagged, built 2026-08-21. Both required to open the door.)
OPENS        what becomes reachable once this level is closed
```

---

## THE PACING PROBLEM, NAMED BEFORE THE FIRST FOUR

**The current built mechanic does not fill 5–10 minutes on its own, and this
library can't pretend otherwise.** A single level, mechanically, is: write
one entry (RAIN, 60–90s per `THE_GAME.md`'s own core-loop timing), pick a
fraction (a few seconds), aim a window (a few seconds), hold the sill (a
fixed physical reach, well under a minute). That's under three minutes even
generously played, and most of it is the write.

Three honest ways to close the gap, not mutually exclusive — **which of these
you want is upstream of authoring the first four's TEXT BEAT, not something
this library can decide for you:**

1. **More than one write per level.** If a level asks for 2–3 separate RAIN
   entries before it closes (not currently how `isReturned()` gates — that
   fires on the first fraction+light pair), 5–10 minutes is reachable in one
   sitting. Needs a real build change: `isReturned()` would gate on a count,
   not a boolean.
2. **The level spans real days.** Root growth (`ROOT_STEP=0.22`, day-gated)
   already only advances once per calendar day. If "5–10 minutes" is meant
   *per visit, across several returns* rather than one sitting, the current
   build already supports that — no change needed, just a pacing model that
   counts differently than a single-session playtest would.
3. **More built content per level**, beyond sort+aim+root — something to
   look at, walk through, or respond to that isn't the write itself. This is
   real new mechanic work, level by level, not a global change.

The first four below are written assuming **(2)** — spans real days — because
it's the only one of the three that costs nothing to start with today's
build. If that's wrong, say so before more levels get authored to it.

---

## THE FIRST FOUR — DAY ONE, THE BOTTOM SQUARE

Kevin's own words (MARKS_LOG.jsonl 2026-08-19T00:00:00): *"i thin the first
four stage is the bottom square of the cubedecohedron. and i think that the
tank goes to the filter/dam."* Computed fresh from `solid.js`, not assumed:
the bottom square is **FILTER · STATIONS · GROUND · DEEP** — the only square
where all four seats are fall/water-side — and its own four edges close a
loop:

```
TANK ──▶ FILTER ──▶ GROUND ──▶ STATIONS ──▶ DEEP ──▶ FILTER
         (entry)      #8         #14          #2      #19, closes the square
```

All four edges are already mechanically wired (seam.js, built 2026-08-19) —
sort, aim, root all live. **What's not yet decided is the text beat and the
pacing, which is what this pass actually adds.**

One structural fact worth knowing before naming any of the four: **all four
of the bottom square's own edges share the same window — `z+`, the square
itself.** Each seat's *other* window (the one that isn't z+) differs per
seat. So aiming "down," into z+, across all four levels is the one path that
concentrates charge into a single window fastest; aiming "out," into each
seat's other window, spreads it across four different windows instead. That
choice is the player's, every time — nothing in the geometry favors one.

### 1 · TANK → FILTER (entry, off-square)

| field | value |
|---|---|
| LEVEL | `FILTER—TANK`, #20, circuit 4, kind `fall` — confirmed against `THE_24.md` circuit 4 (`↓TANK—↓DEEP—↓FILTER—↑LENS—↑CAST—↑SEATING`, walked as `↓FILTER—↓TANK`). Already built — one of the 3 water-edges `tank.html` had before the 08-19 pass (TANK-GROUND, FILTER-TANK, TANK-CAST). Not one of the four bottom-square-perimeter edges (#8/#14/#2/#19) — it's how a hand reaches the square, not part of the square's own loop. |
| ENTERS FROM | `tank.html`, the writing tetra |
| MECHANIC | built — TANK's own seam door |
| TEXT BEAT | **(his)** — this is the first thing a new player writes at all; whatever framing exists for "the tank" already lives in `tank.html`/`daily.html`, not new to this pass |
| PACING | the entry write, ~60–90s, plus the walk itself |
| CLOSES ON | TANK's own door mechanic |
| OPENS | FILTER |

### 2 · FILTER → GROUND (#8, tool A, window z+)

| field | value |
|---|---|
| MECHANIC | built (sort/aim/root). Nothing level-specific beyond the generic seam. |
| TEXT BEAT | **(his)** to name. Structurally: FILTER is where separation happens — "you cannot sort what has not yet settled" is the corpus's own read of the *next* edge (GROUND—FILTER, #8 reversed), so this direction (FILTER→GROUND) is the settling, not yet the sorting. What's actually being asked of the player's writing at this specific edge is a naming question, not a mechanic one. |
| PACING | one write + the seam act, ~3–4 min if visited once; the remainder of the 5–10 min budget is the return visit implied by root's day-gate, not padding within a single sitting |
| CLOSES ON | `isReturned()` — fraction + light |
| OPENS | GROUND |

### 3 · GROUND → STATIONS (#14, tool B, window z+)

| field | value |
|---|---|
| MECHANIC | built. |
| TEXT BEAT | **(his)**. `THE_24.md` #14's own accomplishment line: *"What has settled can be routed. You cannot send on what has not landed."* — the level after intake, before choice. |
| PACING | same shape as level 2 |
| CLOSES ON | `isReturned()` |
| OPENS | STATIONS |

### 4 · STATIONS → DEEP (#2, tool A, window z+)

| field | value |
|---|---|
| MECHANIC | built. |
| TEXT BEAT | **(his)**. `THE_24.md` #2: *"What you sent on keeps falling. The third output — set down, no feedback — is the one that never arrives here, and its absence is the lesson."* |
| PACING | same shape |
| CLOSES ON | `isReturned()` |
| OPENS | FILTER again, via DEEP—FILTER (#19) — **this is the square closing, not the game closing.** Walking #19 completes the four-level loop but is not one of the four 6-edge circuits from `THE_24.md`, so it does NOT trigger the "gift falls out" ruling from the sort fork — that fires at the end of a full **circuit** (6 edges), and the bottom square is a different structural unit (4 edges, a face, not a circuit). Worth being explicit about so Day One doesn't get built expecting a gift it geometrically can't produce yet. |

### 4b · DEEP → FILTER (#19, tool B, window z+) — closes the square

| field | value |
|---|---|
| MECHANIC | built. |
| TEXT BEAT | **(his)**. `THE_24.md` #19: *"What came back from the deep is what there is to sort. You separate what returned, not what you sent."* — the loop's own return, structurally, even though it isn't a circuit-return in the ruled sense above. |
| PACING | same shape |
| CLOSES ON | `isReturned()` |
| OPENS | whichever of FILTER's members leaves the square — first step toward a real circuit (FILTER sits on circuits 2 and 4) |

---

## WHAT THIS PASS DID NOT DO

- **Did not write any TEXT BEAT.** Every **(his)** field above is a real
  placeholder, not a stand-in I filled with my own reading — the words a
  player writes, and any framing offered for them, are the one thing this
  library can't author on your behalf.
- **Did not build the multi-write completion gate** (pacing option 1 above) —
  that's a real code change, not made until you say which of the three
  pacing shapes you want.
- **Did not touch `ascent.html`'s ROOMS system or any other code** — this
  pass is documentation only, laying out the library before building further
  into it.
