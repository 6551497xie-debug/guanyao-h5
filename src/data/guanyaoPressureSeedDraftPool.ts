import type {
  GuanyaoCoreRelation,
  GuanyaoPressureSeed,
  GuanyaoPressureSeedDraftPoolAuditResult,
  GuanyaoPressureSeedFrontStage,
} from "../types/guanyaoPressureSeed";

export const PRESSURE_SEED_POWER_EVALUATION_BOSS: GuanyaoPressureSeed[] = [
  {
    id: "POWER_EVALUATION_BOSS_01",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "他翻过你那页方案，没评价。你在等那个评价。",
    core: {
      mechanism: "用户处在权力上位者评价压力下，外部判断正在接管自我确认，行动意愿依赖上级反馈。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自上级、制度或组织评价，容易引发自我怀疑与行动冻结。",
    },
    shell: "你把判断权交出去，就越来越难替自己决定。",
    tags: ["上级评价", "自我冻结", "判断外包"],
    mappingHint: "优先激活天水讼卦（争讼），加重评价威胁与自我怀疑的叙事比重",
  },
  {
    id: "POWER_EVALUATION_BOSS_02",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "开会时你提了一个方案，他没接话。会后你反复在想：是不是说错了。",
    core: {
      mechanism: "用户从权力上位者的沉默中解读出负面评价，用自我怀疑填补信息空白。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自上级的沉默、回避、不回应，容易引发过度反刍与决策瘫痪。",
    },
    shell: "沉默不是评价，你却替他把否定说完了。",
    tags: ["沉默解读", "过度反刍", "自我否定"],
    mappingHint: "优先激活山地剥卦（剥落），加重自我怀疑与过度反刍的叙事比重",
  },
  {
    id: "POWER_EVALUATION_BOSS_03",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "他在会上说‘再想想’，你知道这不是思考，是拒绝。",
    core: {
      mechanism: "用户识别出权力上位者的礼貌性否定，但仍试图从中寻找转机。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自延迟回应、模糊拒绝、体面否定，容易引发侥幸心理与被动等待。",
    },
    shell: "你等一个不会来的点头，行动就一直停在原地。",
    tags: ["礼貌拒绝", "模糊信号", "被动等待"],
    mappingHint: "优先激活水天需卦（等待），加重被动等待与侥幸心理的叙事比重",
  },
  {
    id: "POWER_EVALUATION_BOSS_04",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "他当着所有人的面说‘你这个逻辑不对’，你后面讲什么都像在解释。",
    core: {
      mechanism: "用户被公开否定后，后续行为全部被定性为‘辩解’，进一步强化负面印象。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自公开批评、当面否定、标签化评价，容易引发辩解冲动与关系固化。",
    },
    shell: "你一解释，就成了他口中那个‘听不进意见’的人。",
    tags: ["公开否定", "辩解固化", "标签化"],
    mappingHint: "优先激活泽水困卦（困），加重辩解与关系固化的叙事比重",
  },
  {
    id: "POWER_EVALUATION_BOSS_05",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "你的方案被交给另一个人推进，你没被问，也没被通知。",
    core: {
      mechanism: "用户的执行权被无声转移，评价通过行动被表达，且没有任何沟通。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自任务转移、权责变动、信息隔离，容易引发权力感丧失与被动退出。",
    },
    shell: "他们替你做了决定，你却连争的机会都没有。",
    tags: ["任务转移", "信息隔离", "权力丧失"],
    mappingHint: "优先激活天地否卦（隔阂），加重信息隔离与被动退出的叙事比重",
  },
  {
    id: "POWER_EVALUATION_BOSS_06",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "他只夸了别人一句，你却记了一整天。",
    core: {
      mechanism: "用户在权力评价场景中通过比较性反馈确认自身位置，上级对他人的肯定被转化为对自己的否定。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自比较性评价、隐性排名、被忽略感，容易引发自我贬低与位置焦虑。",
    },
    shell: "别人被看见，你就开始消失。",
    tags: ["比较评价", "被忽略感", "位置焦虑"],
    mappingHint: "优先激活风地观卦（旁观者），加重旁观、比较与自我消隐叙事",
  },
  {
    id: "POWER_EVALUATION_BOSS_07",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "他说“这个先放放”，你听懂了，但还想再解释。",
    core: {
      mechanism: "用户面对权力上位者的低成本搁置，将其理解为否定，却仍试图通过补充说明挽回评价。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自搁置、冷处理、低优先级反馈，容易引发解释冲动与自我消耗。",
    },
    shell: "你越解释，越像在求通过。",
    tags: ["搁置反馈", "解释冲动", "低优先级"],
    mappingHint: "优先激活水天需卦（等待），加重搁置、等待与求通过叙事",
  },
  {
    id: "POWER_EVALUATION_BOSS_08",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "复盘会上他没点名，你却知道那句话是在说你。",
    core: {
      mechanism: "用户在公开但不点名的评价场景中主动代入负面指向，用含混批评完成自我定位。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自不点名批评、公开复盘、含混指责，容易引发自我代入与防御收缩。",
    },
    shell: "他没点名，你已经认领了。",
    tags: ["不点名批评", "自我代入", "防御收缩"],
    mappingHint: "优先激活天水讼卦（争讼），加重含混指责与内在争辩叙事",
  },
  {
    id: "POWER_EVALUATION_BOSS_09",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "YOUTH",
    ageBias: ["YOUTH", "ESTABLISHING"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE"],
    surface: "你发完那段汇报，又撤回重写了一遍。",
    core: {
      mechanism: "用户在提交表达前预先内化上级评价，用反复修正降低被否定的风险，行动被评价恐惧拖慢。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自汇报、表达、提交前审查，容易引发反复修改与行动迟滞。",
    },
    shell: "你改的不是字，是胆量。",
    tags: ["汇报焦虑", "反复修改", "行动迟滞"],
    mappingHint: "优先激活山地剥卦（剥落），加重自我削弱与表达迟滞叙事",
  },
  {
    id: "POWER_EVALUATION_BOSS_10",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "SYSTEM", "COLLEAGUE"],
    surface: "他让你“再成熟一点”，你突然不知道该怎么做自己。",
    core: {
      mechanism: "用户被权力上位者用模糊成熟标准进行评价，原有表达和判断被压回自我审查。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自人格化评价、模糊标准、成熟规训，容易引发自我压制与身份摇晃。",
    },
    shell: "模糊的标准，最容易驯服你。",
    tags: ["人格化评价", "成熟规训", "自我压制"],
    mappingHint: "优先激活山泽损卦（削减），加重自我压制与标准驯化叙事",
  },
  {
    id: "POWER_EVALUATION_BOSS_11",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "COLLEAGUE", "SYSTEM"],
    surface: "群里他只回了一个问号，你手心一下凉了。",
    core: {
      mechanism: "用户在公开工作群中接收到上级的极简否定信号，将一个模糊符号迅速放大为能力质疑与公开失分。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自公开群聊、符号化否定、即时压迫，容易引发身体警觉与表达冻结。",
    },
    shell: "一个问号，就把你钉住了。",
    tags: ["群聊压迫", "符号否定", "表达冻结"],
    mappingHint: "优先激活雷水解卦（松动），加重即时惊吓、公开失分与身体冻结叙事",
  },
  {
    id: "POWER_EVALUATION_BOSS_12",
    matrixCode: "POWER_EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "BOSS",
    relationBias: ["BOSS", "SYSTEM", "COLLEAGUE"],
    surface: "绩效面谈前，你已经在心里替自己判完了。",
    core: {
      mechanism: "用户在正式评价到来前提前内化权力判断，通过预演失败与自我判决来降低被否定时的冲击。",
      engineHint: "识别为权力场中的评价威胁，核心触发来自绩效面谈、等级评定、正式反馈，容易引发提前认输与自我审判。",
    },
    shell: "评价还没来，你先输了。",
    tags: ["绩效焦虑", "自我审判", "提前认输"],
    mappingHint: "优先激活山地剥卦（剥落），加重自我削弱、提前认输与评价前溃败叙事",
  },
];

