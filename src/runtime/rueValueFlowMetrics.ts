import { getTraceLog } from "./rueTraceMockPipe";

type StepFlowEvent = {
  index: number;
  stepIndex: number;
  timestamp: number;
  type: "step_view" | "step_complete";
};

function getStepFlowEvents(): StepFlowEvent[] {
  return getTraceLog()
    .map((event, index) => {
      if (event.type !== "step_view" && event.type !== "step_complete") return null;
      if (typeof event.payload.timestamp !== "number") return null;
      if (typeof event.payload.stepIndex !== "number") return null;

      return {
        index,
        stepIndex: event.payload.stepIndex,
        timestamp: event.payload.timestamp,
        type: event.type,
      };
    })
    .filter((event): event is StepFlowEvent => event !== null)
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function getStepLatency(): number[] {
  const events = getStepFlowEvents();

  return events.slice(1).map((event, index) => event.timestamp - events[index]!.timestamp);
}

export function getAverageStepLatency(): number {
  const latencies = getStepLatency();

  if (latencies.length === 0) return 0;

  return latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length;
}

export function getFlowBreakPoints(): number[] {
  const traceLog = getTraceLog();
  const breakPoints = new Set<number>();
  const completedSteps = new Set(
    traceLog.filter((event) => event.type === "step_complete" && typeof event.payload.stepIndex === "number").map((event) => event.payload.stepIndex),
  );

  traceLog.forEach((event, index) => {
    if (event.type === "step_view" && typeof event.payload.stepIndex === "number" && !completedSteps.has(event.payload.stepIndex)) {
      breakPoints.add(index);
    }

    if (event.type === "session_exit" || event.type === "session_abandon") {
      const previousStepEvents = traceLog
        .slice(0, index)
        .map((candidate, candidateIndex) => ({ candidate, candidateIndex }))
        .filter(({ candidate }) => candidate.type === "step_view" || candidate.type === "step_complete");
      const lastStepIndex = previousStepEvents[previousStepEvents.length - 1]?.candidateIndex;

      if (typeof lastStepIndex === "number") {
        breakPoints.add(lastStepIndex);
      }
    }
  });

  return Array.from(breakPoints).sort((a, b) => a - b);
}

export function getTransformationDelayIndex(): number {
  const events = getStepFlowEvents();
  const delays = events
    .filter((event) => event.type === "step_view")
    .map((viewEvent) => {
      const completeEvent = events.find(
        (event) => event.type === "step_complete" && event.stepIndex === viewEvent.stepIndex && event.timestamp >= viewEvent.timestamp,
      );

      return completeEvent ? completeEvent.timestamp - viewEvent.timestamp : null;
    })
    .filter((delay): delay is number => typeof delay === "number");

  if (delays.length === 0) return 0;

  return delays.reduce((sum, delay) => sum + delay, 0) / delays.length;
}
