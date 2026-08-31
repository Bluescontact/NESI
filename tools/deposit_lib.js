// Shared tracing logic for the deposit pipelines (build_deposit.js,
// build_deposit_public.js). Both derive from the same two signals: what
// index.html actually loads, and what the gate has actually admitted.

const fs = require('fs');
const path = require('path');
const { classify } = require('./typology_classify');

const ROOT = path.resolve(__dirname, '..');
const GAME2D = path.join(ROOT, 'nesi', 'game2d');
const MIND = path.join(ROOT, 'nesi', 'mind');

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

module.exports = {
  ROOT, GAME2D, MIND,
  readLines, copyFile, rmrf, walk,
  traceGameFiles, traceAdmitted, classifyFile,
};
