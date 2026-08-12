#!/usr/bin/env python3
"""
THE SHARED MAP — where I'm at, made legible to one other person.

The boundary organ holds Kevin's self-map. This is its OUTWARD half: a single page
he can hand to a named person instead of escalating an informal relationship into a
load-bearing structure just to get a straight question asked.

The move it replaces:
    "can I stay another week?"          — an ask with its footprint hidden inside it,
                                          which forces the other person to guess the
                                          load and forces Kevin to perform the ask.
The move it makes possible:
    "here's a map of where I'm at.      — the load named in its own units, the freely
     this is the load. what can be       routable material separated from the part
     routed freely?"                     that actually needs a yes.

Why the load has to be on the page (patterns/symmetrical_blindness_from_asymmetrical_visibility.md):
    each party's own cost is vivid to them and invisible to the other, so BOTH honestly
    conclude they're the net carrier. Neither is lying. It can't be resolved from inside,
    because the missing data is exactly what quiet-giving suppresses. Naming the cost is
    what REMOVES the handle, not what installs it.

The laws this page enforces on its own face:
    · cost is named in its OWN UNITS and stays incommensurable — a cost, never a price.
      The moment costs are stated in common units they become comparable, comparison
      becomes ranking, and there's a market inside the instrument.
    · nothing here TOTALS. No counts, no scores, no ranks (the recognition law).
    · the response side never crosses. What answering would cost the reader is theirs
      to name to themselves, privately, before answering — that private step is where
      the protection against silent depletion actually lives. It never comes back here.
    · a no costs nothing and moves nothing else on the page.
    · it is DEPOSITED, not delivered. A map ordering nothing.
    · it carries a traveling mark — an address, no magnitude (SUBSTRATE_BRIEF_the_marked_gift).

Routing is DERIVED, never stored (one authority: the register + its terms):
    routes freely  — a gift, or anything in the library. Take it or pass it on; nothing owed.
    needs a yes    — an exchange, a transaction, an opening, an ask.
    context        — load, schedule, capacity, lack, boundary, need, want. Nothing to
                     answer. Here so you don't have to guess, and so the situation can
                     be legible without anything being requested.

WHY THIS IS A VIEW AND NOT A MESSAGE (Kevin's mark, 2026-07-26): "illegibility in
transaction is his strength, but his offers and requests are still attached to trying
to recalibrate informal relationships." An offer composed AT someone is a move in that
relationship and carries a recalibration function whether or not either party wants it
to. An offer that was already standing before they arrived is just a fact. So the store
is filled facing NOBODY, and this page is a VIEW of it, addressed afterward. That
ordering is the whole mechanism — it is what strips the recalibration out of the offer.
A capacity, a lack, and a named duration do most of that work: together they make a
situation fully legible while asking for nothing at all.

Stdlib only. Frozen-aware. NESI never authors an entry; the page renders only what
Kevin put in the store.

Use it:
    python sharedmap.py "Michael"          # writes nesi/boundary/maps/for_michael.html
    python sharedmap.py --selftest
"""
import re
import sys
from html import escape as _esc
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(Path(__file__).resolve().parent))
import boundary  # the one store — the map never keeps its own copy

MAPDIR = NESI / "boundary" / "maps"

# routing buckets, derived. (bucket_key, heading, law)
FREE = ("free", "Routes freely",
        "yours to take, use, or pass on — nothing is owed for any of it, "
        "not a reply, not thanks")
YES = ("yes", "Needs a real yes",
       "the only things here that need anything from you · a no costs nothing "
       "and moves nothing else on this page")
CONTEXT = ("context", "Where I'm at",
           "nothing here asks you for anything — it's here so you never have to guess")


def _slug(name):
    s = re.sub(r"[^a-z0-9]+", "_", (name or "").strip().lower()).strip("_")
    return s or "someone"


