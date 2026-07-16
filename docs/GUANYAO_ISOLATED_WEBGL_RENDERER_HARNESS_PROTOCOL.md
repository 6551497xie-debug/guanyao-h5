# GUANYAO Isolated WebGL Renderer Harness Protocol V1.0

协议编号：`RC-ISOLATED-WEBGL-RENDERER-HARNESS-P100`

阶段：`GUANYAO Visual Technical Validation Phase`

状态：`IMPLEMENTED_FOR_HUMAN_FIRST_IMPRESSION_REVIEW / NOT VISUALLY ACCEPTED`

治理等级：`EXPERIMENT ONLY / PREVIEW ROUTE ONLY / NO PRODUCTION / NO FORMAL USER`

## 00｜本刀目标

P100 为 P99 隔离 Renderer 建立第一个可人工观看的真实 GPU Harness。

正式验证链：

```text
P96 两个正式身份样本
↓
P97 PersonalStarBeastRenderPlan
↓
P98 Explicit Authorization
↓
P99 Isolated WebGL Renderer
↓
P100 Human First Impression Harness
```

P100 不再只问“Renderer 是否运行”，而是开始问：

> 当生命显化出现在用户眼前时，用户有没有感到一个生命正在靠近、形成并在场。

## 01｜五问审查

1. 修改层：`EXPERIENCE / ISOLATED VISUAL REVIEW`。
2. 正式输入：P96 → P97 → P98 → P99。
3. 输出：可人工观看、可重播、可切换正式对照样本的隔离显化体验。
4. 是否改变生命规则：`NO`。
5. 是否需要跨层评审：如需修改 Identity、Grammar、Scene Model 或 RenderPlan，必须停止 P100 并重新评审；本刀没有发生跨层修改。

## 02｜唯一允许的入口

隔离预览 URL：

`/personal-star-beast-webgl-prototype`

该入口只存在于 `previewRoutes`，并由 `import.meta.env.DEV` 与动态加载共同隔离。生产构建必须裁掉 Harness 与 Three.js 实验模块；它不进入 `GUANYAO_ROUTES`，不进入正式导航，不替换 Launch、Gravity、Dynamics 或 Crystal。

## 03｜第一眼体验目标

用户进入后，体验按三段自然发生：

### ARRIVAL｜抵达

- 深空先于结构；
- 光源微弱但立即存在；
- 第一眼不是控制台、参数页或结果卡；
- 用户感到“有什么正在靠近”。

### FORMATION｜形成

- 星辰秩序逐步可见；
- 视觉焦点从宇宙场收束到生命结构与星核；
- 不展示动物名字，不让四象标签替用户提前认知；
- 用户感到“它正在成为一个存在”。

### PRESENCE｜在场

- 动势减弱，生命星核保持缓慢呼吸；
- 文案不宣布人格结论；
- 画面停留在安静、古老、陪伴的生命存在感；
- 用户愿意多停留一会儿，而不是立刻寻找下一按钮。

## 04｜第一眼人工验收问题

人工验收必须直接回答：

1. 三秒内，它更像“生命正在显化”，还是“星座图 / 音乐可视化 / 技术 Demo”？
2. 视线是否自然从宇宙场进入生命结构，再停留在生命星核？
3. 最终状态是否具有安静、古老、在场的生命感？
4. 不知道星宿、四象、母码名称时，用户是否仍愿意继续观看？
5. Case A 与 Case B 是否像两种不同生命表达，而不是同一个特效换参数？
6. 文案是在为视觉留出认领空间，还是替视觉解释和自我感动？

P100 自动 gate 不得替人回答这些问题。

## 05｜第一眼否决条件

出现任一情况即不得宣告视觉通过：

- 第一眼像粒子特效、星座连线或屏保；
- 技术标签、阶段编号、参数或实验说明占据用户注意力；
- 四象动物名称先于个人生命显化出现；
- 只有“漂亮”，没有生命中心与在场感；
- Case A / Case B 的差异只能通过文字标签理解；
- 需要阅读世界观说明后才知道画面是什么；
- 控制按钮比生命显化本身更有存在感。

## 06｜Harness 职责

P100 允许：

- 选择 P96 正式双案例；
- 由同一个 P97 Adapter 生成两个 RenderPlan；
- 创建 P98 隔离授权；
- 把已授权计划交给 P99；
- 在 Harness 拥有 `requestAnimationFrame`；
- 驱动 P99 的手动 `renderFrame`；
- 监听尺寸并调用 `resize`；
- 卸载时取消帧、断开监听并 `dispose`；
- 提供“再看一次”和“看看另一种生命”两项弱控制。

## 07｜Harness 禁止事项

P100 禁止：

- 直接调用 Star Beast Engine；
- 直接调用 MotherCode Engine；
- 直接读取 Mansion、Four Symbol、LifeArchetype 或用户身份；
- 向 P99 Renderer 传入 Scene Model 或生命事实；
- 在用户画面展示 Case A / Case B、WebGL、RenderPlan、P100 等工程语言；
- 硬编码青龙、白虎、朱雀、玄武或任何动物身份；
- 写入 Storage；
- 接入正式用户数据；
- 修改产品主链。

## 08｜Fallback 与可访问性

WebGL2 不可用或用户请求减少动态时，P100 消费 P99 的语义降级结果，提供静态生命在场表达。Fallback 不重新计算身份，不显示错误参数，不阻断用户理解。

体验文案使用 `aria-live`；Canvas 为表达层，不向辅助技术复制生命事实。

## 09｜技术验收与视觉验收分离

自动 gate 可以验证：

- P96 / P97 / P98 / P99 来源链存在；
- 两个正式 RenderPlan 均可进入同一 Harness；
- P99 只有一个隔离页面消费者；
- 动画循环由 Harness 持有；
- 生命周期完整；
- 页面无生命身份硬编码；
- 路由不进入 Production；
- build 与 release 通过。

自动 gate 不能验证：

- 用户是否被击中；
- 视觉是否像生命；
- 生命是否具有安静、古老、在场的气质；
- 文案与视觉之间是否产生真正心流。

因此 P100 完成后的视觉状态只能是：

`PENDING_HUMAN_FIRST_IMPRESSION_REVIEW`

## 10｜结论边界

P100 不得因为页面能打开、GPU 能渲染、gate 能通过而升级为视觉通过。

人工验收后只有三种结论：

- `FIRST_IMPRESSION_ACCEPTED`：可以继续细化显化语法；
- `FIRST_IMPRESSION_NEEDS_CALIBRATION`：进入生命在场视觉校准；
- `FIRST_IMPRESSION_REJECTED`：停止 Renderer 优化，重新审查 Scene Projection 是否足以承载个人生命显化。

推荐下一刀必须由人工验收结论决定，不预设升级 Production。
