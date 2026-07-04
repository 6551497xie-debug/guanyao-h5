import type { RUEEngagementEvent, RUEEntryEvent, RUEEventType, RUEExitEvent, RUEFlowEvent } from "./rueTrace";

export type BaseRUEPayload = {
  sessionId: string;
  timestamp: number;
  seedId?: string;
  snapshotId?: string;
  stepIndex?: number;
};

export type EntryEventPayload = BaseRUEPayload;

export type FlowEventPayload = BaseRUEPayload & {
  fromStep?: number;
  toStep?: number;
  transitionMs?: number;
};

export type ExitEventPayload = BaseRUEPayload & {
  exitReason: "user_close" | "drop_off" | "error" | "manual_back";
};

export type EngagementEventPayload = BaseRUEPayload & {
  dwellMs?: number;
  clickCount?: number;
  gapMs?: number;
};

export type RUETracePayloadByEvent = {
  [Event in RUEEntryEvent]: EntryEventPayload;
} & {
  [Event in RUEFlowEvent]: FlowEventPayload;
} & {
  [Event in RUEExitEvent]: ExitEventPayload;
} & {
  [Event in RUEEngagementEvent]: EngagementEventPayload;
};

export type RUEPayloadFor<Event extends RUEEventType> = RUETracePayloadByEvent[Event];

