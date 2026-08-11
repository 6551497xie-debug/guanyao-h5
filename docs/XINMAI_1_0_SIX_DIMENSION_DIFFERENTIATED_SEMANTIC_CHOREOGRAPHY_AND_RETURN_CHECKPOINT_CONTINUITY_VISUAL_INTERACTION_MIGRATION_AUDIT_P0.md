# XINMAI 1.0 六维差异化语义编舞与 Return Checkpoint 连续性视觉交互迁移审计 P0

## 0. 审计身份与裁决

- Blade: `XINMAI-1.0-SIX-DIMENSION-DIFFERENTIATED-SEMANTIC-CHOREOGRAPHY-AND-RETURN-CHECKPOINT-CONTINUITY-VISUAL-INTERACTION-MIGRATION-AUDIT-P0`
- Traffic light: `RED / AUDIT ONLY`
- Expected Parent: `7cb8366becaab62e60205f5431e49065418f3df9`
- Accepted Runtime baseline: `7cb8366becaab62e60205f5431e49065418f3df9`
- Accepted Counter, excluded from ancestry: `690bc455d1f600a94a829d99e15e63867642637d`
- Audit date: `2026-08-11`
- Runtime / CSS / Page / Gate / Store / Schema actual diff: `0`
- Push: `HOLD`

### 0.1 审计裁决

`APPLICATION READY — SINGLE ATOMIC CONSUMER CUTOVER REQUIRED`

六维 Canonical Authority、Completion Receipt、Choice V3、Return、Fact、Crystal、Ownership、Body Imprint、Archive 与重复生命循环均保持冻结。问题位于同一条 Presentation/Consumer/CSS 链：当前六维共享一套三次靠近状态机和同一组抽象文案，Return checkpoint 又在同一个 Returning host 中与称呼/Whisper/Ownership 层叠加。若分两次开放，会产生“六维已变清楚、Return 仍死路”或“Return 已连续、六维仍重复”的半迁移体验。因此未来应用必须作为一个原子 Consumer cutover 提交；内部可按组件分区施工和测试，但不得分批向用户开放。

Counter 只切换一个 Presentation policy：

```text
XINMAI_VISUAL_SEMANTIC_EXPERIENCE_POLICY:
ENABLED -> SAFE_WITHHELD
```

`SAFE_WITHHELD` 不恢复旧的“三次靠近”流程，而使用同一 Canonical facts 的无动画、逐维静态 presenter；保留明确问题、最多三个回应、唯一最终确认和真实 checkpoint 动作。它不扣留、补写或重解释 Authority。

## 1. 范围、方法与证据边界

审计范围是 `/dynamics` 六维观察、Returning/Return checkpoint、Whisper、关系称呼、Ownership 后的下一段现实入口，以及它们在 390×844 / 320×568 上的排版与操作连续性。审计使用用户明确提供的六张截图，并逐项追踪 Candidate `7cb8366…` 的正式生产消费者、resolver 与 CSS。截图可以证明视觉层级、裁切、重复语法和动作缺失；键盘顺序、TalkBack 宣读、实际对比度数值与 native Reduced Motion 行为仍需未来 Runtime Candidate 的浏览器验收，本文不宣称 WCAG 全面合规。

## 2. Screenshot-by-screenshot findings

