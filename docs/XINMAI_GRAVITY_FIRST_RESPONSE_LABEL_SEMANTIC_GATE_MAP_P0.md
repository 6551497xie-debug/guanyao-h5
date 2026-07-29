# XINMAI Gravity First Response Label Semantic Gate Map P0

任务编号：

```text
XINMAI-GRAVITY-FIRST-RESPONSE-LABEL-SEMANTIC-GATE-MAP-P0
```

项目：

```text
/Users/xieyanjun/Desktop/guanyao-h5
```

刀型：

```text
MAP / Consumer & Semantic Gate Review
```

交通灯：

```text
YELLOW
```

决策：

```text
NOW — MAP ONLY
```

生效日期：

```text
2026-07-29
```

Runtime 修改：

```text
0
```

Gate 修改：

```text
0
```

文案修改：

```text
0
```

---

# 一、Construction State Card

```text
Phase 1：
CLOSED

Phase 2：
CLOSED / MAINTENANCE

Phase 3：
ACTIVE / NOT PASSED

Phase 3 A级主线：
Reality Adventure

Phase 4：
LOCKED

本刀主 Layer：
Layer 4 | Growth

保护 Layer：
Layer 3 | Relationship

本刀类型：
MAP / Consumer & Semantic Gate Review

是否改变状态权威：
NO

是否新增消费者：
NO

是否修改 Runtime：
NO

是否修改 Gate：
NO

是否修改文案：
NO

决策：
NOW — MAP ONLY
```

---

# 二、本刀唯一目标

本刀查明：

> `firstResponseLabel` 当前究竟代表什么、由谁生产、谁在消费、门禁应该保护什么，并裁决它属于历史 Gate、消费者漂移、尚未冻结的产品语义，还是双权威风险。

本刀不得：

- 修改 Runtime；
- 修改 Gate；
- 修改文案；
- 修改类型；
- 修改 Validator；
- 修改 Adapter；
- 修改 Gravity Page；
- 修改 Typed Surface Outcome；
- 接入 Six Dimension；
- 接入 AI Reflection；
- 接入 Choice；
- 接入 Crystal；
- 修改 Phase 状态；
- 反向重新锁住 Phase 3。

---

# 三、审计基线

远程分支：

```text
codex/genesis-28-mansion-production-continuity
```

审计基线：

```text
e6e4c989f37f4a2792800a573b67cd5d4472bbc7
```

总控阶段状态：

```text
Phase 3：
ACTIVE / NOT PASSED
```

证据类型：

```text
S：
当前源码结构

H：
Git 历史与 blame

A：
当前自动门禁

P：
既有产品协议

R：
远程干净基线
```

本 MAP 不使用文档声明替代 Runtime 事实。

---

# 四、必须区分的四类事实

`firstResponseLabel` 不能继续与以下事实混为一体。

## 4.1 Gravity 是否正式启动

当前唯一权威：

```text
Gravity Entry Admission Controller
```

正式状态：

```text
ACTIVE_IN_GRAVITY
```

成立条件：

```text
同一 Gravity Admission Attempt
+
真实 Life Surface Outcome
+
真实 Observation Surface Outcome
+
Host Typed Admission Transaction
+
Controller 校验并提交
```

`firstResponseLabel`：

```text
不参与
```

---

## 4.2 Gravity 第一次真实可观察反馈是否成立

当前正式表面事实：

```text
GravityObservationSurfaceOutcome
```

成功状态：

```text
GRAVITY_OBSERVATION_SURFACE_PRESENTED
```

Motion：

```text
MOTION_FIRST_GRAVITY_OBSERVATION
```

Reduced Motion：

```text
STATIC_FIRST_GRAVITY_OBSERVATION
```

同时要求：

```text
currentRealityTraceVisible = true

firstObservationAffordanceAvailable = true
```

该 Typed Outcome 由真实观察表面在 React commit 后产生。

`firstResponseLabel`：

```text
不参与
```

---

## 4.3 页面应该显示什么

页面文案属于：

```text
Presentation Intent
```

它可以由当前 typed semantic state 映射。

