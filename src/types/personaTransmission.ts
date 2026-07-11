import type { CutCandidate, YaoTransmissionProfile } from "./guanyaoCausalEngine";

export type PersonaDimension = "body" | "emotion" | "thought" | "action" | "memory" | "motivation";

export type PersonaYaoStage = "trigger" | "takeover" | "explain" | "solidify" | "awareness" | "revision";

export type PersonaTransmissionRuntimeSource = "runtime" | "fixture" | "fallback";

export type PersonaTransmissionMappingStatus = "PASS" | "NEEDS_TRANSLATION" | "NOT_READY";

export type PersonaTransmissionIdentity = Readonly<{
  unitId: string;
}>;

export type PersonaTransmissionTriggerContext = Readonly<{
  pressureSeed?: string;
  pressureField?: string;
  motherCodeInfluence?: string;
  motherCodeName?: string;
  currentHexagramProfile?: string;
  currentHexagramName?: string;
  source: PersonaTransmissionRuntimeSource;
}>;

export type PersonaTransmissionBeastCue = Readonly<{
  before: string;
  after: string;
  cue: string;
}>;

export type PersonaTransmissionCrystalTrace = Readonly<{
  traceLine: string;
  shouldDepositToCrystal: boolean;
  shouldDepositToRingLite: boolean;
}>;

export type PersonaTransmissionRuntimeGuardrails = Readonly<{
  noStorageWrite: true;
  noLongTermProfile: true;
  noRawEngineLanguage: true;
  no384Yao: true;
  noArchive: true;
}>;

export type PersonaTransmissionRuntimeUnit = Readonly<{
  identity: PersonaTransmissionIdentity;
  dimension: PersonaDimension;
  yaoStage: PersonaYaoStage;
  triggerContext: PersonaTransmissionTriggerContext;
  oldModel: string;
  inertiaPattern: string;
  insight: string;
  revisionDirection: string;
  microAction: string;
  beastCue: PersonaTransmissionBeastCue;
  crystalTrace: PersonaTransmissionCrystalTrace;
  guardrails: PersonaTransmissionRuntimeGuardrails;
}>;

export type PersonaTransmissionPressureContext = Readonly<{
  pressureSeedId?: string;
  pressureSeed?: string;
  pressureField?: string;
}>;

export type PersonaTransmissionCurrentContext = Readonly<{
  currentHexagramProfile?: string;
  currentHexagramName?: string;
  motherCodeProfile?: string;
  motherCodeName?: string;
  motherCodeInfluence?: string;
}>;

export type PersonaTransmissionCutContext = Readonly<{
  mainCut?: CutCandidate;
  secondaryCut?: CutCandidate;
  rootCut?: CutCandidate;
  userAgency?: number;
}>;

export type PersonaTransmissionMappingInput = Readonly<{
  yaoTransmissionProfile?: YaoTransmissionProfile;
  pressureContext: PersonaTransmissionPressureContext;
  currentContext: PersonaTransmissionCurrentContext;
  cutContext?: PersonaTransmissionCutContext;
  source: PersonaTransmissionRuntimeSource;
}>;

export type PersonaTransmissionMappingSuccess = Readonly<{
  status: "PASS";
  unit: PersonaTransmissionRuntimeUnit;
}>;

export type PersonaTransmissionMappingNeedsTranslation = Readonly<{
  status: "NEEDS_TRANSLATION";
  reason: string;
  partialUnit?: Partial<PersonaTransmissionRuntimeUnit>;
}>;

export type PersonaTransmissionMappingFailure = Readonly<{
  status: "NOT_READY";
  reason: string;
}>;

export type PersonaTransmissionMappingResult =
  | PersonaTransmissionMappingSuccess
  | PersonaTransmissionMappingNeedsTranslation
  | PersonaTransmissionMappingFailure;
