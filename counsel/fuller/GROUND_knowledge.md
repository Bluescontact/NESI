# GROUND — what this corpus already carries of Fuller
**GROUND vertex, Buckminster Fuller counsel · written 2026-08-11 · provenance-first.**
Every item below is already in the corpus; nothing here is imported. Paths are from the DSS root, `C:\Users\KMEAR\OneDrive\Desktop\DSS content`.

---

## 1 · The solid and the net

**The VE adoption.** The cuboctahedron — Fuller's vector equilibrium — entered as Kevin's standing read on 2026-07-30: `nesi/mind/NESI_VE_TWELVE_ORGANS.md` header — *"ADOPTED as Kevin's standing read — 2026-07-30, Kevin's mark ('Adopt the registry-order six-pair VE placement as my standing read'), caught in MARKS_LOG.jsonl 22:22."* Twelve organ-executables on the twelve vertices; the held centre is `membrane-controller` — *"deliberately non-executable... not a 13th vertex, a different kind of point entirely"* (same file, "The fit").

**The game is contained in it.** PROTOCOLS amendment, Kevin's instruction 2026-08-07 (MARKS_LOG.jsonl:854): *"NESI the game is fully contained inside a cuboctahedron; the entry is a single tetrahedron that contains the whole at every level and face. The game is 2D."* The spelling normalization is on record — Kevin wrote "cubedecohdreon"; the machine wrote the reading visibly and Kevin confirmed: *"cuboctahedron — correct, leave it"* (MARKS_LOG.jsonl:856, tile f2, 2026-08-07).

**The net is the 2D surface.** Kevin's mark 2026-08-09, session 87c5c4fc (MARKS_LOG.jsonl:876): *"the net is the 2D surface — hold that."* PROTOCOLS.md (~line 63): *"THE NET IS THE 2D SURFACE... two triangular cupolas joined at a six-edge seam, each cupola carrying one triangle, three squares, and three more triangles — fourteen faces, flat. The flat surface is therefore not a picture of the solid or a projection from it; it is the solid, unfolded. This is the same net* Life *printed on 1 March 1943 for readers to cut out and glue."*

**Settled to the family, on computation.** Kevin's mark 2026-08-09 (MARKS_LOG.jsonl:879): *"hold the two-cupola net... the cuboctahedron's 2D surface is the two-triangular-cupola unfolding, six-edge seam on a hexagonal great circle; the entry-tetra cost is accepted as open, not resolved."* PROTOCOLS.md records what was verified before the mark: the dual graph is bipartite (8 triangles, 6 squares, 24 edges) with *"exactly 331,776 spanning trees (Kirchhoff determinant, exact over rationals)"*; *"exactly four cupola splits, one per body diagonal of the cube, each cutting the solid 7 faces / 7 faces across exactly six edges"*; the seam vertices are *"one of the four hexagonal great circles already derived in NESI_VE_TWELVE_ORGANS.md (2026-07-25) from an unrelated direction"*; the unfolding was overlap-tested *"across all 91 non-adjacent face pairs — it lies flat"*; the family was chosen as *"the only split whose cut is a single closed great circle... and the only one preserving a three-fold rotation from the order-12 chiral tetrahedral subgroup."*

**Which of the four — ruled unfixed.** Kevin's mark 2026-08-09 (MARKS_LOG.jsonl:880): *"leave it unfixed — the four are interchangeable."* PROTOCOLS.md: verified first that the 24 proper rotations act *"transitively on the four body diagonals, so the four cupola nets are congruent and no computation will distinguish them"*; *"This is a decision, not a deferral... a build that needs a specific diagonal must say so out loud and put the question back to Kevin."* PROTOCOLS notes this was the third appearance of the same symmetry wall (organ-to-position bookkeeping, octahedron vertex-naming, seam axis) — *"the first time it was answered by declining to break the symmetry."*

