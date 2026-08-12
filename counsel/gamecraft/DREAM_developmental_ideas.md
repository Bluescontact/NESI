# DREAM · developmental ideas — the game-craft vertex (THE PLAYER'S HAND)

2026-08-11 · read against: nesi/game2d/nesi.html + BUILD_RECORD.md · nesi/mind/PROTOCOLS.md (freeze block read first; these are FINDINGS, not a queue) · inbox/INDEX.md (all fifty cards read; nothing below duplicates one) · counsel/fuller/DREAM_developmental_ideas.md (the thirteen Fuller ideas read; nothing below repeats one).

Every idea is a gesture a hand does and feels in the first minute, filtered through the refusals. Status legend: LAWFUL-NOW = buildable under standing law without a new ruling · NEEDS-KEVIN = touches a fork or ruling that is his · COLLIDES(x) = a standing law pushes back, named. The freeze holds; LAWFUL-NOW is a reading, not an order.

---

## 1 · Weight in the drag
**Craft law:** Feel is physics — the hand knows a good drag before the mind does.
**Tether:** BUILD_RECORD's own named edge: *"the net's drag-feel — the hang of an unworked stone in the hand — is unwalked, and it is the part built most directly for the hand"* (nesi/game2d/BUILD_RECORD.md, "The writing tetra", Edge).
**The gesture:** in the first minute the hand picks up a stone in the tetra and a long sentence follows the pointer a half-beat slower than a short one — mass from the sentence's own length, the same source that already sizes a lens axis. No number, no label; the hand learns weight the way it learns a full cup.
**Smallest slice:** one lag coefficient on the tank-stone pointermove (nesi.html ~line 253), scaled from text length. Walked, not screenshot.
**Status:** LAWFUL-NOW (law 2 clean — weight is felt, never displayed; law 10 — behaviour carries).

## 2 · One hand-physics everywhere — retire the ghost drag
**Craft law:** Playtesting is the only truth; feel-parity is craft hygiene — two drag systems is two games.
**Tether:** the tetra's stones move under `setPointerCapture` with live position (nesi.html:252–258), but the dam-pool tiles and filter fractions ride HTML5 drag/drop: *"d.draggable=true; d.addEventListener(\"dragstart\",ev=>ev.dataTransfer.setData(\"n\",String(st.n)))"* (nesi.html:557–559) — the browser's ghost-image drag, which no hand can steer mid-flight.
**The gesture:** every pick-up in the game feels like the same hand — press, carry, release — with the object under the finger the whole way. In minute one the player learns ONE verb, not two dialects of it.
**Smallest slice:** convert the dam-pool tile drag to pointer events; the merge and the descent then share one physics.
**Status:** LAWFUL-NOW (pure feel refit; no store change, no new rule).

## 3 · The sheet reads in its curve
**Craft law:** Difficulty is honesty — the fail state must be legible in the material's own conduct, never a guard rail.
**Tether:** the Cowan record holds the tear's precursor as already-visible material: *"Scorch and tear have visible precursors (the closed receiver, the dashed sheet)"* (nesi/game2d/BUILD_RECORD.md, Cowan gate-check).
**The gesture:** as the hand pulls the membrane toward an anchor, the sheet's own curvature deepens and its dash-line tightens with the pull — a fabric nearing its give. No marker, no permitted-range line, no color flip: the skill is reading cloth. First minute: pull once, feel the sheet answer, let go before it goes.
**Smallest slice:** curvature/dash driven by `r/REACH` in the membrane render (nesi.html ~741–750). Walked by hand to find the honest curve.
**Status:** LAWFUL-NOW — with the water-table rim's refusal named out loud so it is not eroded by analogy: the table's spec refuses any precursor (*"you read the lean"*); this idea deepens the membrane's EXISTING precursor and must not leak a warning line onto the table.

