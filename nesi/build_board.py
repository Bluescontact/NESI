#!/usr/bin/env python3
"""
BUILD THE BOARD — regenerate nesi/board.html from the LIVE stores.

NESI v2, pass 4 (the wire). The board is a rendered surface; this is the bridge
that makes it show real state. It reads the forest (embers), and can be re-run any
time the stores change (or at launch, by the launcher). The board itself stays a
plain file the browser renders — no runtime web server needed.

Show the shape, speak plainly: this writes game words + visible geometry, never
framework language, onto the surface.

Stdlib only. Frozen-aware (reads stores next to the exe when packaged).
Run:  python build_board.py   ->   writes nesi/board.html and prints the ember count.
"""
import json
import sys
from html import escape as _esc
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parent

sys.path.insert(0, str(NESI / "conductor"))
FOREST = NESI / "forest"
BOARD = NESI / "board.html"

# glow positions in the canopy — the embers sit where they grew (visible geometry)
SPOTS = [[336, 150], [452, 140], [400, 196], [300, 182], [496, 178], [370, 120],
         [340, 116], [462, 200], [408, 108], [286, 150], [514, 148], [378, 210]]


def read_embers():
    """Live read of the forest store. Returns a list of {t: true_thing}. No score,
    no rank — order is arrival (filename is timestamp-prefixed), never worth."""
    out = []
    if FOREST.exists():
        for f in sorted(FOREST.glob("*.json")):
            try:
                g = json.loads(f.read_text(encoding="utf-8"))
            except Exception:
                continue
            t = str(g.get("true_thing", "")).strip()
            if t:
                out.append({"t": t})
    return out


TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NESI</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f7f5f0;--sf:#eeebe3;--sf2:#e6e2d8;
  --g:#3a3020;--gb:#1a1408;--gd:#7a6840;--gf:#a89870;--gfaint:#e2ddce;
  --bdr:#ccc5b0;
  --soil:#8a6a44;--soil-bg:#efe6d6;
  --leaf:#5f7a3a;--bark:#7a6244;
  --ember:#c0501f;--ember-glow:#e8863f;--ember-bg:#f7ece2;
  --pulse:#2a6a5a;
}
html,body{height:100%}
body{background:var(--bg);color:var(--g);font-family:Georgia,'Times New Roman',serif;
  display:flex;flex-direction:column;align-items:center;padding:26px 18px 40px;min-height:100%}
.top{width:100%;max-width:760px;display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1px solid var(--bdr);padding-bottom:10px;margin-bottom:6px}
.name{font-size:22px;letter-spacing:4px;color:var(--gb);font-family:'Courier New',monospace}
.tag{font-size:12px;color:var(--gd);font-style:italic}
.hint{width:100%;max-width:760px;font-size:12px;color:var(--gd);margin:2px 0 6px;font-style:italic}
.board{width:100%;max-width:760px}
svg{width:100%;height:auto;display:block}
.lab{font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;fill:var(--gd)}
.lab-b{font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;fill:var(--gb);font-weight:bold}
.plain{font-family:Georgia,serif;font-size:12px;fill:var(--gd);font-style:italic}
.ember{cursor:pointer;transition:transform .15s}
.ember:hover{transform:translateY(-2px)}
@keyframes breathe{0%,100%{opacity:.55}50%{opacity:1}}
.pulse-dot{animation:breathe 3.2s ease-in-out infinite}

/* THE ROUND — merged directly from play.html. Same file, same localStorage key,
   so playing IS how an ember grows here — not a separate app reporting a number. */
