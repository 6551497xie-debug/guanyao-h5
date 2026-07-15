# GUANYAO Star Beast Renderer Execution Unfreeze Declaration Consumption Protocol
# 观爻星兽渲染器执行解冻声明消费协议

版本：Evolution Phase 2 / P64

状态：EXECUTION UNFREEZE DECLARATION CONSUMPTION

施工编号：`RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-DECLARATION-CONSUMPTION-P64`

## 00｜协议定位

P64 为 P63 正式执行解冻声明建立稳定消费边界：

```text
P63 Execution Unfreeze Declaration Result
→ P64 Execution Unfreeze Declaration Consumption Result
```

Consumption 只证明正式声明已被治理层接收。它不是实际 Execution Unfreeze，不解除 P54/P60 双冻结。

## 01｜单向输入边界

P64 只消费调用方提供的 P63 Result，不调用 P63 Resolver，不重新生成或重新裁决 Declaration。

- P63 `DECLARED` → P64 `AVAILABLE`；
- P63 `NOT_READY` → `EXECUTION_UNFREEZE_DECLARATION_NOT_READY`；
- P63 `UNAVAILABLE` → `EXECUTION_UNFREEZE_DECLARATION_UNAVAILABLE`；
- 缺少 P63 Result → `EXECUTION_UNFREEZE_DECLARATION_RESULT_REQUIRED`。

## 02｜引用保持

AVAILABLE Consumption 只投影并保持：

- Declaration 与 source Declaration Result；
- P62 source Command；
- 主体与 P61 Readiness；
- P59、P53 terminal governance references；
- execution scope、Runtime boundary、rollback strategy 与 acceptance scope references。

P64 不复制治理事实，不补全上游材料。

## 03｜消费边界

Consumption 必须保持：

- `declarationConsumedOnly: true`；
- `executionUnfreezeDeferred: true`；
- `noExecutionUnfreezeIssued: true`；
- `noP53ResultConsumption: true`；
- `noP59ResultConsumption: true`；
- `noFrozenEndpointResultConsumption: true`；
- `noFinalBackendSelection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

`AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_UNFREEZE_ENDPOINT` 只允许未来独立 Endpoint 接收，不代表 Renderer 已获准进入 Runtime。

## 04｜治理拓扑

```text
P63 Declaration Result → only P64 Declaration Consumption
P63 Declaration Resolver → no direct external caller
P64 Consumption Result → no downstream consumer
P64 Consumption Service → owner-only
```

P64 不消费 P53/P59 Endpoint Result，两条冻结链仍无 Runtime 消费者。

## 05｜严格禁止

本刀禁止：

- 实际解除 P54/P60 冻结；
- 消费 P53/P59 Runtime Result；
- 选择最终渲染后端；
- 创建 Renderer、Factory、Runtime、绘制命令或像素输出；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P63 与现有用户结果。

## 06｜验收

1. 只有 P63 DECLARED 才返回 AVAILABLE；
2. NOT_READY、UNAVAILABLE 与缺失结果均不形成 Consumption；
3. AVAILABLE 保留原始引用并继续延迟实际执行解冻；
4. P64 不调用 P63 Resolver、不消费 P53/P59 Result；
5. P64 Result 当前无下游消费者；
6. P64 gate、P63 gate、P62 gate、P61 gate、P60/P54 freeze gate、release、build 与 `git diff --check` 通过。
