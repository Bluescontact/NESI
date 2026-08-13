/* THE COLD WALK PRE-CHECK — step 2 of 2, and it is NOT the walk.
 *
 * DEMOTED 2026-08-12 on Kevin's order: "The builder's cold-walk script demotes to pre-check.
 * The verdict walk is run by a walker who did not write the build." kevin-lens found the
 * defect this closes: the instrument grading the stranger-gate was written by the builder,
 * including a carve-out the counsel itself ruled on. An author cannot be their own stranger,
 * and a green light from this file is not a verdict about anyone's experience.
 *
 * WHAT THIS FILE MAY NOW CLAIM: that the geometry fits, that controls are in frame and
 * reachable, that each invited act produces a visible change, that every control names
 * itself, and that a stranger's stones are perceptible. All of that is PRE-CHECK — necessary,
 * never sufficient, and it says nothing about what a session is like.
 *
 * WHAT ONLY A NON-BUILDER MAY RETURN: the verdict. Kevin's own hand, or a walker who did not
 * write the build. Until then the standing word is UNWITNESSED.
 *
 * Kevin's ruling, 2026-08-12 (process jurisdiction): a standing instrument and a GATE.
 * Every pass that touches any surface ends with it. It sits beside the falsifiers as the
 * instrument that catches what they cannot — because every falsifier in the build record
 * is a PROHIBITION tested against a seeded store, and A BLANK SCREEN PASSES ALL SIX
 * (cowan, 2026-08-12, filed permanent). This one carries OBLIGATIONS instead: something
 * must be present, reachable, perceptible, and nameable, from a null store, to a hand
 * that knows nothing.
 *
 * IT NEVER PASSES OR FAILS THE HUMAN HALF. The last section emits SAY-ALOUD lines that
 * stay UNWITNESSED until a person answers them from screenshots read as a person. A run
 * with those unanswered is an incomplete walk, and says so.
 *
 * SAFETY: only ever evaluated in coldwalk/nesi_coldwalk.html, whose store key cannot be
 * the live one. The instrument refuses to run against the live key.
 *
 * Usage: node tools/cold_walk_prepare.js, open the copy, evaluate this file's text.
 */
