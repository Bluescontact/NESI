# NESI.exe — REBUILD + SYNC
**Date:** 2026-07-21, 16:2x. **Trigger:** Kevin opened NESI.exe and it looked unchanged after ~24hrs of foundation work — correctly, because the last build (14:51) predated the Composer Cycle Stage 5 work (room.py, nesi_app.py room tab, ~16:05–16:11).

## 1 · What's now in the exe
Everything on disk in nesi/conductor/ and nesi/bench/ as of 16:2x, 2026-07-21 — including today's Composer Cycle Stage 1–5 (room.py, the room tab in nesi_app.py) and whatever else landed in conductor/ today. No source was edited as part of this rebuild — pure snapshot-and-swap, per the confirmed manifest.

## 2 · THE LOAD MODEL — unchanged
Hybrid: PyInstaller onefile code snapshot, live-from-disk data (inbox/staged/marks/mind/config resolve next to the exe). Same as every prior sync.

## 3 · Build record
- Zombie check first: no NESI.exe or NESI_new.exe running before build.
- Built to scratchpad dist (PyInstaller 6.21.0, onefile + windowed, entry `nesi/conductor/nesi_app.py`, 11,174,685 bytes ≈ 11.17MB — consistent with the 11.1–11.2MB range of every prior build).
- Copied to `nesi\` as `NESI_new.exe` so data resolves to the real dirs, launched, and boot-verified: two live processes (bootloader + child) at first check, still two processes with a stable ~43MB working set at the second check ~5s later — same bar as 07-20's syncs.
- Killed the verification instance, backed up the running exe to `nesi\_compost\NESI.exe.bak_2026-07-21_pre-composer-stage5`, then swapped `NESI_new.exe` over `NESI.exe`.

## 4 · Named honestly, not smoothed over
The boot-verify above confirms the window **opens and stays stable** — it does not confirm every tab works. In particular: `bench.py`'s `_import_composer()` and `nesi_app.py`'s new `_import_room()` both resolve their target directory via `Path(__file__).resolve().parents[1] / "bench" / "composer"`. In a PyInstaller onefile build, `__file__` for a directly-specified entry script typically resolves inside the flat extraction root (`sys._MEIPASS`), not inside a nested `conductor/` folder — so this path-based sibling-directory resolution has an open question of whether it actually reaches `bench/composer/room.py` and `composer.py` once frozen, as opposed to only working in dev-mode runs where the real directory tree exists on disk. This gap was not introduced by tonight's rebuild — the same mechanism has been in the exe since composer.py landed 2026-07-20 — and it was not tested here either, for the same reason the Stage 5 build note gave: opening the actual window and clicking tabs needs Kevin's hand, not a headless check. If the bench or room tab errors when clicked, that's the thing to report back — it would mean this path needs an explicit `--add-data` bundle rule, a real source change, not another rebuild.

## 5 · ROLLBACK
`nesi\_compost\NESI.exe.bak_2026-07-21_pre-composer-stage5` — move back over `NESI.exe` to restore the pre-rebuild window. All prior baks (07-16 through 07-21a) still stand in `_compost/`.
