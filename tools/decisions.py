"""Decisions ledger — a decision exists before it is rendered, or it does not exist.

Kevin's mark, 2026-08-04: "Fix the widget pipeline: every decision gets written to
MATERIAL or EVENT before it is rendered to a surface, never after. That is what the
SURFACE_SOLE_HOME light is telling us."

The failure this closes, twice logged: five decisions stranded in widget files on
2026-07-30, and eight candidate sentences that existed only in a session transcript
and were gone by the next morning. Both lived in a SURFACE, which the container law
defines as holding nothing. A surface is where a decision is SHOWN. It was never
supposed to be where a decision is KEPT.

DECISIONS_OFFERED.jsonl is an EVENT container: append-only, one record per decision
put in front of Kevin, written BEFORE the surface that shows it.

The ordering is not honour-system. `verify` compares each record's timestamp against
the surface file's mtime: a record written after the file it describes is a breach,
because that is the render-first pattern wearing a ledger as a disguise.

  offer   --surface P --session S --json F   deposit decisions (BEFORE writing P)
  verify  --surface P                         every rendered tile has an earlier record
  open                                        offered, never answered — the real payoff
  status                                      one line

An offer is NOT a mark. It records that a choice was put in front of Kevin, never
that he made one. Marks live in MARKS_LOG.jsonl and only Kevin's hand puts them there.

THE HOLE THIS FILE CARRIED UNTIL 2026-08-05 (L10 of the floor lift):
`offer` used to SKIP any (surface, tile) already on the ledger, and `verify` still
printed PASS. So a surface rewritten in a later turn with a CHANGED decision under
the same tile id got no new record — and the verifier, finding the stale record from
the previous generation, reported clean. A mechanism that reports clean while
skipping is worse than one that fails loudly.

Closed by making the deposit generational, without breaking append-only:

  * Every `offer` batch to a surface opens a new GENERATION: gen = (max gen on the
    ledger for that surface) + 1. Legacy records with no `gen` field count as gen 0.
  * A re-offer of the same tile is RECORDED, never dropped: a fresh line with
    `revision` incremented. Nothing on the ledger is ever rewritten or mutated.
  * Each record also carries `prior_sha` / `prior_mtime` — the surface as it stood at
    deposit time — so verify can tell a fresh deposit from one describing a
    generation of the file that was never written.
  * `verify` reads the LAST record per tile (file order is chronological) and BREACHES
    on any tile whose record is older than the surface's newest generation. That is
    exactly the skip case, and it now exits non-zero.

Consequence for callers: pass the FULL tile set on every offer for a surface, not
just the tiles that changed. A partial re-offer leaves the untouched tiles behind at
an older generation and verify will say so.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# The ledger path is overridable so the fix can be exercised end to end against a
# throwaway file. The real ledger is append-only and is never rewritten by this tool.
LEDGER = Path(os.environ.get("DECISIONS_LEDGER") or (ROOT / "DECISIONS_OFFERED.jsonl"))
MARKS = ROOT / "MARKS_LOG.jsonl"

# The ceiling on how many decisions one surface may ask for. Kevin's batch size is 4
# (feedback_triage_batch_pace); this is that number made mechanical rather than
# quoted. A ceiling, never a target — a surface with one live decision shows one.
MAX_TILES = 4


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def now() -> str:
    return datetime.now().replace(microsecond=0).isoformat()


def surface_state(path: Path) -> tuple[str | None, str | None]:
    """(sha, mtime) of a surface as it stands right now — None/None if absent."""
    if not path.exists():
        return None, None
    sha = hashlib.sha256(path.read_bytes()).hexdigest()[:16]
    mt = datetime.fromtimestamp(path.stat().st_mtime).replace(microsecond=0).isoformat()
    return sha, mt


def read_ledger() -> list[dict]:
    if not LEDGER.exists():
        return []
    out = []
    for line in LEDGER.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line:
            try:
                out.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    return out


def append(records: list[dict]) -> None:
    with LEDGER.open("a", encoding="utf-8") as fh:
        for r in records:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")


def rel(p: str) -> str:
    """Normalise a surface path to repo-relative, forward slashes."""
    path = Path(p)
    if path.is_absolute():
        try:
            path = path.relative_to(ROOT)
        except ValueError:
            pass
    return str(path).replace("\\", "/")


# Match the id only on an actual tile element, never a bare occurrence in the page.
# A widget's own prose can legitimately quote a tile id — this file's law was first
# tested on a surface that explained the verifier inside a <code> block, and the
# looser pattern read the explanation as a tenth tile.
TILE_RE = re.compile(r'<div\s+class="tile[^"]*"\s+id="c-([A-Za-z0-9_]+)"')


def rec_gen(r: dict) -> int:
    """Deposit generation of a record. Records written before 2026-08-05 have no
    `gen` field; they are all generation 0, so a ledger of legacy records is uniform
    and verifies exactly as it did before."""
    try:
        return int(r.get("gen") or 0)
    except (TypeError, ValueError):
        return 0


def tiles_in(surface: Path) -> list[str]:
    if not surface.exists():
        return []
    html = surface.read_text(encoding="utf-8", errors="replace")
    return TILE_RE.findall(html)


# ------------------------------------------------------------------- compost model
DEFAULT_COMPOST_DAYS = 7


def parse_ts(s: str):
    for cut in (19, 16, 10):
        try:
            return datetime.fromisoformat((s or "")[:cut])
        except (ValueError, TypeError):
            continue
    return None


def compost_rate(ledger: list[dict]) -> int:
    """The current window, DERIVED from the ledger's own last rate event.

    Kevin's mark, 2026-08-06: "Lets put a one week window on marks starting today
    with the option for a user to set the compost rate." The rate lives nowhere but
    here — a `compost_rate` event on the append-only ledger, read back as the last
    one written. No second config file to drift out of sync (the derive-don't-store
    boundary), and every change of the rate is itself a dated record.
    """
    rate = DEFAULT_COMPOST_DAYS
    for r in ledger:
        if r.get("event") == "compost_rate":
            try:
                rate = int(r.get("days"))
            except (TypeError, ValueError):
                pass
    return rate


def compost_start(ledger: list[dict]):
    """Nothing composts that was offered before the rule existed — 'starting today'.

    The first `compost_rate` event is the day the clock was switched on. A decision
    offered before that is measured from that day, not from its own age, so turning
    the rule on never retroactively composts a pile in one stroke.
    """
    for r in ledger:
        if r.get("event") == "compost_rate":
            return parse_ts(r.get("ts"))
    return None


def resolved_keys(ledger: list[dict]) -> set:
    """(surface, tile) pairs that are answered, superseded, or already composted."""
    return {(r.get("surface"), r.get("tile")) for r in ledger
            if r.get("event") in ("answered", "superseded", "composted")}


def live_offers(ledger: list[dict]) -> dict:
    """Unresolved offers, keyed by (surface, tile) -> its latest offer record."""
    done = resolved_keys(ledger)
    out: dict = {}
    for r in ledger:
        if r.get("event") != "offered":
            continue
        key = (r.get("surface"), r.get("tile"))
        if key in done:
            continue
        out[key] = r
    return out


# ------------------------------------------------------------------------- compost
def cmd_compost(args) -> int:
    """A decision not held degrades, drops, and feeds the tree that created it.

    Kevin's naming, 2026-08-06: "Expired decisions carry compost... the decision
    degrades if not held, a branch withers, and drops, and turns to compost, feeding
    the tree that created it, and the larger soil."

    This is not expiry and the difference is the whole point. Expiry deletes; compost
    RETURNS. A composted record keeps its full text and its options forever — it stops
    being reported as awaiting Kevin, and becomes readable substrate. `--list` is the
    soil: what the asking produced, once the asking stopped mattering.

    WHAT IT WILL NOT DO. It composts DECISIONS — the machine's own unanswered asks.
    It does not touch MARKS_LOG. A mark is Kevin's instruction to the system; letting
    a timer drop his instructions would be the machine quietly discarding work he
    asked for, which is the opposite of this mechanism's purpose. That boundary is
    stated here rather than assumed, and it is his to move.

    The rate is HIS. A window Kevin sets is a fixed mechanical trip, which is exactly
    what the held overspeed governor required ("the depth-cap must be KEVIN'S to set,
    never the AI's to infer"). Nothing here reads his state or judges an item's worth;
    it reads a date against a number he wrote down.

      compost --set-rate 7    set the window (and start the clock)
      compost --dry-run       what would compost today, nothing written
      compost                 compost everything past the window
      compost --surface P     only that surface
      compost --list          read the soil
    """
    ledger = read_ledger()

    if args.set_rate is not None:
        append([{"ts": now(), "event": "compost_rate", "days": int(args.set_rate),
                 "source": "kevin"}])
        print(f"[compost] rate set to {args.set_rate} day(s) — the clock starts now. "
              f"Nothing offered before this moment composts on its own age; it is "
              f"measured from today.")
        return 0

    if args.list:
        comp = [r for r in ledger if r.get("event") == "composted"]
        print(f"[compost] {len(comp)} composted — kept whole, feeding back")
        for r in comp[-args.limit:]:
            print(f"  [{r.get('ts','')[:16]}] {r.get('tile')} · {r.get('surface','').split('/')[-1]}")
            print(f"      {str(r.get('one_liner',''))[:110]}")
        return 0

    rate = compost_rate(ledger)
    started = compost_start(ledger)
    if started is None:
        print("[compost] DENY — no rate has ever been set, so the clock has never "
              "started. Run `compost --set-rate 7` first. Nothing composts by default.")
        return 1

    now_dt = datetime.now()
    live = live_offers(ledger)
    due = []
    for (surface, tile), r in live.items():
        if args.surface and surface != rel(args.surface):
            continue
        offered = parse_ts(r.get("ts"))
        if offered is None:
            continue
        # measured from the later of (when it was offered) and (when the rule began)
        clock = max(offered, started)
        if (now_dt - clock).days >= rate:
            due.append((surface, tile, r, (now_dt - clock).days))

    print(f"[compost] window {rate}d · clock started {started.date()} · "
          f"{len(live)} live · {len(due)} past the window")
    if not due:
        soonest = min(((max(parse_ts(r.get('ts')) or now_dt, started)) for r in live.values()),
                      default=None)
        if soonest:
            left = rate - (now_dt - soonest).days
            print(f"[compost] nothing drops yet — the oldest live decision composts in "
                  f"{max(0, left)} day(s)")
        return 0

    for surface, tile, r, age in due:
        print(f"  {'would compost' if args.dry_run else 'composted'} · {tile} · "
              f"{surface.split('/')[-1]} · {age}d")
        print(f"      {str(r.get('one_liner',''))[:110]}")

    if args.dry_run:
        print("[compost] --dry-run: nothing written")
        return 0

    ts = now()
    append([{
        "ts": ts, "event": "composted", "surface": s, "tile": t,
        "one_liner": r.get("one_liner", ""), "options": r.get("options"),
        "offered_ts": r.get("ts"), "age_days": age,
        "reason": f"unheld past the {rate}-day window",
        "source": "compost_rate",
    } for s, t, r, age in due])
    print(f"[compost] {len(due)} dropped — kept whole in the ledger, feeding back. "
          f"Read them with `compost --list`.")
    return 0


# --------------------------------------------------------------------------- offer
def cmd_offer(args) -> int:
    surface = rel(args.surface)
    payload = json.loads(Path(args.json).read_text(encoding="utf-8"))
    if isinstance(payload, dict):
        payload = [dict(v, tile=k) for k, v in payload.items()]

    ledger = read_ledger()
    # Prior revisions of each tile on this surface. Nothing is skipped and nothing is
    # overwritten — a re-offer is a new line with a higher revision.
    seen: dict[str, int] = {}
    for r in ledger:
        if r.get("surface") == surface and r.get("tile"):
            seen[r["tile"]] = seen.get(r["tile"], 0) + 1

    # ---------------------------------------------------------------- THE BRAKE
    # Kevin's mark, 2026-08-06: "decisions.py offer refuses to deposit more than 4
    # tiles for a surface, and refuses entirely while the previous surface still has
    # unanswered decisions — fail-closed, the same way the membrane controller denies."
    #
    # The audit that produced this: 316 decisions offered, 1 answered. Four standing
    # laws already forbade it (ceiling-not-target, B3, the load-test, pace-to-the-
    # felt-read) and none was attached to a mechanism. This is the one place all
    # decision traffic passes, so the brake goes here.
    #
    # It limits the MACHINE, never Kevin. It caps how many things he is asked to
    # decide; it caps nothing about depth, reading, or what he gets. Fewer demands is
    # more capacity, not less — which is why this is not the overspeed governor that
    # stays forbidden.
    #
    # It cannot deadlock a session. A refusal blocks NEW DECISIONS, not the response:
    # a surface may carry zero tiles and be pure reading. When Kevin is behind, the
    # correct behaviour is to stop asking and just report — so that is what a refusal
    # produces.
    if not args.no_brake:
        if len(payload) > MAX_TILES:
            print(f"[decisions] DENY — {len(payload)} tiles for one surface; the cap is "
                  f"{MAX_TILES}. The ceiling is not a target (feedback_3_options, "
                  f"2026-07-01). Cut to the ones that are actually live, or render a "
                  f"reading-only surface with no tiles.")
            return 1
        prior = [(s, t) for (s, t) in live_offers(ledger) if s == surface]
        if prior:
            names = ", ".join(sorted(t for _, t in prior))
            print(f"[decisions] DENY — {len(prior)} decision(s) already stand unanswered "
                  f"on {surface}: {names}")
            print(f"[decisions] Answer them (`decisions.py answer --tile <id> --option "
                  f"<key>`), or let them compost, before asking anything new.")
            print(f"[decisions] A reading-only surface with no tiles is always allowed — "
                  f"when Kevin is behind, report, do not ask.")
            return 1

    gen = max([rec_gen(r) for r in ledger if r.get("surface") == surface] or [0]) + 1
    prior_sha, prior_mtime = surface_state(ROOT / surface)

    ts = now()
    fresh, reoffers = [], []
    for d in payload:
        tile = d.get("tile")
        if not tile:
            raise SystemExit("decisions: every entry needs a 'tile' id")
        revision = seen.get(tile, 0)
        if revision:
            reoffers.append(tile)
        fresh.append({
            "ts": ts,
            "event": "offered",
            "session": args.session,
            "surface": surface,
            "tile": tile,
            "gen": gen,
            "revision": revision,
            "prior_sha": prior_sha,
            "prior_mtime": prior_mtime,
            "one_liner": d.get("one_liner", ""),
            "options": d.get("options", {}),
            # Declared at the moment the dependency is visible, never in a mapping
            # pass (Kevin's mark 2026-08-06: "as an ongoing function in places where
            # it serves"). Per-tile in the json, or one --blocks for the whole batch.
            "blocks": d.get("blocks") or list(args.blocks or []),
            "backfill": bool(args.backfill),
        })

    if fresh:
        append(fresh)
    tag = " (BACKFILL — recorded after the fact, not proof of ordering)" if args.backfill else ""
    print(f"[decisions] offered {len(fresh)} · generation {gen} · {surface}{tag}")
    if reoffers:
        print(f"[decisions] RE-OFFER — {len(reoffers)} tile(s) already on record for this "
              f"surface, recorded again at a new revision, NOT skipped: {', '.join(reoffers)}")
    if fresh and not args.backfill:
        print("[decisions] deposit complete — the surface may now be written")
    return 0


# -------------------------------------------------------------------------- verify
def cmd_verify(args) -> int:
    surface_path = ROOT / rel(args.surface)
    surface = rel(args.surface)
    if not surface_path.exists():
        print(f"[decisions] DENY — {surface} does not exist")
        return 1

    rendered = tiles_in(surface_path)
    if not rendered:
        print(f"[decisions] {surface} — no tiles found; nothing to verify")
        return 0

    mtime = datetime.fromtimestamp(surface_path.stat().st_mtime).replace(microsecond=0)
    sha_now, _ = surface_state(surface_path)

    # The ledger is append-only, so file order is chronological: the LAST record for a
    # tile is the live one. Earlier revisions stay on the ledger and stay readable.
    # ONLY `offered` records are deposits. `answered` / `superseded` / `composted` also
    # carry a tile id, and letting them win the "last record" race made a resolved tile
    # look like a stale deposit — found 2026-08-07 the first time a tile was superseded
    # while still rendering. Resolution is not a deposit and must not be read as one.
    for_surface = [r for r in read_ledger() if r.get("surface") == surface]
    offers_only = [r for r in for_surface if r.get("event") == "offered"]
    recs: dict[str, dict] = {}
    for r in offers_only:
        if r.get("tile"):
            recs[r["tile"]] = r
    resolved_here = {r.get("tile") for r in for_surface
                     if r.get("event") in ("answered", "superseded", "composted")}

    # The surface's newest deposit generation. Any rendered tile whose live record sits
    # below it was NOT deposited for the surface as it currently stands — that is the
    # silent skip, and it is what used to pass.
    top_gen = max([rec_gen(r) for r in offers_only] or [0])

    undeposited, late, backfilled, stale = [], [], [], []
    for t in rendered:
        r = recs.get(t)
        if r is None:
            undeposited.append(t)
            continue
        if rec_gen(r) < top_gen:
            stale.append(f"{t}(gen {rec_gen(r)}<{top_gen})")
            continue
        if r.get("backfill"):
            backfilled.append(t)
            continue
        try:
            when = datetime.fromisoformat(r["ts"])
        except (KeyError, ValueError):
            late.append(t)
            continue
        if when > mtime:
            late.append(t)

    # A record carries the surface as it stood at deposit time. If that is still the
    # surface on disk, the deposit describes a generation that was never written.
    unwritten = [
        t for t in rendered
        if (r := recs.get(t)) and r.get("prior_sha") and r["prior_sha"] == sha_now
    ]

    print(f"[decisions] verify {surface}")
    print(f"  tiles rendered: {len(rendered)}   on record: {len(rendered) - len(undeposited)}"
          f"   deposit generation: {top_gen}")
    if undeposited:
        print(f"  BREACH — rendered with no ledger record: {', '.join(undeposited)}")
    if stale:
        print(f"  BREACH — record is from an EARLIER surface generation; this tile was "
              f"skipped, not deposited: {', '.join(stale)}")
    if late:
        print(f"  BREACH — record written AFTER the surface (render-first): {', '.join(late)}")
    if unwritten:
        print(f"  NOTE — surface on disk is byte-identical to what the deposit saw; the "
              f"generation these records describe was never written: {', '.join(unwritten)}")
    if backfilled:
        print(f"  NOTE — backfilled, ordering not proven: {', '.join(backfilled)}")
    still_shown = sorted(resolved_here & set(rendered))
    if still_shown:
        print(f"  NOTE — resolved but still rendered (legal: the record stays legible): "
              f"{', '.join(still_shown)}")
    if not undeposited and not late and not stale:
        print("  PASS — every rendered decision was deposited before the surface was written")
    return 1 if (undeposited or late or stale) else 0


# -------------------------------------------------------------------------- answer
def cmd_answer(args) -> int:
    """Kevin's answer to an offered decision, in three words instead of a paragraph.

    Kevin's mark, 2026-08-06: "Every tile is already deposited with its id and its
    options before the surface renders, so a mark could be three words instead of a
    pasted paragraph — and the ledger would finally know which offered decisions were
    answered. Keep the clipboard copy as the full-text path; this adds a short one
    beside it, never replaces it."

    The deposit step built on 2026-08-04 for a different reason made this possible:
    the tile id and its exact option text are already on the ledger before the widget
    is written, so `--tile d1 --option go` is not shorthand for the mark — it RESOLVES
    to the identical text the clipboard would have carried. Nothing is inferred.

    Two writes, because an answer is one act with two homes:
      * `answered` to DECISIONS_OFFERED.jsonl — closes the offered->answered loop,
        which is what `open` could never see before.
      * the resolved text to MARKS_LOG.jsonl via the brake — because an answer IS a
        mark, and the standing law is that a mark is caught durably before it is acted
        on. `--no-mark` records the answer only.

    The machine still infers nothing: it will not guess a tile, will not guess an
    option, and refuses when a tile id is ambiguous across surfaces.
    """
    ledger = read_ledger()
    tile = args.tile
    surface = rel(args.surface) if args.surface else None

    cands = [r for r in ledger
             if r.get("tile") == tile
             and r.get("event") == "offered"
             and (surface is None or r.get("surface") == surface)]
    if not cands:
        where = f" on {surface}" if surface else ""
        print(f"[decisions] DENY — no offered decision with tile id {tile!r}{where}")
        return 1

    surfaces = {r.get("surface") for r in cands}
    if len(surfaces) > 1 and surface is None:
        print(f"[decisions] DENY — tile {tile!r} was offered on {len(surfaces)} surfaces; "
              f"name one with --surface:")
        for s in sorted(surfaces):
            print(f"    {s}")
        return 1

    rec = cands[-1]  # append-only: the last record for a tile is the live one
    options = rec.get("options")
    if not isinstance(options, dict):
        print(f"[decisions] DENY — {tile!r} was deposited with a bare option LIST, not "
              f"keyed options. There is no key to name; use the clipboard path for this one.")
        for i, t in enumerate(options or []):
            print(f"    [{i}] {str(t)[:80]}")
        return 1
    if args.option not in options:
        print(f"[decisions] DENY — {tile!r} has no option {args.option!r}. "
              f"Offered: {', '.join(options) or '(none)'}")
        return 1

    text = options[args.option]
    ts = now()
    append([{
        "ts": ts,
        "event": "answered",
        "session": args.session or rec.get("session"),
        "surface": rec.get("surface"),
        "tile": tile,
        "answers_gen": rec.get("gen"),
        "option": args.option,
        "text": text,
        "source": "kevin",
    }])
    print(f"[decisions] answered · {rec.get('surface')} · {tile} -> {args.option}")
    print(f"  {text}")

    if not args.no_mark:
        marked = {
            "ts": ts,
            "mark": text,
            "source": "kevin",
            "acted": None,
            "via": f"decisions.py answer --tile {tile} --option {args.option}",
        }
        with MARKS.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(marked, ensure_ascii=False) + "\n")
        print(f"[brake] caught to MARKS_LOG.jsonl — the mark is durable before anything acts on it")
    else:
        print("[decisions] --no-mark: recorded as answered, NOT written to MARKS_LOG")
    return 0


# ---------------------------------------------------------------------------- open
def cmd_open(args) -> int:
    """Offered and never answered. The load this removes from Kevin's head."""
    marks_text = MARKS.read_text(encoding="utf-8", errors="replace") if MARKS.exists() else ""
    marked = []
    for line in marks_text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            marked.append(json.loads(line).get("mark", "") or "")
        except json.JSONDecodeError:
            pass

    def option_texts(rec) -> list:
        """Options have been written two shapes over the ledger's life: a dict of
        key->text (the current form, which `answer` needs so it can resolve --option)
        and a bare list of texts (12 records from another session, 2026-08-05). The
        ledger is append-only, so both shapes are permanent and every reader has to
        take them as they are rather than assume the newer one."""
        o = rec.get("options")
        if isinstance(o, dict):
            return [v for v in o.values() if v]
        if isinstance(o, list):
            return [v for v in o if isinstance(v, str) and v]
        return []

    def answered(rec) -> bool:
        for text in option_texts(rec):
            if not text:
                continue
            probe = text[:60].strip()
            if probe and any(probe in m for m in marked):
                return True
        return False

    recs_all = read_ledger()
    # An explicit `answer` closes its (surface, tile) outright — no text matching
    # needed. This is the loop the ledger could not see before 2026-08-06.
    closed = resolved_keys(recs_all)
    recs = [r for r in recs_all if r.get("event") == "offered"]
    unanswered = [r for r in recs
                  if (r.get("surface"), r.get("tile")) not in closed and not answered(r)]
    print(f"[decisions] {len(recs)} offered · {len(recs) - len(unanswered)} answered · "
          f"{len(unanswered)} still open")
    by_surface: dict[str, list[dict]] = {}
    for r in unanswered:
        by_surface.setdefault(r.get("surface", "?"), []).append(r)
    for surface, rs in sorted(by_surface.items()):
        print(f"\n  {surface}  ({len(rs)})")
        for r in rs[: args.limit]:
            one = r.get("one_liner", "")
            print(f"    [{r.get('ts','')[:16]}] {r.get('tile')}: {one[:96]}")
        if len(rs) > args.limit:
            print(f"    … {len(rs) - args.limit} more")
    return 0


def cmd_status(args) -> int:
    recs = read_ledger()
    surfaces = {r.get("surface") for r in recs}
    back = sum(1 for r in recs if r.get("backfill"))
    off = sum(1 for r in recs if r.get("event") == "offered")
    ans = sum(1 for r in recs if r.get("event") == "answered")
    comp = sum(1 for r in recs if r.get("event") == "composted")
    live = len(live_offers(recs))
    rate = compost_rate(recs)
    started = compost_start(recs)
    print(f"[decisions] {off} offered · {ans} answered · {comp} composted · {live} live "
          f"across {len(surfaces)} surface(s) · {back} backfilled")
    print(f"[decisions] answer rate {ans/max(1,off)*100:.0f}% · compost window {rate}d"
          + (f" · clock started {started.date()}" if started else " · CLOCK NOT STARTED"))
    return 0


def cmd_supersede(args) -> int:
    """A decision settled by having its premise removed, rather than by being chosen.

    The gap this closes, found 2026-08-07 (session 40e00418): Kevin answered the A/B/C
    water fork with a fourth thing — the filter is a shaped membrane, nothing classifies
    — and the ledger had no way to write that down. `answer` refused, correctly, because
    the option was never offered; a ledger that lets an answer be invented after the fact
    stops being evidence. `compost` is time-based and carries no reason. So a decision
    that was genuinely resolved sat live, and the answer-rate under-reported exactly the
    kind of resolution that had been working best.

    This does NOT let an unoffered option be recorded as if it had been chosen. It records
    a different event: the question stopped being a question. `--by` is required and is the
    naming that dissolved it, in Kevin's words wherever possible. Nothing is inferred.

    Append-only, like everything else here. The tile leaves `live_offers` because it is
    resolved, and the record says how.
    """
    ledger = read_ledger()
    tile = args.tile
    surface = rel(args.surface) if args.surface else None

    cands = [r for r in ledger
             if r.get("tile") == tile
             and r.get("event") == "offered"
             and (surface is None or r.get("surface") == surface)]
    if not cands:
        where = f" on {surface}" if surface else ""
        print(f"[decisions] DENY — no offered decision with tile id {tile!r}{where}")
        return 1

    surfaces = {r.get("surface") for r in cands}
    if len(surfaces) > 1 and surface is None:
        print(f"[decisions] DENY — tile {tile!r} was offered on {len(surfaces)} surfaces; "
              f"name one with --surface:")
        for s in sorted(surfaces):
            print(f"    {s}")
        return 1

    rec = cands[-1]
    if (rec.get("surface"), tile) in resolved_keys(ledger):
        print(f"[decisions] {tile} on {rec.get('surface')} is already resolved — nothing written")
        return 0

    append([{
        "ts": now(),
        "event": "superseded",
        "session": args.session or "",
        "surface": rec.get("surface"),
        "tile": tile,
        "by": args.by,
        "one_liner": rec.get("one_liner", ""),
    }])
    print(f"[decisions] superseded: {tile} on {rec.get('surface')}")
    print(f"[decisions] by: {args.by}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("offer")
    p.add_argument("--surface", required=True)
    p.add_argument("--session", required=True)
    p.add_argument("--json", required=True)
    p.add_argument("--backfill", action="store_true")
    p.add_argument("--blocks", action="append",
                   help="id of an open thing this batch blocks; repeatable. Per-tile "
                        "edges go in the json as a 'blocks' list.")
    p.add_argument("--no-brake", action="store_true",
                   help="bypass the rate brake. Never use this to get past Kevin being "
                        "behind — a reading-only surface is the correct answer there.")
    p.set_defaults(fn=cmd_offer)

    p = sub.add_parser("verify")
    p.add_argument("--surface", required=True)
    p.set_defaults(fn=cmd_verify)

    p = sub.add_parser("answer")
    p.add_argument("--tile", required=True)
    p.add_argument("--option", required=True)
    p.add_argument("--surface", help="required only when the tile id is ambiguous")
    p.add_argument("--session")
    p.add_argument("--no-mark", action="store_true",
                   help="record the answer without catching it to MARKS_LOG")
    p.set_defaults(fn=cmd_answer)

    p = sub.add_parser("supersede")
    p.add_argument("--tile", required=True)
    p.add_argument("--by", required=True,
                   help="the naming that dissolved the question — Kevin's words where possible")
    p.add_argument("--surface", help="required only when the tile id is ambiguous")
    p.add_argument("--session")
    p.set_defaults(fn=cmd_supersede)

    p = sub.add_parser("compost")
    p.add_argument("--set-rate", type=int, dest="set_rate",
                   help="days a decision may stand unheld before it drops")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--surface")
    p.add_argument("--list", action="store_true", help="read the soil")
    p.add_argument("--limit", type=int, default=20)
    p.set_defaults(fn=cmd_compost)

    p = sub.add_parser("open")
    p.add_argument("--limit", type=int, default=20)
    p.set_defaults(fn=cmd_open)

    p = sub.add_parser("status")
    p.set_defaults(fn=cmd_status)

    args = ap.parse_args()
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
