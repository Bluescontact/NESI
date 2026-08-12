# OVERNIGHT BUILD SPEC — NESI's World v1
**Accepted:** Kevin's marks 23:54 ("wake up tomorrow, open a browser, and step into NESI's world" · "three spires"). Governing naming: `nesi/spec/THE_WHOLE_NAMING_2026-07-31.md` (ACCEPTED AS AMENDED, §7 + §7b govern). Vision feedstock: `_INTAKE/logbook_vision_2026-07-31.md`. Gate open in OPEN_GATES.jsonl; morning session verifies per Definition of Done.

## THE DELIVERABLE
A browser-openable world at **`nesi/world/index.html`** (double-click, no server, file:// safe) plus **`nesi/world/logbook.html`**. Kevin opens index.html in the morning and steps in.

## THE WORLD (index.html)
- One drawn map, 2000s-desktop wireframe register: mountains one side, THE LAKE the other (its dark part, THE DEEP, visibly unrendered — drawn as darkness, never populated), THE SHORE along the water, and the buildings walkable by click: **THE THREE SPIRES** (Grown · Given · Woven — a small cluster), **THE WORKSHOP**, **THE HEARTH**, **THE HELIOSTAT**, **THE MEMBRANE**. SVG or canvas, cartoonish, simple beautiful lines. Light background palette (no dark backgrounds — the Deep is dark WATER inside a light world).
- NESI is drawn in the lake as a small mount-creature by her vortex. Decorative + locating only: she never speaks judgments; a small caption may quote her four commands (surface gifts · search the deep for names · water the orchard · hold the vortex) as things Kevin can ask, not things she does unbidden.
- Each building opens a view (in-page panel or link) over what ALREADY EXISTS — reuse, never rebuild:
  - Grown Spire → `../workbench/invariant_index.html` (the grove) and `../board.html`
  - Given Spire → `../boundary/maps/for_michael.html` as exemplar + an honest "receiving shelf — empty until something is given" panel
  - Woven Spire → honest empty shelf: "what we've built together files here (returns live here)"
  - Workshop → `../workbench/tension_table.html` (private build space; note: crafting table with tension and wires is FLAGGED future)
  - Hearth → `../warm_one_walkthrough.html` and `../warm_one_card.html` (the round; move 5 ends here)
  - Heliostat → link panel naming the two engines (transmission, field-kit) + `NESI_for_MitoLabs` as the first fired piece
  - Membrane → `../boundary/my_boundary.html` (the posted map; gift-only crossing law quoted; receiver-marks-the-gift law quoted)
- THE SHORE renders today's stones from localStorage (written by logbook.html). Two-way: a "NESI surfaces…" spot where a surfacing (a naming, a tool, a seed, an idea, a question) can appear — v1: surfacings arrive only when Kevin asks (a button "ask NESI to surface" that draws ONE random item from a small bundled list of his own open gates/held items compiled at build time from OPEN_GATES.jsonl — declared material only, never inference).
- A small ground-patch near the shore: THE DAILY SHAPE — contour derived from the day's writing's raw word-shape only (counts/lengths, no meaning), mechanic labeled PROVISIONAL. Guard absolute: nothing anywhere analyzes, scores, or reflects the writer.

## THE LOG BOOK (logbook.html)
- One writing surface, live word-count gauge, user-set target, GENERATE door.
- On generate: the text is stored locally (localStorage + a downloadable .txt), stones are derived client-side as raw fragments (paragraph-level chunks, verbatim, no analysis), the world link appears ("step through the door"). A visible note states honestly: "metabolizing into seeds happens with NESI in session — paste your pages there when you choose." No hidden processing, no network calls, nothing leaves the machine.
- Persistence: everything retained until processed (no daily wipe; stones persist until Kevin removes/processes them).

## LAWS CARRIED (verbatim constraints)
recognition law (the mechanic never does the recognizing) · no completion function · no read receipts / no surveillance · the Deep never renders its contents · only gifts cross the membrane, receiver's mark makes the gift, circulation is the record · locate never steer · nothing directs Kevin's body · morning-pages guard absolute.

## HARD BUILD RULES
file:// safe (no fetch of local JSON — embed data at build time) · no external network resources · light backgrounds · plain-language labels (world words, no framework jargon on surfaces) · every relative link verified to exist before shipping · reuse existing files, modify NOTHING existing.

## DEFINITION OF DONE (binding)
1. Read the governing naming file in full before building. 2. Actually open index.html and logbook.html in a real browser; click every building; verify every link resolves; run a generate round-trip (type → generate → stones appear on the shore). 3. Prove the round-trip in the report. 4. Split the claims: report states "the mechanism works" evidence only — whether it is the gift is Kevin's morning read, never claimed. 5. Write `nesi/world/BUILD_REPORT.md` naming exactly what ran, what didn't, and every flagged-provisional piece.
