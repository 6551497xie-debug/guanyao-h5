import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const consumptionPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationResultConsumption.ts");
const resolverPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_DECLARATION_CONSUMPTION_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempConsumptionModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-authority-declaration-consumption-${process.pid}.mjs`);
const tempResolverModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-authority-declaration-consumption-resolver-${process.pid}.mjs`);

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
  ["authority declaration consumption", consumptionPath],
  ["authority declaration resolver", resolverPath],
  ["stage source", stageSourcePath],
  ["foundation type", foundationPath],
  ["authority declaration consumption protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const consumptionSource = fs.readFileSync(consumptionPath, "utf8");
  const resolverSource = fs.readFileSync(resolverPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageAuthorityDeclarationAvailable",
    'status: "AVAILABLE"',
    'source: "life_journey_stage_authority_declaration_consumption"',
    'declaration: LifeJourneyStageAuthorityDeclarationResolverReady["declaration"]',
    'command: LifeJourneyStageAuthorityDeclarationResolverReady["command"]',
    'disposition: "DECLARED"',
    "export type LifeJourneyStageAuthorityDeclarationNotApplicable",
    'status: "NOT_APPLICABLE"',
    'disposition: "REVIEW_REJECTED"',
    "reviewCompleted: true",
    "notSystemError: true",
    "export type LifeJourneyStageAuthorityDeclarationUnavailable",
    'status: "UNAVAILABLE"',
    'input: LifeJourneyStageAuthorityDeclarationResolverNotReady["input"]',
    "export type LifeJourneyStageAuthorityDeclarationConsumption",
    "export function consumeLifeJourneyStageAuthorityDeclarationResult",
    'if (result.status === "READY")',
    'if (result.status === "NOT_APPLICABLE")',
    "declaration: result.declaration",
    "command: result.command",
    "rejectionReason: result.rejectionReason",
    "reason: result.reason",
    "input: result.input",
    "notStageSourceInput: true",
    "noStageTransition: true",
    "noAutomaticProgression: true",
  ].forEach((marker) => assertIncludes("authority declaration consumption contract", consumptionSource, marker));

  [
    "resolveLifeJourneyStageAuthorityDeclaration(",
    "resolveLifeJourneyStageExplicitDeclarationCommand(",
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
  ].forEach((marker) => assertExcludes("authority declaration consumption stays result-only", consumptionSource, marker));

  assertIncludes("P34 resolver result remains explicit", resolverSource, "export type LifeJourneyStageAuthorityDeclarationResolverResult");
  assertExcludes("P15 source does not consume declaration result", stageSource, "consumeLifeJourneyStageAuthorityDeclarationResult");
  assertExcludes("foundation does not consume declaration result", foundationSource, "consumeLifeJourneyStageAuthorityDeclarationResult");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const consumptionCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeLifeJourneyStageAuthorityDeclarationResult("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority declaration consumption has no downstream consumer",
    consumptionCallSites.join(","),
    "src/services/lifeJourneyStageAuthorityDeclarationResultConsumption.ts",
  );

  const resolverCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageAuthorityDeclaration("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P35 does not call the authority declaration resolver",
    resolverCallSites.join(","),
    "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts",
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-CONSUMPTION-P35",
    "AUTHORITY DECLARATION RESULT CONSUMPTION",
    "P34 READY          → P35 AVAILABLE / DECLARED",
    "P34 NOT_APPLICABLE → P35 NOT_APPLICABLE / REVIEW_REJECTED",
    "P34 NOT_READY      → P35 UNAVAILABLE",
    "不是系统错误",
    "不重新执行 Resolver",
    "不生成 Stage Source，不推进 Journey Stage",
    "P35 Consumption 是 P34 Resolver Result 的唯一正式消费边界",
    "P35 当前没有下游业务消费者",
    "不修改 P0–P34 Foundation 与 Life Schema 链路",
  ].forEach((marker) => assertIncludes("authority declaration consumption protocol", protocolSource, marker));

  assertIncludes(
    "authority declaration consumption gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority-declaration-consumption"] ?? "",
    "node scripts/check-life-journey-stage-authority-declaration-consumption.mjs",
  );
  assertIncludes(
    "authority declaration consumption gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority-declaration-consumption",
  );

  await Promise.all([
    build({ entryPoints: [consumptionPath], outfile: tempConsumptionModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [resolverPath], outfile: tempResolverModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
  ]);

  const { consumeLifeJourneyStageAuthorityDeclarationResult } = await import(`file://${tempConsumptionModulePath}?t=${Date.now()}`);
  const { resolveLifeJourneyStageAuthorityDeclaration } = await import(`file://${tempResolverModulePath}?t=${Date.now()}`);

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
      sourceReference: "formal-source:choice-declaration-consumption",
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
  const authority = "original_self_life_journey_orchestrator";
  const acceptedReadinessInput = Object.freeze({ candidate, reviewer: authority, decision: "ACCEPT" });
  const commandInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: "DECLARE" });

  const readyResult = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput, authority }));
  const readySnapshot = JSON.stringify(readyResult);
  const available = consumeLifeJourneyStageAuthorityDeclarationResult(readyResult);
  assertEqual("ready declaration is available", available.status, "AVAILABLE");
  assertEqual("available declaration is declared", available.disposition, "DECLARED");
  assertEqual("available preserves resolver result", available.result === readyResult, true);
  assertEqual("available preserves declaration reference", available.declaration === readyResult.declaration, true);
  assertEqual("available preserves command reference", available.command === readyResult.command, true);
  assertEqual("available is not a stage source", available.notStageSourceInput, true);
  assertEqual("available does not advance stage", available.noStageTransition, true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("ready resolver result is not mutated", JSON.stringify(readyResult), readySnapshot);

  const rejectedReadinessInput = Object.freeze({
    candidate,
    reviewer: authority,
    decision: "REJECT",
    rejectionReason: "AUTHORITY_CONTEXT_INSUFFICIENT",
  });
  const rejectedCommandInput = Object.freeze({ readinessInput: rejectedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const notApplicableResult = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput: rejectedCommandInput, authority }));
  const notApplicableSnapshot = JSON.stringify(notApplicableResult);
  const notApplicable = consumeLifeJourneyStageAuthorityDeclarationResult(notApplicableResult);
  assertEqual("rejected review stays not applicable", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("rejected review disposition", notApplicable.disposition, "REVIEW_REJECTED");
  assertEqual("rejected review is completed", notApplicable.reviewCompleted, true);
  assertEqual("rejected review is not a system error", notApplicable.notSystemError, true);
  assertEqual("rejection reason is preserved", notApplicable.rejectionReason, "AUTHORITY_CONTEXT_INSUFFICIENT");
  assertEqual("not applicable preserves resolver result", notApplicable.result === notApplicableResult, true);
  assertEqual("not applicable is frozen", Object.isFrozen(notApplicable), true);
  assertEqual("not applicable result is not mutated", JSON.stringify(notApplicableResult), notApplicableSnapshot);

  const notReadyResult = resolveLifeJourneyStageAuthorityDeclaration(Object.freeze({ commandInput, authority: null }));
  const notReadySnapshot = JSON.stringify(notReadyResult);
  const unavailable = consumeLifeJourneyStageAuthorityDeclarationResult(notReadyResult);
  assertEqual("not ready declaration is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable reason is preserved", unavailable.reason, "DECLARATION_AUTHORITY_REQUIRED");
  assertEqual("unavailable preserves resolver result", unavailable.result === notReadyResult, true);
  assertEqual("unavailable preserves input reference", unavailable.input === notReadyResult.input, true);
  assertEqual("unavailable is not a stage source", unavailable.notStageSourceInput, true);
  assertEqual("unavailable does not advance stage", unavailable.noStageTransition, true);
  assertEqual("unavailable is frozen", Object.isFrozen(unavailable), true);
  assertEqual("not ready resolver result is not mutated", JSON.stringify(notReadyResult), notReadySnapshot);
}

fs.rmSync(tempConsumptionModulePath, { force: true });
fs.rmSync(tempResolverModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION CONSUMPTION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION CONSUMPTION] PASS");
