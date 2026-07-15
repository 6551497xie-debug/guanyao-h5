# GUANYAO Star Beast Prototype Frame Sampler Protocol

协议编号：`RC-STAR-BEAST-PROTOTYPE-FRAME-SAMPLER-P80`

## 定义

Prototype Frame Sampler 是隔离原型的确定性时间采样层。它把 P78 Geometry Profile、P79 Motion Profile 与显式时间输入转换为一个不可变 Frame State。

```text
P78 Geometry Profile
        +
P79 Motion Profile
        +
Explicit Time Input
        ↓
P80 Prototype Frame Sampler
        ↓
Immutable Prototype Frame State
        ↓
StarbeastLab Canvas
```

Frame State 只包含本帧的呼吸偏移、星核脉冲、尾部相位、星尘相位、Crystal 脉冲与边界微光倍率。相同输入必须得到相同结果。

## 来源一致性

Geometry Profile 与 Motion Profile 必须来自同一个 P77 Projection。Sampler 不重新解释 Projection，也不读取 Mother Code、Hexagram、Life Archetype、fourSymbol、用户画像或 Star Beast Identity。

## 时间边界

- 时间由调用方显式传入，Sampler 内部不得读取系统时钟。
- 时间必须是有限且非负的秒值。
- Sampler 不创建动画循环，不持有跨帧状态。
- Canvas 只消费已经采样完成的 Frame State。

## 隔离边界

唯一允许的页面消费者是 `src/pages/StarbeastLab.tsx`。

本协议不接 LaunchLab、Gravity、Dynamics、Crystal UI、Storage 或正式 Renderer Runtime；不修改 Life State、Geometry、Motion、RenderPlan 或 Projection。
