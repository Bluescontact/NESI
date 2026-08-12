# STANDING SPEC — Composer (renders)
**Built 2026-07-20** (§ NESI SESSION 4/4). Unmarked — Kevin has not yet seen it run in the window.
Specified through the construction-language canon (10-field form, seed_construction_language.md).
Source: this session's brief, "THE COMPOSER — NESI'S RENDER LAYER (4th BUILD)".

```text
ORGAN:      composer
PROBLEM     the bench (and every other organ) makes an object's content but
            renders nothing — a made thing had no seat where it became an
            artifact in NESI's own already-ratified house register
FORCES      render vs author (the Composer turns structure into the locked
            format; it does not decide what a diagram means — that is the
            one stubbed seam) · invariance vs expression (the template must
            stay fixed while text/diagram vary per item) · symbol-as-index
            vs box-and-arrow (default grammar silently imports meaning-in-
            the-box; the register must invert it) · upstream-of-the-door
            vs parallel-to-it (what crosses is a rendered artifact, never a
            blob — but this organ crosses nothing itself)
FORM        compose(obj, dsl_text=None) -> {card, infographic, doc,
            diagram_status}. Takes in: a staged/bench object + an optional
            hand-authored diagram-DSL text · hands off: three render
            outputs in ARTIFACT_GRAMMAR.md's locked register, sharing one
            register_css and one render_diagram_svg() at two scales ·
            stops: never marks, never crosses, never invents a diagram for
            an object that doesn't carry one
FALSIFIER   a diagram-less object shipping a card/doc that pretends to have
            a diagram — compost. Per-item layout, type, or color variation
            anywhere in the register — compost, that is the invariance law
            breaking. A node box carrying color-coded or positional meaning
            instead of the boundary band — compost, that is the symbol law
            inverted back to box-and-arrow.
PLUMB       ARTIFACT_GRAMMAR.md (RATIFIED 2026-07-16) · ENGINE_SOCKET.md's
            engine-agnostic unit, reused verbatim (bench.invoke) · bench.py
            (unmodified except one additive stub-op line) — true
FALSE CAR   author_diagram stubbed at the bench socket — always returns an
            empty-but-valid DSL skeleton (nodes: []  edges: []), badged;
            the deterministic template + renderer run real today regardless
FALSE CAR   compose() called directly (Python) or from a staged object's
            path; not yet its own window tab — same posture reader.py had
            at its own S3 birth (invoke("read")'s call site, not a UI, first)
ENTRANCE    not yet its own tab — reached by calling composer.compose(obj)
            with a staged/*.json path and (optionally) a hand-authored
            *.dsl.yaml path; front/interrogator/bench output are NOT yet
            routed through it this session (pipe-vs-language mark is
            Kevin's, held; wiring those call sites is a later raising, not
            assumed here)
INTERLOCK   ONE renderer (render_diagram_svg, called at two SIZES — no
            second drawing path for infographic vs card) · ONE register
            (REGISTER_CSS, imported by all three artifact types, never
            re-derived per type) · does not touch bench.invoke's dispatch
            law — author_diagram is one more entry in the same stub table,
            same fallback-loud rule as every other op
SIGN-OFF    not yet seen live in the window — build-session smoke test only:
            composer.py run headless against a real staged bench object
            (2026-07-19_made_id_like_to_build_a_lease_3e1350.json) with a
            hand-authored DSL, producing real card/infographic/doc bytes;
            and against a second staged object with no DSL, producing a
            flagged missing-diagram render, never a fabricated one — both
            samples on disk under bench/composer/samples/
```

## The two marks named in the brief, as received (not ratified here)
- **Pipe vs language:** default taken as PIPE — organs hand off to the
  Composer rather than each speaking the register natively. Not wired to
  front.py/interrogator.py/bench.py output this session; that is a
  separate raising once Kevin reads this spec and the default holds.
- **Symbol-law inversion:** taken as RATIFIED per the brief's own framing
  ("this one is yours to ratify, not just flip") — enforced in code as the
  boundary-band-drawn-first rule in `render_diagram_svg()`. If Kevin does
  not confirm this reading, the renderer's hard-coded ordering is the thing
  to revisit, not a config flag to add.
- **Register-matching (seed register by audience):** out of scope, deferred
  door-side per the brief's default — no audience-switching code exists
  here, on purpose.
