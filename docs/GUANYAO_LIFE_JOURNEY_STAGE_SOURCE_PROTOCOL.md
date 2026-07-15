# GUANYAO Life Journey Stage Source Protocol
# 观爻生命旅程阶段来源协议

版本：Evolution Phase 1 / P15

状态：EXPLICIT UPPER SCHEMA SOURCE

施工编号：`RC-LIFE-JOURNEY-STAGE-SOURCE-P15`

## 00｜协议定位

P15 为 `LifeJourneyStage` 建立正式来源与就绪边界。

它不是阶段推进引擎，不判断用户已经完成了哪一段生命旅程，也不把现有业务状态翻译成七阶段。

在阶段触发规则正式冻结前，唯一合法来源是：

```text
Upper Schema Caller
↓ 显式提供
LifeJourneyStage
↓
LifeJourneyStageSourceResult
```

## 01｜来源定义

来源身份固定为：

```text
upper_schema_caller
```

调用者必须显式提供以下七个值之一：

```text
ORIGIN
AWAKENING
REALITY
PRESSURE
CHOICE
CRYSTAL
ARCHIVE
```

`LifeJourneyStageSourceProfile` 只证明当前 Schema 获得了一个明确、合法的阶段输入。它不证明 Runtime 已经完成相应过程，也不代表系统自动推进到了下一阶段。

## 02｜禁止推导

P15 明确禁止从以下对象推断 `LifeJourneyStage`：

- `OriginalSelfJourneyPhase`；
- Gravity、Dynamics 或页面流程状态；
- Hexagram、Yao 或 Crystal readiness；
- Star Beast、`fourSymbol` 或 Mother Code；
- Storage、路由、视觉状态或 AI 输出。

因此不得声明：

- Foundation `HEXAGRAM` 等于 Life Journey `PRESSURE`；
- Foundation `YAO` 等于 Life Journey `CHOICE`；
- Foundation `CRYSTAL` 等于 Life Journey `CRYSTAL` 或 `ARCHIVE`。

这些对象属于不同语义层，未来若建立映射，必须由独立协议定义，而不能在 Source 中隐式完成。

## 03｜就绪语义

Source Result 只有两类状态：

### READY

显式阶段属于七阶段固定集合。Result 保留原始 Input，并生成只读 `LifeJourneyStageSourceProfile`。

### NOT_READY

- `LIFE_JOURNEY_STAGE_MISSING`：调用者没有提供阶段；
- `LIFE_JOURNEY_STAGE_INVALID`：输入不属于七阶段固定集合。

NOT_READY 不提供默认阶段，不回退为 `ORIGIN`，也不从其他状态补造阶段。

## 04｜与 P14 Entry 的边界

P15 先独立建立并验证来源契约，本刀不修改 P14：

```text
resolveOriginalSelfLifeSchemaFromSources
```

仍保持原有显式 `LifeJourneyStage` 输入。P15 Source 尚未成为 Entry 消费者；后续接入必须独立施工，并保留 P14 的 Mother Code READY / NOT_READY 语义。

## 05｜工程边界

P15 不修改：

- P0–P11 Foundation Runtime；
- P12 Life Schema Mapping；
- P13 Mother Code Source；
- P14 Life Schema Entry；
- Mother Code、Star Beast、Hexagram、Gravity、Yao 或 Crystal Engine；
- Dynamics、Persistence、Storage、UI、视觉或 AI。

## 06｜验收

1. 七阶段都能形成 READY Source Profile；
2. 缺失或非法阶段保持 NOT_READY，并保留明确原因；
3. 不提供默认阶段，不从 Foundation、Gravity、Dynamics 或 Crystal 推断；
4. P15 Source 暂无 Runtime、Persistence 或 UI 消费者；
5. P12–P14 与 Foundation gate 回归通过；
6. source gate、release gate、build 与 `git diff --check` 通过。
