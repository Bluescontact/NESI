---
name: white-paper-load-bearing-patterns
description: The pattern library (176 files) collapsed to the 23 patterns with confirmed live wiring — cited in running code or a currently-active governing document, not just archival mention
metadata:
  type: project
  date: 2026-08-24
---

# The Load-Bearing Patterns

**Method, stated plainly:** `patterns/` held 176 files. Every one of them was checked
against one test: does it appear, by name, inside something that actually runs or
governs right now — a live script, a conductor module, a running prompt pipeline, a
skill, an agent file, `LEARNED.md`, `PROTOCOLS.md`, a current `CLAUDE.md` — or does it
only appear in a historical log, a generated index, an archived reading, or an
unreviewed intake copy. Six passes covered all 176 slugs. Hits inside `gate/data/*`,
`MARKS_LOG.jsonl`, `counsel/**`, `.claude/worktrees/**`, `nesi/_overnight_build/`, and
the auto-generated corpus dumps (`THE_WORLD.html`, `world_data.json`,
`tension_index.*`, `codex_index/**`) did not count — those are the library remembering
itself, not the library being used.

**23 patterns cleared the bar.** What follows is what they say, organized by what they
actually do together, with the citation that earned each one its place. The other 153
are not wrong, retired, or lesser — most simply haven't been asked to hold weight yet.
This paper is the load-bearing cross-section, not the judgment on the rest.

---

## 1. The governing law

### The recognition law
A recognition mechanic must never do the recognizing. No worth-score, value-rating,
or skill-rank may be emitted by the system — the mechanic's only job is to surface and
hold tension while the felt-read (the moment of registering that something "lit")
stays entirely with the player. If any mechanic ever emits a number, rank, or verdict
the player did not themselves feel, the law was decorative — that is its own stated
falsifier.

*Cited as governing law in `nesi/conductor/worth.py:11` (imported live by
`nesi/conductor/v2_board_data.py`), and named as the project's single operative law at
the top of `nesi/NESI.md` and in `nesi/NESI_V2_BUILD.md:12`.*

---

## 2. The cost-intake brake

### The Governor
A rate-limiter on cost-intake, not on output. It gates the deposit, not the
metabolization — the question it asks is never "is this good substrate," it's "can
the body afford to deposit right now." It distinguishes ordinary sustainable
gift-cost, unsustainable pioneer-phase cost, and structurally-generated cost (where
the correct move is to exit the position or close the gap upstream, not calibrate the
brake harder), and it fails closed — when the felt-marker is uncertain, it defaults to
STOP. It is the most heavily cross-referenced pattern in the corpus by its own count.

*Wired live across `nesi/conductor/deepdive.py` (computes and reports the
`"governor"` verdict field), `nesi/conductor/nesi_app.py` (renders the GOVERNOR label
in the UI), `tools/field_surface.py:137` ("THE GOVERNOR'S ROAD"), `tools/decisions.py`
and `tools/ledger.py` (overspeed-brake logic), and named in the canon list fed to
`tools/osg_dispatch/dispatch.py`'s live prompt chain.*

