# GUANYAO 1.0 Hexagram Asset Candidate Boundary

## 1. Current Completed Chain

The current P0 causal chain has reached the candidate boundary:

```text
selectedPressureSeedContext
→ derivePrimaryPetal()
→ currentPrimarySpaceId
→ 6节点完成态
→ starbeastFeedbackComplete
→ hexagramAssetCandidate(PENDING)
```

This means the system can now confirm that one pressure seed has entered one primary petal, passed through one six-node tuning loop, and produced a clean pending candidate for later asset crystallization.

## 2. Position Of hexagramAssetCandidate

`hexagramAssetCandidate` is not a formal hexagram card.

It is only a candidate state that says:

```text
this round already has crystallization conditions
```

It must obey these boundaries:

- It cannot generate a formal `hexagramCode`.
- It cannot output a formal hexagram name.
- It cannot route to legacy `/hexagram-stamp`.
- It cannot trigger monetization.
- It cannot become a collectible asset by itself.
- It cannot bypass the future asset generation layer.

`hexagramAssetCandidate(PENDING)` is the clean pause between six-node completion and formal 64-hexagram asset imprinting.

## 3. Missing Pieces Before Formal 64-Hexagram Asset Card

The formal 64-hexagram persona asset card still requires the following layers:

1. Stable reads for `motherCode`, `trigram`, and `fourSymbol`.
2. Combination rules for `pressureSeed`, `primaryDimension`, and `completionState`.
3. A 64-hexagram candidate mapper.
4. A force-translation language layer for turning the candidate into front-stage human language.
5. A new asset card render shell.
6. An asset sedimentation and collection strategy.

Until these pieces exist, the candidate must remain `PENDING`.

## 4. Next Minimal Generator

The next valid generator may only be a draft generator, for example:

```ts
resolveHexagramAssetDraftCandidate()
```

It may only output a draft object:

```ts
{
  status: "DRAFT";
  sourceCandidateStatus: "PENDING";
  possibleHexagramCluster;
  reason;
  forbiddenLegacyRoute: true;
}
```

This draft must not be treated as a formal asset. It exists only to bridge from a pending candidate toward a future formal card generator.

## 5. Prohibited Actions

The following are explicitly forbidden at this boundary:

- Connecting back to legacy `/hexagram-stamp`.
- Reviving the old annular asset flow.
- Reviving the old instrument/weapon card system.
- Directly generating the formal 64-hexagram card.
- Outputting fortune or misfortune judgments.
- Outputting failure, punishment, or energy-insufficiency language.
- Adding a payment entry.
- Adding a collection entry.
- Changing commercialization logic.

## 6. Expression Constraints

Candidate language may only express:

- The round has started to crystallize.
- The light of this round has been held.
- It has not yet been imprinted as a formal hexagram code.
- A later asset generator is required to complete imprinting.

Candidate language must not express:

- Successful check-in.
- Task completion.
- Passing a test.
- Great fortune or great misfortune.
- Incompletion or failure.

## 7. Acceptance

This protocol is accepted when:

1. `docs/GUANYAO_1_0_HEXAGRAM_ASSET_CANDIDATE_BOUNDARY.md` exists.
2. No `src` file is changed by this protocol knife.
3. Build passes.

## Next Knife Boundary

The next minimum implementation knife is:

```text
resolveHexagramAssetDraftCandidate()
```

It must produce only a draft candidate and keep `forbiddenLegacyRoute: true`.
