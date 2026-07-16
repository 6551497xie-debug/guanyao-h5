# GUANYAO Formal Identity Source Engine Consumer Authorization Protocol

P130 Formal Identity Source Engine Consumer Authorization Review

协议编号：`RC-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMER-AUTHORIZATION-P130`

状态：`AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION / NOT_PERFORMED`

## 01｜本刀定位

P130 只评审是否允许未来执行一次隔离的正式身份来源引擎消费。

```text
P127 Isolated Adapter
↓
P128 Engine Consumer Readiness
↓
P129 Engine Consumer Contract
↓
P130 Isolated Engine Consumption Authorization
↓
Future Formal Identity Source Engine Consumption
```

P130 不执行引擎，不生成正式身份结果，也不接入产品。

## 02｜授权范围

授权范围固定为：`ISOLATED_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY`。

允许下一刀在隔离边界内消费 P129 contract；本刀本身保持：

- `userBindingAuthorization = false`；
- `productIntegrationAuthorization = false`；
- `engineInvocation = NOT_PERFORMED`。

## 03｜状态语义

### AUTHORIZED

P129 契约、P128 readiness 和所有隔离边界完整，允许未来进入独立引擎消费实施刀。

### UNAVAILABLE

缺少或等待 P129 contract，不推进引擎消费。

### BLOCKED

来源或边界漂移，拒绝后续引擎消费。

## 04｜严格边界

P130 禁止：

- 调用或修改任何正式身份来源引擎；
- 接入真实用户、表单、页面、UI 或产品流程；
- 创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 写入 Storage 或修改 Life State；
- 将隔离引擎消费授权解释为 Production 接入授权。
