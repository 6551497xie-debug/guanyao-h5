import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const readinessPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewReadiness.ts");
const endpointPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewEndpoint.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_READINESS_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempReadinessModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-evidence-review-readiness-${process.pid}.mjs`);

const failures = [];

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["evidence review readiness", readinessPath],
  ["evidence review endpoint", endpointPath],
  ["stage source", stageSourcePath],
  ["evidence review readiness protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const readinessSource = fs.readFileSync(readinessPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageEvidenceReviewReadinessInput =",
    "LifeJourneyStageEvidenceReviewEndpointInput",
    "export type LifeJourneyStageEvidenceReviewReadinessNotReadyReason =",
    "export type LifeJourneyStageEvidenceReviewReadiness =",
    'status: "NOT_READY"',
    'readiness: "NOT_READY"',
    'status: "READY"',
    'readiness: "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME"',
    "consumption: LifeJourneyStageEvidenceReviewUnavailable",
    "consumption: LifeJourneyStageEvidenceReviewAvailable",
    'disposition: LifeJourneyStageEvidenceReviewAvailable["disposition"]',
    "export function resolveLifeJourneyStageEvidenceReviewReadiness",
    "const consumption = resolveLifeJourneyStageEvidenceReviewConsumption(input)",
    'if (consumption.status !== "AVAILABLE")',
    "reason: consumption.reason",
    "disposition: consumption.disposition",
  ].forEach((marker) => assertIncludes("review readiness contract", readinessSource, marker));

  [
    "resolveLifeJourneyStageEvidenceReview(",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    "sourceReference",
    "evidenceSource.boundary",
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
    "OriginalSelfJourneyPhase",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("review readiness stays outcome-only", readinessSource, marker));

  assertExcludes("P15 source does not consume review readiness", stageSource, "resolveLifeJourneyStageEvidenceReviewReadiness");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const readinessCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageEvidenceReviewReadiness"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual("review readiness has no downstream consumer", readinessCallSites.join(","), "src/services/lifeJourneyStageEvidenceReviewReadiness.ts");

  const endpointCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageEvidenceReviewConsumption"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "review endpoint is only consumed by readiness",
    endpointCallSites.join(","),
    ["src/services/lifeJourneyStageEvidenceReviewEndpoint.ts", "src/services/lifeJourneyStageEvidenceReviewReadiness.ts"].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-READINESS-P28",
    "REVIEW OUTCOME READINESS",
    "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME",
    "AVAILABLE / ACCEPTED → READY / disposition ACCEPTED",
    "AVAILABLE / REJECTED → READY / disposition REJECTED",
    "REJECTED 是有效完成的审查结果",
    "只有 P27 Endpoint 返回 UNAVAILABLE",
    "不代表阶段已经声明",
    "P28 Readiness 是 P27 Endpoint 当前唯一合法消费者",
    "P28 不修改 P0–P27 的语义类型",
  ].forEach((marker) => assertIncludes("review readiness protocol", protocolSource, marker));

  assertIncludes(
    "review readiness gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-evidence-review-readiness"] ?? "",
    "node scripts/check-life-journey-stage-evidence-review-readiness.mjs",
  );
  assertIncludes(
    "review readiness gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-evidence-review-readiness",
  );

  await build({
    entryPoints: [readinessPath],
    outfile: tempReadinessModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveLifeJourneyStageEvidenceReviewReadiness } = await import(`file://${tempReadinessModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({
    trigger: "LIFE_DIRECTION_CHOICE_COMPLETED",
    semanticStage: "CHOICE",
    semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE",
    explicit: true,
    requiresAuthorityDeclaration: true,
    noTransitionDecision: true,
    noAutomaticProgression: true,
  });
  const candidate = Object.freeze({
    evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:choice-readiness-example" }),
    trigger,
    semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE",
    immutable: true,
    traceable: true,
    requiresAuthorityReview: true,
    notStageDeclaration: true,
    notAuthorityDecision: true,
    noAutomaticProgression: true,
  });
  const reviewer = "original_self_life_journey_orchestrator";

  const acceptInput = Object.freeze({ candidate, reviewer, decision: "ACCEPT" });
  const acceptSnapshot = JSON.stringify(acceptInput);
  const accepted = resolveLifeJourneyStageEvidenceReviewReadiness(acceptInput);
  assertEqual("accepted review outcome is ready", accepted.status, "READY");
  assertEqual("accepted readiness marker", accepted.readiness, "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME");
  assertEqual("accepted disposition is preserved", accepted.disposition, "ACCEPTED");
  assertEqual("accepted input is preserved", accepted.input === acceptInput, true);
  assertEqual("accepted consumption is available", accepted.consumption.status, "AVAILABLE");
  assertEqual("accepted readiness is frozen", Object.isFrozen(accepted), true);
  assertEqual("accepted readiness does not mutate input", JSON.stringify(acceptInput), acceptSnapshot);

  const rejectInput = Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason: "AUTHORITY_CONTEXT_INSUFFICIENT" });
  const rejectSnapshot = JSON.stringify(rejectInput);
  const rejected = resolveLifeJourneyStageEvidenceReviewReadiness(rejectInput);
  assertEqual("rejected review outcome remains ready", rejected.status, "READY");
  assertEqual("rejected readiness marker", rejected.readiness, "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME");
  assertEqual("rejected disposition is preserved", rejected.disposition, "REJECTED");
  assertEqual("rejected reason is preserved", rejected.consumption.review.reason, "AUTHORITY_CONTEXT_INSUFFICIENT");
  assertEqual("rejected input is preserved", rejected.input === rejectInput, true);
  assertEqual("rejected readiness is frozen", Object.isFrozen(rejected), true);
  assertEqual("rejected readiness does not mutate input", JSON.stringify(rejectInput), rejectSnapshot);

  const invalidInput = Object.freeze({ candidate, reviewer, decision: "REJECT" });
  const invalidSnapshot = JSON.stringify(invalidInput);
  const notReady = resolveLifeJourneyStageEvidenceReviewReadiness(invalidInput);
  assertEqual("unavailable review outcome is not ready", notReady.status, "NOT_READY");
  assertEqual("unavailable readiness marker", notReady.readiness, "NOT_READY");
  assertEqual("unavailable reason is preserved", notReady.reason, "REJECTION_REASON_MISSING");
  assertEqual("unavailable input is preserved", notReady.input === invalidInput, true);
  assertEqual("unavailable consumption is preserved", notReady.consumption.input === invalidInput, true);
  assertEqual("not ready result is frozen", Object.isFrozen(notReady), true);
  assertEqual("not ready does not mutate input", JSON.stringify(invalidInput), invalidSnapshot);
}

fs.rmSync(tempReadinessModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW READINESS] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW READINESS] PASS");
