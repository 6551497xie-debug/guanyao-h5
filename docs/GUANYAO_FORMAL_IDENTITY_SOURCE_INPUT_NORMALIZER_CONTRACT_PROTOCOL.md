# GUANYAO Formal Identity Source Input Normalizer Contract Protocol

P120 Formal Input Normalizer Implementation Contract

协议编号：`RC-FORMAL-INPUT-NORMALIZER-IMPLEMENTATION-CONTRACT-P120`

状态：`FORMAL_INPUT_NORMALIZER_CONTRACT_READY / NO_NORMALIZER_IMPLEMENTED`

## 01｜本刀定位

P120 只冻结未来 Formal Input Normalizer 的实现契约：输入形状、归一化输出引用、错误态与隐私边界。

```text
P118 Consumer Implementation Authorization
↓
P119 Input Normalization Boundary Review
↓
P120 Formal Input Normalizer Contract
↓
Future Formal Input Normalizer
```

P120 不是归一化器实现，不是表单，不是用户入口，也不是正式 Consumer。

## 02｜输入契约

未来归一化器接受：

`GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT`

- 日期必填，格式为 `ISO_GREGORIAN_DATE`；
- 本地出生时间必填，格式为 `LOCAL_CLOCK_TIME`；
- 出生地点上下文可选；
- 地点只作为上下文保留，不参与星兽推导或母码推导；
- 原始输入不得持久化。

## 03｜输出契约

未来归一化器只能输出：

`FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE`

该引用指向既有公历转农历与本地时间归入地支时辰的计算结果，不是生命身份结果，不是 PersonalStarBeast，不是用户画像。

正式计算以农历年月日与时辰序数为准；本层不得重算身份。

## 04｜错误态契约

| 情况 | 状态 |
| --- | --- |
| 缺少出生日期 | `UNAVAILABLE` |
| 缺少出生时间 | `UNAVAILABLE` |
| 日期格式非法 | `BLOCKED` |
| 时间格式非法 | `BLOCKED` |
| 地点上下文非法 | `BLOCKED` |
| 日历引擎暂不可用 | `UNAVAILABLE` |
| 时辰引擎暂不可用 | `UNAVAILABLE` |

P120 只定义这些状态，不执行错误处理 UI 或用户提示。

## 05｜严格边界

P120 只消费 P119 Review Result，禁止：

- 接收、保存或绑定真实用户数据；
- 执行公历转农历、时辰换算或身份重算；
- 创建表单、页面、路由、UI、产品 Runtime 或正式 Consumer；
- 修改星宿、四象、MotherCode、LifeArchetype、PersonalStarBeast 或既有 Engine；
- 接入 Renderer、WebGL、SceneModel、Asset、RenderPlan 或 Storage。

## 06｜下一步

P120 之后，才可独立评审并实现 Formal Input Normalizer；实现完成后仍需重新通过输入、隐私、错误态与正式 Consumer gate。
