# XINMAI 1.0 — Life Companion Relationship Authority Foundation Transaction, Schema and Command Fence Corrective P0

## Exit

**CORRECTIVE CANDIDATE READY FOR FINAL ARCHITECTURE RE-REVIEW**

- Exact parent: `914e5784a9cc9cbb8fe261b8a8a6cd4038cfd295`
- Mutation policy: `SAFE_WITHHELD`
- Consumer wiring: `0`
- Phase 2: not started
- Counter: not created
- Push: HOLD

This narrow Corrective closes only the four blockers recorded by `XINMAI-1.0-LIFE-COMPANION-RELATIONSHIP-AUTHORITY-FINAL-ARCHITECTURE-REVIEW-P0`.

## C-01 — Transaction completion is authoritative

`COMMITTED` is no longer prepared as the public result when the two `add` requests are scheduled. The Store records only an internal `commitPrepared` flag and returns `COMMITTED` exclusively from `transaction.oncomplete`.

`transaction.onabort` can return only:

- an already-classified conflict;
- an already-classified unavailable outcome such as quota exhaustion; or
- `UNAVAILABLE / TRANSACTION_ABORTED`.

An aborted transaction can no longer report a rolled-back Relationship or Fence as committed.

## C-02 — Exact canonical schema

The runtime validator now enforces exact keys for:

- Relationship Aggregate;
- nested provenance;
- First Encounter Receipt;
- Identity references;
- Command Fence.

Unknown fields, including raw whisper or private free text, fail before persistence. Existing provenance flags remain declarations in addition to, not substitutes for, structural rejection.

## C-03 — Deterministic reference and command binding

The frozen helpers now derive and revalidate:

- Relationship ID from exact recognized-life identity references;
- First Encounter Receipt reference from its evidence digest;
- command digest from command type/reference, Relationship schema/protocol/ID, exact identity and bounded First Encounter outcome;
- outcome reference from the command digest.

The Store validates this full binding before opening a write transaction. Idempotent replay also compares command digest, outcome reference, Relationship reference and identity key; non-empty arbitrary strings are no longer sufficient.

## C-04 — Expanded failure and concurrency matrix

The direct Foundation Gate now verifies:

- undeclared Aggregate field rejection;
- undeclared provenance field rejection;
- undeclared Fence field rejection;
- tampered command digest rejection;
- write-transaction abort returns `TRANSACTION_ABORTED` and leaves `0/0` records;
- quota failure leaves `0/0` records;
- concurrent same-command submissions converge to one Relationship and one Fence;
- concurrent different-command submissions produce one commit and one fenced loser;
- sequential duplicate remains idempotent;
- corrupt canonical evidence remains fail-closed.

## Frozen scope retained

- dedicated DB remains `xinmai-life-companion-canonical` physical v1;
- Store topology remains exactly two Stores and the previously frozen indexes;
- public Controller remains `SAFE_WITHHELD / NOT_RETRYABLE` and has no Store import;
- ordinary product use opens and writes no canonical Relationship database;
- Genesis, Life Whisper, Naming, Reality and all presentation consumers remain unchanged;
- no localStorage/sessionStorage mirror, backfill, delete, rewrite or protocol reinterpretation;
- Production bundle contains no canonical DB/schema marker.

## Verification

- TypeScript / Production Build: PASS (`430` modules)
- corrected Authority Foundation Gate: PASS
- first-principles participation loop: PASS
- Identity → First Encounter → Relationship continuity: PASS
- Production bundle zero consumer: PASS
- `git diff --check`: PASS

## Required next decision

Perform the same independent Final Architecture Review again against this Corrective Candidate. The Corrective does not self-declare `ACTIVATION APPROVED` and does not authorize Phase 2, Product Control Tower promotion, Push or Merge.
