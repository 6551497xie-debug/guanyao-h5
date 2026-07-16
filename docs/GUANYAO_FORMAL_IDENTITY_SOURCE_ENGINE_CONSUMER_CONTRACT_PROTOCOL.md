# GUANYAO Formal Identity Source Engine Consumer Contract Protocol

P129 Formal Identity Source Engine Consumption Contract

协议编号：`RC-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMER-CONTRACT-P129`

状态：`FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT_READY / NO_ENGINE_INVOCATION`

## 01｜本刀定位

P129 冻结正式身份来源引擎消费 P127 输入引用时的字段映射和边界。

```text
P127 Isolated Adapter
↓
P128 Engine Consumer Readiness
↓
P129 Engine Consumer Contract
↓
Future Formal Identity Source Engine
```

P129 是 contract-only，不执行引擎，不产生正式身份结果。

## 02｜字段映射

引擎消费契约固定为：

- `NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE` → 农历出生日期；
- `NORMALIZED_REFERENCE_HOUR_BRANCH` → 地支时辰；
- `NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL` → 时辰序数；
- `NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY` → 地点上下文引用。

地点只表达出生地点上下文，不参与星兽、母码或生命身份计算。

## 03｜状态语义

### READY

P128 readiness 与 P127 Adapter 输入角色完整，未来引擎具备独立消费契约。

### UNAVAILABLE

缺少或等待 P128 readiness，不执行引擎。

### BLOCKED

来源、字段映射或边界漂移，阻止引擎消费。

## 04｜严格边界

P129 禁止：

- 调用或修改正式身份来源引擎；
- 绑定真实用户、表单、页面、UI 或产品流程；
- 生成 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 写入 Storage 或修改 Life State。

本刀通过只表示“引擎消费契约已冻结”，不表示引擎已经执行。
