# GUANYAO 1.0 Safe Component Stub Implementation Protocol

This document locks the boundary for the 1.0 safe component stub implementation candidate stage.

It defines how `safeComponentStubCandidate(SAFE_COMPONENT_STUB_CANDIDATE)` may enter `safeComponentStubImplementationCandidate(SAFE_COMPONENT_STUB_IMPLEMENTATION_CANDIDATE)`.

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
→ SAFE_COMPONENT_STUB_CANDIDATE
```

Current boundary:

- `safeComponentStubCandidate` is the safe component stub candidate data layer.
- No real React component is created.
- No component file path is emitted.
- No formal asset card page is generated.
- No route, commercialization, collection, payment, or unlock flow is connected.
- No legacy `/hexagram-stamp` path may be used.

The next stage may only create a safe component stub implementation candidate:

```text
safeComponentStubCandidate(SAFE_COMPONENT_STUB_CANDIDATE)
→ resolveSafeComponentStubImplementationCandidate()
→ safeComponentStubImplementationCandidate(SAFE_COMPONENT_STUB_IMPLEMENTATION_CANDIDATE)
```

## 2. SAFE_COMPONENT_STUB_IMPLEMENTATION_CANDIDATE Position

`safeComponentStubImplementationCandidate` is the safe component stub implementation candidate layer before any formal component file exists.

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

- whether a safe component stub file may be created in the future;
- which safe sections the future component stub may carry;
- which fields, behaviors, and entries the component stub implementation must continue to forbid;
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

Input comes from `safeComponentStubCandidate(SAFE_COMPONENT_STUB_CANDIDATE)`:

```ts
type SafeComponentStubImplementationInput = {
  status: "SAFE_COMPONENT_STUB_CANDIDATE";
  sourceComponentImplementationStatus: "COMPONENT_IMPLEMENTATION_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  stubSections: SafeComponentStubCandidate["stubSections"];
  stubTone: string;
  stubCandidateReason: string;
  safeStubImplementationAllowed: true;
  routeForbidden: true;
  forbiddenLegacyRoute: true;
  commercialPayloadForbidden: true;
};
```

## 4. Output Structure Draft

The future candidate structure is locked as:

```ts
type SafeComponentStubImplementationCandidate = {
  status: "SAFE_COMPONENT_STUB_IMPLEMENTATION_CANDIDATE";
  sourceSafeComponentStubStatus: "SAFE_COMPONENT_STUB_CANDIDATE";
  readiness: "NOT_READY" | "READY_FOR_COMPONENT_STUB_FILE_PROTOCOL";
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";

  implementationStubSections: {
    starbeastStubImplementation: boolean;
    forceIdentityStubImplementation: boolean;
    pressureTraceStubImplementation: boolean;
    sixNodeTraceStubImplementation: boolean;
    imprintStubImplementation: boolean;
  };

  implementationStubTone: string;
  implementationStubReason: string;

  componentStubFileProtocolRequired: true;
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

## 5. Implementation Stub Section Principles

`implementationStubSections` may only be derived from `stubSections`:

```text
starbeastStubImplementation ← stubSections.starbeastStub
forceIdentityStubImplementation ← stubSections.forceIdentityStub
pressureTraceStubImplementation ← stubSections.pressureTraceStub
sixNodeTraceStubImplementation ← stubSections.sixNodeTraceStub
imprintStubImplementation ← stubSections.imprintStub
```

### 5.1 Starbeast Stub Implementation

`starbeastStubImplementation` only marks whether the future safe component stub implementation may reserve a starbeast area.

It must not implement the final starbeast render layer in this protocol step.

### 5.2 Force Identity Stub Implementation

`forceIdentityStubImplementation` only marks whether the future safe component stub implementation may reserve a force identity area.

It must not convert force identity into a formal card name.

### 5.3 Pressure Trace Stub Implementation

`pressureTraceStubImplementation` only marks whether the future safe component stub implementation may reserve a pressure trace area.

It must preserve pressure as a gentle trace of the round, not as judgment, diagnosis, or score.

### 5.4 Six-Node Trace Stub Implementation

`sixNodeTraceStubImplementation` only marks whether the future safe component stub implementation may reserve a six-node trace area.

It must not become a checklist, score, badge, task-completion proof, or performance metric.

### 5.5 Imprint Stub Implementation

`imprintStubImplementation` reserves a future identity imprint stub implementation area.

Current boundary:

- do not generate a formal number;
- do not generate a formal hexagram code;
- do not generate a formal hexagram name;
- do not generate a formal card name;
- do not generate a formal asset ID.

## 6. Readiness Rules

Future resolver rules must obey:

1. If `safeComponentStubCandidate.readiness !== "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION"`, `readiness = "NOT_READY"`.
2. Only when all of the following are true may `readiness = "READY_FOR_COMPONENT_STUB_FILE_PROTOCOL"`:
   - `safeComponentStubCandidate.readiness === "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION"`;
   - `safeStubImplementationAllowed = true`;
   - `routeForbidden = true`;
   - `forbiddenLegacyRoute = true`;
   - `commercialPayloadForbidden = true`.
3. `componentStubFileProtocolRequired` must always be `true`.
4. `routeForbidden` must always be `true`.
5. `forbiddenLegacyRoute` must always be `true`.
6. `commercialPayloadForbidden` must always be `true`.

## 7. Expression Principles

`implementationStubReason` must continue to obey:

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

- "这局资产卡组件桩已具备进入实现候选的条件。"
- "当前只是安全组件桩实现候选协议层。"
- "正式组件文件仍需要下一层文件协议确认。"
- "未来安全组件桩会承载星兽、原力、压力痕迹与六节点完成态。"

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
resolveSafeComponentStubImplementationCandidate()
```

It may only output:

```text
safeComponentStubImplementationCandidate(SAFE_COMPONENT_STUB_IMPLEMENTATION_CANDIDATE)
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

1. `docs/GUANYAO_1_0_SAFE_COMPONENT_STUB_IMPLEMENTATION_PROTOCOL.md` exists.
2. No `src` runtime file is changed by this protocol step.
3. `package.json` is not changed by this protocol step.
4. `docs/GUANYAO_1_0_PROTOCOL_INDEX.md` is not changed by this protocol step.
5. No route is added.
6. No real UI is connected.
7. No real React component is created.
8. No commercialization is connected.
9. Build passes.
