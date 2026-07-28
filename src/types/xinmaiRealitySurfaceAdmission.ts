import type {
  RealityEncounterAdmission,
  RealityEncounterIdentityReferences,
} from "./xinmaiRealityEncounterIntent";

export const XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION =
  "XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_V1" as const;

export type RealitySurfaceAdmissionAttempt = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
}>;

export type RealityLifeSurfaceOutcome =
  | Readonly<
      RealitySurfaceAdmissionAttempt & {
        status: "REALITY_LIFE_SURFACE_PRESENTED";
        sourceReferenceId: string;
        surfaceMode:
          | "WEBGL_LIFE_UNIVERSE"
          | "SEMANTIC_STATIC_LIFE_UNIVERSE";
        presentedAt: string;
      }
    >
  | Readonly<
      RealitySurfaceAdmissionAttempt & {
        status: "REALITY_LIFE_SURFACE_UNAVAILABLE";
        sourceReferenceId: string;
        reason:
          | "CANVAS_REQUIRED"
          | "SOURCE_NOT_READY"
          | "RENDERER_BLOCKED"
          | "RENDERER_INITIALIZATION_FAILED"
          | "WEBGL_CONTEXT_LOST";
        reportedAt: string;
      }
    >;

export type RealityPressureSurfaceOutcome =
  | Readonly<
      RealitySurfaceAdmissionAttempt & {
        status: "REALITY_PRESSURE_SURFACE_PRESENTED";
        sourceReferenceId: string;
        surfaceMode: "SEMANTIC_PRESSURE_CANDIDATE_SURFACE";
        candidateBundleReferenceId: string;
        candidateCount: number;
        presentedAt: string;
      }
    >
  | Readonly<
      RealitySurfaceAdmissionAttempt & {
        status: "REALITY_PRESSURE_SURFACE_UNAVAILABLE";
        sourceReferenceId: string;
        reason:
          | "PRESSURE_SOURCE_MISMATCH"
          | "CANDIDATE_BUNDLE_EMPTY";
        reportedAt: string;
      }
    >;

export type RealitySurfaceAdmissionTransaction = Readonly<{
  schemaVersion: typeof XINMAI_REALITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION;
  source: "xinmai_reality_surface_admission_transaction";
  intentReferenceId: string;
  encounterCycleId: string;
  intentRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  lifeSurfaceOutcome: Extract<
    RealityLifeSurfaceOutcome,
    { status: "REALITY_LIFE_SURFACE_PRESENTED" }
  >;
  pressureSurfaceOutcome: Extract<
    RealityPressureSurfaceOutcome,
    { status: "REALITY_PRESSURE_SURFACE_PRESENTED" }
  >;
  minimumSurface:
    | "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES"
    | "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES";
  committedAt: string;
}>;

export type RealitySurfaceAdmissionTransactionResult =
  | Readonly<{
      status: "PENDING";
      transaction: null;
      reason:
        | "LIFE_SURFACE_OUTCOME_REQUIRED"
        | "PRESSURE_SURFACE_OUTCOME_REQUIRED";
    }>
  | Readonly<{
      status: "REJECTED";
      transaction: null;
      reason:
        | "LIFE_SURFACE_OUTCOME_MISMATCH"
        | "PRESSURE_SURFACE_OUTCOME_MISMATCH"
        | "LIFE_SURFACE_NOT_PRESENTED"
        | "PRESSURE_SURFACE_NOT_PRESENTED";
    }>
  | Readonly<{
      status: "READY";
      transaction: RealitySurfaceAdmissionTransaction;
      reason: null;
    }>;

export type RealitySurfaceAdmissionTransactionInput = Readonly<{
  admission: RealityEncounterAdmission;
  lifeSurfaceOutcome: RealityLifeSurfaceOutcome | null;
  pressureSurfaceOutcome: RealityPressureSurfaceOutcome | null;
}>;
