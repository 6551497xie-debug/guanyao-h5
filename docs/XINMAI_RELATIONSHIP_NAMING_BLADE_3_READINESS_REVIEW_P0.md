# XINMAI Relationship Naming Blade 3 Readiness Review P0

项目：

`/Users/xieyanjun/Desktop/guanyao-h5`

模式：

Relationship Naming Major Blade 3 施工就绪审查。

性质：

READINESS / NOW DECISION。

本刀：

- 只新增施工就绪审查文档；
- 不修改代码；
- 不新增类型；
- 不新增持久化字段；
- 不实施命名 UI；
- 不迁移 Renderer；
- 不改变现有 Runtime。

---

## 一、Construction State Card

```text
当前 Phase：
Phase 1 → Phase 2

当前阶段目标：
生命身份建立
↓
生命关系建立

当前 A 主线：
First Encounter → Life Companion

本刀类型：
READINESS

主影响 Layer：
Layer 3｜Relationship

保护 Layer：
Layer 2｜Identity

保护消费者：
Genesis Recognition
Life Whisper
StarBeast First Response
Genesis → Reality
Returning Life World

是否跨 Phase：
NO

是否需要迁移审计：
前置 MAP 已完成

本刀决策：
NOW — READY WITH STRICT SCOPE
```

---

## 二、最终就绪裁决

冻结：

```text
Blade 3 — Relationship Naming

READINESS：
PASS

施工决策：
NOW

施工类型：
Major Blade

范围：
Layer 3 Relationship Only
```

该结论不是授权进行泛化重构。

它只授权：

> 用户在第一次关系回应稳定后，可选地给予同一生命一个关系称呼，并让该称呼作为独立关系资产被安全恢复。

不授权：

- 修改天地身份；
- 修改二十八宿；
- 修改 StarBeast 身份；
- 修改 Renderer；
- 迁移 DOM → Renderer；
- 修改 Reality 因果；
- 修改 Pressure Seed；
- 进入 Phase 3；
- 清理其他历史债务。

---

## 三、前置条件核验

### 3.1 远程基线完整性

状态：

```text
PASS
```

证据：

- 远程基线完整性修复已完成；
- TypeScript 已通过；
- Production Build 已通过；
- Blade 2 / XINMAI 既有检查已通过；
- 五项漂移门禁已按权威 Runtime 校准；
- 远程 HEAD 可独立构建。

当前审查基线：

```text
3204858b144e5f729b7d6a86348f9cd420488bc0
```

### 3.2 Blade 2 Delivery

状态：

```text
CLOSED
```

证据提交：

```text
435793447b885471ecddb3a3c803e15030152141
```

当前已有：

```text
Life Whisper 提交 / 跳过
↓
同一星兽回应
↓
回应进入新稳态
↓
仍可进入 Reality
```

### 3.3 Relationship Naming Asset Persistence MAP

状态：

```text
PASS
```

证据：

`XINMAI_RELATIONSHIP_NAMING_ASSET_PERSISTENCE_MAPPING_P0`

已冻结：

- 关系名资产所有权；
- `sourceReferenceId` 绑定；
- 天地之名与用户关系名并存；
- 新老用户恢复；
- 创建、修改、清空、删除生命周期；
- 消费者白名单；
- 禁止消费者；
- Optional Asset + Lazy Write + No Backfill；
- 独立迁移与回滚单位。

### 3.4 Relationship State → Host → Renderer MAP

状态：

```text
PASS
```

证据：

`XINMAI_RELATIONSHIP_STATE_HOST_TO_RENDERER_CONSUMPTION_MAPPING_P0`

已冻结：

- Relationship 状态权威；
- Host Visual Facts 职责；
- Renderer 只消费视觉事实；
- `data-*` 只作为观测镜像；
- 关系名永久禁止进入 Renderer；
- DOM → Renderer 不得继续扩张。

### 3.5 阶段适配

状态：

```text
PASS
```

Relationship Naming：

- 增强用户参与；
- 建立关系；
- 不进入 Reality 理解；
- 不进入成长；
- 不触发 Pressure Seed；
- 不成为同行门槛。

### 3.6 工作树隔离

