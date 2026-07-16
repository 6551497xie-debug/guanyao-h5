# GUANYAO Isolated WebGL Renderer Prototype Authorization Protocol V1.0

协议编号：`RC-ISOLATED-WEBGL-RENDERER-PROTOTYPE-AUTHORIZATION-P98`

阶段：`GUANYAO Visual Technical Validation Phase`

授权结论：`AUTHORIZED_FOR_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE`

执行状态：`AUTHORIZED_NOT_IMPLEMENTED / AUTHORIZED_NOT_ACTIVATED`

治理等级：`EXPERIMENT ONLY / NO PRODUCTION / NO UI / NO FORMAL USER`

## 00｜授权目标

P98 接受总控的显式决定，授权第一个真正的 Renderer 技术实验，用来回答唯一问题：

> P97 PersonalStarBeastRenderPlan 是否能够被技术转换为具有生命显化感的视觉体验？

P98 只授予范围受限的实验资格。本刀不安装 Three.js，不编写 Renderer，不创建 WebGL Scene，不修改 Canvas，不接 UI、Production、Runtime、Storage 或正式用户。

授权不等于实现，授权不等于激活，实验不等于产品能力。

## 01｜授权前置链

```text
P0 Product Engineering Constitution
+
P1 Life System Constitution
+
P92 Visual Manifestation Grammar
↓
P94 PersonalStarBeastSceneModel
↓
P96 Two Formal Identity Fixtures
↓
P97 PersonalStarBeastRenderPlan
↓
P98 Explicit Isolated WebGL Prototype Authorization
```

P95 的结论为：

- `RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION`；
- `NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION`。

P96 已提供两个正式身份来源案例；P97 已证明同一 Grammar 与同一 Adapter 可以生成两份不同、身份盲的 RenderPlan。P98 的用户指令构成 `TOTAL_CONTROL_EXPLICIT_DECISION`，因此授权前置条件已满足。

## 02｜授权对象

授权对象固定为：

`FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE`

允许的唯一输入：

`PERSONAL_STAR_BEAST_RENDER_PLAN_ONLY`

Renderer 实验禁止读取：

- PersonalStarBeastIdentity；
- Mansion Result；
- Four Symbol Result；
- MotherCode；
- LifeArchetypeProfile；
- 出生日期与地点；
- 用户资料；
- Scene Model Adapter Result 中的来源对象。

未来实验只能接收 P97 的 `plan`，不能接收完整 Adapter Result。

## 03｜实验范围

固定：

`ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY`

分类：

`EXPERIMENT`

允许未来独立施工验证：

1. RenderPlan 表达通道能否转化为空间、光、场与运动；
2. Case A / Case B 是否在同一 Renderer 中形成可感知差异；
3. 差异是否来自 RenderPlan，而非 Renderer 内部身份分支；
4. 是否产生“星辰秩序正在成为生命”的体验；
5. WebGL 不可用时是否能安全降级而不改变生命语义。

禁止扩大为完整 Genesis、Gravity、Choice、Crystal 或长期成长体验。

## 04｜Backend候选

P98 依据 P95 评审，把第一实验的 Backend 候选冻结为：

`THREE_JS_WEBGL2`

原因：当前验证目标是生命显化，不是自建图形引擎。Three.js 能以较低工程成本提供 Scene Graph、Buffer Geometry、Points、资源生命周期与 Context 恢复基础。

本字段只是授权候选，不代表本刀已经：

- 安装 `three`；
- 激活 WebGL；
- 创建 Renderer；
- 选择最终 Production Backend。

原生 WebGL2、Canvas 或 Static 仍可作为后续对照与 fallback，不因此获得正式接入许可。

## 05｜两份RenderPlan要求

P98 授权必须同时绑定两份不同的 P97 RenderPlan 引用。

两份计划必须：

- 均由 `personal_star_beast_scene_model_adapter` 产生；
- `identityBlind: true`；
- `rendererNeutral: true`；
- `noIdentityCalculation: true`；
- `noDrawCommands: true`；
- `noRendererInvocation: true`；
- 具有不同的不透明计划指纹。

只有一份计划、两份相同计划或来自错误 Adapter 的计划都不得授权。

## 06｜身份与生命规则隔离

Renderer 实验只能解释“如何表现”，不能解释“它是谁”。

禁止：

```text
Renderer
↓
读取星宿 / 四象 / 母码
↓
自行决定视觉身份
```

必须：

```text
Formal Identity
↓
Manifestation Grammar
↓
Scene Model
↓
RenderPlan
↓
Isolated Renderer Experiment
```

任何 animal switch、白虎分支、四象模型选择或 MotherCode 视觉分支都视为越权。

## 07｜实现状态冻结

P98 完成后状态固定为：

- `implementationStatus: AUTHORIZED_NOT_IMPLEMENTED`；
- `backendActivationStatus: AUTHORIZED_NOT_ACTIVATED`；
- `productionStatus: FORBIDDEN`；
- `uiIntegrationStatus: FORBIDDEN`；
- `formalUserStatus: FORBIDDEN`；
- `runtimeIntegrationStatus: FORBIDDEN`；
- `storageIntegrationStatus: FORBIDDEN`。

这意味着下一刀可以设计或实现隔离 Renderer Slice，但不能在 P98 本刀内提前施工。

## 08｜Fallback强制要求

授权记录固定 `fallbackRequired: true`。

未来实验必须保留：

- Canvas 2D Semantic Fallback；
- Static Accessible Fallback；
- WebGL Context Lost 的失败态；
- reduced motion 的安全表达；
- 不因降级重新计算或改变生命身份。

Fallback 可以减少粒子、后期、分辨率和动态，不能改变 RenderPlan 的语义顺序。

## 09｜明确禁止

P98 本刀禁止：

- `npm install three`；
- 新增 Renderer / WebGL Scene / Shader；
- 修改 P40 Renderer Contract；
- 修改 P97 RenderPlan；
- 修改 Engine；
- 修改 Canvas、StarbeastLab、Genesis Preview；
- 新增产品 UI 或正式路由；
- 接 Launch、Gravity、Dynamics、Crystal、Archive；
- 读取正式用户数据；
- 写入 Storage。

## 10｜P98结论

正式授权：

`AUTHORIZED_FOR_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE`

授权目的仅为：

`RENDER_PLAN_TO_LIFE_MANIFESTATION_EXPERIENCE`

下一阶段可以进入：

`RC-ISOLATED-WEBGL-RENDERER-PROTOTYPE-SLICE-P99`

P99 必须继续保持隔离，优先建立 Renderer Contract、资源生命周期和可验证的双 RenderPlan 技术切片；不得直接接 Production、UI 或正式用户。
