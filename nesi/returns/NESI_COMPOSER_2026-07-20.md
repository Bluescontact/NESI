# NESI — THE COMPOSER (render organ), session 4/4
**Date:** 2026-07-20. **Compiled from:** this session's brief ("THE COMPOSER — NESI'S RENDER LAYER", 4th build) and the build itself. Status: BUILT, unmarked — Kevin has not yet seen it run in the window.

## What this names
The render organ instantiates the already-RATIFIED `ARTIFACT_GRAMMAR.md` (2026-07-16) — this session did not redesign the grammar, it gave it a live render seat. The seed-register / transmission-by-audience layer named in the brief stays deferred door-side, out of scope here, on purpose.

## What was built
- `nesi/bench/composer/STANDING_SPEC.md` — 10-field construction-language spec.
- `nesi/bench/composer/composer.py` — the register (`REGISTER_CSS`, one locked stylesheet), the diagram DSL parser + validator (`parse_dsl`/`validate_dsl`, hand-rolled to the brief's exact grammar, stdlib-only), one renderer at two scales (`render_diagram_svg`, `SIZES = {card, full}` — identical primitives, no second drawing path), three artifact types (`render_card`, `render_infographic`, `render_doc`), and the one seam (`author_diagram`, calling the existing `bench.invoke` socket).
- One additive line in `nesi/conductor/bench.py` — an `author_diagram` case in `_stub_op`, same honest-stub law as every other op (`draft`/`break`/`refine`/`read`/etc.): returns an empty-but-valid DSL skeleton, badged, never a fabricated read.
- `nesi/bench/composer/samples/lease.dsl.yaml` — a hand-authored diagram for the real staged bench object `2026-07-19_made_id_like_to_build_a_lease_3e1350.json` (intent: "id like to build a lease"), naming the load path intent → the lease → standing use, looping back, leverage on the first edge.
- `nesi/bench/composer/samples/write_samples.py` + its output (`lease_card.html`, `lease_infographic.svg`, `lease_doc.html`, `floor_textonly_card.html`, `floor_textonly_doc.html`) — real renders, run against the live composer.py and the live staged/ objects, not hand-fabricated.

## The success test, run for real (§5 of the brief)
1. Real bench object + hand-authored DSL → `diagram_status: "present"`, card/infographic/doc all render with the boundary band drawn first (the substrate as figure) and nodes as flat recognition sites on top — symbol-law inversion enforced in code, not a per-diagram choice.
2. Real bench object with no DSL (`2026-07-17_made_a_floor_that_holds_a_stranger_without_ex_0be5d0.json`) → `diagram_status: "missing"`, card/doc render text-only with the gap flagged in the slot ("diagram missing — no DSL file supplied … flagged, not fabricated"). No diagram-less card silently ships as if complete.
3. Engine dark throughout — `author_diagram` ran only inside the smoke test's no-DSL branch and returned the honest stub; nothing above the socket knew or needed to know.

## Known limitation, named rather than smoothed
The v0 node layout is a straight even spread on one line — a `loop` edge (land → self in the sample) draws stacked on top of the `feed` edges rather than curving around them. Functionally correct (dash pattern still distinguishes edge kind) but visually crowded on a 3-node diagram. Not fixed this session — a layout refinement, not a grammar or register problem; flagged for the next raising if Kevin's felt-read catches it.

## Marks named in the brief, as this session read them (Kevin's to ratify, not assumed)
- **Pipe vs language:** built assuming PIPE (default in the brief) — `front.py`, `interrogator.py`, and bench's own output are NOT wired to call `composer.compose()` this session. That wiring is a separate, later raising once the default is confirmed live.
- **Symbol-law inversion:** built as a HARD RULE in `render_diagram_svg()` (boundary band drawn first, always) per the brief's own framing that this one is a ratify, not a flip. If Kevin's read disagrees, the fix is to the hard-coded ordering, not a new config flag.
- **Register-matching (seed register by audience):** left entirely unbuilt, door-side, per the brief's default.

## Addendum, same session — pipe wired on Kevin's go
Kevin's mark: "pipe confirmed as the default." Wired, not just proposed:
- `bench.new_object()` now calls `compose_preview()`, which builds a minimal staged-shape view of the fresh draft and runs it through `composer.compose()` — every new bench object carries a `composed` block (`card_html`, `infographic_svg`, `doc_html`, `diagram_status`) from the moment it's opened.
- `bench.land()` renders again from the *final* staged dict (already the exact shape `compose()` reads — no shim needed there) and writes `composed` into the landed JSON, so every object sitting in the gate carries its own render alongside its data.
- `front.py`'s bench branch surfaces `diagram_status` as one more plain-text line — front stays HTML-free by design (its own law: no brain, no second engine seam); it names what the Composer already rendered underneath rather than rendering anything itself.
- Both lazy-imported (`_import_composer()` in bench.py) to avoid the load-time cycle — same discipline as `run_break`'s lazy import of `reader`.
- Smoke-tested end to end: `front.handle()` → `bench.new_object()` → composed card (missing-diagram path, honestly, since a fresh draft has no DSL) and `bench.land()` → a real staged JSON on disk carrying `composed`. The test landing was removed afterward — it was a smoke test, not a real intent, and leaving it in the gate queue would have handed Kevin a mark to make on nothing.
- Logged: `composer-wired` in `conductor_log.jsonl`.

## Second addendum, same session — the bench tab itself, on Kevin's go
Kevin's mark: take on the bench tab UI, deciding native re-render vs embedded webview. The decision was already settled, on disk, before this session — nesi_app.py's own header carries Kevin's 2026-07-16 mark: *"the surface becomes a true native window, no web layer."* That is standing law, not a fresh call; a webview would have reopened something already closed. Built native:
- `composer.compose()` now also returns `dsl` (the resolved, validated DSL dict, only on the `"present"` path) — the one addition needed so a native surface can redraw the diagram without parsing HTML/SVG. `bench.py`'s two composed dicts (`compose_preview()` and `land()`) carry it through.
- `nesi_app.py`'s bench tab gained a **COMPOSED — locked register** panel: a status label (`diagram: missing/present`) plus a `tk.Canvas` that redraws the same boundary-band-first / nodes-on-top primitives as `composer.render_diagram_svg()`, in plain `create_rectangle`/`create_line`/`create_text` calls — a parallel implementation of the same DSL, not a shared code path (Canvas calls and SVG strings don't share a renderer, by construction). Wired into `_drain_bench` (fires on every new/broken/refined object) and cleared on land.
- Known gap, named not smoothed: `run_break`/`run_refine` don't recompute `composed` — the panel shows the object's composed state as of drafting or landing, not live through a refine pass. Not fixed this session; a real refinement of the wiring, not assumed silently correct.
- Known gap, named not smoothed: the native Canvas leverage marker only draws for `leverage.on` naming a node directly — the `edge:a→b` form (drawn correctly in the SVG renderer) is not yet handled natively. Small, flagged for whoever picks up the loop-edge or leverage-edge work next.
- Smoke-tested headless: a real `tk.Canvas` built outside the full app, exercised through the none / missing-diagram / present-diagram cases via `_draw_composed()` directly — 1, 2, and 13 canvas items respectively, no exceptions.
- Logged: `composer-bench-tab-wired` in `conductor_log.jsonl`.

## What's next, unmarked
- Kevin opens the actual window and runs a real intent through the bench tab — the true test; headless Canvas smoke tests prove the drawing code runs, not that it reads right at a glance.
- Kevin sees the samples in `bench/composer/samples/` too, felt-reads whether the register (both the HTML/SVG artifacts and the native Canvas echo of it) lands.
- Loop-edge curve refinement + the edge-form leverage marker (named above), if either earns its place.
- This file plus `STANDING_SPEC.md` are the log entry and the state refresh this session's brief asked for at close — no further build, no prune.
