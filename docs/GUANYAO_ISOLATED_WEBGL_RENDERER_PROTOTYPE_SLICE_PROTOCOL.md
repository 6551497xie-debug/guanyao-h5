# GUANYAO Isolated WebGL Renderer Prototype Slice Protocol V1.0

协议编号：`RC-ISOLATED-WEBGL-RENDERER-PROTOTYPE-SLICE-P99`

阶段：`GUANYAO Visual Technical Validation Phase`

状态：`IMPLEMENTED_FOR_ISOLATED_TECHNICAL_VALIDATION / NOT ACTIVATED IN PRODUCT`

治理等级：`EXPERIMENT ONLY / NO PRODUCTION / NO UI / NO FORMAL USER`

## 00｜目标

P99 在 P98 显式授权范围内建立第一个真正的 WebGL Renderer 技术切片，验证：

```text
P97 PersonalStarBeastRenderPlan
↓
Renderer-neutral Scene Projection
↓
Three.js / WebGL2 Renderer
↓
Life Manifestation Technical Frame
```

本刀回答“RenderPlan 能否进入真实图形技术链”，不回答最终视觉是否已经达到产品验收标准。

## 01｜授权边界

Renderer 创建必须同时满足：

- P98 `GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_V1`；
- `classification: EXPERIMENT`；
- `prototypeScope: ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY`；
- Production、UI、正式用户继续为 `FORBIDDEN`；
- RenderPlan 指纹存在于 P98 授权的双计划引用中。

缺少授权、计划不在授权集合、范围漂移或 viewport 无效时，禁止创建 Renderer。

## 02｜唯一输入

P99 只消费：

`PersonalStarBeastRenderPlan`

禁止消费：

- Identity；
- Scene Model；
- Mansion Result；
- Four Symbol Result；
- MotherCode；
- LifeArchetypeProfile；
- 出生数据；
- 用户资料。

P99 不包含星宿、四象或动物分支。Case A / Case B 的技术差异只能来自 RenderPlan 表达令牌。

## 03｜Scene Projection

`projectPersonalStarBeastRenderPlanToWebGLScene` 将 P97 表达通道转换为隔离 Renderer 参数：

- `cosmicField`：星尘数量、空间范围与透明度；
- `mansionStructure`：锚点数量、结构半径与连线存在感；
- `formField`：色相、边界尺度与流速；
- `lifeCore`：星核色相、强度与呼吸幅度；
- `motion`：旋转速度与漂移幅度；
- `crystal`：可选生命印记节点。

Projection 是 Renderer 参数，不是生命事实。所有数值由不透明表达引用确定，不读取身份标签。

## 04｜真实Renderer切片

P99 唯一允许的 Three.js 入口：

`src/prototypes/isolatedWebGLRendererPrototype.ts`

该模块真实建立：

- `WebGLRenderer`；
- `Scene`；
- `PerspectiveCamera`；
- `BufferGeometry`；
- `Points` 星尘场；
- `LineLoop` 生命结构；
- `Mesh` 星核；
- `PointLight` 内部光源；
- `renderer.render(scene, camera)` 帧输出。

禁止其他 Engine、页面、Runtime 或组件导入 Three.js。

## 05｜不拥有动画循环

P99 不调用 `requestAnimationFrame`，也不使用 `setAnimationLoop`。

Controller 只暴露：

- `renderFrame(elapsedMilliseconds)`；
- `resize(width, height, pixelRatio)`；
- `getSnapshot()`；
- `dispose()`。

帧驱动权留给未来独立 Prototype Harness。这样 Renderer 不会因被导入就启动，不会进入正式页面生命周期。

## 06｜资源生命周期

`dispose()` 必须：

- 移除 `webglcontextlost` / `webglcontextrestored` 监听；
- dispose Geometry；
- dispose Material；
- dispose WebGLRenderer；
- 清理 Scene；
- 把 Context State 冻结为 `DISPOSED`。

Context Lost 时停止渲染；Context Restored 后允许由外部 Harness 重新驱动帧。

## 07｜Fallback

下列情况不得强行创建 Renderer：

- Canvas 缺失；
- WebGL2 不可用；
- reduced motion 已请求；
- Renderer 初始化失败。

返回：

`SEMANTIC_STATIC_FALLBACK`

Fallback 保留同一 Scene Projection 与 RenderPlan 语义，不重新计算身份。

## 08｜依赖治理

P99 激活最小依赖：

- `three`；
- `@types/three`。

不安装：

- `@react-three/fiber`；
- Unity / Unreal Runtime；
- 其他 Renderer 框架。

此前 P93–P98 的“依赖未安装”是各刀历史状态。P99 将 gate 校准为：Three.js 只能由 P98 授权后的唯一隔离模块使用，不能扩散至 P40、P94、P96、P97、页面或 Production。

## 09｜严格隔离

P99 禁止：

- 修改 P40 Renderer Contract；
- 修改 P97 RenderPlan；
- 修改 Engine；
- 修改 StarbeastLab 或 Genesis Preview；
- 新增路由、页面或产品 UI；
- 接 Launch、Gravity、Dynamics、Crystal、Archive；
- 读取正式用户；
- 写入 Storage；
- 把 EXPERIMENT 升级为 CANDIDATE 或 PRODUCTION。

## 10｜验收边界

自动 gate 可以验证：

- P96 双案例产生不同 Scene Projection；
- P98 授权与 RenderPlan 指纹匹配；
- 未授权输入被阻断；
- Fallback 状态正确；
- Three.js 只被唯一隔离模块导入；
- TypeScript / Production Build 通过；
- 正式页面没有消费。

由于 P99 不接 UI，自动 gate 不执行真实 GPU 截图验收。视觉体感验收必须通过后续独立 Prototype Harness，且该 Harness 仍不得进入产品路由。

## 11｜结论

P99 完成后，技术状态为：

- Renderer Implementation：`ISOLATED_EXPERIMENT_IMPLEMENTED`；
- Backend：`THREE_JS_WEBGL2_AVAILABLE_IN_ISOLATED_MODULE`；
- Product Activation：`NOT_ACTIVATED`；
- Visual Acceptance：`PENDING_ISOLATED_HARNESS`；
- Production：`FORBIDDEN`。

下一阶段建议：

`RC-ISOLATED-WEBGL-RENDERER-HARNESS-P100`

只建立可人工验收的独立技术 Harness，不加入正式导航、产品 UI 或用户流程。
