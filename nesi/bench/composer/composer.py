#!/usr/bin/env python3
"""
NESI COMPOSER v0 — the render organ. Standard library only.

Bench MAKES an object (draft/break/refine, private, engine-dark). The
Composer RENDERS a made (or any staged) object into the locked house
register: a card, a full-width infographic, and a long-form doc. It is
upstream of the door but crosses nothing — it renders private objects,
same as the bench, and it never marks.

THE ONE SEAM (this build's whole engine-touching surface):

    author_diagram(obj) -> dsl_text

reuses bench.invoke(op, payload) — the same socket every other organ
already shares. On the stub engine it returns an empty-but-valid DSL
skeleton (nodes: []  edges: []), never a fabricated read. When the
engine wires, this one call starts returning real diagram authoring —
nothing above the socket changes.

THE REGISTER IS LOCKED. One monospace family, hairline rule grid,
small-caps slot labels, high contrast, flat ink. Per-item variation
lives ONLY in text and diagram data — never in layout, type, or color.
If you find yourself adding a per-item style branch here, stop: that is
exactly the invariance-by-renderer law breaking.

THE SYMBOL LAW, enforced in code, not left to per-diagram taste
(Kevin's ratify, not a flip — session 2026-07-20 §4): meaning lives in
the substrate a diagram's nodes rest on, not painted into the node
boxes. Concretely: the boundary/substrate band is drawn FIRST, as the
largest and most persistent shape on the canvas, and nodes/edges are
recognition sites layered on top of it — never the reverse. A node
box never carries color-coded meaning; it carries only its plain id
and label, flat ink, same as every other node.

Two artifact sizes come off ONE render_diagram_svg() — same primitives,
different scale constants (SIZES). No second drawing path.

A PROMOTED/marked object with no DSL file does not ship a diagram-less
card silently — render_card()/render_doc() flag the gap in the slot
where the diagram would sit; they never fabricate one.
"""

import html
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "conductor"))
import bench  # noqa: E402  (the existing socket — bench.invoke)

INK = "#1a1408"
LINE = "#3a3020"
FAINT = "#7a6840"
FAINTER = "#a89870"
PAPER = "#f7f5f0"
SURFACE = "#eeebe3"
RULE = "#ccc5b0"


# ------------------------------------------------------------- the register
# ONE stylesheet. Every artifact type imports this same string — that is the
# whole of "invariance enforced by the renderer, not by discipline."

REGISTER_CSS = f"""
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
.nesi-artifact{{background:{PAPER};color:{INK};font-family:'Courier New',Courier,monospace;
  font-size:12px;line-height:1.6;max-width:720px;margin:0 auto;padding:22px;
  border:1px solid {RULE}}}
.nesi-artifact .slot-label{{font-size:8px;letter-spacing:2px;color:{FAINTER};
  text-transform:uppercase;margin-bottom:4px}}
.nesi-artifact .status-line{{font-size:9px;letter-spacing:1.5px;color:{FAINT};
  text-transform:uppercase;border-bottom:1px solid {RULE};padding-bottom:10px;
  margin-bottom:16px}}
.nesi-artifact h1{{font-size:15px;letter-spacing:1px;color:{INK};margin-bottom:2px}}
.nesi-artifact .provenance{{font-size:9px;color:{FAINT};margin-bottom:16px}}
.nesi-artifact .rule{{border-top:1px solid {RULE};margin:14px 0}}
.nesi-artifact .diagram-slot{{border:1px solid {RULE};background:{SURFACE};
  padding:8px;margin:10px 0;text-align:center}}
.nesi-artifact .diagram-missing{{font-size:10px;color:{FAINT};letter-spacing:0.5px;
  padding:14px 0}}
.nesi-artifact .body-text{{font-size:11px;color:{INK};margin-bottom:10px}}
.nesi-artifact .items{{font-size:11px;margin:6px 0 0 0;padding-left:16px}}
.nesi-artifact .items li{{margin-bottom:4px}}
.nesi-artifact .falsifier{{font-size:9px;color:{FAINT};border-top:1px dashed {RULE};
  padding-top:8px;margin-top:14px}}
@media print{{
  .nesi-artifact{{border:none;box-shadow:none}}
}}
"""

# 4-up imposition sheet: same card repeated in a print grid — locked, no
# per-sheet styling beyond the grid itself.
IMPOSITION_CSS = """
.nesi-imposition{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:720px;margin:0 auto}
@media print{.nesi-imposition{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}}
"""


def _esc(s) -> str:
    return html.escape(str(s if s is not None else ""), quote=True)


# ------------------------------------------------------------- the diagram DSL
# Constrained grammar only (nodes/edges/leverage/boundary), NOT general YAML —
# stdlib-only, hand-parsed to exactly the shape the brief specifies. Anything
# outside this shape is a DSL authoring error, not a parser feature to add.

def parse_dsl(text: str) -> dict:
    lines = [l for l in text.splitlines() if l.strip() and not l.strip().startswith("#")]

    def indent(l):
        return len(l) - len(l.lstrip(" "))

    def value(v):
        v = v.strip()
        if v.startswith("[") and v.endswith("]"):
            return [x.strip().strip("\"'") for x in v[1:-1].split(",") if x.strip()]
        if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
            return v[1:-1]
        return v

    root, i, n = {}, 0, len(lines)
    while i < n:
        line = lines[i]
        if indent(line) == 0 and line.rstrip().endswith(":"):
            key = line.strip()[:-1]
            i += 1
            if i < n and lines[i].lstrip().startswith("-"):
                items = []
                while i < n and lines[i].lstrip().startswith("-") and indent(lines[i]) > 0:
                    item_indent = indent(lines[i])
                    k, _, v = lines[i].lstrip()[1:].strip().partition(":")
                    item = {k.strip(): value(v)} if k else {}
                    i += 1
                    while i < n and indent(lines[i]) > item_indent and not (
                        lines[i].lstrip().startswith("-") and indent(lines[i]) == item_indent
                    ):
                        k2, _, v2 = lines[i].strip().partition(":")
                        if k2:
                            item[k2.strip()] = value(v2)
                        i += 1
                    items.append(item)
                root[key] = items
            else:
                d = {}
                while i < n and indent(lines[i]) > 0:
                    k, _, v = lines[i].strip().partition(":")
                    if k:
                        d[k.strip()] = value(v)
                    i += 1
                root[key] = d
        else:
            i += 1
    return root


def validate_dsl(dsl: dict) -> list:
    """FALSIFIER check — a diagram with an unresolvable reference is a bad
    DSL file, not a rendering problem to paper over. Returns issue strings;
    empty list means clean."""
    issues = []
    ids = {n.get("id") for n in dsl.get("nodes", [])}
    for e in dsl.get("edges", []):
        if e.get("from") not in ids:
            issues.append(f"edge references unknown node 'from': {e.get('from')}")
        if e.get("to") not in ids:
            issues.append(f"edge references unknown node 'to': {e.get('to')}")
        if e.get("kind") not in ("drain", "feed", "loop", "block"):
            issues.append(f"edge kind not in drain|feed|loop|block: {e.get('kind')}")
    return issues


# ------------------------------------------------------- the one renderer
# card and infographic are the SAME drawing code at two scales. No second
# path — that is the whole point of "primitives identical, two sizes."

SIZES = {
    "card": {"w": 320, "h": 170, "font": 9, "node_w": 60, "node_h": 26, "stroke": 1},
    "full": {"w": 960, "h": 440, "font": 15, "node_w": 150, "node_h": 54, "stroke": 1.4},
}


