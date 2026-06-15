export type GuanyaoAgeSegment =
  | "YOUTH"
  | "ESTABLISHING"
  | "MID_LIFE"
  | "RESTRUCTURING"
  | "SIXTY_PLUS";

export type GuanyaoPressureField =
  | "POWER"
  | "INTEREST"
  | "RELATION"
  | "FAMILY"
  | "SOCIAL"
  | "EXISTENCE";

export type GuanyaoPressureNature =
  | "EVALUATION"
  | "RESOURCE"
  | "ATTACHMENT"
  | "CONTROL"
  | "OBLIGATION"
  | "BELONGING"
  | "IDENTITY"
  | "SURVIVAL";

export type GuanyaoCoreRelation =
  | "BOSS"
  | "CLIENT"
  | "PARTNER_BUSINESS"
  | "PARTNER_ROMANTIC"
  | "PARENT"
  | "CHILD"
  | "FRIEND"
  | "COLLEAGUE"
  | "SELF"
  | "SYSTEM";

export interface GuanyaoPressureSeedCore {
  mechanism: string;
  engineHint: string;
}

export interface GuanyaoPressureSeed {
  id: string;
  matrixCode: string;
  pressureField: GuanyaoPressureField;
  pressureNature: GuanyaoPressureNature;
  primaryAge: GuanyaoAgeSegment;
  ageBias: GuanyaoAgeSegment[];
  primaryRelation: GuanyaoCoreRelation;
  relationBias: GuanyaoCoreRelation[];
  surface: string;
  core: GuanyaoPressureSeedCore;
  shell: string;
  tags: string[];
  mappingHint: string;
}

export type GuanyaoPressureSeedFrontStage = {
  surface: string;
  shell: string;
};

export type GuanyaoPressureSeedDraftPoolAuditResult = {
  ok: boolean;
  total: number;
  errors: string[];
  matrixCoverage: Record<string, number>;
};

export type PressureSeedAgeGroup =
  | "YOUTH"
  | "ESTABLISHING"
  | "MID_LIFE"
  | "RESTRUCTURING"
  | "SIXTY_PLUS";

export type PressureSeedField =
  | "POWER"
  | "INTEREST"
  | "RELATION"
  | "FAMILY"
  | "SOCIAL"
  | "EXISTENCE";

export type PressureSeedMatrixSeed = {
  id: string;
  surface: string;
  shell: string;
  pressureNature: string;
};

export type PressureSeedMatrixNodeStatus = "locked" | "draft" | "pending";

export type PressureSeedMatrixNode = {
  ageGroup: PressureSeedAgeGroup;
  pressureField: PressureSeedField;
  status?: PressureSeedMatrixNodeStatus;
  seeds: PressureSeedMatrixSeed[];
};

export type PressureSeedMatrixV2AuditResult = {
  ok: boolean;
  ageGroupCount: number;
  pressureFieldCount: number;
  nodeCount: number;
  expectedNodeCount: number;
  coveredNodeKeys: string[];
  missingNodeKeys: string[];
  lockedNodeCount: number;
  pendingNodeCount: number;
  scaffoldNodeCount: number;
  seedSlotCount: number;
  readySeedCount: number;
  theoreticalSeedCount: number;
  missingSeedCount: number;
  duplicateSeedIds: string[];
  errors: string[];
};

export type SixSpaceProjectionCode =
  | "BODY"
  | "EMOTION"
  | "THOUGHT"
  | "ACTION"
  | "MEMORY"
  | "MOTIVE";

export type PressureSeedSpaceProjection = {
  spaceCode: SixSpaceProjectionCode;
  signalTitle: string;
  hook: string;
  takeover: string;
  reaction: string;
};

export type PressureSeedSixSpaceProjection = {
  seedId: string;
  body: PressureSeedSpaceProjection;
  emotion: PressureSeedSpaceProjection;
  thought: PressureSeedSpaceProjection;
  action: PressureSeedSpaceProjection;
  memory: PressureSeedSpaceProjection;
  motive: PressureSeedSpaceProjection;
};

export type PressureSeedSixSpaceProjectionRegistryAuditResult = {
  ok: boolean;
  status: "scaffold" | "partial" | "complete";
  draftSeedCount: number;
  registrySeedCount: number;
  missingSeedIds: string[];
  errors: string[];
};
