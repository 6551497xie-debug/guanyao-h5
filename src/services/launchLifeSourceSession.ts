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

  const receipt = input.birthSourceDerivationReceipt;
  if (
    receipt !== undefined &&
    (receipt.canonicalGregorianBirthDate !==
      toGregorianBirthDate(input.birthCoordinate) ||
      receipt.derivedHourBranch !== input.birthCoordinate.hourBranch ||
      receipt.calendarResolution.lunarBirthDate.relatedYear !==
        input.starbeastDerivationResult.lunarBirthDate.relatedYear ||
      receipt.calendarResolution.lunarBirthDate.month !==
        input.starbeastDerivationResult.lunarBirthDate.month ||
      receipt.calendarResolution.lunarBirthDate.day !==
        input.starbeastDerivationResult.lunarBirthDate.day ||
      receipt.calendarResolution.lunarBirthDate.isLeapMonth !==
        input.starbeastDerivationResult.lunarBirthDate.isLeapMonth)
  ) {
    return blocked("BIRTH_DERIVATION_RECEIPT_MISMATCH");
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
  const shared = {
    source: "launch_life_source_session" as const,
    sourceKind: "REAL_ENGINE_RESULT" as const,
    sourceReferenceId,
    ...sourceSnapshot,
    boundary: LAUNCH_LIFE_SOURCE_SESSION_BOUNDARY,
  };
  const session: LaunchLifeSourceSession = receipt === undefined
    ? {
        ...shared,
        schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1" as const,
        provenance: {
          sourceKind: "REAL_ENGINE_RESULT" as const,
          sourceReferenceId,
          birthSource: "LAUNCH_USER_CONFIRMED" as const,
          starbeastSource: "guanyao_starbeast_engine" as const,
          motherCodeSource: "guanyao_lunar_mother_code_landing" as const,
          originMotherSource: "guanyao_geo_chrono_mother_fusion" as const,
        },
      }
    : {
        ...shared,
        schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V2" as const,
        birthSourceDerivationReceipt: structuredClone(receipt),
        provenance: {
          sourceKind: "REAL_ENGINE_RESULT" as const,
          sourceReferenceId,
          birthSource: "LAUNCH_USER_CONFIRMED_DERIVATION_RECEIPT" as const,
          starbeastSource: "guanyao_starbeast_engine" as const,
          motherCodeSource: "guanyao_lunar_mother_code_landing" as const,
          originMotherSource: "guanyao_geo_chrono_mother_fusion" as const,
        },
      };

  return Object.freeze({
    status: "AVAILABLE" as const,
    session: freezeResultGraph(session),
  });
}

export const LaunchLifeSourceSessionService = Object.freeze({
  create: createLaunchLifeSourceSession,
});
