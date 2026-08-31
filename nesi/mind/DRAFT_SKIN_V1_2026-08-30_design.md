# ■ SUPERSEDED same day by SKIN_V1_2026-08-30_developed.md — kept whole as the
# pre-audit draft. The audit killed permit(), the SKIN_LOG ledger, and the
# neighbor-routing claim below; read the developed file for what actually stands.

# DRAFT — SKIN v1, the acting boundary organ

Target of a full-development run, 2026-08-30. Kevin's naming, verbatim from
this session: *"the skin is the boundary of whats contained.. It's job is
kinda link washing dishes, and excreting metabolites that are in excess, and
retaining, and routing nutrients to where they serve."* His mark, same
session: *"run full development, build, and route the membrane."*

## What skin is now (measured, RETURN_skin_regather_2026-08-30.md)

Three hardcoded dicts and a string. No file I/O, no input, no refusal path,
no ledger write. One live consumer: `v2_board_data._signs()` takes
`law_summary()` and the board renders it as one caption line. The verbs
Kevin named live elsewhere, unconnected:

- **excrete** — `tools/decisions.py:213` `cmd_compost()`: ages unanswered
  decisions out past a set window, appends `composted` events, deletes nothing.
- **retain** — `nesi/conductor/held_map.py:34` `held_map()`: five named held
  items, each with its site and its gap.
- **route (classify half)** — `nesi/conductor/tension_table.py:76`
  `CATEGORY_MARKERS` + `classify()` + `canon_index()`: sorts the canon into
  organ/nutrient/lens/seed/pollen. Classification only; no destination.

## The design

Skin v1 becomes the one surface that reads the body's flows at the boundary
and produces a **metabolic reading** — plus exactly one acting verb with
teeth. The actuators stay where they are; skin proposes to them and refuses
machine excess itself.

### Reads (live, each guarded, missing organ = empty section)

1. `DECISIONS_OFFERED.jsonl` via `tools/decisions.py`'s own read path —
   open unanswered load, and which of it is past the compost window.
2. `held_map.held_map()` — the retained register, carried through whole.
3. `tension_table.canon_index()` — the five-category sort; the `nutrient`
   group is the routing candidate list.
4. `_INTAKE/promote_ready/` existence + age — necrotic tissue.
5. `gate/data/gate_data.json` staging tray size — digestive load.

### Produces — `metabolic_reading()` returns one dict with four registers

- **EXCESS (excrete-proposals)**: decisions past the window, stale
  promote_ready files. Each entry names the actuator that already owns the
  act (`decisions.py compost`, or Kevin's hand for the folder). Skin never
  composts anything itself.
- **RETAINED**: `held_map()` verbatim.
- **NUTRIENTS (route-proposals)**: for each pattern in the `nutrient`
  category, the EXTENDS edges it already carries and the shared-thread
  neighbors `tension_table.tension()` finds — a named candidate graft site
  per nutrient, proposal only. The felt read on any actual graft is Kevin's.
- **WASH**: the upkeep list — necrotic tissue, count drift between the three
  canon counts (`whole_body.count_definitions()` already defines them).

### Acts — one tooth: `permit(n_new_asks) -> {"permit": bool, ...}`

Fail-closed check any surface can call before putting new asks in front of
Kevin. DENY when open unanswered decision load is already at or past the
brake's own standard (reuses `MAX_TILES = 4` as the reference constant —
one authority per fact). Machine-limiting only, the same law as the brake:
it caps what the machine asks, never what Kevin gets. `decisions.py` keeps
its own brake untouched — `permit()` is for the paths that today have no
brake at all (`gates.py open`, ad-hoc surfaces).

### Ledger — `nesi/conductor/SKIN_LOG.jsonl`, append-only

One line per act: every `permit()` DENY, every metabolic reading that named
excess. Same discipline as gates.py/marks.py: append, never edit, derive
never store.

### Forks, and how each is resolved (with whose authority)

- **What "acting" means** — resolved by Kevin's naming this session:
  metabolic (excrete/retain/route/wash), not gatekeeping crossings.
  Membrane-controller keeps exclusive crossing authority; skin does not
  duplicate it.
- **Mark-at-act vs act-and-log** — resolved from standing precedent, not a
  new ruling: machine-side refusals act-and-log (the brake already does,
  Kevin's 2026-08-06 mark); anything touching Kevin's material is
  propose-only, so the mark question never arises there. Named here so it
  can be overturned by a word from him.
- **Compost, hold, or bounce** — resolved by reuse: excess routes to the
  existing compost mechanism (kept whole in its ledger); retained stays in
  held_map; nothing bounces — no reject-and-return path exists in this
  codebase and skin does not introduce one.

### Boundaries (container edges, stated as lints)

No mark. No cross. No canon write. No compost performed. No cap on anything
Kevin-facing. The board keeps rendering `law_summary()` unchanged — the
existing registers/trickster_detector/law_summary surface stays intact so
both current consumers keep working.
