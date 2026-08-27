# DRAFT — Action 3: standing multi-agent lens panel

Proposed 2026-08-27, in a three-action sequence Kevin asked to unlock latent
capacity held by Claude and the library. **Developed 2026-08-27** — audited,
grounded, and rebuilt once; see the changelog at the foot of this file. This
is a **draft for a decision**, not a mark — nothing here is authorized until
Kevin picks a trigger shape, or names none of them.

## The situation

Five lens agents exist and are already scoped correctly: `buckminster-fuller`,
`stuart-cowan`, `change-composite`, `game-craft`, and the carriage seat
`nesi`. All five carry a matching family of read-only limits — none can gate
a build, write a file, or cross a membrane; what they return is a reading,
routed through the existing gate like anything else. A comparable
parallel-fan-out mechanism already exists elsewhere in this project
(`nesi/bench/diamond/skill.md`, `nesi/bench/substrate/SKILL.md`). What's
missing isn't capability — it's a standing trigger. Right now each lens fires
only when a session happens to remember to call it, so a slice may ship
without being read by more than one of these five instruments.

**Open question, not folded silently into "five":** `nesi` is structurally
different from the other four — she never authors a line, only carries
forward what the record already holds verbatim. Fired on a brand-new slice
with no prior record to quote, she may have nothing to return. Any trigger
decision should treat her as a possible no-op at that moment, not assume she
reads like the other four.

## What this action is

Not "run all five lenses on everything." A **named trigger condition**: after
which specific build events does the panel fire automatically (or via one
prompt Kevin approves per event, not per lens)? Options to choose between,
not a recommendation of one:

1. **Per real slice** — any time a mechanic crosses `the-closing-check` or a
   comparable gate, before it's called done.
2. **Per session close** — folded into the existing `daily-cycle` close-out,
   reading whatever changed that session. **This option is not available as
   stated without a separate, prior mark.** `daily-cycle`'s own skill file
   states as load-bearing law: *"No other tool... No new instrument is ever
   built inside this skill — ever"* and holds a hard ten-minute close-out
   ceiling. A five-agent fan-out does not fit either constraint today. Kevin
   would be marking two things, not one: amending `daily-cycle` itself, and
   then choosing this trigger.
3. **On demand, but cheaper to invoke** — a single skill/command that fans
   out all five lenses in one call, instead of Kevin naming each one.

## Cost — the real ceiling, corrected

The first draft of this proposal treated "cheap to invoke" (true — small,
read-only tool surface, five parallel agents) as the same claim as "cheap on
a standing cadence" (unproven). It is not the same claim. `daily-cycle`
already priced the actual failure mode that matters here, and named it: *"If
it is reliably growing past that, the sessions are producing more than the
system can digest — that is not a logistics problem, it is a Governor
reading: throughput is exceeding metabolic capacity."* A standing trigger's
real cost is not tokens
— it's how many lens-findings arrive at Kevin per session before he can
absorb them, independent of what each one costs to run. Option 1 (most
frequent) risks this first and worst; option 3 (on demand) puts the
frequency decision back in Kevin's hands per-instance and avoids it
entirely; option 2 cannot be assessed on this axis until the prerequisite
mark above is made.

- None of the five lenses write anything — they only return a reading.
  Routing what they find still goes through the existing gate
  (`inbox/`, Kevin's mark) — this action does not change who authorizes
  what gets built from a lens's finding.
- The existing `the-closing-check` (five questions, portable, no agent
  fan-out) is the cheap version of this same idea already wired in for
  single mechanics. This action is the more expensive, more comprehensive
  sibling for whole slices — not a replacement.

## Why this shape

- Doesn't ask Kevin to authorize five agent-runs-forever; asks him to pick
  one trigger shape (or none), with the real cost — digestion, not tokens —
  stated plainly.
- Matches the corpus's own stated aim (`change-composite`'s reading of
  drive/presence/gift/emergence) rather than adding a sixth check that
  scores anything.

## What this is NOT

Not a proposal to make any lens binding or gating — their hard limits keep
them read-only; `game-craft` and `change-composite` can each decline to
engage with material that doesn't meet their own stated bar (`game-craft`: a
design that never asked its own question; `change-composite`: material
that's already been composted, returning "no ground" rather than a reading),
but that is a limit on what they'll read, not a gate on what Kevin builds. Not a proposal to add a new lens. Not a
claim that option 1, 2, or 3 above is already decided.

---

## Changelog (development pass, 2026-08-27)

Audited and grounded by an independent adversarial agent against the actual
agent-definition files and `daily-cycle`'s own skill file (not taken on the
first draft's word). Six defects found, one severe (a false claim, cut); one
structural conflict surfaced (Option 2's dependency on amending
`daily-cycle`, now stated as a prerequisite rather than folded in as an
equal option); one open question named (`nesi`'s possible no-op) rather than
silently resolved; the cost section's core claim replaced with the ground
pass's finding (the real ceiling is digestion, not tokens).

**Deferred, stated plainly:** this pass did not run stage 5 (diverge — five
alternative shapes for the proposal); given this is a short operational
proposal rather than a persuasive piece, that stage was judged not to earn
its cost here. If Kevin wants the fuller procedure run, say so and it will
run.

**Verify pass (stage 9, 2026-08-27):** a fresh, independent agent — no
access to the reasoning above — checked this revision against the before-
file and the defect list, and re-verified every citation from scratch. All
six original defects and the ground finding confirmed fixed. It also found
two defects the revision itself introduced: a misquote of `daily-cycle`'s
Governor-reading language ("digestion capacity" for "metabolic capacity")
and an inverted description of `change-composite`'s decline condition
(said "uncomposted material" where the actual hard limit is the reverse —
it declines on material that *was* composted). Both corrected above.

---

## Decision — Kevin's mark, 2026-08-27

Kevin's words, verbatim: *"suspend action 3."*

**Suspended, not answered.** None of the three trigger options is chosen
and none is rejected — the question stays open, unclosed, parked rather than
decided. The five lens agents remain exactly as they are: read-only,
invoked only when a session remembers to call them, no standing trigger
added. Distinct from Action 2's close: that question got a complete answer
(c); this one is set aside without one. Reopening it is Kevin's call, in his
own words, whenever he wants it back.
