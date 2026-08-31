// THE SPINE — the eight nucleation points, as data.
//
// Kevin's mark, 2026-08-31: "lets commit those 8, and assemble the deposits
// onto them. Thats the spine." The crystals themselves are argued, sighted,
// and crossed in nesi/UPSTREAM_2026-08-31_nucleation_points.md — this file
// is that document's machine-readable face, and the ONE place the seating
// of deposit items under crystals lives (crystal 7: a fact lives in one
// place; a copy is a drift waiting to happen). The index builder and both
// deposit pipelines read from here; nothing else restates the mapping.
//
// SEATS is a proposal in the same sense the typology is: each seat carries
// its one-line why, and Kevin's felt read outranks every line of it.
// A mark absent from SEATS renders as UNSEATED in the index — visible,
// never silently dropped (crystal 6's discipline applied to this file).

const SPINE_DOC = 'nesi/UPSTREAM_2026-08-31_nucleation_points.md';
const SPINE_MARK_ID = 'upstream_nucleation_points';

const CRYSTALS = [
  { id: 'c1', name: 'the recognition law',
    line: 'the mechanic never does the recognizing — the machine surfaces and holds still while the person does the seeing' },
  { id: 'c2', name: 'the mark is the only crossing',
    line: 'nothing binds except by Kevin’s own mark, and supersession is a layer on top, never an erasure' },
  { id: 'c3', name: 'the unit is the mechanism, never the project',
    line: 'extract the pattern that recurs; leave the project it was found in' },
  { id: 'c4', name: 'the held center',
    line: 'the middle of every frame is deliberately empty — the law sits there, or the person, never a component or a score' },
  { id: 'c5', name: 'the gift orientation',
    line: 'everything faces outward, and the labor of landing clean is paid upfront' },
  { id: 'c6', name: 'the claim carries its own falsifier',
    line: 'no assertion stands on confidence — "a fact, not a claim" is the highest standing anything has' },
  { id: 'c7', name: 'the single source',
    line: 'a fact lives in one place; a copy is a drift waiting to happen' },
  { id: 'c8', name: 'the tetra/VE geometry',
    line: 'the corpus’s form-language — a signature, not a law; "it should be a tetra" is never an argument' },
];

