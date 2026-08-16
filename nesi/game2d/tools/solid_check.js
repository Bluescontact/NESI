/* solid_check — the solid must be the solid, and it must say so in one command.
   Nothing here is asserted from a table; every line is re-derived from SOLID and
   checked against a cuboctahedron built independently from coordinates. */
"use strict";
const S = require("../solid.js");
let bad = 0;
const ok = (t, c, extra) => { console.log((c?"  ok  ":"FAIL  ")+t+(extra?"   "+extra:"")); if(!c) bad++; };

/* ── an independent cuboctahedron, from (±1,±1,0) and its permutations ─────── */
const V=[]; for(const a of [1,-1]) for(const b of [1,-1]) V.push([a,b,0],[a,0,b],[0,a,b]);
const uniq=[...new Map(V.map(v=>[v.join(),v])).values()];
const d2=(p,q)=>p.reduce((s,x,i)=>s+(x-q[i])**2,0);
const E=[]; for(let i=0;i<12;i++) for(let j=i+1;j<12;j++) if(d2(uniq[i],uniq[j])===2) E.push([i,j]);
const cadj=uniq.map((_,i)=>new Set(E.filter(e=>e.includes(i)).map(e=>e[0]===i?e[1]:e[0])));
const AX=[[1,1,1],[1,1,-1],[1,-1,1],[-1,1,1]];
const HEX=AX.map(ax=>new Set(uniq.map((v,i)=>v.reduce((s,x,k)=>s+x*ax[k],0)===0?i:-1).filter(i=>i>=0)));
const sameSet=(a,b)=>a.size===b.size&&[...a].every(x=>b.has(x));

ok("the reference solid has 12 vertices and 24 edges", uniq.length===12 && E.length===24);

/* ── the written tables ───────────────────────────────────────────────────── */
ok("twelve seats", S.NAMES.length===12);
ok("six fall, six rise", S.NAMES.filter(S.falls).length===6);
ok("four circuits of six", S.CIRCUITS.length===4 && S.CIRCUITS.every(c=>c.length===6));
ok("every seat on exactly two circuits",
   S.NAMES.every(n=>S.circuitsOf(n).length===2));
ok("each circuit runs three falling then three rising, contiguous",
   S.CIRCUITS.every(c=>{ const f=c.map(S.falls);
     return f.filter(Boolean).length===3 &&
       [0,1,2,3,4,5].some(r=>[0,1,2].every(i=>f[(r+i)%6])&&[3,4,5].every(i=>!f[(r+i)%6])); }));

/* ── the derived members ──────────────────────────────────────────────────── */
ok("twenty-four members, each walked once", S.MEMBERS.length===24);
ok("every seat has degree four", S.NAMES.every(n=>S.ADJ[n].length===4));
ok("eight mixed members — four turns, four returns",
   S.TURNS.length===4 && S.RETURNS.length===4);
ok("sixteen unmixed", S.MEMBERS.filter(m=>m.kind==="fall"||m.kind==="rise").length===16);
ok("each circuit carries exactly one turn and one return",
   S.CIRCUITS.every((_,i)=> S.TURNS.filter(m=>m.circuits.includes(i)).length===1 &&
                            S.RETURNS.filter(m=>m.circuits.includes(i)).length===1));

/* ── the shape itself: does the written graph embed as the cuboctahedron? ──── */
const embed=()=>{
  const m={}, used=new Set(), o=S.NAMES;
  const bt=k=>{
    if(k===12) return S.CIRCUITS.every(c=>HEX.some(h=>sameSet(new Set(c.map(x=>m[x])),h)));
    for(let cand=0;cand<12;cand++){
      if(used.has(cand)) continue;
      if(o.slice(0,k).every(p=>S.isMember(o[k],p)===cadj[cand].has(m[p]))){
        m[o[k]]=cand; used.add(cand);
        if(bt(k+1)) return true;
        used.delete(cand); delete m[o[k]];
      }
    }
    return false;
  };
  return bt(0);
};
ok("the circuits embed as the four great circles of the cuboctahedron", embed());