它不能反向决定：

- Gravity 是否启动；
- Surface 是否真实呈现；
- Admission 是否成功；
- Controller 是否提交 Active；
- 用户是否已经理解保护方式。

`firstResponseLabel` 的历史职责属于本层。

---

## 4.4 门禁是否仍断言旧文案或旧源码

当前失败门禁：

```text
scripts/check-gravity-change-experience-routing.mjs
```

仍要求 Gravity Page 包含：

```text
presentation?.recognition.firstResponseLabel
??
CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL
```

该表达式已不在当前 Gravity Page。

它不是：

- 当前状态机；
- 当前 Outcome；
- 当前 Host 事务；
- 当前用户路径。

它只是历史源码形态断言。

---

# 五、字段定义与当前来源

## 5.1 类型定义

位置：

```text
src/types/changeExperience.ts
```

字段：

```text
ChangeExperiencePresentationRecognition.firstResponseLabel: string
```

类型层级：

```text
ChangeExperiencePresentation
↓
recognition
↓
firstResponseLabel
```

它不属于：

- `GravityEntryAdmission`；
- `GravitySurfaceAdmissionAttempt`；
- `GravityObservationSurfaceOutcome`；
- `GravityHostAcceptanceOutcome`；
- `RealityEncounterIntent`；
- `SelectedPressureSeedContext`。

---

## 5.2 唯一 Runtime 写入

位置：

```text
src/services/changeExperiencePresentationAdapter.ts
```

常量：

```text
CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL
```

值：

```text
这一刻首先出现的回应
```

Adapter 写入：

```text
recognition: {
  firstResponseLabel:
    CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL
}
```

结论：

```text
硬编码 Presentation Copy
```

不是：

- Runtime 状态推导；
- Typed Outcome 映射；
- Gravity Admission 结果；
- Pressure Seed 结果；
- 用户输入；
- AI 输出。

---

## 5.3 是否存在默认值

存在。

所有通过 `adaptChangeExperiencePresentation()` 创建的 Presentation 都获得同一个常量值。

它不随以下内容变化：

- 用户身份；
- 二十八宿；
- Pressure Seed；
- 六维；
- Gravity 状态；
- Motion / Reduced Motion；
- Admission Outcome；
- 当前 Reality；
- 用户回应。

因此：

```text
它是静态标题，不是生命状态。
```

---

## 5.4 Fixture 生产

位置：

```text
src/services/fixtures/changeExperiencePresentationFixtures.ts
```

六类 Change Experience Presentation 全部通过同一 Adapter 生成：

- Body；
- Emotion；
- Thought；
- Action；
- Memory；
- Motivation。

六类 Presentation 的 `firstResponseLabel` 完全相同。

这进一步证明：

```text
它没有表达用户当前 Gravity Outcome。
```

---

# 六、历史来源

## 6.1 首次引入

提交：

```text
7fc24a851174e56480d5cc761a51681fd3ba595f
```

提交信息：

```text
feat(gravity): align first response language
```

该提交同时：

1. 新增类型字段；
2. 新增硬编码常量；
3. 由 Adapter 写入；
4. Validator 要求字段非空；
5. Gravity Page 读取字段；
6. Gate 冻结页面读取方式；
7. Gate 冻结精确中文文案。

---

## 6.2 历史页面消费

历史 `SingleModelRevisionActionFocus` 使用：

```text
const firstResponseLabel =
  presentation?.recognition.firstResponseLabel
  ?? CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL
```

并拼接：

```text
`${firstResponseLabel}：${oldReaction}`
```

它展示的内容是：

```text
这一刻首先出现的回应：
<oldReaction>
```

因此历史语义是：

> 为“旧反应 / 熟悉反应”提供一个较克制的页面标题。

它没有读取：

- Gravity Admission；
- Gravity Runtime Outcome；
- Surface Outcome；
- Host Outcome；
- Pressure Presentation；
- 用户首次响应事件。

---

## 6.3 历史消费者移除

提交：

```text
3c60e7e20f8eb307f33eeee222f4d4eedbc9158e
```

