# TRIBUTARY · headless Chrome `--screenshot` — a rendered frame of the live page

Brought to the gate 2026-08-16. Running elsewhere, unjoined.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — the browser already on this machine, run with no window, told
to paint one frame of the running page and write it to a PNG. It answers the
three sessions that ended **UNWITNESSED** because the pane would not composite.

**That it runs** — verified twice in this session against the live build, not
claimed from a README. Chrome at
`C:\Program Files\Google\Chrome\Application\chrome.exe`, already installed.
Edge is present as a second implementation of the same flag. License: n/a —
nothing is added to the repo.

```
chrome --headless=new --disable-gpu --virtual-time-budget=15000 \
       --window-size=1280,800 --hide-scrollbars \
       --screenshot=<ABSOLUTE PATH> http://localhost:8811/nesi/game2d/daily.html

→ 15290 bytes written · PNG 1280x800 8-bit RGB
→ read back with the Read tool: sky band, water band, ground band, and the
  caret standing in the writing field
```

**Two findings from the runs, both load-bearing:**
- **The budget is the whole trick.** At `--virtual-time-budget=4000` the frame
  is background only — the page had not finished painting. At `15000` the caret
  is there. A short budget produces a frame that looks like a broken page and
  is not one. Any instrument built on this must state its budget.
- **The path must be absolute.** A relative `--screenshot=shot.png` fails with
  `Access is denied` and still exits as though it ran.

**Honest scope limit, stated rather than buried:** this captures a **load
state, not a walk.** It does not drive input. The verification bar as amended
asks for both — *drive the running page through real input events and assert on
what it actually reports* — and this card answers only the second half, the
witnessing. Driving through real events needs CDP or a driver, and the obvious
candidate there (Playwright) was **refused at RETENTION**: a rented package plus
a downloaded browser binary, re-fetched on every machine, in a build that has
never taken a dependency.

**The lens**
- LIGHT/HEAVY — heavy layer held by: **Kevin**, the browser is already on his disk. Survives loss of network: **yes**, once the local server is serving
- RETENTION   — vendorable: **nothing to vendor**. If abandoned tomorrow: every PNG already taken remains, and any Chromium substitutes with the same flag
- TISSUE      — **a command line**, not a framework. Adapter size: one `spawnSync`
- SEED        — runs today: two runs above, this session, on the live `daily.html`

**The mouth** — `nesi/game2d/tools/check_all.js :: the instrument register` —
it already prints three in-page instruments as *not covered by this run*.
A `frame_check.js` alongside `door_check.js` would move them into coverage.
There is no `package.json` and no `node_modules` in this build; this adds
neither.

**Shortest slice**
```
way in      → node tools/check_all.js
act         → the run reaches a surface it previously could only assert about
consequence → a PNG on disk, read back, and a session that can end WALKABLE
              with a seen frame instead of WALKABLE with a numeric assertion
```

**What it displaces** — WANTED item W1. Traced to three recorded endings:
*"UNWITNESSED — the pane would not composite"* (MARKS_LOG 2026-08-14, twice) and
*"the browser could not be screenshotted this pass"* (BUILD_RECORD, the door
into the ascent). If marked, the figure's *look* stops being asserted
numerically across five window sizes and starts being seen.

**The cost of carrying it** — a Chrome path hardcoded or discovered, and a
budget number that is a real parameter with a real failure mode. What Kevin now
has to understand: a short budget lies, and the lie looks like a bug in his
page.

**Reading** — capacity H · routing effort L · confidence H

────────────────────────────────────────

Your mark:
