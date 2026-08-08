# XINMAI Phase 3｜Genesis Birth Coordinate Spatial Interaction Single-Owner Atomic Migration Audit P0

```text
Task:
XINMAI-PHASE-3-GENESIS-BIRTH-COORDINATE-
SPATIAL-INTERACTION-SINGLE-OWNER-
ATOMIC-MIGRATION-AUDIT-P0

Traffic Light:
RED

Knife:
Migration Audit / Input + Presentation Consumer Cutover

Decision:
NOW — ATOMIC MIGRATION APPLICATION READY

Runtime / Renderer / CSS / Gate / Authority / Storage / Schema / Copy / Asset:
0 changes

Parent / Remote:
331c3521288205904fa3e050c7362542ef1dd43e

Push:
HOLD
```

## 0. 唯一裁决

V2 必须一次性把新用户 Birth → Genesis 路径从“Canvas 同时负责输入、视觉和提交”切换为：

```text
XinmaiGenesisBirthCoordinateInputSession（页面会话内、非持久、非Authority）
→ native controls（唯一输入与确认入口）
→ XinmaiGenesisBirthCoordinateAdmissionController（唯一确认编排Owner）
→ 既有 engine / LaunchLifeSourceSession / visual context / persistence / handoff
→ V1 XinmaiContinuousSceneHost（只读展示 accepted facts）
→ Genesis existing typed runtime / native LIFE_ORIGIN + recognition controls
```

同一 Runtime 提交必须同时退出：

- ENTRY_BIRTH 的 `HOST_CANVAS` pointer owner；
- Canvas 背景/轮外点击确认；
- Canvas 内 `m.coords` 作为正式确认输入；
- Birth path 的旧 `audio.*` / `navigator.vibrate`；
- `setTimeout` 后自动进入 Genesis 的成功路径；
- 空黑“轻触星河”但没有实际对象的操作面；
- Genesis 阶段仅靠字幕/计时推进的用户操作资格。

这是一把 Presentation consumer migration，不改变 Identity、Mother Code、Starbeast、session schema、Storage、route admission、Genesis recognition、C1/C2 或 V1 Scene outcome。

## 1. 当前 Owner / Producer / Writer 全量清点

### 1.1 Birth input 与视觉

| 项 | 当前 Owner | 输入 | 输出 | 持久效果 | 审计结果 |
|---|---|---|---|---|---|
| ENTRY_BIRTH Scene registration | `LaunchLab` | route state + public refs | V1 registration | 0 | 保留 consumer，但 pointer mode必须切为 `NONE`。 |
| Canvas/RAF/listeners | V1 `XinmaiContinuousSceneHost` | registration/runtime factory | single Canvas 2D runtime | 0 | 正确唯一 Owner，不修改所有权。 |
| Birth mutable values | `LaunchLab` effect local `m.coords` | Canvas pointer | year/month/day/hour | 0 | 必须退出正式输入。 |
| Time wheel rendering | `LaunchLab` Canvas delegate | `m.coords` | Canvas glyphs/preview | 0 | 可删除或降为 accepted-fact只读视觉，不能继续作为控件。 |
| Birth pointer hit testing | `timeWheelIndexAt` / `onDown` / `onMove` / `onUp` | raw Canvas coordinates | local mutation / commit | 间接 | 生产入口必须为0。 |
| Scene commit proof | Canvas delegate `readCommitProof()` | renderer commit | `CANVAS_2D_CONTINUOUS_SCENE` | 0 | 只证明 Scene presenter；不得证明输入或session成功。 |

### 1.2 正式 source / session / recovery

| 项 | 当前 Owner | Writer 数 | 审计结论 |
|---|---|---:|---|
| engine source results | `resolveLaunchOriginMotherSourceResults` 及既有 engines | 0（纯计算） | Authority语义保持。 |
| immutable source session | `createLaunchLifeSourceSession` | 0（返回typed value） | 正式 validator保持。 |
| real-user visual context | `activateRealUserGenesisVisualSourceContext` | 1 in-memory context Owner | 保持；Controller只调用，不复制。 |
| persisted source session | `persistLaunchLifeSourceSession` / `sessionService` | 1 public writer path | 保持；不新增 DB/store/index/schema。 |
| recovery normalization | `restorePersistedRealUserGenesisVisualSourceContext` | 0 新资产；重建typed context | 保持；不是第二确认入口。 |
| Launch→Genesis handoff | `resolveLaunchGenesisProductionRouteHandoff` | 0 | 保持唯一 route proof。 |
| `/genesis` authorization | `authorizeGenesisProductionRoute` | 0 | 保持；source/reference mismatch继续 withheld。 |

