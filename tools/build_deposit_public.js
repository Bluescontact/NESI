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
  ROOT, GAME2D, MIND, SKILLS_DIR, AGENTS_DIR, copyFile, rmrf, walk, closedMarkIds, copyFileRedactingClosed,
  traceGameFiles, traceAdmitted, classifyFile, traceRealInvocations,
  PIPELINE_MECHANISM, isPublicDebris, DENAME_EXTS, denamePublicText,
} = require('./deposit_lib');
const { classify } = require('./typology_classify');
const { SPINE_DOC } = require('./spine');

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
  // Clear only the generated content, never the whole OUT dir — that would
  // also delete .git. Same bug, same fix as build_deposit.js's earlier one;
  // this file never got it, and it silently ate nesi_deposit_public/.git
  // on every rerun since the OneDrive relocation. Found 2026-08-31 when a
  // requested diff against origin/main turned up unrelated main-corpus
  // files in what should have been the deposit's own history — the real
  // symptom was git commands "in nesi_deposit_public" silently operating
  // on the parent repo instead, because there was no nested repo there to
  // receive them.
  rmrf(path.join(OUT, 'game'));
  rmrf(path.join(OUT, 'patterns'));
  fs.rmSync(path.join(OUT, 'MANIFEST.json'), { force: true });
  fs.rmSync(path.join(OUT, 'TRIBUTARIES.json'), { force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const { gameFiles, knowledgeFromMind } = traceGameFiles();
  const { marks, admittedGamePaths, admittedMindPaths, admittedRootPaths, gateMechanism } = traceAdmitted();

  const gameSet = new Set(gameFiles);
  const patternsFromGame = new Set([...admittedGamePaths, ...gateMechanism]);

  const allGame2dFiles = walk(GAME2D);
  const manifest = { game: [], patterns: [] };
  const closedIds = closedMarkIds();
  // 2026-08-31 audit (Kevin's mark: "inventory, audit, and reform what's
  // on the git"): the bulk mechanism-carry was shipping creation debris —
  // tools/retired/ (20 files), a LEDGER backup, a .pre_gate dotfile —
  // while the README claimed retired passes stay private. Excluded now,
  // counted and named in MANIFEST.json rather than silently dropped.
  const excludedDebris = [];

  for (const rel of allGame2dFiles) {
    const top = rel.split(path.sep)[0];
    // gate/CLOSED.jsonl names why a mark is closed — appropriate to keep
    // locally (the private deposit never leaves this machine without a
    // separate, explicit push), but its own closure text still names the
    // person involved, so it does not belong in the public deposit at all.
    if (rel === 'gate/CLOSED.jsonl' || rel === path.join('gate', 'CLOSED.jsonl')) continue;
    let bucket = null;
    if (gameSet.has(rel)) bucket = 'game';
    else if (patternsFromGame.has(rel) || MECHANISM_DIRS.includes(top)) bucket = 'patterns';
    if (!bucket) continue; // everything else: left out, not copied anywhere
    if (bucket === 'patterns' && isPublicDebris(rel)) {
      excludedDebris.push('game2d/' + rel.replace(/\\/g, '/'));
      continue;
    }

    const src = path.join(GAME2D, rel);
    const destRoot = bucket === 'game'
      ? path.join(OUT, 'game', rel)
      : path.join(OUT, 'patterns', 'game-gate', rel);
    copyFileRedactingClosed(rel, src, destRoot, closedIds);
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

  // Invocation evidence is traced BEFORE the root loop so root-level
  // admissions that point into .claude/skills/ can defer to the skills
  // shelf instead of writing a second copy (2026-08-31 audit: the
  // the-closing-check SKILL.md shipped twice — once via its mark under
  // patterns/root/, once via promotion under patterns/skills/ — two
  // copies of one file, the exact drift crystal 7 names).
  const { skills, agents, rootsFound } = traceRealInvocations();
  const promotedSkillFolders = new Set(
    Object.values(skills).filter((s) => s.count >= 1).map((s) => s.folder)
  );

  // Root-level admissions (e.g. tools/k_lens.js) — copied individually,
  // never walked; ROOT is the whole corpus and almost none of it belongs
  // in the public deposit. Only what a real mark actually points to.
  const carriedBySkillsShelf = [];
  for (const rel of admittedRootPaths) {
    const src = path.join(ROOT, rel);
    const norm = rel.replace(/\\/g, '/');
    // The spine (Kevin's mark 2026-08-31: "assemble the deposits onto
    // them. Thats the spine.") is the deposit's upstream layer — it lands
    // at the top level, before game/ and patterns/, not filed under them.
    if (norm === SPINE_DOC) {
      copyFile(src, path.join(OUT, path.basename(rel)));
      manifest.spine = path.basename(rel);
      continue;
    }
    // A mark pointing into a skill folder the shelf already promotes:
    // the shelf's copy is the one copy; the mark is honored in the
    // manifest without a duplicate file.
    const skillMatch = /^\.claude\/skills\/([^/]+)\//.exec(norm);
    if (skillMatch && promotedSkillFolders.has(skillMatch[1])) {
      carriedBySkillsShelf.push(norm);
      continue;
    }
    copyFile(src, path.join(OUT, 'patterns', 'root', rel));
    manifest.patterns.push({ path: `root/${rel}`, category: classifyFile(src) });
  }

  // The pipeline mechanism, shipped complete (see deposit_lib.js's
  // PIPELINE_MECHANISM note) — the deposit's own builder must run for a
  // stranger, and spine.js must travel with the index that renders it.
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
      // Direct admission — no gift card, no session bridge, just a mark
      // pointing straight at a real file (e.g. tools/k_lens.js). "at" IS
      // the traced-to location here; resolve it to a manifest-style path
      // (game2d/…, mind/…, root/…) so the index can link it directly.
      const gateDir = path.join(GAME2D, 'gate');
      const resolved = m.at ? path.resolve(gateDir, m.at) : null;
      if (resolved && fs.existsSync(resolved)) {
        if (resolved.startsWith(GAME2D)) entry.direct = 'game2d/' + path.relative(GAME2D, resolved).replace(/\\/g, '/');
        else if (resolved.startsWith(MIND)) entry.direct = 'mind/' + path.relative(MIND, resolved).replace(/\\/g, '/');
        else if (resolved.startsWith(ROOT)) entry.direct = 'root/' + path.relative(ROOT, resolved).replace(/\\/g, '/');
      }
      entry.category = resolved && fs.existsSync(resolved) ? classifyFile(resolved, m.made) : classify(m.made);
    }
    return entry;
  });
  fs.writeFileSync(path.join(OUT, 'TRIBUTARIES.json'), JSON.stringify(tributaries, null, 2));

  // Move 2, Kevin's mark 2026-08-31: skills/agents promote on real
  // invocation evidence only — see build_deposit.js for the full rationale.
  // Public deposit gets the same gate; a skill/agent nobody has actually
  // run doesn't ship, and heldBack names it rather than hiding it.
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
  // of the pipeline for now." A naming/identity policy, not a usage
  // judgment — real invocation counts shown for context, not as cause.
  // Agent NAMES are individuals' names and do not cross into the public
  // copy (Kevin's marks 2026-08-31: the agents ruling + "lets remove
  // kevin from the work"); the count and the reason cross, the names stay
  // in the source corpus.
  let agentIdx = 0;
  for (const [, info] of Object.entries(agents)) {
    agentIdx++;
    heldBack.agents.push({
      name: `agent ${agentIdx} of ${Object.keys(agents).length}`,
      reason: "v0.1 — named after an individual (name withheld from the public copy); awaiting its own development pass before deposit",
      realInvocations: { direct: info.direct, adopted: info.adopted },
    });
  }

  const typologyCounts = {};
  for (const p of manifest.patterns) typologyCounts[p.category] = (typologyCounts[p.category] || 0) + 1;

  fs.writeFileSync(
    path.join(OUT, 'MANIFEST.json'),
    JSON.stringify({
      generatedBy: 'tools/build_deposit_public.js', marksCount: marks.length, invocationRootsScanned: rootsFound,
      typologyCounts, heldBack,
      excludedDebris, carriedBySkillsShelf,
      manifest,
    }, null, 2)
  );

  // The de-naming post-pass: every text file in the public output, after
  // all copies and manifests are written. See deposit_lib.js's
  // denamePublicText note — copies transformed, sources verbatim.
  let denamed = 0;
  for (const rel of walk(OUT)) {
    const norm = rel.replace(/\\/g, '/');
    if (norm.startsWith('.git/') || norm.startsWith('_archive/')) continue;
    if (!DENAME_EXTS.has(path.extname(rel).toLowerCase())) continue;
    const full = path.join(OUT, rel);
    const before = fs.readFileSync(full, 'utf8');
    const after = denamePublicText(before);
    if (after !== before) { fs.writeFileSync(full, after); denamed++; }
  }

  console.log(`game:        ${manifest.game.length} file(s)`);
  console.log(`de-named:    ${denamed} file(s) transformed at the crossing (the keeper)`);
  console.log(`patterns:    ${manifest.patterns.length} file(s) (${marks.length} marks read) — ${JSON.stringify(typologyCounts)}`);
  console.log(`  held back: ${heldBack.skills.length} skill(s) (0 real invocations), ${heldBack.agents.length} agent(s) (v0.1, pending development)`);
  console.log(`tributaries: ${tributaries.length} entries`);
  console.log(`excluded:    ${excludedDebris.length} debris file(s) (retired/backup/dotfile — named in MANIFEST.json); ${carriedBySkillsShelf.length} root admission(s) deduped to the skills shelf`);
  console.log('compost:     not included in the public output');
}

main();
