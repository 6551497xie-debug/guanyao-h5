# GUANYAO Isolated Formal Identity Source Engine Consumption Protocol

P131 Isolated Formal Identity Source Engine Consumer Implementation

协议编号：`RC-ISOLATED-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMPTION-P131`

状态：`FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_AVAILABLE / ISOLATED_ONLY`

## 01｜本刀定位

P131 在 P130 授权范围内，隔离消费既有正式计算引擎：

```text
P129 Engine Consumer Contract
↓
P130 Isolated Engine Consumption Authorization
↓
P131 Isolated Engine Consumer
↓
Mansion/Four Symbol Result Reference + MotherCode Result Reference
```

P131 是第一次执行引擎消费，但不是身份汇合、不是 PersonalStarBeast 创建、不是产品消费。

## 02｜执行规则

- 只接受 P130 授权、P129 契约和 P127 Adapter 输出；
- 调用既有 `resolveStarbeastFromBirthDate`，取得星宿/四象来源结果；
- 调用既有 `runMotherCodeLandingEngine`，取得母码结果；
- 不修改既有引擎算法；
- 不重新选择四象、不重新计算母码、不反推生命身份；
- 输出仅作为后续身份汇合的结果引用。

## 03｜状态语义

### AVAILABLE

两项既有引擎均成功返回，输出隔离消费结果。

### UNAVAILABLE

缺少授权、契约或 Adapter 结果，不执行引擎。

### BLOCKED

边界、引用关系或引擎结果不满足要求，拒绝输出。

## 04｜严格边界

P131 明确保持：

- `identityConvergence = NOT_PERFORMED`；
- `personalStarBeastCreation = false`；
- `productionIntegration = false`；
- `userBinding = false`；
- 不接 UI、Renderer、Storage 或真实用户。

下一刀才可评审两项正式结果的身份来源汇合，不得把本刀输出直接当作产品身份结果。
