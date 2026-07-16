# GUANYAO Star Beast Asset Prototype Consumption Protocol

协议编号：`RC-STAR-BEAST-ASSET-PROTOTYPE-CONSUMPTION-P79`

## 定义

> Asset Prototype Consumption 将已经通过 P78 资格判断的星兽资产定义，转换为未来 Prototype Adapter 可以读取的稳定引用结果。

Consumption 不等于 Rendering。`AVAILABLE` 只建立消费边界，不生成画面、帧、动画、图片或模型。

它不是 Renderer、Canvas Adapter、Asset Production、Memory 或 Growth。

## 数据链

```text
StarBeastAssetPrototypeReadinessResult
        +
StarBeastAssetDefinition reference
        +
VisualState compatibility reference
        +
RendererContract reference
        ↓
StarBeastAssetPrototypeConsumption
        ↓
AVAILABLE | UNAVAILABLE | BLOCKED
```

消费结果只保留上游引用，不复制资产结构、生命事实、Visual State 或 Renderer Contract 内容。

## 状态规则

- P78 `READY` 且全部引用一致，返回 `AVAILABLE`。
- P78 `UNAVAILABLE`，保持 `UNAVAILABLE`，等待资产或引用补齐。
- P78 `BLOCKED`，保持 `BLOCKED`，禁止进入未来 Prototype Adapter。
- READY 后引用缺失，返回 `UNAVAILABLE`。
- READY 后引用错配，返回 `BLOCKED`。

## 架构边界

本协议只允许单向链路：

```text
Asset Prototype Readiness
↓
Asset Prototype Consumption
↓
Future Prototype Adapter
```

Consumption 不反向调用 Readiness，不重新创建 Asset Definition，不调用 Renderer，不连接 Canvas、StarbeastLab、UI 或 Storage，也不修改 Life State、Visual State 与 RenderPlan。

## 后续边界

本协议不建立实际 Prototype Adapter 消费者。即使返回 `AVAILABLE`，Renderer Execution 仍未发生，后续接入必须由独立协议授权。
