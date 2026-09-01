*Crystallized 2026-08-31 per the commons rule: pattern crosses, instance does not. The working record stays in the source corpus.*

# GIFT — write, read back, only then trust it

- **pattern:** every save writes to a temporary location, reads that back, byte-compares it against what was meant to be written, and only then replaces the real store. A save that does not round-trip leaves the original untouched rather than corrupting it — and a failed write is surfaced, never silently proceeded past.
- **source shape:** found in an earlier build's persistence path, hardened after an audit caught a test writing fixtures into a live store with the only backup in a local variable.
- **capacity:** any persistence call wrapped in a bare try/catch has a real, documented failure mode — quota exceeded, storage limits, a truncated write — that nothing downstream will ever notice. The discipline is directly portable to any store: read back what you just wrote, compare, and only trust the save if it matches; on mismatch, say so where a status line already lives.
- **why such value goes unrouted:** a hard-won discipline stays local to the project whose failure taught it; sibling projects with the same exposure never get audited against it until a deliberate cross-project pass.
- **routing shape:** a way in → the existing save function → an act → read the key back after writing and compare → a visible consequence → the displayed count reflects what is actually on disk, not what was merely attempted.
- **reading:** capacity: M · effort: L · confidence: H — the cheapest and most directly portable pattern of its batch: no new UI, a handful of lines in one existing function.
