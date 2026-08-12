"""Stage 2 -- the graph (v1 Sec 2 Axis B, Sec 3, guardrails Sec F).

Pure Python query layer over the mock feed's links. This module only reads
what the feed already declared -- it creates no edges of its own. Ratifying
a proposed link into a taut tie is Kevin's mark (guardrail #16, #32); there
is deliberately no function here that flips a link's state.

Link states: proposed | pending-ratification | ratified (regions.py).
coherent-tension is a link *type*, carried at whatever state its fixture
declares -- v0's fixture ships it pre-ratified, matching the master's
framing of it as "a strut the surface must never collapse," not something
this dry-run invents a ratification ceremony for.
"""

from __future__ import annotations

from dataclasses import dataclass

STRUT_TYPE = "coherent-tension"
PROPOSED_ONLY_TYPES = {"this-touches"}  # guardrail #68 -- filament ceiling, not built (Sec 11), listed for completeness


@dataclass(frozen=True)
class Edge:
    a: str
    b: str
    type: str
    state: str  # proposed | pending-ratification | ratified


def edges_from_objects(objects) -> list[Edge]:
    """Canonical, deduplicated edge list from the feed's per-object link
    lists. Each fixture link is one-sided (object -> target); a
    coherent-tension pair that both sides declare collapses to one Edge,
    not two, so rendering never draws the same tether twice."""
    seen = set()
    edges: list[Edge] = []
    for obj in objects:
        for link in obj.links:
            key = tuple(sorted((obj.id, link.target))) + (link.type,)
            if key in seen:
                continue
            seen.add(key)
            edges.append(Edge(a=obj.id, b=link.target, type=link.type, state=link.state))
    return edges


def is_strut(edge: Edge) -> bool:
    return edge.type == STRUT_TYPE


def edges_touching(edges: list[Edge], object_id: str) -> list[Edge]:
    """Ratified/pending relations touching one object -- the set that may
    rise on deliberate attention (v1 Sec 7). Proposed edges are included;
    the caller decides how to render their non-attachment."""
    return [e for e in edges if e.a == object_id or e.b == object_id]


def other_end(edge: Edge, object_id: str) -> str:
    return edge.b if edge.a == object_id else edge.a
