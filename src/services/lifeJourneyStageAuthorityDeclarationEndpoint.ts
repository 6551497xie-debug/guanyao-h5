import {
  resolveLifeJourneyStageAuthorityDeclaration,
  type LifeJourneyStageAuthorityDeclarationResolverInput,
} from "./lifeJourneyStageAuthorityDeclarationResolver";
import {
  consumeLifeJourneyStageAuthorityDeclarationResult,
  type LifeJourneyStageAuthorityDeclarationConsumption,
} from "./lifeJourneyStageAuthorityDeclarationResultConsumption";

export type { LifeJourneyStageAuthorityDeclarationConsumption } from "./lifeJourneyStageAuthorityDeclarationResultConsumption";

export type LifeJourneyStageAuthorityDeclarationEndpointInput =
  LifeJourneyStageAuthorityDeclarationResolverInput;

export function resolveLifeJourneyStageAuthorityDeclarationConsumption(
  input: LifeJourneyStageAuthorityDeclarationEndpointInput,
): LifeJourneyStageAuthorityDeclarationConsumption {
  return consumeLifeJourneyStageAuthorityDeclarationResult(
    resolveLifeJourneyStageAuthorityDeclaration(input),
  );
}
