# R8｜视觉链 2.0 重构方案锁定文档

任务编号：`R8-VISUAL-CHAIN-REBUILD-PLAN-P0`

本轮性质：纯方案文档。只新增本文件，不改任何 `src`、不改任何 `public` 图片、不改数据结构、不改业务逻辑、不改路由。

---

## 一、文档定位

本文件用于锁定《观爻 / GUANYAO SANDBOX》H5 视觉链 2.0 的重构方案，回答以下问题：

1. 视觉链 2.0 各层归属谁，谁能动、谁不能动？
2. Codex 底层因果链如何保持不动？
3. Claude 如何只接管表现层与 Canvas 视觉链？
4. ChatGPT 已有的 64 卦 / 8 母码内容链如何只精修、不重写？
5. 旧 DOM 逻辑如何保留，Canvas 特区如何覆盖显示？
6. Canvas 如何通过 trigger 复用旧事件，而不另起一套交互？
7. 母码卡与卦码卡如何分别重构，互不污染？
8. A 面 / B 面卦符规则如何强制约束？
9. V0.8 入仓与收藏级如何分线？
10. 为什么不允许用 001 当全局模板？
11. 为什么不允许一次性大改全项目？

本文件是方案锁定文档，不是施工指令，不是生图提示词，不是单卡说明书。后续每一条施工都必须从本文件派生独立小任务。

---

## 二、当前项目结构现状（重构基线）

本方案基于当前 repo 实际结构盘点，确认三条链已客观存在且边界清晰。

### 2.1 底层因果链（Codex 域 / 不动）

负责把母码、压力种子、六维空间投射、卦象、爻传导、器法、资产沉积串成确定性因果管线：

- `src/services/guanyaoCausalEngineService.ts`（因果管线主服务）
- `src/adapters/guanyaoR8ReadModelAdapter.ts`（R8 读模型适配器，前台只读入口）
- `src/data/guanyaoPressureSeedSixSpaceProjectionRegistry.ts`（**全程不动**）
- `src/data/guanyaoMotherCodeRegistry.ts`、`guanyaoHexagramMatrixRegistry.ts`、`guanyaoPressureSeedMatrix.ts`、`guanyaoPressureSeedLanguageProtocol.ts`、`guanyaoNumericProtocol.ts`、`guanyaoRealityPressureFields.ts`、`guanyaoPressureSeedDraftPool.ts`
- `src/services/guanyaoPressureSeedSceneBindingService.ts`、`guanyaoTripleForceLandingService.ts`、`guanyaoCausalEngineService.ts`
- `src/types/guanyaoCausalEngine.ts`、`guanyaoPressureSeed.ts`
- `src/mocks/guanyaoCausalEngineMock.ts`

特征：沙漏、支付、压力种子、六维空间、资产沉积的因果计算全部在此。前台任何页面都只能通过 `getGuanyaoR8ReadModel()` 只读消费，绝不反向写入。

### 2.2 内容链（ChatGPT 域 / 只精修不重写）

负责 64 卦 / 8 母码的文案母本、卦码卡模板数据、母码资产文案：

- `src/data/guanyaoHexagramCardTemplateData.ts`（64 卦码卡模板数据：卦名、卡名、金句、标签、卡魂、复盘、上下卦、视觉槽元数据）
- `src/data/guanyaoHexagramGlyphs.ts`（固定六爻卦形库）
- `src/data/guanyaoHexagramAssetLibrary.ts`、`guanyaoHexagramVisualReferenceLibrary.ts`、`guanyaoHexagramCardVisualPrompts.ts`
- `src/data/guanyaoMotherCodeAssetLibrary.ts`、`src/services/guanyaoMotherCodeAssetService.ts`
- `src/data/yuanCodes.ts`、`motherCodes.ts`、`yaoCodes.ts`、`identityFragments.ts`、`forceReadings.ts`

特征：这是文字与卦/母码语义资产。Claude 不重写其语义，只在表现层消费，必要的文案精修以独立内容任务交回 ChatGPT 域。

### 2.3 表现层 + Canvas 视觉链（Claude 域 / 本轮接管对象）

负责把读模型渲染成画面与交互：

