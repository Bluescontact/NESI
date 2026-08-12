#!/usr/bin/env python3
"""
NESI BENCH v0 — the production surface, INTERNAL-COMPLETE.
Standard library only. The digestor runs world → pattern; the bench runs
pattern → object — outward, but into the PRIVATE organ, never out the door.

THE SOCKET (this build's primary deliverable):

    invoke(op, payload) -> {"op", "engine", "stub", "output"}

One contract; every generative operation is an instance of it. Four ops:
    draft(intent, pulled_patterns)      -> object_draft
    break(object)                       -> falsification_notes  (the reader)
    refine(object, notes)               -> revised_object
    semantic_pull(intent)               -> ranked_patterns
semantic_pull IS the interrogator's deferred Move C (absence-against-
library) — one matching call, shared, per Kevin's confirmed default.

Engine selection reuses core.current_engine() — the SAME seam discipline as
the metabolizer: try the selected engine, fall back to the stub LOUDLY. No
engine is wired this session (Kevin's mark: internal-complete first), so
every call lands on the stub: correctly-SHAPED output, loudly labeled
[STUB ...], badged stub=True so it can never pass as real production. When
the engine is wired, it is one substitution in _ENGINE_OPS — nothing above
this seam changes. Do not chase content quality here; the loop is the
acceptance test, not the output.

MAKING IS NOT CROSSING: land() writes the object to staged/ with
origin="made" and NO crossing-eligibility flag of any kind. Kevin's
existing cross/hold/compost verbs take it from there — cross means into
private canon via the existing sync-loud promote; the membrane is a
separate, shut, downstream gate this module knows nothing about.

Session 2026-07-20 (§ NESI SESSION 2/3): the bench stands up as the surface
around this same socket — nothing new built underneath it. §4 marks, as
resolved:
  - object store: staged/ with origin="made" — unchanged, already the case.
  - reader sharing: ONE reader — keyword_pull() below is called by both
    new_object() here AND interrogator.check_absence() (wired S1). Not two.
  - pull keys: marked default was pattern `type` + `tags`. Patterns carry
    neither (audited 2026-07-17, zero of 91 have frontmatter) — so the
    stand-in is the field content that already exists: filename slug + H1
    title + bold thesis line (pull_keys(), below). Same floor, not a second
    one; flips to real type/tags if patterns ever grow frontmatter.
  - intent: free text + an object-type TAG, deterministic (classify_type(),
    below) — a keyword table in the same shape as front.py's ROUTES, not a
    field Kevin has to fill in. "No framework vocabulary required from
    Kevin" (§2) — the tag is inferred, never asked for.
"""

import json
import re
import sys
import uuid
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

PATTERNS = core.CANON      # the same library that lints intake stocks the bench
STAGED   = core.STAGED

_STOP = set("the a an of to in and or for is are was be as at by on with from "
            "it its this that not no what how when into your you i we".split())


def _now():
    return datetime.now().isoformat(timespec="seconds")


def _words(text: str) -> set:
    return {w for w in re.findall(r"[a-z]{3,}", (text or "").lower())
            if w not in _STOP}


# ------------------------------------------------- deterministic pull floor

def pull_keys():
    """Per-pattern pull keys: filename slug + H1 title + bold thesis line.
    (Patterns carry no tags/frontmatter — audited 2026-07-17; which fields
    serve as keys is an open §8 mark.)"""
    keys = []
    for p in sorted(PATTERNS.glob("*.md")):
        title = thesis = ""
        try:
            for line in p.read_text(encoding="utf-8",
                                    errors="replace").splitlines()[:12]:
                s = line.strip()
                if s.startswith("# ") and not title:
                    title = s[2:]
                elif s.startswith("**") and not thesis:
                    thesis = s.strip("*")
                if title and thesis:
                    break
        except Exception:
            continue
        keys.append({"file": p.name, "title": title or p.stem,
                     "words": _words(p.stem.replace("_", " ") + " "
                                     + title + " " + thesis)})
    return keys


