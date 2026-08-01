import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";

export const XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_VERSION =
  "XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_V1" as const;

export type XinmaiCanonicalBodyImprintSourceSlot =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;

export type XinmaiCanonicalBodyImprintVisualFact = Readonly<{
  semanticRole: "XINMAI_CANONICAL_BODY_IMPRINT_VISUAL_FACT";
  schemaVersion:
    typeof XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_VERSION;
  bodyReferenceId: string;
  imprintReferenceId: string;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  formationReferenceId: string;
  crystalReferenceId: string;
  crystalEligibilityReferenceId: string;
  livedResponseReferenceId: string;
  choiceActionIntentionReferenceId: string;
  choiceLineage: Readonly<{
    choiceActionIntentionReferenceId: string;
    livedResponseReferenceId: string;
  }>;
  fencingToken: number;
  formedAt: string;
  imprintKind: "REAL_WORLD_RESPONSE_CRYSTAL_TRACE";
  primaryDimension: string | null;
  sourceSlot: XinmaiCanonicalBodyImprintSourceSlot;
  deterministicGeometryKey: string;
  presentationLayer: "BODY_TRACE";
  state: "READY";
  salience: "CURRENT_FORMATION_FOCUS" | "SETTLED_HISTORY";
}>;

export type XinmaiCanonicalBodyImprintSafeWithheldReason =
  | "PRESENTATION_PAUSED"
  | "RECOVERY_UNAVAILABLE"
  | "RECOVERY_CORRUPTED"
  | "IDENTITY_MISMATCH"
  | "RECEIPT_MISSING"
  | "CRYSTAL_PROJECTION_MISSING"
  | "LEGACY_ONLY"
  | "DUPLICATE_LINEAGE"
  | "PROJECTION_VERSION_UNSUPPORTED";

export type XinmaiCanonicalBodyImprintDecision =
  | Readonly<{
      status: "IMPRINT_AVAILABLE";
      bodyReferenceId: string;
      identityReferences: RealityEncounterIdentityReferences;
      imprints: readonly XinmaiCanonicalBodyImprintVisualFact[];
      focusedImprintReferenceId: string | null;
      reason: null;
    }>
  | Readonly<{
      status: "NO_CANONICAL_IMPRINT";
      bodyReferenceId: string;
      identityReferences: RealityEncounterIdentityReferences;
      imprints: readonly XinmaiCanonicalBodyImprintVisualFact[];
      focusedImprintReferenceId: null;
      reason: null;
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      bodyReferenceId: string | null;
      identityReferences: RealityEncounterIdentityReferences | null;
      imprints: readonly XinmaiCanonicalBodyImprintVisualFact[];
      focusedImprintReferenceId: null;
      reason: XinmaiCanonicalBodyImprintSafeWithheldReason;
    }>;

export const XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION:
  XinmaiCanonicalBodyImprintDecision = Object.freeze({
    status: "SAFE_WITHHELD" as const,
    bodyReferenceId: null,
    identityReferences: null,
    imprints: Object.freeze([]),
    focusedImprintReferenceId: null,
    reason: "RECOVERY_UNAVAILABLE" as const,
  });
