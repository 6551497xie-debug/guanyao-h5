# XINMAI LIFE WHISPER RELATION ENTRY MAJOR BLADE PREP P0

## 文档定位

- 项目：XINMAI / 星脉之境
- 底层系统：GUANYAO Life Engine / 观爻生命引擎
- 文档编号：`XINMAI-LIFE-WHISPER-RELATION-ENTRY-MAJOR-BLADE-PREP-P0`
- 模式：Life Whisper 进入生命关系层的 Major Blade 施工准备
- 刀型：`Major Blade Prep`
- 当前阶段：Phase 1 → Phase 2
- 当前主线：First Encounter → Life Companion
- 状态：`PREPARED — NOT IMPLEMENTED`
- 审查日期：`2026-07-28`
- 工程影响：无

本协议只冻结 Life Whisper 的唯一入口、关系回应边界、既有 Pressure Seed 消费方式、Reality 迁移策略与后续施工拆分。

本协议：

- 不修改代码；
- 不新增 Engine；
- 不新增 Runtime；
- 不新增数据模型；
- 不改变现有运行链路；
- 不授权自由文本直接驱动 Pressure Seed；
- 不授权新增第二套 Reality；
- 不将文档中的目标状态描述为已实现状态。

---

## 一、Construction State Card

```text
【Construction State Card】

当前版本阶段：
Phase 1 → Phase 2

阶段状态：
MAPPED，进入 Major Blade 设计冻结

当前 A 级主线：
First Encounter → Life Companion

阶段目标：
生命身份建立
↓
生命关系建立

本刀类型：
Major Blade Prep

主影响 Layer：
Layer 3 Relationship

次影响 Layer：
Layer 2 Identity

邻接 Layer：
Layer 4 Growth

是否跨 Phase：
YES

跨 Phase 方式：
只设计 Phase 2 → Phase 3 的桥梁，不提前实施 Phase 3

已有完成资产：
生命坐标
二十八宿生命身份
Genesis 星兽显化
Recognition 同体回应
Genesis → Reality 视觉连续
Reality V2 候选确认链
Pressure Seed 既有消费者

本刀消费者：
First Encounter
StarBeast Response
Relationship Naming
Reality V2
Pressure Seed Candidate Source

是否存在协议冲突：
不存在原则冲突；
存在消费者路径冲突风险

是否需要 Migration Audit：
已有 MAP 证据足以进入 Prep；
真正切换 Reality 前仍需执行原子迁移门禁

本刀是否实施：
NO

决策：
MAP → PREP
```

---

## 二、执行结论

本次准备审查冻结七项结论。

### 2.1 唯一主入口选择 Option A

Life Whisper 的新用户主入口位于：

```text
星兽显现
↓
用户确认“我认出它了”
↓
同一生命主动回应
↓
关系进入稳定区
↓
Life Whisper
↓
星兽第一次接收回应
↓
可选命名
↓
与它一起进入现实
```

更精确地说：

> Life Whisper 插入 Genesis 已有 Recognition 回应完成之后、进入 Reality 之前的关系稳定区。

它不插在星兽尚未被认出时，也不成为一张新的页面。

### 2.2 Option C 作为老用户复用形态

老用户不重新经过 Genesis。

Life Whisper 在老用户生命空间中的位置为：

```text
回到同一生命世界
↓
同一星兽恢复稳态
↓
Life Whisper
↓
新的现实开始靠近
```

Option C 不是第二个系统，也不是另一套输入逻辑。

它只是同一个关系动作在回归场景中的复用。

实施顺序上，必须先通过新用户 Phase 2 验收，再开放老用户复用。

### 2.3 Option B 只保留为过渡语义

“Reality 进入之前”是正确的时间边界，但不能建设为独立页面。

因此 Option B 的处理结论是：

```text
保留其过渡职责
↓
拒绝其独立页面形态
```

Life Whisper 发生在关系阶段末端，并自然打开 Reality 意图。

禁止形成：

```text
Genesis
↓
Life Whisper 功能页
↓
Reality
```

### 2.4 第一次反馈必须来自星兽

用户提交一句生命低语后，第一反馈顺序冻结为：

```text
生命接收
↓
星兽同体回应
↓
关系稳定
↓
用户决定是否继续
```

AI、Pressure Seed、六维、Gravity 都不能抢在星兽前面。

### 2.5 Life Whisper 不直接控制复杂生命状态

原始文本不直接成为：

- 星兽姿态指令；
- 经络阻滞结论；
- Pressure Seed；
- 尘遮；
- 六维结果；
- Gravity 模式。

第一次关系回应只消费“用户已经向生命表达”这一交互事实，不消费文本的心理语义。

### 2.6 Reality 采用 MIGRATE + ISOLATE

