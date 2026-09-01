# CONTAINERS — the container law
**Home:** `nesi/mind/CONTAINERS.md` — NESI-side, engine-agnostic. Third file of the law, beside `PROTOCOLS.md` (the session protocol) and `VERB_LENSES.md` (the action grammar).

**Adopted 2026-08-03 on the keeper's mark**, three marks in one deposit, caught in `MARKS_LOG.jsonl`:
> *"Adopt the four container kinds as law: MATERIAL holds state, EVENT is append-only, SURFACE holds nothing and derives, ORGAN acts. An action reads material, writes material, records to an event ledger, and may regenerate a surface."*
> *"Adopt the existence rule: a container exists only where one action puts something in and a different action takes it out. No in-action is a wish; no out-action is a landfill."*
> *"All six states are real containers: raw, sorted, substrate, dispositioned, canon, released. Name them."*

**Why this file exists.** `VERB_LENSES.md` articulated NESI's actions on 2026-07-23 and has been load-bearing since. The containers those actions move material through were never articulated — the file system accreted instead of being designed. The mismatch is what a session feels as *"I can't tell where anything stands."* This file closes that side.

**Standing on it:** these are laws, not descriptions. They are enforced by nothing yet — see § Open. A written law nothing enforces is ceremony, which this project keeps catching itself in; that gap is named here rather than hidden.

---

## Law 1 — the four kinds

Every container in the system is exactly one of four kinds. The kinds are distinguished by **physics**, not by subject matter:

| Kind | Physics | Holds | On disk today |
|---|---|---|---|
| **MATERIAL** | holds state · things move **in and out** | the six states below | `_INTAKE/` · `patterns/` · `membrane/release_packets/` |
| **EVENT** | append-only · nothing ever moves or is edited | history | `MARKS_LOG.jsonl` · `OPEN_GATES.jsonl` · `membrane/transition_records/` · `membrane/converger_passes/` · `membrane/VIOLATION_REGISTER.md` |
| **SURFACE** | derived · regenerable · disposable | **nothing of its own** | `_widgets/` · `CROSSING_LOG.html` · `state_view.html` · `THE_TERRAIN.html` |
| **ORGAN** | behavior · acts on the other three | code and stance | `tools/` · `nesi/bench/` · `nesi/mind/` · `nesi/game2d/` |

**The movement law, stated once:**

> An action **reads** from a MATERIAL container, **writes** to a MATERIAL container, **records** to an EVENT container, and **may regenerate** a SURFACE. ORGANs run actions.

**The load-bearing clause: a SURFACE holds nothing.** It is defined as having nothing of its own to store. Anything that exists only inside a surface does not exist. This is not a style preference — it is the diagnosis of two logged losses:
- Five decisions stranded in `latest_af54f11d.html` and `latest_3f10db50.html` (07-30), recoverable only by reading old widget files one at a time.
- The eight candidate membrane sentences (08-02), marked for by the keeper on 08-03 and **gone** — they lived in a session transcript and nowhere else.

Both were stored in the one kind of container defined as having nothing to store. The rule that prevents recurrence: **if a thing must survive the session, it goes to MATERIAL or EVENT before it is rendered to a SURFACE, never after.**

### The deposit-before-render rule (the keeper's mark, 2026-08-04)

> *"Fix the widget pipeline: every decision gets written to MATERIAL or EVENT before it is rendered to a surface, never after. That is what the SURFACE_SOLE_HOME light is telling us."*

`DECISIONS_OFFERED.jsonl` is the EVENT container that clause needed. Every decision put in front of the keeper is deposited there **before** the surface showing it is written, via `tools/decisions.py offer`. A surface is where a decision is *shown*; it was never supposed to be where a decision is *kept*.

**The ordering is enforced, not trusted.** `decisions.py verify --surface <path>` compares each record's timestamp against the surface file's mtime. A record written *after* the file it describes is a breach — that is render-first wearing a ledger as a disguise. Records added for surfaces that predate the ledger are flagged `backfill: true` and verify reports them as *ordering not proven*, never as a pass.

