# GUANYAO Star Beast Renderer Explicit Implementation Unfreeze Declaration Command Protocol
# 观爻星兽渲染器实现显式解冻声明指令协议

版本：Evolution Phase 2 / P56

状态：EXPLICIT IMPLEMENTATION UNFREEZE DECLARATION COMMAND

施工编号：`RC-STAR-BEAST-RENDERER-EXPLICIT-IMPLEMENTATION-UNFREEZE-DECLARATION-COMMAND-P56`

## 00｜协议定位

P56 将 P55 的解冻准备度与主体的显式决定组合为声明指令：

```text
P55 READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION
+ STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY Reference
+ explicit DECLARE_UNFREEZE decision
→ Explicit Implementation Unfreeze Declaration Command
```

系统不能根据 READY 自动解冻。Command 只表达主体已明确要求进入正式解冻声明流程。

## 01｜输入边界

P56 只消费调用方提供的 P55 Result，不调用 P55 Resolver，也不重新判断治理材料。

只有 `READY` 可以与有效主体引用、`DECLARE_UNFREEZE` 决定共同生成 Command：

- P55 `NOT_READY` → `UNFREEZE_READINESS_NOT_READY`；
- P55 `UNAVAILABLE` → `UNFREEZE_READINESS_UNAVAILABLE`；
- 缺少 P55 Result → `UNFREEZE_READINESS_RESULT_REQUIRED`；
- 缺少主体引用 → `UNFREEZE_AUTHORITY_REFERENCE_REQUIRED`；
- 主体引用非法 → `UNFREEZE_AUTHORITY_REFERENCE_INVALID`；
- 未显式决定 → `EXPLICIT_DECLARE_UNFREEZE_DECISION_REQUIRED`。

## 02｜Command 语义

Command 必须保留 P55 的原始引用：

- P53 terminal governance reference；
- implementation scenario reference；
- backend candidate references；
- fallback strategy reference；
- acceptance scope reference。

它只保存引用，不复制治理事实，并保持：

- `commandOnly: true`；
- `notUnfreezeDeclaration: true`；
- `noUnfreezeIssued: true`；
- `noAuthorizationEndpointConsumption: true`；
- `noFinalBackendSelection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

## 03｜单向治理拓扑

```text
P55 Readiness Result → only P56 Explicit Unfreeze Declaration Command
P55 Readiness Resolver → no direct external caller
P56 Command Resolver → no downstream consumer
```

P56 不能反向调用 P55，也不能消费 P53 Runtime Result。

## 04｜非声明、非解冻边界

Command 不是正式 Unfreeze Declaration，也不是实际 Unfreeze。P56 禁止：

- 生成正式解冻声明或解除 P54 冻结；
- 选择最终渲染后端；
- 创建 Renderer、Factory、Runtime 或绘制命令；
- 执行 Canvas、WebGL、Three.js、SVG、DOM 或其他渲染；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P55 与现有用户结果。

## 05｜验收

1. 只有 P55 READY + 有效主体引用 + `DECLARE_UNFREEZE` 才生成 Command；
2. NOT_READY 与 UNAVAILABLE 状态单向保留；
3. Command 保持所有 P55 原始引用且不复制事实；
4. Command 不等于 Unfreeze Declaration，不实际解冻；
5. P56 不调用 P55 Resolver、不消费 P53 Result；
6. P56 gate、P55 gate、P54 freeze gate、release、build 与 `git diff --check` 通过。
