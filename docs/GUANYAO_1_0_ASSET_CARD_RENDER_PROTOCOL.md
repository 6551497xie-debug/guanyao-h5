# GUANYAO 1.0 Asset Card Render Protocol

This document locks the boundary for the 1.0 asset card render candidate stage.

It defines how `officialAssetObject(OFFICIAL_ASSET_OBJECT)` may enter `assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)`.

It does not connect to UI, does not add any route, and does not add commercialization.

## 1. Current Asset Chain

The current P0 asset chain has passed the end-to-end check:

```text
hexagramAssetCandidate(PENDING)
→ hexagramAssetDraftCandidate(DRAFT)
→ hexagramAssetMappingCandidate(MAPPING)
→ forceTranslationCandidate(FORCE_TRANSLATION)
→ assetShellCandidate(ASSET_SHELL)
→ cardBlueprintCandidate(CARD_BLUEPRINT)
→ assetRenderCandidate(ASSET_RENDER_CANDIDATE)
→ finalAssetCandidate(FINAL_ASSET_CANDIDATE)
→ officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)
→ officialAssetObject(OFFICIAL_ASSET_OBJECT)
```

The active check command is:

```text
npm run check:asset-chain-e2e
```

Current boundary:

- `officialAssetObject` is the data object layer.
- No UI is connected.
- No formal card face is generated.
- No route, commercialization, or collection flow is connected.

The next stage may only create an asset card render candidate:

```text
officialAssetObject(OFFICIAL_ASSET_OBJECT)
→ resolveAssetCardRenderCandidate()
→ assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)
```

## 2. ASSET_CARD_RENDER_CANDIDATE Position

`assetCardRenderCandidate` is the candidate protocol layer before formal asset card UI rendering.

It is not:

- a React component;
- a page;
- a route;
- a commercial entry;
- a collection write;
- a legacy `/hexagram-stamp` connection.

It only answers:

- which content from `officialAssetObject` may enter future card rendering;
- which render slots a future card needs;
- which fields remain forbidden;
- when the chain may enter the next UI protocol layer.

## 3. Input

Input comes from `officialAssetObject(OFFICIAL_ASSET_OBJECT)`:

```ts
type AssetCardRenderInput = {
  status: "OFFICIAL_ASSET_OBJECT";
  sourceGenerationStatus: "OFFICIAL_ASSET_GENERATION_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_ASSET_CARD_RENDER";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  assetSource: OfficialAssetObject["assetSource"];
  forceIdentity: OfficialAssetObject["forceIdentity"];
  assetNarrative: OfficialAssetObject["assetNarrative"];
  officialAssetObjectReason: string;
  assetCardRenderRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type AssetCardRenderCandidate = {
  status: "ASSET_CARD_RENDER_CANDIDATE";
  sourceOfficialAssetObjectStatus: "OFFICIAL_ASSET_OBJECT";
  readiness: "NOT_READY" | "READY_FOR_ASSET_CARD_UI_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  renderSource: {
    assetSource: OfficialAssetObject["assetSource"];
    forceIdentity: OfficialAssetObject["forceIdentity"];
    assetNarrative: OfficialAssetObject["assetNarrative"];
  };

  renderSlots: {
    starbeastSlot: boolean;
    forceIdentitySlot: boolean;
    pressureTraceSlot: boolean;
    sixNodeTraceSlot: boolean;
    imprintSlot: boolean;
  };

  renderCandidateReason: string;

  assetCardUiProtocolRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

The output must not contain:

- React component fields;
- `route`;
- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `finalAssetId`;
- `officialAssetId`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`.

## 5. Readiness Rules

Future resolver rules must obey:

1. If `officialAssetObject.readiness !== "READY_FOR_ASSET_CARD_RENDER"`, `readiness = "NOT_READY"`.
2. Only when all of the following are true may `readiness = "READY_FOR_ASSET_CARD_UI_PROTOCOL"`:
   - `officialAssetObject.readiness === "READY_FOR_ASSET_CARD_RENDER"`;
   - `assetCardRenderRequired = true`;
   - `forbiddenLegacyRoute = true`;
   - `commercialPayloadForbidden = true`.
3. `assetCardUiProtocolRequired` must always be `true`.
4. `forbiddenLegacyRoute` must always be `true`.
5. `commercialPayloadForbidden` must always be `true`.

## 6. Render Slot Principles

`renderSlots` may only express whether future card rendering slots are prepared.

### 6.1 Starbeast Slot

`starbeastSlot` comes from `assetSource`, `fourSymbol`, and Mother source context such as `motherCode`.

It must not create a new starbeast engine.

### 6.2 Force Identity Slot

`forceIdentitySlot` comes from `forceIdentity.forceTheme` and `forceIdentity.forcePhrase`.

It must not convert force identity into a formal card name.

### 6.3 Pressure Trace Slot

`pressureTraceSlot` comes from `assetSource.pressureSeedText`.

It must preserve pressure as a trace of the round, not as judgment or diagnosis.

### 6.4 Six-Node Trace Slot

`sixNodeTraceSlot` comes from `assetNarrative.completionTrace`.

It must not become a checklist, score, or badge.

### 6.5 Imprint Slot

`imprintSlot` reserves a future identity imprint area.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name.

## 7. Expression Principles

`renderCandidateReason` must continue to obey:

- no fortune or misfortune;
- no punishment;
- no failure shame;
- no task feeling;
- no fatalistic pressure;
- no mystical fear;
- no implication of paid unlock;
- no implication that collection is complete;
- no implication that the formal card face has already been generated.

Allowed expressions:

- "这局资产对象已经具备进入卡片渲染候选的条件。"
- "当前只是渲染候选层。"
- "正式 UI 仍需要下一层资产卡 UI 协议。"
- "未来卡片会承载星兽、原力、压力痕迹与六节点完成态。"

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
resolveAssetCardRenderCandidate()
```

It may only output:

```text
assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)
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

If formal hexagram identity fields are required first, the next step must still be documentation:

```text
GUANYAO_1_0_HEXAGRAM_IDENTITY_ASSIGNMENT_PROTOCOL.md
```

## 9. Acceptance

This protocol is satisfied only when:

1. `docs/GUANYAO_1_0_ASSET_CARD_RENDER_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No UI is connected.
7. No commercialization is connected.
8. Build passes.
