export type GuanyaoMotherCodeAsset = {
  code: "qian" | "kun" | "zhen" | "xun" | "kan" | "li" | "gen" | "dui";
  name: string;
  coreAsset: string;
  defaultProtection: string;
  misusePattern: string;
  assetReturn: string;
};

export const guanyaoMotherCodeAssetLibrary: Record<GuanyaoMotherCodeAsset["code"], GuanyaoMotherCodeAsset> = {
  qian: {
    code: "qian",
    name: "乾｜创世者",
    coreAsset: "开局、推动、定方向。",
    defaultProtection: "压力来临前，你会先扛起来，先决定方向，先让局面不要散掉。",
    misusePattern: "把负责误用成必须一个人扛。",
    assetReturn: "不是继续硬顶，而是学会分配力量。",
  },
  kun: {
    code: "kun",
    name: "坤｜承载者",
    coreAsset: "接住、承载、稳定他人。",
    defaultProtection: "压力来临前，你会先容纳、先忍住、先让别人不要塌。",
    misusePattern: "把包容误用成无限忍让。",
    assetReturn: "不是继续承受，而是确认边界。",
  },
  zhen: {
    code: "zhen",
    name: "震｜行动者",
    coreAsset: "启动、突破、把事情推起来。",
    defaultProtection: "压力来临前，你会先动起来，用动作打破停滞。",
    misusePattern: "把行动误用成冲动反应。",
    assetReturn: "不是立刻动，而是先辨认方向。",
  },
  xun: {
    code: "xun",
    name: "巽｜渗透者",
    coreAsset: "进入缝隙、观察变化、找到路径。",
    defaultProtection: "压力来临前，你会先适应、先绕开正面冲突、先寻找可进入的位置。",
    misusePattern: "把适应误用成不断退让。",
    assetReturn: "不是继续绕开，而是说出真正位置。",
  },
  kan: {
    code: "kan",
    name: "坎｜深陷者",
    coreAsset: "进入深处、感知危险、穿过复杂。",
    defaultProtection: "压力来临前，你会先警觉、先预判风险、先保护自己不被吞没。",
    misusePattern: "把警觉误用成长期防御。",
    assetReturn: "不是一直防备，而是确认真实风险。",
  },
  li: {
    code: "li",
    name: "离｜照见者",
    coreAsset: "看见、辨认、命名真相。",
    defaultProtection: "压力来临前，你会先看清楚、先判断、先把问题照出来。",
    misusePattern: "把看透误用成旁观和抽离。",
    assetReturn: "不是只看明白，而是让看见变成行动。",
  },
  gen: {
    code: "gen",
    name: "艮｜停滞者",
    coreAsset: "止住、守住、不被外界带走。",
    defaultProtection: "压力来临前，你会先停下来，先稳住边界，不让自己被局面拖走。",
    misusePattern: "把稳定误用成僵住不动。",
    assetReturn: "不是继续停住，而是选择一个最小动作。",
  },
  dui: {
    code: "dui",
    name: "兑｜转化者",
    coreAsset: "缓和、转圜、让关系重新流动。",
    defaultProtection: "压力来临前，你会先缓和，再转开，最后把真实感受藏起来。",
    misusePattern: "把转开误用成逃离自己。",
    assetReturn: "不是继续缓和，而是先确认真实感受。",
  },
};
