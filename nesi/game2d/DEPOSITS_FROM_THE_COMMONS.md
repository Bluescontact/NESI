# DEPOSITS FROM THE COMMONS

**The geometric skeleton, populated with tiles from open source projects.**
Swept 2026-08-16 on Kevin's ask: *"Site open source tools into tiles that could
be routed into the geometry. We are building deposits from the commons."*

Nothing here is installed, vendored, wired, or ranked. Each tile names a seat it
could sit at. **Routing is the hand's** — a tile with no mark is a tile in the
soil, and blank is a complete state.

**Confidence is marked per tile, not implied.** `seen` = I read evidence this
session. `named` = the project exists and is described by its own source.
`field` = a known area with implementations, no single project picked.

---

# 0 · THE SOLID — the form itself

| tile | carries | conf |
|---|---|---|
| **Quadray coordinates** (Kirby Urner, `grunch.net/synergetics`) | a **4-basis tetrahedral coordinate system** instead of Cartesian xyz. The geometry is already tetrahedral; the arithmetic still isn't. | named |
| **A.R.T. Explorer** (`arossti.github.io/ARTexplorer`) | Synergetics + rational trigonometry — quadrance and spread, **no sin/cos/tan anywhere**. Fuller's own maths, running in a browser. | named |
| **polyhedronisme** (`levskaya/polyhedronisme`) | Conway polyhedron operators on an HTML5 canvas. Seed + operators → any of a family. | named |

**THE JITTERBUG — refused, and the refusal is the tile.** The VE→icosa→octa→tetra
transformation is one rotation parameter and roughly twenty lines. Every library
that offers it costs more than the twenty lines. *This is one of the few places
where the wheel is smaller than the cart.* Build it.

**Standing fact from the build:** `solid.js` already derives the cuboctahedron
and two independent sessions generated the identical 24 edges. **The solid does
not need a tributary.** These three sit at the *unfolds*, not at the shape.

---

# 1 · FALLING — water

## ↓TANK · the writing arrives

| tile | carries | conf |
|---|---|---|
| **Intl.Segmenter** | sentence boundaries from the runtime. Fixes `e.g.` and `Yes... it is.`; still splits `Dr.` Zero dependency. | **seen** — run this session, card at `inbox/trib_2026-08-16_01` |
| **Automerge 3.0** | document-level CRDT, Rust core, ~10× memory cut, large docs practical in-browser | named |
| **Yjs** | text-CRDT, the production default; bindings for ProseMirror, CodeMirror, TipTap | named |
| **Loro** | 1.0, rich-text + **movable-tree** CRDTs — the tree case the other two leave open | named |
| **Volon · mu-txt** | plain-text/markdown local-first editors; mu-txt on json-joy Peritext | named |

> **Collision, named:** all three CRDTs **own the data.** The build's `save()` is
> pad → read back → commit on plain JSON, and `store_guard` fingerprints his
> writing before and after. A CRDT would take that store. They earn their weight
> only when there is a second writer, and there is not one yet.

## ↓DAM · hold, or release

| tile | carries | conf |
|---|---|---|
| **gl-water2d** (`Erkaman`) | 2D liquid by smoothed-particle hydrodynamics, WebGL | named |
| **Jos Stam stable fluids** — `sopyb/fluidsimulation` (canvas), `kishimisu/WebGPU-Fluid-Simulation` (compute shaders) | the canonical real-time solver, two eras of it | named |
| **shallow-water equations** | the velocity-field model the erosion sims run on — the honest one for a dam, because it has a free surface and a head | field |

## ↓FILTER · the hand separates the fractions

**The commons offers almost nothing here, and that is the correct result.**
Every mature "filter" in the field is a classifier, and law 5 says the
operator's hand runs the filter — no computed pass, nothing deciding what a
fraction is. What is portable here is **drag/drop and direct-manipulation
grammar**, not sorting logic.

> The seat with the least available capacity is the seat whose law forbids the
> capacity. Worth noticing rather than filling.

## ↓STATIONS · three outputs at every station

| tile | carries | conf |
|---|---|---|
| **Valueflows** | a vocabulary of **resources · events · agents** — describes where a thing went without reading what it is. A routing grammar that is content-blind by construction. | named |
| **hREA** | Valueflows reference implementation, GraphQL libraries | named |

> **Fit note:** Valueflows is the rare commons artifact that is a *vocabulary,
> not a service* — adopting it reaches outward zero times. It is the closest
> thing in the field to law-compatible routing.

## ↓GROUND · deposit, and the land as the save file

| tile | carries | conf |
|---|---|---|
| **Webgl-Erosion** (`LanLou123`) | velocity-field advection + sediment transport in the browser | named |
| **Interactive-Erosion-Simulator-on-GPU** (`huw-man`) | real-time hydraulic erosion, GPU | named |
| **hydraulic-erosion** (`tessapower`) | Three.js/WebGL/TS; built specifically to **compare erosion algorithms** side by side | named |

