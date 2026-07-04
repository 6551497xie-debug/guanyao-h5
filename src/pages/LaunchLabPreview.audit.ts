type PreviewUniverseModel = {
  userType: "NEW_USER" | "OLD_USER";
  forceOrigin: "CORE_EMISSION" | "CORE_COLLAPSE";
  axisDirection: "OUTWARD_FORMING" | "INWARD_COMPRESSING";
  lightBehavior: "EMITTED_FROM_BEAST" | "PULLED_INTO_BEAST";
  structureBehavior: "FORMING_OUTWARD" | "COMPRESSING_INWARD";
};

export type LaunchLabPreviewCognitiveDivergenceAuditResult = {
  divergenceDetected: boolean;
  emissionClarityScore: number;
  collapseClarityScore: number;
  cognitiveSeparationScore: number;
  notes: string[];
};

const NEW_USER_UNIVERSE_MODEL: PreviewUniverseModel = {
  userType: "NEW_USER",
  forceOrigin: "CORE_EMISSION",
  axisDirection: "OUTWARD_FORMING",
  lightBehavior: "EMITTED_FROM_BEAST",
  structureBehavior: "FORMING_OUTWARD",
};

const OLD_USER_UNIVERSE_MODEL: PreviewUniverseModel = {
  userType: "OLD_USER",
  forceOrigin: "CORE_COLLAPSE",
  axisDirection: "INWARD_COMPRESSING",
  lightBehavior: "PULLED_INTO_BEAST",
  structureBehavior: "COMPRESSING_INWARD",
};

function scoreEmissionClarity(model: PreviewUniverseModel): number {
  const checks = [
    model.forceOrigin === "CORE_EMISSION",
    model.axisDirection === "OUTWARD_FORMING",
    model.lightBehavior === "EMITTED_FROM_BEAST",
    model.structureBehavior === "FORMING_OUTWARD",
  ];

  return checks.filter(Boolean).length / checks.length;
}

function scoreCollapseClarity(model: PreviewUniverseModel): number {
  const checks = [
    model.forceOrigin === "CORE_COLLAPSE",
    model.axisDirection === "INWARD_COMPRESSING",
    model.lightBehavior === "PULLED_INTO_BEAST",
    model.structureBehavior === "COMPRESSING_INWARD",
  ];

  return checks.filter(Boolean).length / checks.length;
}

function scoreCognitiveSeparation(
  newModel: PreviewUniverseModel,
  oldModel: PreviewUniverseModel
): number {
  const checks = [
    newModel.forceOrigin !== oldModel.forceOrigin,
    newModel.axisDirection !== oldModel.axisDirection,
    newModel.lightBehavior !== oldModel.lightBehavior,
    newModel.structureBehavior !== oldModel.structureBehavior,
  ];

  return checks.filter(Boolean).length / checks.length;
}

export function runLaunchLabPreviewCognitiveDivergenceAudit(): LaunchLabPreviewCognitiveDivergenceAuditResult {
  const emissionClarityScore = scoreEmissionClarity(NEW_USER_UNIVERSE_MODEL);
  const collapseClarityScore = scoreCollapseClarity(OLD_USER_UNIVERSE_MODEL);
  const cognitiveSeparationScore = scoreCognitiveSeparation(
    NEW_USER_UNIVERSE_MODEL,
    OLD_USER_UNIVERSE_MODEL
  );
  const notes: string[] = [];

  if (emissionClarityScore < 0.9) {
    notes.push("NEW_USER_EMISSION_UNIVERSE_NOT_CLEAR");
  }
  if (collapseClarityScore < 0.9) {
    notes.push("OLD_USER_COLLAPSE_UNIVERSE_NOT_CLEAR");
  }
  if (cognitiveSeparationScore < 0.9) {
    notes.push("UNIVERSE_GENERATION_MODES_NOT_SEPARATED");
  }

  return {
    divergenceDetected:
      emissionClarityScore >= 0.9 &&
      collapseClarityScore >= 0.9 &&
      cognitiveSeparationScore >= 0.9,
    emissionClarityScore,
    collapseClarityScore,
    cognitiveSeparationScore,
    notes,
  };
}
