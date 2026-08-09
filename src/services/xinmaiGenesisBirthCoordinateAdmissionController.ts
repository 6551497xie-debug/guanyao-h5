import type {
  XinmaiGenesisBirthCoordinateAdmissionResult,
  XinmaiGenesisBirthCoordinateInputSession,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";
import type { XinmaiGenesisBirthSourceDerivationReceipt } from "../types/xinmaiGenesisBirthSourceDerivation";
import type { LaunchOriginMotherInput } from "../types/guanyaoLaunchOriginMother";
import { buildDynamicsMotherHandoff } from "./guanyaoDynamicsMotherHandoffAdapter";
import { resolveLaunchOriginMotherSourceResults } from "./guanyaoLaunchOriginMotherInputAdapter";
import { writeMotherCodeProfile } from "./guanyaoMotherCodeProfilePersistenceAdapter";
import { writeOriginMotherContext } from "./guanyaoOriginMotherContextPersistenceAdapter";
import { writePersonaOutputSnapshot } from "./guanyaoPersonaSnapshotPersistenceAdapter";
import { createLaunchLifeSourceSession } from "./launchLifeSourceSession";
import { resolveLaunchGenesisProductionRouteHandoff } from "./launchGenesisProductionRouteHandoff";
import { resolveLaunchLifeVisualSource } from "./launchLifeVisualSourceResolver";
import { persistLaunchLifeSourceSession } from "./sessionService";
import { recoverXinmaiGenesisBirthSource } from "./xinmaiGenesisBirthSourceRecoveryController";
import { validateXinmaiGenesisBirthCoordinate } from "./xinmaiGenesisBirthCoordinatePresentationResolver";

const UNCOLLECTED_BIRTH_CONTEXT = Object.freeze({
  province: "未采集",
  city: "未采集",
});

const withheld = (
  reason: Extract<
    XinmaiGenesisBirthCoordinateAdmissionResult,
    { status: "SAFE_WITHHELD" }
  >["reason"],
  sourceReferenceId: string | null = null,
): XinmaiGenesisBirthCoordinateAdmissionResult =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    reason,
    sourceReferenceId,
    lifeSourceSession: null,
    handoff: null,
  });

const toSourceReferenceId = (
  receiptReferenceId: string,
): string =>
  `launch:v2:${receiptReferenceId}`;

const toLaunchOriginInput = (
  receipt: XinmaiGenesisBirthSourceDerivationReceipt,
): LaunchOriginMotherInput => ({
  birth: {
    year: receipt.rawInput.localCivilGregorianDate.year,
    month: receipt.rawInput.localCivilGregorianDate.month,
    day: receipt.rawInput.localCivilGregorianDate.day,
    hourBranch: receipt.derivedHourBranch,
  },
  periodIndex: receipt.derivedHourBranchOrdinal - 1,
  geo: UNCOLLECTED_BIRTH_CONTEXT,
  starbeast: {
    nodeCount: 28,
    primaryNodeIndex: 14,
    originLightTrace: "28光兽入口",
  },
});

export type XinmaiGenesisBirthCoordinateAdmissionRequest = Readonly<{
  intent: "CONFIRM_BIRTH_COORDINATE";
  inputSession: XinmaiGenesisBirthCoordinateInputSession;
}>;

const hasTrustedInputSessionBoundary = (
  session: XinmaiGenesisBirthCoordinateInputSession,
): boolean =>
  Object.isFrozen(session) &&
  session.status === "CONFIRMING" &&
  session.revision > 0 &&
  session.validation.status === "VALID" &&
  session.derivation.status === "READY" &&
  session.boundary.sessionOnly &&
  session.boundary.noStorage &&
  session.boundary.noIdentity &&
  session.boundary.noEngineInvocation &&
  session.boundary.noAuthorityWriteback &&
  session.boundary.noAutomaticConfirmation;

