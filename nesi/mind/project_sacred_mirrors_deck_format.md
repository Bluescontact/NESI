---
name: project-sacred-mirrors-deck-format
description: Location and spec of the recovered Sacred Mirrors affirmation-deck sticker generator — format source for new 48-card decks
metadata: 
  node_type: memory
  type: project
  originSessionId: 68d153df-cc61-4203-9274-a5a371023d2a
---

The old affirmation-deck format lives at `C:\Users\KMEAR\Downloads\sacred_mirrors_generator.html` — not anywhere in the DSS content archive (a 2026-07-17 search of DSS content turned up no spec file; see [[project_intake_triage_2026-07-15]] lineage). It is a working single-file HTML generator, not just notes.

**Spec it carries:**
- Font: Bree Serif (Google Font), same face both layers.
- Visible sticker sheet: 11in × 8.5in landscape, 12 per page (2×6 grid), cell 5.25in × 1.29in. Affirmation text sits high (top 25% of cell, not centered) — leaves a lower band open for the hidden layer to glow through under backlight. 14px, weight 600, letter-spacing 0.08em.
- Hidden sticker sheet: 8.5in × 11in portrait, clear sticker stock, 24 per page (2×12 grid), cell 3.9in × 0.854in. Centered text, 16px, weight 600, same letter-spacing.
- Numbering: "N of total" on both layers, matched index-to-index for hand assembly.
- Dollar bill layer: NOT in the generator — that's a third, physical layer assembled by hand underneath the clear sticker. Consistent with Kevin's 2026-05-22 note (`_INTAKE\abandoned_intentions\_candidates_raw.txt` line 16) not to burn compute on the sticker/physical-assembly side.
- Old dataset: 96 v/h pairs grouped into 8 named "layers" of 12 (Foundation → Source), a progression arc. New 48-card decks need a fresh DATA array (and likely new LAYERS labels) — reuse the file as-is, only swap content.

**How to apply:** for any new affirmation deck request, this file is the format source — copy it, replace DATA/LAYERS, keep font/sizing/grid untouched unless Kevin explicitly asks to change the physical format.

**2026-07-17 build (COMPLETE):** Essence of the Gift v2 — 48 pairs, 4 layers of 12 (differentiation/connection/boundaries/architecture), composted from 5 recovered decks (~320 pairs, extraction from claude.ai). Print file built and verified: `decks\essence_of_the_gift_v2\essence_v2_generator.html`. Candidate file with provenance + change log: `_INTAKE\candidate_48_essence_v2_2026-07-17.md`; feedstock: `_INTAKE\affirmation_deck_feedstock_2026-07-17.md`. Rule adopted: hidden line ≤ ~5 plain words (single line on clear-stock cell). Open edges: 3 visible lines flagged long/abstract (cards 22, 45, 48); Deck 5 "Recognition Series" pairs 9-24 unrecovered (live in claude.ai chat "Reviving the coherence app concept for GitHub") — bench challengers for a future rev.

**2026-07-18 mark (RATIFIED):** deck's four movements and NESI's four tensegrity members = the SAME quartet. Deck = assembly order, NESI = standing structure — resolves the AoC-simultaneous vs deck-sequential contradiction (tensegrities are built in sequence, stand all-at-once). Mark record: `marks\2026-07-18_same-quartet-tensegrity-reconciliation.md` (body-line reserved). Next hop: substrate write-up (must carry a named falsifier), then membrane crossing at Kevin's mark — neither run yet. Related open: deck 8+4 falsifier question staged in gate queue (3rd recurrence). See [[project_nesi]].
