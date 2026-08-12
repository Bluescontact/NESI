#!/usr/bin/env python3
"""
NESI COMPOSER BENCH DEEPDIVE v0 — the deep review chamber. Standard
library only.

Not a detail pane — the room Kevin stands in and works one object inside,
in depth. Two objects can be open at once (compare). Everything here is
governed by the LANGUAGE LAYER (Kevin's own division of labor, this
build's spec): VISUAL carries structure/relation, LANGUAGE carries
state/verdict/cost. Neither substitutes for the other.

Two kinds of object, one grammar:
    kind='staged'  — a bench-made or metabolized object, staged/<id>.json
    kind='pattern' — a canon or folded pattern, patterns/<slug>.md

THE THREE ATTRIBUTED VERDICT LINES (ARTIFACT_GRAMMAR rule 2 — Library,
Governor, Center each speak in their own register, never merged):
    library  — what register this object opens, and what it extends
    governor — quantified counts (lint fold/hold/pass for staged objects;
               named as untracked for canon patterns — no per-pattern
               ledger exists on disk, so this is a real absence, not a
               design choice, and it renders as one)
    center   — disposition: the status word itself (rule 1's fixed
               vocabulary: DRAFT/STAGED/HELD+condition/RATIFIED+date/
               COMPOSTED+reason/lineage-only)

EDITING (this build's one genuinely new write path): a pattern's markdown
splits into ## sections; a staged object's one prose field is its draft.
Both edit through the same two calls — save_section() writes the real
file and pushes an undo snapshot; undo() pops it back. Unsaved keystrokes
autosave to deepdive_state.json as a DRAFT (never touches the real file)
so closing mid-edit loses nothing; the file itself only changes on an
explicit Save.

STOPS: no engine call anywhere in this module. keyword_pull and the
reader's structural checks are the two local instruments surfaced —
both already deterministic, reused verbatim, not reimplemented.
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import bench
import core
import library
import reader

STATE_PATH = core.NESI / "deepdive_state.json"
UNDO_CAP = 10
SECTION_RE = re.compile(r"^##\s+(.+)$", re.MULTILINE)
H1_RE = re.compile(r"^#\s+(.+)$", re.MULTILINE)


# --------------------------------------------------------------- state I/O
def _load_state() -> dict:
    if not STATE_PATH.exists():
        return {"drafts": {}, "undo": {}, "ui": {}}
    try:
        d = json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except Exception:
        d = {}
    d.setdefault("drafts", {})
    d.setdefault("undo", {})
    d.setdefault("ui", {})
    return d


def _save_state(d: dict) -> None:
    STATE_PATH.write_text(json.dumps(d, indent=2, ensure_ascii=False), encoding="utf-8")


def _ref_key(kind: str, ref: str) -> str:
    return f"{kind}:{ref}"


def save_ui_state(patch: dict) -> None:
    """Persist the chamber's own UI state — open object(s), compare
    partner, scroll position — read back verbatim on reopen (rule 7,
    'returning to an object returns to the work, not a fresh page')."""
    d = _load_state()
    d["ui"].update(patch)
    _save_state(d)


def load_ui_state() -> dict:
    return _load_state().get("ui", {})


def save_draft(kind: str, ref: str, section_key: str, text: str) -> None:
    """Autosave path — never touches the real file. Called on every edit
    (caller debounces); a crash or close mid-edit loses nothing."""
    d = _load_state()
    k = _ref_key(kind, ref)
    d["drafts"].setdefault(k, {})[section_key] = text
    _save_state(d)


def get_drafts(kind: str, ref: str) -> dict:
    return _load_state()["drafts"].get(_ref_key(kind, ref), {})


def clear_draft(kind: str, ref: str, section_key: str) -> None:
    d = _load_state()
    k = _ref_key(kind, ref)
    if k in d["drafts"] and section_key in d["drafts"][k]:
        del d["drafts"][k][section_key]
        if not d["drafts"][k]:
            del d["drafts"][k]
        _save_state(d)


# ------------------------------------------------------------- undo stack
def _push_undo(kind: str, ref: str, prior_text: str) -> None:
    d = _load_state()
    k = _ref_key(kind, ref)
    stack = d["undo"].setdefault(k, [])
    stack.append({"text": prior_text, "at": datetime.now().isoformat(timespec="seconds")})
    del stack[:-UNDO_CAP]   # keep only the most recent UNDO_CAP
    _save_state(d)


def can_undo(kind: str, ref: str) -> bool:
    d = _load_state()
    return bool(d["undo"].get(_ref_key(kind, ref)))


def undo(kind: str, ref: str) -> dict:
    """Pop the most recent snapshot, restore it to the real file, return
    the freshly-loaded grammar. If there's nothing to pop, a no-op that
    says so — never an error, never a fabricated restore."""
    d = _load_state()
    k = _ref_key(kind, ref)
    stack = d["undo"].get(k, [])
    if not stack:
        return load_chamber(kind, ref, note="nothing to undo")
    path = _path_for(kind, ref)
    if kind == "pattern" and _is_canon(path):
        # Second index-blind canon writer (R2 / Surfaced S5) — same close as
        # save_pattern_section: no in-place canon write, even to undo. Leave the
        # snapshot on the stack; canon changes only by spawn → re-cross.
        return load_chamber(kind, ref, note="canon is immutable in place — "
                            "undo does not write canon; spawn a descendant instead")
    snap = stack.pop()
    _save_state(d)
    path.write_text(snap["text"], encoding="utf-8")
    return load_chamber(kind, ref, note=f"undone — restored the version from {snap['at']}")


def _path_for(kind: str, ref: str) -> Path:
    if kind == "staged":
        return core.STAGED / f"{ref}.json"
    return core.CANON / f"{ref}.md"   # folded objects are edited via their real path; see _find_pattern_path


def _find_pattern_path(slug: str) -> Path:
    p = core.CANON / f"{slug}.md"
    if p.exists():
        return p
    return core.FOLDED / f"{slug}.md"


# ---------------------------------------------------------- markdown split
def parse_sections(text: str):
    """Split on H2 (## Heading) boundaries. Returns (preamble, [{heading,
    body}]). Deliberately general — real pattern files do NOT share one
    fixed header set (audited across a sample: 'Transferable Form' /
    'The pattern in one move', 'Development' / 'Why this pattern exists'
    all appear) — rule 10 (fixed section grammar) is a chamber-rendering
    law, not an assumption about what's already on disk. Editing works on
    whatever sections a file actually has."""
    matches = list(SECTION_RE.finditer(text))
    if not matches:
        return text, []
    preamble = text[:matches[0].start()]
    sections = []
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        sections.append({"heading": m.group(1).strip(), "body": text[start:end].strip("\n")})
    return preamble, sections


def reassemble(preamble: str, sections: list) -> str:
    out = preamble.rstrip("\n") + "\n\n" if preamble.strip() else ""
    parts = [out.rstrip("\n")]
    for s in sections:
        parts.append(f"## {s['heading']}\n\n{s['body']}")
    return ("\n\n".join(p for p in parts if p.strip())).rstrip("\n") + "\n"


# ------------------------------------------------------------- grammar: staged
def _status_for_staged(obj: dict) -> dict:
    mark = obj.get("mark") or {}
    verdict = mark.get("verdict")
    crossed = obj.get("crossed") and not obj.get("uncrossed")
    if crossed:
        return {"word": "RATIFIED", "detail": f"crossed {obj['crossed'].get('at', '?')}", "flagged": False}
    if verdict == "hold":
        cond = (mark.get("condition") or "").strip()
        return {"word": "HELD", "detail": cond or "no condition named", "flagged": not cond}
    if verdict == "compost":
        return {"word": "COMPOSTED", "detail": "no reason captured — the compost verb "
                "does not currently collect one; a real gap, not a design choice", "flagged": True}
    return {"word": "STAGED", "detail": "awaiting Kevin's mark", "flagged": False}


def grammar_for_staged(sid: str) -> dict:
    path = core.STAGED / f"{sid}.json"
    if not path.exists():
        return {"error": f"no staged object at {path}"}
    obj = json.loads(path.read_text(encoding="utf-8"))
    bench_meta = obj.get("bench") or {}
    intent = bench_meta.get("intent") or obj.get("pile", sid)
    pulled = (obj.get("bench") or {}).get("pulled") or []
    # staged objects from the metabolizer (not the bench) carry pulled
    # patterns differently — object.items[] with target=pattern file
    items = (obj.get("object") or {}).get("items", [])
    extends = sorted({it["target"][:-3] for it in items
                      if it.get("target", "").endswith(".md")}) or \
              sorted({p["file"][:-3] for p in pulled if p.get("file", "").endswith(".md")})
    status = _status_for_staged(obj)
    lint = obj.get("lint")
    governor = (f"{lint['folds']} fold · {lint['holds']} hold · {lint['passes']} pass"
                if lint else "no lint record on this object — not yet run against the library")
    draft_text = (obj.get("object") or {}).get("summary") or obj.get("draft", "")
    sections = [{"heading": "Draft", "body": draft_text, "key": "draft"}]
    notes = obj.get("break_notes") or []
    if notes:
        sections.append({"heading": "Break notes", "body": "\n".join(f"- {n}" for n in notes),
                          "key": "break_notes", "readonly": True})
    return {
        "kind": "staged", "ref": sid, "path": str(path),
        "title": intent, "slug": sid,
        "extends": extends,
        "sections": sections,
        "edges": [{"to": it.get("target"), "kind": it.get("disposition")} for it in items],
        "verdicts": {
            "library": f"opens the private working register · extends: "
                       f"{', '.join(extends) if extends else '(none pulled)'}",
            "governor": governor,
            "center": f"{status['word']} — {status['detail']}",
        },
        "status": status,
        "gaps": [g for g in [
            "engine dark — draft/break/refine content is stub-shaped, not real" if
                (obj.get("engine", "") or (obj.get("bench") or {}).get("engine", "")).startswith("stub") else None,
        ] if g],
    }


def save_staged_section(sid: str, section_key: str, new_body: str) -> dict:
    path = core.STAGED / f"{sid}.json"
    if not path.exists():
        return {"error": f"no staged object at {path}"}
    prior_text = path.read_text(encoding="utf-8")
    obj = json.loads(prior_text)
    if section_key == "draft":
        if "object" in obj and isinstance(obj["object"], dict) and "summary" in obj["object"]:
            obj["object"]["summary"] = new_body
        else:
            obj["draft"] = new_body
    _push_undo("staged", sid, prior_text)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8")
    clear_draft("staged", sid, section_key)
    return load_chamber("staged", sid, note="saved")


# ------------------------------------------------------------ grammar: pattern
def _crossing_record(slug: str):
    """Best-effort lookup of a real crossing date from membrane/
    transition_records/*.json — never fabricated; None means genuinely
    not found, rendered as a named gap by the caller."""
    tdir = core.DSS / "membrane" / "transition_records"
    if not tdir.exists():
        return None
    # filenames are inconsistent about hyphen vs underscore (audited: both
    # forms exist on disk for different crossings) — try the slug as-is,
    # then with underscores swapped for hyphens, rather than assuming one.
    for variant in (slug, slug.replace("_", "-")):
        for p in tdir.glob(f"*{variant}*.json"):
            try:
                return json.loads(p.read_text(encoding="utf-8"))
            except Exception:
                continue
    return None


def grammar_for_pattern(slug: str, state: str) -> dict:
    path = _find_pattern_path(slug)
    if not path.exists():
        return {"error": f"no pattern file for {slug}"}
    text = path.read_text(encoding="utf-8", errors="replace")
    h1 = H1_RE.search(text)
    title = h1.group(1).strip() if h1 else slug.replace("_", " ")
    extends = sorted(set(re.findall(r"EXTENDS\s+`([a-zA-Z0-9_\-]+)`", text)))
    preamble, sections = parse_sections(text)
    for s in sections:
        s["key"] = s["heading"]
    if state == "canon":
        rec = _crossing_record(slug)
        if rec:
            mark = rec.get("kevin_mark") or {}
            when = mark.get("timestamp") or (rec.get("converger_pass") or {}).get("timestamp", "?")
            raw = mark.get("raw", "")
            status = {"word": "RATIFIED",
                      "detail": f"crossed {when}" + (f" — Kevin's mark: \"{raw}\"" if raw else ""),
                      "flagged": False}
        else:
            status = {"word": "RATIFIED", "detail": "in canon — no transition record found on disk "
                      "(crossing predates the record-keeping, or the record wasn't matched by slug)",
                      "flagged": True}
    else:
        status = {"word": "lineage-only", "detail": "folded from canon (uncrossed), kept not deleted",
                  "flagged": False}
    return {
        "kind": "pattern", "ref": slug, "path": str(path),
        "title": title, "slug": slug,
        "extends": extends,
        "sections": sections,
        "edges": [{"to": e, "kind": "extends"} for e in extends],
        "verdicts": {
            "library": f"opens the {state} register" + (f" · extends: {', '.join(extends)}" if extends else ""),
            "governor": "not tracked for canon patterns — no per-pattern kept/cut ledger exists on disk; "
                        "the Governor's counts live only on staged objects via lint",
            "center": f"{status['word']} — {status['detail']}",
        },
        "status": status,
        "gaps": [],
    }


def _is_canon(path: Path) -> bool:
    """A file living in patterns/ (and not in patterns/_folded/) is CANON —
    a crossed, frozen version. Two-state model (Rebuild pass 3, M3 as Kevin
    marked + collapse-refined 2026-07-22): canon is immutable in place. The
    only lawful way to change its content is spawn_descendant() → edit the
    working copy → re-cross to supersede. There is no in-place canon edit."""
    return str(core.CANON) in str(path) and "_folded" not in str(path)


def save_pattern_section(slug: str, section_key: str, new_body: str) -> dict:
    path = _find_pattern_path(slug)
    if not path.exists():
        return {"error": f"no pattern file for {slug}"}
    if _is_canon(path):
        # THE R2 CLOSE. Canon is frozen; an in-place edit here is exactly the
        # write that used to desync the codex cache silently. Refused, loudly,
        # naming the lawful path instead of performing the corruption.
        return {"error": "canon is immutable in place — this version is frozen. "
                          f"To change it: spawn a working descendant of `{slug}` "
                          "(deepdive.spawn_descendant), edit that, and re-cross to "
                          "supersede. The ancestor composts with a lineage line.",
                "refused": "canon-immutable", "lawful_path": "spawn_descendant",
                "slug": slug}
    prior_text = path.read_text(encoding="utf-8")
    preamble, sections = parse_sections(prior_text)
    found = False
    for s in sections:
        if s["heading"] == section_key:
            s["body"] = new_body
            found = True
            break
    if not found:
        return {"error": f"section '{section_key}' not found — file may have changed on disk"}
    new_text = reassemble(preamble, sections)
    _push_undo("pattern", slug, prior_text)
    path.write_text(new_text, encoding="utf-8")
    clear_draft("pattern", slug, section_key)
    state = "canon" if str(core.CANON) in str(path) and "_folded" not in str(path) else "folded"
    return load_chamber("pattern", slug, state, note="saved")


def spawn_descendant(slug: str) -> dict:
    """The lawful path to change a frozen canon pattern (two-state model,
    2026-07-22). Copies the canon body into a new WORKING staged object that
    EXTENDS the frozen version and is marked to supersede it on cross. Canon is
    untouched; the copy is editable (save_descendant_section); crossing it
    supersedes the ancestor (core._fold_superseded folds it with lineage)."""
    src = core.CANON / f"{slug}.md"
    if not src.exists():
        return {"error": f"no canon pattern `{slug}` to spawn from"}
    body = src.read_text(encoding="utf-8", errors="replace")
    if not re.search(rf"EXTENDS\s+`{re.escape(slug)}`", body):
        m = H1_RE.search(body)
        extends_line = f"\nEXTENDS `{slug}`\n"
        if m:
            nl = body.find("\n", m.start())
            nl = nl if nl != -1 else len(body)
            body = body[:nl] + "\n" + extends_line + body[nl:]
        else:
            body = extends_line + body
    sid = f"{datetime.now():%Y-%m-%d_%H%M%S%f}_{slug}_desc"
    staged = {
        "id": sid,
        "pile": f"{slug}_descendant",
        "pile_path": str(src),
        "raw_text_inside": True,
        "run": {"finished": core.now(), "engine": "spawn (no engine)", "error": None},
        "object": {
            "summary": f"working descendant of canon `{slug}` — edit, then cross to supersede",
            "body_markdown": body,
            "kind": "pattern_descendant",
        },
        "supersedes": slug,
        "lint": None,
        "mark": {"verdict": None, "at": None},
    }
    (core.STAGED / f"{sid}.json").write_text(
        json.dumps(staged, indent=2, ensure_ascii=False), encoding="utf-8")
    return {"kind": "descendant", "ref": sid, "slug": slug, "supersedes": slug,
            "note": f"spawned working descendant of `{slug}` — edit it, then cross to supersede"}


def save_descendant_section(sid: str, section_key: str, new_body: str) -> dict:
    """Edit a section of a working descendant's body. Legal — a descendant is
    WORKING, not canon; editing in place is exactly what the two-state model
    permits below the frozen tier."""
    path = core.STAGED / f"{sid}.json"
    if not path.exists():
        return {"error": f"no staged descendant at {sid}"}
    obj = json.loads(path.read_text(encoding="utf-8"))
    body = (obj.get("object") or {}).get("body_markdown")
    if body is None:
        return {"error": f"{sid} is not a pattern descendant (no body_markdown)"}
    preamble, sections = parse_sections(body)
    found = False
    for s in sections:
        if s["heading"] == section_key:
            s["body"] = new_body
            found = True
            break
    if not found:
        return {"error": f"section '{section_key}' not found in descendant body"}
    obj["object"]["body_markdown"] = reassemble(preamble, sections)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8")
    return {"kind": "descendant", "ref": sid, "note": "saved (working — editable in place)"}


def grammar_for_descendant(sid: str) -> dict:
    """The deepdive chamber over a working descendant's body (Step 4/8 gap
    close, 2026-07-22). A descendant is a WORKING staged object with a
    body_markdown field; this renders it as an editable chamber, same section
    grammar as a pattern, so the spawn → edit → cross loop lives in one place."""
    path = core.STAGED / f"{sid}.json"
    if not path.exists():
        return {"error": f"no staged descendant at {sid}"}
    obj = json.loads(path.read_text(encoding="utf-8"))
    body = (obj.get("object") or {}).get("body_markdown")
    if body is None:
        return {"error": f"{sid} is not a pattern descendant (no body_markdown)"}
    supersedes = obj.get("supersedes")
    h1 = H1_RE.search(body)
    title = h1.group(1).strip() if h1 else sid
    extends = sorted(set(re.findall(r"EXTENDS\s+`([a-zA-Z0-9_\-]+)`", body)))
    preamble, sections = parse_sections(body)
    for s in sections:
        s["key"] = s["heading"]
    marked = (obj.get("mark") or {}).get("verdict")
    if marked == "cross":
        status = {"word": "CROSSED", "detail": "superseded its ancestor", "flagged": False}
    else:
        status = {"word": "WORKING",
                  "detail": (f"descendant of `{supersedes}` — editable; cross to supersede"
                             if supersedes else "working copy — editable"),
                  "flagged": False}
    return {
        "kind": "descendant", "ref": sid, "path": str(path),
        "title": title, "slug": sid, "supersedes": supersedes,
        "extends": extends,
        "sections": sections,
        "edges": [{"to": e, "kind": "extends"} for e in extends],
        "verdicts": {
            "library": "working descendant"
                       + (f" · supersedes `{supersedes}` on cross" if supersedes else ""),
            "governor": "working tier — editable in place; no canon write until you cross",
            "center": f"{status['word']} — {status['detail']}",
        },
        "status": status,
        "gaps": [],
    }


# ------------------------------------------------------------- entry point
def load_chamber(kind: str, ref: str, state: str = "canon", note: str = "") -> dict:
    if kind == "staged":
        g = grammar_for_staged(ref)
    elif kind == "descendant":
        g = grammar_for_descendant(ref)
    else:
        g = grammar_for_pattern(ref, state)
    if "error" in g:
        return g
    drafts = get_drafts(kind, ref)
    for s in g["sections"]:
        if s["key"] in drafts:
            s["draft_pending"] = drafts[s["key"]]
    g["can_undo"] = can_undo(kind, ref)
    if note:
        g["note"] = note
    return g


def save_section(kind: str, ref: str, section_key: str, new_body: str) -> dict:
    if kind == "staged":
        return save_staged_section(ref, section_key, new_body)
    if kind == "descendant":
        return save_descendant_section(ref, section_key, new_body)
    return save_pattern_section(ref, section_key, new_body)


# --------------------------------------------------------- reverse lookups
def find_staged_id_for_pattern(slug: str):
    """A canon pattern opened directly from the library carries no staged
    id on its own — uncross() needs one (it folds via the STAGED record
    that did the crossing). Scan staged/*.json for the matching, not-yet-
    uncrossed crossing record. None means genuinely not found — the
    caller renders that as a named gap, never a silent disable."""
    target = f"{slug}.md"
    for p in core.STAGED.glob("*.json"):
        try:
            obj = json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            continue
        crossed = obj.get("crossed")
        if crossed and crossed.get("pattern_file") == target and not obj.get("uncrossed"):
            return obj.get("id", p.stem)
    return None


# ------------------------------------------------------------- correction
def add_correction(kind: str, ref: str, note: str) -> dict:
    """A correction is a LEDGER ANNOTATION, not a mark (ARTIFACT_GRAMMAR:
    'no code acts on it'). Appends one line to marks.jsonl with its own
    shape (no 'verdict' key) so record_mark's readers never mistake it
    for a verdict; nothing downstream reacts to this write."""
    note = (note or "").strip()
    if not note:
        raise ValueError("empty correction — nothing to annotate")
    with open(core.MARKLOG, "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": core.now() if hasattr(core, "now") else
                            datetime.now().isoformat(timespec="seconds"),
                            "kind": kind, "ref": ref, "correction": note},
                           ensure_ascii=False) + "\n")
    return {"ok": True}


# -------------------------------------------------------- local instruments
def instrument_absence(text: str) -> dict:
    """keyword_pull, reused verbatim — the deterministic floor, no engine.
    States what it checked and what it did not."""
    hits = bench.keyword_pull(text, limit=8)
    return {
        "name": "absence check (keyword_pull)",
        "measured": "word overlap between this text and every pattern's filename/H1/thesis line",
        "not_measured": "meaning — a real semantic absence check needs the engine; this is the "
                        "deterministic floor only",
        "results": hits,
    }


def instrument_structural(obj_like: dict) -> dict:
    """reader.py's deterministic checks only (passive voice, drift,
    load-paths) — NOT reader.read(), which also calls bench.invoke('read')
    for the semantic layer. That call is skipped here on purpose."""
    findings = reader._structural_checks(obj_like)
    return {
        "name": "structural read (deterministic)",
        "measured": "passive-voice flags, drift-against-prior-ground, load-path presence",
        "not_measured": "the reader's semantic layer (reader.read()'s bench.invoke('read') call) — "
                        "engine-dark, skipped entirely here rather than run against a stub",
        "results": [f.get("text", f) if isinstance(f, dict) else f for f in findings],
    }


def instrument_lineage_depth(slug: str, idx=None) -> dict:
    """BFS over EXTENDS edges — pure graph walk, no engine. Cycles guard
    against a malformed EXTENDS chain looping forever."""
    idx = idx if idx is not None else library.build_index()
    by_slug = {e["slug"]: e for e in idx}
    seen, frontier, depth, chain = {slug}, [slug], 0, []
    while frontier:
        nxt = []
        for s in frontier:
            e = by_slug.get(s)
            if not e:
                continue
            for parent in e.get("extends", []):
                if parent in seen:
                    continue
                seen.add(parent)
                chain.append({"from": s, "to": parent, "depth": depth + 1})
                nxt.append(parent)
        frontier = nxt
        depth += 1
        if depth > 25:
            break
    return {
        "name": "lineage depth (EXTENDS graph walk)",
        "measured": f"{len(chain)} edge(s) across {depth - 1 if chain else 0} generation(s)",
        "not_measured": "whether the lineage is CORRECT — this only walks what's already written",
        "results": chain,
    }
