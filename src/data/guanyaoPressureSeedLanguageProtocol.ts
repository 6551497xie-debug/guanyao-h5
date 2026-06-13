import type {
  PressureSeedMatrixNode,
} from "../types/guanyaoCausalEngine";

export const pressureSeedLanguageProtocol = {
  protocolName: "Pressure Seed Language Structure Protocol",
  chineseName: "压力种子语言结构协议",
  definition:
    "压力种子是现实压力切片，被压缩成可被用户识别、可被引擎消费、可进入六维人格空间的结构化输入。",
  finalLock:
    "Surface 负责让用户认领。Core 负责让引擎识别。Shell 负责让用户预感代价。",
  layers: [
    {
      layer: "Surface",
      chineseName: "种子皮",
      role: "刺破防御，引发共鸣。",
      userFacingRole: "让用户第一眼识别：这不就是我吗？",
      engineRole: "不直接作为引擎字段。",
    },
    {
      layer: "Core",
      chineseName: "种子核",
      role: "锁定压力本质。",
      userFacingRole: "用户不直接看到 Core。",
      engineRole: "映射 pressureField / pressureNature / relationshipRole / fieldBias。",
    },
    {
      layer: "Shell",
      chineseName: "种子壳",
      role: "预览代价与干预方向。",
      userFacingRole: "让用户预感旧反应会如何启动，以及继续这样会付出什么代价。",
      engineRole: "映射 costHint / primaryDimension / oldReactionHint。",
    },
  ],
  frontendDisplayRule: "前台只展示 Surface 与 Shell；Core 不直接展示。",
};

export const pressureSeedLanguageExamples: PressureSeedMatrixNode[] = [
  {
    seedNodeId: "PSL-POWER-EVALUATION-BOSS-001",
    ageStage: "career_building",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    relationshipRole: "BOSS",
    surface: "他质疑你，你本能地开始解释。",
    core: {
      fieldBias: "权威评价压迫",
      pressureNatureBias: "评价威胁",
      relationshipRoleBias: "老板 / 上司",
      sixDimensionEntryBias: ["emotion", "thought", "behavior"],
    },
    shell: {
      costHint: "你会用解释，换取短暂的安全感。",
      oldReactionHint: "本能解释会把你继续留在对方的评价里。",
      primaryDimension: "thought",
    },
    userFacingSeedPrompt: "他质疑你，你本能地开始解释。\n你会用解释，换取短暂的安全感。",
  },
  {
    seedNodeId: "PSL-RELATION-ATTACHMENT-PARTNER-001",
    ageStage: "early_adult",
    pressureField: "RELATION",
    pressureNature: "ATTACHMENT",
    relationshipRole: "PARTNER_ROMANTIC",
    surface: "消息发出去很久，对方始终没回。",
    core: {
      fieldBias: "亲密关系不确定",
      pressureNatureBias: "依恋断裂",
      relationshipRoleBias: "伴侣 / 恋人",
      sixDimensionEntryBias: ["emotion", "thought"],
    },
    shell: {
      costHint: "你开始为他的沉默，找各种理由。",
      oldReactionHint: "解释沉默会暂时维持关系安全感。",
      primaryDimension: "emotion",
    },
    userFacingSeedPrompt: "消息发出去很久，对方始终没回。\n你开始为他的沉默，找各种理由。",
  },
  {
    seedNodeId: "PSL-FAMILY-CONTROL-PARENT-001",
    ageStage: "responsibility_pressure",
    pressureField: "FAMILY",
    pressureNature: "CONTROL",
    relationshipRole: "PARENT",
    surface: "父母说是为你好，你却感觉自己的选择被接管了。",
    core: {
      fieldBias: "家庭控制牵制",
      pressureNatureBias: "控制压迫",
      relationshipRoleBias: "父母 / 家庭权威",
      sixDimensionEntryBias: ["thought", "behavior", "motivation"],
    },
    shell: {
      costHint: "你越想反抗，越容易被内疚拉回去。",
      oldReactionHint: "反抗和内疚会让你反复拉扯。",
      primaryDimension: "motivation",
    },
    userFacingSeedPrompt: "父母说是为你好，你却感觉自己的选择被接管了。\n你越想反抗，越容易被内疚拉回去。",
  },
];

export function composePressureSeedUserPrompt(node: PressureSeedMatrixNode): string {
  return `${node.surface}\n${node.shell.costHint || node.shell.oldReactionHint}`;
}

export function listPressureSeedLanguageExamples(): PressureSeedMatrixNode[] {
  return pressureSeedLanguageExamples;
}
