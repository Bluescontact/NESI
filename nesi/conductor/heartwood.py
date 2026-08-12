#!/usr/bin/env python3
"""THE HEARTWOOD — the accreted self, rendered as a growing form.

MARKED GO by Kevin 2026-07-24. A NESI organ. Renders crossed canon as an
accreting visual form (growth rings + leaves), DERIVED LIVE from patterns/ and
MARKS_LOG.jsonl. It stores nothing (the output HTML is a render, not a ledger)
and it NEVER SCORES — no number about Kevin, no grade, no verdict, no progress
bar. It renders his marks as form; the reading is his.

Hard laws honored:
  · never scored  — there is no metric about the person anywhere in the output.
  · derive-not-store — reads patterns/ + MARKS_LOG at render time; keeps no state.
  · engine-dark   — stdlib only, deterministic, no engine call, no web, no deps.
  · read-only     — opens patterns/ and MARKS_LOG for READ; writes only its own
                    render file. Never touches _compost/, never marks, never crosses.

Run:  python nesi/conductor/heartwood.py           (writes nesi/heartwood.html)
      python nesi/conductor/heartwood.py --stdout  (prints the SVG to stdout)
"""
from __future__ import annotations
import json, math, sys, re
from pathlib import Path
from datetime import datetime, timezone

DSS = Path(__file__).resolve().parents[2]          # ...\DSS content
PATTERNS = DSS / "patterns"
MARKS = DSS / "MARKS_LOG.jsonl"
OUT = DSS / "nesi" / "heartwood.html"

# a cross/promotion mark is one whose text names a crossing into canon.
CROSS_RE = re.compile(r"\b(crossed|promote|membrane crossing|cross to canon)\b", re.I)


def _title(md: Path) -> str:
    """First H1 of a pattern file, else the slug."""
    try:
        for line in md.read_text(encoding="utf-8", errors="replace").splitlines():
            s = line.strip()
            if s.startswith("# "):
                return s[2:].strip()
    except Exception:
        pass
    return md.stem.replace("_", " ")


def gather():
    """DERIVE, do not store. Returns (patterns, crossings) read live from disk."""
    patterns = sorted(
        ({"slug": p.stem, "title": _title(p)} for p in PATTERNS.glob("*.md")),
        key=lambda d: d["slug"],
    ) if PATTERNS.is_dir() else []

    crossings = []
    if MARKS.exists():
        for raw in MARKS.read_text(encoding="utf-8", errors="replace").splitlines():
            raw = raw.strip()
            if not raw:
                continue
            try:
                e = json.loads(raw)
            except Exception:
                continue
            mark = str(e.get("mark", ""))
            if CROSS_RE.search(mark):
                ts = str(e.get("ts", ""))[:10] or "unknown"
                crossings.append({"ts": ts, "mark": mark})
    crossings.sort(key=lambda c: c["ts"])
    return patterns, crossings


def rings_by_month(crossings):
    """Growth rings = months in which a crossing happened. One ring per active
    month, in order. This is a SHAPE of the play, never a count-as-judgment."""
    months = []
    for c in crossings:
        m = c["ts"][:7]
        if m and (not months or months[-1] != m):
            if m not in months:
                months.append(m)
    return months


def render_svg(patterns, crossings) -> str:
    n_can = len(patterns)
    months = rings_by_month(crossings)
    W = H = 640
    cx, cy = W / 2, H / 2 + 6
    core = 34
    gap = max(16, (min(W, H) / 2 - core - 60) / max(len(months), 1))

    parts = [
        f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" '
        f'role="img" aria-label="The heartwood: crossed canon rendered as growth rings and leaves. '
        f'{n_can} standing patterns, {len(crossings)} recorded crossings across {len(months)} active months.">',
        f'<rect x="0" y="0" width="{W}" height="{H}" fill="#f7f5f0"/>',
    ]

    # growth rings — one per active month, oldest innermost
    for i, m in enumerate(months):
        r = core + gap * (i + 1)
        parts.append(
            f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="none" '
            f'stroke="#c9bf9e" stroke-width="1.5" opacity="{0.4 + 0.5*(i+1)/len(months):.2f}"/>'
        )
        parts.append(
            f'<text x="{cx:.1f}" y="{cy - r + 3:.1f}" text-anchor="middle" '
            f'font-family="Courier New, monospace" font-size="8" fill="#a89870">{m}</text>'
        )

    # heartwood core
    parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{core:.1f}" fill="#7a6840"/>')
    parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{core-8:.1f}" fill="#3a3020"/>')

    # leaves — each standing pattern a mark on the outermost reach; placed
    # deterministically by index (no randomness — engine-dark & reproducible).
    outer = core + gap * (len(months) + 0.6) if months else core + 46
    for i in range(n_can):
        ang = 2 * math.pi * i / max(n_can, 1) - math.pi / 2
        lx = cx + outer * math.cos(ang)
        ly = cy + outer * math.sin(ang)
        parts.append(
            f'<circle cx="{lx:.1f}" cy="{ly:.1f}" r="3" fill="#2a6a1a" opacity="0.75"/>'
        )

    parts.append("</svg>")
    return "".join(parts)


