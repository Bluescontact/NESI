/* ═══ THE SEAM MODULE ═════════════════════════════════════════════════════
   Built 2026-08-19 on Kevin's ruling: a level is one edge (24 members + 6
   diameters = 30), and water (the sort), light (the shareable form) and
   growth (a root, once a level has survived both) are mechanics that happen
   INSIDE every level — not a separate room, not a separate route.

   tank.html already proved the shape, for TANK's own members: read the
   member's tool (triangle) and window (square) live from solid.js, sort it
   into a fraction, form it, and hold a sill (REACH=900, gives back faster
   than it takes) until it gives. This file is that mechanic, factored out so
   a SECOND site that needs the same door does not grow a second, drifting
   copy of it — the exact failure solid.js's own header names for a number
   ("nothing here is a stored fact that could drift from the table it came
   from"), applied to a MECHANISM instead.

   FOLDED IN, 2026-08-19: tank.html's own inline copy of this mechanic (its
   FRACTIONS array, fractionMember(), isReturned()) was a second, drifting
   copy of exactly what this file already held — the duplication this
   header used to name and defer is now closed. tank.html calls
   SEAM.fractionControl(st, SEAT, after) exactly as ascent.html calls
   SEAM.fractionControl(st, seat, ...), same functions, same file, two call
   sites. tank.html's own water-sort UI/behaviour (the fraction buttons, the
   tile layout, the sill, the store) is unchanged — only the underlying code
   path is unified, and the light half of it (form → aim) changed for both
   call sites together, because both were always the same mechanism.

   NOTHING HERE ASSUMES A DOM. The geometry and gating functions (waterSeamsFor,
   inhabited, seamComplete, isReturned, walk) take plain data and return plain
   data, so a node instrument could exercise them with no browser at all. Only
   fractionControl and sillMechanic touch document/addEventListener, and only
   when actually called. */
"use strict";

const waterKind = k => k==="fall" || k==="turn";

/* Every member out of `seat`, any kind, read live from solid.js — never
   written down twice, so if solid.js's circuits ever change, this changes
   with them or returns nothing rather than something stale. Factored out so
   waterSeamsFor and seamsFor share one mapping and cannot drift apart. */
function _seamsAt(seat){
  const G = (typeof window!=="undefined" && window.SOLID) || null;
  if(!G || !G.ADJ || !G.ADJ[seat]) return [];
  return G.ADJ[seat].map(function(o){
    const m=G.memberBetween(seat,o), f=G.facesAlong(seat,o);
    if(!m || !f || !f.triangle || !f.square) return null;
    return { id:m.key, from:seat, to:o, kind:m.kind,
             tool:"tetra "+f.triangle.tetra, window:f.square.axis };
  }).filter(Boolean);
}

/* Every member out of `seat`, filtered to the water half (fall + turn) —
   exactly what this returned before 2026-08-22. Still used wherever "water"
   is the actual concept (windowCharge/seatAmbient/junctionSeams below), not
   merely "whatever a seat page happens to show." */
function waterSeamsFor(seat){
  return _seamsAt(seat).filter(function(s){ return waterKind(s.kind); });
}

/* ═══ ALL FOUR — 2026-08-22, Kevin's mark ("fix #1, the shared spot"). The
   one choke point the survey found: ascent.html's renderSeat() only ever
   asked waterSeamsFor() for cards to show, so the rise+return half of every
   circuit (12 of 24 members) could never be walked, so circuitComplete()
   could never return true, so the gift shop / circuitWiring / yesterday's
   flowOf-headOf-powerOf were all fully built and fully dead. This is the
   widened door: every one of a seat's four real neighbors, any kind, so a
   circuit's rise and return edges become walkable through the exact same
   mechanic (fractionControl/sillMechanic/walk) that already runs the fall/
   turn half — none of which ever checked kind to begin with. */
function seamsFor(seat){
  return _seamsAt(seat);
}

/* ═══ THE WORKBENCH TRIGGER — 2026-08-21. "At level 12 complete, we site the
   full workbench" (THE_WORKBENCH.md's own citation, Kevin). Nothing computed
   this before today: THE_THREE_DYNAMICS.md named the condition in prose
   ("water's twelve" — the 8 fall + 4 turn edges, all returned) but no code
   checked it. This does, and only this: whether every water member the solid
   itself defines is in the walked set. Read live off solid.js's MEMBERS, the
   same law waterSeamsFor already holds for one seat's own four — never a
   fixed list of twelve keys that could drift from the partition if the solid
   ever changed. Takes L.seamsTaken directly (the shared nesi.water ledger
   ascent.html and tank.html both write through walk()) — not a second store. */
function waterMembers(){
  const G = (typeof window!=="undefined" && window.SOLID) || null;
  if(!G || !G.MEMBERS) return [];
  return G.MEMBERS.filter(function(m){ return waterKind(m.kind); });
}
function waterComplete(walkedKeys){
  const keys = waterMembers().map(function(m){ return m.key; });
  if(!keys.length) return false;
  const done = {}; (walkedKeys || []).forEach(function(k){ done[k]=true; });
  return keys.every(function(k){ return done[k]; });
}
/* 0..1, never shown as a number — how much of the twelve stands, for a
   caller that wants to show approach rather than a hard on/off (a progress
   bar toward the workbench would be exactly the number law forbids; this is
   for driving something continuous, like a fade, never for printing). */
