# GUANYAO Star Beast Renderer Backend Capability Schema Protocol
# 观爻星兽渲染后端能力声明协议

版本：Evolution Phase 2 / P47

状态：BACKEND CAPABILITY SCHEMA

施工编号：`RC-STAR-BEAST-RENDERER-BACKEND-CAPABILITY-SCHEMA-P47`

## 00｜协议定位

P47 正式定义 P46 所引用的 Backend Capability Declaration。

它只回答：一个未来渲染实现是否显式声明了完整的抽象表达能力与安全降级能力。

它不回答：使用哪一种渲染技术、当前设备支持什么、何时开始绘制。

固定关系为：

```text
Backend Capability Declaration Input
↓
P47 StarBeastRendererBackendCapabilityResult
├─ AVAILABLE
└─ UNAVAILABLE

P47 Declaration Reference
↓ reference only
P46 StarBeastRendererImplementationCandidate
```

P46 只保存 P47 声明引用，不消费 Declaration 内容，也不调用 P47 Resolver。

## 01｜Schema 唯一所有权

P47 是以下语义的唯一所有者：

- `StarBeastRendererBackendCapabilityReference`；
- `StarBeastRendererBackendCapability`；
- `StarBeastRendererBackendCapabilityDeclaration`；
- `StarBeastRendererBackendCapabilityResult`。

P46 只从 P47 导入 Reference，不得继续维护兼容副本。

## 02｜抽象能力集合

声明必须完整包含：

- `SEMANTIC_RENDER_PLAN_INPUT`；
- `MANIFESTATION_CHANNEL_PROJECTION`；
- `ENERGY_CHANNEL_PROJECTION`；
- `LIGHT_CHANNEL_PROJECTION`；
- `STAR_FIELD_CHANNEL_PROJECTION`；
- `CRYSTAL_CHANNEL_PROJECTION`；
- `REDUCED_MOTION_FALLBACK`；
- `STATIC_FRAME_FALLBACK`。

这些值描述未来 Renderer 必须具备的抽象能力，不是绘制命令、像素参数、资产地址或技术选型。

## 03｜AVAILABLE

只有当 Declaration Reference 存在且八项能力完整时，P47 才返回 AVAILABLE Declaration。

Declaration 必须明确：

- 只消费语义 Render Plan；
- Renderer Neutral；
- Backend Unspecified；
- 不选择后端；
- 不探测设备；
- 不探测 Runtime；
- 不执行渲染；
- 不接 UI；
- 不写 Storage。

## 04｜UNAVAILABLE

以下情况返回 UNAVAILABLE：

- 缺少声明引用：`BACKEND_CAPABILITY_DECLARATION_REFERENCE_REQUIRED`；
- 能力集合不完整：`BACKEND_CAPABILITY_SET_INCOMPLETE`。

UNAVAILABLE 不补默认能力，不推断后端，不创建 P46 Candidate。

## 05｜P46 来源校准

P47 只校准 P46 Backend Capability Reference 的正式语义来源，不改变 P46 行为：

- P46 仍只检查引用是否存在；
- P46 不读取能力集合；
- P46 不调用 P47 Resolver；
- P47 Resolver 仍没有外部直接调用者；
- P47 Result 只允许由 P48 Capability Binding 消费；
- Declaration 与 Candidate 的正式组合由 P48 独立协议完成。

## 06｜严格禁止

本刀禁止：

- 选择 Canvas、WebGL、Three.js、SVG、DOM 或其他后端；
- 使用设备、浏览器、GPU 或特性探测 API；
- shader、材质、几何体、粒子、纹理、动画或绘制命令；
- 创建 Renderer、Render Runtime 或 Renderer Factory；
- UI、Launch、Gravity、Crystal 接入；
- Runtime、Persistence、Storage、网络或 AI；
- 修改 P39–P46 结果及现有用户结果。

## 07｜验收

1. Reference 与 Declaration 由 P47 唯一拥有；
2. 八项抽象能力完整时返回 AVAILABLE；
3. 缺少引用或能力时返回 UNAVAILABLE；
4. P47 不选择后端、不探测设备、不执行渲染；
5. P46 只导入 Reference，行为保持不变；
6. P47 Resolver 没有外部直接调用者；
7. P47 Result 只由 P48 消费；
8. P39–P47 冻结链保持稳定；
9. P47 gate、P46 gate、freeze gate、release、build 与 `git diff --check` 通过。
