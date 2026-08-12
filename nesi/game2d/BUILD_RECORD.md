# NESI — the 2D deposit · BUILD RECORD

Built 2026-08-11 on Kevin's marks: *"run it — full license as written"* (caught 14:58),
per the ea577b32 manifest. One file: `nesi.html` — self-contained, no network, no model
call, localStorage only, playable by opening the file. This record names every
provisional call, every law checked, and the edge of what was verified.

## Lineage

The harvest found a 2D build already standing: `THE_FLOOR_2D.md` (unmarked, "Kevin's to
mark") and live authority code in `nesi/world2d/scripts/` (`store.gd` declares
WORDS_PER_INTERVAL=100 THE AUTHORITY). This deposit **sites onto that lineage rather than
inventing one**: geometry, constants, laws and station physics are carried from
`store.gd` / `look.gd` / `THE_FLOOR_2D` wherever they exist. It is an integration of the
articulations, not a rival design.

## What is carried, from where

- 100 words per interval · tank capacity 12 · level rendered 0..1 only · full tank lawful
  and unannounced · deletion never un-banks (`store.gd`)
- Fixed charge composition — never derived from the words; words counted only to know an
  interval passed, and the count never reaches the screen (`store.gd` law 4/2)
- Three fractions by behavior: bedload sinks fast → the deep · suspended hangs, wanders →
  ground (+0.055) · dissolved passes through → lake (+0.03); direct lake drop +0.04;
  behavior first, shape second, color last (`look.gd`)
- Triangle world, point up: three regions, spires as edges, dam at 0.46, ground lerp 0.42
  toward center, rivers to the central lake, the deep off the bottom of the frame —
  never drawn (`THE_FLOOR_2D`, `look.gd` — APEX/LEFT/RIGHT rescaled to the 596-px world zone)
- Room band above · glass strip · world below; both zones always visible; the writing
  sheet lies over the world and never over the room; Esc lays it aside and brings it back
- Four stations, each choosing WHICH SPIRE, three outputs always on screen:
  water table (lean the tray; slop-over past the rim → the deep; the lean persists) ·
  heliostat (turn the mirror; 3.4 s continuous beam scorches the receiver shut — persists,
  nothing reopens on its own) · membrane (pull the sheet; past reach it tears; heals in
  its own time, 7 s, and nothing asks you to wait) · filters (fractions pre-separated;
  the hand routes) — fail-state constants from the world2d code (RIM 1.0 · BURN_AT 3.4 s ·
  REACH 150 · RELAX 7 s)
- Hold is the default and costs no click — water that arrives at a dam simply stays; the
  dam panel's release is the only governed act; shutting the panel is not an action
- Set-it-down: the bare plate; the function does nothing else — no destination, no
  animation, no confirmation, no counter
- The sounding: click ground, a line drops, one settled sentence is shown **verbatim**;
  player-initiated only; a sounding that finds nothing shows nothing
- Light rises: room brightness = 1 − exp(−cycles/9); dark until the world has cycled
- The sentence cut rule, character-for-character from the D5 regex
- Persistence: whole text written every time, autosave 2 s + blur + close, per-day key,
  no saved indicator, no last-saved field
- Silence law: no number, label, tooltip, prompt, hint, or acknowledgement anywhere;
  the only text on screen is the player's own

## The twelve laws, checked

1. Three outputs at every station — three spire mouths, the lake plate, the bare plate,
   always on screen. ✓
2. No number reaches the player — tank is a fill height, pools are ellipse size, ground is
   density, light is brightness; no digit, bar, or count renders. ✓
3. No model call — no network calls exist in the file; it runs from `file://`. ✓
4. Words never rewritten — sediment and soundings are verbatim slices; nothing parses for
   meaning. ✓ (charge composition fixed, per store.gd)
5. The hand runs the filter — every routing is a drag by the operator; no computed pass. ✓
6. Set-it-down — no destination, no animation, no confirmation. ✓
7. Held is lawful — a full tank, a held pool, an untouched field: no nag anywhere; hold
   costs no click. ✓
8. Runs while you're in it, stops when you leave — no timers advance state while away;
   scorch/tear/lean persist as they were; a hidden window freezes (rAF stops). ✓
9. The deep never renders — bedload's runout exits the frame; deep-routed fractions are
   removed with no drawing. ✓
10. Colour never the only carrier — diamond sits, disc hangs and wanders, ring is empty;
    shape and motion carry the distinction. ✓