/* ── the antipodes ────────────────────────────────────────────────────────── */
const pairs = S.NAMES.map(n=>[n,S.antipodeOf(n)]);
ok("every seat has exactly one antipode", pairs.every(p=>p[1]));
ok("six antipodal pairs", new Set(pairs.map(p=>p.slice().sort().join("—"))).size===6);
ok("all six at distance three — the world looks the same from every seat",
   pairs.every(p=>S.distance(p[0],p[1])===3));
ok("no antipodes adjacent", pairs.every(p=>!S.isMember(p[0],p[1])));

/* ── the readings the build stands on ─────────────────────────────────────── */
ok("two turns pass through the heliostat",
   S.TURNS.filter(m=>m.a==="HELIOSTAT"||m.b==="HELIOSTAT").length===2);
ok("two returns land on the dam",
   S.RETURNS.filter(m=>m.a==="DAM"||m.b==="DAM").length===2);
ok("and those two seats are each other's antipode",
   S.antipodeOf("DAM")==="HELIOSTAT");
ok("ground and garden carry neither a turn nor a return, and are a pair",
   S.PURE.length===2 && S.PURE.includes("GROUND") && S.PURE.includes("GARDEN") &&
   S.antipodeOf("GROUND")==="GARDEN");

/* ── the two sited members ────────────────────────────────────────────────── */
ok("the door out exists: TANK—CAST is a real member", !!S.DOOR_OUT);
ok("and it is circuit four's turn", S.DOOR_OUT && S.DOOR_OUT.kind==="turn");
/* THE SHORT CIRCUIT, checked as the claim actually reads: one member from intake
   to departure where the long way is eleven. Eleven is the longest walk from the
   tank to the cast that never repeats a seat — and it turns out to be every seat
   in the world, once. So the door out is one step, and the alternative is the
   whole solid. Walked here, not tabulated. */
ok("one member out, and the long way round is eleven — the whole world, once",
   S.distance("TANK","CAST")===1 && (()=>{
     let best=0;
     (function w(p){ const n=p[p.length-1];
       if(n==="CAST"&&p.length-1>best) best=p.length-1;
       for(const m of S.ADJ[n]) if(!p.includes(m)){ p.push(m); w(p); p.pop(); }
     })(["TANK"]);
     return best===11 && best+1===S.NAMES.length;
   })());
ok("the withdrawal route TANK→DEEP is two steps and unique",
   S.routes("TANK","DEEP").length===1 && S.WITHDRAWAL.length===3);
ok("and it runs by way of the filter", S.WITHDRAWAL && S.WITHDRAWAL[1]==="FILTER");

/* ── the three outputs ────────────────────────────────────────────────────── */
ok("thirty-six products — twelve stations, three each", S.PRODUCTS.length===36);
ok("every station has send, drop, and set",
   S.NAMES.every(n=>{ const p=S.outputsOf(n).map(x=>x.out).sort().join();
     return p==="drop,send,set"; }));
ok("the tank has three like every other station",
   S.outputsOf("TANK").length===3);
ok("send and drop each name a real member of their own seat",
   S.PRODUCTS.filter(p=>p.out!=="set").every(p=>p.member &&
     (p.member.a===p.seat||p.member.b===p.seat)));
ok("send and drop never name the same member",
   S.NAMES.every(n=>{ const [s,d]=S.outputsOf(n); return s.member!==d.member; }));
ok("the set-down has no destination and leaves no member — law 6",
   S.PRODUCTS.filter(p=>p.out==="set").every(p=>p.member===null&&p.to===null));

/* ── the faces and the centre ─────────────────────────────────────────────────
   Added 2026-08-16 with Kevin's ruling "the centre is the game." Every line here
   re-derives from SOLID's solved embedding and is checked against the reference
   solid built from coordinates at the top of this file. */
ok("the circuits solve to a real embedding", !!S.EMBED);
ok("fourteen faces — eight triangles, six squares",
   S.TRIANGLES.length===8 && S.SQUARES.length===6);
