# XINMAI 1.0 冻结资产 → 正式页面 → 可见体验唯一基线 P0

## 0. 刀次身份

```text
刀名：
XINMAI-1.0-FROZEN-ASSET-
FORMAL-SURFACE-VISIBLE-EXPERIENCE-
SINGLE-BASELINE-P0

刀型：
RED / Product Conformance Baseline

施工范围：
MAP / AUDIT ONLY

Runtime / Gate / CSS / Renderer / Storage / Schema：
0 修改
```

本文件是 XINMAI 1.0 后续施工的唯一产品对照基线。它不以历史 `CLOSED / PASS` 标签代替用户体验，而是把每个正式阶段同时绑定到：

1. 冻结产品事实与 Authority；
2. 唯一正式路由和消费者；
3. 用户必须看见的生命变化；
4. 用户必须能够完成的动作；
5. 刷新、返回与 Reduced Motion 下必须保持的结果；
6. 当前远程干净快照中的真实缺口；
7. 下一次施工只允许修改的层级。

后续任何刀次若无法指出自己修改本表中的哪一行、哪个消费者和哪个可见缺口，不得进入施工。

---

## 1. 审计基线与证据边界

```text
Remote clean snapshot：
78dd921a8d6b487d6ef1a5f905ba59b5a5ec6b6e

Production Build：
PASS / 391 modules

正式 Production Preview：
PASS / Vite production bundle

主工作树既存修改：
未触碰
```

本次使用隔离快照启动正式 Production Preview，并从 `/launch-lab` 开始实际操作。未使用 Fixture、Acceptance Page、手工 Storage、查询参数造数或开发专用成功状态。

正式路径在出生坐标输入阶段停止：界面已显示 `1995 / 6 / 2 / 17:00`，但“确认原始输入与推导结果”仍保持禁用，页面没有呈现具体失败原因或恢复动作。由于该阶段没有形成合法 Birth Source，后续 Genesis、Reality、Gravity 的截图只用于验证 Direct URL 保护面，不能冒充正向体验证据。

### 当前证据

1. [正式入口](./evidence/xinmai-1-0-formal-experience-baseline-p0/01-launch-entry.png)
2. [出生输入空态](./evidence/xinmai-1-0-formal-experience-baseline-p0/02-birth-input.png)
3. [出生输入已填写但确认禁用](./evidence/xinmai-1-0-formal-experience-baseline-p0/03-birth-input-filled.png)
4. [Genesis Direct URL 保护](./evidence/xinmai-1-0-formal-experience-baseline-p0/04-genesis-direct.png)
5. [Reality Direct URL 保护](./evidence/xinmai-1-0-formal-experience-baseline-p0/05-reality-direct.png)
6. [Gravity Direct URL 保护](./evidence/xinmai-1-0-formal-experience-baseline-p0/06-gravity-direct.png)
7. [Archive 无 Canonical Imprint 保护](./evidence/xinmai-1-0-formal-experience-baseline-p0/07-archive-direct.png)

证据限制：截图可以证明当前视觉层级、可见文案、控制状态与保护面；不能单独证明 VoiceOver/TalkBack、真实触觉、WebGL 故障恢复或所有事务并发路径。

---

## 2. 两部最高协议

### 2.1 视觉生命宪法

所有正式屏幕必须同时服从以下不可拆分的原则：

- 同一片深空星河；
- 同一个生命核心；
- 同一个 StarBeast Identity；
- 同一具身体只发生状态变化，不重新生成模型；
- 上一阶段完成帧成为下一阶段开始帧；
- 用户先从呼吸、结构、姿态、流动、纹理中看见变化，文字随后只负责确认；
- Crystal 必须来自真实变化位置并沉积进同一身体，不能成为外部收藏品；
- Motion、Reduced Motion 与 Static Fallback 保留相同事实、空间、核心、身体和 Imprint；
- Renderer、Canvas、DOM、动画帧和 CSS 永远不能制造产品事实。

### 2.2 语义交互宪法

1.0 的统一体验语法为：

```text
现实发生
→ 看见当前力量
→ 让保护、收益与代价显形
→ 用户决定拿起什么、放下什么
→ 明确进入真实生活
→ 用户明确回来
→ 用户确认真实回应
→ 真实行动形成成长留痕
```

