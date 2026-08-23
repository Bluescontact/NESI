# GATE READ — the Ten Deposits register against the live build

Runs the register at `EXTRACTION_2026-08-21_ten_deposits_consolidated_register.md`
against `nesi/game2d/gate/` and `nesi/mind/LEARNED.md` as they actually stand
on disk today, not as summarized. Two passes, per Kevin's mark: (1) the 8
convergence laws against what already runs, (2) candidates pulled from the 9
still-unprocessed deposits' own anti-nutrient entries — the only part of
those 9 deposits detailed enough in the register to check against anything.

Everything below is a candidate. Nothing here is marked. Per LAW 7 of the
register itself, and per this corpus's own `nesi/mind/LEARNED.md` laws 20/25
and the `authority-check` skill: a session may run the sequence, only Kevin
makes the mark. Drop rule applied throughout (LEARNED law 9): confirm,
collide, or note where it already exists — then stop.

## Pass 1 — the 8 convergence laws against what already runs

Six of the eight are already live and running in `nesi/game2d/gate/`, most
of them independently of this register — several are older than it and cite
their own prior card numbers (`Card 04`, `Card 06`, `Card 08` — a *different*
numbering than the register's `p2p·5`-style citations; the two schemes are
not the same corpus and should not be conflated).

**LAW 1 (render never promotes itself) — CONFIRMED, structural.**
`gate.mjs:16–18` states the jurisdiction directly: "BUILDER'S GATE, not
player's surface... No gate event has a player projection." The builder
ledger cannot leak into what a player sees, by construction, not by
discipline. A sharper instance of the same tension is already on record
inside the build itself, at `03-blanks.mjs:16–24`: the corpus's own world
design "refuses to record where the sounding found nothing, on the stated
ground that a map of the empty places is a map of the player's failures" —
so 03-blanks implements *only* the builder-side half and structurally
refuses if pointed at a player-surface key (`FORBIDDEN` regex,
`03-blanks.mjs:38`). That fork is already named and already open; the
register doesn't add a new one, it corroborates one already on the ledger.

**LAW 2 (two gates, readiness ≠ truth) — CONFIRMED.** `gate.mjs:4–7`: five
mechanisms refuse or hold ("could this be attempted"), one admits ("what got
through"). `06-landed.mjs` is explicitly built as "the counterweight to the
other five" and reads a *separate* file (`MARKS.jsonl`) from what the other
five instruments check — entry validation and outcome are structurally two
different reads, not one gate wearing two names.

**LAW 3 (absence must be typed, failure loud) — CONFIRMED, and more
granular than any single cited source.** `check_all.js:139–147` distinguishes
CRASH / FAIL / GONE / THIN(vacuous) / HELD as five separate failure-shapes,
specifically because "an instrument that threw before reaching its own
assertions checked nothing; one that ran and refused checked everything and
found a breach. Reading the first as the second is how a green run hides a
dead instrument." `gate.mjs`'s own verdict grammar (vacuous/refuse/void/pass,
exit codes 0/1/3) is the same distinction at the gate layer. This is the
single strongest match in the whole register — the mechanism DivineOS,
hledger, and OpenCivics each independently gesture at is already built here
with one more state than any of them shipped individually.

**LAW 4 (no cost vanishes) — PARTIAL.** Every gate instrument must
`declaresCost` in the first person or the run is void (`gate.mjs:75–82`);
each instrument's `cost` string names what running it costs someone (e.g.
`03-blanks.mjs:33–35`: "a quiet week costs you an act you would rather not
perform"). That is Law 4's mechanism applied to *the gate's own act of
checking* — close kin to `LEARNED.md` law 21, "the priced act." What is
**not** built: McNamara's actual question — who pays to hold *this
mechanic* open — applied to the game's organs themselves, not the
instruments that watch them. Gap, not contradiction.

**LAW 5 (escalation is a number) — PARTIAL, weakest match.** `04-horizon`
and `03-blanks` both gate on a day-count number (7-day horizon, 7-day max
gap) — numeric, not a mood, so the general shape holds. But nothing in the
live build does what OpenCivics' $2,500 threshold or the licence graveyard's
membership/magnitude split does: change *who reviews* based on the
*size* of what's being asked. This is the one convergence law with no
live counterpart yet — a genuine candidate, not a confirmation.