| # | Evidence | Step / visible state | Health | Finding |
|---|---|---|---|---|
| 1 | `codex-clipboard-982a7fff-0b88-4ada-a0c2-9339695d109b.png` | BODY 第三靠近 / 回应选择 | REJECT | “观察入口 · 身体”与“当前观察 · 身体”重复；核心句“旧的保护仍在 / 一点新的流动”没有身体位置或节律信息。三枚弱对比文字按钮缺乏主次，生命节点本体几乎不可见。 |
| 2 | `codex-clipboard-9412dfb6-54aa-4bd6-95ef-459b8d9f5bfa.png` | BODY 已确认、等待最终保存 | REJECT | 标题发生重叠；成功感极强的“大句”在 Canonical item 尚未保存时出现；文本横向超出画面并被裁切。最终动作与状态文案没有形成稳定底部操作区。 |
| 3 | `codex-clipboard-3a033e4f-c79a-4079-ad57-b2ad7ced7187.png` | EMOTION 第一次靠近 | REJECT | 新维度仍显示完全相同的“看见/命名/理解/转化”轨道和“第一次靠近”；只换标题与一句 insight，用户无法理解为何现在观察的是情绪而不是身体。长句从右侧被裁切。 |
| 4 | `codex-clipboard-c983765a-87d9-420a-be90-9355851af403.png` | EMOTION 第二次靠近 | REJECT | “第二次靠近 · 理解”仍是程序步骤，不是情绪操作；正文在窄屏被拆成大字号多行，视觉节点、问题与动作彼此分离。没有强度、质地或不确定性入口。 |
| 5 | `codex-clipboard-4dcbd4c0-fffc-49f7-ba5f-534d685a1e04.png` | GOAL/MOTIVE 回应选择 | REJECT | GOAL 仍复用“旧保护/新流动”与 BODY 相同的选择。用户看不到被保护的价值/需要，维度差异只剩标题。三个回应均为低对比文本，主动作不明确。 |
| 6 | `codex-clipboard-253d1414-ae06-4536-a2f9-a1364f5b2ae9.png` | `NOT_ATTEMPTED` 后 Returning checkpoint | REJECT | 巨型说明卡占据主要空间，顶部标题叠加；已完成 no-fact 分支后没有清楚的“回到生活/开始下一段现实”主动作，只剩低可见度“调整称呼”。用户无法判断是完成、等待还是卡住。 |

共同根因不是单个字号，而是三个并存 presentation owners：Gravity 内联绝对定位、全局 reflection CSS、Returning host 内联 CSS/卡片 CSS。它们分别修改宽度、位置、字号和 overflow，却没有单一 mobile composition owner。

## 3. Canonical boundary（冻结）

### 3.1 不变的 Authority

1. 固定维度 ID 与顺序仍为 `body / emotion / thought / action / memory / goal`。
2. Canonical Observation Set、item typed state、Completion Receipt、Choice V3 receipt binding、Fact/Formation/Crystal/Body Imprint 均不变。
3. 每一维只有一次明确的 dimension-specific final acknowledgement 可以请求现有 `onSixDimensionAcknowledgement`；只有 Controller 返回成功才可宣布 `OBSERVED`。
4. 问题浏览、chip 选择、局部 motion、trace、camera、停留时间、route entry、DOM state 与 intermediate copy 全是 ephemeral presentation；不得计数、持久化或推导证据。
5. `PAUSE / UNCERTAIN / DECLINED` 不形成该维 `OBSERVED`；返回时恢复 Canonical subset，并把当前 pending dimension 打开到诚实、可操作的静态起点。
6. 不新增 Store、Schema、Writer、page-local 6/6、raw Whisper persistence、AI inference 或第二状态机。
7. Candidate `7cb8366…` 的 post-Ownership fresh Intent lifecycle corrective 不得修改或旁路。

### 3.2 Presentation command 边界

未来的只读 resolver 输出：`dimensionId`、`question`、`observationStatement`、`responseOptions`、`interactionGrammar`、`motionPlan`、`reducedMotionPlan`、`finalAcknowledgementLabel` 与 `safeStaticPlan`。它不得读取 Storage、不得写 Authority。页面仅持有当前维度内的 ephemeral response selection；切维、refresh 或离开即丢弃。最终按钮始终调用现有 typed item command，不创建新的 command/result union。

## 4. 六维差异化交互语法与明文协议

每一维最多 `1–2` 个有意义交互，然后出现唯一最终确认。下表中的 response 是 presentation acknowledgement 候选，不等于 Canonical outcome；“暂时不说/还不确定/先停一下”都不会触发最终 command。

