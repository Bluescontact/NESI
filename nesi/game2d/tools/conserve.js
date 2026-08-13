/* THE CONSERVATION HARNESS — evaluated INSIDE the prepared cold copy.
 *
 * Kevin's drop, 2026-08-12, NODE 2 — WATER: "Conservation is your test harness.
 * Total volume must be constant unless a gate adds or a drain removes. Walking the
 * build, volume held exactly at 2754 through the whole flood — that single number
 * validates the sim better than any visual check."
 *
 * NESI had no such number. It has instruments for geometry (the cold walk) and for
 * prohibitions (refusal_check), and neither can see a stone being duplicated. This
 * one asks the only question a ledger can be wrong about:
 *
 *     ONE STONE GOES IN. DOES EXACTLY ONE STONE COME OUT, IN EXACTLY ONE PLACE?
 *
 * WHY IT MATTERS MORE THAN IT LOOKS. The stone is the player's own sentence. A
 * duplicated stone is his sentence appearing in the world more times than he wrote
 * it — which is the world editing his material by arithmetic rather than by words.
 * That is law 4's spirit failing through a side door no caption would ever show.
 *
 * IT NEEDS NO FRAMES. Every routing path is synchronous; only the drawing is not.
 * This is the one verification in the build that runs in a pane that has stopped
 * compositing, which is exactly when the other instruments go quiet.
 *
 * SAFETY: refuses unless the store key is a cold profile, same as the cold walk.
 *
 *   node tools/cold_walk_prepare.js  ->  open the copy  ->  evaluate this file's text
 */
(() => {
  const R = { key: (typeof KEY === "string" ? KEY : "?"), checks: [], fails: 0 };
  if (R.key.indexOf("coldwalk") < 0)
    return { REFUSED: "not a cold profile — store key is '" + R.key + "'. Run cold_walk_prepare.js." };

  const add = (id, ok, note) => { R.checks.push({ id, ok: !!ok, note: note || "" }); if (!ok) R.fails++; };
  const FRACS = ["bed", "sus", "dis"];
  const MARK = "CONSERVE-PROBE-SENTENCE";

  const fresh = () => { S.pools = [[], [], []]; S.compost = []; S.lake = 0; S.forest = []; };
  const stone = () => ({ n: 777, text: MARK, kind: "self", worked: true, stage: "descended", seams: [] });

  /* every place a routed stone can come to rest, counted by its own text */
  const landings = st => {
    let n = 0, where = [];
    S.pools.forEach((p, i) => p.forEach(e => (e.stones || []).forEach(s => {
      if (s.text === MARK) { n++; where.push("pool" + i); }
    })));
    S.compost.forEach(c => { if (c.text === MARK) { n++; where.push("compost"); } });
    if (st.stage === "down") { n++; where.push("set-down"); }
    if (st.stage === "deep") { n++; where.push("deep"); }
    return { n, where };
  };

  /* ---- K1 · ONE CHARGE, ALL THREE FRACTIONS TO ONE SPIRE ---- */
  fresh();
  let st = stone();
  FRACS.forEach(f => route(f, 1, [st]));
  let L = landings(st);
  add("K1 one-stone-one-landing (all to one spire)", L.n === 1,
    "the sentence came to rest " + L.n + " time(s): " + L.where.join(" · ") + " — expected exactly 1");

  /* ---- K2 · ONE CHARGE, ALL THREE TO THE LAKE ---- */
  fresh();
  st = stone();
  FRACS.forEach(f => route(f, "lake", [st]));
  L = landings(st);
  add("K2 one-stone-one-landing (all to the lake)", L.n === 1,
    "composted " + S.compost.filter(c => c.text === MARK).length + " time(s) — expected exactly 1");

  /* ---- K3 · THE HAND SPLITS THE CHARGE THREE WAYS ---- */
  fresh();
  st = stone();
  route("bed", 0, [st]); route("sus", "lake", [st]); route("dis", "set", [st]);
  L = landings(st);
  add("K3 one-stone-one-landing (split three ways)", L.n === 1,
    "came to rest " + L.n + " time(s): " + L.where.join(" · ") + " · final stage \"" + st.stage + "\"");

  /* ---- K4 · THE STAGE IS A RECORD, NOT THE LAST WRITE ----
     stage is the stone's own account of where it went. Routed three ways it can only
     be true if the build has decided WHICH landing is the stone's landing. */
  fresh();
  st = stone();
  route("bed", 0, [st]); route("sus", "lake", [st]); route("dis", "set", [st]);
  add("K4 stage-agrees-with-where-it-actually-is", landings(st).where.indexOf(
    st.stage === "down" ? "set-down" : (st.stage === "dropped" ? "compost" : "pool0")) >= 0
    && landings(st).n === 1,
    "stage says \"" + st.stage + "\" while the store holds it at: " + landings(st).where.join(" · "));

  /* ---- K5 · SET-IT-DOWN TAKES NOTHING AND LEAVES NOTHING ----
     law 6 as a ledger fact: the bare plate must add to no store at all. */
  fresh();
  st = stone();
  const before = JSON.stringify([S.pools, S.compost, S.lake, S.forest]);
  FRACS.forEach(f => route(f, "set", [st]));
  add("K5 set-it-down adds to no store", JSON.stringify([S.pools, S.compost, S.lake, S.forest]) === before,
    "the absence is the feedback — nothing may accumulate anywhere");

  /* ---- K6 · THE DEEP NEVER RENDERS AND NEVER ACCUMULATES (law 9) ---- */
  fresh();
  st = stone();
  const b2 = JSON.stringify([S.pools, S.compost, S.lake, S.forest]);
  FRACS.forEach(f => route(f, "deep", [st]));
  add("K6 the deep holds nothing renderable", JSON.stringify([S.pools, S.compost, S.lake, S.forest]) === b2,
    "law 9 — the deep never renders, so it may never fill a store that does");

  fresh();
  R.verdict = R.fails === 0 ? "CONSERVED" : "NOT CONSERVED — " + R.fails + " check(s)";
  R.reading = [
    "One stone is one sentence the player wrote once.",
    "If it lands more than once, the world has multiplied his material by arithmetic.",
    "No caption, screenshot, or geometry check can see this. Only the count can."
  ];
  return R;
})()
