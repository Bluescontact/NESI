"""The cupola split, the seam, and which symmetry a net can keep."""
import itertools, math, numpy as np
from nets import *

axes = [(1,1,1),(1,1,-1),(1,-1,1),(-1,1,1)]
print("=== 1. the two-cupola split, per body diagonal ===")
for ax in axes:
    a = np.array(ax, dtype=float)/math.sqrt(3)
    hi, lo, mid = [], [], []
    for i,(k,f) in enumerate(FACES):
        c = np.mean([np.array(V[v],dtype=float) for v in f], axis=0)
        d = float(np.dot(c, a))
        (hi if d > 1e-9 else lo if d < -1e-9 else mid).append((i,k))
    print(f" axis {ax}: above={len(hi)} below={len(lo)} on-equator={len(mid)}"
          f"  above kinds={sorted(k for _,k in hi)}")
    # the seam: edges whose two endpoints straddle / lie on the equator
    seam = set()
    for i,j in DUAL:
        ci = np.mean([np.array(V[v],dtype=float) for v in FACES[i][1]],axis=0)
        cj = np.mean([np.array(V[v],dtype=float) for v in FACES[j][1]],axis=0)
        if np.dot(ci,a) * np.dot(cj,a) < -1e-12: seam.add((i,j))
    print(f"          seam edges (cut to separate the halves) = {len(seam)}")

print("\n=== 2. the seam vertices = a hexagonal great circle? ===")
a = np.array((1,1,1),dtype=float)/math.sqrt(3)
eq = [v for v in V if abs(np.dot(np.array(v,dtype=float), a)) < 1e-9]
print(f" vertices with zero dot to (1,1,1): {len(eq)} -> {eq}")

print("\n=== 3. rotation symmetries of the solid that a net could keep ===")
def rots():
    out=[]
    for M in itertools.product([-1,0,1],repeat=9):
        R=np.array(M,dtype=float).reshape(3,3)
        if abs(np.linalg.det(R)-1)<1e-9 and np.allclose(R@R.T,np.eye(3)):
            out.append(R)
    return out
R24=rots(); print(f" proper rotations of the cube/cuboctahedron: {len(R24)}")
def face_perm(R):
    cen={}
    for i,(k,f) in enumerate(FACES):
        cen[i]=np.round(np.mean([np.array(V[v],dtype=float) for v in f],axis=0),6)
    p={}
    for i in range(14):
        img=np.round(R@cen[i],6)
        for j in range(14):
            if np.allclose(img,cen[j],atol=1e-6): p[i]=j; break
    return p if len(p)==14 else None
C3=[R for R in R24
    if face_perm(R) and not np.allclose(R,np.eye(3))
    and np.allclose(R@np.array([1,1,1.]), np.array([1,1,1.]), atol=1e-9)]
print(f" rotations fixing the (1,1,1) axis (the C3 about the seam): {len(C3)}")

print("\n=== 4. build the two-cupola net and test it ===")
# cupola A = the 7 faces above the (1,1,1) equator, cupola B = the 7 below
a = np.array((1,1,1),dtype=float)/math.sqrt(3)
side={}
for i,(k,f) in enumerate(FACES):
    c=np.mean([np.array(V[v],dtype=float) for v in f],axis=0)
    side[i] = 1 if np.dot(c,a)>0 else -1
A=[i for i in range(14) if side[i]>0]; B=[i for i in range(14) if side[i]<0]
print(f" cupola A faces {len(A)} (kinds {sorted(FACES[i][0] for i in A)})")
print(f" cupola B faces {len(B)} (kinds {sorted(FACES[i][0] for i in B)})")
inA=[(i,j) for i,j in DUAL if side[i]>0 and side[j]>0]
inB=[(i,j) for i,j in DUAL if side[i]<0 and side[j]<0]
cross=[(i,j) for i,j in DUAL if side[i]*side[j]<0]
print(f" edges: within A={len(inA)}  within B={len(inB)}  crossing(seam)={len(cross)}")

import networkx as nx
best=None
for join in cross:
    for ta in nx.SpanningTreeIterator(nx.Graph(inA)):
        for tb in nx.SpanningTreeIterator(nx.Graph(inB)):
            T=tuple([tuple(sorted(e)) for e in ta.edges()]
                   +[tuple(sorted(e)) for e in tb.edges()]+[tuple(sorted(join))])
            if len(T)!=13: continue
            if valid(T) is not None:
                best=(T,join); break
        if best: break
    if best: break
print(" a cupola-split net that unfolds without overlap:",
      "FOUND" if best else "none found")
if best:
    T,join=best
    print(f"  joined at seam edge {join} = faces "
          f"{FACES[join[0]][0]}{join[0]} / {FACES[join[1]][0]}{join[1]}")
