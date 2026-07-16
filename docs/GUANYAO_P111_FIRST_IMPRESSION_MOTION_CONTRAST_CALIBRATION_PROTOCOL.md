# GUANYAO P111 First Impression Motion Contrast Calibration Protocol

协议编号：`RC-GUANYAO-GENESIS-FIRST-IMPRESSION-MOTION-CONTRAST-CALIBRATION-P111`

阶段：`GUANYAO Genesis WebGL Prototype Calibration Phase`

状态：`ISOLATED_PROTOTYPE_ONLY / HUMAN_REVIEW_REQUIRED`

## 01｜本刀目标

P111 只校准星空生命结构的时间速率，回应 P110 人工验收中的问题：

> 生命组织已经不同，但运动太慢，第一眼仍然容易被感知为相同。

本刀让 Case A / Case B 的既有骨架、形态场和生命核心关系在首次显化窗口内更快显现。

## 02｜只调整速率

Renderer 仍然只消费 `RenderPlan` 投影后的表达参数。

本刀仅调整：

- 整体生命结构的旋转速率：`0.060 + flowUnit × 0.140`；
- 形态场流动速率：`0.180 + |bend| × 0.220`。

这两个速率仍由正式 RenderPlan 的表达引用派生，因此不同生命保持不同运动倾向。

不调整：

- Identity、Mansion、Four Symbol、MotherCode；
- 骨架节点数量与位置；
- 星尘数量、亮度、颜色与粒子资产；
- Scene Model、RenderPlan、正式 Runtime。

## 03｜体验边界

目标是在 `ARRIVAL 0–1400ms / FORMATION 1400–3800ms / PRESENCE 3800ms` 的首次窗口内，让用户更早感到：

> 这两种生命不是同一种运动关系。

不是加速成炫技动画，也不是增加动作表演。Presence 仍需保留安静、持续和在场感。

## 04｜人工验收

1. Case A / Case B 是否在前 3.8 秒内出现可辨认的运动组织差异；
2. 差异是否来自结构流动与整体姿态，而不是颜色或亮度；
3. 是否仍然像生命在呼吸与聚合，而不是游戏角色或爆发特效；
4. Presence 阶段是否仍能安静停留。

工程 Gate 只能确认速率契约和隔离边界，不能替代第一眼视觉判断。