既有 `/reality` V2 必须成为唯一生产 Reality 消费入口。

LaunchLab 中仍可直接选择 Pressure Seed 并进入 Dynamics 的旁路，未来不能与 Life Whisper 新路径同时作为生产入口存在。

冻结决策：

```text
保留既有 Pressure Seed 资产
↓
连接正式 Reality V2
↓
迁移生产入口
↓
隔离 LaunchLab 旁路
```

### 2.7 后续不以一把大刀全部施工

真正实施拆分为五把 Major Blade：

1. Life Whisper 入口接入；
2. 星兽第一次回应增强；
3. 关系命名；
4. Pressure Seed Adapter；
5. Reality 链原子迁移。

每把刀必须独立通过停止条件，才能进入下一把。

---

## 三、当前 Runtime 证据

### 3.1 Genesis 已存在真实关系稳定区

当前 `GenesisProductionExperiencePage` 已具有：

```text
RECOGNITION_CONFIRM
↓
同体星兽回应
↓
recognitionResponseSettled
↓
ENTER_REALITY
```

页面已经呈现：

- “我认出它了”；
- “你认出了它。它也回应了你。”；
- “与它一起进入现实”。

因此 Life Whisper 不需要新建页面或新起一条 Genesis 流程。

最小正确插入点已经存在：

> Recognition 回应完成后，进入 Reality 之前。

### 3.2 Genesis 已保持同一生命进入 Reality

现有进入 Reality 的动作继续消费：

- `sourceReferenceId`；
- `visualContinuity`；
- 生命来源；
- 星兽显化结果；
- Recognition continuity；
- Reality entry context。

Life Whisper 不得替换这些身份与连续性资产。

### 3.3 老用户已具备同一生命回归路径

Launch 首页已有：

```text
returningLifeIdentity
↓
returningVisualContinuity
↓
SAME_LIFE_NEW_REALITY
↓
/reality
```

说明老用户 Life Whisper 不需要重新初始化生命身份。

未来只需在同一生命稳态中复用关系动作。

### 3.4 正式 Reality V2 已存在

正式 `/reality` 路由已具有：

```text
Reality Route Authorization
↓
Candidate Activation
↓
Candidate Request
↓
Delivery Orchestration
↓
Production Pressure Host
↓
用户明确认出
↓
Selected Pressure Seed
↓
Dynamics
```

Life Whisper 未来只能连接这条链。

### 3.5 LaunchLab 仍有 Reality 消费旁路

当前 LaunchLab 仍存在：

```text
PRESSURE_SEED_AXIS
↓
候选选择
↓
buildSelectedPressureSeedContext
↓
writeSelectedPressureSeedContext
↓
/dynamics
```

它不是第二个 Pressure Seed Engine，但它是另一条生产消费者路径。

因此本次准备协议的最高工程风险不是重复算法，而是：

> 重复入口与重复因果。

### 3.6 Runtime 证据等级

| 能力 | 状态 | 说明 |
|---|---|---|
| Life Whisper | ○ 仅协议 | 无输入、提交、恢复与消费者 Runtime |
| Genesis Recognition | ✓ 已存在 Runtime | 已有认出、同体回应、稳定后进入 Reality |
| StarBeast Response | ✓ 已存在 Runtime | 已有同一身体与核心的关系回应语法 |
| Relationship Naming | ○ 仅协议 | 无用户关系名 Runtime |
| Pressure Seed | △ 部分存在 | 候选、确认、选择链存在；不消费自由文本 |
| Reality Event | △ 部分存在 | 正式 V2 存在；入口仍有旁路 |
| Six Dimension | △ 部分存在 | 消费 Reality 痕迹，不消费 Life Whisper |
| Reality V2 | ✓ 已存在 Runtime | 应成为唯一生产 Reality 消费入口 |

---

## 四、Q1：Life Whisper 应该出现在哪里

### 4.1 三方案比较

| 方案 | 位置 | 关系价值 | 主要风险 | 结论 |
|---|---|---|---|---|
| A | Genesis 第一次相遇 | 首次表达直接完成关系建立 | 首次流程增加 | `PRIMARY` |
| B | Reality 进入之前 | 现实过渡自然 | 容易新增中间功能页 | `SEMANTIC ONLY` |
| C | 老用户生命空间 | 回访价值高 | 无法解决新用户第一次关系 | `RETURNING VARIANT` |

### 4.2 最终选择

冻结：

```text
主入口：
Option A

回归复用：
Option C

过渡语义：
Option B
```

### 4.3 Option A 的准确位置

不是：

```text
星兽刚出现
↓
立刻要求输入
```

而是：

```text
星兽显现
↓
用户主动认出
↓
生命回应
↓
关系稳住
↓
邀请用户留下一句心声
```