def route(entry):
    """Which bucket an entry lands in. Derived from register + terms, never stored."""
    reg = entry.get("register", "boundary")
    kind = (entry.get("kind") or "").strip().lower()
    if reg == "library":
        return "free"
    if reg == "offer":
        # §13: an offer must declare its terms. An undeclared offer is NOT assumed
        # to be a gift — defaulting to gift is exactly how a transaction borrows a
        # gift's cover. Undeclared falls to the side that needs a real yes.
        return "free" if kind == "gift" else "yes"
    if reg in ("opening", "ask"):
        return "yes"
    return "context"


# context ordering — load first. The load is the thing the whole page exists to make
# visible; putting it under the boundary would bury it.
_CONTEXT_ORDER = [
    ("load", "What I'm carrying right now",
     "named in its own units — a cost, never a price. this is not a bill."),
    ("schedule", "Time and duration",
     "when I'm here, when I go, what's open"),
    ("capacity", "What I'm able to do",
     "true whether or not you ask — not a promise, not an offer"),
    ("lack", "What I don't have",
     "named plainly, no claim attached — a lack is not an ask"),
    ("boundary", "Where I end",
     "these don't move, and they aren't aimed at you — they were settled before you arrived"),
    ("need", "What I require",
     "what has to be true for me to be well, or to say yes"),
    ("want", "What I'm drawn to",
     "movable · no obligation · mine to pursue or not"),
]
_FREE_ORDER = [
    ("offer", "Available from me — a gift", "nothing owed"),
    ("library", "Take or pass on", "my own material, yours to have"),
]
_YES_ORDER = [
    ("ask", "What I'm asking", "each says what it rests on"),
    ("offer", "An exchange, or a price", "bounded, and it says which it is"),
    ("opening", "Open to build together", "a door, not a request"),
]


def _entries(live, reg, bucket):
    return [e for e in live if e["register"] == reg and route(e) == bucket]


def _block(title, law, items):
    rows = "".join(
        '<div class="e">'
        + (f'<div class="k">{_esc(e["kind"])}</div>' if e.get("kind") else "")
        + f'<div class="t">{_esc(e["edge"])}</div></div>'
        for e in items)
    return (f'<div class="blk"><div class="bh">{_esc(title)}</div>'
            f'<div class="bl">{_esc(law)}</div>{rows}</div>')


def _section(key, heading, law, order, live):
    blocks = ""
    for reg, title, sublaw in order:
        items = _entries(live, reg, key)
        if items:
            blocks += _block(title, sublaw, items)
    if not blocks:
        return ""
    return (f'<section class="sec sec-{key}"><h2>{_esc(heading)}</h2>'
            f'<div class="seclaw">{_esc(law)}</div>{blocks}</section>')


CSS = """
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#f7f5f0;color:#3a3020;font-family:Georgia,'Times New Roman',serif;
 display:flex;justify-content:center;padding:44px 20px 80px;line-height:1.5}
.page{width:100%;max-width:620px}
.eye{font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#a89870;
 text-transform:uppercase;margin-bottom:10px}
h1{font-size:28px;font-weight:normal;color:#1a1408;margin-bottom:6px;line-height:1.2}
.sub{font-size:14px;color:#7a6840;font-style:italic;line-height:1.6;margin-bottom:30px;
 padding-bottom:20px;border-bottom:1px solid #ccc5b0}
.sec{margin-bottom:36px}
h2{font-size:20px;font-weight:normal;color:#1a1408;margin-bottom:3px}
.seclaw{font-family:'Courier New',monospace;font-size:10px;letter-spacing:1px;color:#a89870;
 text-transform:uppercase;margin-bottom:18px;line-height:1.7}
.sec-yes h2{color:#3a3020}
.sec-yes{border-left:2px solid #ccc5b0;padding-left:18px}
.blk{margin-bottom:20px}
.bh{font-size:15px;color:#3a3020;margin-bottom:2px}
.bl{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:#a89870;
 text-transform:uppercase;margin-bottom:8px}
.e{padding:11px 0;border-bottom:1px solid #e2ddce}
.k{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:#7a6840;
 text-transform:uppercase;margin-bottom:3px}
.t{font-size:16.5px;color:#1a1408;line-height:1.55}
.q{background:#eeebe3;border:1px solid #ccc5b0;padding:22px 24px;margin:38px 0 26px}
.qh{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:#7a6840;
 text-transform:uppercase;margin-bottom:10px}
.qt{font-size:19px;color:#1a1408;line-height:1.45}
.qn{font-size:13.5px;color:#7a6840;font-style:italic;margin-top:14px;padding-top:14px;
 border-top:1px solid #ccc5b0;line-height:1.65}
.empty{font-size:14px;color:#a89870;font-style:italic;padding:20px 0}
.mark{font-size:15px;color:#3a3020;margin-top:34px;padding-top:18px;border-top:1px solid #ccc5b0}
.foot{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:#a89870;
 margin-top:16px;line-height:2}
"""


