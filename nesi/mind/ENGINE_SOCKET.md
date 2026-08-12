# ENGINE SOCKET — the seam contract and the honest weld ledger

**Home:** `nesi/mind/ENGINE_SOCKET.md` · written 2026-07-16, the session the
first real engine was wired.

## The contract
One function: `metabolize(pile) -> staged_object` (nesi/conductor/conductor.py).
Prompt in, structured JSON out. Nothing outside the seam knows which engine ran.
Engines registered: `stub` (engine #0, always available) · `claude-cli`
(claude -p, headless). Selection at runtime: `NESI_ENGINE` override, else CLI
if installed, else stub. A failed real-engine run falls back to the stub
LOUDLY — the object records the fallback string, the card badges it. A stub
run is never passed off as a real one.

Everything the engine needs crosses through the call: the organ spec
(`nesi/bench/metabolizer/SKILL.md`), the operating context
(`nesi/mind/ORGAN_CONTEXT.md`), and the pile path. All NESI-owned.

## Swap procedure (proven twice: stub→wire, and the fallback path)
Replace one function body in the ENGINES registry. If a swap needs to touch
anything else, the seam is misplaced — fix the seam, don't route around it.
Next known swap: router/Ollama local engine — evaluate on OUTPUT QUALITY
(does it strip-writer-keep-world well?), not under unblock pressure.

## The honest weld ledger — what still touches the engine's pocket
1. **Engine boot.** `claude -p` itself loads `~/.claude/CLAUDE.md` (the
   pointer → PROTOCOLS.md) and vendor settings/hooks before our prompt
   arrives. Engine-internal; the organ prompt explicitly overrides format
   protocols for headless runs. A different engine in the socket won't have
   this weld at all.
2. **Auth.** Login/token lives in the engine's own store (`claude /login`).
   Kevin's hand, engine-private by design.
3. **The vendor UserPromptSubmit hook** (migration item 4) still lives in
   vendor settings.json and is load-bearing for CHAT sessions. Left in place
   deliberately — moving it risks the live chat protocol; it does not govern
   what the organ reads, only how the engine boots.
None of these welds carries NESI's memory. NESI's operating context, organ
specs, protocols, and canon are all NESI/DSS-owned. Swapping engines loses
auth and boot quirks, not memory.

## The engine-agnostic unit (named 2026-07-20, § NESI SESSION 3/3 — Kevin's mark, not assumed)

Every call site audited this session: metabolizer (`core.metabolize`, live
since before this arc), bench `draft`/`break`/`refine` (S2), interrogator
`bearing_semantic` (S1), reader `read` (S3, new). Four of five already share
one literal function — `bench.invoke(op, payload)`. The fifth, the
metabolizer, does NOT call `bench.invoke()` — it has its own dispatch
(`core.metabolize(pile) -> ENGINES[eng](pile)`), built first, before the
socket existed. **This session did not merge them in code** — core.py is
protected ground this arc, and a real merge is a build, not an audit. What
it does instead: names the CONTRACT the two dispatch tables already share,
so the claim "one seam" is checkable instead of asserted.

**The engine-agnostic unit, proposed default:**

```
engine_fn(payload: dict) -> result: dict
```

An engine registration is a pure function: structured request in, structured
result out. Nothing about engine SELECTION or FALLBACK lives inside it —
that's the caller's job (`core.current_engine()`, reused verbatim by both
`core.metabolize()` and `bench.invoke()`), and neither dispatch table lets a
registration's own body decide the fallback. Both tables obey the same three
rules: (1) try the selected engine's registered function, (2) any exception
falls back to the `stub` entry LOUDLY — the result records the fallback
string, never silently passes stub output off as real, (3) a `stub` entry
always exists and never raises.

`bench.invoke(op, payload)` is this unit's canonical FORM: `op` names which
registered behavior to run, `payload` is that behavior's structured input,
the wrapper `{op, engine, stub, output}` makes the fallback visible to every
caller without each one re-deriving it. `core.metabolize(pile)` is the SAME
unit with a narrower, single-purpose payload (just a path) baked into the
function name instead of carried as an explicit `op` — same three rules,
same fallback law, same `current_engine()` selector, different call shape
because it predates the socket.

**Marked, not assumed (Kevin's to ratify):** should metabolizer's call site
be rewritten to `bench.invoke("metabolize", {"pile": p})` so there is
literally one function everything calls — or does the unit stay defined at
the CONTRACT level (three rules + `current_engine()`) with two conforming
implementations, since metabolizer's payload (a raw pile, not JSON) doesn't
obviously fit the `{op, payload}` shape without also renaming what "payload"
means for it? Default proposed here: leave metabolizer as a second
conforming implementation, not a call site to migrate, until Kevin reads
this and says otherwise — a real code merge belongs to a session that has
core.py in scope, not one where it's protected ground.

## Go-live gate (unmet as of writing)
The CLI is installed (`~/.local/bin/claude.exe`, v2.1.212, on user PATH) but
NOT logged in, and this workspace is untrusted for headless permission grants.
Kevin's one-time hand: open a terminal in `DSS content`, run `claude`, accept
the trust dialog, run `/login`. Until then every run falls back to the stub,
loudly.
