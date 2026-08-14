# THE WRITING FACES — what already exists

**Search run 2026-08-14 on Kevin's ask:** *"search past work sessions for
everythgin that could potentially be a contribution to the design and execution
of the writing faces."*

**The headline, and it is not comfortable:** the writing faces have been built
**twice before**, once to a shipped and exported executable with a 26/26 harness
and screenshots read. Tonight's `level_one.html` reinvented a thinner version of
them without opening either. Everything below is on disk now, runnable or
readable, and none of it was written this session.

---

## 1 · THE FOUR FACES ARE ALREADY NAMED, AND I USED THE WRONG NAMES

`nesi/THE_MAP_2026-08-11.html:76` — Kevin's own map:

> **The writing tetra, vertex down.** You are the bottom vertex. The text is the
> water, rising from your point. Four faces, the intake's own: **THE TABLE**
> (centre — it touches all three) · **BLIND · TILES · SEQUENTIAL** (at your
> corner). No vertex is named; the centre of the form stays un-nameable.

Same four in `counsel/fuller/READ_reference_shelf_2026-08-12.md:37`,
`inbox/seed_2026-08-11/nesithemap_restyle.html:233`, and `nesi.html:432`.

| the corpus | what I built tonight |
|---|---|
| BLIND | BLIND ✓ |
| SEQUENTIAL | SEQUENTIAL ✓ |
| **TILES** | I called it **THE SCATTER** |
| **THE TABLE** — the centre, touching all three | I called it **THE TETRA** and made it an empty completion state |

**THE TABLE is not a fourth wall — it is the centre**, and it is the merged
surface where every source sits together. Making it a blank "three faces are
done" marker threw away the one face that does the work.

---

## 2 · THE TWO BUILDS THAT EXIST

### `nesi/world2d/` — Godot, shipped, walked, exported

`scripts/writing_main.gd:2` —
> **THE INTAKE — the opening surface. Nothing precedes it.** One continuous
> surface, four sources on it: SELF (the band, top), GIVEN and FETCHED (the
> quarried-rock panes, left), and THE TABLE (the merged surface, everything
> together, source legible on every tile).
>
> **BLIND hides everything below the band** — each sentence leaves as it is
> finished and nothing accumulates in view. **TILES shows the table.**
> **THE TARP opens over the table as the sorting surface and folds back.**

`THE_LATENT_PASS_2026-08-10.md` records it exported to `export/NESI.exe`
(109 MB, packed 20:59), **26/26 harness checks, run twice**, with the walkable
set screenshotted: *the intake blind · TILES with GIVEN/FETCHED and MERGE/JOIN ·
THE TARP laid and folded · SEQUENTIAL with the Ctrl+Enter deposit · hold through
reload · THE WORLD through the door.*

### `nesi/game2d/nesi.html` — the gated file

Lines 432–540 and 2249, 2306 carry the same four faces in HTML, with the band
cut, the watermark, and the sitting-close. **Behind its integrity gate since
2026-08-11 and not opened by this search beyond reading.**

### `nesi/game2d/world.html` — 1,495 lines, "unreachable from the door"

Carries the band cut **character-for-character from nesi.html:342-358**, the
watermark, and the returning day. The counsel has flagged this file as
unreachable three times. **It is where the daily loop mechanics already live.**

---

## 3 · MECHANICS THAT EXIST AND ARE NOT IN WHAT I BUILT TONIGHT

Ranked by what they'd contribute to the daily surface.

### THE HELD ARRIVAL — `writing_store.gd:140`
> An edit made on one face **does not silently become the sentence everywhere.**
> It is held on the stone as an offer — the face it was made on shows it as its
> reading; every other face shows the standing text with the arrival highlighted
> and attached. **TAKING it is his click on another face**, and only that click
> settles the body. No timer, no auto-accept, no machine acknowledgement — an
> arrival that is never taken simply stays held, **because held is lawful.**

The single best mechanic in the corpus for multi-face writing, and neither
`level_one.html` nor `daily.html` has it.

