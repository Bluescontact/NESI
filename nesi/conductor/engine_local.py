"""NESI LOCAL ENGINE SOCKET — the no-login, no-cloud engine.

Fills the articulation seam (core._ARTICULATE_ENGINES) with a LOCAL model
reached over plain HTTP — no `claude` CLI, no OAuth, no Anthropic. Points at
Ollama (http://localhost:11434) running hermes3:8b, already on this machine.

DESIGN LAWS honored:
  · stdlib only (urllib) — NESI's no-deps rule; nothing new to install.
  · same contract as the claude-cli articulation engine: takes (context, mode),
    returns the ARTICULATION dict only, RAISES on any failure so articulate()
    falls back to a dark Candidate (a local run is never passed off as real if
    it didn't actually run).
  · reads NESI-owned files only (the organ spec, the operating context, the
    pile) and INLINES them into the prompt — the local model can't read files,
    so the socket hands it the text. Same organ, same laws, different mouth.
  · Ollama `format:"json"` forces a single valid JSON object — no scraping.

TO REGISTER (runtime, reversible): engine_local.register(core); os.environ["NESI_ENGINE"]="local"
TO PERSIST later (Kevin's mark): add those two lines near the bottom of core.py.
TO REVERT: delete this file. core.py and NESI.exe are untouched by its existence.
"""
import json
import urllib.request

OLLAMA_URL = "http://localhost:11434/api/chat"
LOCAL_MODEL = "hermes3:8b"
NUM_CTX = 8192
HTTP_TIMEOUT = 420


def _ollama_chat(prompt: str) -> str:
    """POST one prompt to Ollama, force JSON, return the JSON string. stdlib only."""
    body = json.dumps({
        "model": LOCAL_MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
        "format": "json",                       # forces a single valid JSON object
        "options": {"num_ctx": NUM_CTX, "temperature": 0},
    }).encode("utf-8")
    req = urllib.request.Request(OLLAMA_URL, data=body,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=HTTP_TIMEOUT) as r:
        resp = json.loads(r.read().decode("utf-8"))
    content = (resp.get("message") or {}).get("content", "")
    if not content:
        raise ValueError(f"local engine returned empty content: {str(resp)[:300]}")
    return content


def _metabolize_prompt(core, pile_path: str) -> str:
    """Build the metabolizer prompt with the organ spec, operating context, and
    pile INLINED (the local model can't open files). Faithful to core._ORGAN_CALL's
    procedure + JSON shape; engine field says 'local-hermes3' so the object is honest."""
    from pathlib import Path
    organ = core.ORGAN.read_text(encoding="utf-8", errors="replace")
    ctx_path = core.NESI / "mind" / "ORGAN_CONTEXT.md"
    context = ctx_path.read_text(encoding="utf-8", errors="replace") if ctx_path.exists() else ""
    pile = Path(pile_path).read_text(encoding="utf-8", errors="replace")
    return (
        "You are the NESI metabolizer organ running headless (not a chat). Output "
        "EXACTLY ONE JSON object and nothing else — no prose, no markdown.\n\n"
        "PROCEDURE: inventory the pile into items (contained = literally present; "
        "implied = entailed). Give each item EXACTLY ONE disposition from this fixed "
        "vocabulary: folded-into | superseded-by | still-open | zero-unset | RESTORE. "
        "Each item needs a one-line evidence string (it MAY quote the pile verbatim). "
        "STRIP THE WRITER, NOT THE WORLD: drop the writer's internal/emotional state; "
        "KEEP operational objects (dates, names, companies, disputes, tasks, decisions). "
        "Do not write files, do not emit a gate delta, do not mark anything.\n\n"
        'RETURN EXACTLY THIS SHAPE: {"engine":"local-hermes3","pile":"<basename>",'
        '"summary":"<one plain sentence>","items":[{"item":"...",'
        '"kind":"contained|implied","disposition":"folded-into|superseded-by|'
        'still-open|zero-unset|RESTORE","target":"...","evidence":"..."}],'
        '"restored_count":<n>}\n\n'
        "=== ORGAN SPECIFICATION ===\n" + organ + "\n\n"
        "=== OPERATING CONTEXT (laws + vocabulary) ===\n" + context + "\n\n"
        "=== RAW PILE (" + Path(pile_path).name + ") ===\n" + pile + "\n"
    )


def articulate_local(context: dict, mode: str) -> dict:
    """The local articulation engine — same signature/contract as
    core._articulate_claude_cli. Returns the ARTICULATION only; core.articulate()
    slots it in. Raises on any failure (loud fallback to dark)."""
    if mode == "metabolize":
        if _CORE is None:
            raise RuntimeError("local engine not registered — call register(core) first")
        prompt = _metabolize_prompt(_CORE, context.get("pile", ""))
        out = _ollama_chat(prompt)
        return json.loads(out)
    else:
        scaffold = context.get("scaffold")
        prompt = (
            "You are a NESI organ running headless (not a chat). Output EXACTLY ONE "
            'JSON object {"mode":"' + mode + '","stated":"<one plain stated sentence>"} '
            "and nothing else. Articulate the scaffold below in one plain sentence.\n\n"
            "Scaffold:\n" + json.dumps(scaffold)
        )
        out = _ollama_chat(prompt)
        return json.loads(out)


def _loaded():
    import sys
    return sys.modules


_CORE = None


def register(core):
    """Wire the local engine into the REAL socket. Reversible: this only mutates
    the in-memory dict of the passed core module for this process. No file changes."""
    global _CORE
    _CORE = core
    core._ARTICULATE_ENGINES["local"] = articulate_local
    return "local"


def health() -> dict:
    """Quick reachability probe — is Ollama up and does it hold hermes3?"""
    try:
        with urllib.request.urlopen("http://localhost:11434/api/tags", timeout=5) as r:
            tags = json.loads(r.read().decode("utf-8"))
        names = [m.get("name") for m in tags.get("models", [])]
        return {"ollama": True, "has_model": LOCAL_MODEL in names, "models": names}
    except Exception as e:
        return {"ollama": False, "error": str(e)[:200]}