function waterStanding(walkedKeys){
  const keys = waterMembers().map(function(m){ return m.key; });
  if(!keys.length) return 0;
  const done = {}; (walkedKeys || []).forEach(function(k){ done[k]=true; });
  return keys.filter(function(k){ return done[k]; }).length / keys.length;
}

function inhabited(deposits, face){ return !!face && ((deposits && deposits[face]) || 0) > 0; }
function seamComplete(deposits, seam){ return inhabited(deposits, seam.tool) && inhabited(deposits, seam.window); }

/* SORTED AND AIMED — day_one.html's own test (F7), generalized from a stone
   to a seam, and its light half rebuilt 2026-08-19 on KNOWLEDGE_light_in_
   games.md §0/§3/§8: "light has aim and no stock. Water has stock and no
   aim." A toggle has neither aim nor stock — it wasn't standing in for
   light's own character at all. The replacement is a real pick: which of
   the seat's own two windows (S.SQUARES.filter(q=>q.seats.includes(seat)) —
   always exactly two, computed, never listed) the formed stone is aimed at.
   day_one.html and tank.html ask the two-part question of a STONE — the
   writing that passed through. The six new doors this seams module opens
   each already run their OWN water mechanic at the seat itself (ascent.
   html's own SET[key] — the filter's screen, the stations' three routes,
   and so on), so there is no second body of writing standing at the door to
   sort. What IS at the door is the seam, so the hand sorts and aims THAT —
   same two-part law, same hand, different subject. */
function isReturned(state){ return !!(state && state.fraction && state.light); }

/* ═══ THE ROOT — 2026-08-19. isReturned() above is the PRECONDITION, not the
   whole of what THE_GROWTH.md §1 calls a root: "each root is a level
   inhabited, and the figure only becomes visible as roots grow." Surviving
   water and light is what makes a root exist; what follows is the same
   asymptotic, day-gated law world.html already proved twice —

     world.html:781-788 (feed/standing): a shoot's `rooted` starts at 0 on
     creation, and grows ONLY on a day later than its own `lastFed`:
       if(s.lastFed&&s.lastFed!==d) s.rooted=Math.min(1,s.rooted+(1-s.rooted)*0.22);
     — idempotent within a day (holding a beam on it from dawn to dusk roots
     it exactly as much as touching it once), no threshold to reach, never
     shown as a number, only read through standing(s)=0.16+0.84*rooted, a
     silhouette scale.

     BUILD_RECORD.md ~1100-1370 proves the identical shape a session earlier
     (asymptotic rooted, day-gated, silhouette not readout) — the same law
     paid for twice, carried in verbatim rather than re-derived a third time.

   THE JUDGMENT CALL isReturned() ITSELF is left UNCHANGED, on purpose: it
   already fires the instant fraction+light are both set, never waiting on a
   threshold — read against THE_GROWTH.md's own "returned, not earned," that
   IS the correct meaning of "a root exists." Giving isReturned() a rooted
   threshold would be a SECOND gate nothing in the corpus asked for. Growth
   is layered on top of the existing gate — it changes what a returned level
   LOOKS like over time, never whether it counts. */
const ROOT_STEP = 0.22;

function seamToday(){
  const dt = new Date();
  return dt.getFullYear() + "-" + String(dt.getMonth()+1).padStart(2,"0")
       + "-" + String(dt.getDate()).padStart(2,"0");
}

/* MIGRATE — a state that was already returned before this pass (via the old
   flat isReturned) has no `rooted`/`lastFed` at all. Seeding it at exactly
   ONE asymptotic step (0 + (1-0)*0.22) rather than at 0: real time has
   already passed since it survived water and light — this file did not
   exist yet to seed it at that moment — so a bare 0 would understate what
   was already true of it (law 20: no law becomes a lever to give Kevin
   less). Seeding it at a threshold or further along would fabricate returns
   that were never made. One step is the smallest honest floor: the same
   value growRoot() itself produces the first time any level is touched on a
   day later than the day it rooted. lastFed is stamped to today so it does
   not grow a second time on the same day it was migrated. */
function migrateRoot(state){
  if(state && isReturned(state) && typeof state.rooted !== "number"){
    state.rooted = ROOT_STEP;
    state.lastFed = seamToday();
  }
  return state;
}

/* GROW — call as often as convenient; it is idempotent within a day and
   inert until isReturned(state). A level with no root yet is left alone
   entirely (no rooted/lastFed field at all) so nothing renders for a level
   that hasn't survived both. */
