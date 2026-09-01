-- ┌───────────────────────────────────────────────────────────────────────────┐
-- │  THE OPEN LEDGER · data spine                                               │
-- │                                                                             │
-- │  One law: it records everything that circulates and computes nothing        │
-- │  that is owed.                                                              │
-- │                                                                             │
-- │  The gift frame is not enforced by instruction. It is enforced by ABSENCE.  │
-- │  Debt is not prohibited — it is UNREPRESENTABLE. There is nowhere in this   │
-- │  schema to write a balance, a price, a refusal-to-respond, a role, or a     │
-- │  claim. A stranger with full write access still cannot enter a debt,        │
-- │  because there is no field for one. A frame held by instruction breaks the  │
-- │  moment the instructor leaves. A frame held by structural incapacity holds  │
-- │  in any hands.                                                              │
-- │                                                                             │
-- │  Vocabulary is load-bearing (see CIRCUIT_TOOL.md): carry / hold / route /   │
-- │  flow / rest / gap / refusal. Any word that drifts toward transaction       │
-- │  (own, owe, balance, price, settle, complete) corrupts the frame at the     │
-- │  root — so none of them exist as columns.                                   │
-- │                                                                             │
-- │  SQLite dialect. Pre-gate. Not canon, not substrate. The keeper holds the mark.  │
-- └───────────────────────────────────────────────────────────────────────────┘
--
-- TOPOLOGY: A — commons record + held-key ownership (marked 2026-06-21). See §held-key.

PRAGMA foreign_keys = ON;

