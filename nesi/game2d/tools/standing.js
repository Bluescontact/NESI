#!/usr/bin/env node
/*
 * THE STANDING SPINE — what kind of standing a claim has, and what keeps it
 * standing.
 *
 * Kevin's mark, 2026-08-17: "build the truth-bearing spine first, not TANK."
 * Ruling the collision between the two documents he sent the same hour — one
 * said build TANK, then the quarry, then this; the other said "the first thing
 * I would build toward is therefore not TANK, and not even the quarry. It is
 * the smallest possible truth-bearing spine." He ruled the second.
 *
 * HIS OWN STATEMENT OF THE PROBLEM, and it is the whole specification:
 *
 *   "A click says a thing binds. solid.js says a thing is geometrically true.
 *    A scan says a thing presently exists. A falsifier says a proposition
 *    survived a test. A hardened convention says the system behaves as though
 *    something binds. Those are not five ways of saying true. They are five
 *    different relationships between NESI and reality."
 *
 *   "A proposition with a provenance tells you where it came from. A
 *    proposition with a support set tells you why it remains warranted. Those
 *    are completely different things."
 *
 * ── WHAT THIS IS NOT ─────────────────────────────────────────────────────────
 *
 * NOT A TRUTH ORACLE. Nothing here ever returns FALSE, and nothing here ever
 * decides whether a claim is right. It answers one narrower question: does the
 * support this claim was admitted on still resolve? When it does not, the
 * verdict is UNSUPPORTED, which in his words is "something beneath me changed;
 * I no longer know whether I stand." That is the useful ignorance. A classifier
 * deciding the answer would be the exact organ law 5 refuses.
 *
 * NOT AN ONTOLOGY. It is a constraint on ontology. It adds no new categories to
 * the world; it refuses to let the five existing relationships collapse into one
 * generic "provenance" field. There is deliberately NO fallback kind — a claim
 * with no kind cannot be admitted, and a claim whose supports do not match its
 * kind is MISFILED, which is a finding and not an error.
 *
 * NOT A DUTY. Law 21, the priced act: no gate, no organ, no check bolted onto
 * an act that already happens. Sessions already make claims in documents and on
 * surfaces. This attaches a small visible token to that act — a kind and a
 * support set — so the cheapness of an unsupported claim stops being silent.
 *
 * ── WHY THE SUPPORT MUST BE EVALUABLE AND NOT WRITTEN ────────────────────────
 *
 * A support set written in prose is a second provenance field with more words.
 * Law 22: a gate that holds is one the machine cannot talk past — an opened
 * file, a read line, a parameter that does not exist. So every support here is
 * a REFERENCE THAT RESOLVES OR FAILS TO: a predicate re-run against solid.js, a
 * line that is present in a file or is not, a mark in MARKS_LOG.jsonl, another
 * claim. Re-evaluation is the whole mechanism. Nothing is cached, nothing is
 * stamped, and there is no "verified: true" anywhere in this repo to go stale.
 *
 * THE COST, NAMED: `solid` supports carry a JavaScript expression evaluated
 * against a frozen SOLID binding. That is eval, in a build-time instrument that
 * reads files in this repository and never runs on a player path. It is here
 * because the alternative — a fixed menu of named predicates — makes a support
 * describe a computation instead of BEING one, and the property this file
 * exists for is that a support re-runs itself. The expression sees SOLID and
 * nothing else.
 *
 *   node tools/standing_check.js        — the instrument that reads this
 */
"use strict";
const fs = require("fs");
const path = require("path");

const GAME   = path.join(__dirname, "..");
const CORPUS = path.join(GAME, "..", "..");
const at = p => path.join(CORPUS, p);

