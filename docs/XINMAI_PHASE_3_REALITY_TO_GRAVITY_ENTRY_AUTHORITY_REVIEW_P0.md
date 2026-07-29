# XINMAI Phase 3 Reality to Gravity Entry Authority Review P0

## 0. Construction State Card

任务：

```text
XINMAI-PHASE-3-REALITY-TO-GRAVITY-ENTRY-AUTHORITY-REVIEW-P0
```

刀型：

```text
MAP / Phase 3 Entry Authority Review
```

决策：

```text
NOW — MAP ONLY
```

Runtime 修改：

```text
0
```

当前阶段：

```text
Phase 2:
CLOSED

Phase 3:
LOCKED
```

审查基线：

```text
fd7f0dc5502908608953bede7f35bf27f033f82d
```

远程分支：

```text
codex/genesis-28-mansion-production-continuity
```

本刀唯一目标：

> 裁决现有 `/dynamics` 与休眠的 `RealityProductionGravityConsumer`，谁有资格承载 Phase 3 的正式 Reality → Gravity Runtime，并冻结进入正式施工前必须完成的入口权威迁移边界。

本刀不：

- 修改 `/reality`、`/dynamics` 或任何路由；
- 接入或复活 `RealityProductionGravityConsumer`；
- 修改 Selected Pressure Seed、Six Dimension、Gravity、Choice 或 Crystal；
- 新增 Controller、Engine、数据模型或持久化；
- 清理旧入口；
- 校准历史门禁；
- 解锁 Phase 3；
- 把本 MAP 的目标设计描述为已经存在的 Runtime。

---

## 1. 审查问题与证据等级

本 MAP 必须回答：

1. 当前用户认出的 Reality 如何进入 Gravity；
2. 当前真正运行的 Gravity 消费者是谁；
3. 休眠 Consumer 是否能直接承接 Reality V2；
4. 当前入口是否保持身份、现实与阶段连续；
5. 哪些旧入口可能形成旁路；
6. 正式权威应保留、适配还是替换；
7. 是否需要 Migration Audit；
8. Phase 3 在什么条件下才可申请解锁。

证据等级：

```text
P = Protocol declaration
S = Source structure
A = Automated gate evidence
B = Real browser behavior
R = Remote clean baseline
```

裁决原则：

- Service 存在不等于 Production Runtime 已接入；
- 页面可访问不等于它拥有合法入口权威；
- Pressure Seed 被持久化不等于它属于当前生命；
- `navigate("/dynamics")` 不等于 Gravity 因果已经成立；
- Gravity Readiness 不等于 Gravity 已经执行；
- 当前唯一运行表面优先继承，但不得借此承认历史旁路；
- 不为获得“形式完整”而创建第二套 Gravity Runtime。

---

## 2. Phase 3 产品责任

Phase 3 回答：

> 这个生命如何与现实共同经历，并看见曾经保护自己的回应方式。

上游已冻结的最低因果：

```text
用户认出一个 Reality
↓
同一生命产生可观察回应
↓
用户主动靠近回应位置
↓
六维留下生命痕迹
↓
Gravity 显出重复的保护方式
↓
AI 只作照见
```

Phase 3 不是：

- 从任意历史 Pressure Seed 自动恢复一轮现实；
- 从身份存在直接进入 Gravity；
- 在 Reality 尚未被用户认出前生成六维结论；
- 用 Gravity 自动执行 Choice；
- 用单页技术聚合取消阶段边界。

Phase 3 的正式入口必须同时保持：

```text
当前被用户认出的 Reality
+
同一生命身份
+
用户明确靠近生命回应位置
+
单一 Gravity 消费路径
```

---

## 3. 当前生产链证据

### 3.1 当前 Reality V2 链

当前真实链路：

```text
RealityProductionRouteEntry
↓
RealityProductionHost
↓
RealityProductionPressureSeedConsumer V2
↓
RealityPressureSeedPresentation
↓
用户认出一个候选 Reality
↓
gravityReadiness = READY
↓
用户轻触并靠近身体回应位置
↓
onContinueToGravity(selectedPressureSeedContext)
```

该链已经做到：

- Pressure Seed 是候选，不是自动结论；
- 用户必须明确认出；
- Gravity 不在 Pressure Presentation 中执行；
- 同一 Reality Intent 必须仍是 `ACTIVE_IN_REALITY`；
- 当前 encounter、intent 与 source 必须一致；
- 明确完成当前 Reality 后才写入 handoff；
- 目标固定为 `/dynamics`。

