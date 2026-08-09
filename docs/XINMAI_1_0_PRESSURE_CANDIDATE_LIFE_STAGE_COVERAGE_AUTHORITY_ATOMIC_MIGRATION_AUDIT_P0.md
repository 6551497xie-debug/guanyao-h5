# XINMAI 1.0 Pressure Candidate Life Stage Coverage Authority Atomic Migration Audit P0

## 0. Audit identity

- Blade: `XINMAI-1.0-PRESSURE-CANDIDATE-LIFE-STAGE-COVERAGE-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0`
- Decision: `NOW — AUDIT ONLY`
- Baseline: `04c3252f2662ab71c032a7f07658d5af73e8554d`
- Runtime / Catalog / Adapter / Gate: `DEFER`
- Push: `HOLD`
- Audit exit: `RED — PRODUCT CONTENT PROTOCOL PREP REQUIRED`

This document is a read-only migration audit. It does not authorize edits to Runtime, Catalog, Adapter, Schema, Store, page copy, or gates.

## 1. Executive decision

The production type system already defines every adult Life Stage required by XINMAI 1.0, and the age routing owner already maps valid adult ages deterministically. Candidate, bundle, delivery, capture, and continuity schemas already carry `ageSegment` without requiring a Store or database migration.

The blocking gap is product content:

- target production matrix: `5 Life Stages × 6 Pressure Fields × 15 Seeds = 450 Seeds`;
- current locked production matrix: `1 × 6 × 15 = 90 Seeds`;
- missing production content: `360 Seeds` across 24 nodes;
- the 72-item Draft Pool contains useful editorial material, but it is not a locked production catalog and is explicitly forbidden from automatic promotion;
- only 18 Draft Pool items are primarily tagged `MID_LIFE`, with highly uneven field coverage; they cannot deterministically become the required 90-item MID_LIFE catalog without product-content authoring and review.

Therefore the next legal step is a Product Content Protocol Prep, followed by a schema-preserving Catalog migration. It is not legal to change the correct age router, silently fallback to `ESTABLISHING`, or derive Candidate copy from Identity, Mother Code, Life Whisper, AI, fixtures, or page-local logic.

## 2. Mandatory questions answered

### 2.1 Which adult Life Stages does XINMAI 1.0 support?

The declared 1.0 adult taxonomy is:

| Life Stage | Age boundary | Product label | Typed route | Locked production catalog |
| --- | ---: | --- | --- | --- |
| `YOUTH` | 18–24 | 入世期 | supported | missing |
| `ESTABLISHING` | 25–34 | 立足期 | supported | ready, 90/90 |
| `MID_LIFE` | 35–44 | 承压期 | supported | missing |
| `RESTRUCTURING` | 45–59 | 重组期 | supported | missing |
| `SIXTY_PLUS` | 60+ | 归整期 | supported | missing |

The product contract targets all five adult stages. Current production content only serves `ESTABLISHING`; this is partial implementation, not a narrower product declaration.

### 2.2 Does MID_LIFE already have reusable formal semantic assets?

Partially, but not enough for production promotion:

- `guanyaoPressureSeedDraftPool.ts` contains 18 `MID_LIFE`-primary draft items;
- all six Pressure Fields appear at least once;
- distribution is `POWER 3 / INTEREST 7 / RELATION 2 / FAMILY 1 / SOCIAL 2 / EXISTENCE 3`;
- the formal requirement is 15 reviewed items in every field, or 90 total;
- draft items have `primaryAge` and `ageBias`, but are not organized as six locked MID_LIFE nodes and do not satisfy the production matrix completeness contract.

These 18 items are reusable as editorial source material only. They are not formal Candidate Authority and must not be mechanically copied, padded, or auto-promoted.

### 2.3 Is new work Product Content Catalog or Authority Schema?

The missing work is Product Content Catalog preparation. Existing Authority schemas already express:

- all five Life Stages;
- all six Pressure Fields;
- locked/draft/pending node states;
- stable Candidate and bundle references;
- catalog revisions;
- age-segment routing and no-fallback boundaries.

No new Life Stage enum, Candidate object shape, Receipt, Authority, or Store is required.

