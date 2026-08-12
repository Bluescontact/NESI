# THE GAME-CRAFT LIBRARY — GROUND — the craft ground as it stands

Written 2026-08-11 by the game-craft agent's GROUND vertex. Provenance-first:
every claim carries its quote and path. This file orders nothing — the freeze
holds; these are findings, not a work queue. Standing rulings (the PROTOCOLS
freeze, the twelve laws, the BUILD_RECORD rulings, the teaching ruling, the
supersession of the 100-word clock) are read with, never relitigated.

Primary bodies read in full: `nesi/game2d/nesi.html` (933 lines, the built
game), `nesi/game2d/BUILD_RECORD.md`, `nesi/spec/THE_FLOOR_2D.md`,
`nesi/world2d/scripts/store.gd`, `nesi/world2d/scripts/look.gd`, plus the
feel-constant grep across `nesi/world2d/scripts/*.gd`.

---

## 1 · THE LOOP AS BUILT — way in, act, consequence, way out

**Way in.** The file opens directly into writing — no title, no menu:
`openTetra();openFace("seq")` at boot under the comment *"the program opens in
a writing field; nothing precedes it. The field is SEQUENTIAL, a face of the
tetra"* (`nesi/game2d/nesi.html:925-929`). The floor spec's first criterion is
honored at the code's last line. Craft read: the front door is zero gestures
long — the first act of play IS the core verb (writing), which is the
Miyamoto condition met in the strictest possible way.

**Act 1 — the sentence arrives.** No word counting exists anymore: *"The
sentence is the arrival"* (`nesi.html:106-109`, carrying Kevin's supersession
ruling verbatim in BUILD_RECORD §"The supersession"). `bandCut()`
(`nesi.html:171-186`) fires live per keystroke past the watermark: a `.!?…`
cluster completes a sentence and banks a stone; a period between two digits
is inside a number (`nesi.html:178`); bare punctuation with no letter/digit
is not a sentence (`nesi.html:181`). Enter banks what is held unfinished;
Enter on empty closes the run (`nesi.html:188-197`). The page is never
cleared; deletion never un-banks (`nesi.html:166-170`).

**Act 2 — the tetra and the work-gate.** The tank IS the tetra seen small;
click opens the net: centre THE TABLE, around it BLIND · TILES · SEQUENTIAL
(`nesi.html:208-214`). The text is the water: mass = held stone characters +
the unbanked band, level `1-Math.exp(-mass/1400)` (`nesi.html:199-206`),
never a number. A stone becomes *worked* only by a hand-act — *"edit · merge
· line · break · place ... never by time or view"* (`nesi.html:144-145`).

