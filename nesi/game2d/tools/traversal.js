#!/usr/bin/env node
/*
 * THE TRAVERSAL ORGAN — what a writing has undergone, without what it says.
 *
 * Kevin's mark, 2026-08-17: "build the traversal organ." It is the organ for the
 * display law's fourth source, admitted the same evening, and for the object
 * `Traversal` he adopted at 09:15 that morning on F3 — which the fork's own text
 * recorded as "already on your record, held open," with none of it built.
 *
 * HIS STATEMENT OF WHAT IT IS FOR, and it is the specification:
 *
 *   "You are giving text position, trajectory, adjacency, recurrence,
 *    divergence, convergence, persistence, and return. None of those require a
 *    model to decide what the text means."
 *
 *   "The first is judgment. The second is topology.
 *      'This is a stronger formulation.'
 *      'This formulation survived five independent transformations and you
 *       carried it forward every time.'"
 *
 *   "NESI does not have to understand your writing in order to remember how
 *    deeply you have worked it."
 *
 * ── THE ONE STRUCTURAL REFUSAL, AND EVERYTHING ELSE FOLLOWS FROM IT ──────────
 *
 * THERE IS NO PARAMETER FOR A RETURN'S CONTENT. `cross()` takes object ids, a
 * gesture, and an opaque surface label. It cannot be handed a model's output,
 * because there is nowhere to put one. That is law 22's shape — a gate that
 * holds is one the machine cannot talk past, "a parameter that does not exist"
 * — and it is the same move as `own()` and `drawKept(i, x, y)`, which take an
 * index into the store and never a string, so machine wording cannot reach the
 * screen through them.
 *
 * The display law's own test is therefore satisfied by construction: strip every
 * model's output text out of the record and nothing changes, because none was
 * ever in it.
 *
 * ── WHAT AN OBJECT IS ────────────────────────────────────────────────────────
 *
 * A sealed reference: { store, i, sha }. An index into an append-only store, and
 * a digest. NEVER the text. The digest exists for exactly one question — is this
 * byte-identical to that — which is the only content question this organ is
 * allowed to ask, because it has one bit of answer and no reading in it. The
 * corpus already does this: `store_guard` fingerprints his writing before and
 * after every run.
 *
 * ── WHY SURFACES ARE OPAQUE ──────────────────────────────────────────────────
 *
 * His line: "Do not classify Claude as 'analytical,' Gemini as 'research'...
 * Those are brittle stories about machines. Instead record the actual gesture."
 *
 * So a surface is a LABEL THE HAND SUPPLIES and nothing else. This file never
 * compares a surface to a literal, never branches on its value, and holds no
 * table of them. `traversal_check` asserts that, so the day someone writes
 * `if (surface === "claude")` the suite refuses. A surface with properties is a
 * classifier, and it would be the fifth source wearing the fourth's coat.
 *
 * ── AND IT NEVER MAKES A CROSSING ────────────────────────────────────────────
 *
 * Law 3 stands untouched: no model call on the core loop, and none anywhere in
 * this file. The hand makes the crossing, out in the world, deliberately. This
 * organ WITNESSES it afterward. That distinction is the whole reason AI can be
 * present in NESI without being the invisible hand that decides what the writing
 * is — the model applies pressure, and the world records that pressure occurred.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const GAME = path.join(__dirname, "..");

/* ═══ THE SEVEN GESTURES ═════════════════════════════════════════════════════
   His own list, in his own first person, closed — the same convention as the
   twelve seats, where a gesture is what lets unrelated things land in the right
   place. There is no eighth and no "other": a crossing that is not one of these
   is not recordable, which is a container edge rather than a caution.

   `arity` is how many objects go IN. It is the only property a gesture has, and
   it is structural rather than semantic — nothing here knows what a gesture
   MEANS, only how many things it takes and whether anything comes out. */
const GESTURES = {
  branch: { says: "I branched this",                        arity: 1, produces: true  },
  expose: { says: "I exposed this to another rendering",     arity: 1, produces: true  },
  join:   { says: "I brought these two returns together",    arity: 2, produces: true  },
  reopen: { says: "I reopened this ancestor",                arity: 1, produces: true  },
  carry:  { says: "I carried this forward unchanged",        arity: 1, produces: true  },
  end:    { says: "I let this branch end",                   arity: 1, produces: false },
  hold:   { says: "I held this",                             arity: 1, produces: false }
};

