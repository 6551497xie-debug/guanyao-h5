import { guanyaoMotherCodeAssetLibrary, type GuanyaoMotherCodeAsset } from "../data/guanyaoMotherCodeAssetLibrary";

export type MotherCodeAssetCode = GuanyaoMotherCodeAsset["code"];

type MotherCodeAssetSource = {
  motherCodeDefinitionId?: number;
  motherCodeId?: string | number;
  motherCodeName?: string;
  code?: string | number;
  code64?: string | number;
  name?: string;
  hexagramName?: string;
};

const definitionIdMap: Record<number, MotherCodeAssetCode> = {
  1: "qian",
  2: "kun",
  3: "zhen",
  4: "xun",
  5: "kan",
  6: "li",
  7: "gen",
  8: "dui",
};

const nameMap: Record<string, MotherCodeAssetCode> = {
  乾: "qian",
  坤: "kun",
  震: "zhen",
  巽: "xun",
  坎: "kan",
  离: "li",
  艮: "gen",
  兑: "dui",
};

function resolveByText(text: string | number | undefined): MotherCodeAssetCode | null {
  const source = String(text ?? "").trim();
  if (!source) return null;

  const normalized = source.toLowerCase();
  for (const code of Object.keys(guanyaoMotherCodeAssetLibrary) as MotherCodeAssetCode[]) {
    if (normalized.includes(code)) return code;
  }

  const leadingName = source.charAt(0);
  return nameMap[leadingName] ?? null;
}

export function resolveMotherCodeAssetCode(source: MotherCodeAssetSource | null | undefined): MotherCodeAssetCode | null {
  if (!source) return null;

  if (source.motherCodeDefinitionId && definitionIdMap[source.motherCodeDefinitionId]) {
    return definitionIdMap[source.motherCodeDefinitionId];
  }

  return (
    resolveByText(source.motherCodeId) ??
    resolveByText(source.code) ??
    resolveByText(source.code64) ??
    resolveByText(source.motherCodeName) ??
    resolveByText(source.hexagramName) ??
    resolveByText(source.name)
  );
}

export function getMotherCodeAsset(source: MotherCodeAssetSource | null | undefined): GuanyaoMotherCodeAsset | null {
  const code = resolveMotherCodeAssetCode(source);
  return code ? guanyaoMotherCodeAssetLibrary[code] : null;
}

export function buildMotherCodeAssetLines(asset: GuanyaoMotherCodeAsset | null) {
  if (!asset) {
    return ["本局母码资产正在沉积，暂未完成读取。"];
  }

  return [
    `原力：${asset.coreAsset}`,
    `默认保护：${asset.defaultProtection}`,
    `压力中的误用：${asset.misusePattern}`,
    `资产回收：${asset.assetReturn}`,
  ];
}
