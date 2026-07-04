import {
  runLaunchLabPreviewCognitiveDivergenceAudit as runPreviewCognitiveDivergenceAudit,
  type LaunchLabPreviewCognitiveDivergenceAuditResult,
} from "./LaunchLabPreview.audit";

export type LaunchLabPreviewCognitiveDivergenceCheckResult = {
  pass: boolean;
  score: number;
  status: "PASS" | "FAIL";
  result: LaunchLabPreviewCognitiveDivergenceAuditResult;
};

export function runCognitiveDivergenceCheck(): LaunchLabPreviewCognitiveDivergenceCheckResult {
  const result = runPreviewCognitiveDivergenceAudit();
  const pass =
    result.cognitiveSeparationScore >= 0.9 &&
    result.divergenceDetected === true;

  return {
    pass,
    score: result.cognitiveSeparationScore,
    status: pass ? "PASS" : "FAIL",
    result,
  };
}
