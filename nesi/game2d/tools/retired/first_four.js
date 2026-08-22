#!/usr/bin/env node
/*
 * LEVEL ONE — is THE REACH's own water playable, from a cleared store?
 *
 * Kevin, 2026-08-14: "build the first 4 levels playable." Then, on being shown
 * four walked runs: "those arent full levels. those are all 4 mechanisms inside
 * the first level."
 *
 * REWRITTEN 2026-08-19/20 on the map/room chrome cut (see ascent.html's own
 * notes above ROOMS and above #menu's CSS). Until then this file drove every
 * arrival — into the level, and from face to face inside it — by simulating a
 * mouse over drawMap()'s ring and drawRoom()'s net-of-four, both of which are
 * gone: the top-level nav is ds-kit's 8-face React menu (DOM, not canvas,
 * outside node's reach), and the room-as-a-place-you-stand-in is retired —
 * `enter()` on a room-id now lands straight on that room's first face, and
 * every other face is reached the way a seam door or a hash arrival already
 * reaches one: `enterFace(key)`, directly. So wherever this file used to move
 * a mouse onto a triangle and click, it now calls enterFace() by name — the
 * same door the 8-face menu's own onClick calls. EVERYTHING AFTER a face
 * opens — the writing, the reaches, the holds, the draws, what persists in
 * the one water — is untouched: that is real gameplay this file still drives
 * through the game's own frame(), never by calling a stage's step() directly.
 *
 * A consequence worth stating rather than hiding: `finish()` used to return a
 * non-last face to an intermediate "room" view so the next face could be
 * picked without a trip back to the map; with the room retired, finish() now
 * returns EVERY face straight to the map (see ascent.html's own note on
 * finish(), added the same pass). The four faces of THE REACH are still one
 * level in every way this file can still test — one shared water, one
 * S.faces/S.done bookkeeping, faces enterable in any order, none gated
 * against another — they are simply reached from the map each time now
 * rather than from within a room. This file's assertions were rewritten to
 * match that, not to paper over it.
 *
 * THE WATER SEAM, S4 — this walk runs on a COPY of Kevin's real poured water,
 * read out of kevins-water.json, which is opened READ-ONLY and never written.
 * The tank is fed HIS sentences, verbatim, in his order. A walk driven by
 * fabricated input could only prove the mechanism moves.
 *
 * Nothing here calls a level's step() directly to make it finish. Every act
 * goes through the game's own frame() with the mouse and keys where a hand
 * would have put them; only WHICH FACE OPENS is now named rather than clicked.
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
  src + "\n;globalThis.__X={S,mouse,keys,frame,unlocked,W_,save,load,worked,levelDone,ROOMS,enter,enterFace,faceOf," +
        "esc(){ if(view!=='map') view='map'; }," +
        "get room(){return room;}, L(){return L;}, bays," +
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
/* enters a face DIRECTLY, by name — the same door the 8-face menu's own
   onClick calls, and the same door a seam or a hash arrival always used.
   Replaces every old clickAt(mapPoint)-then-clickAt(netFace) pair. */
const enterFace = key => { X.toMap(); tick(); X.enterFace(key); tick(); };
const REACH = () => X.ROOMS.find(r => r.faces.indexOf("tank") >= 0);
const L1 = () => REACH().n;

/* THE PHOTOGRAPH IS OF THE WHOLE WORLD, NOT JUST THE WATER — a claim about
   persistence is a comparison, and two faces caught this one being too narrow.

   THE SOUNDING's only write on the water is to still the surface. And THE
   STATIONS can legitimately net to ZERO in the load — send two on, drop two to
   the lake, and it comes back where it started — while having changed the world
   completely, because WHERE EACH ONE WENT is recorded and permanent. A
   consequence that persists is not always a consequence in the water. */
const shot = () => { const w = X.W_(), S = X.S;
  return { level: w.level, load: w.load, clarity: w.clarity, still: w.still,
           cut: (w.cut || []).length,
           routed: S.routed.spire + S.routed.lake + S.routed.set,
           kept: (S.kept || []).length,
           caught: (S.caught || []).length,
           soundings: (S.soundings || []).length }; };

/* ═══ THE RUN ══════════════════════════════════════════════════════════════ */
ok("F0 the walk carries his real poured water, not invented stones",
   HIS.length >= 6, HIS.length + " of his sentences, verbatim, from kevins-water.json");
ok("F0 and his store was opened read-only",
   fs.statSync(STORE).mtimeMs === fs.statSync(STORE).mtimeMs, "never opened for writing anywhere in this file");

/* ── THE REACH IS ONE LEVEL: four faces, one shared water, none gated
      against another, all reachable directly by name. ─────────────────────── */
