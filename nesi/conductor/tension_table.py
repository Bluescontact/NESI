"""THE TENSION TABLE — the workbench's missing keystone, deterministic core.

Kevin's mark (2026-07-24): "build the tension-table keystone next — the playable
surface where I pull 3-6 nodes into tension and feel a membrane-seed light.
Engine-dark, deterministic first. Build the graft before any self-organizing
forest."

WHAT THIS IS. The workbench had work-objects (patterns, the grafting bench, the
EXTENDS walk) but no surface Kevin's hand touches to PULL 3-6 patterns into one
tensioned membrane and feel the seed that lives in the tension no single pattern
shows. Membrane-seeds are un-searchable by combinatorics; found only by play.
This module is the deterministic floor under that play surface.

THE GRAFT, NOT THE FOREST. Per Kevin's mark: this builds the core mechanic
(pull a set, read the tension) deterministically. It does NOT auto-arrange a
self-organizing forest, and it does NOT judge whether a membrane holds a LIVE
seed vs. superficial word overlap — that judgment is the one engine-gated seam,
carried as a LOUD stub, never faked (same discipline as bench._stub_op and the
SOIL semantic judge).

REUSE. The pull-keys grammar is the SAME deterministic floor bench.pull_keys
uses (slug + H1 title + bold thesis, minus stopwords) so the tension table and
the grafting bench read the library identically. EXTENDS lineage is the same
`EXTENDS \`slug\`` edge deepdive.py already parses.

STANDALONE-FIRST. Like heartwood.py, this ships standalone before it wires into
NESI.exe. export_index() dumps a JSON the playable HTML embeds, so Kevin can
touch the surface today without the app running and without an exe rebuild
(which is gated on his pending margin felt-read). The tension() math here is the
canonical source; the HTML mirrors it in JS for live play. If they ever drift,
this file wins.

HARD BOUNDARIES. Read-only. No engine call. No canon write. No mark, no cross,
no compost. It reads patterns/ and offers a reading; the mark stays Kevin's.
"""

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

try:
    import core
    PATTERNS = core.CANON
except Exception:
    # disk fallback when unfrozen / core unavailable — resolve the canon dir
    PATTERNS = Path(__file__).resolve().parents[2] / "patterns"

_STOP = set("the a an of to in and or for is are was be as at by on with from "
            "it its this that not no what how when into your you i we he she "
            "they them his her their our this these those than then so but if "
            "one two out off up down over under only just also more most can "
            "will would could should may might must does do did done being been "
            "have has had here there where which who whom whose why all any each "
            "every some such own same other another about above after again "
            "against because before below between both during few further once "
            "onto through until while within without".split())


def _words(text: str) -> set:
    return {w for w in re.findall(r"[a-z]{3,}", (text or "").lower())
            if w not in _STOP}


# ------------------------------------------------ provisional category floor
# Kevin's six categories (mark 2026-07-24): ORGAN · NUTRIENT · LENS · SEED ·
# POLLEN · TENSION-ONLY. TENSION-ONLY is a MEMBRANE-level null (a set that holds
# nothing), never a single pattern's category — so a pattern routes to one of
# the FIVE yields. This is a DETERMINISTIC PROPOSAL FLOOR, same discipline as
# bench.classify_type's TYPE_MARKERS: ordered table, first match wins, no engine.
# It is a rough first-pass Kevin's FELT READ corrects — the machine proposes a
# category, it never decides one (the stay/travel, whole/partial, reveal reads
# are his). Loudly provisional by design.
CATEGORY_MARKERS = [
    # pollen — travels · partial: reserve that leaves to fertilize another
    ("pollen",   ["pollen", "propagat", "spore", "contagio", "ripple",
                  "spread outward", "seeds others", "pollinat", "diffus"]),
    # nutrient — stays · partial: reserve drawn into a graft here
    ("nutrient", ["nutrient", "reserve", "compost", "soil", "humus",
                  "feedstock", "substrate", "fuel", "backing", "latent value",
                  "metaboli", "fund"]),
    # seed — travels · whole: a compressed whole made to be given
    ("seed",     ["seed", "fruit", "gift", "giving", "give", "given", "offer",
                  "offering", "cross", "crossing", "transmit", "transmission",
                  "publish", "release", "deposit", "donat", "bestow", "root",
                  "hand off", "handoff", "propagation"]),
    # lens — reveals: changes seeing, produces nothing
    ("lens",     ["lens", "mirror", "witness", "reading", "read-back", "reveal",
                  "naming", "map", "signature", "diagnostic", "distinction",
                  "frame", "view", "screen", "audit", "detect", "seeing",
                  "notice", "anatomy", "instrument", "surface", "recognize",
                  "recognition instrument", "see "]),
    # organ — the default: stays · whole · does work / takes load
]