### Attractor currency
A felt image built under one set of conditions keeps generating pull after those
conditions change, and the pull itself gives no warning — a live attractor and an
obsolete one feel identical from inside. The fix is a standing check, not an alarm: a
direction check (what did the last few decisions in this domain actually feel like)
and a territory check (does the current ground feel like it's moving toward the
image's texture), run at a regular cadence. It is the Governor's direction-side
complement — the Governor brakes cost overrun, this brakes direction overrun.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live
structural and synthesis prompts.*

### Consented ledger
The accounting law for where cost can go: circulated forward as gift or signal, felt
and consciously refused before being incurred, or externalized unfelt — only the third
is forbidden. Its sharper form: leaking is mandatory, since a fully closed ledger is a
thermodynamic claim no organism can satisfy. The actual failure mode is a leak
migrating from the *consented* column to the *hidden* column unnoticed, usually
because surplus on one resource masks depletion on another. It needs two bolt-on
doctrines to avoid becoming its own pathology: a witness requirement (self-report
fails silently exactly when depletion is worst) and a cutoff doctrine (a declared
stopping point closed by decision, since auditing the ledger is itself an uncounted
cost that reopens it).

*`skills/metabolizer/SKILL.md` names this pattern's cutoff doctrine as the direct
source of its own closure rule. Also cited in `tools/intake_triage/triage.py` and
`skills/register-audit/SKILL.md`.*

### Scarcity interface
Names the structural situation where a gift-economy node meets a peer-presenting actor
who is actually inside an acute scarcity loop — unable to receive what's offered, and
structurally organized to conscript the node's capacity into their own rescue frame.
Not an interpersonal failure: the node's competence reads as rescue fuel, compliments
and dismissals cycle without any offered input producing a stop, resources stay
invisible to the person inside the frame. The guardrails run at the structural level —
state the circle's operating conditions once, run the Governor's cost-intake
discriminator before extending, return the accurate verdict without generating
next-step fuel, hold the boundary at the circle level rather than the individual.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live
prompts, and cited directly in `patterns/the_governor.md`'s own backlink list.*

---

## 3. What a mechanic is allowed to do before it acts

### Commission grammar screen
A gate upstream of every other instrument here: role-acceptance itself, before the
first deposit or check runs. Commission is grammatically and semantically open — a
divergent verdict is genuinely possible and would close the conversation. Conscription
is grammatically open but semantically closed — the acceptable verdict is already
fixed, and any divergent result triggers re-routing (reframe, second opinion, another
approach) — even though the two arrive in identical language ("what do you think?").
Explicitly upstream of catalysis-without-claim's double bind: the bind is installed
before arrival, at the moment the commission itself pre-collapsed into a conscription.

*Named as a structural cluster member in `tools/transmission_engine/CLUSTER_MAP.md`,
one of 35 of 176 patterns selectively curated for the engine's live diagram output.*

### Limit as coordinate, not wall
Distinguishes two structurally different events that use the same words: "I don't
know" from outside shared diagnostic work closes as a verdict from a map the receiver
can't see; the same words from inside work the receiver has watched unfold land as a
coordinate — a locatable edge on a jointly-held map — because the receiver has a
referent for where "here" is. Scoped explicitly to epistemic limits reached through
shared work, not categorical refusals that precede any map. Named as the mid-work
member of a three-instrument stack alongside commission_grammar_screen (role-intake)
and the_governor (cost-intake).

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into every socket of
its live V7 prompt chain (structural, synthesis, adversarial, technical,
pattern-extraction).*

### Catalysis without claim
How an agent corrects a coercive system by depositing accurate signal and absorbing
its cost, without merging with the system's distress and without claiming credit — the
system gets to change without ever having to admit it was moved. Runs when an agent is
caught in a genuine double bind (an inner rule demanding silence against an outer
mandate demanding disclosure) inside a system with no mechanism to distribute the cost
of accurate witnessing, so the cost lands on the witness — typically in the
unrecorded ordinary, not at moments of visible crisis. The close is forfeiting
authorship: not just material recovery but credit for having caused the change, since
institutional face-loss is what actually blocks reform.

*Hardcoded as a standing canon reference in `nesi/conductor/skin.py`'s live offering
register, and cited in `tools/osg_dispatch/dispatch.py`, `tools/intake_triage/triage.py`,
`tools/transmission_engine/CLUSTER_MAP.md`, and `skills/register-audit/SKILL.md`.*

### Conditions over direction
When adequate conditions exist — sufficient resources, genuine non-transactional
relationships, a shared picture of what thriving looks like — collaborative work
emerges without anyone directing it, and continued direction after conditions are set
actively competes with that emergence, because a director's model of the work is
lower-bandwidth than the conditions' own routing. Distinguished from
catalysis-without-claim by structural presence: a catalyst is inside the reaction, a
conditions-setter is upstream of it and absent once conditions are set. Names its own
failure modes under pre-configuration — calcification, capture, distortion — rather
than presenting as unconditionally safe.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live
prompts.*

---

## 4. Refusal and the veto that actually holds

### Surface without no
The design law: a decline counts as heard only if it mutates persistent state that an
offer-generator reads before composing its next offer. To a stateless generator,
silence and refusal are the same input — a re-offer of declined material is amnesia,
not malice. Distinguishes NO (write to a SINK, suppress on sight) from DEFER (write to
a SOURCE, feedstock for re-offer); any NO verb without a mandatory read-before-offer
step is decoration.

*Directly implemented: `tools/refusal_sink.py`'s docstring states it was built to
close this pattern's stated open edge, enforcing the four laws as running code — a
suppress-on-sight store, a mandatory read-before-offer step, refuser-key-only lifts,
and a visible withheld count. Writes to `tools/recognition/refusal_sink.jsonl`.*

### Load off the vulnerable node
An invariant: load never rests on the node an adversary can attack. Whatever is
attackable must carry none of the weight; the load routes instead to a node the
adversary cannot strike without striking the environment or its own record. Built and
working on the actor side — the outcome-argument, the injury, the affect, and the
leverage are each routed off the actor onto external authority or the counterparty's
own record — while the form-side counterpart (infrastructure that makes extraction
structurally uninhabitable) remains named but unbuilt.

*Cited as canon, status "crossed 2026-07-21," in `nesi/conductor/skin.py`'s live
defense register; the unbuilt form-side gap is tracked as a standing entry in
`nesi/conductor/held.py`.*

### Gate as F4
Names the structural difference between a gate and a pump: a retained veto is a gate
only when the holder states, before the delegate submits work, the discharge
condition under which the veto will pass — otherwise the same retained authority runs
as a pump, loading indefinite uncertainty onto the delegate regardless of how sound
the holder's eventual judgment is. Every unstated discharge condition is definitional
debt the holder owes and hasn't paid. Its falsifier: could the delegate, before
submission, state the passing condition in terms that would survive the holder's own
verification?

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live V7
prompt templates.*

---

## 5. What crosses into canon, and how

### Render without canonizing
Separates two functions that asymmetric-production systems collapse: rendering (an AI
or producing agent surfacing, drafting, compressing) and canonization (a sovereign
agent's explicit mark advancing an artifact's status). Defines a three-node minimum
crossing sequence — Render, Gate, Mark — and names the primary failure mode as fluency
substituting for authorization: a governing party ratifying quickly enough that the
mark becomes a formality confirming AI confidence rather than an independent act of
judgment. Falsifier: can the governing agent name, for any canonical artifact, the
moment and reason they issued the mark?

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live V7
prompt chain.*

### Iteration cannot find absence
A refinement loop can only correct what its part list already contains: every
feedback signal binds to an element that exists, so a missing element has no
coordinate on the error surface and no amount of loop speed produces a gradient toward
it. The signature is a whole-system falsifier firing at the same pitch across repair
cycles — detecting a fault without ever localizing it. The prescribed fix is to seed
the loop with negation, not simply run it faster.

*Cited by exact filename in `nesi/conductor/held_map.py` as one of two canon files
that already supersede stale intake material — a live, standard-library-only
reference module.*

### Live hands ratification
When the body that finds a failure, the authority that marks it, and the hand that
fixes it are the same body working on a live surface, detection and ratification
collapse into one event with no ticket layer to dissipate the signal — a found bug
becomes a successful measurement rather than a defect. Holds only under three named
hinges: one sovereign user, same-day fix capacity, a surface cheap enough to go live
unratified. Names its own boundary — off-screen state, security, habituation, and
counterfeit ratification are exactly what live use structurally cannot ratify.

*Cited by exact filename alongside iteration_cannot_find_absence in
`nesi/conductor/held_map.py`'s live canon-supersession check.*

### The daylight test
A falsifier for any move that commits a person into a structure through information
they don't yet fully hold. A trapdoor (induction toward genuine value only visible
from inside) and a trap (concealment for the builder's gain) are mechanically
identical up to outcome, so the discriminator is aim, tested as a counterfactual run
mid-crossing: could the mechanism be shown to the participant as they cross, and would
they still proceed? Two chairs run the same test — the builder's self-falsifier before
acting, the receiver's demand for daylight at the threshold. Scoped explicitly as a
pre-screen only, never a substitute for the corpus's somatic ratification gate.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live
prompts.*

### Structural incapacity over prohibition
Draws a hard line between two grades of rule: prohibited-but-possible, where a
compliant system can still produce the harm and the line holds only by whoever is
paying attention; and structurally incapable, where a correctly-operating system
cannot produce the harm because the capacity was removed at design time. The
discriminating test is one counterfactual: could a fully compliant system still have
produced the harm? If yes, it's prohibition dressed as incapacity. If no, the rule
holds without enforcement because the enforcer was never load-bearing.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live
prompts.*

---

## 6. Cost that doesn't show up on its own

### Sensed but unshown
Names a cost that's stable and vivid in the body of the party who absorbed it, yet
permanently invisible in the ledger of the system that generated it — not from
concealment but because no field for that cost type exists in the generating system's
accounting. Non-representability, not concealment, is what makes an externalization
permanent rather than temporary. Closes a four-part remedy-design grammar: bias the
direction of failure, structural incapacity over prohibition, extend-don't-invent,
sensed but unshown.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live
prompts.*

### Symmetrical blindness from asymmetrical visibility
Two parties each carry a real cost that's vivid to themselves and invisible to the
other, and each — reasoning honestly from their own partial data — independently
concludes they're the one bearing more. Neither is lying; the belief is driven by
visibility, not actual magnitude, and persists whether the underlying costs are equal
or not. Because the missing data is exactly what informal norms (like quiet-giving)
suppress, the situation can't be resolved from inside it — the fix is a change to what
the norm makes visible, not a fact-check about who is more right.

*Cited by name in `nesi/conductor/sharedmap.py` and `nesi/conductor/boundary.py` as
the design rationale for why load/cost information is surfaced on the page rather
than kept implicit.*

### Cost externalized through delegation
Authority is positional and travels with title or ownership; cost is physical and
travels with proximity — delegation moves proximity without moving authority, leaving
the delegate to absorb burden while the authority-holder keeps the right to override
or terminate. The gap self-reinforces because feedback must pass through the
delegate, who filters and translates it. Three failure modes: information lag (crisis
signals cross the gap, competence signals don't), accountability inversion (blame
moves toward the delegate as authority moves away), exit asymmetry (the delegate can
only quit, the authority-holder can only re-delegate). No amount of somatic discipline
on the delegate's side fixes a problem generated structurally upstream.

*Named as a distinct cluster entry in `tools/transmission_engine/CLUSTER_MAP.md`.*

---

## 7. Relationship and route

### Bilateral route formation
A connection between two parties exists only when both are operating from their own
ground at the same time — a route is the intersection of two independent
participations, never a channel one side opens into the other. Unilateral effort
can't create a route, only make one node available should the other arrive; forcing
the opening produces simulated compliance or damage, not connection. Route strength
tracks the weaker of the two participations, and routes aren't stored infrastructure —
they exist only while both sides actively participate, and re-form from scratch when
either withdraws.

*A fixed canon entry in `tools/osg_dispatch/dispatch.py`'s live prompt chain, and
independently named as a structural cluster member in
`tools/transmission_engine/CLUSTER_MAP.md`.*

### Inhabitable without author
The test for when infrastructure has actually crossed from personal practice into
commons, rather than merely being described as ready: not whether people can explain
it, but whether a person entering cold finds non-extraction to be the default without
the author present, without a briefing, without effort. Separates three states —
the author is the infrastructure, the field is held in place by a trained
maintainer's will, and true field independence, where maintenance is distributed past
any single traceable origin — and gives a three-step check: cold entry, author-absent
quality, maintenance trace.

*Named in the canon list `tools/osg_dispatch/dispatch.py` feeds into its live V7
prompts.*

---

## 8. Method

### Tetrahedral agent protocol
A reusable four-agent development method: Grounder holds what's real, Dreamer reaches
for the latent, Governor cuts momentum wearing a real idea's clothes, Shaper composes
the survivors into a deliverable — kept as separate agents because their instincts
oppose each other and collapsing them into one mind produces mush. Specifies the six
edges as stated tensions rather than silent handoffs, and terminates on the
Governor's "dry" call. Documents its own failure modes from a real run: declared
compliance without held resistance, edges dying while vertices individually hold
their roles, "dry" as a derivative sensor rather than a content judgment.

*Embedded verbatim inside `CANON_TOPOLOGY` in `tools/intake_triage/triage.py`, which
compiles it directly into the live LLM screening prompt this running tool sends to
Ollama to route intake files to PROMOTE/HOLD/COMPOST.*

---

## What this leaves standing

Twenty-three patterns, eight clusters, one governing law under all of them: a
mechanic that recognizes for itself instead of surfacing what the player felt is
already disqualified before any of the rest apply. Everything above it exists to keep
that from happening at every layer where it could sneak back in — at the rate cost
enters (§2), at the moment a role is accepted (§3), at the moment a no is spoken
(§4), at the moment work crosses into canon (§5), at the moment a cost goes unfelt by
the system that caused it (§6), at the moment a route is claimed rather than formed
(§7), and in the method used to build the next layer (§8).

The other 153 patterns are not this paper's business. Some are early drafts of
mechanisms these 23 later replaced; some are edges of a container that hasn't been
built yet; some may simply be waiting for their own citation to land. `patterns/`
still holds all of them, unedited, exactly where they were.