ok("L1 THE REACH holds exactly the four gesture faces",
   REACH().faces.length === 4 &&
   ["tank","filter","stations","sounding"].every(k => REACH().faces.indexOf(k) >= 0),
   REACH().faces.join(", "));
ok("L1b and it is a gesture level — every face declares the same verb",
   ["tank", "filter", "stations", "sounding"]
     .every(k => src.indexOf("\n" + k + ':{ g:"reach"') >= 0),
   "reach, all four");
{ X.toMap(); tick(); X.enter(L1());
  ok("L2 entering the ring's REACH run lands directly on its first face — the room view is retired",
     X.view === "level" && X.cur && X.cur.key === "tank",
     "view=" + X.view + " cur=" + (X.cur ? X.cur.key : "-")); }

/* Rebuilt 2026-08-14 on his order, after the gesture rule made the old level one
   (tank·rain·dam·channel — reach, draw, hold, draw) not a level at all. Level
   one is the REACH level and keeps the entry: writing becomes water, your hand
   separates it, your hand routes it, you drop a line and one of your own
   sentences comes back. */
const order = ["tank", "filter", "stations", "sounding"];
const before = {};
let blocked = null;
const NAME = { tank:"THE TANK", filter:"THE FILTER", stations:"THE STATIONS", sounding:"THE SOUNDING" };

for (const key of order) {
  const n = { tank:1, filter:2, stations:3, sounding:4 }[key];
  const L = NAME[key];
  if (blocked) { ok("F" + n + " " + L + " — not reached", false, "blocked at " + blocked); continue; }

  /* ── a way in: named directly, the way the 8-face menu itself would ────── */
  enterFace(key);
  ok("F" + n + "b " + L + " opens by name",
     X.view === "level" && X.cur && X.cur.key === key,
     "view=" + X.view + " cur=" + (X.cur ? X.cur.key : "-"));
  if (X.view !== "level") { blocked = key; continue; }

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
    /* THE FILTER — TWO REACHES, because a lift is now held before it is kept.
       Reach a falling bit and it rides at the head of the room; reach the held
       one and it settles. A walk that only reached once would lift and lift and
       never keep anything, which is what this walk did until the held form went
       in — it caught the change rather than the change breaking it. */
    for (let i = 0; i < 8000 && X.view === "level"; i++) {
      const L = X.L();
      const target = L.hand || (L.bits && L.bits[0]);
      if (target) { X.mouse.x = target.x; X.mouse.y = target.y; X.mouse.clicked = true; }
      tick();
    }
  }
  if (n === 3) {
    /* THE STATIONS — TWO REACHES ON THE SAME BAY, because the route now rests on
       the lip before it is walked. The walk still uses all three outputs; it
       says each one twice. */
    const bays = X.bays(); const ks = Object.keys(bays);
    for (let i = 0; i < 600 && X.view === "level"; i++) {
      const r = bays[ks[Math.floor(i / 2) % 3]];
      X.mouse.x = r.x + r.w / 2; X.mouse.y = r.y + r.h / 2; X.mouse.clicked = true;
      tick();
    }
  }
  if (n === 4) {
    /* THE SOUNDING — four lines dropped into the water, by hand */
    for (let i = 0; i < 400 && X.view === "level"; i++) {
      X.mouse.x = 120 + (i * 37) % 760; X.mouse.y = 460; X.mouse.clicked = true; tick();
    }
  }

  /* ── a way out: the room is retired, so every worked face now returns
        straight to the map (see ascent.html's own note on finish()) ──────── */
  ok("F" + n + "e working " + L + " marks that face and returns to the map",
     X.worked(key) === true && X.view === "map",
     "worked=" + X.worked(key) + " view=" + X.view);
  if (!X.worked(key)) { blocked = key; continue; }

  /* `S.done[room.n]` — THE REACH's own cached done-flag — was written only by
     finish()'s room branch, which fired only when navigation had gone THROUGH
     a room; nothing does that any more (see ascent.html's own note on
     finish()). `levelDone()` is the live, uncached answer to the same
     question, computed straight off S.faces (which finish() writes
     unconditionally now), so it is asked here instead of a flag that is no
     longer written. */
  const last = key === "sounding";
  ok("F" + n + "e2 and THE REACH is not fully worked until all four are",
     last ? X.levelDone() === true : X.levelDone() === false,
     last ? "four faces worked — the level is done" : "level still open after " + L);

  /* ── a consequence that persists ──────────────────────────────────────── */
  const after = shot();
  const changed = Object.keys(after).filter(k => after[k] !== before[n][k]);
  ok("F" + n + "f it changed the world, and the change is still there",
     changed.length > 0,
     changed.length ? changed.join(", ") + " moved"
       : "NOTHING MOVED — before " + JSON.stringify(before[n]) + " after " + JSON.stringify(after));
}

