#!/usr/bin/env node
/*
 * CUT CHECK — walks level 9's seam with a real hand on it.
 *
 * WHAT IT IS FOR. Until 2026-08-14, ascent.html cut the 500-word writing at
 * Math.ceil(w.length/2) — the machine's own exact middle, a computed pass on the
 * player's words. Kevin's mark: "fix the 500 halving so the hand cuts it."
 * A prohibition-style check ("no Math.ceil in the file") would pass on a blank
 * screen, so this does the opposite: it puts a hand at a coordinate, clicks, and
 * asserts the cut landed where the hand was and nowhere else.
 *
 * THE WATER SEAM, S4. The writing fed to the panel is Kevin's own poured water,
 * read from kevins-water.json READ-ONLY, verbatim and in order. His store is
 * never opened for writing here. No synthetic stones.
 *
 * It drives the real script block from ascent.html in a VM against a stub DOM,
 * the same instrument boot_check.js uses, because the preview pane pins one JS
 * realm and cannot be re-booted honestly.
 *
 *   node tools/cut_check.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];

/* ---- S4: his real water, read-only, verbatim, in order ---- */
const store = JSON.parse(fs.readFileSync(path.join(ROOT, "kevins-water.json"), "utf8"));
const POURED = (store.tank || []).map(s => s.text).filter(Boolean).join(" ");
const POURED_WORDS = POURED.trim().split(/\s+/).filter(Boolean);
if (POURED_WORDS.length < 12) {
  console.error("cut: his store holds too little to cut. Nothing walked.");
  process.exit(1);
}

/* ---- the thinnest DOM that lets the level run, plus a recording 2D context ---- */
const noop = () => {};
const painted = [];          /* every string that reached the screen this frame */
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

/* a save standing with levels 1–8 behind it, so level 9 is reachable from the map */
const done = {}; for (let i = 1; i <= 8; i++) done[i] = true;
bag.set("nesi.ascent", JSON.stringify({ schema: "ascent.2", done, at: 8 }));

