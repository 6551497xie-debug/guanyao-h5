# XINMAI Phase 3 Continuous Scene Host Single-Owner Atomic Migration Audit P0

> 任务：`XINMAI-PHASE-3-CONTINUOUS-SCENE-HOST-SINGLE-OWNER-ATOMIC-MIGRATION-AUDIT-P0`
> 交通灯：RED
> 刀型：Migration Audit / Single-Owner Consumer Cutover
> 决策：AUDIT ONLY
> 基线：`codex/genesis-28-mansion-production-continuity@0c1bf9ef984a2333f83f50f7aa2557f86167049d`
> Runtime / Renderer / CSS / Gate / Authority / Storage / Schema / 文案 / 资产：`0` 修改
> Push：HOLD

## 0. 最终裁决

本审计选择：

```text
B. SPLIT MIGRATION APPLICATION READY
```

这里的“拆分”不允许按路由逐页迁移 Scene Owner。第一把 Runtime 必须在一个提交内完成所有正式路由的 **唯一 Host 与旧世界表面原子切换**；在该基础关闭后，Genesis 空间交互、Reality / Gravity / Choice 语义物理化、Returning / C1 / C2 场景融合与平台关闭才可分别施工。

唯一推荐架构：

```text
AppShell 级 XinmaiContinuousSceneHost（唯一世界生命周期 Owner）
                         ↓
        typed, read-only Continuous Scene Plan
      ┌──────────────────┼──────────────────┐
      ↓                  ↓                  ↓
FAR Environment     MID Same-Life      NEAR Stage Object
Presentation        Body Presenter     Presentation
                         ↓
             复用 C2 已关闭的唯一 Presenter
```

第一把不能只新增 Host 后继续保留页面级成功表面。`LaunchLab.light-field`、Genesis Route Canvas、Reality / Gravity / Returning / Archive 各自挂载的世界 Canvas、App / Archive 独立 RAF fallback，以及 Gravity 的通用星空成功路径必须在同一候选和同一 Counter 单元中退出生产成功链。

本审计不重新打开：

- C1 Formation / Ownership：`CLOSED / PASS`；
- C2 Canonical Body Imprint / Single Presenter：`CLOSED / PASS`；
- C2 Public Outcome：`MOTION_SAME_LIFE_SURFACE_PRESENTED`、`STATIC_SAME_LIFE_SURFACE_PRESENTED`、`SAME_LIFE_SURFACE_SAFE_WITHHELD`；
- C2 Body Reference、stable node、Crystal / Imprint references 与四消费者一致性。

下一把建议：

```text
XINMAI-PHASE-3-CONTINUOUS-SCENE-HOST-
SINGLE-OWNER-ATOMIC-CONSUMER-CUTOVER-P0

交通灯：RED
刀型：Migration Blade / Atomic Scene Owner Cutover
```

---

## 1. 审计范围与代码证据

### 1.1 正式路由

当前 1.0 正式生命链路由为：

| 产品责任 | 正式路由 | 当前入口 |
| --- | --- | --- |
| Entry / Birth / Returning / Formation / Ownership | `/`、`/launch`、`/launch-lab` | `EntryRouter` → `LaunchLab` |
| Genesis | `/genesis` | `GenesisProductionRouteEntry` |
| Reality | `/reality` | `RealityProductionRouteRuntime` → `RealityProductionRouteEntry` |
| Gravity / Observation / Choice | `/dynamics` | `GravityProductionRouteEntry` |
| Archive | `/archive` | `PersonalityRingPage` |

`Choice`、Departure / Return、Formation / Ownership 当前不是独立路由：Choice 嵌在 `GravityPage`；Departure 从 Reality 触发并回到 `LaunchLab`；Return、Lived Response、Formation 与 Ownership 由 `LaunchLab` 内的 `XinmaiLivedResponseReturnSurface` 承接。

### 1.2 只读检查文件

本审计读取的生产边界包括：

