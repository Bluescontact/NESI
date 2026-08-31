# DRAFT — lens-panel findings on the VE24 build, preflight layer

Built 2026-08-27, on Kevin's ask: run the standing lens panel (`lens-panel`
skill — buckminster-fuller, stuart-cowan, change-composite, game-craft,
nesi) over the finished VE24 build for one cycle, then produce a manifest
from what emerged, in the same shape as `DRAFT_VE24_2026-08-27_preflight_manifest.md`.

**This document is planning only. Nothing below is authorized until Kevin
marks it — per law 30, handed over unranked and whole, all five items, not
a curated subset.** Per the lens-panel skill's own discipline, the five
readings themselves were never averaged or resolved into a verdict; this
manifest does not resolve them either — it only gives each finding a
common shape (scope/spec/verification/preflight) so a mark, if one comes,
has something concrete to land on.

**Source note:** every item below is sourced to a specific lens's own
return from this session's lens-panel pass, 2026-08-27, run over
`nesi/mind/VE24_RELATIONSHIPS_2026-08-27.html`, `VE24_TRAVERSAL_2026-08-27.html`,
and a sample of the 24 numbered edge files. Where a lens verified something
by direct tool use (a grep, a coordinate check) that is named as such; where
a lens is naming an open question rather than a checked fact, that is named
too.

---

## Item 1: nav strip on the 24 edge files (game-craft)

### SCOPE

`game-craft`'s pass confirmed by direct grep (`grep href="VE24"` across
`nesi/mind/`) that zero `<a href="VE24...">` links exist anywhere among the
24 edge files — cross-references between edges are prose citations only,
filenames spelled out as plain text, never clickable. `VE24_TRAVERSAL_2026-08-27.html`
already built a real hub-and-graph (click a vertex, four edges light,
click an edge, jump to a relationship card with a `→ walk to edge N`
button) — but the 24 rooms it opens have no way back to it, and no way to
each other. Quoted from the finding: "24 dead-end rooms with one door
each... the one hub that turns them into a real graph only opens them in
new tabs going one direction — hub to room, never room to room, never room
back to hub."

**Boundaries:** does not touch the traversal graph's own edge-list or the
relationships file's content — purely a navigation addition to the 24
existing files.

### SPEC

Add a small nav strip to the `aside` sidebar of each of the 24 edge files:
two links, "← back to the traversal map" (`VE24_TRAVERSAL_2026-08-27.html`)
and "← back to the relationships map" (`VE24_RELATIONSHIPS_2026-08-27.html`).
No new content, no new finding — wiring only, using the same shell/tab
mechanics already common to all 24 files (confirmed byte-identical `:root`
CSS variables across the files opened this pass).

### VERIFICATION

1. Re-run the `href="VE24"` grep after the change — should now return 24+
   hits where it returned zero. 2. Spot-check 3-4 edge files across all
   three domain groups (RULE/READ/BUILD) to confirm the strip renders
   identically. 3. Confirm the traversal and relationships files' own
   internal links are untouched.

### PREFLIGHT MANIFEST

Must touch: all 24 `VE24_0*`/`VE24_1*`/`VE24_2*` files in `nesi/mind/`.
Read first: `VE24_TRAVERSAL_2026-08-27.html`'s and
`VE24_RELATIONSHIPS_2026-08-27.html`'s own header/nav markup, to match
the strip's visual register rather than invent a new one. Open question:
none — game-craft's own framing calls this "the cheapest possible fix...
costs nothing conceptually." Risk/cost: low. **NOT AUTHORIZED — awaiting
Kevin's mark.**

---

## Item 2: a stale-count re-checker (Cowan)

### SCOPE