### THE WATERMARK — `BUILD_RECORD.md:302`, live in `world.html`
> The page is never cleared; banked text stays visible and the watermark moves
> past it. **Deletion never un-banks** — editing behind the watermark…

And `BUILD_RECORD.md:4801`: *deleting past the watermark un-banks nothing · a
returning day opens showing the [page] quiet.*

**This is the safety property `daily.html` is missing.** Today the day's text is
one blob; a hand that selects-all and deletes loses the day. A watermark makes
banking irreversible and deletion harmless — the writing cannot be taken back by
accident. `BUILD_RECORD.md:2334` names it *"the only irreversible transfer in the
game"* and flags it as a floor breach needing disclosure — so it arrives with its
own open question attached.

### THE BAND CUT — `world.html:472`, from `nesi.html:342-358`
A `.!?…` completes a sentence and it banks **live, at the keystroke**, by the
band's exact cut. Carried character-for-character between two files already.
Tonight's `sentences()` is a weaker re-derivation of the same rule.

### DRAG-MERGE, SEAMS, AND NO UNMERGE — `writing_table.gd`
> **THE TABLE** — every source together. Drag a tile and it stays; drop it onto
> another and they **merge, in written order, seams kept**. Click a tile to edit,
> discard, label, link, or send it on. · *"LINK — click the other tile to tie
> them."*

Plus a **seams pane**: every part of a merged stone, in written order, verbatim.
A merged stone **stays in the bank staged "merged"**, so a merge could be taken
apart later — and **no unmerge control exists**, deliberately: *"whether a merge
can be undone is unmarked and is Kevin's."* An open fork already held, with the
data preserved so either answer stays possible.

### FOUR SOURCES, NOT ONE — `writing_main.gd:4`
SELF · GIVEN · FETCHED · TABLE, **source legible on every tile**. The GIVEN lane
is how another person's material enters *by Kevin's own paste* — and the latent
pass names why there is no automatic feed: *"an automatic feed would put a
machine sorter on the path law 5 reserves for the operator's hand; the absence of
one is the design."* This bears directly on the still-open field-between-people
fork.

### THE TARP — laid and folded, screenshotted
A sorting surface that opens **over** the table and folds back. Eight rim regions
staged (`BUILD_RECORD.md:3217`).

---

## 4 · WHAT THIS MEANS FOR WHAT IS RUNNING NOW

- `daily.html` (built tonight, now the door) has: the pour, water rising, the
  quiet, the ground, the line, one store. It does **not** have the watermark, the
  band cut, held arrivals, tiles, the table, or sources.
- `level_one.html` (built tonight) reimplements BLIND and SEQUENTIAL more thinly
  than `world2d` already had them, and renames two faces.
- **The nearest complete thing is `world2d`**, and it is a Godot build — the tree
  the 3D retirement did *not* cover, since that mark named `world3d`. `world2d`'s
  status was never ruled.

**Nothing here is a proposal.** It is what exists, where it is, and what it does.

---

## 5 · THE FORKS THIS SEARCH SURFACES — not defaulted

1. **What is `nesi/world2d`?** It ships an exe with the faces built and walked.
   `world3d` was retired by name; `world2d` never was. Live tree, retired tree,
   or salvage source?
2. **Do the corpus names stand?** TILES and THE TABLE, or the names I used
   tonight? The map is Kevin's own and predates mine.
3. **The watermark's floor breach** — `BUILD_RECORD.md:2334` already names it as
   the only irreversible transfer and says the cost must be visible. Adopting it
   means adopting that question.
4. **`world.html` unreachable.** It holds the band cut and the watermark and
   nothing routes to it.

---

## 6 · THE HONEST NOTE

`feedback_check_corpus_before_proposing_builds` exists in memory precisely for
this, and it was not run before building the writing faces tonight. Two prior
implementations, one of them exported and harness-proven, were sitting on disk.
The build is not wasted — `daily.html` does something neither prior build does,
which is open on the day and hold it whole with no cap. But the faces themselves
did not need reinventing, and the mechanics above are better than what I wrote.