function growRoot(state){
  if(!isReturned(state)) return state;
  const d = seamToday();
  if(typeof state.rooted !== "number"){
    state.rooted = 0;         /* the seed — planted the day the precondition was met */
    state.lastFed = d;
    state.daysGrown = 1;      /* the week cycle's own seed — day one of the level's week */
    return state;
  }
  if(state.lastFed && state.lastFed !== d){
    state.rooted = Math.min(1, state.rooted + (1 - state.rooted) * ROOT_STEP);
    state.daysGrown = (state.daysGrown || 1) + 1;
  }
  state.lastFed = d;
  return state;
}

/* STANDING — world.html's own standing(s), same law, same 0.16 floor so a
   freshly-seeded root is never invisible, only small. Never shown as a
   number; callers use it to scale or deepen something already on screen. */
function rootStanding(state){
  return 0.16 + 0.84 * ((state && typeof state.rooted === "number") ? state.rooted : 0);
}

/* ═══ THE WEEK CYCLE — 2026-08-20, Kevin's ruling: "each level consists of a
   week." Extends the SAME day-gating growRoot() already proved (world.html's
   shoot mechanic, and THE DEEP's own night_check.js, 10/10 passing: "a week
   raises seven"), rather than inventing a second clock. `daysGrown` counts
   real distinct calendar days this level has been touched, capped nowhere
   below 7 by growRoot itself but read against a 7-day target here — same
   split BUILD_RECORD.md's night model already uses (raw count vs. a named
   cap read against it). */
const WEEK_LEN = 7;
/* MIGRATE — a state that survived water and light before this code existed
   has no `daysGrown` at all. Law 20 (no law becomes a lever to give Kevin
   less): seeding it at 0 would claim a level that's ALREADY returned hasn't
   even started its week, which is false — it seeds at 1, the same one-step
   honest floor migrateRoot already uses for the identical reason. A state
   that was never returned at all is left alone; growRoot's own seed branch
   is what starts a real week for it. */
function migrateWeek(state){
  if(state && isReturned(state) && typeof state.daysGrown !== "number"){
    state.daysGrown = 1;
  }
  return state;
}
/* 0..1, never shown as a number — the week's own visible depth, read the
   same way rootStanding is. */
function weekStanding(state){
  return Math.min(1, ((state && state.daysGrown) || 0) / WEEK_LEN);
}
/* THE GATE — a level's week has to actually complete (7 distinct days
   touched) before its door may be walked, not merely before it looks close.
   isReturned() alone (one water+light act) was never meant to be the whole
   of "this level is done" — THE_GAME.md's own line names the shape this
   closes: "growth roots only across returned days; nothing volume can
   force." */
function weekComplete(state){
  return !!(state && typeof state.daysGrown === "number" && state.daysGrown >= WEEK_LEN);
}

/* ═══ WINDOW CHARGE — 2026-08-20, Kevin's ruling on the light fork (MARKS_LOG.
   jsonl 2026-08-20T21:1x): aim stays the hand's act (picking one of the seat's
   own two windows, built 2026-08-19); what accumulates is a stock, and the
   stock lives at the WINDOW, not the level — a window is shared by up to four
   seams (THE_GROWTH.md: "6 windows × 4 seams each = 24"). Every level whose
   light lands on a given window adds to that window's own charge, persisting
   across levels rather than resetting each time it's read. This is the
   heliostat's own aggregation law (KNOWLEDGE_light_in_games.md §4: "N mirrors
   onto one target is a sum with a threshold") read onto the twelve seats.

   DERIVED, NOT STORED — nothing new is written to the ledger. This reads
   whatever seam states already exist (S.seamState in ascent.html, the same
   states fractionControl already mutates), exactly the "not a stored fact
   that could drift from the table it came from" law solid.js's own header
   states for a number, applied here to an aggregate instead of a single
   value. A window with no returned seam aimed at it has zero charge because
   nothing is summed, not because a zero was written somewhere. */
function windowCharge(states){
  const charge = {};
  Object.keys(states || {}).forEach(function(id){
    const st = states[id];
    if(!isReturned(st) || !st.light || st.light==="legacy") return;
    charge[st.light] = (charge[st.light] || 0) + rootStanding(st);
  });
  return charge;
}
/* 0..1, never shown as a number. Four is not an arbitrary cap: it is the real
   structural ceiling computed in THE_GROWTH.md — every window is shared by
   exactly four seams, so four fully-rooted seams aimed at the same window IS
   that window's full charge, not a chosen threshold. */
function windowStanding(charge, axis){
  return Math.min(1, ((charge && charge[axis]) || 0) / 4);
}

/* ═══ THE CIRCUIT-GIFT — 2026-08-20, ruled: "the sort keeps physical
   fractions, and a gift falls out at the end of a full circuit" (THE_FILTER.
   md's fork, ruled "Both"; carried in LEVEL_LIBRARY.md §1). "Nothing today
   checks 'has this player walked all six edges of one circuit' — that's the
   next water-side build." This is that check, and only that check: what a
   completed circuit DOES (calling the gift shop's own emit()) is a caller's
   business, same separation waterSeamsFor already keeps from the DOM.

   Read live off solid.js's own CIRCUITS/MEMBERS — a member's .circuits is
   the one circuit it belongs to (verified: every member sits on exactly one,
   a clean 4×6 partition, THE_24.md's own count). Nothing here is a second
   list that could drift from that partition. */
