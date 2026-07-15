import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const consumptionPath = path.join(
  rootDir,
  "src/services/lifeJourneyStageEvidenceReviewResultConsumption.ts",
);
const resolverPath = path.join(
  rootDir,
  "src/services/lifeJourneyStageEvidenceReviewResolver.ts",
);
const reviewTypePath = path.join(rootDir, "src/types/lifeJourneyStageEvidenceReview.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_CONSUMPTION_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempConsumptionModulePath = path.join(
  os.tmpdir(),
  `guanyao-life-journey-stage-evidence-review-consumption-${process.pid}.mjs`,
);
const tempResolverModulePath = path.join(
  os.tmpdir(),
  `guanyao-life-journey-stage-evidence-review-consumption-resolver-${process.pid}.mjs`,
);

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
  ["review result consumption", consumptionPath],
  ["evidence review resolver", resolverPath],
  ["evidence review type", reviewTypePath],
  ["stage source", stageSourcePath],
  ["review consumption protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const consumptionSource = fs.readFileSync(consumptionPath, "utf8");
  const resolverSource = fs.readFileSync(resolverPath, "utf8");
  const reviewTypeSource = fs.readFileSync(reviewTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageEvidenceReviewAvailable",
    'status: "AVAILABLE"',
    'source: "life_journey_stage_evidence_review_consumption"',
    "result: LifeJourneyStageEvidenceReviewResolverReady",
    'review: LifeJourneyStageEvidenceReviewResolverReady["review"]',
    'disposition: LifeJourneyStageEvidenceReviewResolverReady["review"]["status"]',
    "export type LifeJourneyStageEvidenceReviewUnavailable",
    'status: "UNAVAILABLE"',
    "result: LifeJourneyStageEvidenceReviewResolverNotReady",
    "reason: LifeJourneyStageEvidenceReviewResolverNotReadyReason",
    'input: LifeJourneyStageEvidenceReviewResolverNotReady["input"]',
    "export type LifeJourneyStageEvidenceReviewConsumption",
    "export function consumeLifeJourneyStageEvidenceReviewResult",
    'if (result.status !== "READY")',
    "reason: result.reason",
    "input: result.input",
    "review: result.review",
    "disposition: result.review.status",
  ].forEach((marker) => assertIncludes("review consumption contract", consumptionSource, marker));

  [
    "resolveLifeJourneyStageEvidenceReview(",
    'result.review.status === "ACCEPTED"',
    'result.review.status === "REJECTED"',
    "sourceReference",
    "evidenceSource.boundary",
    "OriginalSelfJourneyPhase",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
  ].forEach((marker) => assertExcludes("review consumption stays result-only", consumptionSource, marker));

  assertIncludes(
    "P25 resolver result remains explicit",
    resolverSource,
    "export type LifeJourneyStageEvidenceReviewResolverResult",
  );
  assertIncludes("P24 review contract remains present", reviewTypeSource, "export type LifeJourneyStageEvidenceReview");
  assertExcludes("P15 source does not consume review consumption", stageSource, "consumeLifeJourneyStageEvidenceReviewResult");

  const consumptionCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) =>
      fs.readFileSync(filePath, "utf8").includes("consumeLifeJourneyStageEvidenceReviewResult"),
    )
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "review consumption has no runtime or UI consumer",
    consumptionCallSites.join(","),
    "src/services/lifeJourneyStageEvidenceReviewResultConsumption.ts",
  );

  [
    "RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-CONSUMPTION-P26",
    "REVIEW RESULT CONSUMPTION",
    "READY / Review ACCEPTED",
    "READY / Review REJECTED",
    "AVAILABLE / disposition REJECTED",
    "REJECTED 是一项已经完成的有效审查结论",
    "READY     → AVAILABLE",
    "NOT_READY → UNAVAILABLE",
    "不重新执行 Resolver",
    "P26 不修改 P0–P25",
  ].forEach((marker) => assertIncludes("review consumption protocol", protocolSource, marker));

  assertIncludes(
    "review consumption gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-evidence-review-consumption"] ?? "",
    "node scripts/check-life-journey-stage-evidence-review-consumption.mjs",
  );
  assertIncludes(
    "review consumption gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-evidence-review-consumption",
  );

  await Promise.all([
    build({
      entryPoints: [consumptionPath],
      outfile: tempConsumptionModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [resolverPath],
      outfile: tempResolverModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const { consumeLifeJourneyStageEvidenceReviewResult } = await import(
    `file://${tempConsumptionModulePath}?t=${Date.now()}`
  );
  const { resolveLifeJourneyStageEvidenceReview } = await import(
    `file://${tempResolverModulePath}?t=${Date.now()}`
  );

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
    evidenceSource: Object.freeze({
      boundary: "formal_life_journey_evidence_provider",
      sourceReference: "formal-source:choice-example",
    }),
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

  const acceptedResult = resolveLifeJourneyStageEvidenceReview(
    Object.freeze({ candidate, reviewer, decision: "ACCEPT" }),
  );
  const acceptedSnapshot = JSON.stringify(acceptedResult);
  const accepted = consumeLifeJourneyStageEvidenceReviewResult(acceptedResult);
  assertEqual("accepted result is available", accepted.status, "AVAILABLE");
  assertEqual("accepted disposition is preserved", accepted.disposition, "ACCEPTED");
  assertEqual("accepted resolver result is preserved", accepted.result === acceptedResult, true);
  assertEqual("accepted review reference is preserved", accepted.review === acceptedResult.review, true);
  assertEqual("accepted consumption is frozen", Object.isFrozen(accepted), true);
  assertEqual("accepted result is not mutated", JSON.stringify(acceptedResult), acceptedSnapshot);

  const rejectedResult = resolveLifeJourneyStageEvidenceReview(
    Object.freeze({
      candidate,
      reviewer,
      decision: "REJECT",
      rejectionReason: "TRIGGER_SEMANTIC_MISMATCH",
    }),
  );
  const rejectedSnapshot = JSON.stringify(rejectedResult);
  const rejected = consumeLifeJourneyStageEvidenceReviewResult(rejectedResult);
  assertEqual("rejected review remains available", rejected.status, "AVAILABLE");
  assertEqual("rejected disposition is preserved", rejected.disposition, "REJECTED");
  assertEqual("rejected resolver result is preserved", rejected.result === rejectedResult, true);
  assertEqual("rejected review reference is preserved", rejected.review === rejectedResult.review, true);
  assertEqual("rejected reason remains on review", rejected.review?.reason, "TRIGGER_SEMANTIC_MISMATCH");
  assertEqual("rejected consumption is frozen", Object.isFrozen(rejected), true);
  assertEqual("rejected result is not mutated", JSON.stringify(rejectedResult), rejectedSnapshot);

  const notReadyResult = resolveLifeJourneyStageEvidenceReview(
    Object.freeze({ candidate, reviewer, decision: "REJECT" }),
  );
  const notReadySnapshot = JSON.stringify(notReadyResult);
  const unavailable = consumeLifeJourneyStageEvidenceReviewResult(notReadyResult);
  assertEqual("not ready result is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable reason is preserved", unavailable.reason, "REJECTION_REASON_MISSING");
  assertEqual("unavailable resolver result is preserved", unavailable.result === notReadyResult, true);
  assertEqual("unavailable input is preserved", unavailable.input === notReadyResult.input, true);
  assertEqual("unavailable consumption is frozen", Object.isFrozen(unavailable), true);
  assertEqual("not ready result is not mutated", JSON.stringify(notReadyResult), notReadySnapshot);
}

fs.rmSync(tempConsumptionModulePath, { force: true });
fs.rmSync(tempResolverModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW CONSUMPTION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW CONSUMPTION] PASS");