- 视觉原语：`src/components/visual/GyVisualChain.tsx`（**本轮不动**，作为既有原语库被复用）、`GuanyaoShell.tsx`、`GuanyaoText.tsx`、`GuanyaoButton.tsx`、`TimeSandglassReadout.tsx`
- 旧 DOM 交互轨：`src/components/causal/CausalRail.tsx`（滑动/点击触发 `onLeft` / `onRight`）
- 卦码卡组件：`src/components/hexagram-card/`（`GuanyaoHexagramCardFront.tsx`、`GuanyaoHexagramCardBack.tsx`、`GuanyaoHexagramCardSpread.tsx`、`GuanyaoHexagramVisualPlaceholder.tsx`、`GuanyaoHexagramReferencePanel.tsx`）
- 页面：`src/pages/*`（`MotherCodePage`、`ScenePage`、`IdentityPage`、`GravityPage`、`ChoicePage`、`MigrationPage`、`ChronoPage`、`ArchivePage`、`LaunchPage`、`HexagramCardLabPage`）
- 路由：`src/App.tsx`、`src/routes/guanyaoRoutes.ts`（**本轮不动**）
- 公共图片：`public/hexagram-card-visuals/*.png`（001—006 已入仓，**本轮不动**）

特征：本轮重构只动这一域，且以"新增 Canvas 特区组件 + 局部精修"为主，不重写整层。

---

## 三、三方分工锁定

| 角色 | 负责层 | 本轮动作 | 红线 |
| --- | --- | --- | --- |
| Codex | 底层因果链 | **不动** | 因果计算、读模型契约保持原样 |
| Claude | 表现层 + Canvas 视觉链 | 接管、重构、新增 Canvas 特区 | 不碰因果计算，不改读模型字段语义 |
| ChatGPT | 64 卦 / 8 母码内容链 | 只精修，不重写 | 语义母本不动，文案微调单独成任务 |

锁定句：

- Codex 底层因果链保持不动。
- Claude 只接管表现层和 Canvas 视觉链。
- ChatGPT 已有 64 卦 / 8 母码内容链不重写，只精修。

---

## 四、视觉链 2.0 分层模型

视觉链 2.0 分四层，自下而上：

### L0 因果数据层（Codex / 只读）

来源：`getGuanyaoR8ReadModel()`。Canvas 与 DOM 都只读消费它，任何视觉状态都不得反写回因果层。

### L1 旧 DOM 逻辑层（保留）

现有页面 DOM 结构、`CausalRail` 滑动轨、路由跳转、可访问性语义全部保留，不删除、不下线。这是无障碍与降级的基线：当 Canvas 不可用（不支持、关闭、报错）时，旧 DOM 仍能独立完成全流程。

### L2 Canvas 特区覆盖层（新增）

在指定页面的"特区"内，用一块 Canvas 覆盖在旧 DOM 之上，承载高表现力的动态视觉（粒子、母码原力流、压力场、爻传导动画等）。

- Canvas 只做"显示与表现"，不持有业务真值。
- Canvas 覆盖采用绝对定位叠加在旧 DOM 区域上方，`pointer-events` 默认仅在交互热区开启，其余区域穿透到下层 DOM。
- Canvas 不可用时自动隐藏，露出下层旧 DOM，体验不中断。

### L3 视觉原语层（既有 / 复用）

`GyVisualChain.tsx` 提供的 `GyStage`、`GyCausalRail`、`GyLogoMark`、`GyInstrumentBox`、`GyGlassSeed`、`GyAssetCard` 等原语本轮**不动**，作为 L2 与 L1 的共享样式与结构基座被复用。

锁定句：

- 旧 DOM 逻辑保留，Canvas 特区覆盖显示。

---

## 五、Canvas 通过 trigger 调用旧事件

Canvas 不另起一套交互真值，而是把交互"翻译"回旧 DOM 已有事件。

### 5.1 事件复用原则

现有交互入口已经存在且稳定：

- `src/components/causal/CausalRail.tsx`：对外暴露 `onLeft` / `onRight`，内部已处理拖拽阈值（±42px）、完成动画（170ms）、点击落点判定、键盘 `ArrowLeft` / `ArrowRight` / `Enter`。
- `src/components/visual/GyVisualChain.tsx` 的 `GyCausalRail`：对外暴露 `onComplete` / `onClick`，内部已处理进度阈值（`COMPLETE_THRESHOLD = 0.72`）与完成动画（360ms）。

### 5.2 trigger 桥接规则

