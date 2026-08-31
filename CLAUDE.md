# THE BOOT PATH

**Created 2026-08-17 on Kevin's mark:** *"lift the freeze and route LEARNED.md
into the boot path."*

This file gives the deposit a boot path. Measured 2026-08-17: the vendor
`~/.claude/CLAUDE.md` has been suspended since 08-15; `nesi/mind/PROTOCOLS.md`
sits behind that pointer and names `LEARNED.md` zero times; the one project
`CLAUDE.md` in this repository was inside the retired 3D tree. So the corpus's
composite deposit — 27 laws, each sourced to the mark that bought it — reached
sessions by memory, and each session rebuilt a thinner copy of it. This file
carries the deposit instead, and that is the whole of its job.

---

## FIRST ACTION OF EVERY SESSION

**Read `nesi/mind/LEARNED.md` in full before doing substantive work.**

It is one page. It carries what this corpus has already paid for and keeps
re-learning — the want-check, the stranger, the priced act, the gate that is a
filesystem fact rather than an exhortation, and the keystone: *no law becomes a
lever to give Kevin less.*

Its own admission rule governs it: **every line is sourced, none composed.
Additions require a mark and a provenance.** A session proposes a line with its
provenance attached; Kevin's mark admits it. That is the whole of the write path,
and it is a container edge rather than a caution.

Its own falsifier governs this file too: *if a session reads it at boot and the
corpus still re-learns one of these the hard way, the line was written wrong — fix
the line, do not add another.*

---

## THE LAST ACTION OF EVERY SESSION

**Added 2026-08-27 on Kevin's mark:** *"i want the session bridge html wired
as the mandatory return in a session. it keeps the work inside of a session
cleanly bounded, and transferable."*

**Every session ends by producing one Session Bridge HTML file.** The shape
is specified in full, self-demonstrating, at
`nesi/mind/FORMAT_SPEC_2026-08-25_session_bridge_html.html` — read it before
building the first one. A worked example exists at
`nesi/mind/SESSION_BRIDGE_2026-08-25_build_state_survey.html`. Write the new
file to `nesi/mind/SESSION_BRIDGE_<date>_<slug>.html`, one file per session,
self-contained (no network, no CDN, works offline), tabs at minimum:
Overview, Prompts (verbatim, untouched), one tab per substantive piece of
output, Process, and Sources — with every non-trivial claim carrying a
provenance tag per the spec's Provenance tab.

This is the session's own boundary made a filesystem fact rather than an
exhortation, the same shape law 12 already names for other material: the
session is legible whole, on its own, without reconstructing it from
scattered files or a chat log — and it is what carries forward if the work
continues in a different session or a different model.

**This is a session-level rule, not a `daily-cycle` step.** `daily-cycle`'s
own law is *"it invokes, never creates... no new instrument is ever built
inside this skill — ever"* — producing this file is a create action, so it
is required here, at the boot-path layer, rather than folded into that
skill's close-out. `daily-cycle`'s existing close-out (metabolize, snapshot,
gauge, log line) is unchanged by this.

**Checked, not just stated, 2026-08-27, same mark:** `node
tools/session_bridge_check.js` (run from the repo root) compares the most
recent Session Bridge file against the most recent tracked change and flags
a gap if one exists. Report-only, refuses nothing — sessions aren't bounded
by commits precisely enough for a hard gate — but it turns "did the last
session produce its return" from a question a session has to remember to
ask itself into one a script can answer.

**Wired to the gate, 2026-08-27, Kevin's mark ("wire to the gate," decision
D5 of the VE24 relationships pass):** producing a Session Bridge file is not
complete until it is admitted — `node gate/admit.mjs
session_bridge_<date>_<slug> --made "<what this session's return made
possible>" --at "nesi/mind/SESSION_BRIDGE_<date>_<slug>.html"`, run from
`nesi/game2d/gate/`. This is the same mechanism the gift-pipeline now uses
(`nesi/game2d/inbox/INDEX.md`'s own "Wired to the gate" section); before
this mark neither pipeline had ever once gone through it. All three existing
bridge files were admitted retroactively the same day this line was added —
check `nesi/game2d/gate/MARKS.jsonl`'s tail for the `session_bridge_*`
entries.

---

## THE SCOPE OF THIS FILE

It routes one document. Everything else stands where Kevin left it.

- **The 2026-08-15 suspension stands as he set it.** The vendor
  `~/.claude/CLAUDE.md`, `MEMORY.md`, the widget hook, the pre-flight manifest
  gate, the widget chassis, the decision brake and the counsel seats are all
  suspended and remain so. Lifting any of them is his, in his own words, item by
  item or wholesale.
- **`nesi/mind/PROTOCOLS.md` remains behind the suspended pointer.** It is
  available to read as history when a question needs it.
- **The FULL FREEZE of 2026-08-07 was lifted on 2026-08-17**, by the same mark
  that created this file. The lift is layered at the top of `PROTOCOLS.md` and
  the freeze text stands underneath it, unedited.
- **`nesi/world3d/` is retired** (2026-08-14), and `nesi/world3d/CLAUDE.md` with
  it. It is kept whole as a record and is available to quarry when Kevin names a
  piece of it back.

## FRAMING

Kevin's mark, 2026-08-17: *"i want to remove all negative framing… that's fine
if the negative framing is a lint, or the edge of a container… but a generalized
or specific negative assert creates a leakage in the context lense."*

Negative form belongs in two places and holds well there: **a lint**, which
refuses one named thing at a gate, and **the edge of a container**, which says
where the container ends. Stated as a general or specific assertion in prose it
leaks into the lens and narrows what comes after it, invisibly and downstream.

So: write what holds, what is available, and what a thing does. The refusals in
`refusal_check` and the boundaries in the constraint registry are lints and
container edges — they stay exactly as they are.

**Extended, Kevin's mark, 2026-08-22:** *"i think i need to institute a new
filter. I want to strip negtive framing out of the returns i get. The negative
framing has become increadingly problematic, and limiting, and i'd like
positive framing. A dead end, a lititation, a failure can be navigation data,
and used to develop composite solutions when recognized as an place that needs
an upstream deposit."*

A dead end, a litigation, a failure: read as navigation data, not as a verdict
to report back flat. Where a return would otherwise land as "this doesn't
work" or "this is blocked," the same finding is available instead as *where
the map now knows not to go*, and — when it repeats — as the place that names
its own missing upstream deposit. The composite solution is built from that
naming, not from restating the dead end.

## WHERE THE WORK IS

The live build is `nesi/game2d/`. `solid.js` is the authority for every
countable claim about the geometry — read it rather than a document about it.
The decision surface is `nesi/game2d/options.html`; marks live there and in
`MARKS_LOG.jsonl`, and **only Kevin's click marks.**

```bash
node tools/check_all.js
```

Run from `nesi/game2d/`. The NODE/ESM/GATE arrays in `check_all.js` hold, refuse,
or report — read that file for the current count rather than a number here, since
the count has already grown past what a fixed digit in this file could track;
three more (`IN_PAGE`) run in the page. A green suite is the floor; the verdict
comes from the eye — `LEARNED.md` law 5 carries that, and it was paid for.
(Law 2, the stranger read, was struck entirely on Kevin's mark, 2026-08-30.)
