# XINMAI Phase 3 Crystal Ownership Sensory Audio Asset Provenance and Copyright Pack P0

## 0. Pack 裁决

```text
Knife:
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-AUDIO-ASSET-PROVENANCE-
AND-COPYRIGHT-PACK-P0

Traffic light:
YELLOW

Knife type:
Asset / Rights / Cultural Review Prep

Decision:
PREP ONLY

Final verdict:
ASSET ACQUISITION READY

Audio acquisition / generation / purchase in this knife:
0

Runtime / Gate / Asset diff:
0

User procurement or commission decision:
REQUIRED BEFORE ACQUISITION

Push:
HOLD
```

本 Pack 已冻结 P0 最小声音集合、产品触发、声学规格、可接受来源、全球商业许可、provenance manifest、验收、替换与撤回流程。它只使采购 / 委托工作可被安全启动，不代表已有任何可发布声音，也不授权 Runtime 接入。

推荐采购方向是：只选择一种文化与材质来源，委托制作一枚原创短 cue。不要把古琴泛音、磬钵、冥想氛围和游戏奖励声拼贴为“东方感”。若暂不采购或无法取得完整权利，声音层保持静音 `SAFE_WITHHELD`，C1 / C2 的视觉、语义与操作不受影响。

---

## 1. 基线与边界

```text
Remote / Pack Parent:
9c50cc648eb6ebc6433077ba0daf994aa312af2d

Single-Owner Audit:
CLOSED / MAJOR PREP REQUIRED

C1:
CLOSED / PASS

C2:
CLOSED / PASS

C3 Runtime:
DEFER

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED
```

本刀只新增：

1. 本 Pack 文档；
2. 一份位于 `docs/` 的 provenance manifest 模板。

本刀明确没有：

- 下载、录制、生成、采购或提交音频；
- 联系表演者、录音师、素材库或供应商；
- 代表用户接受许可条款；
- 修改 Runtime、Gate、Renderer、CSS、文案、Storage、Schema 或 Authority；
- 把设计参考误写为已授权资产；
- 把 manifest 模板误写为发布批准。

---

## 2. P0 最小声音集合

### 2.1 发布集合

P0 可发布集合精确为：

```text
Required active cue count: 1

Cue contract:
OWNERSHIP_TOUCH_ACK_P0
```

这一个 cue 同时服务于首次形成后的主动 Crystal 触碰与恢复态的主动 Crystal 触碰。是否为首次形成只影响产品事实，不产生第二声音资产，也不改变声级或价值。

### 2.2 明确不进入 P0 的声音

```text
FORMATION_AUTO_CUE: REJECT
RECOVERY_AUTO_CUE: REJECT
RETURN_ACCEPTED_CUE: REJECT
ELIGIBILITY_CUE: REJECT
CONTINUE_NAVIGATION_CUE: REJECT
CRYSTAL_RARITY_VARIANTS: REJECT
PERSONALITY / MOTHER_CODE / BAGUA TONES: REJECT
UI_TICK_COLLECTION: REJECT
AMBIENT_LOOP: REJECT
MULTI-CRYSTAL_CHORD / INSTRUMENT: DEFER / PHASE 4 BOUNDARY
```

P0 不需要“成功声”“形成声”“回归声”和“继续声”四套资产。产品因果已经由 IDB transaction、Ownership Presentation 与同体留痕表达；声音只是一次用户主动请求的冗余回应。

---

## 3. 产品触发与禁止触发

### 3.1 唯一允许触发

```text
Existing typed checkpoint = OWNERSHIP_PRESENTED
+ Ownership authority = IDB_TRANSACTION_COMPLETE
+ canonical Receipt / Crystal / Body / Imprint proof current
+ Same-Life Surface not SAFE_WITHHELD
+ user Sound preference = SOUND_ALLOWED
+ visible document
+ trusted activation on real Crystal BUTTON
→ request OWNERSHIP_TOUCH_ACK_P0 once
```

Cue request 不得改变 Ownership、Body Imprint 或导航。

### 3.2 禁止触发

以下全部必须为 `0`：

