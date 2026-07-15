import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const evidenceTypePath = path.join(rootDir, "src/types/lifeJourneyStageTriggerEvidence.ts");
const triggerTypePath = path.join(rootDir, "src/types/lifeJourneyStageTrigger.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_PROTOCOL.md",
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
  ["stage trigger evidence type", evidenceTypePath],
  ["stage trigger type", triggerTypePath],
  ["stage authority type", authorityTypePath],
  ["type index", typeIndexPath],
  ["stage source", stageSourcePath],
  ["stage trigger evidence protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const evidenceTypeSource = fs.readFileSync(evidenceTypePath, "utf8");
  const triggerTypeSource = fs.readFileSync(triggerTypePath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'import type { LifeJourneyStageTrigger } from "./lifeJourneyStageTrigger"',
    "export type LifeJourneyStageTriggerEvidenceSource",
    'boundary: "formal_life_journey_evidence_provider"',
    "sourceReference: string",
    "export type LifeJourneyStageTriggerEvidenceCandidate",
    "evidenceSource: LifeJourneyStageTriggerEvidenceSource",
    "trigger: LifeJourneyStageTrigger",
    'semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE"',
    "immutable: true",
    "traceable: true",
    "requiresAuthorityReview: true",
    "notStageDeclaration: true",
    "notAuthorityDecision: true",
    "noAutomaticProgression: true",
    "export type LifeJourneyStageTriggerEvidenceBoundary",
    "explicitProvenanceRequired: true",
    "immutableCandidate: true",
    "traceableCandidate: true",
    "noEvidenceAcceptance: true",
    "noStageDeclaration: true",
    "noRuntimeSourceMapping: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("trigger evidence type contract", evidenceTypeSource, marker));

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
    "accepted",
    "rejected",
    "fromStage",
    "toStage",
  ].forEach((marker) => assertExcludes("trigger evidence stays candidate-only", evidenceTypeSource, marker));

  [
    "LifeJourneyStageTriggerEvidenceBoundary",
    "LifeJourneyStageTriggerEvidenceCandidate",
    "LifeJourneyStageTriggerEvidenceSource",
    'from "./lifeJourneyStageTriggerEvidence"',
  ].forEach((marker) => assertIncludes("type index exports trigger evidence", typeIndexSource, marker));

  assertIncludes(
    "P22 trigger still requires authority declaration",
    triggerTypeSource,
    "requiresAuthorityDeclaration: true",
  );
  assertExcludes(
    "P22 trigger does not consume evidence candidate",
    triggerTypeSource,
    "LifeJourneyStageTriggerEvidenceCandidate",
  );
  assertIncludes(
    "P21 remains the exclusive authority",
    authorityTypeSource,
    "exclusiveAuthority: true",
  );
  assertExcludes(
    "P21 authority does not consume evidence candidate",
    authorityTypeSource,
    "LifeJourneyStageTriggerEvidenceCandidate",
  );
  assertExcludes("P15 source does not consume evidence candidate", stageSource, "LifeJourneyStageTriggerEvidence");

  const evidenceReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) =>
      fs.readFileSync(filePath, "utf8").includes("LifeJourneyStageTriggerEvidenceCandidate"),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "evidence candidate has no service or runtime consumer",
    evidenceReferences.join(","),
    ["src/types/index.ts", "src/types/lifeJourneyStageTriggerEvidence.ts"].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-TRIGGER-EVIDENCE-P23",
    "EVIDENCE CANDIDATE BOUNDARY",
    "只建立 Evidence Candidate",
    "formal_life_journey_evidence_provider",
    "sourceReference",
    "requiresAuthorityReview: true",
    "notStageDeclaration: true",
    "notAuthorityDecision: true",
    "Candidate 表达",
    "不新增 Evidence → Authority Adapter",
    "暂不建立 Evidence Acceptance",
    "P23 不修改",
  ].forEach((marker) => assertIncludes("trigger evidence protocol", protocolSource, marker));

  assertIncludes(
    "trigger evidence gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-trigger-evidence"] ?? "",
    "node scripts/check-life-journey-stage-trigger-evidence.mjs",
  );
  assertIncludes(
    "trigger evidence gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-trigger-evidence",
  );
}

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE TRIGGER EVIDENCE] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE TRIGGER EVIDENCE] PASS");
