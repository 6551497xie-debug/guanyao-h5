# XINMAI 1.0 Six-Dimension Semantic Response Selection — Canonical Evidence, Choice Binding, and Legacy Recovery Migration Re-audit P0

## Audit verdict

```text
Traffic: RED / AUTHORITY + PERSISTED SCHEMA MIGRATION AUDIT ONLY
Expected Parent: dc4583980f5861043d9eca2e06e76862cb7243b8
Decision: A. SPLIT MIGRATION APPLICATION READY
Runtime / DB / Store / Schema / Page / Gate actual diff: 0
Push: HOLD
```

The smallest lawful contract is a versioned semantic-selection extension of the existing canonical six-dimension Authority. It does not require a second database, Store, writer, or physical IndexedDB upgrade. It does require new discriminated persisted record versions, a new completion Receipt version, and a new Choice formation binding for future journeys.

The migration must be split so validators/readers can accept legacy and new records before new semantic-selection mutation is enabled. Phase 1 is a zero-write foundation with the new mutation policy fixed at `SAFE_WITHHELD`. Phase 2 atomically enables new V3 observation creation, Receipt binding, new Choice binding, and the read-only value-closure consumers.

## 1. Current topology and inventory

### Git

- Audited parent: `dc4583980f5861043d9eca2e06e76862cb7243b8`.
- Parent of the accepted audit: `51e65d01e0e12bcdfd611301ec80a7c377234e07`.
- The current work is docs-only. The accepted Runtime baseline and repeated-cycle lifecycle remain unchanged.

### Canonical database

- Database: `xinmai-lived-growth-canonical`.
- Physical version: `3`.
- Existing Stores: exactly 9.

| Store | Key path | Indexes |
|---|---|---|
| `canonical-growth-envelope` | `id` | none |
| `growth-migration-meta` | `id` | none |
| `growth-eligibility-index` | `crystalEligibilityReferenceId` | `eligibilityKey` unique |
| `growth-formation-index` | `choiceActionIntentionReferenceId` | `formationReferenceId`, `crystalReferenceId`, `eligibilityKey`, all unique |
| `growth-crystal-projection` | `crystalReferenceId` | `formationReferenceId`, `choiceActionIntentionReferenceId`, unique |
| `gravity-observation-continuity` | `recordId` | `gravityObservationReferenceId` unique |
| `six-dimension-observation-set` | `observationSetId` | `canonicalLineageKey` unique; `identityKey`, `encounterCycleId` non-unique |
| `six-dimension-completion-receipt` | `completionReceiptReferenceId` | `observationSetId`, `evidenceDigest`, unique |
| `six-dimension-command-fence` | `commandReferenceId` | `outcomeReferenceId` unique; `observationSetId` non-unique |

No new Store or index is needed. IndexedDB object records are structurally schemaless; V2 and V3 discriminated records can coexist in the existing Stores. The physical database version remains `3`.

### Current persisted protocol

- Observation protocol: `XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2`.
- Observation Set schema: `XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2`.
- Completion Receipt schema: `XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V1`.
- Choice: `XINMAI_CHOICE_ACTION_INTENTION_V3` with `XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V2`.

V2 proves explicit per-dimension observation and six-item completion. It does not contain semantic response selection.

## 2. Canonical semantic-selection contract

### New revisions

Freeze the following future identifiers:

```text
dimensionProtocolRevision:
  XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_11_V3

semanticGrammarRevision:
  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_2026_08_11_V1

observationSet schema:
  XINMAI_SIX_DIMENSION_OBSERVATION_SET_V3

completionReceipt schema:
  XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2

choiceFormationSourceSnapshot schema:
  XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V3

choiceActionIntention schema:
  XINMAI_CHOICE_ACTION_INTENTION_V4
```

Choice V4 changes evidence binding, not Choice behavior. Action route selection, explicit commit, departure, Return, Fact, Eligibility, Formation, Crystal, Body Imprint, and lifecycle semantics remain unchanged.