- 页面 mount、route enter、Direct URL；
- IDB transaction complete；
- Formation 动画开始或结束；
- `OWNERSHIP_PRESENTED` 状态出现；
- `RECOVERED_EXISTING` 恢复；
- refresh、Back / Forward、多标签恢复；
- hover、focus、scroll、viewport enter；
- Crystal 仅被绘制或进入 DOM；
- Continue 按钮或离开证据面；
- timer、RAF、frame count、CSS transition；
- AI、人格、Mother Code、八卦、Crystal 数量或稀有度；
- 商业提示、召回或付费转化。

### 3.3 重复触发

- 单次 trusted activation 最多启动一个 source；
- cue 未结束时重复触碰不得叠音或排队；
- haptic 独立决策，不通过音频尾音安排震动；
- 页面隐藏或卸载立即停止；
- 恢复态不自动播放，但用户重新主动触碰可以请求同一 cue；
- 不新增持久化“已播放”字段。

---

## 4. 声音设计方向

### 4.1 核心感受

```text
不是：奖励到账、升级、胜利、解锁稀有物
而是：我触碰了一次真实行动留下的晶体，它安静地回应了
```

声音应像一枚短促、低亮度、稳定的材质回应：有起音，但不尖锐；有尾音，但不拖入冥想背景；能感到触碰与物质接合，但不制造荣耀或神秘权威。

### 4.2 可探索的两条方向

只能择一进入采购，不得合并：

#### Direction A — 委托原创古琴泛音材质

- 由明确署名的演奏者 / 录音师录制单一泛音或短触弦材质；
- 只取物理触弦、泛音与木质余韵；
- 不使用旋律、曲牌、古曲片段或“东方胜利”音阶；
- 必须取得表演、录音母带、编辑、应用内同步与全球商业使用权；
- 前台可以称为“声音回应”，不得宣称它揭示命运、人格或卦象。

#### Direction B — 原创合成的矿物共鸣材质

- 从无第三方采样的合成链生成；
- 可以参考磬 / 钵的物理特征：低亮 attack、稀疏非整数泛音、短衰减；
- 不得标注为真实磬、钵或某一宗教仪式录音；
- 必须记录合成工具、patch、处理链与工具商业许可；
- 若使用生成式 AI，进入条件见第 8 节。

### 4.3 禁止文化拼贴

禁止：

- 同一 cue 叠加古琴、磬钵、寺院钟、诵唱、风铃和宇宙氛围；
- 将不同文化、宗教与地区器物统一包装为模糊“东方疗愈”；
- 使用仪式、宗教礼拜、祭祀或受限制表演录音；
- 用民族身份或传统器物暗示人格、命运、善恶与成长等级；
- 未经演奏者 / 社群审查就宣称“正宗”“古法”“疗愈频率”；
- 使用 432Hz、能量频率等未经产品事实支持的功效宣称。

---

## 5. 发布声学规格

### 5.1 时间与结构

| 项目 | P0 规格 |
|---|---|
| 完整播放时长 | `420–600ms`，绝不超过 `600ms` |
| 起始静音 | `≤ 20ms` |
| attack | `20–90ms`，避免硬点击 |
| 主体 | 一个稳定材质事件，不出现第二次击发 |
| decay / tail | 在总时长内自然衰减至静音 |
| 尾部静音 | `20–50ms`，避免切断噪声 |
| loop | `false`；不得存在 loop point |
| cue variation | `1`；不做随机音高或稀有度变体 |
| spatial movement | `0`；不做左右扫动、远近推进或环绕 |

### 5.2 响度

| 项目 | P0 规格 |
|---|---|
| Integrated loudness target | `-24 LUFS ± 2 LU` |
| True peak | `≤ -6 dBTP` |
| Short-cue RMS 记录 | 必填；建议 `-30 至 -22 dBFS` |
| Runtime gain boost | 禁止超出母版；不做设备补偿放大 |
| Device volume | 完全由用户 / 系统控制 |

短于响度门限而无法得到稳定 LUFS 时，manifest 必须记录工具、算法、RMS 与 true peak，不能省略测量或用主观“很轻”代替。

### 5.3 频谱与音色

