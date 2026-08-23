---
name: layout-options
description: Move a visual/design question forward across any of Kevin's three physical or spatial objects — the website (outsharedgifts.org), the 2D game (nesi/game2d), the bus conversion — by turning fuzzy relationships between things into a small set of concrete, rendered layout options he can choose between. Use when Kevin says he doesn't have a layout yet, doesn't know how to articulate how the pieces relate, or wants mockups/options for a page, a chamber, a room, or a physical space. Not a design decision tool — it renders forks, it never closes them.
---

# Layout options

The gap this fills: Kevin can usually name the objects in a space and roughly
how they should relate to each other, before he can picture an actual
arrangement. "I don't have a layout yet" and "I don't know how to articulate
the relationships between objects" are the same problem stated twice — the
objects and their relationships exist in his head; the concrete geometry that
would let him look at it and react does not yet exist anywhere.

This skill takes what Kevin already knows about
a space — the objects, the fuzzy relationships, the real constraints — and
turns it into two or three genuinely different rendered arrangements so the
choice becomes something he can look at rather than something he has to
imagine from scratch. **The rendering tools already exist** (the `design`
skill's canvas, `mcp__visualize`'s mockup/diagram modules, `artifact-design` /
`artifact-diagramming` for a published page). This skill is the step before
those: it is what decides *what* to render and *why more than one version*,
so the rendering step isn't guessing at a single answer either.

## The one move that makes this cross-domain

A bus galley next to the bed, a game chamber next to the hub, and a donate
page next to the story page are the same shape of problem: **objects, the
relationships between them, and which of those relationships are fixed versus
open.** Read whichever object Kevin hands over — a room, a page, a level — in
that shape, not in the vocabulary of its own domain. The chassis width and
the site's existing nav bar and a level's spawn point are all the same kind of
fact: something already fixed that any option has to resolve around.

## The procedure

### 1. Name the objects and the relationship, in his words

Write down the objects and how Kevin describes their relationship to each
other — quote him rather than translate him into design vocabulary early.
"The kitchen should feel close to where people sit" stays that sentence; it
does not become "adjacency requirement: galley-lounge" until a render actually
needs it stated that way.

### 2. Ask only what's actually missing

A short, targeted set of questions — not a form, not all of them every time:

- **Fixed vs. open.** What is physically or structurally locked (chassis
  dimensions, an existing page's URL and its inbound links, a level's spawn
  point and its already-built neighbors) versus what is still free to move?
- **Adjacency and flow.** What has to be near what? What has to never be
  adjacent? What moves through this space, how often, and in what order?
- **Scale and context.** Who or what actually uses this — one person or many,
  a first-time visitor or a returning one, a hand steering an RV around a
  corner or a mouse click — and at what size does the arrangement actually
  get used (a phone screen, a room a body walks through, a chamber viewed at
  one zoom level)?

Stop asking once the answers would change which options get rendered, not
before. A question that wouldn't change the render is decoration.

### 3. Name the shape before choosing how to render it

Every set of relationships has a topology, and the topology decides which
visual language is honest for it — not the other way around. This is a
check, not a rendering step: run it, answer it in writing, and only then move
to step 4. Skipping straight to a tile row is what happened the first time
this skill ran on the bus — it rendered front-to-rear boxes without asking
whether the bus's relationships were actually a straight line.

Sourced whole from `counsel/reference/2d_3d_game_mechanics_catalog.md:26-40`
— *"nearly every non-open world is one of five shapes, and choosing
consciously is the first design act."* Written for game chambers, but the
five shapes are general topology, not game vocabulary — read them against
whatever object is in front of you:

- **Chain** — one fixed order everything passes through; a later piece can
  assume everything earlier already happened, and nothing skips ahead.
  (Gravity Wells' three fields; a bus's single aisle.)
