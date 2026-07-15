import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const readinessPath = path.join(rootDir, "src/services/lifeJourneyStageExplicitAuthorityReadiness.ts");
const adapterPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_DECLARATION_READINESS_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-authority-declaration-readiness-${process.pid}.mjs`);

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
  ["explicit authority readiness", readinessPath],
  ["authority evidence input adapter", adapterPath],
  ["stage authority type", authorityTypePath],
  ["stage source", stageSourcePath],
  ["authority declaration readiness protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const readinessSource = fs.readFileSync(readinessPath, "utf8");
  const adapterSource = fs.readFileSync(adapterPath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageExplicitAuthorityReadinessInput =",
    "LifeJourneyStageAuthorityEvidenceInputAdapterInput",
    "export type LifeJourneyStageExplicitAuthorityReady",
    'status: "READY"',
    'readiness: "READY_FOR_EXPLICIT_AUTHORITY_DECLARATION"',
    "export type LifeJourneyStageExplicitAuthorityNotApplicable",
    'status: "NOT_APPLICABLE"',
    'readiness: "NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION"',
    "reviewCompleted: true",
    "notSystemError: true",
    "export type LifeJourneyStageExplicitAuthorityNotReady",
    'status: "NOT_READY"',
    "export type LifeJourneyStageExplicitAuthorityReadiness =",
    "export function resolveLifeJourneyStageExplicitAuthorityReadiness",
    "const adapterResult = adaptLifeJourneyStageAuthorityEvidenceInput(input)",
    'if (adapterResult.status === "UNAVAILABLE")',
    'if (adapterResult.status === "NOT_APPLICABLE")',
    "authorityEvidenceInput: adapterResult.authorityEvidenceInput",
    "explicitDeclarationRequired: true",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
    "noAutomaticProgression: true",
  ].forEach((marker) => assertIncludes("explicit authority readiness contract", readinessSource, marker));

  [
    "LifeJourneyStageAuthorityDeclaration",
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION"',
    'sourceBoundary: "upper_schema"',
    "lifeJourneyStage:",
    "resolveLifeJourneyStageSource(",
    "resolveLifeJourneyStageEvidenceReviewReadiness(",
    "resolveLifeJourneyStageEvidenceReviewConsumption(",
    "resolveLifeJourneyStageEvidenceReview(",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "Gravity",
    "Dynamics",
    "CrystalState",
  ].forEach((marker) => assertExcludes("explicit authority readiness stays readiness-only", readinessSource, marker));

  assertIncludes("P31 adapter remains evidence-input projection", adapterSource, 'status: "AVAILABLE"');
  assertIncludes("P21 declaration remains explicit", authorityTypeSource, 'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION"');
  assertExcludes("P15 source does not consume explicit authority readiness", stageSource, "resolveLifeJourneyStageExplicitAuthorityReadiness");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const readinessCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageExplicitAuthorityReadiness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "explicit authority readiness has no downstream consumer",
    readinessCallSites.join(","),
    "src/services/lifeJourneyStageExplicitAuthorityReadiness.ts",
  );

  const adapterCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("adaptLifeJourneyStageAuthorityEvidenceInput("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority evidence input adapter is only consumed by explicit authority readiness",
    adapterCallSites.join(","),
    [
      "src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts",
      "src/services/lifeJourneyStageExplicitAuthorityReadiness.ts",
    ]
      .sort()
      .join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-READINESS-P32",
    "EXPLICIT AUTHORITY DECLARATION READINESS",
    "显式权威声明的前置就绪边界",
    "READY / READY_FOR_EXPLICIT_AUTHORITY_DECLARATION",
    "NOT_APPLICABLE / NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION",
    "它不是系统错误",
    "P31 UNAVAILABLE 必须形成 NOT_READY",
    "不生成 Authority Declaration，也不生成 Stage Source",
    "P31 Adapter 只由 P32 Explicit Authority Readiness 调用",
    "P32 Readiness 当前没有下游业务消费者",
  ].forEach((marker) => assertIncludes("authority declaration readiness protocol", protocolSource, marker));

  assertIncludes(
    "authority declaration readiness gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority-declaration-readiness"] ?? "",
    "node scripts/check-life-journey-stage-authority-declaration-readiness.mjs",
  );
  assertIncludes(
    "authority declaration readiness gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority-declaration-readiness",
  );

  await build({
    entryPoints: [readinessPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolveLifeJourneyStageExplicitAuthorityReadiness } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({ trigger: "LIFE_DIRECTION_CHOICE_COMPLETED", semanticStage: "CHOICE", semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE", explicit: true, requiresAuthorityDeclaration: true, noTransitionDecision: true, noAutomaticProgression: true });
  const candidate = Object.freeze({ evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:choice-authority-readiness" }), trigger, semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE", immutable: true, traceable: true, requiresAuthorityReview: true, notStageDeclaration: true, notAuthorityDecision: true, noAutomaticProgression: true });
  const reviewer = "original_self_life_journey_orchestrator";

  const acceptedInput = Object.freeze({ candidate, reviewer, decision: "ACCEPT" });
  const acceptedSnapshot = JSON.stringify(acceptedInput);
  const ready = resolveLifeJourneyStageExplicitAuthorityReadiness(acceptedInput);
  assertEqual("accepted evidence is ready for explicit authority", ready.status, "READY");
  assertEqual("accepted authority readiness marker", ready.readiness, "READY_FOR_EXPLICIT_AUTHORITY_DECLARATION");
  assertEqual("ready preserves adapter authority input reference", ready.authorityEvidenceInput === ready.adapterResult.authorityEvidenceInput, true);
  assertEqual("ready still requires explicit declaration", ready.explicitDeclarationRequired, true);
  assertEqual("ready is not authority declaration", ready.notAuthorityDeclaration, true);
  assertEqual("ready result is frozen", Object.isFrozen(ready), true);
  assertEqual("ready resolution does not mutate input", JSON.stringify(acceptedInput), acceptedSnapshot);

  const rejectedInput = Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason: "AUTHORITY_CONTEXT_INSUFFICIENT" });
  const rejectedSnapshot = JSON.stringify(rejectedInput);
  const notApplicable = resolveLifeJourneyStageExplicitAuthorityReadiness(rejectedInput);
  assertEqual("rejected evidence is not applicable", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("rejected readiness marker", notApplicable.readiness, "NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION");
  assertEqual("rejected evidence remains completed review", notApplicable.reviewCompleted, true);
  assertEqual("rejected evidence is not system error", notApplicable.notSystemError, true);
  assertEqual("rejected reason is preserved", notApplicable.rejectionReason, "AUTHORITY_CONTEXT_INSUFFICIENT");
  assertEqual("rejected review reference is preserved", notApplicable.review === notApplicable.adapterResult.review, true);
  assertEqual("not applicable result is frozen", Object.isFrozen(notApplicable), true);
  assertEqual("not applicable resolution does not mutate input", JSON.stringify(rejectedInput), rejectedSnapshot);

  const invalidInput = Object.freeze({ candidate, reviewer, decision: "REJECT" });
  const invalidSnapshot = JSON.stringify(invalidInput);
  const notReady = resolveLifeJourneyStageExplicitAuthorityReadiness(invalidInput);
  assertEqual("unavailable evidence is not ready", notReady.status, "NOT_READY");
  assertEqual("unavailable reason is preserved", notReady.reason, "REJECTION_REASON_MISSING");
  assertEqual("unavailable input reference is preserved", notReady.input === invalidInput, true);
  assertEqual("unavailable adapter result is preserved", notReady.adapterResult.input === invalidInput, true);
  assertEqual("not ready result is frozen", Object.isFrozen(notReady), true);
  assertEqual("not ready resolution does not mutate input", JSON.stringify(invalidInput), invalidSnapshot);
}

fs.rmSync(tempModulePath, { force: true });
if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION READINESS] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION READINESS] PASS");
