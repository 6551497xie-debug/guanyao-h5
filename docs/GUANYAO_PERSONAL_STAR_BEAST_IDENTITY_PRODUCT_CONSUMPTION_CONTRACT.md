# GUANYAO Personal Star Beast Identity Product Consumption Contract

协议编号：`RC-PERSONAL-STAR-BEAST-IDENTITY-PRODUCT-CONSUMPTION-CONTRACT-P136`

## 1. 定位

P136 位于：

```text
P134 Formal Identity Source Convergence
↓
P135 Product Consumption Readiness
↓
P136 Product Consumption Contract
↓
Future Product Consumer
```

本刀只冻结未来产品消费者可以读取的正式身份引用边界。它不是产品消费实现，不是用户绑定，也不是生命实体创建。

## 2. 输入与输出

输入必须是 P135 的 `READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION` 结果。

输出是 `PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT` 引用，允许未来消费者读取正式身份引用及其来源链，但仍保持：

- `productConsumption = NOT_PERFORMED`
- `referenceOnly = true`
- `noAutomaticUserBinding = true`
- `explicitUserBindingRequired = true`

## 3. 产品消费者边界

未来产品消费者：

- 可以读取正式身份引用；
- 不得重新计算星宿、四象、MotherCode 或 LifeArchetype；
- 不得把四象转换为动物身份；
- 不得自动绑定真实用户；
- 不得直接创建 PersonalStarBeast、用户画像、Scene Model 或视觉资产；
- 必须在后续独立的显式授权契约后，才能进入真实产品消费。

## 4. 明确未发生的动作

P136 不执行：

- 产品消费；
- 用户输入绑定；
- Storage 写入；
- UI 或 Renderer 调用；
- Engine 调用；
- Life State 修改；
- PersonalStarBeast 实体创建。

## 5. 状态

- `READY`：契约完整，可供未来产品消费者评审；
- `UNAVAILABLE`：P135 Readiness 不存在或不可用；
- `BLOCKED`：来源、边界或消费范围漂移。

P136 的 `READY` 不等于产品已经接入，也不等于用户已经确认。
