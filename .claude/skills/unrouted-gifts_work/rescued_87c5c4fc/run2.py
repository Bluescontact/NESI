import time, networkx as nx
from nets import *

G = nx.Graph(); G.add_edges_from(DUAL)
t0 = time.time(); good = 0; n = 0
cup = 0
# the four cupola splits, for counting how many valid nets are in that family
import numpy as np, math
def cen(i):
    return np.mean([np.array(V[v], float) for v in FACES[i][1]], axis=0)
AXES = [np.array(a, float)/math.sqrt(3)
        for a in [(1,1,1),(1,1,-1),(1,-1,1),(-1,1,1)]]
def seam_count(T):
    """how many of the 4 axes does this tree cut with exactly 1 crossing edge"""
    out = 0
    for a in AXES:
        c = sum(1 for i,j in T if np.dot(cen(i),a)*np.dot(cen(j),a) < 0)
        if c == 1: out += 1
    return out

for T in nx.SpanningTreeIterator(G):
    n += 1
    E = tuple(tuple(sorted(e)) for e in T.edges())
    if valid(E) is not None:
        good += 1
        if seam_count(E): cup += 1
    if n % 40000 == 0:
        print(f"  {n}/331776  flat={good}  cupola-family={cup}  "
              f"{time.time()-t0:.0f}s", flush=True)

print(f"\nTOTAL spanning trees      = {n}")
print(f"UNFOLD FLAT (no overlap)  = {good}  ({100*good/n:.1f}%)")
print(f"  of those, cupola-family = {cup}  "
      f"(tree crosses exactly one body-diagonal equator once)")
print(f"elapsed {time.time()-t0:.0f}s")
