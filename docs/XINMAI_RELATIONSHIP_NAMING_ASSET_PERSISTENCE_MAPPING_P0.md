# XINMAI Relationship Naming Asset Persistence Mapping P0

任务编号：

`XINMAI-RELATIONSHIP-NAMING-ASSET-PERSISTENCE-MAPPING-P0`

项目：

`/Users/xieyanjun/Desktop/guanyao-h5`

刀型：

`MAP`

主 Layer：

`Layer 3｜Relationship`

保护 Layer：

`Layer 2｜Identity`

决策：

`NOW — MAP ONLY`

状态：

`MAP COMPLETE / IMPLEMENTATION NOT AUTHORIZED`

---

## 一、Construction State Card

```text
当前 Phase：
Phase 1 → Phase 2

当前主线：
First Encounter → Life Companion

本刀类型：
MAP

主影响 Layer：
Layer 3｜Relationship

保护 Layer：
Layer 2｜Identity

已有完成资产：
LaunchLifeSourceSession
sourceReferenceId
二十八宿天地身份
StarBeastIdentitySource
Recognition continuity
Recognized Life Identity persistence

本刀消费者：
未来 Relationship Naming 交互与恢复路径

是否存在协议冲突：
无；前提是关系名不进入身份、现实理解与成长算法

是否需要迁移审计：
不需要产品范式迁移；
需要独立的可选资产字段与最小持久化迁移

决策：
NOW — MAP ONLY
```

---

## 二、唯一结论

冻结：

> 用户关系名由一个独立的 `StarBeast Relationship Naming Asset` 持有。

它不是：

- 二十八宿字段；
- 星兽身份字段；
- `LaunchLifeSourceSession` 的组成部分；
- `StarBeastIdentitySource` 的组成部分；
- Pressure Seed 的输入；
- Reality 的进入条件；
- 同行关系成立的门槛。

它是：

> 绑定到同一 `sourceReferenceId` 的可选、可延后、可修改、可撤回的关系资产。

核心关系：

```text
天地身份
不可修改

        sourceReferenceId
               │
               ▼

用户关系名
可选附加资产
```

因此：

```text
天地之名回答：
它是谁、从哪里来

用户关系名回答：
我如何称呼我们之间的关系
```

两者并存，不互相覆盖。

---

## 三、审查范围与证据

本次只读审查覆盖：

- `src/services/sessionService.ts`
- `src/services/guanyaoSessionPersistenceAdapter.ts`
- `src/types/launchLifeSourceSession.ts`
- `src/types/starBeastIdentitySource.ts`
- `src/types/genesisStarBeastManifestationSource.ts`
- 既有 Personal StarBeast 用户绑定与存储集成审查资产
- `XINMAI_LIFE_ORIGIN_FIRST_ENCOUNTER_PROTOCOL_P0`
- `XINMAI_LIFE_WHISPER_RELATION_ENTRY_MAJOR_BLADE_PREP_P0`
- `XINMAI_MIGRATION_ROADMAP_AND_STAGE_CONTROL_P0`
- `XINMAI_PRODUCT_MIGRATION_AND_CONSTRUCTION_RHYTHM_P0`

审查不包含：

- UI 施工；
- 命名输入设计；
- Renderer 改造；
- Pressure Seed 改造；
- DOM → Renderer 迁移；
- 五项既存门禁漂移修复。

---

## 四、Runtime 证据等级

证据标记：

```text
✓ 已存在 Runtime
△ 存在可复用承载边界，但缺正式关系名资产
○ 仅协议或尚未实现
```

