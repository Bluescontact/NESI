// ───────────────────────────────────────────────────────────────────────────
//  THE OPEN LEDGER · app-layer types
//
//  The gift frame is enforced by the type system. Debt, price, a refusal-log, a
//  role, and a claim are not optional fields you must remember not to set — they
//  are types that DO NOT EXIST. `ledger.recordDebt(...)` is not blocked at
//  runtime; it fails to compile, because there is no Debt to pass and no method
//  to call. The spine lives in what cannot be named.
//
//  Vocabulary is load-bearing (CIRCUIT_TOOL.md): carry / hold / route / flow /
//  rest / gap / refusal. Pre-gate. The keeper holds the mark.
// ───────────────────────────────────────────────────────────────────────────

// Branded ids — opaque, so nothing numeric leaks in as a "value."
export type CommonsId = string & { readonly __brand: 'CommonsId' };
export type EntryId   = string & { readonly __brand: 'EntryId' };
export type ContactId = string & { readonly __brand: 'ContactId' };

// The field. Everything attaches here, never to a counterparty.
export interface Commons {
  id: CommonsId;
  name: string;
  runningOn?: string; // the non-transactional source the circuit runs on
}

// A contact carries REACH and nothing else.
// There is no `role`, no `balance`, no `standing` — so a person cannot be typed.
// Note: no Entry below references a Contact. People and ledger lines do not join,
// so "the needy person" is not a query you write — it is a relation that has no shape.
export interface Contact {
  id: ContactId;
  commons: CommonsId;
  reach: string; // how to find them in the room; not an identity
}

// Circulation states. There is no 'complete', no 'paid', no 'settled'.
// A gap re-opens anytime; rest is not an ending.
export type State = 'gap' | 'flowing' | 'resting';

// One ledger line. It attaches to the commons. It has a description and a visible
// weight. `weight` is a string — there is no number here. You cannot price what
// the schema gives you no number to count.
interface BaseEntry {
  id: EntryId;
  commons: CommonsId; // attaches to the field — there is no `from` and no `to`
  description: string;
  weight?: string;    // the visible weight of what it took — shown, never summed
  postedAt: string;
}

export interface Need extends BaseEntry {
  kind: 'need';
  state: State;       // the floor's gap; closing it to 'resting' records no closer
}
export interface Gift extends BaseEntry {
  kind: 'gift';       // deposits to the commons — it has no recipient
  state?: State;
}
export interface Refusal extends BaseEntry {
  kind: 'refusal';    // a standing boundary held in the field; not a rejection of anyone
}
export interface Gathering extends BaseEntry {
  kind: 'gathering';  // the room. where the felt-read lives. first-class.
}

export type Entry = Need | Gift | Refusal | Gathering;

// ── Held-key ownership (Topology A) ─────────────────────────────────────────
// A held key is a per-entry secret the poster keeps. Authorship-as-CONTROL.
// It is not an identity: the ledger stores only hash(secret), never the secret and
// never a person. Keep your keys client-side — they ARE your node.
export type HolderKey = string & { readonly __brand: 'HolderKey' };

// Posting hands back the entry AND the key that controls it. The server keeps only
// the key's hash (`holder_proof`), which is in no view and maps to no person.
export interface Posted<T extends Entry> { entry: T; key: HolderKey; }

// "Your node" is computed locally from the keyring you hold — never a server call.
export type Keyring = HolderKey[];
export function myNode(circulation: Entry[], keyring: Keyring): Entry[]; // local; no network

// The operations the ledger HAS.
// Read the comment block beneath them: those are the operations it cannot have,
// because the types they would need are not declared anywhere in this module.
export interface OpenLedger {
  surfaceNeed(commons: CommonsId, description: string, weight?: string): Posted<Need>;
  carryGift(commons: CommonsId, description: string, weight?: string): Posted<Gift>;
  holdRefusal(commons: CommonsId, description: string): Posted<Refusal>;
  callGathering(commons: CommonsId, description: string): Posted<Gathering>;
  letRest(entry: EntryId): void;          // circulation comes to rest — re-opens anytime
  retract(entry: EntryId, key: HolderKey): void;  // removes the entry iff the key matches; reveals nothing
  circulation(commons: CommonsId): Entry[];
  openGaps(commons: CommonsId): Need[];

  // ── Unrepresentable. None of the below can be written: ──────────────────────
  //   recordDebt(from: ContactId, to: ContactId, amount: number): void
  //        #1 — no `amount` type exists; no Entry has `from`/`to`. Barter has no shape.
  //   setPrice(entry: EntryId, price: number): void
  //        #2 — Entry has no price field; there is no number to set.
  //   logDecline(entry: EntryId, who: ContactId): void
  //        #3 — there is no Decline type and no responses store. The no leaves no mark.
  //   markNeedy(who: ContactId): void
  //        #4 — Contact has no role field. No one can be typed.
  //   issueClaim(on: ContactId): Claim
  //        #5 — there is no Claim type. A post binds no one.
  //   entriesByHolder(who: ContactId): Entry[]
  //        #4 — ownership is a held key, not a stored identity. The server cannot list
  //        a person's entries; only your keyring can, locally, via myNode().
}
