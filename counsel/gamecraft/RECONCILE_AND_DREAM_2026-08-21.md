## GAME-CRAFT — ROUND THREE, ALONE, MISSING WIRES

**2026-08-22. Continuity: reads against `counsel/gamecraft/RECONCILE_AND_DREAM_2026-08-19.md` (voice/format) and this session's own game-craft read that produced the 08-21 corrections cited in `PROGRESSION.md` and `THE_WORKBENCH.md`. This pass reads code directly: `PROGRESSION.md`, `THE_WORKBENCH.md`, `THE_EDGE_INPUTS.md`, `LEVEL_LIBRARY.md`, `seam.js`, `ascent.html`, `tank.html`, `LEARNED.md`, `.claude/skills/cold-walk/SKILL.md`.** Kevin's own framing this round: not a general delta read, but *"what relationships are missing that would turn something already designed/proposed/named into something actually wired and functioning."* Everything below is organized around that question.

---

## A. WHAT THE DELTA CONFIRMS

**The 08-19 door-finding's own lesson was applied to itself, and held.** The corpus caught its own verification mechanism smuggling an agent invocation in as "a stranger" — a direct hit on the exact seam (law 2/law 3) my 08-19 pass leaned on to certify TANK—CAST as walkable-in-spirit. `cold-walk/SKILL.md` step 6 now reads correctly: *"Only a human who didn't write the code may write WALKABLE... another agent call, another session, under whatever name — is not independent verification."* I read this line directly against `LEARNED.md` law 3 and they now agree word for word. The repair is real and the old text is preserved at `SKILL.md.superseded_step6_2026-08-21.md` rather than silently vanished — law 16's own shape, applied to a skill file rather than game state.

**`waterComplete()`/`waterStanding()` are real, derived-not-stored, and correctly wired into `ascent.html`'s render.** I read `seam.js:61-81` and `ascent.html:357-361` together: the trigger sentence only appears when every one of `solid.js`'s own 8 fall + 4 turn members is in `seamsTaken`, recomputed fresh on every render, no flag. This is a clean instance of law 16's grammar (the medium explores, the derived read never lies about what's actually in the ledger).

**`THE_EDGE_INPUTS.md` is exactly what it says it is** — I traced three rows against `solid.js` by hand (`OVERWINTERING—TANK` as `return`/circuit 2/platform, `CAST—TANK` as `turn`/circuit 3/tutorial) and the generator's own claims held. This is a real, load-bearing artifact, not a proposal.

---

## B. THE MISSING WIRES — what's real on both ends and not actually connected, or connected wrong

This is the center of the round, so I'm putting the single sharpest finding first.

### B1 — TANK already walks a platform edge through the tutorial door, uncoordinated with the trigger that's supposed to gate it

`THE_WORKBENCH.md` states the design plainly: the platform half (12 rise/return edges) is meant to open only once level 12 — "water's twelve" — completes, and each platform edge is meant to route to a real organ, not the generic fraction/window sort. I traced the actual wiring and found the opposite already shipped:

- `tank.html:288-292` builds `SEAMS` from **every** member in `G.ADJ.TANK` with no kind filter — that's `GROUND` (fall), `FILTER` (fall), `CAST` (turn), **and `OVERWINTERING` (return)**, confirmed against `THE_EDGE_INPUTS.md`'s own row: `OVERWINTERING—TANK | return | circuit 2 | platform`.
- `tank.html:669-683` (`renderFaceTabs`) and `tank.html:702-721` (the seam strip) both iterate `SEAMS` undifferentiated and call the exact same `walkSeam`/`fractionControl`/sill mechanism on all four — there is no branch anywhere in the file that asks whether a member is `fall`/`turn` versus `rise`/`return`, and no reference to `SEAM.waterComplete()` gating anything in `tank.html` at all.
- `ascent.html:405` (`renderSeat`), by contrast, calls `SEAM.waterSeamsFor(seat)` — which filters to `waterKind` (fall/turn) only, `seam.js:34,40-49` — so `ascent.html` never shows a platform edge as walkable at any seat, ever, workbench open or not.

