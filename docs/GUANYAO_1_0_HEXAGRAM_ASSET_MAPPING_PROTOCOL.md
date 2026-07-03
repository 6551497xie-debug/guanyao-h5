# GUANYAO 1.0 Hexagram Asset Mapping Protocol

This document locks the boundary for the 1.0 hexagram asset mapping stage.

It defines how `hexagramAssetDraftCandidate(DRAFT)` may enter `hexagramAssetMappingCandidate(MAPPING)`.

It does not define a formal 64-hexagram card.

## 1. Current Boundary

The current completed chain is:

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

The next stage may only create a mapping candidate:

```text
hexagramAssetDraftCandidate(DRAFT)
→ resolveHexagramAssetMappingCandidate()
→ hexagramAssetMappingCandidate(MAPPING)
```

## 2. MAPPING Position

`hexagramAssetMappingCandidate` is not a formal hexagram card.

It only answers:

- which candidate cluster this DRAFT may enter;
- why this candidate cluster relates to the Mother Code, primary petal, and pressure seed;
- what still needs to be pressed by a future formal asset generator.

It must not output:

- formal `hexagramCode`;
- formal `hexagramName`;
- formal `cardName`;
- payment fields;
- collection fields;
- unlock fields.

## 3. Input Fields

Input comes from `hexagramAssetDraftCandidate(DRAFT)`:

```ts
type HexagramAssetMappingInput = {
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  pressureSeedText?: string;
  possibleHexagramCluster: string;
  readiness: "NOT_READY" | "READY_FOR_ASSET_MAPPING";
};
```

## 4. Output Structure Draft

The mapping candidate structure is locked as:

```ts
type HexagramAssetMappingCandidate = {
  status: "MAPPING";
  sourceDraftStatus: "DRAFT";
  readiness: "READY_FOR_LANGUAGE_TRANSLATION" | "NOT_READY";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  possibleHexagramCluster: string;
  mappingReason: string;
  forceTranslationRequired: true;
  forbiddenLegacyRoute: true;
};
```

Rules:

- `status` must always be `"MAPPING"`.
- `sourceDraftStatus` must always be `"DRAFT"`.
- `forceTranslationRequired` must always be `true`.
- `forbiddenLegacyRoute` must always be `true`.
- If the source DRAFT is not ready, `readiness` must be `"NOT_READY"`.
- If the source DRAFT is ready, `readiness` may become `"READY_FOR_LANGUAGE_TRANSLATION"`.

## 5. Mapping Principles

This stage only maps to candidate clusters. It does not select a formal hexagram.

Primary petal mapping principles:

| Primary Petal | Candidate Cluster Principle |
| --- | --- |
| body | 稳定 / 承载 / 边界 / 身体回流候选簇 |
| emotion | 共振 / 接纳 / 情绪流动候选簇 |
| thought | 重构 / 看见 / 认知换轨候选簇 |
| behavior | 行动 / 校准 / 微动作候选簇 |
| memory | 整合 / 旧痕修复 / 记忆回收候选簇 |
| motivation | 方向 / 重新点火 / 目标再定位候选簇 |

The mapping layer may reference:

- Mother Code as the original personality imprint;
- primary petal as the dimension where the pressure landed;
- pressure seed as the external disturbance;
- six-node completion as the condition that allows mapping to begin.

The mapping layer must not turn these references into fate, judgment, or prediction.

## 6. Force Translation Requirement

`mappingReason` must use non-punitive, non-fortune, non-oppressive language.

Allowed tone:

- "这局已经具备进入资产映射的条件。"
- "当前候选簇更接近某种原力回流。"
- "仍需下一步原力语言转译。"

Forbidden tone:

- 大吉 / 大凶;
- 不利 / 凶险;
- 失败 / 未完成;
- 能量不足;
- 任务完成;
- 通过考验.

The mapping layer must keep the user emotionally held. It must not evaluate the user's worth or completion.

## 7. Next-Step Boundary

The next implementation step may only be:

```text
resolveHexagramAssetMappingCandidate()
```

It must not directly create:

- `HexagramAssetCard`;
- a formal 64-hexagram page;
- a commercial entry;
- a collection system;
- legacy `/hexagram-stamp` routing.

## 8. Absolute Prohibitions

Do not:

- connect back to legacy `/hexagram-stamp`;
- revive old annular asset flow;
- revive old instrument / weapon cards;
- generate a formal 64-hexagram card;
- output formal hexagram names;
- output fortune or misfortune judgments;
- add payment, unlock, membership, or collection fields;
- treat the pressure seed as user fault;
- treat incomplete state as failure.

## 9. Acceptance

This protocol is satisfied only when:

1. `docs/GUANYAO_1_0_HEXAGRAM_ASSET_MAPPING_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. No route is added.
4. No formal 64-hexagram card is generated.
5. Build passes.
