---
name: tetra-position-board
description: "The position-board spec — SELF · OTHER · WORLD · TIME read as a tetra, riding on the existing node/edge/bucket skeleton (NODE_DATA_MODEL.md) instead of inventing a parallel system. Six edges as regions, holder derived from edge (never stored), faces as filtered views, volume as maneuver room, and the vector-equilibrium <-> tetra pulse gated to Kevin's mark only, the same shape as link-state ratification."
metadata:
  type: project
  status: SIGNED — Kevin's mark 2026-07-30 22:22 ("Sign off the tetra position-board spec — render work may be written against it"), caught in MARKS_LOG.jsonl. Render work may now be written against this spec. Open edges in §OPEN stay open — signing opens the gate, it does not resolve them.
---

# NESI — the tetra position-board (SPEC)

*Where the standing-position organ cell got read positionally instead of organically:
the same four-pole tetra (SELF · OTHER · WORLD · TIME), but the poles now answer
"where do things stand" instead of "which organ is this." This page specifies the
board as a use of the node/edge/bucket skeleton already fixed in
`NODE_DATA_MODEL.md` — not a second model living beside it.*

**Provenance:** developed in conversation 2026-07-27 from the organ-cell tetra
(SELF/OTHER/WORLD/TIME poles already in use for the organ system). Three open
questions from that pass are now marked: TIME stays a separate pole (not folded into
WORLD); `holder` is derived from edge-position, never stored; the
vector-equilibrium↔tetra pulse is Kevin-initiated only. Marks caught in `MARKS_LOG.jsonl`
at 16:25, 16:35, and 17:20 on 2026-07-27.

---

## Spec form (construction-language Line 2 canon)

```text
ORGAN:      the tetra position-board — a positional reading of the node/edge skeleton
PROBLEM     "where do things stand" keeps getting re-derived in Kevin's head every
            session — asks outstanding, ground under him, clocks running, what a
            counterparty can actually do. No shared board → he re-builds the read
            from scratch each time, and a stale board that just sits open becomes a
            surveillance risk (a waiting room, not a live read).
FORCES      pull toward a brand-new schema built just for this (it's a fresh idea,
            feels like it needs its own home) · pull toward folding TIME into WORLD
            as "just another condition" (fewer poles, less to hold) · against both:
            a second skeleton drifts from the first the way the model's own
            falsifier warns against, and TIME was already marked separate.
FORM        four fixed poles, six edges as regions, holder derived from edge, one
            board-state flip gated to Kevin only (below). Boundary — takes in: an
            object with an id and content, same as any node. Hands off: a node
            placed on exactly one of the six pole-pair edges. Stops: it never scores
            a pole, never decides which edge an object belongs on without Kevin's
            placement, never flips board-state on its own.
FALSIFIER   if this board ever needs a field the node model doesn't already have
            (id, content, region, links, provenance) it has stopped being a reading
            of the skeleton and started being an invented parallel system — cut the
            addition, not the skeleton.
PLUMB       NODE_DATA_MODEL.md (the skeleton this rides) · the membrane law (only
            Kevin's mark flips a state) · MARKS_LOG.jsonl (the three marks this
            page consolidates) · feedback_derive_dont_store_count (why holder is
            computed, not stored).
FALSE CAR   none yet — this is a first-draft spec, not a running render. The organ
            cell's tetra rendering (geometric_bench) is the nearest built thing;
            this page does not touch that code.
ENTRANCE    a plain object Kevin names as standing on the board — an ask, a piece of
            ground, a clock, a counterparty's move. One at a time, same as any node.
INTERLOCK   this spec must NOT invent a second node/edge/bucket model — it maps onto
            the existing three nouns. It must NOT add a function that flips
            board-state without a Kevin-sourced call.
SIGN-OFF    Kevin's mark on this page before any render/UI code is written against it.
```

---

## 1 · THE FOUR POLES — fixed, not nodes

Unlike a node, a pole is not content Kevin adds — it is one of exactly four fixed
positions, always present, never entering or leaving:

| Pole | Reads as |
|---|---|
| `self` | your hand, capacity, what you've placed |
| `other` | counterparties — who holds a move |
| `world` | material ground, resources, conditions |
| `time` | clocks, latency, tempo — **kept separate from `world`, marked 2026-07-27** |

A pole holds no content of its own. It is only ever an endpoint of an edge.

---

## 2 · THE SIX EDGES — the regions a node lives in

This is the one real addition to the skeleton: a new **region set**, sitting beside
`REGION_KEYS` in `regions.py`, not replacing it. The existing law — a node lives in
**exactly one** region at a time — holds unchanged.

```
POSITION_EDGE_KEYS = (
    "self_other", "self_world", "self_time",
    "other_world", "other_time", "world_time",
)
```

