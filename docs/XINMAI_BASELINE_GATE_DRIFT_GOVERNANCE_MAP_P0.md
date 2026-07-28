# XINMAI Baseline Gate Drift Governance Map P0

任务编号：

`XINMAI-BASELINE-GATE-DRIFT-GOVERNANCE-MAP-P0`

项目：

`/Users/xieyanjun/Desktop/guanyao-h5`

模式：

远程基线门禁漂移治理映射。

刀型：

`MAP`

决策：

`NOW — MAP ONLY`

影响层：

工程控制面。

产品 Layer：

```text
World        不变
Identity     不变
Relationship 不变
Growth       不变
Sanctuary    不变
```

状态：

`MAP COMPLETE / ASSERTION REPAIR NOT YET AUTHORIZED`

审查日期：

`2026-07-28`

审查基线：

`afc7a84301157b1553a8118e42c43adda014a238`

---

## 一、Construction State Card

```text
当前 Phase：
Phase 1 → Phase 2

当前 A 主线：
First Encounter → Life Companion

本刀类型：
MAP

主影响层：
Engineering Control Plane

产品 Layer 影响：
NONE

已有完成资产：
远程干净基线
Blade 2 Runtime
Relationship Naming Asset Persistence MAP
Genesis → Reality 连续链
Reality V2
Reality 连续生命画布

本刀消费者：
五项既存门禁及其权威 Runtime

是否存在协议冲突：
无

是否需要迁移审计：
不需要

决策：
NOW — MAP ONLY
```

---

## 二、唯一目标

本刀只回答：

> 当前五项门禁失败，是产品 Runtime 失效，还是检查断言没有跟随已经提交的权威行为？

并为每一项冻结：

1. 权威消费者；
2. 当前 Runtime 事实；
3. 旧断言；
4. 漂移来源；
5. 最小修复；
6. 不可修改范围；
7. 回滚单位；
8. 独立完成标准。

本刀不修改：

- 产品 Runtime；
- 页面；
- Renderer；
- 类型；
- Service；
- 路由；
- Life Whisper；
- Relationship Naming；
- Pressure Seed；
- Reality 因果；
- DOM → Renderer 通道。

---

## 三、审查方法

### 3.1 干净基线

所有门禁复现来自：

```text
origin/codex/genesis-28-mansion-production-continuity
@ afc7a84301157b1553a8118e42c43adda014a238
```

审查在隔离工作副本中完成。

主工作树既存修改没有参与结论。

### 3.2 证据来源

逐项使用：

- 门禁真实执行结果；
- 当前 Runtime 源码；
- 当前类型边界；
- `git log -S`；
- `git blame`；
- 引入权威行为的原始提交差异。

### 3.3 裁决原则

不是看到检查失败就修改产品。

采用：

```text
失败断言
↓
找到权威消费者
↓
确认当前行为是否有正式来源
↓
比较断言与 Runtime
↓
裁决：
RUNTIME_FIX
或
GATE_FIX
```

本次五项全部裁决为：

```text
GATE_FIX
```

没有一项需要 Runtime 修复。

---

## 四、复现总览

| 编号 | 门禁 | 当前失败 | 裁决 |
| --- | --- | --- | --- |
| G1 | `check-genesis-production-recognition-reality-entry` | 仍要求旧工程提示文案 | `GATE_DRIFT` |
| G2 | `check-genesis-production-experience-page` | 仍要求旧单参数导航文本 | `GATE_DRIFT` |
| G3 | `check-genesis-reality-explicit-route-handoff` | 仍按旧单参数导航定位顺序 | `GATE_DRIFT` |
| G4 | `check-reality-production-route-entry` | 仍要求旧 Gravity Hold 状态与边界 | `GATE_DRIFT` |
| G5 | `check-genesis-webgl-renderer-core-extraction` | 授权消费者清单缺少 Reality 连续画布 | `GATE_DRIFT` |

复现结果：

```text
5 / 5
稳定复现
```

共同特征：

