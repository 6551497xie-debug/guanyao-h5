export const STARBEAST_RELATIONSHIP_NAMING_ASSET_SCHEMA_VERSION =
  "XINMAI_STARBEAST_RELATIONSHIP_NAMING_ASSET_V1" as const;

export const STARBEAST_RELATIONSHIP_NAMING_ASSET_KIND =
  "STARBEAST_RELATIONSHIP_NAMING_ASSET" as const;

export const STARBEAST_RELATIONSHIP_NAME_MAX_CODE_POINTS = 12;

export type StarBeastRelationshipNamingState = "NAMED" | "CLEARED";

export type StarBeastRelationshipNamingAsset = Readonly<{
  schemaVersion: typeof STARBEAST_RELATIONSHIP_NAMING_ASSET_SCHEMA_VERSION;
  assetKind: typeof STARBEAST_RELATIONSHIP_NAMING_ASSET_KIND;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  nameState: StarBeastRelationshipNamingState;
  relationshipName: string | null;
  createdAt: string;
  updatedAt: string;
  revision: number;
}>;

export type StarBeastRelationshipNamingReadResult =
  | Readonly<{
      status: "AVAILABLE";
      asset: StarBeastRelationshipNamingAsset;
    }>
  | Readonly<{
      status: "UNNAMED";
      asset: null;
    }>
  | Readonly<{
      status: "CLEARED";
      asset: StarBeastRelationshipNamingAsset;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason:
        | "RECOGNIZED_IDENTITY_REQUIRED"
        | "ASSET_INVALID"
        | "IDENTITY_REFERENCE_MISMATCH";
      asset: null;
    }>;

export type StarBeastRelationshipNamingMutationResult =
  | Readonly<{
      status: "READY";
      asset: StarBeastRelationshipNamingAsset;
      persistence: "PERSISTED" | "CURRENT_CYCLE_ONLY";
    }>
  | Readonly<{
      status: "BLOCKED";
      reason:
        | "RECOGNIZED_IDENTITY_REQUIRED"
        | "RELATIONSHIP_NAME_INVALID"
        | "RELATIONSHIP_NAME_ALREADY_EXISTS"
        | "RELATIONSHIP_NAME_REQUIRED"
        | "IDENTITY_REFERENCE_MISMATCH"
        | "ASSET_INVALID";
      asset: null;
    }>;

export type StarBeastRelationshipNamingDeleteResult = Readonly<{
  status: "READY";
  outcome: "DELETED" | "ALREADY_UNNAMED" | "DELETE_UNCONFIRMED";
}>;
