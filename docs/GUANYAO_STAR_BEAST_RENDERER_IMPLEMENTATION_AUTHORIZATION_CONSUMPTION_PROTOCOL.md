# GUANYAO Star Beast Renderer Implementation Authorization Consumption Protocol
# 观爻星兽渲染器实现授权消费协议

版本：Evolution Phase 2 / P52

状态：IMPLEMENTATION AUTHORIZATION CONSUMPTION

施工编号：`RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-CONSUMPTION-P52`

## 00｜协议定位

P52 只消费调用方提供的 P51 Implementation Authorization Result，形成未来 Implementation Endpoint 可读取的稳定授权消费结果。

```text
P51 AUTHORIZED Result
→ P52 Authorization Consumption
→ AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT
```

Consumption 不是 Renderer Implementation，不是 Endpoint，也不是 Render Runtime。

## 01｜唯一可消费状态

只有 P51 `AUTHORIZED` 可以形成 Consumption。

Consumption 只保留：

- P51 Authorization 原始引用；
- P51 Authorized Result 原始引用；
- P50 Command 原始引用；
- Implementation Authority 原始引用；
- P48 Binding 原始引用。

不得复制 Render Plan 通道、Backend Capability 集合或生命事实，不得重新解析 P50 Command。

## 02｜消费状态

成功结果固定声明：

- `consumptionStatus: AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT`；
- `authorizationConsumedOnly: true`；
- `implementationDeferred: true`。

它只证明正式授权已经经过稳定消费边界，不表示 Renderer 已创建或实现协议已经执行。

## 03｜状态传递

- P51 `NOT_READY` → P52 `IMPLEMENTATION_AUTHORIZATION_NOT_READY`；
- P51 `UNAVAILABLE` → P52 `IMPLEMENTATION_AUTHORIZATION_UNAVAILABLE`；
- P51 Result 缺失 → P52 `IMPLEMENTATION_AUTHORIZATION_RESULT_REQUIRED`。

以上状态均不生成 Consumption，不得自动补全授权。

## 04｜冻结调用拓扑

```text
P51 Authorization Result → only P52 Authorization Consumption
P51 Authorization Resolver → no direct external caller
P52 Consumption Result → only P53 Implementation Authorization Endpoint
P52 Authorization Consumption → no direct external caller
```

P52 只读取上位调用方提供的 P51 Result，不调用 P41–P51 Resolver。
P53 只消费调用方提供的 P52 Result，不反向调用 P52 Service。

## 05｜严格禁止

本刀禁止：

- 创建 Implementation Endpoint；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他后端；
- 创建 Renderer、Factory、Runtime、绘制命令或像素输出；
- 设备、浏览器、GPU 或特性探测；
- UI、Launch、Gravity、Crystal 接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改 StarBeastState、Journey、Memory、Growth、Crystal 或现有用户结果。

Consumption 必须保持 `implementationDeferred`、`noBackendSelection`、`noRendererCreation`、`noRenderExecution`、`noUIIntegration`、`noRuntimeIntegration` 与 `noStorageWrite`。

## 06｜验收

1. 只有 P51 AUTHORIZED Result 形成 Consumption；
2. Consumption 保留 Authorization、Command、Authority 与 Binding 原始引用；
3. P51 NOT_READY、UNAVAILABLE 或缺失不形成 Consumption；
4. P52 不调用 P41–P51 Resolver；
5. Consumption 不选择后端、不创建 Renderer、不执行渲染；
6. P52 gate、P51 gate、freeze gate、release、build 与 `git diff --check` 通过。
