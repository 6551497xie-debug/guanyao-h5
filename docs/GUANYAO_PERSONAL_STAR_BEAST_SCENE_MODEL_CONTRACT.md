# GUANYAO Personal Star Beast Scene Model Contract V1.0

协议编号：`RC-PERSONAL-STAR-BEAST-SCENE-MODEL-CONTRACT-P94`

阶段：`GUANYAO Visual Architecture Stabilization`

状态：`RENDERER-NEUTRAL CONTRACT ONLY / NO WEBGL AUTHORIZATION`

## 00｜合同目标

P94 冻结正式视觉链中的中间语义层：

```text
Identity
↓
Manifestation
↓
Scene Model
↓
Renderer
```

其中 `Scene Model` 是 `VISUAL / Visual State` 层内的专用场景表达合同，不是新的生命层，不改变 P0、P1、P90、P92、P39 或 P40。

完整工程链保持：

```text
PersonalStarBeastIdentityReference
↓
P92 Manifestation Grammar Reference
↓
PersonalStarBeastSceneModel
↓
Future P40 Scene Model Adapter
↓
StarBeastRenderPlan
↓
Future Renderer Backend
```

P94 不建立 Adapter，不允许 Renderer 直接消费 Scene Model，不授权 WebGL Prototype。

## 01｜正式输入来源

Scene Model 只接收已经成立的引用：

### Manifestation Readiness Reference

必须指向 P90：

`READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN`

该引用只证明可以进入显化设计，不等于可以生成资产、视觉参数或调用 Renderer。

### Personal Star Beast Identity Reference

正式身份继续来自：

```text
Mansion Seed
+ Four Symbol Field
+ LifeArchetype Force
↓
PersonalStarBeastIdentityReference
```

Scene Model 不得计算、补全、替换或反推身份。

### Manifestation Grammar Reference

必须指向 P92 `GUANYAO Visual Manifestation Grammar V1.0`，并保持与正式 Identity 为同一来源引用。

它只证明显化语法已经确定，不复制显化事实，不携带 Renderer 参数。

## 02｜Scene Model 六类引用

### 1. Mansion Seed Structure Reference

表达本命星宿提供的生命种子、核心星点、初始结构、生命骨架与原始轨迹的语义引用。

它不包含坐标、连线数组、Path、Geometry 或星点尺寸。

### 2. Four Symbol Spatial Field Reference

表达四象提供的空间形态、动势、边界与气质场引用。

四象不是动物资产。该引用必须声明：

`notFourSymbolAnimalAsset: true`

禁止由该引用选择白虎、青龙、朱雀或玄武的独立动物模型。

### 3. Life Force Modulation Reference

表达 MotherCode / LifeArchetype 提供的能量方向、呼吸节奏、聚合方式、稳定程度与变化倾向引用。

该引用必须声明：

`noBeastFormGeneration: true`

生命原力不生成兽形，不改变本命星宿或四象来源。

### 4. Optional Crystal Imprint Reference

Crystal 引用允许为 `null`。

有 Crystal 时只表达经历经过 Reality Pressure、Gravity、Choice 后留下的生命印记；没有 Crystal 时不得模拟成长、Memory 或生命纹理。

Crystal 不参与初始身份生成。

### 5. Manifestation Stage Reference

只引用当前显化阶段，不在 Scene Model 内重新定义体验阶段顺序，也不允许 Renderer 自动推进阶段。

### 6. Quality Profile Reference

只引用表达质量策略。质量可以影响细节、粒子、分辨率或动态等级，但必须保持：

- `expressionQualityOnly: true`；
- `noIdentityEffect: true`。

P94 不执行设备检测，也不选择 HIGH、BALANCED 或 FALLBACK。

## 03｜Scene Model 正式定义

`PersonalStarBeastSceneModel` 定义为：

> 将正式 Personal Star Beast Identity 与 P92 Manifestation Grammar 转换为未来 Visual State / RenderPlan Adapter 可读取的 Renderer-neutral 场景语义引用集合。