状态：

```text
PASS
```

实施可继续使用独立干净工作树。

主工作树中的既存修改：

- 视为受保护资产；
- 不纳入 Blade 3；
- 不 reset；
- 不 checkout；
- 不批量暂存。

---

## 四、当前 Runtime 证据

采用：

```text
✓ 已存在 Runtime
△ 部分存在
○ 尚未实施
```

| 能力 | 状态 | 判断 |
| --- | --- | --- |
| 同一生命身份 | ✓ | `LaunchLifeSourceSession` |
| 二十八宿坐标引用 | ✓ | `birthMansion.coordinateReferenceId` |
| StarBeast 身份引用 | ✓ | `personalRevealProjection.identityReferenceId` |
| Recognition | ✓ | 正式关系会话 |
| Recognition 回应稳定 | ✓ | `recognitionResponseSettled` |
| Life Whisper 提交 / 跳过 | ✓ | `lifeWhisperFact` |
| StarBeast First Response 稳定 | ✓ | `lifeWhisperResponsePhase` |
| 版本化 Session 容器 | ✓ | `GUANYAO_SESSION_V2` |
| 独立资产 key 写入模式 | ✓ | `sessionService` |
| Returning Life World | ✓ | `LaunchLab` |
| 关系名资产类型 | ○ | Blade 3 新增 |
| 关系名 asset key | ○ | Blade 3 新增 |
| 命名持久化 API | ○ | Blade 3 新增 |
| Genesis 命名交互 | ○ | Blade 3 新增 |
| Returning 关系名展示 | ○ | Blade 3 新增 |
| Rename / Clear / Delete API | ○ | Blade 3 新增 |
| Renderer 命名消费 | 禁止 | 永久不实施 |

---

## 五、Blade 3 唯一目标

```text
同一生命已被认出
↓
第一次关系回应稳定
↓
用户可选给予一个称呼
↓
天地身份保持不变
↓
关系称呼作为独立资产保存
↓
再次回来仍认得同一关系
```

本刀只回答：

> 用户能否给已经认出的同一生命一个可选、可恢复、可撤回的关系称呼？

达到即停止。

---

## 六、用户关系名的资产定义

### 6.1 所属 Layer

```text
Layer 3
Relationship
```

不是：

```text
Layer 2
Identity
```

### 6.2 天地之名

天地之名来自：

- 二十八宿；
- 四象方向；
- StarBeast 身份来源。

例如：

```text
北方玄武 · 壁水貐
```

它是：

```text
Identity Authority
```

不可被用户关系名覆盖或修改。

### 6.3 用户关系名

用户关系名是：

```text
Relationship Asset
```

例如：

```text
安泉
```

它：

- 可选；
- 可延后；
- 可修改；
- 可清空；
- 可删除；
- 不改变身份；
- 不产生新的星兽。

### 6.4 双重名称

冻结展示关系：

```text
天地之名
+
用户关系名
```

不是：

```text
用户关系名
替换
天地之名
```

---

## 七、关系名资产最小契约

Blade 3 允许新增一个专用类型：

```text
StarBeastRelationshipNamingAssetV1
```

最小字段：

```text
schemaVersion
assetKind
sourceReferenceId
starBeastIdentityReferenceId
mansionCoordinateReferenceId
nameState
relationshipName
createdAt
updatedAt
revision
```

状态：

```text
NAMED
CLEARED
```

读取结果：

```text
AVAILABLE
UNNAMED
CLEARED
UNAVAILABLE
```

### 7.1 不得复制进资产

- 二十八宿显示名称；
- 四象名称；
- 完整 StarBeast 身份；
- Life Whisper 原文；
- Pressure Seed；
- Reality；
- Six Dimension；
- Gravity；
- Choice；
- Crystal；
- AI 输出。

天地身份始终从身份权威重新读取。

---

## 八、身份绑定门禁

### 8.1 写入前

必须同时成立：

```text
Recognition 已确认
↓
Presence = RECOGNIZED
↓
sourceReferenceId 一致
↓
StarBeast Identity Reference 可验证
↓
Mansion Coordinate Reference 可验证
↓
用户主动提交
```