function circuitKeys(ci){
  const G = (typeof window!=="undefined" && window.SOLID) || null;
  if(!G || !G.MEMBERS) return [];
  return G.MEMBERS.filter(function(m){ return m.circuits.indexOf(ci)>=0; }).map(function(m){ return m.key; });
}
/* WALKED, not merely returned — the same gate PROGRESSION.md's own language
   uses throughout ("walk one and you have walked a whole world that
   closes"). A member can't be walked without first being returned (the
   door's own gate), so this is a strict, safe narrowing, never a looser one. */
function circuitComplete(ci, walkedKeys){
  const keys = circuitKeys(ci);
  if(!keys.length) return false;
  const done = {}; (walkedKeys || []).forEach(function(k){ done[k]=true; });
  return keys.every(function(k){ return done[k]; });
}
/* Which of the solid's own circuits are complete against a given walked set
   — indices, 0..(circuit count - 1), read live so a fifth circuit (should
   the solid ever carry one) is never assumed absent by a hard-coded 4. */
function completedCircuits(walkedKeys){
  const G = (typeof window!=="undefined" && window.SOLID) || null;
  const n = (G && G.CIRCUITS) ? G.CIRCUITS.length : 0;
  const out = [];
  for(let ci=0; ci<n; ci++){ if(circuitComplete(ci, walkedKeys)) out.push(ci); }
  return out;
}

/* THE GIFT'S OWN ROUTE — 2026-08-21. Once a circuit completes and its gift
   falls out (above), the wire traced anywhere along that circuit's own six
   seams (§ THE WIRE, above) is what the gift travels — collects every
   distinct edge a hand pointed toward from any of the circuit's own seams.
   A circuit can hold more than one junction, so this is a set, the same
   shape routedTo itself already is, never a single slot. Empty when nothing
   was traced — the gift still falls out, it simply travels no wire. */
function circuitWiring(ci, states){
  const keys = circuitKeys(ci);
  const out = [];
  keys.forEach(function(k){
    const st = (states || {})[k];
    if(st && Array.isArray(st.routedTo)){
      st.routedTo.forEach(function(id){ if(out.indexOf(id)<0) out.push(id); });
    }
  });
  return out;
}

/* ═══ THE DAM'S LAW, PORTED — 2026-08-22, Kevin's mark: "we don't care about
   how or why it was previously built, we care about what we can learn from
   it, and what is worth building forward." nesi/world3d/scripts/dam.gd
   (retired 2026-08-14 with the whole engine) held three pure functions with
   no state, no coordinate, no file access — flow_of, head_of, power_of
   (dam.gd:116-131). The ENGINE did not survive; the ARITHMETIC does, because
   it never depended on Godot to begin with. Ported here as three lines, not
   as a system.

   APPLIED UNIFORMLY, TO EVERY CIRCUIT — never to one seat alone, per Kevin's
   own fork (2026-08-22): every circuit's gift-fall carries the same law, the
   same way FRACTIONS/WINDOW_AXES are one vocabulary for all twelve seats
   rather than one entry per seat.

   FLOW — a circuit either just completed or it didn't. Nothing flows while
   it merely stands charged and unfinished, exactly dam.gd:117-118 ("a shut
   gate passes none").
   HEAD — how charged the completing circuit's own windows already stand
   (windowStanding, 0..1, derived above, never stored) at the moment it
   completes. Not the circuit's OWN charge — the charge OTHER levels already
   left at the windows this circuit's own seams share, exactly as
   windowCharge already reads "a window's charge, read by every seam that
   can reach it."
   POWER — flow x head, dam.gd:130 verbatim. A circuit that completes with
   nothing charged behind its windows falls out at power 0 — a real gift
   (the fall still happens; nothing here gates emit()), it simply carries no
   weight. HOLDING IS NOT PRODUCING: a fully charged window that no circuit
   ever completes through produces nothing, because flow stays 0 forever. */
function flowOf(justCompleted){ return justCompleted ? 1 : 0; }
function headOf(ci, states){
  const G = (typeof window!=="undefined" && window.SOLID) || null;
  if(!G || !G.MEMBERS || !G.facesAlong) return 0;
  const keys = circuitKeys(ci);
  if(!keys.length) return 0;
  const charge = windowCharge(states);
  const axes = new Set();
  keys.forEach(function(k){
    const m = G.MEMBERS.find(function(x){ return x.key===k; });
    if(!m) return;
    const f = G.facesAlong(m.a, m.b);
    if(f && f.square) axes.add(f.square.axis);
  });
  if(!axes.size) return 0;
  let sum=0; axes.forEach(function(ax){ sum += windowStanding(charge, ax); });
  return sum / axes.size;
}
function powerOf(flow, head){ return Math.max(0,flow) * Math.max(0,head); }

/* ═══ LEVEL-ID TAGGING — 2026-08-21, Kevin's own words: "the first 12 levels
   become the world guides... and act as the anchor for the library that can
   be built on top of it." That needs writing attributable to the level it
   was written at, not held only in one undifferentiated pool. `S.kept`
   itself (`THE_GIFT.md`'s own store) stays exactly what it has always been
   — an array of strings, read by index everywhere (drawKept, emit, the
   shelf) — this is additive, not a reshape. A PARALLEL, positionally-
   aligned array carries the tag, the same shape `fractionsSeen`/
   `windowsSeen` already use to add memory without touching what came
   before. Still governed by `THE_GIFT.md`'s own law: a level-id is
   structural, never content — this reads no more of a sentence than
   `keptDepth()` already does by position alone. */
function tagWritten(keptTags, levelId){
  const tags = keptTags || [];
  tags.push(levelId || null);
  return tags;
}
/* MIGRATE — entries already in S.kept before this build have no tag at all.
   Backfilling with a guessed level would invent what a past hand meant
   (law 23); the sentinel is "untagged" — real and honest, distinct from a
   level id that happens to be null. Idempotent: only ever appends up to
   S.kept's own length, never trims, never reorders. */
function migrateKeptTags(kept, keptTags){
  const k = kept || [];
  const t = keptTags || [];
  while(t.length < k.length) t.push("untagged");
  return t;
}
/* Read-only: which of S.kept's own entries were written at a given level —
   returns INDICES, never the strings themselves, the same law drawKept
   already holds (no machine wording reaches a caller through this). */
function keptAtLevel(keptTags, levelId){
  const tags = keptTags || [];
  const out = [];
  tags.forEach(function(t,i){ if(t===levelId) out.push(i); });
  return out;
}
/* Has THIS level's own entry been written yet — derived, never a second
   stored flag, the same law isReturned/windowCharge already follow. */
function hasWritten(seamId, keptTags){
  return keptAtLevel(keptTags, seamId).length > 0;
}
/* THE EDGE'S OWN WRITE — 2026-08-21, LEVEL_LIBRARY.md's own pacing model:
   "write one entry... pick a fraction... aim it." No word count is sourced
   to a mark; chosen as a single-entry size in the same register as a short
   paragraph, not TANK's own 100-word tetra-entry — freely adjustable. */
const WRITE_CAP = 40;

const FRACTIONS = [
  { k:"dissolved",   was:"invisible, feeds life",     does:"goes out of sight without falling" },
  { k:"suspended",   was:"clouds, becomes ground",    does:"hangs, and does not reach the floor" },
  { k:"bedload",     was:"rocks, goes to the deep",   does:"sinks past the floor; the deep never renders" },
  { k:"contaminant", was:"named in the brief, given no behaviour there",
                     does:"films at the surface and stays — this behaviour is mine, not read" }
];

/* ═══ DIVERSITY — 2026-08-20, Kevin's own addition: "the 4th of ecological
   succession, and biodiversity as a side effect of balancing the three
   cycles in a level." Not a fourth act — a memory of variety in the two acts
   that already exist. `state.fraction` and `state.light` hold only the LATEST
   pick; picking `bedload` five times running was indistinguishable from
   picking it once, because the second pick simply overwrote the first. This
   is the gap closed here, same shape as `seamsTaken` already is: an
   append-only set, never a count shown to the player, used only to scale
   something visual later.

   MIGRATE — the same law `migrateRoot`/`migrateLight` already follow (law 20:
   no law becomes a lever to give Kevin less; law 23: never invent what a past
   hand meant). A state with no seen-sets yet did real picking before this
   code existed to remember it; seeding an EMPTY set for such a state would
   understate what already happened, so a state that already carries a
   fraction/light is seeded with exactly that one pick, not zero. A state that
   was never touched at all gets a true empty set — nothing invented. */
function migrateDiversity(state){
  if(!state) return state;
  if(!Array.isArray(state.fractionsSeen)){
    state.fractionsSeen = state.fraction ? [state.fraction] : [];
  }
  if(!Array.isArray(state.windowsSeen)){
    state.windowsSeen = (state.light && state.light!=="legacy") ? [state.light] : [];
  }
  return state;
}
function seeFraction(state, k){
  migrateDiversity(state);
  if(state.fractionsSeen.indexOf(k) < 0) state.fractionsSeen.push(k);
}
function seeWindow(state, axis){
  migrateDiversity(state);
  if(state.windowsSeen.indexOf(axis) < 0) state.windowsSeen.push(axis);
}
/* 0..1, never shown as a number. Denominators are real structural counts, not
   chosen thresholds: FRACTIONS.length (4, the whole vocabulary) and 2 (every
   seat's own window count, computed and constant per THE_GROWTH.md). */
function diversityStanding(state){
  if(!state) return 0;
  migrateDiversity(state);
  const fr = Math.min(1, state.fractionsSeen.length / FRACTIONS.length);
  const wn = Math.min(1, state.windowsSeen.length / 2);
  return (fr + wn) / 2;
}

