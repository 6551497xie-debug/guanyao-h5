# XINMAI Phase 3 Reality / Gravity / Choice Semantic Physicalization Single-Owner Atomic Migration Audit P0

## 0. 审计结论

```text
交通灯：RED
刀型：Migration Audit / Presentation Consumer Atomic Cutover
决策：NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY

Parent / Remote：
f1cfada1ce753a8076d00fdad5d67f9146d6f083

Runtime：DEFER UNTIL THIS AUDIT IS DELIVERED
Push：HOLD
```

V3 不需要新 Authority、数据库、Object Store、Index、Writer 或持久化字段。现有 Reality Pressure Recognition、Gravity Observation Continuity、Choice Readiness / Action Route、V1 Continuous Scene 与 C2 Same-Life contracts 足以形成唯一、纯只读的语义物理化 Projection。

但切换必须原子覆盖 Reality、Gravity、Choice、Scene publisher、NEAR presenter、Accessible Semantic Mirror 与 Gates。禁止先增加新 Projection 后长期保留固定 `GRAVITY_OBSERVATION`、页面局部阶段或 DOM/timer 成功路径。

---

## 1. 审计基线与冻结状态

```text
V1 Continuous Scene Host：CLOSED / PASS
V2 Genesis Birth Spatial Interaction：CLOSED / PASS
V2 Source Recovery：CLOSED / PASS
C1 Formation / Ownership：CLOSED / PASS
C2 Canonical Body Imprint / Single Presenter：CLOSED / PASS
V3 Reality / Gravity / Choice：OPEN / APPLICATION READY AFTER AUDIT DELIVERY
Phase 3：ACTIVE / NOT PASSED
C3 Haptic / Audio：PAUSED / DEFER
Phase 4：LOCKED
```

本 Audit 只新增本文档。Runtime、Renderer、CSS、Gate、Authority、Storage、Schema、文案和资产变更均为 0；TypeScript / Build 对文档刀不适用。

---

## 2. 当前真实状态机与所有权

### 2.1 Reality

```text
Reality Intent / Admission current
→ Pressure candidate session
→ user explicit recognition
→ XinmaiRealityPressureRecognitionController
→ Recognition Receipt + canonical revision
→ RealityToGravity cutover
```

权威 Owner：Reality Encounter / Pressure Recognition controllers 与 transaction stores。

Presentation 当前只把 `selectedPressureSeedContext` 传进 `RealityLifeUniverseCanvas`。Recognition Receipt、receipt revision 与 canonical revision 没有进入统一 Scene semantic projection，因此 Canvas 不能严格区分“候选已选中”和“Authority 已认出”。

### 2.2 Gravity Observation

```text
Gravity Admission current
→ Observation continuity record
→ OBSERVATION_AVAILABLE
→ user explicit confirmation
→ OBSERVATION_RECOGNIZED
→ current checkpoint revision
```

权威 Owner：`XinmaiGravityEncounterContinuityController`。

`GravityProductionSurfaceHost` 已拥有 current admission、`GravityObservationResumeDecision` 与 Action Route resolution，但没有将其投影为唯一 Scene stage。

### 2.3 Choice

```text
Observation recognized
→ validated Action Route
→ ChoicePresentationReadinessDecision
  READY_TO_PRESENT
  WITHHELD
  RESUME_COMMITTED
  TERMINAL_BY_GROWTH
  SAFE_WITHHELD
→ user native control
→ Choice Action Intention Authority
```

权威 Owner：Choice Action Intention / Growth controllers。

`ChoicePresentationReadinessDecision` 已验证 identity、source encounter、gravity cycle、observation reference/revision、Action Route 与 structural prerequisites。它是 V3 Choice Presentation 的唯一可用 typed input；不得再由 `GravityPage` phase、按钮可见性或动画反推。

### 2.4 Continuous Scene

```text
Route typed registration
→ pure Continuous Scene resolver
→ unique AppShell Host
→ existing Renderer adapter / Static presenter
→ typed presenter proof
→ public Scene outcome
```

V1 Host 保持唯一 Scene/Canvas/Context/RAF/Resize/Visibility/Pointer Owner；V3 不新增 Host、public Scene outcome 或 Presenter Authority。

---

## 3. 当前冲突与最早断点

### 3.1 固定 Gravity mapping

`RealityLifeUniverseCanvas` 当前生产映射：