证据：

```text
S + A + B + R
```

### 3.2 当前 handoff

Reality → Dynamics 当前投递：

```text
selectedPressureSeedContext
visualContinuity
choiceContinuation
innerViewEntry
```

其中：

```text
innerViewEntry:
CURRENT_LIFE_WEATHER_BODY_APPROACHED
```

代表用户已经靠近本轮生命回应位置。

`visualContinuity` 带有当前生命的：

- `sourceReferenceId`；
- 同一 Life Universe 消费来源；
- 同一 StarBeast 身体与核心连续；
- Reality → Dynamics 的视觉接续。

`GravityPage` 只有在 Route visual continuity 与当前真实生命来源的
`sourceReferenceId` 一致时，才启用 arrival continuity。

### 3.3 真实浏览器路径

远程基线真实浏览器可达：

```text
Returning Life World
↓
明确暂时不说
↓
主动进入新的 Reality
↓
认出一个 Reality Candidate
↓
轻触生命回应
↓
靠近生命正在变化的位置
↓
/dynamics
```

到达后可见：

```text
刚才回应的地方，开始显出生命的流动。
```

并继续显示：

- 同一 Life Universe；
- 当前认出的现实；
- 身体内观入口；
- Six Dimension 与 Gravity 的既有表现层。

裁决：

```text
Current Intended Reality → Gravity Path:
EXISTS
```

---

## 4. 当前真正运行的 Gravity 消费者

### 4.1 `/dynamics` / `GravityPage`

`App.tsx` 将：

```text
GUANYAO_ROUTES.dynamics
```

直接注册到：

```text
GravityPage
```

`GravityPage` 当前真实消费：

- `SelectedPressureSeedContext`；
- Mother / Persona 既有上下文；
- Route `visualContinuity`；
- `innerViewEntry`；
- `choiceContinuation`；
- `GuanyaoRuntimeEngine`；
- Six Dimension；
- `RealityGravityInertiaField`；
- 同一 `RealityLifeUniverseCanvas`；
- 更深层已有 Choice / Crystal 表现，但受既有阶段门禁约束。

这意味着：

```text
/dynamics / GravityPage
=
当前唯一运行中的 Phase 3 Gravity 体验表面
```

Runtime 证据：

```text
✓ Production route
✓ Real browser reachable
✓ Current Pressure Seed consumed
✓ Six Dimension consumed
✓ Gravity visual state consumed
✓ Same-life visual continuity available
```

### 4.2 `RealityProductionGravityConsumer`

该 Service 当前具备：

- 不可变 Gravity Session；
- source continuity 检查；
- 显式 Gravity observation confirm；
- Choice readiness output；
- 禁止诊断、评分、导航、存储与 UI 集成的边界。

但它没有当前生产调用者。

当前唯一 Presentation 调用位于：

```text
PersonalStarBeastWebGLPrototypeHarness
```

不是 Reality V2 Production Host。

更关键的是，它只接受：

```text
RealityProductionPressureSession
schema:
GUANYAO_REALITY_PRODUCTION_PRESSURE_SESSION_V1
```

而当前 Reality V2 生产链输出：

```text
RealityProductionPressureSeedSession
schema:
GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2
```

两者不是同一输入契约。

Runtime 证据：

```text
○ Production caller
✓ Isolated service contract
△ Historical gate expectations
✗ Reality V2 compatible input
```

裁决：

```text
RealityProductionGravityConsumer:
DORMANT V1 PROTOCOL ASSET

Production Authority:
NO

Direct V2 Activation:
REJECT
```

---

## 5. 两个候选的权威裁决

| 候选 | 当前真实运行 | 消费 Reality V2 | 保持同一视觉生命 | 入口单一性 | 裁决 |
| --- | --- | --- | --- | --- | --- |
| `/dynamics` / `GravityPage` | 是 | 是 | 是，但只在 Route state 校验成立时 | 尚未成立 | `RETAIN + ADAPT` |
| `RealityProductionGravityConsumer` | 否 | 否，只接受 V1 | 只保存 source 引用，不呈现当前生命 | 无生产入口 | `DO NOT ACTIVATE` |

正式方向：

```text
Phase 3 Runtime Surface Target:
/dynamics / GravityPage

Implementation Strategy:
RETAIN + ADAPT

Dormant V1 Gravity Consumer:
DO NOT REVIVE AS SECOND AUTHORITY
```