| 能力 | 状态 | 当前证据 | 本刀判断 |
| --- | --- | --- | --- |
| `sourceReferenceId` | ✓ | `LaunchLifeSourceSession` 与视觉连续资产共同消费 | 关系名的首要绑定锚点 |
| 二十八宿天地身份 | ✓ | Birth Mansion、Mansion Seed、StarBeast Identity Reference 已存在 | 身份权威，不可修改 |
| 星兽身份引用 | ✓ | `PersonalStarBeastIdentityReference` 已存在 | 可作为第二校验锚点 |
| 认出后的生命身份恢复 | ✓ | `persistRecognizedGenesisLifeAssets`、`hasPersistedRecognizedLifeIdentity` | 命名恢复前置门禁 |
| 版本化会话持久化 | ✓ | `GUANYAO_SESSION_V2` + `guanyao_h5_session` | 可承载独立可选资产 |
| 通用资产读写边界 | △ | `sessionService` 已按独立 key 保存生命来源与认出资产 | 可复用容器，不等于已有命名字段 |
| 用户关系名类型 | ○ | 未发现正式类型 | 必须单独定义，不能复用身份字段 |
| 用户关系名持久化 key | ○ | 未发现正式 key | Blade 3 前需新增一个可选资产 key |
| 创建 / 修改 / 清空 / 删除 API | ○ | 未发现正式 API | 必须由专用适配边界承担 |
| 用户关系名恢复消费者 | ○ | 未发现正式消费者 | Blade 3 实施时建立白名单 |

结论：

> 当前已有“可绑定的身份”和“可复用的持久化容器”，但没有“关系名资产”。

因此不能宣称关系命名已经有安全字段，也不能把它临时写入某个看似接近的身份对象。

---

## 五、资产所有权冻结

### 5.1 领域所有者

用户关系名的领域所有者：

```text
Layer 3
Relationship
```

不是：

```text
Layer 2
Identity
```

### 5.2 工程承载者

未来工程承载应为：

```text
StarBeastRelationshipNamingAsset
```

它通过持久化适配边界保存，并通过 `sourceReferenceId` 关联已认出的生命身份。

### 5.3 不允许承载关系名的资产

以下资产不得持有或被关系名改写：

| 资产 | 原因 |
| --- | --- |
| `LaunchLifeSourceSession` | 它是生命来源的不可变载体，明确禁止 Runtime mutation |
| `birthCoordinate` | 出生事实，不是关系表达 |
| `starbeastDerivationResult` | 星兽推导结果，不接受用户昵称反向写入 |
| `StarBeastIdentitySource` | 身份来源收敛，不是用户关系状态 |
| `PersonalStarBeastIdentityReference` | 指向星兽身份，不是显示昵称 |
| `GenesisStarBeastManifestationSource` | 显化来源，不创建或持有新资产 |
| `GenesisPresenceVisualRealization` | 视觉认出事实，不是关系名存储 |
| `SelectedPressureSeedContext` | 现实理解上下文，与关系名无关 |
| `GuanyaoSession` 中旧身份或场景字段 | 语义不匹配，容易污染旧链 |

---

## 六、Personal StarBeast 用户绑定不是关系名

代码中已存在一组 Personal StarBeast 显式用户绑定协议与执行引用。

它们解决的是：

```text
某个用户主体
是否显式绑定
某个星兽身份引用
```

它们不解决：

```text
用户如何称呼这个生命
```

现有绑定引用具有以下边界：

- `PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY`
- `storagePersistence: DEFERRED`
- `productConsumption: NOT_PERFORMED`
- `noLifeStateMutation: true`

因此：

> 该引用可以证明“身份绑定”和“关系命名”必须分层，但不能被直接改造成关系名存储。

禁止：

- 将关系名写入 `userSubjectReference`；
- 将关系名写入 `referenceId`；
- 让关系名触发新的身份绑定；
- 为了命名重新执行身份授权链；
- 把身份绑定状态当作命名完成状态。

---

## 七、建议关系名资产契约

以下为 MAP 级契约，不代表本刀新增类型或 Runtime。

