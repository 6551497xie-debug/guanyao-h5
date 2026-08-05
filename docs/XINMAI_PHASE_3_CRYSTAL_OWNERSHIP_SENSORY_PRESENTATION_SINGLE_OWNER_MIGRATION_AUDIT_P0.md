# XINMAI Phase 3 Crystal Ownership Sensory Presentation Single-Owner Migration Audit P0

## 0. 审计裁决

```text
Knife:
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-PRESENTATION-SINGLE-OWNER-
MIGRATION-AUDIT-P0

Traffic light:
RED

Knife type:
Migration Audit / Sensory Producer Atomic Cutover

Decision:
AUDIT ONLY

Final verdict:
MAJOR PREP REQUIRED

C3 Runtime:
NOT AUTHORIZED

Audio Asset + Copyright Pack:
REQUIRED BEFORE AUDIBLE RUNTIME APPLICATION

Push:
HOLD
```

单一 Sensory Runtime 的架构已经可以冻结；阻断 Runtime 的最早事实不是 C1 / C2 Authority，也不是浏览器 API 不可用，而是当前仓库没有任何可投产音频资产、出处清单或商业许可证明。与此同时，正式 `LaunchLab` 仍直接持有页面级 WebAudio 与 vibration，若在 Ownership 上直接增加新 Cue，会形成并存执行器、恢复重播、资源无法统一释放及回滚无法原子完成的风险。

因此下一步必须先建立音频资产与版权包。该包通过后，才允许申请本审计冻结的 Single-Owner Atomic Migration；不能先把无出处古琴 / 磬钵素材接入 Runtime，再补许可。

最高产品原则保持：感官反馈只能回应用户已经完成的真实行动；声音、触觉、动画完成或浏览器 API 返回值都不能形成、确认或增强 Growth Authority。

---

## 1. 基线、证据与禁止范围

### 1.1 精确基线

```text
Remote / Audit Parent:
9a407898a02e4c8627898607227f7ca212f7ec44

Parent of Readiness delivery:
674c844c18e0e5435704c9bf7580cdcf43f371d2

C1:
CLOSED / PASS

C2:
CLOSED / PASS

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED
```

上游 Readiness 文档已经精确交付。本审计在其远程 HEAD 的隔离干净工作树中只读清点源码、路由、现有 Gate 与资产目录。

### 1.2 本刀未发生的修改

```text
Runtime diff: 0
Renderer diff: 0
CSS diff: 0
Gate diff: 0
Storage / Schema / Authority diff: 0
Audio asset diff: 0
Page copy diff: 0
```

本刀不播放声音、不触发震动、不运行用户链、不启动 Android / AVD，也不把原型或旧 Lab 的感官表达误认成正式 1.0 产品能力。

---

## 2. 既存 Sensory Producer 完整清点

### 2.1 仓库级事实

只读扫描得到：

```text
包含 AudioContext / webkitAudioContext 的 src 文件：11
包含 navigator.vibrate / vibration 调用的 src 文件：15
LaunchLab audio.form / gather / tick 调用：22
LaunchLab vibrate 行：25（其中 1 行是本地 helper，24 个调用点）
正式 Ownership 两组件的 WebAudio / vibration 调用：0
<audio> / new Audio() / HTMLAudioElement 正式使用：0
正式音频文件：0
音频 provenance / commercial license manifest：0
音频依赖包：0
```

未发现 `mp3`、`wav`、`ogg`、`opus`、`m4a`、`aac`、`flac`、`caf` 或 `aiff` 音频资产。

### 2.2 生产、遗留与实验性 Producer 分类