`captureLaunchLifeSourceSession()` 当前在 `LaunchLab` 中是正式创建、visual source、context activation、persistence 的唯一新用户调用点。迁移后这段编排必须被抽成唯一 public Controller；页面只消费 union result。

## 2. 双消费者风险与原子边界

### 2.1 不允许的中间态

```text
native birth controls
+
Canvas time-wheel pointer / background submit
= two candidate inputs + two submit intents
```

任何先加新表单、后移除旧 Canvas 的分刀都会产生双入口。反向先删除 Canvas 又未提供完整 native controls，则正式生产链不可达。两者必须同一提交切换。

### 2.2 原子切换顺序

1. 建立纯 presentation types / resolver / policy。
2. 建立页面会话内 input session reducer；默认值只能作为可编辑建议，绝不自动确认。
3. 建立唯一 native input component和唯一 confirm button。
4. 建立 `XinmaiGenesisBirthCoordinateAdmissionController`，搬迁现有编排，不改变下游服务语义。
5. `LaunchLab` 注册改为 native-control near object与 `pointerInteraction: NONE`。
6. 旧 Canvas birth pointer/submit、`m.coords` 正式读取、birth sensory和timer navigation同提交退出。
7. Genesis LIFE_ORIGIN / recognition继续使用已有 native controls，校准为只有对象可辨后才显示。
8. 加门禁并形成直接子 Counter。

提交回滚必须回滚完整 V2；禁止回滚后只留下新 UI 或只留下旧 Canvas submit。

## 3. 唯一 Birth input session Owner

### 3.1 类型

建议正式类型：

```text
XinmaiGenesisBirthCoordinateInputSession

status:
  EDITING
  READY_TO_CONFIRM
  CONFIRMING
  ACCEPTED
  SAFE_WITHHELD

fields:
  year
  month
  day
  hourBranch

validation:
  VALID
  FIELD_INVALID
  DATE_INVALID
```

边界必须声明：

```text
sessionOnly = true
noStorage = true
noIdentity = true
noEngineInvocation = true  // reducer/resolver
noAuthorityWriteback = true
noAutomaticConfirmation = true
```

这个 session 是可撤销的页面输入草稿，不是 Authority。Refresh 是否丢失草稿必须真实且一致；P0 建议 **不持久化 provisional input**，refresh 后回到 EDITING，已接受的既有 source则由现有 recovery读取，不重复确认。

### 3.2 默认值

现有 `1995 / 06 / 02 / 酉时` 只能作为明确标注的可编辑默认建议，不得因页面加载直接建立source。更安全的 P0 是保持现有初始展示值但要求所有字段通过明确确认按钮一次性提交；没有任何 pointer/timeout 自动确认。

## 4. 唯一 Admission Controller

### 4.1 Owner

冻结唯一 Owner：

```text
XinmaiGenesisBirthCoordinateAdmissionController
```

它不是新 Authority；它只编排已有 public services。页面、Canvas、Renderer、CSS和Host不得重复这段编排。

### 4.2 输入

- 当前 `XinmaiGenesisBirthCoordinateInputSession` 的完整 immutable snapshot；
- 用户明确 `CONFIRM_BIRTH_COORDINATE` intent；
- 当前 route admission/reference；
- 无 DOM element、Canvas point、timer、animation、Storage raw value。

### 4.3 执行顺序

```text
validate full date + hourBranch
→ resolveLaunchOriginMotherSourceResults(existing engines)
→ createLaunchLifeSourceSession
→ resolveLaunchLifeVisualSource
→ activateRealUserGenesisVisualSourceContext
→ persistLaunchLifeSourceSession(existing writer)
→ read-back/source-reference check through existing recovery boundary
→ resolveLaunchGenesisProductionRouteHandoff
```

