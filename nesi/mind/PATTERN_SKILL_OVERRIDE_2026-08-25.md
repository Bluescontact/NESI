# PATTERN — the skill-override move

**Named 2026-08-25**, distilled from the one instance that's actually been
built and verified: `.claude/skills/external-extraction/SKILL.md`, created
2026-08-24 to carry Gift 5 (LEARNED.md law 29) into a bundled marketplace
skill that had no local file to edit.

This is a pattern doc, not a law. Nothing here is marked into `LEARNED.md`
— it names what one build actually did, so the next one doesn't have to
re-derive it from scratch or re-break what this one already found.

---

## 1 · Scope

**What the pattern is for:** a bundled/marketplace skill (`plugin:name` in
the Skill tool's own naming — here, `anthropic-skills:external-extraction`)
has no file in this repo. NESI has since accumulated a corpus-specific
constraint that should govern how that skill runs here. The pattern is: add
a project skill of the identical unprefixed name, so it shadows the bundled
one for this repository without touching the plugin itself.

**In scope:**
- Any `anthropic-skills:*` (or other plugin-namespaced) skill this corpus
  has paid for a specific constraint about, where that constraint doesn't
  belong in `LEARNED.md` alone because it's procedural (governs *how a
  skill runs*), not a standing law (governs *how a session behaves*).
- Cases where the override can be scoped to *addition*, not *replacement* —
  the local file states what it adds and is explicit about not having seen
  the rest.

**Out of scope — do not use this pattern for:**
- A skill with no corpus-sourced addition to carry. Overriding a skill you
  have nothing to add to just to "have a local copy" creates a stale fork
  the moment the bundled version updates, for zero benefit.
- Reconstructing the bundled skill's full instruction set from memory or
  inference. If the actual bundled text was never read, the override must
  say so plainly (see §2.3) rather than presenting a guess as the record.
- Anything that would fork behavior the corpus has no opinion about —
  that's scope creep dressed as diligence.

## 2 · Spec

### 2.1 · Location and naming

`.claude/skills/<exact-unprefixed-name>/SKILL.md` — the name must match the
bundled skill's name exactly (minus its `plugin:` prefix) for the shadow to
take effect. Confirmed mechanically: after
`.claude/skills/external-extraction/SKILL.md` was created, the next
skill-availability listing surfaced `external-extraction` (bare) and
**dropped** `anthropic-skills:external-extraction` from the list entirely —
the project skill didn't sit alongside the bundled one, it replaced which
one loads.

### 2.2 · Frontmatter

```
---
name: <same as bundled skill>
description: <trigger phrasing preserved close enough to keep firing on
  the same cues the bundled skill answered to>
---
```

The description is the trigger. If it drifts far from the bundled
original's phrasing, the skill may stop firing on the prompts that used to
reach it — the override would then be correct in content and wrong in
practice, invisibly.

### 2.3 · Body — required sections

1. **Disclosure.** State plainly, near the top, that this is a
   project-scoped override, and name what grounds the restated procedure —
   evidence actually available in this repo (a filed deck's own section
   headers, a prior working session, a committed artifact) rather than
   assumed knowledge of the bundled skill's real text. If the bundled
   skill's full instructions were never read, say so.
2. **The addition(s).** Each corpus-sourced constraint, stated as an
   instruction the skill should follow, with inline provenance (the mark,
   the date, the file it came from) — same discipline `LEARNED.md` already
   requires: every line sourced, none composed.
3. **Sibling/cross-reference preservation.** If the bundled skill's
   description named a sibling skill (e.g. external-extraction's own
   description names `unrouted-gifts`), keep that relationship stated in
   the override — losing it silently narrows what a future session
   understands the skill's place to be.
4. **Provenance footer.** One block naming every source file the override
   pulls from, so the override itself is auditable the same way its
   contents are.

### 2.4 · What the override must NOT do

- Must not claim settled content it didn't verify (see law 29 — this spec
  doc itself follows it: no line here claims to reproduce the bundled
  skill's unseen instructions as fact).
- Must not silently drop a capability the bundled version had, without
  naming the drop. An override that goes quiet about what it doesn't cover
  reads as more complete than it is.

## 3 · Completion metrics

An override instance is DONE when all of the following check out — each is
a yes/no a future session (or Kevin) can verify directly, not a judgment
call:

| # | Metric | How to check |
|---|--------|--------------|
| 1 | **Shadow confirmed** | The bundled `plugin:name` no longer appears in the skill-availability listing after the project file is created; only the bare name does. |
| 2 | **Every addition traces to a mark and a file** | Each new instruction in the override names the mark that authorized it and the file it came from — same bar as `LEARNED.md`'s own admission rule. |
| 3 | **Disclosure present** | The file states, explicitly, whether the bundled skill's original instructions were read or not, and what the restated procedure is actually grounded in. |
| 4 | **No unnamed drop** | Nothing the bundled skill's *description* promised (its stated triggers, its stated sibling relationships) is missing from the override without a note explaining the gap. |
| 5 | **Description still fires** | The frontmatter `description` still contains the trigger language a session would match against — checked by re-reading it cold and asking "would this still catch the prompts the original caught." |

**Not a completion metric:** reproducing the bundled skill's full original
text. That's explicitly out of scope (§1) — attempting it without having
actually read that text would itself violate law 29's sibling standard
(record-audit: don't declare what you didn't verify).

## 4 · Open question this pattern doesn't resolve

If the bundled skill is ever updated upstream, this override has no
mechanism to detect that or reconcile with it — it's a static fork from the
moment it's written. Nothing in this pattern proposes a fix; naming it here
so the next instance of this pattern doesn't silently inherit the same gap
without knowing it exists.

## 5 · Provenance

- Built instance: `.claude/skills/external-extraction/SKILL.md`,
  2026-08-24.
- Constraint it carries: `nesi/mind/LEARNED.md` law 29.
- Full development trail:
  `nesi/mind/EXTRACTION_2026-08-24_aakash_product_builder_developed.html`.
- This pattern doc named on Kevin's ask, 2026-08-25: "buld a scope and spec
  and completion metrics for what the skill override pattern entails."
