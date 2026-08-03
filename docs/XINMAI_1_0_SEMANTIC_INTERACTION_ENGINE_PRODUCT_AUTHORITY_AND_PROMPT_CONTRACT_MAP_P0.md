# XINMAI 1.0 Semantic Interaction Engine Product Authority and Prompt Contract MAP P0

任务编号：

`XINMAI-1.0-SEMANTIC-INTERACTION-ENGINE-PRODUCT-AUTHORITY-AND-PROMPT-CONTRACT-MAP-P0`

基线：`fb1feca46daacd2519e75ab80640545b75d5e0cb`

刀型：`Product Semantic / Authority MAP`

决策：`NOW — MAP ONLY`

## 一、总裁决

```text
Current Production AI / LLM Consumers：
0

Existing Product Authorities：
KEEP / UNCHANGED

AI Role in 1.0：
CANDIDATE MIRROR ONLY

Prompt Runtime：
NOT ESTABLISHED / DEFER

Three Talents：
PROTOCOL-LEVEL RESPONSIBILITY CANDIDATES / NO USER ATTRIBUTE

Four-step Reflection：
KEEP AS PRESENTATION PRINCIPLE
AI RUNTIME NOT ESTABLISHED

Six Dimensions：
KEEP EXISTING PRESENTATION COORDINATES
REJECT PERSONALITY OR GROWTH AUTHORITY

破执 / 观势 / 定心：
KEEP AS EXPERIENCE PRINCIPLES / NO PERSISTED STATE

Six Lifecycle Phases：
DEFER TO 2.0 LONGITUDINAL RESEARCH

New Bagua Personality Test：
REJECT IN 1.0

Next Runtime Knife：
YELLOW MAJOR BLADE PREP REQUIRED
NOT AUTHORIZED BY THIS MAP
```

最高产品原则冻结为：

> 让选择的保护、收益与代价显形；让用户在现实中决定拿起什么、放下什么；系统不审判，真实行动才形成成长留痕。

本 MAP 不把哲学名词变成第二套 Relationship、Choice 或 Growth Runtime。所有未来语义能力必须附着于已经成立的单向因果链，不能替代、绕过或重解释既有事实权威。

## 二、审计方法与事实分层

本 MAP 只读取生产源码、类型、服务、页面、正式路由、开发隔离声明和既有协议。未运行模型、未调用外部 AI、未写入用户数据，也未修改 Runtime、Prompt Runtime、Storage、Schema、Gate、Renderer、CSS 或页面文案。

为避免把“页面说了什么”误当成“系统知道什么”，审计使用以下分层：

| 层级 | 定义 | 能否推进 Authority |
| --- | --- | --- |
| `USER_FACT` | 用户通过正式动作明确确认的事实或意愿 | 只能经现有 Controller 与事务复验后推进 |
| `SYSTEM_FACT` | 由现有确定性 Authority 在事务完成后形成的事实 | 可以被下游只读消费 |
| `CANDIDATE` | 系统、规则或未来 AI 提出的可撤回解释或行动候选 | 不能直接推进 |
| `PRESENTATION` | 页面、Canvas、文案或视觉对既有事实的表达 | 永远不能反向写 Authority |
| `LOCAL_EXPERIENCE` | 当前页面周期中的交互节奏或恢复提示 | 不能成为跨周期真源 |
| `LEGACY_COMPATIBILITY` | 历史页面、兼容解释或开发资产 | 不得复活为生产权威 |

## 三、当前正式生产语义链

### 3.1 唯一因果关系

```text
Curated Pressure Candidate
↓ 用户明确认出
Pressure Recognition Receipt
↓
Gravity Observation Available
↓ 用户明确认出
Gravity Observation Recognized
↓
Deterministic Action Route Candidates
↓ 用户明确选择
Choice V2 COMMITTED + Observation CONSUMED_BY_CHOICE
↓ 用户明确离场
Departure Receipt
↓ 用户明确回来
Idempotent Reality Intent + Return Receipt
↓ 用户明确报告
Lived Response Fact
↓
Crystal Eligibility
↓
Production Formation Orchestrator
↓
Formation Receipt + Canonical Crystal
↓
Canonical Body Imprint Read Model
↓
Typed Presentation Facts
```

AI 不在这条现有生产链中。代码依赖中没有 OpenAI、Anthropic、Gemini、Cohere 或其他 LLM SDK；生产源码中也没有聊天补全、模型调用或远程 Prompt Consumer。当前正式 AI / LLM 消费者数量必须记录为 `0`。

### 3.2 当前生产者、权威与消费者表