const idOf = o => o.store + ":" + o.i;

/* ═══ RECORDING ══════════════════════════════════════════════════════════════
   Note the signature. There is no `output`, no `text`, no `result`, no
   `response`. A caller holding a model's return has nowhere to put it. */
function cross({ from, to, gesture, surface, at }) {
  const g = GESTURES[gesture];
  if (!g) throw new Error("no such gesture: " + gesture + " — the seven are closed");
  const froms = Array.isArray(from) ? from : [from];
  if (froms.length !== g.arity)
    throw new Error(gesture + " takes " + g.arity + " in, given " + froms.length);
  /* A PRODUCING GESTURE WITH NO `to` IS IN FLIGHT, and that is a lawful state
     rather than a missing field. His own account has three distinct fates for a
     branch — "that branch died", "suspend one branch", and one still running —
     and only the first two are acts of the hand. A branch that is simply still
     out has had nothing done to it.
     So: an `end` is recorded when the hand ends it, a `hold` when the hand holds
     it, and neither is inferred from silence. Nothing counts an open branch
     against anything, nothing asks after it, and law 13 covers it exactly —
     held is lawful, and so is still going. */
  if (!g.produces && to) throw new Error(gesture + " produces nothing, and an object was given");
  if (!surface) throw new Error("a crossing names the surface it crossed");
  return { from: froms, to: to || null, gesture, surface, at };
}

/* ═══ WHAT THE GEOMETRY SAYS ABOUT ONE OBJECT ════════════════════════════════
   Every reading below is a fact about the object's LIFE. Not one of them opens
   the text, and not one of them is a judgement. This is the whole of what the
   fourth source may drive.

   `unchanged` is the one that matters most and it is the one his own example
   turns on: "this fragment survived four transformations unchanged." It is
   computed from digests — identical or not — and carries no opinion about why. */
function readingOf(store, id) {
  const out  = store.crossings.filter(c => c.from.includes(id));
  const inn  = store.crossings.filter(c => c.to === id);
  const sha  = (store.objects[id] || {}).sha || null;

  /* an ancestor chain, walked backwards; used for return-to-own-ancestor */
  const ancestors = (function up(x, seen) {
    if (seen.has(x)) return seen;
    seen.add(x);
    store.crossings.filter(c => c.to === x).forEach(c => c.from.forEach(f => up(f, seen)));
    return seen;
  })(id, new Set());
  ancestors.delete(id);

  return {
    id,
    /* the shape of what left this object */
    thrown:   out.filter(c => GESTURES[c.gesture].produces && c.to).length,
    ended:    out.filter(c => c.gesture === "end").length,
    held:     out.filter(c => c.gesture === "hold").length,
    joined:   store.crossings.filter(c => c.gesture === "join" && c.from.includes(id)).length,
    /* the shape of what arrived */
    arrived:  inn.length,
    /* Survived a crossing without changing — digests only, and NOT counting a
       branch.
       ── THE SECOND FAULT THE FIRST REAL EVENT FOUND ────────────────────────
       `branch` makes a copy to send. The copy is byte-identical by definition,
       so every freshly-thrown branch read as `tempered` — "survived pressure
       unchanged" — before it had been through anything at all. The word was
       true of the digests and false of the world, which is the exact failure
       this organ exists to refuse one level down.
       A branch is not a passage. Pressure is `expose`, `carry`, `reopen` and
       `join`; those are the crossings a thing can come back from. */
    unchanged: inn.filter(c => {
      if (c.gesture === "branch") return false;
      const src = c.from.map(f => (store.objects[f] || {}).sha).filter(Boolean);
      return sha && src.length === 1 && src[0] === sha;
    }).length,
    /* how many surfaces this object's line has been through. The label is
       counted, never read: `size` of a set, and no member of it is inspected. */
    surfaces: new Set(out.concat(inn).map(c => c.surface)).size,
    /* did it come back to something upstream of itself */
    returnedToAncestor: out.some(c => c.to && ancestors.has(c.to)),
    /* how deep the line runs behind it */
    depth: ancestors.size,
    /* Branches still out: a producing crossing that has not come back AND has
       not since been closed by the hand.
       ── FOUND BY USING IT, 2026-08-17 ──────────────────────────────────────
       The first real event this organ witnessed was three branches being
       stopped, and it reported all three as `pruned` AND `waiting` — ended, and
       still out. Both cannot be true. The fault was that an `end` recorded on an
       object did not retire the open crossing it closes, so an exposure with no
       `to` stayed in flight forever.
       `end` and `hold` are acts on the object, and an act closes an open branch.
       Subtracting them is what makes "still out" mean nothing-has-been-done
       rather than nothing-came-back. T14 refuses the contradiction directly, so
       this cannot silently return. */
    inflight: Math.max(0,
      out.filter(c => GESTURES[c.gesture].produces && !c.to).length
      - out.filter(c => c.gesture === "end" || c.gesture === "hold").length),
    /* still open — produced nothing, was not ended, was not held */
    open: out.length === 0
  };
}

