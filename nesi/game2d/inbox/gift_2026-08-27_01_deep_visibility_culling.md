# GIFT — visibility culling for the page at scale

- **title:** the deep never renders (visibility culling)
- **what:** geometry outside the visible volume is never submitted for drawing — not drawn dark, not drawn small, never submitted at all. A flat cutoff refusal-to-draw, not a distance check run every frame.
- **source:** `nesi/game2d/_compost/ascent_2026-08-21_pre-rebuild.html:2177` (`function keptAtX(x){...}`), documented at `nesi/game2d/ORGANS.json` under seat `DEEP`, organ "visibility culling"
- **when:** built before 2026-08-21 (cut from the live file in that day's full ascent rebuild; kept whole in compost, not deleted)
- **quote:** *"a flat fill below H\*0.45 — a refusal to draw rather than a culling test... nothing below is ever drawn."* — `ORGANS.json`, finding on this organ
- **capacity:** `the_page`'s own Dream A audit already named the real, open scaling problem this solves — quoting `KNOWLEDGE_the_page_and_the_tetra_2026-08-26.md` §3: *"the near-pairs computation is O(n²), fine now, would need a window at real scale (months of daily writing) — named, not hidden."* This organ is a working answer to a gap the corpus already wrote down and left open, not a speculative improvement.
- **unrouted_because:** it lived in the pre-2026-08-21 ascent build, was cut in that day's full rewrite ("too many patches... build the levels entirely from scratch"), and was never re-sited — not because it was wrong, but because the rewrite it survived in was a different surface than the page that exists today.
- **routing:** a way in → the page's own render loop already knows each sentence's screen position; an act → apply the same flat-cutoff refusal (sentences whose card falls outside the current scroll viewport are skipped at draw time, not distance-tested) → a visible consequence → the document stays responsive as it grows into months of daily writing, which nothing currently guarantees.
- **reading:** capacity: M · effort: L · confidence: H

---
*Ordered nothing. Waiting for a mark.*
