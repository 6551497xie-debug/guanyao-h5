# XINMAI Phase 3 Crystal Ownership Sensory Single-Owner Haptic-First Atomic Migration Revalidation P0

## 0. 审计裁决

```text
Knife:
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-SINGLE-OWNER-HAPTIC-FIRST-
ATOMIC-MIGRATION-REVALIDATION-P0

Traffic light:
RED

Knife type:
Migration Revalidation / Haptic-first Atomic Cutover Audit

Decision:
AUDIT ONLY

Final verdict:
APPLICATION READY

First Runtime functional scope:
CONTROLLER + HAPTIC ONLY

Audio Runtime:
SAFE_WITHHELD — APPROVED ASSET NOT AVAILABLE

Runtime / Gate modifications in this audit:
0

Push:
HOLD
```

Haptic-first 可以先于音频资产交付，但只能作为完整的 Single-Owner 原子迁移：建立唯一 `XinmaiSensoryRuntimeController` 与唯一 Host；删除正式 `LaunchLab` 的页面级声音和震动；删除 Gravity dormant tone；将 Legacy / Lab 感官代码从 Production Bundle 隔离；然后只让稳定 Ownership 表面中的真实 Crystal 按钮在可信用户手势内请求一次低强度 haptic。

第一把 Runtime **功能上只包含 Controller + Haptic**。它不包含声音文件、音频下载、合成 oscillator、`AudioContext`、声音开关或播放路径。音频策略作为独立 typed branch 固定返回 `AUDIO_SAFE_WITHHELD_ASSET_NOT_APPROVED`，等待已经启动的原创合成 cue 委托与权利验收。

---

## 1. 基线与阶段边界

```text
Remote / Audit Parent:
3edf3fd32c415145d56cd0f04a0bfe08e7deeccc

Audio Asset / Copyright Pack:
DELIVERED

Original Synthetic Cue Commission Brief:
DELIVERED / EXTERNAL COMMISSION NOT STARTED

Shippable audio asset:
0

C1:
CLOSED / PASS

C2:
CLOSED / PASS

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED
```

本审计：

- 只读扫描 Runtime、组件、类型、路由和既有 Gate；
- 不修改 Runtime、Gate、Renderer、CSS、Storage、Schema、Authority 或资产；
- 不触发 vibration；
- 不创建 AudioContext；
- 不运行设备长链；
- 只新增本审计文档。

---

## 2. 当前生产事实

### 2.1 正式 Ownership

`XinmaiCrystalFormationOwnershipMoment` 当前已经具备：

- 一个真实 `button.xinmai-crystal-ownership__crystal-touch`；
- 可访问名称“轻触这颗 Crystal，确认它来自这次现实回应”；
- `onClick={onOwnershipPresented}`；
- C1 Gate 明确禁止组件直接出现 `Audio(` 或 `navigator.vibrate`；
- 不读取 Storage 或 Formation Authority；
- Motion / Reduced Motion 静态 Crystal 都由同一 typed decision 驱动。

`XinmaiLivedResponseReturnSurface` 当前：

- 只在六态 checkpoint 为 `OWNERSHIP_PRESENTED` 且 Formation Receipt 存在时挂载 Ownership；
- current transaction 与 canonical recovery 都由现有 resolver 给出；
- 通过 `ownershipPresentedCrystalReferenceId` 记录页面内交互呈现，不写 Authority；
- `aria-live` 已用 reference key 去重，恢复不重复播报首次形成；
- Crystal 点击与 Continue 导航是两个独立按钮。

这是 Haptic-first 所需的合法用户手势表面，不需要新增第二按钮或从 Canvas 坐标猜测命中。

### 2.2 当前分散 Producer

```text
LaunchLab direct audio calls: 22
LaunchLab direct vibration calls: 24 + 1 local helper
GravityPage local AudioContext helper: 1 declaration / 0 callers
Formal Ownership direct audio/haptic calls: 0
Audio asset files: 0
```

`LaunchLab` 的既存 cue 来自页面局部 `makeAudio()`、oscillator 与 `vibrate()`。其中多个调用发生在 timer / animation 状态切换，而不是稳定 Ownership 用户手势；卸载时也没有关闭该 AudioContext。它不能与新 Owner 并存。

### 2.3 Production Bundle 中的 Lab / Legacy

