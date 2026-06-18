# R8 — SELF-GOVERNED CODE GENERATION SYSTEM

任务编号：`R8-SELF-GOVERNED-CODE-GENERATION`

本文件将系统运行模式升级为「三层内生治理结构」。自本文件入库起，所有代码生成与修改必须通过 **双角色 + 宪法层** 约束，并以规定输出格式交付。本文件本身属于宪法层，不得被局部任务覆盖。

---

## 一、三角色（运行时必须同时存在）

### 🧱 ENGINEER（工程执行层）

- 职责：编写代码、修改实现、完成功能落地。
- 限制：不判断架构是否合理；不拒绝任务；不修改规则。

### ⚖️ PROSECUTOR（系统检查层）

- 职责：审查 ENGINEER 输出，检测结构违规 / 逻辑污染 / 架构漂移，阻断错误设计。
- 权限：可否决代码、可要求重写；**不主动写代码**。
- 检查清单（逐项执行）：
  1. state machine 是否单一
  2. LOGO 是否 deterministic
  3. physics model 是否单源
  4. route 是否污染
  5. render 是否多层冲突

### 📜 CONSTITUTION LAYER（宪法层）

- 职责：提供不可违反的系统边界与全局原则，防止规则被局部覆盖。
- 不可修改内容（本仓库锚定，见第五节）：state machine 流程、LOGO geometry model、particle core convergence logic、route flow、render layer structure。

---

## 二、执行流程（强制）

每次代码生成必须依序经过：

1. **ENGINEER** 提案实现。
2. **PROSECUTOR** 审查。
3. 若 FAIL → 返回 ENGINEER 重写。
4. 若 PASS → 输出最终代码。
5. **CONSTITUTION LAYER** 终审（结构级）。

闭环：`ENGINEER → PROSECUTOR → CONSTITUTION ↘____↗`。

---

## 三、PROSECUTOR 否决协议（命中任一即 FAIL）

- ❌ 双物理模型（同一模型内 lerp + gravity 混用）
- ❌ LOGO 非 deterministic（几何含随机 / 依赖时间抖动 / 非单源）
- ❌ state machine 分裂（出现第二套状态驱动）
- ❌ render layer 增加（超出宪法锁定的层数）
- ❌ route flow 改动（新增 / 改写路由跳转）
- ❌ UI 污染 physics layer（表现层写入因果 / 物理真值）

---

## 四、绝对锁死的禁止行为

- ❌ ENGINEER 不得绕过 PROSECUTOR。
- ❌ PROSECUTOR 不得生成新设计 / 直接写代码。
- ❌ CONSTITUTION 不得被覆盖或修改（仅可通过显式「宪法修正案」任务变更，见第七节）。
- ❌ 不允许「直接输出代码不审查」。

---

## 五、宪法不变量（锚定当前仓库实现）

以下为 PROSECUTOR 可逐项核对的硬标准，对应当前真实代码。任何改动若与之冲突 → CONSTITUTION BLOCKED。

### 5.1 STATE MACHINE（单一）

- 唯一驱动源：`src/pages/LaunchPage.tsx` 的 `stateRef`（`go()` 写入）。
- 唯一流程：`blackout → typing → axis → gesture → collapse → next`。
- 禁止：第二套并行状态机、用 React state 旁路驱动渲染、跨相位互调。

### 5.2 LOGO GEOMETRY MODEL（确定性 + 单源）

- 唯一几何来源：`src/components/visual-system/xMatrixModel.ts` 的 `getXMatrixSegments(center, radius)`。
- Canvas（`LaunchPage`）与 SVG（`GyXMatrixLogo`）必须调用同一模型；两端输出不一致 → FAIL。
- 几何中**不得**含随机数 / 时间抖动 / 手工坐标。散点 `scatterFor` 仅决定收敛**起点**，不修正终态结构。

### 5.3 PARTICLE CORE CONVERGENCE（单一收敛逻辑）

- 唯一收敛：`convergeParticles`（偏移 `ox/oy` 按 lerp 0.35 趋零 + 0.2px 锁存吸附 `locked`）。
- 终态门：`allParticlesLocked()` → `logoReadyRef`。
- 禁止：在收敛中引入重力 / 速度积分 / 第二套物理（避免「双物理模型」）。`next` 相位的沙粒仿真是**独立过程层**，不得回写 LOGO 粒子。

