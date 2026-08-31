#!/usr/bin/env node
// THE ARRANGEMENT ORGAN — the deposit pipeline's other end.
//
// Kevin's mark, 2026-08-31: "we need an organ on each side of the pipeline.
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
// underscore — real ones exist under patterns/game-gate/ — .nojekyll turns
// that off so the deposit serves exactly what's actually there).
//
//   node tools/build_deposit_index.js

const fs = require('fs');
const path = require('path');

const OUT = path.join(path.resolve(__dirname, '..'), 'nesi_deposit_public');

function repoPath(manifestPath) {
  if (manifestPath.startsWith('game2d/')) return 'patterns/game-gate/' + manifestPath.slice('game2d/'.length);
  if (manifestPath.startsWith('mind/')) return 'patterns/' + manifestPath.slice('mind/'.length);
  if (manifestPath.startsWith('.claude/skills/')) return 'patterns/skills/' + manifestPath.slice('.claude/skills/'.length) + '/SKILL.md';
  if (manifestPath.startsWith('.claude/agents/')) return 'patterns/agents/' + manifestPath.slice('.claude/agents/'.length);
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
  const tributaries = JSON.parse(fs.readFileSync(tribPath, 'utf8'));

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

  const giftRows = tributaries.map((t) => {
    const cardLink = t.card ? `<a href="${esc(repoPath('game2d/inbox/' + t.card.split('/').slice(1).join('/')))}">${esc(t.card)}</a>` : '—';
    const bridgeLink = t.bridge ? `<a href="${esc(repoPath(t.bridge))}">${esc(t.bridge)}</a>` : '';
    return `<tr>
      <td><span class="dot dot-${esc(t.category || 'organ')}"></span>${esc(t.id)}</td>
      <td>${esc(t.category || '—')}</td>
      <td>${esc(t.made || '')}</td>
      <td>${t.card ? cardLink : bridgeLink}</td>
    </tr>`;
  }).join('\n');

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
  const heldBackHtml = (heldBack.skills.length || heldBack.agents.length)
    ? `<p>Held back — considered, not promoted, named rather than dropped:</p>
       <ul class="filelist">${[...heldBack.skills.map((s) => `skill: ${s}`), ...heldBack.agents.map((a) => `agent: ${a}`)].map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
    : '<p class="catnote">Nothing held back this run.</p>';

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
nav.jump{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 44px} nav.jump a{font-size:12px;padding:6px 12px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}
h2{font-size:24px;letter-spacing:-.02em;margin:0 0 6px;padding-top:8px} .section-note{color:var(--muted);font-size:14px;max-width:70ch;margin:0 0 20px}
.cat{border:1px solid var(--line);border-radius:12px;background:var(--surface);padding:16px 18px;margin-bottom:12px}
.cat h3{margin:0 0 3px;font-size:15px;text-transform:capitalize;display:flex;align-items:center;gap:8px}
.count{font-size:11px;color:var(--muted);font-weight:600}
.catnote{color:var(--muted);font-size:12.5px;margin:0 0 10px}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block}
.dot-organ{background:var(--blue)} .dot-nutrient{background:var(--green)} .dot-lens{background:var(--purple)} .dot-seed{background:var(--gold)} .dot-pollen{background:var(--red)}
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
  <p class="lede">The public deposit: the live game, and the material that's actually earned recognition — admitted by the gate, or actually invoked, not just talked about. Every category below is a proposal from THE TYPOLOGY, never a verdict.</p>
  <a class="cta" href="game/index.html">Open the game →</a>
</header>
<nav class="jump">
  <a href="#gifts">Gifts &amp; tributaries (${tributaries.length})</a>
  <a href="#typology">Typology (${manifest.manifest.patterns.length - skillEntries.length - agentEntries.length})</a>
  <a href="#skills">Skills (${skillEntries.length})</a>
  <a href="#agents">Agents (${agentEntries.length})</a>
  <a href="#heldback">Held back</a>
</nav>

<h2 id="gifts">Gifts &amp; tributaries</h2>
<p class="section-note">Every admitted mark, traced back to where it actually came from — a gift card, a session bridge, or (for the corpus's own live day-one walk) the game itself.</p>
<table><tr><th>id</th><th>category</th><th>made</th><th>traced to</th></tr>${giftRows}</table>

<h2 id="typology">The typology</h2>
<p class="section-note">Kevin's six categories (2026-07-24): organ, nutrient, lens, seed, pollen, and tension-only (a membrane-level null with no single-file analogue, not shown here). Assigned by a keyword-floor classifier ported from <code>nesi/conductor/tension_table.py</code> — a proposal, corrected by a felt read, never the other way around.</p>
${typologySections}

<h2 id="skills">Skills</h2>
<p class="section-note">Promoted only if actually run at least once, per real session-transcript evidence — not a mention in a decision log.</p>
${invocationTable(skillEntries, 'skill')}

<h2 id="agents">Agents</h2>
<p class="section-note">The standing lens panel. Same real-invocation gate as skills.</p>
${invocationTable(agentEntries, 'agent')}

<div class="rule"></div>
<h2 id="heldback">Held back</h2>
<p class="section-note">Nothing is silently dropped. This is every skill/agent the pipeline considered and did not promote, and why.</p>
${heldBackHtml}

<footer>Generated ${manifest.generatedBy ? 'by ' + esc(manifest.generatedBy) + ', composed by tools/build_deposit_index.js' : ''} — ${manifest.marksCount} marks read, ${manifest.invocationRootsScanned || 0} session-history root(s) scanned. Regenerate from the source corpus: <code>node tools/build_deposit_public.js &amp;&amp; node tools/build_deposit_index.js</code>.</footer>
</div>
</body>
</html>
`;

  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  console.log(`index.html written — ${tributaries.length} tributaries, ${order.filter((c) => byCategory[c]?.length).length} typology categories, ${skillEntries.length} skill(s), ${agentEntries.length} agent(s)`);
}

main();
