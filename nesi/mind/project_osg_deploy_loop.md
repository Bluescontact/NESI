---
name: project_osg_deploy_loop
description: "The page-by-page deploy loop for oursharedgifts.org — where the clone is, that push works, and the two-gate rhythm"
metadata: 
  node_type: memory
  type: project
  originSessionId: b3f28df9-a47c-480b-a214-e6f86f7728a3
---

The OSG site rebuild runs as a **page-by-page loop** (started 2026-06-09): sync → read live page → audit (5-question integration test) → **propose (gate 1)** → produce → show diff (review) → **push on Kevin's mark (gate 2)** → verify remote HEAD.

Mechanics that cost rediscovery:
- **Deploy clone:** `C:\Users\KMEAR\Desktop\DSS content\oursharedgifts-deploy` — note *plain* Desktop, NOT the OneDrive Desktop where the working dir lives. Remote `origin` = github.com/Bluescontact/oursharedgifts, branch `main`, GH Pages deploys `main`.
- **Push works:** Git Credential Manager is wired at system level (`C:/Program Files/Git/etc/gitconfig`), so commit+push to the deployed repo succeed non-interactively. `gh` is NOT installed.
- **Always re-sync first** (`git -C <repo> fetch; git -C <repo> merge --ff-only origin/main`) — the clone drifts behind the remote between sessions. There's also a `v5-visual` branch on the remote.
- Kevin keeps **untracked `library/*.md` files** in the clone — stage only the specific page file per commit; never `git add .`.

Both gates are Kevin's: the proposal before writing, the push before deploy ([[feedback_publish_delete_boundary]]). Live site source is truth — read the synced clone or raw.githubusercontent (WebFetch's summarizing model mangles verbatim reads). Site map and per-page protocol come from the swarm directive. **Canonical power spec (use verbatim on any page): 2.6 kW solar (six 440 W panels, nameplate) · 15 kWh battery · 10 kW split-phase inverter · expanding toward ten panels.** Note: inverters are kW not kWh — that unit bug appeared on the-model + current and is now fixed.

Pages cleared 2026-06-09 (audit + push): `index`, `offerings`, `about`, `the-model`, `current`.

**2026-06-10 — the unified build is staged as local commit `f1332e5` (NOT pushed; gate 2 open).** Kevin's directive ("oursharedgifts.org — The Unified Build") executed in one pass: one 10-item nav on all 67 pages (Archive retired from nav, absorbed into Library index); Refusals got its depth layer back (the 37 refusals recovered from `git show 851aef8~1:refusals.html`, re-seated under a site-wide `.depth-gate` descent device, now also on the-model); Toolkits index rewritten as parts shelf + **`toolkits/GOVERNANCE.md`** (Tri-Layer Governance Stack compiled from `coherence-codex/` — note it derives from AoC **v2**, which otherwise hasn't crossed the gate; flagged in NEW_PROSE.md for Kevin's call); Library index rewritten in surface voice; **Leaflet self-hosted** at `assets/vendor/leaflet/` (unpkg gone; OSM tiles remain, flagged). Deliverables at repo root: `AUDIT.md`, `NEW_PROSE.md` (all new writing for Kevin's review), `MAINTENANCE.md`; `_source/` (gitignored) holds pre-transform copies. Still deferred: `noindex` still on all of /library/ — coherent but unmarked, flagged. See [[project_osg_v5_resynthesis]] for what's deployed.

**2026-06-10, later — unified build pushed (f1332e5, live); visual layer staged as `888ba1c` (push = Kevin's gate).** Note: Kevin's first push attempt of f1332e5 silently didn't land (remote still at old tip); I completed it on his stated intent and verified via ls-remote — **always verify his pushes with `git ls-remote origin main`**, his local "git push" reports can be from the wrong directory. The visual layer: `VISUAL_SYSTEM.md` at repo root is the spec Kevin marked (three reading speeds: glance/skim/read; five elements: glance figure, seed line, depth zone, scale map, weight-as-access). Demo was refusals.html, then site-wide. All `.dev.png` re-encoded to `.jpg` (~90% lighter, the-model 7.7 MB→764 KB; `.dev.png` originals still in repo until Kevin retires them); contrast fix --faint #999→#75716a. The Model deviation: inline bolds kept, no seed extraction (canon restraint). New CSS primitives in core.css: `.seed`, `.depth-zone`, `.glance`, `.glance-strip`, `.scale-map`.

**2026-06-14 — Wheatland → Grass Valley location sweep (NOT pushed; Kevin's gate).** All "Wheatland" references removed from 7 pages (index, about, the-model, offerings, request, current, host-the-bus). Created `assets/js/location.js` — contains `var SITE_LOCATION = 'Grass Valley'`; all location display text wrapped in `<span class="site-loc">` so JS fills it on load. **To move location in future: change one line in `location.js` and push.** Title/OG meta tags in index.html are hardcoded (2 lines, manual update needed there). `current.html` date updated to 2026-06-14.
