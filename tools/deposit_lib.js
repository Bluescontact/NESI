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

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
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

// Recognition capacity: every path a real mark in MARKS.jsonl points to.
function traceAdmitted() {
  const marks = readLines(path.join(GAME2D, 'gate', 'MARKS.jsonl'))
    .map((line) => { try { return JSON.parse(line); } catch { return null; } })
    .filter(Boolean);

  const admittedGamePaths = new Set();
  const admittedMindPaths = new Set();
  const GATE_DIR = path.join(GAME2D, 'gate'); // admit.mjs runs with cwd here — "at" is relative to it
  for (const m of marks) {
    if (!m.at) continue;
    const resolved = path.resolve(GATE_DIR, m.at);
    if (!fs.existsSync(resolved)) continue;
    if (resolved.startsWith(GAME2D)) admittedGamePaths.add(path.relative(GAME2D, resolved));
    else if (resolved.startsWith(MIND)) admittedMindPaths.add(path.relative(MIND, resolved));
  }

  const gateMechanism = ['gate', 'tools'].filter((d) =>
    fs.existsSync(path.join(GAME2D, d))
  );

  return { marks, admittedGamePaths, admittedMindPaths, gateMechanism };
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
  readLines, copyFile, rmrf, walk,
  traceGameFiles, traceAdmitted, classifyFile, traceRealInvocations,
};
