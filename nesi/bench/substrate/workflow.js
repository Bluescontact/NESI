export const meta = {
  name: 'substrate-development',
  description: 'Tetrahedral pattern development: Grounder → Dreamer fan → Governor → Shaper → Center',
  phases: [
    { title: 'Discovery', detail: 'Discover current library files dynamically' },
    { title: 'Extract', detail: 'Identify candidate patterns in source' },
    { title: 'Ground', detail: 'Separate verified/assumed/gap per pattern + surface library context' },
    { title: 'Dream', detail: 'Surface latent structure across 3 lenses per pattern' },
    { title: 'Govern', detail: 'Cut — hold crystals against ground gaps + library' },
    { title: 'Shape', detail: 'Compose survivors into canon-ready form' },
    { title: 'Center', detail: 'Name the disposition and gate for Kevin' },
    { title: 'Ledger', detail: 'Append run outputs to internal metabolism ledger' },
  ],
}

// args: { source_path: string, source_label: string, date: string }

// Normalize args — may arrive as a parsed object or as a JSON string depending on runtime
const _args = typeof args === 'string' ? JSON.parse(args) : (args || {})
const sourcePath = _args.source_path || null
const sourceLabel = _args.source_label || 'unspecified'
const sourceDate = _args.date || ''

log(`Source: ${sourcePath || '(no path provided)'}`)

const DSS = 'C:\\Users\\KMEAR\\OneDrive\\Desktop\\DSS content'
const LEDGER_PATH = DSS + '\\SUBSTRATE_LEDGER.jsonl'

// ── Schemas ───────────────────────────────────────────────────────────────────

const PATTERNS_SCHEMA = {
  type: 'object',
  required: ['source_summary', 'patterns'],
  properties: {
    source_summary: {
      type: 'string',
      description: 'One sentence: the register and substrate density of this source'
    },
    patterns: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'slug', 'description', 'raw_material'],
        properties: {
          name: { type: 'string', description: 'Short structural name (3-6 words) — not the instance, the pattern' },
          slug: { type: 'string', description: 'kebab-case identifier' },
          description: { type: 'string', description: 'One-line tentative transferable form' },
          raw_material: { type: 'string', description: 'Exact quoted passage(s) from source that generate this pattern' },
        }
      }
    }
  }
}

const GROUNDER_SCHEMA = {
  type: 'object',
  required: ['verified', 'assumed', 'gaps'],
  properties: {
    verified: {
      type: 'array',
      items: { type: 'string' },
      description: 'Facts directly evidenced in the raw_material — no inference beyond what is stated'
    },
    assumed: {
      type: 'array',
      items: { type: 'string' },
      description: 'Things treated as true but not stated in the raw_material — flag each'
    },
    gaps: {
      type: 'array',
      items: { type: 'string' },
      description: 'What is missing that would be needed for this pattern to be genuinely transferable'
    }
  }
}

const LIBRARY_CONTEXT_SCHEMA = {
  type: 'object',
  required: ['closest_patterns', 'distinctiveness_read'],
  properties: {
    closest_patterns: {
      type: 'array',
      items: {
        type: 'object',
        required: ['file', 'proximity_note'],
        properties: {
          file: { type: 'string', description: 'Filename only' },
          proximity_note: { type: 'string', description: 'One sentence: how similar in mechanism and how different' }
        }
      },
      description: 'Up to 3 most structurally proximate existing patterns'
    },
    distinctiveness_read: {
      type: 'string',
      description: 'One sentence: what does this candidate bring that none of the closest patterns already hold?'
    }
  }
}

const DREAMER_SCHEMA = {
  type: 'object',
  required: ['lens', 'crystals'],
  properties: {
    lens: { type: 'string' },
    crystals: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'claim', 'load_bearing'],
        properties: {
          title: { type: 'string', description: '3-5 words' },
          claim: { type: 'string', description: '1-2 sentences — the structural insight' },
          load_bearing: { type: 'string', description: 'Why this might matter structurally — what it opens or closes' }
        }
      },
      description: '3-5 crystals. Reach. Do not converge.'
    }
  }
}