Canvas 自身的手势、热区点击、动画完成节点，统一通过一个 trigger 适配器回调到上述既有事件，而不是直接调用 `navigate` 或直接写状态：

1. Canvas 命中交互热区 → 调用桥接的 `trigger("advance")`。
2. trigger 内部转调旧组件已暴露的回调（如 `CausalRail.onRight` / `GyCausalRail.onComplete`）。
3. 真正的跳转、状态推进仍由旧 DOM 事件链与 Codex 读模型驱动。

收益：

- 交互真值只有一套（旧事件），Canvas 只是它的"高表现外壳"。
- Canvas 关闭时，旧 DOM 的滑动/点击/键盘交互原样可用，无需另写降级逻辑。
- 不引入第二套路由调用或第二套完成判定，避免双触发与状态漂移。

锁定句：

- Canvas 通过 trigger 调用旧事件。

---

## 六、母码卡与卦码卡分别重构

两类卡是不同物种，必须分别重构，禁止共用同一套视觉模板互相污染。

### 6.1 母码卡（8 母码 / `MotherCodePage`）

现状：`src/pages/MotherCodePage.tsx` 以纯文字 readout 渲染母码资产卡（母码名、先天数、卦符、五行、原力/映照/解封、因果位置、默认反应链、可带走资产等）。

重构方向：

- 在母码卡主视觉区开 Canvas 特区，表现"母码原力底盘"——8 母码各有专属原力流形态（不复用卦码卡构图）。
- 文字字段（来自读模型 `motherCodeStage` 与母码资产服务）全部保留，Canvas 只在视觉区叠加，不替换文字。
- 母码卡视觉语言独立成册，与 64 卦码卡的"黑金文明切片"系列区分：母码卡偏"源代码底盘 / 原力发生器"气质。

### 6.2 卦码卡（64 卦 / `hexagram-card` 组件）

现状：`GuanyaoHexagramCardFront`（A 面）+ `GuanyaoHexagramCardBack`（B 面）+ `GuanyaoHexagramCardSpread`（A/B 预览），数据来自 `guanyaoHexagramCardTemplateData.ts`，固定模板控制排版，A 面接无字底图。

重构方向：

- A 面主视觉区可叠加 Canvas 特区做动态化（如入场显影、母题微动），但底图、金句、标签、LOGO 的固定模板结构不变。
- B 面保持固定六爻卦形（来自 `guanyaoHexagramGlyphs`）+ 卡魂 + 复盘 + 上下卦信息栏。
- 卦码卡按拓扑分流（见第八节），不与母码卡共模板。

锁定句：

- 母码卡和卦码卡分别重构。

---

## 七、A/B 面卦符硬规则

强制约束，任何卦码卡施工都必须遵守：

### A 面

- **A 面不得出现卦符。**
- A 面只接无字主视觉底图 + 固定模板叠字（NO.编号、卦名、卡名、金句、三标签、LOGO）。
- 无字底图本身也不得含卦符、文字、LOGO、编号、边框、人物、UI、水印。
- 现状校验：`GuanyaoHexagramCardFront.tsx` 顶部 header 现含 `HexagramGlyph`。本规则锁定 A 面去卦符方向；具体移除/改造在后续独立卡面任务中执行，本轮仅锁定规则，不改代码。

### B 面

- **B 面才允许固定六爻卦形。**
- 六爻卦形固定调用 `guanyaoHexagramGlyphs` 卦形库，置于 B 面顶部信息栏，与上卦 / 下卦标识同区。
- B 面是信息与复盘面，不是主视觉发布面。

锁定句：

- A 面不得出现卦符。
- B 面才允许固定六爻卦形。

---

## 八、V0.8 入仓 ≠ 收藏级（双线分流）

沿用 `docs/R8_HEXAGRAM_CARD_COLLECTIBLE_VISUAL_STANDARD.md` 的 A/B/C/D 分级，本方案再次锁定：

- **V0.8 / B 级 / `v0.8-usable`**：可入正式资产槽，用于模板验证、A/B 面排版、路径与 build 跑通。001—006 当前即此级。
- **收藏级 / A 级 / `collectible-ready`**：用户主观认可、唯一母题、为 A 面留足叠字安全区、系列统一且骨相独立，方可发布、收藏、分享。

工程线与收藏级线分开推进：