原因：

- 用户已经知道自己在对谁说话；
- 输入不再像资料采集；
- 星兽先有主体性；
- Life Whisper 成为关系动作，而非流程门槛；
- 后续 Reality 有自然来源。

### 4.4 不新建 Screen

Life Whisper 是 First Encounter 内的一次关系动作。

它不能变成：

- 新路由；
- 新卡片流程；
- AI 聊天页；
- Reality 表单页；
- Genesis 结果页。

页面层级保持：

```text
同一星河
同一核心
同一星兽
同一关系空间
```

变化只发生在交互层：

```text
认出
↓
表达
↓
回应
```

### 4.5 是否强制

Life Whisper 应被清晰邀请，但不应成为进入 Reality 的强制门槛。

允许：

- 一句话；
- 一个词；
- 一个情绪；
- 暂时不说。

禁止：

- 未输入便阻断同行；
- 要求完整描述；
- 要求问题分类；
- 要求用户先理解 Pressure Seed；
- 将跳过解释为关系失败。

---

## 五、生命关系链冻结

### 5.1 关系链

```text
用户认出生命
↓
生命先回应认出
↓
用户留下 Life Whisper
↓
生命接收
↓
同一星兽产生第一次低语回应
↓
生命进入新的稳态
↓
用户确认“它听见了”
↓
可选命名
↓
同行
```

### 5.2 用户不是向 AI 输入

前台关系对象必须始终是：

> 我的生命伙伴。

因此禁止出现：

- “向 AI 提问”；
- “描述你的问题”；
- “等待系统分析”；
- “AI 正在思考”；
- 聊天气泡；
- 助手头像；
- Prompt 语言。

### 5.3 第一次 Life Whisper 不立即解释

第一次相遇阶段只完成：

```text
我说出
↓
它听见
↓
关系成立
```

不完成：

```text
我说出
↓
系统解释我
```

AI 四步照见仍属于后续 Reality / Gravity 邻接阶段。

### 5.4 关系确认不是二次确认弹窗

“用户确认关系”不等于新增一个确认按钮。

优先使用：

- 星兽回应完成；
- 新稳态形成；
- 用户主动继续同行。

关系成立应由连续体验证明，而不是由系统声明。

---

## 六、Life Whisper 输入设计

### 6.1 输入定义

Life Whisper 是：

> 用户向自己的生命留下一句此刻真实的表达。

允许表达：

- 事件：“老板今天批评我了。”；
- 情绪：“我真的很累。”；
- 状态：“不知道为什么最近很烦。”；
- 单词：“害怕。”；
- 暂时沉默。

### 6.2 前台语义

推荐：

- “留下一句此刻的心声。”；
- “告诉它，今天发生了什么。”；
- “如果你愿意，可以对它说一句话。”。

禁止：

- “输入问题”；
- “提交分析”；
- “描述症状”；
- “生成结果”；
- “识别压力类型”。

### 6.3 输入形态

后续 Blade 1 应遵守：

- 单一轻量输入；
- 不要求结构化；
- 不展示字段分类；
- 不在输入前提供问题模板矩阵；
- 不制造聊天记录；
- 不展示后台语义；
- 保持星兽为画面主体。

### 6.4 数据边界

本 Prep 不授权新的持久化结构。

在专门的数据生命周期与隐私边界获批前：

- 原始文本只作为当前关系交互的临时输入；
- 不自动写入 Archive；
- 不自动写入人格年轮；
- 不自动成为 Crystal；
- 不自动形成长期 AI 记忆；
- 不与生命身份永久绑定。

如未来需要持久化，必须另行冻结：

- 保存目的；
- 用户可见性；
- 删除能力；
- 生命周期；
- 消费者；
- 敏感信息边界。

---

## 七、星兽第一次回应消费设计

### 7.1 回应目标

第一次回应只证明：

> 它听见了。

它不证明：

- 它理解了全部现实；
- 系统已经识别压力；
- AI 已经得出结论；
- 用户应该如何改变。

### 7.2 合法输入

后续回应消费者只能读取最小关系事实：

```text
稳定生命身份引用
+
当前关系阶段
+
WHISPER_SUBMITTED 交互事实
+
当前星兽稳态
+
Reduced Motion 偏好
```

其中：

- 生命身份决定“是谁在回应”；
- 关系阶段决定“为何回应”；
- 提交事实决定“此刻发生回应”；
- 当前稳态保证连续；
- Reduced Motion 保证可访问性。

### 7.3 非法输入

第一次回应不得读取或推断：

- 文本对应的压力分类；
- 尘遮；
- 人格缺陷；
- 七心经络阻滞；
- 六维评分；
- 情绪强度；
- 风险等级；
- Choice 结果；
- Crystal 候选。

