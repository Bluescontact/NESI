"""Persist the marked two-cupola net as data the 2D game can read.

Routing of gift cards 11+12 (Kevin's mark 2026-08-11: "route the board first").
Runs the cupola-split search from cupola.py (session 87c5c4fc) and writes
world2d/data/net.json: the 14 face polygons in exact 2D coordinates, the
spanning tree, the seam join edge, and which cupola each face belongs to.

Deterministic: same iteration order as the original session, so the tree and
join reproduce the marked net. No numbers here ever reach the player; this is
a store, read at load.
"""
import json, math, sys, os
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from nets import V, FACES, DUAL, ADJ, NTREES, valid

import networkx as nx

a = np.array((1, 1, 1), dtype=float) / math.sqrt(3)
side = {}
for i, (k, f) in enumerate(FACES):
    c = np.mean([np.array(V[v], dtype=float) for v in f], axis=0)
    side[i] = 1 if np.dot(c, a) > 0 else -1

inA = [(i, j) for i, j in DUAL if side[i] > 0 and side[j] > 0]
inB = [(i, j) for i, j in DUAL if side[i] < 0 and side[j] < 0]
cross = [(i, j) for i, j in DUAL if side[i] * side[j] < 0]

best = None
for join in cross:
    for ta in nx.SpanningTreeIterator(nx.Graph(inA)):
        for tb in nx.SpanningTreeIterator(nx.Graph(inB)):
            T = tuple([tuple(sorted(e)) for e in ta.edges()]
                      + [tuple(sorted(e)) for e in tb.edges()]
                      + [tuple(sorted(join))])
            if len(T) != 13:
                continue
            poly = valid(T)
            if poly is not None:
                best = (T, join, poly)
                break
        if best:
            break
    if best:
        break

if not best:
    print("BLOCKED: no cupola-split net unfolds flat — should not happen")
    sys.exit(1)

T, join, poly = best
seam_vertices = [v for v in V if abs(np.dot(np.array(v, dtype=float), a)) < 1e-9]

out = {
    "source": "session 87c5c4fc nets.py/cupola.py, sited nesi/net 2026-08-11 on Kevin's mark",
    "solid": "cuboctahedron",
    "split": "two-cupola, axis (1,1,1) — the four axes stay interchangeable; this file fixes nothing, it records one run",
    "spanning_trees_of_dual": NTREES,
    "faces": [
        {
            "id": i,
            "kind": FACES[i][0],
            "cupola": "A" if side[i] > 0 else "B",
            "vertices_3d": [list(V[v]) for v in FACES[i][1]],
            "polygon_2d": [[round(float(x), 9) for x in p] for p in poly[i]],
        }
        for i in range(14)
    ],
    "tree_edges": [list(e) for e in T],
    "seam_join_edge": list(join),
    "seam_vertices_3d": [list(v) for v in seam_vertices],
}

dst = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "world2d", "data", "net.json")
dst = os.path.abspath(dst)
os.makedirs(os.path.dirname(dst), exist_ok=True)
with open(dst, "w", encoding="utf-8") as fh:
    json.dump(out, fh, indent=1)

print(f"net.json written: {dst}")
print(f"  14 faces, tree={len(T)} edges, join={join} "
      f"({FACES[join[0]][0]}{join[0]}/{FACES[join[1]][0]}{join[1]})")