Controller union：

```text
ACCEPTED
  session
  sourceReferenceId
  handoff

SAFE_WITHHELD
  reason
  existingAssetsPreserved = true
```

允许的 reason 至少区分：invalid date、engine/session mismatch、visual source unavailable、context mismatch、persistence unconfirmed、handoff not ready。不得向用户展示技术 reason 字符串。

### 4.4 成功与导航

- `ACCEPTED` 必须来自上述 typed chain，不来自 Scene outcome。
- Scene可以在 ACCEPTED 后呈现 source marker；Scene failure不得改写 source。
- `navigate(handoff.routeTarget)` 只消费 exact READY handoff。
- transition hold可短暂保持可信静态画面，但不能延迟或提前制造成功；不得 `setTimeout(() => enterProductionGenesis())`。
- 若产品需要可见过渡，navigation可以在 READY 后立即发生，由 AppShell Host typed rehydration维持连续性。

## 5. V1 Host / Near-object 切换

### 5.1 ENTRY_BIRTH

当前 Resolver把所有 `ENTRY_BIRTH` near object硬编码为 `HOST_CANVAS_SINGLE_TARGET`。V2 必须改为：

```text
ENTRY_BIRTH + BIRTH_COORDINATE
→ hitRegionContract = NATIVE_CONTROL
→ registration.pointerInteraction = NONE
```

Host仍拥有 Canvas、RAF、Resize、Visibility；本路由 Canvas pointer listeners = 0。

Scene proof中的 `interactiveNearObjectCount=1` 只说明 plan期望一个 near object，不证明 DOM按钮可达。真实 DOM控件的 name/role/rect/hit/focus由专项 gate与Browser evidence另证；不得把 Scene proof冒充交互证明。

### 5.2 Scene输入

V2 不把 provisional出生值加入 V1 scene plan或stable seed。确认前只有通用 BIRTH_COORDINATE focus层级；确认后 existing source/reference派生正式 birth mansion响应。

理由：

- 避免未确认数据触发人格/身份视觉；
- 避免每次输入导致 Host runtime销毁/重建；
- 保持 V1 contract与seed稳定；
- 减少用户数据在Presentation链中的传播。

## 6. Canvas 退出矩阵

| 旧能力 | V2 处理 | 原因 |
|---|---|---|
| `timeWheelIndexAt` pointer picking | 生产 Birth路径删除 | native controls接管。 |
| `m.coords` 由 `onMove` 修改 | 生产 Birth路径删除 | page input session接管。 |
| wheel外点击调用 `commitCurrentDim()` | 删除 | 模糊 submit，易误触。 |
| `captureLaunchLifeSourceSession()` 页面闭包 | 搬迁到唯一 Controller | 单编排Owner。 |
| `beginProductionGenesisContinuity()` timer navigation | 删除/改为typed handoff immediate | timer不是Authority。 |
| Canvas `fillText` 作为输入label/action | 删除唯一责任；可保留非关键装饰0或1行 | accessibility与窄视口。 |
| initial canvas CTA hit ellipse | 删除；native start control | Canvas不能作为唯一入口。 |
| Birth path `audio.form/tick/gather` | 删除且不替换 | Audio SAFE_WITHHELD。 |
| Birth path `vibrate` | 删除且不替换 | Haptic PAUSED。 |
| public 28-mansion field draw | 作为只读 V1 renderer保留/收敛 | 世界连续性。 |
| accepted birth mansion response | 只由 accepted session source refs驱动 | 不从 provisional推断。 |

旧 Canvas 中 OLD_USER、Pressure、Mother Code 等非 V2代码不得被顺带重设计；但 V2 gate必须确保被移除的 Birth pointer分支无法从其他状态重进。

## 7. Genesis consumer 切换

