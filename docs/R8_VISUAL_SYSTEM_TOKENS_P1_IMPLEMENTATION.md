# R8-VISUAL-SYSTEM-TOKENS-P1 实施记录

> 状态：P1 完成  
> 日期：2026-06-17  
> 执行：Claude（视觉神经层）  
> 验收：ChatGPT（规则与验收）

---

## 一、本刀新增文件清单

| 文件 | 类型 | 说明 |
|------|------|------|
| `src/styles/guanyaoVisualTokens.css` | CSS 变量 | 观爻 2.0 基础视觉 token，`:root` 下定义，`.gy-` 前缀 |
| `src/components/visual-system/GyVisualStageV2.tsx` | 组件壳 | Canvas 黑场舞台容器，纯视觉 |
| `src/components/visual-system/GyAxisLineV2.tsx` | 组件壳 | 1px 一字线生命线，按 props 表现物理状态 |
| `src/components/visual-system/GySignalDotV2.tsx` | 组件壳 | 信号点（滑块头 / 刻度点 / 爆点），非按钮 |
| `src/components/visual-system/GyCardShellV2.tsx` | 组件壳 | 卡片双面翻转壳，不内置卦符/数据 |
| `src/components/visual-system/GyCausalRailV2.tsx` | 组件壳 | 因果轨道视觉壳，不接主链路 |
| `src/components/visual-system/index.ts` | 导出入口 | barrel export，统一对外接口 |
| `docs/R8_VISUAL_SYSTEM_TOKENS_P1_IMPLEMENTATION.md` | 文档 | 本文件，P1 实施记录 |

---

## 二、各组件职责说明

### GyVisualStageV2
- 提供绝对定位 `<div>` 容器，`active=true` 时挂载一个 DPR 校正过的 `<canvas>`
- `onReady(ctx, size)` 回调只在首次就绪时触发，`onResize` 在每次尺寸变化后触发
- 默认 `pointerThrough=true`，canvas 层 `pointer-events: none`，不遮挡下层 DOM

### GyAxisLineV2
- 渲染横贯约 84% 宽、高度严格 1px 的生命线
- state 控制外观：`idle` 冷灰 / `active` 冷蓝 / `tense` 蓄能微移 / `break` 断裂 / `rebound` 复归
- progress (0–1) 控制冷蓝进度填充宽度
- `onStateVisualEnd` 是纯视觉动画结束回调，不接业务

### GySignalDotV2
- variant: `slider`（菱形滑块头）/ `tick`（刻度点）/ `burst`（极光爆点）
- 不使用 `<input type="checkbox/radio">`，只是视觉 `<span>`
- glow 态由 CSS box-shadow token 驱动

### GyCardShellV2
- 双面容器，`face="A"` 正面 / `face="B"` 背面，通过 CSS 3D 翻转切换
- front / back 节点由调用方传入，本壳不渲染任何卦符
- A 面禁卦符、B 面允许固定六爻卦形的约束由调用方内容节点遵守

### GyCausalRailV2
- mode: `advance`（右滑推进，冷蓝）/ `break`（左滑崩断，冷金）
- pointer 手势进度反馈给 `onProgress(0–1)`，达阈值后回调 `onTrigger`
- `onTrigger` 由调用方桥接到旧 DOM 事件，本壳不直接调用任何旧事件

---

## 三、纯视觉哑壳确认

所有 V2 组件均满足：

- 不读取任何业务数据（无 useSelector / useContext 业务 hook / LocalStorage）
- 不写入 LocalStorage
- 不触发路由跳转
- 不触发旧 DOM 事件（GyCausalRailV2 的 onTrigger 由调用方桥接）
- 不读卦码数据、母码数据、压力种子、六维空间、沙漏、支付逻辑
- 不修改任何现有组件

---

## 四、未接主链路

- `src/App.tsx` 未修改，无新路由
- `src/pages/*` 未修改，无任何页面引入 V2 组件
- V2 组件可独立存在，不影响现有任何页面的功能

---

## 五、未触碰业务逻辑

- `src/data/*` 零修改
- `src/services/*` 零修改
- `src/components/hexagram-card/*` 零修改
- `src/components/visual/GyVisualChain.tsx` 零修改（受保护文件）
- `src/data/guanyaoPressureSeedSixSpaceProjectionRegistry.ts` 零修改（受保护文件）
- `public/*` 零修改
- `package.json` 零修改
- `vite.config.ts` 零修改

---

## 六、后续接入计划

### P2（下一刀）：MotherCodeCardLab 接入
- 仅限实验室页面
- 用 GyCardShellV2 构建母码卡视觉样本
- 不修改正式母码数据结构
- 不接入主链路

### P3：HexagramCardLab 接入
- 用 GyCardShellV2 + GyAxisLineV2 构建卦码卡视觉样本
- A 面不得出现卦符
- B 面放置固定六爻卦形
- V0.8 图资产标注为原型级，不用于正式发布

### P4：逐页接入主链路
- 由 ChatGPT 制定验收规格
- 每页独立评审，通过后方可接入
- Codex 地基全程不动

---

## 七、token 文件规范

`src/styles/guanyaoVisualTokens.css` 包含以下类别：

- 黑场变量（`--gy-void` / `--gy-field` / `--gy-field-soft`）
- 线条色（`--gy-line-base` / `--gy-line-dim` / `--gy-active` / `--gy-break`）
- 文本色（`--gy-text-strong` / `--gy-text` / `--gy-text-dim`）
- 线宽（`--gy-hairline: 1px` 严格不变）
- 一字线几何（宽度 84% / 最小热区 46px）
- 字体层级（display / title / body / label / micro）
- 间距（xs / sm / md / lg）
- 阻尼时长（`--gy-dur-fast` / `--gy-dur-rail` / `--gy-dur-break`）
- 缓动曲线（damp / ignite）
- 信号点（尺寸 / glow）
- 卡片壳（aspect ratio / edge hairline）
- z-index 层（canvas / rail / card / overlay）

---

## 八、验收自查

| 验收项 | 结果 |
|--------|------|
| 新增 `guanyaoVisualTokens.css` | ✓ |
| 新增 `visual-system/` 目录 | ✓ |
| 新增 5 个 V2 组件 | ✓ |
| 新增 `index.ts` 导出 | ✓ |
| 新增 P1 implementation 文档 | ✓ |
| 不修改任何现有页面 | ✓ |
| 不修改任何业务文件 | ✓ |
| 不修改任何图片资产 | ✓ |
| 不修改任何数据结构 | ✓ |
| 不触碰禁止文件 | ✓ |
| 未执行 git add | ✓ |
| 未执行 git commit | ✓ |
