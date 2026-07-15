# GUANYAO Star Beast Render Plan Chain Freeze Protocol
# 观爻星兽语义渲染计划链冻结协议

版本：Evolution Phase 2 / P44

状态：RENDER PLAN CHAIN FROZEN

施工编号：`RC-STAR-BEAST-RENDER-PLAN-CHAIN-FREEZE-P44`

## 00｜冻结目标

P44 冻结 P39–P43 已完成的星兽视觉语义计划链：

```text
P39 StarBeastVisualState
↓ type-only source
P40 StarBeastRendererContract
↓
P41 Render Plan Adapter
↓
P42 Render Plan Consumption
↓
P43 Render Plan Endpoint
```

冻结对象是类型边界、职责边界、调用所有权和禁止绕行规则，不是视觉实现。

## 01｜冻结语义

### P39 Visual State

- Visual State 仍是生命状态的表达映射，不是生命事实；
- Mapping 函数当前仍没有业务下游调用者；
- 不读取 fourSymbol、人格标签、卦名文本或 UI 文案。

### P40 Renderer Contract

- 只定义 Renderer Input、Capability、Render Plan 与 Output；
- 不包含 Planner、Renderer 或绘制实现；
- P39 Visual State 仍是唯一合法视觉语义输入。

### P41 Render Plan Adapter

- 仍是具体 `StarBeastRenderPlan` 的唯一构造边界；
- 只校验六项语义能力并投影五个通道；
- 只允许由 P43 Endpoint 组合调用。

### P42 Render Plan Consumption

- 仍是 P41 Renderer Output 的唯一正式消费边界；
- 只保存原始 Output、Plan 与 Request 引用；
- 只允许由 P43 Endpoint 组合调用。

### P43 Render Plan Endpoint

- 仍是 P40–P42 链唯一正式入口；
- 只返回 P42 Consumption Result；
- P43 Resolver 当前仍没有外部直接调用者；
- P43 Result 只允许由 P45 Renderer Readiness 消费。

### P45 Renderer Readiness Extension

- 只读取上位调用方提供的 P43 Endpoint Result；
- 不直接调用 P41、P42 或 P43 Resolver；
- 只判断未来 Renderer Implementation Protocol 的前置资格；
- P45 Resolver 当前仍没有外部直接调用者；
- P45 Result 只允许由 P46 Renderer Implementation Candidate 消费。

### P46 Renderer Implementation Candidate Extension

- 只读取上位调用方提供的 P45 Result 与两项外部引用；
- 不直接调用 P41、P42、P43 或 P45；
- 不选择渲染后端，不执行渲染；
- P46 Result 只允许由 P48 Capability Binding 消费；
- 当前没有 Renderer、UI 或 Runtime 消费者。

### P47 Backend Capability Schema Extension

- 正式拥有 P46 所引用的 Backend Capability Reference；
- 只声明抽象表达能力与安全降级能力；
- P46 只导入 Reference，不调用 P47 Resolver；
- 不选择后端、不探测设备、不执行渲染；
- P47 Result 只允许由 P48 Capability Binding 消费；
- 当前没有 Renderer、UI 或 Runtime 消费者。

### P48 Implementation Capability Binding Extension

- 只读取调用方提供的 P46 Result 与 P47 Result；
- 只校验 Candidate Reference 与 Declaration Reference 一致；
- 不直接调用 P46 或 P47 Resolver；
- P48 Result 只允许由 P49 Authorization Readiness 消费；
- 不创建实现授权、不选择后端、不执行渲染；
- 当前没有 Renderer、UI 或 Runtime 消费者。

### P49 Implementation Authorization Readiness Extension

- 只读取调用方提供的 P48 Result；
- 不直接调用 P48 Resolver；
- 只判断是否可进入未来显式实现授权协议；
- 不生成 Authorization Command 或 Authorization；
- 不选择后端、不创建 Renderer、不执行渲染；
- 当前没有 Renderer、UI 或 Runtime 消费者。

## 02｜固定调用拓扑

必须保持：

