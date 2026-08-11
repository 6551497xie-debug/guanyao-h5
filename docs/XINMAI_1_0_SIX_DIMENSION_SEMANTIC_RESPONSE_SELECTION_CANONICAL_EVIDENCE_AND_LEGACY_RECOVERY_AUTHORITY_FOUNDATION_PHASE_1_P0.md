# XINMAI 1.0 Six-Dimension Semantic Response Selection Canonical Evidence and Legacy Recovery Authority Foundation — Phase 1 P0

## Verdict

`PHASE 1 FOUNDATION READY FOR CONTROL TOWER REVIEW`

- Expected parent: `3f4ccb9d86a15ecf263e7598661b82eb5db77d7a`
- Scope: authority/read foundation only
- New semantic-selection mutation: `SAFE_WITHHELD / NOT_RETRYABLE`
- Runtime consumer activation: none
- Phase 2: not started
- Counter: not created
- Push: `HOLD`

## Frozen boundary

Phase 1 adds discriminated read contracts, validators, deterministic semantic-selection references/digests, legacy recovery, and a zero-write controller skeleton. It does not connect `/dynamics`, `GravityPage`, `XinmaiLifeReflectionGuide`, Return, Crystal, Ownership, or Archive to V3. It does not create Receipt V2 or Choice V4 records.

The existing V2 writer aliases and the existing `ChoiceActionIntention` public writer union remain unchanged. V3 observation records, Receipt V2, Formation Snapshot V3, and Choice V4 are readable types only.

## Bounded semantic protocol

Grammar revision: `XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_2026_08_11_V1`

| Dimension | Allowed semantic response IDs |
| --- | --- |
| BODY | `LOCATED`, `UNLOCATED` |
| EMOTION | `CLEAR`, `MIXED`, `UNCERTAIN` |
| THOUGHT | `SENTENCE`, `FRAGMENT`, `PRIVATE` |
| ACTION | `ADVANCE`, `WITHDRAW`, `PAUSE` |
| MEMORY | `THEN`, `NOW`, `UNCERTAIN` |
| GOAL | `NEED`, `VALUE`, `UNCERTAIN` |

Total bounded IDs: 17. `PAUSED`, `SKIPPED`, `DECLINED`, `UNAVAILABLE`, raw whisper, private free text, user-entered thought text, and naming text do not become a semantic selection.

## Version contract

| Aggregate | Existing | Read-foundation addition | Phase 1 writer |
| --- | --- | --- | --- |
| Observation Item / Set | V2 / `XINMAI_SIX_DIMENSION_OBSERVATION_SET_V2` | V3 / `XINMAI_SIX_DIMENSION_OBSERVATION_SET_V3` | disabled |
| Completion Receipt | V1 | V2 | disabled |
| Choice | V3 | V4 read record | disabled |
| Formation Snapshot | V2 | V3 | disabled |

V3 items bind `dimensionId`, bounded `semanticResponseId`, immutable grammar revision, deterministic selection reference, and deterministic selection digest. Receipt V2 additionally binds all six selection references/digests and their aggregate digest. Choice V4 read validation requires the exact Receipt/protocol/grammar/aggregate binding; no Choice V4 writer exists in Phase 1.

## Database topology proof

Database remains `xinmai-lived-growth-canonical`, physical version `3`.

Nine stores remain unchanged:

1. `canonical-growth-envelope`
2. `growth-migration-meta`
3. `growth-eligibility-index`
4. `growth-formation-index`
5. `growth-crystal-projection`
6. `gravity-observation-continuity`
7. `six-dimension-observation-set`
8. `six-dimension-completion-receipt`
9. `six-dimension-command-fence`

The existing 14 indexes remain unchanged. No fourth six-dimension store, new index, delete, rename, or physical-version increment is present.

## Recovery matrix

| Input | Public read outcome | Exact selections | Write/backfill |
| --- | --- | --- | --- |
| V2 open set | `LEGACY_GENERIC_ONLY / SEMANTIC_SELECTION_NOT_RECORDED` | none | none |
| V2 complete set + Receipt V1 | `LEGACY_GENERIC_ONLY / SEMANTIC_SELECTION_NOT_RECORDED` | none; generic six-window evidence only | none |
| Valid V3 partial set | `EXACT_SUBSET` | exact persisted subset | none |
| Valid V3 complete set + Receipt V2 | `EXACT_COMPLETE` | exact six-item map | none |
| Unknown grammar | `SAFE_WITHHELD / SEMANTIC_GRAMMAR_REVISION_UNKNOWN` | none | none |
| Invalid dimension/response tuple | `SAFE_WITHHELD / SEMANTIC_RESPONSE_NOT_ALLOWED` | none | none |
| Selection/reference/digest mismatch | `SAFE_WITHHELD` with immutable typed cause | none | none |
| Mixed V2/V3 set and receipt | `SAFE_WITHHELD / MIXED_OBSERVATION_PROTOCOL_VERSIONS` | none | none |
| Missing semantic selection on observed V3 item | `SAFE_WITHHELD` | none | none |
| Unknown/corrupt discriminant | `SAFE_WITHHELD / RECOVERY_CORRUPTED` | none | none |

All failure results retain Authority-owned retryability. Recovery explicitly declares `noBackfill`, `noDefaultSelection`, and `noCurrentGrammarReinterpretation`.

## Zero-write evidence

- The only public Phase 1 command returns `SAFE_WITHHELD / MUTATION_POLICY_SAFE_WITHHELD / NOT_RETRYABLE`.
- Policy freezes `transactionWritesAllowed=false`, `receiptV2CreationAllowed=false`, and `choiceV4CreationAllowed=false`.
- The foundation controller imports no transaction store and contains no `put`, `add`, or `delete` path.
- Existing production six-dimension controller, Gravity host, and Gravity page contain no Phase 1 command or foundation import.
- Existing V2 transaction writer remains the active writer; no V3 writer alias is substituted.
- The authority gate exercises all 17 V3 bounded IDs using read-only synthetic authority records and performs no IndexedDB transaction.
- Ordinary Production UI therefore has no executable Phase 1 route capable of creating a V3 Set/Item, Receipt V2, Fence, or Choice V4 record.

## Validation evidence

### Passed

- TypeScript and Production Build: PASS
- New semantic-selection foundation gate: PASS
- Full registered lived-growth authority suite, including existing six-dimension foundation/activation/readiness, Choice, Return, Crystal, Body, Archive, and repeated-cycle gates: PASS
- 17/17 bounded semantic response IDs: valid read recovery PASS
- V2 open and V2 complete + Receipt V1 legacy recovery: PASS without inferred selections
- V3 partial and complete + Receipt V2 exact recovery: PASS
- Invalid tuple, unknown grammar, bad digest, missing selection, mixed versions, bad aggregate, and corrupt discriminant: fail-closed PASS
- Deterministic selection digest/reference and aggregate digest: PASS
- `git diff --check`: PASS
- Production browser smoke on clean hashed output: `/launch-lab` loaded from `index-C8ZyMmkZ.js` and hashed CSS; warning/error count `0`; `/@vite/client` and `/src/main.tsx` absent
- Page/component/style diff against expected parent: `0`

### Existing release baseline yellow

The repository-wide `check:release` reaches the pre-existing `check:mother-code-profile-persistence-semantics` assertion `Launch delegates profile persistence missing=writeMotherCodeProfile(motherHandoff.motherCodeProfile)`. The exact expected-parent `LaunchLab.tsx` also lacks that asserted string, and Phase 1 changes no Launch, mother-code, page, component, style, or persistence-adapter file. This is a parent-baseline gate defect, not a Phase 1 regression; it is recorded but not repaired because it is outside this blade.

## Exact implementation ownership

- Contract owner: `src/types/xinmaiSixDimensionObservation.ts`
- Semantic read-result owner: `src/types/xinmaiSixDimensionSemanticSelection.ts`
- Deterministic evidence validator/digest owner: `src/services/xinmaiSixDimensionSemanticSelectionEvidenceValidator.ts`
- Legacy/V3 recovery owner: `src/services/xinmaiSixDimensionSemanticSelectionRecoveryAdapter.ts`
- Choice V3/V4 read validator owner: `src/services/xinmaiChoiceSemanticBindingReadValidator.ts`
- Mutation policy owner: `src/services/xinmaiSixDimensionSemanticSelectionMutationPolicy.ts`
- Zero-write command skeleton: `src/services/xinmaiSixDimensionSemanticSelectionAuthorityFoundation.ts`
- Canonical snapshot reader integration: `src/services/xinmaiLivedGrowthTransactionalStore.ts`
- Existing V2 recovery compatibility adapter: `src/services/xinmaiSixDimensionObservationRecoveryAdapter.ts`
- Foundation gate: `scripts/check-xinmai-six-dimension-semantic-selection-authority-foundation.mjs`

UNKNOWN writer/controller/store/index/validator/recovery consumers: `0`.

## Findings and next boundary

- Red findings: none inside Phase 1.
- Yellow findings: repository-wide release gate has the unrelated expected-parent baseline failure documented above.
- Next legal knife, only after independent Control Tower acceptance: Phase 2 semantic-selection atomic writer/Receipt V2/Choice V4 activation with a direct-child Forward SAFE_WITHHELD Counter.
- This document does not authorize that application.
