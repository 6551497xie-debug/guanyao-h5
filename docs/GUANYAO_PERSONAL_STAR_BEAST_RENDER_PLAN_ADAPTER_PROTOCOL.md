# GUANYAO Personal Star Beast Render Plan Adapter Protocol V1.0

协议编号：`RC-PERSONAL-STAR-BEAST-RENDER-PLAN-ADAPTER-P97`

阶段：`GUANYAO Visual Technical Validation Phase`

状态：`SEMANTIC ADAPTER ONLY / RENDERER NOT AUTHORIZED / WEBGL NOT ACTIVATED`

## 00｜协议目标

P97 冻结：

```text
P89 / P90 PersonalStarBeastIdentityReference
↓
P92 Manifestation Grammar
↓
P94 PersonalStarBeastSceneModel
↓
P97 PersonalStarBeastRenderPlanAdapter
↓
P97 PersonalStarBeastRenderPlan
↓
Future Renderer Authorization Boundary
```

P97 只建立 Scene Model 到 RenderPlan 的视觉语义转换，不创建 Renderer，不产生视觉成品，不授权 WebGL。

RenderPlan 不是生命层，不是视觉资产，也不是 Renderer。它是生命语义到渲染表达之间的中间协议。

## 01｜与 P40 的边界校准

P40 已冻结通用 `StarBeastRenderPlan` 与既有 Renderer Contract。P97 不修改、不覆盖、不替换 P40。

`PersonalStarBeastRenderPlan` 是 P94 场景语义的专用计划层，用于验证个人星宿兽 Scene Model 能否在身份隔离后形成稳定表达通道。后续是否与 P40 合流、由哪一种 Backend 消费，必须经过独立授权评审。

固定：

```text
P94 Scene Model
↓
P97 Personal RenderPlan
↓
Explicit Renderer / WebGL Authorization Review
```

禁止把 P97 视为 P40 Contract 变更或 WebGL 执行许可。

## 02｜身份隔离

`PersonalStarBeastRenderPlan` 只表达“如何表现”，不表达“它是谁”。

计划本体禁止包含：

- `mansionName`；
- `fourSymbolName`；
- `motherCodeId`；
- `lifeArchetypeId`；
- `animalIdentity`；
- `birthData`；
- `userIdentity`。

计划本体也不嵌入 `PersonalStarBeastSceneModel`。Adapter Result 可以保留原 Scene Model 引用用于审计，但 Future Renderer 只能接收 `plan`，不得接收 Adapter Result。

P97 将 Scene Model 的表达引用转换为不可逆的 Renderer-neutral 表达令牌。令牌不携带星宿名、四象名、母码、出生数据或用户身份。

## 03｜Manifestation Stage

`manifestationStage` 只把 P94 显式阶段引用转换为 `DECLARED_STAGE_REFERENCE`。

Adapter 不推进阶段，不重排 Genesis，不根据时间或 Renderer 状态自动宣布阶段。

## 04｜Mansion Seed → Spatial Expression

输入语义：生命骨架引用。

输出：

- `structureDensity`；
- `anchorBehavior`；
- `formationPattern`。

三个字段只保存来自 Mansion Seed Structure 的不透明表达令牌。禁止转换成具体动物轮廓，也禁止将星宿名称带入 RenderPlan。

## 05｜Four Symbol Field → Field Behavior

输入语义：四象形态场引用。

输出：

- `spatialBias`；
- `boundaryBehavior`；
- `flowDirection`。

固定 `noAnimalSilhouetteInstruction: true`。四象只影响空间、边界与流向表达，不产生 `whiteTiger=true` 或任何四象动物模型指令。

## 06｜Life Force → Light / Motion Expression

输入语义：MotherCode → LifeArchetype 生命原力表达引用。

输出：

- `coreLight`；
- `energyRhythm`；
- `coreBehavior`；
- `aggregationMode`。

Life Force 不生成兽形、不创建模型、不改变 Mansion Seed 或 Four Symbol Field。`boundaryLight` 继续来自形态场引用，避免原力反向决定外形。

## 07｜Crystal Trace

Crystal 引用为 `null` 时，`crystalExpression` 必须为 `null`。

Crystal 存在时只产生可选 `imprintLayer`，并固定 `baseStructureInvariant: true`。Crystal 只能添加经历印记，不得修改基础生命身份或初始结构。

## 08｜Quality 与 Fallback

Quality 只形成表达质量引用，不执行设备检测，不选择 Backend。

Fallback 固定声明：

- `SEMANTIC_2D_FALLBACK`；
- `SEMANTIC_STATIC_FALLBACK`；
- 保留显化顺序；
- 保留语义表达；
- 不以降级为理由重新计算生命规则。

## 09｜P96 双案例验证

P97 继续消费 P96 的 Case A 与 Case B，但只在 gate 内消费，不让 Fixture 进入 Production。

验证规则：

1. 两个案例经过同一个 `adaptPersonalStarBeastSceneModelToRenderPlan`；
2. 两者继续使用同一 P92 Grammar referenceId 与 protocolVersion；
3. 不同 Scene Model 表达引用生成不同 RenderPlan 表达令牌；
4. Adapter 中不存在星宿、四象、母码或动物硬编码分支；
5. 差异来自 P94 语义引用，不来自 Fixture ID、出生数据或用户标签的直接读取。

P97 不宣称视觉差异已经通过 Renderer 验收，只证明转换协议能够保持“同一语法、不同生命”的表达分叉。

## 10｜Adapter 边界

Adapter 只允许：

```text
PersonalStarBeastSceneModel
↓
PersonalStarBeastRenderPlan
```

禁止：

- 修改 Scene Model；
- 读取或重新计算生命身份；
- 调用 Star Beast、MotherCode、LifeArchetype 或其他 Engine；
- 调用 P40 Adapter、Renderer、Canvas、WebGL 或 Three.js；
- 生成坐标、像素、Draw Command、Shader、模型或视觉资产；
- 接入 Runtime、UI、Storage、Launch、Gravity、Dynamics 或 Crystal UI。

## 11｜当前状态

- Renderer：`NOT_AUTHORIZED`；
- WebGL：`NOT_ACTIVATED`；
- Three.js：未安装；
- Canvas：未修改；
- P40 Renderer Contract：未修改；
- Production：未接入。

P97 完成后，下一阶段只允许进入：

`RenderPlan → WebGL Prototype Authorization Review`

仍不得直接生产 Renderer。