**An offer is not a mark.** It records that a choice was put in front of the keeper, never that he made one. Marks stay in `MARKS_LOG.jsonl` and only his hand puts them there. The two ledgers together answer a question neither could alone — `decisions.py open` lists every decision ever offered and never answered, which is exactly the load the stranded widget files used to leave in the keeper's head.

This is also what makes `_widgets/` honestly `derived_from` something rather than exempt: the decisions genuinely live elsewhere first, so the surface really does hold nothing of its own.

**Falsifier (Law 1):** if a thing on disk fits none of the four kinds, or genuinely fits two at once, the taxonomy is wrong and gets cut — not patched with a fifth kind.

**The against-case, recorded so it is not lost:** EVENT can be argued as a subtype of MATERIAL that simply never leaves, collapsing the law to three kinds. The reason it is held as distinct: append-only has different physics from state-holding, and conflating them is precisely how the derive-don't-store boundary gets violated — a ledger that can be edited stops being a record and becomes a second authority. If a future pass shows the three-kind form explains the same failures, take it; simpler is better.

---

## Law 2 — the existence rule

> **A container exists only where one action puts something in and a different action takes it out.**
> **No in-action, it is a wish. No out-action, it is a landfill.**

**Actions define containers. Never the reverse.** This is the container-side twin of the load-test build-gate in `PROTOCOLS.md`: the load-test gates whether a *build* deserves to exist; this gates whether a *place* does. Both run before making the thing.

Two opposite failures were live on the day this was adopted, and both are named by this one rule:

**The landfill — `_INTAKE/`.** 460 loose files plus roughly 40 subdirectories, holding four different states at once, including 107 `SUBSTRATE_BRIEF_*` files that are finished development output sitting beside unread June drops. Four actions put things in; almost nothing takes anything out. Nothing in the file system distinguishes a brief the keeper has marked from one he has not.

**The wishes — nine containers under `nesi/`.** Counted 2026-08-03: `seed/` (0 files) · `inbox_external/` (0) · `soil/` (1) · `trade_notes/` (1) · `boundary/` (2) · `marks/` (2) · `interrogator/` (2) · `forest/` (3) · `inbox/` (3). Named in advance of any action that fills them.

**The against-case, recorded:** a container sometimes legitimately precedes its material — you build the drawer before the thing arrives. The rule as written forbids that. A softer form ("a container with no out-action is a landfill," silent about empty ones) was offered and **not** taken. If the strict form ever blocks a genuinely-intended empty container, that is the signal to revisit.

**Falsifier (Law 2):** if applying this rule forbids nothing and retires nothing, it was ceremony.

---

## Law 3 — the six material containers

The chain is **derived from `VERB_LENSES.md`**, not invented here. Each action's "moves material" column names a source state and a target state; read end to end, the five actions name six states. That derivation is what makes these containers rather than folders:

| Action | Jurisdiction | Moves |
|---|---|---|
| **SURFACE** | machine | raw → sorted |
| **DEVELOP** | machine | sorted → substrate |
| **DECIDE** | the keeper's hands | substrate → dispositioned |
| **CROSS** | the keeper's hands, gated | dispositioned → canon, then canon → released |
| **RUN** | machine | *nothing* — upkeep, no state change |

`RUN` moves no material, which is why it has no container and why a RUN action may never mint a verdict. That is the same jurisdictional boundary `VERB_LENSES.md` already draws, arriving here from the other direction.

### The six, named

| # | Container | Holds | In-action | Out-action | State on disk, 2026-08-03 |
|---|---|---|---|---|---|
| 1 | **raw** | dropped, unread, unsorted | the keeper drops · harvest | SURFACE | `_INTAKE/` — shared with 2, 3, 4 |
| 2 | **sorted** | surfaced, one disposition + evidence line each, not yet developed | SURFACE | DEVELOP | **no container** |
| 3 | **substrate** | developed, transferable, screened, not yet judged | DEVELOP | DECIDE | **no container** — 107 briefs sit in `_INTAKE/` |
| 4 | **dispositioned** | carries the keeper's mark: promote-ready / hold / compost | DECIDE | CROSS | **no container** — dispositions live *inside* the briefs |
| 5 | **canon** | the Library — permanent ground | CROSS 1 | CROSS 2 | `patterns/` — 176 files · **clean** |
| 6 | **released** | scoped bundles cleared for outward reach | CROSS 2 | the Transmission Engine | `membrane/release_packets/` — **0, never used** |

