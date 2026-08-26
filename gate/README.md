# THE GATE — backend *(staged; deployment is the gate-holder's hand)*

A staging instrument for the gate-holder. It displays what waits for Kevin's mark. **It does not collect the mark.** One owned tool, Python standard library only — no pip, no npm, no CDN, no cloud. The only dependency is the Python runtime, which is the point: own what you depend on.

```
gate/
├─ THE_GATE.html        ← the canonical artifact: static, renders offline (generated)
├─ template.html        ← the source layout; __GATE_DATA__ is the swap point
├─ gate.py              ← the whole backend (build · serve · stage · mark · stats)
├─ data/
│  ├─ gate_data.json    ← the single source of truth (hand-editable)
│  ├─ mutations.jsonl   ← append-only audit; nothing hard-deletes (generated)
│  ├─ count_history.jsonl ← pile-state readings (generated)
│  └─ .gate_token       ← single-user secret, gitignored (generated on first serve)
└─ README.md
```

## The four laws — enforced, not just described

1. **GROUND.** `gate.py build` inlines the data into `THE_GATE.html`, a static file that renders with everything unplugged — no fonts, no CDN, no fetch needed to read. If the server dies, the last state is still legible. The snapshot **is** the canonical artifact; the live server is a convenience.
2. **NO-CLOSE.** There is no verb that decides. The panel has no approve/ratify/done button and never will. `mark` / `hold` / `compost` only **record an act you already took**, off-panel, from the body. The write API mirrors these verbs for sessions you direct — it is not surfaced in the panel.
3. **DISPLACED-ZERO.** `validate()` **refuses to build** if any item carries a `score`/`verdict`/`recommendation`/`approve` field, or if a `Body` gauge carries anything but a log. The tool will not display the thing that decides.
4. **SUBTRACTION.** Nothing hard-deletes — `compost` is a status; the record stays, because a wrongly-composted pattern returns. `gate.py stats` reports, mechanically, when a panel's printed removal test is met.

## Run it

```bash
python gate.py build              # regenerate THE_GATE.html, then open it — no server needed
python gate.py show               # print current state to the terminal (decides nothing)
python gate.py serve              # convenience server on 127.0.0.1:8787, single-user, fail-closed
python gate.py stats              # recompute counts, apply the pile rule, flag removal tests
python gate.py daemon             # persistent: rebuild snapshot on data change + daily stats tick + serve panel
python gate.py daemon --no-serve --interval 30   # maintenance only, faster poll, no panel
```

## The daemon — Kevin's architecture mark (2026-06-09)

A long-running, single-user, localhost process that keeps the canonical snapshot fresh (rebuild whenever `gate_data.json` changes) and the pile-gauge current (a daily `stats` tick), and serves the read-only panel. It writes a heartbeat at `data/.gate_daemon` (pid + start time; present only while running) and stops on **Ctrl-C** or by killing that pid.

It honours the four laws unchanged: it **never marks** (NO-CLOSE — the mark is always yours, off-panel); it **validates before every build and fails closed**, keeping the last good snapshot if a hand-edit is bad (DISPLACED-ZERO); it **never deletes** (SUBTRACTION). **GROUND still holds:** the static snapshot remains the canonical artifact — if the daemon dies, the last snapshot renders with everything unplugged. The daemon is a *convenience over* the snapshot, not a dependency for reading it.

**It is a running service, and `DARK_GATE.md` governs it as one** — among the services stopped when the gate-holder goes permanently dark. (Recommended-against in the architecture question — the framework's GROUND gravity leans on-demand — but marked by Kevin; recorded here as his call.)

Record a mark (after you have made it, off-panel):

```bash
python gate.py mark queue "Rented-cognition"      # status staged -> marked, snapshot rebuilt
python gate.py hold queue "COLOR downgrade"
python gate.py compost tray "Deposit build-order" # a status, not a deletion
python gate.py consent "Rented cognition"         # record a leak consented by name
python gate.py stage tray --json '{"title":"New deposit","class":"pre-clearance-candidate","note":"…"}'
```

Every write appends to `mutations.jsonl` and rebuilds the snapshot. The data is plain JSON: you can also edit `data/gate_data.json` by hand and run `build`.

## The backend contract, as implemented

- **Fetch swap:** `gate.py build --live` writes `THE_GATE.live.html` with `GATE_DATA` sourced from `await fetch('/api/gate',{credentials:'include'})`, for deployment behind auth. The offline `THE_GATE.html` stays canonical.
- **Write API:** `POST /api/{stage,mark,hold,compost,consent}`, single-user, fail-closed. Writes append; nothing hard-deletes.
- **Auth:** one user, one token (`data/.gate_token`), via `Authorization: Bearer`, `?key=`, or cookie. No registration. Fail closed. Server binds `127.0.0.1` by default.
- **Snapshot on every write:** each mutation rebuilds `THE_GATE.html`, so the offline copy is always current.

## The membrane — what this tool does *not* do

This is **staged in the workspace.** Crossing it to oursharedgifts.org is the gate-holder's act, not this tool's:

- moving `gate/` into the OSG repo and pushing,
- exposing the server beyond `127.0.0.1` (which requires **HTTPS + secure-cookie hardening** before it touches a public domain),
- any deploy.

The tool fails closed and stays local until you take it across. Nothing crosses without the mark, and **the mark is not collected here.** The reaching is not the mark.
