# The Open Ledger

*The data spine of the village tool. The schema view of [CIRCUIT_TOOL.md](../CIRCUIT_TOOL.md) — same tool, named by what it cannot do.*
*Built 2026-06-21. Pre-gate. Not canon, not substrate. The keeper holds the mark.*
*Working tool on this spine: [circuit.html](circuit.html) — the four faces (Self · Field · Routes · System), persistent. [demo.html](demo.html) proves the incapacities.*

---

## The one law

**It records everything that circulates and computes nothing that is owed.**

A frame held by instruction breaks the moment the instructor leaves. A frame held by structural incapacity holds in any hands, because no one can violate a rule the software has no fields for. So the spine lives in the schema, not the onboarding. Debt isn't prohibited. It's **unrepresentable.**

---

## The five incapacities

Each vertebra is a transactional reflex killed by a missing field. Read against [`SCHEMA.sql`](SCHEMA.sql) and [`schema.ts`](schema.ts) — every "→" points at an absence.

| # | The tool cannot… | …because the field is absent | What that makes unrepresentable |
|---|---|---|---|
| 1 | compute a balance between two people | no `recipient` / `counterparty` on any entry; entries attach to `commons` | **barter** |
| 2 | price | no `value` / `amount` / numeric column anywhere; `weight` is words | **the marketplace** |
| 3 | record a refusal-to-respond | no `responses` / `declines` table at all | **obligation-by-visibility** |
| 4 | bind a person to a role | `contact` carries only `reach`; no entry references a person | **the "needy person"** |
| 5 | turn a post into a claim | no `claim` / `obligation` / `due` / `assignee` table | **the contract** |

The same person flows as need and as gift, and is never typed, because there is no column to type them in. A no leaves no mark, because there is no surface for it to land on. A post is a signal, never a demand, because nothing it writes can bind anyone.

---

## The seam

The Open Ledger **shows the cost and hides the debt.**

`weight` carries the visible weight of what a gift is and what it took — *"a full day," "the last of the firewood."* The receiver sees it; the cost is legible (the Costed Handoff is satisfied). And nowhere does the schema compute a balance from it — there is no number to sum, no counterparty to sum it against. Cost made **legible** without cost made **transactional.** That single seam is what the whole thing turns on, and both halves live in one field: `weight` is shown and never counted.

---

## The limit (why the gathering is load-bearing)

The ledger has no `felt_as_gift`, no `quality`, no `sentiment` column — and that absence is honest, not an oversight. The one thing the tool cannot decide is whether a given gift was *felt* as gift or as extraction wearing gift's face. The schema makes the frame unbreakable on paper; it still can't read the room.

That part doesn't live in the tool. It lives in the people the tool gathers — which is exactly why `gathering` is a first-class kind with its own view, not decoration. The ledger routes people to the room. The room does the felt-read. And the room is where visible cost gets **received as gift** instead of **tallied as owed**. That makes the gathering the circuit's dispute arena, and it is declared as one: [the dispute arena](../membrane/01_THE_DISPUTE_ARENA.md) says who convenes it, what it can and cannot decide, and how its record is kept.

---

## Holds in a stranger's hands

The proof isn't a rule that says "don't enter debt." It's that a stranger with full write access *cannot.* Open [`demo.html`](demo.html) and try the five transactional moves. Each one fails — not with "permission denied," but with **"there is no field for this."** That is the difference between a frame held by instruction and a frame held by structural incapacity.

---

## Topology — A, marked 2026-06-21

The commons is the record; ownership is a **held key**, not a stored identity. This is the one place the Open Ledger and the [Circuit Tool](../CIRCUIT_TOOL.md) collide — *"you hold your own node"* needs the system to know which entries are yours, but the moment an entry stores its owner, *"this person is needy"* becomes computable. The reconciliation splits authorship in two:

- **Control** — "I posted this, I can retract it" — lives in a secret you hold. The schema stores only `holder_proof = hash(secret)` on the entry.
- **Identity** — "this person *is* needy" — would be a column ranking people by their entries. It does not exist.

A fresh secret per entry makes every `holder_proof` unique, so even grouping by it profiles no one. `holder_proof` is in no view; the only write that touches it is `retract(entry, secret)`. **"Your node" is not a server query** — it is computed from the keyring you hold, by checking which entries your keys open. No authoritative record, no central authority, nothing to be kicked out of: the Circuit Tool's retention architecture falls straight out of the capability model, and incapacity #4 stays enforced in the schema, not the UI.

*(Rejected: **B** mesh-all-the-way-down made the needy-person ranking schema-representable — the spine dropping back to UI discipline; **C** commons-all-the-way-down dropped the conductor/mesh metaphor. **A** keeps both halves.)*

---

*Pre-gate. Not canon, not substrate. Staged in `open_ledger/`. The keeper marks.*