强制边界：

- `SYSTEM_FACT` 只能来自现有确定性 Authority；
- `CANDIDATE` 可以被拒绝、失败和撤回，不能直接推进状态；
- `PRESENTATION` 永远不能反向写 Authority；
- 四步照见是 Presentation Principle，不是第二状态机；
- 六维是观察坐标，不是人格真相或成长等级；
- 三才只可作为临时责任分流，不进入 Identity、Pricing 或 Retention Profile；
- AI Production Consumer 保持 `0`；没有 AI 时，完整主链必须成立；
- 用户明确动作而非模型解释，继续是 Choice 与 Growth 的唯一来源。

---

## 3. 五层冻结资产基线

| 产品层 | 已冻结事实 | 1.0 处理 | 禁止动作 |
|---|---|---|---|
| World | `lifeUniverseStarField`、Continuous Scene Host、统一空间轴 | KEEP；只修正式消费者与可见构图 | 新建第二宇宙、页面随机星场 |
| Identity | Birth Source Receipt、Mother Code、StarBeast Identity、Body Reference | KEEP / READ ONLY | 因 UI 问题重算身份或新增人格引擎 |
| Relationship | Recognition、同体同行、关系称呼、Reality Intent | KEEP；修正式 Handoff 与反馈 | 页面状态冒充关系成立 |
| Growth | Observation、Choice、Departure、Return、Fact、Eligibility、Formation Receipt | KEEP / AUTHORITY FROZEN | DOM、AI、动画或文字直接推进 Growth |
| Sanctuary | Canonical Body Imprint、Archive、长期生命纹理 | KEEP；修可见拥有感和连续阅读 | Legacy Cache 冒充身体权威、Crystal 付费锁定 |

冻结不是“永远不能修 Bug”。冻结表示：前端体验缺失默认只能修 Presenter、Consumer、Handoff 或 Recovery Feedback。只有证明现有 Authority 无法表达必要产品事实，才能另行申请红色 Authority Migration Audit。

---

## 4. 唯一正式路由与消费者

| 正式路径 | 唯一路由入口 | 正式页面 / Host | 保护结论 |
|---|---|---|---|
| 生命世界 / 出生坐标 / Returning | `/launch-lab` | `LaunchLab` | ACTIVE |
| Genesis | `/genesis` | `GenesisProductionRouteEntry` → `GenesisProductionExperiencePage` | ACTIVE / SOURCE GUARDED |
| Reality / Pressure | `/reality` | `RealityProductionRouteRuntime` → `RealityProductionRouteEntry` → `RealityProductionHost` → `RealityPressureSeedPresentation` | ACTIVE / INTENT GUARDED |
| Gravity / Observation / Choice | `/dynamics` | `GravityProductionRouteEntry` → `GravityProductionSurfaceHost` → `GravityPage` | ACTIVE / ADMISSION GUARDED |
| Archive | `/archive` | `PersonalityRingPage` | ACTIVE / CANONICAL GUARDED |

以下资产不得再计入正式产品完成度：

- `PersonalStarBeastWebGLPrototypeHarness`；
- `/genesis-lab`、`/chrono-lab`、`/starbeast-lab` 等 Lab；
- Development Fixture Route；
- `XinmaiLivedGrowthAcceptancePage`；
- 已隔离的旧 `ArchivePage`；
- 任何 `returnState`、Fixture、Acceptance 或 debug query 成功状态。

### 已确认的消费者分裂

以下成熟 Presentation 当前只由 Prototype Harness 消费：

- `RealityPressurePresentation`；
- `RealityGravityPresentation`；
- `RealityChoicePresentation`。

正式 Runtime 使用 `RealityPressureSeedPresentation` 与 `GravityPage`。后续不得重新设计第三套消费者；必须裁决并完成正式 Consumer Rewire。

---

## 5. 冻结资产 → 正式页面 → 可见体验唯一总表

### 状态定义

```text
PASS：正式路径可达，事实、消费者、可见体验和恢复均成立
PARTIAL：正式资产存在，但可见体验或反馈不完整
BLOCKED：上游正式事实未形成，不能取得正向证据
PROTECTIVE：Direct URL / 缺失事实被正确阻断，仅证明安全
```

