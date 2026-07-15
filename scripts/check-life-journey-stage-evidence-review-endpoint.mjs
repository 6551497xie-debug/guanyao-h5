import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const endpointPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewEndpoint.ts");
const resolverPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewResolver.ts");
const consumptionPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewResultConsumption.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_ENDPOINT_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempEndpointModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-evidence-review-endpoint-${process.pid}.mjs`);

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
  ["evidence review endpoint", endpointPath],
  ["evidence review resolver", resolverPath],
  ["evidence review result consumption", consumptionPath],
  ["stage source", stageSourcePath],
  ["evidence review endpoint protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const endpointSource = fs.readFileSync(endpointPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "type LifeJourneyStageEvidenceReviewResolverInput",
    "type LifeJourneyStageEvidenceReviewConsumption",
    'export type { LifeJourneyStageEvidenceReviewConsumption } from "./lifeJourneyStageEvidenceReviewResultConsumption"',
    "export type LifeJourneyStageEvidenceReviewEndpointInput =",
    "LifeJourneyStageEvidenceReviewResolverInput",
    "export function resolveLifeJourneyStageEvidenceReviewConsumption",
    "input: LifeJourneyStageEvidenceReviewEndpointInput",
    "): LifeJourneyStageEvidenceReviewConsumption",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    "resolveLifeJourneyStageEvidenceReview(input)",
  ].forEach((marker) => assertIncludes("review endpoint contract", endpointSource, marker));

  [
    "if (", "switch (", "review.status", "sourceReference", "evidenceSource.boundary",
    "OriginalSelfJourneyPhase", "LifeJourneyStageAuthorityDeclaration", "LifeJourneyStageSourceInput",
    "Gravity", "Dynamics", "CrystalState", "localStorage", "sessionStorage", "fetch(", 'from "react"',
  ].forEach((marker) => assertExcludes("review endpoint stays composition-only", endpointSource, marker));

  assertExcludes("P15 source does not consume review endpoint", stageSource, "resolveLifeJourneyStageEvidenceReviewConsumption");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const endpointCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageEvidenceReviewConsumption"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "review endpoint is only consumed by readiness",
    endpointCallSites.join(","),
    ["src/services/lifeJourneyStageEvidenceReviewEndpoint.ts", "src/services/lifeJourneyStageEvidenceReviewReadiness.ts"].sort().join(","),
  );

  const resolverCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageEvidenceReview("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "review resolver is only called by endpoint",
    resolverCallSites.join(","),
    ["src/services/lifeJourneyStageEvidenceReviewEndpoint.ts", "src/services/lifeJourneyStageEvidenceReviewResolver.ts"].sort().join(","),
  );

  const consumptionCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeLifeJourneyStageEvidenceReviewResult"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "review consumption is only called by endpoint",
    consumptionCallSites.join(","),
    ["src/services/lifeJourneyStageEvidenceReviewEndpoint.ts", "src/services/lifeJourneyStageEvidenceReviewResultConsumption.ts"].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-ENDPOINT-P27",
    "REVIEW ENDPOINT COMPOSITION",
    "LifeJourneyStageEvidenceReviewEndpointInput",
    "resolveLifeJourneyStageEvidenceReview",
    "consumeLifeJourneyStageEvidenceReviewResult",
    "ACCEPT  → AVAILABLE / ACCEPTED",
    "REJECT  → AVAILABLE / REJECTED",
    "REJECTED 是已经完成的有效审查结论",
    "Endpoint 当前没有下游业务消费者",
    "P24–P26 gate 只增加该 Endpoint 到合法引用集合",
    "P27 不修改 P0–P26 的语义类型",
  ].forEach((marker) => assertIncludes("review endpoint protocol", protocolSource, marker));

  assertIncludes(
    "review endpoint gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-evidence-review-endpoint"] ?? "",
    "node scripts/check-life-journey-stage-evidence-review-endpoint.mjs",
  );
  assertIncludes(
    "review endpoint gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-evidence-review-endpoint",
  );

  await build({
    entryPoints: [endpointPath],
    outfile: tempEndpointModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveLifeJourneyStageEvidenceReviewConsumption } = await import(`file://${tempEndpointModulePath}?t=${Date.now()}`);

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
    evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:choice-endpoint-example" }),
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
  const accepted = resolveLifeJourneyStageEvidenceReviewConsumption(acceptInput);
  assertEqual("endpoint accept is available", accepted.status, "AVAILABLE");
  assertEqual("endpoint accept disposition", accepted.disposition, "ACCEPTED");
  assertEqual("endpoint accept preserves input", accepted.result.input === acceptInput, true);
  assertEqual("endpoint accept preserves candidate", accepted.review.candidate === candidate, true);
  assertEqual("endpoint accept result is frozen", Object.isFrozen(accepted), true);
  assertEqual("endpoint accept does not mutate input", JSON.stringify(acceptInput), acceptSnapshot);

  const rejectInput = Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason: "EVIDENCE_SOURCE_UNVERIFIED" });
  const rejectSnapshot = JSON.stringify(rejectInput);
  const rejected = resolveLifeJourneyStageEvidenceReviewConsumption(rejectInput);
  assertEqual("endpoint reject remains available", rejected.status, "AVAILABLE");
  assertEqual("endpoint reject disposition", rejected.disposition, "REJECTED");
  assertEqual("endpoint reject preserves reason", rejected.review.reason, "EVIDENCE_SOURCE_UNVERIFIED");
  assertEqual("endpoint reject preserves input", rejected.result.input === rejectInput, true);
  assertEqual("endpoint reject result is frozen", Object.isFrozen(rejected), true);
  assertEqual("endpoint reject does not mutate input", JSON.stringify(rejectInput), rejectSnapshot);

  const invalidInput = Object.freeze({ candidate, reviewer, decision: "REJECT" });
  const invalidSnapshot = JSON.stringify(invalidInput);
  const unavailable = resolveLifeJourneyStageEvidenceReviewConsumption(invalidInput);
  assertEqual("endpoint invalid input is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("endpoint invalid reason", unavailable.reason, "REJECTION_REASON_MISSING");
  assertEqual("endpoint invalid preserves input", unavailable.input === invalidInput, true);
  assertEqual("endpoint invalid result preserves input", unavailable.result.input === invalidInput, true);
  assertEqual("endpoint invalid result is frozen", Object.isFrozen(unavailable), true);
  assertEqual("endpoint invalid does not mutate input", JSON.stringify(invalidInput), invalidSnapshot);
}

fs.rmSync(tempEndpointModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW ENDPOINT] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW ENDPOINT] PASS");