| 文件 / 表面 | WebAudio | vibration | 当前身份 | 当前消费者 | 审计结论 |
|---|---:|---:|---|---|---|
| `src/pages/LaunchLab.tsx` | 页面局部 `makeAudio()`；1 个 lazy context；oscillator `gather/form/tick` | 页面局部 helper，24 个调用点 | 正式 `/`、`/launch`、`/launch-lab` 与 returning life world | 正式生产用户 | **必须原子退出直接 API** |
| `src/pages/GravityPage.tsx` | 独立 `playCrystalUnderstandingTone()` | 0 | 正式 Gravity | helper 调用点为 0；仅残留声明与 `data-crystal-sound` 描述 | **删除 dormant producer；描述不得冒充声音** |
| `src/pages/LaunchPage.tsx` | 模块级 `_audioCtx` | 3 | `/launch-legacy` | Legacy | **不得进入正式 C3 Owner；生产 bundle 隔离** |
| `AxisLinePage` | 独立 rig，含局部 mute 与 close | 有 | Lab | `/axis-lab` | Lab-only；不得成为正式 Consumer |
| `ChronoLab`、`BreachLab`、`GenesisLab`、`GoldenCaliperLab`、`MotherLab`、`ReturnLab`、`StarbeastLab` | 各自页面局部 context / oscillator | 有 | Lab / prototype | Lab 或 redirect | Lab-only；不得进入正式 Production Bundle |
| `ChronoAxisDualEngine`、`DefaultReactionScreen`、`HexagramStampPage`、`MotherFieldEngine`、`PressureSeedCrossAxisPage` | 0 | 有 | 历史 / Lab 组合组件 | 非当前正式 C1 / C2 Consumer | 隔离，不得被正式 Host 复用 |
| `XinmaiCrystalFormationOwnershipMoment` | 0 | 0 | 正式 C1 Ownership Presenter | `XinmaiLivedResponseReturnSurface` | **保持纯 Presentation，不直接持有 API** |
| `XinmaiLivedResponseReturnSurface` | 0 | 0 | 正式 Fact → Formation → Ownership Consumer | `LaunchLab` returning surface | **未来只发 typed request，不直接持有 API** |

### 2.3 App 路由与 Bundle 风险

`App.tsx` 当前静态导入 `LaunchPage` 及多个 Lab 页面，并为 `/launch-legacy`、`/axis-lab`、`/golden-lab`、`/genesis-lab`、`/chrono-lab`、`/mother-lab`、`/breach-lab`、`/starbeast-lab` 无条件注册路由。只有 Acceptance / Dynamics fixture 已受 `import.meta.env.DEV` 保护。

因此，即使这些 Lab 不属于正式产品 Authority，其直接 WebAudio / vibration 实现仍可能进入 Production Bundle。C3 不能仅在 Ownership 组件内新增一个 Controller，然后声称生产环境只有一个 Owner。

冻结：

```text
Formal production browser sensory owner count after migration: 1
Direct AudioContext constructors outside owner in production bundle: 0
Direct navigator.vibrate calls outside owner in production bundle: 0
Lab / legacy sensory code in production bundle: 0
```

Lab 可以保留独立实验实现，但必须通过 Development-only route / bundle 边界隔离；不能由正式 Host 静态导入。

### 2.4 LaunchLab 的具体风险

`LaunchLab` 当前 `makeAudio()`：

- 在第一次 `ensure()` 时创建 `AudioContext`；
- `form()` 并发启动 392、523.25、784Hz 三个 oscillator，持续约 1.6–2.0 秒；
- `gather()` 并发启动三个约 2.4 秒 oscillator；
- `tick()` 使用 `880 + Math.random() * 220`，不具确定性；
- 多个 timer / animation state transition 会调用 `audio.form()` 或 vibration；
- pointerdown 会调用 `audio.ensure()`，但之后的页面状态推进仍可在用户激活栈之外再次触发 Cue；
- 组件卸载只取消 RAF 和 DOM listener，没有调用 AudioContext `suspend()` 或 `close()`；
- 没有正式、独立的 sound / haptic 用户开关；
- vibration pattern 包含多段与超过 C3 P0 单拍预算的序列。

