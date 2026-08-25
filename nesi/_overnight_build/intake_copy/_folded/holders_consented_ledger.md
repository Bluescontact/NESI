# Holder's Consented Ledger

*slug: `holders-consented-ledger`*
*Promoted: 2026-06-21 · Source: holder's suite, June 2026*
*New architecture — not an extension of the existing consented_ledger; cross-body accounting*

---

## Transferable Form

The existing Consented Ledger assumes cost and sensor share a substrate. The holder's position breaks that assumption before the instrument opens: cost lands in the delegate's body; the holder's sensor reads the holder's decision-structure accurately and cannot access the cost it generated. The Holder's Consented Ledger is a three-column instrument for accounting across two bodies, with the delegate as required confirming party for Column 1.

---

## Development

The single-body consented_ledger works because the agent bearing the cost is also the agent running the instrument. Cost and sensor co-locate. The felt-gate reads what the body generates. The witness requirement (a second body that does not share the first sensor's failure mode) closes the ledger against the cases where the first body's sensor is compromised.

The holder's position breaks this architecture at the first column. The holder generates cost by retaining authority, making decisions, issuing vetoes — but the cost of those moves lands in the delegate's body, not the holder's. The holder's somatic instrument is accurate: it reads the holder's decision-structure correctly. It returns clarity, confidence, appropriate judgment. It does not return the cost the decision generated in a different substrate, because that cost never arrived in the holder's sensor's range.

Three-column structure:

**Column 1 — Cost generated and named:** The cost the holder has generated in the delegate's operating environment through decisions, vetoes, retained authority, undischarged definitions, and governance load. This column cannot be filled by the holder alone. The holder's interior does not contain the relevant data. Column 1 filled unilaterally is self-assessment wearing ledger structure. The delegate is the only body that can confirm whether Column 1 entries are accurate — and whether entries the holder believes are missing are in fact present.

**Column 2 — Definition obligations outstanding:** Every retained veto without a stated discharge condition is an obligation in this column. Every undischarged completion condition. Every provisional definition whose return date has passed. This column can be populated by the holder, but its accuracy requires the gate-as-F4 discipline: the holder must know which vetoes they hold and what definition each requires.

**Column 3 — Delegation gaps consented to:** The costs the holder cannot account for but has not acted to close — the gaps the holder has chosen (or defaulted) to leave open. Named and consented to, these are structural features of the arrangement. Unnamed, they are hidden leaks. This column converts hidden leaks into disclosed costs.

The witness requirement is inverted from the single-body ledger. In the single-body ledger, the witness is a second sensor for the agent's own body. In the Holder's Consented Ledger, the witness is the delegate — the only body with access to the relevant cost signal. The witness is not confirming the holder's read; the witness is supplying the data the holder's sensor cannot access. This structural inversion means the instrument cannot run without the delegate's participation, and the conditions for that participation must be installed in the arrangement itself before the ledger can open.

---

## Edges

The delegate as required confirming party for Column 1 creates a structural dependency: the ledger cannot open in arrangements where the delegate cannot safely participate. If the delegate's cost-reporting is structurally unsafe — if honest Column 1 confirmation would alter the arrangement in ways the delegate cannot afford — the instrument is inert. The conditions for safe delegate participation are named in the Delegate's Side of Bridge architectural document (June 2026, not promoted): pre-specified insulation, pre-disclosed falsifier, external feedback mechanism. These must precede the ledger, not follow from it.

The cascade problem: the delegate's confirmation is not neutral. The delegate's own cost-body is doing the sensing — which means Column 1 is populated by a body that is itself inside the arrangement, with its own costs, its own protective moves, its own uncertainty about what the holder will receive well. The delegate's report is the best available data; it is not uncontaminated data. The ledger names this gap but cannot close it from within the instrument.

Third limit: this instrument does not solve the separated cost-sensor problem — it names it and builds a cross-body accounting structure around the named gap. Cost and sensor remain in different bodies. The instrument makes the gap legible and accountable without eliminating it.

---

## Falsifier

The Column 1 check: can the holder produce a Column 1 that the delegate would confirm as accurate and complete — without the delegate having to add significant entries the holder hadn't named? The gap between the holder's Column 1 draft and the delegate's confirmed version is the structural measurement of how much cost is being generated invisibly. A large gap does not indicate dishonesty; it indicates that the arrangement is producing more cost than the holder's instrument can see.

---

## Related

- `consented_ledger.md` — the single-body architecture this extends (not mirrors) into a two-body context
- `cost_externalized_through_delegation.md` — the structural source of the separated cost-sensor
- `subsidized_clarity_signal.md` — what the holder sees instead of the costs Column 1 would name
- `gate_as_f4.md` — the instrument for Column 2 (definition obligations)
- `non_inquiry_as_felt_virtue.md` — the somatic mechanism that keeps Column 1 invisible