### 2.4 Is a Schema, Store, or DB version change required?

No.

The migration can preserve:

- `GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1`;
- `GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1`;
- `GUANYAO_REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_V1`;
- `GUANYAO_PRESSURE_SEED_MATRIX_AGE_COVERAGE_V1`;
- the current Reality Adventure continuity Store and indexes.

Only the catalog revision must advance after the complete reviewed content set is locked. No DB object store, record migration, or persistence backfill is necessary.

### 2.5 Does Catalog expansion affect Reality Intent, Admission, or Identity?

No semantic change is required.

- Reality Intent continues to prove the explicit user request and same-life continuity.
- Admission continues to authorize `/reality` against the existing Identity references.
- Identity, Birth Source, Mansion Coordinate, Mother Code, and relationship naming remain unchanged.
- Catalog expansion happens downstream of Admission and only supplies age-routed Pressure Candidates.

The only integration correction needed after content readiness is to preserve the typed Catalog failure reason through adapters and apply a non-immediate-retry presentation policy.

### 2.6 How does Forward SAFE_WITHHELD pause new Candidates while preserving the life?

When `resolvePressureSeedMatrixAgeCatalogEligibility(ageSegment)` is not `READY`:

1. return `SOURCE_NOT_READY / AGE_CATALOG_NOT_READY`;
2. do not assemble a Candidate bundle;
3. do not initialize or advance a delivery session;
4. do not present or auto-select a Candidate;
5. do not create Pressure Recognition, Gravity, Growth, or Crystal facts;
6. preserve Birth Source, Identity, naming, Reality Intent, prior Growth, prior Crystal, and archive state;
7. retain the same recoverable Intent if one already exists; do not create a second Intent;
8. allow recovery only after the exact age catalog becomes `LOCKED` under a newer catalog revision.

`retryAllowed` in the current Intent failure record may continue to mean future technical recoverability. The Presentation Resolver must not translate it into an immediate Retry button while the catalog eligibility remains `SOURCE_NOT_READY`.

### 2.7 Where should the `AWAITING_RELATIONSHIP` mapping be fixed?

In the returning-life Presentation Consumer for `LaunchLab`, preferably through a read-only Reality-entry presentation resolver.

The current attribute is derived from `returningLifeWhisperRealityIntentReady`, so a false value means the current Life Whisper response is not yet qualified. It does not mean relationship naming is unavailable. Relationship availability already has an independent typed source: `returningRelationshipNaming.status`.

The presentation states should distinguish at least:

- `AWAITING_WHISPER_RESPONSE`;
- `READY_TO_REQUEST`;
- `REQUESTING`;
- `REQUEST_BLOCKED`;
- `HANDOFF_READY`.

No Relationship Authority change is required.

## 3. Life Stage taxonomy and routing ownership

### 3.1 Canonical taxonomy

The canonical union is `GuanyaoAgeSegment` / `PressureSeedAgeGroup`:

```text
YOUTH | ESTABLISHING | MID_LIFE | RESTRUCTURING | SIXTY_PLUS
```

Owner files:

- `src/types/guanyaoPressureSeed.ts`
- `src/services/realityPressureCandidateRequestContextBridge.ts`

### 3.2 Unique age route owner

`realityPressureCandidateRequestContextBridge.ts` is the formal runtime owner for resolving age at the explicit Reality request date:

```text
age < 18  -> unsupported
18–24     -> YOUTH
25–34     -> ESTABLISHING
35–44     -> MID_LIFE
45–59     -> RESTRUCTURING
60+       -> SIXTY_PLUS
```

Its inputs are the trusted `LaunchLifeSourceSession.birthCoordinate` and explicit `asOfDate`. Its output marks `ageSegmentRole = CATALOG_ROUTING_ONLY`.

This routing is correct and must not be modified to fit incomplete content.

### 3.3 UNKNOWN policy

There is no `UNKNOWN` adult Life Stage in the canonical union. For a valid adult birth date and valid request date, routing must always resolve to exactly one of the five stages.

Target acceptance:

```text
adult UNKNOWN count = 0
adult ambiguous route count = 0
adult multi-route count = 0
```

