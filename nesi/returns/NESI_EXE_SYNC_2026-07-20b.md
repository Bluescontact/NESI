# NESI EXE SYNC — delta return · 2026-07-20b (session 3/3)

**Status:** DONE. Rebuild only, no relight. Old exe archived before swap; rollback intact.

## 1 · NOW LIVE (in the running window, after your next double-click)
- **The reader (session 3, new).** Reachable through the bench tab's "break" button — press it on a working object and the notes area shows the reader's own findings (passive voice, drift against marks.jsonl, load paths), uncomfortable-first.
- **The preflight badge (session 3, new).** A small line under the engine status at the top of the window — "preflight: both sign-offs seam-clean" (or names which one isn't, in red, if not). Runs once on boot, off the UI thread. Structural check only; confirmed it makes no live call in this session's build verification.
- Sessions 1 and 2's wiring (open-reach, broadened Move B/C, bench type tag) — unchanged, still live from the prior swap.

## 2 · THE LOAD MODEL — unchanged
Hybrid: PyInstaller onefile code snapshot, live-from-disk data. Same as 07-19 and 07-20a.

## 3 · STILL DARK / STILL HELD
- Mark 1 — engine dark; no login attempted; every stub still loudly `STUB`.
- Cold-start — still blocked on Mark 1.
- Felt-read queue — still 18, three sessions naming it now, still unread.
- The engine-agnostic unit's literal shape (metabolizer merge vs. leave-as-second-implementation) — marked in ENGINE_SOCKET.md, genuinely yours to ratify.
- Bench's `_ENGINE_OPS` table still has no `claude-cli` entry — login alone does not make bench go live; that's a separate later step.

## 4 · VERIFICATION RECORD (before swap)
- Headless smoke, this session: `preflight.check()`, `reader.read()`, `bench.run_break()` (now delegating to the reader), `interrogator.check_reader()`, `front.handle()` end to end — all run against real files, engine dark, correct output, no regressions across sessions 1/2's work.
- Zombie check first: no NESI.exe running before build or swap.
- Built to scratchpad dist (PyInstaller 6.21.0, onefile + windowed, 11.2MB), copied to nesi\ as NESI_new.exe, launched and polled three times within a single check (8s, two live processes, ~41MB working set, stable) — the first launch attempt looked like it vanished between separate checks, which was cross-invocation process cleanup in the build environment, not a crash; re-verified with all checks inside one window before trusting it. Then swapped in.

## 5 · ROLLBACK
`nesi\_compost\NESI.exe.bak_2026-07-20_pre-reader-seam` — move back over NESI.exe to restore the pre-session-3 window. All prior baks (07-16 through 07-20a) still stand in `_compost/`.

## NEW MARKS
None surfaced by the build itself. Standing ones unchanged: necropsy burials ×3 · M5 sheet ×12 · Mark 2 fork · Mark 8 screen · engine go-live (`/login`, Kevin's hand) · felt-read queue read · bench type-table review · the engine-agnostic unit's literal shape.
