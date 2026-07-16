# GUANYAO Star Beast Asset Prototype Adapter Contract

协议编号：`RC-STAR-BEAST-ASSET-PROTOTYPE-ADAPTER-CONTRACT-P80`

## 定义

> StarBeastAssetPrototypeAdapterContract 将 P79 已确认可消费的资产引用，转换为原型系统可以理解的六层表达通道。

三层职责固定分离：

- Asset Definition 描述“星兽由什么组成”。
- Prototype Adapter 描述“这些组成如何被原型系统理解”。
- Renderer 负责未来“如何显示”。

Adapter Result 不是 Renderer Output，也不是正式资产消费结果。

## 数据链

```text
LifeArchetypeProfile
↓
StarBeastAssetDefinition
↓
Asset Prototype Consumption
↓
StarBeastAssetPrototypeAdapterInput
↓
Prototype Expression Channels
↓
Future Prototype Renderer
```

输入只保存 Asset Definition、P79 Consumption、Visual State 与 Renderer Contract 引用，不复制资产事实。

## 六层表达通道

1. `CORE_BONE_CHANNEL`：引用生命骨架与结构方向。
2. `STAR_CORE_CHANNEL`：引用星核位置与显化强度语义。
3. `STAR_PATTERN_CHANNEL`：引用轨迹、连接和生命路径语义。
4. `LIGHT_BOUNDARY_CHANNEL`：引用存在感与轮廓语义。
5. `COSMIC_CONSCIOUSNESS_CHANNEL`：引用流动、呼吸和空间语义。
6. `CRYSTAL_IMPRINT_CHANNEL`：引用生命印记显化语义。

通道只持有 P77 子系统及 Visual State 的原始引用，不复制坐标、强度、轨迹或生命事实。

## 状态语义

- `AVAILABLE`：六层来源均存在且 P79 消费来源一致，表达通道可以交给未来原型 Renderer。
- `UNAVAILABLE`：四类输入引用中至少一类缺失。
- `BLOCKED`：来源链错配、P79 边界失效或六层来源被破坏，禁止转换。

## 边界

P80 Adapter 只做单向语义转换，不反向调用 P77、P78 或 P79 Service，不重新创建 Asset Definition，不推导 LifeArchetype、fourSymbol 或用户身份。

本刀不调用 Renderer，不访问 Canvas，不修改 StarbeastLab，不开发动画，不生成图片或模型，不接 UI、Storage、Life State、Visual State 或正式 Runtime。

## 后续边界

P80 只建立 Adapter Contract 与表达通道结果，不建立实际 Renderer 消费者。任何 Canvas 或 StarbeastLab 接入必须由后续独立授权完成。