```text
consumerSurface = GRAVITY_CHOICE
→ nearObjectKind = GRAVITY_OBSERVATION
```

该分支不读取 `ChoicePresentationReadinessDecision`，所以即使 `READY_TO_PRESENT` 或 `RESUME_COMMITTED` 已成立，Scene 仍不能合法进入 `CHOICE_ACTION`。

### 3.2 Reality recognition proof 未进入 Scene input

Reality Host 持有 `recognitionAuthorityState`：

- Recognition Receipt；
- receipt revision；
- canonical revision。

Canvas 仅收到 selected seed；不能证明 current Authority recognition。

### 3.3 Near reference fallback 混用

当前 `nearObjectReferenceId` 的粗粒度选择是：

```text
selectedPressureSeedId
?? first canonical imprint reference
?? null
```

这对 Returning / Archive 有历史便利，但不能作为 V3 Reality / Gravity / Choice 的精确 semantic reference。Choice 必须使用 Action Route / Choice intention reference；Observation 必须使用 observation reference；Pressure recognized 必须绑定 Receipt + selected seed lineage。

### 3.4 页面局部表现仍并行

`GravityPage` 仍包含：

- `CosmicNarrativePhase` 与页面局部阶段；
- CSS keyframes / timed copy；
- `BlackholeVortexScene`、旧星河/星尘/呼吸/涟漪表达；
- page-local `RealityGravityInertiaField`；
- 旧 optional tone；
- native controls 与正式 Choice controller。

其中 native controls、正式 typed decisions 和 Controller 调用必须保留；页面局部阶段、动画、DOM 与音频不得进入 V3 Scene success 或 semantic stage。Audio/Haptic 仍锁定，本刀不得恢复或扩大旧感官调用。

唯一首个断点：

```text
PRESENTATION_CONSUMER_HANDOFF_MISSING
```

分类：`RED / ATOMIC CONSUMER CUTOVER`。

---

## 4. 唯一 Projection 类型契约

### 4.1 类型文件

冻结新增：

```text
src/types/xinmaiRealityGravityChoiceSceneSemanticPresentation.ts
```

### 4.2 输入

```text
XinmaiRealityGravityChoiceSceneSemanticInput
  schemaVersion
  consumerSurface: REALITY | GRAVITY_CHOICE
  sceneLineage
    sourceReferenceId
    sourceRenderPlanReferenceId
    identityReferenceId
    bodyReferenceId
    routeAdmissionReferenceId
    routeAdmissionRevision
  reality?
    selectedPressureSeedId
    captureState
    recognitionReceiptReferenceId?
    recognitionReceiptRevision?
    recognitionCanonicalRevision?
  gravity?
    gravityCycleId
    admissionReferenceId
    admissionRevision
    observationDecision
  choice?
    readinessDecision
    actionRouteResolution
```

字段必须直接来自现有 typed decisions。不得传入 DOM、`data-*`、CSS、timer、RAF、动画阶段、用户原文或 Storage snapshot。

### 4.3 Stage union

只允许：

```text
REALITY_APPROACHING
PRESSURE_RECOGNIZED
GRAVITY_OBSERVING
GRAVITY_RECOGNIZED
CHOICE_READY
CHOICE_COMMITTED
SEMANTIC_PHYSICALIZATION_SAFE_WITHHELD
```

映射规则：

| Stage | 唯一允许输入 |
| --- | --- |
| `REALITY_APPROACHING` | current Reality admission；Pressure 未 recognized；selected candidate 可有可无 |
| `PRESSURE_RECOGNIZED` | `SEED_RECOGNIZED` + current Recognition Receipt + selected seed + current admission refs 完整匹配 |
| `GRAVITY_OBSERVING` | current Gravity admission + `OBSERVATION_AVAILABLE` |
| `GRAVITY_RECOGNIZED` | current Gravity admission + `OBSERVATION_RECOGNIZED` + current checkpoint revision；Choice 未 ready |
| `CHOICE_READY` | Choice `READY_TO_PRESENT` + Action Route candidate / resolver input 与 observation lineage 完整匹配 |
| `CHOICE_COMMITTED` | `RESUME_COMMITTED` + current Choice intention lineage 完整匹配 |
| `SAFE_WITHHELD` | policy paused、stale、mismatch、recovery failure、terminal growth、unsupported state |

