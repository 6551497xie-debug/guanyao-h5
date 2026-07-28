# XINMAI Reality Explicit Leave Navigation Delivery Truth Major Blade Prep P0

## 0. Construction State Card

任务：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-NAVIGATION-DELIVERY-TRUTH-MAJOR-BLADE-PREP-P0
```

刀型：

```text
MAP / Major Blade Prep
```

决策：

```text
NOW — PREP ONLY
```

Runtime 修改：

```text
0
```

当前状态：

```text
Phase 2:
CLOSED

RealityEncounterIntent Runtime Authority:
ESTABLISHED

Explicit Leave Core Transaction:
ESTABLISHED

Explicit Leave Delivery:
OPEN

Phase 3:
LOCKED
```

本刀唯一目标：

> 冻结“Controller 已确认终结，但返回生命空间尚未交付”时的权威状态、类型化成功证据、纯导航重试、失败降级、实施边界与回滚单位。

本刀不：

- 修改 Runtime；
- 新增 Engine；
- 新增持久化；
- 修改 Intent Controller；
- 修改 Recovery Adapter；
- 修改 Renderer；
- 修改 Pressure Seed；
- 修改 Dynamics；
- 实施浏览器 Harness；
- 解锁 Phase 3。

---

## 1. 上游关闭审计裁决

上游：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-TERMINATION-DELIVERY-CLOSURE-AUDIT-P0
```

已确认：

```text
Explicit Leave Product Meaning:
PASS

Explicit Leave Runtime Authority:
ESTABLISHED

Explicit Leave Core Termination Transaction:
PASS

Explicit Leave Delivery:
OPEN
```

关闭阻断之一：

```text
TERMINATED_AND_LEFT
↓
navigate("/launch-lab", { replace: true })
↓
函数返回
```

当前没有独立事实表达：

```text
终结已经成立
+
返回生命空间尚未交付
```

因此当前页面在导航未实际完成时可能保持：

```text
PENDING
+
in-flight 被占用
```

但用户缺少：

```text
纯导航重试
```

该缺口不能通过再次调用终结事务修复，因为 Intent 已经被权威终结。

---

## 2. 产品语义冻结

必须区分三个事实：

```text
TERMINATION CONFIRMED
≠
NAVIGATION REQUESTED
≠
LIFE WORLD DELIVERED
```

### Termination Confirmed

唯一含义：

> 当前 Reality Encounter 已经被 Controller 以 `EXPLICIT_LEAVE` 正式终结。

它不代表：

- `navigate()` 已调用；
- Route 已切换；
- LaunchLab 已挂载；
- 同一生命身份已恢复；
- 返回生命空间已经可见。

### Navigation Requested

唯一含义：

> Runtime 已经请求导航到 `/launch-lab`。

它不代表：

- React Route 已提交；
- LaunchLab 已经完成恢复；
- 同一生命主体已经呈现；
- 用户已经回到安全生命空间。

### Life World Delivered

唯一含义：

> `/launch-lab` 已完成 React post-commit，且同一身份引用与返回生命视觉连续性均通过校验。

只有该事实可以关闭导航交付。

---

## 3. 当前责任审计

### Intent Controller

继续拥有：

```text
当前 Encounter 是否已终结
```

不得拥有：

```text
Launch Route 是否已交付
```

### Explicit Leave Transaction

继续拥有：

```text
精确清理 Activation
+
strict terminate(EXPLICIT_LEAVE)
```

不得拥有：

```text
导航成功
```

### RealityProductionRouteRuntime

当前同时承担：

- Explicit Leave UI 临时状态；
- 终结事务调用；
- `navigate("/launch-lab")`。

问题：

Reality Route 一旦成功离开即卸载，它不能独立确认目标 Route 已交付。

### App / Routes

`App` 位于 Reality 与 Launch 两条 Route 之上。

它可以观察并协调：

- Reality 终结结果；
- 导航请求；
- Launch Route typed outcome；
- 重试版本。

