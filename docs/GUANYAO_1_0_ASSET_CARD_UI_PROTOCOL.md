# GUANYAO 1.0 Asset Card UI Protocol

This document locks the boundary for the 1.0 asset card UI candidate stage.

It defines how `assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)` may enter `assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)`.

It does not implement a real UI, does not add a page, does not add any route, and does not add commercialization.

## 1. Current Asset Chain

The current P0 asset chain has reached:

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
→ assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)
```

Current boundary:

- `assetCardRenderCandidate` is the render candidate data layer.
- No React component is connected.
- No formal asset card page is generated.
- No route, commercialization, collection, payment, or unlock flow is connected.
- No legacy `/hexagram-stamp` path may be used.

The next stage may only create an asset card UI candidate:

```text
assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)
→ resolveAssetCardUiCandidate()
→ assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)
```

## 2. ASSET_CARD_UI_CANDIDATE Position

`assetCardUiCandidate` is the candidate protocol layer before formal UI component implementation.

It is not:

- a formal React page;
- a route;
- a formal asset card page;
- a commercial entry;
- a collection entry;
- a legacy `/hexagram-stamp` connection.

It only answers:

- which UI sections a future asset card should contain;
- which `renderSlots` may enter UI candidate state;
- which UI behaviors remain forbidden;
- how the chain avoids flowing back to legacy `/hexagram-stamp`.

It must not output:

- a formal React component;
- `route`;
- `pagePath`;
- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `finalAssetId`;
- `officialAssetId`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`.

## 3. Input

Input comes from `assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)`:

```ts
type AssetCardUiInput = {
  status: "ASSET_CARD_RENDER_CANDIDATE";
  sourceOfficialAssetObjectStatus: "OFFICIAL_ASSET_OBJECT";
  readiness: "NOT_READY" | "READY_FOR_ASSET_CARD_UI_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  renderSource: AssetCardRenderCandidate["renderSource"];
  renderSlots: AssetCardRenderCandidate["renderSlots"];
  renderCandidateReason: string;
  assetCardUiProtocolRequired: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type AssetCardUiCandidate = {
  status: "ASSET_CARD_UI_CANDIDATE";
  sourceAssetCardRenderStatus: "ASSET_CARD_RENDER_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_UI_COMPONENT_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  uiSections: {
    starbeastSection: boolean;
    forceIdentitySection: boolean;
    pressureTraceSection: boolean;
    sixNodeTraceSection: boolean;
    imprintSection: boolean;
  };

  uiTone: string;
  uiCandidateReason: string;

  uiComponentProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

The output must not contain:

- React component fields;
- `route`;
- `pagePath`;
- `hexagramCode`;
- `hexagramName`;
- `cardName`;
- `finalAssetId`;
- `officialAssetId`;
- `price`;
- `paywall`;
- `unlock`;
- `collection`.

## 5. UI Section Principles

`uiSections` may only be derived from `renderSlots`:

```text
starbeastSection ← renderSlots.starbeastSlot
forceIdentitySection ← renderSlots.forceIdentitySlot
pressureTraceSection ← renderSlots.pressureTraceSlot
sixNodeTraceSection ← renderSlots.sixNodeTraceSlot
imprintSection ← renderSlots.imprintSlot
```

### 5.1 Starbeast Section

`starbeastSection` only marks whether the future card may reserve a starbeast area.

It must not create a new starbeast rendering system in this protocol layer.

### 5.2 Force Identity Section

`forceIdentitySection` only marks whether the future card may reserve a force identity area.

It must not convert force identity into a formal card name.

### 5.3 Pressure Trace Section

`pressureTraceSection` only marks whether the future card may reserve a pressure trace area.

It must preserve pressure as a gentle trace of the round, not as judgment or diagnosis.

### 5.4 Six-Node Trace Section

`sixNodeTraceSection` only marks whether the future card may reserve a six-node trace area.

It must not become a checklist, score, badge, or task-completion proof.

### 5.5 Imprint Section

`imprintSection` reserves a future identity imprint area.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name;
- do not generate a formal asset ID.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `assetCardRenderCandidate.readiness !== "READY_FOR_ASSET_CARD_UI_PROTOCOL"`, `readiness = "NOT_READY"`.
2. Only when all of the following are true may `readiness = "READY_FOR_UI_COMPONENT_PROTOCOL"`:
   - `assetCardRenderCandidate.readiness === "READY_FOR_ASSET_CARD_UI_PROTOCOL"`;
   - `assetCardUiProtocolRequired = true`;
   - `forbiddenLegacyRoute = true`;
   - `commercialPayloadForbidden = true`.
3. `uiComponentProtocolRequired` must always be `true`.
4. `routeForbidden` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.
6. `commercialPayloadForbidden` must always be `true`.

## 7. Expression Principles

`uiCandidateReason` must continue to obey:

- no fortune or misfortune;
- no punishment;
- no failure shame;
- no task feeling;
- no fatalistic pressure;
- no mystical fear;
- no implication of paid unlock;
- no implication that collection is complete;
- no implication that formal UI has already been generated.

Allowed expressions:

- "这局资产对象已经具备进入 UI 候选的条件。"
- "当前只是 UI 候选协议层。"
- "正式组件仍需要下一层 UI Component Protocol。"
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
resolveAssetCardUiCandidate()
```

It may only output:

```text
assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)
```

It must not directly create:

- `HexagramAssetCard` React component;
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

1. `docs/GUANYAO_1_0_ASSET_CARD_UI_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No real UI is connected.
7. No commercialization is connected.
8. Build passes.