| 资产 | 候选或输入生产者 | 唯一确认者 / 写入者 | 正式消费者 | 分层 | AI 现状 |
| --- | --- | --- | --- | --- | --- |
| Pressure Candidate | `realityProductionPressureSeedConsumer` 与策划矩阵 | 候选本身无事实权威 | `RealityPressureSeedPresentation`、`RealityProductionHost` | `CANDIDATE` | `0` |
| Pressure Recognition | 用户在正式候选上明确动作 | `recognizeRealityPressureCandidate()` / `xinmaiRealityPressureRecognitionController` | Reality→Gravity Transfer、Admission、Recovery | `USER_FACT` 经事务形成 Receipt | `0` |
| Gravity Observation | `xinmaiGravityEncounterContinuityController` 建立 available observation | `recognizeGravityObservation()` | Gravity Recovery、Action Route Input、Choice Transaction | `USER_FACT` 经事务形成 recognized state | `0` |
| Action Route Candidate | 七类原型目录 + `resolveChoiceActionRoutes()` | `validateChoiceActionRouteCandidate()` 只验证候选；不替用户选择 | `GravityProductionSurfaceHost`、Choice Presentation、Choice Controller | `CANDIDATE` | `aiDraftUsed:false`、`aiHasNoAuthority:true` |
| Choice V2 | 用户选择一条合法 Route | `commitChoiceActionIntention()`，并在同一边界消费 Observation | Returning Provenance、Lived Growth、Recovery | `USER_FACT` | `0` |
| Departure Receipt | 用户点击“带着这一步，回到生活” | `confirmXinmaiChoiceExplicitDeparture()` | Dormant Departure、Returning Admission | `SYSTEM_FACT`，只证明明确离场动作 | `0` |
| Return Intent / Return Receipt | 用户点击“我回来了” | Reality Intent Controller 幂等建立 Target；`confirmXinmaiChoiceExplicitReturn()` 写 Receipt | Lived Response Admission | `SYSTEM_FACT`，只证明明确回访动作 | `0` |
| Lived Response Fact | Return Surface 中的用户选择与可选事实摘要 | `confirmLivedResponseFact()`；provenance 明确 `USER_EXPLICIT_CONFIRMATION`、`noAiConfirmation:true` | Eligibility、Formation Orchestrator、Recovery | `USER_FACT` | `0` |
| Crystal Eligibility | 已确认且仍 current 的 Lived Response Fact | `resolveCrystalEligibilityForFact()` | Formation Orchestrator | `SYSTEM_FACT` | `0` |
| Formation Receipt / Crystal | Eligible Fact | `orchestrateProductionCrystalFormation()` → `formCrystalFromEligibility()` | Ownership Presentation、Reality Handoff、Canonical Recovery | `SYSTEM_FACT`，成功以事务完成为准 | `0` |
| Canonical Body Imprint | Formation Receipt + Canonical Crystal + Identity | 纯函数 `projectXinmaiCanonicalBodyImprints()`；不写 Storage | `LaunchLab`、`RealityProductionRouteEntry`、`/archive`、Canvas Host | `SYSTEM READ MODEL` / typed visual facts | `0` |

### 3.3 各层不得互换

- Pressure Candidate 不是 Pressure Fact；只有用户明确认出后，Recognition Receipt 才成立。
- Gravity 页面完成数、花瓣、动画阶段和四步引导不是 Observation Authority。
- Action Route 是低风险、可拒绝的现实微实验候选，不是页面导航，也不是行动已经完成。
- Choice 只证明用户选择准备尝试什么，不证明已经离场、已经回来或已经行动。
- Departure Receipt 不证明行动发生；Return Receipt 不证明行动成功。
- Lived Response Fact 只记录用户明确报告，不宣称客观现实已经被系统验证。
- Eligibility 只允许申请形成，不等于 Crystal 已形成。
- Formation Receipt 才证明 Crystal 已由事务形成。
- Body Imprint 是由 Receipt 与 Crystal 确定性派生的只读模型，不是第二个 Growth Writer。

## 四、当前 Presentation、页面本地语义与历史兼容语义

### 4.1 四步照见当前是确定性 Presentation，不是 AI

`XinmaiLifeReflectionGuide` 已在正式 Gravity 页面中展示：

```text
看见 / Mirror
命名 / Identify
理解 / Validate
转化 / Shift
```

但当前实现同时明确：

- `data-xinmai-ai-claim="NONE"`；
- 消费 `EXISTING_GRAVITY_STATE`；
- “理解”是 `CANDIDATE_NOT_CONCLUSION`；
- 用户可确认、保留自己的命名或暂停；
- `Choice` 与 `Crystal` 均不由该组件触发；
- 组件内阶段与 `lifeContinuityStable` 属于页面展示节奏，不是持久化 Authority。

因此当前四步照见的正式分类是：

```text
PRESENTATION PRINCIPLE / LOCAL EXPERIENCE
NOT AI
NOT SECOND STATE MACHINE
NOT GROWTH AUTHORITY
```

### 4.2 六维当前是体验坐标，不是人格真相

正式 Gravity 代码存在六空间展示与顺序适配器：身体、情绪、思维、行动、记忆、目标；兼容类型中仍可见 `motivation`。`guanyaoDynamicsSixSpaceProgressAdapter` 明确 `writesStorage:false`，页面也标记六维角色为生命状态显影而非人格分析。

当前可以保留的事实是：

- 六空间用于组织当前 Gravity 的观察入口和展示进度；
- 它可以帮助用户从不同角度查看当前体验；
- 它不产生 Choice、Fact、Eligibility、Crystal 或身份资产；
- completed count、Bloom count、页面本地 step 不得恢复为 Choice 资格。

