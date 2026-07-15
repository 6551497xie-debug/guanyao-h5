import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts");
const commandPath = path.join(rootDir, "src/services/lifeJourneyStageExplicitDeclarationCommand.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_DECLARATION_RESOLVER_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-authority-declaration-resolver-${process.pid}.mjs`);

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
  ["authority declaration resolver", resolverPath],
  ["explicit declaration command", commandPath],
  ["stage authority type", authorityTypePath],
  ["stage source", stageSourcePath],
  ["foundation type", foundationPath],
  ["authority declaration resolver protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const resolverSource = fs.readFileSync(resolverPath, "utf8");
  const commandSource = fs.readFileSync(commandPath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "LifeJourneyStageAuthority",
    "LifeJourneyStageAuthorityDeclaration",
    "export type LifeJourneyStageAuthorityDeclarationResolverInput",
    "commandInput: LifeJourneyStageExplicitDeclarationCommandInput",
    "authority: LifeJourneyStageAuthority | null",
    "export type LifeJourneyStageAuthorityDeclarationResolverReady",
    'status: "READY"',
    'resolution: "EXPLICIT_AUTHORITY_DECLARATION_CREATED"',
    "declaration: LifeJourneyStageAuthorityDeclaration",
    "explicitSubjectCommandRequired: true",
    "exclusiveAuthorityRequired: true",
    "notStageSourceInput: true",
    "noStageTransition: true",
    "noAutomaticProgression: true",
    "export type LifeJourneyStageAuthorityDeclarationResolverNotApplicable",
    "export type LifeJourneyStageAuthorityDeclarationResolverNotReadyReason",
    '"DECLARATION_AUTHORITY_REQUIRED"',
    '"DECLARATION_AUTHORITY_INVALID"',
    "export type LifeJourneyStageAuthorityDeclarationResolverResult",
    "export function resolveLifeJourneyStageAuthorityDeclaration",
    "const commandResult = resolveLifeJourneyStageExplicitDeclarationCommand(input.commandInput)",
    'if (commandResult.status === "NOT_READY")',
    'if (commandResult.status === "NOT_APPLICABLE")',
    "if (input.authority === null)",
    "if (input.authority !== commandResult.command.authorityEvidenceInput.authority)",
    "const declaration: LifeJourneyStageAuthorityDeclaration = Object.freeze",
    "authority: input.authority",
    'sourceBoundary: "upper_schema"',
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION"',
    "lifeJourneyStage: commandResult.command.targetStage",
    "explicit: true",
    "noRuntimeInference: true",
    "noFoundationPhaseInference: true",
    "command: commandResult.command",
  ].forEach((marker) => assertIncludes("authority declaration resolver contract", resolverSource, marker));

  [
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
    "/pages/",
    "/components/",
  ].forEach((marker) => assertExcludes("authority declaration resolver stays declaration-only", resolverSource, marker));

  assertIncludes("P33 command requires subject confirmation", commandSource, "subjectConfirmed: true");
  assertIncludes("P33 command stays explicit", commandSource, 'decision: "DECLARE"');
  assertIncludes("P21 owns declaration type", authorityTypeSource, "export type LifeJourneyStageAuthorityDeclaration");
  assertExcludes("P15 source does not consume declaration resolver", stageSource, "resolveLifeJourneyStageAuthorityDeclaration");
  assertExcludes("foundation does not consume declaration resolver", foundationSource, "resolveLifeJourneyStageAuthorityDeclaration");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const resolverCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageAuthorityDeclaration("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority declaration resolver is only called by endpoint",
    resolverCallSites.join(","),
    [
      "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts",
      "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts",
    ]
      .sort()
      .join(","),
  );

  const commandCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageExplicitDeclarationCommand("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "explicit declaration command is only consumed by authority declaration resolver",
    commandCallSites.join(","),
    [
      "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts",
      "src/services/lifeJourneyStageExplicitDeclarationCommand.ts",
    ]
      .sort()
      .join(","),
  );

  const declarationReferences = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("LifeJourneyStageAuthorityDeclaration"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P21 authority declaration is constructed by P34 and exposed through P36",
    declarationReferences.join(","),
    [
      "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts",
      "src/services/lifeJourneyStageAuthorityDeclarationResultConsumption.ts",
      "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts",
      "src/types/index.ts",
      "src/types/lifeJourneyStageAuthority.ts",
    ]
      .sort()
      .join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-RESOLVER-P34",
    "EXPLICIT AUTHORITY DECLARATION RESOLUTION",
    "P21 `LifeJourneyStageAuthorityDeclaration` 的唯一正式构造边界",
    "P33 AVAILABLE Explicit Declaration Command",
    "+ original_self_life_journey_orchestrator",
    "主体确认不能替代正式权威",
    "正式权威也不能绕过主体确认",
    "DECLARATION_AUTHORITY_REQUIRED",
    "DECLARATION_AUTHORITY_INVALID",
    "P34 READY 只表示正式阶段声明已经形成",
    "不生成 Stage Source，不推进 Journey Stage",
    "P33 Command 只由 P34 Resolver 直接调用",
    "P21 Authority Declaration 只由 P34 Resolver 构造",
    "P34 Resolver Result 只允许由 P35 Declaration Result Consumption 消费",
    "P34 Resolver 函数只由 P36 Authority Declaration Endpoint 调用",
    "P36 Endpoint 当前没有下游业务消费者",
  ].forEach((marker) => assertIncludes("authority declaration resolver protocol", protocolSource, marker));

  assertIncludes(
    "authority declaration resolver gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority-declaration-resolver"] ?? "",
    "node scripts/check-life-journey-stage-authority-declaration-resolver.mjs",
  );
  assertIncludes(
    "authority declaration resolver gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority-declaration-resolver",
  );

  await build({ entryPoints: [resolverPath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveLifeJourneyStageAuthorityDeclaration } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({ trigger: "LIFE_DIRECTION_CHOICE_COMPLETED", semanticStage: "CHOICE", semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE", explicit: true, requiresAuthorityDeclaration: true, noTransitionDecision: true, noAutomaticProgression: true });
  const candidate = Object.freeze({ evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:choice-authority-declaration" }), trigger, semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE", immutable: true, traceable: true, requiresAuthorityReview: true, notStageDeclaration: true, notAuthorityDecision: true, noAutomaticProgression: true });
  const authority = "original_self_life_journey_orchestrator";
  const acceptedReadinessInput = Object.freeze({ candidate, reviewer: authority, decision: "ACCEPT" });
  const commandInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: "DECLARE" });

  const validInput = Object.freeze({ commandInput, authority });
  const validSnapshot = JSON.stringify(validInput);
  const ready = resolveLifeJourneyStageAuthorityDeclaration(validInput);
  assertEqual("valid authority command creates declaration", ready.status, "READY");
  assertEqual("declaration resolution marker", ready.resolution, "EXPLICIT_AUTHORITY_DECLARATION_CREATED");
  assertEqual("declaration authority", ready.declaration.authority, authority);
  assertEqual("declaration stage comes from command", ready.declaration.lifeJourneyStage, "CHOICE");
  assertEqual("declaration is explicit", ready.declaration.explicit, true);
  assertEqual("resolver preserves command reference", ready.command === ready.commandResult.command, true);
  assertEqual("resolver marks no stage source", ready.notStageSourceInput, true);
  assertEqual("resolver marks no stage transition", ready.noStageTransition, true);
  assertEqual("declaration is frozen", Object.isFrozen(ready.declaration), true);
  assertEqual("ready result is frozen", Object.isFrozen(ready), true);
  assertEqual("resolver does not mutate valid input", JSON.stringify(validInput), validSnapshot);

  const noAuthority = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput, authority: null }));
  assertEqual("missing authority creates no declaration", noAuthority.status, "NOT_READY");
  assertEqual("missing authority reason", noAuthority.reason, "DECLARATION_AUTHORITY_REQUIRED");
  assertEqual("missing authority has no declaration", "declaration" in noAuthority, false);

  const invalidAuthority = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput, authority: "page_or_runtime" }));
  assertEqual("invalid authority creates no declaration", invalidAuthority.status, "NOT_READY");
  assertEqual("invalid authority reason", invalidAuthority.reason, "DECLARATION_AUTHORITY_INVALID");
  assertEqual("invalid authority has no declaration", "declaration" in invalidAuthority, false);

  const noDeclareCommandInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: null });
  const noDeclare = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput: noDeclareCommandInput, authority }));
  assertEqual("missing subject declare creates no declaration", noDeclare.status, "NOT_READY");
  assertEqual("missing subject declare reason", noDeclare.reason, "EXPLICIT_DECLARE_DECISION_REQUIRED");
  assertEqual("missing subject declare has no declaration", "declaration" in noDeclare, false);

  const rejectedReadinessInput = Object.freeze({ candidate, reviewer: authority, decision: "REJECT", rejectionReason: "AUTHORITY_CONTEXT_INSUFFICIENT" });
  const rejectedCommandInput = Object.freeze({ readinessInput: rejectedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const notApplicable = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput: rejectedCommandInput, authority }));
  assertEqual("rejected evidence creates no declaration", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("rejected reason is preserved", notApplicable.rejectionReason, "AUTHORITY_CONTEXT_INSUFFICIENT");
  assertEqual("rejected evidence has no declaration", "declaration" in notApplicable, false);

  const invalidReadinessInput = Object.freeze({ candidate, reviewer: authority, decision: "REJECT" });
  const invalidCommandInput = Object.freeze({ readinessInput: invalidReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const notReady = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput: invalidCommandInput, authority }));
  assertEqual("not ready evidence creates no declaration", notReady.status, "NOT_READY");
  assertEqual("not ready reason is preserved", notReady.reason, "REJECTION_REASON_MISSING");
  assertEqual("not ready evidence has no declaration", "declaration" in notReady, false);
}

fs.rmSync(tempModulePath, { force: true });
if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION RESOLVER] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION RESOLVER] PASS");
