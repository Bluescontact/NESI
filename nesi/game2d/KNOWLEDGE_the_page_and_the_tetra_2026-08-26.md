# KNOWLEDGE — the page, and the tetra of six relationships

**Companion to `index.html`.** Written 2026-08-26, same day as the reclaim.
This is the reference doc for what the page is, why it exists, what's been
built around it, and what's still genuinely open. Read this before extending
any of it — including if you're a different model being asked to dream
alongside it (see `PROMPT_FOR_OTHER_MODELS_2026-08-26.md` in this same
folder).

---

## 1 · What the page is

`index.html` (source: `the_page.html`, kept as a redirect) is NESI's entry
point as of today. It replaced a twelve-seat door built on real geometry
(`solid.js`) — kept whole, not deleted, at
`index.html.backup_pre-lattice-entry_2026-08-26.html`.

The reason for the change, Kevin's own words, from the file that started it
(`lattice.html`'s header, one day earlier): *"menus and tabs and functions
that route nowhere... I have no reason to write anything anywhere."* The old
door was correct on its own terms and still a door with a bench of thirteen
links leading out from it — exactly the shape he named as the problem.

**The mechanism, stated plainly:** you type. A finished sentence — ended by
`. ! ? …` — drops into a day-grouped, never-truncated document below. Two
structural facts about it, and only two, are ever read to decide where it
lands and how large it renders:

1. **How long your hands were idle** before you started typing it (measured
   idle-to-first-keystroke, not finish-to-finish — a defect an audit caught
   and a ground pass confirmed against real writing-pause research).
2. **How many words it is.**

Nothing reads what a sentence *says*. That discipline is load-bearing and
should not be broken by anything built alongside this file.

A second view — the margin graph — renders the same sentences as cards with
edges between them:

- **chain** — sequential, written one after another
- **near** — landed close together in time, not sequential
- **hinge** — an articulation point: remove it and the graph splits (real
  graph-theory cut-vertex detection, not a proxy)
- **declared** — the writer named the relationship by hand, via a
  connect-and-label flow; never inferred

You can drag a card to declutter. The drag is recorded (`userMoved`) and
never read as meaning anything — same "position is not a signal" discipline
the retired door's own solid geometry held.

## 2 · Two real bugs found by living with it, both fixed same day

- **The crash.** Pasting a long article recursed once per sentence found,
  each one paying for a full save-and-rerender before the next was even cut.
  A few hundred sentences meant a few hundred stack frames plus a few
  hundred renders. Fixed: same cutting logic, now a loop; save-and-rerender
  happens once per paste, not once per sentence.
- **No delete.** The synthesis this file was built from named "nothing ever
  deleted" as its most honest property — true of writing a sentence at a
  time, never tested against an accidental block landing whole. A hover-
  revealed × now removes a sentence and anything that referenced it, guarded
  by a confirm. Real defect, found by use, not by audit — same class this
  corpus already names in `LEARNED.md` law 27.

## 3 · The pebble / word / stone idea, and the tetra

Kevin's own framing, verbatim: *"I'm thinking of each sentence as a pebble,
each word as a node. Sentences can be merged and grouped together to
assemble a paragraph, a stone. we can map the 6 relationships at any point
in the system, built a tetra an object."*

A tetrahedron has 4 vertices and 6 edges — every pair among any four things
related at once. This is not a new idea for this corpus: the four-faces-of-
NESI model, THE COLLAPSE's four-node WORLD/LIBRARY/INSTRUMENT/OUTSIDE frame,
and the retired door's own twelve-seat cuboctahedron all use the same
primitive. This proposes running it one level down — at the level of the
writer's own sentences, words, and paragraphs, not the corpus's own
architecture.

### Three shapes were dreamed, built, and run through audit + ground

All three are real, working files in this folder, each reading the same
`localStorage["nesi.thepage"]` the writing page fills — none of them write
to it.

**`tetra_dream_A_fourpick.html` — the four-pick lens.** Pick any four
sentences you've already written; the six edges between them render using
the exact relationship vocabulary above (chain / near / hinge / declared /
none — an honest gap where nothing connects two picks). Read-only. No new
data.

- *Audit found:* a pair that was both chain-adjacent and separately declared
  related silently lost the declared label (first match won). **Fixed** —
  declared now always shows, tagged "(also chain)" when both are true.
- *Audit found:* the first vertex layout put the fourth point at the
  centroid of the other three — inside their hull, not a real fourth
  vertex, so edges could overlap into a knot. **Fixed** — real regular-
  tetrahedron coordinates, projected the same simple way the retired door
  projected its twelve seats, so no vertex sits inside the others.
- *Ground:* holds at the scale tested (hundreds of sentences); the near-
  pairs computation is O(n²), fine now, would need a window at real scale
  (months of daily writing) — named, not hidden, same caveat the writing
  page's own margin graph already carries.

**`tetra_dream_B_pebbles.html` — pebbles and stones.** A real hierarchy
layer the current data model doesn't have: double-click sentences to arm
them, gather them into a named "stone," and a stone's word count, pebble
count, and hinge-touch status become the structural facts a four-stone tetra
reads. Kept in its **own** localStorage key
(`nesi.thepage.stones`) — an experiment doesn't get to risk the real
writing.

- *Audit found:* "touches a hinge" originally called every chain-interior
  sentence a hinge — nearly all of them, saying almost nothing. **Fixed** —
  real articulation-point detection over chain + near + declared together,
  ported from the same algorithm the writing page itself runs, not
  approximated.
- *Ground, unresolved:* the only structural signal computed between two
  stones is shared membership, and in ordinary use (stones built from
  genuinely different parts of a document) that reads "no overlap" on most
  edges — the same honest-gap pattern Dream A already has for unrelated
  sentences, but now paid for with a whole new grouping layer, storage key,
  and UI. Open question, not answered here: does grouping earn its
  complexity, or does Dream A's simpler direct four-pick already cover the
  real need?
- *Open, not decided:* can a sentence belong to more than one stone? Nothing
  currently stops it (a stoned pebble dims but can still be armed again).

**`tetra_dream_C_standing.html` — the standing tetra.** No picking, nothing
built by the writer at all: a companion window meant to sit open beside
`index.html`, always showing the tetrahedron around wherever the writing
currently is — the sentence just finished, its chain neighbors, and its
nearest neighbor in time. Listens for the `storage` event the writing page
already fires on every save; confirmed live across two real browser tabs.

- *Ground, the hard case that actually challenges the core claim:* "now"
  means the last sentence *written*, not the one being *looked at*. A
  writing session includes real stretches of rereading old material — during
  those, this window keeps showing an increasingly stale "now" with no way
  to reorient it, because selection in the writing page (`selectedId`) is
  in-memory only, never persisted or broadcast. **Named in the file itself,
  not fixed** — the minimal honest reformulation (broadcast selection too,
  not just new sentences) is a real, buildable next step, not attempted here.

## 4 · Second pass — outside models, one real correction, three fixes, a fourth shape

Kevin sent §3's prompt to other models (not Claude) and brought the answers
back. Reading them honestly required naming something first: **the fix I
found by living with it (§2) wasn't the fix.** I found Dream B's hinge
detection was a fake stub calling nearly everything a hinge, and repaired
it by porting the real cut-vertex algorithm the writing page itself runs.
That closed the audit finding — the code now matches its own definition —
but two of the outside models, asked separately and converging without
seeing each other, found the deeper problem I hadn't: a real cut-vertex
algorithm *still* saturates, because a mostly-linear chain graph (which is
what daily writing naturally is) makes almost every interior node a true
articulation point. That's math, not a bug. Auditing the code and grounding
the concept are different destructive passes for exactly this reason — I'd
only done the first one on hinge, and it was the one that mattered.

**Fixed — hinge decay.** `WINDOW_DAYS = 21` (three weeks — a first guess,
not derived; easy to retune). Chain and near edges only count toward hinge
detection within that rolling window; declared edges count regardless of
age, since they're the one deliberate, cross-time signal the writer added
on purpose, and pull in whichever node they touch even if it's outside the
window. Applied to `index.html` itself (both places it computed hinges —
they were two separate copies before this, now the second reuses the same
windowing rather than drifting), and to Dream A and Dream B. Ground-tested
directly: a 5-node synthetic chain with the first two nodes dated outside
the window correctly excludes them from hinge candidacy and correctly finds
the real cut-vertex among the remaining three — verified in isolation, not
just eyeballed.

**Fixed — Dream C's stale "now."** An outside model's suggestion, taken
directly: *attention = dwell position, not just last write.* `index.html`
now writes `localStorage["nesi.thepage.attention"]` after a 1.5-second
hover on any sentence — passive, no click, reads only *which* sentence, not
what it says. Dream C prefers a recent (< 60s old) attention record over
"last written," but only once writing has actually paused — a new sentence
always reclaims "now" immediately. **A real crash was found and fixed while
wiring this in:** attention pointing at the very first sentence has no
predecessor to look backward from, and the rest of the function assumed
one existed. Guarded: attention only takes over when there's room on both
sides. Also fixed in the same pass: the file previously hardcoded "now has
no successor" as always true, which stopped being true the moment "now"
could be an older sentence — a real chain-successor now renders when one
exists instead of being silently hidden.

**Fixed — Dream A's declared-edge collision**, same class of bug as before,
carried into the matrix build below: nothing new here, just confirmed
consistent.

**Built — `tetra_dream_D_matrix.html`, the fourth shape.** The strongest
single structural objection from the outside reads: a tetrahedron forces
all six of its edges to look identical — undirected, single-valued,
symmetric — and this system's relationships are none of those things.
Chain is directional (sentence A led to sentence B, not the reverse).
Declared carries a direction too, plus a label the tetrahedron view had
nowhere to put except a tooltip. Hinge isn't a pair-property at all — it's
a fact about one sentence — and the tetrahedron had no honest place to show
it. A typed 4×4 matrix has a place for all of it: off-diagonal cells for
pair facts (asymmetric ones only appear on one side), the diagonal for
node-level facts. Built and verified against real seeded data: chain and
declared render on exactly one side of the diagonal, near renders on both,
hinge only ever appears on the diagonal — the asymmetry is visible, not
asserted.

**Not done, named honestly:** the outside models' other strong proposals —
interest-weighted edge selection (so a four-pick doesn't default to four
boring adjacent chain sentences at scale), the operator-panel shape, the
dual face/vertex inversion, the braid — are real and not built. Picking
which of those (if any) is worth a fifth dream is not this pass's call.

## 5 · Third pass — one-anchor tetra, tested against a run of invented vocabulary

A separate thread ran the same day: a round of outside-model responses
proposed reading `the_page`'s tetra as a "membrane" system — faces with
interior/exterior cost resolution, chambers, apertures, flux, a
permeability constant $\kappa$. Checked directly against this repo: none of
it maps to anything real. `the_page.html` measures exactly two scalars per
sentence (idle time, word count) and one categorical fact per edge
(chain/near/hinge/declared). There is no cost field, no absorption, no
projection, anywhere in the code. That vocabulary was invented on top of
the real data, not derived from it, and none of it was carried into any
build.

One piece of the same thread's imagery was buildable without inventing
anything, though — Kevin's own words: *"the writing serves as the
foundational node to build the tetra around. Three other vertexes would
have to be established. Those nodes would be the derived gifts from the
faces as they develop."*

**Built — `tetra_dream_E_gifts.html`, the fifth shape.** Pick **one**
sentence as the anchor (V0). The other three vertices are never picked —
each is derived by running one of the three existing lenses outward from
the anchor: V1 = the chain gift (its chain neighbor), V2 = the near gift
(its closest non-chain neighbor in time), V3 = the declared gift (a
manually-connected sentence, if any). The three faces touching the anchor
are the three pairs of gifts with V0. The fourth face — V1, V2, V3 — never
touches the anchor; it's where the three lenses' reach can overlap.

- *Built and verified same pass*, seeded with real data and clicked through
  both cases: an anchor whose three gifts are all distinct renders
  "aperture: open, no overlap" (the honest-gap case, same pattern as most of
  Dream A's four-picks); an anchor whose declared partner also happens to be
  its chain neighbor renders "aperture: double illuminated," correctly
  naming which two lenses converged.
- *Ground finding, named in the file itself:* triple illumination is not
  reachable by this construction. Chain and near can never derive the same
  gift — near-pair computation already excludes chain-adjacent pairs, the
  same fact Dream A's own audit relied on. Only declared, being orthogonal
  to both, can ever double one of the other two. The fourth face's ceiling
  is two-lens overlap, never three — a real limit of this particular
  construction, not of the tetrahedron in general.
- *Open, not decided:* `declaredGift()` picks whichever declared edge was
  inserted last when an anchor has more than one; declaredEdges carry no
  timestamp, so "last" only means "last in array order" — a real assumption
  named inline, not hidden.
- Zero new fields, zero new storage. The "gift" a face computes is a set-
  membership fact (which sentence a lens reached), answering the question
  the outside-model thread itself posed correctly before drifting into
  invented vocabulary: *what can a face compute that its edges can't?* A
  pairwise edge can't express "this sentence was reached by two different
  lenses" — only a face-level object, holding the outputs of three
  processes at once, can.

## 6 · What's genuinely open

- Which shape (or shapes) actually get developed further — a lens, a
  hierarchy, an ambient companion, a matrix, a gift-derivation — is Kevin's
  call, not a session's; they serve different purposes and may not need to
  converge into one the way the original A/B/C writing-surface dreams did.
- Dream B's core value proposition (does grouping add enough real
  relationship signal to be worth it) is still unresolved — hinge decay
  fixed how it's *measured*, not whether the measurement is worth having.
- `WINDOW_DAYS=21` and the 1.5s dwell threshold are both first guesses, not
  derived constants — real numbers to tune once this gets used for months,
  not weeks.
- Dream D and Dream E both suggest the tetrahedron may not be the only, or
  best, shape for this data — D by replacing it outright with a matrix, E by
  showing the tetrahedron's fourth face can only ever report a two-way
  overlap under this construction, never the three-way convergence the
  geometry visually promises. Whether that's a finding worth carrying
  forward, or a sign a different derivation of the three gifts would reach
  triple, is open.
- None of the five touch word-level nodes yet — Kevin's own framing named
  "each word as a node," and only Dream B's word-chip display (inside an
  expanded pebble) gets anywhere near that; no prototype yet treats a word
  itself as a tetra vertex.
- The interest-weighted-selection idea (surfacing structurally meaningful
  fours instead of whatever's nearest/newest) is named, not built, in any
  of the five dreams.

## 7 · Files, for orientation

```
index.html                                        — the live entry point
the_page.html                                      — redirects to index.html
index.html.backup_pre-lattice-entry_2026-08-26.html — the retired solid door, kept whole
lattice.html                                        — the original fresh-start build (superseded by the_page synthesis)
dream_A_document.html / dream_B_settle.html / dream_C_manual_delta.html — the writing-surface's own dream cycle (already converged into the_page)
tetra_dream_A_fourpick.html                         — this pass's Dream A
tetra_dream_B_pebbles.html                          — this pass's Dream B
tetra_dream_C_standing.html                         — this pass's Dream C
tetra_dream_D_matrix.html                           — second-pass Dream D, the typed matrix
tetra_dream_E_gifts.html                            — third-pass Dream E, the derived gifts
KNOWLEDGE_the_page_and_the_tetra_2026-08-26.md      — this file
PROMPT_FOR_OTHER_MODELS_2026-08-26.md               — portable brief for an out-of-family read
```
