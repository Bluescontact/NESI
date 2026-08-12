#!/usr/bin/env python3
"""
THE BOUNDARY — the one memory that is only NESI's.

Nothing else in the system remembers where Kevin ENDS. Canon remembers the world;
marks remember decisions; the metabolizer remembers piles. This organ remembers
the EDGES — negotiated once, with himself, and then held — so they are already
there when someone arrives, and he never carries them in his head or re-decides
them under pressure. This is the synthetic boundary; this is what makes NESI his.

It is the held-refusal doctrine made into a LIVING MEMORY, not a document:
  · the edges are entered by Kevin, never authored by NESI (the vessel starts EMPTY;
    NESI never fills it for him — that would be the ventriloquized-no failure).
  · edges do not move under pressure — nothing here changes an edge except an
    explicit, unprompted call from Kevin.
  · revisions are versioned in the open — a withdrawn or revised edge is kept in the
    log, never erased (a boundary that quietly rewrites its past can't be trusted).
  · no scoring, no judging, ever.

Store: nesi/boundary/log.jsonl (append-only; the live boundary is DERIVED from it).
Stdlib only. Frozen-aware.

Use it (this is a real tool, usable now):
    python boundary.py add "I don't do solo weed-pulling — it builds resentment faster than it clears ground"
    python boundary.py add "one meal is one meal — it never means I'm a meal source" --kind "what one yes never implies"
    python boundary.py show
    python boundary.py withdraw <id>
    python boundary.py render        # writes nesi/boundary/my_boundary.html to hold up
"""
import json
import sys
import uuid
from html import escape as _esc
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

BDIR = NESI / "boundary"
LOG = BDIR / "log.jsonl"
PAGE = BDIR / "my_boundary.html"

# the doctrine's real fields — offered as gentle kinds, never required
KINDS = [
    "what I don't offer",
    "what one yes never implies",
    "what contact costs me",
    "where no negotiation happens",
    "what receiving from me never obligates",
    "how stopping affects the relationship",
]


def _now():
    # no ambient clock in frozen builds; use a plain stamp when unfrozen
    from datetime import datetime
    return datetime.now().isoformat(timespec="seconds")


def _events():
    out = []
    if LOG.exists():
        for line in LOG.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line:
                try:
                    out.append(json.loads(line))
                except Exception:
                    pass
    return out


def _append(entry):
    BDIR.mkdir(parents=True, exist_ok=True)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


REGISTERS = ("boundary", "need", "want", "capacity", "lack", "offer", "library",
             "opening", "load", "ask", "schedule")
# TWO axes, six registers, each with its own rule:
#
# INWARD — who I am (slow, stable):
#   boundary — a NO that does not move (where I end). non-convertible.
#   need     — what I REQUIRE (what has to be true for me to be well / to say yes).
#   want     — what I'm DRAWN to (movable, no obligation).
#
# OUTWARD — what's available from me (offers change fast — §12 two-map):
#   offer    — what's available NOW. each one must say WHICH it is (kind = terms):
#                gift (nothing owed) · exchange (something for something, bounded) ·
#                transaction (a price). never blended (§13, the three instruments).
#   library  — what I make available to read or take (my own material).
#   opening  — where I'm open to build something WITH someone (a collaborative door).
#
# collapsing any of these is the failure Kevin named: a want filed as a boundary goes
# rigid; a boundary filed as a want goes convertible; a transaction dressed as a gift
# borrows a gift's cover.

# the three terms an offer must declare (§13 — mandatory, never defaulted-to-gift)
OFFER_TERMS = ("gift", "exchange", "transaction")

# TWO MORE registers, added 2026-07-26 on Kevin's mark — the outward half. The six
# above say who I am and what's available; these two say what the situation COSTS
# and what I'm actually asking. Without them a relationship has to be escalated into
# a load-bearing structure just to get a straight question asked.
#
#   load — what I'm carrying right now. Named in its OWN UNITS, never priced
#          (three days of my hands and ground I don't own is a cost;
#           "level 4 effort" is a price). This is the half quiet-giving suppresses,
#          and suppressing it is what makes both parties conclude they're the
#          net carrier — patterns/symmetrical_blindness_from_asymmetrical_visibility.md
#   ask  — what I need from outside. kind = what it RESTS ON (its dependencies), so
#          the ask can't present itself as smaller than it is.
#
# Neither ever totals. A count is a rank, and a rank is the thing the recognition
# law forbids.
#
# THREE MORE, added 2026-07-26 on Kevin's second mark — the honest inventory. His
# words: "where can kevin set down his wants, needs, capacities, lacks, exchanges,
# offers, library, boundaries, and scheduling."
#
#   capacity — what I am ABLE to do. Not an offer and not a promise: a fact about me
#              that is true whether or not anyone ever asks. (exchanges are not a
#              register — an exchange is an offer whose declared terms say so.)
#   lack     — what I DON'T have. Named plainly, with no claim attached. A lack is
#              not an ask. This is the register that lets a situation be legible
#              without anything being requested — the whole point.
#   schedule — time, duration, windows. When I'm here, when I go, what's open. The
#              register that makes an ask BOUNDED, because "a duration named out
#              loud" is the difference between a request and an open-ended draw.
#
# THE LOAD-BEARING REASON THIS IS A STANDING PLACE AND NOT A MESSAGE (Kevin's mark,
# 2026-07-26): "illegibility in transaction is his strength, but his offers and
# requests are still attached to trying to recalibrate informal relationships."
# An offer composed AT someone is a move in that relationship — it carries a
# recalibration function whether or not either party wants it to. An offer that was
# already standing here before they arrived is just a fact about him. The store is
# filled facing NOBODY; a shared map is a VIEW of it, addressed after the fact.
# That ordering is what strips the recalibration out of the offer. Keep it.


def add(edge, *, register="boundary", kind=None, now_iso=None, write=True):
    """Kevin adds an entry to one of the three registers. First-person; NESI never
    invents one. `register` = boundary | need | want (defaults to boundary)."""
    edge = (edge or "").strip()
    if not edge:
        raise ValueError("this needs words — NESI won't write it for you")
    reg = (register or "boundary").strip().lower()
    if reg not in REGISTERS:
        reg = "boundary"
    entry = {"id": uuid.uuid4().hex[:8], "event": "added", "register": reg, "edge": edge,
             "kind": (kind or "").strip() or None, "at": now_iso or _now()}
    if write:
        _append(entry)
    return entry


def withdraw(edge_id, *, now_iso=None, write=True):
    """Withdraw an edge — a boundary can change, but only when Kevin says so, and
    the old edge stays in the log (versioned in the open, never erased)."""
    entry = {"id": uuid.uuid4().hex[:8], "event": "withdrawn",
             "ref": str(edge_id), "at": now_iso or _now()}
    if write:
        _append(entry)
    return entry


def revise(edge_id, new_edge, *, kind=None, now_iso=None, write=True):
    """Replace an edge with a new one — withdraw the old (kept in history) and add
    the new, linked. Revisions are unprompted and versioned in the open."""
    withdraw(edge_id, now_iso=now_iso, write=write)
    e = add(new_edge, kind=kind, now_iso=now_iso, write=write)
    e["revises"] = str(edge_id)
    if write:
        # re-append with the link (the add already wrote the plain one; add a link note)
        _append({"id": uuid.uuid4().hex[:8], "event": "revises",
                 "new": e["id"], "old": str(edge_id), "at": now_iso or _now()})
    return e