### 7.4 合法输出

第一次回应必须复用现有同体生命语法：

- 核心呼吸略微加深；
- 身体轴产生极小回应；
- 星尘向生命结构轻微聚合；
- 身体方向略微靠近；
- 外层生命场短暂打开；
- 回应后进入略有变化的新稳态。

### 7.5 禁止输出

禁止：

- 生成第二个生命主体；
- 模型替换；
- 大幅变形；
- 宠物动作；
- 点头卖萌；
- 对话气泡；
- 技能反馈；
- 压力特效；
- 奖励光效；
- 回到回应前完全相同的原帧。

### 7.6 为什么不能让文本直接控制星兽

如果原始文本直接控制复杂视觉状态，会产生三项错误：

1. 用户一句话被系统过度解释；
2. 星兽沦为情绪可视化播放器；
3. Pressure Seed、六维与 Gravity 被绕过。

正确边界：

```text
第一次关系阶段：
文本提交事实
↓
通用关系回应

后续 Reality 阶段：
现实候选
↓
用户认出
↓
生命状态回应
```

---

## 八、Pressure Seed 迁移设计

### 8.1 Pressure Seed 不重做

现有 Pressure Seed 继续承担：

> 现实事件候选理解。

它不承担：

- 接收关系；
- 回应 Life Whisper；
- 生成星兽身份；
- 决定用户人格；
- 自动解释自由文本。

### 8.2 正确桥梁

冻结：

```text
Life Whisper
↓
关系接收回应
↓
用户产生“带着这句话进入现实”的意愿
↓
进入正式 Reality V2
↓
既有 Pressure Seed 候选靠近
↓
用户明确认出
↓
Reality Event 成立
```

### 8.3 不授权自动语义映射

当前 Pressure Seed 生产边界不接受自由文本作为因果输入。

因此 Blade 4 的 P0 版本不得：

```text
Life Whisper 文本
↓
自动分类
↓
自动选中 Pressure Seed
```

也不得：

```text
Life Whisper 文本
↓
AI 生成一个新 Pressure Seed
```

### 8.4 Pressure Seed Adapter 的准确职责

未来 Blade 4 的 Adapter 只负责：

- 保持同一 `sourceReferenceId`；
- 标记 Reality 由关系动作自然进入；
- 保持用户原始表达与 Pressure Seed 权威状态分离；
- 启动既有候选发现；
- 保证候选仍需用户认出；
- 保证未确认候选不进入六维与 Gravity。

Adapter 不负责：

- 语义分类；
- 候选生成；
- 自动排序；
- 自动选中；
- AI 推断；
- 新 Pressure Seed 类型；
- 新 Reality Event 模型。

### 8.5 未来文本辅助排序的边界

若未来希望用 Life Whisper 帮助候选排序，必须另行审计。

该能力至少需要回答：

- 谁解析自由文本；
- 解析结果是否可解释；
- 是否只调整候选顺序；
- 如何保证用户可否认；
- 如何避免形成第二个 Pressure Seed Engine；
- 如何满足现有外部语义不作为因果输入的边界；
- 如何处理敏感文本。

在上述问题未冻结前：

> Life Whisper 不能参与 Pressure Seed 的计算、生成、排序与选择。

---

## 九、Reality 入口迁移方案

### 9.1 目标架构

未来唯一生产链：

```text
First Encounter / Returning Life World
↓
Life Whisper（可跳过）
↓
StarBeast Relationship Response
↓
同行意愿
↓
/reality V2
↓
Pressure Seed 候选
↓
用户认出
↓
同一星兽 Reality Response
↓
Six Dimension
↓
Gravity
```

### 9.2 LaunchLab 旧入口决策

结论：

```text
MIGRATE + ISOLATE
```

保留：

- Pressure Seed Matrix；
- 候选数据；
- Scene Binding；
- Selected Pressure Seed Context；
- Dynamics 消费能力；
- 测试夹具需要的非生产入口。

迁移：

- 生产用户入口；
- Seed 选择责任；
- Reality 到 Dynamics 的正式交接。

隔离：

- LaunchLab `PRESSURE_SEED_AXIS` 直接写入并进入 `/dynamics` 的生产可达旁路；
- 任何绕过 `/reality` V2 用户认出的路径；
- 任何 Life Whisper 直接进入 Dynamics 的路径。

### 9.3 为什么不能暂时同时保留

若新入口上线而旧旁路仍可达，会出现：

```text
路径 1：
Life Whisper → Reality V2 → Dynamics

路径 2：
LaunchLab Seed Axis → Dynamics

潜在路径 3：
Life Whisper → 新 Pressure Adapter → Dynamics
```

这会导致：