export const PRESSURE_SEED_RELATION_ATTACHMENT_PARTNER: GuanyaoPressureSeed[] = [
  {
    id: "RELATION_ATTACHMENT_PARTNER_01",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "消息发出去很久，对方始终没回。你开始替他的沉默找理由。",
    core: {
      mechanism: "用户从对方的沉默中解读出疏离，用自我欺骗填补关系中的信息空白。",
      engineHint: "依恋断裂，触发自我欺骗与焦虑型等待。",
    },
    shell: "你替他找理由，也替疏离盖章。",
    tags: ["消息不回", "自我欺骗", "焦虑等待"],
    mappingHint: "优先激活泽水困卦（困），加重等待与自我欺骗的叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_02",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "他已经很久没主动碰你了。你开始怀疑，是自己哪里出了问题。",
    core: {
      mechanism: "用户将身体疏离归因为自我缺陷，用自我攻击解释依恋损伤。",
      engineHint: "依恋断裂，触发自我归罪与身体羞耻。",
    },
    shell: "你把他的冷，当成自己的错。",
    tags: ["身体疏离", "自我归罪", "羞耻感"],
    mappingHint: "优先激活火山旅卦（异乡者），加重自我怀疑与孤独叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_03",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你说了今天的委屈，他只回了一个‘嗯’。你后面的话全咽回去了。",
    core: {
      mechanism: "用户的情感表达遭遇情感截断，逐渐放弃分享与连接。",
      engineHint: "依恋断裂，触发情感截断与表达放弃。",
    },
    shell: "你咽回去的话越多，离他就越远。",
    tags: ["情感截断", "表达放弃", "疏离累积"],
    mappingHint: "优先激活天地否卦（隔阂），加重情感截断与疏离叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_04",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你们躺在一张床上，中间隔着一道看不见的墙。",
    core: {
      mechanism: "物理同处一室，心理距离已被长期沉默固化。",
      engineHint: "依恋断裂，触发心理隔离与关系冻结。",
    },
    shell: "你们没吵架，也没话说了。",
    tags: ["心理隔离", "长期冷战", "关系冻结"],
    mappingHint: "优先激活艮为山卦（停住），加重心理隔离与冻结叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_05",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你发现他删了和那个人的聊天记录。你问他，他说你多想了。",
    core: {
      mechanism: "用户面对证据与否认的矛盾，认知失调加剧，信任开始崩塌。",
      engineHint: "依恋断裂，触发信任崩塌与认知失调。",
    },
    shell: "你越查越累，越想信越难信。",
    tags: ["信任崩塌", "认知失调", "背叛疑云"],
    mappingHint: "优先激活天水讼卦（争鸣），加重信任崩塌与对峙叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_06",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "他已经很久没正眼看你说话了。你越来越不确定，他还在不在意。",
    core: {
      mechanism: "用户从非语言信号（眼神、注视、朝向）中持续接收拒绝，依恋安全感被侵蚀。",
      engineHint: "依恋断裂，触发非语言拒绝与安全感侵蚀。",
    },
    shell: "他不看你，你也不敢看了。",
    tags: ["眼神回避", "非语言拒绝", "安全感侵蚀"],
    mappingHint: "优先激活泽风大过卦（最后一根），加重安全感侵蚀与临界叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_07",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你们很久没单独出去了。他总说忙，你也开始假装不需要。",
    core: {
      mechanism: "用户用自我压抑应对关系缺失，假装不需要来避免面对被拒绝的真相。",
      engineHint: "依恋断裂，触发自我压抑与假装不需要。",
    },
    shell: "你假装不需要，他就真的不给了。",
    tags: ["关系缺失", "自我压抑", "假装不需要"],
    mappingHint: "优先激活风火家人卦（屋檐下），加重自我压抑与关系空洞叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_08",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "他答应的事又忘了。你提醒他，他说你太计较。",
    core: {
      mechanism: "用户的合理需求被污名化为‘计较’，在关系中逐渐放弃表达。",
      engineHint: "依恋断裂，触发需求羞耻与表达放弃。",
    },
    shell: "你越怕计较，越不敢在乎。",
    tags: ["需求羞耻", "表达放弃", "关系不平等"],
    mappingHint: "优先激活风地观卦（旁观者），加重需求羞耻与旁观叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_09",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你梦见他在跟别人说话，醒来不敢问他。你怕一问，就真的出事了。",
    core: {
      mechanism: "用户的焦虑通过梦境显化，但现实中不敢验证，恐惧确认后的崩溃。",
      engineHint: "依恋断裂，触发焦虑显化与恐惧确认。",
    },
    shell: "你怕知道真相，就只能活在自己的猜测里。",
    tags: ["焦虑梦境", "恐惧确认", "猜测替代真相"],
    mappingHint: "优先激活坎为水卦（深渊），加重焦虑显化与恐惧确认叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_10",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你们还在联系，但你已经很久没从这段关系里感到过了安心。",
    core: {
      mechanism: "关系形式完整，依恋功能已失效，用户处于形式维持与实质空洞的撕裂中。",
      engineHint: "依恋断裂，触发形式维持与实质空洞。",
    },
    shell: "你们还在一起，只是谁也不在里面了。",
    tags: ["形式维持", "实质空洞", "关系空壳"],
    mappingHint: "优先激活火水未济卦（黎明之前），加重关系空洞与未完成叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_11",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你在他手机里看到一个没见过的名字。你点进去，又退出来了。",
    core: {
      mechanism: "用户发现潜在威胁，但选择回避验证，将焦虑压抑回潜意识。",
      engineHint: "依恋断裂，触发回避验证与焦虑压抑。",
    },
    shell: "你不点开，就不用面对。",
    tags: ["回避验证", "焦虑压抑", "潜在威胁"],
    mappingHint: "优先激活山雷颐卦（养伤者），加重视角回避与焦虑压抑叙事",
  },
  {
    id: "RELATION_ATTACHMENT_PARTNER_12",
    matrixCode: "RELATION_ATTACHMENT",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    primaryAge: "YOUTH",
    ageBias: ["YOUTH", "ESTABLISHING"],
    primaryRelation: "PARTNER_ROMANTIC",
    relationBias: ["PARTNER_ROMANTIC"],
    surface: "你说想见面，他说最近太忙。你知道他不是忙，只是不想见你。",
    core: {
      mechanism: "用户被拒绝后仍试图用合理化解释保护自尊，但内心已确认拒绝信号。",
      engineHint: "依恋断裂，触发合理化和拒绝确认。",
    },
    shell: "你知道他不想见你，还在替他找理由。",
    tags: ["合理化", "拒绝确认", "自尊保护"],
    mappingHint: "优先激活泽雷随卦（顺流），加重合理化与被动等待叙事",
  },
];

