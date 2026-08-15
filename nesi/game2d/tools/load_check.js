/* THE LOAD CHECK — the seven clauses of the load law, inverted.
 *
 * THE LAW, adopted 2026-08-15, and the audit that ran on it the same day:
 * six of its seven clauses were ABSENCE-PASSING. "Load is not read, not
 * inferred, not computed and never defaulted" is passed completely, and
 * perfectly, by a page that has no load member at all. The law protecting the
 * hand's answer was satisfied by never asking.
 *
 * So every clause here is stated as a PRESENCE. Not "nothing defaults it" but
 * "four affordances are on the glass, the slot is hollow, and it stays hollow
 * until a hand touches one." A clause that a blank surface can pass is not a
 * clause; it is a preference the blank surface happens to share.
 *
 * THE CONTROL IS THE POINT, and it is run, not asserted. The seven are run
 * twice: once against the page as it stands, and once with `loadMember`
 * replaced by a stub that draws nothing. The second run must pass ZERO. If it
 * passes even one, that clause is absence-passing and is not a clause yet.
 *
 * BEHAVIOURAL. It reads no source. It types into the real textarea, opens the
 * real panel, dispatches real pointer and mouse events at the real spans, and
 * reads what is in the DOM afterwards. A variable with the right name
 * satisfies nothing here.
 *
 * IT RUNS ON A SCRATCH STORE AND PUTS BOTH STORES AND THE PAGE BACK.
 *
 *   open daily.html, then evaluate this file's text in the page.
 */
