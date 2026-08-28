# INBOX — unrouted gifts found for the lattice, 2026-08-27

## Wired to the gate — Kevin's mark, 2026-08-27

Decision D5 of the VE24 relationships pass named a real gap: routing a gift
card into the live build had never once gone through a gate `admit` call —
cards 1-4 landed by direct commit, `MARKS.jsonl` stayed silent for 9 days
past the newest cards. Kevin's mark: **"wire to the gate."** Closed two ways:

1. **Retroactive.** Cards 1-4 are now admitted for real —
   `node gate/admit.mjs <id> --made "…" --at "../index.html"`, one call per
   card, run 2026-08-27. Check `gate/MARKS.jsonl`'s tail for the four
   `gift_0{1,2,3,4}_*` entries; `gate/instruments/06-landed.mjs` reads them
   on the next `node gate/gate.mjs` run same as any other admission.
2. **Going forward.** Routing a gift card — committing its capacity into
   `index.html` or any other live file — is not complete until the same
   command runs for it: `node gate/admit.mjs <gift-id> --made "<what it made
   possible>" --at "<path in the live build>"`. The id should match the
   gift's own filename stem. This is the same mechanism already used for
   every other builder admission in this project; nothing new was invented,
   the gift-pipeline was just never pointed at it before.

## Cards 1–4 — routed

All four were built into `index.html` the same day they were filed: #1
(visibility culling → `content-visibility` on the day-groups), #2 (the
filters panel → the `filter` ground), #3 (garden growth → the `garden`
ground), #4 (blind mode → the pad's blind toggle). Kept here as the record
of where each came from — see `PROCESS_GUIDE_2026-08-27.html` and the
session's commits for what actually landed.

1. [the deep never renders — visibility culling](gift_2026-08-27_01_deep_visibility_culling.md) — **routed**
2. [THE FILTERS — the drag-and-sort panel](gift_2026-08-27_02_godot_filters_panel.md) — **routed**
3. [a living growth-form fed by the writer's own activity](gift_2026-08-27_03_garden_growth.md) — **routed**
4. [BLIND — write here, and it leaves](gift_2026-08-27_04_blind_writing_mode.md) — **routed**

## Cards 5–8 — from `tools/library_lens.js`'s first report, opened and read in full

Kevin's ask: "open the top 4 gifts to be ported into nesi." The lens
(`LENS_REPORT_2026-08-27.md`) found 39 unrouted candidates across six
library roots by a cheap heuristic; these four were the ones actually
opened and read whole, not just header-scored — `writing_main.gd`,
`intake/deposit.gd`, `sorting_tarp.gd`, and `render.py`.

**Kevin's mark, 2026-08-27: "let proceed on gifts 1 2 and 3"** (cards 5, 6,
7 in this numbering). Cards 6 and 7 routed same day. Card 5 stays exactly
as filed — its own reading already named why.

5. **[the arrived edit](gift_2026-08-27_05_arrived_edit.md)**
   capacity: M · effort: M · confidence: L — **not routed, correctly so**
   A real, working pattern for showing a change held, not applied, until the
   hand takes it — gated behind a feature (editing) `the_page` doesn't have
   yet. Its own card said "not buildable in isolation" before this pass
   started, and that held: building it now would mean inventing the editing
   precondition it depends on, which is a separate decision, not a routing
   of this gift. Waiting until the day `the_page` grows a second write-in
   point — see the card's own routing note.

6. **[write, read back, only then trust it](gift_2026-08-27_06_verified_write.md)** — **routed**
   capacity: M · effort: L · confidence: H
   `persist()` now writes, reads the same key back, and compares before
   trusting the save landed — `index.html`, `persist()`/`hintText()`. On mismatch, the
   existing `.padhint` line says so instead of proceeding as if it worked.

7. **[the sorting tarp](gift_2026-08-27_07_sorting_tarp.md)** — **routed**
   capacity: H · effort: M · confidence: H
   A tenth ground, "tarp" — every sentence as an anonymous slab, footprint
   by word count, shade by age, laid out once on a deterministic grid-pack.
   No text, no label, no number, anywhere. `index.html`, the `tarp` ground —
   built once already, against Kevin's own brief, for a different pile;
   never checked against this one's sentences until now.

8. **[ratify by crossing, not by naming](gift_2026-08-27_08_ratify_by_crossing.md)** — **routed**
   capacity: M · effort: M · confidence: M
   A second, physical way to confirm a real relationship between two
   sentences — drag one across the other's position — alongside the
   existing text-declare flow, not replacing it. `index.html`,
   `checkRatifyByCrossing()`. **Swept 2026-08-27** (`tools/sweep_thresholds.js`,
   S6): the first version's circle-radius-sum proxy false-positive-ratified
   on up to 44% of the sampled offset space for size-mismatched cards
   (worst case 416px apart while "confirmed") — not a knife-edge, the
   wrong shape of check. Fixed to exact axis-aligned rectangle overlap,
   which needed no constant to tune at all. No longer provisional.

