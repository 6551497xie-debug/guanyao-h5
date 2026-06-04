import type { IdentityFragment, IdentityLifeStageId } from "../types";

export const identityLifeStages: Array<{ id: IdentityLifeStageId; label: string }> = [
  { id: "18_22", label: "18—22｜成人初入场" },
  { id: "23_31", label: "23—31｜格子间重力场" },
  { id: "32_42", label: "32—42｜责任叠压场" },
  { id: "43_55", label: "43—55｜信用承压场" },
];

type IdentityFragmentSeed = IdentityFragment & {
  /**
   * Legacy display fields kept for the current Identity page adapter.
   * R2B-1 only defines the schema; page wiring belongs to a later task.
   */
  text: string;
  desc: string;
  forceMapping: string[];
  weight: number;
};

export const identityFragments: IdentityFragmentSeed[] = [
  {
    id: "FRAG-QIAN-23-31-001",
    sourceYuanCodeId: "yuan_qian_001",
    yuanCodeKey: "qian",
    lifeStageId: "23_31",
    lifeStageLabel: "23—31｜格子间重力场",
    fragmentGroup: "control_under_pressure",
    title: "撑住局面的人",
    fragmentLine: "我总觉得只要再撑一下，局面就不会真的塌下来。",
    systemPerspective: ["不是你不能停下", "而是你把停下", "误认成了失控"],
    identityHook: "这枚碎片刺中的是：你习惯先把自己推到主控位置，再处理自己的失重。",
    shadowInertia: "用继续推进证明局面还在自己手里。",
    misrecognitionPattern: "你把停下误认成了失控。",
    thematicField: ["主控", "撑住", "高处失重"],
    pressureLayerHints: ["职场评价", "项目失控", "团队背离"],
    sceneSeedBiasTags: ["workplace", "performance", "team_risk", "control"],
    intensity: 4,
    forbiddenToneTags: ["天生王者", "帝王人格", "成功学鸡汤", "命运判词"],
    text: "无法停下的责任感",
    desc: "习惯了先替系统稳住局面，最后才轮到处理伤口。",
    forceMapping: ["乾", "坤"],
    weight: 0.92,
  },
  {
    id: "FRAG-KUN-32-42-001",
    sourceYuanCodeId: "yuan_kun_002",
    yuanCodeKey: "kun",
    lifeStageId: "32_42",
    lifeStageLabel: "32—42｜责任叠压场",
    fragmentGroup: "boundary_eroded_support",
    title: "最后才轮到自己的人",
    fragmentLine: "我不是没有需求，我只是太熟悉先把别人接住。",
    systemPerspective: ["不是你必须托住一切", "而是你把拒绝", "误认成了关系断裂"],
    identityHook: "这枚碎片刺中的是：你会先承接系统重量，再把自己的边界推迟到最后。",
    shadowInertia: "用持续退让维持表面稳定，直到边界被消耗到不可见。",
    misrecognitionPattern: "你把拒绝误认成了关系断裂。",
    thematicField: ["承载", "退让", "边界消耗"],
    pressureLayerHints: ["家庭责任", "亲密关系", "团队缺口"],
    sceneSeedBiasTags: ["family", "relationship", "boundary", "support_load"],
    intensity: 3,
    forbiddenToneTags: ["奉献人格", "贤妻良母", "被动软弱", "道德赞美"],
    text: "习惯性失声",
    desc: "反复把话咽回去，直到所有人都以为你没有需求。",
    forceMapping: ["坤", "兑"],
    weight: 0.88,
  },
];
