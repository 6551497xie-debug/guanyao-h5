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
