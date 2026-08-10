# XINMAI 1.0 Pressure Candidate Five-Life-Stage 450 Schema, Revision and Runtime Semantic Binding Re-audit P0

Audit blade: `XINMAI-1.0-PRESSURE-CANDIDATE-FIVE-LIFE-STAGE-450-SCHEMA-REVISION-AND-RUNTIME-SEMANTIC-BINDING-RE-AUDIT-P0`

Audit date: `2026-08-10`

Mode: `RED / AUDIT ONLY`

Expected parent: `214b638967012526e6869ec8e2798137dd6dc8af`

Runtime / Catalog / locked Content mutation: `0 / 0 / 0`

## Audit decision

```text
C. YELLOW — 360 SEMANTIC BINDING PACK AUTHORING/REVIEW REQUIRED
```

The Runtime, persisted Candidate/Bundle/Intent/Encounter schemas, age routing and all 450 content records are sufficient to support a later atomic migration without a persisted-schema migration. The application is not yet authorized because the 360 new locked items have no independently reviewed `pressureNature` or Runtime slot binding.

This re-audit freezes four contracts:

1. `pressureNature`: conclusion **A3 — all 360 items require an item-level human-reviewed semantic binding**. The three authoring mechanics describe the form of pressure; the eight Runtime natures drive distinct downstream product behavior. They are not a one-to-one taxonomy.
2. Dual IDs: `authoringStableId` is immutable build provenance; `runtimeSeedId` is the byte-stable Runtime and persisted reference. The mapping must be explicit and bijective.
3. Revision recovery: use one immutable two-revision registry and recover by the already persisted `catalogRevision`. No Store/DB schema change, backfill or reinterpretation is needed or permitted.
4. Failure semantics: preserve an immutable typed cause chain from Candidate Source to Presentation. The envelope is ephemeral result state, not a second persisted Authority.

The next legal blade is a content/binding-only authoring and independent-review blade. It may create the 360 binding decisions, but may not change Runtime or Catalog. A compiler and Runtime Cutover remain deferred.

## 0. Re-audit evidence boundary

- HEAD was exactly the required parent before this document was created.
- The four Content Lock Manifest digests were independently recomputed and 360/360 manifest records matched source `stable_id / surface / shell / content_hash`.
- The existing ESTABLISHING Production source was parsed independently: 90 unique Runtime IDs and 90 `pressureNature` values.
- All Candidate Source, Bundle, Delivery, Route, Presentation, recovery and persistence matches were classified; `UNKNOWN = 0` for this audit scope.
- This document creates no actual binding records, compiler, generated artifact, registry, result union, Catalog data, Gate, page state or Counter.

## A. `pressureNature` semantic binding

### A.1 Current Production domain and distribution

The public type owner is `src/types/guanyaoPressureSeed.ts`:

```ts
type GuanyaoPressureNature =
  | "EVALUATION"
  | "RESOURCE"
  | "ATTACHMENT"
  | "CONTROL"
  | "OBLIGATION"
  | "BELONGING"
  | "IDENTITY"
  | "SURVIVAL";
```

Independent count of the current ESTABLISHING 90 in `src/data/guanyaoPressureSeedMatrix.ts`:

| value | count |
|---|---:|
| `EVALUATION` | 17 |
| `RESOURCE` | 16 |
| `ATTACHMENT` | 15 |
| `CONTROL` | 11 |
| `OBLIGATION` | 13 |
| `BELONGING` | 16 |
| `IDENTITY` | 0 |
| `SURVIVAL` | 2 |
| total | 90 |

`IDENTITY = 0` in the legacy 90 is a distribution fact, not permission to delete the legal enum value or a mandate to populate it in new stages.

### A.2 Actual consumption semantics