- Reality 权威入口不唯一；
- Pressure Seed 确认语义不一致；
- 同一用户可能拥有不同的当前现实；
- 测试无法证明真实生产链；
- 后续六维与 Gravity 的来源不可追溯。

### 9.4 原子切换原则

Blade 5 必须在同一提交中完成：

```text
正式关系入口指向 /reality V2
+
LaunchLab 生产旁路隔离
+
唯一入口门禁生效
```

禁止：

- 先上线新路径、以后再清理旧路径；
- 先删除旧路径、再等待新路径可用；
- 用 feature flag 长期保留两个生产真源；
- 让不同用户随机进入不同 Reality。

### 9.5 回滚原则

Blade 5 回滚单位必须是完整切换。

如果门禁不通过：

- 保持现有生产路径；
- 不激活 Life Whisper → Reality 桥梁；
- 不部分隔离旧入口；
- 不留下半迁移状态。

---

## 十、六维空间消费设计

### 10.1 六维不消费原始碎碎念

冻结：

```text
错误：
Life Whisper
↓
Six Dimension 结论
```

正确：

```text
Life Whisper
↓
正式 Reality V2
↓
用户认出的 Pressure Seed
↓
Reality Event
↓
Six Dimension Trace
```

### 10.2 六维的职责不变

六维继续回答：

> 这次现实正在生命哪些层面留下痕迹。

它不是：

- 文本分析；
- 情绪识别；
- 压力分类；
- 人格测评；
- AI 总结。

### 10.3 未确认时不进入六维

以下状态不得启动六维消费者：

- Life Whisper 仅提交；
- 星兽完成第一次关系回应；
- Pressure Seed 候选出现；
- 用户表示“不完全是”；
- 用户尚未认出任何候选。

只有 Reality Event 获得明确用户认出，才能进入六维痕迹。

---

## 十一、新老用户路径

### 11.1 新用户

冻结：

```text
生命钥匙
↓
生命坐标
↓
本命宿回应
↓
星兽显现
↓
用户认出
↓
同一生命回应
↓
Life Whisper（可跳过）
↓
星兽第一次接收回应
↓
可选命名
↓
与它同行
↓
正式 Reality V2
```

用户心理结果：

> 我不是向系统提交了一个问题；我第一次对自己的生命说了一句话，它听见了。

### 11.2 老用户

冻结：

```text
回到生命世界
↓
恢复同一身份与同一星兽
↓
生命天气 / 当前稳态
↓
Life Whisper（可跳过）
↓
同一星兽回应
↓
新的 Reality V2
```

老用户禁止：

- 重新输入出生信息；
- 重新计算二十八宿；
- 重新显化星兽；
- 重新完成 Recognition；
- 自动恢复旧 Pressure Seed 为当前事件；
- 把历史 Life Whisper 当作今天的现实。

### 11.3 新老用户共用什么

共用：

- 同一 Life Whisper 交互语义；
- 同一关系回应语法；
- 同一 Reality V2；
- 同一 Pressure Seed 候选确认边界；
- 同一生命身份。

不共用：

- Genesis 身份生成；
- 第一次认出仪式；
- 首次关系教学节奏。

---

## 十二、关系命名设计边界

### 12.1 命名发生的位置

命名位于：

```text
Life Whisper
↓
星兽回应
↓
关系稳定
↓
可选命名
↓
同行
```

原因：

> 用户先确认“它听见了”，再决定如何称呼这段关系。

### 12.2 双重身份

冻结：

```text
天地之名
+
用户之名
```

天地之名：

- 来自二十八宿；
- 表达生命来源；
- 不可被用户命名覆盖。

用户之名：

- 表达关系；
- 可选；
- 可为空；
- 不改变生命算法。

### 12.3 命名不能阻断同行

允许：

- 现在命名；
- 稍后命名；
- 暂不命名。

禁止：

- 未命名不能进入 Reality；
- 系统自动命名；
- 用命名生成新人格；
- 用名字影响 Pressure Seed；
- 用名字替换本命宿。

---

## 十三、Major Blade 施工拆分

### 13.1 Gate 0：施工前共同门禁

Gate 0 不是功能刀。

它必须在 Blade 1 前记录并锁定：

- Genesis 唯一插入点；
- `/reality` V2 唯一生产目标；
- LaunchLab 旁路的原子迁移计划；
- 当前工作树中的既存改动归属；
- 现有门禁漂移是否与本主线无关；
- 每刀只提交本刀范围。

若权威入口仍不明确：

```text
STOP
```

### 13.2 Blade 1：Life Whisper 入口接入

#### 目标

用户可在关系稳定区向生命留下一句话。

#### 影响层

Layer 3 Relationship。

#### 消费已有资产