```ts
type StarBeastRelationshipNamingAssetV1 = Readonly<{
  schemaVersion:
    "XINMAI_STARBEAST_RELATIONSHIP_NAMING_ASSET_V1";
  assetKind:
    "STARBEAST_RELATIONSHIP_NAMING_ASSET";

  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;

  nameState: "NAMED" | "CLEARED";
  relationshipName: string | null;

  createdAt: string;
  updatedAt: string;
  revision: number;
}>;
```

### 7.1 字段权威

| 字段 | 责任 |
| --- | --- |
| `sourceReferenceId` | 绑定同一生命来源 |
| `starBeastIdentityReferenceId` | 防止关系名被错误挂到另一只星兽 |
| `mansionCoordinateReferenceId` | 防止二十八宿坐标漂移 |
| `nameState` | 区分有效称呼与用户主动撤回 |
| `relationshipName` | 仅保存用户主动给予的称呼 |
| `createdAt` | 首次建立关系名的时间 |
| `updatedAt` | 最近一次修改或清空时间 |
| `revision` | 处理同一资产的修改顺序，不代表成长等级 |

### 7.2 不应复制进资产的字段

不保存为关系名权威：

- 二十八宿显示名称；
- 四象名称；
- 星兽完整身份结果；
- Pressure Seed；
- 六维状态；
- Reality 当前事件；
- Gravity 结论；
- Choice；
- Crystal；
- Life Whisper 原文。

天地之名始终从身份权威读取。

关系名资产只保存关系表达和必要关联引用。

### 7.3 输入规范边界

未来 Blade 3 必须至少保证：

- 只接受用户主动提交；
- 去除首尾空白；
- 空白值不能创建 `NAMED`；
- 有明确长度上限；
- 不由 AI 自动生成；
- 不由 Life Whisper 内容推断；
- 不写入日志、分析或模型输入；
- 不把关系名解释为人格、命运或生命状态。

具体字符上限与输入提示属于 Blade 3 交互设计，不在本 MAP 中冻结。

---

## 八、`sourceReferenceId` 绑定规则

### 8.1 写入前

创建或修改关系名之前，必须同时满足：

```text
Recognized Life Identity 存在
↓
LaunchLifeSourceSession 可恢复
↓
Genesis Presence 为 RECOGNIZED
↓
所有身份资产 sourceReferenceId 一致
↓
关系名资产写入同一 sourceReferenceId
```

### 8.2 读取时

关系名只有在以下条件成立时可见：

```text
namingAsset.sourceReferenceId
===
lifeSourceSession.sourceReferenceId
===
recognizedPresence.sourceReferenceId
```

若未来同时持有星兽身份引用，则还必须满足：

```text
namingAsset.starBeastIdentityReferenceId
===
activeStarBeastIdentity.referenceId
```

### 8.3 失配处理

任何引用失配时：

- 不显示关系名；
- 不自动迁移到新身份；
- 不修改天地身份；
- 不尝试按名字重新寻找星兽；
- 不阻断同行；
- 将结果视为 `UNAVAILABLE` 或待清理的孤立资产；
- 记录技术诊断时不得包含用户原始关系名。

### 8.4 身份变化

若用户未来明确创建了新的生命身份：

```text
旧 sourceReferenceId 的关系名
不得自动继承
```

新身份默认未命名。

旧关系名只能继续属于旧身份，或在用户数据删除时被级联删除。

---

## 九、天地之名与用户关系名并存

### 9.1 天地之名

来源：

- 生命坐标；
- 二十八宿；
- 四象家族；
- 星兽身份来源。

性质：

- 身份权威；
- 不可由用户修改；
- 不随改名变化；
- 不因清空关系名消失。

示例：

```text
北方玄武 · 壁水貐
```

### 9.2 用户关系名

来源：

- 用户主动给予。

性质：

- 关系资产；
- 可选；
- 可延后；
- 可修改；
- 可撤回；
- 不改变身份。

示例：

```text
安泉
```

### 9.3 展示原则

未命名：

```text
北方玄武 · 壁水貐
```

已命名：

```text
安泉
北方玄武 · 壁水貐
```