.round{width:100%;max-width:760px;margin-top:18px;border:1px solid var(--bdr);background:#fff;padding:18px 20px}
.round-step{margin-top:18px}
.round-step:first-child{margin-top:0}
.step-n{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:var(--gd);text-transform:uppercase;margin-bottom:6px}
.step-h{font-size:16px;color:var(--gb);margin-bottom:4px}
.step-say{font-size:12px;color:var(--gd);line-height:1.55;margin-bottom:10px}
.row{display:flex;gap:8px}
input[type=text],textarea{flex:1;font-family:Georgia,serif;font-size:14px;color:var(--gb);background:var(--bg);
  border:1px solid var(--bdr);padding:9px 11px;width:100%}
textarea{min-height:64px;resize:vertical;line-height:1.5}
input:focus,textarea:focus{outline:none;border-color:var(--gd)}
.round button{font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:var(--gb);background:var(--sf);
  border:1px solid var(--gd);padding:9px 14px;cursor:pointer;white-space:nowrap}
.round button:hover{background:var(--sf2)}
.round button.quiet{border-color:var(--bdr);color:var(--gd);background:none}
.round button.warm{border-color:var(--ember);color:var(--ember)}
.pile{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.piece{font-size:13px;background:var(--bg);border:1px solid var(--bdr);padding:7px 11px;cursor:pointer;transition:all .15s;position:relative}
.piece:hover{border-color:var(--gd)}
.piece.warm{border-color:var(--ember);background:var(--ember-bg);color:var(--gb);box-shadow:0 0 0 1px var(--ember)}
.piece .x{color:var(--gf);margin-left:8px;font-family:monospace}
.hint2{font-size:11px;color:var(--gf);font-style:italic;margin-top:8px}
.hidden{display:none}
.thread{background:var(--bg);border:1px solid var(--ember);border-left:3px solid var(--ember);padding:14px;margin-top:12px}
.thread-q{font-size:12px;color:var(--gd);margin-bottom:8px}
.acts{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.done-msg{font-size:14px;color:var(--leaf);font-style:italic;margin-top:10px;line-height:1.5}

.rail{width:100%;max-width:760px;margin-top:16px;border:1px solid var(--bdr);background:#fff;
  padding:0;min-height:0;overflow:hidden;transition:min-height .2s}
.rail.on{min-height:96px}
.rail-inner{display:none;padding:16px 18px}
.rail.on .rail-inner{display:block}
.rail-lab{font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:var(--ember);
  text-transform:uppercase;margin-bottom:7px}
.rail-txt{font-size:16px;color:var(--gb);line-height:1.5}
.rail-act{margin-top:12px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:var(--gd)}
.rail-act b{color:var(--ember);cursor:pointer}
.given{color:var(--leaf)!important}
.empty{width:100%;max-width:760px;text-align:center;color:var(--gf);font-style:italic;font-size:13px;margin-top:14px}
.held{width:100%;max-width:760px;margin-top:16px}
.held-lab{font-family:'Courier New',monospace;font-size:10px;letter-spacing:1.5px;color:var(--gd);text-transform:uppercase;margin-bottom:7px}
.held-item{display:flex;gap:10px;padding:5px 0;border-top:1px solid var(--gfaint);font-size:12px}
.held-item:first-of-type{border-top:none}
.held-item .ht{flex:1;color:var(--gb)}
.held-item .hg{flex:1;color:var(--gd);font-style:italic}
.returns{width:100%;max-width:760px;margin-top:12px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:1px;color:var(--gf)}
.signs{width:100%;max-width:760px;margin-top:18px;border-top:1px solid var(--bdr);padding-top:14px}
.signs-lab{font-family:'Courier New',monospace;font-size:10px;letter-spacing:1.5px;color:var(--gd);text-transform:uppercase;margin-bottom:9px}
.gauges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:11px}
.gauge{font-family:'Courier New',monospace;font-size:9px;border:1px solid var(--bdr);background:#fff;padding:3px 8px;color:var(--gd)}
.gauge b{color:var(--gb)}
.membrane{font-size:12px;color:var(--g);line-height:1.6;margin-bottom:9px;font-style:italic}
.cats{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:11px;font-family:'Courier New',monospace;font-size:9px}
.cat{border:1px solid var(--gfaint);background:var(--sf);padding:2px 7px;color:var(--gd)}
.cat b{color:var(--gb)}
.reach{font-size:12px;color:var(--gb);line-height:1.5}
.reach .rl{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:var(--gf);display:block;margin-bottom:3px}
.foot{width:100%;max-width:760px;margin-top:20px;padding-top:12px;border-top:1px solid var(--bdr);
  font-family:'Courier New',monospace;font-size:10px;color:var(--gf);letter-spacing:1px;line-height:1.8;display:flex;flex-wrap:wrap;gap:6px 20px}
.foot b{color:var(--gd)}
</style>
</head>
<body>
  <div class="top">
    <div class="name">NESI</div>
    <div class="tag">a game you play with pieces of your own life</div>
  </div>
  <div class="hint">You're looking at the whole thing. Things come in at the way-in, settle into the soil, and grow into embers you can pick up and hand on. <b>Play a round below — it grows right here, on this board, immediately.</b></div>

  <div class="board">
    <svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" aria-label="The NESI board">
      <rect x="0" y="0" width="760" height="430" fill="var(--bg)"/>
      <rect x="0" y="352" width="760" height="78" fill="var(--soil-bg)"/>
      <line x1="0" y1="352" x2="760" y2="352" stroke="var(--soil)" stroke-width="1" opacity="0.5"/>
      <text x="20" y="398" class="lab">THE SOIL</text>
      <text x="20" y="414" class="plain">where what comes in breaks down</text>
      <g>
        <path d="M690 250 q40 -6 40 40 q0 46 -40 40" fill="none" stroke="var(--gd)" stroke-width="1.5" opacity="0.7"/>
        <circle cx="712" cy="290" r="3.5" fill="var(--gd)"/>
        <circle cx="726" cy="278" r="2.5" fill="var(--gf)"/>
        <circle cx="726" cy="303" r="2.5" fill="var(--gf)"/>
        <text x="700" y="240" class="lab" text-anchor="middle">THE WAY IN</text>
        <text x="700" y="345" class="plain" text-anchor="middle">others drop in here</text>
        <path d="M708 300 q-30 30 -60 52" fill="none" stroke="var(--gf)" stroke-width="1" stroke-dasharray="2 4" opacity="0.6"/>
      </g>
      <g transform="translate(150,300)">
        <polygon points="0,-26 23,13 -23,13" fill="none" stroke="var(--pulse)" stroke-width="1.3" opacity="0.85"/>
        <polygon points="0,26 -23,-13 23,-13" fill="none" stroke="var(--pulse)" stroke-width="1.3" opacity="0.45"/>
        <circle class="pulse-dot" cx="0" cy="0" r="5.5" fill="var(--pulse)"/>
        <text x="0" y="52" class="lab" text-anchor="middle">THE PULSE</text>
        <text x="0" y="68" class="plain" text-anchor="middle">the quiet heartbeat</text>
      </g>
      <g>
        <path d="M400 352 C398 300 402 270 400 234" stroke="var(--bark)" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M400 262 C360 250 330 232 305 214" stroke="var(--bark)" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M400 250 C444 240 476 222 500 206" stroke="var(--bark)" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M400 238 C392 214 396 196 402 176" stroke="var(--bark)" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="400" cy="176" rx="150" ry="86" fill="var(--leaf)" opacity="0.13"/>
        <ellipse cx="400" cy="176" rx="150" ry="86" fill="none" stroke="var(--leaf)" stroke-width="1" opacity="0.4"/>
        <text x="400" y="70" class="lab-b" text-anchor="middle">THE FOREST</text>
        <text x="400" y="86" class="plain" text-anchor="middle" id="hwCaption">the embers grow here — play a round below</text>
        <g id="embers"></g>
      </g>
    </svg>
  </div>

  <!-- THE ROUND — real mechanic, merged in from play.html. Writes to the SAME
       localStorage key the SVG forest above reads. Playing = growing. -->
  <div class="round">
    <div class="round-step" id="s1">
      <div class="step-n">1 · empty your pockets</div>
      <div class="step-h">Put down a handful of things.</div>
      <div class="step-say">Things you did, made, fixed, gave, or got through lately. Don't sort them, don't rank them — just lay them where you can see them.</div>
      <div class="row">
        <input type="text" id="pieceInput" placeholder="something from your life lately…" autocomplete="off">
        <button id="addBtn">put it down</button>
      </div>
      <div class="pile" id="pile"></div>
      <div class="hint2" id="s1hint"></div>
    </div>

    <div class="round-step hidden" id="s2">
      <div class="step-n">2 · feel for the warm one</div>
      <div class="step-h">Which one has a little heat on it?</div>
      <div class="step-say">Click the one you keep coming back to. You don't have to explain why. And if none is warm today, that's a real round too.</div>
      <button class="quiet" id="fallowBtn">nothing's warm today — let it go</button>
    </div>

    <div class="round-step hidden" id="s3">
      <div class="step-n">3 · pull the thread</div>
      <div class="step-h">Write one small true thing.</div>
      <div class="thread">
        <div class="thread-q">Take the warm one — "<span id="warmEcho"></span>". What did you do that someone else couldn't have — or couldn't, until you showed them how? No wrong answers, no one is marking this.</div>
        <textarea id="threadText" placeholder="one small true thing, in your own words…"></textarea>
        <div class="acts">
          <button class="warm" id="keepBtn">keep it</button>
          <button id="handBtn">hand it over</button>
        </div>
        <div class="done-msg hidden" id="doneMsg"></div>
      </div>
    </div>

    <div class="round-step hidden" id="s5">
      <button class="quiet" id="letGoBtn">let go — put the round down</button>
    </div>
  </div>

  <div class="held" id="held">__HELD_HTML__</div>
  <div class="returns" id="returns">__RETURNS_HTML__</div>

  <div class="signs" id="signs">__SIGNS_HTML__</div>

  <div class="rail" id="rail">
    <div class="rail-inner">
      <div class="rail-lab">an ember, picked up</div>
      <div class="rail-txt" id="rail-txt"></div>
      <div class="rail-act" id="rail-act"></div>
    </div>
  </div>
  <div class="empty" id="empty" style="display:none">the grove is quiet right now — nothing is warm today, and that's a real round too.</div>

  <div class="foot">
    <span><b>no score.</b> nothing here keeps count.</span>
    <span><b>the way in</b> stays yours — nobody enters but on your mark.</span>
    <span><b>embers</b> · <span id="ecount">0</span> grown</span>
  </div>

<script>
// ONE store, shared by the round and the board's forest render — the fix for
// "playing a round doesn't show up on the board." Same key play.html used.
const KEY = "nesi.embers.v1";
const SPOTS = [[336, 150], [452, 140], [400, 196], [300, 182], [496, 178], [370, 120],
               [340, 116], [462, 200], [408, 108], [286, 150], [514, 148], [378, 210]];
const NS = "http://www.w3.org/2000/svg";

function loadEmbers(){ try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e){ return []; } }
function saveEmbers(list){ try { localStorage.setItem(KEY, JSON.stringify(list)); } catch(e){} }

// --- render the SVG forest from the live store (no Python baking needed to see it) ---
function renderForest(){
  const list = loadEmbers();
  const g = document.getElementById('embers');
  g.innerHTML = "";
  list.forEach((e,i)=>{
    const [x,y] = SPOTS[i % SPOTS.length];
    const grp = document.createElementNS(NS,'g');
    grp.setAttribute('class','ember'); grp.setAttribute('tabindex','0');
    const halo = document.createElementNS(NS,'circle');
    halo.setAttribute('cx',x); halo.setAttribute('cy',y); halo.setAttribute('r',10);
    halo.setAttribute('fill','var(--ember-glow)'); halo.setAttribute('opacity','0.28');
    const dot = document.createElementNS(NS,'circle');
    dot.setAttribute('cx',x); dot.setAttribute('cy',y); dot.setAttribute('r',5.5);
    dot.setAttribute('fill','var(--ember)');
    grp.appendChild(halo); grp.appendChild(dot);
    grp.addEventListener('click',()=>pickUp(i, list));
    grp.addEventListener('keydown',ev=>{if(ev.key==='Enter')pickUp(i, list);});
    g.appendChild(grp);
  });
  document.getElementById('ecount').textContent = list.length;
  document.getElementById('empty').style.display = list.length ? 'none' : 'block';
  document.getElementById('hwCaption').textContent = list.length
    ? ('the self · ' + list.length + ' embers grown')
    : 'the embers grow here — play a round below';
}
const rail=document.getElementById('rail'), rtxt=document.getElementById('rail-txt'), ract=document.getElementById('rail-act');
let openIdx=-1;
function pickUp(i, list){
  if(openIdx===i){ rail.classList.remove('on'); openIdx=-1; return; }
  openIdx=i; rtxt.textContent='"'+list[i].text+'"';
  ract.innerHTML = list[i].given
    ? '<span class="given">given — nobody owed you anything back.</span>'
    : 'kept — yours, in your own hand.';
  rail.classList.add('on');
}

// --- the round itself (moves 1-5), same logic as play.html ---
let pile = [];
let nextId = 1;
const $ = id => document.getElementById(id);
function show(id){ $(id).classList.remove("hidden"); }
function hide(id){ $(id).classList.add("hidden"); }

function renderPile(){
  const el = $("pile"); el.innerHTML = "";
  pile.forEach(p => {
    const d = document.createElement("span");
    d.className = "piece" + (p.warm ? " warm" : "");
    d.innerHTML = p.text.replace(/</g,"&lt;") + '<span class="x" title="remove">×</span>';
    d.onclick = (ev) => {
      if (ev.target.classList.contains("x")) { pile = pile.filter(x => x.id !== p.id); afterPileChange(); return; }
      pile.forEach(x => x.warm = (x.id === p.id));
      afterPileChange();
    };
    el.appendChild(d);
  });
}
function afterPileChange(){
  renderPile();
  if (pile.length >= 1) show("s2"); else hide("s2");
  const warm = pile.find(p => p.warm);
  if (warm){ $("warmEcho").textContent = warm.text; show("s3"); } else { hide("s3"); }
  $("s1hint").textContent = pile.length ? "click one to feel for the warm one · click × to drop a piece" : "";
}
$("addBtn").onclick = addPiece;
$("pieceInput").addEventListener("keydown", e => { if (e.key === "Enter") addPiece(); });
function addPiece(){
  const v = $("pieceInput").value.trim();
  if (!v) return;
  pile.push({ id: nextId++, text: v, warm: false });
  $("pieceInput").value = "";
  $("pieceInput").focus();
  afterPileChange();
}
function completeRound(given){
  const warm = pile.find(p => p.warm);
  const text = $("threadText").value.trim();
  if (!text){ $("threadText").focus(); return; }
  const list = loadEmbers();
  const now = new Date();
  list.unshift({ text, from: warm ? warm.text : "", given: !!given, when: now.toISOString().slice(0,10) });
  saveEmbers(list);
  renderForest();
  const msg = given
    ? "given. it's theirs now — nobody owes you anything back. and the grove still holds it — look up."
    : "kept. it's yours, in your own hand — and it's in the grove above.";
  $("doneMsg").textContent = "— " + msg;
  show("doneMsg");
  hide("s2");
  $("threadText").disabled = true; $("keepBtn").disabled = true; $("handBtn").disabled = true;
  show("s5");
}
$("keepBtn").onclick = () => completeRound(false);
$("handBtn").onclick = () => completeRound(true);
$("fallowBtn").onclick = () => {
  hide("s2"); hide("s3");
  $("s1hint").textContent = "nothing was warm today. that's a real round. let it be a pile, and let go.";
  show("s5");
};
$("letGoBtn").onclick = resetRound;
function resetRound(){
  pile = [];
  $("threadText").value = ""; $("threadText").disabled = false;
  $("keepBtn").disabled = false; $("handBtn").disabled = false;
  hide("doneMsg"); hide("s2"); hide("s3"); hide("s5");
  $("s1hint").textContent = "";
  renderPile();
  $("pieceInput").focus();
}

renderForest();
renderPile();
$("pieceInput").focus();
</script>
</body>
</html>
"""


def regenerate():
    # migration pass B: pull the LIVE organ data (embers · heartwood/the tree ·
    # held · returns). Guarded — if the data layer is unavailable, fall back to
    # embers-only so the surface never breaks.
    try:
        import v2_board_data
        data = v2_board_data.collect()
    except Exception:
        data = {"embers": read_embers(), "heartwood": {"patterns": 0, "crossings": 0, "rings": []},
                "held": [], "returns": []}
    embers = data["embers"]
    hw = data["heartwood"]
    held = data["held"]
    returns = data["returns"]

    # the tree's growth rings — one faint ring per crossing-month (real heartwood data)
    n = max(1, min(6, len(hw["rings"]))) if hw["crossings"] else 0
    rings_svg = "".join(
        f'<ellipse cx="400" cy="176" rx="{30 + i*20}" ry="{18 + i*11}" fill="none" '
        f'stroke="var(--bark)" stroke-width="1" opacity="{max(0.08, 0.34 - i*0.05):.2f}"/>'
        for i in range(n)
    )
    hw_caption = (
        f'the self · {hw["patterns"]} patterns · {hw["crossings"]} crossings'
        + (f' · rings: {", ".join(hw["rings"])}' if hw["rings"] else '')
    ) if hw["patterns"] else 'the embers grow here — pick one up'

    if held:
        items = "".join(
            f'<div class="held-item"><span class="ht">{_esc(h["title"])}</span>'
            f'<span class="hg">{_esc(h["gap"]) or "—"}</span></div>' for h in held)
        held_html = (f'<div class="held-lab">what you\'re holding — {len(held)}, '
                     f'each with its open edge</div>{items}')
    else:
        held_html = '<div class="held-lab">nothing held right now</div>'

    returns_html = (f'come back · {len(returns)} have returned to you'
                    if returns else
                    'come back · quiet — nothing has anchored a return right now')

    # pass C — the body's signs: the door (glance) · the membrane (skin + tension) · the reach-back
    signs = data.get("signs", {}) or {}
    signs_html = ""
    gauges = signs.get("gauges", [])
    if gauges:
        chips = "".join(f'<span class="gauge">{_esc(g["name"])} · <b>{_esc(g["state"])}</b></span>'
                        for g in gauges if g.get("name"))
        signs_html += f'<div class="signs-lab">the door reads</div><div class="gauges">{chips}</div>'
    if signs.get("skin_law"):
        signs_html += f'<div class="membrane">the membrane holds — {_esc(signs["skin_law"])}</div>'
    # SKIN v1 (2026-08-30): the metabolic reading — the boundary's live line
    if signs.get("metabolism"):
        signs_html += f'<div class="membrane">{_esc(signs["metabolism"])}</div>'
    cats = signs.get("categories", {})
    if cats:
        cchips = "".join(f'<span class="cat">{_esc(k)} · <b>{v}</b></span>' for k, v in cats.items())
        signs_html += f'<div class="cats">{cchips}</div>'
    wm = signs.get("worth_marked", 0)
    worth_line = (f'what carries charge · {wm} in your own hand'
                  if wm else
                  'what carries charge · surface-and-mark ready — you mark, no one else, no score')
    signs_html += f'<div class="membrane" style="font-style:normal;color:var(--gd)">{_esc(worth_line)}</div>'
    if signs.get("reach"):
        signs_html += (f'<div class="reach"><span class="rl">the reach-back asks</span>'
                       f'{_esc(signs["reach"])}</div>')
    if not signs_html:
        signs_html = '<div class="signs-lab">the body is quiet</div>'

    html = (TEMPLATE
            .replace("__EMBERS_JSON__", json.dumps(embers, ensure_ascii=False))
            .replace("__SPOTS_JSON__", json.dumps(SPOTS))
            .replace("__RINGS_SVG__", rings_svg)
            .replace("__HW_CAPTION__", _esc(hw_caption))
            .replace("__HELD_HTML__", held_html)
            .replace("__RETURNS_HTML__", _esc(returns_html))
            .replace("__SIGNS_HTML__", signs_html))
    BOARD.write_text(html, encoding="utf-8")
    return {"embers": len(embers), "held": len(held), "crossings": hw["crossings"],
            "returns": len(returns), "gauges": len(signs.get("gauges", []))}


if __name__ == "__main__":
    d = regenerate()
    print(f"board regenerated from live organs -> {BOARD}\n  "
          f"embers: {d['embers']} | held: {d['held']} | crossings: {d['crossings']} | returns: {d['returns']}")