- `src/main.tsx`
- `src/App.tsx`
- `src/components/AppShell.tsx`
- `src/pages/LaunchLab.tsx`
- `src/pages/GenesisProductionRouteEntry.tsx`
- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/components/GenesisProductionRendererCanvasHost.tsx`
- `src/pages/RealityProductionRouteEntry.tsx`
- `src/components/RealityProductionHost.tsx`
- `src/components/RealityLifeUniverseCanvas.tsx`
- `src/pages/GravityProductionRouteEntry.tsx`
- `src/components/GravityProductionSurfaceHost.tsx`
- `src/pages/GravityPage.tsx`
- `src/components/RealityGravityInertiaField.tsx`
- `src/components/XinmaiLivedResponseReturnSurface.tsx`
- `src/components/XinmaiCrystalFormationOwnershipMoment.tsx`
- `src/pages/PersonalityRingPage.tsx`
- `src/components/XinmaiSemanticStaticSameLifeSurface.tsx`
- `src/services/xinmaiSameLifeSurfaceHostResolver.ts`
- `src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts`
- `src/services/xinmaiCanonicalBodyImprintProjector.ts`
- `src/renderers/genesisProductionRendererHost.ts`
- `src/renderers/genesisWebGLRendererCore.ts`
- `src/renderers/lifeUniverseStarField.ts`
- 对应 typed Route / Admission / Presentation / Recovery contracts。

### 1.3 审计限制

本刀没有启动浏览器、Android / ADB、Figma、ImageGen 或人工产品链；没有运行 Runtime 验收。TypeScript / Build 对 doc-only Audit 不适用。所有 Runtime 行为结论来自当前基线源码、已关闭文档与 typed contracts；未来候选必须重新实测。

---

## 2. 当前 Host / Presenter / Route 全量清点

### 2.1 当前生产消费者矩阵

| 表面 | 当前 Owner / 文件 | typed 或正式输入 | 路由切换是否重建 / 清空前态 | 独立世界、粒子、身体 | Storage / DOM 关系 | 审计结论 |
| --- | --- | --- | --- | --- | --- | --- |
| App lazy fallback | `App.tsx` 的 `LifeUniverseRouteFallback` | `readRealUserGenesisVisualSourceContext()`、共享星点绘制函数 | Suspense 出现时创建 2D Canvas 与 RAF；正式页面完成后卸载 | 独立深空与身份提示；不是 C2 Body | 读现有 context；Canvas / RAF 是本地 presentation | 退出“成功世界”资格；未来只允许 Host Static / Withheld |
| Entry / Birth | `LaunchLab.light-field` | 页面 scene model、出生输入、现有 source services | `/launch-lab` 挂载时创建大 Canvas 模型；离开路由后清理 | 独立完整星空、坐标、球体、轨迹与阶段动画 | 页面经 service 读取/恢复；Canvas local state、pointer、RAF 驱动交互 | 当前最大独立 Scene Owner，必须迁出 |
| Genesis | `GenesisProductionRendererCanvasHost` | Genesis route authorization、consumer source、timeline、visual calibration、recognition facts | 进入 `/genesis` 创建 WebGL Core、Context、RAF、ResizeObserver；离开 dispose | 独立世界与 Genesis manifestation body | Host 不读 Storage；Canvas / RAF 负责呈现；当前 static whisper outcome 使用双 RAF + `isConnected` | 必须并入共同 Host；DOM/RAF 成功判断退出 |
| Reality | `RealityProductionRouteEntry` → `RealityProductionHost` → `RealityLifeUniverseCanvas` | identity / intent / admission、Pressure、Canonical Imprint、visual continuity | 按 encounter key 挂载；进入时新建 Canvas / Core；离开 dispose | 完整深空与 C2 唯一 Same-Life Body | Route 经 Recovery Adapter 读权威；Canvas 不读 Storage；arrival timers 只作表现 | C2 Presenter 保留，Canvas 生命周期迁入 Host |
| Gravity / Observation / Choice | `GravityProductionRouteEntry` → `GravityProductionSurfaceHost` → `GravityPage` | Gravity Admission、Observation、Choice Readiness、Action Route、Canonical Imprint | 按 gravity cycle / revision key 重建页面和 C2 Canvas | `RealityLifeUniverseCanvas` + DOM `Cosmic*`、`RealityGravityInertiaField`、fallback star field | Route 经 adapters 恢复；页面不直接写视觉 Authority；CSS animation / DOM fallback 并存 | 必须原子取消第二世界与通用 fallback 成功路径 |
| Explicit Departure | `RealityProductionRouteEntry` / `App.tsx` navigation delivery | Reality lifecycle typed request / transaction / delivery ticket | Reality Canvas 卸载，LaunchLab 全页重建 | 世界 Owner 从 Reality Canvas 切到 LaunchLab；不是空间连续 | lifecycle 由 Controller；App watchdog 只管交付反馈 | Scene 不得拥有终结或导航，只保持/重建同一 refs |
| Returning | `LaunchLab` + `RealityLifeUniverseCanvas` | recognized identity、visual continuity、returning provenance、Canonical Imprint | 返回 `/launch-lab` 重建 C2 Canvas，同时页面 `light-field` 继续存在 | C2 Body 可见；`light-field` opacity=0 但仍拥有 RAF、resize、pointer listeners | Recovery 通过 service / adapter；透明 Canvas 仍是 DOM / event owner | 视觉身体单一，但世界执行 Owner 不单一；必须退出透明 Canvas |
| Lived Response / Formation | `XinmaiLivedResponseReturnSurface` | six-state checkpoint decision、Fact、Eligibility、Formation orchestrator / recovery | 作为 LaunchLab DOM overlay；不创建 Renderer | 不创建身体；背景由 Returning C2 Canvas 提供 | existing authorities / adapters；DOM controls 调用 Controller | 保持业务 / Presentation，改为发布 NEAR scene input |
| Ownership | `XinmaiCrystalFormationOwnershipMoment` | C1 Ownership decision、Receipt / Crystal，成功权威 `IDB_TRANSACTION_COMPLETE` | LaunchLab 内 DOM surface；恢复态重建但不重播 | 不创建世界；Crystal button 是真实控件 | 无直接 Storage；不由动画推进 | C1 保留；只把位置 / 视觉请求投影到 Host |
| Archive | `PersonalityRingPage` + route-local `RealityLifeUniverseCanvas` | identity recovery、Canonical Imprint、legacy history read-only | 每次进入 `/archive` 重建 C2 Canvas | C2 Body + 独立 `SharedLifeUniverseFallback` 2D RAF Canvas | Canonical 通过 adapters；`PersonalityRingLite` 只读 legacy label | C2 refs 保留；route-local Canvas / RAF fallback 退出 |

### 2.2 UNKNOWN 清点

```text
正式 Route / Host / Canvas / Renderer consumer UNKNOWN：0
正式 Same-Life Body Presenter UNKNOWN：0
正式 Formation / Ownership visual consumer UNKNOWN：0
正式页面直接 raw IndexedDB / localStorage 作为 scene truth UNKNOWN：0
```

页面会调用现有 service / Recovery Adapter，但已审计的 Renderer / Canvas 不直接读取 Storage。`LaunchLab` 与 `Archive` 仍在页面层调用读取服务；第一把只改变 Presentation 消费位置，不改变这些 Authority Reader 的含义，也不允许 Host 直接接管它们。

### 2.3 当前执行资源 Owner

| 资源 | 当前 Owner 数量 / 位置 | 风险 |
| --- | --- | --- |
| WebGL Context | 当前活动路由通常 1；Genesis Host 或 `RealityLifeUniverseCanvas` 各自创建 | 跨路由销毁 / 重建；无连续场景生命周期 |
| RAF | LaunchLab 1；Genesis 1；Reality / Gravity / Returning C2 1；App / Archive fallback 各可再建 1 | route fallback / 透明 Canvas 可形成重复执行 |
| Resize | LaunchLab window resize；Genesis / C2 各自 ResizeObserver | 多 Owner，切换时短暂交错 |
| Pointer | LaunchLab Canvas 四个 pointer listeners；Genesis Canvas 交互；Gravity / C1 DOM controls | Canvas 命中责任分散，透明 Canvas 仍可能保留事件责任 |
| Visibility | Lived Growth recovery observer 持有 storage / focus / visibility listeners；Renderer 没有全局统一后台策略 | 后台恢复通知与渲染暂停职责未分开冻结 |
| WebGL context loss | `genesisWebGLRendererCore` 监听 contextlost / restored | Core 已有能力，但每个页面 Host 各自管理生命周期 |

### 2.4 当前“同一主题”不等于“同一 Host”

`LIFE_UNIVERSE_STAR_FIELD` 使用固定 `LIFE_UNIVERSE_SEED` 生成 420 个确定性点；WebGL Core 还从稳定 render-plan reference 生成身体与粒子。这能保证拓扑可复现，但不能证明：

- Canvas / Context 没有因路由卸载；
- 相机目标与深度层没有重置；
- 同一时刻只有一个世界执行 Owner；
- fallback 不会建立另一个世界；
- 透明页面 Canvas 已停止 RAF 与事件监听。

---

## 3. 唯一 Continuous Scene Owner 裁决

### 3.1 唯一推荐方案：AppShell 级持久 Host

正式裁决：

```text
Xinmai production AppShell
└─ XinmaiContinuousSceneHostProvider
   ├─ XinmaiContinuousSceneHost（唯一 imperative Owner）
   ├─ Route Outlet / existing pages
   └─ Accessible / UI overlays
