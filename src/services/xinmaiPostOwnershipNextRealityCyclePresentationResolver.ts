import type { XinmaiPostOwnershipNextRealityCycleResult } from "../types/xinmaiPostOwnershipNextRealityCycle";

export type XinmaiPostOwnershipNextRealityCyclePresentation = Readonly<{
  state:
    | "IDLE"
    | "COORDINATING"
    | "RETRY_AVAILABLE"
    | "SAFE_WITHHELD";
  message: string;
  actionLabel: string;
  actionDisabled: boolean;
  busy: boolean;
  retryability: "NOT_NEEDED" | "RETRYABLE" | "NON_RETRYABLE";
  typedCause: string | null;
}>;

export function resolveXinmaiPostOwnershipNextRealityCyclePresentation(
  busy: boolean,
  result: Extract<
    XinmaiPostOwnershipNextRealityCycleResult,
    { status: "SAFE_WITHHELD" }
  > | null,
): XinmaiPostOwnershipNextRealityCyclePresentation {
  if (busy) {
    return Object.freeze({
      state: "COORDINATING" as const,
      message: "正在为同一生命协调下一段现实。",
      actionLabel: "正在协调下一段现实",
      actionDisabled: true,
      busy: true,
      retryability: "NOT_NEEDED" as const,
      typedCause: null,
    });
  }
  if (result?.retryability === "RETRYABLE") {
    return Object.freeze({
      state: "RETRY_AVAILABLE" as const,
      message:
        "下一段现实还没有完整接上。已形成的生命资产都在，可以重试协调。",
      actionLabel: "重试进入下一段现实",
      actionDisabled: false,
      busy: false,
      retryability: "RETRYABLE" as const,
      typedCause: `${result.cause.stage}:${result.cause.reason}:${result.cause.innerCause ?? "NONE"}`,
    });
  }
  if (result !== null) {
    return Object.freeze({
      state: "SAFE_WITHHELD" as const,
      message: "当前还不能开始下一段现实。已完成的生命资产会继续保留。",
      actionLabel: "下一段现实暂未开放",
      actionDisabled: true,
      busy: false,
      retryability: "NON_RETRYABLE" as const,
      typedCause: `${result.cause.stage}:${result.cause.reason}:${result.cause.innerCause ?? "NONE"}`,
    });
  }
  return Object.freeze({
    state: "IDLE" as const,
    message: "",
    actionLabel: "开始下一段现实",
    actionDisabled: false,
    busy: false,
    retryability: "NOT_NEEDED" as const,
    typedCause: null,
  });
}

export const XinmaiPostOwnershipNextRealityCyclePresentationResolver =
  Object.freeze({
    resolve: resolveXinmaiPostOwnershipNextRealityCyclePresentation,
    readsStorage: false as const,
    writesAuthority: false as const,
    exposesInnerCause: true as const,
    authorityOwnedRetryability: true as const,
  });
