---
name: field-kit-engine
description: >-
  Take a civic or consumer structural mess (housing dispute, surveillance
  proposal, datacenter siting, school closure, defective-product matter) and
  produce a Field Kit — practitioner-ready apparatus for a tenant union,
  opposition group, oversight body, or consumer-author. Sibling to the
  Transmission Engine: that engine takes a finished article and produces
  visual/transmission artifacts; this engine takes a civic problem and
  produces usable apparatus. Use whenever Kevin says "build a field kit
  for X," "run this through the field kit engine," or a civic/consumer
  structural mess arrives with a practitioner-ally who needs immediately
  usable tools. Refuse when the substrate is genuinely two-shape (write a
  Brief instead), multimedia/campaign-strategy work, or a finished essay
  needing only visual artifacts (route to Transmission Engine).
---

# Field Kit Engine

Orchestration layer for `SCOPE_AND_LENS.md`'s already-proven production sequence. Two runs (TN Section 8, Sierra Electric) established the form before this file existed; this file makes the form invocable rather than reconstructed from memory each time. Read `SCOPE_AND_LENS.md` first — it is the founding document and is not duplicated here. This file is the seam between Claude invocation and that document's Stage 1–7 sequence.

---

## When invoked

A civic or consumer structural mess arrives and a practitioner-ally (tenant union, opposition group, oversight body, consumer-author) needs apparatus. Confirm scope against `SCOPE_AND_LENS.md`'s in-bounds/out-of-bounds list before starting Stage 1. If the substrate is two-shape, multimedia, or campaign-strategy — stop and name the better-fitting tool (Brief, Transmission Engine, not this engine) rather than forcing the geometry.

---

## Inputs

- The raw substrate: paper, correspondence, a demand letter, jurisdictional facts, or a practitioner-ally's own partial work.
- The practitioner-ally identity (who will actually use the kit) — required before Stage 3; a kit with no named audience does not get built (Anti-register, `SCOPE_AND_LENS.md`).
- Jurisdiction (state, ideally county/city).

## Outputs

A Field Kit folder under `DSS content/<kit-slug>/` containing the five standing deliverables named in `SCOPE_AND_LENS.md`: structural audit, one-pager, recognition diagram, sample letters/templates, and the crystallized PDF.

---

## Pipeline — run `SCOPE_AND_LENS.md` Stages 1–7 in order

This file adds nothing to the stage logic itself — that lives in `SCOPE_AND_LENS.md` §"Production sequence." What this file adds is the invocation seam:

**Stage 1 (mode selection):** Before drafting anything, state the mode decision out loud — cold-start or compression — and the trigger that decided it (does the seed material already carry accurate citations and a near-tetrahedral framing?). Do not silently default to cold-start.

**Stages 2–6:** Run as specified in `SCOPE_AND_LENS.md`. Always pull in the two standing components (`templates/communications_discipline.md` at Stage 3, `templates/transmittal_packet.md` at Stage 6) — these are not optional per-substrate choices.

**Stage 7 (status report):** This is the report back to Kevin before distribution — surface geometry chosen, mode used, the four shapes named, jurisdictional layer mapped, key deadlines, and any gaps. Nothing in a Field Kit ships to the practitioner-ally without this report being read and confirmed first; this engine produces the kit, it does not authorize its release.

---

## Recognition tests (run before Stage 7 report)

Per `SCOPE_AND_LENS.md`'s own falsifiers — if any output fails its test, regenerate that output before reporting Stage 7 complete:

| Output | Test |
|---|---|
| One-pager | A person reading it cold can locate their situation in under 60 seconds |
| Recognition diagram | The four shapes can be grasped in 5 seconds at a glance |
| Structural audit | A lawyer reading it would say "this is half my work already done" |
| Field kit PDF | A tenant union receptionist could hand it to someone in crisis without orientation |

---

## What this file does not do

- Does not replace `SCOPE_AND_LENS.md` — that document is the lens and the scope; this is only the seam that lets Claude invoke it as a skill.
- Does not build the still-missing pieces named in `SCOPE_AND_LENS.md`'s "What this document does not yet contain": substrate-skeleton templates, the citation library, `bin/build_field_kit.py`, the anti-pattern registry. Those remain open, named there, not duplicated or silently started here.
- Does not decide which civic substrates get a kit versus a Brief versus nothing — per `SCOPE_AND_LENS.md`, that routing sits with the Chief of Staff / Kevin, not with this file.

---

*Built 2026-07-21, NESI regather/develop session. Closes the one concrete gap named first in "Not yet built": the orchestration layer that lets this engine actually be invoked as a skill, rather than reconstructed from `SCOPE_AND_LENS.md` each time. The remaining four gaps (templates, citation library, generalized script, anti-pattern registry) are unchanged and still open.*
