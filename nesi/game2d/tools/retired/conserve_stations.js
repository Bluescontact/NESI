#!/usr/bin/env node
/*
 * CONSERVE STATIONS — THE STATIONS' first conservation harness.
 *
 * Built 2026-08-19 on the conservation-harness skill's own method
 * (.claude/skills/conservation-harness/SKILL.md), the day a game-craft pass
 * named this codebase's `S.caught`/`S.routed` routing as unchecked by
 * anything: "no caption, screenshot, or geometry check can see a duplicated
 * or dropped unit of a player's own material. Only a count can."
 *
 * THE BUG THIS FOUND, SAME DAY, BEFORE THIS FILE EXISTED: `stations.enter()`
 * read `L.queue = S.caught.slice(0,6)` — a COPY, not a cut. Nothing removed
 * a routed item from S.caught, so leaving and re-entering the seat re-queued
 * and re-routed the SAME caught fractions, forever, and `S.routed` (which
 * feeds the water's own `load`) could grow without bound from a `S.caught`
 * that never grew at all. Fixed the same pass, in `ascent.html`, by
 * consuming one item from the front of `S.caught` at the instant it is
 * actually routed (`S.caught.shift()`), mirroring the front the queue was
 * built from.
 *
 * THE UNIT: one caught fraction, an entry in `S.caught`.
 * THE INVARIANT: for any sequence of STATIONS visits, total routed
 * (S.routed.spire + S.routed.lake + S.routed.set, summed only over what
 * THIS harness itself routed) plus whatever remains in S.caught must equal
 * exactly what was ever put into S.caught. Nothing may be routed twice;
 * nothing may vanish uncounted.
 *
 * Harness borrowed from tools/first_four.js — same vm-extraction of
 * ascent.html's first <script> block, same fake DOM/canvas. This file adds
 * no gameplay path of its own; it drives the real `enter()`/`step()`/`send()`
 * the way a hand's reach on a bay does, twice on the same bay, exactly as
 * THE HELD FORM requires.
 *
 *   node tools/conserve_stations.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];

/* ── the room the page runs in — identical shape to first_four.js's harness ── */
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
        "get view(){return view;}, get cur(){return cur;}};",
  sandbox, { filename: "ascent.html<script>" });

const X = sandbox.__X;
const R = [];
const ok = (n, pass, note) => R.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

let t = 0;
const tick = (n = 1) => { for (let i = 0; i < n; i++) X.frame(t += 16); };
const enterFace = key => { X.toMap(); tick(); X.enterFace(key); tick(); };

/* ── seed synthetic caught fractions — conserve.js's own convention: a
      structural conservation check tests the SHAPE of routing, not the
      content a real hand's FILTER gesture would have produced ─────────────── */
const seed = n => { X.S.caught = Array.from({ length: n }, (_, i) => "probe" + i); };

const routedTotal = () => X.S.routed.spire + X.S.routed.lake + X.S.routed.set;

/* drives exactly `n` full reach-then-confirm routings, cycling the three
   bays, the same two-reach-per-route pattern first_four.js's own F3 uses */
const routeN = n => {
  const bays = X.bays(); const ks = Object.keys(bays);
  let routed = 0, guard = 0;
  while (routed < n && guard < n * 40 + 40) {
    guard++;
    const before = routedTotal();
    const r = bays[ks[routed % 3]];
    X.mouse.x = r.x + r.w / 2; X.mouse.y = r.y + r.h / 2; X.mouse.clicked = true;
    tick();
    X.mouse.x = r.x + r.w / 2; X.mouse.y = r.y + r.h / 2; X.mouse.clicked = true;
    tick();
    if (routedTotal() > before) routed++;
  }
  return routed;
};

/* ═══ K1 · ONE VISIT ROUTES EXACTLY WHAT WAS QUEUED, NOTHING MORE ══════════ */
{
  seed(4);
  const startRouted = routedTotal();
  enterFace("stations");
  const before = X.S.caught.length;
  const actuallyRouted = routeN(4);
  const grew = routedTotal() - startRouted;
  ok("K1 one visit: S.caught shrinks by exactly what was routed",
     X.S.caught.length === before - actuallyRouted,
     "caught " + before + " -> " + X.S.caught.length + " · routed this visit " + actuallyRouted);
  ok("K1b and S.routed grows by exactly that many, not more",
     grew === actuallyRouted,
     "S.routed grew by " + grew + " · expected " + actuallyRouted);
}

/* ═══ K2 · THE BUG'S OWN SHAPE: RE-ENTERING DOES NOT RE-ROUTE THE SAME MATERIAL
   Before the fix, `enter()` re-read `S.caught.slice(0,6)` — a stale COPY —
   so leaving with caught already fully routed and coming back re-queued and
   re-routed the same (now-empty, or worse, still-numbered) items. The
   decisive check: after a visit that routes everything, S.caught is empty,
   and a second visit must find NOTHING to route. ══════════════════════════ */
{
  seed(3);
  enterFace("stations");
  routeN(3);
  const routedAfterFirst = routedTotal();
  ok("K2 a fully-routed visit empties S.caught, not merely the local queue",
     X.S.caught.length === 0, "S.caught left with " + X.S.caught.length);

  /* leave and come back — the exact replay the bug lived on */
  X.esc(); tick();
  enterFace("stations");
  const secondPassRouted = routeN(3); /* asks for 3; none are actually available */
  ok("K2b re-entering with nothing left to route, routes nothing — the replay is closed",
     secondPassRouted === 0 && routedTotal() === routedAfterFirst,
     "second-visit routed " + secondPassRouted + " · S.routed total unchanged at " + routedTotal());
}

/* ═══ K3 · A PARTIAL VISIT LEAVES EXACTLY ITS REMAINDER, NOTHING LOST ══════ */
{
  seed(6);
  enterFace("stations");
  const partialRouted = routeN(2);           /* route only 2 of 6, then abandon */
  const remainderAfterPartial = X.S.caught.length;
  ok("K3 abandoning after a partial visit leaves the true remainder in S.caught",
     remainderAfterPartial === 6 - partialRouted,
     "routed " + partialRouted + " of 6 · S.caught left holding " + remainderAfterPartial);

  X.esc(); tick();
  enterFace("stations");
  const rest = routeN(remainderAfterPartial);
  ok("K3b returning routes exactly the remainder — total ever routed equals total ever caught",
     partialRouted + rest === 6 && X.S.caught.length === 0,
     "routed " + partialRouted + " + " + rest + " = " + (partialRouted + rest) + " of 6 · S.caught left with " + X.S.caught.length);
}

/* ── report ──────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of R) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed
  ? "\nconserve_stations: " + failed + " FAILED — a caught fraction can be routed more than once, or lost\n"
  : "\nconserve_stations: all " + R.length + " passed — one caught fraction, one landing, however many visits it takes\n");
process.exit(failed ? 1 : 0);
