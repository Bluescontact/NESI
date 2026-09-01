"""The field, rendered as a tree you can edit.

The keeper's naming, 2026-08-06: "The decisions create a field... i should be able to see
and edit every descision in a tree and field. The relationships are the naming that
underlies the process in the world of unnamed words."

THAT LAST SENTENCE CHANGED WHAT AN EDGE IS. An edge was going to be metadata — A
blocks B. It is not. Naming the relation IS the act of naming a process that has no
word yet. "waits on", "is the body of", "feeds", "holds" — the relation carries what
neither endpoint can carry alone. So an edge is {to, rel}, and `rel` is free text
The keeper writes. There is deliberately NO vocabulary offered by the machine: a menu of
relation words would be the machine pre-naming the thing this exists to let him name.

EDIT, UNDER THE COPY LAW. The page is a sandboxed iframe and cannot reach disk, and
that constraint is doing real work — a surface that wrote would be a surface that
acts. Editing here means STAGING: every relation drawn and every answer chosen
accumulates into real commands he copies and runs. He sees and decides on the
surface; the ledger is still only ever written by his own hand.

NO RANKING SURVIVES INTO THE TREE. The tree is built from declared edges only, and
roots keep ledger order. An item with no declared relation is not "unimportant" — it
sits in THE UNRELATED, which is an honest statement that almost nothing has been
named yet, rather than a judgment about what matters.
"""
from __future__ import annotations

import html
import json
from datetime import datetime


def esc(s) -> str:
    return html.escape(str(s or ""))


def attr(value) -> str:
    """A JS argument safe to sit inside a double-quoted HTML attribute.

    Found by clicking the page rather than reading it: json.dumps returns a
    double-quoted string, and dropping that straight into onclick="pick(...)"
    terminated the attribute at the first inner quote, so every handler on the page
    was the dead fragment `pick(`. Escaping the quotes is the whole fix, and the
    lesson is the Definition of Done's second rule — reading the code is not running
    it.
    """
    return html.escape(json.dumps(value), quote=True)


def edge_parts(e):
    """An edge is either a bare id (older form, relation 'blocks') or {to, rel}.

    Both shapes are permanent — the ledgers are append-only, so the bare form written
    before 2026-08-06 can never be migrated away. Readers take them as they are.
    """
    if isinstance(e, dict):
        return str(e.get("to", "")), str(e.get("rel") or "blocks")
    return str(e), "blocks"


def build_tree(items):
    """Roots, children, and the unrelated — from DECLARED edges only."""
    by_key = {it["key"]: it for it in items}
    kids: dict[str, list] = {}
    pointed: set[str] = set()
    for it in items:
        for e in it.get("blocks") or []:
            to, rel = edge_parts(e)
            if to in by_key:
                kids.setdefault(it["key"], []).append((to, rel))
                pointed.add(to)
    related = set(kids) | pointed
    roots = [it for it in items if it["key"] in kids and it["key"] not in pointed]
    unrelated = [it for it in items if it["key"] not in related]
    return by_key, kids, roots, unrelated


def age_text(ts: str) -> str:
    for cut in (19, 16, 10):
        try:
            d = (datetime.now() - datetime.fromisoformat(str(ts)[:cut])).days
            return "today" if d == 0 else f"{d}d"
        except (ValueError, TypeError):
            continue
    return "—"


SRC = {"MARKS_LOG": "mark", "OPEN_GATES": "gate",
       "DECISIONS_OFFERED": "dec", "container_check": "cont"}


def item_html(it, rel=None) -> str:
    opts = ""
    if it.get("opts"):
        opts = " ".join(
            '<span class="opt" onclick="answer(' + attr(it["key"]) + ','
            + attr(o) + ',event)">' + esc(o) + '</span>' for o in it["opts"])
    relword = '<span class="relword">' + esc(rel) + '</span>' if rel else ""
    optbox = '<div class="it-rel">' + opts + '</div>' if opts else ""
    return ('<div class="it" data-k="' + esc(it["key"]) + '" '
            'onclick="pick(' + attr(it["key"]) + ',event)">'
            '<span class="it-age">' + esc(age_text(it.get("ts", ""))) + '</span>'
            '<span class="it-src">' + esc(SRC.get(it["ledger"], "?")) + '</span>'
            '<span class="it-tx">' + relword + esc(str(it.get("text", ""))[:260])
            + optbox + '</span></div>')


def render_tree(items) -> str:
    by_key, kids, roots, unrelated = build_tree(items)
    if not kids:
        return ('<div class="grp"><div class="grp-hd">nothing has been named yet</div>'
                '<p style="font-size:10px;color:#7a6840;padding:8px 0">No relation has been '
                'declared, so there is no tree — an honest blank, not an empty graph. '
                'Nothing here infers an edge from text. Open the FIELD tab, click one thing '
                'and then another, and write what holds between them; the tree grows from '
                'the words you write.</p></div>')

    seen: set[str] = set()

    def branch(key, rel=None, depth=0) -> str:
        if key in seen or depth > 12:
            return ""
        seen.add(key)
        it = by_key.get(key)
        if not it:
            return ""
        out = item_html(it, rel)
        children = kids.get(key) or []
        if children:
            out += '<div class="kids">' + "".join(
                branch(k, r, depth + 1) for k, r in children) + "</div>"
        return out

    parts = ['<div class="grp"><div class="grp-hd">the named — '
             f'{len(roots)} root(s)</div>']
    parts += [branch(r["key"]) for r in roots]
    parts.append("</div>")
    if unrelated:
        parts.append('<div class="grp"><div class="grp-hd">the unrelated — '
                     f'{len(unrelated)}, in ledger order, nothing named between them yet'
                     "</div>")
        parts += [item_html(it) for it in unrelated]
        parts.append("</div>")
    return "".join(parts)


def render_field(items) -> str:
    groups: dict[str, list] = {}
    for it in items:
        groups.setdefault(it["ledger"], []).append(it)
    LABEL = {"MARKS_LOG": "MARKS — caught, not yet acted",
             "OPEN_GATES": "GATES — open",
             "DECISIONS_OFFERED": "DECISIONS — offered, never answered",
             "container_check": "CONTAINERS — unruled, wished, or drifted"}
    out = []
    for name in ("MARKS_LOG", "OPEN_GATES", "DECISIONS_OFFERED", "container_check"):
        rows = groups.get(name) or []
        if not rows:
            continue
        out.append(f'<div class="grp"><div class="grp-hd">{LABEL[name]} — {len(rows)}</div>')
        out += [item_html(it) for it in rows]
        out.append("</div>")
    return "".join(out)
