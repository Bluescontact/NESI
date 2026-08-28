# DEVELOPED — design proposal for gifts #13 (the burn) and #14 (the sheet)

Proposed 2026-08-27, after Kevin's mark: *"i thought 5 13 1nd 14 all need a
new ui built that deserves a dream and a develop pass."* This is the
`full-development`-rebuilt version of the original draft, after a fanned-out
audit, ground, and diverge pass. **This is a design recommendation, not an
authorization to build.** The original draft is not reproduced inline —
git history holds it if it's ever needed — because this document supersedes
it rather than sitting beside it.

## What the audit found: my own first draft mischaracterized both source mechanics

Before any design question can be answered, the mechanics have to be
described correctly. They weren't, in the first pass:

- **The burn does not "hold steady when released."** `heliostat_panel.gd:80-81`
  decays heat on every receiver that isn't currently lit, at a fixed rate
  (`delta * 0.7`/sec), continuously, whenever the station is open —
  regardless of pointer/button state. The real mechanic is **aim and
  leave it**: `aim` persists after the pointer releases, `act_spire()`
  reads only the current aim angle, and heat rises on whichever receiver
  is currently aimed at while draining on the other two. The skill being
  tested is a *choice you commit to and walk away from*, not a sustained
  hold — a materially different and arguably more interesting mechanic
  than the one the first draft sketched.
- **The sheet does not heal by wall-clock time, and does not survive
  reload.** `torn` is a plain per-frame countdown, ticked only while the
  station's node exists in the scene tree — i.e., only while that panel
  is open. The source's own comment states this directly: *"a tear does
  not close while the station is shut or the program is not running."*
  It freezes at whatever value it was left at on close and simply resumes
  counting from there on reopen. "Real elapsed time, even across a
  reload" was invented, not ported — and contradicted the first draft's
  own "never while closed" sentence two lines earlier.

Both corrections matter beyond bookkeeping: the "opposite failure shapes"
framing in the original draft's open questions was built on these two
false descriptions and doesn't survive the correction. The real opposition
is: **a persistent choice with continuous background decay when abandoned**
(burn) vs. **an in-session countdown gated on whether the surface is
currently open** (sheet) — a real difference, but not the one first drafted,
and "gated on the surface being open" is itself an open question for a page
that doesn't have modal panels the way the Godot build did.

## What the ground pass found: the fail-state is not the mechanic's actual point

The strongest finding of this whole pass. Both `heliostat_panel.gd` and
`membrane_panel.gd` are Godot `Station` subclasses whose real job is
**routing water to a spire** — the beam carries water to whichever receiver
is lit; the membrane's well carries water dropped on it to whichever
anchor the pull favors. The burn and the tear are *fail-states of a
station*, not standalone mechanics. Gift cards #13 and #14 kept only the
punishment half and never mention water or the station's actual function
— which means the original draft wasn't proposing a port, it was proposing
to build the penalty for a game that was never given the thing being
penalized. That's exactly why both sketches read as "freestanding, nothing
downstream" — that emptiness isn't a property of the source mechanic, it's
a symptom of the port already having discarded the half that wasn't
freestanding.

A second, narrower finding, real but lower-stakes: `membrane_panel.gd:164`
draws the heal indicator as `draw_circle(c + pull*0.5, 16.0 * (torn/RELAX), t)`
— a circle whose radius is literally `remaining-time / total-time`, shrinking
as the tear heals. That's the inverse direction of this build's own named
example (*"a bar that fills as you go,"* `index.html:592-594`,
`CASE_CONSTRAINTS.no-number`) — not a literal match, but the same
underlying shape the constraint exists to catch: a continuous geometric
magnitude directly tracking a hidden numeric ratio. The numeric constants
(3.4s, 150px, 7s) are fine to port unchanged; the draw calls are not, and
need redescribing as pure form/colour with no dimension proportional to
elapsed-time-remaining, in either direction.

## Five shapes considered (diverge stage), presented whole, unranked among themselves

1. **Two new top-level grounds** — literal port, full fidelity, but the
   first grounds in this build with zero connection to the writer's own
   data, and two more slots in an already-nine-wide nav bar.
