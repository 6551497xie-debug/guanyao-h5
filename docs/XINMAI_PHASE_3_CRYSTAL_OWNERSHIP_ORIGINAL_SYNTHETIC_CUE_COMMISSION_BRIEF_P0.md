# XINMAI Phase 3 Crystal Ownership Original Synthetic Cue Commission Brief P0

## 0. 委托准备裁决

```text
Knife:
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
ORIGINAL-SYNTHETIC-CUE-COMMISSION-
BRIEF-AND-ACCEPTANCE-PACK-P0

Traffic light:
GREEN / YELLOW PREP

Knife type:
External Commission Brief / Rights and Acceptance Prep

Selected direction:
ORIGINAL NO-SAMPLE SYNTHESIS
MINERAL / ICE-CRYSTAL RESONANCE

Final verdict:
COMMISSION READY

Audio acquisition / generation / purchase in this knife:
0

Runtime / Gate / Asset diff:
0

Push:
HOLD
```

本文件可直接交给作曲人或声音设计师作为询价、权利确认与制作 Brief。它只定义一枚短促、原创、无第三方录音采样的合成 cue，不要求也不允许模拟古琴实录、拼贴磬钵或制作游戏胜利音。

开工前，委托方仍需与创作者签署正式合同或权利转让文件。本 Brief 是产品与交付规范，不替代双方签署的法律协议。

---

## 1. 产品背景

XINMAI 的 Crystal 不是奖励、等级或随机掉落。它只在用户确认一次现实行动、正式事务完成后形成，并作为同一生命伙伴身体上的成长留痕继续存在。

本 cue 的角色是：

> 当用户在已经成立的 Ownership 表面主动触碰自己的 Crystal 时，给出一次短促、克制、可选的材质回应。

它不能制造、确认或升级 Crystal，也不能告诉用户“你成功了”“你更好了”或“你获得奖励”。完整产品意义已经由视觉、文案和无障碍语义表达；声音关闭或不可用时，体验仍然完整。

---

## 2. 唯一 cue 与使用方式

```text
Cue contract:
OWNERSHIP_TOUCH_ACK_P0

Active release cue count:
1

Loop:
NO

Random variations:
NO
```

### 2.1 唯一触发

声音只在以下条件同时成立时被请求：

- 产品已进入稳定 Ownership Presentation；
- Formation 成功已由正式事务完成确认；
- Canonical Receipt、Crystal、Body 与 Imprint 引用一致；
- 用户允许声音；
- 页面在前台可见；
- 用户真实触碰可访问的 Crystal 按钮。

### 2.2 禁止触发

声音不得用于：

- 页面打开、刷新、恢复、Back / Forward；
- Formation 开始、结束或事务完成；
- Return accepted、Eligibility、Body Imprint 出现；
- Continue 或导航；
- hover、focus、scroll、动画完成或 timer；
- 多标签恢复、通知、召回；
- 付费提示、留存、营销；
- Crystal 数量、稀有度、人格、Mother Code 或八卦差异。

恢复态不会自动播放。用户在恢复态再次主动触碰 Crystal 时，可以播放同一枚 cue，不制作“回归专属”声音。

---

## 3. 创作方向

### 3.1 核心材料感

```text
Mineral lattice
Ice-crystal inner resonance
One small point of contact
Stable, restrained, non-celebratory
```

需要感受到一枚微小晶体被触碰后，在内部产生一次短暂共鸣：起音清楚但不尖锐；主体有晶格与矿物质感；尾音很短、自然落下。

“冰晶”指清晰、细密、低饱和的结构感，不是玻璃碎裂、冰块碰杯或高频闪光。“矿物”指稳定物质感，不是低频冲击、金属武器或巨大钟声。

### 3.2 明确排除

- 不模拟、采样或声纹仿真古琴实录；
- 不使用磬、钵、寺院钟、风铃、诵唱或宗教仪式录音；
- 不拼贴“古琴 + 磬钵 + 宇宙氛围”；
- 不做胜利和弦、金币、升级、掉落、解锁或稀有物音效；
- 不做玻璃爆裂、冰裂、硬 click、剑鸣或金属冲击；
- 不做冥想 App 的长 drone、呼吸垫底、432Hz、双耳节拍或疗愈频率模板；
- 不使用上行旋律、三连击、节奏型、arpeggio 或二次击发；
- 不制造依赖重复触碰的成瘾反馈；
- 不根据用户人格、命运或脆弱度改变音色。

### 3.3 创作建议而非强制配方

可探索：

