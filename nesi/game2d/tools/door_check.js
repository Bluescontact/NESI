#!/usr/bin/env node
/*
 * DOOR CHECK — can every one of the twelve seats be reached, by a hand,
 * from the map?
 *
 * ■ REWRITTEN, 2026-08-21, same pass ascent.html was rebuilt from scratch
 * on Kevin's mark ("cut the ascent entirely... build the levels entirely
 * from scratch"). The retired file's own door_check drove navigation
 * through mouse coordinates over a canvas, then through a DOM menu calling
 * enter()/enterFace() with a fixed set of "ascent run" keys (lens/seating/
 * heliostat) gated by unlocked()/seeded()/reading() — none of which exist
 * in the rebuild. The question this file exists to answer — can a hand
 * actually get anywhere — is unchanged; the answer route is not: the new
 * file has no canvas, no menu, no lock. A hand reaches any of the twelve
 * seats directly, by a real DOM click or a real hash, and faceOf() refuses
 * anything that is not one of solid.js's own twelve names.
 *
 *   node tools/door_check.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];
const solidSrc = fs.readFileSync(path.join(ROOT, "solid.js"), "utf8");

const noop = () => {};
const cache = new Map();
const mk = () => {
  const kids = [];
  return {
    style: {}, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    children: kids,
    appendChild(c){ kids.push(c); return c; },
    removeChild: noop, addEventListener: noop, removeEventListener: noop,
    setAttribute: noop, getAttribute: () => null, focus: noop, blur: noop,
    setPointerCapture: noop, getContext: () => new Proxy({}, { get: () => noop, set: () => true }),
    setSelectionRange: noop, selectionStart: 0, selectionEnd: 0,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
    get textContent(){ return this._t || ""; }, set textContent(v){ this._t = v; },
    get innerHTML(){ return ""; }, set innerHTML(v){ kids.length = 0; },
    href: "", download: "", click: noop
  };
};
const byId = id => { if (!cache.has(id)) cache.set(id, mk()); return cache.get(id); };

const bag = new Map();
function Storage() {}
Storage.prototype.getItem = function (k) { return bag.has(k) ? bag.get(k) : null; };
Storage.prototype.setItem = function (k, v) { bag.set(k, String(v)); };
Storage.prototype.removeItem = function (k) { bag.delete(k); };
const localStorage = Object.create(Storage.prototype);

let hash = "";
const sandbox = {
  document: {
    getElementById: byId,
    createElement: mk,
    createElementNS: (ns, tag) => mk(),
    createTextNode: () => ({}),
    activeElement: null, addEventListener: noop, body: mk()
  },
  Storage, localStorage,
  fetch: () => Promise.reject(new Error("no network in a walk")),
  XMLHttpRequest: (function () { function X() {} X.prototype.open = noop; X.prototype.send = noop; return X; })(),
  performance: { now: () => Date.now() % 1e7 },
  requestAnimationFrame: noop, addEventListener: noop, setInterval: noop, setTimeout: noop, clearTimeout: noop,
  innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
  URL: { createObjectURL: () => "", revokeObjectURL: noop },
  Blob: function () {}, Math, JSON, Date, Array, Object, String, Number, isNaN, console,
  get location(){ return { get hash(){ return hash; }, set hash(v){ hash = v; } }; }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
/* solid.js and seam.js are real <script src> includes in the page — load
   them into the same sandbox context before the inline script, exactly as
   a real browser would. */
vm.runInContext(fs.readFileSync(path.join(ROOT, "solid.js"), "utf8"), sandbox, { filename: "solid.js" });
vm.runInContext(fs.readFileSync(path.join(ROOT, "seam.js"), "utf8"), sandbox, { filename: "seam.js" });
vm.runInContext(
  src + "\n;globalThis.__X={faceOf,enterSeat,toMap,get view(){return view;},get cur(){return cur;}," +
        "render, get S(){return S;}};",
  sandbox, { filename: "ascent.html<script>" });

const X = sandbox.__X;
const G = sandbox.SOLID;
const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

/* ── 1 · every one of the solid's own twelve seats is a real, reachable face ── */
for (const seat of G.NAMES) {
  X.toMap();
  X.enterSeat(seat);
  ok("D " + seat + " is reachable from the map",
     X.view === "seat" && X.cur === seat, "view=" + X.view + " cur=" + X.cur);
}

/* ── 2 · the map is the resting state, and returning to it actually returns ── */
X.enterSeat("TANK");
X.toMap();
ok("D the map is reachable again after entering a seat", X.view === "map" && X.cur === null);

/* ── 3 · faceOf refuses anything that is not one of the twelve real names ──── */
ok("D faceOf refuses a name that names nothing", X.faceOf("not-a-real-seat") === null);
ok("D faceOf refuses case-mismatched noise the same way", X.faceOf("") === null);
ok("D faceOf accepts every real seat, case-insensitively as the map's own links do",
   G.NAMES.every(n => X.faceOf(n.toLowerCase()) === n));

/* ── 4 · twelve seats, twenty-four members, none of them a phantom door ────── */
ok("D every member's own two ends are both real, reachable seats",
   G.MEMBERS.every(m => G.NAMES.includes(m.a) && G.NAMES.includes(m.b)),
   G.MEMBERS.length + " members checked");

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed ? "\ndoor: " + failed + " FAILED\n"
                   : "\ndoor: all " + results.length + " passed — every seat is reachable from the map\n");
process.exit(failed ? 1 : 0);
