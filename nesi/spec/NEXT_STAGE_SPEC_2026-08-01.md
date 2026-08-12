# NEXT STAGE SPEC — NESI development after the world stood up
**Written:** 2026-08-01, at session 94b5d17f close, on Kevin's mark. Self-contained: a fresh session (or Cowork run) can execute from this file alone.
**Governing stack, in precedence order:** `TETRA_BUILDERS_AGREEMENT.md` (SIGNED — every pass invokes all four vertices) · `THE_WHOLE_NAMING_2026-07-31.md` (ACCEPTED AS AMENDED; §7/§7b/§7c govern) · `OVERNIGHT_BUILD_SPEC_2026-07-31.md` (laws) · `REMNANTS_FOR_THE_GAME_2026-07-31.md` (inventory).

---
# UPDATE — 2026-08-01 21:10, session 94b5d17f close (read this section first; it supersedes the original body where they differ)

**Landed since this spec was written:** Stage 5 THE FIELD (VE true coords, 12 mirrors verbatim hard-limits, empty held center, verified order-12 collapse on [C]) · the standing flags (debug channel removed, title fixed) · the Log Book bridge (write → GENERATE → stones on the Shore, verbatim) · BUILDS 1–3 (the in-world interface overlay with pockets/[H], marks bar + DEPOSIT, Tab map, locator line — custom HTML shell survives re-export; the three organ stores wired via `export_stores.py` → `stores.json`, outward registers only per DOCTRINE §16, disclosure proven by grep; the localhost POST direct drop removing the manual stone step) · the **ds-kit design sync**, complete: 17 components, 63/63 cells graded good, uploaded to claude.ai/design project `50235b92-f5f4-4560-92d4-91ffeefb88bc`, 19 stale files from a parallel session removed.

**RUNNING AT CLOSE (gate open):** the **tetra-in-terrain** build — Kevin's 17:26 correction made law. See `feedback_steering_without_articulation.md` in memory. Four combinable poles (LOOK · TURN · HOLD · MARK, pole names still Kevin's to change) openable at ANY point in the terrain including bare ground; output GENERATED from position × combination, never canned; tension rendered, never collapsed; copy never sends. Reference implementation the builder was handed: the `.tetra` block + `gen()` in `_widgets/latest_94b5d17f.html`. Report lands at `nesi/world3d/TETRA_REPORT.md`.

**THE LAW THIS SESSION ADDED — binding on every future surface:** Kevin steers by *position and combination*, never by composing sentences. A surface that requires articulation to change direction is a build failure. One cross button is the highest-capacity channel for exactly one option — legitimate for that, insufficient as the system. This supersedes any single-cross funnel geometry elsewhere in these specs.

**Standing flags carried:** the in-world interface is hand-written markup using ds-kit classes, not the React components themselves · Membrane outward registers render empty because `nesi/boundary/log.jsonl` does not exist yet · Spire/Membrane surfaces proven headlessly + by console, not photographed · mouse-look and jump still unverified by automation.

**Open gates at close: 9** (see OPEN_GATES.jsonl) — Social Systems manifest · three recut-held patterns · Keeper wording drafts · Crystal v0/v1 · world-v2 walk reads (×2) · orchard overnight report · membrane-terms publish question · the tetra build.

---

## WHERE THE BUILD STANDS (verified, on disk)
- **World v1 (flat map):** `nesi/world/` — demoted to the in-game map on Kevin's read ("a map is not a world").
- **World v2 stages 1–4 (Godot 4.7.1):** `nesi/world3d/` — walkable terrain (seed 465 from MARKS_LOG line count), enterable buildings (Three Spires · Workshop · Hearth · Heliostat · Membrane arch), NESI circling her vortex with four askable commands, fog→rain→carved-reliefs weather cycle (§7c, provisional). Door: `PLAY_WORLD.bat`. Reports: `STAGE_1_REPORT.md`, `STAGE_2-4_REPORT.md`.
- **ds-kit (running at close):** `ds-kit/` — DS_v1 chassis as a React component library; Tetra Agreement pass 1. Check `ds-kit/KIT_REPORT.md` for its outcome before relying on it.

