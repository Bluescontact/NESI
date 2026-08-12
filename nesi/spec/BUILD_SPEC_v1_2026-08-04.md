# NESI — CONSOLIDATED BUILD SPEC v1

**Status: SPEC, not a go.** Nothing here is built and nothing here is a mark. It consolidates ten namings from 2026-08-04 into one buildable structure and states, section by section, **which unmarked decision each part rests on.**

**How to read it.** §1 is the whole thing in one diagram. §2–3 are the generation chain, concrete enough to implement. §4 is build order. §5 reconciles it against what actually exists in `nesi/world3d/`, including three real conflicts. §6 is the dependency table — **the most important section**, because it says exactly what is provisional.

**Sources:** `THE_SOUNDING` · `THE_WATERSHED` · `THE_PASSAGES` · `THE_CATCHMENT` · `THE_FALL` · `THE_DEPOSIT` · `THE_BEDROCK` · `THE_DOOR_AND_THE_SHAPE` · `BUILDERS_AGREEMENT_v0` · `THE_WHOLE_NAMING` (as amended through §7e).

---

## §1 · THE PROCEDURAL SPINE

**Four inputs generate the entire world. Nothing is authored.**

```
  CANON ─────┐
  (patterns/ 176)                          ┌──→ TERRAIN ──┐
             ├──→ BEDROCK FIELD ──┐        │              │
  GRAIN ─────┘                    ├──→ ────┤              ├──→ FORM ──→ the world
  (385 declared links)            │        │              │
                                  │        └──→ GRAVITY ──┘        ↑
  WRITING ──→ WATER LEVEL ────────┘             ↑                  │
  (this session's words)  └──→ DEPOSIT ─────────┘         INDICATORS ┘
                                                          (water state only)
  APEX (1 of 4) ──→ which scalar field material minimizes
```

**The claim this spec makes, and everything else follows from it:**

> **Nothing in this world is placed. The ground has a shape, and material finds its level.**

---

## §2 · THE FOUR INPUTS — all already on disk

| Input | Source | Count | Authored by |
|---|---|---|---|
| **CANON** | `patterns/*.md` | 176 files | Kevin's marks only — 129 crossings, no other door |
| **GRAIN** | `[[…]]` lineage in those files | 385 links, 77 files | Kevin, at crossing time, as part of the screen |
| **WRITING** | the session's text | live | Kevin, this minute |
| **APEX** | which of four vertices is up | 1 of 4 | Kevin, by coming about |

**No fifth input exists.** Anything the world contains that does not derive from these four was put there by someone deciding what Kevin's world should contain.

---

## §3 · THE DERIVATION CHAIN

### D1 · BEDROCK FIELD
**In:** `patterns/` · **Out:** a set of masses with position and height
- Each pattern is one mass.
- **Position** comes from grain adjacency only (§D2) — force-directed over the 385 declared links.
- **Height** comes from hardness: how many washings the pattern has survived (recuts, screens, falsifier passes).
- **A pattern with no declared lineage has no position and is not in the bedrock.** It contributes flat ground.

*Rests on: **b1** (canon is the bedrock) · **b4** (undeclared grain = flat) · **b6** (hard/soft, never as a number).*

### D2 · GRAIN FIELD
**In:** the typed lineage links · **Out:** a vector field — bedding direction at every point
- An edge between two masses defines a bedding line between them.
- **`EXTENDS` is directional** (parent → child). That directionality gives the grain a **dip** — which is what makes valleys run one way rather than being symmetric troughs.
- `Sibling to` is undirected: bedding without dip.
- The field interpolates between edges; where there are no edges within range, the field is null and the ground is flat.

*Rests on: **b3** (declared kinship, never computed similarity).*

### D3 · TERRAIN
**In:** D1 + D2 · **Out:** the walkable surface, before any deposit
- Erode the bedrock along the grain: **valleys cut along bedding, ridges stand across it.**
- This surface is what the world looks like with nothing written into it — **structure with no substance. The wireframe.**

*Rests on: **d1** (no texture layer; the ground is what you wrote).*

### D4 · GRAVITY — the four apex states
**In:** apex state · **Out:** which scalar field material minimizes

Gravity here is not a 3-vector. It is **which quantity material falls toward a minimum of.** Same terrain, four potentials:

| Apex | Material minimizes | So things gather by |
|---|---|---|
| **AS IT CAME** | temporal distance | when they were written |
| **BY KINSHIP** | grain distance | declared lineage |
| **BY ECHO** | inverse recurrence | what you returned to, pulling inward |
| **BY SOLITUDE** | connectedness | what shares nothing, standing clear in open ground |

**Four orientations of one terrain, never four terrains.** Rotating the apex does not rearrange anything — it changes where down is, and material re-settles.

*Rests on: **four directions of down** (KEPT, Kevin's mark) · **f1** (four gravities, not four algorithms).*

### D5 · DEPOSIT
**In:** the session's sentences + current gravity · **Out:** settled positions
- Each sentence is one particle. Text is carried **verbatim** and never altered, summarised, or re-worded.
- A particle settles to a local minimum of the current potential.
- States: `in suspension` → `settled` → (`standing` by D9) → (`across` by D10).

*Rests on: **p1** (the chain is four states, not six) · **s1** (the shoals).*

### D6 · WATER LEVEL
**In:** cumulative word count · **Out:** a height
- Below the level is water; above it is exposed.
- **THE DRAW** is a threshold on this level: below it you are `aground`, at it you `lift`.
- The response is to **volume only**. Identical for any thousand words.

*Rests on: **k6** (respond to volume, never to content) — and note that tile named its own weakness: arrangement is content-derived by construction, so D4/D5 do differ by content while D6 does not.*

### D7 · FORM
**In:** deposit density per cell · **Out:** what stands there
| Density | Form |
|---|---|
| none | bare terrain (wireframe) |
| sparse | flat, bank |
| moderate | bar, shoal |
| dense | structure stands |

**Nothing is instanced from a library.** Enough material in one place becomes somewhere.

**ORGANS ARE PLACED, DEPOSIT ACCRETES** (Kevin's ruling, 2026-08-05, resolving C-2 verbatim): *"The five buildings are organs, not deposit — §D7 governs what deposit makes and does not govern where an organ stands."* A workshop, a hearth, a membrane were already true about how the keeper works; they did not accrete from sentences and were never supposed to. This section governs **what deposit makes**. It does not govern where an organ stands. **C-2 is closed** — the five instanced buildings are lawful and stay.

*The line this draws, so it cannot be read as a licence:* an organ may be placed because it exists outside the water entirely. **Nothing made of deposit may ever be placed** — no sentence, no stack, no Spire. §D9 still stands: nothing promotes a pattern onto a spire; the wash takes the softer material away and what is left was always there.

*Rests on: **d2** (density makes form) — and its named hole: density alone does not say **what shape** stands. Unresolved.*

### D8 · INDICATORS
**In:** local water depth, movement, stillness · **Out:** which living thing is present
- **Strictly a function of water state. Never of what the material says.**
- A heron where water is shallow. Reeds where it is shallow and still. Fish holding where there is movement.
- No indicator reacts to the player, addresses the player, or encodes any property of the person.

*Rests on: **d3** (the indicators) · **d5** (name the mapping before building) — **and d5 is the highest-risk unmarked decision in this spec.** An indicator keyed to anything but water state is a verdict wearing feathers.*

### D9 · EROSION
**In:** the weather cycle · **Out:** deposit removed, bedrock exposed, reliefs revealed
- Fog off the lake → rain → wash. **Internal, recirculating, NESI's jurisdiction.**
- Wash removes soft deposit. Hard bedrock stands clear: **that is how a Spire happens.** Nothing promotes a pattern onto one.
- What erosion uncovers is older and structural — the reliefs.
- **She can never make it rain on the catchment.** New material arrives only by writing.

*Rests on: **b1** (stacks are exposed bedrock) · **k5** (the open cycle).*

### D10 · CROSSING
**In:** a thing, the lock, the far side · **Out:** state = `across`
- Both gates never open at once.
- Nothing crosses by drifting.
- **The far gate opens only from the other side** — the receiver's mark, as a fact about the machinery rather than a rule.
- The chamber is a real state: in neither water.

*Rests on: **w3** (the Lock is the membrane).*

---

## §4 · THE BUILD LADDER

**Order is derived, not prioritised.** Builders agreement C3: upstream before downstream. You cannot build a lock for water that has not arrived.

| Stage | Builds | Depends on | Proves |
|---|---|---|---|
| **S0** | **THE HEADWATERS + THE DRAW** — a page, rising water, the float threshold | D6 | a person writes and something happens that needed no explaining |
| **S1** | **DEPOSIT** — sentences become particles, settle, verbatim | D5 | your words are in the world, unchanged |
| **S2** | **BEDROCK + GRAIN** — terrain from canon and lineage | D1, D2, D3 | the ground has a shape you did not author today |
| **S3** | **GRAVITY** — the four apex states as potentials | D4 | one tilt, four settlements, no re-authoring |
| **S4** | **FORM** — density thresholds | D7 | somewhere becomes somewhere |
| **S5** | **INDICATORS** | D8 | the place is alive and nothing addresses you |
| **S6** | **EROSION** — weather, stacks, reliefs | D9 | canon surfaces by outlasting, not by promotion |
| **S7** | **THE LOCK** — crossing | D10 | something leaves without debt |

~~**S0 is next and nothing is upstream of it.** Everything in `nesi/world3d/` today is S2 and below, built before S0 or S1 existed~~ — **corrected 2026-08-05, checked against disk.**

**S0 and S1 already existed when this was written.** They are THE BAR (`nesi/world/logbook.html`, built 2026-08-02): a line you write into, punctuation firing per-sentence deposit, a thought-merge that is yours to click, and a word gauge counting cumulative intake toward the lake step. This spec's author had not read `nesi/world/BAR_L1_REPORT_2026-08-02.md`. The rung was not missing — it was on a different localStorage key.

**Joined 2026-08-05 on Kevin's mark** (*"JOIN THE STORE"*): `nesi/THE_WORLD.html` now reads and writes `nesi_world_stones` — the Bar's key, which `stones.json` is cut from and `shore_stones.gd` reads on the Shore. One deposit path across all three surfaces; `nesi.world.draft` holds only the unsent pen, the way the Bar leaves an unfinished fragment in the bar. Verified over HTTP by running it, both directions.

The gate open since 08-02 is unchanged by any of this: *the world is built and unvisited.*

---

## §5 · RECONCILIATION — what exists, and where it lands

Read off `nesi/world3d/scripts/` this turn.

| Built | Status under this spec |
|---|---|
| `terrain.gd` | **DONE 2026-08-05** (Kevin's mark, *"WIRE THE BEDROCK"*). No longer a marks-count seed: loads `res://data/world_data.json` and builds the relief from D1 hardness at D2 lineage positions — 96 grounded, 76 flat, 344 declared edges, deterministic. `Terrain.SEED` (465, the MARKS_LOG line count) is retired for `Terrain.seed_value()`, the canon count. Relief is fitted to a 28 m walkable range; the *shape* is untouched. Test: `scenes/test_bedrock.tscn`, all assertions pass, and `test_counts` · `test_regions` · `test_field` · `test_tetra` · `test_shore_roundtrip` all still pass. |
| `regions.gd` + `terrain_layout.json` | **Corrected.** Already treats canon as terrain (the one build that anticipated the naming). Its edge set is *shared language*; §D2 requires *declared lineage*. |
| `shore_stones.gd` | **Kept, extended.** The round-trip is closed and is the working half of D5. |
| `weather.gd` + `test_weather.gd` | **Kept.** Becomes D9. Already exists and is nearer to spec than anything else. |
| `nesi.gd` | **Kept.** The vessel — an ORGAN, not a derivation. |
| `player.gd` | **Unnamed.** Control is settled; the thing controlled is not. Open. |
| `stores.gd`, `sites.gd`, `overlay_bridge.gd` | **Kept.** Infrastructure, no conflict. |
| `field.gd` + `test_field.gd` | **UNPLACED.** Stage 5 THE FIELD (VE, twelve mirrors, order-12 collapse) appears in no naming from 2026-08-04. Genuinely does not fit and should not be forced. |

### Three real conflicts — two RULED 2026-08-05, one open

**C-1 · `orchard.gd` / `orchard_data.gd` — patterns are trees. → RULED, and built.**
~~Two incompatible accounts of the same 176 objects.~~ Kevin's ruling, verbatim: *"THE ORCHARD IS THE EXPOSED-BEDROCK VIEW. The trees are the same masses seen from above; erosion exposes, the orchard renders. One account of one set of objects, two views."*

**Built the same turn.** `Terrain.mass_spot(slug)` is now the single authority for where a pattern is; `orchard.gd` asks it and stands the tree **on the mass it renders** instead of inventing a second position. Tree size follows the mass's relief — hardness, what has been built on top — not the file's mtime. **83 of 175 trees stand on their own mass. 92 do not, and the build says so out loud:** 79 are kinless (b4 — no declared kin, no position, nothing to stand on) and the rest sit inside a keep-out circle; those keep the region/name-hash placement, unchanged. Verified: `test_counts` · `test_regions` · `test_bedrock` · `test_shore_roundtrip` all pass, 0 trees moved on rebuild.

**C-2 · `buildings.gd` — the five buildings are placed. → RULED, closed.**
~~Under §D7 a place accretes from density and is never placed.~~ Kevin's ruling, verbatim: *"ORGANS ARE PLACED, DEPOSIT ACCRETES. The five buildings are organs, not deposit — §D7 governs what deposit makes and does not govern where an organ stands."* Written into §D7 above, with the line that keeps it from becoming a licence: nothing made of deposit may ever be placed.

**C-3 · the clock.**
Terrain derives from a marks count; §7e names a word count. On the record since 08-02, still unresolved, and now load-bearing because D6 is the first build stage.

---

## §6 · THE DEPENDENCY TABLE — what is provisional

**Every derivation rests on decisions Kevin has not marked.** This spec is a conditional structure, not an instruction.

| Section | Rests on | State |
|---|---|---|
| D1, D9 | **b1** canon is the bedrock | **MARKED — Kevin, 2026-08-05** |
| D1 | **b4** undeclared grain = flat ground | unmarked |
| D1 | **b6** hard/soft, never a number | unmarked |
| D2 | **b3** declared kinship, never computed similarity | **MARKED — Kevin, 2026-08-05** |
| D2, §5 | **b5** rebuild the layout from lineage | unmarked |
| D3, D7 | **d1** no texture layer | unmarked |
| D4 | **four directions of down** | **KEPT — Kevin's mark** |
| D4 | **f1** four gravities, not four algorithms | unmarked |
| D5 | **p1** the chain is four states | **MARKED — Kevin, 2026-08-05** |
| D6 | **k6** respond to volume, never content | **MARKED — Kevin, 2026-08-05** |
| D7 | **d2** density makes form | unmarked |
| D8 | **d3** the indicators | unmarked |
| D8 | **d5** name the mapping first | unmarked · **highest risk** |
| D9 | **k5** the open cycle | unmarked |
| D10 | **w3** the Lock is the membrane | unmarked |
| whole | **s1 / p0** which naming was approved | unmarked |
| build order | **p3** C3, build order follows the water | unmarked |

**UPDATED 2026-08-05 — five decisions in this table are marked, twelve are not.**

Kevin's mark, 2026-08-05: *"MARK THE FOUR THAT GATE: b1 (canon is the bedrock) · b3 (declared kinship, never computed similarity) · k6 (respond to volume, never content) · p1 (the chain is four states). The other twelve stay unmarked and downstream."* Caught in `MARKS_LOG.jsonl` before it was acted on.

**p1 did not arrive by preference.** Two derivations run in opposite directions on different days agreed: the container work produced six material states and flagged `sorted` and `dispositioned` as possibly not real (neither had a container on disk); the water naming produced four and had no room for exactly those two. The mark follows the evidence.

**What the four now make lawful, and what still is not.** S0–S2 rest on b1, b3, k6, p1 and may be built. **d5** (name the indicator mapping before building) remains unmarked and remains the highest risk in the spec — S5 is still closed. §9's falsifier stands unchanged for the other twelve: a build that proceeds on an unmarked dependency makes this section decoration.

*Original state, kept: one decision in this table was marked and sixteen were not. The spec was complete and standing on one leg.*

---

## §7 · THE COHESIVE WHOLE — one session, end to end

1. You arrive at a line. You write. **(S0)**
2. The water climbs. Nothing counts anything at you. **(D6)**
3. At the Draw you lift and the current takes you. **(S0)**
4. Your sentences are in the water, verbatim, settling. **(S1)**
5. They settle into a terrain made of your own canon, cut along the grain you declared. **(S2)**
6. Where enough gathers, something stands. **(S4)**
7. A heron is in the shallows. It does not know you are there. **(S5)**
8. You come about. Down changes. Everything finds a new level. **(S3)**
9. You sound. Most places have a floor. One does not. **(S1)**
10. Fog comes off the lake, rain washes a slope, and something older shows through. **(S6)**
11. You take one thing to the lock. The far gate opens from the other side, or it does not. **(S7)**
12. You tie off and leave. Nothing summarises it. Nothing asks you back.

**Nothing in that sequence was authored by anyone but you.**

---

## §8 · WHAT THIS SPEC DOES NOT COVER

- **The avatar.** What you are, in the water. `player.gd` exists; nothing names it.
- **What shape density makes.** D7 says structure stands; it does not say a village rather than a dune.
- **The passages.** Named in `THE_PASSAGES`; not specified here as mechanics.
- **The second person.** The Range needs two, the Lock needs a far side, the Given Stack is another catchment's rock. C10 of the agreement is open on the same gap.
- **Folding.** `patterns/_folded/` exists and folding is not erosion.
- **THE FIELD.** Built, unplaced, and not forced into a naming that has no room for it.

---

## §9 · FALSIFIERS

- **If anything appears in the world that does not derive from the four inputs**, the spine is broken and something authored Kevin's world.
- **If an indicator ever varies with what the material says** rather than with water state, D8 has become a verdict.
- **If arrangement is ever computed from similarity** rather than declared lineage, D2 failed and the oldest risk in the naming is back.
- **If the terrain is built before the page**, C3 was ceremony.
- **If this spec ships and a build proceeds on an unmarked dependency**, §6 was decoration.

---

*Written 2026-08-04. Nothing built, nothing marked, nothing standing. One mark accepts a section; any line amends in Kevin's own words and the rest stands.*
