/* ANSWER CHECK — the world answers a hand before it takes anything.
 *
 * THE RULE:
 *
 *     EVERY ACT HAS SOMETHING DRAWN THAT ANSWERS A HAND
 *     BEFORE THE ACT IS TAKEN.
 *
 * It is the canvas-world form of a rule `reach_check` states for a DOM world : a pointerdown target is also a hover
 * target, so the cursor changes over it. This world draws its affordances rather
 * than changing a pointer, so the test is what appears.
 *
 * BEHAVIOURAL, NOT TEXTUAL — it reads no source, so a variable with the right
 * name satisfies nothing. It puts a hand where the act is, WITHOUT COMPLETING
 * IT, and compares what is on the glass. The glass is the evidence.
 *
 *   a reach — move the hand over the thing; the screen must change, unclicked
 *   a hold  — hold the button down; the screen must change while held
 *   a draw  — press and move; the screen must follow
 *   a wait  — touch nothing at all; something must move on its own, or a hand
 *             has no way to know the room is alive rather than stuck
 *
 * IT RUNS ON A SCRATCH STORE AND PUTS BOTH THE STORE AND THE PAGE BACK. A page
 * holds its own state in memory and its next save writes that to the key, so
 * restoring the key alone would leave the walk's state in his store.
 *
 *   open ascent.html, then evaluate this file's text in the page.
 */
