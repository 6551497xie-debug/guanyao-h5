import { GUANYAO_PRESSURE_SEED_DRAFT_POOL } from "./guanyaoPressureSeedDraftPool";
import type {
  PressureSeedAgeGroup,
  PressureSeedField,
  PressureSeedMatrixNode,
  PressureSeedMatrixSeed,
  PressureSeedMatrixV2AuditResult,
} from "../types/guanyaoPressureSeed";

// Pressure Seed Matrix V3.0 locked library.
// surface: 用户可见现实切片，≤30字；必须是具体场景、动作、关系角色；不写情绪、不写解释、不写答案。
// shell: 代价预览，≤20字；可以提示旧反应，但不能变成解释标签。
// ESTABLISHING 节点每个压力场 15 枚：覆盖 25-34 岁立足期的现实之刺。

type PressureSeedRuntimeAgeGroup = Extract<PressureSeedAgeGroup, "ESTABLISHING">;

const PRESSURE_SEED_SEEDS_PER_NODE = 15;

export const PRESSURE_SEED_AGE_GROUPS: PressureSeedRuntimeAgeGroup[] = ["ESTABLISHING"];

export const PRESSURE_SEED_FIELDS: PressureSeedField[] = [
  "POWER",
  "INTEREST",
  "RELATION",
  "FAMILY",
  "SOCIAL",
  "EXISTENCE",
];

export const PRESSURE_SEED_AGE_GROUP_LABELS: Record<PressureSeedAgeGroup, string> = {
  YOUTH: "入世期｜18-24",
  ESTABLISHING: "立足期｜25-34",
  MID_LIFE: "承压期｜35-44",
  RESTRUCTURING: "重组期｜45-59",
  SIXTY_PLUS: "归整期｜60+",
};

export const PRESSURE_SEED_FIELD_LABELS: Record<PressureSeedField, string> = {
  POWER: "权力场",
  INTEREST: "利益场",
  RELATION: "关系场",
  FAMILY: "家庭场",
  SOCIAL: "社会场",
  EXISTENCE: "状态场",
};

