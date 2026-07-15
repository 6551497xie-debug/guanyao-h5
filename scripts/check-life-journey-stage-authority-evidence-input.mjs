import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const inputTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthorityEvidenceInput.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const reviewTypePath = path.join(rootDir, "src/types/lifeJourneyStageEvidenceReview.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const readinessPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewReadiness.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_EVIDENCE_INPUT_PROTOCOL.md");
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
  ["authority evidence input type", inputTypePath],
  ["type index", typeIndexPath],
  ["evidence review type", reviewTypePath],
  ["stage authority type", authorityTypePath],
  ["review readiness", readinessPath],
  ["stage source", stageSourcePath],
  ["authority evidence input protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const inputTypeSource = fs.readFileSync(inputTypePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const reviewTypeSource = fs.readFileSync(reviewTypePath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const readinessSource = fs.readFileSync(readinessPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'import type { LifeJourneyStageAuthority } from "./lifeJourneyStageAuthority"',
    'import type { LifeJourneyStageEvidenceAccepted } from "./lifeJourneyStageEvidenceReview"',
    "export type LifeJourneyStageAuthorityEvidenceInput<",
    "TReview extends LifeJourneyStageEvidenceAccepted = LifeJourneyStageEvidenceAccepted",
    'source: "accepted_life_journey_stage_evidence_review"',
    'authority: TReview["reviewer"] & LifeJourneyStageAuthority',
    'semanticRole: "LIFE_JOURNEY_STAGE_AUTHORITY_EVIDENCE_INPUT"',
    "review: TReview",
    'proposedStage: TReview["candidate"]["trigger"]["semanticStage"]',
    "acceptedEvidenceRequired: true",
    "requiresExplicitAuthorityDeclaration: true",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
    "noAutomaticProgression: true",
    "noStageTransition: true",
    "export type LifeJourneyStageAuthorityEvidenceInputBoundary",
    "acceptedReviewRequired: true",
    "originalReviewReferenceRequired: true",
    "candidateAccessThroughReview: true",
    "triggerAccessThroughReview: true",
    "proposedStageDerivedFromAcceptedTrigger: true",
    "noReviewMutation: true",
    "noRuntimeAdapter: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("authority evidence input contract", inputTypeSource, marker));

  [
    "LifeJourneyStageEvidenceRejected",
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
    "resolveLifeJourneyStageEvidenceReviewReadiness",
    "resolveLifeJourneyStageEvidenceReviewConsumption",
    "resolveLifeJourneyStageEvidenceReview(",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    "function ",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("authority evidence input stays contract-only", inputTypeSource, marker));

  [
    "LifeJourneyStageAuthorityEvidenceInput",
    "LifeJourneyStageAuthorityEvidenceInputBoundary",
    'from "./lifeJourneyStageAuthorityEvidenceInput"',
  ].forEach((marker) => assertIncludes("type index exports authority evidence input", typeIndexSource, marker));

  assertIncludes("P24 accepted review remains explicit", reviewTypeSource, "export type LifeJourneyStageEvidenceAccepted");
  assertIncludes("P24 accepted review remains evidence-only", reviewTypeSource, "notStageDeclaration: true");
  assertIncludes("P21 authority remains exclusive", authorityTypeSource, "exclusiveAuthority: true");
  assertExcludes("P28 readiness does not consume authority input", readinessSource, "LifeJourneyStageAuthorityEvidenceInput");
  assertExcludes("P15 source does not consume authority input", stageSource, "LifeJourneyStageAuthorityEvidenceInput");

  const inputReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("LifeJourneyStageAuthorityEvidenceInput"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority evidence input is only consumed by authority evidence input adapter",
    inputReferences.join(","),
    [
      "src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts",
      "src/types/index.ts",
      "src/types/lifeJourneyStageAuthorityEvidenceInput.ts",
    ]
      .sort()
      .join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-EVIDENCE-INPUT-CONTRACT-P30",
    "AUTHORITY EVIDENCE INPUT CONTRACT",
    "LifeJourneyStageEvidenceAccepted",
    "LifeJourneyStageAuthorityEvidenceInput",
    "review.candidate.trigger.semanticStage",
    "LifeJourneyStageEvidenceRejected` 不能形成",
    "REJECTED 仍是有效完成的审查结果",
    "Authority Evidence Input 不是 `LifeJourneyStageAuthorityDeclaration`",
    "requiresExplicitAuthorityDeclaration: true",
    "不新增 Review → Authority Adapter",
    "P30 不修改 P0–P29",
  ].forEach((marker) => assertIncludes("authority evidence input protocol", protocolSource, marker));

  assertIncludes(
    "authority evidence input gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority-evidence-input"] ?? "",
    "node scripts/check-life-journey-stage-authority-evidence-input.mjs",
  );
  assertIncludes(
    "authority evidence input gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority-evidence-input",
  );
}

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY EVIDENCE INPUT] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE AUTHORITY EVIDENCE INPUT] PASS");
