# GUANYAO Star Beast Asset Prototype Readiness Protocol

协议编号：`RC-STAR-BEAST-ASSET-PROTOTYPE-READINESS-P78`

## 定义

> Asset Prototype Readiness 用于判断星兽资产定义是否具备进入未来原型消费链的资格。

Readiness 不等于 Consumption。`READY` 只回答“是否准备好被消费”，不执行“开始消费”。

它不是 Renderer、Asset Production、Memory 或 Growth，也不创建资产、渲染画面、动画和用户界面。

## 数据链

```text
LifeArchetypeProfile reference
        +
StarBeastAssetDefinition reference
        +
VisualState compatibility reference
        +
RendererContract reference
        ↓
StarBeastAssetPrototypeReadiness
        ↓
READY | UNAVAILABLE | BLOCKED
```

输入只保存引用，不复制资产事实、Life State、Visual State 或 Renderer Contract 内容。

## 状态语义

- `READY`：资产定义具备进入未来 Prototype Renderer Consumption 的条件，但尚未消费。
- `UNAVAILABLE`：资产定义缺失、引用不足或六层视觉结构不完整；这不是架构错误，可以等待补齐。
- `BLOCKED`：来源链错配、引用类型错误或资产架构保护边界失效；禁止进入消费。

## 六层完整性

乾星兽 Asset Definition 必须同时包含：

1. `CORE_BONE`
2. `STAR_CORE`
3. `STAR_PATTERN`
4. `LIGHT_BOUNDARY`
5. `COSMIC_CONSCIOUSNESS`
6. `CRYSTAL_IMPRINT`

缺少任意一层均返回 `UNAVAILABLE`。

## 来源与边界

唯一允许的来源链是：

```text
LifeArchetypeProfile
↓
StarBeastAssetDefinition
```

禁止 `fourSymbol → Asset`，禁止 `Canvas → Asset`。Readiness 不调用 Asset Architecture Mapping 重新创建资产，不调用 Renderer，不修改 Life State、Visual State、RenderPlan、Storage、Canvas 或 StarbeastLab。

## 后续边界

本协议不建立 Star Beast Prototype Consumer。即使返回 `READY`，正式消费仍必须由后续独立协议授权。
