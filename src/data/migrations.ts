import type { MigrationCard } from "../types";

export const migrations: MigrationCard[] = [
  {
    choiceCode: "101100",
    currentTrack: {
      code: "003",
      symbol: "☵",
      traditionalName: "水雷屯",
      scriptTitle: "《屯难》",
    },
    migrationDirection: {
      code: "021",
      symbol: "☲",
      traditionalName: "火雷噬嗑",
      scriptTitle: "《硬骨》",
    },
    cardTitle: "从原地蓄力，迁移到一次清晰动作",
    shortReading: [
      "你现在的问题不是没有方向，而是把启动动作留在脑内反复加工。",
      "真正的迁移点，是把一个可见的小动作放到现实里。",
    ],
    conflictScript90d: {
      act1: {
        title: "近期惯性引爆点",
        lines: ["你会继续等待更完整的准备感。", "越等待，越容易把行动误认成风险。"],
      },
      act2: {
        title: "中期执念过载点",
        lines: ["你开始用解释维护停滞。", "真正消耗你的，不是外界阻力，而是反复校准。"],
      },
      act3: {
        title: "90天反本能节点",
        lines: ["选择一个最小动作，在当天完成。", "不要证明自己，只让轨迹发生偏移。"],
      },
    },
    antiInstinctNode: "把今天最容易拖延的一步，缩小到十分钟内完成。",
    status: "active",
  },
  {
    choiceCode: "101101",
    currentTrack: {
      code: "021",
      symbol: "☲",
      traditionalName: "火雷噬嗑",
      scriptTitle: "《硬骨》",
    },
    migrationDirection: {
      code: "003",
      symbol: "☵",
      traditionalName: "水雷屯",
      scriptTitle: "《屯难》",
    },
    cardTitle: "从惯性冲刺，迁移到可承受的反本能动作",
    shortReading: [
      "你已经看见压力，也看见自己正在重复熟悉的反应。",
      "这一次不需要赢过全部惯性，只需要在关键节点按下相反方向。",
    ],
    originGravityCoordinate: {
      title: "第0幕｜出厂重力坐标",
      coordinate: "深渊其体，停滞其用。",
      primaryFactor: {
        forceKey: "坎",
        archetype: "深渊者",
        role: "体",
        lines: [
          "你习惯活在危机、悬停和高压中。",
          "你不断推演、挣扎、预判所有可能的下坠，",
          "像是在寻找出口，其实是在拖延那个必须尘埃落定的动作。",
        ],
      },
      secondaryFactor: {
        forceKey: "艮",
        archetype: "停滞者",
        role: "用",
        lines: [
          "但当现实真正逼近终局，",
          "你体内另一股力量会立刻苏醒。",
          "它让你冷下来、硬住、停在原地，试图用不作为防御新的伤害。",
        ],
      },
      collapsePoint: [
        "你一边在深渊里高频焦虑地扑腾，",
        "一边又在现实中死扛着拒绝迁移。",
        "这两股力量持续摩擦，才把你推向了【029 坎】那条“长期踩不到底”的轨迹。",
      ],
    },
    conflictScript90d: {
      act1: {
        title: "近期惯性引爆点",
        lines: ["压力升高时，你会先加速解释。", "越想立刻解决，越容易回到旧路径。"],
      },
      act2: {
        title: "中期执念过载点",
        lines: ["你会把一次选择放大成身份证明。", "执念开始接管节奏，让你难以停下。"],
      },
      act3: {
        title: "90天反本能节点",
        lines: ["在最想冲出去的时刻，先延迟一次反应。", "把反本能动作做小，但必须亲手完成。"],
      },
    },
    antiInstinctNode: "当你最想立刻证明时，先停下并完成一个更小的真实动作。",
    status: "active",
  },
];
