"""The tetra position-board -- first render build (2026-07-30, Kevin's mark 22:22).

Rides NODE_DATA_MODEL.md + project_tetra_position_board.md (SIGNED). A positional
reading of the existing node/edge/bucket skeleton: four fixed poles, six
position-edges as regions, holder derived from edge (never stored), faces as
filtered reads, volume as MIN headroom, board_state flippable by a
Kevin-sourced call only.

State lives in position_board.json beside this file. The render command writes
position_board.html with the state embedded (same pattern as state_view -- no
fetch, works from file://).

THE LAW, carried from the spec: nothing here flips board_state on its own
logic. `state` requires --source kevin or it denies. The HTML render has no
state-flipping control at all -- it reads.
"""

import argparse
import json
import time
from pathlib import Path

HERE = Path(__file__).parent
STATE_FILE = HERE / "position_board.json"
HTML_FILE = HERE / "position_board.html"

POLES = ("self", "other", "world", "time")

POSITION_EDGE_KEYS = (
    "self_other", "self_world", "self_time",
    "other_world", "other_time", "world_time",
)

EDGE_TO_POLES = {
    "self_other":  ("self", "other"),
    "self_world":  ("self", "world"),
    "self_time":   ("self", "time"),
    "other_world": ("other", "world"),
    "other_time":  ("other", "time"),
    "world_time":  ("world", "time"),
}

FACES = {  # dropped pole -> face name (spec section 4)
    "time": "the standing",
    "world": "the exchange",
    "other": "the ground",
    "self": "the field",
}


def holders(node):
    return EDGE_TO_POLES[node["region"]]


def face(dropped_pole):
    return [k for k, (a, b) in EDGE_TO_POLES.items() if dropped_pole not in (a, b)]


def slack_edges(nodes):
    occupied = {n["region"] for n in nodes if n["region"] in POSITION_EDGE_KEYS}
    return [k for k in POSITION_EDGE_KEYS if k not in occupied]


def edge_load(nodes, key):
    # Base-formula mass only: content size. No per-edge physics tuning is
    # marked yet (spec section OPEN) -- so headroom is read against the one
    # existing dial, tether_max_stretch, as chars-of-content per edge.
    return sum(len(n["content"]) for n in nodes if n["region"] == key)


def volume(nodes, cap):
    # MIN headroom across the six edges (Kevin's mark 2026-07-27 18:11).
    return min(max(0.0, 1.0 - edge_load(nodes, k) / cap) for k in POSITION_EDGE_KEYS)


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {"board_state": "settled", "nodes": []}


def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2), encoding="utf-8")


def cmd_place(args):
    state = load_state()
    if args.edge not in POSITION_EDGE_KEYS:
        raise SystemExit(f"[deny] unknown position-edge: {args.edge!r} (one of {POSITION_EDGE_KEYS})")
    for n in state["nodes"]:
        if n["id"] == args.id:
            n["region"] = args.edge
            n["content"] = args.content or n["content"]
            n["provenance"].append({"ts": now(), "moved_to": args.edge})
            break
    else:
        state["nodes"].append({
            "id": args.id,
            "content": args.content or args.id,
            "region": args.edge,
            "links": [],
            "provenance": [{"ts": now(), "placed_on": args.edge}],
        })
    save_state(state)
    print(f"[board] {args.id} on {args.edge} · holders: {'+'.join(EDGE_TO_POLES[args.edge])}")


def cmd_state(args):
    if args.source != "kevin":
        raise SystemExit("[deny] board_state flips only on a Kevin-sourced call (spec section 7). Nothing written.")
    if args.to not in ("settled", "gripped"):
        raise SystemExit("[deny] board_state is settled|gripped only.")
    state = load_state()
    state["board_state"] = args.to
    save_state(state)
    print(f"[board] board_state -> {args.to} (kevin)")


def cmd_status(args):
    state = load_state()
    nodes = state["nodes"]
    cap = json.loads((HERE / "physics.config.json").read_text())["tether_max_stretch"]
    print(f"[board] state: {state['board_state']} · {len(nodes)} node(s) · volume {volume(nodes, cap):.2f}")
    for k in POSITION_EDGE_KEYS:
        on = [n["id"] for n in nodes if n["region"] == k]
        tag = "slack" if not on else f"{len(on)}: {', '.join(on)}"
        print(f"  {k:12s} {tag}")