ok("Euler holds: 12 − 24 + 14 = 2", 12 - 24 + (S.TRIANGLES.length+S.SQUARES.length) === 2);
ok("vertex configuration 3.4.3.4 — two triangles and two squares at every seat",
   S.NAMES.every(n=>{ const f=S.facesOf(n); return f.triangles.length===2 && f.squares.length===2; }));
ok("every member borders exactly one triangle and exactly one square",
   S.MEMBERS.every(m=>{ const f=S.facesAlong(m.a,m.b); return !!f.triangle && !!f.square; }));
ok("no two triangles share a member — they meet only at seats",
   S.TRIANGLES.every((t,i)=>S.TRIANGLES.every((u,j)=>i===j||t.seats.filter(s=>u.seats.includes(s)).length<2)));

/* THE TWO TETRAHEDRA ARE OUTSIDE. Recorded as a check because this file's author
   had it inverted for two passes: no four seats form a regular tetrahedron, and
   the eight triangle planes bound the solid rather than sit within it. */
ok("the triangles split four and four",
   S.TRIANGLES.filter(t=>t.tetra==="A").length===4 && S.TRIANGLES.filter(t=>t.tetra==="B").length===4);
ok("every seat is on exactly one A triangle and one B — the two bodies touch at the twelve",
   S.NAMES.every(n=>S.TRIANGLES.filter(t=>t.tetra==="A"&&t.seats.includes(n)).length===1 &&
                    S.TRIANGLES.filter(t=>t.tetra==="B"&&t.seats.includes(n)).length===1));
ok("NO four seats form a regular tetrahedron — there is no inner tetra made of seats",
   (()=>{ let f=0; const N=S.NAMES;
     for(let a=0;a<12;a++)for(let b=a+1;b<12;b++)for(let c=b+1;c<12;c++)for(let e=c+1;e<12;e++){
       const q=[a,b,c,e].map(i=>S.EMBED[N[i]]), ds=[];
       for(let x=0;x<4;x++)for(let y=x+1;y<4;y++) ds.push(q[x].reduce((s,v,i)=>s+(v-q[y][i])**2,0));
       if(new Set(ds).size===1) f++; }
     return f===0; })());

ok("every square carries all four circuits, one seat each",
   S.SQUARES.every(q=>new Set(q.seats.flatMap(n=>S.circuitsOf(n))).size===4 && q.seats.length===4));
ok("no square holds an antipodal pair",
   S.SQUARES.every(q=>!q.seats.some(n=>q.seats.includes(S.antipodeOf(n)))));
ok("each axis cuts the twelve four · four · four",
   S.SQUARES.every(q=>q.between.length===4));
ok("the four between are mutually non-adjacent and are two antipodal pairs",
   S.SQUARES.every(q=>q.between.every(a=>q.between.every(b=>a===b||!S.isMember(a,b))) &&
     q.between.filter(n=>q.between.includes(S.antipodeOf(n))).length===4));
/* ONE AXIS CARRIES THE WORLD'S OWN LAW AND ONLY ONE. Derived, never assigned:
   one square is four falling seats and its opposite is four rising. */
ok("exactly two squares are pure — one all falling, one all rising",
   S.SQUARES.filter(q=>q.seats.every(S.falls)).length===1 &&
   S.SQUARES.filter(q=>!q.seats.some(S.falls)).length===1);
ok("and the four seats between them are TANK LENS DAM HELIOSTAT — the two pairs the corpus singled out",
   (()=>{ const pure=S.SQUARES.find(q=>q.seats.every(S.falls));
     return pure && ["DAM","HELIOSTAT","LENS","TANK"].every(n=>pure.between.includes(n)); })());

ok("the centre is one edge-length from every seat — radial equilibrium",
   S.CENTRE && S.CENTRE.equidistant &&
   Math.abs(S.CENTRE.radius - S.CENTRE.edgeLength) < 1e-9);
ok("the centre lies on all four circuit planes; no seat lies on more than two",
   S.CENTRE && S.CENTRE.circuitPlanes===4 && S.NAMES.every(n=>S.circuitsOf(n).length===2));
