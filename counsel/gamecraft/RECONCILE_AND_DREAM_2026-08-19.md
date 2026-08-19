## GAME-CRAFT — ROUND ONE, ALONE, FIVE DAYS LATER
**2026-08-19. Continuity: reads against `counsel/gamecraft/RECONCILE_AND_DREAM_2026-08-14.md`. This pass reads code: `nesi/game2d/index.html`, `ascent.html`, `tank.html`, `seam.js`, `solid.js`, `level_one.html`, `traversal.html`, `tools/refusal_check.js`, `tools/scope_check.js`, `tools/check_all.js`, `THE_BOOT_2026-08-18.md`, `tools/retired/RETIRED.md`.**

---

## A. WHAT THE DELTA CONFIRMS

**STOP 3 (08-14's sharpest finding) is genuinely fixed, and fixed well.** `tank.html`'s `S.stones` keeps every sentence's verbatim text (`s.t`), persisted append-only through `save()`, merged and unmerged with its own seams (`merge()`/`unmerge()`), and re-emitted in full on the way out (`carriedText()`, `tank.html:819-840`). The world now returns what it takes, in the mechanism I found missing on 08-14. This is real work and it holds.

**Dream 5/6 from 08-14 got built, independently, and correctly.** `seam.js`'s root growth (`growRoot`, `rootStanding`, `tank.html:748-753`) is asymptotic, day-gated, never a threshold to clear, and shown only as border-width and box-shadow depth on a tile — never a number. That is exactly "the paper you write on is the progress report," ported from `world.html`'s `standing()` law rather than invented twice (`seam.js:70-94` cites the identical shape found in `BUILD_RECORD.md` a session earlier). `isReturned()` fires instantly at fraction+light with no volume gate — the corpus refused the lever I flagged it could reach for.

**The fraction/window vocabulary is real hand-picked-nothing-computed craft.** Four fractions (`dissolved/suspended/bedload/contaminant`), each a `was/does` pair, no auto-sort. Two windows per seat (`aim/focus/spread`), read live off `solid.js`'s own square axes rather than listed per-seat. This is the Zachtronics law and law 5 in one control (`seam.js:148-183`).

**"Edit the constraint, never command the material" got a second, independent confirmation at the geometry layer.** `seam.js`'s `walk()` deposits into a seam's two *faces* (tool, window) — the hand never picks an outcome, it sorts and aims, and `seamComplete()` reads whether both faces happen to be inhabited by anything, walked or not (F5, carried from `day_one.html`). This is the same grammar as `own(el,src)` from 08-14: the mechanism cannot be handed the answer.

**A level is now an edge, closing my own STOP 8 partially.** Kevin's ruling ("a Level is an edge connecting two faces and two nodes," `solid.js:12-25`) gives `tank.html`'s pre-existing seam-card shape a name rather than contradicting it. This doesn't fully resolve chambers-vs-one-camera (below), but it does confirm the geometry, not a menu, decides what a level is — my 08-14 worry that `ascent.html`'s twelve were "a menu, not the catalog's chambered shape" is superseded by a real ruling rather than left open.

---

## B. WHAT THE DELTA BREAKS — AND ONE OF THEM IS WORSE THAN ANYTHING I FOUND ON 08-14

**The front door does not lead to the game.** I traced `index.html` (the actual door, "THE DOOR IS THE SOLID," 08-16) by hand:

```
index.html:144  HREF.TANK = "daily.html";
```

Clicking the TANK vertex — the only way into the writing surface from the shipped door, since the bench list at `index.html:107` offers `ascent.html, descent.html, traversal.html, level_one.html, field.html, regathered.html, world.html, tiles.html, crystal.html, decisions.html, options.html, day_one.html, node.html` and *never* `tank.html` — sends the player to `daily.html`. `tank.html`'s own header says, in its first paragraph: *"Supersedes daily.html and day_one.html — neither is deleted, both are marked at their own headers... this file is what a fresh session should open at TANK from here."*

I grepped every `.html` and `.js` file for `href="tank.html"` and `location.` pointing at it. There is none. `ascent.html` mentions `tank.html` six times — always in a comment, never in a link. **The current best-built writing mechanic in this corpus — the seam strip, the fraction sort, the root growth, the store-join that closes the ten-way `localStorage` fragmentation — has zero inbound links from the game's own front door.** It is reachable only by a hand that already knows the filename, which in practice means only by reading `THE_BOOT_2026-08-18.md` first. That is not how a player arrives at anything.

**And no instrument can see this, for a specific, checkable reason.** `tools/scope_check.js` builds its notion of "live" by following `href=`, `url=`, and `location.replace(...)` outward from `index.html` (`scope_check.js:24-43`), plus a hand-maintained addendum list — `["daily.html","ascent.html","decisions.html","level_one.html"]` — that does not include `tank.html` either. `tools/refusal_check.js`'s own `LIVE` array (`ascent.html, daily.html, day_one.html, decisions.html, descent.html, index.html, level_one.html, traversal.html`) doesn't include it. `tools/check_all.js` has no row that names it at all. **The instrument built specifically to catch "a check reading a building nobody walks" (`scope_check`'s own stated purpose, and the exact failure `refusal_check`'s header already confesses happening once with `day_one.html`) has the identical blind spot again, one file later, and inverted: this time the building is walked — by Kevin, by the builder session — and the *instruments* have never seen it.** Law 2 and law 11 have never been machine-checked against the file that is actually the front door's real destination.

This is not a smaller version of my 08-14 D2 finding (the guessable-Ctrl+Enter trap in `ascent.html`). It is a categorically worse failure of the same family: 08-14's problem was *hard to leave*; this one is *impossible to arrive at*. The loop is the game, and the actual best-built loop has no door.

**I am demoting my own 08-14 optimism about STOP 1/D2 accordingly.** I credited `index.html`'s rebuild (below) as a real improvement to the cold-open — and it is, as a piece of UI. But the improvement is wired to the wrong destination, which means the net effect on a first-time hand today is *worse* than what I found on 08-14: on 08-14 a stranger at least landed inside the mechanic (`ascent.html`) and got stuck at its exit; today a stranger lands inside a superseded mechanic and never reaches the current one at all, with no signal anywhere on screen that a better room exists.

---

## C. WHAT'S GENUINELY NEW AND GOOD, NAMED SEPARATELY FROM WHERE IT'S WIRED

`index.html`'s door is real geometry now, not a hand-drawn menu: the actual cuboctahedron, twelve labeled seats read live from `solid.js`, hover reveals a sub-line (`"write into it"` for TANK, `"where the sill lands"` for CAST), degree-four so no dead end is constructible by the figure itself, and — this matters — *no state is stored about the door*: "no last-seat, no visited-badge, no return-nag. A door that remembers you is keeping a ledger" (`index.html:112-114`). That line is this seat's own law 6/law 11 stated back at me in the corpus's own words, and the code holds it. If this door pointed TANK at `tank.html` instead of `daily.html`, it would be close to the Dream 2 I wrote on 08-14 — one click, labeled, no menu to guess.

The seam strip's mark/unmark law (`walkSeam`/`walkRoot`, `tank.html:680-693`) generalizes daily.html's tested hold-to-open sill across all four of TANK's members plus the root, and gives arming a seam the same two-directional authority the fraction sort already had (pick again to un-pick). Kevin's own naming for this ("the two biggest movements of user authority") is the right frame and the code matches it.

---

## D. WHAT'S UNSWEPT, NAMED AS THE TETRA'S OWN QUESTION

`seam.js`'s `REACH=900` (the sill hold time) and `ROOT_STEP=0.22` (the asymptotic growth rate) both came forward unchanged from `daily.html`/`world.html` into the generalized module. Neither shows any sign of having been swept across the real input space the way the gravity node demands — *"NEVER PLACE A PHYSICS OBJECTIVE BY EYE."* This is a lower-stakes version of that law (a hold-time and a growth-rate, not a beacon's collision radius) but the method that would answer it is the same one: walk real holds at the keyboard/mouse and see where 900ms actually sits against a human's patience, not where it reads well in a diff. Not urgent — it isn't broken — but it's exactly the kind of constant this school's laws exist to flag before it calcifies through three more files the way it just calcified through two.