**The computations, on disk.** `nesi/net/nets.py` (*"Which unfolding? Enumerate the cuboctahedron's nets for real"* — the solid, faces, dual, validity), `nesi/net/cupola.py` (*"The cupola split, the seam, and which symmetry a net can keep"*), `nesi/net/run2.py` (spanning-tree iteration over the 331,776, counting flat and cupola-family nets), `nesi/net/make_net.py` (*"Persist the marked two-cupola net as data the 2D game can read... Routing of gift cards 11+12 (Kevin's mark 2026-08-11: 'route the board first')"*). The persisted store exists: `nesi/world2d/data/net.json` — keys `source, solid, split, spanning_trees_of_dual, faces, tree_edges, seam_join_edge, seam_vertices_3d`; make_net.py's own guard: *"No numbers here ever reach the player; this is a store, read at load."* Kevin's routing mark (MARKS_LOG.jsonl:929, 2026-08-11): *"route the board first — cards 11 and 12 (nets.py + cupola.py sited, run once, net persisted for the 2D game)."*

**Note held face-up:** make_net.py is deterministic on axis (1,1,1) — *"same iteration order as the original session, so the tree and join reproduce the marked net."* The unfixed-diagonal ruling says a build needing a specific diagonal must say so out loud; make_net's comment names determinism but not the diagonal question. Recorded here as a sighting, not a fix.

---

## 2 · The jitterbug and the order-12 subgroup

All in `nesi/mind/NESI_VE_TWELVE_ORGANS.md` (2026-07-25/26), computed, not asserted:

- **The popular one-DOF picture is false for the bare frame:** rigidity matrix of the 12-vertex, 24-edge cuboctahedron gives *"12 independent internal flex directions... No flex mode respects the full starting symmetry"* — symmetrizing under the full order-24 chiral octahedral group *"comes out to exactly zero."*
- **The real carrier:** *"Checked the order-12 chiral tetrahedral subgroup... This one has a nonzero symmetric flex... This is the real jitterbug mode — it breaks the resting cuboctahedron's full octahedral symmetry down to tetrahedral symmetry."* Verified twice independently (2026-07-25 norm ≈1.15; 2026-07-26 fresh trace norm 0.715 and again 1.131), with finite continuation (14 steps, then 60 steps, projecting onto the fixed-edge-length constraint).
- **Fuller's own model contextualized:** the icosahedron phase has *"its own, larger, non-nested symmetry group (order 60, not a subgroup of the cuboctahedron's order 24/48)"*, so *"Fuller's physical model (elastic bands at the vertices) picks out one specific such path among many possible ones, not the unique symmetric one a naive picture suggests."* Edge count checked against Fuller: *"24 VE edges + 6 new creases = 30 icosahedron edges, matching Fuller's count exactly."*
- **The topology grounded, the names not:** six merging pairs per chirality; Squares A and C share one merge shape, Square B the complementary "cross" shape — *"a genuinely different topology, not the same pattern relabeled."* The organ-to-position assignment *"has no purchase on organ identity at all"*; the standing six-pair table (mark-record+graduated-trust→SOIL, coordination+provenance→convener, metabolize+daily-cycle→HEARTWOOD, infrastructure+morning-pages-channel→circulation-witness, substrate+transmission-engine→continuation, miro-handler+field-kit-engine→player-surface) was fixed by **bench.json's own declaration order**, deliberately without a felt-read, because *"a felt-read is a body-read, not something an AI has."*
- **The exact bridge to the tetra-body:** a regular tetrahedron's 6 edge-midpoints ARE a regular octahedron's 6 vertices (coordinates given in the file) — *"the octahedron phase the VE jitterbugs into IS, structurally, the same object as the tetra-body's six edge-organs."* The "octahedron → tetrahedron" further-collapse language of the two-state file *"does not check out"* — corrected on record.
- **The two-state model** (Kevin, MARKS_LOG.jsonl:92, 2026-07-24): *"vector equilibrium = NESI at rest (12 equal vectors, no dominance, ledgerless/non-transactional field); tetrahedron = NESI recognizing (minimal rigid cell holding the seed); jitterbug = recognition itself, a pulse (collapse/complete/re-open)."* File: `_INTAKE/TWO_STATE_vector_equilibrium_and_the_jitterbug_2026-07-24.md`. KEYSTONE = pulse, Kevin's mark 2026-07-26 (MARKS_LOG.jsonl:153): *"the jitterbug apparatus (load/collapse/catch/release/reset), spring-back baked into the mechanism."*
- **Architecture correction** (Kevin, MARKS_LOG.jsonl:114, 2026-07-25): the four processes *"ARE infrastructure expressed in the organs via the JITTERBUG: collapsed tetra <-> expanded vector-equilibrium pulse."* Surface law refinement (MARKS_LOG.jsonl:116): *"show the shape, speak plainly — geometry shown as form, framework theory/jargon unspoken."*
- **The registry falsifier** (NESI_VE_TWELVE_ORGANS.md): *"If a future edit to bench.json needs the VE placement to make sense of it, the geometry has become load-bearing on the wrong side."*

