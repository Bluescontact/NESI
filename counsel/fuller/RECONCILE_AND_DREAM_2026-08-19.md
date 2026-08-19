# FULLER — ROUND ONE, THE FIVE-DAY DELTA

*2026-08-19, reading against my own `RECONCILE_AND_DREAM_2026-08-14.md`, alone, blind to the other three seats.*

---

## A. WHAT THE DELTA CONFIRMS

**The level-is-an-edge ruling is a minimum-system finding, arrived at without my instrument's name on it.** Kevin's mark, 08-18 21:46: *"a Level is an edge connecting two faces, and two nodes."* Read structurally: a level is not real with fewer than four terms — two nodes it joins, two faces it borders (`facesAlong()` in `nesi/game2d/solid.js:555-558`, one triangle and one square, never two of a kind). That is the tetrahedron's own law restated at a smaller scale: the minimum relation that can exist without collapsing into something flatter needs exactly four terms. This confirms section A's geometric read from 08-14 (*"members 1, 4, 5 and 8 are not four features; they are four terms enclosing a volume"*) by finding the same law one layer down, in code that had no idea it was proving it.

**Water/light/growth as mechanics INSIDE every level, never a separate room, closes STOP 1 outright.** My 08-14 file left open: *"is routing at the stations the game, or is it what happens inside a world whose game is water and light?"* Kevin's answer (`MARKS_LOG.jsonl`, 2026-08-19T00:45:00 and 00:50:00) is neither branch of my own fork — it is that the fork was mis-cast. There is no *stations game* standing apart from a *water-and-light world*; water (the sort), light (the aim), and growth (the root) are what happens at every one of the 24 edges, stations included. `nesi/game2d/seam.js` is the built instrument: one factored mechanism, read live off `solid.js`, called identically from `tank.html` and `ascent.html`. **STOP 1 is closed. It is retired from the NEEDS-KEVIN table below.**

**The root mechanic enacts consensus item 4 exactly, in a way my 08-14 file could only gesture at.** *"Absence is productive; only return grows anything."* `seam.js:126-139`, `growRoot()`, is gated on a real calendar day (`seamToday()`), idempotent within a day, asymptotic (`rooted += (1-rooted)*0.22`), never a threshold, never a number — it is `world.html`'s own shoot law, carried in twice-proven (once from `world.html:781-788`, once from `BUILD_RECORD.md`), not re-derived. This is ephemeralization exactly as I named it on 08-14: the pass ends lighter, because the corpus reused a law it had already paid for rather than growing a second one beside it.

---

## B. WHAT THE DELTA BREAKS — NAMED, NOT SMOOTHED

**F1, "THE ONE SURFACE," is broken by fact, and my own diagnosis under it survives.** I dreamed, on 08-14: *"`nesi/game2d/` holds one playable file... the others are gone from the folder, not archived beside it."* Five days and 36 commits later there are more surfaces, not fewer — `tank.html`, `ascent.html`, `node.html`, `crystal.html` all stand, and the boot record (`nesi/game2d/THE_BOOT_2026-08-18.md:214-223`) says so in its own words: *"`node.html` and `crystal.html` are held in tension, not merged."* **That is my own vocabulary, borrowed by the build, and I have to say plainly whether it is earned.** It is not, yet. Tensegrity is islands of compression held by a *continuous* tension member; the same paragraph names the actual liability — *"both independently recompute the cuboctahedron instead of reading `solid.js` — flagged in both files' headers as the real, unresolved liability, not fixed."* Two files sharing only a visual dialect, with no shared spine underneath, are two islands touching at nothing. That is a pile wearing tensegrity's name, and I was wrong on 08-14 to demand the pile be solved by deletion (F1's prescription) — it needed a shared *member*, not a shared *file*.

**And the delta supplies exactly that member, for two of the four surfaces, without anyone calling it what it is.** `seam.js` is now the one thing `tank.html` and `ascent.html` both stand on — same fraction sort, same window-aim, same root, read live off `solid.js`, one copy where there were two (`seam.js:16-25`, *"the duplication this header used to name and defer is now closed"*). **This is STOP 2 partially answered**: not by naming one file *the* game and deleting the rest, but by making the *skeleton* single while the *faces* stay plural — which is the correct tensegrity shape for a solid with fourteen faces and one centre, not the wrong one. STOP 2 stays open only for `node.html`/`crystal.html`, where the same fix (delete the local recompute, read `solid.js`) is sitting unbuilt as a named liability rather than a mystery.

**GROUND C5 gets a second confirmation.** My library's own pre-refusal of the layered-ascent overlay was already superseded on 08-14; the "geometry wins" ruling (`MARKS_LOG.jsonl` 2026-08-19T00:20:00) is the same law arriving again from a different direction — ROOMS (mechanic-grouped, five containers, every one of the six geometric squares split 2-1-1 across three of them) stood down in favor of the actual solid. Recorded, not relitigated.

---

## C. WHAT THE GEOMETRY ITSELF NOW RULES — MATERIAL MY 08-14 PASS DID NOT HAVE