| layer | actual use | persistence / product consequence |
|---|---|---|
| Matrix Seed | required `PressureSeedMatrixSeed.pressureNature` | authoritative Runtime semantic input |
| Candidate Source | internal `GuanyaoPressureSeed` record carries nature; presentation Candidate exposes only ID/surface/shell | nature is intentionally hidden from the Candidate presentation payload, not absent from Authority |
| Bundle / Capture | Source Context retains full Seed; Capture creates `SelectedPressureSeedContext.pressureNature` | capture provenance persists IDs/revision; selected context carries nature into Gravity |
| scene binding | same-nature scoring, neighbor scoring, preferred-nature bias, intensity/confidence and tags | changes ranking/context when generic scene binding is used |
| Gravity admission / continuity | current pressure contains selected context plus Candidate revision references | same-life continuation retains the chosen pressure semantics |
| Choice Runtime adapter / resolver / validator | validates the eight-value domain; selects `PRESSURE_PROTOTYPES[pressureNature]`; `SURVIVAL` is safe-withheld | nature directly changes legal Choice route and safety outcome |
| Choice candidate | persisted `pressureProvenance.pressureNature` | later idempotency/continuity validation requires exact semantic match |
| Formation / read model | nature label and field bias enter formation/read-model adapters | affects Formation and Crystal-facing semantic inputs; it is not merely copy or analytics |
| Delivery presentation | surface/shell only | Presentation must not infer nature from text |

Therefore `pressureNature` affects Choice, safety, Formation and later same-life continuity. It does not select the age stage and does not replace `pressureField`, but it is a Runtime semantic binding with persisted downstream consequences.

### A.3 Mechanics are not natures

The four locked packs contain exactly three editorial mechanics:

- `RULE_OR_INFORMATION_GAP`
- `POWER_OR_RESOURCE_ASYMMETRY`
- `BOUNDARY_OR_COMMITMENT_BREAK`

They describe how the observable pressure occurs. The eight natures describe what kind of pressure the product carries forward. Examples that invalidate a bijection:

- a rule gap may concern evaluation, resources, belonging, obligation or identity;
- an asymmetry may concern resources, control, attachment, belonging or evaluation;
- a broken boundary/commitment may concern attachment, obligation, control, belonging or resources.

A mechanical mapping such as rule→evaluation, asymmetry→resource, break→control would collapse five legal meanings, erase current ESTABLISHING diversity, and change Choice/Formation behavior. Field-only or array-position inference has the same defect. Text classification, authoring keywords and Runtime AI are prohibited semantic Authorities.

### A.4 Frozen conclusion: A3

```text
A3. 必须360项逐条人工绑定
```

- A1 is rejected: no one-to-one semantic relation exists.
- A2 is rejected: the exception list would be open-ended and would disguise item-level decisions as a rule.
- A4 is not established: the existing eight-value domain is broad enough for the reviewed content; no item currently proves a missing public nature.
- Each item requires `sourceStableId`, `sourceContentHash`, `pressureNature`, concise `bindingReason`, independent `reviewer`, and `reviewDate`.
- The binding author must not approve the same item. Product Control review is required before compiler input status.
- Binding must not change locked `surface`, `shell`, `stable_id` or `content_hash`.
- A future Gate must reject unreviewed, missing, duplicate or out-of-domain decisions.

The 360-item binding pack is a build-time product-semantic artifact. It is not a second Runtime Catalog and never enters the Production bundle as authoring metadata.

## B. Dual ID binding

### B.1 Frozen responsibilities

| ID | responsibility | permitted consumers |
|---|---|---|
| `authoringStableId` (`PC-<STAGE>-...`) | immutable locked-content identity, provenance, review lineage, source-to-manifest consistency | compiler input, binding sidecar, build report, audit Gates only |
| `runtimeSeedId` (`<STAGE>_<FIELD>_<01..15>`) | immutable Production Seed identity and Candidate reference | Matrix/Catalog, Candidate Source, Bundle, Capture, Recognition, Gravity, Choice, recovery and persisted references |

`runtimeSeedId` is written into `GuanyaoPressureSeed.id`, Candidate `candidateReferenceId`, Candidate revision digest, Bundle references, selected-pressure IDs and persisted recognition/Choice provenance. `authoringStableId` must not be substituted into those contracts.

The old ESTABLISHING IDs already participate in Runtime and persisted references and must remain byte-for-byte unchanged.

### B.2 Current Runtime ID fact

The current Production source contains 90/90 unique IDs, exactly 15 for each field:

```text
ESTABLISHING_POWER_01..15
ESTABLISHING_INTEREST_01..15
ESTABLISHING_RELATION_01..15
ESTABLISHING_FAMILY_01..15
ESTABLISHING_SOCIAL_01..15
ESTABLISHING_EXISTENCE_01..15
```

No content hash may replace a stable ID: hashes prove content, while IDs preserve references across tooling and revisions.

