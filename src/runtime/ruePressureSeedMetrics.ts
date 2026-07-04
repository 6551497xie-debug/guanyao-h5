import { getTraceLog } from "./rueTraceMockPipe";
import { getDropOffIndex, getSessionLength, getStepCompletionRate } from "./rueTraceMockMetrics";

const FINAL_STEP_INDEX = 6;

function getSeededSessionIds(): Set<string> {
  return new Set(
    getTraceLog()
      .filter((event) => typeof event.payload.seedId === "string")
      .map((event) => event.payload.sessionId)
      .filter((sessionId): sessionId is string => typeof sessionId === "string"),
  );
}

export function getSeedEntryRate(): number {
  const traceLog = getTraceLog();

  if (traceLog.length === 0) return 0;

  const seededEventCount = traceLog.filter((event) => typeof event.payload.seedId === "string").length;

  return seededEventCount / traceLog.length;
}

export function getSeedCompletionRate(): number {
  const traceLog = getTraceLog();
  const seededSessionIds = getSeededSessionIds();

  if (seededSessionIds.size === 0) return getStepCompletionRate();

  const completedSeedSessionIds = new Set(
    traceLog
      .filter(
        (event) =>
          event.type === "step_complete" &&
          typeof event.payload.sessionId === "string" &&
          seededSessionIds.has(event.payload.sessionId) &&
          event.payload.stepIndex === FINAL_STEP_INDEX,
      )
      .map((event) => event.payload.sessionId)
      .filter((sessionId): sessionId is string => typeof sessionId === "string"),
  );

  return completedSeedSessionIds.size / seededSessionIds.size;
}

export function getSeedDropOffRate(): number {
  const traceLog = getTraceLog();
  const seededSessionIds = getSeededSessionIds();

  if (seededSessionIds.size === 0) return getDropOffIndex() >= 0 ? 1 : 0;

  const droppedSeedSessionIds = new Set(
    traceLog
      .filter(
        (event) =>
          (event.type === "session_exit" || event.type === "session_abandon") &&
          typeof event.payload.sessionId === "string" &&
          seededSessionIds.has(event.payload.sessionId),
      )
      .map((event) => event.payload.sessionId)
      .filter((sessionId): sessionId is string => typeof sessionId === "string"),
  );

  return droppedSeedSessionIds.size / seededSessionIds.size;
}

export function getSeedEffectScore(): number {
  const completionRate = getSeedCompletionRate();
  const dropOffRate = getSeedDropOffRate();
  const sessionLengthFactor = Math.min(getSessionLength() / 10000, 1);

  return completionRate * 0.5 + (1 - dropOffRate) * 0.3 + sessionLengthFactor * 0.2;
}