| Dimension | Distinct grammar | User-facing question | Short observation statement | Response choices（最多三项） | Final acknowledgement | Motion / native Reduced Motion | Keyboard / TalkBack |
|---|---|---|---|---|---|---|---|
| BODY | 在同一个生命身体上定位一个区域，再用短 trace 表示紧、沉、热、空或节律；不要求医学描述 | `这件事靠近时，身体哪里先有反应？` | `身体先给了一个位置或节律信号。` | `我能指出一处` / `有反应，但说不清位置` / `先停一下` | `保存这次身体观察` | Motion：镜头轻近身体，选中区域出现一次沿身体的短 trace；Reduced：相同区域用静态轮廓、文字和高对比 marker 表示 | 身体区域是 radiogroup；方向键移动，Space 选择；TalkBack 读“身体，问题，选项，未保存” |
| EMOTION | 选择感受的强度/质地，不把感受诊断成人格；允许混合和不确定 | `此刻最靠近的感受，清楚到什么程度？` | `这份感受有了可承认的强弱与质地。` | `很明显` / `有感觉，但混在一起` / `还说不清` | `保存这次情绪观察` | Motion：同一身体外层光场按强弱收放一次，色相只作区分不声明情绪类别；Reduced：静态三档刻度和文字状态 | 三档 segmented radiogroup；选择后 live region 只读当前选项，不读动画 |
| THOUGHT | 把正在塑造事件的一句话/片段放到前景；可自己写但 raw text 不进入 Canonical evidence | `这件事发生时，脑中最先出现哪句话或片段？` | `一段正在解释现实的句子被你看见。` | `我能认出一句` / `只有片段或画面` / `暂时不说` | `保存这次思维观察` | Motion：空间深度收窄，一条短句/片段层在身体前停住；Reduced：静态引号框，不做逐字动画 | “自己写”进入 ephemeral input；Esc/返回不提交；TalkBack 说明“内容不作为诊断，也不随观察证据保存” |
| ACTION | 在同一场景显示推进、退开、暂停三种 impulse，用户辨认第一冲动与可暂停位置 | `你最先想做的是推进、退开，还是先停一下？` | `第一冲动与可以暂停的位置被分开。` | `马上推进` / `先退开` / `先停一下` | `保存这次行动观察` | Motion：三条短路径从身体向前/后/原地展开，选中后其余淡出；Reduced：三枚静态方向图形加完整文字 | 三个真实 button/radio，至少 44px；焦点顺序与视觉顺序一致；选择不自动提交 |
| MEMORY | 用“当时/现在”两个时间锚点辨认熟悉感，不要求披露事件细节 | `此刻像不像某个熟悉的时刻？` | `过去与现在被放在两个时间位置上。` | `像过去的一幕` / `更像现在正在发生` / `还分不清` | `保存这次记忆观察` | Motion：同一身体保留，背景出现轻微时间回声后回到“现在”锚点；Reduced：并列“当时/现在”静态标签 | 两锚点与不确定项组成 radiogroup；TalkBack 不要求朗读或输入具体回忆 |
| GOAL | 从反应后面辨认正在保护的价值/需要，不输出人格标签或“真正动机” | `这份反应最不想失去的，是什么？` | `被保护的价值或需要被看见，但没有变成人格结论。` | `我能指出一个重要需要` / `只知道不想失去什么` / `暂时说不清` | `保存这次动机观察` | Motion：外围轨迹向同一生命核心收拢但不封闭成答案；Reduced：静态核心与三条来源线 | 最终维仍使用相同按钮语义；TalkBack 读“动机观察，6/6，尚未保存”，成功后才读“6/6 已保存” |

### 4.1 明文规则

- 禁止：`第一次靠近 / 第二次靠近 / 第三次靠近`、跨维复用 `旧的保护仍在 / 一点新的流动`、`转化`、`疗愈`、人格判断、能力评分、强迫披露。
- 每维只显示一个标题：`观察 {n}/6 · {维度}`；不再同时显示“观察入口”和“当前观察”。
- 当前问题永远可见；一条简短 observation statement 只在用户选择后出现。
- 最终按钮出现前必须显示“尚未保存”；成功后才宣布“{维度}观察已保存”，并进入下一维。
- Authority `LOADING/SAVING/RETRYABLE/SAFE_WITHHELD` 继续使用既有 typed readiness 和 retryability。不可重试时无假重试；可重试时保留当前维 ephemeral 选择并提供真实重试。

## 5. Continuous-scene choreography

### 5.1 单一场景合同

- `RealityLifeUniverseCanvas` / existing continuous scene host 继续拥有同一生命身体、同一 2.5D space 与相同 identity/encounter lineage；绝不创建六个身体或六个 route slide。
- Dimension 切换是 camera/depth/particle/body-response 的 presentation transform；主体不卸载，Canonical item subset 不由 scene 推导。
- 顶部固定进度 `n/6`，中部保持同一生命身体，底部 safe action zone 承载问题、选项与最终动作。任何阶段都不得出现空白屏。