const matrixSeeds: Record<`${PressureSeedRuntimeAgeGroup}_${PressureSeedField}`, PressureSeedMatrixSeed[]> = {
  ESTABLISHING_POWER: [
    { id: "ESTABLISHING_POWER_01", pressureNature: "EVALUATION", surface: "试用期快结束了，主管仍没有告诉你转正标准。", shell: "评价悬着，下一步也悬着。" },
    { id: "ESTABLISHING_POWER_02", pressureNature: "EVALUATION", surface: "同批入职的人先升了一级，你没有收到任何说明。", shell: "差距出现了，标准没有出现。" },
    { id: "ESTABLISHING_POWER_03", pressureNature: "EVALUATION", surface: "新人接手了你负责的一部分。交接会没有说明原因。", shell: "职责边界正在改变。" },
    { id: "ESTABLISHING_POWER_04", pressureNature: "CONTROL", surface: "你休了几天假，回来流程改了。没人通知你。", shell: "你不在的时候，他们替你做了决定。" },
    { id: "ESTABLISHING_POWER_05", pressureNature: "BELONGING", surface: "你开始带项目后，重要会议仍只通知你的上级。", shell: "责任到了，位置还没到。" },
    { id: "ESTABLISHING_POWER_06", pressureNature: "EVALUATION", surface: "你第一次独立汇报，主管把问题都转向了旁边的资深同事。", shell: "你的判断还没有被单独接住。" },
    { id: "ESTABLISHING_POWER_07", pressureNature: "EVALUATION", surface: "你提了一个建议，他说“我们以前试过，不行”。", shell: "你的想法，还没开始就被否了。" },
    { id: "ESTABLISHING_POWER_08", pressureNature: "RESOURCE", surface: "你完成了主要工作，项目署名里没有你的名字。", shell: "贡献留下了，位置没有留下。" },
    { id: "ESTABLISHING_POWER_09", pressureNature: "CONTROL", surface: "他说“公司要优化结构”，你收到了邮件。", shell: "结构变化先于通知到来。" },
    { id: "ESTABLISHING_POWER_10", pressureNature: "EVALUATION", surface: "面试结束后，对方说你的经验与岗位级别不匹配。", shell: "岗位标准没有给出明确位置。" },
    { id: "ESTABLISHING_POWER_11", pressureNature: "RESOURCE", surface: "你问晋升标准，他说“这个级别暂时没有名额”。", shell: "你再努力，也没有位置。" },
    { id: "ESTABLISHING_POWER_12", pressureNature: "EVALUATION", surface: "你加班完成方案，第二天收到的反馈只有“注意效率”。", shell: "投入没有换来清晰评价。" },
    { id: "ESTABLISHING_POWER_13", pressureNature: "EVALUATION", surface: "你的方案被否了，用了别人的。三个月后又用回了你的。", shell: "你的价值，被反复否定又捡起来。" },
    { id: "ESTABLISHING_POWER_14", pressureNature: "CONTROL", surface: "你接下团队协调工作，排期和人选仍由别人决定。", shell: "责任增加了，决定权没有增加。" },
    { id: "ESTABLISHING_POWER_15", pressureNature: "CONTROL", surface: "你提出转岗，回复是“现在的岗位更需要你”。", shell: "你的选择暂时没有进入安排。" },
  ],
  ESTABLISHING_INTEREST: [
    { id: "ESTABLISHING_INTEREST_01", pressureNature: "RESOURCE", surface: "分成比例改了，会议结束后你才看见新版本账目。", shell: "规则已经改变，说明没有跟上。" },
    { id: "ESTABLISHING_INTEREST_02", pressureNature: "RESOURCE", surface: "客户是你拉的，他绕过你单独对接。", shell: "你种树，他摘果。" },
    { id: "ESTABLISHING_INTEREST_03", pressureNature: "RESOURCE", surface: "项目已经回本，对方仍没有给出下一次分成日期。", shell: "收益产生了，分配仍在等待。" },
    { id: "ESTABLISHING_INTEREST_04", pressureNature: "RESOURCE", surface: "你想退出，他说按合同你拿不到多少。", shell: "你签的每一页，都在替今天的你认亏。" },
    { id: "ESTABLISHING_INTEREST_05", pressureNature: "RESOURCE", surface: "公司估值涨了，你的股份没变。", shell: "公司升值，你被留在原地。" },
    { id: "ESTABLISHING_INTEREST_06", pressureNature: "RESOURCE", surface: "你投的钱已经用了两年，对方每次只回复“再等等”。", shell: "资金在项目里，期限没有落下。" },
    { id: "ESTABLISHING_INTEREST_07", pressureNature: "RESOURCE", surface: "你提出加薪，对方说公司困难；当月新增了管理层福利。", shell: "成本被说明了，分配没有说明。" },
    { id: "ESTABLISHING_INTEREST_08", pressureNature: "EVALUATION", surface: "对方主动联系你入职，最终报价比原岗位低了30%。", shell: "邀请到了，价值标准没有对齐。" },
    { id: "ESTABLISHING_INTEREST_09", pressureNature: "RESOURCE", surface: "你帮公司赚了钱，他说“这是团队的努力”。", shell: "你的功劳，被归给了大家。" },
    { id: "ESTABLISHING_INTEREST_10", pressureNature: "RESOURCE", surface: "你的项目成功了，奖金和别人一样。", shell: "你的努力，没有被区别对待。" },
    { id: "ESTABLISHING_INTEREST_11", pressureNature: "RESOURCE", surface: "股权约定写进了邮件，几轮融资后仍没有正式协议。", shell: "承诺被记录，权益没有落定。" },
    { id: "ESTABLISHING_INTEREST_12", pressureNature: "RESOURCE", surface: "公司被收购了，你的期权被稀释了。", shell: "你的股份，变成了一张纸。" },
    { id: "ESTABLISHING_INTEREST_13", pressureNature: "RESOURCE", surface: "你垫了钱，公司报销拖了半年。", shell: "你的钱，被公司用了。" },
    { id: "ESTABLISHING_INTEREST_14", pressureNature: "RESOURCE", surface: "你说按贡献分，他说“我们要看长期”。", shell: "你的付出，被当成了投资。" },
    { id: "ESTABLISHING_INTEREST_15", pressureNature: "RESOURCE", surface: "你的客户被公司划走了，没有补偿。", shell: "你的资源，被收走了。" },
  ],
  ESTABLISHING_RELATION: [
    { id: "ESTABLISHING_RELATION_01", pressureNature: "ATTACHMENT", surface: "你们躺在一张床上，中间隔着一道墙。", shell: "你们没吵架，也没话说了。" },
    { id: "ESTABLISHING_RELATION_02", pressureNature: "ATTACHMENT", surface: "你们约好的单独出行又取消了，原因仍是“最近太忙”。", shell: "共同时间一次次被推后。" },
    { id: "ESTABLISHING_RELATION_03", pressureNature: "ATTACHMENT", surface: "对方答应的事又忘了。你提醒后，收到的回复是“别计较”。", shell: "约定没有被重新确认。" },
    { id: "ESTABLISHING_RELATION_04", pressureNature: "ATTACHMENT", surface: "你说了今天的委屈，他只回了一个“嗯”。", shell: "你后面的话全咽回去了。" },
    { id: "ESTABLISHING_RELATION_05", pressureNature: "ATTACHMENT", surface: "你提出见面，对方只回复“最近太忙”，没有再约时间。", shell: "见面的日期没有落下。" },
    { id: "ESTABLISHING_RELATION_06", pressureNature: "ATTACHMENT", surface: "你发出一段很长的消息，对方隔天只回复了一个表情。", shell: "回应到了，内容没有被接住。" },
    { id: "ESTABLISHING_RELATION_07", pressureNature: "ATTACHMENT", surface: "你在对方手机里看到一个陌生名字，聊天停在深夜。", shell: "信息出现了，关系没有说明。" },
    { id: "ESTABLISHING_RELATION_08", pressureNature: "ATTACHMENT", surface: "你生病时告诉对方，对话停在一句“多喝热水”。", shell: "照顾停在了消息里。" },
    { id: "ESTABLISHING_RELATION_09", pressureNature: "ATTACHMENT", surface: "你问“我们怎么了”，得到的回复是“你想多了”。", shell: "问题被退回，没有被讨论。" },
    { id: "ESTABLISHING_RELATION_10", pressureNature: "ATTACHMENT", surface: "你等他先开口，他等你先开口。你们都等。", shell: "你们把关系，等成了陌生人。" },
    { id: "ESTABLISHING_RELATION_11", pressureNature: "ATTACHMENT", surface: "你说“我今天真的很累”，对方只回复“早点睡”。", shell: "疲惫被听见，处境没有被问。" },
    { id: "ESTABLISHING_RELATION_12", pressureNature: "ATTACHMENT", surface: "你们有孩子后，再也没有二人世界。", shell: "你们成了孩子爸妈，不是夫妻。" },
    { id: "ESTABLISHING_RELATION_13", pressureNature: "ATTACHMENT", surface: "你想商量换工作的决定，对方只说“你决定就好”。", shell: "决定回到你手里，讨论没有开始。" },
    { id: "ESTABLISHING_RELATION_14", pressureNature: "ATTACHMENT", surface: "你问“你还爱我吗”，对方回答“都老夫老妻了”。", shell: "问题被带过，回应没有落下。" },
    { id: "ESTABLISHING_RELATION_15", pressureNature: "ATTACHMENT", surface: "对方的手机换了密码，你问起时只得到“没什么”。", shell: "边界改变了，原因没有说明。" },
  ],
  ESTABLISHING_FAMILY: [
    { id: "ESTABLISHING_FAMILY_01", pressureNature: "OBLIGATION", surface: "工资到账，房贷、车贷、孩子学费一扣，没了。", shell: "你挣的钱，不是你的。" },
    { id: "ESTABLISHING_FAMILY_02", pressureNature: "OBLIGATION", surface: "你说今天很累，家人的回复是“大家都累”。", shell: "疲惫被比较，安排没有减少。" },
    { id: "ESTABLISHING_FAMILY_03", pressureNature: "OBLIGATION", surface: "你加班回家，家人问：“这周你还会一起吃饭吗？”", shell: "工作占满了原本留给家的时间。" },
    { id: "ESTABLISHING_FAMILY_04", pressureNature: "OBLIGATION", surface: "你生病躺下后，家人先问：“明天的事情谁来处理？”", shell: "身体停下了，责任还在排队。" },
    { id: "ESTABLISHING_FAMILY_05", pressureNature: "CONTROL", surface: "你提出换工作，家人只问：“稳定怎么办？”", shell: "新的方向停在了安全标准前。" },
    { id: "ESTABLISHING_FAMILY_06", pressureNature: "OBLIGATION", surface: "你给家里买了东西，收到的第一句是“怎么又花钱”。", shell: "心意出现了，支出先被看见。" },
    { id: "ESTABLISHING_FAMILY_07", pressureNature: "OBLIGATION", surface: "你提出周末休息，家人列出了还没完成的家事。", shell: "休息进入了责任清单之后。" },
    { id: "ESTABLISHING_FAMILY_08", pressureNature: "OBLIGATION", surface: "孩子的老师发来成绩提醒，家人问：“最近是谁在辅导？”", shell: "问题出现后，责任开始寻找归属。" },
    { id: "ESTABLISHING_FAMILY_09", pressureNature: "OBLIGATION", surface: "家里临时需要一笔钱，所有人都等你先开口安排。", shell: "需求到了，分担方式还没出现。" },
    { id: "ESTABLISHING_FAMILY_10", pressureNature: "EVALUATION", surface: "家庭聚会中，有人当面问：“你现在这份工作有前途吗？”", shell: "你的选择被放上了公开评价桌。" },
    { id: "ESTABLISHING_FAMILY_11", pressureNature: "OBLIGATION", surface: "你提出请人分担家务，家人问：“家里的事还要外人做吗？”", shell: "分担没有开始，解释先开始了。" },
    { id: "ESTABLISHING_FAMILY_12", pressureNature: "OBLIGATION", surface: "你想给自己买一件贵的东西，家人提醒还有长期支出。", shell: "个人需要排在了家庭预算之后。" },
    { id: "ESTABLISHING_FAMILY_13", pressureNature: "OBLIGATION", surface: "家里的账单同时到期，大家把付款提醒都转给了你。", shell: "支出被集中，分担没有说清。" },
    { id: "ESTABLISHING_FAMILY_14", pressureNature: "SURVIVAL", surface: "你生病了不敢休假，怕扣钱。", shell: "你的健康，被放在了最后。" },
    { id: "ESTABLISHING_FAMILY_15", pressureNature: "CONTROL", surface: "你提出想独处一会儿，家人追问：“是不是家里哪里不好？”", shell: "个人空间被带回了关系判断。" },
  ],
  ESTABLISHING_SOCIAL: [
    { id: "ESTABLISHING_SOCIAL_01", pressureNature: "BELONGING", surface: "你升职后，以前一起吃饭的人不叫你了。", shell: "你站高了，也站远了。" },
    { id: "ESTABLISHING_SOCIAL_02", pressureNature: "BELONGING", surface: "你被分到新部门，老同事不联系你，新同事不理你。", shell: "你哪边都不是，两边都不要你。" },
    { id: "ESTABLISHING_SOCIAL_03", pressureNature: "BELONGING", surface: "你帮对方处理过几次事情，轮到你求助时收到“不方便”。", shell: "往来的分量没有落在同一边。" },
    { id: "ESTABLISHING_SOCIAL_04", pressureNature: "BELONGING", surface: "你走进休息区时，正在聊天的几个人停下了话题。", shell: "声音停了，关系没有说明。" },
    { id: "ESTABLISHING_SOCIAL_05", pressureNature: "BELONGING", surface: "你发了朋友圈，没人点赞。你删了。", shell: "外部回应牵动了状态。" },
    { id: "ESTABLISHING_SOCIAL_06", pressureNature: "BELONGING", surface: "聚会开始很久，身边的位置换了几轮，仍没人和你交谈。", shell: "你在场，连接没有发生。" },
    { id: "ESTABLISHING_SOCIAL_07", pressureNature: "BELONGING", surface: "你主动打招呼，对方看了很久才问：“我们见过吗？”", shell: "记忆没有对上，距离先出现了。" },
    { id: "ESTABLISHING_SOCIAL_08", pressureNature: "BELONGING", surface: "你说了一个想法，大家没反应。五分钟后别人说了同样的话，大家说“好主意”。", shell: "你的声音，被当成空气。" },
    { id: "ESTABLISHING_SOCIAL_09", pressureNature: "BELONGING", surface: "你约朋友吃饭，对方说最近忙；当天出现在另一场聚会照片里。", shell: "拒绝没有说透，距离已经出现。" },
    { id: "ESTABLISHING_SOCIAL_10", pressureNature: "BELONGING", surface: "你发了求助信息，没人回。", shell: "没人接住你。" },
    { id: "ESTABLISHING_SOCIAL_11", pressureNature: "BELONGING", surface: "你参加了同学会，发现已经融不进去了。", shell: "你坐在那里，像个外人。" },
    { id: "ESTABLISHING_SOCIAL_12", pressureNature: "BELONGING", surface: "你从同事转发的截图里，看见了一个没有你的新群。", shell: "信息继续流动，你不在其中。" },
    { id: "ESTABLISHING_SOCIAL_13", pressureNature: "BELONGING", surface: "项目停下来后，你发出的几条近况消息一直没有回复。", shell: "事情变了，原来的联系也停了。" },
    { id: "ESTABLISHING_SOCIAL_14", pressureNature: "BELONGING", surface: "你主动约人，被拒绝了三次。你不再约了。", shell: "你把主动，戒掉了。" },
    { id: "ESTABLISHING_SOCIAL_15", pressureNature: "BELONGING", surface: "你在群里说话，没人接。你不再说了。", shell: "你把自己，也禁言了。" },
  ],
  ESTABLISHING_EXISTENCE: [
    { id: "ESTABLISHING_EXISTENCE_01", pressureNature: "EVALUATION", surface: "四十岁生日那晚，你列了一下当前进度。", shell: "阶段目标和现实距离拉开。" },
    { id: "ESTABLISHING_EXISTENCE_02", pressureNature: "EVALUATION", surface: "你刷朋友圈，别人的生活都在往前。", shell: "比较压力让状态停住。" },
    { id: "ESTABLISHING_EXISTENCE_03", pressureNature: "SURVIVAL", surface: "你发现自己越来越没力气了。", shell: "你不服老，身体先认了。" },
    { id: "ESTABLISHING_EXISTENCE_04", pressureNature: "EVALUATION", surface: "你复盘这十年的进度，想了很久。", shell: "阶段记录暂时空白。" },
    { id: "ESTABLISHING_EXISTENCE_05", pressureNature: "CONTROL", surface: "你突然不知道下一步要选什么。", shell: "外部目标盖住了方向。" },
    { id: "ESTABLISHING_EXISTENCE_06", pressureNature: "EVALUATION", surface: "阶段目标达成了，状态却没有松开。", shell: "新的压力接着出现。" },
    { id: "ESTABLISHING_EXISTENCE_07", pressureNature: "CONTROL", surface: "你问下一步要往哪走，没有答案。", shell: "忙碌暂时替代了方向。" },
    { id: "ESTABLISHING_EXISTENCE_08", pressureNature: "OBLIGATION", surface: "你每天早上醒来，不知道今天为什么要上班。", shell: "日程变成了压力任务。" },
    { id: "ESTABLISHING_EXISTENCE_09", pressureNature: "EVALUATION", surface: "你看着镜子，状态和预期对不上。", shell: "当前状态变得陌生。" },
    { id: "ESTABLISHING_EXISTENCE_10", pressureNature: "EVALUATION", surface: "你问自己“现在好吗”，答不上来。", shell: "状态反馈暂时中断。" },
    { id: "ESTABLISHING_EXISTENCE_11", pressureNature: "CONTROL", surface: "你拼命工作，但方向仍然模糊。", shell: "停下来会暴露空档。" },
    { id: "ESTABLISHING_EXISTENCE_12", pressureNature: "CONTROL", surface: "你突然想辞职，但不知道下一步去哪。", shell: "出口还没有形成。" },
    { id: "ESTABLISHING_EXISTENCE_13", pressureNature: "EVALUATION", surface: "你开始评估这一路的投入和回报。", shell: "结果压力压住判断。" },
    { id: "ESTABLISHING_EXISTENCE_14", pressureNature: "OBLIGATION", surface: "父母老了，孩子大了，你的日程被挤满。", shell: "长期责任占满空间。" },
    { id: "ESTABLISHING_EXISTENCE_15", pressureNature: "CONTROL", surface: "你问自己“还能调整吗”，沉默了。", shell: "可选路径暂时收窄。" },
  ],
};

