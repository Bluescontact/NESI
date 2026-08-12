# THE SETTINGS ORGAN — the field, considered

**Kevin's marks, 2026-08-07, caught before anything acted on them:**

> *"The third slot can be settings."*
> *"The settings is an organ that controls the expression within each world. With, reminds me that each world should have a clickable tab to modify an individual level/world's settings."*

**Status: a survey, on his go — "lets consider all the settings a person might apply in a world or game like this." Nothing here is built. Nothing here is marked. No setting was written into any file.**

---

# THE ORGAN'S LAW, DERIVED FROM THE MARK ITSELF

Kevin's word is **expression**, and that word does the whole job. It draws a line this system already has everywhere else, in a place it did not yet have one:

> **A setting changes how a world EXPRESSES. It never changes what is TRUE about your material.**

**What is true, and no setting reaches:** the words, held verbatim · the deposit and where it settled · the declared grain (385 hand-authored links) · the canon in `patterns/` · what was sent to a spire, dropped to the lake, or set down · what is in the deep.

**What is expression, and settings is exactly where it belongs:** light, air, weather, sound, pace, distance, the body's speed, what renders and at what density, what the room looks like, how long the descent takes.

**The falsifier:** if a setting changes what is true about your material rather than how it appears, it is not a setting — it is an edit to the world wearing a settings hat, and it belongs behind a mark instead.

**And the second law, which the survey below kept running into:**

> **A setting may not settle an open fork.** A fork closed because a control existed for it is still a fork closed by the machine. Anything in section D is a naming first and a setting second, in that order, never at once.

---

# THE TWO TIERS — Kevin's own structure

| Tier | Where | What it governs |
|---|---|---|
| **THE ORGAN** | vertex 3 of the menu tetra | the machine and the body — things true of every world you open |
| **THE TAB** | a clickable tab on each world | that world's own expression — different per world, by construction |

The tab is the load-bearing half of the mark. **Two worlds made from the same canon should be able to look and feel like different places** — that is what makes a subject-tetra a different world rather than the same world with different contents. The organ holds what cannot sensibly differ; the tab holds everything that can.

---

# A · THE TAB — per-world expression

**Every one of these has a real constant behind it in the running build.** Named with its current value so the field is concrete rather than a wish-list.

## A1 · Light and air

| | Now | What moving it expresses |
|---|---|---|
| sun elevation | `34°` — `main.gd` calls it *"the one number of taste"* | the hour a world stands in |
| sun energy · ambient | `1.55` · `0.42` | hard-edged or soft-lit |
| fog begin · end · curve | `30 m` · `480 m` · `1.1` | how far this world lets you see |
| shadow distance | `300 m` | how deep the world reads |
| the sun's bearing | derived from the heliostat toward the lake | which way the light comes across your ground |

*The light already comes from a named place in the world rather than an arbitrary vector. A tab that moves it is moving the heliostat, which is a thing you can walk to — that is worth keeping true rather than letting a slider float free of it.*

## A2 · Water and weather

Water level · the pulse · fog off the lake and its rain · whether the wash that reveals reliefs runs on a rhythm or on release. **Weather is the world's tempo, and per-world tempo is the clearest case in the whole survey** — a world you go to think in and a world you go to work in should not have the same weather.

## A3 · The ground's expression, not its facts

**The distinction matters here more than anywhere.** Where deposit lies is truth. How thickly it is drawn, how much relief the incision cuts (`5.5 m of 5.5 m allowed`), tree spacing (`2.4 m`), stone columns (`16`) and their spacing — those are how the same settled material is expressed. A world can be drawn sparse or dense from an identical deposit.

**The line to hold:** density *thresholds* — how much deposit makes form — are expression. What is deposited is not.

## A4 · Life

Whether indicators are present, and how many. Herons, mayflies, reeds, fish holding in a pool. **Nothing about them communicates and nothing may start to.** A world with no indicators is legible and correct — silence is a setting, not a fault.

## A5 · Sound

The soundfield on or off, and its level. `soundfield.gd` exists. The footfall is already flagged as the one sound triggered by the body.

## A6 · The body, per world

Walk `4.2 m/s` · stride `7.6` · flight `11.0` · jump `4.5` · gravity `14.0` · carry drag `0.78` · acceleration and friction. **A world can be a place you move through quickly or slowly**, and that is expression in the strict sense — it changes nothing about what is there.

*One caution, named: carry drag is the weight of a stone in your hands. It reads as physics and it is also a statement that carrying costs something. Turning it off is a legitimate setting and it removes a small true thing.*

## A7 · Naming

The world's own name. Currently one world exists and it is called THE WHOLE-SYSTEM TETRA in code.

---

# B · THE ORGAN — global, at vertex 3

## B1 · The body's input

Key bindings — including Kevin's own ask, *"1 through 0 mapped to quick access"* · mouse sensitivity and inversion · controller · hold-vs-toggle for stride and flight.

## B2 · The window

Resolution · fullscreen or windowed · field of view · frame cap · vsync.

## B3 · Reach

