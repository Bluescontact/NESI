# GIFT — a save that checks it actually landed

- **title:** write, read back, only then trust it
- **what:** every save in world3d's deposit path writes to a temp file, reads that temp file back, byte-compares it against what was meant to be written, and only *then* replaces the real store. A save that doesn't round-trip leaves the original store untouched rather than corrupting it.
- **source:** `nesi/world3d/.walk/_snapshot/scripts/intake/deposit.gd:129-160` (`_write()`)
- **when:** predates this session; the file's own header dates the chain it belongs to to 2026-08-02
- **quote:** *"write a .tmp, read it back, and only then replace. A failed write never destroys the store."* And, on why the discipline exists at all: *"the refusal audit of 2026-08-06 found the deposit test writing fixtures into the live store and holding the only backup in a local variable — one abort mid-test and Kevin's real stones were carrying 2099-01-01 rows."*
- **capacity:** `the_page`'s own `persist()` is one `localStorage.setItem(...)` inside a bare `try{}catch{}` — if the write silently fails or truncates (a real, documented browser failure mode: quota exceeded, private-browsing storage limits, a corrupted write), nothing in the page would ever know. This organ's discipline is directly portable, unlike the other three gifts today: read back what you just wrote, compare it to what you meant to write, and only trust the save if it matches.
- **unrouted_because:** never crossed from world3d into game2d at all — a different project, never audited against this one's own persistence path until this pass.
- **routing:** a way in → `persist()` in `index.html` → an act → after `localStorage.setItem(KEY, json)`, immediately `localStorage.getItem(KEY)` and compare against `json`; on mismatch, don't silently proceed — the page already has a real place to surface this (the `.padhint` line already changes text after every save) → a visible consequence → a writer can trust that "N sentences" reflects what's actually on disk, not what the page merely attempted.
- **reading:** capacity: M · effort: L · confidence: H — the cheapest and most directly portable of everything opened this pass. No new UI, no new ground, a handful of lines in one already-existing function.

---
*Ordered nothing. Waiting for a mark.*
