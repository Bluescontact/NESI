---
name: substrate
description: Extract transferable patterns from rich writing, develop each into substrate, screen against the library, and produce a mark queue in _INTAKE/. Use whenever Kevin says "run substrate on this," "run the substrate process," "compost and develop this," "substrate development," or similar. Also invoked by the Dispatcher in DEVELOP mode. Input: conversation content, a file path, or both.
---

# Substrate Development

Pipeline that takes rich source writing and produces a mark queue. The writing goes in; patterns come out — named, developed, screened against existing canon, and Converger-rated. Kevin's gate is the felt-read and mark.

**Anchoring principle:** pattern crosses, instance never does. The person, property, and specific situation stay in the source. Only what recurs structurally travels.

## Architecture

```
Stage 4  Converger pass + brief        routes each pattern: PROMOTE-READY / HOLD / COMPOST
Stage 3  Library screening             NEW / EXTENDS / FOLDS_INTO / CONTRADICTS
Stage 2  Pattern development           transferable form, structural articulation, edges
Stage 1  Pattern extraction            names, slugs, descriptions, raw material
Stage 0  Source capture                write source to _INTAKE/raw/ if not already a file
```

Workflow: `C:\Users\KMEAR\.claude\skills\substrate\workflow.js`

## Inputs

- Source material: conversation content, a file path, or both.
- Optional: a one-line steer if Kevin wants emphasis on a particular thread.

## Output

`_INTAKE/SUBSTRATE_BRIEF_<slug>.md` — one section per pattern:
- Library verdict + Converger verdict
- Transferable form
- Full development
- Edges and open questions
- Kevin's mark field

PROMOTE items stage to PROMOTE-READY and await Kevin's explicit mark. Nothing queues to the Transmission Engine without Kevin's mark (Decision 4 = A, hard gate, 2026-06-30). COMPOST items are done. HOLD items stay in `_INTAKE/` with their named condition.

## Pipeline

### Stage 0 — Source capture

If Kevin names a file already in `_INTAKE/raw/` or elsewhere: use it directly.

If source is conversation content: extract only the substantive writing — Kevin's observations, experiences, patterns noticed. Strip the conversation wrapper (requests, questions, process scaffolding). Save to `_INTAKE/raw/substrate_source_<YYYY-MM-DD>.md`.

Generate slug: `substrate-<YYYY-MM-DD>` unless Kevin provides one.
Brief path: `C:\Users\KMEAR\OneDrive\Desktop\DSS content\_INTAKE\SUBSTRATE_BRIEF_<slug>.md`

### Stage 1-4 — Workflow

Run the Workflow tool with:
- scriptPath: `C:\Users\KMEAR\.claude\skills\substrate\workflow.js`
- args: `{ "source_path": "<absolute path>", "source_label": "<description>", "date": "<YYYY-MM-DD>" }`

The workflow handles extraction → development → screening → Converger pass in parallel. It returns:
```json
{
  "pattern_count": N,
  "patterns": ["name1", "name2"],
  "verdicts": [{ "name": "...", "verdict": "PROMOTE-READY" }],
  "brief_content": "..."
}
```

### Stage 5 — Write brief

Write `result.brief_content` to the brief path using the Write tool.

### Stage 6 — Report

Report to Kevin:
- N patterns extracted, each name
- Converger verdict per pattern
- Location of brief
- COMPOST items (Kevin doesn't need to review these)
- HOLD items with their named conditions

Do not summarize the development. Kevin reads the brief directly.

## Invocation

1. Confirm source. If ambiguous, ask once.
2. Stage 0: capture source to file if needed.
3. Run Workflow (scriptPath: `C:\Users\KMEAR\.claude\skills\substrate\workflow.js`, args as above).
4. When workflow completes: write brief_content to brief path.
5. Report.

If `pattern_count` is 0: "No substrate-dense patterns found in source." Stop.

## Automation Decisions (marked 2026-06-30)

**Decision 3A — LIFTED 2026-06-30**
Consolidation window closed. Freeze behavior no longer in effect. Substrate Pass dispositions now advance normally: PROMOTE-READY items route to gate queue; HOLD items remain in _INTAKE/; COMPOST items are done. All held-at-DEVELOPED items from the consolidation window are now eligible for Converger pass and gate routing.

**Decision 3 — Freeze behavior during Consolidation Pass** *(archived — 3A lifted)*
- Track A (Substrate Pass / daily triage): **Option 2** — run, but hold all dispositions at DEVELOPED. Nothing advances to PROMOTE-READY or GATE while a Consolidation Pass is active.
- Track B (Development Phase / per-candidate deep build): **Option 2** — continue. Output stages to `_INTAKE/developed/` and holds there. Kevin sequences development and consolidation gate items independently.
- Track C (Consolidation Pass): fixed behavior, not affected.

**Decision 4 — Publication pre-routing**
- **Option A — Hard gate.** Substrate never touches Transmission Engine queue. Every PROMOTE-READY candidate requires Kevin's explicit mark before the Engine sees it. Zero automation past the membrane.

## Maintenance

| To change... | Edit... |
|---|---|
| Extraction prompt | workflow.js Extract agent prompt |
| Development depth | workflow.js develop stage prompt |
| Library files screened | workflow.js Discovery phase — auto-globs `patterns/` + `frameworks/` at runtime |
| Converger rules | workflow.js converge stage prompt |
| Brief format | workflow.js sections builder |
| Trigger conditions | This SKILL.md frontmatter description |

Library enumeration is automatic — the Discovery phase globs `patterns/` and `frameworks/` at runtime. No maintenance needed when canon grows.