```

理由：

1. `AppShell` 已包围 `/launch-lab`、`/genesis`、`/reality`、`/dynamics`、`/archive`，且 Route children 切换时自身可保持；
2. Host 可在离开生产生命链、Identity 改变或可信 Presenter 失效时统一 dispose；
3. Route 仍保留 Admission、Controller、Navigation 与页面控件责任；
4. Host 不需通过常驻旧页面 DOM 维持连续性；
5. Direct URL / Refresh 可从 typed recovery 重新派生相同静态目标，而不是恢复动画帧。

### 3.2 Host 唯一职责

`XinmaiContinuousSceneHost` 只拥有：

- 唯一生产世界 Canvas 或唯一 Semantic Static root；
- 唯一 WebGL Context；
- 唯一 Scene RAF；
- 唯一 Scene ResizeObserver；
- 唯一 Scene visibility / background pause listener；
- 唯一 Canvas pointer listener 集；
- FAR / MID / NEAR composition；
- 当前可信 Scene Plan 的 commit proof；
- 相同 Identity / render-plan 下的跨路由资源复用；
- identity / plan / mode 改变或离开生产 Shell 时的 dispose；
- Presenter failure 后先释放失败表面，再选择 Static / Withheld。

Host 不拥有：

- Identity、Mother Code、Mansion Coordinate 或 Body Reference；
- Reality Intent / Encounter / Admission；
- Pressure、Observation、Choice 或 Action Route；
- Departure / Return / Lived Response；
- Fact、Eligibility、Formation、Crystal、Ownership 或 Body Imprint；
- Navigation / Route success；
- accessible copy 的业务含义；
- Storage Reader / Writer；
- Analytics、AI、商业或感官 Authority。

### 3.3 Route / Page / Renderer 责任

| 层 | 允许 | 禁止 |
| --- | --- | --- |
| Route | 恢复 / 验证 identity 与 admission；选择正式页面消费者；导航 | 创建 Renderer；以 path 自行宣布场景成功 |
| Page / Host | 从现有 typed decisions 组装只读 scene request；提供原生控件与 Controller callback | 读 Canvas / DOM / camera 判断 Fact；自行建世界 Canvas |
| Continuous Scene Resolver | 纯函数校验 references，生成 FAR / MID / NEAR plan | Storage、DOM、timer、RAF、随机写入、Authority writeback |
| Scene Host | 执行可信 plan；管理资源；输出 scene proof | 创建产品事实、导航、改变 C1/C2 outcome |
| Renderer | 只消费 plan；返回 internal presenter evidence | 读取 Storage / DOM semantic state；自行恢复 Imprint |

### 3.4 否决方案

| 方案 | 裁决 | 原因 |
| --- | --- | --- |
| 每个 Route 一个“共享组件” | REJECT | 组件代码共享不等于实例 / Context / camera 连续 |
| Route-bound Host | REJECT | 每次导航仍卸载并重建世界 |
| 常驻旧页面 DOM / Canvas | REJECT | 隐藏页面继续渲染、事件抢占、旧状态泄漏 |
| 全局单例 Renderer / RAF | REJECT | 脱离 React lifecycle，Direct URL / identity 变更无法安全 fencing |
| 只靠 CSS crossfade | REJECT | 双世界并存且 CSS 变成成功条件 |
| 只持久化 camera / particle state | REJECT | 把 Presentation 写成第二 Authority |
| AppShell persistent Host + typed rehydration | ACCEPT | 生命周期唯一，Refresh 可确定性恢复，Page 不失去业务责任 |

---

## 4. Genesis 与 C2 Same-Life Presenter 的关系

### 4.1 共享一个物理 Host，不合并 Authority

Genesis 与 C2 的关系冻结为：

```text
Genesis typed visual decisions
          ↓
Continuous Scene Host（同一个 Canvas / Context / camera）
          ↓
Genesis manifestation presentation mode

Recognized identity + Canonical Body decision
          ↓
Continuous Scene Host（同一个 Canvas / Context / camera）
          ↓