## 4 · Dwell burns, the sweep is safe
**Craft law:** The Zachtronics law — build the physics, never the answer; the player's skill is beam discipline, learned in the hand.
**Tether:** *"3.4 s continuous beam scorches the receiver shut — persists, nothing reopens on its own"* (nesi/game2d/BUILD_RECORD.md, stations list); the burn check at nesi.html:731.
**The gesture:** the mirror gains a breath of angular inertia — it swings, it settles. Sweeping the beam across a receiver on the way somewhere is safe by physics; only dwelling burns. The hand learns the difference between passing through and staying, which is the heliostat's whole lesson, taught by wrists instead of words.
**Smallest slice:** an easing term on mirror angle; BURN_AT untouched.
**Status:** NEEDS-KEVIN — the station constants are carried from world2d code as the authority (BUILD_RECORD, "What is carried"); adding inertia changes the carried physics rather than rendering it.

## 5 · Depth as duration
**Craft law:** Restraint is a mechanic — where a number is refused, time can carry the same truth and feel better than the number would.
**Tether:** *"The sounding: click ground, a line drops, one settled sentence is shown verbatim; player-initiated only; a sounding that finds nothing shows nothing"* (nesi/game2d/BUILD_RECORD.md, carried list; handler at nesi.html:648–651).
**The gesture:** the sounding line takes the time of the depth — thin ground answers almost at once, deep ground makes the hand wait as the line pays out. Density is read as patience, never as a value. First minute: two clicks on two grounds, and the difference arrives in the body.
**Smallest slice:** drop duration scaled from `S.grounds[i]`; the sentence still arrives verbatim, the wait is the only change.
**Status:** LAWFUL-NOW (law 2 clean; law 7 clean — nothing prompts during the wait).

