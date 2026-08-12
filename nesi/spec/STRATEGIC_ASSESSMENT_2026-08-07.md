# NESI — WHOLE-GAME STRATEGIC ASSESSMENT

**Written 2026-08-07 at the close of session 40e00418.** Counted from disk and from the three
ledgers, not from memory. It assesses development; it does not rank what to build, and where
it names a cost it names it on both sides.

**Standing count:** 504 marks · 84 gates open · 355 decisions offered / 328 live · 51 scripts
and 27 scenes in `nesi/world3d` · 178 files in `patterns/` · 507 in `_INTAKE/` · 37 in
`nesi/spec/`.

---

# I · THE ONE-SENTENCE STATE

**Her laws are close to finished, her body is a landscape with no verbs, and no second person
has ever been inside her.**

Everything below is detail on those three clauses, in that order, because they are in that
order of health.

---

# II · WHAT IS ACTUALLY STRONG — and it is not the part that gets attention

**1 · The law layer is nearly complete and it is internally consistent.**
The recognition law (*the mechanic never does the recognizing*) generates the rest. Below it:
locate never steer · a surface holds nothing · no scoring, ranking or worth · no completion
function · no read receipts · nothing directs the body · retained until processed, never until
timed-out. In a month of heavy generation, **no law adopted has had to be retracted.** That is
unusual and it is the project's real asset.

**2 · Four prohibitions became physics today.** Precession — *pointing at a second output
destroys it* — converts no-flagging, no-scoring, the far-gate-opens-from-the-other-side and
the refusal of acknowledgment from things the system must not do into things that cannot be
done without breaking the mechanism. A prohibition can be argued with; a mechanism cannot.
**This is the single largest structural gain of the session and it cost no code.**

**3 · The instruments work, and they fail closed.** Three append-only ledgers. Nothing has been
lost. Every claim in this document is checkable. Twice this session a tool refused a bad
write — the offer brake refused a second decision, and `answer` refused an option that had
never been offered. **Both refusals were correct and both produced better outcomes than
compliance would have.**

**4 · The round trip is closed.** Ledger → file → engine → a stone a person can walk to.
Everything in the design assumes that link and it exists and has been walked.

**5 · The core needs no model.** The grain is declared, not computed — 385 hand-written links.
The laws forbid the expensive thing, so the machinery that does it was never needed. She runs
on a basic laptop, offline, by construction rather than by optimisation.

---

# III · WHAT IS WEAK — stated plainly

**1 · She is read-only. This is the whole gap.**
51 scripts, 27 scenes, a walkable world — and almost nothing a person does inside her changes
her. The writing surface works and deposits land. Beyond that there are no verbs. Everything
in the design from the four stations upward assumes verbs that do not exist in code.

**2 · Headless-passing has been standing in for playing.**
A standing gate from 08-05 records that thirteen scenes passed headless and **the export was
never opened.** Under the Definition of Done, *the mechanism works* has been satisfied
repeatedly and *this does what you needed* has rarely been asked. The test-scene list is a
build log, not a play log.

**3 · The decision ledger does not drain.**
16 answered of 355 offered by one count; 68 of 355 by another (the two commands disagree — see
§VI). Either way the shape is the same: **asking has been the wrong instrument.** The brake
added on 08-06 is the correct response and it held all session.

**4 · Gates accumulate faster than they close.** 84 open, the oldest nine days old. They are
working as designed — a gate exists so a thing survives a session — but nothing drains them
except a session that decides to.

**5 · Over-developed, under-delivered — your own words, and the count agrees.**
Many things that run; none playable end to end. The unit that repeats is already named (one
spire holds the whole game) and three of the twelve things it needs are on disk unsited or
unwired.

**6 · The corpus grows faster than it is metabolised.** 507 files in `_INTAKE`. 32 uncrossed
PROMOTEs and 57 conditioned HOLDs in `patterns/` — an extraction that was started and never
finished. Six new files landed today alone, four of them mine.

---

# IV · THE STRUCTURAL DIAGNOSIS

Three observations that are not in any single ledger.

