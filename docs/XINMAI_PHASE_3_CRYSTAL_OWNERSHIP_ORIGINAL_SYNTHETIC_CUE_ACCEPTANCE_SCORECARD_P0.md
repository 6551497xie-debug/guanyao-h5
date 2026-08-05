# XINMAI Phase 3 Original Synthetic Ownership Cue Acceptance Scorecard P0

## 0. 使用规则

```text
Cue:
OWNERSHIP_TOUCH_ACK_P0

Candidate labels:
A / B / C only

Maximum candidate count:
3

Passing score:
85 / 100 or higher

Mandatory veto failure:
REJECT regardless of score
```

本评分卡只用于验收外部委托的原创无采样矿物 / 冰晶共鸣 cue。它不批准 Runtime，也不允许把得分较高但权利、惊吓或文化边界失败的声音带入产品。

---

## 1. 评审信息

```text
Review reference:
REPLACE_ME

Review date:
REPLACE_ME

Blind candidate:
A | B | C

Binary SHA-256:
REPLACE_ME

Reviewer:
REPLACE_ME

Device / environment:
REPLACE_ME

System volume:
REPLACE_ME

Sound preference:
SOUND_ALLOWED | SOUND_MUTED
```

---

## 2. 先做开放回答

听一次后，不查看 Brief，回答：

1. 你觉得刚才发生了什么？
2. 它像什么材质或动作？
3. 它是否让你觉得获得了奖励、升级或胜利？为什么？
4. 它是否像通知、玻璃破碎、冥想或宗教声音？
5. 你会不会为了再听一次而反复点击？
6. 在安静环境中是否突然或惊吓？

原始回答：

```text
REPLACE_ME
```

不得先告诉评审“这是 Crystal”“这是矿物”“这是 Ownership”。

---

## 3. Mandatory Veto Checklist

任一 `FAIL` 即拒收：

| Veto | PASS / FAIL | 证据 / 备注 |
|---|---|---|
| 无第三方录音 sample、素材包录音、field recording |  |  |
| 无古琴 / 磬钵 / 宗教器物实录或声纹仿真 |  |  |
| 所有 synth、preset、wavetable、IR、插件与字体已披露 |  |  |
| AI 使用为 0，或已经完整披露并专项批准 |  |  |
| 全球永久商业、多平台、修改与必要再许可成立 |  |  |
| Work-for-hire / 完整转让或等价独占权利成立 |  |  |
| 作品、工程源、母带和协作者权利完整 |  |  |
| 文件 SHA-256 与 manifest 一致 |  |  |
| 完整时长 420–600ms |  |  |
| 无 loop、无二次击发、无随机音高 |  |  |
| True peak `≤ -6dBTP`，无 clip |  |  |
| 单文件与总下载体积在预算内 |  |  |
| 无胜利、金币、升级、通知或成瘾反馈 |  |  |
| 无文化 / 宗教拼贴或疗愈功效暗示 |  |  |
| 手机和耳机环境均无惊吓性缺陷 |  |  |
| 替换与撤回条款可执行 |  |  |

```text
Mandatory veto result:
PASS | REJECT
```

---

## 4. 加权评分

### A. 产品语义 — 25 分

| 项目 | 分值 | 得分 |
|---|---:|---:|
| 像一次已经存在的 Crystal 被主动触碰 | 8 |  |
| 表达克制回应，不宣布形成或成功 | 6 |  |
| 不像奖励、升级、掉落或稀有物 | 6 |  |
| 不诱导重复点击 | 5 |  |

```text
A subtotal: __ / 25
```

### B. 材质与创作方向 — 20 分

| 项目 | 分值 | 得分 |
|---|---:|---:|
| 有矿物 / 冰晶内部共鸣感 | 6 |  |
| 不像玻璃碎裂、金属武器或硬 click | 5 |  |
| 非古琴仿真、非磬钵 / 禅修模板 | 5 |  |
| 单一、确定性、无旋律化 | 4 |  |

```text
B subtotal: __ / 20
```

### C. 手机与耳机可读性 — 15 分

| 项目 | 分值 | 得分 |
|---|---:|---:|
| Android 手机扬声器可辨 | 4 |  |
| iPhone / 笔记本扬声器可辨 | 3 |  |
| 耳机下不刺耳、不空间扫动 | 4 |  |
| 20% / 50% / 80% 音量均不过度 | 4 |  |

```text
C subtotal: __ / 15
```

### D. 安全、无障碍与伦理 — 15 分

| 项目 | 分值 | 得分 |
|---|---:|---:|
| 安静夜间无惊吓 | 4 |  |
| 静音 / 无声时产品意义完整 | 3 |  |
| 不承载唯一成功事实 | 3 |  |
| 无文化、宗教、人格、命运或疗愈暗示 | 3 |  |
| 无压力、催促或损失焦虑 | 2 |  |

