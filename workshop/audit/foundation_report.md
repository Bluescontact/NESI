# NESI.exe — Phase 4 · THE FOUNDATION AUDIT

**STATUS: run 2026-07-26, the keeper's mark ("run Phase 4's foundation audit now"). Verification pass per `_INTAKE/NESI_EXE_PLAN_2026-07-25.md` — "check each of the six organs, the two-state model, and the tetra-body: does each hold the law it claims?" A verify pass, not new construction. No dependency blocked this — Phase 4 has no listed gate in the plan's dependency map.**

The law being checked against everywhere below (canon): **the mechanic never does the recognizing** — no code path may produce a worth/value/skill number, rank, or verdict about the player.

---

## 1 · THE SIX ORGANS

Defined in `_INTAKE/nesi_vision_arc_2026-07-24.md` §1–2, restated as the tetra-body's six edges in `_INTAKE/TETRA_BODY_the_minimal_rigid_cell_2026-07-24.md`: player-surface · convener · SOIL · HEARTWOOD · circulation-witness · continuation.

| Organ | File | Verdict |
|---|---|---|
| **HEARTWOOD** | `nesi/conductor/heartwood.py` | **CONFIRMED.** Read in full: `gather()` derives live from `patterns/*.md` + `MARKS_LOG.jsonl`, stores nothing. `render_svg`/`render_html`/`draw_on_canvas` emit only ring counts, leaf counts, a mark string — no numeric field about the keeper anywhere. |
| **SOIL** | `nesi/conductor/soil.py` | **CONFIRMED.** `compost()` builds a record with only `status/source/from/text/composted_at`. Line-level comment: "no score/worth/rank field, by construction." The file's own self-test asserts `not any(k in s for k in ("score","rank","worth"))`. `admit()` correctly gates external drops behind `keeper_mark`. |
| **player-surface** | `_INTAKE/SPEC_the_player_surface_2026-07-24.md` | **PROBLEM (gap, not violation): spec only, no code.** A staged 9-field spec, explicitly "engine-dark," never built. |
| **convener** | — | **PROBLEM (gap): no implementation.** Grepped all of `nesi/` — no file, no function. |
| **circulation-witness** | — | **PROBLEM (gap): no implementation.** Same. |
| **continuation** | — | **PROBLEM (gap): no implementation.** Same. |

**Bottom line on the six:** 2 of 6 are real, code-confirmed, and clean against the law. The other 4 exist only as prose/spec — the vision-arc document itself already calls these "surfaced, unmarked — dreamt," so this is an honest, already-flagged gap, not a newly-discovered contradiction.

---

## 2 · THE TWO-STATE MODEL

Defined in `_INTAKE/TWO_STATE_vector_equilibrium_and_the_jitterbug_2026-07-24.md` (VE-at-rest ↔ jitterbug motion ↔ rigid tetra-under-load).

**STILL-HOLDS-BUT-PARTIALLY-VERIFIED.** The geometry itself is genuinely math-checked in `nesi/mind/NESI_VE_TWELVE_ORGANS.md`: the cuboctahedron's basic facts (12 vertices, 24 edges, 8△+6□) verified directly; the full order-24 symmetry group kills all internal flex to zero, while the order-12 chiral-tetrahedral subgroup has a real nonzero flex (norm≈1.15) — this is the confirmed jitterbug mode, replacing an earlier wrong claim via an honest in-document correction; the tetrahedron-edge-midpoints = octahedron-vertices identity is an exact coordinate check.

What is NOT verified: which named organ sits at which vertex/edge (HEARTWOOD, SOIL, etc.) is explicitly flagged in the source as "a felt-read... not yet either" — asserted by analogy, not derived from the math. **The geometry is verified; the identification of that geometry with the six specific organs is interpretive, not verified.**

---

## 3 · THE TETRA-BODY

Defined in `_INTAKE/TETRA_BODY_the_minimal_rigid_cell_2026-07-24.md`; the spine restates it as "six organs = six edges of the minimal rigid cell."

**STILL-HOLDS-BUT-UNCHECKED as a claim about NESI; would be a PROBLEM only if read as "checked against code."** It's an abstract structural/topological argument (four points, six connections, minimum to stand rigid in 3D) — true as graph theory. The source document itself states plainly that "the labels (poles, organ→edge mapping, Canopy placement) are held for separate marks — not settled." It has never been checked against the six organs' actual code, because four of those six don't exist as code (§1). Its own author is honest that the organ-to-vertex naming is felt-read, not derivation.

---

## Bottom line

HEARTWOOD and SOIL hold the recognition law with clean, direct code evidence — the foundation under those two is sound. The other four named organs are real gaps: documentation and spec, not yet built. The two-state model's geometry is genuinely verified math; its mapping onto the six organs is asserted. The tetra-body is a coherent, self-consistent geometric narrative that has never claimed to be more than that — and correctly says so in its own text. Nothing here contradicts what any of the three source documents already say about themselves; this pass confirms their honesty rather than exposing a hidden problem.

**What this changes for Phase 3 (the mechanism):** the KEYSTONE fork (pulse vs. board) can be marked on the strength of the verified geometry in `NESI_VE_TWELVE_ORGANS.md` — that part is real. But building the mechanism as if all six organs and their vertex-placement were equally solid would be building on documentation as if it were code. If Phase 3 needs convener/circulation-witness/continuation specifically, those are unbuilt, not just unverified.
