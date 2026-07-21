# GUANYAO 1.0 World Model Alignment P0

文档编号：`GUANYAO-WORLD-MODEL-ALIGNMENT-P0`

状态：`ACTIVE ALIGNMENT BASELINE`

生效日期：`2026-07-21`

## 0. 文档地位

本文件是 GUANYAO 1.0 世界模型的跨层对齐基线，用于把既有世界观、生命系统、真实来源链和体验显化放在同一张边界图中。

本文件不创建新的生命规则，不覆盖以下上位冻结文件：

- [GUANYAO 世界观宪法 V2.0](./GUANYAO_WORLDVIEW_CONSTITUTION_V2.md)
- [GUANYAO Life System Constitution V1.0](./GUANYAO_LIFE_SYSTEM_CONSTITUTION.md)
- [Star Mansion Life Trajectory Source Freeze Protocol](./GUANYAO_STAR_MANSION_LIFE_TRAJECTORY_SOURCE_FREEZE_PROTOCOL.md)

发生冲突时，上位宪法与正式 Engine 结果优先。本文件只解释各层应如何连续消费，不授权修改 Engine、Runtime、Renderer、Visual Calibration、Route 或 UI。

## 1. 世界模型统一判断

GUANYAO 不是用视觉生成一个人的身份，也不是用系统替用户决定人生答案。

其稳定世界模型是：

```text
宇宙时间与生命降临坐标
↓
既有 Engine 确认生命来源
↓
Genesis 让既有生命来源被看见
↓
Reality 让用户观察正在经历的现实力量
↓
Gravity 让现实牵引穿过六个生命界面
↓
Choice 保留用户对方向的最终决定权
↓
Crystal 留下已发生变化的生命印记
```

系统负责提供镜面与连续性；用户保有认领、暂停、拒绝和选择的主体权。

## 2. 五层 Source of Truth

| 层 | 正式事实 | 可以做 | 禁止做 |
| --- | --- | --- | --- |
| 世界观层 | 观爻为何存在、人与变化的关系 | 约束产品意义与表达方向 | 直接改写计算结果 |
| 生命来源层 | 出生坐标、星宿、四象、MotherCode、LifeArchetype、StarBeast 等既有 Engine Result | 产生可追溯的正式生命事实 | 由 Visual、Fixture 或 UI 重算 |
| 会话与适配层 | 同一次真实用户会话及其只读来源引用 | 搬运、校验、冻结、投影已有结果 | 补默认值、自动 fallback、创建第二套生命计算 |
| 体验显化层 | Genesis、Reality、Gravity、Choice、Crystal 的阶段语义 | 让事实与经历被用户看见 | 将显化结果反写为生命来源 |
| Renderer 层 | 已授权的 SceneModel、RenderPlan、ProjectionBundle | 执行既定视觉表现 | 选择身份、候选或人生方向 |

依赖方向只能向下：

```text
Source → Session / Context → Adapter → Experience Consumer → Renderer
```

任何下层均不得反推或覆盖上层事实。

## 3. Genesis 与 Reality 的职责分界

### Genesis

Genesis 回答：

> 这个生命从怎样的时间与星辰结构开始显化？

它消费真实出生来源和既有 Engine Result，呈现月、星、时、象、卦、力、兽与认领。它不是测评、加载页或角色生成器。

### Reality

Reality 回答：

> 这个生命此刻正在遇见怎样的现实力量？

Pressure Candidate 是现实镜面候选，不是系统诊断。只有用户显式认领后，才能形成 Selected Pressure Seed Context。系统不得自动替用户认领。

Genesis 的生命本源不会被 Reality Pressure 修改；Reality 只在既有生命来源上建立当次经历上下文。

## 4. 来源连续性冻结

真实用户链必须同时满足：

1. `sourceExperienceMode = REAL_USER_EXPERIENCE`；
2. provenance 可追溯到 `REAL_USER_SESSION`；
3. Route、Session、Context、Adapter 与 Consumer 的 `sourceReferenceId` 连续；
4. 所有视觉生命事实来自已有 Engine Result；
5. 缺少真实来源时显式返回 `SOURCE_NOT_READY`；
6. Fixture、Prototype、Default、ReferenceOnly 不得进入真实用户链；
7. Adapter 不调用 Engine，不生成候选，不替用户认领。

## 5. 二十八宿坐标显化的世界模型位置

下一阶段“Genesis 真实体验精修（28 星宿坐标显化）”位于：

```text
既有 Mansion Result
↓
真实 Life Source 引用
↓
Genesis Visual Projection
↓
Renderer 显化
```

它是既有本命星宿来源在 Genesis 中的空间显化，不是新的星宿计算、身份算法或天文学推演。

### 必须保持

- 二十八宿是生命星辰来源结构，不是 28 个人格标签或 28 个角色选项；
- 本命星宿只消费既有正式 Mansion Result，不从四象、MotherCode、资产或屏幕位置反推；
- 28 个坐标表达完整星宿结构，本命星宿的点亮表达个人来源位置；
- 坐标映射属于 Visual Projection / Adapter 边界，Renderer 只消费冻结后的输入；
- 真实模式必须携带 Mansion provenance 和连续的 source reference；
- Fixture 只能用于独立预览与视觉回归。

### 禁止提前授权

- 修改 Mansion / StarBeast / Four Symbol / MotherCode Engine；
- 用随机值、默认星宿、Case A/B 或视觉效果选择本命星宿；
- 以屏幕坐标替代生命来源；
- 将星宿显化表述为科学测量、命运预测或系统判定；
- 借精修之名改变 Genesis Timeline、既有视觉语义或 Renderer 参数。

## 6. P0 决策

WORLD-MODEL-ALIGNMENT-P0 冻结以下判断：

1. 真实生命事实的唯一权威仍是既有 Engine Result；
2. Session、Context 与 Adapter 只承载、校验和转换，不重新计算；
3. Genesis 显化生命来源，Reality 显化现实经历，两者不互相改写；
4. 系统提供镜面，用户拥有认领与选择权；
5. Visual 与 Renderer 永远是生命事实的消费者；
6. 28 星宿坐标显化可进入下一阶段，但必须先通过本文件配套检查规范。

## 7. 配套检查

所有触及世界模型、Genesis 星宿显化或跨层来源关系的后续任务，施工前与验收时都必须引用：

- [GUANYAO World Model Alignment Check Specification](./GUANYAO_WORLD_MODEL_ALIGNMENT_CHECK_SPEC.md)

未通过检查时，任务保持 `NOT ALIGNED`，不得以预览可见、构建通过或视觉满意替代世界模型对齐。
