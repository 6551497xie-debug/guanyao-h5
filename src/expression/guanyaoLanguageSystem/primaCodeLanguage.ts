import type { GuanyaoStarBeastName } from "./types";

export type PrimaCodeLanguageInput = {
  motherCode: string;
  trigram: string;
  fourSymbol: GuanyaoStarBeastName;
};

export type PrimaCodeLanguageOutput = {
  title: string;
  modernPersonaName: string;
  verdict: string;
};

const fourSymbolPosition: Record<GuanyaoStarBeastName, string> = {
  青龙: "东境青龙",
  白虎: "西境白虎",
  朱雀: "南境朱雀",
  玄武: "北境玄武",
};

const trigramPersona: Record<string, { name: string; force: string; caution: string }> = {
  乾: { name: "天外流光 · 创世者", force: "开创、统御、向上聚合", caution: "别让推进变成孤军硬撑" },
  坤: { name: "大地回声 · 承载者", force: "包容、承托、滋养万物", caution: "别在承载里忘记自己的边界" },
  震: { name: "惊雷破晓 · 行动者", force: "启动、破局、冲开停滞", caution: "别让冲击耗尽自己的根基" },
  巽: { name: "穿林微风 · 渗透者", force: "适应、变通、无声抵达", caution: "别在融入里丢失自己的方向" },
  坎: { name: "深水回环 · 深潜者", force: "沉静、钻研、穿越险处", caution: "别在深处独自停留太久" },
  离: { name: "明火照夜 · 照见者", force: "照亮、连接、让关系显形", caution: "别让发光变成持续燃烧" },
  艮: { name: "止山定骨 · 守望者", force: "守护、稳固、守住边界", caution: "别让稳定变成不再流动" },
  兑: { name: "天外流光 · 连接者", force: "连接、调和、抚平裂痕", caution: "别在过度连接中刺伤柔软的内核" },
};

export function generatePrimaCodeLanguage(input: PrimaCodeLanguageInput): PrimaCodeLanguageOutput {
  const persona = trigramPersona[input.trigram] ?? trigramPersona.兑;
  const position = fourSymbolPosition[input.fourSymbol];

  return {
    title: `${position} · ${input.trigram}位母码`,
    modernPersonaName: persona.name,
    verdict: `你是星河中${persona.force}的原力。${input.motherCode}不是标签，而是一枚原始人格资产。${persona.caution}。`,
  };
}
