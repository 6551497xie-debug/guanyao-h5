# GUANYAO WebGL Prototype Authorization Review V1.0

协议编号：`RC-EXPLICIT-WEBGL-PROTOTYPE-AUTHORIZATION-REVIEW-P95`

阶段：`GUANYAO Visual Technical Validation Phase`

评审结论：`RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION`

执行状态：`NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION`

Backend 状态：`CANDIDATE_ONLY / NOT_ACTIVATED`

## 00｜评审地位

P95 服从并引用：

- P0 `GUANYAO Product & Engineering Constitution V1.0`；
- P1 `GUANYAO Life System Constitution V1.0`；
- P92 `GUANYAO Visual Manifestation Grammar V1.0`；
- P93 `GUANYAO Visual Technical Architecture Review V1.0`；
- P94 `GUANYAO Personal Star Beast Scene Model Contract V1.0`。

本评审回答“是否建议总控显式授权进入隔离 WebGL Prototype”，不生成授权命令，不激活 Backend，不安装依赖，不创建 Renderer，也不把 EXPERIMENT 升级为 CANDIDATE 或 PRODUCTION。

评审结论与执行权必须分离：

```text
P95 Review Recommendation
↓
Total Control Explicit Decision
↓
Future Isolated Prototype Authorization
```

在总控作出新的显式决定前，WebGL Prototype 继续保持 `NOT_AUTHORIZED`。

## 01｜施工五问

### 1. 修改属于哪一层？

属于 `VISUAL` 层内部的技术授权评审，不进入 Renderer、UI 或 Implementation。

### 2. 输入来源是什么？

唯一正式输入链为：

```text
PersonalStarBeastIdentityReference
↓
P92 Manifestation Grammar
↓
PersonalStarBeastSceneModel
↓
Future P40 Scene Model Adapter
↓
StarBeastRenderPlan
```

### 3. 输出结果是什么？

输出评审结论、Prototype 范围、对照案例条件、性能预算、fallback 义务、技术建议和停止条件。没有视觉输出。

### 4. 是否改变已有生命规则？

否。本命星宿、四象、MotherCode、LifeArchetype、PersonalStarBeastIdentity、Gravity、Choice 与 Crystal 均保持不变。

### 5. 是否需要重新架构评审？

若未来施工需要修改 P0、P1、P92、P94，或让 Renderer 读取正式 Engine，必须停止 Prototype 并重新评审。

## 02｜授权前置条件审查

### Scene Model 完整性

P94 已冻结 Renderer-neutral 的 `PersonalStarBeastSceneModel`，并明确：

- 来自正式 `PersonalStarBeastIdentityReference`；
- 四象是 Spatial Field，不是动物资产；
- Life Force 不生成兽形；
- 不包含坐标、粒子、动画、Shader、材质或 Draw Command；
- 不允许 Renderer 直接消费。

结论：合同前置已经成立。

### Renderer 边界

正式边界冻结为：

```text
PersonalStarBeastSceneModel
↓
Future P40 Scene Model Adapter
↓
StarBeastRenderPlan
↓
Renderer
```

Renderer 只能消费 `StarBeastRenderPlan`。Renderer 禁止读取：

- Mansion Result；
- Four Symbol Result；
- MotherCode / MotherCodeProfile；
- LifeArchetypeProfile；
- PersonalStarBeastIdentityReference；
- Engine、Storage 或 User Profile。

Renderer 不计算身份、不选择四象动物、不推进生命阶段。

结论：边界已经明确；但 Future P40 Scene Model Adapter 尚未施工，必须作为获得授权后的第一个隔离里程碑，而不是让 Renderer 绕过它。

### 两个正式身份案例

单一白虎 Demo 不能证明显化架构成立。正式 Prototype 验收必须同时包含两个由同一正式引擎链产生的案例。

#### Case A｜现有正式来源基线

- 使用当前 P90 gate 已验证的正式出生输入引用作为基线；
- 经正式星宿结果、四象结果、MotherCodeProfile 与 LifeArchetypeProfile 汇合；
- 生成独立 `PersonalStarBeastIdentityReference` 和 Scene Model；
- 禁止把案例命名、硬编码或分支为“白虎 Demo”。

#### Case B｜独立正式来源对照

- 使用另一组正式输入，经完全相同的 Engine、Grammar、Scene Model Adapter 与 Renderer；
- 必须得到不同的 `PersonalStarBeastIdentityReference`；
- Mansion Seed 必须不同；Four Symbol Field 或 LifeArchetype Force 至少一项不同，优先两项均不同；
- 禁止人工指定星宿、四象、母码或动物形态。

统一验收：同一 Manifestation Grammar 与同一 Renderer 在不读取身份标签的情况下，因两个不同 Scene Model / RenderPlan 而产生可感知但同属一个视觉宇宙的生命表达差异。

当前工程只有 Case A 的正式来源基线证据，尚未建立 Case A / Case B 两份 Scene Model 对照夹具。因此两案例条件是进入 Renderer 实现前的硬门槛，P95 不伪造第二案例。

### Fallback

WebGL 不可用、Context Lost、GPU 预算不足或用户启用 reduced motion 时，必须切换至：

```text
Canvas 2D Semantic Fallback
或
Static Accessible Fallback
```

Fallback 继续消费同一 `StarBeastRenderPlan` 或其降级投影，不允许复制、重算或改变生命身份。降级只能减少粒子、后期、分辨率和动态，不得跳过生命认领流程。

