# RC-STAR-BEAST-PROTOTYPE-GEOMETRY-P78

## BAIHU PROTOTYPE GEOMETRY PROFILE

P78 建立第一只可辨识星兽的隔离几何轮廓，用来继续验证 P77 Projection 能否驱动真实 Canvas2D 表达。

固定链路：

```text
StarBeastRenderPlan
↓
P77 Prototype Render Projection
↓
P78 Baihu Prototype Geometry Profile
↓
StarbeastLab Canvas2D
```

## 几何构成

`BAIHU_CONSTELLATION_V1` 只提供归一化视觉几何：

- 七枚核心星点；
- 星纹骨架；
- 白虎身体、头部、四肢、尾部与内部纹路的边界路径；
- Crystal 节点的几何锚点。

几何坐标范围固定为 `0..1`，不包含像素、Canvas 指令、贴图、模型或图片资产。Canvas 尺寸只由 StarbeastLab 在绘制时换算。

## 输入与语义边界

`resolveBaihuPrototypeGeometryProfile` 只接收 P77 `StarBeastPrototypeRenderProjection`。

它不读取或推导：

- Mother Code；
- Hexagram；
- Life Archetype；
- fourSymbol；
- User Profile；
- Star Beast Identity 业务结果。

`BAIHU` 只是本次隔离视觉原型的固定 Geometry ID，不是对用户星兽身份的判断。

## 隔离范围

唯一允许消费者是 `src/pages/StarbeastLab.tsx`。P78 不接入 LaunchLab、Gravity、Dynamics、Crystal UI、Storage 或正式 Renderer Runtime。

P78 不引入 WebGL、Three.js、3D 模型和正式视觉资产，也不修改 P39–P77 的计算结果、生命状态或治理结果。