def render_diagram_svg(dsl: dict, size: str = "card") -> str:
    cfg = SIZES[size]
    W, H = cfg["w"], cfg["h"]
    nodes = dsl.get("nodes", [])
    edges = dsl.get("edges", [])
    leverage = dsl.get("leverage", {}) or {}
    boundary = dsl.get("boundary", {}) or {}

    n = len(nodes)
    margin = cfg["node_w"] * 0.8
    node_y = H * 0.32
    positions = {}
    for i, node in enumerate(nodes):
        x = margin if n <= 1 else margin + (W - 2 * margin) * i / (n - 1)
        positions[node.get("id")] = (x, node_y)

    parts = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" '
             f'font-family="Courier New, monospace" role="img">']
    parts.append(f'<title>{_esc(boundary.get("marker","diagram"))}</title>')
    parts.append('<defs><marker id="arrow" markerWidth="8" markerHeight="8" '
                  'refX="6" refY="3" orient="auto">'
                  f'<path d="M0,0 L6,3 L0,6 Z" fill="{LINE}"/></marker></defs>')

    # SYMBOL LAW, enforced: the substrate/boundary band is drawn FIRST and is
    # the largest, most persistent shape — the figure everything else rests
    # on. Nodes never carry the meaning; the band does.
    band_y, band_h = H * 0.60, H * 0.32
    parts.append(f'<rect x="1" y="{band_y}" width="{W-2}" height="{band_h}" '
                  f'fill="none" stroke="{LINE}" stroke-width="{cfg["stroke"]}" '
                  f'stroke-dasharray="2,2"/>')
    between = boundary.get("between", [])
    if between:
        parts.append(f'<text x="{W/2}" y="{band_y+band_h/2 - 2}" text-anchor="middle" '
                      f'font-size="{cfg["font"]}" fill="{FAINT}" letter-spacing="1">'
                      f'{_esc(" / ".join(between).upper())}</text>')
    marker = boundary.get("marker")
    if marker:
        parts.append(f'<text x="{W/2}" y="{band_y+band_h-6}" text-anchor="middle" '
                      f'font-size="{cfg["font"]-2}" fill="{FAINTER}">{_esc(marker)}</text>')

    dash = {"drain": "4,3", "feed": "0", "loop": "2,3", "block": "1,3"}
    for e in edges:
        if e.get("from") not in positions or e.get("to") not in positions:
            continue
        x1, y1 = positions[e["from"]]
        x2, y2 = positions[e["to"]]
        parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
                      f'stroke="{LINE}" stroke-width="{cfg["stroke"]}" '
                      f'stroke-dasharray="{dash.get(e.get("kind"), "0")}" '
                      f'marker-end="url(#arrow)"/>')
        if e.get("kind") == "block":
            parts.append(f'<line x1="{x2-6}" y1="{y2-8}" x2="{x2+6}" y2="{y2+8}" '
                          f'stroke="{LINE}" stroke-width="{cfg["stroke"]+0.4}"/>')

    nw, nh = cfg["node_w"] * 0.85, cfg["node_h"]
    for node in nodes:
        x, y = positions[node.get("id")]
        parts.append(f'<rect x="{x-nw/2}" y="{y-nh/2}" width="{nw}" height="{nh}" '
                      f'fill="{PAPER}" stroke="{LINE}" stroke-width="{cfg["stroke"]}"/>')
        parts.append(f'<text x="{x}" y="{y+4}" text-anchor="middle" '
                      f'font-size="{cfg["font"]}" fill="{INK}">'
                      f'{_esc(node.get("label", node.get("id","")))}</text>')

    on = leverage.get("on")
    if on:
        target = None
        if on.startswith("edge:"):
            pair = on[5:]
            for sep in ("→", "->"):
                if sep in pair:
                    a, b = pair.split(sep)
                    if a in positions and b in positions:
                        x1, y1 = positions[a]
                        x2, y2 = positions[b]
                        target = ((x1 + x2) / 2, min(y1, y2) - 10)
                    break
        elif on in positions:
            x, y = positions[on]
            target = (x, y - nh / 2 - 8)
        if target:
            tx, ty = target
            parts.append(f'<text x="{tx}" y="{ty}" text-anchor="middle" '
                          f'font-size="{cfg["font"]-1}" fill="{INK}" font-weight="bold">'
                          f'▲ ONE MOVE</text>')

    parts.append("</svg>")
    return "".join(parts)