C2 Same-Life Body Presenter（唯一、原协议）
```

Genesis 是同一生命显现的早期 Presentation 阶段；它不能生成第二个持久身体引用，也不能把当前通用球体、月相核心或 28 宿轨道提升为 C2 Body Authority。

### 4.2 C2 三态原样嵌入

当当前 scene phase 需要已识别身体时，Host 必须消费 C2 公开选择 / outcome，而不是重写它：

| C2 状态 | Scene Host 行为 |
| --- | --- |
| `MOTION_SAME_LIFE_SURFACE_PRESENTED` | MID 仅挂载 `WEBGL_SAME_LIFE_BODY`；body presenter count = 1 |
| `STATIC_SAME_LIFE_SURFACE_PRESENTED` | MID 仅挂载 `SEMANTIC_STATIC_SAME_LIFE_BODY`；WebGL Context = 0 |
| `SAME_LIFE_SURFACE_SAFE_WITHHELD` | Scene 不宣称身体成功；保留 typed semantic / recovery controls |

Host 的公共 Scene Outcome 不得替代、折叠或放宽 C2 proof。需要 Same-Life Body 的 Scene success 必须同时校验：

- source / render-plan / identity / body references；
- C2 consumer 与当前 scene request；
- Body Presenter count = 1；
- Motion / Static 对应 Context count；
- Canonical Imprint references 与 stable nodes。

### 4.3 Genesis 退出项

第一把必须处理：

- `GenesisProductionRendererCanvasHost` 不再创建 route-local Canvas / Context / RAF；
- Genesis static response 不再以双 RAF 与 `SVG.isConnected` 提交视觉成功；
- Genesis 页面只发布 typed phase / calibration / interaction request；
- 通用球体、闭合轨道、月相核心只能作为阶段性 NEAR / FAR 构件，不能与 C2 Body 同时成为 MID 主体；
- Recognition 之后若 identity / body facts 未完成，进入 truthful transition / SAFE_WITHHELD，不复制身体。

---

## 5. 路由连续性与生命周期契约

### 5.1 可跨路由复用的资源

仅在以下全部不变量一致时复用：

- `sourceReferenceId`；
- `sourceRenderPlanReferenceId`；
- StarBeast Identity / Mansion Coordinate references（存在时）；
- Body Reference（需要 MID body 时）；
- native motion mode；
- Scene schema / renderer version；
- 当前 Host 未进入 failure / stale fencing。

可复用资源：

- Canvas / WebGL Context；
- Renderer Core controller；
- FAR immutable topology buffers；
- MID identity geometry buffers；
- camera target 的确定性前后状态；
-当前已提交 Scene Plan 作为短暂 transition hold。

不得复用为 Authority：

- 页面 local boolean；
- animation progress / current frame；
- pointer dwell / drag progress；
- pending timer；
- DOM element / `data-*`；
-未提交 Choice / Return / Formation 状态。

### 5.2 必须稳定重建的状态

Refresh、Direct URL、浏览器恢复、Host failure 后：

- 从 Route / Recovery Adapter 提供的 current typed facts 重新生成 Scene Plan；
- camera 使用 scene phase 的稳定 target，不恢复最后一帧；
- FAR seed 与 MID geometry 从稳定 references 纯派生；
- NEAR 当前对象从 current admission / checkpoint decision 派生；
- 没有 current proof 时不显示上一次用户的对象或 Imprint。

### 5.3 transition hold

路由 A 卸载到路由 B admission 完成之间，Host 可以保留 A 已提交的静态画面，但必须：

- source / identity 完全相同；
- NEAR 可触对象立即撤销，避免旧按钮 / hit target；
- 对 B 不提交成功 outcome；
- 只标记 `TRANSITION_HOLD_NO_NEW_AUTHORITY`；
- B 超时、mismatch 或 failure 后进入 Static / SAFE_WITHHELD。

### 5.4 恢复矩阵

| 情况 | Route / Authority 责任 | Scene Host 责任 | 结果 |
| --- | --- | --- | --- |
| 正常同 identity Route 切换 | 新 Route 提供 current admission / facts | 复用资源，提交新 plan | CONTINUE |
| Refresh | Recovery Adapter 恢复 current facts | 确定性重建，不恢复动画帧 | REHYDRATE |
| Back / Forward | 每个 Route 重新验证 current admission | stale request fencing；同 refs 才恢复 | REHYDRATE / WITHHOLD |
| Direct URL | Route 建立合法 admission；path 本身不够 | 无旧 plan 时 Static wait；current facts 后提交 | STATIC / PRESENT |
| 旧 Encounter | lifecycle Controller 判 continuation / terminal | 不显示旧 NEAR action | WITHHOLD / CONTINUE |
| Identity mismatch | Recovery / Route 返回 mismatch | dispose MID / NEAR、清除旧 refs | SAFE_WITHHELD |
| Canonical Imprint missing | C2 Projector 返回 NO_CANONICAL_IMPRINT | 同一 Body，无伪 Imprint | PRESENT BODY |
| Canonical Imprint corrupted | C2 SAFE_WITHHELD | 不渲染旧 / guessed Imprint | SAFE_WITHHELD |
| WebGL failure | Renderer typed failure | dispose Core / RAF / listeners，切 Static | STATIC |
| Route 离开生产生命链 | Router 正常导航 | dispose Host resources | CLOSED |

浏览器关闭、等待时间、路由跳转或 Canvas 卸载均不能伪造 Explicit Departure / Return。

---

## 6. 最小 typed Scene Contract

### 6.1 输入

建议新增纯 Presentation 类型；字段全部来自既有事实：

```text
XinmaiContinuousSceneInput
├─ schemaVersion
├─ consumerSurface
│  ENTRY_BIRTH | GENESIS | REALITY | GRAVITY_CHOICE
│  RETURNING_OWNERSHIP | ARCHIVE
├─ sourceReferenceId
├─ sourceRenderPlanReferenceId
├─ identityReferences | null
├─ bodyReferenceId | null
├─ routeAdmissionEvidence
├─ genesisPresentationDecision | null
├─ realityPressurePresentationDecision | null
├─ gravityObservationDecision | null
├─ choicePresentationDecision | null
├─ livedResponseCheckpointDecision | null
├─ c1OwnershipDecision | null
├─ c2CanonicalBodyImprintDecision
├─ c2SameLifeSurfaceOutcome | null
├─ nativeMotionPreference
└─ capabilityEvidence
```

`routeAdmissionEvidence` 只允许现有 typed admission / lifecycle references，不携带 Router location state 原对象、DOM 或用户原始私密文本。

### 6.2 三层只读输出

```text
XinmaiContinuousScenePlan
├─ scenePlanReferenceId（纯派生）
├─ factsRevision / fencing input
├─ FAR
│  ├─ topologyReference
│  ├─ qualityTier
│  └─ environmentFocus
├─ MID
│  ├─ presenterRequirement
│  ├─ identity / body / imprint references
│  └─ c2OutcomeRequirement
├─ NEAR
│  ├─ singleInteractiveObjectKind
│  ├─ sourceFactReferences
│  ├─ hitRegionContract
│  └─ actionPortReference
├─ cameraTarget
├─ motionPolicy
└─ safeWithheldReason
```

### 6.3 Scene public outcomes

只允许：

```text
CONTINUOUS_SCENE_MOTION_PRESENTED
CONTINUOUS_SCENE_STATIC_PRESENTED
CONTINUOUS_SCENE_SAFE_WITHHELD
```

Commit proof 至少包含：

- `sceneHostCount = 1`；
- `worldPresenterCount = 1`；
- `webglContextCount = 1`（Motion）或 `0`（Static）；
- `rafOwnerCount = 1`（Motion）或 `0`（Static）；
- source / render-plan / scene-plan refs；
- active FAR / MID / NEAR plan refs；
- 当前 phase 需要身体时的原始 C2 public outcome / proof；
- `interactiveNearObjectCount = 0 | 1`。

Scene Outcome 只证明 Presentation；任何业务 Controller 不得消费它推进 Choice、Fact、Formation 或 Navigation。

### 6.4 deterministic seed

允许的纯派生：

```text
FAR topology seed
= product visual grammar version
+ sourceRenderPlanReferenceId

