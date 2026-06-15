import { GUANYAO_PRESSURE_SEED_DRAFT_POOL } from "./guanyaoPressureSeedDraftPool";
import type {
  PressureSeedAgeGroup,
  PressureSeedField,
  PressureSeedMatrixNode,
  PressureSeedMatrixSeed,
  PressureSeedMatrixV2AuditResult,
} from "../types/guanyaoPressureSeed";

// Pressure Seed Matrix V2.0 locked library.
// surface: 用户可见现实切片，≤30字；必须是具体场景、动作、关系角色；不写情绪、不写解释、不写答案。
// shell: 代价预览，≤20字；可以提示旧反应，但不能变成心理标签。
// 每节点 3 枚：覆盖该年龄段 × 压力场下的三种典型压力性质。

export const PRESSURE_SEED_AGE_GROUPS: PressureSeedAgeGroup[] = [
  "YOUTH",
  "ESTABLISHING",
  "MID_LIFE",
  "RESTRUCTURING",
  "SIXTY_PLUS",
];

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
  EXISTENCE: "存在场",
};

const matrixSeeds: Record<`${PressureSeedAgeGroup}_${PressureSeedField}`, PressureSeedMatrixSeed[]> = {
  ESTABLISHING_POWER: [
    { id: "ESTABLISHING_POWER_01", pressureNature: "EVALUATION", surface: "会上你提的方案，他没接话。", shell: "你把沉默当成了否定。" },
    { id: "ESTABLISHING_POWER_02", pressureNature: "CONTROL", surface: "你只是为了改个时间，却解释了三遍。", shell: "你把小决定，也交了出去。" },
    { id: "ESTABLISHING_POWER_03", pressureNature: "RESOURCE", surface: "名额只有一个，他说你再等等。", shell: "你听出了被移出名单的声音。" },
  ],
  ESTABLISHING_RELATION: [
    { id: "ESTABLISHING_RELATION_01", pressureNature: "ATTACHMENT", surface: "消息发出去很久，对方始终没回。", shell: "你开始替他的沉默找理由。" },
    { id: "ESTABLISHING_RELATION_02", pressureNature: "ATTACHMENT", surface: "你说了今天的委屈，他只回了一个“嗯”。", shell: "你后面的话全咽回去了。" },
    { id: "ESTABLISHING_RELATION_03", pressureNature: "ATTACHMENT", surface: "你们很久没单独出去了。他总说忙。", shell: "你也开始假装不需要。" },
  ],
  ESTABLISHING_FAMILY: [
    { id: "ESTABLISHING_FAMILY_01", pressureNature: "CONTROL", surface: "工资到账，他问你这个月存了多少。", shell: "你越不敢拒绝，钱越像不是你的。" },
    { id: "ESTABLISHING_FAMILY_02", pressureNature: "CONTROL", surface: "你想搬出去住，她说外面不安全。", shell: "你不是在商量，是在等批准。" },
    { id: "ESTABLISHING_FAMILY_03", pressureNature: "CONTROL", surface: "她总说“我是为你好”。", shell: "你听得多了，连自己在乎什么都不确定了。" },
  ],
  MID_LIFE_POWER: [
    { id: "MID_LIFE_POWER_01", pressureNature: "EVALUATION", surface: "你在这个行业十年了，抬头还是经理。", shell: "你不敢算，怕算出自己不值。" },
    { id: "MID_LIFE_POWER_02", pressureNature: "EVALUATION", surface: "公司来了个比你小十岁的总监。", shell: "你不怕他比你强，你怕自己已经被超过了。" },
    { id: "MID_LIFE_POWER_03", pressureNature: "IDENTITY", surface: "新人开始接你负责过的部分。", shell: "你像被悄悄摘掉了一块牌子。" },
  ],
  MID_LIFE_INTEREST: [
    { id: "MID_LIFE_INTEREST_01", pressureNature: "RESOURCE", surface: "账目你一直没细看，分成比例已经被改了。", shell: "你以为的合伙，只是被通知。" },
    { id: "MID_LIFE_INTEREST_02", pressureNature: "RESOURCE", surface: "客户是你拉来的，他绕过你单独对接。", shell: "他替你分担的不是工作，是你的位置。" },
    { id: "MID_LIFE_INTEREST_03", pressureNature: "RESOURCE", surface: "你想退出，他说按合同你拿不到多少。", shell: "你签字的每一页，都在替今天的你认亏。" },
  ],
  YOUTH_EXISTENCE: [
    { id: "YOUTH_EXISTENCE_01", pressureNature: "IDENTITY", surface: "毕业了，同学都上班了，你不知道自己想做什么。", shell: "你怕被问，是因为你自己也不知道答案。" },
    { id: "YOUTH_EXISTENCE_02", pressureNature: "IDENTITY", surface: "你做了很多事，但没有一件能写进简历。", shell: "你做了一大堆，却说不出一件值得说的。" },
    { id: "YOUTH_EXISTENCE_03", pressureNature: "IDENTITY", surface: "你换了第三份工作，还是觉得不适合。", shell: "你开始怀疑问题是不是自己。" },
  ],
  ESTABLISHING_EXISTENCE: [
    { id: "ESTABLISHING_EXISTENCE_01", pressureNature: "IDENTITY", surface: "三十岁生日那晚，你列了一下自己的成就。", shell: "你发现没什么好写的。" },
    { id: "ESTABLISHING_EXISTENCE_02", pressureNature: "IDENTITY", surface: "你刷朋友圈，别人的生活都在往前。", shell: "你停在原地，开始不想看了。" },
    { id: "ESTABLISHING_EXISTENCE_03", pressureNature: "IDENTITY", surface: "你看着同龄人买房、升职、结婚。", shell: "你不嫉妒，只是不知道自己在等什么。" },
  ],
  ESTABLISHING_INTEREST: [
    { id: "ESTABLISHING_INTEREST_01", pressureNature: "EVALUATION", surface: "报价发出去以后，对方只回了一个“有点高”。", shell: "你开始怀疑自己到底值不值。" },
    { id: "ESTABLISHING_INTEREST_02", pressureNature: "RESOURCE", surface: "年底他说一起分，你信了三年。", shell: "你等成了习惯。" },
    { id: "ESTABLISHING_INTEREST_03", pressureNature: "RESOURCE", surface: "你提议按贡献分，他说生意不是这么算的。", shell: "你越怕撕破脸，越拿不回应得的。" },
  ],
  MID_LIFE_FAMILY: [
    { id: "MID_LIFE_FAMILY_01", pressureNature: "CONTROL", surface: "你买了件贵的，她说你乱花钱。", shell: "你花自己的钱，还得看她脸色。" },
    { id: "MID_LIFE_FAMILY_02", pressureNature: "OBLIGATION", surface: "你扛了很久，但没人问过你。", shell: "你越能扛，越没人知道你在裂。" },
    { id: "MID_LIFE_FAMILY_03", pressureNature: "OBLIGATION", surface: "家里的事、工作的事，都找你。", shell: "你习惯了被需要，但忘了自己也会累。" },
  ],
  MID_LIFE_RELATION: [
    { id: "MID_LIFE_RELATION_01", pressureNature: "ATTACHMENT", surface: "你们躺在一张床上，中间隔着一道墙。", shell: "你们没吵架，也没话说了。" },
    { id: "MID_LIFE_RELATION_02", pressureNature: "ATTACHMENT", surface: "你们还在一起，但你很久没感到过安心。", shell: "你们还在一起，只是谁也不在里面了。" },
    { id: "MID_LIFE_RELATION_03", pressureNature: "ATTACHMENT", surface: "他答应的事又忘了，你说他太计较。", shell: "你越怕被说计较，越不敢说出在乎什么。" },
  ],
  MID_LIFE_EXISTENCE: [
    { id: "MID_LIFE_EXISTENCE_01", pressureNature: "IDENTITY", surface: "你在这家公司待了十五年，走出去不知道还能做什么。", shell: "你不是不想走，是不敢走。" },
    { id: "MID_LIFE_EXISTENCE_02", pressureNature: "IDENTITY", surface: "你以前觉得自己和别人不一样。", shell: "你现在怕自己其实和所有人一样平庸。" },
    { id: "MID_LIFE_EXISTENCE_03", pressureNature: "IDENTITY", surface: "你开始记不住新人的名字。", shell: "你不承认老，但身体已经开始认了。" },
  ],
  YOUTH_POWER: [
    { id: "YOUTH_POWER_01", pressureNature: "BELONGING", surface: "实习期你努力表现，但他们聚餐从没叫过你。", shell: "你越努力，他们越看不见你。" },
    { id: "YOUTH_POWER_02", pressureNature: "RESOURCE", surface: "你提了个建议，大家说“再想想”。", shell: "后来方案换了皮，成了别人的成果。" },
    { id: "YOUTH_POWER_03", pressureNature: "CONTROL", surface: "你请假回来，流程已经被改了。", shell: "你不在的时候，他们替你做了决定。" },
  ],
  MID_LIFE_SOCIAL: [
    { id: "MID_LIFE_SOCIAL_01", pressureNature: "BELONGING", surface: "你升职后，以前一起吃饭的人开始躲你。", shell: "你站得越高，身边的人越少。" },
    { id: "MID_LIFE_SOCIAL_02", pressureNature: "BELONGING", surface: "公司改革，你被划到新部门。", shell: "老同事不联系你，新同事不想理你。" },
    { id: "MID_LIFE_SOCIAL_03", pressureNature: "BELONGING", surface: "同事结婚请了全组，唯独没请你。", shell: "你不被邀请，就不在那个圈子里。" },
  ],
  ESTABLISHING_SOCIAL: [
    { id: "ESTABLISHING_SOCIAL_01", pressureNature: "BELONGING", surface: "同事们在群里聊得火热，你插不进话。", shell: "你假装没看见，他们也就真的当你不存在。" },
    { id: "ESTABLISHING_SOCIAL_02", pressureNature: "BELONGING", surface: "大家一起吃饭，没人叫你。", shell: "你越假装不在意，越像一个局外人。" },
    { id: "ESTABLISHING_SOCIAL_03", pressureNature: "BELONGING", surface: "你帮了他很多次，你需要帮忙时他说“这个我不方便”。", shell: "你帮过的人，不一定会帮你。" },
  ],
  YOUTH_FAMILY: [
    { id: "YOUTH_FAMILY_01", pressureNature: "CONTROL", surface: "你想选这个专业，他说没前途。", shell: "你的兴趣，在他眼里只是不成熟。" },
    { id: "YOUTH_FAMILY_02", pressureNature: "CONTROL", surface: "你谈了对象，他还没见就说不合适。", shell: "他看不上的，你就不敢爱。" },
    { id: "YOUTH_FAMILY_03", pressureNature: "CONTROL", surface: "你回家晚一点，电话就打过来了。", shell: "你报备得越勤，他们管得越细。" },
  ],
  YOUTH_RELATION: [
    { id: "YOUTH_RELATION_01", pressureNature: "ATTACHMENT", surface: "你发了很多条消息，对方只回了一个表情。", shell: "你开始怀疑自己是不是太黏人了。" },
    { id: "YOUTH_RELATION_02", pressureNature: "ATTACHMENT", surface: "你们吵架后，他三天没联系你。", shell: "你一直在等，不敢先开口。" },
    { id: "YOUTH_RELATION_03", pressureNature: "ATTACHMENT", surface: "他说“我们冷静一下”，你不知道要冷静多久。", shell: "你卡在等与不等之间。" },
  ],
  YOUTH_SOCIAL: [
    { id: "YOUTH_SOCIAL_01", pressureNature: "BELONGING", surface: "他们拉了小群，你不在里面。", shell: "你不在那个群里，就不在那个局里。" },
    { id: "YOUTH_SOCIAL_02", pressureNature: "BELONGING", surface: "你发了朋友圈，没人点赞，你又删了。", shell: "你把回应，当成了存在。" },
    { id: "YOUTH_SOCIAL_03", pressureNature: "BELONGING", surface: "你发现他们在背后议论你。", shell: "你怕知道真相，就只能活在猜测里。" },
  ],
  RESTRUCTURING_POWER: [
    { id: "RESTRUCTURING_POWER_01", pressureNature: "IDENTITY", surface: "快退休了，以前常联系的人一个电话也没有。", shell: "位置没了，关系也跟着没了。" },
    { id: "RESTRUCTURING_POWER_02", pressureNature: "BELONGING", surface: "公司里年轻人越来越多，你越来越插不上话。", shell: "你还没退，已经被边缘化了。" },
    { id: "RESTRUCTURING_POWER_03", pressureNature: "CONTROL", surface: "他说“这个你就不用管了”。", shell: "你被架空了，还要装作轻松。" },
  ],
  RESTRUCTURING_FAMILY: [
    { id: "RESTRUCTURING_FAMILY_01", pressureNature: "OBLIGATION", surface: "父母身体越来越差，你两边跑。", shell: "你不敢病，也不敢停。" },
    { id: "RESTRUCTURING_FAMILY_02", pressureNature: "OBLIGATION", surface: "孩子要买房，你掏空了积蓄。", shell: "你把养老的钱，也填了进去。" },
    { id: "RESTRUCTURING_FAMILY_03", pressureNature: "OBLIGATION", surface: "你说累了，没人当真。", shell: "你越能扛，越没人知道你在裂。" },
  ],
  RESTRUCTURING_EXISTENCE: [
    { id: "RESTRUCTURING_EXISTENCE_01", pressureNature: "IDENTITY", surface: "你突然发现，自己除了上班什么都不会。", shell: "你不知道退休后还能做什么。" },
    { id: "RESTRUCTURING_EXISTENCE_02", pressureNature: "IDENTITY", surface: "你看着镜子，觉得自己老了。", shell: "你还没准备好，时间已经不在了。" },
    { id: "RESTRUCTURING_EXISTENCE_03", pressureNature: "IDENTITY", surface: "你以前想做的事，一件都没做。", shell: "你怕这辈子就这样了。" },
  ],
  RESTRUCTURING_SOCIAL: [
    { id: "RESTRUCTURING_SOCIAL_01", pressureNature: "BELONGING", surface: "你辞职后，以前的朋友不再联系你。", shell: "你是被请出局的人。" },
    { id: "RESTRUCTURING_SOCIAL_02", pressureNature: "BELONGING", surface: "你想找个老友聊聊，翻了半天不知道找谁。", shell: "你把关系，活成了资源。" },
    { id: "RESTRUCTURING_SOCIAL_03", pressureNature: "BELONGING", surface: "你参加了同学会，发现已经融不进去了。", shell: "你坐在那里，像个外人。" },
  ],
  SIXTY_PLUS_EXISTENCE: [
    { id: "SIXTY_PLUS_EXISTENCE_01", pressureNature: "IDENTITY", surface: "退休第一个月，你突然不知道每天醒来要做什么。", shell: "你不是没事做，是不知道做什么才算数。" },
    { id: "SIXTY_PLUS_EXISTENCE_02", pressureNature: "SURVIVAL", surface: "你发现自己越来越没力气了。", shell: "你不服老，身体先认了。" },
    { id: "SIXTY_PLUS_EXISTENCE_03", pressureNature: "IDENTITY", surface: "你活了一辈子，好像没为自己活过。", shell: "你怕这辈子白过了。" },
  ],
  SIXTY_PLUS_FAMILY: [
    { id: "SIXTY_PLUS_FAMILY_01", pressureNature: "BELONGING", surface: "孩子们说“你不用管了”。", shell: "你不是被照顾，是被推开了。" },
    { id: "SIXTY_PLUS_FAMILY_02", pressureNature: "BELONGING", surface: "你在家待着，像个外人。", shell: "你的话，没人听了。" },
    { id: "SIXTY_PLUS_FAMILY_03", pressureNature: "OBLIGATION", surface: "你病了，不想告诉他们。", shell: "你怕成为负担。" },
  ],
  SIXTY_PLUS_SOCIAL: [
    { id: "SIXTY_PLUS_SOCIAL_01", pressureNature: "BELONGING", surface: "你以前帮过的人，现在不接电话了。", shell: "人走茶凉，你不怪谁。" },
    { id: "SIXTY_PLUS_SOCIAL_02", pressureNature: "BELONGING", surface: "你在这个城市住了三十年，还是一个人。", shell: "你不想给人添麻烦。" },
    { id: "SIXTY_PLUS_SOCIAL_03", pressureNature: "BELONGING", surface: "你参加了社区活动，没人跟你说话。", shell: "你坐在角落里，像空气。" },
  ],
  YOUTH_INTEREST: [
    { id: "YOUTH_INTEREST_01", pressureNature: "RESOURCE", surface: "你被中介骗了押金，投诉没人理。", shell: "你第一次觉得这个世界不讲道理。" },
    { id: "YOUTH_INTEREST_02", pressureNature: "RESOURCE", surface: "你做了兼职，老板拖着不给钱。", shell: "你不敢撕破脸，怕连本都拿不回。" },
    { id: "YOUTH_INTEREST_03", pressureNature: "RESOURCE", surface: "你说好了的分成，最后他说“忘了”。", shell: "你的劳动，在他眼里不值钱。" },
  ],
  RESTRUCTURING_INTEREST: [
    { id: "RESTRUCTURING_INTEREST_01", pressureNature: "RESOURCE", surface: "你帮了半辈子的公司，裁员第一个想到你。", shell: "你把青春交出去，他们把你还回来。" },
    { id: "RESTRUCTURING_INTEREST_02", pressureNature: "SURVIVAL", surface: "退休金的事扯了两年，没人给你准信。", shell: "你替国家想，国家没替你想。" },
    { id: "RESTRUCTURING_INTEREST_03", pressureNature: "RESOURCE", surface: "你投了钱的项目，合伙人说“再等等”。", shell: "你等不起，他等得起。" },
  ],
  RESTRUCTURING_RELATION: [
    { id: "RESTRUCTURING_RELATION_01", pressureNature: "ATTACHMENT", surface: "孩子大了，不在家了。你和他说不到一块去。", shell: "你认识他，但他已经不是你认识的那个人了。" },
    { id: "RESTRUCTURING_RELATION_02", pressureNature: "ATTACHMENT", surface: "你和他之间，越来越像室友。", shell: "你们没离婚，也过不下去了。" },
    { id: "RESTRUCTURING_RELATION_03", pressureNature: "ATTACHMENT", surface: "你生病的时候，他说“我忙”。", shell: "你需要他的时候，他不在。" },
  ],
  SIXTY_PLUS_POWER: [
    { id: "SIXTY_PLUS_POWER_01", pressureNature: "EVALUATION", surface: "你想说两句，他们叫你“老同志”。", shell: "你的经验，被当成老一套。" },
    { id: "SIXTY_PLUS_POWER_02", pressureNature: "CONTROL", surface: "办事的地方，叫你回去等通知。", shell: "你等了很久，没有通知。" },
    { id: "SIXTY_PLUS_POWER_03", pressureNature: "BELONGING", surface: "你的意见没人听了。", shell: "你还没死，已经被人当不存在了。" },
  ],
  SIXTY_PLUS_INTEREST: [
    { id: "SIXTY_PLUS_INTEREST_01", pressureNature: "RESOURCE", surface: "你存了一辈子的钱，孩子说要用。", shell: "你不敢不给，也不敢全给。" },
    { id: "SIXTY_PLUS_INTEREST_02", pressureNature: "RESOURCE", surface: "你买了理财，业务员说“稳赚不赔”。", shell: "你亏了，他不见了。" },
    { id: "SIXTY_PLUS_INTEREST_03", pressureNature: "RESOURCE", surface: "你借钱给亲戚，他不提还的事。", shell: "你要钱，就是不讲亲情。" },
  ],
  SIXTY_PLUS_RELATION: [
    { id: "SIXTY_PLUS_RELATION_01", pressureNature: "ATTACHMENT", surface: "老伴走了，你一个人吃饭。", shell: "你觉得吃什么都没味。" },
    { id: "SIXTY_PLUS_RELATION_02", pressureNature: "ATTACHMENT", surface: "你打电话给孩子，他说“这周忙”。", shell: "你不敢再打了。" },
    { id: "SIXTY_PLUS_RELATION_03", pressureNature: "BELONGING", surface: "你翻手机，找不到一个可以说说话的人。", shell: "你把人都弄丢了。" },
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

  if (GUANYAO_PRESSURE_SEED_MATRIX_V2.length !== 30) {
    errors.push(`node count expected 30, got ${GUANYAO_PRESSURE_SEED_MATRIX_V2.length}`);
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
    if (node.seeds.length !== 3) {
      errors.push(`${getNodeKey(node)} seeds expected 3, got ${node.seeds.length}`);
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
  const theoreticalSeedCount = PRESSURE_SEED_AGE_GROUPS.length * PRESSURE_SEED_FIELDS.length * 3;

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