export const PRESSURE_SEED_INTEREST_RESOURCE_PARTNER: GuanyaoPressureSeed[] = [
  {
    id: "INTEREST_RESOURCE_PARTNER_01",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "账目你一直没细看，最近发现分成比例已经被悄悄改过。",
    core: {
      mechanism: "用户对核心利益分配的知情权与决策权被边缘化，利益边界正在被动后退。",
      engineHint: "资源争夺，触发利益边界侵蚀与被动后退。",
    },
    shell: "你以为的合伙，其实只是被通知。",
    tags: ["分成被改", "知情权丧失", "边界侵蚀"],
    mappingHint: "优先激活天水讼卦（争鸣），加重利益边界冲突与知情权丧失叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_02",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "客户是你拉来的，他却绕过你单独对接。你问起来，他说帮你分担。",
    core: {
      mechanism: "用户的核心资源与客户关系正在被合作方架空，隐性替代已发生。",
      engineHint: "资源争夺，触发客户架空与隐性替代。",
    },
    shell: "他替你分担的不是工作，是你的位置。",
    tags: ["客户架空", "隐性替代", "资源流失"],
    mappingHint: "优先激活山地剥卦（剥落），加重客户剥离与资源流失叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_03",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "增资没叫你，分红没少你。你越来越像旁观者。",
    core: {
      mechanism: "用户在资本与决策层面的参与权被悬置，名义所有权与实际控制权分离。",
      engineHint: "资源争夺，触发所有权悬置与控制权分离。",
    },
    shell: "你只是名义上的合伙人，决策时没人想起你。",
    tags: ["增资被排除", "所有权悬置", "决策隔离"],
    mappingHint: "优先激活风地观卦（旁观者），加重所有权悬置与决策隔离叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_04",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "项目赚了钱，他说要先回本，分红的事再等等。你等了一轮又一轮。",
    core: {
      mechanism: "用户面对利益分配被无限期延后，回报权利被虚悬，信任被反复消耗。",
      engineHint: "资源争夺，触发分配延迟与信任磨损。",
    },
    shell: "你越等，越像是你不该拿。",
    tags: ["分红延迟", "分配虚悬", "信任磨损"],
    mappingHint: "优先激活水天需卦（等待），加重分配延迟与被动等待叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_05",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "你提议按贡献分，他说生意不是这么算的。你想反驳，又怕撕破脸。",
    core: {
      mechanism: "用户提出公平分配原则被否定，利益诉求被道德化或关系化绑架。",
      engineHint: "资源争夺，触发公平诉求被否定与利益羞耻。",
    },
    shell: "你越怕撕破脸，越拿不回应得的。",
    tags: ["公平诉求被否", "利益羞耻", "关系绑架"],
    mappingHint: "优先激活泽地萃卦（人潮），加重利益羞耻与关系绑架叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_06",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "你要看合同，他说你不信任他。你不好意思再坚持，也只能先信了。",
    core: {
      mechanism: "用户行使知情权被质疑动机，制度性保障被情感绑架替代。",
      engineHint: "资源争夺，触发知情权被质疑与制度缺位。",
    },
    shell: "你不敢查合同，就只能信口头承诺。",
    tags: ["知情权被质疑", "情感绑架", "制度缺位"],
    mappingHint: "优先激活风火家人卦（屋檐下），加重情感绑架与制度缺位叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_07",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "RESTRUCTURING",
    ageBias: ["MID_LIFE", "RESTRUCTURING", "SIXTY_PLUS"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "公司估值涨了，你的股份却没变。你想谈，又怕被认为是趁火打劫。",
    core: {
      mechanism: "用户的价值贡献与股权比例脱节，利益增长被结构性排除。",
      engineHint: "资源争夺，触发股权脱节与贡献被排除。",
    },
    shell: "公司越值钱，你越不值钱。",
    tags: ["股权脱节", "贡献被排除", "利益增长排除"],
    mappingHint: "优先激活火天大有卦（丰收者），加重贡献被排除与利益脱节叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_08",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "他想引进新投资人，条件是稀释你的股份。你没说话，但心里已经开始算了。",
    core: {
      mechanism: "用户面临股权被动稀释，利益被外部资本挤压，话语权同步下降。",
      engineHint: "资源争夺，触发股权稀释与话语权下降。",
    },
    shell: "你不争，你的位置就被别人占了。",
    tags: ["股权稀释", "话语权下降", "外部挤压"],
    mappingHint: "优先激活泽水困卦（困），加重股权稀释与话语权下降叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_09",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "你们一起扛过最难的时候，现在赚钱了，你却越来越像外人。",
    core: {
      mechanism: "用户在共患难后的利益分配中被边缘化，同甘阶段被排除出核心圈。",
      engineHint: "资源争夺，触发共苦不同甘与利益边缘化。",
    },
    shell: "共苦的时候有你，同甘的时候没你。",
    tags: ["共苦不同甘", "利益边缘化", "核心圈排除"],
    mappingHint: "优先激活天地否卦（隔阂），加重利益边缘化与核心圈排除叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_10",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "你想退出，他说按照合同你拿不到多少。你开始后悔当初没请律师。",
    core: {
      mechanism: "用户发现退出机制不公允，当初的信任换来了退出时的高额代价。",
      engineHint: "资源争夺，触发退出代价过高与初始信任被利用。",
    },
    shell: "你签字的每一页，都在替今天的你认亏。",
    tags: ["退出代价过高", "初始信任被利用", "合同陷阱"],
    mappingHint: "优先激活山火贲卦（面具），加重退出代价过高与初始信任被利用叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_11",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "ESTABLISHING",
    ageBias: ["YOUTH", "ESTABLISHING", "MID_LIFE"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "他说年底一起分，你信了三次。现在第四年了，你还在等。",
    core: {
      mechanism: "用户反复被口头承诺吊住预期，行动被延迟回报锁定，沉没成本持续累积。",
      engineHint: "资源争夺，触发口头承诺依赖与沉没成本累积。",
    },
    shell: "你等了一年又一年，等成了习惯。",
    tags: ["口头承诺", "延迟回报", "沉没成本累积"],
    mappingHint: "优先激活雷地豫卦（狂欢之后），加重延迟回报与沉没成本叙事",
  },
  {
    id: "INTEREST_RESOURCE_PARTNER_12",
    matrixCode: "INTEREST_RESOURCE",
    pressureField: "INTEREST",
    pressureNature: "RESOURCE",
    primaryAge: "MID_LIFE",
    ageBias: ["ESTABLISHING", "MID_LIFE", "RESTRUCTURING"],
    primaryRelation: "PARTNER_BUSINESS",
    relationBias: ["PARTNER_BUSINESS", "CLIENT", "SYSTEM"],
    surface: "公司另一条业务线赚钱了，你说想参与，他说术业有专攻。",
    core: {
      mechanism: "用户被固化在原有角色中，新增长机会被排除在参与权之外。",
      engineHint: "资源争夺，触发机会排除与角色固化。",
    },
    shell: "你被定义成什么样，就只能拿什么。",
    tags: ["机会排除", "角色固化", "增长排除"],
    mappingHint: "优先激活山雷颐卦（养伤者），加重角色固化与机会排除叙事",
  },
];

export const GUANYAO_PRESSURE_SEED_DRAFT_POOL: GuanyaoPressureSeed[] = [
  ...PRESSURE_SEED_POWER_EVALUATION_BOSS,
  ...PRESSURE_SEED_RELATION_ATTACHMENT_PARTNER,
  ...PRESSURE_SEED_INTEREST_RESOURCE_PARTNER,
];

export function getGuanyaoPressureSeedDraftPool(): GuanyaoPressureSeed[] {
  return GUANYAO_PRESSURE_SEED_DRAFT_POOL;
}

export function getPressureSeedsByMatrixCode(matrixCode: string): GuanyaoPressureSeed[] {
  return GUANYAO_PRESSURE_SEED_DRAFT_POOL.filter((seed) => seed.matrixCode === matrixCode);
}

export function getPressureSeedsByPrimaryRelation(primaryRelation: GuanyaoCoreRelation): GuanyaoPressureSeed[] {
  return GUANYAO_PRESSURE_SEED_DRAFT_POOL.filter((seed) => seed.primaryRelation === primaryRelation);
}

export function getPressureSeedFrontStage(seed: GuanyaoPressureSeed): GuanyaoPressureSeedFrontStage {
  return {
    surface: seed.surface,
    shell: seed.shell,
  };
}

const stripChinesePunctuation = (value: string): string =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

export function auditGuanyaoPressureSeedDraftPool(): {
  ok: boolean;
  total: number;
  errors: string[];
  matrixCoverage: Record<string, number>;
} {
  const errors: string[] = [];
  const ids = new Set<string>();
  const matrixCoverage = GUANYAO_PRESSURE_SEED_DRAFT_POOL.reduce<Record<string, number>>((coverage, seed) => {
    coverage[seed.matrixCode] = (coverage[seed.matrixCode] ?? 0) + 1;
    return coverage;
  }, {});

  GUANYAO_PRESSURE_SEED_DRAFT_POOL.forEach((seed) => {
    if (ids.has(seed.id)) {
      errors.push(`${seed.id} duplicated`);
    }
    ids.add(seed.id);

    if (!seed.surface) errors.push(`${seed.id} surface empty`);
    if (!seed.shell) errors.push(`${seed.id} shell empty`);
    if (!seed.core.mechanism) errors.push(`${seed.id} core.mechanism empty`);
    if (!seed.core.engineHint) errors.push(`${seed.id} core.engineHint empty`);
    if (seed.tags.length === 0) errors.push(`${seed.id} tags empty`);
    if (!seed.mappingHint) errors.push(`${seed.id} mappingHint empty`);
    if (stripChinesePunctuation(seed.surface).length > 30) errors.push(`${seed.id} surface exceeds 30`);
    if (stripChinesePunctuation(seed.shell).length > 20) errors.push(`${seed.id} shell exceeds 20`);
    if (!seed.ageBias.includes(seed.primaryAge)) errors.push(`${seed.id} primaryAge not in ageBias`);
    if (!seed.relationBias.includes(seed.primaryRelation)) errors.push(`${seed.id} primaryRelation not in relationBias`);
    if (JSON.stringify(seed).includes("SENIOR")) errors.push(`${seed.id} contains SENIOR`);

    const frontStage = getPressureSeedFrontStage(seed);
    const frontStageKeys = Object.keys(frontStage).sort().join(",");
    if (frontStageKeys !== "shell,surface") errors.push(`${seed.id} frontStage exposes extra fields`);
  });

  if (GUANYAO_PRESSURE_SEED_DRAFT_POOL.length !== 36) {
    errors.push(`total expected 36, got ${GUANYAO_PRESSURE_SEED_DRAFT_POOL.length}`);
  }
  if (matrixCoverage.POWER_EVALUATION !== 12) {
    errors.push(`POWER_EVALUATION expected 12, got ${matrixCoverage.POWER_EVALUATION ?? 0}`);
  }
  if (matrixCoverage.RELATION_ATTACHMENT !== 12) {
    errors.push(`RELATION_ATTACHMENT expected 12, got ${matrixCoverage.RELATION_ATTACHMENT ?? 0}`);
  }
  if (matrixCoverage.INTEREST_RESOURCE !== 12) {
    errors.push(`INTEREST_RESOURCE expected 12, got ${matrixCoverage.INTEREST_RESOURCE ?? 0}`);
  }

  return {
    ok: errors.length === 0,
    total: GUANYAO_PRESSURE_SEED_DRAFT_POOL.length,
    errors,
    matrixCoverage,
  };
}
