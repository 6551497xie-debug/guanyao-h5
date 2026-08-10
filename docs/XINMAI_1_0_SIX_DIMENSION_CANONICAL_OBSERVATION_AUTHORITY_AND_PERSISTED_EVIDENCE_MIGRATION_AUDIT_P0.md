# XINMAI 1.0 Six-Dimension Canonical Observation Authority and Persisted Evidence Migration Audit P0

## 0. Decision

```text
B. SPLIT MIGRATION APPLICATION READY

Authority design: FROZEN
Persisted schema design: FROZEN
Runtime / Schema actual diff in this audit: 0
Push: HOLD
```

The existing production surface cannot be corrected truthfully by a Presentation-only change. A canonical, item-level six-dimension record and immutable completion receipt are required. The safest executable migration is split into two ordered Runtime candidates:

1. **Authority foundation:** upgrade the existing Lived Growth IndexedDB to version 3, add the canonical six-dimension Stores, types, controller, reader, validators and gates, while mutation policy remains `SAFE_WITHHELD` and no formal consumer changes.
2. **Atomic consumer activation:** enable V2 six-dimension mutation and atomically switch `/dynamics`, Choice readiness and new Choice persistence to the Receipt-backed path; remove page-derived completion as an Authority input. Its direct child is the Forward `SAFE_WITHHELD` Counter.

The split prevents a database upgrade, a new writer and a consumer cutover from first meeting in one unobserved transaction. Phase 1 is not a second active Authority: it has one canonical Owner and no enabled mutation path. Phase 2 is one atomic product cutover; no partial page, Choice or Receipt activation is permitted.

## 1. Audited baseline and invariants

- exact parent: `869fab5068092b1c2f701c3fcdb316aa287501e6`;
- formal continuity remote-tracking snapshot: `4a6471ebd68a9bd46938decb78d13f0058830bdc`;
- audit branch is one commit ahead of that formal baseline before this document;
- frozen dimension order: `body`, `emotion`, `thought`, `action`, `memory`, `goal`;
- current formal Gravity record schema: `XINMAI_GRAVITY_OBSERVATION_CONTINUITY_V1` with `noSixDimensionAuthority: true`;
- current persisted Choice schemas: `XINMAI_CHOICE_ACTION_INTENTION_V1` and `XINMAI_CHOICE_ACTION_INTENTION_V2`;
- current Lived Growth database: `xinmai-lived-growth-canonical`, version `2`.

This audit does not alter Pressure Catalog 450, Birth, Identity, Relationship, Crystal, Growth or Body semantics. It does not authorize AI, Audio, Haptic, visual refinement, scoring, personality profiling, reports or Phase 4.

## 2. Unique Owner decision

### 2.1 Canonical ownership

The single canonical owner shall be:

| Responsibility | Frozen owner |
| --- | --- |
| Aggregate type | `src/types/xinmaiSixDimensionObservation.ts` |
| Command/result contract | `src/types/xinmaiSixDimensionObservation.ts` |
| Writer/controller | `src/services/xinmaiSixDimensionObservationAuthorityController.ts` |
| Canonical transaction implementation | `src/services/xinmaiLivedGrowthTransactionalStore.ts` |
| Reader/recovery | `src/services/xinmaiSixDimensionObservationRecoveryAdapter.ts` |
| Deterministic digest/validation | `src/services/xinmaiSixDimensionObservationEvidenceValidator.ts` |
| Mutation policy | `src/services/xinmaiSixDimensionObservationRuntimePolicy.ts` |
| Presentation mapping | `src/services/xinmaiSixDimensionObservationPresentationResolver.ts` |
| Production page consumer | `src/pages/GravityPage.tsx`, read-only projection of the Resolver |

Only `xinmaiSixDimensionObservationAuthorityController` may issue observation mutations. It delegates one IndexedDB transaction to `xinmaiLivedGrowthTransactionalStore`; neither the Store nor the page invents product outcomes.

### 2.2 Database decision

Reuse and version-upgrade `xinmai-lived-growth-canonical`; do not create a second database.

Reasons:

- Gravity Observation Continuity already lives in this database;
- Choice commit already coordinates the Gravity record and canonical Growth envelope in one IndexedDB transaction;
- the Completion Receipt must be validated in the same transaction that creates a new Choice and marks Gravity consumed;
- a separate Reality database or new database would make that boundary cross-database and therefore non-atomic;
- the new aggregate belongs between Gravity recognition and Choice, not inside the earlier Reality Pressure lifecycle.

