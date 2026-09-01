# LIBRARY LENS — a scan, not a judgment, 2026-08-27

Built on the keeper's instruction 2026-08-27: "build a lens to extract anything
useful we can find and use from the library to aid in this deposit
process." `tools/library_lens.js` did the walking; nothing below has been
read for meaning, confirmed as real capacity, or composted — every line is a
candidate, ranked by a cheap heuristic (real function/class definitions,
nontrivial size, the file's own text claiming "built" or "works"), and every
one still needs a session to open the real file before it's trusted.

A file is left off this list only because `index.html` already names it —
literally, a substring match against this build's own citation comments —
not because anything here judged it unworthy.

## world2d
18 code file(s) scanned, 2 already cited in index.html, 8 unrouted candidate(s) shown.

- **world2d/scripts/main.gd** — score 6 (4770b, has a def, claims built/works)
  > ## NESI — the root. One window, two zones, always both visible. ## ## Build order of the children matters and is the screen's layering, bottom up: ## world the triangle, seen through the glass
- **world2d/scripts/station.gd** — score 6 (9824b, has a def, claims built/works)
  > ## The chassis every station panel is built on. ## ## The grammar is the same at all four and is not re-decided per station: pick a ## fraction out of the tray by hand, then do this station's act with it. What
- **world2d/scripts/writing_main.gd** — score 6 (9286b, has a def, claims built/works)
  > ## THE INTAKE — the opening surface. Nothing precedes it. ## ## One continuous surface, four sources on it: SELF (the band, top), GIVEN and ## FETCHED (the quarried-rock panes, left), and THE TABLE (the merged surface,
- **world2d/scripts/dam_choice.gd** — score 4 (2455b, has a def)
  > ## The dam. The only place the operator governs rather than handles. ## ## Law 7 — held is lawful. Holding is the default and costs no click: water that ## arrives simply stays, and nothing ever asks about it. This surface only opens
- **world2d/scripts/field_view.gd** — score 4 (3953b, has a def)
  > ## The writing field. The program opens here and nothing precedes it. ## ## It lies over the world, not over the room, so both zones stay visible: the ## room band is never covered, and the triangle shows around and behind the
- **world2d/scripts/heliostat_panel.gd** — score 4 (6427b, has a def)
  > ## THE HELIOSTAT TABLE — physics: light. ## ## Light rises from the world below and strikes a mirror on the table. Turn the ## mirror by hand and the beam falls on one of three receivers, one per spire.
- **world2d/scripts/look.gd** — score 4 (8360b, has a def)
  > ## The one place colour, measure and geometry are decided. ## ## Law 10 â€” colour is never the only carrier of a distinction. Every fraction ## here has a SHAPE and a BEHAVIOUR before it has a colour, and the colour is
- **world2d/scripts/membrane_panel.gd** — score 4 (6322b, has a def)
  > ## THE MEMBRANE — physics: tension. ## ## A sheet stretched across three anchors, one per spire. Pull the sheet with ## your hand and a well forms under the pull; water dropped on it rolls into the

## world3d
138 code file(s) scanned, 3 already cited in index.html, 8 unrouted candidate(s) shown.

- **world3d/.walk/_snapshot/scripts/buildings.gd** — score 6 (36513b, has a def, claims built/works)
  > # Stage-2 builder: low-poly flat-shaded buildings with visible edges, name # labels above doors, and in-world interior rooms carrying the flat map's # panel texts as signage. Also shore decoration (stones + wireframe trees) # and the Log Bo
- **world3d/.walk/_snapshot/scripts/intake/deposit.gd** — score 6 (6238b, has a def, claims built/works)
  > ## THE DEPOSIT — the day's writing becomes stones in the shared store. ## ## THIS AUTHORS NO NEW PATH. The chain already exists and was closed on the keeper's ## mark 2026-08-02: a sentence -> `nesi_world_stones` -> `export/web/stones.json`
- **world3d/.walk/_snapshot/scripts/player.gd** — score 6 (25676b, has a def, claims built/works)
  > ## THE TELEPORT DOWN (the keeper's mark 2026-08-07): "Allow a teleport down once the ## teleport chamber is filed with water. about 500 words." ## ## The chamber is the apex room, and the water in it is the same water the intake
- **world3d/.walk/_snapshot/scripts/river.gd** — score 6 (13215b, has a def, claims built/works)
  > # THE RIVER AND THE DAM — sited on the grain, never by hand. # # the keeper's ruling, 2026-08-05, verbatim: # "SITE THE DAM AND THE RIVER ON THE GRAIN: the river runs where the ground # already falls (valleys cut along bedding), and the dam
- **world3d/.walk/_snapshot/scripts/sites.gd** — score 6 (5324b, has a def, claims built/works)
  > # Stage-2 data: the buildings, their placement, and their interior content. # Interior panel texts are the flat map's panel texts (nesi/world/index.html), # reused verbatim as in-world signage. External file links are readable labels # only
- **world3d/.walk/_snapshot/scripts/sorting_tarp.gd** — score 6 (12886b, has a def, claims built/works)
  > # THE SORTING TARP — the first articulation-free instrument in this world. # # the keeper's brief, 2026-08-06, verbatim and load-bearing: # # "if each space has a worksurface and tools... if objects and their uses are # apparent by shape an
- **world3d/.walk/_snapshot/scripts/spires.gd** — score 6 (13638b, has a def, claims built/works)
  > # THE THREE SPIRES, THE APEX ROOM, AND THE CYLINDER — the keeper's marks 2026-08-06. # # This node owns the whole upper world: the round glass-bottomed room at the # apex where the water is generated, the three edges running down from it, and #
- **world3d/.walk/_snapshot/scripts/stations.gd** — score 6 (22978b, has a def, claims built/works)
  > ## Which station you are within reach of, or -1. A fact about distance, the same ## kind of fact `gate_at` and `_near_door_idx` already are.

## _overnight_build
33 code file(s) scanned, 5 already cited in index.html, 8 unrouted candidate(s) shown.

- **_overnight_build/app/surfaces/game2d/crystal.html** — score 6 (56096b, has a def, claims built/works)
  > /* ── column head ── */ .head{padding:12px 14px 10px; border-bottom:1px solid var(--line); flex:0 0 auto} .head h2{font-size:10px; letter-spacing:.22em; font-weight:500; color:var(--dim); text-transform:uppercase} .head .sub{font-size:10px;
- **_overnight_build/app/surfaces/game2d/daily.html** — score 6 (59198b, has a def, claims built/works)
  > /* ═══ THE PALETTE — one world, one set of materials ═══════════════════════ The canonical set, byte-identical with the PAL block in ascent.html. palette_check.js fails if the two ever drift: "one palette" that depends on someone rememberin
- **_overnight_build/app/surfaces/game2d/decisions.html** — score 6 (21806b, has a def, claims built/works)
  > /* a marker, not a fork: it carries no control, so it borrows the fork's reading styles and none of its buttons */ .mk{background:var(--sf);border:1px solid var(--bdr);border-left:3px solid var(--gb); padding:16px 18px;margin-bottom:22px} .
- **_overnight_build/app/surfaces/game2d/field_kernel.js** — score 6 (11106b, has a def, claims built/works)
  > /* ═══ THE FIELD KERNEL ═══════════════════════════════════════════════════════ Built 2026-08-18 on the keeper's mark: "yes it should be rebuilt on this" — answering the field-bench v0.22 drop with a real port, not a reference. WHAT IS PORTED, A
- **_overnight_build/app/surfaces/game2d/hand.js** — score 6 (22696b, has a def, claims built/works)
  > /* ═══════════════════════════════════════════════════════════════════════════ THE HAND — the bed, and what the hand does to it Built 2026-08-16 on the keeper's mark: "build the hand", and before it "both, in order" — the height-field method fir
- **_overnight_build/app/surfaces/game2d/level_one.html** — score 6 (16961b, has a def, claims built/works)
  > /* THE BLIND FACE. The words are in the field and are never shown while you type — "you type and the words don't perform for you." The caret is hidden too, so there is nothing on the surface to watch or to correct against. */ .panel.blind t
- **_overnight_build/app/surfaces/game2d/nesi.html** — score 6 (149612b, has a def, claims built/works)
  > /* THE FRAME (fuller's read, 2026-08-12): the room band was charging 188+16px to the VERTICAL, which is the net's scarce axis — on a short window the world was starved while the abundant horizontal sat letterboxed. The band now yields on sh
- **_overnight_build/app/surfaces/game2d/options.html** — score 6 (55030b, has a def, claims built/works)
  > /* ── the map ─────────────────────────────────────────────────────────── */ .map{background:var(--sf);border:1px solid var(--bdr);padding:14px 10px 8px; margin-bottom:8px;overflow-x:auto} .map svg{display:block;margin:0 auto} .map text{fon

## bench
15 code file(s) scanned, 1 already cited in index.html, 8 unrouted candidate(s) shown.

- **bench/geometric_bench/pywebview_renderer.py** — score 6 (1265b, has a def, claims built/works)
  > """pywebview implementation of the renderer seam. The keeper's mark, cycle 1 session law: "Recommended substrate: pywebview — native local window rendering local HTML/CSS/JS, no server, no port. The lawful swap from the tkinter Canvas." This is
- **bench/composer/composer.py** — score 4 (19772b, has a def)
  > #!/usr/bin/env python3 """ NESI COMPOSER v0 — the render organ. Standard library only. Bench MAKES an object (draft/break/refine, private, engine-dark). The Composer RENDERS a made (or any staged) object into the locked house register: a c
- **bench/composer/room.py** — score 4 (10488b, has a def)
  > #!/usr/bin/env python3 """ NESI ROOM v0 — the living render surface. Standard library only. Stage 5 BUILD of the Composer Cycle (nesi/returns/NESI_COMPOSER_CYCLE_*.md). Sits one layer above composer.py, exactly as composer.py sits one laye
- **bench/geometric_bench/bench_geo.py** — score 4 (1229b, has a def)
  > """NESI bench — geometric layer, cycle 1. Launch entry point. Opens a new, separate local window (NOT the running NESI.exe) that shows bench objects as position-only markers traveling across six regions — intake, staging, break, gate, land
- **bench/geometric_bench/bridge_api.py** — score 4 (1709b, has a def)
  > """The one object exposed to the geometric bench's page as window.pywebview.api. Exactly two calls cross this bridge: get_mock_feed() — seeds intake with the fixtures in mock_feed.json record_dry_run_mark() — appends one line w
- **bench/geometric_bench/renderer/app.js** — score 4 (8916b, has a def)
  > (function () { // GRAIN: forward-only auto-advance chain. 'landing' is deliberately excluded — // it is reachable ONLY through crossGate(), never through advance(). This is // the true-gate rule enforced in code, not just hidden by th
- **bench/geometric_bench/renderer_seam.py** — score 4 (1073b, has a def)
  > """Renderer seam — the swappable boundary between the bench's object state and whatever draws it on screen. This module has zero third-party imports on purpose: it is not allowed to know pywebview exists. The concrete implementation lives i
- **bench/geometric_bench/smoke_test.py** — score 4 (6436b, has a def)
  > """Headless smoke test for the geometric bench, cycle 1. Runs without opening a window. Checks: imports clean, the renderer seam is actually an abstraction pywebview sits behind, the mock feed is well-shaped, the bridge API round-trips a d

## nesi_bench_v0
31 code file(s) scanned, 3 already cited in index.html, 8 unrouted candidate(s) shown.

- **nesi_bench_v0/graph.py** — score 6 (2263b, has a def, claims built/works)
  > """Stage 2 -- the graph (v1 Sec 2 Axis B, Sec 3, guardrails Sec F). Pure Python query layer over the mock feed's links. This module only reads what the feed already declared -- it creates no edges of its own. Ratifying a proposed link into
- **nesi_bench_v0/ledger.py** — score 6 (3756b, has a def, claims built/works)
  > """The dry-run gate ledger (v1 Sec 12, named as a v0 deliverable, built 2026-07-21). Python-side, stdlib-only persistence: `record()` appends one JSON line per mark-worthy event to `nesi_bench_v0/ledger/dry_run.jsonl`. This is what makes `
- **nesi_bench_v0/main.py** — score 6 (1503b, has a def, claims built/works)
  > """Entry point for the NESI bench v0 dry-run surface (Stage 0 rails only). Stage 0 proves the rails: renderer seam, mock feed, string registry + lint, physics config. It does not render objects yet -- that is Stage 1. Running this opens th
- **nesi_bench_v0/position_board.py** — score 6 (12002b, has a def, claims built/works)
  > /*STATE*/null", json.dumps(payload)) HTML_FILE.write_text(html, encoding="utf-8") print(f"[board] rendered -> {HTML_FILE.name} · {len(state['nodes'])} node(s) · volume {payload['volume']}") TEMPLATE = r"""<!DOCTYPE html> <html lang="en"> <h
- **nesi_bench_v0/render.py** — score 6 (23582b, has a def, claims built/works)
  > """Stage 1-2 -- builds the rendered grain + graph surface. Reads the mock feed, the region layout, physics.config.json, and the graph edges, and writes a single self-contained HTML file (no remote resources, no server) that the rendere
- **nesi_bench_v0/renderer/pywebview_renderer.py** — score 6 (1445b, has a def, claims built/works)
  > """pywebview implementation of the renderer seam (held recommendation). pywebview opens a native OS window and loads a local file:// URL directly -- no HTTP server, no bound port, no socket. That is the property this build must prove (spin
- **nesi_bench_v0/tests/test_foreclosures.py** — score 6 (8114b, has a def, claims built/works)
  > """Stage 5 -- the build-level tests (guardrails #70-76), wired for real. Honest scope note, stated once here rather than silently assumed: this project has no JS execution harness (no jsdom, no headless-browser test runner) inside this Pyt
- **nesi_bench_v0/feed/mock_feed.py** — score 4 (1226b, has a def)
  > """Mock object feed (v1 Sec 12) -- fixture-backed, engine dark. Loads feed/fixtures.json into plain BenchObject records. This is the only object source in v0: no engine call, no network read, no real intake path. """ from __future__ impor

## game2d/_compost
1 code file(s) scanned, 0 already cited in index.html, 1 unrouted candidate(s) shown.

- **game2d/_compost/ascent_2026-08-21_pre-rebuild.html** — score 6 (201979b, has a def, claims built/works)
  > /* THE CAP IS ROOM, NEVER A NUMBER. The unfilled strip is what is left. */ .room{height:2px;background:#a49b8c;margin-top:14px;} .room i{display:block;height:2px;background:#17171a;width:100%;transition:width .12s linear} /* ═══ THE SEAM DO