当前不能声称：

- 系统已经可靠识别了用户的六维心理状态；
- 单次表达可以生成稳定六维画像；
- 六维是人格空间、成长等级或长期商业标签。

### 4.3 Life Whisper 原话边界

First Encounter 与 Returning 页面存在当前周期的 Life Whisper 输入。代码清空输入，并显式声明 raw text persistence 为 `NONE`；它当前用于同体视觉回应和关系体验，不是 Prompt Runtime，也不是身份资产。

真正进入 Growth Authority 的文字只有 Lived Response 的 `factualSummary`，且必须随用户明确确认的 Fact 进入，允许为空，并带 `noAiConfirmation:true` 与 `noObjectiveRealityClaim:true`。

未来 Prompt Runtime 不得借 Life Whisper 或页面 textarea 把原始低语永久写入 Identity、Mother Code、商业画像或召回画像。若临时处理原话，默认保留策略必须是 `EPHEMERAL / NO IDENTITY PERSISTENCE`。

### 4.4 现有规则语义不是 AI

以下代码属于确定性 Presentation 或兼容解释，不是 AI：

- `guanyaoCausalInferenceLayer.ts`：标记为 2.0 的 UI trace 观察层，不改 Engine 或 UI Authority；
- `behaviorInterpreter.ts`、`hexagramBehaviorMap.ts`、`motherCodeForceMap.ts`：将已有 Engine / Mother Code / Hexagram 转成展示语言；
- `sixDimensionalTuningDialogue.ts`：模板语言；
- `guanyaoDynamicsExperienceStateAdapter.ts`：当前维度的确定性展示文案。

这些消费者必须继续归类为 `PRESENTATION` 或 `LEGACY_COMPATIBILITY`。它们不能被未来 Prompt Runtime 当作用户已确认事实，也不能成为模型训练标签的默认真源。

## 五、AI 权威边界

### 5.1 允许生成

未来 AI 在 1.0 中最多可以生成：

1. 对现有、可追溯事实的临时候选镜像；
2. 暂时的保护反应候选，并明确使用“可能”“是否贴近”等开放语气；
3. 三才责任分流候选；
4. 对七类已冻结 Action Prototype 的候选排序或表达整理；
5. 不改变事实的 locale、语气与可读性调整；
6. 当证据不足时明确表达不确定、拒绝或安全扣留。

上述结果一律是 `Candidate Mirror`，不得拥有 Authority。

### 5.2 禁止生成或确认

AI 不得生产、确认、覆盖或撤销：

- Identity、StarBeast Identity、Mother Code、Hexagram；
- Pressure Recognition Fact；
- Gravity Observation Recognition；
- Choice 或 Action Route 的正式选择；
- Departure、Return 或 Target Encounter；
- Lived Response Fact；
- Crystal Eligibility；
- Formation Receipt、Crystal；
- Canonical Body Imprint；
- 行动已经完成、现实结果已经发生或用户已经成长的结论。

AI 也不得声明：

- 医疗或心理诊断；
- 永久人格定论；
- 命运、善恶、价值高低；
- 成长等级、修行等级或更好的人生资格；
- 无证据的童年、创伤、家庭历史或长期记忆；
- 用户应该承担成功义务。

### 5.3 用户原话与 AI 解释分离

必须同时保留三个边界：

```text
Raw User Expression
≠
AI Provisional Mirror
≠
User-confirmed Product Fact
```

- 原话只有用户自己说过；AI 不得把自己的改写标成用户原话。
- 候选镜像必须携带 evidence references 和不确定性，默认短期、可撤回。
- 用户对镜像的“贴近 / 不贴近 / 暂停”只调整当前 Presentation，不自动写 Identity 或 Growth。
- 只有现有 Controller 接收符合既有契约的用户明确动作，并在事务内复验后，产品事实才推进。

### 5.4 唯一未来单向关系

```text
Raw user expression / versioned existing facts
↓
AI candidate semantic interpretation
↓
Deterministic schema + evidence + safety validation
↓
Existing product authority receives explicit user action
↓
Typed presentation
```

AI 不得跳过 Validator，也不得从 Candidate Mirror 直接写入任何 Authority。

## 六、四步照见 Prompt Contract

### 6.1 看见 / Mirror

允许：

- 复述当前可追溯的现实线索；
- 复述用户明确表达的身体、情绪或行动线索；
- 标注每个陈述来自哪个 evidence reference；
- 承认缺失信息。

禁止：

- 添加用户没有提供的历史；
- 从一次停顿或一句话推断长期模式；
- 将页面动画、六维完成数或 Mother Code 文案当作现实证据。

### 6.2 命名 / Identify

允许命名“暂时的保护反应候选”，例如：

> 这也许像是一种先把局面接住、暂时推迟边界的保护方式。这个说法贴近你吗？

禁止命名：

- 人格；
- 疾病；
- 命运；
- 永久 Dust / Shadow 身份；
- 用户必须接受的结论。

