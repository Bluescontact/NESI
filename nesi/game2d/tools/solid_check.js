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

console.log(bad ? "\nBLOCKED — "+bad+" failed" : "\nthe solid stands.");
process.exit(bad?1:0);
