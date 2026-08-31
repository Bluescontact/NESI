# KNOWLEDGE — the page, and the tetra of six relationships

> **PLACED, 2026-08-31, on Kevin's read of the deposit.** This file is a
> **build-log** — the honest session record of the writing surface's
> relationship experiments (five tetra dreams, the weave, the composting, a
> full-development pass) — and it is a companion to `index.html`, which is what
> its own first line has always said. It is **not** the corpus's upstream
> document, and it does not define "the knowledge tetra" as a corpus-wide
> structure; Kevin caught it reading as one from inside the deposit ("a very
> partial articulation... an undeveloped stub... concerning because it's an
> upstream document"). The actual upstream reconciliation — NESI's nucleation
> points, with the tetra's real standing ruled among them — is at
> `nesi/UPSTREAM_2026-08-31_nucleation_points.md`. Everything below stands
> unedited, as the build-log it is.

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

## 6 · Fourth pass — the weave: dropping the tetra, composting into the_page itself

Same day, a later pass. Kevin's own instruction: *"let work these together
into a single reweaving that doesn't require the authors scaffolding."* Read
against §4 and §5 above, "the author's scaffolding" names one specific
thing — the tetrahedron itself, the shape D's own header and E's own
ground-finding had already started to crack (six edges forced to look
alike when they aren't; a fourth face that can only ever show two-way
overlap, never the three-way convergence the geometry visually promises).

**Built — `the_weave.html`, a sixth read, not a sixth dream.** Kept what the
five actually proved and dropped only the tetrahedron: A's relationship
vocabulary and its declared-never-swallowed-by-chain fix; B's stones, read
but never rebuilt (this file writes nothing, to either `nesi.thepage` or
`nesi.thepage.stones`); C's live-follow ("now" is wherever attention or
writing currently is, not just the last write); D's typed grid, generalized
from a picked four to the whole document; E's per-node gift-readout, kept
as plain text instead of a fourth vertex. No picking ritual required — the
whole document renders, live.

**Composted — into `index.html` itself**, on Kevin's next instruction:
*"bring both together compost the weave into the previous build."* The
standalone file's content became a third "ground" (`weave`) alongside the
existing `relationship`/`time` toggle, reading this file's own live
`nodes`/`edges`/`declaredEdges`/`L.hinges` in memory rather than a second
parse of storage. `the_weave.html` now redirects into `index.html`, same
pattern as `the_page.html`; its prior standalone content is kept whole,
unedited, at `the_weave.html.backup_pre-composting_2026-08-26.html`.

**Real defects found by living with it, fixed same pass:**
- The composted matrix and the standalone file both originally truncated
  sentence text (pool list, matrix headers, gift readout) — a direct
  contradiction of the writing surface's own "never truncated" discipline
  from §1. Kevin caught it directly: *"the sentences should never be
  cut off."* Fixed — every surface shows full text; row/column headers wrap
  onto multiple lines instead of ellipsizing as the document grows.
- Once composted, the matrix had no way to change focus from inside the
  weave ground itself — you could only refocus by scrolling back to the
  document or switching grounds. Kevin caught this by using it: *"i dont
  see anyway to interact with the weave."* Fixed — every row and column
  header is now clickable, routed through the same `selectSentence` the
  document already calls.

**Two more grounds added, same pass, each Kevin's own ask:**
- **`knowledge`** — a one-click way to reach this file from inside the
  writing surface. **Corrected same day**: the first build fetched the file
  and rendered it inline — a real `fetch(`, same-origin, read-only — until
  `node tools/check_all.js` caught it: `refusal_check` forbids the
  construct outright under law 3/11 ("no model call, nothing reaches
  outward"), no carve-out for a benign read, by the check's own stated
  design ("loosening a refusal check is his word, not mine"). Fixed to a
  plain `<a href>` the reader clicks to open the file in a new tab — a
  normal navigation, not a network primitive the script initiates, the
  same category `the_page.html`/`the_weave.html` already use for their own
  redirects. Embedding the file's text as a literal string was considered
  and set aside instead: that would create a second copy to drift from the
  first, the exact failure this corpus already names elsewhere.
- **`words`** — Kevin's ask: *"map every word that can come after the word
  I."* Built as a live concordance over the writer's own sentences, scoped
  by the same discipline as chain/near/hinge: a "follows" edge only exists
  WITHIN one sentence, never invented across a boundary the writer didn't
  write. **Real bug found and fixed in the same breath**: the first draft
  matched the query word case-sensitively, so "You"/"We" capitalized at a
  sentence's start silently failed to match the lowercase preset buttons —
  the query now matches case-insensitively while the follower word stays
  exact-case, so the voice reflected back is exactly as typed. Extended
  twice more on Kevin's own follow-ups: preset buttons for I/you/we, then
  us/they, then he/she (all eight now); then a phrase-query generalization
  (`"I need"` → what follows the whole phrase, not just one word) so the
  ground can surface actual habits of phrasing, not isolated next-words.
- **`categories`** — after a clarifying check on which sense of "user
  retention memory/data" Kevin meant (confirmed: a taxonomy of what this
  build already reads, explicitly *not* engagement/retention-hook design —
  that second reading was named and set aside, not built), a live report
  over six categories that partition every field this file or a composted
  sibling already computes: **text** (the sentence itself, verbatim), **timing**
  (idle-before, day, arrival order), **derived structure** (chain/near/hinge
  — computed, never asserted), **manual structure** (declared edges, stones,
  dragged position — the writer's own hand), **word adjacency** (the `words`
  ground's own layer), **attention** (dwell vs. last-written, never analyzed
  for mood). No new capture — every stat traces to a field named elsewhere
  in this document. Each card was later wired with a `→ jump` link into the
  ground or sentence its own facts live in, so the report isn't a dead end.

