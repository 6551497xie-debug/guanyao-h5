# XINMAI 1.0 Six-Dimension Response Map / Micro-Action Causal Explanation / Value Closure — Part 0

## Decision

```text
Traffic light: RED
Runtime application: STOPPED BEFORE EDIT
Decision: RE-AUDIT REQUIRED
Expected parent: 51e65d01e0e12bcdfd611301ec80a7c377234e07
Runtime / CSS / Store / Schema / Writer diff: 0
Push: HOLD
```

The authorized consumer-only cutover cannot lawfully produce the requested response map or the micro-action causal sentence. The canonical six-dimension authority proves that six dimension items were explicitly observed, but it does not preserve the semantic response selected inside each dimension. A read-only resolver therefore cannot recover “what I just selected”, the action impulse, or the protected need after refresh.

The blade's explicit stop condition applies: continuing would require inventing a page-local truth, inferring facts from presentation state, or expanding persisted Authority.

## 1. Topology and frozen boundary

- Checked-out parent: `51e65d01e0e12bcdfd611301ec80a7c377234e07`.
- Branch: `codex/xinmai-1-0-six-dimension-response-map-value-closure-p0`.
- The accepted repeated-cycle lifecycle and no-fact corrective are ancestors of this parent and remain untouched.
- No Runtime Candidate or Counter was created because there is no lawful consumer-only Candidate to counter.
- The current public six-dimension protocol remains `XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2`.

## 2. Earliest typed break

### Required user fact

The product contract requires the user to recover:

- the exact body response they selected;
- emotion clarity/quality;
- the first thought form;
- the first action impulse;
- then/now familiarity;
- the protected need/value;
- and a causal sentence using the exact action impulse and protected need.

### Canonical fact actually persisted

`CanonicalSixDimensionObservationItem` stores only:

- `dimensionId`;
- `state`;
- `sourceReferenceId` and `outcomeReferenceId`;
- one generic `acknowledgement` (`PRESENT`, `ABSENT`, or `UNCERTAIN`);
- revisions, command reference, timestamps, and terminal reason.

It has no `semanticResponseId`, response grammar revision, selected label/mirror, or selection digest. `SixDimensionCompletionReceipt` binds only item outcome references and aggregate digests. `ChoiceFormationSourceSnapshotV2` binds only the completion Receipt/set revision/protocol/content/evidence digests. None of these structures can identify the selected response.

### Loss at the write boundary

`XinmaiLifeReflectionGuide` owns `selectedResponse` only as React component state. A dimension change clears it. The component sends only one of two presentation callbacks (`onConfirm` or `onSelfName`) before the final action. `GravityPage.handleSpatialInteraction` then calls the canonical writer with the hard-coded acknowledgement `IMPACT_RECOGNIZED_PRESENT`.

Consequently, distinct user choices collapse to the same persisted fact:

| Dimension | Distinct visible selections that may be saved | Persisted distinction |
|---|---|---|
| BODY | `LOCATED`, `UNLOCATED` | both become `OBSERVED + IMPACT_RECOGNIZED_PRESENT` |
| EMOTION | `CLEAR`, `MIXED`, `UNCERTAIN` | all become the same canonical value |
| THOUGHT | `SENTENCE`, `FRAGMENT`, `PRIVATE` | all become the same canonical value; raw text is correctly not persisted |
| ACTION | `ADVANCE`, `WITHDRAW`, `PAUSE` after returning to a savable choice | the saved choice cannot be distinguished; `ADVANCE` and `WITHDRAW` are certainly identical |
| MEMORY | `THEN`, `NOW`, `UNCERTAIN` | all become the same canonical value |
| GOAL | `NEED`, `VALUE`, `UNCERTAIN` | all become the same canonical value |

The command reference encodes the generic acknowledgement, not the semantic response ID. The item source reference encodes only observation set, dimension, and protocol revision. The outcome reference is derived from the command reference and therefore cannot recover information that the command never contained.

This is irreversible information loss, not a missing presentation mapping.

## 3. Recovery counterexample

Two users can generate byte/semantic-equivalent canonical evidence while making opposite visible choices:

1. User A selects ACTION `ADVANCE`.
2. User B selects ACTION `WITHDRAW`.
3. Both explicitly activate the same final acknowledgement.
4. Both canonical items become `OBSERVED / IMPACT_RECOGNIZED_PRESENT`.
5. After refresh, a read-only resolver receives no fact that distinguishes A from B.

The requested sentence — “因为你先出现了【行动冲动】，同时在保护【重要需要】……” — cannot choose either impulse without guessing. The same ambiguity exists between GOAL `NEED`, `VALUE`, and `UNCERTAIN`.

Safe-withholding every concrete map would also fail the blade's positive requirement that a completed, explicit six-dimension journey show what the user selected. It may be an acceptable legacy fallback, but it cannot be the sole new-product result.