/* ═══ AMBIENT — 2026-08-21, general diffuse light (THE_THREE_DYNAMICS.md §2):
   "an always-on, low-resolution ambient value per seat... not aimed, not
   chosen, just present, the way Minecraft's light level drives growth
   without anyone placing a torch." Read live off waterSeamsFor(seat) and
   whatever seam states already exist — DERIVED, NOT STORED, the same law
   windowCharge already follows for the window side of light. A seat with no
   rooted water touching it yet reads 0 because nothing is summed, never
   because a zero was written. */
function seatAmbient(seat, states){
  const seams = waterSeamsFor(seat);
  if(!seams.length) return 0;
  let sum = 0;
  seams.forEach(function(s){
    const st = (states || {})[s.id];
    if(st && isReturned(st)) sum += rootStanding(st);
  });
  return Math.min(1, sum / seams.length);
}

/* ═══ JUNCTION / THE WIRE — 2026-08-21, roots/wires (THE_THREE_DYNAMICS.md
   §3): "once two adjacent rooted levels share a seat, the seat itself
   becomes a junction — a real node with more than one wire arriving." No
   invented geometry: a junction is what happens when two already-built
   facts (isReturned, waterSeamsFor) co-occur, read fresh every time. */
function junctionSeams(seat, states){
  return waterSeamsFor(seat).filter(function(s){
    const st = (states || {})[s.id];
    return st && isReturned(st);
  });
}
function isJunction(seat, states){
  return junctionSeams(seat, states).length >= 2;
}
/* THE WIRE ITSELF — once a seam's own seat is a junction, a hand may trace
   this level's light toward one of the OTHER already-returned seams sharing
   that junction. What travels the wire (THE_THREE_DYNAMICS.md's open
   question — a circuit's gift, once that's built) is a separate mechanic;
   this is the tracing act alone. Append-only, same law fractionsSeen/
   windowsSeen already follow: a wire once traced is never un-traced by
   tracing a different one, so routedTo is a set, not a single slot. */
function migrateWires(state){
  if(state && !Array.isArray(state.routedTo)) state.routedTo = [];
  return state;
}
function routeWire(state, seamId){
  migrateWires(state);
  if(state.routedTo.indexOf(seamId) < 0) state.routedTo.push(seamId);
}

/* THE TWO WINDOWS. Every seat sits on exactly two squares — read live off
   solid.js's own facesOf(), never listed here, so a seat this file has never
   heard the name of still gets the right two. What distinguishes them is
   which of the solid's three hinge axes each is on (x/y/z; a seat's own pair
   is always two DIFFERENT letters — see solid.js's EMBED, one seat coord is
   always zero), not the seat, so this vocabulary is sized the way FRACTIONS
   is: three entries for a structural constant (the three square-axes,
   solid.js's own AXES.throughSquares), never one entry per seat. Text is
   drawn from KNOWLEDGE_light_in_games.md's own vocabulary — §3's carried
   signal, §4's near/far mirror spread ("distant mirrors make soft, wide
   spots; near mirrors make tight ones") — matched to FRACTIONS' was/does
   idiom rather than inventing a new one. */
const WINDOW_AXES = {
  x: { name:"aim",    was:"the beam sent straight, along the line it started on",
                       does:"a direct line — legible by its bearing, nothing to spread or lose" },
  y: { name:"focus",  was:"the beam pulled in, closed down where it lands",
                       does:"a small, sharp landing — near-mirror light, tight and easy to find" },
  z: { name:"spread", was:"the beam let open, softened at its edge",
                       does:"a wide, faint landing — far-mirror light, easy to lose" }
};

/* windowsFor(seat) — the seat's own two windows, found rather than kept. */
function windowsFor(seat){
  const G = (typeof window!=="undefined" && window.SOLID) || null;
  if(!G || !G.facesOf) return [];
  const sqs = G.facesOf(seat).squares || [];
  return sqs.map(function(q){ return { axis:q.axis, seats:q.seats }; });
}

/* MIGRATE — the schema step. Every stone/seam-state written before this
   session carries the old boolean `formed`, which recorded THAT a hand
   formed it and nothing about WHICH window — there was no window to record.
   Law 20 (no law becomes a lever to give Kevin less) and law 16 (records
   only get more) both rule out quietly un-growing anything that already
   counted as returned, and law 23 rules out inventing which window a past
   hand meant. So a true `formed` with no `light` becomes the sentinel
   "legacy" — real enough to keep isReturned() true where it already was,
   honest enough to say, in the UI, that no window was ever picked. */
function migrateLight(state){
  if(state && state.light===undefined) state.light = state.formed ? "legacy" : null;
  return state;
}

/* Deposit into a seam's two faces and mark it walked. Mutates and returns a
   ledger shaped {deposits, seamsTaken} — deliberately the SAME TWO FIELDS
   tank.html's own store already carries and round-trips, and nothing more.
   tank.html's save() writes only the keys it knows; a third field added here
   would be silently dropped the next time tank.html saves, which is the
   fragmentation this build is explicitly closing rather than reopening. */
function walk(ledger, seam){
  ledger.deposits = ledger.deposits || {};
  ledger.seamsTaken = ledger.seamsTaken || [];
  ledger.deposits[seam.tool]=(ledger.deposits[seam.tool]||0)+1;
  ledger.deposits[seam.window]=(ledger.deposits[seam.window]||0)+1;
  if(ledger.seamsTaken.indexOf(seam.id)<0) ledger.seamsTaken.push(seam.id);
  return ledger;
}

/* ═══ DOM builders — the markup tank.html proved, parameterized so a second
   seat does not mean a second copy of this ~30-line function. `seat` is the
   seat hosting the door (SEAT in tank.html; currentSeamSeat() in
   ascent.html) — its own two windows are read live via windowsFor(seat), so
   nothing here is a per-seat list that could go stale. ═══ */
function fractionControl(state, seat, onChange, chargeMap, neighborStates, seamId, keptTags, openWriteFn){
  migrateLight(state);
  migrateRoot(state);
  growRoot(state);
  migrateWeek(state);
  migrateDiversity(state);
  const el=document.createElement("div"); el.className="frac";
  /* THE EDGE'S OWN WRITE — 2026-08-21. Sits alongside the sort/aim below,
     never gating it — a hand may write before or after sorting; only the
     caller's own door-walk gate asks for both. Optional: a caller that
     doesn't pass keptTags/openWriteFn (tank.html, today) gets no write step
     here at all, exactly as chargeMap/neighborStates already degrade for it.
     openWriteFn(seamId, after) is the CALLER's own wrapper — it owns
     S.kept/S.keptTag, which seam.js never touches directly (this file
     assumes no DOM and no page-specific store shape, per its own header). */
  if(seamId && keptTags && openWriteFn){
    const already = hasWritten(seamId, keptTags);
    const wr=document.createElement("div"); wr.className="frac write"+(already?" done":"");
    if(already){
      wr.textContent="written";
      wr.title="this level's own entry is kept, whole, in the world";
    } else {
      const b=document.createElement("button");
      b.className="fr writebtn"; b.textContent="write";
      b.title="what you write here is kept, whole, tagged to this level — never read, never shown back by content";
      b.addEventListener("pointerdown", function(e){ e.stopPropagation(); });
      b.addEventListener("click", function(e){
        e.stopPropagation();
        openWriteFn(seamId, onChange);
      });
      wr.appendChild(b);
    }
    el.appendChild(wr);
  }
  FRACTIONS.forEach(function(fr){
    const b=document.createElement("button");
    b.className="fr "+fr.k+(state.fraction===fr.k?" on":"");
    b.textContent=fr.k; b.title=fr.was+" — "+fr.does;
    b.addEventListener("pointerdown", function(e){ e.stopPropagation(); });
    b.addEventListener("click", function(e){
      e.stopPropagation();
      state.fraction = (state.fraction===fr.k) ? null : fr.k;
      if(!state.fraction) state.light=null;
      else seeFraction(state, fr.k);   /* remembered even if unpicked later */
      onChange();
    });
    el.appendChild(b);
  });
  /* THE AIM — two windows, never a toggle. A pick of the already-armed
     window un-picks it, exactly as a second click on an "on" fraction takes
     it back to unsorted (the same mark/unmark law tank.html's seam strip
     already carries). Dim and inert until a fraction is chosen, same gate
     the old form button held. */
  windowsFor(seat).forEach(function(w){
    const ax = WINDOW_AXES[w.axis[0]] || { name:w.axis, was:"", does:"" };
    const other = w.seats.filter(function(s){ return s!==seat; });
    const b=document.createElement("button");
    b.className="fr win"+(state.light===w.axis?" on":"");
    b.textContent=ax.name;
    b.title=ax.was+" — "+ax.does+(other.length?" · shares this window with "+other.join(", "):"");
    /* WINDOW CHARGE, SHOWN — no number: a warm glow that deepens with this
       window's own accumulated charge (windowStanding, 0..1), the light
       counterpart to the root's own green depth-cue above. Independent of
       whether THIS seam picked this window — the charge belongs to the
       window, read by every seam that can reach it. */
    const wStand = chargeMap ? windowStanding(chargeMap, w.axis) : 0;
    if(wStand > 0){
      b.classList.add("charged");
      b.style.boxShadow = "0 0 "+(3+wStand*13).toFixed(0)+"px rgba(255,214,120,"+(0.12+wStand*0.5).toFixed(2)+")";
      b.title += " · this window carries a charge from other levels";
    }
    b.style.opacity = state.fraction ? "1" : ".4";
    b.addEventListener("pointerdown", function(e){ e.stopPropagation(); });
    b.addEventListener("click", function(e){
      e.stopPropagation();
      if(!state.fraction) return;
      state.light = (state.light===w.axis) ? null : w.axis;
      state.formed = !!state.light;   /* kept in sync for anything still reading it */
      if(state.light) seeWindow(state, state.light);   /* remembered even if unpicked later */
      /* THE TRUE MOMENT — a root is seeded HERE, the instant fraction+light
         both land, at 0 (a real seed, not migrateRoot's one-step floor for
         data that predates this code). Seeding it here rather than leaving
         it to the next generic growRoot() call matters: growRoot()/
         migrateRoot() cannot tell "just returned this click" from "returned
         long ago, never recorded" once both simply show rooted===undefined
         — so the click that actually makes isReturned() true is the one
         place that knows which of those two this is. */
      if(isReturned(state) && typeof state.rooted!=="number"){
        state.rooted=0; state.lastFed=seamToday(); state.daysGrown=1;
      }
      onChange();
    });
    el.appendChild(b);
  });
  if(state.light==="legacy"){
    const note=document.createElement("span");
    note.className="fr legacy"; note.textContent="formed, window not recorded";
    note.title="formed before this build could ask which window — already counted, nothing lost; pick a window above to name it";
    el.appendChild(note);
  }
  /* AMBIENT, SHOWN — no number: a soft wash across the whole control, present
     whether or not THIS seam is the one that rooted it — ambient belongs to
     the seat, not the pick. Optional: absent whenever a caller (tank.html)
     doesn't pass neighborStates, exactly as chargeMap already degrades. */
  if(neighborStates){
    const amb = seatAmbient(seat, neighborStates);
    if(amb > 0){
      el.classList.add("ambient");
      el.style.background = "radial-gradient(circle at 30% 20%, rgba(224,196,84,"
        + (0.04+amb*0.14).toFixed(3) + "), transparent 70%)";
    }
    /* THE WIRE, OFFERED — only once this seat is a real junction, and only
       toward seams OTHER than this one. Additive: a trace never replaces the
       fraction/aim choice above, and never closes off tracing a different
       wire later. */
    const junc = junctionSeams(seat, neighborStates).filter(function(j){ return j.id !== seamId; });
    if(junc.length){
      migrateWires(state);
      const wire=document.createElement("div"); wire.className="wire";
      const label=document.createElement("span"); label.className="wirelabel";
      label.textContent="this seat is a junction — trace toward";
      wire.appendChild(label);
      junc.forEach(function(j){
        const b=document.createElement("button");
        b.className="fr wirebtn"+(state.routedTo && state.routedTo.indexOf(j.id)>=0 ? " on" : "");
        b.textContent=j.to;
        b.title="route this level's light toward "+j.to+" — additive, never replaces a different wire already traced";
        b.addEventListener("pointerdown", function(e){ e.stopPropagation(); });
        b.addEventListener("click", function(e){
          e.stopPropagation();
          routeWire(state, j.id);
          onChange();
        });
        wire.appendChild(b);
      });
      el.appendChild(wire);
    }
  }
  return el;
}