提交信息：

```text
feat: reveal gravity as repeated life response
```

该提交把 Gravity 从旧卡片式修正动作重构为：

- 同一生命星河；
- 六维观察入口；
- 重复回应；
- 保护方式；
- 生命惯性；
- 同体回应空间。

同时删除：

- `CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL` 的页面 import；
- `firstResponseLabel` 的页面读取；
- `recognitionLine`；
- 旧卡片式“熟悉反应”区块。

但没有同步删除：

- 类型字段；
- Adapter 常量；
- Adapter 写入；
- Validator 必填；
- Presentation 单元门禁；
- Gravity Routing 的旧源码断言。

结论：

```text
页面消费者已迁移
兼容数据字段仍存
历史 Gate 未同步
```

---

# 七、它是否来自旧 V1 Consumer

正式 V1 Consumer：

```text
src/services/realityProductionGravityConsumer.ts
```

当前状态：

```text
DORMANT CONTRACT
```

该 Consumer 消费：

- confirmed Pressure Session；
- Gravity UI Runtime；
- observation confirmation。

该 Consumer 不包含：

```text
firstResponseLabel
```

也不包含：

```text
CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL
```

裁决：

```text
NOT FROM V1 CONSUMER
```

历史来源更准确地说是：

```text
旧 Dynamics / Gravity Change Experience Presentation Card
```

而不是：

```text
RealityProductionGravityConsumer V1
```

---

# 八、它是否来自 Pressure Presentation

当前 Pressure Presentation：

- 不生成该字段；
- 不读取该字段；
- 不导入该常量；
- 不消费 Change Experience Presentation；
- 不用该字段决定 `gravityReadiness`；
- 不用该字段触发 Body Approach；
- 不用该字段建立 Gravity Transfer。

裁决：

```text
PRESSURE PRESENTATION RELATION：
NONE
```

---

# 九、它是否读取 Gravity Runtime Outcome

Adapter 输入：

```text
personaExperience
+
changeExperience
```

不包含：

- `GravitySurfaceAdmissionAttempt`；
- `GravityLifeSurfaceOutcome`；
- `GravityObservationSurfaceOutcome`；
- `GravitySurfaceAdmissionTransaction`；
- `GravityHostAcceptanceOutcome`；
- `GravityEntryAdmission`。

字段值由常量直接写入。

裁决：

```text
READS TYPED GRAVITY OUTCOME：
NO
```

---

# 十、当前生产者与消费者清单

|位置|角色|当前状态|是否是产品权威|
|-|-|-|-|
|`ChangeExperiencePresentationRecognition`|字段声明|存在|否|
|`CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL`|静态文案常量|存在|否|
|`adaptChangeExperiencePresentation`|字段写入|存在|否|
|六类 Presentation Fixtures|静态对象生产|存在|否|
|`changeExperienceRuntimeRoutingService`|携带整个 Presentation|存在|否|
|`guanyaoDynamicsChangeExperienceRuntimeAdapter`|把 Presentation 交给 Gravity Page|存在|否|
|`GravityPage`|只判断 Presentation 是否存在|存在|不读取字段|
|`ChangeExperiencePresentationValidator`|要求字段非空|存在|兼容数据校验|
|`check-change-experience-presentation`|冻结精确值与必填|存在|历史 Presentation Gate|
|`check-gravity-change-experience-routing`|要求页面直接读取字段|失败|陈旧源码 Gate|
|`RealityProductionGravityConsumer`|正式 V1 合同|Dormant|不读取字段|
|`RealityGravityInertiaField`|Typed Observation Outcome 生产者|生产使用|是表面事实生产者|
|`GravityProductionSurfaceHost`|聚合 Typed Surface Outcome|生产使用|是 Host Outcome 生产者|
|`GravityEntryAdmissionController`|提交 `ACTIVE_IN_GRAVITY`|生产使用|是阶段状态权威|

---

# 十一、当前直接 Runtime 消费者

针对字段值本身：

