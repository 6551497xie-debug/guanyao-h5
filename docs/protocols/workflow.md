# 工程协作流程协议

## 分工

- 产品判断在 ChatGPT 总控窗口。
- 工程执行在 Codex。
- 协议沉淀进 repo。
- 功能通过派生分支小步合入。

## 施工规则

- 一条 Codex 指令只做一件事。
- 不再发巨型总指令。
- 已锁协议只引用 docs，不全文展开。
- 新功能从稳定节点派生 feature 分支。
- 小步完成、小步验收、小步存档。
- 主线只保留稳定节点。

## 建议分支命名

- `feature/docs-r0-protocol-index`
- `feature/r2b-1-identity-fragment-schema`
- `feature/r2b-2-identity-fragment-samples`
- `feature/r2c-scene-seed-flow`
- `feature/legacy-state-audit`

## 存档边界

- 通过 TypeScript / build / 浏览器复验后再存档。
- 本地构建产物不得进入提交。
- 协议类任务不混入功能代码。
- 功能类任务不顺手重写协议。
