import type { GuanyaoEntropyDomain } from "./types";

export type EntropySeedInput = {
  ageBand?: string;
  domain: GuanyaoEntropyDomain;
};

export type EntropySeedOutput = {
  seedText: string;
  domainLabel: string;
  emotionalTone: "刺痛" | "疲惫" | "孤独" | "卡住" | "压抑";
};

const entropySeedPool: Record<
  GuanyaoEntropyDomain,
  Array<{ seedText: string; emotionalTone: EntropySeedOutput["emotionalTone"] }>
> = {
  career: [
    { seedText: "在这个行业十年了，抬头还是经理。", emotionalTone: "疲惫" },
    { seedText: "每天晚上最自由的时刻，是在地下车库熄火后的那五分钟。", emotionalTone: "压抑" },
    { seedText: "公司来了个比你小十岁的总监，你开始倒数自己。", emotionalTone: "刺痛" },
  ],
  relationship: [
    { seedText: "虽然每天都在一起睡觉，但希望中间隔着一堵墙。", emotionalTone: "孤独" },
    { seedText: "列表里有三千个好友，却找不到一个凌晨三点能拨通的人。", emotionalTone: "孤独" },
    { seedText: "你们没有吵架，只是越来越像两个礼貌的陌生人。", emotionalTone: "压抑" },
  ],
  self: [
    { seedText: "你一直在满足所有人的期待，唯独弄丢了那个最想成为的自己。", emotionalTone: "疲惫" },
    { seedText: "你不是不努力，只是越来越不知道努力是为了什么。", emotionalTone: "卡住" },
    { seedText: "你每天都在往前走，却越来越不像自己。", emotionalTone: "压抑" },
  ],
  family: [
    { seedText: "你总说没事，是因为家里已经没有人能接住你的有事。", emotionalTone: "疲惫" },
    { seedText: "你习惯把委屈咽下去，好让这个家看起来没有裂缝。", emotionalTone: "压抑" },
  ],
  social: [
    { seedText: "你在人群里笑得很熟练，回到家却一句话都不想说。", emotionalTone: "疲惫" },
    { seedText: "你越来越会聊天，也越来越难说真话。", emotionalTone: "孤独" },
  ],
};

const domainLabel: Record<GuanyaoEntropyDomain, string> = {
  career: "职场",
  relationship: "关系",
  self: "自我",
  family: "家庭",
  social: "社交",
};

export function generateEntropySeedLanguage(input: EntropySeedInput): EntropySeedOutput {
  const pool = entropySeedPool[input.domain];
  const ageOffset = input.ageBand ? input.ageBand.length : 0;
  const seed = pool[ageOffset % pool.length];

  return {
    seedText: seed.seedText,
    domainLabel: domainLabel[input.domain],
    emotionalTone: seed.emotionalTone,
  };
}
