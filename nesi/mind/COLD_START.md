# NESI COLD START — settled ground · sealed 2026-07-19
**Read this after PROTOCOLS.md. Everything below is LAW at open — do not re-derive, do not re-audit, do not re-litigate. Superseded only by a newer seal or Kevin's mark.**
**Provenance:** `nesi/returns/NESI_SEAL_2026-07-19.md` (session dfb45409; bird's-eye → realign build pass → exe sync → seal).

## Settled ground
1. **Window is current.** NESI.exe rebuilt, boot-verified, swapped 2026-07-19. Rollback: `_compost\NESI.exe.bak_2026-07-19_pre-anchor-seam`.
2. **Anchor seam is live in the running window.** First HOLD asks once for an optional anchor (`until YYYY-MM-DD` / `when file:<path> exists`); blank = felt hold, unchanged. Return circuit scans NESI staged holds; writes nothing.
3. **Load model is hybrid — not a fork.** Code is a bundled snapshot (code changes need a rebuild + backup-to-_compost); data is live-from-disk.
4. **Engine is dark by choice (Mark 1 HELD).** Stubs badged loudly; cold-start test blocked on Mark 1 — state it, never fake it. **Framing corrected (Kevin, 2026-07-19): "there is no sign in" — NESI is a local .exe gated by the user's own desktop; NESI itself has no login, no lock, ever.** The one-time vendor auth (`claude /login`) is the ENGINE's own plumbing behind the socket — required only for the real engine to answer, never a gate on NESI. Speak of Mark 1 as "plugging the motor in," not "signing in to NESI."
5. **Mark 2 RESOLVED — the law was raised (Kevin's mark 2026-07-19: "keep undo, update the rules").** `uncross` is the ratified fourth Kevin-only verb (rollback-with-record, its own path in core.py); `correction` is a ledger annotation, not a mark. Vocabulary updated in ARTIFACT_GRAMMAR.md, ORGAN_CONTEXT.md, and core.py's comment. No code behavior changed.
6. **Ordering settled (Kevin, 2026-07-19): rules before power.** D2 = settle-first, done. D3 = the engine is NOT being plugged in yet — per Kevin's elevator sequence (captured in `mind/seed_construction_language.md`): rails to the top first, then cables and motor, then the cab. The stub is the false car on a temp motor — a construction phase, not debt.

## The board (open marks — Kevin's, not the engine's)
- **Held:** Mark 1 engine go-live (deliberately — the rails aren't done to the top) · Mark 7 seed/ stands as the named empty socket · Mark 8 booking-membrane feedstock (Kevin screens; `_INTAKE/2026-07-18_nesi_vision_booking_membrane.md`) · Mark 10 no queue cull (felt-read 17 > threshold 15 stands).
- **Open sheets:** necropsy burials ×3 — `returns/NECROPSY_2026-07-19.md` · M5 placements ×12 — `returns/M5_PLACEMENT_SHEET_2026-07-19.md`.
- **One open live-verify (Kevin's hand only):** one hold in the window to confirm the anchor dialog fires once, blank stays felt. Record the result; do not automate or prompt for it.

---

## ADDENDUM — sealed close of 2026-07-19, late (supersedes the board above where they differ)
- **No sign-in, ever** — Kevin's law: NESI is desktop-gated; vendor auth is engine plumbing, not a NESI gate.
- **Marks are a toggle** — core.unmark() + ↺ un-mark in the window; exe rebuilt+swapped (rollback: `_compost\NESI.exe.bak_2026-07-19_pre-mark-toggle`). Hand-test open.
- **Construction language CANON** (lines 1·2·3·5 in seed_construction_language.md); lines 4+6 held. **Five STANDING_SPEC.md files** in bench/ dirs — all five organs marked stands; bench's plumb gap = unmarked M5 sheet.
- **Elevator sequence is the build order** — rails to the top before the motor; stub = false car, a construction phase.
- **Substrate run on the bench's held center:** brief at `_INTAKE/SUBSTRATE_BRIEF_bench-center-2026-07-19.md` — 4 HOLDs with named conditions; 1 pattern **CROSSED to canon** ("Confession at the Call Site" → section of patterns/extend_dont_invent_name_the_wall.md; record: membrane/transition_records/crossing1_2026-07-19_confession_at_the_call_site.json).
- **The bench's CENTER is the standing open mark** — A spec-writer / B held-thing forge / C gift-forge / one-bench-three-modes; no decay clock by Kevin's implicit hold. Do not choose it; surface it when ripe.
- Riders unchanged: M5 ×12 · necropsy ×3 · window hand-test · 4 ledger test-lines · felt-read 17>15 · Marks 7/8/10 held.