def render_for(person, events=None, write=True, dated=None, signed="Kevin"):
    """Build the page for one named person. Returns (path_or_None, html, counts)."""
    live = boundary.edges(events=events)
    who = (person or "").strip() or "you"

    body = _section(*CONTEXT, _CONTEXT_ORDER, live)
    body += _section(*FREE, _FREE_ORDER, live)
    body += _section(*YES, _YES_ORDER, live)

    if not body:
        body = ('<div class="empty">Nothing is held in the map yet. It fills only from '
                'what you put in it — open the boundary page and add what you\'re '
                'carrying, where you end, and what you\'re asking.</div>')

    counts = {}
    for e in live:
        counts[route(e)] = counts.get(route(e), 0) + 1

    stamp = f'<div class="mark">— {_esc(signed)}{", " + _esc(dated) if dated else ""}</div>'

    html = (
        '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<title>Where I\'m at — a map for {_esc(who)}</title><style>{CSS}</style></head>'
        '<body><div class="page">'
        '<div class="eye">a map · not an ask</div>'
        f'<h1>Where I\'m at — for {_esc(who)}</h1>'
        '<div class="sub">This is a map, not a request. None of it was written for you — '
        'it was already here, and this is just the view. I\'d rather hand you the whole '
        'picture than turn something informal between us into a structure just to get one '
        'straight question asked. Nothing here needs an answer today, and most of it needs '
        'no answer ever.</div>'
        + body +
        '<div class="q"><div class="qh">the only question</div>'
        '<div class="qt">This is the load. What of it can be routed freely — and what '
        'actually needs a yes from you?</div>'
        '<div class="qn">Before you answer any of it: name what answering would cost '
        '<em>you</em>, to yourself. That side is yours. It never comes back to me, and I '
        'never see it — which is the point. Almost nobody is depleted by being asked too '
        'much; they\'re depleted by answering before naming what answering costs.</div>'
        '</div>'
        + stamp +
        '<div class="foot">nothing on this page totals · no score, no rank, no running '
        'account · a cost is named in its own units, never a price · a no moves nothing '
        'else here · this map goes out of date, and that\'s fine</div>'
        '</div></body></html>')

    path = None
    if write:
        MAPDIR.mkdir(parents=True, exist_ok=True)
        path = MAPDIR / f"for_{_slug(who)}.html"
        path.write_text(html, encoding="utf-8")
    return path, html, counts


def _cli(argv):
    args = [a for a in argv if not a.startswith("--")]
    person = " ".join(args).strip()
    if not person:
        print('usage: python sharedmap.py "<their name>"')
        print("       (renders nesi/boundary/maps/for_<name>.html from your boundary store)")
        return 1
    path, _html, counts = render_for(person)
    total = sum(counts.values())
    if not total:
        print(f"wrote {path}\n"
              "  — but the map is EMPTY. It renders only what you put in the store.\n"
              "  Open nesi/BOUNDARY.bat and add what you're carrying (load), where you\n"
              "  end (boundary), and what you're asking (ask). Then run this again.")
        return 0
    print(f"wrote {path}")
    print(f"  routes freely: {counts.get('free', 0)}   "
          f"needs a yes: {counts.get('yes', 0)}   "
          f"context (nothing to answer): {counts.get('context', 0)}")
    return 0


