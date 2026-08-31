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
  PIPELINE_MECHANISM,
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

  // Crystal-7 resolution, 2026-08-31: compost/ is a full mirror of
  // nesi/game2d + nesi/mind, and a reading pass flagged it as "two live,
  // writable, indistinguishable copies of the law." It is DERIVED — this
  // marker names the winner and the regeneration path, and the rmrf above
  // means any edit made here is destroyed on the next run, which the
  // marker says out loud so no one loses work to it.
  fs.mkdirSync(path.join(OUT, 'compost'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'compost', '_DERIVED_DO_NOT_EDIT.md'),
`# DERIVED COPY — never edit here

Everything under compost/ (and game/, patterns/) is REGENERATED from the
source corpus by \`tools/build_deposit.js\` on every run; this whole tree is
deleted and rebuilt each time. The source of truth is the corpus itself
(nesi/game2d, nesi/mind, and the paths the gate's marks point to). An edit
made here is not a fork of the law — it is work that will be silently
destroyed on the next pipeline run. Edit the source, then re-run:

    node tools/build_deposit.js
`);

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

  // Invocation evidence traced before the root loop — same dedup as the
  // public pipeline (2026-08-31 audit): a mark pointing into a skill
  // folder the shelf promotes defers to the shelf's one copy.
  const { skills, agents, rootsFound } = traceRealInvocations();
  const promotedSkillFolders = new Set(
    Object.values(skills).filter((s) => s.count >= 1).map((s) => s.folder)
  );

  // Root-level admissions (e.g. tools/k_lens.js) — copied individually, not
  // walked, since ROOT is the whole corpus and almost none of it belongs
  // in the deposit. Only what a real mark actually points to.
  const carriedBySkillsShelf = [];
  for (const rel of admittedRootPaths) {
    const src = path.join(ROOT, rel);
    const norm = rel.replace(/\\/g, '/');
    // The spine (Kevin's mark 2026-08-31: "assemble the deposits onto
    // them. Thats the spine.") lands at the deposit's top level, before
    // game/ and patterns/ — see tools/spine.js, the seating's one source.
    if (norm === SPINE_DOC) {
      copyFile(src, path.join(OUT, path.basename(rel)));
      manifest.spine = path.basename(rel);
      continue;
    }
    const skillMatch = /^\.claude\/skills\/([^/]+)\//.exec(norm);
    if (skillMatch && promotedSkillFolders.has(skillMatch[1])) {
      carriedBySkillsShelf.push(norm);
      continue;
    }
    copyFile(src, path.join(OUT, 'patterns', 'root', rel));
    manifest.patterns.push({ path: `root/${rel}`, category: classifyFile(src) });
  }

  // The pipeline mechanism, shipped complete — same reform as the public
  // pipeline; see deposit_lib.js's PIPELINE_MECHANISM note.
  for (const rel of PIPELINE_MECHANISM) {
    const src = path.join(ROOT, rel);
    if (!fs.existsSync(src)) continue;
    const dest = path.join(OUT, 'patterns', 'root', rel);
    if (fs.existsSync(dest)) continue; // already carried by its own mark
    copyFile(src, dest);
    manifest.patterns.push({ path: `root/${rel}`, category: classifyFile(src), via: 'pipeline-mechanism' });
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
  // (skills/agents/rootsFound traced above, before the root loop.)
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
      typologyCounts, heldBack, carriedBySkillsShelf, manifest,
    }, null, 2)
  );

  console.log(`game:     ${manifest.game.length} file(s)`);
  console.log(`patterns: ${manifest.patterns.length} file(s) (${marks.length} marks read) — ${JSON.stringify(typologyCounts)}`);
  console.log(`  held back: ${heldBack.skills.length} skill(s) (0 real invocations), ${heldBack.agents.length} agent(s) (v0.1, pending development)`);
  console.log(`compost:  ${manifest.compost.length} file(s)`);
}

main();