允许根据空间层级调整主次，但必须满足：

- 关系名出现时，天地之名仍可被用户找到；
- 关系名不能替换二十八宿结果；
- 天地之名不能伪装成用户已经命名；
- 清空关系名后自然回到天地之名；
- 不使用“改名后成为新星兽”的表达。

---

## 十、新用户恢复路径

### 10.1 命名发生

未来新用户路径：

```text
生命身份建立
↓
星兽认出
↓
第一次回应稳定
↓
用户可选命名
↓
关系名资产绑定当前 sourceReferenceId
↓
用户继续同行
```

### 10.2 刷新或重新进入

恢复顺序必须是：

```text
先恢复生命身份
↓
验证 Recognized Life Identity
↓
读取关系名资产
↓
校验 sourceReferenceId 与身份引用
↓
显示天地之名 + 用户关系名
```

禁止：

```text
先恢复关系名
↓
用关系名寻找或重建身份
```

### 10.3 存储失败

如果关系名持久化失败：

- 当前交互周期可以继续显示用户刚提交的称呼；
- 不得向用户声称已永久保存；
- 不得阻断 Reality；
- 不得修改身份资产以“补偿”写入失败；
- 下一次恢复时以真实读回结果为准。

---

## 十一、老用户状态处理

### 11.1 老用户未命名

判定：

```text
Recognized Life Identity 存在
+
Naming Asset 不存在
```

处理：

- 视为合法未命名状态；
- 继续使用天地之名；
- 不做写时迁移；
- 不自动生成关系名；
- 不阻断回归或 Reality；
- 可以在合适的关系时刻再次提供“以后再称呼它”的入口。

### 11.2 老用户已命名

判定：

```text
Naming Asset 状态为 NAMED
+
引用校验通过
```

处理：

- 恢复同一关系名；
- 同时保留天地之名；
- 不因进入 Reality、Archive 或新事件重新命名；
- 不把关系名复制进其他业务资产。

### 11.3 老用户改名

处理：

- 更新同一关系名资产；
- `sourceReferenceId` 与身份引用保持不变；
- `createdAt` 保持不变；
- `updatedAt` 与 `revision` 更新；
- 不创建第二只星兽；
- 不重算二十八宿；
- 不重放 First Encounter；
- 不触发奖励、成长或 Crystal。

### 11.4 老用户已清空

判定：

```text
Naming Asset 状态为 CLEARED
+
relationshipName = null
```

处理：

- 展示天地之名；
- 不恢复旧关系名；
- 不把清空理解为关系失败；
- 不降低陪伴状态；
- 可由用户以后重新命名。

### 11.5 遗留未知字段

若旧会话中出现未受本契约承认的 `nickname`、`displayName` 或其他近似字段：

- 不自动提升为关系名；
- 不自动写入新资产；
- 不覆盖天地之名；
- 需要单独迁移依据后才能导入。

当前审查未发现可直接迁移的正式关系名字段。

---

## 十二、跳过命名不阻断同行

关系成立的最低条件来自：

```text
用户认出同一生命
↓
生命回应
↓
回应进入新稳态
↓
用户愿意继续同行
```

命名不是其中的强制门禁。

因此：

- “暂时不命名”不得写入失败状态；
- 不得生成伪造的默认名字；
- 不得降低关系等级；
- 不得改变 `interactionAvailability`；
- 不得改变 Genesis → Reality Handoff；
- 不得成为 Reality Entry Context 字段；
- 不得成为老用户回归条件；
- 不得成为 Pressure Seed 候选条件。

建议：

> 跳过命名不写关系名资产。

如果未来需要记住“稍后提醒我”，该偏好应单独审查，不能伪装成关系名资产状态。

---

## 十三、生命周期冻结

### 13.1 创建 Create

触发：

- 已认出同一生命；
- 用户主动提交合法关系名；
- 当前身份引用校验通过。

结果：