| # | 用户阶段 | 冻结事实 / Authority | 唯一正式消费者 | 用户必须看见 | 用户动作 | 当前状态 | 当前缺口 | 下一施工层 |
|---:|---|---|---|---|---|---|---|---|
| 1 | 进入生命世界 | World baseline、统一星河、唯一核心 | `LaunchLab` + `AppShell` Scene Host | 空间先出现；同一核心邀请用户进入 | 进入 / 开始 | PARTIAL | 入口清晰，但核心更像背景光点，尚未成为持续生命锚点 | Presentation Composition |
| 2 | 出生坐标 | Birth raw input、Gregorian→Lunar、Hour Branch Derivation、Birth Source Receipt | `XinmaiGenesisBirthCoordinateControls` in `LaunchLab` | 时间进入同一核心；月相/星河响应；推导结果可理解 | 选择出生日期与时间段并确认 | FAIL | 通用表单替代既有时间轮语义；已填写后确认仍禁用；无具体原因/恢复；视觉权重压过生命核心 | Presentation Adapter + Event/Validation Feedback；Authority 禁改 |
| 3 | Genesis 坐标与显化 | Confirmed Birth Source、Mother Code、Twenty-Eight Mansion、Identity | `GenesisProductionRouteEntry` → `GenesisProductionExperiencePage` | 同一核心找到坐标、经络与星兽身体逐渐显现 | 靠近、认出 | BLOCKED | Birth Source 未形成，正式链不可达 | 上游修复后只做 Consumer/Visual Verification |
| 4 | Recognition | Recognition Receipt、Relationship Continuity | Genesis Recognition Consumer | 用户认出“一直存在的同一生命”，不是获得角色 | 明确认出 / 继续同行 | BLOCKED | 无正式正向证据 | Handoff Verification；Authority 禁改 |
| 5 | Reality Admission | Reality Encounter Intent、Recognized Identity、Source Context | `RealityProductionRouteEntry` | 上一屏同一身体直接进入现实；不换宇宙 | 进入现实 | BLOCKED / PROTECTIVE | Direct URL 正确阻断；正式 Birth→Genesis→Reality 未可达 | Formal Handoff / Recovery Feedback |
| 6 | Pressure | Pressure Seed、Pressure Recognition | `RealityProductionHost` + `RealityPressureSeedPresentation` | 现实压力改变同一身体，而不是出现压力卡片 | 选择可命中候选并认出 | BLOCKED | 正式消费者与成熟 Prototype Presentation 分裂 | Consumer Rewire / Presentation |
| 7 | Gravity Observation | Stable Observation Reference、AVAILABLE→RECOGNIZED Checkpoint | `GravityProductionSurfaceHost` + `GravityPage` | 同一身体的惯性、收紧和重复路径可观察 | 靠近、理解、确认观察 | BLOCKED / PROTECTIVE | Direct URL 正确阻断；正式 Reality→Gravity 未取得正向证据 | Formal Reachability then Presentation |
| 8 | 四步照见 | Deterministic Guide Presentation；无 AI Authority | `XinmaiLifeReflectionGuide` in `GravityPage` | 看见、命名、理解、转化围绕同一身体发生 | 确认候选镜像 | BLOCKED | 当前不应新增 AI；正式空间语义未验证 | Presentation Only |
| 9 | Choice | Seven Action Route Candidates、Validator、Choice Transaction、Observation consumption | `GravityPage` + `xinmaiChoiceActionIntentionController` | 保护、收益与代价显形；没有正确答案 | 拿起 / 放下 / 选择一个可撤回现实动作 | BLOCKED | 正式 Choice 与 Prototype Choice Presentation 分裂 | Consumer Rewire / Presentation；Authority 禁改 |
| 10 | Explicit Departure | Departure Receipt、Reality/Gravity lifecycle reconciliation | `XinmaiChoiceReturningProvenanceController` + Launch/Gravity Handoff | 明确离开产品、进入真实生活；不伪造新 Reality | “带着这一步回到生活” | BLOCKED | 上游正式 Choice 不可达 | Formal Handoff Verification |
| 11 | Explicit Return | Return Receipt、唯一 Target Encounter Cycle | Returning flow in `LaunchLab` + Provenance Resolver | 同一生命仍在；明确“我回来了” | 主动回访 | BLOCKED | 无本次正式正向资产 | Recovery Presentation Verification |
| 12 | Lived Response | User-confirmed Fact、Eligibility、Return Receipt atomic consumption | `XinmaiLivedResponseReturnSurface` + `xinmaiLivedResponseAuthorityController` | 区分已尝试、改变回应、未尝试、拒绝；无审判 | 用户确认真实事实 | BLOCKED | 无本次合法 Returning Provenance | Keep / Verify after reachability |
| 13 | Crystal Formation / Ownership | Eligibility、Formation Receipt、Canonical Crystal | `xinmaiCrystalFormationProductionOrchestrator` + `XinmaiCrystalFormationOwnershipMoment` | 事务确认后，Crystal 从真实行动位置形成；不是奖励 | 轻触确认拥有 | BLOCKED | C1 资产冻结成立，但本次正式链不可达 | KEEP C1；只验证正式到达 |
| 14 | Same-Life Body Imprint | Canonical Body Imprint、stable node、Body Reference | Same-Life Host/Renderer + C2 Presenter | Crystal 半嵌入同一经络；同体身体发生可读变化 | 观看 / 触碰 / 继续 | BLOCKED | C2 资产冻结成立，但本次正式链不可达 | KEEP C2；只验证正式到达 |
| 15 | Returning Life World | Same identity、same body、Receipt/Crystal/Imprint Recovery | Returning surface in `LaunchLab` | 同一星兽带着身体痕迹回到同一宇宙 | 继续同行 | BLOCKED | 无合法 Canonical Imprint 正向状态 | Same-Life Continuity Presentation |
| 16 | Archive | Canonical Recovery、Receipt/Crystal/Body Imprint references | `PersonalityRingPage` | 同一生命记得经历如何进入身体；不是历史清单 | 回看生命年轮 | PROTECTIVE / PARTIAL | 无 Imprint 时正确扣留；正向身体年轮本次不可验证；前景信息弱 | Canonical Presentation only |

