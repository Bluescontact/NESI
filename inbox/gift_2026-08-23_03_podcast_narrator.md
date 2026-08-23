# GIFT · Podcast Narrator — a working script-to-MP3 desktop app

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A complete, working Tkinter desktop app (`podcast_narrator/narrator.py`, 350 lines) that turns pasted or loaded text into narrated MP3 via Microsoft Edge's free neural TTS (~320 voices), with voice search/favourites/preview. A compiled standalone `.exe` (`podcast_narrator/dist/PodcastNarrator.exe`) needs no Python installed.

**Where it came from**
> "Simple desktop app: paste a script, pick a voice, get back an MP3. Uses Microsoft Edge's neural TTS (edge-tts — free, no API key) for ~320 natural voices across many languages and accents."
— `podcast_narrator/README.md` (`narrator.py` last modified 2026-08-19)

**Latent capacity** — A ready narration/audio layer for anything currently text-only — a spoken companion to a transmission-engine packet, an audio read of a Codex page, narrated field-kit material — at zero new build cost, since the app and its compiled exe already work standalone.

**Why it went unrouted** — Built as a personal utility off to the side of the DSS pipeline. Grepped the whole repo for `narrator.py`/`podcast_narrator`/`PodcastNarrator` and found zero references anywhere else — no pipeline, skill, or doc names it or calls it.

**Shortest routing** — Way in: name it from one existing pipeline doc (e.g. transmission-engine's SKILL.md, as an optional audio step). Act: mark one piece you want narrated. Consequence: the exe (or `narrator.py`) turns it into an MP3 sitting in `output/`, playable the same session.

**Reading** — capacity M · routing effort L · confidence H

────────────────────────────────────────

Your mark:
