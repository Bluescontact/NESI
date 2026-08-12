# COMPOSER CYCLE — STAGE 1 EXTRACT
**Date:** 2026-07-21. **Ground:** _INTAKE/RETURN_rebuild_pass3_2026-07-21.md (pass-3 whole-body blueprint, unratified). **Status:** extraction complete; one finding flagged before Stage 2, not smoothed over.

## Flagged finding, read before anything else
The render organ named absent in this cycle's own brief ("ARTIFACT_GRAMMAR is already in the codebase; the organ that instantiates it into a living space is not") is not, in fact, absent as code. `nesi/bench/composer/composer.py` (19KB, executable) plus `STANDING_SPEC.md` and `samples/` were BUILT 2026-07-20, session 4/4 (`nesi/returns/NESI_COMPOSER_2026-07-20.md`), and are live-wired right now:
- `nesi/conductor/bench.py` imports it (`_import_composer`, lazy) and calls `composer.compose()` from both `compose_preview()` (on every new bench object) and `land()` (on every landed object) — confirmed by direct grep, not from memory.
- `nesi/conductor/front.py` surfaces the result as a plain-text `diagram_status` line (`composed: present/missing`).
- `nesi/conductor/nesi_app.py`'s bench tab has a native `tk.Canvas` panel that redraws the same boundary-band-first / nodes-on-top primitives.

What's true, more precisely: the render **primitives and data pipeline** exist and are wired end-to-end (object → DSL → SVG/HTML/Canvas). What does not exist is a **living, reorganizing space** — a surface Kevin can actually work in, where bench objects appear as nodes he can move/prune/trim rather than a fixed one-diagram-per-object card. The native Canvas tab is the closest thing built, and per its own STANDING_SPEC it was "not yet seen live in the window" as of 2026-07-20 — still true as of this extraction, one day later.

Separately: pass-3's whole-body blueprint (2026-07-21, STEP 2, "metabolic axis") names front/bench/continuity/return_circuit as the running organs and never mentions the Composer once, despite it being live-wired code at the time pass-3 was written. This isn't a contradiction that needs resolving before Stage 2 — the two documents are just doing different jobs (pass-3 named the metabolic axis; the render organ sits beside it, not on it) — but it means Stage 2's "coupling surface" work should treat composer.py as a real existing attachment point, not greenfield, and should note the pass-3 omission plainly rather than pretend it was already accounted for.

## Extracted capacities — flat inventory, no judgment, no NESI-fitting yet

### A. Render primitives + data pipeline (nesi/bench/composer/) — built, wired, unmarked
- `composer.py`: `REGISTER_CSS` (one locked stylesheet) · DSL parser/validator (`parse_dsl`/`validate_dsl`, stdlib-only) · one renderer at two scales (`render_diagram_svg`, `SIZES = {card, full}`) · three artifact types (`render_card`, `render_infographic`, `render_doc`) · one seam (`author_diagram` via `bench.invoke`).
- Hard rule enforced in code: boundary band (substrate) drawn first, nodes as flat recognition sites on top — symbol-law inversion, not per-diagram choice.
- Honest-stub law: a diagram-less object renders text-only with the gap flagged (`diagram_status: "missing"`), never a fabricated diagram.
- Wired live: `bench.compose_preview()` (every new object), `bench.land()` (every landed object), `front.py` (surfaces `diagram_status` as text), `nesi_app.py` (native Canvas echo, parallel implementation not shared code path).
- Known gaps named in its own return: loop-edge curves draw stacked/crowded on 3-node diagrams; `run_break`/`run_refine` don't recompute `composed`; edge-form leverage markers not handled in the native Canvas; register-matching by audience deferred door-side, unbuilt.
- State: built-and-wired, never felt-read by Kevin in the actual window.

### B. Card/chassis click-to-open/click-to-steer mechanics (_widgets/_chassis_v4.html) — built, working, live default
- One-line card → click opens to plain explanation → fixed steering vocabulary (GO/WARMER/PLAINER/HOLD◆/DROP), heavy cards gate GO behind a 3-line plain manifest.
- State machine: `toggle/steer/openMfp/closeMfp/commit/hold/renderMarks/deposit`; clipboard-copy with execCommand fallback and visible reveal-box for sandboxed iframes.
- Pure HTML/CSS/JS, no external libs, 23-token light-mode-only palette, no `position:fixed`.
- Superseded lineage (v1/v2/v3) kept for history only, not live.

### C. Tetrahedral/polyhedral geometry (Ari_Tal_handoff/, genesis_seed_share/) — spec-only, no code render
- Five instrument set (somatic/developmental/architecture/cognitive/temporal), each a 4-vertex/6-edge/4-face diagnostic frame; three are complete-graph K4, one (temporal) is a directed 4-phase cycle.
- Markdown + JSON + a Python schema validator (`validate.py`) only — no SVG/canvas/CSS-3D shape has ever been drawn for these anywhere in the tree.
- `genesis_seed_share/genesis-seed-v5/preview.html` is a static serif document-preview renderer (book/manuscript styling), not an interactive geometry widget.

### D. Node/panel diagrams elsewhere on disk
- `wiring.html` (root): built SVG node graph, click-to-expand detail panel, line-style legend (solid/dashed-gold/dashed-red).
- `gate/THE_GATE.html`: built queue/table display (staged/held/marked/composted), not spatial.
- `open_ledger/circuit.html`: built tabbed form-driven ledger UI (Self/Field/Routes/System), not a drawn circuit despite the name.
- `state_view.html`, `THE_GOVERNOR.html`: contain `position:absolute` layout, not read line-by-line this pass.
- `THE_CONVERGER.html`, `THE_DECISION_SURFACE.html`, `THE_CROSSING_SPINE.html`, `THE_ASSEMBLY.html`, `map_view.html`, `cost_map.html`, `operator_terminal.html`: no svg/canvas/absolute-position hits found; likely panel/document style like the chassis, not independently read.
- Miro Tree-of-Life system diagram: designed direction only, lives on Miro's hosted board (external), not a local file.

### E. RI Kit reference pages (kit/*.html) — built, static, non-geometric
Serif documentation cards, nav + hover only, no interactivity or geometry.

## Return
Extracted capacities as above, flat. The genuinely load-bearing new fact for Stage 2 is section A: a working render pipeline already sits at the exact seam this cycle is aiming to build a living space onto — Stage 2 (GATHER) should lay this pipeline beside ARTIFACT_GRAMMAR/bench objects/ORGAN_CONTEXT/THE_ASSEMBLY as the primary existing attachment point, with the chassis click-mechanics (B) as the interaction vocabulary candidate, not the other way around.

Nothing here is ratified. No redesign performed. Stage 2 waits behind this file, not assumed.