(() => {
  const R = { key: (typeof KEY === "string" ? KEY : "?"), checks: [], fails: 0 };
  if (R.key.indexOf("coldwalk") < 0)
    return { REFUSED: "not a cold profile — store key is '" + R.key + "'. Run cold_walk_prepare.js." };

  const W = () => window.innerWidth, H = () => window.innerHeight;
  /* REFUSE RATHER THAN LIE. A pane that is collapsed or not compositing reports a 0x0
     viewport, and every geometry check then reads as a failure that has nothing to do with
     the build — measured 2026-08-12, a full 9/9 FAIL against a page that had just passed.
     The same hole would produce a false PASS on another day, which is worse. An instrument
     that cannot see refuses; it does not report. */
  if (W() < 200 || H() < 200)
    return { REFUSED: "viewport is " + W() + "x" + H() + " — the pane is not displayed. Nothing measured." };
  const add = (id, ok, note) => { R.checks.push({ id, ok: !!ok, note: note || "" }); if (!ok) R.fails++; };

  /* the visible signature — what a person could see changed, reduced to a comparable string */
  const sig = () => {
    let s = [];
    document.querySelectorAll("body *").forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      if (r.bottom < 0 || r.top > H() || r.right < 0 || r.left > W()) return;
      const st = getComputedStyle(e);
      if (st.display === "none" || st.visibility === "hidden" || +st.opacity === 0) return;
      s.push(e.tagName + (e.id ? "#" + e.id : "") + "." + (e.getAttribute("class") || "") +
        "|" + Math.round(r.x) + "," + Math.round(r.y) + "," + Math.round(r.width) + "," + Math.round(r.height) +
        "|" + (e.children.length ? "" : (e.textContent || "").length) +
        "|" + (e.getAttribute("points") || e.getAttribute("d") || e.getAttribute("transform") || ""));
    });
    return s.join(";");
  };

  /* everything a hand would try: anything the page itself dresses as touchable.
     Only the OUTERMOST such element counts — a cursor is inherited, so counting every SVG
     child of a control would report a dozen "silent" shapes that are one named object. And
     a surface that has been laid aside is not off-screen by accident; it is put away. */
  const interactive = () => {
    const out = [];
    const touchableStyle = e => {
      const st = getComputedStyle(e), c = st.cursor;
      return c === "pointer" || c === "grab" || c === "ns-resize" ||
        e.tagName === "TEXTAREA" || e.tagName === "INPUT" || e.getAttribute("draggable") === "true";
    };
    document.querySelectorAll("body *").forEach(e => {
      const st = getComputedStyle(e);
      if (!touchableStyle(e)) return;
      if (e.closest(".aside")) return;
      let p = e.parentElement, nested = false;
      while (p && p !== document.body) { if (touchableStyle(p)) { nested = true; break; } p = p.parentElement; }
      if (nested) return;
      const r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      if (st.display === "none" || st.visibility === "hidden") return;
      out.push({ e, r, name: e.tagName + (e.id ? "#" + e.id : "") + (e.className && typeof e.className === "string" ? "." + e.className.split(" ")[0] : "") + (e.getAttribute("data-face") ? "[" + e.getAttribute("data-face") + "]" : "") });
    });
    return out;
  };

  const inFrame = r => r.top >= -1 && r.left >= -1 && r.bottom <= H() + 1 && r.right <= W() + 1;

  /* ---- C1 · THE PAGE FITS, OR IT ACTUALLY SCROLLS ---- */
  const sh = document.documentElement.scrollHeight, sw = document.documentElement.scrollWidth;
  const fits = sh <= H() + 2 && sw <= W() + 2;
  let scrolls = false;
  if (!fits) { const y0 = window.scrollY; window.scrollBy(0, 200); scrolls = window.scrollY !== y0; window.scrollTo(0, y0); }
  add("C1 fit-or-scroll", fits || scrolls,
    "page " + sw + "x" + sh + " · viewport " + W() + "x" + H() + (fits ? " · fits" : (scrolls ? " · scrolls" : " · OVERFLOWS AND CANNOT SCROLL")));

  /* ---- C2 · NOTHING INTERACTIVE OFF-SCREEN ---- */
  const off = interactive().filter(o => !inFrame(o.r));
  add("C2 all-interactive-in-frame", off.length === 0,
    off.length ? off.map(o => o.name + "@" + Math.round(o.r.top) + ".." + Math.round(o.r.bottom)).join(" · ") : "all inside");

  /* ---- C3 · THE CAPTION SURFACE IS INSIDE THE FRAME WHEN IT FIRES ---- */
  const teachEl = document.getElementById("teach");
  let tr = null;
  if (teachEl) { const d = teachEl.style.display; teachEl.textContent = "probe"; teachEl.style.display = "block"; tr = teachEl.getBoundingClientRect(); teachEl.style.display = d; teachEl.textContent = ""; }
  add("C3 caption-in-frame", !!tr && inFrame(tr),
    tr ? "#teach top " + Math.round(tr.top) + " bottom " + Math.round(tr.bottom) + " · viewport h " + H() : "no #teach");

  /* ---- C4 · THE RESPONSE FLOOR — each invited act must visibly change something ----

     THE SET-DOWN CARVE-OUT (ruled 2026-08-12 on composite F3, the shelf pass).
     C4 governs acts the game INVITES. Set-it-down is not invited — it is AVAILABLE.
     The world offers no control, no target and no affordance for it; the hand does it
     because it can. An act with no affordance is outside C4's scope.

     THE LOAD-BEARING HALF: C4 must NEVER be satisfied by adding an affordance. If a
     future run finds set-down failing this check, the fix is this carve-out, not a
     button, a toast, a chime, or a counter. Law 6 is the mechanic — the absence IS
     the feedback — and "making set-down testable" is how it would be broken while
     the instrument reported an improvement.

     The act list below is therefore closed on purpose: nothing may be added to it
     that the world does not itself offer a control for. ---- */
  const act = (id, fn) => {
    const before = sig();
    try { fn(); } catch (err) { add(id, false, "threw: " + err.message); return; }
    const after = sig();
    add(id, before !== after, before === after ? "NO VISIBLE CHANGE" : "changed");
  };

  const fieldEl = document.getElementById("field");
  act("C4a act:write-a-sentence", () => {
    fieldEl.focus();
    fieldEl.value = "A stranger writes one true sentence.";
    fieldEl.dispatchEvent(new Event("input", { bubbles: true }));
  });
  act("C4b act:click-the-tank-glyph", () => {
    const t = document.getElementById("tank"), r = t.getBoundingClientRect();
    ["pointerdown", "pointerup", "click"].forEach(k => t.dispatchEvent(new MouseEvent(k, { bubbles: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 })));
  });
  act("C4c act:press-Esc", () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  act("C4d act:press-Esc-again", () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));

  /* ---- C5 · A STRANGER CAN NAME WHAT IS UNDER THE CURSOR ---- */
  const unnamed = [];
  interactive().forEach(o => {
    if (teachEl) { teachEl.textContent = ""; teachEl.style.display = "none"; }
    /* a caption may be bound on the control itself OR delegated to a container that
       reads event.target — a stranger's pointer fires both, so the instrument fires both */
    o.e.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
    o.e.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
    const said = teachEl ? (teachEl.textContent || "").trim() : "";
    const shown = teachEl && getComputedStyle(teachEl).display !== "none";
    const seen = shown && inFrame(teachEl.getBoundingClientRect());
    if (!said || !seen) unnamed.push(o.name + (said ? "(said, off-frame)" : "(silent)"));
  });
  if (teachEl) { teachEl.textContent = ""; teachEl.style.display = "none"; }
  add("C5 every-control-names-itself", unnamed.length === 0, unnamed.length ? unnamed.join(" · ") : "all named and legible");

  /* ---- C6 · THE STONES A STRANGER JUST MADE ARE ON THE SCREEN ---- */
  const held = (typeof S === "object" && S && S.tank) ? S.tank.length : -1;
  let visible = 0;
  if (held > 0) {
    const words = S.tank[0].text.split(/\s+/).filter(w => w.length > 3).slice(0, 3);
    document.querySelectorAll("body *").forEach(e => {
      if (e.children.length) return;
      const r = e.getBoundingClientRect();
      if (!inFrame(r) || r.width < 4 || r.height < 4) return;
      const t = (e.textContent || "");
      if (words.some(w => t.indexOf(w) >= 0)) visible++;
    });
    /* the net draws stones as circles, not text — count those too */
    document.querySelectorAll("#netview circle").forEach(c => { const r = c.getBoundingClientRect(); if (inFrame(r) && r.width > 6) visible++; });
  }
  add("C6 held-stones-perceptible", held > 0 && visible > 0,
    "store holds " + held + " stone(s) · " + visible + " perceptible mark(s) in frame");

  /* ---- C7 · EVERY ROOM NAMES ITSELF, AND NAMES ITSELF AND NOT THE ONE BEFORE ----
     Kevin's ruling, 2026-08-12: the locator is always present. The fault this catches is
     the one a stranger actually reported — standing in an unnamed room while the line
     still described the room they left. */
  const hereEl = document.getElementById("here");
  const rooms = [];
  const visit = (label, fn) => { try { fn(); } catch (e) { rooms.push({ label, name: "THREW: " + e.message }); return; }
    const r = hereEl ? hereEl.getBoundingClientRect() : null;
    rooms.push({ label, name: hereEl ? (hereEl.textContent || "").trim() : "", inframe: !!r && inFrame(r) }); };
  visit("net", () => { openTetra(); });
  ["seq", "blind", "tiles", "table"].forEach(f => visit("face:" + f, () => openFace(f)));
  visit("world", () => { closeTetra(); });
  for (let i = 0; i < 4; i++) visit("station:" + i, () => { openStation(i); });
  visit("after-close", () => closePanel());
  const blank = rooms.filter(r => !r.name || !r.inframe);
  const distinct = new Set(rooms.map(r => r.name)).size;
  add("C7 every-room-names-itself", blank.length === 0 && distinct >= 7,
    blank.length ? "unnamed or off-frame: " + blank.map(r => r.label).join(" · ")
                 : rooms.length + " rooms · " + distinct + " distinct names · " + rooms.map(r => r.label + "=" + r.name).join(" | "));
  openTetra(); openFace("seq"); /* leave it where a player would find it */

  /* ---- C8 · THE TENSION MEMBER — a first sentence must be SEEN to land ----
     Kevin's order, 2026-08-12: act and consequence co-visible at t=0. The check is not
     "did anything change" (C4a already asks that, and the writer's own typed text satisfies
     it while the world stays hidden). It is: did anything change OUTSIDE the writing surface,
     in the frame, at the moment the sentence banked. That is the difference between a build
     that answers and a build that only records. */
  const faceEl = document.getElementById("faceview");
  const outsideSig = () => {
    let s2 = [];
    document.querySelectorAll("#netview *").forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      if (!inFrame(r)) return;
      if (faceEl && faceEl.classList.contains("on")) {
        const fr = faceEl.getBoundingClientRect();
        const covered = r.top >= fr.top - 1 && r.bottom <= fr.bottom + 1 &&
                        r.left >= fr.left - 1 && r.right <= fr.right + 1;
        if (covered) return;                       /* behind the sheet does not count */
      }
      s2.push(e.tagName + "|" + Math.round(r.x) + "," + Math.round(r.y) + "," +
              Math.round(r.width) + "," + Math.round(r.height) + "|" +
              (e.getAttribute("points") || e.getAttribute("transform") || ""));
    });
    return s2.join(";");
  };
  openTetra(); openFace("seq");
  const before8 = outsideSig();
  fieldEl.focus();
  fieldEl.value = (fieldEl.value || "") + " A second stranger writes one more true sentence.";
  fieldEl.dispatchEvent(new Event("input", { bubbles: true }));
  const after8 = outsideSig();
  add("C8 the-sentence-is-seen-to-land", before8 !== after8,
    before8 === after8
      ? "NOTHING VISIBLE OUTSIDE THE WRITING SURFACE CHANGED — the act's surface is covering the consequence's"
      : "the world visibly received it, in frame, outside the sheet");

  R.verdict = R.fails === 0 ? "PRE-CHECK PASSES — NOT A WALK. UNWITNESSED until a non-builder walks it." : "PRE-CHECK FAILS — " + R.fails + " check(s)";
  R.say_aloud = [
    "UNWITNESSED — and only a walker who did NOT write this build may answer them:",
    "1. I wrote two sentences and I SAW them become something, without being told where to look.",
    "2. I clicked each glyph and I can say each room's name aloud.",
    "3. Nothing I clicked did nothing.",
    "4. Esc laid something aside and I saw it go; Esc brought it back and I saw it come.",
    "A run with these unanswered is an INCOMPLETE WALK — the machine half is not the walk."
  ];
  return R;
})()