候选必须可被用户拒绝、修订或暂停，不拒绝即默认同意的交互无效。

### 6.3 理解 / Validate

允许：

- 承认某种回应可能在过去提供过保护、秩序、连接或喘息；
- 同时呈现可能的收益与代价；
- 保留“证据不足”的真实空白。

禁止：

- 编造童年、创伤、长期家庭模式或潜意识记忆；
- 用 Mother Code、八卦或六维替用户证明历史；
- 以“理解”为名劝用户原谅、和解或承担责任。

### 6.4 转化 / Shift

AI 不得自由生成一条行动后直接提交。它只能：

1. 从现有七类 Action Prototype 中提出或排序候选；
2. 提供通过现有参数 Validator 的对象、场景、时长和尺度建议；
3. 保留拒绝、延后和改变路线；
4. 由用户明确选择；
5. 由现有 Choice Transaction 再次读取 Observation、Route、Identity 与 revision 后决定是否提交。

任何不属于七类原型、超出 `P0_LOW_RISK_REVERSIBLE`、需要医疗/法律/财务判断或暗示结果承诺的候选都必须被拒绝或 `SAFE_WITHHELD`。

### 6.5 附着点

四步照见只能附着为：

```text
Recognized Gravity Observation
↓
Optional Candidate Mirror Presentation
↓
User confirms / revises / pauses the mirror
↓
Existing deterministic Action Route candidates
↓
Existing Choice Authority
```

它不是第二套状态机；不拥有 Encounter、Observation、Choice、Departure、Fact 或 Growth 状态。没有 AI 时，现有确定性 Gravity / Choice 链必须完整可用。

## 七、三才责任分流

### 7.1 定义

三才只作为责任、限制与可控性的临时分流：

| 候选域 | 含义 | 禁止误用 |
| --- | --- | --- |
| `HEAVEN` | 外部环境与当下不可直接控制的条件 | 不是命运，不等于“都是环境的错” |
| `EARTH` | 身体、资源、照护责任与现实限制 | 不是能力缺陷或健康诊断 |
| `HUMAN` | 用户此刻可以选择、也可以拒绝的行动空间 | 不是道德责任、成功义务或受害者归因 |

### 7.2 契约

- 每个 attribution candidate 必须引用用户证据或现有事实引用。
- 同一事实可以同时有多个候选域，不强制单归类。
- 输出必须包含不确定性与反例，不形成持久化用户属性。
- 不重新起卦，不覆盖 Mother Code、Hexagram、Identity 或 StarBeast。
- `HUMAN` 只打开可拒绝的行动空间；不能把系统无力处理的部分最终推回用户。
- 三才不进入 Pricing、Marketing、Retention Profile 或风险分层。

### 7.3 版本位置

当前代码中不存在三才的正式类型、Controller、Storage 或生产 Consumer。因此：

```text
1.0 Product Contract：NOW / FROZEN
1.0 Runtime：DEFER
2.0 Longitudinal Use：CANDIDATE ONLY
Persistent User Attribute：REJECT
```

## 八、六维、东方体验动作与六阶段裁决

### 8.1 六维

| 问题 | 裁决 |
| --- | --- |
| 当前是否有 Runtime 支持 | 有六空间展示、进度适配和确定性文案；没有可靠 AI 心理分类 Authority |
| 1.0 前台位置 | 保留现有 Gravity 观察入口，不新增人格标签或第二空间 |
| 未来 AI 位置 | 最多作为后台 evidence classification candidate |
| 能否从单次表达可靠判断 | 不能 |
| 能否持久化为用户画像 | 不能 |
| 能否推进 Choice / Growth | 不能 |

“身体、情绪、思维、行动、记忆、动机”可以帮助整理证据；现有页面中 `goal` 与 `motivation` 的兼容差异必须在任何 Prompt PREP 中先统一命名，不能让模型同时输出两个近义权威字段。

### 8.2 破执、观势、定心

正式源码中不存在这三项的 Authority 类型、事务状态或持久化事实。它们可以成为体验设计原则：

- 破执：让单一解释松动，不宣布真相；
- 观势：看见环境、身体与关系条件，不起卦重算；
- 定心：让用户保留自主节奏，不要求立即行动。

裁决：

```text
Experience Principle：KEEP
User-visible Taxonomy：DEFER
Persisted State：REJECT
Growth Authority：REJECT
```

### 8.3 开创、发展、对抗、稳定、衰退、崩溃六阶段

当前正式 `LifeJourneyStage` 是：

```text
ORIGIN / AWAKENING / REALITY / PRESSURE / CHOICE / CRYSTAL / ARCHIVE
```

它来自显式 upper-schema caller，并有独立 Authority Review，不是自动推断。Genesis 文档中另有一套“六阶段显化顺序”，但那只是星兽首次显化的 Presentation Sequence。

代码中没有“开创、发展、对抗、稳定、衰退、崩溃”的正式类型、来源、纵向证据或 Consumer。三者不得混称：

```text
Current LifeJourneyStage
≠
Genesis Presentation Sequence
≠
Proposed Six Lifecycle Phases
```