| 项目 | P0 规格 |
|---|---|
| 主要可感能量 | 约 `160Hz–2.4kHz` |
| `≤80Hz` | 相对主体至少衰减 `24dB`，避免低频冲击 |
| `≥6kHz` | 相对主体至少衰减 `18dB`，避免亮金属刺耳 |
| 高频瞬态 | 不得形成点击、金币或玻璃爆裂感 |
| 谐波 | 稀疏、稳定、无上行旋律 |
| pitch randomization | `0` |
| reverb | 仅资产内短尾；不得运行时长混响或卷积空间 |

该范围是验收边界，不是强迫演奏者按频率合成器作曲。文化与材质判断仍须听审。

### 5.4 格式、码率与体积

#### 保管母版（不进入 App Bundle）

```text
WAV PCM
48kHz
24-bit
mono
no lossy generation
```

#### Web 发布候选

```text
Primary:
Opus, mono, 48kHz, 48kbps target

Compatibility:
AAC-LC / M4A, mono, 48kHz, 64kbps target
```

| 预算 | 上限 |
|---|---|
| 每个发布编码文件 | `≤ 32KiB` |
| 两种编码合计 | `≤ 64KiB` |
| 首次触发下载 | `≤ 64KiB`，只能取一种受支持格式 |
| decoded 常驻内存 | `≤ 1MiB` |
| C3 P0 全部音频下载总量 | `≤ 64KiB` |

编码兼容性须在 Runtime Push Gate 用正式目标浏览器验证；Pack 不以文件扩展名替代实际解码证明。

---

## 6. 可接受来源与优先级

| 来源 | P0 可接受性 | 必备证明 | 主要风险 |
|---|---|---|---|
| 原创内部录音 | ACCEPTABLE | 创作者、演奏者、录音母带与劳动 / 委托关系书面确认 | 表演权与母带权遗漏 |
| 外部委托原创 | **PREFERRED** | 书面合同、费用、交付、全球商业许可或权利转让、表演与母带授权 | 合同范围不足、署名遗漏 |
| 商业素材库 | CONDITIONAL | 精确素材 ID、购买凭证、当日条款快照、应用内商业使用、衍生编辑、全球分发许可 | 平台 / seat / 下载量限制、Content ID |
| 无采样原创合成 | ACCEPTABLE | patch / 工具 / 插件清单、工具许可、处理链、作者声明 | 工具或 preset 含第三方 sample |
| 生成式 AI | CONDITIONAL / NOT PREFERRED | 模型、版本、日期、输入来源、服务条款、商业权、训练与生成披露、人工审查、无声纹模仿 | 训练权、相似性、不可追溯来源 |
| 免费网络下载 / 社交媒体 / 视频提取 | REJECT | — | 来源、许可、表演与录音权均不明 |
| 公版古曲的现代录音 | REJECT UNTIL SEPARATE RIGHTS | 作品公版不等于表演与母带公版 | 误把作品权当录音权 |
| 原型 oscillator / 随机 tick | REJECT AS RELEASE ASSET | — | 无稳定版本、无法听审、奖励化 |

推荐：由用户选择并授权一次外部委托，制作一枚原创短 cue；或选择完全无第三方采样的原创合成。两条路径都必须进入同一 manifest 与验收流程。

---

## 7. 全球商业许可最低要求

正式资产必须具有可书面证明的以下权利：

```text
Territory:
WORLDWIDE

Term:
PERPETUAL preferred;
otherwise expiry must exceed product support term and include replacement lead time

Platforms:
web / PWA / iOS / Android / desktop wrapper / CDN / app stores

Uses:
in-product playback, reproduction, distribution, caching,
technical transcoding, loudness normalization, trimming, fade,
bug-fix replacement and accessibility-compatible delivery

Commercial use:
explicitly allowed
```

还必须明确：

- 作曲 / 作品权；
- 表演者权；
- 录音母带权；
- 制作人 / 录音师权利或工作成果归属；
- 第三方 sample、preset、impulse response、field recording；
- 编辑、剪切、转码、归一化与衍生权；
- CDN、App Store、云托管与分发供应商所需再许可；
- 署名要求及产品是否能履行；
- 版税、使用量、seat、MAU、收入、安装量或地区限制；
- Content ID / fingerprint / collection society 状态；
- 撤销、终止、违约、下架与替换条款；
- 隐私、肖像、场所、宗教仪式或环境录音中的第三方权利；
- AI 训练、AI 生成、声纹或表演者模仿披露。

