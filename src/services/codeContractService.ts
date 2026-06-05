import type { ChronoProfile, GuaFieldResult, GuanyaoSession, MigrationCard, MotherCodeResult, YaoCodeCard, YaoCodeResult, YuanCodeResult } from "../types";
import { getYuanCodeByTrigramKey } from "../data/yuanCodes";

export function buildYuanCodeResult(chronoProfile: ChronoProfile): YuanCodeResult {
  const prototype = chronoProfile.chronoPrototypeCard;
  const yuanTemplate = getYuanCodeByTrigramKey(prototype?.trigramId);

  return {
    ...yuanTemplate,
    title: prototype?.prototypeName ?? yuanTemplate.title,
    personalitySourceCode: yuanTemplate.personalitySourceCode,
    shortSeal: yuanTemplate.sourceSeal,
  };
}

export function normalizeGuaFieldFromLegacy(motherCode: MotherCodeResult | GuaFieldResult | null | undefined): GuaFieldResult | null {
  if (!motherCode) return null;
  const legacy = motherCode as MotherCodeResult;

  return {
    id: motherCode.id,
    code64: motherCode.code64,
    hexagramName: motherCode.hexagramName ?? legacy.name,
    title: motherCode.title,
    upperTrigram: motherCode.upperTrigram,
    lowerTrigram: motherCode.lowerTrigram,
    sourceYuanCodeId: motherCode.sourceYuanCodeId,
    sourceIdentityId: motherCode.sourceIdentityId,
    sourceSceneId: motherCode.sourceSceneId,
    sourceForceId: motherCode.sourceForceId,
    personalityField: motherCode.personalityField,
    shortSeal: motherCode.shortSeal,
    fieldDescription: motherCode.fieldDescription ?? legacy.gravityField,
  };
}

export function buildYaoCodeResult(session: GuanyaoSession, card: MigrationCard, finalChoiceCode: string): YaoCodeResult {
  const guaField = normalizeGuaFieldFromLegacy(session.guaFieldResult ?? session.guaField ?? session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode);
  const yaoIndex = Math.max(1, Math.min(6, Number(finalChoiceCode.slice(-1)) + 5));

  return {
    id: `yao_${guaField?.code64 ?? card.migrationDirection.code}_${finalChoiceCode}`,
    code384: `${card.migrationDirection.code}-${yaoIndex}`,
    sourceGuaFieldId: guaField?.id ?? "gua_field_unrecorded",
    yaoIndex,
    finalChoiceCode,
    personalityBehaviorTrack: `${card.migrationDirection.code} ${card.migrationDirection.traditionalName}${card.migrationDirection.scriptTitle}｜上爻`,
    trackSeal: card.shortReading[0] ?? "本次人格行为轨迹已压印。",
    dynamicState: card.cardTitle,
  };
}

export function buildYaoCodeCard(session: GuanyaoSession, card: MigrationCard, finalChoiceCode: string, yaoCode: YaoCodeResult): YaoCodeCard {
  return {
    id: `yao_card_${finalChoiceCode}`,
    sourceYuanCode: session.yuanCode ?? session.chronoCode ?? (session.chronoProfile ? buildYuanCodeResult(session.chronoProfile) : null),
    sourceGuaField: normalizeGuaFieldFromLegacy(session.guaFieldResult ?? session.guaField ?? session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode),
    sourceYaoCode: yaoCode,
    title: `${card.migrationDirection.code} ${card.migrationDirection.traditionalName}${card.migrationDirection.scriptTitle}｜上爻`,
    coreSeal: card.shortReading[0] ?? "这张爻码卡，是这枚现实种子上的状态压印。",
    antiInstinctNode: card.antiInstinctNode,
    defenseBook90d: {
      title: "90天行为预警",
      sections: ["90天行为重力雷达", "3张反本能操作卡", "90天复盘年轮"],
    },
  };
}
