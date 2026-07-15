# GUANYAO Star Beast Renderer Execution Protocol Authorization Resolver Protocol
# 观爻星兽渲染器执行协议授权解析协议

版本：Evolution Phase 2 / P69

状态：EXECUTION PROTOCOL AUTHORIZATION ONLY

施工编号：`RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-AUTHORIZATION-RESOLVER-P69`

## 00｜协议定位

P69 只消费调用方提供的 P68 Command Result，将合法主体显式指令解析为正式 Renderer Execution Protocol Authorization：

```text
P68 AVAILABLE Command Result
→ validate explicit authority + decision + original reference identity
→ P69 AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL
```

正式 Authorization 只授权进入独立 Renderer Execution Protocol，不等于 Backend Selection、Renderer Creation 或 Render Execution。

## 01｜合法指令

只有 P68 `AVAILABLE` 且同时满足以下条件才可授权：

- 主体引用类型为 `STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY` 且标识非空；
- 决定为显式 `AUTHORIZE_RENDERER_EXECUTION_PROTOCOL`；
- Intent 为 `AUTHORIZE_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL`；
- `authorityConfirmed`、`explicit`、`commandOnly` 与 `notExecutionProtocolAuthorization` 均为 `true`；
- `readinessReference` 是 P68 Result 中的 P67 READY 原始引用；
- P65 opaque governance、Backend Selection Authority、Execution Slice、Failure Stop、Rollback 与 Acceptance 引用均与 P67 保持同一对象引用。

任一引用被替换时返回 `EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID`，不得仅凭授权字符串形成正式 Authorization。

## 02｜授权范围

P69 固定声明：

- `authorizationStatus: AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL`；
- `authorizationScope: STAR_BEAST_RENDERER_EXECUTION_PROTOCOL`；
- `authorizationOnly: true`；
- `noAutomaticExecution: true`；
- `executionProtocolActivationDeferred: true`。

Authorization 保留 P68 Command、主体、P67 Readiness 与全部原始治理引用，但不读取或复制 P65 Result。

## 03｜状态传递

- P68 `NOT_READY` → `EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_NOT_READY`；
- P68 `UNAVAILABLE` → `EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_UNAVAILABLE`；
- P68 Result 缺失 → `EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_RESULT_REQUIRED`；
- 非法 P68 AVAILABLE Command → `EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID`。

以上状态均不生成 Authorization。

## 04｜单向治理拓扑

```text
P68 Command Result → only P69 Execution Protocol Authorization Resolver
P68 Command Resolver → no direct external caller
P69 Authorization Result → no consumer before P70 Authorization Consumption
P69 Authorization Resolver → no direct external caller
```

P69 只读取上位调用方提供的 P68 Result，不反向调用 P67/P68，也不调用 P61–P65。

## 05｜冻结与执行边界

P69 的正式授权不解除 P54/P60/P66 三重冻结。P65 Result 继续保持无直接消费者；P69 仅沿用 P67 建立的不透明治理引用。

本刀禁止：

- 创建 Authorization Consumption 或 Endpoint；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他 Backend；
- 创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- 执行 Execution Slice 或触发 Failure Stop / Rollback；
- 设备、浏览器、GPU 或特性探测；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P68 既有业务类型、Service、Resolver、Endpoint 或用户结果。

Authorization 必须保持 `noP65ResultConsumption`、`noFrozenEndpointResultConsumption`、`noBackendSelection`、`noRendererCreation`、`noRenderExecution`、`noUIIntegration`、`noRuntimeIntegration` 与 `noStorageWrite`。

## 06｜验收

1. 只有合法 P68 AVAILABLE Command 形成正式 Authorization；
2. Authorization 保持主体、Command、Readiness 与全部治理引用；
3. P68 NOT_READY、UNAVAILABLE、缺失或引用不一致均不授权；
4. P69 不调用 P67/P68 Resolver，不消费 P65 Result；
5. Authorization 不选择 Backend、不创建 Renderer、不执行 Render；
6. P68 协议固定 P68 → P69 的唯一调用所有权；
7. P69 gate、P68 gate、P67 gate、P66 freeze gate、release、build 与 `git diff --check` 通过。