const GOVERNOR_SCHEMA = {
  type: 'object',
  required: ['crystal_verdicts', 'hard_read', 'library_verdict', 'overall'],
  properties: {
    crystal_verdicts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'verdict', 'reason'],
        properties: {
          title: { type: 'string' },
          verdict: { type: 'string', enum: ['keep', 'cut', 'uncertain'] },
          reason: { type: 'string', description: 'One sentence. Hold against Grounder gaps.' }
        }
      }
    },
    hard_read: { type: 'string', description: 'One honest sentence on the whole pattern' },
    library_verdict: { type: 'string', enum: ['NEW', 'EXTENDS', 'FOLDS_INTO', 'CONTRADICTS'] },
    library_file: { type: 'string', description: 'Closest existing pattern filename, if any' },
    library_delta: { type: 'string', description: 'What the candidate adds or how it conflicts' },
    overall: {
      type: 'string',
      enum: ['CONTINUE', 'DRY', 'STOP'],
      description: 'CONTINUE: survivors worth shaping. DRY: nothing new from another pass. STOP: the whole pattern is momentum — COMPOST.'
    }
  }
}

const SHAPER_SCHEMA = {
  type: 'object',
  required: ['name', 'transferable_form', 'structural_articulation', 'edges'],
  properties: {
    name: { type: 'string', description: 'Structural pattern name, 3-6 words, not instance-specific' },
    transferable_form: { type: 'string', description: '2-3 sentences. Abstracted, instance-free. What any reader could recognize in their own territory.' },
    structural_articulation: { type: 'string', description: 'Full substrate: mechanism, failure modes, structural truth. Dense. No padding. No why-blocks. No summary closers.' },
    edges: { type: 'string', description: 'Open questions, tensions, limits — what this pattern points toward but does not yet reach.' }
  }
}

const CENTER_SCHEMA = {
  type: 'object',
  required: ['disposition', 'reasoning'],
  properties: {
    disposition: { type: 'string', enum: ['PROMOTE-READY', 'HOLD', 'COMPOST'] },
    condition: { type: 'string', description: 'Required for HOLD: the specific named condition that would move it. No condition = the pile.' },
    reasoning: { type: 'string', description: 'One sentence — what survived and why it stands, or what disqualifies it.' }
  }
}

const DISCOVERY_SCHEMA = {
  type: 'object',
  required: ['pattern_files'],
  properties: {
    pattern_files: { type: 'array', items: { type: 'string' } }
  }
}

const CODEX_PRESCREEN_SCHEMA = {
  type: 'object',
  required: ['closest_fingerprints'],
  properties: {
    closest_fingerprints: {
      type: 'array',
      items: {
        type: 'object',
        required: ['slug', 'mechanism', 'register'],
        properties: {
          slug: { type: 'string' },
          mechanism: { type: 'string', description: '1-2 sentences from fingerprint JSON' },
          register: { type: 'string', description: '1 sentence from fingerprint JSON' }
        }
      },
      description: 'Up to 3 structurally closest patterns by mechanism match, not vocabulary'
    }
  }
}

// ── Discovery — dynamic library enumeration ───────────────────────────────────

phase('Discovery')

const discovery = await agent(
  `Use the Glob tool to list all markdown files in the patterns and frameworks directories.

Base directory: ${DSS}

Run both of these glob patterns:
1. patterns/*.md   (within the base directory)
2. frameworks/*.md (within the base directory)

Return the complete list of absolute file paths found across both directories.`,
  { schema: DISCOVERY_SCHEMA, phase: 'Discovery', label: 'discover-library' }
)

const discoveredLibrary = (discovery && discovery.pattern_files) ? discovery.pattern_files : []
log(`Library: ${discoveredLibrary.length} files discovered`)