`App.tsx` 当前静态导入 `LaunchPage`、`AxisLinePage`、`ChronoLab`、`BreachLab`、`GenesisLab`、`GoldenCaliperLab`、`MotherLab` 和 `StarbeastLab`，并无条件注册相应 Legacy / Lab 路由。这些文件含各自的 AudioContext 或 vibration 实现，因此只删除 `LaunchLab` 调用仍不能证明 Production Bundle 单 Owner。

冻结：正式 Production Bundle 中的 Lab / Legacy direct sensory code 必须为 0。Lab 可在 `import.meta.env.DEV` 的独立动态 bundle 中继续存在，但不得由正式 App 静态导入。

---

## 3. 为什么不必等待音频资产

Haptic 与 Audio 是两个独立 Presentation policy：

```text
Audio policy:
ASSET_NOT_APPROVED
→ AUDIO_SAFE_WITHHELD_ASSET_NOT_APPROVED
→ AudioContext count = 0
→ audio fetch / decode / playback = 0

Haptic policy:
user preference + trusted Crystal activation + capability + safety policy
→ one optional 12ms request
```

音频 `SAFE_WITHHELD` 不会把 Haptic 或 Ownership 一起扣留；Haptic 不会代替声音，也不能将 Audio 状态改为成功。原创 synthetic cue 通过权利、manifest 与设备验收后，未来只能扩展同一个 Controller，不能创建第二 Owner。

因此：

```text
Wait for audio before Haptic-first Runtime:
NO
```

---

## 4. 唯一 Owner 与 Host

### 4.1 唯一 imperative Owner

```text
XinmaiSensoryRuntimeController
```

它是 Production Bundle 中唯一允许调用 `navigator.vibrate` 的模块。Haptic-first 版本不得引用、构造或探测 `AudioContext`。

Controller 只持有短生命周期、内存级 Presentation 状态：

- 最近一次受理 activation 的 monotonic timestamp；
- 是否已有 haptic request 尚未释放；
- 是否已经 disposed；
- 当前 policy 是否 `ENABLED` 或 `SAFE_WITHHELD`。

这些都不是产品 Authority，不持久化，不进入 DOM，不生成用户画像。

### 4.2 唯一 React Host

```text
XinmaiSensoryPresentationHost
```

Host 在 App 根级别只挂载一次，负责：

- 创建唯一 Controller；
- 提供只读 request API；
- 读取瞬时 capability 和会话级用户偏好；
- 监听 `visibilitychange` / `pagehide` 以取消 haptic；
- unmount 时调用 `dispose()`；
- 不读取 Growth Storage；
- 不翻译声音 / 触觉为 Ownership 成功。

Host 与 Controller 不是两个 Authority。Host 负责 React 生命周期，Controller 独占 browser side effect。

### 4.3 纯策略 Resolver

```text
XinmaiSensoryPresentationPolicyResolver
```

Resolver 必须是纯函数，只返回非权威 decision。它不读取 DOM、Storage、timer、AudioContext 或 vibration API。

---

## 5. Haptic-first typed contract

### 5.1 输入

```text
XinmaiOwnershipHapticRequestInput

checkpointState:
  OWNERSHIP_PRESENTED

ownershipDecision:
  FORMATION_CONFIRMED | OWNERSHIP_PRESENTED | RECOVERED_EXISTING

successAuthority:
  IDB_TRANSACTION_COMPLETE

presentationOrigin:
  CURRENT_TRANSACTION | CANONICAL_RECOVERY

formationReferenceId
crystalReferenceId
bodyReferenceId
bodyImprintReferenceId

sameLifeSurfaceOutcome:
  MOTION_SAME_LIFE_SURFACE_PRESENTED
  | STATIC_SAME_LIFE_SURFACE_PRESENTED
  | SAME_LIFE_SURFACE_SAFE_WITHHELD

activation:
  TRUSTED_CRYSTAL_BUTTON_ACTIVATION

preference:
  HAPTIC_ALLOWED | HAPTIC_DISABLED

capability:
  vibrationAvailable
  documentVisible
  reducedMotionRequested
  saveDataRequested
```

### 5.2 为什么允许 `FORMATION_CONFIRMED`

首次触碰发生前，当前 Ownership resolver 的交互状态仍可为 `FORMATION_CONFIRMED`；同一点击随后才把页面内 interaction 标记为 `OWNERSHIP_PRESENTED`。为了在浏览器可信用户激活栈内请求 haptic，策略必须以：

