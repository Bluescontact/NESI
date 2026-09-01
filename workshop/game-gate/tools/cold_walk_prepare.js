#!/usr/bin/env node
/* THE COLD WALK — step 1 of 2: prepare a wiped profile that CANNOT touch the keeper's store.
 *
 * the keeper's ruling, 2026-08-12 (process jurisdiction): "THE COLD WALK becomes a standing
 * instrument and a GATE. Every pass that touches any surface ends with it: wiped profile,
 * real pointer events, screenshots read as a person, and the walker must be able to say
 * aloud what they saw happen. It sits beside the falsifiers as the instrument that catches
 * what they cannot — a blank screen passes all six falsifiers. Build it once, run it always."
 *
 * WHY A COPY AND NOT A FLAG. The documented ?scratch=1 door is silently stripped from
 * file: URLs by the browser pane — that failure already wrote the live store once
 * (BUILD_RECORD.md.backup_pre-compaction_2026-08-24.md, "A BREACH, NAMED"). A flag that fails toward live is not a door. This
 * writes a byte-identical copy of nesi.html with exactly ONE substitution, the storage
 * key, so the walked page reads and writes a key that has never held anything. The live
 * store is unreachable from the copy by construction, not by discipline.
 *
 * THE ONE DIFFERENCE, named so no claim overstates: the walked file differs from the
 * shipped file in the storage key string and nothing else. The substitution is asserted
 * to match exactly once, and the script fails loudly rather than writing a copy it cannot
 * account for.
 *
 *   node tools/cold_walk_prepare.js       ->  .coldwalk/nesi_coldwalk.html
 */
const fs = require("fs");
const path = require("path");

const here = __dirname;
const src = path.join(here, "..", "nesi.html");
const outDir = path.join(here, "..", "coldwalk");
const out = path.join(outDir, "nesi_coldwalk.html");

const html = fs.readFileSync(src, "utf8");

/* the exact live-key expression, as it stands in the source */
const NEEDLE = '?"nesi2d_scratch":"nesi2d";';
const hits = html.split(NEEDLE).length - 1;
if (hits !== 1) {
  console.error(
    "[cold-walk] FAIL — the storage-key line did not match exactly once (" +
      hits +
      " hits).\n" +
      "            nesi.html changed shape; this instrument will not write a copy it\n" +
      "            cannot account for. Fix the needle, do not loosen it."
  );
  process.exit(2);
}

/* A NEW KEY EVERY RUN. Wiping a key is not the same as never having written one: a still
   -open tab of a previous run re-saves through listener references captured at bind time,
   and the "wiped" profile silently comes back with a stone in it. Measured, 2026-08-12 —
   four attempts at wiping, four warm boots. A key that has never existed cannot be warm. */
const RUN = "c" + Date.now().toString(36);
const NEWKEY = "nesi2d_coldwalk_" + RUN;
const walked = html.replace(NEEDLE, '?"nesi2d_scratch":"' + NEWKEY + '";');

/* prove the ONLY difference is the key, character for character */
const diffLen = walked.length - html.length;
if (diffLen !== ("_coldwalk_" + RUN).length) {
  console.error("[cold-walk] FAIL — copy differs by " + diffLen + " chars, expected 9.");
  process.exit(2);
}
if (walked.indexOf('"nesi2d"') !== -1) {
  console.error("[cold-walk] FAIL — the live key still appears in the copy.");
  process.exit(2);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, walked, "utf8");

console.log("[cold-walk] prepared " + path.relative(path.join(here, "..", "..", ".."), out));
console.log("[cold-walk] store key in the copy: " + NEWKEY + " — never written before; live nesi2d unreachable");
console.log("[cold-walk] open it, then evaluate tools/cold_walk.js in the page.");
