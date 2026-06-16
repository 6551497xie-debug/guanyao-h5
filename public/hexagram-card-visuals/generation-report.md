# Hexagram Card Visual Generation Report

生成时间：2026-06-16

清理时间：2026-06-16

使用工具：Codex 内置 image generation tool

目标：001-010 卦码卡 A 面无字主视觉底图首批候选清理

规格结果：
- 输出格式：PNG
- 输出尺寸：1086 x 1448
- 画幅比例：3:4 竖版
- 资产目录：`public/hexagram-card-visuals/`

## 当前资产槽状态

| 编号 | 文件名 | 状态 | 原因 / 备注 |
|---|---|---|---|
| 001 | `001-qian-wei-tian-gaokong.png` | rejected / removed | 主结构不达标，结构弱，不进入正式资产槽。 |
| 002 | `002-kun-wei-di-dadi.png` | rejected / removed | 材质化，缺少明确主视觉中心。 |
| 003 | `003-shui-lei-tun-potu.png` | candidate usable | 候选可用，保留在正式资产槽；后续仍可替换。 |
| 004 | `004-shan-shui-meng-miwu.png` | rejected / removed | 风景化，不进入正式资产槽。 |
| 005 | `005-shui-tian-xu-dengdai.png` | rejected / removed | 构图不达标，不进入正式资产槽。 |
| 006 | `006-tian-shui-song-zhengming.png` | rejected / removed | 构图不达标，不进入正式资产槽。 |
| 007 | `007-di-shui-shi-liezhen.png` | rejected / removed | 构图不达标，中心阵位弱。 |
| 008 | `008-shui-di-bi-kaojin.png` | rejected / removed | 构图不达标，有网络化倾向。 |
| 009 | `009-feng-tian-xiao-xu-miyun.png` | rejected / removed | 风景化或结构不稳定，不进入正式资产槽。 |
| 010 | `010-tian-ze-lv-bingshang.png` | candidate usable / B+ | 勉强可用，保留在正式资产槽；后续仍可替换。 |

## Lab 读取预期

- 003 与 010：读取真实 PNG 底图。
- 001、002、004、005、006、007、008、009：因正式 PNG 已移除，应自动 fallback 到结构占位图。

## 检查说明

- 本次清理不生成新图。
- 本次清理不伪造合格图。
- 被移除图片不应再被 `/hexagram-card-lab` 当作正式底图读取。
- 模板仍负责叠加文字、LOGO、固定卦形、标签和 B 面排版。
