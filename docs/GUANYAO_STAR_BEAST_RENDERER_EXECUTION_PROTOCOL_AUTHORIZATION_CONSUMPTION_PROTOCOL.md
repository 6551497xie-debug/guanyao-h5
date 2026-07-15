# GUANYAO Star Beast Renderer Execution Protocol Authorization Consumption Protocol
# 观爻星兽渲染器执行协议授权消费协议

版本：Evolution Phase 2 / P70

状态：EXECUTION PROTOCOL AUTHORIZATION CONSUMPTION ONLY

施工编号：`RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-AUTHORIZATION-CONSUMPTION-P70`

## 00｜协议定位

P70 只消费调用方提供的 P69 Authorization Result，形成未来 Execution Protocol Endpoint 可读取的稳定治理结果：

```text
P69 AUTHORIZED Result
→ P70 Authorization Consumption
→ AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT
```

Consumption 不是 Endpoint，不是 Backend Selection，不是 Renderer，也不是 Render Execution。

## 01｜唯一可消费状态

只有 P69 `AUTHORIZED` 可以形成 Consumption。

Consumption 只保留原始引用：

- P69 Authorization 与 Authorized Result；
- P68 Command；
- Execution Protocol Authority；
- P67 Readiness；
- P65 opaque governance；
- Backend Selection Authority；
- Execution Slice、Failure Stop、Rollback 与 Acceptance。

不得复制 P65 Result、视觉事实、Backend Capability 或生命事实，不得重新解析 P68 Command。

## 02｜消费状态

成功结果固定声明：

- `consumptionStatus: AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT`；
- `authorizationConsumedOnly: true`；
- `executionProtocolEndpointDeferred: true`；
- `noAutomaticExecution: true`。

它只证明正式协议授权已经经过稳定消费边界，不表示 Execution Protocol 已激活、Backend 已选择或 Renderer 已启动。

## 03｜状态传递

- P69 `NOT_READY` → `EXECUTION_PROTOCOL_AUTHORIZATION_NOT_READY`；
- P69 `UNAVAILABLE` → `EXECUTION_PROTOCOL_AUTHORIZATION_UNAVAILABLE`；
- P69 Result 缺失 → `EXECUTION_PROTOCOL_AUTHORIZATION_RESULT_REQUIRED`。

以上状态均不生成 Consumption，系统不得补全或自动授权。

## 04｜单向治理拓扑

```text
P69 Authorization Result → only P70 Authorization Consumption
P69 Authorization Resolver → no direct external caller
P70 Consumption Result → no consumer before P71 Execution Protocol Authorization Endpoint
P70 Authorization Consumption → no direct external caller
```

P70 只读取上位调用方提供的 P69 Result，不反向调用 P67–P69，也不调用 P61–P65。

## 05｜冻结与执行边界

P70 不解除 P54/P60/P66 三重冻结，不消费 P65 Result。Consumption 只允许进入未来独立 Endpoint，不构成 Runtime 执行许可。

本刀禁止：

- 创建 Execution Protocol Authorization Endpoint；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他 Backend；
- 创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- 执行 Execution Slice 或触发 Failure Stop / Rollback；
- 设备、浏览器、GPU 或特性探测；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P69 既有业务类型、Service、Resolver、Endpoint 或用户结果。

Consumption 必须保持 `noP65ResultConsumption`、`noFrozenEndpointResultConsumption`、`noBackendSelection`、`noRendererCreation`、`noRenderExecution`、`noUIIntegration`、`noRuntimeIntegration` 与 `noStorageWrite`。

## 06｜验收

1. 只有 P69 AUTHORIZED Result 形成 Consumption；
2. Consumption 保持 Authorization、Command、Authority、Readiness 与全部治理引用；
3. P69 NOT_READY、UNAVAILABLE 或缺失不形成 Consumption；
4. P70 不调用 P67–P69 Resolver，不消费 P65 Result；
5. Consumption 不选择 Backend、不创建 Renderer、不执行 Render；
6. P69 协议固定 P69 → P70 的唯一调用所有权；
7. P70 gate、P69 gate、P68 gate、P67 gate、P66 freeze gate、release、build 与 `git diff --check` 通过。
