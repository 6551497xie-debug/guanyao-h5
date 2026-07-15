# GUANYAO Star Beast Renderer Explicit Implementation Authorization Command Protocol
# 观爻星兽渲染器显式实现授权指令协议

版本：Evolution Phase 2 / P50

状态：EXPLICIT IMPLEMENTATION AUTHORIZATION COMMAND

施工编号：`RC-STAR-BEAST-RENDERER-EXPLICIT-IMPLEMENTATION-AUTHORIZATION-COMMAND-P50`

## 00｜协议定位

P50 在 P49 Authorization Readiness 之后建立显式 Renderer Implementation Authorization Command 契约。

固定输入为：

```text
P49 READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION
+ Implementation Authority Reference
+ explicit AUTHORIZE decision
→ Explicit Renderer Implementation Authorization Command
```

系统不能根据 READY 自动授权。Command 只记录授权意愿、授权主体引用与原始 Binding 引用。

Command 不是 Authorization，不是 Backend Selection，也不是 Renderer。

## 01｜实现授权主体

P50 不定义人格、用户身份或 UI 操作者，只接受显式：

```text
STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY Reference
```

缺少该引用时返回 `IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED`。系统不得生成默认主体或由 AI、Runtime、页面、算法代理替代确认。

## 02｜显式 AUTHORIZE

唯一有效决定为：

```text
AUTHORIZE
```

P49 READY 本身不等于授权意愿。只有同时收到显式 AUTHORIZE 决定，才可形成 Command。

缺少决定时返回 `EXPLICIT_AUTHORIZE_DECISION_REQUIRED`，不得自动补全或默认确认。

## 03｜授权对象与原始引用

Command 只保留：

- `readinessReference` ← P49 READY 原始引用；
- `bindingReference` ← P49 READY 中的 P48 Binding 原始引用；
- `authorityReference` ← 输入的实现授权主体引用；
- `decision: AUTHORIZE`；
- `authorizationIntent: AUTHORIZE_STAR_BEAST_RENDERER_IMPLEMENTATION`。

不得复制 Render Plan 通道、能力集合，不得重新验证或修改 P46–P49 结果。

## 04｜非授权边界

Command 必须保持：

- `commandOnly: true`；
- `notAuthorization: true`；
- `noAutomaticImplementation: true`；
- `noBackendSelection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`；
- `noUIIntegration: true`；
- `noRuntimeIntegration: true`；
- `noStorageWrite: true`。

Command 表达“授权主体明确愿意授权该实现候选继续进入授权解析”，不表达“正式 Authorization 已经形成”。

## 05｜非 READY 结果

P49 NOT_READY：

- 返回 `AUTHORIZATION_READINESS_NOT_READY`；
- 保留 P49 原始 Result 与原因；
- 不生成 Command。

P49 UNAVAILABLE 或缺失：

- 返回 `AUTHORIZATION_READINESS_UNAVAILABLE` 或 `AUTHORIZATION_READINESS_RESULT_REQUIRED`；
- 保留可用的 P49 原始 Result 与原因；
- 不生成 Command。

## 06｜冻结调用拓扑

```text
P49 Result → only P50 Explicit Authorization Command
P49 Resolver → no direct external caller
P50 Command Resolver → no downstream consumer
P50 Command Result → only P51 Implementation Authorization Resolver
```

P50 只消费调用方提供的 P49 Result，不调用 P41–P49 Resolver。
P51 只消费调用方提供的 P50 Result，不反向调用 P50 Resolver。

## 07｜严格禁止

本刀禁止：

- 生成 Renderer Implementation Authorization；
- 自动推进 Renderer Implementation；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他后端；
- 创建 Renderer、Render Runtime、Renderer Factory 或绘制命令；
- 设备、浏览器、GPU、Runtime 或特性探测；
- UI、Launch、Gravity、Crystal 接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改 P39–P49 结果及现有用户结果。

## 08｜验收

1. P49 READY + Authority Reference + AUTHORIZE 才形成 Command；
2. READY 但缺少主体引用或 AUTHORIZE 不形成 Command；
3. P49 NOT_READY、UNAVAILABLE 或缺失不形成 Command；
4. Command 保留 P49 READY 与 P48 Binding 原始引用；
5. Command 不是 Authorization，不选择后端、不创建 Renderer；
6. P50 不调用 P41–P49；
7. UI、Runtime、Storage 与现有用户结果保持未接入；
8. P50 gate、P49 gate、freeze gate、release、build 与 `git diff --check` 通过。