单次 Encounter、单句表达、一次 Lived Response 或 Mother Code 都不足以判断生命周期。六阶段优先 `DEFER TO 2.0 RESEARCH`。进入 2.0 前至少需要：

- 同一 Identity 的跨周期、版本化纵向事实；
- 用户可拒绝和修订的阶段候选；
- 与单次情绪波动的区分证据；
- 安全、公平与误判审查；
- 证明不会形成第二 Growth Authority；
- 产品研究先证明用户理解该模型，而不是被模型定义。

## 九、八卦、Mother Code 与“原力人格”裁决

### 9.1 当前真实来源

当前 Mother Code 来源是确定性身份链：

```text
Normalized Gregorian birth reference
↓
Chinese lunar year / month / day + hour branch ordinal
↓
guanyaoLunarTrigramLandingResolver
↓
guanyaoLunarMotherCodeLandingAdapter
↓
MotherCodeProfile
↓
LifeArchetypeProfile / Presentation
```

地点不参与该推导。`motherCodeLifeArchetypeSource` 只允许 Mother Code Profile 作为 Life Archetype 来源。

当前代码仍包含 `personalityAsset`、行为释义和旧页面语言；同时正式类型也明确 `notPersonalityLabel:true`。这些兼容词不能成为新增“八卦人格测试”的授权。

### 9.2 当前正式消费者

- Identity / Mother Code 展示；
- Life Archetype 与 StarBeast 资产来源；
- 确定性行为或原力 Presentation；
- Action Route Resolver 的次级偏好排序。

Action Route Resolver 的主约束来自 Pressure Nature 与安全原型；Mother Code lower trigram 只在合法候选内提供确定性顺序，用户仍然选择，Validator 与 Choice Transaction 仍然复验。因此当前这条消费关系可以保留，但不得扩张为“卦象决定行动”。

### 9.3 结论

| 项目 | 1.0 | 2.0 候选 | 红线 |
| --- | --- | --- | --- |
| 现有 Mother Code 权威 | `KEEP / UNCHANGED` | 继续只读 | 不重新起卦 |
| 新八卦人格测试 | `REJECT` | 仍需独立产品审计 | 不建立永久人格标签 |
| 八卦决定 Action Route | `REJECT` | `REJECT` | 用户选择与 Validator 不可移除 |
| 聊天表达偏好 | `DEFER` | 可作为临时 tone / question-style candidate | 不改变事实与资格 |
| 候选观察视角 | `DEFER` | 可提供多个可拒绝视角 | 不形成诊断、命运或画像 |

进入 2.0 前必须证明：用户不会把该表达误解为人格定论；同一事实使用不同表达风格不会改变 Action Route 合法性、Choice、Eligibility 或 Growth 结果；所有偏好均可关闭、可重置且不用于商业分层。

## 十、最小 Prompt 与结构化候选契约

本节只冻结产品协议，不实现类型或代码。

```ts
type SemanticCandidateMirrorEnvelopeV1 = Readonly<{
  schemaVersion: "XINMAI_SEMANTIC_CANDIDATE_MIRROR_V1";
  requestReferenceId: string; // ephemeral, not an identity asset
  locale: string;
  tone: "QUIET" | "DIRECT" | "GENTLE";

  inputFacts: readonly Readonly<{
    sourceType:
      | "USER_EPHEMERAL_EXPRESSION"
      | "PRESSURE_RECOGNITION"
      | "GRAVITY_OBSERVATION"
      | "CHOICE_ROUTE_CANDIDATE"
      | "USER_CONFIRMED_LIVED_RESPONSE";
    sourceReferenceId: string;
    sourceVersion: string | number;
    userConfirmed: boolean;
    retention: "EPHEMERAL" | "EXISTING_AUTHORITY_REFERENCE_ONLY";
  }>[];

  evidenceReferences: readonly Readonly<{
    sourceReferenceId: string;
    supportedClaimIds: readonly string[];
  }>[];

  provisionalMirror: Readonly<{
    mirrorText: string;
    claimIds: readonly string[];
    userMayReject: true;
    notDiagnosis: true;
    notPersonality: true;
  }>;

  threeTalentsAttributionCandidates: readonly Readonly<{
    domain: "HEAVEN" | "EARTH" | "HUMAN";
    evidenceReferenceIds: readonly string[];
    rationale: string;
    provisional: true;
  }>[];

  protectiveResponseCandidate: Readonly<{
    label: string;
    benefitCandidate: string | null;
    costCandidate: string | null;
    evidenceReferenceIds: readonly string[];
    provisional: true;
  }> | null;

  boundedActionPrototypeCandidates: readonly Readonly<{
    prototypeId:
      | "ROUGH_FIRST_STEP"
      | "PAUSE_ONE_AUTOMATIC_RESPONSE"
      | "ASK_ONE_CONCRETE_QUESTION"
      | "STATE_ONE_MINIMUM_BOUNDARY"
      | "SHRINK_TO_STARTABLE_UNIT"
      | "VERIFY_ONE_TENSING_ASSUMPTION"
      | "BODY_RECOVERY_WINDOW";
    evidenceReferenceIds: readonly string[];
    proposedParameters: Readonly<Record<string, string>>;
  }>[];

  uncertainty: Readonly<{
    level: "LOW" | "MATERIAL" | "INSUFFICIENT_EVIDENCE";
    unknowns: readonly string[];
  }>;

  safetyOutcome:
    | "CANDIDATE_ALLOWED"
    | "FALLBACK_REQUIRED"
    | "SAFE_WITHHELD"
    | "REFERRAL_REQUIRED"
    | "MODEL_REFUSED";

  validatorResult: Readonly<{
    owner: "DETERMINISTIC_XINMAI_VALIDATOR";
    status: "VALID" | "REJECTED" | "SAFE_WITHHELD";
    reasons: readonly string[];
    authorityAdvanced: false;
  }>;

  retentionPolicy: "EPHEMERAL_NO_IDENTITY_OR_COMMERCIAL_PROFILE";
}>;
```