MID geometry
= existing PersonalStarBeast render plan
+ Body Reference
+ Canonical Imprint deterministicGeometryKey

NEAR placement
= current typed fact reference
+ scene plan version
```

禁止持久化 camera frame、粒子坐标、animation progress、DOM state 或 random state；禁止新增 Storage Owner、用户画像或跨用户相同“人格星空”推断。

---

## 7. 单向数据图与消费者原子切换

### 7.1 单向关系

```text
Identity / Encounter / Observation / Choice / Growth Authorities
                           ↓
        existing Route Admission + Recovery Adapters
                           ↓
         existing typed Presentation Decisions
                           ↓
 XinmaiContinuousScenePresentationResolver（pure / read-only）
                           ↓
            XinmaiContinuousSceneHost
                           ↓
  Renderer Adapter → Motion / Static internal evidence
                           ↓
        Continuous Scene public outcome

Controller actions  ← native controls / typed NEAR action port

禁止：Renderer / DOM / camera / outcome → Authority writeback
```

### 7.2 第一把必须同提交切换

以下是 Runtime Application 的冻结文件边界。若施工发现必须修改 Authority 含义、新增 Store / Index / Writer，立即停止重新审计。

#### 新增核心文件

| 文件 | 责任 |
| --- | --- |
| `src/types/xinmaiContinuousScenePresentation.ts` | input / plan / proof / outcome / failure union |
| `src/services/xinmaiContinuousScenePresentationResolver.ts` | 纯函数校验 refs，生成 FAR / MID / NEAR |
| `src/services/xinmaiContinuousScenePresentationPolicy.ts` | 唯一 `ENABLED / SAFE_WITHHELD` Counter 字段 |
| `src/components/XinmaiContinuousSceneHostContext.tsx` | AppShell Host 与 Route publisher 的 typed port；无 Authority |
| `src/components/XinmaiContinuousSceneHost.tsx` | 唯一 imperative resource Owner |
| `src/renderers/xinmaiContinuousSceneRendererAdapter.ts` | 对现有 WebGL Core / Static Presenter 的单向执行适配 |
| `src/styles/xinmai-continuous-scene.css` | 单一 Host stacking / viewport / static layout |

#### 必须修改的现有生产文件

| 文件 | 原子切换责任 |
| --- | --- |
| `src/main.tsx` | 只引入新 Host 样式，不建立第二 Provider |
| `src/components/AppShell.tsx` | 在正式生命路由持有唯一 Host / Context；离开产品路由 dispose |
| `src/App.tsx` | `LifeUniverseRouteFallback` 退出独立 Canvas / RAF；改为 Host pending / semantic fallback |
| `src/pages/LaunchLab.tsx` | `light-field` 世界 Canvas、RAF、resize、Canvas pointer Owner 退出；Birth / Returning / checkpoint 发布 typed scene request |
| `src/pages/GenesisProductionExperiencePage.tsx` | 发布 Genesis phase / calibration / action port；不挂 route Canvas |
| `src/components/GenesisProductionRendererCanvasHost.tsx` | 删除 route-local Host 责任，或迁为无 Canvas 的 typed adapter 后无剩余消费者 |
| `src/pages/RealityProductionRouteEntry.tsx` | current admission / recovery 提供 scene publisher input；不消费 scene success 推进 intent |
| `src/components/RealityProductionHost.tsx` | 移除页面内 `RealityLifeUniverseCanvas`，保留 Pressure / native controls |
| `src/components/RealityLifeUniverseCanvas.tsx` | route-facing Canvas / RAF Owner 退出；C2 body execution 移入唯一 Host adapter，C2 public contract不变 |
| `src/pages/GravityProductionRouteEntry.tsx` | current gravity / imprint facts 提供 scene publisher input |
| `src/components/GravityProductionSurfaceHost.tsx` | 传递 Observation / Choice presentation requests，不创建世界 |
| `src/pages/GravityPage.tsx` | 删除 route-local C2 Canvas、`CosmicPageStarField`、`CosmicNebulaScene`、`CosmicAmbientStars` 与独立成功世界；保留 typed UI / NEAR request |
| `src/components/RealityGravityInertiaField.tsx` | 变为 Host NEAR typed presentation consumer；不得成为第二世界 |
| `src/components/XinmaiLivedResponseReturnSurface.tsx` | 发布 Return / Formation / Ownership scene phase；Authority 流程原样 |
| `src/components/XinmaiCrystalFormationOwnershipMoment.tsx` | 保留 C1 DOM controls；消费 Host placement，不持有 Renderer |
| `src/pages/PersonalityRingPage.tsx` | 删除 route-local C2 Canvas 与 `SharedLifeUniverseFallback` RAF；发布 Archive scene request |
| `src/components/XinmaiSemanticStaticSameLifeSurface.tsx` | 仅由唯一 Host 内部挂载；C2 proof / projection 保持 |
| `src/styles/genesis-production-experience.css` | 页面 Canvas stacking 退出，UI overlay 接入共享层级 |
| `src/styles/reality-pressure-presentation.css` | route-local world stacking / fallback 退出 |
| `src/styles/xinmai-same-life-surface.css` | Same-Life body 在唯一 Host 中布局；不改 C2 视觉方向 |
| `src/styles/xinmai-crystal-formation-ownership-moment.css` | Ownership 控件与 Host NEAR placement 对齐；不改文案 / hit semantics |

#### Gates 与注册

| 文件 | 责任 |
| --- | --- |
| `scripts/check-xinmai-continuous-scene-single-owner.mjs` | Host / Canvas / Context / RAF / listener 唯一 Owner |
| `scripts/check-xinmai-continuous-scene-consumer-cutover.mjs` | 正式路由无 route-local world success |
| `scripts/check-xinmai-continuous-scene-authority-boundary.mjs` | no Storage / DOM / timer / Renderer writeback |
| `scripts/check-xinmai-continuous-scene-motion-static-failure.mjs` | Motion / Reduced / Failure / Withheld |
| `scripts/check-xinmai-continuous-scene-forward-counter.mjs` | Counter 只切 policy，C1/C2 资产保护 |
| `package.json` | 注册 gate alias；不得删除 / 弱化既有 gates |

### 7.3 必须在同一提交退出的旧路径

- route-local `GenesisProductionRendererCanvasHost` Canvas / RAF；
- `RealityLifeUniverseCanvas` 在 Reality / Gravity / Returning / Archive 的四次页面级挂载；
- `LaunchLab.light-field` 的世界绘制、透明 RAF 与 Canvas pointer listeners；
- `App.LifeUniverseRouteFallback` 的独立 RAF world；
- `PersonalityRingPage.SharedLifeUniverseFallback` 的独立 RAF world；
- Gravity 的 `CosmicPageStarField` 与页面级 nebula / ambient star 成功表面；
- Genesis 双 RAF + DOM connected 的 static success；
- 任何旧共享 SVG / 外部轨道 /闭合椭圆 /第二身体回退。

页面文字与控件可以保留，但不能继续把“空黑字幕卡”或通用星空声明为 Scene success。

---

## 8. Motion / Static / Failure

### 8.1 模式契约

| 输入 | Scene 执行 | C2 Body | Public Scene outcome |
| --- | --- | --- | --- |
| Motion allowed + healthy WebGL | 1 Canvas / 1 Context / 1 RAF | 需要身体时消费 C2 Motion Presenter | `CONTINUOUS_SCENE_MOTION_PRESENTED` |
| Native Reduced Motion | 创建 Renderer 前选择 Static；Context 0 / RAF 0 | C2 Semantic Static | `CONTINUOUS_SCENE_STATIC_PRESENTED` |
| WebGL init / runtime failure | 释放失败 Renderer / listener / RAF，再挂 Static | C2 Semantic Static | `CONTINUOUS_SCENE_STATIC_PRESENTED` |
| facts / identity / proof 不可信 | 不提交成功 | C2 自身可独立 SAFE_WITHHELD | `CONTINUOUS_SCENE_SAFE_WITHHELD` |

### 8.2 禁止成功输入

以下只能作为调试 / 执行观察，不能成为 Scene success Authority：

- RAF 已运行；
- `frameCount > 0`；
- Canvas / SVG / DOM mounted；
- React layout effect 已执行；
- 动画结束；
- 固定 timer；
- WebGL Context 仍存在；
- CSS class / opacity / z-index；
- Console 没有错误。

可信成功来自：正确 Scene Plan + Presenter internal commit evidence + reference matching + C2 proof（当前阶段需要身体时）。

### 8.3 Failure 资产保护

Renderer failure、Context loss、低性能降级或 Counter 均不得：

- 删除 / 改写 Identity、Choice、Receipt、Crystal、Body Imprint；
- 阻断现有 C1 Ownership button / Continue；
- 阻断 Returning / Reality / Gravity 的语义控件；
- 重播 Formation；
- 恢复旧页面 Canvas、旧 shared SVG、外部轨道或通用星空伪成功。

---

## 9. 性能与资源所有权

### 9.1 唯一 Owner 预算

| 资源 | Motion | Static / Reduced | 规则 |
| --- | --- | --- | --- |
| Production world Canvas | 1 | 0 WebGL；最多 1 Semantic Static root | 隐藏 route Canvas = 0 |
| WebGL Context | 1 | 0 | 不按路由重建 |
| Scene RAF | 1 | 0 | Host 唯一调用方 |
| ResizeObserver | 1 | 1 或 0 | 观察 Host viewport，不观察每页 |
| Scene visibility listener | 1 | 1 | 后台立即暂停 Motion |
| Canvas pointer listener owner | 1 | 0 / native controls | DOM button 原生 handler 不计入 Canvas Owner |
| Same-Life Body Presenter | 1 | 1 | C2 既有不变量 |
| NEAR interactive scene object | 0 或 1 | 0 或 1 | 其他动作使用明确 DOM controls |

### 9.2 生命周期

- 同 identity / plan 的生产路由切换：保留 Context / buffers，只更新 plan；
- identity / plan mismatch：先撤销 NEAR、dispose / reset，再接收新 plan；
- 离开生产 AppShell：取消 RAF、observer、pointer、visibility、context listeners，dispose Core；
- `document.hidden`：停止 RAF，不以后台累计时间补播；
- 回前台：从 current typed plan 恢复，不重播 Genesis / Formation；
- Context loss：停止提交；释放可释放资源；Static 接管；
- hidden page / opacity 0 Canvas：禁止继续渲染。

### 9.3 降级与预算

沿用上一 MAP 目标：

- 中档 Android first trusted static surface ≤ 2.5s；
- Motion frame p95 ≤ 22ms；
- DPR 上限 2；
- V1 新纹理 / 模型 = 0；
- V1 新压缩 JS 目标 ≤ 80KB gzip；
- 新 GPU 常驻内存目标 ≤ 32MB；
- Save-Data：确定性 Low / Static，保留 Body / node / Imprint；
- 低端设备 / 热量压力：先减 FAR 采样、DPR 与后处理，不减事实；
- 内存压力 / context loss：Static，不清 canonical assets；
- 不调用 Battery API，不记录电量，不形成画像；
- Android `GL_INVALID_ENUM` 既存债务单独记录，候选不得新增可见损坏。

---

## 10. Forward SAFE_WITHHELD Counter

### 10.1 提交关系

```text
Runtime Candidate
└─ Forward Counter（直接子提交，本地，不推送）
```

Counter 只允许一个策略变化：

```text
XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY
ENABLED → SAFE_WITHHELD
```

### 10.2 Counter 行为

Counter 暂停：

- 新 FAR / camera / depth continuity；
- 新 Genesis / Reality / Gravity / Choice / Return 的空间物理化；
- 新 Scene public success；
- 新 Scene canvas pointer interaction。

Counter 保留：

- C1 Formation / Ownership、Receipt、Crystal、Continue；
- C2 Body Reference、Canonical Imprint、stable node 与 public outcomes；
- C2 Motion / Semantic Static 唯一 Body Presenter；
- Returning、Lived Response、Reality / Gravity 的原生语义控件；
- Accessible Semantic Mirror；
- 已有 Authority / Recovery Adapter 读取；
- 所有用户资产与历史记录。

Counter 不得恢复：

- `LaunchLab.light-field` 世界成功路径；
- Genesis route-local Canvas；
- Reality / Gravity / Returning / Archive route-local world Canvas；
- App / Archive independent RAF fallback；
- Gravity 通用星空；
- 旧 shared SVG / double presenter；
- 外部轨道 / 闭合椭圆；
- Page / DOM / timer success truth。

### 10.3 Counter 文件范围

首选仅修改：

```text
src/services/xinmaiContinuousScenePresentationPolicy.ts
```

若 Counter 需要修改第二个 Runtime 文件，说明候选没有把 SAFE_WITHHELD 行为原子封装，必须停止并重新审计。

### 10.4 Counter 验证矩阵

- TypeScript / Production Build / 全 Gates；
-新 Scene Outcome 仅 SAFE_WITHHELD；
- C1 Ownership 正常、Formation 不重播；
- C2 Motion / Static / Canonical Imprint 可读；
- Reality、Gravity、Returning、Archive controls 可达；
- no-fact、Direct URL、Refresh / Back / Forward truthful；
- world Canvas / RAF / Context 不以旧路径复活；
- asset deletion / Storage mutation / Legacy Authority = 0。

---

## 11. 分刀裁决

### 11.1 不允许按路由拆 Owner

以下迁移方式被否决：

```text
先迁 Genesis
→ Reality 仍持有旧世界
→ Gravity / Returning / Archive 之后再迁
```

它会形成：

- 新 Host 与旧 Route Canvas 并存；
- route-specific success outcomes；
- Counter 无法覆盖所有世界 Owner；
- C2 Body 在不同表面重复挂载；
- Android / Reduced Motion 结论不可解释。

### 11.2 允许的拆分方式

拆分按“唯一 Owner 已关闭后的视觉能力”进行：

| 刀序 | 交通灯 / 类型 | 消费者范围 | 独立 rollback | 关闭条件 |
| --- | --- | --- | --- | --- |
| V1 Single-Owner Host + Depth Foundation | `RED / Atomic Migration` | AppShell + 所有正式路由 + Renderer / Static adapter + Gates | Continuous Scene policy → SAFE_WITHHELD；C1/C2 pass-through 保留 | 所有旧世界 Owner 同提交退出；Host / Context / RAF / Body 均唯一；跨路由 refs 不变 |
| V2 Genesis Birth Spatial Interaction | `YELLOW / Visual Major Blade` | LaunchLab birth + Genesis typed scene requests；不创建新 Host | Birth scene capability withheld；正式输入 / Identity 保留 | 出生输入与空间回应可理解；无字幕空黑；键盘 / 读屏 /窄视口通过 |
| V3 Reality / Gravity / Choice Physicalization | `YELLOW / Visual Interaction Major Blade` | Reality / Pressure / Observation / Choice NEAR presenters | Semantic physicalization withheld；Controller / native controls 保留 | 靠近、看见、认出、双向力场成立；系统不审判；不推进 Authority |
| V4 Returning / C1 / C2 Same-Life Integration | `RED / Atomic Consumer Integration` | Departure / Return / checkpoint / Formation / Ownership / Archive | 新 continuity integration withheld；C1/C2 public presentation保留 | 同一 node、恢复不重播、四消费者 refs、no-fact、Counter 资产保护 |
| V5 Accessibility / Performance / Android Closure | `GREEN / Evidence + bounded refinement` | 全链 | 每项独立 presentation / perf policy | VoiceOver、TalkBack Release Gate、200%、焦点、Motion / Reduced / failure、热量 / Save-Data |

V1 是唯一 Owner 迁移，必须一次切完全部正式路由；V2–V4 不得再创建 Host、Canvas、RAF 或 Body Presenter，只能新增 / 校准 Scene Plan 与 FAR / MID / NEAR 构件。

### 11.3 V1 Runtime 申请前的停止条件

若施工发现任一项，立即返回 `RE-AUDIT REQUIRED`：

- 必须改变 Identity / Growth / C1 / C2 Authority；
- 必须新增 DB、Store、Index、Storage Writer；
- 无法在一个提交移除全部 route-local world success；
- LaunchLab Canvas interaction 无法迁为 typed NEAR port；
- Same-Life Presenter 必须复制才能满足 Genesis；
- Counter 不能只靠单 policy 安全扣留；
- Static 仍需 DOM / RAF / timer 冒充成功；
- AppShell Host 无法对 Direct URL / identity mismatch 做 fencing。

---

## 12. V1 后续验收矩阵

### 12.1 工程完整性

- Candidate parent = 当时最新 Remote HEAD；
- Candidate / Counter TypeScript、Production Build、完整 Gates；
- Gate 删除 / 漏注册 / 弱化 = 0；
-新 DB / Store / Index / Writer / Authority = 0；
- Production Bundle Acceptance / Fixture / fault injection = 0；
- main worktree 用户修改不进入候选；
- Counter 为 Candidate 直接子提交且不推送。

### 12.2 Host / Consumer

- production Scene Host = 1；
- production world Canvas = Motion 1 / Static 0；
- WebGL Context = Motion 1 / Reduced 0 / failure final 0；
- RAF = Motion 1 / Static 0 / hidden 0；
- Same-Life Body Presenter = 1；
- page-local world success = 0；
- hidden Canvas rendering = 0；
- route-local fallback RAF = 0；
- Native DOM buttons 保持真实命中。

### 12.3 路由与事实

- `/launch-lab` new / returning；
- `/genesis`；
- `/reality`；
- `/dynamics` Observation / Choice；
- Explicit Departure / Return；
- Formation pending / Ownership / recovered ownership；
- `/archive`；
- no Identity / no Imprint / single / multi Imprint；
- Direct URL、Refresh、Back / Forward、stale cycle、identity mismatch；
- 同一 source / render-plan / body / imprint references；
- Scene outcome 不推进任何业务状态。

### 12.4 Motion / Static / Android

- macOS / iOS / Android Motion；
- Native Reduced Motion 创建 WebGL = 0；
-合法 WebGL context loss 后 Static；
- Android 无洋红块、第二身体、外轨或闭合椭圆；
- 320×568、360×800、390×844、430×932、原生 200%；
- first trusted static、frame p95、GPU memory、background pause；
- Save-Data Low / Static；
-关键文字 4.5:1、意义连接 3:1；
- VoiceOver / keyboard；TalkBack 完整矩阵仍属于 Android Release Gate。

### 12.5 视觉因果

- Transition hold 无可触旧 NEAR；
- Genesis → Reality 相机轴不重新开场；
- Reality → Gravity 同一身体 / source refs；
- Departure 向外打开但不伪造行动；
- Return 恢复同一身体；
- Formation 只在 IDB complete 后形成；
- Ownership Crystal 长入同一 node；
- recovery 不重播；
- Archive 同一 Imprint / Body；
-空黑字幕卡、通用壁纸与页面级成功表面 = 0。

---

## 13. 阶段冻结与出口

```text
C1 Formation / Ownership：
CLOSED / PASS

