# GUANYAO Star Beast Renderer Explicit Execution Protocol Authorization Command Protocol
# 观爻星兽渲染器显式执行协议授权指令协议

版本：Evolution Phase 2 / P68

状态：EXPLICIT EXECUTION PROTOCOL AUTHORIZATION COMMAND ONLY

施工编号：`RC-STAR-BEAST-RENDERER-EXPLICIT-EXECUTION-PROTOCOL-AUTHORIZATION-COMMAND-P68`

## 00｜协议定位

P68 将 P67 准备度与主体的显式授权决定组合为指令：

```text
P67 READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION
+ STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY reference
+ explicit AUTHORIZE_RENDERER_EXECUTION_PROTOCOL decision
→ Explicit Execution Protocol Authorization Command
```

系统不能根据 P67 READY 自动授权。Command 只表达主体明确要求进入正式 Execution Protocol Authorization 流程。

## 01｜输入边界

P68 只消费调用方提供的 P67 Result，不调用 P67 Resolver，也不重新判断 P65 不透明治理引用或执行治理材料。

只有 P67 `READY` 可以与有效主体引用、`AUTHORIZE_RENDERER_EXECUTION_PROTOCOL` 决定共同生成 Command：

- P67 `NOT_READY` → `EXECUTION_PROTOCOL_READINESS_NOT_READY`；
- P67 `UNAVAILABLE` → `EXECUTION_PROTOCOL_READINESS_UNAVAILABLE`；
- 缺少 P67 Result → `EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED`；
- 缺少主体引用 → `EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED`；
- 主体引用非法 → `EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_INVALID`；
- 未显式授权决定 → `EXPLICIT_AUTHORIZE_EXECUTION_PROTOCOL_DECISION_REQUIRED`。

## 02｜两类权力引用

- `backendSelectionAuthorityReference` 来自 P67，只定义未来谁有权作出 Backend Selection；
- `authorityReference` 属于 P68，只确认主体明确授权进入 Execution Protocol Authorization 流程。

P68 保存两者引用，但不执行 Backend Selection，也不把二者合并为自动执行许可。

## 03｜Command 语义

Command 原样保持 P67 的六项引用：

- P65 opaque governance reference；
- backend selection authority reference；
- first reversible execution slice reference；
- failure stop reference；
- rollback reference；
- acceptance reference。

它只保存引用，不复制 P65 Result 或生命事实，并保持：

- `commandOnly: true`；
- `notExecutionProtocolAuthorization: true`；
- `executionProtocolAuthorizationDeferred: true`；
- `noP65ResultConsumption: true`；
- `noFrozenEndpointResultConsumption: true`；
- `noBackendSelection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

## 04｜单向治理拓扑

```text
P67 Readiness Result → only P68 Explicit Execution Protocol Authorization Command
P67 Readiness Resolver → no direct external caller
P68 Command Result → no consumer before P69 formal Execution Protocol Authorization Resolver
P68 Command Resolver → no direct external caller
```

P68 不能反向调用 P67，也不能消费 P65 Endpoint Result。未来 P69 只能消费调用方提供的 P68 Result。

## 05｜非授权、非执行边界

Command 不是正式 Execution Protocol Authorization，也不是实际 Renderer Execution。P68 禁止：

- 生成正式 Authorization、Consumption 或 Endpoint；
- 解除 P54/P60/P66 三重冻结；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他 Backend；
- 创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- 设备、浏览器、GPU 或特性探测；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P67 既有业务类型、Service、Resolver、Endpoint 或用户结果。

## 06｜验收

1. 只有 P67 READY + 有效主体引用 + 显式授权决定才生成 Command；
2. NOT_READY 与 UNAVAILABLE 单向保留且原因可追溯；
3. Command 保持全部 P67 原始引用，不复制 P65 Result；
4. Command 不等于正式 Authorization，不选择 Backend、不执行 Renderer；
5. P68 不调用 P67 Resolver，P68 Result 当前无下游消费者；
6. P67 协议固定 P67 → P68 的唯一调用所有权；
7. P68 gate、P67 gate、P66 freeze gate、release、build 与 `git diff --check` 通过。
