# ESCALATION CONDITIONS — the routing law, NESI-side
**Home:** `nesi/mind/ESCALATION_CONDITIONS.md` — authority copy for NESI organs (mirror discipline: NESI-side is authority).
**Provenance:** extracted verbatim 2026-07-17 from `energetic_integrity_os_resynthesis.html` § Escalation Rule (adopted with Terminal Law 2026-06-28, constitutional constraint). Kevin's mark 2026-07-17: "extract NESI-side." If the source page and this file ever disagree, that is a drift event to surface, not to silently resolve.
**Read by:** `nesi/conductor/interrogator.py` (Move A). The organ parses ONLY the fenced json block below; the prose above it is for humans.

## The rule, verbatim

Use daily (conversational) mode unless one of these is true:

1. the movement creates public consequence
2. the movement asks another person for capacity
3. the body is strained or depleted
4. the desire feels urgent, proving, or identity-loaded
5. a hidden-cost smuggle is suspected
6. the move creates commitment beyond today
7. the prior pass returned ambiguity

If any condition is true → route to the full-form deep review terminal.

## Machine block — questions in Kevin's terms + deterministic markers

Matching law: lowercase substring match on the markers, whole-drop scope. Better a
check that misses quietly than one that fabricates a trip — markers are deliberately
narrow. `standing: true` marks the family Kevin has asked to always be named
(smuggle / hidden-cost); its question carries a "standing request" tag when it fires.

```json
[
  {"id": 1, "condition": "the movement creates public consequence",
   "question": "This moves in public. Who witnesses the consequence — and did you choose them?",
   "markers": ["publish", "public", "post ", "deploy", "push to", "announce", "share it", "substack", "github", "the site", "go live"],
   "standing": false},
  {"id": 2, "condition": "the movement asks another person for capacity",
   "question": "This asks someone else for capacity. Named to them, or assumed?",
   "markers": ["ask him", "ask her", "ask them", "request from", "borrow", "their time", "help me with", "host me", "a favor", "needs someone"],
   "standing": false},
  {"id": 3, "condition": "the body is strained or depleted",
   "question": "The body reads strained in this. Is the ground actually under the move?",
   "markers": ["tired", "exhausted", "drained", "depleted", "strained", "no sleep", "sore", "in pain", "worn out", "running on empty"],
   "standing": false},
  {"id": 4, "condition": "the desire feels urgent, proving, or identity-loaded",
   "question": "This carries urgency or proving. Whose recognition is it chasing?",
   "markers": ["urgent", "right now", "have to", "must ", "prove", "proving", "deserve", "finally show", "before it's too late", "asap", "can't wait"],
   "standing": false},
  {"id": 5, "condition": "a hidden-cost smuggle is suspected",
   "question": "A cost may be riding hidden in this. Where is it, and who pays?",
   "markers": ["deal with it later", "figure it out later", "quietly", "just this once", "shouldn't take long", "no big deal", "won't cost", "small cost", "sneak", "on the side"],
   "standing": true},
  {"id": 6, "condition": "the move creates commitment beyond today",
   "question": "This creates commitment past today. Is that named, or smuggled?",
   "markers": ["commit", "promise", "agree to", "schedule", "monthly", "weekly", "ongoing", "subscription", "lease", "contract", "deadline", "by monday", "next week", "every day"],
   "standing": false},
  {"id": 7, "condition": "the prior pass returned ambiguity",
   "question": "The last pass on this returned ambiguity. What changed since?",
   "markers": ["still unclear", "ambiguous", "still not sure", "same question again", "keeps coming back", "unresolved"],
   "standing": false}
]
```
