# GUANYAO Personal Star Beast Explicit User Binding Authorization Command

协议编号：`RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-COMMAND-P138`

## 1. 定位

P138 位于：

```text
P137 Explicit User Binding Authorization Review
↓
P138 Explicit User Binding Authorization Command
↓
Future Authorization Resolver
```

本刀只定义主体主动声明绑定意愿的命令结构，不把命令直接升级为授权结果。

## 2. 命令内容

命令必须明确声明：

- `commandType = EXPLICIT_USER_BINDING_INTENT`；
- `subjectDecision = DECLARE_EXPLICIT_USER_BINDING_INTENT`；
- 用户接受的是正式身份引用，而不是重新计算后的身份；
- 绑定范围仅为 `PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY`；
- `confirmationReference` 只能是外部确认引用，不携带原始用户画像或身份事实。

## 3. 命令不等于授权

P138 输出：

- `commandStatus = READY_FOR_AUTHORIZATION_RESOLUTION`；
- `subjectIntent = DECLARED`；
- `authorizationStatus = NOT_AUTHORIZED`；
- `userBinding = NOT_PERFORMED`；
- `productConsumption = NOT_PERFORMED`。

仍需后续独立 Resolver 依据命令、授权范围和产品策略形成正式授权结果。

## 4. 禁止越权

P138 不执行：

- 用户绑定；
- 产品身份消费；
- Storage 写入；
- 用户画像创建；
- Engine、Renderer 或 UI 调用；
- PersonalStarBeast 或 Life State 创建。

## 5. 状态

- `READY`：显式命令结构完整，可交给未来 Authorization Resolver；
- `UNAVAILABLE`：评审或命令输入缺失；
- `BLOCKED`：评审边界、命令类型、声明范围或身份引用漂移。
