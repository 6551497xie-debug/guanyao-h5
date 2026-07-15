# GUANYAO Star Beast Renderer Explicit Execution Unfreeze Declaration Command Protocol
# 观爻星兽渲染器显式执行解冻声明指令协议

版本：Evolution Phase 2 / P62

状态：EXPLICIT EXECUTION UNFREEZE DECLARATION COMMAND

施工编号：`RC-STAR-BEAST-RENDERER-EXPLICIT-EXECUTION-UNFREEZE-DECLARATION-COMMAND-P62`

## 00｜协议定位

P62 将 P61 的执行解冻准备度与主体的显式决定组合为声明指令：

```text
P61 READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION
+ STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY Reference
+ explicit DECLARE_EXECUTION_UNFREEZE decision
→ Explicit Execution Unfreeze Declaration Command
```

系统不能根据 READY 自动执行解冻。Command 只表达主体已明确要求进入正式执行解冻声明流程。

## 01｜输入边界

P62 只消费调用方提供的 P61 Result，不调用 P61 Resolver，也不重新判断双治理锚点或执行材料。

只有 `READY` 可以与有效主体引用、`DECLARE_EXECUTION_UNFREEZE` 决定共同生成 Command：

- P61 `NOT_READY` → `EXECUTION_UNFREEZE_READINESS_NOT_READY`；
- P61 `UNAVAILABLE` → `EXECUTION_UNFREEZE_READINESS_UNAVAILABLE`；
- 缺少 P61 Result → `EXECUTION_UNFREEZE_READINESS_RESULT_REQUIRED`；
- 缺少主体引用 → `EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_REQUIRED`；
- 主体引用非法 → `EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_INVALID`；
- 未显式决定 → `EXPLICIT_DECLARE_EXECUTION_UNFREEZE_DECISION_REQUIRED`。

## 02｜Command 语义

Command 必须保持 P61 的原始引用：

- P59 terminal governance reference；
- P53 terminal governance reference；
- execution scope reference；
- runtime boundary reference；
- rollback strategy reference；
- execution acceptance scope reference。

它只保存引用，不复制冻结 Endpoint Result 或治理事实，并保持：

- `commandOnly: true`；
- `notExecutionUnfreezeDeclaration: true`；
- `noExecutionUnfreezeIssued: true`；
- `noP53ResultConsumption: true`；
- `noP59ResultConsumption: true`；
- `noFrozenEndpointResultConsumption: true`；
- `noFinalBackendSelection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

## 03｜单向治理拓扑

```text
P61 Readiness Result → only P62 Explicit Execution Unfreeze Declaration Command
P61 Readiness Resolver → no direct external caller
P62 Command Result → only P63 Execution Unfreeze Declaration Resolver
P62 Command Resolver → no direct external caller
```

P62 不能反向调用 P61，也不能消费 P53/P59 Runtime Result。Command 不会自动成为正式 Declaration。

P63 只消费调用方提供的 P62 Result，不得直接调用 P62 Resolver。Declaration 仍不构成实际执行解冻。

## 04｜非声明、非解冻边界

Command 不是正式 Execution Unfreeze Declaration，也不是实际 Execution Unfreeze。P62 禁止：

- 生成正式执行解冻声明或解除 P54/P60 双冻结；
- 选择最终渲染后端；
- 创建 Renderer、Factory、Runtime 或绘制命令；
- 执行 Canvas、WebGL、Three.js、SVG、DOM 或其他渲染；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P61 与现有用户结果。

## 05｜验收

1. 只有 P61 READY + 有效主体引用 + `DECLARE_EXECUTION_UNFREEZE` 才生成 Command；
2. NOT_READY 与 UNAVAILABLE 状态单向保留；
3. Command 保持所有 P61 原始引用且不复制事实；
4. Command 不等于 Execution Unfreeze Declaration，不实际解冻；
5. P62 不调用 P61 Resolver、不消费 P53/P59 Result；
6. P62 Result 当前无下游消费者；
7. P62 gate、P61 gate、P60/P54 freeze gate、release、build 与 `git diff --check` 通过。
