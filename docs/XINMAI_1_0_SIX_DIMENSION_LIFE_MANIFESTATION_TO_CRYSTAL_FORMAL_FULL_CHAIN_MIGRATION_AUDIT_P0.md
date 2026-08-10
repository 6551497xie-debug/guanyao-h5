# XINMAI 1.0 Six-Dimension Life Manifestation to Crystal Formal Full-Chain Migration Audit P0

## 0. Audit decision

```text
RED — SIX-DIMENSION AUTHORITY / PERSISTED EVIDENCE MIGRATION REQUIRED

Runtime application: STOPPED
Consumer-only correction: NOT SUFFICIENT
Runtime / Catalog / Birth / Identity / Relationship / Growth / Crystal / Body diff: 0
Push: HOLD
```

The formal journey cannot truthfully claim six-dimension completion today. The repository has a formal Gravity Observation Authority, but that Authority explicitly declares `noSixDimensionAuthority: true`. The six-dimension progression shown by `/dynamics` is React page state and runtime projection. It is neither a canonical record nor a recoverable, item-level typed evidence set. Recovery from a recognized Gravity observation reconstructs all six dimensions as complete, and Choice readiness later consumes the reconstructed count. A Presentation Resolver cannot repair this missing authority without inventing a second truth source.

This audit therefore stops Runtime work and freezes the minimum migration boundary required before the formal chain may continue.

## 1. Scope and frozen boundaries

Audited baseline:

- accepted parent: `4a6471ebd68a9bd46938decb78d13f0058830bdc`;
- formal continuity remote delivered to the same SHA before this audit;
- formal route: `/reality` admission into `/dynamics`, then Gravity recognition, Choice, Departure, Return, Fact, Formation, Body Imprint and Archive;
- frozen six-dimension order: `body / emotion / thought / action / memory / goal`.

Out of scope and unchanged:

- Pressure Candidate Catalog 450 and its revision/recovery contracts;
- Birth, Calendar, Hour Branch, Receipt, Identity and Relationship Authorities;
- Growth, Crystal Formation and Body Imprint Authorities;
- AI, Prompt, Audio, Haptic, monetization and Phase 4;
- visual polish, particles, material, layout redesign and report/radar UI.

`SURFACE_OUTCOME_WATCHDOG_EXPIRED` under multiple simultaneous WebGL contexts remains a separate release-robustness follow-up. It is not used to explain or conceal the six-dimension authority defect.

## 2. Current formal topology

| Layer | Current owner / consumer | Observed contract | Audit classification |
| --- | --- | --- | --- |
| Formal route | `src/pages/GravityProductionRouteEntry.tsx` | Recovers Admission, Gravity Observation Continuity, Growth summary and Body Imprint, then hosts the production surface | Formal consumer |
| Formal host | `src/components/GravityProductionSurfaceHost.tsx` | Carries typed life/observation surface outcomes into `GravityPage` | Formal consumer; no six-dimension Authority |
| Gravity surface | `src/pages/GravityPage.tsx` | Owns active dimension and completed dimension IDs in React state | Page-local presentation state |
| Six-space adapter | `src/services/guanyaoDynamicsSixSpaceProgressAdapter.ts` | Projects local state into progress; guardrails explicitly say no runtime advance, Storage write or animation control | Read-only presentation adapter |
| Cosmic runtime | `src/services/guanyaoCosmicBotanicsRuntimeEngine.ts` | Computes transient bloom/runtime projection and six-dimension visual state | Runtime/presentation projection, not persisted fact |
| Gravity continuity | `src/types/xinmaiGravityObservationContinuity.ts`; `src/services/xinmaiGravityEncounterContinuityController.ts` | Persists recognition checkpoint and provenance with `noSixDimensionAuthority: true` | Canonical Gravity Authority, explicitly not six-dimension Authority |
| Choice readiness | `src/services/guanyaoHexagramAssetCandidateResolver.ts`; `src/services/xinmaiChoicePresentationReadinessResolver.ts` | Treats `completedNodeCount >= 6` plus feedback complete as ready and builds Formation source snapshot | Downstream consumer of an unproven count |
| Choice persistence | `src/types/xinmaiChoiceActionIntention.ts` | Persists `completedNodeCount`, formation, dimension and action, but no six-item evidence references | Persisted schema lacks six-dimension proof |
| Choice validation | `src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts` | Validates count and formation alignment, not six item-level evidence | Insufficient structural proof |
| Scene graph | `src/runtime/sceneGraph.ts` | Converts a complete execution snapshot into all-dimension bloom state | Derived visual projection |

