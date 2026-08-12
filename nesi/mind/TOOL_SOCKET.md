---
name: tool-socket
description: "The tool-socket contract — one shape every external tool (Miro, Google Docs, mail, calendar) fills to become a NESI surface. Defines read-in (external content → proposed nodes) and write-out (a NESI mark → a projection into the tool), with the impedance rule baked in: node model canonical, socket translates. Extends the engine-socket seam pattern from engines to tools. This is the backbone of NESI-as-meta-handle."
metadata:
  type: project
  status: SIGNED-OFF 2026-07-22, Kevin's mark — the one shape every future tool socket fills (two functions read_in/write_out · three laws · impedance rule). Any future socket is checked against this contract; none gets wired its own bespoke way. Generalizes the proven miro-handler instance (comment-to-gate + gate-to-board). Two blockers SETTLED 2026-07-22 (sync = manual+on-mark, no polling · id = NESI id in tool metadata) — see §RESOLVED. Miro round-trip is the first live build.
---

# NESI — the tool-socket contract (the meta-handle backbone)

*The meta-handle claim, made precise: NESI never becomes Miro, Google Docs, mail, or a
calendar. It reaches through a **socket** into each, pulls their content home as nodes, and
projects your marks back out as the tool's native shapes. The **model stays native** (your
grammar, the node data-model); the **surfaces stay socketed** (external, borrowed, driven).
You learn no new tool — you keep using the tools that exist, and NESI drives them and brings
the process in-house. This page fixes the one shape every socket fills so that adding the
next tool is filling a form, not inventing a bridge.*

**Provenance:** this is not new either. The **engine socket** (`ENGINE_SOCKET.md`) already
proves the pattern for engines — one seam, `metabolize(pile) → staged_object`, caller owns
selection and fallback, nothing outside knows which engine ran. The **miro-handler**
(`nesi/bench/miro-handler/`) already proves it for one tool: it reads board comments into
the gate (read-in) and syncs the gate to a board table (write-out), under read-before-write
and a cost brake. This page names the CONTRACT those two already share, extended from
engines to tools, so "one socket shape" is checkable instead of asserted. Where a built
socket and this page disagree, the built socket wins and this page is wrong — say so.

---

## Spec form (construction-language Line 2 canon)

```text
ORGAN:      the tool-socket — the seam every external tool fills to become a NESI surface
PROBLEM     each external tool has its own model, its own API, its own idea of what a thing
            is. Wire them one-off and every tool is a bespoke bridge that drifts, and the
            tool quietly becomes the authority over NESI's own nodes. No shared contract →
            no meta-handle, just a pile of adapters.
FORCES      pull to just call the Miro API directly (fast, one-off) · pull to let the tool's
            structure define the node (it's already structured!) · against both: NESI's
            grammar must stay canonical or the whole in-house claim collapses; and read-in
            must never mint fact, or the membrane leaks at the tool boundary.
FORM        one contract, two ops — read_in (tool content → PROPOSED nodes) and write_out
            (a MARK → a projection into the tool) — plus three laws (below). Boundary —
            takes in: an external source reference. Hands off: proposed nodes on the way in,
            a projection receipt on the way out. Stops: it never ratifies (read-in is always
            proposal) and never writes unbidden (write-out needs a mark).
FALSIFIER   if a socket ever writes ratified state on read-in, or projects outward without a
            mark, or the external tool's shape overrides the node model — the socket has
            become the authority. Cut the socket's authority, not the model.
PLUMB       ENGINE_SOCKET.md (the seam pattern) · NODE_DATA_MODEL.md (what a node/edge is,
            and the membrane law: only Kevin's mark ratifies) · the gate + membrane-controller
            (the only writers to canon) · miro-handler (the proven instance).
FALSE CAR   the miro-handler IS the false car — one tool socket running under temp power
            today (comment-to-gate, gate-to-board). This doc is the rail it already runs on,
            written down and generalized.
ENTRANCE    one source reference at a time — a board URL, a doc id, a thread, a calendar.
            No tool is reached through another tool's socket.
INTERLOCK   this contract must NOT specify the render (how nodes look on screen) and must NOT
            grant a socket the power to ratify or to send/publish on its own. Those stay the
            node model's and Kevin's mark, respectively.
SIGN-OFF    ✓ SIGNED-OFF 2026-07-22, Kevin's mark — the one shape every future tool socket fills.
```

