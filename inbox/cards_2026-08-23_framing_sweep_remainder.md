# CARDS — what the framing sweep found and didn't touch, 2026-08-23

`tools/check_harness.js` is now wired into the boot path (`tools/boot_hook_harness.py`,
`SessionStart`, sibling to `boot_hook.py`) and ran clean this session. Sixteen
files across `.claude/agents`, `.claude/skills`, and `skills/` were rewritten
on the finding it confirmed — the negative-framing shape (law 27, sited
2026-08-17/22) was never checked past three game-design docs, and kept
reproducing in new skills for two months after the law entered the boot path.

These cards are what's left standing after that pass. Ranked by density.
Nothing here orders anything — the instrument reports, it doesn't rule.

---

## 1 · THE REMAINING DENSITY IS NOW MOSTLY DECLARED LINT, NOT LEFTOVER SHAPE

Every file still above ~20/1000 has the same structure: connective prose was
rewritten and dropped; what's left is concentrated in a `## Hard limits`,
`## What it must never do`, `## Reserved zero`, or `## REFUSALS` section —
the parts the framing law's own carve-out names as where negative form
belongs ("a lint, or the edge of a container"). Chasing the number lower from
here doesn't mean finding more contamination — it means deciding whether the
*lint convention itself*, used identically across nearly every skill and
agent in this corpus, should also read differently.

That's a bigger fork than a file-by-file cleanup pass has standing to close.
It would restyle a grammar this whole corpus shares, not fix a local defect —
the same shape law 25 names for base-fork decisions. Filed here rather than
decided in the pass that found it.

## 2 · `nesi.md` — 41.1/1000, highest in the corpus, partially touched

Only the `## The carriage` section (descriptive prose) was rewritten this
pass — `## Hard limits (absolute)` is untouched on purpose, it's the
carriage's own declared lint and the law protects it. If the number still
matters after card 1 is answered, the remaining mass is almost entirely that
one section.

## 3 · `kevin-lens.md` — 35.5/1000, untouched, and it should stay that way

Not a finding — a boundary this pass respected. Its own header: "kept whole
as a record — layered, never silently edited." Editing it to lower a density
score would be the exact violation its retirement notice exists to prevent.
Named here so a future sweep doesn't mistake the number for an oversight and
"fix" it.

## 4 · `morning-pages-channel.md` (28.6) and `overnight-cycle.md` (24.8) — untouched, same reasoning as card 3

Both live in `skills/`, both outside the git membrane, both left alone
because their density *is* the safety mechanism: "never marks," "no mood
tracking," "fail-closed until Kevin sets it." Softening that prose doesn't
remove contamination, it blurs a real wall. Flagged so they don't get swept
into a future pass by number alone.

## 5 · The four `skills/` files never cross the membrane, wired or not

`mark-record`, `metabolizer`, `morning-pages-channel`, `daily-cycle`,
`overnight-cycle` — all of `skills/` is `/*`-ignored. They got the same
editorial pass as everything else, but they're local-only regardless of what
happens to their density. If they should travel with the deposit the way
`tools/boot_hook.py` does, that's a `.gitignore` exception, and per
`route-map`'s own law that's proposed here, not made: widening the membrane
is Kevin's mark alone.

## 6 · `tools/check_harness.js` and `tools/framing_check_skills.js` are wired but still local-only

The boot hook runs them every session now (`--summary`, under a second, one
line of context). Neither file is tracked — both land inside `/tools/*`,
same rule as card 5. Functionally wired; not yet part of what a clone of
this repo receives. Two separate questions, not one.

---

Your mark:
