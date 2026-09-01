#!/usr/bin/env node
// THE ARRANGEMENT ORGAN — the deposit pipeline's other end.
//
// the keeper's mark, 2026-08-31: "we need an organ on each side of the pipeline.
// The git push organ needs to filter, and arrange what's being deposited
// into the git so that what goes in becomes an immediately cohesive and
// functional part of the whole. The organ we are running now is on the
// other end... prefiltering what does and does not serve a user."
//
// build_deposit_public.js is that first organ: source-side, decides WHAT
// qualifies (real admission, real invocation, a typology guess). It has no
// opinion on how the result reads once it lands in the repo — it just
// copies classified files into folders. This is the second organ:
// destination-side, runs AFTER the first, takes what's already selected
// and composes it into one navigable whole — a real front door, not a
// pile of folders and two JSON files a visitor has to cross-reference by
// hand.
//
// Reads nesi_deposit_public/MANIFEST.json + TRIBUTARIES.json (must already
// exist — run build_deposit_public.js first) and writes
// nesi_deposit_public/index.html, plus .nojekyll (GitHub Pages runs Jekyll
// by default, which silently drops any file/folder starting with an
// underscore — real ones exist under workshop/game-gate/ — .nojekyll turns
// that off so the deposit serves exactly what's actually there).
//
//   node tools/build_deposit_index.js

const fs = require('fs');
const path = require('path');
const { CRYSTALS, SEATS, UNIT_SEATS, SPINE_MARK_ID, SPINE_DOC, housePathFor } = require('./spine');
const { denamePublicText } = require('./deposit_lib');

const OUT = path.join(path.resolve(__dirname, '..'), 'nesi_deposit_public');

function repoPath(manifestPath) {
  // hrefs must be forward-slash on any web host; manifest paths built on
  // Windows carry backslashes (the 161-dead-links defect, fixed 2026-09-01)
  manifestPath = manifestPath.replace(/\\/g, '/');
  // The three rooms (the keeper's mark, 2026-09-01): game/ untouched,
  // house/ for the usable things (per spine.js's one prefix map),
  // workshop/ for the making — doctrine, apparatus, records.
  if (manifestPath.startsWith('game2d/')) return 'workshop/game-gate/' + manifestPath.slice('game2d/'.length);
  if (manifestPath.startsWith('mind/')) return 'workshop/' + manifestPath.slice('mind/'.length);
  if (manifestPath.startsWith('.claude/skills/')) return 'workshop/skills/' + manifestPath.slice('.claude/skills/'.length) + '/SKILL.md';
  if (manifestPath.startsWith('.claude/agents/')) return 'workshop/agents/' + manifestPath.slice('.claude/agents/'.length);
  if (manifestPath.startsWith('root/')) {
    const rel = manifestPath.slice('root/'.length);
    if (rel === SPINE_DOC) return SPINE_DOC.split('/').pop(); // ships top-level, above the rooms
    return housePathFor(rel) || ('workshop/' + rel);
  }
  return manifestPath;
}


function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const CATEGORY_NOTE = {
  organ: 'stays · whole · does work',
  nutrient: 'stays · partial · reserve for a graft',
  lens: 'reveals · changes seeing, produces nothing',
  seed: 'travels · whole · a compressed gift',
  pollen: 'travels · partial · fertilizes elsewhere',
};