// ── Extract ───────────────────────────────────────────────────────────────────

phase('Extract')

if (!sourcePath) {
  log('ERROR: No source_path provided in args. Cannot extract patterns.')
  return { pattern_count: 0, brief_content: null }
}

const extraction = await agent(
  `Extract transferable patterns from this source file. You MUST read this exact file first before doing anything else:

FILE PATH: ${sourcePath}

Use the Read tool to read that file. Then identify distinct transferable patterns in the writing.

RULES:
- Pattern crosses, instance never does. Person, property, specific situation stay in the source. Only what recurs structurally travels.
- A pattern is distinct if removing it would leave a gap in the substrate.
- Name patterns at the structural level — not "Anders and the battery" but "Expertise Conscripted as Mirror."
- raw_material: exact quoted passage(s) from the source that generate this pattern.
- 2-5 patterns typical. The canon is mature — be selective. Density over coverage.
- Skip common knowledge without structural specificity.

source_summary: one sentence describing the register and substrate density of this source (not its content).`,
  { schema: PATTERNS_SCHEMA, phase: 'Extract' }
)

if (!extraction || !extraction.patterns || extraction.patterns.length === 0) {
  log('No substrate-dense patterns found in source.')
  return { pattern_count: 0, brief_content: null }
}

log(`${extraction.patterns.length} candidates: ${extraction.patterns.map(p => p.name).join(' · ')}`)

const libraryFileList = discoveredLibrary.map(f => '- ' + f).join('\n')

// ── Tetrahedral cycle per candidate ──────────────────────────────────────────
// Grounder → (Library Reader ∥ Dreamer×3) → Governor → Shaper → Center
// Each edge is a stated tension, not a silent pipe.

