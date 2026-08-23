---
name: project-nesi-gift-workspace-navigator
description: "2026-07-23: NESI got a real wired local face (no login), ran its first real metabolization on local hermes3, and the gift architecture resolved — NESI navigates to the win-win, the gift fires between people. Build-forward handoff ready."
metadata:
  type: project
---

> **■ TENSION NAMED, 2026-08-20** — reconciled via the process-geometry lens:
> this file already labels THE NAVIGATOR REFRAME below "unmarked" in its own
> header, which is honest — the violation isn't a mislabel, it's that an
> admittedly-unmarked idea was still used to de-scope the whole two-person
> build (the master shape's crossing beat requires the human's mark to be
> what authorizes an act with real consequences, not just to be present
> somewhere in the record). Nothing here rules whether NESI is a navigator
> or a gift medium — that's still Kevin's. Left standing, not struck; a
> different, older subsystem than tonight's session.

**Session 2026-07-23 — the night NESI got a face and a resolved gift architecture.** Long, hard session; the honest outcomes:

**LOCAL ENGINE (the center lit, locally).** `nesi/conductor/engine_local.py` — a no-login local articulation engine (stdlib urllib → Ollama `hermes3:8b`, `format:json`), registered into the real seam (`core._ARTICULATE_ENGINES["local"]`) and **persisted into `core.py`** (self-registers on import; `current_engine()` now defaults to `local`, no override). **First real metabolization ran** end-to-end (5 dispositions on a real pile, record: `nesi/returns/FIRST_LOCAL_METABOLIZATION_2026-07-23.md`). Honest read: the socket is the win; hermes3:8b is shallow — swappable later (bigger local model, or Claude once its login bug clears — same socket).

**THE LOGIN FIGHT → resolved by going LOCAL.** The `/login` loop was diagnosed twice (persistent `ANTHROPIC_BASE_URL=localhost:8787` cleared; then a Firefox/OAuth bounce that never resolved). Upstream boundary Kevin named: NESI is a socket by design; the login is on ONE socket (headless CLI). The desktop-app auth doesn't propagate to a spawned `claude` (tested: "Not logged in"). **Resolution: NESI runs on local hermes3, no login, no cloud, no cost.** The Claude subscription stays a future upgrade. See [[reference_claude_login_loop_fix]].

**THE NESI FACE — built + wired (this is the big one).** Kevin: "build the thing I can see and touch," then "wire this face onto the exe and the local engine." Built: `nesi/NESI_surface.html` (calm, intuitive; modes **feed · map · chat · sort · library**; cards open/expand/collapse; map nodes connect/sever; localStorage fallback) + `nesi/conductor/surface_bridge.py` (js-api → real disk: `capture_paste`→inbox, `state`→list, `metabolize`→local engine, `record_mark`→gate keep/hold/compost NOT cross, `library.build_index`→109 patterns, chat→hermes3 server-side no-CORS) + `nesi/conductor/surface_app.py` (pywebview native window) + `launch_nesi_surface.bat`. **Wiring proven headlessly** (feed→real file, list→9 real items, chat→live hermes3 reply) then launched as a real window. This is NESI's real face, local-first, wired to disk + engine, no login. (The old tkinter 9-tab NESI.exe is superseded direction — the rough first draft Kevin correctly saw didn't match any of the designs.)

**THE AUDIT** (`nesi/returns/NESI_AUDIT_2026-07-23.md`): hard deps now **all local** (Ollama/hermes3, python, disk; no cloud/login/API). Canon has a real fail-closed integrity floor (`canon_write` single chokepoint + `guard_audit`) — **proven clean: 103 checked, 0 off-path.** I over-called a "deepdive off-path canon write" breach and **retracted it** (canon edits are refused in place / R2 close). 6 open gift gaps; 5 generative structures composed from canon.

**THE RECEIVED-GIFT CIRCUIT** developed (`_INTAKE/SUBSTRATE_BRIEF_received-gift-circuit_2026-07-23.md`): reception is a **four-station loop** — LOAD (giver's no) · APERTURE (receiver's no on a witnessing surface — the gap) · CROSSING (between two functioning nos) · CLOSE (giver's own witness). It's the bilateral `boundary_ask` itself flagged as available. Disposition: promote-ready with the untested-station-2 caveat carried.

**THE NAVIGATOR REFRAME (load-bearing, canon-candidate, unmarked).** Kevin's crystallization: **NESI is the navigator to the win-win, not the gift medium; the gift circuit fires between two people, structured by the frame, and completes WITHOUT recognition** (the upstream boundary closes it — no thank-you needed). This **de-scopes the whole two-person build**: not NESI-as-served-multi-tenant-mediator (the audit's "total rebuild" that "does not exist"), but **two local sovereign NESI instances + one THIN shared website face**, with the **frame-declaration** ("step in, take everything, no cost, no debt") = the circuit's station 2, built as the emailed-login entry. **Resolves M3** (host a 2nd person? yes, but not by hosting — they run their own instance). Design: `RETURN_gift_workspace_navigator_2026-07-23.md`. **Build-forward handoff + the 7 CONNECT edges + the paste-ready next-session prompt:** `nesi/returns/BUILD_FORWARD_gift_workspace_2026-07-23.md`.

**OPEN MARKS (Kevin's gate, none crossed):** (1) the navigator reframe → canon; (2) the Received-Gift Circuit → cross (or hold for one live frame-declaration); (3) CONNECT → ratify the 7 edges + settle capability-link-vs-account. **Next stage:** CONNECT, then LIMIT, then build the thin website face. Related: [[project_nesi]], [[project_recursive_object]], [[feedback_load_test_build_gate]], [[feedback_ai_holds_direction_on_closeout]].
