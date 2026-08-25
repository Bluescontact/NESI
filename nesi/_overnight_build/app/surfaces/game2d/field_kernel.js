/* ═══ THE FIELD KERNEL ═══════════════════════════════════════════════════════
   Built 2026-08-18 on Kevin's mark: "yes it should be rebuilt on this" —
   answering the field-bench v0.22 drop with a real port, not a reference.

   WHAT IS PORTED, AND WHY, STATED PLAINLY:
   Field bench's generic loop→surface→cavity derivation (closures(), loops(),
   updateEnclosures()) is NOT ported. solid.js already computes the real
   fourteen cells for THIS solid — 8 tetra + 6 pyramid, PyRigi-measured,
   correction-carrying — and reimplementing generic graph-cycle-detection
   over it would be a second, weaker copy of a thing already proven correct.
   That would be exactly the fault index.html's own header warns against:
   "a second copy of the geometry would drift from the first and the drift
   would be invisible."

   WHAT IS PORTED: the event-sourced state model (an append-only log; world
   state is a PROJECTION of it, never mutated directly) and the ENCLOSURE
   BIOGRAPHY pattern — an identity that persists across a closure and a
   reopening, tracked as PERIODS, with the cause of closing derived, never
   guessed. That pattern has no equivalent in this build yet, and it is
   exactly the shape "dawn is the irreversible threshold... a player that
   rewinds to dawn undoes every action made in the day" needs: a period is
   provisional until it closes; once closed it is sealed, and a new period
   opens under the SAME cell identity, nothing erased.

   FIVE RECORD KINDS, EACH WITH ITS OWN PROVENANCE, NONE OVERWRITING ANOTHER —
   field bench's own separation, kept:
     BODY        identity                    (a seat, from solid.js)
     JOINT       mechanism, all physics       (a member/seam, from solid.js)
     RELATION    human declaration, zero physics, ever  (a fraction sort, a
                 load answer — what the hand said about a stone)
     EMBODIMENT  which relation a joint is being used to embody (a stone's
                 fraction, embodied at a specific seam it was returned to)
     LINEAGE     engine-authored fact, no standing to revoke (a stone was
                 banked from this text at this tick — descent, not declaration)

   THE LEDGER IS THE RUNTIME. project() rebuilds a world from events alone;
   verify() checks live state against a fresh replay. If they ever disagree,
   the kernel is wrong, not the game built on it. */
"use strict";

const FIELD_SCHEMA = "field.1";

/* ── genesis: the permanent geometry, seeded from solid.js, never authored
   by a player. If solid.js changes, genesis regenerates — nothing here is a
   second copy that could drift. ── */
function genesisEvents(SOLID){
  const S = SOLID.SOLID || SOLID;
  const ev = [];
  let id = 0;
  S.NAMES.forEach(name => {
    ev.push({ i: ev.length, tick: 0, type: "BODY_PLACED",
      data: { id: ++id, name, fall: S.SEATS[name].fall, kind: "seat" } });
  });
  const bodyIdOf = {};
  ev.forEach(e => { if(e.type === "BODY_PLACED") bodyIdOf[e.data.name] = e.data.id; });
  S.MEMBERS.forEach(m => {
    ev.push({ i: ev.length, tick: 0, type: "JOINT_ATTACHED",
      data: { id: ++id, key: m.key, a: bodyIdOf[m.a], b: bodyIdOf[m.b],
        aName: m.a, bName: m.b, kind: m.kind } });
  });
  /* the fourteen cells — read from solid.js, not derived here. Each becomes a
     tracked enclosure IDENTITY from world genesis, closed with zero periods:
     it exists as an object before it has ever been entered, the same way a
     seat exists before it has ever been walked. */
  S.CELLS.forEach((c, i) => {
    ev.push({ i: ev.length, tick: 0, type: "CELL_DECLARED",
      data: { id: ++id, cellIndex: i, kind: c.kind,
        seats: c.seats.map(n => bodyIdOf[n]), seatNames: c.seats,
        under: c.under, deforms: c.deforms } });
  });
  return ev;
}

function newWorld(){
  return {
    bodies: new Map(), joints: new Map(), relations: new Map(),
    embodiments: new Map(), lineages: new Map(), cells: new Map(),
    eventHead: -1, tick: 0, ids: 0
  };
}

/* ── the only mutator. Every case either creates a record with a standing
   interval, or closes one. Nothing is ever deleted. ── */
function apply(w, e){
  const d = e.data;
  w.eventHead = e.i;
  w.tick = e.tick;
  switch(e.type){
    case "BODY_PLACED":
      w.bodies.set(d.id, { id: d.id, name: d.name, fall: d.fall, kind: d.kind,
        standing: { from: e.i, until: null }, prov: { by: "genesis", at: e.i } });
      break;
    case "JOINT_ATTACHED":
      w.joints.set(d.id, { id: d.id, key: d.key, a: d.a, b: d.b,
        aName: d.aName, bName: d.bName, kind: d.kind,
        standing: { from: e.i, until: null }, prov: { by: "genesis", at: e.i } });
      break;
    case "CELL_DECLARED":
      w.cells.set(d.id, { id: d.id, cellIndex: d.cellIndex, kind: d.kind,
        seats: d.seats, seatNames: d.seatNames, under: d.under, deforms: d.deforms,
        periods: [], alive: false,
        standing: { from: e.i, until: null }, prov: { by: "genesis", at: e.i } });
      break;

    /* ── DAWN — the irreversible threshold. Closes the cell's current period
       (if one is open) and opens a new one under the SAME cell identity.
       Not modeled as a joint cut: the seat geometry is permanent and nothing
       about it is severed at dawn. Dawn is its own event because what it
       does — seal a day, start the next — is not "a mechanism failed," it is
       a calendar fact. Distinguishing the two is exactly what law 23 (ask the
       object its state, never infer it from a symptom) asks for: a period
       closes because DAWN_CROSSED happened, and the log says so, rather than
       being inferred from some other signal changing. ── */
    case "DAWN_CROSSED": {
      const c = w.cells.get(d.cellId); if(!c) break;
      const last = c.periods[c.periods.length - 1];
      if(last && last.untilTick === null){
        last.untilTick = e.tick; last.untilEvent = e.i; last.cause = "dawn";
      }
      c.periods.push({ dayIndex: c.periods.length, fromTick: e.tick, fromEvent: e.i,
        untilTick: null, untilEvent: null, cause: null });
      c.alive = true;
      break;
    }
    /* ── REWIND — the player's own undo, bounded to the CURRENT open period.
       Everything the log recorded since that period's fromEvent stays in the
       log (nothing is deleted, ever) but is marked withdrawn — the same
       shape as BODY_WITHDRAWN in field bench: the record stays, its standing
       ends. A rewind cannot reach into a period that DAWN_CROSSED already
       closed — that is the whole meaning of "irreversible threshold." ── */
    case "REWIND_TO_DAWN": {
      const c = w.cells.get(d.cellId); if(!c) break;
      const last = c.periods[c.periods.length - 1];
      if(!last || last.untilTick !== null) break;   /* no open period to rewind */
      for(const r of w.relations.values())
        if(r.standing.until === null && r.standing.from >= last.fromEvent) r.standing.until = e.i;
      for(const m of w.embodiments.values())
        if(m.standing.until === null && m.standing.from >= last.fromEvent) m.standing.until = e.i;
      break;
    }

    /* ── RELATION — human declaration, zero physics, ever. "This stone is
       dissolved," "this stone is formed," "this load answer is yes." ── */
    case "RELATION_DECLARED":
      w.relations.set(d.id, { id: d.id, subject: d.subject, verb: d.verb, object: d.object || null,
        standing: { from: e.i, until: null }, prov: { by: "hand", at: e.i } });
      break;
    case "RELATION_RETRACTED": {
      const r = w.relations.get(d.id); if(r) r.standing.until = e.i;
      break;
    }

    /* ── EMBODIMENT — which relation a joint is being used to embody. A
       stone's fraction, embodied at the specific seam it was returned to. ── */
    case "EMBODIED":
      w.embodiments.set(d.id, { id: d.id, relation: d.relation, joint: d.joint,
        standing: { from: e.i, until: null }, prov: { by: "hand", at: e.i } });
      break;
    case "DISEMBODIED": {
      const m = w.embodiments.get(d.id); if(m) m.standing.until = e.i;
      break;
    }

    /* ── LINEAGE — engine-authored fact. No verb, no standing to revoke: a
       banking is a descent, not a declaration. ── */
    case "LINEAGE_RECORDED":
      w.lineages.set(d.id, { id: d.id, from: d.from, to: d.to, kind: d.kind,
        prov: { by: "engine", at: e.i } });
      break;
  }
  if(d && d.id && d.id > w.ids) w.ids = d.id;
}

/* ── standing helpers — the only lawful way to ask "is this real right now" ── */
const live = x => x && x.standing.until === null;
const liveBodies = w => [...w.bodies.values()].filter(live);
const liveJoints = w => [...w.joints.values()].filter(live);
const liveRelations = w => [...w.relations.values()].filter(live);
const liveEmbodiments = w => [...w.embodiments.values()].filter(live);
const openPeriodOf = (w, cellId) => {
  const c = w.cells.get(cellId); if(!c) return null;
  const last = c.periods[c.periods.length - 1];
  return (last && last.untilTick === null) ? last : null;
};

/* ── the ledger is the runtime: rebuild a world from events alone ── */
function project(events, uptoEvent){
  const w = newWorld();
  const last = uptoEvent === undefined ? events.length - 1 : uptoEvent;
  for(let i = 0; i <= last; i++) apply(w, events[i]);
  return w;
}

/* ── canonical projection + hash, for verify(): live state must equal a
   fresh replay from event 0, or the kernel itself is wrong. ── */
function canonical(w){
  const srt = m => [...m.values()].sort((a, b) => a.id - b.id);
  return JSON.stringify({
    tick: w.tick, ids: w.ids,
    bodies: srt(w.bodies).map(b => ({ id: b.id, name: b.name, standing: b.standing })),
    joints: srt(w.joints).map(j => ({ id: j.id, key: j.key, standing: j.standing })),
    relations: srt(w.relations).map(r => ({ id: r.id, subject: r.subject, verb: r.verb, object: r.object, standing: r.standing })),
    embodiments: srt(w.embodiments).map(m => ({ id: m.id, relation: m.relation, joint: m.joint, standing: m.standing })),
    lineages: srt(w.lineages).map(l => ({ id: l.id, from: l.from, to: l.to, kind: l.kind })),
    cells: [...w.cells.values()].sort((a, b) => a.id - b.id).map(c => ({ id: c.id, periods: c.periods, alive: c.alive }))
  });
}
function hash(s){
  let h = 2166136261 >>> 0;
  for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h.toString(16).padStart(8, "0");
}
function verify(events, liveWorld){
  const replay = project(events);
  const a = canonical(liveWorld), b = canonical(replay);
  return { ok: a === b, liveHash: hash(a), replayHash: hash(b) };
}

const FIELD = {
  FIELD_SCHEMA, genesisEvents, newWorld, apply, project,
  live, liveBodies, liveJoints, liveRelations, liveEmbodiments, openPeriodOf,
  canonical, hash, verify
};
if(typeof window !== "undefined") window.FIELD = FIELD;
if(typeof module !== "undefined") module.exports = FIELD;
