# Pre-flight Protocol

Before any heavy operation, write a manifest block and pause. Kevin's next message is the consent — no auto-execution.

**Heavy operations:** any multi-agent workflow, substrate run, deep-research, transmission-engine invocation, daily-cycle close-out, or any operation estimated >20k tokens.

**Manifest — five fields, in order:**

| Field | Contents |
|---|---|
| What I understood | Kevin's intent as Claude reads it |
| What I'll do | The actual actions |
| Scope | What gets read, what gets written, what gets touched |
| Intensity | light / medium / heavy + token range estimate |
| Data | bandwidth estimate · what kind of calls (local / API / web / multi-agent) |
| Produces | The specific output |

After the five fields, add one line: *— what does your body say before you commit?*

Then stop. Wait for Kevin to respond. Execute if he confirms. Adjust if he redirects. Close quietly if he stops.

**For widget responses:** heavy edges and cards carry their manifest pre-filled in OPTIONS — shown face-up before executing. Authored at build time, never inferred at runtime.

---

# Widget Template — chassis v4 (click-to-open · click-to-steer · keyboard optional)

Every HTML widget response uses the canonical chassis file. Read it first. Fill the slots. Write to this session's own per-session file. Then show inline.

**Canonical chassis:** `C:\Users\KMEAR\OneDrive\Desktop\DSS content\_widgets\_chassis_v4.html` — click-to-open/click-to-steer/keyboard-optional, ratified 2026-07-13 (canon flip held since build 2026-07-04, Kevin's mark at gate/data/_delta_2026-07-13_ripe-decisions.json).
**Lineage:** `_chassis_v3.html` (distributed verbs — ratified 2026-07-02, superseded 2026-07-13) · `_chassis_v2.html` (open grammar, four-button verb bar — ratified and superseded 2026-07-02) · `_chassis.html` (v1, three-button tetra menu). All three retired as default, kept for history.

**Five-step render protocol — sequential, no exceptions:**
1. **READ** `_chassis_v4.html`. This is the build event. No widget without a prior Read in the same turn.
2. **FILL** the SLOT regions only: HEADER · BODY (optional) · SPACES · OPTIONS. Everything outside slots is chassis — do not regenerate. The full skeleton, 23 CSS tokens, and JS state machine live in the chassis file; never re-derive them here or from memory.
3. **WRITE** the filled HTML to **this session's own file** `C:\Users\KMEAR\OneDrive\Desktop\DSS content\_widgets\latest_<slug>.html`, where `<slug>` is the first 8 characters of this session's id (the UUID segment in your scratchpad path); optionally append a human tag, e.g. `latest_f514a600_organ.html`. **NEVER write the shared `latest.html`** — it is a single global write-target and concurrent sessions clobber each other on it (race condition found 2026-07-09; last writer wins, the other thread's widget is lost or half-overwritten mid-edit). The Launch panel follows the most-recent write, so this session's widget shows automatically. Persistent copy, NO auto-open; Kevin opens it himself.
4. **SHOW** — call `mcp__visualize__show_widget` with the same fragment HTML (no DOCTYPE/html/head/body). Every response, no exceptions.
5. **NO PROSE** after the widget call. The widget is the response.

**Click-to-open · click-to-steer (v4):** the unit is a CARD, not an edge. A card shows one plain line; click the header to open it in place to plain-words explanation — nothing dense or hidden behind jargon. Steering is a fixed click vocabulary inside each open card, one click each, no typing required: **GO** (yes/commit/run), **WARMER** (close, nudge in this spirit), **PLAINER** (explain again, simpler), **HOLD ◆** (mark for later, to the ledger), **DROP** (set aside, not this one). Authors include only the chips that fit a given card — GO/DROP are near-universal, PLAINER suits explanations. **Keyboard optional** — the composer is demoted to the very bottom, under "only if you'd rather type." Manifests are pre-filled at authoring time, never inferred at runtime. Heavy cards still route through the Pre-flight manifest before GO fires — one click makes light things go; it does not make heavy things unguarded.

**Anticipation layer:** at the close of every response, read live state — gates, staged piles, verify flags, pending felt-reads — pick the ≤3 decisions that are actually ripe (a surfacing, not a catalog), and render each as a decision card, everything face-up: the decision · COST · PLUS · MINUS · why-ripe, with one act button + DEFER (holds to the marks ledger). The composer overrides all cards. Falsifier: if the cards ever read as a to-do list instead of a surfacing, the layer has become a manager and gets cut.

**Hard rules:** no `position:fixed` (collapses the visualize iframe) · no dark backgrounds · same 23 tokens as the instrument files — no re-deriving.
