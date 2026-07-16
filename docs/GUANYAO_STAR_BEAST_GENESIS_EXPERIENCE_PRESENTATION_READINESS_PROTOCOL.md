# GUANYAO Star Beast Genesis Experience Presentation Readiness Protocol

协议编号：`RC-STAR-BEAST-GENESIS-EXPERIENCE-PRESENTATION-READINESS-P87`

## 定义

> P87 判断 P86 Genesis Reveal 是否具备进入隔离体验预览的资格。

Readiness 不是 Presentation，也不是 UI。P87 READY 不会创建页面。

## 数据链

```text
P86 Genesis Reveal Result reference
+ same Genesis Experience State reference
+ ISOLATED_GENESIS_PREVIEW_ONLY scope
+ manual human acceptance reference
→ P87 Presentation Readiness
→ READY | UNAVAILABLE | BLOCKED
```

## READY 条件

1. P86 Result 为 READY，Experience State 为原始同一引用。
2. P86 双来源独立、只读引用、无生成边界完整。
3. Preview Scope 严格为 `ISOLATED_GENESIS_PREVIEW_ONLY`。
4. 明确要求人工验收，禁止自动转为产品验收。

满足后只输出 `READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW`。

## 状态规则

- `READY`：可以进入未来独立预览施工。
- `UNAVAILABLE`：来源或必要引用不足。
- `BLOCKED`：P86 阻断、引用漂移、隔离范围或人工验收边界无效。

## 固定边界

P87 不反向调用 P86，不创建 Presentation、不修改 UI、不接 Launch、不调用 Renderer 或 Canvas、不修改 Asset、Life State、Runtime、Storage。

下一刀 P88 才允许在独立路由建立人工验收预览；该预览不得接入正式用户流程。
