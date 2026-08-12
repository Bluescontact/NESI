"""Which unfolding? Enumerate the cuboctahedron's nets for real."""
import itertools, math
from fractions import Fraction

# ---- 1. the solid -------------------------------------------------------
V = [p for p in itertools.product((1,-1,0), repeat=3)
     if sorted(map(abs,p)) == [0,1,1]]
V = sorted(V)
assert len(V) == 12
idx = {v:i for i,v in enumerate(V)}

SQ = []   # 6 squares, one per coordinate half-space value +-1
for ax in range(3):
    for s in (1,-1):
        pts = [v for v in V if v[ax] == s]
        a,b = (ax+1)%3, (ax+2)%3
        pts.sort(key=lambda p: math.atan2(p[b], p[a]))
        SQ.append(tuple(idx[p] for p in pts))
TRI = []  # 8 triangles, one per octant
for sx,sy,sz in itertools.product((1,-1), repeat=3):
    TRI.append((idx[(sx,sy,0)], idx[(sx,0,sz)], idx[(0,sy,sz)]))
    TRI[-1] = tuple(TRI[-1])
FACES = [('t',f) for f in TRI] + [('s',f) for f in SQ]
assert len(FACES) == 14

def edges_of(f):
    return {frozenset((f[i], f[(i+1)%len(f)])) for i in range(len(f))}

# dual graph
ADJ = {i:{} for i in range(14)}
DUAL = []
for i in range(14):
    for j in range(i+1,14):
        sh = edges_of(FACES[i][1]) & edges_of(FACES[j][1])
        if sh:
            e = next(iter(sh)); ADJ[i][j] = e; ADJ[j][i] = e
            DUAL.append((i,j))
print(f"faces=14  dual edges={len(DUAL)}  "
      f"degrees={sorted(len(ADJ[i]) for i in range(14))}")
print("bipartite tri<->sq:",
      all(FACES[i][0] != FACES[j][0] for i,j in DUAL))

# ---- 2. how many spanning trees (Kirchhoff, exact) ----------------------
def det_frac(M):
    M = [row[:] for row in M]; n = len(M); det = Fraction(1)
    for c in range(n):
        p = next((r for r in range(c,n) if M[r][c] != 0), None)
        if p is None: return Fraction(0)
        if p != c: M[c],M[p] = M[p],M[c]; det = -det
        det *= M[c][c]
        inv = Fraction(1,1)/M[c][c]
        for r in range(c+1,n):
            if M[r][c]:
                f = M[r][c]*inv
                for k in range(c,n): M[r][k] -= f*M[c][k]
    return det

L = [[Fraction(0)]*14 for _ in range(14)]
for i,j in DUAL:
    L[i][i]+=1; L[j][j]+=1; L[i][j]-=1; L[j][i]-=1
minor = [[L[r][c] for c in range(1,14)] for r in range(1,14)]
NTREES = int(det_frac(minor))
print(f"spanning trees of the dual = {NTREES}")

# ---- 3. unfolding: lay a spanning tree flat, test for overlap -----------
import numpy as np
P3 = {i:np.array(v,dtype=float) for i,v in enumerate(V)}

def local2d(face):
    """isometric 2D coords of a face's vertices, in its own plane"""
    pts = [P3[v] for v in face]
    o = pts[0]; e1 = pts[1]-o; e1 /= np.linalg.norm(e1)
    n = np.cross(pts[1]-o, pts[2]-o); n /= np.linalg.norm(n)
    e2 = np.cross(n, e1)
    return [np.array([np.dot(p-o,e1), np.dot(p-o,e2)]) for p in pts]

def place(face, known):
    """place face in 2D given >=2 already-known vertex ids -> {vid: xy}"""
    loc = dict(zip(face, local2d(face)))
    a,b = [v for v in face if v in known][:2]
    pa,pb = loc[a], loc[b]; qa,qb = known[a], known[b]
    d1, d2 = pb-pa, qb-qa
    th = math.atan2(d2[1],d2[0]) - math.atan2(d1[1],d1[0])
    R = np.array([[math.cos(th),-math.sin(th)],[math.sin(th),math.cos(th)]])
    out = {v: qa + R@(loc[v]-pa) for v in face}
    return out, loc, a, b, qa, qb

def unfold(tree_adj, root=0):
    """returns {face: [xy,...]} or None if a face can't be placed"""
    known = {}
    poly = {}
    l0 = local2d(FACES[root][1])
    for v,p in zip(FACES[root][1], l0): known[v] = p
    poly[root] = [known[v] for v in FACES[root][1]]
    order = [root]; seen = {root}
    while order:
        f = order.pop(0)
        for g in tree_adj[f]:
            if g in seen: continue
            seen.add(g); order.append(g)
            face = FACES[g][1]
            e = ADJ[f][g]; a,b = tuple(e)
            loc = dict(zip(face, local2d(face)))
            pa,pb,qa,qb = loc[a],loc[b],known[a],known[b]
            best = None
            for refl in (1,-1):
                lp = {v: np.array([loc[v][0], refl*loc[v][1]]) for v in face}
                d1,d2 = lp[b]-lp[a], qb-qa
                th = math.atan2(d2[1],d2[0])-math.atan2(d1[1],d1[0])
                R = np.array([[math.cos(th),-math.sin(th)],
                              [math.sin(th),math.cos(th)]])
                cand = {v: qa + R@(lp[v]-lp[a]) for v in face}
                cf = np.mean([known[v] for v in FACES[f][1]], axis=0)
                cg = np.mean(list(cand.values()), axis=0)
                ab = qb-qa; nrm = np.array([-ab[1],ab[0]])
                if np.dot(cf-qa,nrm)*np.dot(cg-qa,nrm) < 0:
                    best = cand; break
            if best is None: return None
            for v,p in best.items(): known[v] = p
            poly[g] = [best[v] for v in face]
    return poly if len(poly)==14 else None

def poly_overlap(A, B, eps=1e-6):
    """SAT-based: do two convex polygons overlap with positive area?"""
    for P,Q in ((A,B),(B,A)):
        for i in range(len(P)):
            e = P[(i+1)%len(P)] - P[i]
            n = np.array([-e[1], e[0]]); n /= np.linalg.norm(n)
            pa = [np.dot(n,p) for p in P]; qa = [np.dot(n,q) for q in Q]
            if min(pa) >= max(qa)-eps or min(qa) >= max(pa)-eps:
                return False
    return True

def valid(tree_edges):
    ta = {i:[] for i in range(14)}
    for i,j in tree_edges: ta[i].append(j); ta[j].append(i)
    poly = unfold(ta)
    if poly is None: return None
    for i in range(14):
        for j in range(i+1,14):
            if j in ta[i]: continue
            if poly_overlap(np.array(poly[i]), np.array(poly[j])):
                return None
    return poly
print("[unfolder built]")