因此它是导航交付协调的最小稳定所有者。

### LaunchLab

已有能力：

- `returningVisualReady`；
- `returningVisualContinuity`；
- `recoverRealityRecognizedIdentity(...)`；
- 同一生命的返回视觉空间；
- 同一关系入口。

它不需要：

- 重算出生；
- 重算二十八宿；
- 新建 Returning Identity；
- 读取终结 Controller；
- 读取 Recovery Storage。

它只需要在当前返回事实真正成立后发出类型化 post-commit outcome。

---

## 4. 入口方案比较

## Option A｜`navigate()` 调用即成功

```text
navigate("/launch-lab")
↓
DELIVERED
```

裁决：

```text
REJECT
```

原因：

- 导航调用不是 Route 提交；
- 无法识别目标组件渲染失败；
- 无法识别身份恢复失败；
- 无法提供纯导航重试；
- 会把“希望发生”误写成“已经发生”。

---

## Option B｜pathname 变成 `/launch-lab` 即成功

```text
location.pathname === "/launch-lab"
↓
DELIVERED
```

裁决：

```text
REJECT AS SOLE AUTHORITY
```

原因：

- 路径成立不等于 Launch 生命空间成立；
- 无法证明同一身份恢复；
- 无法证明返回视觉连续；
- Route Error 时可能产生路径正确、表面不可用的伪成功。

pathname 可以作为校验条件，但不能成为唯一成功证据。

---

## Option C｜Launch typed post-commit outcome

```text
Delivery Ticket
↓
导航请求
↓
Launch Route commit
↓
同一身份恢复
↓
returningVisualReady
↓
typed LIFE_WORLD_DELIVERED outcome
```

裁决：

```text
ACCEPT
```

优势：

- 终结事实与导航事实分离；
- 不依赖 DOM 查询；
- 不依赖 data attribute；
- 不新增 Renderer 输入；
- 复用既有身份恢复；
- 可识别身份失配；
- 可提供纯导航重试；
- 可独立回滚。

---

## Option D｜新增 sessionStorage Delivery Record

裁决：

```text
REJECT FOR P0
```

原因：

- 当前缺口不需要长期恢复资产；
- 会新增第二存储责任；
- 容易与 Intent Recovery 混淆；
- 终结事实已经由 Controller 确认；
- 页面刷新后现有 `NO_ACTIVE_ENCOUNTER → 安全返回` 已能降级。

P0 使用当前 App 生命周期内的临时交付票据，不新增持久化。

---

## 5. 唯一权威方案

冻结：

```text
Controller
确认 TERMINATED(EXPLICIT_LEAVE)
↓
Reality Route Runtime
报告 Termination Confirmed
↓
App-level Navigation Delivery Coordinator
创建不可变 Delivery Ticket
↓
Coordinator post-commit effect
请求 navigate("/launch-lab", replace)
↓
LaunchLab
校验 Ticket + Route + 同一身份 + returningVisualReady
↓
LaunchLab post-commit typed outcome
↓
Coordinator
提交 LIFE_WORLD_DELIVERED
↓
清除当前 Delivery Ticket
```

权威关系：

```text
Controller:
Termination Authority

App Delivery Coordinator:
Navigation Delivery Authority

LaunchLab:
Typed Delivery Outcome Producer

Renderer:
No Consumer / No Authority
```

---

## 6. Typed Delivery Ticket

未来实施必须建立最小不可变票据：

```ts
type RealityExplicitLeaveNavigationDeliveryTicket = Readonly<{
  deliveryReferenceId: string;
  intentReferenceId: string;
  encounterCycleId: string;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  terminalReason: "EXPLICIT_LEAVE";
  targetRoute: "/launch-lab";
  terminationConfirmedAt: string;
  deliveryAttempt: number;
}>;
```

### 唯一生成时机

```text
executeRealityExplicitLeaveTermination(...)
返回
TERMINATED_AND_LEFT
```