| Dimension | Camera / depth | Particle / body response | Semantic purpose |
|---|---|---|---|
| BODY | 近景，身体占主焦点 | 沿选定区域的一次短 trace | 找到位置/节律 |
| EMOTION | 中近景，身体外层留出 halo | halo 强弱/混合，不映射诊断颜色 | 承认强度与质地 |
| THOUGHT | 前景出现窄平面，身体仍在后景可见 | 粒子流变成一条可读句/片段 | 看见解释语 |
| ACTION | 轻微拉远，场景出现三条可选路径 | 前/后/停三种方向反馈 | 看见 impulse 与 pause |
| MEMORY | 当前身体固定，背景发生轻微时间视差 | 一次回声后回到“现在”锚点 | 区分 then / now |
| GOAL | 回到同一生命核心的稳定中景 | 外围线向核心收拢但不封闭 | 看见被保护价值 |

Reduced Motion 关闭镜头 tween、粒子漂移和呼吸循环；直接呈现每一变换的静态终态。问题、选项、进度、当前选择、尚未保存/已保存、retryability 与最终 Canonical facts 必须与 Motion 完全一致。

## 6. Return / Checkpoint state-action matrix

| Typed branch/state | Truth shown | Primary action | Secondary/safe action | Authority boundary |
|---|---|---|---|---|
| `ATTEMPTED` | `你尝试了这一步。只记录实际发生的部分。` | `确认这次真实回应` | `返回修改` | 只有显式确认调用现有 Fact/Eligibility/Formation path |
| `COMPLETED_AS_INTENDED` | `这一步按原计划发生了。` | `确认这次真实回应` | `返回修改` | 不因选择 radio 自动形成 Fact |
| `CHANGED_RESPONSE` | `你用了不同的回应。` | `确认这次真实回应` | `返回修改` | 不推导“改变成功”；只记录用户确认事实 |
| `NOT_ATTEMPTED`（尚未提交 no-fact command） | `这次还没有尝试；这一步不会形成 Fact 或 Crystal。` | `回到生活，之后再来` | `现在重新确认` | 主动作才提交现有 `NOT_ATTEMPTED`；次动作只回到选项，不写 Authority |
| `NOT_ATTEMPTED`（已 terminal） | `这次没有形成事实；已完成的生命资产仍在。` | `开始下一段现实`（若 fresh-cycle ready） | `回到生命世界` | 不复活旧 Choice；使用 Candidate `7cb8366…` next-cycle controller |
| `USER_REJECTED_RECORD`（尚未提交） | `这次不记录，也不会形成 Fact 或 Crystal。` | `不记录，回到生命世界` | `返回选择` | 主动作提交现有 no-fact command；不保留 raw text |
| `USER_REJECTED_RECORD`（已 terminal） | `这次没有留下记录；你可以安全离开。` | `开始下一段现实`（若 ready） | `回到生命世界` | 不自动重试、不重用旧 Intent |
| `FORMATION_IN_PROGRESS` | `真实回应已保存；Crystal 尚未形成。` | 无主动重复提交；显示进行中 | `回到生命世界`仅在 Authority 允许安全离开时 | 页面不得用 timer 宣布成功 |
| Formation failure / `RETRYABLE` | 显示短、具体原因，不暴露内部码 | `重试形成结晶` | `先回到生命世界` | retryability 完全来自 Authority；重试复用既有 idempotency |
| Formation failure / `NON_RETRYABLE` | `这次暂时不能形成 Crystal；事实仍被保留。` | `回到生命世界` | 无重试 | fail closed；不自动 Fact/Crystal |
| `OWNERSHIP_PRESENTED` | `这道痕迹已属于这次真实行动。` | `开始下一段现实` | `查看 Archive` | 调用现有 post-Ownership proof-bound saga；不传旧 Intent |
| Next-cycle `COORDINATING` | `正在协调下一段现实。` | disabled busy action | `留在这里` | 既有 resolver/inner cause 不变 |
| Next-cycle `RETRY_AVAILABLE` | `下一段现实尚未接上；已有资产都在。` | `重试进入下一段现实` | `查看 Archive` | 只在 Authority=RETRYABLE 时显示 |
| Next-cycle `SAFE_WITHHELD` | `当前还不能开始下一段现实；资产已保留。` | `查看 Archive`或安全返回 | 无假重试 | Admission 不放宽，旧 TERMINAL Intent 不复用 |

任何 checkpoint 都必须有一个可见的主要去向；“调整称呼”永远是可选辅助动作，不能成为唯一剩余动作。

## 7. Whisper 与关系称呼 optional templates

### 7.1 Whisper

