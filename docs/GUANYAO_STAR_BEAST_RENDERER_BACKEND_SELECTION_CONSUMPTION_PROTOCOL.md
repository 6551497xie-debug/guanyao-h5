# GUANYAO Star Beast Renderer Backend Selection Consumption Protocol
# 观爻星兽渲染器后端选择消费协议

版本：Evolution Phase 2 / P76

状态：BACKEND SELECTION CONSUMPTION ONLY

施工编号：RC-STAR-BEAST-RENDERER-BACKEND-SELECTION-CONSUMPTION-P76

## 00｜协议定位

P76 只消费调用方提供的 P75 Backend Selection Result，形成未来 Backend Selection Endpoint 可读取的稳定治理结果：

~~~text
P75 SELECTED Result
→ P76 Backend Selection Consumption
→ AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT
~~~

Consumption 不是 Endpoint，不解析 Candidate，不激活 Backend，不创建 Renderer，也不执行 Render。

## 01｜唯一可消费状态

只有 P75 SELECTED 可以形成 Consumption。

Consumption 只保留原始引用：

- P75 Selection 与 Selected Result；
- P74 Command；
- Backend Selection Authority；
- Backend Candidate opaque reference；
- P73 Readiness；
- P71 opaque governance reference。

不得复制 P71 Result、候选实现、具体技术名称、能力探测或设备事实，不得重新解析 P74 Command。

## 02｜消费状态

成功结果固定声明：

- consumptionStatus: AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT；
- selectionConsumedOnly: true；
- candidateReferenceOnly: true；
- candidateResolutionDeferred: true；
- backendSelectionEndpointDeferred: true；
- backendActivationDeferred: true；
- noAutomaticActivation: true。

它只证明正式 Selection 已经过稳定消费边界，不表示 Candidate 已解析、Backend 已激活或 Renderer 已启动。

## 03｜状态传递

- P75 NOT_READY → BACKEND_SELECTION_NOT_READY；
- P75 UNAVAILABLE → BACKEND_SELECTION_UNAVAILABLE；
- P75 Result 缺失 → BACKEND_SELECTION_RESULT_REQUIRED。

以上状态均不生成 Consumption，系统不得补全或自动选择候选。

## 04｜单向治理拓扑

~~~text
P75 Selection Result → only P76 Backend Selection Consumption
P75 Selection Resolver → no direct external caller
P76 Consumption Result → no consumer before P77 Backend Selection Endpoint
P76 Consumption Service → no direct external caller
~~~

P76 只读取上位调用方提供的 P75 Result，不反向调用 P73–P75，也不调用 P67–P71。

## 05｜冻结与执行边界

P76 不解除 P54/P60/P66/P72 四重冻结，不消费 P71 Result。Consumption 只允许进入未来独立 Endpoint，不构成 Backend Activation 或 Runtime 执行许可。

本刀禁止：

- 创建 Backend Selection Endpoint；
- 解析 Candidate Reference 或选择具体技术实现；
- 运行设备、浏览器、GPU、Feature 或 Capability Probe；
- 激活 Backend，创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P75 既有业务类型、Service、Resolver、Endpoint 或用户结果。

Consumption 必须保持 noP71ResultConsumption、noFrozenEndpointResultConsumption、noCapabilityProbe、noDeviceDetection、noRendererCreation、noRenderExecution、noUIIntegration、noRuntimeIntegration 与 noStorageWrite。

## 06｜验收

1. 只有 P75 SELECTED Result 形成 Consumption；
2. Consumption 保持 Selection、Command、Authority、Candidate、Readiness 与 Governance 原始引用；
3. P75 NOT_READY、UNAVAILABLE 或缺失不形成 Consumption；
4. P76 不调用 P73–P75 Resolver，不消费 P71 Result；
5. Consumption 不解析候选、不探测设备、不激活 Backend；
6. Consumption 不创建 Renderer、不执行 Render；
7. P75 协议固定 P75 → P76 的唯一调用所有权；
8. P76 Gate、P75 Gate、P74 Gate、P73 Gate、P72 Gate、release、build 与 git diff --check 通过。
