import type {
  RealityPressureFieldCode,
  RealityPressureFieldDefinition,
} from "../types/guanyaoCausalEngine";

export const guanyaoRealityPressureFields: RealityPressureFieldDefinition[] = [
  {
    fieldCode: "POWER",
    fieldName: "权力场",
    englishName: "Power Field",
    coreRelations: ["老板", "甲方", "权威人物", "考核体系"],
    pressureNature: "由不对等权力关系产生的压迫、评价、控制。",
    userFacingQuestion: "我是否正在被评价、压制、否定、安排或控制？",
    typicalPressureSlices: [
      "方案被否，当众质疑你的能力",
      "老板施压，任务不断加码",
      "被抢功、被裁员、被规则压住",
    ],
    engineRole: "定位外部压力来自不对等权力关系，用于生成权力压迫型现实压力种子。",
    distinctionFromSixDimensions:
      "权力场是外部压力来源；六维人格空间用于观察该压力进入身体、情绪、思想、行为、记忆、动机后的传导。",
  },
  {
    fieldCode: "INTEREST",
    fieldName: "利益场",
    englishName: "Interest Field",
    coreRelations: ["合伙人", "客户", "竞争者", "利益相关方"],
    pressureNature: "由资源争夺、利益冲突产生的博弈、背叛、损失。",
    userFacingQuestion: "我是否正在因为资源、钱、机会或分配失衡而被卷入博弈？",
    typicalPressureSlices: [
      "合伙人要分家，利益重新切割",
      "客户被抢，核心资源流失",
      "投资失败、合同不公、分配失衡",
    ],
    engineRole: "定位外部压力来自资源与利益冲突，用于生成利益博弈型现实压力种子。",
    distinctionFromSixDimensions: "利益场是外部压力来源；六维人格空间用于观察该压力进入人格系统后的传导路径。",
  },
  {
    fieldCode: "RELATION",
    fieldName: "关系场",
    englishName: "Relation Field",
    coreRelations: ["伴侣", "恋人", "暧昧对象"],
    pressureNature: "由亲密关系产生的疏离、背叛、焦虑、依赖。",
    userFacingQuestion: "我是否正在被亲密关系中的冷淡、背叛、不确定或依赖感压住？",
    typicalPressureSlices: [
      "持续冷战，消息已读不回",
      "对方忽冷忽热，关系悬而未决",
      "背叛、分手、热暴力、情感依赖",
    ],
    engineRole: "定位外部压力来自亲密关系，用于生成关系不确定型现实压力种子。",
    distinctionFromSixDimensions: "关系场是外部亲密压力来源；六维人格空间用于观察它如何进入情绪、思想、行为等内部维度。",
  },
  {
    fieldCode: "FAMILY",
    fieldName: "家庭场",
    englishName: "Family Field",
    coreRelations: ["父母", "子女", "兄弟姐妹"],
    pressureNature: "由血缘 / 长期责任关系产生的期待、控制、内疚、代际冲突。",
    userFacingQuestion: "我是否正在被血缘责任、家庭控制、内疚或代际期待牵制？",
    typicalPressureSlices: [
      "父母用“为你好”控制你的人生",
      "子女问题把你拖入失控感",
      "家庭经济拉扯、养老压力、亲戚比较",
    ],
    engineRole: "定位外部压力来自血缘与长期责任系统，用于生成家庭责任型现实压力种子。",
    distinctionFromSixDimensions: "家庭场是外部家庭压力来源；六维人格空间用于观察它进入人格系统后的反应链。",
  },
  {
    fieldCode: "SOCIAL",
    fieldName: "社会场",
    englishName: "Social Field",
    coreRelations: ["朋友", "同事", "圈子", "陌生人"],
    pressureNature: "由平级社会关系产生的孤立、排斥、比较、面子。",
    userFacingQuestion: "我是否正在被群体位置、比较、排斥、面子或孤立感压住？",
    typicalPressureSlices: [
      "被小团体孤立，重要饭局没人叫你",
      "朋友疏远，圈子排挤",
      "社交恐惧、被比较、被看不起",
    ],
    engineRole: "定位外部压力来自群体位置与社会评价，用于生成社会排斥型现实压力种子。",
    distinctionFromSixDimensions: "社会场是外部群体压力来源；六维人格空间用于观察它如何触发内部反应。",
  },
  {
    fieldCode: "EXISTENTIAL",
    fieldName: "存在场",
    englishName: "Existential Field",
    coreRelations: ["自己", "金钱", "工作", "健康", "意义"],
    pressureNature: "由经济安全、自我价值、生存意义产生的焦虑、虚无、耗竭。",
    userFacingQuestion: "我是否正在被生存安全、自我价值、健康、工作或意义感崩塌压住？",
    typicalPressureSlices: [
      "存款见底，安全感开始崩塌",
      "面试全挂，怀疑自己是不是废了",
      "身体透支、意义感消失、人生底盘动摇",
    ],
    engineRole: "定位外部压力来自生存底盘与存在价值，用于生成存在危机型现实压力种子。",
    distinctionFromSixDimensions:
      "存在场是外部生存与价值压力来源；六维人格空间用于观察它进入身体、情绪、思想、行为、记忆、动机后的传导。",
  },
];

export function listRealityPressureFields(): RealityPressureFieldDefinition[] {
  return guanyaoRealityPressureFields;
}

export function getRealityPressureFieldDefinition(
  fieldCode: RealityPressureFieldCode,
): RealityPressureFieldDefinition {
  const definition = guanyaoRealityPressureFields.find((field) => field.fieldCode === fieldCode);

  if (!definition) {
    throw new Error(`Missing reality pressure field definition for ${fieldCode}`);
  }

  return definition;
}