/* THE CONSTRAINT, not a curiosity: nothing can be sent to the centre. */
ok("NO member reaches the centre — nothing can be sent inward, only encircled",
   S.CENTRE && S.CENTRE.membersReaching===0);

/* ── the eight faces ──────────────────────────────────────────────────────────
   Kevin's instruction 2026-08-16: "site the eight mechanics on the eight
   triangles." FACES.json holds the assignment. THE ASSIGNMENT IS A READING AND
   IS NOT CHECKED HERE — 1872 matchings tied on the water evidence, so no test
   could confirm it. What IS checked is that the reading stays WELL-FORMED
   against the solid and against the running build: real mechanics, real
   triangles, one each, and still costless. If a cost line is ever added to one
   of the eight, it has become a seat and its siting is void. */
{
  const fs=require("fs"), path=require("path");
  let F=null, src="";
  try { F=JSON.parse(fs.readFileSync(path.join(__dirname,"..","FACES.json"),"utf8")); } catch(e){}
  try { src=fs.readFileSync(path.join(__dirname,"..","ascent.html"),"utf8"); } catch(e){}
  ok("FACES.json reads, and sites eight", !!F && F.sitings.length===8);
  if(F && src){
    const key=a=>a.slice().sort().join("|");
    const real=new Set(S.TRIANGLES.map(t=>key(t.seats)));
    const seatKeys=new Set(S.NAMES.map(n=>n.toLowerCase())); seatKeys.add("winter");
    ok("every sited triangle is a real triangle of this solid",
       F.sitings.every(s=>real.has(key(s.triangle))));
    ok("eight distinct triangles — one tenant each, none doubled",
       new Set(F.sitings.map(s=>key(s.triangle))).size===8);
    ok("eight distinct mechanics", new Set(F.sitings.map(s=>s.mechanic)).size===8);
    ok("every sited mechanic is a real stage body in ascent.html",
       F.sitings.every(s=>new RegExp("^"+s.mechanic+":\\{ g:\"").test(src) ||
                          src.includes("\n"+s.mechanic+":{ g:\"")));
    /* THE CRITERION, and it is the only part of this that was derived */
    ok("not one of the eight declares a cost — a seat is where the hand gives something up",
       F.sitings.every(s=>!new RegExp("\\n"+s.mechanic+":\\{ g:\"\\w+\", cost:").test(src)));
    ok("and none of them is a seat of the solid",
       F.sitings.every(s=>!seatKeys.has(s.mechanic)));
    ok("four on each tetrahedron",
       F.sitings.filter(s=>s.tetra==="A").length===4 && F.sitings.filter(s=>s.tetra==="B").length===4);
    ok("each row's tetra tag matches the solid's own",
       F.sitings.every(s=>{ const t=S.TRIANGLES.find(t=>key(t.seats)===key(s.triangle));
         return t && t.tetra===s.tetra; }));
    /* the one hard constraint the water evidence did give */
    ok("the silent triangle holds a mechanic that writes a single field",
       (()=>{ const silent=S.TRIANGLES.find(t=>t.seats.every(n=>
              !/w\.(level|load|clarity|cut|held|released|still)\s*=/.test(
                (src.split("\n"+(n==="OVERWINTERING"?"winter":n.toLowerCase())+":{ g:\"")[1]||"").split("\n},")[0])));
          if(!silent) return false;
          const s=F.sitings.find(x=>key(x.triangle)===key(silent.seats));
          return s && s.writes.length===1; })());
    ok("every triangle of the solid now has a tenant", real.size===8 &&
       F.sitings.length===8 && new Set(F.sitings.map(s=>key(s.triangle))).size===real.size);
    console.log("        (the ASSIGNMENT is a session's reading — 1872 matchings tied; only its form is checked)");
  }
}

/* ── the container's motion, and the frame it is measured in ──────────────────
   Kevin's instruction 2026-08-16: "arrange them into the scaffold for the
   centre." Wikipedia gives no number for the degrees of freedom; this is
   computed from the rigidity matrix and checked here so it cannot drift into
   prose and rot. */
