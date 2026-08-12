---
name: diamond
description: Run the twelve-lens pass as a double-diamond — twelve parallel lens readings over one piece of material, independent verification of each reading against the material, then synthesis back to one receiver document. Readings only, never verdicts; every output is a proposal for Kevin's re-placement. Triggers — "run the diamond", "twelve-lens pass on this", "turn the mirrors on this". Input — a file path or pasted material.
manifest:
  do: twelve parallel lens agents read the material, twelve verifiers check each reading is grounded in the material (not manufactured), one synthesis agent gathers to a single receiver document in _INTAKE/
  touches: reads nesi/mind/TWELVE_LENSES (canonical) + the target material; writes one file to _INTAKE/ only — no canon, no gate, no membrane
  size: heavy — ~25 agents, frontier-model run; this is Deep Review territory by the router's own table (condition: none — but token-heavy, so pre-flight applies)
---

# THE DIAMOND — the twelve-lens pass, double-diamond form

**Provenance:** Kevin's mark 2026-07-30T18:32 ("Automate the diamond: build the twelve-lens pass as a double-diamond in Claude Code — parallel lenses, independent verification, synthesis."), caught in `MARKS_LOG.jsonl` before this was built. Shape named from the heliostat: twelve mirrors turned in parallel, one receiver, back to sequential. The hand that was on each mirror is now on the receiver document instead — every lens reading arrives labeled as a reading, and Kevin re-places or discards each one.

**Lens source (single authority):** `_INTAKE/TWELVE_LENSES_PROPOSAL_2026-07-29.md` — status PROPOSAL, awaiting Kevin's felt-read. The diamond reads the lenses from that file at run time; it never carries its own copy (derive, don't store). If the lenses move or get ratified elsewhere, update the path here, nothing else.

## Pre-flight

This is a heavy operation. Render the manifest frontmatter above as the pre-flight strip and stop; Kevin's next message is the consent. No auto-execution.

## The run — three phases, one Workflow call

Invoke the Workflow tool with this structure (adapt paths; the shape is fixed):

**Phase 1 — TWELVE MIRRORS (parallel).** One agent per lens. Each agent receives: (a) that lens's full section from the lens file — THE TURN, THE FORM, WHAT IT CATCHES, THE ORDER if present, the FALSIFIER, WHAT IT DOES NOT HOLD; (b) the target material in full. Each agent returns a structured reading: `{lens, reading, what_it_caught: [...], grounded_in: [verbatim quotes from the material], nothing_found: bool}`. An honest `nothing_found: true` is a valid and expected output — a lens that catches nothing must say so, never manufacture a catch.

**Phase 2 — INDEPENDENT VERIFICATION (pipeline, per reading).** One verifier per lens reading, blind to the other eleven. The verifier receives only the material and that one reading, prompted to REFUTE: is each claimed catch actually present in the material, or did the instrument manufacture it (Lens 1's own law, applied to the run itself)? Verdict per catch: `grounded` / `manufactured`. Manufactured catches are struck, not softened.

**Phase 3 — SYNTHESIS (one agent, sequential).** Gathers the twelve verified readings into ONE receiver document written to `_INTAKE/DIAMOND_<target>_<date>.md`. Format: the material named at top · per-lens sections in lens order, each carrying its verified catches with their verbatim ground · a final section listing which lenses returned nothing (the silence is data) · header line: **"Every line below is a reading, not a verdict. Kevin re-places each one."**

Pipeline phases 1→2 (no barrier — each reading verifies as soon as it lands); barrier before phase 3 (synthesis genuinely needs all twelve).

## Hard limits

- **The machine never marks.** No reading, verification, or synthesis line may state a conclusion about what Kevin should do, promote, drop, or feel. Catches are located, never adjudicated.
- **No line may direct Kevin's body** — Lens 3 readings report what the material says about strain; they never prescribe rest, food, or pacing.
- **Output lands in `_INTAKE/` only.** The diamond never writes to `patterns/`, the gate, or the membrane. Crossing anything it produces is a separate act with its own gate.
- **The lens file's own status travels with the output:** while the lenses are PROPOSAL, every diamond output says so at the top.

## Definition-of-Done edge (named per canon)

Built 2026-07-30. Mechanism smoke-tested same session: a reduced 2-lens run (Lens 1 + Lens 4, small sample material) executed through the Workflow harness end-to-end — parallel readings, verification, synthesis file written and read back. **Not yet run at full twelve-lens scale on real material** — that first full run needs a target Kevin names, and is a fresh pre-flight each time.
