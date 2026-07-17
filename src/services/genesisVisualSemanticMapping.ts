import type {
  GenesisVisualSemanticLayer,
  GenesisVisualSemanticMapping,
  GenesisVisualSemanticMappingBlockedReason,
  GenesisVisualSemanticMappingReviewBoundary,
  GenesisVisualSemanticMappingReviewInput,
  GenesisVisualSemanticMappingReviewResult,
  GenesisVisualSemanticMappingUnavailableReason,
} from "../types/genesisVisualSemanticMapping";

const REVIEW_BOUNDARY: GenesisVisualSemanticMappingReviewBoundary = Object.freeze({
  semanticMappingOnly: true,
  visualGovernanceOnly: true,
  identitySourceUntouched: true,
  engineUntouched: true,
  sceneModelUntouched: true,
  renderPlanUntouched: true,
  rendererUntouched: true,
  uiUntouched: true,
  storageUntouched: true,
});

const layer = (
  semanticLayer: GenesisVisualSemanticLayer,
  semanticIntent: string,
  visualIntent: string,
  allowedExpression: readonly string[],
  forbiddenExpression: readonly string[],
  rendererDirection: string,
): GenesisVisualSemanticMapping => Object.freeze({
  semanticLayer,
  semanticIntent,
  visualIntent,
  allowedExpression: Object.freeze([...allowedExpression]),
  forbiddenExpression: Object.freeze([...forbiddenExpression]),
  rendererDirection,
  visualOnly: true,
  identityBlind: true,
  noIdentityCalculation: true,
  noEngineInvocation: true,
  noRendererInvocation: true,
  noSceneModelInvocation: true,
  noRenderPlanInvocation: true,
});

export const GENESIS_VISUAL_SEMANTIC_MAPPING_V1: readonly GenesisVisualSemanticMapping[] = Object.freeze([
  layer(
    "MOON",
    "太阴入口",
    "让用户进入天地时间场",
    ["深空", "月华", "圆月", "太阴光场", "慢节律"],
    ["生命结果", "星兽暗示", "身份提示"],
    "以低速月相与柔和光场建立时间入口，不显化生命结果",
  ),
  layer(
    "STAR",
    "星河秩序",
    "让用户感受到星辰有序",
    ["星河", "七宿关系", "四象七宿流转", "星辰结构"],
    ["直接动物", "星座图鉴化"],
    "以星辰节点关系表达秩序，不绘制动物轮廓",
  ),
  layer(
    "TIME",
    "生命时序共振",
    "让时间进入宇宙",
    ["月相变化", "节律变化", "星河响应", "时间归位"],
    ["直接显示计算结果", "提前显示个人星兽"],
    "以节律与响应表达时间进入，不提前决定生命形态",
  ),
  layer(
    "SYMBOL",
    "四象显影",
    "让象由星辰关系自然形成",
    ["形态场", "空间变化", "七宿聚合", "四象骨架"],
    ["青龙模型", "白虎模型", "朱雀模型", "玄武模型"],
    "以形态场、空间偏置与骨架关系表达四象，不生成动物模型",
  ),
  layer(
    "HEXAGRAM",
    "变化印记",
    "让用户感受到变化有序",
    ["阴阳节律", "六层结构", "变化轨迹", "印记形成"],
    ["卦卡展示", "命理解释页"],
    "以结构变化和轨迹沉积表达规律，不把卦变成解释页面",
  ),
  layer(
    "FORCE",
    "生命原力",
    "让力量苏醒",
    ["节律变化", "运动方式变化", "核心状态变化", "生命呼吸变化"],
    ["属性标签", "能力数值", "技能效果"],
    "以节律、呼吸、聚合与核心响应表达原力，不展示属性面板",
  ),
  layer(
    "BEAST",
    "个人星兽归来",
    "让用户看见自己的生命形态",
    ["星宿结构", "四象形态场", "原力表达", "共同形成个人显化"],
    ["神兽图片直出", "宠物化", "游戏角色化", "动物身份硬编码"],
    "只消费正式生命显化语义，不由视觉层创造身份",
  ),
]);

const unavailable = (
  input: GenesisVisualSemanticMappingReviewInput,
  reason: GenesisVisualSemanticMappingUnavailableReason,
): GenesisVisualSemanticMappingReviewResult => Object.freeze({
  status: "UNAVAILABLE" as const,
  reviewStatus: "UNAVAILABLE" as const,
  source: "genesis_visual_semantic_mapping" as const,
  reason,
  input,
  mappings: null,
  boundary: REVIEW_BOUNDARY,
});

const blocked = (
  input: GenesisVisualSemanticMappingReviewInput,
  reason: GenesisVisualSemanticMappingBlockedReason,
): GenesisVisualSemanticMappingReviewResult => Object.freeze({
  status: "BLOCKED" as const,
  reviewStatus: "BLOCKED" as const,
  source: "genesis_visual_semantic_mapping" as const,
  reason,
  input,
  mappings: null,
  boundary: REVIEW_BOUNDARY,
});

export function reviewGenesisVisualSemanticMapping(
  input: GenesisVisualSemanticMappingReviewInput,
): GenesisVisualSemanticMappingReviewResult {
  const mappings = input.mappings;
  if (mappings === null) return unavailable(input, "MAPPING_INPUT_REQUIRED");
  if (mappings.length === 0) return unavailable(input, "MAPPING_INPUT_EMPTY");

  const expectedLayers: readonly GenesisVisualSemanticLayer[] = [
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
  ];
  if (mappings.length !== expectedLayers.length) {
    return blocked(input, "MAPPING_LAYER_ORDER_INVALID");
  }

  const seen = new Set<GenesisVisualSemanticLayer>();
  for (const [index, mapping] of mappings.entries()) {
    if (mapping.semanticLayer !== expectedLayers[index]) {
      return blocked(input, "MAPPING_LAYER_ORDER_INVALID");
    }
    if (seen.has(mapping.semanticLayer)) {
      return blocked(input, "MAPPING_LAYER_DUPLICATED");
    }
    seen.add(mapping.semanticLayer);
    if (
      mapping.visualOnly !== true ||
      mapping.identityBlind !== true ||
      mapping.noIdentityCalculation !== true ||
      mapping.noEngineInvocation !== true ||
      mapping.noRendererInvocation !== true ||
      mapping.noSceneModelInvocation !== true ||
      mapping.noRenderPlanInvocation !== true ||
      mapping.allowedExpression.length === 0 ||
      mapping.forbiddenExpression.length === 0 ||
      mapping.rendererDirection.length === 0
    ) {
      return blocked(input, "MAPPING_BOUNDARY_INVALID");
    }
    const expression = [...mapping.allowedExpression, mapping.visualIntent].join(" ").toLowerCase();
    if (["whitetiger", "bluetiger", "vermilionbird", "blacktortoise", "white tiger", "青龙", "白虎", "朱雀", "玄武"].some((marker) => expression.includes(marker.toLowerCase()))) {
      return blocked(input, "ANIMAL_IDENTITY_HARDCODED");
    }
  }

  return Object.freeze({
    status: "READY" as const,
    reviewStatus: "GENESIS_VISUAL_SEMANTIC_MAPPING_READY" as const,
    source: "genesis_visual_semantic_mapping" as const,
    input,
    mappings: Object.freeze([...mappings]),
    boundary: REVIEW_BOUNDARY,
  });
}
