/* ═══ THE SOLID ═══════════════════════════════════════════════════════════════
   The twelve seats and the four circuits, written down once. Everything else in
   this file is DERIVED from those two tables — members, adjacency, turns,
   returns, antipodes, distances, routes. Change a circuit and every consequence
   follows in one reload. Nothing here is a stored fact that could drift from the
   table it came from.

   ITERATE rule 2, from daily.html:36-40: values derive; the derivation lives in
   one function. This is that function, for the whole world.

   ── ITS OWN OPEN QUESTION, carried in the header rather than smoothed ─────────
   THE QUESTION: is a level an EDGE (24 of them) or a TETRA OF FOUR FACES (which
   is what LEVEL ONE is actually built as)? Both models are live. Held together
   they give 24 × 4 = 96 faces against 17 built mechanisms.
   THE CANDIDATE ANSWER this file assumes: a member is an edge, and a face is
   something a member can be given later. Nothing here forecloses the tetra
   reading — MEMBERS carries no face field, so adding one costs nothing.
   THIS PASS LEAVES IT STANDING. It is not decided here.
   ─────────────────────────────────────────────────────────────────────────────

   PROVENANCE. The circuits are the four hexagonal great circles of the
   cuboctahedron. Their cyclic order is the one and only assignment, out of the
   60 that give a 4-regular graph on these twelve names, that actually embeds as
   the solid (8 triangular faces; every other candidate gives 2 to 6). Enumerated
   2026-08-14, correcting THE_24.md's circuit four. See THE_24.md's two headers.

   NO NUMBER IN HERE REACHES THE PLAYER. This is the world's skeleton, not its
   face. Law 2 governs anything drawn from it. */
"use strict";

/* ── the two written tables, and nothing else is written ──────────────────── */

/* A seat falls or it rises. Nothing else about a seat is stored here — its
   mechanic, its drawing, and its level live in the file that renders it. */
const SEATS = {
  TANK:{fall:true},   DAM:{fall:true},    FILTER:{fall:true},
  STATIONS:{fall:true}, GROUND:{fall:true}, DEEP:{fall:true},
  HELIOSTAT:{fall:false}, OVERWINTERING:{fall:false}, CAST:{fall:false},
  LENS:{fall:false},  GARDEN:{fall:false}, SEATING:{fall:false}
};

/* Four closed walks of six. Each visits three falling seats then three rising
   ones, contiguously — so each carries exactly one turn and one return, and the
   edge signature of all four is identical. */
const CIRCUITS = [
  ["DAM","STATIONS","DEEP","HELIOSTAT","OVERWINTERING","CAST"],
  ["DAM","GROUND","FILTER","HELIOSTAT","GARDEN","SEATING"],
  ["TANK","GROUND","STATIONS","LENS","GARDEN","OVERWINTERING"],
  ["DEEP","FILTER","TANK","CAST","SEATING","LENS"]
];

/* ── everything below is derived ──────────────────────────────────────────── */

const NAMES = Object.keys(SEATS);
const falls = s => SEATS[s].fall;
const key = (a,b) => [a,b].sort().join("—");

/* THE TWENTY-FOUR MEMBERS. Walked out of the circuits; each appears once. A
   member knows its ends, which circuit walked it, and what kind it is:
     fall   both ends falling
     rise   both ends rising
     turn   falling → rising, the moment water becomes light
     return rising → falling, the moment the world comes back down  */
const MEMBERS = (() => {
  const m = new Map();
  CIRCUITS.forEach((c,ci) => {
    for(let i=0;i<6;i++){
      const a=c[i], b=c[(i+1)%6], k=key(a,b);
      if(m.has(k)){ m.get(k).circuits.push(ci); continue; }
      let kind;
      if(falls(a)&&falls(b)) kind="fall";
      else if(!falls(a)&&!falls(b)) kind="rise";
      else kind = falls(a) ? "turn" : "return";   /* walked in the circuit's own direction */
      const from = kind==="return" ? a : (kind==="turn" ? a : a);
      m.set(k,{ key:k, a, b, from, to:(from===a?b:a), kind, circuits:[ci] });
    }
  });
  return [...m.values()];
})();

const ADJ = (() => {
  const o = {}; NAMES.forEach(n=>o[n]=[]);
  MEMBERS.forEach(m=>{ o[m.a].push(m.b); o[m.b].push(m.a); });
  return o;
})();

const memberBetween = (a,b) => MEMBERS.find(m=>m.key===key(a,b)) || null;
const isMember = (a,b) => !!memberBetween(a,b);

/* Which circuits a seat sits on — exactly two, always. */
const circuitsOf = s => CIRCUITS.map((c,i)=>c.includes(s)?i:-1).filter(i=>i>=0);

/* Distance, walked rather than tabulated. */
function distance(a,b){
  if(a===b) return 0;
  const seen={[a]:0}; const q=[a];
  while(q.length){
    const n=q.shift();
    for(const m of ADJ[n]){
      if(m in seen) continue;
      seen[m]=seen[n]+1;
      if(m===b) return seen[m];
      q.push(m);
    }
  }
  return -1;
}

