#!/usr/bin/env node
// THE WEAVE — the connective tissue over the deposit; the new medium.
//
// Kevin's mark, 2026-09-01: "we need to create connective tissue, and use
// the soil deposited to allow a new medium to sublimate/deposit."
//
// The law this surface obeys is the corpus's own, already through the
// gate (declared kinship, never computed similarity — THE_BEDROCK, and
// the crossed batch-3 seatings): an edge exists here ONLY where a
// relation was actually DECLARED somewhere — a crystal seating, an organ
// sighting naming an admitted file, a tributary lineage, a crystallized
// record's provenance, or a prose declaration in a crossed document.
// Every edge carries the citation of where it was declared. Nothing
// computes nearness; what has no declaration lands in THE HONEST GAP,
// listed rather than linked.
//
// Runs AFTER build_deposit_public.js and build_deposit_index.js:
//   node tools/build_weave.js
// Writes nesi_deposit_public/weave.html (de-named at the crossing, same
// transform as the index).

const fs = require('fs');
const path = require('path');
const { CRYSTALS, SEATS, UNIT_SEATS, SPINE_MARK_ID } = require('./spine');
const { denamePublicText } = require('./deposit_lib');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'nesi_deposit_public');
const ORGANS_PATH = path.join(ROOT, 'nesi', 'game2d', 'ORGANS.json');

// Crystal-to-crystal relations DECLARED in the spine document (its open
// question and crystal 8's own ruling). These four fragments are also
// the current data for the held twelve-around-the-VE hypothesis's
// degree-four condition — reported below as what stands, not as progress
// toward a target.
const CRYSTAL_EDGES = [
  { a: 'c4', b: 'c1', declared_in: 'UPSTREAM doc, challenged seatings §4: "whether 4 is 1-as-geometry" — held open' },
  { a: 'c6', b: 'c2', declared_in: 'UPSTREAM doc, challenged seatings §4: "6/7 are 2’s epistemics" — held open' },
  { a: 'c7', b: 'c2', declared_in: 'UPSTREAM doc, challenged seatings §4: same held question' },
  { a: 'c8', b: 'c3', declared_in: 'crystal 8’s own ruling: "the mechanism earns the seat and the shape describes it afterward"' },
];

// Mark-to-mark relations declared in made-lines or seat-lines, each with
// its citation. Deliberately short: only unambiguous declarations.
const MARK_EDGES = [
  { a: 'codex_query', b: 'prior_art_check_tool', declared_in: 'codex_query’s made-line: "the prior-art check’s engine"' },
  { a: 'ros_ri_overview', b: 'second_mark_preflight', declared_in: 'ros_ri_overview’s seat-line: "the second mark at framework scale"' },
  { a: 'osg_world_engine', b: 'continuity_derived_view', declared_in: 'both made-lines name the same mechanism: state re-derived from the ledgers, never stored' },
];