**One container is clean, and it is the only one with a controller on its door.** `patterns/` is guarded by `membrane-controller`, which is exclusive write authority. That is not a coincidence — it is the whole mechanism. Every other material container is either shared, missing, or unused.

**Falsifier (Law 3):** if a piece of material cannot be placed in exactly one of the six, the chain is wrong and gets recut from the verbs — not extended with a seventh state.

---

## The registry — this file is the checker's only config

`tools/container_check.py` reads the two fenced blocks below and nothing else. **The law is the config**: there is no second file to drift out of sync, which is the derive-don't-store boundary applied to the checker itself. To classify a container, edit the table here — not the script.

Columns: `path | kind | state | in-action | out-action | derived_from | mirror_of`. Use `-` for not-applicable, and `?` for **unruled** — a container whose kind has not been decided. Unruled is an honest state and the checker reports it as an open question rather than a breach; it is the keeper's ruling to make, not the machine's to infer. A row may omit the seventh column, which reads as `-`.

### Law 4 — a duplicate declares which copy wins (the keeper's mark, 2026-08-06)

> *"Add a `mirror_of` column to the CONTAINERS.md registry and teach container_check.py to byte-compare every declared mirror against its authority, reporting drift as a named event."*

The 2026-08-05 sweep found four duplicated pairs. **Three had drifted or had no named authority; the one that was clean was clean for a stated reason.** `ROUTER.md` says it out loud:

> *"this file is a RENDERING of the routing law as a graph node. The single authority … remains the fenced json block in `ESCALATION_CONDITIONS.md`. If this table and that json ever disagree, the json wins and the disagreement is a drift event to surface, not silently resolve. Do not edit conditions here."*

A duplicate that names its authority **and** declares disagreement an event cannot rot quietly. One that does not, always does — `nesi/bench/` sat behind the keeper's own 07-20 and 07-27 skill amendments for three weeks, and the memory strikes of 08-05 had to be written twice because nothing said which memory directory was authoritative.

**The law:** any file or directory that duplicates another declares `mirror_of <authority>`. The authority is the copy that wins; the mirror is regenerated from it, never edited in place. A `~/` prefix resolves to the home directory, because two of the four authorities live vendor-side.

**Drift is an OPEN, not a BREACH.** The checker byte-compares and names the divergence; it never picks a side and never syncs. Which copy is authoritative is a ruling, and re-copying is a mark — the machine reports and stops. This mirrors how `UNRULED` already behaves.

**The direction is not uniform, and that is correct.** For skills and memory the *vendor* copy is live and current; for the chassis the *NESI* copy is the authority. Both are true at once, which is exactly why it has to be declared per pair rather than inferred.

**A mirror is not a rendering — the fourth pair is declared differently, and this is a deliberate departure from the mark.** the keeper's mark named `ESCALATION_CONDITIONS` json → `ROUTER.md` as one of the four pairs. But `mirror_of` means *should be byte-identical*, and `ROUTER.md` is a **rendering** of a json block as a human-readable table — it is not supposed to match byte for byte, and declaring it a mirror produced an immediate false positive on the first run. It is declared `derived_from` instead. The authority relationship the keeper wanted is stated exactly as before, in ROUTER.md's own prose, which is where it was already working. **Reversible on his word** — if he wants it declared as a mirror anyway, the row changes back and the check will report it drifted every run.

**Falsifier (Law 4):** if a declared mirror drifts and the check does not name it, or if the check ever resolves a drift by itself, this law failed.