- 失败都发生在静态字符串断言；
- 权威 Runtime 已由后续正式提交改变；
- 类型与产品链路支持当前 Runtime；
- 旧门禁未同步更新；
- 恢复旧 Runtime 会破坏已经成立的生命连续性。

---

## 五、门禁治理最高原则

### 5.1 门禁保护产品，不冻结历史写法

门禁应该保护：

- 因果顺序；
- 授权边界；
- 身份连续；
- 显式用户动作；
- 禁止旁路；
- 消费者白名单。

门禁不应该永久冻结：

- 一句已经淘汰的工程提示；
- 函数调用的旧参数形态；
- 已被产品升级替代的状态名；
- 未同步扩展的旧消费者列表。

### 5.2 不通过恢复旧行为让检查变绿

本次禁止：

- 把 `Reality Entry 已准备好。` 放回页面；
- 删除导航中的 `visualContinuity`；
- 删除 Reality 进入前的视觉停顿；
- 把 `GRAVITY_READY_TO_CONTINUE` 改回 `GRAVITY_READY_HOLD`；
- 移除 Reality 连续生命画布；
- 为通过门禁绕开 WebGL Core；
- 扩大任何产品功能。

### 5.3 修复门禁时不降低保护强度

门禁更新必须：

- 删除失效断言；
- 用当前权威语义替换；
- 保留原本仍有效的禁止项；
- 对新增授权消费者使用精确白名单；
- 不使用宽泛目录或模糊匹配。

---

## 六、G1｜Recognition → Reality Entry 门禁

门禁：

`scripts/check-genesis-production-recognition-reality-entry.mjs`

### 6.1 当前可见失败

```text
[GENESIS PRODUCTION RECOGNITION REALITY ENTRY] FAIL
production page owns explicit completion interactions
missing=Reality Entry 已准备好。
```

### 6.2 潜在第二失败

该门禁在第一个缺失项处停止。

继续审查发现它还要求：

```text
navigate(handoff.routeTarget)
```

当前权威调用为：

```text
navigate(handoff.routeTarget, {
  state: { visualContinuity },
});
```

因此 G1 实际包含两个旧断言：

1. 旧工程准备文案；
2. 旧单参数导航文本。

### 6.3 权威消费者

权威消费者：

`src/pages/GenesisProductionExperiencePage.tsx`

权威服务：

- `initializeGenesisProductionRecognitionRealityEntry`
- `advanceGenesisProductionRecognitionRealityEntry`
- `activateGenesisProductionRealityEntryContext`
- `resolveGenesisProductionRealityRouteHandoff`

### 6.4 当前 Runtime 事实

当前页面仍然具有：

- `RECOGNITION_CONFIRM`；
- `ENTER_REALITY`；
- `data-reality-entry-eligibility`；
- 用户主动认出；
- 用户主动进入 Reality；
- 显式 Handoff 解析；
- 唯一授权路由目标；
- Recognition → Reality 的双动作门禁。

旧文案已经被移除：

```text
Reality Entry 已准备好。
```

移除原因不是功能缺失，而是它会把关系体验重新表达为系统状态。

### 6.5 Git 证据

旧断言来源：

```text
c3ec230
```

页面正式移除旧文案：

```text
a3acdd5
feat: carry recognized presence into reality
```

同一提交同时加入：

- Reality 进入视觉停顿；
- `visualContinuity` 传递；
- 同一生命进入 Reality 的连续节奏。

门禁没有随提交更新。

### 6.6 裁决

```text
Runtime：
AUTHORITATIVE

旧门禁：
STALE

修复方向：
GATE ONLY
```

### 6.7 最小修复

未来修复刀只允许修改：

`scripts/check-genesis-production-recognition-reality-entry.mjs`

具体：

1. 删除对旧文案的正向存在断言；
2. 增加旧工程文案不得回归的反向断言；
3. 将导航标记更新为当前双参数调用：

```text
navigate(handoff.routeTarget, {
```

4. 保留全部 Runtime 行为测试；
5. 保留无 Pressure Runtime、无存储、无 Renderer 的边界断言。

