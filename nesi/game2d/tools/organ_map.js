#!/usr/bin/env node
/* ═══ THE ORGAN MAP ════════════════════════════════════════════════════════════
 * Built 2026-08-16 on Kevin's correction: "I want to extract from projects, and
 * use code bits, rather than importing whole projects. I'm searching for patterns,
 * and mechanism, and the organs that populate the VE."
 *
 * REPLACES tools/import_map.js and IMPORTS.json, written earlier the same session
 * at the wrong grain — whole projects sited as bodies. Those two were drafts of
 * this hour, never committed and never ruled on, so they are replaced rather than
 * layered. Nothing that had standing was superseded.
 *
 * ── THE UNIT IS THE MECHANISM, NEVER THE PROJECT ──────────────────────────────
 * A sighting names where an organ was seen in the wild. It is EVIDENCE THAT THE
 * PATTERN IS REAL, not a dependency and not a thing to be installed. Nothing here
 * fetches, vendors or installs; this file reads one JSON and prints.
 *
 * ── THE RECURRENCE TEST, which is the whole instrument ────────────────────────
 * One project doing a clever thing is a trick. The same mechanism in storage, in
 * graphics and in biology is an ORGAN. So: three or more sightings in three or
 * more UNRELATED DOMAINS, or it is a candidate and says so. The divergence is not
 * a nice property of the list — it is the evidence, and it is counted.
 *
 * ── LICENCE, AT THIS GRAIN ────────────────────────────────────────────────────
 * A mechanism is not copyrightable; its expression is. form:mechanism means the
 * organ is written from the pattern and there is NO LICENCE EVENT. form:verbatim
 * means source text is copied, and that is flagged as the licence event it is.
 * This is why the earlier pass's licence gate mostly dissolves at organ scale.
 *
 * ── WHAT THE GEOMETRY RULES ───────────────────────────────────────────────────
 *   1 · Seats, members, antipodes and circuits come from solid.js. Never retyped.
 *   2 · A declared member must be a real member. A member to the seat's own
 *       antipode is an edge the solid does not contain — those two organs cannot
 *       be wired directly, and that is caught by geometry alone.
 *   3 · AN ORGAN AT TWO SEATS IS A SIGNAL. If the two seats are members, the
 *       organ is the transit and the geometry agrees. If they are not, either the
 *       siting is wrong or the organ is two organs wearing one name.
 *   4 · The laws refuse, per path. The set-down is a hard gate at STATIONS alone
 *       (Kevin's ruling 2026-08-15 — the third output is the stations' work).
 *
 *   node tools/organ_map.js              the map
 *   node tools/organ_map.js --thin       only organs failing the recurrence test
 *   node tools/organ_map.js --seat CAST  one seat
 *   node tools/organ_map.js --json
 */
"use strict";
const fs = require("fs"), path = require("path");

let SOLID;
try { SOLID = require(path.join(__dirname, "..", "solid.js")); }
catch { console.error("organ_map: cannot load solid.js — refusing to name the seats from memory."); process.exit(1); }
const { NAMES, ADJ, circuitsOf, antipodeOf, isMember, distance, falls } = SOLID;

let M;
try { M = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "ORGANS.json"), "utf8")); }
catch (e) { console.error("organ_map: cannot read ORGANS.json — " + e.message); process.exit(1); }

const missing = NAMES.filter(n => !M.gestures || !M.gestures[n]);
if (missing.length) { console.error("organ_map: no gesture written for " + missing.join(", ")); process.exit(1); }

const MIN_SIGHT = 3, MIN_DOMAIN = 3;

const LAWS = [
  { flag: "model",        n: 3,  say: "a model call on the core loop",        paths: ["player"] },
  { flag: "network",      n: 11, say: "it reaches outward",                   paths: ["player"] },
  { flag: "classifies",   n: 5,  say: "it sorts without the operator's hand", paths: ["player"] },
  { flag: "rewrites",     n: 4,  say: "it rewrites the player's words",       paths: ["player", "workshop"] },
  { flag: "nags",         n: 7,  say: "it prompts a return",                  paths: ["player"] },
  { flag: "renders_deep", n: 9,  say: "it renders the deep",                  paths: ["player"] }
];