```text
无 Naming Asset
↓
创建 V1 Asset
↓
nameState = NAMED
↓
revision = 1
```

不触发：

- 身份重算；
- Reality 迁移；
- Pressure Seed；
- AI；
- Crystal。

### 13.2 修改 Rename

触发：

- 用户明确选择重新称呼；
- 现有资产与当前身份引用一致。

结果：

```text
同一 Asset
↓
更新 relationshipName
↓
保持 sourceReferenceId
↓
revision + 1
```

改名是关系表达变化，不是生命成长事件。

### 13.3 清空 Clear

定义：

> 用户撤回当前称呼，但保留同一生命关系。

结果：

```text
nameState = CLEARED
relationshipName = null
revision + 1
```

保留清空墓碑的理由：

- 防止旧缓存或旧标签重新出现；
- 区分“从未命名”和“用户主动撤回”；
- 不必删除身份；
- 不影响以后重新命名。

### 13.4 删除 Delete

删除分为两个边界：

#### A. 删除关系名资产

- 只移除 Naming Asset；
- 身份、二十八宿、星兽、同行关系继续存在；
- 用户回到合法未命名状态；
- 不删除生命身份。

#### B. 删除生命身份或全部用户数据

- 关系名资产随其绑定的 `sourceReferenceId` 级联删除；
- 不允许留下可恢复的孤立关系名；
- 不允许把旧名字自动绑定到新身份。

普通“清空称呼”优先使用 `CLEARED`。

物理删除只用于明确的数据删除、身份删除或独立关系名资产删除。

### 13.5 重建 Recreate

用户在 `CLEARED` 或资产被删除后重新命名：

- 仍绑定当前有效身份；
- 不恢复旧名；
- 不复用旧状态作为成长证明；
- 新的 `revision` 或新资产版本由未来实现契约明确。

---

## 十四、消费者白名单

关系名只能被以下消费者以展示或资产管理目的读取。

| 消费者 | 可读取 | 用途 | 禁止 |
| --- | --- | --- | --- |
| Genesis First Encounter 关系层 | 是 | 命名后确认双重名称 | 不改变身份或 Renderer |
| Returning Life World / 首页回归层 | 是 | 告诉用户回到同一伙伴 | 不作为回归门禁 |
| Reality 同行表现壳 | 是，展示限定 | 以关系称呼保持同行感 | 不作为 Reality 条件或事件输入 |
| Life Sanctuary | 是 | 在个人生命空间显示伙伴称呼 | 不作为等级或收藏 |
| Archive 身份标题层 | 是，展示限定 | 在生命历史中保持同一伙伴关系 | 不写入 Crystal 或事件事实 |
| 关系名编辑与数据管理界面 | 是 | 读取、修改、清空、删除 | 不修改天地身份 |
| 用户数据导出 / 删除适配器 | 是 | 用户数据权利 | 不提供给算法推断 |

当前不授权：

- AI 将关系名作为分析输入；
- Renderer 读取关系名；
- Analytics 采集原始关系名；
- Pressure Seed 或成长系统读取关系名。

若未来 AI 仅为了称呼用户的生命伙伴而读取关系名，必须单独审查同意、隐私和提示注入边界。本 MAP 不授权。

---

## 十五、禁止消费者

### 15.1 Pressure Seed

Pressure Seed 回答：

> 现实中什么正在靠近这个生命。

关系名回答：

> 用户如何称呼这个生命。

让 Pressure Seed 读取关系名会：

- 把关系表达误当成现实证据；
- 产生语义偏置；
- 使改名触发现实理解漂移；
- 破坏同一现实输入的稳定性。

因此：

```text
Pressure Seed
不得读取关系名
```

### 15.2 Six Dimension

六维回答：

> 一次现实经历在身体、情绪、思维、行动、记忆和动机留下什么痕迹。

关系名不是生命痕迹，也不是任何维度的输入。

因此：

```text
Six Dimension
不得读取关系名
```

