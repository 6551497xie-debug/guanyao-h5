# GUANYAO Star Beast Genesis Renderer Slice Protocol

协议编号：`RC-STAR-BEAST-GENESIS-RENDERER-SLICE-P85`

P85 是艮之白虎的隔离视觉原型验证。它消费 P84 `StarBeastGenesisPrototypeAsset`，建立 `GenesisVisualState → GenesisRendererPrototypeInput → Isolated Prototype Renderer`，验证星辰秩序能否经过四象形态与生命原力形成星兽诞生体验。

## 1. 引用边界

`StarBeastGenesisVisualState` 只保存 P84 Asset、P80 表达通道契约、Renderer Contract 与阶段引用。它不复制坐标、粒子参数、动画参数或生命事实，Scope 固定为 `ISOLATED_PROTOTYPE_ONLY`。

P80 当前六通道结果属于既有 P77 资产链。P85 不伪造 P80 Available 结果，只引用 `STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT`，由 P85 阶段映射提供隔离原型输入。

## 2. 五阶段视觉顺序

1. `COSMIC_FIELD`：深空、星尘、微弱光源；禁止出现白虎。
2. `WESTERN_MANSION_ALIGNMENT`：西方七宿星点出现并建立连接；禁止直接出现兽形。
3. `WHITE_TIGER_FORMATION`：七宿形成白虎星骨与生命结构；不是动物轮廓。
4. `GEN_INFUSION`：星核稳定、边界增强、光流沉稳；禁止用文字解释乾坤艮。
5. `WHITE_TIGER_REVEAL`：初代艮之白虎以安静、守望、在场的姿态显化；禁止战斗姿态。

七宿阶段必须先于白虎形成，白虎形成必须先于艮原力注入，艮原力注入必须先于最终显化。

## 3. Prototype Renderer

隔离 Renderer 只消费 `StarBeastGenesisRendererPrototypeInput`，允许 Canvas 2D、简单星尘、简单光流和人工阶段切换。Canvas 内部可以拥有绘制坐标，但坐标不得进入 Genesis Visual State 或 Prototype Input。

禁止 WebGL、Three.js、3D 模型、毛发系统与写实动物。Renderer 不得创造或修改 P84 Asset，不得修改 Life State，也不得读取 MotherCode、FourSymbol、用户画像或 Storage。

## 4. 产品隔离

P85 只允许独立路由 `/starbeast-genesis-renderer-slice-preview` 消费。禁止接入 LaunchLab、StarbeastLab、Gravity、Dynamics、Crystal UI 或正式用户流程；不得替换 P88 预览或既有 Renderer。