不接受仅写“royalty free”“可商用”但无法获得完整条款、购买凭证和资产 ID 的授权。

### 7.1 宣传用途边界

P0 应只采购应用内使用权。若未来要把 cue 用在广告、社交媒体、预告片或线下活动，必须在 manifest 中单独批准；不能从应用内权利自动推断宣传同步权。

---

## 8. AI 与合成披露

### 8.1 原创合成

必须记录：

- 作者；
- DAW、插件、合成器与版本；
- preset / wavetable / impulse response 来源；
- 是否包含第三方 sample；
- patch 或参数保管位置；
- 处理、母带与导出链；
- 所有工具的商业使用许可。

### 8.2 生成式 AI

生成式 AI 资产不是自动禁止，但 P0 不优先。至少必须记录：

```text
model / service / version
generatedAt
account / plan that granted commercial use
terms snapshot and effective date
prompt and uploaded inputs custody
whether copyrighted recordings were uploaded
provider training / opt-out disclosure
voice / performer imitation review
similarity and third-party rights review
human editor and final approver
```

若服务商不能明确授予商业使用、无法披露来源边界、输出疑似模仿特定演奏者，或合同禁止权利担保，则 `REJECT`。不得把 AI 生成事实隐藏在“原创合成”字段中。

---

## 9. 设计参考与可发布资产严格分离

### 9.1 设计参考

设计参考可以是：

- 曲目或器物的公开介绍链接；
- 录音室给出的试听水印；
- 文字描述、频谱截图或材质术语；
- Product Design 评审笔记。

设计参考只用于校准方向，必须标记：

```text
referenceOnly: true
releaseEligible: false
binaryCommitted: false
waveformExtracted: false
```

不得下载、切片、采样、声纹克隆、波形匹配或提交到仓库。

### 9.2 可发布资产

只有同时满足以下条件的精确 binary 才可发布：

- manifest `releaseStatus = APPROVED`；
- 文件 SHA-256 与 manifest 完全一致；
- 权利链完整；
- 许可覆盖目标地区、期限、平台和衍生编辑；
- 文化 / 产品 / 无障碍 / 技术 / 法务批准齐全；
- 声学与体积预算通过；
- 无待处理撤回或争议。

“听起来像参考”“由同一供应商提供”或“文件名相同”都不能替代 hash 与权利链。

---

## 10. Provenance Manifest 契约

模板文件：

```text
docs/XINMAI_PHASE_3_CRYSTAL_OWNERSHIP_SENSORY_AUDIO_PROVENANCE_MANIFEST_TEMPLATE_P0.json
```

### 10.1 顶层字段

- manifest version、pack ID、状态与生成时间；
- 产品、环境与唯一 cue contract；
- 设计参考与发布资产分离；
- 权利、文化、产品、技术、无障碍与法务审批；
- replacement / withdrawal 状态；
- manifest 自身完整性与签署人。

### 10.2 每个资产字段

- 不可变 `assetReferenceId` 与 `assetVersion`；
- release status；
- cue contract 与唯一触发；
- source type、作者、演奏者、录音师、许可方；
- 作品、表演、母带与第三方权利；
- 地区、期限、平台、使用、衍生权、署名、版税和限制；
- AI / synthesized disclosure；
- master 与每个发布编码的文件名、媒体类型、大小和 SHA-256；
- 时长、响度、峰值、频谱、loop、声道和采样率；
- 编辑与母带链；
- 设计、文化、法务、产品、技术和无障碍审批；
- replacement / withdrawal 信息。

### 10.3 状态机不是产品 Authority

manifest 状态只决定音频 binary 能否被打包：

```text
TEMPLATE_ONLY
ACQUISITION_PENDING
RIGHTS_REVIEW
TECHNICAL_REVIEW
APPROVED
WITHDRAWN
REJECTED
```

它不能改变 Crystal、Ownership 或 Body Imprint。未批准只使声音 `SAFE_WITHHELD`。

---

## 11. 资产验收表

### 11.1 产品与文化

