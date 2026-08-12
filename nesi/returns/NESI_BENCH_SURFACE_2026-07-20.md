# NESI — bench as production surface (session 2/3, 2026-07-20)

**Build target:** stand up the bench as the place things get made — intake an intent, pull the load-bearing patterns deterministically, present them as the frame, land a private draft object. draft/break/refine stubbed at the socket. No engine.

## What shipped

The bench (`bench.py`, the "nesi" front tab, and the "bench" tab in `nesi_app.py`) was already LIVE·STUB from an earlier build — one socket, four stub ops, `land()` writing private objects with no crossing flag. This session's actual work was the one piece missing from §2: **intent that carries an object-type tag, deterministically, without asking Kevin to name it.**

- **`bench.classify_type(intent)`** (new) — an ordered keyword table in the same shape as `front.py`'s `ROUTES`: letter / note / instrument / spec / reflection / gift, first match wins, no match falls to the generic `object` tag. Never asked of Kevin — read off his own words, same discipline as everywhere else in this organ.
- **`bench.new_object()`** now classifies the intent and carries `type` through the whole object: draft stub payload, `history`, and — via `land()` — into the staged object's top-level `type` field and its `pile` name (`bench:<type>:<slug>.md`), so the mark queue reads the tag at a glance.
- **Front (`front.py`)** — the `bench` organ route now says "reads as a `{type}`" in plain words, and the `under` provenance line carries the type too.
- **Bench tab (`nesi_app.py`)** — a type badge next to the engine badge on the working-object header, filled from `result.get('type')`, cleared on land.

## §4 marks — resolved, not re-opened

- **Object store**: unchanged — `staged/` with `origin="made"`, no crossing flag. Already true.
- **Reader sharing**: already ONE reader. `bench.keyword_pull()` is called by both `new_object()` (this module) and `interrogator.check_absence()` (wired session 1). Verified by inspection this session — no second reader exists anywhere in the tree.
- **Pull keys**: marked default was pattern `type` + `tags`. Checked against the real corpus — **zero of 91 patterns carry any frontmatter** (grep confirmed, this session). The stand-in already built (filename slug + H1 title + bold thesis line, `pull_keys()`) is what the mark actually resolves to until patterns grow real fields — documented in `bench.py`'s docstring rather than silently diverged from.
- **Intent**: free text + object-type tag — built this session (`classify_type()`, above).

## Verified live, engine still dark

```
new_object("a departure note to Frank about leaving the property")
-> type: note
-> pulled: ['load_to_form', 'Transition After Successful Departure']
-> land() -> staged object: origin=made, type=note,
   pile=bench:note:a_departure_note_to_frank_about_leaving_.md, mark.verdict=None
```
Matches §5's success test exactly — the smoke-test object was removed from `staged/` after verification so it doesn't sit in Kevin's live mark queue as noise; the run itself is proven in this log and in `conductor_log.jsonl`'s `bench-landed` line.

Front end to end: `"write me a letter to Frank about the well pump"` → `"Opened a working object for that — reads as a letter."` plus the deterministic pattern floor and Move C absence check from session 1, all still composing cleanly.

## Touched

`nesi/conductor/bench.py` (classify_type, type threaded through new_object/land/draft-stub), `nesi/conductor/front.py` (bench-branch line mentions the type), `nesi/conductor/nesi_app.py` (type badge in the bench tab).

## Not touched

Metabolizer, marks.jsonl writer, continuity, return circuit, core.py, the interrogator, the shared socket contract beyond reading it the same way session 1 did. No engine wiring, no call, no auth touched.

## Close

State snapshot refreshed (`continuity.checkpoint` + `close_snapshot` run this session). No build beyond target; no prune.
