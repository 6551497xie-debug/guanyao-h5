# GUANYAO 1.0 Official Asset Object Protocol

This document locks the boundary for the 1.0 official asset object stage.

It defines when `officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)` may enter `officialAssetObject(OFFICIAL_ASSET_OBJECT)`.

It does not connect to UI, does not add any route, and does not add commercialization.

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
→ resolveFinalAssetCandidate()
→ finalAssetCandidate(FINAL_ASSET_CANDIDATE)
→ resolveOfficialAssetGenerationCandidate()
→ officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)
```

The next stage may only create an official asset object:

```text
officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)
→ resolveOfficialAssetObject()
→ officialAssetObject(OFFICIAL_ASSET_OBJECT)
```

## 2. OFFICIAL_ASSET_OBJECT Position

`officialAssetObject` is the data object layer for a formal asset.

It is still not UI.

It may become a data source for later formal card rendering, persistence, collection, or commercialization layers.

This protocol stage still does not create:

- UI;
- route;
- commercialization;
- collection;
- payment;
- unlock;
- legacy `/hexagram-stamp`.

`officialAssetObject` may start defining the minimum data fields required by a formal asset object, but it must remain free of commercial payload, legacy route payload, and fortune / misfortune judgments.

## 3. Input

Input comes from `officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)`:

```ts
type OfficialAssetObjectInput = {
  status: "OFFICIAL_ASSET_GENERATION_CANDIDATE";
  sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_OFFICIAL_ASSET_OBJECT";
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
  generationRequirements: {
    personaSource: boolean;
    pressureTrace: boolean;
    primaryDimension: boolean;
    sixNodeCompletion: boolean;
    starbeastFeedback: boolean;
    forceTranslation: boolean;
    renderBlueprint: boolean;
    noLegacyRoute: boolean;
    noCommercialPayload: boolean;
  };
  generationReason: string;
  officialAssetObjectRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future object structure is locked as:

```ts
type OfficialAssetObject = {
  status: "OFFICIAL_ASSET_OBJECT";
  sourceGenerationStatus: "OFFICIAL_ASSET_GENERATION_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_ASSET_CARD_RENDER";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  assetSource: {
    motherCode?: string;
    trigram?: string;
    fourSymbol?: string;
    pressureSeedId?: string;
    pressureSeedText?: string;
  };

  forceIdentity: {
    forceTheme: string;
    forcePhrase: string;
    shellTheme: string;
    renderTone: string;
  };

  assetNarrative: {
    originTrace: string;
    forceReflection: string;
    completionTrace: string;
  };

  officialAssetObjectReason: string;

  assetCardRenderRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

This output:

- may enter the official asset object layer;
- must not contain UI fields;
- must not contain `route`;
- must not contain `price`, `paywall`, `unlock`, or `collection`;
- must not connect to legacy `/hexagram-stamp`;
- must not output fortune or misfortune judgments.

Formal `hexagramCode`, `hexagramName`, and `cardName` are not required by this protocol step.

If those identity fields become necessary, the system must first add:

```text
GUANYAO_1_0_HEXAGRAM_IDENTITY_ASSIGNMENT_PROTOCOL.md
```

This future protocol must define formal hexagram identity assignment rules before any official asset object resolver adds those fields.

## 5. Readiness Rules

Future resolver rules must obey:

1. If `officialAssetGenerationCandidate.readiness !== "READY_FOR_OFFICIAL_ASSET_OBJECT"`, `readiness = "NOT_READY"`.
2. Only when `officialAssetGenerationCandidate.readiness === "READY_FOR_OFFICIAL_ASSET_OBJECT"` and all required `generationRequirements` are true, `readiness = "READY_FOR_ASSET_CARD_RENDER"`.
3. Required generation requirements must include:
   - `personaSource`;
   - `pressureTrace`;
   - `primaryDimension`;
   - `sixNodeCompletion`;
   - `starbeastFeedback`;
   - `forceTranslation`;
   - `renderBlueprint`;
   - `noLegacyRoute`;
   - `noCommercialPayload`.
4. `assetCardRenderRequired` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.
6. `commercialPayloadForbidden` must always be `true`.

## 6. Asset Narrative Principles

`assetNarrative` must continue to obey:

- no fortune or misfortune;
- no punishment;
- no failure shame;
- no task feeling;
- no fatalistic pressure;
- no mystical fear;
- no implication of paid unlock;
- no implication that collection is complete.

Allowed expressions:

- "本局现实扰动已被温和记录。"
- "这局原力已经形成可沉淀的对象。"
- "六节点调频完成态已经被保留。"
- "星兽反馈已成为资产对象的一部分。"

Forbidden expressions:

- 大吉 / 大凶;
- 任务完成;
- 成功打卡;
- 通过考验;
- 能量不足;
- 未完成;
- 失败;
- "已解锁";
- "立即收藏";
- "购买".

## 7. Next-Step Boundary

The next implementation step may only be:

```text
resolveOfficialAssetObject()
```

It may only output:

```text
officialAssetObject(OFFICIAL_ASSET_OBJECT)
```

It must not directly create:

- `HexagramAssetCard` UI;
- a formal asset card page;
- a route;
- a commercial entry;
- a collection system;
- legacy `/hexagram-stamp`;
- old annular asset flow;
- old instrument card flow.

If formal hexagram identity fields are required first, the next step must be documentation:

```text
GUANYAO_1_0_HEXAGRAM_IDENTITY_ASSIGNMENT_PROTOCOL.md
```

## 8. Acceptance

This protocol is satisfied only when:

1. `docs/GUANYAO_1_0_OFFICIAL_ASSET_OBJECT_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No UI is connected.
7. No commercialization is connected.
8. Build passes.
