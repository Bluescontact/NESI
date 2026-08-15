#!/usr/bin/env node
/*
 * HOLD CHECK — does the world hold the writing?
 *
 * This file replaces a check that should never have existed. The old suite
 * asserted "no text primitive exists in the file at all" and reported it as the
 * strongest guarantee in the build. It was the opposite: a world that cannot
 * draw a character cannot hold the writing anywhere the writer can meet it, and
 * the check locked that in so that removing the fault would fail the tests.
 *
 * The silence law is *"the only text on screen is the player's own."* That law
 * has a SUBJECT. It presumes his words are on screen and forbids everything
 * else from joining them. Satisfying it with a mute world satisfies it
 * vacuously.
 *
 * So the guarantee is rebuilt as the law actually reads, and made structural
 * rather than promised: every character that reaches the screen goes through
 * `own()`, and `own()` TAKES NO STRING — it takes a reference into the store
 * and resolves the text itself. A caller cannot hand it a label, a count, or a
 * machine's sentence, because a caller cannot hand it text at all.
 *
 * Usage:  node tools/hold_check.js
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const FILE = path.join(__dirname, "..", "world.html");
const HTML = fs.readFileSync(FILE, "utf8");
const SRC = HTML.match(/<script>([\s\S]*?)<\/script>/)[1];
const NOMARK = 1e9, noop = () => {};

/* ---- a DOM stub that actually REMEMBERS text, so the page can be read back ---- */
const ctx = new Proxy({}, { get: (_, k) =>
  (k === "createLinearGradient" || k === "createRadialGradient")
    ? () => ({ addColorStop: noop })
    : (k === "canvas" ? { clientWidth: 1000, clientHeight: 700 } : noop),
  set: () => true });
