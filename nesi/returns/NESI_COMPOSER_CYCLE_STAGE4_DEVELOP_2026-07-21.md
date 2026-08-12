# COMPOSER CYCLE — STAGE 4 DEVELOP
**Date:** 2026-07-21. **Ground:** Stage 3 DREAM, settled — Kevin's mark: "yes — this is it" (nesi/returns/NESI_COMPOSER_CYCLE_STAGE3_DREAM_2026-07-21.md). **Status:** design spec, precise enough to build. Not the production organ — Stage 5 builds it. No code written this stage.

Specified in the same 10-field construction-language form as composer.py's own STANDING_SPEC.md, so the two organs read as one family.

```text
ORGAN:      the Room — NESI's living render surface, sitting above composer.py
            the way composer.py sits above bench.py: one more layer, same
            stack, nothing beneath it disturbed.
PROBLEM     nesi_app.py's bench tab renders exactly one object at a time in
            a fixed 300x150 tk.Canvas (`self.composed_canvas`,
            nesi_app.py:405) — this is the "debris view" the cycle's brief
            named: correct render, no space. Objects have no shared view;
            relations between them (a pattern applied, a HOLD's condition,
            a composted lineage) are invisible outside individual JSON files.
FORCES      same four composer.py already carries (render vs author ·
            invariance vs expression · symbol-as-index vs box-and-arrow ·
            upstream-of-the-door vs parallel-to-it) PLUS one new one this
            stage adds: reposition vs re-author — moving a node inside its
            own band is rendering (free, always-on); moving it across a
            band boundary is staging a possible mark, never the mark itself.
FORM        three new functions, one new native surface, zero changes to
            composer.py or bench.py:

            build_index() -> list[dict]
              scans nesi/staged/*.json + gate_data.json's staging_tray,
              reads each object's OWN existing `composed` block (never
              recomposes — reuses the cache bench.py already writes),
              assigns a band from mark.verdict/gate status (staged/held/
              canon/compost), returns [{id, band, composed, object}].

            derive_edges(index) -> list[dict]
              reads fields ALREADY PRESENT on staged objects — no new
              schema. Confirmed on a real object (2026-07-19 lease):
              object.items[] already carries {target, disposition,
              evidence} — an object-to-pattern reference today. Mapping:
              disposition "applied" -> feed · a HOLD verdict's own
              condition text -> loop (self-referential) · a compost
              reason naming a prior target -> drain · an explicit veto/
              falsifier-kill note -> block. Pattern-to-pattern EXTENDS
              lines (named in prose today, e.g. THE_ASSEMBLY's own
              examples) are NOT yet a parseable field anywhere — this is
              the one real gap named plainly below, not smoothed over.

            render_room_canvas(index, edges, tk_canvas)
              draws bands as composer.py's own boundary-band rectangle,
              stacked vertically, one per band, hairline only, drawn
              first — literally borrowing render_diagram_svg's ordering
              rule, translated from one SVG string to repeated native
              tk.Canvas calls (parallel implementation, same primitives,
              same discipline as today's `_draw_composed()` — SVG and
              Canvas have never shared a code path in this organ and
              won't start here). Nodes: one small rect + label per
              object, positioned by build_index()'s band + an even
              in-band spread (today's SIZES-style spacing, generalized
              from 1D to a 2D grid within the band). Edges: tk.Canvas
              create_line with the SAME dash tuples composer.py's
              `dash = {"drain":"4,3","feed":"0","loop":"2,3","block":
              "1,3"}` already defines — copied verbatim, not reinvented.

            hands off: nothing marks, crosses, or deletes. Reads only.
FALSIFIER   a node rendered with per-status color (canon nodes green,
            held nodes yellow, etc.) — compost, the symbol law inverted
            back to box-and-arrow at room scale. A cross-band drag that
            moves the underlying JSON or gate_data.json's own state
            without an explicit confirm step firing first — compost,
            that is the room becoming a mark-authority, which no organ
            may be. A fifth edge-kind invented before these four are
            shown insufficient in real use — compost, per composer.py's
            own invariance rule extended upward.
PLUMB       composer.py (read-only, unmodified) · bench.py's existing
            compose_preview/land wiring (unmodified, already produces
            the `composed` cache this reads) · gate_data.json (read-only)
            · nesi_app.py's existing ttk.Notebook + tk.Canvas pattern
            (extended: a new tab or an expanded bench-tab pane, Kevin's
            call, named as an open question below, not decided here) —
            true.
FALSE CAR   build_index/derive_edges/render_room_canvas are new code,
            not "just wiring" — named plainly as a new small module
            (nesi/bench/composer/room.py, stdlib-only, same posture as
            composer.py's own build) rather than dressed up as a
            trivial extension.
FALSE CAR   pattern-to-pattern EXTENDS edges are NOT built this stage —
            they need a small new parser over patterns/*.md's own
            lineage lines (a real, separate, small piece of work,
            named here so Stage 5 doesn't discover it mid-build and
            improvise a shortcut). Object-to-pattern edges (via
            items[].target) need no new parsing — that data already
            exists on every staged object today.
ENTRANCE    the room needs ONE seat in nesi_app.py — either (a) the
            bench tab's fixed composed_canvas grows to fill the pane
            and becomes the room, single-object view demoted to a
            click-to-open detail panel, or (b) a new "room" tab sits
            beside front/metabolizer/bench/interrogator, and the bench
            tab keeps its current single-object canvas unchanged. Not
            decided here — a real Stage 5 fork, named for Kevin's call,
            not assumed either way.
INTERLOCK   ONE index function (build_index, called once per room open
            or refresh, never per-node) · ONE edge-deriver (derive_edges,
            pure function of the index, no side effects) · ONE canvas
            renderer reusing composer.py's exact ink/line/dash constants
            (INK/LINE/FAINT/FAINTER/dash-map) imported, not retyped —
            the room's palette is composer's palette, verbatim.
SIGN-OFF    none yet. Stage 5 builds room.py, wires ONE entrance point,
            and runs it against real staged/*.json + gate_data.json —
            the same posture composer.py itself had at its own birth
            (headless smoke test before any window tab).
```

