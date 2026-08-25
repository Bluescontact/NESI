# Layout as State Encoding

*slug: `layout_as_state_encoding`*
*Status: CANON — Promoted 2026-07-01 · Kevin's membrane mark*
*Source: _INTAKE/nanobot_workshop_spec_2026-07-01.md*
*Register: operator-facing / infrastructure*

---

## Transferable Form

Interface design that encodes current state in layout, labels, and button configuration eliminates the class of cognitive work where the user must discover orientation before doing real work.

A tool that requires the user to orient before it yields material has placed the orientation burden in the wrong location. The tool should arrive pre-oriented to the user's state — material first, routing inline, urgency visible in layout, labels carrying live state, and process phase encoded in button configuration. The user's first act should be a substantive move, not a navigation act.

---

## Development

State encoding operates across five independent surfaces. Each is a separate design decision; all five must be present for the pattern to hold.

**Material position.** The substantive object the user needs to act on — a prompt, a queue item, a result, a text block — must appear before any framing, label, or description of it. If the user must navigate to find the material, the interface has placed a discovery task before the substantive task. Material-first is not about visual hierarchy in the aesthetic sense; it is about cognitive sequence. The user's first perception should be the thing, not a description of where the thing is.

**Inline routing.** Every output item carries its own routing action. The result and its destination are not separated into view and staging step. A result that requires the user to remember where it goes and act on it in a different context has broken the routing enclosure — the item now depends on working memory to complete its path. Inline routing closes each item at the moment of output.

**Urgency as layout weight.** The decision surface — what requires action now versus what is held or complete — is encoded in visual weight and position, not in labels alone. A user who has to read every item to find the urgent ones is being asked to do triage work that the layout should have pre-performed. Urgency labels on uniformly-weighted items are not state encoding; they are state description. State encoding makes the urgent items visually self-selecting before any reading occurs.

**Labels as live state.** Button labels, status lines, and menu elements carry the current state of the process, not a static list of options. "PASTE SESSION" → "RUNNING" → "4 ITEMS · 2 NOW" is a state surface. "Paste / Run / Review" is a static menu. The distinction matters because a static menu requires the user to construct their own mapping from current state to appropriate option. A live-state label gives back the constructive work to the interface.

**Phase sequencing in the tetra.** Three buttons name three stages of one process, not three unrelated options. The primary button advances the current phase; it is visually distinct and unambiguous as the natural next move. Other buttons handle exceptions. When all three buttons feel equally valid at the same moment, the tetra has failed to encode phase — it has produced a choice surface where it should have produced a phase surface. A user who genuinely doesn't know which button to press is in a navigation state, not a work state.

The five surfaces are interdependent. An interface with live-state labels but urgency-blind layout still requires triage work. An interface with inline routing but material-after-description still requires a discovery move. The pattern holds in full only when all five are present simultaneously.

---

## What It Is Not

**Not about information completeness.** An interface can contain all the relevant information and still fail to encode state. The failure mode is not missing information — it is information that requires the user to process and map before acting. State encoding is about the cognitive work load, not the information load.

**Not about minimalism.** A complex, information-dense interface can encode state fully. A minimal interface can fail to encode state. Density and state encoding are orthogonal.

**Not a static template.** State encoding cannot be achieved at build time for a dynamic interface. The labels, weights, and button configurations must be generated from actual session state at render time. An interface that looks like it encodes state but uses pre-filled placeholders fails at the moment state diverges from the template.

---

## When to Use

Apply this pattern when designing any interface that mediates between a user and a body of work that:
- exists in phases (not all items require action now)
- produces outputs that have routing destinations
- runs across sessions where context must be re-established at session open
- involves a recurring process where the user returns to continue rather than to start fresh

The pattern is most critical when the cost of orientation is high relative to the cost of the substantive work — when the navigation/triage overhead would, if unaddressed, consume a significant fraction of total session time.

---

## Falsifier

Place the same user in front of a state-encoded interface and a state-described interface (same information, different organization) under time pressure. If the state-described interface produces equivalent task throughput and equivalent error rates, state encoding added no functional value beyond aesthetics.

**Pattern-level falsifier:** if the user's first act is a navigation or triage act — asking where something is, reading labels to find urgency, deciding which button applies to their current state — the interface has not encoded state, regardless of how well it appears to be organized.

---

## Canon Proximity

| Pattern | Relation |
|---|---|
| `configure_before_demand` | Parent — this is configure_before_demand at interface grain; the pre-load is perceptual rather than structural |
| `build_before_distill` | The material-before-description rule is build_before_distill's sequence constraint applied to the display layer |
| `inhabitable_without_author` | Long-range target — an interface that passes state encoding passes the cold-entry test without briefing |
| `conditions_over_direction` | Structural cousin — both pre-perform routing work; this applies to interface conditions rather than relational ones |
| `future_image_as_pull` | The phase-sequencing surface is attractor-based navigation at interaction grain — the primary button images the next state |
| `proximity_instrument_horizon` | State encoding fails past a session boundary for the same reason proximity fails past distance |

---

*Promoted to canon 2026-07-01 (mark: crossing1_2026-07-01_layout_as_state_encoding)*
*Source: _INTAKE/nanobot_workshop_spec_2026-07-01.md*
