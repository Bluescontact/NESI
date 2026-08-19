#!/usr/bin/env node
/*
 * CONSERVE SEATING — THE SEATING's first conservation harness.
 *
 * Built 2026-08-19, same day and same method as tools/conserve_stations.js
 * (.claude/skills/conservation-harness/SKILL.md), applying that skill's own
 * question — "does this mechanic move or persist a unit of the player's own
 * material, and is anything counting it" — seat by seat across ascent.html.
 *
 * THE BUG THIS FOUND, SAME DAY, BEFORE THIS FILE EXISTED: THE SEATING asks
 * for 500 words, the largest writing commitment in the game, and did not
 * write a single one of them to S until BOTH halves of the player's own cut
 * finished a variable-length drift animation and physically landed near an
 * open seat. Escape — the one navigation gesture this whole build teaches
 * nowhere but relies on constantly — resets the level's local state (L)
 * unconditionally on the way back to the map, freezing that drift forever.
 * A player who wrote 500 words, cut them, and pressed Escape before both
 * halves happened to land lost the entire write, silently, with nothing
 * ever having reached S. Fixed the same pass, in ascent.html: the cut is
 * now the commit (S.lenses is written the instant the hand cuts, not when
 * physics happens to finish), each fragment's seat is saved the instant it
 * lands (L.seated is now aliased to S.seated, never copied), and the
 * single-word bypass is persisted the same way.
 *
 * THE UNIT: one lens fragment — half of a cut 500-word write, or the whole
 * of a single-word write.
 * THE INVARIANT: every word committed through THE SEATING's writing panel
 * appears in S.lenses exactly once, the instant the hand cuts (or, for a
 * single word, the instant the write closes) — regardless of whether the
 * drift-physics that decides WHICH seat a fragment lands at ever completes,
 * and regardless of navigating away and back before it does.
 *
 * Harness identical in shape to conserve_stations.js / first_four.js — vm
 * extraction of ascent.html's first <script> block, fake DOM/canvas, driven
 * through the real enter()/step()/openWrite() the way a hand would be.
 *
 *   node tools/conserve_seating.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];

/* ── the room the page runs in — identical shape to conserve_stations.js ──── */
const noop = () => {};
const SIZE = { clientWidth: 1000, clientHeight: 700 };
const ctx = new Proxy({}, {
  get: (_, k) => {
    if (k === "createLinearGradient" || k === "createRadialGradient") return () => ({ addColorStop: noop });
    if (k === "measureText") return t => ({ width: String(t).length * 7.4 });
    if (k === "canvas") return SIZE;
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
  textContent: "", get clientWidth(){return SIZE.clientWidth;}, get clientHeight(){return SIZE.clientHeight;}, scrollTop: 0,
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  setSelectionRange: noop, selectionStart: 0, selectionEnd: 0,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: SIZE.clientWidth, height: SIZE.clientHeight })
});
const byId = id => { if (!cache.has(id)) cache.set(id, mk()); return cache.get(id); };
const bag = new Map();
function Storage() {}
Storage.prototype.getItem = k => (bag.has(k) ? bag.get(k) : null);
Storage.prototype.setItem = (k, v) => { bag.set(k, String(v)); };
Storage.prototype.removeItem = k => { bag.delete(k); };
const localStorage = Object.create(Storage.prototype);

