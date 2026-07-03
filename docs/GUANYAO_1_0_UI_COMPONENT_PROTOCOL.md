# GUANYAO 1.0 UI Component Protocol

This document locks the boundary for the 1.0 UI component candidate stage.

It defines how `assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)` may enter `uiComponentCandidate(UI_COMPONENT_CANDIDATE)`.

It does not implement a real React component, does not add a page, does not add any route, and does not add commercialization.

## 1. Current Asset Chain

The current P0 asset chain has reached:

```text
PENDING
→ DRAFT
→ MAPPING
→ FORCE_TRANSLATION
→ ASSET_SHELL
→ CARD_BLUEPRINT
→ ASSET_RENDER_CANDIDATE
→ FINAL_ASSET_CANDIDATE
→ OFFICIAL_ASSET_GENERATION_CANDIDATE
→ OFFICIAL_ASSET_OBJECT
→ ASSET_CARD_RENDER_CANDIDATE
→ ASSET_CARD_UI_CANDIDATE
```

Current boundary:

- `assetCardUiCandidate` is the UI candidate data layer.
- No real React component is connected.
- No formal asset card page is generated.
- No route, commercialization, collection, payment, or unlock flow is connected.
- No legacy `/hexagram-stamp` path may be used.

The next stage may only create a UI component candidate:

```text
assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)
→ resolveUiComponentCandidate()
→ uiComponentCandidate(UI_COMPONENT_CANDIDATE)
```

## 2. UI_COMPONENT_CANDIDATE Position

`uiComponentCandidate` is the candidate protocol layer before formal component implementation.

It is still not a formal React component.

It is not:

- a real React component;
- a component file path;
- a page;
- a route;
- a formal asset card page;
- a commercial entry;
- a collection entry;
- a legacy `/hexagram-stamp` connection.

It only answers:

- which component areas a future asset card component needs;
- which UI sections may enter component candidate state;
- which component behaviors remain forbidden;
- how the chain avoids adding a route;
- how the chain avoids flowing back to legacy `/hexagram-stamp`.

It must not output:

- a real React component;
- `componentPath`;
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

Input comes from `assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)`:

```ts
type UiComponentInput = {
  status: "ASSET_CARD_UI_CANDIDATE";
  sourceAssetCardRenderStatus: "ASSET_CARD_RENDER_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_UI_COMPONENT_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  uiSections: AssetCardUiCandidate["uiSections"];
  uiTone: string;
  uiCandidateReason: string;
  uiComponentProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type UiComponentCandidate = {
  status: "UI_COMPONENT_CANDIDATE";
  sourceAssetCardUiStatus: "ASSET_CARD_UI_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  componentSections: {
    starbeastComponent: boolean;
    forceIdentityComponent: boolean;
    pressureTraceComponent: boolean;
    sixNodeTraceComponent: boolean;
    imprintComponent: boolean;
  };

  componentTone: string;
  componentCandidateReason: string;

  componentImplementationProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

The output must not contain:

- React component fields;
- `componentPath`;
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

## 5. Component Section Principles

`componentSections` may only be derived from `uiSections`:

```text
starbeastComponent ← uiSections.starbeastSection
forceIdentityComponent ← uiSections.forceIdentitySection
pressureTraceComponent ← uiSections.pressureTraceSection
sixNodeTraceComponent ← uiSections.sixNodeTraceSection
imprintComponent ← uiSections.imprintSection
```

### 5.1 Starbeast Component

`starbeastComponent` only marks whether the future component may reserve a starbeast area.

It must not implement starbeast rendering in this protocol layer.

### 5.2 Force Identity Component

`forceIdentityComponent` only marks whether the future component may reserve a force identity area.

It must not convert force identity into a formal card name.

### 5.3 Pressure Trace Component

`pressureTraceComponent` only marks whether the future component may reserve a pressure trace area.

It must preserve pressure as a gentle trace of the round, not as judgment or diagnosis.

### 5.4 Six-Node Trace Component

`sixNodeTraceComponent` only marks whether the future component may reserve a six-node trace area.

It must not become a checklist, score, badge, or task-completion proof.

### 5.5 Imprint Component

`imprintComponent` reserves a future identity imprint component area.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name;
- do not generate a formal asset ID.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `assetCardUiCandidate.readiness !== "READY_FOR_UI_COMPONENT_PROTOCOL"`, `readiness = "NOT_READY"`.
2. Only when all of the following are true may `readiness = "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL"`:
   - `assetCardUiCandidate.readiness === "READY_FOR_UI_COMPONENT_PROTOCOL"`;
   - `uiComponentProtocolRequired = true`;
   - `routeForbidden = true`;
   - `forbiddenLegacyRoute = true`;
   - `commercialPayloadForbidden = true`.
3. `componentImplementationProtocolRequired` must always be `true`.
4. `routeForbidden` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.
6. `commercialPayloadForbidden` must always be `true`.

## 7. Expression Principles

`componentCandidateReason` must continue to obey:

- no fortune or misfortune;
- no punishment;
- no failure shame;
- no task feeling;
- no fatalistic pressure;
- no mystical fear;
- no implication of paid unlock;
- no implication that collection is complete;
- no implication that a formal component has already been generated.

Allowed expressions:

- "这局资产卡 UI 已具备进入组件候选的条件。"
- "当前只是组件候选协议层。"
- "正式组件仍需要下一层实现协议。"
- "未来组件会承载星兽、原力、压力痕迹与六节点完成态。"

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
resolveUiComponentCandidate()
```

It may only output:

```text
uiComponentCandidate(UI_COMPONENT_CANDIDATE)
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

1. `docs/GUANYAO_1_0_UI_COMPONENT_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No real UI is connected.
7. No real React component is implemented.
8. No commercialization is connected.
9. Build passes.