```text
Production UI Consumer：
0

Gravity Engine Consumer：
0

Admission Consumer：
0

Route Consumer：
0

Recovery Consumer：
0

Pressure Consumer：
0

Choice Consumer：
0

Crystal Consumer：
0

Renderer Consumer：
0
```

当前只有：

```text
Validator
+
Automated Gate
```

观察该字段。

`GravityPage` 接收包含该字段的 Presentation 对象，但只执行：

```text
Boolean(presentation)
```

这不是字段消费。

---

# 十二、正式产品语义裁决

候选语义：

```text
A. Gravity 尚未开始
B. Gravity 正在形成第一次回应
C. Gravity 已经给出第一次可观察反馈
D. 普通页面展示文案
E. 已废弃语义
```

## 12.1 历史语义

历史裁决：

```text
D. 普通页面展示文案
```

具体是：

> “旧反应 / 熟悉反应”正文前的静态标题。

它不曾拥有 Gravity 状态权威。

---

## 12.2 当前语义

当前生产 Gravity Page 已移除该展示区。

字段没有正式 Runtime 消费者。

因此当前裁决：

```text
E. 已废弃语义
```

更精确状态：

```text
DORMANT LEGACY PRESENTATION COPY
```

---

## 12.3 明确否决

```text
A：
REJECT
```

Gravity 是否尚未开始由 Admission 状态决定。

```text
B：
REJECT
```

字段是静态常量，不表达形成过程。

```text
C：
REJECT
```

第一次真实可观察反馈由 Typed Observation Outcome 证明。

---

# 十三、Typed Outcome 权威映射

当前正式因果：

```text
Gravity Admission Attempt
↓
同一生命表面真实呈现
↓
GravityLifeSurfaceOutcome
↓
第一次观察表面真实呈现
↓
GravityObservationSurfaceOutcome
↓
Host 组装 GravitySurfaceAdmissionTransaction
↓
GRAVITY_MINIMUM_PRESENTED
↓
Controller
↓
ACTIVE_IN_GRAVITY
```

其中：

## 阶段权威

```text
GravityEntryAdmissionController
```

回答：

> Gravity 是否正式 Active。

## 表面事实

```text
GravityObservationSurfaceOutcome
```

回答：

> 第一次 Gravity 观察表面是否真实可见、当前现实痕迹是否存在、用户是否可以开始观察。

## Presentation Intent

由页面根据 typed semantic state 映射。

回答：

> 此刻如何用克制语言邀请用户观察。

## `firstResponseLabel`

```text
不属于上述任何权威链。
```

---

# 十四、合法消费者

如果未来需要“第一次 Gravity 观察”的展示语义，合法消费者可以是：

- Gravity Presentation；
- 无障碍状态播报；
- Presentation 层结构门禁；
- 产品分析事件的只读镜像。

但它们必须消费：

```text
Typed Gravity Semantic State
```

例如：

```text
GRAVITY_OBSERVATION_SURFACE_PRESENTED
+
MOTION_FIRST_GRAVITY_OBSERVATION
```

或：

```text
GRAVITY_OBSERVATION_SURFACE_PRESENTED
+
STATIC_FIRST_GRAVITY_OBSERVATION
```

它们不得消费：

- DOM 节点存在；
- `data-*`；
- 固定计时器；
- Pressure Seed 存在性；
- 静态文案字段；
- 旧 V1 Consumer；
- 测试门禁。

---

# 十五、禁止消费者

以下对象不得读取 `firstResponseLabel` 来决定业务事实：

```text
Gravity Engine
Gravity Admission Controller
Route Authorization
Recovery Adapter
Pressure Seed
Reality Candidate Source
Choice
Crystal
Archive Growth
Renderer State
Phase 3 Entry Gate
```

特别冻结：

```text
firstResponseLabel 存在
≠
Gravity 已启动
```

```text
firstResponseLabel 被展示
≠
第一次真实观察已经呈现
```

```text
firstResponseLabel 缺失
≠
Gravity Runtime 失败
```

---

# 十六、当前 Gate 使用位置

## 16.1 Change Experience Presentation Gate

位置：

```text
scripts/check-change-experience-presentation.mjs
```

