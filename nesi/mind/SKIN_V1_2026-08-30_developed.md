# SKIN v1 — the metabolic boundary, developed and built

Full-development run, 2026-08-30. Supersedes
`DRAFT_SKIN_V1_2026-08-30_design.md` (kept whole, layered per convention).
Kevin's naming, verbatim: *"the skin is the boundary of whats contained.. It's
job is kinda link washing dishes, and excreting metabolites that are in
excess, and retaining, and routing nutrients to where they serve."* His mark:
*"run full development, build, and route the membrane."*

## What was built (all live, all verified by running)

1. **`nesi/conductor/skin.py`** — `metabolism()` and four guarded reads.
   v0's surface (`registers()`, `trickster_detector()`, `law_summary()`)
   untouched, so both prior consumers keep working. The reading composes the
   organs that already own each verb — one authority per fact, pointers
   never copies:
   - **excrete** — via `decisions.py`'s own `read_ledger` / `live_offers` /
     `compost_rate` / `compost_start` / `parse_ts`, with `cmd_compost`'s own
     due-arithmetic (measured from the later of offered and clock-start).
     When the clock has never started, `past_window` is `None` and the line
     says so — never a fake zero.
   - **wash** — `promote_ready/` through `held_map.PROMOTE_READY` (one
     authority for the path): file count and oldest age.
   - **retain** — a pointer: `{"register": "held_map.held_map()", "items": n}`.
   - **route** — each `nutrient`-category pattern with its own declared
     EXTENDS edges, every entry flagged `category_proposal: True` (matching
     `build_index`'s own flag — the category is provisional, Kevin's felt
     read is the authority).
   The excess and wash registers each name the actuator that already owns
   the act; retained is a pointer and nutrients a proposal list, so neither
   has an actuator to name. Every register — and the board line itself —
   reports an unreadable organ as "unread", never as a healthy blank
   (verify pass 2 closed the line-level gap the first build had here).
2. **`v2_board_data.py `_signs()`** — one additive key, `metabolism`, in its
   own try/except so a metabolism failure can never cost the law line.
3. **`build_board.py`** — one additive membrane line rendering it.

**Proof of life** (first run, 2026-08-30): *"the membrane reads — 70 asks
standing, 70 past the 7d window · promote_ready holds 8 file(s), oldest 57d —
wash · 25 nutrient(s), 1 with declared graft edges"* — rendered at
`nesi/board.html:189` after `build_board.regenerate()`. The ask-load and
promote_ready facts were not on the board before; the nutrient count already
appeared as a category chip — what's new in that third fact is the
declared-graft-edges half.

## What the destructive stages killed, and the rulings

**Audit (14 defects) + ground (4 counterexamples) — every one ruled:**

- **`permit()` CUT** (audit 2/4/5/6/7/10; ground 1a). It was the one verb
  Kevin didn't name; its claimed act-and-log precedent was false (the brake's
  DENY paths print and return, they never log); it had no reachable caller;
  and wiring it into `gates.py open` would reverse that file's own recorded
  choice ("This WARNS and still writes — it is not a refusal, because
  deciding what counts as a fork is not this script's call",
  `tools/gates.py:80-81`). This also resolved the audit/ground collision:
  ground wanted the wire-in, audit showed the wire-in reverses a documented
  decision — cutting satisfies both.
- **Shared-thread neighbor routing HELD, not built** (audit 3, ground 4).
  `tension()` takes an already-chosen set; neighbor-finding would need
  combinatorial selection, which tension_table's own charter closes
  ("Membrane-seeds are un-searchable by combinatorics; found only by play" —
  the module's charter prose, standing on Kevin's 2026-07-24 mark "Build the
  graft before any self-organizing forest"). EXTENDS edges are real parsed
  data and ship; the neighbor idea waits on Kevin's play at the tension
  surface.
- **`SKIN_LOG.jsonl` CUT** (audit 9) — a ledger nothing reads fails the
  instrument-audit law; "derive never store" was being worn backwards.
- **Count-drift item CUT** (audit 11) — it quietly performed
  `whole_body.count_definitions()`'s explicitly deferred reconciliation
  candidate without a mark.
- **Tray read CUT** (audit 12) — held_map already reads it; retained is a
  pointer, not a copy (ground 3).
- **The dead-seam law honored** (ground 1a/1b): both new capabilities shipped
  WITH their consumer in the same change — `metabolism()`'s viewer is the
  board line, wired the same day. This codebase measured twice that the
  difference between an organ and a description is exactly one caller.
- **Proposal-graveyard answered structurally** (ground 2): the reading lands
  on the surface Kevin already looks at, and each register carries its
  actuator command verbatim — no new proposal channel, no new answer verb.
- **Fabricated-precedent defect accepted in full** (audit 1): the
  mark-at-act vs act-and-log fork was NOT resolved by this build and is
  returned to Kevin (below).

**Diverge (3 shapes):** Shape B (radically smaller, consumer-first) chosen as
chassis; Shape C's distributed limbs rejected for losing nameability (the
gate admits things, not diffs); Shape A rejected — its only tooth was the
unnamed verb, and it couples into the brake block.

## The forks that are Kevin's, named and left open

1. **The tooth.** Does skin ever get a refusing verb at all? His naming
   (wash/excrete/retain/route) contains none. Nothing was built.
2. **If yes — mark-at-moment or act-and-log?** No settled precedent exists
   in the codebase to borrow (the brake acts without logging; the
   membrane-controller denies by standing rule). His read at the membrane.
3. **Any global-load ceiling number** is his to set — `MAX_TILES` measures a
   different quantity (tiles per offer batch) and was not borrowed.
4. **Shared-thread nutrient routing** — held until his play on the tension
   surface, per his own 2026-07-24 mark.

## Container edges (lints)

No mark. No cross. No canon write. No compost performed. No refusal anywhere.
No cap on anything Kevin-facing. `gates.py` and `decisions.py` untouched.
Unreadable organ = "unread", never zero.
