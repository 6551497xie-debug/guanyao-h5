# XINMAI 1.0 Post-Ownership Completed Return Target Pre-Gravity Terminalization Authority Migration Re-audit P0

## 0. Audit verdict

```text
Blade:
XINMAI-1.0-POST-OWNERSHIP-COMPLETED-RETURN-TARGET-
PRE-GRAVITY-TERMINALIZATION-AUTHORITY-MIGRATION-RE-AUDIT-P0

Traffic light: RED / AUDIT ONLY
Expected Parent: 6662bc5f8294b1760a26fa29ddcdb16d585c841f
Runtime / Store / Schema / Page / Gate diff: 0
Push: HOLD

Decision:
PRE-GRAVITY COMPLETED-RETURN TERMINALIZATION
AUTHORITY CONTRACT READY FOR STRICT ATOMIC APPLICATION
```

The completed first-cycle Return target is allowed to end before Gravity when—and
only when—canonical Growth evidence proves that the target Return lineage already
produced a qualifying Lived Fact, consumed Eligibility, one Formation Receipt, one
canonical Crystal projection and one canonical Body Imprint. A Gravity admission is
not a prerequisite for this completed-growth transition and must not be synthesized.

The single legal owner is a narrowly typed completed-Return extension of
`XinmaiRealityAdventureLifecycleReconciliationController`, executed by the existing
`xinmai-reality-adventure-continuity` transactional writer. The page may issue a
typed command, but it cannot mutate lifecycle state or infer completion.

The existing terminalizer already supports `gravityAdmission = null`, emits
`TERMINAL / START_NEW_ENCOUNTER`, releases `activeIdentityKey`, and preserves the
historical record. The missing contract is the proof-bound eligibility/state matrix
and its resumable next-Intent coordination—not a new Store, schema, Admission or
Authority.

---

## 1. Audit boundary and preserved rejected implementation

This audit was created in a separate clean worktree at the exact parent. The
provisional Runtime worktree and its uncommitted changes were neither continued,
committed, reset nor deleted. This document is the only audit change.

Evidence used here is repository source, types, validators and transaction paths.
No browser state, Fixture, Acceptance query, manual Storage, backfill, route state,
DOM, animation, timer or repeated click was used as Authority.

## 2. Exact earliest typed break

The canonical Return Intent creates a target Reality Adventure whose valid states
include:

```text
REALITY_PENDING
REALITY_ACTIVE
PRESSURE_RECOGNIZED
GRAVITY_ADMITTED
ACTIVE_IN_GRAVITY
TERMINAL
```

The target may legitimately remain `REALITY_PENDING` with
`gravityAdmission = null` while the Lived Response and Formation chain completes.
The persisted Reality validator explicitly accepts that combination.

The current public reconciliation command is
`reconcileXinmaiChoiceExplicitDeparture()`. It requires both:

```text
record.gravityAdmission !== null
record.lifecycle in { GRAVITY_ADMITTED, ACTIVE_IN_GRAVITY }
```

Therefore a completed Return target at `REALITY_PENDING`, `REALITY_ACTIVE` or
`PRESSURE_RECOGNIZED` has no legal command that can reach the already capable
terminalizer. The typed break is:

```text
COMPLETED_RETURN_PROOF_READY
→ COMPLETED_RETURN_TARGET_RECONCILIATION_COMMAND_MISSING
→ ACTIVE_IDENTITY_KEY_REMAINS_OWNED
→ FRESH_INTENT_REQUEST_SEES_ACTIVE_ENCOUNTER
→ old TERMINAL Intent is reused by the consumer
→ INTENT_STATE_NOT_ADMISSIBLE / ADMISSION_NOT_READY
```

Admission is behaving correctly. Creating a synthetic Gravity admission would
manufacture history and is forbidden.

## 3. Completion proof eligibility

### 3.1 Required immutable proof bundle

A command is eligible only when a read-only proof adapter finds exactly one lineage
in the canonical Lived Growth envelope and every reference below agrees:

