# GUANYAO Personal Star Beast Explicit User Binding Authorization Review

协议编号：`RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-REVIEW-P137`

## 1. 定位

P137 位于：

```text
P135 Product Consumption Readiness
↓
P136 Product Consumption Contract
↓
P137 Explicit User Binding Authorization Review
↓
Future Explicit User Authorization
```

本刀只评审未来真实用户绑定所需的授权前提，不采集用户同意，不执行绑定，也不开始产品消费。

## 2. READY 的真实含义

`READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION` 只表示：

- P136 产品消费契约完整；
- 正式身份引用与来源链没有漂移；
- 未来可以进入独立的显式授权流程评审。

它不表示用户已经授权，`authorizationStatus` 必须保持 `NOT_AUTHORIZED`。

## 3. 显式授权边界

未来授权流程必须：

- 接收明确的用户同意动作；
- 绑定正式身份引用，而不是重新计算身份；
- 明确记录授权范围；
- 在授权完成前不得消费产品身份、创建用户画像或写入 Storage。

P137 当前只输出引用契约，`userBinding = NOT_PERFORMED`、`userConsent = NOT_CAPTURED`、`productConsumption = NOT_PERFORMED`。

冻结值：`authorizationStatus = NOT_AUTHORIZED`。

## 4. 禁止越权

P137 不执行：

- 自动绑定真实用户；
- 默认同意或隐式同意；
- UI 接入；
- Storage 写入；
- Engine、Renderer 调用；
- PersonalStarBeast、用户画像或 Life State 创建。

## 5. 状态

- `READY`：具备进入未来显式授权流程的契约条件；
- `UNAVAILABLE`：P136 契约不存在或不可用；
- `BLOCKED`：契约边界、身份引用或授权范围漂移。
