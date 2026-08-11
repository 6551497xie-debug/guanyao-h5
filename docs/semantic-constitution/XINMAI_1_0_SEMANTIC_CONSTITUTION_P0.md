# XINMAI 1.0 语义宪法 P0

状态：`FROZEN FOR FUTURE ATOMIC CONSUMER CUTOVER`

审计日期：2026-08-12

基线：`6d3ac5c66eaeb2838e1ea0907183af47c724a37d`

性质：docs-only；不构成 Runtime、Authority 或内容迁移。

## 0. Part 0 交付拓扑

- Expected Parent：`6d3ac5c66eaeb2838e1ea0907183af47c724a37d`，核对 MATCH；
- 直接父提交：`1c774b647f2f4a78ec8cc814c635c86d23895d9f`；
- 本地正式远程跟踪：`origin/codex/genesis-28-mansion-production-continuity = 4a6471ebd68a9bd46938decb78d13f0058830bdc`；
- `4a6471e…` 是 Expected Parent 的祖先，当前候选链领先本地远程跟踪 17 commits；
- 实时 `ls-remote` 因当前 SSH 网络不可达未刷新，记录为证据黄灯，不推断远程已变化，也不执行 merge/rebase/cherry-pick/force；
- 审计在独立 clean worktree/branch 上形成，正在运行的用户 Preview 与 Candidate/Counter 未触碰。

## 1. 唯一价值承诺

> 完成一轮以后，你会更清楚自己为什么这样反应，并带走一个愿意回到现实验证的小行动。

“完成”只指用户走完一轮观察、行动假设、现实尝试和结果回收；动画播放、六维计数、Choice 提交或 Crystal 出现均不能单独兑现价值承诺。

验收必须同时成立：

1. 用户知道当前屏为什么存在以及下一步是什么；
2. 用户看见一条此前不清楚的反应链；
3. 用户形成一个具体、可撤销、低风险的现实行动；
4. 用户回来后用事实修正理解，而非被系统宣布结论；
5. 暂不参与、暂不确定、未尝试均不被伪造成成长证据；
6. 获得感来自理解更清楚、行动可验证、结果可积累，而非完成动画或收集结晶。

## 2. 三论：1.0 产品骨架

### 2.1 本体论

人不是固定人格、命运标签或单一实体，而是身体、经验、关系、环境与选择持续作用的动态系统。

产品后果：

- 不用出生信息、一次选择或一轮结果定义用户；
- 不把压力反应写成性格缺陷；
- 允许同一用户在不同情境中呈现不同反应；
- Archive 记录变化轨迹，不汇总为人格结论。

### 2.2 认识论

用户当下的理解只是对现实的有限模型。观察是收集可修正的证据，不是诊断、算命或绝对真相。

产品后果：

- 系统陈述使用“你刚才选择/确认/记录”而非“你本质上”；
- 不确定、混合、暂不说是合法结果；
- 三层解释只能是可核对的观察镜头，不能成为新 Authority；
- Reality Return 的事实可修正先前理解，但不回写或篡改旧记录。

### 2.3 方法论

唯一方法链：

`真实情境 → 六维观察 → 理解三层张力 → 形成最小行动 → 回到现实验证 → 记录真实结果 → 更新理解`

边界：六维完成不等于 Choice；Choice 不等于行动发生；Return 不等于成功；Fact 不等于更好；Crystal 不等于奖励。

## 3. 三层系统：反应为什么产生

| 内部名称 | 覆盖内容 | 用户语言 | 合法用途 | 禁止用途 |
|---|---|---|---|---|
| 本能系统 | 生存、资源、安全、身体边界、延续 | “身体与基本安全在保护什么？” | 解释资源、身体和边界压力的可能来源 | 把普通不适升级成生存危机 |
| 社会系统 | 身份、关系、规则、责任、归属、意义 | “关系、规则或责任在要求什么？” | 解释角色、群体和承诺张力 | 诊断依恋、人格或道德高低 |
| 超越系统 | 真理、公平、长期未来、创造、超越局部自身 | “你想守住哪种长期方向或价值？” | 解释超出眼前得失的方向 | 宗教事实、神性等级、牺牲劝导 |

冻结规则：

- “兽性 / 人性 / 神性”只可出现在哲学来源或内部研究备注，不得成为 1.0 页面主标签；
- 三层没有高低、进化或成熟顺序；
- 三层解释“为什么可能产生反应”，六维记录“反应如何出现”；
- 三层判断不持久化，不进入 Receipt、Choice、Fact、Crystal 或 Body Imprint；
- 证据不足时只显示问题，不给出系统结论；
- 数字生命、人与 AI 的主体性及责任边界明确属于 2.0+，1.0 不预埋第四层。

## 4. 六维：反应如何出现

Canonical Authority IDs 保持字节级不变：`BODY / EMOTION / THOUGHT / ACTION / MEMORY / GOAL`。

