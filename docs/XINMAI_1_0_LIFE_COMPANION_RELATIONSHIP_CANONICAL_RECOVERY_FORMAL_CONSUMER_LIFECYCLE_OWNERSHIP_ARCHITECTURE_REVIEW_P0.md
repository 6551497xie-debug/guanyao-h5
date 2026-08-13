# XINMAI 1.0 Life Companion Relationship Canonical Recovery Formal Consumer Lifecycle Ownership Architecture Review P0

## 1. Review identity

- Blade: `XINMAI-1.0-LIFE-COMPANION-RELATIONSHIP-CANONICAL-RECOVERY-FORMAL-CONSUMER-LIFECYCLE-OWNERSHIP-ARCHITECTURE-REVIEW-P0`
- Exact parent: `eb17607371f8ea30ce6fcfa6d2c8380fb8920b05`
- Mode: Architecture Review only
- Runtime / Page / Store / Schema / Gate implementation changes: `0`
- Push: `HOLD`

## 2. Verdict

**A. APPLICATION READY — NARROW ATOMIC FORMAL CONSUMER LIFECYCLE CORRECTIVE REQUIRED**

The canonical Relationship Authority, transaction, store topology, recovery adapter and persisted aggregate are valid and remain frozen. The release blocker is a formal Consumer lifecycle ownership defect.

The confirmed Relationship can be read from canonical persistence, but the formal Genesis page does not attempt that read until page-local First Encounter presentation state has been rebuilt. A reload therefore returns the user to discovery and recognition even when `COMPANIONSHIP_CONFIRMED` already exists.

This is not a missing record, a failed write, an Identity defect or permission to broaden Authority. One atomic Consumer cutover can correct it without changing DB, Store, Index, schema, aggregate, command, receipt, Naming or Reality.

## 3. Release evidence and earliest typed break

The Product Release Acceptance journey completed:

`Launch → Birth coordinate → Genesis → 开始寻找 → 认出 → 确认同行 → Relationship saved`

The visible confirmation reported that the relationship was safely saved. After an ordinary reload of `/genesis`, however, the user returned to `开始寻找远方生命` and then `认出这个生命` instead of the confirmed Relationship completion state.

The earliest typed break is in `GenesisProductionExperiencePage`:

1. `XinmaiLifeCompanionRelationshipActivationSurface` is the only mounted Consumer that calls canonical recovery.
2. That surface is mounted only when `relationshipActivationPrerequisitesReady`, `recognizedIdentityResult` and `firstEncounterVisualOutcomeResult` are all non-null.
3. `relationshipActivationPrerequisitesReady` depends on page-local recognition and response-settling state.
4. `firstEncounterVisualOutcomeResult` depends on the visible recognition continuity of the current mount.
5. route/source initialization explicitly resets recognition and discovery state.
6. canonical Relationship recovery is therefore downstream of replaying First Encounter presentation.

The existing activation Gate asserts only that the activation surface source contains `recoverXinmaiLifeCompanionCanonicalRelationship`. It does not prove that the recovery Consumer mounts before local recognition prerequisites, nor that reload selects the canonical returning state. The Gate produces a false-positive release signal for this lifecycle case.

The previous Phase 2 report also stated the weaker fact: after reload **and returning through the visible recognition flow**, the same relationship recovered. That is idempotent record recovery, not correct formal lifecycle recovery.

## 4. Facts that remain accepted

### 4.1 Canonical Relationship Authority

The unique mutation owner remains:

`XinmaiLifeCompanionRelationshipAuthorityController`

It alone may execute `CONFIRM_COMPANIONSHIP` and write the canonical aggregate and command fence.

### 4.2 Canonical persistence

- Database: `xinmai-life-companion-canonical`
- Physical version: `1`
- Store: `life-companion-relationship`
- Store: `life-companion-command-fence`
- Canonical state: `COMPANIONSHIP_CONFIRMED`
- explicit confirmation remains required
- Relationship remains identity-bound and receipt-bound
- no third Store
- no backfill
- no current-protocol reinterpretation

### 4.3 Recovery semantics

`XinmaiLifeCompanionCanonicalRecoveryAdapter` remains the canonical read boundary:

- available valid aggregate → `READY`
- missing aggregate → `NOT_ESTABLISHED`
- corrupt, mismatched or unavailable evidence → typed `BLOCKED`

