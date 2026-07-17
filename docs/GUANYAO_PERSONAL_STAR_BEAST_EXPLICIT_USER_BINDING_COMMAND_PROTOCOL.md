# GUANYAO Personal Star Beast Explicit User Binding Command

协议编号：`RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-COMMAND-P144`

## 1. 定位

P144 位于：

```text
P143 Explicit User Binding Eligibility
↓
P144 Explicit User Binding Command
↓
Future Binding Execution Review
```

本刀只将 `ELIGIBLE` 资格转换为未来绑定命令引用，不执行命令。

## 2. 输入边界

只有以下条件同时满足，才可形成命令：

- P143 `eligibilityStatus = READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY`；
- `eligibility = ELIGIBLE`；
- `authorizationStatus = AUTHORIZED`；
- 绑定范围为 `PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY`；
- 主体提交明确的绑定命令与执行引用。

`NOT_ELIGIBLE` 不生成绑定命令，也不被解释为系统错误。

## 3. 输出含义

合法命令得到：

- `commandStatus = READY_FOR_EXPLICIT_USER_BINDING_EXECUTION`；
- `bindingExecutionDeferred = true`；
- `userBinding = NOT_PERFORMED`；
- `productConsumption = NOT_PERFORMED`；
- `futureBindingExecutionRequired = true`。

命令具备执行资格，不等于用户已经绑定。

## 4. 禁止越权

P144 不执行：

- 用户绑定；
- Personal Star Beast 产品消费；
- Storage 写入；
- 用户画像或 Life State 创建；
- Engine、Renderer、UI 调用。

不提供默认命令。主体未明确提交时，不生成绑定命令。

## 5. 状态

- `READY`：绑定命令合法，可进入未来执行评审；
- `UNAVAILABLE`：资格缺失、不可用或未达到绑定资格；
- `BLOCKED`：资格边界、命令范围或身份引用不合法。