(() => {
  if (typeof S === "undefined" || typeof bandCut !== "function")
    return { REFUSED: "this is not the daily surface" };
  if (typeof loadMember !== "function")
    return { REFUSED: "this surface has no load member — there is nothing to check. " +
                      "That is the finding, not an error." };

  const KEY = "nesi.water", ASC = "nesi.ascent";
  const hisWater = localStorage.getItem(KEY), hisAscent = localStorage.getItem(ASC);
  const realMember = loadMember;

  const up = document.getElementById("up");
  const type  = v => { page.value = v; page.dispatchEvent(new Event("input")); };
  const clear = () => {
    S.stones = []; S.past = []; S.text = ""; S.mark = 0; S.n = 1; S.lastSeen = "";
    S.returns = 0; S.today = "2026-08-15"; page.value = ""; openStone = -1;
  };
  /* a stone in the hand: three sentences banked, the first one brought up */
  const stone = () => {
    clear(); type("Alpha one. Beta two. Gamma three.");
    openStone = S.stones.indexOf(held()[0]); paintUp();
    return S.stones[openStone];
  };
  const mem   = () => up.querySelector(".load");
  const slot  = () => up.querySelector(".load .slot");
  const words = () => [...up.querySelectorAll(".load .w")];
  const overs = w => { const e = words().find(x => x.textContent === w);
                       if (!e) return false; e.dispatchEvent(new PointerEvent("pointerenter", {bubbles:false})); return true; };
  const say   = w => { const e = words().find(x => x.textContent === w);
                       if (!e) return false; e.dispatchEvent(new MouseEvent("click", {bubbles:true})); return true; };

  /* ── the seven, each stated as a presence ───────────────────────────────── */
  const CLAUSES = [

  ["L1 the member is ON SCREEN and the seat cannot fill it", () => {
    const st = stone();
    if (!mem()) return [false, "no member is drawn on a stone in the hand"];
    /* the seat may not answer it: paint it twenty times and it is still unanswered */
    for (let i = 0; i < 20; i++) paintUp();
    return [words().length === 4 && st.load === undefined,
            words().length + " affordances, load=" + JSON.stringify(st.load)];
  }],

  ["L2 it renders EMPTY and STAYS visibly empty", () => {
    const st = stone();
    if (!slot()) return [false, "nothing is drawn for the unanswered state"];
    const hollow = !slot().classList.contains("ans");
    /* a hand over it is not an answer: the slot previews and the record is untouched */
    overs("yes");
    const previewed = !!up.querySelector(".load .slot.pre");
    for (let i = 0; i < 20; i++) { paintUp(); save(); }
    return [hollow && previewed && st.load === undefined && !!slot() &&
            !slot().classList.contains("ans"),
            "hollow=" + hollow + " previews-under-a-hand=" + previewed +
            " after 20 repaints and 20 saves load=" + JSON.stringify(st.load)];
  }],

  ["L3 the alphabet is FOUR, present and distinct", () => {
    stone();
    const w = words().map(x => x.textContent);
    const distinct = new Set(w).size;
    return [w.length === 4 && distinct === 4 &&
            w.indexOf("yes") >= 0 && w.indexOf("no") >= 0 &&
            w.indexOf("i don't know") >= 0 && w.indexOf("i don't want to") >= 0,
            w.length ? w.join(" · ") : "none on the glass"];
  }],

  ["L4 \"no\" and \"i don't want to\" READ DIFFERENTLY in the record", () => {
    clear(); type("Alpha one. Beta two.");
    const a = held()[0], b = held()[1];
    openStone = S.stones.indexOf(a); paintUp(); const sa = say("no");
    openStone = S.stones.indexOf(b); paintUp(); const sb = say("i don't want to");
    if (!sa || !sb) return [false, "the two refusals could not be answered"];
    const rec = carriedText();
    const ra = rec.split("\n").filter(l => l.indexOf("answered: no") >= 0);
    const rb = rec.split("\n").filter(l => l.indexOf("answered: i don't want to") >= 0);
    return [ra.length === 1 && rb.length === 1 && ra[0] !== rb[0],
            ra.length && rb.length ? "two lines, and they differ" : "the record does not tell them apart"];
  }],

  ["L5 a don't-want-to ENDS it — nothing is rendered after", () => {
    const st = stone();
    if (!say("i don't want to")) return [false, "there is no don't-want-to to answer"];
    const shut = up.style.display === "none";
    /* and nothing was smuggled in behind it: no follow-up, no why, no offer */
    const after = up.textContent.trim();
    return [st.load === "dont_want_to" && shut && after === "",
            "recorded=" + JSON.stringify(st.load) + " panel-closed=" + shut +
            " rendered-after=" + JSON.stringify(after)];
  }],

  ["L6 HELD SHOWS — a visible third thing, not a blank", () => {
    const st = stone();
    const heldMark = slot() && !slot().classList.contains("ans") && words().length === 4;
    if (!say("no")) return [false, "nothing could be answered, so there is no third state to be third to"];
    paintUp();
    const answered = !!up.querySelector(".load .slot.ans") && words().length === 0;
    /* three states, and all three look different: absent · held · answered */
    return [heldMark && answered,
            "held=slot hollow + four words · answered=slot filled + one answer standing"];
  }],

  ["L7 ALL FOUR settle the drop, both refusals included", () => {
    localStorage.removeItem(ASC);
    const seen = {};
    for (const w of ["no", "i don't know", "i don't want to", "yes"]) {
      const st = stone();
      if (!say(w)) return [false, "\"" + w + "\" is not on the glass"];
      seen[w] = st.load;
    }
    /* and the yes is the one that moved water: it left here and arrived there */
    const gone = S.stones.filter(s => s.load === "yes").every(s => s.stage === "lake");
    let arrived = false;
    try { arrived = ((JSON.parse(localStorage.getItem(ASC) || "{}").arrived) || []).length > 0; } catch (e) {}
    return [seen["no"] === "no" && seen["i don't know"] === "dont_know" &&
            seen["i don't want to"] === "dont_want_to" && seen["yes"] === "yes" &&
            gone && arrived,
            "four settled · the yes left this store and arrived in the ascent's"];
  }]];

  /* ── run ────────────────────────────────────────────────────────────────── */
  const run = () => CLAUSES.map(([n, f]) => {
    let r; try { r = f(); } catch (e) { r = [false, "threw: " + (e && e.message)]; }
    return { n, pass: !!r[0], note: r[1] == null ? "" : String(r[1]) };
  });

  let live = [], blank = [], threw = null;
  try {
    live = run();
    /* THE CONTROL. Take the member away and run exactly the same seven. */
    loadMember = () => document.createElement("div");
    blank = run();
  } catch (e) {
    threw = e && e.message;
  } finally {
    loadMember = realMember;
    if (hisWater === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, hisWater);
    if (hisAscent === null) localStorage.removeItem(ASC); else localStorage.setItem(ASC, hisAscent);
    localStorage.removeItem(KEY + ".pad"); localStorage.removeItem(ASC + ".pad");
    try {
      S.stones = []; S.past = []; S.text = ""; S.mark = 0; S.n = 1;
      S.lastSeen = ""; S.returns = 0; openStone = -1;
      if (typeof load === "function") load();
      page.value = S.text || ""; S.lastSeen = S.text || "";
      dirty = false; paint(); paintUp();
    } catch (e) {}
  }

  const nL = live.filter(r => r.pass).length, nB = blank.filter(r => r.pass).length;
  const out = [];
  out.push("THE SURFACE AS IT STANDS");
  live.forEach(r => out.push((r.pass ? "  ok   " : "  FAIL ") + r.n + (r.note ? "   [" + r.note + "]" : "")));
  out.push("");
  out.push("THE CONTROL — the same seven, with the member taken away");
  blank.forEach(r => out.push((r.pass ? "  PASSED(!) " : "  fails      ") + r.n));
  out.push("");
  out.push("load: " + nL + "/7 on the live surface · " + nB + "/7 on a surface with no member");
  out.push(nB === 0
    ? "        a page that does not ask now passes NONE of the seven."
    : "        " + nB + " clause(s) are still absence-passing — a page that never asks satisfies them.");
  if (threw) out.push("        the check threw: " + threw);
  out.push("his store was held aside and put back, and the page with it.");
  return out.join("\n");
})()
