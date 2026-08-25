# Diagnose by Source, Not by Presence

*slug: `source-check-before-giving`*
*Promoted: 2026-07-14 · Source: Substack deletion, batch 1 (15 articles, Jan–Jul 2026)*
*Promoted as the general form. The extraction's naming of the three source-states ("overflow/depletion/performance") was fabricated, not sourced, and was cut at the crossing — the states are explicitly unnamed here. Naming them is a separate, unfinished act.*

---

## Transferable Form

When several distinct internal states can all produce the same visible output, the output stops being usable evidence for which state produced it — the check has to move upstream, off the artifact and onto the source, run first-person, and run continuously rather than at any single decision point. Anywhere "it's still happening" is being read as "it's still healthy," this pattern names the gap between those two claims.

---

## Development

Mechanism: several distinct internal states converge on one observable (giving). A many-to-one mapping from state to behavior means the behavior carries zero bits about which state produced it — not a weak signal, no signal. The fix cannot be a better output-taxonomy (finer-grained readings of the giving itself); it has to leave the output layer and instrument the source directly, via a first-person question run at the point of origin: where is this coming from.

Inversion this produces: the normal fault-detection loop (bad state → degraded output → notice → correct) is disabled, because output degrades in none of the cases. The system can run indefinitely on a compromised source while its most visible output looks fine or improves. Sustained giving, ordinarily read as evidence of health, becomes structurally ambiguous — it's what a well-functioning bad state also looks like.

Three failure modes intrinsic to the fix, not external to it:
1. **Instrument-suspect identity.** The check (self-perception of source) is made of the same material as the thing checked (the giver's internal state). A compromised state can produce a false, confident "this is healthy" readout along with the giving — the diagnostic is weakest exactly where most needed, and without an external witness it can collapse into pure self-report with no error-correction of its own.
2. **Scope lock.** Because output is identical across states, only the first-person holder of the state has any access to source. No recipient, collaborator, or governance layer can run this check from outside — any external system that infers source from observed giving is not using this pattern, it's fabricating a reading the artifact cannot support.
3. **Purity assumption.** The check presupposes a clean single-state answer, but sourcing may be blended — several states simultaneously. Run against a blended case, the check returns false precision: a dominant-flavor read mistaken for a clean verdict, unless a contamination threshold or an explicit "dominant only" caveat is attached.

Structural cost: running the check itself is not free. Layered onto every act of giving, especially for a high-throughput reflexive giver, the mandatory pre-check can become its own compulsive ritual — indistinguishable from the hypervigilant state it exists to screen for. The diagnostic can manufacture the pathology one level up from the one it targets.

Temporal register: this pattern has no gate-worthy event. Existing brake architectures (clock-gated, session-boundary-gated, named-drift-gated) all fire at a boundary; this one has no boundary to hang on — it either runs at every instance giving is about to leave, or doesn't run. Consequently a single instance can't be diagnosed by its outcome at all; only a trace across repeated instances (is the check happening reflexively, sporadically, never) shows which state is dominant. The natural artifact for this pattern is a ledger accumulating history, not a one-shot decision card resolved input-by-input.

---

## Edges

The source-states this pattern diagnoses between are named nowhere in the verified material — the pattern is a general form (N states, one convergent output) without content. Naming the states is a separate, unfinished act; anything that names them is an addition, not a recovery.

Unresolved: whether the checker-shares-the-suspect's-state failure mode forces this pattern to depend on an already-trustworthy felt-read mechanism elsewhere in the system — in which case it isn't independent, it's a special case of a prior instrument.

Unresolved: no threshold rule for blended sourcing — how much contamination disqualifies a dominant-source read is left open, and without one the pattern risks the same false-confidence failure it warns against.

Unresolved: no design yet for a checkless, continuous, per-instance instrument that doesn't become either constant overhead or a ledger nobody consults until after the fact. "History, not instance, carries the signal" points toward a ledger-shaped instrument but does not specify one.

Open tension the pattern surfaces but doesn't settle: sustained, healthy-looking giving is compatible with a compromised source running smoothly — this makes "it's still happening and looks fine" structurally weak evidence anywhere convergent output applies, which is uncomfortable and currently unmitigated.

---

## Falsifier

Find one case where two genuinely distinct internal states produce reliably distinguishable giving — where a recipient or observer, blind to the giver's self-report, can sort the outputs by source better than chance. If output does carry source information, the many-to-one premise fails and the check belongs at the output layer after all. Conversely, if the first-person source-check is observed returning confident "healthy" reads during a period later recognized as compromised, that is failure mode 1 confirmed — the pattern's own warning, not its refutation.

---

## Related

- `pressure_masquerade_detection.md` — the sibling mechanism: surface-identical outputs disqualified by category-of-origin, not magnitude; this pattern is its giving-domain, first-person, continuous-register counterpart
- `witness_as_origin.md` — the felt-read instrument the source-check may depend on (see Edges)
- `the_governor.md` — boundary-gated brake architecture this pattern explicitly cannot use