Font size on every panel · contrast · reduced motion (the eight-second descent, the camera's ease, the vector-equilibrium collapse at `4.0 s`) · a caption for ambient sound, provided it captions *what is sounding* and never *what it means*.

## B4 · The writing's home

Where the day's page lands — `data/writing/YYYY-MM-DD.txt` today, with a `user://` fallback already implemented for read-only installs. Autosave interval, currently `2.0 s`. **The safest thing in the build should be the most visible: this is where a person confirms with their own eyes that their words are on disk somewhere they can open.**

## B5 · The AI socket — and this one may not belong here at all

Kevin's own naming, 2026-08-06: *"a local ai engine… can plug into a claude account, and change the socket model at the tack or function"* and *"AI permission is like a key or object that pushes water through a system."*

**If permission is a physical key, then AI is not a settings toggle — it is an object in the world, and where the keys are is something you look at rather than something you configure.** Putting it in a menu would undo the one design move that makes AI use visible at a glance. Flagged as a genuine collision between two of his own marks, and not resolved here.

---

# C · REFUSED — settings that are the refusal list wearing a hat

Each of these is a normal, reasonable option in every other game, and each is out.

- **Word count, session timer, streak, "words today"** — a scoring toggle is still scoring. *"Nothing is counted"* is a refusal, not a default.
- **Progress display of any kind**, including an opt-in one.
- **Difficulty.** There is nothing to tune and no curve to sit on.
- **Notifications, reminders, daily prompts** — the game never contacts you, and an off-by-default reminder is still an outward reach that exists.
- **"Show me around" / tutorial / hints / highlight interactables** — nothing may point at anything as worth attention. A hints toggle is a pointer with a switch on it.
- **Recency: "open my last world", "resume where I was", "recently played"** — the stations deliberately do not know which one you used last. A menu that does is the same mechanic in a different room.
- **Rendering the deep.** *"Darkness cannot be retrofitted once broken."* A later mark could open a window; a checkbox is not that mark.
- **Anything that summarises, themes, or reflects your writing back** — no toggle makes that allowed.

---

# D · NAMINGS FIRST, SETTINGS SECOND — the ones that are forks

**These look exactly like settings and each would settle something open. Listed so they are visible, and deliberately not built.**

**D1 · THE DRAW.** Three numbers are live: **100** (Kevin's slice sentence), **200** (`_world_template.html`'s THE DRAW, with stages at 200/500/750/1000), **550** (the running world — `waters.gd`'s 1000-word measure at a draw of 0.55). A slider here picks one by furniture. *Name it, then it can live in the tab — per world is arguably right, since a subject world and the whole-system world need not fill at the same rate.*

**D2 · THE MEASURE.** `1000 words`. Related to D1 and not the same number.

**D3 · THE INTERVAL.** The world regenerates every thousand words into the intake — and the built terrain still derives from a **mark count**, not a word count. That is C4, named as a supersession on 08-02 and never closed. **The law and the build disagree, and a setting cannot be the referee.**

**D4 · THE FOUR GRAVITIES.** *Which way is down* would be the single most expressive per-world setting in the whole survey — one deposit, four settlements. **They were composted, and R3 fixed up and down.** F7 records the tension. If arrangement is ever wanted again the named route is the membrane's hand-shaped surface, not a computed tilt — and a settings dropdown is neither.

**D5 · THE GRAIN WHERE THERE IS NONE.** 99 of 176 patterns carry no declared lineage; the interim rule is that the ground there is flat, and *"an undeclared pattern should look undeclared."* A setting that filled it in would be computing kinship, which the grain law forbids outright. **Not a setting in any version.**

**D6 · WHERE THE BODY LANDS ON CROSSING.** That is C3, still open, and it is one edit in `player.gd` once ruled. A setting would settle it.

---

# WHAT THE TAB WOULD ACTUALLY COST TO BUILD

**The surface is small; the wiring is the work.** Every constant in section A is a `const` today — compiled in, read once, and in several cases used at build time to generate geometry. Making them per-world means three real changes:

1. **A world is a record, not a scene path.** The selection screen currently holds one dictionary with a name and a scene. It would hold a settings block, persisted per world.
2. **Constants become reads.** `main.gd` builds the environment once at `_ready`; light and fog can be re-read live, but tree spacing and the incision are baked into generated geometry and would need a rebuild to change.
3. **A tab needs somewhere to live.** On the selection screen next to each world is the obvious reading of the mark, and it is the cheapest.

**A first slice that is honest and small:** the tab, on the selection screen, carrying only **A1 light and air** — five numbers that can be re-read live with no rebuild, per world, persisted, and visibly different between two worlds. It touches no fork in section D, refuses nothing in section C, and proves the whole two-tier shape with the least machinery.

---

# WHAT THIS DOCUMENT DOES NOT DO

It settles nothing. It builds nothing. It does not pick the draw, does not resolve C3 or C4, does not reopen the gravities, does not decide whether the AI socket is a setting or a key, and does not choose which settings are real. **The organ's law in the first section is derived from Kevin's own word "expression" and is offered as a reading, not adopted.**

Every constant quoted was read out of the running build tonight, not remembered.

---

*Written 2026-08-07, session 2a8040ba. A survey on his go. Unmarked, and it binds nothing.*