### 15.3 Gravity

Gravity 识别重复的保护回应。

关系名变化不等于惯性变化。

因此：

```text
Gravity
不得读取关系名
```

### 15.4 Choice

Choice 表达用户在现实中的新回应空间。

命名或改名不是 Choice 结果，也不能提高 Choice 成功率。

因此：

```text
Choice
不得读取关系名
```

### 15.5 Crystal

Crystal 记录被理解和转化的生命经历。

关系名不是奖励、成长值或转化证明。

因此：

```text
Crystal
不得读取关系名
```

### 15.6 Reality 条件

Reality 的入口条件只能来自既有生命身份、认出连续性与正式 Handoff。

关系名可以被 Reality 表现壳读取用于称呼，但：

```text
未命名
不能阻断 Reality

改名
不能重启 Reality

清空
不能终止 Reality
```

---

## 十六、现有安全承载位置审查

### 16.1 可以复用的容器

`guanyaoSessionPersistenceAdapter` 已提供：

- 固定存储入口 `guanyao_h5_session`；
- `GUANYAO_SESSION_V2` 版本包裹；
- 兼容旧未版本化会话的读取；
- 完整会话清除能力。

`sessionService` 已提供：

- 以独立资产 key 读写的模式；
- `launchLifeSourceSession`；
- `genesisVisualContinuity`；
- `genesisPresenceVisualRealization`；
- `sourceReferenceId` 一致性检查；
- 认出生命身份恢复门禁。

因此：

> 现有版本化会话资产容器是可复用的安全承载边界。

### 16.2 当前仍然缺失

容器存在不等于字段存在。

当前缺少：

- 专用关系名资产类型；
- 专用 asset key；
- 专用读写与清空 API；
- 引用失配校验；
- 生命周期测试；
- 消费者白名单门禁；
- 数据删除边界。

结论：

```text
安全容器：
△ 部分存在

安全关系名字段：
○ 不存在
```

### 16.3 推荐持久化位置

未来建议：

```text
GUANYAO_SESSION_V2
└── session
    ├── launchLifeSourceSession
    ├── genesisPresenceVisualRealization
    └── starBeastRelationshipNamingAsset
```

推荐 key：

```text
starBeastRelationshipNamingAsset
```

这是 MAP 命名建议，不是本刀新增字段。

### 16.4 为什么不使用单独 localStorage key

单独 key 会增加：

- 身份与关系资产不同步；
- 删除身份时漏删关系名；
- 恢复顺序漂移；
- 多个用户或未来账号切换时串名。

关系名与生命身份应该共享同一会话资产清理边界，但保持独立资产语义。

---

## 十七、持久化迁移与回滚单位

### 17.1 是否必须新增持久化字段

结论：

```text
YES
```

若要实现跨刷新和跨回归恢复，必须新增一个独立可选资产字段。

不能通过修改现有身份字段完成。

### 17.2 迁移方式

采用：

```text
Optional Asset
+
Lazy Write
+
No Backfill
```

具体规则：

- 不要求为全部旧用户生成空资产；
- 旧会话没有该 key 时视为合法未命名；
- 仅当用户主动命名时写入；
- 不从旧 `displayName`、`nickname` 或文案推断；
- 读取失败或引用失配时不阻断身份恢复；
- 关系名资产 schema 自身使用 V1；
- 当前根会话包裹为 V2，新增可选 key 不要求重写全部旧会话。

### 17.3 最小迁移单位

未来 Blade 3 的最小迁移单位只能包含：

1. 一个专用关系名资产类型；
2. 一个专用可选 asset key；
3. 专用 create / read / rename / clear / delete API；
4. `sourceReferenceId` 与身份引用校验；
5. Genesis / Returning Life World 的展示消费者；
6. 回归、跳过、改名、清空与失配测试；
7. 独立数据删除处理。

不得顺带包含：