## 4. Owner and consumer inventory (UNKNOWN = 0)

### Semantic selection presentation owner

- Grammar: `src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts`.
- Response type: `src/types/xinmaiSixDimensionSemanticChoreography.ts`.
- Ephemeral selected response: `src/components/XinmaiLifeReflectionGuide.tsx`.
- Per-dimension scene and final action coordination: `src/pages/GravityPage.tsx` (`CosmicBotanicsField` and `handleSpatialInteraction`).

### Canonical command/writer owner

- Consumer bridge: `src/components/GravityProductionSurfaceHost.tsx`.
- Authority/controller: `src/services/xinmaiSixDimensionObservationAuthorityController.ts`.
- Evidence/reference/digest validator: `src/services/xinmaiSixDimensionObservationEvidenceValidator.ts`.
- Recovery reader: `src/services/xinmaiSixDimensionObservationRecoveryAdapter.ts`.
- Canonical types and stores: `src/types/xinmaiSixDimensionObservation.ts` and the existing lived-growth transaction/store implementation.

### Downstream readers

- Gravity/Choice readiness: `src/pages/GravityPage.tsx`, `src/services/xinmaiChoicePresentationReadinessResolver.ts`.
- Choice validation and persistence: `src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts`, `src/services/xinmaiChoiceActionIntentionController.ts`, `src/services/xinmaiChoiceActionRouteGrowthProjection.ts`.
- Persisted Choice V3 snapshot: `src/types/xinmaiChoiceActionIntention.ts`.
- Growth transaction consistency: `src/services/xinmaiLivedGrowthTransactionalStore.ts`.
- Return/no-fact consumer: `src/components/XinmaiLivedResponseReturnSurface.tsx`.
- Crystal/Ownership read-only presentation: `src/services/xinmaiCrystalOwnershipPresentationResolver.ts`, `src/components/XinmaiCrystalFormationOwnershipMoment.tsx`.
- Next-cycle consumer: `src/services/xinmaiPostOwnershipNextRealityCycleController.ts`, `src/pages/PersonalityRingPage.tsx`, and the LaunchLab returning surface.
- Relationship naming surface: `src/pages/LaunchLab.tsx`; it is not canonical six-dimension evidence and cannot fill this gap.

No additional Runtime consumer of the selected semantic response was found. The selection exists only in the mounted presentation component.

## 5. What is feasible without Authority change

The following requested changes remain consumer-feasible in isolation:

- remove naming as a Return/no-fact/next-cycle exit while keeping optional relationship/Ownership personalization;
- improve the already typed NOT_ATTEMPTED and USER_REJECTED_RECORD actions;
- show the existing `ChoiceActionIntention.actionSummary` at Return and Ownership;
- keep the accepted post-Ownership fresh Reality command;
- present existing Formation/Crystal facts without claiming improvement.

They were deliberately not implemented because the authorization requires one atomic value-closure cutover and forbids partial exposure. Implementing only these pieces would leave the central response-map and causal-explanation promise false.

## 6. Required re-audit boundary

Recommended next knife:

```text
XINMAI-1.0-SIX-DIMENSION-SEMANTIC-RESPONSE-SELECTION-
CANONICAL-EVIDENCE-CHOICE-BINDING-AND-LEGACY-RECOVERY-
MIGRATION-RE-AUDIT-P0

Traffic light: RED / AUDIT ONLY
```

The audit must decide, before any Runtime work:

1. Whether a future canonical item command may carry an audited `semanticResponseId` plus immutable grammar revision and selection digest.
2. Whether this is a new observation protocol/schema version and whether DB version or Store record validation changes are required.
3. How completion Receipt and Choice formation bind the semantic selection digest without creating a second Authority.
4. How existing V2 completed sets and Choice V3 assets remain read-only grandfathered with `SEMANTIC_SELECTION_NOT_RECORDED`, with no backfill or inference.
5. Whether old completions receive a truthful generic six-window summary while new-version completions may receive an exact response map.
6. Idempotency, stale-tab, multitab, digest, corruption, and downgrade rules.
7. A direct-child SAFE_WITHHELD policy for new semantic-selection mutations.

The audit must not authorize raw whisper/private free-text persistence. A bounded response ID is sufficient to answer the current product need if independently reviewed.

## 7. Verification

- Runtime files changed: 0.
- CSS/Page/Gate files changed: 0.
- DB/Store/Index/Schema/Writer changes: 0.
- Canonical six IDs, Observation Set, Receipt, Choice V3, Fact, Crystal, Body Imprint: zero drift.
- Pressure Catalog, Birth, Identity, Relationship, naming Authority, repeated-cycle lifecycle: zero drift.
- Runtime Candidate: not created.
- Counter: not created.
- Push: HOLD.

## Exit

```text
RED — RE-AUDIT REQUIRED

The current canonical evidence cannot legally produce the requested exact
six-dimension response map or action/need causal explanation.
```
