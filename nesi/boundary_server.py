#!/usr/bin/env python3
"""
THE BOUNDARY — type-in surface (a tiny local server).

A real, usable page where Kevin adds his edges and watches them accumulate. It
writes to the SAME store the command-line uses (nesi/boundary/log.jsonl, via
boundary.py) — one memory, no drift. Runs only on 127.0.0.1 (your machine, no
network). Stdlib only.

Run:  python nesi/boundary_server.py     (opens the page in your browser)
      or double-click nesi/BOUNDARY.bat
"""
import json
import sys
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parent

sys.path.insert(0, str(NESI / "conductor"))
import boundary  # the real organ — the type-in writes through THIS
import sharedmap  # the outward half — renders the page you hand to one person

HOST, PORT = "127.0.0.1", 8765

PAGE = r"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Who I am to you</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#f7f5f0;--sf:#eeebe3;--card:#fffef9;--g:#3a3020;--gb:#1a1408;--gd:#7a6840;--gf:#a89870;--gfaint:#e2ddce;--bdr:#ccc5b0;--red:#8a2010}
body{background:var(--bg);color:var(--g);font-family:Georgia,'Times New Roman',serif;display:flex;justify-content:center;padding:34px 18px 70px;min-height:100vh}
.page{width:100%;max-width:600px}
.eye{font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:var(--gf);text-transform:uppercase;margin-bottom:8px}
h1{font-size:26px;font-weight:normal;color:var(--gb);margin-bottom:4px}
.sub{font-size:13px;color:var(--gd);font-style:italic;line-height:1.55;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--bdr)}
.grp{font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;color:var(--gd);text-transform:uppercase;margin:6px 0 18px;padding-bottom:5px;border-bottom:1px solid var(--gfaint)}
select.terms{width:100%;font-family:'Courier New',monospace;font-size:11px;color:var(--gd);border:1px solid var(--bdr);background:var(--card);padding:9px 11px}
select.terms:focus{outline:none;border-color:var(--gd)}
.entry .tag{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:var(--gd);border:1px solid var(--gfaint);background:var(--sf);padding:1px 6px;text-transform:uppercase;margin-right:6px}
.reg{margin-bottom:30px}
.reg-h{font-size:20px;color:var(--gb);margin-bottom:2px}
.reg-law{font-family:'Courier New',monospace;font-size:10px;letter-spacing:1px;color:var(--gf);text-transform:uppercase;margin-bottom:12px}
.row{display:flex;gap:8px;margin-bottom:6px}
input,button{font-family:inherit;font-size:14px;color:var(--gb);border:1px solid var(--bdr);background:var(--card);padding:10px 12px}
input{flex:1}
input:focus{outline:none;border-color:var(--gd)}
button{font-family:'Courier New',monospace;font-size:12px;letter-spacing:1px;background:var(--sf);cursor:pointer;white-space:nowrap}
button:hover{background:var(--gfaint)}
.list{display:flex;flex-direction:column;gap:0;margin-top:8px}
.entry{padding:12px 0;border-bottom:1px solid var(--gfaint);display:flex;gap:12px;align-items:flex-start}
.entry .t{flex:1;font-size:16px;color:var(--gb);line-height:1.5}
.entry .x{font-family:'Courier New',monospace;font-size:10px;color:var(--gf);cursor:pointer;flex-shrink:0;padding:2px 4px}
.entry .x:hover{color:var(--red)}
.empty{font-size:13px;color:var(--gf);font-style:italic;padding:6px 0}
.foot{font-family:'Courier New',monospace;font-size:9px;letter-spacing:1px;color:var(--gf);margin-top:14px;padding-top:14px;border-top:1px solid var(--bdr);line-height:1.9}
.handover{background:var(--sf);border:1px solid var(--bdr);padding:20px 22px;margin-top:14px}
.hnote{font-size:13px;color:var(--gd);font-style:italic;line-height:1.6;margin:10px 0}
.path{font-family:'Courier New',monospace;font-size:11px;font-style:normal;color:var(--gb);word-break:break-all}
a.open{font-family:'Courier New',monospace;font-size:12px;letter-spacing:1px;color:var(--gb);background:var(--card);border:1px solid var(--bdr);padding:10px 12px;text-decoration:none}
a.open:hover{background:var(--gfaint)}
</style></head><body><div class="page">
<div class="eye">NESI · what it remembers of me</div>
<h1>Who I am to you</h1>
<div class="sub">This is a standing place, not a message. You fill it facing nobody — so that when you later hand someone a map of it, an offer is just a fact about you and not a move in that relationship. Negotiate each once, with yourself, and you never decide them under pressure. Nothing fills this but you.</div>