(() => {
  const R = [], ok = (n, pass, note) => R.push({ n, pass: !!pass, note: note == null ? "" : String(note) });
  if (typeof SET === "undefined" || typeof ROOMS === "undefined" || typeof enterFace === "undefined")
    return { REFUSED: "this is not the ascent" };

  const KEY = "nesi.ascent";
  const his = localStorage.getItem(KEY);

  const cv = document.getElementById("c"), gg = cv.getContext("2d");
  /* AN INSTRUMENT THAT CANNOT SEE REFUSES. A pane that is not compositing gives
     a zero-width canvas, and every act then reads as unanswered — a clean sweep
     of failures that says nothing about the build. cold_walk.js sets this
     precedent: refuse, do not report. */
  if (!cv.width || !cv.height)
    return { REFUSED: "the canvas is " + cv.width + "x" + cv.height +
             " — the pane is not compositing. Nothing was measured." };
  let T = 5e7;
  const step = (n = 1) => { for (let i = 0; i < n; i++) frame(T += 16); };

  /* a fingerprint of the glass — coarse on purpose, so a one-pixel wobble is not
     an affordance and a drawn thing appearing is */
  const glass = () => {
    const w = cv.width, h = cv.height;
    const d = gg.getImageData(0, 0, w, h).data;
    let a = 5381;
    for (let i = 0; i < d.length; i += 4 * 37) a = ((a * 33) ^ (d[i] + d[i + 1] * 3 + d[i + 2] * 7)) >>> 0;
    return a;
  };
  const away = () => { mouse.x = -9e3; mouse.y = -9e3; mouse.down = false; mouse.clicked = false; };

  /* enough in the world that every seat has something to answer about */
  const seed = () => {
    S.done = {}; S.faces = {}; S.off = []; S.shop = []; S.cast = false;
    S.kept = ["one of his.", "two of his.", "three of his."];
    S.arrived = ["a sentence that arrived."];
    S.caught = ["bedload", "suspended", "film"];
    S.soundings = []; S.sank = ["a", "b"]; S.ground = ["g1", "g2", "g3", "g4"];
    S.routed = { spire: 0, lake: 0, set: 0 }; S.lenses = ["a lens of his"]; S.seated = [];
    S.released = true; S.water = null;
    const w = W_(); w.level = 0.5; w.load = 0.5; w.clarity = 0.7; w.released = 0.4;
    CASE.open = false; room = null; view = "map";
    const wp = document.getElementById("wp"); if (wp) wp.style.display = "none";
    typing = false;
  };

  /* where a hand would plausibly go in this room: the stage's own things first,
     then a grid, because a check that only probes where the code says to look is
     the same mistake as reading the wrong building */
  const targets = () => {
    const t = [];
    const push = o => { if (o && typeof o.x === "number") t.push({ x: o.x, y: o.y }); };
    [L.hand].forEach(push);
    [L.bits, L.held, L.up, L.free, L.spires, L.st, L.blocks].forEach(arr => {
      if (Array.isArray(arr)) arr.slice(0, 6).forEach(push);
    });
    if (typeof bays === "function") Object.values(bays()).forEach(r => t.push({ x: r.x + r.w / 2, y: r.y + r.h / 2 }));
    if (typeof facePts === "function" && cur && cur.key === "lens") facePts().forEach(push);
    if (typeof shelfPts === "function") shelfPts().forEach(push);
    for (let gx = 1; gx <= 6; gx++) for (let gy = 1; gy <= 4; gy++)
      t.push({ x: W * gx / 7, y: H * gy / 5 });
    return t;
  };

  /* REWRITTEN 2026-08-19/20 with the map/room chrome cut (see ascent.html's
     own notes above ROOMS and above #menu's CSS). This used to click a map
     point into a room, then a room's own net-of-four into a face — both
     canvas surfaces that no longer exist; the 8-face menu that replaced them
     is DOM the same way, and calls enterFace() on a click. So this now opens
     each stage the same way: by name, through the one door every arrival in
     this file already goes through (a seam, a hash, the menu itself). */
  const enterFaceOf = key => {
    seed();
    mouse.clicked = false; step();
    enterFace(key);
    step();
    return view === "level" && cur && cur.key === key;
  };

  try {
    const stages = [];
    for (const r of ROOMS) for (const k of r.faces) stages.push({ k, g: (SET[k] || {}).g, room: r.name });

    for (const st of stages) {
      if (!enterFaceOf(st.k)) { ok("A· " + st.k, false, "could not be entered — nothing to check"); continue; }
      /* A SEAT THAT ASKS FOR WRITING FIRST HAS ITS PANEL IN THE DOM, NOT ON THE
         CANVAS, and its step returns early while `typing` — so the glass cannot
         change under a hand and the check called THE SEATING unanswerable when
         its affordance is real. The writing is committed first, then the hand
         probes what the seat actually puts on the glass. */
      if (typeof typing !== "undefined" && typing && onCommit) {
        const cb = onCommit; typing = false; onCommit = null;
        const wp = document.getElementById("wp"); if (wp) wp.style.display = "none";
        cb("a writing of his own with enough words in it to carry a seam somewhere along its length.", 16);
        step(6);
      }
      away(); step(3);
      const rest = glass();
      let answered = false, where = "";

      if (st.g === "reach") {
        for (const p of targets()) {
          away(); step();
          mouse.x = p.x; mouse.y = p.y;            /* a hand ARRIVES — no click */
          step(2);
          if (glass() !== rest) { answered = true; where = "a hand over it"; break; }
        }
      } else if (st.g === "hold") {
        away(); step(2);
        mouse.x = W / 2; mouse.y = H / 2; mouse.down = true;
        step(20);                                   /* held, never released */
        answered = glass() !== rest; where = "while held";
        mouse.down = false;
      } else if (st.g === "draw") {
        away(); step(2);
        const p = targets()[0] || { x: W * 0.3, y: H * 0.5 };
        mouse.x = p.x; mouse.y = p.y; mouse.down = true; step(2);
        for (let i = 0; i < 8; i++) { mouse.x = p.x + i * 12; mouse.y = p.y + i * 4; step(); }
        answered = glass() !== rest; where = "the course under a moving hand";
        mouse.down = false;
      } else if (st.g === "wait") {
        /* SAMPLED ACROSS THE WINDOW, NOT AT ITS ENDS. Comparing only the first
           and last frame called THE GARDEN still when it was breathing: the
           world's light is periodic, and ninety frames that begin and end near a
           stationary point of that cycle look identical. Motion is "the glass
           differs at some moment", not "the ends differ". */
        away();
        const seen = new Set();
        for (let i = 0; i < 10; i++) { seen.add(glass()); step(12); }
        answered = seen.size > 1; where = "the room moving on its own";
      }

      ok("A· " + st.k.padEnd(10) + "(" + st.g + ")", answered,
         answered ? "answers — " + where
                  : "NO ANSWER: a hand arrives and the glass does not change");
    }
  } catch (e) {
    ok("A! the check threw", false, e && e.message);
  } finally {
    if (his === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, his);
    localStorage.removeItem(KEY + ".pad");
    try {
      S.done = {}; S.faces = {}; S.off = []; S.shop = []; S.cast = false;
      S.kept = []; S.arrived = []; S.caught = []; S.soundings = []; S.sank = [];
      S.routed = { spire: 0, lake: 0, set: 0 }; S.ground = []; S.lenses = []; S.seated = [];
      S.released = false; S.water = null;
      if (typeof load === "function") load();
      room = null; view = "map"; CASE.open = false; away();
    } catch (e) {}
  }

  const failed = R.filter(r => !r.pass).length;
  return R.map(r => (r.pass ? "  ok   " : "  FAIL ") + r.n + "   " + r.note).join("\n")
    + "\n\n" + (failed ? "answer: " + failed + " act(s) the world does not answer" : "answer: all " + R.length + " answer a hand")
    + "\nhis store was held aside and put back, and the page with it.";
})()
