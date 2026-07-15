# GUANYAO Star Beast Renderer Implementation Authorization Resolver Protocol
# 观爻星兽渲染器实现授权解析协议

版本：Evolution Phase 2 / P51

状态：IMPLEMENTATION AUTHORIZATION RESOLVER

施工编号：`RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-RESOLVER-P51`

## 00｜协议定位

P51 只消费调用方提供的 P50 Explicit Implementation Authorization Command Result，将合法显式指令解析为正式 Renderer Implementation Authorization。

```text
P50 AVAILABLE Command Result
→ validate explicit authority + AUTHORIZE + original references
→ P51 AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL
```

正式 Authorization 只允许进入未来独立 Renderer Implementation Protocol，不等于实现已经开始。

## 01｜合法指令

只有 P50 `AVAILABLE` 且同时满足以下条件才可授权：

- `STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY` 主体引用存在；
- 决定为显式 `AUTHORIZE`；
- `authorityConfirmed` 与 `explicit` 均为 `true`；
- Command 保持 `commandOnly: true` 与 `notAuthorization: true`；
- `readinessReference` 是 P50 Result 中的 P49 READY 原始引用；
- `bindingReference` 是该 READY 中的 P48 Binding 原始引用。

引用一致性不成立时返回 `EXPLICIT_AUTHORIZATION_COMMAND_INVALID`，不得仅凭字符串意愿授权。

## 02｜授权范围

授权结果固定声明：

- `authorizationStatus: AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL`；
- `authorizationScope: STAR_BEAST_RENDERER_IMPLEMENTATION_PROTOCOL`；
- `authorizationOnly: true`；
- 保留 P50 Command、Authority、P49 Readiness 与 P48 Binding 原始引用。

P51 不复制 Render Plan 通道或能力集合，不重新计算 P46–P50。

## 03｜状态传递

- P50 `NOT_READY` → P51 `EXPLICIT_AUTHORIZATION_COMMAND_NOT_READY`；
- P50 `UNAVAILABLE` → P51 `EXPLICIT_AUTHORIZATION_COMMAND_UNAVAILABLE`；
- P50 Result 缺失 → P51 `EXPLICIT_AUTHORIZATION_COMMAND_RESULT_REQUIRED`；
- 非法 AVAILABLE Command → P51 `EXPLICIT_AUTHORIZATION_COMMAND_INVALID`。

上述结果均不生成 Authorization。

## 04｜冻结调用拓扑

```text
P50 Command Result → only P51 Implementation Authorization Resolver
P50 Command Resolver → no direct external caller
P51 Authorization Result → only P52 Authorization Consumption
P51 Authorization Resolver → no direct external caller
```

P51 只读取上位调用方提供的 P50 Result，不调用 P41–P50 Resolver。
P52 只消费调用方提供的 P51 Result，不反向调用 P51 Resolver。

## 05｜严格禁止

本刀禁止：

- 自动实现 Renderer；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他后端；
- 创建 Renderer、Factory、Runtime、绘制命令或像素输出；
- 设备、浏览器、GPU 或特性探测；
- UI、Launch、Gravity、Crystal 接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改 StarBeastState、Journey、Memory、Growth、Crystal 或现有用户结果。

授权结果必须保持 `noAutomaticImplementation`、`noBackendSelection`、`noRendererCreation`、`noRenderExecution`、`noUIIntegration`、`noRuntimeIntegration` 与 `noStorageWrite`。

## 06｜验收

1. 只有合法 P50 AVAILABLE Command 形成正式 Authorization；
2. Authorization 保留主体、Command、Readiness 与 Binding 原始引用；
3. P50 NOT_READY、UNAVAILABLE、缺失或引用不一致均不授权；
4. P51 不调用 P41–P50 Resolver；
5. Authorization 不选择后端、不创建 Renderer、不执行渲染；
6. P51 gate、P50 gate、freeze gate、release、build 与 `git diff --check` 通过。
