# GUANYAO Formal Identity Source Input Normalization Boundary Protocol

P119 Real Identity Input Normalization Boundary Review

协议编号：`RC-REAL-IDENTITY-INPUT-NORMALIZATION-BOUNDARY-REVIEW-P119`

状态：`READY_FOR_FORMAL_INPUT_NORMALIZER_REVIEW / NO_RAW_USER_DATA`

## 01｜本刀定位

P119 只评审未来正式输入归一化器的边界与政策，不接收真实用户数据，不执行归一化。

```text
P118 Consumer Implementation Authorization
↓
P119 Input Normalization Boundary Review
↓
Future Formal Input Normalizer
↓
Future Formal Identity Source Consumer
```

P119 不是表单、不是用户入口、不是日期转换器，也不是正式 Consumer 实现。

## 02｜输入政策

未来正式入口接受的输入形状为：

`GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT`

政策冻结如下：

- 公历日期是用户输入格式；
- 既有日历引擎负责公历到中国农历的转换；
- 出生时间由既有时序引擎归入地支时辰；
- 农历年月日与时辰序数是正式计算输入；
- 出生地点只表达地点上下文，不参与星兽推导，也不参与母码推导；
- 原始用户输入不得由本层持久化。

## 03｜状态语义

### READY

P118 授权引用完整，未来可以单独评审正式 Input Normalizer。

### UNAVAILABLE

P118 授权缺失或尚未可用。P119 不通过用户输入补齐。

### BLOCKED

P118 边界破坏或授权引用失效。必须停止向下交接。

## 04｜严格边界

P119 只消费 P118 Authorization Result，禁止：

- 接收、存储或绑定真实用户输入；
- 创建表单、页面、路由、UI 或产品 Runtime；
- 执行公历转农历、时辰换算或身份重算；
- 修改 MotherCode、星宿、四象、LifeArchetype 或 PersonalStarBeast 来源；
- 接入 Renderer、WebGL、SceneModel、Asset、RenderPlan 或 Storage。

## 05｜地点语义冻结

出生地点是 `geo` 上下文，不是四象或星兽身份来源：

```text
出生地点
→ 地点上下文
→ 不参与星兽推导
→ 不参与母码推导
```

同一出生日期与时辰，在不同地点不应因为地点本身改变星兽身份或母码结果。

## 06｜下一步

P119 之后仍需独立评审：

1. 正式 Input Normalizer 实现；
2. 缺失出生时间与地点上下文的错误态；
3. 隐私与数据保留策略；
4. Consumer 实际实现与产品接入。
