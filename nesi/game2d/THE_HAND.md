# THE HAND — every mechanism described for acting on a visible field

*Extracted 2026-08-16 on Kevin's ask: "extract every mechanism we've described
around user interaction with a visible field." A sweep, not a ruling. Nothing
here orders anything and nothing here supersedes anything. Every entry names its
source and its actual state — **LIVE** (runs in `nesi/game2d/`), **BUILT
ELSEWHERE** (runs, but in a retired or unlinked tree), **SPEC** (specified,
never built), **DESCRIBED** (named in prose only).*

---

## 0 · THE BRIEF THIS ALL ANSWERS — and it is yours, from ten days ago

`nesi/world3d/scripts/sorting_tarp.gd:1`, 2026-08-06, verbatim in the file header:

> "if each space has a worksurface and tools... if objects and their uses are
> apparent by shape and design rather than explanation... A button that folds a
> sorting tarp doesnt need language processing. Ive been tryign to design around
> my own ability to articulate this here, that there, ect. I'm trying to buid a
> system where i dont need articulation.. i can offer my approval, as a clock, as
> a button, as a process... I want to be able to hold everything all at once and
> have it outside of me so i can see its shape and walk through a space where i
> become visible to myself."

The same file states **the four rules any instrument in this world is checked
against** — the closest thing the corpus has to a general law for this:

1. **A WORKSURFACE.** Not a sign, not a panel — a horizontal thing at working
   height with the work lying on it, in the open, all at once.
2. **SHAPE CARRIES MEANING, NOT WORDS.** Not one character of text. Footprint is
   how big a thing is; thickness is how long it has lain there. "You read the
   pile the way you read a pile."
3. **THE CONTROL IS A BUTTON.** Obviously pressable, at hand height, where you
   would stand to work. "No menu, no confirmation, no sentence to compose.
   Approval is a press."
4. **THE ACT IS PHYSICAL AND VISIBLE.** The tarp folds. "You watch it happen and
   you know what happened, because it looks like what it is."

**A second law, one month older and never satisfied** — `feedback_steering_without_articulation`,
Kevin 2026-08-01: *"the ability for the user to meaningfully change and steer
WITHOUT ARTICULATION is deeply important to how this program works."* Its three
parts: a menu at **any point in the terrain**, never one global bar; it must
**not route to a single decision** — poles that *combine*; and **position itself
is the utterance** — he moves a position, the system generates the sentence.

---

## A · PLACE-AND-READ — position is the statement

| # | mechanism | state | where |
|---|---|---|---|
| A1 | **The sorting tarp** — the whole pile on one cloth at once, each item a slab whose footprint is its size and thickness its age. Zero text. One press folds the cloth and gathers the pile. | BUILT ELSEWHERE | `nesi/world3d/scripts/sorting_tarp.gd` |
| A2 | **The tetra position-board** — four fixed poles (SELF·OTHER·WORLD·TIME), six edges as regions, **holder derived from edge and never stored**, volume as MIN headroom, faces as filtered views. Board-state flips only on `--source kevin`; the render has no state-flipping control at all. | SPEC SIGNED + render BUILT | `nesi/nesi_bench_v0/position_board.html`, spec `nesi/mind/project_tetra_position_board.md` |
| A3 | **The 4·6·4·1 barycentric sort** — 7,440 items each already carrying tetrahedral coordinates and a position code (vertex/edge/face/centre), with verbatim evidence words. A **ready-made placement function requiring no new classification**. | BUILT, unrouted | `Desktop/4-6-4-1/deposit/SORT.jsonl` (2.9 MB, verified present) |
| A4 | **THE FIELD (the tree)** — every decision as an editable field where **an edge is `{to, rel}` and the relation word is free text you write**. No vocabulary is offered, deliberately: a menu of relation words would be the machine pre-naming the thing this exists to let you name. | BUILT, unlinked | `THE_FIELD.html` (452 KB) |
| A5 | **The Bar's board** — tiles land draggable on a 2000×1400 board and **never move again on their own**; scatter is the single exception and only when clicked. | BUILT ELSEWHERE | `nesi/world/logbook.html` |
| A6 | **The field** — everything standing, placed by hand; distance = intent, sector = direction, past the rim = gone, double-click = your own unnamed mark. | **LIVE** | `nesi/game2d/field.html` |