1. `/genesis`继续自动消费 Launch 已确认的四项时间，不二次询问。
2. `GenesisProductionRendererCanvasHost`继续注册 `CONTINUOUS_SCENE:GENESIS`，不新增Host或Canvas。
3. LIFE_ORIGIN 的唯一交互仍为 native `button`；Canvas pointer mode保持 `NONE`。
4. `lifeOriginDiscoveryPhase` 的视觉过渡可以使用 timer，但 button资格必须由现有 recognition availability + current typed stage派生；timer只控制显示节奏。
5. 当前截图中的空黑 copy-only阶段必须退出：若 typed renderer/static presenter尚未可信，显示 `SAFE_WITHHELD` 克制状态，不把字幕当 Scene success。
6. recognition button、Reality handoff和既有 authority保持；V2只校准空间邻接、裁切和状态说明。
7. narrow viewport下 identity label与button不得溢出；文字层不截获 button hit target。

## 8. Recovery / Failure 矩阵

| Case | 冻结结果 |
|---|---|
| refresh before confirmation | provisional draft按P0不持久化；回到 EDITING；不创建source。 |
| refresh after ACCEPTED before navigation | existing persisted session/context recovery；恢复同一source；不创建第二session。 |
| direct `/genesis` without context | existing SOURCE_NOT_READY/SAFE_WITHHELD；不得默认身份。 |
| invalid date | FIELD/DATE error；confirm禁用或返回SAFE_WITHHELD；scene仍是generic field。 |
| session source mismatch | SAFE_WITHHELD；不持久、不导航。 |
| visual context activation failure | SAFE_WITHHELD；不导航；既有资产不删。 |
| persistence read-back failure | SAFE_WITHHELD/RETRYABLE；内存session不能被UI描述为可恢复成功。 |
| duplicate confirm | Controller按exact sourceReference/session结果幂等返回同一accepted source；不重复导航intent。 |
| stale tab with different draft | 只允许当前route/input revision提交；失配withheld。 |
| Motion renderer failure | static scene接管；native input/controller不受影响。 |
| Reduced Motion | WebGL/RAF 0；同一输入/source/controls。 |
| Save-Data | FAR/后处理降级；input/source不变。 |
| malformed recovered source | existing recovery null/withheld；不自动覆盖或清理。 |

不允许用清Storage、query fixture、Direct URL伪造ready或timer重试掩盖失败。

## 9. 原子文件边界

### 9.1 新增

- `src/types/xinmaiGenesisBirthCoordinatePresentation.ts`
- `src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts`
- `src/services/xinmaiGenesisBirthCoordinatePresentationPolicy.ts`
- `src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts`
- `src/components/XinmaiGenesisBirthCoordinateControls.tsx`
- `src/styles/xinmai-genesis-birth-coordinate-spatial-interaction.css`
- 5 项左右专项 gate scripts。

### 9.2 修改

- `src/pages/LaunchLab.tsx`
- `src/components/GenesisProductionRendererCanvasHost.tsx`
- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/services/xinmaiContinuousScenePresentationResolver.ts`（ENTRY_BIRTH hit contract only）
- 必要时 `src/types/xinmaiContinuousScenePresentation.ts`（仅现有enum/contract校准，不新增outcome）
- `src/styles/genesis-production-experience.css`
- `src/styles/xinmai-continuous-scene.css`（仅stacking/native control层）
- `package.json`（gate registration only）

如果 Runtime发现必须修改下列文件语义，立即 `RE-AUDIT REQUIRED`：

- Identity/Mother Code/Starbeast engines；
- `LaunchLifeSourceSession` schema；
- Storage DB/store/index/writer；
- Genesis runtime/recognition state machine；
- Navigation authority；
- C1/C2/V1 outcome/Host Owner；
- Growth/Formation/Crystal/Body Imprint。

## 10. Gates

新增并注册，不能删除/弱化既有 gates：

1. `check-xinmai-genesis-birth-coordinate-single-input-owner`
   - native controls唯一；Canvas submit/pointer birth mutation=0。
2. `check-xinmai-genesis-birth-coordinate-admission-authority-boundary`
   - controller只编排现有services；无Storage raw/DOM/timer/renderer输入；writer数量不变。
3. `check-xinmai-genesis-birth-coordinate-continuous-scene-contract`
   - ENTRY_BIRTH pointer mode NONE；hit contract NATIVE_CONTROL；Host/Canvas/RAF仍唯一。
4. `check-xinmai-genesis-birth-coordinate-motion-static-accessibility`
   - native controls、same semantics、Reduced static；无copy-only success。
5. `check-xinmai-genesis-birth-coordinate-forward-counter`
   - policy单开关；input/assets保留；旧Canvas submit/sensory不复活。

既有 Genesis/Launch/V1/C1/C2/Growth gates全量回归。

## 11. Forward SAFE_WITHHELD Counter

未来 Counter 为 Runtime Candidate直接子提交，首选只改：

```text
src/services/xinmaiGenesisBirthCoordinatePresentationPolicy.ts

