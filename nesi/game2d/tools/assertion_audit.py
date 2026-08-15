"""Assertion audit · presence-asserting vs absence-passing.
Method (game-craft, 2026-08-13): invert every check to presence-asserting,
never absence-passing. A blank screen passes every refusal.

Each live instrument in the register is encoded as a predicate over a world.
Run on the EMPTY world. Anything that passes is absence-passing and must be
bound to the presence that satisfies it.
"""

# ---------- worlds ----------

def world(seats, drops, answers_available, record, siting, pass_):
    return dict(seats=seats, drops=drops, answers=answers_available,
                record=record, siting=siting, **{'pass': pass_})

EMPTY = world(seats=[], drops=[], answers_available=[], record=[], siting={},
              pass_={'state': 'HELD', 'waits_on': 'the tree',
                     'launch': None, 'produced': [], 'verified_against': []})

SEAT_KEYS = ['gesture', 'material_in', 'surface', 'outputs', 'persists', 'cost', 'held']

def full_seat(name):
    return {'name': name, 'gesture': 'I ' + name.lower(), 'material_in': 'from prior face',
            'surface': 'a named input', 'outputs': ['a', 'b', 'c'],
            'persists': 'a record', 'cost': 'a named cost', 'held': 'a preview',
            'named_by_gesture': True, 'material_from_prior': True}

# ---------- LIVE IS READ OFF THE BUILD ----------
# It was `[full_seat(n) for n in THE_TWELVE]` — a hand-written literal with every
# field filled in by me. The suite passed 27/27 and the number was a fact about
# my transcription, not about ascent.html.
#
# tools/seats.js parses the SET table and emits what is actually there. It
# refuses to derive what it cannot see: `cost` comes back null with its reason
# attached, because what a hand gives up by acting is not visible to a parser.
# A deriver that fills its own gaps is the literal again with more steps.
#
# If the deriver cannot run, this REFUSES rather than falling back to the
# literal — a fallback would restore the exact thing being removed.

import json, subprocess, os, sys as _sys
_HERE = os.path.dirname(os.path.abspath(__file__))
try:
    _raw = subprocess.run(["node", os.path.join(_HERE, "seats.js"), "--json"],
                          capture_output=True, text=True, check=True).stdout
    _derived = json.loads(_raw)
except Exception as _err:
    print("[assertion_audit] REFUSED — could not read the seats off the build:", _err)
    print("            LIVE is derived from ascent.html; there is no hand-written fallback,")
    print("            because a fallback restores the literal this replaced.")
    _sys.exit(1)

THE_TWELVE = ['TANK','DAM','FILTER','STATIONS','GROUND','DEEP',
              'LENS','HELIOSTAT','SEATING','OVERWINTERING','GARDEN','CAST']
DERIVED = [_derived['seats'][n] for n in THE_TWELVE if n in _derived['seats']]
NOT_DERIVABLE = _derived['not_derivable']

LIVE = world(
    seats=DERIVED,
    drops=[{'carries': True, 'per_drop': True}],
    answers_available=['yes','no','dont_know','dont_want_to'],
    record=[{'kind':'drop'},{'kind':'route'},{'kind':'hold'}],
    siting={'verified': True, 'claims_checked': 4, 'crossings': 8},
    pass_={'state':'HELD','waits_on':'the tree','launch':None,
           'produced':['12 entries','a verified siting'],
           'verified_against':['4 asserted distances','the 8-edge census']})

# THE CONTROL: THE LIVE BUILD WITH ONE PRESENCE REMOVED.
# It was built from full_seat() — the literal — so it was never the live world
# minus something, it was a different world entirely. That stayed invisible while
# both worlds happened to satisfy the same rules, and surfaced the moment F4 was
# restated: the literal gave all twelve seats three outputs, so the control
# failed F4 for a reason that had nothing to do with the held form it removes.
# It is DERIVED now, so "one presence removed" means exactly that.
CONTROL = world(
    seats=[dict(s, held=None) for s in DERIVED],
    drops=LIVE['drops'], answers_available=LIVE['answers'], record=LIVE['record'],
    siting=LIVE['siting'], pass_=LIVE['pass'])

# ---------- instruments, AS CURRENTLY STATED ----------

S = lambda w: w['seats']