该实现可以视为历史页面表现，但不能成为正式 Ownership Cue 的 Owner，也不能通过把 Ownership Cue 再接进 `makeAudio()` 来延续。

### 2.5 Gravity 的 dormant helper

`GravityPage` 的 `playCrystalUnderstandingTone()` 每次调用都会新建一个 `AudioContext`，播放短 sine tone 后关闭；当前调用点为 0。`data-crystal-sound="ONE_RESTRAINED_TONE"` 只是 DOM 描述，不是 typed Outcome，也不是播放证据。

冻结：该 helper 在原子迁移中退出。未来 Gravity 不消费 Ownership 声音，也不从 DOM 属性触发 Cue。

---

## 3. 当前生产者 / 消费者图

### 3.1 当前不合法的分散结构

```text
LaunchLab local scene / timer / pointer state
  ├─ local makeAudio() → AudioContext / oscillator
  └─ local vibrate()   → navigator.vibrate

GravityPage
  └─ dormant local tone helper → separate AudioContext

Legacy / Lab pages (statically imported)
  └─ multiple local AudioContext / vibration owners

C1 / C2 typed Ownership
  └─ no sensory executor
```

### 3.2 目标单向结构

```text
Existing C1 / C2 typed presentation facts
  + trusted user activation
  + independent user preferences
  + ephemeral browser capability facts
        ↓
Pure XinmaiOwnershipSensoryPresentationResolver
        ↓
non-authoritative Sensory Request Decision
        ↓
XinmaiSensoryPresentationHost
        ↓
XinmaiSensoryRuntimeController
  ├─ the only AudioContext owner
  └─ the only navigator.vibrate caller
        ↓
optional execution outcome

Execution outcome NEVER flows back to:
Fact / Eligibility / Formation / Crystal / Body Imprint /
Same-Life Surface / Navigation / Growth Authority
```

---

## 4. 唯一 Sensory Runtime Owner 裁决

### 4.1 唯一资源 Owner

冻结唯一浏览器资源 Owner：

```text
XinmaiSensoryRuntimeController
```

允许存在一个 React 生命周期外壳：

```text
XinmaiSensoryPresentationHost
```

二者不是两个 Authority：Host 只负责在 App 生命周期中创建、销毁和提供唯一 Controller；Controller 才是 `AudioContext`、AudioBuffer、source node、gain node、vibration dispatch、节流与释放的唯一 imperative Owner。

### 4.2 Pure Resolver

`XinmaiOwnershipSensoryPresentationResolver` 是纯函数，不读取浏览器或 Storage，不持有状态机。它只把既有 typed facts 与当次能力 / 用户偏好映射为一次非权威决定：

```text
READY_FOR_EXPLICIT_ACTIVATION
SUPPRESSED_BY_SOUND_PREFERENCE
SUPPRESSED_BY_HAPTIC_PREFERENCE
SUPPRESSED_BY_DATA_POLICY
SUPPRESSED_BY_VISIBILITY_POLICY
UNAVAILABLE
SAFE_WITHHELD
```

这不是第二套 Growth、Formation 或 Relationship 状态机。

### 4.3 唯一正式 C3 P0 Consumer

P0 唯一正式 Sensory Consumer 冻结为：

```text
OWNERSHIP_PRESENTED
+ trusted activation of the real Crystal BUTTON
→ request at most one optional acknowledgement
```

Reality、Gravity、Archive、页面加载、Formation transaction completion、动画完成、恢复挂载和 Continue 导航都不是 C3 P0 触发者。

---

## 5. Typed 输入、输出与 Authority 边界

### 5.1 最小输入

未来最小契约：

