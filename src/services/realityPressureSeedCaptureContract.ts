import type {
  RealityPressureSeedCaptureContract,
  RealityPressureSeedCaptureContractBoundary,
} from "../types/realityPressureSeedCaptureContract";

export const REALITY_PRESSURE_SEED_CAPTURE_CONTRACT_BOUNDARY:
  RealityPressureSeedCaptureContractBoundary = Object.freeze({
    contractOnly: true,
    existingPressureSeedMatrixOnly: true,
    explicitUserRecognitionRequired: true,
    dualSourceProvenanceRequired: true,
    sourceReferenceContinuityRequired: true,
    immutableCandidateBundleRequired: true,
    selectedContextOutputOnlyAfterRecognition: true,
    gravityReadinessOutputOnlyAfterRecognition: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noCandidateSourceImplementation: true,
    noCandidateAssembly: true,
    noCaptureExecution: true,
    noPressureConsumerIntegration: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

export const REALITY_PRESSURE_SEED_CAPTURE_CONTRACT:
  RealityPressureSeedCaptureContract = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_SEED_CAPTURE_CONTRACT_V1",
    semanticRole: "REALITY_PRESSURE_SEED_CAPTURE_CONTRACT",
    candidateSource: "PRESSURE_SEED_MATRIX_V2",
    recognitionSource: "REAL_USER_SESSION",
    selectionMode: "USER_RECOGNITION_REQUIRED",
    allowedEvents: Object.freeze([
      "PRESSURE_SEED_RECOGNIZE",
      "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
      "PRESSURE_SEED_PAUSE",
    ] as const),
    readyState: "SEED_RECOGNIZED",
    gravityReadyState: "READY",
    boundary: REALITY_PRESSURE_SEED_CAPTURE_CONTRACT_BOUNDARY,
  });