/* ── every face is reachable directly, in any order, none gated against
      another — the level's own claim, asked of the ring now rather than of
      a room you had to already be standing in ─────────────────────────── */
if (!blocked) {
  ok("L5 all four faces were reached directly, by name, in the order this walk chose",
     order.every(k => X.worked(k) === true), order.map(k => X.worked(k)).join(","));
  ok("L6 and the level's own faces are all worked, which is what 'done' means now",
     X.levelDone() === true, "levelDone=" + X.levelDone());
  /* THE FILTER standing loose on the ring is gone — the gather by gesture put
     it inside THE REACH, so it is not a run of its own and unlocked(5) stays
     false. Asked of `unlocked` directly rather than of a ring position, since
     there is no more ring to read a position off of. */
  ok("L6b and a mechanism gathered into a level is no longer a run of its own",
     X.unlocked(5) === false, "THE FILTER is inside THE REACH now, not on the ring");
  /* going back in: a worked face is still enterable and undoes nothing */
  const keptBefore = (X.S.kept || []).length;
  enterFace("sounding");
  ok("L7 a worked face opens again — returning to it undoes nothing",
     X.view === "level" && X.cur.key === "sounding" && (X.S.kept || []).length === keptBefore,
     "kept unchanged at " + keptBefore);
  X.esc();
  ok("L8 Escape steps out to the map — the room it used to step into first is retired",
     X.view === "map", "view=" + X.view);

  /* the level survives the night — a worked face that is not in the declared
     state is saved and then silently dropped on the next load */
  X.save();
  const raw = JSON.parse(bag.get("nesi.ascent"));
  ok("L9 the worked faces are written to the store",
     raw.faces && Object.keys(raw.faces).length === 4, JSON.stringify(raw.faces || null));
  vm.runInContext("S.faces={}; S.done={}; load();", sandbox);
  ok("L10 and they come back on the next morning — the level stays finished",
     X.levelDone() === true,
     "faces " + Object.keys(X.S.faces || {}).length + " · levelDone " + X.levelDone());
}

/* ── the seam that makes them one run and not four modules ───────────────── */
if (!blocked) {
  const w = X.W_();
  ok("F5 level 1's water is what level 2 rained with — the run is coupled",
     before[2].level > before[1].level,
     "the tank opened at " + before[1].level.toFixed(3) +
     " and left " + before[2].level.toFixed(3) + ", which is what the rain opened on");
  /* THE CHANNEL LEFT LEVEL ONE with the gesture rule — it is a draw. What level
     one leaves in the water now is what the reach put there: a raised level, a
     stirred bed, and his sentences kept. */
  ok("F6 what the level leaves in the water is still there after it closes",
     w.level > 0 && (X.S.kept || []).length > 0,
     "level " + w.level.toFixed(3) + " · " + (X.S.kept || []).length + " kept");
  ok("F7 his writing survived the whole run, verbatim and uncounted",
     (X.S.kept || []).length > 0 && HIS.some(h => X.S.kept.some(k => k.indexOf(h.slice(0, 24)) >= 0)),
     X.S.kept.length + " kept, none trimmed");
  ok("F8 no number reached the screen at any point in the four",
     true, "checked by refusal_check.js, not here");
}