```text
XinmaiOwnershipSensoryPresentationInput

ownershipDecision:
  existing XinmaiCrystalOwnershipPresentationDecision

checkpointDecision:
  existing XinmaiLivedResponseCheckpointPresentationDecision

bodyImprintDecision:
  existing XinmaiCanonicalBodyImprintDecision

sameLifeSurfaceOutcome:
  existing XinmaiSameLifeSurfaceOutcome | null

activation:
  TRUSTED_CRYSTAL_BUTTON_ACTIVATION

presentationOrigin:
  CURRENT_TRANSACTION | CANONICAL_RECOVERY

motionPreference:
  MOTION | REDUCED_MOTION

capability:
  audioContextAvailable
  vibrationAvailable
  documentVisible
  saveDataRequested

userPreference:
  SOUND_ALLOWED | SOUND_MUTED
  HAPTIC_ALLOWED | HAPTIC_DISABLED
```

### 5.2 必须成立的 proof

发出请求前必须由现有 typed facts 证明：

- checkpoint 为 `OWNERSHIP_PRESENTED`；
- Ownership 成功来源为 `IDB_TRANSACTION_COMPLETE`；
- Receipt / Crystal / Body Imprint / Body Reference 与现有 C1 / C2 决定一致；
- same-life surface 没有 `SAFE_WITHHELD`；
- activation 来自真实 Crystal `BUTTON` 的 trusted user activation；
- 当前页面可见；
- sound 与 haptic 分别通过用户偏好和能力策略。

### 5.3 明确禁止输入

以下不得成为 Resolver 或 Controller 的成功输入：

- DOM、`data-*`、CSS class、SVG path 或视觉坐标；
- RAF、frame count、动画结束、timeout；
- Console、声音结束、振动返回值；
- 页面本地 `formed` / `presentDone` 等布尔值；
- Storage 直接读取；
- Receipt 的原始数据库扫描；
- AI、人格、Mother Code、八卦、用户脆弱度；
- 设备性能或电量画像。

### 5.4 非权威执行结果

```text
PLAYED_AFTER_USER_ACTIVATION
HAPTIC_DISPATCHED_AFTER_USER_ACTIVATION
MUTED_BY_USER
HAPTIC_DISABLED_BY_USER
UNAVAILABLE
BLOCKED_BY_BROWSER
SUPPRESSED_BY_POLICY
SAFE_WITHHELD
```

任何结果都不得反写 Authority、改变 Crystal / Imprint、触发导航或阻塞 Continue。

---

## 6. 用户手势、恢复与重复触发契约

### 6.1 用户激活

- `AudioContext` 创建或 resume 必须在真实 Crystal 按钮的 trusted activation stack 内发生；
- 不能用页面任意 pointerdown 预解锁所有后续声音；
- 不能由 timer、effect、transaction complete、mount 或 route event 代替用户激活；
- 浏览器拒绝时保持完整静默体验，不显示技术错误；
- 不通过事件注入、DOM click 或 synthetic event 取得授权。

### 6.2 首次形成与恢复

| 状态 | 自动 sound | 自动 haptic | 主动 Crystal touch |
|---|---:|---:|---|
| Formation transaction pending | 0 | 0 | 不可请求成功 Cue |
| `CURRENT_TRANSACTION` / Ownership first presented | 0 | 0 | 可请求一次克制 Cue |
| `CANONICAL_RECOVERY` / `RECOVERED_EXISTING` | 0 | 0 | 可请求一次更克制 recall Cue |
| refresh / Back / Forward | 0 | 0 | 不主动触碰则 0 |
| Same-Life surface withheld | 0 | 0 | `SAFE_WITHHELD` |

恢复不重播 Formation Cue。Controller 只在内存中对同一个 trusted activation 做去重和节流；不得新增持久化“已播放”Writer。快速重复触碰不能叠音、排队振动或重建 context。

---

## 7. 声音与触觉的独立用户控制

冻结两条完全独立的 Presentation Preference：

```text
Sound:  SOUND_ALLOWED | SOUND_MUTED
Haptic: HAPTIC_ALLOWED | HAPTIC_DISABLED
```

规则：