`stuart-cowan`'s pass named a recurring defect, independently discovered
four separate times: a documented count (of laws, skills, instruments,
directories, tools/ files) accurate when written, with nothing mechanically
re-checking it as the corpus grows. Named at VE24 edges 2, 6, and 21
(per the relationships file's own "Newly Resolved" tab), and a fourth time
inside the swarm pass's own output — a "35 of 56 tools/ files" figure later
corrected to 52, caught and fixed on the same page it appeared. Cowan's own
framing: "this is the corpus's version of a delay that isn't rendered as a
gap — the count looks current and isn't, and only a fresh re-read reveals
the drift." The Gap Routing Table in `VE24_RELATIONSHIPS_2026-08-27.html`
already tags this class of gap `NO ROUTE — requires new construction` —
named, not yet built.

**Boundaries:** this item is the general-purpose checker Cowan named, not
a one-off correction to any single stale count found so far (see item 4,
gift card 12's citation defect, which is a specific instance, not the
class).

### SPEC

A small script (root `tools/` or `nesi/game2d/tools/`, matching the
corpus's existing checker pattern — `session_bridge_check.js` is the
nearest live precedent: report-only, refuses nothing) that walks the
corpus's own documented-count claims (e.g. "N laws" in `LEARNED.md`, "N
skills" in `.claude/skills/`, "N instruments" in `check_all.js`, "N
directories" in library-census documents) and diffs each against a live
recount, flagging drift without correcting it silently.

### VERIFICATION

1. Confirm the four named instances (edges 2, 6, 21, and the swarm-pass
   count) all get caught by a first run. 2. Confirm the checker is
   report-only per the corpus's own established discipline for this kind
   of instrument (no silent auto-fix). 3. Run it against `CLAUDE.md`'s own
   "twelve instruments" claim, already flagged elsewhere in the VE24
   material as possibly stale against `check_all.js`'s actual count.

### PREFLIGHT MANIFEST

Must read: `session_bridge_check.js` in full (the closest existing
precedent for shape and tone), `check_all.js`, `LEARNED.md`'s header count,
`.claude/skills/` directory listing. Open question: which documents count
as authoritative sources to check against — this wasn't scoped by Cowan's
reading, only the defect class was named. Risk/cost: low-medium (new
instrument, report-only, no write access needed). **NOT AUTHORIZED —
awaiting Kevin's mark.**

---

## Item 3: gift card 12's citation defect (Cowan)

### SCOPE

Named directly by Cowan's reading, sourced to
`VE24_RELATIONSHIPS_2026-08-27.html`'s own text: a line-range citation on
gift card 12 spans two regions of the same source file more than 2,000
lines apart, for four of five named functions. The relationships document
states plainly it "does not edit the card itself" — the defect is named,
not corrected, in the material this panel read.

**Boundaries:** a single, specific citation fix — not the general checker
in item 2, though the two are related in kind.

### SPEC

Re-verify gift card 12's five function citations against the actual source
file directly (not against the VE24 material's own summary of them), and
correct the line-range where it's wrong.

### VERIFICATION

1. Open the actual gift card 12 file and its cited source file side by
   side. 2. Confirm all five function citations, not just the four already
   flagged. 3. Confirm the correction doesn't touch the card's substantive
   claim, only the citation.

### PREFLIGHT MANIFEST

Must read: gift card 12 (path not confirmed this pass — needs locating via
`nesi/game2d/inbox/INDEX.md`), its cited source file in full. Open
question: none named by Cowan beyond the fix itself. Risk/cost: low.
**NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Item 4: does the VE's own topology decide relevance, not just order? (Fuller)

### SCOPE

`buckminster-fuller`'s pass verified the 24-edge geometry directly
(coordinate check against a real cuboctahedron, not the prose claim) and
confirmed it holds exactly — no vertex touches another in its own group,
every vertex touches exactly two vertices in each other group. But the
same-group exclusion rule, which correctly orders the 24 real edges, was
also used to decide **which relationships get a file at all** — 18
same-group pairs (six per RULE/READ/BUILD group) were never built, purely
by construction. The sharpest instance named: Laws↔Protocols (both RULE)
has no edge file, yet `LEARNED.md:3` states "Read at boot, beside
`PROTOCOLS.md`" — the tightest coupling in the corpus, given no dedicated
file, because the geometry forecloses same-group edges regardless of what
the corpus's own history says about the pair.

Fuller's own framing, held open rather than resolved: this is "the
difference between the vector equilibrium as a *reading device* (walk it,
let it order what's already found) and the vector equilibrium as a *sieve
deciding what may be found in the first place*." He names the traversal
tool as already using it correctly (as reading device, for edges that
exist) and the original 66→24 build decision as having used it as sieve.

**Boundaries:** this is a fork, not a finding with one correct resolution —
Fuller explicitly declines to rule on it ("not mine to rule... held open,
not defaulted").

### SPEC

Not a build spec — an open question for Kevin to resolve before any of the
18 same-group pairs get treated as settled-absent. Two branches, both
already partly sketched by Fuller's own reading:

- **Branch A (small lever):** extend `VE24_TRAVERSAL_2026-08-27.html`'s
  `jumpToEdge` citation grid to also carry same-group pairs the corpus's
  own text already names as real (e.g. `LEARNED.md:3`'s "beside
  PROTOCOLS.md") — one array entry per pair the corpus already asserts,
  not a new batch of full edge-files.
- **Branch B (larger, not proposed by Fuller, named here only as the
  logical alternative):** treat the 18 same-group pairs as a genuinely
  open 25th-through-Nth batch, following the same
  scope/spec/verification/preflight discipline as the original 24 — this
  would need its own preflight pass, not a quick addition.

### VERIFICATION

1. Confirm which same-group pairs the corpus's own text already asserts as
   real relationships (Laws↔Protocols is the one instance verified this
   pass; others unconfirmed). 2. If Branch A is chosen, confirm the
   `jumpToEdge` grid's existing format can carry a same-group citation
   without implying it's a 25th true VE edge (a labeling question, not
   just a data one).

### PREFLIGHT MANIFEST

Must read: `LEARNED.md` in full for any other "beside"/"adjacent"/"paired
with" language between same-group domains, `VE24_TRAVERSAL_2026-08-27.html`'s
`jumpToEdge` implementation in full. **Open question for Kevin — this is
the load-bearing one:** is the same-group exclusion a geometry rule that
should keep deciding what gets built, or a reading-order convenience that
should stop deciding it? Fuller's reading does not answer this. Risk/cost:
low for Branch A, medium-high for Branch B (reopens the whole 66-pair
question the original build closed). **NOT AUTHORIZED — awaiting Kevin's
mark, and awaiting Kevin's own answer to the open question before either
branch is scoped further.**

---

## Item 5: the traversal file's edge-list is a hand-transcribed copy (game-craft, cross-confirmed by Cowan)

### SCOPE

`game-craft`'s pass found, and named directly: `VE24_TRAVERSAL_2026-08-27.html`'s
`RELATIONS` array is a hand-transcribed copy of
`VE24_RELATIONSHIPS_2026-08-27.html`'s own table — the code comment says so
directly ("transcribed from VE24_RELATIONSHIPS_2026-08-27.html's own
table"). If the relationships file gains a new row later, the traversal
graph's walk-jumps go stale silently, with no mechanism to catch it — the
same "documented count/fact goes stale, nothing re-checks it" shape named
independently by Cowan's reading (item 2). game-craft's own framing: "the
one file that turns this batch into a walkable space is itself sitting on
the corpus's own most-repeated defect."

**Boundaries:** a specific instance of item 2's general class, on the one
file where staleness would be most consequential (it drives the walkable
hub, not just a static reference table).

### SPEC

Either (a) fold this specific file-pair into item 2's general checker once
built, as its first/highest-priority target, or (b) if item 2 isn't
authorized, address it standalone: have `VE24_TRAVERSAL_2026-08-27.html`
read its edge-relationship data from `VE24_RELATIONSHIPS_2026-08-27.html`
directly (or a shared data file) rather than carrying a separate
hand-copied array.

### VERIFICATION

1. Confirm the two arrays currently match, item for item, as a baseline.
2. If (b) is chosen, confirm the traversal graph's rendering and
   `jumpToEdge` behavior are unchanged after the data source switches.

### PREFLIGHT MANIFEST

Must read: `VE24_TRAVERSAL_2026-08-27.html`'s `RELATIONS` array and
`VE24_RELATIONSHIPS_2026-08-27.html`'s relationship table, side by side, in
full. Open question: is this worth a standalone fix now, or should it wait
for item 2 (the general checker) to exist and just be pointed at this pair
first? Risk/cost: low. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

*All five items above are planning material only. Every one ends "NOT
AUTHORIZED." Item 4 additionally carries an open question with no
resolution proposed by the lens that surfaced it — Kevin's answer there
gates whether it becomes a build item at all. This document is unranked
and whole per law 30 — nothing above has been curated down to a
recommended subset, and the five items are not in priority order.*