```text
six-state checkpoint = OWNERSHIP_PRESENTED
+ valid receipt / crystal / body proof
+ real Crystal button trusted event
```

作为触发真源，不能等待 React state 更新后再由 effect 播放。等待 effect 会失去 user activation，并把页面状态变化错误变成触发者。

### 5.3 输出

```text
HAPTIC_REQUEST_ACCEPTED
HAPTIC_DISABLED_BY_USER
HAPTIC_UNAVAILABLE
HAPTIC_SUPPRESSED_REDUCED_MOTION
HAPTIC_SUPPRESSED_SAVE_DATA
HAPTIC_SUPPRESSED_BACKGROUND
HAPTIC_SUPPRESSED_RATE_LIMIT
HAPTIC_SAFE_WITHHELD

Audio branch:
AUDIO_SAFE_WITHHELD_ASSET_NOT_APPROVED
```

`HAPTIC_REQUEST_ACCEPTED` 只表示浏览器 API 接受请求，不声明硬件确实振动，也不改变任何产品事实。

---

## 6. 唯一触发与禁止触发

### 6.1 唯一触发

```text
real Crystal BUTTON
→ trusted click / pointer activation
→ synchronous pure policy decision
→ Controller.requestHaptic(12ms)
→ existing onOwnershipPresented continues independently
```

Controller 异常、API false 或 unsupported 都不能阻止既有 `onOwnershipPresented`、按钮视觉响应或 Continue。

### 6.2 禁止触发

以下不得调用 Controller：

- Formation transaction complete；
- Formation 动画、三拍或 timeout；
- `OWNERSHIP_PRESENTED` 状态 mount；
- `CANONICAL_RECOVERY` / `RECOVERED_EXISTING` mount；
- 页面加载、刷新、Back / Forward、Direct URL；
- body imprint 出现；
- Reality / Gravity / Archive；
- Continue 或导航；
- hover、focus、scroll、viewport enter；
- aria-live、DOM、CSS、Canvas、RAF；
- 商业提示或分析事件。

### 6.3 去重与节流

- 单次 request 使用 `12ms`，不得用 vibration pattern array；
- 同一 activation 只调用一次；
- `750ms` 内重复 activation 只保留第一次；
- 使用 `performance.now()` 比较，不用 timer 形成 Authority；
- hidden、pagehide、unmount 时由唯一 Owner 调用 `navigator.vibrate(0)` 取消；
- 不建立队列，不排队补发，不跨恢复保存。

---

## 7. 声音与触觉独立策略

### 7.1 Audio

```text
Approved audio manifest:
ABSENT

Audio policy:
SAFE_WITHHELD

AudioContext / oscillator / buffer / fetch:
0
```

Haptic-first Candidate 不得包含占位音、随机 tick、浏览器 beep、合成测试音或静默 AudioContext。

### 7.2 Haptic

Haptic 必须拥有独立会话偏好：

```text
HAPTIC_DISABLED (safe default)
HAPTIC_ALLOWED (explicit session opt-in)
```

P0 不新增 Storage。刷新后恢复 `HAPTIC_DISABLED`，不从设备能力猜测同意。

必须在 Ownership actions 内提供最小可访问控制：

```text
Visible label: 触感
Role: switch or equivalent real button
State: 开 / 关
Default: 关
```

开关自身不触发 vibration。只有用户开启后再真实触碰 Crystal 才能请求 ACK。未来声音有独立开关，不能复用“触感”状态。

---

## 8. 能力、权限与安全降级

| 条件 | Haptic | Audio | Ownership |
|---|---|---|---|
| `navigator.vibrate` 不存在 | `HAPTIC_UNAVAILABLE` | withheld | 完整 |
| vibration 返回 false | unavailable，不重试 | withheld | 完整 |
| vibration 抛错 / 平台拒绝 | unavailable，不显示技术错误 | withheld | 完整 |
| document hidden / pagehide | 取消，0 新请求 | withheld | 完整 |
| Save-Data = true | suppress | 0 fetch | 完整 |
| Reduced Motion = true | suppress | withheld | Static Ownership 完整 |
| Haptic preference off | suppress | 独立 withheld | 完整 |
| Same-Life Surface withheld | sensory withheld | withheld | 既有安全提示 / 资产保留 |
| Counter active | sensory withheld | withheld | C1 / C2 完整 |

### 8.1 权限边界

