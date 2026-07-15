# GUANYAO Original Self Life Schema Source Composition Protocol
# 观爻本我生命语义双来源组合协议

版本：Evolution Phase 1 / P16

状态：READ-ONLY DUAL SOURCE COMPOSITION

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-SOURCE-COMPOSITION-P16`

## 00｜协议定位

P16 将 P13 Mother Code Source 与 P15 Life Journey Stage Source 正式纳入 P14 Schema Entry。

它只升级 Entry 的来源完整性，不改变 P12 Mapping、Foundation Runtime 或任何业务引擎。

## 01｜固定来源链

```text
MotherCodeProfile
↓
P13 MotherCodeLifeArchetypeSourceResult
                         ┐
                         ├─ 双 READY
                         ↓
P15 LifeJourneyStageSourceResult
↑
显式 LifeJourneyStageSourceInput
                         ↓
P14 Original Self Life Schema Entry
                         ↓
P12 OriginalSelfLifeSchemaMapping
```

Entry 必须先验证 Mother Code Source，再验证 Life Journey Stage Source。只有两条来源均为 READY 时，才允许调用 P12 Mapping。

## 02｜Entry 输入收紧

P16 将 P14 的原始阶段字段：

```text
lifeJourneyStage: LifeJourneyStage
```

收紧为：

```text
lifeJourneyStageSource: LifeJourneyStageSourceInput
```

这不是阶段推导。调用者仍必须显式提供阶段，Entry 只是通过 P15 校验来源与合法性。

Entry 没有 Runtime、Persistence 或 UI 消费者，因此本次收紧不改变现有用户结果和卡面。

## 03｜READY

READY Result 必须同时保留：

- P13 `MotherCodeLifeArchetypeSourceResult`；
- P15 `LifeJourneyStageSourceResult`；
- P12 `OriginalSelfLifeSchemaMapping`。

Mapping 的 `LifeArchetypeProfile` 只能来自 P13；`currentStage` 只能来自 P15 的 `stageSource.currentStage`。

## 04｜NOT_READY

Entry 使用 `sourceBoundary` 明确失败来源。

### mother_code

- `MOTHER_CODE_TRIGRAM_MISSING`；
- `MOTHER_CODE_LIFE_SEMANTICS_MISSING`。

### life_journey_stage

- `LIFE_JOURNEY_STAGE_MISSING`；
- `LIFE_JOURNEY_STAGE_INVALID`。

每个 NOT_READY Result 必须原样保留对应 Source Result 与 reason。不得生成部分 Mapping，不得用另一条来源补造失败来源。

## 05｜顺序与边界

组合顺序固定为：

```text
Mother Code Source
→ Life Journey Stage Source
→ Mapping
```

若 Mother Code Source 未就绪，Entry 立即返回，不继续解释阶段。这个顺序延续 P14 的母码来源优先边界，不表示母码决定生命旅程阶段。

P16 继续禁止：

- 从 Foundation phase、Gravity、Dynamics 或 Crystal 推断阶段；
- 从 Star Beast 或 `fourSymbol` 反推 Mother Code；
- 修改 Mother Code、Hexagram、Yao 或 Crystal Engine；
- 读取或写入 Storage；
- 接入 UI、视觉或 AI。

## 06｜工程边界

P16 只修改：

- P14 Schema Entry 的双来源组合；
- P14/P15 gate 的消费边界；
- 本协议、独立 composition gate 与 release gate。

P16 不修改 P0–P11 Foundation、P12 Mapping、P13 Source、P15 Source 本体及其推导规则。

## 07｜验收

1. 双来源 READY 才生成 Mapping；
2. Mapping Profile 来自 P13，Stage 来自 P15；
3. 四种 NOT_READY 原因按 `sourceBoundary` 原样保留；
4. 任何失败都不生成部分 Mapping；
5. Entry 仍无 Runtime、Persistence 或 UI 消费者；
6. P12–P15 与 Foundation gate 回归通过；
7. composition gate、release gate、build 与 `git diff --check` 通过。
