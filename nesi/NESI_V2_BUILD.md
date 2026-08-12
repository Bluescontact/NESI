# NESI v2 — the build spec (the game that is your synthetic boundary)

**Status:** building, in passes. Kevin's GO 2026-07-25 (session 8e4c3011), reconciled.
**Home of the whole:** `nesi/NESI.md` (the locator). This file is the build's own map — the
complete design + what each pass does. Open it to see where the rebuild stands.

---

## The three laws (govern everything)

1. **The mechanic never does the recognizing.** No score, rank, or verdict — the felt-read is
   the player's; NESI only holds still while they see. (`patterns/the_recognition_law.md`)
2. **The surface speaks game, not framework — and the geometry is *visible*.**
   *Correction folded in 2026-07-25 (overrides the earlier "geometry under the floor"):* the
   geometry is **the visible visual layer** that makes the interface intuitive — the grove, the
   pulse, the shapes are the board you see and move on; the shape does the explaining prose used
   to. **Only the framework *language* stays unspoken** (the words "tetra-body", "jitterbug",
   "vector-equilibrium", "substrate", "membrane"). Rule of thumb: **show the shape, speak plainly.**
   The membrane must also **reduce cognitive burden** and stay **high-signal / low-noise**.
3. **Nothing proceeds on veto (added 2026-07-25, Kevin's restoration mark).** A build pass that
   reaches something touching a mark — a gate, a law, a canon file — stops and returns the fork
   *unmoved*. It does not act-pending-veto. The default is: nothing proceeds until Kevin spends
   capacity to start it, never: something proceeds until Kevin spends capacity to stop it. Same
   discipline extends to pacing: no new pass begins until the prior pass's marks are cleared —
   Kevin's decision rate is the actual tempo of construction, not the AI's generation rate.
   Provenance: generation rate outran mark rate for five days running (the felt-read queue read
   "23" unmoved 2026-07-20 through 2026-07-25) while output — a 54-file triage, a 58-pattern
   hold-clearing pass, three migration passes in a day, a full organ inventory, a game spec, a
   doctrine, a board — accelerated with no corresponding increase in marks. That gap does not
   vanish; it routes around Kevin as decisions made by default, by terrain, or by whoever is
   holding the keyboard. This law closes that route.

**The binding truth:** NESI becomes Kevin's **synthetic boundary** — he does not negotiate in
the traditional sense; the membrane does the boundary-work. The Held-Refusal doctrine
(`held_refusal/DOCTRINE.md`) is the **law of the membrane**, not a bolt-on. The map *is* NESI.

---

## The organism — one body, four strata (the pulse threads all of it)

- **THE PULSE — the jitterbug.** The four processes (metabolize · gate · ledger · continuity)
  ARE the collapsed-tetra ↔ expanded-vector-equilibrium transition, threaded through the organs
  as infrastructure — **kept, re-seen, never fenced off or deleted** (verified-foundation law).
  Lives in `nesi/conductor/core.py`, `MARKS_LOG.jsonl`, `continuity`.
- **THE SOIL — where what comes in composts.** Intake (Kevin's + external) breaks down to
  substrate; the fallow round composts inward (boundary FALLOW). The bed the forest grows from.
- **THE FOREST — the gift library.** Composted substrate grows into gifts (grove: trunk · leaf ·
  graft). **The warm ones** — *name pending Kevin's pick (Embers / Sparks / Coals / his own)* —
  live here as grown things you pick up, not documents you read. Kept score-free by law 1.
- **THE SHARED COORDINATION SURFACE — the way in from outside.** Others drop intake into Kevin's
  NESI; it runs the Held-Refusal play so Kevin doesn't negotiate person-to-person:
  published edges · negative space the sender fills themselves · the three instruments
  (gift / mutual / exchange) · no-convert · loop-on-two-marks · minimal disclosure.
  **This is what makes NESI the boundary.** The largest new build.

---

## Open, held by Kevin (not the AI's to close)

- **The name of the warm ones** — Kevin's felt-read pick (Embers recommended). Placeholder until picked.
- **The outside-person gate** — whether/when a *real* outside person is let through the
  coordination surface is Kevin's mark. The AI builds the surface + its law, never the decision to open it.

---

## The pass plan (build in passes; bring Kevin the machine, not forks)

- **Pass 1 (this session):** back up the old machine to `nesi/_compost/necropsy_2026-07-25/`
  (recoverable, nothing erased); write this spec; build the **coordination surface** as real,
  headless-testable code (`nesi/conductor/coordination_surface.py`) applying the Held-Refusal law.
- **Pass 2 (DONE 2026-07-25):** the **soil** (`nesi/conductor/soil.py` — compost + FALLOW +
  Kevin's gate on external admit; 6/6) and the **forest** (`nesi/conductor/forest.py` — grow ·
  grove-no-ranking · pick-up-no-debt; 7/7) as real modules. End-to-end integration PASS:
  coordination → gate → soil → forest → given, all laws holding.
- **Pass 3 (first cut DONE 2026-07-25):** the visible **board** → `nesi/board.html`. Game words on
  top (NESI · the pile · the way in · embers · pick up · hand it over · no score); the **geometry is
  the interface** — the organism drawn as one shape: soil band, the pulse breathing at the heart
  (tetra↔VE), the forest with **embers** glowing where they grew (click → pick up → hand over, given/no
  debt), the way-in at the edge. Reads the forest's embers (baked in this cut; live-read seam for pass 4).
  **Surface tech decision (holds direction, veto-able):** the board is HTML/SVG, not tkinter — because
  "geometry visible as the intuitive interface" needs a rendered surface. This **supersedes the v1
  'no web layer' mark for the SURFACE only** (the pulse/engine stay Python). Flagged as friction.
  Name: **the warm ones = embers** (Kevin's pick).
- **Pass 4 (DONE 2026-07-25):** the **wire** → `nesi/build_board.py` regenerates `board.html` from
  the LIVE forest store (verified: the 3 real embers render, not baked-in). The **runnable machine**
  → `nesi/nesi_v2.py` + `nesi/NESI.bat` (regenerate + open the board; imports + regenerate verified).
  The **package** → `nesi/NESI_v2.exe` (fresh onefile, 7.3MB, PyInstaller build succeeded).
  **The one line I did NOT cross:** I did *not* overwrite/delete the old `nesi/NESI.exe`. The v2 exe
  is the **surface launcher** (opens the visible board — embers · grove · way-in · gate); the old
  exe is the full **metabolizer**. Retiring the old would lose function until the metabolizer engine
  is fused *behind* the v2 board — that fusion is the honest remaining integration. Old exe stays
  (also backed up in `_compost/`); Kevin retires it once v2 carries its function.
  GUI-open of the v2 exe is Kevin's double-click.

**Honest state of NESI v2:** all four strata logic built + verified · the visible board built,
live-wired, and shows the real grove · a runnable launcher + fresh exe. The remaining wire is
fusing the kept metabolizer engine (`core.py`) *behind* the board so a pile metabolizes through the
v2 surface the way it did in the old machine. Not faked done — named.

**Strata state:** PULSE (kept) · SOIL ✓ · FOREST ✓ · COORDINATION SURFACE ✓ — all the *logic*
of NESI v2 is built and verified headlessly. What remains (pass 3–4) is the *visible surface* and
the recompile — the parts only a running window can confirm.

**Falsifier for the whole:** if the rebuilt machine can't open and metabolize a pile across a
sitting the way the old one did, the weave broke the pulse and the compost is reversed from backup.

---

*Building. Nothing crossed to canon. The old machine is backed up and still in place until the
fresh exe is verified.*