### 10.1 字段所有权

| 字段 | 可由模型提出 | 必须由确定性代码形成 | 可持久化 |
| --- | --- | --- | --- |
| mirrorText | 是 | schema / length / evidence validation | 默认否 |
| evidence references | 模型可引用已有 ID | 必须验证引用存在且版本匹配 | 只保留已有 Authority 引用 |
| three-talents candidates | 是 | 必须验证 evidence 与红线 | 默认否 |
| protective-response candidate | 是 | 必须过滤诊断、人格与编造历史 | 默认否 |
| action prototype candidates | 只能在七类 ID 内提出 | 现有 Route Validator 决定是否合法 | 只有用户选中后的 Route Snapshot 随 Choice 提交 |
| safety outcome | 模型可拒绝 | 最终由独立 Safety Router / Validator 裁决 | 只保留必要审计状态，禁止脆弱画像 |
| validator result | 否 | 只能由确定性 Validator 产生 | 依未来审计最小化 |

### 10.2 明确禁止的模型输出

模型不得直接输出并驱动：

- Shader 数值、颜色、呼吸频率、经络节点或视觉成功事实；
- Storage 写入指令；
- Choice、Fact、Eligibility、Formation 或 Crystal 写入对象；
- Body Imprint 落点；
- 商业推荐、定价或召回标签；
- 原始低语的长期身份归档。

视觉只能消费：

```text
Validated typed semantic candidate state
↓
Deterministic Presentation Adapter
↓
Typed visual facts
```

Renderer 不得调用模型，也不得从模型文本反推产品事实。

## 十一、失败、拒绝与真实 Fallback

### 11.1 模型失败不是产品事实

以下情况必须进入真实且克制的 Fallback：

- 模型超时或网络不可用；
- 模型拒绝；
- evidence 缺失或版本不匹配；
- 输出不符合 schema；
- 低置信或相互矛盾；
- Safety Router 扣留；
- Validator 拒绝全部行动候选。

Fallback 可以说：

> 这一次，我没有足够依据替你整理。你仍可以按自己的话停在这里，或从已有的小行动里自己选择。

Fallback 不得说：

- “它已经理解你”；
- “系统正在深度分析”；
- “稍后会给出更准确的人格”；
- “继续操作即可解锁答案”。

没有 AI 时，现有 Pressure、Gravity、七类 Action Route、Choice、Departure、Return、Fact 与 Growth 链必须继续工作；AI 不得成为关键路径单点故障。

## 十二、安全与商业边界

### 12.1 高风险独立分流

医疗、心理危机、自伤、财务与法律高风险必须在模型候选进入产品链前经过独立 Safety Router。边界结果只允许：

```text
SAFE_WITHHELD
REFERRAL_REQUIRED
MODEL_REFUSED
```

- 不让通用 Action Route 冒充专业建议。
- 不从单句高风险表达生成诊断或风险等级画像。
- 不因转介而惩罚、降级用户或形成 Growth 失败。
- 危机内容只提供克制的安全信息与适当求助方向，不进入 Choice / Crystal 因果。
- 法律、财务、医疗内容不得被“东方智慧”包装后绕过专业边界。

### 12.2 商业边界

Pressure、Gravity、Choice、Departure、Return、Formation 等脆弱或高情绪时刻不得出现商业推荐。

未来付费“深度照见”也只能增加：

- 整理深度；
- 用户主动选择的时间跨度；
- 历史回看与表达方式。

不得出售：

- 更准确的命运或人格；
- 更高成长资格；
- Crystal 形成概率；
- “更高级”的 Action Route；
- 解除痛苦、修复关系或成功保证。

用户的脆弱度、保护反应、三才候选、六维候选和危机信息不得进入定价、营销、广告、召回或流失预测画像。

## 十三、消费者与迁移裁决

### 13.1 当前消费者处置