## Interaction mechanics, concretely
- **Click a node** → opens that object's existing composer card/doc render in the same detail panel `_draw_composed()`/text widgets already build for the bench tab today. No new detail-view code — reuse verbatim.
- **Drag within a band** → local reposition only, recomputed by `render_room_canvas`'s own spacing rule, never touches disk, never calls `bench.land()` or any staging function.
- **Drag across a band boundary** → does not move anything on drop. Opens a native tk dialog carrying the same three plain lines the chassis's heavy-card manifest already uses (I'll / it touches / how big) plus a real confirm/cancel pair. Only on explicit confirm does it call whatever the real underlying action already is for that band-transition (a HOLD resolving, a gate mark, an uncross) — never a new bypass path invented for the room's own convenience.
- **A snapped cable** (edge whose target is gone/composted/never resolved) renders exactly as `derive_edges` computes it: absent, not greyed-out, not flagged with a warning icon — the node sits there, cable simply isn't drawn. This is Stage 3's own naming of the diagnostic, carried through unchanged.

## Open questions, named for Stage 5, not decided here
1. **Tab placement** (ENTRANCE above) — expand the bench tab or add a room tab. Both are small changes to `nesi_app.py`'s existing Notebook; neither touches composer.py or bench.py.
2. **EXTENDS parsing** — a small stdlib parser over `patterns/*.md` for lineage lines, scoped tightly to avoid becoming a second reader.py. Not built this stage; named so it isn't invented under pressure mid-Stage-5.
3. **Band assignment for objects with no explicit mark.verdict** — today's sample object has `mark.verdict: null`; `build_index()`'s default (staged band) needs to also check gate_data.json's own tray categories rather than trusting the staged JSON alone, since gate state can move without the staged file being rewritten. Flagged, not resolved.

## Fork settled, 2026-07-21
**Kevin's mark: "add a new 'room' tab for Stage 5 BUILD instead, leaving the bench tab's current single-object canvas untouched."** ENTRANCE above is resolved: option (b). The bench tab's fixed `composed_canvas` is not touched or demoted by Stage 5 — a fifth tab (`room`) is added to the existing `ttk.Notebook` in `nesi_app.py`, seated the same way `_build_bench_tab`/`_build_interrogator_tab` already are.

## Return
A buildable spec for the Room: three new pure functions plus one native canvas surface, all reusing composer.py's register/DSL/edge-vocabulary and bench.py's existing data verbatim, with the one real new-parsing gap (pattern EXTENDS lines) named rather than hidden inside "just wiring." Nothing built. Stage 5 (BUILD) is next, and carries the cycle's second membrane: does the Composer stand as NESI's organ, the space alive — also Kevin's alone.
