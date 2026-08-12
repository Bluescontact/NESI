# NESI v2 — the full organ body (the regather)

**Why this file:** v2 was being built as a thin four-strata sketch (pulse·soil·forest·coordination)
while the *real* NESI is a whole body of organs — ~28 built, ~10 spec'd. Kevin's correction
2026-07-25: v2 is a **migration + assembly of the full organ body**, not a reduction. The
metabolizer and much more migrate in. This is the map of every organ, grouped into the v2
organism, so the whole is held in one place. Nothing here is new work yet — it is the inventory.

Legend: **KEPT** = migrates in as-is (verified) · **BUILT-v2** = built fresh this session ·
**MIGRATE** = existing organ to wire into the v2 body · **BUILD** = spec'd, not yet built ·
**COMPOST** = superseded surface.

---

## I · THE PULSE — engine / metabolism (the jitterbug: tetra ↔ vector-equilibrium)

The four processes Kevin named as infrastructure, expressed in the organs.

- `core` — **the metabolizer**: the loop/organ logic, surface·gate·ledger. **MIGRATE** (the heart of the old machine into v2).
- `engine_local` — the no-login local engine socket. **MIGRATE**.
- `continuity` — persistence across sittings (so Kevin stops being it). **MIGRATE**.
- `library` — the pattern library (100+), read-only browse. **MIGRATE**.
- `lint_bridge` · `preflight` — lint attach + the two-sign-off seam-clean check. **MIGRATE**.
- geometric foundation (visible-as-shape, unspoken-as-word): `tetra-body`, `two-state/jitterbug`, worth=held-center, held-centers family. **KEPT** (verified, never deleted).

## II · THE SOIL — intake → compost

- `soil` — composts intake to substrate; FALLOW honored; external needs the gate. **BUILT-v2**.
- `front` — the plain-language way in (conversational). **MIGRATE**.
- `glance` — the light daily surface (the door). **MIGRATE**.
- `interrogator` — the organ that reaches back. **MIGRATE**.
- `reader` — the structural second-read, externalized. **MIGRATE**.

## III · THE FOREST — the grown self + the gifts

- `heartwood` — **the accreted self, rendered as a growing form** — the *tree* Kevin named. **MIGRATE** (there is already `_INTAKE/WIRE_PREP_heartwood_into_board_2026-07-24.md` — heartwood→board wiring was prepped).
- `forest` — the gift library; the **embers** grow here. **BUILT-v2**.
- `held` · `held_map` · `held_record` — everything held, its gaps, and homes for the open. **MIGRATE**.
- `return_circuit` — brings held things back when anchored. **MIGRATE**.
- `deepdive` — the deep review chamber. **MIGRATE**.
- `bench` — the production/make-break-refine surface. **MIGRATE**.
- `annotations` — the sidecar for the daily act. **MIGRATE**.

## IV · THE MEMBRANE — boundary / coordination (NESI as the synthetic boundary)

- `coordination_surface` — the way in from outside; the Held-Refusal law as code; the gate. **BUILT-v2**.
- `skin` — **the boundary / immune layer**. **MIGRATE** (this is literally the membrane organ).
- `tension_table` — the workbench's keystone (deterministic core). **MIGRATE**.
- `whole_body` — the stage-6 close (the body seen whole). **MIGRATE**.

## V · THE FACE — the visible surface (geometry-visible board)

- `board` (`build_board.py`) — the game-language, geometry-visible board; embers glowing. **BUILT-v2**.
- `surface_bridge` — **already wires the HTML face to NESI's real disk + local engine.** **MIGRATE** — this is the wire for "metabolizer behind the board"; not from scratch.
- `surface_app` · `nesi_app` — the old native faces. **COMPOST** (superseded by the board).

## VI · SPEC'd — expressions to build / wire in

- `SPEC_the_worth_organ` — worth = the held center; the one recognition-mechanic still needing its organ. **BUILD**.
- `SPEC_the_player_surface` — the player-facing surface spec. **BUILD/WIRE**.
- `SPEC_the_soil` · `SPEC_the_routing` — soil + routing specs (soil built; routing to wire). **WIRE**.
- `GIFT_SEED` / tree-seed · `tetra_transaction_face` · `receiving_organ_design` · `integrity_organ_spec`
  · `draft_instrument_witnessing_a_gift_without_merging` — the different expressions Kevin named. **BUILD**.

---

## The corrected shape of the build

NESI v2 = the **whole organ body**, assembled into the geometry-visible game surface:
the pulse (metabolizer migrates in) beats through the organs; the soil takes intake; the forest
grows the self (heartwood) and the gifts (embers); the membrane (skin + coordination) is the
boundary; the face is the board. The four-strata sketch was the skeleton — this is the body.