关系名不得仅凭：

- 页面存在；
- Life Whisper 文本；
- URL；
- fixture；
- preview；
- 旧 localStorage 字段；

写入。

### 8.2 身份引用来源

允许使用：

```text
sourceReferenceId
=
当前正式 Real User Source

starBeastIdentityReferenceId
=
personalRevealProjection.identityReferenceId

mansionCoordinateReferenceId
=
twentyEightMansionCoordinateProjection
  .birthMansion
  .coordinateReferenceId
```

禁止：

- 从关系名生成引用；
- 从显示文案生成引用；
- 从四象名称生成引用；
- 按用户名字搜索星兽；
- 修改原身份引用。

### 8.3 读取时

只有以下全部一致，关系名才可显示：

```text
namingAsset.sourceReferenceId
===
activeLifeSource.sourceReferenceId
===
recognizedPresence.sourceReferenceId

namingAsset.starBeastIdentityReferenceId
===
activePersonalReveal.identityReferenceId

namingAsset.mansionCoordinateReferenceId
===
activeMansionCoordinate.coordinateReferenceId
```

失配：

- 不显示关系名；
- 不重新绑定；
- 不阻断同行；
- 不修改身份；
- 不输出用户原名到 console。

---

## 九、入口时机

### 9.1 正确位置

```text
Recognition
↓
同一生命回应稳定
↓
Life Whisper 提交并回应稳定
或
用户明确暂时不说
↓
可选命名
↓
进入 Reality 仍然可用
```

### 9.2 最小开放条件

命名邀请只能在以下条件成立时出现：

```text
recognitionResponseSettled = true

AND

lifeWhisperFact = WHISPER_SKIPPED

OR

lifeWhisperFact = WHISPER_SUBMITTED
AND
lifeWhisperResponsePhase = SETTLED
```

同时必须继续满足：

- Recognition Session 为 READY；
- `interactionAvailability = ENTER_REALITY`；
- Presence Recognition Continuity 为 READY；
- 同一 `sourceReferenceId`。

### 9.3 Life Whisper 尚未动作

若：

```text
lifeWhisperFact = NONE
```

则：

- 不主动展示命名邀请；
- 用户仍可直接进入 Reality；
- 不把进入 Reality 解释为命名跳过；
- 不写默认名字；
- 不写 `CLEARED`。

### 9.4 为什么命名不能提前

命名发生在回应前，会把流程变成：

```text
先给角色取名
↓
再尝试建立关系
```

这会回退为宠物或角色创建。

正确关系：

```text
先认出
↓
先产生回应
↓
关系已经存在
↓
再给予称呼
```

---

## 十、输入规则

Blade 3 只允许用户主动输入。

### 10.1 合法输入

- 去除首尾空白后非空；
- 单行；
- 最长 12 个 Unicode code points；
- 允许中文、英文、数字与常见空格；
- 不自动改写；
- 不自动翻译；
- 不自动补全。

### 10.2 非法输入

- 纯空白；
- 换行；
- 控制字符；
- 超出长度上限；
- 由 Life Whisper 自动复制；
- 由 AI 自动生成；
- 由系统默认分配。

### 10.3 不增加内容审核系统

本 Blade 不新增：

- AI 命名建议；
- 敏感词 Engine；
- 人格推断；
- 自动语义过滤；
- 社交公开名称规则。

这是私人关系称呼，不是公共用户名。

输入安全只处理：

- 长度；
- 空白；
- 控制字符；
- 存储边界。

---

## 十一、持久化承载

### 11.1 容器

复用：

```text
GUANYAO_SESSION_V2
```

结构：

```text
guanyao_h5_session
└── session
    ├── launchLifeSourceSession
    ├── genesisPresenceVisualRealization
    └── starBeastRelationshipNamingAsset
```

### 11.2 新 key

允许新增：

```text
starBeastRelationshipNamingAsset
```

它必须：

- 是可选字段；
- Lazy Write；
- No Backfill；
- 不要求旧用户迁移；
- 不单独创建第二个 localStorage root key。

### 11.3 专用 API

Blade 3 必须提供专用能力：

```text
read
create
rename
clear
delete
```