export function confirmXinmaiGenesisBirthCoordinate(
  request: XinmaiGenesisBirthCoordinateAdmissionRequest,
): XinmaiGenesisBirthCoordinateAdmissionResult {
  if (
    request.intent !== "CONFIRM_BIRTH_COORDINATE" ||
    !hasTrustedInputSessionBoundary(request.inputSession)
  ) {
    return withheld("INVALID_BIRTH_COORDINATE");
  }
  const { draft, derivation } = request.inputSession;
  if (
    validateXinmaiGenesisBirthCoordinate(draft, request.inputSession.revision).status !== "VALID" ||
    derivation.status !== "READY"
  ) {
    return withheld("INVALID_BIRTH_COORDINATE");
  }

  const receipt = derivation.receipt;
  const sourceReferenceId = toSourceReferenceId(receipt.receiptReferenceId);
  try {
    const launchInput = toLaunchOriginInput(receipt);
    const sourceResults = resolveLaunchOriginMotherSourceResults(launchInput);
    const sessionResult = createLaunchLifeSourceSession({
      sourceReferenceId,
      birthCoordinate: launchInput.birth,
      birthSourceDerivationReceipt: receipt,
      ...sourceResults,
    });
    if (sessionResult.status !== "AVAILABLE") {
      return withheld("LIFE_SOURCE_SESSION_BLOCKED", sourceReferenceId);
    }

    const visualSourceResult = resolveLaunchLifeVisualSource(
      sessionResult.session,
    );
    if (visualSourceResult.status !== "AVAILABLE") {
      return withheld("VISUAL_SOURCE_BLOCKED", sourceReferenceId);
    }
    persistLaunchLifeSourceSession(sessionResult.session);

    const motherHandoff = buildDynamicsMotherHandoff(
      sessionResult.session.originMotherResult,
    );
    writeMotherCodeProfile(motherHandoff.motherCodeProfile);
    writeOriginMotherContext({
      ...motherHandoff.originMotherContext,
      lifeSourceSession: sessionResult.session,
    });
    writePersonaOutputSnapshot(motherHandoff.personaOutputSnapshot);

    const recoveryResult = recoverXinmaiGenesisBirthSource({
      intent: "AUTHORIZE_GENESIS_ROUTE",
      expectedSourceReferenceId: sourceReferenceId,
    });
    if (recoveryResult.status !== "READY") {
      return withheld(
        recoveryResult.status === "SAFE_WITHHELD" &&
          recoveryResult.reason === "PERSISTED_SOURCE_CONFLICT"
          ? "PERSISTED_SOURCE_CONFLICT"
          : recoveryResult.status === "SAFE_WITHHELD" &&
              recoveryResult.reason ===
                "ACTIVE_SOURCE_REFERENCE_CONFLICT"
            ? "ACTIVE_SOURCE_REFERENCE_CONFLICT"
            : "PERSISTENCE_RECOVERY_MISMATCH",
        sourceReferenceId,
      );
    }
    if (
      recoveryResult.sourceReferenceId !== sourceReferenceId ||
      recoveryResult.proof !== "PRIMARY_AND_ORIGIN_MATCHED" ||
      recoveryResult.context.sourceReferenceId !== sourceReferenceId
    ) {
      return withheld("PERSISTENCE_RECOVERY_MISMATCH", sourceReferenceId);
    }

    const handoff = resolveLaunchGenesisProductionRouteHandoff({
      lifeSourceSession: recoveryResult.lifeSourceSession,
    });
    if (handoff.status !== "READY") {
      return withheld("GENESIS_HANDOFF_BLOCKED", sourceReferenceId);
    }

    return Object.freeze({
      status: "ACCEPTED" as const,
      sourceReferenceId,
      lifeSourceSession: sessionResult.session,
      handoff,
      evidence: Object.freeze({
        sourceSession: "REAL_ENGINE_RESULT" as const,
        visualContext: "REAL_USER_EXPERIENCE" as const,
        persistenceRecovery: "PRIMARY_AND_ORIGIN_MATCHED" as const,
        routeAdmission: "READY" as const,
      }),
    });
  } catch {
    return withheld("ENGINE_UNAVAILABLE", sourceReferenceId);
  }
}

export const XinmaiGenesisBirthCoordinateAdmissionController = Object.freeze({
  confirm: confirmXinmaiGenesisBirthCoordinate,
});
