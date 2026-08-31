#!/usr/bin/env node
// The public deposit pipeline. Same recognition signals as build_deposit.js
// (what index.html loads, what the gate has admitted) but with two changes:
//
//   1. No compost folder at all. Unpromoted material is simply left out of
//      this output, not written anywhere public.
//   2. 'inbox' joins 'gate' and 'tools' as a carried-whole mechanism dir —
//      the gift cards, the lens reports, and INDEX.md are the actual record
//      of where a gift came from before it was admitted, not raw compost.
//   3. TRIBUTARIES.json — a derived manifest linking each admitted mark back
//      to the gift card or session-bridge file it traces to, and naming the
//      library-lens scan roots (in-repo sibling trees) gifts are drawn from,
//      without republishing those trees' own content here.
//
// Run from the repo root: node tools/build_deposit_public.js

const fs = require('fs');
const path = require('path');
const {
  GAME2D, MIND, SKILLS_DIR, AGENTS_DIR, copyFile, rmrf, walk,
  traceGameFiles, traceAdmitted, classifyFile, traceRealInvocations,
} = require('./deposit_lib');
const { classify } = require('./typology_classify');

const OUT = path.join(path.resolve(__dirname, '..'), 'nesi_deposit_public');
const MECHANISM_DIRS = ['gate', 'tools', 'inbox'];

// Same roots tools/library_lens.js scans for unrouted capacity — named here,
// not copied, so the public deposit can point at where gifts are drawn from
// without republishing sibling project trees that were never promoted.
// nesi_v2_conductor added 2026-08-31 alongside world3d — both ruled SOIL
// the same day (Kevin's mark), both now real mining roots, not just named.
const LENS_ROOTS = ['world2d/scripts', 'world3d', '_overnight_build', 'bench', 'nesi_bench_v0', 'game2d/_compost', 'nesi_v2_conductor'];

function findGiftCard(giftId) {
  // MARKS id: gift_08_ratify_by_crossing  ->  inbox/gift_2026-08-27_08_ratify_by_crossing.md
  // Matched on the gift number only — the id's own slug and the card
  // filename's slug don't always agree word-for-word (e.g. gift_13:
  // "burn_shape3_test" vs. the card's "the_burn"), same gift either way.
  const m = /^gift_(\d+)_/.exec(giftId);
  if (!m) return null;
  const [, num] = m;
  const inboxDir = path.join(GAME2D, 'inbox');
  if (!fs.existsSync(inboxDir)) return null;
  const hit = fs.readdirSync(inboxDir).find((f) => new RegExp(`_${num}_[^/]*\\.md$`).test(f));
  return hit ? `inbox/${hit}` : null;
}

function findSessionBridge(markAt) {
  const resolved = path.resolve(path.join(GAME2D, 'gate'), markAt);
  if (resolved.startsWith(MIND) && fs.existsSync(resolved)) {
    return path.relative(path.resolve(path.join(GAME2D, '..')), resolved).replace(/\\/g, '/');
  }
  return null;
}

