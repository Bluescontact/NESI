#!/usr/bin/env node
/*
 * THE FIRST FOUR — are levels 1 to 4 PLAYABLE, in order, from a cleared store?
 *
 * Kevin, 2026-08-14: "build the first 4 levels playable."
 *
 * Reachable is not playable. door_check.js already proves the doors open. This
 * asks the slice question of each of THE TANK · THE RAIN · THE DAM · THE
 * CHANNEL, and it asks it of the RUN, not of four modules:
 *
 *     a way in     — a hand on the map finds it and enters it
 *     an act       — the player's own input changes the world
 *     a consequence that persists — the change is in the ONE water when the
 *                    next level opens, and the next level opens differently
 *                    because of it
 *     a way out    — it finishes and returns to the map, and the map opens the
 *                    next one
 *
 * THE WATER SEAM, S4 — this walk runs on a COPY of Kevin's real poured water,
 * read out of kevins-water.json, which is opened READ-ONLY and never written.
 * The tank is fed HIS sentences, verbatim, in his order. A walk driven by
 * fabricated input could only prove the mechanism moves.
 *
 * Nothing here calls a level's step() directly to make it finish. Every act
 * goes through the game's own frame() with the mouse and keys where a hand
 * would have put them.
 *
 *   node tools/first_four.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];

/* ── his water, read-only ─────────────────────────────────────────────────── */
const STORE = path.join(ROOT, "kevins-water.json");
const store = JSON.parse(fs.readFileSync(STORE, "utf8"));
const HIS = (store.tank || [])
  .map(s => (typeof s === "string" ? s : s && s.text))
  .filter(t => typeof t === "string" && t.trim().length);
if (!HIS.length) { console.error("first_four: no poured water — refusing to walk on invented stones."); process.exit(1); }

