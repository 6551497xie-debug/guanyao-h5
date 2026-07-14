# GUANYAO Original Self Life Schema Protocol
# 观爻本我生命语义 Schema 协议

版本：Evolution Phase 1 / P12

状态：COMPATIBLE UPPER SCHEMA

施工编号：`RC-ORIGINAL-SELF-LIFE-SCHEMA-P12`

## 00｜协议定位

Life Schema 是 Original Self Foundation 之上的战略语义层。

它不是新的 Runtime、业务引擎、页面流程或持久化模型，也不覆盖 P0–P11 已建立的 Foundation 合同。

## 01｜Life Journey Schema

生命旅程的上位语义路径固定为：

```text
ORIGIN
→ AWAKENING
→ REALITY
→ PRESSURE
→ CHOICE
→ CRYSTAL
→ ARCHIVE
```

七阶段表达一个生命从降临、觉醒、进入现实、经历压力、作出选择、留下印记到形成生命年轮的完整叙事。

它不替换 Foundation Runtime 的稳定路径：

```text
ORIGINAL_SELF
→ STAR_BEAST
→ LIFE_ARCHETYPE
→ HEXAGRAM
→ YAO
→ CRYSTAL
```

两条路径属于不同语义层。Life Journey Stage 必须由上位调用者显式给出，不得根据 `OriginalSelfJourneyPhase` 自动推断，也不得推进任何 Runtime。

## 02｜LifeArchetypeProfile

八生命原型 Profile 固定为：

| Code | Trigram |
| --- | --- |
| QIAN | 乾 |
| KUN | 坤 |
| ZHEN | 震 |
| XUN | 巽 |
| KAN | 坎 |
| LI | 离 |
| GEN | 艮 |
| DUI | 兑 |

`LifeArchetypeProfile` 表达 Mother Code 所承载的原始生命力量。它不是 Hexagram，不是人格标签，也不是最终身份。

现有 `LifeArchetypeState` 保持不变。它仍表达 Foundation 中由 Star Beast 显化形成的只读生命原型状态。

## 03｜Profile 与 Foundation State

兼容关系固定为：

```text
LifeArchetypeProfile（上位显式语义）
↓
Original Self Life Schema Mapping
↓
LifeArchetypeState（既有 Foundation 引用）
```

Mapping 只把显式 Profile 与既有 State 引用放入同一个只读边界，不从 `fourSymbol` 反推八原型，不修改 `LifeArchetypeState`，也不重新生成 Star Beast。

八母码原型与四象兽不是一一同义关系。缺少正式 Mother Code Profile 时，系统必须保持未接入，而不是用四象补造 QIAN、KUN、ZHEN、XUN、KAN、LI、GEN 或 DUI。

## 04｜Journey Mapping Boundary

Mapping 同时保留两种显式状态：

- `LifeJourneyStage`：Evolution 战略语义阶段；
- `OriginalSelfJourneyPhase`：Foundation 稳定语义阶段。

Mapping 不声明两者一一对应，不把 `PRESSURE` 自动等同于 `HEXAGRAM`，不把 `CHOICE` 自动等同于 `YAO`，也不把 `ARCHIVE` 降级为 `CRYSTAL`。

## 05｜工程边界

P12 只新增：

- `originalSelfLifeSchema` 类型层；
- `originalSelfLifeSchemaMapping` 只读映射边界；
- 本协议与独立 schema gate。

P12 不修改：

- 现有 Foundation Adapter、Validator、Resolver、Entry、Consumption 或 Endpoint；
- Dynamics Bridge 与 Readiness；
- Mother Code、Hexagram、Gravity、Yao 或 Crystal Engine；
- Persistence schema、key、读写或兼容逻辑；
- UI、视觉资产、页面或 AI 交互。

## 06｜验收

1. 七阶段 Life Journey Schema 类型完整且顺序固定；
2. 八个 `LifeArchetypeProfile` code 与八卦一一锁定；
3. `LifeArchetypeState` 保持既有定义，不被替换；
4. Mapping 同时保留显式 Schema 与 Foundation 引用；
5. Mapping 不推断四象、不推进 Runtime、不写入 Storage；
6. schema gate、release gate、build 与 `git diff --check` 通过。