function main() {
  rmrf(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  const { gameFiles, knowledgeFromMind } = traceGameFiles();
  const { marks, admittedGamePaths, admittedMindPaths, gateMechanism } = traceAdmitted();

  const gameSet = new Set(gameFiles);
  const patternsFromGame = new Set([...admittedGamePaths, ...gateMechanism]);

  const allGame2dFiles = walk(GAME2D);
  const manifest = { game: [], patterns: [] };

  for (const rel of allGame2dFiles) {
    const top = rel.split(path.sep)[0];
    let bucket = null;
    if (gameSet.has(rel)) bucket = 'game';
    else if (patternsFromGame.has(rel) || MECHANISM_DIRS.includes(top)) bucket = 'patterns';
    if (!bucket) continue; // everything else: left out, not copied anywhere

    const src = path.join(GAME2D, rel);
    const destRoot = bucket === 'game'
      ? path.join(OUT, 'game', rel)
      : path.join(OUT, 'patterns', 'game-gate', rel);
    copyFile(src, destRoot);
    if (bucket === 'patterns') manifest.patterns.push({ path: `game2d/${rel}`, category: classifyFile(src) });
    else manifest[bucket].push(`game2d/${rel}`);
  }

  const patternsFromMind = new Set(['LEARNED.md', ...admittedMindPaths]);
  if (knowledgeFromMind) patternsFromMind.add(knowledgeFromMind);

  for (const rel of patternsFromMind) {
    const src = path.join(MIND, rel);
    if (!fs.existsSync(src)) continue;
    copyFile(src, path.join(OUT, 'patterns', rel));
    manifest.patterns.push({ path: `mind/${rel}`, category: classifyFile(src) });
  }

  if (!knowledgeFromMind) {
    const kRe = /KNOWLEDGE_FILE\s*=\s*["']([^"']+)["']/;
    const html = fs.readFileSync(path.join(GAME2D, 'index.html'), 'utf8');
    const km = kRe.exec(html);
    if (km && fs.existsSync(path.join(GAME2D, km[1])) && !gameSet.has(km[1])) {
      copyFile(path.join(GAME2D, km[1]), path.join(OUT, 'game', km[1]));
      manifest.game.push(`game2d/${km[1]}`);
    }
  }

  // --- Tributaries: where each admitted mark traces back to, and what kind
  // of thing it is (THE TYPOLOGY: organ/nutrient/lens/seed/pollen — Kevin's
  // mark 2026-07-24, ported from nesi/conductor/tension_table.py 2026-08-31).
  // Classified on the gift card's own text where one exists (richer blob
  // than the one-line "made" field), falling back to "made" alone. A
  // proposal, same as the source — never a verdict.
  const tributaries = marks.map((m) => {
    const entry = { id: m.id, made: m.made, at: m.at || null };
    if (m.id?.startsWith('gift_')) {
      entry.card = findGiftCard(m.id);
      entry.sourceRoots = LENS_ROOTS;
      entry.sourceNote = 'candidates surfaced by tools/library_lens.js scanning the sourceRoots below; '
        + 'the full scan record is in patterns/game-gate/inbox/LENS_REPORT_2026-08-27.md and '
        + 'K_LENS_REPORT_2026-08-28.md. Root trees themselves are not republished here.';
      const cardPath = entry.card ? path.join(GAME2D, entry.card) : null;
      entry.category = cardPath ? classifyFile(cardPath, m.made) : classify(m.made);
    } else if (m.id?.startsWith('session_bridge_') && m.at) {
      entry.bridge = findSessionBridge(m.at);
      const bridgePath = entry.bridge ? path.join(GAME2D, '..', entry.bridge) : null;
      entry.category = bridgePath ? classifyFile(bridgePath, m.made) : classify(m.made);
    } else {
      entry.category = classify(m.made);
    }
    return entry;
  });
  fs.writeFileSync(path.join(OUT, 'TRIBUTARIES.json'), JSON.stringify(tributaries, null, 2));

  // Move 2, Kevin's mark 2026-08-31: skills/agents promote on real
  // invocation evidence only — see build_deposit.js for the full rationale.
  // Public deposit gets the same gate; a skill/agent nobody has actually
  // run doesn't ship, and heldBack names it rather than hiding it.
  const { skills, agents, rootsFound } = traceRealInvocations();
  const heldBack = { skills: [], agents: [] };

  for (const [name, info] of Object.entries(skills)) {
    if (info.count < 1) { heldBack.skills.push(name); continue; }
    const src = path.join(SKILLS_DIR, info.folder);
    const dest = path.join(OUT, 'patterns', 'skills', info.folder);
    for (const rel of walk(src)) copyFile(path.join(src, rel), path.join(dest, rel));
    manifest.patterns.push({
      path: `.claude/skills/${info.folder}`, category: classifyFile(path.join(src, 'SKILL.md')),
      realInvocations: info.count, lastInvoked: info.lastTs,
    });
  }
  for (const [name, info] of Object.entries(agents)) {
    if (info.direct + info.adopted < 1) { heldBack.agents.push(name); continue; }
    const src = path.join(AGENTS_DIR, name + '.md');
    copyFile(src, path.join(OUT, 'patterns', 'agents', name + '.md'));
    manifest.patterns.push({
      path: `.claude/agents/${name}.md`, category: classifyFile(src),
      realInvocations: { direct: info.direct, adopted: info.adopted }, lastInvoked: info.lastTs,
    });
  }

  const typologyCounts = {};
  for (const p of manifest.patterns) typologyCounts[p.category] = (typologyCounts[p.category] || 0) + 1;

  fs.writeFileSync(
    path.join(OUT, 'MANIFEST.json'),
    JSON.stringify({
      generatedBy: 'tools/build_deposit_public.js', marksCount: marks.length, invocationRootsScanned: rootsFound,
      typologyCounts, heldBack, manifest,
    }, null, 2)
  );

  console.log(`game:        ${manifest.game.length} file(s)`);
  console.log(`patterns:    ${manifest.patterns.length} file(s) (${marks.length} marks read) — ${JSON.stringify(typologyCounts)}`);
  console.log(`  held back (0 real invocations): ${heldBack.skills.length} skill(s), ${heldBack.agents.length} agent(s)`);
  console.log(`tributaries: ${tributaries.length} entries`);
  console.log('compost:     not included in the public output');
}

main();
