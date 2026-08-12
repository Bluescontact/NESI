# Field Kit Engine

Engine for producing Field Kits — practitioner-ready apparatus for civic and consumer structural disputes.

Sibling to Transmission Engine. Transmission Engine takes a finished article and produces RI-aesthetic transmission artifacts. Field Kit Engine takes a civic / consumer structural mess and produces practitioner-ready apparatus.

## Current version

**v0.2** — adds cold-start vs compression mode distinction in Stage 1, names two standing kit components (Communications Discipline, Transmittal Packet).

## Files

| File | Role |
|---|---|
| [`SCOPE_AND_LENS.md`](SCOPE_AND_LENS.md) | Founding document — what the engine is, what it produces, what it refuses, the lens it applies, the production sequence |
| [`templates/communications_discipline.md`](templates/communications_discipline.md) | **Standing component** — pasted into every Field Kit's audit. The three doctrines (truth, opinion/fair comment, privilege) + three rules (conduct-not-character, watch legal-terms-of-art, hold public-facing reserve) |
| [`templates/transmittal_packet.md`](templates/transmittal_packet.md) | **Standing template** — pasted into every Field Kit's templates folder. Cover sheet + multi-party CC structure for post-demand-letter leverage |

## Runs to date

| Kit | Substrate | Mode | Practitioner-ally audience |
|---|---|---|---|
| TN Section 8 (May 28) | Housing voucher disputes in Tennessee | Cold-start | Tenant unions |
| Sierra Electric (May 28) | Consumer revocation of defective EV | Compression | Practitioner-author (Kevin) |

Each run lives in its own folder under `DSS content/`. The kits are the deposits; this engine is the apparatus that produced them.

## When to invoke

When a civic or consumer structural mess arrives — a housing dispute, a surveillance proposal, a datacenter siting, a defective-product matter, a school-closure decision — and a practitioner-ally (tenant union, opposition group, oversight body, consumer-author) needs immediately usable apparatus.

When the substrate is genuinely two-shape or single-actor → write a Brief instead.
When the substrate is multimedia or campaign-strategy work → not in this engine's scope.
When the substrate is a finished essay needing visual / transmission artifacts → use the Transmission Engine.

## Not yet built

- The orchestration layer (`SKILL.md`) for Claude invocation
- Substrate-skeleton templates (`templates/audit_skeleton.md`, etc.)
- Citation library (`assets/federal_floor.md` for housing, consumer protection, etc.)
- Generalized `bin/build_field_kit.py` (currently lives per-substrate)
- Anti-pattern registry (will land on the third kit run, when the third anti-pattern surfaces)

These are discrete next moves. The current set is what the engine has needed so far.