UNKNOWN production owners or consumers found in this trace: `0`.

## 3. Six audit questions

### 3.1 Does `/reality -> /dynamics` consume six dimensions one by one?

Only at the presentation layer. `GravityPage` initializes:

- `activeDimensionIndex` as local state;
- `completedDimensionIds` as local state;
- one `CORE_STAR_BLOOM` interaction for the currently displayed dimension.

That interaction calls `completeCurrentSpaceWithExistingEngine`, which completes the six internal nodes for the current presentation space, records the current dimension only in local React state, then advances to the next local dimension. Nothing in this path writes a canonical six-dimension record.

More critically, after formal Gravity Observation recovery returns `OBSERVATION_RECOGNIZED` or `CHOICE_COMMITTED`, `GravityPage` sets the active dimension to the last entry, replaces local completed IDs with all six IDs, and constructs a complete visual execution snapshot. `resolveDynamicsSixSpaceProgress` also inserts all six IDs whenever the projected engine phase is `COMPLETE`.

Therefore the formal page can reconstruct `completedSixDimensionCount = 6` from Gravity recognition or engine completion without recovering six independent user observations.

### 3.2 What is the source, typed outcome, interaction and recovery evidence for each dimension?

| Dimension | Frozen source label | Current user interaction | Current typed completed evidence | Recovery |
| --- | --- | --- | --- | --- |
| body | `DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS` | local bloom interaction | none | reconstructed locally |
| emotion | same | local bloom interaction | none | reconstructed locally |
| thought | same | local bloom interaction | none | reconstructed locally |
| action | same | local bloom interaction | none | reconstructed locally |
| memory | same | local bloom interaction | none | reconstructed locally |
| goal | same | local bloom interaction | none | reconstructed locally |

There is no canonical item outcome, evidence reference, item revision, idempotency key, item provenance or transaction receipt. The existing adapter returns a presentation projection only. Refresh, Back/Forward and multi-tab stability cannot be proven per item.

### 3.3 Does Gravity or Choice readiness depend on a page count?

Gravity recognition itself is a separate canonical Authority and correctly does not claim six-dimension ownership. However, Choice readiness indirectly depends on the page-derived count:

1. `GravityPage` derives `completedSixDimensionCount` from `sixSpaceProgress.completedSpaceCount`.
2. `guanyaoHexagramAssetCandidateResolver` declares `READY_TO_CRYSTALLIZE` when the count is at least six and feedback is complete.
3. `xinmaiChoicePresentationReadinessResolver` sends that count into a Formation source snapshot.
4. `xinmaiChoiceActionRouteGrowthProjection` and the prerequisite validator accept `completedNodeCount >= 6`.

The direct literal page gate was previously removed by a gate, but the semantic dependency still exists through the asset candidate and persisted snapshot. This is not a safe frozen-evidence consumer.

### 3.4 Is the Formation Snapshot stable and recoverable as six-dimension evidence?

No. `ChoiceFormationSourceSnapshot` contains formation, migration impact, `completedNodeCount`, primary dimension, action and asset completion state. It does not contain:

- six canonical item IDs;
- six typed user outcomes;
- a six-dimension record/receipt reference;
- evidence revision or digest;
- the source Gravity cycle binding needed to prove that the six observations belong to this life and encounter.

The snapshot can persist the number six while losing the evidence that would make six meaningful.

### 3.5 Is Archive a six-dimension report?

No, and it should remain so. Archive/Returning consumes the canonical Crystal and Body asset continuity. It looks back on formed traces rather than owning or reconstructing a six-dimension diagnostic report. No new radar, score, personality panel or six-card report is authorized.

### 3.6 Which existing assets are formal truth and which are Legacy/Lab/projection?