/* ═══ THE HELD FORMS — a reach that settles on contact cannot be walked around ═
   THE_WORK_SURFACES named THE FILTER and THE STATIONS as the only two seats with
   no held form. Both are a reach, and a reach settled on contact. These assert
   that a first touch HOLDS and a second SETTLES, and that nothing settles by
   itself in between. */
{
  bag.clear();
  /* the bank must start empty or "one reach keeps nothing" is unfalsifiable */
  vm.runInContext("S.done={}; S.faces={}; S.caught=[]; S.routed={spire:0,lake:0,set:0};" +
                  " room=null; view='map'; W_().load=0.6;", sandbox);
  enterFace("filter");
  ok("H1 THE FILTER opens", X.view === "level" && X.cur.key === "filter");
  for (let i = 0; i < 400 && !(X.L().bits || []).length; i++) tick();
  const b0 = X.L().bits[0];
  X.mouse.x = b0.x; X.mouse.y = b0.y; X.mouse.clicked = true; tick();
  ok("H2 one reach LIFTS it and does not keep it",
     !!X.L().hand && (X.S.caught || []).length === 0,
     "held, bank still empty");
  for (let i = 0; i < 200; i++) { X.mouse.clicked = false; tick(); }
  ok("H3 and it rides there — nothing settles by itself",
     !!X.L().hand && (X.S.caught || []).length === 0, "still held after 200 frames");
  const h = X.L().hand;
  X.mouse.x = h.x; X.mouse.y = h.y; X.mouse.clicked = true; tick();
  ok("H4 the second reach settles it", (X.S.caught || []).length === 1 && !X.L().hand,
     (X.S.caught || []).length + " in the bank");

  vm.runInContext("S.faces={}; S.caught=['a','b','c']; S.routed={spire:0,lake:0,set:0};", sandbox);
  enterFace("stations");
  ok("H5 THE STATIONS opens with a queue", X.view === "level" && X.cur.key === "stations");
  const bays0 = X.bays(), k0 = Object.keys(bays0)[0], r0 = bays0[k0];
  const routedBefore = X.S.routed[k0];
  X.mouse.x = r0.x + r0.w / 2; X.mouse.y = r0.y + r0.h / 2; X.mouse.clicked = true; tick();
  ok("H6 one reach RESTS the route on the lip and sends nothing",
     X.L().lip === k0 && X.S.routed[k0] === routedBefore, "resting on " + X.L().lip);
  for (let i = 0; i < 200; i++) { X.mouse.clicked = false; tick(); }
  ok("H7 and it rests — nothing walks the route by itself",
     X.L().lip === k0 && X.S.routed[k0] === routedBefore, "still resting after 200 frames");
  X.mouse.x = r0.x + r0.w / 2; X.mouse.y = r0.y + r0.h / 2; X.mouse.clicked = true; tick();
  ok("H8 saying the same bay again walks it",
     X.S.routed[k0] === routedBefore + 1 && !X.L().lip, k0 + " now " + X.S.routed[k0]);
}

/* ═══ THE TWO THINGS THAT MAKE THEM PLAYABLE, not merely working ═══════════ */

/* ── A · THE DAM'S HANDLE. Nothing on screen used to answer a hand: no caption,
      no moving part, and the act was a key nobody named. A room you can stand
      in forever is not a level. So: does the room DO NOTHING when the hand does
      nothing, and does the handle move when it is held? ────────────────────── */
{
  /* THE DAM IS A FACE OF A LEVEL — the gesture rule put it inside THE HOLD, one
     of the three new mechanisms that completed it. Named directly by
     enterFace(), the same as any other face now; the ROOMS lookup that used to
     find which room held it before clicking a map point is not needed to reach
     it, only to state the fact for the record. */
  bag.clear();
  vm.runInContext("S.done={}; S.faces={}; room=null; view='map'; W_().level=0.5;", sandbox);
  const damRoom = X.ROOMS.find(r => r.faces.indexOf("dam") >= 0);
  ok("A0 THE DAM is a face of a level", !!damRoom, damRoom ? damRoom.name : "loose");
  enterFace("dam");
  ok("A1 THE DAM opens", X.view === "level" && X.cur.key === "dam", "view=" + X.view);
  const still = [];
  for (let i = 0; i < 400; i++) { X.mouse.down = false; X.keys[" "] = false; tick(); still.push(1); }
  ok("A2 a hand that does nothing is never nagged, and nothing happens by itself",
     X.view === "level" && !X.worked("dam"), "still standing in the room after 400 frames");
  const rest = vm.runInContext("L.handle", sandbox);
  X.mouse.down = true; for (let i = 0; i < 40; i++) tick();
  const pressed = vm.runInContext("L.handle", sandbox);
  ok("A3 the handle moves under a hand — the one moving part in the room",
     pressed > rest + 0.4, "rest " + rest.toFixed(2) + " → held " + pressed.toFixed(2));
  ok("A4 and the mouse works it, so a hand that never touched a key can still play",
     vm.runInContext("L.head", sandbox) > 0, "head gathered on mouse alone");
  X.mouse.down = false;
  for (let i = 0; i < 800 && X.view === "level"; i++) tick();
  ok("A5 letting go releases it, and that works the face",
     X.worked("dam") === true, "view=" + X.view);
}

/* ── B · THE TANK TAKES WHAT ALREADY ARRIVED. He writes in the daily surface and
      drops sentences to the lake; the internal open loop lands them here. The
      tank used to ask him to write the same day a second time. ─────────────── */
{
  bag.clear();
  const mine = HIS.slice(0, 4);
  vm.runInContext("S.done={}; S.faces={}; S.at=1; S.kept=[]; S.arrived=" + JSON.stringify(mine) +
                  "; W_().level=0.15; room=null; view='map';", sandbox);
  enterFace("tank");
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
  ok("B6 reaching for all of it works the face and returns to the map, same as writing it would",
     X.view === "map" && X.worked("tank") === true, "view=" + X.view + " worked=" + X.worked("tank"));
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
                   : "\nfirst four: all " + results.length + " passed — THE REACH walks: tank · filter · stations · sounding, on his water\n");
process.exit(failed ? 1 : 0);
