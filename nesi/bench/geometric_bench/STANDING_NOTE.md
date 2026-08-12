# STANDING NOTE — bench geometric layer, cycle 1 of 3
**Built 2026-07-20, on Kevin's session law ("BUILD, STAGING-ONLY... this session builds one
launchable, seen-live surface and resolves nothing about whether it stands").** Geometry only.
Not diction (cycle 2). Not visual polish (cycle 3). This note records what exists, not a verdict.

## What it renders
A new, separate local window — `python bench_geo.py` or double-click `launch_geometric_bench.bat`
— showing bench objects as position-only markers on a directional surface:

```
intake → staging → break → gate → landing
                      |       |
                  held-bay  compost   (off the main grain, reversible)
```

An object's region is the only thing that says what it is; nothing is ever relabeled, no status
text is drawn on a marker beyond its own name. Motion between regions animates (FLIP-style:
record the old position, reparent, animate from old to new) so a state change reads as travel,
not a badge swap. The gate is a true gate in code, not just in the UI: `advance()` in
`renderer/app.js` explicitly excludes 'landing' from its forward chain, and `crossGate()` is the
only function anywhere in the file allowed to write `region = 'landing'` — checked by
`smoke_test.py` against the live source, not just asserted here. Hold and compost are lateral,
reversible moves (`held-bay`/`compost` both carry a `preRegion` and a `back to grain` control);
landing carries `uncross`, backward travel across the gate.

Seeded from `mock_feed.json` (4 fixtures) on open, and Kevin can drop a new mock object live from
the intake region's own text field — no filesystem watching, no real intake path, cycle 1 only
needs *something* to watch travel.