### B.3 Generation and review protocol for all 450

For the 360 new items, a reviewed binding record must explicitly assign `runtimeSlot: 01..15` inside each `lifeStage + pressureField` group. The Runtime ID is then generated only as:

```text
runtimeSeedId = <lifeStage>_<pressureField>_<two-digit reviewed runtimeSlot>
```

The slot is not derived from current YAML/JSON array order, lexical surface order, content hash or page behavior. The binding pack must freeze it. Canonical compiler traversal is stage order:

```text
YOUTH → ESTABLISHING → MID_LIFE → RESTRUCTURING → SIXTY_PLUS
```

then field order:

```text
POWER → INTEREST → RELATION → FAMILY → SOCIAL → EXISTENCE
```

then reviewed `runtimeSlot` ascending.

Required build invariants:

- exactly one source stable ID ↔ one Runtime ID;
- exactly 15 slots per stage/field, complete `01..15` with no gap;
- no duplicate source ID, Runtime ID, slot or source content hash association;
- binding source hash equals the locked source and Manifest;
- a reorder in source files does not change output;
- a changed slot, ID, nature or content requires a new reviewed binding revision and fails the old digest;
- the page never generates, repairs or guesses either ID.

The legacy 90 use their existing Runtime IDs and a legacy source-reference record; they do not receive invented `PC-*` IDs.

## C. ESTABLISHING legacy grandfathering

The current 90 must be represented only as:

```text
LEGACY_PRODUCTION_BASELINE
```

Immutable evidence:

- Git blob: `114f11b36bfe93296ce5054fc9c661fed49dddc0`
- file SHA-256: `e9903ba81b7bd33ccfaad31ece8f9051dcc5e7f558aa03032d805f69c14cc7e9`
- last content commit: `f0e674931157cbfcced316ed431deb1cbea53110`

No context, mechanic, reviewer, approval, lock date or product-control history may be fabricated. A build-time discriminated provenance sidecar is sufficient:

```ts
type CatalogBuildProvenance =
  | Readonly<{
      kind: "LEGACY_PRODUCTION_BASELINE";
      sourceGitBlob: string;
      sourceFileSha256: string;
      lastContentCommit: string;
      historicalReviewClaim: "NONE";
    }>
  | Readonly<{
      kind: "PRODUCT_CONTROL_LOCKED";
      authoringStableId: string;
      contentHash: string;
      manifestDigest: string;
      bindingDecisionReferenceId: string;
    }>;
```

This union is build-time evidence and does not require a public Candidate schema change. `coverage_context` and `pressure_mechanic` also remain non-Runtime sidecar fields for the four new packs; ESTABLISHING coverage continues to be proven as six fields ×15, without fictional context/mechanic history.

A future read-only legacy manifest is allowed only as a current-state snapshot and must say explicitly that it is not historical review or lock evidence.

The sole exact shell-only pair remains:

- `PC-RESTRUCTURING-EXISTENCE-TIME_STRUCTURE-RULE_GAP-01`
- `PC-SIXTY_PLUS-EXISTENCE-TIME_STRUCTURE-RULE_GAP-01`
- shared shell: `同一小时出现两项签到`

Audit disposition: **acceptable overlap with explicit exception record**. The locked surfaces, actors, structures, IDs and full content hashes differ; the shell states a shared immediate scheduling consequence. It is not a duplicate Candidate and no locked text is changed. The exception must be cited by the binding pack and final build report.

## D. Revision-aware recovery

### D.1 Current path and defect

```text
persisted RealityPressureCandidateRevisionProof.catalogRevision
→ recoverRealityPressureSeedCandidateSource
→ resolveRealityPressureSeedCandidateSource
→ active global Catalog only
→ Candidate Source Context
→ Bundle
→ Delivery
```

The persisted recognition fact already stores `catalogRevision`, Candidate ID, Candidate revision ID, Bundle ID and Bundle revision ID. However, `recoverRealityPressureSeedCandidateSource` does not accept the persisted revision and repeatedly calls the active global resolver. After a revision switch it could no longer recover an old bundle without reinterpretation.

### D.2 Frozen revision contract

| role | revision |
|---|---|
| current immutable legacy artifact | `GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0` |
| target immutable five-stage artifact | `GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0` |

The target name is reserved by this audit, not activated.

