import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const reviewTypePath = path.join(rootDir, "src/types/lifeJourneyStageEvidenceReview.ts");
const evidenceTypePath = path.join(rootDir, "src/types/lifeJourneyStageTriggerEvidence.ts");
const triggerTypePath = path.join(rootDir, "src/types/lifeJourneyStageTrigger.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");

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
  ["stage evidence review type", reviewTypePath],
  ["stage trigger evidence type", evidenceTypePath],
  ["stage trigger type", triggerTypePath],
  ["stage authority type", authorityTypePath],
  ["type index", typeIndexPath],
  ["stage source", stageSourcePath],
  ["stage evidence review protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const reviewTypeSource = fs.readFileSync(reviewTypePath, "utf8");
  const evidenceTypeSource = fs.readFileSync(evidenceTypePath, "utf8");
  const triggerTypeSource = fs.readFileSync(triggerTypePath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'import type { LifeJourneyStageAuthority } from "./lifeJourneyStageAuthority"',
    'import type { LifeJourneyStageTriggerEvidenceCandidate } from "./lifeJourneyStageTriggerEvidence"',
    "export type LifeJourneyStageEvidenceRejectionReason",
    '"EVIDENCE_SOURCE_UNVERIFIED"',
    '"TRIGGER_SEMANTIC_MISMATCH"',
    '"AUTHORITY_CONTEXT_INSUFFICIENT"',
    "export type LifeJourneyStageEvidenceAccepted",
    'status: "ACCEPTED"',
    "reviewer: LifeJourneyStageAuthority",
    'semanticRole: "LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW"',
    "candidate: LifeJourneyStageTriggerEvidenceCandidate",
    "acceptedAsEvidence: true",
    "export type LifeJourneyStageEvidenceRejected",
    'status: "REJECTED"',
    "acceptedAsEvidence: false",
    "reason: LifeJourneyStageEvidenceRejectionReason",
    "notStageDeclaration: true",
    "noAutomaticProgression: true",
    "export type LifeJourneyStageEvidenceReview =",
    "export type LifeJourneyStageEvidenceReviewBoundary",
    "exclusiveAuthorityReviewer: true",
    "candidateReferenceRequired: true",
    "explicitRejectionReasonRequired: true",
    "noCandidateMutation: true",
    "noStageDeclaration: true",
    "noStageSourceInput: true",
    "noRuntimeReviewResolver: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("stage evidence review type contract", reviewTypeSource, marker));

  [
    "OriginalSelfJourneyPhase",
    "fourSymbol",
    "StarBeast",
    "MotherCode",
    "Hexagram",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "Archive",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "LifeJourneyStageSourceInput",
    "resolve",
    "fromStage",
    "toStage",
  ].forEach((marker) => assertExcludes("stage evidence review stays contract-only", reviewTypeSource, marker));

  [
    "LifeJourneyStageEvidenceAccepted",
    "LifeJourneyStageEvidenceRejected",
    "LifeJourneyStageEvidenceRejectionReason",
    "LifeJourneyStageEvidenceReview",
    "LifeJourneyStageEvidenceReviewBoundary",
    'from "./lifeJourneyStageEvidenceReview"',
  ].forEach((marker) => assertIncludes("type index exports evidence review", typeIndexSource, marker));

  assertIncludes("P23 remains candidate-only", evidenceTypeSource, "noEvidenceAcceptance: true");
  assertExcludes(
    "P23 candidate does not consume review",
    evidenceTypeSource,
    "LifeJourneyStageEvidenceReview",
  );
  assertIncludes(
    "P22 trigger keeps authority requirement",
    triggerTypeSource,
    "requiresAuthorityDeclaration: true",
  );
  assertIncludes("P21 keeps exclusive authority", authorityTypeSource, "exclusiveAuthority: true");
  assertExcludes("P15 source does not consume evidence review", stageSource, "LifeJourneyStageEvidenceReview");

  const reviewReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("LifeJourneyStageEvidenceReview"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "evidence review is only consumed by resolver, result consumption, and endpoint",
    reviewReferences.join(","),
    [
      "src/services/lifeJourneyStageEvidenceReviewResolver.ts",
      "src/services/lifeJourneyStageEvidenceReviewEndpoint.ts",
      "src/services/lifeJourneyStageEvidenceReviewResultConsumption.ts",
      "src/types/index.ts",
      "src/types/lifeJourneyStageEvidenceReview.ts",
    ]
      .sort()
      .join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-CONTRACT-P24",
    "AUTHORITY REVIEW CONTRACT",
    "ACCEPTED",
    "REJECTED + explicit reason",
    "Review Result",
    "LifeJourneyStageAuthority",
    "acceptedAsEvidence: true",
    "acceptedAsEvidence: false",
    "EVIDENCE_SOURCE_UNVERIFIED",
    "TRIGGER_SEMANTIC_MISMATCH",
    "AUTHORITY_CONTEXT_INSUFFICIENT",
    "P23 的 `noEvidenceAcceptance: true`",
    "P24 不新增 Review Resolver",
    "P24 不修改",
  ].forEach((marker) => assertIncludes("stage evidence review protocol", protocolSource, marker));

  assertIncludes(
    "evidence review gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-evidence-review"] ?? "",
    "node scripts/check-life-journey-stage-evidence-review.mjs",
  );
  assertIncludes(
    "evidence review gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-evidence-review",
  );
}

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW] PASS");