export const GUANYAO_PRESSURE_SEED_MATRIX_V2: PressureSeedMatrixNode[] = PRESSURE_SEED_AGE_GROUPS.flatMap((ageGroup) =>
  PRESSURE_SEED_FIELDS.map((pressureField) => ({
    ageGroup,
    pressureField,
    status: "locked",
    seeds: matrixSeeds[`${ageGroup}_${pressureField}`],
  })),
);

const stripChinesePunctuation = (value: string): string =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

function getNodeKey(node: Pick<PressureSeedMatrixNode, "ageGroup" | "pressureField">): string {
  return `${node.ageGroup}_${node.pressureField}`;
}

export function auditGuanyaoPressureSeedMatrixV2(): PressureSeedMatrixV2AuditResult {
  const errors: string[] = [];
  const expectedNodeKeys = PRESSURE_SEED_AGE_GROUPS.flatMap((ageGroup) =>
    PRESSURE_SEED_FIELDS.map((pressureField) => `${ageGroup}_${pressureField}`),
  );
  const nodeKeys = GUANYAO_PRESSURE_SEED_MATRIX_V2.map(getNodeKey);
  const nodeKeySet = new Set(nodeKeys);
  const missingNodeKeys = expectedNodeKeys.filter((key) => !nodeKeySet.has(key));
  const duplicateNodeKeys = nodeKeys.filter((key, index) => nodeKeys.indexOf(key) !== index);
  const seedIds = GUANYAO_PRESSURE_SEED_MATRIX_V2.flatMap((node) => node.seeds.map((seed) => seed.id));
  const duplicateSeedIds = seedIds.filter((id, index) => seedIds.indexOf(id) !== index);

  if (GUANYAO_PRESSURE_SEED_MATRIX_V2.length !== expectedNodeKeys.length) {
    errors.push(`node count expected ${expectedNodeKeys.length}, got ${GUANYAO_PRESSURE_SEED_MATRIX_V2.length}`);
  }
  if (missingNodeKeys.length > 0) {
    errors.push(`missing matrix nodes: ${missingNodeKeys.join(",")}`);
  }
  if (duplicateNodeKeys.length > 0) {
    errors.push(`duplicate matrix nodes: ${Array.from(new Set(duplicateNodeKeys)).join(",")}`);
  }
  if (duplicateSeedIds.length > 0) {
    errors.push(`duplicate seed ids: ${Array.from(new Set(duplicateSeedIds)).join(",")}`);
  }

  GUANYAO_PRESSURE_SEED_MATRIX_V2.forEach((node) => {
    if (node.status !== "locked") {
      errors.push(`${getNodeKey(node)} status expected locked`);
    }
    if (node.seeds.length !== PRESSURE_SEED_SEEDS_PER_NODE) {
      errors.push(`${getNodeKey(node)} seeds expected ${PRESSURE_SEED_SEEDS_PER_NODE}, got ${node.seeds.length}`);
    }

    node.seeds.forEach((seed) => {
      if (!seed.id) errors.push(`${getNodeKey(node)} seed id empty`);
      if (!seed.pressureNature) errors.push(`${seed.id} pressureNature empty`);
      if (!seed.surface) errors.push(`${seed.id} surface empty`);
      if (!seed.shell) errors.push(`${seed.id} shell empty`);
      if (stripChinesePunctuation(seed.surface).length > 30) errors.push(`${seed.id} surface exceeds 30`);
      if (stripChinesePunctuation(seed.shell).length > 20) errors.push(`${seed.id} shell exceeds 20`);
    });
  });

  const lockedNodeCount = GUANYAO_PRESSURE_SEED_MATRIX_V2.filter((node) => node.status === "locked").length;
  const pendingNodeCount = GUANYAO_PRESSURE_SEED_MATRIX_V2.filter((node) => node.status === "pending").length;
  const scaffoldNodeCount = GUANYAO_PRESSURE_SEED_MATRIX_V2.filter((node) => node.status === "pending" || node.status === "draft").length;
  const seedSlotCount = GUANYAO_PRESSURE_SEED_MATRIX_V2.reduce((sum, node) => sum + node.seeds.length, 0);
  const readySeedCount = GUANYAO_PRESSURE_SEED_MATRIX_V2.reduce(
    (sum, node) => sum + node.seeds.filter((seed) => Boolean(seed.surface && seed.shell && seed.pressureNature)).length,
    0,
  );
  const theoreticalSeedCount =
    PRESSURE_SEED_AGE_GROUPS.length * PRESSURE_SEED_FIELDS.length * PRESSURE_SEED_SEEDS_PER_NODE;

  return {
    ok: errors.length === 0,
    ageGroupCount: PRESSURE_SEED_AGE_GROUPS.length,
    pressureFieldCount: PRESSURE_SEED_FIELDS.length,
    nodeCount: GUANYAO_PRESSURE_SEED_MATRIX_V2.length,
    expectedNodeCount: PRESSURE_SEED_AGE_GROUPS.length * PRESSURE_SEED_FIELDS.length,
    coveredNodeKeys: nodeKeys,
    missingNodeKeys,
    lockedNodeCount,
    pendingNodeCount,
    scaffoldNodeCount,
    seedSlotCount,
    readySeedCount,
    theoreticalSeedCount,
    missingSeedCount: theoreticalSeedCount - readySeedCount,
    duplicateSeedIds: Array.from(new Set(duplicateSeedIds)),
    errors,
  };
}