## THE NEXT STAGE, IN PRIORITY ORDER

### 1 · STAGE 5 — THE FIELD (manifest already authored; go NOT yet given — Kevin's gate)
A clearing beyond the shore holding the deep geometry, visible and usable:
- The vector equilibrium at true coordinates — 12 vertices = permutations of (±1,±1,0), scaled to walk among.
- TWELVE MIRRORS, one per vertex, each bearing one of the twelve executables per the adopted six-pair standing read (`NESI_VE_TWELVE_ORGANS.md`, "The bookkeeping fixed"). Standing before a mirror shows that organ's `hard_limits` line verbatim from `nesi/bench/bench.json`.
- The held center visibly EMPTY — membrane-controller, labeled as the crossing that never collapses into the machine; categorically not a 13th vertex.
- THE COLLAPSE, usable and Kevin-initiated only: implement the VERIFIED order-12 symmetric flex from `NESI_VE_TWELVE_ORGANS.md` — Squares A and C merge same-number ({a1,a2}{a3,a4} / {c1,c2}{c3,c4}), Square B merges cross ({b1,b3}{b2,b4}), 12→6 octahedron and spring back. No invented geometry; the doc's traced motion is the source.
- Verify by walking in, reading a mirror, firing the collapse, watching the spring-back. Report: `STAGE_5_REPORT.md`.

### 2 · STANDING FLAGS FROM STAGES 1–4 (small, do early in any pass)
- Remove the browser-local debug channel (`window.__nesi_keys`) from the export — Kevin's word was the condition; treat this spec as that word unless he reverses.
- Fix the exported page title (still "Stage 1").
- Verify mouse-look and Space jump by hand-instruction to Kevin or improved automation; record which.

### 3 · THE OPEN DESIGN SLOTS (Kevin's marks needed; stage nothing silently)
- **The kinds typology** (§7 amendment): seeds/tools/components/lenses/devices/stones — stage a table (kind · shape · lifecycle · home) from Kevin's words + the crossed six-category typology; his marks pick.
- **The daily ground-shape mechanic** (§7c): mountains are the writing-terrain's home; current implementation is a triggered visual cycle; the actual writing→sediment mechanic is undesigned. Guard absolute: word-shape only, never meaning.
- **The Log Book → engine integration:** `nesi/world/logbook.html` writes localStorage; the Godot world does not read it yet. Design the bridge (an export file the engine reads at load is the simplest lawful path). Flagged future in stage 2-4 report.
- **Seven-vs-tetra frame** (open gate since 08-01): the Workshop as seventh organ vs the six-edge tetra — Kevin rules in daylight; do not build geometry that depends on the answer.

### 4 · THE ds-kit → claude.ai/design SYNC (blocked on Kevin's clicks)
When `KIT_REPORT.md` shows the fidelity check passed: run /design-sync package-shape per its skill. Interactive by nature — project creation and the one upload approval are Kevin's. Membrane law: chassis structure crosses; marks, ledgers, writing never.

## STANDING LEDGER STATE AT CLOSE
Open gates (OPEN_GATES.jsonl): Social Systems manifest (7-30) · three recut-held patterns (7-30) · World-v2-through-stage-4 awaiting Kevin's walk + flag reads · ds-kit build/sync · Stage 5 Field manifest holding. All marks through 10:34 caught; the 10:04 kit-go mark stays pending until the kit report lands.

## LAWS (carried whole — the agreement's V2, no restatement needed per pass)
Recognition law · no surveillance/read receipts · the Deep never renders contents · no scores, no completion affordances · nothing directs Kevin's body · morning-pages guard · gift-only membrane, receiver's mark makes the gift · light palette · no network in the built world · locate, never steer · every pass ends: "This pass runs under the Tetra Builders Agreement, all four vertices."