| Edge (region key) | Reads as |
|---|---|
| `self_other` | what stands between you and a counterparty — asks made, gifts landed, moves owed |
| `self_world` | what ground you're on — bus, host, tools, money |
| `self_time` | what's running against you — compounding credit, attention windows |
| `other_world` | their capacity, which is not their obligation |
| `other_time` | their clock — when a move expires or attention closes |
| `world_time` | the field moving regardless of anyone — investigations, mergers, rulemaking |

A node placed on a position-edge uses the same schema as a node in any other
region: it has mass, it can carry links to other nodes, its provenance records
where it's been. Nothing about the node's *fields* changes. But the mass formula
in `NODE_DATA_MODEL.md` §1 gives specific buckets a specific physics feel —
`landing` gets a ×3 mass multiplier, `intake` gets low friction — and **no such
tuning exists yet for the six position-edges**. Until it's marked, a node on
`self_other` gets only the base formula (content-size + tie-weight), with no
bucket-specific feel of its own. Flagged in §OPEN — not silently assumed to
inherit a feel it was never given.

---

## 3 · HOLDER — derived from the edge, never stored

**The mark (2026-07-27, 16:35):** *holder is derived from which edge an object sits
on, never a stored field on the held-record.*

Each position-edge key names the two poles it connects. `holder` is not a field
read off the node — it is computed on demand from a fixed lookup:

```
EDGE_TO_POLES = {
    "self_other":  ("self", "other"),
    "self_world":  ("self", "world"),
    "self_time":   ("self", "time"),
    "other_world": ("other", "world"),
    "other_time":  ("other", "time"),
    "world_time":  ("world", "time"),
}

def holders(node) -> tuple[str, str]:
    return EDGE_TO_POLES[node.region]
```

There is no second writer to drift out of sync with the edge — the edge *is* the
authority, the same move as [[feedback_derive_dont_store_count]] applied here. If a
node ever needs a holder that isn't one of the two poles its edge already names,
that is a falsifier on this section (see §OPEN) — not a reason to add a field.

---

## 4 · THE FOUR FACES — filtered views, not stored boards

Dropping one pole yields a three-pole sub-board — three poles, three of the six
edges. This is a **read**, computed by filtering the six position-edges to the
three that don't touch the dropped pole. Nothing is stored per face; a face is a
query, the same way `edges_touching()` in `graph.py` is a query, not a stored list.

| Drop | Sub-board (`self·other·world`, etc.) | Reads as |
|---|---|---|
| `time` | self · other · world | **the standing** — where things sit, no clocks running |
| `world` | self · other · time | **the exchange** — whose move, how long outstanding |
| `other` | self · world · time | **the ground** — what's under you regardless of anyone |
| `self` | other · world · time | **the field** — the world moving without your hand in it |

```
def face(dropped_pole: str) -> list[str]:
    return [k for k, (a, b) in EDGE_TO_POLES.items()
            if dropped_pole not in (a, b)]
```

---

## 5 · SLACK MEMBERS — the empty edges, read directly

An edge with no node placed on it is not absent from the board — it is a **slack
member**, the tensegrity reading Kevin named directly: a member carrying no
tension goes slack, and the structure loses definition on that arc. This requires
no new schema. It is the existing law read plainly: **all six position-edges
always exist**; an edge with zero nodes in its region is slack, and slack is
visible by checking node-count per region, the same query already used to render
any bucket.

```
def slack_edges(nodes) -> list[str]:
    occupied = {n.region for n in nodes if n.region in POSITION_EDGE_KEYS}
    return [k for k in POSITION_EDGE_KEYS if k not in occupied]
```

---

## 6 · VOLUME — maneuver room (bottleneck, marked 2026-07-27)

Volume was named as "the space of moves available" — a cell can be structurally
intact and still near-zero volume, which is what crisis looks like. No formula
was marked for it. Rather than leave that as a bare "unspecified," it's worth
testing what kind of formula the crisis-intuition actually demands — because two
candidate shapes exist, and they disagree on a real case:

**Candidate A — aggregate (sum/average load across all six edges).**
**Candidate B — bottleneck (volume = the single most-loaded edge's remaining headroom; a MIN, not a sum).**

Three worked cases:

| Case | Board state | Aggregate says | Bottleneck says |
|---|---|---|---|
| quiet interval | all six edges light or slack | high volume | high volume |
| evenly loaded | all six edges moderately loaded, none critical | moderate volume | moderate volume |
| **one edge crushed, rest fine** — e.g. `self_time` at real capacity limit (exhaustion), the other five light | **moderate-high** (five light edges pull the average up) | **near-zero** (the one maxed edge gates everything) |

The first two cases don't discriminate — both formulas agree. The third case is
where they split, and it's the case that actually matters: **one severely loaded
pole-edge, everything else fine.** Aggregate says you still have room. Bottleneck
says you don't.

**Cross-checked against how Kevin's own framework already reads this exact
shape:** the elevator rhyme in `feedback_somatic_threshold.md` — *"an elevator
rises only when every safety in the chain is satisfied"* — is a chain, not an
average. One unsatisfied link stops the whole car regardless of how safe every
other link is. That's bottleneck logic, not aggregate, and it's not new here —
it's the same logic already governing when Kevin's body lets anything move.

**The mark (2026-07-27, 18:11):** *volume is a bottleneck derivation — the
single most-loaded edge's headroom, a MIN across the six position-edges, not a
sum/average.* Settled.

```
def volume(edges_headroom: dict) -> float:
    """edges_headroom maps each position-edge key to its remaining headroom
    before break (however that headroom gets computed — tied to the existing
    break/stretch thresholds in physics.config.json, not reinvented here).
    Volume is the tightest constraint, not the average of all six."""
    return min(edges_headroom.values())
```

The exact headroom-per-edge calculation (how "remaining room before break" is
read off an edge's current tension) is not specified here — that's downstream
of the physics-tuning gap already flagged below. What's settled is the shape:
**MIN, not sum.**

---

## 7 · THE PULSE — board-state, gated to Kevin only

**The mark (2026-07-27, 17:20):** *the pulse (vector-equilibrium ↔ tetra collapse)
is Kevin-initiated only — a slack member can be flagged but never grips on its own.*

This generalizes the model's existing law — *"there is deliberately no function
anywhere that flips a link's state"* — to one more state, board-wide rather than
per-edge:

```
board_state: "settled"   # vector equilibrium — no edge dominates, no position precipitated
           | "gripped"   # tetra — collapsed to a position, Kevin's hand on it
```

**THE LAW, same shape as link-state ratification:** there is no function anywhere
that flips `board_state` from `settled` to `gripped`. The system may compute and
surface that an edge has gone slack, or that several edges are unusually loaded —
that is a read, same as any floor-indicator. It may never use that read to trigger
the grip itself. Only a Kevin-sourced call (the same channel as `tools/marks.py
catch --source kevin`) may flip `board_state`. A render that adds a "collapse the
board" button firing on its own logic has broken this model, not extended it —
the same sentence NODE_DATA_MODEL.md already uses for a render that ratifies a
link on its own.

---

## The whole board in one breath

> Four **poles** never move. Six **edges** between them are **regions**, exactly
> like any bucket — a node lives in one, its `holder` derived from the edge, never
> stored. Drop a pole, get a **face** — a filtered read, not a new board. An edge
> with nothing on it is **slack**, visible by node-count, not a missing schema.
> **Volume** is the tightest edge's headroom — a MIN, not a sum — the same chain
> logic already governing when Kevin's own body lets a move happen.
> The board itself has one more state than any single edge: **settled** or
> **gripped**, and only Kevin's hand flips it, the same law that already keeps
> the model from ratifying its own edges.

---

## §OPEN — carried honestly, not folded into "done"

- **Volume's shape is marked (MIN, not sum) — the per-edge headroom calc is
  not.** `volume = min(headroom across the six edges)` is settled (2026-07-27).
  What headroom means numerically for a given edge — how tension-to-break gets
  read off it — is still open, and tied to the physics-tuning gap above (no
  stiffness/friction/break-threshold has been marked per position-edge yet).
- **The six position-edges have no physics tuning.** Unlike `landing` (×3 mass)
  or `intake` (low friction), no bucket-specific feel has been marked for
  `self_other`, `self_time`, etc. A node there gets base mass only until Kevin
  marks what each edge should feel like — same discipline as leaving volume
  unspecified rather than guessing.
- **`other_world`, `other_time`, `world_time` don't touch `self`.** The holder
  lookup still returns a clean pole-pair for these, but it's untested whether an
  object genuinely "belongs" to two non-self poles the same way a `self_*` object
  belongs to you-and-a-counterparty. Flagged, not resolved.
- **No render exists yet.** This page specifies data and law only, per
  NODE_DATA_MODEL.md's own interlock ("this model must NOT specify the render").
  The tetra/VE visual is a future card, gated on its own pre-flight manifest.
- **Cross-board node membership — speculative, not evidenced.** Nothing so far
  suggests the same node ever needs to live in both the organ-cell's bucket-flow
  and this position-board; they read as two separate node populations (workflow
  objects vs. standing-position objects). Naming this as an open architectural
  conflict earlier overstated it — it's parked here only in case it turns out to
  matter, not treated as a live tension needing a resolution.

*Falsifier for this whole page: if it produces specification without construction —
if it becomes a document that grows while nothing gets built against it — it's a
monument. Cut it, keep whatever code eventually runs.*
