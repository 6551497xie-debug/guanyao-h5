import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const endpointPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts");
const resolverPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts");
const consumptionPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationResultConsumption.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_DECLARATION_ENDPOINT_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempEndpointModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-authority-declaration-endpoint-${process.pid}.mjs`);

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
  ["authority declaration endpoint", endpointPath],
  ["authority declaration resolver", resolverPath],
  ["authority declaration consumption", consumptionPath],
  ["stage source", stageSourcePath],
  ["foundation type", foundationPath],
  ["authority declaration endpoint protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const endpointSource = fs.readFileSync(endpointPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "type LifeJourneyStageAuthorityDeclarationResolverInput",
    "type LifeJourneyStageAuthorityDeclarationConsumption",
    'export type { LifeJourneyStageAuthorityDeclarationConsumption } from "./lifeJourneyStageAuthorityDeclarationResultConsumption"',
    "export type LifeJourneyStageAuthorityDeclarationEndpointInput =",
    "LifeJourneyStageAuthorityDeclarationResolverInput",
    "export function resolveLifeJourneyStageAuthorityDeclarationConsumption",
    "input: LifeJourneyStageAuthorityDeclarationEndpointInput",
    "): LifeJourneyStageAuthorityDeclarationConsumption",
    "consumeLifeJourneyStageAuthorityDeclarationResult(",
    "resolveLifeJourneyStageAuthorityDeclaration(input)",
  ].forEach((marker) => assertIncludes("authority declaration endpoint contract", endpointSource, marker));

  [
    "if (",
    "switch (",
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
  ].forEach((marker) => assertExcludes("authority declaration endpoint stays composition-only", endpointSource, marker));

  assertExcludes("P15 source does not consume declaration endpoint", stageSource, "resolveLifeJourneyStageAuthorityDeclarationConsumption");
  assertExcludes("foundation does not consume declaration endpoint", foundationSource, "resolveLifeJourneyStageAuthorityDeclarationConsumption");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const endpointCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageAuthorityDeclarationConsumption"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority declaration endpoint has no downstream consumer",
    endpointCallSites.join(","),
    "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts",
  );

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
    ].sort().join(","),
  );

  const consumptionCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeLifeJourneyStageAuthorityDeclarationResult("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority declaration consumption is only called by endpoint",
    consumptionCallSites.join(","),
    [
      "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts",
      "src/services/lifeJourneyStageAuthorityDeclarationResultConsumption.ts",
    ].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-DECLARATION-ENDPOINT-P36",
    "AUTHORITY DECLARATION ENDPOINT COMPOSITION",
    "P34 Authority Declaration Resolver",
    "P35 Declaration Result Consumption",
    "P36 只负责组合调用",
    "READY          → AVAILABLE / DECLARED",
    "NOT_APPLICABLE → NOT_APPLICABLE / REVIEW_REJECTED",
    "P34 Resolver 只由 P36 Endpoint 调用",
    "P35 Result Consumption 只由 P36 Endpoint 调用",
    "P36 Endpoint 当前没有下游业务消费者",
    "不表示 Journey Stage 已推进",
    "修改 P0–P35 的语义类型和结果规则",
  ].forEach((marker) => assertIncludes("authority declaration endpoint protocol", protocolSource, marker));

  assertIncludes(
    "authority declaration endpoint gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority-declaration-endpoint"] ?? "",
    "node scripts/check-life-journey-stage-authority-declaration-endpoint.mjs",
  );
  assertIncludes(
    "authority declaration endpoint gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority-declaration-endpoint",
  );

  await build({
    entryPoints: [endpointPath],
    outfile: tempEndpointModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveLifeJourneyStageAuthorityDeclarationConsumption } = await import(
    `file://${tempEndpointModulePath}?t=${Date.now()}`
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
      sourceReference: "formal-source:choice-declaration-endpoint",
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

  const validInput = Object.freeze({ commandInput, authority });
  const validSnapshot = JSON.stringify(validInput);
  const available = resolveLifeJourneyStageAuthorityDeclarationConsumption(validInput);
  assertEqual("endpoint valid declaration is available", available.status, "AVAILABLE");
  assertEqual("endpoint valid disposition", available.disposition, "DECLARED");
  assertEqual("endpoint declaration stage", available.declaration.lifeJourneyStage, "CHOICE");
  assertEqual("endpoint declaration authority", available.declaration.authority, authority);
  assertEqual("endpoint preserves command reference", available.command === available.result.command, true);
  assertEqual("endpoint output is not a stage source", available.notStageSourceInput, true);
  assertEqual("endpoint does not advance stage", available.noStageTransition, true);
  assertEqual("endpoint available result is frozen", Object.isFrozen(available), true);
  assertEqual("endpoint does not mutate valid input", JSON.stringify(validInput), validSnapshot);

  const rejectedReadinessInput = Object.freeze({
    candidate,
    reviewer: authority,
    decision: "REJECT",
    rejectionReason: "TRIGGER_SEMANTIC_MISMATCH",
  });
  const rejectedInput = Object.freeze({
    commandInput: Object.freeze({ readinessInput: rejectedReadinessInput, subject: "life_subject", decision: "DECLARE" }),
    authority,
  });
  const rejectedSnapshot = JSON.stringify(rejectedInput);
  const notApplicable = resolveLifeJourneyStageAuthorityDeclarationConsumption(rejectedInput);
  assertEqual("endpoint rejected review stays not applicable", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("endpoint rejected disposition", notApplicable.disposition, "REVIEW_REJECTED");
  assertEqual("endpoint rejected result is not a system error", notApplicable.notSystemError, true);
  assertEqual("endpoint preserves rejection reason", notApplicable.rejectionReason, "TRIGGER_SEMANTIC_MISMATCH");
  assertEqual("endpoint not applicable result is frozen", Object.isFrozen(notApplicable), true);
  assertEqual("endpoint does not mutate rejected input", JSON.stringify(rejectedInput), rejectedSnapshot);

  const missingAuthorityInput = Object.freeze({ commandInput, authority: null });
  const missingAuthoritySnapshot = JSON.stringify(missingAuthorityInput);
  const unavailable = resolveLifeJourneyStageAuthorityDeclarationConsumption(missingAuthorityInput);
  assertEqual("endpoint missing authority is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("endpoint missing authority reason", unavailable.reason, "DECLARATION_AUTHORITY_REQUIRED");
  assertEqual("endpoint preserves resolver input", unavailable.input === missingAuthorityInput, true);
  assertEqual("endpoint unavailable output is not a stage source", unavailable.notStageSourceInput, true);
  assertEqual("endpoint unavailable result is frozen", Object.isFrozen(unavailable), true);
  assertEqual("endpoint does not mutate unavailable input", JSON.stringify(missingAuthorityInput), missingAuthoritySnapshot);
}

fs.rmSync(tempEndpointModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION ENDPOINT] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[LIFE JOURNEY STAGE AUTHORITY DECLARATION ENDPOINT] PASS");