| Proof | Required state and binding |
|---|---|
| Identity | all three identity references equal across Reality record, Choice, Return, Fact, Eligibility, Formation and Body projection |
| Choice | exact committed Choice reference; target Encounter equals the Return target; Choice has not been withdrawn, superseded or rebound |
| Departure | canonical Departure Receipt and its reconciliation are current for the same Choice/source encounter |
| Return target | Return Receipt is `CONSUMED_BY_FACT`; target Encounter and `realityProof.realityIntentReferenceId` equal the record being terminalized |
| Lived response | one `CONFIRMED` Fact; outcome is `ATTEMPTED`, `COMPLETED_AS_INTENDED` or `CHANGED_RESPONSE` |
| Eligibility | exact Fact-bound Eligibility is `CONSUMED`; `consumedByFormationReferenceId` equals the Formation Receipt |
| Formation | exactly one `FORMED` Receipt; identity, Choice, Fact, eligibility revision, formation and Crystal references all agree |
| Crystal | canonical projection exists and is byte/semantic consistent with the Formation Receipt; formed Crystal is `CRYSTALLIZED` |
| Body Imprint | deterministic canonical projector returns `IMPRINT_AVAILABLE`; its focused imprint binds the same Formation/Crystal/Choice lineage |
| Ownership | read-only presentation must be `FORMATION_CONFIRMED`, `OWNERSHIP_PRESENTED` or `RECOVERED_EXISTING`, with `successAuthority = IDB_TRANSACTION_COMPLETE`; it is corroborating presentation, never completion Authority |
| Archive | canonical Body/Formation lineage must remain readable; Archive page availability is a postcondition/read surface, not a mutation precondition |

The proof bundle must also carry the observed Lived Growth envelope revision and the
Reality record's expected canonical revision/fencing token. It must be read again or
validated inside the Reality transaction decision before mutation.

### 3.2 Explicit non-qualifiers

The following never qualify:

- `NOT_ATTEMPTED`, `UNABLE_TO_CONTINUE`, `USER_REJECTED_RECORD`/declined;
- Return Receipt `READY_FOR_LIVED_RESPONSE` or `RESOLVED_WITHOUT_FACT`;
- Fact absent, not `CONFIRMED`, superseded or revoked;
- Eligibility `WITHHELD`, `ELIGIBLE`, `FORMATION_PENDING` or invalidated;
- Formation absent, pending, retryable, duplicate or mismatched;
- Crystal presentation without canonical Formation transaction completion;
- Ownership touch/animation or Archive route availability alone;
- route, page, DOM, timer, renderer, local counter or user report.

`NOT_ATTEMPTED` and declined paths keep their existing no-Fact/no-Crystal target
termination policy. They are not aliases for completed-growth reconciliation.

## 4. Frozen target-state matrix

The matrix assumes the full proof bundle in §3 is exact. `REJECT` always means
fail closed with no mutation. `ALREADY_RECONCILED` requires the exact same identity,
target, proof digest and terminal reason.

| Target Reality lifecycle | Gravity admission | Decision | Exact rule / reason |
|---|---|---|---|
| `REALITY_PENDING` | `null` | **ALLOW** | valid completed-growth Return target; pre-Gravity termination is legal; no synthetic Admission |
| `REALITY_ACTIVE` | `null` | **ALLOW** | target may have been admitted to Reality but never entered Gravity; completed proof outranks route progress, not Authority history |
| `REALITY_ACTIVE` | present | **REJECT** | persisted invariant conflict: Gravity continuity cannot coexist with `REALITY_ACTIVE`; `TARGET_CONTINUITY_CORRUPTED` |
| `PRESSURE_RECOGNIZED` | `null` | **ALLOW** | recognition remains immutable/readable; it is terminalized with outer record, not consumed by a fabricated Gravity transfer |
| `PRESSURE_RECOGNIZED` | present | **REJECT** | persisted invariant conflict; `TARGET_CONTINUITY_CORRUPTED` |
| `GRAVITY_ADMITTED` | present and current | **ALLOW** | terminalize the existing Gravity admission as `START_NEW_REALITY_ENCOUNTER` in the same Reality transaction |
| `ACTIVE_IN_GRAVITY` | present and current | **ALLOW** | same as above; no new Gravity fact is inferred |
| `GRAVITY_ADMITTED` or `ACTIVE_IN_GRAVITY` | `null` | **REJECT** | required persisted Gravity lineage missing; `GRAVITY_ADMISSION_MISSING` |
| any non-terminal state | any | **REJECT** | proof absent/not unique/mismatched, non-qualifying outcome, incomplete Formation or Body mismatch |
| `TERMINAL / START_NEW_ENCOUNTER` | `null` or exact already-terminal Gravity admission | **ALREADY_RECONCILED** | exact proof digest/target/identity matches and `activeIdentityKey` is absent |
| `TERMINAL` with another reason | any | **REJECT** | `TERMINAL_REASON_CONFLICT`; never reinterpret an old terminal record |

