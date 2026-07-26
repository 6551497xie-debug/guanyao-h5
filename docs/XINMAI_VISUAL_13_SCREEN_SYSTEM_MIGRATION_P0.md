# XINMAI Visual 13-Screen System Migration P0

## 文档状态

- 项目：XINMAI / 星脉之境
- 模式：13 屏视觉系统第一轮迁移
- 性质：全局统一，不是最终精修
- 生命来源修改：无
- Runtime / Engine / Protocol 修改：无
- 新身份、新星河、新星兽：无

本记录说明当前 GUANYAO Runtime 如何在不重建生命系统的前提下，迁移到 `XINMAI Visual Life System Constitution P0`。

---

## 一、本轮迁移目标

本轮不以“做完十三张页面”为目标。

十三屏在当前工程中是十三个逻辑生命阶段，主要由五个生产表面承载：

```text
LaunchLab
承载 Screen 0–2

GenesisProductionExperiencePage
承载 Screen 3–6

RealityProductionHost
承载 Screen 7

GravityPage
承载 Screen 8–11

PersonalityRingPage
承载 Screen 12
```

本轮完成：

1. 建立 XINMAI 统一语义 Token；
2. 建立正式 Screen 0 入口阈值；
3. 保持五个生产表面的同一空间、核心、身体和 Crystal；
4. 移除首轮最明显的工具、仪器、报告、奖励视觉倾向；
5. 让路由表面明确标记其生命阶段，而不新增十三条路由；
6. 校准 active fallback，避免加载阶段出现旋转星盘；
7. 将用户可见品牌从 GUANYAO 产品名迁移为 XINMAI，GUANYAO 继续作为底层 Life Engine。

---

## 二、统一视觉 Token

新增：

`src/styles/xinmai-visual-life-system.css`

### 空间

- 黑曜深空：`#020306`
- 深水暗部：`#02040A`
- 低亮紫灰尘遮：`#493A57` / `#2F253A`

### 生命

- 核心象牙白：`#FFF7E4`
- 生命暖晕：`#E8C88A`
- 主关系文字：`#EEE2C6`

### 天地与记忆

- 星河冷银蓝：`#B9CBEC`
- Crystal 沉积：`#FFEFBF`

### 字体

- 生命关系：宋体 / 东方衬线序列
- 操作界面：系统无衬线
- 坐标：仅低权重等宽字体

### 动态

- 核心：3 秒身份呼吸
- 力量：约 6.4 秒生命节律
- 空间：12 秒以上慢变化
- 记忆：约 10.8 秒低幅呼吸

旧 GUANYAO Token 通过语义变量映射到 XINMAI 色彩，但旧的仪器、冷青激活和旋转轨道语言不进入新系统。

---

## 三、13 屏迁移状态

| Screen | 生命关系 | 当前消费者 | 本轮迁移 | 状态 |
| --- | --- | --- | --- | --- |
| 0 | 现实 → 星脉之境 | `XinmaiEntryThreshold` | 新增纯黑、间、微光、七点星脉阈值；可轻触越过，不显示加载 | 已建立 |
| 1 | 迷失 → 进入动机 | `LaunchLab` ENTRY | 统一 XINMAI 品牌、东方生命字体、黑曜空间 | 已迁移基础 |
| 2 | 时间 → 生命钥匙 | `LaunchLab` 时间输入 | 保留同一星河与核心；Token 统一，不新增表单壳 | 已迁移基础 |
| 3 | 时间 → 28 宿位置 | Genesis `SYMBOL_REVEAL` | 继承真实 Projection；统一文字、空间和 fallback | 已迁移基础 |
| 4 | 位置 → 四象方向 | Genesis direction field | 保留方向场，不增加属性色块与四象卡 | 已迁移基础 |
| 5 | 力量 → 星兽存在 | Genesis presence | 继承同一核心、内部结构和星沙身体 | 已迁移基础 |
| 6 | 看见 → 认出关系 | Genesis completion | 统一关系文案与动作，保留一次回应和同行入口 | 已迁移基础 |
| 7 | 认出 → Reality 同行 | `RealityProductionHost` | 统一同一空间优先级，弱化候选卡、报告与按钮壳 | 已迁移基础 |
| 8 | 压力 → Gravity 惯性 | `GravityPage` | 统一紫灰保护状态、关闭工具式流程标签、保留同一身体 | 已迁移基础 |
| 9 | 模式 → AI 照见 | Gravity 保护理解链 | 将已有“看见事实—理解保护—出现松动”作为第一轮嵌入式照见，不新增聊天层 | 已迁移语义基础 |
| 10 | 旧反应 → Choice 间隙 | Gravity Choice | 去卡片、去任务按钮感，保持停顿和微小回应 | 已迁移基础 |
| 11 | 新回应 → Crystal | Gravity Crystal | 统一身体沉积色与克制动作，不新增奖励动画 | 已迁移基础 |
| 12 | 经历 → Life Archive | `PersonalityRingPage` | 统一生命字体、时间记忆色和同一身体纹理 | 已迁移基础 |