Web Vibration API 没有可依赖的独立权限申请流程。Runtime 不弹提示、不诱导修改系统设置；只把 API 缺失、false 或异常归为 `HAPTIC_UNAVAILABLE`。

### 8.2 低电量边界

既有 Pack 已冻结 Web 1.0 不读取或持久化 Battery Status。当前浏览器没有跨平台可信的低电量信号，因此 Runtime 不得声明“检测到低电量”。

Haptic-first 通过以下方式满足电量保护：

- safe default 为关闭；
- 只在用户主动开启后、可见页面、真实触碰时一次 `12ms`；
- 无循环、无队列、无后台、无 timer；
- Save-Data 与 Reduced Motion 直接 suppress；
- OS / 浏览器拒绝时不重试；
- 不采集、电量分桶或上传设备状态。

若未来平台提供经过审计的 coarse power-save signal，必须作为新的 capability 输入；本刀不新增 Battery API。Push Gate 只能记录“低电量专用信号不可观测但消耗被严格有界”，不得伪报低电量自动检测 PASS。

该限制不阻断 Haptic-first，因为单次显式 12ms 请求没有后台或持续能耗；它也不授权任何持续触觉。

---

## 9. Motion / Reduced Motion 独立性

- Motion 允许单次 Haptic ACK，但不增加视觉动画；
- Reduced Motion 始终 suppress Haptic；
- Static Presenter 与 WebGL Presenter facts 不变；
- Haptic outcome 不进入 `MOTION_SAME_LIFE_SURFACE_PRESENTED` 或 `STATIC_SAME_LIFE_SURFACE_PRESENTED`；
- WebGL Failure 仍由 Static Presenter 承接，Haptic 只看可信 Same-Life typed outcome；
- no WebGL / no vibration 平台获得相同 Crystal、Body Imprint 与 Continue；
- Haptic 不用来证明按钮命中；现有视觉和 aria state 继续负责交互反馈。

---

## 10. 性能与资源释放预算

| 项目 | P0 硬预算 |
|---|---|
| Haptic duration | `12ms`，单一数字值 |
| Haptic per accepted activation | `1` |
| Cooldown | `750ms` |
| New RAF | `0` |
| New timer | `0` |
| AudioContext | `0` |
| Audio fetch / decode / memory | `0` |
| Storage read / write | `0` |
| 同步 policy + dispatch | p95 `≤1ms`，上限 `4ms` |
| New long task | `>50ms = 0` |
| background requests | `0` |
| unmount / pagehide | immediate `vibrate(0)` cancellation |

Controller 不持有 Renderer、Canvas、AudioNode 或长期 listener；Host 卸载后所有 listener 必须释放。

---

## 11. 逐文件原子迁移边界

### 11.1 新增文件

| 文件 | 唯一责任 |
|---|---|
| `src/types/xinmaiSensoryPresentation.ts` | 非权威 input / decision / outcome、Audio withheld 与 Haptic policy 类型 |
| `src/services/xinmaiSensoryPresentationPolicyResolver.ts` | 纯策略；无 browser / Storage / DOM |
| `src/services/xinmaiSensoryRuntimeController.ts` | 唯一 `navigator.vibrate` Owner；无 AudioContext |
| `src/components/XinmaiSensoryPresentationHost.tsx` | 单例生命周期、session preference、visibility / pagehide、request context |
| `scripts/check-xinmai-sensory-single-owner.mjs` | Production Bundle / direct API Owner / Lab 隔离 Gate |
| `scripts/check-xinmai-ownership-haptic-policy.mjs` | trusted button、12ms、降级、recovery no-trigger、Audio withheld Gate |
| `scripts/check-xinmai-sensory-forward-counter.mjs` | Counter 与旧 producer 不复活 |

### 11.2 修改文件