- 一个短促、非整数泛音关系的合成 resonator；
- 非采样物理建模、FM、modal synthesis 或 additive synthesis；
- 轻微温暖的中频主体，避免只剩手机扬声器无法还原的超低频；
- 极短的自然扩散尾音，但不使用长混响或空间移动；
- 单一、确定性 patch，不做随机音高。

---

## 4. 时间、包络与尾音

| 项目 | 硬规格 |
|---|---|
| 完整时长 | `420–600ms`，绝不超过 `600ms` |
| 起始静音 | `≤20ms` |
| attack | `20–90ms` |
| 主体峰值 | 一个，不得二次击发 |
| decay | 连续、稳定，无 pumping |
| 尾部静音 | `20–50ms` |
| loop | `false`，不得写入 loop metadata |
| reverse / swell | 不得形成推焦或期待高潮 |
| runtime reverb dependency | `0` |

尾音必须在资产内部自然结束。不得依赖 Runtime 混响、延迟、卷积或循环补足质感。

---

## 5. 响度与动态

| 项目 | 目标 / 上限 |
|---|---|
| Integrated loudness | `-24 LUFS ±2 LU` |
| True peak | `≤ -6 dBTP` |
| Short-cue RMS | 建议 `-30 至 -22 dBFS`，必须报告 |
| Clip / inter-sample peak | `0` |
| Runtime gain boost | 不允许用增益补救母版 |

若短 cue 无法获得稳定 LUFS，交付报告必须记录测量工具、算法、RMS、true peak 和测量窗口。不能只写“听起来很轻”。

设计目标是在普通手机音量下可辨，但不会在安静夜间或耳机环境中突然惊吓。不得通过 limiter 把弱尾音整体抬高成持续高密度声块。

---

## 6. 频谱与手机扬声器可读性

| 项目 | 硬规格 / 目标 |
|---|---|
| 主要可感能量 | `160Hz–2.4kHz` |
| 手机核心可读信息 | 主要落在 `300Hz–2.4kHz` |
| `≤80Hz` | 相对主体至少衰减 `24dB` |
| `≥6kHz` | 相对主体至少衰减 `18dB` |
| 高频瞬态 | 无硬 click、玻璃碎裂或亮金币感 |
| pitch randomization | `0` |
| stereo dependency | `0` |

资产必须在单声道手机扬声器上仍能被理解为“一次细小材质回应”，不能依赖超低频、宽立体声或长空间尾音。耳机下也不得出现刺耳高频、突兀左右移动或压迫性低频。

---

## 7. 格式与文件预算

### 7.1 必交母版

```text
Processed master:
WAV PCM / 48kHz / 24-bit / mono

Dry master:
WAV PCM / 48kHz / 24-bit / mono

Project source:
DAW session or reproducible synthesis patch / recipe
```

### 7.2 Web 交付候选

```text
Opus:
mono / 48kHz / 48kbps target / WebM container

AAC-LC:
mono / 48kHz / 64kbps target / M4A container
```

| 项目 | 上限 |
|---|---|
| 每个 Web 文件 | `≤32KiB` |
| 两种编码合计 | `≤64KiB` |
| decoded 常驻预算 | `≤1MiB` |
| channel count | `1` |
| embedded artwork / metadata | `0`，除必要技术 metadata |

如果供应方不负责 Web 编码，合同必须明确允许委托方进行转码、响度校准、trim 与 fade，并交付无损母版。

---

## 8. 原创无采样保证

### 8.1 必须书面声明

创作者必须声明：

```text
No third-party recorded samples
No commercial sample-pack recordings
No field recordings
No instrument recordings
No extracted audio from video / streaming / games
No imitation or cloning of a named performer or recording
```

允许使用合法商业合成器、效果器和 DAW，但必须列出所有工具、版本、preset、wavetable、impulse response 与依赖。

### 8.2 Preset / wavetable / IR

- Factory preset 可以作为起点，但必须列明名称、版本和许可；
- 含录音 sample、granular source 或第三方 waveform 的 preset 必须披露；若无法确认来源则拒收；
- 第三方 wavetable 必须列明来源和许可；优先使用创作者自行生成的基础波形；
- 第三方 impulse response 默认禁止；如确需使用，须单独许可和批准；
- 不允许以 preset 名称“ice crystal”“zen bowl”等替代原创设计。

### 8.3 字体与视觉附属物

本委托不需要封面或品牌视觉。若交付 PDF、谱图或说明文件使用第三方字体，须列入清单，但字体不得进入 App Bundle。任何图像、logo 或字体不构成声音资产权利。