**LAW 6 (ledger is a byproduct of the act) — CONFIRMED, already
self-cited.** `gate.mjs:137–138` reads, verbatim: "Card 04 + Card 08 at the
builder gate: refusal/ending becomes evidence as a side effect of moving.
The gate does not rely on a second bookkeeping act." Every `gate.mjs` run
appends to the ledger automatically (`append()` at line 140), win or refuse.
This law was landed here before the register arrived.

**LAW 7 (anything runs the sequence, only Kevin marks) — CONFIRMED.**
`06-landed.mjs` reads `MARKS.jsonl`; the only write path is `admit.mjs`, a
separate tool from the gate run itself. Matches `LEARNED.md` laws 20 and 25
and the `authority-check` skill directly. Nothing to route — this is the
rule this whole session is currently operating under.

**LAW 8 (build nothing you will not count) — CONFIRMED, live and currently
mid-refusal.** `02-selfuse.mjs` is headed "Card 06. Self-use is the only
health metric," names 12 organs, and refuses if any organ goes 14 days
unrouted. Per `nesi/game2d/gate/LEDGER.jsonl`, as of the latest runs on
disk, 1 of 12 (TANK) has ever been routed; the other 11 — DAM, FILTER,
STATIONS, GROUND, DEEP, HELIOSTAT, OVERWINTERING, CAST, LENS, GARDEN,
SEATING — are still cold. This is Law 8 firing on this exact build right
now, not a hypothetical.

**Worth naming once:** `02-selfuse.mjs:11–16` and `06-landed.mjs:11–19`
each explicitly refuse to reward *frequency* of routing/marking — an empty
window is reported as "a correct state, not a finding," citing `LEARNED`
law 20 by number. That is the P2P Wiki anti-nutrient's exact warning
("never reward mark frequency"), already answered, independently, before
this register existed. See Pass 2 below.

**Net for Pass 1:** Laws 1, 2, 3, 6, 7, 8 confirm what's already running —
nothing to build. Laws 4 and 5 name real, specific gaps: (a) a cost-bearer
check aimed at game mechanics rather than at the instruments, (b) a
magnitude-based escalation split alongside the day-count ones that already
exist. Both are candidates below, unmarked.

## Pass 2 — candidates from the 9 unprocessed deposits

The register gives only one deposit (Sweetwater) as full cards; the other
nine survive in this register only as one paragraph and one anti-nutrient
entry each. That is not enough material to gate-process 113 individual
cards — there is nothing behind most of those citation chips (`p2p·5`,
`gift·anti/seams`, etc.) beyond the sentence they sit in. What follows is
everything in those nine anti-nutrient entries specific enough to check
against this repo, checked, and nothing further invented.

