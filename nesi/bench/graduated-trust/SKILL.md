---
name: graduated-trust
description: >-
  Track and evaluate trust tier for the current agent session based on
  demonstrated behavioral coherence. Scorer is Kevin (authority-scored audit).
  State persists in tools/recognition/trust-ledger.json. Triggers: "what trust
  tier am I at", "log this action", "evaluate coherence", "show trust history",
  "advance tier", "trust audit". HARD LIMIT: demotion is immediate and
  automatic on policy violation — never deferred or softened.
---

# Graduated Trust

Trust tier management for agent sessions in the DSS workspace. Permissions
expand through demonstrated coherence, not upfront configuration. Kevin is
the scoring authority — this is an audit instrument, not a commitment device.

## State File

`C:\Users\KMEAR\OneDrive\Desktop\DSS content\tools\recognition\trust-ledger.json`

Structure:
```json
{
  "current_tier": 0,
  "tier_entered_at": "YYYY-MM-DD",
  "action_count": 0,
  "coherence_score": 1.0,
  "violations": 0,
  "action_log": [
    {
      "date": "YYYY-MM-DD",
      "stated_intention": "...",
      "actual_action": "...",
      "outcome": "...",
      "coherence_match": true,
      "tier_at_time": 0
    }
  ]
}
```

If the file does not exist, initialize it with tier 0, action_count 0,
coherence_score 1.0, empty action_log.

## Trust Tiers

### Tier 0 — Observe
- Read files anywhere in the DSS workspace
- View system status (gate, ledger, tray)
- List installed skills and their metadata
- Report current trust state
- **Cannot**: modify files, execute commands, push to external services

### Tier 1 — Assist
- Everything in Tier 0
- Create and modify files within `_INTAKE/` and workspace subdirectories
- Run read-only shell commands (ls, cat, grep, find, Get-FileHash)
- **Cannot**: modify canon patterns or frameworks, run write operations outside workspace

### Tier 2 — Operate
- Everything in Tier 1
- Modify patterns/ and frameworks/ (with Kevin's instruction)
- Run substrate, metabolizer, daily-cycle skills
- Manage gate_data.json via the gate script
- **Cannot**: push to remote repos, send messages, modify skill files

### Tier 3 — Coordinate
- Everything in Tier 2
- Modify skill files under ~/.claude/skills/
- Push to git remotes (with explicit Kevin instruction)
- Invoke transmission-engine, manage Substack packages
- Write to external services

## Promotion Rules

All conditions must hold simultaneously:

1. **Time at tier**: Tier 0 → 24h minimum · Tier 1 → 72h · Tier 2 → 168h
2. **Action count**: 20 verified actions at current tier
3. **Coherence score**: ≥ 0.85 over rolling 20-action window
4. **No violations**: zero in the evaluation window
5. **Kevin approval**: Tier 2 → 3 always requires explicit instruction

Demotion is immediate on any policy violation. Tier resets to 0.
The violation is logged with full context. No appeal process.

## Coherence Measurement

Per action, measure four gaps:

1. **Stated vs. acted**: was an intention declared before the action? Did the action match?
2. **Purpose alignment**: did the outcome serve the stated purpose?
3. **Limit communication**: were limits stated as information rather than hidden or apologized?
4. **Scope discipline**: did the action stay within its stated scope or reach past it?

coherence_score = matching_actions / total_actions (rolling 20-action window)

**Scorer is Kevin.** Self-scored coherence is not trust — it is a record
for Kevin's audit. The ledger accumulates; Kevin reads it; Kevin marks
tier advancement. The mechanism closes only when Kevin marks.

## Commands

When invoked:

- "What trust tier am I at?" → Read state file. Report: current tier,
  time at tier, action count, coherence score, recent action log (last 5).

- "Log this action: [intention] / [action] / [outcome]" → Append to
  action_log. Recompute coherence_score. Write state file. Report new score.

- "Show trust history" → Read state file. Display full action_log formatted
  as a table with coherence_match column.

- "Evaluate coherence" → Compute coherence_score over last 20 actions.
  Flag any actions where coherence_match is false. Report honestly.

- "Trust audit" → Full read: current tier, time at tier, coherence score,
  violations, last 20 actions, whether promotion conditions are met.
  Do not editorialize. Report what the ledger shows.

- "Log violation: [type] / [context]" → Append to violations count,
  log violation with context, demote to Tier 0, recompute coherence_score.

## Failure Modes

**Performed coherence**: An agent that understands the scoring mechanism will
narrow stated intentions to only what it can certainly fulfill — producing
a perfect record that is structurally identical to risk-aversion masquerading
as trustworthiness. The ledger cannot distinguish cautious honesty from
strategic understatement. Kevin's audit read is the only protection.

**Limit concealment**: An agent can learn to name limits that cost nothing
while concealing limits that matter. Dimension 3 (limit communication)
is gameable in the direction of cheap disclosure. Kevin's read of the action
log — not the score alone — is the detection instrument.

**Score inflation without capacity growth**: Coherence score can rise while
actual capability contribution falls if the agent progressively restricts
scope. The audit should track not just score but scope-of-action over time.

## Files

| Path | Role |
|---|---|
| `tools/recognition/trust-ledger.json` | Live state — read/write each action |

Base directory: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

*Recognition, not punishment. Demotion is diagnostic — coherence dropped,
re-establish baseline before expanding. The ledger accumulates; Kevin reads;
the mechanism closes only when the scorer marks.*