这不是宣布 `/dynamics` 已经成为正式入口权威。

准确状态：

```text
Eligible Runtime Surface:
YES

Current Exclusive Entry Authority:
NO
```

---

## 6. 当前入口权威缺口

### 6.1 多个可达入口

源码仍存在多条 `/dynamics` 进入方式，包括：

- Reality V2 正式 handoff；
- LaunchLab 既有 handoff；
- Scene 既有 handoff；
- Mother / Force / Chrono 等历史入口；
- Personality Ring 等返回入口；
- 多个 legacy route redirect；
- 用户直接访问 `/dynamics`。

本 MAP 不判断每条历史入口是否仍属于正式用户主线。

但从权威角度，当前事实已经足够：

```text
Reality V2 Handoff
不是
/dynamics 唯一入口
```

因此不能把“GravityPage 已运行”直接升级为“Phase 3 入口权威已成立”。

### 6.2 Selected Pressure Seed 持久化不绑定身份

当前持久化资产：

```text
guanyao:selectedPressureSeedContext
```

使用：

```text
localStorage
```

其 schema 只包含：

- Pressure Seed id；
- matrix；
- surface / shell；
- pressure field / nature；
- 六维相关线索；
- tags 与 confidence。

它不包含：

- `sourceReferenceId`；
- StarBeast identity reference；
- mansion coordinate reference；
- Reality Encounter reference；
- Reality user-recognition proof；
- body-approach proof。

`resolveDynamicsInputContext` 的优先级：

```text
fixture
↓
route handoff
↓
persisted Selected Pressure Seed
```

所以：

- 正式 Route handoff 能带来当前视觉身份校验；
- 直接 URL 或缺失 route state 时，页面仍可能消费历史持久化 Pressure Seed；
- 历史 Pressure Seed 可能恢复为当前 Gravity 输入；
- 页面会降级到通用星场，但仍可能启动 causal engine；
- 持久化事实本身不能证明“这是当前生命刚认出的 Reality”。

裁决：

```text
SelectedPressureSeedContext:
VALID HANDOFF PAYLOAD

Identity Authority:
NO

Current Reality Authority:
NO

Standalone Recovery Authority:
NO
```

### 6.3 Page 不是入口 Controller

`GravityPage` 当前同时承载：

- 输入恢复；
- Gravity 表现；
- Six Dimension；
- Choice / Crystal 的更深表现；
- 多种兼容与 fixture 入口。

它可以继续成为统一视觉 Runtime，但不应仅靠：

```text
route mounted
或
localStorage seed exists
```

自行推导 Phase 3 admission。

Phase 3 正式入口需要一个类型化、可校验、可回滚的 admission handoff。

---

## 7. 目标权威边界

### 7.1 权威所有权

正式目标应分为两层：

```text
Gravity Entry Authority
↓
验证当前 Reality 是否有资格进入 Phase 3

/dynamics / GravityPage
↓
消费被授权的当前 Reality，并呈现 Six Dimension / Gravity
```

目标输入至少必须能证明：

```text
同一 sourceReferenceId
+
同一 StarBeast / Mansion identity references
+
当前被用户认出的 Selected Pressure Seed
+
当前 Reality encounter 已正式结束
+
用户已靠近当前身体回应位置
+
目标只允许 /dynamics
```

本 MAP 不授权新增具体类型，也不命名最终 Controller。

### 7.2 合法消费者

Phase 3 Entry 获准后允许消费：

- `/dynamics` route admission；
- `GravityPage` 输入适配；
- Six Dimension runtime；
- Gravity protective-pattern presentation；
- 同一生命视觉连续。

不得直接消费：

- Choice；
- Crystal；
- Archive growth；
- monetization；
- Relationship Naming；
- Life Whisper 原文；
- AI 诊断；
- Renderer 身份计算。

Choice / Crystal 即使与 GravityPage 共处同一文件，也必须继续受各自阶段事实与用户动作门禁约束。

### 7.3 禁止旁路

以下均不得单独建立 Phase 3：

```text
identity exists
route mounted
selectedPressureSeedContext exists
localStorage record exists
legacy redirect
fixture exists
old V1 Pressure Session exists
Gravity Consumer service initializes
Choice continuation exists
```

---

## 8. 迁移等级裁决

要让现有 `/dynamics` 成为正式 Phase 3 Runtime，必须处理：

