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
    line: 'no component, score, or master node ever sits at the middle of a frame — the middle holds the law, the person, or nothing' },
  { id: 'c5', name: 'the gift orientation',
    line: 'everything faces outward, and the labor of landing clean is paid upfront' },
  { id: 'c6', name: 'the claim carries its own falsifier',
    line: 'no assertion stands on confidence — "a fact, not a claim" is the highest standing anything has' },
  { id: 'c7', name: 'the single source',
    line: 'a fact lives in one place; a copy is a drift waiting to happen' },
  { id: 'c8', name: 'the tetra/VE geometry',
    line: 'the corpus’s form-language — a signature, not a law; "it should be a tetra" is never an argument' },
  // Crystals 9-11, seated 2026-09-01 on the keeper's mark ("seat the
  // three candidate crystals") — the two candidates the spine document's
  // own ground pass surfaced, and the retracted FRAMING demotion.
  { id: 'c9', name: 'the felt read',
    line: 'the instrument of judgment is the body — prompted, never passed, simulated, inferred, or directed; a blank body-line is a complete record' },
  { id: 'c10', name: 'the held state',
    line: 'between raw and crossed stands a third state: held, with its named condition — silence defaults to stop, uncertainty fails closed' },
  { id: 'c11', name: 'positive form',
    line: 'state what a thing does, never what it refuses — the refusal lives in a lint or at an edge, not in the prose' },
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
  'held_named_gaps':                         { crystal: 'c10', why: 'everything held carries the name of what it is waiting for — the honest blank, working' },
  'prior_art_check_tool':                    { crystal: 'c7', why: 'already built, or new? — the check that keeps a mechanism from existing twice' },
  // Fresh-walk filter pass, 2026-08-31 — standouts from the 18 new roots,
  // each file read and its mechanism verified before admission.
  'codex_grounder':                          { crystal: 'c6', why: 'a typed verdict, and a HOLD must name the exact condition that makes it decidable' },
  'codex_query':                             { crystal: 'c7', why: 'match by mechanism, not vocabulary — and the cache is never a second truth' },
  'osg_world_engine':                        { crystal: 'c7', why: 'the world is never stored — every read re-derives it from the real ledgers' },
  'leaf_audit':                              { crystal: 'c6', why: 'the no-ask discipline enforced by the build, not by vigilance — poison-tested' },
  'field_render':                            { crystal: 'c1', why: 'the machine offers no relation vocabulary — naming the relation is the writer’s act alone' },
  'converger_capture':                       { crystal: 'c2', why: 'authorship machine-checkable: verbatim, source must be kevin, anything else refused' },
  // THE TEN ORGANS (Kevin: "bring forward and prepare the 10 organs for
  // the gate") — the imperative actions that survived the real-pressure
  // collapse of the 157-pattern canon, 2026-07-29/30. Each subsumes a
  // dozen-plus folded patterns; the folded members stay OUT of the gate
  // so the doctrine crosses once (crystal 7).
  'mark_it_at_the_body':                     { crystal: 'c2', why: 'the crossing law as an action — the verdict held at the origin, fail closed past its reach' },
  'route_every_cost':                        { crystal: 'c5', why: 'every generated cost lands somewhere named, or the move stops' },
  'place_it_and_close':                      { crystal: 'c5', why: 'the gift completes at the placing — close your own record, forfeit the claim' },
  'hand_over_what_runs':                     { crystal: 'c5', why: 'strip yourself out of the load path — what leaves regenerates without you' },
  'set_the_floor':                           { crystal: 'c2', why: 'the record that says it is set is not emitted until the leveling was actually performed' },
  'stake_the_read':                          { crystal: 'c6', why: 'validation by exposure — a read staked where it costs you if wrong' },
  'refuse_where_seen':                       { crystal: 'c5', why: 'the no placed once, cleanly, in the shared channel — then nothing added' },
  'discharge_the_no':                        { crystal: 'c4', why: 'the empty middle engineered — refuse in the build, delete the bypass, nothing decided at execution' },
  'force_the_definition':                    { crystal: 'c6', why: 'an undefined condition resolves to written-in-shared-text or visibly-refused, nothing between' },
  'move_the_load':                           { crystal: 'c3', why: 'the fix is topological — add the second node, move the mandate, never modify the node' },
  // The ROS_RI staged block (Kevin: "work the ROS_RI staged block") —
  // the cross-origin audit of 2026-06-12, un-ruled for 2.5 months, now
  // crossed as artifacts. Its candidate mechanisms stay candidates for
  // the felt read; the crossing moved the block, not the verdicts.
  'ros_ri_commons':                          { crystal: 'c5', why: 'eight cards a stranger can run cold — the convergence is the credential, no origin named' },
  'ros_ri_new_screen':                       { crystal: 'c6', why: 'candidates survive only an adversarial collapse screen — six stand, one dies to a named edge' },
  'ros_ri_reverse_audit':                    { crystal: 'c6', why: 'the canon audited from inside the other frame — 14 of 15 findings honestly collapsed' },
  'ros_ri_cross_fold':                       { crystal: 'c7', why: '45 verdicts, each with a named fold-target — nothing enters twice unaccounted' },
  'ros_ri_overview':                         { crystal: 'c6', why: 'two origins, each structurally blind to its own failure direction — the second mark at framework scale' },
  'ros_ri_style':                            { crystal: 'c7', why: 'one face for five surfaces — the look lives in one file, never five copies' },
  // Batch 1 of the reading-pass queue (Kevin: "run batch 1") — the
  // doctrine core from patterns/ and frameworks/: the two axioms, the
  // type system, the commons rule the de-naming stands on, and the
  // discriminators. Every file and key line verified before admission.
  'witness_as_origin':                       { crystal: 'c1', why: 'the axiom underneath — the origin is the zero all witnessing is measured from, never a point that gets witnessed' },
  'consented_ledger_axiom':                  { crystal: 'c5', why: 'three fates of cost, and only externalizing unpriced is forbidden — the gift economy’s accounting law' },
  'falsifier_travels':                       { crystal: 'c6', why: 'the against-side rides welded to the artifact at the crossing — never archived elsewhere' },
  'type_system':                             { crystal: 'c3', why: 'axiom / pattern / instance kept apart — axioms need no children, they are the floor' },
  'commons_composting_rule':                 { crystal: 'c5', why: 'what crosses outward is pattern, never instance — there is no one in it' },
  'pre_clearance_class':                     { crystal: 'c2', why: 'the reserved zero moved to the class definition — the keeper ratifies the class, not each member' },
  'register_audit':                          { crystal: 'c7', why: 'six drift checks against a named authority, with a gate against auditing your own console as a transmission' },
  'gate_as_f4':                              { crystal: 'c6', why: 'a veto without a stated discharge condition is structurally a pump — the discriminator is definitional, testable' },
  'the_locating_move':                       { crystal: 'c1', why: 'the law’s positive form: locate, never steer' },
  'the_daylight_test':                       { crystal: 'c6', why: 'a pre-screen that names its own limit — mechanism cannot be the discriminator, the ratification stays with the body' },
  'the_governor':                            { crystal: 'c4', why: 'the brake protecting the body the whole thing runs on — a self-feeding engine must not come to require cost' },
  'tetra_agent_protocol':                    { crystal: 'c8', why: 'four vertices in opposed tension, the synthesis center a separate step — the geometry as working method' },
  'floor_container_minimum':                 { crystal: 'c8', why: 'the minimum rigid form applied to human containers — every element does load, nothing decorative' },
  'same_quartet':                            { crystal: 'c8', why: 'assembly is sequential; structure is simultaneous — the four-fold’s contradiction resolved' },
  'precesse':                                { crystal: 'c8', why: 'the result arrives orthogonal to intended action — the 90-degree return' },
  'stigmergic_deposit':                      { crystal: 'c5', why: 'the deposit field routes without a director — the depositor becomes optional, the field does not' },
  // Batch 2 of the reading-pass queue (Kevin: "run batch 2") — the
  // integrity artifacts: the mark-record constitution, the shadow
  // registry, the open ledger set, the boundary lint, the breach
  // register, the fail-closed rhythm, and the coherence codex (its
  // crystal-7 breach resolved before crossing).
  'mark_record_constitution':                { crystal: 'c2', why: 'the mark-record’s five fields, and the standing prohibition: no patterns-across-marks, ever' },
  'mark_record_template':                    { crystal: 'c5', why: '632 bytes a stranger can adopt in thirty seconds' },
  'negative_workspace':                      { crystal: 'c6', why: 'a negative that can be named and not stopped is the next instrument’s specification' },
  'open_ledger':                             { crystal: 'c3', why: 'debt is not prohibited — it is unrepresentable; the frame holds in any hands' },
  'open_ledger_schema':                      { crystal: 'c3', why: 'the rule enforced by the absence of the field that would represent its violation' },
  'open_ledger.schema_view':                 { crystal: 'c3', why: 'the typed view of the same absences — the mechanism stated twice, in SQL and in types, so no reader depends on knowing one language' },
  'circuit_tool.framing':                    { crystal: 'c3', why: 'the same tool named by what it routes — direction document, not build spec; the frame offered without the person wired into it' },
  'open_ledger_demo':                        { crystal: 'c5', why: 'a stranger tries the five moves and hits “there is no field for this”' },
  'no_blur':                                 { crystal: 'c5', why: 'my gift and words, and their gifts and words, always held separately' },
  'blur_check':                              { crystal: 'c6', why: 'the lint that names its own limit — two rules need a human read' },
  'violation_register':                      { crystal: 'c2', why: 'a fabricated record is a falsifier violation, not a recovery path' },
  'watchers':                                { crystal: 'c10', why: 'unresolved tension held visible — no organ authorized to close it' },
  'foundation_audit':                        { crystal: 'c1', why: 'the build verified against the recognition law, gaps named, corrections made in-document' },
  'rhythm_doctrine':                         { crystal: 'c10', why: 'silence defaults to stop — the system waits, it never nags' },
  'rhythm_config':                           { crystal: 'c10', why: 'null means off, every judgment field carries its owner — absence is a visible held state' },
  'codex_invariant':                         { crystal: 'c8', why: 'the governance geometry locked on one page, its falsifier welded in' },
  'codex_agent_invariant':                   { crystal: 'c6', why: 'no causal path from describing a loop better to a loop closing — investigate, don’t claim' },
  'codex_readme':                            { crystal: 'c5', why: 'a report of failure is worth more than a report of success — the gift carries no return address' },
  // Batch 3 of the reading-pass queue (Kevin: "run batch 3") — the
  // _INTAKE finished layer plus the two mind/ law files: the standing
  // doctrine that never got a crossing, the two complete kits, and the
  // filter run that balanced to zero.
  'precession_law':                          { crystal: 'c1', why: 'pointing at a secondary effect destroys it — the no-pointing constraint derived from mechanism, not policy' },
  'membrane_filter':                         { crystal: 'c1', why: 'the shape sorts; nothing identifies anything — the law at its most literal' },
  'deletable_keystone':                      { crystal: 'c5', why: 'a floor is real only when it survives the removal of the one who set it' },
  'reducer_refusal':                         { crystal: 'c6', why: 'built to subtract, refused on evidence, and reported the refusal — the falsifier that indicts its own instrument' },
  'unlocated_load':                          { crystal: 'c3', why: 'silent container failure named as structure — the load relocates to whoever cannot refuse it' },
  'routing_manifest':                        { crystal: 'c2', why: '5101 lines in, 5101 out, every rule derived from the record — the one exception named' },
  'containers_law':                          { crystal: 'c6', why: 'no in-action, a wish; no out-action, a landfill — and a taxonomy that cuts itself rather than patching' },
  'artifact_grammar':                        { crystal: 'c9', why: 'the felt read defined as deliberately not automatable — prompted, never passed, simulated, or inferred' },
  'floor_kit_gate':                          { crystal: 'c4', why: 'four of five questions exist to stop the reader — the kit holds its center empty by construction' },
  'floor_kit_method':                        { crystal: 'c3', why: 'the leveling act as a runnable procedure — the mechanism, extracted' },
  'floor_kit_proof':                         { crystal: 'c6', why: 'what a set floor demonstrates, and how to check the leveling actually happened' },
  'floor_kit_floor':                         { crystal: 'c5', why: 'the kit’s landing — complete, usable by a stranger' },
  'six_returns_vertex':                      { crystal: 'c3', why: 'three correct systems, one impossible intersection — a defect that belongs to no party' },
  'six_returns_pattern':                     { crystal: 'c3', why: 'the shared structure, abstracted past its three instances' },
  'six_returns_method':                      { crystal: 'c6', why: 'every claim anchored to a document or marked unanchored' },
  'six_returns_seam':                        { crystal: 'c3', why: 'where the systems meet and none can see' },
  'six_returns_trim_tab':                    { crystal: 'c3', why: 'the smallest intervention that moves the whole intersection' },
  'six_returns_floor':                       { crystal: 'c5', why: 'the cost is not a tax on the work — it is the entry condition' },
  // Batch 4 (Kevin: "strip other peoples names. batch four needs to be
  // developed and crystalized without personal language or content
  // crossing") — the outward writing: twelve pieces verified clean of
  // personal names, plus crystallized versions of the pieces that
  // carried them. The working originals with their names stay
  // source-side; the pattern crosses, the instance does not.
  'witnessing_without_merging':              { crystal: 'c4', why: 'presence that registers without merging — and the brake on its own most consoling sentence' },
  'comprehension_not_recognition':           { crystal: 'c1', why: 'recognition is the name landing on something already there — the reader finds you' },
  'public_library_gifts':                    { crystal: 'c1', why: '24 gifts with every framework word stripped — the law stated for a stranger' },
  'genesis_readme':                          { crystal: 'c2', why: 'the human is the gate — not a bolted-on safety feature, the architecture' },
  'genesis_behavioral_tests':                { crystal: 'c6', why: 'running the OS vs. wearing its vocabulary — the test is behavior, not language' },
  'kit_index':                               { crystal: 'c5', why: '24 prescriptions, each shipped with the condition under which it fires' },
  'kit_bio':                                 { crystal: 'c6', why: 'a brake that has never fired in a real push is a claim about a brake' },
  'kit_inst':                                { crystal: 'c5', why: 'unstated cost lands on whoever had no authority to refuse it — so state it' },
  'kit_rel':                                 { crystal: 'c4', why: 'labor dressed as restraint, named — the boundary held instead of performed' },
  'kit_tech':                                { crystal: 'c3', why: 'the technical substrate’s prescriptions, mechanism by mechanism' },
  'kit_economic':                            { crystal: 'c5', why: 'the three fates of cost at practitioner scale' },
  'kit_spatial':                             { crystal: 'c3', why: 'the practices express the place’s logic, not the logic itself — rule travels, form re-roots' },
  'five_terms_and_the_loop':                 { crystal: 'c6', why: 'five terms, five self-run tests — and the loop’s own limit stated as the load-bearing line' },
  'hunger_under_naming':                     { crystal: 'c6', why: 'an outside contribution absorbed at mechanism level — and the question whether precision is a fix, or the same hunger better dressed' },
  'match_noun_to_harm':                      { crystal: 'c6', why: 'event-shaped harm names the role-and-decision; structure-shaped harm names the mechanism — the wrong shape hands the structure a scapegoat' },
  'the_weave':                                { crystal: 'c3', why: 'connective tissue from declared kinship only — every edge cited, the undeclared listed honestly, never linked by guesswork' },
  'declare_channel':                          { crystal: 'c2', why: 'a strand exists only as a hand’s appended ledger line — the relation named in free text the machine never suggests' },
  'open_ledger_circuit':                      { crystal: 'c5', why: 'the gift circuit running — a person-less field, current with no balance, the Brake set from the body, gaps as the growth signal' },
  // Upstream of the tributaries, 2026-09-01 (the keeper's mark: "lets
  // build upstream of the tributaries now") — built from THE_CATCHMENT
  // naming, the corpus's own account of what is above the headwaters.
  'the_catchment_naming':                     { crystal: 'c1', why: 'the guard as incapacity, not restraint — the system was never upstream, by geography' },
  'headwaters':                               { crystal: 'c10', why: 'the receiving ground — what lands here is held, not read; nothing crosses on its own' },
  'the_spring':                               { crystal: 'c1', why: 'volume facts only, identical for grief and grocery lists — it receives, it does not go looking' },
  'headwaters.first_crossing':                { crystal: 'c5', why: 'the upstream path walked once for real — dropped, surfaced, crossed' },
};