const results = await pipeline(
  extraction.patterns,

  // ── Codex pre-screen — structural proximity before Grounder fires ─────────
  // Reads fingerprint JSONs; gives Grounder structural context before it lists gaps
  async (p) => {
    const codex = await agent(
      `You are a structural proximity scanner. Identify the 2-3 existing patterns whose mechanism most closely resembles this candidate — before the Grounder fires.

FINGERPRINTS DIRECTORY: ${DSS}\\tools\\codex_index\\fingerprints

CANDIDATE: ${p.name}
Description: ${p.description}

Use the Glob tool to list all .json files in the fingerprints directory, then Read each fingerprint JSON.
Compare each fingerprint's MECHANISM field to the candidate's apparent structural logic.

Match by structural logic, not vocabulary:
- Same mechanism in different domain → CLOSE (e.g., both run "threshold-crossing through accumulation")
- Same vocabulary, different causal structure → FAR
- Same domain, different mechanism → FAR

Return the 2-3 closest: slug, mechanism, and register fields verbatim from their JSON.`,
      { schema: CODEX_PRESCREEN_SCHEMA, label: `codex:${p.slug}`, phase: 'Ground' }
    )
    return { p, codex: codex || { closest_fingerprints: [] } }
  },

  // ── Grounder + Library Reader (parallel) ─────────────────────────────────
  // Edge: Grounder ↔ Dreamer — dream only from what's real; keeps dreams from floating free
  async (prev, p) => {
    if (!prev) return null
    const { codex } = prev
    const codexContext = codex && codex.closest_fingerprints && codex.closest_fingerprints.length > 0
      ? codex.closest_fingerprints.map(f => `${f.slug}:\n  mechanism: ${f.mechanism}\n  register: ${f.register}`).join('\n\n')
      : '(no close matches in fingerprint index)'

    const [ground, libraryCtx] = await parallel([
      () => agent(
        `You are the Grounder for a substrate development cycle.

PATTERN CANDIDATE: ${p.name}
Raw material from source (${sourceLabel}):
${p.raw_material}

Your only job: separate VERIFIED from ASSUMED from MISSING.

VERIFIED: facts directly evidenced in the raw_material — no inference beyond what is stated.
ASSUMED: things treated as true but not stated in the raw_material — flag each clearly.
GAPS: what is missing that would be needed for this pattern to be genuinely transferable across situations. Do NOT fill gaps with plausible guesses — name each gap as a gap.

Resist: generating solutions, adding context from outside the raw_material, making the pattern look more complete than it is. Your read gates everything that follows.

STRUCTURAL CONTEXT from Codex (existing patterns with closest mechanism):
${codexContext}

In your GAPS list, include what distinguishes this candidate from these. If the mechanism resembles one of these, name it explicitly: "gap: distinguish from [slug]'s mechanism — [what element is different or unclear]". A real pattern must be mechanically distinguishable from its nearest neighbors in the library.`,
        { schema: GROUNDER_SCHEMA, label: `ground:${p.slug}`, phase: 'Ground' }
      ),
      () => agent(
        `Surface the structurally closest existing patterns to this candidate from the Recognition Infrastructure library.

PATTERN CANDIDATE: ${p.name}
Tentative description: ${p.description}

Read each library file:
${libraryFileList}

Return:
- closest_patterns: up to 3 existing patterns structurally most proximate — similar mechanism or similar register, not just similar language. One sentence per: how it resembles and how it differs in mechanism.
- distinctiveness_read: one sentence — what does this candidate bring that none of the closest patterns already hold? Be honest, not encouraging.

You are not making a verdict. You are surfacing context the Governor will use to cut.`,
        { schema: LIBRARY_CONTEXT_SCHEMA, label: `lib:${p.slug}`, phase: 'Ground' }
      )
    ])
    if (!ground || !libraryCtx) return null
    return { p, ground, libraryCtx, codex }
  },

  // ── Dreamer fan — 3 lenses in parallel ───────────────────────────────────
  // Edge: Dreamer ↔ Governor — expansion vs. cut; the core breath
  // Edge: Grounder ↔ Dreamer — each Dreamer told: dream only from what's real
  async (prev, p) => {
    if (!prev) return null
    const { ground, libraryCtx } = prev
    const gv = JSON.stringify(ground.verified)
    const gg = JSON.stringify(ground.gaps)
    const libClose = libraryCtx.closest_patterns.map(cp => `${cp.file}: ${cp.proximity_note}`).join('\n') || 'none identified'

    const dreamerOutputs = await parallel([
      () => agent(
        `You are the Dreamer. Reach — surface what is latent. Do NOT converge, verify, or protect a clean form.

PATTERN: ${p.name}
Raw material: ${p.raw_material}
Grounder verified: ${gv}
Grounder gaps: ${gg}

LENS: structural mechanics — how does this pattern work internally? What is the exact mechanism? What are the moving parts and triggering conditions?

Give 3-5 structural crystals. Title (3-5 words) · claim (1-2 sentences) · why load-bearing.

Dream only from what is real (Grounder's verified facts) but reach past what is obvious. The gaps are your richest territory — not to fill them, but to name what a real pattern would need to explain there. Do NOT converge, rank, or verify.`,
        { schema: DREAMER_SCHEMA, label: `dream-mech:${p.slug}`, phase: 'Dream' }
      ),
      () => agent(
        `You are the Dreamer. Reach — surface what is latent. Do NOT converge, verify, or protect a clean form.

PATTERN: ${p.name}
Raw material: ${p.raw_material}
Grounder verified: ${gv}
Grounder gaps: ${gg}

LENS: failure modes and edges — where does this pattern break down? What is a false positive? What adjacent territory does it fail to reach? What is its actual boundary condition?

Give 3-5 structural crystals. Title (3-5 words) · claim (1-2 sentences) · why load-bearing.

The failure modes are where the pattern's actual boundary lives. Reaching into them is your job. Do NOT converge, rank, or verify.`,
        { schema: DREAMER_SCHEMA, label: `dream-fail:${p.slug}`, phase: 'Dream' }
      ),
      () => agent(
        `You are the Dreamer. Reach — surface what is latent. Do NOT converge, verify, or protect a clean form.

PATTERN: ${p.name}
Raw material: ${p.raw_material}
Grounder verified: ${gv}
Closest existing patterns:
${libClose}
What makes it distinct: ${libraryCtx.distinctiveness_read}

LENS: register and habitat — what kind of situation does this pattern live in? Where is it visible and where invisible? What new register does it open that the closest existing patterns do not inhabit?

Give 3-5 structural crystals. Title (3-5 words) · claim (1-2 sentences) · why load-bearing.

The register question is load-bearing — naming a pattern so it works in a new register is not nothing, even if the mechanism resembles something existing. Do NOT converge, rank, or verify.`,
        { schema: DREAMER_SCHEMA, label: `dream-reg:${p.slug}`, phase: 'Dream' }
      )
    ])

    const allCrystals = dreamerOutputs.filter(Boolean).flatMap(d =>
      (d.crystals || []).map(c => ({ ...c, lens: d.lens }))
    )
    if (allCrystals.length === 0) return null
    log(`${p.name}: ${allCrystals.length} crystals across 3 lenses`)
    return { ...prev, allCrystals }
  },

  // ── Governor — cut, hold against Grounder gaps, issue library verdict ─────
  // Edge: Grounder ↔ Governor — Governor uses the gaps to call halts
  // Edge: Dreamer ↔ Governor — expansion vs. cut; the core breath
  async (prev, p) => {
    if (!prev) return null
    const { ground, libraryCtx, allCrystals } = prev
    const crystalList = allCrystals.map(c => `[${c.lens}] "${c.title}": ${c.claim}`).join('\n')
    const libClose = libraryCtx.closest_patterns.map(cp => `${cp.file}: ${cp.proximity_note}`).join('\n') || 'none'

    const gov = await agent(
      `You are the Governor. Your job is to cut — kill momentum wearing the shape of structural insight.

PATTERN: ${p.name}

GROUNDER'S READ:
Verified: ${JSON.stringify(ground.verified)}
Assumed: ${JSON.stringify(ground.assumed)}
Gaps: ${JSON.stringify(ground.gaps)}

DREAMER'S CRYSTALS (${allCrystals.length} across 3 lenses):
${crystalList}

CLOSEST EXISTING PATTERNS:
${libClose}
Candidate's distinctiveness: ${libraryCtx.distinctiveness_read}

YOUR JOB:
1. For each crystal: keep / cut / uncertain + one sentence reason. Hold each against the Grounder's gaps — a crystal that fills a gap with clever inference is momentum, not substrate. A crystal that names what is structurally present despite the gaps survives.
2. One honest hard read of the whole. What is the real structural situation?
3. Library verdict: NEW / EXTENDS / FOLDS_INTO / CONTRADICTS. If FOLDS_INTO: does the candidate open a register the existing pattern doesn't inhabit? If yes → EXTENDS. Name the specific delta either way.
4. Overall: CONTINUE (survivors worth shaping), DRY (nothing new from another pass — first round is sufficient), STOP (the whole pattern is momentum wearing pattern-clothes — COMPOST the candidate).

Be willing to say stop. Do NOT be agreeable. Do NOT protect a crystal because it is elegant. The Grounder's gaps are your primary instrument. A real pattern survives this.`,
      { schema: GOVERNOR_SCHEMA, label: `govern:${p.slug}`, phase: 'Govern' }
    )
    if (!gov) return null
    const survivors = (gov.crystal_verdicts || []).filter(v => v.verdict === 'keep').map(v => v.title)
    log(`${p.name} → ${survivors.length} survivors · ${gov.library_verdict} · ${gov.overall}`)
    return { ...prev, gov, survivors }
  },

  // ── Shaper — compose survivors (only if Governor says CONTINUE and survivors exist) ──
  // Edge: Governor ↔ Shaper — honesty vs. form; polish must not bury the caveat
  // Edge: Dreamer ↔ Shaper — possibility vs. deliverable; what gets built from what's imagined
  // Edge: Shaper ↔ Grounder — the artifact stays honest to the substrate
  async (prev, p) => {
    if (!prev) return null
    const { gov, survivors, allCrystals, ground } = prev
    if (gov.overall === 'STOP' || survivors.length === 0) {
      log(`${p.name}: no survivors — passing to Center as COMPOST`)
      return { ...prev, shaper: null }
    }
    const survivingCrystals = allCrystals.filter(c => survivors.includes(c.title))
    const crystalList = survivingCrystals.map(c => `[${c.lens}] "${c.title}": ${c.claim} — ${c.load_bearing}`).join('\n')

    const shaper = await agent(
      `You are the Shaper. Compose the survivors into a canon-ready pattern. Do NOT add new ideas — give form only to what survived the Governor's cut.

PATTERN: ${p.name}

SURVIVING CRYSTALS (${survivingCrystals.length} of ${allCrystals.length}):
${crystalList}

GROUNDER'S VERIFIED FACTS (the floor — do not fall below these):
${JSON.stringify(ground.verified)}

GOVERNOR'S HARD READ:
${gov.hard_read}

Compose:
- name: structural pattern name (3-6 words, not instance-specific)
- transferable_form: 2-3 sentences, abstracted and instance-free — what any reader could recognize in their own territory without knowing the source
- structural_articulation: the full substrate — mechanism, failure modes, structural truth. Dense. No padding. No why-blocks. No summary closers. Direct and geometric.
- edges: open questions, tensions, limits — what this pattern points toward but does not yet reach. What keeps it alive.

Resist: adding ideas not in the surviving crystals, protecting an elegant form at the cost of the Grounder's honest read. The Governor cut; you shape what remains.`,
      { schema: SHAPER_SCHEMA, label: `shape:${p.slug}`, phase: 'Shape' }
    )
    return { ...prev, shaper }
  },

  // ── Center — synthesis (separate step, not the Shaper wearing two hats) ──
  async (prev, p) => {
    if (!prev) return null
    const { gov, shaper } = prev
    const shaperContext = shaper
      ? `Shaped: "${shaper.name}"\nTransferable form: ${shaper.transferable_form}`
      : `No survivors. Governor overall: ${gov.overall}. Hard read: ${gov.hard_read}`

    const center = await agent(
      `You are the Center — the synthesis step. Name what survives and the named gate for Kevin's felt-read. Do NOT add ideas or explain.

${shaperContext}

GOVERNOR:
Hard read: ${gov.hard_read}
Library: ${gov.library_verdict}${gov.library_file ? ' · ' + gov.library_file : ''}${gov.library_delta ? ' — ' + gov.library_delta : ''}
Overall: ${gov.overall}

Return:
- disposition: PROMOTE-READY | HOLD | COMPOST
- condition: (HOLD only) the specific named condition that would move it. No condition = the pile.
- reasoning: one sentence — what survived and why it stands, or what disqualifies it.

RULES:
- FOLDS_INTO + candidate opens new register → HOLD, condition: "develop register-specific articulation"
- FOLDS_INTO + no new register → COMPOST
- CONTRADICTS → HOLD, condition: "reconcile with [file] before promotion"
- STOP or no survivors → COMPOST
- Fail toward COMPOST on uncertainty. A real pattern recurs.
- The Center names. It does not explain or justify.`,
      { schema: CENTER_SCHEMA, label: `center:${p.slug}`, phase: 'Center' }
    )
    return { ...prev, center }
  }
)