- DOM → Renderer 迁移；
- Pressure Seed；
- Reality 因果调整；
- 六维；
- Gravity；
- Choice；
- Crystal；
- 五项既存门禁漂移治理。

### 17.4 回滚单位

完整回滚单位：

```text
关系命名 UI
+
关系名资产类型
+
关系名持久化 API
+
starBeastRelationshipNamingAsset key
+
关系名消费者
+
相关测试
```

回滚后：

- 身份仍可恢复；
- 天地之名仍可显示；
- 星兽仍是同一生命；
- Genesis → Reality 仍可继续；
- 未命名状态成为默认；
- Pressure Seed 与成长链不受影响。

不允许使用：

```text
删除整个 guanyao_h5_session
```

作为关系名回滚方式。

### 17.5 独立清理

未来需要专用资产清理：

```text
deleteStarBeastRelationshipNamingAsset()
```

其职责只能是移除关系名资产。

不能：

- 清除生命来源；
- 清除二十八宿；
- 清除 Recognized Presence；
- 清除 Reality；
- 清除 Crystal 或 Archive。

函数名仅用于映射责任说明，本刀不新增实现。

---

## 十八、读写门禁

### 18.1 写入门禁

写入关系名必须验证：

- 用户主动操作；
- 生命身份已经认出；
- 当前 `sourceReferenceId` 非空；
- 生命来源、Presence 与当前身份引用一致；
- 输入合法；
- 未进入自动命名；
- 未把 Life Whisper 原文直接当作名称。

### 18.2 读取门禁

读取关系名必须验证：

- asset schema 正确；
- `nameState` 与 `relationshipName` 一致；
- `sourceReferenceId` 与当前身份一致；
- 星兽身份引用一致；
- 二十八宿坐标引用一致；
- 当前消费者在白名单内。

### 18.3 输出门禁

关系名读取结果只能是：

```text
AVAILABLE
UNNAMED
CLEARED
UNAVAILABLE
```

不得输出：

- 人格结论；
- 关系等级；
- 星兽等级；
- Reality readiness；
- Pressure Seed；
- 成长值。

---

## 十九、隐私与数据治理边界

用户关系名是用户主动输入的个人表达。

因此未来实现必须：

- 不把原始关系名写入 console；
- 不默认发送给 AI；
- 不默认发送给分析服务；
- 不将其作为用户真实姓名；
- 不用于广告、画像或 Pressure Seed；
- 支持单独清空与删除；
- 在生命身份删除时级联删除；
- 在导出时明确标注为“用户给予的关系称呼”。

关系名不是：

- 账号姓名；
- 法定姓名；
- 认证主体；
- 出生身份；
- 命理结果。

---

## 二十、DOM → Renderer 边界

本 MAP 冻结：

```text
Relationship Naming
不得新增
DOM data 属性
↓
Renderer 反向读取
```

原因：

- 关系名是展示资产，不是视觉状态事实；
- Renderer 不应拥有关系状态；
- 当前 DOM → Renderer 债务已被单独标记为 `MAP / DEFER`；
- Blade 3 不得扩大隐式 DOM 通道。

关系名未来应由 React / Host 展示层显式读取。

Renderer：

- 不读取关系名；
- 不根据名字改变颜色、形态或节律；
- 不持有命名状态；
- 不产生自动命名。

---

## 二十一、五项既存门禁漂移边界

当前已有五项基线门禁漂移需要分别治理：

1. Genesis Recognition → Reality Entry 既存文案断言漂移；
2. Genesis Production Experience 对精确导航写法的旧断言；
3. Genesis → Reality Explicit Handoff 对精确导航写法的旧断言；
4. Reality Production Route Entry 对旧 hold 状态的断言；
5. Genesis WebGL Renderer Core Extraction 的消费者清单漂移。

本刀对它们的裁决：

```text
MAP SEPARATELY
```

本刀没有：

- 修改这些检查；
- 修改产品 Runtime；
- 借命名 MAP 清理历史门禁；
- 将门禁漂移纳入 Blade 3。

