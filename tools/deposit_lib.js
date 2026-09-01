// Shared tracing logic for the deposit pipelines (build_deposit.js,
// build_deposit_public.js). Both derive from the same two signals: what
// index.html actually loads, and what the gate has actually admitted.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { classify } = require('./typology_classify');

const ROOT = path.resolve(__dirname, '..');
const GAME2D = path.join(ROOT, 'nesi', 'game2d');
const MIND = path.join(ROOT, 'nesi', 'mind');
const SKILLS_DIR = path.join(ROOT, '.claude', 'skills');
const AGENTS_DIR = path.join(ROOT, '.claude', 'agents');
// Same named-not-globbed project slugs as skill_invocation_check.js /
// agent_invocation_check.js — see those files' headers for why.
const PROJECT_SLUGS = [
  'C--Users-KMEAR-OneDrive-Desktop-DSS-content',
  'C--Users-KMEAR-dev-DSS-content',
];
const PROJECTS_ROOT = path.join(os.homedir(), '.claude', 'projects');

function readLines(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// Every closed mark id — see gate/CLOSED.jsonl. Exported so pipelines can
// redact, not just skip promoting, a closed mark's raw ledger line.
function closedMarkIds() {
  return new Set(
    readLines(path.join(GAME2D, 'gate', 'CLOSED.jsonl'))
      .map((line) => { try { return JSON.parse(line).id; } catch { return null; } })
      .filter(Boolean)
  );
}

// Copies a file, except: if it's gate/MARKS.jsonl (the one file that could
// ever carry a closed mark's own line), lines whose "id" is closed are
// dropped from the COPY only — the source ledger at nesi/game2d/gate/
// keeps its append-only line, untouched, same law every other ledger in
// this corpus holds. "Not to be routed" (Kevin's mark, 2026-08-31) means
// the deposit's own copy of the ledger can't carry the line either, even
// though the copy is otherwise a verbatim mirror of the gate mechanism.
function copyFileRedactingClosed(rel, src, dest, closedIds) {
  const isMarksLedger = rel === 'gate/MARKS.jsonl' || rel === path.join('gate', 'MARKS.jsonl');
  if (!isMarksLedger || closedIds.size === 0) return copyFile(src, dest);
  const kept = readLines(src).filter((line) => {
    let id;
    try { id = JSON.parse(line).id; } catch { return true; }
    return !closedIds.has(id);
  });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, kept.join('\n') + (kept.length ? '\n' : ''));
}

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

// The pipeline mechanism's own files, shipped together so the deposit's
// build_deposit_public.js actually RUNS for a stranger (it requires
// deposit_lib and spine) and so the seating's single source (spine.js —
// crystal 7) travels with the index that renders it. Found by the
// 2026-08-31 deposit audit: the deposit_pipeline mark's "at" points at
// one file, but the mechanism is four more.
const PIPELINE_MECHANISM = [
  'tools/deposit_lib.js',
  'tools/spine.js',
  'tools/typology_classify.js',
  'tools/build_deposit.js',
  'tools/build_deposit_index.js',
  'tools/build_weave.js',
];

// De-naming at the crossing (Kevin's mark, 2026-08-31: "lets remove kevin
// from the work"). The PUBLIC deposit replaces the author's name with the
// role-word "the keeper" in every copied text file — the same mechanism
// class as the consent redaction: the transform runs on COPIES only, the
// source corpus's records stay verbatim, the append-only law is intact.
// Grounded in the corpus's own commons rule
// (frameworks/composting_a_situation_into_the_commons.md): "What crosses
// into the commons is pattern, never instance... There is no one in it."
// The transform is deterministic and declared (index glossary + README),
// never silent.
const DENAME_EXTS = new Set(['.md', '.html', '.htm', '.js', '.mjs', '.py', '.json', '.jsonl', '.txt', '.css', '.conf', '.sql', '.ts', '.tsx', '.yml', '.yaml', '.svg']);
function denamePublicText(text) {
  let t = text;
  // Specific forms first, so the general pass can't mangle them.
  t = t.replace(/kevin[-_]?lens/gi, 'a held-back lens agent');
  t = t.replace(/kevins-water/gi, 'keepers-water'); // filename form, coupled to game2d's data file
  t = t.replace(/Kevin Mears/g, 'the keeper');
  t = t.replace(/KEVIN'S/g, "THE KEEPER'S").replace(/KEVIN/g, 'THE KEEPER');
  t = t.replace(/Kevin's/g, "the keeper's").replace(/kevin's/g, "the keeper's");
  t = t.replace(/Kevin/g, 'the keeper').replace(/\bkevin\b/g, 'the keeper');
  t = t.replace(/\bkevins\b/gi, "the keeper's");
  // Catch-all for embedded residue (identifiers, regex literals in this
  // file's own shipped copy): any remaining substring, any case.
  t = t.replace(/kevin/gi, 'keeper');
  // Re-capitalize at sentence and line starts.
  t = t.replace(/(^|[.!?]\s+|\n\s*)the keeper/g, (m, p) => p + 'The keeper');
  return t;
}

// The sublimation stage (Kevin's mark, 2026-09-01: "do the same
// crystallization pass on previous deposits... use the soil deposited to
// allow a new medium to sublimate/deposit"). A session-instance record
// with a crystallized counterpart — same filename, in a crystallized/
// sibling folder — crosses into the PUBLIC deposit as the counterpart,
// at the SAME public path, so links and marks hold. The source corpus
// keeps both phases: the working record verbatim, the crystal beside it.
// The private deposit keeps the raw record (the named record is the
// private side's job).
function crystallizedCounterpart(srcAbs) {
  const dir = path.dirname(srcAbs);
  const candidate = path.join(dir, 'crystallized', path.basename(srcAbs));
  return fs.existsSync(candidate) ? candidate : null;
}

// Creation debris that must not ship in the PUBLIC deposit (the private
// deposit keeps everything): retired instruments, backup layers, and
// dot-prefixed working files. The source corpus keeps all of it whole —
// supersession stays a layer THERE; the public deposit is the gift, and
// "any reader could pick it up, and not have to remove any debris of its
// creation before use" (Kevin's mark). Exclusions are counted and named
// in MANIFEST.json, never silent.
function isPublicDebris(rel) {
  const norm = rel.replace(/\\/g, '/');
  const base = norm.split('/').pop();
  if (norm.split('/').includes('retired')) return true;
  if (/\.backup[_.]/.test(base)) return true;
  if (base.startsWith('.')) return true;
  return false;
}

function walk(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, base));
    else out.push(path.relative(base, full));
  }
  return out;
}

// What index.html actually <script src>/<link href>'s, plus its KNOWLEDGE_FILE.
function traceGameFiles() {
  const indexPath = path.join(GAME2D, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  const files = new Set(['index.html']);

  const srcRe = /<(?:script|img)\s[^>]*src=["']([^"':/][^"']*)["']/g;
  const hrefRe = /<link\s[^>]*href=["']([^"']*)["']/g;
  for (const re of [srcRe, hrefRe]) {
    let m;
    while ((m = re.exec(html))) {
      if (fs.existsSync(path.join(GAME2D, m[1]))) files.add(m[1]);
    }
  }

  const knowledgeRe = /KNOWLEDGE_FILE\s*=\s*["']([^"']+)["']/;
  const km = knowledgeRe.exec(html);
  let knowledgeFromMind = null;
  if (km && fs.existsSync(path.join(MIND, km[1]))) knowledgeFromMind = km[1];

  return { gameFiles: [...files], knowledgeFromMind };
}

// Recognition capacity: every path a real mark in MARKS.jsonl points to —
// except a mark closed in gate/CLOSED.jsonl. CLOSED is checked here, once,
// so every pipeline that calls traceAdmitted() inherits the exclusion
// automatically; a mark closed for consent reasons must never depend on
// each pipeline separately remembering to filter it. See gate/CLOSED.jsonl
// for the first entry and why (Kevin's mark, 2026-08-31: consent
// withdrawn — never mined, routed, or read again in any future session).
function traceAdmitted() {
  const closedIds = new Set(
    readLines(path.join(GAME2D, 'gate', 'CLOSED.jsonl'))
      .map((line) => { try { return JSON.parse(line).id; } catch { return null; } })
      .filter(Boolean)
  );
  const marks = readLines(path.join(GAME2D, 'gate', 'MARKS.jsonl'))
    .map((line) => { try { return JSON.parse(line); } catch { return null; } })
    .filter(Boolean)
    .filter((m) => !closedIds.has(m.id));

  const admittedGamePaths = new Set();
  const admittedMindPaths = new Set();
  // Root-level admissions — e.g. tools/k_lens.js, admitted 2026-08-31. The
  // gate's own "at" field isn't scoped to game2d/mind; a mark can point
  // anywhere under the corpus root. Missed entirely until this admission
  // surfaced the gap: the mark existed, the pipeline just never looked
  // outside GAME2D/MIND for what it pointed at.
  const admittedRootPaths = new Set();
  const GATE_DIR = path.join(GAME2D, 'gate'); // admit.mjs runs with cwd here — "at" is relative to it
  for (const m of marks) {
    if (!m.at) continue;
    let resolved = path.resolve(GATE_DIR, m.at);
    // Reconciliation 2026-09-01: one early mark (the relocation bridge, of
    // all things) wrote its "at" corpus-root-relative, before the path
    // convention settled. The ledger is append-only, so the READING heals
    // rather than the record: gate-relative first, corpus-root fallback.
    if (!fs.existsSync(resolved)) resolved = path.resolve(ROOT, m.at);
    if (!fs.existsSync(resolved)) continue;
    if (resolved.startsWith(GAME2D)) admittedGamePaths.add(path.relative(GAME2D, resolved));
    else if (resolved.startsWith(MIND)) admittedMindPaths.add(path.relative(MIND, resolved));
    else if (resolved.startsWith(ROOT)) admittedRootPaths.add(path.relative(ROOT, resolved));
  }

  const gateMechanism = ['gate', 'tools'].filter((d) =>
    fs.existsSync(path.join(GAME2D, d))
  );

  return { marks, admittedGamePaths, admittedMindPaths, admittedRootPaths, gateMechanism };
}

// THE TYPOLOGY, applied to a deposit item — a category PROPOSAL (organ,
// nutrient, lens, seed, or pollen), same discipline as the source
// classifier: first-marker-match wins, "organ" is the working default,
// Kevin's felt read is the authority, this never is. See
// tools/typology_classify.js for provenance and the full marker table.
function classifyFile(absPath, extraBlob = '') {
  let text = '';
  try { text = fs.readFileSync(absPath, 'utf8').slice(0, 4000); } catch (e) { /* unreadable — blob stays thin */ }
  return classify(text + ' ' + extraBlob);
}

// Recognition capacity for skills/agents — real invocations, not mark-log
// mentions. Same instrument as tools/skill_invocation_check.js and
// tools/agent_invocation_check.js (built 2026-08-31 on Kevin's own catch:
// the mark-log signal undercounted full-development by 38x and overcounted
// record-audit by 3-to-0). This is what move 2 wires into the deposit: a
// skill or agent only gets copied into patterns/ if it was actually RUN.
function traceRealInvocations() {
  const skillFolders = fs.existsSync(SKILLS_DIR)
    ? fs.readdirSync(SKILLS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : [];
  const skills = {};
  for (const folder of skillFolders) {
    const skillMd = path.join(SKILLS_DIR, folder, 'SKILL.md');
    if (!fs.existsSync(skillMd)) continue; // struck/superseded/not-a-skill — out of scope
    const head = fs.readFileSync(skillMd, 'utf8').slice(0, 500);
    const m = /^name:\s*(.+)$/m.exec(head);
    const name = m ? m[1].trim() : folder;
    skills[name] = { folder, count: 0, lastTs: null };
  }

  const agentFiles = fs.existsSync(AGENTS_DIR)
    ? fs.readdirSync(AGENTS_DIR).filter((f) => f.endsWith('.md'))
    : [];
  const agents = {};
  for (const f of agentFiles) {
    const name = f.replace(/\.md$/, '');
    agents[name] = { direct: 0, adopted: 0, lastTs: null };
  }

  const roots = PROJECT_SLUGS.map((s) => path.join(PROJECTS_ROOT, s)).filter((p) => fs.existsSync(p));
  const TS_RE = /"timestamp":"([^"]+)"/;

  for (const root of roots) {
    const files = fs.readdirSync(root).filter((f) => f.endsWith('.jsonl'));
    for (const file of files) {
      let text;
      try { text = fs.readFileSync(path.join(root, file), 'utf8'); } catch (e) { continue; }

      if (text.includes('"commandName"')) {
        for (const line of text.split('\n')) {
          if (!line.includes('"commandName"')) continue;
          const cm = /"commandName":"([^"]+)"/.exec(line);
          if (!cm || !(cm[1] in skills)) continue;
          skills[cm[1]].count++;
          const tm = TS_RE.exec(line);
          if (tm && (!skills[cm[1]].lastTs || tm[1] > skills[cm[1]].lastTs)) skills[cm[1]].lastTs = tm[1];
        }
      }

      if (text.includes('"name":"Agent"')) {
        for (const line of text.split('\n')) {
          if (!line.includes('"name":"Agent"') || !line.includes('subagent_type')) continue;
          const st = /"subagent_type":"([^"]+)"/.exec(line);
          if (!st) continue;
          const tm = TS_RE.exec(line);
          const ts = tm ? tm[1] : null;
          if (st[1] in agents) {
            agents[st[1]].direct++;
            if (ts && (!agents[st[1]].lastTs || ts > agents[st[1]].lastTs)) agents[st[1]].lastTs = ts;
            continue;
          }
          for (const name of Object.keys(agents)) {
            if (line.includes('.claude/agents/' + name + '.md') || line.includes('.claude\\\\agents\\\\' + name + '.md')) {
              agents[name].adopted++;
              if (ts && (!agents[name].lastTs || ts > agents[name].lastTs)) agents[name].lastTs = ts;
            }
          }
        }
      }
    }
  }

  return { skills, agents, rootsFound: roots.length };
}

module.exports = {
  ROOT, GAME2D, MIND, SKILLS_DIR, AGENTS_DIR,
  readLines, copyFile, rmrf, walk, closedMarkIds, copyFileRedactingClosed,
  traceGameFiles, traceAdmitted, classifyFile, traceRealInvocations,
  PIPELINE_MECHANISM, isPublicDebris, DENAME_EXTS, denamePublicText,
  crystallizedCounterpart,
};