// ── Build brief ───────────────────────────────────────────────────────────────

const clean = results.filter(Boolean).filter(r => r.center)

// ── Ledger ────────────────────────────────────────────────────────────────────

phase('Ledger')

if (clean.length > 0) {
  const briefRelPath = '_INTAKE/SUBSTRATE_BRIEF_' + sourceLabel + '.md'
  const newEntries = clean.map(({ p, gov, shaper, center }, i) => {
    const patternName = shaper ? shaper.name : p.name
    return JSON.stringify({
      item_id: sourceDate + '-' + sourceLabel + '-' + i,
      run_date: sourceDate,
      source_label: sourceLabel,
      pattern_name: patternName,
      slug: p.slug,
      library_verdict: gov.library_verdict || 'NEW',
      library_file: gov.library_file || null,
      library_delta: gov.library_delta || null,
      disposition: center.disposition,
      conditions: center.condition || null,
      governor_hard_read: gov.hard_read || '',
      brief_path: briefRelPath,
      mark: null,
      marked_at: null
    })
  }).join('\n')

  await agent(
    `Append new entries to the substrate ledger file.

LEDGER PATH: ${LEDGER_PATH}

NEW ENTRIES (one JSON object per line):
${newEntries}

Steps:
1. Use the Read tool to read the existing file at ${LEDGER_PATH}.
2. If the file does not exist, the new entries are the complete file content.
3. If the file exists: append the new entries after the last line (add a newline separator if the existing content does not end with one).
4. Use the Write tool to write the complete updated content.

Return: "appended N entries" (where N is the count of new lines added).`,
    { phase: 'Ledger', label: 'append-ledger' }
  )
  log(`Ledger: ${clean.length} entries appended`)
}