def _selftest():
    p = f = 0

    def ck(n, c):
        nonlocal p, f
        if c:
            p += 1
            print(f"  PASS  {n}")
        else:
            f += 1
            print(f"  FAIL  {n}")

    now = "2026-07-26T00:00:00"
    evs = [
        boundary.add("three days of my hands, and ground I don't own",
                     register="load", now_iso=now, write=False),
        boundary.add("I don't do solo open-ended field work — it builds resentment "
                     "faster than it clears ground", register="boundary",
                     now_iso=now, write=False),
        boundary.add("a place to park with power, water, and a duration named",
                     register="need", now_iso=now, write=False),
        boundary.add("30-60 min/day of whatever needs doing here",
                     register="offer", kind="gift", now_iso=now, write=False),
        boundary.add("the off-grid permit-pathway map", register="library",
                     now_iso=now, write=False),
        boundary.add("one more week on the ground here", register="ask",
                     kind="rests on: your comfort, your neighbours, water, power, "
                          "and a duration", now_iso=now, write=False),
        boundary.add("solar work, if you want a second pair of hands on it",
                     register="offer", kind="exchange", now_iso=now, write=False),
        boundary.add("here since the 19th · next ground unnamed",
                     register="schedule", now_iso=now, write=False),
        boundary.add("off-grid power, water and permit-pathway work",
                     register="capacity", now_iso=now, write=False),
        boundary.add("no fixed address after this, and no vehicle I'd trust on a long haul",
                     register="lack", now_iso=now, write=False),
    ]

    _path, html, counts = render_for("Michael", events=evs, write=False)

    ck("the load is on the page", "three days of my hands" in html)
    ck("the load leads the context section", html.index("three days of my hands") <
       html.index("solo open-ended field work"))
    ck("a gift routes freely", route(evs[3]) == "free")
    ck("the library routes freely", route(evs[4]) == "free")
    ck("an ask needs a real yes", route(evs[5]) == "yes")
    ck("an exchange needs a real yes (never assumed a gift)", route(evs[6]) == "yes")
    ck("an UNDECLARED offer never defaults to gift",
       route({"register": "offer", "kind": None}) == "yes")
    ck("boundary/need/load are context, not an ask",
       all(route(e) == "context" for e in (evs[0], evs[1], evs[2])))
    ck("schedule/capacity/lack are context — legible, requesting nothing",
       all(route(e) == "context" for e in (evs[7], evs[8], evs[9])))
    ck("a lack is on the page without becoming an ask",
       "no vehicle I&#x27;d trust" in html or "no vehicle I'd trust" in html)
    ck("a named duration is on the page (what bounds an ask)",
       "here since the 19th" in html)
    ck("a capacity reads as a fact, not an offer — it never routes as available",
       route(evs[8]) != "free")
    ck("the ask carries what it rests on", "rests on:" in html)
    ck("the routing question is asked", "What of it can be routed freely" in html)
    ck("the response side is named as private and non-returning",
       "It never comes back to me" in html)
    ck("no totals rendered on the page",
       "total" not in html.lower().replace("totals", ""))
    ck("no score/rank/price language on the face",
       not any(w in html.lower() for w in ("score:", "rank:", "$", "points")))
    ck("counts derived for the console only, never printed on the page",
       counts["free"] == 2 and counts["yes"] == 2 and counts["context"] == 6)
    ck("addressed to a named person", "for Michael" in html)
    ck("carries a traveling mark (address, no magnitude)", "— Kevin" in html)
    ck("empty store renders an honest empty page, not an invented one",
       "Nothing is held in the map yet" in render_for("Michael", events=[], write=False)[1])
    ck("NESI authors nothing — page holds only store entries",
       "weedwhack" not in html.lower())

    print(f"\nRESULT: {p} passed, {f} failed")
    return 0 if f == 0 else 1


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        sys.exit(_selftest())
    sys.exit(_cli(sys.argv[1:]))
