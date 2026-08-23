# UI/UX KNOWLEDGE — a self-contained extraction

**Built 2026-08-19** on the ask to extract everything around UI/UX
development from this project's own history and compile it into a document
that needs no other file open to use. **Developed 2026-08-19** — audited,
grounded against real UX practice, and rebuilt after the first pass shipped
with an unflagged internal contradiction and a self-containment claim its own
jargon didn't earn.

**What this is.** One person's build history, read back on itself — a single
corpus, a single decision-maker, and rules mostly derived from *one* incident
each, not from replication across users or products. Where a rule below
matches ordinary UX consensus, that agreement is coincidental to this
corpus's own history, not evidence the corpus discovered something general.
Treat "law" in what follows as *this happened, here, once, and was
generalized from that* — true to its provenance, not proven at the scale
"law" usually implies. A handful of entries are marked **[candidate]** —
proposed in the source material and never ratified; everything else reads
with the same declarative weight, which is itself a limit of the source, not
a claim that the rest is more settled.

**Coverage.** Primary sources: `nesi/mind/LEARNED.md` and its provenance
file, ~35 `feedback_*.md` files, `ds-kit/`'s shipped design-system
conventions, the `counsel/gamecraft/` design lens, `nesi/game2d/` build docs,
and a **partial** sample of `MARKS_LOG.jsonl` (first ~60 of 152 UI-keyword
matches across 1402 lines — later marks likely hold more, unsurfaced here).
Not opened at all: `ds-kit/DESIGN_SYNC_BUILD_REPORT.md`, `KIT_REPORT.md`,
`design_bundle/README.md`, `nesi/mind/project_context_window_
infrastructure.md`, `nesi/mind/project_decision_surface.md`,
`CIRCUIT_TOOL.md`, `EXPORT_CANDIDATES.md`, `genesis_seed_share/
DRIFT_MAP_2026-07-06.md`. This document is complete *as an extraction of what
was sampled* — not as an audit of the corpus.

**Status.** A record of what was learned, not standing instruction. Read it
the way the rest of this corpus's suspended material is read: available to
quarry, load-bearing only where a live doc (a `CLAUDE.md`, a build file)
already carries a given rule forward on its own.