/* ═══ THE DISPLAY STATE — the fourth source, and only the fourth ═════════════
   Law 2 stands: no number reaches the player. So a reading becomes FORM.
   Everything below is a shape word or a boolean; nothing here is a count, and
   nothing here is a comparison between two objects.

   The fourth source's own lint, enforced by having nothing else available: this
   function receives a reading and never an object's text, so there is no path by
   which what a writing SAYS could reach a display state. */
function formOf(r) {
  return {
    /* how many arms stand off it, as form: none · few · many */
    arms:      r.thrown === 0 ? "none" : r.thrown <= 2 ? "few" : "many",
    /* has it been through pressure and come back the same */
    tempered:  r.unchanged > 0,
    /* has anything of it stopped */
    pruned:    r.ended > 0,
    /* is it waiting */
    resting:   r.held > 0,
    /* has its line curved back on itself */
    circled:   r.returnedToAncestor,
    /* how far back the line runs, as form */
    lineage:   r.depth === 0 ? "origin" : r.depth <= 2 ? "shallow" : "deep",
    /* has it been carried across difference */
    travelled: r.surfaces > 1,
    /* something of it is still out, and nothing is owed about it */
    waiting:   r.inflight > 0,
    /* nothing has left it yet */
    open:      r.open
  };
}


/* ═══ THE SITING — TRAVERSAL IS ON THE RADII ═════════════════════════════════
   Kevin's mark, 2026-08-17: "site traversal on the radii."

   IT IS THE ONLY PLACE IN THE CONTAINER WHERE THIS OBJECT FITS, and solid.js
   had already derived why on 2026-08-16 without knowing what would land there.
   Its three properties of a radius, verbatim, each one a requirement traversal
   independently stated:

     1 · "A RADIUS IS THE ONLY QUANTITY THAT READS A SINGLE SEAT." Everything
         else is shared — a member joins two, a triangle three, a square four,
         a circuit six, the centre all twelve. A traversal is one writing's own
         history and is shared with nothing.

     2 · "IT IS FREE, AND THE MEMBERS ARE NOT." The 24 members are struts and
         cannot change length. Radii change whenever the container moves. So a
         writing can be worked arbitrarily deep WITHOUT THE WORLD'S PERIMETER
         CHANGING BY ANYTHING — which is his sentence exactly: "the word can
         remain still while the world develops around it."

     3 · "NONE IS A WALK: member:null, permanently." Nothing travels a radius.
         It can be measured and it cannot be gone along. That is the whole of
         what he asked for — "a semantic interior may remain inaccessible while
         relational geometry accumulates externally."

   AND IT COMPOSES WITH F10 RATHER THAN COLLIDING WITH IT. He ruled that morning
   that a root belongs to a circuit PAIR — the six diameters. A diameter IS a
   radius and its antipode's radius, collinear through the centre; solid.js:415
   calls each one "one pair reading the game from opposite sides." Verified
   against the module: all six diameters are exactly an antipodal pair, and no
   radius is a member. SO A ROOT IS TWO TRAVERSALS IN OPPOSITION. Neither siting
   moves the other.

   WHAT A RADIUS READS, already assigned on his 2026-08-16 mark "now assign
   function to the 12 radii": DISTANCE FROM THE GAME. Equilibrium is the state
   where no seat is nearer than any other, and every radius is exactly one edge.

   SO: an untraversed world sits at equilibrium, and TRAVERSAL IS WHAT BREAKS IT,
   one seat at a time.

   ── THE ONE READING IN HERE, AND IT IS STRIKEABLE ────────────────────────────
   WHAT displaces a seat is `depth` — how far the line runs behind an object.
   Sourced to his own closing line: "NESI does not have to understand your
   writing in order to remember how deeply you have worked it." One rule, one
   line, and striking it costs only this function.

   ── WHAT IS NOT DECIDED HERE, AND IS NOT DEFAULTED ───────────────────────────
   WHICH WAY a worked seat moves — nearer the game, or standing further off.
   The geometry permits both and picks neither. So this returns a MAGNITUDE AND
   NO SIGN: `worked`, and whether it is displaced at all. Nothing downstream can
   read a direction out of it, because none is computed. That fork is Kevin's. */