- Reality V2 handoff 成为唯一生产 admission；
- 历史入口分别保留、隔离、迁移或拒绝；
- direct URL 的安全恢复或安全降级；
- Selected Pressure Seed 的身份与 Reality provenance；
- Route state 与恢复候选的权威顺序；
- GravityPage 不再以未授权持久化 seed 启动当前 Phase 3；
- 旧 V1 Consumer 不形成第二真源；
- 完整原子回滚。

这些变化涉及：

- 权威入口变化；
- 新旧生产路径切换；
- Route 与 Page 责任边界；
- Selected Context 恢复责任；
- 多消费者清点；
- 回滚需覆盖入口与消费两端。

按施工纪律判定：

```text
Traffic Light:
RED

Required Next Governance:
Migration Audit

Ordinary Major Blade:
NOT SUFFICIENT
```

禁止分步形成：

```text
新 Gravity Admission
+
旧 direct / persisted-seed Authority
```

---

## 9. 目标原子切换方向

未来 Migration Audit 必须评估以下单提交边界：

```text
冻结 Reality → Gravity Typed Admission
+
接入 Reality V2 正式 handoff
+
接入 /dynamics Entry Adapter
+
校验身份与当前 Reality provenance
+
决定 direct URL recovery
+
隔离或迁移旧入口
+
禁止 persisted seed 独立启动 Phase 3
+
保留 GravityPage 现有视觉与 Six Dimension / Gravity 消费
+
证明 V1 Gravity Consumer 不在生产链
```

回滚单位必须是完整入口迁移。

回滚不得：

- 删除 Reality V2；
- 删除现有 GravityPage；
- 修改 Pressure Seed 算法；
- 修改 Six Dimension 模型；
- 修改 StarBeast 身份；
- 清除用户现有身份、关系或 Crystal；
- 同时保留半套新 admission。

---

## 10. 消费者映射

| 生产者 | 输出 | 当前直接消费者 | 当前状态 | 目标裁决 |
| --- | --- | --- | --- | --- |
| Pressure Seed V2 Consumer | 用户认出的 Selected Pressure Seed | Reality Host / Presentation | `✓` | 保留 |
| Reality Host | Gravity readiness + body approach | Route Entry callback | `✓` | 保留 |
| Reality Route Entry | Dynamics handoff + navigation | `/dynamics` | `✓` | 作为迁移源 |
| Selected Pressure Seed Persistence | 历史 seed 候选 | Dynamics Input Adapter | `✓` | 不得单独拥有 admission |
| Route visual continuity | 同一生命来源 | GravityPage arrival continuity | `✓` | 保留并纳入正式校验 |
| Dynamics Input Adapter | Seed / mother / persona | GravityPage | `✓` | 需要入口权威约束 |
| GravityPage | Six Dimension / Gravity 体验 | 用户、后续既有表现 | `✓` | 正式目标表面 |
| V1 Pressure Consumer | V1 pressure session | dormant Gravity Consumer | `○` | 不复活 |
| RealityProductionGravityConsumer | V1 Gravity session | dormant Choice Consumer | `○` | 不作为 V2 正式权威 |
| Legacy / direct entries | 多种不完整 handoff | GravityPage | `△` | Migration Audit 逐项裁决 |

---

## 11. 当前协议与门禁冲突

当前注册检查存在两组冲突历史：

### 当前 V2 原子 Host 门禁

要求：

```text
RealityProductionHost
不接入 Gravity Consumer
不接入 Choice Consumer
Pressure Presentation 不执行 Gravity
```

这与当前 Runtime 一致。

### 旧 V1 Host 门禁

仍要求：

```text
同一 Host
初始化 Pressure Consumer
初始化 Gravity Consumer
初始化 Choice Consumer
```

这与 Reality V2 cutover 冲突。

此外：

- Gravity Consumer 的独立 Service contract 可通过；
- Host integration 断言因 V2 cutover 失败；
- `Gravity 尚未启动` 精确文案门禁已在上一张 MAP 裁决为陈旧；
- Dynamics Input Adapter 的行为样例通过，但禁止 route-state 强制类型转换的源码门禁失败；
- Gravity change experience route 还存在独立精确源码标记漂移。

裁决：

```text
Gate Conflict:
FOUND

Runtime Fix In This Knife:
NO

Reuse Old Gate As Authority:
REJECT
```

