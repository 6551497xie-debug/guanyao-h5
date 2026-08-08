import type { HourBranch } from "../types/guanyaoCausalEngine";
import type {
  XinmaiGenesisBirthCoordinateAdmissionResult,
  XinmaiGenesisBirthCoordinateDraft,
  XinmaiGenesisBirthCoordinateInputSession,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";
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

const HOUR_BRANCHES: readonly HourBranch[] = Object.freeze([
  "子时",
  "丑时",
  "寅时",
  "卯时",
  "辰时",
  "巳时",
  "午时",
  "未时",
  "申时",
  "酉时",
  "戌时",
  "亥时",
]);

const UNCOLLECTED_BIRTH_CONTEXT = Object.freeze({
  province: "未采集",
  city: "未采集",
});

const padDateUnit = (value: number): string => String(value).padStart(2, "0");

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
  draft: XinmaiGenesisBirthCoordinateDraft,
): string =>
  [
    "launch",
    `${draft.year}-${padDateUnit(draft.month)}-${padDateUnit(draft.day)}`,
    draft.hourBranch,
  ].join(":");

const toLaunchOriginInput = (
  draft: XinmaiGenesisBirthCoordinateDraft,
): LaunchOriginMotherInput => ({
  birth: {
    year: draft.year,
    month: draft.month,
    day: draft.day,
    hourBranch: draft.hourBranch,
  },
  periodIndex: Math.max(0, HOUR_BRANCHES.indexOf(draft.hourBranch)),
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
  const { draft } = request.inputSession;
  if (validateXinmaiGenesisBirthCoordinate(draft).status !== "VALID") {
    return withheld("INVALID_BIRTH_COORDINATE");
  }

  const sourceReferenceId = toSourceReferenceId(draft);
  try {
    const launchInput = toLaunchOriginInput(draft);
    const sourceResults = resolveLaunchOriginMotherSourceResults(launchInput);
    const sessionResult = createLaunchLifeSourceSession({
      sourceReferenceId,
      birthCoordinate: launchInput.birth,
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