| 验收项 | PASS 条件 |
|---|---|
| 归属语义 | 能被理解为触碰同一 Crystal 的克制回应 |
| 奖励化 | 无胜利音阶、金币、升级、老虎机或稀有度暗示 |
| 文化来源 | 单一且可说明；无古琴 / 磬钵 / 宗教氛围拼贴 |
| 功效宣称 | 无疗愈频率、命运、人格、修行等级 |
| 情绪压力 | 无催促、召回、焦虑或损失暗示 |
| 无声体验 | 完整视觉、语义和操作保持 |

### 11.2 权利

| 验收项 | PASS 条件 |
|---|---|
| 作品 / 作曲 | 已拥有、转让、许可或确属无需许可，并有证据 |
| 表演 | 明确同意全球商业应用内使用与编辑 |
| 母带 | 明确拥有或许可 |
| 第三方素材 | 全数列明且许可兼容 |
| 地区 / 期限 / 平台 | 覆盖冻结范围 |
| 衍生编辑 | trim / fade / normalize / transcode 明确允许 |
| 署名 | 要求明确且产品能够履行 |
| AI | 已完整披露并经专项审查 |
| 撤回 | 存在可执行下架与替换条款 |

### 11.3 技术

| 验收项 | PASS 条件 |
|---|---|
| Duration | 420–600ms |
| Loop | false |
| Loudness / true peak | 满足第 5 节 |
| Spectrum | 无低频冲击、刺耳亮金属或点击 |
| Master | 48kHz / 24-bit / mono WAV |
| Encodes | Opus + AAC-LC 候选齐全 |
| Size | 单文件与总量均通过 |
| Hash | 每个 binary SHA-256 与 manifest 一致 |
| Decode | 目标浏览器可解码；Pack 阶段只准备，Runtime Gate 实证 |
| Tail | 无切断、爆音或超时余响 |

### 11.4 无障碍与安全

- 不承载唯一事实；
- 不进入 aria-live；
- sound muted 时无操作损失；
- haptic 独立关闭；
- Reduced Motion 不被声音绕过；
- 无自动播放；
- 耳机与扬声器都无惊吓峰值；
- 快速重复触发不叠音。

任一必填项缺失：`NOT APPROVED`。

---

## 12. 缺失、失败与 SAFE_WITHHELD

下列任一成立，音频 Presentation 必须静音：

- manifest 缺失或解析失败；
- `releaseStatus != APPROVED`；
- binary hash 不匹配；
- 授权文件、购买凭证或权利链缺失；
- 许可过期、地区 / 平台不覆盖；
- 第三方争议、Content ID claim 或撤回通知；
- 声学、体积、文化或产品验收失败；
- Save-Data、offline、decode fail、AudioContext blocked；
- 用户关闭声音；
- Same-Life / Ownership typed proof withheld。

结果：

```text
Sensory Audio Presentation:
SAFE_WITHHELD / SILENT

Crystal / Ownership / Imprint / Continue:
UNCHANGED / AVAILABLE
```

不得使用占位提示音、浏览器 beep、随机 oscillator 或旧 LaunchLab `tick()` 填空。

---

## 13. 版本、替换与撤回流程

### 13.1 版本与不可变性

- `assetReferenceId` 指向一条产品用途；
- 每次 binary 或母带改变必须增加 `assetVersion`；
- 每个版本有独立 SHA-256；
- 不得覆盖同一 hashed URL；
- manifest 变更必须可审计；
- Runtime 只消费已批准版本的精确引用；
- 设计参考不能升级为发布资产，必须建立新的 release record。

### 13.2 正常替换

```text
new source / edit / encode
→ new immutable version
→ full rights + cultural + product + technical review
→ APPROVED
→ future Runtime candidate points to new hash
→ old version retained in audit record, no longer shipped
```

替换不能改变 Crystal 或为既有用户重写 Growth 事实。

### 13.3 紧急撤回

触发条件包括：

- 权利人通知；
- 许可到期或违约；
- 第三方权利争议；
- 文化伤害或误导；
- 可归因的惊吓峰值 / 技术缺陷；
- 文件被替换、hash 不一致或供应链异常。

撤回顺序：

