# SKILLS SWEEP — 2026-08-19

**Deposit, not a build.** A sweep of the six skill-packages under
`.claude/skills/` against every mark Kevin has made, run on his direct ask:
find what got built as a Skill without him naming it as one. Developed once —
audited, grounded, rebuilt — after the first pass shipped a claim that
didn't survive contact with `git log`.

## THE CORRECTION THAT MATTERED MOST

The first draft of this deposit said `.claude/skills/` was untracked, "none
has ever been committed." That was false the moment it was written.

`git log --all -- .claude/skills` shows one commit, `3a01e65`, authored by
**Kevin Mears**, timestamped **08:13:10** — roughly five minutes before this
deposit's first draft existed. Its message, in his own words:

> "Kevin's mark today asks the same question of skills/: four were built and
> adversarially proven this session (cold-walk, conservation-harness,
> threshold-sweep, the-closing-check) with no version history at all... The
> wider glob also surfaces three skills that predate this session and had
> never been tracked either: full-development, route-map, and
> unrouted-gifts_work." — commit `3a01e65`

So: he did recognize these files exist, the same morning, and made a
deliberate git-tracking decision about all seven of them (not six — see
DEFERRED below). That's a real act of recognition the first draft missed by
checking `git status` without also checking `git log`.

**What it does not do:** track a file is not the same speech-act as author a
trigger phrase and a scope for a Skill. The commit recognizes the files.
Nothing in it, or anywhere in `MARKS_LOG.jsonl`, authorizes the specific
decision to package each one as a triggered Skill — description, trigger
list, when-to-use boundary. That narrower claim is what survives.

## CORRECTED GOVERNING CLAIM

Six-going-on-seven files under `.claude/skills/` were built 2026-08-16
through 2026-08-19. Kevin's commit `3a01e65` recognizes all of them as files
worth version-controlling. **No mark, in `MARKS_LOG.jsonl` or anywhere else
checked, recognizes the separate decision to package any of them as a
triggered Skill.** For one of the seven, even the tool underneath the
wrapper has no mark at any depth.

## EVIDENCE, PER SKILL

| skill | built | tool/process marked? | file tracked? | packaging-as-Skill marked? |
|---|---|---|---|---|
| conservation-harness | 08-19 08:05 | yes — "BUILT: nesi/game2d/tools/conserve.js, six checks, the harness NESI never had" | yes, `3a01e65` | no |
| cold-walk | 08-19 08:04 | incidentally — `cold_walk.js` named twice, both as the object of a correction ("order 3 demoted only cold_walk.js"), never as a build order | yes, `3a01e65` | no |
| the-closing-check | 08-19 08:06 | its source, `.claude/agents/game-craft.md:211`, carries an in-file attribution — "his text, saved from chat" — but that attribution lives outside `MARKS_LOG.jsonl` | yes, `3a01e65` | no |
| threshold-sweep | 08-19 08:05 | no — zero hits for "threshold sweep," "sweep_thresholds," `REACH=900`, `ROOT_STEP` anywhere checked | yes, `3a01e65` | no |
| route-map | 08-16 10:33 | `route_map.js` was added in commit `d652c4c2` ("the commons swept and sited..."), which never names the file directly; zero `MARKS_LOG.jsonl` hits | yes, `3a01e65` | no |
| full-development | 08-17 10:20 | yes, twice — "run full development on the units of work in nesi" (live) and a 2026-07-31 mark on the same process, since composted for going unacted past its 7-day window | yes, `3a01e65` | no |

Weakest of the six: **threshold-sweep** — the only one with no mark at any
depth, tool or wrapper. Best-grounded: **conservation-harness** and
**full-development**, each with a live, uncomposted quote naming the tool or
the process directly.

**route-map has an unmerged fork**, byte-identical in `SKILL.md`, line-ending
-only different in `route_map.js`, sitting at
`.claude/worktrees/objective-rhodes-b2bdaa/`. Not divergent in substance —
correcting the first draft, which called it "worse-grounded" without
diffing it.

## DEFERRED — NOT AUDITED

`unrouted-gifts_work` was surfaced and tracked by the same commit `3a01e65`
and is not one of the six this sweep evaluated. It carries a rescued run's
output (`cupola.py`, `nets.py`, `run.py`, `run2.py`). Left untouched — named,
not assessed, per the drop rule (law 9).

## STANDING CAVEAT

Absence from `MARKS_LOG.jsonl` is evidence of no *logged* mark, not proof no
conversation happened — the same failure law 23 names for a harness ("ask
the object its state; never infer it from a symptom"), applied here to a log
instead of code. This pass widened the check past the log once — to
`git log` — and it changed the finding. It has not been widened to session
transcripts outside this repo, which could in principle hold a recognition
this sweep still can't see.

## WHAT THIS DEPOSIT DOES NOT DO

It does not rule any of the seven in or out. It does not compost them,
demote them, or recommend keeping them. Per the drop rule it states what it
confirms, what it collides with, and where it already exists, then stops.
The mark on whether any of these stands, gets its packaging authorized, or
gets pulled is his, not this deposit's.

---

**Deferral accounting**
- Added: a corrected git-history check the first draft skipped; nothing new
  calls it beyond this file.
- Named, not built: whether the in-file game-craft.md attribution should
  count as a form of recognition equivalent to a `MARKS_LOG.jsonl` mark —
  left as an open question, not resolved.
- Deferred: `unrouted-gifts_work` (see above) and any sweep of session
  transcripts outside `MARKS_LOG.jsonl` for a verbal recognition the log
  wouldn't show.
