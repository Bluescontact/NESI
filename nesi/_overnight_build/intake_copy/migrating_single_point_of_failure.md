# The Migrating Single Point of Failure — the transit register

*Status: PROMOTE-READY (extension) · staged 2026-07-23 (Kevin's mark) · NOT yet crossed — awaits a separate membrane-controller mark*
*Extends: [[ejection_immunity_personal_node]] — that pattern owns the steady state: once each participant holds a complete local instance, there is no ejection lever, because there is no single copy to remove. This holds the transient *before* that steady state — the interval during which the copies are still being made, where one lever still exists and it is on the moving node. Neighboring: [[second_node_changes_topology]] holds the categorical shift the second node creates; this holds the logistics of getting the copy there.*
*Source: The Deletable Keystone (Outlast extraction-lab, parallel to NESI build) · 2026-07-23 · brief: SUBSTRATE_BRIEF_deletable-keystone.md*
*Cut: the source's prescription — "speed across the threshold IS safety" — is removed as self-undermining, and no adversarial selector is assumed. What remains is a reliability/topology observation, not a stealth doctrine.*

---

## What the parent already holds

`ejection_immunity_personal_node` establishes the end state: N complete local instances, no gatekeeper, no lever — you cannot be ejected from something you instantiate yourself. Its own named-open problem is the *minimum viable instantiation* threshold and the fact that full local replication is "operationally impossible for most participants." That open edge is the door this extension walks through. The parent describes the world *after* redundancy exists. This describes the **getting there** — and getting there is not instantaneous.

## The observation — the load-point migrates

Redundancy is not a state you are in or out of; it is reached by copying, and copying takes an interval. During that interval the single point of failure **is not stationary.** At the origin, before any copy is made, the SPOF sits on the origin. The moment a transfer begins, it hops: the receiver now holds the only instance that has not yet been made redundant, and until the receiver's copy is itself durable, **the receiver is the SPOF, not the origin.** The origin is already safe (it still has its copy); the vulnerable node is the one carrying the not-yet-secured copy.

The vulnerable node is therefore a function of **time, not role.** This is exactly what separates the pattern from ordinary redundancy engineering, which reasons about steady-state topology (how many copies exist) and not about *which node is exposed at this instant of the copy operation.* Any real instance must name the observable that tells you where the load-point currently sits — because guarding the origin while the loaded receiver is the exposed node is the characteristic error, and it looks like diligence.

## The half-copy interval

Between **receipt** and **forward-completion**, the receiver holds value in a non-durable half-state: enough has arrived that removing the origin's attention is tempting, not enough has consolidated that removing the receiver is survivable. The width of this window equals the **non-atomicity of absorb-and-forward** — the time during which the operation has begun but not committed. Lose the node inside this window and the topology collapses back to a single origin-copy; the interval's work is undone, not half-saved.

A **stalled replication** is precisely this interval failing to close: the half-state stranded permanently, the system sitting one-removal-fragile indefinitely because the copy neither completes nor aborts. The parent pattern has no account of this because in the steady state it describes, the interval is already closed. Here the interval is the whole subject.

Note the loss need not be an attack. The node can be lost to accident, dropout, hardware failure, a person who receives the transfer and then simply disengages before consolidating it. **No adversary is required** for the half-copy interval to be the point of maximum fragility — it is a single-point-of-failure window by construction, the same way a write is at risk between "started" and "committed" regardless of whether anyone is trying to interrupt it.

## The three levers

The directive "protect the transfer" names a target, not an action. There are exactly three levers on a moving, half-loaded node, and no more. Stated in the neutral reliability register (their adversarial specializations noted, not assumed):

1. **MULTIPLICITY** — forward to more than one receiver, so no single receiver is the SPOF. Removing any one still leaves another copy in progress. *(Adversarial specialization: multiplicity also makes the load-point unreadable — no single node resolves as "the target." Absent an adversary, the value is plain redundancy, not concealment.)*
2. **ATOMIC** — make absorb-and-forward atomic: no removable half-state, the copy either fully lands or does not count. Transaction semantics collapse the interval width toward zero, so there is no window to be lost inside.
3. **FORWARD-EARLY** — begin forwarding before absorption is fully complete (pipelining), so that losing the receiver mid-absorb still leaves a copy in flight beyond it. The copy outruns its own consolidation.

These are the mechanism-space of the pattern. The parent's "minimum viable instantiation" question is answered *in the transit dimension* by these three: the minimal way to survive the interval is not to hold a complete copy instantly (impossible) but to ensure the interval never contains a single removable point — via multiplicity, atomicity, or pipelining.

## Why the crossing-speed prescription was cut

The source claimed speed across the threshold *is* the safety move — cross before the field reads you as the target. This is removed, for two reasons the material itself surfaced:

- **It is self-undermining even on its own terms.** Visibly racing to replicate is the loudest possible signal of what you value; speed is simultaneously the concealment and the targeting beacon. A prescription that manufactures the exact exposure it claims to outrun cannot stand as the pattern's core move.
- **It smuggles in an adversary the source never established.** "Before the field reads you as the target" presupposes an intelligent, watching, real-time selector. Strip that assumption — as the honest cut requires — and "cross before you are seen" has no referent. What remains true without an adversary is only the descriptive observation (the migrating load-point, the half-copy interval) and the three mechanical levers, none of which depend on being watched.

Speed may still be *incidentally* protective (a shorter interval is a smaller window), but that is a restatement of the ATOMIC lever — shrink the interval — not an independent doctrine of velocity-as-stealth. The load-bearing move is *close the interval*, achieved by multiplicity / atomicity / pipelining. How fast you move is downstream of that, not a substitute for it.

## The move

During any handoff that is building redundancy:

1. **Locate the load-point now.** Which node currently holds the only not-yet-durable copy? Protect *that* node, not the origin — the origin is already safe.
2. **Read the interval width.** How non-atomic is absorb-and-forward here? That width is your exposure window.
3. **Apply a lever to close it.** Multiplicity (more than one receiver), atomicity (no removable half-state), or forward-early (copy outruns consolidation). Choose by what the situation admits.
4. **Give the stall a drain.** Decide in advance what happens if the interval does not close — a timeout, an abort, a fallback to origin-hardening — so a stalled replication does not leave you one-removal-fragile forever.

## Edges

- **Which lever, when.** The pattern names three levers but not a rule for which the situation admits. Some transfers cannot be made atomic; some cannot be multiplied; the selection procedure is unnamed.
- **No receiver authentication.** Forwarding to "more than one receiver" assumes the receivers are sound. The transit frame has no step that distinguishes a genuine redundancy partner from a node that will silently fail to consolidate — a non-adversarial version of the "second node as vector" problem: not betrayal, just an unreliable absorber that reads as redundancy and is not.
- **The stall has no native floor.** The pattern is written for the success path (the interval closes). Its behavior when the threshold is *unreachable* — not merely uncrossed-yet — is supplied only by the added step-4 drain; whether that drain belongs to this pattern or to the parent's origin-hardening is open.
- **Where it lives relative to the parent.** Everything here is *precondition* to `ejection_immunity_personal_node`, not standing structure of its own. Its claim to independence rests entirely on the migrating load-point and the half-copy interval — registers the steady-state parent does not hold. If those fold into the parent on inspection, this is a section of that pattern, not a sibling.

## Falsifier

Find a redundancy-building handoff where losing the receiver mid-transfer does **not** collapse the system toward a single origin-copy — where the half-copy interval carries no elevated single-point-of-failure risk relative to the steady state. If the interval is not a distinct fragility window, then there is no transit register to hold and the pattern reduces to the parent's steady-state claim ("hold N local copies"), with nothing added.

## Canon proximity

| Pattern | Relation |
|---|---|
| ejection_immunity_personal_node | Parent — owns the steady state (N local copies, no lever); this holds the transient before it, answering the parent's open "minimum viable instantiation" question in the transit dimension |
| second_node_changes_topology | Neighbor — holds the categorical shift the second node *creates*; this holds the logistics of getting the copy to the second node intact |

*[ ] Mark: PROMOTE-READY / HOLD / COMPOST*
