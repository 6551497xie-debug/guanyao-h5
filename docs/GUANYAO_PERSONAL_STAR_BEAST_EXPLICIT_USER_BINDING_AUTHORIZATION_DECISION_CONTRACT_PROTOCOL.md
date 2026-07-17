# GUANYAO Personal Star Beast Explicit User Binding Authorization Decision Contract

协议编号：`RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-DECISION-CONTRACT-P140`

## 1. 定位

P140 位于：

```text
P139 Pending Authorization Resolution
↓
P140 Authorization Decision Contract
↓
Future Explicit Decision
```

本刀只冻结未来授权决定的输入范围与结果边界，不采集决定，不默认决定，也不执行绑定。

## 2. 决定范围

未来决定只能针对：

`PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY`

允许的显式决定值为：

- `GRANT`；
- `DECLINE`。

决定必须由主体明确作出，系统不得使用默认值或推断结果。

## 3. 当前输出

P140 只输出决定契约：

- `decisionStatus = NOT_DECIDED`；
- `authorizationStatus = NOT_AUTHORIZED`；
- `userBinding = NOT_PERFORMED`；
- `productConsumption = NOT_PERFORMED`；
- `noDefaultDecision = true`。

## 4. 禁止越权

P140 不执行：

- Grant 或 Decline 决定；
- 用户绑定；
- 产品身份消费；
- Storage 写入；
- UI、Engine、Renderer 调用；
- 用户画像、PersonalStarBeast 或 Life State 创建。

## 5. 状态

- `READY`：决定契约完整，可供未来显式决定流程使用；
- `UNAVAILABLE`：P139 结果不存在或不可用；
- `BLOCKED`：解析边界、决定范围或身份引用漂移。