---

## 9. AI 与生成工具披露

默认要求：`generativeAiUsed = false`。

如创作者在任何阶段使用生成式 AI，包括生成音频、生成 patch、风格迁移、stem 分离、去噪、母带或声纹参考，必须在开工前书面说明并获得批准，至少披露：

- 服务 / 模型 / 版本；
- 生成日期与账号方案；
- 提示词与上传输入的保管引用；
- 是否上传受版权保护录音；
- 商业使用条款及生效日期快照；
- 提供方训练、保留与 opt-out 说明；
- 是否模仿具体表演者、器物录音或商业作品；
- 人工编辑步骤与相似性审查。

无法披露、条款不能授予商业权、疑似模仿特定录音或使用未知训练来源的结果，直接拒收。AI 使用不得伪装为“原创合成”。

---

## 10. 权利与合同最低要求

优先合同结构：

```text
Work made for hire where legally valid
+ complete assignment of copyright, master and deliverable rights
```

若当地法律不承认完整 work-for-hire，则至少授予：

```text
exclusive
worldwide
perpetual
irrevocable
fully paid-up
royalty-free
transferable
sublicensable for hosting / distribution vendors
commercial license
```

权利必须覆盖：

- Web、PWA、iOS、Android、桌面容器；
- App Store、CDN、云托管、缓存、备份与版本归档；
- 应用内播放、复制、分发与技术公开传输；
- trim、fade、响度、EQ、修复、转码、压缩和兼容性版本；
- 与产品 UI 同步；
- 缺陷修正、替换与撤回；
- 将必要权限再许可给托管、分发与平台供应商。

### 10.1 必须覆盖的权利主体

- 创作 / 作曲权；
- 声音设计与 patch；
- 母带与工程文件；
- 任何表演者、录音师、制作人或协作者；
- preset、wavetable、IR、插件与工具许可；
- AI / 生成服务条款；
- 第三方场所、隐私或录音同意（若适用）。

### 10.2 人格权与署名

- 在法律允许范围内，创作者同意为必要编辑不主张阻止性人格权；
- 署名要求必须在合同和 manifest 中明确；
- 若必须署名，须提供精确文本和位置；
- 未经创作者同意，产品不将其姓名用于命运、人格或医疗暗示；
- 创作者如需作品集展示，必须在公开发布后并经委托方书面批准。

### 10.3 宣传用途

本委托默认仅覆盖产品内使用。广告、预告片、社交媒体、线下活动如需使用，必须在合同中明确；不能从产品内许可自动推断。

---

## 11. 委托交付物

### 11.1 候选阶段

最多交付三版盲听候选：

```text
A / B / C
Maximum total variants: 3
```

候选只使用中性编号，不使用“冰”“禅”“高级”“稀有”等引导名称。每版必须使用同一响度目标与文件格式，避免靠音量赢得盲听。

### 11.2 最终阶段

选中版本必须交付：

1. processed 48kHz / 24-bit mono WAV；
2. dry 48kHz / 24-bit mono WAV；
3. 可复现的 DAW session 或 synthesis patch / recipe；
4. Opus 与 AAC-LC Web 候选；
5. 所有文件 SHA-256 清单；
6. LUFS、RMS、true peak、时长、频谱与文件大小报告；
7. 工具、插件、preset、wavetable、IR、字体与第三方依赖清单；
8. 原创无录音采样声明；
9. AI / 生成工具声明；
10. 作者、协作者与权利声明；
11. 合同、许可、发票 / 付款或委托凭证；
12. 完成的 provenance manifest 实例；
13. 替换、撤回与联络信息。

未入选候选不得被产品使用；其保管、删除与作品集权利须在合同中明确。

---

## 12. 盲听与设备验收

### 12.1 盲听方法

- 使用 A / B / C 随机编号；
- 3–5 名内部评审分别独立听审后再讨论；
- 所有候选响度匹配；
- 首轮不展示技术、创作者或方向说明；
- 先回答开放问题：“它像什么发生了？”；
- 再判断是否被理解为奖励、胜利、玻璃破碎、禅修或通知音；
- 不以“大家都喜欢”替代产品语义。

### 12.2 必测设备与环境

- 一台真实 Android 手机内置扬声器；
- 一台真实 iPhone / Safari 目标环境（若 1.0 支持）；
- 普通笔记本扬声器；
- 普通有线或蓝牙耳机；
- 安静夜间 / 低环境噪声；
- 日常室内背景噪声；
- 设备约 20%、50%、80% 音量，以同一测试流程比较；
- 系统静音与产品声音关闭时必须为 0 输出。

