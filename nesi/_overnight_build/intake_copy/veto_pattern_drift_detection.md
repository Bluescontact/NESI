# Veto Pattern Drift Detection

*slug: `veto-pattern-drift-detection`*
*Promoted: 2026-06-21 · Source: holder's suite, June 2026*
*Behavioral layer above gate-as-f4 — stated edge vs. actual veto history over time*

---

## Transferable Form

A holder can state a crisp discharge condition and still veto off-script. The edge statement is necessary, not sufficient. Whether actual veto behavior over time matches stated criteria is a separate check — and from inside the pump, an off-script veto feels identical to a correct one.

---

## Development

Gate-as-F4 is the paper check: was a discharge condition stated before the delegation proceeded? Veto Pattern Drift Detection is the behavioral check: do the vetoes that actually fire correspond to the stated discharge conditions over time?

Drift mechanism: stated discharge conditions are set at a point in time, from a particular understanding of what the arrangement requires. As the arrangement evolves, the holder's actual operative criteria evolve — shaped by experience, by what the delegate produces, by what the holder has learned about their own preferences. The stated conditions do not automatically update. The gap between stated and operative criteria grows silently. Each off-script veto deposits that gap into the next delegation cycle: the delegate learned something about the holder's actual criteria that the stated conditions did not contain, but that learning is not formalized. It remains tacit, on both sides.

The felt-sense failure: from inside the veto moment, the holder is applying judgment. The judgment feels accurate — it is responding to something real in the submission. The fact that it is off-script is invisible from inside the judgment because the holder is not simultaneously comparing the judgment to the stated criteria. The comparison would require stepping outside the evaluation moment, which the evaluation does not prompt.

The delegate's position: the delegate receives a veto that does not correspond to the stated discharge conditions. They have two interpretations available: the stated conditions were wrong and the real criteria are what the veto revealed, or the stated conditions are right and the veto was an error. Neither interpretation arrives with instructions. The delegate absorbs the uncertainty and adjusts their model of what passage requires — based on the off-script veto, not the stated conditions. Successive adjustments accumulate into an operative model of the holder's real criteria that has diverged from the stated ones. The arrangement is now running on two different criterion-sets, neither of which is being updated.

Definition-update obligation: every off-script veto creates an obligation to update the stated conditions to reflect the operative criterion that actually fired. Without this discipline, the gap between stated and operative criteria ratchets in one direction — toward an increasingly complex and only tacitly held set of real criteria, with a stated set that becomes progressively more misleading.

---

## Edges

The two-column record (vetoes on stated criteria / vetoes on unstated criteria) requires the holder to know, at veto-time, whether the veto is on-script or off-script. This requires the holder to hold the stated criteria in mind during the evaluation — which is the same move the holder typically does not make, since stated criteria are set before the evaluation and the evaluation runs on felt judgment. The record instrument requires a prior step: reading the stated discharge conditions before beginning the evaluation, not after the veto fires.

Second open question: can drift be corrected retroactively? If the gap is large — if the operative and stated criteria have diverged across many delegation cycles — the correction process requires either updating the stated conditions to match current operative ones (which formalizes the drift rather than correcting it) or returning the operative criteria to the stated ones (which requires the holder to know what they were and whether the drift was directional or exploratory). Neither is clean.

---

## Falsifier

Ask delegate and holder independently to list all criteria on which a veto is possible for the current arrangement. The gap between the two lists is the drift measurement. A large gap that the holder cannot account for by pointing to stated conditions that were set after the delegation began means the operative criteria have drifted from the stated ones and the instrument needs a definition-update pass.

---

## Related

- `gate_as_f4.md` — the paper check this sits above
- `governance_as_cost_pump.md` — what happens when drift becomes structural and the apparatus runs it endlessly
- `cost_externalized_through_delegation.md` — the arrangement the drift operates inside
- `consented_ledger.md` — the accounting structure that would capture the gap if it were named