在现有 textarea 上方增加非自动选择、非 AI 的 optional chips：

```text
我现在有点紧
我还在想刚才那件事
我想先安静一下
自己写
暂时不说
```

点击例句只填入当前 ephemeral draft；仍需用户点击 `留给它` 才触发现有 Whisper command。`暂时不说` 继续走现有 skip command。例句不作为分析、不会自动选中、不会进入六维 evidence；raw text persistence 继续为 `NONE`。

### 7.2 Relationship naming

在现有命名输入附近提供仅作灵感的 chips：

```text
同行者
小光
守夜星
自己写
暂时不取名
```

chip 只能填入 draft 或关闭命名面板；必须点击 `留下称呼` 才使用现有 naming writer。不得自动选择、自动保存、从 Identity/Whisper/AI 推断或把名称当作下一段现实前提。

## 8. Mobile visual system（390×844 / 320×568）

1. 一个 viewport 只允许一个可见页面标题与一个当前维度标题；重复 eyebrow 必须合并进 `观察 n/6 · 维度`。
2. 根 surface `inline-size: 100%`, `min-inline-size: 0`, `overflow-x: clip`; 所有文本容器 `max-inline-size: 22em`, `overflow-wrap: anywhere`; 禁止依赖 `white-space: nowrap` 保持标题。
3. 当前问题字号 `clamp(18px, 5.1vw, 24px)`，正文 `15–17px`，辅助文字 `13–14px`，line-height `1.5–1.75`；checkpoint 正文不得超过 `24px`，不得由父级 transform 放大。
4. 允许纵向滚动。Returning/checkpoint 使用文档流与 `max-block-size`，不得用绝对定位把巨型卡塞进一屏；内容长度超过可用高度时 body scroll 与 card scroll 只能选一个 owner。
5. 底部 action zone `position: sticky`（在唯一滚动容器内），padding-bottom 至少 `max(16px, env(safe-area-inset-bottom))`；背景提供足够遮罩，不能盖住身体或最后一行正文。
6. 所有 button/chip/radio hit target 最小 `44×44px`；窄屏按单列或 2+1 换行，不用微小下划线文字冒充按钮。
7. Primary/secondary/tertiary 对比明确：primary 实底或高对比描边，secondary 可见描边，pause/exit 仍可辨认但不抢占 primary。
8. 正文对背景目标对比至少 `4.5:1`；大字与非文本控件至少 `3:1`；`:focus-visible` 至少 2px 且不被 overflow 裁掉。
9. 320×568：顶部进度、当前问题和 action zone 必须同屏可达；中间视觉可压缩但不能让主动作离屏且无滚动提示。390×844：生命身体保留主要视觉面积，文本不横向裁切。
10. Motion/Reduced Motion 共享完全相同的 DOM reading order、facts、labels、choices 与 actions。状态变化用 `aria-live="polite"`；saving/busy 使用 `aria-busy`; success 只在 typed success 后宣布。

## 9. Owner / Consumer / CSS inventory（UNKNOWN=0）

