# THE BUILD'S SHAPE — for a session running TRIBUTARIES from outside

Written 2026-08-16. This is TRIBUTARIES **C0**, run against the actual build.
It replaces Part A1 and Part D of the instrument, exactly as the instrument's own
provenance note asks: *"Part A1 and Part D are the weakest sections and should be
overwritten by anyone running this against the actual build."*

---

## FIRST — THE FOUR SOURCES C0 NAMES DO NOT EXIST

`main.gd` · `tools/walk.gd` · `terrain_layout.json` · the scene tree

All four are **Godot**, all four live in `nesi/world3d/`, and that tree was
**retired 2026-08-14 on Kevin's mark** — *"all previous 3d work can be composted
for skills and learning, and retired. Building on it would be a dead end."*
It is kept whole as a record, marked at its own site by `nesi/world3d/RETIRED.md`.

**There is no engine.** The live build is a static browser build.

**PART D IS SET DOWN** — Kevin's mark, 2026-08-16. Not refused, not composted,
not replaced. It has no destination and nothing follows from it. Do not sweep
it, do not carry its candidate names forward, and do not write a reason next to
it: a refusal with a reason attached is the lake, and this is the ground.

---

## THE RUNTIME

```
static HTML + vanilla JS, served over a local static server
node v22.22.3 for the instruments
NO package.json · NO node_modules · ZERO dependencies, ever
no asset, no webfont, no image, no audio, no network call — everything is drawn
```

That last line is load-bearing for B3. This build has never taken a dependency,
so a candidate arriving as a package is a change of kind, not just of weight.

Open it by serving `nesi/game2d/` and walking `index.html` in a browser.

---

## SITED — what runs, is reachable, and persists

| capacity | where | store |
|---|---|---|
| the intake is the opening screen | `index.html` → `daily.html` | — |
| sentences bank as they are written; watermark retreats to a real boundary | `daily.html` | `nesi.water` |
| persistence: pad → read back → commit; a bad write never destroys a good one | `save()` in both surfaces | localStorage |
| **the internal open loop** — water LEAVES one store and ARRIVES in another, arrival written first, real loss at this end | `daily.html:806` → `ascent.html:197` | two stores |
| the door out — member ↓TANK–↑CAST, a 900ms hold on the sill | `daily.html` | — |
| ~~twelve seats, five levels, four faces each, 20 mechanisms (reach 8 · hold 4 · draw 4 · wait 4)~~ **RETIRED, 2026-08-21 — see note below the table.** | `ascent.html` | `nesi.ascent` |
| the map, with the upper tetra drawn and entered by hand | `ascent.html` | — |
| the hand-cut at THE SEATING — a seam the hand places, no midpoint drawn, no default | `ascent.html:1005-1058` | — |
| the clear case — the machine shown operating, boundaries announced and liftable | `ascent.html` | — |
| **the sounding** — TANK → GROUND → DEEP → his own sentence, verbatim → TANK. The only fully closed loop, and the only place a player's words return | `ascent.html` | — |
| the solid: 12 seats · 24 members · 4 circuits · 36 products, all derived from two tables | `solid.js` | — |
| the tile field — the solid drawn, self-checking, carrying the commons sweep | `tiles.html` | `nesi.tiles.1` |
| ~~13 live instruments behind one front door~~ **stale, 2026-08-22 — 16 of 17 hold, 3 more named as not covered, today** | `node tools/check_all.js` | — |
| the route map — what exists, where it routes, whether it crosses | `tools/route_map.js` | — |
| his real poured water, copied in read-only | `kevins-water.json` via `tools/pour.js` | untouched |

**Walk-testing today:** node instruments that parse and drive the page's own
functions, plus — as of 2026-08-16 — **rendered frames** via headless Chrome
`--screenshot` at a 15s virtual-time budget. Three prior sessions ended
`UNWITNESSED` because the pane would not composite; that is answered.

