import type {
  LaunchLifeSourceSession,
  LaunchLifeSourceSessionBlockedReason,
  LaunchLifeSourceSessionBoundary,
  LaunchLifeSourceSessionInput,
  LaunchLifeSourceSessionResult,
} from "../types/launchLifeSourceSession";

export const LAUNCH_LIFE_SOURCE_SESSION_BOUNDARY: LaunchLifeSourceSessionBoundary =
  Object.freeze({
    immutableCarrier: true,
    existingEngineResultsOnly: true,
    noEngineInvocation: true,
    noVisualAdapterInvocation: true,
    noRendererInvocation: true,
    noRuntimeMutation: true,
    noVisualMutation: true,
    noUIMutation: true,
    noStorageWrite: true,
  });

const blocked = (
  reason: LaunchLifeSourceSessionBlockedReason,
): LaunchLifeSourceSessionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    reason,
    session: null,
  });

const freezeResultGraph = <T>(value: T): T => {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.values(value).forEach(freezeResultGraph);
  return Object.freeze(value);
};

const toGregorianBirthDate = (
  input: LaunchLifeSourceSessionInput["birthCoordinate"],
): string =>
  [input.year, input.month, input.day]
    .map((value, index) =>
      index === 0
        ? String(value).padStart(4, "0")
        : String(value).padStart(2, "0"),
    )
    .join("-");

export function createLaunchLifeSourceSession(
  input: LaunchLifeSourceSessionInput,
): LaunchLifeSourceSessionResult {
  const sourceReferenceId = input.sourceReferenceId.trim();
  if (!sourceReferenceId) return blocked("SOURCE_REFERENCE_ID_REQUIRED");

  if (
    input.starbeastDerivationResult.gregorianBirthDate !==
    toGregorianBirthDate(input.birthCoordinate)
  ) {
    return blocked("BIRTH_SOURCE_MISMATCH");
  }

  if (
    input.starbeastDerivationResult.fourSymbol !==
    input.originMotherResult.starbeast.fourSymbol
  ) {
    return blocked("FOUR_SYMBOL_SOURCE_MISMATCH");
  }

  if (
    input.motherCodeLandingResult.fieldMapping.trigram !==
      input.originMotherResult.mother.trigram ||
    input.motherCodeLandingResult.motherCodeProfile.motherCodeId !==
      input.originMotherResult.mother.profile.motherCodeId
  ) {
    return blocked("MOTHER_CODE_SOURCE_MISMATCH");
  }

  const sourceSnapshot = structuredClone({
    birthCoordinate: input.birthCoordinate,
    starbeastDerivationResult: input.starbeastDerivationResult,
    motherCodeLandingResult: input.motherCodeLandingResult,
    originMotherResult: input.originMotherResult,
  });
  const session: LaunchLifeSourceSession = {
    schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
    source: "launch_life_source_session",
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
    ...sourceSnapshot,
    provenance: {
      sourceKind: "REAL_ENGINE_RESULT",
      sourceReferenceId,
      birthSource: "LAUNCH_USER_CONFIRMED",
      starbeastSource: "guanyao_starbeast_engine",
      motherCodeSource: "guanyao_lunar_mother_code_landing",
      originMotherSource: "guanyao_geo_chrono_mother_fusion",
    },
    boundary: LAUNCH_LIFE_SOURCE_SESSION_BOUNDARY,
  };

  return Object.freeze({
    status: "AVAILABLE" as const,
    session: freezeResultGraph(session),
  });
}

export const LaunchLifeSourceSessionService = Object.freeze({
  create: createLaunchLifeSourceSession,
});
