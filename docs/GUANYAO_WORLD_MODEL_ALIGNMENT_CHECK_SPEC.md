# GUANYAO World Model Alignment Check Specification

规范编号：`GUANYAO-WORLD-MODEL-ALIGNMENT-CHECK-P0`

适用基线：[GUANYAO 1.0 World Model Alignment P0](./GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md)

## 1. 使用范围

下列任务必须执行本规范：

- 新增或调整生命 Source、Session、Context、Adapter；
- Genesis / Reality / Gravity / Choice / Crystal 的体验施工；
- 二十八宿、本命星宿、四象、MotherCode、StarBeast 的视觉显化；
- Production Consumer、Host、Route 与 Renderer 之间的来源切换；
- Fixture / Prototype 向真实用户体验边界靠近的任何变更。

本规范是文档检查规范，不是运行代码，也不授权新增 Engine、Runtime 或 Renderer 行为。

## 2. 施工前检查

每一刀必须明确回答：

1. 本刀属于世界模型的哪一层？
2. 正式输入来自哪个既有结果或不可变上下文？
3. 输出被哪个下游消费者使用？
4. `sourceReferenceId` 与 provenance 如何连续？
5. 缺少来源时是否明确失败，而不是 fallback？
6. 是否可能让 Visual、Fixture、Prototype 或 UI 成为生命来源？
7. 是否可能替用户完成认领、判断或选择？
8. 是否触及冻结 Engine、Runtime、Renderer、Visual Calibration 或生命宪法？

任一问题无法回答，状态为 `NOT READY`。

## 3. Source Continuity 检查

真实体验必须逐项满足：

- [ ] 出生来源属于真实用户会话；
- [ ] Engine Result 已经存在，本刀没有重复计算；
- [ ] Session / Context 为只读承载；
- [ ] Adapter 不调用任何生命 Engine；
- [ ] Route、Context、Adapter、Consumer 的来源引用一致；
- [ ] provenance 明确为真实用户来源；
- [ ] 缺失来源返回 `SOURCE_NOT_READY` 或等价显式阻断；
- [ ] 不存在 Fixture、Prototype、Default、ReferenceOnly fallback；
- [ ] Renderer 输入仍由上游正式投影产生；
- [ ] 下游没有反写上游生命事实。

## 4. 用户主体性检查

- [ ] Pressure Candidate 只作为现实镜面候选；
- [ ] 系统没有自动认领 Pressure Seed；
- [ ] Gravity 不被表达为用户缺陷或惩罚；
- [ ] Choice 仍由用户显式决定；
- [ ] Crystal 只记录已经发生的变化；
- [ ] 星兽被表达为生命原型，而非系统生成的外在角色；
- [ ] 产品文案没有把隐喻包装为科学测量或命运结论。

## 5. 二十八宿坐标显化专项检查

进入“28 星宿坐标显化”施工前，必须冻结并验证：

- [ ] 唯一个人星宿来源是既有 Mansion Result；
- [ ] 28 个坐标只承担完整星宿结构的视觉投影；
- [ ] 本命星宿点亮与 Mansion Result 一一对应；
- [ ] 四象、MotherCode、StarBeast Asset 不参与反推星宿；
- [ ] 坐标表不包含随机、日期默认或 Case A/B fallback；
- [ ] 真实用户模式携带 Mansion provenance；
- [ ] Fixture 模式与真实用户模式物理或类型隔离；
- [ ] Projection 只增加来源到视觉的映射，不改变 Engine 结果；
- [ ] Renderer 参数、Timeline 和视觉校准不因 Source 接入被暗改；
- [ ] 体验表达为“原本存在、此刻被看见”，不是“生成了你的星宿”。

## 6. 文档引用检查

相关施工说明、架构决策或验收报告必须引用：

1. [GUANYAO 世界观宪法 V2.0](./GUANYAO_WORLDVIEW_CONSTITUTION_V2.md)；
2. [GUANYAO Life System Constitution V1.0](./GUANYAO_LIFE_SYSTEM_CONSTITUTION.md)；
3. [Star Mansion Life Trajectory Source Freeze Protocol](./GUANYAO_STAR_MANSION_LIFE_TRAJECTORY_SOURCE_FREEZE_PROTOCOL.md)；
4. [GUANYAO 1.0 World Model Alignment P0](./GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md)。

不得只引用局部实现文件来证明世界模型成立。

## 7. 验收结果格式

每刀验收必须给出：

```text
World Model Alignment: PASS / FAILED
Source Continuity: PASS / FAILED
User Agency: PASS / FAILED
Fixture Isolation: PASS / FAILED
Frozen Boundary Changes: NONE / [explicit list]
Evidence: [document / gate / test references]
```

只有全部为 `PASS` 且冻结边界变更为 `NONE`，或已取得明确跨层解冻授权时，才允许进入下一刀。
