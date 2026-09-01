# rhythm/ — the daily rhythm: two emails, one body, fail-closed by default

*The layer that makes the whole system work for one specific body on its actual day. Design principle: **silence defaults to stop.** If the keeper doesn't respond, nothing moves forward that isn't already automated within the membrane. The system waits; it never nags. Nothing here creates a new crossing path — the membrane stays exactly where it is. Staged 2026-06-09.*

---

## The pieces

| Piece | What it is | Compute |
|---|---|---|
| `skills/overnight-cycle/SKILL.md` | the nightly within-membrane metabolism; extends the GATE daemon under DARK_GATE; **stages, never marks** | owned (+ cognition only if opted-in) |
| `rhythm/brief.py` | generates the two emails from `gate_data.json`; fail-closed to an outbox | **owned, pure stdlib, no AI** |
| `skills/morning-pages-channel/SKILL.md` | the 750-words drop path; harvests work-objects only; the guard as law | owned harvest + metabolizer |
| `rhythm/config.json` | the reserved-zero config; fail-closed when unset | — |

**The two emails** (generated, tested): a **morning brief** (one-line state · what closed overnight as dispositions · ≤3 items owed the body, hard cap · proposals flagged · one DARK_GATE status line · under two minutes on a phone) and an **evening close receipt** whose entire job is the last line: ***nothing owed until morning*** — permission to put it down, in writing, daily.

---

## Mail mechanism — simplest durable, and its ledger line

**The choice:** SMTP through an email account **the keeper already has** (Python `smtplib`, stdlib — GROUND). No new service, no new monthly cost, no new account. The email leaves the bus through his existing provider and lands on his phone.

**Fail-closed delivery, always:**
1. Every email is **written to `rhythm/outbox/` first** — never generated-and-lost.
2. It sends via SMTP **only if** `rhythm/.mail_creds` exists (the keeper's app password, gitignored) **and** `mail.to_addr` is set **and** there is connectivity.
3. **No creds / no signal → it stays queued and is flushed on reconnect (`brief.py flush`). Never silently dropped.**

**The ledger line — drafted here, because email needs a provider and a provider is a rented dependency** (per `consented_ledger`: a leak is survivable only named):

> **Leak — outbound mail provider.** The rhythm sends two emails a day through the keeper's existing mail provider (SMTP). It is a metered/rented dependency: the provider controls delivery, pricing, and continuity. It is *small* (two short messages/day, an account already held, no new cost) and *bounded* (fail-closed to a local outbox; the system is fully legible offline without it — the GATE snapshot is canonical). Named here, consented or not at the keeper's mark. If the provider is ever swapped for a paid transactional-email service, that is a *new* line, re-read.

---

## Plumbing checks & degraded modes — one root, several services

The postal path, the software substrate, the power system — **and the cognition substrate** — share one root: the bus. A degraded root degrades all of them, so each has a fail-closed degraded mode:

- **No connectivity at send time** → email queues in the outbox, flushes on reconnect. Never dropped. *(Built.)*
- **Power down / daemon not running** → the static GATE snapshot stays canonical and legible unplugged (GROUND). The morning email simply doesn't generate until the daemon is back; nothing is lost, nothing is marked. The DARK_GATE status line in each email reports daemon-alive + last-snapshot-time **honestly** — a stale snapshot time *is* the signal.
- **Cognition substrate (rented) unavailable or unconsented** → the overnight cycle runs **mechanical-only** and defers AI-metabolism to the in-session daily-cycle. The night never depends on the metered model. *(This is the default, not a fallback.)*
- **Nightly connectivity from the bus** is **not something this session could verify** — it's physical. The degraded modes above make verification unnecessary for safety: every failure path queues or waits, none drops or marks.

---

## Go-live gate — what's built vs. what's owed before the first real send

**Built and tested this session (owned compute):** the generator (both emails verified against the live GATE), the fail-closed outbox, the two skills, the config, the degraded modes, the ledger line.

**Owed before the rhythm is live** (fail-closed until then — nothing sends):
1. The keeper sets the reserved-zero config (below).
2. The keeper writes `rhythm/.mail_creds` (his app password) — the system never holds the secret in `config.json`.
3. The overnight cycle is actually scheduled on the bus (the daemon's nightly extension) — and the **first three nights self-report** runs, then drops to exceptions-only.

The first morning email is the system's first real output. Until the gate above is closed, `brief.py` generates to the outbox and sends nothing — which is correct.

---

## The one short question list — the reserved zeros *(asked this session)*

1. **Morning-pages drop path** — file-in (owned folder) / email-in (easy from a phone) / both?
2. **Morning send time** — fixed clock time / dawn / on-first-connectivity?
3. **Overnight cognition** — mechanical-only (default; AI-metabolism in-session) / nightly AI-metabolism (only after consenting the rented-cognition leak)?
4. **Raw-pages retention** — shred-after-harvest / gated-zone-until-your-delete / keep-7-days?
5. **Mail account** — confirm the existing email account + write `rhythm/.mail_creds`, or leave the rhythm in outbox-only mode for now?

*(1–4 asked interactively this session; all five recorded here. The selection-rule meta-read is deliberately NOT asked — it leads the first email as item one, default bottleneck-first, named and reversible.)*

---

## Floor

Fail toward subtraction: **the emails get shorter over weeks, or the format is failing.** The rhythm adds **zero new obligations** to the keeper's day beyond reading two short emails and writing the words he already writes. The three-item cap is never negotiable — a queue email that grows is the pile relocated. No reminders, no re-sends, no escalation, ever.

*Nothing fires, nothing crosses. The reaching is not the mark.*