| Current owner/consumer | Current role and defect | Future atomic action | Authority impact |
|---|---|---|---|
| `src/components/GravityProductionSurfaceHost.tsx` | 持有 typed six-dimension Authority、调用 acknowledgement | 保持 command owner；只向新 presenter 传既有 readiness/result | `0` |
| `src/pages/GravityPage.tsx` | `NodeProgressionPanel` / `CosmicBotanicsField` 持有通用 local phase、内联 absolute layout、scene layering | 移除通用三次靠近消费；改用 dimension grammar resolver；同一 scene 只做 ephemeral transform | `0` |
| `src/components/XinmaiLifeReflectionGuide.tsx` | 单一 `OBSERVING→FIRST→SECOND→THIRD→CONFIRMED` 造成六维重复；通用“旧保护/新流动” | 收敛为 dimension-specific presenter，最多 1–2 交互 + 唯一 final acknowledgement；保留 readiness/failure contract | `0` |
| `src/services/guanyaoDynamicsExperienceStateAdapter.ts` | 已有逐维 insight/understanding，但被通用流程包裹，部分文案仍解释性强 | 只读 copy source 被新 resolver 消费或替换；不得改 Canonical state | `0` |
| `src/types/dynamicsExperiencePresentation.ts` | 仅有 insight/understanding 字符串 | 可扩展 ephemeral presentation-only grammar type；不得进入 persistence/public Authority | `0` |
| `src/services/guanyaoDynamicsVisualStateAdapter.ts` | 现有视觉 primitive/depth 输入 | 继续为只读视觉输入；dimension transform 不得反写 | `0` |
| `src/components/RealityLifeUniverseCanvas.tsx` 与 existing continuous scene host | 同一生命身体/2.5D owner | 保持单身体；消费 dimension transform plan，Reduced Motion 直接静态终态 | `0` |
| `src/components/XinmaiLivedResponseReturnSurface.tsx` | typed checkpoint consumer；no-fact 分支提交后缺连续主动作 | 按 state/action matrix 展示 primary/secondary；不推导 retry | `0` |
| `src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts` | 正确读取 Authority，但 no-fact terminal 后被外层 baseline 取代，动作语义不足 | 扩展只读 presentation mapping/typed action projection；不改 Fact/Formation | `0` |
| `src/types/xinmaiLivedResponseCheckpointPresentation.ts` | state/action union 未表达 no-fact confirm/terminal 的完整显示分支 | 仅扩 ephemeral presentation union；persisted schema 不变 | `0` |
| `src/pages/LaunchLab.tsx` | Returning host 同时叠放 cosmos、checkpoint、Whisper、name；CSS 内联且 primary action 可消失 | 只消费 resolver；Whisper/name templates 为 optional presentation；改为单滚动/单 action-zone owner | `0` |
| `src/services/xinmaiPostOwnershipNextRealityCyclePresentationResolver.ts` | 已正确映射 coordinating/retry/nonretry | 冻结；只由 checkpoint primary action 消费 | `0` |
| `src/components/XinmaiCrystalFormationOwnershipMoment.tsx` | Ownership 后已有 next-cycle action | 文案/布局接入统一 action zone，controller callback 不变 | `0` |
| `src/services/xinmaiRelationshipNamingPresentationState.ts` / existing naming writer | 正确控制 naming readiness/persistence | 冻结；chips 只写 draft，不绕过确认 | `0` |
| `src/styles/xinmai-life-reflection-refinement.css` | 全局/移动 width 与 Gravity 内联位置交叉覆盖 | 移除旧三次靠近 selectors；并入单一六维 choreography CSS owner | `0` |
| `src/styles/xinmai-inner-view-three-approach.css` | 通用三阶段 motion、translate 与大字叠层根源 | 由六维语法样式替换；旧 selectors 不再匹配 Production | `0` |
| `src/styles/xinmai-lived-response-checkpoint.css` | card 自滚动，与 Returning host 绝对布局竞争 | 收敛为唯一 checkpoint flow/action-zone owner | `0` |
| `src/styles/xinmai-same-life-surface.css` | 多个 `:has`/max-height/overflow 特例 | 删除相互覆盖的 recovered/ownership 特例，保留同生命视觉事实 | `0` |
| `src/styles/xinmai-crystal-formation-ownership-moment.css` | Ownership 自己改变 Returning host 位置与 overflow | 只保留 Ownership component layout；host positioning 交给统一 Returning CSS | `0` |
| `src/styles/xinmai-visual-life-system.css` | 全局字体/颜色再次覆盖 Returning copy | 保留 tokens；移除具体 Returning positioning/typography ownership | `0` |
| `src/main.tsx` | 全局 CSS 顺序使后来 layer 隐式取胜 | 只注册收敛后的明确层序；不以 import order 修 bug | `0` |

## 10. Future atomic Candidate scope

允许且必须同一提交切换：

1. 新的只读 `SixDimensionSemanticChoreographyResolver` 与 ephemeral presentation type/policy。
2. `GravityPage` / `XinmaiLifeReflectionGuide` / existing continuous scene consumer 的差异化 grammar、readiness、ARIA 与 static fallback。
3. `guanyaoDynamicsExperienceStateAdapter` 中直接相关的六维明文 source（不触碰 engine/Authority）。
4. `XinmaiLivedResponseCheckpointPresentationResolver`、presentation-only type、`XinmaiLivedResponseReturnSurface`、`LaunchLab`、`XinmaiCrystalFormationOwnershipMoment` 的 state/action coordination。
5. Whisper/name optional chip presenter（不改 writer/schema）。
6. 收敛后的六维、Returning/checkpoint、Ownership CSS 与明确 import 层序。
7. 直接 Gates：六维每维 grammar 唯一、1–2 interaction 上限、final ACK 唯一、no authority on intermediate action、mobile overflow/44px/action-zone、Return branch action completeness、retryability、Reduced Motion fact parity、counter static fallback、Production bundle hygiene。