### 4.1 Gravity recognized / Choice committed clarification

- An existing valid Gravity admission is terminalized only when the completed proof
  targets that exact Return cycle.
- A target-cycle Choice by itself is not completion. If the target already contains
  a newer unresolved Choice, the old first-cycle proof cannot terminalize it:
  `TARGET_HAS_UNRESOLVED_CHOICE`.
- If that newer Choice has its own complete proof bundle, it is a different command
  and proof lineage; it may be evaluated independently.
- Pre-Gravity terminalization is a valid **completed-growth lifecycle** transition.
  It does not require a prior Reality Admission or Gravity Admission transition.

## 5. Single legal owner and consumers

### 5.1 Owner decision

```text
Public command owner:
XinmaiRealityAdventureLifecycleReconciliationController
  .reconcileCompletedReturnTargetForNextEncounter(...)

Canonical writer:
xinmaiRealityAdventureContinuityTransactionalStore

Shared mutation primitive:
terminalizeXinmaiRealityAdventureLifecycleRecord(...)
```

This is a narrowly typed extension of the existing lifecycle reconciliation owner:

- the generic Intent terminalizer is too broad and cannot authorize Growth proof;
- `XinmaiGravityEntryAdmissionController` cannot own a transition where Gravity may
  legitimately be absent;
- Reality Admission must remain a strict reader/guard and must not repair lifecycle;
- the page owns only an explicit typed command and Presentation state.

`UNKNOWN owner/consumer = 0` for the production path.

### 5.2 Consumer matrix

| Layer | Responsibility after application |
|---|---|
| Lived Growth proof adapter | read-only unique proof bundle; never writes Reality |
| Lifecycle reconciliation controller | validates proof/state and decides exact terminal mutation |
| Reality continuity transaction | atomic terminalization, optional Gravity terminalization, key release and history retention |
| Next-cycle coordinator | runs the resumable saga and delegates fresh request to existing Intent Controller |
| Reality Encounter Intent Controller | creates or recovers exactly one fresh Intent/Encounter after release |
| Admission | accepts only the fresh admissible Intent; old terminal Intent remains rejected |
| Return/Ownership/Archive consumer | emits command; consumes typed result; no local lifecycle or Storage compensation |
| Presentation resolver | maps cause/retryability; never changes Authority result |

## 6. Persisted semantics and schema decision

The successful terminal transition is:

```text
Reality Intent:
  TERMINAL / START_NEW_ENCOUNTER

Outer Reality Adventure:
  TERMINAL / START_NEW_ENCOUNTER

Optional existing Gravity Admission:
  TERMINAL / START_NEW_REALITY_ENCOUNTER

activeIdentityKey:
  released only when the Reality IDB transaction completes
```

When Gravity is absent, it remains `null`; no admission, transfer or observation is
created. Recognition, Candidate, Intent, Encounter, Return target and all first-cycle
Growth assets remain immutable and readable in their existing records.

```text
Reality DB version: 0 change
Growth DB version:  0 change
Store:              0 new / 0 changed
Index:              0 new / 0 changed
Persisted schema:   0 change
Backfill/rewrite:   forbidden
```

The existing terminal fields and retained-record transaction behavior are sufficient.
The completed-proof digest and command result are ephemeral verification data; they
must not be persisted as a second Authority.

## 7. Transaction and resumable saga decision

