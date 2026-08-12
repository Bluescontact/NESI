# NESI intake / journal — spec draft

**Status:** DEVELOP-lens spec, not yet built. Marked "go — spec it" 2026-07-28, extended same session with word-target, transparency, recap-cadence, and game-dynamics detail.
**Provenance:** grew out of the phase-transition reconsideration thread (2026-07-28) — Kevin's existing 750-words daily practice, generalized into NESI's own intake surface.

---

## Core loop (unchanged from the first pass)

A single writing surface with a live word-count gauge. Two intake lanes:

- **private** — Kevin's own journaling (the 750-words equivalent)
- **external** — content Kevin thinks NESI should look at (pasted text, dropped files, quotes)

Routing happens automatically once something lands in a lane — no per-entry narration of where it goes.

## Additions from this pass

**1. User-set word target, not a fixed 750.**
The gauge target is a number Kevin sets and can change any time — not hardcoded to the 750words.com convention. Persisted per-user, editable from the same screen as the gauge.

**2. Digestion transparency.**
Whatever NESI does with a piece of writing after it's dropped in — extraction, routing to a specific organ, composting, holding as raw — must be visible to Kevin, not inferred or assumed. This is the same visibility principle as the chassis's grounded/reached tag, applied to the intake pipeline itself: after digestion, the entry shows what happened to it (where it went, what if anything got pulled out of it), not just a silent "saved."
Open question, not yet resolved: does this show inline right after saving, or on demand when Kevin later opens the entry? Held for the build pass, not decided here.

**3. A place a person returns to, not a one-shot capture.**
The surface persists across sessions like 750words.com does — Kevin opens it, sees his own accumulating body of writing, picks up mid-thought. Not a drop-box that clears after ingestion.

**4. Game dynamics + layers of self-recognition mechanics.**
Named directly but not yet specified — Kevin flagged this as a direction (streaks, mechanics that make returning to write feel alive, layered self-recognition surfaces) without picking a specific mechanic. Held as an open design surface, not resolved to a concrete feature list here — resolving it further is its own DEVELOP pass, not implied by this spec.

**5. Recap cadence: daily / weekly / monthly / yearly.**
Four recap views, same underlying data rolled up at different windows. Each recap surfaces back what was written in that window — not a new analysis layer on top of it, just aggregation at increasing scale. Consistent with the guard already governing morning-pages content (`morning-pages-channel` skill): recaps show the writer their own words back, they do not editorialize mood, theme, or sentiment about the writer.

**6. Word cloud.**
Visual frequency map of words used in a given window (day/week/month/year), same 750words.com mechanic. Purely descriptive of word frequency — not a semantic or emotional analysis layer.

---

## Guard carried forward (non-negotiable, from `morning-pages-channel`)

The intake surface is a **drop path**, not an analysis engine aimed at the writer. Word counts, streaks, clouds, and recaps all describe the writing itself (volume, frequency, cadence) — never the writer's mood, emotional trajectory, or inner state. That line holds regardless of which container (Claude Code today, NESI.exe eventually) hosts this feature.

**Precision caught 2026-07-29, Kevin's correction:** "blind to meaning but not mood or theme." The guard above says the *system* never analyzes or editorializes mood, theme, or inner state — that stays. But a raw word cloud is not actually blind to those things the way "purely descriptive" implies: if "tired" or "grief" comes up forty times, the cloud shows that, large, without any interpretive layer doing anything. The guard is a limit on what NESI is permitted to *do* with the writing (never infer, never reflect a reading of the writer back at them) — it was never a claim that the raw shape of the words carries no mood or theme at all. It obviously can. The word cloud stays exactly as specified (no semantic or emotional analysis layer); what changes is not pretending the visualization is neutral of that content just because nothing analyzes it. Held as a caught nuance, not a spec change.

## The recognition this connects to (2026-07-29, same session as THE_COLLAPSE_organs)

The word cloud is the same shape as the vector-equilibrium-to-jitterbug figure that ran on the 157-pattern canon the same night (`_INTAKE/freeze_2026-07-29/THE_COLLAPSE_organs_2026-07-29.md`), at daily scale instead of months-of-canon scale. A heliostat field (many mirrors, one receiver) and the VE at rest (twelve equal vectors, one center, none dominant) are one figure read two ways — an instrument turned versus a rest-state held. The word cloud is that same figure again: many words, one page, none forced into size except by what actually recurred, no one word propped up.

The sharper point, named directly by Kevin: **the transition itself — not either endpoint — is the exchange surface.** Two of the ten organs the collapse produced are named for exactly this: `catalysis_without_claim` (the single highest-binding pattern in the whole canon) and `precesse`, whose own line states "the return arrives at ninety degrees to the aim, guaranteed by geometry." A gift given straight does not return straight — it returns through the twist. Applied here: what a day's 750 words crystallize into, read back through the cloud, is not the shape you were aiming for while writing it. That gap between what went in and what comes back is not a byproduct of the mechanism — under this reading, it *is* the exchange, the same way the jitterbug's fold-and-spring-back is where a gift completes rather than a neutral pipe between two stable states.

## Not yet decided (left open, not defaulted)

- Where digestion-transparency surfaces (inline vs. on-demand)
- The concrete shape of the game-dynamics / self-recognition layer
- Whether recap pages are read-only or carry their own light interaction (e.g. re-tagging an entry after the fact)
- Container: this spec is written container-agnostic: it does not assume Claude Code or NESI.exe standalone, per the reconsideration still open in the parent thread.