# ------------------------------------------------------ intent -> object-type
# Deterministic tag, same discipline as front.py's ROUTES: ordered keyword
# table, first match wins, no match falls to the generic "object" tag. Never
# asked of Kevin — read off his own words.
TYPE_MARKERS = [
    ("letter",     ["letter", "write to", "dear ", "email to", "reply to"]),
    ("note",       ["note", "reminder", "quick note", "heads up"]),
    ("instrument", ["instrument", "tool", "widget", "interface", "dashboard"]),
    ("spec",       ["spec", "specification", "build spec", "blueprint"]),
    ("reflection", ["reflection", "read-back", "witness", "mirror"]),
    ("gift",       ["gift", "offering"]),
]


def classify_type(intent: str) -> str:
    """First matching tag wins; no match = 'object', the generic default."""
    low = (intent or "").lower()
    for tag, markers in TYPE_MARKERS:
        if any(m in low for m in markers):
            return tag
    return "object"


def keyword_pull(intent: str, limit: int = 6) -> list:
    """The deterministic floor — word overlap between the intent and each
    pattern's keys. No engine, same discipline as the interrogator's
    conditions-check: misses quietly, never fabricates a bearing."""
    iw = _words(intent)
    if not iw:
        return []
    scored = []
    for k in pull_keys():
        hit = iw & k["words"]
        if hit:
            scored.append({"file": k["file"], "title": k["title"],
                           "overlap": sorted(hit),
                           "score": len(hit)})
    scored.sort(key=lambda s: (-s["score"], s["file"]))
    return scored[:limit]


# ----------------------------------------------------------------- THE SOCKET

def _stub_op(op: str, payload: dict) -> dict:
    """Engine #0 for every bench op — correctly shaped, loudly placeholder.
    It produces NO real content, on purpose; making it 'good' would fake the
    one thing an engine-off build cannot have."""
    if op == "draft":
        pats = ", ".join(p["title"] for p in payload.get("patterns", [])) or "(none pulled)"
        return {"draft": f"[STUB DRAFT — engine not wired] type: "
                         f"{payload.get('type','object')} · intent: "
                         f"{payload.get('intent','')} · bearing patterns: {pats}"}
    if op == "break":
        return {"notes": ["[STUB BREAK — engine not wired] no falsification "
                          "performed; a real reader would attack the draft's "
                          "claims against the pulled patterns"]}
    if op == "refine":
        return {"draft": (payload.get("object", {}).get("draft", "")
                          + "\n[STUB REFINE — engine not wired] notes were not applied")}
    if op == "classify":
        # the front's semantic-routing upgrade — same socket, loud stub
        return {"organ": None, "note": "[STUB CLASSIFY — engine not wired] "
                "keyword floor stands alone; the front asks instead of guessing"}
    if op == "semantic_pull":
        return {"patterns": [], "note": "[STUB SEMANTIC PULL — engine not wired] "
                "keyword floor results stand alone; this op is also Move C"}
    if op == "bearing_semantic":
        # the interrogator's Move C semantic layer (session 2026-07-20) —
        # "should bear" by meaning, not keywords. Always empty on the stub;
        # the tag/keyword floor in interrogator.check_absence() stands alone
        # until this returns real patterns, no code change needed above it.
        return {"patterns": [], "note": "[STUB BEARING SEMANTIC — engine not "
                "wired] tag floor stands alone; this op is Move C's semantic layer"}
    if op == "read":
        # the reader's (reader.py, session 3) semantic layer — the actual
        # understanding of what a structural read would say. Always empty on
        # the stub; reader.py's deterministic checks (passive voice, drift,
        # load-paths) stand alone until this returns real findings.
        return {"findings": [], "note": "[STUB READ — engine not wired] "
                "deterministic checks stand alone; this is the reader's semantic layer"}
    if op == "author_diagram":
        # the Composer's (composer.py, session 4) one seam — the actual
        # semantic read of what a bench object's diagram should say. Always
        # an empty-but-valid DSL skeleton on the stub, never a fabricated
        # read; the Composer's deterministic template/renderer stand alone
        # (flagging the missing diagram) until this returns a real DSL file.
        return {"dsl": "nodes: []\nedges: []\n",
                "note": "[STUB AUTHOR_DIAGRAM — engine not wired] empty valid "
                "skeleton only; the Composer flags the gap rather than "
                "fabricating a diagram until this returns real authoring"}
    raise ValueError(f"unknown bench op: {op}")


