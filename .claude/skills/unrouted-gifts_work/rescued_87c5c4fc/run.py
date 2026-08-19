import time, itertools, math, random, json
import numpy as np
from nets import *   # geometry, dual graph, unfold, valid, FACES, ADJ, DUAL, V, idx

# ---------- enumerate every spanning tree of the dual (331,776) ----------
def spanning_trees(n, edges):
    """classic recursive contract/delete enumeration, yields edge tuples"""
    # simple DFS over edge subsets with union-find pruning is too slow;
    # use the standard 'grow from a vertex' backtracking (Gabow-Myers lite)
    adj = {i:set() for i in range(n)}
    for i,j in edges: adj[i].add(j); adj[j].add(i)
    tree = []
    res = []
    def rec(inset, frontier):
        if len(tree) == n-1:
            res.append(tuple(tree)); return
        if not frontier: return
        # pick the smallest-index tree vertex's next candidate edge set
        fr = list(frontier)
        e = fr[0]
        u,v = e
        # branch: include e
        frontier2 = frontier - {e}
        tree.append(e); inset.add(v)
        newf = frontier2 | {(v,w) for w in adj[v] if w not in inset}
        newf = {x for x in newf if x[1] not in inset or x[1]==v}
        newf = {(a,b) for (a,b) in newf if b not in inset}
        rec(inset, newf)
        tree.pop(); inset.discard(v)
        # branch: exclude e  (only valid if v still reachable)
        rest = frontier - {e}
        reach = set(inset)
        stack = list(inset)
        avail = {(a,b) for (a,b) in rest}
        # v must still be reachable via some other frontier/outside edge
        rec2ok = True
        rec(inset, rest) if rest else None
    return res

# the above is fiddly; use networkx if present
try:
    import networkx as nx
    G = nx.Graph(); G.add_edges_from(DUAL)
    t0=time.time()
    trees = list(nx.SpanningTreeIterator(G))
    print(f"enumerated {len(trees)} trees in {time.time()-t0:.1f}s")
    TREES = [tuple(tuple(sorted(e)) for e in T.edges()) for T in trees]
except Exception as ex:
    print("networkx unavailable:", ex); TREES=None

if TREES:
    t0=time.time(); good=[]
    for k,T in enumerate(TREES):
        if valid(T) is not None: good.append(T)
        if k and k%20000==0:
            print(f"  {k}/{len(TREES)}  valid so far {len(good)}  "
                  f"{time.time()-t0:.0f}s", flush=True)
    print(f"NON-OVERLAPPING NETS = {len(good)} of {len(TREES)}  "
          f"({time.time()-t0:.0f}s)")
    json.dump([list(map(list,t)) for t in good], open("good.json","w"))
