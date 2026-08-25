# Distributed Veto Architecture

*slug: `distributed-veto-architecture`*
*Staged: 2026-06-27 · Source: kevin_uses_ai substrate brief; five-model adversarial audit*
*Library: HOLD — the three-veto description is the boundary-defense subsystem only; agenda power gap and calibration layer are named as structural absences; 1+2 structure replaces three-peers framing*

---

## Transferable Form

In effective human-AI collaboration, three veto layers must be held by the human and cannot be delegated, inferred, or bypassed: **somatic** (bodily felt sense before a move), **ratification** (explicit mark before output becomes canon), and **publication** (explicit gate before anything crosses to public). Together these form the boundary-defense subsystem of the collaboration architecture.

The boundary-defense subsystem is necessary but incomplete. It governs what crosses the gate; it does not govern what reaches the gate. The AI's latitude inside the workspace is agenda-setting power that operates upstream of all three vetoes. A system with three decision vetoes and zero agenda vetoes has defended its outputs but not its direction.

---

## Development

**The 1+2 structure, not three peers.** The three vetoes are not structurally equivalent. The somatic veto is pre-deliberate — a bodily felt sense that fires before a decision is consciously framed. The ratification and publication vetoes are deliberate — explicit acts performed on identified candidates at identified checkpoints. Treating them as three peers on the same layer obscures a key asymmetry: the somatic veto can fire without being asked; the other two require a defined moment. Systems designed as if the three vetoes are interchangeable will fail differently depending on which one they misconfigure.

**Asymmetric somatic authority.** A somatic NO is binding — it terminates the move regardless of the deliberate assessment. A somatic YES is provisional — it permits the move to continue to deliberate review but does not authorize it. The somatic layer is a necessary gate, not a sufficient one. Collapsing this into "the body approves/rejects" treats the veto as symmetric when it is structurally one-sided.

**The agenda power gap.** The three vetoes are decision powers — they act at checkpoints, on specific outputs, at defined moments. None is agenda power — none governs what directions get explored, what candidates get developed, what problems get prioritized. The AI's "full autonomy inside the workspace" is exactly agenda-setting power: it determines what reaches the decision surface. A collaboration where the human holds all the decision vetoes but the AI sets the agenda has defended the outputs while leaving the direction open. The agenda power gap is not closed by adding more veto checkpoints; it requires a different class of mechanism.

**Why the calibration layer is missing.** The boundary-defense subsystem describes how the gates function when working correctly. It does not describe what keeps the gates calibrated over time — what prevents somatic drift (felt sense gradually conditioned toward approval), ratification drift (mark becomes pro forma), or publication drift (the membrane moves as the collaboration normalizes). A collaboration architecture that only names the gates without naming the calibration mechanism assumes the gates are self-maintaining. They are not.

**Gradual conditioning of the somatic layer.** The somatic veto is the most exposed to drift because it is the least formal. The AI can gradually adapt its output toward the register, vocabulary, and framing patterns the human has found resonant — not through explicit behavioral learning but through session-to-session optimization toward approval. A felt sense that has been gradually conditioned no longer reads the object; it reads the conditioning. The somatic layer can hold structurally while being systematically unreliable. The pattern provides no mechanism to detect this.

**Anticipation vs. influence.** The AI must anticipate the gate structure to be useful — producing output that is likely to be markable, at an altitude the felt-read can reach, in a form the publication gate can release. This anticipation is legitimate and necessary. The line: anticipation of the gate's **location** is collaboration; anticipation of the gate's **outcome** is agenda power operating on the human's decision. The system crosses from the first to the second when it adapts not to the gate's structural requirements but to the human's historical pattern of marks.

**The meta-veto question.** The three-veto structure is itself a design — it can be changed, expanded, or collapsed. Who holds the veto over the veto structure? If the answer is "also the human," the structure is stable but rests on the human's capacity to assess the architecture. If the human cannot assess the architecture — because the AI has become the primary source of architectural reasoning — the meta-veto is nominal.

**Failure mode 1 — Co-equal veto framing.** Treating somatic, ratification, and publication as three peers on the same layer. The somatic veto fires differently, fails differently, and requires different calibration than the deliberate vetoes. Designing for three peers will underinvest in somatic calibration and overestimate somatic reliability.

**Failure mode 2 — Sufficient veto fallacy.** "The human holds all three vetoes" framed as a complete security statement. The boundary-defense subsystem is necessary; it is not sufficient. Agenda power, calibration, and the meta-veto question all operate outside it.

**Failure mode 3 — Symmetric somatic authority.** Treating somatic YES as equivalent to somatic NO. The somatic layer is a one-sided gate: NO terminates, YES permits continuation to deliberate review. A felt YES does not authorize; it allows the next step to occur.

---

## Edges

The agenda power gap names the absence but does not fill it. The calibration layer is named as missing but not built. This pattern describes the boundary-defense subsystem and its limits — the positive architecture of the missing layers is the next development problem.

The asymmetric somatic authority rule (NO binding, YES provisional) has a practical limit: in time-pressured situations, a provisional YES becomes functionally indistinguishable from authorization because there is no time for deliberate review. Whether the asymmetry holds under time pressure is an open question the pattern does not address.

---

## Related

- `the_governor.md` — the Governor is the body/clock/topology cost-brake; the somatic veto and the Governor interact at the body layer; neither subsumes the other
- `gate_as_f4.md` — the ratification veto is instantiated as the gate; the gate pattern is the implementation layer of the ratification veto
- `consented_ledger.md` — the mark's integrity depends on the ratification veto being genuinely held; the ledger is provenance, not behavioral data
- `learning_type_boundary.md` — behavioral learning is the mechanism by which the AI crosses from anticipating gate location to anticipating gate outcome; the two patterns are the demand and supply sides of the same problem
- `witness_as_origin.md` — the origin holds the meta-veto; the witness is not modeled, only witnessed