11. Nothing reaches outward — no telemetry, no fetch, localStorage only. ✓
12. Quitting mid-sentence loses nothing — state lands the moment the hand lets go (a
    defect found in verification and fixed: fractions used to exist only in the animation);
    autosave covers the text. ✓ (nothing on screen says so. ✓)

## Provisional calls, under the license — every one reversible, none silently law

- **g1 · rooms/windows format:** PROVISIONAL — station panels use the 2D build's own
  form (a panel over the world, closing back to it), drawn in the register of the world.
  If the artifact you meant is another format, one word replaces this.
- **g2 · net vs entry-tetra:** PROVISIONAL — the screen is `THE_FLOOR_2D`'s single
  triangle: the flat projection of the solid's three inner faces, the outer triangle the
  fourth. One tetra containing the whole at every level — the entry-tetra line is honored
  by the floor spec's own geometry; the cuboctahedron stands as the containing frame,
  unrendered. The recorded collision in PROTOCOLS is NOT declared reconciled by this;
  the build simply sites on the floor spec, which predates the collision.
- **g3 · the live hold:** PROVISIONAL — quiet-alive: a held pool is visible and grows
  (the water level is the readout, a fact about water); fractions do not transform while
  held. Between the branches, nearer inert; a one-word ruling moves it.
- **g4 · what finished means:** PROVISIONAL — built to first-user-walkable, measured by
  THE_FLOOR_2D's six acceptance criteria (see verification). Complete-on-giving stays
  yours to rule.
- **Fractions: three, not four** — following `store.gd` (the authority) and `look.gd`.
  The fourth (contaminant = transactional language being enforced, RULED) has no code and
  no behavior anywhere in the corpus; enforcing it mechanically would need a classifier,
  which law 5 forbids. Recorded as ruled-but-unsited, exactly as the corpus holds it.
- **Persistence fork:** branch A provisional — ground accumulates, pure record, nothing
  heals. **Downstream agency:** only the player. **Withdrawal:** total — leaving mid-hold
  releases nothing, owes nothing.
- **Spires unnamed** — GROWN/GIVEN/WOVEN was offered in the corpus as a fork, not ruled;
  the three spires here carry no names and are not compared.
- **The four diagonals stay interchangeable** — nothing in this build fixes a seam axis.
- **The floor-check finding (the blank field as unread clause) is NOT solved here** — the
  field is silent, per the refusals; the cost-visibility question from the Cowan reading
  stays open and is not smuggled closed.

## Verification — what actually ran

- Opened in the in-app browser from `file://`. No console errors.
- Intake: 105 typed words → one interval banked → tank rose (rendered as height only).
- Full loop through the real handlers: charge to filters → three fractions routed to
  spire 0 → pool held 3 → dam release → ground +0.055, lake +0.03, cycle 1, sediment
  carrying the verbatim sentence, room brightness rgb(74,67,54) → rgb(86,77,61).
- Persistence: page reloaded — writing, ground, lake, cycle, sediment, light all where
  they were; tank at empty height as left.
- THE_FLOOR_2D's six acceptance criteria: (1) opens in a writing field, nothing precedes ✓
  (2) text survives quit mid-sentence, nothing on screen says so ✓ (3) writing visibly
  fills the tank, no number ✓ (4) stations open, hand-operated, three exits ✓ (5) routed
  water visibly at the spire head through the glass ✓ (6) quit and reopen, everything
  where it was ✓.
- State reset to a clean slate after testing — your first open is a blank field.

## The Cowan gate-check — findings and what was done with them

The stuart-cowan agent ran its filters and floor check against the code. Its findings,
and the disposition of each:

- **Mid-station charge loss (law 12 breach) — FIXED.** A charge being worked lived only
  in a variable; quitting mid-station lost it. Now the working charge persists
  (`S.working`), and on the next open it comes home to the tank.
- **Tear clock wrong across sessions — FIXED.** `tornAt` stored a session-epoch time;
  a saved tear could read torn for as long as the previous session ran. Now wall clock;
  a tear heals on real time.
- **The water-table rim has no visual precursor — RECORDED, NOT FIXED.** The spec's own
  law refuses it: *"the table gives no warning line and no permitted-range marker; you
  read the lean."* The Cowan floor rule (cost visible at the moment of choice) and the
  spec's refusal collide here; the spec governs, the collision is on the record.