当前保护：

- 六类 Presentation 均包含精确标题；
- 标题必须是：

```text
这一刻首先出现的回应
```

- 字段为空时 Validator 返回：

```text
RECOGNITION_INCOMPLETE
```

本轮结果：

```text
PASS
```

当前性质：

```text
LEGACY PRESENTATION CONTRACT
```

它不是 Gravity Stage Gate。

---

## 16.2 Gravity Change Experience Routing Gate

位置：

```text
scripts/check-gravity-change-experience-routing.mjs
```

当前要求 Gravity Page 包含历史消费表达式。

本轮结果：

```text
FAIL
```

唯一失败：

```text
gravity consumes formal first response label
```

其余：

- 六维路由；
- Smoke Fixture；
- Runtime Adapter；
- Presentation Routing；
- 类型归属；
- Mother / Persona 输入；

均先通过。

当前性质：

```text
STALE SOURCE-SHAPE ASSERTION
```

---

## 16.3 Release Gate 影响

`check:release` 当前包含：

```text
check:change-experience-presentation
+
check:gravity-change-experience-routing
```

因此陈旧 Routing Gate 会阻断 Release Gate。

但它不证明：

- 当前 Gravity 入口失败；
- 当前 Typed Outcome 失败；
- 当前用户路径失败；
- Phase 3 应重新锁定。

---

# 十七、现有 Typed Outcome 门禁

本轮执行：

```text
check-xinmai-gravity-surface-outcome-admission
```

结果：

```text
PASS
```

已保护：

- 同一生命 Canvas 的 Motion Outcome；
- 同一生命 Canvas 的 Static Outcome；
- Observation Motion Outcome；
- Reduced Motion Static Outcome；
- Outcome 在真实表面 commit 后产生；
- Host 聚合 Typed Outcome；
- Watchdog 只报告失败；
- Transaction 校验周期与 revision。

同时执行：

```text
check-reality-production-gravity-consumer
```

结果：

```text
PASS
```

已证明：

- V1 Consumer 保持 Dormant；
- Production Host 不激活 V1；
- 新 Gravity Authority 是唯一 Controller；
- Pressure Recognition 不直接激活 Gravity。

同时执行：

```text
check-reality-production-gravity-host
```

结果：

```text
PASS
```

已证明：

- Host 消费 Typed Route Admission；
- Host 需要两类 Typed Surface Outcome；
- Watchdog 不提交成功；
- Host 不拥有导航或存储；
- Host 不执行 Pressure、Choice 或 Crystal。

---

# 十八、Gate 应保护什么

Gate 不应继续保护：

```text
某句固定文案
```

也不应继续保护：

```text
GravityPage 必须出现某个历史源码表达式
```

更合理的 Gate 目标：

```text
当前 Typed Gravity State
↓
只能映射到 Presentation Intent
↓
不伪造 Gravity Outcome
↓
不提前宣称第一次观察已经成立
↓
不拥有 Admission 或 Active 权威
```

具体应保护：

1. Gravity Page 不读取 `firstResponseLabel` 作为阶段权威；
2. Gravity Page 不硬编码该历史标题；
3. 第一次观察由 `GravityObservationSurfaceOutcome` 证明；
4. Motion 与 Reduced Motion 都有 Typed Outcome；
5. Host 只在两类 Surface Outcome 成立后报告 minimum presented；
6. Controller 仍是唯一 `ACTIVE_IN_GRAVITY` 权威；
7. DOM 与 `data-*` 不成为运行输入；
8. Watchdog 只报告失败；
9. Pressure Seed 不冒充 Gravity Outcome；
10. Choice 与 Crystal 不提前消费。

---

# 十九、A / B / C / D 分类

## A｜陈旧 Gate

条件：

```text
字段无正式 Runtime 消费者
产品语义已由新的 Typed Outcome 边界取代
```

当前证据：

- 页面消费者已在 `3c60e7e` 删除；
- 当前 `GravityPage` 不读取字段；
- 正式 V1 Consumer 不读取字段；
- Pressure Presentation 不读取字段；
- Typed Surface Outcome 不读取字段；
- 只有 Validator 与 Gate 仍观察字段；
- 失败门禁要求已删除的源码形态。