const sandbox = {
  document: { getElementById: byId, createElement: mk, createTextNode: () => ({}),
              activeElement: null, addEventListener: noop, body: mk() },
  Storage, localStorage,
  fetch: () => Promise.reject(new Error("no network in a walk")),
  XMLHttpRequest: (function(){function X(){};X.prototype.open=function(){};X.prototype.send=function(){};return X;})(),   /* the case instruments it; nothing calls it */
  performance: { now: () => Date.now() % 1e7 },
  requestAnimationFrame: noop,     /* the loop is driven by hand below, frame by frame */
  addEventListener: noop, setInterval: noop, setTimeout: noop, clearTimeout: noop,
  innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
  URL: { createObjectURL: () => "", revokeObjectURL: noop },
  Blob: function () {}, Math, JSON, Date, Array, Object, String, Number, isNaN, console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
/* THE WAY IN NOW EXISTS, AND THIS USES IT. Until 2026-08-14 THE SEATING lived in
   ASCENT, an array enter() never read — no node, no click, no path — so this
   harness had to reach in and set `cur` itself, and said so here rather than
   hiding it. Kevin's mark "build the door into the ascent" closed that: the
   three ascent runs are drawn on the map above the water and enter() resolves
   them by name. So the walk below opens THE SEATING the way a hand does. The
   door itself is walked by tools/door_check.js. */
vm.runInContext(
  src + "\n;globalThis.__X={SET,S,mouse,commitWrite,cutLayout,nearestSeam," +
        "enter,reading,seeded," +
        "get L(){return L;},get view(){return view;},get typing(){return typing;}};",
  sandbox, { filename: "ascent.html<script>" });

const X = sandbox.__X;
const wt = byId("wt");
const results = [];
const ok = (name, pass, note) => results.push({ name, pass: !!pass, note: note == null ? "" : String(note) });

/* The water is given something to give, by the game's own reading() — the same
   call the twelve make. Without it the door is shut, which is the point of it. */
X.reading(1, "written"); X.reading(2, "received"); X.reading(3, "released");

/* ── the walk ─────────────────────────────────────────────────────────────── */
function openLevel9() {
  X.enter("seating");                           /* through the real door, by name */
  wt.value = POURED;                            /* his water, into the field */
  X.commitWrite();                              /* the way the game itself commits */
  return X.L;
}

/* 1 · the panel took his water and laid it down UNCUT */
let L = openLevel9();
ok("W1 THE SEATING opened and the writing landed",
   X.view === "level" && Array.isArray(L.words) && L.words.length === POURED_WORDS.length,
   (L.words ? L.words.length : "no") + " words");
ok("W2 NOTHING IS CUT until a hand cuts it — no default, no midpoint",
   L.cut === null && (!L.free || L.free.length === 0), "cut=" + L.cut);

/* 2 · HELD IS LAWFUL — 240 frames with no hand on it changes nothing */
for (let i = 0; i < 240; i++) X.SET.seating.step(16);
ok("W3 240 frames with no hand: still uncut, still standing in the level",
   L.cut === null && X.view === "level", "cut=" + L.cut + " view=" + X.view);

/* 3 · THE HAND CUTS. A click far to the LEFT of the machine's old midpoint. */
const lay = X.cutLayout(L.words);
const machineMid = Math.ceil(L.words.length / 2);      /* what it used to do */
const target = lay.seams[Math.floor(lay.seams.length * 0.17)];
X.mouse.x = target.x; X.mouse.y = target.y;
const aimed = X.nearestSeam(lay);
X.mouse.clicked = true;
X.SET.seating.step(16);
ok("W4 the cut landed at the seam the hand was on",
   L.cut === aimed.i, "cut=" + L.cut + " hand=" + aimed.i);
ok("W5 and it is NOT the machine's old midpoint — counterfactual measured",
   L.cut !== machineMid, "hand cut " + L.cut + " · Math.ceil(n/2) would have been " + machineMid);
ok("W6 two lenses were released, neither of them empty",
   L.free.length === 2 && L.free.every(f => f.t.trim().length > 0),
   L.free.map(f => f.t.split(" ").length).length + " parts");

/* 4 · VERBATIM — law 4. The two lenses rejoin to exactly what he poured. */
const rejoined = L.free.map(f => f.t).join(" ");
ok("W7 the two lenses rejoin BYTE-IDENTICAL to his poured water",
   rejoined === POURED_WORDS.join(" "),
   rejoined === POURED_WORDS.join(" ") ? "identical" : "DIVERGED");
ok("W8 no word was broken — every word survives whole and in order",
   L.free.map(f => f.t.split(" ")).flat().join(" ") === POURED_WORDS.join(" "));

/* 5 · A DIFFERENT HAND CUTS DIFFERENTLY — the proof it is the hand and not the file */
L = openLevel9();
const lay2 = X.cutLayout(L.words);
const far = lay2.seams[Math.floor(lay2.seams.length * 0.83)];
X.mouse.x = far.x; X.mouse.y = far.y;
const aimed2 = X.nearestSeam(lay2);
X.mouse.clicked = true;
X.SET.seating.step(16);
ok("W9 a hand at the other end cuts at the other end",
   L.cut === aimed2.i && L.cut !== aimed.i,
   "first hand cut " + aimed.i + " · second hand cut " + L.cut);

/* 6 · EVERY seam is cuttable and none of them empties a side */
L = openLevel9();
const lay3 = X.cutLayout(L.words);
let badSeam = null;
for (const s of lay3.seams) {
  const a = L.words.slice(0, s.i), b = L.words.slice(s.i);
  if (!a.length || !b.length) { badSeam = s.i; break; }
}
ok("W10 all " + lay3.seams.length + " seams leave both sides standing",
   badSeam === null && lay3.seams.length === L.words.length - 1,
   badSeam === null ? "n-1 seams, none empty" : "seam " + badSeam + " empties a side");

/* 7 · NO NUMBER REACHES THE SCREEN — law 2, measured off the real draw call */
painted.length = 0; recording = true;
X.SET.seating.draw();
recording = false;
const strays = painted.filter(t => !L.words.includes(t));
const digits = painted.filter(t => /\d/.test(t) && !POURED.includes(t));
ok("W11 the cut surface paints his words and nothing else",
   strays.length === 0, strays.length ? "STRAY: " + strays.slice(0, 4).join(" | ") : painted.length + " strings, all his");
ok("W12 no count, no total, no number of the machine's own",
   digits.length === 0, digits.length ? "DIGITS: " + digits.slice(0, 4).join(" | ") : "none");

/* 8 · ONE WORD HAS NO SEAM — it is a single lens, not a crash */
X.enter("seating"); wt.value = "unaccompanied"; X.commitWrite();
const L1 = X.L;
ok("W13 a one-word writing becomes one lens and asks for no cut",
   L1.cut === null && L1.free.length === 1 && L1.free[0].t === "unaccompanied",
   L1.free.length + " lens");

/* ── report ───────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.name + (r.note ? "   [" + r.note + "]" : ""));
}
console.log("\n  his store: read-only, " + (store.tank || []).length + " stones, " +
            POURED_WORDS.length + " words poured into the panel");
console.log(failed ? "\ncut: " + failed + " FAILED\n" : "\ncut: all " + results.length + " passed\n");
process.exit(failed ? 1 : 0);