# per-engine op tables. 'claude-cli' is DELIBERATELY absent this session —
# internal-complete before the engine (Kevin's mark). Wiring the engine later
# = adding one entry here; nothing above invoke() changes.
_ENGINE_OPS = {
    "stub": _stub_op,
}


def invoke(op: str, payload: dict) -> dict:
    """A verb adapter over the ONE seam. Since Pass 5 (2026-07-22) this DELEGATES
    to core.articulate(): it builds the deterministic scaffold (the loud
    placeholder `_stub_op`, non-AI, engine-off) and reaches the engine ONLY
    through articulate(). It no longer calls current_engine() itself — articulate
    is the sole engine-toucher. Dark, the scaffold stands and the return carries
    the empty-articulation socket; the shape callers already consume is preserved
    (`{op, engine, stub, output}`), with `socket`/`candidate` added. When an
    engine is registered in articulate, the same call fills the slot."""
    scaffold = _stub_op(op, payload)                 # deterministic; no engine
    cand = core.articulate({"scaffold": scaffold, "op": op, "payload": payload},
                           mode=op)
    if cand.get("articulation") is not None:         # an engine ran (future)
        return {"op": op, "engine": cand["engine"], "stub": False,
                "output": cand["articulation"], "candidate": cand}
    return {"op": op, "engine": "dark (articulation awaits)", "stub": True,
            "output": scaffold, "socket": cand["socket"], "candidate": cand}


# ------------------------------------------------------- the working object

def _import_composer():
    """Lazy import — the Composer (bench/composer/composer.py, session
    2026-07-20) imports this module for the invoke() socket, so importing it
    back at bench's top level would cycle at load time. Same discipline as
    run_break's lazy import of reader, below.

    Frozen-exe fix (2026-07-21, build 6): in a PyInstaller onefile build,
    composer.py is bundled by module NAME (build command passes --paths to
    bench/composer so its analysis finds it) — it does NOT live at a
    __file__-relative sibling directory inside sys._MEIPASS, so the old
    __file__.resolve().parents[1]-based sys.path insert silently pointed at
    a directory that doesn't exist frozen and `import composer` would fail.
    Try the bundled-module import first; only fall back to the dev-mode
    disk path when that raises (i.e. running from source, unfrozen)."""
    try:
        import composer
        return composer
    except ImportError:
        pass
    cdir = str(Path(__file__).resolve().parents[1] / "bench" / "composer")
    if cdir not in sys.path:
        sys.path.insert(0, cdir)
    import composer
    return composer


def _compose_view(obj: dict) -> dict:
    """Bench's own working-object shape (made_at/intent/type/pulled/draft/
    engine) isn't the staged shape the Composer's render_* functions read —
    this builds the minimal staged-shape view compose() needs, for the
    pre-land preview. land()'s own `staged` dict already IS that shape and
    is composed directly, no shim needed there."""
    return {
        "id": f"{obj.get('made_at','')}_preview",
        "origin": "made",
        "bench": {"intent": obj.get("intent", "")},
        "object": {
            "engine": obj.get("engine", ""),
            "summary": obj.get("draft", ""),
            "items": [{"item": f"bearing pattern: {p['title']}",
                       "disposition": "applied", "target": p["file"],
                       "evidence": f"keyword overlap: {', '.join(p['overlap'])}"}
                      for p in obj.get("pulled", [])],
        },
        "mark": {"verdict": None},
    }


def compose_preview(obj: dict) -> dict:
    """PIPE wiring (Kevin's mark, session 2026-07-20 §4): bench hands its own
    output to the Composer to render rather than rendering natively. No DSL
    is authored by bench itself — compose() runs author_diagram() on the
    stub when none is supplied, same honest-stub law as every other op; a
    freshly-drafted object has no diagram yet, so this always lands on the
    flagged missing-diagram path today, truthfully."""
    composer = _import_composer()
    out = composer.compose(_compose_view(obj))
    return {"card_html": out["card"]["html"],
            "infographic_svg": out["infographic"]["svg"],
            "doc_html": out["doc"]["html"],
            "diagram_status": out["diagram_status"],
            "dsl": out["dsl"]}