**Act 3 — the descent.** One gesture: drag a worked stone down through the
writer's own node and release past it — `if(st.worked&&py>640){...S.descended
.push(st)}` with the comment *"through his own position, which is the point"*
(`nesi.html:261-262`). An unworked stone hangs: `if(!st.worked&&py>600){py=600}`
— *"an unworked stone hangs — it will not carry past the node"*
(`nesi.html:256`). No confirmation; the drag is the decision; descent order
IS the downstream order (`nesi.html:675-677`, oldest via `S.descended.shift()`).

**Act 4 — the station.** Each station presents one stone's three fixed
fractions (composition never derived from the words — carried from
`store.gd:51-64`) and the hand routes each chip by drag to a spire mouth, the
lake plate, or the bare plate — all three always drawn (`nesi.html:758-766`).
The station's act chooses the spire (lean / mirror / pull); at the filters the
hand routes directly (`nesi.html:795-796`).

**Consequence.** Sent water pools at the dam and *stays* — *"Holding is the
default and costs nothing"* (carried from `store.gd:239-241`). Release
(`nesi.html:616-636`): suspended → `S.grounds[i]+=0.055` and the stone
settles as sediment carrying the verbatim sentence; dissolved →
`S.lake+=0.03` and `S.lensWater[i]+=0.12`; bedload passes the frame to the
deep, never drawn. `S.cycles++` and the room's light rises:
`1-Math.exp(-(S.cycles+lens*2)/9)` (`nesi.html:493-498`). The first settle in
a region opens one naming line, once, never re-asked (`nesi.html:603-615`).
State lands the moment the hand lets go; every runout animation is *"display
only"* (`nesi.html:521-524, 620`).

**Way out.** Esc peels one layer at a time — panel, then face, then tetra,
then opens the tetra again from the bare world (`nesi.html:396-402`). Closing
a station mid-charge loses nothing: *"an unrouted stone goes back below the
node"* (`nesi.html:670`). Autosave every 2 s + blur + beforeunload with
pad-read-back-compare commit (`nesi.html:152-161`). Quitting is always safe
and never announced.

Craft read of the whole loop: the loop has genuine verb-pleasure candidates
at every station (lean, aim, pull, sort), consequence that persists without
announcement, and a way out at every depth. Its one structural novelty over
the field's canon is that the *revision of one's own words* is the XP-less
progression gate (worked/unworked) — behaviour as the carrier, no meter.

## 2 · EVERY GESTURE THE HAND MAKES, and what the hand learns from each

| Gesture | Where (nesi.html) | What the hand learns |
|---|---|---|
| Type; finish a sentence | 171-187 | the tank rises the moment punctuation lands — writing is materially consequential |
| Enter / Enter-on-empty | 188-197 | the hand can force an arrival, and silence closes a sitting |
| Click the tank | 392 | the small tetra and the big one are the same object |
| Esc (layered) | 396-402 | the world is a stack; leaving is always one key |
| Drag a stone in the net; set it down anywhere | 251-264 | *"a placed stone keeps its place — the record"* — placement is memory |
| Drag a stone onto the bare plate (net or dam) | 259-260, 640-647 | nothing happens; the absence is the feedback (law 6) |
| Drag a worked stone past the writer's node | 261-262 | descent runs through yourself; the release is the act |
| Drag an unworked stone down | 256 | it hangs — the world refuses without a word (law 10) |
| Click a stone tile to edit | 315-325, 567-579 | his words replace his words; editing is work |
| Drag tile onto tile (table / dam pool) | 326-332, 557-562 | merge joins in WRITTEN order regardless of pick order; seams kept |
| Double-click two stones (table) | 333-340 | a hand-made tie; both stones become worked |
| Double-click a coarse rock (dam pool) | 563 | it breaks at its paragraph seams, source kept |
| Open the stone's pane; write the mark | 357-381 | the mark is his own label, verbatim, and it too is work |
| Click a station symbol | 667, 672-682 | opens even empty — *"an empty tray is a lawful state"* (673) |
| Lean the tray (st0) | 703-715 | the lowest spout picks the spire; past level it slops — the rim is read, never marked |
| Turn the mirror (st1) | 716-737 | the beam picks; held too long, a receiver scorches shut for good |
| Pull the sheet (st2) | 738-756 | the well follows the pull; past reach it tears, heals on its own time |
| Drag each fraction chip (st3 and all trays) | 774-807 | the diamond sits, the disc wanders under the hand, the ring is empty — behaviour before colour |
| Click a dam | 529-540 | the pool opens; held stones lie visible as objects, never a count |
| Click "release" / "keep holding" | 616-637 | release is the one governed act; *"holding is not an action"* (637) |
| Click ground | 648-661 | a sounding line drops; one settled sentence returns verbatim; *"no bottom found: dark, and you learn nothing else"* (658) |
| Paste at the second mouth | 826-854 | not-your-words enter as one coarse rock, source immutable from entry |
| Type a region's name (once, after first settle) | 603-615 | naming is his; blank stays nameless lawfully |
| Hover anything | 889-924 | a museum caption names it — teaching, never advising |

## 3 · EVERY FAIL STATE — physics or guard-rail

All three fail states route to the deep through the same honest gate at chip
release (`nesi.html:797-799`):

- **Slop-over** — `if(st===0&&Math.abs(S.lean)>RIM)dest="deep"` (797), RIM=1.0
  (`nesi.html:111`; source `water_table.gd:15` *"tilt beyond this and it goes
  over the edge"*). **Physics** — the tray's own tilt obeyed. The lean
  persists across sessions (`S.lean` saved). No warning line, by spec law —
  the collision with the Cowan floor rule is on the record
  (BUILD_RECORD §"The Cowan gate-check"), not relitigated here.
- **Scorch** — beam held >BURN_AT 3400 ms on one receiver: `S.scorch[k]=true`
  (731); a scorched receiver *"passes it through, doing nothing it can keep"*
  (798). **Physics**, and permanent — *"nothing reopens on its own"*
  (BUILD_RECORD). Legible shut from outside the room (`nesi.html:483-492`).
- **Tear** — pull past REACH 150: `S.tornAt=Date.now()` (750); a torn
  membrane holds nothing for RELAX 7000 ms of *wall clock* (741), healing on
  real time — the cross-session clock defect found and fixed
  (BUILD_RECORD §Cowan gate-check). **Physics**, self-healing, unannounced.
- **The filters have no fail state** — *"no act chooses for you here"*
  (`nesi.html:694`). Deliberate: the one station that is pure hand.
- **The unworked hang** (`nesi.html:256`) is not a fail state and not a
  guard-rail in the punitive sense: it is a structural gate rendered as
  behaviour — the stone will not carry, and nothing says why. Roguelike-law
  check: legible as fair only if the hand ever connects "I edited it" to "now
  it carries." That legibility currently rests on two TEACH captions
  (`nesi.html:895, 898-899`).

Verdict under the difficulty-is-honesty law: every loss is the system's own
physics obeyed. No punishment, no guard rails, no fake fail state. The one
honesty defect found is in §6 risk 4 (the scorch clock only advances while
the pointer moves — see dispositions).

## 4 · THE TEACHING LAYER AS BUILT

Kevin's ruling (BUILD_RECORD §"The teaching"): *"The game can teach the user
how to use it"* — after his first walk hit the silence wall (*"I dont
understand anything you've built or how it functions"*). The line held:
teaching names the world and its mechanics; never advises, never scores,
never reads his material. As built:

- A caption strip (`#teach`, `nesi.html:50, 892-924`) names whatever the
  cursor rests on — 15 captions in the `TEACH` table (`nesi.html:894-909`),
  each a museum caption: name + act + fail state, no imperative beyond the
  act's own grammar.