## Where the renderer seam is
`renderer_seam.py` defines `RendererSeam.open(title, html_path, api, width, height)` — an
abstract interface with zero third-party imports. `pywebview_renderer.py` is the only file in
this package that imports `webview`; it is the sole concrete implementation, per Kevin's mark
("Isolate it behind a RENDERER SEAM so it is not load-bearing; the renderer choice is Kevin's
mark, not yours"). `bench_geo.py` calls the seam, never pywebview directly. Swapping renderers
later means writing a new module satisfying `RendererSeam` — nothing else in the package changes.

## What is stubbed / mock
- **The object feed** — `mock_feed.json`, four fixtures, clearly marked as mock in its own
  `_meta` block. Not read by the real conductor, not written by anything real.
- **The gate mark** — `record_dry_run_mark()` in `bridge_api.py` appends one line to
  `dry_run_gate_ledger.jsonl`, every line carrying `"stub": "[DRY-RUN GATE — cycle 1, geometry
  layer, not real canon]"`. This is not `nesi/marks/marks.jsonl` and does not touch it.
- **Break** — geometrically present as a region an object passes through; carries no
  stress-test logic. Per scope fence: "No engine wiring, no real metabolize."
- **The engine** — dark throughout, as instructed. Nothing in this package calls the conductor,
  `bench.py`, or any headless engine path.

## Genuinely local — corrected after a live check, 2026-07-20
The manifest for this build promised "no port opened." That was wrong, and the wrongness was
only caught by actually launching the window and diffing `netstat` before/after — source-reading
alone missed it. Written here plainly rather than smoothed over:

**What actually happens:** the moment the window loads a local file (`renderer/index.html`),
pywebview — the library itself, not this package's code — starts its own small HTTP server
(`webview/http.py`, `BottleServer`) on `127.0.0.1` on a random port. This is not the `http_server`
flag's doing; `webview/__init__.py`'s `start()` forces that server on whenever any window has a
local URL at all (`has_local_urls`), regardless of what `http_server=` is set to. It exists to
serve the local HTML/CSS/JS to the window's rendering engine and to carry the `js_api` bridge
(`get_mock_feed`, `record_dry_run_mark`) as HTTP POSTs to `/js_api/<uid>`. `http_server=False` is
still passed explicitly in `pywebview_renderer.py` and is not wrong to keep — it only controls
whether the port is *user-facing/fixed*, not whether pywebview's own internal server runs at all.

**Verified live:** launched `bench_geo.py`, found a real `LISTENING` entry on `127.0.0.1:<random>`
in `netstat -ano` owned by the running process, with real `TIME_WAIT` entries proving the page had
already round-tripped through it. Killed the process, confirmed the port closed.

**What this means in practice, plainly:** the port is bound to `127.0.0.1` only — loopback, this
machine, this process, this launch. Nothing on the network can reach it; nothing outside this
computer is touched. It is not "genuinely no port" as the session law asked for; it is "genuinely
local" in the sense that matters (no LAN/WAN exposure, no data leaving the machine) but not in the
literal sense of the falsifier as written. That gap is named here rather than argued away.
`smoke_test.py`'s "no networking primitive in source" check still holds — it proves this
package's *own* code adds no networking, which is a narrower and true claim, not the broader one
the manifest originally implied.

**Not chased further this cycle:** whether an inline-`html=` load (skipping `url=` entirely) would
avoid triggering pywebview's internal server was an open thread when this was written down; not
resolved, not silently claimed either way.

## Touches nothing already live
Reads `nesi/bench/bench/STANDING_SPEC.md`, `nesi/bench/bench.json`, and `nesi/conductor/bench.py`
for vocabulary only (region names echo the real bench's draft/break/refine/land shape). Writes
only inside `nesi/bench/geometric_bench/` — a new, separate directory. `NESI.exe`, `nesi_app.py`,
`conductor/core.py`, `staged/`, and `marks.jsonl` are untouched.

## Cycle 2 (diction) — done 2026-07-21
Seeded by the same-day tensegrity artifact work (assembly-is-sequential, structure-is-simultaneous):
one region name actually changed — **landing → standing**, in display text only. The other five
(intake, staging, break, gate, hold-bay, compost) were already the right word; renaming them for
renaming's sake would have been the decorative unification the same-quartet pattern warns
against, not diction. Region *keys* are untouched everywhere in code — `GRAIN`, `crossGate()`'s
gate check, `data-region`/`data-lane` selectors all still say `'landing'`; `smoke_test.py`'s
true-gate check still passes unmodified, confirmed live (`ALL GREEN`).

Each region got a small italic voice line under its label (`.region-voice` in `style.css`) —
what an object sitting there is actually doing: intake is "unformed," staging is "strung,"
break is "under test," gate is "held at the threshold," standing is "held simultaneously —
none of the four first anymore," held-bay/compost are both "off the grain, reversible."

**Loudness rule, written into `app.js`:** ordinary travel along the grain (`advance`,
`returnToGrain`) stays quiet — the plain arrow line, same as cycle 1. A mark that actually
changes an object's standing — `crossGate`, `uncross`, `hold`, `compost` — speaks in a fuller
voice (`LOUD_VOICE` map). Most motion says nothing extra; only the four marks that change what
an object *is* get the fuller sentence. This is the surface's own silence rule, not asserted in
prose elsewhere.

Not touched this cycle, on purpose: whether the bench's own held center (organ-spec generator /
held-thing forge / transmission engine / one-bench-three-modes) should shape naming further.
That question is still open (see below) and this diction pass deliberately stayed neutral to it —
same restraint STANDING_NOTE.md named for cycle 1.

## Deferred to cycle 3 (visual polish)
Theme, color, the DSS chassis tokens, any of it. Current styling is deliberately neutral —
gray borders, black text, monospace — just enough to see regions and motion, nothing more.

## Open, not resolved by this cycle
Whether Kevin would actually stand at this daily (his falsifier, his read, not built into the
surface). Whether the bench's own center (organ-spec generator / held-thing maker / transmission
engine / one-bench-three-modes — `NESI_OPEN_MARKS.md` §B1) shapes how cycle 2's regions should
read — this build stayed neutral to all three on purpose.