结论：策略已冻结；实际 fallback 与恢复演练需在 Prototype 阶段提供证据。

## 03｜Prototype 范围冻结

允许验证五层：

1. `COSMIC_LAYER`：星空、星尘、空间感；
2. `MANSION_LAYER`：星宿节点、星辰结构、显影关系；
3. `FIELD_LAYER`：四象形态场与空间变化，不是四象动物；
4. `FORCE_LAYER`：Life Force 的方向、节奏、聚合和稳定性；
5. `REVEAL_LAYER`：Personal Star Beast 的初步生命显化。

本 Prototype 的唯一验证命题是：

```text
Identity
↓
Scene Model
↓
RenderPlan
↓
Renderer
```

是否能够保持来源正确、表达有差异、Renderer 无身份知识。

禁止进入：

- 完整 3D 动物模型；
- 毛发系统；
- 战斗动作；
- 游戏化角色；
- 长期成长系统；
- Memory；
- Archive；
- Gravity 视觉接入；
- Launch、Dynamics、Crystal UI、Storage 或正式用户流程。

## 04｜性能与恢复目标

### Desktop

- 参考桌面设备目标：稳定 `60fps`；
- 以 `16.7ms` 帧预算作为优化基线；
- 不允许为维持特效而改变身份表达。

### Mobile

- 参考移动设备最低：稳定 `30fps`；
- 以 `33.3ms` 帧预算作为最低基线；
- 必须限制 DPR、粒子量、透明叠加与后期 Pass，并允许动态质量下降。

### 加载、GPU 与内存

- React Shell 与 Static Fallback 应先可见，WebGL 资源延迟加载；
- Prototype 必须记录首个可理解画面、首个可交互场景和资源体积，不以空白屏等待场景；
- 必须记录 GPU 帧时、JS 主线程、纹理/几何数量与峰值内存；
- 资源生命周期必须随路由卸载，禁止遗留 RAF、事件监听、纹理或 Render Target。

### Context Lost

- 必须监听 `webglcontextlost` / `webglcontextrestored`；
- Context Lost 时立即展示 Canvas / Static fallback；
- 恢复后从 Scene Model / RenderPlan 重建视觉，不从 Renderer 内部状态重建身份；
- 恢复失败不得阻断生命流程。

## 05｜技术选型建议

### Three.js + WebGL2

结论：`RECOMMENDED_FOR_ISOLATED_PROTOTYPE`。

理由：

- 足以验证粒子、空间场、透明生命场、镜头和分层合成；
- 比原生 WebGL2 更快建立资源生命周期、场景层级和降级策略；
- 能放在 P40 Adapter 与 RenderPlan 下游，不必污染 Identity 或 Scene Model；
- 现阶段可避免 Unity / Unreal 带来的独立运行时和 H5 集成成本。

该建议不等于本刀允许 `npm install three`。

### 原生 WebGL2

结论：`NOT_RECOMMENDED_FOR_FIRST_PROTOTYPE`。

原生 WebGL2 可控性高，但需要自行承担 Shader 编译、Buffer、资源回收、场景组织、拾取、Context 恢复和调试基础设施。当前验证目标是生命显化链，不是底层图形引擎能力，额外成本不形成产品优势。

### 其他方案

- Canvas 2D：保留为语义 fallback 和低动态体验，不作为正式生命显化主后端；
- Static：生产候选必须具备的无障碍与故障边界；
- WebGPU：保留未来研究，不作为 V1 基线；
- Unity WebGL / Unreal Pixel Streaming：不符合当前 React H5、加载与运维边界；
- 预渲染视频 / AI 视频：可做 Art Direction Evidence，不能表达正式、确定性的个人身份，也不能成为 Renderer。

## 06｜停止条件

出现任一情况，Prototype 必须停止，不得升级 CANDIDATE：

1. 只有一个手工白虎案例；
2. 任一案例手工指定星宿、四象、母码或动物身份；
3. Renderer 导入或调用 Mansion、Four Symbol、MotherCode、LifeArchetype、Identity 或 Engine；
4. Renderer 绕过 RenderPlan 直接消费 Scene Model；
5. 两案例需要两套身份逻辑或两套 Renderer 分支；
6. 无 Canvas / Static fallback 或 Context Lost 阻断流程；
7. 参考移动设备无法稳定达到最低 30fps；
8. 为获得效果需要修改 P0、P1、P92 或 P94；
9. 视觉结果仍是四象动物、游戏角色或星座线稿，而非个人星宿兽；
10. Prototype 接入 Production、Launch、Gravity、Storage 或正式用户数据。

## 07｜P95授权结论

评审给出：

`RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION`

理由：P0/P1/P92/P93/P94 已经把生命来源、显化语法、Scene Model 和 Renderer 边界冻结，Three.js + WebGL2 适合验证五层显化，继续扩展 Canvas 白虎实验已经不能回答 Personal Star Beast 问题。

但以下条件尚未形成工程证据：

1. Case A / Case B 两份正式 Scene Model 对照夹具；
2. Scene Model 到 P40 RenderPlan 的隔离 Adapter；
3. Canvas / Static fallback 与 Context Lost 演练；
4. 性能基线记录；
5. 总控的独立显式授权决定。

因此当前执行状态保持：

`NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION`

若总控同意进入，下一刀必须先建立范围受限的显式授权与两案例 / Adapter 前置施工边界；不得直接安装 Three.js 后写最终 Renderer。
