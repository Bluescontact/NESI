#!/usr/bin/env node
// THE WEAVE v2 — the connective tissue over the deposit; the new medium.
//
// v1 built 2026-09-01 on the keeper's mark ("create connective tissue...
// a new medium to sublimate/deposit"); v2 the same day from the
// dream-and-development pass on it. What the pass changed:
//   - THE LOOM: the honest gap moved from the page's basement to its
//     opening — each undeclared mark shown with its raw material (its
//     seat-line and made-line) and a literal blank where the declaration
//     would go. The blankness is the invitation.
//   - THE CHANNEL: declarations now live in an append-only ledger
//     (gate/DECLARATIONS.jsonl, written only by gate/declare.mjs — the
//     hand's command) instead of hardcoded tables in this file. The
//     ledger ships raw in the deposit; this page is a projection of it,
//     re-derived every run, never a second truth.
//   - TIME: every strand carries its date; strands render newest first.
//   - THE RECEIPTS: citations are the loudest layer of the typography;
//     the page's whole ethic is that every edge names where it was
//     declared.
// Unchanged law: declared kinship, never computed similarity. The
// machine offers no relation vocabulary — every strand's name is free
// text a hand wrote.
//
// Runs after build_deposit_public.js + build_deposit_index.js:
//   node tools/build_weave.js

const fs = require('fs');
const path = require('path');
const { CRYSTALS, SEATS, UNIT_SEATS, SPINE_MARK_ID } = require('./spine');
const { denamePublicText } = require('./deposit_lib');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'nesi_deposit_public');
const ORGANS_PATH = path.join(ROOT, 'nesi', 'game2d', 'ORGANS.json');
const DECLARATIONS = path.join(ROOT, 'nesi', 'game2d', 'gate', 'DECLARATIONS.jsonl');

// Declared SETS — membership declared by the body's own admission naming.
const SET_DEFS = [
  { name: 'the ten organs', test: (id) => ['mark_it_at_the_body','route_every_cost','place_it_and_close','hand_over_what_runs','set_the_floor','stake_the_read','refuse_where_seen','discharge_the_no','force_the_definition','move_the_load'].includes(id),
    declared_in: 'each made-line: "one of the ten organs" — the 2026-07-29/30 collapse of the 157-pattern canon' },
  { name: 'the floor kit', test: (id) => id.startsWith('floor_kit_'), declared_in: 'admitted as one four-file kit' },
  { name: 'the six returns', test: (id) => id.startsWith('six_returns_'), declared_in: 'admitted as one six-file retrospective' },
  { name: 'the cross-origin audit', test: (id) => id.startsWith('ros_ri_'), declared_in: 'admitted as one five-page site' },
  { name: 'the practitioner kit', test: (id) => id.startsWith('kit_'), declared_in: 'admitted as one seven-page reference' },
  { name: 'the coherence codex', test: (id) => ['codex_invariant','codex_agent_invariant','codex_readme'].includes(id), declared_in: 'admitted as one locked three-piece stack' },
  { name: 'the open ledger', test: (id) => id.startsWith('open_ledger'), declared_in: 'admitted as doctrine + schema + runnable demo' },
  { name: 'the genesis seed', test: (id) => id.startsWith('genesis_'), declared_in: 'admitted as onboarding + behavioral tests' },
  { name: 'the crystallized essays', test: (id) => ['match_noun_to_harm','hunger_under_naming','five_terms_and_the_loop'].includes(id), declared_in: 'each provenance line: crystallized per the commons rule, working originals source-side' },
  { name: 'the session bridges', test: (id) => id.startsWith('session_bridge_'), declared_in: 'one record convention, declared by their shared naming — dated state, layered never erased' },
];

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function readJsonl(p) {
  if (!fs.existsSync(p)) return [];
  return fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
}