// Unit-level seats — the things the deposit carries WHOLE (mechanism dirs,
// self-admitting files, evidence-gated shelves) rather than by individual
// mark. Found by the 2026-08-31 deposit audit (Kevin's mark: "inventory,
// audit, and reform what's on the git, and attach what carries onto the
// new spine"): these were in the deposit but attached to no crystal.
// Same discipline as SEATS: each unit, one seat, one why, felt read wins.
const UNIT_SEATS = [
  { unit: 'the game',              href: 'game/index.html',            crystal: 'c1', why: 'the writing surface itself — built so the machine can only surface and hold still' },
  { unit: 'the gate mechanism',    href: 'workshop/game-gate/gate/',   crystal: 'c2', why: 'admit.mjs and the ledgers — the crossing machinery, carried whole and runnable' },
  { unit: 'the instrument suite',  href: 'workshop/game-gate/tools/',  crystal: 'c6', why: 'check_all.js and the live checks — the build proves itself before it speaks' },
  { unit: 'the inbox record',      href: 'workshop/game-gate/inbox/',  crystal: 'c5', why: 'the gift cards and scan reports — where each gift was surfaced before it crossed' },
  { unit: 'LEARNED.md',            href: 'workshop/LEARNED.md',        crystal: 'c6', why: 'the laws, each carrying its own falsifier' },
  { unit: 'the skills shelf',      href: 'workshop/skills/',           crystal: 'c6', why: 'shipped only on real-invocation evidence — a mention is not a run' },
  { unit: 'the pipeline mechanism', href: 'workshop/tools/',      crystal: 'c5', why: 'the two organs that build this deposit, shipped complete and runnable — the labor of landing clean, as code' },
];

