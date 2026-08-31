# LIBRARY LENS — a scan, not a judgment, 2026-08-31

Built on Kevin's instruction 2026-08-27: "build a lens to extract anything
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
18 code file(s) scanned, 2 already cited in index.html, 6 unrouted candidate(s) shown.

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

## world3d
138 code file(s) scanned, 9 already cited in index.html, 6 unrouted candidate(s) shown.

- **world3d/.walk/_snapshot/scripts/buildings.gd** — score 6 (36513b, has a def, claims built/works)
  > # Stage-2 builder: low-poly flat-shaded buildings with visible edges, name # labels above doors, and in-world interior rooms carrying the flat map's # panel texts as signage. Also shore decoration (stones + wireframe trees) # and the Log Bo
- **world3d/.walk/_snapshot/scripts/player.gd** — score 6 (25676b, has a def, claims built/works)
  > ## THE TELEPORT DOWN (Kevin's mark 2026-08-07): "Allow a teleport down once the ## teleport chamber is filed with water. about 500 words." ## ## The chamber is the apex room, and the water in it is the same water the intake
- **world3d/.walk/_snapshot/scripts/sites.gd** — score 6 (5324b, has a def, claims built/works)
  > # Stage-2 data: the buildings, their placement, and their interior content. # Interior panel texts are the flat map's panel texts (nesi/world/index.html), # reused verbatim as in-world signage. External file links are readable labels # only
- **world3d/.walk/_snapshot/scripts/spires.gd** — score 6 (13638b, has a def, claims built/works)
  > # THE THREE SPIRES, THE APEX ROOM, AND THE CYLINDER — Kevin's marks 2026-08-06. # # This node owns the whole upper world: the round glass-bottomed room at the # apex where the water is generated, the three edges running down from it, and #
- **world3d/.walk/_snapshot/scripts/stations.gd** — score 6 (22978b, has a def, claims built/works)
  > ## Which station you are within reach of, or -1. A fact about distance, the same ## kind of fact `gate_at` and `_near_door_idx` already are.