- Genesis Recognition；
- 同一星河；
- 同一星兽；
- `recognitionResponseSettled`；
- 进入 Reality 的现有节奏。

#### 允许

- 轻量输入；
- 可跳过；
- 提交事件；
- 当前交互周期内的临时文本；
- Reduced Motion 与键盘可达性。

#### 禁止

- AI 分析；
- Pressure Seed 生成；
- 新路由；
- 新 Engine；
- 长期记忆；
- 星兽复杂状态变化。

#### Definition of Done

用户能够：

```text
认出生命
↓
向它说一句话
```

且第一感受不是聊天、表单或咨询。

达到即停止，不在本刀实现回应增强。

### 13.3 Blade 2：星兽第一次回应增强

#### 目标

Life Whisper 提交后，同一生命明确但克制地回应。

#### 影响层

Layer 3 Relationship，保护 Layer 2 Identity。

#### 消费已有资产

- Genesis 同体回应；
- StarBeast Presence；
- 生命核心；
- 星尘；
- 新稳态节律。

#### 输入

- 稳定身份引用；
- 当前关系阶段；
- `WHISPER_SUBMITTED`；
- 当前稳态；
- Reduced Motion 偏好。

#### 输出

- 呼吸变化；
- 极小方向回应；
- 星尘聚合；
- 回应后的新稳态。

#### 禁止

- 读取文本语义；
- 生成 Pressure Seed；
- 改变身份；
- 角色动画；
- AI 文案抢先出现。

#### Definition of Done

遮住文字，用户仍能感到：

> 它听见了。

且用户仍认得这是刚才同一个生命。

达到即停止，不在本刀实施命名和 Reality 迁移。

### 13.4 Blade 3：关系命名

#### 目标

用户可以为关系赋予一个称呼。

#### 影响层

Layer 3 Relationship。

#### 消费已有资产

- 天地之名；
- 本命宿身份；
- 已成立的第一次回应；
- 生命身份恢复路径。

#### 允许

- 可选用户之名；
- 跳过；
- 显示天地之名与关系名的并存关系；
- 若持久化，则必须以关系资产恢复。

#### 禁止

- 覆盖本命宿；
- 强制命名；
- 自动命名；
- 用名字改变算法；
- 用名字生成第二角色。

#### Definition of Done

用户理解：

```text
它有天地来源
+
我们有自己的称呼
```

未命名用户仍可完整同行。

达到即停止，不在本刀接入 Pressure Seed。

### 13.5 Blade 4：Pressure Seed Adapter

#### 目标

建立 Phase 2 到 Phase 3 的非权威桥梁。

#### 影响层

Layer 3 → Layer 4。

#### 刀型

Major，先离线验证，不立即切生产入口。

#### 消费已有资产

- 同一 `sourceReferenceId`；
- Genesis / returning relationship context；
- Reality route authorization；
- Reality V2 candidate activation；
- 既有 Pressure Seed Candidate Source。

#### Adapter 输出

只允许输出：

- 关系来源标记；
- Reality 进入意愿；
- 既有 Reality V2 启动上下文。

#### 禁止

- 文本语义分类；
- 候选生成；
- 候选自动排序；
- 候选自动选中；
- 写入 Selected Pressure Seed；
- 直接进入 Dynamics；
- 新 Engine。

#### Definition of Done

验证链：

```text
关系阶段完成
↓
正式 Reality V2 可被启动
↓
候选仍来自既有 Source
↓
候选仍需用户认出
```

且新桥梁尚未成为第二个生产入口。

达到即停止，等待 Blade 5 原子切换。

### 13.6 Blade 5：Reality 链迁移

#### 目标

让 `/reality` V2 成为唯一生产 Reality 入口。

#### 影响层

Layer 3 → Layer 4，属于 Migration Cutover。

#### 原子动作

同一提交完成：

1. 关系入口接入 `/reality` V2；
2. 老用户复用同一 Reality V2；
3. LaunchLab 生产旁路隔离；
4. 直接写 Selected Pressure Seed 的旧生产入口不可达；
5. 唯一入口门禁生效；
6. 正式 Reality → Dynamics 仍由用户认出驱动。

#### 禁止

- 两条生产路径并存；
- Life Whisper 直接去 Dynamics；
- 旧 Seed 自动成为当前 Reality；
- 删除 Pressure Seed 底层资产；
- 修改六维模型。

#### Definition of Done

从所有正式入口进入 Reality 时：

```text
同一生命
↓
正式 /reality V2
↓
用户认出候选
↓
同一星兽回应
↓
Dynamics
```

且不存在生产可达的 LaunchLab Seed → Dynamics 旁路。

达到即停止。

---

## 十四、五刀依赖与进入门禁