`TERMINAL_BY_GROWTH` 不由 V3 伪装为 Choice success；它交回现有 Returning / Formation / Ownership consumers，因此 V3 输出 `SAFE_WITHHELD` 并保留 native routing/recovery。

### 4.4 reason codes

冻结最小原因：

```text
PRESENTATION_PAUSED
CONSUMER_SURFACE_UNSUPPORTED
ROUTE_ADMISSION_NOT_CURRENT
SOURCE_OR_IDENTITY_MISMATCH
PRESSURE_RECOGNITION_PROOF_MISSING
PRESSURE_RECOGNITION_LINEAGE_MISMATCH
GRAVITY_ADMISSION_MISMATCH
OBSERVATION_PROOF_MISSING
OBSERVATION_LINEAGE_MISMATCH
CHOICE_READINESS_WITHHELD
CHOICE_READINESS_SAFE_WITHHELD
CHOICE_LINEAGE_MISMATCH
ACTION_ROUTE_MISSING_OR_MISMATCH
TERMINAL_GROWTH_OWNS_PRESENTATION
```

不得将 `WITHHELD` 自动升级为 safe success；也不得将任意 `SAFE_WITHHELD` 翻译为旧 Gravity Scene。

### 4.5 output / proof

`PRESENTABLE` 必须包含：

```text
semanticProjectionReferenceId
semanticStage
lineageProof
nearObjectKind
nearObjectReferenceId
physicalPlan
  farFocus
  midResponse
  nearEmphasis
  occlusion
  forceField
  transitionMeaning
```

稳定 reference 由 existing immutable refs 纯派生；不得使用时间或随机数。`resolvedAt` 可以用于日志但不得参与 reference、success 或 dedupe。

---

## 5. 唯一 Resolver 与 policy

冻结新增：

```text
src/services/xinmaiRealityGravityChoiceSceneSemanticResolver.ts
src/services/xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts
```

Resolver boundary：

```text
pure = true
readOnly = true
no Storage
no DOM
no timer / RAF
no Controller call
no Authority writeback
no navigation
no user text
```

Policy：

```text
ENABLED
SAFE_WITHHELD
```

这是 V3 唯一 policy 和 Counter 开关，不复制 V1 Host policy 或 C2 policy。

---

## 6. Scene plan 接入契约

### 6.1 不新增 public Scene outcome

继续只允许：

```text
CONTINUOUS_SCENE_MOTION_PRESENTED
CONTINUOUS_SCENE_STATIC_PRESENTED
CONTINUOUS_SCENE_SAFE_WITHHELD
```

V3 projection 是现有 Scene input/plan 的 typed semantic extension；它不形成第二 public outcome 或第二 reducer。

### 6.2 Near mapping

| V3 Stage | Scene near kind | 精确 reference |
| --- | --- | --- |
| Reality approaching | `REALITY_WEATHER_NODE` 或 `NONE` | selected pressure seed id 或 null |
| Pressure recognized | `REALITY_WEATHER_NODE` | recognition receipt ref + selected seed digest 派生 ref |
| Gravity observing | `GRAVITY_OBSERVATION` | gravity observation ref |
| Gravity recognized | `GRAVITY_OBSERVATION` | gravity observation ref + checkpoint revision 派生 ref |
| Choice ready | `CHOICE_ACTION` | Action Route reference |
| Choice committed | `CHOICE_ACTION` | Choice Action Intention reference |

NEAR 同时只能有 `0 | 1` 个。Choice ready 后 Observation 不得继续作为第二可触成功对象。

### 6.3 Physical plan

冻结枚举，不允许 Renderer 自由解释业务：

```text
farFocus:
  QUIET_CONTINUITY | REALITY_APPROACH | GRAVITY_CONTRACTION | REAL_LIFE_OPENING

midResponse:
  SAME_LIFE_STABLE | VEIL_REVEALED | LOCAL_CONTRACTION |
  PROTECTIVE_PATH_VISIBLE | CHOICE_TRACE_HELD

nearEmphasis:
  NONE | PRESSURE_CANDIDATE | RECOGNIZED_PRESSURE |
  OBSERVATION_PATH | COMPARABLE_CHOICE_FIELD | COMMITTED_CHOICE_TRACE

forceField:
  NONE | OBSERVATION_ATTRACTOR | PROTECTION_BENEFIT_COST_BALANCE |
  COMMITTED_DIRECTION_WITHOUT_COMPLETION

transitionMeaning:
  NO_AUTHORITY_CHANGE | USER_RECOGNITION_REFLECTED |
  OBSERVATION_REFLECTED | CHOICE_AVAILABLE_NOT_SELECTED |
  CHOICE_COMMITTED_NOT_LIVED
```