1. 触发 forward sensory policy Counter，使新播放立即 `SAFE_WITHHELD`；
2. 停止新下载与缓存引用；
3. 标记 manifest `WITHDRAWN`，记录原因、日期与批准人；
4. 从下一发布包和 CDN 移除对应 hash；
5. 保留权利、合同、hash 与审计记录；
6. 如需替换，按新版本全流程重新审核；
7. 不恢复旧 page-local oscillator，不删除用户 Crystal / Receipt / Imprint。

不能用普通 git revert 恢复未审计声音。

---

## 14. 采购 / 委托决策卡

### 14.1 需要用户决定的唯一事项

用户需要在采购前明确选择：

```text
Option A — 委托原创古琴泛音短 cue
Option B — 委托原创无采样矿物共鸣合成 cue
Option C — 暂不采购，声音保持 SAFE_WITHHELD
```

推荐顺序：

1. **Option A**：若产品愿意承担表演、录音、文化审查与全球许可成本；
2. **Option B**：若优先控制权利链、体积、版本和跨平台一致性；
3. **Option C**：若当前无法取得完整许可；不影响 C1 / C2 和 Phase 3 已有价值。

不推荐从素材库同时寻找古琴与磬钵拼接。任何实际联系、询价、采购、委托或合同接受都需要用户另行明确授权。

### 14.2 委托 Brief 最小交付物

- 3 个仅供内部听审、同一方向的候选；
- 每个候选的原始 48kHz / 24-bit mono WAV；
- dry stem；
- 处理链、插件、sample / preset 清单；
- 表演者、录音师、制作人和权利声明；
- 合同与付款 / 购买凭证；
- 全球商业应用内许可；
- Opus / AAC 可由产品方在衍生编辑权下制作；
- 允许裁剪至 600ms、fade、响度和格式校准；
- 未入选候选的保管 / 删除与使用边界。

---

## 15. 进入 Runtime 前的关闭条件

以下全部通过后，才可申请 Single-Owner Atomic Migration：

1. 用户明确选择采购 / 委托路径；
2. 一个且仅一个 P0 cue 被选中；
3. 母版、发布编码与 SHA-256 齐全；
4. manifest 全字段完成，`releaseStatus = APPROVED`；
5. 全球商业、平台、期限、衍生与第三方权利通过；
6. AI / synthesized / sample 披露完整；
7. 产品、文化、法务、技术与无障碍批准齐全；
8. 声学、格式、体积和尾音预算通过；
9. 设计参考与发布 binary 完全分离；
10. 撤回与替换负责人、Counter 和联络链明确；
11. 未批准资产不进入 Runtime 分支；
12. Single-Owner Audit 的原子退出边界保持不变。

---

## 16. 下一刀

### 如果用户授权采购 / 委托

```text
XINMAI-PHASE-3-CRYSTAL-OWNERSHIP-
SENSORY-AUDIO-ASSET-ACQUISITION-
RIGHTS-AND-CULTURAL-REVIEW-P0

Traffic light:
YELLOW

Knife type:
External Asset Acquisition / Rights Review

Runtime:
DEFER
```

该刀才允许根据明确选项联系或接收供应方资产；采购、合同、付款与外部沟通必须另行授权。

### 如果用户暂不采购

```text
Audio:
SAFE_WITHHELD / SILENT

C3 sound Runtime:
DEFER

C1 / C2:
UNCHANGED
```

---

## 17. 最终阶段状态

```text
C3 Audio Product Contract:
FROZEN

C3 Asset Acquisition:
READY — USER SOURCE DECISION REQUIRED

Shippable asset:
0

Audio Runtime:
NOT AUTHORIZED

Single Sensory Owner Runtime:
DEFER UNTIL APPROVED ASSET PACK

Phase 3:
ACTIVE / NOT PASSED

Phase 4:
LOCKED

Research Execution:
BLOCKED BY PHASE 3 EXPERIENCE CLOSURE

Monetization Runtime:
DEFER

Push:
HOLD
```

本 Pack 关闭的是“怎样安全获得一枚可发布声音”的方法，不是声音交付本身。当前最小外部决策是选择原创古琴委托、无采样原创合成，或继续静音；在该选择与权利证据形成前，任何声音文件都不得进入正式历史。