Growth proof and Reality continuity live under separate database authorities. The
system must not claim one cross-DB transaction. The legal coordination is a
proof-bound resumable saga:

```text
S0 read immutable completed-growth proof
S1 Reality transaction:
   reread exact target + validate revision/fence/proof
   terminalize target (+ optional Gravity admission)
   release activeIdentityKey
   retain old record
S2 publish RECONCILED or ALREADY_RECONCILED
S3 existing Intent Controller requests fresh cycle
S4 exact activeIdentityKey winner is CREATED / ALREADY_CURRENT
S5 navigate only with the fresh Intent/Encounter
```

The existing terminal state is the canonical fence for S1. The existing unique
`activeIdentityKey` index plus exact request-proof comparison is the canonical fence
for S3. No new command-fence Store is required.

### 7.1 Idempotency and concurrency

- **Same command replay:** identical target/proof returns `ALREADY_RECONCILED`; no
  revision increment and no second fresh cycle.
- **Refresh/Back/Forward:** recover S0/S1/S3 from canonical readers. Old route state
  never authorizes old Intent reuse.
- **Late old tab:** stale revision/fence or terminal history returns exact stale/
  already result; it cannot reopen or overwrite the target.
- **Two reconciliation tabs:** one Reality transaction commits; the other rereads
  the exact terminal winner and returns `ALREADY_RECONCILED`.
- **Two fresh-request tabs:** unique active identity admits one winner; the loser may
  return `ALREADY_CURRENT` only after exact identity/origin/qualification/source
  proof comparison. Constraint error alone is not success.
- **Abort/blocked/quota/closed connection:** no key release is reported unless the
  transaction completes; typed retryability remains Authority-owned.
- **Corruption:** non-retryable fail closed; no partial fresh Intent.
- **Crash after S1 before S3:** result is derived as
  `RECONCILED_AWAITING_FRESH_INTENT`; retry skips mutation and resumes S3.
- **Crash after S3 before navigation:** recover the exact active Intent and navigate
  with that one reference.

## 8. Public typed contract and retryability

The future application should expose an ephemeral contract equivalent to:

```ts
type CompletedReturnNextCycleResult =
  | {
      status:
        | "RECONCILED_AWAITING_FRESH_INTENT"
        | "FRESH_INTENT_READY"
        | "ALREADY_CURRENT";
      targetEncounterCycleId: string;
      freshIntentReferenceId: string | null;
      freshEncounterCycleId: string | null;
      retryability: "NOT_NEEDED";
      cause: null;
    }
  | {
      status: "SAFE_WITHHELD";
      targetEncounterCycleId: string | null;
      freshIntentReferenceId: null;
      freshEncounterCycleId: null;
      retryability: "RETRYABLE" | "NON_RETRYABLE";
      cause: CompletedReturnNextCycleCause;
    };

type CompletedReturnNextCycleCause = Readonly<{
  stage:
    | "COMPLETION_PROOF"
    | "TARGET_RECONCILIATION"
    | "FRESH_INTENT_REQUEST";
  reason:
    | "PROOF_UNAVAILABLE"
    | "PROOF_NOT_UNIQUE"
    | "PROOF_MISMATCH"
    | "LIVED_RESPONSE_NOT_QUALIFYING"
    | "FORMATION_INCOMPLETE"
    | "BODY_IMPRINT_MISMATCH"
    | "TARGET_NOT_FOUND"
    | "TARGET_STATE_NOT_ELIGIBLE"
    | "TARGET_HAS_UNRESOLVED_CHOICE"
    | "TARGET_CONTINUITY_CORRUPTED"
    | "GRAVITY_ADMISSION_MISSING"
    | "TERMINAL_REASON_CONFLICT"
    | "STALE_REVISION"
    | "TRANSACTION_STORAGE_UNAVAILABLE"
    | "TRANSACTION_OPEN_BLOCKED"
    | "TRANSACTION_ABORTED"
    | "TRANSACTION_CONNECTION_CLOSED"
    | "WRITE_UNCONFIRMED"
    | "UNIQUE_CONSTRAINT_REJECTED"
    | "FRESH_INTENT_WINNER_NOT_VISIBLE"
    | "FRESH_INTENT_PROOF_MISMATCH"
    | "MUTATION_PAUSED";
  innerCause: unknown | null;
}>;
```

