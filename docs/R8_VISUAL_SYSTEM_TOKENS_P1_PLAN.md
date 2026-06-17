# R8｜观爻视觉系统基础变量与组件壳施工清单（P1 PLAN）

任务编号：`R8-VISUAL-SYSTEM-TOKENS-P1-PLAN`

承接：`R8-VISUAL-DIRECTION-V2-P0` 已提交。观爻 2.0 总体视觉方向已锁定（一屏锁定、1px 一字线即宇宙、Canvas 只接表现层、Codex 地基不动、Claude 只接视觉神经、ChatGPT 负责规则与验收）。

本轮性质：**只写施工清单文档，不改代码。** 本文件用于规定 P1（`R8-VISUAL-SYSTEM-TOKENS-P1`）真正动手时准备新增哪些文件、每个文件的职责与红线，以及后续如何逐步接入页面。

---

## 一、本轮红线（PLAN 阶段）

允许新增：

- `docs/R8_VISUAL_SYSTEM_TOKENS_P1_PLAN.md`（即本文件）

禁止修改：`src/`、`public/`、`package.json`、vite 配置、路由、页面、组件、数据结构、图片资产、LocalStorage、压力种子、六维空间、沙漏/支付、资产沉积、`.backup/`、`src/components/visual/GyVisualChain.tsx`、`src/data/guanyaoPressureSeedSixSpaceProjectionRegistry.ts`、`tmp/`。

不执行 `git add`，不执行 `git commit`。

---

## 二、P1 总边界（写死，后续施工不得越界）

P1（`R8-VISUAL-SYSTEM-TOKENS-P1`）只能建立**视觉 tokens 与组件壳**，且全部为"哑壳"（dumb shell）：只接 props、只渲染、不读业务数据、不写状态、不跳路由。

P1 明确不得：

1. 不得接入主链路页面。
2. 不得替换任何现有页面。
3. 不得重构 `MotherCodePage` / `GravityPage` / `ChoicePage`（及其它任何 `src/pages/*`）。
4. 不得修改卦码卡正式数据（`guanyaoHexagramCardTemplateData.ts` 等内容链文件）。
5. 不得动 LocalStorage 和业务状态机。
6. 不得改路由（`App.tsx`、`guanyaoRoutes.ts`）。
7. 不得动既有 `src/components/visual/GyVisualChain.tsx`（受保护原语库，仅可被引用、不可改）。

P1 产物全部落在**新目录** `src/components/visual-system/` 与新样式文件，与既有 `src/components/visual/` 物理隔离，互不覆盖。

---

## 三、命名冲突预警（必须先解决，否则 P1 不得开工）

既有受保护文件 `src/components/visual/GyVisualChain.tsx` 已导出同名组件：`GyCausalRail`、`GyStage`、`GyLogoMark`、`GyInstrumentBox`、`GyGlassSeed`、`GyAssetCard`。

本清单计划新增的 `src/components/visual-system/GyCausalRail.tsx` 与之**重名**。锁定处理规则：

- 两者位于不同目录、不同模块路径，技术上不冲突，但语义上必须区分。
- P1 新组件统一采用 `visual-system/` 路径导入，调用方必须显式从 `../components/visual-system/...` 引入，禁止与 `../components/visual/GyVisualChain` 的导出混用。
- 如需进一步消歧，建议 P1 新组件加 `V2` 命名后缀（如 `GyCausalRailV2`），由 P1 开工任务确认后锁定。本 PLAN 暂以原清单文件名记录，命名最终以 P1 开工首条确认为准。
- 既有 `GyVisualChain.tsx` 的 `GyCausalRail` 不动、不删、不改。

---

## 四、P1 计划新增文件清单

P1 计划新增以下 6 个文件。每个文件均为视觉壳，逐条说明职责、红线、props、是否读业务、是否触发旧事件、是否纯壳、接入路径。

### 4.1 `src/styles/guanyaoVisualTokens.css`

1. **职责**：观爻 2.0 视觉 tokens 唯一来源。以 CSS 变量定义黑场、颜色、字体层级、间距、线宽、阻尼时长等。包括：黑场 `--gy-void: #000000`；骨灰白/冷灰白基础线色；激活冷蓝 `--gy-active: #00B8D4`；破局冷金 `--gy-break: #C7A96B`；1px 线宽 `--gy-hairline: 1px`；字间距 `--gy-tracking`；过渡阻尼曲线变量等。
2. **不允许触碰的业务范围**：不含任何业务值、不含卦码/母码/压力种子常量、不写组件逻辑。仅样式变量。
3. **输入 props**：无（纯 CSS）。
4. **是否读取业务数据**：否。
5. **是否触发旧 DOM / 旧事件**：否。
6. **是否只是视觉壳**：是（样式基座）。
7. **后续如何接入**：在 P1 末由组件壳引用；接入主页面延后到 P2 之后，且只做"叠加变量"，不改既有页面内联样式。