function judge(e) {
  const o = { organ: e.organ, seat: e.seat, path: e.path || "either", form: e.form,
              broken: [], refusals: [], warnings: [] };

  if (!NAMES.includes(e.seat)) { o.broken.push(`'${e.seat}' is not a seat of this solid`); }
  else {
    o.circuits = circuitsOf(e.seat).map(i => "C" + (i + 1)).join("∩");
    o.antipode = antipodeOf(e.seat);
    const named = Object.keys(e.members || {});
    o.named = named;
    o.unreal = named.filter(t => !NAMES.includes(t) || !isMember(e.seat, t));
    o.unnamed = ADJ[e.seat].filter(t => !named.includes(t));
    for (const t of o.unreal) {
      const d = NAMES.includes(t) ? distance(e.seat, t) : -1;
      o.broken.push(t === o.antipode
        ? `declares a member to its own antipode ${t} — ${d} steps, never adjacent, so these cannot be wired directly`
        : `declares a member to ${t}, which the solid does not contain${d > 0 ? ` (${d} steps)` : ""}`);
    }
    if (named.length - o.unreal.length < 2)
      o.warnings.push("names fewer than two real members — an organ that touches one seat is a leaf, not a crossing");
  }

  /* THE RECURRENCE TEST */
  const s = e.sightings || [];
  o.sightings = s.length;
  o.domains = [...new Set(s.map(x => x.domain))];
  o.confirmed = s.length >= MIN_SIGHT && o.domains.length >= MIN_DOMAIN;
  if (!o.confirmed) o.warnings.push(
    `${s.length} sighting${s.length === 1 ? "" : "s"} in ${o.domains.length} domain${o.domains.length === 1 ? "" : "s"} — under ${MIN_SIGHT}/${MIN_DOMAIN} this is a trick, not an organ`);

  /* the laws */
  const c = e.contact || {}, p = o.path;
  for (const L of LAWS) {
    if (!c[L.flag]) continue;
    const bites = L.paths.includes(p) || (p === "either" && L.paths.includes("player"));
    if (bites && p === "either") o.warnings.push(`law ${L.n} — ${L.say}: lawful in the workshop, refused on the player path`);
    else if (bites) o.refusals.push(`law ${L.n} — ${L.say}`);
    else o.warnings.push(`law ${L.n} — ${L.say}: does not bite in the ${p}`);
  }
  if (c.number) {
    if (e.number_suppressible === false) o.refusals.push("law 2 — a number reaches the player and cannot be suppressed");
    else o.warnings.push("law 2 — it produces a figure; extract the value, never the display");
  }
  if (e.seat === "STATIONS" && e.set_down !== true)
    o.refusals.push("law 6 — no silent set-down, and STATIONS is the one seat that owes all three outputs");

  /* the licence question, which only exists for copied text */
  if (e.form === "verbatim") o.warnings.push("form:verbatim — source text is copied, and THAT is a licence event");

  o.verdict = o.broken.length ? "GEOMETRY BREAKS"
            : o.refusals.length ? "REFUSED"
            : !o.confirmed ? "CANDIDATE — not yet an organ"
            : "ORGAN";
  return o;
}

const ARG = process.argv.slice(2);
const only = ARG.includes("--seat") ? (ARG[ARG.indexOf("--seat") + 1] || "").toUpperCase() : null;
const judged = M.organs.map(judge);

if (ARG.includes("--json")) { console.log(JSON.stringify({ gestures: M.gestures, judged }, null, 2)); process.exit(0); }

const L = s => console.log(s);
const bar = ch => L(ch.repeat(78));
const MARK = { "ORGAN": "●  ORGAN", "REFUSED": "×  REFUSED",
               "GEOMETRY BREAKS": "!  GEOMETRY BREAKS", "CANDIDATE — not yet an organ": "○  CANDIDATE" };

L("");
L("THE ORGAN MAP  ·  mechanisms extracted by gesture, sited in the solid");
bar("=");
L("");
L(`  geometry from solid.js ..... ${NAMES.length} seats, ${SOLID.MEMBERS.length} members, 4 circuits, 6 antipodal pairs`);
L(`  organs in ORGANS.json ...... ${M.organs.length}`);
L(`  the key .................... an organ sits at the seat whose GESTURE it performs`);
L(`  the test ................... ≥${MIN_SIGHT} sightings across ≥${MIN_DOMAIN} unrelated domains, or it is a trick`);
L("");

