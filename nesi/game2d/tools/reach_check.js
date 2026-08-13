#!/usr/bin/env node
/*
 * REACH CHECK — can a hand find the things the world will answer?
 *
 * game-craft, 2026-08-13: "invert every check to presence-asserting, never
 * absence-passing. A blank screen passes every refusal." Every other check in
 * this directory can be satisfied by a world that does less. This one cannot:
 * it fails when something is missing, and the only way to pass is for the thing
 * to be there.
 *
 * THE RULE IT ENFORCES: every target the world will act on when clicked must
 * also be a target the cursor changes over. A hit-test in `pointerdown` with no
 * matching branch in `hover()` is an act with no affordance — the world answers
 * a click nobody has any way to know they can make.
 *
 * It was written against a known live instance and is expected to FAIL on the
 * current file until that is built: `hover()` tests stones, the gate, the mirror
 * seats and fruit, and does not test `S.settled` — so THE SOUNDING, the one act
 * that returns his own sentence to him, is the only interactive object in the
 * world whose cursor never changes. The comment above it calls it "the whole of
 * why this build exists again." A failing check here is the check working.
 *
 * Usage:  node tools/reach_check.js
 */
const fs = require("fs"), path = require("path");
const FILE = path.join(__dirname, "..", "world.html");
const src = fs.readFileSync(FILE, "utf8");

/* Pull a function body by name, brace-matched. */
function body(name) {
  const m = new RegExp("function\\s+" + name + "\\s*\\([^)]*\\)\\s*\\{").exec(src);
  if (!m) return null;
  let i = m.index + m[0].length, depth = 1;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    i++;
  }
  return src.slice(m.index, i);
}

const down = body("pointerdown") || body("onDown") || body("down") ||
  (/addEventListener\(\s*["']pointerdown["']\s*,\s*(?:function\s*)?\(?[^)]*\)?\s*=?>?\s*\{/.test(src)
    ? (() => {
        const m = /addEventListener\(\s*["']pointerdown["'][\s\S]{0,80}?\{/.exec(src);
        let i = m.index + m[0].length, depth = 1;
        while (i < src.length && depth > 0) { const c = src[i]; if (c === "{") depth++; else if (c === "}") depth--; i++; }
        return src.slice(m.index, i);
      })()
    : null);
const hov = body("hover");

const checks = [];
const T = (name, ok, detail) => checks.push([name, !!ok, detail]);

T("R1 the world has a hover pass at all", !!hov, hov ? "hover() found" : "no hover() — nothing in this world has a cursor");
T("R2 the world has a pointerdown pass at all", !!down, down ? "found" : "no pointerdown found");

/* The store references a click acts on, and a hover must therefore also test.
 * Each entry: the store key, and the name a reader would use for it. */
const TARGETS = [
  ["S.settled", "the sounding — settled deposits return his sentence"],
  ["S.stones", "stones on the shore"],
  ["S.fruit", "fruit"],
];

if (down && hov) {
  for (const [key, name] of TARGETS) {
    const inDown = down.includes(key);
    const inHover = hov.includes(key);
    if (!inDown) continue;                       // the world does not act on it; nothing owed
    T("R3 " + name + " has an affordance", inHover,
      inHover ? "acted on in pointerdown, cursor changes in hover" :
                "ACTED ON IN pointerdown AND ABSENT FROM hover() — a click with no way to know it exists");
  }
  /* presence-asserting floor: the check must have found something to check.
   * A world with no targets at all would otherwise pass silently. */
  const found = TARGETS.filter(([k]) => down.includes(k)).length;
  T("R4 the check found targets to check", found > 0,
    found + " of " + TARGETS.length + " known targets are acted on by this world");
}

/* Perception: a target drawn at a few real pixels cannot be found by a hand,
 * whatever the cursor does. Read the deposit's own drawn size from the source. */
const wm = /const\s+w\s*=\s*([0-9.]+)\s*[,;].{0,120}?hh\s*=\s*([0-9.]+)/s.exec(src);
T("R5 the deposit mark is big enough for a hand", wm && parseFloat(wm[1]) >= 24,
  wm ? "drawn w=" + wm[1] + " h=" + wm[2] + " — the floor is 24 logical px for a pointer target"
     : "COULD NOT FIND the deposit's drawn size — a check that cannot see its subject FAILS; it does not pass");

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0
  ? "[reach_check] PASS — every act the world answers can be found by a hand"
  : "[reach_check] FAIL — " + bad + " of " + checks.length + "; an act with no affordance is not in the world");
process.exit(bad === 0 ? 0 : 1);