C2 Canonical Body Imprint / Single Presenter：
CLOSED / PASS

Global Continuous Life World：
OPEN

Phase 3：
ACTIVE / NOT PASSED

C3 Haptic-first Runtime：
PAUSED

C3 Audio Runtime：
SAFE_WITHHELD / DEFER / SILENT

Prompt / AI Runtime：
DEFER

Research Execution：
BLOCKED

Monetization Runtime：
DEFER

Phase 4：
LOCKED
```

### 13.1 正式出口

```text
B. SPLIT MIGRATION APPLICATION READY
```

证据：

1. `AppShell` 已提供唯一可跨正式路由存活的布局边界；无需新增导航或持久化 Authority。
2. `genesisWebGLRendererCore` 已被 Genesis 与 C2 使用，具备共享执行基础，但当前 RAF / Context Owner 分散。
3. C2 public proof 已能约束唯一 Body Presenter；新 Host 可以组合而不能替代它。
4. 当前所有独立世界表面与 fallback 均已定位，`UNKNOWN = 0`。
5. 第一把可在不改 Storage / Schema / Authority 的条件下做原子消费者切换。
6. 后续语义视觉能力可在唯一 Host 关闭后独立回滚，不需要把所有美术与交互塞进同一超大提交。

### 13.2 下一刀

```text
XINMAI-PHASE-3-CONTINUOUS-SCENE-HOST-
SINGLE-OWNER-ATOMIC-CONSUMER-CUTOVER-P0

