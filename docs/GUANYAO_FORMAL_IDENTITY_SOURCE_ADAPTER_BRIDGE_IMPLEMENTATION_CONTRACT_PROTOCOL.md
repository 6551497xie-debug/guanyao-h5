# GUANYAO Formal Identity Source Adapter Bridge Implementation Contract Protocol

P125 Formal Identity Source Adapter Input Consumption Contract

协议编号：`RC-FORMAL-IDENTITY-SOURCE-ADAPTER-BRIDGE-IMPLEMENTATION-CONTRACT-P125`

状态：`FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY / NOT_PERFORMED`

## 01｜本刀定位

P125 冻结未来正式身份来源 Adapter 的输入消费契约，不实现或调用 Adapter。

```text
P122 Input Normalizer
↓
P123 Normalized Reference Bridge Review
↓
P124 Adapter Bridge Implementation Readiness
↓
P125 Adapter Input Consumption Contract
↓
Future Formal Identity Source Adapter
```

## 02｜输入契约

未来 Adapter 只消费 P122 规范化引用中的：

- 农历年月日：`NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE`；
- 地支时辰：`NORMALIZED_REFERENCE_HOUR_BRANCH`；
- 地支序数：`NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL`；
- 地点：`NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY`。

输入形状冻结为：`NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE`。

地点仍然只是上下文引用，不参与星兽、母码或其他生命身份推导。

## 03｜状态语义

### READY

P124 readiness 完整，未来 Adapter 的输入来源、角色和边界已明确。

### UNAVAILABLE

缺少或等待 P124 readiness，不推进 Adapter。

### BLOCKED

P124 来源或边界漂移，阻止 Adapter 实施。

## 04｜严格边界

P125 是 contract-only（不是 Adapter 实现）：

- `adapterInvocation = NOT_PERFORMED`；
- `engineInvocation = NOT_PERFORMED`；
- 不接真实用户、表单、页面、UI 或产品流程；
- 不调用星宿、四象、MotherCode、LifeArchetype 或其他引擎；
- 不创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 不写入 Storage，不重新计算生命身份。

下一刀才可独立评审 Adapter 实施方案，仍需保持产品接入隔离。
