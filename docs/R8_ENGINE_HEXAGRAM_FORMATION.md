# R8-ENGINE-P2｜Hexagram Formation Protocol

GUANYAO SANDBOX 因果链引擎卦码生成逻辑 V1。

本阶段只建立后端协议、类型与 mock 审计结构，不接真实用户输入，不修改前台页面、路由、视觉组件或业务 UI。

## 总纲

三层定卦，重力定压，上下成局。

P2A 锁定补充：

现实种子撞击三线，三线显影形成上码；上码再与母码下码合成卦象。

1. 母码定下卦。
2. 现实压力种子撞击三条一字线。
3. 三线撞击值显影外在环境与上码。
4. 上码 + 下码 生成本局卦码。
5. 人格重力值作为压力轴，决定本局场强。

## 三层卦码分类器

现实压力种子进入分类器后，必须先撞击三条一字线：

- `personalityDynamicsLine`：人格动力线。读取个体旧反应、惯性、防御和表达方式。
- `systemMechanismLine`：系统机制线。读取家庭、资源、关系、组织、责任等外部结构。
- `lifecycleStageLine`：生命周期线。读取当前阶段、窗口、困扰时间和风险临界点。

每条线的撞击值为 0-6：

- `0`：未触发
- `1-2`：轻触发
- `3-4`：明显触发
- `5-6`：强触发 / 主导成局

三线显影后，分类器输出：

- `personalityDynamics`：人格动力层读数。
- `systemMechanism`：系统机制层读数。
- `lifecycleStage`：生命周期层读数。
- `dominantLayer`：本局主导层。
  - `personality`
  - `system`
  - `lifecycle`
  - `mixed`

三层分类器不直接产出最终卦名。它先形成 `UpperCodeFormation`，由三线撞击结果显影上码。

禁止把协议写成“压力种子直接映射上卦”。

## 八类外在环境 / 上卦类型

八类上码都必须由三线撞击结果显影，不允许跳过三线直接映射。

| 上码类型 | 上码 | 显影句 |
| --- | --- | --- |
| 乾型上码 | 乾 | 现实种子撞击后，控制权与决策权成为主导压力，上码显影为乾。 |
| 坤型上码 | 坤 | 现实种子撞击后，责任与承载成为主导压力，上码显影为坤。 |
| 震型上码 | 震 | 现实种子撞击后，变化与推进成为主导压力，上码显影为震。 |
| 巽型上码 | 巽 | 现实种子撞击后，不确定性与进入路径成为主导压力，上码显影为巽。 |
| 坎型上码 | 坎 | 现实种子撞击后，困局与难以抽离成为主导压力，上码显影为坎。 |
| 离型上码 | 离 | 现实种子撞击后，表达与真相显影成为主导压力，上码显影为离。 |
| 艮型上码 | 艮 | 现实种子撞击后，边界与止损成为主导压力，上码显影为艮。 |
| 兑型上码 | 兑 | 现实种子撞击后，关系与交换成为主导压力，上码显影为兑。 |

## 上码形成结构

`UpperCodeFormation` 是 P2A 的核心输出，字段包括：

- `pressureSeedLabel`
- `lineImpact.personalityDynamicsLine`
- `lineImpact.systemMechanismLine`
- `lineImpact.lifecycleStageLine`
- `dominantLine`
- `externalEnvironmentType`
- `upperTrigram`
- `formationReason`
- `upperCodeReading`

## 当前卦码结构

`CurrentHexagramProfile` 是 R8-P2 的核心输出，字段包括：

- `lowerTrigram`
- `lowerSource: "mother_code"`
- `upperTrigram`
- `upperSource: "pressure_field"`
- `hexagramCode`
- `hexagramName`
- `hexagramTitle`
- `upperCodeFormation`
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
- 三线撞击：系统机制线为主导或高值
- 外在环境：坤型环境
- 上码：坤
- 下码：兑
- 卦码：019｜临｜悬崖边
- 上码读数：责任与承载成为主导压力，上码显影为坤

### 样例 B

- 母码：兑｜转化者
- 压力：负债压力
- 三线撞击：系统机制线为主导或高值，生命周期线中等触发
- 外在环境：坎型环境
- 上码：坎
- 下码：兑
- 卦码：047｜困｜围墙里的沉默者
- 上码读数：困局与难以抽离成为主导压力，上码显影为坎

## 工程约束

- P2 不接真实用户输入。
- P2 不修改前台页面。
- P2 不修改 routes。
- P2 不修改 visual components。
- P2 不修改 styles。
- P2 只提供类型、mock、service 骨架与审计入口。
- P2A 只做现实种子撞击三线形成上码，不进入六爻、爻码或器法。

## 审计入口

`auditGuanyaoHexagramFormation()` 必须验证样例 A / B：

- 样例 A：坤上兑下，输出 `019｜临｜悬崖边`。
- 样例 B：坎上兑下，输出 `047｜困｜围墙里的沉默者`。
- 样例 A / B 均必须验证 `UpperCodeFormation.lineImpact`。
- 样例 A / B 均必须验证 `upperCodeReading` 包含“上码显影”句。

该审计只验证 P2 卦码生成协议，不进入真实用户输入链路。
