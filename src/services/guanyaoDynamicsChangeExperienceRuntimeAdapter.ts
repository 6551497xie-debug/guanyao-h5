import {
  resolveChangeExperienceRuntimeRoute,
  type ChangeExperienceRuntimeRoute,
} from "./changeExperienceRuntimeRoutingService";
import { resolveChangeExperienceRuntimeSmokeRevisionAction } from "./fixtures/changeExperienceRuntimeSmokeFixtures";
import { resolveDynamicsMigrationImpact } from "./guanyaoDynamicsMigrationImpactAdapter";
import { resolveDynamicsRevisionAction } from "./guanyaoDynamicsRevisionActionAdapter";
import type { ChangeExperiencePresentation } from "../types/changeExperience";
import type { CurrentHexagramFormationResult } from "../types/currentHexagramFormation";
import type { SingleModelRevisionAction } from "../types/dynamicsRevisionAction";
import type { PersonaMigrationImpact } from "../types/personaTransmission";

export type DynamicsChangeExperienceRevisionActionSource =
  | "SMOKE_FIXTURE"
  | "CURRENT_HEXAGRAM_FORMATION"
  | null;

export type DynamicsChangeExperienceRuntimeAdapterInput = Readonly<{
  formation: CurrentHexagramFormationResult | null;
  experienceSmokeFixture: string | null;
}>;

export type DynamicsChangeExperienceRuntimeResult = Readonly<{
  revisionAction: SingleModelRevisionAction | null;
  revisionActionSource: DynamicsChangeExperienceRevisionActionSource;
  route: ChangeExperienceRuntimeRoute | null;
  presentation: ChangeExperiencePresentation | null;
  migrationImpact: PersonaMigrationImpact | null;
}>;

export function resolveDynamicsChangeExperienceRuntime(
  input: DynamicsChangeExperienceRuntimeAdapterInput,
): DynamicsChangeExperienceRuntimeResult {
  const smokeRevisionAction = resolveChangeExperienceRuntimeSmokeRevisionAction(
    input.experienceSmokeFixture,
  );
  const revisionAction = smokeRevisionAction ?? resolveDynamicsRevisionAction(input.formation);
  const revisionActionSource: DynamicsChangeExperienceRevisionActionSource = smokeRevisionAction
    ? "SMOKE_FIXTURE"
    : revisionAction
      ? "CURRENT_HEXAGRAM_FORMATION"
      : null;
  const route = resolveChangeExperienceRuntimeRoute(
    revisionAction,
    input.experienceSmokeFixture,
  );
  const migrationImpact = resolveDynamicsMigrationImpact({
    action: revisionAction,
    changeExperienceRoute: route,
  });

  return {
    revisionAction,
    revisionActionSource,
    route,
    presentation: route?.presentation ?? null,
    migrationImpact,
  };
}
