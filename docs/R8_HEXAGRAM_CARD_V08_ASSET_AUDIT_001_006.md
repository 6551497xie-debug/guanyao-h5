# R8｜001—006 卦码卡 V0.8 资产验收清单

## 一、验收范围

- 001｜乾为天｜高空
- 002｜坤为地｜大地
- 003｜水雷屯｜破土
- 004｜山水蒙｜迷雾
- 005｜水天需｜等待
- 006｜天水讼｜争鸣

## 二、逐张资产检查

| code | 卦名 | 卡名 | visualAssetUrl | 正式图片 | 规范文档 | 当前视觉等级 | 当前状态 | 后续备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 001 | 乾为天 | 高空 | `/hexagram-card-visuals/001-qian-wei-tian-gaokong.png` | present | present | B / v0.8-usable | official visual asset present; spec present; lab readable; pending collectible remake | 正式底图已入仓；当前可用于模板验证与 V0.8 展示；后续收藏级需继续去祭坛化、去强中轴光柱，强化高位独自承压。 |
| 002 | 坤为地 | 大地 | `/hexagram-card-visuals/002-kun-wei-di-dadi.png` | present | present | B / v0.8-usable | official visual asset present; spec present; lab readable; pending collectible remake | 正式底图已入仓；当前可用于模板验证与 V0.8 展示；后续收藏级需强化地层承载与边界压力，避免普通地貌化。 |
| 003 | 水雷屯 | 破土 | `/hexagram-card-visuals/003-shui-lei-tun-potu.png` | present | pending | B+ / near collectible topology reference | official visual asset present; spec pending; lab readable; pending collectible remake | 正式确认图已存档；裂缝破土识别较强，可作为裂缝破土型参考，但收藏级仍需检查 A 面叠字安全区与色系统一。后续可补 `R8-HEXAGRAM-CARD-003-SPEC-P0`。 |
| 004 | 山水蒙 | 迷雾 | `/hexagram-card-visuals/004-shan-shui-meng-miwu.png` | present | present | B / v0.8-usable | official visual asset present; spec present; lab readable; pending collectible remake | 正式底图已入仓；当前可用；后续收藏级需强化“问题被遮住”的符号性，避免城市雾景化。 |
| 005 | 水天需 | 等待 | `/hexagram-card-visuals/005-shui-tian-xu-dengdai.png` | present | present | B / v0.8-usable | official visual asset present; spec present; lab readable; pending collectible remake | 正式底图已入仓；当前几何悬置方向优于水面风景方向；后续收藏级需强化“结构尚未落位、时机未开”。 |
| 006 | 天水讼 | 争鸣 | `/hexagram-card-visuals/006-tian-shui-song-zhengming.png` | present | present | B / v0.8-usable | official visual asset present; spec present; lab readable; pending collectible remake | 正式底图已入仓；左右对峙方向成立；后续收藏级需继续降低 AI 黑城感，强化“边界被迫显现”。 |

## 三、正式图片路径检查

| 文件路径 | 检查结果 |
| --- | --- |
| `public/hexagram-card-visuals/001-qian-wei-tian-gaokong.png` | present |
| `public/hexagram-card-visuals/002-kun-wei-di-dadi.png` | present |
| `public/hexagram-card-visuals/003-shui-lei-tun-potu.png` | present |
| `public/hexagram-card-visuals/004-shan-shui-meng-miwu.png` | present |
| `public/hexagram-card-visuals/005-shui-tian-xu-dengdai.png` | present |
| `public/hexagram-card-visuals/006-tian-shui-song-zhengming.png` | present |

## 四、规范文档检查

| 文档路径 | 检查结果 |
| --- | --- |
| `docs/R8_HEXAGRAM_CARD_001_OPTIMIZATION_SPEC.md` | present |
| `docs/R8_HEXAGRAM_CARD_002_OPTIMIZATION_SPEC.md` | present |
| `docs/R8_HEXAGRAM_CARD_003_OPTIMIZATION_SPEC.md` | pending |
| `docs/R8_HEXAGRAM_CARD_004_OPTIMIZATION_SPEC.md` | present |
| `docs/R8_HEXAGRAM_CARD_005_OPTIMIZATION_SPEC.md` | present |
| `docs/R8_HEXAGRAM_CARD_006_OPTIMIZATION_SPEC.md` | present |
| `docs/R8_HEXAGRAM_CARD_COLLECTIBLE_VISUAL_STANDARD.md` | present |
| `docs/R8_HEXAGRAM_CARD_MULTI_REFERENCE_SYSTEM.md` | present |

## 五、/hexagram-card-lab 可读性检查

本轮未进行浏览器手动验收；以工程路径和 build 产物检查为准。

已确认：

1. 001—006 的 `visualAssetUrl` 均与 `public/hexagram-card-visuals/` 下正式图片文件一致。
2. 001—006 的正式图片均存在于 `public/hexagram-card-visuals/`。
3. 001—006 的正式图片均已存在于当前 `dist/hexagram-card-visuals/` build 产物中。

因此，001—006 在 `/hexagram-card-lab` 中具备读取正式底图的工程条件。

## 六、当前等级建议

### 001｜乾为天｜高空

等级：B / v0.8-usable

备注：正式底图已入仓；当前可用于模板验证与 V0.8 展示；后续收藏级需继续去祭坛化、去强中轴光柱，强化高位独自承压。

### 002｜坤为地｜大地

等级：B / v0.8-usable

备注：正式底图已入仓；当前可用于模板验证与 V0.8 展示；后续收藏级需强化地层承载与边界压力，避免普通地貌化。

### 003｜水雷屯｜破土

等级：B+ / near collectible topology reference

备注：正式确认图已存档；裂缝破土识别较强，可作为裂缝破土型参考，但收藏级仍需检查 A 面叠字安全区与色系统一。003 当前标记为 spec pending，后续可补 `R8-HEXAGRAM-CARD-003-SPEC-P0`。

### 004｜山水蒙｜迷雾

等级：B / v0.8-usable

备注：正式底图已入仓；当前可用；后续收藏级需强化“问题被遮住”的符号性，避免城市雾景化。

### 005｜水天需｜等待

等级：B / v0.8-usable

备注：正式底图已入仓；当前几何悬置方向优于水面风景方向；后续收藏级需强化“结构尚未落位、时机未开”。

### 006｜天水讼｜争鸣

等级：B / v0.8-usable

备注：正式底图已入仓；左右对峙方向成立；后续收藏级需继续降低 AI 黑城感，强化“边界被迫显现”。

## 七、结论

001—006 当前可作为 R8 V0.8 卦码卡资产进入工程链路，用于模板验证、A/B 面展示、路径验证与后续产品联调。

但 001—006 当前不直接等同于最终收藏级母卡。
后续收藏级重制应另起一轮，按照 `docs/R8_HEXAGRAM_CARD_COLLECTIBLE_VISUAL_STANDARD.md` 执行。

下一步建议：

1. 补 003 单卡视觉优化规范文档。
2. 继续 007 之前，先确认 001—006 在 `/hexagram-card-lab` 的成卡效果。
3. 若展示稳定，再进入 007｜地水师｜列阵 的视觉规范与无字底图流程。