/* ═══ THE KINDS ══════════════════════════════════════════════════════════════
   His list, with one position taken and named as a position.

   DERIVED vs INFERRED — he wrote "perhaps DERIVED if derivation remains useful
   as something distinct from inference." IT IS, and the corpus has already paid
   to learn the difference. THE_SOLID.md §5 graded a document that reached past
   its own computation into a semantic tie-break: its computed claims were 4 for
   4 and its reasoned-from-meaning claims were 0 for 4. That is the line.

     DERIVED  — mechanical, and re-runnable from its supports by anyone
     INFERRED — a reading, and not re-runnable by anyone including its author

   So the discriminator is not confidence and not rigour. It is whether a second
   hand can run it and get the same thing. THIS IS A PROPOSAL, and it is the one
   judgement call in this file; strike it and the two collapse back into one.

   `wants` is the constraint on ontology. A claim must carry at least one
   support of a kind that could actually establish it. A MEASURED claim standing
   only on a mark is a MARKED claim in a costume, and saying so is this file's
   sharpest act. */
const KINDS = {
  MARKED: {
    is: "his click, or his verbatim words, admitted it",
    wants: ["mark", "line"],
    note: "the support is the mark itself. A mark that was later displaced leaves a line that no longer reads as it did, and the support stops resolving — which is how supersession propagates here rather than by anyone remembering to propagate it."
  },
  MEASURED: {
    is: "a computation over a live authority returns it",
    wants: ["solid"],
    note: "the strongest kind, because it re-evaluates itself. If the authority changes, this changes or breaks in the same run."
  },
  OBSERVED: {
    is: "a hand walked it and an eye saw it on a running surface",
    wants: ["walked"],
    note: "cannot re-evaluate itself and never claims to. An observation is true of a moment; `walked` records which moment. Law 5 — read the pixels, not the plan — produces this kind and only this kind."
  },
  HARDENED: {
    is: "the system behaves as though it binds, ratified or not",
    wants: ["line"],
    note: "his sharpest one. It lets a constraint be EFFECTIVE and UNRATIFIED at the same time, which a single status field cannot express — the exact shape he named for the freeze."
  },
  DERIVED: {
    is: "it follows mechanically from its supports, and a second hand can re-run it",
    wants: ["claim", "solid"],
    needs: "rule",
    note: "requires a `rule` naming the mechanical step. Without the step written down it is INFERRED wearing a better word."
  },
  INFERRED: {
    is: "a session read it from other claims, and the reading is not re-runnable",
    wants: ["claim"],
    note: "lawful, and never disguised. Breaks when anything it leans on breaks — which is the only guarantee this kind carries and it is worth having."
  }
};

/* ═══ THE RESOLVERS ══════════════════════════════════════════════════════════
   Each returns {ok, saw} or throws. A throw is UNKNOWN, never a break: an
   unreadable file means the spine could not look, which is a different fact
   from the support being gone, and folding them together would report a broken
   claim every time a path was mistyped. */
const RESOLVERS = {
  /* a predicate re-run against the live solid */
  solid(s) {
    const SOLID = require(path.join(GAME, "solid.js"));
    const S = SOLID.SOLID || SOLID;
    let got;
    try { got = new Function("S", "return (" + s.expr + ");")(S); }
    catch (e) { throw new Error("expression did not run: " + e.message); }
    const want = s.expect;
    const same = JSON.stringify(got) === JSON.stringify(want);
    return { ok: same, saw: JSON.stringify(got) };
  },

  /* a file holds a line matching this pattern */
  line(s) {
    const t = fs.readFileSync(at(s.file), "utf8");
    const re = new RegExp(s.match, "m");
    const hit = t.match(re);
    return { ok: !!hit, saw: hit ? hit[0].slice(0, 90) : "no line matches" };
  },

  /* MARKS_LOG.jsonl holds a mark matching this pattern */
  mark(s) {
    const t = fs.readFileSync(at(s.file || "MARKS_LOG.jsonl"), "utf8");
    const re = new RegExp(s.match);
    const hit = t.split("\n").filter(l => re.test(l));
    return { ok: hit.length > 0, saw: hit.length ? hit[0].slice(0, 90) : "no mark matches" };
  },

  /* a file is on disk */
  file(s) {
    return { ok: fs.existsSync(at(s.file)), saw: s.file };
  },

  /* another claim stands. Resolved by the caller, which holds the whole set. */
  claim(s, ctx) {
    const v = ctx.verdictOf(s.id);
    return { ok: v === "stands", saw: s.id + " → " + v };
  },

  /* a walk. It does not resolve to true or false — it resolves to WHEN, and an
     observation whose subject has changed since is the reader's to re-walk.
     This is the one resolver that cannot fail, and that is honest rather than
     lax: an observation is a record of a moment and the moment happened. */
  walked(s) {
    return { ok: true, saw: s.what + " · " + s.when };
  }
};