One future owner, proposed `src/data/guanyaoPressureSeedCatalogRevisionRegistry.ts`, must hold an immutable map from revision ID to immutable artifact and declare the one active revision for new encounters. Pages and services may not duplicate the revision constant.

Rules:

- a new encounter selects the active revision once through Candidate Source and the resulting Source Context/Bundle carries it;
- recognition persists that exact revision using the existing proof;
- recovery must receive the persisted revision explicitly and select only that artifact;
- old facts use the legacy artifact; new facts use the five-stage artifact;
- Candidate IDs, Candidate revision IDs, Bundle ID and Bundle revision ID must all match the selected artifact;
- no lookup may silently fall to current, previous or adjacent stage;
- no backfill or rewrite of old Candidate, Bundle, Intent, Encounter or Choice records;
- Refresh, Back/Forward and multiple tabs recover the persisted revision and same IDs;
- an unknown revision returns `CATALOG_REVISION_UNKNOWN`;
- a known registry entry whose immutable artifact cannot load returns `CATALOG_ARTIFACT_UNAVAILABLE`;
- a record whose revision and source payload disagree returns `SOURCE_REVISION_MISMATCH`.

### D.3 Schema result

```text
Persisted schema change required: NO
Runtime registry/selector required: YES
Public/typed Runtime result contract extension required: YES
```

The needed field is already persisted in `RealityPressureCandidateRevisionProof` and Capture provenance. The recovery function input and result union must become revision-aware, but the IndexedDB/Store schema and existing facts need no migration.

Counter behavior: disabling creation under the new active revision must not remove either artifact. Both old-revision and already-formed new-revision records remain read-only recoverable. The Counter may switch one creation policy flag, but may not restore ESTABLISHING fallback or reinterpret new records through the legacy artifact.

## E. Lossless typed failure envelope

### E.1 Current folding matrix

| layer | current inner result | current outer replacement / retained detail | loss |
|---|---|---|---|
| Candidate Source | e.g. `CANDIDATE_BUNDLE_NOT_AVAILABLE` | exact source reason | none at source |
| Delivery Session / Orchestrator | source not ready | `CANDIDATE_SOURCE_NOT_READY` | exact Candidate Source cause discarded |
| Activation Delivery bridge | orchestration blocked | `DELIVERY_ORCHESTRATION_NOT_READY` plus only orchestration reason | original source cause unavailable |
| Route bridge | delivery bridge blocked | `DELIVERY_ORCHESTRATION_NOT_READY` plus only bridge reason | deeper chain unavailable |
| Route/Host | not ready | `DELIVERY_UNAVAILABLE` / generic guard reason | delivery semantics flattened |
| Launch/Presentation | protected holding copy and generic retry | user cannot distinguish missing Catalog, lifecycle wait or invalid source | retryability guessed from visible state |

### E.2 Frozen TypeScript recommendation

```ts
type RealityPressureFailureCode =
  | "STAGE_NOT_IN_CATALOG"
  | "CATALOG_REVISION_UNKNOWN"
  | "CATALOG_ARTIFACT_UNAVAILABLE"
  | "SOURCE_INVALID"
  | "SOURCE_REVISION_MISMATCH"
  | "RUNTIME_ID_BINDING_MISSING"
  | "PRESSURE_NATURE_BINDING_MISSING"
  | "BUNDLE_BUILD_CONFLICT"
  | "DELIVERY_NOT_READY"
  | "INTENT_NOT_READY"
  | "ADMISSION_NOT_READY"
  | "LIFECYCLE_NOT_READY";

type RealityPressureFailureStage =
  | "CATALOG_SELECTOR"
  | "CANDIDATE_SOURCE"
  | "BUNDLE_BUILDER"
  | "DELIVERY_ORCHESTRATOR"
  | "ROUTE_HOST"
  | "INTENT"
  | "ADMISSION"
  | "LIFECYCLE";

type RealityPressureRetryability =
  | "IMMEDIATE"
  | "AFTER_AUTHORITY_CHANGE"
  | "RETURN_TO_TRUSTED_ENTRY"
  | "NOT_RETRYABLE";

type RealityPressureFailureEnvelope = Readonly<{
  schemaVersion: "XINMAI_REALITY_PRESSURE_FAILURE_ENVELOPE_V1";
  terminalCode: RealityPressureFailureCode;
  retryability: RealityPressureRetryability;
  causeChain: readonly Readonly<{
    stage: RealityPressureFailureStage;
    code: RealityPressureFailureCode;
  }>[]; // innermost first; outer layers append, never replace
  catalogRevision: string | null;
  presentationKey:
    | "CATALOG_COVERAGE_UNAVAILABLE"
    | "CATALOG_VERSION_UNAVAILABLE"
    | "LIFE_SOURCE_NEEDS_RECOVERY"
    | "REALITY_ENTRY_STILL_COORDINATING"
    | "REALITY_ENTRY_UNAVAILABLE";
}>;
```

