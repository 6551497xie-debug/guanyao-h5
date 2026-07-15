# GUANYAO Original Self Life Schema Entry Protocol
# 观爻本我生命语义统一入口协议

版本：Evolution Phase 1 / P14

状态：READ-ONLY SCHEMA ENTRY

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-ENTRY-P14`

## 00｜协议定位

P14 为 P12 Life Schema Mapping 与 P13 Mother Code Source 建立唯一只读组合入口。

它不是 Foundation Runtime 入口，不接 Dynamics、Persistence 或 UI，也不新增生命阶段推导。

## 01｜固定组合链

```text
MotherCodeProfile
↓
resolveLifeArchetypeProfileFromMotherCode
↓
MotherCodeLifeArchetypeSourceResult
├─ NOT_READY：保留原始原因
└─ READY：LifeArchetypeProfile
   ↓
mapOriginalSelfLifeSchemaToFoundation
   ↓
OriginalSelfLifeSchemaMapping
```

外部 Schema 消费者只允许调用：

```text
resolveOriginalSelfLifeSchemaFromSources
```

不得绕过 Entry 分别组合 P13 Source 与 P12 Mapping。

## 02｜显式输入

Entry 输入必须同时提供：

- 正式 `MotherCodeProfile`；
- 显式 `LifeJourneyStage`；
- 既有 `LifeArchetypeState` 引用；
- 显式 `OriginalSelfJourneyPhase`。

Entry 不从 Foundation phase 推断 Life Journey Stage，不从 `LifeArchetypeState.fourSymbol` 推断 Mother Code，也不从母码反向改写 Star Beast。

## 03｜READY

只有 P13 Source 返回 READY 时，Entry 才调用 P12 Mapping。

READY Result 必须保留同一份 `MotherCodeLifeArchetypeSourceResult` 与同一份 Foundation State 引用。Entry 不复制 Profile 文案，不重建 Life Archetype，不改变阶段。

## 04｜NOT_READY

P13 的以下原因必须原样保留：

- `MOTHER_CODE_TRIGRAM_MISSING`；
- `MOTHER_CODE_LIFE_SEMANTICS_MISSING`。

NOT_READY Result 必须保留原始 Source Result，不能降级为 `null`，也不能调用 Mapping 创建残缺 Schema。

## 05｜工程边界

P14 不修改：

- P0–P11 Foundation Adapter、Validator、Resolver、Endpoint、Bridge 或 Readiness；
- P12 Schema 类型与 Mapping 规则；
- P13 Mother Code Source 规则；
- Mother Code、Star Beast、Hexagram、Gravity、Yao 或 Crystal Engine；
- Dynamics、Persistence、UI、视觉或 AI。

Entry 不读取 Storage，不推进 Runtime，不执行引擎，也没有页面消费者。

## 06｜验收

1. Entry 固定先调用 P13 Source，再在 READY 时调用 P12 Mapping；
2. READY 保留 Profile、State、Life Stage 与 Foundation phase；
3. NOT_READY 保留 P13 原因和原始 Source Result；
4. Entry 不读取四象、不推断阶段、不调用业务引擎；
5. P12、P13 与 Foundation gate 回归通过；
6. entry gate、release gate、build 与 `git diff --check` 通过。