## Cards 9–14 — full pass on the remaining 33 candidates from `LENS_REPORT_2026-08-27.md`

Kevin's ask: unlock action 1 of a three-action sequence, run the extraction
to completion rather than stopping at the top 4. Six parallel judges each
took one library root (world2d, world3d, `_overnight_build`, `bench`,
`nesi_bench_v0`, `game2d/_compost`), read every remaining candidate file in
full, and checked each against the live build before writing a card.
`_overnight_build` came back byte-identical to the live tree (already
received). `bench` and `nesi_bench_v0` came back DRY — every real, portable
discipline they carry (flat non-color-coded node styling, a separate
arrangement layer, single-writer source checks, append-only mark-gated
ledgers, structural-proxy testing) was independently found already-built and
more developed inside `nesi/game2d` itself. Six gifts survived, three from
world3d, two from world2d, one from the composted pre-rebuild `ascent.html`.

9. **[site it on the grain, never by hand](gift_2026-08-27_09_grain_siting.md)** — **routed**
   capacity: M · effort: M · confidence: M
   Built into the WORLD FACE ground: given whichever seats are already
   picked, `deriveGrain()` reads `solid.js`'s own real EMBED coordinates
   and names the unseated seat farthest, on average, from what's already
   seated — the true antipode when only one seat is filled, verified
   directly against `SOLID.antipodeOf()`. Offered as a note only, never
   auto-applied — law 5 (the hand does the separating) still holds; nothing
   is placed until the writer's own click. Admitted to the gate 2026-08-27.

10. **[the freshet test](gift_2026-08-27_10_freshet_test.md)** — **routed**
    capacity: M · effort: L · confidence: M
    A named, one-line falsifier for any ambient readout: would it respond
    identically to two wildly different bodies of real content? Added to
    `.claude/skills/the-closing-check/SKILL.md`'s Question 2, not built
    into the game itself — it's a checklist question, not a game mechanic.

11. **[set it down — the refusal as a real, equal third option](gift_2026-08-27_11_set_it_down.md)** — **not routed, corrected**
    capacity: M · effort: L · confidence: M
    The preflight's proposed cheap route ("reframe the existing staged-
    declare discard") doesn't hold up against the real code: that tray is
    a confirm/cancel binary, one real destination plus a cancel, not a
    genuine multi-destination choice. Gift 11's pattern needs ≥2 real
    doors before a third "nowhere" can be equally weighted. Same shape as
    gifts 9, 13, 14 — gated behind a surface that doesn't exist yet.

12. **[the case — a hand-openable panel that proves what's actually happening](gift_2026-08-27_12_the_case.md)** — **routed**
    capacity: H · effort: M · confidence: M
    A TAB-toggled panel, built once and dropped in a rebuild, that makes
    the page's own refusals (no model call, no network) visible from
    inside the game via real instrumentation (localStorage/network calls
    are wrapped, not asserted). **Not a 1:1 port**: the original's
    boundary toggles gated real conditional code in that build; this
    build's refusals are enforced by absence, verified by a static lint —
    nothing here is actually conditional, so the constraint list is
    read-only, honestly labeled as such, not a fake toggle over nothing.
    `index.html`, `CASE`/`renderCase()`/`CASE_CONSTRAINTS`.

13. **[the burn that never heals itself](gift_2026-08-27_13_the_burn.md)** — **partially routed**
    capacity: M · effort: M · confidence: M
    Sustained attention on one spot accumulates heat and can scorch a
    receiver permanently shut — a qualitative, session-surviving cost with
    no number ever shown. Ran through a full `full-development` dream-and-
    develop pass (`DRAFT_BURN_SHEET_2026-08-27_design_proposal.md`) after
    the first direct-port attempt was caught mischaracterizing the actual
    source mechanic. Converged recommendation (shape 3) built and verified
    2026-08-27: five real dwell-cycles on a sentence permanently mark it
    `overread` (dimmed, desaturated, never a number), attached to the
    existing attention-broadcast hook, no canvas, no new ground, survives
    reload, never decays — tested end to end in a live browser. The fuller
    station (aiming, three receivers, water-routing) remains unbuilt and
    undecided; this is the small test, not the full mechanic.

14. **[a rule for the sheet, not a solver](gift_2026-08-27_14_rule_for_the_sheet.md)**
    capacity: M · effort: M · confidence: M
    A deformable surface driven by one `exp()` falloff per point, no
    physics solver; tears past a reach threshold and heals only in real
    wall-clock time, whether or not the page is open.
