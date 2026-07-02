import type { GuanyaoLanguageDimension, GuanyaoStarBeastName } from "./types";

export type SixDimensionalDialogueInput = {
  pressureSeedText: string;
  starBeastName: GuanyaoStarBeastName;
  dimension: GuanyaoLanguageDimension;
};

export type SixDimensionalDialogueNode = {
  id: 1 | 2 | 3 | 4 | 5 | 6;
  title: "镜面" | "斩断" | "播种" | "汇聚" | "显影" | "共振";
  text: string;
  actionText: string;
};

export type SixDimensionalDialogueOutput = {
  fieldTitle: string;
  pressureText: string;
  blackholeStatus: string;
  beastIntro: string;
  nodes: SixDimensionalDialogueNode[];
  idleStatus: string;
  activeStatus: string;
  bloomStatus: string;
  completionText: string;
  footerIdleText: string;
};

const beastIntroTone: Record<GuanyaoStarBeastName, Record<GuanyaoLanguageDimension, string>> = {
  青龙: {
    body: "青龙察觉到了这股阻碍。\n它先落在你的身体里。\n别急着判断，我们先让这口气重新流动。",
    emotion: "青龙察觉到了这股阻碍。\n它让你的心口有些起伏。\n别急着判断，我们先让情绪有地方流动。",
    thought: "青龙察觉到了这股阻碍。\n它让你的脑海反复打转。\n别急着判断，我们先让念头像风一样松开。",
    behavior: "青龙察觉到了这股阻碍。\n它让你的脚步暂时停住。\n别急着判断，我们先让一个小动作重新发生。",
    memory: "青龙察觉到了这股阻碍。\n它把你拉回一段旧影里。\n别急着判断，我们先让过去慢慢退开。",
    motivation: "青龙察觉到了这股阻碍。\n它让方向感暂时变弱。\n别急着判断，我们先让愿望重新生长。",
  },
  白虎: {
    body: "白虎感受到了这股阻碍。\n它先落在你的身体里。\n别急着判断，我们先把这一点光送回去。",
    emotion: "白虎感受到了这股阻碍。\n它让你的心口开始收紧。\n别急着判断，我们先让这股波动被接住。",
    thought: "白虎感受到了这股阻碍。\n它让你的脑海不断回响。\n别急着判断，我们先替你守住边界。",
    behavior: "白虎感受到了这股阻碍。\n它让你的脚步停在原地。\n别急着判断，我们先松开那一下卡住。",
    memory: "白虎感受到了这股阻碍。\n它碰到了你的旧痕。\n别急着判断，我们先把旧影从身上放下来。",
    motivation: "白虎感受到了这股阻碍。\n它让你的方向感变得模糊。\n别急着判断，我们先帮你重新站稳。",
  },
  朱雀: {
    body: "朱雀听见了这股阻碍。\n它让你的呼吸短了一拍。\n别急着判断，我们先让身体说出它的疲惫。",
    emotion: "朱雀听见了这股阻碍。\n它让你的心口泛起波动。\n别急着判断，我们先让没有说出口的感受落下来。",
    thought: "朱雀听见了这股阻碍。\n它让你的脑海还在解释。\n别急着判断，我们先让一句真话浮出来。",
    behavior: "朱雀听见了这股阻碍。\n它让你想做又停住。\n别急着判断，我们先让一个动作替你开口。",
    memory: "朱雀听见了这股阻碍。\n它唤醒了一段旧回声。\n别急着判断，我们先听完它，再放下它。",
    motivation: "朱雀听见了这股阻碍。\n它让愿望一时失声。\n别急着判断，我们先把那点火重新点亮。",
  },
  玄武: {
    body: "玄武接住了这股阻碍。\n它先沉进你的身体里。\n别急着判断，我们先让紧绷慢慢落地。",
    emotion: "玄武接住了这股阻碍。\n它让你的心口有些发沉。\n别急着判断，我们先把这股委屈包住。",
    thought: "玄武接住了这股阻碍。\n它让你的脑海停不下来。\n别急着判断，我们先让回声变轻一点。",
    behavior: "玄武接住了这股阻碍。\n它让你的脚步还没迈出。\n别急着判断，我们先给这个动作一点时间。",
    memory: "玄武接住了这股阻碍。\n它把旧经验带回来了。\n别急着判断，我们先让它慢慢沉下去。",
    motivation: "玄武接住了这股阻碍。\n它让方向感变得安静。\n别急着判断，我们先陪它重新聚光。",
  },
};

const dimensionCompletion: Record<GuanyaoLanguageDimension, string> = {
  body: "身体里的寒霜正在融化。",
  emotion: "情绪里的暗流正在变缓。",
  thought: "脑海里的回声正在变轻。",
  behavior: "卡住的动作正在重新松开。",
  memory: "旧经验的拉力正在减弱。",
  motivation: "内在的方向正在重新聚光。",
};

const bodyTemplate: SixDimensionalDialogueNode[] = [
  {
    id: 1,
    title: "镜面",
    text: "这颗种子沉入身体，让你的胸口发闷，肩膀沉重。\n你是不是已经很久没有真正喘口气了？",
    actionText: "轻触：是的，我感受到了疲惫。",
  },
  {
    id: 2,
    title: "斩断",
    text: "年龄和职级只是此刻的时空坐标，不是你的边界。\n白虎的骨骼，不该被一把椅子锁住。",
    actionText: "滑动：吐出这口浊气，重新调频。",
  },
  {
    id: 3,
    title: "播种",
    text: "身体是原力的容器。\n今晚，给它一次不被打扰的修复。",
    actionText: "选择：今晚，我对自己温柔一次。",
  },
  {
    id: 4,
    title: "汇聚",
    text: "把意识带回紧绷的地方。\n长按这一刻，把你还愿意前行的光，注入这片花瓣。",
    actionText: "长按5秒：原力正在灌溉。",
  },
  {
    id: 5,
    title: "显影",
    text: "看，星河正在复苏。\n你刚才送回来的光，已经把黑洞的边缘熔成一束亮光。",
    actionText: "轻触：它正在开成一束光。",
  },
  {
    id: 6,
    title: "共振",
    text: "白虎已经接住了这点光。\n身体里的寒霜正在融化，其余五个维度正在回应。",
    actionText: "向上滑动：让这一局开始结晶。",
  },
];

const dimensionTemplates: Record<GuanyaoLanguageDimension, SixDimensionalDialogueNode[]> = {
  body: bodyTemplate,
  emotion: buildGenericTemplate({
    mirror: "这颗种子落进心口，让那里泛起一阵说不清的波动。",
    action: "轻触：我先接住这股感受。",
    release: "情绪里的暗流正在变缓。",
  }),
  thought: buildGenericTemplate({
    mirror: "这颗种子进入脑海，让解释和回声反复打转。",
    action: "轻触：我先停下这一轮反复。",
    release: "脑海里的回声正在变轻。",
  }),
  behavior: buildGenericTemplate({
    mirror: "这颗种子压住脚步，让一个本来能做的小动作停在原地。",
    action: "轻触：我先做一个很小的动作。",
    release: "卡住的动作正在重新松开。",
  }),
  memory: buildGenericTemplate({
    mirror: "这颗种子牵动旧痕，让过去的经验又靠近了一点。",
    action: "轻触：我先把过去放回过去。",
    release: "旧经验的拉力正在减弱。",
  }),
  motivation: buildGenericTemplate({
    mirror: "这颗种子遮住方向，让你一时看不清为什么要继续。",
    action: "轻触：我先找回一点愿望。",
    release: "内在的方向正在重新聚光。",
  }),
};

export function generateSixDimensionalTuningDialogue(
  input: SixDimensionalDialogueInput,
): SixDimensionalDialogueOutput {
  const pressureSeedText = input.pressureSeedText.trim() || "这件事刚刚发生过。";

  return {
    fieldTitle: "当前时空坐标遭遇风暴。\n先别急着判断，我们一起把光送回去。",
    pressureText: `『${pressureSeedText}』`,
    blackholeStatus: "这颗种子正在影响你。",
    beastIntro: beastIntroTone[input.starBeastName]?.[input.dimension] ?? beastIntroTone.白虎.body,
    nodes: dimensionTemplates[input.dimension] ?? dimensionTemplates.body,
    idleStatus: `${input.starBeastName}正在接住它`,
    activeStatus: "它正在慢慢开花",
    bloomStatus: "它正在开成一束光",
    completionText: "这一局，已经开始结晶。",
    footerIdleText: "轻触星点，慢慢点亮这片花。",
  };
}

function buildGenericTemplate(input: { mirror: string; action: string; release: string }): SixDimensionalDialogueNode[] {
  return [
    { id: 1, title: "镜面", text: input.mirror, actionText: input.action },
    {
      id: 2,
      title: "斩断",
      text: "它已经出现了。\n现在先不要沿着旧路走下去。",
      actionText: "滑动：我先松开一点。",
    },
    {
      id: 3,
      title: "播种",
      text: "只需要一个很小的动作。\n小到今天真的做得到。",
      actionText: "选择：我愿意试一次。",
    },
    {
      id: 4,
      title: "汇聚",
      text: "把注意力带回来。\n给这片花瓣一点安静的光。",
      actionText: "长按5秒：把光送回去。",
    },
    {
      id: 5,
      title: "显影",
      text: "你刚才送回来的光，已经开始被看见。",
      actionText: "轻触：它正在开成一束光。",
    },
    {
      id: 6,
      title: "共振",
      text: input.release,
      actionText: "向上滑动：让这一局开始结晶。",
    },
  ];
}