STATED = [
 ('S1','standing','every face\'s material comes from the face before it',
  lambda w: all(s['material_from_prior'] for s in S(w))),
 ('S2','standing','writing arrives carrying something — per drop, not per frame',
  lambda w: all(d['carries'] and d['per_drop'] for d in w['drops'])),
 ('S3','standing','faces inside a level are open to each other; an empty station is simply empty',
  lambda w: True),
 ('S4','standing','a consequence that persists is not always a consequence in the water',
  lambda w: True),
 ('S5','standing','the level is named by its gesture',
  lambda w: all(s['named_by_gesture'] for s in S(w))),
 ('S6','standing','every step of the give-and-return circuit is a reach',
  lambda w: True),

 ('L1','load','the load member is the user\'s',
  lambda w: True),                                  # nothing computes it when nothing exists
 ('L2','load','load is not read, not inferred, not computed, never defaulted',
  lambda w: True),
 ('L3','load','the alphabet is four',
  lambda w: len(w['answers']) == 4),
 ('L4','load','"no" and "i don\'t want to" are not the same answer',
  lambda w: True),
 ('L5','load','no information is offered to a don\'t-want-to',
  lambda w: True),
 ('L6','load','an unanswered load is held — not zero, not yes',
  lambda w: True),
 ('L7','load','all four settle the drop',
  lambda w: all(d.get('settled', True) for d in w['drops'])),

 ('F1','field','1 · the gesture', lambda w: bool(S(w)) and all(s['gesture'] for s in S(w))),
 ('F2','field','2 · material in', lambda w: bool(S(w)) and all(s['material_in'] for s in S(w))),
 ('F3','field','3 · the work surface', lambda w: bool(S(w)) and all(s['surface'] for s in S(w))),
 # F4 — KEVIN'S RULING 2026-08-15: "the third output is the stations' work."
 # The counsel pass listed three outputs as a field of every seat; the build put
 # bays() at the stations alone; law 1 says three outputs at every STATION. The
 # ruling settles it — this is not twelve seats' field, it is one seat's job.
 ('F4','field','4 · three outputs — the STATIONS carry them',
  lambda w: len([s for s in S(w) if len(s['outputs'] or [])==3])>=1),
 ('F5','field','5 · what persists', lambda w: bool(S(w)) and all(s['persists'] for s in S(w))),
 ('F6','field','6 · the cost', lambda w: bool(S(w)) and all(s['cost'] for s in S(w))),
 ('F7','field','7 · the held form', lambda w: bool(S(w)) and all(s['held'] for s in S(w))),

 ('E1','ending','WALKABLE — walked, screenshots read',
  lambda w: w['pass']['state']!='WALKABLE' or bool(w['pass']['produced'])),
 ('E2','ending','UNWITNESSED — evidence read off the buffer or log',
  lambda w: w['pass']['state']!='UNWITNESSED' or bool(w['pass']['produced'])),
 ('E3','ending','HELD — name what it waits on, give the launch command for what stands',
  lambda w: w['pass']['state']!='HELD' or bool(w['pass']['waits_on'])),

 ('G1','siting','the z=1 square has corners FILTER·GROUND·STATIONS·DEEP',
  lambda w: w['siting'].get('verified', True)),
 ('G2','siting','LENS is TANK\'s antipode', lambda w: w['siting'].get('verified', True)),
 ('G3','siting','the eight turns and returns are the complete census',
  lambda w: w['siting'].get('crossings', 8) == 8),
 ('G4','siting','every asserted distance checks out',
  lambda w: w['siting'].get('claims_checked', 4) == 4),
]

# ---------- inversions: each "no" bound to the "yes" it protects ----------

BINDINGS = {
 'S1': 'a face whose material is traceable to a named prior face, shown at the seat',
 'S2': 'a level line that steps visibly on each drop — the step is the evidence',
 'S3': 'a station face that renders when empty, and says where the water comes from',
 'S4': 'a record surface a hand can open, listing consequences that never touched the water',
 'S5': 'a level whose displayed name is read from its gesture, not stored beside it',
 'S6': 'a reach that can be declined — every step offers, none takes',
 'L1': 'a load member on screen the seat cannot fill: four words, nothing preselected',
 'L2': 'a load field that renders EMPTY and stays empty, visibly, until a hand answers',
 'L3': 'four affordances present and distinct — countable on the surface',
 'L4': 'two record entries that read differently for "no" and "i don\'t want to"',
 'L5': 'a don\'t-want-to that terminates the exchange with no follow-up rendered',
 'L6': 'a held state that SHOWS as held — a visible third thing, not a blank',
 'L7': 'a settle animation that fires on all four answers, including both refusals',
 'F6': 'a cost named in terms a hand can price before acting — never "none"',
 # E1 and E2 came back unbound. They were absence-passing the same way HELD was
 # — "state != WALKABLE or produced" is satisfied by never claiming WALKABLE, so
 # the two ending states that are supposed to CARRY evidence were the two that
 # asked for none. The inverted suite already requires `produced` of all three;
 # these are the presences that satisfy them, written down like the rest.
 'E1': 'a walk that names the screen it read — not "the level loads", what was on it',
 'E2': 'the buffer or log line itself, quoted, with what it was read off',
 'E3': 'a HELD report that names what it PRODUCED while held, and what it verified against',
 'G1': 'a solid the coordinates are read off, not asserted about',
 'G2': 'the antipode measured at run time and printed',
 'G3': 'the census recomputed from the siting, and the count printed',
 'G4': 'every asserted distance recomputed and printed with its expectation',
}

