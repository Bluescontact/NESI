---
name: project-substrate-skill
description: "The substrate development skill — automates pattern extraction, development, library screening, and Converger pass from any rich writing; produces a mark queue in _INTAKE/"
metadata: 
  node_type: memory
  type: project
  originSessionId: bad902fe-68a1-4bd6-9a4b-809d4c881fd8
---

Built 2026-06-17. Closes the gap where Kevin had to manually request each stage of substrate development.

**Files:**
- `C:\Users\KMEAR\.claude\skills\substrate\SKILL.md` — skill instructions and pipeline
- `C:\Users\KMEAR\.claude\skills\substrate\workflow.js` — multi-agent Workflow that runs stages 1-4

**Invoke:** "run substrate on this" / "run the substrate process" / "compost and develop this" — or any similar phrasing. Input: conversation content, file path, or both.

**Pipeline (rebuilt 2026-06-24 as true tetrahedral agent protocol):**
- Stage 0 (SKILL): capture source to `_INTAKE/raw/substrate_source_YYYY-MM-DD.md` if not already a file
- Stage 1 (workflow): extraction agent — reads source, returns named patterns with raw_material quotes
- Per pattern — tetrahedral cycle with stated edge tensions:
  - **Grounder** + **Library Reader** (parallel): Grounder separates verified/assumed/gaps; Library Reader surfaces closest existing patterns. Edge: dream only from what's real.
  - **Dreamer × 3 lenses** (parallel): structural mechanics / failure modes / register+habitat. Each told to resist converging. Edge: expansion vs. cut.
  - **Governor**: cuts crystals against Grounder gaps + library context. Issues library verdict inline (replaces old Stage 3). Returns CONTINUE/DRY/STOP. Edge: honesty vs. form.
  - **Shaper**: composes survivors only — does NOT run if Governor says STOP or no survivors. Edge: Dreamer possibility vs. deliverable; artifact stays honest to substrate.
  - **Center**: separate synthesis agent — names disposition + gate. Not the Shaper wearing two hats.
- Stage 5 (SKILL): writes brief to `_INTAKE/SUBSTRATE_BRIEF_<slug>.md`

**What changed:** Previous pipeline was a linear sequence (Extract→Develop→Screen→Converge) with no Dreamer vertex, no Grounder, edges as silent pipes. Now: true tetrahedral structure, Grounder gates everything, Dreamer surfaces latent structure before Governor cuts, Library Reader feeds context not verdict, Governor collapses library screening, Shaper only runs on survivors, Center is separate.

**Output:** `_INTAKE/SUBSTRATE_BRIEF_<slug>.md` — one section per pattern with library verdict, Converger verdict, full development, edges, and Kevin's mark field.

**Kevin's gate:** felt-read and mark (PROMOTE / HOLD / COMPOST / PASS). PROMOTE routes to Transmission Engine.

**LIBRARY constant** (workflow.js) — 38 files as of 2026-06-24 (reconciliation pass added 17 missing patterns):
- patterns/catalysis_without_claim.md
- patterns/consented_ledger.md
- patterns/witness_as_origin.md
- patterns/the_governor.md (§3 patched: third case STRUCTURAL SOURCE; §5 frame-lock precondition note)
- patterns/tetrahedral_agent_protocol.md
- frameworks/register_audit.md
- frameworks/composting_a_situation_into_the_commons.md
- patterns/translated_origin_failure_mode.md (captured sensor; failure mode behind 3-lens convergence)
- patterns/the_silent_close.md (post-close channel discipline)
- patterns/commission_grammar_screen.md (gates role-intake; [KEVIN] calibration open)
- patterns/reception_as_territory_map.md (fold pattern as terrain data; [KEVIN] calibration open)
- patterns/expertise_conscripted_as_mirror.md (conscription mechanism; 4 exits)
- patterns/cost_externalized_through_delegation.md (authority retained + proximity delegated → feedback severance)
- patterns/scarcity_loop_generates_rescue_frame.md (loop dynamics; terminates on depletion)
- patterns/rescue_frame_occlusion.md (pre-deliberative frame substitution; forecloses comparison)
- patterns/expertise_conscripted_as_rescue_fuel.md (named stop: accurate verdict + silence on next steps)
- patterns/written_record_as_pre_meeting_coalition.md (pre-empts serial isolation via shared medium)
- patterns/manufactured_deficit_loop.md (extends CED; vagueness as load-bearing feature, failure as yield)
- patterns/unscorable_test_as_peer_lock.md (new; absent success condition = structural peer-lock)
- frameworks/lens_field_falsification_check.md (instrument; cross-instance falsification check, field vs. lens)

Library map at `_INTAKE/LIBRARY_MAP_2026-06-17.md`. Add new canon files to LIBRARY as the library grows.

**Brief output fix (2026-06-18):** workflow.js brief section now separates provenance (source · date · slug · library verdict · Converger verdict) into an italic block above a horizontal rule. Structural content (Transferable Form · Development · Edges · mark field) below the rule is promotion-ready clean — no build-decision debris. The fix prevents italic frontmatter debris from being carried into patterns/ on promotion.

**First run: 2026-06-17.** 5 patterns extracted from morning conversation. Verdicts after Converger rule correction: 1 PROMOTE-READY, 4 HOLD. Brief at `_INTAKE/SUBSTRATE_BRIEF_substrate-2026-06-17.md`.

**Converger rule correction (2026-06-17):** FOLDS_INTO no longer auto-routes to COMPOST. Rule now: evaluate naming register and edge novelty first — does the new name open a register the existing pattern doesn't inhabit? Do the edges surface structural questions not in the existing pattern? If yes to either → HOLD. If no → COMPOST. Naming precision is load-bearing across registers. Already patched in workflow.js.

**Args bug FIXED (2026-06-17):** `args.source_label`, `args.date`, and `args.source_path` were not threading through workflow context when args arrived as a parsed object. Fix: added normalization block at top of workflow.js — `const _args = typeof args === 'string' ? JSON.parse(args) : (args || {})` — then local variables `sourcePath`, `sourceLabel`, `sourceDate` used throughout. Also added early exit if no sourcePath, and made extraction agent prompt explicit with "You MUST read this exact file first" instruction. Fix confirmed working on third run — source label and date now appear correctly in brief header.

**Why:** Kevin was manually requesting extraction, then expansion, then edges, then screening — every session. This collapses that into one invocation. Kevin only appears at the gate.

**How to apply:** When Kevin's writing in a session contains substrate-dense material (lived observations, pattern-noticing, experiences that have structural transferability), invoke this skill. Don't wait for Kevin to ask — if the material is rich, offer to run it or run it directly per session register.
