# GUANYAO 1.0 Asset Render Protocol

This document locks the boundary for the 1.0 asset render candidate stage.

It defines how `cardBlueprintCandidate(CARD_BLUEPRINT)` may enter `assetRenderCandidate(ASSET_RENDER_CANDIDATE)`.

It does not define a formal 64-hexagram asset card, does not connect to UI, and does not add any route.

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
→ resolveCardBlueprintCandidate()
→ cardBlueprintCandidate(CARD_BLUEPRINT)
```

The next stage may only create an asset render candidate:

```text
cardBlueprintCandidate(CARD_BLUEPRINT)
→ resolveAssetRenderCandidate()
→ assetRenderCandidate(ASSET_RENDER_CANDIDATE)
```

## 2. ASSET_RENDER_CANDIDATE Position

`assetRenderCandidate` is still not a formal 64-hexagram asset card.

It is the render candidate layer before any formal card generation.

It only answers:

- how a future asset card should be prepared for rendering;
- how the five blueprint sections enter render preparation;
- which visual and text materials are available for render candidacy;
- which formal fields remain forbidden;
- how the flow stays isolated from legacy `/hexagram-stamp`.

It must not output:

- formal `hexagramCode`;
- formal `hexagramName`;
- formal `cardName`;
- formal card face;
- formal asset ID;
- payment fields;
- collection fields;
- unlock fields;
- `route`;
- `archiveRoute`;
- `legacyRoute`.

## 3. Input

Input comes from `cardBlueprintCandidate(CARD_BLUEPRINT)`:

```ts
type AssetRenderInput = {
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

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type AssetRenderCandidate = {
  status: "ASSET_RENDER_CANDIDATE";
  sourceCardBlueprintStatus: "CARD_BLUEPRINT";
  readiness: "NOT_READY" | "READY_FOR_FINAL_ASSET_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  renderBlocks: {
    starbeastRenderBlock: boolean;
    forceThemeRenderBlock: boolean;
    pressureSeedTraceRenderBlock: boolean;
    sixNodeCompletionRenderBlock: boolean;
    imprintRenderBlock: boolean;
  };
  renderTone: string;
  renderReason: string;
  finalAssetProtocolRequired: true;
  forbiddenLegacyRoute: true;
};
```

The output must not contain:

- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `finalAssetId`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`;
- `route`;
- formal React component fields.

## 5. Render Candidate Principles

`renderBlocks` must only correspond to the five blueprint sections. It must not add formal card fields.

### 5.1 Starbeast Render Block

`starbeastRenderBlock` comes from `starbeastArea`.

It prepares the future starbeast area for rendering.

It must not create a new starbeast engine or overwrite the existing starbeast feedback chain.

### 5.2 Force Theme Render Block

`forceThemeRenderBlock` comes from `forceThemeArea`.

It prepares the future force theme area for rendering.

It may carry `forceTheme` and `forcePhrase`, but it must not convert them into a formal card name.

### 5.3 Pressure Seed Trace Render Block

`pressureSeedTraceRenderBlock` comes from `pressureSeedTraceArea`.

It prepares the future pressure seed trace area for rendering.

It must keep the pressure seed as a gentle trace of the round, not a diagnosis, accusation, or failure marker.

### 5.4 Six-Node Completion Render Block

`sixNodeCompletionRenderBlock` comes from `sixNodeCompletionArea`.

It prepares the future six-node completion area for rendering.

It must not turn the six-node process into a task checklist or achievement badge.

### 5.5 Imprint Render Block

`imprintRenderBlock` comes from `imprintArea`.

It may only mean that the future imprint area exists.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name;
- do not generate a formal asset ID.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `cardBlueprintCandidate.readiness !== "READY_FOR_ASSET_RENDER_PROTOCOL"`, `readiness = "NOT_READY"`.
2. Only when `cardBlueprintCandidate.readiness === "READY_FOR_ASSET_RENDER_PROTOCOL"`, `readiness = "READY_FOR_FINAL_ASSET_PROTOCOL"`.
3. `finalAssetProtocolRequired` must always be `true`.
4. `forbiddenLegacyRoute` must always be `true`.

## 7. Expression Principles

`renderReason` must continue to obey:

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

- "这局原力已经具备进入渲染候选的条件。"
- "当前只是资产卡渲染候选层。"
- "正式卡片仍需要最后的资产协议。"
- "未来卡片的星兽、原力、压力痕迹与六节点完成态已具备渲染位置。"

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
resolveAssetRenderCandidate()
```

It may only output:

```text
assetRenderCandidate(ASSET_RENDER_CANDIDATE)
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

1. `docs/GUANYAO_1_0_ASSET_RENDER_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No UI is connected.
7. No formal 64-hexagram card is generated.
8. Build passes.