| 消费者 | 当前角色 | 裁决 | 原因 |
| --- | --- | --- | --- |
| Reality Pressure Presentation / Host | 候选展示与明确认出 | `KEEP` | 已有 typed command / receipt 边界 |
| Gravity Observation Controller | Observation Authority | `KEEP` | 不允许 AI 写入或替代 recognition |
| `XinmaiLifeReflectionGuide` | 确定性四步 Presentation | `KEEP / ISOLATE FROM AI AUTHORITY` | 现有 `AI claim = NONE` 正确 |
| Six-space Progress / Experience Adapter | 当前观察入口与文案 | `KEEP AS PRESENTATION` | 不进入身份或 Growth |
| Action Route Resolver / Validator | 七类原型确定性候选与校验 | `KEEP` | 是 AI 候选必须经过的边界 |
| Choice Transaction Authority | 用户选择提交 | `KEEP / UNCHANGED` | 必须事务内复验 |
| Departure / Return Controllers | 用户明确离场与回访 | `KEEP / UNCHANGED` | AI 不得自动触发 |
| Lived Response Authority | 用户确认现实回应 | `KEEP / UNCHANGED` | `noAiConfirmation:true` |
| Eligibility / Formation | Growth system facts | `KEEP / UNCHANGED` | 模型输出不能成为输入 |
| Canonical Body Imprint Projector | 只读 Growth 投影 | `KEEP / UNCHANGED` | 不能读取模型文本 |
| Behavior / Hexagram / Mother Code interpreters | Presentation / compatibility | `ISOLATE` | 不得升级为事实或训练标签 |
| `guanyaoCausalInferenceLayer` | 2.0 观察性 UI trace layer | `DEFER / ISOLATE` | 无用户事实权威，不接入 1.0 Prompt Runtime |
| Dev Acceptance / Fixtures | 开发证据 | `REJECT PRODUCTION CONSUMPTION` | 不得作为 Prompt 输入或成功路径 |

### 13.2 未来允许新增的唯一消费者

如果未来启用 Prompt Runtime，只允许新增一个隔离链：

```text
Versioned Fact Read Adapter
↓
Ephemeral Prompt Request Builder
↓
Model Candidate Mirror
↓
Deterministic Evidence / Safety / Schema Validator
↓
Read-only Candidate Presentation Resolver
```

它不写现有 Store，不拥有事务，不返回产品成功状态，也不改变没有 AI 时的主线可达性。

### 13.3 禁止消费者清单

- Identity Source、Mother Code 或 Hexagram Engine 直接消费模型结论；
- Pressure Recognition Controller 直接消费模型置信度；
- Gravity Observation Authority 接受模型自动 recognition；
- Choice Controller 接受模型自由生成且未经过七类原型 Validator 的路线；
- Departure / Return / Lived Response Controller 接受模型代用户确认；
- Eligibility / Formation 接受 Prompt 输出；
- Storage、Archive、Canonical Body Imprint 持久化 Candidate Mirror；
- Renderer、Canvas、CSS 或 DOM 直接消费模型文本决定视觉事实；
- Marketing、Pricing、Entitlement 或 Notification 使用脆弱度、保护反应、三才或六维候选。

## 十四、1.0、2.0、DEFER 与 REJECT 清单

### 14.1 1.0 必须补齐（仅在未来申请 Prompt Runtime 时）

1. 版本化 fact read adapter，明确每个输入是否用户确认；
2. Ephemeral request 生命周期与 raw expression 删除边界；
3. 本 MAP 的候选 schema；
4. evidence reference 完整性 Validator；
5. 高风险 Safety Router 与转介协议；
6. 七类 Action Prototype 参数 Validator 的唯一接入；
7. 用户确认、拒绝、修订、暂停的 Presentation contract；
8. 无 AI、超时、拒绝和低置信 Fallback；
9. no-storage、no-authority、no-commercial-profile 门禁；
10. Prompt / model 版本审计，但不保留不必要原文；
11. locale、语气、公平与伤害评估；
12. 明确证实现有主线在 AI 完全不可用时仍可闭环。

这些是 Prompt Runtime 的前置条件，不是当前 Phase 3 关闭的新增前置条件。本 MAP 不把 AI 强行插入尚在收口的 C2 / C3 体验链。

### 14.2 2.0 候选

- 多 Encounter 的候选语义比较；
- 用户主动选择的长期回看整理；
- 六阶段纵向研究；
- 八卦作为可关闭的表达偏好或提问视角；
- 三才候选随时间变化的对照，但不形成属性；
- 用户自定义保护反应语言，而不是系统永久命名。

### 14.3 DEFER

- Prompt Runtime 实现；
- 外部模型供应商选择；
- 模型记忆；
- 长期语义档案；
- 六阶段 Runtime；
- 八卦聊天风格；
- 破执 / 观势 / 定心前台分类；
- 任何付费深度照见 Runtime。

### 14.4 REJECT

- 新八卦人格测试；
- 永久保护反应人格标签；
- AI 自动 Recognition、Choice、Fact、Eligibility、Crystal 或 Imprint；
- 用六维、三才、八卦或危机信号进行商业分层；
- 让 Prompt 变成第二套 Relationship / Growth Authority；
- 将哲学术语同时堆叠为用户可见分类；
- 原始低语默认长期保存。

## 十五、是否需要 Prompt Runtime 与下一刀

