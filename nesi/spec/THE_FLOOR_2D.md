# NESI 2D · THE FLOOR AND THE FIRST STAGE

Unmarked. Kevin's to mark.

A world development game. You write; the writing becomes water; the water is
handled by hand and sent down into ground that changes because of what you
sent. Over many sessions the ground stops being rock. Eventually something
grows on it, and what it grows is the only thing that leaves.

## WHAT COMPOSTED

These were named, are held, and are not in the first stage. Nothing is deleted;
none of it is built now.

The five-move round · the second player and the two-world overlap · frequency ·
the village, succession, biodiversity as systems · the rim and its routing ·
the twenty tools and twenty-one relations · seeded worlds and a world selector ·
power, coherence, the column · the organ body and the local engine · the
library collapse · anything requiring a model call.

Reason, in one line: none of it can be evaluated until one cycle has run once,
and none of it is needed for one cycle to run.

## WHAT SURVIVED

Intake as a blank field · writing becomes water in intervals · water carries
dissolved, suspended and bedload · a room above and a world below · four
stations · three outputs at every station · three spires, each with a dam ·
three grounds · three rivers · one lake · the deep · light rises and water
falls · the hand runs the filter · nothing is counted · held is lawful · the
world runs while you are in it.

## THE SCREEN

One window. Two zones, always both visible.

**Upper band — the room.** A horizontal strip across the top. It holds the
supply tank and four station objects: the water table, the heliostat table, the
membrane, the filters. Clicking a station opens a panel over the world; closing
it returns.

**Lower field — the world.** One equilateral triangle, point up, with a point
at its centre. Three lines run from centre to the vertices, dividing it into
three regions. Each region's outer edge is a **spire**. Each spire has a **dam**
partway down. Below each dam, inside the region, is that spire's **ground**.
A **river** runs from each ground inward to the **lake** at the centre. Below
the lake, off the bottom of the screen and never drawn, is the deep.

**The boundary between the zones is glass.** The room sits on it and the world
shows through it. Water crosses it downward. Light crosses it upward — the
room's brightness is a function of how many cycles have completed, and a world
that has never cycled is nearly dark.

The three regions are the flat projection of the solid's three inner faces. The
outer triangle is the fourth, and it is not a region — it is the boundary that
holds the other three and returns what reaches it.

## THE LOOP

1. **Write.** The program opens in the field. No prompt, no title screen, no
   word count. Autosave to plain text every two seconds.
2. **Water arrives.** Every interval of writing puts water in the tank. The
   tank level is visible. No number.
3. **Open a station.** A panel opens. The operator's hand does the work — no
   automatic sorting, no computed pass.
4. **Take one of three exits.** Send to a spire (choose which), drop to the
   lake, or set it down. Set-it-down has no destination, no animation, and no
   confirmation.
5. **Water descends** the chosen spire and stops at the dam.
6. **Hold or release.** This is the only place the operator governs rather than
   handles. Held water is a lawful terminal state.
7. **Released water reaches the ground.** Suspended fraction deposits and the
   ground thickens. Bedload goes to the deep. Dissolved passes through to the
   river and the lake, invisible.
8. **The ground changes.** Only from deposit, only over cycles, and never with
   a marker saying so.

Repeat. Nothing pulls the player back between sessions.

## THE FLOOR

The smallest thing that is a complete game rather than a demo. Build this
first, export it, and bank it before anything else.

**Write → water → one station → one route → visible arrival → persists.**

Acceptance criteria, all six required:

- [ ] The program opens in a writing field. Nothing precedes it.
- [ ] Text survives a force-quit mid-sentence, and nothing on screen says so.
- [ ] Writing visibly fills the tank without displaying a number.
- [ ] One station (**the filters**) opens, is operated by hand, and offers all
      three exits. The other three render as objects and say their game is not
      built.
- [ ] Water sent to a spire is visibly at that spire's head, through the glass.
- [ ] Quit and reopen: the tank level, the spire contents, and the text are all
      where they were.

If any box is unticked the floor is not set. Nothing above it gets built.

Estimate — Claude's guess, with no basis in this codebase or in Kevin's pace:
3 working days.

## STAGE ONE

The floor plus everything needed for one full cycle to complete and show.

| # | Slice | Est. |
|---|---|---|
| 1 | The floor, all six criteria | 3 d |
| 2 | The world drawn: triangle, three regions, three spires, three grounds, three rivers, lake, glass boundary | 1 d |
| 3 | The dam: water stops, hold or release, released water travels | 1 d |
| 4 | Arrival: the ground receives deposit and visibly thickens | 1 d |
| 5 | The three fractions behave differently — sinks fast, hangs, passes through — with colour redundant to behaviour | 1 d |
| 6 | The remaining three stations get acts and fail states, one at a time | 4 d |
| 7 | Light: room brightness as a function of completed cycles | 1 d |
| 8 | Rotation: the world turns 120°, the receiving region changes, settled material is disturbed | 2 d |
| 9 | Glue, save format hardening, the pass where nothing is a stub | 2 d |

All estimates above are Claude's guesses. The order is a proposal, not a
schedule.

Stage one is complete when a player can write on Monday, return on Friday, and
see that the ground is different — with nothing on screen having told them so.

## WHAT STAGE ONE DELIBERATELY LACKS

No fruit yet. No tree, no colour arc, no second person, no rotation beyond one
axis, no gift leaving.

## THE LAWS THAT GOVERN THE BUILD

Three outputs at every station · no number reaches the player · no model call ·
the player's words are never rewritten · the hand runs the filter · set-it-down
has no feedback · held is lawful · the world stops when you leave · the deep
never renders · colour is never the only carrier · nothing reaches outward ·
quitting loses nothing.

## THE ONE DECISION THIS SPEC LEAVES OPEN

Whether tension and compression are simulated or merely obeyed. Everything
above assumes **obeyed** — a rule about what may be built, checked by hand.

## THE FORK THIS SPEC DOES NOT ANSWER

Whether THE FLOOR is a new Godot project or a scene inside world3d. Kevin's.
