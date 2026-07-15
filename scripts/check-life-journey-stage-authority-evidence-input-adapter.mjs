import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts");
const readinessPath = path.join(rootDir, "src/services/lifeJourneyStageEvidenceReviewReadiness.ts");
const inputTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthorityEvidenceInput.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_EVIDENCE_INPUT_ADAPTER_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempAdapterModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-authority-evidence-input-adapter-${process.pid}.mjs`);

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
  ["authority evidence input adapter", adapterPath],
  ["review readiness", readinessPath],
  ["authority evidence input type", inputTypePath],
  ["stage source", stageSourcePath],
  ["authority evidence input adapter protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const adapterSource = fs.readFileSync(adapterPath, "utf8");
  const readinessSource = fs.readFileSync(readinessPath, "utf8");
  const inputTypeSource = fs.readFileSync(inputTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageAuthorityEvidenceInputAdapterInput =",
    "LifeJourneyStageEvidenceReviewReadinessInput",
    "export type LifeJourneyStageAuthorityEvidenceInputAvailable",
    'status: "AVAILABLE"',
    "export type LifeJourneyStageAuthorityEvidenceInputNotApplicable",
    'status: "NOT_APPLICABLE"',
    'reason: "REVIEW_REJECTED"',
    "export type LifeJourneyStageAuthorityEvidenceInputUnavailable",
    'status: "UNAVAILABLE"',
    "export type LifeJourneyStageAuthorityEvidenceInputAdapterResult",
    "export function adaptLifeJourneyStageAuthorityEvidenceInput",
    "const readiness = resolveLifeJourneyStageEvidenceReviewReadiness(input)",
    'if (readiness.status !== "READY")',
    'if (review.status !== "ACCEPTED")',
    "rejectionReason: review.reason",
    "authority: review.reviewer",
    "review,",
    "proposedStage: review.candidate.trigger.semanticStage",
    "requiresExplicitAuthorityDeclaration: true",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
  ].forEach((marker) => assertIncludes("authority evidence input adapter contract", adapterSource, marker));

  [
    "resolveLifeJourneyStageEvidenceReview(",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    "resolveLifeJourneyStageEvidenceReviewConsumption(",
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "Gravity",
    "Dynamics",
    "CrystalState",
  ].forEach((marker) => assertExcludes("authority evidence input adapter stays projection-only", adapterSource, marker));

  assertIncludes("P28 readiness remains formal", readinessSource, "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME");
  assertIncludes("P30 input remains non-declaration", inputTypeSource, "notAuthorityDeclaration: true");
  assertExcludes("P15 source does not consume adapter", stageSource, "adaptLifeJourneyStageAuthorityEvidenceInput");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const adapterCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("adaptLifeJourneyStageAuthorityEvidenceInput("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual("authority evidence input adapter has no downstream consumer", adapterCallSites.join(","), "src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts");

  const readinessCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageEvidenceReviewReadiness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "review readiness is only called by authority evidence input adapter",
    readinessCallSites.join(","),
    ["src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts", "src/services/lifeJourneyStageEvidenceReviewReadiness.ts"].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-EVIDENCE-INPUT-ADAPTER-P31",
    "AUTHORITY EVIDENCE INPUT PROJECTION",
    "P29 冻结审查链的第一个正式出口",
    "READY 且原始 Review 为 ACCEPTED",
    "NOT_APPLICABLE / REVIEW_REJECTED",
    "它不是系统错误",
    "P28 NOT_READY 必须形成 UNAVAILABLE",
    "P28 Readiness 只由 P31 Adapter 直接调用",
    "P30 Authority Evidence Input 只由 P31 Adapter 构造",
    "不生成 Authority Declaration 或 Stage Source",
  ].forEach((marker) => assertIncludes("authority evidence input adapter protocol", protocolSource, marker));

  assertIncludes(
    "authority evidence input adapter gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority-evidence-input-adapter"] ?? "",
    "node scripts/check-life-journey-stage-authority-evidence-input-adapter.mjs",
  );
  assertIncludes(
    "authority evidence input adapter gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority-evidence-input-adapter",
  );

  await build({ entryPoints: [adapterPath], outfile: tempAdapterModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { adaptLifeJourneyStageAuthorityEvidenceInput } = await import(`file://${tempAdapterModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({ trigger: "LIFE_DIRECTION_CHOICE_COMPLETED", semanticStage: "CHOICE", semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE", explicit: true, requiresAuthorityDeclaration: true, noTransitionDecision: true, noAutomaticProgression: true });
  const candidate = Object.freeze({ evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:choice-authority-input" }), trigger, semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE", immutable: true, traceable: true, requiresAuthorityReview: true, notStageDeclaration: true, notAuthorityDecision: true, noAutomaticProgression: true });
  const reviewer = "original_self_life_journey_orchestrator";

  const acceptedInput = Object.freeze({ candidate, reviewer, decision: "ACCEPT" });
  const acceptedSnapshot = JSON.stringify(acceptedInput);
  const available = adaptLifeJourneyStageAuthorityEvidenceInput(acceptedInput);
  assertEqual("accepted review produces available authority input", available.status, "AVAILABLE");
  assertEqual("available preserves readiness", available.readiness.status, "READY");
  assertEqual("available preserves review reference", available.authorityEvidenceInput.review === available.readiness.consumption.review, true);
  assertEqual("available preserves authority", available.authorityEvidenceInput.authority, reviewer);
  assertEqual("available derives proposed stage", available.authorityEvidenceInput.proposedStage, "CHOICE");
  assertEqual("available input remains non-declaration", available.authorityEvidenceInput.notAuthorityDeclaration, true);
  assertEqual("available authority input is frozen", Object.isFrozen(available.authorityEvidenceInput), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("accepted adapter does not mutate input", JSON.stringify(acceptedInput), acceptedSnapshot);

  const rejectedInput = Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason: "TRIGGER_SEMANTIC_MISMATCH" });
  const rejectedSnapshot = JSON.stringify(rejectedInput);
  const notApplicable = adaptLifeJourneyStageAuthorityEvidenceInput(rejectedInput);
  assertEqual("rejected review is not applicable", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("rejected adapter reason", notApplicable.reason, "REVIEW_REJECTED");
  assertEqual("rejected reason is preserved", notApplicable.rejectionReason, "TRIGGER_SEMANTIC_MISMATCH");
  assertEqual("rejected review reference is preserved", notApplicable.review === notApplicable.readiness.consumption.review, true);
  assertEqual("not applicable result is frozen", Object.isFrozen(notApplicable), true);
  assertEqual("rejected adapter does not mutate input", JSON.stringify(rejectedInput), rejectedSnapshot);

  const invalidInput = Object.freeze({ candidate, reviewer, decision: "REJECT" });
  const invalidSnapshot = JSON.stringify(invalidInput);
  const unavailable = adaptLifeJourneyStageAuthorityEvidenceInput(invalidInput);
  assertEqual("not ready review is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable reason is preserved", unavailable.reason, "REJECTION_REASON_MISSING");
  assertEqual("unavailable input reference is preserved", unavailable.input === invalidInput, true);
  assertEqual("unavailable readiness is preserved", unavailable.readiness.input === invalidInput, true);
  assertEqual("unavailable result is frozen", Object.isFrozen(unavailable), true);
  assertEqual("unavailable adapter does not mutate input", JSON.stringify(invalidInput), invalidSnapshot);
}

fs.rmSync(tempAdapterModulePath, { force: true });
if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY EVIDENCE INPUT ADAPTER] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[LIFE JOURNEY STAGE AUTHORITY EVIDENCE INPUT ADAPTER] PASS");