门禁治理必须跟随最终 Phase 3 入口权威，不能反过来复活 V1 Runtime。

---

## 12. Phase Fit 与关闭裁决

本能力是否增强：

```text
用户参与：
YES

世界回应：
YES

生命关系：
PRESERVED

现实成长：
TARGETED, NOT YET AUTHORIZED
```

是否提前进入 Phase 4：

```text
NO
```

Phase 3 当前状态：

```text
LOCKED
```

权威裁决：

```text
Current Gravity Runtime Surface:
/dynamics / GravityPage

Target Gravity Runtime Surface:
/dynamics / GravityPage

Strategy:
RETAIN + ADAPT

Current Exclusive Entry Authority:
NOT ESTABLISHED

Dormant V1 Gravity Consumer:
DO NOT ACTIVATE

Second Gravity Runtime:
REJECT

Migration Required:
YES — ATOMIC
```

本 MAP 完成不等于 Phase 3 解锁。

---

## 13. 交通灯扫描

### 绿色

- 当前 Reality V2 已有用户认出；
- 当前 Route 已有明确 body approach；
- `/dynamics` 已有同一生命视觉连续；
- Six Dimension 与 Gravity 已有可继承资产；
- Pressure Presentation 未越权执行 Gravity。

处理：

```text
PRESERVE
```

### 黄色

- 旧门禁仍冻结 V1 Host；
- Dynamics route state 仍通过页面内类型断言读取，尚未成为正式 Typed Admission；
- GravityPage 内聚合了多个后续阶段表现；
- direct URL 的用户体验降级语义尚未单独冻结；
- Choice / Crystal 阶段门禁需在 Phase 3 之后独立复验。

处理：

```text
MAP LATER
```

不并入本刀，不自动阻断本刀。

### 红色

- `/dynamics` 存在多个入口；
- persisted Selected Pressure Seed 无身份与 Reality provenance；
- 入口权威与视觉 Runtime 尚未分离；
- 新旧路径切换必须原子完成。

处理：

```text
MIGRATION AUDIT
```

不顺带修复。

---

## 14. 下一刀建议

正式下一刀：

```text
XINMAI-PHASE-3-GRAVITY-ENTRY-ADMISSION-AUTHORITY-ATOMIC-MIGRATION-AUDIT-P0
```

刀型：

```text
Migration Audit / Atomic Cutover Prep
```

主 Layer：

```text
Layer 4 — Growth
```

保护 Layer：

```text
Layer 2 — Identity
Layer 3 — Relationship
```

决策：

```text
NOW — AUDIT ONLY
```

唯一目标：

> 在保留 `/dynamics` / `GravityPage` 作为唯一 Gravity 体验表面的前提下，清点并裁决所有旧入口、持久化恢复与 Route handoff，冻结 Reality V2 → Gravity 的单一 Typed Admission、原子切换提交边界和完整回滚单位。

下一刀必须回答：

1. 谁生成 Gravity Entry Admission；
2. 当前 Reality recognition、body approach 与 identity references 如何绑定；
3. Selected Pressure Seed 原文与 provenance 如何分离；
4. direct URL 如何恢复或安全降级；
5. LaunchLab、Scene、Mother、Force、Chrono、Archive 等旧入口逐项如何处理；
6. `/dynamics` 何时允许启动 causal runtime；
7. 哪些 persisted context 只作恢复候选；
8. 如何证明 V1 Gravity Consumer 不成为第二真源；
9. 单提交文件边界；
10. 完整原子回滚方案。

---

## 15. 最终裁决

```text
Phase 2:
CLOSED

Phase 3:
LOCKED

Reality → Gravity Current Running Surface:
/dynamics / GravityPage

Reality → Gravity Target Surface:
/dynamics / GravityPage

Current Formal Entry Authority:
NOT ESTABLISHED

Target Strategy:
RETAIN + ADAPT

RealityProductionGravityConsumer V1:
DORMANT / DO NOT ACTIVATE

SelectedPressureSeedContext:
HANDOFF PAYLOAD ONLY

Migration:
REQUIRED — ATOMIC

Decision:
MAP COMPLETE
```

最终结论：

> XINMAI 不需要再建一个 Gravity 系统。应保留已经运行的 `/dynamics` 生命体验表面，但必须先把“用户刚刚认出的 Reality、同一生命身份与主动靠近”冻结为唯一入口权威，并原子移除历史旁路与无身份持久化事实对当前 Phase 3 的冒充资格。
