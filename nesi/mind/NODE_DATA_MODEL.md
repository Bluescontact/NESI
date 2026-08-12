---
name: node-data-model
description: "The one-node data-model spec — the skeleton the render sits on. What a node knows, what an edge is, what tension means numerically, how a bucket holds nodes. Consolidates the model already built in nesi_bench_v0/ (graph.py · physics.config.json · regions.py) into one skeleton page, before any drag/rotate/render UI."
metadata:
  type: project
  status: SPEC — consolidation of the built v0 model, 2026-07-22, Kevin's GO on the heavy card. Faithful to code, not an invention. Open edges flagged in §OPEN.
---

# NESI — the node data-model (the skeleton)

*The engine you picture — the inverted tetra, NESI in the vortex, strings between
things, buckets you drop into — is a **rendering** of this. Everything visual is a
skin over three nouns: the NODE, the EDGE, the BUCKET, and one verb the physics runs:
TENSION. Fix these four and any surface (Miro, a web canvas, the .exe) can display the
same skeleton. This page is the plumb line; the render is checked against it, never the
other way round.*

**Provenance:** this is not new. The model is already built and in-browser-verified in
`nesi/nesi_bench_v0/` — `graph.py` (the edge query layer), `physics.config.json` (the
tunable scalars), `regions.py` (the buckets), `render.py` (the three edge mechanics,
Stage 2). This doc gathers the scattered truth into one readable skeleton so the next
render doesn't have to re-derive it from six files. Where the code and this page
disagree, the code wins and this page is wrong — say so.

---

## Spec form (construction-language Line 2 canon)

```text
ORGAN:      the node data-model — the substrate every surface renders
PROBLEM     the vision keeps getting specified as a render (tetra, vortex, drag,
            rotate) before the thing being rendered has a fixed shape. No skeleton →
            every surface invents its own node silently → they drift → nothing composes.
FORCES      pull toward the pretty surface (it's what excites) · pull toward Miro
            (already does 60%) · pull toward "just start dragging things" · against
            all three: a render with no data model underneath can't be trusted, saved,
            reasoned about, or ported.
FORM        three nouns + one verb (below). Boundary — takes in: an object with an id
            and content. Hands off: a positioned, tethered, bucketed node the render
            draws. Stops: it never decides truth, never ratifies a tie, never flips a
            state — those are Kevin's mark.
FALSIFIER   if a render ever stores node state the model doesn't name (a field invented
            in the surface, a tie the surface ratifies on its own), the model has become
            decoration and the surface has become the authority. Cut the surface's
            authority, not the model.
PLUMB       ARTIFACT_GRAMMAR.md (vocabulary law) · the membrane law (only Kevin's mark
            flips a link state) · regions.py functional keys · physics.config.json.
FALSE CAR   nesi_bench_v0 IS the false car — the model runs under temp power today,
            in-browser-verified through Stage 6. This doc is the rail it runs on, written
            down.
ENTRANCE    a plain node file / feed record — one object at a time. No node is reached
            through another node's door.
INTERLOCK   this model must NOT specify the render (layout, camera, the tetra, the
            vortex). Those are the cab, built last. It also must NOT add a state-flipping
            function — ratification stays a mark.
SIGN-OFF    Kevin's mark on this page as the skeleton the next render builds against.
```

---

## 1 · THE NODE — what one node knows about itself

A node (in the built code: a `BenchObject`) is the atom. It knows only these things.
Nothing else may be stored on it; anything a surface wants to add is either an EDGE, a
BUCKET membership, or it doesn't belong in the model.

| Field | Type | What it is | Source of truth |
|---|---|---|---|
| `id` | string, stable | the node's identity — never reused, never changes | the object, at intake |
| `content` | the exact authored text/material | shown **unconditionally and verbatim** — the one lawful ambient string | the author (you) |
| `region` | one of the 7 bucket keys | which bucket holds it right now (exactly one) | movement + your mark |
| `links` | list of edges declared *from* this node | its one-sided declaration of relation (see §2) | feed / proposal / your mark |
| `provenance` | append-only record | where it has been · when it crossed · what it returned from — past tense, object-centered, never "you" | written by movement, never edited |