- 工程线：把已确认 V0.8 图导入、跑通模板与 build。
- 收藏级线：另起轮次逐卡重制 / 精修。

锁定句：

- V0.8 图不等于收藏级。
- 入仓不等于收藏级；可用不等于可发布；黑金不等于观爻；好看不等于这一卦。

---

## 九、禁止用 001 作为全局模板

沿用 `docs/R8_HEXAGRAM_CARD_MULTI_REFERENCE_SYSTEM.md` 三层参考体系：

1. **固定模板层**：统一 A/B 面比例、字体层级、排版、金句位置、三标签、LOGO、A 面去卦符、B 面固定六爻卦形——由固定 React 模板控制，不由图片控制。
2. **全局风格层**：统一深黑底、冷金/米金、抽象结构、非实景/非人物/非风景、克制光源——用 2—4 张风格参考，任何一张都不得成为全卡构图模板。
3. **拓扑分流层**：每张卡按骨相分流（上升型 / 裂缝破土型 / 迷雾遮蔽型 / 对峙边界型 / 压顶蓄势型 / 窄径风险型……）。

001｜乾为天｜高空 视觉特征过强（中轴、上升、高位、光源集中、几何基座），只能作为"乾类 / 上升型 / 高位承压型"拓扑参考，**不得**作为 64 张卦码卡全局模板，更不得用于迷雾、承载、对峙、窄径、压顶等卡的主结构。

锁定句：

- 不允许用 001 作为所有卡模板。

---

## 十、不允许一次性大改全项目（小步施工）

沿用 `docs/protocols/workflow.md`：一条指令只做一件事，小步完成、小步验收、小步存档，本地构建产物不进提交，协议任务不混功能代码。

视觉链 2.0 按以下顺序拆成独立 P0 子任务，逐个派生、逐个验收，禁止合并大改：

1. `R8-VISUAL-CHAIN-CANVAS-FRAME-P0`：新增 Canvas 特区覆盖容器组件（不接业务，仅叠加层 + 显隐降级 + pointer-events 穿透策略）。
2. `R8-VISUAL-CHAIN-TRIGGER-BRIDGE-P0`：新增 trigger 桥接器，把 Canvas 交互转调 `CausalRail` / `GyCausalRail` 既有事件。
3. `R8-VISUAL-MOTHERCARD-CANVAS-P0`：母码卡（`MotherCodePage`）Canvas 特区接入，文字字段保持不变。
4. `R8-VISUAL-HEXCARD-A-SIDE-P0`：卦码卡 A 面去卦符 + 主视觉特区接入。
5. `R8-VISUAL-HEXCARD-B-SIDE-P0`：卦码卡 B 面固定六爻卦形复核。
6. `R8-VISUAL-TOPOLOGY-ROUTING-P0`：按拓扑分流接入各卦视觉，校验不套用 001。
7. `R8-VISUAL-CHAIN-QA-P0`：A/B 面、降级、trigger 双触发、build 全链验收。

每个子任务独立提交，独立 build 验收，禁止跨任务夹带改动。

锁定句：

- 不允许一次性大改全项目。

---

## 十一、本轮红线清单（再次确认）

本轮 `R8-VISUAL-CHAIN-REBUILD-PLAN-P0` 只做一件事：新增本方案文档。明确不做：

- 不修改任何 `src` 文件。
- 不修改任何 `public` 图片。
- 不修改任何数据结构。
- 不改业务逻辑。
- 不改路由。
- 不改沙漏、支付、压力种子、六维空间、资产沉积。
- 不动 `.backup`。
- 不动 `src/components/visual/GyVisualChain.tsx`。
- 不动 `src/data/guanyaoPressureSeedSixSpaceProjectionRegistry.ts`。
- 不执行 `git add`。
- 不执行 `git commit`。

---

## 十二、验收口径

本方案文档落地后，对应验收只需确认：

1. 仅新增 `docs/R8_VISUAL_CHAIN_REBUILD_PLAN.md`，无其他文件改动。
2. `npm run build` 通过（本文件为 Markdown，不进入 `tsc -b && vite build` 编译图，不影响构建）。
3. `git status --short` 仅出现该新增文档为未跟踪文件。
4. `git diff --stat` 对已跟踪文件无改动。
5. 未执行 `git add`、未执行 `git commit`。

后续视觉链 2.0 真正施工，从第十节子任务逐条派生执行。
