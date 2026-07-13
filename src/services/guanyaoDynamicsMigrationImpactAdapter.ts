import type { ChangeExperienceRuntimeRoute } from "./changeExperienceRuntimeRoutingService";
import { formRuntimePersonaMigrationImpact } from "./personaMigrationImpactRuntimeService";
import type { SingleModelRevisionAction } from "../types/dynamicsRevisionAction";
import type { PersonaMigrationImpact, PersonaYaoStage } from "../types/personaTransmission";

export type DynamicsMigrationImpactAdapterInput = Readonly<{
  action: SingleModelRevisionAction | null;
  changeExperienceRoute: ChangeExperienceRuntimeRoute | null;
}>;

function resolvePersonaYaoStage(yaoName: string): PersonaYaoStage | null {
  if (yaoName.includes("初爻") || yaoName.includes("触发")) return "trigger";
  if (yaoName.includes("二爻") || yaoName.includes("接管")) return "takeover";
  if (yaoName.includes("三爻") || yaoName.includes("解释")) return "explain";
  if (yaoName.includes("四爻") || yaoName.includes("固化")) return "solidify";
  if (yaoName.includes("五爻") || yaoName.includes("觉察")) return "awareness";
  if (yaoName.includes("上爻") || yaoName.includes("修正")) return "revision";
  return null;
}

export function resolveDynamicsMigrationImpact(
  input: DynamicsMigrationImpactAdapterInput,
): PersonaMigrationImpact | null {
  const { action, changeExperienceRoute } = input;
  if (!action || !changeExperienceRoute) return null;

  const { dimension, unit } = changeExperienceRoute;
  const yaoStage = resolvePersonaYaoStage(action.yaoName);
  if (!yaoStage) return null;

  return formRuntimePersonaMigrationImpact({
    sourceUnitId: `gravity-${dimension}-${yaoStage}`,
    dimension,
    yaoStage,
    domainFacts: {
      oldReaction: unit.recognition.oldReaction,
      revisedResponse: unit.revision.newResponse,
      crystalImprint: unit.meaning.crystalImprint,
      migrationTrace: unit.revision.transformationMoment,
      dominantShift: `${unit.recognition.rootProtection}:${unit.recognition.manifestBehavior} → ${unit.revision.changeType}`,
    },
  });
}