```registry
_INTAKE/ | MATERIAL | raw | drop,harvest | SURFACE | - | -
patterns/ | MATERIAL | canon | CROSS1 | CROSS2 | - | -
membrane/release_packets/ | MATERIAL | released | CROSS2 | transmission-engine | - | -
membrane/transition_records/ | EVENT | - | CROSS1,CROSS2 | - | - | -
membrane/converger_passes/ | EVENT | - | converger | - | - | -
MARKS_LOG.jsonl | EVENT | - | marks.py catch | - | - | -
OPEN_GATES.jsonl | EVENT | - | gates.py open | - | - | -
DECISIONS_OFFERED.jsonl | EVENT | - | decisions.py offer | - | - | -
membrane/VIOLATION_REGISTER.md | EVENT | - | audit | - | - | -
_widgets/ | SURFACE | - | render | - | DECISIONS_OFFERED.jsonl | -
CROSSING_LOG.html | SURFACE | - | render_crossing_log.py | - | membrane/transition_records/ | -
THE_FIELD.html | SURFACE | - | field_view.py | - | MARKS_LOG.jsonl | -
tools/ | ORGAN | - | build | - | - | -
skills/ | ORGAN | - | build | - | - | -
nesi/mind/ | ORGAN | - | build | - | - | ~/.claude/projects/<corpus-slug>/memory/
nesi/bench/ | ORGAN | - | build | - | - | ~/.claude/skills/
nesi/world3d/ | RETIRED 2026-08-14 (the keeper's mark) — kept as record, never built against; see nesi/world3d/RETIRED.md | - | - | - | - | -
nesi/game2d/ | ORGAN | - | build | - | - | -
nesi/spec/ | ORGAN | - | build | - | - | -
_COMPOST/ | MATERIAL | compost | DECIDE | - | - | -
nesi/_compost/ | MATERIAL | compost | DECIDE | - | - | -
nesi/seed/ | ? | - | - | - | - | -
nesi/soil/ | ? | - | - | - | - | -
nesi/forest/ | ? | - | - | - | - | -
nesi/inbox/ | ? | - | - | - | - | -
nesi/inbox_external/ | ? | - | - | - | - | -
nesi/boundary/ | ? | - | - | - | - | -
nesi/marks/ | ? | - | - | - | - | -
nesi/interrogator/ | ? | - | - | - | - | -
nesi/trade_notes/ | ? | - | - | - | - | -
substack/ | ? | - | - | - | - | -
mito-mcp/ | ? | - | - | - | - | -
kwp/ | ? | - | - | - | - | -
ds-kit/ | ? | - | - | - | - | -
gate/ | ? | - | - | - | - | -
aoc-v2/ | ? | - | - | - | - | -
osg_organ/ | ? | - | - | - | - | -
marks/ | ? | - | - | - | - | -
genesis_seed_share/ | ? | - | - | - | - | -
Ari_Tal_handoff/ | ? | - | - | - | - | -
coherence-codex/ | ? | - | - | - | - | -
_work_site/ | ? | - | - | - | - | -
support/ | ? | - | - | - | - | -
out_of_family_sensor_packet/ | ? | - | - | - | - | -
osg-v6/ | ? | - | - | - | - | -
kit/ | ? | - | - | - | - | -
ROS_RI_site/ | ? | - | - | - | - | -
open_ledger/ | ? | - | - | - | - | -
frameworks/ | ? | - | - | - | - | -
requests/ | ? | - | - | - | - | -
OUTTAKE/ | ? | - | - | - | - | -
rhythm/ | ? | - | - | - | - | -
held_refusal/ | ? | - | - | - | - | -
village_app/ | ? | - | - | - | - | -
memory/ | ? | - | - | - | - | -
gifts/ | ? | - | - | - | - | -
deposits/ | ? | - | - | - | - | -
seeds/ | ? | - | - | - | - | -
negative_workspace/ | ? | - | - | - | - | -
instruments/ | ? | - | - | - | - | -
decks/ | ? | - | - | - | - | -
audit/ | ? | - | - | - | - | -
_widgets/DS_v1.html | ORGAN | - | build | - | - | nesi/mind/DS_v1.html
nesi/mind/ROUTER.md | ORGAN | - | build | - | nesi/mind/ESCALATION_CONDITIONS.md | -
```

**State signatures** — how the checker recognises a state a file *announces in its own name*. First match wins.

A file matching nothing announces nothing, and takes its container's declared state. That is deliberate: **most states are conferred by position and crossing, not by naming.** `canon` has no signature and must not be given one — a pattern is canon because it is in `patterns/` with a transition record behind it, never because of what it is called. Only a file whose name announces a state *different from its container's* is in the wrong place.