ENABLED → SAFE_WITHHELD
```

Counter语义：

- 暂停新 Birth spatial enrichment与Genesis空中对象高亮；
- 原生出生输入、validation、existing admission controller与typed session仍可用；
- V1 Host可显示generic static field，但不得宣称birth response；
- 已有Identity、C1/C2、Crystal、Body Imprint、Reality和Recovery全部保留；
- 不恢复 `HOST_CANVAS`、`m.coords`提交、背景tap、timer navigation、旧audio/vibrate或copy-only success。

若 Counter需要第二个policy或恢复旧path才能工作，候选封装失败，Runtime不得交付。

## 12. Push Gate证据

### 12.1 自动工程证据

- TypeScript、Production Build、全部registered gates。
- Baseline/Candidate/Counter gate数量、删除/弱化=0。
- Host=1、Canvas/Context/RAF所有权不变。
- ENTRY_BIRTH Canvas pointer owner=0；native input group=1；confirm button=1。
- source session/controller writer count与baseline一致。
- Production bundle中 Fixture/Acceptance/fault injection/AudioContext/audio asset/haptic runtime=0。
- Counter独立Build/Gates与资产保护。

### 12.2 正式浏览器/设备证据

- New user完整输入：四控件键盘/触摸、错误、summary、唯一confirm。
- confirm前session/context=0；confirm后exact one accepted source/handoff。
- Canvas/background点击不能提交。
- Motion/Reduced/WebGL failure同一事实；Reduced context/RAF=0。
- Launch→Genesis没有黑屏字幕卡；FAR/MID/NEAR连续。
- LIFE_ORIGIN可见对象与native button对应。
- Direct URL、refresh、Back/Forward、duplicate confirm、invalid date、mismatch。
- 320×568、360×800、390×844、430×932、原生200%。
- VoiceOver和真实TalkBack；不得用DOM tree或截图代替完整手势。
- Android无洋红、外轨、双身体、过热/掉帧新增。

## 13. 回滚与拒绝条件

### 单一回滚单位

```text
native input session
+ admission controller
+ ENTRY_BIRTH pointer cutover
+ accepted-only spatial response
+ Genesis object/control alignment
+ old birth Canvas submit/sensory/timer exit
+ gates
```

### 直接拒绝

- native 与 Canvas任一同时可提交；
- provisional value产生正式 identity/birth mansion claim；
- Scene outcome推进session或navigation；
- timer/animation/DOM mounted宣称成功；
- 新DB/store/index/writer/Authority；
- Counter复活旧Canvas或损坏existing assets；
- C1/C2/V1 outcome改名或第二body/Host；
- Birth path新增/恢复audio/haptic；
- 窄视口裁切或读屏无法完成输入。

## 14. 最终状态

```text
Audit:
CLOSED / PASS

V2 Architecture:
FROZEN

Runtime Authorization Recommendation:
NOW — STRICT ATOMIC SCOPE

V2 Runtime Push:
HOLD

V1 / C1 / C2:
CLOSED / PASS

Global Continuous Life World:
OPEN

V3–V5:
LOCKED UNTIL V2 DELIVERY CLOSED

C3 Haptic:
PAUSED

Audio:
SAFE_WITHHELD / SILENT

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED
```

## 15. 文档验证

- 本提交只新增本 Migration Audit文档。
- Runtime / Renderer / CSS / Gate / Authority / Storage / Schema / Copy / Asset差异：`0`。
- `git diff --check`：必须 PASS。
- TypeScript / Build：`N/A — doc-only`。
- 本地提交；Push HOLD；未在本刀实施 Runtime。