- **Silent deep-routing at scorch/tear/slop — RECORDED.** Scorch and tear have visible
  precursors (the closed receiver, the dashed sheet); the vanishing chip is the world
  receiving it. Held as designed; the collision with the floor rule is noted, not smoothed.
- **Single localStorage key, silent catch — RECORDED.** Nothing may announce a save or a
  failure (silence law); the risk that a cleared browser store loses the world is real
  and is the cost of law 11 (local files only, nothing outward). Named here so the cost
  is not invisible to YOU, the operator of the build.
- **A full tank swallows an interval's sentences — RECORDED.** Per store.gd the interval
  banks and the vessel is simply full; the words-to-water loss at the brim is the
  standing reading of that law, not this build's invention.

## Patch — 2026-08-11, after Kevin's first walk

His report: *"I see 5 symbols. i cant click on any of them. nothing has a single label."*
Two real defects and one articulation came out of it:

- **The panel opened under the writing sheet** — the sheet was the top layer, so every
  station panel was invisible and unclickable. FIXED (z-order). This was the whole
  "can't click" experience.
- **A station with an empty tank refused to open** — lawful silence, unwalkable in
  practice. Now every station opens; an empty tray is a lawful state you can stand in.
- **The sheet now ghosts** (80% instead of 94%) — the world is visible beneath the
  writing, so the triangle, the dams, and the ground are discoverable without being told.