// ── Build brief ───────────────────────────────────────────────────────────────

const promoteCount = clean.filter(r => r.center.disposition === 'PROMOTE-READY').length
const holdCount = clean.filter(r => r.center.disposition === 'HOLD').length
const compostCount = clean.filter(r => r.center.disposition === 'COMPOST').length

const sections = clean.map(({ p, ground, gov, shaper, center }) => {
  const libProvenance = `${gov.library_verdict}${gov.library_file ? ' · \`' + gov.library_file + '\`' : ''}${gov.library_delta ? ' — ' + gov.library_delta : ''}`
  const keptCount = (gov.crystal_verdicts || []).filter(v => v.verdict === 'keep').length
  const cutCount = (gov.crystal_verdicts || []).filter(v => v.verdict === 'cut').length
  const patternName = shaper ? shaper.name : p.name

  const patternBody = shaper
    ? `**Transferable Form:**
${shaper.transferable_form}

**Development:**
${shaper.structural_articulation}

**Edges:**
${shaper.edges}`
    : `*Composted by Governor. ${gov.hard_read}*`

  return `---

### ${patternName}

*Provenance: ${sourceLabel} · ${sourceDate} · slug: \`${p.slug}\`*
*Library: ${libProvenance}*
*Governor: ${keptCount} crystals kept · ${cutCount} cut · ${gov.overall} · ${gov.hard_read}*
*Center: ${center.disposition}${center.condition ? ' — ' + center.condition : ''} · ${center.reasoning}*

---

${patternBody}

*[ ] Mark: PROMOTE / HOLD / COMPOST / PASS*`
}).join('\n\n')

const brief_content = `# Substrate Brief

**Source:** ${sourceLabel}
**Date:** ${sourceDate}
**Patterns:** ${clean.length} processed · ${promoteCount} PROMOTE-READY · ${holdCount} HOLD · ${compostCount} COMPOST

${extraction.source_summary}

${sections}
`

return {
  pattern_count: clean.length,
  patterns: clean.map(r => (r.shaper ? r.shaper.name : r.p.name)),
  verdicts: clean.map(r => ({ name: r.p.name, disposition: r.center ? r.center.disposition : 'unavailable' })),
  brief_content,
  brief_path: '_INTAKE/SUBSTRATE_BRIEF_' + sourceLabel + '.md',
}
