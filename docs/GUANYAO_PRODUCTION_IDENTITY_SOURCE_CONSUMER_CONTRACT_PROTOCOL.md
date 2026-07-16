# GUANYAO Production Identity Source Consumer Contract Protocol

P117 Formal Identity Source Consumer Contract Review Protocol

协议编号：`RC-PRODUCTION-IDENTITY-SOURCE-CONSUMER-CONTRACT-P117`

状态：`FORMAL_IDENTITY_SOURCE_CONSUMER_CONTRACT_READY / NO_CONSUMER_CREATED`

## 01｜本刀定位

P117 只冻结未来正式身份来源消费者的输入、输出与边界契约：
本刀不创建消费者，不接用户，不接产品。

```text
P114 Readiness
↓
P115 Formal Identity Source Adapter
↓
P116 Consumer Readiness Review
↓
P117 Consumer Contract Review
↓
Future Formal Identity Source Consumer
```

P117 是契约评审，不是消费者实现，不是用户入口，也不是产品 Runtime。

## 02｜输入契约

未来正式消费者只能接收 P116 的：

`FORMAL_IDENTITY_SOURCE_CONSUMER_READINESS`

并且状态必须为：

`READY_FOR_FORMAL_IDENTITY_SOURCE_CONSUMER_REVIEW`

消费者只接收来源引用，不复制星宿、四象、MotherCode、LifeArchetype 或个人身份事实；
消费者也不得通过用户输入、页面表单或本地存储补齐来源。

## 03｜输出契约

未来正式消费者只能输出稳定引用：

`FORMAL_IDENTITY_SOURCE_CONSUMPTION_REFERENCE`

该输出表示“正式身份来源可被下游读取”，不等于创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer。

## 04｜状态语义

### READY

P116 就绪引用完整，输入与输出契约可供未来消费者单独实现评审。

### UNAVAILABLE

P116 缺失或尚未可用。P117 不通过用户输入补齐。

### BLOCKED

P116 被阻断、边界破坏或契约引用失效。必须停止向下交接。

## 05｜严格边界

P117 只消费 P116 Result，禁止：

- 创建正式身份来源消费者、用户身份对象或产品 Runtime；
- 接入 Launch、页面、表单、路由、Storage 或正式用户流程；
- 调用星宿、四象、MotherCode、LifeArchetype、Gravity、Choice 或 Crystal；
- 创建 SceneModel、Asset、RenderPlan 或 Renderer；
- 修改任何正式身份来源、Life State 或既有 Engine。

只有在未来独立完成真实输入策略、错误态、隐私、产品授权与消费者实现评审后，才可施工正式 Consumer。

## 06｜工程五问记录

1. **属于哪一层？** 工程契约层，位于身份来源适配与未来消费者之间。
2. **输入来源是什么？** P116 `ProductionIdentitySourceConsumerReadinessResult`。
3. **输出结果是什么？** 仅输出消费者输入/输出的稳定引用契约。
4. **是否改变生命规则？** 否，不计算、不重写、不反推任何生命来源。
5. **是否需要跨层评审？** 需要；正式 Consumer 施工前必须重新评审产品、隐私、输入与下游消费边界。