def now():
    return time.strftime("%Y-%m-%dT%H:%M:%S")


def cmd_render(args):
    state = load_state()
    cap = json.loads((HERE / "physics.config.json").read_text())["tether_max_stretch"]
    payload = {
        "board_state": state["board_state"],
        "nodes": state["nodes"],
        "slack": slack_edges(state["nodes"]),
        "volume": round(volume(state["nodes"], cap), 3),
        "rendered": now(),
    }
    html = TEMPLATE.replace("/*STATE*/null", json.dumps(payload))
    HTML_FILE.write_text(html, encoding="utf-8")
    print(f"[board] rendered -> {HTML_FILE.name} · {len(state['nodes'])} node(s) · volume {payload['volume']}")


TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>the tetra position-board</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#f7f5f0;color:#3a3020;font-family:'Courier New',Courier,monospace;font-size:12px;line-height:1.6;padding:20px}
.wrap{max-width:820px;margin:0 auto}
h1{font-size:16px;letter-spacing:2px;color:#1a1408;margin-bottom:4px}
.sub{font-size:10px;color:#7a6840;margin-bottom:14px}
.bar{display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap}
.pill{font-size:9px;letter-spacing:1px;border:1px solid #ccc5b0;padding:3px 10px;text-transform:uppercase;background:#eeebe3}
.pill.settled{color:#2a6a1a;background:#e8f2e4;border-color:#2a6a1a}
.pill.gripped{color:#8a2010;background:#f5e8e6;border-color:#8a2010}
.faces{display:flex;gap:0;border:1px solid #ccc5b0;background:#fff}
.f-btn{font-size:9px;padding:6px 10px;cursor:pointer;color:#7a6840;background:transparent;border:none;border-right:1px solid #ccc5b0;font-family:inherit}
.f-btn:last-child{border-right:none}
.f-btn.on{background:#e8ecf5;color:#4a5a8a;font-weight:bold}
svg{display:block;width:100%;border:1px solid #ccc5b0;background:#eeebe3;margin-bottom:12px}
.edges{display:flex;flex-direction:column;gap:8px}
.erow{border:1px solid #ccc5b0;background:#eeebe3;padding:9px 12px}
.erow.slack{opacity:0.55}
.erow.hidden{display:none}
.ek{font-size:11px;font-weight:bold;color:#1a1408}
.eh{font-size:8px;letter-spacing:1px;color:#4a5a8a;text-transform:uppercase;margin-left:8px}
.slacktag{font-size:8px;letter-spacing:1px;color:#7a5a10;margin-left:8px;text-transform:uppercase}
.node{margin-top:6px;background:#fff;border:1px solid #ccc5b0;border-left:2px solid #7a6840;padding:6px 9px;font-size:10.5px}
.nid{font-weight:bold;color:#1a1408}
.note{font-size:9px;color:#a89870;margin-top:14px;line-height:1.7}
</style>
</head>
<body>
<div class="wrap">
  <h1>THE TETRA POSITION-BOARD</h1>
  <div class="sub">four poles fixed · six edges as regions · holder derived, never stored · this render reads, it cannot flip board_state (spec section 7)</div>
  <div class="bar">
    <span class="pill" id="bstate"></span>
    <span class="pill" id="vol"></span>
    <div class="faces" id="faces"></div>
  </div>
  <svg viewBox="0 0 560 300" id="tetra"></svg>
  <div class="edges" id="edges"></div>
  <div class="note">slack edges are dimmed — a member carrying no tension, visible by node-count (spec section 5). volume is MIN headroom across the six edges (Kevin's mark 2026-07-27). placing a node: python position_board.py place --id X --edge self_other --content "...". flipping board_state: python position_board.py state --to gripped --source kevin — no other path exists.</div>
</div>
<script>
const STATE = /*STATE*/null;
const EDGE_TO_POLES = {self_other:["self","other"],self_world:["self","world"],self_time:["self","time"],other_world:["other","world"],other_time:["other","time"],world_time:["world","time"]};
const EDGE_READS = {self_other:"what stands between you and a counterparty",self_world:"what ground you're on",self_time:"what's running against you",other_world:"their capacity, not their obligation",other_time:"their clock",world_time:"the field moving regardless of anyone"};
const FACES = {all:"whole board",time:"the standing (drop time)",world:"the exchange (drop world)",other:"the ground (drop other)",self:"the field (drop self)"};
const P = {self:[280,38],other:[60,262],world:[500,262],time:[280,168]};
let currentFace = "all";
function visibleEdges(){
  if(currentFace==="all") return Object.keys(EDGE_TO_POLES);
  return Object.keys(EDGE_TO_POLES).filter(k=>!EDGE_TO_POLES[k].includes(currentFace));
}
function draw(){
  document.getElementById("bstate").textContent = "board: "+STATE.board_state;
  document.getElementById("bstate").className = "pill "+STATE.board_state;
  document.getElementById("vol").textContent = "volume "+STATE.volume;
  const fdiv=document.getElementById("faces");fdiv.innerHTML="";
  Object.keys(FACES).forEach(f=>{
    const b=document.createElement("button");b.className="f-btn"+(currentFace===f?" on":"");
    b.textContent=FACES[f];b.onclick=()=>{currentFace=f;draw();};fdiv.appendChild(b);
  });
  const vis=visibleEdges();
  const svg=document.getElementById("tetra");let s="";
  Object.keys(EDGE_TO_POLES).forEach(k=>{
    const [a,b]=EDGE_TO_POLES[k];const [x1,y1]=P[a],[x2,y2]=P[b];
    const slack=STATE.slack.includes(k);const on=vis.includes(k);
    s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${on?(slack?"#ccc5b0":"#3a3020"):"#eae6dc"}" stroke-width="${slack?1.2:2}" ${slack?'stroke-dasharray="5,4"':''}/>`;
    if(on){const n=STATE.nodes.filter(n=>n.region===k).length;
      if(n) s+=`<circle cx="${(x1+x2)/2}" cy="${(y1+y2)/2}" r="9" fill="#1a1408"/><text x="${(x1+x2)/2}" y="${(y1+y2)/2+3.5}" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle" font-family="Courier New,monospace">${n}</text>`;}
  });
  Object.keys(P).forEach(p=>{
    const dropped = currentFace!=="all" && currentFace===p;
    s+=`<circle cx="${P[p][0]}" cy="${P[p][1]}" r="13" fill="${dropped?"#f7f5f0":"#eeebe3"}" stroke="${dropped?"#ccc5b0":"#1a1408"}" stroke-width="1.5" ${dropped?'stroke-dasharray="3,3"':''}/>`;
    s+=`<text x="${P[p][0]}" y="${P[p][1]-18}" font-size="11" font-weight="bold" fill="${dropped?"#a89870":"#1a1408"}" text-anchor="middle" font-family="Courier New,monospace">${p.toUpperCase()}</text>`;
  });
  svg.innerHTML=s;
  const ed=document.getElementById("edges");ed.innerHTML="";
  Object.keys(EDGE_TO_POLES).forEach(k=>{
    const slack=STATE.slack.includes(k);
    const row=document.createElement("div");
    row.className="erow"+(slack?" slack":"")+(vis.includes(k)?"":" hidden");
    let h=`<span class="ek">${k}</span><span class="eh">holders: ${EDGE_TO_POLES[k].join(" + ")}</span>`;
    if(slack)h+=`<span class="slacktag">slack</span>`;
    h+=`<div style="font-size:9px;color:#7a6840;margin-top:2px">${EDGE_READS[k]}</div>`;
    STATE.nodes.filter(n=>n.region===k).forEach(n=>{
      h+=`<div class="node"><span class="nid">${n.id}</span> — ${n.content}</div>`;
    });
    row.innerHTML=h;ed.appendChild(row);
  });
}
draw();
</script>
</body>
</html>
"""


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    sp = sub.add_parser("place")
    sp.add_argument("--id", required=True)
    sp.add_argument("--edge", required=True)
    sp.add_argument("--content", default=None)
    sp.set_defaults(fn=cmd_place)
    ss = sub.add_parser("state")
    ss.add_argument("--to", required=True)
    ss.add_argument("--source", required=True)
    ss.set_defaults(fn=cmd_state)
    st = sub.add_parser("status")
    st.set_defaults(fn=cmd_status)
    sr = sub.add_parser("render")
    sr.set_defaults(fn=cmd_render)
    args = p.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
