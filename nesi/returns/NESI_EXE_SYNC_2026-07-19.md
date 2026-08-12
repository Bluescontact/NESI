# NESI EXE SYNC — delta return · 2026-07-19
**Status:** DONE. Rebuild only, no relight. Old exe archived before swap; rollback intact.

## 1 · NOW LIVE (in the running window, after your next double-click)
- **The anchor seam (Mark 5).** HOLD in the window now asks once for an optional anchor tag (until-date / when-file; blank or cancel = felt hold, exactly the old behavior); anchored holds ride the staged object + ledger line; the return circuit scans NESI staged holds alongside gate_data. No anchors exist yet, so the circuit's silence is correct.
- **The composted duplicate's absence.** The bundled code no longer contains conductor.py at all — the surviving `core.py` uncross is the only copy in the running window, byte-unchanged (verified pre-build).

## 2 · THE LOAD MODEL — stated plainly
**Hybrid, and it's the right split.** The **code** is a bundled snapshot (PyInstaller onefile — every .py is baked in at build time; that's why the seam needed this rebuild). The **data** is live-from-disk (the frozen-path logic resolves inbox/staged/marks/mind/config next to the exe, so reflexes.md's Mark 3 fix and the _compost moves were already live for anything read at runtime). Net: Mark 3 and Mark 6's on-disk reality were live before the rebuild; Mark 5's compiled seam and conductor.py's removal from the bundle are newly live. No load-model change made or needed — no fork to stage.

## 3 · STILL DARK / STILL HELD
- Mark 1 — engine dark; no login attempted; stubs still loudly `STUB` (negative test: engine selection code untouched, staged objects still badge the fallback).
- Cold-start — still blocked on Mark 1, stated not faked.
- Mark 2 — fork untouched; core.py uncross byte-for-byte as it stood (checked by source inspection before the build).
- Marks 7 · 8 · 10 — as held last pass.

## 4 · VERIFICATION RECORD (§4, before swap)
- Headless smoke: all seven modules import; `record_mark(sid, verdict, condition=None)` signature present; uncross source intact (CANON/FOLDED/rebuild_index_sync all present); live return-circuit scan silent.
- Zombie check first (lesson of 07-16/17): no NESI.exe running before build or swap.
- Built alongside (scratchpad dist, 11.1MB), copied to nesi\ as NESI_new.exe so data resolved to the real dirs, **boot-verified live** (window process up ~8s), stopped clean, then swapped.
- Anchor-dialog click-through in the window is the one thing only your hand can finish — first HOLD you make will show the one optional prompt.

## 5 · ROLLBACK
`nesi\_compost\NESI.exe.bak_2026-07-19_pre-anchor-seam` — move back over NESI.exe to restore the pre-seam window. (Prior baks from 07-16/17 also stand in _compost.)

## NEW MARKS
None surfaced. Standing ones unchanged: necropsy burials ×3 · M5 sheet ×12 · Mark 2 fork · Mark 8 screen · engine go-live.