const sandbox = {
  document: { getElementById: byId, createElement: mk, createTextNode: () => ({}),
              activeElement: null, addEventListener: noop, body: mk() },
  Storage, localStorage,
  fetch: () => Promise.reject(new Error("no network in a walk")),
  XMLHttpRequest: (function(){ function X(){} X.prototype.open=noop; X.prototype.send=noop; return X; })(),
  performance: { now: () => Date.now() % 1e7 },
  requestAnimationFrame: noop,
  addEventListener: noop, setInterval: noop, setTimeout: noop, clearTimeout: noop,
  innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
  URL: { createObjectURL: () => "", revokeObjectURL: noop },
  Blob: function () {}, Math, JSON, Date, Array, Object, String, Number, isNaN, console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(
  src + "\n;globalThis.__X={S,mouse,keys,frame,unlocked,W_,save,load,worked,levelDone,ROOMS,enter,enterFace,faceOf," +
        "esc(){ if(view!=='map') view='map'; }," +
        "get room(){return room;}, L(){return L;}, bays," +
        "toMap(){view='map';}," +
        "feed(text){ if(onCommit){ const f=onCommit; typing=false; wp.style.display='none';" +
        "  onCommit=null; f(text, text.split(/\\s+/).length); } }," +
        "get typing(){return typing;}," +
        "get view(){return view;}, get cur(){return cur;}};",
  sandbox, { filename: "ascent.html<script>" });

const X = sandbox.__X;
const R = [];
const ok = (n, pass, note) => R.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

let t = 0;
const tick = (n = 1) => { for (let i = 0; i < n; i++) X.frame(t += 16); };
const enterFace = key => { X.toMap(); tick(); X.enterFace(key); tick(); };

/* a real, cuttable write — long enough that its own cut lands somewhere
   other than the very first word, short of the full 500-word cap so the
   harness stays fast */
const WRITE = Array.from({ length: 24 }, (_, i) => "word" + i).join(" ");

/* ═══ K1 · THE CUT IS THE COMMIT — words reach S the instant the hand cuts,
   before either fragment's drift has moved at all ═════════════════════════ */
{
  enterFace("seating");
  ok("K1 the writing panel opens on arrival", X.typing === true, "typing=" + X.typing);
  const before = (X.S.lenses || []).length;
  X.feed(WRITE);
  tick();
  /* the cut — any mouse position works, nearestSeam always returns one */
  X.mouse.x = 500; X.mouse.y = 100; X.mouse.clicked = true;
  tick();
  const afterCut = (X.S.lenses || []).length;
  ok("K1 both cut halves are in S.lenses immediately, before any drift has settled",
     afterCut === before + 2,
     "S.lenses " + before + " -> " + afterCut + " (expected +2, right after the cut, not after landing)");
  const words = WRITE.split(" ");
  const rebuilt = (X.S.lenses.slice(-2).join(" ").split(" ")).sort().join("|");
  ok("K1b the two halves are exactly his words, verbatim, no loss and no duplication",
     rebuilt === words.slice().sort().join("|"),
     "recombined length " + X.S.lenses.slice(-2).join(" ").split(" ").length + " of " + words.length);
}

/* ═══ K2 · THE ESCAPE TRAP — interrupt before the drift physics ever
   settles, the exact sequence that used to lose the write in full ════════ */
{
  const before = (X.S.lenses || []).length;
  enterFace("seating");
  X.feed(WRITE);
  tick();
  X.mouse.x = 500; X.mouse.y = 100; X.mouse.clicked = true;
  tick(); /* the cut fires here — drift has NOT been run forward at all */
  const afterCut = (X.S.lenses || []).length;

  /* the interruption: Escape, then straight back in, same as a real replay */
  X.esc(); tick();
  enterFace("seating"); /* enter() resets L unconditionally — the old freeze point */

  ok("K2 the cut's words survive an immediate Escape, before either fragment landed",
     (X.S.lenses || []).length === afterCut && afterCut === before + 2,
     "S.lenses held at " + X.S.lenses.length + " across the interrupt (was " + before + " before this write)");
}

/* ═══ K3 · A SINGLE-WORD WRITE PERSISTS THE SAME WAY, WITH NO CUT AT ALL ═══ */
{
  const before = (X.S.lenses || []).length;
  enterFace("seating");
  X.feed("onlyword");
  tick();
  ok("K3 a single-word write reaches S.lenses immediately, with no cut gesture",
     (X.S.lenses || []).length === before + 1 && X.S.lenses[X.S.lenses.length - 1] === "onlyword",
     "S.lenses " + before + " -> " + X.S.lenses.length);
  X.esc(); tick();
  enterFace("seating");
  ok("K3b and it survives the same Escape-and-return that used to lose everything",
     (X.S.lenses || []).length === before + 1,
     "still " + X.S.lenses.length + " after the interrupt");
}

/* ── report ──────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of R) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed
  ? "\nconserve_seating: " + failed + " FAILED — a lens fragment can be lost before it ever reaches S\n"
  : "\nconserve_seating: all " + R.length + " passed — the cut is the commit, not the landing\n");
process.exit(failed ? 1 : 0);