function main() {
  const manifestPath = path.join(OUT, 'MANIFEST.json');
  const tribPath = path.join(OUT, 'TRIBUTARIES.json');
  if (!fs.existsSync(manifestPath) || !fs.existsSync(tribPath)) {
    console.error('[build_deposit_index] REFUSED — run tools/build_deposit_public.js first; MANIFEST.json/TRIBUTARIES.json missing.');
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const tribRaw = JSON.parse(fs.readFileSync(tribPath, 'utf8'));
  // 2026-09-01: TRIBUTARIES ships as {note, entries}; accept the bare array too
  const tributaries = Array.isArray(tribRaw) ? tribRaw : tribRaw.entries;

  const byCategory = {};
  const skillEntries = [];
  const agentEntries = [];
  for (const p of manifest.manifest.patterns) {
    if (p.path.startsWith('.claude/skills/')) { skillEntries.push(p); continue; }
    if (p.path.startsWith('.claude/agents/')) { agentEntries.push(p); continue; }
    (byCategory[p.category] = byCategory[p.category] || []).push(p);
  }

  const order = ['organ', 'nutrient', 'lens', 'seed', 'pollen'];
  const typologySections = order.filter((c) => byCategory[c]?.length).map((cat) => {
    const items = byCategory[cat].sort((a, b) => a.path.localeCompare(b.path));
    return `<section class="cat">
      <h3><span class="dot dot-${cat}"></span>${cat} <span class="count">${items.length}</span></h3>
      <p class="catnote">${CATEGORY_NOTE[cat]}</p>
      <ul class="filelist">${items.map((i) => `<li><a href="${esc(repoPath(i.path))}">${esc(i.path)}</a></li>`).join('')}</ul>
    </section>`;
  }).join('\n');

  function traceLink(t) {
    if (t.card) return `<a href="${esc(repoPath('game2d/inbox/' + t.card.split('/').slice(1).join('/')))}">${esc(t.card)}</a>`;
    if (t.bridge) return `<a href="${esc(repoPath(t.bridge))}">${esc(t.bridge)}</a>`;
    if (t.direct) return `<a href="${esc(repoPath(t.direct))}">${esc(t.direct)}</a>`;
    return null;
  }

  const giftRows = tributaries.map((t) => `<tr>
      <td><span class="dot dot-${esc(t.category || 'organ')}"></span>${esc(t.id)}</td>
      <td>${esc(t.category || '—')}</td>
      <td>${esc(t.made || '')}</td>
      <td>${traceLink(t) || '—'}</td>
    </tr>`).join('\n');

  // --- THE SPINE (the keeper's mark, 2026-08-31: "lets commit those 8, and
  // assemble the deposits onto them. Thats the spine."). The eight
  // nucleation points, each with the deposit items seated under it —
  // seating read from tools/spine.js, the one source. A mark with no seat
  // renders in UNSEATED, visible rather than silently dropped.
  const spineDocName = manifest.manifest.spine || null;
  const seatedIds = new Set();
  const crystalSections = CRYSTALS.map((c, i) => {
    const seated = tributaries.filter((t) => SEATS[t.id]?.crystal === c.id);
    seated.forEach((t) => seatedIds.add(t.id));
    const units = UNIT_SEATS.filter((u) => u.crystal === c.id);
    const markItems = seated.length
      ? `<ul class="seatlist">${seated.map((t) => {
          const link = traceLink(t);
          return `<li><b>${esc(t.id)}</b> — ${esc(SEATS[t.id].why)}${link ? ` · ${link}` : ''}</li>`;
        }).join('')}</ul>`
      : '';
    const unitItems = units.length
      ? `<p class="catnote unithead">carried whole under this crystal:</p>
         <ul class="seatlist">${units.map((u) => `<li><b><a href="${esc(u.href)}">${esc(u.unit)}</a></b> — ${esc(u.why)}</li>`).join('')}</ul>`
      : '';
    const emptyNote = (!seated.length && !units.length)
      ? (c.id === 'c4'
        ? '<p class="catnote">Nothing seats here, on purpose — this crystal governs shape, not tooling. The center stays empty; an empty seat list is this crystal demonstrating itself.</p>'
        : '<p class="catnote">Nothing seated here yet.</p>')
      : '';
    return `<section class="cat crystal">
      <h3><span class="cnum">${i + 1}</span>${esc(c.name)} <span class="count">${(seated.length + units.length) || ''}</span></h3>
      <p class="catnote">${esc(c.line)}</p>
      ${markItems}${unitItems}${emptyNote}
    </section>`;
  }).join('\n');
  const unseated = tributaries.filter((t) => !seatedIds.has(t.id) && t.id !== SPINE_MARK_ID);
  const unseatedHtml = unseated.length
    ? `<section class="cat"><h3>unseated <span class="count">${unseated.length}</span></h3>
       <p class="catnote">Admitted, but not yet seated under a crystal — listed rather than forced into a fit (the spine's own falsifier: a real thing no crystal accounts for means the spine is incomplete, not that the thing is wrong).</p>
       <ul class="seatlist">${unseated.map((t) => `<li><b>${esc(t.id)}</b> — ${esc(t.made || '')}</li>`).join('')}</ul></section>`
    : '';

  function invocationTable(entries, kind) {
    if (!entries.length) return '<p class="catnote">None promoted.</p>';
    return `<table><tr><th>${kind}</th><th>real invocations</th><th>last</th></tr>` +
      entries.sort((a, b) => a.path.localeCompare(b.path)).map((e) => {
        const name = e.path.split('/').pop().replace(/\.md$/, '');
        const inv = typeof e.realInvocations === 'object'
          ? `${e.realInvocations.direct} direct + ${e.realInvocations.adopted} adopted`
          : `${e.realInvocations}×`;
        return `<tr><td><a href="${esc(repoPath(e.path))}">${esc(name)}</a></td><td>${esc(inv)}</td><td>${esc((e.lastInvoked || '').slice(0, 10) || '—')}</td></tr>`;
      }).join('') + '</table>';
  }

  const heldBack = manifest.heldBack || { skills: [], agents: [] };
  const agentHeldBack = (heldBack.agents || []).map((a) => {
    if (typeof a === 'string') return `agent: ${a} — zero real invocations`; // older MANIFEST.json shape
    const inv = `${a.realInvocations.direct} direct + ${a.realInvocations.adopted} adopted`;
    return `agent: ${a.name} — ${a.reason} (${inv} real invocation${a.realInvocations.direct + a.realInvocations.adopted === 1 ? '' : 's'}, held back anyway)`;
  });
  const heldBackHtml = (heldBack.skills.length || agentHeldBack.length)
    ? `<p>Held back — considered, not promoted, named rather than dropped:</p>
       <ul class="filelist">${[...heldBack.skills.map((s) => `skill: ${s} — zero real invocations`), ...agentHeldBack].map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
    : '<p class="catnote">Nothing held back this run.</p>';

  // Debris excluded from the public copy by the 2026-08-31 audit —
  // retired instruments, backup layers, dotfile working copies. All still
  // whole in the source corpus and the private deposit; named here so the
  // exclusion is a fact on the page, never a silent drop.
  const excludedDebris = manifest.excludedDebris || [];
  const debrisHtml = excludedDebris.length
    ? `<p>Also left out of this public copy as build debris — retired instruments, backup layers, and working dotfiles, all kept whole in the source corpus (where supersession stays a layer, never an erasure):</p>
       <ul class="filelist">${excludedDebris.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<title>NESI — deposit index</title>
<style>
:root{--bg:#f4f1ea;--surface:#fffdf8;--ink:#181815;--muted:#6a685f;--line:#d8d2c4;--gold:#b28225;--gold-soft:#f1e5c9;--blue:#436a77;--blue-soft:#dfeaed;--red:#924d43;--green:#496b55;--green-soft:#dfebe2;--purple:#6a5490;--shadow:0 18px 45px rgba(40,34,22,.08);}
@media(prefers-color-scheme:dark){:root{--bg:#11110f;--surface:#1a1916;--ink:#f1eee6;--muted:#aaa59a;--line:#38352f;--gold:#d2a851;--gold-soft:#362d1d;--blue:#7facba;--blue-soft:#1b2c31;--red:#c47b70;--green:#83a98d;--green-soft:#1d2d22;--purple:#a998cf;--shadow:none;}}
*{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:var(--blue)} code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9em;background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:1px 5px}
.wrap{max-width:900px;margin:0 auto;padding:50px 28px 100px}
header{margin-bottom:40px} .kicker{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-weight:750}
h1{font-size:42px;letter-spacing:-.03em;margin:8px 0 10px} .lede{font-size:18px;color:var(--muted);max-width:66ch}
.cta{display:inline-block;margin-top:18px;padding:12px 22px;background:var(--ink);color:var(--bg);border-radius:10px;text-decoration:none;font-weight:700}
.cta-2{background:transparent;color:var(--ink);border:1px solid var(--line);margin-left:8px}
nav.jump{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 44px} nav.jump a{font-size:12px;padding:6px 12px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}
h2{font-size:24px;letter-spacing:-.02em;margin:0 0 6px;padding-top:8px} .section-note{color:var(--muted);font-size:14px;max-width:70ch;margin:0 0 20px}
.cat{border:1px solid var(--line);border-radius:12px;background:var(--surface);padding:16px 18px;margin-bottom:12px}
.cat h3{margin:0 0 3px;font-size:15px;text-transform:capitalize;display:flex;align-items:center;gap:8px}
.count{font-size:11px;color:var(--muted);font-weight:600}
.catnote{color:var(--muted);font-size:12.5px;margin:0 0 10px}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block}
.dot-organ{background:var(--blue)} .dot-nutrient{background:var(--green)} .dot-lens{background:var(--purple)} .dot-seed{background:var(--gold)} .dot-pollen{background:var(--red)}
.crystal{border-left:3px solid var(--gold)}
.cnum{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--gold-soft);color:var(--gold);font-size:12px;font-weight:800;flex:none}
.seatlist{list-style:none;margin:0;padding:0} .seatlist li{font-size:13px;padding:4px 0;border-top:1px solid var(--line)} .seatlist li:first-child{border-top:0}
.unithead{margin:12px 0 2px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:10.5px}
.filelist{list-style:none;margin:0;padding:0;columns:2;gap:20px} .filelist li{font-size:13px;padding:3px 0;break-inside:avoid}
table{width:100%;border-collapse:collapse;font-size:13px;margin:10px 0 26px} th,td{text-align:left;padding:8px;border-bottom:1px solid var(--line)} th{color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.07em}
.rule{height:1px;background:var(--line);margin:36px 0}
footer{color:var(--muted);font-size:12px;margin-top:50px}
</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="kicker">The deposit · generated by tools/build_deposit_index.js</div>
  <h1>NESI</h1>
  <p class="lede">Three rooms. <b>The game</b> — a small browser surface for writing and reflection; no login, nothing sent anywhere; open it and write. <b>The house</b> — the finished things: some run in the browser, the rest are finished documents. <b>The workshop</b> — the making, kept honestly in the open: the doctrine, the patterns, the gate and pipeline and weave, and the records of how it was all made. The spine — eleven principles the work kept arriving at — holds it together. What the deposit does not yet claim is on the record too: <a href="HELD.md">the held register</a>.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
    <a class="cta" style="margin-top:0" href="game/index.html">The game →</a>
    <a class="cta cta-2" style="margin-top:0;margin-left:0" href="#house">The house →</a>
    <a class="cta cta-2" style="margin-top:0;margin-left:0" href="#spine">The workshop →</a>${spineDocName ? `
    <a class="cta cta-2" style="margin-top:0;margin-left:0" href="${esc(spineDocName)}">The spine →</a>` : ''}
  </div>
</header>

<div class="explainer">
  <h2 style="margin-top:0">What's actually in here</h2>
  <p>Three rooms. <b>The game</b> (<code>game/</code>) — open <code>game/index.html</code> and it runs, nothing else required. <b>The house</b> (<code>house/</code>) — the finished things: a runnable ledger demo and gift circuit, kits, essays, a library of patterns, and the tests for a genesis seed distributed elsewhere. <b>The workshop</b> (<code>workshop/</code>) — the making: the doctrine and design records, the gate and pipeline and weave that built this deposit, kept in the open and labeled as the making. Everything in the house and the workshop is traceable back to where the idea for it actually came from.</p>
  <p>A few sections below use terms specific to how this project tracks its own work. Each is explained inline where it's used, and defined again here:</p>
  <ul class="glossary">
    <li><b>the keeper / "the keeper's mark"</b> — the one person this project belongs to. Nothing here becomes binding except by their explicitly recorded decision (a "mark"), and the records below quote those decisions verbatim. The keeper is deliberately unnamed in this public copy — the project's own commons rule is that what crosses outward is "pattern, never instance — there is no one in it" — and the de-naming is a declared, mechanical transform applied when files cross into this repository; the source corpus keeps the full named record. Read "the keeper's mark" or "the keeper's felt read" as: the one human judgment this system refuses to automate.</li>
    <li><b>spine / nucleation point / crystal</b> — one of the principles this project found recurring through every era of its own work, used as the top-level organization of this deposit. The full argument, with evidence for each, is one document at the top of this repository.</li>
    <li><b>admitted / "the gate"</b> — this project keeps a running, timestamped log of every piece of work it decides to keep. "Admitted" means it's in that log — a deliberate decision, recorded, not just a file that happens to exist.</li>
    <li><b>gift</b> — one accepted piece of work (a feature, a fix, an idea) — called that because nothing here is assigned or owed; it's offered and either kept or not.</li>
    <li><b>tributary / traced to</b> — the actual source a gift came from: a written proposal, an earlier recorded decision, or another part of the game. Nothing is presented without saying where it came from.</li>
    <li><b>typology (organ / nutrient / lens / seed / pollen)</b> — a rough, five-way guess at what KIND of thing something is (see the Typology section below for what each word means). It's a guess made by a simple keyword match, not a rule — treat it as a loose sort, not a category system.</li>
    <li><b>skill / agent</b> — reusable pieces of process this project's own development used (a checklist, a reviewing procedure). "Real invocations" means it was actually run, counted from session history — not just mentioned somewhere.</li>
    <li><b>held back</b> — something that was considered for inclusion and deliberately left out, listed here with the reason rather than silently omitted.</li>
  </ul>
</div>

<nav class="jump">
  <a href="weave.html">The weave →</a>
  <a href="#house">The house</a>
  <a href="#spine">The spine (${CRYSTALS.length})</a>
  <a href="#gifts">Gifts &amp; tributaries (${tributaries.length})</a>
  <a href="#typology">Typology (${manifest.manifest.patterns.length - skillEntries.length - agentEntries.length})</a>
  <a href="#skills">Skills (${skillEntries.length})</a>
  <a href="#agents">Agents (${agentEntries.length})</a>
  <a href="#heldback">Held back</a>
</nav>

<h2 id="house">The house — the usable things</h2>
<p class="section-note">Each of these is a thing, not a description of one: open it and use it. The drawings, the doctrine, and the jigs that made them live in the workshop below, labeled as the making.</p>
<ul class="glossary">
  <li><b><a href="house/open-ledger/demo.html">the open ledger</a></b> — try the five transactional moves and find there is no field for them; <a href="house/open-ledger/circuit.html">the gift circuit</a> runs on the same spine, in your browser, nothing else needed; <a href="house/open-ledger/THE_OPEN_LEDGER.md">the spine document</a> and <a href="house/CIRCUIT_TOOL.md">the circuit framing</a> carry the design</li>
  <li><b><a href="house/genesis-seed/README.md">the genesis seed’s tests</a></b> — <a href="house/genesis-seed/BEHAVIORAL_TESTS.md">four behavioral tests</a> that tell running-the-seed from wearing-its-vocabulary; the seed itself is held back (see <a href="HELD.md">the held register</a>)</li>
  <li><b><a href="house/kit/index.html">the practitioner kit</a></b> — 24 prescriptions across six substrates, each with the condition under which it fires</li>
  <li><b><a href="house/floor-kit/00_THE_GATE.md">the floor kit</a></b> — a four-document method whose first page states its preconditions before the method begins</li>
  <li><b><a href="house/six-returns/01_THE_VERTEX.md">the six returns</a></b> — three real disputes abstracted to one structure, every claim anchored to a record</li>
  <li><b><a href="house/library.html">the library of gifts</a></b> — 24 patterns with every framework word stripped, complete in a paragraph each</li>
  <li><b>the essays</b> — the crystallized outward writing, pattern never instance: <a href="house/essays/witnessing_without_merging.md">witnessing without merging</a> · <a href="house/essays/comprehension_is_not_recognition.md">comprehension is not recognition</a> · <a href="house/essays/match_the_noun_to_the_harm.md">match the noun to the harm</a> · <a href="house/essays/the_hunger_under_naming.md">the hunger under naming</a> · <a href="house/essays/the_five_terms_and_the_loop.html">the five terms and the loop</a></li>
  <li><b><a href="house/starters/_TEMPLATE.md">the mark template</a></b> — a mark form a stranger can adopt in thirty seconds, with <a href="house/starters/README.md">its one-page how</a></li>
  <li><i>Also ready to use, shelved in the workshop with their making (one home each, per crystal 7):</i> <a href="workshop/coherence-codex/deploy/agent-invariant.md">the paste-able agent invariant</a> · <a href="workshop/ROS_RI_site/commons.html">the eight commons cards</a></li>
</ul>

<div class="rule"></div>
<h2 id="spine">The workshop · the spine — ${CRYSTALS.length} nucleation points</h2>
<p class="section-note">One reading note for the workshop: its records are the making, kept whole. A record may point at material that stayed in the private source corpus — a pointer that leaves this repository is a fact of the record, not a broken promise; nothing is rewritten to hide it.</p>
<p class="section-note">The principles that kept reappearing across every version of this work — including the abandoned ones — identified by applying the project's own recurrence test to its own history${spineDocName ? `, argued in full in <a href="${esc(spineDocName)}">${esc(spineDocName)}</a>` : ''}. Everything else in this deposit attaches under the crystal that accounts for it; each item's one-line reason is given at its seat. A seat is a proposal, not a verdict.</p>
${crystalSections}
${unseatedHtml}

<div class="rule"></div>
<h2 id="gifts">Gifts &amp; tributaries</h2>
<p class="section-note">Every accepted ("admitted") piece of work, traced back to where it actually came from — a written proposal, an earlier recorded decision, or the game itself. "Category" is the typology guess described below.</p>
<table><tr><th>id</th><th>category</th><th>made</th><th>traced to</th></tr>${giftRows}</table>

<h2 id="typology">The typology</h2>
<p class="section-note">A rough sort into five kinds of thing, guessed by matching keywords — not a rule, and not always right. Roughly: <b>organ</b> = does ongoing work, stays part of the system · <b>nutrient</b> = a reusable resource other work draws on · <b>lens</b> = changes how something is seen or understood, doesn't produce an output itself · <b>seed</b> = a complete, given piece of work · <b>pollen</b> = a partial idea meant to spread into other work. (A sixth kind, "tension-only," has no single-file example and isn't shown.) Every guess here can be wrong — read it as a starting point, not a verdict.</p>
${typologySections}

<h2 id="skills">Skills</h2>
<p class="section-note">Reusable checklists/procedures this project's own development process used. Included only if session history shows it was actually run at least once — not just referenced.</p>
${invocationTable(skillEntries, 'skill')}

<h2 id="agents">Agents</h2>
<p class="section-note">Not included yet, on purpose — see Held back below for why.</p>
${invocationTable(agentEntries, 'agent')}

<div class="rule"></div>
<h2 id="heldback">Held back</h2>
<p class="section-note">Nothing here was silently dropped. This lists everything that was considered and deliberately not included, and why.</p>
${heldBackHtml}
${debrisHtml}

<footer>Generated ${manifest.generatedBy ? 'by ' + esc(manifest.generatedBy) + ', composed by tools/build_deposit_index.js' : ''} — ${manifest.marksCount} decisions read, ${manifest.invocationRootsScanned || 0} session-history record(s) scanned.</footer>
</div>
</body>
</html>
`;

  // The de-naming transform (the keeper's mark 2026-08-31) applies to this
  // generated page too — crystal/seat strings come from spine.js, whose
  // source text carries the name; the public rendering does not.
  fs.writeFileSync(path.join(OUT, 'index.html'), denamePublicText(html));
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  console.log(`index.html written — spine: ${CRYSTALS.length} crystals, ${seatedIds.size} seated, ${unseated.length} unseated · ${tributaries.length} tributaries, ${order.filter((c) => byCategory[c]?.length).length} typology categories, ${skillEntries.length} skill(s), ${agentEntries.length} agent(s)`);
}

main();