-- ── THE COMMONS ──────────────────────────────────────────────────────────────
-- The field. A circle. Everything attaches HERE, never to a counterparty.
CREATE TABLE commons (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,                  -- "the floor", a village, a circle
  running_on  TEXT,                           -- what the circuit runs on (the non-transactional source)
  founded_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── CONTACT ──────────────────────────────────────────────────────────────────
-- A roster of who is in the circle, carrying nothing but REACH — a way to find a
-- person in the gathering. It is NOT a person record.
--   · no role / type / status   →  #4: a person cannot be bound to a role
--   · no balance / account      →  #1: there is no per-person account
--   · no standing / score       →  nothing here can rank, type, or profile a person
-- And note the deeper move: NO ledger entry references a contact (see below).
-- You cannot join entries to people, so "who is neediest" / "who gave most" are
-- not slow queries — they are columns that do not exist.
-- (Ownership of an entry is a HELD KEY, not a contact link — see §held-key below.)
CREATE TABLE contact (
  id          TEXT PRIMARY KEY,
  commons_id  TEXT NOT NULL REFERENCES commons(id),
  reach       TEXT NOT NULL                   -- how to reach them in the room; not an identity
);

-- ── THE LEDGER ───────────────────────────────────────────────────────────────
-- Every line is something that moved through the commons: a need surfaced, a gift
-- carried in, a refusal held, a gathering called. Each line attaches to the
-- COMMONS. There is no `from`, no `to`, no counterparty, and — deliberately — no
-- person. A need attaches to the floor ("the floor gives here"), never stamped
-- onto someone as "X is needy." A gift deposits to the field; the giver forfeits
-- the claim at the moment of giving, including the claim to having given.
CREATE TABLE entry (
  id           TEXT PRIMARY KEY,
  commons_id   TEXT NOT NULL REFERENCES commons(id),   -- #1: attaches to the field, not a counterparty
  kind         TEXT NOT NULL CHECK (kind IN ('need','gift','refusal','gathering')),
  description  TEXT NOT NULL,                            -- what it is, in words
  weight       TEXT,                                     -- the VISIBLE WEIGHT of what it took:
                                                         -- "a full day", "the last of the firewood".
                                                         -- Qualitative. Shown. Never a number, never summed.
                                                         -- This is the seam: cost made legible, not transactional.
  state        TEXT CHECK (state IN ('gap','flowing','resting')),
                                                         -- circulation, never settlement.
                                                         -- there is no 'complete', no 'paid', no 'closed'.
                                                         -- a gap re-opens anytime; rest is not an ending.
  posted_at    TEXT NOT NULL DEFAULT (datetime('now')),

  holder_proof TEXT                                      -- TOPOLOGY A: authorship-as-control, not identity.
                                                         -- an opaque verifier (hash of a per-entry secret the
                                                         -- poster holds). authorizes retract of THIS entry only.
                                                         -- never selected, never grouped, never mapped to a
                                                         -- person — see §held-key.

  -- ───────── ABSENT BY DESIGN — the spine lives in the columns that are NOT here ─────────
  --   recipient_id / counterparty_id           #1  →  barter is unrepresentable
  --   price / amount / value / worth / rate     #2  →  the marketplace is unrepresentable
  --   (and there is no responses/declines table) #3  →  obligation-by-visibility is unrepresentable
  --   owner_person / node_id / claimant         #4  →  the "needy person" is unrepresentable
  --                                                     (ownership is a held key, not a stored identity)
  --   claim / obligation / due / assignee       #5  →  the contract is unrepresentable
  --   felt_as_gift / quality / sentiment             →  the tool cannot read the room (see §limit)
);

-- ── HELD-KEY OWNERSHIP (Topology A, marked 2026-06-21) ──────────────────────────
-- "You hold your own node" without "the needy person is representable" — the two
-- reconcile by splitting authorship-as-CONTROL from authorship-as-IDENTITY.
--   · CONTROL  — "I posted this, I can retract it" — lives in a secret the poster
--     holds. The schema stores only `holder_proof = hash(secret)` on the entry.
--   · IDENTITY — "this person IS needy" — would be a column that ranks people by
--     their entries. It does not exist.
-- The schema NEVER reads holder_proof back (it is in no view) and NEVER links it to
-- a person (there is no key→person table). A fresh secret per entry makes every
-- holder_proof unique, so even GROUP BY holder_proof profiles no one.
--
-- "Your node" is therefore not a server query — it is computed from the keyring YOU
-- hold, by checking which entries your secrets open. There is no authoritative record
-- of who holds what. No central authority; nothing to be kicked out of.
--
-- The one write that touches holder_proof:
--   retract(entry_id, secret):  IF hash(secret) = entry.holder_proof
--                               THEN delete the row (it stops circulating, leaves no mark)
--                               ELSE refuse — and reveal nothing.
-- There is no `entries_by_holder` view: the server cannot list a person's entries,
-- because it does not know any person owns any entry.

-- ── WHAT THE LEDGER CAN SHOW ───────────────────────────────────────────────────

-- The full open ledger: everything that circulated, in order.
CREATE VIEW circulation AS
  SELECT posted_at, kind, description, weight, state
  FROM   entry
  ORDER  BY posted_at;

-- The floor's open gaps — needs still showing. Visible WITHOUT recording who didn't act.
-- (This is the seam's other half: unmet need is legible; non-response is invisible.)
CREATE VIEW open_gaps AS
  SELECT id, description, weight, posted_at
  FROM   entry
  WHERE  kind = 'need' AND state = 'gap';

-- The gatherings — first-class, because the room is where the felt-read lives (§limit).
CREATE VIEW gatherings AS
  SELECT id, description, posted_at
  FROM   entry
  WHERE  kind = 'gathering';

-- ── WHAT THE LEDGER CANNOT SHOW ─────────────────────────────────────────────────
-- These are not forbidden by a rule. They cannot be written, because the columns
-- and tables they require do not exist. Run them against the schema above:
--
--   -- #1  a balance between two people:
--   SELECT giver, receiver, SUM(amount) FROM ...   -- no giver, no receiver, no amount
--
--   -- #2  a price / a total owed:
--   SELECT SUM(value) FROM entry;                  -- no numeric column to sum
--
--   -- #3  who declined / who didn't respond:
--   SELECT * FROM declines;                        -- no such table
--
--   -- #4  the needy people, ranked:
--   SELECT surfaced_by, COUNT(*) FROM entry        -- no surfaced_by; entries name no person
--     WHERE kind='need' GROUP BY surfaced_by;
--
--   -- #5  who owes a response:
--   SELECT * FROM claims;                          -- no such table
--
-- None of these parse. That is the spine, and it holds in a stranger's hands.
