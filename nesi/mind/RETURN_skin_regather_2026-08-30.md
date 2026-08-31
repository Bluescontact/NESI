# RETURN — skin, from read-only to acting (regather, no build, no design)

Read, unmodified: [nesi/conductor/skin.py](nesi/conductor/skin.py),
[nesi/conductor/tension_table.py](nesi/conductor/tension_table.py),
[nesi/conductor/whole_body.py](nesi/conductor/whole_body.py),
[tools/gates.py](tools/gates.py), and — because the "rate brake" the prompt
named turned out to live somewhere else — [tools/decisions.py](tools/decisions.py).
Everything below is what is actually on disk right now.

---

## 1. What skin currently reads, and where the read comes from

`skin.py` reads nothing external. `REGISTERS` is a hardcoded dict literal in
the file itself — three entries (`offering`, `defense`, `absence`), each a
label/law/canon-list/status. `registers()` returns that dict verbatim.
`trickster_detector()` returns a second hardcoded dict (always `"status":
"HOLD"`, `"since": "2026-07-01"`). `law_summary()` returns a hardcoded string.

There is no call into `tension_table.canon_index()` from inside `skin.py`,
and no call into `skin.py` from inside `tension_table.py`. The two modules
are siblings, not caller/callee — `skin.py` doesn't read the canon at all;
`tension_table.py` reads `patterns/*.md` off disk (via `core.CANON`) and
computes its category index independently. Whatever "skin's read" means in
practice, it is bounded to these three static dicts — no file I/O, no gate
read, no marks read, no engine call. The docstring says this directly:
"It does not perform anything: no engine call, no marks, no decisions."

## 2. Every place skin's output is consumed

Two call sites in the whole tree, both read-only, both display-only:

- **`whole_body.py:102-109`** (`assemble_close()`) — imports `skin`, calls
  `skin.law_summary()`, `skin.registers()`, `skin.trickster_detector()`, and
  bundles them into a `"skin"` key of the stage-6 close payload. But
  `assemble_close()` itself has **no caller anywhere in the codebase** except
  its own `if __name__ == "__main__"` block (verified by grep — the only
  hits on `assemble_close` are its definition and that print line). It is a
  script you run by hand; nothing wires its output anywhere.

- **`v2_board_data.py:91-95`** (`_signs()`) — imports `skin`, calls
  `skin.law_summary()` only (not `registers()` or `trickster_detector()`),
  and puts the string under `out["skin_law"]`. This one **is** live: `_signs()`
  feeds `collect()`, which `nesi/build_board.py:392-393` calls, which renders
  into the board HTML at `build_board.py:435-436` as a single line of text:
  `"the membrane holds — {skin_law}"`. This is the one path where a human
  (Kevin, reading the board) actually sees something skin produced.

`held_map.py:50` also *mentions* `skin.trickster_detector()` in a note string
(prose, not a call) — it names the function as the place to look, doesn't
invoke it.

So: skin's output is consumed in exactly one live path, and that path is pure
display — a sentence rendered into a static HTML board. Nothing reads
`registers()` or `trickster_detector()` live. Nothing branches on skin's
output, gates on it, or acts differently because of what it returns.

## 3. Existing hook, event, or call site where an action could attach

None exists inside `skin.py` itself — no event bus, no callback registry, no
return value that anything currently branches on. The nearest actual seam in
the codebase is not in skin at all: it's `tools/decisions.py`'s `cmd_offer()`
(see §4), which is a real call site other code paths use to *ask* Kevin
something and get a durable answer back through `MARKS_LOG.jsonl`. If skin
were to "act," the only existing plumbing that already knows how to turn a
finding into a question-with-consequence is that one function — nothing in
`skin.py`, `tension_table.py`, or `whole_body.py` has anything resembling it.
Concretely: no, there is no seam already sitting in skin waiting to be used.
One would need to be built.

## 4. Skin vs. the rate brake, in code terms

The "rate brake" is `tools/decisions.py:329-364`, inside `cmd_offer()` — not
`tools/gates.py` (that file is `OPEN_GATES.jsonl`, an append-only ledger of
open questions with `open`/`close`/`status` subcommands; it has no cap, no
refusal logic, no brake of any kind — it just logs and derives a count).