**THE SENTENCE-LENS — Kevin's articulation, built in the same pass.** His words: each
sentence is a load-bearing node with a linear axis of expansion and contraction,
attachment points at each end; a sentence as an anchor holds up the vertex of an
upward-facing tetra; the four points define the shape, size and depth of a parabolic
curve; that lens can hold water, grow through nutrient deposition, or stand in a field
as part of a heliostat. As built: every settled sentence renders as its own axis
(length from the sentence's own length) with endpoint attachments, an upward tetra
profile, and a parabola whose depth grows with ground deposition; dissolved water
passing through a region fills its lenses; a watered lens sends light up toward the
room — the lenses ARE part of the heliostat, and the return flow now runs through the
player's own sentences. Provisional under the license: the dissolved fraction now
feeds both lake and lenses (a split of look.gd's single destination — reversible).

## How to walk it (told here, once, outside the game — the game itself stays silent)

Esc lays the writing sheet aside and brings it back. Words become water at every
hundredth word; the tank fills. Click a station symbol to open it; drag a fraction to a
spire mouth, the lake plate, or the bare plate. Click a dam to release what it holds.
Click ground to drop a sounding line.

## The latent pass, pulled in — 2026-08-11, Kevin's grant

His instruction: pull everything from the latent pass ("The latent pass: NESI
integration", session d7849359 · its body: the world2d intake, PROGRESS_2026-08-10,
LEXICON_CANDIDATES) into this workspace — and *"The cowan agent has the ability to make
design decisions in this process without needing kevin to articulate it."*

**The Cowan rulings, made under that grant** (each named at the moment of choice):

- **R1 · The cut, adopted split-by-surface** — the field stays the sequential sheet (no
  cut while typing); the intake's full cut fires at the interval bank: bare `.`/`…`
  with no letter/digit is not a sentence, a period between two digits is not an ending.
  Stones replace slices: `{n, text, kind, who, asked, run, stage, seams}`, n monotonic,
  never rendered.
- **R2 · Sources exist; NO SPIRE MAPPING — fork closed under the grant.** Self is the
  field; given/fetched enter through the second mouth (paste + who/asked by hand, one
  coarse rock, kind immutable from entry; the file itself never fetches). Source is a
  property of the water, a spire is a place; mapping them would make spires comparable
  categories. Spires stay unnamed. Texture carries source (self smooth · given banded ·
  fetched stippled), colour redundant.
- **R3 · THE THREE DISPOSITIONS = the three outputs, unified on `stage`** —
  sent=spire · dropped=lake · down=bare plate; plus store-internal merged/settled.
  One vocabulary from here on.
- **R4 · The merge enters at the dam pool** — held stones sit visible as tiles; drag
  one onto another joins in WRITTEN order by n regardless of pick order; seams kept
  whole on the merged stone; differing sources all ride the face; no unmerge control
  (Kevin's, kept decidable at zero cost by the seams). Double-click breaks a coarse
  rock at its paragraph seams, source kept.
- **R5 · The world's geometry governs; the tarp's laws transfer** — landed never lifts
  (settled text immutable, no code path writes it) · a region is nameless until
  something lands, then ONE naming line opens for his hand, once; blank stays nameless
  lawfully · outward only, single pass.
- **R6 · One-writing binds at the settling seam — fork closed under the grant.** With
  one visible face per stone, held-arrivals collapse into direct edit pre-settle;
  settling is the taking, and after it nothing propagates into ground. The `arrival`
  key is the mechanism if a second face ever exists.
- **R7 · Carried undroppable:** the scratch door (`?scratch=1` → empty scratch key —
  the machine never writes the live store; all of this session's verification ran in
  scratch and the live key was never opened) · the safe write (pad → read back →
  compare → commit; a bad write never destroys a good file) · append-shape-only
  migration of old saves · kind/who/asked machine-immutable · nothing says saved,
  nothing counts, stone numbers are names.

**Verified in scratch:** cut exclusions (3.14 held whole; a bare ellipsis is not a
sentence) · stones bank with shape `{kind:"self", stage:"held"}` · routing stamps
sent/dropped/down · a reversed-pick merge joined in written order with seams [1,3] ·
a given rock broke at its paragraph seam with source kept · release settled stones as
stage "settled" · the region ask opened once, took "the far bank" verbatim, and will
never re-ask · cycles and lens water moved · the live store untouched throughout.

**The lexicon debt — DISSOLVED by Kevin's line, 2026-08-11:** *"i'm willing to abandon
any and all naming if it's not load bearing. The intake surfaces, and text editing
features still remain the upstream keystone of all downstream pages, and games."*
Recorded at the top of LEXICON_CANDIDATES_2026-08-10.md: load-bearing words stand
(intake · stone · seam · held · down · the sources — each binds a rule the code
enforces); cosmetic renames abandoned; the six collisions stop being debts. A word
comes back singly only if a build breaks on it.

**THE KEYSTONE RULING, same line:** the intake surfaces and text editing remain
upstream of every downstream page and game. Applied in this file: the pre-settle EDIT
is now real — click a stone in the dam pool and it opens under your hand; your words
replace your words; kind/who/asked stay machine-immutable; settling remains the
taking. The field (sequential sheet), the second mouth (given/fetched), and the pool
edit together are the intake living inside the game — the game is downstream of them,
never the other way.

## The standing water — 2026-08-11, Kevin's mark "build the standing water"

The throughput slice, built and proven. (1) **The standing water:** intervals banked
above the tank's brim queue unseen and flow in as the tank drains — store.gd's "banked
so nothing bursts later" read as LATER MEANS IT ARRIVES. No word is swallowed; nothing
announces the refill; the tank simply keeps filling on a full writing day. (2) **The
tray refills in an open station:** route a charge and the next loads without closing;
the closer still leaves anytime; an empty tank closes the panel quietly on its own.
A defect found and fixed in verification: one paste banking many intervals used to
duplicate the tail sentences into every charge — new sentences now split contiguously
across the new intervals, each stone existing exactly once.

**Verified in scratch, end to end:** a 2000-word day → 20 intervals banked, 12 in the
tank + 8 standing → twenty charges worked in ONE open sitting at the filters, tray
refilling from tank and standing water → no water left behind, panel closed quietly on
empty → three dams released → all 20 sentences settled exactly once (20 unique stones)
→ three cycles of light, the room warm. The 100-word day was already proven. The full
range cycles.

## The teaching — 2026-08-11, Kevin's ruling: "The game can teach the user how to use it"

His first walk hit the wall the silence law built: *"I dont understand anything you've
built or how it functions... i cant walk through it without the symbols having labels."*
His ruling amends the reading: the game may TEACH. The line held: teaching names the
world and its mechanics; it never advises, never scores, never reads or mentions what
he wrote. A museum caption, not a coach.

As built: a caption strip along the bottom names whatever the cursor rests on — the
tank, each station and its act and its fail state, the second mouth, a dam, the ground
and its lenses, the lake, the field itself (including Esc and the hundred-word fact).
Every station panel opens with its own name, its act in one line, and its targets
labeled (the three spires · the lake · set it down). The dam's two acts carry words:
"release" and "keep holding." The refusals stand untouched everywhere else — nothing
prompts, nothing points at what deserves attention, nothing speaks about his material.

Verified: captions fire and clear on hover, panels name themselves and their targets,
the dam speaks plainly — all in scratch, live store untouched, scratch cleared after.

## The supersession — 2026-08-11, Kevin's ruling, the clock is dead

His ruling, verbatim: *"the 100 words increment is superseded by the intake and writing
surfaces made in the nesi integration session. Thats the most current iteration.. and it
hasn't been developed by the cowen agent. The workshop and tool are here. we have
everything we need. Cowen can fill in the gaps once he's sufficiently aligned, and
calibrated to the output required."*

The Cowan agent calibrated first — read the intake's field and store code in full — then
ruled (S1–S6), and the build followed:

- **The clock is removed, not bypassed.** WORDS_PER_INTERVAL, the word count, and the
  interval charge are gone from nesi.html. Nothing in the file counts words — which is
  also the cleaner reading of law 2. **The sentence is the arrival**: finish one and it
  banks as one stone, live, at the keystroke, by the band's exact cut (punctuation
  cluster completes; a period between two digits is inside a number; bare punctuation is
  not a sentence).
- **The watermark.** The page is never cleared; banked text stays visible and the
  watermark moves past it. Deletion never un-banks — editing behind the watermark
  changes the page only. The stone is the water that already left; the page remains his
  record. This boundary is the one place a cost could hide, so it is named here and the
  world shows it: the stone's water is visible in the tank and ground.
- **Enter** banks what is held, finished or not; **Enter on an empty line closes the
  run.** Runs are invisible everywhere except the dam panel, where held stones group by
  sitting as spacing — no label, no number.
- **The charge is the stone.** A station presents one stone's three fixed-composition
  fractions (law 4 survives: composition never derived from the words); the sediment
  that settles carries exactly that stone's sentence. Sentence → fractions → spire →
  sediment → lens, with nothing blurring whose words went where. The machine picks only
  order (oldest first).
- **The tank's capacity is a rendering ceiling, not a banking limit.** Nothing is ever
  swallowed; the standing water folded into the tank; the level is height only.
- **world2d's store.gd "100 WORDS IS THE AUTHORITY" note** is superseded on this record
  but NOT edited at source — it is out of this deposit's write scope. One word from
  Kevin strikes it there.

**Verified in scratch:** no bank before punctuation · "The water waits." cut exactly ·
3.14 held whole · an ellipsis cluster taken with its sentence · Enter banked an
unfinished thought · Enter on empty closed the run · deletion changed nothing · a
station took one stone and its exact sentence settled as ground · the tray refilled ·
one cycle of light. Live store untouched; scratch cleared.

## The writing tetra — 2026-08-11, Kevin's design, Cowan's rulings T1–T6

His words, caught verbatim on the ledger: the 4-face writing surface built inside the
tank; the user as the bottom node; each word filling the tetra upward; 3 edges, 6
relationships, 4 faces generated and worked independently; only worked words descend to
the stations. Placement and spec handed to the process; his deployed four-face room at
oursharedgifts ("Four faces. Nothing here reads you while you're away") went to Cowan
as the produced format.

**As ruled and built:**
- **T1** — the tank IS the tetra seen small (water visible inside it in the room band);
  click opens the full net: centre triangle plus three surrounding, four faces, in this
  world's own geometry. The fold-back is a wordless triangle; the room keeps its shape.
- **T2** — the four faces are the intake's four, no invented names: centre **THE TABLE**
  (the centre touches all three others, which is what the table is), around it
  **BLIND · TILES · SEQUENTIAL**. Face-names, not vertex-names; 4·6·4·1 untouched; the
  centre-of-the-form stays un-nameable. All four are views of the one store.
- **T3** — the writer is the bottom node, drawn and unnamed; **the text itself is the
  water** — held stones plus the unbanked band as mass, derived each frame, never
  stored, never shown as a number. The water visibly rises as he types.
- **T4** — **worked is an act of the hand**: edit · merge · line · break — never time,
  never a glance. The gate is structural: an unworked stone hangs at the node and will
  not carry past it (behaviour as the carrier, law 10 — no text refuses him).
  Unworked forever is lawful; nothing prompts.
- **T5** — buildable now: the **line** (double-click two stones on the table ties them;
  a hand-made relation) and the net's drawn edges, present and unlabeled. NAMED AND
  HELD, not built: the six relationship-surfaces as workable instruments, per-edge
  mechanics, anything generated from the words (the standing unentered fork stays shut).
- **T6** — the descent is one gesture: drag a worked stone down **through the writer's
  own position** and release. No confirmation; the drag is the decision. Descent order
  IS the downstream order — the machine no longer picks even by arrival.

**What died:** the freestanding writing sheet over the world (SEQUENTIAL is a face
now, and the program still opens on it — the tetra opens onto the field); the tank as
a plain vessel; FIFO-by-arrival at the stations.

**Verified in scratch:** a sentence banked from SEQUENTIAL born unworked · the edit on
TILES marked it worked and took his words · BLIND banked "A blind sentence leaves." and
kept "and remains" on the line · the TABLE merge produced a worked stone with seams ·
the station drew ONLY from the descended water and the settled ground carried exactly
the worked sentence · one cycle of light. Boot opens the tetra on SEQUENTIAL — the
program still opens in a writing field, nothing precedes it.

**Edge:** the descent drag was verified by emulating its release condition, not by a
pointer trace; the net's drag-feel — the hang of an unworked stone in the hand — is
unwalked, and it is the part built most directly for the hand.

## The eight-edit build — 2026-08-11, the resynthesis made real

Kevin's mark: "run the eight edit build." Fork provisionals as built and stated: FK2
all-visible — **RULED by Kevin 2026-08-11: "all held stones visible — depth-zero
governs." No longer provisional; the dam panel shows everything it holds, as law** ·
FK3 — **RULED by Kevin 2026-08-11: "one chassis, dam stays a flagged variant."** One
room species; the dam carries the governing flag; no second chassis unless a future
mark says otherwise · FK4 — **RULED by Kevin 2026-08-11: "gaps only — the form stays discovered."** The world
names only its unnamed regions; the six unbuilt edges stay undrawn until earned · FK1 — **RULED by Kevin 2026-08-11: "names land by recognition, edge by
edge."** The six road-names stand as vocabulary only; a name attaches when an edge's
built behaviour recognizes it, never in advance.

**As built:** (1) the room chassis as registry + audit — nine rooms under one contract:
one job, readable before opening, over the world, lossless close, set-down furniture,
empty state costless (BUILD LAW 13), waits-not-waits-FOR-you; (2) all nine refit under
it, the dam flagged; (3) threshold reads as behaviour — the held stones lie VISIBLE
through the glass at each dam as objects (never a count), and a scorched receiver is
legible shut from outside the room, on the station's own face in the band; (4) stones
as terrain — a stone placed in the tetra keeps its place; the set-down position IS the
record, persisted; (5) refusal furniture — the bare plate now stands in the tetra's net
and at the dam panel; drop a stone on either and it is set down, sent nowhere, nothing
else happens; (6) terra incognita — an unnamed region owns its absence as a small
dashed empty box; the six unbuilt edges stay undrawn (FK4); (7) the two-test audit runs
in scratch: all eight openable rooms open on empty without error or demand, and no
demand primitive exists in the page; (8) this record.

**A BREACH, NAMED:** during verification the machine wrote the LIVE store. The browser
pane strips both query and hash from file: URLs, so the ?scratch=1 door was silently
absent and the first test run's writes landed in nesi2d — the exact failure the
never-write-the-live-store law exists to prevent, arriving through a door that failed
toward live. Kevin's writing was never touched (S.writing preserved throughout); the
test residue (a test stone, test pools, a test scorch, cleared region names) was
removed and the store reset around his writing. Whatever play-state existed between the
last clean reset and this test was lost, and that loss is on this record. THE FIX: the
door is now in-page — `enterScratch()` — and a harness must call it and CHECK ITS
RETURN before any write; the final verification re-ran in true scratch and proved the
live store untouched by reading it back clean afterward.

## The retired-3D cluster wiring — 2026-08-11, Kevin's mark "one long session"

Kevin's mark (ledger #951/#956, session ending 20:08:05): wire the eight retired-3D
scripts at `nesi/world3d/scripts/` plus `nesi/conductor/soil.py`+`forest.py` into this
2D deposit, "one long session — do all of it, tell me when it's walkable." The prior
turn had already flagged the size honestly (~2,870 lines of source against nesi.html's
932) and offered slicing; Kevin chose the one-session path with the pacing left to the
builder ("I'll still slice the actual coding internally... tell you as each one lands").
This entry is that internal slicing, reported as it actually landed rather than as one
claimed block.

**LANDED, verified in true scratch (`enterScratch()`, live store confirmed untouched
in content — see the procedural note below):**

- **THE SOIL AND THE FOREST** — ported from `nesi/conductor/soil.py` + `forest.py`.
  REFRAMED single-player on the way in, per the source's own flagged translation risk:
  the source language ("does not obligate the receiver," gift lifecycle between two
  parties) is gift-economy/multiplayer in its native form. Built instead as a pure
  self-loop, no second party anywhere: what composts is only ever the SAME player's own
  dropped material; nothing named "given," "receiver," or "obligation" exists in the
  port. Composting attaches to the LAKE (the dissolved fraction — "what passed through
  everything"), never to the bare/set-down plate, so law 6 (set-it-down has no
  destination) stays untouched by this build. A composted line grows into a pickable
  "ember" once a further cycle of light has run (`S.cycles`, the world's own existing
  clock — no new wall-clock construct was added, so there is no law-8 risk to flag
  here). Clicking the lake gathers the oldest-grown ember (arrival order only, never
  worth — forest.py's grove law) back into the player's own tank, verbatim, unworked
  (T4 stands: it must be worked again by hand before it can descend). Nothing to
  gather is a silent, honored empty round — no error, no prompt. Law checks: 2 (no
  number — compost/forest carry no score/rank/worth field, by construction, same as
  the source), 4/5 (verbatim text only, no summarizing), 6 (the bare plate is
  untouched by this build), 7 (an ungathered ember never nags), 11 (no network, no
  second party). Code: `S.compost`/`S.forest` state, `growForest()`, `pickEmber()`,
  the `.lakecirc` class + click wire, and compost pushes at both the direct lake-drop
  route and the dam's dissolved-fraction release.
  **Verified in scratch:** two dissolved-fraction drops composted with verbatim text
  at `cycles:0`; after a cycle advanced (`cycles:1`), both grew into forest embers;
  a real DOM click on `.lakecirc` gathered the oldest first, landed in the tank
  `worked:false`; a second click with the forest empty did nothing, no error; a third
  click confirmed the silent no-op held.

- **THE FALL** — ported from `nesi/world3d/scripts/dam.gd:116-142`, checked first
  against the standing NO-TOUCH rulings (FK2/FK3, "the eight-edit build" entry above)
  before touching anything. Extends, does not replace: all held stones still visible
  through the glass (unchanged), one flagged-variant chassis (unchanged, the dam is
  still the same governing room species), merge-in-written-order (unchanged),
  settling-is-the-taking (unchanged — every held stone still settles and is still
  recorded at release, regardless of the new lever's position). What's added: a small
  vertical lever in the dam panel, `S.gateOpen[i]` in [0,1], defaulting to 1 so an
  untouched lever and every pre-existing save behave exactly as before. dam.gd's law
  ("power comes from the fall, not the restriction; zero if nothing is moving") is
  carried as: the SIZE of what a release grows (ground density, lake, lens water)
  scales by how far the gate was set open; a fully-shut lever grows exactly zero.
  **Deliberately diverged from dam.gd's literal model in one place, named here rather
  than smuggled:** dam.gd's `flow_of()` returns zero water moved at all when the gate
  is shut, which in this build's chassis would mean a held stone released at
  gateOpen=0 settles nowhere — a new and silent loss. Instead, the stone always still
  settles into sediment/compost (the record lands, per this file's own existing
  "the state lands the moment the hand lets go") and only the numeric growth is zero.
  This is an adaptation to avoid a law-12-adjacent loss path the source didn't have to
  worry about (dam.gd has no analogous "your words are the record" law), stated here
  as a deliberate choice, not an oversight.
  **Verified in scratch:** lever drag updates `S.gateOpen[i]` and the rendered leaf
  height (0.5 → `50%`); a release at gateOpen=0.5 grew ground by exactly `0.055*0.5`
  and the stone still settled into sediment with its exact text; a release at
  gateOpen=0 grew ground by exactly 0, and the stone still settled — nothing lost.

- **THE RECORDLESS VERB's test pattern** — ported from
  `nesi/world3d/scripts/loose_stones.gd`'s guard + `scripts/test_l5.gd`, as a
  verification instrument rather than a player-facing mechanic (its own status in
  `counsel/gamecraft/SHAPE_nutrients_and_gifts.md` was already **LAWFUL-NOW**, the
  only one of the ten source files not tagged NEEDS-KEVIN). New file:
  `nesi/game2d/tools/refusal_check.js` — reads `nesi.html`'s own source with comments
  stripped (the same reasoning test_l5.gd's guard uses: a file whose subject is these
  refusals necessarily names the forbidden words in its own comments) and fails
  nonzero if any network/telemetry, scoring/gamification, or reward-cue/confirmation
  construct is found. Explicitly does NOT claim to catch every possible number leak
  (a raw counter under an unlisted variable name assigned into `.textContent` would
  pass) — named as the edge of what this instrument checks, not the whole
  verification bar. `node tools/refusal_check.js` exits 0 on the current file;
  a scratch copy with `let score=0; fetch("x");` appended was confirmed to fail with
  both tokens named, proving the check is live rather than a no-op.

**NOT ATTEMPTED this session — named individually rather than silently dropped:**
THE ECOSYSTEM (spire.gd, life from release rate), THE FOUR TOOLS (water_table.gd,
STILL/SPIN/TUNE/WARM), THE SOUND FIELD (soundfield.gd), THE UNCOVERING (weather.gd),
THE SORTING TARP (sorting_tarp.gd), THE FOREST GIFT filling the second mouth's given
supply (stores.gd). Each is a substantial standalone system in its source form (the
water table alone is ~425 lines encoding six tool-interactions and a fog byproduct);
integrating any one into this file's existing dense station/tetra/dam machinery
without a real risk of a half-broken game needs the same read-source → design →
build → verify-in-scratch pass the three landed items above each took. This is a
scope report, not a refusal: each remains NEEDS-KEVIN-cleared (Kevin's mark already
covers all eight-plus-two) and open to the next session, sliced one at a time per
this file's own established pacing.

**A procedural note, named rather than smoothed over (nowhere near the "A BREACH,
NAMED" incident above, but the same family of risk):** verification began with
`preview_start` on `nesi.html?scratch=1` — and, exactly as the earlier breach entry
documents, the browser pane strips the query string from `file:` URLs, so the page
booted against the LIVE key (`nesi2d`) for the few seconds before `enterScratch()`
was called explicitly. In that window the page's own load-time migration (identical
in kind to five other `if(!S.x)S.x=default` lines already standing in this file)
added the new empty-default fields (`compost:[]`, `forest:[]`, `gateOpen:[1,1,1]`)
to the live save via the existing 2-second autosave, before scratch was entered.
Checked directly afterward: the live key's actual content — the day's writing, the
tank, grounds, lake, cycles — is byte-identical to what it was; only the three new,
empty, lawful default fields were added, the same shape-only migration this file's
own "quarantine ethic" already treats as normal. No test data (none of the scratch
session's composted lines, gateOpen drags, or picked embers) reached the live key at
any point — confirmed by reading it back clean. Named here because reading it back
and confirming clean is the whole of what makes this not a repeat of the earlier
breach, not because the outcome was in doubt.

## The edge of what was NOT checked

- No screenshot could composite (the browser pane was not displayed); the visual layout is
  verified by DOM/SVG structure and function, not by an image read. First thing to do:
  open the file and look.
- The four station acts were exercised through their functions and fail-state constants,
  not by hand-dragging each one; the drag feel is unwalked.
- The Godot world2d build is untouched and remains the engine lineage; this file does not
  replace it and writes nothing into `nesi/world2d/`.
- **This session, additionally:** the retired-3D cluster wiring got a real screenshot (the
  boot screen, confirming no load-time script error and the field opening as it always
  has) and every new mechanic (soil/forest compost-and-gather, the dam's fall lever) was
  exercised through real DOM events dispatched at the actual elements (`pointermove` deltas
  on the lever, a real `click` MouseEvent on `.lakecirc`, a real click on `.rel`) inside a
  live loaded page, not just called as bare functions — a step up from "function call in a
  script" toward "the control a hand would actually touch," though the pointer drag's own
  *feel* (as opposed to its logic) is unwalked, same caveat as the four stations above.
  `node --check` on the extracted `<script>` block and `node tools/refusal_check.js`
  both ran for real and are reproducible by anyone with Node on this machine.
  Not run: an actual mouse-drag-feel pass on the new lever, and nothing from the six
  NOT-ATTEMPTED mechanics named above (there is nothing to verify that wasn't built).
- "The mechanism works" is the claim made here. Whether this does what you needed —
  whether it is the deposit — is yours to say, never mine.