**So the same edge (`OVERWINTERING—TANK`) is invisible from one live door and fully walkable — with the tutorial's own generic fraction/window sort, no organ, no gate — from the other.** A player who never leaves `tank.html` (which point 6/7 of this round's delta confirms is now the game's actual, discoverable on-ramp) can complete a platform-half edge before level 12 in any structural sense, using a mechanism `THE_WORKBENCH.md` explicitly proposes replacing with a real tool invocation. This isn't a gap where nothing exists yet — it's worse: **two real, live, shipped code paths already disagree about what a platform edge *is*,** and neither one currently defers to `waterComplete()`. The wire that's missing isn't "connect the organ" (that's B2, still genuinely open) — it's the much cheaper, much more load-bearing one: **tank.html and ascent.html agreeing on which of the 24 edges the water-sort door applies to at all.** Ruled deliberately by Kevin that TANK skips the write-gate and week-gate (point 5) — but nothing in that ruling says TANK should also silently pre-walk a platform edge through the tutorial's own vocabulary. That's this pass's own finding, not a re-litigation of his ruling.

### B2 — the trigger fires into an empty room, and this is not new information but it is now precisely locatable

`THE_WORKBENCH.md` names this itself ("none of these twelve organs can be invoked from inside that page... that bridge does not exist yet") and I confirm it holds exactly as stated: `ascent.html` shows the one honest sentence and the 14-face flash, and then the player returns to `renderMap()`/`renderSeat()`, which — per B1 above — literally cannot show them a platform edge at all. **The wire from "the workbench stands open" to "here is a seat you can now enter differently" does not exist on either page.** The sentence is true and leads nowhere. This is the same shape as my 08-19 finding (a well-built mechanic with no live path to it) but inverted: there the mechanic existed and the door was wrong; here the *door announcing the mechanic* exists and the mechanic itself — 8 of 12 organ pairings still unsound per this session's earlier read, the bridge unbuilt, the boundary-audit unrun — does not.

### B3 — the week-gate has never been wired to anything that can actually test it

`seam.js:190-217` (`weekComplete`) requires 7 distinct real calendar days touched before a door's sill even appears (`ascent.html:441`). This is honest and matches law 20 exactly. But I found no dev/test hook anywhere in the codebase — no override, no fixture, no fast-forward — that lets a walk (cold or otherwise) actually clear a week-gate in one sitting. The delta's own point 10 names "one of which needs to actually run through the real 7-day week-gate to answer the pacing question honestly" as still open — I confirm that from the code side: **there is no wire from "a session wants to verify the week-gate's pacing feels right" to any mechanism that can produce that answer short of an actual person returning on 7 different real days.** That's not a bug — `weekComplete` doing exactly this is the honest design — but it means the pacing question in `LEVEL_LIBRARY.md`'s own §"THE PACING PROBLEM" is structurally unanswerable by any walk faster than a week, and nothing currently flags that as the reason it's still open rather than as an oversight.

### B4 — `law_skill_drift.py`'s own coverage gap is a missing wire between the thing it was built to catch and the thing it can see

