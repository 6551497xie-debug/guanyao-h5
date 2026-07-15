import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const commandPath = path.join(rootDir, "src/services/lifeJourneyStageExplicitDeclarationCommand.ts");
const readinessPath = path.join(rootDir, "src/services/lifeJourneyStageExplicitAuthorityReadiness.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_EXPLICIT_DECLARATION_COMMAND_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-explicit-declaration-command-${process.pid}.mjs`);

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
  ["explicit declaration command", commandPath],
  ["explicit authority readiness", readinessPath],
  ["stage authority type", authorityTypePath],
  ["stage source", stageSourcePath],
  ["foundation type", foundationPath],
  ["explicit declaration command protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const commandSource = fs.readFileSync(commandPath, "utf8");
  const readinessSource = fs.readFileSync(readinessPath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'export type LifeJourneyStageDeclarationSubject = "life_subject"',
    'export type LifeJourneyStageExplicitDeclarationDecision = "DECLARE"',
    "export type LifeJourneyStageExplicitDeclarationCommandInput",
    "readinessInput: LifeJourneyStageExplicitAuthorityReadinessInput",
    "subject: LifeJourneyStageDeclarationSubject | null",
    "decision: LifeJourneyStageExplicitDeclarationDecision | null",
    "export type LifeJourneyStageExplicitDeclarationCommand =",
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION_COMMAND"',
    'declarationIntent: "DECLARE_CURRENT_LIFE_JOURNEY_STAGE"',
    "targetStage: LifeJourneyStageExplicitAuthorityReady",
    "readiness: LifeJourneyStageExplicitAuthorityReady",
    "authorityEvidenceInput: LifeJourneyStageExplicitAuthorityReady",
    "evidenceReview: LifeJourneyStageExplicitAuthorityReady",
    "subjectConfirmed: true",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
    "noAutomaticProgression: true",
    "noRuntimeInference: true",
    "export type LifeJourneyStageExplicitDeclarationCommandResult",
    "export function resolveLifeJourneyStageExplicitDeclarationCommand",
    "const readiness = resolveLifeJourneyStageExplicitAuthorityReadiness(input.readinessInput)",
    'if (readiness.status === "NOT_READY")',
    'if (readiness.status === "NOT_APPLICABLE")',
    'if (input.subject !== "life_subject")',
    'reason: "LIFE_SUBJECT_REQUIRED"',
    'if (input.decision !== "DECLARE")',
    'reason: "EXPLICIT_DECLARE_DECISION_REQUIRED"',
    "targetStage: readiness.authorityEvidenceInput.proposedStage",
    "readiness,",
    "authorityEvidenceInput: readiness.authorityEvidenceInput",
    "evidenceReview: readiness.authorityEvidenceInput.review",
  ].forEach((marker) => assertIncludes("explicit declaration command contract", commandSource, marker));

  [
    "LifeJourneyStageAuthorityDeclaration",
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION"',
    'sourceBoundary: "upper_schema"',
    "lifeJourneyStage:",
    "LifeJourneyStageSourceInput",
    "resolveLifeJourneyStageSource(",
    "OriginalSelfState",
    "StarBeast",
    "Growth",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("explicit declaration command stays intent-only", commandSource, marker));

  assertIncludes("P32 keeps explicit readiness marker", readinessSource, 'readiness: "READY_FOR_EXPLICIT_AUTHORITY_DECLARATION"');
  assertIncludes("P21 declaration remains explicit authority output", authorityTypeSource, 'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION"');
  assertExcludes("P15 source does not consume declaration command", stageSource, "LifeJourneyStageExplicitDeclarationCommand");
  assertExcludes("foundation does not consume declaration command", foundationSource, "LifeJourneyStageExplicitDeclarationCommand");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const commandCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageExplicitDeclarationCommand("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "explicit declaration command has no downstream consumer",
    commandCallSites.join(","),
    "src/services/lifeJourneyStageExplicitDeclarationCommand.ts",
  );

  const readinessCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageExplicitAuthorityReadiness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "explicit authority readiness is only consumed by declaration command",
    readinessCallSites.join(","),
    [
      "src/services/lifeJourneyStageExplicitAuthorityReadiness.ts",
      "src/services/lifeJourneyStageExplicitDeclarationCommand.ts",
    ]
      .sort()
      .join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-EXPLICIT-DECLARATION-COMMAND-P33",
    "LIFE SUBJECT EXPLICIT DECLARATION COMMAND",
    "生命阶段不能被系统自动宣布，必须由主体确认",
    "P32 READY_FOR_EXPLICIT_AUTHORITY_DECLARATION",
    "+ explicit DECLARE decision",
    "Command 只记录声明意愿、声明对象与原始证据引用",
    "LIFE_SUBJECT_REQUIRED",
    "EXPLICIT_DECLARE_DECISION_REQUIRED",
    "P32 READY 本身不等于主体确认",
    "P32 NOT_APPLICABLE",
    "P32 NOT_READY",
    "P32 Readiness 只由 P33 Command 直接调用",
    "P33 Command 当前没有下游业务消费者",
  ].forEach((marker) => assertIncludes("explicit declaration command protocol", protocolSource, marker));

  assertIncludes(
    "explicit declaration command gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-explicit-declaration-command"] ?? "",
    "node scripts/check-life-journey-stage-explicit-declaration-command.mjs",
  );
  assertIncludes(
    "explicit declaration command gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-explicit-declaration-command",
  );

  await build({ entryPoints: [commandPath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveLifeJourneyStageExplicitDeclarationCommand } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({ trigger: "LIFE_DIRECTION_CHOICE_COMPLETED", semanticStage: "CHOICE", semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE", explicit: true, requiresAuthorityDeclaration: true, noTransitionDecision: true, noAutomaticProgression: true });
  const candidate = Object.freeze({ evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:choice-explicit-command" }), trigger, semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE", immutable: true, traceable: true, requiresAuthorityReview: true, notStageDeclaration: true, notAuthorityDecision: true, noAutomaticProgression: true });
  const reviewer = "original_self_life_journey_orchestrator";
  const acceptedReadinessInput = Object.freeze({ candidate, reviewer, decision: "ACCEPT" });

  const declaredInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const declaredSnapshot = JSON.stringify(declaredInput);
  const available = resolveLifeJourneyStageExplicitDeclarationCommand(declaredInput);
  assertEqual("ready explicit declare produces command", available.status, "AVAILABLE");
  assertEqual("command belongs to life subject", available.command.subject, "life_subject");
  assertEqual("command decision is explicit declare", available.command.decision, "DECLARE");
  assertEqual("command target comes from accepted evidence", available.command.targetStage, "CHOICE");
  assertEqual("command preserves readiness reference", available.command.readiness === available.readiness, true);
  assertEqual("command preserves authority input reference", available.command.authorityEvidenceInput === available.readiness.authorityEvidenceInput, true);
  assertEqual("command preserves accepted review reference", available.command.evidenceReview === available.readiness.authorityEvidenceInput.review, true);
  assertEqual("command remains non-declaration", available.command.notAuthorityDeclaration, true);
  assertEqual("command is frozen", Object.isFrozen(available.command), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("command resolution does not mutate input", JSON.stringify(declaredInput), declaredSnapshot);

  const noDecisionInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: null });
  const noDecision = resolveLifeJourneyStageExplicitDeclarationCommand(noDecisionInput);
  assertEqual("ready without declare produces no command", noDecision.status, "NOT_READY");
  assertEqual("missing declare reason", noDecision.reason, "EXPLICIT_DECLARE_DECISION_REQUIRED");
  assertEqual("missing declare has no command", "command" in noDecision, false);

  const noSubjectInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: null, decision: "DECLARE" });
  const noSubject = resolveLifeJourneyStageExplicitDeclarationCommand(noSubjectInput);
  assertEqual("ready without subject produces no command", noSubject.status, "NOT_READY");
  assertEqual("missing subject reason", noSubject.reason, "LIFE_SUBJECT_REQUIRED");
  assertEqual("missing subject has no command", "command" in noSubject, false);

  const rejectedReadinessInput = Object.freeze({ candidate, reviewer, decision: "REJECT", rejectionReason: "TRIGGER_SEMANTIC_MISMATCH" });
  const rejectedInput = Object.freeze({ readinessInput: rejectedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const notApplicable = resolveLifeJourneyStageExplicitDeclarationCommand(rejectedInput);
  assertEqual("not applicable readiness produces no command", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("not applicable preserves rejection reason", notApplicable.rejectionReason, "TRIGGER_SEMANTIC_MISMATCH");
  assertEqual("not applicable has no command", "command" in notApplicable, false);

  const invalidReadinessInput = Object.freeze({ candidate, reviewer, decision: "REJECT" });
  const invalidInput = Object.freeze({ readinessInput: invalidReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const notReady = resolveLifeJourneyStageExplicitDeclarationCommand(invalidInput);
  assertEqual("unavailable readiness produces no command", notReady.status, "NOT_READY");
  assertEqual("unavailable reason is preserved", notReady.reason, "REJECTION_REASON_MISSING");
  assertEqual("unavailable has no command", "command" in notReady, false);
}

fs.rmSync(tempModulePath, { force: true });
if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EXPLICIT DECLARATION COMMAND] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[LIFE JOURNEY STAGE EXPLICIT DECLARATION COMMAND] PASS");