| 文件 | 原子切换 |
|---|---|
| `src/App.tsx` | 根级只挂载一个 Host；Legacy / Lab sensory routes 仅 DEV 动态引入，Production 静态 import 为 0 |
| `src/components/XinmaiCrystalFormationOwnershipMoment.tsx` | 在真实 Crystal button handler 同步发 typed haptic request；现有 ownership callback 无条件继续；加入最小独立 Haptic switch |
| `src/components/XinmaiLivedResponseReturnSurface.tsx` | 只把已有 checkpoint、Receipt / Crystal / Body / Imprint / surface facts 单向传入；不在 effect 触发 |
| `src/pages/LaunchLab.tsx` | 删除 `makeAudio()`、22 个 audio 调用、local vibrate helper 与 24 个 vibration 调用 |
| `src/pages/GravityPage.tsx` | 删除 dormant `playCrystalUnderstandingTone()` 与误导性的声音成功描述 |
| `src/styles/xinmai-crystal-formation-ownership-moment.css` | 只增加 Haptic switch 的可见、焦点、窄视口布局；不改 Crystal 美术 |
| `scripts/check-xinmai-crystal-ownership-presentation.mjs` | 保持 Ownership 无直接 browser sensory API；允许 typed request callback |
| `package.json` | 注册新增 Gates，不删除或弱化既有 Gates |

### 11.3 保持不变的文件

- Formation / Eligibility / Lived Response Authority；
- Canonical Body Imprint Projector；
- Same-Life Renderer / Host 与 C2 CSS；
- Storage、Schema、IDB version；
- 音频 manifest placeholder 与所有音频资产（仍无发布资产）；
- AI / Prompt / Research / Monetization / Phase 4。

Lab 文件本身可以保留原型实现，但必须不进入 Production Bundle；不得为了本刀批量重写 Lab 体验。

---

## 12. 单提交与消费者切换顺序

Runtime Candidate 必须是一个原子提交，内部完成：

```text
1. types + pure policy
2. unique Controller + Host
3. root single Host mount
4. Ownership trusted request consumer
5. session Haptic preference control
6. LaunchLab old audio / vibration exit
7. Gravity dormant audio exit
8. Lab / Legacy production bundle isolation
9. Gates and package registration
```

不得交付以下中间态：

- 新 Controller 已存在但 LaunchLab 仍直接 vibrate；
- Haptic 已接入但旧 AudioContext 仍在 Production Bundle；
- Lab route 仍静态 import，多 Owner Gate 只扫描正式组件；
- Ownership 用 effect / state transition 触发；
- AudioContext 空壳先进入候选等待资产；
- Haptic 成功影响 `onOwnershipPresented` 或 Continue。

---

## 13. Gate 冻结

新增 Gate 必须证明：

1. Production `navigator.vibrate` 调用 Owner 精确为 1；
2. Production `AudioContext` / oscillator / audio asset / fetch 精确为 0；
3. `LaunchLab` direct audio / vibration 调用精确为 0；
4. `GravityPage` local AudioContext helper 精确为 0；
5. Lab / Legacy sensory modules 不在 Production Bundle；
6. Host mount count 精确为 1；
7. Controller 只允许 `navigator.vibrate(12)` 与 `navigator.vibrate(0)`；
8. pattern array、loop、queue 与 timer 精确为 0；
9. trusted real Crystal button 是唯一 request caller；
10. mount / effect / recovery / Formation / navigation request count 为 0；
11. Haptic 默认关闭、会话级、无 Storage；
12. Reduced Motion、Save-Data、hidden、API false / error suppress；
13. Audio typed branch恒为 `AUDIO_SAFE_WITHHELD_ASSET_NOT_APPROVED`；
14. Haptic outcome 不推进 C1 / C2 / navigation；
15. Counter 不复活旧 producer；
16. C1 / C2、Growth、Formation、Checkpoint 与 90/90+ 全部既有 Gate 回归。

Gate 不得以 DOM `data-*`、vibrate 返回 true 或 Console 无错误证明实际设备已振动。

---

## 14. Forward Counter

新 Runtime Candidate 的直接子提交只切换：

```text
Xinmai Sensory Presentation Policy:
ENABLED → SAFE_WITHHELD
```

Counter 行为：

- Audio 继续 `SAFE_WITHHELD_ASSET_NOT_APPROVED`；
- Haptic request 全部 `HAPTIC_SAFE_WITHHELD`；
- Host 可只读恢复偏好，但不得调用 vibration；
- 已有 Crystal button、Ownership interaction 与 Continue 保持；
- C1 Formation / Ownership 与 C2 Body Imprint / Same-Life Surface 保持；
- Receipt、Crystal、Body、Imprint 与 Semantic Mirror 保持；
- `LaunchLab.makeAudio()`、旧 vibrate、Gravity helper、Legacy / Lab producer 不恢复；
- 不修改 Storage、Schema 或 Authority；
- TypeScript、Build、全部 Gate 独立通过；
- Counter 本地，不单独推送。

