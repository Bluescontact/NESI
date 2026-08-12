# DREAM · developmental ideas — the kevin-lens vertex
2026-08-11 · counsel seat: THE CORPUS AND ITS LAWS · read against: nesi/game2d/nesi.html + BUILD_RECORD.md · workshops/cowan_workshop.html · inbox/INDEX.md (nothing below duplicates a gate card, a workshop-held item, or the Fuller vertex's thirteen)

Every idea has the same form: **the corpus already holds X, verbatim, at path Y — and the game does not yet keep X's promise.** Nothing here is invention; every clause quoted is Kevin's or a standing ruling. Under the FULL FREEZE these are findings for the counsel, never a work queue. No fork is defaulted; every lean is reported as a lean.
Status legend: LAWFUL-NOW = buildable under standing law without a new ruling · NEEDS-KEVIN = touches a ruling or fork that is his · COLLIDES(x) = a standing law pushes back, recorded.

---

## 1 · The stations are three — and the game has four
**The line:** *"fuse them. THE FILTERS is THE MEMBRANE. Three stations. Edit STATIONS in stations.gd — one row and one bearing."* — Kevin's ruling, verbatim, `nesi/spec/LAW_4_AMENDED_2026-08-07.md` §2. Ratified in the world3d tree the same night (filters row removed, 15/15 tests).
**Where the game falls short:** `nesi/game2d/nesi.html` builds FOUR stations — st0 water table, st1 heliostat, st2 membrane, st3 filters (lines 64–67) — with THE FILTERS and THE MEMBRANE standing as two separate rooms. The 2D deposit sited on `THE_FLOOR_2D` and `world2d` code, which predate the fuse; the fuse was ruled against `stations.gd` in world3d. The brief's own instruction governs here: *"When spec and code disagree, say so and ask — do not build to a spec line without checking whether it is superseded."* Neither lineage has been asked which governs the 2D deposit.
**Smallest slice (if he extends the fuse):** the ruling's own edit shape, transposed — the filters row leaves nesi.html, the membrane absorbs the hand-routing, three stations remain.
**Status:** NEEDS-KEVIN — a standing ruling and a standing build meet for the first time; which lineage governs the deposit is his call, not an inference.

## 2 · The set-down has a site, and the game's bare plate doesn't stand on it
**The line:** *"the rim. The shared triangle is the world's one horizontal face — the only place with no fall beneath it, which is law 7's own definition of a thing at rest. Set it down there."* — Kevin's ruling, verbatim, `nesi/spec/LAW_4_AMENDED_2026-08-07.md` §3. And `THE_FLOOR_2D` (as carried in the workshop homework): *"The outer triangle is the fourth... the boundary that holds the other three and returns what reaches it."*
**Where the game falls short:** the bare plate is furniture inside rooms (eight-edit build, item 5) — lawful, but siteless in the world's geometry. The ruled site exists on screen: the outer triangle IS the shared face of the 2D net. The two halves of §4·b (*a sited refusal and an unpersisted refusal now pull against each other* — "both halves are Kevin's own marks, made hours apart... Unresolved on purpose") are still unresolved, and the 2D build routed around the tension rather than through it.
**Smallest slice (only after §4·b is his):** a drop on the outer triangle is a set-down — the boundary as the plate. Whether a set-down thing appears there (persists → a tally) or not (site nominal) is the exact fork §4·b holds open.
**Status:** NEEDS-KEVIN — §4·b is explicitly unresolved on purpose; nothing here defaults it. (Fuller idea 1, the returning edge, touches the same triangle from the other side — this is the set-down clause, not the return clause; the two go up together.)

## 3 · The five-move round — the corpus's own "largest gap," still open in the deposit
**The line:** *"The five-move round's relationship to the world — the largest gap in the inventory, and still open. Empty your pockets · feel for the warm one · pull the thread · hand it over or keep it · let go. Either those are what happens at a station, or the world replaced the game."* — `nesi/spec/THE_FOUR_RULINGS_2026-08-07.md`, "what these four did not touch." The round itself: `nesi/spec/round.md` (Phase 2, boundary-checked), `nesi/spec/NESI_AS_A_WHOLE_2026-08-04.md` §moves. Memory: *"NESI = The Warm One + spine — 5-move paper round atop verified geometry."*
**Where the game stands:** the deposit arguably already enacts four of the five without naming them — empty your pockets (the charge on the tray) · hand it over or keep it (three outputs) · let go (the release) · and the fifth's refusal (the bare plate). What has no enactment is move 2, **feel for the warm one** — the one move that is *"only yours"* (round.md line 11), the felt-read, and the only move a machine could never carry. Whether the stations ARE the round or replaced it is the corpus's own unanswered question, now answerable against a build that exists.
**Smallest slice:** none before his call — the reading above (which move lands where) is the finding; the question *"did the world replace the game?"* goes up open.
**Status:** NEEDS-KEVIN — the corpus names it his largest open gap; enacting move 2 mechanically would also collide with IM-5 (*"the card never names the warm one"*, round.md line 34).

## 4 · Law 4 as amended has no instance anywhere in the deposit
**The line:** *"what must lapse is not the held thing — it is the held thing's CLAIM... Law 4 is amended to read: anything persistent must have its CLAIM lapse and be re-fed."* — Kevin's ruling, verbatim, `nesi/spec/LAW_4_AMENDED_2026-08-07.md` §1.
**Where the game falls short:** nesi.html persists claims that never lapse — the water-table lean persists exactly as set (*"the lean persists"*), the scorch stands forever, region names stand forever. Each keeps its shape AND keeps the operator's standing claim, which is precisely the pre-amendment state law 4 was amended away from. §4·a already names the missing body: *"Under the amendment, an unattended gate keeps its shape and loses the operator's claim on it. What that looks like in a room — with no gauge, no indicator, and no count — is unbuilt and underived."*
**Smallest slice:** one persistent hand-state (the lean is the cleanest: pure claim, no record) whose claim lapses and asks to be re-fed — but the body is *underived*, so no slice exists to name honestly.
**Status:** NEEDS-KEVIN — the corpus itself says the shape has no body; deriving one is a design act that is his to open.

## 5 · The tear heals while he is away — law 8's own words forbid it
**The line:** *"The world runs while you are in it and stops when you leave. No offline progression, no catch-up simulation on load."* — law 8, `~/.claude/CLAUDE.md` (the NESI brief). Confirmed canon by the workshop homework: *"Processing, not time, is the only remover"* and law 8 *"forecloses the offline version on both branches"* (`workshops/cowan_workshop.html`).
**Where the game falls short:** `nesi.html` line 741 — *"wall clock: a saved tear heals on real time, not session time"* (`Date.now()-S.tornAt<RELAX`). The Cowan gate-check fixed a session-epoch bug by moving to wall clock (BUILD_RECORD, "Tear clock wrong across sessions — FIXED") — which made the membrane heal **across sessions, offline**: leave with a fresh tear, return tomorrow, it healed while nobody was in the world. One machine-made fix traded a law-12-adjacent defect for a law-8 breach, and no mark covers the trade.
**Smallest slice:** the tear's remaining heal-time freezes at close and resumes in-session — three lines around one comparison.
**Status:** LAWFUL-NOW — this corrects a machine-made call back toward a standing law; COLLIDES is what the current code does, not the fix.

## 6 · The fourth fraction is ruled, and the ruling that would site it already exists
**The line:** *"Water carries four fractions: dissolved (invisible, feeds life), suspended (clouds, becomes ground), bedload (rocks, goes to the deep), contaminant."* — `~/.claude/CLAUDE.md` (the NESI brief, architecture). And the siting clause, Kevin's F5 ruling: *"the operator's hand runs the filter. No computed pass, no NESI pass — restriction is performed by the same hand that sets the membrane and sorts the drop."* — `nesi/spec/THE_FOUR_RULINGS_2026-08-07.md` R2.
**Where the game falls short:** three fractions only; BUILD_RECORD records contaminant as *"ruled-but-unsited"* because *"enforcing it mechanically would need a classifier, which law 5 forbids."* True — but the corpus already holds the non-classifier route in R2's own words: the same hand. A fraction is contaminant because HIS hand says so at the filter, never because anything read the words. The build treated the classifier as the only door and recorded the fraction unsitable; the corpus's own clause opens a second door it did not try.
**Smallest slice:** a fourth chip at the filters that exists only when the hand declares it — no detection, no default, undeclared forever lawful.
**Status:** NEEDS-KEVIN — the fraction is ruled, the siting is not; and what contaminant-by-his-hand *means* (transactional language being enforced) is his material, never the machine's category.

## 7 · The spring — the corpus's architecture line with nothing behind it in 2D
**The line:** *"Each has a dam, a spring at its base, a triangular ground deposit, and a river running to the central lake."* — `~/.claude/CLAUDE.md` (the NESI brief, three spires). The lens carries its physics: a spring is where water becomes visible, not where it begins.
**Where the game falls short:** nesi.html has dams, grounds, and the lake — and no spring anywhere (and no river as an object; see idea 8). Released water simply arrives at ground. The one place the architecture says water BECOMES VISIBLE — the moment the world first answers the writer in water rather than in light — has no site on the 2D net.
**Smallest slice:** the release's water first surfaces at a fixed point at the spire's base before its runout — rendering only, touches no store.
**Status:** LAWFUL-NOW (a rendering of a carried architecture line; under the freeze, a finding).

## 8 · "A held gate now has a downstream" — the not-crossing is not yet legible
**The line:** *"a held gate now has a downstream. Water held at the dam is water not arriving at the lock — so a closed gate is not only a normal state, it is legible as what is not crossing yet."* — `nesi/spec/THE_WATERSHED_2026-08-04.md` line 114.
**Where the game falls short:** the held side is enacted (held stones visible through the glass — FK2, Kevin's ruling *"all held stones visible — depth-zero governs"*). The downstream side is not: there is no river object in nesi.html at all (zero matches), so nothing below a holding dam is legible as *what is not crossing yet* — a hold and a never-used channel look identical.
**Smallest slice:** the channel is terrain memory — it exists only after its first release, so from then on a holding dam stands above a visibly dry channel. Behavior as the carrier, no marker.
**Status:** LAWFUL-NOW — with one edge stated aloud: Kevin's re-space ruling (*"nothing points at what is missing"*, LAW_4_AMENDED §2) means the dry channel must read as a fact of terrain, never as an arrow; if it can't, the idea fails its own law.

## 9 · Depth-zero and the one governed act
**The line:** adopted verbatim as chassis law: *"Every live decision renders open and markable at depth zero; navigation carries reading, never decisions; batch-hold and deposit always reachable without entering anything."* — `nesi/mind/PROTOCOLS.md` (Depth-Zero Decisions, Kevin's mark 2026-08-01). And Kevin himself has already carried this law across the widget/world boundary once: *"all held stones visible — depth-zero governs"* (FK2, BUILD_RECORD).
**Where the game falls short:** the world's one governing decision — release / keep holding — lives inside the dam panel, a room entered by click. The rooms doctrine keeps the panel lawful as *reading*; but the decision itself is at depth one. His FK2 mark pulled the dam's *visibility* to depth zero and left the *act* inside.
**Smallest slice:** the dam accepts the release gesture at the world surface (the panel remains as the reading room).
**Status:** NEEDS-KEVIN — depth-zero is chassis law for decision surfaces; whether the game IS a decision surface in that law's sense is exactly the kind of scope call he has made once (FK2) and only he can extend.

## 10 · Clause 3's debt stands unpaid on the 2D lineage
**The line:** *"Every substantive build gets at least one divergent pass that reaches past feasibility, before convergence — un-censored, un-ranked, never verified by its own author."* — Vertex II clause 3, SIGNED 2026-08-01, quoted with its ruling in `nesi/spec/THE_FOUR_RULINGS_2026-08-07.md` R4: *"yes — every slice owes clause 3 a divergent pass... Clause 3 is current"* — current, that ruling says, **as of 2026-08-07**.
**Where the game falls short:** the 2D deposit's record (`nesi/game2d/BUILD_RECORD.md`) logs at least six substantive passes since — the latent pass, the standing water, the teaching, the supersession, the writing tetra, the eight-edit build — and records no divergent pass against any of them. The clause's own falsifier is live: *"if sessions converge on the first workable shape with no divergent pass, Vertex II was ceremonial."* (This counsel's four DREAM files are divergent passes in the clause's sense — but each is verified by its own author, which the clause explicitly bars from counting.)
**Smallest slice:** one recorded divergent pass, by a vertex that did not build the thing, against the next substantive slice — the mechanism the agreement already specifies.
**Status:** LAWFUL-NOW — it is a standing signed obligation, not a new generation; the finding is that the debt has been silently accruing since 08-07.

---
Deposited by the DREAM vertex, kevin-lens counsel, read-only elsewhere. Ten ideas; every one tethered to a verbatim line; six wait on Kevin, none is defaulted, and the freeze holds over all of them.
