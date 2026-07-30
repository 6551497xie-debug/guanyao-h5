import {
  XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
  createEmptyXinmaiLivedGrowthEnvelope,
} from "./xinmaiLivedGrowthRecoveryPersistenceAdapter";
import {
  XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION,
  type GravityObservationContinuityRecord,
} from "../types/xinmaiGravityObservationContinuity";
import type {
  RealityEncounterIdentityReferences,
} from "../types/xinmaiRealityEncounterIntent";
import {
  transactXinmaiGravityObservationContinuity,
} from "./xinmaiLivedGrowthTransactionalStore";

export const simulateXinmaiLivedGrowthLegacyWriterForAcceptance =
  (variant: "STABLE" | "CONFLICT" = "STABLE"): boolean => {
    if (import.meta.env?.DEV !== true) return false;
    try {
      window.localStorage.setItem(
        XINMAI_LIVED_GROWTH_RECOVERY_STORAGE_KEY,
        JSON.stringify({
          ...createEmptyXinmaiLivedGrowthEnvelope(),
          updatedAt:
            variant === "STABLE"
              ? new Date(0).toISOString()
              : new Date(1).toISOString(),
        }),
      );
      return true;
    } catch {
      return false;
    }
  };

export const establishRecognizedGravityObservationForAcceptance =
  async (input: Readonly<{
    identityReferences: RealityEncounterIdentityReferences;
    sourceEncounterCycleId: string;
    gravityCycleId: string;
    gravityObservationReferenceId: string;
  }>): Promise<boolean> => {
    if (import.meta.env?.DEV !== true) return false;
    const now = new Date().toISOString();
    const recordId =
      `CURRENT:${input.identityReferences.sourceReferenceId}`;
    const result =
      await transactXinmaiGravityObservationContinuity(
        recordId,
        (current) => {
          if (
            current?.gravityObservationReferenceId ===
              input.gravityObservationReferenceId &&
            current.checkpointState ===
              "OBSERVATION_RECOGNIZED"
          ) {
            return Object.freeze({
              status: "ALREADY_COMMITTED" as const,
              value: current,
            });
          }
          const record: GravityObservationContinuityRecord =
            Object.freeze({
              schemaVersion:
                XINMAI_GRAVITY_OBSERVATION_CONTINUITY_SCHEMA_VERSION,
              recordId,
              gravityObservationReferenceId:
                input.gravityObservationReferenceId,
              gravityObservationLineageRevision:
                (current?.gravityObservationLineageRevision ?? 0) + 1,
              identityReferences: input.identityReferences,
              sourceReality: Object.freeze({
                intentReferenceId:
                  `acceptance-intent:${input.sourceEncounterCycleId}`,
                encounterCycleId: input.sourceEncounterCycleId,
              }),
              gravityAdmission: Object.freeze({
                admissionReferenceId:
                  `acceptance-admission:${input.gravityCycleId}`,
                gravityCycleId: input.gravityCycleId,
              }),
              pressureProvenance: Object.freeze({
                candidateBundleReferenceId:
                  "acceptance-pressure-bundle",
                selectedPressureSeedId:
                  "lived-growth-browser-seed",
                candidateReferenceId:
                  "lived-growth-browser-seed",
              }),
              checkpointState:
                "OBSERVATION_RECOGNIZED" as const,
              checkpointRevision: 2,
              lifecycleState: "CURRENT" as const,
              recognitionProvenance: Object.freeze({
                source: "USER_CONFIRMED" as const,
                confirmedAt: now,
              }),
              consumedByChoiceActionIntentionReferenceId: null,
              createdAt: now,
              updatedAt: now,
              expiresAt: new Date(
                Date.now() + 2 * 60 * 60 * 1_000,
              ).toISOString(),
              terminalAt: null,
              provenance: Object.freeze({
                admissionAuthority:
                  "XINMAI_GRAVITY_ENTRY_ADMISSION" as const,
                surfaceAuthority:
                  "TYPED_GRAVITY_MINIMUM_SURFACE" as const,
                recognitionAuthority:
                  "USER_EXPLICIT_GRAVITY_RECOGNITION" as const,
                noSixDimensionAuthority: true as const,
                noChoiceAuthority: true as const,
                noLivedResponseAuthority: true as const,
                noCrystalAuthority: true as const,
                noRendererAuthority: true as const,
              }),
            });
          return Object.freeze({
            status: "COMMIT" as const,
            value: record,
            record,
            growthEnvelope: null,
          });
        },
      );
    return (
      result.status === "COMMITTED" ||
      result.status === "ALREADY_COMMITTED"
    );
  };