---

## 6. 当前正式用户链裁决

```text
Launch：
PARTIAL

Birth Input：
FIRST FORMAL BLOCKER / FAIL

Genesis → Reality → Pressure → Gravity → Choice：
BLOCKED BY UPSTREAM FORMAL SOURCE

Departure → Return → Fact → Formation → Imprint：
BLOCKED / FROZEN ASSETS PRESERVED

Archive：
PROTECTIVE DIRECT STATE ONLY

Phase 3 End-to-End Experience：
OPEN / NOT PASSED
```

Direct URL 保护面均未伪造成功，这是 Authority Safety 的正向证据；但 `SAFE_WITHHELD` 或 Direct URL Guard 只能证明安全，不能证明用户体验关闭。

---

## 7. 复用、重接与禁止新增清单

### 7.1 KEEP / AUTHORITY FROZEN

- Birth Source Derivation 与 Admission；
- Genesis Identity / Mother Code / Mansion Authority；
- Reality Intent 与 Pressure Recognition；
- Gravity Observation Continuity；
- Seven Action Route Resolver / Validator；
- Choice Transaction；
- Departure / Return Provenance；
- Lived Response Fact 与 Eligibility；
- Formation Receipt / Crystal；
- Canonical Body Imprint；
- C1 Ownership Moment；
- C2 Same-Life Body Presenter；
- PersonalityRingPage 的 Canonical Recovery 边界。

### 7.2 REUSE VISUAL SHELL / REWIRE

- 既有时间轮 / 时间段选择语义，接回正式 Birth Source 输入；
- Continuous Scene Host，作为唯一世界承载层；
- Genesis Renderer 主干；
- Prototype 中成熟的 Pressure / Gravity / Choice 空间表达，只能经过正式 typed facts 接入生产消费者；
- 既有 Motion / Reduced Motion / Static Presenter 契约。

### 7.3 REMOVE FROM COMPLETION METRICS

