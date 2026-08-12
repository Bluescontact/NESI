# ARTIFACT GRAMMAR — the definition layer
**Drafted:** 2026-07-16 · NESI memory-migration step 5 · **Status: RATIFIED — Kevin's mark 2026-07-16, "ratify as written." This file is NESI-side authority for vocabulary; questions resolve here first.**
**Why this file exists:** Tier 3 of the memory migration found that the artifacts carry the grammar *in use* (provenance, verdicts, mark-reasoning inline) but never *define* it. A cold reader sees the pattern working, not the pattern stated. This file is the missing definition layer. It was informed by a live experiment: Copilot was handed the vocabulary key and still drifted four of the load-bearing words the moment its task turned generative — so each definition below carries its observed wrong reading as a negative example. Definitions don't bind when the reader's task turns generative; that is this file's own operating caveat, stated up front.

---

## 0 · How to read this file

Every word here is load-bearing: the system's integrity depends on these words keeping their exact meanings across sessions, engines, and readers. Each entry has three parts — **IS** (the definition), **IS NOT** (the observed or likely drift), and **IN ARTIFACTS** (how the word must appear when used in a document). If you are an AI reading this: your fluency does not license reinterpretation. When in doubt, quote the definition rather than paraphrasing it — paraphrase is where the drift starts.

## 1 · The vocabulary

