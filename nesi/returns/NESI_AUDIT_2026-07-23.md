# NESI AUDIT — DEPENDENCIES · COSTS · AUTHORITIES · GIFT CONDITIONS · GENERATIVE STRUCTURES

**Run 2026-07-23 on Kevin's mark ("yes — all three"). Local reads only. Marks nothing, crosses nothing.**
Grounded in the running code + the 103-pattern canon, not the vision.

---

## PART 1 — DEPENDENCIES · COSTS · AUTHORITIES

### A · Dependencies (what NESI actually leans on)

| Dependency | Kind | Status / risk |
|---|---|---|
| **Ollama daemon + `hermes3:8b`** | HARD runtime (new tonight) | The engine. If Ollama isn't running, `articulate()` falls back to a dark Candidate LOUDLY — no silent fake. NESI now genuinely depends on Ollama for real metabolize/chat. |
| **venv python + pywebview** | HARD (the surface app) | `surface_app.py` needs the ambient hermes-venv python (has `webview`). tkinter 9-tab app is separate/older. |
| **codex_index / chromadb** | MEDIUM | the lint AND the sanction manifest (`index_manifest.json`) that `guard_audit` reads. If absent, lint skips gracefully; the guard leans on the sanction log instead. |
| **claude-cli (dark)** | OPTIONAL | a quality-upgrade engine, login-gated, unused. Zero cost while dark. |
| **vendor Claude Code harness** | EXTERNAL | powers the *chat session* (this conversation) via desktop-app host auth. NESI-the-organism does not depend on it; Kevin's steering conversation does. |
| **OneDrive** | ENVIRONMENT | the whole tree lives under OneDrive — a sync-conflict/relocation risk (relocation was held post-Rosebud). |
| cloud / login / API | **NONE** | the core loop reaches no network beyond localhost. This is the non-transactional/local-first stance, honored in code. |

**Headline:** NESI's hard dependencies are now **all local** (Ollama, python, disk). The only external is the *conversation* harness, not the machine. Aligns with the gift/near-zero-burn stance.

### B · Costs

- **Runtime:** near-zero — local model on Kevin's electricity (~30 kWh/mo class). No per-token, no subscription needed for the base function.
- **Money paths deliberately avoided:** API key (per-token) and programmatic-subscription both refused. The engine is free-local.
- **The real cost is Kevin's attention** — the scarce resource the whole system exists to protect. Every widget/decision spends it.
- **Build cost:** exe/app rebuilds spend the AI's tokens, not Kevin's money.

### C · Authorities (who/what can write canon, who decides)

**The strong part — a real fail-closed integrity floor, confirmed in code:**
- `canon_write(fname, text, via)` is declared **THE ONLY sanctioned way to write a canon file** — it records each write's sha to `MARKS/canon_sanction.jsonl`.
- `guard_audit()` fails **CLOSED**: every `patterns/*.md` must trace to a sanctioned sha (codex manifest or sanction log); anything else is an **off-path write** and the cross path refuses to build on a canon it can't vouch for.
- `record_mark(sid,"cross")` runs that guard *before* promoting — refuses to cross if any off-path write exists.
- Only **`cross`** promotes to canon; `uncross` moves to `_folded/` (subtraction law, never hard-delete).
- **Kevin's mark is the sole cross authority.** No auto-cross anywhere.
- **The new `surface_bridge.mark` exposes only keep/hold/compost — NOT cross.** So the whole new face is gate-safe: it cannot write canon. Good.

**The "one real hole" — RETRACTED 2026-07-23 (I over-called it; corrected here).**
My first read flagged `deepdive.save_pattern_section`'s raw `path.write_text` as an off-path canon write. **That was wrong.** Reading the full function: when the target is **canon**, it **returns early and refuses the edit loudly** ("canon is immutable in place — this version is frozen"; the "R2 close," 2026-07-22, names the lawful path = spawn a descendant + re-cross). The raw `write_text` runs **only for folded files** (`patterns/_folded/`), which are not canon and not checked by `guard_audit`. **Verification this audit:** `core.guard_audit()` → `{clean: true, checked: 103, offpath: 0}`. **There is no breach; nothing to fix.** The authority floor is intact: one sanctioned chokepoint, a fail-closed guard, canon immutable-in-place, and the only lawful change is descendant→re-cross. Lesson kept: read the whole function before naming a breach.

**The "Membrane Controller" reconciliation:** it is a *chat-side skill*, never imported by the conductor. The real, running authority is `canon_write` + `guard_audit` + the cross-guard. The charter is documentation; the code is the mechanism. They should be named as one so no one mistakes the skill for the enforcement.

---

## PART 2 — OPEN CONDITIONS FOR GIFT / NON-TRANSACTIONAL OPERATION

The stack is **NESI (private-first) → the gift door → the receiver.** What's unmet:

1. **The public door is not rebuilt.** OSG was retracted 2026-07-15. Per the 2026-07-20 ratification, the gift library was re-conceived as **Google Drive/Docs, per-item crossings at Kevin's gate** — but that Drive door is a *decision*, not a built, inhabitable surface. **The gift currently has no face a stranger can arrive at.**
2. **The receiving side is an open circuit.** NESI's *giving* infrastructure is complete; the *receiving* form is still in `_INTAKE` (per `project_kevins_circuit_complete`). A gift with no receiving aperture doesn't complete.
3. **The two-person Workbench hangs on M3** (should NESI host a second person at all?). The Regather found identity, sealed-interior, and a served surface **all "do not exist yet."** Until M3 resolves, the whole two-sovereign gift-exchange is un-instantiated.
4. **The gift-lifecycle (offer → fork → absorb → compost) is named, not built.** The passage that "can't be stored" has no code.
5. **`non_transactional_mechanism` composted twice** for lack of a real instance. The **gift-shaped-boundary** pattern (landed 2026-07-23) is un-screened — the sharpest fresh material for a third pass.
6. **NESI Prime / tiering** (the one place a transaction was ever named — subscription unlocks persistent memory + prime-sharing) sits un-built beside the free core. The free gift-tier does the real work; the transaction layer is deferred, not designed.

**The load-bearing unmet condition:** there is no **built surface where a gift is received by someone who is not Kevin.** Everything else (lifecycle, tiering, second-node) hangs off that one absence.

---

## PART 3 — STRUCTURES FROM COMBINING THE SHAPES OF CANON PATTERNS

Five composites where the shapes genuinely interlock (one's output is another's input, or they share an edge). Each names what it would do, the source patterns, its falsifier, and which open problem it closes. **Proposals only — none crosses.**

### ① THE RECEIVED-GIFT CIRCUIT — the missing half of the gift
**Combine:** `boundary_ask` (a gift is legible only where the receiver's no functions) + `exclusion_before_offer` (the no precedes the offer) + `receiving_infrastructure_precedes_exit` (witnessed refusal as receiving aperture) + `metabolic_lag_on_complete_giving`.
**Structure:** a receiving organ that only registers a gift as *received* when the receiver's functioning **no**, a receiving aperture, and a metabolic lag are all present. Completes the circuit NESI's giving side has been waiting on (Part 2 #2).
**Falsifier:** if a gift can complete with the receiver's no absent or non-functional, the circuit is decorative.

### ② THE TWO-SOVEREIGN MEMBRANE — the shape M3 has been missing
**Combine:** `second_node_changes_topology` (recognition without residence) + `floor_that_holds_a_stranger_without_extraction` + `structural_incapacity_over_prohibition` (gift frame by can't-not-won't) + `distributed_veto_architecture`.
**Structure:** the architecture for a second person entering the Workbench **without residence** (no account/identity axis needed), held by a floor that can't extract them, each side carrying an independent veto. Directly addresses M3 + the "identity does not exist" finding — by showing recognition may not *require* the identity axis R1 assumed.
**Falsifier:** if the second node must *reside* (persistent identity) to be recognized, the recognition-without-residence claim breaks and the topology collapses back to scale.

### ③ THE SELF-DELETING KEEPER — NESI's own exit
**Combine:** `deletable_keystone_test` + `inhabitable_without_author` + `keystone_held_by_least_authority` + `relationship_aimed_at_dissolution`.
**Structure:** NESI designed so that its keeper (Kevin) is removable without collapse — the succession/exit shape. The keeper holds the *least* authority needed; the place stays inhabitable without its author; the whole relationship aims at its own dissolution. Answers "what is NESI when Kevin is gone / must not be indispensable."
**Falsifier:** if removing the keystone collapses the structure, it's a monument, not a keeper (this is literally the deletable-keystone test applied to NESI itself).

### ④ THE ABSENCE INSTRUMENT — the organ NESI structurally lacks
**Combine:** `iteration_cannot_find_absence` (absence has no error coordinate) + `gap-persistence-not-presence` + `naming_the_invisible_brace` + `proximity_instrument_horizon`.
**Structure:** an organ that detects what is **missing** — which the metabolizer and lint cannot, by construction (they only process what's present). It tracks gap *persistence*, names invisible braces, and knows its own horizon. This is the "completeness critic" the whole system is blind without.
**Falsifier:** if it only re-surfaces present-but-unmarked items rather than true absences, it isn't an absence instrument — it's just another presence reader.

### ⑤ THE RENDER-DOOR — the public face, derived from canon
**Combine:** `render_without_canonizing` (rendering is a function, canonization is an act) + `the_door_as_stack_layer` (the membrane is its own layer: NESI → DOOR → face) + `anatomy_is_not_the_cockpit` + `externalize-container-not-verdict`.
**Structure:** the missing public door (Part 2 #1) built from canon: a layer that renders the library **outward** to a stranger without canonizing or deciding for them — container externalized, verdict kept inside. This is the OSG-replacement shape, and it's already latent in the patterns.
**Falsifier:** if the door must make a verdict to render anything, the render/canonize split failed and it's a cockpit, not a door.

**Honest confidence note:** ①②④⑤ are high-confidence (the shapes interlock cleanly and each closes a named open problem). ③ is medium (it's more a re-application of one pattern to NESI-itself than a true composite) — kept because it answers a real question, flagged as the softest.

---

## THE RIPE FEW (sharpest actionable)
1. ~~Fix the deepdive off-path canon write~~ — **RETRACTED: no breach; guard_audit clean (103/0). The authority floor is intact.**
2. **Name the load-bearing gift gap:** there is no built surface where a non-Kevin receives. Everything hangs off it.
3. **Develop candidates from Part 3** — ① Received-Gift Circuit and ⑤ Render-Door most directly close Part 2's gaps and are canon-derived (substrate-ready, each with a falsifier).
4. **Reconcile the Membrane-Controller charter with the code guard** — one authority, named once.

*Audit complete. Nothing marked, nothing crossed.*