def new_object(intent: str) -> dict:
    """A container for the making: intent, its inferred type tag, pulled
    patterns (the frame), draft, history. `composed` is the Composer's
    render of this same object in the locked register — computed here so
    every caller (front.py, the bench tab) sees it without re-deriving it."""
    otype = classify_type(intent)
    pulled = keyword_pull(intent)
    d = invoke("draft", {"intent": intent, "type": otype, "patterns": pulled})
    obj = {"made_at": _now(), "intent": intent, "type": otype, "pulled": pulled,
           "draft": d["output"]["draft"], "engine": d["engine"],
           "stub": d["stub"],
           "history": [{"op": "draft", "at": _now(), "engine": d["engine"]}]}
    obj["composed"] = compose_preview(obj)
    return obj


def run_break(obj: dict) -> dict:
    """Break now delegates to the shared reader (reader.py, session 3) —
    ONE reader, not a second copy of falsification logic living here too.
    Lazy import: reader imports this module for invoke(); importing it back
    at bench's top level would cycle at load time, so the import happens
    here, after both modules are already fully loaded."""
    import reader
    r = reader.read(obj)
    obj["break_notes"] = r["lines"]
    obj["history"].append({"op": "break", "at": _now(), "engine": r["engine"]})
    return obj


def run_refine(obj: dict) -> dict:
    r = invoke("refine", {"object": obj, "notes": obj.get("break_notes", [])})
    obj["draft"] = r["output"]["draft"]
    obj["history"].append({"op": "refine", "at": _now(), "engine": r["engine"]})
    return obj


def land(obj: dict) -> str:
    """Land the working object in the private organ: a staged/ object with
    origin='made', shape-compatible with the existing mark queue and the
    existing sync-loud promote. NO crossing-eligibility — the private-first
    falsifier is read membrane-side, later, never asserted here."""
    slug = re.sub(r"[^a-z0-9]+", "_", obj["intent"].lower()).strip("_")[:40] or "object"
    otype = obj.get("type") or classify_type(obj["intent"])
    sid = f"{_now()[:10]}_made_{slug}_{uuid.uuid4().hex[:6]}"
    staged = {
        "id": sid,
        "origin": "made",
        "type": otype,
        "pile": f"bench:{otype}:{slug}.md",
        "raw_text_inside": True,
        "run": {"finished": _now(), "engine": obj["engine"], "error": None},
        "object": {
            "engine": obj["engine"],
            "pile": f"bench:{otype}:{slug}.md",
            "summary": obj["draft"][:400],
            "items": [{
                "item": f"bearing pattern: {p['title']}",
                "kind": "contained",
                "disposition": "applied",
                "target": p["file"],
                "evidence": f"keyword overlap: {', '.join(p['overlap'])}",
            } for p in obj["pulled"]],
            "restored_count": 0,
        },
        "bench": {"intent": obj["intent"], "history": obj["history"],
                  "break_notes": obj.get("break_notes", []),
                  "stub": obj["stub"]},
        "mark": {"verdict": None},
    }
    # PIPE wiring (Kevin's mark, session 2026-07-20 §4): `staged` is already
    # exactly the shape the Composer's compose() reads (id/object/bench/mark)
    # — no shim needed here, unlike the pre-land preview above. Rendered
    # AFTER the dict is built, BEFORE the write, so the landed JSON carries
    # its own render alongside the data it was rendered from.
    composer = _import_composer()
    out = composer.compose(staged)
    staged["composed"] = {"card_html": out["card"]["html"],
                          "infographic_svg": out["infographic"]["svg"],
                          "doc_html": out["doc"]["html"],
                          "diagram_status": out["diagram_status"],
                          "dsl": out["dsl"]}
    STAGED.mkdir(parents=True, exist_ok=True)
    (STAGED / f"{sid}.json").write_text(
        json.dumps(staged, indent=2, ensure_ascii=False), encoding="utf-8")
    core.log("bench-landed", id=sid, type=otype, stub=obj["stub"],
             diagram_status=staged["composed"]["diagram_status"])
    return sid


if __name__ == "__main__":
    intent = " ".join(sys.argv[1:]) or "a floor for holding without extraction"
    o = new_object(intent)
    o = run_break(o)
    o = run_refine(o)
    sid = land(o)
    print(json.dumps({"landed": sid, "type": o["type"],
                      "pulled": [p["file"] for p in o["pulled"]],
                      "stub": o["stub"], "draft_head": o["draft"][:160]},
                     ensure_ascii=False, indent=1))