这些值只影响现有 Renderer adapter 的 composition inputs。Renderer 不读取 Choice payload、用户原话或 Storage。

---

## 7. 原子消费者切换

### 7.1 必须同一 Runtime 提交切换

| 文件 | 必须变更 |
| --- | --- |
| `src/types/xinmaiRealityGravityChoiceSceneSemanticPresentation.ts` | 新 typed projection contract |
| `src/services/xinmaiRealityGravityChoiceSceneSemanticResolver.ts` | 唯一 pure projection Owner |
| `src/services/xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts` | V3 policy |
| `src/types/xinmaiContinuousScenePresentation.ts` | Scene input / plan 承接 validated semantic projection；public outcome不变 |
| `src/services/xinmaiContinuousScenePresentationResolver.ts` | 校验 projection refs 并映射 FAR/MID/NEAR |
| `src/components/RealityProductionHost.tsx` | 将 current Recognition proof 与 selected pressure 同时发布；不自行决定 stage |
| `src/components/GravityProductionSurfaceHost.tsx` | 在同一位置汇合 Observation、Choice readiness、Action Route 并发布 projection input |
| `src/pages/GravityPage.tsx` | 接收已解析 projection；native controls保留；旧 page-local semantic success/tone 退出 Production success path |
| `src/components/RealityLifeUniverseCanvas.tsx` | 接收 projection；删除固定 Gravity mapping与 Imprint fallback 作为 V3 ref；注册唯一 current Scene input |
| `src/components/RealityGravityInertiaField.tsx` | 只消费 physical plan；不建立第二 Host/outcome/pointer owner |
| semantic mirror consumer（现有 Canvas 内或提取服务） | 从同一 projection 生成克制摘要；不读视觉 DOM |
| `package.json` + 新 gates | 注册全部 V3 gates；不删除既有别名 |

### 7.2 可选但受约束的文件

若现有 Renderer adapter 不能接收 `physicalPlan`，可最小修改：

```text
src/renderers/xinmaiContinuousSceneRendererAdapter.ts
```

只允许添加 typed composition input；不得新增 Renderer Authority、Context、RAF、Shader 资产或第二 Body Presenter。

CSS 仅在原子候选确需让旧 DOM visual success 退出命中/层级时允许修改现有 Gravity/Reality presentation stylesheet；不得改产品文案或做 V4 美术融合。

### 7.3 明确不修改

- Reality Encounter / Pressure Recognition controllers/stores；
- Gravity Observation / Choice / Growth controllers/stores；
- Identity / Mother Code；
- Formation / Receipt / Crystal / Body Imprint；
- V1 Host ownership；
- V2 Genesis source/coordinate recovery；
- C2 public outcomes / stable node；
- Navigation Authority；
- Storage / Schema / DB version。

---

## 8. 旧路径退出清单

同一候选必须退出以下“语义成功”能力，但可保留纯装饰且必须 `aria-hidden` / `pointer-events:none`：

1. `GRAVITY_CHOICE → GRAVITY_OBSERVATION` 固定映射；
2. selected pressure seed / first Imprint 的通用 near reference fallback；
3. `GravityPage` 的 `CosmicNarrativePhase` 作为 Observation / Choice 真源；
4. CSS animation end、copy fade、page timers 作为阶段完成证据；
5. Blackhole、星尘、呼吸、涟漪、局部光效作为“已认出/已选择”成功；
6. `RealityGravityInertiaField` 自行决定 semantic stage；
7. DOM `data-*` 被 Renderer 反向读取；
8. Choice 页面局部可见性替代 `ChoicePresentationReadinessDecision`；
9. 旧 optional tone 在 V3 状态上自动触发；Audio 保持 SAFE_WITHHELD。

native Recognition、Observation、Choice、Departure controls 及其正式 Controller 调用不得删除。

---

## 9. Motion / Static / failure

### Motion

- Scene Host=1、Canvas=1、Context=1、RAF=1、Body Presenter≤1；
- semantic projection 只改变 composition，不拥有 renderer lifecycle；
- public success 仍需 V1 presenter commit proof；需身体时仍需 C2 proof。

### Native Reduced Motion

