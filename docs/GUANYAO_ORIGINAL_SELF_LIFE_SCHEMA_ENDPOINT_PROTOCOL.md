# GUANYAO Original Self Life Schema Endpoint Protocol
# 观爻本我生命语义只读端点协议

版本：Evolution Phase 1 / P18

状态：READ-ONLY SCHEMA ENDPOINT

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-ENDPOINT-P18`

## 00｜协议定位

P18 为 Original Self Life Schema 建立唯一只读 Endpoint。

Endpoint 只串联 P16 Entry 与 P17 Consumption，不新增来源、不解释阶段、不改变 Mapping，也不接入 Runtime、Persistence 或 UI。

## 01｜固定调用链

```text
OriginalSelfLifeSchemaEndpointInput
↓
resolveOriginalSelfLifeSchemaFromSources
↓
OriginalSelfLifeSchemaEntryResult
↓
consumeOriginalSelfLifeSchemaResult
↓
OriginalSelfLifeSchemaConsumption
```

Endpoint 必须恰好执行一次 Entry 和一次 Consumption，并直接返回 Consumption Result。

## 02｜输入边界

`OriginalSelfLifeSchemaEndpointInput` 必须复用 `OriginalSelfLifeSchemaEntryInput`，继续显式接收：

- `MotherCodeProfile`；
- `LifeJourneyStageSourceInput`；
- 既有 `LifeArchetypeState` 引用；
- 显式 `OriginalSelfJourneyPhase`。

Endpoint 不允许增加默认值、可选回退、Storage 读取或 Foundation-to-Life-Journey 阶段映射。

## 03｜AVAILABLE

当 P16 Entry READY 时，Endpoint 必须原样返回 P17 的 AVAILABLE Consumption：

- 保留同一 Entry Result；
- 保留同一 `OriginalSelfLifeSchemaMapping`；
- Profile 继续来自 P13；
- Stage 继续来自 P15。

Endpoint 不复制 Profile，不重建 Mapping，也不推进旅程阶段。

## 04｜UNAVAILABLE

当 P16 Entry NOT_READY 时，Endpoint 必须原样返回 P17 的 UNAVAILABLE Consumption，并保留：

- `sourceBoundary`；
- `reason`；
- 同一 Entry Result；
- 同一 Source Result。

Endpoint 不把四种正式原因降级为通用错误：

- `MOTHER_CODE_TRIGRAM_MISSING`；
- `MOTHER_CODE_LIFE_SEMANTICS_MISSING`；
- `LIFE_JOURNEY_STAGE_MISSING`；
- `LIFE_JOURNEY_STAGE_INVALID`。

## 05｜工程边界

P18 只新增：

- `originalSelfLifeSchemaEndpoint` 只读串联服务；
- 本协议；
- 独立 endpoint gate 与 release gate 注册。

P18 只更新 P16 Entry gate、P16 Composition gate 与 P17 Consumption gate 的合法消费点。

P18 不修改：

- P0–P11 Foundation；
- P12 Mapping；
- P13 Mother Code Source；
- P14/P16 Entry 行为；
- P15 Life Journey Stage Source；
- P17 Consumption 行为；
- Mother Code、Star Beast、Hexagram、Gravity、Yao 或 Crystal Engine；
- Dynamics、Persistence、Storage、UI、视觉或 AI。

## 06｜验收

1. Endpoint 固定执行 Entry → Consumption；
2. READY 原样暴露 AVAILABLE 与同一 Mapping；
3. NOT_READY 原样暴露 UNAVAILABLE、来源边界与原因；
4. Endpoint 不推导、不默认、不缓存、不写入；
5. Endpoint 暂无 Runtime、Dynamics、Persistence 或 UI 消费者；
6. P12–P17 与 Foundation gate 回归通过；
7. endpoint gate、release gate、build 与 `git diff --check` 通过。
