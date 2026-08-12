# NESI — THE BOUNDARY (spec contract)

**STATUS: RATIFIED · Kevin's mark 2026-07-25T12:56 (MARKS_LOG). Phase 1 of the nesi.exe plan is DONE. This is now the frozen contract: the audit's assertion set — the illegal moves + the fallow round as *testable* rules. Phase 6's test harness turns each TEST line into an assertion nesi.exe is checked against. Change requires a new Kevin mark.**

The law it serves (canon): **the mechanic never does the recognizing.** Each assertion below is a way that law is made enforceable in code. Format per item: the RULE (the principle) → the ASSERTION (what the program must/must not do) → the TEST (how the harness checks it).

---

## IM-1 · No scoring or ranking — self or others
- **Rule:** no number the player did not themselves feel.
- **Assertion:** no code path produces a numeric or ordinal valuation of a player, a recognition, or a held thing. No score, count, streak, tally, rank, or leaderboard exists in state or on any surface.
- **Test:** *(static)* no aggregation over recognitions/players reaches a surface. *(runtime)* a query for "player value" returns *not-a-quantity* (undefined by design), never a number.

## IM-2 · No pulling another player's thread for them
- **Rule:** the felt-read belongs to its owner.
- **Assertion:** a move that selects, pulls, or marks a recognition is only valid when issued by the player who owns that thread. The engine rejects any move whose actor ≠ the thread's owner.
- **Test:** issue a cross-actor pull → engine refuses with a boundary-violation; state is unchanged.

## IM-3 · No debt — no residue after a pulse
- **Rule:** every recognition completes; nothing is owed.
- **Assertion:** after a completed pulse the mechanism returns to equilibrium with no stored obligation, balance, owed-value, or reciprocity record. No persisted field says one player owes another.
- **Test:** run a give/receive pulse → inspect state → no owed/balance field is present or nonzero; the equilibrium state is identical to pre-pulse except that the recognition is marked complete.

## IM-4 · No ranking two truths against each other
- **Rule:** two real recognitions are not comparable.
- **Assertion:** the engine never orders, compares, or prefers two marked recognitions relative to each other. No better/worse, no sort-by-worth, no A-over-B.
- **Test:** given two marked recognitions, any comparison on their worth is refused/undefined; no surface presents them in a ranked order.

## IM-5 · The game never completes an unmarked recognition
- **Rule:** the mechanic surfaces; the player marks.
- **Assertion:** a recognition advances to *complete* only after the player marks it. The engine cannot auto-complete, auto-detect, or infer that a seed lit. Absent a player mark, the state stays open or releases fallow — never "recognized."
- **Test:** drive a full round issuing no player mark → no recognition ever reaches complete; the engine surfaces but never decides.

## FALLOW · The empty round is lawful
- **Rule:** if the game can never tell you what's warm, it must let nothing be warm.
- **Assertion:** a round where nothing goes warm is a legal terminal state — honored, uncounted, composting. Not an error, not a loop-breaking null, not a "try again" nag. Emptying pockets and catching nothing returns cleanly to equilibrium and composts the surfaced material inward (canon 104).
- **Test:** run a round, player marks nothing → round ends in FALLOW (not ERROR); no counter increments; surfaced items route to compost/soil; the loop is poised for the next pull.

---

**Definition of done for Phase 1:** every item above is (a) marked correct by Kevin and (b) phrased so Phase 6 can turn its TEST line into an actual assertion nesi.exe is checked against. An item whose test can't be written is still a principle — send it back.

*Draft. Kevin marks the set (or any single item) before it becomes the contract.*
