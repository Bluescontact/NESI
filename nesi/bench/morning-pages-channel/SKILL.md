---
name: morning-pages-channel
description: >-
  The drop path for Kevin's morning pages (750-words). The metabolizer harvests
  WORK-OBJECTS ONLY — tasks, tensions, build-notes, ideas — into dispositions
  and GATE entries. THE GUARD, AS LAW: the system never analyzes the writer. No
  mood tracking, no themes-across-mornings, no sentiment, no reflection of inner
  state back to Kevin, no retention of raw text outside a gated zone his delete
  controls. The pages feed the system; the system never reads the writer. Use to
  process a morning-pages drop. Violating the guard is a build failure, the same
  class as adding an approve button to the GATE.
---

# Morning-pages channel — the body's rawest input, walled

*Instrument-class. A one-way valve: Kevin writes the words he already writes;
the system takes only the work out of them and is structurally blind to the
person in them. This is the displaced-zero guard applied to the rawest channel
in the system.*

---

## THE GUARD — written verbatim as law *(non-negotiable; violation = build failure)*

> **The system never analyzes the writer. No mood tracking. No
> themes-across-mornings. No sentiment. No reflection of inner state back to
> Kevin. No retention of raw text outside a gated zone his delete controls.
> The pages feed the system; the system never reads the writer.**

If any output from this skill contains a mood read, a sentiment, a "Kevin
seems…", a pattern-across-days, or a reflection of inner state — stop, delete
that output, and re-run from step 3. This is the same class of failure as
adding an approve button to the gate. The wall is what keeps the channel honest.

---

## Base path

