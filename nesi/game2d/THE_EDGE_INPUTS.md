# THE EDGE INPUT TABLE — every level's geometric inputs, derived not designed

**Generated 2026-08-22 by `tools/edge_input_table.js` — do not hand-edit; re-run the generator if `solid.js` ever changes.**

Kevin's own framing, 2026-08-21: *"Each layer of complexity is already determined by the relationship and position... we need to understand what the inputs are, and how they affect downstream participation."* This is that list. Nothing here proposes a mechanic, a difficulty, or a text beat — it is only what the solid itself already knows about each edge before anyone designs anything for it.

**What each column actually is, not a guess:**
- **kind** — fall/rise/turn/return, computed from whether each endpoint seat is on the falling or rising half (`solid.js` `MEMBERS`).
- **circuit** — which one of the solid's four closed six-edge walks this edge sits on. Every edge sits on exactly one (a clean 4×6 partition, already verified elsewhere in this corpus).
- **half** — tutorial (the 12 fall+turn edges, "water's twelve") or platform (the 12 rise+return edges, unlocked once the workbench opens).
- **seat A / seat B** — whether each endpoint itself is a falling or rising seat (`SEATS[s].fall`).
- **triangle / square it borders** — the one triangle and one square face every edge touches (`facesAlong`), and which tetra (A/B) the triangle belongs to, and which of the three hinge axes the square sits on. Every edge borders exactly one of each.

| edge | kind | circuit | half | seat A | seat B | triangle it borders | square it borders |
|---|---|---|---|---|---|---|---|
| CAST—DAM | return | 0 | platform (rise/return) | rising | falling | DAM/CAST/SEATING · tetra A | y+ (TANK/DAM/GROUND/CAST) |
| CAST—OVERWINTERING | rise | 0 | platform (rise/return) | rising | rising | TANK/OVERWINTERING/CAST · tetra B | z- (OVERWINTERING/CAST/GARDEN/SEATING) |
| DAM—STATIONS | fall | 0 | tutorial (water) | falling | falling | DAM/STATIONS/GROUND · tetra B | x- (DAM/STATIONS/LENS/SEATING) |
| DEEP—HELIOSTAT | turn | 0 | tutorial (water) | falling | rising | FILTER/DEEP/HELIOSTAT · tetra B | y- (DEEP/HELIOSTAT/LENS/GARDEN) |
| DEEP—STATIONS | fall | 0 | tutorial (water) | falling | falling | STATIONS/DEEP/LENS · tetra A | z+ (FILTER/STATIONS/GROUND/DEEP) |
| HELIOSTAT—OVERWINTERING | rise | 0 | platform (rise/return) | rising | rising | HELIOSTAT/OVERWINTERING/GARDEN · tetra A | x+ (TANK/FILTER/HELIOSTAT/OVERWINTERING) |
| DAM—GROUND | fall | 1 | tutorial (water) | falling | falling | DAM/STATIONS/GROUND · tetra B | y+ (TANK/DAM/GROUND/CAST) |
| DAM—SEATING | return | 1 | platform (rise/return) | rising | falling | DAM/CAST/SEATING · tetra A | x- (DAM/STATIONS/LENS/SEATING) |
| FILTER—GROUND | fall | 1 | tutorial (water) | falling | falling | TANK/FILTER/GROUND · tetra A | z+ (FILTER/STATIONS/GROUND/DEEP) |
| FILTER—HELIOSTAT | turn | 1 | tutorial (water) | falling | rising | FILTER/DEEP/HELIOSTAT · tetra B | x+ (TANK/FILTER/HELIOSTAT/OVERWINTERING) |
| GARDEN—HELIOSTAT | rise | 1 | platform (rise/return) | rising | rising | HELIOSTAT/OVERWINTERING/GARDEN · tetra A | y- (DEEP/HELIOSTAT/LENS/GARDEN) |
| GARDEN—SEATING | rise | 1 | platform (rise/return) | rising | rising | LENS/GARDEN/SEATING · tetra B | z- (OVERWINTERING/CAST/GARDEN/SEATING) |
| GARDEN—LENS | rise | 2 | platform (rise/return) | rising | rising | LENS/GARDEN/SEATING · tetra B | y- (DEEP/HELIOSTAT/LENS/GARDEN) |
| GARDEN—OVERWINTERING | rise | 2 | platform (rise/return) | rising | rising | HELIOSTAT/OVERWINTERING/GARDEN · tetra A | z- (OVERWINTERING/CAST/GARDEN/SEATING) |
| GROUND—STATIONS | fall | 2 | tutorial (water) | falling | falling | DAM/STATIONS/GROUND · tetra B | z+ (FILTER/STATIONS/GROUND/DEEP) |
| GROUND—TANK | fall | 2 | tutorial (water) | falling | falling | TANK/FILTER/GROUND · tetra A | y+ (TANK/DAM/GROUND/CAST) |
| LENS—STATIONS | turn | 2 | tutorial (water) | falling | rising | STATIONS/DEEP/LENS · tetra A | x- (DAM/STATIONS/LENS/SEATING) |
| OVERWINTERING—TANK | return | 2 | platform (rise/return) | rising | falling | TANK/OVERWINTERING/CAST · tetra B | x+ (TANK/FILTER/HELIOSTAT/OVERWINTERING) |
| CAST—SEATING | rise | 3 | platform (rise/return) | rising | rising | DAM/CAST/SEATING · tetra A | z- (OVERWINTERING/CAST/GARDEN/SEATING) |
| CAST—TANK | turn | 3 | tutorial (water) | falling | rising | TANK/OVERWINTERING/CAST · tetra B | y+ (TANK/DAM/GROUND/CAST) |
| DEEP—FILTER | fall | 3 | tutorial (water) | falling | falling | FILTER/DEEP/HELIOSTAT · tetra B | z+ (FILTER/STATIONS/GROUND/DEEP) |
| DEEP—LENS | return | 3 | platform (rise/return) | rising | falling | STATIONS/DEEP/LENS · tetra A | y- (DEEP/HELIOSTAT/LENS/GARDEN) |
| FILTER—TANK | fall | 3 | tutorial (water) | falling | falling | TANK/FILTER/GROUND · tetra A | x+ (TANK/FILTER/HELIOSTAT/OVERWINTERING) |
| LENS—SEATING | rise | 3 | platform (rise/return) | rising | rising | LENS/GARDEN/SEATING · tetra B | x- (DAM/STATIONS/LENS/SEATING) |

---

*Regenerate: `node tools/edge_input_table.js --write` from `nesi/game2d/`.*
