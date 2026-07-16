# GUANYAO Normalized Reference Formal Identity Source Adapter Bridge Protocol

P123 Normalized Reference → Formal Identity Source Adapter Bridge Review

协议编号：`RC-NORMALIZED-REFERENCE-FORMAL-IDENTITY-SOURCE-ADAPTER-BRIDGE-P123`

状态：`READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW / NO_ADAPTER_INVOCATION`

## 01｜本刀定位

P123 只评审 P122 规范化引用是否具备成为未来正式身份来源适配器输入的稳定桥接资格。

```text
P122 Input Normalizer
↓
P123 Normalized Reference Bridge Review
↓
Future Formal Identity Source Adapter
```

P123 是桥接评审，不是正式适配器调用，不是用户入口，也不是产品接入。

## 02｜输入与输出

- 输入只接受 `ProductionIdentitySourceInputNormalizerResult` 引用；
- `READY` 只保留 P122 的 `FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE`；
- 农历年月日是未来正式身份计算的规范日期来源；
- 地支时辰及序数是未来正式身份计算的规范时间来源；
- 地点只作为 `BIRTH_LOCATION_CONTEXT_REFERENCE` 上下文引用；
- 地点不参与星兽推导，也不参与母码推导；
- 不复制、不重算、不解释生命身份事实。

明确：地点不参与母码推导；本刀不重新计算日期、时辰、身份、星兽或生命状态。

## 03｜状态语义

### READY

规范化引用完整、边界完整，输出 `FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW`，供未来适配器实现评审。

### UNAVAILABLE

没有规范化结果，或 P122 仍在等待必要资料；不推进适配器。

### BLOCKED

规范化结果或其边界漂移；阻止进入后续适配器评审。

## 04｜严格边界

P123 禁止：

- 调用正式身份来源适配器；
- 调用星宿、四象、MotherCode、LifeArchetype 或其他计算引擎；
- 绑定真实用户、表单、页面、UI 或产品流程；
- 调用 Renderer、创建 SceneModel 或写入 Storage；
- 重新计算日期、时辰、身份、星兽或生命状态。

P123 完成后，下一刀仍需独立评审未来正式身份来源适配器的输入消费契约。