2. **Graft onto an existing ground's failure state** — e.g., a `weave`
   connector that can tear, a `world` seat that can scorch. No new nav
   surface; directly answers "does this need a data tie" by making the
   answer structural. Touches existing render functions, carrying
   regression risk.
3. **Radically smaller: one flag on already-running code** — attach a
   hold/aim accumulator to the attention-tracking already wired at
   `index.html:1076` (`nesi.thepage.attention`), flip one persisted
   boolean past a threshold, change one CSS class. No canvas, no new
   ground, ships as a handful of lines against code that already runs
   every session.
4. **Cross-cutting substrate** — two general primitives
   (`registerHoldConsequence`, `registerTensionSurface`) any ground can
   opt into, with a shared overlay rather than a dedicated nav slot. Most
   architecture, least justified by only two data points.
5. **One combined ground, one state machine, two lenses** — a single grid
   where the *player's own action type* (aim-and-leave vs. drag) selects
   which consequence-grammar applies to the same point. Takes the
   "flattening" risk the first draft flagged and turns it into the actual
   concept, at the cost of literal fidelity to either source script.

## Converged recommendation

Shape 1 is weakest on the ground pass's own strongest finding — it has
nothing to route, so it would ship exactly the "penalty without a game"
problem the ground pass named. **Shapes 2, 3, and 5 all answer that
finding structurally, by attaching consequence to something that already
exists rather than standing up an empty station.** Of these, **shape 3 is
the right next step, not shapes 2 or 5**: it is the only one that tests
the underlying capacity — does an irreversible-vs-reversible cost on
sustained attention mean anything at all — without first committing to a
sited "water" analog (shape 2) or a synthesized dual-mechanic surface
(shape 5) that would be expensive to unwind if the answer turns out to be
no. Build small, learn whether the capacity is real, and only then decide
whether it earns a dedicated station.

This is a recommendation for Kevin to mark, not a decision made here.

## What is still genuinely open — not resolved by this pass, and not this pass's to resolve

- **What "water" game2d's own version of these stations would gate.** The
  ground pass names this as the real prerequisite; the most plausible
  answer (the writer's own sentences/attention) is named but not decided.
- **Whether to build shape 3 now, a fuller station later, both, or
  neither.** Named as a real fork, not defaulted.
- **The source gift cards' own line-count citations are each off by one:**
  `gift_2026-08-27_13_the_burn.md` cites `heliostat_panel.gd:1-176` (the
  file is 177 lines); `gift_2026-08-27_14_rule_for_the_sheet.md` cites
  `membrane_panel.gd:1-180` (the file is 181 lines). Verify's own re-count
  confirmed both. Named here explicitly rather than silently avoided —
  a small, cheap fix to the two gift-card files themselves, not done in
  this pass since it belongs to those files, not this one.

## Stage 9 — Verify

A fresh, independent subagent reviewed this document against the original
draft and the five audit defects, with no visibility into this
reasoning: **4 of 5 FIXED, 1 PARTIAL** (the line-count citation above —
verify found the first version of this document avoided repeating the
error rather than naming it; now named, directly above). Verify also
caught one overclaim in this document's own first version — the tear-heal
indicator was called "exactly the shape" the no-bar-that-fills constraint
forbids, when it's actually the inverse direction (a shrinking circle, not
a filling bar); corrected above to state the real, narrower relationship.
That correction and the citation note above were made after verify ran and
have not themselves been re-verified by a fresh pass — named here rather
than silently claimed as re-verified, since both are small enough that a
full re-run would cost more than it would find.

## Deferral accounting

- **What did this add that nothing calls?** Nothing — no code was written
  in this pass; the document is the only artifact.
- **What did it name that it did not build?** Both mechanics' corrected
  descriptions, the water/station reframing, and shape 3 as the
  recommended next step — none of it built, all of it named for a future
  pass to act on or reject.
- **What did it defer?** The actual build (any shape), and both of the
  open items listed above — deliberately, since both are Kevin's calls.