function textNode(v) { return { _text: String(v), children: [], get textContent() { return this._text } }; }
function node(id) {
  const n = {
    id, children: [], style: {}, value: "", className: "", width: 0, height: 0,
    scrollTop: 0, href: "", _t: null, _ev: {},
    classList: { _s: new Set(),
      add(c) { this._s.add(c) }, remove(c) { this._s.delete(c) },
      toggle(c) { this._s.has(c) ? this._s.delete(c) : this._s.add(c) },
      contains(c) { return this._s.has(c) } },
    appendChild(c) { n.children.push(c); n._t = null; return c },
    removeChild(c) { const i = n.children.indexOf(c); if (i >= 0) n.children.splice(i, 1); return c },
    insertBefore(c) { n.children.unshift(c); return c },
    get firstChild() { return n.children[0] || null },
    set textContent(v) { n._t = String(v); n.children.length = 0 },
    get textContent() { return n._t !== null ? n._t : n.children.map(c => c.textContent || "").join("") },
    addEventListener(t, f) { n._ev[t] = f },
    focus: noop, setPointerCapture: noop, click: noop, getContext: () => ctx,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 })
  };
  return n;
}
function boot(prior) {
  const store = new Map([["nesiworld", JSON.stringify(prior)]]);
  const reg = {};
  const get = id => (reg[id] || (reg[id] = node(id)));
  let clock = 1e6, q = [];
  const sandbox = {
    document: { getElementById: get, createElement: () => node("new"),
                createTextNode: textNode, activeElement: null, addEventListener: noop },
    localStorage: { getItem: k => store.get(k) ?? null,
                    setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    performance: { now: () => clock },
    requestAnimationFrame: cb => q.push(cb),
    addEventListener: noop, setInterval: noop, setTimeout: f => f(),
    innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
    Blob: function () {}, URL: { createObjectURL: () => "b", revokeObjectURL: noop },
    Math, JSON, Date, Float32Array, Float64Array, Array, Object, String, Number, isNaN, console
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC + "\n;globalThis.__X={S,own,paintPage,bandCut,sound,arrive,release," +
    "setDrag:d=>{drag=d},groundY,dayKey,el:id=>document.getElementById(id)};",
    sandbox, { filename: "world.html<script>" });
  const X = sandbox.__X;
  X.page = () => reg.pagebg.textContent;
  X.taken = () => { const g = reg.pagebg.children.find(c => c.className === "gone");
                    return g ? g.textContent : "" };
  X.heard = () => reg.sound.textContent;
  X.hearing = () => reg.sound.classList.contains("up");
  X.field = reg.field;
  X.type = t => { reg.field.value += t; sandbox.__X.bandCut() };
  return X;
}
const today = (() => { const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" +
         String(d.getDate()).padStart(2,"0"); })();
function store(over) {
  return Object.assign({
    writing: {}, watermark: 0, res: 0, basin: 0, basin2: 0, lake: 28205.3,
    gate: 0, mirrors: [], aimedM: [], seated: 1,
    wet: [], shoots: [], stones: [], sunk: 0, nn: 0,
    creature: { x: 840, y: 598, tx: 840, ty: 598 }, silt: Array(251).fill(0),
    hiNow: { res: NOMARK, basin: NOMARK, lake: NOMARK, basin2: NOMARK },
    hiPast: { res: NOMARK, basin: NOMARK, lake: NOMARK, basin2: NOMARK },
    lastDay: today, queue: [], built: [], settled: [], stage: 0, everFruited: false
  }, over);
}
const checks = [];
const T = (n, ok, d) => checks.push([n, ok, d]);

/* ---- P1 · what you write is ON THE PAGE, as you write it ---- */
let X = boot(store({}));
X.type("The page holds what I put on it.");
T("P1 what you write appears on the page, as you write it",
  X.page() === "The page holds what I put on it.",
  JSON.stringify(X.page()));

/* ---- P2 · the page is never cleared; what the world took goes quiet, not away ---- */
X.type(" and a thought still going");        /* no ending: not yet taken */
T("P2 the page is never cleared — what the world took goes QUIET behind what is still being written",
  X.page() === "The page holds what I put on it. and a thought still going" &&
    X.taken() === "The page holds what I put on it.",
  "taken " + JSON.stringify(X.taken()) + " · live " +
    JSON.stringify(X.page().slice(X.taken().length)));

/* ---- P3 · deletion never un-banks ---- */
const stonesBefore = X.S.stones.length;
X.field.value = X.field.value.slice(0, -40); X.bandCut();
T("P3 deleting past the watermark rewrites the page and un-banks NOTHING",
  X.S.stones.length === stonesBefore && X.page() === X.field.value,
  stonesBefore + " stone(s) before and after; the page follows the hand");

/* ---- P4 · you open on what you wrote, not on a blank pane ---- */
const carried = JSON.parse(JSON.stringify(X.S));
X = boot(carried);
T("P4 a returning day opens showing the writing it left",
  X.page() === (carried.writing[today] || "") && X.page().length > 0,
  X.page().length + " characters on the page at boot");

/* ---- P5 · a settled sentence comes back out of the ground, verbatim ---- */
X = boot(store({ settled: [{ x: 300, y: 0, text: "What I set down here.", n: 1, seams: 0 },
                           { x: 470, y: 0, text: "And what I worked in beside it.", n: 2, seams: 1 }] }));
X.sound(1, { clientX: 400, clientY: 400 });
T("P5 the sounding brings a settled sentence back up, verbatim",
  X.heard() === "And what I worked in beside it." && X.hearing(),
  JSON.stringify(X.heard()));

/* ---- P6 · a sounding that finds nothing shows nothing ---- */
X = boot(store({ settled: [{ x: 300, y: 0, text: "", n: 1, seams: 0 }] }));
X.sound(0, { clientX: 400, clientY: 400 });
T("P6 a sounding that finds nothing shows nothing",
  X.heard() === "" && !X.hearing(), "nothing surfaced");

/* ---- P7 · THE LAW, STRUCTURAL: own() takes no string ---- */
const ownSig = /function own\(\s*el\s*,\s*src\s*\)/.test(SRC);
const ownBody = (SRC.match(/function own\(el,src\)\{[\s\S]*?\n\}/) || [""])[0];
const madeOutside = SRC.split("createTextNode").length - 1 -
                    (ownBody.split("createTextNode").length - 1);
T("P7 own() takes a REFERENCE, never a string — the law made structural",
  ownSig && ownBody.includes("S.writing") && ownBody.includes("S.settled") &&
    !/function own\([^)]*text[^)]*\)/.test(SRC),
  "own(el,src) resolves from the store itself");

/* ---- P8 · and it is the only door text can come through ---- */
T("P8 every text node in the world is made inside own() and nowhere else",
  madeOutside === 0, madeOutside + " text nodes created outside own()");

/* ---- P9 · the ways text can enter a page UNCHECKED are all absent ---- */
const smuggle = ["innerHTML", "outerHTML", "document.write", "insertAdjacentHTML",
                 "insertAdjacentText"].filter(w => SRC.includes(w));
T("P9 no unchecked path exists by which any other string could reach the screen",
  smuggle.length === 0, smuggle.length ? "FOUND: " + smuggle.join(", ") : "none of the five");

/* ---- P10 · nothing surfaces on its own ---- */
const autoSound = /setTimeout\([^)]*sound|setInterval\([^)]*sound/.test(SRC);
T("P10 nothing the world holds ever surfaces unbidden — the hand asks or it stays down",
  !autoSound, "sound() is reachable only from a pointer");

/* ---- P11 · and the page is actually visible ---- */
const sheetCSS = (HTML.match(/#pagebg\{[^}]*\}/) || [""])[0];
const blind = /opacity:\s*0(?!\.)/.test(sheetCSS) || /color:\s*transparent/.test(sheetCSS);
T("P11 the page is painted in a colour a person can read",
  !blind && /color:#2a2419/.test(sheetCSS), "pagebg draws in ink, not in nothing");

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[hold_check] PASS — the world holds the writing, and only his"
                      : "[hold_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