建议语义：

```text
readStarBeastRelationshipNamingAsset
createStarBeastRelationshipNamingAsset
renameStarBeastRelationshipNamingAsset
clearStarBeastRelationshipNamingAsset
deleteStarBeastRelationshipNamingAsset
```

具体函数名可以随现有工程规范调整。

但不得：

- 让页面直接操作 localStorage；
- 让页面直接改写完整 session；
- 复用 Pressure Seed Persistence；
- 复用账号 nickname；
- 修改 `LaunchLifeSourceSession`。

---

## 十二、已认出生命持久化时机风险

### 12.1 当前事实

当前：

```text
persistRecognizedGenesisLifeAssets
```

在用户点击进入 Reality 时调用。

Relationship Naming 发生在进入 Reality 之前。

因此存在风险：

```text
用户命名
↓
关闭页面
↓
Recognized Presence 尚未持久化
↓
返回时无法先恢复已认出生命
↓
关系名不能安全消费
```

### 12.2 裁决

这不是新增身份模型的理由。

Blade 3 允许：

> 在用户主动命名时，复用现有 `persistRecognizedGenesisLifeAssets` 保存已经成立的 Recognition 事实，然后写入关系名资产。

前提：

- 当前 Presence 已经是 `RECOGNIZED`；
- 当前 Visual Continuity 已经完整；
- 所有 `sourceReferenceId` 一致；
- 不修改 `persistRecognizedGenesisLifeAssets` 的身份 schema；
- 不创建第二份身份；
- 不让关系名成为身份恢复依据。

### 12.3 正确写入顺序

```text
Recognition 已成立
↓
复用既有身份持久化
↓
验证已认出身份可以读回
↓
写入独立关系名资产
↓
验证关系名引用一致
```

禁止：

```text
先写关系名
↓
以后用关系名重建身份
```

### 12.4 失败处理

若身份无法读回：

- 不写关系名资产；
- 当前交互周期可保留用户输入的称呼；
- 不声称已经保存；
- 不阻断 Reality；
- 不修改身份；
- 不进入重试循环。

若身份可读回、关系名写入失败：

- 当前交互周期可显示；
- 不声称永久保存；
- Reality 仍然可进入；
- 下次以真实读回结果为准。

### 12.5 为什么这不改变身份模型

允许的是：

```text
复用既有 Recognized Identity Persistence
```

不是：

```text
新增身份字段
修改二十八宿
重新生成星兽
用关系名决定身份
```

身份已经在 Recognition 中成立。

命名只要求既有事实在关系资产写入前可恢复。

---

## 十三、新用户路径

### 13.1 命名

```text
星兽被认出
↓
Life Whisper 回应稳定或明确跳过
↓
出现轻量命名邀请
↓
用户输入关系称呼
↓
身份引用校验
↓
保存关系名资产
↓
显示天地之名 + 用户关系名
↓
仍可进入 Reality
```

### 13.2 暂时不命名

必须提供：

```text
以后再说
```

或同等语义。

结果：

- 不写 `NAMED`；
- 不写 `CLEARED`；
- 不写默认名；
- 不形成失败；
- 不阻断 Reality；
- 不降低关系；
- 不重复弹出阻断式邀请。

### 13.3 直接进入 Reality

现有 Reality CTA 必须继续可用。

命名邀请：

- 不能遮挡 CTA；
- 不能替换 CTA；
- 不能成为导航条件；
- 不能延长强制等待；
- 不能触发新的路线。

---

## 十四、老用户路径

### 14.1 未命名

```text
Recognized Identity 可恢复
+
Naming Asset 不存在
```

结果：

- 合法 `UNNAMED`；
- 使用天地之名；
- 不阻断回归；
- 不自动生成关系名；
- 可在未来关系入口命名。

### 14.2 已命名

引用全部一致：

- 恢复关系名；
- 天地之名仍然存在；
- 显示同一个生命；
- 不重新播放 Genesis；
- 不重新命名。

### 14.3 已清空

```text
nameState = CLEARED
relationshipName = null
```

结果：

- 使用天地之名；
- 不自动恢复旧名字；
- 不自动重新弹出；
- 同行继续。