---

## 1 · THE CONTRACT — one shape every socket fills

A socket is a named adapter for exactly one external tool. It fills this shape and nothing
more. Everything a tool can do for NESI is one of two directions.

```text
Socket = {
  name,                                   # "miro" | "gdocs" | "gmail" | "gcal"
  capabilities: { reads: bool, writes: bool },

  read_in(source_ref)  -> [Projection]    # external content  →  PROPOSED nodes/edges
  write_out(mark, target_ref) -> Receipt  # a ratified MARK   →  a native shape in the tool
}
```

- **`read_in(source_ref)`** — point it at a board, a doc, a thread, a calendar. It reads the
  tool's native items and **translates each into the node shape** from `NODE_DATA_MODEL.md`
  (id + content + provenance), returning them as `Projection`s. Every node it returns enters
  NESI as **PROPOSED** (see Law 1). It creates nothing canonical.
- **`write_out(mark, target_ref)`** — given a ratified mark and a place to put it, it
  **translates the node/mark into the tool's native shape** (a Miro sticky, a doc section, a
  draft email, a calendar event) and projects it out, returning a `Receipt` recording what
  went where. It fires **only on a mark** (see Law 2).

```text
Projection (read-in unit) = { node: {id, content}, from_tool, source_ref, ts, loss? }
Receipt    (write-out unit)= { mark_id, tool, target_ref, native_id, ts, loss? }
```

The caller — not the socket — owns selection ("which tool"), just as the engine socket's
caller owns "which engine." A socket is a pure translator: reference in, projections or a
receipt out. Nothing about *when* to sync or *whether* to trust lives inside it.

---

## 2 · THE THREE LAWS — the socket's fallback-law analog

The engine socket has three rules (try selected · fall back loudly · stub always exists).
The tool socket has three of its own, and they are the membrane, living at the tool boundary:

1. **Read-in demotes.** Everything crossing IN from a tool enters as **PROPOSED**, no matter
   how official it looks in the tool. A pinned Miro card, a headed Google Doc, a starred
   email — all become proposed nodes. **No socket can mint ratified state.** This is the node
   model's membrane law (only Kevin's mark ratifies) enforced at the seam: the external tool
   may *propose*, it can never *ratify*.