- 可分别关闭，不得以一个“沉浸模式”捆绑；
- 关闭声音不关闭触觉，关闭触觉不关闭声音；
- 默认与首次提示必须清晰、可见、可访问，不能藏在 aria 名称中；
- P0 只允许会话级偏好；如要持久化，必须另行审计 Store、Reader、隐私和多标签一致性；
- 用户拒绝后不反复提示；
- 开关状态不进入 Identity、Growth、商业画像或分析事件；
- 系统静音不能被可靠读取时，播放失败即静默，不猜测用户意图；
- iOS / 桌面 vibration 不可用是正常降级。

为避免惊扰，Runtime 申请必须在实现前明确默认值与控件可见位置。当前审计冻结的安全默认是：未取得明确会话选择时 `SOUND_MUTED + HAPTIC_DISABLED`。若产品希望默认开启，必须重新进行可访问性与用户同意审查，不能在施工中临场改变。

---

## 8. 能力、权限与降级矩阵

| 环境 / 状态 | 声音 | 触觉 | 视觉 / Authority | 结果 |
|---|---|---|---|---|
| AudioContext 不存在 | 不创建 | 按独立偏好 | 不变 | `UNAVAILABLE` |
| autoplay / browser policy 拒绝 | 不重试骚扰 | 按独立偏好 | 不变 | `BLOCKED_BY_BROWSER` |
| `navigator.vibrate` 不存在或返回 false | 按独立偏好 | 不替代、不伪成功 | 不变 | haptic unavailable |
| Save-Data = true | 不 fetch / decode | 默认抑制 | 不变 | `SUPPRESSED_BY_DATA_POLICY` |
| document hidden / app background | stop + release | 0 | 不变 | `SUPPRESSED_BY_VISIBILITY_POLICY` |
| offline / asset fetch fail | 静默 | 按独立偏好 | 不变 | retry 不阻塞 |
| low-memory / decode fail | 立即释放 | 按独立偏好 | 不变 | no retry storm |
| browser permission / capability denied | 不诱导开启 | 不绕过 | 不变 | optional enhancement absent |
| system low-power / low battery | 不轮询，不读 Battery API；依赖浏览器节流并安全静默 | 0 | 不变 | silent fallback |

### 8.1 低电量边界

Web 1.0 不新增 Battery Status API 读取。该 API 不具跨浏览器稳定性，并会形成不必要的设备状态采集。低电量要求通过以下可验证约束满足：

- 不预加载；
- cue 短且单次；
- hidden 时立即停止；
- Save-Data 静默；
- Context 及时 suspend / close；
- 无轮询、无后台 timer、无性能画像。

未来若原生容器提供明确 typed power-saver signal，必须作为新的 Presentation Capability 审计，不得由页面猜测。

---

## 9. Motion / Reduced Motion / WebGL Failure 独立性

感官策略与 Same-Life Surface Outcome 是正交关系：

```text
Motion / Reduced Motion / WebGL Failure
→ decide visual presenter only

Sound / Haptic user preference + trusted activation + capability
→ decide optional sensory acknowledgement only
```

冻结：

- Motion 不允许额外奖励音阶、叠音、连续震动或第二视觉高潮；
- Reduced Motion 仍在 Renderer 创建前选择 Static Presenter，WebGL Context 为 0；
- Reduced Motion 默认不振动；用户独立启用后也只能一拍 10–20ms；
- Reduced Motion 的可选声音不得扫频、做空间移动或用声音替代静态归属；
- WebGL Failure 进入同一 Static Presenter；感官失败不能掩盖 surface failure；
- Same-Life Surface `SAFE_WITHHELD` 时感官必须同时 withheld；
- 声音是否播放不改变 `MOTION_SAME_LIFE_SURFACE_PRESENTED` 或 `STATIC_SAME_LIFE_SURFACE_PRESENTED`。

---

## 10. 音频资产 Provenance 与许可裁决

### 10.1 当前缺口

