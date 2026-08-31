#!/usr/bin/env node
// The full deposit pipeline (private). Re-derives nesi_deposit/{game,patterns,
// compost} from the live corpus every run — never hand-sorted.
//
// game      — traced from what nesi/game2d/index.html actually <script src>/
//             <link href>'s. Not "everything in game2d," what's wired.
// patterns  — anything with a real admission record: every "at" path in
//             nesi/game2d/gate/MARKS.jsonl, plus LEARNED.md (self-admitting),
//             plus the gate mechanism itself (gate.mjs, admit.mjs, check_all.js,
//             instruments/) — a reusable pattern in its own right, not just
//             game plumbing.
// compost   — everything else in nesi/game2d and nesi/mind, kept whole and
//             named. Nothing here is thrown away; it just isn't promoted.
//
// Run from the repo root: node tools/build_deposit.js

const fs = require('fs');
const path = require('path');
const {
  ROOT, GAME2D, MIND, SKILLS_DIR, AGENTS_DIR, copyFile, rmrf, walk, closedMarkIds, copyFileRedactingClosed,
  traceGameFiles, traceAdmitted, classifyFile, traceRealInvocations,
} = require('./deposit_lib');
const { SPINE_DOC } = require('./spine');

const OUT = path.join(path.resolve(__dirname, '..'), 'nesi_deposit');

function main() {
  // Clear only the generated subfolders/files — never the whole OUT dir,
  // which would also delete .git and any hand-authored README sitting there.
  rmrf(path.join(OUT, 'game'));
  rmrf(path.join(OUT, 'patterns'));
  rmrf(path.join(OUT, 'compost'));
  fs.mkdirSync(OUT, { recursive: true });

  const { gameFiles, knowledgeFromMind } = traceGameFiles();
  const { marks, admittedGamePaths, admittedMindPaths, admittedRootPaths, gateMechanism } = traceAdmitted();

  const gameSet = new Set(gameFiles);
  const patternsFromGame = new Set([...admittedGamePaths, ...gateMechanism]);

  const allGame2dFiles = walk(GAME2D);
  const allMindFiles = walk(MIND);

  const manifest = { game: [], patterns: [], compost: [] };
  const closedIds = closedMarkIds();

  for (const rel of allGame2dFiles) {
    const top = rel.split(path.sep)[0];
    let bucket;
    if (gameSet.has(rel)) bucket = 'game';
    else if (patternsFromGame.has(rel) || gateMechanism.includes(top)) bucket = 'patterns';
    else bucket = 'compost';

    const src = path.join(GAME2D, rel);
    const destRoot = bucket === 'game' ? path.join(OUT, 'game', rel)
      : bucket === 'patterns' ? path.join(OUT, 'patterns', 'game-gate', rel)
      : path.join(OUT, 'compost', 'game2d', rel);
    copyFileRedactingClosed(rel, src, destRoot, closedIds);
    if (bucket === 'patterns') manifest.patterns.push({ path: `game2d/${rel}`, category: classifyFile(src) });
    else manifest[bucket].push(`game2d/${rel}`);
  }

  const patternsFromMind = new Set(['LEARNED.md', ...admittedMindPaths]);
  if (knowledgeFromMind) patternsFromMind.add(knowledgeFromMind);

  for (const rel of allMindFiles) {
    const bucket = patternsFromMind.has(rel) ? 'patterns' : 'compost';
    const src = path.join(MIND, rel);
    const destRoot = bucket === 'patterns'
      ? path.join(OUT, 'patterns', rel)
      : path.join(OUT, 'compost', 'mind', rel);
    copyFile(src, destRoot);
    if (bucket === 'patterns') manifest.patterns.push({ path: `mind/${rel}`, category: classifyFile(src) });
    else manifest[bucket].push(`mind/${rel}`);
  }

  // Root-level admissions (e.g. tools/k_lens.js) — copied individually, not
  // walked, since ROOT is the whole corpus and almost none of it belongs
  // in the deposit. Only what a real mark actually points to.
  for (const rel of admittedRootPaths) {
    const src = path.join(ROOT, rel);
    // The spine (Kevin's mark 2026-08-31: "assemble the deposits onto
    // them. Thats the spine.") lands at the deposit's top level, before
    // game/ and patterns/ — see tools/spine.js, the seating's one source.
    if (rel.replace(/\\/g, '/') === SPINE_DOC) {
      copyFile(src, path.join(OUT, path.basename(rel)));
      manifest.spine = path.basename(rel);
      continue;
    }
    copyFile(src, path.join(OUT, 'patterns', 'root', rel));
    manifest.patterns.push({ path: `root/${rel}`, category: classifyFile(src) });
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

  // Move 2, Kevin's mark 2026-08-31: skills/agents only promote on real
  // invocation evidence (session transcripts), not the mark-log proxy that
  // undercounted full-development 38x and overcounted record-audit 3-to-0.
  // A skill/agent with zero real invocations is held back, not silently
  // dropped — heldBack below names every one.
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
  // Agents: NOT promoted, regardless of invocation count. Kevin's mark,
  // 2026-08-31: "what i have built with the 6 agents is a v0.1. I dont
  // want to use any individual's name for an agent or process. So each of
  // the 6 deserves it's own development pass... so those stay on this side
  // of the pipeline for now." This is a naming/identity policy, not a
  // usage judgment — several of the 6 have real invocation counts in the
  // dozens, shown here for context, not as the reason they're held back.
  for (const [name, info] of Object.entries(agents)) {
    heldBack.agents.push({
      name, reason: "v0.1 — named after an individual; awaiting its own development pass before deposit",
      realInvocations: { direct: info.direct, adopted: info.adopted },
    });
  }

  const typologyCounts = {};
  for (const p of manifest.patterns) typologyCounts[p.category] = (typologyCounts[p.category] || 0) + 1;

  fs.writeFileSync(
    path.join(OUT, 'MANIFEST.json'),
    JSON.stringify({
      generatedBy: 'tools/build_deposit.js', marksCount: marks.length, invocationRootsScanned: rootsFound,
      typologyCounts, heldBack, manifest,
    }, null, 2)
  );

  console.log(`game:     ${manifest.game.length} file(s)`);
  console.log(`patterns: ${manifest.patterns.length} file(s) (${marks.length} marks read) — ${JSON.stringify(typologyCounts)}`);
  console.log(`  held back: ${heldBack.skills.length} skill(s) (0 real invocations), ${heldBack.agents.length} agent(s) (v0.1, pending development)`);
  console.log(`compost:  ${manifest.compost.length} file(s)`);
}

main();