What the real brake has, concretely:

- **A hard numeric ceiling**, `MAX_TILES = 4` (line 72), checked against
  live input (`len(payload) > MAX_TILES`) — an actual `if` that can fire.
- **A `return 1`** — the function refuses and exits nonzero. Callers get a
  real failure, not a logged note.
- **A second, independent refusal condition**: it also denies if the same
  surface already has unanswered prior offers (`live_offers(ledger)`),
  checked against the ledger on disk, not a cached count.
- **An escape hatch that is itself gated**, `--no-brake`, present but
  documented in its own help text as something to never use to route around
  Kevin being behind.
- **A durable ledger on both sides of the transaction**: `cmd_offer` appends
  to `DECISIONS_OFFERED.jsonl` before anything downstream can act on it, and
  `cmd_answer` (line ~571-581) writes the resolved answer to
  `MARKS_LOG.jsonl` before anything downstream can act on *that* — the mark
  is durable before it has consequence.

What skin structurally lacks, item for item:

- No numeric ceiling anywhere — nothing in `skin.py` counts or compares
  against a threshold.
- No `return`/refusal path — every function in `skin.py` returns a
  dict unconditionally; there is no branch that can deny anything, because
  there is nothing being requested of it in the first place.
- No ledger write. Skin never appends to any `.jsonl`, never touches
  `MARKS_LOG.jsonl` or `DECISIONS_OFFERED.jsonl` or `OPEN_GATES.jsonl`.
  Nothing it returns is durable — call it twice, get the same static dict
  twice, nothing recorded either time.
- No live input to brake against. The rate brake exists because
  `cmd_offer` receives a payload from *outside* (a JSON file of proposed
  decisions) and must decide whether to let that payload through. Skin
  receives no input at all — `registers()`, `trickster_detector()`, and
  `law_summary()` take no arguments. There is nothing arriving for a brake
  to meter.

In short: the rate brake is a gate with a threshold, a refusal, and a
ledger, sitting on a path where something already flows toward Kevin. Skin
is a source with no ledger, no threshold, and (per §2) a display sink one
step downstream of it. The brake and skin aren't different maturities of the
same mechanism — they're built for different jobs. The brake meters
already-flowing requests; skin, today, has no flow to meter.

## 5. Forks raised, named and not resolved

- **What would "acting" even mean for a boundary organ?** Candidates the
  code doesn't currently choose between: block a crossing before it
  completes (like `membrane-controller`'s fail-close write authority),
  refuse a write (would need a write path to intercept — skin has none
  today), or surface a forced choice (the `decisions.py` shape — a tile with
  options, going through the brake). Nothing in `skin.py` favors one of
  these; the module doesn't currently touch any of the three verbs (block,
  refuse, surface).

- **Does an act need Kevin's mark at the moment of acting, or can it act and
  log for later review?** The two existing patterns in this codebase pull in
  opposite directions: `membrane-controller` is fail-close and acts (denies)
  without waiting on Kevin per-instance, using a standing rule instead of a
  per-event mark. `decisions.py`'s brake also acts without a per-instance
  mark (the `MAX_TILES` check fires on its own) — but what it protects
  *leads to* a mark (the tile, once through, waits on Kevin's answer). So
  even inside this one small codebase there isn't a single settled answer to
  borrow from; skin's forks would need Kevin's read at the membrane, per this
  prompt's own framing, not a default lifted from a sibling mechanism.

- **What happens to something skin blocks — compost, hold, or bounce back to
  the sender?** All three have working precedent elsewhere in this tree
  (`decisions.py compost`, ages out unanswered tiles into a "composted" event
  but keeps them in the ledger; `held_map.py` names things explicitly held,
  never resolved, never dropped; nothing in the current codebase "bounces"
  anything back to a sender — there's no reject-and-return path anywhere
  grepped). Skin has none of the three built, and nothing in its file states
  a preference.

No resolution is offered on any of the above — per the ask, this stays a
regather.