```text
D subtotal: __ / 15
```

### E. 声学与交付技术 — 15 分

| 项目 | 分值 | 得分 |
|---|---:|---:|
| 包络、attack、decay、tail 符合规格 | 4 |  |
| LUFS、RMS、true peak 合格 | 3 |  |
| 频谱适配手机，无 sub-bass / 高频尖峰 | 3 |  |
| mono 兼容、无 loop、无 metadata 垃圾 | 2 |  |
| WAV、Opus、AAC、工程源与测量报告齐全 | 3 |  |

```text
E subtotal: __ / 15
```

### F. Provenance 与权利可执行性 — 10 分

| 项目 | 分值 | 得分 |
|---|---:|---:|
| 原创无采样声明与工具清单完整 | 3 |  |
| 权利链、合同、凭证与协作者声明完整 | 3 |  |
| manifest 与所有 hash 完整 | 2 |  |
| 替换、撤回、联络与版本流程明确 | 2 |  |

```text
F subtotal: __ / 10
```

### 总分

```text
Total:
__ / 100

Threshold:
85 / 100
```

---

## 5. 声学测量记录

| 字段 | 目标 | 实测 |
|---|---|---|
| Duration | 420–600ms |  |
| Leading silence | ≤20ms |  |
| Attack | 20–90ms |  |
| Tail silence | 20–50ms |  |
| Integrated loudness | -24 LUFS ±2 |  |
| RMS | -30 至 -22dBFS 建议 |  |
| True peak | ≤-6dBTP |  |
| ≤80Hz attenuation | ≥24dB |  |
| ≥6kHz attenuation | ≥18dB |  |
| Channels | mono |  |
| Sample rate | 48kHz |  |
| Loop metadata | absent |  |
| Opus size | ≤32KiB |  |
| AAC size | ≤32KiB |  |
| Total release size | ≤64KiB |  |

测量工具与版本：

```text
REPLACE_ME
```

---

## 6. 设备矩阵

| 设备 / 环境 | 20% | 50% | 80% | 惊吓 | 可读 | 备注 |
|---|---|---|---|---|---|---|
| Android 内置扬声器 |  |  |  |  |  |  |
| iPhone 内置扬声器 |  |  |  |  |  |  |
| 笔记本扬声器 |  |  |  |  |  |  |
| 普通耳机 |  |  |  |  |  |  |
| 安静夜间 |  |  |  |  |  |  |
| 日常室内噪声 |  |  |  |  |  |  |
| 系统静音 | 0 输出 | 0 输出 | 0 输出 | N/A | 产品仍完整 |  |
| 产品 Sound Muted | 0 输出 | 0 输出 | 0 输出 | N/A | 产品仍完整 |  |

---

## 7. 候选横向对照

| 维度 | A | B | C |
|---|---:|---:|---:|
| Mandatory veto |  |  |  |
| 产品语义 /25 |  |  |  |
| 材质 /20 |  |  |  |
| 设备可读 /15 |  |  |  |
| 安全与伦理 /15 |  |  |  |
| 技术 /15 |  |  |  |
| 权利 /10 |  |  |  |
| 总分 /100 |  |  |  |
| 推荐 |  |  |  |

不允许通过提高响度让某一候选在盲听中占优。

---

## 8. 最终裁决

```text
Candidate:
A | B | C | NONE

Mandatory veto:
PASS | REJECT

Score:
__ / 100

Rights review:
PASS | OPEN | REJECT

Cultural review:
PASS | OPEN | REJECT

Technical review:
PASS | OPEN | REJECT

Final asset verdict:
APPROVED FOR RUNTIME CANDIDATE
| REVISION REQUIRED
| REJECTED
```

批准签署：

| 角色 | 姓名 | 日期 | 决定 |
|---|---|---|---|
| Product |  |  |  |
| Cultural review |  |  |  |
| Legal / rights |  |  |  |
| Technical audio |  |  |  |
| Accessibility |  |  |  |

所有角色通过且 manifest `releaseStatus=APPROVED` 前，音频保持 `SAFE_WITHHELD`。

---

## 9. 替换 / 撤回记录

```text
Asset reference:
REPLACE_ME

Version:
REPLACE_ME

Status:
ACTIVE | REPLACED | WITHDRAWN | REJECTED

Reason:
REPLACE_ME

Policy Counter activated:
YES | NO

Replacement reference:
REPLACE_ME_OR_NONE

Recorded by / at:
REPLACE_ME
```

撤回不得删除用户 Crystal、Receipt、Body Imprint 或恢复资产，也不得恢复旧页面 oscillator。