### Allowed persisted response IDs

Only bounded IDs are canonical. Labels, mirrors, prompts, and raw text are Presentation content and are never Authority.

| Dimension | Qualifying canonical IDs |
|---|---|
| BODY | `LOCATED`, `UNLOCATED` |
| EMOTION | `CLEAR`, `MIXED`, `UNCERTAIN` |
| THOUGHT | `SENTENCE`, `FRAGMENT`, `PRIVATE` |
| ACTION | `ADVANCE`, `WITHDRAW`, `PAUSE` |
| MEMORY | `THEN`, `NOW`, `UNCERTAIN` |
| GOAL | `NEED`, `VALUE`, `UNCERTAIN` |

Important distinction:

- BODY's “pause this interaction” is a Presentation-only `PAUSED` condition. It does not settle the item and is not persisted as a semantic selection.
- ACTION `PAUSE` is a qualifying observation of the user's first action impulse and is persisted.
- `UNCERTAIN`, `PRIVATE`, `UNLOCATED`, and `VALUE` are bounded explicit observations. They may qualify for six-dimension completion, but downstream concrete explanation must respect their uncertainty/privacy semantics.
- `SKIPPED`, `DECLINED`, and `UNAVAILABLE` have `semanticSelection = null`, never qualify for completion, and cannot be silently converted into a selection.

Raw whisper, thought text, relationship/naming text, user-entered explanation, and any private free text remain unpersisted.

### V3 item shape

Each V3 item keeps the existing lineage and state fields and adds exactly one nullable selection object:

```ts
type CanonicalSemanticSelection = Readonly<{
  semanticGrammarRevision:
    "XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_2026_08_11_V1";
  semanticResponseId: BoundedResponseIdForThisDimension;
  semanticSelectionReferenceId: string;
  semanticSelectionDigest: string;
}>;
```

Rules:

- `state === "OBSERVED"` requires a valid non-null selection.
- `PENDING | SKIPPED | DECLINED | UNAVAILABLE` requires `semanticSelection === null`.
- Allowed IDs are validated against the item's dimension and grammar revision.
- The Authority command carries only the bounded response ID and grammar revision; it never carries a label or raw text.

## 3. Deterministic references and digests

### Selection binding

The canonical selection tuple is:

```text
schemaVersion
dimensionProtocolRevision
canonicalLineageKey
observationSetId
dimensionId
semanticGrammarRevision
semanticResponseId
```

`semanticSelectionDigest` is SHA-256 over the canonical serialization of that tuple. `semanticSelectionReferenceId` is a deterministic reference derived from the same tuple and digest. It must not depend on current label text, array order, DOM state, locale, animation, or page content.

The V3 acknowledgement command reference includes:

- observation set and dimension;
- expected set/item revisions;
- semantic grammar revision;
- bounded semantic response ID;
- source reference.

The command fence `inputDigest` hashes the complete typed command. The outcome reference binds the resulting selection reference and command reference. A command reference reused with different semantic input is an idempotency conflict.

### Aggregate evidence

The V3 evidence digest includes, in the fixed body/emotion/thought/action/memory/goal order:

- dimension ID;
- state and item revision;
- outcome reference;
- semantic selection reference;
- semantic selection digest.

Completion Receipt V2 includes:

- the existing identity/encounter/gravity/pressure/protocol fields;
- six item outcome references;
- six semantic selection references;
- six semantic selection digests;
- `semanticSelectionAggregateDigest` over the ordered six selection digests;
- content and evidence digests.

Receipt V2 is valid only when all six distinct V3 items are `OBSERVED`, every selection is allowed for its dimension, and all references/digests recompute exactly.

### Choice binding

New V3 Receipt evidence must never be written into Choice V3's V2 snapshot. Future journeys use Choice Action Intention V4 with Formation Source Snapshot V3. Snapshot V3 binds:

- completion Receipt V2 reference;
- Observation Set ID and exact revision;
- dimension protocol and semantic grammar revisions;
- content digest, evidence digest, and semantic selection aggregate digest.

Choice V4 retains the existing selected action route and `actionSummary`. It changes no Choice decision semantics. A Receipt/snapshot selection digest mismatch fails closed before Choice commit.

## 4. Legacy compatibility matrix

| Asset | Read | Mutate | Exact response map | Choice behavior |
|---|---|---|---|---|
| V2 Set open | continue only under V2 command/validator; never convert to V3 | V2-only settlement | unavailable | if completed, existing Choice V3 path |
| V2 Set + Receipt V1 | immutable recovery | forbidden | `LEGACY_GENERIC_ONLY / SEMANTIC_SELECTION_NOT_RECORDED` | existing Choice V3 remains valid |
| Existing Choice V3 | immutable recovery | forbidden except already-authorized lifecycle transitions | generic six-window summary only | byte/semantic stable |
| Existing Fact/Crystal/Body/Archive | immutable recovery | existing lifecycle only | no inferred selections | unchanged |
| New V3 Set open | V3 reader | V3 commands only | exact persisted subset | Choice unavailable before Receipt V2 |
| New V3 Set + Receipt V2 | immutable recovery | no item rewrite | exact six-selection map | Choice V4 binding required |
| New Choice V4 | immutable/revision-aware recovery | existing lifecycle only | exact Receipt-bound map | existing downstream behavior |

Legacy public read result:

```ts
type SixDimensionSemanticMapReadResult =
  | { status: "EXACT"; map: ExactSixDimensionResponseMap }
  | {
      status: "LEGACY_GENERIC_ONLY";
      map: GenericSixWindowSummary;
      reason: "SEMANTIC_SELECTION_NOT_RECORDED";
    }
  | { status: "SAFE_WITHHELD"; map: null; cause: FailureCause };
```

No V2 record receives a default selection. Current grammar is never used to reinterpret an old acknowledgement. Existing assets are not backfilled, rewritten, deleted, or downgraded.

A user with old completed assets may start a fresh future Reality cycle through the already accepted repeated-cycle Authority. The new encounter creates a new V3 Observation Set. This does not mutate the old V2 set or its downstream assets.

## 5. Single owner and complete consumer inventory

### Single mutation owner

`xinmaiSixDimensionObservationAuthorityController` remains the only semantic-selection writer/controller. Every write continues through `transactXinmaiSixDimensionObservation` in the existing lived-growth canonical transaction.

The three existing six-dimension Stores remain the only storage owners:

- Observation Set Store;
- Completion Receipt Store;
- Command Fence Store.

The sixth item, V3 set completion, Receipt V2, and fence are committed in the same existing IndexedDB transaction. No page, resolver, grammar module, local/session storage, or second DB may write selection truth.

### Producers and consumers

| Role | Owner |
|---|---|
| Allowed-ID grammar definition | six-dimension semantic choreography resolver/types; compile-time/presentation definition only |
| Typed user command emitter | life reflection guide / Gravity consumer |
| Command bridge | Gravity production surface host |
| Canonical controller/writer | six-dimension observation Authority controller |
| Transaction/store owner | lived-growth transactional Store |
| Validators/digests/references | six-dimension evidence validator |
| Recovery | six-dimension recovery adapter + canonical reader |
| Completion readiness | Choice presentation readiness resolver and Choice prerequisite validator |
| Choice persistence | Choice Action Intention controller, future V4 branch |
| Growth linkage | existing lived-growth transaction and Choice action route growth projection |
| Response map | future read-only unique Presenter, consuming V3 set/Receipt only |
| Causal explanation | future read-only unique Presenter, consuming ACTION + GOAL selections and selected Choice action |
| Return | lived-response Return surface, read-only presentation input |
| Crystal/Ownership | Crystal ownership resolver/component, read-only projection only |
| Archive/next cycle | existing ownership/archive consumers and post-Ownership next-cycle controller |

