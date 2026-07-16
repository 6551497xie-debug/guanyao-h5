# GUANYAO Isolated Formal Identity Source Adapter Implementation Protocol

P127 Isolated Formal Identity Source Adapter Implementation

协议编号：`RC-ISOLATED-FORMAL-IDENTITY-SOURCE-ADAPTER-IMPLEMENTATION-P127`

状态：`ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE / NO_PRODUCT_INTEGRATION`

## 01｜本刀定位

P127 实现第一个真实 Adapter，但它只消费已经授权的 P125 输入契约，并输出稳定的正式身份来源引擎输入引用。

```text
P125 Adapter Input Consumption Contract
↓
P126 Isolated Implementation Authorization
↓
P127 Isolated Formal Identity Source Adapter
↓
Formal Identity Source Engine Input Reference
```

P127 不是用户入口、不是 Product Consumer、不是 Renderer Adapter，也不重新计算生命身份。

## 02｜消费规则

- 必须同时提供 P126 `AUTHORIZED` 与 P125 `READY`；
- Adapter 只读取 P125 的输入形状和来源映射；
- 输出只保留规范化引用，不复制原始用户输入；
- 农历日期、地支时辰和时辰序数沿用 P122 规范化引用；
- 地点仍为上下文引用，不参与星兽或母码推导；
- Adapter 不调用任何星宿、四象、MotherCode、LifeArchetype 或其他引擎。

## 03｜状态语义

### AVAILABLE

授权与契约一致，输出 `FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE`。

### UNAVAILABLE

缺少授权或契约仍在等待，不执行 Adapter。

### BLOCKED

授权边界、契约边界或两者引用关系漂移，拒绝输出。

## 04｜隔离边界

P127 禁止：

- 接入真实用户、表单、页面、UI 或产品流程；
- 调用或修改既有生命计算引擎；
- 创建 PersonalStarBeast、SceneModel、Asset、RenderPlan 或 Renderer；
- 写入 Storage 或修改 Life State；
- 将 Adapter 输出直接视为产品身份结果。

下一阶段才可评审 Formal Identity Source Engine 对该引用的消费方式。