普通 revert 不得作为正式回滚，因为会复活旧页面级 sensory producer。

---

## 15. Browser / Device Evidence Matrix

### 15.1 正向

- Haptic default off：Crystal touch visual / aria response PASS，vibrate 0；
- 用户开启 Haptic：toggle 自身 vibrate 0；
- Motion stable Ownership + trusted Crystal touch：一个 `12ms` request；
- Current transaction 与 recovered existing 均只在主动 touch 请求；
- Continue 不触发；
- haptic failure 不阻塞按钮或导航。

### 15.2 负向与恢复

- page load / refresh / Back / Forward：0；
- Formation pending / complete / animation：0；
- recovered mount：0；
- rapid double touch：一个 request；
- Direct URL / stale / identity mismatch / Same-Life withheld：0；
- Counter：0；
- multi-tab background tab：0。

### 15.3 能力与平台

- Android Chrome supported vibration；
- iOS / desktop no vibration；
- API false / exception；
- document hidden / app switch；
- Save-Data；
- native Reduced Motion；
- Motion + WebGL；
- WebGL Failure + Static Presenter；
- low-power specific detection：`NOT OBSERVABLE / NO BATTERY API`，但单次预算和无后台必须实证；
- 320×568、360×800、390×844、430×932、200% switch 与 Crystal 命中；
- VoiceOver / TalkBack 不重复播报声音或触觉“成功”。

### 15.4 工程

- TypeScript；
- Production Build；
- 完整 XINMAI Gates；
- Production Bundle direct AudioContext = 0；
- Production Bundle direct vibration Owner = 1；
- Acceptance / Fixture / fault injection = 0；
- new DB / Store / Index / Writer / Authority = 0；
- Counter independent Build / Gates；
- resource / listener cleanup。

---

## 16. 风险与停止条件

Runtime 施工中若出现以下任一项，立即停止并重新审计：

- 必须新增持久化偏好 Store；
- 必须让 Ownership 组件直接调用 navigator；
- 无法从 Production Bundle 隔离 Lab / Legacy Owner；
- 必须保留 LaunchLab page-local audio / vibration；
- Haptic request 只能由 effect、timer 或恢复状态触发；
- Audio asset / AudioContext 被提前引入；
- 需要改变 Formation、Body Imprint、Same-Life Surface 或 Checkpoint Authority；
- 需要第二 Host / Controller；
- 低电量要求被实现为设备画像或 Battery API 轮询；
- Counter 会恢复旧 producer。

这些属于 `MAJOR PREP / RE-AUDIT`，不能在 Runtime 中临场扩张。

---

## 17. 第一把可施工 Runtime

```text
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-SINGLE-OWNER-HAPTIC-FIRST-
ATOMIC-MIGRATION-P0

Traffic light:
RED

Knife type:
Migration Blade / Atomic Consumer Cutover

Decision:
APPLICATION READY

Functional scope:
CONTROLLER + HAPTIC ONLY

Audio:
SAFE_WITHHELD / NO ASSET / NO AUDIOCONTEXT

Push:
HOLD UNTIL INDEPENDENT GATE
```

“Controller + Haptic only”不等于只新增两个文件。为了满足唯一 Owner，它必须在同一个提交中完成旧正式调用退出、Lab / Legacy Production Bundle 隔离、Ownership consumer、会话偏好、Gates 与 Forward Counter。

原创 synthetic audio acquisition 可以并行继续，但不得被 cherry-pick 到该 Haptic-first Candidate。

---

## 18. 最终状态

```text
Single-Owner Haptic-first Architecture:
FROZEN / PASS

Haptic-first Runtime Application:
READY

Audio Runtime:
WAITING FOR APPROVED ASSET

Audio fallback:
SAFE_WITHHELD / SILENT

C1 / C2:
UNCHANGED / CLOSED

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED

Research Execution:
BLOCKED BY PHASE 3 EXPERIENCE CLOSURE

Monetization Runtime:
DEFER

Push:
HOLD
```

最终裁决：不必等待声音资产即可先施工单一 Sensory Owner 与一次低强度 Haptic ACK。该 Runtime 的产品功能只包括 Controller + Haptic；所有旧正式声音和震动必须同时退出，Audio 始终安全扣留。这样未来声音资产通过后只会进入同一个 Owner，而不会在 C1 / C2 旁边再长出第二套感官 Runtime。