禁止生成于：

- 用户点击；
- `PENDING`；
- Activation clear；
- `TERMINATION_RETRYABLE`；
- `STALE_REQUEST_REJECTED`；
- `NO_ACTIVE_ENCOUNTER`；
- `navigate()` 调用；
- Launch Route；
- LaunchLab；
- Renderer。

### `NO_ACTIVE_ENCOUNTER`

该结果只允许：

```text
安全返回生命世界
```

不得生成：

```text
Termination Confirmed Delivery Ticket
```

因为当前 Runtime 没有证明本次用户动作完成了终结。

### Ticket 生命期

```text
TERMINATION_CONFIRMED
↓
LIFE_WORLD_DELIVERED
```

或：

```text
TERMINATION_CONFIRMED
↓
页面完整刷新
↓
内存票据丢失
↓
Controller ABSENT
↓
现有安全返回路径
```

刷新降级不得：

- 恢复旧 Intent；
- 重新终结；
- 生成新 cycle；
- 读取历史 Pressure；
- 阻断回到安全生命空间。

---

## 7. Navigation Delivery State Machine

冻结状态：

```text
IDLE
↓ 用户请求终结
TERMINATION_PENDING
├── strict termination retryable
│   ↓
│   TERMINATION_RETRYABLE
│
└── strict termination confirmed
    ↓
    TERMINATION_CONFIRMED_NAVIGATION_PENDING
    ↓ Coordinator 已请求导航
    NAVIGATION_REQUESTED
    ├── Launch typed outcome confirmed
    │   ↓
    │   LIFE_WORLD_DELIVERED
    │   ↓
    │   IDLE
    │
    └── navigate / route / surface / identity 未交付
        ↓
        NAVIGATION_RETRYABLE
        ↓ 用户重试
        NAVIGATION_REQUESTED
```

### `TERMINATION_PENDING`

表示：

- strict terminal transaction 尚未返回。

允许：

- 防重复点击；
- 保持当前 Reality 表面。

禁止：

- 提前导航；
- 提前生成 Delivery Ticket；
- 宣称当前 Encounter 已结束。

### `TERMINATION_RETRYABLE`

表示：

- Controller 未确认终结。

用户动作：

```text
重试终结
```

不是：

```text
重试导航
```

### `TERMINATION_CONFIRMED_NAVIGATION_PENDING`

表示：

- Controller 已确认终结；
- 当前 Intent 已不存在；
- Delivery Ticket 已成立；
- 导航尚未请求或尚未进入 effect。

此状态禁止再次调用终结事务。

### `NAVIGATION_REQUESTED`

表示：

- 当前 Delivery Ticket 已发起目标导航；
- 尚未收到 Launch typed outcome。

### `NAVIGATION_RETRYABLE`

表示：

- Encounter 已经终结；
- 仅返回生命空间未被确认交付。

用户动作：

```text
回到生命世界
```

该按钮只能：

- 重发相同目标导航；
- 增加 `deliveryAttempt`；
- 保留同一 `deliveryReferenceId`；
- 保留同一终结身份引用。

该按钮不得：

- 再调用 `executeRealityExplicitLeaveTermination`；
- 新建 Intent；
- 新建 Encounter Cycle；
- 恢复旧 Recovery；
- 写 Pressure；
- 进入 Dynamics。

### `LIFE_WORLD_DELIVERED`

表示：

- 目标 Route 已提交；
- LaunchLab 已完成 post-commit；
- 同一身份引用已验证；
- 返回生命视觉连续性已成立。

这是导航交付唯一成功状态。

成功后：

- 清除 Delivery Ticket；
- 不清除身份；
- 不清除关系名；
- 不清除历史 Crystal；
- 不生成新 Reality。

---

## 8. Typed Launch Outcome

未来实施必须建立：

