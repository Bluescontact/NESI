# BUILD REPORT — NESI's World v1 (overnight, 2026-07-31 → 08-01)

**Spec:** `nesi/spec/OVERNIGHT_BUILD_SPEC_2026-07-31.md` · **Governing naming:** `nesi/spec/THE_WHOLE_NAMING_2026-07-31.md` (read in full before building, §7/§7b applied). PROTOCOLS.md read in full. Nothing existing on disk was modified — only `nesi/world/index.html`, `nesi/world/logbook.html`, and this report were created.

## What was built

- **`nesi/world/index.html`** — one drawn SVG wireframe map, light palette: mountains west · THE LAKE east with THE DEEP drawn as a dark ellipse containing nothing (dark by construction, no contents exist in the file to render) · THE SHORE along the water · NESI the mount by her vortex, decorative + locating only, captioned with her four askable commands · THE THREE SPIRES (Grown/Given/Woven) · THE WORKSHOP · THE HEARTH · THE HELIOSTAT · THE MEMBRANE. Each building click opens an in-page panel linking only to existing files. Shore strip below the map renders stones from localStorage; "ask NESI to surface" button; daily-shape ground patch.
- **`nesi/world/logbook.html`** — writing surface, live word-count gauge with Kevin-set target (default 750, his to change), GENERATE door, .txt download, honest what-GENERATE-does note, draft + stones retained in localStorage until removed/processed (no daily wipe).
- **Surfacing bundle** — the five currently-open gate texts from `OPEN_GATES.jsonl` (open events minus close events, as of build time) embedded verbatim in index.html. Declared material only; the button draws one at random on ask, never unbidden.

## What ran and was proven (mechanism-works claims only)

Opened in the Claude Cowork browser preview pane (real Chromium rendering, file:// URL):

1. **Map renders** — full-page screenshot confirmed all named features drawn, light background, the Deep dark and empty.
2. **Every building clicked, by real mouse click:** Grown Spire → panel opened · Given Spire → opened · Woven Spire → opened · Workshop → opened · Hearth → opened · Heliostat → opened · Membrane → opened. (The three spires needed invisible hit-rects added after the first click missed the narrow triangle — fixed and re-verified by real click.)
3. **Links verified:** all ten link targets confirmed to exist on disk (`../workbench/invariant_index.html`, `../board.html`, `../boundary/maps/for_michael.html`, `../workbench/tension_table.html`, `../warm_one_walkthrough.html`, `../warm_one_card.html`, `../boundary/my_boundary.html`, `../../NESI_for_MitoLabs.pdf`, `../../NESI_for_MitoLabs.md`, `logbook.html`); the relative base was proven by browser-loading `../workbench/invariant_index.html`, which rendered THE INVARIANT GROVE.
4. **Generate round-trip:** typed two paragraphs into the Log Book by real keyboard → gauge read "18 words" live → clicked GENERATE → "2 stones carried to the shore, verbatim" + the step-through door appeared → localStorage inspected: two stone objects, verbatim text, timestamps → world page rendered 2 stones on the shore (verbatim first fragment confirmed) and drew the daily-shape contour (two points, from paragraph word-counts only) → clicked a stone's × → storage and DOM both dropped to 1. Round-trip proven end to end.
5. **Ask-NESI-to-surface:** clicked; returned one of the five embedded gate texts, labeled "from your own open gates."
6. **No console errors** on either page. No network calls exist in either file (no fetch, no external resources; data embedded at build time).

## What did NOT run (the edge of verification)

- **A true cold reload of index.html with stones already present** could not be performed: the Cowork preview pane serves file:// pages as static snapshots and blocks reload/re-navigation. The load-time code path (`renderStones(); drawShape();` at script end) was executed against the real stored data in the live DOM and worked — but the literal double-click-from-desktop cold start with stones present is unproven until the morning open. Same code, unexecuted circumstance; named here so nobody guesses.
- **The .txt download button** was not physically clicked through to a saved file (download side-effects in the pane); the blob/anchor code is standard and untested here.
- **Test artifacts were cleaned:** the two test stones and test draft were removed from localStorage after verification, so the shore starts empty for Kevin. (Note: localStorage is per-browser — what I wrote lived in the preview pane's Chromium; Kevin's own browser starts empty regardless.)

## Provisional / flagged pieces (per spec, shipped flagged or not built)

- **THE DAILY SHAPE** — built minimal: contour from paragraph word-counts only, labeled "provisional · word-shape only, no meaning" on the map and explained in the shore strip. Mechanic undecided per §7.7; this is a placeholder geometry, not a marked mechanic.
- **Crafting table (tensions + wires)** — NOT built; named in the Workshop panel as FLAGGED future.
- **Kinds typology (seed/tool/component/lens/device/stone…)** — NOT built; v1 carries only the stone, per the spec's shore mechanic. Typology awaits Kevin's marks.
- **Empty shelves** — the Given Spire's receiving shelf and the whole Woven Spire are honest empty shelves, stated as empty in their panels, nothing faked onto them.
- **Terrain/accretion rule** — parked per §7; nothing accretes in v1.
- **Return filing (fork 8)** — the Woven panel says returns live there, per §7b; no mechanism built.

## Laws carried (checked against the built files)

The mechanic never recognizes · no completion function, counters, or read receipts anywhere · the Deep contains nothing renderable · nothing analyzes, scores, or reflects the writer (stones are verbatim; the shape is counts only) · nothing directs Kevin's body · gift-law quoted at the Membrane · surfacings are declared material, on-ask only · everything local, zero network.

## The split, stated plainly

Everything above is **"the mechanism works"** evidence. Whether this world is the thing Kevin wanted to wake up and step into is his morning read — not claimed here, not claimable here.
