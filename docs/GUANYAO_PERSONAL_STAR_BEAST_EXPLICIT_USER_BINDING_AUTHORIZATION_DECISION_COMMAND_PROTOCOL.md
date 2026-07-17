# GUANYAO Personal Star Beast Explicit User Binding Authorization Decision Command

协议编号：`RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-DECISION-COMMAND-P141`

## 1. 定位

P141 位于：

```text
P140 Explicit User Binding Authorization Decision Contract
↓
P141 Explicit Authorization Decision Command
↓
Future Authorization Decision Resolution
```

本刀只接收主体明确提交的 `GRANT` 或 `DECLINE` 命令，形成可验证的决定命令引用。

决定命令不是授权结果，也不是用户绑定结果。

## 2. 命令范围

命令只允许携带：

- `GRANT` 或 `DECLINE`；
- 决定命令引用；
- Personal Star Beast Identity Reference 的范围确认。

不得携带原始用户身份数据，不得扩大到用户画像或其他产品身份。

## 3. 输出含义

合法命令得到：

- `commandStatus = READY_FOR_AUTHORIZATION_DECISION_RESOLUTION`；
- `subjectDecision = GRANT | DECLINE`；
- `authorizationDecisionResolved = false`；
- `authorizationStatus = NOT_AUTHORIZED`；
- `userBinding = NOT_PERFORMED`；
- `productConsumption = NOT_PERFORMED`。

这表示命令已具备进入未来解析层的资格，不表示授权已经成立。

## 4. 禁止越权

P141 不执行：

- 授权解析或授权授予；
- 用户绑定；
- Personal Star Beast 产品消费；
- Storage 写入；
- 用户画像、PersonalStarBeast 或 Life State 创建；
- Engine、Renderer、UI 调用。

因此，本刀不执行用户绑定。

## 5. 状态

- `READY`：决定命令合法，可进入未来解析；
- `UNAVAILABLE`：P140 契约或明确命令缺失；
- `BLOCKED`：决定值、范围、边界或身份引用不合法。

P141 不提供默认决定。主体没有明确提交时，不生成 `GRANT` 或 `DECLINE`。