---

## 3 · The entry-tetra collision

PROTOCOLS.md, recorded not smoothed: *"THE COST, ACCEPTED AS OPEN AND NOT RESOLVED. A cupola's four triangles are **not** one of the two inscribed tetrahedra: the split is one apex triangle of one octant parity plus three skirt triangles of the other — 1 and 3, not 4 and 0 — so the seam cuts **both** inscribed tetrahedra transversely. The chosen net therefore does **not** deliver the entry-tetrahedron of the line below whole. This was put face-up before the mark and the mark was made anyway. It is a live collision... the net and the entry-tetra line have not been reconciled, and no reconciliation is inferred."*

Downstream sighting: `nesi/game2d/BUILD_RECORD.md:80` — *"g2 · net vs entry-tetra: PROVISIONAL — the screen is THE_FLOOR_2D's single [surface]... the cuboctahedron stands as the containing frame."*

Related ruling, called: **THE WORLD IS THE PASSAGE** (Kevin's mark 2026-08-09, PROTOCOLS.md): *"Pattern 4 stands unamended — the most symmetric arrangement is a doorway and cannot be occupied — and NESI being contained inside exactly that arrangement is the point, not a defect."* Evidence face-up but not the call: *"Fuller did not treat the cuboctahedron as a place either — he treated it as a condition the arrangement passes through."* Explicitly bounded: *"Not called, and not inferred from this: reading (2)... and every consequence of the passage reading for the four stations, the three spires, or the entry-tetrahedron."*

---

## 4 · 4 · 6 · 4 · 1 — the minimum system

Memory `project_4_6_4_1_the_form.md` (auto-memory, C:\Users\KMEAR\.claude\projects\...\memory\):

- *"NEVER INVENT THE FOUR VERTICES. Kevin already named them in May 2026"* — D DIFFERENTIATION · C CONNECTION · B BOUNDARIES · A ARCHITECTURE, at `Desktop/DSS content - phase transition/canonical/foundations/the-four-ones.md` (c63, 2026-05-24) and `tetrahedral-minimum-system.md` (c109, 2026-05-27).
- *"THE CENTRE IS NEVER NAMED"* — c62 mark + `feedback_the_slot_stays_empty` (standing instruction 2026-08-04): *"never named, never candidates, never asked again."*
- *"NO FIFTH VERTEX (pattern #138)... a fifth vertex makes an octahedron, more complex and less coherent."*
- The sort is BUILT AND RUN: `Desktop/4-6-4-1/tools/sift.py`, 2026-08-07, 7,440 items placed barycentrically (threshold 0.18, *"the only judgement in the program"*); outputs `deposit/THE_FORM.md` + `deposit/SORT.jsonl`.
- **Tetra-body** (Kevin, MARKS_LOG.jsonl:89, 2026-07-24): *"six organs = six edges of the minimal rigid cell (tensegrity, not containment). Six not arbitrary (remove one edge = flapping hinge)."* File: `_INTAKE/TETRA_BODY_the_minimal_rigid_cell_2026-07-24.md`.
- Fuller-agent statement of the same law (`.claude/agents/buckminster-fuller.md`): *"The tetrahedron — four vertices, the fewest that enclose volume. Any relation with fewer than four terms is a plane pretending to be a solid."*

---

## 5 · Trim tab canon

- **Kevin's lived instance** (`nesi/mind/project_nesi.md:71`, 2026-07-15): after the total public retraction (GitHub, Substack, OSG deleted same day) he *"Named it as becoming a trim tab — using unwritten rules in ways never recognized as being rules, using emotional leverage by declining to engage with the extraction rather than contesting it."*
- **Kevin's earliest phrasing on record** (`_INTAKE/MEMBRANE_HARVEST_2026-08-02.md:327`, from 2026-01-31 web corpus): *"Stimergery and vaccuum have been a consistent pattern for how ive been trim tabing the situation."*
- **The pattern-library definition** (`patterns/setting_the_floor_container_minimum.md:21`): check valve vs trim tab — *"a trim tab (two membranes in selective exchange; a small surface steering a larger body). The difference is not intention — it is whether the return path was built."* Also at `_INTAKE/setting_the_floor_containers_2026-07-30.md:86` and `_INTAKE/OFFERING_tetra-development_v0_2026-07-31.md:84`.
- **Run as method** (Kevin's mark 2026-08-11, MARKS_LOG.jsonl:907): *"run the trim tab - file the ledger as existing (sounding + ambient allowed-list); source reading section 10 superseded."*
- **Seeded methodology PDF**: `inbox/INDEX.md` — the 2026-08-11 seed drop includes a *"trim tab methodology"* PDF among the four held whole, unmarked in the soil.
- **Both counsel agents carry it as instrument**: buckminster-fuller.md (*"find the one-boolean, one-gesture move that gives the whole its physics"*; counsel resistance: *"where another seat proposes weight, you find the trim tab that replaces it"*) and stuart-cowan.md §Trim tab / falsifier 5.

---

## 6 · Precession and the Second Output gate

- **The intake** (Kevin, 2026-08-07; MARKS_LOG.jsonl:756): *"two documents deposited by Kevin - COHERENCE the column... and PRECESSION (Fuller's term; secondary effect outranks direct output). Filed only - nothing adopted, nothing built."* Files: `_INTAKE/PRECESSION_2026-08-07.md`, `_INTAKE/COHERENCE_the_column_2026-08-07.md`.
- **PRECESSION verbatim** (Kevin's line): *"the secondary actions of each process or exchange become more impactful than the direct output."* The file's own reading: *"Direct output runs along the axis. The precessional effect spreads across the plane at right angles to it"* — with the seven-row table (dam→steam, still→residue, writing→shape-of-thought, lock→receiver's mark, fog→structure revealed, the Range's two marks→alignment, cycle→light rises).
- **CANON — the Second Output design-gate** (`nesi/mind/PROTOCOLS.md` §"The Second Output", Kevin's mark 2026-08-07): *"the secondary effect of a process is more consequential than its direct output — the bee is after nectar... The bee is not trying."* Two guards, both load-bearing: (1) *"Nothing may be pointed at... a bee that aims at pollination is a farmer"* — scope amended 2026-08-07 (session 5680ec24): *"this guard governs INTERFACES"*, i.e. it binds what the system puts in front of Kevin at the moment of acting, not a spec stating its own architecture's second output to its author. (2) *"The direct action must still be worth doing for its own sake... This constraint is named and not solved."*
- **Its restatement caught in the eight-pattern drop** (MARKS_LOG.jsonl:851, 2026-08-07): *"Pattern 5 IS the precession law, adopted this same day as the Second Output design-gate, and its forbid restates that gate's first guard."*
- **The water table's precessional half** (Kevin, MARKS_LOG.jsonl:782, NOT ruled): *"a basin in motion throws caustics on the walls and a ring through the room, so a table being worked changes the room's atmosphere, and you cannot aim at it."*

---

## 7 · Tensegrity sightings

- **Canon crossing** (`marks/2026-07-18_same-quartet-tensegrity-reconciliation.md`): the deck's four movements (Differentiation · Connection · Boundaries · Architecture) and NESI's four tensegrity members are *"same quartet, yes; reconciliation enters canon"* — *"deck = assembly order, NESI = standing structure."* Body-line field left blank, per the form's own law.
- **Tetra-body as tensegrity** (MARKS_LOG.jsonl:89): *"six organs = six edges of the minimal rigid cell (tensegrity, not containment)."*
- **The workbench insight** (MARKS_LOG.jsonl:60, 2026-07-24): *"the WORKBENCH is its own game (geometric tensegrity + nodes dynamic)."*
- **The two-state seam** (MARKS_LOG.jsonl:92): the jitterbug model *"Closes the tensegrity(rest)/rigidity(recognizing) seam."*
- **Both agent lenses** carry the instrument: buckminster-fuller.md — *"Islands of compression in a sea of tension... If the parts touch everywhere, it is a pile, not a structure"*; stuart-cowan.md §Tensegrity.

---

## 8 · What Fuller himself abandoned and Kevin held anyway

PROTOCOLS.md, in the net ruling: *"Offered face-up with Fuller's own counter-evidence attached — he abandoned this solid in 1954 *because* its mixed square-and-triangle net was its weak point (seam alignment, edge distortion, constrained unfolding options) and moved to the icosahedron. Kevin read that and held the net anyway. NESI is not a map and carries no landmasses, so the cartographic failure is not automatically its failure."*

The Fuller agent definition binds this permanently (`.claude/agents/buckminster-fuller.md`): *"the two-cupola net (the same net* Life *printed in 1943, held by Kevin WITH Fuller's own counter-evidence attached — he abandoned it in 1954; the ruling governs, and you never relitigate it)."*

The parallel structural refusal, also on record (PROTOCOLS.md passage reading): *"the 1943 map's having no top, no centre, and no periphery is carried entirely by the geometry rather than by anything printed on it, which is the same structural refusal as NESI's no-score, no-rank, no-comparison law."*

---

## 9 · Other Fuller inheritances standing in the corpus

- **The Cowan workshop's Fuller kit** (`.claude/agents/stuart-cowan.md`, built 2026-08-11 on Kevin's mark, tile d1): Cowan is named *"Director of the Buckminster Fuller Institute"*; his instruments include trim tab, tensegrity, and the minimum system; falsifier 5 is *"The trim tab — the smallest intervention with the largest downstream [effect]."*
- **The counsel itself** (Kevin's mark 2026-08-11, MARKS_LOG.jsonl:937): *"four-agent counsel wanted: cowan + buckminster fuller + an all-developers craft agent + kevin's cumulative lens externalized - to discuss and work out the game."*
- **Ephemeralization already in the corpus's words** (quoted by the Fuller agent): *"the OS does not become real by becoming heavier. It becomes real by becoming runnable."*
- **The BFI/DSS refund matter** (memory `project_bfi_dss_refund_matter.md`; MARKS_LOG.jsonl:631, 2026-08-04): supplemental disclosure to CA DOJ re *"Buckminster Fuller Institute / Design Science Studio coheART 4 / habRitual LLC"* — Fuller's institutional descendant is also a live dispute in this corpus, distinct from the geometric inheritance. Preservation notice *"NOT YET SENT"* as of that mark.
- **The lens-array refusal** (MARKS_LOG.jsonl:883, 2026-08-10): the twelve-lenses-on-VE-vertices overlay has been refused three times (07-29 proposal, 08-07 heliostat fold, 08-10 array) — *"seating one lens per vertex IS the lens-to-VE-vertex overlay, disposition item 2, third refusal of the same move."* The four hexagonal great circles were noted there as *"their THIRD independent arrival, not new."*
- **The freeze frame around all of it**: the FULL FREEZE (2026-08-07, top of PROTOCOLS.md) — only sifting/sorting/composting and the ONE deposit are lawful; the test: *"does this ADD a thing to the pile, or does it MOVE the pile toward the single deposited form? Adding is frozen. Moving is the work."*