### 14.4 引用失配

结果：

- 关系名 `UNAVAILABLE`；
- 不显示旧名字；
- 不改绑；
- 不删除当前身份；
- 不阻断回归。

### 14.5 改名

改名：

- 更新同一关系资产；
- `sourceReferenceId` 不变；
- identity references 不变；
- `createdAt` 不变；
- `updatedAt` 更新；
- `revision + 1`；
- 不创建第二只星兽。

### 14.6 清空

清空：

- 写 `CLEARED`；
- 保持关联引用；
- `relationshipName = null`；
- 不删除身份；
- 不阻断同行。

### 14.7 删除

删除：

- 只移除关系名资产；
- 不删除身份；
- 不删除 Reality；
- 不删除 Crystal；
- 不删除 Archive；
- 不清空整个 Session。

---

## 十五、消费者白名单

Blade 3 首次施工只激活：

| 消费者 | 权限 |
| --- | --- |
| Genesis First Encounter | 创建关系名、显示双重名称 |
| Returning Life World | 读取并显示关系称呼 |
| 专用关系名资产管理 API | read / create / rename / clear / delete |
| 数据清理入口 | 删除专用关系资产 |

允许但本刀不必激活：

- Reality 同行文字壳；
- Life Sanctuary；
- Archive 标题。

这些消费者未来需要单独施工。

---

## 十六、禁止消费者

永久禁止：

### Renderer

- 不读取关系名；
- 不接收关系名；
- 不新增 `data-relationship-name`；
- 不根据名字改变视觉。

### Pressure Seed

- 不读取；
- 不分类；
- 不排序；
- 不把名字当现实事件。

### Six Dimension

- 不把名字当身体、情绪、思维、行动、记忆或动机。

### Gravity

- 不把命名与惯性判断关联。

### Choice

- 不把命名当作新回应完成。

### Crystal

- 不因命名生成 Crystal；
- 不把名字写入 Crystal 属性。

### AI

- 不自动命名；
- 不读取关系名作为分析输入；
- 不从 Life Whisper 推断名字。

---

## 十七、UI 边界

### 17.1 位置

Genesis：

```text
Life Whisper 稳定区之后
Reality CTA 之前或并列
```

必须保持：

- 同一星河；
- 同一星兽；
- 同一核心；
- 星兽仍是视觉主体；
- 输入区域轻量；
- 不新增独立页面。

### 17.2 文案语义

方向：

```text
如果愿意，你可以这样称呼它
```

避免：

- 创建角色名；
- 注册昵称；
- 领取星兽；
- 绑定宠物；
- 必须命名才能继续。

### 17.3 提交反馈

提交后只确认关系：

```text
天地之名 · 用户关系名
```

或同等克制表达。

禁止：

- “命名成功”系统 Toast；
- 奖励动画；
- 解锁音效；
- Crystal；
- 等级；
- 角色卡。

### 17.4 存储失败

不得使用：

```text
保存失败，无法继续
```

应保持同行。

若需要用户提示，语义必须是：

```text
这个称呼暂时只留在此刻。
```

不得声称已经永久保存。

---

## 十八、Renderer 与 DOM 边界

Blade 3 必须保证：

```text
Renderer files changed = 0
```

禁止修改：

- `src/renderers/genesisWebGLRendererCore.ts`
- `src/types/genesisWebGLRendererCore.ts`
- `src/renderers/genesisProductionRendererHost.ts`
- `src/components/RealityLifeUniverseCanvas.tsx`

禁止新增：

- `data-relationship-name`
- `data-naming-state` 供 Renderer 读取
- `canvas.closest(...)`
- `getAttribute(...)`
- Renderer Visual Facts 命名字段

允许：

- React 文案层直接显示关系名；
- 页面自身的 QA observation attribute。

如果增加 QA attribute：

- 必须只在页面层；
- 不包含原始关系名；
- 只能表达 `UNNAMED / NAMED / CLEARED / UNAVAILABLE`；
- Renderer 不得读取。

---

## 十九、允许施工文件边界

未来 Blade 3 可申请修改：

### 新增