---

## 四、Screen 0 迁移

新增：

`src/components/XinmaiEntryThreshold.tsx`

它只负责：

```text
现实界面节律
↓
短暂停顿
↓
星脉微光出现
↓
进入已有 Launch 星河
```

它不负责：

- 加载进度；
- 身份恢复；
- 星宿计算；
- 新宇宙创建；
- Engine 调用；
- 登录提示；
- 产品说明。

七个微光点只承担“星脉出现”的品牌阈值，不代表七星经络状态，不读取用户生命数据。

---

## 五、生产表面映射

`AppShell` 为生产表面增加：

| Surface | Screen Range | 责任 |
| --- | --- | --- |
| ENTRY | 0–2 | 进入、动机、生命钥匙 |
| GENESIS | 3–6 | 坐标、方向、显化、认出 |
| REALITY | 7 | 共同面对现实 |
| REFLECTION | 8–11 | Gravity、照见、Choice、Crystal |
| ARCHIVE | 12 | 生命历史 |

统一 Journey：

```text
ENTER
↓
FIND
↓
RECOGNIZE
↓
ACCOMPANY
↓
UNDERSTAND
↓
RESPOND
↓
SEDIMENT
↓
BECOME
```

这组标记只用于视觉治理与验收，不创建新的业务状态。

---

## 六、继承资产

本轮直接继承：

- `LIFE_UNIVERSE_STAR_FIELD`
- `LIFE_UNIVERSE_CORE_IDENTITY`
- `genesisWebGLRendererCore`
- Genesis Projection / Visual Continuity
- `RealityLifeUniverseCanvas`
- Gravity 既有状态
- `resolveLifeUniverseCrystalSourceSlot`
- `resolveLifeUniverseCrystalImprintGeometry`
- `PersonalityRingPage`

本轮没有：

- 新建星河；
- 新建星兽；
- 新建身份；
- 新建 Reality；
- 新建 Gravity；
- 新建 Crystal；
- 新建 Archive。

---

## 七、fallback 校准

`App.tsx` 中的 `LifeUniverseRouteFallback` 继续保留：

- 同一 2D 深空；
- 同一生命核心；
- 28 宿关系；
- 出生宿可见性；
- 无障碍与加载恢复能力。

本轮取消二十八宿自动旋转。

原因：

> 时间由同一星河和核心呼吸承担，不由旋转星盘承担。

fallback 仍不是正式主视觉，但不能在路由加载时破坏生命世界语义。

---

## 八、品牌迁移

用户可见入口品牌调整为：

```text
星脉之境 · XINMAI
```

GUANYAO 不被删除。

它继续作为：

```text
XINMAI Brand
↓
GUANYAO Life Engine
↓
Existing Runtime
```

本轮不迁移：

- 文件名；
- 类型名；
- 路由名；
- Engine 名；
- Protocol 名。

---

## 九、本轮仍不实施的缺口

以下内容进入逐屏精修，不在本轮扩张：

1. 七星经络真实 Runtime 来源；
2. 独立 AI Reflection 业务消费者；
3. WebGL 内部材质的全面 Token 化；
4. Gravity 多逻辑阶段的组件拆分；
5. 历史 SVG 纹理完全进入 Renderer；
6. 四象辅助玉色的逐象精修；
7. 声音系统；
8. 正式品牌图形资产接入。

原则：

> 缺少真实来源时先记录，不用视觉伪造。

---

## 十、第一轮验收

### 视觉验收

遮住文字后，用户应依次感受到：

```text
进入
↓
找到
↓
认出
↓
同行
↓
理解
↓
回应
↓
沉积
↓
成为
```

### 连续性验收

必须保持：

- 同一星河；
- 同一生命核心；
- 同一星兽身体；
- 同一出生宿来源；
- Pressure 只改变状态；
- Choice 只改变回应；
- Crystal 只增加身体纹理；
- Archive 只增加时间深度。

### 禁止回归

- 工具感；
- 数据面板；
- 测试结果；
- 仪器读数；
- 玄学知识展示；
- 宠物领取；
- 奖励庆祝；
- 历史仓库。

---

## 十一、下一阶段

完成本轮迁移后进入逐屏精修。

建议顺序：

1. Screen 0–2：入口与生命钥匙；
2. Screen 3–6：Genesis 坐标到关系；
3. Screen 7–9：Reality 到 AI 照见；
4. Screen 10–12：Choice、Crystal、Archive；
5. 全路径声音、相机与 reduced motion 验收。

逐屏精修不得重新创造本轮已经统一的视觉世界。