```text
Shippable audio asset: 0
Content hash manifest: 0
Commercial-use license evidence: 0
Cultural / product review: 0
```

因此任何“古琴”“磬钵”或相似传统器物采样现在都不能进入 Runtime。

### 10.2 必须先交付的资产包

每个候选资产必须具备：

```text
assetReferenceId
fileName
contentHash
sourceType: ORIGINAL_RECORDING | LICENSED_SAMPLE | SYNTHESIZED
creator / performer / recorder / licensor
license text and commercial-use scope
territory / term / attribution requirements
derivative-edit and normalization permission
original source URL or custody record
recording consent where applicable
edit / mastering / loudness chain
duration / encoded size / decoded-memory estimate
reviewedAt / reviewer
cultural representation review
```

合成音也必须进入 manifest，并说明生成方法、工具与权利来源。当前 `Math.random()` oscillator tick 不得作为正式资产，也不能以“代码生成”绕过 provenance。

### 10.3 声音产品契约

- 一次用户触碰最多一个 cue；
- 总时长 `≤ 600ms`；
- 低起音、短衰减、无强亮 attack；
- 禁止上行胜利音阶、金币声、老虎机节奏、奖励和弦；
- 不按 Crystal 数量、稀有度、人格、Mother Code 或脆弱度分配等级；
- 不宣称普通合成音是某一真实古琴或磬钵录音；
- 无声音不降低 Ownership 完整性。

### 10.4 结论

```text
Audio Asset + Copyright Pack before Runtime:
MANDATORY
```

资产与版权包是当前最小下一刀。它不解锁运行代码；只有来源、商业许可、文化审查、性能预算和候选 cue 同时通过后，Single-Owner Runtime 才可申请施工。

---

## 11. 性能、内存、流量与电量预算

| 预算 | 冻结值 |
|---|---|
| 新 WebGL Context | 0 |
| 新持续 RAF | 0 |
| 新 full-screen filter / bloom | 0 |
| AudioContext | 全 App 同时最多 1 |
| 活跃 source node | 同时最多 1 |
| 单次同步触发工作 | p95 `≤ 4ms` |
| 新增 long task | `>100ms = 0` |
| 缓存后 activation → cue start | p95 `≤ 100ms`，超限静默 |
| 单次 cue | `≤ 600ms` |
| 单次 haptic | `10–20ms`，最多一拍 |
| 压缩音频总量 | `≤ 256KiB` |
| 首次触发单资源下载 | `≤ 128KiB` |
| decoded audio 常驻内存 | `≤ 1MiB` |
| cue 结束后 context suspend / close | `≤ 1s` |
| hidden / unmount / navigation | 立即 stop / disconnect / release |
| Save-Data | 0 fetch / 0 decode |
| background | 0 audio / 0 vibration / 0 polling |

低端 Android 仍须先呈现 Crystal、Ownership、同体留痕和继续入口。资产下载、解码或播放都不能阻塞视觉或主线程交互。

---

## 12. 原子消费者切换

### 12.1 同一提交必须完成

1. 建立纯 `XinmaiOwnershipSensoryPresentationResolver`；
2. 建立唯一 `XinmaiSensoryRuntimeController` 与 App 生命周期 Host；
3. 将真实 Crystal `BUTTON` 的 trusted activation 转换为一次 typed sensory request；
4. 将 sound / haptic 独立偏好接入 Resolver；
5. 删除 `LaunchLab` 的 `makeAudio()`、全部正式 `audio.form/gather/tick` 与直接 `vibrate` 路径；
6. 删除 `GravityPage` dormant tone helper 与非事实声音宣称；
7. 将 Legacy / Lab sensory routes 从 Production Bundle 隔离；
8. 保持 C1 / C2 Authority、Formation、Same-Life Renderer、CSS 与文案因果不变；
9. 注册全部 Single-Owner、recovery、capability、asset、budget 与 Counter Gates；
10. 形成直接子提交 Forward Counter。

