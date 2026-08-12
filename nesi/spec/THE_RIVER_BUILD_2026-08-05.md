# BUILD REPORT — the four thresholds and the two intakes

**Built 2026-08-05** from `THE_RIVER_AND_THE_DAM_2026-08-05.md`, on Kevin's naming, caught in `MARKS_LOG.jsonl` before anything was acted on.
**Files:** `nesi/_world_template.html` (edited — the template, never the generated file) → `nesi/THE_WORLD.html` (rebuilt, 77,230 bytes).
**Verified by running it** over HTTP on `localhost:8220`, driving the real code paths. Not read, not reasoned about.

---

## 1 · WHAT WAS BUILT

**THE FOUR THRESHOLDS.** The single `DRAW = 110` is gone. `STAGES = [200, 500, 750, 1000]`, in Kevin's words:

| words | opens | mechanically |
|---|---|---|
| **200** | *a limited world* | you lift · the ground draws only within 340 units of you |
| **500** | *a landscape* | reach goes to the horizon — all terrain draws |
| **750** | *the whole world and tools* | the four apex diamonds appear; `1`–`4` and `W` begin to answer |
| **1000** | *the heliostat* | it appears at the basin and turns to face the deposit's centre of mass |

**THE PEN IS NEVER CLOSED.** A world that lifts you at 200 words and then takes the pen away can never reach 500 — the first build did exactly that and it was caught by running it, not by reading it. **Escape** now opens and closes the headwaters from anywhere, at any stage. On close, what you wrote is deposited and the pen clears — the same behaviour the Bar already has. The pen is the source, not a tool, and is the one thing here that is never gated.

**THE SECOND INTAKE — THE QUARRY.** A paste into the pen is intercepted before it becomes your words. It goes to `nesi.quarry.v1` and enters the world at the quarry face as **ROCK**: square-edged, drawn as cut, sitting on the surface, not settling. **The wash breaks it.** Each break cuts the rock at its own punctuation into **GRAVEL** — every piece kept, joined back it is byte-for-byte the original. Gravel then moves with the river like deposit, drawn greyer and smaller, keeping its edges.

**The guard this builds in structurally:** pasted material **never counts toward the four thresholds**. Verified: 1020 words written, one paste of 22 words, count still 1020. Nothing from outside opens your world, and nothing pasted in becomes bedrock by arriving.

---

## 2 · WHAT ACTUALLY RAN

| ran | result |
|---|---|
| Boot on an empty store | stage −1 · prior 0 · not afloat |
| Type 210 words | **stage 0** · afloat · tools closed · reach 340 — a limited world |
| Escape, write 300 more, Escape | prior **510** · **stage 1** · reach unlimited — a landscape · tools still closed |
| Again, +250 | prior **760** · **stage 2** · **tools open** · apex diamonds display `flex` |
| Again, +260 | prior **1020** · **stage 3** · **heliostat open** · 115 particles settled |
| No double counting | prior tracked the store exactly at every step: 210 → 510 → 760 → 1020 |
| Paste 22 words of external text | **1 rock** at the face · pen stayed empty · quarry store 1 · **word count unchanged at 1020** |
| `W` — the wash | rock broke into **4 gravel pieces**: *"This came from somewhere else."* · *"It was cut by another hand,"* · *"and it arrives whole."* · *"It cannot settle until it is broken."* — rejoined, byte-for-byte the original |
| Test data | cleared |

---

## 3 · THE EDGE OF WHAT WAS CHECKED

- **Nothing here was seen.** Every result above is state read out of the running page, which is stronger evidence than a picture for state — but the *look* of a limited world, a landscape, gravel in the river, or the heliostat turning has not been seen by anyone.
- **The wash is frame-rate dependent, and the preview pane throttles.** Rock broke on its own during a wash, but slowly — the background tab ran roughly 2 frames a second. This is pre-existing (`erode(wash)` has always run per frame) and is now visible because the quarry rides the same clock. Not fixed, and named.
- **`file://` not exercised.** Run over HTTP. Kevin's own use is usually `file://`, a different localStorage origin — same code path, different store.
- **The dam and the river are not places yet.** §2 and §3 of the naming need a course and a site in the 3D world. What is built is the mechanism: water rising behind a threshold, and material carried down it.
- **Deep water is not built.** "Born new each day from the deep waters of what was composted" rests on the open question of what *composted* points at on disk — and the container work already found that compost is three unrelated jobs wearing one name.

---

## 4 · THE TWO CLAIMS, SPLIT

**The mechanism works.** Four thresholds fire at exactly 200 / 500 / 750 / 1000 of your own words; the pen stays reachable so they can be crossed; external material arrives as rock, is never counted as yours, and breaks into gravel that keeps its edges.

**Whether it does what you needed** is not something this report can say. No one has written a real sentence into it.
