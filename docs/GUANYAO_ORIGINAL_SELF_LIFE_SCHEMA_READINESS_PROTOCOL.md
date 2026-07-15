# GUANYAO Original Self Life Schema Readiness Protocol
# 观爻本我生命语义输入就绪协议

版本：Evolution Phase 1 / P19

状态：EXPLICIT INPUT READINESS

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-READINESS-P19`

## 00｜协议定位

P19 在 P18 Endpoint 外建立显式输入存在性边界。

Readiness 只回答：Endpoint 所需的四项正式输入是否已经到齐。它不判断输入内容能否形成 AVAILABLE Schema，也不建立第二套母码或阶段校验规则。

固定关系为：

```text
Nullable Explicit Inputs
↓
OriginalSelfLifeSchemaReadiness
├─ 缺少引用：NOT_READY
└─ 引用齐备：READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA
                ↓
             P18 Endpoint
                ↓
          AVAILABLE / UNAVAILABLE
```

## 01｜四项显式输入

Readiness Input 只包含：

- `MotherCodeProfile | null`；
- `LifeJourneyStageSourceInput | null`；
- `LifeArchetypeState | null`；
- `OriginalSelfJourneyPhase | null`。

检查顺序固定为：

```text
Mother Code Profile
→ Life Journey Stage Source
→ Life Archetype State
→ Foundation Journey Phase
```

## 02｜NOT_READY

当引用缺失时，Readiness 返回以下原因之一：

- `MOTHER_CODE_PROFILE_MISSING`；
- `LIFE_JOURNEY_STAGE_SOURCE_MISSING`；
- `LIFE_ARCHETYPE_STATE_MISSING`；
- `FOUNDATION_JOURNEY_PHASE_MISSING`。

NOT_READY 必须保留同一份 Readiness Input，不调用 P18 Endpoint，也不生成默认输入。

## 03｜READY

四项引用均存在时，Readiness 返回：

```text
READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA
```

READY 必须：

- 只读组装 `OriginalSelfLifeSchemaEndpointInput`；
- 保留四项原始引用；
- 委托 P18 Endpoint；
- 原样暴露 P18 的 `OriginalSelfLifeSchemaConsumption`。

READY 只代表输入已经具备，不保证 Consumption 为 AVAILABLE。

## 04｜存在性与业务有效性分离

以下情况属于“输入已存在但内容未就绪”，不得由 Readiness 改写：

- MotherCodeProfile 存在但缺少 trigram 或生命语义；
- LifeJourneyStageSourceInput 存在但没有阶段或阶段非法。

这些输入仍返回 Readiness READY，并由 P13/P15/P16/P17/P18 链路给出正式 UNAVAILABLE、`sourceBoundary` 与原始 reason。

Readiness 不把：

- 缺少母码语义改写为 `MOTHER_CODE_PROFILE_MISSING`；
- 缺少阶段值改写为 `LIFE_JOURNEY_STAGE_SOURCE_MISSING`；
- Foundation phase 映射为 Life Journey Stage；
- Gravity、Dynamics、Crystal 或页面状态解释成阶段。

## 05｜工程边界

P19 只新增：

- `originalSelfLifeSchemaReadiness`；
- 本协议；
- 独立 readiness gate 与 release gate 注册。

P19 只更新 P18 Endpoint gate 的合法消费点。

P19 不修改 P0–P11 Foundation、P12 Mapping、P13 Source、P14/P16 Entry、P15 Stage Source、P17 Consumption 或 P18 Endpoint 行为。

本刀不接 Dynamics、Persistence、Storage、UI、视觉或 AI。

## 06｜验收

1. 四种引用缺失分别返回固定 NOT_READY 原因；
2. 缺失引用时不调用 Endpoint、不补默认值；
3. 四项引用齐备时返回 READY 并委托 P18；
4. 内容不完整但引用存在时，Readiness 保持 READY，Consumption 保留正式 UNAVAILABLE；
5. 不推导阶段，不修改 Foundation，不读写 Storage；
6. P12–P18 与 Foundation gate 回归通过；
7. readiness gate、release gate、build 与 `git diff --check` 通过。
