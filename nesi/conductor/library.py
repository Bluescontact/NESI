#!/usr/bin/env python3
"""
NESI PATTERN LIBRARY v0 — read-only browse organ. Standard library only.

Every on-disk pattern in DSS content\\patterns (core.CANON), plus the
folded ones (core.FOLDED — un-crossed, kept not deleted), as one flat
index: title, file, state, thesis line, and EXTENDS lineage parsed out of
the pattern's own prose (patterns carry no frontmatter — audited
2026-07-17, zero of 91 had it — so lineage rides in-text as the literal
string "EXTENDS `slug`" and this module regexes it out, same posture as
bench.py's pull_keys() reading H1/thesis instead of a field that doesn't
exist).

Pure read. No mark, no cross, no write of any kind — the membrane is a
separate, shut, downstream gate this module knows nothing about, same
law as bench.py.
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

EXTENDS_RE = re.compile(r"EXTENDS\s+`([a-zA-Z0-9_\-]+)`")
# Rebuild pass 3, Step 4: patterns carry two lineage signals, and only one was
# ever parsed. EXTENDS is the HARD line (audited nearly unused — 98/100 patterns
# have none). [[wikilinks]] are the SOFT references that actually carry the
# library's connective tissue. Both are surfaced now, kept distinct — whether
# a wikilink should count as lineage is Kevin's mark, not this module's to fold.
WIKILINK_RE = re.compile(r"\[\[([a-zA-Z0-9_\-]+)\]\]")
H1_RE = re.compile(r"^#\s+(.+)$", re.MULTILINE)
BOLD_RE = re.compile(r"\*\*(.+?)\*\*")


def _slug(filename: str) -> str:
    return filename[:-3] if filename.endswith(".md") else filename


def _read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""


def _entry(path: Path, state: str) -> dict:
    text = _read(path)
    h1 = H1_RE.search(text)
    bold = BOLD_RE.search(text)
    extends = sorted(set(EXTENDS_RE.findall(text)))
    slug = _slug(path.name)
    refs = sorted(set(WIKILINK_RE.findall(text)) - {slug})   # soft links, not self
    return {
        "slug": slug,
        "file": path.name,
        "state": state,               # 'canon' | 'folded'
        "title": h1.group(1).strip() if h1 else path.stem.replace("_", " "),
        "thesis": (bold.group(1).strip() if bold else "")[:220],
        "extends": extends,           # HARD lineage (EXTENDS `slug`)
        "refs": refs,                 # SOFT references ([[wikilinks]])
        "bytes": path.stat().st_size if path.exists() else 0,
    }


def build_index() -> list:
    """Every pattern, canon + folded, one flat list. Read-only, cheap
    enough to rebuild on every open — no caching needed at this size."""
    out = []
    if core.CANON.exists():
        for p in sorted(core.CANON.glob("*.md")):
            out.append(_entry(p, "canon"))
    if core.FOLDED.exists():
        for p in sorted(core.FOLDED.glob("*.md")):
            out.append(_entry(p, "folded"))
    return out


def count() -> dict:
    """The canonical live count — regenerated from disk on every call, so no
    reader carries a hardcoded literal that rots (RETURN R1; the docstring's own
    '91' and screen_intake's '35' were exactly that). {canon, folded, total}."""
    idx = build_index()
    canon = sum(1 for e in idx if e["state"] == "canon")
    folded = sum(1 for e in idx if e["state"] == "folded")
    return {"canon": canon, "folded": folded, "total": canon + folded}


# ------------------------------------------------------- self-legible shape
# Rebuild pass 3, Step 4 (2026-07-22): the library describing its own LOCAL
# shape — the neighborhood of the pattern in hand, not a global constellation.
# The monument guard (RETURN): every number here is meant to start an act
# (jump to the orphan, spawn from the canon pattern, rebuild the drifted cache),
# never to be admired whole.
FINGERPRINTS_DIR = core.DSS / "tools" / "codex_index" / "fingerprints"


def _fingerprinted_slugs() -> set:
    """Slugs carrying a structural fingerprint — LINT screens these by
    mechanism; the rest embed on raw first-600-chars. That asymmetry was
    invisible before (RETURN S3); this makes it legible."""
    if not FINGERPRINTS_DIR.exists():
        return set()
    return {p.stem for p in FINGERPRINTS_DIR.glob("*.json") if ".card" not in p.name}


def coverage(index: list = None) -> dict:
    idx = index if index is not None else build_index()
    fp = _fingerprinted_slugs()
    canon = [e for e in idx if e["state"] == "canon"]
    fps = sum(1 for e in canon if e["slug"] in fp)
    return {"fingerprinted": fps, "raw": len(canon) - fps, "total": len(canon)}


def children(index: list, slug: str) -> list:
    """Patterns that EXTENDS this one — the downward HARD lineage the flat list
    and the per-pattern jump never showed."""
    return [e for e in index if slug in e.get("extends", [])]


def referenced_by(index: list, slug: str) -> list:
    """Patterns that [[wikilink]] to this one — the downward SOFT references."""
    return [e for e in index if slug in e.get("refs", [])]


def _drift_sets():
    """(edited, missing) slug-sets from the codex drift manifest, or (None,
    None) if the detector isn't reachable. Lets a stale entry render inline."""
    try:
        codex = str(core.DSS / "tools" / "codex_index")
        if codex not in sys.path:
            sys.path.insert(0, codex)
        import check_drift
        r = check_drift.check()
        if r.get("reason"):
            return None, None
        return set(r.get("edited", [])), set(r.get("missing", []))
    except Exception:
        return None, None


def neighborhood(slug: str, index: list = None, drift_sets=None) -> dict:
    """The pattern in hand and its immediate lineage neighborhood: parents it
    EXTENDS, children that EXTENDS it, whether it's an orphan (no lineage either
    way), its LINT-coverage kind, and whether its cache entry has drifted."""
    idx = index if index is not None else build_index()
    e = find_by_slug(idx, slug)
    if not e:
        return {"error": f"no pattern {slug}"}
    parents = []
    for ps in e.get("extends", []):
        p = find_by_slug(idx, ps)
        parents.append({"slug": ps, "title": p["title"] if p else f"{ps} (missing)",
                        "state": p["state"] if p else None, "present": bool(p)})
    kids = [{"slug": c["slug"], "title": c["title"], "state": c["state"]}
            for c in children(idx, slug)]
    refs_out = []
    for rs in e.get("refs", []):
        r = find_by_slug(idx, rs)
        if r:
            refs_out.append({"slug": rs, "title": r["title"], "state": r["state"]})
    refs_in = [{"slug": r["slug"], "title": r["title"], "state": r["state"]}
               for r in referenced_by(idx, slug)]
    fp = _fingerprinted_slugs()
    edited, missing = drift_sets if drift_sets is not None else _drift_sets()
    drift = None
    if edited is not None:
        drift = "stale" if (slug in edited or slug in missing) else "clean"
    connected = bool(parents or kids or refs_out or refs_in)
    # Kevin's mark 2026-07-22: "wikilinks can be lineage." So the neighborhood
    # presents ONE lineage graph — a wikilink counts the same as an EXTENDS,
    # each tagged by relation so the hard/soft distinction stays legible but no
    # longer splits the view. up = what this descends from / links to;
    # down = what descends from / links to this.
    lineage_up = ([{**p, "rel": "extends"} for p in parents] +
                  [{**r, "rel": "wikilink"} for r in refs_out])
    lineage_down = ([{"slug": c["slug"], "title": c["title"], "state": c["state"],
                      "rel": "extends"} for c in kids] +
                    [{**r, "rel": "wikilink"} for r in refs_in])
    return {
        "slug": slug, "title": e["title"], "state": e["state"],
        "parents": parents, "children": kids,          # HARD lineage (EXTENDS)
        "references": refs_out, "referenced_by": refs_in,  # SOFT ([[wikilinks]])
        "lineage_up": lineage_up, "lineage_down": lineage_down,  # unified (Kevin's mark)
        "is_orphan": not connected,                    # truly alone either way
        "extends_orphan": not parents and not kids,    # no HARD lineage (most patterns)
        "fingerprinted": slug in fp,
        "coverage_label": "structural (fingerprinted)" if slug in fp
                          else "vocabulary (raw-embedded)",
        "drift": drift,
    }


def shape_summary(index: list = None) -> dict:
    """A small, local orientation, not a global map: maturity split, how many
    roots / orphans / patterns-with-children, and the coverage asymmetry."""
    idx = index if index is not None else build_index()
    canon = [e for e in idx if e["state"] == "canon"]
    ext_child_map, ref_map = {}, {}
    for e in idx:
        for ps in e.get("extends", []):
            ext_child_map.setdefault(ps, []).append(e["slug"])
        for rs in e.get("refs", []):
            ref_map.setdefault(rs, []).append(e["slug"])
    # HARD lineage (EXTENDS) — audited nearly unused, kept as its own count
    ext_roots = [e["slug"] for e in canon if not e.get("extends")]
    ext_with_children = [e["slug"] for e in canon if e["slug"] in ext_child_map]
    # true orphans: no HARD lineage AND no SOFT reference in either direction
    orphans = [e["slug"] for e in canon
               if not e.get("extends") and not e.get("refs")
               and e["slug"] not in ext_child_map and e["slug"] not in ref_map]
    return {
        "maturity": {"canon": len(canon),
                     "folded": sum(1 for e in idx if e["state"] == "folded")},
        "extends_roots": len(ext_roots),
        "extends_with_children": len(ext_with_children),
        "true_orphans": len(orphans),
        "coverage": coverage(idx),
    }


def sockets(slug: str, index: list = None, drift_sets=None) -> list:
    """Step 7 (Rebuild pass 3, 2026-07-22) — the unmet conditions on this entry,
    each a labeled awaiting-slot. DERIVED from real conditions only, never
    authored: a missing lineage parent, a drifted cache entry, a raw (un-
    fingerprinted) LINT coverage. A socket can't exist without a real gap."""
    idx = index if index is not None else build_index()
    e = find_by_slug(idx, slug)
    if not e:
        return []
    out = []
    for ps in e.get("extends", []):
        if not find_by_slug(idx, ps):
            out.append({"label": f"lineage parent `{ps}`",
                        "awaiting": "the pattern this EXTENDS — missing on disk",
                        "kind": "missing_parent"})
    edited, missing = drift_sets if drift_sets is not None else _drift_sets()
    if edited is not None and (slug in edited or slug in missing):
        out.append({"label": "codex cache",
                    "awaiting": "a rebuild — this entry has drifted from disk",
                    "kind": "drift"})
    if slug not in _fingerprinted_slugs():
        out.append({"label": "lint coverage",
                    "awaiting": "a structural fingerprint — currently vocabulary-only",
                    "kind": "coverage"})
    return out


# ------------------------------------------------------- Circuit 3 · maturity
# Pass 4 (2026-07-22): the two-state model made a closed loop, not a set of
# labels. Maturity is DERIVED from condition-state every call (never stored — a
# stored maturity label rots, RETURN R1), and the supersede history is walkable
# so the loop remembers where each canon version came from.
def open_conditions(obj: dict) -> list:
    """The unmet conditions on a staged working object — what keeps it 'working'.
    Two real sources: a held mark whose anchor has NOT fired, and any explicit
    conditions the object carries. Derived, recomputed here every call."""
    conds = []
    mark = obj.get("mark") or {}
    if mark.get("verdict") == "hold" and mark.get("condition"):
        fired = None
        try:
            import return_circuit
            fired = return_circuit._check(mark["condition"])
        except Exception:
            fired = None
        if not fired:      # a held condition is open until its anchor fires
            conds.append({"kind": "held", "condition": mark["condition"]})
    for c in (obj.get("open_conditions") or []):
        conds.append({"kind": "explicit", "condition": c})
    return conds


def maturity(obj: dict) -> str:
    """Two-state maturity DERIVED from condition-state (never stored):
      working  — >=1 open condition (still waiting on something)
      eligible — no open condition (ready for Kevin's cross)
    Canon (a frozen patterns/*.md) is the resting third state, reached only by
    his cross of an eligible object — never computed here."""
    if obj.get("state") == "canon":
        return "canon"
    return "working" if open_conditions(obj) else "eligible"


def ancestry(slug: str, index: list = None) -> list:
    """Walk from a pattern back through every superseded ancestor. A cross that
    supersedes makes the descendant carry `EXTENDS \\`ancestor\\`` and folds the
    ancestor to _folded/ with a lineage line; following EXTENDS backward walks
    the whole history — current canon → folded ancestor → its ancestor → … The
    loop remembers its own past; folded ancestors are kept, never deleted."""
    idx = index if index is not None else build_index()
    chain, seen, cur = [], set(), slug
    while cur and cur not in seen:
        seen.add(cur)
        e = find_by_slug(idx, cur)
        if not e:
            chain.append({"slug": cur, "state": "missing", "present": False})
            break
        chain.append({"slug": cur, "state": e["state"], "title": e["title"],
                      "present": True})
        parents = e.get("extends", [])
        cur = parents[0] if parents else None     # the version this superseded
    return chain


def read_pattern(slug: str, state: str = "canon") -> str:
    base = core.CANON if state == "canon" else core.FOLDED
    p = base / f"{slug}.md"
    if not p.exists():
        return f"(not found: {p})"
    return _read(p)


def find_by_slug(index: list, slug: str):
    for e in index:
        if e["slug"] == slug:
            return e
    return None


def search(index: list, query: str, state_filter: str = "all") -> list:
    q = (query or "").strip().lower()
    out = []
    for e in index:
        if state_filter != "all" and e["state"] != state_filter:
            continue
        if not q or q in e["title"].lower() or q in e["slug"].lower() \
                or q in e["thesis"].lower():
            out.append(e)
    return out