- **DivineOS · empty keepers** ("import composting instruments, never the
  ritual alone") — **already true here.** This build's compost mechanism
  (`gate/COMPOST.jsonl`, `.gate_control/COMPOST.jsonl`, the `metabolizer`
  skill) is native, not ported from DivineOS. Nothing to route.
- **P2P Wiki · never reward mark frequency** — **already answered**, per
  Pass 1 above (`02-selfuse.mjs:11–16`, `06-landed.mjs:11–19`). One open
  item the register names that this build does *not* yet answer: "no page
  anywhere describes a dispute path" — there is no visible dispute/contest
  mechanism for a gate refusal or a mark in `nesi/game2d/gate/`. Candidate,
  unmarked.
- **systemeducation · the empty toolbox** — matches the shape the
  `instrument-audit` skill already exists to catch (a category with no
  cards under it is a false gate). Already answered by an existing skill,
  not a new build.
- **Gift graveyard · do not write the philosophy page** — direct warning
  against exactly the shape of `nesi/mind/` accumulating draft/extraction
  files faster than `nesi/game2d/` ships. Not a code gap; a standing
  caution worth carrying forward as prose, not a routable card.
- **OpenCivics · zero-byte sanction** — matches what `boundary-audit`
  already exists to check (a stated boundary that isn't a filesystem fact).
  Already answered by an existing skill.
- **Governing Engines · a machine's doctrine** ("ask whether an entity has
  capacity, consents, or is depleted") — **no live counterpart.** Nothing
  in `nesi/game2d/gate/` reads for the player's own capacity/depletion; the
  gate is entirely build-side. Candidate, unmarked — and note it cuts
  against `LEARNED` law 13 ("held is lawful... never build a
  re-engagement hook") if built carelessly, so any routing here needs that
  law read first, not just this anti-nutrient.
- **Shimotsuki · the consensus is the hazard** — a reading discipline
  ("a deposit that arrives pre-approved should be read twice"), not a
  buildable check. Applied directly to this session: this register itself
  arrived already collapsed into 8 laws with citation counts that read as
  consensus. Pass 1 above is the second read.
- **Fullerton · a monoculture citing itself** — same as above, a reading
  discipline already applied in Pass 1 (six of eight laws checked against
  code, not re-asserted from the register's own confidence).
- **Mallinckrodt · precision that doesn't survive a second look** — matches
  what `record-audit` already exists to check (unsourced specifics stated
  in a verifiable register). Already answered by an existing skill.

**Net for Pass 2:** of nine anti-nutrient entries, six are already answered
by mechanisms or skills that predate this register (composting, self-use
refusal, instrument-audit, boundary-audit, record-audit). Two are prose
cautions, not routable. One is a genuine, unbuilt gap: **no dispute path for
a gate refusal**, and a second smaller one: **no capacity/consent read on
the player side of the gate** (Governing Engines' anti-nutrient) — flagged
with the law-13 caution attached.

## What's actually left to route — three candidates, unmarked

1. A magnitude-based escalation split (LAW 5 gap) — something in
   `nesi/game2d/gate/` that changes *who reviews*, not just *when*, based
   on the size of what's proposed. No day-count instrument does this today.
2. A cost-bearer check aimed at game mechanics/organs (LAW 4 gap,
   McNamara's two-node rule) — distinct from the gate's own declared cost
   of running.
3. A dispute path for a gate refusal (P2P Wiki anti-nutrient) — currently
   nothing; a refusal is terminal until Kevin acts on it by hand.

These are named, not built, and not marked. Per LAW 7 and `LEARNED` laws
20/25: the leap from "this converges" to "NESI should change" is Kevin's to
make.

## BUILT, 2026-08-21, on Kevin's mark "build the gaps"

All three now exist as real instruments, wired into `gate.mjs`'s MODULES and
`gate.test.mjs`'s CLI-reachability check, config'd in `gate.conf`, verified
with `node --test tests/gate.test.mjs` (11/11 pass) and `node
tools/check_all.js` (23/24 hold; the gate itself reports THIN, honestly, for
the reason below — nothing else regressed).

- **`instruments/07-magnitude.mjs`** — a proposal declares a magnitude 1–10;
  above the configured threshold (6) it cannot close on the sitting that
  proposed it and refuses until a second, separate `confirm` is recorded.
  Below threshold, one mark closes it. Live and enforcing.
- **`instruments/08-return.mjs`** — reads `ORGANS.txt` against a new,
  hand-edited `RETURNS.txt` (same `key = value` grammar as `gate.conf`) and
  refuses any organ with no declared return path. **Seeded empty on
  purpose** — naming what TANK, DAM, FILTER, STATIONS, GROUND, DEEP,
  HELIOSTAT, OVERWINTERING, CAST, LENS, GARDEN and SEATING actually give
  back is a design act about the game itself, not something to invent while
  building the checker. Right now it refuses on all 12, honestly.
- **`instruments/09-dispute.mjs`** — `open`/`close` a dispute against a
  refusal ref. Ships HELD, always, like `03-blanks` and `05-subtract`:
  whether a dispute is allowed to change a verdict is a fork only Kevin can
  close, and building the mechanism is not the same act as granting it
  override power over its own gate.

Not done, and not this session's to do: filling in `RETURNS.txt`. That is
the actual answer to Law 4, and it needs knowledge of what each organ is,
which is Kevin's or a game-craft read's, not a gate-instrument's.
