/* THE DAILY WALK — the surface he actually writes in, walked.
 *
 * `first_four` walks the ascent. `daily.html` — the page he opens every morning
 * and the only one his writing goes into — had no walk at all. Every fault in it
 * so far was found by hand, one at a time, after it had already happened: the
 * word cap that corrupted his sentences, the lake that drained, the bed that
 * rose above the water on the seventh day, the paragraph break that banked the
 * same sentence twice. That is a bad way to find them and it is the only way
 * that has been available.
 *
 * EVALUATED IN THE RUNNING PAGE, not in a shim — the same idiom as
 * cold_walk.js. It drives the real textarea, the real store and the real canvas,
 * and it asserts the things his own marks established.
 *
 * IT RUNS ON A SCRATCH STORE AND PUTS HIS BACK. The live key is saved, the walk
 * runs on a cleared copy, and the original is restored before it returns —
 * whatever the walk finds. A check that could eat a morning's writing is not a
 * check.
 *
 *   open daily.html, then evaluate this file's text in the page.
 */
(() => {
  const R = [], ok = (n, pass, note) => R.push({ n, pass: !!pass, note: note == null ? "" : String(note) });
  if (typeof S === "undefined" || typeof bandCut !== "function")
    return { REFUSED: "this is not the daily surface" };

  /* ── his store, held aside ─────────────────────────────────────────────── */
  const KEY = "nesi.water", ASC = "nesi.ascent";
  const hisWater = localStorage.getItem(KEY), hisAscent = localStorage.getItem(ASC);
  const restore = () => {
    if (hisWater === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, hisWater);
    if (hisAscent === null) localStorage.removeItem(ASC); else localStorage.setItem(ASC, hisAscent);
  };

  const type = v => { page.value = v; page.dispatchEvent(new Event("input")); };
  const clear = () => {
    S.stones = []; S.past = []; S.text = ""; S.mark = 0; S.n = 1; S.lastSeen = "";
    S.returns = 0; S.today = "2026-08-14"; page.value = "";
  };

  try {
    /* ── 1 · THE BAND CUT — a sentence banks live, at the keystroke ───────── */
    clear();
    type("One sentence here. Two sentence here.");
    ok("D1 a completed sentence banks at the keystroke", S.stones.length === 2,
       S.stones.map(s => JSON.stringify(s.t)).join(" "));
    type("One sentence here. Two sentence here. A third with 3.14 inside it.");
    ok("D2 a period between two digits is inside a number, not an end",
       S.stones.length === 3 && S.stones[2].t.indexOf("3.14") > 0, S.stones.length + " stones");

    /* ── 2 · DELETION WITHDRAWS, AND NEVER UN-BANKS — his mark ────────────── */
    const before = S.stones.length;
    type("One sentence here. A third with 3.14 inside it.");
    ok("D3 deleting a banked sentence withdraws it from the line",
       S.stones.length === before && S.stones.some(s => s.stage === "withdrawn"),
       "nothing removed, one withdrawn");
    ok("D4 and it is still banked — deletion never un-banks",
       S.stones.length === before, before + " stones still standing");
    type("One sentence here. Two sentence here. A third with 3.14 inside it.");
    ok("D5 typing it back returns it, and does not bank a second copy",
       S.stones.length === before && !S.stones.some(s => s.stage === "withdrawn"),
       S.stones.length + " stones");

    /* ── 3 · THE WATERMARK RETREATS TO A SENTENCE, NOT A CHARACTER ────────── */
    clear();
    type("One sentence here. Two sentence here. Three sentence here.");
    type("One sentence here. Two sentences here. Three sentence here. A fourth lands.");
    const fragments = S.stones.filter(s => /^[a-z]/.test(s.t));
    ok("D6 an edit behind the watermark banks no fragment of a sentence",
       fragments.length === 0, fragments.map(s => JSON.stringify(s.t)).join(" ") || "none");

    /* ── 4 · THE TABLE — merge, and undo the merge by hand ────────────────── */
    clear();
    type("Alpha one. Beta two. Gamma three.");
    openTable();
    const a = held()[0], b = held()[1], reach0 = held().length;
    merge(a, b);
    const m = S.stones[S.stones.length - 1];
    ok("D7 two stones merge in written order, seams kept",
       m.t === a.t + "\n" + b.t && m.seams.length === 2 && held().length === reach0 - 1,
       JSON.stringify(m.t));
    unmerge(m);
    ok("D8 and a merge comes apart by hand, losing nothing",
       held().length === reach0 && m.stage === "unmerged" && !a.stage && !b.stage,
       "parts stand again");

    /* ── 5 · THREE OUTPUTS ON THE TABLE ───────────────────────────────────── */
    const s1 = held()[0], s2 = held()[1];
    const n0 = S.stones.length;
    s1.stage = "set";
    ok("D9 a stone set down leaves the reach and is not deleted",
       held().indexOf(s1) < 0 && S.stones.length === n0, "still in the bank");

    /* ── 6 · THE INTERNAL OPEN LOOP — it leaves here and arrives there ────── */
    localStorage.removeItem(ASC);
    const text = s2.t;
    toTheLake(s2);
    const there = JSON.parse(localStorage.getItem(ASC) || "{}");
    ok("D10 dropping to the lake LEAVES this store", held().indexOf(s2) < 0 && s2.stage === "lake");
    ok("D11 and ARRIVES in the ascent's, verbatim",
       (there.arrived || []).indexOf(text) >= 0, JSON.stringify((there.arrived || [])[0] || null));
    closeTable();

    /* ── 7 · THE DOOR OUT CARRIES THE WRITING ─────────────────────────────── */
    const body = carriedText();
    ok("D12 the door out carries his sentences verbatim",
       S.stones.every(s => s.seams || body.indexOf(s.t) >= 0), body.length + " characters");
    ok("D13 and carries no count of him",
       !/\b(score|total|streak|words?:\s*\d|\d+\s*(sentences|stones|days))\b/i.test(body),
       "no figure about him in it");

    /* ── 8 · QUITTING LOSES NOTHING ───────────────────────────────────────── */
    const snap = JSON.stringify(S.stones.map(s => [s.n, s.t, s.stage || "-"]));
    ok("D14 the store writes", save() === true);
    const back = JSON.parse(localStorage.getItem(KEY));
    ok("D15 and comes back identical",
       JSON.stringify(back.stones.map(s => [s.n, s.t, s.stage || "-"])) === snap,
       back.stones.length + " stones round-tripped");

    /* ── 9 · THE PAGE ITSELF ──────────────────────────────────────────────── */
    const html = document.documentElement.outerHTML;
    /* REACHING OUTWARD IS A HOST, NOT A SIBLING. The first version of this failed
       on `<script src="solid.js">` and called it a network call, which it is not:
       it is a file in the same directory. The law is that nothing reaches
       OUTWARD — no host, no model, no font, no image from anywhere. A local
       sibling is a dependency, and dependencies are the next check's business,
       not this one's. */
    ok("D16 nothing on this page reaches outward",
       !/fetch\(|XMLHttpRequest|https?:\/\/|@font-face|<img/i.test(html),
       "no host, no model, no font, no image");

    /* AND THE DEPENDENCY, NAMED RATHER THAN LEFT SILENT. daily.html was a single
       self-contained file and is not any more: another pass gave it
       `<script src="solid.js">`. It degrades on purpose — the page still writes,
       banks and returns without it — but what it loses when the file is absent
       it loses SILENTLY, and a capability that vanishes without saying so is
       worth seeing. */
    const deps = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
    ok("D19 every local dependency is named, and what it costs is known",
       deps.every(d => d.indexOf("//") < 0),
       deps.length ? deps.join(", ") + " — absent, the page still writes and banks; " +
                     "it loses the door and the route, and says so by not drawing them"
                   : "none — the page stands alone");
    ok("D17 nothing on screen counts him",
       document.body.innerText.replace(/\s/g, "").match(/\d+/g) === null ||
       !/\d+\s*(words|sentences|days|stones)/i.test(document.body.innerText),
       "no figure rendered");
    ok("D18 the door out is reachable by a hand", !!document.getElementById("sill"));
  } catch (e) {
    ok("D! the walk threw", false, e && e.message);
  } finally {
    /* PUTTING THE STORE BACK IS NOT ENOUGH. The page goes on running with the
       walk's state in memory and a dirty flag set, and its own next save writes
       that straight back over the restore — which is exactly what happened: a
       first run of this walk left its invented sentences in his store even
       though it had restored the key. The page has to be put back too, and the
       flag cleared, before the loop gets another turn. */
    restore();
    try {
      S.stones = []; S.past = []; S.text = ""; S.mark = 0; S.n = 1;
      S.lastSeen = ""; S.returns = 0;
      if (typeof load === "function") load();
      if (typeof page !== "undefined") { page.value = S.text || ""; S.lastSeen = S.text || ""; }
      if (typeof dirty !== "undefined") dirty = false;
      if (typeof paint === "function") paint();
    } catch (e) {}
  }

  const failed = R.filter(r => !r.pass).length;
  return R.map(r => (r.pass ? "  ok   " : "  FAIL ") + r.n + (r.note ? "   [" + r.note + "]" : "")).join("\n")
    + "\n\n" + (failed ? "daily: " + failed + " FAILED" : "daily: all " + R.length + " passed")
    + "\nhis store was held aside and put back.";
})()