// Declared SETS — groups whose membership is declared by their own
// naming and made-lines (a set's shared id-prefix is a declaration its
// members were admitted as one body, not a similarity guess).
const SET_DEFS = [
  { name: 'the ten organs', test: (id) => ['mark_it_at_the_body','route_every_cost','place_it_and_close','hand_over_what_runs','set_the_floor','stake_the_read','refuse_where_seen','discharge_the_no','force_the_definition','move_the_load'].includes(id),
    declared_in: 'each made-line: "one of the ten organs" — the 2026-07-29/30 collapse of the 157-pattern canon' },
  { name: 'the floor kit', test: (id) => id.startsWith('floor_kit_'), declared_in: 'admitted as one four-file kit' },
  { name: 'the six returns', test: (id) => id.startsWith('six_returns_'), declared_in: 'admitted as one six-file retrospective' },
  { name: 'the cross-origin audit', test: (id) => id.startsWith('ros_ri_'), declared_in: 'admitted as one five-page site' },
  { name: 'the practitioner kit', test: (id) => id.startsWith('kit_'), declared_in: 'admitted as one seven-page reference' },
  { name: 'the coherence codex', test: (id) => id.startsWith('codex_') && !id.startsWith('codex_query') && !id.startsWith('codex_grounder'), declared_in: 'admitted as one locked three-piece stack' },
  { name: 'the open ledger', test: (id) => id.startsWith('open_ledger'), declared_in: 'admitted as doctrine + schema + runnable demo' },
  { name: 'the genesis seed', test: (id) => id.startsWith('genesis_'), declared_in: 'admitted as onboarding + behavioral tests' },
  { name: 'the crystallized essays', test: (id) => ['match_noun_to_harm','hunger_under_naming','five_terms_and_the_loop'].includes(id), declared_in: 'each provenance line: crystallized per the commons rule, working originals source-side' },
];

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function main() {
  const tribPath = path.join(OUT, 'TRIBUTARIES.json');
  if (!fs.existsSync(tribPath)) { console.error('[build_weave] REFUSED — run build_deposit_public.js first.'); process.exit(1); }
  const tributaries = JSON.parse(fs.readFileSync(tribPath, 'utf8'));
  const organs = JSON.parse(fs.readFileSync(ORGANS_PATH, 'utf8')).organs;
  const ids = tributaries.map((t) => t.id).filter((id) => id !== SPINE_MARK_ID);
  const byId = Object.fromEntries(tributaries.map((t) => [t.id, t]));

  // Organ threads: an organ's sighting that literally names an admitted
  // path's basename is a declared relation (reading the declaration, not
  // computing similarity). Cite the organ entry.
  const organThreads = [];
  for (const o of organs) {
    const hits = [];
    for (const t of tributaries) {
      if (!t.at || t.id === SPINE_MARK_ID) continue;
      const base = path.basename(t.at.replace(/\\/g, '/'));
      const inSightings = (o.sightings || []).some((s) => s.where && s.where.includes(base));
      const inFinding = o.built && o.built.finding && o.built.finding.includes(base);
      if (inSightings || inFinding) hits.push(t.id);
    }
    if (hits.length) organThreads.push({ organ: o.organ, marks: [...new Set(hits)], declared_in: 'ORGANS.json — the organ’s own sightings/finding name the file' });
  }

  // Tributary lineages: gift -> card (declared in TRIBUTARIES.json).
  const lineages = tributaries.filter((t) => t.card).map((t) => ({ id: t.id, card: t.card }));

  // Membership per set.
  const sets = SET_DEFS.map((s) => ({ name: s.name, declared_in: s.declared_in, members: ids.filter(s.test) })).filter((s) => s.members.length > 1);

  // Degree of declared relation per mark (edges + sets + organ threads +
  // lineage), to find the honest gap: marks whose ONLY declared relation
  // is their crystal seat.
  const related = new Set();
  MARK_EDGES.forEach((e) => { related.add(e.a); related.add(e.b); });
  sets.forEach((s) => s.members.forEach((m) => related.add(m)));
  organThreads.forEach((o) => o.marks.forEach((m) => related.add(m)));
  lineages.forEach((l) => related.add(l.id));
  const gap = ids.filter((id) => !related.has(id));

  // Crystal families (from the seating — the one source).
  const families = CRYSTALS.map((c) => ({
    c, marks: ids.filter((id) => SEATS[id] && SEATS[id].crystal === c.id),
    units: UNIT_SEATS.filter((u) => u.crystal === c.id),
  }));

  // Degree count for the held VE hypothesis (condition 2): declared
  // crystal-crystal edges per crystal, reported as-is.
  const cdeg = {};
  CRYSTAL_EDGES.forEach((e) => { cdeg[e.a] = (cdeg[e.a] || 0) + 1; cdeg[e.b] = (cdeg[e.b] || 0) + 1; });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<title>NESI — the weave</title>
<style>
:root{--bg:#f4f1ea;--surface:#fffdf8;--ink:#181815;--muted:#6a685f;--line:#d8d2c4;--gold:#b28225;--gold-soft:#f1e5c9;--blue:#436a77;--green:#496b55;--purple:#6a5490;}
@media(prefers-color-scheme:dark){:root{--bg:#11110f;--surface:#1a1916;--ink:#f1eee6;--muted:#aaa59a;--line:#38352f;--gold:#d2a851;--gold-soft:#362d1d;--blue:#7facba;--green:#83a98d;--purple:#a998cf;}}
*{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif}
.wrap{max-width:880px;margin:0 auto;padding:46px 26px 90px}
.kicker{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-weight:750}
h1{font-size:38px;letter-spacing:-.03em;margin:6px 0 10px} .lede{font-size:17px;color:var(--muted);max-width:66ch}
h2{font-size:21px;letter-spacing:-.02em;margin:38px 0 6px} .note{color:var(--muted);font-size:13.5px;max-width:70ch;margin:0 0 14px}
.card{border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:10px;background:var(--surface);padding:13px 16px;margin-bottom:10px}
.card h3{margin:0 0 4px;font-size:14.5px} .cite{color:var(--muted);font-size:11.5px;font-style:italic}
.m{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;background:var(--gold-soft);border-radius:4px;padding:1px 6px;margin:1px 2px;display:inline-block}
.edge{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap;padding:6px 0;border-top:1px solid var(--line)} .edge:first-of-type{border-top:0}
.arrow{color:var(--muted)}
nav.jump{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 8px} nav.jump a{font-size:12px;padding:5px 11px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}
a{color:var(--blue)} .gaplist{columns:2;gap:20px;list-style:none;margin:0;padding:0} .gaplist li{font-size:12.5px;padding:2px 0;break-inside:avoid}
footer{color:var(--muted);font-size:12px;margin-top:44px}
</style>
</head>
<body>
<div class="wrap">
<div class="kicker">The weave · generated by the pipeline</div>
<h1>The weave</h1>
<p class="lede">The connective tissue over this deposit. An edge appears here only where a relation was actually <b>declared</b> somewhere — a seating, an organ's own sightings, a lineage, a provenance line — and every edge names where. Nothing on this page computes similarity; what has no declaration sits in the honest gap at the bottom, listed rather than linked. <a href="index.html">Back to the index</a> · <a href="UPSTREAM_2026-08-31_nucleation_points.md">the spine</a>.</p>

<nav class="jump"><a href="#crystals">Crystal relations</a><a href="#sets">Declared sets</a><a href="#organs">Organ threads</a><a href="#lineages">Lineages</a><a href="#gap">The honest gap</a></nav>

<h2 id="crystals">Crystal-to-crystal relations</h2>
<p class="note">Four fragments, all declared in the spine document — three as an explicitly held-open question, one as crystal 8's own ruling. These are also the current data for the held twelve-around-the-VE hypothesis's degree-four condition: reported as what stands, never as progress toward a target.</p>
<div class="card">${CRYSTAL_EDGES.map((e) => `<div class="edge"><span class="m">${e.a}</span><span class="arrow">·—·</span><span class="m">${e.b}</span><span class="cite">${esc(e.declared_in)}</span></div>`).join('')}
<div class="edge"><span class="cite">Declared degrees today: ${CRYSTALS.map((c) => `${c.id}:${cdeg[c.id] || 0}`).join(' · ')} — the hypothesis needs every crystal at exactly 4, arrived at without aiming.</span></div></div>

<h2 id="sets">Declared sets</h2>
<p class="note">Bodies admitted as one thing — the membership is each set's own naming and made-lines, not a grouping guess.</p>
${sets.map((s) => `<div class="card"><h3>${esc(s.name)} <span class="cite">(${s.members.length})</span></h3><div>${s.members.map((m) => `<span class="m">${esc(m)}</span>`).join('')}</div><div class="cite">${esc(s.declared_in)}</div></div>`).join('\n')}

<div class="card"><h3>declared pairs</h3>${MARK_EDGES.map((e) => `<div class="edge"><span class="m">${esc(e.a)}</span><span class="arrow">·—·</span><span class="m">${esc(e.b)}</span><span class="cite">${esc(e.declared_in)}</span></div>`).join('')}</div>

<h2 id="organs">Organ threads</h2>
<p class="note">The pattern library's organs (the 39-entry recurrence catalog in the source corpus) whose own sightings or findings name an admitted file — the organ is the thread, the marks are where it surfaces in this deposit.</p>
${organThreads.map((o) => `<div class="card"><h3>${esc(o.organ)}</h3><div>${o.marks.map((m) => `<span class="m">${esc(m)}</span>`).join('')}</div><div class="cite">${esc(o.declared_in)}</div></div>`).join('\n')}

<h2 id="lineages">Tributary lineages</h2>
<p class="note">Each gift traced to its own crystallized card — the lineage the tributaries file declares.</p>
<div class="card">${lineages.map((l) => `<div class="edge"><span class="m">${esc(l.id)}</span><span class="arrow">→</span><span class="cite">${esc(l.card)}</span></div>`).join('')}</div>

<h2 id="gap">The honest gap</h2>
<p class="note">Marks whose only declared relation is their crystal seat. Not unimportant — undeclared. A relation someone actually names can move any of these up the page; nothing here will be linked by guesswork.</p>
<div class="card"><ul class="gaplist">${gap.map((id) => `<li><span class="m">${esc(id)}</span></li>`).join('')}</ul></div>

<footer>Generated from the seating, the tributaries, and the organ catalog — declared relations only. ${ids.length} marks · ${sets.length} sets · ${organThreads.length} organ threads · ${MARK_EDGES.length + CRYSTAL_EDGES.length} cited edges · ${gap.length} in the honest gap.</footer>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT, 'weave.html'), denamePublicText(html));
  console.log(`weave.html written — ${ids.length} marks, ${sets.length} sets, ${organThreads.length} organ threads, ${MARK_EDGES.length + CRYSTAL_EDGES.length} cited edges, ${gap.length} in the honest gap`);
}

main();
