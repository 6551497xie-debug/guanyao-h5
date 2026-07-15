# GUANYAO Star Beast Renderer Implementation Candidate Protocol
# 观爻星兽渲染器实现候选协议

版本：Evolution Phase 2 / P46

状态：RENDERER IMPLEMENTATION CANDIDATE

施工编号：`RC-STAR-BEAST-RENDERER-IMPLEMENTATION-CANDIDATE-P46`

## 00｜协议定位

P46 只把满足 P45 Renderer Readiness 的语义计划引用登记为未来 Renderer Implementation Candidate。

固定关系为：

```text
P45 StarBeastRendererReadinessResult
↓
P46 StarBeastRendererImplementationCandidate
├─ AVAILABLE
├─ NOT_READY
└─ UNAVAILABLE
```

Candidate 不是 Renderer，不是 Renderer Runtime，也不是渲染后端选择结果。

## 01｜输入契约

P46 Input 只包含：

- `readinessResult`：P45 原始 Result 或 null；
- `implementationRequestReference`：未来实现请求引用或 null；
- `backendCapabilityReference`：未来后端能力声明引用或 null。

两类外部引用只证明请求与能力声明存在，不承载 Canvas、WebGL、Three.js 或任何设备判断。

## 02｜AVAILABLE

仅当以下条件同时成立时生成 Candidate：

1. P45 Result 为 READY；
2. readiness 为 `READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL`；
3. Implementation Request Reference 存在；
4. Backend Capability Reference 存在。

Candidate 只保留：

- P45 READY 原始引用；
- P42 Render Plan Consumption 原始引用；
- P41 Render Plan 原始引用；
- Render Request 原始引用；
- Implementation Request Reference；
- Backend Capability Reference。

Candidate 不复制五个语义通道，不补能力内容，不选择渲染技术。

## 03｜NOT_READY

当 P45 Result 为 NOT_READY 时，P46 返回：

```text
NOT_READY
reason: RENDERER_READINESS_NOT_READY
```

NOT_READY 保留完整 P45 Result 引用，不生成 Candidate，也不尝试修复 P39–P45 链。

## 04｜UNAVAILABLE

以下情况返回 UNAVAILABLE：

- 缺少 P45 Result：`RENDERER_READINESS_RESULT_REQUIRED`；
- P45 Result 为 UNAVAILABLE：`RENDERER_READINESS_UNAVAILABLE`；
- 缺少实现请求引用：`IMPLEMENTATION_REQUEST_REFERENCE_REQUIRED`；
- 缺少后端能力引用：`BACKEND_CAPABILITY_REFERENCE_REQUIRED`。

UNAVAILABLE 不补默认引用，不创建 Candidate，不调用 P45 Resolver。

## 05｜Candidate 边界

`StarBeastRendererImplementationCandidate` 必须声明：

- `semanticRole: STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE`；
- `candidateOnly: true`；
- `backendAgnostic: true`；
- `noBackendSelection: true`；
- `rendererImplementationDeferred: true`；
- `noRenderExecution: true`；
- `noUIIntegration: true`；
- `noRuntimeIntegration: true`；
- `noStorageWrite: true`。

Backend Capability Reference 不是后端选择。它只指向未来独立协议提供的能力声明。

## 06｜冻结调用拓扑

```text
P43 Result → only P45 Readiness
P45 Result → only P46 Candidate
P45 Resolver → no direct external caller
P46 Candidate Resolver → no downstream consumer
```

P46 禁止直接调用 P41、P42、P43 或 P45，不得绕过 P44 Freeze Protocol。

## 07｜严格禁止

本刀禁止：

- 创建 Renderer、Render Runtime 或绘制命令；
- 选择 Canvas、WebGL、Three.js、SVG 或 DOM 后端；
- shader、材质、几何体、粒子、纹理或动画实现；
- UI、Launch、Gravity、Crystal 页面接入；
- Runtime、Persistence、Storage、网络或 AI；
- 创建或修改 Life State、Memory、Growth、Archive、Journey、Crystal；
- 修改 P39–P45 的计算结果和现有用户结果。

## 08｜施工范围

P46 只新增：

- Renderer Implementation Candidate 类型；
- Candidate Resolver；
- 本协议与独立 gate；
- P44/P45 授权消费点及 gate 校准；
- release gate 注册。

## 09｜验收

1. P45 READY 与两项引用齐备时生成 AVAILABLE Candidate；
2. P45 NOT_READY 保持 NOT_READY；
3. P45 UNAVAILABLE 与缺失引用保持 UNAVAILABLE；
4. Candidate 只保留原始引用，不复制通道；
5. Candidate 不选择后端、不执行渲染；
6. P46 不调用 P41–P45；
7. P39–P45 冻结拓扑保持稳定；
8. candidate gate、release、build 与 `git diff --check` 通过。
