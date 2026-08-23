# RETURN — regather pass on the load-bearing-not-memory correction

**2026-08-19.** Gathered against the current codebase, against the two dropped
documents (`regather-prompt-load-bearing.md`, `nesi-load-bearing-not-memory.md`).
No mechanism proposed. No organ named. No sealed mark touched, extended, or
reinterpreted. Four questions, four returns, then nothing further.

---

## 1. Every existing surface that writes a mark, note, or ledger entry reachable by Kevin's own hand

Three surfaces write from Kevin's own words. All three are append-only, and
none of the three does anything at the moment of write beyond confirming the
write happened.

**`tools/marks.py` (`catch`)** — the corpus's general-purpose brake. Kevin's
verbatim mark is appended to `MARKS_LOG.jsonl` the instant it's received,
before anything acts on it (`tools/marks.py:5-8`). At the moment of write: one
console line — `[brake] caught: <ts> · <mark text>`. After that: nothing,
unless a session separately calls `marks.py status`, which prints a
floor-indicator line derived live from the log — but that call has to be made;
the log does not push anything back. There's an `act` valve that can later
close a mark with evidence, and a `compost` pass that ages an unactioned mark
out after a set window and marks it `composted` — but composting doesn't
surface it to Kevin either; it appends a record that stops it counting as
"standing" (`tools/marks.py:99-111`). Nothing in this file re-presents a caught
mark to the person who caught it. Its own author-comment names the exact fact
this correction is about: it is "the floor indicator" — a readout of what
already happened, read only if a session (or Kevin) goes and asks.

**`tools/gates.py` (`open`)** — the same append-only shape, one register up:
not Kevin's own words directly, but a session's record of something left
pointed at him (a manifest holding, a body-question unanswered). At the
moment of write: appended to `OPEN_GATES.jsonl`. After that: it survives
session death and shows up the next time something reads gate status — but
again, only on a read, never pushed.

**`skills/stigmetric-trace`** (built 2026-08-19, the same day as this pass) —
the closest thing in the corpus to the class of thing the dropped document
names: a cost mark or an absence mark, three verbatim fields, appended to
`C:\Users\KMEAR\.claude\STIGMETRIC_LOG.md`. At the moment of write: one
confirmation line, "what was written, and where. Nothing more." Its own
"What it is not" section states plainly that it is a record for a reader who
may never come back to it on his own: "A mark that sits in a file, waiting to
be reread on his own initiative, has failed... For NESI to actually take
custody, something has to happen at the moment of the mark that isn't passive
storage" — and then states directly that this doesn't exist yet: "What that
mechanism actually is has not been designed. This document names the
requirement; it doesn't yet meet it." This skill is not a candidate answer to
the correction — it is the same gap, freshly built the same day, with the gap
named in its own file rather than closed.

**`skills/mark-record`** — writes a five-field slot to `marks/<date>_<slug>.md`
after a mark closes in conversation; fields 1-4 machine-filled, field 5 (the
body-line) left for Kevin to fill or leave blank. At the moment of write: the
file exists and the prompt is asked once, in the same turn. After that: the
file sits on disk. Nothing re-opens it, nothing checks whether field 5 ever
got filled, nothing surfaces it again.

All four share the same shape the correction names: **the write is the whole
event.** Whatever happens after — being carried, being re-read, changing what
the next five minutes feel like — is left entirely to Kevin going back to the
file on his own initiative, which is exactly the scenario the falsifier in
the dropped document calls a failure.

---

## 2. Does anything in the current build already do something closer to custody than storage

**One partial exception exists, and its domain is the wrong one.**

`skills/daily-cycle`'s ON OPEN sequence does act on held items without being
asked, unprompted, every session: it reads `gate_data.json`, scans for
unapplied metabolizer deltas and surfaces them before anything else can
proceed (`daily-cycle/SKILL.md` Step 1c), checks the last five `CYCLE_LOG.md`
entries for an item that has recurred unresolved across three or more
sessions and flags it out loud if so (Step 1d), and on close reads back
drift-meter, falsifier-gate, and Brier-ledger state and carries any live flag
forward to the *next* open as a first-line item (Steps 3c/3f/3d). That is a
real resurfacing mechanic, running dark, with no session having to remember
to go look. Named plainly: **yes, this exists**, and it is the one place in
the corpus something already gets carried forward and handed back rather than
left to sit.