Invalid dates, future birth dates, and ages below 18 remain explicit blocked inputs; they must not be coerced into an adult stage.

## 4. Production content and semantic asset inventory

### 4.1 Locked production matrix

Owner: `src/data/guanyaoPressureSeedMatrix.ts`

Current runtime restriction:

```text
type PressureSeedRuntimeAgeGroup = Extract<PressureSeedAgeGroup, "ESTABLISHING">
PRESSURE_SEED_AGE_GROUPS = ["ESTABLISHING"]
```

Current production assets:

| Stage | Locked nodes | Ready Seeds | Expected Seeds | Status |
| --- | ---: | ---: | ---: | --- |
| `YOUTH` | 0/6 | 0 | 90 | `NOT_READY` |
| `ESTABLISHING` | 6/6 | 90 | 90 | `LOCKED` |
| `MID_LIFE` | 0/6 | 0 | 90 | `NOT_READY` |
| `RESTRUCTURING` | 0/6 | 0 | 90 | `NOT_READY` |
| `SIXTY_PLUS` | 0/6 | 0 | 90 | `NOT_READY` |
| **Total** | **6/30** | **90** | **450** | **PARTIAL** |

UNKNOWN nodes and UNKNOWN Seeds are both `0`.

### 4.2 Draft Pool / Candidate Prototype material

Owner: `src/data/guanyaoPressureSeedDraftPool.ts`

| Stage | Draft total | POWER | INTEREST | RELATION | FAMILY | SOCIAL | EXISTENCE |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `YOUTH` | 12 | 1 | 0 | 1 | 5 | 2 | 3 |
| `ESTABLISHING` | 37 | 8 | 4 | 9 | 6 | 7 | 3 |
| `MID_LIFE` | 18 | 3 | 7 | 2 | 1 | 2 | 3 |
| `RESTRUCTURING` | 4 | 0 | 1 | 0 | 0 | 1 | 2 |
| `SIXTY_PLUS` | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| **Total** | **72** | **12** | **12** | **12** | **12** | **12** | **12** |

The Draft Pool is balanced by Pressure Field, not by Life Stage. The existing migration audit correctly states that it cannot be losslessly promoted into a `5 × 6 × 15` matrix.

### 4.3 Pressure Field semantic assets

The following are reusable as editorial constraints:

- six canonical field definitions in `guanyaoRealityPressureFields.ts`;
- field rotations and relation/nature mappings in `guanyaoPressureSeedSceneBindingService.ts`;
- Pressure Seed language structure in `guanyaoPressureSeedLanguageProtocol.ts`;
- the locked ESTABLISHING matrix as a quality and shape reference.

They define field meaning, not Life Stage-specific lived scenes. They cannot alone generate 360 production-ready scenes without new product content.

### 4.4 Mother Code and Identity inputs

The repository contains eight Mother Code profiles and formal StarBeast / Mansion identity references. They are not Candidate Catalog inputs.

The formal Candidate request uses Identity only for same-life authorization and source-reference continuity. Candidate content routing uses age segment only. Mother Code, StarBeast identity, Mansion coordinate, relationship name, and Life Whisper text must not multiply or generate Candidate nodes.

Required combination cardinality remains:

```text
5 Life Stages × 6 Pressure Fields = 30 Catalog nodes
```

It must not become:

```text
Life Stage × Pressure Field × Mother Code × Identity
```

Such multiplication would create a second personality-driven Candidate Authority.

### 4.5 Naming and version drift to resolve in content prep

Two existing editorial/technical naming drifts must be resolved before content lock:

- the legacy Reality Pressure Field semantic registry calls the sixth field `EXISTENTIAL`, while the production matrix and Candidate types call it `EXISTENCE`;
- the matrix source comment says “Matrix V3.0 locked library”, while the exported authority remains `GUANYAO_PRESSURE_SEED_MATRIX_V2` and the catalog revision is dated `2026_07_30_P0`.

These do not require a new Candidate schema, but the content protocol must name one canonical field key and one catalog/version vocabulary. `EXISTENCE` is the current production key and must remain the runtime key unless a separate schema migration is authorized.

