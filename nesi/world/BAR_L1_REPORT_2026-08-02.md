# BUILD REPORT — THE BAR, Level 1 (scatter only)

**Built:** 2026-08-02, on Kevin's mark ("Go - build Level 1 of the intake bar as manifested… Verify with a real browser click-through and report what ran and what did not").
**File:** `nesi/world/logbook.html` — extended, not replaced.
**Governing ruling (same turn):** *"Each sentence deposits into a tile, punctuation fires the deposit.. so a user could build a paragraph and drop it as a whole thought."*

---

## 1 · WHAT WAS BUILT

**Two surfaces on one page, switched by a button pair, neither hidden from the other's data.**

- **THE BAR** (new, default) — a single-line input. Punctuation fires the deposit; the sentence becomes a tile and the bar clears.
- **THE PAGE** (the original textarea + word gauge + GENERATE) — unchanged behaviour, still there, still yours.

Both write to the same store. A stone cut from the page and a sentence dropped from the bar sit on the same board and travel to the Shore identically.

**The thought strip.** Sentences dropped consecutively are held as one open *thought*, shown under the bar with a running join of its text. Two controls: **⇩ drop as one thought** replaces the run's individual tiles with a single tile carrying the whole paragraph verbatim, in order, at the first tile's position; **start a new thought** closes the run without merging. This is the second half of the ruling — deposit granularity, chosen by you, not machine grouping. The machine never proposes what to merge.

**The board.** A 2000×1400 scroll surface. Tiles auto-place on a spread so a new one never lands under the last, and every tile is draggable. Positions save on drop and survive reload. **The machine never moves a tile after it lands** — `scatter the board` is the one exception and only runs when you click it.

**The lake readout.** A gauge showing total words into the intake against the 1000-word step, per §7e of THE WHOLE NAMING (the lake updates every 1000 words of intake). Readout only — nothing regenerates yet, because nothing downstream is built to receive it.

**The store.** Entries are `{text, ts, x, y, src, whole?}` in `nesi_world_stones` — the same key `shore_stones.gd` already reads. It takes `text` and ignores the rest, so board positions ride along without a schema change and without touching any Godot script.

---

## 2 · WHAT ACTUALLY RAN — real browser click-through

Opened in a real browser, clicked, typed, dragged. Not read, not reasoned about — run.

| Checked | Result |
|---|---|
| localStorage available on `file://` | ok |
| Clicked the bar, typed `Two flashlights in a foggy night.` | tile created, bar cleared, store written, thought opened at 1 sentence |
| Typed four sentences of mixed punctuation (`.` `?` `!`) plus a trailing fragment in one burst | **4 separate tiles**, one per sentence; the fragment stayed in the bar |
| `⇩ drop as one thought` | 4 tiles → 1 tile, text joined verbatim in order, `whole: true`, positioned at the first tile's spot, thought closed |
| Dragged a tile (real pointer events) | moved to 190/106; store updated to the same coordinates |
| Reloaded the page | tile survived at 190/106; surface choice remembered |
| Console errors | none |
| `stones.json` payload shape | `{format, exported, stones:[{text,…}]}` — matches what `shore_stones.gd` parses |
| THE PAGE path: typed two paragraphs, clicked GENERATE | 2 stones cut verbatim, joined the same board, note rendered correctly |
| Test data | cleared afterwards — the board starts empty |

**One real bug was found by running it and is fixed.** The first version only fired when punctuation was the *last* character in the bar. Under fast input two sentences landed in a single tile. Rewritten: on every input the bar takes everything up to the **last** punctuation mark as complete, cuts it at each mark so every sentence gets its own tile, and leaves the unfinished remainder in the bar. This holds for fast typing and for pasted text. A bare `.` or `...` with no letter or digit drops nothing.

---

## 3 · WHAT DID NOT RUN — the edge of verification

- **The round-trip to the Shore was not executed end to end.** The payload shape was verified against `shore_stones.gd`'s parser, but the world's local server was not running, so no stone was actually placed and walked to in the 3D world. The `place stones in the world` code path is byte-for-byte the one that was already working before this build — untouched — but this session did not watch a bar-written sentence become a stone on the Shore.
- **No screenshot.** The Browser pane was not displayed, so the compositor returned no frames. Everything above was verified through the DOM and the store, which is stronger evidence than a picture for state — but the *look* of the board has not been seen by anyone.
- **Long-pile behaviour is untested.** A day of sentence-granularity writing will produce far more tiles than the paragraph path ever did. The board holds 7 columns × ~11 rows before tiles start stacking beyond the 1400px height, and the Shore's own spacing rule (1.3 m, 240 probe attempts per stone) was written for paragraph counts. Neither has been tested at scale.
- **Levels 2–4 are not built.** No pairing, grouping, merging, weaving, wires, conditions display, or level gating. Scatter only, as manifested.

---

## 4 · THE GUARD, HELD

Punctuation is inspected for one purpose: to find where a sentence ends. Nothing else about the text is parsed, scored, summarised, classified, grouped, or retained beyond the text itself. Tile bodies are written with `textContent`, never `innerHTML` — your words render as your words. No network calls; the only outbound path is the pre-existing localhost drop, unchanged. Everything is retained until processed.

---

## 5 · THE TWO CLAIMS, SPLIT

**The mechanism works.** Verified by running it: sentences deposit on punctuation, each gets its own tile, a run collapses into one whole thought on your click, tiles drag and stay where you put them across reloads, both surfaces feed one store, and the payload the Shore reads is unchanged in shape.

**Whether it does what you needed** is not something this report can say. You have not typed a real sentence into it yet.

**The door:** `nesi/world/logbook.html`