def edges(register=None, events=None):
    """The LIVE self-map — derived from the log. Active = added and not later
    withdrawn/revised. Pass a register (boundary|need|want) to filter, or None for
    all (each entry carries its register). Order = first held."""
    evs = _events() if events is None else events
    gone = set()
    for e in evs:
        if e.get("event") in ("withdrawn", "revises"):
            gone.add(str(e.get("ref") or e.get("old")))
    live = []
    for e in evs:
        if e.get("event") == "added" and e["id"] not in gone:
            live.append({"id": e["id"], "register": e.get("register", "boundary"),
                         "edge": e["edge"], "kind": e.get("kind"), "at": e.get("at")})
    if register:
        live = [e for e in live if e["register"] == register]
    return live


_SECTIONS = [
    # register, title, law, group
    ("boundary", "Where I end", "these do not move — a no is not a negotiation", "who i am"),
    ("need", "What I require", "what has to be true for me to be well, or to say yes", "who i am"),
    ("want", "What I'm drawn to", "movable · no obligation · mine to pursue or not", "who i am"),
    ("capacity", "What I'm able to do", "a fact about me — true whether or not anyone asks · not a promise", "what I have and don't"),
    ("lack", "What I don't have", "named plainly, no claim attached · a lack is not an ask", "what I have and don't"),
    ("library", "My library", "what I make available to read or take", "what I have and don't"),
    ("offer", "What's available", "each says which it is — gift (nothing owed) · exchange (bounded) · transaction (a price)", "what's available from me"),
    ("opening", "Open to build together", "where I'm open to make something with someone", "what's available from me"),
    ("load", "What I'm carrying", "named in its own units — a cost, never a price · this is not a bill", "where I'm at right now"),
    ("schedule", "Time and duration", "when I'm here, when I go, what's open — a named duration is what makes an ask bounded", "where I'm at right now"),
    ("ask", "What I'm asking", "each one says what it rests on — an ask can't be smaller than its own footprint", "where I'm at right now"),
]


def _section_html(reg, title, law, live):
    items = [e for e in live if e["register"] == reg]
    if items:
        body = "".join(
            ('<div class="entry">'
             + (f'<div class="k">{_esc(e["kind"])}</div>' if e.get("kind") else "")
             + f'<div class="t">{_esc(e["edge"])}</div></div>')
            for e in items)
    else:
        body = '<div class="empty">nothing held here yet — yours to fill</div>'
    return (f'<div class="reg"><div class="reg-h">{_esc(title)}</div>'
            f'<div class="reg-law">{_esc(law)}</div>{body}</div>')


def render(events=None, write=True):
    """Write the readable self-map page — Kevin's six registers across two axes
    (who I am · what's available from me), to hold up when he invites someone in.
    Empty until he fills it (never authored by NESI)."""
    live = edges(events=events)
    sections = ""
    last_group = None
    for (r, t, l, grp) in _SECTIONS:
        if grp != last_group:
            sections += f'<div class="grp">{_esc(grp)}</div>'
            last_group = grp
        sections += _section_html(r, t, l, live)
    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Who I am to you</title><style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#f7f5f0;color:#3a3020;font-family:Georgia,serif;padding:40px 22px;display:flex;justify-content:center}}