def classify(blob: str) -> str:
    """First matching category wins; no match = 'organ', the working default.
    A PROPOSAL, not a verdict — Kevin's felt read is the authority."""
    low = (blob or "").lower()
    for cat, markers in CATEGORY_MARKERS:
        if any(m in low for m in markers):
            return cat
    return "organ"


# ---------------------------------------------------------------- the index

def build_index() -> list:
    """One record per canon pattern, on the SAME floor bench.pull_keys uses.
    Each record: slug · title · thesis · words (all pull-key words) ·
    titlewords (title-only words, the pattern's OWN name for itself) · extends.
    Misses quietly on unreadable files, never fabricates."""
    recs = []
    for p in sorted(PATTERNS.glob("*.md")):
        title = thesis = ""
        try:
            text = p.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        for line in text.splitlines()[:12]:
            s = line.strip()
            if s.startswith("# ") and not title:
                title = s[2:]
            elif s.startswith("**") and not thesis:
                thesis = s.strip("*")
            if title and thesis:
                break
        slug = p.stem
        # titlewords: the pattern's OWN name for itself — slug + H1 only. Narrow
        # on purpose; a shared thread that lands here is "already named".
        titlewords = _words(slug.replace("_", " ").replace("-", " ") + " " + title)
        # bodywords: where a pattern names its CONCEPTS without repeating its
        # title — every heading (##/###) and every **bold** span, plus the
        # thesis. Richer than the title alone (so real kinship in the body
        # becomes visible) and far less noisy than full text (headings + bold
        # are the deliberate concept-vocabulary, not prose filler). Still
        # deterministic, still engine-dark.
        headings = " ".join(re.findall(r"^#{2,4}\s+(.+)$", text, re.MULTILINE))
        bolds = " ".join(re.findall(r"\*\*([^*]+)\*\*", text))
        bodywords = _words(thesis + " " + headings + " " + bolds)
        allwords = titlewords | bodywords
        extends = sorted(set(re.findall(r"EXTENDS\s+`([a-zA-Z0-9_\-]+)`", text)))
        # provisional category — deterministic proposal on the concept blob
        blob = slug.replace("_", " ").replace("-", " ") + " " + title + " " \
            + thesis + " " + headings + " " + bolds
        recs.append({
            "slug": slug,
            "title": title or slug,
            "thesis": thesis,
            "words": sorted(allwords),
            "titlewords": sorted(titlewords),
            "extends": extends,
            "category": classify(blob),
            "category_proposal": True,   # the machine proposes; Kevin's read decides
        })
    return recs


def canon_index() -> dict:
    """Sort the whole canon into the five yield-categories — a PROPOSAL for
    Kevin's felt read to correct. Returns counts + slugs per category."""
    idx = build_index()
    order = ["organ", "nutrient", "lens", "seed", "pollen"]
    groups = {c: [] for c in order}
    for r in idx:
        groups.setdefault(r["category"], []).append(r["slug"])
    return {
        "total": len(idx),
        "order": order,
        "counts": {c: len(groups.get(c, [])) for c in order},
        "groups": {c: sorted(groups.get(c, [])) for c in order},
        "note": "PROPOSAL — deterministic keyword floor, first-match-wins. "
                "Kevin's felt read is the authority; expect to re-place many.",
    }


# ------------------------------------------------------------- the tension

