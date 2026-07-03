# GUANYAO 1.0 Final Asset Protocol

This document locks the boundary for the 1.0 final asset candidate stage.

It defines how `assetRenderCandidate(ASSET_RENDER_CANDIDATE)` may enter `finalAssetCandidate(FINAL_ASSET_CANDIDATE)`.

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
→ resolveAssetRenderCandidate()
→ assetRenderCandidate(ASSET_RENDER_CANDIDATE)
```

The next stage may only create a final asset candidate:

```text
assetRenderCandidate(ASSET_RENDER_CANDIDATE)
→ resolveFinalAssetCandidate()
→ finalAssetCandidate(FINAL_ASSET_CANDIDATE)
```

## 2. FINAL_ASSET_CANDIDATE Position

`finalAssetCandidate` is still not a formal 64-hexagram asset card.

It is the last candidate gate before any formal asset card generation.

It only answers:

- whether this round is ready to enter formal asset generation;
- which asset elements are already prepared;
- which fields remain forbidden;
- how the flow stays isolated from legacy `/hexagram-stamp`;
- how the flow avoids premature commercialization.

It must not output:

- formal `hexagramCode`;
- formal `hexagramName`;
- formal `cardName`;
- formal `finalAssetId`;
- formal card face;
- payment fields;
- collection fields;
- unlock fields;
- `route`;
- `archiveRoute`;
- `legacyRoute`.

## 3. Input

Input comes from `assetRenderCandidate(ASSET_RENDER_CANDIDATE)`:

```ts
type FinalAssetInput = {
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

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type FinalAssetCandidate = {
  status: "FINAL_ASSET_CANDIDATE";
  sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_OFFICIAL_ASSET_GENERATION";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  motherCode?: string;
  trigram?: string;
  fourSymbol?: string;
  pressureSeedId?: string;
  pressureSeedText?: string;
  forceTheme: string;
  forcePhrase: string;
  shellTheme: string;
  renderTone: string;
  assetElementsReady: {
    personaSource: boolean;
    pressureTrace: boolean;
    primaryDimension: boolean;
    sixNodeCompletion: boolean;
    starbeastFeedback: boolean;
    forceTranslation: boolean;
    renderBlueprint: boolean;
  };
  finalAssetReason: string;
  officialAssetGenerationRequired: true;
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

## 5. Final Candidate Principles

`assetElementsReady` may only express element readiness.

It must not express formal asset generation, ownership, unlock state, collection state, payment state, or archive state.

### 5.1 Persona Source

`personaSource` expresses that the candidate can preserve the Mother / persona source context.

It must not recompute MotherCode or reopen a generation engine.

### 5.2 Pressure Trace

`pressureTrace` expresses that the current pressure seed trace can be carried into the final candidate.

It must not present the pressure seed as guilt, diagnosis, punishment, or failure.

### 5.3 Primary Dimension

`primaryDimension` expresses that the main petal context is present.

It must not introduce a new dimension taxonomy.

### 5.4 Six-Node Completion

`sixNodeCompletion` expresses that the current six-node tuning completion state can be represented.

It must not become a task checklist, score, or badge.

### 5.5 Starbeast Feedback

`starbeastFeedback` expresses that the starbeast feedback chain can be included.

It must not make the starbeast punish, shame, weaken, or blame the user.

### 5.6 Force Translation

`forceTranslation` expresses that the force language has reached the final candidate boundary.

It must not convert force language into a formal hexagram name.

### 5.7 Render Blueprint

`renderBlueprint` expresses that the render candidate has passed the blueprint and render preparation gates.

It must not create a formal card face.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `assetRenderCandidate.readiness !== "READY_FOR_FINAL_ASSET_PROTOCOL"`, `readiness = "NOT_READY"`.
2. Only when `assetRenderCandidate.readiness === "READY_FOR_FINAL_ASSET_PROTOCOL"`, `readiness = "READY_FOR_OFFICIAL_ASSET_GENERATION"`.
3. `assetElementsReady` may only express element readiness, not formal asset generation.
4. `officialAssetGenerationRequired` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.

## 7. Expression Principles

`finalAssetReason` must continue to obey:

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

- "这局原力已经走到最终资产候选层。"
- "当前只是正式资产生成前的最后候选。"
- "正式卡片仍需要官方资产生成器完成压印。"
- "本局星兽、压力痕迹、六节点完成态与原力转译已经具备候选条件。"

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
resolveFinalAssetCandidate()
```

It may only output:

```text
finalAssetCandidate(FINAL_ASSET_CANDIDATE)
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

1. `docs/GUANYAO_1_0_FINAL_ASSET_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No UI is connected.
7. No formal 64-hexagram card is generated.
8. Build passes.
