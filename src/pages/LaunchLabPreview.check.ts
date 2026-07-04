import {
  runCognitiveDivergenceCheck,
  runCognitiveDivergenceGate,
  type LaunchLabPreviewCognitiveDivergenceCheckResult,
} from "./LaunchLabPreview.runner";

export type LaunchLabPreviewGateCheckResult = {
  pass: boolean;
  consistent: boolean;
  score: number;
  resultMatch: boolean;
};

function isPassingGate(result: LaunchLabPreviewCognitiveDivergenceCheckResult): boolean {
  return result.pass === true && result.status === "PASS" && result.score >= 0.9;
}

function createTamperedGateResult(
  result: LaunchLabPreviewCognitiveDivergenceCheckResult
): LaunchLabPreviewCognitiveDivergenceCheckResult {
  return {
    ...result,
    pass: false,
    score: 0.4,
    status: "FAIL",
    result: {
      ...result.result,
      divergenceDetected: false,
      cognitiveSeparationScore: 0.4,
      notes: ["MOCK_CORRUPTION"],
    },
  };
}

function isFailingGate(result: LaunchLabPreviewCognitiveDivergenceCheckResult): boolean {
  return result.pass === false && result.status === "FAIL" && result.score < 0.9;
}

function toStableJson(value: unknown): string {
  return JSON.stringify(value);
}

export function runPreviewGateCheck(): LaunchLabPreviewGateCheckResult {
  const checkResult = runCognitiveDivergenceCheck();
  const gateResult = runCognitiveDivergenceGate();
  const repeatedGateResult = runCognitiveDivergenceGate();
  const tamperedResult = createTamperedGateResult(gateResult);

  const newUserCasePass =
    isPassingGate(checkResult) &&
    checkResult.result.emissionClarityScore >= 0.9;
  const oldUserCasePass =
    isPassingGate(gateResult) &&
    gateResult.result.collapseClarityScore >= 0.9;
  const tamperedCasePass = isFailingGate(tamperedResult);
  const resultMatch = toStableJson(checkResult) === toStableJson(gateResult);
  const deterministic = toStableJson(gateResult) === toStableJson(repeatedGateResult);
  const consistent =
    resultMatch &&
    deterministic &&
    checkResult.score === checkResult.result.cognitiveSeparationScore;
  const pass =
    newUserCasePass &&
    oldUserCasePass &&
    tamperedCasePass &&
    consistent;

  return {
    pass,
    consistent,
    score: gateResult.score,
    resultMatch,
  };
}
