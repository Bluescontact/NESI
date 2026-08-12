# NESI bench v0 -- STANDING note

**Stage:** 6 of 6 -- ALL SIX STAGES BUILT. Headless smoke-tested every
stage; on Stage 6, the surface was also confirmed **seen-live**: a real
`PywebviewRenderer` window, opened via a genuine `webview.start()` call on
this machine, not the preview pane. Six items were carried across stages as
genuinely open, named plainly at the end of this note (§OPEN ITEMS) rather
than folded into "done"; one (gate shear) closed 2026-07-21, Stage 7 --
five remain open, among them Stage 3's in-browser drag confirmation. v0 is
built; it is not the same claim as "every open question answered."

## What's built

- `regions.py` -- functional region keys only (`intake staging break gate
  landing held-bay compost`), a `display_names` map defaulting to the
  functional key on every entry. No felt-name is hardened.
- `physics.config.json` -- the v1 Sec 12 tunable scalars, seeded with
  reasonable defaults, not marks.
- `strings/` -- a versioned string registry (`registry.py`, version 0.2.0)
  classed into the seven lawful non-content categories from guardrail #51,
  plus a build-time lint (`lint.py`) that fails on: unlawful/missing class,
  first/second-person grammar (#52), and praise/persuasion/apology phrases
  (#53). The lint also scans the whole source tree for unregistered literal
  UI strings (#50), excluding docstrings, raised developer-error messages,
  and CLI argparse help text -- none of which reach the Bench's user-facing
  surface.
- `feed/` -- a mock object feed (`fixtures.json`, 8 objects seeded one per
  lawful region key, including a ratified `coherent-tension` pair) loaded by
  `mock_feed.py` into plain `BenchObject`/`BenchLink` records. No engine call,
  no network read.
- `renderer/` -- the renderer seam (`seam.py`, an ABC), a `NullRenderer` for
  headless smoke tests, and `PywebviewRenderer` (deferred-imported so the
  package still imports cleanly without pywebview installed). `surface.html`
  is the empty, silent shell -- no generated text, no dialog, no session
  summary on open (guardrails A1-A3).
- `main.py` -- the entry point. `--headless` uses `NullRenderer`; without it,
  `PywebviewRenderer` opens the real window. Now builds the rendered
  surface via `render.py` before opening it.
- `layout.py` (Stage 1) -- the single source of truth for region rects: five
  on-grain bands (`intake staging break gate landing`) in flow order, plus
  `held-bay`/`compost` in a separate off-grain band below the flow, not a
  sixth/seventh column in the same line (master Sec 4). `region_for_point`
  is the one place "which rect is which region" is computed; nothing else
  guesses at boundaries.
- `render.py` (Stage 1) -- builds a single self-contained
  `renderer/surface_rendered.html` from the mock feed + layout + physics
  config. Region identity has zero visible label by default (guardrail
  #10-11); a local `i`-key toggle reveals the functional region key as
  technical inspection only, never stamped onto an object face. Objects
  show only their exact content (lawful, unconditionally). Drag physics:
  the grabbed object stays pinned 1:1 to the pointer everywhere except
  `break`, which applies the v1 Sec 5.2 static-breakaway-then-velocity-cap
  feel; `intake` has zero coast on release; `staging`'s kinetic-mass
  formula (`objectMass()`) is wired to the config weights but not yet
  driving a coast/spring, since there's no tether system before Stage 2.
  Region on release is recomputed from the object's centroid; an ambiguous
  release point (outside every rect) leaves the object's region unchanged
  rather than guessing a nearest one (guardrail #14). No toast, no
  confirmation, no snap.

**Verified in-browser** (not just headless): opened `surface_rendered.html`
directly -- five on-grain bands plus a separated dashed off-grain row, all
eight mock objects positioned correctly, zero visible text beyond object
content. Pressed `i`: region keys (`intake`, `staging`, ... `compost`)
appeared as small inspection tags, confirming they're absent by default and
present only on explicit summon. Dragged the intake object: it tracked the
pointer exactly 1:1 with no lag, no toast, no label change.

- `graph.py` (Stage 2) -- a pure read-over-the-feed query layer:
  `edges_from_objects()` builds the canonical, deduplicated edge list
  straight from what the fixture already declared (a mutually-declared
  coherent-tension pair collapses to one edge, never two); `is_strut()`
  flags the `coherent-tension` type. It creates no edges of its own and
  contains no function that flips a link's state -- ratifying a proposal is
  Kevin's mark, not this module's to grant (guardrail #16, #32).
- `render.py` (Stage 2 addition) -- an SVG `#tethers` layer under the
  object cards. Tethers render at `opacity:0` by default and only reach
  `opacity:1` under an explicit `.lit` class set by `attend(id)` on
  `pointerenter` -- the default board state renders no full graph
  (guardrail #29). Attending one object dims every other object
  (`filter:saturate` + reduced opacity) except that object and whatever it's
  directly tethered to, and lights only those specific edges; leaving
  clears every `.dim`/`.lit` class immediately, with `transition:none` on
  the relevant rules so there is no fade or lingering glow (v1 Sec 7). A
  physics tick (`requestAnimationFrame`) runs three distinct edge
  mechanics: **ratified** edges pull their non-dragged endpoint via a
  damped spring scaled by both endpoints' `objectMass()` (secondary-node
  motion, v1 Sec 5.1); **coherent-tension** edges correct toward a fixed
  rest length recorded on first tick, split between both ends, so the
  Strut is held rather than resolved and can't be collapsed to zero
  (guardrail #34); **proposed** edges apply no force to either endpoint at
  all -- they only toggle a `.stretched` visual class once their live
  distance exceeds `physics.tether_max_stretch` (guardrail #31: proposed
  reads as not-yet-fact, never a weak version of a real pull). A dragged
  object is never overridden by spring/strut correction (`if (s.dragging)
  return`), so the hand always wins.

**Verified in-browser for Stage 2**: reloaded the surface fresh -- the
strut tether between the two `break` objects (obj-003/obj-004) and the
proposed `derived-from` thread (obj-002 to obj-005) are both invisible at
rest, confirmed via `document.querySelectorAll('.tether')` returning
`opacity:0` elements with no `.lit` class present. Dispatched a
`pointerenter` on obj-003 directly: exactly six unrelated objects gained
`.dim`, obj-003 and its strut-partner obj-004 stayed clean, and exactly one
tether (`tether-strut lit`) lit -- the proposed edge elsewhere on the board
stayed dark, confirming attention scopes to one object's immediate edges,
not the whole graph. Dispatched `pointerleave`: both dim and lit sets
cleared to empty in the same tick, confirming the instant, no-fade release
the spec requires. The proposed edge already carried a `.stretched` class
on load, since obj-002 (staging) to obj-005 (gate) sit farther apart than
`tether_max_stretch` (240) -- correct per guardrail #31, since it's a
visual-only response with zero pull applied.

- `gate.py` (Stage 3) -- pure geometry, no DOM, mirrored (not imported) into
  `render.py`'s JS because the crossing test must run every animation frame
  against live pointer coordinates: `gate_seam_x()` (the boundary between
  the `gate` and `landing` rects, asserted adjacent -- guardrail #14, no
  boundary invented outside `layout.py`'s rects), `segment_crosses_vertical`
  (a link's own connecting vector against the seam, within Y-bounds --
  v1 Sec 6), `swept_box_crosses` (continuous sweep between two frames so a
  fast flick can't skip the seam), `is_straddling` (the UNCOMMITTED test),
  and `resolve_crossing` (pure decision function: forward gate->landing
  ratifies crossed proposed edges and severs bypassed ones; backward
  landing->gate reverts crossed ratified edges to proposed and severs
  bypassed ones; anything else leaves every edge `unchanged` -- an ordinary
  move within gate or staging is not a crossing). No eligibility, no
  readiness, no default verb anywhere in this module (guardrail #16-18).
- `render.py` (Stage 3 addition) -- wires the gate.py geometry into the
  drag handlers. On `pointerdown`, every edge touching the grabbed object
  gets `_crossed = false` (the crossing window opens) and `startRegion` is
  recorded. On each `pointermove`, a swept test between last and current
  center-x catches a fast pass over `X_GATE`; when it fires, every touching
  edge is tested via the exact per-link segment/Y-bounds check and flagged
  `_crossed = true` if it geometrically qualifies -- this is a monotonic
  flag for the whole carry, not re-evaluated per frame in a way that could
  un-flag a link. While straddling, the object gets
  `data-straddle="uncommitted"` (styled as a neutral dashed border -- no
  color, no persuasion, guardrail #76) and loses it the instant it isn't
  straddling or on release. On `pointerup`, a forward or backward
  transition calls `ratifyEdge`/`severEdge`/`revertEdge` per edge based on
  its `_crossed` flag; a severed edge is spliced out of `EDGES` and its SVG
  line removed from the DOM outright -- guardrail #24/#28's spirit (no
  fade, no fault-state styling) applies here too, so a severed link simply
  stops existing rather than lingering as a faded reminder. A hidden
  `.gate-seam` guide line exists purely for the `i`-key inspection toggle
  (guardrail #10/#54) -- invisible during ordinary use. No confirm dialog,
  no `autofocus`, no default-weighted verb exists anywhere in the template.

**In-browser verification for Stage 3 is BLOCKED, not skipped.** Stages 1
and 2 were confirmed live in this same preview pane earlier in this
session. Attempting the same for Stage 3, the preview pane's "static
snapshot" behavior for files outside the actual project directory (its own
documented limitation, not something in this codebase) locked onto a stale
DOM state from an earlier failed test drag -- repeated `navigate` calls to
the same file, a cache-busting query string, `location.reload(true)`, a
brand-new tab, and even navigating to a renamed copy of the file all kept
reporting the identical stale object position and `location.href` pointing
at the original URL regardless of what was actually requested. This is
logged rather than papered over: Stage 3's confidence currently rests on
`tests/test_gate.py` (11 passing pure-geometry assertions covering the
seam boundary, segment intersection, swept detection, straddle detection,
and forward/backward crossing resolution) and `tests/test_render.py`'s
static checks (gate-seam hidden by default, no confirm dialog/autofocus,
severed edges removed via splice+removeChild rather than faded), plus a
clean headless smoke test -- not a confirmed live drag-across-the-seam.
Before Stage 3 is trusted as done, a fresh browser session (not this
pane's cached one) should actually drag obj-005 from gate to landing and
watch its proposed link ratify.

## Stage 4 -- the diction

Closed the logged Stage 1/2 lint gap for real, not just by exempting the
file further: `strings/lint.py` no longer strips every triple-quoted block
as if it were a docstring. `_strip_real_docstrings()` distinguishes a
genuine docstring (a bare statement, nothing precedes it but whitespace or
code) from a triple-quoted *assignment* like `HTML_TEMPLATE = """..."""`
(the text immediately before it ends in `=`) -- only the former gets
stripped. The suspect-string pattern itself had a second bug fixed in the
same pass: it allowed either quote character inside either delimiter type,
so `'class', 'gate-seam'` (two adjacent single-quoted JS literals) matched
as one fused, meaningless "violation" spanning both. Single- and
double-quoted literals now each exclude their own delimiter from the inner
character class. JS `//` comments inside the template are stripped before
scanning (Python has no `//` operator, so this is a no-op on real Python
source and only trims embedded-template developer commentary, which was
tripping false positives like "hasn't crossed yet." from a code comment).

**Verified, not just claimed**: temporarily inserted a fake string
(`const bogus = 'welcome to your dashboard';`) into `render.py`, confirmed
`tests/test_lint.py` caught it (`FAILED`, exit 1) exactly as a real
violation would be, then reverted the injection and reran to confirm clean.

Wired the four-lawful-occasions grammar (v1 Sec 8) for the two things the
bench actually produces right now: `DATA.strings` is now built server-side
in `render.py` from `strings.get()` calls (region names, the
`disclosure.proposed-thread` machine-origin disclosure, and the
`link.type.coherent-tension`/`link.type.derived-from` structural-noun
names) and embedded into the page -- no literal region-name string is
written directly in the JS anymore; `tag.textContent` now reads
`DATA.strings['region.' + key]`. A new `#disclosure` element (hidden by
default, `display:none`) fills with registry-sourced lines only while
`attend()` holds an object with something concealed to name: occasion (B)
for a proposed thread, occasion (C) for a coherent-tension strut or a
ratified relation whose type has a registered name. It clears the instant
attention releases, same as the dim/lit classes.

**What Stage 4 deliberately did NOT wire, and why**: the registry already
holds `failure.write-not-recorded`, `failure.mark-not-written`,
`failure.engine-dark`, and the two `state.*` unchanged-state strings, but
none of them are called anywhere in `render.py`. There is no write-capable
operation in v0 yet that could actually fail -- no persistence ledger, no
engine call, nothing but in-memory DOM state. Wiring a failure string to a
scenario that can't happen would be inventing a fake failure just to prove
the registry works, which is the opposite of "render the structural
consequence." These strings stay registered and lawful, ready for the
stage that adds the dry-run gate ledger (v1 Sec 12) or the engine socket,
and are logged here so their absence from `render.py` reads as a scoped
decision, not an oversight.

## Stage 5 -- the foreclosures

**The one real safety fix**: every drag-driven mark (cross, uncross,
ratify, sever) previously started on any `pointerdown`, including a
script-dispatched synthetic `PointerEvent` -- which is exactly how this
session's own Stage 3 verification attempts drove the surface via
`javascript_tool`. `pointerdown` now returns immediately if
`!ev.isTrusted`, before `s.dragging` is ever set -- a script-dispatched
event never opens the crossing window, never calls `attend()`, never
reaches any downstream mark logic. This directly closes "drag completed by
automation" from guardrail #72's non-human-path list. Verified the same
way Stage 4 verified its lint fix: temporarily removed the guard,
confirmed `tests/test_foreclosures.py` failed exactly as it should, then
restored it and reran clean.

Audited and confirmed already-true incapacity (no code change needed,
because the capability never existed): `ratifyEdge`/`revertEdge`/
`severEdge` are plain closures inside the module IIFE, never assigned to
`window`, and are called from exactly one place (`endDrag()`) -- not from
`physicsTick`, not from load-time setup, not from the `'i'` inspection
toggle. `graph.py` (the sole edge-producing module) contains no notion of
position, distance, or proximity at all, so it structurally cannot
produce an adjacency-derived edge (guardrail #73) -- it can only read what
the fixture already declared. There is no timer or clock primitive
(`setInterval`, `setTimeout`, `Date.now()`, `new Date()`) anywhere in the
rendered surface, so nothing can derive an age or a "waiting since" for a
held object (guardrail #71) -- not tested-and-passing, but structurally
absent. There is no `fetch`, `XMLHttpRequest`, `WebSocket`, or dynamic
`import`/`require` anywhere, so "the engine stays dark" is true by absence
of any invocation primitive, not by a guard around one that could
otherwise fire (guardrail #74). There is no `<button>` element and no
`autofocus` anywhere in the rendered surface yet, because v0 has no
command/verb UI at all -- the mark is purely gesture-driven -- so there is
nothing yet that could be rendered with a persuasive default-focus, size,
or color hierarchy (guardrail #76); this is an honest absence-of-target
finding, not a certification of a verb UI that doesn't exist yet.

**Honest scope limit, stated once rather than assumed away**: this
project has no JS execution harness (no jsdom, no headless-browser test
runner) inside the Python test suite. Guardrails #70-76 as written
describe *runtime* scripted paths run against a live DOM. Without a way to
execute the template's JS and inspect a live page from Python,
`tests/test_foreclosures.py` implements each as a **static/structural
proxy** -- inspecting `HTML_TEMPLATE`'s actual source and the pure-Python
modules for the *capability* a guardrail forecloses, rather than running
the scripted path and observing the runtime result. This is logged in the
test file's own docstring, not just here, so it can't be missed by whoever
reads the tests without reading this note. If a real browser-driven test
runner is ever added, these should be re-verified live -- and Stage 3's
still-blocked live verification (below) should finally close out at the
same time.

## Known gaps (logged, not fixed yet)

Stage 2 addition: the spring/strut correction math in `physicsTick()` is a
Stage-2-scoped approximation, not the full v1 Sec 5 model -- it moves
either endpoint directly (`applySpring`/`applyCorrection`) rather than
routing through a proper velocity-Verlet integrator, and the strut
correction (`err * 0.5` split) has no damping term of its own, so a fast
external disturbance could ring slightly before settling. Acceptable for a
dry-run surface; worth revisiting if Stage 3's gate carry needs tighter
control over how a heavily-tethered object behaves near the threshold.

## Tests (all passing, run directly -- pytest is not installed in this
environment; each test file is also a runnable script)

- `tests/test_lint.py` -- registry + source-tree lint clean.
- `tests/test_regions.py` -- every display name still equals its functional
  key; unknown region keys raise.
- `tests/test_feed.py` -- mock feed loads, every object sits in a lawful
  region, `mock_feed.py` touches no network.
- `tests/test_renderer_seam.py` -- `NullRenderer.open()` binds no new
  listening port (checked with `psutil` when available); `surface.html`
  references no remote resource (`http://`, `https://`, `ws://`, `wss://`).
- `tests/test_layout.py` (Stage 1) -- every region key has a rect, rects stay
  inside the canvas, on-grain rects don't overlap, off-grain sits below the
  flow band, and every fixture object's position actually resolves (via
  `region_for_point`) to the region it claims.
- `tests/test_render.py` (Stage 1-2) -- the rendered HTML has no remote
  resource (SVG namespace URI excluded as a required constant, not a
  fetch), every region key is present as embedded data, the region-tag
  element is `display:none` by default, no greeting/coaching phrase appears
  anywhere in object-content-scrubbed output, tethers default to
  `opacity:0` with `.lit` reaching `opacity:1` (guardrail #29), the three
  tether classes are visually distinct, the `<style>` block (object content
  excluded, since e.g. "unanchored" contains "red") carries no fault-state
  vocabulary on tension styling (guardrail #35), and the proposed-edge
  branch of `physicsTick()` never calls `applySpring`/`applyCorrection`
  (guardrail #31).
- `tests/test_graph.py` (Stage 2) -- edges match the fixture's declared
  links exactly (no invented relation), a mutually-declared
  `coherent-tension` pair collapses to one edge, `edges_touching`/
  `other_end` resolve correctly.
- `tests/test_gate.py` (Stage 3) -- the gate seam is exactly the gate/
  landing rect boundary, segment-crossing detects correctly in-bounds and
  rejects out-of-Y-bounds and same-side cases, the swept box test catches
  a same-frame flick across the seam and correctly ignores travel that
  stays on one side, straddle detection is correct both ways, and
  `resolve_crossing` ratifies-crossed/severs-bypassed on a forward pass,
  reverts-crossed/severs-bypassed on a backward (uncross) pass, and leaves
  every edge `unchanged` when there's no landing transition at all.
- `tests/test_render.py` gained three Stage-3 checks: the `.gate-seam`
  guide line is `display:none` by default, no `confirm(`/`autofocus`/"are
  you sure" text exists anywhere, and `severEdge()` removes the edge via
  `splice`+`removeChild` rather than any fade/opacity mechanism. Stage 4
  added two more: `#disclosure` is `display:none` by default and its
  content is built only from `DATA.strings[...]` lookups inside `attend()`
  (never a literal sentence), and the three disclosure/link-type registry
  entries exist and carry a lawful class.

Note on `tests/test_lint.py`: it is now a genuinely stronger gate than
before -- it scans `render.py`'s embedded JS/HTML template contents, not
just plain Python source, and its own correctness was checked by injecting
a real violation and confirming failure before confirming the clean pass
(see the Stage 4 section above).

- `tests/test_foreclosures.py` (Stage 5) -- the guardrail #70-76 build-level
  tests, as static/structural proxies (see the Stage 5 section above for
  the honest scope limit): the carry requires `ev.isTrusted` before
  entering drag state; `ratifyEdge`/`revertEdge`/`severEdge` are never on
  `window` and only ever called from `endDrag()`; `graph.py` has no
  spatial/proximity computation; no timer/clock or engine-invocation
  primitive exists anywhere in the rendered surface; the region/object
  creation loops write only registry-sourced or exact-object-content text;
  the microcopy lint runs clean; no `<button>`/`autofocus` exists yet. The
  `isTrusted` check specifically was verified the same way Stage 4 verified
  its lint fix -- removed, confirmed the test failed, restored, reran clean.

Headless smoke test: `python -m nesi_bench_v0.main --headless` from the
`nesi/` directory -- loads 8 mock objects, builds
`renderer/surface_rendered.html`, opens `NullRenderer`, exits clean.

## Where the renderer seam is

`renderer/seam.py` defines `Renderer`. All application code must go through
it -- nothing should import `webview` directly outside
`renderer/pywebview_renderer.py`. Swapping renderers later means writing a
new `Renderer` subclass, not touching `main.py`.

## What's stubbed

- `surface.html` (the empty Stage-0 shell) still exists untouched; Stage 1
  added a second file, `surface_rendered.html`, which is what `main.py`
  actually opens now. Region layout, object rendering, per-region
  physics-on-drag, the graph (tethers, propose/ratify, the Strut), and the
  gate carry (crossing/ratification geometry, Stage 3) are all built now --
  what Stage 3 built is the geometry only, not the shear feel (see below).
- `staging`'s kinetic-mass value now drives the ratified-tether spring
  response (heavier objects respond more slowly to a connected partner's
  motion) -- that part of the Stage-1 stub is resolved. The gate shear
  feel is now built too -- see Stage 7 below.
- The string registry currently holds only the strings this Stage-0/1 shell
  needed (region/link nouns, operation nouns, a few failure/provenance/
  technical-fact templates). It grows as each later stage needs a string --
  never ahead of need, per guardrail #50's registry-only rule.

## What's deferred

- **The engine** stays dark. No engine call exists anywhere in this tree.
- **The slack-filament door** (v1 Sec 11, guardrails Sec L) is not built and
  not referenced. Its profiling boundary lives only in the two v1/guardrails
  documents, not in any schema here.
- **The renderer pick is RATIFIED, 2026-07-21, Kevin's mark ("ratify the
  renderer").** pywebview is no longer a recommendation only -- proven
  working since Stage 6's seen-live check (a real window, a real
  `webview.start()` event loop, clean teardown), now the marked default.
  `renderer/pywebview_renderer.py` stands as the ratified implementation of
  the `Renderer` seam, not a candidate.
- **Region display-names and the filament stance** are still held. The
  display-names convergence table (master doc Sec 3) isn't reachable from
  this repo to prepare a walkthrough of -- named as a real gap, not a
  default-hold. Filament is correctly unbuilt, genuinely not time.

## Stage 6 -- standing note + seen-live

**Headless**: the full 50-test suite (`test_lint`, `test_regions`,
`test_feed`, `test_renderer_seam`, `test_layout`, `test_graph`,
`test_gate`, `test_render`, `test_foreclosures`) passes clean, and
`python -m nesi_bench_v0.main --headless` loads the 8-object mock feed,
builds `renderer/surface_rendered.html`, and opens `NullRenderer` without
error -- run fresh as the last action before writing this note.

## Stage 7 -- gate shear (v1 Sec 5.2), 2026-07-21

**Kevin's mark ("gate shear is a completion item for bench v0 -- build the
freeze-then-release resistance feel on top of the existing crossing
geometry").** Stage 3 built the crossing/ratification *geometry*; this
closes the shear *feel* on top of it. Added to `render.py`'s pointermove
handler as a new `region === 'gate' || region === 'landing'` branch,
parallel to `break`'s existing static-breakaway branch:

- **Resists the perpendicular axis only.** X_GATE is a vertical seam, so
  the resisted axis is horizontal (X); Y is never touched by the freeze --
  a straight up/down drag inside gate or landing feels exactly as it did
  before. This is the load-bearing difference from break's breakaway,
  which caps *both* axes.
- **Freeze, then release, per approach.** While the object's estimated
  center sits within the shear zone (`physics.gate_intersection_padding +
  physics.gate_shear_threshold` px of the seam, both already-configured
  values that sat unused until now), X freezes at the point it entered the
  zone and accumulates perpendicular travel; once that travel clears
  `gate_shear_threshold` the freeze releases for the rest of the carry and
  X snaps free to track the pointer again -- same static-then-free shape
  as break, scoped to the seam zone instead of the whole region.
- **Re-arms, doesn't lock.** Leaving the zone without releasing resets the
  anchor (`shearAnchorX = null`), so a second approach later in the same
  carry gets its own fresh freeze rather than staying stuck from the first.
  Both new per-carry vars (`shearAnchorX`, `shearReleased`) reset on every
  `pointerdown`, same discipline as `breakawayDone`.

**Verified, not just claimed**: two new static/structural-proxy tests in
`test_render.py` (same testing discipline named in the Stage 5 section --
no JS execution harness in this project, so these inspect `HTML_TEMPLATE`'s
actual source rather than a running DOM): one confirms the shear branch
reassigns `targetX` but never `targetY` (the perpendicular-only claim), the
other confirms both `shearReleased = true` (the release) and `shearAnchorX
= null` (the re-arm) appear in the branch, and that both vars reset in the
`pointerdown` handler. Full suite re-run clean after the change: **52
tests now** (50 + 2), `python nesi_bench_v0/tests/test_render.py` prints
its clean line with no assertion failures, headless
`python -m nesi_bench_v0.main --headless` still loads the 8-object feed
without error. In-browser confirmation of the actual felt resistance is
not run this pass -- same class of limit as Stage 3's still-open live-drag
item (§OPEN ITEMS 1): the structural proxy confirms the code does what it
claims, not that it feels right under a real hand.

Item 8 of §OPEN ITEMS (below) is now CLOSED by this build; the other five
items are untouched.

## Stage 8 -- the dry-run gate ledger (v1 Sec 12), 2026-07-21

**Kevin's mark ("build the ledger").** `nesi_bench_v0/ledger.py`: stdlib-only
persistence, `record(event, detail)` appends one JSON line to
`ledger/dry_run.jsonl`, `read_all()` reads them back. This is what makes
`failure.write-not-recorded` and `failure.mark-not-written` finally
testable -- there was no write-capable operation anywhere in v0 before this
that could fail. `failure.engine-dark` stays correctly unwired: this module
makes no engine call, so wiring that string here would invent a failure that
cannot structurally happen while the engine is dark.

**Verified**: 5 new tests in `tests/test_ledger.py` -- append + read-back,
missing-ledger reads as empty (not an error), multiple records stay in
order, a real write failure (parent path is a file, not a directory) raises
`LedgerWriteError` loudly, and a source check confirms no clock or network
primitive anywhere in the module. Full suite re-run clean: **57 tests now**
(52 + 5). Headless smoke still loads clean.

**Named honestly, not smoothed over**: this module has no live call site yet.
The rendered surface is pure client-side JS with no server round-trip --
there is no path today from a real pointerup mark event back into this
module. Wiring one means crossing the renderer seam (seam.py's own law:
nothing imports webview directly outside `pywebview_renderer.py`) via
pywebview's `js_api` bridge, which raises real questions -- does
`NullRenderer` need a headless stub for the same callback, does the
shared/renderer-agnostic `render.py` template stay renderer-agnostic if it
calls `window.pywebview.api` directly -- that are a real architectural
decision, not something to improvise into the shared JS unilaterally. The
module is real, tested, and ready; the last wire is a named open question.

**Seen-live, for real**: pywebview 6.2.1 is installed on this machine. A
one-off verification script (kept in the session scratchpad, not in the
deliverable tree) called `PywebviewRenderer`'s underlying `webview` module
directly: created a real native window pointed at the actual
`surface_rendered.html` via `webview.create_window(...).as_uri()`, ran a
genuine `webview.start()` event loop, and auto-closed the window after an
8-second timer so this verification pass didn't sit waiting on manual
interaction. First attempt (3-second timer) raced WebView2's async
initialization and logged a `WebView2 initialization failed` exception on
teardown -- the window had already been created and `webview.start()` had
already returned before that error surfaced, so it read as a timing
artifact of closing too early, not a renderer defect. The retry (8-second
timer) came back completely clean: `SEEN_LIVE_OK: window created` followed
by `SEEN_LIVE_OK: webview.start() returned cleanly`, no exception at all.
This is a first-hand, on-this-machine confirmation that the renderer seam
opens a real local window and renders the actual built surface -- not a
simulation of one.

## OPEN ITEMS -- carried across stages, not resolved by this note

Named once, together, so nothing sits scattered across six stages of
prose pretending to be closed:

1. **Stage 3's in-browser gate-carry confirmation is still blocked.**
   The preview pane used earlier in this session locked onto a stale DOM
   snapshot before a real drag across the seam was ever watched
   end-to-end (proposed link ratifying, or severing on a bypass). The
   Stage 6 seen-live check above confirms the *renderer* opens and loads
   correctly; it does not substitute for actually dragging an object
   across `X_gate` and watching the outcome. Carried three stages now
   (first named after Stage 3, repeated after Stages 4 and 5) without
   being done.
2. **CLOSED, Stage 7 (2026-07-21).** Gate shear built: resistance
   perpendicular to the seam, freeze-then-release, per the ruling above.
   See the Stage 7 section for the build and its verification.
3. **PARTIALLY CLOSED, Stage 8 (2026-07-21).** The ledger itself is built
   and tested (`ledger.py`, 5 tests) -- `write-not-recorded` and
   `mark-not-written` are now real, testable failure modes at the module
   level. `engine-dark` correctly stays unwired (no engine call exists to
   fail). What's still open: no live call site connects a real mark event
   to the ledger yet -- that requires crossing the renderer seam via
   pywebview's `js_api`, a real architectural decision named in the Stage 8
   section, not decided here.
4. **The Stage 2 spring/strut physics are a direct-correction
   approximation**, not a full integrator -- logged as acceptable for a
   dry-run surface but worth a second look if a later pass needs tighter
   control of a heavily-tethered object's behavior near the gate.
5. **The Stage 5 build-level tests are static/structural proxies**, not
   live-DOM runtime tests, because this project has no JS execution
   harness. Stated in the test file's own docstring and in the Stage 5
   section above -- surfaced a third time here so it isn't the kind of
   caveat that only lives in one place and gets lost.
6. **Partially closed, 2026-07-21.** The renderer pick is RATIFIED (Stage 8
   note above) -- pywebview is the marked default, not a recommendation.
   Region display-names (the round-3 convergence table, master doc Sec 3)
   and the slack-filament door remain held -- the table isn't reachable
   from this repo to prepare, and filament is correctly unbuilt.

None of these six blocked calling Stage 6 "built." Item 2 (gate shear)
closed Stage 7, 2026-07-21. The remaining five should be looked at before
v0 is called *finished*.

## Not touched

`NESI.exe`, `nesi_app.py`, `conductor/core.py`, `staged/`, `marks.jsonl` --
confirmed untouched; this build lives entirely under `nesi/nesi_bench_v0/`.