# ------------------------------------------------------------- artifact types

def _status_line(obj: dict) -> str:
    verdict = (obj.get("mark") or {}).get("verdict")
    if verdict:
        return f"{verdict.upper()} · rendered by the Composer, {obj.get('id','')}"
    return f"STAGED — awaiting Kevin's mark · rendered by the Composer, {obj.get('id','')}"


def socket_text(label: str, awaiting: str) -> str:
    """Step 7 (Rebuild pass 3, 2026-07-22) — the general awaiting-slot text: an
    unmet condition rendered as a visible, labeled slot on an entry (absence as
    structural presence). The missing-diagram flag was its first hardcoded
    instance; it now calls this. Derived from real conditions only — a socket
    never exists without an unmet condition behind it."""
    return f"[ awaiting: {_esc(label)} — {_esc(awaiting)} ]"


def socket(label: str, awaiting: str) -> str:
    """The div-wrapped socket for standalone rendering."""
    return f'<div class="socket"><div class="socket-await">{socket_text(label, awaiting)}</div></div>'


def _diagram_slot(obj: dict, dsl: dict, dsl_source: str, size: str) -> tuple:
    """Returns (html_slot, svg_or_none, diagram_status). Never fabricates a
    diagram for an object with no DSL — flags the gap as a socket instead."""
    if dsl is None:
        return (f'<div class="diagram-slot"><div class="diagram-missing">'
                f'{socket_text("diagram", "no DSL file supplied for this object; flagged, not fabricated")}'
                f'</div></div>', None, "missing")
    issues = validate_dsl(dsl)
    if issues:
        return (f'<div class="diagram-slot"><div class="diagram-missing">'
                f'{socket_text("diagram", _esc("; ".join(issues)) + " — flagged, not rendered")}'
                f'</div></div>', None, "invalid")
    svg = render_diagram_svg(dsl, size)
    return (f'<div class="diagram-slot">{svg}</div>', svg, "present")


def render_card(obj: dict, dsl: dict = None, dsl_source: str = "") -> dict:
    slot_html, svg, status = _diagram_slot(obj, dsl, dsl_source, "card")
    summary = (obj.get("object", {}) or {}).get("summary", "") or obj.get("intent", "")
    body = (f'<div class="nesi-artifact">'
            f'<div class="status-line">{_esc(_status_line(obj))}</div>'
            f'<h1>{_esc(obj.get("bench", {}).get("intent") or obj.get("id", "object"))}</h1>'
            f'<div class="provenance">produced by: {_esc((obj.get("object", {}) or {}).get("engine", obj.get("engine","")))}'
            f' · source: {_esc(dsl_source or "none")}</div>'
            f'<div class="rule"></div>'
            f'{slot_html}'
            f'<div class="slot-label">summary</div>'
            f'<div class="body-text">{_esc(summary[:400])}</div>'
            f'</div>')
    return {"html": body, "svg": svg, "diagram_status": status}


def render_infographic(obj: dict, dsl: dict = None, dsl_source: str = "") -> dict:
    slot_html, svg, status = _diagram_slot(obj, dsl, dsl_source, "full")
    return {"svg": svg, "diagram_status": status, "html_wrapped":
            f'<div class="nesi-artifact" style="max-width:960px">{slot_html}</div>'}


def render_doc(obj: dict, dsl: dict = None, dsl_source: str = "") -> dict:
    slot_html, svg, status = _diagram_slot(obj, dsl, dsl_source, "full")
    items = (obj.get("object", {}) or {}).get("items", [])
    items_html = "".join(f"<li>{_esc(it.get('item',''))} — "
                          f"{_esc(it.get('disposition',''))} → "
                          f"{_esc(it.get('target',''))} "
                          f"(evidence: {_esc(it.get('evidence',''))})</li>"
                          for it in items)
    body = (f'<div class="nesi-artifact" style="max-width:960px">'
            f'<div class="status-line">{_esc(_status_line(obj))}</div>'
            f'<h1>{_esc(obj.get("bench", {}).get("intent") or obj.get("id", "object"))}</h1>'
            f'<div class="provenance">object id: {_esc(obj.get("id",""))} · '
            f'origin: {_esc(obj.get("origin",""))} · '
            f'produced by: {_esc((obj.get("object", {}) or {}).get("engine", obj.get("engine","")))}'
            f' · diagram source: {_esc(dsl_source or "none")}</div>'
            f'<div class="rule"></div>'
            f'{slot_html}'
            f'<div class="slot-label">summary</div>'
            f'<div class="body-text">{_esc((obj.get("object", {}) or {}).get("summary",""))}</div>'
            f'<div class="slot-label">contained / bearing items</div>'
            f'<ul class="items">{items_html or "<li>(none)</li>"}</ul>'
            f'<div class="falsifier">STAGED — this document describes itself as '
            f'rendered, not decided. A mark changes its status line, never this file '
            f'silently.</div>'
            f'</div>')
    return {"html": body, "svg": svg, "diagram_status": status}


# ------------------------------------------------------------- the one seam

def author_diagram(obj: dict) -> dict:
    """op="author_diagram" on the existing bench.invoke socket. Stubbed
    honestly: an empty-but-valid DSL skeleton, never a fabricated read.
    When the engine wires, this is the one call that starts returning a
    real semantic diagram — nothing above it changes."""
    r = bench.invoke("author_diagram", {"obj_id": obj.get("id"),
                                        "intent": obj.get("bench", {}).get("intent")
                                        or obj.get("intent", "")})
    return r


# ------------------------------------------------------------- the full pass

def compose(obj: dict, dsl_text: str = None, dsl_source: str = "") -> dict:
    """The success-test entry point: object (+ optional hand-authored DSL
    text) in, {card, infographic, doc} out, all in the locked register.
    No DSL supplied -> author_diagram() runs (honest stub today); its
    output, being empty, still renders as a flagged missing-diagram slot —
    the stub never gets passed off as a real diagram."""
    dsl = None
    if dsl_text:
        dsl = parse_dsl(dsl_text)
    else:
        stub = author_diagram(obj)
        note = stub.get("output", {}).get("note", "")
        dsl_source = f"author_diagram — {note}" if note else "author_diagram (stub)"
        skeleton = stub.get("output", {}).get("dsl", "")
        parsed = parse_dsl(skeleton) if skeleton else {}
        dsl = parsed if parsed.get("nodes") else None  # empty skeleton -> no diagram to draw
    card = render_card(obj, dsl, dsl_source)
    info = render_infographic(obj, dsl, dsl_source)
    doc = render_doc(obj, dsl, dsl_source)
    # the resolved DSL rides along (present cases only, i.e. validate_dsl
    # found no issues) so a NATIVE surface — nesi_app.py's tkinter window,
    # which carries "no web layer, ever" as ratified law — can draw its own
    # equivalent of the same diagram without re-parsing an SVG string.
    return {"card": card, "infographic": info, "doc": doc,
            "register_css": REGISTER_CSS, "imposition_css": IMPOSITION_CSS,
            "diagram_status": card["diagram_status"],
            "dsl": dsl if card["diagram_status"] == "present" else None}


if __name__ == "__main__":
    import json
    staged_path = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    dsl_path = Path(sys.argv[2]) if len(sys.argv) > 2 else None
    if staged_path is None:
        print("usage: composer.py <staged_object.json> [diagram.dsl.yaml]")
        sys.exit(1)
    obj = json.loads(staged_path.read_text(encoding="utf-8"))
    dsl_text = dsl_path.read_text(encoding="utf-8") if dsl_path else None
    out = compose(obj, dsl_text, str(dsl_path.name) if dsl_path else "")
    print(json.dumps({"diagram_status": out["diagram_status"],
                      "card_bytes": len(out["card"]["html"]),
                      "infographic_svg_bytes": len(out["infographic"]["svg"] or ""),
                      "doc_bytes": len(out["doc"]["html"])}, indent=1))
