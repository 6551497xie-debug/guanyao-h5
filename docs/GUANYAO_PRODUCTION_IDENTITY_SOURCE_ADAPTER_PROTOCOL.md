# GUANYAO Production Identity Source Adapter Protocol

P115 Formal Identity Source Adapter Protocol

协议编号：`RC-PRODUCTION-IDENTITY-SOURCE-ADAPTER-P115`

阶段：`GUANYAO Productization Readiness Review`

状态：`FORMAL_IDENTITY_SOURCE_ADAPTER_READY / NOT_CONNECTED_TO_USER_OR_PRODUCT`

## 01｜本刀定位

P115 只把 P114 已确认的正式来源引用转换为未来产品化适配器可读取的稳定入口：

```text
P89 StarMansionLifeTrajectorySource
↓
P114 Production Identity Source Adapter Readiness
↓
P115 Formal Identity Source Adapter Reference
↓
Future Product Identity Consumer
```

P115 不接用户、不接产品、不接正式路由，也不创建 PersonalStarBeast 实体。

## 02｜输入与输出

输入只能是 P114 `ProductionIdentitySourceAdapterReadinessResult`。

只有 `READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER` 可以产生：

`ProductionIdentitySourceAdapterFormalReference`

输出只保存以下正式引用：

- 生命降临坐标；
- 本命星宿与二十八宿结果；
- 四象形态场结果；
- MotherCodeProfile；
- LifeArchetypeProfile；
- StarBeastIdentitySource；
- PersonalStarBeastIdentityReference。

P115 不复制任何生命事实，也不重新计算任何来源。

## 03｜状态语义

### AVAILABLE

P114 READY 且所有引用仍保持同一冻结来源对象，入口可交给未来正式消费者。

### UNAVAILABLE

P114 结果缺失或 P114 尚未可用。P115 不通过用户输入补齐。

### BLOCKED

Readiness 边界失效、正式入口引用非法或来源引用发生漂移。P115 必须停止交接。

## 04｜工程边界

P115 是引用适配器，不是用户适配器、产品 Runtime 或视觉适配器。

禁止：

- 调用星宿、四象、MotherCode 或 LifeArchetype Engine；
- 创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 接入 Launch、页面、表单、Storage、Gravity、Choice、Crystal；
- 不接入 Launch 或任何正式用户入口；
- 读取 P96 隔离 Fixtures 作为生产来源；
- 修改 P89 来源冻结和 P114 Readiness 语义。

后续只有在真实输入策略、错误态、隐私策略和产品入口评审完成后，才能建立下游消费者。