Writer count: 1. Database count: 1. Six-dimension Store count: 3. Unknown writers/readers/validators/stores/indexes: 0.

## 6. Transaction, concurrency, and recovery matrix

| Event | Required result | Retryability |
|---|---|---|
| Same command, same selection, replay | `ALREADY_COMMITTED`, same item/Receipt refs | none needed |
| Same command reference, different input digest | `IDEMPOTENCY_CONFLICT`, no write | non-retryable |
| Two tabs, same selection and revision | one commit; loser rereads same result | retry after reread |
| Two tabs, different selections and same revision | first valid commit wins; loser `STALE_REVISION`, then sees `SEMANTIC_SELECTION_ALREADY_COMMITTED`; no overwrite | reread, then non-retryable for replacement |
| Unknown response ID for dimension | `SEMANTIC_RESPONSE_NOT_ALLOWED` | non-retryable |
| Unknown grammar revision | `SEMANTIC_GRAMMAR_REVISION_UNKNOWN` | non-retryable |
| Source or lineage mismatch | preserve inner mismatch cause | non-retryable unless existing Authority specifies reread |
| Stale set/item revision | no write | retry after reread |
| Concurrent sixth commands | exactly one sixth item + one Receipt V2; other converges on same Receipt | retry after reread |
| Crash before IDB commit | item/fence/Receipt all absent | retry after environment recovery |
| Crash after IDB transaction completion | item/fence/Receipt all present and recoverable | reread |
| Receipt committed, Choice not yet committed | no partial Choice; resume Choice V4 from immutable Receipt | retry after reread |
| Transaction abort/quota/storage unavailable | no partial item/Receipt/Choice; preserve storage inner cause | retry after environment recovery where Authority says so |
| DB open blocked | no write | retry after environment recovery |
| Corrupt V2/V3 discriminant or invalid tuple | `RECOVERY_CORRUPTED` | non-retryable |
| Selection/item/Receipt digest mismatch | `SEMANTIC_SELECTION_DIGEST_MISMATCH` or `EVIDENCE_DIGEST_MISMATCH` | non-retryable |
| Choice snapshot/Receipt mismatch | `CHOICE_SEMANTIC_BINDING_MISMATCH` | non-retryable |

The immutable inner cause remains attached through Controller, Gravity consumer, Choice readiness, Return/Ownership presentation, and accessibility output. Presentation may map it to understandable copy but cannot replace it or guess retryability.

No cross-Store atomicity is claimed between the Receipt transaction and later Choice transaction. This is an idempotent, Receipt-bound two-step sequence: canonical observation completion first; Choice commit second. Receipt existence alone still creates no Fact, Crystal, or Body Imprint.

## 7. Counter contract

The future activation Candidate must have a direct-child Counter with exactly one policy change:

```text
SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION:
ENABLED -> SAFE_WITHHELD
```

The Counter:

- prevents creation or mutation of new V3 semantic-selection observations;
- preserves V2 and already-formed V3 Set/Receipt/Choice V4 assets read-only;
- does not delete records or Stores;
- does not restore page-local selection truth;
- does not infer selections for V2;
- does not change legacy Choice/Fact/Crystal/Body/Archive recovery;
- does not weaken Gravity/Choice/Admission lifecycle rules.

## 8. Value-closure feasibility after migration

### Exact response map

Yes. For Receipt V2, a read-only Presenter can recover all six exact bounded selections from the V3 set, verify each selection digest and the aggregate Receipt digest, and map IDs to current user copy only after confirming the exact grammar revision. The ID is Authority; the label is versioned Presentation.

For legacy Receipt V1, it can show only that each window was observed and explicitly state that the exact choices were not recorded.

### Micro-action causal explanation

Yes, without guessing, when:

- ACTION is `ADVANCE`, `WITHDRAW`, or `PAUSE`;
- GOAL is `NEED` or `VALUE` with copy appropriate to the bounded certainty;
- Choice V4 binds the same Receipt V2 selection aggregate digest;
- the selected Choice action is available from the existing action route snapshot.

If GOAL is `UNCERTAIN`, or any required evidence is legacy/missing/mismatched, the Presenter withholds the concrete need phrase and reports which observation remains unclear. It never invents a need or action impulse.

### Return / Crystal / Archive

Yes. Return and Ownership can resolve the Choice V4 reference to the exact Receipt-bound response map and combine it with existing action summary, lived-response outcome, Formation Receipt, Crystal, timestamps, and canonical sequence. This is read-only projection. Growth Fact, Eligibility, Formation, Crystal, Body Imprint, Archive, and repeated-cycle Authorities require no mutation-semantic change.

## 9. Split migration topology

### Phase 1 — Authority foundation, zero new V3 writes

Install:

- V2/V3 discriminated observation types and validators;
- Receipt V1/V2 discriminated validators;
- Choice V3/V4 and snapshot V2/V3 read validators;
- allowed semantic response registry and grammar revision validator;
- deterministic selection references/digests;
- legacy generic read result;
- V3 read-only recovery and integrity gates;
- mutation policy hard-coded `SAFE_WITHHELD`.

Phase 1 must prove ordinary product use creates zero V3 Set/Receipt/Fence/Choice V4 records. DB remains v3; no Store/index upgrade occurs.

### Phase 2 — Atomic activation and consumer value closure

In one Candidate:

- new observation-set creation selects protocol V3;
- typed UI command supplies bounded selection ID;
- Authority writes V3 item/fence/Receipt V2;
- Choice commits V4 with snapshot V3;
- unique response-map and causal-explanation Presenters activate;
- Return/Crystal/Ownership/Archive consumers switch atomically;
- no-fact and next-cycle actions converge without naming exits;
- direct Gates and evidence manifest activate;
- direct-child Counter changes only the frozen mutation policy.

V2 in-progress sets remain on the V2 path. No V2/V3 mixed set is permitted.

## 10. Future application gates

Both phases must cover:

- allowed ID per dimension and non-qualifying pause/skip/decline/unavailable;
- deterministic selection reference/digest;
- command fence semantic mismatch;
- sixth item + Receipt single transaction;
- V2/V3 validator and recovery matrix;
- no V2 backfill or current-grammar reinterpretation;
- Receipt V2 aggregate selection binding;
- Choice V4 snapshot binding;
- old Choice V3/Fact/Crystal/Body/Archive byte/semantic recovery;
- response map exact/legacy/safe-withheld outcomes;
- action+goal explanation certainty rules;
- all failure/retryability paths;
- unchanged DB v3, 9 Stores, 14 indexes;
- Production Bundle exclusion of Fixture/Acceptance/Draft/AI metadata.

## 11. Actual-change verification

- Runtime diff: 0.
- Database version diff: 0.
- Store/index diff: 0.
- Persisted schema implementation diff: 0.
- Controller/writer diff: 0.
- CSS/Page/Presentation/Gate diff: 0.
- Pressure Catalog/Birth/Identity/Relationship/Naming diff: 0.
- Choice/Growth/Fact/Formation/Crystal/Body/Archive Runtime diff: 0.
- No application Candidate or Counter created.
- Push: HOLD.

## Exit and next exact knife

```text
A. SPLIT MIGRATION APPLICATION READY
```

Next knife only:

```text
XINMAI-1.0-SIX-DIMENSION-SEMANTIC-RESPONSE-SELECTION-
CANONICAL-EVIDENCE-AND-LEGACY-RECOVERY-
AUTHORITY-FOUNDATION-PHASE-1-P0

Traffic: RED / AUTHORITY FOUNDATION
Expected Parent: <this audit commit>
Mutation: SAFE_WITHHELD
Push: HOLD
```

Phase 2 is not authorized by this audit and must not start automatically.