**Derived, not stored — `mass`.** A node's mass is computed each tick, never saved:

```
mass = staging_base_mass                       (1.0)
     + w(state) summed over its ratified/proposed links   (ratified 0.4 · proposed 0.15)
     + char_count(content) × char_count_weight  (× 0.001)
     ×  landing_mass_multiplier if region == landing       (× 3.0)
```

Read plainly: **a node is as heavy as it is big and as anchored as it is tied.** A long,
well-ratified node in `landing` is heavy and barely moves — it has settled. A short,
untied node in `intake` is light and slides. Mass is the whole physical feel of the node,
and it falls out of content-size + tie-state + bucket. You never set it by hand.

**What a node does NOT know:** its own truth or worth (no score — ever), its screen
coordinates as canonical state (position is the render's, recomputed, never the model's
authority), or anything about *why* it's where it is beyond the flat provenance record.

---

## 2 · THE EDGE — the string between two nodes

An edge (a `tether` / `string` in the render, an `Edge` in `graph.py`) is a relation
between exactly two nodes. It is **its own object**, not a field buried in a node — a node
only *declares* it one-sidedly; the graph layer dedupes mutual declarations into one edge
so the same string is never drawn twice.

```
Edge = { a: node-id,  b: node-id,  type,  state }
```

### type — what kind of relation (structural)
| type | meaning | how it pulls (see §3) |
|---|---|---|
| `coherent-tension` | **the Strut** — "a strut the surface must never collapse." A load-bearing tie the structure needs held apart, not resolved together. | held at a fixed rest length, split both ends — never collapses to zero |
| `ratified` (a state, but drives the main pull) | a real, marked relation | damped spring, pulls the non-dragged end, scaled by both masses |
| `derived-from` | provenance relation — this came from that | carried; rendered on attention |
| `this-touches` | **filament** — the engine's soft "these might relate." Proposed-only, never load-bearing. | applies **no force at all** — visual-only |

### state — how committed the relation is (the membrane, encoded)
```
proposed  →  pending-ratification  →  ratified          (+ uncommitted)
```
- **`proposed`** — the engine suggested it. Reads as *not-yet-fact*, never a weak version of a real pull. Applies zero force; only shows a `.stretched` visual cue if it's pulled past `tether_max_stretch`.
- **`pending-ratification`** — declared, awaiting your mark. *(Physics: OPEN — see §OPEN.)*
- **`ratified`** — you marked it. Now it pulls.

**THE LAW, built into the data model:** there is deliberately **no function anywhere that
flips a link's state.** `graph.py` reads states; it cannot change one. Ratifying a proposal
into a taut tie is **Kevin's mark**, full stop. This is the membrane, living inside the
schema — the engine can *propose* an edge, it can never *ratify* one. Any render that adds a
"confirm this tie" button that writes ratified state has broken the model, not extended it.

---

## 3 · TENSION — what it means numerically

Tension is the one verb. It is a per-frame force computed on edges, and it runs **three
distinct mechanics by edge kind** — this is the heart of the feel, and it's already built
and verified in `render.py`'s physics tick:

**a. Ratified edge → damped spring on the secondary node.**
```
F = tether_spring_stiffness × (distance − rest)      (stiffness 120.0)
    − tether_damping × relative_velocity              (damping 8.0)
scaled by both endpoints' mass;  applied only to the NON-dragged end.
```
The node you're holding never gets overridden — *the hand always wins* (`if dragging: return`).
The other end drifts toward its rest under a spring. This is how a marked relation tugs its
neighbor when you move things.