The database container is reused, but the six-dimension record is a separate Authority with dedicated Stores. It is not appended to the Growth envelope and does not give Growth or Crystal ownership of observation semantics.

Forbidden owners:

- `GravityPage` React state;
- `localStorage` or `sessionStorage`;
- animation/runtime engine phase;
- `completedNodeCount` or `completedDimensionIds`;
- accessibility DOM mirrors;
- AI, dialogue or Persona projection assets.

Production consumers traced and classified in section 11. UNKNOWN consumers: `0`.

## 3. Canonical aggregate contract

### 3.1 Frozen revisions

```ts
type SixDimensionProtocolRevision =
  "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2";

type SixDimensionObservationSchemaVersion =
  "XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2";

type SixDimensionCompletionReceiptSchemaVersion =
  "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V1";
```

`V2` names the first canonical six-dimension path. The previous page-derived era is legacy/non-canonical and must never be parsed or backfilled as a persisted V1 aggregate.

### 3.2 Dimension and item state

```ts
type SixDimensionId =
  | "body"
  | "emotion"
  | "thought"
  | "action"
  | "memory"
  | "goal";

type SixDimensionItemState =
  | "PENDING"
  | "OBSERVED"
  | "SKIPPED"
  | "DECLINED"
  | "UNAVAILABLE";

type SixDimensionTypedAcknowledgement =
  | "IMPACT_RECOGNIZED_PRESENT"
  | "IMPACT_RECOGNIZED_ABSENT"
  | "IMPACT_RECOGNIZED_UNCERTAIN";
```

All three acknowledgement values represent a real observation window. They do not score, diagnose or require the user to say an impact is present. Only `OBSERVED` with one of these typed acknowledgements qualifies toward completion.

### 3.3 Proposed persisted item

```ts
type CanonicalSixDimensionObservationItem = Readonly<{
  dimensionId: SixDimensionId;
  ordinal: 1 | 2 | 3 | 4 | 5 | 6;
  state: SixDimensionItemState;
  sourceReferenceId: string;
  outcomeReferenceId: string | null;
  acknowledgement: SixDimensionTypedAcknowledgement | null;
  itemRevision: number;
  committedByCommandReferenceId: string | null;
  presentedAt: null; // presentation alone is not persisted evidence
  observedAt: string | null;
  updatedAt: string;
  terminalReason: "USER_DECLINED" | "SOURCE_UNAVAILABLE" | null;
}>;
```

`sourceReferenceId` is deterministically derived from the observation set, dimension protocol revision, selected Pressure Seed and dimension ID. It does not reference private prose. `outcomeReferenceId` is deterministically derived by the Authority from observation set, dimension ID, item revision and committed command reference.

### 3.4 Proposed observation set

```ts
type CanonicalSixDimensionObservationSet = Readonly<{
  schemaVersion: "XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2";
  observationSetId: string;
  canonicalLineageKey: string;
  identityKey: string;
  identityReferences: RealityEncounterIdentityReferences;
  encounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  pressure: Readonly<{
    runtimeSeedId: string;
    candidateReferenceId: string;
    catalogRevision: string;
  }>;
  dimensionProtocolRevision:
    "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2";
  dimensionOrder: readonly [
    "body", "emotion", "thought", "action", "memory", "goal"
  ];
  items: readonly CanonicalSixDimensionObservationItem[];
  lifecycle: "OPEN" | "COMPLETED" | "CONSUMED_BY_CHOICE" | "TERMINAL";
  revision: number;
  lastCommittedCommandReferenceId: string | null;
  contentDigest: string;
  evidenceDigest: string | null;
  completionReceiptReferenceId: string | null;
  createdAt: string;
  updatedAt: string;
  committedAt: string | null;
  provenance: Readonly<{
    authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY";
    explicitUserAcknowledgementRequired: true;
    noRawWhisperPersistence: true;
    noPrivateFreeTextPersistence: true;
    noChoiceAuthority: true;
    noCrystalAuthority: true;
    noRendererAuthority: true;
  }>;
}>;
```

`identityKey` is the canonical ordered composition of `sourceReferenceId`, `starBeastIdentityReferenceId` and `mansionCoordinateReferenceId`. `canonicalLineageKey` additionally binds encounter cycle, Gravity cycle, Runtime Seed ID, Catalog revision and dimension protocol revision. Exactly one active observation set may exist per lineage key.

### 3.5 Digest rules

- canonical JSON uses fixed property order, UTF-8 and no locale-dependent formatting;
- `contentDigest` binds schema/protocol revisions, identity/encounter/gravity references, Pressure Seed/revision and the six ordered source references;
- `evidenceDigest` binds the content digest plus the six ordered item states, item revisions, outcome references and typed acknowledgements;
- SHA-256 is the only digest algorithm for this revision;
- timestamps are excluded from the evidence digest but remain persisted audit facts;
- no surface copy, whisper text or private free text enters either digest.

Digest mismatch is corruption and fails closed. A digest is evidence integrity, not an ID substitute.

## 4. Item outcome protocol

### 4.1 What creates an observation

One item becomes `OBSERVED` only when all of these are true:

1. a canonical observation set is current and matches identity, encounter, Gravity, Pressure Seed, Catalog revision and protocol revision;
2. the Presentation Resolver exposes the canonical item source reference;
3. the user performs a dimension-specific explicit acknowledgement action;
4. the command names exactly one dimension and one typed acknowledgement;
5. expected set revision and expected item revision match inside the transaction;
6. the Authority commits the item and returns its persisted outcome reference.

The following never create an observation:

- `PRESENTED`;
- entering `/dynamics`;
- page visibility or dwell time;
- animation start/end;
- runtime `enginePhase`;
- completing six inner visual nodes;
- Gravity recognition recovery;
- an accessibility mirror announcing a label;
- a batch command covering more than one dimension.

### 4.2 Non-observed outcomes

| Outcome | Meaning | Persisted? | Completes item? | Recovery / retry |
| --- | --- | --- | --- | --- |
| `PENDING` | No canonical user settlement yet | Yes | No | Recover same item |
| `SKIPPED` | User explicitly postpones this window | Yes | No | May later be replaced by `OBSERVED` through a new explicit command while set is current |
| `DECLINED` | User explicitly refuses this window for this set | Yes; item terminal | No | No fake retry; leave/preserve actions only; a future encounter may form a new set |
| `UNAVAILABLE` | Authority cannot offer a valid item because source/protocol lineage is unavailable or mismatched | Yes only when determined inside a valid transaction | No | Retryability is carried by the typed cause, never guessed by UI |
| `SAFE_WITHHELD` | Command result when mutation cannot be safely committed | No new item state is written | No | Preserve last committed state; retry only if result says retryable |

`PRESENTED` is a read-model state, not a persisted item state. `SAFE_WITHHELD` is a command result, not a fact that the item was observed.

Each command settles only its named item. No `completeAll`, array-fill or recovery shortcut is permitted.

## 5. Completion Receipt

### 5.1 Frozen receipt shape

```ts
type SixDimensionCompletionReceipt = Readonly<{
  schemaVersion: "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V1";
  completionReceiptReferenceId: string;
  observationSetId: string;
  observationSetRevision: number;
  identityKey: string;
  identityReferences: RealityEncounterIdentityReferences;
  encounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  pressure: Readonly<{
    runtimeSeedId: string;
    candidateReferenceId: string;
    catalogRevision: string;
  }>;
  dimensionProtocolRevision:
    "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2";
  itemOutcomeReferences: readonly [string, string, string, string, string, string];
  contentDigest: string;
  evidenceDigest: string;
  completedAt: string;
  provenance: Readonly<{
    authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY";
    allSixDistinctObserved: true;
    noChoiceAuthority: true;
    noActionAuthority: true;
    noFactAuthority: true;
    noCrystalAuthority: true;
  }>;
}>;
```

### 5.2 Creation and uniqueness

- the sixth qualifying item write and Receipt creation occur in the same IndexedDB transaction;
- all six distinct dimension IDs must be present exactly once and each item must be `OBSERVED` with a non-null typed acknowledgement and outcome reference;
- Receipt ID is stable from observation set ID + evidence digest;
- the Receipt Store has a unique index on `observationSetId`, so one observation set has exactly one completion;
- replay of the sixth command returns the existing Receipt as `ALREADY_COMMITTED`;
- a page cannot build, update or replace a Receipt;
- the Receipt is immutable; Choice consumption updates the observation set lifecycle, not the Receipt;
- completion proves six observation windows only. It proves no Choice, real-world action, Fact, Eligibility, Crystal or Body formation.

## 6. Choice binding and persisted versions

### 6.1 New Formation source proof

The current `completedNodeCount` cannot certify readiness. Freeze a new snapshot contract:

```ts
type ChoiceFormationSourceSnapshotV2 = Readonly<{
  schemaVersion: "XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V2";
  formation: CurrentHexagramFormationResult;
  migrationImpact: PersonaMigrationImpact;
  primaryDimension: string;
  action: SingleModelRevisionAction;
  assetCompletionState: "READY_TO_CRYSTALLIZE";
  sixDimensionCompletionProof: Readonly<{
    observationSetId: string;
    completionReceiptReferenceId: string;
    observationSetRevision: number;
    dimensionProtocolRevision:
      "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2";
    catalogRevision: string;
    evidenceDigest: string;
  }>;
}>;
```

`completedNodeCount` may remain in old V1/V2 records and visual adapters for grandfathered recovery. It is absent as an Authority prerequisite in new commits.

### 6.2 Choice V3

Because current Choice V2 is already persisted, changing its shape in place is forbidden. New canonical Choice creation uses:

```text
XINMAI_CHOICE_ACTION_INTENTION_V3
```

V3 embeds `ChoiceFormationSourceSnapshotV2`. Choice commit must, within the same database transaction:

1. read the canonical observation set and immutable Receipt;
2. validate identity, encounter, Gravity, Pressure Seed, Catalog revision, protocol revision, revision and evidence digest;
3. validate all existing action-route and Gravity recognition prerequisites;
4. create one Choice V3;
5. mark Gravity consumed by that Choice;
6. mark the observation set `CONSUMED_BY_CHOICE`;
7. commit the Growth envelope and all touched records together.

Missing, unknown or mismatched references fail closed. Refresh, Back/Forward and multi-tab recovery read only persisted references; no page regeneration is allowed.

### 6.3 Readiness remains conjunctive

Receipt existence is necessary but not sufficient. Choice readiness still requires current Gravity observation, current admission/lifecycle, valid action routes, matching identity/Pressure provenance and all existing safety rules. Six-dimension completion never auto-selects or commits Choice.

## 7. Legacy V1/V2 policy

### 7.1 Existing records

- existing Gravity Observation V1 remains truthful with `noSixDimensionAuthority: true`;
- existing Choice V1 and V2 are immutable, read-only grandfathered assets;
- existing Fact, Eligibility, Crystal, Body Imprint and Archive assets remain readable and are not deleted, downgraded or re-formed;
- no historical six items, Receipt or 6/6 status may be fabricated;
- no backfill and no reinterpretation with the current dimension protocol.

### 7.2 Recovery boundary

| Existing state | Frozen behavior after migration |
| --- | --- |
| Choice V1/V2 or higher formed asset exists | Recover the old asset under its original schema; do not require or invent a six-dimension Receipt |
| Gravity recognized, no Choice, same current identity/encounter/gravity/pressure lineage | User may explicitly begin a new canonical V2 observation set and observe all six; this is new present-tense evidence, not backfill |
| Gravity recognized but lineage expired, terminal or mismatched | `SAFE_WITHHELD`; preserve life assets and offer a truthful return path, not 6/6 or fake retry |
| Page-only six progress with no Receipt | Ignore as Authority; display only canonical recovered state |

“New V2 canonical path” refers to `XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2`. New Choice persistence is V3 because Choice V2 already exists and cannot be mutated in place.

## 8. Transaction, concurrency and reconciliation

### 8.1 Database migration

```text
Database: xinmai-lived-growth-canonical
Current version: 2
Target version: 3
```

Add exactly these Stores:

1. `six-dimension-observation-set`
   - keyPath: `observationSetId`
   - unique index: `canonicalLineageKey`
   - non-unique index: `identityKey`
   - non-unique index: `encounterCycleId`
2. `six-dimension-completion-receipt`
   - keyPath: `completionReceiptReferenceId`
   - unique index: `observationSetId`
   - unique index: `evidenceDigest`
3. `six-dimension-command-fence`
   - keyPath: `commandReferenceId`
   - unique index: `outcomeReferenceId` when non-null
   - non-unique index: `observationSetId`

No existing Store or index is deleted or renamed. Upgrade creates empty Stores only; it does not fabricate historical records.

### 8.2 Fencing and idempotency

- Authority controller owns command normalization, idempotency and fencing;
- command reference is deterministic from observation set ID, dimension ID, expected set/item revisions and typed action;
- command fence persists input digest, committed outcome reference, resulting set revision and status;
- same command + same digest returns `ALREADY_COMMITTED`;
- same command + different digest returns `IDEMPOTENCY_CONFLICT` non-retryable;
- different commands against the same expected revision serialize through IndexedDB; the loser returns `STALE_REVISION`;
- late/old tabs cannot overwrite a newer item revision;
- one observation set revision increments once per committed item state transition.

### 8.3 Transaction boundaries

| Operation | Required single transaction Stores |
| --- | --- |
| Create set | Gravity observation + observation set + command fence |
| Settle one item | Gravity observation + observation set + command fence |
| Sixth item and completion | Gravity observation + observation set + completion Receipt + command fence |
| Choice V3 commit | canonical Growth envelope + Gravity observation + observation set + completion Receipt + command fence |

No cross-Store write is called atomic unless all Stores are in the same IndexedDB transaction. No cross-database transaction is introduced.

### 8.4 Failure handling

| Condition | Typed result |
| --- | --- |
| duplicate command | `ALREADY_COMMITTED` with persisted item/Receipt |
| stale or late tab | `REJECTED / STALE_REVISION`, retryable only after canonical reread |
| concurrent conflicting acknowledgement | one commit; loser `STALE_REVISION` or `IDEMPOTENCY_CONFLICT` |
| refresh or crash before commit | no partial write; canonical reread |
| transaction committed but callback not observed | reconcile by command fence and record read; return committed result if found, otherwise `WRITE_UNCONFIRMED` |
| abort/quota/connection closed | `SAFE_WITHHELD` with exact storage cause |
| database upgrade blocked | `SAFE_WITHHELD / TRANSACTION_OPEN_BLOCKED`, retryable after blocker release |
| corrupt set/Receipt/digest/index | `SAFE_WITHHELD / RECOVERY_CORRUPTED`, non-retryable in UI |
| orphan Receipt or completed set without Receipt | canonical uniqueness violation; no repair by page |

Partial transaction reconciliation is read-only. It never manufactures the missing half of a record pair.

## 9. Public typed contract

### 9.1 Commands

```ts
type SixDimensionObservationCommand =
  | Readonly<{
      type: "CREATE_OBSERVATION_SET";
      commandReferenceId: string;
      expectedGravityObservationRevision: number;
      identityReferences: RealityEncounterIdentityReferences;
      encounterCycleId: string;
      gravityCycleId: string;
      gravityObservationReferenceId: string;
      runtimeSeedId: string;
      candidateReferenceId: string;
      catalogRevision: string;
      dimensionProtocolRevision:
        "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2";
    }>
  | Readonly<{
      type: "ACKNOWLEDGE_DIMENSION";
      commandReferenceId: string;
      observationSetId: string;
      dimensionId: SixDimensionId;
      acknowledgement: SixDimensionTypedAcknowledgement;
      expectedSetRevision: number;
      expectedItemRevision: number;
      sourceReferenceId: string;
    }>
  | Readonly<{
      type: "SKIP_DIMENSION" | "DECLINE_DIMENSION";
      commandReferenceId: string;
      observationSetId: string;
      dimensionId: SixDimensionId;
      expectedSetRevision: number;
      expectedItemRevision: number;
    }>;
```

No batch settlement command exists.

### 9.2 Causes and retryability

```ts
type SixDimensionObservationCauseCode =
  | "MUTATION_POLICY_SAFE_WITHHELD"
  | "INVALID_COMMAND"
  | "IDENTITY_MISMATCH"
  | "ENCOUNTER_MISMATCH"
  | "GRAVITY_NOT_RECOGNIZED"
  | "GRAVITY_TERMINAL"
  | "PRESSURE_PROVENANCE_MISMATCH"
  | "CATALOG_REVISION_MISMATCH"
  | "DIMENSION_PROTOCOL_REVISION_UNKNOWN"
  | "OBSERVATION_SET_NOT_FOUND"
  | "OBSERVATION_SET_ALREADY_EXISTS"
  | "OBSERVATION_SET_TERMINAL"
  | "DIMENSION_NOT_IN_PROTOCOL"
  | "ITEM_ALREADY_DECLINED"
  | "SOURCE_REFERENCE_MISMATCH"
  | "STALE_REVISION"
  | "IDEMPOTENCY_CONFLICT"
  | "COMPLETION_NOT_QUALIFIED"
  | "COMPLETION_RECEIPT_MISSING"
  | "COMPLETION_RECEIPT_MISMATCH"
  | "EVIDENCE_DIGEST_MISMATCH"
  | "CHOICE_VERSION_MISMATCH"
  | "TRANSACTION_STORAGE_UNAVAILABLE"
  | "TRANSACTION_OPEN_BLOCKED"
  | "TRANSACTION_ABORTED"
  | "TRANSACTION_CONNECTION_CLOSED"
  | "WRITE_UNCONFIRMED"
  | "RECOVERY_CORRUPTED"
  | "CANONICAL_UNIQUENESS_VIOLATION";

type SixDimensionFailureCause = Readonly<{
  owner: "SIX_DIMENSION_AUTHORITY" | "GRAVITY" | "CHOICE" | "STORAGE";
  code: SixDimensionObservationCauseCode | string;
  retryability: "RETRY_AFTER_REREAD" | "RETRY_AFTER_ENVIRONMENT_RECOVERY" | "NOT_RETRYABLE";
  innerCause: SixDimensionFailureCause | null;
}>;
```

The innermost cause is immutable. Outer consumers append their own stage but never replace it.

### 9.3 Results

```ts
type SixDimensionObservationResult<T> =
  | Readonly<{
      status: "COMMITTED" | "ALREADY_COMMITTED";
      value: T;
      observationSet: CanonicalSixDimensionObservationSet;
      completionReceipt: SixDimensionCompletionReceipt | null;
      cause: null;
    }>
  | Readonly<{
      status: "REJECTED" | "SAFE_WITHHELD";
      value: null;
      observationSet: CanonicalSixDimensionObservationSet | null;
      completionReceipt: SixDimensionCompletionReceipt | null;
      cause: SixDimensionFailureCause;
    }>;
```

Presentation maps this contract read-only:

- retry is rendered only for retryable results and calls the real reread/retry command;
- non-retryable states show a short truthful explanation and safe return/preserve action;
- internal IDs, stack details and private data are not displayed;
- DOM/accessibility state mirrors the same Resolver output and may never announce completion without a recovered Receipt.

## 10. Forward SAFE_WITHHELD Counter

Freeze one policy field in `xinmaiSixDimensionObservationRuntimePolicy.ts`:

```text
SIX_DIMENSION_V2_NEW_MUTATION: ENABLED -> SAFE_WITHHELD
```

The direct-child Counter:

- pauses new V2 set creation and item mutation;
- allows read-only recovery of already formed V2 sets and Receipts;
- allows old Choice V1/V2, Crystal and Body recovery;
- allows a previously committed Choice V3 and higher formed assets to recover;
- does not delete Stores, records or Receipts;
- does not restore page-local 6/6, `enginePhase` completion or count fallback;
- does not introduce a second Authority;
- returns `MUTATION_POLICY_SAFE_WITHHELD / NOT_RETRYABLE` with a safe leave/preserve action.

A Choice V3 already committed before the Counter remains readable. An uncommitted Choice cannot be created from page state. Whether a pre-existing completed Receipt may create a new Choice while mutation is withheld is frozen to **no** for this Counter revision, because Choice binding is part of the new V2 mutation surface and must fail closed together.

## 11. Consumer inventory — UNKNOWN = 0

| File / group | Current role | Future action |
| --- | --- | --- |
| `GravityProductionRouteEntry.tsx` | Formal route/recovery assembly | Add canonical read outcome to host input |
| `GravityProductionSurfaceHost.tsx` | Formal typed host | Pass Resolver output and typed commands only |
| `GravityPage.tsx` | Formal page; currently owns local progress and reconstruction | Remove local completion Authority; render canonical projection |
| `guanyaoDynamicsSixSpaceProgressAdapter.ts` | Read-only progress projection | Derive completed dimensions only from recovered canonical item states |
| `guanyaoCosmicBotanicsRuntimeEngine.ts`, `sceneGraph.ts`, `guanyaoRuntimeEngine.ts`, `guanyaoRuntimeTypes.ts` | Visual/runtime projection | May animate; never author evidence |
| `guanyaoDynamicsExperienceStateAdapter.ts`, `guanyaoDynamicsValueFlowAdapter.ts`, `guanyaoDynamicsVisualStateAdapter.ts` | Formal visual/value projections | Consume Receipt-backed readiness; no writes |
| `guanyaoHexagramAssetCandidateResolver.ts` | Current count-based candidate readiness | Replace count as Authority input with Receipt proof |
| `xinmaiChoicePresentationReadinessResolver.ts`, `xinmaiChoiceActionRouteGrowthProjection.ts`, `xinmaiChoiceActionIntentionPrerequisiteValidator.ts` | Choice readiness/snapshot/validation | Require canonical Receipt/version/digest for V3 |
| `xinmaiChoiceActionIntentionController.ts` | Choice writer | Atomically validate Receipt and write Choice V3 |
| `xinmaiLivedGrowthTransactionalStore.ts` | Existing Gravity/Choice transactional Store | DB v3 Stores and atomic transactions |
| `guanyaoDynamicsCrystalRuntimeAdapter.ts`, `xinmaiCrystalFormationConsumer.ts` | Downstream Crystal presentation/consumer | No Authority change; receive only valid Choice lineage |
| `hexagramCrystalRuntimeEndpointService.ts`, `personalityRingLiteService.ts` | Legacy/compatibility paths with count projections | Must not enter new V3 proof path |
| `guanyaoHexagramAssetDraftCandidateResolver.ts`, mapping draft | Draft | Excluded from production proof and bundle gates |
| `XinmaiLivedGrowthAcceptancePage.tsx`, `PersonalityRingPage.tsx` | Acceptance/legacy consumer surfaces | No production Authority role |
| `sixDimensionalTuningDialogue.ts`, Pressure Seed six-space projection registry | Language/projection assets | Presentation source only after review; no evidence writes |
| `LegacyDynamicsDormant.tsx` and fixtures | Legacy/dev | Remain isolated and excluded |

All direct `completedDimensionIds`, `completedSixDimensionCount`, `sixDimensionState`, `completedNodeCount`, six-space and primary-petal consumers were assigned a role. UNKNOWN: `0`.

## 12. Split migration topology

### 12.1 Phase 1 — Authority foundation, mutation withheld

Expected parent: the exact SHA of this docs-only audit Candidate as accepted by Product Control Tower. If formal remote differs from `4a6471ebd68a9bd46938decb78d13f0058830bdc`, stop and obtain a Current-HEAD recomposition decision. No merge, rebase or cherry-pick.

Allowed files:

**New**

- `src/types/xinmaiSixDimensionObservation.ts`
- `src/services/xinmaiSixDimensionObservationAuthorityController.ts`
- `src/services/xinmaiSixDimensionObservationRecoveryAdapter.ts`
- `src/services/xinmaiSixDimensionObservationEvidenceValidator.ts`
- `src/services/xinmaiSixDimensionObservationRuntimePolicy.ts`

**Existing, narrowly modified**

- `src/types/xinmaiLivedGrowthTransactionalStore.ts`
- `src/services/xinmaiLivedGrowthTransactionalStore.ts`
- `src/types/xinmaiLivedGrowthRecovery.ts`
- `src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts`
- directly registered Gate files and `package.json`

Phase 1 requirements:

- DB version 3 and exact Stores/indexes above;
- V1/V2 Growth and Choice records remain readable;
- controller/readers compile and are exhaustively gated;
- mutation policy fixed to `SAFE_WITHHELD`;
- no `/dynamics`, Choice, route or Presentation wiring;
- no records created during ordinary product use.

### 12.2 Phase 2 — atomic activation and consumer cutover

Expected parent: accepted Phase 1 Candidate exact SHA.

Allowed additions/modifications:

- `src/services/xinmaiSixDimensionObservationPresentationResolver.ts`
- `src/types/xinmaiChoiceActionIntention.ts`
- `src/services/xinmaiChoiceActionIntentionController.ts`
- `src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts`
- `src/services/xinmaiChoicePresentationReadinessResolver.ts`
- `src/services/xinmaiChoiceActionRouteGrowthProjection.ts`
- `src/services/guanyaoHexagramAssetCandidateResolver.ts`
- `src/services/guanyaoDynamicsSixSpaceProgressAdapter.ts`
- `src/pages/GravityProductionRouteEntry.tsx`
- `src/components/GravityProductionSurfaceHost.tsx`
- `src/pages/GravityPage.tsx`
- directly related types, Gates and `package.json`

Phase 2 must switch all of these in one Candidate:

- V2 set creation/item commands;
- Receipt-backed progress/recovery;
- false recovery-to-6 removal;
- Choice V3 snapshot, validator and transaction;
- non-retryable/retryable Presentation mapping;
- accessibility mirror;
- policy `SAFE_WITHHELD -> ENABLED`.

No Crystal/Growth/Body semantic change is allowed. The shared Growth Store changes only to coordinate the new Authority and Choice reference transaction.

### 12.3 Direct-child Counter

