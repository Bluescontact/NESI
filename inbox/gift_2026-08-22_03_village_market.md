# GIFT · Village Market — shipped once, then removed in the v5→v6 purge

Brought to the gate 2026-08-22, unrouted-gifts pass against oursharedgifts.org.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A complete local-mesh market: a map page (`village-market.html`) rendering asks/offers/hosts/bus-location as pins from `records.json` + a zip→lat/lng lookup, a list view, type/open-only filters, claim flow, a submit form wired to a Netlify Function (`market-submit.js`) that commits new records to the repo and sends one-shot contact-reveal emails via Resend (contact info held in Netlify Blobs, never in git — "per cycle 77 audit finding P1"), and a protocol page stating the load-bearing refusals. Fully documented setup (`market/README.md`, 8 env vars, a 10-step test procedure).

**Where it came from**
> Ship Village Market first demonstration ... Village Market: ship as clickable demo; surface Gift Circle in nav
— `oursharedgifts-deploy` git history, commits `04b1eb7` and `6fade67`. It was live and in the nav.
> Remove all v5 pages and assets — v6 is the site
— commit `e2d2546`, the commit that took it back out.

**Latent capacity** — This is the only built implementation anywhere in the corpus of OSG's first door in `OURSHAREDGIFTS_V5.md`: "the neighbor who needs something ... needs to find you, get what you do in plain terms, and ask." It is the site's one concrete local-exchange mechanism, already once proven working (real commits, a documented test pass), currently reduced to inert data.

**Why it went unrouted** — Confirmed unrouted: the five live v6 pages have zero references to "market" (grepped); `market/records.json` and `market/zip-coords.json` still sit at the deploy repo root, current and untouched, but the actual pages (`village-market.html`, `village-market-submit.html`, `village-market-protocol.html`, `village-market-manage.html`, `village-market-resolve.html`), the JS, and the Netlify Function survive only in the gitignored `_source/` pre-transform archive — cut when the v5→v6 rebuild ("v6 is the site") replaced the whole page set and never carried this one forward.

**Shortest routing** — Way in: restore the five pages + JS + Function from `_source/` into the v6 page set, link The Field or The Door to `/village-market.html`. Act: a neighbor near Grass Valley opens the map. Consequence: the standing bus-location pin and any open asks/offers in `records.json` are visible and claimable for the first time under v6.

**Reading** — capacity H · routing effort M · confidence H

────────────────────────────────────────

Your mark:
