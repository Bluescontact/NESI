#!/usr/bin/env python3
"""
update_state_view.py — read gate_data.json, rewrite STATE block in state_view.html.
Run at daily-cycle close-out (Step 2, after gate.py build).

Usage:
  cd <root>/gate && python update_state_view.py
  python gate/update_state_view.py          (from root)
"""

import json
import re
import sys
from pathlib import Path

ROOT  = Path(__file__).resolve().parent.parent
GDATA = Path(__file__).resolve().parent / 'data' / 'gate_data.json'
SV    = ROOT / 'state_view.html'

# Instruments block — update here if links change, not per-run
INSTRUMENTS = """\
  instruments: [
    { label: 'Governor',         href: 'THE_GOVERNOR.html',            desc: 'body · clock · topology' },
    { label: 'Converger',        href: 'THE_CONVERGER.html',           desc: 'promote · hold · compost' },
    { label: 'Decision Surface', href: 'THE_DECISION_SURFACE.html',    desc: 'one gate at a time' },
    { label: 'Development Mode', href: 'THE_DEVELOPMENT_MODE.html',    desc: 'grounder→dreamer→governor→shaper' },
    { label: 'Gate Panel',       href: 'gate/THE_GATE.html',           desc: 'full queue · tray · gauges' },
    { label: 'Daily Brief',      href: '_INTAKE/DAILY_BRIEF.md',       desc: 'dispatcher output' },
    { label: 'Codex Screen',     href: 'tools/codex_index/index.html', desc: 'proximity pre-screen' },
    { label: 'STATE.md',         href: 'STATE.md',                     desc: 'machine-readable state' },
  ]"""


def pile_gauge(gauges):
    """Parse 'spine 14 · hold 5 · queue 11 · tray 38' from the Pile state gauge."""
    for g in gauges:
        if g.get('name') == 'Pile state':
            out = {}
            for chunk in g.get('reading', '').split('·'):
                chunk = chunk.strip()
                for k in ('spine', 'hold', 'queue', 'tray'):
                    if chunk.startswith(k):
                        try:
                            out[k] = int(chunk.split()[1])
                        except (IndexError, ValueError):
                            out[k] = 0
            return out
    return {}


def make_state_block(gd):
    date    = gd.get('staged', '????-??-??')
    q_items = gd.get('felt_read_queue', [])
    tray    = gd.get('staging_tray', [])
    gauges  = gd.get('ledger_gauges', [])
    pile    = pile_gauge(gauges)

    staged_q     = [i for i in q_items if i.get('status') == 'staged']
    q_count      = len(staged_q)
    tray_staged  = [i for i in tray if i.get('status') == 'staged']
    tray_held    = [i for i in tray if i.get('status') == 'held']
    promote_list = [i for i in tray
                    if 'PROMOTE-READY' in i.get('title', '')
                    or i.get('class') == 'crossing-ready']

    # Gate item — first staged queue item
    gate_js = 'null'
    if staged_q:
        f     = staged_q[0]
        title = f.get('title', '')
        desc  = (f.get('changes') or f.get('origin') or '')[:200]
        size  = f.get('mark_size', '?')
        moves = [
            f'[{size} mark] felt-read — body yes/no',
            desc[:120],
            f'{q_count - 1} more staged in queue',
        ]
        gate_js = (
            '{\n'
            f'    item: {json.dumps(title)},\n'
            f'    desc: {json.dumps(desc)},\n'
            '    moves: [\n'
            + ''.join(f'      {json.dumps(m)},\n' for m in moves)
            + '    ]\n  }'
        )

    canon = gd.get('canon_global', pile.get('spine', 0))

    block = f"""\
  date: '{date}',

  ground: {{
    location:  {{ val: "Brian's · power + water + in-law suite for hygiene", ok: true }},
    exit:      {{ val: 'July 20', ok: true }},
    floor:     {{ val: 'not set — this week\\'s goal', ok: null }},
    cash:      {{ val: 'No flow', warn: true }},
    body:      {{ val: '?', ok: null }}
  }},

  bodyStopped: false,

  pipeline: [
    {{ stage: 'RAW',           count: 0,                  gate: 'AUTO',  color: 'var(--gd)' }},
    {{ stage: 'DEVELOPED',     count: {len(tray_staged)}, gate: 'BODY',  color: 'var(--g)'  }},
    {{ stage: 'REVIEW',        count: {q_count},          gate: 'BODY',  color: 'var(--g)'  }},
    {{ stage: 'HOLD',          count: {len(tray_held)},   gate: '—',     color: 'var(--yel)'}},
    {{ stage: 'PROMOTE-READY', count: {len(promote_list)},gate: 'AUTO',  color: 'var(--grn)'}},
    {{ stage: 'AT GATE',       count: {q_count},          gate: 'BODY',  color: 'var(--gb)' }},
    {{ stage: 'CANON',         count: {canon},            gate: '—',     color: 'var(--grn)'}},
  ],

  /* auto-generated {date} from gate_data.json */
  gate: {gate_js},

  queue: {{ count: {q_count}, threshold: 15, alarm: 20 }},

  sessionStart: [
    "What's at the gate? → AT THE GATE section below",
    "What's the body status? → Ground · body row",
    "Is the queue below 15? → Backlog Gauge below"
  ],

{INSTRUMENTS}"""
    return block


def main():
    if not GDATA.exists():
        print(f'ERROR: {GDATA} not found', file=sys.stderr)
        sys.exit(1)
    if not SV.exists():
        print(f'ERROR: {SV} not found', file=sys.stderr)
        sys.exit(1)

    with open(GDATA, encoding='utf-8') as f:
        gd = json.load(f)

    html = SV.read_text(encoding='utf-8')

    # Replace everything between 'const STATE = {\n' and '\n};'
    pat  = r'(?<=const STATE = \{)[\s\S]+?(?=\n\};)'
    body = '\n' + make_state_block(gd) + '\n'
    new_html, n = re.subn(pat, lambda m: body, html, count=1)

    if n == 0:
        print('ERROR: STATE block boundary not found in state_view.html', file=sys.stderr)
        print('  Expected: const STATE = { ... };', file=sys.stderr)
        sys.exit(1)

    SV.write_text(new_html, encoding='utf-8')

    date    = gd.get('staged', '?')
    q_count = len([i for i in gd.get('felt_read_queue', [])
                   if i.get('status') == 'staged'])
    tray    = gd.get('staging_tray', [])
    promote = len([i for i in tray
                   if 'PROMOTE-READY' in i.get('title', '')
                   or i.get('class') == 'crossing-ready'])
    print(f'state_view.html updated · {date} · queue-staged {q_count} · promote-ready {promote}')


if __name__ == '__main__':
    main()