Existing detailed Intent/Admission/Lifecycle reasons remain their own typed unions. An adapter may translate each into the corresponding envelope code while retaining the original typed result beside the envelope; it must not overwrite it with a Catalog cause.

Contract rules:

- innermost cause is immutable; every outer layer can append its stage/outcome only;
- Authority determines retryability; Presentation never infers it from a button or copy;
- Catalog stage/revision/binding absence is not immediately retryable;
- transient delivery/lifecycle coordination may be immediately retryable only when the producing controller says so;
- the envelope is returned in memory through Source→Bundle→Delivery→Route/Host→Resolver and is not persisted as a fact;
- public DOM exposes only stable presentation state and allowed action, not internal IDs, digests or raw cause codes;
- tests may inspect the typed result directly; logs must redact source references and user-linked identifiers;
- no page-local boolean may become a second failure Authority.

All listed consumers must switch atomically: Candidate Source result, Delivery Session result, Delivery Orchestrator result, Activation bridge result, Route bridge result, Reality Route/Host input, Reality-entry Presentation Resolver and their direct Gates.

## F. Presentation semantic correction

### F.1 `AWAITING_RELATIONSHIP` root

The unique current erroneous root is the inline Launch state mapping in `src/pages/LaunchLab.tsx`:

```text
returningLifeWhisperRealityIntentReady ? READY : AWAITING_RELATIONSHIP
```

It conflates Reality Intent/Delivery readiness with Relationship availability. Relationship Authority is not the defect and must not change.

### F.2 Frozen repair boundary

The future unique semantic owner is one read-only Presentation Resolver, proposed:

```text
src/services/xinmaiRealityEntryPresentationResolver.ts
```

It consumes existing Relationship readiness plus the typed Reality-pressure failure envelope and produces one formal presentation state/action. `LaunchLab.tsx` and `RealityProductionRouteEntry.tsx` become wiring consumers only; they do not reinterpret Authority results.

Required mappings:

- Relationship `AVAILABLE` must never render `AWAITING_RELATIONSHIP`.
- missing stage/revision/binding renders a short product-availability explanation and permits only truthful actions such as returning to the trusted entry or leaving the life asset intact; no fake “继续这一轮”.
- an Authority-marked retryable coordination state may show a retry that calls the existing idempotent recovery path and visibly changes typed state.
- Delivery `READY` enters formal `/reality` and removes all protective copy.
- Direct `/reality` Admission protection remains unchanged.

No Relationship Controller, Identity Authority, Reality Intent Authority or age resolver may be modified for this correction.

## G. Deterministic compiler and binding artifact

### G.1 Compiler decision

```text
Deterministic build compiler required: YES
Compiler authorized in this blade: NO
Runtime compiler / Runtime AI dependency: 0
```

After the 360 binding pack is independently accepted, the compiler contract is:

**Inputs**

- four locked source record sets;
- four matching Content Lock Manifests and declared digests;
- accepted 360-item semantic/Runtime-ID binding pack;
- read-only `LEGACY_PRODUCTION_BASELINE` snapshot and its current 90 Production records;
- accepted shell-overlap exception record.

**Outputs**

- immutable revisioned Production Catalog artifact;
- build-time provenance/binding sidecar;
- deterministic build report and digests.

**Canonicalization**

- stage order and field order from Part B;
- explicit reviewed Runtime slot order;
- UTF-8 source strings with locked byte content;
- digest over revision plus ordered `runtimeSeedId / stage / field / pressureNature / surface / shell / source content hash`.

**Fail closed**