- **world3d/.walk/_snapshot/scripts/terrain.gd** — score 6 (21208b, has a def, claims built/works)
  > /*, shell/*"), so no # runtime fetch and no async — height() stays a synchronous static call. class_name Terrain const BEDROCK_PATH: String = "res://data/world_data.json" const WORLD_HALF: float = 100.0 # world spans x,z in [-100, 100] cons

## _overnight_build
33 code file(s) scanned, 6 already cited in index.html, 6 unrouted candidate(s) shown.

- **_overnight_build/app/surfaces/game2d/crystal.html** — score 6 (56096b, has a def, claims built/works)
  > /* ── column head ── */ .head{padding:12px 14px 10px; border-bottom:1px solid var(--line); flex:0 0 auto} .head h2{font-size:10px; letter-spacing:.22em; font-weight:500; color:var(--dim); text-transform:uppercase} .head .sub{font-size:10px;
- **_overnight_build/app/surfaces/game2d/daily.html** — score 6 (59198b, has a def, claims built/works)
  > /* ═══ THE PALETTE — one world, one set of materials ═══════════════════════ The canonical set, byte-identical with the PAL block in ascent.html. palette_check.js fails if the two ever drift: "one palette" that depends on someone rememberin
- **_overnight_build/app/surfaces/game2d/decisions.html** — score 6 (21806b, has a def, claims built/works)
  > /* a marker, not a fork: it carries no control, so it borrows the fork's reading styles and none of its buttons */ .mk{background:var(--sf);border:1px solid var(--bdr);border-left:3px solid var(--gb); padding:16px 18px;margin-bottom:22px} .
- **_overnight_build/app/surfaces/game2d/hand.js** — score 6 (22696b, has a def, claims built/works)
  > /* ═══════════════════════════════════════════════════════════════════════════ THE HAND — the bed, and what the hand does to it Built 2026-08-16 on Kevin's mark: "build the hand", and before it "both, in order" — the height-field method fir
- **_overnight_build/app/surfaces/game2d/level_one.html** — score 6 (16961b, has a def, claims built/works)
  > /* THE BLIND FACE. The words are in the field and are never shown while you type — "you type and the words don't perform for you." The caret is hidden too, so there is nothing on the surface to watch or to correct against. */ .panel.blind t
- **_overnight_build/app/surfaces/game2d/nesi.html** — score 6 (149612b, has a def, claims built/works)
  > /* THE FRAME (fuller's read, 2026-08-12): the room band was charging 188+16px to the VERTICAL, which is the net's scarce axis — on a short window the world was starved while the abundant horizontal sat letterboxed. The band now yields on sh

## bench
15 code file(s) scanned, 1 already cited in index.html, 6 unrouted candidate(s) shown.

- **bench/geometric_bench/pywebview_renderer.py** — score 6 (1265b, has a def, claims built/works)
  > """pywebview implementation of the renderer seam. Kevin's mark, cycle 1 session law: "Recommended substrate: pywebview — native local window rendering local HTML/CSS/JS, no server, no port. The lawful swap from the tkinter Canvas." This is
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

## nesi_bench_v0
31 code file(s) scanned, 4 already cited in index.html, 6 unrouted candidate(s) shown.

- **nesi_bench_v0/graph.py** — score 6 (2263b, has a def, claims built/works)
  > """Stage 2 -- the graph (v1 Sec 2 Axis B, Sec 3, guardrails Sec F). Pure Python query layer over the mock feed's links. This module only reads what the feed already declared -- it creates no edges of its own. Ratifying a proposed link into
- **nesi_bench_v0/ledger.py** — score 6 (3756b, has a def, claims built/works)
  > """The dry-run gate ledger (v1 Sec 12, named as a v0 deliverable, built 2026-07-21). Python-side, stdlib-only persistence: `record()` appends one JSON line per mark-worthy event to `nesi_bench_v0/ledger/dry_run.jsonl`. This is what makes `
- **nesi_bench_v0/main.py** — score 6 (1503b, has a def, claims built/works)
  > """Entry point for the NESI bench v0 dry-run surface (Stage 0 rails only). Stage 0 proves the rails: renderer seam, mock feed, string registry + lint, physics config. It does not render objects yet -- that is Stage 1. Running this opens th
- **nesi_bench_v0/position_board.py** — score 6 (12002b, has a def, claims built/works)
  > /*STATE*/null", json.dumps(payload)) HTML_FILE.write_text(html, encoding="utf-8") print(f"[board] rendered -> {HTML_FILE.name} · {len(state['nodes'])} node(s) · volume {payload['volume']}") TEMPLATE = r"""<!DOCTYPE html> <html lang="en"> <h
- **nesi_bench_v0/renderer/pywebview_renderer.py** — score 6 (1445b, has a def, claims built/works)
  > """pywebview implementation of the renderer seam (held recommendation). pywebview opens a native OS window and loads a local file:// URL directly -- no HTTP server, no bound port, no socket. That is the property this build must prove (spin
- **nesi_bench_v0/tests/test_foreclosures.py** — score 6 (8114b, has a def, claims built/works)
  > """Stage 5 -- the build-level tests (guardrails #70-76), wired for real. Honest scope note, stated once here rather than silently assumed: this project has no JS execution harness (no jsdom, no headless-browser test runner) inside this Pyt

## game2d/_compost
1 code file(s) scanned, 1 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## nesi_v2_conductor
34 code file(s) scanned, 0 already cited in index.html, 6 unrouted candidate(s) shown.

- **conductor/bench.py** — score 6 (18450b, has a def, claims built/works)
  > #!/usr/bin/env python3 """ NESI BENCH v0 — the production surface, INTERNAL-COMPLETE. Standard library only. The digestor runs world → pattern; the bench runs pattern → object — outward, but into the PRIVATE organ, never out the door. THE
- **conductor/check_idea.py** — score 6 (2719b, has a def, claims built/works)
  > #!/usr/bin/env python3 """ check_idea.py — Tool 1: "Already built, or new?" Exposes the same pattern-library check lint_bridge.py already runs on every metabolizer drop (codex_index's semantic match, FOLD/HOLD/PASS) as its own standalone e
- **conductor/continuity.py** — score 6 (6314b, has a def, claims built/works)
  > #!/usr/bin/env python3 """ NESI CONTINUITY v0 — the persistence layer, so Kevin stops being it. Standard library only. DETERMINISTIC BY LAW: no engine call anywhere. A derived resume-VIEW, never a source of truth. The ledgers and queues (s
- **conductor/deepdive.py** — score 6 (29483b, has a def, claims built/works)
  > ## sections; a staged object's one prose field is its draft.
- **conductor/held.py** — score 6 (4381b, has a def, claims built/works)
  > #!/usr/bin/env python3 """ NESI HELD VIEW v0 — everything held, each with its named gap. Standard library only, read-only. Two sources, concatenated: 1. marks.jsonl verdict=hold — Kevin's own holds on staged objects, each carrying w
- **conductor/held_map.py** — score 6 (3885b, has a def, claims built/works)
  > #!/usr/bin/env python3 """ NESI HELD MAP v0 — homes for the still-open items, not builds of them. Standard library only. Built session 2026-07-21, stage 5 of the pass-3 rewrite (_INTAKE/RETURN_rebuild_pass3_2026-07-21.md). Each entry below

## _widgets
676 code file(s) scanned, 0 already cited in index.html, 6 unrouted candidate(s) shown.

- **../_widgets/latest_0f43a847_nesi_wake.html** — score 6 (17922b, has a def, claims built/works)
  > <div class="wrap"> <!-- SLOT: HEADER --> <div class="hd"> <div class="hd-eye">DSS · RECOGNITION INFRASTRUCTURE</div> <div class="hd-name">KNOWN BY HER WAKE — REWRITE</div> <div class="hd-sub">Nesi piece, rebuilt from scratch
- **../_widgets/latest_12e51a45_launcher_fix.html** — score 6 (4366b, has a def, claims built/works)
  > <!-- SLOT: HEADER --> <div class="hd"> <div class="hd-eye">DSS · RECOGNITION INFRASTRUCTURE</div> <div class="hd-name">ONE BUG FIXED · ONE THING I NEED FROM YOU</div> <div class="hd-sub">tools/launcher/launcher_server.py — fou
- **../_widgets/latest_12e51a45_rebuild_plan.html** — score 6 (6843b, has a def, claims built/works)
  > <!-- SLOT: HEADER --> <div class="hd"> <div class="hd-eye">DSS · RECOGNITION INFRASTRUCTURE</div> <div class="hd-name">FOUND THE 120 · FOUND THE REAL BREAK</div> <div class="hd-sub">archive confirmed, root cause confirmed, reb
- **../_widgets/latest_12e51a45_slowdown.html** — score 6 (4144b, has a def, claims built/works)
  > <!-- SLOT: HEADER --> <div class="hd"> <div class="hd-eye">DSS · RECOGNITION INFRASTRUCTURE</div> <div class="hd-name">SLOWING DOWN — HERE IS WHAT'S ACTUALLY TRUE</div> <div class="hd-sub">named plainly, no more branching</div
- **../_widgets/latest_79b600f5_seedpkg.html** — score 6 (7435b, has a def, claims built/works)
  > <div class="wrap"> <div class="hd"> <div class="hd-eye">DSS · RECOGNITION INFRASTRUCTURE</div> <div class="hd-name">MOVED + ZIPPED — READY FOR EMAIL</div> <div class="hd-sub">both land on your Desktop, nothing sent anywhere</
- **../_widgets/latest_95413a49_composer.html** — score 6 (10006b, has a def, claims built/works)
  > /*.md EXTENDS lines, so object-to-pattern items[].target references actually draw as edges instead of 0.'}, hold:{send:'Hold everything here — pass-3 correction and all five Composer Cycle returns stand on disk, nothing further runs today.'

## ds-kit
50 code file(s) scanned, 3 already cited in index.html, 6 unrouted candidate(s) shown.

- **../ds-kit/demo/vendor/react-dom.production.min.js** — score 4 (131835b, has a def)
  > /** * @license React * react-dom.production.min.js * * Copyright (c) Facebook, Inc. and its affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ (functi
- **../ds-kit/demo/vendor/react.production.min.js** — score 4 (10751b, has a def)
  > /** * @license React * react.production.min.js * * Copyright (c) Facebook, Inc. and its affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ (function()
- **../ds-kit/dist/dss-kit.iife.js** — score 4 (18368b, has a def)
  > /* ds-kit tokens + component styles \u2014 extracted verbatim from nesi/mind/DS_v1.html (canonical chassis).\n Only transformation applied: scoping. `:root` vars and `body` styles move onto `.dss-root`;\n every other selector is prefixed wi
- **../ds-kit/dist/index.js** — score 4 (15648b, has a def)
  > /* ds-kit tokens + component styles \u2014 extracted verbatim from nesi/mind/DS_v1.html (canonical chassis).\n Only transformation applied: scoping. `:root` vars and `body` styles move onto `.dss-root`;\n every other selector is prefixed wi
- **../ds-kit/ds-bundle/components/general/BackAnchor/BackAnchor.html** — score 4 (3303b, has a def)
  > /* auto-fit (not auto-fill): empty tracks collapse, so a 1-2 story card fills the width instead of stranding stories in a half-width left column beside phantom empty columns */ .ds-grid{display:grid;grid-template-columns:repeat(auto-fit,min
- **../ds-kit/ds-bundle/components/general/Board/Board.html** — score 4 (3293b, has a def)
  > /* auto-fit (not auto-fill): empty tracks collapse, so a 1-2 story card fills the width instead of stranding stories in a half-width left column beside phantom empty columns */ .ds-grid{display:grid;grid-template-columns:repeat(auto-fit,min

## tools_root
81 code file(s) scanned, 0 already cited in index.html, 6 unrouted candidate(s) shown.

- **../tools/agent_usage_check.js** — score 6 (4905b, has a def, claims built/works)
  > /* * AGENT USAGE — is a named lens agent actually being invoked, or only read? * * Sibling to lens_usage_check.js, same method, one category over: that * instrument covers .claude/skills/ (things a session runs on itself). * This one covers
- **../tools/codex_index/build_index.py** — score 6 (6256b, has a def, claims built/works)
  > """ build_index.py — embed all pattern files into the chromadb Codex index. Embedding strategy: - If a structural fingerprint exists at fingerprints/<slug>.json, embed on that. Fingerprints encode mechanism/register/edges/failure_mod
- **../tools/codex_index/grounder.py** — score 6 (4757b, has a def, claims built/works)
  > """ grounder.py — structured Grounder pass using instructor + ollama. Returns a typed GrounderResult instead of free text: verified, assumed, missing, verdict, reason, condition Requires ollama running locally (http://localhost:11434).
- **../tools/codex_index/query.py** — score 6 (5813b, has a def, claims built/works)
  > /*.md, never a second truth. Before serving a query, compare the cache to the files (check_drift, stdlib, cheap); if any file was edited / added / removed, rebuild the store fully from disk, then reopen it. This replaces the old write-time 
- **../tools/converger_capture.py** — score 6 (6477b, has a def, claims built/works)
  > #!/usr/bin/env python3 """ converger_capture.py — the session-native Converger-pass record. THE GAP THIS CLOSES (2026-07-25, Kevin's mark, "the converger needs a reimagining"): membrane-controller Condition 1 (amended 2026-07-20) made "the
- **../tools/field_render.py** — score 6 (6988b, has a def, claims built/works)
  > """The field, rendered as a tree you can edit. Kevin's naming, 2026-08-06: "The decisions create a field... i should be able to see and edit every descision in a tree and field. The relationships are the naming that underlies the proce

## village_app
2 code file(s) scanned, 1 already cited in index.html, 1 unrouted candidate(s) shown.

- **../village_app/map-your-node.html** — score 4 (14145b, has a def)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Map Your Node — Village Model</title> <style> :root { --bg: #f9f8f5; --surf

## osg-v6
6 code file(s) scanned, 1 already cited in index.html, 5 unrouted candidate(s) shown.

- **../osg-v6/the-door.html** — score 6 (6854b, has a def, claims built/works)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Door — Our Shared Gifts</title> <link rel="stylesheet" href="style.css"> </head> <body>
- **../osg-v6/the-field.html** — score 6 (9560b, has a def, claims built/works)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Field — Our Shared Gifts</title> <link rel="stylesheet" href="style.css"> </head> <body
- **../osg-v6/the-light.html** — score 6 (18292b, has a def, claims built/works)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Light — Our Shared Gifts</title> <link rel="stylesheet" href="style.css"> </head> <body
- **../osg-v6/the-engine.html** — score 4 (11777b, has a def)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Transmission Engine — Our Shared Gifts</title> <link rel="stylesheet" href="style.css">
- **../osg-v6/the-machine.html** — score 4 (8383b, has a def)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Machine — Our Shared Gifts</title> <link rel="stylesheet" href="style.css"> </head> <bo

## osg_organ
28 code file(s) scanned, 2 already cited in index.html, 6 unrouted candidate(s) shown.

- **../osg_organ/app.py** — score 4 (24561b, has a def)
  > """OSG ORGAN — the external organ of NESI, v0. A small local engine. The membrane rules are enforced here in code: - a guest signs in with email only on first visit and sets their own password - a guest's work deletes at their command
- **../osg_organ/crystal_v0.html** — score 4 (12577b, has a def)
  > /* fracture band */ .fractures{max-width:820px;margin:18px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:12px} .frac{border:1px solid rgba(199,107,94,.28);border-radius:10px;padding:12px 14px;background:linear-gradient(180deg,
- **../osg_organ/crystal_v1.html** — score 4 (14434b, has a def)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>The Crystal v1 — Grown from the Full Solution</title> <style> :root{ --bg:#0a0c0d; --ink:#e9e
- **../osg_organ/engine.py** — score 4 (3935b, has a def)
  > """ENGINE 1 — the world-from-substrate engine (2026-07-31, Kevin's mark). The world is never stored. Every call to world_state() re-derives it from the real ledgers: the schema gives the bones, the corpus gives the flesh. - density
- **../osg_organ/gate_house.py** — score 4 (5827b, has a def)
  > """THE GATE HOUSE — the boundary-crossing place, seeded 2026-07-31. Four stations, each grown from a named body in the substrate: - THE DAYLIGHT LAMP (the_daylight_test) — a pre-screen, never the ratification - THE SINK (s
- **../osg_organ/hearth.py** — score 4 (4368b, has a def)
  > """THE HEARTH — the gift-warmth place, seeded 2026-07-31. Four fruits, each grown from a named pattern in the substrate: - the sign by the door (boundary_ask) — no form, no control; the no as structure - the ask-form (asymmetric_valve)

## mito-mcp
1 code file(s) scanned, 0 already cited in index.html, 1 unrouted candidate(s) shown.

- **../mito-mcp/index.js** — score 4 (9268b, has a def)
  > import { Server } from '@modelcontextprotocol/sdk/server/index.js'; import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'; import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/t

## podcast_narrator
3 code file(s) scanned, 0 already cited in index.html, 3 unrouted candidate(s) shown.

- **../podcast_narrator/narrator.py** — score 4 (14504b, has a def)
  > """ Podcast Narrator — simple desktop app for turning a script into narrated audio. Uses Microsoft Edge's neural text-to-speech (via the `edge-tts` package): free, no API key, ~300+ natural voices across many languages and accents. """ imp
- **../podcast_narrator/voices_cache.py** — score 4 (1554b, has a def)
  > """Fetches and caches the edge-tts voice list so the GUI starts instantly.""" import asyncio import json import os import shutil from paths import app_dir, bundle_dir CACHE_PATH = os.path.join(app_dir(), "voices_cache.json") BUNDLED_CACHE
- **../podcast_narrator/paths.py** — score 3 (618b, has a def)
  > """Path helpers that work both as a normal script and as a frozen PyInstaller exe.""" import os import sys def app_dir(): """Writable directory the exe/script lives in — where output/, favorites, and the voice cache should be read

## kwp
27 code file(s) scanned, 0 already cited in index.html, 6 unrouted candidate(s) shown.

- **../kwp/bio-research/skills/instrument-data-to-allotrope/scripts/convert_to_asm.py** — score 4 (17821b, has a def)
  > #!/usr/bin/env python3 """ Instrument Data to ASM Converter Converts laboratory instrument output files to Allotrope Simple Model (ASM) JSON format. Supports auto-detection of instrument types and fallback parsing for unsupported form
- **../kwp/bio-research/skills/instrument-data-to-allotrope/scripts/export_parser.py** — score 4 (14328b, has a def)
  > ## Configuration\\n",
- **../kwp/bio-research/skills/instrument-data-to-allotrope/scripts/flatten_asm.py** — score 4 (7593b, has a def)
  > #!/usr/bin/env python3 """ Flatten ASM JSON to 2D CSV Converts hierarchical Allotrope Simple Model (ASM) JSON to flat tabular format suitable for LIMS import, spreadsheet analysis, or database loading. Usage: python flatten_as
- **../kwp/bio-research/skills/instrument-data-to-allotrope/scripts/validate_asm.py** — score 4 (37821b, has a def)
  > #!/usr/bin/env python3 """ ASM Output Validation Script Validates ASM JSON output against common issues: - Wrong technique selection - Hyphenated field names (should be space-separated) - Missing statistics documents - Incorrect un
- **../kwp/bio-research/skills/nextflow-development/scripts/check_environment.py** — score 4 (14563b, has a def)
  > #!/usr/bin/env python3 """ Pre-flight environment validation for nf-core pipelines. Checks Docker, Nextflow, Java, system resources, and network connectivity. Run this BEFORE attempting any pipeline execution. Usage: python ch
- **../kwp/bio-research/skills/nextflow-development/scripts/detect_data_type.py** — score 4 (10253b, has a def)
  > #!/usr/bin/env python3 """ Auto-detect appropriate nf-core pipeline from data directory. Analyzes filenames, directory structure, and file content hints to suggest the most appropriate pipeline for the data. Usage: python dete

## kit
7 code file(s) scanned, 1 already cited in index.html, 6 unrouted candidate(s) shown.

- **../kit/tech.html** — score 4 (10194b, has a def)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>RI Kit — Tech · Technical Reading</title> <style> :root { --bg: #f7f5f1; --
- **../kit/bio.html** — score 1 (8985b)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>RI Kit — Bio · Somatic Reading</title> <style> :root { --bg: #f7f5f1; --sur
- **../kit/economic.html** — score 1 (10878b)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>RI Kit — Eco · Economic Reading</title> <style> :root { --bg: #f7f5f1; --su
- **../kit/inst.html** — score 1 (9279b)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>RI Kit — Inst · Institutional Reading</title> <style> :root { --bg: #f7f5f1;
- **../kit/rel.html** — score 1 (12941b)
  > /* Draft / at-gate section */ .draft-block { background: var(--draft-bg); border: 1px solid var(--draft-border); border-radius: 6px; padding: 1.5rem 1.6rem; margin-bottom: 1.4rem; } .draft-header { display: flex; align-items: center; gap: 0
- **../kit/spatial.html** — score 1 (11074b)
  > <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>RI Kit — Spatial · Spatial Reading</title> <style> :root { --bg: #f7f5f1; -

## coherence-codex
0 code file(s) scanned, 0 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## aoc-v2
2 code file(s) scanned, 0 already cited in index.html, 2 unrouted candidate(s) shown.

- **../aoc-v2/_build_clean.py** — score 4 (12592b, has a def)
  > # -*- coding: utf-8 -*- # Clean, manuscript-only build: the framework itself, no build scaffolding, # process/adversarial framing neutralized into scholarly self-review voice. import os, re, html import matplotlib, markdown from xhtml2pdf i
- **../aoc-v2/_build_pdf.py** — score 4 (11227b, has a def)
  > # -*- coding: utf-8 -*- import os, csv, html, datetime import matplotlib, markdown from xhtml2pdf import pisa from xhtml2pdf.default import DEFAULT_FONT from reportlab.pdfbase import pdfmetrics from reportlab.pdfbase.ttfonts import TTFont a

## netlify_forms_relay
1 code file(s) scanned, 1 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## open_ledger
2 code file(s) scanned, 0 already cited in index.html, 2 unrouted candidate(s) shown.

- **../open_ledger/circuit.html** — score 4 (24380b, has a def)
  > <!doctype html> <html lang="en"> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <title>The Circuit — on the Open Ledger</title> <style> :root{ --bg:#faf8f3; --surface:#ffffff; --
- **../open_ledger/demo.html** — score 4 (14673b, has a def)
  > <!doctype html> <html lang="en"> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <title>The Open Ledger — demonstration</title> <style> :root{ --bg:#faf8f3; --surface:#ffffff; --i

## rhythm
1 code file(s) scanned, 0 already cited in index.html, 1 unrouted candidate(s) shown.

- **../rhythm/brief.py** — score 4 (10194b, has a def)
  > #!/usr/bin/env python3 """ rhythm/brief.py — the two emails, generated from the GATE by owned compute. Pure Python standard library. No pip, no AI, no rented cognition to PRODUCE the emails — they are a mechanical read of gate_data.json. (

## held_refusal
2 code file(s) scanned, 1 already cited in index.html, 1 unrouted candidate(s) shown.

- **../held_refusal/leaf_audit.py** — score 4 (5214b, has a def)
  > #!/usr/bin/env python3 """leaf_audit.py -- walk every terminal node (leaf) of the held-refusal page and FAIL if any leaf contains an ask-affordance. This is the section 6.2 walk-test made executable: the no-ask discipline is enforced by the

## gate_root
5 code file(s) scanned, 0 already cited in index.html, 5 unrouted candidate(s) shown.

- **../gate/gate.py** — score 4 (28335b, has a def)
  > #!/usr/bin/env python3 """ THE GATE — backend. One owned tool, Python standard library only. No pip, no npm, no CDN, no cloud. The only dependency is the Python runtime itself — which is the point: own what you depend on (GROUND). It STAG
- **../gate/template.html** — score 4 (14533b, has a def)
  > /* warm machine-room dark */ --panel-raised:#232019; --line:#3a342a; --engrave:#e9e2d0; /* engraved label cream */ --engrave-dim:#9a917c; --amber:#e3a23c; /* indicator lamp */ --amber-dim:#7a5a26; --green:#7fae6a; /* consented / in-ledger o
- **../gate/THE_GATE.html** — score 4 (215337b, has a def)
  > /*.md (10 files: set_the_floor, discharge_the_no_at_load_time, route_every_cost_to_a_named_landing, force_the_definition, move_the_load_not_the_effort, refuse_where_it_can_be_seen, place_it_and_close_your_own_record, hand_over_what_runs_wit
- **../gate/THE_GATE.live.html** — score 4 (14400b, has a def)
  > /* warm machine-room dark */ --panel-raised:#232019; --line:#3a342a; --engrave:#e9e2d0; /* engraved label cream */ --engrave-dim:#9a917c; --amber:#e3a23c; /* indicator lamp */ --amber-dim:#7a5a26; --green:#7fae6a; /* consented / in-ledger o
- **../gate/update_state_view.py** — score 4 (6163b, has a def)
  > /* auto-generated {date} from gate_data.json */ gate: {gate_js}, queue: {{ count: {q_count}, threshold: 15, alarm: 20 }}, sessionStart: [ "What's at the gate? → AT THE GATE section below", "What's the body status? → Ground · body row", "Is 

## instruments_root
0 code file(s) scanned, 0 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## nesi/workbench
4 code file(s) scanned, 0 already cited in index.html, 4 unrouted candidate(s) shown.

- **workbench/invariant_index.html** — score 4 (9530b, has a def)
  > /* focused trunk */ .tr-head{display:flex;align-items:baseline;gap:10px;margin-bottom:4px} .tr-word{font-size:20px;font-weight:bold;color:var(--trunk);letter-spacing:1px} .tr-kind{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;
- **workbench/tension_index.js** — score 4 (63955b, has a def)
  > window.TENSION_INDEX=[{"slug":"ai_constitutional_stack","title":"AI Constitutional Stack","thesis":"Sovereignty-Preserving Recognition OS — Threshold · Keeper · Decision Surface","words":["action","always","anti","ask","asks","authority","b
- **workbench/tension_table.html** — score 4 (38106b, has a def)
  > /* shelf */ .shelf{width:280px;flex:none;border-right:1px solid var(--bdr);display:flex;flex-direction:column;background:var(--sf)} .shelf-hd{padding:10px 14px;border-bottom:1px solid var(--bdr)} .shelf-lab{font-size:8px;letter-spacing:2px;
- **workbench/tuned_surface_v0.html** — score 4 (14415b, has a def)
  > /* THE FIELD */ .field{position:relative;height:460px;background:var(--sf);border:1px solid var(--bdr);overflow:hidden; touch-action:none;user-select:none;transition:background .5s ease} .field.crystal{background:#efece2} /* fluid triangula

## nesi/net
5 code file(s) scanned, 0 already cited in index.html, 5 unrouted candidate(s) shown.

- **net/cupola.py** — score 4 (3795b, has a def)
  > """The cupola split, the seam, and which symmetry a net can keep.""" import itertools, math, numpy as np from nets import * axes = [(1,1,1),(1,1,-1),(1,-1,1),(-1,1,1)] print("=== 1. the two-cupola split, per body diagonal ===") for ax in a
- **net/nets.py** — score 4 (5615b, has a def)
  > """Which unfolding? Enumerate the cuboctahedron's nets for real.""" import itertools, math from fractions import Fraction # ---- 1. the solid ------------------------------------------------------- V = [p for p in itertools.product((1,-1,0
- **net/run.py** — score 4 (2412b, has a def)
  > import time, itertools, math, random, json import numpy as np from nets import * # geometry, dual graph, unfold, valid, FACES, ADJ, DUAL, V, idx # ---------- enumerate every spanning tree of the dual (331,776) ---------- def spanning_tre
- **net/run2.py** — score 4 (1242b, has a def)
  > import time, networkx as nx from nets import * G = nx.Graph(); G.add_edges_from(DUAL) t0 = time.time(); good = 0; n = 0 cup = 0 # the four cupola splits, for counting how many valid nets are in that family import numpy as np, math def cen(
- **net/make_net.py** — score 1 (3074b)
  > """Persist the marked two-cupola net as data the 2D game can read. Routing of gift cards 11+12 (Kevin's mark 2026-08-11: "route the board first"). Runs the cupola-split search from cupola.py (session 87c5c4fc) and writes world2d/data/net.j

## nesi/forest
0 code file(s) scanned, 0 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## nesi/interrogator
0 code file(s) scanned, 0 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## nesi/continuity
0 code file(s) scanned, 0 already cited in index.html, 0 unrouted candidate(s) shown.

*nothing scored above zero, or everything found is already routed.*

## nesi/world
3 code file(s) scanned, 1 already cited in index.html, 2 unrouted candidate(s) shown.

- **world/logbook.html** — score 4 (27436b, has a def)
  > /* ---- surface switch ---- */ .switch{display:flex; gap:0; border:1.5px solid var(--line); border-radius:8px; overflow:hidden; margin-bottom:16px; width:fit-content;} .switch button{border:none; background:var(--panel); color:var(--line); 
- **world/place_stones.py** — score 4 (1652b, has a def)
  > #!/usr/bin/env python3 """PLACE_STONES helper — one double-click after GENERATE. Finds the newest downloaded stones*.json in the user's Downloads folder, checks it is a stones file (format nesi_stones_v1, a "stones" list), and copies it VE
