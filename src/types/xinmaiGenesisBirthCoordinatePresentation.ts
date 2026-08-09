import type { LaunchGenesisProductionRouteHandoffResult } from "./launchGenesisProductionRouteHandoff";
import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type {
  XinmaiGenesisBirthSourceDerivationReceipt,
  XinmaiGenesisBirthSourceDerivationResult,
  XinmaiGenesisBirthTimePrecision,
} from "./xinmaiGenesisBirthSourceDerivation";

export const XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION =
  "XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_V1" as const;

export type XinmaiGenesisBirthCoordinateDraft = Readonly<{
  year: number | null;
  month: number | null;
  day: number | null;
  precision: XinmaiGenesisBirthTimePrecision;
  exactLocalTime: string;
  approximateRangeStart: string;
  approximateRangeEnd: string;
}>;

export type XinmaiGenesisBirthCoordinateInputStatus =
  | "LIFE_WORLD_BASELINE"
  | "EDITING"
  | "READY_TO_CONFIRM"
  | "CONFIRMING"
  | "ACCEPTED"
  | "SAFE_WITHHELD";

export type XinmaiGenesisBirthCoordinateValidation =
  | Readonly<{
      status: "VALID";
      reason: null;
    }>
  | Readonly<{
      status: "INVALID";
      reason:
        | "YEAR_OUTSIDE_SUPPORTED_RANGE"
        | "MONTH_OUTSIDE_RANGE"
        | "DAY_OUTSIDE_RANGE"
        | "DATE_DOES_NOT_EXIST"
        | "BIRTH_TIME_UNRESOLVED"
        | "INVALID_LOCAL_TIME"
        | "APPROXIMATE_RANGE_CROSSES_HOUR_BRANCH"
        | "CALENDAR_UNAVAILABLE";
    }>;

export type XinmaiGenesisBirthCoordinateAdmissionFailureReason =
  | "INVALID_BIRTH_COORDINATE"
  | "BIRTH_TIME_UNRESOLVED"
  | "DERIVATION_RECEIPT_MISMATCH"
  | "LIFE_SOURCE_SESSION_BLOCKED"
  | "VISUAL_SOURCE_BLOCKED"
  | "VISUAL_CONTEXT_BLOCKED"
  | "PERSISTENCE_RECOVERY_MISMATCH"
  | "PERSISTED_SOURCE_CONFLICT"
  | "ACTIVE_SOURCE_REFERENCE_CONFLICT"
  | "GENESIS_HANDOFF_BLOCKED"
  | "ENGINE_UNAVAILABLE";

export type XinmaiGenesisBirthCoordinateInputSessionBoundary = Readonly<{
  sessionOnly: true;
  noStorage: true;
  noIdentity: true;
  noEngineInvocation: true;
  noAuthorityWriteback: true;
  noAutomaticConfirmation: true;
}>;

export type XinmaiGenesisBirthCoordinateInputSession = Readonly<{
  schemaVersion: typeof XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_VERSION;
  status: XinmaiGenesisBirthCoordinateInputStatus;
  revision: number;
  draft: XinmaiGenesisBirthCoordinateDraft;
  validation: XinmaiGenesisBirthCoordinateValidation;
  derivation: XinmaiGenesisBirthSourceDerivationResult;
  failureReason: XinmaiGenesisBirthCoordinateAdmissionFailureReason | null;
  boundary: XinmaiGenesisBirthCoordinateInputSessionBoundary;
}>;

export type XinmaiGenesisBirthCoordinatePresentationInput =
  XinmaiGenesisBirthCoordinateInputSession;

export type XinmaiGenesisBirthCoordinatePresentationDecision = Readonly<{
  state:
    | "LIFE_WORLD_BASELINE"
    | "BIRTH_COORDINATE_EDITING"
    | "BIRTH_COORDINATE_READY"
    | "BIRTH_SOURCE_ACCEPTED"
    | "SAFE_WITHHELD";
  headline: string;
  support: string;
  primaryAction: "BEGIN" | "CONFIRM" | "NONE";
  showCoordinateFields: boolean;
  confirmationEnabled: boolean;
  validation: XinmaiGenesisBirthCoordinateValidation;
  derivationReceipt: XinmaiGenesisBirthSourceDerivationReceipt | null;
  sceneEnrichment: "GENERIC_LIFE_WORLD" | "CONFIRMED_BIRTH_SOURCE" | "SAFE_WITHHELD";
}>;

export type XinmaiGenesisBirthCoordinateAdmissionResult =
  | Readonly<{
      status: "ACCEPTED";
      sourceReferenceId: string;
      lifeSourceSession: LaunchLifeSourceSession;
      handoff: Extract<
        LaunchGenesisProductionRouteHandoffResult,
        { status: "READY" }
      >;
      evidence: Readonly<{
        sourceSession: "REAL_ENGINE_RESULT";
        visualContext: "REAL_USER_EXPERIENCE";
        persistenceRecovery: "PRIMARY_AND_ORIGIN_MATCHED";
        routeAdmission: "READY";
      }>;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reason: XinmaiGenesisBirthCoordinateAdmissionFailureReason;
      sourceReferenceId: string | null;
      lifeSourceSession: null;
      handoff: null;
    }>;