2. **Write-out requires a mark.** Nothing projects outward except on a ratified mark — the
   downstream transaction/crossing face. The socket is the hand's extension, never an
   autonomous writer. **Fail-closed: no mark → no write.** For send/publish tools (mail,
   posting) the projection is a *draft*; the send is its own separate mark, never folded into
   write_out. (This is also the safety line — a socket never sends on NESI's behalf.)

3. **Loud translation loss.** When the tool's shape can't fully carry the node, or the node
   can't fully carry the tool's item, the loss is **recorded on the Projection/Receipt
   (`loss`), never silently dropped** — the same spirit as the engine's loud fallback. A
   lossy crossing badges itself so a half-translated thing is never passed off as whole.

---

## 3 · THE IMPEDANCE RULE — node model canonical, socket translates

The one real cost of the socket path is impedance: Miro's model is not the node model;
Google Docs' is not either. The rule that keeps the tool from becoming the authority:

> **The node model is canonical. The socket translates in both directions. When the tool and
> NESI disagree about what a thing is, NESI wins and the socket re-projects to match.**

Concretely:
- **On read-in**, the socket maps the tool's native shape *onto* the node shape. What doesn't
  fit the node model is dropped-with-loss (Law 3), not carried as a foreign field. NESI never
  grows a "miro-only" attribute; the node shape stays clean.
- **On write-out**, the socket maps the node/mark *onto* the tool's native shape. The tool may
  render it however it renders things — that's cosmetic. The canonical truth stayed in NESI;
  the tool holds a *projection*, never the master.
- **Round-trip identity:** a node projected out and later read back in is recognized as the
  **same node** by its NESI id carried in provenance — not re-created as a new proposal.
  (The mechanism for carrying the id across a tool that has its own id space is an §OPEN edge.)

The test: if you deleted every external tool tomorrow, NESI would lose its *surfaces* and its
*reach*, but not one canonical node, tie, or mark. If deleting a tool would lose canon, the
tool had become the authority — the impedance rule was violated.

---

## 4 · INSTANCES — the same contract, filled four ways

| Socket | read_in (→ proposed nodes) | write_out (mark → native) | caps | status |
|---|---|---|---|---|
| `miro` | board comments + stickies/shapes → proposed nodes/edges | mark → board item / table row / session-log | r+w | **built** (miro-handler: comment-to-gate + gate-to-board) |
| `gdocs` | a doc's sections/paragraphs → proposed nodes | mark → a doc section or comment | r+w | socket wired (Drive MCP), contract unfilled |
| `gmail` | a thread → proposed nodes (one per message) | mark → a **draft** only; send is a separate mark | r+**w-draft** | socket wired (Gmail MCP), contract unfilled |
| `gcal` | events in a window → proposed nodes | mark → an event (create/update), confirm before write | r+w | socket wired (Calendar MCP), contract unfilled |

Each is the *same two functions* with a different translator inside. Adding the fifth tool is
writing one `read_in` + one `write_out` and declaring caps — not designing a new bridge. The
MCP connections already exist; what's missing is the contract filled per tool, not the plumbing.

---

## 5 · HOW IT COMPOSES — and the transaction-face lens

- **Engine socket** answers *which engine ran*. **Tool socket** answers *which tool*. Same
  seam shape, orthogonal axis. An organ can use both: read a doc in (tool socket), metabolize
  it (engine socket), propose nodes.
- **Node model** is the canonical shape both directions translate to/from. The tool socket is
  the only lawful way external content *becomes* nodes.
- **Gate / membrane-controller** remain the only writers to canon. A socket's read-in lands
  proposals in the intake/proposed zone; crossing a proposal to ratified is still the
  membrane-controller under Kevin's mark. The socket never touches canon directly.
- **The transaction-face lens (today's):** `write_out` **is** the transaction face — the
  downstream crossing that projects a mark into the world, and it requires a mark (Law 2),
  exactly as the fourth face sits downstream of the three. `read_in` feeds the three upstream
  faces — the floor of proposals from which value is built. The socket contract and the tetra
  lens are the same geometry from two angles: the floor is built by read-in, the ceiling is
  crossed by write-out, and the crossing is always your mark.

---

## §RESOLVED — Kevin's marks, 2026-07-22

- **Round-trip id carriage — SETTLED.** On write-out, the socket stores the **NESI id in the
  tool item's metadata** (a Miro item's metadata field, a doc comment anchor, etc.). On
  read-in, the socket reads that metadata back: if a NESI id is present, the projection is
  recognized as the **same node** (not a new proposal); if absent, it's a genuinely new
  proposed node. A socket-side id map is a fallback only for tools with no writable metadata.
- **Sync trigger — SETTLED.** read_in/write_out fire **manual + on-mark only**. Manual = an
  explicit "sync now." On-mark = write-out fires at the moment a mark is made (the crossing).
  **No ambient/polled sync, ever** — that is the composted objection, and the contract forbids
  a socket from firing on a timer or a background watch.

## §OPEN — still carried

- **Edge projection.** How NESI edges project onto a tool with connectors (Miro) vs one
  without (mail). Likely a third cap flag (`edges: bool`).
- **Conflict resolution mechanics.** The impedance rule says NESI wins; the *mechanics* when a
  tool item changed since last read (re-propose? flag divergence?) belong to the build.
- **Cost brake generality.** Contract-level budget vs per-socket. Lean: contract-level.
- **Edge projection.** read_in for nodes is clear; how do NESI edges (ties) project onto a
  tool that has connectors (Miro) vs one that doesn't (mail)? Per-tool capability, likely a
  third cap flag (`edges: bool`).
- **Conflict resolution shape.** The impedance rule says NESI wins — but the *mechanics* when
  a tool item changed since last read (re-propose the change? flag a divergence?) aren't
  specified. Belongs to the round-trip build, not this contract.
- **Cost brake generality.** miro-handler has a per-session item budget. Should the brake be
  part of the contract (every socket declares a budget) or stay per-socket? Lean: contract-level.

*Falsifier for this page: if it produces adapters without a shared shape — if each tool ends
up wired its own way despite this contract — the contract was decoration. Cut it, keep the
one socket that actually runs.*