ok("twenty-four bars, and not one redundant — every member is load-bearing",
   S.RIGIDITY && S.RIGIDITY.bars===24 && S.RIGIDITY.redundant===0);
ok("six internal mechanisms — the container is NOT rigid as a bar frame",
   S.RIGIDITY && S.RIGIDITY.mechanisms===6);
ok("and there are exactly as many mechanisms as squares",
   S.RIGIDITY && S.RIGIDITY.mechanisms===S.SQUARES.length);

/* THE FRAME. Three properties, each borrowed from a different instrument and
   each testable: unaddressable (the half-edge mesh's silence about interiors),
   the gauge (rigidity analysis holds the centroid fixed to expose real motion),
   and the fixed point (the jitterbug breathes and this does not move). */
ok("the centre is at the origin at rest, derived and not stored",
   S.CENTRE && Math.hypot(...S.CENTRE.at())<1e-12);
ok("it holds when the shape BREATHES — the jitterbug's fixed point",
   (()=>{ const b={}; S.NAMES.forEach(n=>b[n]=S.EMBED[n].map(x=>x*1.3));
          return S.CENTRE.holds(b); })());
ok("it FOLLOWS a translation — a gauge, so internal motion stays measurable",
   (()=>{ const m={}; S.NAMES.forEach(n=>m[n]=S.EMBED[n].map((x,i)=>x+[5,-2,3][i]));
          const c=S.CENTRE.at(m);
          return Math.abs(c[0]-5)<1e-12 && Math.abs(c[1]+2)<1e-12 && Math.abs(c[2]-3)<1e-12; })());
ok("a seat read IN THE FRAME is unchanged by that translation",
   (()=>{ const m={}; S.NAMES.forEach(n=>m[n]=S.EMBED[n].map((x,i)=>x+[5,-2,3][i]));
          return S.CENTRE.relativeTo("TANK",m).every((v,i)=>Math.abs(v-S.EMBED.TANK[i])<1e-12); })());

/* UNADDRESSABLE, not merely un-addressed. The same move as the void return at
   THE STATIONS: the law is kept by there being nothing to write, not by nobody
   having written it. */
ok("the frame is frozen — no field can be added to the centre at runtime",
   S.CENTRE && Object.isFrozen(S.CENTRE) &&
   (()=>{ try{ S.CENTRE.__x=1; }catch(e){} return !("__x" in S.CENTRE); })());
ok("NOTHING CAN BE SENT TO IT — no receive, no to, no send, no set, no put",
   S.CENTRE && ["receive","to","send","set","put","add","hold"].every(k=>!(k in S.CENTRE)));
ok("and it names nothing — the frame carries no content field",
   S.CENTRE && !["name","holds_","value","content","game"].some(k=>k in S.CENTRE));

/* ── the interior: 26 positions the surface never showed ──────────────────────
   Kevin, 2026-08-16: "map the 26 positions." Twelve radii, eight tetrahedral
   cells, six pyramid cells. Every line re-derived from the embedding. */
ok("twelve radii, one per seat", S.RADII.length===12);
ok("every radius is exactly one edge long — THE VECTOR EQUILIBRIUM",
   S.RADII.every(r=>Math.abs(r.length - S.CENTRE.edgeLength) < 1e-12));
ok("NO RADIUS IS A MEMBER — measurable, never walkable",
   S.RADII.every(r=>r.member===null) &&
   S.RADII.every(r=>!S.ADJ[r.seat].includes("CENTRE")) &&
   !S.MEMBERS.some(m=>m.a==="CENTRE"||m.b==="CENTRE"));
ok("the twelve radii pair into six straight lines through the centre",
   S.DIAMETERS.length===6 &&
   S.DIAMETERS.every(([a,b])=>S.EMBED[a].every((x,i)=>Math.abs(x+S.EMBED[b][i])<1e-12)));

ok("fourteen cells — one under every face", S.CELLS.length===14);
ok("eight tetrahedral cells, every one exactly ONE tetra-unit",
   S.CELLS.filter(c=>c.kind==="tetra").length===8 &&
   S.CELLS.filter(c=>c.kind==="tetra").every(c=>Math.abs(c.volume-1)<1e-9));
