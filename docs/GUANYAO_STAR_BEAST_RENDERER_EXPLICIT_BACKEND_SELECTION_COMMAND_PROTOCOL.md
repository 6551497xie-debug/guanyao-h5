# GUANYAO Star Beast Renderer Explicit Backend Selection Command Protocol
# 观爻星兽渲染器显式后端选择指令协议

版本：Evolution Phase 2 / P74

状态：EXPLICIT BACKEND SELECTION COMMAND ONLY

施工编号：`RC-STAR-BEAST-RENDERER-EXPLICIT-BACKEND-SELECTION-COMMAND-P74`

## 00｜协议定位

P74 将 P73 准备度、主体选择权、候选技术引用与显式选择决定组合为指令：

```text
P73 READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION
+ STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY reference
+ STAR_BEAST_RENDERER_BACKEND_CANDIDATE opaque reference
+ explicit SELECT_RENDERER_BACKEND decision
→ Explicit Renderer Backend Selection Command
```

系统不能根据 P73 READY 自动选择技术。Command 只表达主体明确要求在未来正式 Backend Selection Resolver 中审议指定候选引用。

## 01｜输入边界

P74 只消费调用方提供的 P73 Result，不调用 P73 Resolver，也不重新判断 P71 不透明治理引用。

只有 P73 `READY` 可以与以下输入共同生成 Command：

- 有效 `STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY` 主体引用；
- 有效 `STAR_BEAST_RENDERER_BACKEND_CANDIDATE` 不透明候选引用；
- `SELECT_RENDERER_BACKEND` 显式选择决定。

P74 不读取候选引用背后的技术名称、能力、设备支持或实现事实。

## 02｜状态语义

- P73 `UNAVAILABLE` → `BACKEND_SELECTION_READINESS_UNAVAILABLE`；
- 缺少 P73 Result → `BACKEND_SELECTION_READINESS_RESULT_REQUIRED`；
- 缺少或非法主体引用 → Authority Required / Invalid；
- 缺少或非法候选引用 → Candidate Required / Invalid；
- 未作出显式选择决定 → `EXPLICIT_BACKEND_SELECTION_DECISION_REQUIRED`。

任何异常状态均不生成 Command，系统不得默认候选、补写决定或自动选择技术。

## 03｜Command 语义

Command 只保存：

- P73 READY 原始引用；
- P71 opaque governance reference；
- 主体 Authority reference；
- Backend Candidate opaque reference；
- 主体显式 `SELECT_RENDERER_BACKEND` 决定。

它不保存具体技术名称、运行能力或设备探测结果，并保持：

- `commandOnly: true`；
- `candidateReferenceOnly: true`；
- `notBackendSelection: true`；
- `backendSelectionDeferred: true`；
- `noP71ResultConsumption: true`；
- `noCapabilityProbe: true`；
- `noDeviceDetection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

## 04｜单向治理拓扑

```text
P73 Readiness Result → only P74 Explicit Backend Selection Command
P73 Readiness Resolver → no direct external caller
P74 Command Result → no consumer before P75 formal Backend Selection Resolver
P74 Command Resolver → no direct external caller
```

P74 不能反向调用 P73，也不能消费 P71 Endpoint Result。未来 P75 只能消费调用方提供的 P74 Result。

## 05｜非选择、非执行边界

Command 不是正式 Backend Selection，也不是 Renderer Execution。P74 禁止：

- 生成正式 Backend Selection、Consumption 或 Endpoint；
- 将 Candidate Reference 解析为具体技术或实现；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他 Backend；
- 运行设备、浏览器、GPU、Feature 或 Capability Probe；
- 创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P73 既有业务类型、Service、Resolver、Endpoint 或用户结果；
- 解除 P54/P60/P66/P72 四重冻结。

## 06｜验收

1. 只有 P73 READY + 有效 Authority + 有效 Candidate Reference + 显式决定才生成 Command；
2. UNAVAILABLE 与 NOT_READY 单向保留且原因可追溯；
3. Command 保持 P73、P71 治理、Authority 与 Candidate 原始引用；
4. Command 不解析候选、不等于正式 Backend Selection；
5. P74 不探测设备、不创建 Renderer、不执行 Render；
6. P74 不调用 P73 Resolver，P74 Result 当前无下游消费者；
7. P73 协议固定 P73 → P74 的唯一调用所有权；
8. P74 Gate、P73 Gate、P72 Gate、release、build 与 `git diff --check` 通过。
