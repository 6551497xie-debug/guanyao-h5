# GUANYAO Formal Identity Source Input Normalizer Implementation Protocol

P122 Formal Input Normalizer Isolated Implementation

协议编号：`RC-FORMAL-INPUT-NORMALIZER-ISOLATED-IMPLEMENTATION-P122`

状态：`FORMAL_IDENTITY_SOURCE_NORMALIZATION_READY / NO_PRODUCT_INTEGRATION`

## 01｜本刀定位

P122 实现一个隔离的纯归一化服务：将结构化出生日期、本地出生时间与可选地点上下文转换为稳定的身份来源归一化引用。

```text
Gregorian Date + Local Birth Time + Location Context
↓
P122 Isolated Input Normalizer
↓
FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE
↓
Future Identity Source Consumer
```

P122 不是表单、不是用户入口、不是产品 Runtime，也不创建 PersonalStarBeast。

## 02｜实现规则

- 公历日期调用既有 `resolveBirthCalendarFromGregorianDate`；
- 本地时间按既有地支时辰序列映射为 `HourBranch`；
- 农历年月日是后续正式计算的规范日期来源；
- 地点只输出无原文的上下文引用；
- 地点不参与星兽推导，也不参与母码推导；
- 输出不携带原始日期对象、原始时间字符串或地点文本。

## 03｜状态规则

### READY

输出完整的 `FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE`。

### UNAVAILABLE

缺少日期、缺少时间，或既有日历/时辰能力暂不可用。

### BLOCKED

日期、时间或地点上下文格式非法。

## 04｜严格边界

P122 禁止：

- 接入真实用户、表单、页面、UI 或 Launch；
- 写入 Storage；
- 调用或修改星宿、四象、MotherCode、LifeArchetype、Gravity、Choice 或 Crystal；
- 创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 修改既有日历引擎或母码/星宿计算规则。

## 05｜地点保护

```text
地点输入
↓
无原文地点上下文引用
↓
不参与星兽推导
不参与母码推导
```

相同日期与时间在不同地点上下文下，归一化的日期与时辰结果必须保持一致。