/* the hold-to-open sill — tank.html's own physics, unchanged: REACH=900,
   gives back faster than it takes (2.2x), no bar, no percentage, no count —
   the sill's own depth is the readout. `onGive` runs once when it gives. */
function sillMechanic(sillEl, onGive){
  const REACH=900; let reach=0, onIt=false, iv=0, last=0;
  const paint=function(){ const k=Math.min(1,reach/REACH);
    sillEl.style.height=(22+k*16)+"px";
    sillEl.style.background="linear-gradient(to bottom,rgba(20,22,26,"+(0.14+k*0.44)+"),transparent)"; };
  const stop=function(){ clearInterval(iv); iv=0; };
  const step=function(){
    const now=performance.now(), dt=Math.min(120, now-last); last=now;
    reach += onIt ? dt : -dt*2.2;
    if(reach<=0){ reach=0; paint(); stop(); return; }
    if(reach>=REACH){ reach=0; onIt=false; paint(); stop(); onGive(); return; }
    paint();
  };
  const run=function(){ if(!iv){ last=performance.now(); iv=setInterval(step,30); } };
  const begin=function(){ onIt=true; run(); };
  const release=function(){ onIt=false; if(reach>0) run(); };
  sillEl.addEventListener("pointerdown", function(e){ e.preventDefault(); begin(); });
  addEventListener("pointerup", release);
  addEventListener("pointercancel", release);
  sillEl.addEventListener("pointerleave", release);
  return { begin:begin };
}

const NESI_SEAM = { waterKind, waterSeamsFor, seamsFor, waterMembers, waterComplete, waterStanding,
                     inhabited, seamComplete, isReturned,
                     FRACTIONS, WINDOW_AXES, windowsFor, migrateLight,
                     seamToday, migrateRoot, growRoot, rootStanding,
                     windowCharge, windowStanding,
                     migrateDiversity, seeFraction, seeWindow, diversityStanding,
                     WEEK_LEN, migrateWeek, weekStanding, weekComplete,
                     seatAmbient, junctionSeams, isJunction, migrateWires, routeWire,
                     circuitKeys, circuitComplete, completedCircuits, circuitWiring,
                     flowOf, headOf, powerOf,
                     tagWritten, migrateKeptTags, keptAtLevel, hasWritten, WRITE_CAP,
                     walk, fractionControl, sillMechanic };
if(typeof window!=="undefined") window.NESI_SEAM = NESI_SEAM;
if(typeof module!=="undefined") module.exports = NESI_SEAM;
