# GUANYAO 1.0 Component Implementation Protocol

This document locks the boundary for the 1.0 component implementation candidate stage.

It defines how `uiComponentCandidate(UI_COMPONENT_CANDIDATE)` may enter `componentImplementationCandidate(COMPONENT_IMPLEMENTATION_CANDIDATE)`.

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
→ UI_COMPONENT_CANDIDATE
```

Current boundary:

- `uiComponentCandidate` is the component candidate data layer.
- No real React component is implemented.
- No formal asset card page is generated.
- No route, commercialization, collection, payment, or unlock flow is connected.
- No legacy `/hexagram-stamp` path may be used.

The next stage may only create a component implementation candidate:

```text
uiComponentCandidate(UI_COMPONENT_CANDIDATE)
→ resolveComponentImplementationCandidate()
→ componentImplementationCandidate(COMPONENT_IMPLEMENTATION_CANDIDATE)
```

## 2. COMPONENT_IMPLEMENTATION_CANDIDATE Position

`componentImplementationCandidate` is the implementation candidate protocol layer before formal component code exists.

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

- which future component areas may be implemented;
- which `componentSections` may enter implementation candidate state;
- which component implementation behaviors remain forbidden;
- how the chain avoids adding a route;
- how the chain avoids flowing back to legacy `/hexagram-stamp`;
- how the chain avoids carrying a commercial payload.

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

Input comes from `uiComponentCandidate(UI_COMPONENT_CANDIDATE)`:

```ts
type ComponentImplementationInput = {
  status: "UI_COMPONENT_CANDIDATE";
  sourceAssetCardUiStatus: "ASSET_CARD_UI_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  componentSections: UiComponentCandidate["componentSections"];
  componentTone: string;
  componentCandidateReason: string;
  componentImplementationProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type ComponentImplementationCandidate = {
  status: "COMPONENT_IMPLEMENTATION_CANDIDATE";
  sourceUiComponentStatus: "UI_COMPONENT_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  implementationSections: {
    starbeastImplementation: boolean;
    forceIdentityImplementation: boolean;
    pressureTraceImplementation: boolean;
    sixNodeTraceImplementation: boolean;
    imprintImplementation: boolean;
  };

  implementationTone: string;
  implementationCandidateReason: string;

  safeComponentStubProtocolRequired: true;
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

## 5. Implementation Section Principles

`implementationSections` may only be derived from `componentSections`:

```text
starbeastImplementation ← componentSections.starbeastComponent
forceIdentityImplementation ← componentSections.forceIdentityComponent
pressureTraceImplementation ← componentSections.pressureTraceComponent
sixNodeTraceImplementation ← componentSections.sixNodeTraceComponent
imprintImplementation ← componentSections.imprintComponent
```

### 5.1 Starbeast Implementation

`starbeastImplementation` only marks whether the future implementation may reserve a starbeast implementation area.

It must not implement starbeast rendering in this protocol layer.

### 5.2 Force Identity Implementation

`forceIdentityImplementation` only marks whether the future implementation may reserve a force identity area.

It must not convert force identity into a formal card name.

### 5.3 Pressure Trace Implementation

`pressureTraceImplementation` only marks whether the future implementation may reserve a pressure trace area.

It must preserve pressure as a gentle trace of the round, not as judgment or diagnosis.

### 5.4 Six-Node Trace Implementation

`sixNodeTraceImplementation` only marks whether the future implementation may reserve a six-node trace area.

It must not become a checklist, score, badge, or task-completion proof.

### 5.5 Imprint Implementation

`imprintImplementation` reserves a future identity imprint implementation area.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name;
- do not generate a formal asset ID.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `uiComponentCandidate.readiness !== "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL"`, `readiness = "NOT_READY"`.
2. Only when all of the following are true may `readiness = "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL"`:
   - `uiComponentCandidate.readiness === "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL"`;
   - `componentImplementationProtocolRequired = true`;
   - `routeForbidden = true`;
   - `forbiddenLegacyRoute = true`;
   - `commercialPayloadForbidden = true`.
3. `safeComponentStubProtocolRequired` must always be `true`.
4. `routeForbidden` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.
6. `commercialPayloadForbidden` must always be `true`.

## 7. Expression Principles

`implementationCandidateReason` must continue to obey:

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

- "这局资产卡组件已具备进入实现候选的条件。"
- "当前只是组件实现候选协议层。"
- "正式组件仍需要下一层安全组件桩协议。"
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
resolveComponentImplementationCandidate()
```

It may only output:

```text
componentImplementationCandidate(COMPONENT_IMPLEMENTATION_CANDIDATE)
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

1. `docs/GUANYAO_1_0_COMPONENT_IMPLEMENTATION_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No real UI is connected.
7. No real React component is implemented.
8. No commercialization is connected.
9. Build passes.