---

## E. THE ONE SENTENCE

**On 08-14 I said the world doesn't keep what it asks for; that is fixed. Today the world keeps what it asks for and has quietly locked the door to the room where it does — a player who opens this game from its own front page, clicks the one seat labeled TANK, writes, and leaves, will never once touch the seam strip, the fraction sort, or the root that grows in the colour of the page, because the seat sends them to the file that was superseded five commits before this session began, and no instrument in the suite is looking at the file it actually superseded them with.**

---

## NEEDS-KEVIN (new, this pass)

- Is `index.html:144`'s `HREF.TANK = "daily.html"` a deliberate hold (TANK's front-door destination is still being decided, same as the B2 cell question) or a stale wire that should point at `tank.html`? Not this seat's to default either way — but it is this seat's to say the current wiring means tank.html is UNWITNESSED not only by a stranger's hand (as `THE_BOOT_2026-08-18.md` already says) but by the game's own door.
- Should `tank.html` be added to `refusal_check`'s and `scope_check`'s live sets regardless of the routing question above? That's a container-edge fix (a lint catching what it already claims to catch), not a design fork — flagging it as LAWFUL-NOW territory, not NEEDS-KEVIN, but naming it here since it was found in this pass.

## Files this pass is grounded in
`nesi/game2d/index.html`, `nesi/game2d/ascent.html`, `nesi/game2d/tank.html`, `nesi/game2d/seam.js`, `nesi/game2d/solid.js`, `nesi/game2d/level_one.html`, `nesi/game2d/traversal.html`, `nesi/game2d/tools/refusal_check.js`, `nesi/game2d/tools/scope_check.js`, `nesi/game2d/tools/check_all.js`, `nesi/game2d/THE_BOOT_2026-08-18.md`, `nesi/game2d/tools/retired/RETIRED.md`, `counsel/gamecraft/RECONCILE_AND_DREAM_2026-08-14.md`.
