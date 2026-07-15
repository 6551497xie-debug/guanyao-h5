import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const resolverPath = path.join(
  rootDir,
  "src/services/lifeJourneyStageEvidenceReviewResolver.ts",
);
const reviewTypePath = path.join(rootDir, "src/types/lifeJourneyStageEvidenceReview.ts");
const evidenceTypePath = path.join(rootDir, "src/types/lifeJourneyStageTriggerEvidence.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_RESOLVER_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-life-journey-stage-evidence-review-resolver-${process.pid}.mjs`,
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
  ["evidence review resolver", resolverPath],
  ["evidence review type", reviewTypePath],
  ["trigger evidence type", evidenceTypePath],
  ["stage authority type", authorityTypePath],
  ["stage source", stageSourcePath],
  ["evidence review resolver protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const resolverSource = fs.readFileSync(resolverPath, "utf8");
  const reviewTypeSource = fs.readFileSync(reviewTypePath, "utf8");
  const evidenceTypeSource = fs.readFileSync(evidenceTypePath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageEvidenceReviewDecision",
    "export type LifeJourneyStageEvidenceReviewResolverInput",
    'candidate: LifeJourneyStageEvidenceReview["candidate"] | null',
    'reviewer: LifeJourneyStageEvidenceReview["reviewer"] | null',
    "decision: LifeJourneyStageEvidenceReviewDecision | null",
    "rejectionReason?: LifeJourneyStageEvidenceRejectionReason | null",
    "export type LifeJourneyStageEvidenceReviewResolverNotReadyReason",
    '"EVIDENCE_CANDIDATE_MISSING"',
    '"AUTHORITY_REVIEWER_INVALID"',
    '"AUTHORITY_DECISION_INVALID"',
    '"REJECTION_REASON_MISSING"',
    '"REJECTION_REASON_INVALID"',
    "export type LifeJourneyStageEvidenceReviewResolverResult",
    "export function resolveLifeJourneyStageEvidenceReview",
    'source: "life_journey_stage_evidence_review_resolver"',
    'status: "ACCEPTED"',
    'status: "REJECTED"',
    "candidate: input.candidate",
    "acceptedAsEvidence: true",
    "acceptedAsEvidence: false",
    "reason: input.rejectionReason",
    "notStageDeclaration: true",
    "noAutomaticProgression: true",
  ].forEach((marker) => assertIncludes("evidence review resolver contract", resolverSource, marker));

  [
    "sourceReference",
    "evidenceSource.boundary",
    "OriginalSelfJourneyPhase",
    "fourSymbol",
    "StarBeast",
    "MotherCode",
    "Hexagram",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
  ].forEach((marker) => assertExcludes("review resolver stays explicit-decision-only", resolverSource, marker));

  assertIncludes("P24 review contract stays present", reviewTypeSource, "export type LifeJourneyStageEvidenceReview");
  assertIncludes("P23 candidate stays immutable", evidenceTypeSource, "immutable: true");
  assertIncludes("P21 authority remains exclusive", authorityTypeSource, "exclusiveAuthority: true");
  assertExcludes("P15 source does not consume review resolver", stageSource, "resolveLifeJourneyStageEvidenceReview");

  const resolverCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageEvidenceReview("))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "review resolver is only consumed by endpoint",
    resolverCallSites.sort().join(","),
    [
      "src/services/lifeJourneyStageEvidenceReviewEndpoint.ts",
      "src/services/lifeJourneyStageEvidenceReviewResolver.ts",
    ].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-RESOLVER-P25",
    "EXPLICIT AUTHORITY DECISION RESOLVER",
    "ACCEPT → READY / ACCEPTED",
    "REJECT + reason → READY / REJECTED",
    "EVIDENCE_CANDIDATE_MISSING",
    "AUTHORITY_REVIEWER_INVALID",
    "AUTHORITY_DECISION_INVALID",
    "REJECTION_REASON_MISSING",
    "REJECTION_REASON_INVALID",
    "不查询 Evidence Provider",
    "不生成阶段声明",
    "P24 的 `noRuntimeReviewResolver: true`",
    "P25 不修改 P0–P24",
  ].forEach((marker) => assertIncludes("review resolver protocol", protocolSource, marker));

  assertIncludes(
    "review resolver gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-evidence-review-resolver"] ?? "",
    "node scripts/check-life-journey-stage-evidence-review-resolver.mjs",
  );
  assertIncludes(
    "review resolver gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-evidence-review-resolver",
  );

  await build({
    entryPoints: [resolverPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveLifeJourneyStageEvidenceReview } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const trigger = Object.freeze({
    trigger: "REALITY_PRESSURE_ENCOUNTERED",
    semanticStage: "PRESSURE",
    semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE",
    explicit: true,
    requiresAuthorityDeclaration: true,
    noTransitionDecision: true,
    noAutomaticProgression: true,
  });
  const evidenceSource = Object.freeze({
    boundary: "formal_life_journey_evidence_provider",
    sourceReference: "formal-source:pressure-example",
  });
  const candidate = Object.freeze({
    evidenceSource,
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
  const accepted = resolveLifeJourneyStageEvidenceReview(acceptInput);

  assertEqual("accept decision is ready", accepted.status, "READY");
  assertEqual("accept decision produces accepted review", accepted.review?.status, "ACCEPTED");
  assertEqual("accepted review preserves reviewer", accepted.review?.reviewer, reviewer);
  assertEqual("accepted review preserves candidate", accepted.review?.candidate === candidate, true);
  assertEqual("accepted review is evidence only", accepted.review?.acceptedAsEvidence, true);
  assertEqual("accepted review is not stage declaration", accepted.review?.notStageDeclaration, true);
  assertEqual("accepted result preserves input", accepted.input === acceptInput, true);
  assertEqual("accepted review is frozen", Object.isFrozen(accepted.review), true);
  assertEqual("accepted result is frozen", Object.isFrozen(accepted), true);
  assertEqual("accept resolver does not mutate input", JSON.stringify(acceptInput), acceptSnapshot);

  const rejectionReasons = [
    "EVIDENCE_SOURCE_UNVERIFIED",
    "TRIGGER_SEMANTIC_MISMATCH",
    "AUTHORITY_CONTEXT_INSUFFICIENT",
  ];
  for (const rejectionReason of rejectionReasons) {
    const input = Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason });
    const snapshot = JSON.stringify(input);
    const result = resolveLifeJourneyStageEvidenceReview(input);
    assertEqual(`${rejectionReason} is ready`, result.status, "READY");
    assertEqual(`${rejectionReason} produces rejected review`, result.review?.status, "REJECTED");
    assertEqual(`${rejectionReason} is preserved`, result.review?.reason, rejectionReason);
    assertEqual(`${rejectionReason} preserves candidate`, result.review?.candidate === candidate, true);
    assertEqual(`${rejectionReason} remains evidence only`, result.review?.acceptedAsEvidence, false);
    assertEqual(`${rejectionReason} review is frozen`, Object.isFrozen(result.review), true);
    assertEqual(`${rejectionReason} result is frozen`, Object.isFrozen(result), true);
    assertEqual(`${rejectionReason} does not mutate input`, JSON.stringify(input), snapshot);
  }

  const notReadyCases = [
    {
      name: "missing candidate",
      input: Object.freeze({ candidate: null, reviewer, decision: "ACCEPT" }),
      reason: "EVIDENCE_CANDIDATE_MISSING",
    },
    {
      name: "invalid reviewer",
      input: Object.freeze({ candidate, reviewer: "page", decision: "ACCEPT" }),
      reason: "AUTHORITY_REVIEWER_INVALID",
    },
    {
      name: "invalid decision",
      input: Object.freeze({ candidate, reviewer, decision: "AUTO" }),
      reason: "AUTHORITY_DECISION_INVALID",
    },
    {
      name: "missing rejection reason",
      input: Object.freeze({ candidate, reviewer, decision: "REJECT" }),
      reason: "REJECTION_REASON_MISSING",
    },
    {
      name: "invalid rejection reason",
      input: Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason: "AUTO" }),
      reason: "REJECTION_REASON_INVALID",
    },
  ];

  for (const testCase of notReadyCases) {
    const result = resolveLifeJourneyStageEvidenceReview(testCase.input);
    assertEqual(`${testCase.name} is not ready`, result.status, "NOT_READY");
    assertEqual(`${testCase.name} reason`, result.reason, testCase.reason);
    assertEqual(`${testCase.name} preserves input`, result.input === testCase.input, true);
    assertEqual(`${testCase.name} does not produce review`, "review" in result, false);
    assertEqual(`${testCase.name} result is frozen`, Object.isFrozen(result), true);
  }
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW RESOLVER] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW RESOLVER] PASS");