```signatures
substrate | ^SUBSTRATE_BRIEF|^substrate_.*\d{4}-\d{2}-\d{2}|_DEVELOPED_|^DEVELOPMENT_BRIEF
dispositioned | ^DISPOSITION|^PATTERN_CANDIDATE|^promote_candidate
sorted | ^SCANNER_DIGEST|^TRIAGE|^_TRIAGE
```

**Signatures identify process artifacts, never topics.** `SUBSTRATE_BRIEF_` is a stage in the pipeline; a bare `substrate_` prefix is just a word a canon pattern is allowed to be about. The date requirement in the substrate signature is the discriminator that separates them, and it holds cleanly on today's disk: all seven `_INTAKE/substrate_*` files carry a date, and both `patterns/` files whose slugs contain "substrate" — `substrate_precedes_distillation` and `difference_preserving_substrate` — do not.

*These three rules were all written after running the checker, not before. Its first run produced three false positives against my own draft: it read all 175 canon files as "raw" (canon had a filename signature it should never have had), flagged two SURFACE containers as landfills for missing an out-action a SURFACE is not supposed to have, and called a legitimate canon pattern a stray because its slug starts with the word "substrate." Recorded here rather than quietly corrected — a checker that finds nothing on its first run has usually only confirmed its author's assumptions.*

**A finding the registry itself surfaces, recorded rather than smoothed over:** `_COMPOST/` (129 files) and `nesi/_compost/` (33 files) hold material in a state the six-state chain does not name. Compost is a DECIDE *disposition*, not a state in the CROSS chain — yet it has a container in active use. They are declared here with state `compost` so the checker reports the mismatch instead of hiding it. Under Law 3's own falsifier this is the signal to either recut the chain to seven states or reclassify compost as a disposition whose material stays where it is. **Unruled — the keeper's call, not the machine's.**

---

## What this law does NOT authorize

Adopted 2026-08-03 alongside these three; **not marked**, therefore not law and not done:

- **Splitting `_INTAKE/` by state.** Offered, unmarked. Nothing has been moved. The landfill is named, not repaired.
- **Retiring the nine unfilled `nesi/` containers.** Offered, unmarked. All nine still stand. The file system cannot tell a dead folder from a waiting intention, and neither can the machine — only the keeper can.
- **A checker that enforces any of this.** Offered, unmarked. See below.

---

## Enforcement — built 2026-08-03 on the keeper's mark

> *"Write nesi/mind/CONTAINERS.md as the container law, and ship it with a checker that fails when a file lands in the wrong kind of container."*

`tools/container_check.py`. It reads the two fenced blocks above and holds no classification of its own — **the law is the config**, so there is no second file to drift. Exit 1 on any breach.

```
python tools/container_check.py            # report + exit 1 on breach
python tools/container_check.py --strict   # unruled containers fail too
python tools/container_check.py --quiet    # one summary line
```

Two tiers, because they are different kinds of statement:

- **BREACH (exit 1)** — a file is in the wrong kind of container, or the law and the disk disagree. `MIXED_STATE` · `UNPLACEABLE` · `SURFACE_SOLE_HOME` · `SURFACE_DEAD_SOURCE` · `LANDFILL` · `NO_IN_ACTION` · `UNDECLARED` · `MISSING` · `BAD_KIND`.
- **OPEN (exit 0, reported loudly)** — `UNRULED`, a container whose kind has never been decided, and `WISH`, one named but never filled. These are the keeper's rulings. **The machine will not infer a kind**, which is why 42 containers sit unruled rather than being classified by guess.

**First run, 2026-08-03 — 6 breaches, 42 open.** Verified live: planting one `SUBSTRATE_BRIEF_*` file into `_INTAKE/` moved the substrate count 117 → 118 and back on removal, so the detection is a running mechanism and not a static readout.

**Not built, not marked:** wiring this into the daily-cycle close the way `membrane_falsifier.py` is wired. Until that happens the check runs only when invoked, and a breach can survive indefinitely rather than at most one session.

**Whole-file falsifier:** if a session six months from now can hold material without being able to say which of the six states it is in, or can point at a folder and not say which of the four kinds it is, this file failed and should be cut rather than amended.
