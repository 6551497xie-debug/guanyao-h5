# R8-ENGINE-P2｜Hexagram Formation Protocol

GUANYAO SANDBOX 因果链引擎卦码生成逻辑 V1。

本阶段只建立后端协议、类型与 mock 审计结构，不接真实用户输入，不修改前台页面、路由、视觉组件或业务 UI。

## 总纲

三层定卦，重力定压，上下成局。

1. 母码定下卦。
2. 压力种子进入三层分类器。
3. 三层分类器决定外在环境与上卦。
4. 上卦 + 下卦 生成本局卦码。
5. 人格重力值作为压力轴，决定本局场强。

## 三层卦码分类器

压力种子进入分类器后，必须输出：

- `personalityDynamics`：人格动力层。读取个体旧反应、惯性、防御和表达方式。
- `systemMechanism`：系统机制层。读取家庭、资源、关系、组织、责任等外部结构。
- `lifecycleStage`：生命周期层。读取当前阶段、窗口、困扰时间和风险临界点。
- `dominantLayer`：本局主导层。
  - `personality`
  - `system`
  - `lifecycle`
  - `mixed`

三层分类器不直接产出最终卦名。它先判断外在环境类型，再由外在环境映射上卦。

## 八类外在环境 / 上卦类型

| 外在环境 | 上卦 | 压力来源 |
| --- | --- | --- |
| 乾型环境 | 乾 | 控制权 / 决策权压力 |
| 坤型环境 | 坤 | 责任 / 承载 / 家庭托底压力 |
| 震型环境 | 震 | 推进 / 变化 / 突发压力 |
| 巽型环境 | 巽 | 不确定 / 选择 / 渗透压力 |
| 坎型环境 | 坎 | 深陷困局 / 债务 / 难以抽离压力 |
| 离型环境 | 离 | 表达 / 误解 / 真相不被重视压力 |
| 艮型环境 | 艮 | 边界 / 停滞 / 止损压力 |
| 兑型环境 | 兑 | 关系 / 冲突 / 沟通 / 交换压力 |

## 当前卦码结构

`CurrentHexagramProfile` 是 R8-P2 的核心输出，字段包括：

- `lowerTrigram`
- `lowerSource: "mother_code"`
- `upperTrigram`
- `upperSource: "pressure_field"`
- `hexagramCode`
- `hexagramName`
- `hexagramTitle`
- `layerClassification`
- `gravityValue`
- `innerForceReading`
- `externalPressureReading`
- `interactionReading`
- `currentSandboxReading`

## 人格重力值

人格重力值 = 压力值在观爻人格场里的表达。

人格重力值不决定“是哪一卦”。它只决定：

- 本局压得多深。
- 当前风险窗口多高。
- 六爻传导语气多重。
- 器法干预强度多大。

V1 先定义为 P1-P6：

| 值 | 名称 |
| --- | --- |
| P1 | 轻微牵引 |
| P2 | 局部承压 |
| P3 | 冲突放大 |
| P4 | 结构承压 |
| P5 | 临界暴露 |
| P6 | 重组关口 |

## 锁定样例

### 样例 A

- 母码：兑｜转化者
- 压力：家庭财务压力
- 外在环境：坤型环境
- 上卦：坤
- 下卦：兑
- 卦码：019｜临｜悬崖边

### 样例 B

- 母码：兑｜转化者
- 压力：负债压力
- 外在环境：坎型环境
- 上卦：坎
- 下卦：兑
- 卦码：047｜困｜围墙里的沉默者

## 工程约束

- P2 不接真实用户输入。
- P2 不修改前台页面。
- P2 不修改 routes。
- P2 不修改 visual components。
- P2 不修改 styles。
- P2 只提供类型、mock、service 骨架与审计入口。

## 审计入口

`auditGuanyaoHexagramFormation()` 必须验证样例 A / B：

- 样例 A：坤上兑下，输出 `019｜临｜悬崖边`。
- 样例 B：坎上兑下，输出 `047｜困｜围墙里的沉默者`。

该审计只验证 P2 卦码生成协议，不进入真实用户输入链路。