Counter Parent is the exact Phase 2 Candidate SHA. It changes only the policy field described in section 10 plus its direct gate expectations. It does not revert DB version, Stores, readers, Resolver or V3 recovery.

### 12.4 Formal delivery rule

- Phase 1 and Phase 2 candidates remain local `Push HOLD` until independent Control Tower acceptance;
- formal delivery may only be a non-force fast-forward when the accepted ancestry still begins at the unchanged formal remote;
- if formal remote moves, stop and freeze a new Current-HEAD atomic recomposition; no merge/rebase/cherry-pick/force push.

## 13. Gates and fail-closed validation

No build compiler is needed: the six dimension protocol is a fixed typed domain, not authored content. The single deterministic validator/digest owner is `xinmaiSixDimensionObservationEvidenceValidator.ts`.

New registered gates must include:

1. schema/store/version and no destructive upgrade;
2. fixed six IDs/order and protocol revision;
3. single writer/reader ownership;
4. no page/Storage/runtime-engine Authority;
5. one-item command only; no bulk completion API;
6. typed acknowledgement and non-qualifying outcome matrix;
7. deterministic source/outcome/reference/digest vectors;
8. set, Receipt and command-fence uniqueness;
9. duplicate, stale, concurrent, abort, blocked, crash and reconciliation outcomes;
10. sixth-item + Receipt same transaction;
11. Choice V3 + Gravity + set lifecycle same transaction;
12. V1/V2 read-only grandfathering and no backfill;
13. Receipt mismatch/missing/unknown fail closed;
14. page recovery cannot reconstruct 6/6;
15. `enginePhase`, animation and node count cannot certify completion;
16. Resolver is the only user/accessibility semantic owner;
17. retry visibility follows Authority retryability;
18. Counter preserves reads and withholds all new V2/Choice V3 mutation;
19. Fixture/Acceptance/AI/whisper/private text excluded from Production Bundle;
20. all existing XINMAI Gates remain registered and passing.

Gate deletion or weakened assertions are migration blockers.

## 14. Future application acceptance matrix

| Scenario | Required result |
| --- | --- |
| Clean MID_LIFE Production journey | Six distinct explicit item acknowledgements and one Receipt before Choice readiness |
| Presentation only | No persisted observation |
| Animation/engine complete | No persisted observation and no completion Receipt |
| One through five observed | Recover exact item references; completion remains false |
| Sixth observed | Item and one immutable Receipt commit together |
| Skip | Recover skipped state; no completion; explicit later observation only |
| Decline | Recover declined state; no completion and no fake retry |
| Refresh/Back/Forward/multi-tab | Same set/item/Receipt revisions; duplicates zero |
| Duplicate command | `ALREADY_COMMITTED`, no second item/Receipt |
| Conflicting tabs | one wins; loser stale/conflict; no overwrite |
| Crash/abort/quota/blocked | no partial aggregate/Receipt; exact typed cause |
| Choice | V3 references exact Receipt/version/digest; all existing readiness checks still pass |
| Receipt mismatch/missing | fail closed; no Choice |
| Legacy Choice V1/V2 | read-only recovery with no fabricated six items |
| Legacy recognized Gravity/no Choice | explicit re-observation only when lineage current |
| NOT_ATTEMPTED/DECLINED lived response | no Fact/Crystal |
| ATTEMPTED/CHANGED_RESPONSE | one Fact, eligible Formation, Body Imprint and Archive continuity |
| Counter | existing records readable; new V2 and Choice V3 mutations withheld |
| Viewports/Motion | 390x844, 320x568, Motion and native Reduced Motion preserve identical typed facts |
| Engineering | TypeScript, Production Build, full registered Gates pass; runtime errors 0 |
| Bundle hygiene | Fixture / Acceptance / AI / private review metadata executable assets = 0 |

## 15. Actual audit diff and exit

This audit authorizes no Runtime, Schema, Store, Gate or page modification. Its only artifact is this document.

```text
FINAL EXIT:
B. SPLIT MIGRATION APPLICATION READY

Phase 1:
Six-Dimension Authority Foundation / DB V3 / Mutation SAFE_WITHHELD

Phase 2:
V2 Observation Activation + Receipt-backed /dynamics + Choice V3 Atomic Cutover

Direct child:
Forward SAFE_WITHHELD Counter

Runtime / Schema actual diff: 0
Push: HOLD
```

No Runtime phase may start without a new explicit Product Control Tower authorization naming the accepted audit SHA as Expected Parent.
