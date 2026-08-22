# THE THREE DYNAMICS — water, light, roots/wires, and the bottom-half reveal

**Started 2026-08-20**, on Kevin's own framing: *"I'm trying to break down the
geometry and process of seeing and working with gifts as something a person
can image. We have three dynamics... light, water, and roots/wires... I can
imagine borrowing elements from node and routing games... I can see the light
acting as input, general diffuse lighting, targeted light, and the same thing
for moon light with different reveals... lets work on the foundational
mechanics of each level, and thinking about how we move from the first 4
levels to the 12th level where the completion reveals the bottom half of the
cuboctahedron as the heliostat to place the upper half."*

This is a proposal document — a session's read, not a ruling. Everything
below is marked as either **built** (real, live, checked), **proposed**
(mine, offered for you to cut), or **(his)** (a naming or a choice only you
make). Nothing here is adopted by being written down.

---

## 1 · WATER — mostly built, what's left is depth, not invention

**Built:** the sort. A hand picks one of four fractions per level —
`dissolved` (out of sight, no fall), `suspended` (hangs, never reaches
floor), `bedload` (sinks past the floor, the deep never renders it),
`contaminant` (films at the surface, stays). Each already *behaves*
differently, which is the imageable part — the fraction isn't a label, it's
where the water visibly goes.