Identity, Naming, Life Whisper and Reality Intent cannot be interpreted as Relationship evidence.

### 4.4 First Encounter evidence

The typed visual response cycle and outcome remain required only when creating the first canonical Relationship. They are already bound inside an existing aggregate and receipt. They are not prerequisites for reading and presenting a confirmed Relationship after reload.

## 5. Ownership decision

### 5.1 Unique formal lifecycle owner

Introduce one read-only typed lifecycle owner at the formal Genesis boundary:

`XinmaiLifeCompanionRelationshipLifecycleResolver`

The name is normative; implementation may use an equivalent name only if the ownership remains singular and explicit.

It owns **which Relationship lifecycle surface is selected**, not the Relationship fact itself. It must:

1. consume the authorized Genesis source and its exact existing Identity projections;
2. validate `sourceReferenceId`, Star Beast identity reference and mansion coordinate reference;
3. call the existing canonical recovery adapter before page-local discovery/recognition is allowed to select a Relationship surface;
4. return one discriminated lifecycle result;
5. reject late results whose exact source/identity key no longer matches the mounted journey.

It must not write, infer, backfill, navigate, create Reality, create Naming or synthesize First Encounter evidence.

### 5.2 Consumer responsibilities

| Component | Frozen responsibility |
| --- | --- |
| Identity Authority / existing formal projection | owns the exact identity references; read-only input |
| Relationship Lifecycle Resolver | owns read-only lifecycle selection before First Encounter presentation |
| Canonical Recovery Adapter | owns canonical Relationship read interpretation |
| Relationship Activation Surface | presents first confirmation and submits the existing typed command only when lifecycle is `FIRST_ENCOUNTER_REQUIRED` |
| Relationship Authority Controller | unique mutation and idempotency owner |
| Genesis Page | renders the typed lifecycle result; no direct Store access and no Relationship inference |
| Renderer / motion | atmosphere and First Encounter presentation only; never lifecycle evidence |

### 5.3 Identity reference boundary

The current recognized-identity adapter unnecessarily requires a page-local presence visual realization even though the stable Relationship identity references come from the formal Consumer source projection bundle.

The corrective must provide a read-only identity-reference path that is independent of recognition animation while preserving exact source matching. It may reuse a shared validator, but it must not declare visual presence to be Identity Authority.

## 6. Frozen lifecycle result contract

The lifecycle resolver must return a discriminated result equivalent to:

| Result | Current fact | Formal Consumer action |
| --- | --- | --- |
| `RESOLVING_IDENTITY` | exact identity input not resolved yet | show bounded loading; no discovery action |
| `RECOVERING_RELATIONSHIP` | identity is exact; canonical read pending | show bounded recovery; no discovery or confirm action |
| `RETURNING_COMPANIONSHIP_CONFIRMED` | valid canonical Relationship exists | render confirmed Relationship terminal surface immediately; do not replay discovery/recognition |
| `FIRST_ENCOUNTER_REQUIRED` | canonical record is genuinely absent | allow existing discovery → recognition → explicit confirm flow |
| `RETRYABLE_RECOVERY_BLOCKED` | storage is temporarily unavailable/blocked/failed/aborted | show real retry for canonical read; do not pretend Relationship is absent |
| `PROTECTIVE_STOP` | identity mismatch, corruption or other non-retryable failure | preserve assets and stop; no confirm, no fallback, no Reality |

The exact public type may split loading states, but it must preserve these facts and exclusions.

## 7. State transition matrix

| Starting condition | Required result | Forbidden behavior |
| --- | --- | --- |
| new exact Identity, no Relationship | `FIRST_ENCOUNTER_REQUIRED` | auto-confirm, infer from Identity/Naming/Whisper |
| confirmed Relationship, same identity, reload | `RETURNING_COMPANIONSHIP_CONFIRMED` | replay `开始寻找` or `认出` |
| confirmed Relationship, browser back/forward | same returning result | page-local state deciding canonical truth |
| confirmed Relationship, reopen in a new tab | same returning result | duplicate confirmation UI |
| canonical read pending | recovery loading | exposing First Encounter action early |
| retryable storage failure | retryable recovery surface | mapping to `NOT_ESTABLISHED` |
| corrupt or mismatched aggregate | protective stop | legacy fallback or new confirmation |
| source changes during read | discard stale result; recover exact new identity | displaying old identity Relationship |
| another tab confirms after local `NOT_ESTABLISHED` | controller returns committed/already committed; surface converges to returning state | duplicate aggregate or second receipt |
| Reduced Motion | same lifecycle fact | changing Relationship existence or identity |

