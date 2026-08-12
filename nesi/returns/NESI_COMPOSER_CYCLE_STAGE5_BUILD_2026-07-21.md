# COMPOSER CYCLE — STAGE 5 BUILD
**Date:** 2026-07-21. **Ground:** Stage 4 DEVELOP, fork settled ("add a new 'room' tab... leaving the bench tab's current single-object canvas untouched" — nesi/returns/NESI_COMPOSER_CYCLE_STAGE4_DEVELOP_2026-07-21.md). **Status:** BUILT, unmarked — Kevin has not yet seen it run in the window. Engine dark throughout. This file is the log entry and coherence check this stage's own brief asked for.

## What was built
- **`nesi/bench/composer/room.py`** — three functions, stdlib-only, no side effects beyond one honest-stub fallback:
  - `build_index(staged_objects=None)` — reads `core.state()["staged"]` (the same source every other tab already reads), reuses each object's existing `composed` cache when present, falls back to `bench.compose_preview()` only for objects staged before that cache existed (2026-07-19-and-earlier objects, confirmed against a real one).
  - `derive_edges(index)` — reads `object.items[].target` + `disposition`, already present on every staged object, maps `applied→feed · held→loop · composted→drain · blocked→block` — the DSL's four kinds, copied verbatim from `composer.py`, no fifth kind added.
  - `render_room_canvas(index, edges, tk_canvas, width, height)` — native draw: bands (staged/held/canon/compost) drawn first as the largest, most persistent shapes; nodes and edges layered on top; ink/paper/line colors imported from `composer.py`, never retyped.
  - `__main__` block — a headless smoke test with a stub canvas object, same posture `composer.py` had at its own birth.
- **One small edit to `nesi/conductor/nesi_app.py`**: `_build_room_tab()`, `_room_refresh()`, `_drain_room()`, and a lazy `_import_room()` (mirroring `bench.py`'s own `_import_composer()`) — plus one line registering the tab in `__init__`. `composer.py`, `bench.py`, and the bench tab's existing `composed_canvas` are untouched, exactly as the settled fork asked.

## The coherence check, run for real
1. `room.py` run standalone (`python room.py`) against the real `nesi/staged/*.json` on this machine: **6 objects, 0 edges, 20 canvas calls** — 5 in the `staged` band, 1 in `compost`, none in `held` or `canon`. Band assignment reads `mark.verdict`/`crossed` off each real object, not guessed.
2. `nesi_app.py` imported as a module (`import nesi_app`) with no window instantiated — clean import, `_build_room_tab`/`_room_refresh` present on the class, no import-time error.
3. The exact entrance path `_import_room()` resolves (`nesi/conductor` → `nesi/bench/composer` via `parents[1]`) run standalone end-to-end: `build_index()` → `derive_edges()` → `render_room_canvas()` against a stub canvas — same result, 6 objects / 0 edges / 20 canvas calls, confirming the wiring nesi_app.py will actually use at runtime, not just the module in isolation.
4. `python -m py_compile` clean on both files.
5. Not run this pass: the actual windowed app (`nesi_app.main()`), since that opens a real Tk window and holds a single-instance mutex — the honest limit named below.

## The zero-edges result, named plainly
0 edges is not a bug — it's the room telling the truth about today's data. `derive_edges()` only draws an edge when an `items[].target` value matches another object's own `id` in this room; every sampled staged object's `target` fields today point at pattern *filenames* (e.g. `the_governor.md`), not at other staged-object ids. This is exactly the gap Stage 4 named and scoped out (pattern nodes and EXTENDS-line parsing aren't built this pass) — the room is accurately showing that object-to-object relations, as currently recorded, don't exist yet in this data; it is not silently inventing edges to look more populated than the data supports.

## Known limitations, named not smoothed
- **Pattern nodes don't exist in the room yet.** Every `items[].target` today points outside the room's own node set (staged objects only). A future pass would need to add pattern files as their own nodes (a new, small `build_index`-style read over `patterns/*.md`) before object→pattern edges can render — named in Stage 4, still true here.
- **`held`/`canon` bands are untested against real data** — the sample staged objects are all `staged` or `compost`; the band-assignment logic for `hold`/`cross` verdicts is written and read straightforwardly off `mark.verdict`/`crossed`, but hasn't been exercised against a real held or crossed object in this pass.
- **The room tab has not been opened in the actual window.** Everything above is a headless/import-level check, same honest limit `composer.py`'s own `STANDING_SPEC.md` named at its birth ("not yet seen live in the window — build-session smoke test only").
- **No drag/click interaction is built.** Stage 4's interaction mechanics (click-to-open detail, in-band reposition, cross-band manifest-gated drag) are named in the spec but not implemented this pass — this build is the render surface only: `build_index`/`derive_edges`/`render_room_canvas` and one static tab with a manual refresh button. That was the scope Stage 4 actually specified (a buildable render surface); the interaction layer is real future work, not silently assumed done.

## What's next, unmarked
- Kevin opens the real window, clicks the "room" tab, and sees whether the space reads as a space or still as debris — the true test, same as `composer.py`'s own outstanding item.
- If it lands: pattern nodes + EXTENDS parsing (the named gap) is the natural next raising, since it's the one thing standing between "0 edges, technically correct" and a room that actually shows relations.
- If it doesn't land: this is exactly the second membrane below, held open rather than assumed.

## Return
The Room is built and self-consistent with everything Stage 1–4 found and specified — real code, real data, no invented edges, no new visual vocabulary, composer.py and bench.py both untouched. It has not yet been felt-read in the actual window.

**MEMBRANE — does the Composer stand as NESI's organ, the space alive? Kevin's alone.** This file ratifies nothing.