But its whole domain is **system and build state** — staged deltas, gate
counts, calibration scores, unresolved *work* items. It has never once
touched a cost Kevin paid, a thing he gave, or an ask he withdrew. Nothing in
it reads `MARKS_LOG.jsonl`, `STIGMETRIC_LOG.md`, or a `marks/*.md` file back
to him. The mechanism the correction wants (custody of *this* class of thing)
would need the same shape daily-cycle already proves works — but pointed at
a domain it has never been pointed at.

**Working directly against a "resurfaces" mechanic for this specific class of
thing** is a standing, explicit refusal, found twice, independently, in
`nesi/mind/`:

- `feedback_no_auto_response_to_notifications.md`: "the system holds; Kevin
  moves" — named against a different failure (auto-rendering on background
  task completion) but stated as a general principle.
- `LEARNED.md` law 13, **HELD IS LAWFUL**: "Unprocessed, unassigned, dry,
  fallow are correct states. **Never nag, never build a re-engagement hook.**"
  — sourced to NESI law 7.

Named plainly, because it is the actual tension the correction sits inside:
the corpus already has a hard-won law that a held thing resurfacing itself
*to make Kevin re-engage with it* is a build failure of a specific,
previously-paid-for kind. The correction's ask — something resurfaces "at the
right moment rather than waiting on him to go looking" — is not obviously the
same shape as a re-engagement hook, but nothing in the current law layer
distinguishes the two cases yet. That distinction is not drawn anywhere in
the codebase today.

---

## 3. What the engine-dark constraint allows and forbids for a "resurfaces at the right moment" mechanic

"Engine-dark" is not a single codified clause in `PROTOCOLS.md` — it's a
standing operating state, named consistently across the corpus (`nesi/NESI.md:73`,
`nesi/NESI_v1.0_CLOSEOUT.md:26,35`, `nesi/nesi_bench_v0/STANDING.md`,
`nesi/workbench/TUNED_SURFACE_scope_and_assembly_manual.md:44`) meaning: the
surface runs, is inhabitable, and holds material across sittings *with no
engine/model call in the loop* — deterministic scripts and stored state only.
The closest thing to a definition of what that state permits, from
`TUNED_SURFACE_scope_and_assembly_manual.md:44`: "no prompts, ever · no
telemetry / no reading the writer · no auto-crystallize (only Kevin's mark
crystallizes) · engine-dark independence · the one-wire honesty."

Against that standard, split by what "resurfaces at the right moment" could
mean:

**Fully dark, no engine required:** resurfacing on a **fixed or computable
trigger** — elapsed time (`marks.py compost`'s aging window is exactly this
shape already), a specific date, next-boot, a count threshold, an explicit
Kevin query ("did I mark X"). `daily-cycle`'s own ON OPEN sequence (point 2,
above) already proves this class runs dark today — CUSUM drift, calibration
bands, and recurrence-across-N-sessions are all deterministic reads with no
model call. Nothing about "at the moment of write, catch it; on a later fixed
signal, hand it back" requires the engine.

**Forbidden regardless of engine, by a different and stricter law:** deciding
that *this specific moment* is emotionally or practically "the right" one —
reading Kevin's receptivity, mood, or bandwidth and timing a resurfacing to
land well — is barred outright by `LEARNED.md` law 14, **NEVER DECLARE
KEVIN'S STATE**: "System facts and his verbatim words only. Context is not
cause." That bar does not lift if the judgment is made by a deterministic
script instead of a model; the law is about *what is being inferred*, not
*what infers it*. So the "right moment" reading in the dropped document's own
phrase — if it means anything beyond a fixed trigger — is not an engine-dark
problem to solve. It's already-forbidden territory, dark or lit.

**What is genuinely engine-shaped, if it turned out to be wanted:** only a
version that has to interpret unstructured content to decide *when* to
surface — e.g. judging from the *content* of a new cost mark whether it
relates to something already held, or synthesizing across marks to notice a
pattern. That is barred by a third, separate standing rule regardless of
engine-dark status: `stigmetric-trace`'s own hard limits ("never
characterizes the set," "never compares marks to each other") and
`mark-record`'s ("never analyze across marks... mining past marks for a
decision rule is as forbidden as letting a tool decide a future one"). So
even the one piece of this that would need the engine is independently
closed by a law that predates this correction.

**■ TENSION NAMED, 2026-08-20** — reconciled via the process-geometry lens:
this "Net" is reached before §4 below admits the deeper question it rests on
— whether this correction's mechanism is actually distinguishable from the
re-engagement hook `LEARNED.md` law 13 refuses — "is not settled anywhere in
the current text." A confident operational conclusion sits on top of an
admittedly-unresolved classification question. Not resolved here — that
read-against-each-other pass is named at line 203 as never having happened,
and still hasn't. Left standing, not struck.