裁决：

```text
MATCH
```

---

## B｜消费者漂移

该分类要求：

```text
字段语义仍有效
但生产者或消费者迁移
```

当前字段的产品语义已经退役。

虽然页面消费者确实发生迁移，但正式新消费者不应继续消费该字段，而应消费 Typed Semantic State。

裁决：

```text
NOT SELECTED
```

---

## C｜产品语义缺口

当前已经存在：

```text
GravityObservationSurfaceOutcome
```

它正式表达第一次可观察表面。

当前不存在必须由 `firstResponseLabel` 补齐的状态事实。

裁决：

```text
NOT FOUND
```

如果未来需要新的“生命第一次回应内容”事实，必须另行 MAP，不能复活该静态标题作为状态。

---

## D｜双权威风险

当前：

```text
firstResponseLabel
不参与 Admission
不参与 Host Outcome
不参与 Controller Active
```

不存在它与 Typed Outcome 同时决定阶段成功的路径。

裁决：

```text
NO
```

---

# 二十、最终分类

正式裁决：

```text
A. 陈旧 Gate
```

字段产品语义：

```text
历史：
D. 普通页面展示文案

当前：
E. 已废弃语义
```

当前字段状态：

```text
DORMANT LEGACY PRESENTATION COPY
```

当前生产消费者：

```text
0
```

当前权威冲突：

```text
0
```

后续方向：

```text
CALIBRATE GATE
```

不是：

```text
ADD RUNTIME
```

---

# 二十一、兼容字段处置边界

本 MAP 不授权立即删除：

- `firstResponseLabel` 类型字段；
- `CHANGE_EXPERIENCE_FIRST_RESPONSE_LABEL`；
- Adapter 写入；
- Validator 必填；
- Fixture 字段；
- Legacy Presentation Contract。

原因：

删除这些内容会改变：

- Presentation 数据契约；
- Validator 合法性；
- Fixture 结构；
- 单元门禁；
- 潜在离线消费者。

这不再是单纯 Gate Correction。

正式处置：

```text
DEFER
```

如果未来需要删除兼容字段，应独立进入：

```text
Consumer Inventory
↓
Data Contract Review
↓
Major Correction 或 Migration 判断
```

不得吞入下一张绿色 Gate 刀。

---

# 二十二、对 Reality Adventure 的影响

本 MAP 不改变 Reality Adventure 主线：

```text
当前 Reality
↓
用户确认的 Pressure
↓
用户明确 Body Approach
↓
Gravity Admission
↓
真实同体表面
↓
第一次可观察反馈
↓
看见生命如何被牵引
```

影响裁决：

```text
Phase 3 Entry：
NO IMPACT

Reality Intent：
NO IMPACT

Pressure Recognition：
NO IMPACT

Gravity Admission：
NO IMPACT

Typed Surface Outcome：
NO IMPACT

ACTIVE_IN_GRAVITY：
NO IMPACT
```

因此：

```text
Phase 3 保持 ACTIVE
```

---

# 二十三、资产保护

## World

未修改：

- 黑曜生命空间；
- 动态星河；
- 同体 Reality / Gravity 空间；
- Motion / Static 表面。

## Identity

未修改：

- 二十八宿；
- 天地之名；
- StarBeast Identity；
- `sourceReferenceId`；
- 三项身份引用。

## Relationship

未修改：

- Recognition；
- Life Whisper；
- StarBeast Response；
- Relationship Naming；
- Reality Encounter Intent。

## Growth

未修改：

- Pressure Seed；
- Reality Recognition；
- Body Approach；
- Gravity Transfer；
- Gravity Admission；
- Typed Surface Outcome；
- Six Dimension；
- AI Reflection；
- Choice；
- Crystal。

---

# 二十四、Definition of Done

本 MAP 完成标准：

