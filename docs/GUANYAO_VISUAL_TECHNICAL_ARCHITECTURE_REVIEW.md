# GUANYAO Visual Technical Architecture Review V1.0

协议编号：`RC-GUANYAO-VISUAL-TECHNICAL-ARCHITECTURE-REVIEW-P93`

阶段：`GUANYAO Visual Architecture Stabilization`

状态：`ARCHITECTURE REVIEW ONLY / NO RENDERER AUTHORIZATION`

## 00｜评审地位

本评审服从：

- P0 `GUANYAO Product & Engineering Constitution V1.0`；
- P1 `GUANYAO Life System Constitution V1.0`；
- P92 `GUANYAO Visual Manifestation Grammar V1.0`。

本评审只判断现有工程边界能否承接 Personal Star Beast 的正式视觉显化，并提出未来技术候选。它不是 Backend Selection，不是 Prototype Authorization，不是 Renderer Implementation，也不授权依赖安装、Canvas 修改、WebGL 执行、UI 接入或 Runtime 接入。

评审最高原则保持：

> 技术只实现显化语法。技术不能补造生命身份。

## 01｜施工五问结论

### 1. 修改属于哪一层？

属于 `VISUAL` 层内部的技术架构评审，不改变 WORLDVIEW、LIFE SYSTEM、ENGINE 或 EXPERIENCE。

### 2. 输入来源是什么？

唯一正式身份输入来自：

```text
PersonalStarBeastIdentityReference
← Mansion Seed
← Four Symbol Field
← LifeArchetype Force
```

未来视觉还可以接收显式 Journey / Crystal 表达引用，但这些引用不能反向改变初始身份。

### 3. 输出结果是什么？

输出是：

- 现有视觉与 Renderer 合同的可复用判断；
- 缺失合同的边界说明；
- WebGL、Canvas 与 React 的候选职责；
- 未来 Prototype 进入条件。

不输出 Renderer、Scene、Shader、资产或像素。

### 4. 是否改变已有生命规则？

否。P89/P90 身份来源、P92 显化语法、P39 Visual State、P40 Renderer Contract 与 P73–P76 Backend Governance 均保持不变。

### 5. 是否需要重新架构评审？

正式 Backend Activation、Renderer Implementation、Production 接入或对 P39/P40 类型作破坏性修改时，必须重新评审。建立隔离、Renderer-neutral 的 Scene Model Contract 可以作为下一刀候选，但仍不等于 Renderer 授权。

## 02｜现有工程审查

### P90：Personal Manifestation Readiness

P90 只输出：

`READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN`

它证明正式身份来源完整，可以进入显化设计；它明确保持：

- `noManifestationDesign: true`；
- `noVisualParameterGeneration: true`；
- `noAssetCreation: true`；
- `noRendererInvocation: true`。

因此 P90 READY 不能直接交给 Canvas 或 WebGL。

### P39：StarBeastVisualState

P39 已正确建立 Life State 到 Visual State 的单向映射，并保持：

- Visual State 不是生命事实；
- 不修改 Life State；
- 不生成 Memory / Growth；
- 不执行 Renderer。

该边界可以保留。当前不足是：P39 主要表达 Journey、能量、光、星纹与 Crystal Presence，尚未承载 P92 的 Mansion Seed、Four Symbol Field、Life Force 三源显化投影。

### P40：Renderer Contract / RenderPlan

P40 已正确保持：

- `rendererNeutral: true`；
- `semanticChannelsOnly: true`；
- `noPixelOutput: true`；
- `noDrawCommands: true`；
- `noAssetGeneration: true`。

该合同应继续作为正式 Renderer 的上游边界，不应为了 WebGL 重写。未来只允许通过独立适配扩展其可消费的 Personal Star Beast Scene Model，不允许 Renderer 读取上游 Engine。

### P73–P76：Backend Governance

P73–P76 没有选择 Canvas、WebGL、Three.js 或其他具体技术：