建议替代：

```text
assertExcludes(
  "production page exposes no engineering readiness copy",
  source.page,
  "Reality Entry 已准备好。",
)
```

### 6.8 禁止修复

禁止：

- 恢复旧文案；
- 删除 `visualContinuity`；
- 改回即时导航；
- 修改 Recognition Session；
- 修改 Reality Handoff；
- 修改 Life Whisper；
- 修改页面产品文案以迁就旧检查。

### 6.9 回滚单位

```text
单一检查文件
```

回滚不得包含 Runtime。

### 6.10 Definition of Done

- G1 PASS；
- Recognition Runtime 测试继续 PASS；
- 页面无旧工程提示；
- Navigation 仍消费授权 Handoff 与 `visualContinuity`；
- 没有产品文件变化。

---

## 七、G2｜Genesis Production Experience Page 门禁

门禁：

`scripts/check-genesis-production-experience-page.mjs`

### 7.1 当前失败

```text
[GENESIS PRODUCTION EXPERIENCE PAGE] FAIL
page owns only explicit authorized Reality navigation
missing=navigate(handoff.routeTarget)
```

### 7.2 权威消费者

`src/pages/GenesisProductionExperiencePage.tsx`

### 7.3 当前 Runtime 事实

页面仍然：

- 使用 `useNavigate`；
- 激活 Reality Entry Context；
- 解析正式 Reality Handoff；
- 只在 `handoff.status === "READY"` 时导航；
- 不硬编码 `/reality`；
- 只存在一次 `navigate(`；
- 传递同一生命的 `visualContinuity`。

失配只来自文本：

```text
旧：
navigate(handoff.routeTarget)

新：
navigate(handoff.routeTarget, {
```

### 7.4 Git 证据

旧断言来源：

```text
64d0f1b
```

正式导航增加 `visualContinuity`：

```text
6c5dbf5
feat: unify real user life journey visuals
```

随后增加视觉停顿：

```text
a3acdd5
```

另一项 Reality Route Entry 门禁已经在 `6c5dbf5` 中同步改为：

```text
navigate(handoff.routeTarget, {
```

这证明当前双参数导航已被工程正式接受。

### 7.5 裁决

```text
Runtime：
AUTHORITATIVE

旧门禁：
STALE EXACT STRING

修复方向：
GATE ONLY
```

### 7.6 最小修复

只修改：

`scripts/check-genesis-production-experience-page.mjs`

替换一个静态标记：

```text
navigate(handoff.routeTarget)
```

为：

```text
navigate(handoff.routeTarget, {
```

其他编译、边界、禁止项全部保留。

### 7.7 禁止修复

- 删除导航状态；
- 改写页面；
- 改写 Handoff；
- 放宽为任意 `navigate(`；
- 允许硬编码 `/reality`；
- 接受第二个导航调用。

### 7.8 回滚单位

```text
单一检查文件中的单一标记
```

### 7.9 Definition of Done

- G2 PASS；
- 页面独立编译 PASS；
- 仍只有一次导航；
- 仍不硬编码 Reality；
- 仍无 fixture、prototype 或 storage 旁路；
- 产品文件零变化。

---

## 八、G3｜Genesis → Reality Explicit Handoff 门禁

门禁：

`scripts/check-genesis-reality-explicit-route-handoff.mjs`

### 8.1 当前失败

```text
[GENESIS REALITY EXPLICIT ROUTE HANDOFF] FAIL
Genesis page performs explicit authorized handoff
missing=navigate(handoff.routeTarget)
```

### 8.2 权威消费者

- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/services/genesisProductionRealityRouteHandoff.ts`
- `src/services/genesisProductionRecognitionRealityEntry.ts`

### 8.3 当前 Runtime 事实

Handoff 因果顺序仍然成立：

```text
activateGenesisProductionRealityEntryContext
↓
resolveGenesisProductionRealityRouteHandoff
↓
handoff.status === READY
↓
navigate(handoff.routeTarget, { state })
```

当前检查的 Runtime 测试仍验证：

- 缺少 Context 时不能导航；
- fixture source 被阻断；
- cross-session mismatch 被阻断；
- READY 只指向 `/reality`；
- sourceReferenceId 连续；
- 结果不可变。

失败只发生在页面源码的旧精确字符串。

### 8.4 潜在第二失败

检查还使用：

```js
const navigationIndex =
  source.page.indexOf("navigate(handoff.routeTarget)");