**A · The bottleneck has moved and the work has not moved with it.**
For weeks the bottleneck was *what is this*. That is now largely answered: the physics are
named, the geometry is settled (nine edges), the filter is settled, the refusal exists, and the
apex has a purpose. **The bottleneck is now verbs in code, and almost all recent output has
been more articulation.** The dream pass filed today named this from the inside — *"the world
does not need more of me"* — and this document is itself more articulation, which is worth
noticing rather than defending.

**B · The best moves of the day came from reading, not from choosing.**
Five rulings — the fourth fraction, two development marks, and the membrane filter — came from
you reading a collision and answering in a sentence. The one thing offered with buttons is the
one that did not land and had to be restated. **A decision surface fixes the answer space at
authoring time, and your best moves routinely come from outside it.** Recorded to memory.

**C · Elegance is now the risk, not confusion.**
Today four documents fitted together perfectly, three of four fractions turned out to already
exist under other names, the geometry needed no adjustment, and the evening's ruling dissolved
the morning's hardest problem. That is either a coherent system revealing itself or a metaphor
that has stopped being tested. `THE_VISION_WHOLE` warned about exactly this — *a metaphor that
explains everything has usually stopped being tested.* **Every strong pattern from today now
carries a written falsifier. None has been run.**

---

# V · THE DEVELOPMENT PICTURE, BY LAYER

| layer | state | what it is waiting on |
|---|---|---|
| **laws / refusals** | near-complete, consistent | nothing — this layer is not the constraint |
| **geometry** | settled (nine edges, shared face) | organ assignment across the nine |
| **the apex** | purpose named, room unbuilt | verbs |
| **the filter** | **settled today** — a shaped membrane, nothing classifies | what the five verbs *do* — pull, push, tension, gate, lock |
| **the dam** | code exists | a site in the terrain |
| **the third output (refusal)** | ruled | a place with no gradient — possibly held ground (X3) |
| **the descent / spires** | named | build |
| **the landscape** | built and walkable | to be changed by something a player does |
| **the deep** | named, never renders | nothing — deliberately |
| **the lock / the rim** | exists | a second person; and whether the door is the rim or a spring |
| **frequency** | empty slot | X2, marked for development |
| **build gates** | two proposed, neither adopted | X5, marked for development |

---

# VI · GAPS CLOSED THIS SESSION, AND ONE FOUND

**Closed (a build, small and tested):** `decisions.py` had no way to record a decision settled
by having its premise removed. `answer` refused correctly; `compost` is time-based and carries
no reason; so a resolved question sat live and the answer-rate under-reported the kind of
resolution that has worked best. **Added `supersede --tile --by`**, which writes a distinct
event rather than faking a chosen option, and added `superseded` to the resolved set.

Running it exposed a **second, pre-existing bug**: `verify` took the last record of *any* kind
for a tile, so a resolved tile looked like a stale deposit and the surface breached. Fixed —
only `offered` records are deposits. That bug would have fired the first time any answered tile
was re-rendered, which had simply never happened yet. Both changes tested against this surface
and regression-checked against another; `status`, `open` and `compost` unchanged.

**Found and deliberately not fixed:** `status` reports 16 answered, `open` reports 68. The two
derive it differently. A counting change to a ledger is yours, not mine — gated.

**Not done, and it needs your mark:** the memory index is 163 lines and wants to be under 140.
The honest compaction is to merge the twelve widget/chassis feedback entries into one file
preserving their content verbatim, then delete the twelve. **That is a delete, and nothing gets
deleted here without your mark.** Left alone.

---

# VII · WHAT WOULD FALSIFY THIS ASSESSMENT

- If someone walks the built world and finds verbs that work, §III·1 is wrong and the gap is
  smaller than stated.
- If a filter membrane is built and a person cannot tell what their own shape is doing without
  being told, *"apparent without thought"* was a description of the idea rather than the thing.
- If the four documents of today turn out to contradict something in the built code — the code
  was never opened this session — several claims here inherit that error.
- If precession is found to have one clean counterexample, §II·2 collapses to a nice metaphor.

---

*Nothing in this document rules anything, adopts anything, or says what to build next. The
open work is on the gates and the marks are in `MARKS_LOG.jsonl`. Whether this assessment is
what you needed is yours to say.*
