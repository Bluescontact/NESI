---
name: project_autonomous_tools
description: "Five autonomous infrastructure tools for Kevin — push-not-pull; three built, two queued"
metadata: 
  node_type: memory
  type: project
  originSessionId: 328e7293-61a0-4a6f-adf8-edf0acd12109
---

Five tools designed to relieve cognitive scanning load and make the local circuit self-reporting. Architecture: Telegram delivery, push not pull, local-first (Hermes 3 / Ollama at 100W or less), no new dashboards.

**Why:** Kevin's cognitive load is the primary constraint. These tools carry the differentiation so Kevin can be the gate, not the scanner.

**Built:**

1. **Territory Listener** — `tools/territory_listener/` — scans Craigslist for local trade-skill requests (welding, solar, generator, off-grid, etc.) within 45mi; pushes Telegram brief at 6am. **Issue:** Craigslist returns 403 to headless requests. Solutions staged: (a) Craigslist email alerts → Telegram forward, (b) scheduled Claude cloud agent using WebFetch. Zip code in `listener.py` CONFIG section — update when bus moves.

2. **Voice to Substack** — `tools/voice_to_substack/` — Telegram bot; voice note or text → Substack draft in Kevin's voice + 3 pull-quotes + recognition pattern name + Imagen 4 header prompt. Runs locally, polls Telegram. **Needs 3 keys to activate:** `TG_BOT_TOKEN`, `ANTHROPIC_API_KEY`, `GROQ_API_KEY` (free, groq.com — for voice; text mode works without it). See `tools/voice_to_substack/SETUP.md`.

3. **Host Finder** — `tools/host_finder/` — reads `hosts.json`, calculates days until move, generates ranked short list + draft ask per contact via Hermes 3 (local, free), sends to Telegram. Built 2026-06-14. Rosebud Ranches pre-loaded as priority 1 (warm, last contact 2026-06-11). `move_date` set to 2026-06-26 (12 days). Run: `python host_finder.py` (brief + top 3 → Telegram); `--list` (all contacts); `--ask N` (draft for contact N). Same TG tokens as Voice to Substack. **Update `hosts.json` with more contacts; update `status` as replies come in.**

**Dispatcher pre-triage** — `tools/intake_triage/triage.py` — Hermes 3 runs Grounder pass on `_INTAKE/raw/` files, writes verdicts to `_INTAKE/_TRIAGE_RESULTS/`. DISPATCHER_PROMPT.md updated to read this cache first. COMPOST items never reach Claude; PROMOTE/HOLD items carry the pre-read into the Converger check.

**Queued (storyboarded, not built):**

4. **First Contact Handler** — OSG request form submission → auto-acknowledgment to sender + 3-line Telegram summary to Kevin + draft reply. Relieves: email composition, response latency.

5. **Single-Tap Broadcast** — Kevin sends one Telegram message; it propagates to Gift Circle map on OSG site + community channels. Relieves: distribution cost of giving.

**How to apply:** Check `tools/host_finder/hosts.json` and add contacts. Voice to Substack needs keys. Territory Listener needs 403 workaround before it's useful.
