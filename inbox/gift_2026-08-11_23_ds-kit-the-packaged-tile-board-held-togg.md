# ds-kit — the packaged tile/board/held-toggle component kit

**What:** A built, verified TypeScript component kit (15 components: Board, RoomCard, Tile, zones, DecideButton with held toggle, deposit chips, RevealBox, Locator, RoomView/BackAnchor) shipped as ESM + browser IIFE (dist/dss-kit.iife.js, global DssKit) with scoped tokens.css — the DS_v1 chassis extracted into reusable parts, verified pixel-identical.

**Source:** `ds-kit/KIT_REPORT.md (dist/ and src/components/)`
**When:** 2026-08-01

**Evidence (verbatim):**
> "Behavior extracted, side effects removed — tile open/close, held toggle, chip truncation at 42 chars ... all match the chassis JS ... onDecide/onCross/onRelease/onDeposit are plain callbacks"

**Capacity:** A drop-in 2D interactive surface layer for any HTML-hosted face of the game: rooms as cards, tiles that open/close, a held state with no confirmation, deposit as a callback — interaction geometry already debugged.

**Unrouted because:** Extracted from the chassis for apps generally; nothing in the NESI game consumes the kit.

**Shortest routing:** If any 2D face of the net is HTML, mount DssKit IIFE and wire onDecide/onCross/onRelease to the three outputs. Note: deposit chip carries a count 'N' — strip it before it reaches the player (Law 2).

**Reading:** capacity H · effort M · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
