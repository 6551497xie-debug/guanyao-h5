# 05｜自然回访与研究提醒日志

> 模板状态：`EMPTY / NO AUTOMATED REMINDERS`

## A. 窗口信息

```text
participantReference: [填写]
explicitDepartureAt: [填写]
returnWindowStartsAt: [填写]
returnWindowEndsAt: [填写]
productReminderCount: 0
```

正式研究中产品提醒必须为0。

## B. 自然回访记录

```text
firstReturnAt: [填写 / NONE]
returnedBeforeAnyResearchReminder: [YES / NO / NOT_OBSERVABLE]
returnEntryDiscoveredUnaided: [YES / NO / NOT_OBSERVABLE]
returnSurface: [填写]
participantStatedMotivationExactQuote: [填写]
```

## C. 研究提醒记录

研究提醒只能用于安排，不用于产品召回。每一次都必须记录：

| 时间 | 原因 | 中性原文 | 发送者 | 回访是否发生在其后 |
|---|---|---|---|---|
| `[填写]` | `[填写]` | `[填写]` | `[填写]` | `YES / NO` |

禁止提醒内容：

- 星兽在等你；
- Crystal会消失；
- 不回来会错过成长；
- 你的行动还没完成；
- 新内容已经出现；
- 会员或等待名单。

## D. 回访分类规则

| 条件 | 分类 |
|---|---|
| 研究提醒前主动回来，动机指向同一生命与持续记忆 | `SPONTANEOUS_CONTINUITY_RETURN` |
| 研究提醒前主动回来，动机只指向新内容、安慰或视觉 | `SPONTANEOUS_OTHER_RETURN` |
| 任何研究提醒后才回来 | `RESEARCHER_PROMPTED_RETURN` |
| 窗口内没有回来 | `NO_RETURN` |
| 技术或数据原因无法判断 | `NOT_OBSERVABLE` |

最终分类：`[填写]`

## E. 分母写入

```text
includedInNEnrolled: [YES / NO]
includedInNDay0Departed: [YES / NO]
includedInNSpontaneousReturn: [YES / NO]
includedInNReturnedAny: [YES / NO]
```

研究提醒后的回访不得进入`N_SPONTANEOUS_RETURN`。