Repository naming may be normalized during application, but semantics are frozen:

- inner cause is immutable and carried through every outer stage;
- retryability comes from the failing Authority, never from the button;
- storage blocked/abort/unconfirmed/winner-not-visible may be retryable;
- proof mismatch, non-qualifying outcome, corrupt state, terminal conflict and
  unresolved newer Choice are non-retryable;
- a retryable S3 failure retries fresh Intent creation, not S1 terminalization;
- Presentation never exposes a fake retry or navigates with the old terminal Intent.

## 9. Forward SAFE_WITHHELD Counter

The direct-child Counter must change exactly one policy:

```text
POST_OWNERSHIP_NEXT_CYCLE_NEW_MUTATION:
ENABLED → SAFE_WITHHELD
```

It pauses new completed-Return terminalization and fresh-Intent creation before S1.
It preserves:

- the completed first cycle and all existing six-dimension, Choice, Fact, Formation,
  Crystal, Ownership, Body and Archive assets;
- any target already reconciled before Counter activation;
- any fresh next cycle already formed, as read-only recoverable state;
- strict Admission and unique active-identity ownership.

It must not reuse the old Intent, relax Admission, delete records, restore a second
owner or roll back already committed lifecycle state.

## 10. Future strict atomic application scope

Allowed file categories only:

1. typed completed-Return proof/command/result contract;
2. read-only completed-growth proof adapter;
3. narrowly typed extension in
   `XinmaiRealityAdventureLifecycleReconciliationController`;
4. existing Reality continuity transaction consumption (no schema change);
5. next-cycle coordinator using existing `RealityEncounterIntentController`;
6. one policy switch and direct-child Counter;
7. Return/Ownership/Archive consumer command wiring;
8. one read-only Presentation resolver/accessibility feedback;
9. directly related Gates and package registration.

Forbidden in the application:

- DB version, Store, Index or persisted schema changes;
- Admission relaxation or synthetic Gravity admission;
- a generic/page-local terminalizer, Storage compensation or second Authority;
- first-cycle asset rewrite/backfill/current reinterpretation;
- six-dimension semantics/rhythm, Catalog 450, Birth, Identity, Relationship,
  Choice, Formation, Crystal or Body Authority changes;
- visual redesign, AI, Audio, Haptic or Phase 4.

## 11. Application acceptance matrix

The next Runtime knife must prove on a clean hashed Production origin:

1. complete first cycle remains exactly one Receipt, Choice, Fact, Formation,
   Crystal and Body Imprint; Archive remains readable;
2. each allowed pre-Gravity state in §4 terminalizes once with exact proof;
3. no Gravity admission is fabricated when it was absent;
4. new Intent/Encounter references differ from the old target and identity is equal;
5. old Intent remains terminal/read-only and strict Admission continues to reject it;
6. new cycle reaches Candidate Delivery/Reality Admission legally;
7. duplicate click, refresh, Back/Forward, late tab and true concurrent tabs produce
   one active next cycle;
8. crash between reconciliation and request resumes S3 without duplicating S1;
9. transaction failure/corruption preserves inner cause and correct retryability;
10. merely starting the next cycle creates no new Fact/Crystal/Body Imprint;
11. 390×844 and 320×568 action/status are reachable and accessible;
12. TypeScript, Production Build, full registered Gates, bundle hygiene and runtime
    errors all pass; DB/Store/Schema diff remains zero.

## 12. Next knife recommendation

```text
NEXT:
XINMAI-1.0-POST-OWNERSHIP-COMPLETED-RETURN-TARGET-
PRE-GRAVITY-TERMINALIZATION-AND-FRESH-INTENT-
PROOF-BOUND-RESUMABLE-SAGA-ATOMIC-CORRECTIVE-P0

Traffic light: RED / STRICT ATOMIC APPLICATION
Expected Parent: this docs-only Audit Candidate
Candidate: local / Push HOLD
Counter: direct child / local / Push HOLD
```

The Runtime knife must not begin automatically from this audit.