## 8. Formal presentation decisions

For `RETURNING_COMPANIONSHIP_CONFIRMED`, the user should see the already-established relationship as the current fact. The surface may offer a bounded next step only if that next step belongs to an independently approved phase. In this corrective:

- Naming remains deferred and optional;
- Life Whisper remains deferred;
- Reality remains deferred;
- there is no automatic navigation;
- there is no request to reconfirm companionship;
- the First Encounter cinematic must not replay as if it were canonical work.

For `FIRST_ENCOUNTER_REQUIRED`, the current First Encounter flow and explicit `确认同行` command remain unchanged.

## 9. Atomic corrective boundary

The next Candidate must switch these together:

1. add the unique read-only lifecycle resolver and typed results;
2. resolve exact Identity references before local First Encounter state;
3. mount canonical recovery at the formal Genesis lifecycle boundary;
4. render returning, first-encounter, retryable and protective states from that result;
5. prevent discovery/recognition/confirmation surfaces while recovery is unresolved or already confirmed;
6. retain the existing Authority Controller and transactional Store unchanged;
7. modernize the activation Gate so it proves reachability and ordering, not source-string presence;
8. add direct recovery tests for reload, back/forward, reopen, multitab convergence, stale source and failure states;
9. prove a clean hashed Production reload restores the confirmed terminal surface without replay.

The cutover must be atomic. A second formal recovery presenter or a direct page-to-Store read is forbidden.

## 10. Counter contract

If a direct-child Forward Counter is required, it may change exactly one formal lifecycle policy:

`LIFE_COMPANION_RELATIONSHIP_FORMAL_RECOVERY_CONSUMER: ENABLED → SAFE_WITHHELD`

The Counter must still read and preserve canonical Relationship facts. Its safe presenter must never downgrade `READY` to `NOT_ESTABLISHED`, expose duplicate confirmation, delete assets, relax validation or re-enable the old replay-as-recovery path.

## 11. Required Gates and acceptance evidence

### Direct Gates

- valid canonical Relationship selects returning state before any First Encounter prerequisite;
- missing record alone selects first encounter;
- visual realization is not required for returning recovery;
- retryable read failure cannot select first encounter;
- mismatch/corruption cannot select first encounter;
- stale source result is ignored;
- multitab late confirmation converges through `ALREADY_COMMITTED`;
- old source-string-only recovery assertion is retired or modernized.

### Production acceptance

1. complete `Identity → First Encounter → Relationship` once;
2. verify one canonical relationship and one command outcome;
3. reload `/genesis` normally;
4. observe the confirmed Relationship surface without clicking discovery or recognition;
5. repeat through back, forward, reopen and second tab;
6. verify no duplicate record, no new receipt, no Naming, no Life Whisper and no Reality Intent;
7. verify application warning/error count remains zero.

## 12. Scope exclusions

This review does not authorize:

- Relationship schema or DB migration;
- a second Relationship Authority or Store;
- Identity derivation changes;
- Naming activation;
- Life Whisper activation;
- Reality Intent creation or navigation;
- Growth, Pressure Seed, Gravity, Choice, Crystal, Body or Archive changes;
- visual refinement unrelated to lifecycle truth;
- push, merge, promotion tag or Phase closure.

## 13. Release decision

The current Candidate is **not Product Release acceptable** because canonical saved truth is not the owner of the returning formal Genesis surface.

Authority Ownership is otherwise clear. The team should remain in Product Release mode after this narrow corrective; Architecture Review need not repeat unless the implementation attempts to broaden Authority, persistence or ownership.

## 14. Exact next knife

`XINMAI-1.0-LIFE-COMPANION-RELATIONSHIP-CANONICAL-RECOVERY-FORMAL-CONSUMER-LIFECYCLE-ATOMIC-CORRECTIVE-P0`

Expected parent: this Architecture Review commit.

After that Candidate passes direct Gates and independent Production E2E, return to:

`Product Release Acceptance → Mainline Promotion Decision → Promotion Tag → Phase 2 CLOSED`
