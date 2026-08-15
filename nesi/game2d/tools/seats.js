#!/usr/bin/env node
/* SEATS — the twelve, read off the build instead of written out.
 *
 * WHY: tools/assertion_audit.py gated on 27 rules and passed 27/27, but its
 * LIVE world was a hand-written literal — twelve seats built by full_seat(),
 * every field filled in by me. It proved the RULES were well-formed. It never
 * read ascent.html. A green row about a model is not a fact about the game.
 *
 * So this reads ascent.html's SET table and emits what is actually there. It
 * derives what the code can be asked, and it REFUSES TO DERIVE what it cannot:
 * a field that is not mechanically visible is emitted as null with a reason,
 * never guessed. A deriver that fills its own gaps is the hand-written literal
 * again with more steps.
 *
 *   node tools/seats.js            — the table, and what is not derivable
 *   node tools/seats.js --json     — the same as JSON, for assertion_audit.py
 */
"use strict";
const fs = require("fs"), path = require("path");
const SRC = fs.readFileSync(path.join(__dirname, "..", "ascent.html"), "utf8");

/* THE TWELVE SEATS OF THE SOLID, and the SET key each one is built under.
   SET holds twenty entries — the twelve seats plus the eight loose mechanisms.
   The mapping is named here because `winter` and OVERWINTERING are the same
   seat under two names, and a lookup that missed it would report eleven. */
const SEATS = [
  ["TANK","tank"], ["DAM","dam"], ["FILTER","filter"], ["STATIONS","stations"],
  ["GROUND","ground"], ["DEEP","deep"], ["LENS","lens"], ["HELIOSTAT","heliostat"],
  ["SEATING","seating"], ["OVERWINTERING","winter"], ["GARDEN","garden"], ["CAST","cast"],
];

/* Each SET entry runs from `key:{ g:"..."` to the start of the next top-level
   entry. Brace-counting would be exact; the delimiter is unambiguous here
   because every entry begins at column 0, so the simpler read is the honest
   one — and it is checked: a body that fails to contain its own key is a
   refusal, not a silent short read. */