- Every station panel opens with its name and one-line act
  (`nesi.html:691-696`) and labeled targets: *"the three spires — left ·
  middle · right"*, *"the lake"*, *"set it down"* (697-699).
- The dam's two acts carry words: "release" / "keep holding" (`nesi.html:74`).
- `pointer-events:none` on the strip (`nesi.html:50`) — the teaching can
  never be clicked, only read. It occupies no gesture.

Craft read: this is World 1-1 rebuilt for a silence-law game — the lesson is
attached to attention (hover), not to time or progress, so it can never nag
and never gates. The one teaching gap: captions are hover-only, so on any
touch device the entire teaching layer is unreachable (see dispositions).

## 5 · THE SIX FLOOR_2D ACCEPTANCE CRITERIA — verbatim, with status

Source: `nesi/spec/THE_FLOOR_2D.md:87-99` ("Acceptance criteria, all six
required"). Status from BUILD_RECORD §Verification (checked there against the
pre-supersession build) plus this reading of the current file.

1. *"The program opens in a writing field. Nothing precedes it."* — **MET**;
   re-verified in the current code (`nesi.html:925-929`, boot opens
   SEQUENTIAL).
2. *"Text survives a force-quit mid-sentence, and nothing on screen says
   so."* — **MET**; autosave 2 s + blur + beforeunload, pad-commit
   (`nesi.html:152-161`); no saved-indicator exists anywhere.
3. *"Writing visibly fills the tank without displaying a number."* — **MET**;
   mass-derived height only (`nesi.html:199-206`).
4. *"One station (the filters) opens, is operated by hand, and offers all
   three exits. The other three render as objects and say their game is not
   built."* — **MET AND EXCEEDED**: all four stations are built with acts and
   fail states; the second clause ("say their game is not built") is
   superseded by the build itself and by the teaching ruling. The floor spec
   remains *"Unmarked. Kevin's to mark"* (`THE_FLOOR_2D.md:3`) — this file
   does not mark it.
5. *"Water sent to a spire is visibly at that spire's head, through the
   glass."* — **MET** per BUILD_RECORD verification; currently the visible
   read is the pool and held stones at the dam (`nesi.html:419-431`) plus the
   in-flight droplet from head to dam (`nesi.html:524`).
6. *"Quit and reopen: the tank level, the spire contents, and the text are
   all where they were."* — **MET** per BUILD_RECORD (*"page reloaded —
   writing, ground, lake, cycle, sediment, light all where they were"*).

Also standing from the spec and honored: *"If any box is unticked the floor
is not set"* — all six tick; and Stage One's completion sentence (*"write on
Monday, return on Friday, and see that the ground is different — with nothing
on screen having told them so"*) is structurally in place except that no
multi-day hand has walked it (§7).

## 6 · THE PROVEN WORD RANGE

BUILD_RECORD §"The standing water": *"a 2000-word day → 20 intervals banked
... all 20 sentences settled exactly once"* and *"The 100-word day was
already proven. The full range cycles."* — **100–2000 words proven**, in
scratch, end to end, under the interval regime. NOTE: the supersession then
removed the word clock entirely; the current arrival is per-sentence. The
2000-word proof therefore carries forward as a *throughput* proof (twenty
charges in one sitting, tray refill, no water left behind,
`nesi.html:810-821`), not as a proof of the exact current banking path. The
post-supersession verification (BUILD_RECORD §supersession) exercised the
sentence path but not a full 2000-word day under it. No hand has typed 2000
real words into the current build.

## 7 · FEEL-CONSTANTS FOUND, with provenance

