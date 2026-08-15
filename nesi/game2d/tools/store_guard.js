/* THE STORE GUARD — his writing, fingerprinted, so damage cannot be silent.
 *
 * WHY THIS EXISTS, stated plainly because it is about me and not about the game.
 * Three times in one session an instrument of mine cleared or overwrote his
 * store and reported that it had put everything back:
 *
 *   · probes that cleared localStorage while the page held the old state in
 *     memory, so the page's own next save undid the clear — and I then compared
 *     against the stale store and reported faults that were not there
 *   · the same shape again, in another surface
 *   · daily_walk.js, whose first run restored the key and was then overwritten
 *     by the page's next save, leaving its invented sentences in his store while
 *     the walk's last line said his store had been put back
 *
 * THE PATTERN IS THE FINDING: a wipe undone by the thing that owns the state,
 * and an instrument that cannot tell. A check that can damage what it checks and
 * then say it didn't is worse than no check.
 *
 * So this does not ask any instrument to be careful. It takes a FINGERPRINT of
 * both stores before, and compares after, and names exactly what moved. It is
 * the same shape as `audit_snapshot.py mark / diff` in the older tree: without
 * the mark there is no change set, and a session that skipped the mark is told
 * so rather than reassured.
 *
 *   mark  — before any work:  __guard("mark")
 *   check — after it:         __guard("check")
 *
 * IT NEVER WRITES EITHER STORE. Its own fingerprint lives under a key of its
 * own, so the guard cannot be the thing that damages what it guards.
 */
window.__guard = function (mode) {
  const KEYS = ["nesi.water", "nesi.ascent", "nesi.marks", "nesi.level_one"];
  const MARK = "nesi.__guard";           /* its own key, never one of his */

  const read = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const sum = s => {                      /* a fingerprint, not a copy */
    if (s === null) return null;
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return h.toString(16) + ":" + s.length;
  };
  /* what a person would want named, rather than a hash difference */
  const shape = s => {
    if (s === null) return null;
    let d; try { d = JSON.parse(s); } catch (e) { return { unreadable: true }; }
    return {
      stones:   (d.stones || []).length,
      text:     (d.text || "").length,
      past:     (d.past || []).length,
      kept:     (d.kept || []).length,
      arrived:  (d.arrived || []).length,
      shop:     (d.shop || []).length,
      done:     Object.keys(d.done || {}).length,
      faces:    Object.keys(d.faces || {}).length
    };
  };

  if (mode === "mark") {
    const m = {};
    KEYS.forEach(k => { const v = read(k); m[k] = { sum: sum(v), shape: shape(v) }; });
    localStorage.setItem(MARK, JSON.stringify({ at: Date.now(), m }));
    const held = KEYS.filter(k => m[k].sum !== null);
    return "marked · " + (held.length ? held.join(", ") + " fingerprinted" : "both stores empty — nothing to lose")
      + "\nrun __guard(\"check\") when the work is done.";
  }

  if (mode !== "check") return 'use __guard("mark") or __guard("check")';

  const raw = read(MARK);
  if (!raw) return "NO MARK. Nothing was fingerprinted before this work, so there is no\n"
    + "change set and this cannot tell you whether his store is intact.\n"
    + "That is the honest answer, not a clean bill.";

  const before = JSON.parse(raw).m, lines = [];
  let moved = 0;
  KEYS.forEach(k => {
    const now = read(k), s = sum(now);
    const was = before[k];
    if (was.sum === s) { if (s !== null) lines.push("  ok    " + k + " · untouched"); return; }
    moved++;
    if (was.sum !== null && s === null) { lines.push("  GONE  " + k + " · it was here and is not"); return; }
    if (was.sum === null && s !== null) { lines.push("  NEW   " + k + " · it was absent and now exists"); return; }
    const a = was.shape || {}, b = shape(now) || {};
    const diffs = Object.keys(b).filter(f => a[f] !== b[f])
      .map(f => f + " " + a[f] + "→" + b[f]);
    lines.push("  MOVED " + k + " · " + (diffs.join(" · ") || "same shape, different bytes"));
  });

  return lines.join("\n") + "\n\n"
    + (moved ? "THE STORE MOVED under " + moved + " key(s). If the work was not meant to\n"
             + "change his writing, it did, and this is where."
             : "nothing of his moved.");
};
"store guard loaded — __guard(\"mark\") before, __guard(\"check\") after"