**■ Built, 2026-08-21 — the circuit-gift.** `seam.js`'s `completedCircuits
(walkedKeys)` checks, live off `solid.js`'s own `CIRCUITS`/`MEMBERS`, whether
all six edges of a circuit have been walked — the exact check this section
named as missing. Wired into `ascent.html`'s `walkPendingSeam()`: a circuit
newly complete this walk calls `emit()`, the gift-shop mechanic `THE_GIFT.md`
already built (dedupes against what's already been given, holds on the
shelf until a hand takes it) — a new trigger for that mechanic, not a second
one. Verified against real geometry: fires at 6/6, not 5/6, no cross-circuit
leakage, and the four circuits partition all 24 edges with no overlap.
Water keeps its four physical fractions throughout, untouched — the gift is
additional, per the ruling, never a transformation of the sort.

**Proposed, for "more content per level":** let the fraction picked at each
level accumulate into the *terrain* the way `world.html`'s silt/erosion
already works (persistent, visible, never a number) — a level's own floor
visibly deepens or clears depending on which fraction has passed through it
most, across every visit. Water becomes something you can *see* the history
of, not just something you pick once and move past. Small build, reuses an
existing pattern rather than inventing one.

---

## 2 · LIGHT — four modes named, three built

You named four: **input, general diffuse, targeted, and moonlight with its
own reveals.** Mapped against `KNOWLEDGE_light_in_games.md`'s own framework
(three models — ray/field/budget — "pick one per layer, or run two at
different zoom levels"), these aren't four unrelated ideas, they're two real
models doing four jobs:

| your term | model | what's built today |
|---|---|---|
| **targeted** | ray — an aimed beam, one window, discrete | **built** — the aim mechanic (`seam.js`), plus window charge (accumulates per window across levels) |
| **input** | the hand's own act of aiming | **built** — same mechanic; "input" is what the player does, "targeted" is what it produces |
| **general diffuse** | field — a scalar, no aim, ambient | **built, 2026-08-21** — `seam.js`'s `seatAmbient(seat, states)` |
| **moonlight** | field, second source, different reveal | **not built** |

**■ Built, 2026-08-21 — general diffuse.** `seatAmbient(seat, states)`
(`seam.js`): an always-on value per seat (not per window), driven by *how
much of the solid around it has rooted* — averages `rootStanding()` across
every water edge touching that seat that has already returned. Not aimed,
not chosen, just present, the way Minecraft's light level drives growth
without anyone placing a torch. Wired two places: (1) `fractionControl`'s own
UI carries a soft, ungated wash scaled by it — present regardless of which
specific seam a hand is working; (2) `ascent.html`'s wireframe map itself —
a walked member's own line now brightens toward full as its root deepens,
rather than snapping to full the instant it's merely walked, so the map's
own reveal is exactly "the solid becoming visible... because enough of it
has been lived in," not a flash. Read, never measured (no number shown),
per the corpus's own no-scoring law. Moonlight (a second, independent
diffuse field) remains unbuilt, as does the day/night split it would need.

**Proposed — moonlight:** a second, independent diffuse field, present when
the day-field isn't (ties directly to `OVERWINTERING`'s already-built
day-gate — root growth already only advances once per calendar day; a
night/day split is nearly free to add on top of a clock that already
exists). What it reveals should be genuinely different content, not the same
thing dimmer — my read: daylight reveals **growth and structure** (root
depth, terrain), moonlight reveals **recognition and the deep** (what the
sounding mechanic returns, what's settled and waiting) — day shows you what
you built, night shows you what the world is giving back. That pairing is a
proposal, not a derivation; it's **(his)** to confirm or replace.

**What I'd hold off building:** the roots/wires proposal below changes what
"targeted" light is *for* (see §4) — worth deciding that before diffuse/moon
get built, so light's four modes don't get built twice.

---

## 3 · ROOTS/WIRES — junction and the trace are built; what travels the wire is not

**Built (already):** `rooted` (0→1, asymptotic, day-gated) exists per level,
shown as a border/shadow depth — a number nobody sees, expressed as a
feeling.

**■ Built, 2026-08-21 — the junction and the trace.** `seam.js` now gives the
solid's real nodes and edges an interactive layer, no invented geometry:

- `junctionSeams(seat, states)` / `isJunction(seat, states)` — once *two or
  more* of a seat's own water edges have already returned, the seat is a
  junction, a real node with more than one wire arriving. Exactly what this
  section proposed: not a new mechanic, what happens when two already-built
  facts (`isReturned`, `waterSeamsFor`) co-occur.
- `migrateWires` / `routeWire(state, seamId)` — once a seam's seat is a
  junction, `fractionControl` offers a hand a button per *other* returned
  seam sharing it: "trace toward `<seat>`." Picking one appends to
  `state.routedTo` (a set, same append-only law as `fractionsSeen`/
  `windowsSeen` — a trace is never replaced by tracing a different wire).
  Additive throughout: it never touches the fraction/aim choice already
  above it, and offering no wire when the seat isn't yet a junction changes
  nothing else.
- Shown on the map too: `ascent.html`'s wireframe draws a junction seat's
  point larger than an ordinary touched seat.

**■ Built, 2026-08-21 — the gift travels.** `circuitWiring(ci, states)`
collects every edge traced anywhere along a completing circuit's own six
seams (deduped — a circuit can hold more than one junction); `emit()` now
takes that route and stamps it onto the gift as `routedVia`. The gift still
lands on the shelf, the only place a file has ever left this world — nothing
about *where* a gift is taken changes — but a routed gift now carries a real
record of the wire it travelled, and `shelf()` shows it: a thin outer ring,
the same "more than the plain case" language the junction's own larger map
point already uses. No count, no names on the shelf — a gift either
travelled a wire or it didn't. Verified: dedupes correctly across two seams
tracing overlapping and distinct ids; empty when nothing was ever traced.

---

## 4 · LEVEL 1 → LEVEL 12 — the bottom half as heliostat

Computed fresh from `solid.js`, not assumed. **"Water's twelve"** (already
named and scoped 2026-08-19) is exactly the 8 `fall` + 4 `turn` edges:

```
DAM–STATIONS   DEEP–STATIONS   DEEP–HELIOSTAT   DAM–GROUND
FILTER–GROUND  FILTER–HELIOSTAT  GROUND–TANK   GROUND–STATIONS
LENS–STATIONS  DEEP–FILTER     FILTER–TANK      CAST–TANK
```

**The number that makes your framing exactly right, geometrically:** these
twelve levels touch **5 of the solid's 6 windows** — every window except
`z-`. And `z-` is the **top square**: OVERWINTERING · CAST · GARDEN ·
SEATING — the antipode of the bottom square (`z+`: FILTER · STATIONS ·
GROUND · DEEP, your Day One) that levels 1–4 already open.

Read against `THE_GROWTH.md`'s own computed fact — *"bracing the squares one
at a time takes the mechanism count 6→5→4→3→2→1→0, exactly one per
window... the tools are free and only the windows cost"* — and against F6's
still-open mark (*"cap at five — one window stays unsited so the fold
survives"*): **finishing the twelve levels of the bottom half is, by the
geometry alone, the act of spending five of the solid's six fold-mechanisms
— leaving exactly one, `z-`, still mobile.** That's not a coincidence built
in; it falls straight out of which windows the bottom-half edges happen to
touch, the same way the antipodal pairs and circuit signature fell out
uncomputed in `THE_24.md`.

**What this means for the reveal:** the completed bottom isn't just
*finished* at level 12 — structurally, it's a solid with five of six hinges
already glued shut. The one hinge left, `z-`, is the top square itself. A
jitterbug fold through that single remaining hinge is exactly what
*"the bottom half acting as the heliostat to place the upper half"* would
look like mechanically: the bottom, now rigid everywhere else, becomes the
fixed mirror-frame; the one remaining fold is the motion that brings the top
square — and the six rising seats on it — into place. `HELIOSTAT` itself
sits on two of the five already-spent windows (`x+`, `y-`), which is
probably not incidental either, given it's the seat `THE_24.md` already
calls "the turn... the bottom is the source."

**This resolves F6's open reasoning gap, and should be logged as such if you
confirm it:** F6 was flagged earlier this session as resting on wrong
reasoning (the six mechanisms fold independently, so the *first* window
sited ends a coordinated fold, not the sixth). What actually holds the fold
open through all twelve bottom levels isn't "cap at five" as a rule — it's
that the bottom-twelve's own edges simply never touch `z-`. The cap falls
out of the geometry Kevin already built the level order on; it doesn't need
to be separately enforced as a rule at all.

**What's still (his):** whether the reveal *is* this jitterbow fold made
visible and playable (my read of your framing), or a separate cutscene-style
beat layered on top of a fold that happens underneath it unplayed. The
geometry supports either; only one of them gives the player something to
*do* at level 12, which is presumably the point of naming it a stage rather
than a cutscene.

---

## 5 · ECOLOGICAL SUCCESSION AND BIODIVERSITY — not a fourth dynamic, a reading of the other three

Kevin's addition, mid-pass: *"and the 4th of ecological succession, and
biodiversity as a side effect of balancing the three cycles in a level."*
**Side effect** is the load-bearing word — this isn't a fourth thing the hand
directly operates, the way water/light/roots each have their own act. It's
what the other three look like *together*, over time, which is exactly how
succession and biodiversity work ecologically: nobody inputs "diversity"
directly into a real ecosystem either — it falls out of how varied the
inputs are.

**Succession is already half-built, under a different name.** `rooted`
(0→1, asymptotic, day-gated) already *is* a succession curve — bare ground
to climax is precisely the shape `world.html`'s own shoot mechanic already
proved twice (per its own build mark, "proven twice, not first-time
invention"). **Proposed:** read `rootStanding()`'s existing 0.16–1.0 range as
named seral stages instead of a bare depth cue — bare/pioneer near the
floor, establishing through the middle, climax near 1 — same number, same
law (no number shown), just given ecological shape rather than only a
border-width. No new mechanic, a reinterpretation of one already built.

**■ Built (already, same 08-20 pass this document was written in — this
section was stale) — memory of variety.** `state.fractionsSeen` and
`state.windowsSeen` exist in `seam.js` (`migrateDiversity`, `seeFraction`,
`seeWindow`, `diversityStanding`): small sets, append-only, the same shape as
`seamsTaken`. Never a number shown; `ascent.html`'s seam strip already blends
the world's own named materials into a soft gradient once `diversityStanding`
rises above 0. A level fed the same fraction and window every visit reads as
a monoculture, real and unpunished; a level fed variety reads richer.
Migrated cleanly, old states seeded with exactly their one existing pick, no
data invented.

**The tension this creates is real and worth naming, not hiding:** the
fastest path to a heavily-charged window (§4's heliostat reveal) is
repeating the same aim every visit — pure efficiency. The richest, most
biodiverse level comes from varying both fraction and aim — pure variety.
Nothing in the law forces a choice between them, but the two goals now
genuinely pull in different directions, which is the kind of real trade-off
a hand can feel without ever being shown a number for it.

---

## WHAT THIS PASS DID NOT DO

**■ Updated 2026-08-21** — this section described the 08-20 design-only pass;
a build followed the same day the pacing fork was answered ("all three...
need to have working systems that function as a dependency for how and what
the user shapes in each level"). What that build actually did: shipped
general diffuse light (§2) and the junction/trace layer of roots/wires (§3)
in `seam.js`, wired into both `fractionControl` and the wireframe map;
confirmed §5's biodiversity memory was already built (this document had
gone stale on that point, corrected above). Verified: `check_all.js` still
23/24 (unchanged, no regression), plus a standalone node check of
`seatAmbient`/`isJunction`/`routeWire` against real `solid.js` adjacency.

Still open, unchanged from the 08-20 pass:
- No text beats written — `LEVEL_LIBRARY.md`'s `(his)` fields are still
  open.
- §4's "playable fold" vs. "triggered reveal" for the level-12 heliostat
  reveal — yours to choose.
- §3's "what travels the wire" — **built.** Trace, cargo, and the routing
  between them all exist now.
- Moonlight (§2) — still unbuilt, no day/night split exists yet to hang it
  on.