### 4.2 `src/components/visual-system/GyCanvasStage.tsx`

1. **职责**：Canvas 基础舞台壳。提供一块绝对定位、覆盖在旧 DOM 之上的 `<canvas>` 容器，处理 DPR 缩放、resize、显隐降级、`pointer-events` 穿透策略。对应方向总纲第十节的 `<GyUniverseCanvas />` 设想的基础承载层。
2. **不允许触碰的业务范围**：不读卦码/母码/压力/沙漏/支付，不写 LocalStorage，不调路由，不实现任何具体动画业务（动画业务延后）。仅提供舞台与生命周期。
3. **输入 props**：`active?: boolean`（是否启用 canvas，关闭时整层不渲染）、`onReady?(ctx)`、`onResize?(size)`、`pointerThrough?: boolean`（非热区是否穿透到下层 DOM）、`className?`、`style?`、`children?`（叠加层）。
4. **是否读取业务数据**：否。
5. **是否触发旧 DOM / 旧事件**：否（本壳只暴露 ready/resize 回调，trigger 桥接是后续独立任务，不在 P1）。
6. **是否只是视觉壳**：是。
7. **后续如何接入**：P1 仅在 `/hexagram-card-lab` 或独立预览路由的隔离环境里挂载验证，不进主心流页面。接入主链路在后续 `R8-VISUAL-CHAIN-CANVAS-FRAME` 系列任务，且默认 `active=false`，灰度开启。

### 4.3 `src/components/visual-system/GyAxisLine.tsx`

1. **职责**：1px 一字线组件壳。渲染横贯约 84% 宽、厚 1px 的生命线，支持状态着色（基础/激活/破局）与基础物理态展示（静止/拉伸/紧绷/崩断的视觉态切换），状态由 props 驱动。
2. **不允许触碰的业务范围**：不决定何时该激活/崩断（那是业务），不读压力/卦码，不写状态机。仅按传入的 `state` 渲染对应视觉。
3. **输入 props**：`state: "idle" | "active" | "tense" | "break" | "rebound"`、`progress?: number`（0–1，拉伸/蓄能进度）、`tone?: "base" | "active" | "break"`、`widthPct?: number`（默认 84）、`onStateVisualEnd?()`（纯视觉动画结束回调）。
4. **是否读取业务数据**：否。
5. **是否触发旧 DOM / 旧事件**：否。
6. **是否只是视觉壳**：是。
7. **后续如何接入**：P1 在隔离预览中验证各状态视觉。接入页面时由上层把"业务事件"映射成 `state`，而非本组件自行判断。

### 4.4 `src/components/visual-system/GyCausalRail.tsx`（见第三节命名冲突预警）

1. **职责**：视觉轨道组件壳。表现"右滑推进 / 左滑崩断"的物理轨道外观与手势进度反馈，是方向总纲右滑点火、左滑崩断状态机的**视觉外壳**。
2. **不允许触碰的业务范围**：不直接 `navigate`、不写 LocalStorage、不读业务真值；不复制一套交互真值。真正的推进/破局仍由旧事件链负责。
3. **输入 props**：`mode: "advance" | "break"`、`disabled?`、`onProgress?(p)`、`onTrigger?()`（达到阈值后回调，**由调用方桥接到旧事件**，如 `CausalRail.onRight` / `GyVisualChain` 的 `GyCausalRail.onComplete`）、`statusLabel?`、`hint?`。
4. **是否读取业务数据**：否。
5. **是否触发旧 DOM / 旧事件**：**间接是**——本壳只暴露 `onTrigger`，由上层把它接到既有 `src/components/causal/CausalRail.tsx`（`onLeft`/`onRight`）或 `GyVisualChain.tsx` 的 `GyCausalRail`（`onComplete`）。本壳自身不直接调用旧事件，符合"Canvas/视觉壳 通过 trigger 调用旧事件"的方向。
6. **是否只是视觉壳**：是（交互真值仍在旧组件）。
7. **后续如何接入**：先在隔离预览验证手势与阈值视觉；接入页面时仅作为既有 `CausalRail` 的可选视觉皮肤，旧 `CausalRail` 与旧 DOM 完整保留作为降级基线。