- 专用关系名资产类型；
- 专用关系名门禁检查；
- 必要的纯函数或测试。

### 修改

- `src/services/sessionService.ts`
- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/styles/genesis-production-experience.css`
- `src/pages/LaunchLab.tsx`

仅在能够证明最小范围时修改。

### 不建议新增

- 新 Engine；
- 新路由；
- 新页面；
- 新 localStorage adapter；
- 新 Reality Host；
- 新 Renderer Host；
- 新 AI service。

---

## 二十、Major Blade 3 最小提交单位

必须作为一个可解释的关系能力提交：

```text
Naming Asset Type
+
Session Asset Key
+
Read / Create / Rename / Clear / Delete
+
Identity Reference Validation
+
Genesis Optional Naming UI
+
Returning Life World Read Consumer
+
Lifecycle Checks
```

原因：

- 只有 UI 没有恢复，是假关系；
- 只有持久化没有用户入口，是孤立资产；
- 只有创建没有清空删除，生命周期不完整；
- 只有名字没有身份引用，会污染 Layer 2。

---

## 二十一、回滚单位

完整回滚：

```text
关系命名 UI
+
关系名资产类型
+
关系名 asset key
+
专用 API
+
Returning Consumer
+
相关检查
```

回滚后：

- 天地之名继续；
- StarBeast 仍是同一身份；
- Life Whisper 继续；
- First Response 继续；
- Genesis → Reality 继续；
- 老用户回归继续；
- Pressure Seed 与 Growth 不受影响。

禁止回滚方式：

- 删除 `guanyao_h5_session`；
- 删除 `LaunchLifeSourceSession`；
- 删除 Recognition Presence；
- 回退 Reality；
- 修改二十八宿；
- 清除 Crystal。

---

## 二十二、Runtime 验收矩阵

### A｜新用户命名

```text
Recognition
↓
Life Whisper 提交
↓
StarBeast 回应稳定
↓
可选命名出现
↓
用户主动命名
↓
显示天地之名 + 用户关系名
↓
Reality CTA 仍可使用
```

必须证明：

- 同一 `sourceReferenceId`；
- 同一 StarBeast identity reference；
- 同一 mansion coordinate reference；
- 无 Renderer 变化；
- 无 Pressure Seed。

### B｜新用户暂不命名

```text
回应稳定
↓
以后再说
↓
不形成失败
↓
不写默认名
↓
仍可进入 Reality
```

### C｜Life Whisper 跳过后命名

```text
WHISPER_SKIPPED
↓
关系仍成立
↓
命名可选
↓
同行不被阻断
```

### D｜未动作直接进入 Reality

```text
Life Whisper Fact = NONE
↓
不强制命名
↓
Reality 入口保持
```

### E｜刷新恢复

```text
新用户命名
↓
刷新
↓
先恢复 Recognized Identity
↓
校验关系名引用
↓
恢复双重名称
```

### F｜老用户未命名

```text
Recognized Identity 可恢复
+
Naming Asset 不存在
↓
天地之名
↓
正常回归
```

### G｜老用户已命名

```text
引用一致
↓
恢复用户关系名
↓
同一生命继续
```

### H｜改名

- 同一资产；
- revision 更新；
- identity references 不变；
- 不创建新身份。

### I｜清空

- `CLEARED`；
- 天地之名继续；
- 同行继续；
- 不恢复旧名字。

### J｜删除

- 专用资产消失；
- Identity 保留；
- Reality 保留；
- Growth 保留。

### K｜引用失配

- 返回 `UNAVAILABLE`；
- 不显示关系名；
- 不改绑；
- 不阻断。

### L｜存储不可用

- 当前周期可以显示；
- 不声称永久保存；
- Reality 继续；
- 下次以真实读回为准。

### M｜边界保护

必须证明没有：

- Renderer 修改；
- DOM → Renderer 新通道；
- Pressure Seed 读取；
- Six Dimension 读取；
- Gravity 读取；
- Choice 读取；
- Crystal 读取；
- AI 请求；
- Life Whisper 原文持久化。

---

## 二十三、门禁要求

Blade 3 必须新增或强化检查，覆盖：

### Asset

- schema；
- key；
- identity references；
- optional asset；
- no backfill；
- invalid asset rejection。

### Lifecycle

- create；
- read；
- rename；
- clear；
- delete；
- revision；
- timestamp continuity。

### UI

- 正确开放条件；
- 自愿命名；
- 跳过；
- Reality 不阻断；
- 输入长度；
- 当前星兽保持主体。

### Return

- unnamed；
- named；
- cleared；
- unavailable；
- source mismatch。

### Negative

- no Renderer；
- no Pressure Seed；
- no AI；
- no Growth；
- no identity mutation；
- no raw name log；
- no Life Whisper copy；
- no new route。

---

## 二十四、停止条件

以下任一出现，Blade 3 必须停止：

1. 必须修改二十八宿计算；
2. 必须修改 StarBeast 身份；
3. 必须把关系名写入 `LaunchLifeSourceSession`；
4. 必须修改 Renderer；
5. 必须新增 DOM → Renderer 通道；
6. 必须修改 Pressure Seed；
7. 必须修改 Reality 条件；
8. 必须把命名作为同行门槛；
9. 必须自动命名；
10. 必须保存 Life Whisper 原文；
11. 必须新增 AI；
12. 必须清空整个 Session 才能删除关系名；
13. 无法将提交与主脏工作树区分；
14. 存储失败导致用户无法继续；
15. 施工自然扩张到 Host → Renderer 迁移。

---

## 二十五、产品验收四问

### 用户有没有参与

```text
YES
```

用户主动给予或不给予称呼。

### 世界有没有回应

```text
YES
```

同一生命接受关系称呼，但不变成另一个身份。

### 生命有没有变化

```text
关系发生变化
身份不发生变化
```

### 用户有没有留下痕迹

```text
YES
```

留下独立、可撤回的关系资产。

---

## 二十六、控制面裁决

### NOW

```text
Relationship Naming Major Blade 3
```

前提：

- 严格使用本文件范围；
- 隔离工作树；
- 精确提交；
- 全量身份与关系回归。

### MAP

```text
Relationship Naming 后续 Reality / Sanctuary / Archive 展示消费者
```

不并入首次 Blade 3。

### DEFER

```text
DOM → Renderer Runtime Migration
Reality Renderer Host Extraction
AI Long-term Relationship Memory
Public / Social Naming
```

### REJECT

```text
关系名写入天地身份
强制命名
自动命名
关系名进入 Renderer
关系名进入 Pressure Seed
关系名生成 Crystal
借 Blade 3 清理无关架构债务
```

---

## 二十七、Blade 3 施工任务卡

下一刀名称：

```text
XINMAI-RELATIONSHIP-NAMING-MAJOR-BLADE-3-P0
```

任务状态：

```text
READY
```

决策：

```text
NOW
```

唯一目标：

> 用户可以在第一次关系回应稳定后，自愿给予同一生命一个关系称呼；这个称呼能够随同一生命恢复，但永远不改变它的天地身份。

Definition of Done：

1. 关系名是独立可选资产；
2. 三项身份引用全部一致；
3. 新用户可以命名或以后再说；
4. 未命名不阻断 Reality；
5. 已命名老用户可以恢复；
6. 未命名、已清空、引用失配均安全；
7. Rename / Clear / Delete 生命周期有门禁；
8. 存储失败不阻断同行；
9. Renderer 修改为 0；
10. Pressure Seed / Growth 修改为 0；
11. Identity schema 修改为 0；
12. 提交可以完整独立回滚。

---

## 二十八、最终冻结

Blade 3 可以进入施工。

不是因为“产品需要一个命名功能”。

而是因为以下关系已经成立：

```text
生命身份已经稳定
↓
第一次关系回应已经成立
↓
关系资产边界已经明确
↓
持久化容器已经存在
↓
Renderer 边界已经冻结
↓
命名可以作为独立关系动作施工
```

最终裁决：

> `XINMAI-RELATIONSHIP-NAMING-MAJOR-BLADE-3-P0` 可以进入 NOW。施工必须让用户之名附着于同一生命，而不是改写天地之名；命名可以被延后和撤回，同行不能被它阻断。
