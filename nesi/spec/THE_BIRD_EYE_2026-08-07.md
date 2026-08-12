# THE BIRD'S EYE — where the work actually sits in the game

**Kevin, 2026-08-07:** *"step back and outwards... i'm not sure where this work is located in the initial start up and initial gameplay of the game... lets focus on the bird eye watch things resolve in real time through presence."*

**This is the first eight minutes of NESI as it actually runs tonight, and where everything built or named in this session lands in it — or doesn't.** Read out of the code, not remembered.

---

# PART I · THE FIRST EIGHT MINUTES, IN ORDER

| | what happens | what carries it |
|---|---|---|
| **0:00** | You double-click `NESI.exe`. **Four vertices.** 1 THE INTAKE · 2 THE WORLD SELECTION AND DEPOSIT · 3 SETTINGS · 4 THE PATTERN AND GIFT LIBRARY. 3 and 4 are grey. **2 is grey too, until there is writing.** | `menu.gd` — built tonight |
| **0:10** | **[1].** A blank field. No word count, no timer, no prompt, no key named anywhere on screen. | `intake.gd` |
| **0:10–?** | **You write.** It saves every two seconds to `data/writing/YYYY-MM-DD.txt`, plain text, readable in any editor. Nothing is counted back to you. | `intake.gd` |
| **?** | **Ctrl+Enter.** The page is cut into sentences, laid into the store, and you are back at the menu. Nothing says it happened. **The field is not cleared.** | `intake.gd` → `IntakeDeposit` |
| **+0:05** | **[2],** now in ink. One world: THE WHOLE-SYSTEM TETRA. **[1].** | `menu.gd` |
| **+0:05** | **You are standing on glass in the apex control room**, 240 m up, over the lake. No descent. Four stations around you at 12.5 m. | `player.gd` `BEGIN_AT_APEX` · `spires.gd` |
| **~1:00** | Walk to a station. **[E]** opens a panel. It says the station's name, its physics word, *"the panel is empty — this station's game is not built,"* and three exits. | `stations.gd` |
| **~1:30** | **[1][2][3]** sends to a spire · **[L]** drops it through the station's own mouth into the lake · **[N]** sets it down and sends it nowhere. **[N] does nothing you can see.** | `stations.gd` — built tonight |
| **~2:00** | The room's water stands at some fraction of a measure. **At 0.50 — about 500 words — [T] appears and you can go down.** Below that, nothing is said and nothing is offered. | `spires.gd` `DRAW` |
| **+0:01** | **[T].** You are on the ground. **There is no way back up but writing again.** | `player.gd` `teleport_down` — built tonight |
| **~3:00–8:00** | Terrain from your canon. An orchard of 83 trees standing on their own mass. A river with 52 steps of course. The lake with the deep dark at its centre. Buildings. **Your sentences standing as stones along the shore, in the order you wrote them.** | `terrain.gd` `orchard.gd` `river.gd` `shore_stones.gd` |

**That is the whole of it. Eight minutes, and about six of them are walking.**

---

# PART II · WHERE THIS SESSION'S WORK LANDS

## On the path — a player meets these

| built tonight | where you meet it |
|---|---|
| **THE MENU** | 0:00. The first thing in the game. |
| **THE THIRD OUTPUT — [N]** | ~1:30, at any station. |
| **THE APEX ENTRY** | +0:05. You land in the room instead of descending past it. |
| **THE TELEPORT + THE 500-WORD DRAW** | ~2:00. The only gate in the game. |

**Four things, and they are the four you actually ruled and told me to build.**

## Not on the path — a player meets none of these

| named or drafted tonight | why it is not there |
|---|---|
| **THE RIM, and its routing** | no rim geometry exists in code at all |
| **THE TWENTY UNNAMED TOOLS** | faces have no representation; nothing renders a face |
| **THE TWENTY-ONE RELATIONS** | fifteen drafted — they are laws, not objects; a law is never met |
| **THE TWIN-TETRA JOINTS** | one world exists; there is nothing to join |
| **THE WATER TABLE AS INSTRUMENT** | ruled tonight; the panel is still an empty shell |
| **STILL · SPIN · TUNE · WARM** | named tonight, not built |
| **THE DUAL TETRA** | the container of everything, and invisible from inside |

> **The honest answer to your question: almost none of tonight's work is on the startup path. It is all upstream of it — laws, geometry and namings that decide what the objects will be when they exist.**

**That is not a fault.** The relations were mostly transcription of things already operating; the tools cannot be named until the relations are written; the rim could not be built until its routing was stated. **But it does mean that a night of very dense work moved the spec a long way and the played game barely at all** — and you were right to notice you had lost where it sits.

---

# PART III · WATCH THINGS RESOLVE IN REAL TIME THROUGH PRESENCE

**Your phrase, and it is the sharpest question in the message. So: what actually changes while you stand still and watch?**

## What does move, right now

| | what it does | trigger |
|---|---|---|
| **the dam leaf** | opens and closes over time toward its target | **your key** |
| **the spire's life** | the land answers the gate at 0.22 per second, dry to full | **your key at a gate** |
| **the apex water** | rises with the level in the intake | **your writing** |
| **the weather** | the cycle runs — *"triggered only, never inferred"* | **your trigger** |
| **the field's collapse** | twelve vertices merge to six over 4 s and spring back | **your key at the field** |
| **NESI** | circles the lake at 0.12 rad/s, slowly | **nothing — she just does** |
| **a held stone** | springs toward your hands and resists, damped | **your hands** |

**And here is the finding.**

> **Everything in this world that moves is moving because you did something. One exception: NESI circles the lake, slowly, whether you are there or not.**

**There is no ambient time in NESI.** No day/night, no seasons running, no water rising on its own, no growth. Stand still and watch, and the world is a still photograph with one slow-moving mount in the middle of the lake.

**That is a real design position and it is already law:** *nothing moves while you are away* · *the clock is writing* · *no decay timers, no urgency mechanics.* **The world has no metabolism of its own on purpose.**

## So "watching things resolve through presence" is not yet a thing the world can do

Presence currently buys you two things: **you can look at what your writing already made**, and **you can act and watch that act settle** — a gate opening, the land answering it over four or five seconds, the leaf moving.

**What it does not buy you is watching something resolve that you did not start.** Nothing arrives. Nothing finishes on its own. Nothing was already in motion when you got there.

**And that is exactly the seam your phrase is pointing at.** Between *"nothing moves while you are away"* — which is law and should stay — and *"nothing moves while you are here either"* — which is not law, and is only where the build currently sits.

---

# PART IV · THE THREE THINGS A BIRD'S EYE ACTUALLY SHOWS

**1 · The startup path is complete and it is short.** Write → cross → stand in the room → work a station → go down → walk your own ground. **There is no missing step in it.** Every gate on it is one you named.

**2 · The room is where the depth is, and the room is nearly empty.** Four stations, four panels, all of them saying *"this station's game is not built."* **Everything you developed tonight about the water table is behind a panel that says that.** The single largest gap between what the game is and what it says it is, is one screen wide.

**3 · The ground is dense and unvisited.** Terrain, orchard, river, lake, deep, buildings, stones — all built, all standing, and it takes **500 words and a [T]** to reach any of it. Below the room, the world has plenty in it. **The room is thin and the ground is thick, and the gate between them is the only number in the game.**

---

# WHAT THIS DOCUMENT IS NOT

It does not build anything. It does not propose a next slice. It does not rank the gaps or recommend which to close. **It locates the work — including the work that turns out not to be located anywhere a player goes.**

---

*Read out of the running code, 2026-08-07, session 2a8040ba. Nothing was built.*
