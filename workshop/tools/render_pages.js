// render_pages.js — the deposit's own page renderer.
// Turns every .md in the public deposit into a styled .html sibling, and
// gives each room (directory a reader can enter) a doorway page, so the
// deposit navigates as one place rather than as a repository of raw files.
// Zero dependencies, by the corpus's own law: no remote scripts, no packages.
// Sources stay beside their rendered pages; each page links its own source.
// Run from the deposit root:  node workshop/tools/render_pages.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

// ── the shared face ────────────────────────────────────────────────────────
const STYLE = `
:root{--bg:#14151a;--paper:#e8e4da;--dim:#8f8b80;--gold:#c9a84c;--line:#2a2c33;--card:#191b21}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--paper);font:16px/1.7 Georgia,'Times New Roman',serif;padding:40px 20px 80px}
main{max-width:720px;margin:0 auto}
h1{font-size:30px;font-weight:400;letter-spacing:.4px;margin:0 0 18px}
h2{font-size:15px;font-weight:400;color:var(--gold);letter-spacing:.12em;text-transform:uppercase;margin:36px 0 10px}
h3{font-size:16px;font-weight:600;margin:26px 0 8px}
p,li{margin:0 0 12px}
ul,ol{padding-left:24px;margin:0 0 14px}
a{color:var(--gold);text-decoration:none;border-bottom:1px solid rgba(201,168,76,.35)}
a:hover{border-bottom-color:var(--gold)}
blockquote{margin:0 0 14px;padding:12px 18px;background:var(--card);border-left:2px solid var(--gold);color:var(--paper)}
blockquote p:last-child{margin-bottom:0}
code{font-family:ui-monospace,Consolas,monospace;font-size:.88em;background:var(--card);padding:1px 5px;border-radius:3px}
pre{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:14px 16px;overflow-x:auto;margin:0 0 14px}
pre code{background:none;padding:0}
hr{border:0;border-top:1px solid var(--line);margin:28px 0}
em{color:var(--dim)}
table{border-collapse:collapse;margin:0 0 14px;width:100%}
th,td{border:1px solid var(--line);padding:6px 10px;text-align:left;font-size:14px}
nav.crumb{color:var(--dim);font-size:13px;letter-spacing:.08em;margin-bottom:28px}
nav.crumb a{color:var(--dim);border-bottom-color:rgba(143,139,128,.35)}
nav.crumb a:hover{color:var(--gold)}
footer.pagefoot{margin-top:48px;color:var(--dim);font-size:13px;border-top:1px solid var(--line);padding-top:14px}
.roomlist a.item{display:block;background:var(--card);border:1px solid var(--line);border-radius:6px;padding:14px 18px;margin:10px 0;border-bottom-width:1px}
.roomlist a.item b{display:block;color:var(--gold);font-weight:600}
.roomlist a.item span{color:var(--dim);font-size:14px}
`;

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── a small markdown renderer — covers what the deposit's pages use ───────
function inline(s) {
  s = esc(s);
  // images none; code spans first so links inside them stay literal
  s = s.replace(/`([^`]+)`/g, (m, c) => '<code>' + c + '</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, href) => {
    // .md links point at the rendered page; the source stays reachable
    if (!/^[a-z]+:/i.test(href)) href = href.replace(/\.md(#[^)]*)?$/i, '.html$1');
    return '<a href="' + href + '">' + text + '</a>';
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  s = s.replace(/(^|[\s(>])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[\s(>])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  s = s.replace(/—/g, '—');
  return s;
}

function renderMd(src) {
  const lines = src.split(/\r?\n/);
  const out = [];
  let i = 0, title = null;
  const flushPara = (buf) => { if (buf.length) { out.push('<p>' + inline(buf.join(' ')) + '</p>'); buf.length = 0; } };
  let para = [];
  while (i < lines.length) {
    const l = lines[i];
    if (/^```/.test(l)) {
      flushPara(para);
      const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
      continue;
    }
    if (/^(#{1,4})\s+/.test(l)) {
      flushPara(para);
      const m = l.match(/^(#{1,4})\s+(.*)$/);
      const level = m[1].length, text = m[2];
      if (level === 1 && !title) title = text.replace(/[*_`]/g, '');
      out.push('<h' + level + '>' + inline(text) + '</h' + level + '>');
      i++; continue;
    }
    if (/^\s*(---+|\*\*\*+)\s*$/.test(l)) { flushPara(para); out.push('<hr>'); i++; continue; }
    if (/^\s*>/.test(l)) {
      flushPara(para);
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
      out.push('<blockquote>' + renderMd(buf.join('\n')).body + '</blockquote>');
      continue;
    }
    if (/^\s*([-*+]|\d+[.)])\s+/.test(l)) {
      flushPara(para);
      const ordered = /^\s*\d/.test(l);
      const items = [];
      while (i < lines.length && (/^\s*([-*+]|\d+[.)])\s+/.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))) {
        if (/^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) items.push(lines[i].replace(/^\s*([-*+]|\d+[.)])\s+/, ''));
        else items[items.length - 1] += ' ' + lines[i].trim();
        i++;
      }
      out.push((ordered ? '<ol>' : '<ul>') + items.map((it) => '<li>' + inline(it) + '</li>').join('') + (ordered ? '</ol>' : '</ul>'));
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(l) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      flushPara(para);
      const head = l.split('|').slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
        rows.push(lines[i].split('|').slice(1, -1).map((c) => c.trim()));
        i++;
      }
      out.push('<table><tr>' + head.map((h) => '<th>' + inline(h) + '</th>').join('') + '</tr>' +
        rows.map((r) => '<tr>' + r.map((c) => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</table>');
      continue;
    }
    if (l.trim() === '') { flushPara(para); i++; continue; }
    para.push(l.trim()); i++;
  }
  flushPara(para);
  return { title, body: out.join('\n') };
}

// ── page shell ─────────────────────────────────────────────────────────────
function crumbFor(rel) {
  const depth = rel.split('/').length - 1;
  const up = '../'.repeat(depth);
  const parts = rel.split('/');
  const links = ['<a href="' + up + 'index.html">NESI</a>'];
  let walked = '';
  for (let d = 0; d < parts.length - 1; d++) {
    walked += parts[d] + '/';
    links.push('<a href="' + up + walked + 'index.html">' + parts[d] + '</a>');
  }
  return '<nav class="crumb">' + links.join(' &middot; ') + '</nav>';
}

function shell(rel, title, body, srcName) {
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + esc(title) + ' · NESI</title>\n<style>' + STYLE + '</style>\n</head>\n<body>\n<main>\n' +
    crumbFor(rel) + '\n' + body + '\n' +
    '<footer class="pagefoot">' +
    (srcName ? 'Rendered from <a href="' + srcName + '">' + srcName + '</a> · ' : '') +
    '<a href="' + '../'.repeat(rel.split('/').length - 1) + 'index.html">the front door</a></footer>\n' +
    '</main>\n</body>\n</html>\n';
}

// ── room doorways ──────────────────────────────────────────────────────────
const ROOMS = {
  'house/membrane': ['The membrane', 'How this circuit governs itself: disputes, the center, what leaves, what gets removed.'],
  'house/essays': ['The essays', 'Five essays on recognition, naming, and witness.'],
  'house/six-returns': ['The six returns', 'A deliberately personal sequence: one dispute, walked six ways to its floor.'],
  'house/floor-kit': ['The floor kit', 'Four short files: from the boundary you can’t hold to the one you can.'],
  'house/genesis-seed': ['The genesis seed', 'A document you paste into any AI session to change how it works with you — with its own tests.'],
  'house/starters': ['The starters', 'A record template a stranger can adopt in thirty seconds.'],
  'house/open-ledger': ['The open ledger', 'Accounting that can’t compute debt, with the gift circuit beside it.'],
  'house': ['The house', 'The finished things: tools that run, kits, essays, patterns.'],
  'workshop': ['The workshop', 'The making, in the open: the gate, the pipeline sources, the checks, the records, the audits.'],
  'workshop/audit': ['The audits', 'Independent reviews of this project’s own mechanics, with their instrument.'],
  'workshop/patterns': ['The patterns', 'Working pattern documents, as admitted.'],
};

function titleOf(abs) {
  try {
    const t = fs.readFileSync(abs, 'utf8');
    const m = t.match(/^#\s+(.+)$/m) || t.match(/<title>([^<]+)<\/title>/i) || t.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (m) return m[1].replace(/[*_`]/g, '').replace(/\s*·\s*NESI\s*$/, '').trim();
  } catch (e) { /* binary or unreadable */ }
  return null;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === '.nojekyll') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function main() {
  const files = walk(ROOT);
  let rendered = 0;

  // 1. every .md gets a rendered sibling
  for (const abs of files) {
    if (!abs.toLowerCase().endsWith('.md')) continue;
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    const src = fs.readFileSync(abs, 'utf8');
    const { title, body } = renderMd(src);
    const name = path.basename(abs);
    const outAbs = abs.replace(/\.md$/i, '.html');
    // never clobber a real page (README.md -> README.html is safe; index.html is not derived from .md anywhere)
    fs.writeFileSync(outAbs, shell(rel, title || name.replace(/\.md$/i, ''), body, name));
    rendered++;
  }

  // 2. every directory gets a doorway (index.html) unless it has its own
  const allDirs = [];
  (function walkDirs(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory() || e.name === '.git') continue;
      const p = path.join(d, e.name);
      allDirs.push(path.relative(ROOT, p).replace(/\\/g, '/'));
      walkDirs(p);
    }
  })(ROOT);
  let doorways = 0;
  for (const rel of allDirs) {
    const meta = ROOMS[rel] || [rel.split('/').pop(), 'part of ' + (rel.split('/')[0] === 'workshop' ? 'the making' : 'the house') + ' — ' + rel];
    const [roomTitle, blurb] = meta;
    const dirAbs = path.join(ROOT, rel);
    const indexAbs = path.join(dirAbs, 'index.html');
    if (fs.existsSync(indexAbs) && !/render_pages\.js doorway/.test(fs.readFileSync(indexAbs, 'utf8'))) continue; // designed index stays
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true })
      .filter((e) => e.name !== 'index.html' && e.name !== '.git')
      .sort((a, b) => (a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name) : a.isDirectory() ? 1 : -1));
    const items = [];
    for (const e of entries) {
      const p = path.join(dirAbs, e.name);
      if (e.isDirectory()) {
        const sub = ROOMS[rel + '/' + e.name];
        items.push({ href: e.name + '/index.html', label: sub ? sub[0] : e.name, note: sub ? sub[1] : 'a room' });
      } else if (/\.html$/i.test(e.name)) {
        // skip rendered twins of md files (the md entry covers them)
        if (fs.existsSync(p.replace(/\.html$/i, '.md'))) continue;
        items.push({ href: e.name, label: titleOf(p) || e.name, note: e.name });
      } else if (/\.md$/i.test(e.name)) {
        items.push({ href: e.name.replace(/\.md$/i, '.html'), label: titleOf(p) || e.name, note: e.name });
      } else {
        items.push({ href: e.name, label: e.name, note: 'file' });
      }
    }
    const body = '<!-- render_pages.js doorway -->\n<h1>' + esc(roomTitle) + '</h1>\n<p>' + esc(blurb) + '</p>\n' +
      '<div class="roomlist">\n' +
      items.map((it) => '<a class="item" href="' + it.href + '"><b>' + esc(it.label) + '</b><span>' + esc(it.note) + '</span></a>').join('\n') +
      '\n</div>';
    fs.writeFileSync(indexAbs, shell(rel + '/x', roomTitle, body, null));
    doorways++;
  }

  // 3. the inbox bench manifest — a derived listing of the cards actually
  // present, regenerated every run, so the shop floor reads the bench
  // itself rather than asserting a count (fourth-pass mirror audit, the
  // painted-gauge finding). Note: the inbox's INDEX.html (rendered from
  // INDEX.md) collides case-insensitively with a doorway index.html on
  // Windows, so the bench gets a manifest instead of a doorway.
  const inboxDir = path.join(ROOT, 'workshop', 'game-gate', 'inbox');
  if (fs.existsSync(inboxDir)) {
    const cards = fs.readdirSync(inboxDir)
      .filter((n) => /\.md$/i.test(n) && !/^INDEX\.md$/i.test(n))
      .map((n) => ({ file: n.replace(/\.md$/i, '.html'), label: titleOf(path.join(inboxDir, n)) || n }));
    fs.writeFileSync(path.join(inboxDir, 'bench.json'), JSON.stringify({ generatedBy: 'workshop/tools/render_pages.js', cards }, null, 2));
  }

  console.log('rendered ' + rendered + ' page(s); doorways for ' + doorways + ' room(s)');
}

main();