```ts
type ReturningLifeWorldDeliveryOutcome =
  | Readonly<{
      status: "LIFE_WORLD_DELIVERED";
      deliveryReferenceId: string;
      deliveryAttempt: number;
      targetRoute: "/launch-lab";
      sourceReferenceId: string;
      starBeastIdentityReferenceId: string;
      mansionCoordinateReferenceId: string;
      presentedAt: string;
      authority: "RETURNING_LIFE_WORLD_POST_COMMIT";
    }>
  | Readonly<{
      status: "LIFE_WORLD_DELIVERY_REJECTED";
      deliveryReferenceId: string;
      deliveryAttempt: number;
      reason:
        | "DELIVERY_REFERENCE_MISMATCH"
        | "ROUTE_TARGET_MISMATCH"
        | "SOURCE_REFERENCE_MISMATCH"
        | "STARBEAST_IDENTITY_MISMATCH"
        | "MANSION_COORDINATE_MISMATCH";
    }>
  | Readonly<{
      status: "LIFE_WORLD_DELIVERY_UNAVAILABLE";
      deliveryReferenceId: string;
      deliveryAttempt: number;
      reason:
        | "RETURNING_IDENTITY_UNAVAILABLE"
        | "RETURNING_VISUAL_CONTINUITY_UNAVAILABLE"
        | "RETURNING_LIFE_SURFACE_NOT_COMMITTED";
    }>;
```

### 成功最低条件

必须同时满足：

```text
当前 Route = /launch-lab
+
Delivery Reference 一致
+
Delivery Attempt 一致
+
recoverRealityRecognizedIdentity(...) = READY
+
三项身份引用与 Ticket 一致
+
returningVisualReady = true
+
LaunchLab 已完成 React post-commit
```

`returningVisualReady` 当前已经要求：

```text
returningLifeContext exists
+
returningVisualContinuity exists
+
sourceReferenceId 一致
```

再通过既有 `recoverRealityRecognizedIdentity(...)` 取得并校验：

- `sourceReferenceId`；
- StarBeast Identity Reference；
- Mansion Coordinate Reference。

禁止：

- 重新计算二十八宿；
- 根据关系名推断身份；
- 根据 DOM 文本推断身份；
- 从 data attribute 读取 Runtime 状态；
- 让 Renderer 生成 Navigation Outcome。

---

## 9. 为什么不消费 Renderer Outcome

本能力回答：

> 用户是否已经回到同一生命空间。

它不回答：

> 某段星兽动画是否完成。

因此：

- `returningVisualReady` 与 React post-commit 是最低生命空间证据；
- 不要求等待粒子、呼吸或 WebGL Motion 完成；
- Reduced Motion 与 Motion 使用相同交付语义；
- WebGL fallback 不影响 Route 交付；
- Renderer 不获得终结或导航状态。

这避免新增：

```text
Delivery Ticket
↓
Renderer
↓
反向决定 Route
```

---

## 10. Coordinator Ownership

冻结：

```text
App-level Navigation Delivery Coordinator
```

它是：

- 当前 React 生命周期内的临时协调器；
- Reality 与 Launch Route 之间的 typed handoff owner；
- Navigation retry owner；
- Launch outcome consumer。

它不是：

- 第二 Intent Controller；
- Recovery Adapter；
- Identity Store；
- Relationship Runtime；
- Growth Runtime；
- Engine。

它只拥有：

```text
当前 Explicit Leave Delivery Ticket
当前 deliveryAttempt
当前 Navigation Delivery State
当前失败原因
```

它不得拥有：

- Intent state；
- terminalReason 决策；
- Relationship Name；
- Life Whisper；
- Pressure Seed；
- Reality Candidate；
- Choice；
- Crystal。

---

## 11. React 提交边界

当前同步顺序：

```text
termination success
↓
navigate()
```

未来冻结：

```text
termination success
↓
set Delivery Ticket
↓
React commit
↓
Coordinator effect sees confirmed ticket
↓
navigate()
```

原因：

- 保证 Reality Route 卸载前票据已由稳定上层持有；
- 防止终结成功与 Route 切换之间丢失交付事实；
- Strict Mode 重复 effect 可以通过 Ticket + Attempt 幂等；
- 废弃 render 不发起导航；
- render 阶段不写 Controller 或 Recovery。

禁止：

- render 中 navigate；
- `useMemo` 中 navigate；
- 终结结果返回前 navigate；
- 通过 DOM mounted 判断成功；
- 使用固定计时器提交成功。

---

## 12. Watchdog 语义

允许设置交付看门狗。

建议：

```text
8 seconds
```

看门狗只允许：

```text
NAVIGATION_REQUESTED
↓
NAVIGATION_RETRYABLE
```

它不得：

- 提交 `LIFE_WORLD_DELIVERED`；
- 重新调用 termination；
- 清除身份；
- 清除关系；
- 生成新 Intent；
- 自动跳转 Dynamics。

Watchdog 是失败报告者，不是成功真源。

---

## 13. UI 冻结

### 终结尚未确认

保持：

```text
正在让这一轮安静下来
```

失败：

```text
这一轮还没有完整停下，可以再试一次。
```

按钮：

```text
重试终结
```

### 终结已确认，导航尚未交付

文案：

```text
这一轮已经停下。
回到同一片生命星河。
```

按钮：

```text
回到生命世界
```

该按钮是纯导航重试。

禁止：

- “再结束一次”；
- “重新提交”；
- “任务完成”；
- “已获得成长”；
- “开始下一关”。

### Launch 返回表面尚不可用

App-level safe overlay 优先于后方交互。

原因：

- 防止在交付尚未确认时开始新 Reality；
- 防止关系输入与未交付 Ticket 并行；
- 防止用户误以为已经回到同一生命。

Overlay 只提供：

```text
回到生命世界
```

不提供：

- 新身份；
- 重新出生；
- 默认星兽；
- 跳过身份校验；
- Dynamics 旁路。

---

## 14. Failure and Retry Matrix

|场景|终结事实|Delivery 状态|处理|
|-|-|-|-|
|strict termination retryable|未成立|`TERMINATION_RETRYABLE`|重试终结|
|strict termination confirmed|已成立|`TERMINATION_CONFIRMED_NAVIGATION_PENDING`|创建 Ticket|
|navigate 同步抛错|已成立|`NAVIGATION_RETRYABLE`|纯导航重试|
|Route 未切换|已成立|watchdog → `NAVIGATION_RETRYABLE`|纯导航重试|
|Launch render error|已成立|`NAVIGATION_RETRYABLE`|重试同一 delivery|
|Launch identity unavailable|已成立|`NAVIGATION_RETRYABLE`|不生成身份|
|三项身份引用失配|已成立|`NAVIGATION_RETRYABLE`|拒绝串用|
|returning visual unavailable|已成立|`NAVIGATION_RETRYABLE`|保持安全 overlay|
|旧 delivery outcome 晚到|当前事实不变|REJECT|不关闭新 Ticket|
|旧 attempt outcome 晚到|当前事实不变|REJECT|不关闭当前 attempt|
|Strict Mode 重复 effect|已成立|同一 request|不得双导航推进|
|用户连续重试|已成立|attempt 单调推进|不得重新终结|
|Reality Route 卸载|已成立|Ticket 由 App 保持|不丢交付事实|
|普通刷新|已成立|内存 Ticket 丢失|Controller ABSENT → 安全返回|
|浏览器后退|已成立|不恢复旧 Encounter|不生成 Intent|
|Launch delivered|已成立|`LIFE_WORLD_DELIVERED`|清 Ticket|

---

## 15. Refresh and Recovery Boundary

P0 不新增 Navigation Delivery 持久化。

### Reality 页面刷新

终结前：

```text
Intent Recovery 继续按既有权威恢复
```

终结后、导航前：