当前正式链可以在 AI 为 `0` 的情况下成立；因此 Prompt Runtime 不是当前因果闭环的必要条件。

若产品未来仍申请 1.0 候选镜像能力，风险不在“加一段文案”，而在新增外部、非确定性消费者、证据引用、安全分流、失败 Fallback 和用户原话生命周期。它不能归类为绿色修补。

下一刀建议：

```text
XINMAI-1.0-SEMANTIC-CANDIDATE-MIRROR-
PROMPT-RUNTIME-MAJOR-BLADE-PREP-P0

交通灯：
YELLOW

刀型：
Prompt Runtime Major Blade Prep

决策：
DEFER UNTIL PHASE 3 EXPERIENCE CLOSURE
PREP ONLY WHEN REAUTHORIZED
```

如果 PREP 发现需要：

- 新增持久化语义 Owner；
- 改写现有 Authority 输入；
- 让 Prompt 成为 Choice 或 Growth 必经路径；
- 迁移现有用户事实或 Mother Code；

则必须升级为 `RED — MIGRATION AUDIT`。如果候选镜像保持无写入、可选、可失败、只读并经过现有 Validator，则可继续黄色 Major Blade，不得直接 Runtime。

## 十六、代码证据索引

| 证据主题 | 正式文件 |
| --- | --- |
| Pressure Recognition Authority | `src/services/xinmaiRealityPressureRecognitionController.ts` |
| Gravity Observation Authority | `src/services/xinmaiGravityEncounterContinuityController.ts` |
| 七类 Action Route 与 AI 禁权 | `src/types/xinmaiChoiceActionRoute.ts`、`src/data/xinmaiChoiceActionRoutePrototypeCatalog.ts`、`src/services/xinmaiChoiceActionRouteResolver.ts`、`src/services/xinmaiChoiceActionRouteValidator.ts` |
| Choice Transaction | `src/services/xinmaiChoiceActionIntentionController.ts` |
| Departure / Return | `src/services/xinmaiChoiceReturningProvenanceController.ts`、`src/services/xinmaiChoiceReturningProvenanceAdmissionResolver.ts` |
| Lived Response Fact | `src/types/xinmaiLivedResponse.ts`、`src/services/xinmaiLivedResponseAuthorityController.ts` |
| Eligibility | `src/services/xinmaiCrystalEligibilityAuthority.ts` |
| Production Formation | `src/services/xinmaiCrystalFormationProductionOrchestrator.ts`、`src/services/xinmaiCrystalFormationConsumer.ts` |
| Canonical Body Imprint | `src/services/xinmaiCanonicalBodyImprintProjector.ts`、`src/services/xinmaiCanonicalBodyImprintRecoveryAdapter.ts` |
| 四步 Presentation | `src/components/XinmaiLifeReflectionGuide.tsx`、`src/pages/GravityPage.tsx` |
| 六空间 Presentation | `src/services/guanyaoDynamicsSixSpaceProgressAdapter.ts`、`src/services/guanyaoDynamicsExperienceStateAdapter.ts`、`src/pages/GravityPage.tsx` |
| Life Whisper 原话边界 | `src/pages/GenesisProductionExperiencePage.tsx`、`src/pages/LaunchLab.tsx` |
| Mother Code 确定性来源 | `src/services/productionIdentitySourceEngineConsumption.ts`、`src/services/guanyaoLunarTrigramLandingResolver.ts`、`src/services/guanyaoLunarMotherCodeLandingAdapter.ts`、`src/services/motherCodeLifeArchetypeSource.ts` |
| 当前 LifeJourneyStage | `src/types/originalSelfLifeSchema.ts`、`src/services/lifeJourneyStageSource.ts` |
| Production / Dev 路由隔离 | `src/App.tsx`、`src/router/previewRoutes.ts` |
| 规则语义而非 AI | `src/inference/guanyaoCausalInferenceLayer.ts`、`src/semantic/behaviorInterpreter.ts`、`src/semantic/hexagramBehaviorMap.ts`、`src/semantic/motherCodeForceMap.ts` |

## 十七、阶段状态与本刀出口

```text
MAP：
PASS / PRODUCT CONTRACT FROZEN

Prompt Runtime：
DEFER

AI Production Consumers：
0

Phase 3：
ACTIVE / NOT PASSED

C2：
ANDROID EVIDENCE HOLD

C3：
DEFER

Phase 4：
LOCKED

Research Execution：
BLOCKED

Monetization Runtime：
DEFER

Runtime / Prompt Runtime / AI API / Storage / Schema / Gate / Renderer / CSS / Page Copy Diff：
0

Document Delivery：
LOCAL CANDIDATE / PUSH HOLD
```

最终结论：

> 1.0 的正式真源仍是用户明确动作、确定性 Validator 与现有事务 Authority。AI 若进入，只能做可拒绝、可失败、可追溯、默认不持久化的候选镜像；三才、六维、四步照见、东方体验原则与八卦都不能被堆叠成第二个人格空间。真实行动，而不是模型解释，继续是 Growth 的唯一来源。