- Renderer 创建前由现有 Host 选择 Static；
- WebGL Context=0、RAF=0、Static Presenter=1；
- 同一 semantic stage/reference/Body/Imprint；
- 用空间、连接、遮挡与对比表达，不用 opacity-only。

### WebGL failure

- 失败 runtime/listeners/RAF 先释放；
- 同一 Static Presenter 承接 current projection；
- 不重播 Recognition / Observation / Choice；
- 无可信 projection 或 proof 直接 SAFE_WITHHELD。

V3 成功不得依赖 frameCount、RAF、DOM connected、timer、animation end、Context alive 或 Console 无错误。

---

## 10. Accessible Semantic Mirror

同一 projection 只允许生成以下含义层，不重复产品 Authority 文案：

| Stage | 可访问含义 |
| --- | --- |
| Reality approaching | 同一生命仍在；现实候选正在靠近；尚未认出 |
| Pressure recognized | 这条现实已由用户确认；同一生命未改变身份 |
| Gravity observing | 正在观察保护性回应；尚未确认观察 |
| Gravity recognized | 当前观察已确认；保护与代价同时可见 |
| Choice ready | 可比较的行动空间已准备；选择仍由用户决定 |
| Choice committed | 选择已保存；真实行动尚未完成，未形成 Crystal |
| Safe withheld | 当前空间表达无法确认；原生控件/既有资产仍可用 |

约束：

- Canvas/SVG 对辅助技术静默；
- live announcement 仅在 Authority-derived stage transition 播报一次；
- refresh/recovery 同 stage 不重播“已认出/已选择”；
- Motion/Reduced Motion 文本完全一致；
- no technical IDs / internal union names。

---

## 11. Gates

新增并注册，建议精确别名：

```text
check:xinmai-reality-gravity-choice-scene-semantic-contract
check:xinmai-reality-gravity-choice-scene-semantic-resolver
check:xinmai-reality-gravity-choice-scene-consumer-cutover
check:xinmai-reality-gravity-choice-scene-authority-boundary
check:xinmai-reality-gravity-choice-scene-motion-static
check:xinmai-reality-gravity-choice-scene-accessible-mirror
check:xinmai-reality-gravity-choice-scene-forward-counter
```

Gates 必须证明：

- projection pure/read-only；
- exact lineage mismatch 全部 withheld；
- Choice ready/committed reference 来源正确；
- terminal growth 不被 V3 映射成功；
- fixed Gravity mapping、Imprint fallback、DOM/timer reverse truth 为 0；
- Host/Canvas/Context/RAF/Body owner 数量不变；
- Counter 保留 Authorities/native controls/C1/C2；
- Production Bundle 无 Fixture/Acceptance/fault injection；
- 既有 Gates 无删除、漏注册、弱化。

---

## 12. Forward SAFE_WITHHELD Counter

Runtime Candidate 的直接子提交只修改：

```text
src/services/xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts

ENABLED → SAFE_WITHHELD
```

Counter 语义：

- V3 physicalization 与新 Scene semantic success 暂停；
- V1/V2/C1/C2、Pressure/Observation/Choice/Growth facts 完整保留；
- Reality/Gravity/Choice native controls、semantic recovery 与 navigation 可用；
- Accessible Mirror 真实说明 V3 presentation withheld；
- 不恢复固定 `GRAVITY_OBSERVATION`、页面 phase、旧星空、第二 Host、DOM/timer truth 或旧音频。

若 Counter 需要第二 Runtime 文件，停止：`RE-AUDIT REQUIRED`。

---

## 13. Runtime 单提交文件边界

预计必需：

```text
src/types/xinmaiRealityGravityChoiceSceneSemanticPresentation.ts
src/services/xinmaiRealityGravityChoiceSceneSemanticResolver.ts
src/services/xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts
src/types/xinmaiContinuousScenePresentation.ts
src/services/xinmaiContinuousScenePresentationResolver.ts
src/components/RealityProductionHost.tsx
src/components/GravityProductionSurfaceHost.tsx
src/pages/GravityPage.tsx
src/components/RealityLifeUniverseCanvas.tsx
src/components/RealityGravityInertiaField.tsx
src/services/xinmaiSameLifeAccessibleSemanticMirror.ts（仅若扩展现有 mirror 必需）
package.json
scripts/check-xinmai-reality-gravity-choice-scene-*.mjs
```