- Manifest or source digest mismatch;
- missing/duplicate source ID, Runtime ID, slot or binding;
- unreviewed pressure nature or invalid enum value;
- source text/hash drift;
- incomplete 90-item stage, 15-item field or 30-item mechanic audit;
- unexpected exact/normalized duplicate or unaccepted shell overlap;
- generated artifact or sidecar digest drift;
- Draft/SAMPLE/PACK_DRAFT, AI assistance metadata or review documents selected for Runtime output.

The compiler is a build tool, not a Catalog Authority: it may only transform and reject accepted inputs. It is excluded from the Production bundle. The generated immutable artifact is committed to Git and a Gate must reproduce and compare it byte-for-byte. Drafts, review reports, authoring metadata and AI assistance fields never enter the browser bundle.

## H. Final migration delivery topology

### H.1 Frozen refs and ancestry

| role | SHA / relationship |
|---|---|
| remote formal continuity | `fca72d1b628dee4f34c484559689ac8de4269cf6` |
| Birth presentation Candidate | `b4387b45c988612175b0ab0e9d504c449abf7d49`, descendant of formal |
| formal-chain Integration Candidate | `04c3252f2662ab71c032a7f07658d5af73e8554d`, descendant of Birth |
| content lock HEAD | `68a4ac2da92f9544b0c8954de9b32be53f5b974f`, descendant of Integration |
| prior 450 audit / this parent | `214b638967012526e6869ec8e2798137dd6dc8af`, descendant of content locks |
| formal ↔ content merge-base | exactly `fca72d1b628dee4f34c484559689ac8de4269cf6` |
| formal…content ahead/behind | `0 / 35`; linear, not divergent |

The future application ancestry must contain `b4387b45`, `04c3252f`, all four locks, this audit and the independently accepted binding pack. Birth Counter `e796e6a…` and formal-chain Counter `95f857c0…` are sibling branches and must not enter.

No Cutover parent is authorized by this RED audit. Parent rules:

1. the 360 binding authoring/review blade is a docs/data-only direct descendant of this audit commit;
2. the eventual Runtime Cutover Candidate is a direct child of the independently accepted binding/audit HEAD;
3. its Counter is the direct child of that Candidate;
4. if remote formal HEAD is still `fca72d1`, delivery remains a possible non-force fast-forward after acceptance;
5. if remote formal HEAD changes, do not merge/rebase/cherry-pick ad hoc. Create a separately authorized Current-HEAD Atomic Recomposition Prep, reproduce the enumerated ancestry/diffs on the new formal HEAD as an atomic candidate, and re-run topology and evidence review;
6. force push and Counter ancestry are always forbidden.

## I. Future Runtime atomic migration scope

Only after the 360 binding pack is independently accepted may one atomic application include:

1. delivery of locked content sources as compiler inputs, without Runtime YAML/JSON loading;
2. deterministic compiler and committed generated revision artifacts;
3. build-time provenance/binding sidecar and drift Gates;
4. immutable two-revision registry and active-revision selector;
5. Candidate Source revision selection and revision-aware recovery;
6. reviewed `pressureNature` and Runtime-ID binding consumption;
7. lossless typed cause envelope through Delivery Session, Orchestrator and bridges;
8. Reality Route/Host typed handoff;
9. the single Reality-entry Presentation Resolver and wiring corrections in Launch/Route entry;
10. age-stage, 450 coverage, ID, revision, recovery, failure, bundle and bundle-hygiene Gates;
11. a direct-child Counter implementing only the reviewed new-creation policy switch while retaining both revision artifacts for read-only recovery.

Explicitly excluded:

- visual refinement, material, particles or motion polish;
- Audio or Haptic;
- AI, Prompt or Runtime content generation;
- Birth/Identity/Relationship/Reality Authority changes;
- Growth, Crystal or Body Imprint changes;
- age boundary/routing changes or ESTABLISHING fallback;
- Candidate/Bundle public shape changes, persisted schema changes or Phase 4.

## J. 450 integrity and validation record

### J.1 Locked content evidence

| stage | items | recomputed Manifest digest | source match |
|---|---:|---|---:|
| MID_LIFE | 90 | `sha256:53a90d7aa60ea7b4850d58fd23e7ad40e8f7751d7ab11b836229e2cf11430b56` | 90/90 |
| YOUTH | 90 | `sha256:4978cf1b39338fe1a71e4d30079a96086574b0a6bd4b2d9c989d7ebed0a0b725` | 90/90 |
| RESTRUCTURING | 90 | `sha256:45f9b9febc4b4eae00499679241e2fdd18617ef9744da83c555f9e1b25da33d6` | 90/90 |
| SIXTY_PLUS | 90 | `sha256:d9d44e698ca5c22aa4b35fe7bde48550c37d8e653fc0b7fc1005bcf0c87a27fe` | 90/90 |

