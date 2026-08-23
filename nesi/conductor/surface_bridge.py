"""NESI SURFACE BRIDGE — wires the HTML face to NESI's real disk + local engine.

Exposed to the page as `window.pywebview.api.*`. Every method touches the REAL
organs (core.capture_paste / metabolize / stage / record_mark / state) and the
REAL local engine (Ollama hermes3, server-side so there is no browser CORS wall).
No parallel store: feed drops into nesi/inbox, digests stage into nesi/staged,
marks go through the gate. Only `map` links get their own small file.

stdlib only. TO REVERT: delete this file, surface_app.py, and NESI_surface.html.
"""
import sys
import json
import urllib.request
from pathlib import Path

_HERE = Path(__file__).resolve()
NESI = Path(sys.executable).resolve().parent if getattr(sys, "frozen", False) else _HERE.parents[1]
sys.path.insert(0, str(NESI / "conductor"))

import core  # noqa: E402
import library  # noqa: E402  (the canon index — reuses build_index)
try:
    import engine_local  # noqa: E402  (self-registers the local engine into core)
except Exception:
    engine_local = None
try:
    import front  # noqa: E402  (the plain-language ROUTE -> ASSEMBLE -> RETURN door)
except Exception:
    front = None

LINKS_FILE = NESI / "surface_links.json"
OLLAMA_URL = "http://localhost:11434/api/chat"
LOCAL_MODEL = "hermes3:8b"


class Api:
    # ---- feed: a real drop into NESI's inbox ----
    def feed(self, text):
        try:
            p = core.capture_paste(text)
            return {"ok": True, "id": p.name, "text": text, "when": core.now(), "staged": False}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    # ---- list: the real inbox (held) + staged (digested) as nodes ----
    def list_nodes(self):
        try:
            st = core.state()
            nodes = []
            for it in st.get("inbox", []):
                name = it["name"]
                try:
                    txt = (core.INBOX / name).read_text(encoding="utf-8", errors="replace")
                except Exception:
                    txt = ""
                nodes.append({"id": name, "kind": "held", "text": txt, "staged": False})
            for obj in st.get("staged", []):
                o = obj.get("object") or {}
                summary = o.get("summary") or obj.get("pile", "")
                nodes.append({
                    "id": obj.get("id"), "kind": "digested", "staged": True,
                    "text": summary,
                    "items": o.get("items", []),
                    "engine": (obj.get("run") or {}).get("engine"),
                    "verdict": (obj.get("mark") or {}).get("verdict"),
                    "pile": obj.get("pile"),
                })
            return {"ok": True, "nodes": nodes, "engine": st.get("engine")}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    # ---- metabolize one held pile through the LOCAL engine, stage the result ----
    def metabolize(self, pile_name):
        try:
            p = core.INBOX / pile_name
            if not p.exists():
                return {"ok": False, "error": "pile not found: " + pile_name}
            obj = core.metabolize(p)                 # local engine (engine_local) via the seam
            path = core.stage(p, obj)
            return {"ok": True, "staged": path.name, "engine": obj.get("engine"),
                    "items": obj.get("items", []), "summary": obj.get("summary", "")}
        except Exception as e:
            return {"ok": False, "error": str(e)[:300]}

    # ---- mark a staged object through the gate (never auto-cross to canon) ----
    def mark(self, sid, verdict):
        try:
            v = {"keep": "keep", "hold": "hold", "compost": "compost"}.get(verdict, verdict)
            core.record_mark(sid, v)
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    # ---- chat: the LOCAL engine, server-side (no CORS, no login, no cloud) ----
    def chat(self, messages):
        try:
            body = json.dumps({
                "model": LOCAL_MODEL, "stream": False,
                "messages": [{"role": "system",
                              "content": "You are NESI, the keeper of Kevin's place. Calm, brief, plain. "
                                         "You hold things; you do not decide for him."}] + list(messages),
                "options": {"num_ctx": 8192, "temperature": 0.4},
            }).encode("utf-8")
            req = urllib.request.Request(OLLAMA_URL, data=body,
                                         headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=300) as r:
                resp = json.loads(r.read().decode("utf-8"))
            return {"ok": True, "reply": ((resp.get("message") or {}).get("content", "")).strip()}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    # ---- map links persist to disk ----
    def get_links(self):
        try:
            return {"ok": True, "links": json.loads(LINKS_FILE.read_text(encoding="utf-8"))
                    if LINKS_FILE.exists() else []}
        except Exception:
            return {"ok": True, "links": []}

    def set_links(self, links):
        try:
            LINKS_FILE.write_text(json.dumps(links), encoding="utf-8")
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    # ---- the library: the real canon patterns, read-only ----
    def library_list(self, query=""):
        try:
            idx = library.build_index()
            q = (query or "").strip().lower()
            out = []
            for e in idx:
                if q:
                    hay = (e.get("title", "") + " " + e.get("thesis", "") + " " + e.get("slug", "")).lower()
                    if q not in hay:
                        continue
                out.append({"slug": e["slug"], "title": e["title"], "thesis": e.get("thesis", ""),
                            "state": e.get("state"), "extends": e.get("extends", [])})
            return {"ok": True, "patterns": out, "total": len(idx), "shown": len(out)}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    def library_read(self, slug):
        try:
            for e in library.build_index():
                if e["slug"] == slug:
                    base = core.CANON if e.get("state") == "canon" else core.FOLDED
                    text = (base / e["file"]).read_text(encoding="utf-8", errors="replace")
                    return {"ok": True, "slug": slug, "title": e["title"], "state": e.get("state"),
                            "text": text, "extends": e.get("extends", []), "refs": e.get("refs", [])}
            return {"ok": False, "error": "not found: " + slug}
        except Exception as e:
            return {"ok": False, "error": str(e)[:200]}

    def engine(self):
        return {"engine": core.current_engine(),
                "health": engine_local.health() if engine_local else {"ollama": False}}

    # ---- front: the plain-language door — ROUTE -> ASSEMBLE -> RETURN over
    # front.handle(). No brain of its own: routes to bench/interrogator/
    # metabolizer/return_circuit/continuity, or returns one clarifying
    # question. `pending` carries a confirm-in-waiting organ name back in on
    # the next turn so a plain "yes" can complete it. ----
    def front_handle(self, text, pending=None):
        if front is None:
            return {"ok": False, "error": "front.py unavailable"}
        try:
            r = front.handle(text, pending)
            return {"ok": True, "kind": r.get("kind"), "lines": r.get("lines", []),
                     "pending": r.get("pending"), "under": r.get("under", "")}
        except Exception as e:
            return {"ok": False, "error": str(e)[:300]}