不得出现“新 Ownership Owner 已上线，但旧 LaunchLab 调用仍在生产”的中间交付。

### 12.2 建议文件边界

新增或调整范围预计包含：

```text
src/types/xinmaiOwnershipSensoryPresentation.ts
src/services/xinmaiOwnershipSensoryPresentationResolver.ts
src/services/xinmaiSensoryRuntimeController.ts
src/components/XinmaiSensoryPresentationHost.tsx
src/components/XinmaiCrystalFormationOwnershipMoment.tsx
src/components/XinmaiLivedResponseReturnSurface.tsx
src/pages/LaunchLab.tsx
src/pages/GravityPage.tsx
src/App.tsx
audio provenance manifest + approved hashed asset(s)
scripts/check-xinmai-ownership-sensory-*.mjs
package.json gate registration
```

若施工发现必须新增 Storage Writer、Schema、数据库、持久化偏好 Store、第二 Audio Owner 或改写 Formation / Body Imprint Authority，必须停止并重新审计。

---

## 13. Gate 冻结

Runtime 申请至少必须新增并注册：

1. Production Bundle 只有一个 `AudioContext` 创建 Owner；
2. Production Bundle 只有一个 `navigator.vibrate` 调用 Owner；
3. 正式页面与 Ownership 组件不得直接调用 browser sensory API；
4. trusted Crystal button activation 是唯一 P0 trigger；
5. transaction complete / mount / timer / animation / recovery 自动触发为 0；
6. `CURRENT_TRANSACTION` 与 `CANONICAL_RECOVERY` 不自动播放；
7. sound / haptic 独立偏好与安全默认；
8. Save-Data / visibility / capability 拒绝降级；
9. Motion / Reduced Motion / WebGL Failure 不改变 sensory authority；
10. Same-Life Surface withheld 时 sensory 同步 withheld；
11. 所有 shipped audio 均有 manifest、hash 与商业许可；
12. 时长、体积、解码内存、Context 数、haptic 时长和释放预算；
13. Production Bundle 不含 Lab / Legacy direct sensory producers；
14. C1 / C2 Gate、typed IDs、恢复不重播和 Continue 导航全部回归；
15. Counter 不恢复任何旧 page-local producer。

门禁不能通过字符串存在断言伪造浏览器成功；真机仍需验证用户激活、静音、无 vibration、后台与资源释放。

---

## 14. Forward Counter 与回滚单位

新 Runtime Candidate 的直接子提交必须只切换：

```text
Ownership Sensory Presentation Policy:
ENABLED → SAFE_WITHHELD
```

Counter 必须：

- 停止新音频加载、播放与 vibration；
- 关闭 / 释放现有 Sensory Runtime 资源；
- 保留 C1 Formation、Ownership、Crystal 按钮与 Continue；
- 保留 C2 Canonical Body Imprint、Same-Life Surface 与 Semantic Mirror；
- 保留所有 Receipt、Crystal、Body、Imprint 与恢复资产；
- 不恢复 `LaunchLab.makeAudio()`、随机 tick、Gravity helper、Legacy Owner 或 Lab Producer；
- 不把静默视为产品失败；
- TypeScript、Build 与完整 Gates 通过；
- 本地保留，不单独推送。

普通 git revert 不得成为回滚单位，因为它可能复活旧页面级 Owner。正式回滚必须使用 forward-safe policy Counter。

---

## 15. Browser / Device 验收矩阵

### 15.1 正向

- 当前 transaction Ownership：无触碰时 sound 0 / haptic 0；
- Crystal trusted touch：最多一个 cue 与一个短 haptic；
- cue 失败仍可触摸、继续和恢复；
- Motion / Reduced Motion 呈现同一 Receipt / Crystal / Imprint / Body / Node；
- VoiceOver / TalkBack 不重复朗读 Cue 名称或成功；
- 320×568、360×800、390×844、430×932、200% 命中不回退。