`C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

## Procedure

### Step 0 — Read config

Read `rhythm/config.json`. Confirm:
- `drop_path.mode` — must not be `null` (fail-closed: if null, stop and tell Kevin the channel is inactive; don't proceed).
- `retention.raw_pages` — must not be `null` (fail-closed: if null, stop).
- `drop_path.file_dir` — the inbox folder (`rhythm/pages_inbox` by default).

### Step 1 — Find the drop file

List files in `{drop_path.file_dir}`. If the folder is empty, state: "No pages in
the inbox." Stop cleanly — no error, no nagging.

If multiple files are present, process the oldest (by modification time) first.
Name the file being processed.

### Step 2 — Apply the guard before reading

Before reading the file content, state the guard explicitly in your reasoning:
*"Extracting work-objects only. The writer is not in scope."*

Then read the file. Do not summarize, describe, or comment on tone, register,
mood, energy, or style. The file is a work-object source, not a text to be
read.

### Step 3 — Extract work-objects only

Walk the file. Extract **only** these four categories — and nothing about the writer:

| Category | Extract when | Example |
|---|---|---|
| **Task** | a thing to do named explicitly | "email David re: contract" |
| **Tension** | an unresolved pull the writer named | "still holding the nursery decision" |
| **Build-note** | a design thought, a spec fragment | "gate needs a subtraction mode" |
| **Idea** | a candidate worth staging | "what if the circuit tool had a host view" |
| **Ground-fact** | a plain fact about physical location, vehicle, or equipment status | "bus needs an oil change", "motorcycle still waiting on the VIN inspection", "landed in California" |

Ambiguous items: if you cannot tell which category, use **Tension** (the most
honest of the catch-alls — something unresolved worth tracking). If you cannot
tell whether it is a work-object at all, skip it silently. When in doubt, skip.

**Ground-fact guard, same wall, applied here too:** a Ground-fact is a fact
about the world — where Kevin is, what the bus or the bike needs — never a
report of how that fact feels. "The bus needs an oil change" is a Ground-fact.
"The bus is exhausting me" is emotional content and does not get extracted, in
either category. If a sentence mixes a fact with a feeling, take only the
factual residue ("still slow on hills" is fine; "I'm so tired of how slow this
thing is" is not — skip the feeling, and if nothing factual survives, skip the
line entirely).

**Do not extract:** emotional content, observations about the writer's state,
framings of Kevin's inner life, the narrative structure of the pages, themes,
or anything that isn't a discrete task/tension/idea/build-note. The writer is
left on the page.

### Step 4 — Emit the work-object list

Output a plain table:

```
| # | category | work-object (verbatim or minimal paraphrase) |
|---|---|---|
```

One row per item. The paraphrase must be the most neutral possible restatement
of the work-object — never a reading of the writer. If the item is already
one line, use it verbatim.

Count: N work-objects extracted from {filename}.

### Step 5 — Run the metabolizer on the work-object list

Invoke `skills/metabolizer` on the **Task / Tension / Build-note / Idea** rows
only (not the raw pages, and not the Ground-facts — those have their own
track, Step 5b). The metabolizer produces:
- A disposition table (one of: `still-open → GATE` / `zero-unset → tray` /
  `folded-into [parent]` / `superseded-by [item]` / `RESTORE`).
- A staged GATE_DATA delta at `gate/data/_delta_{date}_pages.json`.

Pass the work-object list, not the raw pages content, to the metabolizer.
The metabolizer never sees the pages — only the extracted work-objects.

### Step 5b — Write Ground-facts directly, no gate, no mark

Ground-facts do not go through the metabolizer or the gate — they are not
proposals awaiting Kevin's disposition, they are plain updates to a standing
record of where he is and what his vehicles need, the same class of thing as
a mark-record backfill. If any Ground-fact rows were extracted in Step 3:

1. Read `memory/project_current_ground.md` (the Claude Code memory file, not
   a DSS-tree file — path is under the `.claude/projects/.../memory/` tree
   for this project).
2. Update it in place: replace stale facts the new rows supersede, append
   genuinely new ones, keep the file's existing structure and links. Do not
   rewrite it wholesale — edit only what the new Ground-facts touch.
3. Add or update a line: `**Last updated from morning pages:** {date}.`
4. If no `project_current_ground.md` exists yet, this step does not create
   the whole memory system — state that no ground record exists and skip
   silently rather than inventing one from a single pages run.

This step writes a plain fact, not an interpretation. If a Ground-fact row is
ambiguous about whether it supersedes or adds to an existing line, prefer
appending a dated note over silently overwriting — the file is a running
ground record, not a single current-state snapshot.

### Step 6 — Handle retention

Read `retention.raw_pages` from config:

- `shred_after_harvest` — delete the processed file from `{file_dir}` immediately
  after the metabolizer completes. Confirm deletion. No copy kept.
- `gated_zone_until_delete` — move the file to `rhythm/_pages_gated/`. It rests
  there under Kevin's delete only. No process reads it again.
- `keep_7_days` — move to `rhythm/_pages_gated/`. A rolling 7-day window; files
  older than 7 days are deleted on the next run. Check and remove stale files.

Default is `shred_after_harvest` (per Kevin's mark 2026-06-09).

### Step 7 — Hand off

State in five lines:
1. File processed + item count extracted (work-objects and Ground-facts, counted separately).
2. Retention action taken (deleted / moved to gated zone).
3. Delta location.
4. Ground-facts written to `project_current_ground.md`, or "no Ground-facts this run."
5. "The writer was not read." — this line is non-negotiable. It is the
   receipted close of the guard.

---

## What this skill never does

- Never summarizes the pages as a document.
- Never reflects mood, tone, energy, or state back to Kevin.
- Never retains a copy of the raw text outside the gated zone.
- Never builds patterns across multiple pages runs.
- Never marks anything — staging only. The gate-holder applies and marks.

---

## Files

| Path | Role |
|---|---|
| `rhythm/config.json` | Config: drop path, retention mode |
| `rhythm/pages_inbox/` | Drop zone (file mode) — Kevin drops here |
| `rhythm/_pages_gated/` | Gated zone — Kevin's delete controls this |
| `gate/data/gate_data.json` | Read by metabolizer for current state |
| `gate/data/_delta_{date}_pages.json` | Staged delta — not applied until Kevin marks |
| `memory/project_current_ground.md` | Ground-facts write here directly (Step 5b) — no gate, no mark, plain fact record |

---

*The pages feed the system; the system never reads the writer. The wall is the
feature. The reaching is not the mark.*
