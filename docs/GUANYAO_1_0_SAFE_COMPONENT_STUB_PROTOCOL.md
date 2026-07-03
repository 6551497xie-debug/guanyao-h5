# GUANYAO 1.0 Safe Component Stub Protocol

This document locks the boundary for the 1.0 safe component stub candidate stage.

It defines how `componentImplementationCandidate(COMPONENT_IMPLEMENTATION_CANDIDATE)` may enter `safeComponentStubCandidate(SAFE_COMPONENT_STUB_CANDIDATE)`.

It does not create a real React component, does not add a page, does not add any route, and does not add commercialization.

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
→ COMPONENT_IMPLEMENTATION_CANDIDATE
```

Current boundary:

- `componentImplementationCandidate` is the component implementation candidate data layer.
- No real React component is created.
- No formal asset card page is generated.
- No route, commercialization, collection, payment, or unlock flow is connected.
- No legacy `/hexagram-stamp` path may be used.

The next stage may only create a safe component stub candidate:

```text
componentImplementationCandidate(COMPONENT_IMPLEMENTATION_CANDIDATE)
→ resolveSafeComponentStubCandidate()
→ safeComponentStubCandidate(SAFE_COMPONENT_STUB_CANDIDATE)
```

## 2. SAFE_COMPONENT_STUB_CANDIDATE Position

`safeComponentStubCandidate` is the safe component stub candidate layer before formal component creation.

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

- whether a safe component stub may be created in the future;
- which sections the future component stub may carry;
- which fields and behaviors the component stub must continue to forbid;
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

Input comes from `componentImplementationCandidate(COMPONENT_IMPLEMENTATION_CANDIDATE)`:

```ts
type SafeComponentStubInput = {
  status: "COMPONENT_IMPLEMENTATION_CANDIDATE";
  sourceUiComponentStatus: "UI_COMPONENT_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  implementationSections: ComponentImplementationCandidate["implementationSections"];
  implementationTone: string;
  implementationCandidateReason: string;
  safeComponentStubProtocolRequired: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type SafeComponentStubCandidate = {
  status: "SAFE_COMPONENT_STUB_CANDIDATE";
  sourceComponentImplementationStatus: "COMPONENT_IMPLEMENTATION_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  stubSections: {
    starbeastStub: boolean;
    forceIdentityStub: boolean;
    pressureTraceStub: boolean;
    sixNodeTraceStub: boolean;
    imprintStub: boolean;
  };

  stubTone: string;
  stubCandidateReason: string;

  safeStubImplementationAllowed: true;
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

## 5. Component Stub Section Principles

`stubSections` may only be derived from `implementationSections`:

```text
starbeastStub ← implementationSections.starbeastImplementation
forceIdentityStub ← implementationSections.forceIdentityImplementation
pressureTraceStub ← implementationSections.pressureTraceImplementation
sixNodeTraceStub ← implementationSections.sixNodeTraceImplementation
imprintStub ← implementationSections.imprintImplementation
```

### 5.1 Starbeast Stub

`starbeastStub` only marks whether the future safe component stub may reserve a starbeast area.

It must not implement starbeast rendering in this protocol layer.

### 5.2 Force Identity Stub

`forceIdentityStub` only marks whether the future safe component stub may reserve a force identity area.

It must not convert force identity into a formal card name.

### 5.3 Pressure Trace Stub

`pressureTraceStub` only marks whether the future safe component stub may reserve a pressure trace area.

It must preserve pressure as a gentle trace of the round, not as judgment or diagnosis.

### 5.4 Six-Node Trace Stub

`sixNodeTraceStub` only marks whether the future safe component stub may reserve a six-node trace area.

It must not become a checklist, score, badge, or task-completion proof.

### 5.5 Imprint Stub

`imprintStub` reserves a future identity imprint stub area.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name;
- do not generate a formal asset ID.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `componentImplementationCandidate.readiness !== "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL"`, `readiness = "NOT_READY"`.
2. Only when all of the following are true may `readiness = "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION"`:
   - `componentImplementationCandidate.readiness === "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL"`;
   - `safeComponentStubProtocolRequired = true`;
   - `routeForbidden = true`;
   - `forbiddenLegacyRoute = true`;
   - `commercialPayloadForbidden = true`.
3. `safeStubImplementationAllowed` must always be `true`.
4. `routeForbidden` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.
6. `commercialPayloadForbidden` must always be `true`.

## 7. Expression Principles

`stubCandidateReason` must continue to obey:

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

- "这局资产卡组件已具备进入安全组件桩候选的条件。"
- "当前只是安全组件桩候选协议层。"
- "正式组件仍需要下一层实现。"
- "未来组件桩会承载星兽、原力、压力痕迹与六节点完成态。"

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
resolveSafeComponentStubCandidate()
```

It may only output:

```text
safeComponentStubCandidate(SAFE_COMPONENT_STUB_CANDIDATE)
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

1. `docs/GUANYAO_1_0_SAFE_COMPONENT_STUB_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No real UI is connected.
7. No real React component is created.
8. No commercialization is connected.
9. Build passes.