.page{{max-width:600px;width:100%}}
.eye{{font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#a89870;text-transform:uppercase;margin-bottom:8px}}
h1{{font-size:24px;font-weight:normal;color:#1a1408;margin-bottom:4px}}
.sub{{font-size:13px;color:#7a6840;font-style:italic;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #ccc5b0}}
.grp{{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:#7a6840;text-transform:uppercase;margin:8px 0 16px;padding-bottom:4px;border-bottom:1px solid #e2ddce}}
.reg{{margin-bottom:26px}}
.reg-h{{font-size:19px;color:#1a1408;margin-bottom:2px}}
.reg-law{{font-family:'Courier New',monospace;font-size:10px;letter-spacing:1px;color:#a89870;text-transform:uppercase;margin-bottom:10px}}
.entry{{padding:11px 0;border-bottom:1px solid #e2ddce}}
.k{{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:#a89870;text-transform:uppercase;margin-bottom:3px}}
.t{{font-size:16px;color:#1a1408;line-height:1.5}}
.empty{{font-size:13px;color:#a89870;font-style:italic;padding:8px 0}}
.foot{{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:#a89870;margin-top:20px;padding-top:14px;border-top:1px solid #ccc5b0;line-height:1.8}}
</style></head><body><div class="page">
<div class="eye">NESI · what it remembers of me</div>
<h1>Who I am to you</h1>
<div class="sub">Three different things, kept apart. My boundary does not move; my needs must be met; my wants are mine to pursue. Negotiated once, with myself — so they're already here when you arrive.</div>
{sections}
<div class="foot">boundary = a no that doesn't move · need = a requirement · want = movable · nothing here keeps a score · only I fill it</div>
</div></body></html>"""
    if write:
        BDIR.mkdir(parents=True, exist_ok=True)
        PAGE.write_text(html, encoding="utf-8")
    return len(live)


def _cli(argv):
    if not argv or argv[0] in ("show", "list"):
        live = edges()
        if not live:
            print("empty. add your first entry:\n"
                  '  python boundary.py add "…" [--as boundary|need|want]')
            return 0
        for reg, title, _law, _grp in _SECTIONS:
            items = [e for e in live if e["register"] == reg]
            if not items:
                continue
            print(f"\n{title.upper()} ({reg}) — {len(items)}:")
            for e in items:
                tag = f"[{e['kind']}] " if e.get("kind") else ""
                print(f"  · {tag}{e['edge']}   ({e['id']})")
        return 0
    cmd = argv[0]
    if cmd == "add":
        kind = None
        register = "boundary"
        for flag in ("--kind", "--as", "--register"):
            if flag in argv:
                i = argv.index(flag); val = argv[i + 1] if i + 1 < len(argv) else None
                if flag == "--kind":
                    kind = val
                else:
                    register = (val or "boundary")
                argv = argv[:i] + argv[i + 2:]
        text = " ".join(argv[1:]).strip()
        e = add(text, register=register, kind=kind)
        render()
        print(f"held as {e['register']}: {e['edge']}  ({e['id']})")
        return 0
    if cmd == "withdraw":
        withdraw(argv[1]); render(); print(f"withdrawn: {argv[1]} (kept in history)"); return 0
    if cmd == "render":
        n = render(); print(f"wrote {PAGE} ({n} edge(s))"); return 0
    print("usage: add \"…\" [--kind \"…\"] | show | withdraw <id> | render")
    return 1


def _selftest():
    now = "2026-07-25T00:00:00"
    p = f = 0
    def ck(n, c):
        nonlocal p, f
        (globals().__setitem__('_', None))
        if c: p += 1; print(f"  PASS  {n}")
        else: f += 1; print(f"  FAIL  {n}")
    evs = []
    evs.append(add("I don't do solo weed-pulling", now_iso=now, write=False))
    evs.append(add("one meal never means I'm a meal source", kind="what one yes never implies", now_iso=now, write=False))
    ck("edges derived from log (2 held)", len(edges(events=evs)) == 2)
    ck("NESI refuses to author an empty edge", _refuses_empty())
    w = withdraw(evs[0]["id"], now_iso=now, write=False); evs.append(w)
    ck("withdraw removes from live boundary", len(edges(events=evs)) == 1)
    ck("withdrawn edge kept in log/history (not erased)", any(e.get("event") == "withdrawn" for e in evs))
    ck("no score/judge field on an edge", not any(k in evs[0] for k in ("score", "rank", "worth")))
    print(f"\nRESULT: {p} passed, {f} failed")
    return 0 if f == 0 else 1


def _refuses_empty():
    try:
        add("   ", write=False); return False
    except ValueError:
        return True


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--selftest":
        sys.exit(_selftest())
    sys.exit(_cli(sys.argv[1:]))