```text
adaptStarBeastRendererInputToRenderPlan
  owner: P41
  only composition caller: P43

consumeStarBeastRenderPlan
  owner: P42
  only composition caller: P43

resolveStarBeastRenderPlanConsumption
  owner: P43
  external callers: none

StarBeastRenderPlanConsumptionResult
  owner: P43
  only authorized consumer: P45 Renderer Readiness

resolveStarBeastRendererReadiness
  owner: P45
  external callers: none

StarBeastRendererReadinessResult
  owner: P45
  only authorized consumer: P46 Implementation Candidate

resolveStarBeastRendererImplementationCandidate
  owner: P46
  external callers: none

resolveStarBeastRendererBackendCapabilityDeclaration
  owner: P47
  external callers: none

StarBeastRendererImplementationCandidateResult
  owner: P46
  only authorized consumer: P48 Capability Binding

StarBeastRendererBackendCapabilityResult
  owner: P47
  only authorized consumer: P48 Capability Binding

resolveStarBeastRendererImplementationCapabilityBinding
  owner: P48
  external callers: none

StarBeastRendererImplementationCapabilityBindingResult
  owner: P48
  only authorized consumer: P49 Authorization Readiness

resolveStarBeastRendererImplementationAuthorizationReadiness
  owner: P49
  external callers: none
```

P39 `mapStarBeastLifeStateToVisualState` 当前仍只存在于自身定义文件，没有业务调用者。

## 03｜唯一授权出口

冻结链唯一允许面向未来扩展的出口是：

```text
P43 StarBeastRenderPlanConsumptionResult
```

P45 Renderer Readiness 已按独立施工协议消费该出口，并且必须：

1. 以独立施工协议显式声明；
2. 只读取 P43 Endpoint Result；
3. 不直接调用 P41 或 P42；
4. 不反向修改 P39 Visual State 或 P40 Contract；
5. 保持本 freeze gate 的 P39–P45 拓扑校准。

P43 Resolver 必须继续保持无外部直接调用者；P45 是 P43 Result 的唯一授权消费者。

P45 Resolver 必须继续保持无外部直接调用者；P46 是 P45 Result 的唯一授权消费者。

P47 只提供 P46 Backend Capability Reference 的正式语义来源；P46 不得调用 P47 Resolver。P48 是 P46 Result 与 P47 Result 的唯一授权汇合点，并且只校验引用一致性。

P49 是 P48 Result 的唯一授权消费者，并且只声明进入未来显式授权协议的准备度；READY 不等于 Authorization。

## 04｜冻结后禁止

没有独立解冻或扩展协议时，禁止：

- 绕过 P43 直接调用 P41 Adapter；
- 绕过 P43 自行组装 P42 Consumption Input；
- 绕过 P41 直接把 Visual State 解释为 Render Plan；
- 修改六项 Capability 或五个 Plan Channel；
- 把 Visual State、Render Plan 或 Consumption 当作生命事实；
- 接入 Canvas、WebGL、Three.js、shader、动画或视觉资产；
- 接入 UI、Launch、Gravity、Crystal 页面；
- 接入 Runtime、Persistence、Storage、网络或 AI；
- 创建 Memory、Growth、Archive 或改变 Journey Stage。

## 05｜P44 施工范围

P44 只新增：

- 本冻结协议；
- `check-star-beast-render-plan-chain-freeze`；
- P43 唯一出口声明；
- release gate 注册。

P44 不修改 P39–P43 类型或服务源码，不修改 Foundation、Dynamics、Crystal、UI、Storage 或现有用户结果。

## 06｜验收

1. P39–P43 类型与服务职责标记完整；
2. P41、P42 只由 P43 组合调用；
3. P43 Resolver 没有外部直接调用者，P43 Result 只由 P45 消费；
4. P39 Mapping 没有业务调用者；
5. P45 Resolver 没有外部直接调用者，P45 Result 只由 P46 消费；
6. P46/P47 Result 只由 P48 Capability Binding 消费；
7. P48 Resolver 没有外部直接调用者，P48 Result 只由 P49 消费；
8. P49 Resolver 没有外部直接调用者；
9. 冻结链不包含 Renderer、UI、Runtime 或 Storage 实现；
10. P46 只导入 P47 Reference，P48/P49 不调用上游 Resolver；
11. freeze gate、P39–P49 gates、release、build 与 `git diff --check` 通过。
