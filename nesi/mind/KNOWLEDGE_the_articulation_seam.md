# KNOWLEDGE — The Articulation Seam
*The architecture Pass 5 (`BUILD — THE ARTICULATION SEAM`) builds. Written 2026-07-22, session 92924ff7, at Kevin's mark. This is the shape, not the code — the "why and where," read-with the pass prompt. Companion to `ENGINE_SOCKET.md` (which is the swap contract); this doc is where the motor plugs in, not how it swaps.*

---

## One sentence

**The articulation seam is the single point where stated language enters the tool** — one primitive, `articulate(context, mode) → stated language`, that every operation verb calls and nothing else does. It is dark until Kevin lights it; dark, it returns an empty socket, not a guess.

## The problem it resolves

Today the engine attaches through **scattered entry points**, not one. `ENGINE_SOCKET.md` (2026-07-16) already names the split honestly: two dispatch tables — `core.metabolize(pile)` (the metabolizer's own path, built first) and `bench.invoke(op, payload)` (bench `draft`/`break`/`refine`, interrogator `bearing_semantic`, reader `read`) — sharing a *contract* but never merged in code (core.py was protected ground that arc). Five call sites, two tables.

A diffuse engine has three costs the tool can't afford:
1. **You can't reason about where language enters** — so you can't prove the engine's blast radius.
2. **You can't guarantee "the engine has no path to canon"** — with five entry points, the trace is five traces.
3. **You can't light the engine as one clean act** — lighting it means touching five places, which means redesign, which means the motor was never really separable.

The seam fixes all three by collapsing the entry to **one**.

## The seam

```
articulate(context, mode) → stated language        # the ONE engine entry point
```

- **Every operation verb calls it. Nothing else does.** The falsifier is a grep: `articulate` is the only engine entry point, and no other module invokes the engine.
- It **inherits the engine-agnostic unit** already named in `ENGINE_SOCKET.md`: an engine registration is a pure `engine_fn(payload) → result`; **selection and fallback live in the caller** (`core.current_engine()`, reused verbatim), never inside a registration; a `stub` engine always exists and never raises; a failed real engine falls back to the stub **loudly** (the result records the fallback; a stub run is never passed off as real). `articulate` is the single caller that owns that discipline for the whole tool.
- It **collapses `metabolize` + `bench.invoke`** into itself. `mode` names what kind of articulation (what `op` used to name); `context` carries what the call needs (organ spec, operating context, the scaffold's output). One table, not two.

## Dark behavior — the empty socket, not the guess

With the engine off (`/login` unwired — the default, this whole rung), `articulate` **returns the empty-articulation socket**: a labeled placeholder that says *"stated language goes here, and it hasn't been stated yet."* It does **not** RESTORE-everything and it does **not** pass the scaffold straight through. Dark, the tool yields **scaffolded candidates awaiting one thing** — articulation — not passthrough.

That empty slot is not a dead end. It is a **socket in the socket circuit** (Pass 4, Circuit 4): a visible, labeled act-handle in the local view where Kevin — or later, the lit engine — supplies the missing language. This is why the two passes pair.

## The verb adapter — the shape every operation verb takes

```
operation verb  =  scaffold (non-AI, runs dark)  →  articulate(dark)  →  Candidate
```

- **The scaffold** is the verb's own non-AI work — real, inspectable, engine-off. It gathers, screens, routes, matches, formats. It never calls the engine.
- **`articulate(dark)`** is the one seam. Dark, it hands back the empty socket.
- **The Candidate** is what falls out — a scaffolded object with an open articulation slot.

Each verb **owns a named scaffold** (non-AI; all run dark):
- `extract` → screen/route the raw via embeddings — **reuse the live LINT path**, don't rebuild it.
- `develop` → pull the pattern plus its lineage/neighbors as context.
- `dream` → gather adjacent material and constraints as the seed.
- `ground` → check against the library/evidence via embeddings; return **matched vs. unmatched**.
- `convert` → apply the Composer's format template.
- **Pure-scaffold verbs** (e.g. `gather` = retrieve) have an **empty articulation mode** — they run fully dark and **never call the engine at all**. Build them that way; they are the proof the seam is optional, not mandatory.

*(The real, complete verb set is discovered from the running post-Pass-3 code at build time — this list is the known core, not an assumption. Pass 5 Step 2 does that discovery.)*

## The Candidate / gate / canon boundary — as a type

This is the load-bearing safety, and it is enforced by the **type**, not by care:

- `articulate()` and **every operation verb return a `Candidate`**. Not a canon entry — a candidate.
- **Only a gate verb promotes a `Candidate` toward canon**, and the gate verbs are Kevin's alone: `mark` / `cross` / `hold` / `compost` / `uncross`. None is reachable from the engine.
- **The engine has no path to canon.** The falsifier is a trace: enumerate every canon writer; **none may be reachable from `articulate` or from any operation verb without passing through Kevin's mark.** The engine can propose language into a Candidate's slot; it can never make that language canon. Kevin's gate is the only door, by construction — the same structural-incapacity move the library uses everywhere (`structural_incapacity_over_prohibition`): the engine doesn't *promise* not to write canon, it *cannot*.

## How it pairs with the circuits (Pass 4)

The seam and the circuits are one architecture seen twice:
- **A Candidate is a held thing** in the condition circuit (Circuit 1) — it carries state forward and awaits a terminal.
- **The empty articulation slot is a socket** in the socket circuit (Circuit 4) — the act-handle where the missing language is supplied.

So: run the circuits first (they build the loops and the socket surface), then the seam (every verb produces a Candidate that lands in those loops as a socket awaiting articulation). Together, a dark verb-run leaves a visible, resolvable open end — not a fire-and-forget.

## Laws this architecture obeys

- **Engine stays dark.** `articulate` is a dark stub until Kevin lights it — the last wire. No `/login`, no LLM call anywhere in this seam this rung.
- **`COLD_START.md` is sealed — no new verb.** `articulate` is a *refactor* (collapse `metabolize`/`semantic_pull`/`draft` into one), not a new grammar verb. Kevin's verbs are untouched.
- **Kevin holds every gate.** No AI marks. The engine proposes into slots; Kevin's mark is the only promotion.
- **Compost leaves a line. Pre-flight the heavy. Vocabulary is load-bearing.**

## The one falsifier that decides the whole architecture

> **Could the engine be lit later by filling articulation slots alone, with zero redesign?**

If yes, the seam is clean — the motor plugs into exactly one socket, and lighting it touches nothing else. If lighting the engine would require changing a verb, a scaffold, or a canon path, the seam is misplaced (echoing `ENGINE_SOCKET.md`'s rule: *"if a swap needs to touch anything else, the seam is misplaced — fix the seam, don't route around it"*). The seam's whole purpose is to make the engine the **last wire**: everything runs dark and complete, and the engine, when it comes, only fills the sockets already waiting for it.

## Relationship to the neighboring docs

- **`ENGINE_SOCKET.md`** — the swap contract: which engine runs, fallback discipline, the honest weld ledger (boot, auth, hook). *How the motor swaps.*
- **This doc** — the seam's position in the verb topology: one entry, verb adapters, the Candidate/gate/canon boundary. *Where the motor plugs in.*
- **The circuit-completion pass** — the loops the Candidates live inside. *How held things come back and resolve.*

Read all three together and the picture is one tool that runs fully dark today, produces resolvable candidates, keeps the engine incapable of touching canon, and is ready to be lit by one wire whenever Kevin chooses — never before.
