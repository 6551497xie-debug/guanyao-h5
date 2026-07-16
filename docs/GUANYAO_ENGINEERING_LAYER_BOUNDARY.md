# GUANYAO Engineering Layer Boundary

本文件是 `GUANYAO Product & Engineering Constitution V1.0` 的工程层级实施说明。

## 1. 固定层级

```text
WORLDVIEW
↓
LIFE SYSTEM
↓
ENGINE
↓
EXPERIENCE
↓
VISUAL
↓
UI
↓
IMPLEMENTATION
```

层级顺序不可由局部施工改写。

“修改只能向下”表示：上位层可以约束下位层的表达与实现，下位层不得反向定义、重算或修改上位层。它不表示 UI 或视觉可以直接修改所有下游文件，也不表示跨层依赖可以跳过正式契约。

## 2. 各层职责

| 层级 | 职责 | 允许输出 | 禁止事项 |
| --- | --- | --- | --- |
| `WORLDVIEW` | 定义存在理由、最高语义与哲学边界 | 世界观协议 | 被 UI、视觉或 Prototype 改写 |
| `LIFE SYSTEM` | 定义生命对象、来源关系与职责 | 生命模型、身份来源契约 | 被 Renderer 或 Asset 创造身份 |
| `ENGINE` | 执行确定性计算与领域规则 | 正式计算结果 | 读取视觉偏好改变结果 |
| `EXPERIENCE` | 编排用户理解与显化顺序 | 体验状态、Presentation | 改变计算依赖或伪造生命结果 |
| `VISUAL` | 将正式状态映射为表达参数 | Visual State、RenderPlan | 重新计算身份、修改 Life State |
| `UI` | 展示并接收用户明确交互 | 页面反馈、用户指令 | 用反馈直接修改规则或冒充主体授权 |
| `IMPLEMENTATION` | 实现已批准契约与技术细节 | 代码、适配器、基础设施 | 用技术限制反推产品与生命定义 |

## 3. 合法方向

合法施工必须沿正式契约向下：

```text
上位定义
↓
稳定契约
↓
下位消费
```

下位层发现问题时，可以向上提交审查证据，但在评审完成前不得直接改写上位定义：

```text
下位问题
↓
Review / Evidence
↓
上位层独立决策
```

这是一条治理反馈链，不是反向依赖或自动修改链。

## 4. 生命显化专项边界

Personal Star Beast 的正式方向固定为：

```text
MansionSeed + FourSymbolField + LifeArchetypeForce
↓
PersonalStarBeastIdentityReference
↓
Manifestation
↓
Visual State
↓
Renderer
```

- MansionSeed、FourSymbolField 与 LifeArchetypeForce 由正式上游来源确定；
- Manifestation 不得重新计算三项来源；
- Visual State 只表达 Manifestation；
- Renderer 只消费视觉契约；
- Canvas、WebGL、图片、模型与动效均属于下游实现，不得决定生命身份。

## 5. Prototype 状态边界

| 状态 | 可做 | 不可做 |
| --- | --- | --- |
| `EXPERIMENT` | 在隔离范围验证假设 | 接入 Production、成为正式来源、修改上游 |
| `CANDIDATE` | 接受资格与一致性审查 | 被正式 UI / Runtime 直接消费 |
| `PRODUCTION` | 按批准契约进入正式消费 | 绕过来源、授权、release gate |

状态升级必须具备显式来源、独立协议、独立 gate 与明确提交。Preview URL 或人工视觉满意不能作为 Production 授权。

## 6. 每刀边界声明

每次施工应在审查阶段明确：

- 所属层级；
- 正式输入；
- 输出契约；
- 允许修改的白名单文件；
- 禁止触碰的上游系统；
- 验证与回滚边界；
- 是否触发架构评审。

发现指令截断、来源冲突、跨层上行或 Prototype 冒充 Production 时，施工方必须先提出问题，不得急于下刀。