- P73 只允许进入显式候选选择；
- P74 只保存主体决定与不透明候选引用；
- P75 只选择 Candidate opaque reference；
- P76 只消费选择结果，并继续 deferred。

因此 P93 的技术建议不能冒充已经完成的 Backend Selection，也不能解除既有冻结。

### P84–P87：Four Symbol Visual Experiment

P84–P87 继续保持 `FOUR_SYMBOL_VISUAL_EXPERIMENT`。现有 Canvas 代码验证了四象形态、生命原力、意识与 Stellar Flesh 的局部表达能力，但没有通过 `PERSONAL_STAR_BEAST_SOURCE_VALIDATION`。

它们不得成为未来 Scene Model 的身份来源，不得直接迁移为 Production Asset。

## 03｜缺失边界判断

当前正式缺口不是 Renderer，而是：

`Personal Star Beast Renderer-neutral Scene Model Contract`

它未来应负责：

```text
PersonalStarBeastIdentityReference
↓
P92 Manifestation Grammar Projection
↓
Personal Star Beast Scene Model
↓
Visual State / RenderPlan Adapter
↓
Future Renderer Backend
```

Scene Model 属于 Visual State 的中立场景表达，不是新的生命层，不增加生命来源，不计算星宿、四象或 MotherCode。

其最小职责应包含引用级语义：

- Mansion Seed Structure Reference；
- Four Symbol Spatial Field Reference；
- Life Force Modulation Reference；
- Optional Crystal Imprint Reference；
- Manifestation Stage Reference；
- Quality Profile Reference。

禁止在 Scene Model Contract 中写入：

- Canvas Path2D 坐标；
- Three.js Object3D、Geometry 或 Material；
- WebGL Shader、Uniform 或 Texture；
- UI 文案；
- 设备检测结果；
- Engine 计算函数；
- 白虎、青龙、朱雀、玄武的独立动物模型选择。

## 04｜推荐技术架构候选

推荐的未来候选拓扑：

```text
Formal Life Identity References
↓
P92 Manifestation Grammar Projection
↓
Renderer-neutral Scene Model
↓
Visual State / RenderPlan
↓
Backend Adapter
├─ WebGL2 / Three.js Candidate
├─ Canvas 2D Fallback Candidate
└─ Static Accessible Fallback Candidate
```

React Experience Shell 与 Renderer 并列协作：

```text
React Experience Shell
├─ 显化阶段编排
├─ DOM 文案与控制
├─ 无障碍与 reduced motion
└─ 向 Renderer 发送显式阶段命令

Renderer Backend
├─ 消费 Scene Model / RenderPlan
├─ 内部帧循环
├─ 粒子、光场、材质与镜头
└─ 不读取 Engine / Storage / User Profile
```

React 不应逐帧驱动粒子或 Shader 参数；Renderer 不应决定体验阶段或身份。两者只通过稳定命令和引用交接。

## 05｜技术候选结论

### WebGL2 / Three.js

评审状态：`RECOMMENDED_FOR_ISOLATED_PROTOTYPE_CANDIDATE`

适合承担：

- 宇宙空间层次；
- 二十八宿节点批处理；
- 本命星宿点亮；
- 四象空间场；
- 母码原力的流向与节奏；
- Personal Star Beast 的粒子、边界光与半透明生命场；
- 镜头、后期与设备分级。

该结论不是 Backend Selection，不授权安装 `three`，不授权 WebGL Renderer 施工。

### Canvas 2D

评审状态：`RETAIN_AS_FALLBACK_AND_EXPERIMENT`

适合承担：

- 低性能设备回退；
- 静态分享图；
- reduced motion 表达；
- 快速视觉实验；
- WebGL 不可用时的最低可理解体验。

Canvas 2D 不建议继续作为 B 级正式生命显化主后端，也不应与 WebGL 同时维护两套完整身份逻辑。

### Static Accessible Fallback

评审状态：`REQUIRED_FOR_PRODUCTION_CANDIDATE`