# ---------- run ----------

def run(w, label):
    return {i[0]: i[3](w) for i in STATED}

def report():
    e, l, c = run(EMPTY,'empty'), run(LIVE,'live'), run(CONTROL,'control')
    absence = [i for i in STATED if e[i[0]]]
    presence = [i for i in STATED if not e[i[0]]]
    print(f"instruments audited: {len(STATED)}")
    print(f"  presence-asserting as stated: {len(presence)}")
    print(f"  ABSENCE-PASSING (a blank passes): {len(absence)}\n")
    print("THE EMPTY CASE — what a blank register passes:")
    for k,cat,txt,_ in absence:
        print(f"  {k:3} [{cat:8}] {txt}")
    print("\nalready presence-asserting:")
    for k,cat,txt,_ in presence:
        print(f"  {k:3} [{cat:8}] {txt}")
    print("\nBOTH ENDS:")
    print(f"  the empty register        {'PASS' if all(e.values()) else 'FAIL'}"
          f"  ({sum(e.values())}/{len(STATED)} pass)")
    print(f"  live, held form removed   {'PASS' if all(c.values()) else 'FAIL'}"
          f"  ({sum(c.values())}/{len(STATED)} pass)  <- control")
    for k in c:
        if not c[k]: print(f"      failed on {k} — {dict((i[0],i[2]) for i in STATED)[k]}")
    print(f"  the live register         {'PASS' if all(l.values()) else 'FAIL'}"
          f"  ({sum(l.values())}/{len(STATED)} pass)")
    print(f"\nbindings written: {len(BINDINGS)} of {len(absence)} absence-passing instruments")
    missing = [k for k,_,_,_ in absence if k not in BINDINGS]
    print("unbound:", missing if missing else "none")

report()

# ---------- the inverted suite ----------
# every instrument restated so that it can only be satisfied by the world being there.

INVERTED = [
 ('S1', lambda w: bool(S(w)) and all(s['material_from_prior'] for s in S(w))),
 ('S2', lambda w: bool(w['drops']) and all(d['carries'] and d['per_drop'] for d in w['drops'])),
 ('S3', lambda w: bool(S(w))),                      # a station face must render, empty or not
 ('S4', lambda w: bool(w['record'])),               # the record surface must exist and be openable
 ('S5', lambda w: bool(S(w)) and all(s['named_by_gesture'] for s in S(w))),
 ('S6', lambda w: bool(S(w))),                      # a reach exists that can be declined
 ('L1', lambda w: len(w['answers']) == 4),          # the member is on screen, unfillable by the seat
 ('L2', lambda w: len(w['answers']) == 4),          # it renders empty and stays visibly empty
 ('L3', lambda w: len(w['answers']) == 4),
 ('L4', lambda w: len({'no','dont_want_to'} & set(w['answers'])) == 2),
 ('L5', lambda w: 'dont_want_to' in w['answers']),
 ('L6', lambda w: len(w['answers']) == 4),          # held SHOWS as a third thing
 ('L7', lambda w: bool(w['drops']) and len(w['answers']) == 4),
 ('F1', lambda w: bool(S(w)) and all(s['gesture'] for s in S(w))),
 ('F2', lambda w: bool(S(w)) and all(s['material_in'] for s in S(w))),
 ('F3', lambda w: bool(S(w)) and all(s['surface'] for s in S(w))),
 # Presence-asserting under the ruling: the seat that carries them must carry
 # ALL THREE — a stations offering two is the law broken where it actually
 # lives. And exactly one seat carries them: a second would mean the third
 # output leaked back out into the world it was ruled out of.
 ('F4', lambda w: len([s for s in S(w) if len(s['outputs'] or [])==3])==1),
 ('F5', lambda w: bool(S(w)) and all(s['persists'] for s in S(w))),
 ('F6', lambda w: bool(S(w)) and all(s['cost'] and s['cost']!='none' for s in S(w))),
 ('F7', lambda w: bool(S(w)) and all(s['held'] for s in S(w))),
 # every ending state now requires evidence. HELD is no longer the exit.
 ('E1', lambda w: bool(w['pass']['produced'])),
 ('E2', lambda w: bool(w['pass']['produced'])),
 ('E3', lambda w: bool(w['pass']['produced']) and bool(w['pass']['verified_against'])),
 ('G1', lambda w: w['siting'].get('claims_checked',0) >= 1),
 ('G2', lambda w: w['siting'].get('claims_checked',0) >= 1),
 ('G3', lambda w: w['siting'].get('crossings') == 8),
 ('G4', lambda w: w['siting'].get('claims_checked') == 4),
]

def run2(w): return {k: f(w) for k,f in INVERTED}

print("\n" + "="*66)
print("AFTER INVERSION — the same 27, restated presence-asserting")
print("="*66)
for w,label in [(EMPTY,'the empty register'),(CONTROL,'live, held form removed'),(LIVE,'the live register')]:
    r = run2(w); p = sum(r.values())
    fails = [k for k,v in r.items() if not v]
    print(f"  {label:26} {'PASS' if p==len(INVERTED) else 'FAIL'}  ({p}/{len(INVERTED)})")
    if fails: print(f"      first refusals: {', '.join(fails[:6])}{' …' if len(fails)>6 else ''}")
r0 = run2(EMPTY)
print(f"\n  a blank now passes {sum(r0.values())} of {len(INVERTED)}.")

# ---------- IT IS A GATE, NOT A READING ----------
# An audit that reports and exits 0 is read once and then becomes scenery.
# Three things have to hold every time it runs, and any of them failing is a
# refusal:
#   the empty world passes NOTHING       — no rule is satisfiable by a blank
#   the control fails, on F7 alone       — the suite can still detect a loss
#   the live world passes everything     — the rules describe a world that is there
# The control is what keeps the first two honest: a suite that refused
# everything unconditionally would also pass the first test.

import sys
_e, _c, _l = run2(EMPTY), run2(CONTROL), run2(LIVE)
_stated_empty = run(EMPTY, 'e')
_bad = []
if any(_e.values()):
    _bad.append("the empty world passes " + str(sum(_e.values())) + " rule(s) — still absence-passing: "
                + ", ".join(k for k, v in _e.items() if v))
_cf = [k for k, v in _c.items() if not v]
if _cf != ['F7']:
    _bad.append("the control should fail on F7 alone; it failed on " + (", ".join(_cf) or "nothing"))
_lf = [k for k, v in _l.items() if not v]
if _lf:
    # A REFUSAL THAT IS A WORK ORDER. Since LIVE is read off ascent.html, a
    # failure here is a fact about the game rather than about the register — so
    # it names the seats, not just the rule. "F4 fails" sends nobody anywhere;
    # "F4 fails at eleven seats, and here they are" is the next slice.
    _FIELD = {'F1':'gesture','F2':'material_in','F3':'surface','F4':'outputs',
              'F5':'persists','F6':'cost','F7':'held'}
    for _k in _lf:
        _f = _FIELD.get(_k)
        if not _f:
            _bad.append("the live world fails: " + _k)
            continue
        if _f == 'outputs':
            # Under the ruling this is about ONE seat, so naming eleven would be
            # the old reading printed back out.
            _has = [s['name'] for s in DERIVED if len(s.get(_f) or []) == 3]
            _bad.append("F4 (three outputs): " + (
                "no seat carries all three" if not _has
                else "carried by " + str(len(_has)) + " seats, not one: " + ", ".join(_has)))
            continue
        _at = [s['name'] for s in DERIVED if not s.get(_f)]
        _bad.append(_k + " (" + _f + ") is absent at " + str(len(_at)) +
                    " of " + str(len(DERIVED)) + " seats: " + ", ".join(_at))
_u = [k for k, _, _, _ in STATED if _stated_empty[k] and k not in BINDINGS]
if _u:
    _bad.append("absence-passing and unbound: " + ", ".join(_u))

print()
if _bad:
    for b in _bad:
        print("[assertion_audit] REFUSED —", b)
    sys.exit(1)
print("[assertion_audit] 27 rules · a blank passes none · "
      "the control fails on F7 alone · the live world holds")
