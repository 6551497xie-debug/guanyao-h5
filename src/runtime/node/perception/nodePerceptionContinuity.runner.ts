import {
  runNodePerceptionContinuityAudit,
  type NodePerceptionContinuityAuditResult,
} from "./nodePerceptionContinuity.audit";

export type NodePerceptionAuditExecutionResult = {
  pass: boolean;
  score: number;
  stability: "STABLE" | "UNSTABLE";
  result: NodePerceptionContinuityAuditResult;
};

export function executeNodePerceptionAudit(): NodePerceptionAuditExecutionResult {
  const result = runNodePerceptionContinuityAudit();
  const pass =
    result.continuityScore >= 0.9 &&
    result.flickerDetected === false &&
    result.overlapDetected === false;

  return {
    pass,
    score: result.continuityScore,
    stability: pass ? "STABLE" : "UNSTABLE",
    result,
  };
}
