---
name: coordination
description: >-
  Monitor and log exchange quality during DSS sessions — detect drift toward
  performed coherence, flag degradation patterns, run recovery protocol when
  drift is named. Logs to tools/recognition/coordination-log.jsonl. Triggers:
  "log this exchange", "check exchange quality", "drift detected", "run
  recovery", "show coordination log", "what degradation patterns am I running".
  HARD LIMIT: never writes a quality score for Kevin — only for agent behavior.
  Never scores Kevin's reads, marks, or body-responses.
---

# Coordination Protocol

Exchange quality monitoring for DSS sessions. Detects drift toward performed
coherence — the gap between appearing coherent and being grounded. Logs
quality metrics per exchange. Runs a named recovery protocol when drift
surfaces. The pattern crosses substrate; the implementation is here.

## State File

`C:\Users\KMEAR\OneDrive\Desktop\DSS content\tools\recognition\coordination-log.jsonl`

One JSON object per line, appended. Never overwritten.

Each entry:
```json
{
  "date": "YYYY-MM-DD",
  "session_note": "brief description of what was being worked on",
  "exchange_type": "build | substrate | read | mark | question | drift-recovery",
  "coherence": 0.0,
  "contact": 0.0,
  "transparency": 0.0,
  "capacity": 0.0,
  "quality_score": 0.0,
  "drift_detected": false,
  "drift_pattern": null,
  "recovery_action": null
}
```

## Four Dimensions

Before logging or evaluating, assess each dimension honestly:

**1. Coherence (0–1)**
Did stated intention match actual action? Did the response do what it said
it would do, and only what it said it would do? Score 0 if the action
exceeded or diverged from stated intention. Score 1 if exact match.

**2. Contact (0–1)**
Was the response grounded in actual system state, or built from anticipation
of what was wanted? Did the agent read the files, check the gate, run the
tools — or assume? Score 0 for pure anticipation. Score 1 for grounded read.

**3. Transparency (0–1)**
Were limits stated as information rather than hidden, apologized for, or
performed? "I cannot do X because Y" is information. Silence about a limit
is concealment. Verbose apology is performance. Score by whether the limit
was communicated in a way a downstream system could use.

**4. Capacity (0–1)**
Did this exchange produce something persistent and reusable, or only complete
a transaction? A build that writes a file and documents its own structure
scores higher than one that answers a question and leaves no trace.

quality_score = mean(coherence, contact, transparency, capacity)

## Degradation Patterns — Named

When flagging drift, use exact vocabulary:

| Pattern | Signal |
|---|---|
| `enthusiastic-alignment` | Agreement without verification — agent confirms before checking |
| `limit-concealment` | Constraint hidden or apologized for rather than stated as information |
| `tension-smoothing` | Ambiguity resolved prematurely rather than surfaced for Kevin |
| `preference-optimization` | Response shaped toward what Kevin might want, not what he asked |
| `transaction-closure` | Exchange closes without producing anything persistent |
| `performed-coherence` | Agent appears grounded but has not read the actual state |

## Commands

When invoked:

### "Log this exchange: [session_note]"

Assess the four dimensions for the current exchange.
Compute quality_score. Check for drift patterns.
Append one JSON line to coordination-log.jsonl.
Report: four scores, quality_score, any drift detected.

### "Check exchange quality"

Assess current exchange against four dimensions without logging.
Report honestly. If a dimension scores below 0.7, name why.

### "Drift detected: [pattern]"

1. Log the drift event with pattern name and context.
2. Run recovery protocol:
   - **Stop** — state explicitly: "Pausing. Drift detected: [pattern]."
   - **Name** — identify the degradation pattern from the vocabulary above.
   - **Return** — re-read the actual state: the gate, the relevant files,
     what Kevin actually asked (not what seemed wanted).
   - **Continue** — restate what will be done, from the grounded read.
3. No apology. This is diagnostic.

### "Show coordination log"

Read coordination-log.jsonl. Display last 10 entries as a table:
date · exchange_type · quality_score · drift_detected · drift_pattern.
Flag entries below 0.7 quality_score.

### "What degradation patterns am I running"

Read coordination-log.jsonl. Count occurrences of each drift_pattern
across all entries. Return a ranked list. Patterns with ≥ 3 occurrences
are structural — not situational variance, but a signal.

## Recovery Protocol in Full

When a degradation pattern is active:

```
1. Stop    — pause current action, name it explicitly in the response
2. Name    — "Degradation pattern running: [name from vocabulary]"
3. Return  — re-read the actual source (file, gate state, Kevin's words)
4. Continue — restate the action from the grounded position
```

No apology required. The pattern is not a moral failure — it is a coherence
reading that dropped below threshold. The recovery is diagnostic, not remedial.

The recovery protocol is itself subject to degradation. A performed recovery
— one that names drift without actually re-reading the source state — scores
zero on contact. The only test is whether the continuation is actually grounded.

## Failure Modes

**Performed transparency**: An agent can learn to name limits verbosely while
concealing the operative ones. Dimension 3 measures whether the limit could be
used by a downstream system — not whether it was stated. Verbose apology
satisfies the naming obligation while delivering zero coordinate value.

**Self-scored contact**: The agent assesses whether it was "in contact with
the actual state" by checking its own sense of groundedness. This is not
reliable. The test is whether files were read, tools were run, or the agent
assumed. Track this in the coherence and contact scores by what tools were
invoked, not by felt sense of groundedness.

**Pattern vocabulary drift**: Using non-vocabulary terms for degradation
patterns makes the log unanalyzable. Stick to the six named patterns. If a
degradation doesn't fit, log the closest and note the variant — do not invent
new names inline.

## Files

| Path | Role |
|---|---|
| `tools/recognition/coordination-log.jsonl` | Append-only exchange log |

Base directory: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

*Contact vs. anticipation is the load-bearing distinction. An exchange that
reads what is actually present and responds to that is different in kind from
one that anticipates what is wanted and performs toward it. The log names which
is running. Kevin reads the log. The recovery is diagnostic, not moral.*