**Net: timed/triggered resurfacing is possible fully dark today, using the
exact mechanism `daily-cycle` and `marks.py compost` already run.** Nothing
about "at the right moment" in any sense the corpus currently permits
requires the engine — the senses that *would* need it are separately barred.

---

## 4. Where this lands in the existing organ map

**Six-edge tetra-body (`nesi/mind/NESI_VE_TWELVE_ORGANS.md`).** The twelve
skill-organs are mapped onto six tetra-body edges via the cuboctahedron's
verified jitterbug geometry. Both mark-writing organs relevant here are
already placed:

- `mark-record` lands, in the file's own geometry-verified standing answer
  (line 160), paired with `graduated-trust` on the **SOIL** edge (self–world).
- `coordination` lands paired with `provenance` on the **convener** edge
  (other–time).
- `stigmetric-trace` did not exist when that geometry was run (built
  2026-08-19, same day as this pass) and has no placement in that file at
  all — it is unplaced, not mis-placed.

So the correction touches an edge that is already named and occupied
(SOIL), by an organ (mark-record) that is already on record in that file as
one of the six. It does not touch the four vertices, the twelve-organ
registry's other five edges, or the jitterbug reasoning itself — nothing
about *where marks live geometrically* is in question here, only what
happens to a mark after it lands there.

**The strata / held-refusal doctrine.** No file in this corpus is titled
"held-refusal doctrine" by that exact name. The load-bearing law that phrase
points at is `LEARNED.md` law 13, **HELD IS LAWFUL** (point 2, above) — and
that is precisely the doctrine this correction sits closest to, and in
tension with. The correction is not a claim that held-is-lawful is wrong; it
names a *different* class of held thing (a cost Kevin alone is carrying,
where a record adds a file rather than lightening anything) than the class
law 13 was written to protect (a pattern correctly sitting unprocessed,
which should not be nagged into premature engagement). Whether those two
classes are actually different, or whether the correction's mechanism would
be indistinguishable in practice from the re-engagement hook law 13 already
refuses, is not settled anywhere in the current text — the two have never
been read against each other before this pass.

**■ READ AGAINST EACH OTHER, 2026-08-20** — Kevin's own ask, after the
process-geometry reconciliation flagged this gap: "genuinely unsure, read
them side by side first." This is that read. It's an offered distinction,
not a ruling — his to confirm, reject, or amend.

Law 13's actual target, read against `feedback_no_auto_response_to_
notifications.md`'s own principle ("the system holds; Kevin moves"), looks
narrower than "any unprompted handback." A *hook* is a mechanism shaped to
pull someone back for the system's own benefit — it repeats when ignored,
it characterizes the held thing to make it more compelling, and its timing
is chosen to maximize re-engagement. `daily-cycle`'s own ON OPEN sequence
already crosses "unprompted resurfacing" successfully, today, uncontested —
it flags drift and recurrence without being asked. What makes it lawful
isn't its domain (system state); it's its *shape*: a single, non-escalating,
uninterpreted report, delivered once at a computable moment, that asks
nothing and doesn't repeat if ignored.

**The proposed test, offered:** a resurfacing mechanic is the forbidden hook
if it (a) repeats or escalates when Kevin doesn't act on it, (b)
characterizes or interprets the held material to make it feel more urgent
or compelling (this is also independently barred by law 14 and by
`stigmetric-trace`/`mark-record`'s own "never characterizes the set"
limits), or (c) times itself to maximize the odds Kevin re-engages rather
than to mark an actual, honest, computable event. It is the SAME lawful
shape `daily-cycle` already runs if it does none of those three — a single
delivery of something already his, once, at a real trigger, asking nothing.
On this reading, the domain (system state vs. a personally-paid cost) was
never the load-bearing variable; the shape of the delivery is.

**What this correction does not touch:** the vector-equilibrium geometry
itself, the twelve-organ registry's placement of any organ besides
mark-record, the jitterbug/chirality reasoning, `daily-cycle`'s existing
build-state resurfacing (which stays exactly as it is — its domain was never
in question), or any of the four sealed items named at the top of the
regather prompt (COLD_START, the pass-3 blueprint — neither of which this
pass found a file matching by that name in the current tree — and the ratified
seals PROTOCOLS.md itself carries, all read and left untouched above).

---

*Gathered, not decided. Carried back across the gate for Kevin to hold.*
