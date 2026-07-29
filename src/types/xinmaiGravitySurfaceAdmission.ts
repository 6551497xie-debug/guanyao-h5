import type {
  RealityEncounterIdentityReferences,
} from "./xinmaiRealityEncounterIntent";

export const XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION =
  "XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_V1" as const;

export type GravitySurfaceAdmissionAttempt = Readonly<{
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  selectedPressureSeedId: string;
}>;

export type GravityLifeSurfaceOutcome =
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_LIFE_SURFACE_PRESENTED";
        sourceReferenceId: string;
        surfaceMode:
          | "WEBGL_SAME_LIFE_SURFACE"
          | "SEMANTIC_STATIC_SAME_LIFE_SURFACE";
        presentedAt: string;
      }
    >
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_LIFE_SURFACE_UNAVAILABLE";
        sourceReferenceId: string;
        reason:
          | "SOURCE_NOT_READY"
          | "RENDERER_BLOCKED"
          | "RENDERER_INITIALIZATION_FAILED"
          | "WEBGL_CONTEXT_LOST"
          | "STATIC_SURFACE_NOT_PRESENTED";
        reportedAt: string;
      }
    >;

export type GravityObservationSurfaceOutcome =
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_OBSERVATION_SURFACE_PRESENTED";
        sourceReferenceId: string;
        surfaceMode:
          | "MOTION_FIRST_GRAVITY_OBSERVATION"
          | "STATIC_FIRST_GRAVITY_OBSERVATION";
        currentRealityTraceVisible: true;
        firstObservationAffordanceAvailable: true;
        presentedAt: string;
      }
    >
  | Readonly<
      GravitySurfaceAdmissionAttempt & {
        status: "GRAVITY_OBSERVATION_SURFACE_UNAVAILABLE";
        sourceReferenceId: string;
        reason:
          | "CURRENT_REALITY_TRACE_NOT_PRESENTED"
          | "FIRST_OBSERVATION_NOT_AVAILABLE"
          | "STATIC_OBSERVATION_NOT_PRESENTED";
        reportedAt: string;
      }
    >;

export type GravitySurfaceAdmissionTransaction = Readonly<{
  schemaVersion:
    typeof XINMAI_GRAVITY_SURFACE_ADMISSION_TRANSACTION_SCHEMA_VERSION;
  source: "xinmai_gravity_surface_admission_transaction";
  admissionReferenceId: string;
  gravityCycleId: string;
  admissionRevision: number;
  identityReferences: RealityEncounterIdentityReferences;
  selectedPressureSeedId: string;
  lifeSurfaceOutcome: Extract<
    GravityLifeSurfaceOutcome,
    { status: "GRAVITY_LIFE_SURFACE_PRESENTED" }
  >;
  observationSurfaceOutcome: Extract<
    GravityObservationSurfaceOutcome,
    { status: "GRAVITY_OBSERVATION_SURFACE_PRESENTED" }
  >;
  minimumSurface:
    | "GRAVITY_SAME_LIFE_AND_FIRST_OBSERVATION"
    | "GRAVITY_STATIC_SAME_LIFE_AND_FIRST_OBSERVATION";
  committedAt: string;
}>;

export type GravitySurfaceAdmissionTransactionResult =
  | Readonly<{
      status: "PENDING";
      transaction: null;
      reason:
        | "LIFE_SURFACE_OUTCOME_REQUIRED"
        | "OBSERVATION_SURFACE_OUTCOME_REQUIRED";
    }>
  | Readonly<{
      status: "REJECTED";
      transaction: null;
      reason:
        | "LIFE_SURFACE_OUTCOME_MISMATCH"
        | "OBSERVATION_SURFACE_OUTCOME_MISMATCH"
        | "LIFE_SURFACE_NOT_PRESENTED"
        | "OBSERVATION_SURFACE_NOT_PRESENTED";
    }>
  | Readonly<{
      status: "READY";
      transaction: GravitySurfaceAdmissionTransaction;
      reason: null;
    }>;