function radiusOf(store, seat) {
  const ids = Object.keys(store.objects).filter(id => (store.objects[id] || {}).seat === seat);
  const worked = ids.reduce((d, id) => Math.max(d, readingOf(store, id).depth), 0);
  return {
    seat,
    /* IT IS NOT A WALK AND NEVER BECOMES ONE — mirroring solid.js:422. The
       field is present and permanently null so that any caller reaching for a
       route through a traversal gets nothing rather than a path. */
    member: null,
    /* 1 exactly when nothing has been worked at this seat */
    equilibrium: worked === 0,
    worked
  };
}

/* Law 2 — the reading counts; the form does not. */
function radiusFormOf(r) {
  return {
    seat: r.seat,
    standing: r.equilibrium ? "at equilibrium" : r.worked <= 2 ? "worked" : "deeply worked",
    /* no direction: the sign is his fork and is not computed anywhere */
    displaced: !r.equilibrium
  };
}

/* ═══ THE STORE ══════════════════════════════════════════════════════════════ */
function load(file) {
  const p = file || path.join(GAME, "TRAVERSALS.jsonl");
  const rows = fs.readFileSync(p, "utf8").split("\n")
    .map(l => l.trim()).filter(l => l && !l.startsWith("//"))
    .map((l, i) => { try { return JSON.parse(l); }
                     catch (e) { throw new Error("TRAVERSALS.jsonl line " + (i + 1) + ": " + e.message); } });

  const objects = {}, crossings = [];
  for (const r of rows) {
    if (r.object) objects[idOf(r.object)] = r.object;
    else if (r.crossing) crossings.push(cross(r.crossing));
    else throw new Error("a row is neither an object nor a crossing: " + JSON.stringify(r).slice(0, 80));
  }

  /* ── A RETURN SUPERSEDES ITS OWN EXPOSURE ────────────────────────────────
     Found the first time a branch actually came back, 2026-08-17.

     The file is append-only, which is right — it is the same discipline as the
     append-only log at TANK, where the refusal to implement update IS the organ.
     But an exposure is recorded WITHOUT a `to` while it is still out, and there
     was no way to say it had come back: appending the completed crossing left
     the open one beside it, so an object would read `waiting` forever, next to
     the very return that ended the wait.

     So the rule is last-write-wins ON ONE EDGE, and an edge is (from, gesture,
     surface). A later crossing carrying a `to` supersedes an earlier one on the
     same edge that carried none. NOTHING IS DELETED and nothing is rewritten —
     both rows stand in the file, and this is a reading of them, which is the
     corpus's own convention: supersession is a mark on top, never an erasure.

     It only ever closes an open crossing. A completed crossing is never
     superseded by anything, so no return can be quietly replaced by a later
     one. */
  const edge = c => c.from.join("+") + "|" + c.gesture + "|" + c.surface;
  const closed = new Set(crossings.filter(c => c.to).map(edge));
  const live = crossings.filter(c => c.to || !closed.has(edge(c)));

  return { objects, crossings: live };
}

module.exports = { GESTURES, cross, load, readingOf, formOf, radiusOf, radiusFormOf, idOf };
