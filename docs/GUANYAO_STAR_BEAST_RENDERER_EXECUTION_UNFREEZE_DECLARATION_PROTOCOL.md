# GUANYAO Star Beast Renderer Execution Unfreeze Declaration Protocol
# 观爻星兽渲染器执行解冻声明协议

版本：Evolution Phase 2 / P63

状态：EXECUTION UNFREEZE DECLARATION

施工编号：`RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-DECLARATION-RESOLVER-P63`

## 00｜协议定位

P63 只将合法 P62 Command 解析为正式执行解冻声明：

```text
P62 Explicit Execution Unfreeze Declaration Command Result
→ P63 Execution Unfreeze Declaration
```

Declaration 表示主体已正式声明允许进入后续执行解冻治理流程。Declaration 不是实际 Execution Unfreeze，不解除 P54/P60 双冻结。

## 01｜单向输入边界

P63 只消费调用方提供的 P62 Result，不调用 P62 Resolver，不重新生成 Command，也不读取 P61 原始输入。

- P62 `AVAILABLE` 且 Command 完整合法 → `DECLARED`；
- P62 `NOT_READY` → `EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_NOT_READY`；
- P62 `UNAVAILABLE` → `EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE`；
- 缺少 P62 Result → `EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED`；
- AVAILABLE 中的 Command 不完整或引用不一致 → `EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID`。

## 02｜声明完整性

P63 必须验证：

- Command 来源、语义角色与 `DECLARE_EXECUTION_UNFREEZE` 决定；
- 主体引用有效并已显式确认；
- Command 与 P61 Readiness 的引用身份一致；
- P59、P53 治理锚点、执行范围、Runtime 边界、回滚与验收引用未被替换；
- Command 明确保持不消费冻结 Result。

正式声明只保存引用，不复制治理事实。

## 03｜Declaration 边界

声明必须保持：

- `declarationOnly: true`；
- `executionUnfreezeDeferred: true`；
- `noExecutionUnfreezeIssued: true`；
- `noP53ResultConsumption: true`；
- `noP59ResultConsumption: true`；
- `noFrozenEndpointResultConsumption: true`；
- `noFinalBackendSelection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

因此，`DECLARED_FOR_RENDERER_EXECUTION_UNFREEZE_PROTOCOL` 只代表正式治理声明成立，不代表冻结已经解除。

## 04｜治理拓扑

```text
P62 Command Result → only P63 Execution Unfreeze Declaration Resolver
P62 Command Resolver → no direct external caller
P63 Declaration Result → only P64 Declaration Consumption
P63 Declaration Resolver → no direct external caller
```

P63 不消费 P53/P59 Endpoint Result，两条冻结链仍保持终止状态。

P64 只消费调用方提供的 P63 Result，不得直接调用 P63 Resolver。Consumption 仍不构成实际执行解冻。

## 05｜严格禁止

本刀禁止：

- 实际解除 P54/P60 冻结或改变 P39–P62；
- 消费 P53/P59 Runtime Result；
- 选择最终 Canvas、WebGL、Three.js、SVG、DOM 或其他后端；
- 创建 Renderer、Factory、Render Runtime、绘制命令或像素输出；
- UI、Launch、Gravity、Crystal 接入；
- Runtime、Persistence、Storage、网络或 AI；
- 改变现有用户结果。

## 06｜验收

1. 只有合法 P62 AVAILABLE Command 才形成正式 Declaration；
2. NOT_READY、UNAVAILABLE 与非法 Command 均不生成 Declaration；
3. Declaration 保留所有原始引用且不实际解冻；
4. P63 不调用 P62 Resolver、不消费 P53/P59 Result；
5. P63 Result 当前无下游消费者；
6. P63 gate、P62 gate、P61 gate、P60/P54 freeze gate、release、build 与 `git diff --check` 通过。
