# GUANYAO Star Beast Renderer Implementation Capability Binding Protocol
# 观爻星兽渲染器实现能力绑定协议

版本：Evolution Phase 2 / P48

状态：IMPLEMENTATION CAPABILITY BINDING

施工编号：`RC-STAR-BEAST-RENDERER-IMPLEMENTATION-CAPABILITY-BINDING-P48`

## 00｜协议定位

P48 将调用方提供的 P46 Implementation Candidate Result 与 P47 Backend Capability Result 进行引用一致性绑定。

固定关系为：

```text
P46 StarBeastRendererImplementationCandidateResult
+
P47 StarBeastRendererBackendCapabilityResult
↓
P48 StarBeastRendererImplementationCapabilityBindingResult
├─ AVAILABLE
├─ NOT_READY
└─ UNAVAILABLE
```

Binding 不是 Renderer，不是实现授权，不是后端选择，也不是渲染执行结果。

## 01｜输入契约

P48 Input 只包含：

- `candidateResult`：P46 原始 Result 或 null；
- `backendCapabilityResult`：P47 原始 Result 或 null。

P48 不调用 P46 或 P47 Resolver，不补造上游 Result。

## 02｜AVAILABLE

只有以下条件同时成立时才能生成 Binding：

1. P46 Result 为 AVAILABLE；
2. P47 Result 为 AVAILABLE；
3. Candidate 的 Backend Capability Reference 与 Declaration Reference 的 `referenceType` 一致；
4. 两项 Reference 的 `referenceId` 一致。

Binding 只保留：

- P46 Candidate 原始引用；
- P47 Capability Declaration 原始引用；
- `BACKEND_CAPABILITY_REFERENCE_MATCHED` 状态。

它不复制 Render Plan 通道，不复制能力事实，不选择渲染后端。

## 03｜NOT_READY

当 P46 Result 为 NOT_READY 时，P48 返回：

```text
NOT_READY
reason: IMPLEMENTATION_CANDIDATE_NOT_READY
```

NOT_READY 不要求 P47 补齐声明，不生成 Binding。

## 04｜UNAVAILABLE

以下情况返回 UNAVAILABLE：

- 缺少 P46 Result：`IMPLEMENTATION_CANDIDATE_RESULT_REQUIRED`；
- P46 Result 为 UNAVAILABLE：`IMPLEMENTATION_CANDIDATE_UNAVAILABLE`；
- 缺少 P47 Result：`BACKEND_CAPABILITY_RESULT_REQUIRED`；
- P47 Result 为 UNAVAILABLE：`BACKEND_CAPABILITY_UNAVAILABLE`；
- Candidate 与 Declaration 引用不一致：`BACKEND_CAPABILITY_REFERENCE_MISMATCH`。

引用不一致时不得尝试猜测、修复或重写任一上游 Reference。

## 05｜Binding 边界

`StarBeastRendererImplementationCapabilityBinding` 必须声明：

- `bindingOnly: true`；
- `capabilityDeclarationVerified: true`；
- `noImplementationAuthorization: true`；
- `noBackendSelection: true`；
- `noRenderExecution: true`；
- `noUIIntegration: true`；
- `noRuntimeIntegration: true`；
- `noStorageWrite: true`。

P48 的“已验证”只表示：P47 Result 已为 AVAILABLE，且 P46/P47 声明引用完全一致。它不表示具体设备可运行，也不授权 Renderer 实现。

## 06｜冻结调用拓扑

```text
P46 Result → only P48 Binding
P47 Result → only P48 Binding
P46 Resolver → no direct external caller
P47 Resolver → no direct external caller
P48 Binding Resolver → no downstream consumer
```

P48 禁止直接调用 P41–P47，不得绕过冻结链重新计算 Candidate 或 Declaration。

## 07｜严格禁止

本刀禁止：

- 创建 Renderer、Render Runtime、Renderer Factory 或绘制命令；
- 创建实现授权或自动推进实现阶段；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他后端；
- 设备、浏览器、GPU、Runtime 或特性探测；
- shader、材质、几何体、粒子、纹理、动画或视觉资产；
- UI、Launch、Gravity、Crystal 接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改 P39–P47 结果及现有用户结果。

## 08｜验收

1. P46/P47 AVAILABLE 且引用一致时生成 AVAILABLE Binding；
2. P46 NOT_READY 保持 NOT_READY；
3. 缺失或上游 UNAVAILABLE 保持 UNAVAILABLE；
4. 引用不一致明确阻断；
5. P48 只保留原始引用，不复制通道或能力事实；
6. P48 不调用 P41–P47；
7. P48 不创建实现授权、不选择后端、不执行渲染；
8. P48 gate、P46/P47 gates、freeze gate、release、build 与 `git diff --check` 通过。
