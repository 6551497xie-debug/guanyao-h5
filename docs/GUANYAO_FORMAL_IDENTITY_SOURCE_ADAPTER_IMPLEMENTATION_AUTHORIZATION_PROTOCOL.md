# GUANYAO Formal Identity Source Adapter Implementation Authorization Protocol

P126 Formal Identity Source Adapter Isolated Implementation Authorization Review

协议编号：`RC-FORMAL-IDENTITY-SOURCE-ADAPTER-IMPLEMENTATION-AUTHORIZATION-P126`

状态：`AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION / NOT_PERFORMED`

## 01｜本刀定位

P126 只评审是否允许未来实现一个隔离的正式身份来源 Adapter。

```text
P122 Input Normalizer
↓
P123 Normalized Reference Bridge Review
↓
P124 Adapter Bridge Implementation Readiness
↓
P125 Adapter Input Consumption Contract
↓
P126 Isolated Adapter Implementation Authorization
↓
Future Formal Identity Source Adapter
```

## 02｜授权范围

授权只覆盖：`ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_ONLY`。

允许下一刀设计并实现一个只消费 P125 contract 的隔离 Adapter；本刀本身不实现、不调用 Adapter。

明确：

- `userBindingAuthorization = false`；
- `productIntegrationAuthorization = false`；
- `adapterInvocation = NOT_PERFORMED`；
- `engineInvocation = NOT_PERFORMED`。

## 03｜状态语义

### AUTHORIZED

P125 契约、来源映射与隔离边界完整，允许未来进入独立 Adapter 实施刀。

### UNAVAILABLE

缺少或等待 P125 contract，不进入 Adapter 实施。

### BLOCKED

P125 来源或边界漂移，撤销后续实施入口。

## 04｜严格边界

P126 禁止：

- 接入真实用户、表单、页面、UI 或产品流程；
- 调用或修改星宿、四象、MotherCode、LifeArchetype 等引擎；
- 创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 写入 Storage 或修改生命状态；
- 将隔离实现授权解释为 Production 接入授权。

下一刀必须重新限定为隔离 Adapter 实施，并继续通过独立 gate。