def render_html(patterns, crossings) -> str:
    svg = render_svg(patterns, crossings)
    n_can = len(patterns)
    months = rings_by_month(crossings)
    last = crossings[-1]["mark"] if crossings else "—"
    if len(last) > 88:
        last = last[:88] + "…"
    # NOTE: the lines below are DESCRIPTIVE of the form, never a score of Kevin.
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>THE HEARTWOOD</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#f7f5f0;color:#3a3020;font-family:'Courier New',monospace;font-size:12px;padding:20px}}
.wrap{{max-width:680px;margin:0 auto}}
.eye{{font-size:8px;letter-spacing:3px;color:#a89870;margin-bottom:4px}}
.name{{font-size:18px;font-weight:bold;color:#1a1408;letter-spacing:2px;margin-bottom:10px}}
.fig{{border:1px solid #ccc5b0;background:#f7f5f0}}
.legend{{font-size:10px;color:#7a6840;line-height:1.7;margin-top:12px;border-top:1px solid #ccc5b0;padding-top:10px}}
.legend b{{color:#1a1408;font-weight:bold}}
.foot{{font-size:8px;color:#a89870;letter-spacing:1px;margin-top:10px}}
</style></head><body><div class="wrap">
<div class="eye">DSS · RECOGNITION INFRASTRUCTURE</div>
<div class="name">THE HEARTWOOD</div>
<div class="fig">{svg}</div>
<div class="legend">
<b>rings</b> — each is a month a crossing happened, oldest at the core ({len(months)} active).<br>
<b>leaves</b> — each is one standing pattern in canon ({n_can}).<br>
<b>core</b> — the heartwood: what has hardened and stays.<br>
last crossing: {last}
</div>
<div class="foot">derived live · stored nowhere · not a score — the shape of the play, the reading is yours</div>
</div></body></html>"""


def draw_on_canvas(canvas, cx, cy, radius=110, patterns=None, crossings=None):
    """Draw the heartwood natively onto a tkinter Canvas (stdlib, no SVG, no deps).

    For the in-window wire (THE HEARTWOOD into the live board). Read-only:
    derives from disk each call, draws rings + core + leaves, returns a one-line
    caption string for the caller to place. NEVER scores — draws marks as form.
    Colours match the house register (parchment field, earth ink, canon green).
    """
    if patterns is None or crossings is None:
        patterns, crossings = gather()
    months = rings_by_month(crossings)
    n_can = len(patterns)
    canvas.delete("heartwood")
    core = 20
    span = max(radius - core - 8, 12)
    step = span / max(len(months), 1)
    # growth rings — one per active month, oldest innermost
    for i, _m in enumerate(months):
        r = core + step * (i + 1)
        canvas.create_oval(cx - r, cy - r, cx + r, cy + r,
                           outline="#c9bf9e", width=1, tags="heartwood")
    # heartwood core
    canvas.create_oval(cx - core, cy - core, cx + core, cy + core,
                       fill="#7a6840", outline="", tags="heartwood")
    canvas.create_oval(cx - core + 6, cy - core + 6, cx + core - 6, cy + core - 6,
                       fill="#3a3020", outline="", tags="heartwood")
    # leaves — each standing pattern a mark on the outer reach (deterministic)
    outer = core + step * (len(months) + 0.6) if months else core + 30
    for i in range(n_can):
        ang = 2 * math.pi * i / max(n_can, 1) - math.pi / 2
        lx = cx + outer * math.cos(ang)
        ly = cy + outer * math.sin(ang)
        canvas.create_oval(lx - 2, ly - 2, lx + 2, ly + 2,
                           fill="#2a6a1a", outline="", tags="heartwood")
    return (f"{n_can} standing · {len(crossings)} crossings · {len(months)} rings"
            f" — the shape of the play, not a score")


def main():
    patterns, crossings = gather()
    html = render_html(patterns, crossings)
    if "--stdout" in sys.argv:
        sys.stdout.write(render_svg(patterns, crossings) + "\n")
        return
    OUT.write_text(html, encoding="utf-8")
    print(f"[heartwood] rendered {len(patterns)} standing patterns · "
          f"{len(crossings)} crossings · {len(rings_by_month(crossings))} rings -> {OUT}")


if __name__ == "__main__":
    main()