**b. Coherent-tension (the Strut) → held rest length, split both ends.**
On the first tick the edge records its current length as the rest length, then each frame
corrects **both** ends toward it, evenly. The Strut is *held apart, not resolved* — it
cannot be collapsed to zero (guardrail #34). This is the numerical form of a tension the
structure needs to keep: two nodes the model refuses to let merge.

**c. Proposed edge → no force, ever.**
It applies zero pull to either end. Its only response to distance is visual: past
`tether_max_stretch` (240) it gains a `.stretched` class. A proposal is a question, not a
force.

**The tunable scalars** (in `physics.config.json` — *defaults, not marks; calibrate
on-screen without a rebuild*): spring stiffness 120, damping 8, max stretch 240; break
region static threshold 6.0 / viscous coeff 0.85; gate shear threshold 48; landing mass
×3; intake friction 0.02 / inertia 0. These are dials, not law — the law is the three
mechanics above.

---

## 4 · THE BUCKET — how a region holds nodes

A bucket (a `region`) is a named container. A node lives in **exactly one** at a time. A
bucket is not just a box on screen — it carries its own **physics feel**, so *where* a node
sits changes *how it behaves*. Buckets are the flow the whole grain runs along.

**On-grain flow** (the main line, in order): `intake → staging → break → gate → landing`
**Off-grain** (below the flow, not a sixth column): `held-bay` · `compost`

| Bucket | What it holds | Its physics feel |
|---|---|---|
| `intake` | just-arrived, unsorted | zero coast on release · friction 0.02 · slides and stops dead |
| `staging` | in play, being worked | full mass/spring behavior — the working floor |
| `break` | where ties are tested | static-breakaway then velocity-cap — a tie can *snap* here |
| `gate` | the crossing seam | a shear threshold (48) — the membrane crossing, geometric |
| `landing` | settled, marked, done | mass ×3 — heavy, barely moves, *has come to rest* |
| `held-bay` | marked for later (the ◆ hold) | off to the side, out of the flow, not composted |
| `compost` | set aside, released | off-grain — present but no longer in play |

**The law here:** functional keys are the **only** thing code references. The *display name*
is a separate, swappable, unmarked layer that defaults to the functional key — so the
surface never hardens a felt-name you haven't marked. `intake` shows as "intake" until and
unless you mark a truer word for it. Region on release is recomputed from the node's
centroid; an ambiguous drop (outside every bucket) leaves the node's region **unchanged**
rather than guessing.

---

## The whole skeleton in one breath

> A **node** is an id + its exact content, living in exactly one **bucket**, tied to other
> nodes by **edges** it declares but cannot ratify. Its **mass** is how big and how anchored
> it is. **Tension** pulls ratified ties like springs, holds struts apart forever, and lets
> proposals float weightless until you mark them. The engine may propose; only your mark
> ratifies; the render only draws. Fix this, and the tetra, the vortex, the drag-and-rotate
> are all just ways of looking at it.

---

## §OPEN — carried honestly, not folded into "done"

- **`pending-ratification` physics is unspecified.** The state key exists (`regions.py`,
  `strings/registry.py`); no tick mechanic is defined for it. Does a pending edge pull at
  all — a fractional spring between proposed's zero and ratified's full? Or is it purely a
  waiting-room state with proposed's zero-force until your mark? A design fork, unmarked.
- **`uncommitted` link state** appears in the string registry but not in `regions.py`'s
  `LINK_STATE_KEYS`. Reconcile: is it a fourth state or a display synonym?
- **Node identity across edits.** `id` is stable, but when content is edited heavily, is it
  the same node with new content, or a new node `derived-from` the old? The `derived-from`
  type exists to answer this — but the rule for *when* an edit forks a node isn't written.
- **Multi-membership.** The model says exactly-one-bucket. The `held-bay` (◆ hold) is off to
  the side — but can a node be *both* in the staging flow *and* held? Today: no. Confirm
  that's intended, or specify the exception.
- **Mass and the felt-read.** Mass is derived from size + tie-state + bucket. It deliberately
  carries **no** signal about your body-read of a node — and it must stay that way (the model
  never scores). Flagged so no future tick sneaks a felt-weight into the physics.

*Falsifier for this whole page: if it produces specification without construction — if it
becomes a document that grows while the bench doesn't — it's a monument. Cut it, keep the code.*