export function auditGuanyaoPressureSeedDraftPoolMigrationToMatrixV2() {
  const fieldCoverage = GUANYAO_PRESSURE_SEED_DRAFT_POOL.reduce<Record<PressureSeedField, number>>(
    (coverage, seed) => {
      coverage[seed.pressureField] = (coverage[seed.pressureField] ?? 0) + 1;
      return coverage;
    },
    {
      POWER: 0,
      INTEREST: 0,
      RELATION: 0,
      FAMILY: 0,
      SOCIAL: 0,
      EXISTENCE: 0,
    },
  );

  const ageCoverage = GUANYAO_PRESSURE_SEED_DRAFT_POOL.reduce<Record<PressureSeedAgeGroup, number>>(
    (coverage, seed) => {
      coverage[seed.primaryAge] = (coverage[seed.primaryAge] ?? 0) + 1;
      return coverage;
    },
    {
      YOUTH: 0,
      ESTABLISHING: 0,
      MID_LIFE: 0,
      RESTRUCTURING: 0,
      SIXTY_PLUS: 0,
    },
  );

  return {
    draftPoolTotal: GUANYAO_PRESSURE_SEED_DRAFT_POOL.length,
    fieldCoverage,
    ageCoverage,
    canMapPressureFields: PRESSURE_SEED_FIELDS.every((field) => fieldCoverage[field] > 0),
    hasExplicitMatrixAgeGroup: false,
    migrationConclusion:
      "旧 72 池可作为每个 pressureField 的现实切片素材池，但它以压力场分组为主，只有 primaryAge/ageBias 偏向，不是 5×6 节点矩阵，不能直接无损迁移为 90 枚 V2 正式矩阵。",
    p0MaterialSeedIds: GUANYAO_PRESSURE_SEED_DRAFT_POOL.filter(
      (seed) => seed.primaryAge === "ESTABLISHING" && seed.pressureField === "POWER",
    ).map((seed) => seed.id),
  };
}