- Prototype Harness 成功截图；
- Lab 页面交互；
- Fixture 或 Acceptance 成功状态；
- Direct URL 的保护面；
- 仅有 Build/Gate PASS 的局部模块；
- 仅有 `SAFE_WITHHELD` 的安全结果。

### 7.4 REJECT

- 新建第二 Birth Engine；
- 新建第二 Scene Host；
- 新建第三套 Pressure / Gravity / Choice Consumer；
- 用 AI 修补正式链可达性；
- 为解决页面反馈而修改 Growth Authority；
- 在完整链关闭前施工 Audio、Haptic、Prompt Runtime、Monetization Runtime 或 Phase 4。

---

## 8. 后续施工唯一方法

### 第一遍：薄而完整的正式链

目标：使用现有视觉资产和冻结 Authority，让同一正式用户完成全部 16 阶段。此阶段不追求材质终稿，只要求：

- 正式入口可达；
- 唯一 Authority 正确；
- 唯一正式消费者正确；
- 用户知道下一步；
- 失败有原因和恢复动作；
- 刷新、返回和重复操作不产生第二事实；
- 同一核心、身体和世界不被替换；
- Reduced Motion 保持相同事实。

### 第二遍：按用户旅程逐段精修

只有完整薄链通过后，才按以下顺序精修：

1. 入口与 Birth Coordinate；
2. Genesis 坐标、显化与 Recognition；
3. Reality Pressure；
4. Gravity Observation 与 Choice；
5. Departure 与 Returning；
6. Lived Response；
7. Crystal Ownership；
8. Same-Life Body Imprint；
9. Archive 年轮；
10. Motion、Reduced Motion、低视力与 Android Release；
11. C3 Sound / Haptic。

---

## 9. 新关闭标准

任何阶段只有同时满足以下条件才能标记 `CLOSED / PASS`：

```text
正式入口可达
+ Authority 事实成立
+ 唯一正式消费者消费
+ 用户看见同一生命的变化
+ 用户动作真实可达
+ 失败原因与恢复可理解
+ Refresh / Back / Forward 可恢复
+ Motion / Reduced Motion 事实一致
+ 上下游完整继续
```

以下结果不得单独关闭阶段：

- TypeScript PASS；
- Production Build PASS；
- Gate 全通过；
- Counter 可用；
- SAFE_WITHHELD 正确；
- Prototype 页面正确；
- Authority 单元测试通过；
- Direct URL 被阻断。

Phase 3 只允许一次全链关闭，不再由局部模块 `CLOSED` 自动解锁下一阶段。

---

## 10. 第一处正式施工目标

根据本次干净 Production 证据，下一目标只能是：

```text
XINMAI-1.0-BIRTH-COORDINATE-
FORMAL-EXPERIENCE-SHELL-AND-CONFIRMATION-
CONVERGENCE-P0

目标：
恢复时间段/时间轮生命交互外壳；
保留现有 Birth Source Authority；
让禁用、推导、确认与失败恢复可理解；
完成 /launch-lab → /genesis 正式 Handoff。

允许修改：
Birth Presentation Adapter / Controls / CSS / typed feedback / formal Handoff consumer

禁止修改：
Calendar Engine / Hour Branch Rule / Birth Source Schema / Identity Authority / Mother Code / Growth
```

如果下一刀证明只是 Event/Presentation 缺口，应归类为黄色 Major Blade，不得升级成新 Birth Authority。只有现有 Authority 无法表达用户已提供的合法出生事实时，才允许重新申请红色 Migration Audit。

---

## 11. 最终裁决

```text
Frozen Asset → Formal Surface → Visible Experience Baseline：
ESTABLISHED / PASS

Frozen Authority Integrity：
PRESERVED

Formal Product Chain：
OPEN

First Formal Blocker：
BIRTH COORDINATE CONFIRMATION / EXPERIENCE SHELL

Runtime / Gate / CSS / Renderer Modification：
0

Next：
BIRTH COORDINATE FORMAL EXPERIENCE CONVERGENCE
```

本基线不宣称产品已经关闭。它只完成一件事：从现在开始，所有施工都必须沿同一条正式用户链，把已经冻结的产品事实转换成用户可见、可操作、可恢复的同一生命体验。
