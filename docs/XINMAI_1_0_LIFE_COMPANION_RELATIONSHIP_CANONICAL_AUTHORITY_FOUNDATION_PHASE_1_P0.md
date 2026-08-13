# XINMAI 1.0 — Life Companion Relationship Canonical Authority Foundation Phase 1 P0

## Exit

**A. PHASE 1 FOUNDATION READY FOR INDEPENDENT ARCHITECTURE REVIEW**

This blade installs the canonical Relationship persistence and read contracts required by the accepted Final Architecture Review. It does not activate the Relationship Runtime and does not change the current product journey.

- Expected parent: `25a2262e0689807c0e4574ca5503d833b422adf1`
- Mutation policy: `SAFE_WITHHELD`
- Phase 2: not started
- Counter: not created in Phase 1
- Push: HOLD

## Frozen authority boundary

The unique future mutation owner is `XinmaiLifeCompanionRelationshipController`. In this Phase 1 Candidate its public command always returns:

- `SAFE_WITHHELD`
- `MUTATION_POLICY_SAFE_WITHHELD`
- `NOT_RETRYABLE`

The Controller does not open IndexedDB, create a transaction, or call the canonical writer. Genesis, Life Whisper, Naming and Reality do not import the new Controller, Store, Recovery Adapter or types.

## Canonical persistence topology

- Database: `xinmai-life-companion-canonical`
- Physical version: `1`
- Store count: exactly `2`

### `life-companion-relationship`

- keyPath: `relationshipId`
- unique index: `identityKey`
- unique index: `firstEncounterReceiptReferenceId`

### `life-companion-command-fence`

- keyPath: `commandReferenceId`
- unique index: `outcomeReferenceId`
- non-unique index: `relationshipId`

No third Store, second database, localStorage mirror, sessionStorage mirror, record deletion, backfill or schema reinterpretation is introduced.

## Canonical evidence contract

The frozen Relationship aggregate binds:

- the exact recognized-life source, Star Beast identity and mansion-coordinate references;
- one bounded First Encounter visual response cycle and reference;
- `MOTION_RESPONSE`, `STATIC_RESPONSE`, or `RESPONSE_UNAVAILABLE_ACCEPTED`;
- one explicit future `CONFIRM_COMPANIONSHIP` command;
- one immutable First Encounter Receipt, protocol revision, aggregate revision and deterministic SHA-256 evidence digest;
- one command fence committed in the same future read-write transaction.

Raw whisper text and private free text are not part of the aggregate. Life Whisper, Naming and Reality are explicitly non-authoritative and not required.

## Recovery and legacy boundary

Read-only recovery distinguishes:

- valid exact-identity relationship: `READY`;
- missing record: `NOT_ESTABLISHED / RELATIONSHIP_NOT_FOUND`;
- unavailable, blocked or aborted storage: typed `BLOCKED` result;
- corrupt or identity-mismatched evidence: fail closed.

Recovery never infers Relationship from Identity, Naming, Life Whisper or a Reality Intent. Candidate localStorage evidence is not backfilled into this canonical database, and an older relationship is never reinterpreted under a current identity or protocol.

## Verification matrix

The dedicated Authority Foundation Gate verifies:

- fresh database creates exactly two Stores and the frozen indexes;
- official Phase 1 Controller produces zero records;
- exact aggregate/receipt/digest validation;
- one atomic relationship + command-fence commit in the isolated transaction harness;
- exact duplicate command returns `ALREADY_COMMITTED` without a second record;
- different/late command for an already-bound identity fails closed;
- blocked open, unavailable IndexedDB and aborted transaction return typed outcomes;
- quota failure leaves zero relationship and zero fence records;
- corrupt evidence fails closed;
- no consumer wiring and no local/session storage path.

Additional results:

- TypeScript / Production Build: PASS (`430` modules)
- First-principles participation loop: PASS
- Identity → First Encounter → Relationship continuity: PASS
- Production bundle canonical DB/schema markers: `0`
- `git diff --check`: PASS

## Scope proof

Changed implementation scope is limited to:

- canonical Relationship types;
- evidence validators and deterministic digest helpers;
- dedicated IndexedDB Store foundation;
- read-only Recovery Adapter;
- SAFE_WITHHELD public Controller and mutation policy;
- one direct Authority Foundation Gate and its package registration;
- this evidence report.

No Genesis, LaunchLab, Life Whisper, Naming, Reality, Birth, Identity, Pressure Catalog, Gravity, Choice, Fact, Crystal, Body, Archive, CSS or presentation consumer is modified.

## Architecture Review decision requested

Review only whether Phase 1 faithfully implements the frozen canonical boundary while remaining inert in ordinary product use.

If accepted, a separate Phase 2 blade may be authorized to atomically activate:

`exact Identity → typed First Encounter outcome → explicit 确认同行 → canonical Relationship`

That Phase 2 completion surface must stop before Life Whisper, Naming and Reality and must include its own direct-child one-policy Forward SAFE_WITHHELD Counter. Product Control Tower promotion and Push remain prohibited until Phase 2 independent acceptance.