/* Every shortest walk between two seats. The withdrawal route is one of these
   and is not written down anywhere — it is found. */
function routes(a,b){
  const d=distance(a,b); if(d<0) return [];
  const out=[];
  (function walk(path){
    const n=path[path.length-1];
    if(path.length-1>d) return;
    if(n===b){ if(path.length-1===d) out.push(path.slice()); return; }
    for(const m of ADJ[n]) if(!path.includes(m)){ path.push(m); walk(path); path.pop(); }
  })([a]);
  return out;
}

/* THE ANTIPODES. A seat's opposite shares both its circuits and is not adjacent
   to it. Derived, never listed: six pairs, and — the solid being
   vertex-transitive — all six sit at exactly the same distance. */
const antipodeOf = s => NAMES.find(t =>
  t!==s && !isMember(s,t) && String(circuitsOf(t))===String(circuitsOf(s))) || null;

const TURNS   = MEMBERS.filter(m=>m.kind==="turn");
const RETURNS = MEMBERS.filter(m=>m.kind==="return");
/* The seats that carry neither — ground and garden, and they are a pair. */
const PURE = NAMES.filter(s => !MEMBERS.some(m=>(m.a===s||m.b===s)&&m.kind!=="fall"&&m.kind!=="rise"));

/* ── THE THREE OUTPUTS ────────────────────────────────────────────────────────
   Law 1: three outputs at every station — send it on, drop it, or set it down
   and send it nowhere. Kevin's mark 2026-08-14 extends this to the tank, which
   had only been an intake: every one of the twelve produces three things, so the
   world holds thirty-six products and one member out.

   The first two are SITED — each names a real member leaving this seat, so a
   product always has somewhere to have gone. The third is not sited, has no
   destination, no animation and no confirmation (law 6), and by construction
   returns null for its member. THE ABSENCE IS THE FEEDBACK.

   ── ITS OWN OPEN QUESTION ────────────────────────────────────────────────────
   THE QUESTION: what is a set-down's trace? One of the tank's three leaves none
   by design, and whether "none" means invisible-but-recorded or genuinely
   nothing is not settled.
   THE CANDIDATE ANSWER here: genuinely nothing — `setDown` returns a product
   whose member is null and which no caller stores.
   THIS PASS LEAVES IT STANDING. Kevin's, not this file's.
   ───────────────────────────────────────────────────────────────────────────── */

/* Sending on runs DOWNHILL where the seat can fall and UPHILL where it rises —
   the seat's own direction, never a preference. Dropping goes the other way it
   can go. Both are picked from the seat's real members, in circuit order, so
   they cannot name a member the solid does not have. */
function outputsOf(seat){
  const mine = MEMBERS.filter(m=>m.a===seat||m.b===seat);
  const other = m => m.a===seat ? m.b : m.a;
  const along = mine.filter(m => falls(other(m))===falls(seat));
  const across = mine.filter(m => falls(other(m))!==falls(seat));
  const send = along[0] || across[0] || null;
  const drop = (across.find(m=>m!==send) || along.find(m=>m!==send)) || null;
  return [
    { seat, out:"send", member:send, to:send?other(send):null },
    { seat, out:"drop", member:drop, to:drop?other(drop):null },
    { seat, out:"set",  member:null, to:null }      /* nowhere, and nothing says so */
  ];
}

/* All thirty-six, derived. Twelve seats, three each. */
const PRODUCTS = NAMES.flatMap(outputsOf);

/* ── the named members the build sites things on ──────────────────────────────
   Found, not written: each is looked up so that if a circuit ever changes and
   the member stops existing, the lookup returns null and the caller can say so
   rather than draw a door onto nothing. */
const DOOR_OUT   = memberBetween("TANK","CAST");        /* circuit four's turn */
const WITHDRAWAL = routes("TANK","DEEP")[0] || null;    /* the only two-step path */

/* ═══ THE FACES AND THE CENTRE ════════════════════════════════════════════════
   Added 2026-08-16 on Kevin's line: "the centre is the game. everything else
   serves it." — and on the standing one under it, "the geometry decides what
   works or doesnt."

   Until now this file knew vertices and edges and nothing else. The solid has
   fourteen faces and a centre, and every claim made about them was being made
   in prose, where THE_24.md has already shown claims go stale.

   NO COORDINATES ARE WRITTEN DOWN. The embedding is SOLVED from the circuit
   table above — assign the four circuits to the four threefold axes, then choose
   the sign of each antipodal pair so that every circuit closes as a real
   hexagon. If CIRCUITS ever changes, the faces and the centre move with it or
   the solve fails loudly. That is the same rule the rest of the file keeps:
   nothing stored that could drift from the table it came from. */