```

即使更新前面的 Includes，顺序断言仍会失败。

因此必须同时更新：

1. Includes 标记；
2. `navigationIndex` 标记。

### 8.5 裁决

```text
Runtime：
AUTHORITATIVE

Handoff Service：
AUTHORITATIVE

旧页面字符串断言：
STALE

修复方向：
GATE ONLY
```

### 8.6 最小修复

只修改：

`scripts/check-genesis-reality-explicit-route-handoff.mjs`

同时替换：

```text
navigate(handoff.routeTarget)
```

为：

```text
navigate(handoff.routeTarget, {
```

位置：

- `assertIncludes`；
- `navigationIndex`。

必须保留：

- activation 在 resolution 之前；
- resolution 在 navigation 之前；
- 单一导航调用；
- 不硬编码 URL；
- 不把 sourceReferenceId 放入 URL；
- 无 router invocation 的 Service 边界；
- Runtime Handoff 验证。

### 8.7 禁止修复

- 删除顺序断言；
- 只断言任意 `navigate(`；
- 修改 Handoff Service；
- 修改 Context；
- 将 `sourceReferenceId` 放入 query 或 route state；
- 删除 Runtime 测试以让检查通过。

### 8.8 回滚单位

```text
单一检查文件中的两个同源标记
```

两个标记必须作为一个原子回滚单位。

### 8.9 Definition of Done

- G3 PASS；
- 缺 Context、fixture、mismatch 仍被阻断；
- READY Handoff 仍精确指向 Reality；
- activation → resolution → navigation 顺序仍被验证；
- 产品文件零变化。

---

## 九、G4｜Reality Production Route Entry 门禁

门禁：

`scripts/check-reality-production-route-entry.mjs`

### 9.1 当前可见失败

```text
[REALITY PRODUCTION ROUTE ENTRY] FAIL
Reality production host boundary
missing="GRAVITY_READY_HOLD"
```

### 9.2 潜在第二失败

检查随后仍要求：

```text
gravityReadinessHoldOnly: true
```

当前权威边界为：

```text
explicitGravityContinuationCallbackOnly: true
```

因此 G4 也包含两个旧断言：

1. 旧 Host State；
2. 旧边界字段。

### 9.3 权威消费者

- `src/components/RealityProductionHost.tsx`
- `src/types/realityProductionRouteEntry.ts`
- `src/services/realityProductionPressureSeedConsumer.ts`
- `src/components/RealityPressureSeedPresentation.tsx`

### 9.4 当前 Runtime 事实

当前状态：

```text
未认出 Pressure Seed：
PRESSURE_SEED_RECOGNITION

已认出且 Gravity Ready：
GRAVITY_READY_TO_CONTINUE
```

Host 只在：

```text
gravityReadiness === READY
+
selectedPressureSeedContext !== null
```

时调用：

```text
onContinueToGravity(...)
```

Host 本身仍然：

- 不执行 Gravity；
- 不引入 Gravity Runtime；
- 不执行 Choice；
- 不执行 Crystal；
- 不导航；
- 只通过显式 callback 交付已经被用户认出的 Reality。

### 9.5 Git 证据

旧状态与边界来源：

```text
ad0b8a8
```

正式升级为显式继续：

```text
3c60e7e
feat: reveal gravity as repeated life response
```

该提交将：

```text
GRAVITY_READY_HOLD
```

改为：

```text
GRAVITY_READY_TO_CONTINUE
```

并将：

```text
gravityReadinessHoldOnly
```

改为：

```text
explicitGravityContinuationCallbackOnly
```

检查没有同步。

### 9.6 裁决

```text
当前 Runtime：
AUTHORITATIVE

当前 Type Boundary：
AUTHORITATIVE

旧检查：
STALE

修复方向：
GATE ONLY
```

### 9.7 最小修复

只修改：

`scripts/check-reality-production-route-entry.mjs`

替换：

```text
"GRAVITY_READY_HOLD"
```

为：

```text
"GRAVITY_READY_TO_CONTINUE"
```

替换：

```text
gravityReadinessHoldOnly: true
```

为：

```text
explicitGravityContinuationCallbackOnly: true
```

建议同时增加正向断言：

- `onContinueToGravity`
- `pressureSeedSession.gravityReadiness !== "READY"`
- `selectedPressureSeedContext === null`

这样门禁验证的是：

> 只有用户认出有效 Reality 后，Host 才能显式交付给 Gravity。

### 9.8 禁止修复

- 把 Runtime 改回 Hold；
- 删除显式 callback；
- 让 Reality Host 直接执行 Gravity；
- 删除 `noGravityExecution`；
- 放宽 `gravityReadiness`；
- 修改 Pressure Seed 因果；
- 修改 Reality 页面产品体验。

### 9.9 回滚单位

```text
单一检查文件中的状态断言与边界断言
```

二者必须保持同步。

### 9.10 Definition of Done

- G4 PASS；
- Reality Route Entry 独立编译 PASS；
- Gravity 只通过显式 callback 交付；
- Host 仍不执行 Gravity；
- V2 Pressure Seed 边界继续成立；
- 产品文件零变化。

---

## 十、G5｜WebGL Renderer Core Consumer 门禁

门禁：

`scripts/check-genesis-webgl-renderer-core-extraction.mjs`

### 10.1 当前失败

```text
[GENESIS WEBGL RENDERER CORE EXTRACTION] FAIL

only authorized facades consume shared core

expected=
src/prototypes/isolatedWebGLRendererPrototype.ts,
src/renderers/genesisProductionRendererHost.ts

actual=
src/components/RealityLifeUniverseCanvas.tsx,
src/prototypes/isolatedWebGLRendererPrototype.ts,
src/renderers/genesisProductionRendererHost.ts
```

### 10.2 权威消费者

当前三个真实消费者：

1. `src/prototypes/isolatedWebGLRendererPrototype.ts`
2. `src/renderers/genesisProductionRendererHost.ts`
3. `src/components/RealityLifeUniverseCanvas.tsx`

### 10.3 当前 Runtime 事实

`RealityLifeUniverseCanvas`：

- 在正式 Reality 路径中使用；
- 消费 `visualContinuity`；
- 验证 `REAL_USER_EXPERIENCE`；
- 验证 `REAL_USER_SESSION`；
- 验证同一 `sourceReferenceId`；
- 复用同一 `createGenesisWebGLRendererCore`；
- 保持同一生命画布；
- 负责 resize、animation frame 与 dispose；
- 已被后续 Reality、Gravity、Crystal 连续视觉持续消费。

它不是：

- 新 Engine；
- 新星兽；
- fixture；
- prototype；
- 第二套身份来源。

### 10.4 Git 证据

旧授权清单来源：

```text
ba255c2b
```

Reality 连续画布正式加入：

```text
6c5dbf5
feat: unify real user life journey visuals
```

该提交明确目标：

> 让 Genesis 与 Reality 消费同一生命视觉。

授权清单没有同步增加第三个消费者。

### 10.5 架构裁决

当前 Reality Canvas 的存在是权威产品资产。

本次不授权：

- 把它迁移到新的 Renderer Host；
- 重构 Core；
- 修改组件职责；
- 处理 DOM → Renderer 债务。

因此短期裁决：

```text
RealityLifeUniverseCanvas
=
EXPLICIT AUTHORIZED CORE CONSUMER
```

长期裁决：

```text
是否抽取 Reality Renderer Host
=
DEFER
```

### 10.6 最小修复

只修改：

`scripts/check-genesis-webgl-renderer-core-extraction.mjs`

将精确授权清单更新为：

```text
src/components/RealityLifeUniverseCanvas.tsx
src/prototypes/isolatedWebGLRendererPrototype.ts
src/renderers/genesisProductionRendererHost.ts
```

必须使用精确路径白名单。

禁止改成：

- 任意 `src/components/*`；
- 任意包含 `Canvas` 的文件；
- 任意 Renderer Core consumer；
- 只检查数量。

### 10.7 必须补强的边界断言

单纯增加白名单会承认现状，但还不足以保护边界。

建议门禁同时读取：

`src/components/RealityLifeUniverseCanvas.tsx`

并验证：

- 只消费 `visualContinuity` 绑定的真实来源；
- 检查 `REAL_USER_EXPERIENCE`；
- 检查 `REAL_USER_SESSION`；
- 检查 `sourceReferenceId` 连续；
- 正确释放 `renderer.dispose()`；
- 不引用 fixture；
- 不引用 prototype；
- 不调用身份或出生计算；
- 不拥有路由；
- 不拥有 Relationship Naming；
- 不通过 DOM data 属性反向读取关系状态。

### 10.8 与 DOM → Renderer 债务的关系

本门禁修复只承认：

```text
Reality Canvas 是已存在的显式 Core 消费者
```

它不处理：

```text
Renderer
↓
canvas.closest(...)
↓
读取页面 data-* 状态
```

DOM → Renderer 债务继续：

```text
DEFER / DO NOT EXPAND
```

G5 修复不得新增任何 DOM 反向读取。

### 10.9 禁止修复

- 删除 Reality 连续画布；
- 复制一个新的 WebGL Core；
- 让 Reality 回退到静态背景；
- 扩大白名单到目录；
- 顺手重构 Renderer；
- 修改视觉表现；
- 修改 DOM → Renderer 通道；
- 修改 Genesis 或 Reality 身份来源。

### 10.10 回滚单位

```text
单一检查文件中的精确消费者清单
+
Reality Consumer 边界断言
```

### 10.11 Definition of Done

- G5 PASS；
- 消费者仍精确等于三个；
- 新增第四个消费者会失败；
- Reality Consumer 的来源与释放边界被验证；
- Core 仍不拥有 source、authorization、router 或 storage；
- 产品文件零变化。

---

## 十一、五项门禁权威关系

```text
Genesis Recognition Runtime
          │
          ├── G1
          │
Genesis Experience Page
          │
          ├── G2
          │
Genesis Explicit Handoff
          │
          ├── G3
          │
Reality Production Host
          │
          ├── G4
          │
Shared WebGL Core Consumers
          │
          └── G5
```

权威优先级：

```text
正式 Runtime 因果
↓
正式 Type Boundary
↓
正式产品协议
↓
门禁断言
```

门禁必须跟随权威因果，而不是反向要求产品退回历史状态。

---

## 十二、修复单位与施工顺序

### 12.1 Repair Unit A｜Genesis Handoff Assertions

包含：

- G1；
- G2；
- G3。

共同根因：

```text
Genesis 导航从单参数调用
升级为携带 visualContinuity 的双参数调用
```

G1 另包含旧工程文案断言。

建议同一刀修复三个检查文件，原因：

- 同一页面；
- 同一 Handoff；
- 同一调用标记；
- 避免一个门禁通过、另两个继续引用旧写法。

Runtime 修改：

```text
NONE
```

### 12.2 Repair Unit B｜Reality Gravity Boundary Assertions

包含：

- G4。

根因：

```text
Hold
↓
Explicit Continue Callback
```

Runtime 修改：

```text
NONE
```

### 12.3 Repair Unit C｜Renderer Consumer Allowlist

包含：

- G5。

根因：

```text
Reality 连续画布成为正式 Core 消费者
↓
旧精确白名单未更新
```

Runtime 修改：

```text
NONE
```

### 12.4 推荐顺序

```text
Unit A
Genesis Handoff
↓
Unit B
Reality Gravity Boundary
↓
Unit C
Renderer Consumer Governance
↓
五项联合回归
↓
TypeScript
↓
Production Build
↓
全部 XINMAI 检查
```

---

## 十三、建议下一实施刀的文件白名单

下一实施刀只允许修改：

```text
scripts/check-genesis-production-recognition-reality-entry.mjs
scripts/check-genesis-production-experience-page.mjs
scripts/check-genesis-reality-explicit-route-handoff.mjs
scripts/check-reality-production-route-entry.mjs
scripts/check-genesis-webgl-renderer-core-extraction.mjs
```

任何 `src/**` 变化：

```text
STOP
```

任何其他 `scripts/**` 变化：

```text
STOP
```

任何 docs 以外的额外治理：

```text
STOP
```

---

## 十四、验证矩阵

### 14.1 五项目标门禁

必须全部：

```text
PASS
```

### 14.2 TypeScript

必须：

```text
PASS
```

### 14.3 Production Build

必须：

```text
PASS
```

### 14.4 XINMAI 既有检查

必须执行全部既有：

```text
check-xinmai-*
```

并证明：

- 无新增失败；
- 既有通过项保持；
- 不因更新白名单放宽未知消费者。

### 14.5 提交边界

必须证明：

```text
提交文件数：
5

产品 Runtime 文件：
0

类型文件：
0

页面文件：
0

Renderer 文件：
0
```

---

## 十五、失败分类

未来实施时若发生失败，按以下方式处理。

### A｜目标门禁仍失败

检查：

- 是否还有同源潜在断言；
- 是否只修改了第一个可见错误；
- 是否遗漏顺序索引；
- 是否遗漏边界字段。

不能：

- 修改 Runtime 迁就检查；
- 删除整个断言组。

### B｜TypeScript 或 Build 新失败

由于实施刀只改 `.mjs` 检查：

```text
任何新增 TypeScript 或 Build 失败
=
STOP
```

### C｜XINMAI 检查新增失败

必须回滚对应门禁修复并重新审查。

不得把新增失败归类为历史漂移。

### D｜发现新的 Runtime 断裂

本实施刀停止。

另开 Runtime Repair Card。

---

## 十六、资产保护

本 MAP 与后续门禁修复必须保护：

### World

- 动态星河；
- 黑曜空间；
- Reality 连续画布。

### Identity

- `sourceReferenceId`；
- 二十八宿；
- 同一星兽；
- Recognized Life Identity。

### Relationship

- Recognition；
- Life Whisper；
- 同体回应；
- Genesis → Reality 同行。

### Growth

- Reality V2；
- Pressure Seed；
- Gravity callback；
- Choice；
- Crystal。

### Engineering

- Handoff 授权；
- Route guard；
- Shared WebGL Core；
- 精确消费者白名单；
- 清理与 dispose。

---

## 十七、与 Relationship Naming 的边界

本 MAP 不解锁 Blade 3。

它只治理：

```text
远程基线门禁是否可信
```

Relationship Naming 继续保持：

```text
DEFER
```

五项门禁修复完成后，还必须单独确认：

- DOM → Renderer 不扩大；
- Naming Asset 使用独立可选字段；
- 命名不修改身份；
- 未命名不阻断同行；
- 持久化回滚单位独立。

---

## 十八、DOM → Renderer 债务边界

当前裁决保持：

```text
短期可容忍
长期不冻结
禁止继续扩张
DEFER
```

本 MAP 没有：

- 设计 Host 输入；
- 迁移 data-*；
- 修改 Renderer；
- 修改 Relationship State owner；
- 为 Blade 3 增加隐式通道。

G5 的消费者白名单更新：

> 只承认 Reality Canvas 已经存在。

不等于：

> 批准 Renderer 继续读取更多 DOM 状态。

---

## 十九、无效治理否决

以下方案全部 `REJECT`：

1. 为通过 G1 恢复旧工程文案；
2. 为通过 G2 / G3 删除 `visualContinuity`；
3. 为通过 G4 恢复 Gravity Hold；
4. 为通过 G5 删除 Reality Canvas；
5. 把五项检查改成只要脚本退出 0；
6. 删除检查中的 Runtime 测试；
7. 把消费者白名单改成目录通配；
8. 借门禁修复重构 Renderer；
9. 借门禁修复实施 Relationship Naming；
10. 借门禁修复清理其他历史脚本；
11. 将当前脏工作树中的无关修改纳入提交；
12. 只在主脏工作树运行后声称远程基线通过。

---

## 二十、Runtime 证据等级

```text
✓ 正式 Runtime
△ 门禁断言漂移
○ 尚未实施
```

| 能力 | 状态 | 结论 |
| --- | --- | --- |
| Recognition → Reality Runtime | ✓ | 因果与 Runtime 测试存在 |
| Genesis 显式 Handoff | ✓ | 双参数导航保持授权目标 |
| Reality Entry Guard | ✓ | 正式路由、Context 与授权存在 |
| Gravity Explicit Continue | ✓ | callback 边界与 readiness 校验存在 |
| Reality 连续生命画布 | ✓ | 正式消费同一 WebGL Core |
| 五项门禁当前断言 | △ | 未跟随权威 Runtime |
| 五项断言修复 | ○ | 本 MAP 不实施 |
| Relationship Naming Blade 3 | ○ | 继续 DEFER |

---

## 二十一、阶段适配

### 用户是否参与

本 MAP 不改变用户参与。

### 世界是否回应

本 MAP 不改变世界回应。

### 生命是否变化

本 MAP 不改变生命状态。

### 用户是否留下痕迹

本 MAP 不新增用户痕迹。

### 是否提前进入 Phase 3

否。

### 是否提前进入 Phase 4

否。

### 决策

```text
MAP COMPLETE
```

---

## 二十二、五项最终裁决表

| Gate | 权威事实 | 旧断言 | 最小修复 | Runtime 修改 | 回滚单位 |
| --- | --- | --- | --- | --- | --- |
| G1 | 关系式完成体验 + 双参数授权导航 | 旧工程文案 + 单参数导航文本 | 反向禁止旧文案；更新导航标记 | 0 | 单一检查文件 |
| G2 | 页面携带 `visualContinuity` 导航 | 单参数导航文本 | 更新一个标记 | 0 | 单一标记 |
| G3 | activation → resolve → 双参数 navigate | Includes 与 index 使用旧文本 | 同时更新两个标记 | 0 | 两个同源标记 |
| G4 | `GRAVITY_READY_TO_CONTINUE` + explicit callback | Hold 状态与旧边界 | 更新状态、边界并补 readiness 断言 | 0 | 状态 + 边界断言 |
| G5 | Reality Canvas 是第三个正式 Core consumer | 旧双消费者清单 | 精确加入第三消费者并补边界 | 0 | 清单 + Consumer 断言 |

---

## 二十三、下一实施刀准入

本 MAP 完成后，允许重新申请：

`XINMAI-BASELINE-GATE-DRIFT-ASSERTION-REPAIR-P0`

刀型：

`Refinement / Engineering Gate Repair`

决策建议：

`NOW`

准入条件：

1. 只修改五个检查脚本；
2. 不修改任何 `src/**`；
3. 从远程 HEAD 创建干净快照；
4. 使用声明依赖；
5. 五项门禁全部通过；
6. TypeScript 与 Production Build 通过；
7. 全部 `check-xinmai-*` 无新增失败；
8. 主脏工作树保持原样；
9. 提交可独立回滚；
10. Blade 3 与 DOM → Renderer 继续不在范围内。

---

## 二十四、最终结论

五项失败的共同本质：

```text
产品已经前进
↓
检查仍停留在旧状态
```

正确治理不是：

```text
让产品退回旧状态
```

而是：

```text
保留权威 Runtime
↓
更新门禁到当前因果
↓
保持或增强保护强度
```

最终裁决：

> 五项均属于可独立解释的门禁断言漂移。下一刀可以进入 scripts-only 的断言修复，但不得修改任何产品行为。