def tension(selected_slugs, index=None) -> dict:
    """Read the membrane over a selected set of 3-6 pattern slugs.

    Deterministic, engine-dark. The reading:

    · THREADS  — words carried by >=2 of the selected nodes. The connective
      tissue of the membrane. Ranked by spread (how many nodes carry it).

    · SEED CANDIDATES — the sharpest deterministic proxy for "the gift in the
      tension no single pattern shows": threads carried by >=2 nodes whose word
      is in NO selected node's OWN TITLE. A shared thread that is some node's
      title is already named BY that node; a shared thread that is nobody's
      title but lives across several is the un-named thing the membrane holds.
      This is a proxy, not a judgment — see the loud stub below.

    · SCARS — EXTENDS lineage edges INSIDE the set (graft-scars already present
      between the chosen patterns).

    · TIGHTNESS — a 0..1 felt-proxy: how much of the membrane is shared. NOT a
      score of worth; a geometry of overlap, so the surface can render tension
      visually. Kevin feels the seed; this only draws the pull.

    · seed_judge — THE ONE ENGINE-GATED SEAM, carried as a loud stub. Whether a
      seed candidate is a LIVE seed or superficial word-coincidence is a
      semantic read no keyword floor can make. Never faked.
    """
    if index is None:
        index = build_index()
    by_slug = {r["slug"]: r for r in index}
    nodes = [by_slug[s] for s in selected_slugs if s in by_slug]
    n = len(nodes)
    if n < 2:
        return {"ok": False, "note": "a membrane needs at least 2 nodes in tension"}

    # library document-frequency: how many patterns carry each word overall.
    # A word in most patterns (falsifier, mechanism, pattern) is STRUCTURAL
    # boilerplate, not connective tissue — it can't be the hidden seed. This is
    # the deterministic TF-IDF intuition: a seed is shared INSIDE the membrane
    # yet RARE across the library.
    N = len(index)
    df = {}
    for r in index:
        for w in set(r["words"]):
            df[w] = df.get(w, 0) + 1
    common_cut = max(3, int(0.33 * N))   # in >1/3 of the library = boilerplate

    # word -> count of nodes carrying it
    counts = {}
    for r in nodes:
        for w in set(r["words"]):
            counts[w] = counts.get(w, 0) + 1
    all_titlewords = set()
    for r in nodes:
        all_titlewords |= set(r["titlewords"])

    threads = sorted(
        ({"word": w, "spread": c, "df": df.get(w, 1)}
         for w, c in counts.items() if c >= 2),
        key=lambda t: (-t["spread"], t["df"], t["word"]),
    )
    # seeds: shared, named by no node's title, AND distinctive in the library.
    # Ranked rarest-first — the rarer the shared thread, the more it is the gift
    # the membrane holds that no single pattern shows.
    seeds = sorted(
        (t for t in threads
         if t["word"] not in all_titlewords and t["df"] <= common_cut),
        key=lambda t: (t["df"], -t["spread"], t["word"]),
    )

    # lineage scars inside the set
    sel = set(selected_slugs)
    scars = []
    for r in nodes:
        for tgt in r["extends"]:
            if tgt in sel:
                scars.append({"from": r["slug"], "to": tgt})

    # tightness: shared word-mass / total distinct word-mass, a pure geometry
    distinct = len(counts)
    shared = sum(1 for c in counts.values() if c >= 2)
    tightness = round(shared / distinct, 3) if distinct else 0.0

    return {
        "ok": True,
        "n": n,
        "nodes": [r["slug"] for r in nodes],
        "threads": threads,
        "seeds": seeds,
        "scars": scars,
        "tightness": tightness,
        "seed_judge": {
            "verdict": None,
            "note": "[STUB SEED JUDGE - engine not wired] whether this membrane "
                    "holds a LIVE seed or superficial word-overlap is a semantic "
                    "read the keyword floor cannot make. The threads and seed "
                    "candidates above are deterministic geometry only; the felt "
                    "read is Kevin's, the semantic judge waits on the engine.",
        },
    }


# ------------------------------------------------------------------ export

def export_index(out_path=None) -> Path:
    """Dump the index as JSON for the standalone playable HTML to embed."""
    idx = build_index()
    if out_path is None:
        out_path = Path(__file__).resolve().parents[1] / "workbench" / "tension_index.json"
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(idx, ensure_ascii=False, indent=0),
                        encoding="utf-8")
    return out_path


if __name__ == "__main__":
    idx = build_index()
    p = export_index()
    print(f"[tension_table] indexed {len(idx)} patterns -> {p}")
    # smoke test: a small membrane
    demo = [r["slug"] for r in idx[:4]]
    t = tension(demo, idx)
    print(f"[tension_table] demo membrane {demo}: "
          f"{len(t['threads'])} threads, {len(t['seeds'])} seed-candidates, "
          f"{len(t['scars'])} scars, tightness {t['tightness']}")
