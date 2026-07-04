import { getTraceLog } from "./rueTraceMockPipe";

export function getSessionLength(): number {
  const traceLog = getTraceLog();
  const firstEvent = traceLog[0];
  const lastEvent = traceLog[traceLog.length - 1];

  if (!firstEvent || !lastEvent) return 0;

  const firstTimestamp = typeof firstEvent.payload.timestamp === "number" ? firstEvent.payload.timestamp : 0;
  const lastTimestamp = typeof lastEvent.payload.timestamp === "number" ? lastEvent.payload.timestamp : firstTimestamp;

  return lastTimestamp - firstTimestamp;
}

export function getStepCompletionRate(): number {
  const traceLog = getTraceLog();
  const viewCount = traceLog.filter((event) => event.type === "step_view").length;
  const completeCount = traceLog.filter((event) => event.type === "step_complete").length;

  if (viewCount === 0) return 0;

  return completeCount / viewCount;
}

export function getDropOffIndex(): number {
  return getTraceLog().findIndex((event) => event.type === "session_exit" || event.type === "session_abandon");
}

export function getAverageHesitationGap(): number {
  const gaps = getTraceLog()
    .filter((event) => event.type === "hesitation_gap")
    .map((event) => event.payload.gapMs)
    .filter((gap): gap is number => typeof gap === "number");

  if (gaps.length === 0) return 0;

  return gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
}