```text
Intent 已不存在
↓
刷新后 /reality 进入 NO_ACTIVE_ENCOUNTER
↓
只提供安全返回生命世界
```

该路径不得宣称：

- 新终结成功；
- Recovery 找到旧周期；
- 用户明确开始新 Reality。

### Launch 页面刷新

若用户已经看到同一生命空间：

- Delivery 已实际完成；
- 内存 Ticket 丢失不影响身份与关系；
- 不恢复旧 Encounter。

### 为什么不写 Storage

导航交付票据：

- 不是身份资产；
- 不是关系资产；
- 不是成长资产；
- 不需要跨会话长期恢复。

新增 Storage 会扩大当前 Recovery Adapter 的唯一边界，P0 拒绝。

---

## 16. New and Returning User Boundary

Explicit Leave 来源可以是：

- First Encounter 进入的 Reality；
- Returning Life 进入的 Reality；
- 未来经过正式授权的 Choice Continuation。

返回目标统一：

```text
/launch-lab
```

成功条件统一：

```text
同一三项身份引用
+
returningVisualReady
+
post-commit outcome
```

禁止：

- 新用户返回时重新出生；
- 老用户返回时重新计算二十八宿；
- Choice 直接提交 `LIFE_WORLD_DELIVERED`；
- 不同来源维护三套 Delivery Runtime。

一个 Delivery Coordinator 服务所有合法来源。

---

## 17. Consumer Table

|生产者|输出|直接消费者|权限|
|-|-|-|-|
|Explicit Leave Transaction|`TERMINATED_AND_LEFT`|Reality Route Runtime|终结结果|
|Reality Route Runtime|Termination Confirmed|App Delivery Coordinator|请求创建 Ticket|
|App Delivery Coordinator|Delivery Ticket|Navigation effect、LaunchLab|导航交付|
|Navigation effect|Navigation Request|React Router|目标切换|
|LaunchLab|Typed Delivery Outcome|App Delivery Coordinator|交付确认|
|App Delivery Coordinator|`LIFE_WORLD_DELIVERED`|当前 UI 状态|清除 Ticket|

禁止消费者：

```text
Intent Controller
Recovery Adapter
Renderer
Pressure Seed
Reality Candidate
Six Dimension
Gravity
AI Reflection
Choice
Crystal
Archive Growth
Relationship Naming
Life Whisper
```

说明：

- Intent Controller 不读取 Delivery Ticket；
- LaunchLab 不读取 Intent Controller；
- Relationship Name 可以在 LaunchLab 正常恢复，但不能决定 Delivery 身份；
- Growth 系统不能因返回成功而生成任何结果。

---

## 18. Negative Consumer Gates

未来实施必须证明：

```text
Navigate Call as Success Authority:
0

Pathname-only Success Authority:
0

DOM Node as Success Authority:
0

MutationObserver Delivery Authority:
0

Fixed Timer Success:
0

Renderer Delivery Consumer:
0

Recovery Storage Delivery Ticket:
0

Second Intent Controller:
0

Termination Retry after Confirmed:
0

Pressure / Growth Consumer:
0
```

允许：

- `data-*` 作为测试观测镜像；
- watchdog 作为失败报告；
- Route pathname 作为 typed outcome 的校验条件；
- LaunchLab post-commit typed callback。

---

## 19. Major Implementation Boundary

未来 Major 允许修改：

- `App.tsx`；
- `LaunchLab.tsx`；
- Explicit Leave UI state types；
- 新增最小 Navigation Delivery 类型；
- 新增无业务推理的纯 transition helper；
- Explicit Leave 相关样式；
- 对应 Runtime 行为门禁。

未来 Major 必须同一提交完成：

```text
建立 App-level Delivery Coordinator
+
终结成功后先提交 Ticket
+
post-commit 发起 navigate
+
LaunchLab 产生 typed outcome
+
同一三项身份引用校验
+
纯导航重试 UI
+
移除旧同步 navigate success path
+
新增正负行为门禁
```

