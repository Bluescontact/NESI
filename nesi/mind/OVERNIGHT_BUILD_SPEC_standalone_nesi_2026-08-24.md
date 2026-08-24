# OVERNIGHT BUILD SPEC — a standalone NESI, colonized from the whole library

**Asked 2026-08-24:** *"how could i prompt a single overnight build of a
prototype nesi as a standalone exe, and os system of it own."* Corrected the
same day, same thread: *"the process is and has always been copy, and then
compost, and extract into the new medium. I've never given delete authority.
look at past phase transition conversation for an idea on the process."*

This version replaces the first draft, which gated the run on a narrow file
floor and a post-hoc human checkpoint. That gate was solving a problem this
pipeline doesn't have — the actual standing process is non-destructive by
construction, proven twice already in this corpus:
`nesi/mind/project_substack_deletion_compost.md` (56 articles archived to
`_INTAKE/raw/` before anything was touched, composted through
`project_substrate_skill` runs, only 2 of 15 extracted patterns ever crossed
into canon, the other 13 never deleted, just left uncrossed) and
`nesi/mind/feedback_substrate_before_artifact.md` (*"the artifact is
downstream of the tools... let composting happen; the artifact emerges from
mature substrate"*). Copy first, compost, extract into a new medium — the
originals are never the thing that changes.

---

## 1 · The pipeline, named from precedent, not invented

**Phase 1 — COPY.** Every file in scope gets archived, read-only, to a
working substrate directory outside `patterns/` and outside every existing
ledger. Nothing is read from the live library after this point; everything
downstream works off the copy. Same shape as `_INTAKE/raw/substrate_source_
substack-*.md`.

**Phase 2 — COMPOST.** Agents work the archived copy the way
`project_substrate_skill` already works intake: extract structural
patterns, write briefs, name what's canon-shaped and what's duplicate or
fabricated. At the scale of "the whole library," this is the actual
colonization step — many agents, each taking a slice, running in parallel,
none of them touching the original.

**Phase 3 — EXTRACT INTO THE NEW MEDIUM.** This is the one real design
change from how compost has run before, and it's what makes full autonomy
correct rather than reckless: historically, a composted pattern only
crossed into canon `patterns/` on Kevin's own per-artifact mark (the
membrane-controller's fail-close gate). For *this* run, the destination
isn't `patterns/` — it's the new medium, the standalone program's own
substrate. Nothing composted here is competing for a canon slot, so nothing
here needs to wait on a mark to cross. The gate that existed to protect
canon from an unmarked write doesn't apply to a destination that isn't
canon.

**Phase 4 — ASSEMBLE.** The standalone program is built as the container
that holds what Phase 3 produced — read through the same relate/compare/
merge instrument already proven today in `THE_LIBRARY.html`/`THE_TERRAIN`,
served by `pywebview`, packaged by PyInstaller into one `.exe`.

## 2 · The one hard constraint, checked mechanically, not promised in prose

**The live library is read-only input, forever, for this whole run.**

- Every phase writes only inside the new working/output tree.
- Nothing in `patterns/`, `MARKS_LOG.jsonl`, `OPEN_GATES.jsonl`,
  `DECISIONS_OFFERED.jsonl`, `RETIRED.jsonl`, `counsel/`, or `nesi/mind/` is
  ever deleted, moved, or edited in place by this process — matching what
  you named directly: delete authority was never given, and copy-first has
  always been the process, not a new rule invented for tonight.
- Verified by hash/diff of the entire scoped tree, taken before Phase 1
  starts and again after Phase 4 finishes. Byte-identical, or the run
  failed its one non-negotiable term regardless of what else it produced.

Because this constraint is structural (a read-only mount / copy-then-work),
not a per-decision gate, the rest of the pipeline can run with real
autonomy — no per-artifact mark, no pause for review mid-run. That's the
correction from the first draft: the risk I was gating against (destructive,
unreviewable change to your real work) can't happen if Phase 1 is honored,
so there's nothing left to gate *inside* the run.

## 3 · What's still open — named, not guessed

Two things aren't mine to default, because inventing them would repeat the
exact failure this corpus already has language for (*"a menu would be the
machine pre-naming the thing this exists to let Kevin name,"*
`project_the_field.md`):

- **The tetra itself.** You named a full tetra geometry — relationships,
  edges, faces — holding **three known faces and one derived face**, with
  NESI as the held center. I don't have those three named anywhere on
  disk under that framing, and I'm not going to guess them into the spec.
  Name the three, and the fourth (derived — from what operation, over
  what?) becomes buildable rather than assumed.
- **The scope of "the whole library."** `patterns/` (176 files) is the
  narrowest honest reading, given this is the thread we've been in all
  session. `nesi/mind/`, `counsel/`, and `_INTAKE/` are the next ring out —
  all real substrate, all copy-compost-extract candidates by the same
  process. Confirm the ring, and Phase 1's archive step knows its own
  boundary before it starts, instead of the run discovering it partway
  through.

Everything else in the pipeline — which agents run compost on which slice,
how patterns get named/merged once extracted, the internal shape of the new
medium below the tetra, packaging mechanics — is free to decide alone
inside the run, logged, never paused on.

## 4 · What already exists to colonize from, and to build with

- **The library itself** — `patterns/` (176 docs, 344 self-cited
  relations, now graphed at `library_graph.json`).
- **The wider substrate** — `nesi/mind/` (memory, research, protocol),
  `counsel/` (the fuller/cowan/change-composite reading passes),
  `_INTAKE/` (raw, uncomposted).
- **The reading instrument, proven today** — `THE_LIBRARY.html`,
  `THE_TERRAIN.html`/`LIVE`, `THE_TRUSS.html` (load-bearing/cut-vertex
  read), `THE_FIELD.html` (the stage-and-name discipline for edges).
- **The extraction machinery** — `project_substrate_skill`'s own compost
  pattern (SUBSTRATE_BRIEF → triage → crossing record), `tools/
  library_layout.py` / `terrain_layout.py` as the two working examples of
  "regex/vectorize real material into a graph, never infer content."
  `.claude/skills/full-development/` for the compost-scatter-inventory-
  audit-diverge-converge-dream-ground-route cycle at document scale.
- **The organ inventory** — `nesi/NESI_V2_ORGANS.md`, ~28 organs mapped
  KEPT/MIGRATE/BUILD/COMPOST — the closest existing map of "everything
  that preceded it."
- **Packaging precedent** — `nesi/NESI.exe`/`NESI_v2.exe` (Godot-era,
  retired, but proof this project has shipped a standalone `.exe` before).

## 5 · What "done" looks like by morning

- One `.exe`. Runs on double-click. Opens onto the assembled tetra — three
  named faces plus the derived fourth, once you've named them — reading
  the new medium Phase 3 produced.
- The whole compost trail intact and readable: what got archived, what
  got extracted, what got left uncomposted and why — a cold-walk
  transcript by another name, same as `project_substack_deletion_compost.md`
  kept its own triage split legible after the fact.
- The hash/diff proof from §2: the live library, byte-identical,
  before and after.
- Nothing waiting on a gate card *inside* the pipeline — the one thing
  waiting for you is the finished tetra itself, because "does this hold
  anyone" is a read only your own hand gets to make, the same register as
  every other felt-verdict this corpus already reserves for you.

## 6 · The prompt to actually hand the scheduled agent

```
Build a standalone Windows .exe prototype of NESI, colonized from
[patterns/ | patterns/+nesi/mind/+counsel/ -- Kevin to confirm the ring]
per the scope spec at
nesi/mind/OVERNIGHT_BUILD_SPEC_standalone_nesi_2026-08-24.md.
Read that file in full before starting.

Non-negotiable, checked by hash/diff before Phase 1 and after Phase 4:
nothing in the live scoped tree is ever deleted, moved, or edited in
place. Copy first, compost, extract into the new medium -- never back
onto the original. Everything else in the pipeline is yours to decide
and run without pausing for review; log every decision as you make it.

Organize the assembled program around the tetra Kevin named: three known
faces + one derived face, holding NESI as the center. [Kevin's naming of
the three faces goes here before this prompt is sent.]

End with the morning report named in §5: the compost trail, the
hash/diff proof, and the assembled tetra waiting for Kevin's own read.
```

## 7 · Mechanism

`CronCreate`/the `schedule` skill for a one-time overnight run, or a
background `Workflow` kicked off before sleep with a long fallback wakeup.
Phase 1's archive step should target a directory outside this working
tree entirely (or an isolated worktree) — belt-and-suspenders under the
hash/diff proof in §2, not a substitute for it.

---

Two things needed before this is sendable tonight: the three faces, and
the ring. Everything past that is built, not asked.
