# NESI MARK TOGGLE — delta return · 2026-07-19 (evening)
**Kevin's marks executed:** (1) marks reversible in the window app — "keep undo, and update the rules" · (2) framing corrected: there is no sign-in; NESI is desktop-gated, no login/lock ever · (3) backups stay in place.

## 1 · BUILT — the mark is now a toggle
- **core.unmark(sid)** — reverses any mark. Never silent: the old mark moves to `mark_history` on the object and the ledger gets an **annotation** line (`{"annotation":"unmark","was":...}`) — annotations are not marks, per the vocabulary you ratified today; continuity and every reader skip them. A crossed card routes through the existing sync-loud `uncross()` first (canon folds to `_folded/`, lint rebuilds or the fold reverts), then clears.
- **The window:** every marked card now carries **↺ un-mark**. Hold/compost reverse in one click, no confirm (the reversal itself is the record); a crossed card keeps one confirm because reversing it folds the canon. After un-mark the three verbs return on the next refresh — mark, unmark, remark, freely, with the whole trail kept.
- **Verified live:** round-trip on a temp object — hold(+anchor) → un-mark → compost → un-mark; history kept both times; ledger honest (those 4 self-test lines are in marks.jsonl on id `unmark_selftest_000000`, object deleted — annotations on a ghost, harmless; say the word to strike them and I'll stage it).
- **Exe rebuilt and swapped** (zombie-check → build → boot-verify ~8s → swap). Rollback: `_compost\NESI.exe.bak_2026-07-19_pre-mark-toggle`. All prior backups left in place per your mark 3.

## 2 · RECORDED — no sign-in, ever
COLD_START.md now carries it as law: NESI is a local .exe gated by your own desktop — no login, no lock, no account, and none will be built. The one-time `claude /login` that the dark engine would need is the *engine's* vendor plumbing behind the socket, not a NESI gate — Mark 1 is "plugging the motor in," and per your elevator sequence it waits until the rails are done to the top.

## 3 · STANDING
Backups all in place · engine dark (temp-motor phase) · seed/ stands · booking-membrane awaits your screen · queue uncalled · open sheets: necropsy ×3, M5 ×12 · one hand-test now covers both window changes: one hold (anchor prompt) + one un-mark.
