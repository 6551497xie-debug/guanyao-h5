# GUANYAO 1.0 Force Translation Protocol

This document locks the boundary for the 1.0 force translation stage.

It defines how `hexagramAssetMappingCandidate(MAPPING)` may enter `forceTranslationCandidate`.

It does not define or generate a formal 64-hexagram card.

## 1. Current Asset Chain

The current P0 asset chain has reached:

```text
selectedPressureSeedContext
→ derivePrimaryPetal()
→ currentPrimarySpaceId
→ 6节点完成态
→ starbeastFeedbackComplete
→ hexagramAssetCandidate(PENDING)
→ resolveHexagramAssetDraftCandidate()
→ hexagramAssetDraftCandidate(DRAFT)
→ resolveHexagramAssetMappingCandidate()
→ hexagramAssetMappingCandidate(MAPPING)
```

The next stage may only create a force translation candidate:

```text
hexagramAssetMappingCandidate(MAPPING)
→ resolveForceTranslationCandidate()
→ forceTranslationCandidate
```

## 2. FORCE TRANSLATION Position

`forceTranslationCandidate` is not a formal hexagram card.

It is the pre-asset-shell layer that translates a MAPPING candidate into GUANYAO force language.

It only answers:

- what force theme this round carries;
- what kind of personality return the user completed;
- how traditional hexagram meaning can be de-fortuned, de-punished, and de-fatalized.

It must not output:

- formal `hexagramCode`;
- formal `hexagramName`;
- formal `cardName`;
- formal card face;
- payment fields;
- collection fields;
- unlock fields;
- legacy route fields.

## 3. Input

Input comes from `hexagramAssetMappingCandidate(MAPPING)`:

```ts
type ForceTranslationInput = {
  status: "MAPPING";
  readiness: "NOT_READY" | "READY_FOR_LANGUAGE_TRANSLATION";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedText?: string;
  possibleHexagramCluster: string;
  mappingTheme: string;
  mappingReason: string;
  forceTranslationRequired: true;
  forbiddenLegacyRoute: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type ForceTranslationCandidate = {
  status: "FORCE_TRANSLATION";
  sourceMappingStatus: "MAPPING";
  readiness: "NOT_READY" | "READY_FOR_ASSET_SHELL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  mappingTheme: string;
  forceTheme: string;
  forcePhrase: string;
  translatedReason: string;
  assetShellRequired: true;
  forbiddenLegacyRoute: true;
};
```

Rules:

- `status` must always be `"FORCE_TRANSLATION"`.
- `sourceMappingStatus` must always be `"MAPPING"`.
- `assetShellRequired` must always be `true`.
- `forbiddenLegacyRoute` must always be `true`.
- If the source MAPPING is not ready, `readiness` must be `"NOT_READY"`.
- If the source MAPPING is ready, `readiness` may become `"READY_FOR_ASSET_SHELL"`.

The output must not contain:

- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`.

## 5. Force Theme Mapping

Initial coarse mapping is based on `mappingTheme`:

| Mapping Theme | Force Theme |
| --- | --- |
| BODY_STABILITY_MAPPING | 身体回流 / 稳定原力 |
| EMOTIONAL_RESONANCE_MAPPING | 情绪共振 / 接纳原力 |
| THOUGHT_REFRAME_MAPPING | 认知换轨 / 看见原力 |
| ACTION_ALIGNMENT_MAPPING | 行动校准 / 微动作原力 |
| MEMORY_INTEGRATION_MAPPING | 旧痕整合 / 回收原力 |
| MOTIVATION_REORIENTATION_MAPPING | 方向重燃 / 目标原力 |

The mapping is still not a formal card selection.

The force translation layer may translate cluster meaning into readable front-stage language, but it must not finalize a hexagram identity.

## 6. Language Principles

All force translation copy must obey:

1. No fortune or misfortune.
2. No punishment.
3. No failure shame.
4. No task feeling.
5. No fatalistic pressure.
6. No mystical fear.
7. Hold first, translate second.
8. Translate pressure into recoverable force.

Allowed expressions:

- "这局光已经形成一种可读的原力。"
- "你不是完成了任务，而是把一部分自己接了回来。"
- "当前原力还未压印成正式资产卡。"
- "下一步需要进入资产卡壳。"

Forbidden expressions:

- 大吉 / 大凶;
- 不利 / 凶险;
- 成功打卡;
- 任务完成;
- 你通过了考验;
- 你失败了;
- 能量不足;
- 命中注定.

## 7. Next-Step Boundary

The next implementation step may only be:

```text
resolveForceTranslationCandidate()
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
- generate a formal 64-hexagram card;
- output formal `hexagramCode`;
- output formal `hexagramName`;
- output formal `cardName`;
- add payment, unlock, membership, or collection fields;
- output fortune or misfortune judgments;
- treat incomplete state as failure;
- frame pressure as user fault;
- use fear to force engagement.

## 9. Acceptance

This protocol is satisfied only when:

1. `docs/GUANYAO_1_0_FORCE_TRANSLATION_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. No route is added.
4. No formal 64-hexagram card is generated.
5. Build passes.
