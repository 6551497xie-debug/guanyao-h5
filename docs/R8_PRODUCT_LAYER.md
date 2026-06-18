# R8 — PRODUCT LAYER（产品层｜唯一最高约束）

任务编号：`R8-PRODUCT-LAYER-RECONSTRUCTION`

本文件重建观爻 2.0 的唯一上层约束。**所有 System Layer 与 Physics Layer 必须从本层推导。** 本层级高于 `CONSTITUTION`（`src/governance/constitution.ts`）；二者冲突时以产品层为准，并须经显式「宪法修正案」把 System/Physics 对齐到产品层。冻结引用源：`src/governance/productLayer.ts`。

---

## 一、产品层唯一目标（锁死）

观爻 2.0 不是动画系统，不是物理系统。它唯一成立条件是：

> 用户经历「自我行为 → 结构反馈 → 认知映射」的过程。

核心原则：系统不是「展示结构」，系统是「反射行为」。一句话：**用户做什么，世界就变成什么。**

---

## 二、用户必须经历的唯一路径（不可变、单线、不可分支）

1. **进入**：用户看到「观爻」——无解释 / 无 UI 按钮 / 无选择。
2. **行为触发**：唯一动作 = 右滑 / 拉动 1px 轴。
3. **行为反馈**：系统让用户感知到「自己的行为正在改变结构」。
4. **结构变化**：视觉表达「结构被拉断 / 重组」。
5. **结果呈现**：LOGO 生成（结构结果，而非动画）。
6. **终点**：直接进入生命起点 `/mother-code`。

---

## 三、禁止一切偏离路径的行为（强约束）

禁止：中间时间页（chrono / 数字页 / 解释页）；多次点击确认；二次行为入口；UI 流程分支；动画过渡页。系统只能有一条单线行为链。

---

## 四、产品层 → 系统层约束

- state machine 只能服务「单行为路径」。
- route 只能有单终点 `/mother-code`。
- LOGO 只能是行为结果。
- 粒子只能是行为反馈。
- axis 只能是行为入口。

---

## 五、产品层 → 物理层约束

- 所有视觉变化必须可追溯到「用户行为」。
- 不允许独立动画存在；不允许「自动生成的状态变化」。
- 粒子 / LOGO / 断裂 = 用户行为的直接投影。

---

## 六、三层关系（最终锁定）

```
PRODUCT LAYER（唯一真理）
      ↓ 推导
SYSTEM LAYER（结构实现：state machine / route / 数据）
      ↓ 推导
PHYSICS LAYER（视觉表达：axis / particles / LOGO / fracture）
```

禁止反向推导（PHYSICS/SYSTEM 不得反过来定义 PRODUCT）。

---

## 七、与既有治理的关系

- `PRODUCT_LAYER`（本层）> `CONSTITUTION`（System/Physics 不变量）。
- PROSECUTOR 审查顺序升级：先对照 `PRODUCT_LAYER`（路径/角色/禁止项），再对照 `CONSTITUTION`（结构不变量）。
- 若某不变量与产品层冲突（如「轴断裂聚合」需要改 System/Physics），先发 `R8-CONSTITUTION-AMENDMENT-*` 把 System/Physics 对齐到产品层，再实现——这是「从产品层推导」的合法路径。

---

## 八、验收标准

无任何中间屏；无时间页；无非行为触发动画；LOGO = 行为结果；粒子 = 行为反馈；axis = 行为入口；全系统单路径。

最终系统定义：`R8 = PRODUCT-DRIVEN SINGLE PATH BEHAVIOR SYSTEM`。
