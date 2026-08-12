# The round dealer — five moves, skip counts as play

**What:** A built session mechanic: five moves dealt from the live field; playing or skipping both resolve a move; the fifth ends the round; nothing carries over; closing the door is a complete ending.

**Source:** `osg_organ/templates/play.html (backed by osg_organ/engine.py)`
**When:** ~2026-07

**Evidence (verbatim):**
> "Five moves, dealt from the live field. Play any, skip any — a skip resolves a move the same as a play; the fifth ends the round. No score, no streak, nothing owed."

**Capacity:** A bounded, non-coercive session shape for a game with no score: deal-N, resolve-by-any-act, clean end. Satisfies held-is-lawful and no-re-engagement laws.

**Unrouted because:** The round structure never left the Flask organ; the current game has no session-shape mechanic wired in.

**Shortest routing:** Adopt as the day/round structure: a hand of moves dealt from the player's own prior deposits, skip = play, round closes clean.

**Reading:** capacity M · effort M · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