## 5. Can current assets deterministically produce missing stages?

No, not to production quality.

The code can deterministically route, order, bundle, and reference any complete locked age catalog. It cannot deterministically author missing Life Stage-specific scene semantics from the current assets without either:

- mechanically re-labeling ESTABLISHING content;
- over-expanding the sparse Draft Pool;
- using Mother Code or Identity as causal content inputs;
- invoking AI or a generic text generator;
- introducing fallback or default Candidates.

All five approaches are forbidden.

The current assets are sufficient to prepare an editorial protocol and seed review queue. They are not sufficient to declare `MID_LIFE` or the remaining stages production-ready.

## 6. Minimum legal Catalog expansion contract

This section freezes the minimum future migration shape; it does not authorize implementation.

### 6.1 Content completeness

Every stage must contain exactly six locked nodes. Every node must contain exactly 15 reviewed Seeds:

```text
YOUTH            6 × 15 = 90
ESTABLISHING     6 × 15 = 90
MID_LIFE         6 × 15 = 90
RESTRUCTURING    6 × 15 = 90
SIXTY_PLUS       6 × 15 = 90
TOTAL           30 × 15 = 450
```

Partial stage activation is forbidden. A stage becomes eligible only when all six nodes are locked and all 90 Seeds pass content and structural gates.

### 6.2 Typed schema

Preserve the existing `PressureSeedMatrixNode` and `PressureSeedMatrixSeed` shapes:

- `ageGroup`;
- `pressureField`;
- `status`;
- `id`;
- `pressureNature`;
- `surface`;
- `shell`.

No new schema version is required for content-only expansion.

### 6.3 Unique catalog owner and generator

There must remain one production catalog owner and one deterministic assembly path:

```text
reviewed age/field content manifest
  -> GUANYAO_PRESSURE_SEED_MATRIX_V2
  -> getPressureSeedSceneCandidateAtMatrixSlot
  -> resolveRealityPressureSeedCandidateSource
```

No page, fixture, AI runtime, Mother Code adapter, or Presentation Resolver may create Candidates.

### 6.4 Stable references

Future IDs must use stable stage/field/slot references:

```text
<LIFE_STAGE>_<PRESSURE_FIELD>_<01..15>
```

Rules:

- an ID is never reused for different semantics;
- editorial copy changes keep Candidate ID only when semantic identity remains the same;
- candidate revision references change when catalog revision or semantic payload changes;
- bundle revision references change when catalog revision, Candidate IDs, or Candidate revisions change;
- existing ESTABLISHING IDs remain stable unless a separately audited semantic correction is required.

### 6.5 Ordering and bundle determinism

Preserve:

- canonical stage order: `YOUTH, ESTABLISHING, MID_LIFE, RESTRUCTURING, SIXTY_PLUS`;
- canonical field order: `POWER, INTEREST, RELATION, FAMILY, SOCIAL, EXISTENCE`;
- numeric Seed order `01..15` inside each node;
- current cross-field bundle cursor and three-Candidate delivery contract;
- deterministic exclusion history and catalog exhaustion behavior.

### 6.6 De-duplication

Future content gates must reject:

- duplicate Candidate IDs globally;
- duplicate normalized `surface` text within a stage;
- duplicate normalized `surface + shell` pairs globally;
- same scene mechanically relabeled across stages;
- Seeds whose `primaryAge` or field does not match the locked node;
- incomplete or fallback content.

Semantic near-duplicates require editorial review, not only string comparison.

### 6.7 Version strategy

After all 30 nodes are complete and reviewed:

- bump `REALITY_PRESSURE_SEED_CATALOG_REVISION` from `GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0`;
- preserve Candidate bundle/context/session schema versions;
- regenerate Candidate and bundle revision references deterministically;
- retain old revisions for recovery validation where an existing Reality session references them;
- do not rewrite persisted Identity, Intent, Growth, or Crystal records.

The current revision digest includes the global catalog revision. A global revision bump would therefore change revision references for unchanged ESTABLISHING Seeds. The future migration must include a schema-preserving compatibility strategy:

- keep the old catalog revision available to recovery reads;
- resolve persisted bundle/candidate revision references against the matching catalog revision;
- generate new-stage references only from the new reviewed revision;
- prove that an existing ESTABLISHING session can recover after the new catalog ships without rewriting its stored references.

The present `recoverRealityPressureSeedCandidateSource` scans only the current generated catalog. Shipping a global revision bump without compatibility would be unsafe even though no DB schema changes are needed.

## 7. Adapter reason preservation

### 7.1 Current loss chain

The current source-level chain is:

| Layer | Available typed reason | What the next layer retains |
| --- | --- | --- |
| Candidate Source | `CANDIDATE_BUNDLE_NOT_AVAILABLE` | collapsed |
| Candidate Delivery Orchestration | `CANDIDATE_SOURCE_NOT_READY` | collapsed |
| Activation Delivery Bridge | `DELIVERY_ORCHESTRATION_NOT_READY` + `orchestrationReason` | inner source reason absent |
| Route Delivery Bridge | `DELIVERY_ORCHESTRATION_NOT_READY` + `deliveryBridgeReason` | only another generic reason |
| Reality Route Host | generic `guardReason` | user sees generic withholding |

The earliest actionable source reason is lost before the formal Presentation Resolver can consume it.

### 7.2 Frozen propagation requirement

Future Adapter work must preserve a typed causal chain, for example:

```text
routeReason
deliveryBridgeReason
orchestrationReason
candidateSourceReason
ageCatalogReason
```

At minimum, `CANDIDATE_BUNDLE_NOT_AVAILABLE`, `CANDIDATE_CATALOG_EXHAUSTED`, `AGE_CATALOG_NOT_READY`, identity mismatch, storage unavailability, and transient transaction failure must remain distinguishable at the Presentation Resolver boundary.

This is an in-memory typed contract extension only. It does not require a Store or DB schema migration.

Internal codes must remain in typed state and public diagnostic attributes, not in user-facing copy. The Presentation Resolver maps them to short, concrete, actionable language.

## 8. Retry semantics

### 8.1 Non-retryable-now outcomes

The following are not immediately retryable:

- `AGE_CATALOG_NOT_READY`;
- `CANDIDATE_BUNDLE_NOT_AVAILABLE` caused by a missing locked age catalog;
- explicit catalog coverage failure.

The UI must not show “继续这一轮” for these outcomes. Replaying the same request cannot change content availability.

### 8.2 Retryable outcomes

Immediate Retry remains valid only for causes that can change without a Catalog release, such as a transient transaction, connection, or recoverable orchestration failure.

### 8.3 Presentation policy

The Resolver must combine two facts:

```text
controllerTechnicalRecoveryCapability
catalogEligibilityNow
```

Only when both permit immediate retry may the Retry action be presented. A technically recoverable Intent may remain preserved for a future catalog revision without offering a no-effect button today.

## 9. Boundary acceptance matrix

All future tests must pin an explicit `asOfDate`; they must not depend on the test machine clock. The reference matrix below uses `2026-08-10` and birthdays already reached on that date.