// mark id -> { crystal, why }. The why is the seat's own one-line account.
const SEATS = {
  'day_one.first_walk':                      { crystal: 'c5', why: 'walked for the first time by another hand — the outward test' },
  'gift_01_deep_visibility_culling':         { crystal: 'c3', why: 'a rendering mechanism recognized and carried across substrates' },
  'gift_02_godot_filters_panel':             { crystal: 'c3', why: 'a sorting mechanism carried between substrates, not a project imported' },
  'gift_03_garden_growth':                   { crystal: 'c1', why: 'a growth-form fed by the writer’s own material, never scored' },
  'gift_04_blind_writing_mode':              { crystal: 'c1', why: 'a way to write unwatched — the machine holds still' },
  'gift_06_verified_write':                  { crystal: 'c6', why: 'persist() reads its own write back — a fact, not a claim' },
  'gift_07_sorting_tarp':                    { crystal: 'c1', why: 'the writer does the sorting; the ground only holds' },
  'gift_08_ratify_by_crossing':              { crystal: 'c1', why: 'confirmation is the hand’s physical act, never inferred' },
  'gift_09_grain_siting':                    { crystal: 'c8', why: 'named from solid.js’s own coordinates — the form-language read honestly' },
  'gift_10_freshet_test':                    { crystal: 'c6', why: 'the named one-line falsifier for any ambient readout' },
  'gift_12_the_case':                        { crystal: 'c6', why: 'the page’s own refusals and facts, shown as facts' },
  'gift_13_burn_shape3_test':                { crystal: 'c6', why: 'a shape shipped together with its test' },
  'session_bridge_2026-08-25_build_state_survey': { crystal: 'c2', why: 'a dated, layered record of state — the ledger convention at session scale' },
  'session_bridge_2026-08-27_three_actions': { crystal: 'c2', why: 'actions and their return paths, caught to a dated record' },
  'session_bridge_2026-08-30_onedrive_relocation': { crystal: 'c2', why: 'a relocation recorded as a layer, nothing erased' },
  'k_lens_group_k_scanner':                  { crystal: 'c5', why: 'finds gifts — value that left a build and landed' },
  'stale_count_check':                       { crystal: 'c7', why: 'walks stated counts against reality — copies drift, so check them' },
  'library_lens_scanner':                    { crystal: 'c5', why: 'the gift-finder itself — the deposit’s upstream eye' },
  'lens_usage_check':                        { crystal: 'c6', why: 'usage claimed, checked against usage real' },
  'agent_usage_check':                       { crystal: 'c6', why: 'usage claimed, checked against usage real' },
  'skill_invocation_check':                  { crystal: 'c6', why: 'the real signal — a mention is not a run' },
  'agent_invocation_check':                  { crystal: 'c6', why: 'the real signal — a mention is not a run' },
  'typology_classify':                       { crystal: 'c3', why: 'the five-way sort of what a mechanism is, extracted alive from a composted body' },
  'deposit_pipeline':                        { crystal: 'c5', why: 'the labor of landing clean, paid upfront, as code' },
  'harness_boot_layer':                      { crystal: 'c6', why: 'instruments at boot — the corpus checks itself before it speaks' },
  'ledger_tools':                            { crystal: 'c2', why: 'the append-only machinery itself' },
  // Imported from soil through the gate, 2026-08-31 (Kevin: "continue
  // importing previous work through the gate after being filtered for
  // the gate") — filtered by mechanism, each backing or extending an
  // organ, each file verified real before admission.
  'second_mark_preflight':                   { crystal: 'c2', why: 'a consequential crossing needs two independent confirmations — crossing discipline, hardened' },
  'renderer_seam':                           { crystal: 'c3', why: 'the boundary that keeps a mechanism swappable — forbidden to know its implementation' },
  'continuity_derived_view':                 { crystal: 'c7', why: 'a resume-view derived from the ledgers, never a source of truth of its own' },
  'held_named_gaps':                         { crystal: 'c6', why: 'everything held carries the name of what it is waiting for — the honest blank, working' },
  'prior_art_check_tool':                    { crystal: 'c7', why: 'already built, or new? — the check that keeps a mechanism from existing twice' },
  // Fresh-walk filter pass, 2026-08-31 — standouts from the 18 new roots,
  // each file read and its mechanism verified before admission.
  'codex_grounder':                          { crystal: 'c6', why: 'a typed verdict, and a HOLD must name the exact condition that makes it decidable' },
  'codex_query':                             { crystal: 'c7', why: 'match by mechanism, not vocabulary — and the cache is never a second truth' },
  'osg_world_engine':                        { crystal: 'c7', why: 'the world is never stored — every read re-derives it from the real ledgers' },
  'leaf_audit':                              { crystal: 'c6', why: 'the no-ask discipline enforced by the build, not by vigilance — poison-tested' },
  'field_render':                            { crystal: 'c1', why: 'the machine offers no relation vocabulary — naming the relation is the writer’s act alone' },
  'converger_capture':                       { crystal: 'c2', why: 'authorship machine-checkable: verbatim, source must be kevin, anything else refused' },
};

// Unit-level seats — the things the deposit carries WHOLE (mechanism dirs,
// self-admitting files, evidence-gated shelves) rather than by individual
// mark. Found by the 2026-08-31 deposit audit (Kevin's mark: "inventory,
// audit, and reform what's on the git, and attach what carries onto the
// new spine"): these were in the deposit but attached to no crystal.
// Same discipline as SEATS: each unit, one seat, one why, felt read wins.
const UNIT_SEATS = [
  { unit: 'the game',              href: 'game/index.html',            crystal: 'c1', why: 'the writing surface itself — built so the machine can only surface and hold still' },
  { unit: 'the gate mechanism',    href: 'patterns/game-gate/gate/',   crystal: 'c2', why: 'admit.mjs and the ledgers — the crossing machinery, carried whole and runnable' },
  { unit: 'the instrument suite',  href: 'patterns/game-gate/tools/',  crystal: 'c6', why: 'check_all.js and the live checks — the build proves itself before it speaks' },
  { unit: 'the inbox record',      href: 'patterns/game-gate/inbox/',  crystal: 'c5', why: 'the gift cards and scan reports — where each gift was surfaced before it crossed' },
  { unit: 'LEARNED.md',            href: 'patterns/LEARNED.md',        crystal: 'c6', why: 'the laws, each carrying its own falsifier' },
  { unit: 'the skills shelf',      href: 'patterns/skills/',           crystal: 'c6', why: 'shipped only on real-invocation evidence — a mention is not a run' },
  { unit: 'the pipeline mechanism', href: 'patterns/root/tools/',      crystal: 'c5', why: 'the two organs that build this deposit, shipped complete and runnable — the labor of landing clean, as code' },
];

module.exports = { SPINE_DOC, SPINE_MARK_ID, CRYSTALS, SEATS, UNIT_SEATS };