### mark
- **IS:** a human decision, typed by Kevin. The only thing that ratifies, promotes, deletes, or publishes anything. AI never marks.
- **IS NOT:** *"becomes canon"* (Copilot's drift). A mark is the human act, not the resulting state change. Material doesn't "get marked" by accumulating machine confidence.
- **IN ARTIFACTS:** every mark is recorded with date + Kevin's words when available ("Kevin's mark: 'compost the other two'"). A document that changed state must show which mark changed it.

### stage
- **IS:** to produce output that *awaits* a mark. All machine work is staging. Staged material is complete, inspectable, and inert until marked.
- **IS NOT:** a soft form of done. Staged ≠ accepted-pending-formality. A staged thing may be composted without ever being read.
- **IN ARTIFACTS:** staged documents say so in their status line ("STAGED — awaiting Kevin's mark") and never describe themselves as decided.

### cross / the membrane
- **IS:** the one-way passage between private material and the public-facing library (canon). Crossing is a ceremony Kevin performs; it cannot be queued, batched, or automated. The Membrane Controller holds exclusive write authority at the two crossing points.
- **IS NOT:** *"contradiction"* (Copilot's drift — it read "cross" as conflict). Crossing is movement through a boundary, not tension between claims.
- **IN ARTIFACTS:** a crossed pattern records its crossing date and the mark that crossed it. Private instances never cross; only the abstracted pattern does ([[feedback_composting_threshold]]).

### compost
- **IS:** to retire material with a recorded reason. Nothing is deleted silently; compost leaves a line. Composted material stays on disk as lineage.
- **IS NOT:** failure or erasure. Compost is a normal metabolic outcome — most material should compost. A composted direction can seed a later one.
- **IN ARTIFACTS:** the compost line states the reason in plain words, ideally Kevin's own ("Kevin's one-line falsifier: 'would kevin actually use this? no.'").

### HOLD
- **IS:** a verdict meaning "not yet, **and here is the named condition that would change it**." The condition is mandatory — a HOLD without a re-screen condition is just procrastination with a label.
- **IS NOT:** *"felt-sense of safety"* (Copilot's drift — it collapsed HOLD into *holding*, the machine's care function). HOLD the verdict and holding the function share a root deliberately, but the verdict is a routing decision, not an embrace.
- **IN ARTIFACTS:** every HOLD carries its condition inline: "HELD — aspirational until a real workshop→scaffold rebuild is observed."

### uncross *(fourth verb — ratified 2026-07-19, Kevin's mark: "keep undo, update the rules")*
- **IS:** Kevin's one-motion rollback of a mistaken cross — the pattern folds to `patterns/_folded/` (kept, never deleted), the index rebuilds sync-loud or the fold reverts, and the ledger records `uncross`. Kevin-only, like every mark.
- **IS NOT:** an automatic or engine-initiated reversal, a soft delete, or "contradiction." It fires only on Kevin's touch, only on a crossed object, and leaves the full trail.
- **IN ARTIFACTS:** an uncrossed pattern's record shows both events — the cross and the uncross, dated — never a silently vanished entry. A ledger line reading `correction` is an **annotation**, not a mark: it names a discrepancy on the page (per rule 4 below) and no code acts on it.

### canon / patterns/ / the lint
- **IS:** the library of ~90 ratified, transferable patterns — the flat reference surface all new work is checked against. Kevin's figure: a machinist's flat table, precision overbuilt in, that other tools get built and checked against.
- **IS NOT:** *"ruleset"* (Copilot's drift). The lint doesn't command; it *references*. New work is screened against it for coherence, not compliance.
- **IN ARTIFACTS:** cite patterns by filename (`patterns/anatomy_is_not_the_cockpit.md`). A claim screened against canon says which patterns it touched.

### the gate
- **IS:** the queue of staged items awaiting Kevin's marks, plus its data file (`gate/data/gate_data.json`). The gate is human-only territory: no approve button, no auto-mark, ever.
- **IS NOT:** a task list or a pipeline stage. Items don't age out, escalate, or auto-apply.
- **IN ARTIFACTS:** deltas are staged *to* the gate as files; the GHOST-GATE rule requires reconciling gate/pending against patterns/ so no delta bypasses unstamped.

### felt-read
- **IS:** a somatic yes/no Kevin performs. Deliberately not automatable. Instruments exist to *prompt* it (body-question composer, mark-record's field 5); none exist to *pass* it, simulate it, or infer it.
- **IS NOT:** sentiment, mood, or confidence. Any system that writes, paraphrases, or scores a felt-read has violated the grammar at its root ([[feedback_body_read_is_his]]: slots exist silently; blank = complete).
- **IN ARTIFACTS:** the felt-read field appears blank unless Kevin filled it. A blank field is a complete record, not a missing one.

### organ
- **IS:** a named function of the system — metabolizer (sorts raw piles into dispositions), substrate (extracts patterns from writing), Converger (routes promote/hold/compost), Governor (the brake on Kevin's own overwork), daily-cycle (session open/close ritual), and peers. Organs are anatomy.
- **IS NOT:** a menu item. Anatomy is not the cockpit (`patterns/anatomy_is_not_the_cockpit.md`): the seven constitutional organs and the daily interface are different layers, many-to-many, never rendered 1:1.
- **IN ARTIFACTS:** organ names are lowercase working words, not product names. An artifact produced by an organ names the organ and its mode.

### the tetrahedron
- **IS:** the development protocol — four agents with opposed jobs (Grounder holds what's real · Dreamer reaches · Governor cuts · Shaper forms) coupled by six stated tensions, with a separate synthesis step at the center. The meaning-compression engine: what survives four opposed constraints is dense and drift-resistant.
- **IS NOT:** a review checklist or a brainstorm-then-edit pass. Running only two vertices (screen + break-test) is a collapsed cycle — the standing rule is full tetrahedron for development chains, and the missing Dreamer is exactly how the geometry itself once went missing.
- **IN ARTIFACTS:** a tetrahedral product records which vertices ran, the cuts the Governor made, and carries a cycle identity. Survivors are listed as survivors, cuts as cuts — the artifact shows the compression, not just the residue.

## 2 · The artifact rules (grammar-in-use, made explicit)

Any document produced inside this system must carry:
1. **Status line** — one of: DRAFT / STAGED / HELD (+condition) / RATIFIED (+mark date) / COMPOSTED (+reason) / lineage-only. Near the top, dated.
2. **Provenance** — what produced it (session, organ, chain, commission) and what it was produced *from*.
3. **Mark-reasoning inline** — when a mark changed this document's state, the mark's date and (when available) Kevin's words appear at the point of change, not in a separate log.
4. **Verdicts with conditions** — every HOLD names its re-screen condition; every compost names its reason; every correction stays on the page struck-through or noted, never silently overwritten ("discrepancy named, not smoothed").
5. **Falsifiers where claims live** — a document making a structural claim states what observation would break it.
6. **No self-ratification** — no artifact may describe itself as canon, ratified, or decided by virtue of its own coherence. Fluency is not authority (constitutional law #2).

## 3 · The transmission caveat (this file's own falsifier)

The Copilot experiment showed that definitions do not bind a reader whose task has turned generative — it rewrote the spec with the dictionary in its hand. So this file's claim is deliberately modest: it makes drift **detectable and correctable**, not impossible. The check is mechanical: when an artifact or a return uses a load-bearing word, compare its usage against the IS/IS NOT lines here. Wrong-guess-with-key-in-hand is the signal that matters (the sharpened vocabulary ask from spec v1.1).

**Falsifier for this file:** if new artifacts stop carrying provenance, verdicts, and mark-reasoning after an engine swap, this grammar failed to transmit the habit — that outcome is already named in the migration doc as failure mode 3, and it would mean this file needs to become enforcement (harness-level), not documentation.

---
*Ratified as written, Kevin's mark 2026-07-16. This file stands with PROTOCOLS.md and reflexes.md as NESI-side authority; future vocabulary questions resolve here first. Amendments enter the way this did: drafted, then marked.*
