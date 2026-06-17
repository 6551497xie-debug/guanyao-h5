# Hexagram Card References

这里放置卦码卡视觉参考母版。

## 当前状态

已导入：

- `003-tun-potu-reference-v1.png`
- `010-lv-bingshang-reference-v1.png`

其余 global reference image 仍为 pending，可按以下命名规则补入。

## 命名规则

全局拓扑参考图建议使用：

- `global-structure-wall-v1.png`
- `global-thermal-crack-v1.png`
- `global-floating-mist-v1.png`
- `global-lone-ascent-v1.png`
- `global-sediment-ground-v1.png`
- `global-freeze-boundary-v1.png`
- `global-gathering-center-v1.png`
- `global-pressure-held-v1.png`

单卦参考图建议使用：

- `001-qian-gaokong-reference-v1.png`
- `003-tun-potu-reference-v1.png`
- `004-meng-miwu-reference-v1.png`
- `008-bi-kaojin-reference-v1.png`

文件名不要使用中文、空格或临时截图名。不要覆盖原图，新增版本时递增 `v2`、`v3`。

## 用途

参考图只用于：

- 风格锚点
- 拓扑结构
- 构图骨架
- 光源方式
- 黑场比例
- 负空间比例
- 抽象程度
- 处境结构

参考图不用于复制：

- 文案
- LOGO
- 卦形
- 标签
- 具体旧内容
- 旧卡面排版
- 旧错字
- 旧布局

后续生图应使用：

reference image + visualPrompt + topology strategy + fixed A/B template

后续生图必须从纯 prompt 生图升级为：参考母版图 + 拓扑归类 + 本卦结构 prompt + 固定模板。

参考图不是正式 A 面底图，只作为风格 / 拓扑 / 构图锚点。

AI 仍只生成无字主视觉底图。文字、LOGO、卦形、标签与 B 面排版由固定模板生成。