| Asset | Status | Allowed future role |
| --- | --- | --- |
| Gravity Observation Continuity record/controller | Formal canonical truth for Gravity recognition only | Bind the future six-dimension record to its references; do not expand its present claim silently |
| `guanyaoDynamicsSixSpaceProgressAdapter` | Formal read-only presentation adapter | Consume canonical recovered evidence after migration |
| `GravityPage` local completed IDs/index | Formal page state, not truth | Remove as an Authority input; retain only derived display state |
| Cosmic Botanics runtime and scene graph | Projection/runtime presentation | Render canonical evidence; never certify completion |
| `sixDimensionalTuningDialogue.ts` | Expression/language asset | Copy support only, not fact generation |
| Pressure Seed six-space projection registry | Registry/projection asset with no proven formal Authority consumption in this trace | May provide deterministic presentation input after explicit review; not evidence |
| `src/pages/legacy/LegacyDynamicsDormant.tsx` | Explicit Legacy | Must stay isolated |
| hard-coded `completedNodeCount: 6` in legacy/endpoint adapters | Legacy/compatibility projection | Cannot be used as formal six-dimension proof |
| `LEGACY_DYNAMICS_FLOW_ISOLATED` flag in `GravityPage` | Legacy marker still present in formal surface condition | Must be removed from truth decisions during consumer cutover |

## 4. Root cause and classification

The earliest typed breakpoint is between formal Gravity recognition and six-dimension observation evidence:

```text
Gravity Observation Continuity
  provenance.noSixDimensionAuthority = true
        |
        v
GravityPage local dimension progression
        |
        +-- refresh recovery reconstructs all six as completed
        |
        v
completedSixDimensionCount = 6
        |
        v
Choice Formation Source Snapshot stores count without evidence reference
```

Classification:

```text
FROZEN AUTHORITY / PERSISTED EVIDENCE GAP
RED MIGRATION REQUIRED
```

A consumer-only repair could stop misleading copy, but it cannot create a lawful, recoverable six-item observation history. Adding fields ad hoc to the page, local Storage or the existing Gravity record would create a second Authority or silently expand a frozen persisted contract.

## 5. Minimum canonical migration contract to freeze next

The next RED audit must freeze, but not yet implement, one canonical Six-Dimension Observation Authority with these properties:

### 5.1 Identity and lineage

- one canonical record per identity + Gravity cycle + selected Pressure Seed;
- reference to Gravity admission and Gravity observation continuity;
- explicit schema version, record reference, lineage revision and lifecycle state;
- no second page, animation or AI writer.

### 5.2 Six item evidence

Each frozen dimension must have one item entry containing at minimum:

- dimension ID: `body | emotion | thought | action | memory | goal`;
- explicit typed user outcome, including incomplete/declined semantics where product protocol requires them;
- user-action provenance, item revision and committed timestamp;
- source Gravity/Pressure references;
- idempotency identity and canonical order.

The contract must distinguish at least:

- not yet observed;
- observed/recognized through an explicit eligible interaction;
- declined or otherwise non-completing outcome;
- record unavailable/corrupt/stale/lineage mismatch.

An animation end, runtime node count, page index or recovered Gravity recognition must never synthesize an observed item.

### 5.3 Completion receipt

- completion is a derived Authority outcome only when the six canonical entries satisfy the frozen rule;
- it must expose a stable receipt/reference and revision for downstream consumption;
- it must be idempotent across Refresh, Back/Forward and multi-tab recovery;
- incomplete evidence must remain incomplete after recovery;
- no completion event may create Choice or Crystal automatically.

### 5.4 Choice and persisted schema migration

New Choice commits must reference the canonical six-dimension completion evidence, not only `completedNodeCount`.

Because `ChoiceActionIntention` and its Formation source snapshot are persisted, this requires a versioned persisted contract migration (for example, a reviewed V3 equivalent) or a separately referenced canonical proof whose reference is incorporated into the new persisted Choice version. The next audit must choose one design and prove recovery compatibility. It must not silently mutate V1/V2.

Existing V1/V2 Choice, Fact, Crystal and Body assets must remain grandfathered and read-only recoverable under their original semantics. No backfill, reinterpretation or fabricated six-item history is allowed.

### 5.5 Storage and transaction authority

The next audit must define:

- unique Store owner, object-store/version/index impact;
- atomic writer/controller and recovery adapter;
- record uniqueness and concurrency behavior;
- transaction-complete presentation boundary;
- typed unavailable, invalid, stale, conflict and safe-withheld outcomes;
- deletion/expiry/terminal semantics consistent with the existing Gravity cycle.

This document does not authorize any Store, DB, schema or writer change.

## 6. Consumer cutover after Authority approval

Only after the RED Authority/Schema audit is accepted may one atomic Runtime migration switch:

1. canonical six-dimension controller/recovery;
2. `/dynamics` Presentation Resolver/Adapter;
3. `GravityPage` display state derived from canonical recovered evidence;
4. Gravity/Choice readiness consumer;
5. versioned Choice Formation source proof;
6. route/host handoff and typed failure feedback;
7. direct gates and a Forward SAFE_WITHHELD Counter.

The cutover must remove these invalid completion inputs:

- `enginePhase === COMPLETE` implying all six observed;
- recognized Gravity observation reconstructing six completed IDs;
- page-local count certifying Choice readiness;
- hard-coded six-node compatibility paths entering the formal chain.

The page may continue to animate and show progress, but all visible completion and downstream readiness must be projections of the recovered canonical record.

## 7. Forward SAFE_WITHHELD design for the future migration

The direct-child Counter should be a single policy change that:

- pauses new canonical six-dimension record creation and new Choice progression requiring the new evidence;
- preserves read-only recovery of existing Gravity, legacy Choice, Fact, Crystal, Body and Archive assets;
- preserves already committed new-version six-dimension and Choice assets for read-only recovery;
- does not re-enable page-local six completion, automatic six reconstruction or hard-coded count fallback;
- does not change Birth, Identity, Relationship, Pressure Catalog, Growth, Crystal or Body Authorities;
- presents a truthful safe-withheld outcome instead of an inert retry.

## 8. Required migration sequence

1. RED canonical Six-Dimension Authority and persisted-schema migration audit.
2. Independent contract review, including Choice V1/V2 grandfathering and new-version recovery.
3. Atomic Authority/Store/controller implementation with direct gates.
4. Consumer cutover and removal of false completion derivations.
5. Direct-child Forward SAFE_WITHHELD Counter.
6. Static verification and full registered gates.
7. Clean hashed Production E2E evidence.

No consumer Runtime candidate should precede step 1 acceptance.

## 9. Frozen acceptance matrix for the future Runtime candidate

| Evidence | Required result |
| --- | --- |
| Clean Production origin | MID_LIFE journey reaches formal `/dynamics` without Fixture, Acceptance, query or manual Storage data |
| Six dimensions | Six labels and interactions are individually distinguishable; each produces a typed canonical item outcome |
| Incomplete state | Fewer than six canonical items never displays or persists completion |
| Recovery | Refresh, Back/Forward and multi-tab restore the same item references and revisions without duplicates |
| Gravity/Choice | Six completion yields readiness only; it does not auto-create Choice or Crystal |
| Choice proof | New Choice references the canonical six-dimension completion receipt/revision |
| Negative lived response | `NOT_ATTEMPTED` and `DECLINED` create no Fact, Crystal or new Reality |
| Positive lived response | `ATTEMPTED` or `CHANGED_RESPONSE` creates exactly one Fact, then eligible Formation, Body Imprint and Archive continuity |
| Same life | Returning, Reality and Archive reference the same canonical assets |
| Legacy | Existing V1/V2 Choice and formed assets recover without invented six-dimension evidence |
| Direct routes | Admission and lifecycle guards remain enforced |
| Viewports | 390x844 and 320x568 primary actions remain reachable, without horizontal clipping |
| Motion | Motion and native Reduced Motion express identical typed facts |
| Runtime | errors = 0 |
| Engineering | TypeScript, Production Build and all registered XINMAI Gates pass |
| Bundle hygiene | Fixture / Acceptance / AI authoring metadata executable assets = 0 |
| Counter | new creation is withheld; previously formed assets remain readable; false local completion remains disabled |

## 10. Exit and next knife recommendation

```text
RED — SIX-DIMENSION AUTHORITY / PERSISTED EVIDENCE MIGRATION REQUIRED

Next knife recommendation:
XINMAI-1.0-SIX-DIMENSION-CANONICAL-OBSERVATION-AUTHORITY-
AND-PERSISTED-EVIDENCE-MIGRATION-AUDIT-P0

Traffic light: RED
Knife type: Authority / Persisted Schema Migration Audit
Decision: CONTROL TOWER AUTHORIZATION REQUIRED
Runtime: DEFER
Push: HOLD
```

The next knife must decide the canonical record, Store/versioning, typed item outcomes, completion receipt, Choice persisted-version binding, legacy recovery and Counter contract. It must not begin by editing `GravityPage` or adding page-local persistence.