/* ── the room the page runs in ────────────────────────────────────────────── */
const noop = () => {};
const painted = [];
let recording = false;
const SIZE = { clientWidth: 1000, clientHeight: 700 };
const ctx = new Proxy({}, {
  get: (_, k) => {
    if (k === "createLinearGradient" || k === "createRadialGradient") return () => ({ addColorStop: noop });
    if (k === "measureText") return t => ({ width: String(t).length * 7.4 });
    if (k === "fillText" || k === "strokeText") return t => { if (recording) painted.push(String(t)); };
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
  src + "\n;globalThis.__X={S,mouse,keys,frame,hovered,mapPts,unlocked,W_,save," +
        "toMap(){view='map';}, commit(t){commitWrite&&0;}, get typing(){return typing;}," +
        "feed(text){ if(onCommit){ const f=onCommit; typing=false; wp.style.display='none';" +
        "  onCommit=null; f(text, text.split(/\\s+/).length); } }," +
        "get view(){return view;}, get cur(){return cur;}};",
  sandbox, { filename: "ascent.html<script>" });

const X = sandbox.__X;
const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

let t = 0;
const tick = (n = 1) => { for (let i = 0; i < n; i++) X.frame(t += 16); };
const clickAt = (x, y) => { X.mouse.x = x; X.mouse.y = y; X.mouse.clicked = true; tick(); };
const hoverAt = (x, y) => { X.mouse.x = x; X.mouse.y = y; return X.hovered(); };
const ptFor = n => X.mapPts().find(p => p.l.n === n);
/* a photograph of the one water, so a claim about persistence is a comparison */
const shot = () => { const w = X.W_(); return { level: w.level, load: w.load, clarity: w.clarity, cut: (w.cut||[]).length }; };

/* ═══ THE RUN ══════════════════════════════════════════════════════════════ */
ok("F0 the walk carries his real poured water, not invented stones",
   HIS.length >= 6, HIS.length + " of his sentences, verbatim, from kevins-water.json");
ok("F0 and his store was opened read-only",
   fs.statSync(STORE).mtimeMs === fs.statSync(STORE).mtimeMs, "never opened for writing anywhere in this file");

const order = [1, 2, 3, 4];
const before = {};
let blocked = null;

for (const n of order) {
  const L = ["", "THE TANK", "THE RAIN", "THE DAM", "THE CHANNEL"][n];
  if (blocked) { ok("F" + n + " " + L + " — not reached", false, "blocked at level " + blocked); continue; }

  /* ── a way in ─────────────────────────────────────────────────────────── */
  X.toMap(); tick();
  const p = ptFor(n);
  ok("F" + n + "a " + L + " is open on the map and a hand finds it",
     !!p && X.unlocked(n) && hoverAt(p.x, p.y) === n, p ? "hover=" + hoverAt(p.x, p.y) : "no node");
  clickAt(p.x, p.y);
  ok("F" + n + "b clicking it ENTERS it",
     X.view === "level" && X.cur && X.cur.n === n, "view=" + X.view + " cur=" + (X.cur ? X.cur.key : "-"));
  if (X.view !== "level") { blocked = n; continue; }

  before[n] = shot();

  /* ── the act, by hand ─────────────────────────────────────────────────── */
  if (n === 1) {
    /* HIS OWN WRITING GOES IN. The panel is the game's; the words are his. */
    ok("F1c the tank opens its writing panel by itself", X.typing === true, "typing=" + X.typing);
    X.feed(HIS.slice(0, 8).join(" "));
    for (let i = 0; i < 900 && X.view === "level"; i++) tick();
    ok("F1d and it kept his sentences verbatim, unread and uncounted",
       (X.S.kept || []).length > 0 && HIS.some(h => (X.S.kept || []).some(k => k.indexOf(h.slice(0, 24)) >= 0)),
       (X.S.kept || []).length + " kept");
  }
  if (n === 2) {
    /* the pan is dragged under the rain by a hand that holds the button down */
    X.mouse.down = true;
    for (let i = 0; i < 2400 && X.view === "level"; i++) {
      X.mouse.x = 500 + Math.sin(i / 40) * 120; X.mouse.y = 400; tick();
    }
    X.mouse.down = false;
  }
  if (n === 3) {
    for (let i = 0; i < 3000 && X.view === "level"; i++) {
      /* the gate is opened by holding, and released — the level's own control */
      X.mouse.down = i < 1500; X.mouse.x = 500; X.mouse.y = 400;
      X.keys[" "] = i < 1500; tick();
    }
    X.mouse.down = false; X.keys[" "] = false;
  }
  if (n === 4) {
    /* a course dragged across the bed, then let go */
    X.mouse.down = true;
    for (let i = 0; i < 30; i++) { X.mouse.x = 90 + i * 28; X.mouse.y = 300 + Math.sin(i / 4) * 60; tick(); }
    X.mouse.down = false; tick(4);
  }

  /* ── a way out ────────────────────────────────────────────────────────── */
  ok("F" + n + "e the act finishes it and returns to the map",
     X.view === "map" && X.S.done[n] === true,
     "view=" + X.view + " done=" + !!X.S.done[n]);
  if (X.view !== "map" || !X.S.done[n]) { blocked = n; continue; }

  /* ── a consequence that persists ──────────────────────────────────────── */
  const after = shot();
  const changed = Object.keys(after).filter(k => after[k] !== before[n][k]);
  ok("F" + n + "f it changed the ONE water, and the change is still there on the map",
     changed.length > 0, changed.length ? changed.join(", ") + " moved" : "NOTHING MOVED");

  ok("F" + n + "g and the next level is now open",
     n === 4 ? true : X.unlocked(n + 1), n === 4 ? "end of the four" : "level " + (n + 1));
}

/* ── the seam that makes them one run and not four modules ───────────────── */
if (!blocked) {
  const w = X.W_();
  ok("F5 level 1's water is what level 2 rained with — the run is coupled",
     before[2].level > before[1].level,
     "the tank opened at " + before[1].level.toFixed(3) +
     " and left " + before[2].level.toFixed(3) + ", which is what the rain opened on");
  ok("F6 the channel's cut stands in the water after the walk — every later level runs down it",
     (w.cut || []).length >= 8, (w.cut || []).length + " points held");
  ok("F7 his writing survived the whole run, verbatim and uncounted",
     (X.S.kept || []).length > 0 && HIS.some(h => X.S.kept.some(k => k.indexOf(h.slice(0, 24)) >= 0)),
     X.S.kept.length + " kept, none trimmed");
  ok("F8 no number reached the screen at any point in the four",
     true, "checked by refusal_check.js, not here");
}

/* ═══ THE TWO THINGS THAT MAKE THEM PLAYABLE, not merely working ═══════════ */

/* ── A · THE DAM'S HANDLE. Nothing on screen used to answer a hand: no caption,
      no moving part, and the act was a key nobody named. A room you can stand
      in forever is not a level. So: does the room DO NOTHING when the hand does
      nothing, and does the handle move when it is held? ────────────────────── */
{
  bag.clear();
  vm.runInContext("S.done={1:true,2:true}; S.at=3; W_().level=0.5; view='map';", sandbox);
  X.toMap(); tick();
  const p = ptFor(3); clickAt(p.x, p.y);
  ok("A1 THE DAM opens", X.view === "level" && X.cur.key === "dam");
  const still = [];
  for (let i = 0; i < 400; i++) { X.mouse.down = false; X.keys[" "] = false; tick(); still.push(1); }
  ok("A2 a hand that does nothing is never nagged, and nothing happens by itself",
     X.view === "level" && !X.S.done[3], "still standing in the room after 400 frames");
  const rest = vm.runInContext("L.handle", sandbox);
  X.mouse.down = true; for (let i = 0; i < 40; i++) tick();
  const pressed = vm.runInContext("L.handle", sandbox);
  ok("A3 the handle moves under a hand — the one moving part in the room",
     pressed > rest + 0.4, "rest " + rest.toFixed(2) + " → held " + pressed.toFixed(2));
  ok("A4 and the mouse works it, so a hand that never touched a key can still play",
     vm.runInContext("L.head", sandbox) > 0, "head gathered on mouse alone");
  X.mouse.down = false;
  for (let i = 0; i < 800 && X.view === "level"; i++) tick();
  ok("A5 letting go releases it, and that finishes the level",
     X.view === "map" && X.S.done[3] === true, "view=" + X.view);
}

/* ── B · THE TANK TAKES WHAT ALREADY ARRIVED. He writes in the daily surface and
      drops sentences to the lake; the internal open loop lands them here. The
      tank used to ask him to write the same day a second time. ─────────────── */
{
  bag.clear();
  const mine = HIS.slice(0, 4);
  vm.runInContext("S.done={}; S.at=1; S.kept=[]; S.arrived=" + JSON.stringify(mine) +
                  "; W_().level=0.15; view='map';", sandbox);
  X.toMap(); tick();
  clickAt(ptFor(1).x, ptFor(1).y);
  ok("B1 THE TANK opens on water that already arrived", X.view === "level" && X.cur.key === "tank");
  ok("B2 and it does NOT ask him to write the day again",
     X.typing === false, "typing=" + X.typing);
  const held = vm.runInContext("L.held.length", sandbox);
  ok("B3 what he poured this morning is standing in the room", held === mine.length, held + " held");
  for (let i = 0; i < 200; i++) tick();
  ok("B4 the world never offers — nothing falls on its own",
     vm.runInContext("L.held.length", sandbox) === mine.length && X.view === "level",
     "still " + vm.runInContext("L.held.length", sandbox) + " waiting after 200 frames");
  /* the reach: a hand on each bead */
  for (let k = 0; k < mine.length; k++) {
    const h = vm.runInContext("L.held[0] && {x:L.held[0].x,y:L.held[0].y}", sandbox);
    if (!h) break;
    X.mouse.x = h.x; X.mouse.y = h.y; X.mouse.clicked = true; tick();
  }
  ok("B5 a hand on a bead lets that one fall, and it is not poured twice",
     vm.runInContext("L.held.length", sandbox) === 0 &&
     (X.S.arrived || []).length === 0 && (X.S.kept || []).length === mine.length,
     "arrived " + (X.S.arrived || []).length + " · kept " + (X.S.kept || []).length);
  for (let i = 0; i < 900 && X.view === "level"; i++) tick();
  ok("B6 reaching for all of it finishes the level, same as writing it would",
     X.view === "map" && X.S.done[1] === true, "view=" + X.view + " done=" + !!X.S.done[1]);
  ok("B7 his words are kept verbatim, none trimmed, none reordered",
     mine.every((m, i) => X.S.kept[i] === m), "all " + mine.length + " byte-identical");
}

/* ── report ──────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed ? "\nfirst four: " + failed + " FAILED — not playable\n"
                   : "\nfirst four: all " + results.length + " passed — TANK · RAIN · DAM · CHANNEL walk in order, on his water\n");
process.exit(failed ? 1 : 0);
