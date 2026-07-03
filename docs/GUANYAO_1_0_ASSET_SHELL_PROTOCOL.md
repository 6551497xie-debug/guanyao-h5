# GUANYAO 1.0 Asset Shell Protocol

This document locks the boundary for the 1.0 asset shell stage.

It defines how `forceTranslationCandidate(FORCE_TRANSLATION)` may enter `assetShellCandidate`.

It does not define a formal 64-hexagram asset card and does not connect to UI.

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
→ resolveForceTranslationCandidate()
→ forceTranslationCandidate(FORCE_TRANSLATION)
```

The next stage may only create an asset shell candidate:

```text
forceTranslationCandidate(FORCE_TRANSLATION)
→ resolveAssetShellCandidate()
→ assetShellCandidate
```

## 2. ASSET SHELL Position

`assetShellCandidate` is not a formal 64-hexagram card.

It is the card-shell preparation layer before any formal asset card generation.

It only answers:

- what kind of shell the future asset card needs;
- which fields are already safe to carry into the shell;
- which fields remain forbidden;
- how the flow stays isolated from legacy `/hexagram-stamp`.

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

Input comes from `forceTranslationCandidate(FORCE_TRANSLATION)`:

```ts
type AssetShellInput = {
  status: "FORCE_TRANSLATION";
  readiness: "NOT_READY" | "READY_FOR_ASSET_SHELL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedText?: string;
  mappingTheme: string;
  forceTheme: string;
  forcePhrase: string;
  translatedReason: string;
  assetShellRequired: true;
  forbiddenLegacyRoute: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type AssetShellCandidate = {
  status: "ASSET_SHELL";
  sourceForceTranslationStatus: "FORCE_TRANSLATION";
  readiness: "NOT_READY" | "READY_FOR_CARD_BLUEPRINT";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  shellTone: string;
  shellReason: string;
  cardBlueprintRequired: true;
  forbiddenLegacyRoute: true;
};
```

Rules:

- `status` must always be `"ASSET_SHELL"`.
- `sourceForceTranslationStatus` must always be `"FORCE_TRANSLATION"`.
- `cardBlueprintRequired` must always be `true`.
- `forbiddenLegacyRoute` must always be `true`.
- If the source FORCE_TRANSLATION is not ready, `readiness` must be `"NOT_READY"`.
- If the source FORCE_TRANSLATION is ready, `readiness` may become `"READY_FOR_CARD_BLUEPRINT"`.

The output must not contain:

- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`;
- `route`.

## 5. Shell Theme Principles

Initial shell direction is based on `forceTheme` and `primaryDimension`:

| Force Theme | Shell Direction |
| --- | --- |
| 身体回流 | 稳定壳 / 承载壳 / 身体回流壳 |
| 情绪共振 | 接纳壳 / 共振壳 / 情绪流动壳 |
| 认知换轨 | 看见壳 / 重构壳 / 思想转向壳 |
| 行动校准 | 微动作壳 / 行动壳 / 校准壳 |
| 旧痕整合 | 回收壳 / 整合壳 / 记忆修复壳 |
| 方向重燃 | 方向壳 / 点火壳 / 动机重启壳 |

The shell stage remains coarse-grained.

It may prepare the shape and tone of a future asset card, but it must not finalize the card.

## 6. Expression Principles

`shellReason` must continue to obey:

- no fortune or misfortune;
- no punishment;
- no failure shame;
- no task feeling;
- no fatalistic pressure;
- no mystical fear;
- no implication that the user has already received a formal asset card;
- no implication of paid unlock.

Allowed expressions:

- "这局原力已经具备卡壳条件。"
- "还需要进入正式卡片蓝图。"
- "当前只是资产壳准备层。"
- "未来卡片会承载这一局的原力。"

Forbidden expressions:

- "你获得了一张卦码卡";
- "已解锁";
- "立即收藏";
- "购买";
- 大吉 / 大凶;
- 任务完成;
- 成功打卡;
- 通过考验.

## 7. Next-Step Boundary

The next implementation step may only be:

```text
resolveAssetShellCandidate()
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
- add route fields;
- imply the card is already obtained;
- output fortune or misfortune judgments.

## 9. Acceptance

This protocol is satisfied only when:

1. `docs/GUANYAO_1_0_ASSET_SHELL_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. No route is added.
4. No formal 64-hexagram card is generated.
5. Build passes.