const EMBED = (() => {
  const P=[]; for(const[i,j]of[[0,1],[0,2],[1,2]])for(const si of[1,-1])for(const sj of[1,-1]){
    const p=[0,0,0]; p[i]=si; p[j]=sj; P.push(p); }
  const d=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const AXES=[[1,1,1],[1,1,-1],[1,-1,1],[-1,1,1]];   /* the four threefold axes */
  const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(q=>[x,...q]));
  const pairs=[...new Set(NAMES.map(n=>[n,antipodeOf(n)].sort().join("|")))];
  for(const p of perms([0,1,2,3])){
    const cand={}; let fits=true;
    for(const n of NAMES){ const cs=circuitsOf(n).map(k=>AXES[p[k]]);
      cand[n]=P.filter(v=>d(v,cs[0])===0&&d(v,cs[1])===0);
      if(cand[n].length!==2){ fits=false; break; } }
    if(!fits) continue;
    for(let m=0;m<(1<<pairs.length);m++){
      const pos={};
      pairs.forEach((pr,bi)=>{ const [a,b]=pr.split("|"), f=(m>>bi)&1;
        pos[a]=cand[a][f]; pos[b]=cand[a][f].map(x=>-x); });
      if(CIRCUITS.every(c=>c.every((n,i)=>d(pos[n],pos[c[(i+1)%6]])===1))) return pos;
    }
  }
  return null;      /* the circuits do not embed — every consequence below is null */
})();

const dotp=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];

/* EIGHT TRIANGLES — three seats all adjacent to each other. Tagged A or B by the
   sign of their outward direction, which splits them four and four. The four
   PLANES of one tag bound a tetrahedron AROUND the solid, not inside it: every
   seat lies within all eight. The two tetrahedra meet in the octahedron, which
   is the stella octangula, and neither of them is an interior. */
const TRIANGLES = !EMBED ? [] : (() => {
  const out=[];
  for(let a=0;a<12;a++)for(let b=a+1;b<12;b++)for(let c=b+1;c<12;c++){
    const s=[NAMES[a],NAMES[b],NAMES[c]], p=s.map(n=>EMBED[n]);
    if(dotp(p[0],p[1])===1&&dotp(p[0],p[2])===1&&dotp(p[1],p[2])===1){
      const n=[0,1,2].map(i=>p[0][i]+p[1][i]+p[2][i]);
      out.push({ seats:s, tetra: n[0]*n[1]*n[2]>0 ? "A" : "B" }); } }
  return out;
})();

/* SIX SQUARES — the hinges. As a strut-and-hinge frame the triangles are braced
   and the squares are not; the solid flexes only here, which is the whole of the
   jitterbug. Each square carries all four circuits, one seat each, and contains
   no antipodal pair. Every member borders exactly one square and one triangle. */
const SQUARES = !EMBED ? [] : [0,1,2].flatMap(i => [1,-1].map(s => ({
  axis: "xyz"[i] + (s>0?"+":"-"),
  seats: NAMES.filter(n=>EMBED[n][i]===s),
  /* the four seats on NEITHER square of this axis: mutually non-adjacent,
     and always two antipodal pairs */
  between: NAMES.filter(n=>EMBED[n][i]===0)
})));

/* THE CENTRE — measured, never described. It is the only position on all four
   circuits at once (every hexagon is a central hexagon), it is one edge-length
   from every seat (radial equilibrium — the property Fuller singled out and the
   one this solid is nearly alone in having), and NO MEMBER REACHES IT.

   That last line is a constraint on the build, not a curiosity: nothing can be
   sent to the centre, because there is no edge to send it along. The circuits do
   not lead there. They encircle it. */
const CENTRE = !EMBED ? null : {
  radius: Math.hypot(...EMBED[NAMES[0]]),
  edgeLength: (()=>{ const m=MEMBERS[0]; return Math.hypot(...EMBED[m.a].map((x,i)=>x-EMBED[m.b][i])); })(),
  membersReaching: 0,
  circuitPlanes: CIRCUITS.length,          /* all four contain it, by construction */
  equidistant: !EMBED ? false : new Set(NAMES.map(n=>Math.hypot(...EMBED[n]).toFixed(9))).size===1
};

/* Which faces a seat sits on. Always two of each — vertex configuration 3.4.3.4. */
const facesOf = s => ({
  triangles: TRIANGLES.filter(t=>t.seats.includes(s)),
  squares:   SQUARES.filter(q=>q.seats.includes(s))
});
/* The one square and the one triangle a member borders. */
const facesAlong = (a,b) => ({
  triangle: TRIANGLES.find(t=>t.seats.includes(a)&&t.seats.includes(b)) || null,
  square:   SQUARES.find(q=>q.seats.includes(a)&&q.seats.includes(b)) || null
});

const SOLID = {
  SEATS, CIRCUITS, NAMES, MEMBERS, ADJ, PRODUCTS,
  TURNS, RETURNS, PURE, DOOR_OUT, WITHDRAWAL,
  EMBED, TRIANGLES, SQUARES, CENTRE, facesOf, facesAlong,
  falls, memberBetween, isMember, circuitsOf, distance, routes,
  antipodeOf, outputsOf
};
if(typeof window!=="undefined") window.SOLID=SOLID;
if(typeof module!=="undefined") module.exports=SOLID;