<div id="regs"></div>

<div class="handover">
  <div class="grp" style="margin-top:0">hand it to someone</div>
  <div class="reg-h">A map for one person</div>
  <div class="reg-law">the load named · what routes freely separated from what needs a yes</div>
  <div class="hnote">Instead of escalating something informal into a structure just to get one straight question asked: hand over the whole picture. Their side — what answering would cost them — stays theirs and never comes back to you.</div>
  <div class="row"><input type="text" id="who" placeholder="their name…" autocomplete="off"><button id="mk">make the map</button></div>
  <div id="mapout"></div>
</div>

<div class="foot">boundary = a no that doesn't move · need = a requirement · want = movable · load = a cost in its own units, never a price · a withdrawn entry stays in history · nothing keeps a score</div>
</div>
<script>
const REGS=[
  {r:"load",g:"where i'm at right now",h:"What I'm carrying",law:"in its own units — a cost, never a price · this is not a bill",ph:"what this is actually costing you…"},
  {r:"schedule",g:"where i'm at right now",h:"Time and duration",law:"a named duration is what makes an ask bounded",ph:"when you're here, when you go, what's open…"},
  {r:"ask",g:"where i'm at right now",h:"What I'm asking",law:"say what it rests on — an ask can't be smaller than its own footprint",ph:"the ask itself…",rests:true},
  {r:"boundary",g:"who i am",h:"Where I end",law:"these do not move — a no is not a negotiation",ph:"an edge — where you end…"},
  {r:"need",g:"who i am",h:"What I require",law:"what has to be true for me to be well, or to say yes",ph:"a need — what you require…"},
  {r:"want",g:"who i am",h:"What I'm drawn to",law:"movable · no obligation · yours to pursue or not",ph:"a want — what you're drawn to…"},
  {r:"capacity",g:"what i have and don't",h:"What I'm able to do",law:"true whether or not anyone asks · not a promise, not an offer",ph:"something you're able to do…"},
  {r:"lack",g:"what i have and don't",h:"What I don't have",law:"named plainly, no claim attached · a lack is not an ask",ph:"something you don't have…"},
  {r:"library",g:"what i have and don't",h:"My library",law:"what I make available to read or take",ph:"something from my library…"},
  {r:"offer",g:"what's available from me",h:"What's available",law:"say which it is — never blended",ph:"an offer — what's available now…",terms:true},
  {r:"opening",g:"what's available from me",h:"Open to build together",law:"where I'm open to make something with someone",ph:"a collaborative opening…"}
];
const ROOT=document.getElementById('regs');
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;');}
let lastG=null;
REGS.forEach(g=>{
  if(g.g!==lastG){const gh=document.createElement('div');gh.className='grp';gh.textContent=g.g;ROOT.appendChild(gh);lastG=g.g;}
  const sec=document.createElement('div');sec.className='reg';
  let termsSel='';
  if(g.terms){termsSel='<select class="terms"><option value="gift">a gift — nothing owed</option><option value="exchange">an exchange — something for something, bounded</option><option value="transaction">a transaction — a price</option></select>';}
  sec.innerHTML='<div class="reg-h">'+g.h+'</div><div class="reg-law">'+g.law+'</div>'
    +(termsSel?'<div class="row">'+termsSel+'</div>':'')
    +'<div class="row"><input type="text" placeholder="'+g.ph+'" autocomplete="off"><button>hold it</button></div>'
    +(g.rests?'<div class="row"><input type="text" class="rests" placeholder="…and what it rests on: ground, water, someone\'s comfort, a duration" autocomplete="off"></div>':'')
    +'<div class="list" id="list-'+g.r+'"></div>';
  const inp=sec.querySelector('input'), btn=sec.querySelector('button'), tsel=sec.querySelector('.terms');
  const rests=sec.querySelector('.rests');
  const add=async()=>{const edge=inp.value.trim();if(!edge)return;
    const body={edge,register:g.r}; if(tsel)body.kind=tsel.value;
    if(rests&&rests.value.trim())body.kind='rests on: '+rests.value.trim();
    const res=await fetch('/api/add',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    inp.value='';if(rests)rests.value='';inp.focus();paint(await res.json());};
  btn.onclick=add; inp.addEventListener('keydown',e=>{if(e.key==='Enter')add();});
  ROOT.appendChild(sec);
});
function paint(list){
  REGS.forEach(g=>{
    const el=document.getElementById('list-'+g.r);
    const items=list.filter(e=>e.register===g.r);
    if(!items.length){el.innerHTML='<div class="empty">nothing held here yet — yours to fill</div>';return;}
    el.innerHTML='';
    items.forEach(e=>{
      const d=document.createElement('div');d.className='entry';
      const tag=e.kind?'<span class="tag">'+esc(e.kind)+'</span> ':'';
      d.innerHTML='<div class="t">'+tag+esc(e.edge)+'</div><div class="x" title="withdraw (kept in history)">withdraw</div>';
      d.querySelector('.x').onclick=async()=>{const r=await fetch('/api/withdraw',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:e.id})});paint(await r.json());};
      el.appendChild(d);
    });
  });
}
document.getElementById('mk').onclick=async()=>{
  const who=document.getElementById('who').value.trim();
  const out=document.getElementById('mapout');
  if(!who){out.innerHTML='<div class="hnote">give it a name — a map is addressed to one person</div>';return;}
  const r=await fetch('/api/map',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({who})});
  const d=await r.json();
  if(d.empty){out.innerHTML='<div class="hnote">the map came out empty — it holds only what you put above. Add what you\'re carrying, where you end, and what you\'re asking, then make it again.</div>';return;}
  out.innerHTML='<div class="hnote">written to <span class="path">'+esc(d.path)+'</span></div>'
    +'<div class="row"><a class="open" href="'+d.url+'" target="_blank">open the map for '+esc(who)+'</a></div>'
    +'<div class="hnote">routes freely: '+d.free+' · needs a real yes: '+d.yes+' · context, nothing to answer: '+d.context+'  <em>(this line is for you — it never appears on the page they read)</em></div>';
};
(async()=>{const r=await fetch('/api/edges');paint(await r.json());})();
</script></body></html>"""


class H(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype="application/json"):
        b = body if isinstance(body, bytes) else body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def _json_body(self):
        n = int(self.headers.get("Content-Length", 0) or 0)
        if not n:
            return {}
        try:
            return json.loads(self.rfile.read(n).decode("utf-8"))
        except Exception:
            return {}

    def do_GET(self):
        if self.path == "/" or self.path.startswith("/index"):
            self._send(200, PAGE, "text/html; charset=utf-8")
        elif self.path == "/api/edges":
            self._send(200, json.dumps(boundary.edges()))
        elif self.path.startswith("/map"):
            # serve the handed-over map straight from the store, so Kevin can read
            # exactly what the other person will read before he sends it
            from urllib.parse import parse_qs, urlparse
            who = (parse_qs(urlparse(self.path).query).get("for", [""])[0] or "you")
            _p, html, _c = sharedmap.render_for(who, write=False)
            self._send(200, html, "text/html; charset=utf-8")
        else:
            self._send(404, json.dumps({"error": "not found"}))

    def do_POST(self):
        d = self._json_body()
        if self.path == "/api/add":
            try:
                boundary.add((d.get("edge") or "").strip(),
                             register=(d.get("register") or "boundary").strip() or "boundary",
                             kind=(d.get("kind") or "").strip() or None)
            except ValueError:
                pass  # NESI never authors an empty entry; ignore blanks
        elif self.path == "/api/withdraw":
            if d.get("id"):
                boundary.withdraw(str(d["id"]))
        elif self.path == "/api/map":
            from urllib.parse import quote
            who = (d.get("who") or "").strip() or "you"
            path, _html, counts = sharedmap.render_for(who)
            self._send(200, json.dumps({
                "path": str(path),
                "url": "/map?for=" + quote(who),
                "empty": sum(counts.values()) == 0,
                "free": counts.get("free", 0),
                "yes": counts.get("yes", 0),
                "context": counts.get("context", 0),
            }))
            return
        else:
            self._send(404, json.dumps({"error": "not found"}))
            return
        boundary.render()  # keep the hold-up page current
        self._send(200, json.dumps(boundary.edges()))

    def log_message(self, *a):
        pass  # quiet


def run(open_browser=True):
    srv = ThreadingHTTPServer((HOST, PORT), H)
    url = f"http://{HOST}:{PORT}/"
    print(f"NESI · your boundary is open at {url}")
    print("(this runs only on your machine. close this window to stop it.)")
    if open_browser:
        try:
            webbrowser.open(url)
        except Exception:
            pass
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    run(open_browser="--noopen" not in sys.argv)