### 15.2 恢复与重复

- refresh、Back / Forward、Direct URL recovery：自动 sound 0 / haptic 0；
- `RECOVERED_EXISTING` 不重播首次 Formation；
- 快速多击不叠音、不排队震动、不建第二 context；
- 多标签每个 visible page 都不能后台播放；
- hidden / pagehide / unmount 后 active nodes 0、context 及时释放。

### 15.3 能力与策略

- sound muted；
- haptic disabled；
- vibration unavailable / returns false；
- WebAudio missing / suspended / rejected；
- Save-Data；
- offline / fetch fail / decode fail；
- background / app switch；
- low-end Android performance and memory；
- Reduced Motion；
- WebGL Failure Static Presenter；
- Counter SAFE_WITHHELD。

### 15.4 资产与 Bundle

- hashed Production Bundle；
- `/@vite/client = 0`；
- Acceptance / Fixture / fault injection = 0；
- Lab / Legacy sensory direct producers = 0；
- shipped audio 文件、content hash 与 manifest 一致；
- 未授权候选资产 = 0。

---

## 16. 商业、文化与伦理边界

- Crystal、Ownership、Body Imprint 与完整无障碍语义继续免费；
- 不售卖“更响”“更强震动”“更高等级”的成长事实；
- 不按人格、Mother Code、八卦、脆弱度或设备能力决定音色价值；
- 不在 Pressure、Gravity、Choice、Return、Formation 或 Ownership 中展示付费提示；
- 不记录声音开关、振动能力、Save-Data 或设备弱势状态用于营销、召回或定价；
- 古琴 / 磬钵只可作为经过许可与文化审查的材质来源，不得变成命运、民族或人格标签；
- 不庆祝、不评分、不宣布胜利、不制造奖励爆点；
- 不把无声、无振动或低性能设备描述为残缺体验；
- 不扩张为 Crystal 乐器、收藏琴键、声纹人格或 Phase 4 圣所。

---

## 17. 下一刀与 Runtime 出口

### 17.1 立即下一刀

```text
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-AUDIO-ASSET-PROVENANCE-
AND-COPYRIGHT-PACK-P0

Traffic light:
YELLOW

Knife type:
Asset / Rights / Cultural Review Prep

Decision:
NEXT — PREP ONLY

Runtime:
DEFER
```

该刀只建立候选 cue、来源与保管链、商业许可、衍生编辑权、文化审查、hash / manifest、时长 / 体积 / 解码预算和静默降级证明；不得接入产品。

### 17.2 资产包通过后的 Runtime 刀

```text
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-PRESENTATION-SINGLE-OWNER-
ATOMIC-MIGRATION-P0

Traffic light:
RED

Knife type:
Migration Blade / Atomic Consumer Cutover
```

该 Runtime 必须在一个原子候选中完成新 Owner 建立、Ownership Consumer 接入、LaunchLab 旧调用退出、Gravity dormant helper 退出、Lab / Legacy Production Bundle 隔离、Gates 与新 Counter。

---

## 18. 最终状态

```text
C1:
CLOSED / PASS

C2:
CLOSED / PASS

C3 Single-Owner Architecture:
FROZEN

C3 Runtime Application:
MAJOR PREP REQUIRED

Audio Asset + Copyright Pack:
MANDATORY BEFORE RUNTIME

Current sensory ownership:
NON-UNIQUE / FORMAL LAUNCHLAB DIRECT CALLS STILL PRESENT

Runtime / Asset / Gate modifications in this audit:
0

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

最终结论：单一 Owner、输入边界、降级策略、原子切换和回滚单位均可冻结；但仓库当前没有一颗可合法投产的声音资产。先完成资产与版权包，再进入 Single-Owner Runtime，是唯一不会把原型声音、未授权采样或第二套感官 Authority 带进 Phase 3 的顺序。
