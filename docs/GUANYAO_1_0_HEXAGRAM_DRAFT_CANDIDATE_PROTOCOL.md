# GUANYAO 1.0 Hexagram Draft Candidate Protocol

## 1. Current Completed Chain

The current P0 asset chain has reached the draft candidate boundary:

```text
selectedPressureSeedContext
→ derivePrimaryPetal()
→ currentPrimarySpaceId
→ 6节点完成态
→ starbeastFeedbackComplete
→ hexagramAssetCandidate(PENDING)
→ resolveHexagramAssetDraftCandidate()
→ hexagramAssetDraftCandidate(DRAFT)
```

This means the system can now form a draft asset candidate after the six-node tuning loop is complete. The draft is a preparation state only.

## 2. DRAFT Position

`hexagramAssetDraftCandidate(DRAFT)` is not a formal hexagram card.

It is only a draft candidate before formal asset mapping.

It must obey these boundaries:

- It does not contain `hexagramCode`.
- It does not contain `hexagramName`.
- It does not contain `cardName`.
- It does not contain payment, unlock, or collection fields.
- It cannot route to legacy `/hexagram-stamp`.
- It cannot revive the old annular asset flow.
- It cannot revive the old instrument/weapon card system.
- It cannot be treated as a collectible asset.

`DRAFT` is the last safe staging layer before a future mapping protocol decides whether the round can become a formal 64-hexagram persona asset card.

## 3. Information Already Contained In DRAFT

The draft candidate may contain only the following information:

- `status: "DRAFT"`
- `sourceCandidateStatus: "PENDING"`
- `readiness`
- `primaryDimension`
- optional `motherCode`
- optional `trigram`
- optional `fourSymbol`
- optional `pressureSeedId`
- optional `pressureSeedText`
- `possibleHexagramCluster`
- `draftReason`
- `forbiddenLegacyRoute: true`

These fields are enough to preserve the causal trace, but not enough to produce a formal asset card.

## 4. Final Three Missing Layers Before Formal 64-Hexagram Card

The formal 64-hexagram persona asset card still requires the following final layers:

1. **Hexagram Asset Mapping Protocol**  
   Uses `motherCode`, `primaryDimension`, pressure nature, and completion state to map the draft into a candidate hexagram cluster.

2. **Force Translation Language**  
   Translates traditional hexagram meaning into non-fortune, non-punitive force language.

3. **New Asset Card Shell**  
   Renders the new 64-hexagram asset card. It must not reuse legacy `/hexagram-stamp`.

## 5. Only Allowed Next Direction

The next step may only be a document:

```text
GUANYAO_1_0_HEXAGRAM_ASSET_MAPPING_PROTOCOL.md
```

That protocol will define:

```text
hexagramAssetDraftCandidate(DRAFT)
→ hexagramAssetMappingCandidate
```

It still must not generate a formal card.

## 6. Prohibited Actions

The following are explicitly forbidden at this boundary:

- Directly generating the formal 64-hexagram card.
- Outputting a formal `hexagramCode`.
- Outputting a formal hexagram name.
- Connecting to legacy `/hexagram-stamp`.
- Reviving the old annular asset flow.
- Reviving the old instrument/weapon card system.
- Adding commercialization.
- Adding collection.
- Adding payment.
- Outputting fortune or misfortune judgments.
- Outputting failure, incompletion, or energy-insufficiency language.

## 7. Expression Constraints

Allowed expressions:

- The asset draft has formed.
- This round has imprinting conditions.
- It has not yet generated a formal hexagram code.
- It needs to enter asset mapping.

Forbidden expressions:

- Great fortune / great misfortune.
- Successful check-in.
- Task completion.
- Passing a test.
- You failed.
- Energy is insufficient.

## 8. Acceptance

This protocol is accepted when:

1. `docs/GUANYAO_1_0_HEXAGRAM_DRAFT_CANDIDATE_PROTOCOL.md` exists.
2. No `src` file is changed by this protocol knife.
3. `npm run build` passes.
