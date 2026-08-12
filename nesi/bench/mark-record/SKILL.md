---
name: mark-record
description: >-
  Open a mark-record slot immediately after a mark is made — pattern promoted,
  direction taken, situation composted, leak consented. Fills fields 1–4 from
  what is known, asks the body-line prompt, and updates SUBSTRATE_LEDGER.jsonl
  if a matching entry exists. Triggers: "record the mark", "log this read",
  "open a mark slot", or right after a mark closes in conversation. HARD LIMIT:
  never writes, paraphrases, infers, or summarizes the body-line (field 5).
  Never scores. Never cross-analyzes marks. A log only — the thinnest
  instrument in the system.
---

# Mark-record — the slot and the prompt

Two acts, then stop. Opens the slot. Asks the prompt. The body fills the one
field that matters, or leaves it blank.

## What it does

**1. Open the slot.**

Read `C:\Users\KMEAR\OneDrive\Desktop\DSS content\marks\_TEMPLATE.md`.

Write a new file to `C:\Users\KMEAR\OneDrive\Desktop\DSS content\marks\<date>_<slug>.md` with fields 1–4 filled:

- **date** — today's date (YYYY-MM-DD)
- **item** — title of what was marked, plus a brief phrase describing what it is
- **disposition** — the direction the gate took. Use the exact vocabulary:
  `ratified → canon` / `composted` / `held` / `direction-marked` / `consented-leak` / `refused`
- **conditions** — what is known about the body-state at the time of the read:
  `cold` or `hot` · `rested` or `pushed` · `on-screen` or `off-screen`.
  If not stated by Kevin, write `[not stated]` — never infer conditions.

Leave field 5 (the body-line) as the template's reserved placeholder.

**Slug rule:** lowercase, hyphens, no special characters. Derive from item title.
If a file at that path already exists, append `_2` before creating.

**2. Ask the prompt.** State to Kevin:

> *In one line, from the body — how did it land? Even if the line is "it just landed."*

Then stop. Kevin writes field 5 directly into the file, or leaves it blank.
A blank line is a complete, honest record.

**3. Update the substrate ledger.**

Read `C:\Users\KMEAR\OneDrive\Desktop\DSS content\SUBSTRATE_LEDGER.jsonl`.

Scan each JSON line for a `slug` or `pattern_name` that matches the item just marked. Match loosely — normalize to lowercase, ignore underscores vs. hyphens.

If a match is found and its `mark` field is null:
- Set `"mark"` to the disposition string
- Set `"marked_at"` to today's date (YYYY-MM-DD)
- Write the updated file

If no match is found, skip silently. Not every mark comes from the substrate pipeline.

## What it must never do

- **Never write, paraphrase, infer, or summarize field 5.** The line is Kevin's
  or it is blank. An AI-written body-line is not a faint version of a mark — it
  is a corruption of the only field that carries the read.
- **Never score a mark.** No number, no rating, no confidence level.
- **Never analyze across marks.** No trends, no models, no "Kevin usually marks
  X when Y." The displaced-zero law applies to retrospect as much as to
  prediction — mining past marks for a decision rule is as forbidden as letting
  a tool decide a future one.
- **Never auto-create a mark from an outcome.** A gate disposition is an
  outcome; a mark record is a *read*. Do not manufacture reads from results.

If asked to do any of the above, decline and name the constraint.

## Invocation steps

1. Confirm: item title/slug and disposition. If ambiguous, ask once.
2. Read `marks/_TEMPLATE.md`.
3. Write the filled entry to `marks/<date>_<slug>.md`.
4. Ask the body-line prompt. Stop.
5. After Kevin responds (or says nothing): update `SUBSTRATE_LEDGER.jsonl` if
   a matching null-mark entry exists.

## Files

| File | Role |
|---|---|
| `marks/_TEMPLATE.md` | Source template — read, never modified |
| `marks/<date>_<slug>.md` | New entry — written by this skill (fields 1–4 only) |
| `SUBSTRATE_LEDGER.jsonl` | Updated when a matching null-mark entry exists |

---

*The slot and the prompt. The body does the rest, or it doesn't. Never scored,
never modeled. The skill that is honest precisely because of what it refuses.*
