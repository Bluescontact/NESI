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
| twelve seats, five levels, four faces each, 20 mechanisms (reach 8 · hold 4 · draw 4 · wait 4) | `ascent.html` | `nesi.ascent` |
| the map, with the upper tetra drawn and entered by hand | `ascent.html` | — |
| the hand-cut at THE SEATING — a seam the hand places, no midpoint drawn, no default | `ascent.html:1005-1058` | — |
| the clear case — the machine shown operating, boundaries announced and liftable | `ascent.html` | — |
| **the sounding** — TANK → GROUND → DEEP → his own sentence, verbatim → TANK. The only fully closed loop, and the only place a player's words return | `ascent.html` | — |
| the solid: 12 seats · 24 members · 4 circuits · 36 products, all derived from two tables | `solid.js` | — |
| the tile field — the solid drawn, self-checking, carrying the commons sweep | `tiles.html` | `nesi.tiles.1` |
| 13 live instruments behind one front door | `node tools/check_all.js` | — |
| the route map — what exists, where it routes, whether it crosses | `tools/route_map.js` | — |
| his real poured water, copied in read-only | `kevins-water.json` via `tools/pour.js` | untouched |

**Walk-testing today:** node instruments that parse and drive the page's own
functions, plus — as of 2026-08-16 — **rendered frames** via headless Chrome
`--screenshot` at a 15s virtual-time budget. Three prior sessions ended
`UNWITNESSED` because the pane would not composite; that is answered.

---

## WANTED — blocked or half-built, each tied to a real gap

Sweep against these only. Anything else is refused however good.

| # | capacity wanted | tied to |
|---|---|---|
| W1 | the cast leaves and **the world loses something** | OPEN: *"the cast writes a file but the world loses nothing when it leaves"* — a retention leak, B2's own test |
| W2 | the other eleven stations' outputs | OPEN gate `THE OTHER ELEVEN STATIONS` — `solid.js` derives all 36, only ↓TANK's three are wired to a gesture. 33 unwired |
| W3 | a held form at the seats that lack one | `assertion_audit` F7 fails at 10 of 12. Kevin's own read, offered not assumed: held form may be a property of irreversibility, in which case ten are correct |
| W4 | **a way into `ascent.html` from the front door** | found 2026-08-16 by `route_map.js`: `index.html` → `daily.html`, and `daily.html` names `ascent.html` only in comments. 139K with no way in — the `THE SEATING HAS NO DOOR` shape, one level up |
| W5 | cold boot of the four levels never entered from a cleared store | `COVERAGE.md` — `first_four` cold-starts LEVEL ONE only |
| W6 | empty-state coverage: a seat entered before the seat that feeds it | three found by walking — stations with an empty queue, the sounding over an empty lake, the garden before anything grew |
| W7 | the circuit end to end, held by an instrument | walked once by hand; no instrument holds it |
| W8 | a projected membrane at four unclosed stars | gate `THE FOUR UNCLOSED STARS` (2026-08-16) — station, water, writer, three arms: node and three arms, no face |

### NOT SWEEPABLE — reserved to Kevin, and not capacity gaps

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
