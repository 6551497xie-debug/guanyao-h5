# R8-ENGINE-P3｜Yao Transmission Engine

GUANYAO SANDBOX 六爻人格传导引擎 V1。

本阶段只建立后端类型、mock 传导样例、service 生成器与 audit 入口，不修改前台页面、路由、视觉组件或业务 UI。

## 总句

卦码定局，六爻观变。

卦码成局之后，才展开六爻人格传导。

## 六爻定义

观爻 P3 的六爻不是传统爻辞解释。

六爻是人格行为动力在本局卦码中的六层传导轨迹，用来观察现实压力如何穿过身体、情绪、思想、行为、记忆、目标 / 动机，并显出主副切口。

固定映射：

| 爻位 | 爻名 | 层级 | 中文层 |
| --- | --- | --- | --- |
| 1 | 初爻 | `body` | 身体 |
| 2 | 二爻 | `emotion` | 情绪 |
| 3 | 三爻 | `thought` | 思想 |
| 4 | 四爻 | `behavior` | 行为 |
| 5 | 五爻 | `memory` | 记忆 |
| 6 | 上爻 | `motivation` | 目标 / 动机 |

该映射固定，不随卦码变化。

## YaoTransmissionProfile

单条爻传导结构：

- `yaoPosition`
- `yaoName`
- `yaoLayer`
- `layerLabel`
- `layerQuestion`
- `pressureReading`
- `motherCodeInfluence`
- `hexagramInfluence`
- `transmissionReading`
- `inertiaSignal`
- `antiInstinctHint`
- `cutPotential`
- `interventionPotential`
- `pauseSignal`
- `pauseReason`
- `userFacingPausePrompt`
- `userFacingContinuePrompt`

`cutPotential` 为 0-6：

- `0`：不构成切口
- `1-2`：轻微切口
- `3-4`：明显切口
- `5-6`：高价值切口

`interventionPotential` 为 0-6：

- `0`：不构成干预点
- `1-2`：轻微信号
- `3-4`：明显信号
- `5-6`：高价值停留点

`pauseSignal` 分为：

- `none`：这一层只作为传导展示
- `soft`：这一层有轻微停留价值
- `clear`：这一层已经值得停一下
- `strong`：这一层可能成为本局高价值处理点

每一爻都可以成为“停留点”。停留点不等于商业按钮，也不等于器法生成入口。

用户提示语必须克制自然，使用类似：

- 这里可以先停一下。
- 这一层，已经值得先处理。
- 如果这里很像你，可以先停在这一层。
- 这一层不是终点，但已经出现明显信号。
- 继续看下一层。
- 继续向后看。
- 继续观下一爻。

用户提示语禁止使用强商业化、强转化、强按钮化语言，也不得把停留点写成器法入口。

## CutCandidate

切口不是固定爻位，而是六爻显影之后的动态评分结果。

`CutCandidate` 包含：

- `yaoPosition`
- `yaoLayer`
- `activationIntensity`
- `inertiaTakeover`
- `consequenceAmplification`
- `interventionLeverage`
- `userAgency`
- `totalScore`
- `cutRole`
- `internalCutReason`
- `userFacingReason`

评分范围均为 0-6：

- `activationIntensity`：该层被压力激活得多强。
- `inertiaTakeover`：该层是否被母码阴影惯性接管。
- `consequenceAmplification`：该层是否正在放大现实代价。
- `interventionLeverage`：处理这一层，是否能改变后续链路。
- `userAgency`：用户是否能在这一层做出具体动作。

`cutRole` 包含：

- `main`
- `secondary`
- `root`
- `candidate`

六爻先显影，切口后生成。

## YaoTransmissionChain

整条六爻传导链包含：

- `sourceHexagramCode`
- `sourceHexagramName`
- `sourceHexagramTitle`
- `motherCode`
- `lowerTrigram`
- `upperTrigram`
- `gravityValue`
- `transmissions`
- `cutCandidates`
- `mainCut`
- `secondaryCut`
- `rootCut`
- `chainSummary`

P3 的输出只到：

- 六爻传导
- 主切口
- 副切口
- 反本能提示
- pauseSignal
- cutCandidates
- rootCut

P3 不生成：

- `RepairMethod`
- `DeviceMethod`
- 90 天行为防御
- 新人格资产内容

这些留给后续 P4。

P3A 只提供后端 pauseSignal 和 cutCandidates，不做前端、不做器法。

## Pipeline Position

P3 插入在当前卦码生成之后：

`MotherCodeProfile`
→ `PressureSeed / PressureField`
→ `UpperCodeFormation`
→ `CurrentHexagramProfile`
→ `YaoTransmissionChain`

旧有下游行为扫描可继续存在，但 P3 自身不负责器法生成。

## 锁定样例 A

输入：

- 母码：兑｜转化者
- 压力：家庭财务压力
- 卦码：019｜临｜悬崖边
- 结构：上坤下兑

期望：

- 生成 6 条 transmissions。
- mainCut = 4 / behavior。
- secondaryCut = 3 / thought。
- rootCut = 6 / motivation。
- behavior interventionPotential 为最高或并列最高。
- chainSummary：家庭财务压力压在兑的沟通转化底盘上，六爻传导表现为：身体紧绷 → 情绪担心 → 思想缓一缓 → 行为转开 → 记忆怕伤关系 → 动机保护家庭稳定。

## 锁定样例 B

输入：

- 母码：兑｜转化者
- 压力：负债压力
- 卦码：047｜困｜围墙里的沉默者
- 结构：上坎下兑

期望：

- 生成 6 条 transmissions。
- mainCut = 4 / behavior。
- secondaryCut = 3 / thought。
- rootCut = 6 / motivation。
- behavior interventionPotential 为最高或并列最高。
- chainSummary：负债压力压在兑的沟通转化底盘上，六爻传导表现为：身体紧绷 → 情绪羞耻焦虑 → 思想再周转一下 → 行为拆东补西 → 记忆害怕说穿 → 动机保护家庭、关系和体面。

## 审计入口

`auditGuanyaoYaoTransmission()` 必须验证：

- 样例 A 生成 6 条 transmissions。
- 样例 A mainCut = 4 / behavior。
- 样例 A secondaryCut = 3 / thought。
- 样例 A rootCut = 6 / motivation。
- 样例 B 生成 6 条 transmissions。
- 样例 B mainCut = 4 / behavior。
- 样例 B secondaryCut = 3 / thought。
- 样例 B rootCut = 6 / motivation。
- `cutCandidates.length >= 6`。
- 每条 transmission 必须包含 `yaoPosition`、`yaoLayer`、`pressureReading`、`transmissionReading`、`inertiaSignal`、`antiInstinctHint`、`cutPotential`。
- 每条 transmission 必须包含 `pauseSignal`、`pauseReason`、`userFacingPausePrompt`、`userFacingContinuePrompt`。
- 所有 `userFacingPausePrompt` / `userFacingContinuePrompt` 不得包含商业化禁用词。