|问题|答案|
|-|-|
|字段定义在哪里|`src/types/changeExperience.ts`|
|首次写入在哪里|`changeExperiencePresentationAdapter.ts`|
|是否有默认值|是，单一硬编码常量|
|是否来自 V1 Consumer|否|
|是否来自 Pressure Presentation|否|
|是否读取 Gravity Outcome|否|
|是否是硬编码文案|是|
|是否有生产字段消费者|否|
|当前谁观察它|Validator 与 Gate|
|历史产品语义|普通页面标题|
|当前产品语义|已废弃 / Dormant|
|Gravity 启动权威|Gravity Entry Admission Controller|
|首次观察表面权威|GravityObservationSurfaceOutcome|
|是否存在双权威|否|
|A/B/C/D 分类|A｜陈旧 Gate|
|下一刀|绿色 Gate Correction|
|Phase 3 影响|无，保持 ACTIVE|

完成裁决：

```text
PASS
```

---

# 二十五、刀后交通灯扫描

## GREEN

```text
XINMAI-GRAVITY-FIRST-RESPONSE-LABEL-SEMANTIC-GATE-CORRECTION-P0
```

允许：

- 只校准 `check-gravity-change-experience-routing`；
- 删除“页面必须读取 firstResponseLabel”的陈旧断言；
- 增加“页面不得用 firstResponseLabel 决定状态”的负向断言；
- 增加 Typed Gravity Observation Outcome 的结构保护；
- 保持 Motion / Static；
- 保持 Controller 唯一 Active；
- 保持 Watchdog failure-only。

## YELLOW

兼容字段完整删除：

```text
DEFER / SEPARATE DATA CONTRACT REVIEW
```

原因：

- 涉及类型；
- 涉及 Adapter；
- 涉及 Validator；
- 涉及 Fixture；
- 超出绿色门禁刀。

## RED

```text
第二 Gravity Authority：
0

新旧 Runtime 双路径：
0

Migration Required：
NO
```

---

# 二十六、最终状态

```text
Phase 1：
CLOSED

Phase 2：
CLOSED / MAINTENANCE

Phase 3：
ACTIVE / NOT PASSED

Phase 3 A级主线：
Reality Adventure

firstResponseLabel：
MAP CLOSED

产品语义：
HISTORICAL PRESENTATION COPY / CURRENTLY DEPRECATED

A/B/C/D：
A — STALE GATE

Runtime Authority Impact：
NONE

Reality Adventure Impact：
NONE

Phase 4：
LOCKED

Runtime 修改：
0

Gate 修改：
0

文案修改：
0
```

---

# 二十七、下一刀建议

正式下一刀：

```text
XINMAI-GRAVITY-FIRST-RESPONSE-LABEL-SEMANTIC-GATE-CORRECTION-P0
```

刀型：

```text
Refinement / Gate Correction
```

交通灯：

```text
GREEN
```

决策：

```text
NOW — STRICT GREEN SCOPE
```

唯一目标：

> 校准 `check-gravity-change-experience-routing`，移除已经失真的旧页面源码断言，改为保护 Typed Gravity Observation Outcome、Presentation 非权威边界与 Controller 唯一 Active 因果。

只允许修改：

```text
scripts/check-gravity-change-experience-routing.mjs
```

必须保护：

1. Gravity Page 不读取 `firstResponseLabel`；
2. Gravity Page 不硬编码历史标题；
3. Motion First Observation Outcome 存在；
4. Static First Observation Outcome 存在；
5. Observation Outcome 需要当前 Reality Trace；
6. Observation Outcome 需要 First Observation Affordance；
7. Host 只聚合 Typed Outcome；
8. Watchdog 不能提交成功；
9. Controller 仍是唯一 `ACTIVE_IN_GRAVITY` 权威；
10. Pressure、Choice、Crystal 不消费该字段。

下一刀不得：

- 删除类型字段；
- 删除 Adapter 常量；
- 修改 Validator；
- 修改 Fixture；
- 修改 Runtime；
- 修改页面；
- 修改文案；
- 修改 Typed Outcome；
- 修改 Controller；
- 修改 Phase；
- 顺带处理 Six Dimension、AI、Choice 或 Crystal。