function main() {
  const tribPath = path.join(OUT, 'TRIBUTARIES.json');
  if (!fs.existsSync(tribPath)) { console.error('[build_weave] REFUSED — run build_deposit_public.js first.'); process.exit(1); }
  const tributaries = JSON.parse(fs.readFileSync(tribPath, 'utf8'));
  const organs = JSON.parse(fs.readFileSync(ORGANS_PATH, 'utf8')).organs;
  const strands = readJsonl(DECLARATIONS).sort((x, y) => (y.ts || '').localeCompare(x.ts || ''));
  const ids = tributaries.map((t) => t.id).filter((id) => id !== SPINE_MARK_ID);
  const byId = Object.fromEntries(tributaries.map((t) => [t.id, t]));

  // Organ threads — an organ's own sightings/finding naming an admitted
  // file's basename. Under-matching is the lawful failure direction:
  // this misses, it never invents.
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

  const lineages = tributaries.filter((t) => t.card).map((t) => ({ id: t.id, card: t.card }));
  const sets = SET_DEFS.map((s) => ({ name: s.name, declared_in: s.declared_in, members: ids.filter(s.test) })).filter((s) => s.members.length > 1);

  // Who has any declared relation beyond the seat?
  const related = new Set();
  strands.forEach((e) => { related.add(e.a); related.add(e.b); });
  sets.forEach((s) => s.members.forEach((m) => related.add(m)));
  organThreads.forEach((o) => o.marks.forEach((m) => related.add(m)));
  lineages.forEach((l) => related.add(l.id));
  const gap = ids.filter((id) => !related.has(id));

  // Crystal degrees from the ledger's crystal-endpoint strands — data
  // for the held VE hypothesis, reported as what stands.
  const cdeg = {};
  strands.forEach((e) => {
    if (/^c(?:[1-9]|1[01])$/.test(e.a)) cdeg[e.a] = (cdeg[e.a] || 0) + 1;
    if (/^c(?:[1-9]|1[01])$/.test(e.b)) cdeg[e.b] = (cdeg[e.b] || 0) + 1;
  });

  const loomRows = gap.map((id) => {
    const seat = SEATS[id];
    const made = byId[id] && byId[id].made ? byId[id].made : '';
    return `<div class="loomrow">
      <div class="loomhead"><span class="m">${esc(id)}</span><span class="waiting">waiting on a declaration in the keeper’s words</span></div>
      <div class="raw">${seat ? `<b>seat (${esc(seat.crystal)}):</b> ${esc(seat.why)}` : ''}</div>
      <div class="raw">${made ? `<b>made:</b> ${esc(made)}` : ''}</div>
      <div class="blank"></div>
    </div>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<title>NESI — the weave</title>
<style>
:root{--bg:#f4f1ea;--surface:#fffdf8;--ink:#181815;--muted:#6a685f;--line:#d8d2c4;--gold:#b28225;--gold-soft:#f1e5c9;--blue:#436a77;--green:#496b55;}
@media(prefers-color-scheme:dark){:root{--bg:#11110f;--surface:#1a1916;--ink:#f1eee6;--muted:#aaa59a;--line:#38352f;--gold:#d2a851;--gold-soft:#362d1d;--blue:#7facba;--green:#83a98d;}}
*{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif}
.wrap{max-width:880px;margin:0 auto;padding:46px 26px 90px}
.kicker{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-weight:750}
h1{font-size:38px;letter-spacing:-.03em;margin:6px 0 10px} .lede{font-size:17px;color:var(--muted);max-width:68ch}
h2{font-size:21px;letter-spacing:-.02em;margin:38px 0 6px} .note{color:var(--muted);font-size:13.5px;max-width:70ch;margin:0 0 14px}
.card{border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:10px;background:var(--surface);padding:13px 16px;margin-bottom:10px}
.card h3{margin:0 0 4px;font-size:14.5px}
.m{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;background:var(--gold-soft);border-radius:4px;padding:1px 6px;margin:1px 2px;display:inline-block}
.cite{display:block;font-size:13.5px;color:var(--ink);font-weight:600;margin-top:2px} .cite::before{content:"declared in: ";color:var(--gold);font-weight:750}
.rel{color:var(--green);font-style:italic} .when{color:var(--muted);font-size:11px;font-family:ui-monospace,monospace}
.strand{padding:9px 0;border-top:1px solid var(--line)} .strand:first-of-type{border-top:0}
.ends{color:var(--muted)}
nav.jump{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 8px} nav.jump a{font-size:12px;padding:5px 11px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}
a{color:var(--blue)}
.loomrow{border-top:1px solid var(--line);padding:11px 0} .loomrow:first-of-type{border-top:0}
.loomhead{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap} .waiting{color:var(--muted);font-size:11.5px;font-style:italic}
.raw{font-size:12.5px;color:var(--muted);margin:3px 0 0} .raw b{color:var(--ink);font-weight:650}
.blank{height:1.1em;border-bottom:1px solid var(--gold);max-width:34em;margin:8px 0 2px;opacity:.55}
code{font-family:ui-monospace,monospace;font-size:.88em;background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:1px 5px}
footer{color:var(--muted);font-size:12px;margin-top:44px}
</style>
</head>
<body>
<div class="wrap">
<div class="kicker">The weave · a projection of gate/DECLARATIONS.jsonl — re-derived every run, never a second truth</div>
<h1>The weave</h1>
<p class="lede">The connective tissue over this deposit. A strand exists here only because a hand declared it — in an append-only ledger this page merely renders (<a href="patterns/game-gate/gate/DECLARATIONS.jsonl">the ledger itself ships in this repository</a>). Every strand carries its own name, written as free text by the hand that made it — the machine offers no vocabulary — and the receipt of where it was declared. Nothing on this page computes similarity. <a href="index.html">Back to the index</a> · <a href="UPSTREAM_2026-08-31_nucleation_points.md">the spine</a>.</p>

<nav class="jump"><a href="#loom">The loom</a><a href="#strands">The strands</a><a href="#sets">Declared sets</a><a href="#organs">Organ threads</a><a href="#lineages">Lineages</a></nav>

<h2 id="loom">The loom — ${gap.length} marks, warp strung, weft absent</h2>
<p class="note">The deposit is mostly unwoven, and that is a state of honesty, not neglect. Each entry below is a mark with no declared relation beyond its seat, shown with the raw material a declaration would be made from, and the blank where one would go. The channel: from the source corpus, <code>node gate/declare.mjs &lt;a&gt; &lt;b&gt; --rel "&lt;the relation, in your own words&gt;"</code> — one appended line, and the strand appears here on the next run.</p>
<div class="card">${loomRows}</div>

<h2 id="strands">The strands — newest first</h2>
<p class="note">Every strand: two ends, the relation in the hand's own words, the date, and the receipt.</p>
<div class="card">${strands.map((e) => `<div class="strand"><span class="m">${esc(e.a)}</span> <span class="rel">—[ ${esc(e.rel)} ]—</span> <span class="m">${esc(e.b)}</span> <span class="when">${esc((e.ts || '').slice(0, 10))}${e.source === 'the hand' ? ' · the hand’s own declaration' : ''}</span>${e.declared_in ? `<span class="cite">${esc(e.declared_in)}</span>` : ''}</div>`).join('')}</div>
<p class="note">Declared crystal degrees today: ${CRYSTALS.map((c) => `${c.id}:${cdeg[c.id] || 0}`).join(' · ')}. The held twelve-around-the-VE hypothesis needs every crystal at exactly four, arrived at without aiming — this line is data, never a target.</p>

<h2 id="sets">Declared sets</h2>
<p class="note">Bodies admitted as one thing — membership is the set's own naming, not a grouping guess.</p>
${sets.map((s) => `<div class="card"><h3>${esc(s.name)} <span class="when">(${s.members.length})</span></h3><div>${s.members.map((m) => `<span class="m">${esc(m)}</span>`).join('')}</div><span class="cite">${esc(s.declared_in)}</span></div>`).join('\n')}

<h2 id="organs">Organ threads</h2>
<p class="note">Organs from the recurrence catalog whose own sightings name an admitted file. This matching misses; it never invents.</p>
${organThreads.map((o) => `<div class="card"><h3>${esc(o.organ)}</h3><div>${o.marks.map((m) => `<span class="m">${esc(m)}</span>`).join('')}</div><span class="cite">${esc(o.declared_in)}</span></div>`).join('\n')}

<h2 id="lineages">Tributary lineages</h2>
<p class="note">Each gift traced to its own crystallized card — the lineage the tributaries file declares.</p>
<div class="card">${lineages.map((l) => `<div class="strand"><span class="m">${esc(l.id)}</span> <span class="rel">—[ traced to ]—</span> <span class="when">${esc(l.card)}</span></div>`).join('')}</div>

<footer>A projection of the declarations ledger, the seating, the tributaries, and the organ catalog — declared relations only. ${ids.length} marks · ${strands.length} strands · ${sets.length} sets · ${organThreads.length} organ threads · ${gap.length} on the loom. Offered shapes from the dream pass, named and not built: the footpath (each mark a room, its declared exits as doors) and the one-organ doctrine (this weave and the game's weave ground as one organ at two scales, computed relations lawful only inside the private surface) — both awaiting the felt read.</footer>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT, 'weave.html'), denamePublicText(html));
  console.log(`weave.html v2 written — ${ids.length} marks, ${strands.length} strands (ledger), ${sets.length} sets, ${organThreads.length} organ threads, ${gap.length} on the loom`);
}

main();
