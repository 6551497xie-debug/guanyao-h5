import { GUANYAO_PRESSURE_SEED_DRAFT_POOL } from "./guanyaoPressureSeedDraftPool";
import type {
  PressureSeedSixSpaceProjection,
  PressureSeedSixSpaceProjectionRegistryAuditResult,
  PressureSeedSpaceProjection,
  SixSpaceProjectionCode,
} from "../types/guanyaoPressureSeed";

type ProjectionSlotKey = "body" | "emotion" | "thought" | "action" | "memory" | "motive";

type SixSpaceHookDefinition = {
  slot: ProjectionSlotKey;
  spaceCode: SixSpaceProjectionCode;
  signalTitle: string;
  hook: string;
};

export const GUANYAO_PRESSURE_SEED_SIX_SPACE_HOOKS: Record<ProjectionSlotKey, SixSpaceHookDefinition> = {
  body: {
    slot: "body",
    spaceCode: "BODY",
    signalTitle: "身体信号",
    hook: "你的身体，比你先认输了。",
  },
  emotion: {
    slot: "emotion",
    spaceCode: "EMOTION",
    signalTitle: "情绪信号",
    hook: "你被某种感觉接管了。",
  },
  thought: {
    slot: "thought",
    spaceCode: "THOUGHT",
    signalTitle: "思维信号",
    hook: "你又在反复想同一件事。",
  },
  action: {
    slot: "action",
    spaceCode: "ACTION",
    signalTitle: "行动信号",
    hook: "你想做点什么，但卡住了。",
  },
  memory: {
    slot: "memory",
    spaceCode: "MEMORY",
    signalTitle: "痕迹信号",
    hook: "以前也这样过。",
  },
  motive: {
    slot: "motive",
    spaceCode: "MOTIVE",
    signalTitle: "方向信号",
    hook: "你不知道该往哪走。",
  },
};

const projectionSlotKeys: ProjectionSlotKey[] = ["body", "emotion", "thought", "action", "memory", "motive"];

export const GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY: PressureSeedSixSpaceProjection[] = [
  {
    seedId: "EXISTENCE_IDENTITY_SELF_10",
    body: {
      spaceCode: "BODY",
      signalTitle: "身体信号",
      hook: "你的身体，比你先认输了。",
      takeover: "你看着同龄人买房、升职、结婚，身体先停住了。",
      reaction: "继续撑着，假装没事。",
    },
    emotion: {
      spaceCode: "EMOTION",
      signalTitle: "情绪信号",
      hook: "你被某种感觉接管了。",
      takeover: "你看着同龄人买房、升职、结婚，你被不安接管了。",
      reaction: "把恐惧当成真相。",
    },
    thought: {
      spaceCode: "THOUGHT",
      signalTitle: "思维信号",
      hook: "你又在反复想同一件事。",
      takeover: "你又在用别人的进度审判自己。",
      reaction: "反复比较，反复证明自己不够好。",
    },
    action: {
      spaceCode: "ACTION",
      signalTitle: "行动信号",
      hook: "你想做点什么，但卡住了。",
      takeover: "你停在原地，因为旧反应告诉你：什么都不做最安全。",
      reaction: "什么都不做，等它过去。",
    },
    memory: {
      spaceCode: "MEMORY",
      signalTitle: "痕迹信号",
      hook: "以前也这样过。",
      takeover: "你过去的经验告诉你：这次也一样，你只能等。",
      reaction: "用过去的失败，预判未来的结果。",
    },
    motive: {
      spaceCode: "MOTIVE",
      signalTitle: "方向信号",
      hook: "你不知道该往哪走。",
      takeover: "你怕选错路会更落后。",
      reaction: "假装不需要，就不怕得不到。",
    },
  },
];

const buildFallbackSpaceProjection = (slot: ProjectionSlotKey): PressureSeedSpaceProjection => {
  const hook = GUANYAO_PRESSURE_SEED_SIX_SPACE_HOOKS[slot];

  return {
    spaceCode: hook.spaceCode,
    signalTitle: hook.signalTitle,
    hook: hook.hook,
    takeover: "这股压力正在进入当前空间。",
    reaction: "旧反应正在试图接管。",
  };
};

export function buildFallbackPressureSeedSixSpaceProjection(seedId: string): PressureSeedSixSpaceProjection {
  return {
    seedId,
    body: buildFallbackSpaceProjection("body"),
    emotion: buildFallbackSpaceProjection("emotion"),
    thought: buildFallbackSpaceProjection("thought"),
    action: buildFallbackSpaceProjection("action"),
    memory: buildFallbackSpaceProjection("memory"),
    motive: buildFallbackSpaceProjection("motive"),
  };
}

export function getPressureSeedSixSpaceProjection(seedId: string): PressureSeedSixSpaceProjection {
  return (
    GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY.find((projection) => projection.seedId === seedId) ??
    buildFallbackPressureSeedSixSpaceProjection(seedId)
  );
}

export function auditGuanyaoPressureSeedSixSpaceProjectionRegistry(): PressureSeedSixSpaceProjectionRegistryAuditResult {
  const errors: string[] = [];
  const draftSeedIds = GUANYAO_PRESSURE_SEED_DRAFT_POOL.map((seed) => seed.id);
  const registrySeedIds = GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY.map((projection) => projection.seedId);
  const missingSeedIds = draftSeedIds.filter((seedId) => !registrySeedIds.includes(seedId));
  const duplicateSeedIds = registrySeedIds.filter((seedId, index) => registrySeedIds.indexOf(seedId) !== index);

  if (duplicateSeedIds.length > 0) {
    errors.push(`duplicate projection seed ids: ${Array.from(new Set(duplicateSeedIds)).join(", ")}`);
  }

  GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY.forEach((projection) => {
    projectionSlotKeys.forEach((slot) => {
      const spaceProjection = projection[slot];
      if (!spaceProjection) {
        errors.push(`${projection.seedId} missing ${slot} projection`);
        return;
      }

      if (!spaceProjection.signalTitle || !spaceProjection.hook || !spaceProjection.takeover || !spaceProjection.reaction) {
        errors.push(`${projection.seedId} ${slot} projection missing signalTitle / hook / takeover / reaction`);
      }
    });
  });

  const status =
    GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY.length === 0
      ? "scaffold"
      : missingSeedIds.length === 0
        ? "complete"
        : "partial";

  return {
    ok: errors.length === 0,
    status,
    draftSeedCount: draftSeedIds.length,
    registrySeedCount: GUANYAO_PRESSURE_SEED_SIX_SPACE_PROJECTION_REGISTRY.length,
    missingSeedIds,
    errors,
  };
}
