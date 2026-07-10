export type PersonaDimension = "body" | "emotion" | "thought" | "action" | "memory" | "motivation";

export type PersonaYaoStage = "trigger" | "takeover" | "explain" | "solidify" | "awareness" | "revision";

export type PersonaTransmissionRuntimeSource = "runtime" | "fixture" | "fallback";

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
