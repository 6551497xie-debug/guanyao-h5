# GUANYAO Star Beast Renderer Backend Selection Readiness Protocol
# 观爻星兽渲染器后端选择准备度协议

版本：Evolution Phase 2 / P73

状态：BACKEND SELECTION READINESS ONLY

施工编号：`RC-STAR-BEAST-RENDERER-BACKEND-SELECTION-READINESS-P73`

## 00｜目标

P73 在 P72 冻结链之外建立 Renderer Backend Selection Readiness：

```text
P71 opaque governance reference
→ P73 Backend Selection Readiness
→ READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION
```

P73 只判断是否可以进入未来显式技术选择。READY 表示“可以请求选择技术”，不是已经选择技术。

## 01｜唯一上游边界

P73 只接收 `STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE` 不透明引用。

- 不导入 `StarBeastRendererExecutionProtocolAuthorizationEndpointResult`；
- 不调用 P67–P71 Resolver、Service 或 Endpoint；
- 不读取、复制或重算 P71 事实；
- 不消费 P53/P59/P65/P71 冻结 Endpoint Result；
- 不解除 P54/P60/P66/P72 四重冻结。

不透明引用只证明授权治理交接来源存在，不证明具体技术已经获得选择或执行许可。

## 02｜准备度状态

### READY

`READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION`

仅表示未来可以建立独立的显式 Backend Selection Command。技术选择仍必须由主体显式作出，并保持 deferred。

### UNAVAILABLE

P71 不透明治理引用缺失或无效。系统不得绕过冻结终点，也不得通过默认值推断技术。

## 03｜固定护栏

P73 所有状态保持：

- `explicitBackendSelectionRequired: true`；
- `backendSelectionDeferred: true`；
- `governanceReferenceOnly: true`；
- `noP71ResultConsumption: true`；
- `noFrozenEndpointResultConsumption: true`；
- `noBackendCandidate: true`；
- `noBackendSelection: true`；
- `noCapabilityProbe: true`；
- `noDeviceDetection: true`；
- `noRendererCreation: true`；
- `noRenderExecution: true`。

READY 额外保持无 UI、Runtime 与 Storage 接入。

## 04｜调用所有权

```text
P71 opaque governance reference → only P73 readiness input
P73 Result → no consumer before explicit renderer backend selection command
```

P73 Resolver 当前只允许其自身 Service 文件持有。下一层必须建立独立显式指令契约，不得直接将 READY 交给 Backend、Renderer、UI 或 Runtime。

## 05｜严格禁止

本刀禁止：

- 消费 P71 Result 或任何冻结 Endpoint Result；
- 反向调用 P67–P71；
- 创建 Backend Candidate、Selection Command、Selection Result 或 Endpoint；
- 选择 Canvas、WebGL、Three.js、SVG、DOM 或任何具体技术；
- 运行设备、浏览器、GPU、Feature 或 Capability Probe；
- 创建 Renderer、Factory、Runtime、绘制命令、shader、纹理或像素输出；
- UI、Launch、Gravity、Crystal、Storage、网络或 AI 接入；
- 修改 P39–P72 既有类型、Service、Resolver、Endpoint 或用户结果。

## 06｜验收

1. P71 不透明治理引用缺失或无效时为 UNAVAILABLE；
2. 有效治理引用只输出 Backend Selection READY；
3. P73 不消费 P71 Result，不调用 P67–P71；
4. P73 不产生候选技术，不选择 Backend，不运行能力或设备探测；
5. P73 不创建 Renderer、不执行 Render；
6. P72 冻结协议明确 P73 位于冻结链之外且不解除四重冻结；
7. P73 Gate、P72 Gate、P71 Gate、release、build 与 `git diff --check` 通过。