**Glossary** (corpus-native terms used below, defined once so the rest of
the document doesn't require outside context): **MARKS n** — an entry number
in `MARKS_LOG.jsonl`, the append-only log of the user's own clicked/typed
decisions. **LEARNED law n** — a numbered entry in `LEARNED.md`, this
corpus's list of paid-for lessons; each requires a mark and a cited incident
to be added. **WALKABLE / UNWITNESSED** — a build-verification status: a
surface is WALKABLE only after a human has actually looked at it; a
machine-only pass leaves it UNWITNESSED regardless of test results. **Chassis
law (e.g. "B1," "B3")** — one of a small set of named, frozen rules governing
the decision-surface widget's fixed form (v5, see § B). **The tetra
menu** — a retired 3-button decision control, superseded 2026-07-02. **Felt-
read** — the user's own capacity to read and differentiate a decision by
feel, treated as a limited, non-delegable resource. **Gate / tray / compost /
mark / membrane** — this corpus's own vocabulary for, respectively: an open
decision point; a holding area; the default disposition for unprocessed
material; the user's own recorded choice; the crossing point between a
staging area and a canonical one. **DSS** — the umbrella name for this
personal build/process system. **`sendPrompt()`** — a widget-side function
that submits text to chat automatically; its use was tried and reverted (see
§ B). **`DssRoot`** — the mandatory wrapper component for the shipped
`ds-kit` design system (see § E).

---

## A · Visual & Perceptual Design

**Read the pixels, not the plan.** Measure in pixels a hand could actually
see, never in the data model. — `LEARNED.md` law 5, MARKS 989 (2026-08-12).
Provenance: a game object was present and data-correct but rendered at 7.8
real screen pixels — functionally invisible. Re-broken the next day when a
signal at 80% opacity got occluded by a later render pass, and eight green
automated test suites missed it, because **no instrument in the corpus
asserts that anything is VISIBLE.** That assertion is still an owed repair —
see § C for the same gap stated as a verification failure.

**A blank/empty screen can vacuously pass a UI rule.** — `LEARNED.md` law 4,
MARKS 1022 (2026-08-13). A "no system text on screen" rule was once satisfied
by building a world with zero text primitives at all — incapacity mistaken
for compliance. A test passable by absence tests nothing.

**Selector honesty.** A check must select the object itself, never a
neighboring label — an instrument reading a proxy grades the proxy. —
`LEARNED.md` law 6, `cold_walk.js:162`.

**Ask the object its own state; never infer it from a symptom.** A character
controller once inferred "landed" from 20 frames of stillness, while the
character was actually motionless mid-air waiting on an 8-second fall
animation — a full day of automated screenshots were captured 240m above
ground and believed to be evidence. — `LEARNED.md` law 23 (2026-08-14).

**Feedback should be visible while it happens; controls should read as
physical.** **[candidate — proposed, never ruled binding]** Four instrument
rules: a worksurface, not a sign · shape carries meaning, never words · the
control is a physical thing you press · the act is visible while it happens.
Named exception: the user's own words in the world, hover captions, a
persistent locator, and stones speaking the player's text are live
exceptions to "never words," flagged so no one strips them later. —
`nesi/game2d/CANDIDATE_GRAMMAR.md`, 2026-08-12.

**Progression renders as physical, unnumbered analog change — never a
digit, bar, count, or comparison.** *Scoped to this one game project, not
general UX guidance* — accessibility research (WCAG 1.4.1, screen-reader
support for status indicators) treats "state conveyed by shape/visual
channel alone, with no non-visual equivalent" as a known failure mode, and
this build has no such equivalent. The corpus has not resolved that gap; it
is named here as an open cost of the choice, not a solved one. No scores,
ranks, XP, levels, percentages, progress bars, streaks, or word counts, and
nothing compares parallel structures to each other, ever, not even as a
stub. — `counsel/gamecraft/CUT_collisions.md`, sourced to a vendor refusal
law. Built substitute: tank fill height, pool ellipse size, ground density,
room brightness (`light = 1 − exp(−cycles/9)`) — "progression as physics,
unnumbered." — `nesi/game2d/BUILD_RECORD.md`. Falsifier: the design fails if
the user looks and can't tell the world has changed since last time.

**An ambient indicator that quietly judges the player is worse than an NPC
that speaks.** **[candidate]** Test, as actually stated and the more
load-bearing part of this entry: an ambient element passes only if it would
behave identically for a thousand words of grief and a thousand words of
grocery lists, and if nothing about it is aimed at the player. (The NPC/
indicator framing above the test is presented as reasoning but isn't
independently checkable — the grief/grocery-list test is the part worth
keeping.) — `nesi/game2d/CANDIDATE_GRAMMAR.md`, "the indicator refusal,"
2026-08-12.

**No dark backgrounds on deployed/public pages — for this corpus's own
public pages, chosen for a projector/daylight-phone audience.** Not a
general UI law: dark mode is a genuine accessibility accommodation for
photosensitivity and light-triggered migraine, and a measured OLED
battery-life win — reasons unrelated to taste. The field's converged
resolution (GitHub, VS Code, Figma, and most mature products) is
user-selectable dark mode honoring `prefers-color-scheme`, not a ban either
direction; this corpus has not built that option, it has chosen the light
default and documented why. — `feedback_no_dark_backgrounds.md`; consistent
with the shipped kit, which ships no dark theme at all (see § E).

**No `position:fixed` inside the widget render environment.** The rendering
iframe sizes to in-flow content height; fixed elements collapse it to a
100px sliver and vanish. Menu/manifest blocks must stay normal in-flow block
elements. — `feedback_widget_fixed_positioning.md`.

**Scope all CSS under a wrapper class — the render pane strips bare
`:root`/`body` rules.** — `feedback_widget_rendering.md`.

---

## B · Interaction & Feedback Design

**Toggle/slider over button-rows for per-item decisions.** Requested after
three batches of button-card UI. Note: the user still types the actual
decision in chat rather than relying on the widget to transmit it — the
toggle is a display preference, not a data channel. — `feedback_widget_
toggle_ui.md`.

**[Superseded by the v5 chassis, kept as historical record]** Under the
earlier button-row UI, firing multiple controls at once was read as a
recognition signal, not an error — *"firing multiple buttons identifies
where [the user] recognizes development opportunities"* (2026-06-27); the
rule was never to collapse a multi-fire into one mark or default to a
"primary" button, but to render both options and name the tension. Once the
chassis froze on a single segmented slider (v5, 2026-07-22 — see version
history below), the mechanism this rule depends on — parallel, independently
clickable buttons — no longer exists in the current widget. The document
does not know, and should not claim to know, how or whether this signal
survives on slider UI; it is recorded here as a live lesson from one era of
the chassis, not a current operating rule. — `feedback_multi_button_
signal.md`.

**A "steer" control copies text to clipboard — never auto-sends, never uses
an in-widget composer.** Corrected twice (2026-07-15, then again 2026-07-19
to 08-05 when a brief `sendPrompt()` auto-send regression crept back in).
The user: *"the text I use is this one"* — their own real chat input, never
anything inside the widget iframe. Frozen rule: **"SEND/COPY = a mark
copies."** — `feedback_click_populates_not_sends.md`, `feedback_widget_
cards_open_sendprompt.md`.

**Reading and deciding are two separate acts — the full object of *this*
decision must render above its own control before that control is offered.**
Recurred four times (2026-07-19/21/23/24) before it held:
- *"you've gated the decision behind a door i can't see through."*
- Needed to relay widget content to a different AI session; a gated summary
  lacked the detail.
- A 497-word deliverable sat inside a closed card with a slider: *"i should
  be able to read the whole output in the widget without a click of
  decision."*
- A document reachable only via file link: *"why cant i read it in the
  response you offered?"* Sharpened rule: **the produced text must be
  physically present, in full, inside the widget — a file link is not a read
  surface.**

Every one of these four incidents is about the object *of one specific
decision* being hidden behind that decision's own control — none is about a
long, multi-decision session needing to render unsegmented in full. Scoped
that way, this rule does not collide with progressive disclosure (a
well-established pattern precisely because unconditional full-render *does*
increase cognitive load and error rate for long or multi-branch content) or
with the pacing rule below (§ F: "one decision surface per turn, not a list
of five") — the two rules bind different scopes. A card's own content is
never gated behind its own control; how many cards/decisions appear at once
is a separate question, governed by pacing, not by this rule. If a future
widget conflates the two — hiding one decision's content to satisfy pacing,
or unsegmenting an entire long session to satisfy this rule — that's the
sign the reconciliation drifted. — `feedback_widget_read_gated_behind_
decision.md`, `feedback_widget_gate_visibility.md` (2026-07-14),
`feedback_3_options.md`. (Two feedback files independently produced the same
rule from different incidents — the gate-visibility file adds: for
continuous documents, render the whole piece inline with edits highlighted
in place, not scattered diff boxes; a collapsed card, if one must exist at
all, carries a real preview sentence on its face, never a content-free
"click to open.")

**Manifests/consequences are pre-filled at authoring time, never inferred at
render time.** Heavy edges and cards carry their manifest shown face-up
before execution. — `feedback_widget_completion_pattern.md`,
`feedback_3_options.md`.

**A widget ends with a completion state — never a prose summary.** Three-
mechanism model: first click shows a pre-filled manifest, second click on the
same control executes, a distinct "MARK FOR LATER" control stages an
unexecuted option to a queue file rather than discarding it. —
`feedback_widget_completion_pattern.md`.

**No prose before or after a widget call — the widget is the entire
response, always, with no "just this once" exception.** Trivial short tool-
status narration mid-execution is not a response and is exempt. This is a
chassis rule for one specific decision-surface UI, not a general claim about
interfaces — most UIs need surrounding text for error and empty states; this
one's completion-state mechanism (above) is built to cover that case
instead. — `feedback_no_prose_after_widget.md` (2026-07-01), `feedback_
single_document_format.md` (2026-06-27).

**Every exit is pre-authored — a surface that requires typing to leave is a
build failure in this chassis.** Reasoning given: typing stays available,
never made the toll for leaving. — `feedback_3_options.md`, chassis law
"B1."

**Labels name the specific action, not a generic category word.**
`[Deepen ↗]` (the user must interpret) became `[Close the brief loop ↗]`
(names exactly what fires). "The label IS the navigation instrument." —
`feedback_3_options.md`, 2026-06-26.

**No auto-opening a rendered page in a browser tab.** *"can you stop opening
the widget in a tab on firefox"* — the hook was removed same turn; files are
written silently, opened at the user's own action. — `feedback_no_auto_
open_browser.md` (2026-07-02).

**A "no visible output" system notice is expected noise from a widget-only
response, not an error to fix.** — `feedback_no_visible_output_noise.md`.

**Widget render files are per-session, never a shared/global file.** A
single shared `latest.html` caused two concurrent sessions to clobber each
other's renders. Fixed by keying the file to session id. —
`feedback_per_session_widget_file.md` (2026-07-09).

**Copy the entire chassis template verbatim, including its `<style>`
block — never hand-reconstruct "just the important part."** A widget once
rendered fully unstyled because the CSS block was silently dropped by hand-
typing. — `feedback_chassis_full_copy.md`.

**Widget vocabulary is plain-language, not internal jargon.** *"delta feels
like a military call sign"* — "delta file" → "holding file"; "apply" → "file
it onto the board"; "staged" → "sorted, waiting for your go-ahead." The
user's own coined grammar (gate, tray, compost, mark, membrane, felt-read —
see Glossary above) stays as-is — only imported technical vocabulary gets
translated. — `feedback_plain_language_widgets.md` (2026-07-03).

**The decision list is derived, never authored — never padded to a fixed
count, never fewer than what's actually live.** An earlier fixed "always 4
cards" rule (`feedback_four_cards_per_widget.md`, 2026-07-16) was explicitly
superseded by this derive-don't-pad principle in the v5 chassis. This is the
*floor*: don't invent fake options to hit a count. It does not by itself cap
how many derived options can appear when many are genuinely live — that
ceiling is set separately by the pacing rule (§ F: "one decision surface per
turn"). Read together: never pad below what's live, never show more than the
user can actually read in one pass; the two are reconciled by scope (count
of *real* options vs. count *shown at once*), not in tension. —
`feedback_3_options.md`, chassis law "B3."

**The "nano-bot principle": the interface surfaces itself at the object
under attention — the user never navigates to find tools.** ("Nano-bot"
names the property being invoked: something that relocates itself to where
it's needed rather than waiting to be found.) "The workshop reshapes itself
around what [the user] is holding." Ancestor of "the Locatable Move" (locate,
never steer) and depth-zero decisions (every live decision open and markable
without entering anything). — `feedback_3_options.md`, 2026-06-26.

**Never direct or schedule the user's physical body from a UI — even
warmly, even echoing their own stated plan.** *"you keep directing my
outside… you've been applying a force to the user."* Cards must stay inside
the system's own jurisdiction (marks, files, builds); if fewer live decisions
exist than a template wants, say so plainly rather than reaching into the
user's body's territory. — `feedback_never_direct_the_body.md` (2026-07-16).

**Never prompt for a felt/somatic articulation field — a blank field is a
complete record.** *"i cringe when you force me to articulate things… my
body read is mine to hold."* If volunteered unprompted, place it verbatim
with no follow-up. — `feedback_body_read_is_his.md` (2026-07-02).

**Automate state-view refresh after a decision sequence closes — never make
the user run it manually.** *(Reasoning not recovered from source — recorded
as a flat correction with no incident given.)* — `feedback_automate_state_
view.md`.

**Full widget markup (HTML/CSS) is not a real cost — don't strip a UI's
legibility to save bytes.** Stated reasoning: the real cost gate in this
system is off-machine calls (web search, multi-agent workflows), which run
5–15MB against a widget's ~50–80KB — stripping the widget saves little
against that budget while directly costing the user's comprehension and
consent. — `feedback_data_discipline.md`.

**A UI must never let the system infer "you seem depleted" and silently
give the user less.** Any capacity cap on what's shown must be a fixed,
visible, user-set control — never an inferred downgrade. Distinct from
content-adaptive systems that read *performance* signals (a game's
difficulty adjustment, for instance) rather than claiming to read the
user's own inner state — this rule is about the latter, not a general
argument against all adaptive UI. — `feedback_ai_never_self_limits.md`
(2026-07-22).

**A critique posture ("run it hard") attaches to the artifact under review,
not to the person, even mid-conversation.** Track what "I" refers to in the
user's language; when it shifts from artifact-register to person-register,
pause the critique mode. — `feedback_mandate_object_not_person.md`
(2026-07-14).

### Widget chassis version history (concrete evolution of one decision-surface UI)

- **v2** (2026-07-02) — open decision surface replacing a 3-button "tetra
  menu."
- **v3** (same day) — verbs distributed on edges (◆ mark / ▶ execute), no
  separate verb bar.
- **v4** (2026-07-13) — card-based, click header to open; fixed steer
  vocabulary: **GO** (commit) · **WARMER** (nudge in spirit) · **PLAINER**
  (re-explain simpler) · **HOLD ◆** (mark for later) · **DROP** (set aside).
  Typed input demoted to bottom, only for those who'd rather type.
- **v5** (2026-07-22, ratified — "the fixed form") — four depth layers:
  **L0 GLANCE** (state + single ripest act, near-zero cost) → **L1 SURFACE**
  (other live decisions, closed, never padded) → **L2 OPEN** (plain words +
  one slider) → **L3 DEPTH** (manifest/falsifier/provenance, on demand).
  Frozen: one segmented slider as the control; send/copy = a mark copies
  (chassis laws B1/B3, cited above). The user's mark: *"proceed on my mark on
  all 4 · a mark copies."* Falsifier: if a future widget makes the author
  re-decide count/control/disclosure/depth, v5 drifted into a variant. This
  is also the point at which the multi-fire-signal rule above stopped having
  a mechanism to apply to.
- **v6–v9** — capacity strip, grounding tag, locator, wayfinding; v8 marked
  canonical 2026-07-25.
- **v10 → DS_v1** (2026-07-28) — *"v10 is geometrically improved over all
  past generations — compost v1-v10 to recognize what's worth carrying
  forward, the new widget becomes DSv1."*
- **2026-08-05** — several dead/superseded lines struck across multiple
  feedback files in one pass, an explicit corpus-hygiene mark.

---

## C · Verification / Testing of UI

**No UI/visual claim is verified without a human ("stranger") looking, even
if automated checks pass.** No WALKABLE without a stranger read;
machine-proved surfaces are UNWITNESSED. — `LEARNED.md` law 2, MARKS 993
(2026-08-12).

**A verification only holds if it's general and re-evaluating, never
because of who ran it.** A check that would catch a *different* failure too
is doing real work; a check shaped to exactly one past failure and nothing
else is closer to a regression guard than a general verification — the
distinction matters because the latter gives false confidence about
everything it wasn't built to catch. — `LEARNED.md` law 3, reframed
2026-08-18.

**A green test suite does not mean a UI element is visible.** No instrument
in this corpus formally asserts visibility — see § A, law 5. Still an owed
repair.

**A test satisfiable by a UI's total absence of content is not a valid
test.** See § A, law 4.

**Guards refuse the disallowed act — they never silently rewrite rendered
content to enforce themselves.** A 100-word input cap implemented by
truncating on the `input` event moved the caret and corrupted the user's own
typed words mid-stream. Fixed by moving the guard to `beforeinput`, which
refuses the keystroke instead of editing the result after the fact.
**"Enforce by refusing the act, never by correcting the result."** —
`LEARNED.md` law 24.

**A live config instruction that contradicts current UI reality gets
flagged, never silently patched without a mark.** A vendor hook kept
ordering sessions to render a retired control (the tetra menu) for weeks
after it was actually retired — recorded as an open, unresolved conflict
each time it recurred, not quietly fixed. — MARKS_LOG (2026-08-06),
`feedback_3_options.md`, `feedback_single_document_format.md`.

**Design-by-falsifier for specific mechanisms:** a "set-it-down" interaction
with deliberately zero feedback was verified against named refusal laws
(no destination/animation/confirmation, no nag, three outputs always on
screen) rather than a generic feel check — because the absence of feedback
was the intended design, not a bug. — `counsel/gamecraft/SHAPE_mechanisms_
and_systems.md`, `CUT_collisions.md`.

---

## D · Framing & Language in UI

**No generalized negative framing in prose.** Negative form belongs only in
(1) a lint refusing one named thing at a gate, or (2) the edge of a
container stating where it ends. A general or specific negative *assertion*
in prose leaks into the reader's lens and narrows what comes after,
invisibly. Write what holds, what is available, what a thing does. — the
user's mark, 2026-08-17 (root `CLAUDE.md`).

*Open question the source material doesn't resolve:* safety/warning copy in
the wider UX field ("never share your password," "do not click links from
unknown senders") is negative-assertion prose by design, and warning-label
research treats imperative negative framing as *more* effective at
preventing the exact behavior than a positive rewrite — a case that fits
neither of this rule's two named exceptions (lint, container edge). Nothing
in the corpus addresses whether this rule intends to cover safety-critical
copy or was scoped to a narrower kind of prose framing. Recorded as a gap,
not resolved here.

**System jargon gets translated to plain function-naming; the user's own
coined vocabulary is kept.** — `feedback_plain_language_widgets.md`
(2026-07-03; full rule and examples in § B).

**Voice register for anything authored under the user's name: direct,
geometric, no apology, no padding.** What doesn't land: soft openings,
generic encouragement, hedging beyond what the actual uncertainty warrants.
— `feedback_voice.md`.

**Demonstrate, don't describe — cut explanatory/gloss text where the
structure already enacts the point.** *"I feel like you're describing rather
than demonstrating through the word choices you've made"* (2026-05-11).
Cut-list for public pages: "why this matters" blocks, "what this page isn't"
anti-objection blocks, "how this works" framing, intro paragraphs naming the
page's own logic, closing summary italics, stance bullets explaining a
form. Test: does the text tell the reader what the page will do / explain
why the structure works / summarize what just happened? If yes to any, cut
it. Exception: pages whose *register itself* is structural/long-read
description are exempt. — `feedback_demonstrate_not_describe.md`.

**Public writing about the user's own life/system stays first-person as
their lived instance; only the abstracted pattern is offered as a
"model."** Second-person copy ("you keep what you need, your bus, your
solar") reads as projecting one person's specific setup onto the reader as
something to copy. Fix: first person for the instance, the transferable
pattern named separately and explicitly held apart. —
`feedback_publish_instance_not_model.md` (2026-06-08).

**Public tools demonstrate by being used, not by being read.** *"the tool IS
the demonstration… build tools that others can use to learn, engage, and
support."* Constraints for such tools: standalone, no external dependencies,
no AI grading the user's answers, any donation ask mentioned once as fact,
never pushed. — `feedback_tools_not_pages.md`.

---

## E · Concrete Design-System Conventions (shipped, code-level)

**DS_v1 / DssKit** — a published component library (`dss-ds-kit`) wrapping
an HTML chassis. — `ds-kit/.design-sync/conventions.md`, `ds-kit/ds-bundle/
README.md`. (Source material states "17 React components" without listing
all 17 by name; 14 are individually named in the grammar below. Recorded as
given — not independently verified against the package itself.)

- **Typography:** Courier New, 12px, warm off-white field. No dark theme, no
  external brand font.
- **Mandatory root wrapper:** every component must render inside a
  `DssRoot` provider. Outside it, components render as unstyled
  browser-default HTML — no throw, it just looks broken. Documented as the
  single most common mistake with this kit.
- **21 CSS custom properties** (`ds-kit/src/tokens.css`):
  - Fields: `--bg` `#f7f5f0` · `--sf` `#eeebe3` · `--sf2` `#e6e2d8`
  - Ink: `--g` `#3a3020` · `--gb` `#1a1408` · `--gd` `#7a6840` ·
    `--gf` `#a89870` · `--gfaint` `#ddd8cc`
  - Borders: `--bdr` `#ccc5b0` · `--bdrk` `rgba(58,48,32,0.15)`
  - Cross/affirmative: `--grn` `#2a6a1a` · `--grn-bg` `#e8f2e4`
  - Alarm: `--red` `#8a2010` · `--red-bg` `#f5e8e6`
  - Held/marked: `--yel` `#7a5a10` · `--yel-bg` `#f5f0e0`
  - Anchor/exit: `--anc` `#4a5a8a` · `--anc-bg` `#e8ecf5`
  - Zone fields: `--read-bg`, `--decide-bg`, `--cross-bg`
- **Color semantics are load-bearing, not decorative:** yellow = a mark is
  being held, green = the one move that exits, blue-grey (`--anc`) = a
  pre-authored way out. Don't repurpose them.
- **Fixed composition grammar:** `HeaderBlock → Locator → Board(RoomCard…)`
  at the board level (rooms are entered, not expanded). `RoomView` = title +
  pre-authored exit (`BackAnchor`) + its own `Locator` + tiles. `Tile` holds,
  strictly in this order: `ZoneRead` (the reading) → `ZoneDecide`
  (reversible `DecideButton`s) → `ZoneCross` (exactly one `CrossButton`, the
  irreversible exit) — the shipped, code-level version of § B's "reading
  never gated behind the control that also decides." `MarksBar` is a
  footer: chips for held marks, an optional deposit chip, a status line, an
  optional clipboard-fallback reveal box. `GroundingTag` is binary and
  qualitative (grounded | reached) — never a score.
- Every interactive callback is a plain callback — the kit ships no
  clipboard, network, or navigation side effects; the host app owns those.

---

## F · Process — How UI Decisions Get Made

**Only the user's own click/mark counts as a decision.** The decision
surface is a specific file; marks live there and in a log, and only the
user's click marks — the AI never marks on their behalf. — root `CLAUDE.md`.

**The AI's job is to map both sides of a decision, never to collapse into a
recommendation on its own.** *"the witness is the user… my job is to surface
as much information as possible and map both sides."* Named limit: the AI
maps decision-information; it cannot read the user's body — the somatic half
of any felt-gate stays unreachable by the AI, fail-closed when uncertain. —
`feedback_map_both_sides.md`.

**Publishing/deploying to a public surface, or deleting anything, requires
an explicit mark — never inferred.** Editing/drafting/staging/proposing/
read-only checks inside the workspace are free; pushing to public surfaces
needs an explicit word ("push," "deploy," "publish," "ship it"). Staging
unpushed is the default; archiving is preferred over deletion even when
deletion is authorized. — `feedback_publish_delete_boundary.md`
(2026-05-29).

**Don't build a UI feature unless it removes a burden the user would
otherwise carry in their own head.** *"If this disappeared tomorrow, would
[the user] once again have to carry something in his own head? If no, don't
build it."* Explicit non-goal: this gates what gets built, never how much
the user gets — it subtracts candidate builds, never capacity, depth, or
held material. — `feedback_load_test_build_gate.md` (2026-07-23).

**Pace UI complexity/decision volume to the user's felt-read capacity, not
to what could be generated.** *"[the user]'s ability to name and
differentiate isn't keeping up with the task."* One decision surface per
turn, not a list of five — if you catch yourself listing N options to
choose among, you've already cost-shifted. This is the ceiling that
reconciles with § B's "derived, never padded" floor — see that entry. —
`feedback_pace_to_felt_read.md` (2026-07-06). Related: reflective/mirror
portions of a response scale with input length (`feedback_recognition_
length.md`) without loosening this pacing rule; and felt-read is stated to
degrade the more abstraction sits between the decision and something the
user could directly perceive — the operative instruction, not just a
metaphor for it, is to hand one body-readable decision at the base rather
than ask for a felt verdict on something several layers removed
(`feedback_felt_read_horizon.md`).

**Verification requires a genuine look, not an inferred pass.** *"Instruments
gate; only the eye gives a [walked verdict]… no screenshot exists, the
compositing was never confirmed visually."* — `nesi/game2d/
THE_BOOT_2026-08-18.md`, applying § C's stranger-verification and pixel
rules live, on a current build, dated after both were first written.

**Concrete marked design rules from the build log (verbatim, dated — each
scoped to this specific build, not general UX law; see § G for the same
caveat stated explicitly elsewhere in this document):**
- 2026-07-25 — *"Build constraint: [the world] can have no completion
  affordance — no confirm/accept/handshake/mutual-agreement state. The
  absence of a confirm button is load-bearing."* (This is a deliberate
  design choice for a game with no destructive/irreversible actions to guard
  — it is not a general claim that confirm dialogs are wrong; confirmation
  steps on genuinely destructive or hard-to-reverse actions are standard,
  well-evidenced UX practice outside this build's specific context.)
- 2026-07-30 — *"We don't hide a user's decisions. They remain as the
  terrain of the interface, modifiable in any moment, with upstream and
  downstream mapping of each decision point."*
- 2026-08-01 — *"No dead-end crosses: cross buttons render only with
  preconditions verified same-turn, or the gap named on their face."* (an
  exit/commit control must never be shown as available if it would actually
  fail)
- 2026-08-06 — walking the live 3D build directly: *"The buildings arent
  rooms that can be entered… the tools arent useable… theres no visual
  assets… It's an amalgamation of undecispherable framework language on sign
  posts."* Root cause traced in the same entry: a "no imported assets" law
  meant a building couldn't visually look like its function, so floating
  text labels became the only way to communicate it — the signposts were the
  compensation for the law, a documented tension between two design
  principles (no imported art vs. self-explanatory objects), left open
  rather than resolved.
- 2026-08-06 — "the articulation-free brief": *"if each space has a
  worksurface and tools… if objects and their uses are apparent by shape and
  design rather than explanation… A button that folds a sorting tarp doesn't
  need language processing… I'm trying to build a system where I don't need
  articulation."* Built and verified same entry: a "sorting tarp" UI laying
  out 463 real items at once, using footprint = size and thickness = age as
  the only encoding, zero text nodes, fold-and-commit with staged-not-
  committed semantics.

There is no separate governance track for "UI decisions" — the same rules
above (user's-mark-only, load-test, pace-to-felt-read, publish/delete
boundary) apply to every output this corpus produces, UI included.

---

## G · Scope Boundaries and Other Findings

**Three of this document's rule-sets are explicitly non-transferable across
the three surfaces this corpus builds for, and the source material only
states this outright for one pair.** Extending that same logic to all
three, since nothing in the corpus argues the third is different in kind:
**DSS decision-surface widgets** (§ B, § E — chassis history, gating,
plain-language, steer-copies-never-sends), **the game world** (§ A's
progression/indicator rules, § G's refusals below, the silent-safety
pattern), and **public/authored pages** (§ D, § A's dark-background rule).
§ F's process rules (user's-mark-only, load-test, publish/delete, pacing)
are the one layer stated to bind all three. A rule true for one surface —
e.g. "no numeric feedback, ever" (§ A, game world) or "derived list, never
padded" (§ B, widgets) — should not be assumed to hold on a different
surface without checking; the corpus itself makes exactly this point for the
widget-status-line-vs-game-dashboard case below.

**A dedicated design-critique lens ("gamecraft") rules on UI/feel for this
one game's context and records refused anti-patterns with their
substitutes** — these are one lens's rulings for one specific build, not
general UX claims, and are recorded here without independent evaluation of
whether the same call would hold for a different game or product:
- *Social comparison* (leaderboards, friend feeds) — refused: comparison is
  scoring outsourced to peers, and the design has no second player.
- *An exit that resists* — refused; the lightest possible door in both
  directions IS the retention design.
- *Difficulty-as-paywall analogues* (grind walls relieved by more input,
  streak-guilt) — refused; substitute is fail-as-physics with self-relief on
  the world's own time.
- *Onboarding funnels, forced tutorials, unbidden tooltips* — refused.
- *The "dashboard instinct"* — a status-overview screen summarizing
  everything at once — refused as "a completion meter with better
  typography." Substitute: an in-world vantage point you physically stand
  at, showing only an allowed ambient list, never a summarizing panel. Named
  explicitly in the source as the DSS-widget-vs-game-world non-transfer
  case: a derived "N marks · M gates open" status line (§ B) is correct for
  a decision-surface widget and wrong for a game world, because a game
  world isn't a decision surface — held items render as visible physical
  objects at depth-zero there, never a count. — `counsel/gamecraft/
  CUT_what_must_not_enter.md`.

**Silent-safety pattern: quitting mid-sentence loses nothing, and nothing on
screen says so.** Resolves the standard "players who don't feel safe play
defensively" tension by keeping saves silent (autosave at 2s + blur + close)
rather than showing a "saved" indicator. The source material names its own
cost rather than claiming silence is free: a cleared browser store loses the
world, flagged explicitly so that cost stays visible to the operator rather
than hidden by the UI's calm surface — this is a real, held tradeoff, not a
general claim that silent saves beat visible ones (Google Docs, Notion, and
Figma all show visible save-state deliberately, and user research on those
products found silent autosave *increased* anxiety about data loss). Which
answer is right depends on what's actually at stake if the save fails; this
corpus judged the stakes low enough here to prefer silence. —
`counsel/gamecraft/CUT_collisions.md`.

**Unbuilt regions render their own absence as a small, calm placeholder —
never a demand or nag.** An unnamed region owns its absence as a small
dashed empty box; it gets one naming line only after something actually
lands there. Absence rendered as room, not as debt. —
`counsel/gamecraft/CUT_what_must_not_enter.md`.

---

## What this corpus actually found

Read section by section, this document looks like a UI style guide. It
isn't one — a style guide states preferences. What each section actually
documents is the same discovery, made independently on a different surface
each time: **automated proof and human perception are not the same
evidence, and this corpus kept building things that passed the former while
failing the latter.** A game object at 7.8 pixels. Eight green suites over
an occluded signal. A "landed" state inferred from stillness while the
character fell for eight more seconds. A confirm control that would have
failed if pressed. A widget whose content a person genuinely could not see
without a click they weren't told they needed. Each incident in §§ A–C is
that same gap, found on a different object; §§ D–G are what the corpus built
*downstream* of finally taking that gap seriously — plainer language so a
human reader (not a parser) could actually track what a control did, gating
rules so a human could actually read before deciding, process rules so a
human's own click, not an inferred proxy for it, stayed the only thing that
counted as a decision. The spine this document buried under seven lettered
sections is that single line: **nothing here is really about pixels,
widgets, or tokens — it's about what a system does once it admits that
"verified" and "looked at by someone" are not interchangeable, and builds
everything after that as if the difference were expensive.**

That repair is still owed in the one place it was first found (§ A, § C: no
instrument in this corpus asserts visibility) — the corpus named the
discovery in 2026-08-12 and has been building its consequences ever since
without yet building the thing itself.

---

## Deferral accounting

- **What did this add that nothing calls?** The Glossary and the "What this
  corpus actually found" section are new synthesis, not extracted fact —
  nothing in the source material asked for either. They exist to make the
  self-containment claim (line 1) actually true and to state the throughline
  the audit found buried, respectively.
- **What did it name that it did not build?** The still-owed visibility
  instrument (§ A/C), the reconciliation between § D's negative-framing rule
  and safety-copy practice, and whether the multi-fire signal (§ B) survives
  on slider UI — all three are named as open rather than resolved, on
  purpose, because the source material doesn't resolve them either.
- **What did it defer?** A full pass through the remainder of `MARKS_LOG.jsonl`
  (past the first ~60 UI-flagged lines) and the eight source files listed
  under Coverage above that were never opened. Also deferred: applying the
  authority-tier distinction (corpus law vs. shipped code vs. one-off
  correction vs. candidate) uniformly to every entry rather than only the
  handful flagged here — a genuinely different document (organized by
  authority rather than by design topic) would do this properly; this
  revision only patches the cases the audit caught.

**DEVELOPED.** Rebuilt in place: opening reframed to state its own epistemic
status and coverage limits up front; one unflagged internal contradiction
(§ B's read-before-decide rule vs. § F's pacing rule) named and reconciled
by scope rather than left to collide; one dead rule (multi-fire-as-signal)
marked superseded instead of standing as live present-tense law next to the
architecture that replaced it; four claims (no-digit-ever, no-dark-
backgrounds, no-completion-affordance, negative-framing) rescoped from
apparent general law to this-corpus's-context, each with its strongest real
counterexample named inline rather than omitted; two redundant entries
merged; one unearned numeric claim (17 components) flagged as unverified
rather than stated flat; unfalsifiable flourish trimmed in two entries (§ A's
NPC/indicator test, § F's felt-read reach limit) down to their actually-
checkable claims. Word count grew from 4,074 to 6,208 (`wc -w`, both files as
written — checked directly rather than estimated, after a first draft of
this paragraph stated the baseline wrong by roughly 2x, which a fresh verify
pass caught) — the added material is entirely scope caveats, the glossary,
and the reconciliations the audit and ground passes demanded; no rule was
deleted, four were re-scoped or de-flourished, one was marked historical,
two were merged into one.