正式体验必须保留无需持续 GPU 动画即可理解的结果：静态 Personal Star Beast 表达、正式身份文本与显化来源说明。它不是低质量版本，而是无障碍、故障恢复与分享输出的正式边界。

### WebGPU、Unity WebGL、Unreal Pixel Streaming

当前不进入 Genesis 1.0 候选：

- WebGPU 可以保留未来研究，不作为 V1 基线；
- Unity WebGL 与现有 React 工程和中立合同不匹配；
- Unreal Pixel Streaming 引入云端 GPU、视频流与并发运营体系，不适合当前 H5 首次体验。

## 06｜能力与性能分级候选

未来 Renderer 必须先有独立能力策略，再进入 Production：

### HIGH

- WebGL2；
- 高质量粒子与生命场；
- 受控后期；
- 目标 50–60fps。

### BALANCED

- WebGL2；
- 降低 DPR、粒子量与后期 Pass；
- 目标稳定 30fps。

### FALLBACK

- Canvas 2D 或 Static；
- 无持续高负载粒子；
- 保留完整生命来源与显化认知。

性能等级只能改变表达质量，不能改变身份、星宿、四象、LifeArchetype 或 Crystal 事实。

任何设备探测、GPU Probe、动态分辨率、Context Loss 恢复或资源预算属于未来 Renderer Implementation Review，不在 P93 执行。

## 07｜AI 与人工职责

### Claude / 视觉模型

允许作为 `EXPERIMENT EVIDENCE`：

- Art Direction Brief；
- Moodboard 与概念帧；
- 分镜、光影、材质与节奏探索；
- 对“宠物感、游戏怪物感、星座线稿感”的视觉批评。

禁止成为：

- Identity Source；
- Scene Model 自动生成器；
- Production Asset 自动授权者；
- Engine 或 Renderer 决策者。

### Codex

在未来获得明确授权后，适合施工：

- Scene Model Contract；
- Adapter 与状态机；
- 隔离 WebGL Prototype；
- Shader / Particle 技术原型；
- 性能监控、降级与 Gate。

Codex 不替代最终 Art Direction 与人工视觉验收。

### 人工视觉判断

以下必须由人决定：

- 是否仍像四象动物或宠物；
- 是否真正体现个人星宿生命种子；
- 四象场与生命原力是否可感知且不越权；
- 显化节奏是否形成认领、连接与在场感；
- 概念是否可以从 EXPERIMENT 进入 CANDIDATE。

## 08｜进入 Prototype 前的固定条件

未来 WebGL Prototype 必须同时满足：

1. P90 正式来源为 READY；
2. P92 Manifestation Grammar 不被修改或绕过；
3. Renderer-neutral Scene Model Contract 独立成立；
4. 至少准备两个不同正式身份来源的对照案例；
5. WebGL Candidate 获得独立显式授权；
6. Canvas / Static fallback 边界明确；
7. Prototype 标记为 `EXPERIMENT / ISOLATED`；
8. 不接入 Launch、Gravity、Dynamics、Crystal UI、Storage 或正式用户流程。

两个对照案例用于验证同一语法能表达不同身份，禁止只验证一只手工指定的白虎。

## 09｜P93评审结论

正式结论：

- 保留 P39 Visual State 与 P40 Renderer-neutral Contract；
- 保留 P73–P76 Backend Governance，不视为具体技术已选定；
- 停止继续优化 P84–P87 白虎实验；
- 下一项工程候选是 Renderer-neutral Scene Model Contract；
- WebGL2 / Three.js 进入隔离 Prototype 推荐候选，但仍为 `NOT_AUTHORIZED`；
- Canvas 2D 保留为 fallback 与 experiment；
- Claude / 视觉模型允许提供 Art Direction Evidence，不拥有决定权。

本评审完成后暂停。下一刀只能在以下两项中选择其一：

1. `Personal Star Beast Scene Model Contract`；
2. `Explicit WebGL Prototype Authorization Review`。

顺序建议先建立 Scene Model Contract，再评审 WebGL Prototype 授权。