---

## 二十二、控制面裁决

### NOW

```text
Relationship Naming
资产与持久化 MAP
```

结果：

`COMPLETE`

### MAP

```text
五项既存门禁漂移
分别治理
```

### DEFER

```text
Blade 3 实施
DOM → Renderer 迁移
```

### REJECT

- 直接把关系名写入天地身份；
- 修改二十八宿或星兽身份；
- 强制命名；
- 自动命名；
- 由 Life Whisper 推断名字；
- 未命名禁止 Reality；
- 借 Blade 3 清理无关架构债务；
- 用改名触发 Pressure Seed、Choice 或 Crystal；
- 让 Renderer 反向读取 DOM 命名状态。

---

## 二十三、Blade 3 重新申请条件

本 MAP 已明确：

- 权威资产；
- 身份绑定；
- 双重名称关系；
- 新老用户恢复；
- 创建、修改、清空与删除生命周期；
- 消费者白名单；
- 禁止消费者；
- 持久化位置；
- 迁移方式；
- 回滚单位。

这意味着：

> Relationship Naming 的资产前置 MAP 已完成。

但：

> MAP 完成不是 Blade 3 自动获批。

Blade 3 仍保持 `DEFER`，需要重新提交 `NOW` 申请，并证明：

1. 只施工 Layer 3 Relationship；
2. 不修改 Layer 2 Identity；
3. 不扩大 DOM → Renderer 通道；
4. 不吸收五项既存门禁漂移；
5. 持久化只新增独立可选资产；
6. 未命名、清空和存储失败均不阻断同行；
7. 回滚可以只移除关系命名能力；
8. 提交边界可以与脏工作树安全区分。

---

## 二十四、最终映射表

| 问题 | 冻结答案 |
| --- | --- |
| 用户关系名由谁持有 | 独立 `StarBeastRelationshipNamingAsset` |
| 是否修改星兽身份 | 否；它是附加关系资产 |
| 如何绑定同一生命 | `sourceReferenceId` + 星兽身份引用 + 宿坐标引用 |
| 天地之名与用户之名如何并存 | 天地之名保持身份权威，用户之名作为关系称呼叠加展示 |
| 新用户如何恢复 | 先恢复身份，再校验并读取关系名资产 |
| 老用户未命名 | 合法状态，继续天地之名，不阻断同行 |
| 老用户已命名 | 引用一致时恢复同一关系名 |
| 老用户改名 | 更新同一关系资产，不重建身份 |
| 跳过命名 | 不写失败，不写默认名，不阻断 Reality |
| 清空 | 写 `CLEARED`，关系与身份继续 |
| 删除 | 只删关系名资产；删除身份时级联删除 |
| 可读消费者 | First Encounter、回归层、Reality 展示壳、Sanctuary、Archive 标题、数据管理 |
| 禁止消费者 | Pressure Seed、六维、Gravity、Choice、Crystal、Renderer |
| 是否已有安全承载 | 有可复用会话资产容器；无正式关系名字段 |
| 是否需要新字段 | 是，一个独立可选资产 key |
| 迁移方式 | Optional Asset + Lazy Write + No Backfill |
| 回滚单位 | 命名 UI、专用资产、API、消费者和测试；不动身份与成长链 |

---

## 二十五、最终裁决

冻结：

```text
天地之名
=
身份权威
=
不可修改

用户关系名
=
关系资产
=
可选、可延后、可修改、可撤回
```

最终链路：

```text
同一 sourceReferenceId
↓
同一二十八宿天地身份
↓
同一星兽身份
↓
用户可选给予关系名
↓
关系名独立恢复
↓
未命名仍可继续同行
```

本刀结论：

> 用户关系名有明确的独立资产边界，也有可复用的持久化容器；但当前没有正式 Runtime。下一步不得直接写入身份字段，也不得自动进入 Blade 3 施工。
