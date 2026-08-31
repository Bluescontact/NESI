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
  GAME2D, MIND, copyFile, rmrf, walk, traceGameFiles, traceAdmitted, classifyFile,
} = require('./deposit_lib');

const OUT = path.join(path.resolve(__dirname, '..'), 'nesi_deposit');

function main() {
  // Clear only the generated subfolders/files — never the whole OUT dir,
  // which would also delete .git and any hand-authored README sitting there.
  rmrf(path.join(OUT, 'game'));
  rmrf(path.join(OUT, 'patterns'));
  rmrf(path.join(OUT, 'compost'));
  fs.mkdirSync(OUT, { recursive: true });

  const { gameFiles, knowledgeFromMind } = traceGameFiles();
  const { marks, admittedGamePaths, admittedMindPaths, gateMechanism } = traceAdmitted();

  const gameSet = new Set(gameFiles);
  const patternsFromGame = new Set([...admittedGamePaths, ...gateMechanism]);

  const allGame2dFiles = walk(GAME2D);
  const allMindFiles = walk(MIND);

  const manifest = { game: [], patterns: [], compost: [] };

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
    copyFile(src, destRoot);
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

  if (!knowledgeFromMind) {
    const kRe = /KNOWLEDGE_FILE\s*=\s*["']([^"']+)["']/;
    const html = fs.readFileSync(path.join(GAME2D, 'index.html'), 'utf8');
    const km = kRe.exec(html);
    if (km && fs.existsSync(path.join(GAME2D, km[1])) && !gameSet.has(km[1])) {
      copyFile(path.join(GAME2D, km[1]), path.join(OUT, 'game', km[1]));
      manifest.game.push(`game2d/${km[1]}`);
    }
  }

  const typologyCounts = {};
  for (const p of manifest.patterns) typologyCounts[p.category] = (typologyCounts[p.category] || 0) + 1;

  fs.writeFileSync(
    path.join(OUT, 'MANIFEST.json'),
    JSON.stringify({ generatedBy: 'tools/build_deposit.js', marksCount: marks.length, typologyCounts, manifest }, null, 2)
  );

  console.log(`game:     ${manifest.game.length} file(s)`);
  console.log(`patterns: ${manifest.patterns.length} file(s) (${marks.length} marks read) — ${JSON.stringify(typologyCounts)}`);
  console.log(`compost:  ${manifest.compost.length} file(s)`);
}

main();