**A framing correction, same pass, not specific to any one ground.** Kevin's
mark, mid-session: *"'never truncated, never a box'... That should have been
could and moved to the back as a lint... The goal of nesi is to allow users
to find value in their own voice."* Read against the standing rule (project
`CLAUDE.md`, "FRAMING," 2026-08-17 and extended 2026-08-22): negative form
belongs only as a lint or a container-edge, never as general prose. Several
visible strings violated it — "never truncated, never a box," "nothing read
but idle time and length," "never read as meaning anything," "never
guessed," "dragging is off in this view," "no other path currently connects
around it," "nothing else landed near this one." All rewritten to state
what the page *does* (shows sentences in full, places by idle-time-and-
length alone, stays where you drag it, holds a path together) rather than
what it refuses. The one place the refusal still needed to exist — the
actual discipline of never truncating — was already backgrounded as a code
comment (§1 above, in effect), not user-facing copy, which is where "moved
to the back as a lint" points: it was already there, once the front-facing
line stopped repeating it.

**Named honestly, not solved, by this pass:**
- This file (the one you're reading) went stale relative to the build for
  part of the session — it named five dreams and said nothing about the
  weave, the composting, or three of the four new grounds. This section is
  the fix; the falsifier is the same one `LEARNED.md` holds for itself — if
  a session reads this file at boot and the build has still drifted past
  it, the fix is to update the line, not add another pointer.
- Verification for this whole pass ran against seeded test sentences ("I
  need to finish this today," "They said it would work," and similar) in
  an isolated session browser connected to another session's already-running
  dev server. localStorage is browser-scoped, not server-scoped, so this
  shouldn't have touched anyone's actual writing — but it was never
  confirmed from the other side.
- `node tools/check_all.js` — run against this pass, later the same day,
  on Kevin's own instruction. It caught a real defect this whole section
  had already been written and closed around: the `knowledge` ground's
  `fetch(` call, forbidden outright by `refusal_check` under law 3/11 (see
  above). 17 of 18 held on the first run; fixing the fetch brought it to
  18 of 18. Everything else in this section was still verified by hand
  (console checks, seeded-data walks, click-through) before the suite ran
  — the suite caught the one thing hand-verification had no way to catch,
  because it isn't a behavior bug, it's a build-time law this project
  enforces mechanically rather than by care.
- Whether `categories`, specifically, belongs permanently in the writer's
  own margin, or reads more like a debugging/audit view that happened to
  get built at the same altitude as the others, is an open question this
  pass raised but didn't answer.

## 7 · A full-development pass, same day — one real bug found, one real boundary named

Kevin's own instruction: *"run one more development on the page and offer
the return."* A real run of this corpus's `full-development` procedure
(compost, inventory, adversarial audit, ground, diverge, dream, converge,
route-and-place, then a fresh independent verify) against `index.html` as
it stood at the end of §6 — not a rewrite, a destructive pass first, on
principle, because a defect found after polish costs the polish.

**Audit found five real defects, all fixed, all confirmed by a fresh
verify subagent that had not seen the reasoning:**
1. Two code comments in the `words` ground still asserted case-*sensitive*
   matching after the case-insensitivity fix (§6) had already shipped —
   the code was right, the comments were a stale leftover. Reworded to
   match what the code actually does.
2. **The real one.** Hinge detection never actually included declared
   edges, directly contradicting §4's own documented behavior ("declared
   edges count regardless of age... pull in whichever node they touch even
   if it's outside the window") — a doc/code mismatch that had stood since
   the day §4 was written, in *both* of two separately-drifting copies of
   the same logic (`layout()`, and a second ad-hoc inline copy in the drag
   handler, whose own comment worried about exactly this drift and turned
   out to have already suffered it). Fixed by extracting one
   `computeHinges()` function used by both call sites — not by patching
   the two copies back into agreement, which would only defer the next
   drift. Verified behaviorally with a synthetic 5-node test: two
   disconnected 3- and 2-node chains produce hinge `{1}`; adding one
   declared edge bridging them produces hinge `{1,2,3}` — the fix moves a
   real number, not just a comment.
3. The `categories` ground's "never truncated" copy was stated as a
   general property of "the sentence itself," when the SVG graph cards,
   the connect panel, and the staged-declaration tray all truncate the
   same text with an ellipsis. Rescoped to name where it's true (the
   document) and where it isn't (some cards and lists) — first pass at
   this fix introduced a *new* overclaim ("always a hover away," true only
   of the SVG cards' own tooltip), caught by the same verify subagent and
   corrected to point back at the one place the full text is guaranteed:
   the page itself.
4. The declared-connections list appended an ellipsis unconditionally,
   even to sentences under 26 characters — a small, literal false signal
   that more text existed. Fixed to match the conditional pattern already
   used everywhere else in the file.
5. The categories ground's own comment claimed every persisted field
   falls into exactly one of the six categories; a node's layout
   coordinates (`x`/`y`/`w`/`h`/`r`) don't cleanly fit any of them. Named
   as an explicit, honest exception rather than quietly true or silently
   wrong.

**Ground pass found the one real boundary worth naming, not a refutation.**
Real, sourced research (Pennebaker's LIWC program; the Forer/Barnum effect;
pause-timing confounds in writing-process research; forensic
stylometry) shows pronoun-adjacency patterns are genuinely diagnostic
material — for depression indicators, for authorship/psychological-trait
inference, for the kind of self-insight that's also exactly the shape a
Barnum statement exploits. The governing claim ("measuring only structure,
never meaning, is safe") is true of the *algorithm* and was never
sufficient on its own — the *artifact* a `words` or `categories` ground
produces is the kind of record that's diagnostically loaded regardless of
who or what reads it next, refusal-to-interpret in the code notwithstanding.
**Reformulated, not gutted**: refusing to interpret in the algorithm is
necessary but not sufficient; the artifact needs the same care as any
other diagnostically-loaded writing record. Checked against the actual
build: `index.html` already satisfies this in practice (no export, no
sync, no network call of any kind — enforced by `refusal_check`, not just
intended) — the gap was that this was never *stated*. Fixed by adding an
honest note to both the `words` and `categories` grounds naming the risk
plainly and the boundary that already holds against it, and a second note
on `categories`' averaged stats specifically (an average is one step past
a raw fact, which the pause-timing research says can't be attributed to a
single cause).

**Diverge produced five real shapes for the same material — offered, not
built,** per this corpus's own standing rule that which shape gets
developed further is Kevin's call, not a session's: an inversion
(structure-first, writing secondary), a non-sectional single continuous
surface, a radical cut down to chain alone (with a specific, defensible
case for why near/hinge/declared/categories could each be cut), a
timeline-as-instrument rebuild around the two facts the app already
privileges (idle time, word count), and an ask-back query surface
replacing six fixed tabs with one open question box. Five alternative
openings for the `<h1>`/tagline were also produced, in different
registers, as finished copy, not advice.

**Verdict: DEVELOPED.** All five audit defects and the ground counterexample
are resolved and independently reverified; `node tools/check_all.js` holds
at 18 of 18 both before and after every fix in this pass. Nothing here
required a decision only Kevin could make — the diverge shapes are
material for a *future* decision, not a blocker on this one.

**Deferral accounting:**
- *What did this add that nothing calls?* Nothing — every fix corrects an
  existing, reachable code path or corrects copy already visible in a
  live ground.
- *What did it name that it did not build?* The five diverged shapes for
  the whole app, and the specific case for cutting near/hinge/declared/
  categories down to chain alone. Named, not attempted — that decision
  belongs to Kevin, same as §6 already holds for which of the original
  five tetra dreams gets developed further.
- *What did it defer?* Whether `categories` belongs at this altitude
  permanently (§6's own open question, untouched by this pass); retrofitting
  hover-accessible full text onto the connect panel/staged tray/declared
  list/related list (named honestly in defect 3's fix rather than built).

## 8 · What's genuinely open

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
  geometry visually promises. §6's `the_weave` and its composting into
  `index.html` is one answer (drop the shape entirely); whether that's the
  right answer, or whether a different derivation of the three gifts would
  reach triple, is still open.
- Word-level structure now has one real foothold — the `words` ground's
  follows-concordance (§6) — but it is NOT "each word as a tetra vertex" in
  Kevin's original framing; it's an intra-sentence adjacency count, a
  different shape of the same idea. Whether the original word-as-vertex
  framing still wants building, separately, is open.
- The interest-weighted-selection idea (surfacing structurally meaningful
  fours instead of whatever's nearest/newest) is named, not built, in any
  of the five original dreams or the weave that followed them.

## 9 · Files, for orientation

```
index.html                                        — the live entry point; now carries six grounds
                                                     (relationship, time, weave, knowledge, categories, words)
the_page.html                                      — redirects to index.html
the_weave.html                                     — redirects to index.html (composted in, §6)
the_weave.html.backup_pre-composting_2026-08-26.html — the_weave's prior standalone content, kept whole
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