---

## B · STEER BY COMBINATION — the anti-articulation laws

| # | mechanism | state | where |
|---|---|---|---|
| B1 | **The tetra menu in place** — guide, interpret and decide wherever you are standing; four poles that combine; **the combination generates the output text live**, never a canned set. Typing stays available; it is never the toll. | SPEC, never built | `feedback_steering_without_articulation` |
| B2 | **Multi-button fire is a signal, not an error** — two poles fired at once means the boundary between them is where something is forming. Render both, name the tension, never collapse to one. | DESCRIBED | `feedback_multi_button_signal` |
| B3 | **Depth-zero decisions** — every live decision open and markable without entering anything; navigation carries reading, never decisions. Falsifier: a decision requiring room-entry to mark = law failed. | LAW (chassis) | `feedback_depth_zero_decisions` |

> **A collision, named and not resolved:** the tetra menu was **retired 2026-07-02**
> (`RETIRED.jsonl`, superseded by "open grammar — every edge clickable, no button
> bar"). B1 re-asks for one by name on **2026-08-01**, a month later. The law is
> newer than the retirement. Which stands is unmarked.

---

## C · DRAG IS THE DECISION

| # | mechanism | state | where |
|---|---|---|---|
| C1 | **Merge-by-drag** — drag one stone onto another; they join in **written order by `n` regardless of pick order**; seams kept whole; no unmerge control, kept decidable at zero cost by the seams. | LIVE, walked | `BUILD_RECORD.md:204`, `:654` |
| C2 | **The descent drag** — drag a worked stone down **through the writer's own position** and release. *"No confirmation; the drag is the decision."* Descent order **is** the downstream order — the machine no longer picks even by arrival. | LIVE; drag-*feel* unwalked | `BUILD_RECORD.md:355`, edge at `:370` |
| C3 | **Three drop targets = the three outputs** — drag a fraction to a spire mouth, the lake plate, or the bare plate. | LIVE | `BUILD_RECORD.md:177` |
| C4 | **The pull, not the click** — *"A click is a menu; a pull is a harvest."* Pointer-down takes weight and follows the hand **with lag**; a short pull springs back; only a deliberate pull past 40px detaches. | LIVE, walked | `BUILD_RECORD.md:1282` |
| C5 | **The tank pull** — same physics at 46px: pull the tank down and the world pours to a local file; short pull springs back. Drag suppresses the click so neither act eats the other. Walked with real pointer events: 15px poured nothing, 70px poured 875 chars. | LIVE, walked | `BUILD_RECORD.md:1878` |
| C6 | **Drop a file on the tank** — it pours back **whole**. Nothing is merged, *because merging would be the machine deciding which of two pasts is his.* Verified byte-exact. | LIVE, walked | `BUILD_RECORD.md:1878` |
| C7 | **Orbit-drag the solid** — pointer drag rotates the whole form; hover reads a seat; no text in the gesture. | LIVE | `tiles.html:381` |

---

## D · EDIT THE CONSTRAINT SURFACE — the medium answers

| # | mechanism | state | where |
|---|---|---|---|
| D1 | **The governing form** — *"the player never commands the medium; they edit the constraints and the medium answers."* World-as-editable-field, medium-as-solver. Three design laws: the edit must be **slow enough to be a decision**; the medium's answer must be **legible in motion**; pose the medium's question **before** offering the tools. | DESCRIBED | catalog §2.3 |
| D2 | **The dam hand** — carve channels, place and open dams, flood one region and starve another. The terrain erodes and silts. **The land is the save file.** | DESCRIBED | `THE_VISION.md` §2 |
| D3 | **The heliostat mirror-drag** — drag a mirror and the beam picks a spire; **hold the beam on one receiver too long and it scorches shut for good**, legible from outside the room. Routing plus irreversibility, running today. | BUILT (`nesi.html`) | `BUILD_RECORD.md:1360` |
| D4 | **The gate lever** — drag sets `gateOpen` 0…1 and the rendered leaf height follows. A release at `gateOpen=0` grows ground by exactly zero **and the stone still settles** — no silent loss path. | LIVE, walked | `BUILD_RECORD.md:474` |
| D5 | **Aim-and-commit (slingshot family)** — deliberation is free, reversible and previewed; commitment is one release, irreversible. Implementation law: **the preview must run the same integrator as the flight.** | DESCRIBED | catalog §2.2 |
| D6 | **The three puzzle grammars** — level-seeking (forgives), path-routing (clarifies), order-and-timing (pressures). One grammar per chamber, purely. | DESCRIBED | catalog §2.6 |

---

## E · THE HAND-PLACED SEAM

| # | mechanism | state | where |
|---|---|---|---|
| E1 | **The hand-cut at THE SEATING** — a seam the hand places. **No midpoint drawn, no default offered.** | LIVE | `ascent.html:1005-1058` |
| E2 | **The naming line** — a region is nameless until something lands there, then **one** naming line opens for his hand, once; blank stays nameless lawfully. | LIVE (R5) | `BUILD_RECORD.md:209` |

---

## F · APPROVAL AS A GESTURE, NOT A SENTENCE

| # | mechanism | state | where |
|---|---|---|---|
| F1 | **The plunger** — one post, one red head at hand height. *"Approval is a press."* And its hard boundary: the press **stages** a sweep and never commits one. | BUILT ELSEWHERE | `sorting_tarp.gd` |
| F2 | **The hold on the sill** — the door's cost is the reach itself: a 900ms hold that gives back faster than it takes. | LIVE | `daily.html` |
| F3 | **The round dealer** — five moves dealt from the live field; **playing and skipping both resolve a move**; the fifth ends the round; nothing carries over; closing the door is a complete ending. | BUILT ELSEWHERE | `osg_organ/templates/play.html` |
| F4 | **The twenty gestures** — every one of the twelve seats declares a gesture in the first person: I POUR · I HOLD, THEN I LET GO · I TAKE THIS ONE OUT · I SEND THIS THERE · I LET IT SETTLE · I LET IT GO DOWN · I WORK IT UNTIL IT HOLDS · I AIM · I FEED THE FRAME · I COME BACK · I LET IT GROW · I GIVE IT AWAY. Typed as **reach ×8 · hold ×4 · draw ×4 · wait ×4**. | LIVE | `THE_WORK_SURFACES.md`, `ascent.html` |

---

## G · WALK AND STAND — the body in the field

| # | mechanism | state | where |
|---|---|---|---|
| G1 | **The overworld canvas walk** — WASD or click-to-walk avatar, places entered by **proximity + Enter**, roads brightening with traffic, deposit-density drawn as scattered ground, and **press D to drop verbatim text where you stand — it becomes ground.** Position persists. *"Nothing on it was hand-placed — the world derives itself from the ledgers on every load."* | BUILT ELSEWHERE | `osg_organ/templates/world.html` |
| G2 | **Approach-and-press (the E-verb)** — distance + facing-angle check, prompt shown only when valid. *"The prompt appearing IS the affordance."* Tune the range generously. | DESCRIBED | catalog §3.3 |
| G3 | **Carry** — pick up in one chamber, place in another; the item rides in world state. | DESCRIBED | catalog §3.3 |
| G4 | **The lift** — one-dimensional movement with ceremony; the player **cannot act until arrival**. That enforced pause is a designed breath. | DESCRIBED | catalog §2.1 |
| G5 | **The menu tetra front door** — four vertices in Kevin's order, each reading **live or dry** by whether anything actually stands behind it. Refuses to fake a list. | BUILT ELSEWHERE | `nesi/world3d/scripts/menu/menu.gd` |

---

## H · ASK AND SEE — non-verbal reads of what accumulated

| # | mechanism | state | where |
|---|---|---|---|
| H1 | **The uncovering (the wash)** — ask for fog; rain falls; the wash draws **the bedrock's own contours, only where relief already exists**, and says nothing about it. *"It cannot invent a line."* Fades in ~8s; never volunteered; walk away and nothing brings it back. | BUILT ELSEWHERE | `nesi/world3d/scripts/weather.gd` |
| H2 | **The sounding** — drop a line on the ground and **your own sentence returns, verbatim**. The only fully closed loop in the build, and the only place a player's words come back. | LIVE | `ascent.html` |
| H3 | **The shape-only export** — what crosses is an opaque ref, an extent (size) and a settled (age). *"The world is not allowed to know what any of these say."* | BUILT, unrouted | `tools/export_pile.py` |
| H4 | **The consequence ladder** — instant echo → state change → world change → **witnessed change** (another place reflects it). Rung four is where a game starts feeling like a world. | DESCRIBED | catalog §4.1 |
| H5 | **The self-laying-out figure** — measure where the content actually sits, then draw the connecting lines live, so the figure derives from placement rather than hand-set coordinates. | BUILT ELSEWHERE | `osg_organ/crystal_v1.html` |

---

## I · THE LAWS THE FIELD RUNS UNDER

Not mechanisms — the constraints that make all of the above lawful. Collected
because every entry above is checked against them.

- **Shape and behaviour carry the distinction; colour is redundant.** (law 10)
- **Set-it-down has no destination, no animation, and no confirmation.** The
  absence is the feedback. (law 6)
- **The machine never moves a tile after it lands.** (the Bar)
- **Landed never lifts** — settled text is immutable, no code path writes it. (R5)
- **Held is lawful. Blank is a complete state.** (law 7, every gift card)
- **No number reaches the player.** (law 2)
- **Nothing is ranked, ordered, scored, highlighted or recommended.** Falsifier,
  stated at its own site: *"if this surface ever orders, scores, highlights or
  recommends, delete it rather than adjust it."* (`THE_FIELD.html`)
- **Staging is not writing.** *"A surface that wrote would be a surface that
  acts."* The tarp's press stages a sweep; the field page cannot reach the ledgers.
- **A repaint must never kill a drag.** Every pointer-capture site checked; a
  mirror survived a mid-drag repaint. (`BUILD_RECORD.md:1614`)
- **Reading the output is not running it.** THE FIELD's markup was perfect and
  every handler on the page was a dead fragment. The most expensive lesson here.
- **Juice confirms consequence, never substitutes for it. If the state didn't
  change, nothing shakes.** (catalog §4.2)

---

## THE COUNT, AND THE ONE THING IT SHOWS

**Thirty-one mechanisms** are described. By state:

- **13 are LIVE** in `nesi/game2d/` — all of section C, most of E and F4, H2, D4.
- **9 are BUILT ELSEWHERE** and run today in a retired or unlinked tree — the
  tarp, the wash, the walk, the Bar, the round dealer, the menu tetra, the
  position board, THE FIELD, the lattice renderer.
- **3 are BUILT and unrouted** — the barycentric sort, the shape-only export, D3.
- **6 are DESCRIBED only** — the dam hand, the E-verb, carry, the lift, and the
  two catalog families.
- **The two governing laws — §0's four rules and B1's steering-without-articulation —
  have never been written down as a check anything runs against.**

The mechanisms are not missing. **Nine of them are built, working, and sitting
behind a retirement or a broken link** — and the two laws that would tell you
which to reach for are the only things in this document that were never built at
all.