明确禁止：Canonical six-dimension controller/store/schema/receipt/Choice V3、Fact/Formation/Crystal/Body、post-Ownership next-cycle controller、Birth/Identity/Relationship/Catalog450、AI/Prompt/Audio/Haptic/Phase4。

## 11. Counter contract

Future Candidate direct child Counter 只改：

```text
XINMAI_VISUAL_SEMANTIC_EXPERIENCE_POLICY = "ENABLED"
                                              ↓
                                            "SAFE_WITHHELD"
```

Safe static presenter：

- 仍逐维显示 `观察 n/6 · 维度`、本维问题、最多三项 response 和唯一 final ACK；
- 关闭 camera tween、particle choreography、transition 和 optional templates 的装饰展开；
- 继续消费现有 Authority readiness/result，允许真实 Canonical acknowledgement；
- Return checkpoint 继续显示完整 typed state 和真实动作；
- 不恢复旧三次靠近、不自动 success、不隐藏 next action、不改变 Authority mutation policy。

## 12. Future acceptance matrix

- 六维六套 question/grammar/observation/final label 逐项唯一；任何维度不出现旧三次靠近或通用“旧保护/新流动”。
- 每维 intermediate interaction 产生 Canonical write `0`；final ACK 成功后该维 `+1`；六维 Receipt/Choice V3 语义不变。
- 0→6 uninterrupted；refresh 1–5 恢复 exact subset 和 pending dimension truthful start。
- Motion/native Reduced Motion facts/actions/result/digest 一致；键盘、TalkBack/VoiceOver reading order 与 visible order 一致。
- `ATTEMPTED / COMPLETED_AS_INTENDED / CHANGED_RESPONSE / NOT_ATTEMPTED / USER_REJECTED_RECORD / formation pending / retryable / nonretryable / ownership complete` 每一状态都有可见主动作或明确等待状态。
- `NOT_ATTEMPTED` 和 `USER_REJECTED_RECORD` 不形成 Fact/Crystal；次动作不写 Authority。
- Ownership 后调用现有 fresh-cycle saga，旧 Intent 不复用，重复周期无回归。
- Whisper/name chips 不自动选择、不自动持久化、Runtime AI dependency `0`。
- 390×844 与 320×568：duplicate headers `0`，horizontal overflow `0`，text crop `0`，44px targets `100%`，主动作始终可达。
- TypeScript / Production Build / full registered XINMAI Gates PASS；Production Fixture/Acceptance/AI authoring executable metadata `0`；runtime errors/warnings `0`。

## 13. Open yellow/red items

### Yellow

1. 截图证明布局风险，但无法单独证明 TalkBack、键盘焦点、native Reduced Motion 与计算后对比度；未来 Candidate 必须用正式浏览器补证。
2. 当前 CSS ownership 跨全局 import、component import 与 LaunchLab inline style；迁移必须删除/失效旧 selector，而不是在文件末尾继续叠加 override。
3. THOUGHT/Whisper 的 ephemeral free text 必须继续满足“no raw private text persistence”；Gate 需验证 draft 不进入 Observation/Receipt/Choice payload。

### Red stop conditions for future application

- 需要新 Store/Schema/Writer、第二六维 state machine、Canonical enum/Receipt/Choice V3 变化；
- 需要修改 Candidate `7cb8366…` 的 repeated-cycle lifecycle semantics；
- 需要用 AI 推导问题/选项/名称，或用 page-local count/animation 证明观察；
- Counter 无法通过单 policy 切到 coherent safe static presenter。

任一命中即停止并重新审计，不得用 CSS/copy 掩盖。

## 14. Exit

```text
AUDIT COMPLETE
NEXT KNIFE RECOMMENDATION:
XINMAI-1.0-SIX-DIMENSION-DIFFERENTIATED-SEMANTIC-CHOREOGRAPHY-
AND-RETURN-CHECKPOINT-CONTINUITY-VISUAL-INTERACTION-
ATOMIC-CONSUMER-CUTOVER-P0

Traffic light: YELLOW / CONSUMER-ONLY ATOMIC APPLICATION
Expected Parent: this docs-only Audit Candidate
Push: HOLD
```

不得在本审计提交后自动施工。
