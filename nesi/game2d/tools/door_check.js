#!/usr/bin/env node
/*
 * DOOR CHECK — can the ascent be reached from the map, by a hand, from spawn?
 *
 * WHY IT EXISTS. Until 2026-08-14 the ASCENT array (THE LENS, THE SEATING, THE
 * HELIOSTAT) was declared at ascent.html and read by NOTHING — enter(n) took
 * LEVELS[n-1], so there was no node, no click and no path. The seating's
 * hand-cut was verified as a mechanic and could not be walked to. Kevin's mark:
 * "build the door into the ascent."
 *
 * So this asserts REACHABILITY and nothing else. It does not call enter()
 * itself — that would prove only that a function exists. It sets a mouse
 * coordinate, sets the click flag, and runs the game's OWN frame() through the
 * real map branch, then asks where the game ended up.
 *
 * It also asserts the door is SHUT when it should be: before the water has
 * anything to give, a click on the same coordinate must enter nothing and the
 * map must paint no name there.
 *
 *   node tools/door_check.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];

const noop = () => {};
const painted = [];
let recording = false;
const ctx = new Proxy({}, {
  get: (_, k) => {
    if (k === "createLinearGradient" || k === "createRadialGradient")
      return () => ({ addColorStop: noop });
    if (k === "measureText") return t => ({ width: String(t).length * 7.4 });
    if (k === "fillText" || k === "strokeText")
      return t => { if (recording) painted.push(String(t)); };
    if (k === "canvas") return { clientWidth: 1000, clientHeight: 700 };
    return noop;
  },
  set: () => true
});
const cache = new Map();
const mk = () => ({
  value: "", style: {}, width: 0, height: 0,
  addEventListener: noop, removeEventListener: noop, focus: noop, blur: noop,
  setPointerCapture: noop, getContext: () => ctx, appendChild: noop, removeChild: noop,
  click: noop, href: "", firstChild: null, insertBefore: noop, className: "",
  textContent: "", scrollTop: 0, clientWidth: 1000, clientHeight: 700,
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  setSelectionRange: noop, selectionStart: 0, selectionEnd: 0,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 })
});
const byId = id => { if (!cache.has(id)) cache.set(id, mk()); return cache.get(id); };

const bag = new Map();
function Storage() {}
Storage.prototype.getItem = function (k) { return bag.has(k) ? bag.get(k) : null; };
Storage.prototype.setItem = function (k, v) { bag.set(k, String(v)); };
Storage.prototype.removeItem = function (k) { bag.delete(k); };
const localStorage = Object.create(Storage.prototype);

const sandbox = {
  document: { getElementById: byId, createElement: mk, createTextNode: () => ({}),
              activeElement: null, addEventListener: noop, body: mk() },
  Storage, localStorage,
  fetch: () => Promise.reject(new Error("no network in a walk")),
  XMLHttpRequest: (function(){ function X(){} X.prototype.open=noop; X.prototype.send=noop; return X; })(),
  performance: { now: () => Date.now() % 1e7 },
  requestAnimationFrame: noop,      /* frame() is called by hand below; it cannot recurse */
  addEventListener: noop, setInterval: noop, setTimeout: noop, clearTimeout: noop,
  innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
  URL: { createObjectURL: () => "", revokeObjectURL: noop },
  Blob: function () {}, Math, JSON, Date, Array, Object, String, Number, isNaN, console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(
  src + "\n;globalThis.__X={S,mouse,frame,hovered,ascentPts,mapPts,unlocked,reading,seeded,finish," +
        "toMap(){view='map';}, get view(){return view;}, get cur(){return cur;}};",
  sandbox, { filename: "ascent.html<script>" });

const X = sandbox.__X;
const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });
let t = 0;
/* one real frame of the game, with the hand where it was put */
const clickAt = (x, y) => { X.mouse.x = x; X.mouse.y = y; X.mouse.clicked = true;
                            X.frame(t += 16); };
const hoverAt = (x, y) => { X.mouse.x = x; X.mouse.y = y; return X.hovered(); };

/* ── 1 · THE DOOR IS SHUT before the water has anything to give ───────────── */
ok("D1 nothing has seeded yet", X.seeded() === 0, "seeded=" + X.seeded());
const shutPts = X.ascentPts();
ok("D2 the three ascent runs are not open",
   shutPts.every(p => !X.unlocked(p.l.n)), shutPts.map(p => p.l.n).join(", "));
ok("D3 a hand on a shut run finds nothing",
   shutPts.every(p => hoverAt(p.x, p.y) === 0));
clickAt(shutPts[1].x, shutPts[1].y);
ok("D4 clicking a shut run enters nothing — still standing on the map",
   X.view === "map", "view=" + X.view);
painted.length = 0; recording = true; X.frame(t += 16); recording = false;
ok("D5 and the map writes no name on a run that cannot be reached",
   !painted.includes("THE SEATING") && !painted.includes("THE LENS") &&
   !painted.includes("THE HELIOSTAT"),
   painted.filter(s => /^THE /.test(s)).length + " descent names painted, 0 ascent");

/* ── 2 · THE WATER GIVES SOMETHING — the game's own reading(), three of them ── */
X.reading(1, "written"); X.reading(2, "received"); X.reading(3, "released");
ok("D6 the water has now seeded one", X.seeded() >= 1, "seeded=" + X.seeded());
ok("D7 all three runs open together — no invented order among them",
   X.ascentPts().every(p => X.unlocked(p.l.n)));

/* ── 3 · THE DOOR OPENS, AND IT IS A HAND THAT OPENS IT ──────────────────── */
const P = X.ascentPts();
for (const p of P) {
  X.toMap();
  ok("D8 a hand on " + p.l.name + " finds it", hoverAt(p.x, p.y) === p.l.n, hoverAt(p.x, p.y));
  clickAt(p.x, p.y);
  ok("D9 clicking " + p.l.name + " ENTERS it from the map",
     X.view === "level" && X.cur && X.cur.key === p.l.key,
     "view=" + X.view + " cur=" + (X.cur ? X.cur.key : "none"));
}

/* ── 4 · finishing an ascent run records itself, and pollutes nothing ─────── */
X.toMap(); clickAt(P[1].x, P[1].y);        /* stand in THE SEATING */
X.finish();
ok("D10 finishing THE SEATING records it by name and returns to the map",
   X.S.done["seating"] === true && X.view === "map", "done.seating=" + X.S.done["seating"]);
ok("D11 and nothing was written under an undefined key — one map, no second registry",
   !("undefined" in X.S.done), Object.keys(X.S.done).join(", "));

/* ── 5 · THE TWELVE ARE UNHARMED ─────────────────────────────────────────── */
X.toMap();
const one = X.mapPts()[0];
ok("D12 a hand still finds THE TANK on the circuit", hoverAt(one.x, one.y) === 1);
clickAt(one.x, one.y);
ok("D13 and still enters it", X.view === "level" && X.cur.key === "tank",
   "cur=" + (X.cur ? X.cur.key : "none"));

/* ── report ──────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed ? "\ndoor: " + failed + " FAILED\n"
                   : "\ndoor: all " + results.length + " passed — the ascent is reachable from the map\n");
process.exit(failed ? 1 : 0);
