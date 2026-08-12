# Five validated tetrahedron data stores + schema + validator

**What:** Machine-readable tetrahedra (architecture, cognitive, developmental, somatic, temporal) — each 4 vertices / 6 edges / 4 faces as JSON against one schema, with a working Python geometric validator (K4 and directed-phase-cycle topologies).

**Source:** `Ari_Tal_handoff/tetrahedra/*.json + tetrahedron.schema.json + validate.py`
**When:** pre-2026-08

**Evidence (verbatim):**
> "four diagnostic instruments, each in narrative and machine-readable form, against one schema, with a validator" (README.md); validate.py: "complete_undirected - the 6 edges are exactly the undirected pairs of K4"

**Capacity:** Ready-made 4/6/4 tetrahedron content and integrity-checking for the entry tetrahedron of the net — named vertices with definitions, edges as relations, faces as complements, already validated.

**Unrouted because:** Built as an external handoff folder for Ari Tal; nothing in the game tree reads it.

**Shortest routing:** Load a tetrahedra/*.json as the data behind the entry tetrahedron face of the unfolded net; run validate.py in the build check.

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
