# GUANYAO Star Beast Renderer Backend Selection Resolver Protocol
# 观爻星兽渲染器后端选择解析协议

版本：Evolution Phase 2 / P75

状态：BACKEND CANDIDATE REFERENCE SELECTION ONLY

施工编号：RC-STAR-BEAST-RENDERER-BACKEND-SELECTION-RESOLVER-P75

## 00｜协议定位

P75 只消费调用方提供的 P74 Command Result，将合法主体显式指令解析为正式 Renderer Backend Selection：

~~~text
P74 AVAILABLE Command Result
→ validate authority + candidate + decision + original reference identity
→ P75 SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE
~~~

正式 Selection 只选择 Backend Candidate opaque reference，不解析候选背后的具体技术，不等于 Backend Activation、Renderer Creation 或 Render Execution。

## 01｜合法指令

只有 P74 AVAILABLE 且同时满足以下条件才可形成 Selection：

- 主体引用类型为 STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY 且标识非空；
- 候选引用类型为 STAR_BEAST_RENDERER_BACKEND_CANDIDATE 且标识非空；
- 决定为显式 SELECT_RENDERER_BACKEND；
- Intent 为 SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE；
- Command 的 explicit、commandOnly、candidateReferenceOnly 与 notBackendSelection 均为 true；
- Command、P74 Input 与 P73 READY 中的 Authority、Candidate、Readiness、Governance 引用保持同一对象引用；
- Command 保持无 P71 Result 消费、无 Capability Probe、无 Device Detection、无 Renderer 与 Render Execution。

任一引用被替换时返回 EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID，不得仅凭选择字符串形成正式 Selection。

## 02｜选择范围

P75 固定声明：

- selectionStatus: SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE；
- selectionScope: STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE；
- backendSelectionOnly: true；
- candidateReferenceOnly: true；
- candidateResolutionDeferred: true；
- backendActivationDeferred: true；
- noAutomaticActivation: true。

Selection 保留 P74 Command、主体、P73 Readiness、P71 opaque governance 与 Candidate 原始引用，但不读取候选实现或 P71 Result。

## 03｜状态传递

- P74 NOT_READY → EXPLICIT_BACKEND_SELECTION_COMMAND_NOT_READY；
- P74 UNAVAILABLE → EXPLICIT_BACKEND_SELECTION_COMMAND_UNAVAILABLE；
- P74 Result 缺失 → EXPLICIT_BACKEND_SELECTION_COMMAND_RESULT_REQUIRED；
- 非法 P74 AVAILABLE Command → EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID。

以上状态均不生成 Backend Selection。

## 04｜单向治理拓扑

~~~text
P74 Command Result → only P75 Backend Selection Resolver
P74 Command Resolver → no direct external caller
P75 Selection Result → no consumer before P76 Backend Selection Consumption
P75 Selection Resolver → no direct external caller
~~~

P75 只读取上位调用方提供的 P74 Result，不反向调用 P73/P74，也不调用 P67–P71。

P76 固定该唯一调用所有权：

~~~text
P75 Selection Result → only P76 Backend Selection Consumption
P75 Selection Resolver → no direct external caller
P76 Consumption Result → no consumer before P77 Backend Selection Endpoint
P76 Consumption Service → no direct external caller
~~~

P76 只消费调用方提供的 P75 Result。Consumption 不解析 Candidate、不激活 Backend、不创建 Renderer、不执行 Render。

## 05｜冻结与执行边界

P75 的正式 Selection 不解除 P54/P60/P66/P72 四重冻结。P71 Result 继续保持无直接消费者；P75 仅沿用 P73 建立的不透明治理引用。

本刀禁止：

- 创建 Backend Selection Consumption 或 Endpoint；
- 将 Candidate Reference 解析为 Canvas、WebGL、Three.js、SVG、DOM 或其他具体技术；
- 运行设备、浏览器、GPU、Feature 或 Capability Probe；
- 激活 Backend，创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P74 既有业务类型、Service、Resolver、Endpoint 或用户结果。

Selection 必须保持 noP71ResultConsumption、noFrozenEndpointResultConsumption、noCapabilityProbe、noDeviceDetection、noRendererCreation、noRenderExecution、noUIIntegration、noRuntimeIntegration 与 noStorageWrite。

## 06｜验收

1. 只有合法 P74 AVAILABLE Command 形成正式 Selection；
2. Selection 保持主体、Command、Candidate、Readiness 与 Governance 原始引用；
3. P74 NOT_READY、UNAVAILABLE、缺失或引用不一致均不形成 Selection；
4. P75 不调用 P73/P74 Resolver，不消费 P71 Result；
5. Selection 不解析候选、不探测设备、不激活 Backend；
6. Selection 不创建 Renderer、不执行 Render；
7. P74 协议固定 P74 → P75 的唯一调用所有权；
8. P75 Gate、P74 Gate、P73 Gate、P72 Gate、release、build 与 git diff --check 通过。
