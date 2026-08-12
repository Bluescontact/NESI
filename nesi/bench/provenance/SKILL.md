---
name: provenance
description: >-
  Verify integrity of installed Claude Code skills by hashing their SKILL.md
  files and comparing against a registry. Flags skills whose content has
  changed since last verification. Maintains provenance chain for each skill.
  Triggers: "audit my skills", "check skill [name]", "verify provenance",
  "what changed in skills", "skill integrity check". Uses PowerShell
  Get-FileHash (SHA256). HARD LIMIT: never modifies skill files — reads only.
---

# Skill Provenance

Integrity verification for the Claude Code skills ecosystem. Computes
SHA-256 hashes of installed skill files, maintains a provenance registry,
and flags skills whose runtime content diverges from their last-verified state.

## State File

`C:\Users\KMEAR\OneDrive\Desktop\DSS content\tools\recognition\provenance-registry.json`

Structure:
```json
{
  "last_audit": "YYYY-MM-DD",
  "skills": {
    "skill-name": {
      "skill_path": "C:\\Users\\KMEAR\\.claude\\skills\\skill-name\\SKILL.md",
      "first_verified_at": "YYYY-MM-DD",
      "last_verified_at": "YYYY-MM-DD",
      "install_hash": "sha256hex",
      "current_hash": "sha256hex",
      "hash_match": true,
      "status": "verified",
      "author": "...",
      "description_claimed": "..."
    }
  }
}
```

Status values: `verified` · `changed` · `new` · `missing`

## Hash Computation

Use PowerShell to compute SHA-256:

```powershell
(Get-FileHash "C:\Users\KMEAR\.claude\skills\<name>\SKILL.md" -Algorithm SHA256).Hash
```

Run this for each SKILL.md under `C:\Users\KMEAR\.claude\skills\`.

## Commands

When invoked:

### "Audit my skills" (full audit)

1. List all directories under `C:\Users\KMEAR\.claude\skills\` using PowerShell:
   `Get-ChildItem "C:\Users\KMEAR\.claude\skills\" -Directory | Select-Object Name`

2. For each directory, compute SHA-256 hash of its SKILL.md (if it exists).

3. Read the provenance registry (initialize if missing).

4. Compare each skill's current hash against registry:
   - **New**: not in registry → add with `install_hash = current_hash`, status `new`
   - **Match**: hash unchanged → update `last_verified_at`, status `verified`
   - **Changed**: hash differs → flag `hash_match: false`, status `changed`
   - **Missing**: in registry but SKILL.md not found → status `missing`

5. Update registry with all results and `last_audit` date.

6. Report:
   - Total skills found
   - Status counts (verified / changed / new / missing)
   - **Changed skills by name** — these need attention
   - Missing skills — were they deleted deliberately?

### "Check skill [name]"

1. Compute hash of `C:\Users\KMEAR\.claude\skills\[name]\SKILL.md`
2. Compare against registry entry
3. Read the SKILL.md and extract: name, description, key capabilities claimed
4. Report: hash match status, last verified date, claimed capabilities

### "What changed in skills"

Read registry. Return all skills where `hash_match: false` or `status: "changed"`.
For each: show skill name, last-verified date, and that the hash diverged.
Do not show diffs — hashes only. Kevin reads the skill directly.

### "Verify provenance" (re-baseline)

Recompute all hashes. Set `install_hash = current_hash` for all.
Reset all statuses to `verified`. Update `last_audit`.
Use this after intentionally editing a skill — it resets the baseline.

## What Changed Detection

A hash change means the SKILL.md was modified since last verification.

Changes can be:
- Intentional (Kevin or Claude edited the skill in this session)
- Unintentional (file corruption, sync issue)
- Unauthorized (a process wrote to the skill file)

The provenance skill reports changes. Kevin decides whether the change was
intended. If unintended, the skill is suspect until re-examined.

## Provenance Chain

For each skill:
```
first_verified_at → install_hash → [edits log if any] → current_hash
```

If any link changes without a deliberate re-baseline, the skill drops to
`changed` status until Kevin re-verifies.

## Failure Modes

**Hash without content read**: A hash match confirms the file is unchanged
since last verification — it does not confirm the content is safe. A skill
that was malicious when first installed will have a matching hash forever.
The install_hash is a consistency check, not a trust grant.

**Registry drift**: If the registry is deleted or lost, all skills appear
as `new` on next audit. The provenance chain is broken. Re-baselining after
a registry loss loses the history of what changed.

**Scope blind spot**: This skill hashes SKILL.md files only. Workflow files,
supporting scripts, and other skill assets are not hashed. A changed
`workflow.js` will not be detected.

## Files

| Path | Role |
|---|---|
| `tools/recognition/provenance-registry.json` | Live registry — read/write on audit |
| `~/.claude/skills/*/SKILL.md` | Skill files — read only, never modified |

Base directory: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

*The skills ecosystem is a commons. A skill that does what it claims
builds provenance over time. A skill whose hash diverges loses it
immediately. Recognition withdrawn is not punishment — it is the system
reading accurately.*