### 12.3 通过语义

未经解释的评审者应更接近：

> 一枚很小的晶体被触碰后，在内部轻轻回应了一次。

而不是：

- “升级了”；
- “领到奖励”；
- “玻璃碎了”；
- “收到系统通知”；
- “开始冥想”；
- “寺院钟响了”；
- “像某种古琴录音”。

完整评分见独立 Scorecard。

---

## 13. 避免惊吓与成瘾反馈

- true peak 必须低于上限；
- 不用突然 hard transient；
- 不用第二击、随机变体或可预测奖励序列；
- 不因多次点击改变音高、和声或稀有度；
- 不显示 streak、连击、收集数或音乐彩蛋；
- 不在后台、恢复或通知中播放；
- 不通过渐进音阶引导用户重复点击；
- cue 失败、静音或无声时不提示“错过体验”；
- 不记录点击频率用于召回、商业或人格判断。

---

## 14. 拒收标准

任一成立即拒收，不进入 Runtime：

- 使用、提取或无法排除第三方录音 sample；
- 古琴、磬钵或具体表演录音的仿真 / 声纹克隆；
- 未披露 AI、preset、wavetable、IR 或第三方工具；
- 权利链、全球商业权、修改权或平台权不完整；
- 署名 / 版税 / 使用量限制不可履行；
- 超过 600ms、存在 loop、二次击发或随机变体；
- true peak、响度、体积或格式超标；
- 手机上不可读，只剩超低频或超高频；
- 耳机下刺耳、惊吓或空间扫动；
- 被盲听者稳定理解为胜利、金币、升级、通知、碎玻璃或冥想模板；
- 文化或宗教拼贴；
- 文件 hash、manifest、工程源或测量报告缺失；
- 供应方拒绝替换 / 撤回条款。

分数再高也不能覆盖拒收项。

---

## 15. 替换与撤回

### 15.1 正常替换

- 每次 binary 改动产生新版本与新 SHA-256；
- 不覆盖已有 hashed 文件；
- 新版本重新完成盲听、设备、权利与技术验收；
- 旧版本保留审计记录但不继续打包；
- 替换不改变 Crystal、Receipt、Imprint 或用户历史。

### 15.2 紧急撤回

权利争议、文化伤害、AI / sample 未披露、hash 异常或惊吓性缺陷触发：

1. Sensory policy 切到 `SAFE_WITHHELD`；
2. 停止新播放与下载；
3. manifest 标记 `WITHDRAWN`；
4. 从后续 Bundle / CDN 移除精确 hash；
5. 保留合同、作者、hash 与审计记录；
6. 新版本从头验收；
7. 不恢复旧 oscillator、随机 tick 或页面级声音。

---

## 16. 委托开始前 Checkpoint

供应方报价或开工前必须书面回答：

```text
1. 是否接受原创无第三方录音采样？
2. 是否接受最多 A/B/C 三版、最终只选一版？
3. 是否交付工程源、dry/processed master、Web encodes 与 SHA-256？
4. 是否完整披露合成器、preset、wavetable、IR、插件、字体与 AI？
5. 是否接受全球、永久、商业、多平台、可修改与必要再许可？
6. 是否接受 work-for-hire / 完整权利转让或等价独占许可？
7. 是否接受未授权或争议时立即撤回、替换和静音？
8. 是否接受产品不宣传创作者与命运、人格或疗愈功效关联？
```

任一关键回答为否，停止委托，不降低合同范围换取资产。

---

## 17. 当前唯一外部动作

```text
将本 Brief、Acceptance Scorecard 与 Manifest Instance Placeholder
发送给一位候选声音设计师；
在报价或开工前，要求其书面确认第 16 节八项条件。
```

除这一步外，当前不需要购买素材库、生成音频、下载参考、修改 Runtime 或联系多位供应商制造竞价循环。

---

## 18. 阶段状态

```text
Commission Brief:
READY

Acceptance Scorecard:
READY

Manifest Instance:
PLACEHOLDER / NOT APPROVED

Commission execution:
USER EXTERNAL ACTION REQUIRED

Shippable audio asset:
0

C3 Runtime:
DEFER

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED

Push:
HOLD
```

本 Brief 关闭了委托口径，但没有产生资产。只有签署权利条件、收到候选、完成盲听与设备验收、补全 manifest 并取得批准后，才可申请 Single-Owner Runtime。