const starts = [...SRC.matchAll(/^([a-z_]+):\{ g:"(reach|hold|draw|wait)"/gm)]
  .map(m => ({ key: m[1], g: m[2], at: m.index }));

function body(key) {
  const i = starts.findIndex(s => s.key === key);
  if (i < 0) return null;
  const end = i + 1 < starts.length ? starts[i + 1].at : SRC.length;
  return SRC.slice(starts[i].at, end);
}

/* ── WHAT THE CODE CAN BE ASKED ────────────────────────────────────────────
   Six of the seven fields have a mechanical signature. Each derivation below
   names the signature it reads, so a wrong answer is traceable to a pattern
   rather than to a judgement nobody can see. */
const DERIVE = {
  gesture: b => (b.match(/^[a-z_]+:\{ g:"(\w+)"/) || [])[1] || null,

  /* MATERIAL IN — what the seat opens on. W_() is the one water; S.<field> is
     what an earlier seat left. A seat reading neither opens on nothing. */
  material_in: b => {
    const src = [];
    if (/W_\(\)/.test(b)) src.push("the one water");
    const left = [...new Set([...b.matchAll(/S\.(\w+)/g)].map(m => m[1]))]
      .filter(k => !/^(done|faces|at|arrived|off|shop)$/.test(k));
    if (left.length) src.push("what earlier seats left: " + left.slice(0, 4).join(", "));
    return src.length ? src.join(" · ") : null;
  },

  /* THE WORK SURFACE — a seat with no draw() renders nothing and cannot be
     worked. This is the field most likely to be claimed and absent. */
  surface: b => /\bdraw\s*\(\s*\)\s*\{|draw\(dt\)\s*\{|draw\s*\(\s*dt\s*\)/.test(b)
    ? "renders its own face" : null,

  /* THREE OUTPUTS — send to a spire, drop to the lake, set it down.
     READ EXACTLY, not by keyword. The three outputs are one construct in the
     build: bays() returns the three boxes, and S.routed counts what went to
     each. A seat offers them if it calls bays(); it takes one if it writes
     S.routed.<k>. The first pass here matched "lake" and "set" as loose words
     and reported two outputs at seats that offer none — a deriver reading
     prose rather than mechanism, which is the failure it exists to catch. */
  outputs: b => {
    const o = [];
    if (/bays\(\)/.test(b)) o.push("offers the three bays");
    for (const k of ["spire", "lake", "set"])
      if (new RegExp("routed\\." + k).test(b) || new RegExp('routed\\["' + k + '"\\]').test(b))
        o.push("routes to the " + k);
    return o;
  },

  /* WHAT PERSISTS — a seat that never saves leaves the world as it found it. */
  persists: b => /save\(\)/.test(b)
    ? ((b.match(/w\.(\w+)\s*[+\-]?=/) || [])[1]
        ? "the water's " + (b.match(/w\.(\w+)\s*[+\-]?=/) || [])[1] + ", committed"
        : "committed to the store")
    : null,

  /* THE HELD FORM — something on screen before the act is taken: a preview, a
     hung arrival, a line under the hand. Held is lawful (law 7), so the form
     that SHOWS held is the presence the law protects. */
  held: b => {
    /* READ EXACTLY. The first pass included `_h` — which is the hold verb's own
       accumulator, present on every seat that holds. That is a timer, not a
       form on screen. A held form is something VISIBLE before the act is taken:
       a hung arrival, a preview, a ghost, a line under the hand. Held is lawful
       (law 7), so the form that SHOWS held is the presence the law protects,
       and a timer is not it. */
    if (/L\.held\b/.test(b)) return "hung, waiting for a hand";
    if (/preview|ghost/.test(b)) return "previewed before it is taken";
    if (/L\.aim\b|L\.hover\b/.test(b)) return "under the hand, not yet taken";
    return null;
  },
};

/* ── AND THE ONE IT CANNOT PARSE, SO THE BUILD DECLARES IT ─────────────────
   THE COST has no mechanical signature: a seat that spends the last of the
   water and one that spends none read alike. The first pass emitted it null
   with that reason, and the audit then refused on F6 forever — a red line that
   is red by design, which is the thing this suite just finished removing.

   So each of the twelve DECLARES it, next to its gesture, the same move as
   `keeps:` on a boundary. Declared is not derived and the difference matters:
   the parser confirms a cost is stated, not that the statement is true. What it
   CAN hold is that none is missing and none says "none" — a seat that spends
   nothing has to say so in words a hand can price, not by leaving the field
   blank. This is emitted as `declared: true` so a reader is never told a
   declaration was measured. */
DERIVE.cost = b => {
  const m = b.match(/^[a-z_]+:\{ g:"\w+", cost:"([^"]*)"/);
  return m && m[1] ? m[1] : null;
};
const DECLARED = ["cost"];
const NOT_DERIVABLE = {};

const out = {}, gaps = [];
for (const [name, key] of SEATS) {
  const b = body(key);
  if (!b) { gaps.push(name + " — no SET entry named '" + key + "'"); continue; }
  if (!b.startsWith(key + ":{")) { gaps.push(name + " — body did not begin at its own key"); continue; }
  const s = { name, key };
  for (const [f, fn] of Object.entries(DERIVE)) s[f] = fn(b);
  for (const f of Object.keys(NOT_DERIVABLE)) s[f] = null;
  s.declared = DECLARED.slice();
  s.named_by_gesture = !!s.gesture;
  s.material_from_prior = !!s.material_in;
  out[name] = s;
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ seats: out, not_derivable: NOT_DERIVABLE,
                               declared: DECLARED, gaps }, null, 1));
  process.exit(gaps.length ? 1 : 0);
}

const F = ["gesture", "material_in", "surface", "outputs", "persists", "cost", "held"];
console.log("\nTHE TWELVE, read off ascent.html — " + Object.keys(out).length + " of 12 found\n");
const miss = {};
for (const name of Object.keys(out)) {
  const s = out[name];
  const marks = F.map(f => {
    const v = s[f];
    const has = Array.isArray(v) ? v.length === 3 : !!v;
    if (!has) (miss[f] = miss[f] || []).push(name);
    return (has ? "●" : "·");
  }).join(" ");
  console.log("  " + name.padEnd(15) + marks + "   " + (s.gesture || "?").padEnd(6) +
              (Array.isArray(s.outputs) ? s.outputs.length + " output(s)" : ""));
}
console.log("\n  " + " ".repeat(15) + F.map(f => f[0]).join(" ") +
            "   g=gesture m=material s=surface o=outputs(3) p=persists c=cost h=held\n");

for (const f of F) {
  const dec = DECLARED.includes(f) ? " (declared by the build, not measured)" : "";
  if (!miss[f]) { console.log("  ● " + f.padEnd(13) + "present on all twelve" + dec); continue; }
  const why = NOT_DERIVABLE[f];
  console.log("  " + (why ? "—" : "·") + " " + f.padEnd(13) +
    (why ? "NOT DERIVABLE — " + why : "absent on " + miss[f].length + ": " + miss[f].join(", ")));
}
if (gaps.length) { console.log("\n  gaps: " + gaps.join(" · ")); process.exit(1); }
console.log("");
