import type { RUEEventType } from "../types";

export type RUETracePayload = Record<string, unknown>;

export type RUETraceEvent = {
  id: number;
  type: RUEEventType;
  payload: RUETracePayload;
};

const traceLog: RUETraceEvent[] = [];

let nextTraceId = 1;

export function pushEvent(type: RUEEventType, payload: RUETracePayload = {}): RUETraceEvent {
  const event: RUETraceEvent = {
    id: nextTraceId,
    type,
    payload: { ...payload },
  };

  nextTraceId += 1;
  traceLog.push(event);

  return { ...event, payload: { ...event.payload } };
}

export function getTraceLog(): RUETraceEvent[] {
  return traceLog.map((event) => ({ ...event, payload: { ...event.payload } }));
}

export function clearTraceLog(): void {
  traceLog.length = 0;
  nextTraceId = 1;
}