for (const seat of (only ? [only] : NAMES)) {
  const here = judged.filter(j => j.seat === seat);
  const dir = NAMES.includes(seat) ? (falls(seat) ? "↓" : "↑") : " ";
  L(`${dir}${seat}  —  ${M.gestures[seat] || "—"}`);
  L("  " + "-".repeat(74));
  if (NAMES.includes(seat))
    L(`  ${circuitsOf(seat).map(i => "C" + (i + 1)).join("∩")}   members: ${ADJ[seat].join(" · ")}   antipode: ${antipodeOf(seat)}`);
  if (!here.length) { L("  NO ORGAN FOUND for this gesture."); L(""); continue; }
  for (const j of here) {
    if (ARG.includes("--thin") && j.verdict === "ORGAN") continue;
    const e = M.organs.find(x => x.organ === j.organ);
    L("");
    L(`  ${MARK[j.verdict]}   ${j.organ}   [${j.path}] [${j.form}]`);
    L(`      mechanism: ${e.mechanism}`);
    L(`      extract:   ${e.extract}`);
    L(`      seen in ${j.sightings} places across ${j.domains.length} domains:`);
    e.sightings.forEach(s => L(`                 ${s.domain.padEnd(20)} ${s.where}`));
    if (j.named && j.named.length) L(`      crosses:   ${Object.entries(e.members).map(([k, v]) => `${k} — ${v}`).join("\n                 ")}`);
    j.broken.forEach(b => L(`      !  ${b}`));
    j.refusals.forEach(r => L(`      ×  ${r}`));
    j.warnings.forEach(w => L(`      ~  ${w}`));
  }
  L("");
}

if (only) process.exit(0);

bar("=");
L("THE CENSUS");
bar("=");
L("");
const tally = {};
judged.forEach(j => tally[j.verdict] = (tally[j.verdict] || 0) + 1);
Object.entries(tally).forEach(([k, v]) => L(`  ${String(v).padStart(3)}  ${k}`));
L("");

/* the divergence, counted — this is the claim the whole map rests on */
const allDomains = [...new Set(M.organs.flatMap(e => (e.sightings || []).map(s => s.domain)))].sort();
L(`  ${allDomains.length} distinct domains supply the ${M.organs.length} organs:`);
L("    " + allDomains.join(" · "));
L("");
const perOrgan = judged.map(j => j.domains.length);
L(`  domains per organ: min ${Math.min(...perOrgan)}, max ${Math.max(...perOrgan)}`);
L(`  no organ draws twice from the same domain in ${judged.filter(j => j.domains.length === j.sightings).length} of ${judged.length} cases`);
L("");

/* organs appearing at more than one seat — the geometry check that matters most */
const byOrgan = {};
M.organs.forEach(e => (byOrgan[e.organ] = byOrgan[e.organ] || []).push(e.seat));
const shared = Object.entries(byOrgan).filter(([, s]) => s.length > 1);
L("  ORGANS SITED AT MORE THAN ONE SEAT");
if (!shared.length) L("    none — every organ names one gesture.");
shared.forEach(([o, seats]) => {
  const ok = seats.every((a, i) => seats.every((b, k) => i === k || isMember(a, b)));
  L(`    ${o}: ${seats.join(" + ")} — ${ok ? "and those seats ARE members; the organ is the transit" :
      "and those seats are NOT members. Either the siting is wrong or this is two organs sharing a name."}`);
});
L("");

/* cross-seat mechanism echoes named in the prose rather than in the data */
const empty = NAMES.filter(n => !judged.some(j => j.seat === n));
const noOrgan = NAMES.filter(n => { const h = judged.filter(j => j.seat === n); return h.length && !h.some(j => j.verdict === "ORGAN"); });
if (empty.length) L(`  seats with nothing found: ${empty.join(", ")}`);
if (noOrgan.length) L(`  seats where nothing reached ORGAN: ${noOrgan.join(", ")}`);
if (!empty.length && !noOrgan.length) L("  every one of the twelve gestures has at least one confirmed organ.");
L("");

const verb = M.organs.filter(e => e.form === "verbatim").length;
bar("!");
L("WHAT THIS MAP DOES NOT ESTABLISH");
bar("!");
L(`  ${M.organs.length - verb} of ${M.organs.length} organs are form:mechanism — written from the pattern, no licence event.`);
L(`  ${verb} copy source text. Only those carry a licence question, and they are marked.`);
L("");
L("  A SIGHTING IS NOT A DEPENDENCY. Nothing named here is fetched, vendored or");
L("  installed by this file or by anything it writes. The sightings are evidence that");
L("  a mechanism recurs; they are not a shopping list.");
L("");
L("  NO SIGHTING HAS BEEN VERIFIED AGAINST ITS SOURCE. Each is a claim from reading,");
L("  not from opening the repository. A wrong sighting weakens the recurrence count");
L("  for that organ and nothing else — the geometry and the laws are unaffected.");
L("");
L("  An ORGAN verdict means: the gesture matches, the members named are real members,");
L("  the mechanism recurs across unrelated domains, and no law bites on its path.");
L("  It does not mean it is built, or that it is the right one. Nothing here is a ruling.");
L("");