交通灯：RED
刀型：Migration Blade / Atomic Scene Owner Cutover
决策：等待 Product Control Tower 授权
```

该刀只建立唯一 Host、typed Scene contract、C2 Presenter 复用、全部旧世界消费者退出、Motion / Static / Failure 与 Forward Counter；不得顺带做 V2–V4 的视觉重设计、Shader-first、C3 Haptic / Audio、AI、商业或 Phase 4。

---

## 14. 验证与交付记录

| 项 | 结果 |
| --- | --- |
| Part 1 远程精确交付 | `0c1bf9ef984a2333f83f50f7aa2557f86167049d` |
| Audit Parent | `0c1bf9ef984a2333f83f50f7aa2557f86167049d` |
| 隔离工作树 / 分支 | PASS |
| 正式 Host / Route / Canvas / Renderer 清点 | PASS；UNKNOWN = 0 |
| C1 / C2 Authority 边界 | UNCHANGED / CLOSED |
| Runtime / Renderer / CSS / Gate / Authority / Storage / Schema / 文案 / 资产差异 | `0` |
| 新增文件 | 本 Audit 文档 1 份 |
| TypeScript / Build | `N/A — DOC-ONLY MIGRATION AUDIT` |
| `git diff --check` | PASS |
| Audit Push | HOLD |

最高原则：

> 让选择的保护、收益与代价显形；让用户在现实中决定拿起什么、放下什么；系统不审判，真实行动才形成成长留痕。

Continuous Scene Host 不是新的生命 Authority，也不是第二套 Growth Runtime。它只把已经成立的事实放回同一个持续世界，并确保任何 Route、Renderer、动画或降级都不能替用户决定发生了什么。
