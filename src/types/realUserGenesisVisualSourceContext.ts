import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type {
  RealLifeVisualSource,
  RealLifeVisualSourceAdapterInput,
} from "./realLifeVisualSourceAdapter";

export type RealUserGenesisVisualSourceContextInput = Readonly<{
  lifeSourceSession: LaunchLifeSourceSession;
  visualSourceAdapterInput: RealLifeVisualSourceAdapterInput;
  visualSource: RealLifeVisualSource;
}>;

export type RealUserGenesisVisualSourceContextBoundary = Readonly<{
  inMemorySessionOnly: true;
  realUserSourceOnly: true;
  existingLifeSourceSessionOnly: true;
  existingVisualSourceOnly: true;
  noFixtureFallback: true;
  noEngineInvocation: true;
  noRendererInvocation: true;
  noGenesisRuntimeActivation: true;
  noNavigationMutation: true;
  noVisualCalibrationMutation: true;
  noUIMutation: true;
  noPersistentStorage: true;
}>;

export type RealUserGenesisVisualSourceContext = Readonly<{
  schemaVersion: "GUANYAO_REAL_USER_GENESIS_VISUAL_SOURCE_CONTEXT_V1";
  source: "real_user_genesis_visual_source_context";
  sourceMode: "REAL_USER_EXPERIENCE";
  sourceReferenceId: string;
  lifeSourceSession: LaunchLifeSourceSession;
  visualSourceAdapterInput: RealLifeVisualSourceAdapterInput;
  visualSource: RealLifeVisualSource;
  boundary: RealUserGenesisVisualSourceContextBoundary;
}>;

export type RealUserGenesisVisualSourceContextBlockedReason =
  | "SOURCE_KIND_NOT_REAL"
  | "SOURCE_REFERENCE_MISMATCH"
  | "VISUAL_PROVENANCE_MISMATCH";

export type RealUserGenesisVisualSourceContextActivationResult =
  | Readonly<{
      status: "AVAILABLE";
      context: RealUserGenesisVisualSourceContext;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: RealUserGenesisVisualSourceContextBlockedReason;
      context: null;
    }>;