```text
Gate 0
↓
Blade 1：表达
↓
Blade 2：回应
↓
Blade 3：可选命名
↓
Blade 4：离线桥梁
↓
Blade 5：原子迁移
```

### 14.1 依赖规则

- Blade 2 依赖 Blade 1 的提交事实；
- Blade 3 依赖 Blade 2 的关系稳定；
- Blade 4 不依赖用户必须命名，但依赖关系阶段完成；
- Blade 5 依赖 Blade 4 的离线门禁通过；
- 老用户复用依赖新用户关系动作通过 Phase 2 验收。

### 14.2 禁止并行施工

禁止同时实施：

- Blade 1 与 Blade 4；
- Blade 2 与 Blade 5；
- 新用户入口与老用户复用；
- Reality 切换与 Pressure Seed 语义扩展。

原因：

> 先证明关系，再连接现实；先证明桥梁，再切换权威入口。

### 14.3 每刀回滚单位

每刀必须可独立回滚：

- Blade 1 回滚不影响 Genesis Recognition；
- Blade 2 回滚不影响输入与身份；
- Blade 3 回滚不影响同行；
- Blade 4 回滚不影响正式 Reality；
- Blade 5 整体回滚，不允许半切换。

---

## 十五、消费者映射

| 生产者 | 输出 | 直接消费者 | 不得直接消费 |
|---|---|---|---|
| Genesis Recognition | 已认出的同一生命 | Life Whisper 入口 | Pressure Seed |
| Life Whisper | 原始表达 + 提交事实 | Relationship Response | Six Dimension、Gravity、Crystal |
| Relationship Response | 同体回应 + 新稳态 | 可选命名、同行意愿 | AI 结论 |
| Relationship Naming | 可选关系名 | 生命身份恢复/前台称呼 | 28宿算法、Pressure Seed |
| Pressure Seed Adapter | Reality 启动意愿与来源连续 | `/reality` V2 | Dynamics、Selected Seed 写入 |
| Reality V2 Candidate Source | 既有候选 | 用户认出 | Life Whisper UI |
| 用户认出 | Confirmed Pressure Seed | Reality Event、StarBeast Reality Response | Genesis 身份 |
| Reality Event | 已确认现实影响 | Six Dimension | Life Whisper 关系回应 |
| Six Dimension | 生命痕迹 | Gravity | Pressure Seed 生成 |

### 15.1 权威边界

| 语义 | 权威来源 |
|---|---|
| 我是谁 | 生命坐标 / 二十八宿 / 星兽身份 |
| 我是否向生命表达 | Life Whisper 交互事实 |
| 它是否听见 | StarBeast Relationship Response |
| 现实可能是什么 | Pressure Seed Candidate Source |
| 哪个现实贴近我 | 用户明确认出 |
| 现实留下什么痕迹 | Six Dimension |
| 是否形成重复保护方式 | Gravity |
| 是否产生新回应 | Choice |
| 是否留下成长印记 | Crystal |

任何消费者不得越过自己的权威边界。

---

## 十六、资产保护清单

### 16.1 Layer 1 World

必须保持：

- 动态星河景深；
- 黑曜空间；
- 星尘层次；
- 东方简素；
- Reality 共同空间。

禁止为输入框制造普通 App 页面感。

### 16.2 Layer 2 Identity

必须保持：

- 生命钥匙；
- 生命坐标；
- 二十八宿；
- 天地之名；
- 同一生命核心；
- 同一星兽身体；
- Genesis → Reality 视觉连续。

### 16.3 Layer 3 Relationship

必须保持并增强：

- First Encounter；
- Recognition；
- 同体回应；
- 用户主动表达；
- 可选命名；
- 同行。

### 16.4 Layer 4 Growth

必须保持：

- Pressure Seed Matrix；
- Reality V2 候选；
- 用户明确认出；
- Six Dimension；
- Gravity；
- Choice；
- Crystal。

本主线不扩张它们，只连接正确入口。

### 16.5 不能因迁移删除的底层资产

隔离旧入口不等于删除：

- Pressure Seed 数据；
- Scene Binding；
- Selected Context；
- Dynamics；
- 测试夹具；
- 既有验证脚本。

迁移的是生产责任，不是底层资产。

---

## 十七、风险登记

### R1：形成第三条 Reality

风险：

Life Whisper 单独生成 Pressure Seed 或直接进入 Dynamics。

控制：

- Blade 4 只做非权威桥梁；
- Blade 5 原子切换；
- `/reality` V2 唯一入口门禁。

### R2：AI 抢走第一次关系

风险：

用户刚表达，立即出现解释。

控制：

- 第一次反馈只来自星兽；
- AI 后置；
- Phase 2 不输出分析。

### R3：原始文本过度驱动生命

风险：

一句话直接改变复杂星兽状态。

控制：