- **Hub** — one central place every other piece connects back to, where
  returning to it should read as an accumulation of everything that happened
  at the spokes. (A valley floor with spires around it; a site's home page.)
- **Spire** — elevation or depth itself carries meaning: "higher" or "lower"
  is doing real representational work (aspiration vs. consequence, public vs.
  private, upstream vs. downstream), not just marking floor-plan position.
- **Loop** — the same places get revisited on a cycle, and what changes each
  pass is state, not geometry. (A day-night circuit; a recurring billing
  page.)
- **Gate-graph** — some connections are conditional, opening only once
  something else is true. (A locked door; a form step that only reveals once
  the step before it validates.)

Answer all five, in writing, for the actual object. Most real objects are a
composite, not a single shape — the catalog's own example is NESI itself: *"a
spire whose floors are a gate-graph, standing over a hub."* The finding is
usually which shape dominates and which is layered under it, not one label.

**A tiled row of boxes is a chain rendering.** It's honest for a single
aisle or a fixed sequence. It misrepresents a hub (nothing in a row shows one
place accumulating what happened at the others) and it flattens a spire
(front-to-rear says nothing about what's stacked above what — the bus
draft's own open question about headroom for a shower stall was a spire
question a plan-view row can't answer). Match the rendering language in step
4 to what these five questions actually found, not to whichever tool is
already open.

### 4. Render two or three genuinely different options

Two separate choices happen here, and they don't collapse into one: **what
layout language step 3 earns**, and **what tool step 3 has nothing to say
about.** Decide the first from the shape; decide the second from how durable
the deliverable needs to be.

**The layout language — set by the shape from step 3, not by habit:**

- **Chain → a sequential row.** Boxes in fixed order, one direction (this is
  the tiled front-to-rear row already built for the bus draft — correct
  there because the aisle answered "chain"). Order in the row must match the
  order things actually happen in; a chain rendered out of sequence is a
  wrong diagram, not a stylistic choice.
- **Hub → a spoke diagram.** One central box, the spoke pieces arranged
  around it with a line back to the center from each — never a row. The
  point of the shape is that the center accumulates the spokes, so the
  center has to visually *be* the center, not just the first box in a line.
- **Spire → a vertical stack.** Boxes stacked top-to-bottom in actual
  elevation order, with what "up" and "down" mean stated once at the top of
  the diagram (aspiration/consequence, public/private, whatever the real
  object's meaning is) — a spire rendered as a horizontal row throws away
  the one fact that made it a spire.
- **Loop → a ring or a labeled cycle.** Boxes arranged in a closed circuit
  with arrows showing the direction of travel and what state changes each
  pass, not a line with a start and an end.
- **Gate-graph → a node-link graph with conditional edges marked.** Boxes
  connected by lines, and every conditional connection labeled with its
  condition on the edge itself (a dashed line plus a short label — "opens
  once tank is full" — never an icon standing in for the condition).
- **Composite shapes → composite renders.** A spire-over-a-hub (NESI's own
  case) is a vertical stack where one level is itself drawn as a spoke
  diagram, not a compromise between the two forms. Render the dominant shape
  first, then the layered one nested inside it at the level it actually
  occupies — don't average two shapes into a third that is neither.

**The tool — set by how durable the deliverable needs to be, independent of
the shape above:**
- **`mcp__visualize` (`mockup` or `diagram` module)** for a fast, inline,
  throwaway comparison — best when the point is to look at two or three
  arrangements side by side and react. Handles all five layout languages
  above as SVG: rows, spoke diagrams, vertical stacks, rings, and node-link
  graphs are all boxes, lines, and arrows.
- **The `design` skill** when Kevin will want to keep tweaking one by hand
  afterward — it publishes an editable multi-artboard canvas.
- **`artifact-design`/`artifact-diagramming`** when the deliverable is a
  page or diagram meant to stand on its own afterward, not just a comparison.

Each option should resolve the *same* named relationships and constraints
differently — that's what makes them comparable instead of arbitrary. Every
option in the set uses the *same* layout language (they're answering the same
step-3 shape); what differs between options is the assignment of pieces
within that shape, never the shape itself — three options in three different
layout languages aren't comparable, they're three different diagrams.

### 5. Name what each option actually costs, in one line each

Not a recommendation — a trade-off. "Bed-forward keeps the galley near the
door but puts the loudest cooking noise next to where you sleep" is the
whole job of this step. State what a stranger would notice, not what Kevin
should prefer.

### 6. Stop there

The choice is his want-check, not a step in this procedure. This skill's job
ends at a small set of concrete, comparable options with their real
trade-offs named — never at a ranking, a favorite, or a "I'd go with option
2." If none of the rendered options actually work, say that plainly and ask
what relationship was wrong, rather than quietly rendering a fourth option to
patch it — that's a new round of step 1, not a continuation of step 4.

## What this is not

- **Not a mockup renderer on its own.** It hands off to `design` or
  `mcp__visualize` for the actual pixels; it does the naming and framing that
  makes those tools render the right *number* and *shape* of things instead
  of one guess.
- **Not a decision-maker.** It never says which option is better, never
  defaults to the first one listed, and never narrows three options to one
  without Kevin naming which.
- **Not domain-specific.** It carries no assumption that a "layout" means a
  floor plan, a wireframe, or a level chamber — it reads whatever object
  Kevin hands it in the objects-relationships-constraints shape above.