### 4.5 `src/components/visual-system/GySignalDot.tsx`

1. **职责**：信号点组件壳。渲染线端冷蓝滑块、刻度档位点、极光爆点等"点"状视觉单元。强调"圆点不是按钮"。
2. **不允许触碰的业务范围**：不承载点击业务跳转，不读业务数据，不写状态。点的"含义"由上层决定，本壳只渲染点的形态与高亮态。
3. **输入 props**：`variant: "slider" | "tick" | "burst"`、`tone?: "base" | "active" | "break"`、`active?: boolean`、`size?: number`、`glow?: boolean`、`onVisualPulseEnd?()`。
4. **是否读取业务数据**：否。
5. **是否触发旧 DOM / 旧事件**：否（如需触发，由包裹它的轨道/页面层处理）。
6. **是否只是视觉壳**：是。
7. **后续如何接入**：作为 `GyAxisLine` / `GyCausalRail` 的子视觉单元组合使用，不单独绑定业务。

### 4.6 `src/components/visual-system/GyCardShell.tsx`

1. **职责**：卡片壳组件。提供单卡双面（A/B 翻面）的视觉容器与翻面动效骨架，供母码卡与卦码卡复用结构，但**不内置任一类卡的具体内容/数据/卦符规则**。
2. **不允许触碰的业务范围**：不读卦码卡正式数据（`guanyaoHexagramCardTemplateData.ts`），不读母码资产数据，不改既有 `src/components/hexagram-card/*`。仅提供翻面与边缘 1px 微线（非表格）等通用外壳。
3. **输入 props**：`face: "A" | "B"`、`onFlip?()`、`front: ReactNode`、`back: ReactNode`、`aspect?: string`（默认 `3 / 4`）、`tone?`、`edgeHairline?: boolean`。具体 A 面禁卦符、B 面固定六爻卦形等约束由**内容方（front/back 传入节点）**遵守，本壳不替内容做卦符渲染。
4. **是否读取业务数据**：否。
5. **是否触发旧 DOM / 旧事件**：否。
6. **是否只是视觉壳**：是。
7. **后续如何接入**：先在隔离预览以假数据验证翻面与比例；接入卦码卡/母码卡延后到独立任务，且以"包裹既有卡内容"方式渐进替换，不一次性重写 `hexagram-card/`。

---

## 五、P1 接入策略（逐步、不进主链路）

1. P1 仅在**隔离环境**验证以上壳：复用既有 `/hexagram-card-lab` 这类非主心流路由，或新增一个仅用于预览的 lab 视图（该新增预览不替换、不改动任何现有页面与路由定义——若需要路由，留到 P1 之后单独评审）。
2. 所有壳默认对主链路**零影响**：`GyCanvasStage` 默认 `active=false`；视觉壳不被任何现有页面引用。
3. 业务接入顺序（P1 之后，逐刀独立）：tokens → canvas frame → trigger 桥接 → 母码卡壳包裹 → 卦码卡 A 面 → 卦码卡 B 面 → 拓扑分流 → QA。每刀独立提交、独立验收。
4. 任何接入都遵守：旧 DOM 保留、旧事件保留、旧状态保留；Canvas/壳只覆盖表现层并通过 trigger 调用旧事件；不可用时静默降级回旧 DOM。

---

## 六、P1 验收口径

P1 真正开工完成后，验收只需确认：

1. 仅新增 `src/styles/guanyaoVisualTokens.css` 与 `src/components/visual-system/` 下 5 个组件壳，无主页面/路由/数据/图片改动。
2. 新增组件均为纯视觉壳：不读业务数据、不写 LocalStorage、不调路由、不复制交互真值。
3. 未引用、未改动任何 `src/pages/*` 与 `src/components/visual/GyVisualChain.tsx`。
4. `npm run build` 通过（仅新增隔离组件与样式，不进主链路编译依赖）。
5. `git status --short` 仅出现上述新增文件。
6. `git diff --stat` 对既有已跟踪文件无改动。
7. 未执行 `git add`、未执行 `git commit`。

---

## 七、最终锁定

P1 只建变量与壳，不接主链路。Codex 地基不动。Claude 只接视觉神经。旧 DOM 与旧事件全保留，视觉壳通过 trigger 复用旧事件。母码卡与卦码卡分别重构、互不共模板。A 面不得出现卦符，B 面才允许固定六爻卦形。V0.8 不等于收藏级。不得用 001 作为全卡模板。不一次性大改全项目。