**The migration order (proposed, Kevin's to steer):**
1. **Wire the metabolizer behind the board** — **DONE 2026-07-25 (pass A).** `pulse_wire.py` hands
   composted material to `core.capture_paste` (the real intake path) and reads `core.state()` for the
   board. soil `feed_pulse` flag added; coordination `admit` feeds the pulse on Kevin's gate-mark.
   Verified: feed → real INBOX (inbox 3→4), full membrane drop→gate→admit→intake, test piles cleaned up.
   **Note: the engine is not dark — it registered a LOCAL engine (`hermes3:8b`).** So the metabolizer
   can actually run locally, no /login needed for the local tier.
2. **Migrate the self + held organs** — **DONE 2026-07-25 (pass B).** `v2_board_data.py` aggregates
   the live organs; `build_board.py` now draws: the **tree** (heartwood — growth rings + "the self ·
   107 patterns · 20 crossings", real), the **held** (7 things, each with its gap), the **returns**
   line (quiet/honored). All read-only, derived, never scored. Board regenerated + verified.
   **Gate surfaced:** `WIRE_PREP_heartwood_into_board` gated heartwood-on-the-live-board on Kevin's
   margin felt-read (his, pending) — but that gate was about rebuilding the *tkinter exe* ahead of it;
   the v2 **web board is a new, read-only surface** and `nesi_app.py`/the old exe are UNTOUCHED, so no
   gate was jumped. If Kevin wants heartwood held off the board until the margin read, it reverts by
   one flag. Deeper held-family organs (deepdive/bench/annotations/held_map) are chambers/actions —
   they migrate as the board gains interaction (a later pass), not as static render.
3. **Migrate the intake + membrane organs** — **DONE 2026-07-25 (pass C).** Added to `v2_board_data`
   + the board as "the body's signs": the DOOR (`glance` — 6 gauges, e.g. System state=AT REST),
   the MEMBRANE (`skin.law_summary` + `tension_table.canon_index` — canon sorted organ/nutrient/lens/
   seed/pollen), the REACH-BACK (`interrogator.open_reach` — "felt-read queue holds 23…"). All real,
   read-only, never scored. Board regenerated + verified. **Honest scope:** `front` (route/handle) and
   `reader` (read) are ACTIONS, not static state — they migrate as the board gains interaction (when
   the board wires to engine actions, a later pass), not as render. `whole_body`'s count folds into
   heartwood's 107.
4. **Build the spec'd expressions** — **flagship DONE 2026-07-25 (pass D).** The **worth organ**
   (`worth.py`, 7/7) — surface·mark·hold·witness, every hard-NO enforced (no score/rank/assignment;
   marks derived-not-stored; only comparison = own past as witness). **This completes the recognition
   law's four mechanics** (value→circulation-witness, capacity→heartwood, skill→floor-pattern,
   worth→this). Wired a worth readout onto the board. Placement fork (7th organ / convener / vessel)
   stays Kevin's — the law-abiding CORE is built, the outward membrane is his call.
   **Honest status of the other expressions (staged specs, each its own focused build, not faked):**
   `player surface` ≈ largely IS the v2 board (covered); `receiving organ` ≈ the coordination surface's
   receive-path (partly covered); `integrity organ`, `witnessing-a-gift-without-merging` (draft),
   `gift/tree seed`, `tetra transaction face` — real specs, each a build of its own, recommended as
   later focused passes rather than rushed here.
5. **Repackage** — **DONE 2026-07-25 (pass E).** Source machine verified: `python nesi/nesi_v2.py`
   (or `NESI.bat`) regenerates the board from ALL wired organs (3 embers · 7 held · 20 crossings ·
   door · membrane · reach-back · worth). Fresh exe rebuilt with all 30 organs bundled →
   `nesi/NESI_v2.exe` (21.9MB, PyInstaller build succeeded). **Old `nesi/NESI.exe` KEPT** (+ backup in
   `_compost/`) — NOT retired: retirement waits until v2 demonstrably carries metabolize-a-pile-across-
   a-sitting, which is Kevin's double-click to confirm (GUI unverifiable headlessly). The reliable
   runner today is `NESI.bat` (source, verified); the exe is Kevin's to test.

---

## MIGRATION COMPLETE (A–E, 2026-07-25)

NESI v2 = the whole organ body assembled into the game-language, geometry-visible board on the kept
pulse. Wired + verified: pulse (metabolizer) · soil · forest (embers) · coordination (the way in, gate
Kevin's) · heartwood (the tree) · held · returns · door (glance) · membrane (skin + tension) ·
reach-back (interrogator) · **worth** (completing the recognition law's four mechanics). Runs via
`NESI.bat`; packaged as `nesi/NESI_v2.exe`. **Deferred (honest, each its own focused build):** the
interactive-action organs (front/reader) as the board gains interaction; the spec'd expressions
(integrity · witnessing · gift/tree seed · transaction face); the worth placement fork; Kevin's
double-click to verify the exe and then retire the old machine. Nothing crossed to canon.

**Held invariants:** the geometry is visible (shape shows, jargon unspoken) · game language on the
surface · reduce burden · high-signal/low-noise · the mechanic never recognizes · the outside-person
gate is Kevin's · nothing deleted until v2 carries its work.

---

*The inventory. Nothing built here — this is the map so the whole body is held, not sketched.*