ok("and every one of them REGULAR — because the radius equals the edge",
   S.CELLS.filter(c=>c.kind==="tetra").every(c=>{
     const P=c.seats.map(n=>S.EMBED[n]), L=[];
     for(let i=0;i<3;i++){ L.push(Math.hypot(...P[i]));
       for(let j=i+1;j<3;j++) L.push(Math.hypot(...P[i].map((x,k)=>x-P[j][k]))); }
     return L.every(l=>Math.abs(l-S.CENTRE.edgeLength)<1e-9); }));
ok("six pyramid cells, every one exactly TWO tetra-units (half-octahedra)",
   S.CELLS.filter(c=>c.kind==="pyramid").length===6 &&
   S.CELLS.filter(c=>c.kind==="pyramid").every(c=>Math.abs(c.volume-2)<1e-9));
ok("the whole solid measures TWENTY — Fuller's number, out of the circuit table",
   Math.abs(S.VOLUME-20)<1e-9);
/* the split that matters for building: what can change and what cannot */
ok("twelve of the twenty units deform; eight cannot",
   Math.abs(S.CELLS.filter(c=>!c.rigid).reduce((s,c)=>s+c.volume,0)-12)<1e-9 &&
   Math.abs(S.CELLS.filter(c=>c.rigid).reduce((s,c)=>s+c.volume,0)-8)<1e-9);
ok("every rigid cell sits under a triangle, every deforming one under a square",
   S.CELLS.every(c=>c.rigid === (c.under==="triangle")));

ok("thirteen axes in three families — 3 through squares, 4 through triangles, 6 through seats",
   S.AXES.throughSquares===3 && S.AXES.throughTriangles===4 &&
   S.AXES.throughSeats===6 && S.AXES.total===13);
ok("and thirteen points — the twelve seats and the centre",
   S.NAMES.length + 1 === 13);
ok("the opened census: 13 points · 36 lines · 14 faces · 14 volumes",
   S.NAMES.length+1===13 && S.MEMBERS.length+S.RADII.length===36 &&
   S.TRIANGLES.length+S.SQUARES.length===14 && S.CELLS.length===14);

/* -- what each pyramid cell DOES: the six trades ------------------------------
   Kevin, 2026-08-16: "now assign function to the 6 pyramid cells." The function
   is derived, not assigned: each cell is one exchange, and only that one. */
ok("six trades, one per pyramid cell", S.TRADES.length===6);
ok("each has exactly two free lengths -- its diagonals",
   S.TRADES.every(t=>t.diagonals.length===2));
ok("a diagonal is NEVER a member -- the four sides are members, the diagonals are not",
   S.TRADES.every(t=>t.diagonals.every(([a,b])=>!S.isMember(a,b))));
ok("and never an antipodal pair",
   S.TRADES.every(t=>t.diagonals.every(([a,b])=>S.antipodeOf(a)!==b)));
ok("every diagonal sits at distance two -- the relations that are not walks",
   S.TRADES.every(t=>t.diagonals.every(([a,b])=>S.distance(a,b)===2)));
ok("the ring order is real: consecutive seats in a square ARE members",
   S.TRADES.every(t=>t.ring.every((n,i)=>S.isMember(n, t.ring[(i+1)%4]))));
ok("twelve diagonals in all, every one distinct",
   new Set(S.TRADES.flatMap(t=>t.diagonals.map(d=>d.slice().sort().join("|")))).size===12);
ok("every pair of seats is a member, a distance-two, or an antipode: 24 + 36 + 6 = 66",
   (()=>{ const c={1:0,2:0,3:0};
     for(let i=0;i<12;i++) for(let j=i+1;j<12;j++) c[S.distance(S.NAMES[i],S.NAMES[j])]++;
     return c[1]===24 && c[2]===36 && c[3]===6 && c[1]+c[2]+c[3]===66; })());

console.log(bad ? "\nBLOCKED — "+bad+" failed" : "\nthe solid stands.");
process.exit(bad?1:0);