The single constants line of the built game — `nesi/game2d/nesi.html:110-111`:

- `TANK_CAPACITY=12` — rendering ceiling only, not a banking limit
  (nesi.html:108-109; origin `store.gd:65`)
- `DAM_AT=0.46` (origin `look.gd:30` *"how far down the spire the dam
  sits"*) · `GROUND_AT=0.42` (origin `look.gd:122`, ground lerp toward centre)
- `DESCENT=3400` ms (origin `world_view.gd:14` *"seconds head → dam. Slow,
  so the head is seen."* — 3.4 s) · `RUNOUT=2200` ms (`world_view.gd:15`)
- `BURN_AT=3400` ms (origin `heliostat_panel.gd:26` *"seconds of continuous
  beam a receiver can carry"*)
- `RELAX=7000` ms (origin `membrane_panel.gd:20` *"seconds a tear takes to
  close"*) · `REACH=150` (origin `membrane_panel.gd:19` *"how far the pull
  can travel before it opens"*)
- `RIM=1.0` (origin `water_table.gd:15`)

Feel curves and sensitivities living only in nesi.html:

- Water mass → level: `1-Math.exp(-mass/1400)` (nesi.html:202, 227) — the
  1400-character half-feel constant has no world2d ancestor; it is this
  build's own.
- Light: `1-Math.exp(-(S.cycles+lens*2)/9)` (nesi.html:495; the /9 from
  `store.gd:294`; the `lens*2` term is the sentence-lens addition).
- Tray lean: `±1.4` clamp, `/220` px-per-unit drag, `±0.2` spire dead-band,
  `lean*14`° visual rotation (nesi.html:711-713).
- Mirror: `/300` px drag over 0..1, `(mirror-.5)*70`° rotation, receiver
  bands at `<0.34 / >0.66` (nesi.html:727-729).
- Descent gate geometry: hang clamp `py>600`, carry release `py>640`, writer
  node at y=630 in a 1000×700 viewBox (nesi.html:219, 256, 261).
- Suspended chip wander: `sin(t)*7 / cos(t*.7)*4` at 60 ms tick
  (nesi.html:783; origin `look.gd:141-145`, wander 7.0).
- Fraction fall rates: bed 1.9 · sus 0.55 · dis 1.15 (nesi.html:500-502;
  verbatim from `look.gd:134-138` — *"Bedload sinks fast and true; suspended
  hangs and wanders; dissolved slips through quickest of all but leaves
  nothing"*).
- Sounding: line visible 900 ms, caption 6000 ms (nesi.html:654, 660).
- Autosave 2000 ms (nesi.html:159; origin `store.gd:18`). The world2d
  debounce lesson — *"a scan per keypress is not [imperceptible]"*
  (`store.gd:112-121`, 0.35 s debounce) — was NOT carried: `bandCut` runs on
  every input event (nesi.html:187). It scans only past the watermark, so the
  cost is bounded, but the long-single-sentence case is unmeasured.

## 8 · THE UNWALKED EDGES — where no hand has tested

BUILD_RECORD's own edge declarations, still true:

- *"the descent drag was verified by emulating its release condition, not by
  a pointer trace; the net's drag-feel — the hang of an unworked stone in the
  hand — is unwalked, and it is the part built most directly for the hand"*
  (§writing tetra, Edge).
- *"The four station acts were exercised through their functions and
  fail-state constants, not by hand-dragging each one; the drag feel is
  unwalked"* (§edge of what was NOT checked).
- *"No screenshot could composite ... First thing to do: open the file and
  look"* (same section).

This reading adds, from the code:

- Kevin's one recorded hand-walk (*"I see 5 symbols. i cant click on any of
  them"*) predates the tetra, the teaching, the supersession, and the
  eight-edit build. **No hand has walked the current game at all.**
- Never pointer-walked: the descent drag window (§dispositions risk 1) · the
  unworked hang wall (risk 2) · chip drop zones vs the drawn plates (risk 3)
  · the scorch under a steady hand (risk 4) · HTML5 tile-drag merge at the
  dam and table · the second-mouth pane · the region-name input appearing
  under the hand mid-flow · the stone pane · a multi-day return (Stage One's
  own completion sentence) · everything on touch (all captions and all
  hover-teaching are mouse-only) · the sounding at world edges.
- The audit (`auditRooms`, nesi.html:872-888) is scratch-only and structural;
  it proves rooms open on empty, not that any gesture feels right.

The craft law that governs all of §8: *"Playtesting is the only truth. No
design survives contact with a hand."* The game's most hand-directed
mechanism (the descent through the writer's own position) is precisely its
least hand-verified.