Per this round's own delta (point 3), the filter covers laws 2, 3, 14, 22 of 26 — built the same day it caught the cold-walk collision, but not extended to the other 22, including law 26 (added the same day, "advancing state hands back navigation") and law 16 (records only get more — directly relevant to B1's finding, since a mis-walked platform edge is exactly the kind of record that shouldn't have been writable that way). I didn't re-derive the coverage number myself this pass (I'm relying on the round's own accurate framing, already cross-checked against my direct read of `cold-walk/SKILL.md`'s repair, which the tool did correctly catch) — naming it here because a mechanical filter that catches one collision and stays at 4/26 is itself a wire half-built: the relationship between "a law exists" and "something checks a skill against it" is proven for 4 laws and silent for 22, including the two (16, 26) most relevant to the finding above.

---

## C. WHAT'S GENUINELY NEW AND GOOD

**The tutorial door's own discoverability gap from 08-19 is closed, and closed the right way.** `tank.html`'s new always-visible face-tab row (point 6) is a real answer to my own 08-19 D-finding's spirit — a stranger no longer needs to already know a filename or find a collapsed strip. I traced `renderFaceTabs()` and it's driven off the same `SEAMS` array as everything else, no second source of truth.

**`THE_EDGE_INPUTS.md` is the right shape of artifact for the moment this corpus is in.** It answers Kevin's own reframing ("what are the inputs, and how do they affect downstream participation") without proposing a single mechanic on top of them — pure geometry, generated not hand-written, regeneratable. This is exactly the kind of foundation B1's fix would need: any rule that says "tank.html should treat rise/return edges differently" can be written *against* this table rather than against a fresh re-derivation.

**`THE_WORKBENCH.md`'s own self-audit is unusually honest about what it hasn't done** — it names the bridge gap, the unsound 8/12 pairings, and the unrun boundary-audit as open, in its own voice, rather than presenting the mapping as settled. That discipline is exactly what let this pass locate B1/B2 precisely instead of having to re-discover that a gap exists.

---

## D. WHAT'S UNSWEPT

**`REACH=900` (still, from 08-19) and now also `ROOT_STEP=0.22`'s downstream effect on `WEEK_LEN=7`** — nobody has walked what 7 real days of `growRoot`'s asymptotic curve actually feels like against a human's patience, and B3 above names why that's structurally hard to sweep at all under the current build. Not urgent, same register as 08-19's finding, but now compounded: a constant that couldn't be swept before is now gating a mechanism (the platform trigger) that a whole workbench design sits behind.

**Whether `OVERWINTERING—TANK`'s early, undifferentiated walk (B1) has already happened in any real save state.** I did not check `localStorage` or any player's actual `S.seamsTaken` — this pass is a source read, and per law 2/cold-walk itself, whether this defect has already fired for real is UNWITNESSED, not confirmed either way.

---

## E. THE ONE SENTENCE

**The workbench trigger, the edge-input table, and the tutorial door are each, independently, real and correct — and the wire connecting them is not merely unbuilt, it is already miswired in the opposite direction: `tank.html` walks a platform edge through the tutorial's own generic sort today, undifferentiated and ungated, while `ascent.html` hides platform edges from view entirely and the one true sentence announcing them opens onto a map that cannot show a single one.**

---

## NEEDS-KEVIN

- **B1 is a fork, not a bug I can default.** Is `OVERWINTERING—TANK` (and any other platform edge touching a seat with a tutorial door) meant to be walkable at all before `waterComplete()`, using the tutorial's fraction/window sort? Your own ruling that "TANK always meant to be the on-ramp" and skips the write-gate/week-gate (point 5) could be read either way — as "TANK is exempt from every gate, including which edges it may touch" or as "TANK is exempt from write/week specifically, not from what an edge *is*." Naming it rather than picking a side.
- **Whether the platform half gets *any* interactive door before the organ-bridge exists is your call**, not a default this seat can make. One honest option this pass surfaces but does not recommend: `ascent.html` could show a platform edge as *visible but inert* once `waterComplete()` fires (a seam card with no fraction control, just its own geometry, per B2) — a smaller, cheaper wire than the full organ mapping, and one that would at minimum stop the sentence from opening onto nothing. Offered as a name, not a build.
- **Should `law_skill_drift.py`'s coverage (4/26) be extended before or after B1 is resolved?** If law 16/26 coverage existed today it likely would not have caught B1 (it's a code-to-code disagreement, not a law-to-skill-file collision) — naming that limit so the filter isn't assumed to be a safety net it isn't yet.

## Files this pass is grounded in
`nesi/game2d/PROGRESSION.md`, `nesi/game2d/THE_WORKBENCH.md`, `nesi/game2d/THE_EDGE_INPUTS.md`, `nesi/game2d/LEVEL_LIBRARY.md`, `nesi/game2d/seam.js`, `nesi/game2d/ascent.html`, `nesi/game2d/tank.html`, `nesi/mind/LEARNED.md`, `.claude/skills/cold-walk/SKILL.md`, `.claude/skills/cold-walk/SKILL.md.superseded_step6_2026-08-21.md`, `counsel/gamecraft/RECONCILE_AND_DREAM_2026-08-19.md`.
