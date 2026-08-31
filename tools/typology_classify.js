// THE TYPOLOGY — Kevin's six categories (mark 2026-07-24): ORGAN · NUTRIENT ·
// LENS · SEED · POLLEN · TENSION-ONLY. Ported 2026-08-31 from the real,
// working classifier in `nesi/conductor/tension_table.py` (`classify()` /
// `CATEGORY_MARKERS`, lines 68-106) — part of the NESI v2 conductor body
// ruled SOIL that same day (Kevin's mark: "consider it soil to extract and
// mine for the nesi repo"). Ported, not reinvented: same marker table, same
// first-match-wins order, same "organ" default, same proposal-only stance.
//
// TENSION-ONLY is not in this classifier — in the source, it is a
// MEMBRANE-level null (a set that holds nothing), a property of the tension
// table's own thread-pull mechanic, never a single item's category. It has
// no analogue for classifying a single deposit item and is not ported.
//
// A PROPOSAL, not a verdict. Same discipline as the source: the machine
// proposes a category; Kevin's felt read is the authority, always.
"use strict";

const CATEGORY_MARKERS = [
  ["pollen", ["pollen", "propagat", "spore", "contagio", "ripple",
    "spread outward", "seeds others", "pollinat", "diffus"]],
  ["nutrient", ["nutrient", "reserve", "compost", "soil", "humus",
    "feedstock", "substrate", "fuel", "backing", "latent value",
    "metaboli", "fund"]],
  ["seed", ["seed", "fruit", "gift", "giving", "give", "given", "offer",
    "offering", "cross", "crossing", "transmit", "transmission",
    "publish", "release", "deposit", "donat", "bestow", "root",
    "hand off", "handoff", "propagation"]],
  ["lens", ["lens", "mirror", "witness", "reading", "read-back", "reveal",
    "naming", "map", "signature", "diagnostic", "distinction",
    "frame", "view", "screen", "audit", "detect", "seeing",
    "notice", "anatomy", "instrument", "surface", "recognize",
    "recognition instrument", "see "]],
  // organ — the default: stays · whole · does work / takes load
];

function classify(blob) {
  const low = (blob || "").toLowerCase();
  for (const [cat, markers] of CATEGORY_MARKERS) {
    if (markers.some((m) => low.includes(m))) return cat;
  }
  return "organ";
}

module.exports = { classify, CATEGORY_MARKERS };
