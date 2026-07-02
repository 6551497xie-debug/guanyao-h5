import type { GuanyaoLanguageDimension, GuanyaoStarBeastName } from "./types";

export type HexagramAssetInput = {
  hexagramName: string;
  motherCode: string;
  starBeastName: GuanyaoStarBeastName;
  pressureSeedText: string;
  primaryDimension: GuanyaoLanguageDimension;
};

export type HexagramAssetOutput = {
  assetName: string;
  sliceTitle: string;
  verdict: string;
  shareLine: string;
};

const dimensionAssetLine: Record<GuanyaoLanguageDimension, string> = {
  body: "身体空间做出的主动调频",
  emotion: "情绪空间接住的那一阵波动",
  thought: "思维空间松开的那一圈回声",
  behavior: "行为空间重新迈出的那一步",
  memory: "记忆空间放下的那道旧影",
  motivation: "动机空间重新聚起的那束光",
};

export function generateHexagramAssetLanguage(input: HexagramAssetInput): HexagramAssetOutput {
  const hexagramName = input.hexagramName || "本局";
  const sliceTitle = input.starBeastName === "白虎" ? "幽谷蓄力的独行虎" : `${input.starBeastName}照见的今日切片`;
  const assetName = `${hexagramName} · ${hexagramName}卦码卡`;
  const dimensionLine = dimensionAssetLine[input.primaryDimension];

  return {
    assetName,
    sliceTitle,
    verdict: `你在${dimensionLine}，为你催生了这枚【${hexagramName}】资产。${input.pressureSeedText}不是泥潭，而是这一次被看见、被调频、被带走的时空切片。此刻，${input.starBeastName}正把这点光封存进你的${input.motherCode}路径里。`,
    shareLine: `我在今日的时空风暴中，凝结出一枚「${assetName} · ${sliceTitle}」。`,
  };
}