禁止拆成长期双路径：

```text
部分终结走旧同步 navigate
+
部分终结走 Delivery Coordinator
```

---

## 20. 不在 Major 范围

禁止吞入：

- Explicit Leave 浏览器 Harness；
- Route Load Error 测试基础设施；
- `ENCOUNTER_COMPLETED` 原子性；
- SelectedPressureSeedContext；
- Dynamics Handoff；
- Pressure Presentation 文案门禁；
- Gravity 阶段语义；
- Phase 3；
- Renderer；
- StarBeast Motion；
- Life Whisper；
- Relationship Naming；
- Crystal；
- Archive。

发现这些问题：

```text
记录
↓
完成已授权 Major
↓
刀后交通灯分流
```

---

## 21. Atomic Cutover

未来 Major 原子切换：

```text
旧：
TERMINATED_AND_LEFT
↓
同步 navigate

新：
TERMINATED_AND_LEFT
↓
Ticket committed
↓
post-commit navigation
↓
typed Launch outcome
↓
Delivery closed
```

同一提交必须删除：

- `TERMINATED_AND_LEFT → navigate → return` 作为完整成功路径；
- Reality Route 本地状态作为跨 Route Delivery 真源；
- PENDING 永久占用但无导航重试的路径。

不得删除：

- strict terminal transaction；
- Activation typed clear；
- Recovery confirmed clear；
- Controller Authority；
- `NO_ACTIVE_ENCOUNTER` 安全导航；
- Pressure Seed Pause。

---

## 22. Rollback Unit

回滚单位：

```text
完整 Major commit
```

回滚只覆盖：

- App Delivery Coordinator；
- Delivery Ticket / Outcome 类型；
- LaunchLab typed outcome；
- Navigation retry UI；
- 对应门禁。

回滚不得：

- 回滚 strict termination；
- 回滚 Activation typed clear；
- 恢复 Recovery false success；
- 修改身份或关系资产；
- 恢复旧 Encounter；
- 修改 Phase 3 锁。

Major 必须可以单提交独立回滚，不依赖后续 Harness 提交。

---

## 23. Runtime Acceptance Matrix

未来 Major 必须覆盖：

### A｜Normal Delivery

```text
Explicit Leave
↓
TERMINATED
↓
Ticket committed
↓
Navigation requested
↓
Launch same identity post-commit
↓
LIFE_WORLD_DELIVERED
↓
Ticket cleared
```

### B｜Navigate Failure

```text
TERMINATED
↓
navigate fails / target not committed
↓
NAVIGATION_RETRYABLE
↓
纯导航重试
↓
不得再次 terminate
```

### C｜Launch Identity Mismatch

```text
Ticket identity A
↓
Launch restored identity B
↓
LIFE_WORLD_DELIVERY_REJECTED
↓
不串用、不生成身份、不清 Ticket
```

### D｜Launch Visual Unavailable

```text
Route committed
↓
returningVisualReady = false
↓
LIFE_WORLD_DELIVERY_UNAVAILABLE
↓
safe overlay + retry
```

### E｜Old Outcome

```text
attempt N+1 current
↓
attempt N outcome arrives
↓
REJECT
```

### F｜Strict Mode

```text
effect repeated
↓
same Ticket + Attempt
↓
one effective navigation request
```

### G｜Refresh After Termination

```text
Ticket pending
↓
refresh
↓
Controller ABSENT
↓
safe return
↓
no old Encounter recovery
```

### H｜No Active Encounter

```text
NO_ACTIVE_ENCOUNTER
↓
safe navigate only
↓
no Termination Confirmed Ticket
```

---

## 24. Delivery Gates

未来 Major 必须证明：

