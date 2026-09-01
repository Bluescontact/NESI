#!/usr/bin/env node
/* BUILD CONSOLIDATED — assembles nesi_consolidated.html from the live,
 * separate pages, without hand-retyping any of them. Each page keeps its own
 * global scope (ascent.html and tank.html both declare top-level `const G`,
 * `const SEAM`, `function save()`, `function load()` — concatenating them
 * into one shared <script> throws SyntaxError). So each page runs in its own
 * <iframe srcdoc>, byte-identical to the source file except for two
 * mechanical changes:
 *   1. <script src="X.js"> is inlined with X.js's real content, so the
 *      result has zero external file dependencies.
 *   2. A small bootstrap script is prepended that intercepts clicks on
 *      cross-page <a href="somepage.html[#hash]"> and forwards them to the
 *      parent shell instead of letting the iframe try to navigate itself to
 *      a URL that doesn't exist as a real resource under srcdoc.
 * The three known JS-driven `location.href = "...html..."` navigations
 * (regathered.html, daily.html, tank.html — found by grep, not guessed) are
 * rewritten to call the same bootstrap's NESI_PARENT_NAV() helper.
 *
 * Landing as a NEW file (nesi_consolidated.html), per the keeper's mark — the
 * existing nesi.html stays exactly as it is, still gated, its own open fork
 * ("which one is the game") untouched by this.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const HERE = __dirname;
const ROOT = path.join(HERE, "..");

const PAGES = [
  "index.html","ascent.html","descent.html","traversal.html","level_one.html",
  "field.html","regathered.html","world.html","tiles.html","crystal.html",
  "decisions.html","options.html","day_one.html","node.html","tank.html",
  "daily.html"
];

const BOOTSTRAP = `<script>
(function(){
  var KNOWN = ${JSON.stringify(PAGES)};
  window.addEventListener('message', function(e){
    var d = e.data;
    if(d && d.type === 'nesi-init'){
      if(d.hash){ try{ location.hash = d.hash; }catch(err){} }
    }
  });
  function tryNav(file, hash){
    if(KNOWN.indexOf(file) < 0) return false;
    try{ parent.postMessage({type:'nesi-nav', file: file, hash: hash||''}, '*'); }catch(e){}
    return true;
  }
  document.addEventListener('click', function(e){
    var a = e.target;
    while(a && a.nodeName !== 'A') a = a.parentNode;
    if(!a || !a.getAttribute) return;
    var href = a.getAttribute('href');
    if(!href) return;
    var m = /^([a-z_]+\\.html)(#(.*))?$/i.exec(href);
    if(!m) return;
    if(tryNav(m[1].toLowerCase(), m[3]||'')) e.preventDefault();
  }, true);
  window.NESI_PARENT_NAV = tryNav;
})();
<\/script>
`;

/* the three known JS-driven cross-page navigations, found by grepping every
   page for location.href|location.assign|location.replace — not guessed.
   Exact-string replacements only, so a miss fails loudly instead of silently
   leaving a real location.href assignment that would try to load a file
   that doesn't exist as a real resource under srcdoc. */
const SPECIAL_NAV = {
  "regathered.html": [
    [`location.href = 'daily.html'; return;`, `NESI_PARENT_NAV('daily.html'); return;`]
  ],
  "daily.html": [
    [`function walk(){ location.href = "ascent.html#cast"; }`,
     `function walk(){ NESI_PARENT_NAV("ascent.html","cast"); }`]
  ],
  "tank.html": [
    [`location.href = "index.html"; return;`, `NESI_PARENT_NAV("index.html"); return;`],
    [`location.href = "ascent.html#" + pendingSeam.to.toLowerCase();`,
     `NESI_PARENT_NAV("ascent.html", pendingSeam.to.toLowerCase());`],
    [`location.href = "ascent.html#cast";`, `NESI_PARENT_NAV("ascent.html","cast");`]
  ]
};

function inlineScripts(html, srcFile){
  return html.replace(/<script\s+src="([^"]+\.js)"[^>]*><\/script>/gi, function(whole, jsName){
    const jsPath = path.join(ROOT, jsName);
    if(!fs.existsSync(jsPath)){
      throw new Error(`${srcFile}: references ${jsName}, not found at ${jsPath}`);
    }
    const js = fs.readFileSync(jsPath, "utf8");
    return `<script>\n${js}\n<\/script>`;
  });
}

function applySpecialNav(html, name){
  const rules = SPECIAL_NAV[name];
  if(!rules) return html;
  let out = html;
  rules.forEach(function(pair){
    const [from, to] = pair;
    if(out.indexOf(from) < 0){
      throw new Error(`${name}: expected exact string not found — "${from}"`);
    }
    out = out.split(from).join(to);
  });
  return out;
}

function buildPage(name){
  const p = path.join(ROOT, name);
  let html = fs.readFileSync(p, "utf8");
  html = inlineScripts(html, name);
  html = applySpecialNav(html, name);
  html = html.replace(/^<!DOCTYPE html>/i, "<!DOCTYPE html>\n" + BOOTSTRAP);
  return html;
}

const pagesData = {};
PAGES.forEach(function(name){
  pagesData[name] = buildPage(name);
  process.stderr.write(`built ${name} — ${pagesData[name].length} chars\n`);
});

let json = JSON.stringify(pagesData);
/* the </script sequence inside any embedded page's own content must not be
   allowed to close the outer data <script> block early. \/ is a legal JSON
   escape for / , so this stays valid JSON while breaking the literal token
   the HTML parser scans for. */
json = json.replace(/<\/script/gi, "<\\/script");

const OUT = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>NESI — consolidated</title>
<style>
  html,body{margin:0;height:100%;overflow:hidden;background:#000}
  iframe{border:0;width:100%;height:100%;display:block}
</style>
</head>
<body>
<iframe id="view" title="NESI"></iframe>
<script type="application/json" id="pages-data">${json}<\/script>
<script>
(function(){
  var PAGES = JSON.parse(document.getElementById('pages-data').textContent);
  var iframe = document.getElementById('view');
  var pendingHash = '';
  function nav(file, hash){
    if(!PAGES[file]) return;
    pendingHash = hash || '';
    iframe.srcdoc = PAGES[file];
  }
  iframe.addEventListener('load', function(){
    if(pendingHash){
      try{ iframe.contentWindow.postMessage({type:'nesi-init', hash: pendingHash}, '*'); }catch(e){}
      pendingHash = '';
    }
  });
  window.addEventListener('message', function(e){
    if(e.source !== iframe.contentWindow) return;
    var d = e.data;
    if(d && d.type === 'nesi-nav') nav(d.file, d.hash);
  });
  nav('index.html', location.hash ? location.hash.slice(1) : '');
})();
<\/script>
</body>
</html>
`;

const outPath = path.join(ROOT, "nesi_consolidated.html");
fs.writeFileSync(outPath, OUT, "utf8");
process.stderr.write(`\nwrote ${outPath} — ${OUT.length} chars (${(OUT.length/1024).toFixed(1)} KB)\n`);
