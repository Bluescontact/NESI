---
name: route-map
description: Understand the complete tool — every functional surface in this workspace, where each routes in the geometry, and whether it crosses into the workspace GitHub actually holds. Use before absorbing a new repository, before any commit or push, before answering "what do we have," and whenever a capability needs siting. Triggers: "route map", "what do we have", "what crosses", "the membrane", "absorb this repo", "before I give you the repo", "where does this sit", "is this tracked". It reports and refuses; it never routes for Kevin and never widens the membrane.
---

# THE ROUTE MAP

Three questions, and they are not one question.

```
1 · WHAT EXISTS      every functional surface in the workspace
2 · WHERE IT ROUTES  in the geometry — which of the twelve seats
3 · WHETHER IT CROSSES  into the workspace GitHub actually holds
```

Most sessions answer only the first and speak as though they answered all three.
That is the failure this skill exists to stop.

**The harness is `nesi/game2d/tools/route_map.js`.** Run it before answering any
question in this class. Do not answer from memory of a previous run — the third
question changes every time a file is written.

```bash
node nesi/game2d/tools/route_map.js
```

`--json` for another instrument. `--cross` for the membrane report alone.

---

## PART A — THE CONTAINER

**The working directory is not the repository.** This is the single fact most
sessions get wrong, and getting it wrong is how private material crosses.

`.gitignore` carries a **staged-worktree scoping** — Kevin's mark, 2026-08-11,
session `8a8f232e`. It ignores `/*` and then names a short list of exceptions.
Everything else at the DSS root — legal, financial, personal, other project
trees — is held outside **on purpose**, so that a `git add -A` can never sweep
it in.

**Never restate the exception list from memory, and never hand-roll a
`.gitignore` parser.** Ask git:

```bash
git check-ignore -v <path>      # would this cross?
git ls-files --error-unmatch <path>   # does it already?
```

The harness does exactly this, in one batched call. A parser that drifts from
the rule it describes is worse than no parser, and this is the one file whose
whole job is to say what crosses a membrane.

### The strata

Every capability sits in exactly one, and the harness derives all five:

| stratum | meaning | may be built on |
|---|---|---|
| `tracked` | in the repository now | yes |
| `untracked` | inside the fence, not committed — **would cross on the next add** | yes, and say it is uncommitted |
| `outside` | ignored; a clone would not contain it | yes locally, **never assume a reader has it** |
| `retired` | `world3d/`, `tools/retired/` | **no** — record only |
| `secret` | named in the `.gitignore` secrets block | **never read aloud, never move, never quote** |

### The membrane law

**Widening the membrane is Kevin's mark alone.** Editing `.gitignore` to make
something cross is a change to what leaves this machine. Propose it in one line
and stop; do not make the edit because it would be convenient.

Two consequences that surprise people, both true today:

- `.claude/skills/` **does not cross.** `/.claude/*` is ignored with only
  `agents/` excepted. This skill is local until Kevin says otherwise.
- `NESI.html` at the root **does not cross** — 638K carrying 5,081 verbatim
  entries of his writing, held outside by the `/*` rule. That is almost
  certainly correct. Never "fix" it.

---

## PART B — ROUTING INTO THE GEOMETRY

The twelve seats come from `nesi/game2d/solid.js`, which derives everything from
two written tables. **Never type a seat name from memory** — if `solid.js` will
not load, the harness refuses rather than falling back to a literal, and so
should you.

### A seat is declared, never inferred

Law 5: the operator's hand runs the filter. A harness that guessed which seat a
file belongs to would be the classifier the law refuses, wearing a harness.

A file routes only by saying so in its own text — the marker `@seat` followed by
one of the twelve names, or by the word `none`, which is a real answer and not
an absence.

**Everything undeclared is UNROUTED, and that number is the work.** It falls
when Kevin routes. It must never fall because the harness got cleverer.

### When you find capability that has no seat

Bring it to the gate as a card in `inbox/`. Do not route it. Do not propose a
seat and then build as though the proposal were a mark. `unrouted-gifts` handles
capacity from past builds; `TRIBUTARIES` handles capacity from the commons; both
end at the same gate.

---

## PART C — ABSORBING A NEW REPOSITORY

The procedure when a repo is handed over. **In this order.**

**C1 · Read its membrane before reading its code.** Its `.gitignore`, its
remotes, its visibility, its branch protection. A repo you cannot describe the
boundary of is a repo you must not write to.

**C2 · Run the harness against it.** What exists, and in which stratum. Report
the counts before any opinion.

**C3 · Treat it as its own stratum until Kevin says otherwise.** A second repo
is not an extension of this one. Material does not move between them by
inference — not a file, not a store, not a ledger line. **Two repos with one
`git add` is how the staged-worktree scoping gets defeated.**

**C4 · Name the collisions.** Same-named files, same-named seats, two
`.gitignore`s with different rules, a capability live in one and retired in the
other. Name them; do not reconcile them.

**C5 · Nothing is committed, pushed, merged, or moved without his mark.** Read
freely. Write nowhere.

---

## PART D — REFUSALS

Refuse, and name the refusal rather than softening it:

- **Any claim about what is in the repository that did not come from `git`
  this session.** "It's tracked" from memory is the failure mode.
- **Any edit to `.gitignore`.** Propose in one line; it is his mark.
- **Any `git add -A` or `git add .`** in a tree with a staged-worktree scoping.
  Add named paths.
- **Any read, quote, move, or echo of a `secret`-stratum file.**
- **Any seat assigned by inference**, however obvious. Undeclared is complete.
- **Any statement that a capability is "live" without saying which stratum it is
  in.** Live-and-outside is a real and common state here, and collapsing it is
  how a reader is told a clone contains something it does not.
- **Any commit or push not explicitly asked for.**

And one aimed at this skill: **if a run reports everything as fine, check that
the harness actually read the tree.** A map of nothing passes every test.

---

## PART E — ENDING STATES

Say exactly one:

- **MAPPED** — counts for all three questions, the membrane report, and the
  unrouted count. Name the top collision if there is one.
- **BLOCKED** — the harness could not read something it needs (`solid.js`, git,
  the tree). Say which, and stop. Do not answer the three questions partially
  and present it as a map.

---

## WHAT THE FIRST RUN FOUND — 2026-08-16

Kept as the baseline the next run is read against, not as current truth.

```
capabilities  1430
by kind       surface 1020 · module 332 · instrument 31 · ledger 41 · seat 6
by stratum    outside 1101 · tracked 176 · worktree 132 · retired 19 · untracked 2
routed        0        (the convention was introduced by this harness)
unrouted      1278
```

Two findings from that run, both real and neither fixed:

- **`ascent.html` is unreachable from the front door.** 139K, the twelve seats,
  the clear case. `index.html` redirects to `daily.html`, and `daily.html`
  mentions `ascent.html` only in comments. By the build's own slice rule it has
  no way in — the same shape as the `THE SEATING HAS NO DOOR` gate, one level up.
- **Seven of eight capabilities are outside the repository.** Mostly correct —
  it is what the scoping is for — but it means "what we have" and "what a clone
  has" are different questions with an eight-fold difference between them.
