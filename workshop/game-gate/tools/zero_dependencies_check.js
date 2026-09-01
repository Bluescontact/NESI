#!/usr/bin/env node
/* ZERO DEPENDENCIES CHECK — 2026-08-20, built to close a tension the
 * process-geometry reconciliation pass found: "zero dependencies, ever"
 * (THE_BUILD_SHAPE.md, THE_KIT.md, THE_HAND_FROM_THE_COMMONS.md) was stated
 * as standing law with no instrument checking it — convention, not fact.
 * This is the fact.
 *
 * REGISTERED into check_all.js's NODE list, 2026-08-20, on the keeper's own
 * mark. Runs as part of every check_all.js pass from here on.
 *
 *   node tools/zero_dependencies_check.js
 */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const EXCLUDE_DIRS = new Set(["tools", "coldwalk", "node_modules", ".git", "__pycache__", ".night", ".gate_control", "gate"]);

let failed = false;
const findings = [];

function ok(name, pass, note){
  console.log("  " + (pass ? "ok  " : "FAIL") + "  " + name + (note ? "   [" + note + "]" : ""));
  if(!pass) failed = true;
}

/* K1 — no package.json / node_modules anywhere under the live build root
   (tools/ is exempt: node instruments are allowed their own dev deps, the
   law is about the PLAYER-FACING build, never about the check suite). */
function walk(dir, out){
  for(const f of fs.readdirSync(dir, { withFileTypes: true })){
    if(f.isDirectory()){
      if(EXCLUDE_DIRS.has(f.name)) continue;
      walk(path.join(dir, f.name), out);
    } else out.push(path.join(dir, f.name));
  }
}
const files = [];
walk(ROOT, files);

const pkgFiles = files.filter(f => path.basename(f) === "package.json");
ok("K1 no package.json outside tools/", pkgFiles.length === 0,
   pkgFiles.length ? pkgFiles.map(f => path.relative(ROOT, f)).join(", ") : "none found");

const nodeModulesDirs = [];
(function findNodeModules(dir){
  for(const f of fs.readdirSync(dir, { withFileTypes: true })){
    if(!f.isDirectory()) continue;
    if(f.name === "node_modules"){ nodeModulesDirs.push(path.join(dir, f.name)); continue; }
    if(EXCLUDE_DIRS.has(f.name)) continue;
    findNodeModules(path.join(dir, f.name));
  }
})(ROOT);
ok("K2 no node_modules outside tools/", nodeModulesDirs.length === 0,
   nodeModulesDirs.length ? nodeModulesDirs.map(f => path.relative(ROOT, f)).join(", ") : "none found");

/* K3 — no <script src="http...">, no fetch(), no XMLHttpRequest, no import
   from a bare specifier (a CDN or package name, not a relative/local path)
   in any .html/.js file a player's browser actually loads. */
const liveFiles = files.filter(f => /\.(html|js)$/.test(f) && !EXCLUDE_DIRS.has(path.basename(path.dirname(f))));
const netPatterns = [
  { re: /<script[^>]+src=["']https?:\/\//i, label: "remote <script src>" },
  { re: /\bfetch\s*\(\s*["']https?:\/\//i, label: "fetch() to a remote URL" },
  { re: /new\s+XMLHttpRequest\s*\(/i, label: "XMLHttpRequest" },
  { re: /\bimport\s+.*\s+from\s+["'](?!\.\/|\.\.\/|\/)[^"']+["']/i, label: "bare-specifier import (a package, not a local file)" },
];
const netHits = [];
for(const f of liveFiles){
  let text;
  try{ text = fs.readFileSync(f, "utf8"); } catch(e){ continue; }
  for(const p of netPatterns){
    if(p.re.test(text)) netHits.push(path.relative(ROOT, f) + ": " + p.label);
  }
}
ok("K3 no remote script/fetch/XHR/bare-import in any live .html or .js", netHits.length === 0,
   netHits.length ? netHits.join(" · ") : liveFiles.length + " files scanned");

console.log(failed
  ? "\nzero_dependencies_check: FAILED — the law has an exception on disk\n"
  : "\nzero_dependencies_check: all clear — zero dependencies holds as a fact, not a claim\n");
process.exit(failed ? 1 : 0);