| Authority ID | 1.0 用户语言 | 观察对象 | 非目标 |
|---|---|---|---|
| BODY | 身体 | 位置、节律、紧张或松动等受限选择 | 健康诊断、体能评估 |
| EMOTION | 情绪 | 清楚、混合或不确定 | 情绪标签人格化 |
| THOUGHT | 想法 | 最先出现的句子、片段或保留 | 保存自由文字、判断真伪 |
| ACTION | 行动冲动 | 推进、退开或暂停 | 把冲动当成已经行动 |
| MEMORY | 记忆联想 | 更像过去、现在或尚不确定 | 要求披露创伤或回忆细节 |
| GOAL | 需要与方向 | 需要、价值或不确定 | 人格动机推断、道德评价 |

六维共同协议：

- 不是人格测验，也不要求每一维都有强烈反应；
- 只有用户对当前维度作出明确、受限选择并最终确认，才可保存；
- 页面只发送 bounded semantic response ID；自由文字、Whisper、命名文本不进入六维 Authority；
- 六维用于看见反应链，不证明三层结构，也不替用户解释；
- PRESENTED、停留时间、动画完成、路由进入、DOM 状态和本地计数均为零证据；
- Response Map 只读展示已持久化的六个选择；旧 V2 只显示真实的 generic summary。

## 5. Reality：现实反馈实验场

Reality 是用户能辨认的真实压力情境，重点来自关系、责任、资源、规则与身份冲突。

| 节点 | 冻结含义 | 不是 |
|---|---|---|
| Reality | 一段可辨认的现实压力 | 神秘力量靠近、宇宙发布真理 |
| Choice | 最小、低风险、可撤销的验证假设 | 仪式承诺、道德考试 |
| Departure | 把假设带回生活 | 已经完成行动 |
| Return | 回收真实结果 | 自证成功 |
| Fact | 用户确认确实发生过的事实 | 系统推断、页面计数 |
| Formation | 既有 Authority 对事实与谱系的合法形成过程 | 动画凝结 |
| Crystal | 一次模型更新的可回看证据 | 奖励、占卜结论、人格勋章 |
| Archive | 跨轮次观察与事实记录 | 命运档案、人格报告 |

三层张力在 Response Map 与 Choice 之间出现：Presenter 可以根据现有 pressure provenance 与 bounded selections 提出最多三个可核对问题；不得写入事实，也不得宣布某一层“主导用户”。

## 6. 三级语言层

### 主层：现代直接语言

负责告诉用户：现在看什么、提供什么、系统会如何使用、继续或跳过会发生什么。所有主标题、按钮、错误、状态和辅助说明必须属于主层。

### 次层：认知/系统解释

负责解释观察、反馈、路径依赖、行动假设和模型更新。必须使用“可能、当前证据、回来核对”等可修正措辞。

### 氛围层：东方宇宙意象

星宿、星河、生命化身等只承担情感、节奏与跨轮连续性。不得承担操作逻辑，不得冒充科学事实或 Authority。

禁止：

- 用玄学隐喻代替任务说明；
- 把古代哲学等同现代科学结论；
- 诊断、命定、人格定型、未来预测；
- 要求用户相信“同一个生命”“天地之名”等本体声明才能继续；
- 在公开文案中显示 Fact、Receipt、Authority、digest 等内部术语。

## 7. 特别产品裁决

### Birth Coordinate

代表肉身进入现实的时间坐标。公历为用户输入，农历/干支为文化时间表达；不得成为命运、人格、能力或未来结论。

### Genesis 与星宿化身

Genesis 是将已确认坐标转为连续体验载体的等待与形成过程。化身是导航与陪伴载体，不是要求用户“认出一个客观存在生命”。用户确认的是“愿意以此形象继续体验”。

### Whisper

定义为可选的“写给此刻的自己”。不参与分析、不影响 Reality、Choice 或结果。原始文字保持 ephemeral；“暂时不写”必须直接继续。若视觉响应失败，用户可跳过且不会损失 Authority 资产。

### Naming

Naming 是第一轮价值闭环后的可选关系动作。它不能阻断第一次 Reality、六维、Choice、Return 或下一周期。后续 Cutover 只迁移既有 Naming consumer 的出现时机与入口；既有 Naming writer/schema 保持不变。

## 8. Authority 冻结裁决

后续语义迁移可保持以下 Authority 完全冻结：

- Birth source / derivation / admission；
- Identity / Relationship / existing Naming writer；
- Pressure Catalog 450 / revision / pressureNature；
- Reality Intent / Admission / Lifecycle；
- Six-Dimension Set / Item / Receipt V2 / semantic selection；
- Choice V4 / Formation Snapshot V3；
- Return / Fact / Eligibility / Formation / Crystal / Body Imprint；
- IndexedDB version、Store、Index、persisted schema。

允许变化仅为只读 Resolver、Presenter、消费者顺序、可选入口、route state wiring、页面语义和相关 CSS/Gates。若实施中发现必须新增字段、Writer、Store、Authority 或回填，立即升级为 RED re-audit。

## 9. 最终裁决

出口：`A. APPLICATION READY — SINGLE ATOMIC SEMANTIC CONSUMER CUTOVER`

理由：现有 canonical evidence 已足以展示六维回应图谱、微行动、Return 事实、Crystal/Archive 价值闭环；三层只作为非持久化的可修正解释镜头；Naming 后移属于既有可选消费者重新编排。无需改变 Authority 或 persisted contract。