> This is the best-supplied seat in the whole skeleton. *The land is the save
> file* is a solved problem three times over, and the live build has no terrain
> at all — grep for `erosion`, `erode`, `silt` returns zero.

## ↓DEEP · what you let go, out of sight

| tile | carries | conf |
|---|---|---|
| **Hypercore** | secure distributed **append-only log** | named |
| **git** | content-addressed object store, already on the machine, already versioning this repo | **seen** |
| **bakup** | git-inspired offline-first backup, SHA-256 content-addressed dedupe across repos (2026 research) | named |

> **Shape match worth naming:** an append-only log that is written and never
> read back is exactly law 9 — *the deep never renders.* The data structure and
> the law are the same object.

---

# 2 · RISING — light

## ↑LENS · focusing

| tile | carries | conf |
|---|---|---|
| **Red Blob Games — 2D Visibility** | the additive algorithm; rays only where walls begin and end. Article + code, public. | named |
| **THREE.js-RayTracing-Renderer** (`erichlof`) | real refraction and **shadow caustics** at 60fps | named |

## ↑HELIOSTAT · a mirror you aim by hand

| tile | carries | conf |
|---|---|---|
| **Sight & Light** (`ncase.me/sight-and-light`) | the canonical 2D visibility/shadow explainer with working code — rays to segment ends plus two offset rays | named |
| **Coding Train — Ray Casting 2D** | p5.js implementation, line-segment surfaces, a light source casting shadows on canvas | named |

> *Aiming past an obstacle into a dark pool* is a visibility-polygon problem,
> and it is one of the most thoroughly solved problems in 2D game code.

## ↑SEATING · the hand seats a mirror

Thin, and lawfully so — same shape as ↓FILTER. The act is a hand-act; what the
commons has is interaction grammar, not seating logic.

## ↑OVERWINTERING · the creature works while you are away

**No tile.** The commons has no "works while away" library because it is not a
capacity — it is a design decision plus a deterministic function of elapsed
time. What is portable is **seeded deterministic PRNG** so the same absence
always produces the same shoreline.

> Law 8's one designed exception is also the one seat the field cannot supply.

## ↑GARDEN · where light and water meet, things grow

| tile | carries | conf |
|---|---|---|
| **morphogenesis-resources** (`jasonwebb`) | the curated index for creating form with code — articles, repos, books. **The library arm already exists for this seat.** | named |
| **reaction-diffusion-playground** (`jasonwebb`) | Gray-Scott on data textures, custom shaders per pixel, interactive | named |
| **Algorithmic Botany / Runions** | leaf venation and tree-structure growth — space colonization | named |
| **awesome-creative-coding** (`terkelg`) | the wider index | named |

## ↑CAST · the fruit leaves

| tile | carries | conf |
|---|---|---|
| **Murmurations** | publish once about yourself; others aggregate into feeds, maps, directories. **A schema, if taken as a format; a service, if taken as an index.** | named |
| **Valueflows** | describes what departed, in a vocabulary others already read | named |
| **ActivityPub · AT Protocol** | federation proper | named |

> **Collision, named:** taking Murmurations as a *format* costs nothing and
> reaches outward zero times. Taking it as an *index* is law 11. The same
> project sits on both sides of the line depending on which half you take.

---

# 3 · THE THREE ARMS

| arm | what the commons already holds | note |
|---|---|---|
| **personal writing development** | Logseq (markdown on your own disk), the plain-text PKB field, the local-first stack | the most crowded field of the three |
| **commons extraction and development** | **the P2P Foundation wiki** — 20 years, hand cross-linked, with maintained index pages for Timebanking Software and Complementary Currency Software | the library arm is *already built*, by the author of the essay |
| **gift library** | Credit Commons (~20K users, GPL, `cc-node`/`cc-lib`/`cc-server`/`cc-client`) · Community Exchange System · Requests-and-Offers (v0.5.2, **alpha**) · Murmurations | ledger and directory are running; the **matching layer is alpha and simplifying, not richening** |

---

# 4 · WHAT THE SWEEP FOUND ABOUT THE SKELETON

**Three seats are oversupplied.** ↓GROUND, ↑GARDEN and ↑LENS/↑HELIOSTAT have
multiple mature implementations each, and the live build has no terrain, no
growth and no optics. The capacity is sitting there.

**Two seats are empty because their own law empties them.** ↓FILTER and
↑SEATING are hand-acts; every candidate the field offers is a classifier, which
is the one thing law 5 refuses. *A seat with no tributary is not always a gap.*

**One seat has no tile and needs none.** ↑OVERWINTERING is a decision plus a
clock.

**And the solid needs nothing.** It is derived, twice-confirmed, and the
jitterbug is twenty lines.

> So the shortage in this build was never invention. Of twelve seats, three are
> oversupplied by the commons, two are lawfully empty, one is a decision, and
> the rest want a vocabulary rather than an engine.
