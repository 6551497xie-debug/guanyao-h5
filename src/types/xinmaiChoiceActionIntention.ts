import type { CurrentHexagramFormationResult } from "./currentHexagramFormation";
import type { SingleModelRevisionAction } from "./dynamicsRevisionAction";
import type { PersonaMigrationImpact } from "./personaTransmission";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";
import type {
  ChoiceActionRouteResolverInput,
  ChoiceActionRouteSnapshot,
} from "./xinmaiChoiceActionRoute";
import type {
  SixDimensionCompletionReceipt,
} from "./xinmaiSixDimensionObservation";

export const XINMAI_CHOICE_ACTION_INTENTION_V1_SCHEMA_VERSION =
  "XINMAI_CHOICE_ACTION_INTENTION_V1" as const;
export const XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION =
  "XINMAI_CHOICE_ACTION_INTENTION_V2" as const;
export const XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION =
  "XINMAI_CHOICE_ACTION_INTENTION_V3" as const;

export type ChoiceFormationSourceSnapshot = Readonly<{
  formation: CurrentHexagramFormationResult;
  migrationImpact: PersonaMigrationImpact;
  completedNodeCount: number;
  primaryDimension: string;
  action: SingleModelRevisionAction;
  assetCompletionState: "READY_TO_CRYSTALLIZE";
}>;

export type ChoiceFormationSourceSnapshotV2 =
  ChoiceFormationSourceSnapshot &
  Readonly<{
    schemaVersion: "XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V2";
    sixDimensionObservation: Readonly<{
      completionReceiptReferenceId: string;
      observationSetId: string;
      observationSetRevision: number;
      dimensionProtocolRevision: string;
      contentDigest: string;
      evidenceDigest: string;
    }>;
  }>;

export type ChoiceObservationStructuralProof = Readonly<{
  status: "OBSERVATION_RECOGNIZED";
  gravityObservationReferenceId: string;
  checkpointRevision: number;
}>;

type ChoiceActionIntentionBase = Readonly<{
  source: "xinmai_choice_action_intention_controller";
  choiceActionIntentionReferenceId: string;
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  targetEncounterCycleId: string | null;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  state:
    | "COMMITTED"
    | "AWAITING_RETURN"
    | "REPORTED"
    | "CLOSED"
    | "WITHDRAWN"
    | "SUPERSEDED";
  revision: number;
  actionSummary: string;
  formationSourceSnapshot: ChoiceFormationSourceSnapshot;
  committedAt: string;
  updatedAt: string;
  provenance: Readonly<{
    userExplicitCommit: true;
    sourceAuthority:
      | "GRAVITY_TYPED_OBSERVATION"
      | "XINMAI_CHOICE_ACTION_ROUTE_AUTHORITY";
    noLivedResponseAuthority: true;
    noCrystalEligibilityAuthority: true;
  }>;
}>;

export type ChoiceActionIntentionV1 =
  ChoiceActionIntentionBase &
  Readonly<{
    schemaVersion:
      typeof XINMAI_CHOICE_ACTION_INTENTION_V1_SCHEMA_VERSION;
  }>;

export type ChoiceActionIntentionV2 =
  ChoiceActionIntentionBase &
  Readonly<{
    schemaVersion:
      typeof XINMAI_CHOICE_ACTION_INTENTION_SCHEMA_VERSION;
    actionRouteSnapshot: ChoiceActionRouteSnapshot;
  }>;

export type ChoiceActionIntentionV3 =
  Omit<ChoiceActionIntentionBase, "formationSourceSnapshot"> &
  Readonly<{
    schemaVersion:
      typeof XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION;
    formationSourceSnapshot: ChoiceFormationSourceSnapshotV2;
    actionRouteSnapshot: ChoiceActionRouteSnapshot;
  }>;

export type ChoiceActionIntention =
  | ChoiceActionIntentionV1
  | ChoiceActionIntentionV2
  | ChoiceActionIntentionV3;

export type CommitChoiceActionIntentionInput = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  expectedObservationCheckpointRevision: number;
  observationProof: ChoiceObservationStructuralProof;
  actionRouteResolverInput: ChoiceActionRouteResolverInput;
  selectedActionRouteReferenceId: string;
  formationSourceSnapshot:
    | ChoiceFormationSourceSnapshot
    | ChoiceFormationSourceSnapshotV2;
  sixDimensionCompletionReceipt:
    SixDimensionCompletionReceipt | null;
}>;
