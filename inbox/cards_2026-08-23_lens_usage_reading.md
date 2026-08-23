# CARDS — the lens-usage instrument: what it holds open, 2026-08-23

`tools/lens_usage_check.js` is built, wired into `check_harness.js` as a
second row, and wired into the boot hook. It exists to answer one question
without collapsing it into a verdict: are the six sibling lenses
(`instrument-audit`, `boundary-audit`, `conservation-harness`, `record-audit`,
`authority-check`, `unrouted-gifts`) being reached, or only named — and if
the evidence doesn't settle that, say so as two live readings, not one guess.

---

## 1 · What it does

Scans `MARKS_LOG.jsonl` by raw line text — not a parsed field, the actual
characters on disk — for each lens's own name, and reports a count and a
last-seen date per lens. Nothing about it grades a lens as used or unused.
It surfaces the number and stops, the same way `organ_map` and `sweep_thresholds`
report rather than rule.

## 2 · Why raw text, not the parsed field

One `MARKS_LOG.jsonl` entry names all six lenses in a single mark. Read
through `JSON.parse`, that entry's `mark` field resolves to 49 characters of
a 1167-character line — an unescaped quote in the source data closes the
string early, silently, with no parse error. Searching the raw line instead
means the instrument sees what the file actually holds, not what one
particular way of reading it happens to preserve. Selector honesty (law 6),
applied to a log file instead of a DOM.

## 3 · The reading it returns, and the two states it holds open at once

All six lenses: 1–3 mentions, all dated 2026-08-21 — the day they were
cross-linked to each other. That single number is compatible with two
different real states, and the instrument does not pick between them:

- **A lens that's rarely the subject of Kevin's own words.** `MARKS_LOG.jsonl`
  records marks — per `CLAUDE.md`, "only Kevin's click marks" land there — so
  a session running `boundary-audit` against real material wouldn't add an
  entry unless Kevin commented on it by name.
- **A lens whose real evidence lives somewhere else.** `conservation-harness`'s
  own dated finds — the STATIONS re-routing bug, THE SEATING's 500-word write
  loss — are recorded in `game-craft.md`'s prose, not in `MARKS_LOG.jsonl`.
  This instrument's own count (1x) would look identical whether that lens
  had never fired again or fired constantly and got written up elsewhere.

Both readings are true of the same number. The instrument names both rather
than resolving to whichever is more convenient to report.

## 4 · What would narrow the two readings apart, if that's worth doing

A second pass over dated `nesi/mind/*.md` files (`GATE_*`, `EXTRACTION_*`,
`REGATHER_*`) would catch the second kind of evidence the first pass can't
reach. Not built this round — no single log file, no `ts` field to sort by,
a fuzzier search than this one — and naming it here keeps the option open
without spending the round-trip on it before it's asked for.

---

Your mark:
