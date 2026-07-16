import { createIsolatedWebGLPrototypeRenderPlanReference } from "./isolatedWebGLPrototypeRenderPlanReference";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type { PersonalStarBeastLifePresenceProjection } from "../types/personalStarBeastLifePresenceProjection";

const hashReference = (referenceId: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < referenceId.length; index += 1) {
    hash ^= referenceId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const referenceUnit = (referenceId: string): number =>
  hashReference(referenceId) / 0xffffffff;

const resolveMorphologicalMode = (
  fieldUnit: number,
): PersonalStarBeastLifePresenceProjection["morphologicalField"]["mode"] =>
  fieldUnit < 0.25
    ? "EXPANSIVE"
    : fieldUnit < 0.5
      ? "CONVERGING"
      : fieldUnit < 0.88
        ? "WRAPPED"
        : "STEADY";

export function projectPersonalStarBeastRenderPlanToLifePresence(
  plan: PersonalStarBeastRenderPlan,
): PersonalStarBeastLifePresenceProjection {
  const planReference =
    createIsolatedWebGLPrototypeRenderPlanReference(plan);
  const structureUnit = referenceUnit(
    plan.spatialExpression.structureDensity.referenceId,
  );
  const axisUnit = referenceUnit(
    plan.spatialExpression.anchorBehavior.referenceId,
  );
  const branchUnit = referenceUnit(
    plan.spatialExpression.formationPattern.referenceId,
  );
  const fieldUnit = referenceUnit(plan.fieldBehavior.spatialBias.referenceId);
  const boundaryUnit = referenceUnit(
    plan.fieldBehavior.boundaryBehavior.referenceId,
  );
  const flowUnit = referenceUnit(plan.fieldBehavior.flowDirection.referenceId);
  const coreUnit = referenceUnit(plan.lightExpression.coreLight.referenceId);
  const rhythmUnit = referenceUnit(
    plan.motionExpression.energyRhythm.referenceId,
  );
  const aggregationUnit = referenceUnit(
    plan.motionExpression.aggregationMode.referenceId,
  );

  return Object.freeze({
    semanticRole: "PERSONAL_STAR_BEAST_LIFE_PRESENCE_PROJECTION",
    sourceRenderPlanReferenceId: planReference.referenceId,
    corePresence: Object.freeze({
      influenceRadius: 0.34 + boundaryUnit * 0.42,
      coherence: 0.42 + coreUnit * 0.42,
      breathingAmplitude: 0.025 + rhythmUnit * 0.05,
      lightReach: 0.82 + coreUnit * 1.05,
      aggregationStrength: 0.46 + aggregationUnit * 0.44,
    }),
    stellarSkeleton: Object.freeze({
      axisAngle: (axisUnit - 0.5) * 1.25,
      spineLength: 1.8 + structureUnit * 1.05,
      spineSegments: 5 + Math.round(structureUnit * 3),
      branchCount: 2 + Math.round(branchUnit * 4),
      branchSpread: 0.32 + boundaryUnit * 0.7,
      branchTaper: 0.3 + coreUnit * 0.42,
      hierarchyDepth: 2 + Math.round(branchUnit * 2),
      nodeScale: 0.07 + coreUnit * 0.06,
    }),
    morphologicalField: Object.freeze({
      mode: resolveMorphologicalMode(fieldUnit),
      fieldScale: 0.9 + boundaryUnit * 0.42,
      bend: (flowUnit - 0.5) * 0.9,
      enclosure: 0.34 + boundaryUnit * 0.5,
      flowDirection: (flowUnit - 0.5) * Math.PI,
      boundarySoftness: 0.28 + fieldUnit * 0.45,
      spatialContraction: (0.5 - fieldUnit) * 0.72,
      postureBias: (flowUnit - 0.5) * 0.86,
      nodeDistributionBias: 0.72 + boundaryUnit * 0.48,
    }),
    sourcePlanSemanticRole: plan.semanticRole,
    renderPlanOnly: true,
    rendererParametersOnly: true,
    identityBlind: true,
    noLifeFactCopy: true,
    noAnimalGeometry: true,
  });
}
