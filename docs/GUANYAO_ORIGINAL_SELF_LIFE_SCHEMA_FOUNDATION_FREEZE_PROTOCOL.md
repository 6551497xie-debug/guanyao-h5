# GUANYAO Original Self Life Schema Foundation Freeze Protocol
# 观爻本我生命语义基础冻结协议

版本：Evolution Phase 1 / P20

状态：FOUNDATION ARCHITECTURE FROZEN

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-FOUNDATION-FREEZE-P20`

## 00｜协议定位

P20 冻结 P12–P19 已建立的 Original Self Life Schema 基础架构。

本协议不是新的 Runtime，不增加业务状态，也不把生命语义接入 Dynamics、Persistence、Storage 或 UI。它只固定已有来源、组装、消费与就绪边界，防止后续施工绕过正式链路或反向污染 P0–P11 Foundation。

## 01｜冻结的语义链

正式语义输出顺序固定为：

```text
MotherCodeProfile ─→ Mother Code Life Archetype Source ─→ LifeArchetypeProfile
Explicit LifeJourneyStageSourceInput ─→ Life Journey Stage Source ─→ LifeJourneyStage

LifeArchetypeProfile + LifeJourneyStage
              ↓
Original Self Life Schema Entry
              ↓
Original Self Life Schema Mapping
              ↓
Original Self Life Schema Result Consumption
              ↓
Original Self Life Schema Endpoint
              ↓
Original Self Life Schema Readiness Boundary
```

其中：

- `MotherCodeProfile` 是八生命原型的唯一正式来源；
- `LifeJourneyStageSourceInput` 必须由上位调用者显式提供；
- `LifeArchetypeState` 与 `OriginalSelfJourneyPhase` 只作为 Foundation 兼容引用进入 Mapping；
- Readiness 只检查四项输入引用是否存在；
- Endpoint 与 Consumption 保留来源链给出的 AVAILABLE / UNAVAILABLE 语义。

## 02｜冻结的调用所有权

代码调用方向与语义输出展示方向不同。正式调用所有权固定为：

```text
Readiness
└─ Endpoint
   ├─ Entry
   │  ├─ Mother Code Life Archetype Source
   │  ├─ Life Journey Stage Source
   │  └─ Mapping
   └─ Result Consumption
```

每个公开解析函数只允许由其直接上位边界消费：

- Mother Code Source、Stage Source、Mapping → Entry；
- Entry、Result Consumption → Endpoint；
- Endpoint → Readiness；
- Readiness 当前不得被 Runtime、页面或其他业务消费者调用。

## 03｜Foundation 保护边界

P12–P19 是 P0–P11 Foundation 之上的兼容语义层，不是 Foundation 的替代实现。

固定禁止：

- Foundation 类型反向依赖 Life Schema Entry、Consumption、Endpoint 或 Readiness；
- 用 `StarBeast`、`fourSymbol`、Gravity、Dynamics 或页面状态反推 `LifeArchetypeProfile`；
- 从 `OriginalSelfJourneyPhase`、Gravity、Dynamics、Crystal 或页面进度推断 `LifeJourneyStage`；
- 在本链路读写 localStorage、sessionStorage 或任何 Persistence；
- 在本链路引入 React、UI、网络调用或 AI 交互；
- 绕过 Entry 直接组合 Mother Code Source 与 Stage Source；
- 绕过 Endpoint 直接把 Entry Result 暴露给上位消费者。

## 04｜冻结但不混同的语义

以下边界保持独立：

- `LifeArchetypeProfile` 是 Mother Code 生命语义 Profile；
- `LifeArchetypeState` 是既有 Foundation Runtime 状态；
- `LifeJourneyStage` 是上位 Schema 的显式旅程阶段；
- `OriginalSelfJourneyPhase` 是既有 Foundation 旅程相位；
- Readiness READY 只代表输入引用齐备；
- Consumption AVAILABLE 才代表正式来源已经形成可消费 Mapping。

不得为了“自动接通”而合并这些类型或增加隐式默认值。

## 05｜P20 施工边界

P20 只新增：

- 本冻结协议；
- `check:original-self-life-schema-foundation-freeze`；
- release gate 注册。

P20 不修改 P0–P19 类型、Adapter、Resolver、Endpoint、Dynamics、Persistence、Storage、UI、AI 或视觉组件。

## 06｜后续解冻条件

在任何 Runtime Adapter 施工前，必须先独立定义并审查正式 `LifeJourneyStage` 触发来源协议。

解冻不得以页面状态、Foundation phase 或 Gravity 状态作为临时替代。任何调用拓扑变化都必须先更新本协议与冻结 gate，并作为独立施工提交。

## 07｜验收

1. P12–P19 所有正式文件存在；
2. 来源、Entry、Mapping、Consumption、Endpoint、Readiness 保持单一调用所有权；
3. Mother Code 仍是 LifeArchetypeProfile 的唯一正式来源；
4. LifeJourneyStage 仍来自显式上位输入，不做 Runtime 推断；
5. Foundation 不反向消费 Life Schema；
6. 本链路不接 Dynamics、Persistence、Storage、UI、AI；
7. P12–P19 gates、release、build 与 `git diff --check` 通过。
