import type { GuanyaoSession, YaoBit } from "../types";

type YaoTextContext = Pick<GuanyaoSession, "selectedFragment" | "realitySeed"> & {
  autoYaoPath: YaoBit[];
};

type YaoText = {
  title: string;
  lines: string[];
};

function getSceneTitle(context: YaoTextContext): string {
  return String(context.realitySeed?.title ?? "");
}

export function getGravityYaoTexts(context: YaoTextContext): YaoText[] {
  const sceneTitle = getSceneTitle(context);

  if (sceneTitle.includes("车里没发动")) {
    return [
      {
        title: "身体先动。",
        lines: ["你盯着那条消息，", "拇指停在回拨键上。", "车里的空调声突然变得很响。"],
      },
      {
        title: "旧路接管。",
        lines: ["你把手机扣在副驾上。", "没有回拨，", "也没有真正放下。"],
      },
      {
        title: "代价显形。",
        lines: ["车窗外的灯一盏盏灭下去。", "你发现真正卡住你的，", "不是那通电话。"],
      },
    ];
  }

  if (sceneTitle.includes("阳台算账")) {
    return [
      {
        title: "身体先动。",
        lines: ["你把那笔账又算了一遍。", "最后一行数字停在那里，", "手指没有离开屏幕。"],
      },
      {
        title: "旧路接管。",
        lines: ["你开始翻下一张账单。", "每一个数字，", "都在把今晚往后拖。"],
      },
      {
        title: "代价显形。",
        lines: ["天快亮的时候，", "你发现补上的不是缺口，", "只是下一次崩开的时间。"],
      },
    ];
  }

  if (sceneTitle.includes("对话框前")) {
    return [
      {
        title: "身体先动。",
        lines: ["光标还在闪。", "你没有发送，", "拇指却一直停在键盘上方。"],
      },
      {
        title: "旧路接管。",
        lines: ["屏幕暗下去。", "那句话没有发出，", "但它还堵在喉咙里。"],
      },
      {
        title: "代价显形。",
        lines: ["你终于看见，", "那句话不是为了沟通，", "是为了证明自己还没被丢下。"],
      },
    ];
  }

  return [
    {
      title: "身体先动。",
      lines: ["你没有立刻行动。", "只是先看见，", "身体已经停在原地。"],
    },
    {
      title: "旧路接管。",
      lines: ["你以为自己还在选择。", "但手上的动作，", "已经沿着旧路走了一遍。"],
    },
    {
      title: "代价显形。",
      lines: ["这一步之后，", "事情没有结束。", "只是换了一种方式压回来。"],
    },
  ];
}

export function getCollapseYaoTexts(context: YaoTextContext): YaoText[] {
  const sceneTitle = getSceneTitle(context);

  if (sceneTitle.includes("车里没发动")) {
    return [
      {
        title: "恐惧开始接管。",
        lines: ["那通电话还没有结束。", "你已经开始预演，", "对方会把局面推到哪一步。"],
      },
      {
        title: "执念压到顶点。",
        lines: ["你终于把话逼到了台面上。", "但车里更安静了。", "你发现自己要的不是答案，是位置。"],
      },
    ];
  }

  if (sceneTitle.includes("阳台算账")) {
    return [
      {
        title: "恐惧开始接管。",
        lines: ["那笔账已经算不出新结果。", "可你还是没有停。", "你开始害怕停下来的空白。"],
      },
      {
        title: "执念压到顶点。",
        lines: ["你把今晚又往后拖了一点。", "缺口没有消失。", "只是换成了下一轮更大的压力。"],
      },
    ];
  }

  if (sceneTitle.includes("对话框前")) {
    return [
      {
        title: "恐惧开始接管。",
        lines: ["对话框没有新消息。", "你开始反复点亮屏幕。", "沉默变成了一个位置。"],
      },
      {
        title: "执念压到顶点。",
        lines: ["你又补了一句。", "对话框还是没有动。", "你终于看见，自己在抢一个位置。"],
      },
    ];
  }

  return [
    {
      title: "恐惧开始接管。",
      lines: ["你已经看见那个缺口。", "但手没有退回来。", "它开始替你继续往前。"],
    },
    {
      title: "执念压到顶点。",
      lines: ["你不是还想赢。", "你只是无法接受，", "自己已经快要失去位置。"],
    },
  ];
}