```text
Termination Authority:
1

Navigation Delivery Coordinator:
1

Launch Typed Outcome Producer:
1

Termination Confirmed Ticket Producer:
1

Navigation Requested as Delivery Success:
0

Pathname-only Delivery Success:
0

Post-termination Re-termination:
0

Pure Navigation Retry:
PASS

Identity Mismatch Rejection:
PASS

Old Attempt Pollution:
0

Strict Mode Duplicate Navigation Advancement:
0

Renderer Consumer:
0

New Storage Writer:
0

Pressure / Growth Consumer:
0
```

还必须：

- TypeScript PASS；
- Production Build PASS；
- 全量 XINMAI checks PASS；
- Explicit Leave 既有门禁 PASS；
- 新 Navigation Delivery 行为门禁 PASS；
- 真实浏览器正常交付 PASS；
- 真实浏览器纯导航重试 PASS；
- 远程干净快照独立复现；
- 新增失败 0；
- 主工作树保持原样。

---

## 25. Traffic Light

### Green

```text
Typed Ticket:
READY

Typed Launch Outcome:
READY

App-level Coordinator:
READY

No Persistence:
FROZEN

No Renderer Input:
FROZEN
```

### Yellow

```text
Navigation Delivery Runtime:
READY FOR NARROW MAJOR

Explicit Leave Negative-path Browser Harness:
SEPARATE MAP / PREP

ENCOUNTER_COMPLETED Handoff Atomicity:
SEPARATE MAP

Pressure / Gravity Semantic Gate:
SEPARATE MAP
```

### Red

```text
Navigate Call as Success:
REJECT

第二 Intent Controller:
REJECT

Delivery Ticket Persistence:
REJECT FOR P0

Renderer Navigation Authority:
REJECT

借本刀进入 Phase 3:
REJECT
```

本 Prep 未发现必须推翻 Explicit Leave Core Transaction 的红灯。

---

## 26. Prep Verdict

正式冻结：

```text
Navigation Delivery Authority:
APP-LEVEL DELIVERY COORDINATOR

Termination Authority:
EXISTING INTENT CONTROLLER

Delivery Success Evidence:
TYPED LAUNCHLAB POST-COMMIT OUTCOME

Identity Validation:
EXISTING RECOVERED IDENTITY REFERENCES

Navigation Retry:
PURE NAVIGATION ONLY

New Persistence:
0

Renderer Consumer:
0

Second Controller:
0

Implementation Knife:
MAJOR

Implementation Decision:
NOW — STRICT SCOPE
```

唯一成功链：

```text
TERMINATED
↓
Delivery Ticket
↓
Post-commit Navigation Request
↓
LaunchLab Same-life Post-commit Outcome
↓
LIFE_WORLD_DELIVERED
```

---

## 27. Next Blade

正式下一刀：

```text
XINMAI-REALITY-EXPLICIT-LEAVE-NAVIGATION-DELIVERY-TRUTH-MAJOR-BLADE-P0
```

刀型：

```text
Major
```

决策：

```text
NOW — STRICT ATOMIC SCOPE
```

唯一目标：

> 用 App-level Delivery Coordinator 与 LaunchLab typed post-commit outcome，替换 `TERMINATED_AND_LEFT → 同步 navigate` 的伪完整交付路径，并提供不会再次终结的纯导航重试。

完成该 Major 后：

```text
Navigation Delivery Runtime
↓
独立 Closure Revalidation
↓
Explicit Leave Negative-path Browser Harness
↓
Explicit Leave Delivery Closure Audit
```

不得因 Major 成功自动：

- 关闭 Explicit Leave Delivery；
- 解锁 Phase 3；
- 进入 Encounter Completed；
- 修改 Growth。

---

## 28. Final State

```text
Phase 2:
CLOSED

Explicit Leave Core Transaction:
ESTABLISHED

Navigation Delivery Target Authority:
FROZEN

Navigation Delivery Runtime:
NOT YET IMPLEMENTED

Explicit Leave Delivery:
OPEN

Phase 3:
LOCKED
```

本 Prep 已完成方案、权威、状态机、消费者、失败语义、原子切换和回滚边界冻结，没有修改 Runtime。
