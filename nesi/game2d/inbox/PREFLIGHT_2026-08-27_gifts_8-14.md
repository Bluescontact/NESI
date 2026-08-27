# PREFLIGHT — the remaining seven gifts, cards 8 through 14

Following the same shape Kevin asked for on VE24: scope, spec, verification,
and a preflight manifest for each, before anything is built. Gifts 6 and 7
are already routed (`persist()`, the `tarp` ground); gift 5 stays correctly
unrouted on its own card's terms. This covers the seven still waiting:
8 (ratify by crossing), 9 (grain siting), 10 (freshet test), 11 (set it
down), 12 (the case), 13 (the burn), 14 (rule for the sheet).

**Nothing below is authorized. Every entry ends "NOT AUTHORIZED."**

## Cross-cutting finding, checked before the individual entries

Unlike gifts 6 and 7 — which each had a real, already-existing "way in"
(`persist()` existed; a new ground slot existed) — four of these seven
(9, 11, 13, 14) name a "way in" that doesn't concretely exist in `the_page`
yet, the same shape gift 5's own card already flagged honestly. Checked
directly against the live `index.html` this pass:

- A staged-declare tray with a **discard** button already exists
  (`index.html:1148-1153`) — but it discards an *in-progress* staged
  declaration, not a completed one. Gift 11's "set it down" names a
  different thing: a third, equally-weighted door alongside two real
  destinations, not a cancel of something not yet committed. **Close, not
  identical** — worth naming, not assuming.