可选：现有 renderer adapter 和现有 Reality/Gravity CSS，各自仅在上述 typed contract 无法接入或旧成功层无法退出时允许。新增文件必须解释；触及任何 Authority/store/schema 立即停止。

Runtime 必须是一个提交；不得拆成“先加 resolver”“再切页面”“最后删旧路径”。

---

## 14. 验收矩阵

### 14.1 纯函数 / lineage

- Reality no candidate / candidate / recognized / stale receipt / mismatched revision；
- Gravity available / recognized / consumed / terminal / corrupted；
- Choice withheld / ready / committed / terminal growth / safe-withheld；
- identity、source encounter、gravity cycle、observation ref/revision、Action Route 任一 mismatch；
- deterministic projection ref 在 refresh / reorder 后不变。

### 14.2 生产消费者

- `/reality` candidate 与 recognized；
- `/dynamics` observation available / recognized / Choice ready / committed；
- Direct URL、refresh、Back/Forward、stale tab；
- no Imprint、single/multi Imprint；C2 facts不被 V3 重算；
- terminal growth 转交 Returning / Formation，不显示旧 Choice success。

### 14.3 视觉 / interaction

- `CHOICE_ACTION` 只在 READY/COMMITTED；同时 `GRAVITY_OBSERVATION` 成功对象=0；
- protection/benefit/cost 可比较且无道德色彩；
- Choice committed 不形成 Crystal / Ownership；
- native control中心与四角真实命中；Canvas不截获；
- 320×568、360×800、390×844、430×932、200%；
- 无洋红块、第二身体、外轨、闭合椭圆、重复 NEAR。

### 14.4 Motion / Reduced / failure

- Motion Host/Canvas/Context/RAF=1；Static=0；
- native Reduced Motion Context/RAF=0；Static=1；同一 projection ref；
- WebGL failure → same Static；若无合法触发路径标记 `NOT_LEGALLY_TRIGGERABLE`，不得伪造；
- hidden/background RAF=0；恢复不补播。

### 14.5 Accessibility / Counter

- keyboard / VoiceOver；TalkBack 留到 V5 Android Release Gate；
- live status 不在 refresh 重播；
- Counter independent TypeScript/Build/all Gates；
- Counter native controls、C1/C2 facts/assets 与 V1/V2 remain readable。

---

## 15. 回滚与拒绝条件

Forward Counter 是唯一 forward rollback。普通 revert 不得恢复 fixed mapping、page-local success 或 old audio。

以下任一出现必须停止 Runtime：

- 必须修改 Reality/Gravity/Choice/Growth Authority；
- 必须新增 DB/Store/Index/Writer/schema version；
- Projection 不能由现有 typed facts 确定；
- Counter 不能单 policy withheld；
- Choice 双向力场存在两种会改变产品意义的方案且无法由冻结原则裁决；
- 需要第二 Host/Canvas/RAF/Body Presenter；
- 需要 DOM/timer/animation 作为 stage 输入；
- V3 必须顺带改文案、音频、触觉或 V4 Ownership 才能成立。

发现以上条件：`RED — RE-AUDIT REQUIRED`，不得临场扩刀。

---

## 16. 最终裁决与下一刀

代码证据表明现有 Authority facts 足够，唯一产品方向已经由既有原则冻结，不需要 Product Semantic 再决策；消费者可在一个 Runtime 提交内原子切换，Counter 可单 policy 安全扣留。

```text
最终裁决：
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY

下一刀：
XINMAI-PHASE-3-REALITY-GRAVITY-CHOICE-
SEMANTIC-PHYSICALIZATION-SINGLE-OWNER-
ATOMIC-CONSUMER-CUTOVER-P0

交通灯：RED
刀型：Migration Blade / Strict Atomic Scope
Runtime Candidate Push：HOLD
```

Runtime Candidate 必须以本文档交付后的最新远程 HEAD 为精确父提交，并形成直接子 SAFE_WITHHELD Counter。Candidate 在独立 Push Gate PASS 前不得推送。

---

## 17. 文档验证

```text
git diff --check：REQUIRED / PASS BEFORE COMMIT
提交范围：仅本文档
TypeScript：N/A — DOC ONLY
Production Build：N/A — DOC ONLY
Runtime / Renderer / CSS / Gate / Authority / Storage / Schema：0
Push：HOLD UNTIL EXACT DOCUMENT DELIVERY CHECK
```