/* ═══ EVALUATION ═════════════════════════════════════════════════════════════
   Four verdicts, and the fourth is the one worth building this for.

     stands       every support resolved
     unsupported  a support that used to resolve does not — his "I no longer
                  know whether I stand". NOT false. Nothing is rewritten and
                  nothing is invalidated; the break is exposed and left.
     unknown      a support could not be evaluated at all
     misfiled     the claim's supports cannot establish a claim of its kind
*/
function evaluateAll(claims) {
  const byId = new Map(claims.map(c => [c.id, c]));
  const out = new Map();
  const inflight = new Set();

  function verdictOf(id) {
    if (out.has(id)) return out.get(id).verdict;
    if (!byId.has(id)) return "unknown";
    if (inflight.has(id)) return "unknown";      /* a support cycle is unknown, never a pass */
    return evaluate(byId.get(id)).verdict;
  }

  function evaluate(c) {
    if (out.has(c.id)) return out.get(c.id);
    inflight.add(c.id);

    const K = KINDS[c.kind];
    const r = { id: c.id, kind: c.kind, says: c.says, verdict: "stands", broken: [], unknown: [], saw: [] };

    if (!K) {
      r.verdict = "misfiled";
      r.broken.push("kind '" + c.kind + "' is not one of the six, and there is no generic kind");
      inflight.delete(c.id); out.set(c.id, r); return r;
    }

    const supports = c.support || [];
    const kinds = supports.map(s => s.of);

    /* the constraint on ontology, checked before anything is resolved */
    if (!supports.length) {
      r.verdict = "misfiled";
      r.broken.push("no support set — a claim with a provenance and no support is the thing this file exists to refuse");
    } else if (!K.wants.some(w => kinds.includes(w))) {
      r.verdict = "misfiled";
      r.broken.push(c.kind + " wants a support of kind " + K.wants.join(" or ") +
                    "; it carries " + kinds.join(", ") + " — this is a " +
                    (kinds.includes("mark") ? "MARKED" : kinds[0].toUpperCase()) + " claim in a costume");
    } else if (K.needs && !c[K.needs]) {
      r.verdict = "misfiled";
      r.broken.push(c.kind + " requires a `" + K.needs + "` naming the mechanical step");
    }

    if (r.verdict === "misfiled") { inflight.delete(c.id); out.set(c.id, r); return r; }

    for (const s of supports) {
      const fn = RESOLVERS[s.of];
      if (!fn) { r.unknown.push(s.of + ": no resolver"); continue; }
      let res;
      try { res = fn(s, { verdictOf }); }
      catch (e) { r.unknown.push(describe(s) + " — could not look: " + e.message); continue; }
      r.saw.push(describe(s) + " → " + res.saw);
      if (!res.ok) r.broken.push(describe(s) + " — " + res.saw);
    }

    r.verdict = r.broken.length ? "unsupported" : (r.unknown.length ? "unknown" : "stands");
    inflight.delete(c.id); out.set(c.id, r);
    return r;
  }

  claims.forEach(evaluate);
  return claims.map(c => out.get(c.id));
}

const describe = s =>
  s.of === "solid"  ? "solid: " + s.expr :
  s.of === "line"   ? "line: " + s.file :
  s.of === "mark"   ? "mark: /" + s.match + "/" :
  s.of === "file"   ? "file: " + s.file :
  s.of === "claim"  ? "claim: " + s.id :
  s.of === "walked" ? "walked: " + s.what : s.of;

function loadClaims(file) {
  const p = file || path.join(GAME, "CLAIMS.jsonl");
  return fs.readFileSync(p, "utf8").split("\n")
    .map(l => l.trim())
    .filter(l => l && !l.startsWith("//"))
    .map((l, i) => {
      try { return JSON.parse(l); }
      catch (e) { throw new Error("CLAIMS.jsonl line " + (i + 1) + " is not JSON: " + e.message); }
    });
}

module.exports = { KINDS, RESOLVERS, evaluateAll, loadClaims, describe };