Combined matrix:

- 450 active items; stage count 90 each;
- each stage six fields ×15;
- four new stages each three mechanics ×30 and 30 contexts ×3;
- combined stable-ID collisions: 0;
- combined stored/computed content-hash conflicts: 0;
- exact and normalized surface conflicts: 0;
- shell-only exact overlaps: one accepted-review-required pair documented in Part C;
- existing Runtime ID collisions: 0; ESTABLISHING six prefixes ×15;
- age-stage coverage records classified: `UNKNOWN = 0`.

### J.2 Required future Runtime acceptance matrix

- five stages: one clean Production forward journey each; current 1990 MID_LIFE user enters Reality;
- all five return Candidate Source/Bundle/Delivery `READY` under target revision;
- same Identity + Encounter + Revision yields the same IDs and bundle across Refresh, Back/Forward and multiple tabs;
- old ESTABLISHING recognition restores through legacy revision byte-for-byte;
- Direct `/reality` cannot bypass Admission;
- missing stage, unknown revision, unavailable artifact, source mismatch, ID binding absence, nature binding absence and bundle conflict each produce the exact typed cause and truthful action;
- non-retryable Catalog defects show no fake retry; retryable lifecycle outcomes visibly call idempotent recovery;
- Counter blocks only new creation under target policy while both revisions remain recoverable;
- TypeScript, Production Build and complete XINMAI Gates pass;
- Production bundle contains Fixture/Acceptance/Draft/Vite client/source entry executable assets = 0;
- Runtime errors = 0;
- 390×844, 320×568, Motion and native Reduced Motion evidence pass.

## K. Risk lights and next blade

### Yellow — binding content required

- 360 `pressureNature` decisions are absent.
- 360 explicit Runtime slots/IDs and binding reasons are absent.
- author and independent reviewer separation must be enforced.

These are product-semantic binding records, not Runtime code. They block compiler/application but do not require a persisted schema change.

### Red conditions retained for future blades

- any item proves the eight-value `pressureNature` domain insufficient;
- any accepted binding requires changing locked content/hash;
- any persisted record is found without enough revision data for deterministic old recovery;
- any proposed application needs a Store/DB version, Candidate/Bundle public schema or age-route change;
- formal continuity diverges and no Current-HEAD recomposition is authorized.

Any of these returns to RED; no fallback is allowed.

### Recommended next blade

```text
XINMAI-1.0-PRESSURE-CANDIDATE-
FOUR-LOCKED-PACK-360-RUNTIME-SEMANTIC-
AND-DUAL-ID-BINDING-PACK-AUTHORING-AND-REVIEW-P0

YELLOW / BINDING DATA ONLY
```

It should freeze the 360 item-level `pressureNature`, `runtimeSlot`, `runtimeSeedId`, reason and independent-review lineage, with representative calibration before full review if Product Control requires it. It must not create a compiler, generated Catalog, Runtime union or page correction.

## Final control statement

```text
pressureNature: A3 — 360 ITEM-LEVEL INDEPENDENT BINDING REQUIRED
dual ID: EXPLICIT IMMUTABLE BIJECTION REQUIRED
legacy: LEGACY_PRODUCTION_BASELINE / NO FABRICATED PROVENANCE
revision recovery: RUNTIME REGISTRY/SELECTOR REQUIRED / PERSISTED SCHEMA CHANGE = NO
failure semantics: LOSSLESS EPHEMERAL TYPED CAUSE CHAIN REQUIRED
compiler: REQUIRED AFTER BINDING ACCEPTANCE / NOT CREATED
presentation: ONE REALITY-ENTRY PRESENTATION RESOLVER / RELATIONSHIP AUTHORITY UNCHANGED
Runtime diff: 0
Catalog diff: 0
locked Content diff: 0
Push: HOLD

EXIT:
C. YELLOW — 360 SEMANTIC BINDING PACK AUTHORING/REVIEW REQUIRED
```
