# GUANYAO 1.0 Card Blueprint Protocol

This document locks the boundary for the 1.0 card blueprint stage.

It defines how `assetShellCandidate(ASSET_SHELL)` may enter `cardBlueprintCandidate(CARD_BLUEPRINT)`.

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
→ resolveAssetShellCandidate()
→ assetShellCandidate(ASSET_SHELL)
```

The next stage may only create a card blueprint candidate:

```text
assetShellCandidate(ASSET_SHELL)
→ resolveCardBlueprintCandidate()
→ cardBlueprintCandidate(CARD_BLUEPRINT)
```

## 2. CARD_BLUEPRINT Position

`cardBlueprintCandidate` is not a formal 64-hexagram asset card.

It is the structural blueprint layer before any formal asset card generation.

It only answers:

- which structural areas a future asset card needs;
- which content may enter the card blueprint;
- which formal fields remain forbidden;
- how the flow stays isolated from legacy `/hexagram-stamp`;
- how the future asset card avoids becoming the old hexagram page, old annular asset, or old instrument card.

It must not output:

- formal `hexagramCode`;
- formal `hexagramName`;
- formal `cardName`;
- formal card face;
- payment fields;
- collection fields;
- unlock fields;
- `route`;
- `archiveRoute`;
- `legacyRoute`.

## 3. Input

Input comes from `assetShellCandidate(ASSET_SHELL)`:

```ts
type CardBlueprintInput = {
  status: "ASSET_SHELL";
  sourceForceTranslationStatus: "FORCE_TRANSLATION";
  readiness: "NOT_READY" | "READY_FOR_CARD_BLUEPRINT";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  mappingTheme: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  shellTone: string;
  shellReason: string;
  cardBlueprintRequired: true;
  forbiddenLegacyRoute: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type CardBlueprintCandidate = {
  status: "CARD_BLUEPRINT";
  sourceAssetShellStatus: "ASSET_SHELL";
  readiness: "NOT_READY" | "READY_FOR_ASSET_RENDER_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  blueprintSections: {
    starbeastArea: boolean;
    forceThemeArea: boolean;
    pressureSeedTraceArea: boolean;
    sixNodeCompletionArea: boolean;
    imprintArea: boolean;
  };
  blueprintReason: string;
  assetRenderProtocolRequired: true;
  forbiddenLegacyRoute: true;
};
```

The output must not contain:

- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`;
- `route`;
- formal card component fields.

## 5. Blueprint Structure Principles

The future formal asset card may be separated into five candidate sections, but this protocol only defines the blueprint. It does not render UI.

### 5.1 Starbeast Area

`starbeastArea` carries:

- Four Symbols starbeast;
- seven-star core line;
- force return from this round.

### 5.2 Force Theme Area

`forceThemeArea` carries:

- `forceTheme`;
- `forcePhrase`.

### 5.3 Pressure Seed Trace Area

`pressureSeedTraceArea` carries the gentle echo of the current real-world disturbance.

It must not frame the pressure seed as guilt, diagnosis, or failure.

### 5.4 Six-Node Completion Area

`sixNodeCompletionArea` carries the completed six-node micro-tuning state.

It must not become a task checklist.

### 5.5 Imprint Area

`imprintArea` reserves space for a future asset number, hexagram code, and card name.

Current boundary:

- do not generate the formal number;
- do not generate the formal hexagram code;
- do not generate the formal hexagram name;
- do not generate the formal card name.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `assetShellCandidate.readiness !== "READY_FOR_CARD_BLUEPRINT"`, `readiness = "NOT_READY"`.
2. Only when `assetShellCandidate.readiness === "READY_FOR_CARD_BLUEPRINT"`, `readiness = "READY_FOR_ASSET_RENDER_PROTOCOL"`.
3. `assetRenderProtocolRequired` must always be `true`.
4. `forbiddenLegacyRoute` must always be `true`.

## 7. Expression Principles

`blueprintReason` must continue to obey:

- no fortune or misfortune;
- no punishment;
- no failure shame;
- no task feeling;
- no fatalistic pressure;
- no mystical fear;
- no implication that the user has already received a formal asset card;
- no implication of paid unlock;
- no implication that collection is complete.

Allowed expressions:

- "这局原力已经具备进入卡片蓝图的条件。"
- "当前只是资产卡结构蓝图。"
- "正式卡片仍需要下一层渲染协议。"
- "这张未来卡片会承载本局的星兽、原力与压力种子痕迹。"

Forbidden expressions:

- "你获得了一张卦码卡";
- "已解锁";
- "立即收藏";
- "购买";
- 大吉 / 大凶;
- 任务完成;
- 成功打卡;
- 通过考验;
- 能量不足;
- 未完成;
- 失败.

## 8. Next-Step Boundary

The next implementation step may only be:

```text
resolveCardBlueprintCandidate()
```

It may only output:

```text
cardBlueprintCandidate(CARD_BLUEPRINT)
```

It must not directly create:

- `HexagramAssetCard`;
- a formal 64-hexagram page;
- formal asset card UI;
- a commercial entry;
- a collection system;
- legacy `/hexagram-stamp`;
- old annular asset flow;
- old instrument card flow.

## 9. Acceptance

This protocol is satisfied only when:

1. `docs/GUANYAO_1_0_CARD_BLUEPRINT_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No formal 64-hexagram card is generated.
7. Build passes.
