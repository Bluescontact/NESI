# THE GAME-CRAFT LIBRARY — GROUND — dispositions and ranked drag-feel risks

Written 2026-08-11 by the game-craft agent's GROUND vertex. Companion to
GROUND_knowledge.md; all provenance lives there. Status vocabulary:
BUILT-WALKED (a hand has crossed it) · BUILT-UNWALKED (verified by function,
never by pointer) · SPEC-ONLY · RULED (Kevin's, standing) · HELD (open, his) ·
COLLIDING (two laws on the record, neither smoothed). Touch/no-touch is a
bound on what a future build session may alter without a new mark — it orders
nothing; the freeze holds.

"Walked" is read strictly: Kevin's only recorded walk predates the tetra,
the supersession, the teaching, and the eight-edit build. Under that reading
**nothing in the current file is BUILT-WALKED**; the nearest is the writing
field itself, whose earlier form his hand did cross.

## Dispositions, per element

| Element | Status | Touch bound |
|---|---|---|
| Sequential field + band cut (nesi.html:171-197) | BUILT-UNWALKED (earlier interval form walked once) | NO-TOUCH on the cut rules — carried character-for-character from the intake, Kevin's supersession ruling |
| Enter banks / Enter-on-empty closes run | BUILT-UNWALKED | NO-TOUCH (supersession ruling, verbatim in BUILD_RECORD) |
| Watermark / deletion-never-un-banks | BUILT-UNWALKED | NO-TOUCH (law 12 + supersession; the named cost-boundary) |
| The writing tetra: net, four faces, water level (T1-T3) | BUILT-UNWALKED | NO-TOUCH on face names (THE TABLE · BLIND · TILES · SEQUENTIAL — Kevin's intake's four; 4·6·4·1 untouched); geometry touchable |
| Worked-gate: edit · merge · line · break · mark · place (T4) | BUILT-UNWALKED | NO-TOUCH on "worked only by hand-act, never time or view" (Cowan T4 under Kevin's grant) |
| Descent drag through the writer's node (T6) | BUILT-UNWALKED — release condition emulated, never pointer-traced | Mechanic NO-TOUCH ("the drag is the decision"); the pixel window is feel-tuning, touchable |
| Four stations + fail states (lean/scorch/tear/filters) | BUILT-UNWALKED | Constants carried from world2d are the lineage authority (BURN_AT, REACH, RELAX, RIM) — touch only with the source named |
| Tray-refill-in-open-station / standing water folded in | BUILT-UNWALKED (proven in scratch end-to-end) | touchable |
| Dam: pool tiles, merge, break, pre-settle edit, release/keep-holding | BUILT-UNWALKED | NO-TOUCH: FK2 RULED ("all held stones visible — depth-zero governs"), FK3 RULED ("one chassis, dam stays a flagged variant"), merge-in-written-order + seams (R4), settling-is-the-taking (R6) |
| Bare plate (net + dam + every station) | BUILT-UNWALKED | NO-TOUCH (law 6: no destination, no animation, no confirmation) |
| Second mouth (given/fetched, coarse rock) | BUILT-UNWALKED | NO-TOUCH on R2: no spire mapping, kind machine-immutable, the file never fetches |
| Sounding | BUILT-UNWALKED | NO-TOUCH on verbatim-only and "finds nothing shows nothing" |
| Sentence-lens (axis, tetra, parabola, light) | BUILT-UNWALKED | Kevin's articulation — form NO-TOUCH; the dissolved split feeding lenses is PROVISIONAL (reversible, on the record) |
| Region naming (once, verbatim, blank lawful) | BUILT-UNWALKED | NO-TOUCH (R5 + FK4 RULED "gaps only — the form stays discovered") |
| Teaching captions + panel names + dam words | BUILT-UNWALKED | Ruling NO-TOUCH ("teach, never advise"); caption texts touchable within it |
| Light rises (cycles + watered lenses) | BUILT-UNWALKED | curve touchable; no-number NO-TOUCH |
| Persistence: pad-commit save, per-day writing key, migration append-only | BUILT-UNWALKED (reload proven pre-supersession) | NO-TOUCH on R7 (safe write, scratch door, nothing says saved) |
| Scratch door `enterScratch()` + check-its-return | BUILT (breach-born; see BUILD_RECORD "A BREACH, NAMED") | NO-TOUCH — the fix for a recorded live-store breach |
| auditRooms two-test audit | BUILT (scratch-only) | touchable |
| Contaminant / fourth fraction | RULED-BUT-UNSITED (no code anywhere; enforcing it needs a classifier law 5 forbids) | NO-TOUCH without Kevin |
| Spire names (GROWN/GIVEN/WOVEN) | HELD — offered as fork, never ruled; spires unnamed and uncompared | NO-TOUCH |
| Six relationship-edges as instruments; per-edge mechanics; generation from words | HELD (T5: named and held, not built; the unentered fork stays shut) | NO-TOUCH |
| Rim warning / cost-visible-at-choice | COLLIDING — spec's refusal vs Cowan floor rule; spec governs, collision on the record | NO-TOUCH — do not smooth |
| Silent deep-routing at scorch/tear/slop | COLLIDING (recorded, held as designed) | NO-TOUCH |
| Single localStorage key, silent catch | RULED cost of law 11, named to the operator only | NO-TOUCH in-game; operator-side backup is outside the game |
| Floor spec criterion 4's "say their game is not built" | SPEC-ONLY, superseded by the build; spec still "Unmarked. Kevin's to mark" | fork open — his |
| Rotation (Stage One slice 8), fruit/tree, second person | SPEC-ONLY (deliberately lacking, THE_FLOOR_2D §Stage One) | frozen |
| world2d store.gd "100 WORDS IS THE AUTHORITY" note | SUPERSEDED-ON-RECORD, unedited at source (out of write scope; one word from Kevin strikes it) | NO-TOUCH |

## THE DRAG-FEEL RISKS, RANKED

Each stated as what a hand would feel go wrong. These are findings for the
counsel, not fixes ordered. Rank = (how central the gesture is to the game) ×
(how likely the first hand hits it).

**1 · The descent window is a sliver, and its vertical scale is wrong when
the window is not 10:7.** The carry gate is `py>640` in a 1000×700 viewBox
whose bottom edge is 700 and whose writer-node sits at 630
(nesi.html:219,261); the drag conversion divides BOTH axes by
`netv.clientWidth/1000` (nesi.html:254) — horizontal scale applied to
vertical motion. With `preserveAspectRatio meet` on a wide window, vertical
mouse movement converts too slowly (or too fast on a tall one). What the hand
feels: the single most important gesture in the game — carrying your worked
sentence down through your own position — either won't complete (the stone
sticks just above the node however far you pull) or fires before you meant
it. This is the game's signature act and it has never been pointer-traced.

**2 · The unworked hang reads as a dead click, not a law.** The clamp
`py=600` (nesi.html:256) is a hard invisible wall with no give, no rebound,
no visual strain. "Feel is physics": a HANG should feel heavy — resistance
growing, the stone sagging back. What the hand feels now: the drag just stops
— indistinguishable from the earlier "i cant click on any of them" class of
defect. The one mechanic where the refusal must be felt as weight currently
feels like a bug. (The TEACH caption carries the explanation, but only on
hover, before the drag.)

**3 · The drawn plates and their drop zones don't coincide.** Lake/set plates
are drawn 70 px wide at `x=W*0.30 / W*0.58` (nesi.html:765-766) but the drop
test accepts `W*0.28–0.42 / 0.56–0.70` (nesi.html:790-791) — a proportional
window vs a fixed-width drawing. On a wide panel the hand can drop well right
of the drawn plate and have it count; on a narrow one, near-misses at the
plate's right edge... and the spire band `H*0.44–0.66` with `Math.round`
snapping (nesi.html:792-793) means a drop midway BETWEEN two mouths still
routes to one of them. What the hand feels: routing lands when it shouldn't
and the hand never builds an accurate map of where "at the mouth" is —
targets teach imprecision.

**4 · The scorch clock only burns while the pointer moves.** The
`performance.now()-beamT>BURN_AT` check lives inside `pointermove`
(nesi.html:727-731). A hand that aims and holds perfectly still never
scorches; a hand that trembles on one receiver does. What the hand feels:
the fail state punishes steadiness's opposite inconsistently — held-beam
discipline (the taught physics: "held too long ... scorches") is not actually
what the system measures. Difficulty-is-honesty is breached in the one place
a fail state is permanent.

**5 · The persisted lean is a silent trap on reopen.** `S.lean` saves and the
slop check `Math.abs(S.lean)>RIM` fires at chip release (nesi.html:711,797).
Reopen the water table days later with an old lean of 1.2: the tray renders
tilted (rotate lean*14° ≈ 17°, subtle at a glance) and EVERY chip routed goes
to the deep. Lawful — the lean persisting is the design — but the hand feels
a session-old choice eat today's water with a precursor visible only as a
mild tilt. The recorded rim collision governs; this names precisely where it
will first hurt a hand.

**6 · Two drag grammars in one game.** The net, chips, tray, mirror, sheet
use pointer events; the table and dam-pool tiles use HTML5 `draggable`
(nesi.html:327-331, 557-562). What the hand feels: stones in the tetra move
under a press-and-drag; the same stones at the dam need the browser's
drag-ghost gesture — and on any touch device the merge/tie/break gestures do
not exist at all (HTML5 drag is mouse-only), while dblclick-to-tie fights
double-tap zoom. The dam's whole editing surface is mouse-only.

**7 · Hit targets at the world scale are tiny.** The dam is a 6 px-wide
stroke ~22 px long plus 3 px held-stone dots (nesi.html:422-430); the
foldback triangle is 34×30 at 0.55 opacity (nesi.html:26); net stones are
r=11 circles (~22 px). Under the world's `meet` scaling these shrink further
on small windows. What the hand feels: clicking the dam takes two or three
tries — and the dam is the game's only governing act.

**8 · The membrane's tear arrives with no felt approach.** `pull` accumulates
raw client px against REACH=150 with no resistance curve and no visual strain
gradient; at 151 the sheet instantly resets torn (nesi.html:747-751). What
the hand feels: no stretch, no warning tension — then everything is gone.
The recorded collision covers the absence of a marker; unrecorded is that the
sheet doesn't even get harder to pull, so the physics itself (not just its
labeling) is silent. Also REACH is unscaled client px: on a high-DPI or small
window the reach is effectively shorter relative to the panel.