**■ SITED TABLE CORRECTION, 2026-08-22 — two rows above went stale on
2026-08-21 and were never caught.** `ascent.html` was rebuilt from scratch
that day (Kevin's mark: "cut the ascent entirely... build the levels entirely
from scratch") — the ROOMS grouping, the five gestures, and all twenty
mechanisms the first corrected row named are retired, not the live shape.
Current, verified by reading the live file: **twelve seats, twenty-four
edges**, one uniform mechanic (`seam.js`: sort, aim, write, hold) reached
identically from every seat — its own h1 says so in as many words. The
instrument-count row is stale for the same reason: the instruments that tested
the retired mechanic (`seats.js`, `assertion_audit.py`, `kit_check`,
`constraint_lint`, `cut_check`, `first_four`) are in `tools/retired/`, and
`check_all.js`'s live run today reports 16 of 17 holding plus three more named
as present in the page but not covered by that run — twenty named instruments
total, not thirteen. Neither correction was found by looking for it; both
surfaced from a corrective audit run the same day as the W4 fix above.

---

## WANTED — blocked or half-built, each tied to a real gap

Sweep against these only. Anything else is refused however good.

| # | capacity wanted | tied to |
|---|---|---|
| W1 | the cast leaves and **the world loses something** | OPEN: *"the cast writes a file but the world loses nothing when it leaves"* — a retention leak, B2's own test |
| W2 | ~~the other eleven stations' outputs~~ | **STALE, 2026-08-22 — cites the retired gesture system.** `solid.js` still derives all 36 products, but "wired to a gesture" described a mechanic that no longer exists; the 2026-08-21 rebuild reaches every one of the 24 edges through `seam.js` the same way, not through TANK's three gestures alone. Whether the OTHER PRODUCTS (`outputsOf`'s send/drop/set, beyond the edge-walk itself) are sited is a real, live, unanswered question — but not this one, as written. |
| W3 | ~~a held form at the seats that lack one~~ | **STALE, 2026-08-22 — the citing instrument is retired.** `assertion_audit.py` and the `seats.js` it depends on are in `tools/retired/` as of 2026-08-21, because they read the pre-rebuild `SET` table that no longer exists; `RETIRED.md` states outright not to cite their output as evidence about the live build. The "F7 fails at 10 of 12" reading can't be reproduced against today's build. Whether a held form exists at each seat is a real, live, unanswered question — but this citation for it is dead. |
| W4 | **a way into `ascent.html` from the front door** | found 2026-08-16 by `route_map.js`: `index.html` → `daily.html`, and `daily.html` names `ascent.html` only in comments. 139K with no way in — the `THE SEATING HAS NO DOOR` shape, one level up |
| W5 | ~~cold boot of the four levels never entered from a cleared store~~ | **STALE, 2026-08-22 — `first_four` is retired** (`tools/retired/RETIRED.md`, second wave, 2026-08-21), for testing the same pre-rebuild ROOMS mechanic as W3's instrument. Whether a cold boot reaches every one of the twelve seats cleanly is a real, live, unanswered question — but not measured by this instrument any more. |
| W6 | empty-state coverage: a seat entered before the seat that feeds it | three found by walking — stations with an empty queue, the sounding over an empty lake, the garden before anything grew |
| W7 | the circuit end to end, held by an instrument | walked once by hand; no instrument holds it |
| W8 | a projected membrane at four unclosed stars | gate `THE FOUR UNCLOSED STARS` (2026-08-16) — station, water, writer, three arms: node and three arms, no face |

### W4, MEASURED — the `nesiseed` predicate filter, run against this build 2026-08-16

Kevin handed in the **`nesiseed`** repository, whose `DECISIONS.md` CLOSED-2
records that "routed" had been one predicate doing three jobs, and states of the
replacement: **"Unverified against `nesi/game2d/`. The filter has only been run
against `fixtures/predicate_shape/`."**

**It has now been run against this build.** `node tools/predicate_filter.mjs
--root <this dir> --door index.html`:

```
files 59      REACHABLE from index.html      3
EXISTS 59  ·  MENTIONED 42 (live 32 · comment-only 10)  ·  REACHABLE 3

EXISTS but not REACHABLE .......... 56    ← the disagreement
MENTIONED but not REACHABLE ....... 39    ← an old index would call these routed
```

**Three of fifty-nine.** W4 named `ascent.html` alone; the shape is wider — and
the filter's three-way split makes one distinction `route_map.js` does not:

- **`ascent.html` is NAMED-IN-CODE, not comment-only.** The instruments read it
  with real `fs` calls. **Named in live code is not reachable by a player** — the
  check suite can open it and the hand cannot. A single-predicate index calls
  that routed; this is exactly the conflation CLOSED-2 was written against, and
  it fires on the largest surface in the build.
- **The three 08-16 surfaces split three ways.** `field.html` and
  `regathered.html` are **NAMED-IN-COMMENT** (by `index.html`'s own comment
  block). **`tiles.html` is an ORPHAN** — not named anywhere, in code or comment.
  Against *"all three surfaces should be inside the final nesi"* that is the
  measurement, not an impression.
- **LIVE-EDGE-UNREACHED (4):** `field_items.js` 272K · `world.html` 71K ·
  `world_water.js` · `level_one_water.js` — real edges that fire, no path from the
  door.

**Its one known limit, seen here:** three "DEAD LINKS" are regex literals inside
`daily_walk.js`, `refusal_check.js` and `scope_check.js` being parsed as
filenames. False positives, not missing files.

**Standing:** `nesiseed` OPEN-1 (*"the build is not in this repository"*) is
unchanged — nothing was deposited. What closed is CLOSED-2's own caveat: the
filter is no longer unverified against the real build.

### W4, RE-MEASURED 2026-08-22 — the 3-of-59 reading above is stale, not current

The 2026-08-16 measurement stands, unedited, as the record of what was true that
day (supersession is a mark on top, never an erasure). But `index.html` was
rebuilt after it — its own header now dates from 2026-08-16/17 and links thirteen
surfaces from a static, unconditional `<div id="bench">`, no JS gate required to
see them. Re-run today, fresh, against the current tree:

```
node tools/predicate_filter.mjs --root . --door index.html
SURFACES    15 of 18   reachable from index.html
```

**Fifteen of eighteen, not three of fifty-nine.** The door W4 named as broken has
been open since before this session touched anything today — nothing here was
fixed just now; the fix already happened (the 2026-08-21 rebuild, most likely)
and this doc never caught up to it. **Do not spend a future session "fixing" W4
— check whether it's still true before treating it as work.**

**One live, opposite-direction blind spot, found the same re-run:** `tank.html`
is real, reachable, and currently mis-scored as *NAMED-IN-CODE, not reachable* —
the instrument's own static scanner can't see it. `index.html:148` builds its
link at runtime (`HREF.TANK = "tank.html"`, read later by a click handler, never
a literal `<a href="tank.html">`), so the scanner never traces the edge. This is
the inverse of what W4 originally named: a page a *hand* can reach that the
*instrument* can't see, rather than the other way round. Not fixed here — naming
it is the whole of this correction, so the next hand that reads this table
doesn't trust a false "unreachable" on a page that plays fine.

Do not bring candidates for these. Each names a direction and reserves the
naming; the code is built so every answer stays possible.

- **what kind of trace a set-down leaves** — *"a trace, and I will say what kind"*
- **which of hand and site colours what** — *"both, and I will say which is which"*
- **BLIND's door** — unmarked, still open
- **the currency of the door's cost** — the member exists and costs something; what the price is in, is his

---

## THE LENS, RE-POINTED AT THIS BUILD

Part B holds unchanged — light/heavy, retention, tissue, seed. Two notes on how
they land here:

- **B3 (TISSUE) is not a preference in this repo, it is the house style.** Zero
  dependencies, everything drawn. A format the build reads and writes beats a
  library by a wider margin here than the instrument assumes.
- **B1 (LIGHT/HEAVY) has a second edge.** The build's own laws already forbid a
  network call on the player's path. A candidate needing a service fails B1 *and*
  law 3, and the second one is not liftable by convenience.

---

## WHAT A SWEEP ALREADY FOUND — 2026-08-16

Run once against this list. ~45 candidates read, **2 survived**, cards at
`inbox/trib_2026-08-16_01` and `_02`. Refusals by primary cause: SEED ~15
(the Godot field, plus alpha projects) · TISSUE ~10 (CRDTs — they own the store,
and there is no second writer) · LIGHT/HEAVY ~8 (server ledgers, accounts) ·
MOUTH ~8 (no terrain and no optics in the live build to join to) · not on
WANTED 2.

The wider commons sweep, sited to the geometry rather than gated on a mouth, is
`DEPOSITS_FROM_THE_COMMONS.md`, with the surface at `tiles.html`.