它必须保持：

- `visualStateSpecialization: true`；
- `rendererNeutral: true`；
- `referenceOnly: true`；
- `noLifeFactCopy: true`；
- `noIdentityCalculation: true`；
- `noAssetGeneration: true`；
- `noDrawCommands: true`；
- `noRendererInvocation: true`。

Scene Model 不是：

- Personal Star Beast 实体；
- Renderer Input；
- RenderPlan；
- Canvas 绘图数据；
- Three.js Scene；
- WebGL Shader；
- 动画时间轴；
- 视觉资产；
- UI ViewModel；
- Production 授权。

## 04｜技术中立边界

P94 类型文件禁止包含：

- `CanvasRenderingContext2D`；
- `Path2D`；
- `WebGLRenderingContext`；
- Three.js `Object3D`、Geometry、Material；
- Shader、Uniform、Texture 定义；
- 坐标与粒子参数；
- `requestAnimationFrame`；
- Device / GPU Probe；
- localStorage / sessionStorage；
- Engine、Resolver 或 Service 调用。

同一 Scene Model 未来可以被 WebGL、Canvas 或 Static Adapter 以不同质量表达，但不得复制三套身份逻辑。

## 05｜与 P39 / P40 的关系

P39 `StarBeastVisualState` 继续承载 Journey、能量、光、星纹、Presence 与 Crystal Presence 等通用视觉状态。

P94 不覆盖 P39。PersonalStarBeastSceneModel 是 Visual State 层的专用场景表达，未来必须通过独立 Adapter 与 P39/P40 合流。

P40 `StarBeastRenderPlan` 继续保持 Renderer-neutral、无像素、无 Draw Command、无 Asset Generation。未来 P40 Adapter 负责把 Scene Model 引用翻译为正式 RenderPlan 通道；P94 不实现该翻译。

固定：

```text
Scene Model
↓
Future P40 Adapter
↓
RenderPlan
↓
Renderer
```

禁止：

```text
Scene Model
↓
直接调用 Renderer
```

## 06｜合同护栏

`PersonalStarBeastSceneModelBoundary` 固定声明：

- `contractOnly: true`；
- `sceneModelIsVisualStateSpecialization: true`；
- `identityToManifestationToSceneModelToRenderer: true`；
- `futureP40AdapterRequired: true`；
- `directRendererConsumptionForbidden: true`；
- `backendSelectionDeferred: true`；
- `webGLPrototypeAuthorizationDeferred: true`。

该合同不解除 P73–P76 的 Backend Governance deferred 状态，也不改变 P84–P87 `FOUR_SYMBOL_VISUAL_EXPERIMENT` 状态。

## 07｜Prototype治理

P84–P87 白虎实验禁止作为 Scene Model 的身份或资产来源。

未来 Prototype 至少需要两个正式身份来源的 Scene Model 对照案例，用于验证同一合同能够表达不同 Mansion Seed、Four Symbol Field 与 LifeArchetype Force，而不是验证一只手工白虎。

在获得独立授权前，禁止：

- 安装 `three` 或 `@react-three/fiber`；
- 新增 WebGL / Canvas Renderer；
- 创建 Scene Model Service / Resolver；
- 生成星兽资产、坐标、粒子或 Shader；
- 接入 Launch、Gravity、Dynamics、Crystal UI、Storage 或正式 Runtime。

## 08｜P94结论与下一阶段

P94 只完成：

```text
Identity
↓
Manifestation Grammar Reference
↓
Renderer-neutral Scene Model Contract
```

尚未完成：

- Scene Model Projection；
- Scene Model Adapter；
- Backend Selection Activation；
- WebGL Prototype Authorization；
- Renderer Implementation。

P94 完成后才能进入：

`Explicit WebGL Prototype Authorization Review`

该评审仍需独立确认 Prototype 范围、两个对照身份、Canvas / Static fallback、性能目标与停止条件，不能因 P94 合同存在而自动授权施工。