| Purpose | Birth date | Age | Expected route | Expected catalog after migration |
| --- | --- | ---: | --- | --- |
| underage boundary -1 | 2009-08-10 | 17 | blocked | none |
| adult boundary | 2008-08-10 | 18 | `YOUTH` | READY |
| adult boundary +1 | 2007-08-10 | 19 | `YOUTH` | READY |
| YOUTH midpoint | 2005-08-10 | 21 | `YOUTH` | READY |
| YOUTH upper -1 | 2003-08-10 | 23 | `YOUTH` | READY |
| YOUTH upper | 2002-08-10 | 24 | `YOUTH` | READY |
| ESTABLISHING lower | 2001-08-10 | 25 | `ESTABLISHING` | READY |
| ESTABLISHING lower +1 | 2000-08-10 | 26 | `ESTABLISHING` | READY |
| ESTABLISHING midpoint | 1996-08-10 | 30 | `ESTABLISHING` | READY |
| ESTABLISHING upper -1 | 1993-08-10 | 33 | `ESTABLISHING` | READY |
| ESTABLISHING upper | 1992-08-10 | 34 | `ESTABLISHING` | READY |
| MID_LIFE lower | 1991-08-10 | 35 | `MID_LIFE` | READY |
| MID_LIFE lower +1 / reproduced user | 1990-08-10 | 36 | `MID_LIFE` | READY |
| MID_LIFE midpoint | 1987-08-10 | 39 | `MID_LIFE` | READY |
| MID_LIFE upper -1 | 1983-08-10 | 43 | `MID_LIFE` | READY |
| MID_LIFE upper | 1982-08-10 | 44 | `MID_LIFE` | READY |
| RESTRUCTURING lower | 1981-08-10 | 45 | `RESTRUCTURING` | READY |
| RESTRUCTURING lower +1 | 1980-08-10 | 46 | `RESTRUCTURING` | READY |
| RESTRUCTURING midpoint | 1974-08-10 | 52 | `RESTRUCTURING` | READY |
| RESTRUCTURING upper -1 | 1968-08-10 | 58 | `RESTRUCTURING` | READY |
| RESTRUCTURING upper | 1967-08-10 | 59 | `RESTRUCTURING` | READY |
| SIXTY_PLUS lower | 1966-08-10 | 60 | `SIXTY_PLUS` | READY |
| SIXTY_PLUS lower +1 | 1965-08-10 | 61 | `SIXTY_PLUS` | READY |
| SIXTY_PLUS midpoint sample | 1956-08-10 | 70 | `SIXTY_PLUS` | READY |

Each age boundary must additionally be tested with birthdays one day before and one day after the fixed `asOfDate` to verify completed-year calculation.

For every valid adult row, future acceptance must assert:

- exactly one Life Stage;
- `UNKNOWN = 0`;
- six locked nodes;
- 90 ready Seeds;
- no fallback to another stage;
- deterministic first bundle and cursor;
- globally unique Candidate IDs;
- stable Candidate and bundle references across Refresh and recovery.

## 10. Required future gates

The following gates are required before Catalog migration can be declared ready:

1. five-stage age boundary gate using the matrix above;
2. `30 nodes / 450 Seeds / UNKNOWN 0` coverage gate;
3. 15 Seeds per stage-field node;
4. global ID and normalized-copy duplicate gate;
5. stage-specific editorial review gate;
6. stable reference and revision gate;
7. deterministic bundle/cursor/exclusion gate for every stage;
8. no-fallback and no-default gate;
9. Adapter innermost-reason preservation gate;
10. non-retryable Catalog absence presentation gate;
11. Forward SAFE_WITHHELD preservation gate for Identity, Intent, Growth, and Crystal;
12. full formal Reality entry browser acceptance at each stage midpoint and all age boundaries.

A single 1995 sample can only prove ESTABLISHING. It can never prove all-adult coverage.

## 11. Migration impact map

| Area | Migration impact | Decision |
| --- | --- | --- |
| Age router | none | keep exact boundaries |
| Pressure content Catalog | 360 new reviewed Seeds | content protocol required |
| Candidate source schema | none | preserve V1 |
| Candidate source implementation | catalog read expands | future migration |
| Bundle / cursor / ordering | none | preserve deterministic contracts |
| Adapter reason chain | typed in-memory extension | future migration |
| Retry presentation | resolver policy correction | future migration |
| Reality Intent | no semantic change | preserve |
| Admission | no semantic change | preserve |
| Identity / Birth / Mother Code | no causal change | preserve |
| Store / DB | none | no version bump |
| Growth / Crystal | none | preserve and withhold downstream writes on Catalog failure |
| `AWAITING_RELATIONSHIP` | LaunchLab presentation mapping | future consumer correction |

## 12. Final exit

`RED — PRODUCT CONTENT PROTOCOL PREP REQUIRED`

Rationale:

- Schema-preserving migration is technically possible after content exists.
- Current formal content does not cover four of five adult Life Stages.
- The Draft Pool is sparse by Life Stage and explicitly non-promotable.
- Deterministic routing and schemas are already correct.
- Authoring and reviewing the missing 360 stage-specific Seeds is product-content work that must precede Runtime/Catalog migration.

No Runtime construction is authorized by this audit.