**9 · The suspended chip's wander timer leaks.** Each `mkChip("sus",...)`
starts a `setInterval` never cleared (nesi.html:783); every panel rebuild
(each scorch, each tear, each refill of a twenty-charge sitting) adds
another. What the hand feels after a long sitting: the disc's idle wander
accelerates and stutters as orphaned timers fight over the transform — feel
drift over exactly the long faithful session the standing-water slice was
built to honor.

**10 · Hover is the only teacher and the only preview.** All captions, the
station names' discoverability, and `say(st.text.slice(0,90))` on stone
pickup (nesi.html:252) are mouseenter-driven. What a touch hand feels: the
entire teaching ruling — the thing built specifically because Kevin's first
walk failed — is absent, and the game returns to the exact state his walk
found: symbols with no names.

**11 · Sounding position trusts `offsetX/offsetY` on SVG children**
(nesi.html:653-656): browsers disagree on the offset parent for SVG
sub-elements, so the dropped line and caption can appear displaced from the
click. What the hand feels: you sound one ground and the line drops
elsewhere — a small dishonesty in the one instrument whose whole point is
"where you are curious."

**12 · The region-name input appears under a hand that is mid-gesture.**
`askRegionName` fires inside the release handler (nesi.html:629) while the
runout animation is still playing; the input takes focus (nesi.html:611) and
blur commits whatever is there (nesi.html:614). What the hand feels: the
world interrupts its own most cinematic moment with a focused text field,
and a stray click commits an accidental blank — lawful (blank stays
nameless, never re-asked) but the ONE naming chance the world offers can be
spent by accident. The never-re-ask law makes this the least recoverable
feel-risk in the file despite its low rank of occurrence.

## The one-line read

The refusals are intact everywhere a hand can reach; what is at risk is not
law but WEIGHT — the build's most sacred gestures (the descent through
oneself, the hang of the unworked, the dam's single governed act) are
currently the thinnest under the fingers, and no hand has yet told anyone so.