- No node or ground currently reads sustained pointer-hold duration (gift
  13's precondition) or renders a connector/surface as sampled points (gift
  14's precondition). Both are real, new interaction primitives this build
  doesn't have yet.
- No module currently reads `solid.js`'s vertex/edge data for a derived
  placement (gift 9's precondition) — `solid.js` is read today only for
  the `world` ground's seat picker, never for algorithmic siting.

---

## Gift 8 — ratify by crossing, not by naming

### Scope
A second, physical gesture for confirming a relationship already exists in
this build: the drag-to-arrange physics on the `relationship`/`world`
grounds. This gift adds a geometric test — does a dragged sentence's real
position cross near another seated sentence during the drag — that, on a
crossing, opens the same staged-declare tray the text-declare flow already
uses, pre-filled, rather than requiring the click-through path from
scratch. Does not replace text-declare; sits beside it. Does not decide
what "close enough to ratify" means numerically — that's a real, undecided
design choice this gift's own card names.

### Spec
- Hook into the existing drag-end handler (wherever `userMoved`/position is
  committed on the `relationship` ground).
- On drag-end, compute distance between the dragged card's committed
  position and every other seated card's position.
- If within a threshold (**undecided — needs a number, not invented here**),
  call the same function that opens the staged-declare tray, pre-filled
  with both sentence IDs.
- No new UI chrome — reuses the existing tray exactly as text-declare does.

### Verification
- Confirm the threshold, once chosen, doesn't fire on ordinary rearrangement
  (a card passing near another while being organized for clarity, not
  intentionally dragged onto it) — this needs real testing against the
  drag physics, not just a numeric guess.
- Confirm the pre-filled tray is indistinguishable from a manually-opened
  one once open (same discard/confirm behavior).

### Preflight manifest
- Must decide before building: the actual distance/overlap threshold for
  "ratified by crossing" — this is Kevin's call, not a default this pass
  should pick.
- Must read: the drag-end handler on the `relationship` ground, the
  staged-declare tray's open function.
- Risk/cost: **medium** — the geometric test itself is cheap; getting the
  threshold right without it firing spuriously is the real work.
- **NOT AUTHORIZED — awaiting Kevin's mark**, and specifically a threshold
  decision before it can even be spec'd precisely.

---

## Gift 9 — site it on the grain, never by hand

### Scope
A siting algorithm that derives a placement from `solid.js`'s own
structural data (the sparsest region, or where two structural measures
cross) instead of an author picking coordinates. The gift's own card names
this abstractly ("the next feature that needs to site something") — this
preflight found no current feature in `the_page` that actually needs a
derived siting yet. Building this now would mean inventing the feature it
serves, the same shape gift 5 already declined.

### Spec
Deferred — there is no current consumer. If/when a feature needs one, the
shape would be: a small pure function reading `solid.js`'s vertex/edge
arrays, returning one derived point (e.g. the largest gap between occupied
seats), called at that feature's own placement moment.

### Verification
N/A until a consumer exists — nothing to test against.

### Preflight manifest
- Must decide before building: **what actually needs a derived siting** —
  this precedes any spec work.
- Risk/cost: **low to spec once a consumer exists; zero value built
  speculatively now.**
- **NOT AUTHORIZED — no consumer feature exists yet; this is closer to
  gift 5's shape (a real pattern, gated behind something unbuilt) than to
  6/7's shape (a direct route today).**

---

## Gift 10 — the freshet test

### Scope
Not a code change to `index.html` at all. The gift is a **named check** —
"would this ambient readout respond identically to two wildly different
bodies of real content, because it reads structure/flow and nothing else?"
— meant to be added to an existing checklist skill (`the-closing-check` or
`instrument-audit`) as a question asked before any future ambient visual
state ships, not a build in the game itself.

### Spec
Add one line to `.claude/skills/the-closing-check/SKILL.md` (or
`instrument-audit`'s own checklist) naming the freshet test explicitly,
citing `nesi/world3d/.walk/_snapshot/scripts/spires.gd:21-36` as its source.

### Verification
Re-read the target skill file after the edit to confirm the line reads
as a check, not a build instruction, and doesn't collide with either
skill's own existing scope.

### Preflight manifest
- Must read: `.claude/skills/the-closing-check/SKILL.md` and
  `.claude/skills/instrument-audit/SKILL.md` in full, to place the line in
  the one that actually fits (this pass didn't re-read both to decide).
- Risk/cost: **very low** — a one-line addition to an existing checklist,
  not new instrument construction.
- **NOT AUTHORIZED — awaiting Kevin's mark**, and a decision on which of
  the two skill files should hold it.

---

## Gift 11 — set it down, the refusal as a real, equal third option

### Scope
The next place `the_page` offers a routing choice between two real
destinations should also offer "send it nowhere" as a first-class, equally
weighted third door — not the existing staged-declare tray's "discard"
(which cancels an *in-progress* declaration, a different thing, per the
cross-cutting finding above). This preflight found **no current place in
`the_page` where a player routes something between two or more real
destinations** — the closest analog (staged-declare) is a confirm/cancel of
one pending fact, not a choice among several.

### Spec
Deferred — no current consumer matches the gift's own shape. If/when
`the_page` grows a real multi-destination routing choice, the pattern
would be: three equally-styled buttons (not two-plus-a-smaller-cancel),
the third closing the surface with no state change and no confirmation.

### Verification
N/A until a consumer exists.

### Preflight manifest — corrected after reading the actual code
- The "reframe discard" route named above does **not** hold up. Read
  directly: `renderStagedTray()` (`index.html:1126-1157`) is a confirm/cancel
  binary — one real destination (`confirm` → the edge becomes real) plus
  `discard` (the staged item never existed). Gift 11's actual pattern
  requires **two or more genuine destinations already present**, with a
  third "send it nowhere" door weighted equally alongside them. There is
  only one destination here — relabeling `discard` would restyle a cancel
  button, not route the gift. Corrected, not forced.
- Same shape as 9, 13, 14 now: gated behind a multi-destination surface
  that doesn't exist yet in `the_page`.
- Risk/cost: **zero value to build against the wrong site.**
- **NOT AUTHORIZED — no genuine multi-destination surface exists yet.**

---

## Gift 12 — the case, a hand-openable panel that proves what's actually happening

### Scope
The highest-capacity gift remaining (H). A TAB-toggled overlay, built once
in the composted pre-rebuild `ascent.html` and dropped in the 2026-08-26
rewire, that makes the page's own refusals (no model call, no network) and
constraint registry visible and player-toggleable from inside the game,
rather than enforced only invisibly at build time. This is the one gift in
this batch with a genuinely direct route — the original mechanism
(`CASE`, `drawCase()`, `CONSTRAINTS`, `boundsClick()`) exists in full,
composted, and needs porting from canvas 2D draw calls to this build's
current SVG/DOM render path, not reinvention.

### Spec
- A `keydown` handler for TAB, wired alongside the existing ground-switch
  keys.
- A rendered panel (DOM, not canvas, since this build no longer uses a
  canvas draw-loop) listing: the constraint set relevant to the current
  `ground`, each with its `says`/`keeps` text and a toggle switch writing
  to a stored `S.off` array; a small live log of the page's own
  `persist()`/`localStorage` calls (this pairs naturally with gift 6's
  verified-write work, already routed — the log could show real read-back
  confirmations).
- Opening the case pauses no game loop (this build has none to pause,
  unlike the composted version) — it's a straightforward overlay toggle.

### Verification
- Confirm every constraint actually listed matches a real, currently-active
  refusal in this build (not a stale one carried over from the composted
  source).
- Confirm toggling a constraint off is visibly reversible and doesn't
  silently persist across a reload in a way the player didn't choose.
- Run `check_all.js` after — `refusal_check.js` and `zero_dependencies_check`
  are the two most likely to interact with anything this panel touches.

### Preflight manifest
- Must read: the full composted source at
  `nesi/game2d/_compost/ascent_2026-08-21_pre-rebuild.html:2782-2905`
  (already cited in the gift card; needs a fresh full read before porting,
  not just the excerpt quoted there).
- Must decide: which constraints are still live enough in this build's
  current form to list honestly — the composted version's registry may not
  map 1:1 onto today's refusal set.
- Risk/cost: **medium** — real UI work, but grounded in working prior code,
  not speculative.
- **NOT AUTHORIZED — awaiting Kevin's mark.** Of the seven, this is the
  strongest candidate for a next real build if he wants one.

---

## Gift 13 — the burn that never heals itself

### Scope
Sustained attention on a spot accumulates heat and can permanently scorch
it shut — a qualitative, session-surviving cost with no number shown. This
preflight found **no current node or ground in `the_page` that reads
sustained pointer-hold**, which the gift's own card already named as its
precondition ("pick or build one lattice node/gift that can take sustained
pointer-hold").

### Spec
Deferred — no consumer exists. If/when one does, the shape: a `pointerdown`
timer accumulating a `heat` value in that node's persisted state while
held, decaying when released; past a threshold, a permanent `spent` flag
written once and never cleared, rendered only as a color/shape change.

### Verification
N/A until a consumer exists.

### Preflight manifest
- Must decide before building: **which existing ground or a new one gets
  the sustained-hold interaction first** — this is a real design choice,
  not implied by anything currently in the build.
- Risk/cost: **low to spec once a target exists; zero value speculative.**
- **NOT AUTHORIZED — same shape as gift 5 and 9: a real, working pattern,
  gated behind a precondition this pass does not invent.**

---

## Gift 14 — a rule for the sheet, not a solver

### Scope
A deformable surface — one `exp()` falloff per point, no physics solver —
that tears past a reach threshold and heals only in real wall-clock time.
This preflight found **no current connector, line, or surface in
`the_page` rendered as a grid of sampled points** that this could attach
to; the gift's own card names "a lattice surface or connector line" as the
way in, which doesn't exist yet in this build's actual DOM/SVG structure.

### Spec
Deferred — no consumer exists. If/when a connector-as-sampled-points
surface exists, the shape: on drag, displace each sample by
`exp(-distance/k)` scaled by pull length; past a reach constant, flip a
persisted `torn` state with a wall-clock close-timestamp; render inert
while torn; only un-tear once real time has elapsed, even across a reload.

### Verification
N/A until a consumer exists.

### Preflight manifest
- Must decide before building: **does any existing connector/edge-line
  become the first candidate for this treatment, or does it wait for a new
  surface** — genuinely open.
- Risk/cost: **low to spec once a target exists; zero value speculative.**
- **NOT AUTHORIZED — same shape as gifts 5, 9, and 13.**

---

## Final disposition — Kevin's mark, "proceed on card 8-14 as manifested"

| Gift | Outcome |
|---|---|
| 8 · ratify by crossing | **routed** — built with a reasoned default threshold (real rectangle overlap, no invented number), explicitly flagged provisional pending a real sweep |
| 9 · grain siting | **not routed** — no consumer feature exists; unchanged from preflight |
| 10 · freshet test | **routed** — added to `the-closing-check`'s Question 2 as a named sub-check, not a game build |
| 11 · set it down | **not routed, corrected** — the manifest's own "reframe discard" route didn't survive contact with the real code (a confirm/cancel binary, not a multi-destination choice); left exactly where 9/13/14 sit |
| 12 · the case | **routed** — ported from the compost, honestly re-scoped: read-only constraint list (nothing in this build is actually conditional behind a toggle), real instrumentation for the localStorage/network log |
| 13 · the burn | **not routed** — no consumer feature exists; unchanged from preflight |
| 14 · rule for the sheet | **not routed** — no consumer feature exists; unchanged from preflight |

Three of seven (9, 13, 14) share gift 5's own shape exactly: a real,
proven pattern with no current feature in `the_page` for it to attach to
— left that way rather than inventing a consumer to force them in. A
fourth (11) turned out to share that shape too, once actually checked
against the live code, correcting this document's own first-pass route.
`check_all.js` confirmed green after every routed change; one real
collision was found and fixed along the way — the case's own honest
descriptions of "no score"/"no progress bar" tripped `refusal_check.js`'s
literal token scan (the exact defect class that file's own header already
names once), fixed by rewording rather than exempting, per that file's
own stated practice.