The 08-14 file talked about the vector equilibrium and the jitterbug narratively. Everything below post-dates it (`solid.js`'s CENTRE/interior block is headed *"Added 2026-08-16"*) and is now hard-computed and independently checked, not asserted:

- **`RIGIDITY` (`solid.js:265-309`, confirmed against a second implementation, PyRigi 1.3.0, `MARKS_LOG` 2026-08-16):** 24 bars, 0 redundant, 6 nontrivial mechanisms — one per square. Every member is load-bearing; the whole of the container's freedom is exactly the six hinges. **This is a real, load-tested tensegrity reading of the actual object**, not a metaphor standing in for one: the eight triangular faces are compression islands whose *shape* cannot change (their three sides are all members), and the six squares are where the frame is genuinely in tension — free diagonals, the only lengths in the whole solid that move.
- **`TRADES` (`solid.js:522-538`):** each of the six pyramid cells is a fixed exchange — closing one diagonal opens the other by the same motion, measured rather than assumed to follow from four-bar-linkage theory generally (the file is explicit that it checked this rather than deducing it). This is the trim tab made literal: one small, local, unavoidable move with one determined, non-negotiable global consequence.
- **`RADII`/`CENTRE`/equilibrium (`solid.js:392-436`):** at rest, every radius equals every edge exactly — *"a seat is exactly as far from the game as it is from the seat beside it."* That is the vector equilibrium as I named it on 08-14, *"a doorway, not a place"* — and the file proves the doorway empirically: let the shape move (the jitterbug), and the ratio breaks (`1/√2` at the octahedron, volume 20 falls to 4). **The centre itself is verified invariant under a 1.3× jitterbug breathe** (`tools/solid_check.js:258-260`) — the fixed point holds while everything around it moves, which is my own instrument's law stated as a passing test rather than a claim.

None of this was playable material on 08-14. It is the strongest evidence yet that this corpus's geometry is not decorative — Fuller's own vocabulary (equilibrium, jitterbug, minimum system) is now load-bearing arithmetic in this build, checked against an independent tool, not prose that could rot.

---

## D. WHAT OPENS NEW — NOT SCORED, NOT SEQUENCED

**G1 · THE TRADES BECOME VISIBLE.** The six pyramid-cell trades are fully derived and verified and render nothing. The smallest move: as levels along a square's own members complete, let that square's two diagonals visibly shift — no number, a silhouette lean on the map, the same law `rooted` already renders as border depth. *Feeds:* the vector-equilibrium-as-passage law made watchable rather than merely true — as the world fills in, it visibly leaves equilibrium, and the centre visibly does not move while it does. *Cost:* near zero; the physics exists (`TRADES`, `CENTRE.holds()`), only the readout is missing. This is the same shape as my 08-14 F6 (*"THE CENTRE OWNS ITS OWN SILENCE"*), now backed by a real invariance test instead of a proposal.

**G2 · THE SEALED PERIOD IS THE ANSWER TO F3, ONCE WIRED.** `field_kernel.js`'s `DAWN_CROSSED`/`REWIND_TO_DAWN` pair (`THE_BOOT_2026-08-18.md:49-64`) is tensegrity's own vocabulary arrived at under a different name: a sealed period is a true compression island — untouchable, verified adversarially — and the currently-open period is the only place tension still runs, recoverable but never destroyed (`REWIND_TO_DAWN` undoes only what is still open). This is not built into `tank.html` yet — *"the motor, not the rails"* — but once it is, my own 08-14 open question (*"does quitting lose gestures or only seated things?"*) stops being a design choice and becomes a structural fact: whatever crossed a dawn cannot be lost by construction, and whatever hasn't is the only thing at risk, exactly as F3 hoped, without a document having to say so.

**G3 · NODE AND CRYSTAL MUST EARN THE WORD OR DROP IT.** Named in B above as the live collision. The trim tab is a deletion, not a design: both files stop recomputing the cuboctahedron locally and import `solid.js`'s own derived tables. That one edit is what turns *"held in tension"* from borrowed language into an actual structural claim.

---

## E. THE NEEDS-KEVIN TABLE, UPDATED

| # | Status |
|---|---|
| STOP 1 (routing vs. water/light) | **CLOSED**, 2026-08-19 — mechanics live inside every level, not a separate room. |
| STOP 2 (which surface is the game) | **Partially closed** for `tank.html`/`ascent.html` (shared skeleton via `seam.js`); still open, and now precisely named, for `node.html`/`crystal.html`. |
| STOP 5 (does the ladder keep climbing) | Untouched by anything read this pass. Still his. |
| STOP 7 (motion after the hand stops) | Untouched directly; `field_kernel.js`'s dawn/rewind pair is an adjacent instrument, not yet a resolution — flagged, not claimed. |
| D6 (does the fruit carry counts) | Untouched by anything read this pass. |
| F3 (gesture loss vs. seated loss) | Answerable in principle once `field_kernel.js` is wired (see G2); not yet built. |
| F5 (which surface he writes into daily) | Untouched; still a fact about his life, not the code. |

---

Files this pass is grounded in, all read in full or in the material part cited: `nesi/game2d/solid.js`, `nesi/game2d/seam.js`, `nesi/game2d/tools/solid_check.js`, `nesi/game2d/tools/traversal.js`, `nesi/game2d/THE_BOOT_2026-08-18.md`, `nesi/game2d/tank.html` (header and palette), `MARKS_LOG.jsonl` (entries 1364–1403), and my own `counsel/fuller/RECONCILE_AND_DREAM_2026-08-14.md` for continuity.