- 第一次回应只消费提交事实；
- Reality 状态必须经过候选与用户认出。

### R4：首次流程变长

风险：

Life Whisper 与命名成为必填步骤。

控制：

- Life Whisper 可跳过；
- 命名可跳过；
- 不新增 Screen；
- 每一步只承担一个关系动作。

### R5：星兽变成宠物

风险：

回应被设计成拟人表演。

控制：

- 同体呼吸、方向与星尘语法；
- 无眼神、卖萌、对话气泡；
- 回应克制并进入新稳态。

### R6：身份被关系名覆盖

风险：

用户命名替换二十八宿身份。

控制：

- 天地之名与用户之名双轨；
- 关系名不进入身份算法。

### R7：旧现实重新成为当前现实

风险：

回归用户的历史 Pressure Seed 自动恢复。

控制：

- 历史只作记忆；
- 新 Reality 仍需候选与认出；
- Life Whisper 不读取旧 Seed 作为当前结论。

### R8：敏感文本未经同意长期保存

风险：

Life Whisper 原声进入 Archive 或 AI 记忆。

控制：

- P0 默认临时；
- 持久化另行审计；
- 不自动生成 Crystal。

### R9：局部代码覆盖既存脏工作树

风险：

当前仓库已有多项未提交修改。

控制：

- 每刀只暂存明确文件；
- 禁止批量 add；
- 提交前检查 staged 文件清单；
- 不回滚用户既有修改。

### R10：门禁漂移误判为本刀失败

风险：

既存验证脚本与当前 Runtime 漂移混入新刀。

控制：

- Gate 0 先记录基线；
- 新增失败与既存失败分开报告；
- 不借本刀顺手修复无关门禁。

---

## 十八、Stage Fit Check

### 18.1 用户参与

目标：

```text
YES
```

证据目标：

用户第一次主动向生命表达，而不是只观看显化。

### 18.2 世界回应

目标：

```text
YES
```

证据目标：

同一星兽通过身体、核心与星尘做出克制回应。

### 18.3 生命关系

目标：

```text
YES
```

证据目标：

用户感到“它听见了”，并愿意继续同行。

### 18.4 是否提前进入 Phase 3

```text
NO
```

Phase 2 只建立表达与回应。

Pressure Seed Adapter 只在 Blade 4 设计桥梁，Reality 理解仍由 Phase 3 完成。

### 18.5 是否提前进入 Phase 4

```text
NO
```

本主线不生成：

- Choice；
- Crystal；
- Archive；
- 年轮；
- 成长奖励。

### 18.6 当前决策

```text
Major Blade Prep：
COMPLETE

Implementation：
NOT AUTHORIZED BY THIS DOCUMENT

后续进入：
Blade 1 — Life Whisper Entry
```

---

## 十九、后续施工前必须回答

每把 Major Blade 开始前必须输出：

```text
【Construction State Card】

当前 Phase：

当前主线：

本刀类型：

主影响 Layer：

次影响 Layer：

已有消费者：

新增消费者：

权威输入：

权威输出：

是否形成第二条链：

是否影响已有资产：

回滚单位：

Definition of Done：

决策：
NOW / MAP / DEFER / REJECT
```

没有状态卡，不进入实施。

---

## 二十、验收四问

每把后续刀必须回答：

### 1. 用户有没有参与？

Blade 1 起必须为 `YES`。

### 2. 世界有没有回应？

Blade 2 起必须为 `YES`。

### 3. 生命有没有变化？

只允许关系层的新稳态，不允许提前生成成长结论。

### 4. 用户有没有留下痕迹？

Phase 2 的痕迹是关系事实或可选关系名。

它不是 Crystal。

---

## 二十一、最终冻结

Life Whisper 的正确入口不是新的功能页。

它发生在：

```text
我认出它
↓
它回应我
↓
我向它说一句话
↓
它听见
↓
我们继续同行
```

新用户以 Genesis 关系稳定区为主入口。

老用户在同一生命世界中复用这个关系动作。

Reality 前不新增独立输入页面。

Life Whisper 不直接控制星兽复杂状态，不直接生成 Pressure Seed，不直接产生六维结论。

正式现实链最终统一为：

```text
用户的一句话
↓
同一生命接收
↓
关系成立
↓
正式 Reality V2
↓
既有 Pressure Seed 候选
↓
用户认出
↓
已有生命引擎继续运行
```

LaunchLab 旧 Seed → Dynamics 生产旁路采用：

```text
MIGRATE + ISOLATE
```

并在 Blade 5 中原子切换。

本协议唯一目标已经完成：

> 在不新增第二套现实系统的前提下，为“用户的一句话进入已有生命引擎，并建立第一次关系”冻结唯一、可分步、可回滚的施工路径。
