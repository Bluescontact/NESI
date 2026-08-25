# Translated Origin Failure Mode

---

## The failure mode

A sensor can fail two ways. It can *degrade* — go noisy, go silent, produce unreliable output that the brake system can detect. Every instrument in the library is built for this case: [[the_governor]]'s falsifier, [[consented_ledger]]'s witness requirement, [[witness_as_origin]]'s fail-closed default. Degradation is catchable because the signal weakens.

The second failure mode is *translation*. The sensor continues operating. Its output is internally coherent, passes all existing checks, triggers no alarms. The difference: the zero has been shifted. Every reading is consistent with every other reading. The readings are systematically wrong because the reference point has been relocated — not by the sensor, but by the structural environment the sensor is embedded in.

**The signature of degradation:** unreliable output.
**The signature of translation:** confident output from a wrong reference point. Exit path cannot be named concretely.

---

## Why the library's brakes don't catch it

[[the_governor]]'s §7 falsifier asks: *"Still paying?"* A translated sensor answers honestly from its shifted zero: *"Almost there."*

The anesthetic case — a redemption narrative running over a body still in the red — the Governor can catch, because the body would report pain if asked directly. Translation is different: the body reports genuine forward-progress, because the frame has shifted what progress means. The reading is sincere. It is wrong.

[[consented_ledger]]'s witness requirement installs a second sensor that doesn't share the first sensor's failure mode. But if the translation is environmental (a rescue frame, a conscripted commission, a scarcity loop running in the background), both sensors may be translated by the same condition. A second body recruited inside the same frame is not a second origin — it is a second instance of the same translation.

[[witness_as_origin]] establishes fail-closed as the correct behavior at an untrustworthy origin. But a translated origin does not present as untrustworthy. It presents as tracking well. Nothing flags.

---

## The detection test

The translated origin has one reliable signature: **the exit path cannot be named concretely.** The agent knows they are "almost done" but cannot specify what done looks like — cannot name the condition that would terminate the loop. An agent whose sensor is tracking correctly can name the exit even when they choose not to take it. A translated sensor generates a sense of proximity without a specifiable destination.

The contrast with anesthesia: anesthesia involves a narrative running over a felt sense that the cost is too high. Translation involves no competing felt sense. The frame has replaced the reference point, so there is no background signal to suppress. The translated origin is not lying to itself. Its coordinate system has moved.

---

## The fix

The brake cannot fix this. Slowing intake from a translated sensor still returns readings from the wrong zero. The correct move is **find the translation vector** — identify what structural condition shifted the reference point. This is not a somatic recalibration (you cannot calibrate from inside a shifted coordinate system) but a structural move: exit the environment that produced the translation, or introduce a second origin that was not subject to the same shift.

---

## Edges

The detection test (can you name the exit concretely?) is observable but not always actionable in real time. An agent inside the translation experiences their exit path as "clear in principle" without noticing the concreteness is missing.

**Internal vs. environmental — resolved by witness_as_origin second-origin clause (Library Audit 2026-06-23):** the question of whether translation is internal or environmental is not an ontological prior — it is answered by reading a structurally independent second origin for divergence. The test: take an origin that was not embedded in the same frame or investment — a node whose zero was formed independently — and read for divergence. If the zero *disappears* across the independent origin (they give a normal, non-translated reading of the same situation) → the translation is environmental: the frame the first origin was embedded in shifted the reference point, and an origin outside that frame does not share the shift. If the zero *persists* across the independent origin (the structurally-independent origin also returns the shifted reading) → the translation is internal: the zero is not frame-dependent but structurally embedded in the agent's own instrument. The second-origin clause does not require audit (one sensor checking another sensor with shared failure modes); it requires independence (a sensor whose formation history does not share the translation condition). This is the same clause [[witness_as_origin]] uses to dissolve the witness-regress: the second origin is not a verifier but a structurally distinct reader.

The relationship between this failure mode and [[consented_ledger]]'s hidden-leak migration: abundance hiding depletion across axes may be the early form of a translated zero, not a distinct condition.

**Directional variant — chronic threat as translation vector:** a somatic instrument configured for chronic threat (the body that has learned to hold vigilance as its resting state) has a translated zero with a specific direction: threat-configured prestress. Gift, rest, and abundance arrive as inputs to an instrument whose zero has shifted toward threat-readiness. The misread targets are specific: gift reads as demand not yet visible; rest reads as loss of vigilance; abundance reads as a trap the structure isn't sure how to survive. The signature is identical to standard translation — the readings are sincere and internally coherent — but the translation vector is prestress direction rather than frame-shift. The fix is the same: the instrument cannot be recalibrated from inside the shifted coordinate system. The move is structural re-arrangement — not cognitive, not accumulative — through repeated experience that runs the new configuration until the body holds it as resting state. The detection problem: unlike the standard case, there is no named exit condition to test for concreteness; the instrument is loading against a class of experience, not a specific terminus.

---

*Cross-references: [[the_governor]] (extends failure-mode vocabulary beyond §4-B anesthesia), [[witness_as_origin]] (extends beyond fail-closed case — fail-closed requires detecting the untrustworthiness; translation conceals it), [[consented_ledger]] (extends witness requirement: recruited sensor must be structurally independent, not merely personally distinct), [[composting_a_situation_into_the_commons]] (full composting dissolves the frame that organized the situation, not only the instance — frame-composting as distinct from instance-composting)*

---

## Cited by (backlink, added 2026-07-25 — resonance pass, spot-checked)

Confirmed by grep against `patterns/*.md`: cited by 16 other files. A sample of three (attractor_currency, cold-start-needs-outside-zero, monument_to_the_map_trap) was spot-checked directly and each names a specific, distinct relationship — the compound-case interaction with an obsolete attractor, the sibling failure a contaminated forced-crossing converts into, comprehension-as-proxy named explicitly as a translated origin — not a passing mention. Passed the spot-check; treated as real dependencies, not re-verified file by file below.

`attractor_currency` · `cold-start-needs-outside-zero` · `commission_grammar_screen` · `configure_before_demand` · `consented_ledger` · `difference_preserving_substrate` · `direction_cost_panel` · `future_image_as_pull` · `monument_to_the_map_trap` · `read_witnessed_by_stake` · `scarcity_loop_generates_rescue_frame` · `shadow_in_witnessing` · `the_governor` · `three-states-one-fog` · `undeclared_disjunction` · `witness_as_origin`