### 5.4 ROUTE FLOW（不可污染）

- 路由定义只在 `src/App.tsx` + `src/routes/guanyaoRoutes.ts`。
- 首页终态唯一跳转：`navigate("/mother-code")`。
- 禁止：新增路由、改跳转目标、在表现层旁路导航。

### 5.5 RENDER LAYER STRUCTURE（层数锁定）

- `LaunchPage` rAF 单一渲染管线，固定三层 + 一过程层，顺序固定、互不抢层：
  - LAYER 1 typing（仅 `typing`）
  - LAYER 2 axis（`axis / gesture / collapse / next` 常驻交互层，含蓝色滑块）
  - LAYER 3 logo（仅 `collapse` 且 `logoReady`）
  - （过程）next 沙化像素层
- 禁止：新增渲染层、把 LOGO 绘制混入 typing/axis、多 canvas 叠加。

---

## 六、输出格式（每次代码改动强制）

```
ENGINEER OUTPUT:
- code / change summary

PROSECUTOR REVIEW:
- PASS / FAIL
- violation list (if any)

CONSTITUTION CHECK:
- PASS / BLOCKED
```

纯对话 / 纯文档说明可省略；任何触及 `src` 的改动不可省略。

---

## 七、宪法修正流程

第五节不变量仅能通过显式任务 `R8-CONSTITUTION-AMENDMENT-*` 变更，且必须：先在本文件登记修正条款 → 再执行实现。禁止在功能任务中顺手改动宪法不变量。

---

## 八、系统目标

- ✔ single source physics system
- ✔ deterministic LOGO collapse
- ✔ state machine 不分裂
- ✔ render layer 不扩展
- ✔ 防止结构漂移

最终形态：`R8 = SELF-GOVERNED CODE GENERATION SYSTEM`。

---

## 九、检察官宪法独立性（R8-PROSECUTOR-CONSTITUTION-ISOLATION-P0）

防止 PROSECUTOR 被 ENGINEER 语义污染（解释偏移 / 默认通过 / 语义继承）。

### 9.1 OUT-OF-BAND 引用层

- 宪法升级为**独立引用源**，落地于 `src/governance/constitution.ts` 的 `Object.freeze(CONSTITUTION)`，而非文本片段。
- 该模块只读、刻意不被运行时业务 import，使 ENGINEER 与 CONSTITUTION 语义层物理隔离。

### 9.2 PROSECUTOR 独立判定（纯对照）

- `PROSECUTOR CHECK = PURE CONSTITUTION COMPARISON`：`if (systemState !== CONSTITUTION.spec) → FAIL`。
- 禁止：基于 ENGINEER OUTPUT 做合理化判断；接受 ENGINEER 提供的默认解释；用 ENGINEER 的变量命名理解系统；任何语义简化；以及把 CONSTITUTION 内容当作可调评估依据。

### 9.3 三权关系（最终锁定）

| 角色 | 性质 |
| --- | --- |
| ENGINEER | 提案系统（可变） |
| PROSECUTOR | 对照系统（不可变） |
| CONSTITUTION | 真理系统（不可解释） |

### 9.4 流程隔离

`STEP 1 ENGINEER OUTPUT → STEP 2 PROSECUTOR (ONLY CONSTITUTION CHECK) → STEP 3 CONSTITUTION FINAL VALIDATION`；三者不共享变量解释层。

### 9.5 已登记分歧（待裁决，不在本刀处理）

`CONSTITUTION.route = "Launch → chrono-axis → mother-code"`（真理源，逐字记录）。当前实现 `LaunchPage` 终态为 `navigate("/mother-code")`，**缺少 `chrono-axis` 中间段**。按纯对照规则此为潜在 FAIL，但本刀仅建立隔离机制、不改实现；该分歧留待独立 ENGINEER 刀按 RAW TRUTH 对齐（禁止反向改宪法迁就代码）。

最终系统状态：`R8 = ISOLATED GOVERNANCE SYSTEM ✔`。
