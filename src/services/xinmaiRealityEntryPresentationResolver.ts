import type { RealityPressureFailureEnvelope } from "../types/realityPressureFailureEnvelope";

export type XinmaiRealityEntryPresentation = Readonly<{
  state:
    | "READY"
    | "AWAITING_RELATIONSHIP"
    | "AWAITING_ENTRY_QUALIFICATION"
    | "COORDINATING"
    | "CATALOG_UNAVAILABLE"
    | "SAFE_WITHHELD"
    | "SOURCE_UNAVAILABLE";
  message: string;
  retryability: "RETRYABLE" | "NON_RETRYABLE";
  showRetry: boolean;
  showReturnToLifeWorld: boolean;
  typedCause: RealityPressureFailureEnvelope["cause"] | "NONE";
}>;

export function resolveXinmaiRealityEntryPresentation(input: Readonly<{
  relationshipAvailable: boolean;
  entryIntentReady: boolean;
  deliveryReady: boolean;
  failure: RealityPressureFailureEnvelope | null;
  authorityRetryAvailable: boolean;
}>): XinmaiRealityEntryPresentation {
  if (!input.relationshipAvailable) {
    return Object.freeze({
      state: "AWAITING_RELATIONSHIP" as const,
      message: "先完成你们之间的关系确认，再进入现实。",
      retryability: "NON_RETRYABLE" as const,
      showRetry: false,
      showReturnToLifeWorld: true,
      typedCause: "NONE" as const,
    });
  }
  if (input.deliveryReady) {
    return Object.freeze({
      state: "READY" as const,
      message: "现实已经准备好，可以进入。",
      retryability: "NON_RETRYABLE" as const,
      showRetry: false,
      showReturnToLifeWorld: false,
      typedCause: "NONE" as const,
    });
  }
  if (!input.entryIntentReady && input.failure === null) {
    return Object.freeze({
      state: "AWAITING_ENTRY_QUALIFICATION" as const,
      message: "完成此刻的回应后，就可以进入新的现实。",
      retryability: "NON_RETRYABLE" as const,
      showRetry: false,
      showReturnToLifeWorld: true,
      typedCause: "NONE" as const,
    });
  }

  const cause = input.failure?.cause ?? "DELIVERY_NOT_READY";
  const retryability = input.failure?.retryability ??
    (input.authorityRetryAvailable ? "RETRYABLE" : "NON_RETRYABLE");
  if (cause === "TARGET_450_NEW_CREATION_SAFE_WITHHELD") {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      message: "新的现实入口正在安全暂停。你的生命资料已经保留，可以先回到生命世界。",
      retryability: "NON_RETRYABLE" as const,
      showRetry: false,
      showReturnToLifeWorld: true,
      typedCause: cause,
    });
  }
  if (
    cause === "STAGE_NOT_IN_CATALOG" ||
    cause === "CATALOG_REVISION_UNKNOWN" ||
    cause === "SOURCE_REVISION_MISMATCH" ||
    cause === "RUNTIME_ID_BINDING_MISSING" ||
    cause === "PRESSURE_NATURE_BINDING_MISSING"
  ) {
    return Object.freeze({
      state: "CATALOG_UNAVAILABLE" as const,
      message: "当前现实候选还不能承接这段生命资料。资料已经保留，请先回到生命世界。",
      retryability: "NON_RETRYABLE" as const,
      showRetry: false,
      showReturnToLifeWorld: true,
      typedCause: cause,
    });
  }
  if (retryability === "RETRYABLE") {
    return Object.freeze({
      state: "COORDINATING" as const,
      message: "现实入口正在协调，可以再试一次。",
      retryability,
      showRetry: true,
      showReturnToLifeWorld: true,
      typedCause: cause,
    });
  }
  return Object.freeze({
    state: "SOURCE_UNAVAILABLE" as const,
    message: "这一次现实还没有被完整承接。生命资料已经保留，请先回到生命世界。",
    retryability: "NON_RETRYABLE" as const,
    showRetry: false,
    showReturnToLifeWorld: true,
    typedCause: cause,
  });
}