## 6 · Reading through water
**Craft law:** Systemic depth over content volume — one new interaction between two EXISTING systems, never a new system.
**Tether:** the two systems, both built: *"a watered lens sends light up toward the room"* and the sounding shows *"one settled sentence… verbatim"* (nesi/game2d/BUILD_RECORD.md, SENTENCE-LENS + carried list).
**The gesture:** a sounding dropped where the lenses hold water shows the sentence through water — the verbatim characters unchanged, the light around them wavering slightly, the way a stone reads from a streambed. The player discovers, unannounced, that the water he sent is now between him and his own words.
**Smallest slice:** if `S.lensWater[i]` is nonzero at the sounding point, render the existing sentence with a subtle refraction on its surround (never on the letterforms' legibility). One conditional in the sounding render.
**Status:** LAWFUL-NOW — with the edge stated: law 4 requires the characters legible and untouched; the water may only surround, never distort past reading. If it costs one glyph, it dies.

## 7 · The seam under the thumb
**Craft law:** Teach through play, never through text — an affordance carried in the material is a lesson no one notices.
**Tether:** *"drag one onto another joins in WRITTEN order by n regardless of pick order; seams kept whole on the merged stone"* and *"Double-click breaks a coarse rock at its paragraph seams"* (nesi/game2d/BUILD_RECORD.md, R4).
**The gesture:** a merged stone's face carries its seams as faint hairlines — the same seams the store already keeps. The hand sees where a thing was joined, and double-click-to-break stops being a secret: the stone itself shows where it would give, the way split wood shows grain. First minute at a dam: one glance and the material has taught its own verb.
**Smallest slice:** render `st.seams` as hairlines on the pool tile face (nesi.html ~552).
**Status:** LAWFUL-NOW (renders existing store data; no count, no label, no advice).

## 8 · The feel-walk — the unwalked thresholds, ranked and crossed
**Craft law:** Playtesting is the only truth; where no hand has walked, name WHERE the feel-risk is and rank it.
**Tether:** the record's own confession: *"The four station acts were exercised through their functions and fail-state constants, not by hand-dragging each one; the drag feel is unwalked"* (nesi/game2d/BUILD_RECORD.md, edge of what was NOT checked).
**The gesture:** this idea IS a set of gestures: one sitting, one hand, crossing every threshold the constants define — the 26px spire mouths (nesi.html:762) under a real pointer, REACH=150 at real screen scale, BURN_AT=3.4s against real wrist speed, the descent drag past y=600, the double-click break. Ranked feel-risks first: (1) tetra descent drag, (2) spire-mouth hit size, (3) membrane pull distance, (4) beam timing. Constants tuned only where the hand says so; nothing else changes.
**Smallest slice:** the walk itself, in scratch, with the in-page `enterScratch()` door checked before any write (the breach on the record makes that check non-optional).
**Status:** LAWFUL-NOW (it is verification, the one work the record itself asks for first: *"First thing to do: open the file and look"*).

## 9 · The front door counted in gestures
**Craft law:** Onboarding is the first player's whole experience — count the distance to first consequence in seconds and gestures, not features.
**Tether:** *"(1) opens in a writing field, nothing precedes ✓"* (BUILD_RECORD, acceptance criteria) and the supersession: *"The sentence is the arrival: finish one and it banks as one stone, live, at the keystroke"* (nesi/game2d/BUILD_RECORD.md, supersession).
**The gesture:** the standing audit (eight-edit build, item 7) gains one more assertion, stated as a hand's path: from file-open, one typed sentence and one period must produce a visible consequence (water in the tetra) with ZERO intervening gestures — no click, no dismissal, no Esc required first. Any future addition that inserts a gesture before the first arrival fails the audit.
**Smallest slice:** one scratch assertion: simulate keystrokes from boot, assert visible water mass with no other event fired.
**Status:** LAWFUL-NOW (a regression fence around what is already true; sibling in spirit to Fuller idea 13 but guarding the front door, not the fail states).

## 10 · The release is a spectacle — protect the watch
**Craft law:** Restraint is a mechanic — after the one governed act, having nothing to do IS the design; the watch is the reward that isn't one.
**Tether:** *"Hold is the default and costs no click… the dam panel's release is the only governed act"* (BUILD_RECORD, carried list); DESCENT=3400, RUNOUT=2200 (nesi.html:111).
**The gesture:** click release, and the hand rests while the water goes down through the world — the descent must stay fully watchable from the room band through the glass with no panel occluding it and nothing clickable demanding attention until the sediment lands. First minute of a first release: the player's only job is to watch his own words travel, and the game must never give that minute a task.
**Smallest slice:** on release, the dam panel closes itself (lossless, per BUILD LAW 13) so the glass is clear for the fall; nothing else.
**Status:** NEEDS-KEVIN — a room closing ITSELF brushes the chassis contract ("waits-not-waits-FOR-you") and the no-animation taste line; the fork is whether the panel stepping aside is service or theater. Named, held open.

## 11 · Enter on empty is the rest gesture
**Craft law:** The loop is the game — a loop needs an exhale; great games give the resting gesture the same dignity as the acting one.
**Tether:** *"Enter banks what is held, finished or not; Enter on an empty line closes the run. Runs are invisible everywhere except the dam panel, where held stones group by sitting as spacing — no label, no number"* (nesi/game2d/BUILD_RECORD.md, supersession).
**The gesture:** the close-of-run keystroke gets a body: on Enter-on-empty, the field's next line starts a visible breath lower — paragraph air, nothing more. The hand that just closed a sitting feels the page acknowledge the close the way paper does: with space, not with speech.
**Smallest slice:** run-boundary spacing in the SEQUENTIAL face render; no text, no marker glyph.
**Status:** LAWFUL-NOW — with law 6's edge named: this is spacing on the page (the writer's own medium), not a confirmation of an act; if it reads as a chime-in-space, it dies.

## 12 · The cold open stays cold
**Craft law:** Teach through play — World 1-1 works because the first screen asks one motion; every later lesson waits for the world to be reached.
**Tether:** *"a caption strip along the bottom names whatever the cursor rests on"* (BUILD_RECORD, the teaching) — captions fire on hover from boot, including over the field itself (nesi.html:915).
**The gesture:** in the first minute, the writer's hands are on the keyboard, not the mouse — and the field's own caption is the only one that can fire without a deliberate mouse move. Idea: the field caption does not fire on the boot-resting cursor position; it fires only after the pointer has actually MOVED onto the field. The first screen is then truly silent until the hand asks, which is the teaching ruling's own line held to the letter: named on rest, never volunteered at boot.
**Smallest slice:** suppress the mouseenter caption until the first real pointermove.
**Status:** LAWFUL-NOW (tightens the museum-caption boundary; adds nothing).

---
Deposited by the DREAM vertex, game-craft counsel, THE PLAYER'S HAND. Read-only elsewhere; nothing above is marked; the freeze holds over all of it.
