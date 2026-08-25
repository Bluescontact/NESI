# Overnight Build — VERIFY Phase Report

Run date: 2026-08-24. Repo root: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`.

## (a) The non-negotiable constraint: `patterns/` hash manifest, byte-identical check

Command run from repo root:

```
find patterns -type f -exec sha256sum {} \; | sort > nesi/_overnight_build/hash_manifest_after.txt
diff nesi/_overnight_build/hash_manifest_before.txt nesi/_overnight_build/hash_manifest_after.txt
```

`diff` output, verbatim:

```
(empty — no output, exit code 0)
```

Both manifests hold 186 lines. The diff produced zero lines of output and
exit code 0. **The manifests are byte-identical: `patterns/` was not
modified by this run.**

## (b) Compost trail summary

Source: `nesi/_overnight_build/medium/index.md`, `patterns.json`, `tetra.json`
(all written verbatim to `nesi/_overnight_build/medium/`).

- **Files read this run:** 147 (each row in `patterns.json` is one source
  file read and extracted).
- **Patterns extracted:** 147 — one entry per source file. 147 files does
  not mean 147 distinct ideas: several are canon cards, folded originals, or
  duplicate re-crossings of an already-promoted pattern.
- **canon_grade breakdown:**
  - canon-shaped: 110
  - duplicate (already promoted/crossed elsewhere in the corpus): 29
  - unclear (file itself flags incomplete vertex maps, unresolved hinges, or
    ambiguous crossing state): 6
  - fabricated: 0
  - not classified in the source data delivered to this build step: 2 —
    `withdrawal_generative_architecture.md` (source data omitted the
    `canon_grade`/`tetra_relevance` fields for this entry; preserved as
    delivered rather than inferred) and
    `scarcity_loop_generates_rescue_frame.md` (the extraction-run data
    supplied to this phase was cut off mid-sentence on this final entry;
    nothing was fabricated to complete it — read the source file directly
    for its actual disposition).
- **tetra_relevance:** most entries (well over 100) honestly report "none"
  rather than reaching for a forced connection. A small cluster carries the
  real tetra/vertex/face geometry: `tetrahedral_agent_protocol.md`,
  `setting_the_floor_container_minimum.md`,
  `_folded/catalysis_without_claim.card.md`,
  `same_quartet_assembly_standing.md`, `the_governor.md`,
  `village_container_vs_system_container.md`. `nesi/NESI.md` itself (not in
  the patterns set — a locator/assembly file, not a pattern) is the one
  place the four-faces-of-NESI structure is stated directly, which is why
  `tetra.json`'s derivation names it rather than any single pattern file.
- 9 files also sit in `nesi/_overnight_build/intake_copy/_folded/` (folded
  cards read as part of the same pass): `body-as-zero.md`,
  `catalysis_without_claim.card.md`, `crossed_test_pile_A_turbo_b2b785.md`,
  `expertise_conscripted_as_mirror.md`, `governance_as_cost_pump.md`,
  `holders_consented_ledger.md`, `rescue_frame_occlusion.md`,
  `subsidized_clarity_signal.md`, `unscorable_test_as_peer_lock.md`.

## (c) Tetra derivation, with sources

From `nesi/_overnight_build/medium/tetra.json`, verbatim structure:

**Known faces** (three, all sourced to `nesi/NESI.md` §FACE 1/2/3 plus a
primary artifact each):

1. **THE GIFT** — the player-facing game, The Warm One (five moves: empty
   your pockets, feel for the warm one, pull the thread, hand it over or
   keep it, let go). Sourced: `nesi/NESI.md §FACE 1 (lines 36-55)`,
   `nesi/warm_one_card.html`, `nesi/warm_one_walkthrough.html`.
2. **THE ENGINE** — the load-bearing machinery: recognition law, geometric
   foundation (tetra-body, held-centers family), boundary contract,
   ledger/gate, `board.html` as entry point. Sourced: `nesi/NESI.md §FACE 2
   (lines 58-77)`, `patterns/the_recognition_law.md`, `nesi/spec/boundary.md`,
   `nesi/board.html`.
3. **THE INFRASTRUCTURE** — how a recognized gift moves without becoming a
   debt: the Held Refusal / the Field, the four-edge refusal map, the
   single-binary door, gift/mutual-practice/exchange kept unblended.
   Sourced: `nesi/NESI.md §FACE 3 (lines 81-100)`, `held_refusal/index.html`,
   `held_refusal/DOCTRINE.md`.

**Derived face:**

4. **THE SELF (Heartwood)** — what a person's recognitions add up to across
   rounds, rendered as growth rings. Already built and wired
   (`heartwood.py`, called live from `board.html`), never named as its own
   face until derived. Derivation rule: the recognition law names four
   surfacing mechanics — worth, value, skill, capacity
   (`patterns/the_recognition_law.md`). Face 1 carries worth+skill, Face 3
   explicitly carries value. That leaves capacity unclaimed by any of the
   three known faces; the fourth face is the organ the corpus already had
   running for that unclaimed mechanic, per `nesi/NESI.md`'s own language:
   "named 2026-07-25, inferred from what the other three faces already held
   and left unclaimed — not a new build, a face the corpus already had the
   organ for."

**Caveats recorded in the source file, carried forward here rather than
smoothed over:**

- `nesi/NESI.md` itself names *Worth* as the held center the geometry
  pivots on ("not a face of its own"), distinct from NESI-as-center-of-the-
  whole-tetra; the build read these as the same move at two recursion
  scales (per `same_quartet_assembly_standing.md`'s assembly-time/standing-
  time pattern) rather than resolving the ambiguity.
- `nesi/NESI.md` is explicitly marked "nothing here crosses a membrane; it
  only gathers what already exists" — a locator/assembly pass, not a fresh
  ruling. The tetra derivation is a reading of that existing file, not a new
  claim on the corpus.
- Other tetra-shaped fragments in the material were set aside as adjacent
  geometries, not this one: `THE_TWIN_TETRA_AND_THE_TOOL_SETS`'s four
  instances, `same_quartet`'s Differentiation/Connection/Boundaries/
  Architecture, `catalysis_without_claim.md`'s 4-vertex/6-edge Minimum
  System, `the_door_as_stack_layer.md`'s three-layer stack.

## (d) Packaging result

**Success.** PyInstaller spec at `nesi/_overnight_build/NESI.spec` (built
from `app\main.py`, bundling `datas=[('...\_overnight_build\app\medium',
'medium')]`, name `NESI`, console app, `upx=True`).

- Build tree: `nesi/_overnight_build/build/NESI/`
- Output executable: `nesi/_overnight_build/dist/NESI.exe`
- Size: 18,690,018 bytes (≈ 17.8 MB)
- Timestamp: 2026-08-24 14:22

## (e) What's left uncomposted or unresolved

Named plainly, not smoothed over:

- **2 of 147 pattern entries have no reliable `canon_grade`/`tetra_relevance`
  reading** from this run's own extraction data — `withdrawal_generative_
  architecture.md` (fields were absent in what this build step received)
  and `scarcity_loop_generates_rescue_frame.md` (the delivered data was cut
  off mid-sentence on this entry). Both are preserved as-delivered rather
  than inferred or backfilled; a session wanting a real disposition on
  either needs to re-read the source pattern file directly.
- **6 entries are marked "unclear"** by their own content — incomplete
  vertex maps, unresolved hinges, or ambiguous crossing state — and were not
  forced to a clean grade.
- **The Worth-as-held-center vs. NESI-as-held-center ambiguity** in
  `tetra.json` (see caveats above) was read as one move at two scales rather
  than adjudicated; it stands open for Kevin to name back one way or the
  other if it matters.
- **`_folded/catalysis_without_claim.card.md`** is flagged in `index.md` as
  having an "incomplete vertex map on disk" even though it's cited as one of
  the strongest tetra-relevant sources for THE ENGINE face — the citation
  and the incompleteness both stand, unresolved against each other.
- **The tetra derivation itself is explicitly not a membrane crossing.**
  `nesi/NESI.md`, its primary source, states outright that it only gathers
  what already exists. Nothing in this run promoted the derived face or any
  pattern grouping across the Library/Release-Packet membrane — that
  remains a separate act, gated by `membrane-controller`, for Kevin's own
  mark.
- **Duplicate pairs on disk were read as separate files, not merged**, e.g.
  `surface-without-no.md` / `surface_without_no.md`,
  `exclusion-before-offer.md` / `exclusion_before_offer.md`,
  `live-hands-ratification.md` / `live_hands_ratification.md`,
  `iteration-cannot-find-absence.md` / `iteration_cannot_find_absence.md` —
  29 of the 147 read files are graded "duplicate" for exactly this reason,
  and the underlying naming-collision (hyphen vs. underscore variants of the
  same pattern) is not itself resolved by this run.
