import type { GuanyaoContentAssetType } from "./guanyaoContentAssetProtocol";

export type GuanyaoSessionStep =
  | "launch"
  | "initial_coordinates"
  | "mother_code"
  | "pressure_seed"
  | "pressure_exposure"
  | "hexagram_delivery"
  | "breach_scan"
  | "yao_device"
  | "repair_method"
  | "archive";

export type GuanyaoBehaviorAction =
  | "enter"
  | "click_cta"
  | "intercept_slice"
  | "select_seed"
  | "view_card"
  | "expand_reading"
  | "select_breach"
  | "activate_device"
  | "render_method"
  | "archive_asset";

export type BehaviorEvent = {
  step: GuanyaoSessionStep;
  action: GuanyaoBehaviorAction;
  targetId?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
};

export type BehaviorEventLog = {
  sessionId: string;
  userId?: string;
  events: BehaviorEvent[];
};

export type GuanyaoFeedbackSignal =
  | "hit"
  | "not_hit"
  | "useful"
  | "not_useful"
  | "too_soft"
  | "too_hard"
  | "repeated"
  | "saved"
  | "shared";

export type UserFeedbackSignal = {
  sessionId: string;
  assetId: string;
  assetType: GuanyaoContentAssetType;
  signal: GuanyaoFeedbackSignal;
  score?: 1 | 2 | 3 | 4 | 5;
  note?: string;
  timestamp: number;
};

export function createBehaviorEvent(
  step: GuanyaoSessionStep,
  action: GuanyaoBehaviorAction,
  targetId?: string,
  metadata?: Record<string, unknown>,
): BehaviorEvent {
  return {
    step,
    action,
    targetId,
    timestamp: Date.now(),
    metadata,
  };
}

export function appendBehaviorEvent(log: BehaviorEventLog, event: BehaviorEvent): BehaviorEventLog {
  return {
    ...log,
    events: [...log.events, event],
  };
}
