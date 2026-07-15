# GUANYAO Star Beast Prototype Motion Protocol

协议编号：`RC-STAR-BEAST-PROTOTYPE-MOTION-P79`

## 定义

Prototype Motion 是 P77 Prototype Render Projection 的时间表达适配层。它把已经确定的视觉表达参数投影为呼吸、尾部微动、星尘流动、Crystal 脉冲与边界微光节奏。

它不是生命状态，不是成长状态，也不生成新的生命事实。

## 固定链路

```text
P77 Prototype Render Projection
↓
P79 Prototype Motion Adapter
↓
P79 Prototype Motion Profile
↓
StarbeastLab Canvas
```

Adapter 只接收 `StarBeastPrototypeRenderProjection`，不得读取 Mother Code、Hexagram、Life Archetype、fourSymbol、用户画像或 Star Beast Identity。

## 动态表达边界

- breathing：星兽整体的安静呼吸起伏。
- tail：白虎尾部的低幅微动。
- stardust：内部星尘的流速与轨道幅度。
- crystalPulse：已有 Crystal 节点的光脉冲；节点不存在时必须关闭。
- boundaryShimmer：边界光的轻微明暗变化。

所有值都是原型视觉表达参数，不是生命事实；Motion Profile 不修改 Life State、Geometry、RenderPlan 或 Projection。

## 隔离范围

唯一允许的页面消费者是 `src/pages/StarbeastLab.tsx`。

本协议不接 LaunchLab、Gravity、Dynamics、Crystal UI、Storage 或正式 Renderer Runtime；不引入 WebGL、Three.js、3D 模型与正式视觉资产。