// THE THREE ROOMS (the keeper's mark, 2026-09-01: "it should be a house
// and a workshop, and a game"). The HOUSE holds the usable things — what
// a visitor picks up and something happens. Everything not mapped here is
// WORKSHOP: the doctrine, the patterns, the making apparatus and its
// records, labeled as the making. The GAME is game/, the first door.
// Source-prefix map — one source, applied by the pipeline and every
// path-mapper alike.
const HOUSE_PREFIXES = [
  ['open_ledger/',                'house/open-ledger/'],
  ['CIRCUIT_TOOL.md',             'house/CIRCUIT_TOOL.md'],
  ['marks/',                      'house/starters/'],
  ['genesis_seed_share/',         'house/genesis-seed/'],
  ['kit/',                        'house/kit/'],
  ['_INTAKE/THE_FLOOR_KIT/',      'house/floor-kit/'],
  ['_INTAKE/THE_SIX_RETURNS/',    'house/six-returns/'],
  ['substack/crystallized/',      'house/essays/'],
  ['substack/witnessing_without_merging.md', 'house/essays/witnessing_without_merging.md'],
  ['substack/comprehension_is_not_recognition.md', 'house/essays/comprehension_is_not_recognition.md'],
  ['public_site/library.html',    'house/library.html'],
];
function housePathFor(rel) {
  const norm = rel.replace(/\\/g, '/');
  for (const [pre, dest] of HOUSE_PREFIXES) {
    if (norm === pre) return dest;
    if (pre.endsWith('/') && norm.startsWith(pre)) return dest + norm.slice(pre.length);
    if (norm === pre.replace(/\/$/, '')) return dest;
  }
  return null;
}

module.exports = { SPINE_DOC, SPINE_MARK_ID, CRYSTALS, SEATS, UNIT_SEATS, HOUSE_PREFIXES, housePathFor };
