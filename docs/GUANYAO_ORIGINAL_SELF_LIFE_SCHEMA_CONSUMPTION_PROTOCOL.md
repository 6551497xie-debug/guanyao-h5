# GUANYAO Original Self Life Schema Consumption Protocol
# 观爻本我生命语义结果消费协议

版本：Evolution Phase 1 / P17

状态：READ-ONLY RESULT CONSUMPTION

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-CONSUMPTION-P17`

## 00｜协议定位

P17 为 P16 Schema Entry Result 建立只读消费边界。

它不重新解析来源、不重新执行 Mapping，也不把 Life Schema 接入 Runtime、Persistence、Endpoint 或 UI。

固定关系为：

```text
OriginalSelfLifeSchemaEntryResult
├─ READY
│  ↓
│  AVAILABLE + OriginalSelfLifeSchemaMapping
└─ NOT_READY
   ↓
   UNAVAILABLE + sourceBoundary + reason + sourceResult
```

## 01｜AVAILABLE

当 Entry Result 为 READY 时，Consumption 必须：

- 返回 `AVAILABLE`；
- 保留同一份 Entry Result 引用；
- 暴露同一份 `OriginalSelfLifeSchemaMapping` 引用；
- 不复制或重算 LifeArchetypeProfile；
- 不改变 LifeJourneyStage。

AVAILABLE 只代表当前 Schema 结果可被上位语义层读取，不代表生命旅程已完成，也不代表 Runtime 已推进。

## 02｜UNAVAILABLE

当 Entry Result 为 NOT_READY 时，Consumption 必须返回 `UNAVAILABLE`，并原样保留：

- 同一份 Entry Result；
- `sourceBoundary`；
- `reason`；
- 同一份 `sourceResult`。

支持的来源边界与原因固定为：

### mother_code

- `MOTHER_CODE_TRIGRAM_MISSING`；
- `MOTHER_CODE_LIFE_SEMANTICS_MISSING`。

### life_journey_stage

- `LIFE_JOURNEY_STAGE_MISSING`；
- `LIFE_JOURNEY_STAGE_INVALID`。

Consumption 不把这些原因转换成通用错误，不提供默认阶段，也不生成部分 Mapping。

## 03｜只读边界

P17 Consumption 只消费已经形成的 Entry Result：

- 不调用 P13 Mother Code Source；
- 不调用 P15 Life Journey Stage Source；
- 不调用 P12 Mapping；
- 不调用 P14/P16 Entry Resolver；
- 不读取 Foundation phase、Gravity、Dynamics 或 Crystal 状态；
- 不读写 Storage，不请求网络，不依赖 React。

## 04｜工程边界

P17 只新增：

- `originalSelfLifeSchemaResultConsumption` 只读服务；
- 本协议；
- 独立 consumption gate 与 release gate 注册。

P17 不修改 P0–P11 Foundation、P12 Mapping、P13 Source、P14 Entry 基础合同、P15 Source 或 P16 双来源组合规则。

本刀不新增 Endpoint，不接 Dynamics、Persistence、UI、视觉或 AI。

## 05｜验收

1. READY 稳定转换为 AVAILABLE，并保留同一 Mapping 引用；
2. 四种 NOT_READY 稳定转换为 UNAVAILABLE；
3. UNAVAILABLE 原样保留来源边界、原因和 Source Result；
4. Consumption 不重新解析、推导、Mapping 或推进 Runtime；
5. Consumption 暂无 Endpoint、Dynamics、Persistence 或 UI 消费者；
6. P12–P16 与 Foundation gate 回归通过；
7. consumption gate、release gate、build 与 `git diff --check` 通过。
