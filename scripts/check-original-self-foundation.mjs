import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/originalSelf.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const adapterPath = path.join(rootDir, "src/services/originalSelfFoundationAdapter.ts");
const validatorPath = path.join(rootDir, "src/services/validators/originalSelfFoundationValidator.ts");
const resolverPath = path.join(rootDir, "src/services/originalSelfFoundationResolver.ts");
const sourceAdapterPath = path.join(rootDir, "src/services/originalSelfFoundationSourceAdapter.ts");
const entryPath = path.join(rootDir, "src/services/originalSelfFoundationEntry.ts");
const consumptionPath = path.join(rootDir, "src/services/originalSelfFoundationResultConsumption.ts");
const endpointPath = path.join(rootDir, "src/services/originalSelfFoundationEndpoint.ts");
const dynamicsBridgePath = path.join(rootDir, "src/services/guanyaoDynamicsOriginalSelfFoundationAdapter.ts");
const dynamicsReadinessPath = path.join(rootDir, "src/services/guanyaoDynamicsOriginalSelfFoundationReadinessAdapter.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_ORIGINAL_SELF_ARCHITECTURE_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-original-self-foundation-${process.pid}.mjs`);

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));

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

const assertOnlyAllowedSourceSites = (name, pattern, allowedPaths) => {
  const violations = typeScriptSourcePaths
    .filter((filePath) => !allowedPaths.includes(filePath))
    .filter((filePath) => pattern.test(fs.readFileSync(filePath, "utf8")))
    .map((filePath) => path.relative(rootDir, filePath));

  if (violations.length > 0) failures.push(`${name} forbidden-sites=${violations.join(",")}`);
  else console.log(`PASS | ${name} | forbidden-sites=none`);
};

for (const [name, filePath] of [
  ["original self type", typePath],
  ["type index", typeIndexPath],
  ["foundation adapter", adapterPath],
  ["foundation validator", validatorPath],
  ["foundation resolver", resolverPath],
  ["foundation source adapter", sourceAdapterPath],
  ["foundation entry", entryPath],
  ["foundation result consumption", consumptionPath],
  ["foundation endpoint", endpointPath],
  ["dynamics original self bridge", dynamicsBridgePath],
  ["dynamics original self readiness", dynamicsReadinessPath],
  ["architecture protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const adapterSource = fs.readFileSync(adapterPath, "utf8");
  const validatorSource = fs.readFileSync(validatorPath, "utf8");
  const resolverSource = fs.readFileSync(resolverPath, "utf8");
  const sourceAdapterSource = fs.readFileSync(sourceAdapterPath, "utf8");
  const entrySource = fs.readFileSync(entryPath, "utf8");
  const consumptionSource = fs.readFileSync(consumptionPath, "utf8");
  const endpointSource = fs.readFileSync(endpointPath, "utf8");
  const dynamicsBridgeSource = fs.readFileSync(dynamicsBridgePath, "utf8");
  const dynamicsReadinessSource = fs.readFileSync(dynamicsReadinessPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const sourceFile = ts.createSourceFile(typePath, typeSource, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);

  if (sourceFile.parseDiagnostics.length > 0) {
    failures.push(`original self type syntax errors=${sourceFile.parseDiagnostics.length}`);
  } else {
    console.log("PASS | original self type syntax");
  }

  [
    "export type OriginalSelfState",
    "export type OriginalSelfFoundationInput",
    "export type StarBeastState",
    "export type JourneyState",
    "export type LifeArchetypeState",
    '"ORIGINAL_SELF"',
    '"STAR_BEAST"',
    '"LIFE_ARCHETYPE"',
    '"HEXAGRAM"',
    '"YAO"',
    '"CRYSTAL"',
    'semanticRole: "ORIGINAL_SELF_LIFE_MANIFESTATION"',
    "originalSelfManifestation: true",
    "notRole: true",
    "notPet: true",
    "notPersonalityLabel: true",
    "lifeArchetype: LifeArchetypeState",
    "hexagram: CurrentHexagramProfile | null",
    "yao: YaoTransmissionProfile | null",
    "crystal: CrystalState | null",
    "noMotherCodeMutation: true",
    "noHexagramGeneration: true",
    "noCrystalEngineMutation: true",
    "noStorageWrite: true",
    "noUIContract: true",
    "noAIDependency: true",
  ].forEach((marker) => assertIncludes("foundation type contract", typeSource, marker));

  assertIncludes("foundation reuses current hexagram type", typeSource, "import type { CurrentHexagramProfile, YaoTransmissionProfile }");
  assertIncludes("foundation reuses ready starbeast types", typeSource, "StarbeastDerivationReady");
  assertIncludes("foundation reuses crystal state", typeSource, 'import type { CrystalState } from "./personaTransmission"');
  assertIncludes("type index exports original self foundation", typeIndexSource, 'from "./originalSelf"');
  assertIncludes("type index exports foundation input", typeIndexSource, "OriginalSelfFoundationInput");

  [
    "export const ORIGINAL_SELF_SEMANTIC_PATH",
    "export function adaptOriginalSelfFoundation",
    "input: OriginalSelfFoundationInput",
    "fourSymbol: input.starBeast.fourSymbol",
    "currentPhase: input.currentPhase",
    "hexagram: input.hexagram",
    "yao: input.yao",
    "crystal: input.crystal",
    "semanticRole: \"ORIGINAL_SELF_LIFE_MANIFESTATION\"",
    "nonFinalIdentity: true",
  ].forEach((marker) => assertIncludes("foundation adapter contract", adapterSource, marker));

  [
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("foundation adapter stays projection-only", adapterSource, marker));

  [
    "export type OriginalSelfFoundationValidationStatus",
    "export type OriginalSelfFoundationValidationReason",
    "export const validateOriginalSelfFoundation",
    '"FOUR_SYMBOL_MISMATCH"',
    '"LIFE_ARCHETYPE_SOURCE_MISMATCH"',
    '"SEMANTIC_PATH_INVALID"',
    '"JOURNEY_PHASE_INVALID"',
    '"JOURNEY_REFERENCE_INVALID"',
    '"STAR_BEAST_BOUNDARY_INVALID"',
    '"FOUNDATION_GUARDRAILS_INVALID"',
    '"FOUNDATION_IMMUTABILITY_INVALID"',
  ].forEach((marker) => assertIncludes("foundation validator contract", validatorSource, marker));

  [
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
  ].forEach((marker) => assertExcludes("foundation validator stays validation-only", validatorSource, marker));

  [
    "export type OriginalSelfFoundationResolverInput",
    "export type OriginalSelfFoundationResult",
    "export function resolveOriginalSelfFoundation",
    'reason: "STAR_BEAST_INVALID_DATE"',
    'reason: "STAR_BEAST_CALENDAR_UNAVAILABLE"',
    'reason: "FOUNDATION_VALIDATION_FAILED"',
    "adaptOriginalSelfFoundation({",
    "validateOriginalSelfFoundation(state)",
  ].forEach((marker) => assertIncludes("foundation resolver contract", resolverSource, marker));

  [
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("foundation resolver stays result-only", resolverSource, marker));

  [
    "export type OriginalSelfFoundationSourceInput",
    "export function adaptOriginalSelfFoundationSource",
    "starBeast: input.starBeastResult",
    "currentPhase: input.currentPhase",
    "hexagram: input.formation?.currentHexagramProfile ?? null",
    "yao: input.yao",
    "crystal: input.crystal",
  ].forEach((marker) => assertIncludes("foundation source adapter contract", sourceAdapterSource, marker));

  [
    "resolveOriginalSelfFoundation(",
    "adaptOriginalSelfFoundation(",
    "validateOriginalSelfFoundation(",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("foundation source adapter stays reference-only", sourceAdapterSource, marker));

  [
    "export type OriginalSelfFoundationEntryInput = OriginalSelfFoundationSourceInput",
    "export function resolveOriginalSelfFoundationFromSources",
    "resolveOriginalSelfFoundation(adaptOriginalSelfFoundationSource(input))",
  ].forEach((marker) => assertIncludes("foundation entry contract", entrySource, marker));

  [
    "adaptOriginalSelfFoundation(",
    "validateOriginalSelfFoundation(",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("foundation entry stays composition-only", entrySource, marker));

  [
    "export type OriginalSelfFoundationAvailable",
    "export type OriginalSelfFoundationUnavailable",
    "export type OriginalSelfFoundationConsumption",
    "export function consumeOriginalSelfFoundationResult",
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    'source: "original_self_foundation_consumption"',
    "result: OriginalSelfFoundationReady",
    "result: OriginalSelfFoundationNotReady",
    'reason: OriginalSelfFoundationNotReady["reason"]',
    "state: result.state",
    "reason: result.reason",
  ].forEach((marker) => assertIncludes("foundation result consumption contract", consumptionSource, marker));

  [
    "resolveOriginalSelfFoundationFromSources(",
    "adaptOriginalSelfFoundationSource(",
    "resolveOriginalSelfFoundation(",
    "adaptOriginalSelfFoundation(",
    "validateOriginalSelfFoundation(",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) =>
    assertExcludes("foundation result consumption stays result-only", consumptionSource, marker),
  );

  [
    'export type { OriginalSelfFoundationConsumption } from "./originalSelfFoundationResultConsumption"',
    "export type OriginalSelfFoundationEndpointInput = OriginalSelfFoundationEntryInput",
    "export function resolveOriginalSelfFoundationConsumption",
    "consumeOriginalSelfFoundationResult(resolveOriginalSelfFoundationFromSources(input))",
    "): OriginalSelfFoundationConsumption",
  ].forEach((marker) => assertIncludes("foundation endpoint contract", endpointSource, marker));

  [
    "adaptOriginalSelfFoundationSource(",
    "resolveOriginalSelfFoundation(",
    "adaptOriginalSelfFoundation(",
    "validateOriginalSelfFoundation(",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("foundation endpoint stays composition-only", endpointSource, marker));

  [
    "export type DynamicsOriginalSelfFoundationAdapterInput",
    "export function resolveDynamicsOriginalSelfFoundation",
    "starBeastResult: StarbeastDerivationResult",
    "journeyPhase: OriginalSelfJourneyPhase",
    "currentHexagramFormation: CurrentHexagramFormationResult | null",
    "yaoTransmissionProfile: YaoTransmissionProfile | null",
    "crystalState: CrystalState | null",
    "resolveOriginalSelfFoundationConsumption(",
    "starBeastResult: input.starBeastResult",
    "currentPhase: input.journeyPhase",
    "formation: input.currentHexagramFormation",
    "yao: input.yaoTransmissionProfile",
    "crystal: input.crystalState",
  ].forEach((marker) => assertIncludes("dynamics original self bridge contract", dynamicsBridgeSource, marker));

  [
    "resolveOriginalSelfFoundationFromSources(",
    "consumeOriginalSelfFoundationResult(",
    "adaptOriginalSelfFoundationSource(",
    "resolveOriginalSelfFoundation(",
    "adaptOriginalSelfFoundation(",
    "validateOriginalSelfFoundation(",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "currentCrystalEndState",
    "StarbeastFeedback",
    "fourSymbol",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("dynamics original self bridge stays formal-source-only", dynamicsBridgeSource, marker));

  [
    "export type DynamicsOriginalSelfFoundationReadinessInput",
    "export type DynamicsOriginalSelfFoundationNotReadyReason",
    "export type DynamicsOriginalSelfFoundationReadiness",
    "export function resolveDynamicsOriginalSelfFoundationReadiness",
    "starBeastResult: StarbeastDerivationResult | null",
    "journeyPhase: OriginalSelfJourneyPhase | null",
    '"STAR_BEAST_RESULT_MISSING"',
    '"JOURNEY_PHASE_MISSING"',
    '"CURRENT_HEXAGRAM_FORMATION_MISSING"',
    '"YAO_TRANSMISSION_PROFILE_MISSING"',
    '"CRYSTAL_STATE_MISSING"',
    'readiness: "READY_FOR_ORIGINAL_SELF_FOUNDATION"',
    "requiresHexagram(input.journeyPhase)",
    "requiresYao(input.journeyPhase)",
    'input.journeyPhase === "CRYSTAL"',
    "resolveDynamicsOriginalSelfFoundation(bridgeInput)",
  ].forEach((marker) => assertIncludes("dynamics original self readiness contract", dynamicsReadinessSource, marker));

  [
    "resolveOriginalSelfFoundationConsumption(",
    "resolveOriginalSelfFoundationFromSources(",
    "consumeOriginalSelfFoundationResult(",
    "resolveStarbeastFromBirthDate",
    "guanyaoStarbeastEngineService",
    "GuanyaoRuntimeEngine",
    "resolveRuntime",
    "resolveCurrentHexagram",
    "HexagramCrystalEngine",
    "currentCrystalEndState",
    "StarbeastFeedback",
    "fourSymbol",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("dynamics original self readiness stays source-only", dynamicsReadinessSource, marker));

  assertOnlyAllowedSourceSites(
    "foundation adapter has no external callers",
    /\badaptOriginalSelfFoundation\b/,
    [adapterPath, resolverPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation validator has no external callers",
    /\bvalidateOriginalSelfFoundation\b/,
    [validatorPath, resolverPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation resolver has no external callers",
    /\bresolveOriginalSelfFoundation\b/,
    [resolverPath, entryPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation source adapter has no external callers",
    /\badaptOriginalSelfFoundationSource\b/,
    [sourceAdapterPath, entryPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation result stays inside entry-consumption boundary",
    /\bOriginalSelfFoundationResult\b/,
    [resolverPath, entryPath, consumptionPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation entry is only consumed by endpoint",
    /\bresolveOriginalSelfFoundationFromSources\b/,
    [entryPath, endpointPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation result consumption is only consumed by endpoint",
    /\bconsumeOriginalSelfFoundationResult\b/,
    [consumptionPath, endpointPath],
  );
  assertOnlyAllowedSourceSites(
    "foundation endpoint is only consumed by dynamics bridge",
    /\bresolveOriginalSelfFoundationConsumption\b/,
    [endpointPath, dynamicsBridgePath],
  );
  assertOnlyAllowedSourceSites(
    "dynamics foundation bridge is only consumed by readiness",
    /\bresolveDynamicsOriginalSelfFoundation\b/,
    [dynamicsBridgePath, dynamicsReadinessPath],
  );
  assertOnlyAllowedSourceSites(
    "original self state has one construction site",
    /semanticRole:\s*"ORIGINAL_SELF",/,
    [adapterPath],
  );

  ["localStorage", "sessionStorage", "fetch(", 'from "react"', "JSX.", "HTMLElement", "CurrentHexagramProfile {", "CrystalState = Readonly"].forEach(
    (marker) => assertExcludes("foundation stays implementation-neutral", typeSource, marker),
  );

  [
    "Original Self",
    "Star Beast",
    "Life Archetype",
    "Hexagram",
    "Yao",
    "Crystal",
    "Star Beast = 本我生命显化",
    "星兽不是角色、宠物、人格标签",
    "Mother Code",
    "Gravity",
    "Crystal Engine",
    "不反向夺取它们的工程职责",
    "不得修改",
    "UI 与页面",
    "64 卦数据和映射",
    "Storage schema",
    "AI prompt",
    "视觉组件",
    "Foundation 唯一合法生成路径",
    "OriginalSelfFoundationSourceInput",
    "adaptOriginalSelfFoundationSource",
    "OriginalSelfFoundationResolverInput",
    "resolveOriginalSelfFoundation",
    "OriginalSelfFoundationResult",
    "resolveOriginalSelfFoundationFromSources",
    "任何层都不得绕过 Entry",
    "只允许继续进入 Result Consumption",
    "Foundation Result Consumption",
    "consumeOriginalSelfFoundationResult",
    "OriginalSelfFoundationConsumption",
    "AVAILABLE",
    "UNAVAILABLE",
    "原始 `OriginalSelfFoundationNotReady` Result",
    "不得被吞掉、改写或降级为无原因的 `null`",
    "Foundation Endpoint",
    "resolveOriginalSelfFoundationConsumption",
    "Endpoint 内部固定组合",
    "未来外部消费者不得分别调用 Entry 或 Result Consumption",
    "只获得 `OriginalSelfFoundationConsumption`",
    "Dynamics Original Self Bridge",
    "resolveDynamicsOriginalSelfFoundation",
    "Dynamics 正式来源",
    "持久化快照中的 `fourSymbol` 不能代替完整 `StarbeastDerivationResult`",
    "`currentCrystalEndState` 不能反向伪造 `CrystalState`",
    "缺少正式来源时，必须保持未接入",
    "P9 只建立服务层 Bridge",
    "Dynamics Original Self Readiness",
    "resolveDynamicsOriginalSelfFoundationReadiness",
    "READY_FOR_ORIGINAL_SELF_FOUNDATION",
    "Readiness 只检查正式来源是否满足当前显式 Journey 阶段",
    "未进入某一阶段时，该阶段之后的来源允许保持 `null`",
    "其业务不可用原因继续由 Foundation Endpoint 原样转换为 UNAVAILABLE",
    "P10 仍只建立服务层合同",
  ].forEach((marker) => assertIncludes("foundation protocol contract", protocolSource, marker));

  assertIncludes(
    "foundation gate command is registered",
    packageJson.scripts?.["check:original-self-foundation"] ?? "",
    "node scripts/check-original-self-foundation.mjs",
  );
  assertIncludes(
    "foundation gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-foundation",
  );

  const transpiledAdapter = ts.transpileModule(adapterSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const transpiledValidator = ts.transpileModule(validatorSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const resolverRuntimeSource = resolverSource
    .replace('import { adaptOriginalSelfFoundation } from "./originalSelfFoundationAdapter";\n', "")
    .replace(
      /import \{\s*validateOriginalSelfFoundation,\s*type OriginalSelfFoundationValidationReason,\s*\} from "\.\/validators\/originalSelfFoundationValidator";\n/,
      "",
    );
  const transpiledResolver = ts.transpileModule(resolverRuntimeSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const transpiledSourceAdapter = ts.transpileModule(sourceAdapterSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const entryRuntimeSource = entrySource
    .replace(
      /import \{\s*resolveOriginalSelfFoundation,\s*type OriginalSelfFoundationResult,\s*\} from "\.\/originalSelfFoundationResolver";\n/,
      "",
    )
    .replace(
      /import \{\s*adaptOriginalSelfFoundationSource,\s*type OriginalSelfFoundationSourceInput,\s*\} from "\.\/originalSelfFoundationSourceAdapter";\n/,
      "",
    );
  const transpiledEntry = ts.transpileModule(entryRuntimeSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const transpiledConsumption = ts.transpileModule(consumptionSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const endpointRuntimeSource = endpointSource
    .replace(
      /import \{\s*resolveOriginalSelfFoundationFromSources,\s*type OriginalSelfFoundationEntryInput,\s*\} from "\.\/originalSelfFoundationEntry";\n/,
      "",
    )
    .replace(
      /import \{\s*consumeOriginalSelfFoundationResult,\s*type OriginalSelfFoundationConsumption,\s*\} from "\.\/originalSelfFoundationResultConsumption";\n/,
      "",
    );
  const transpiledEndpoint = ts.transpileModule(endpointRuntimeSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const dynamicsBridgeRuntimeSource = dynamicsBridgeSource.replace(
    /import \{\s*resolveOriginalSelfFoundationConsumption,\s*type OriginalSelfFoundationConsumption,\s*\} from "\.\/originalSelfFoundationEndpoint";\n/,
    "",
  );
  const transpiledDynamicsBridge = ts.transpileModule(dynamicsBridgeRuntimeSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const dynamicsReadinessRuntimeSource = dynamicsReadinessSource.replace(
    /import \{\s*resolveDynamicsOriginalSelfFoundation,\s*type DynamicsOriginalSelfFoundationAdapterInput,\s*\} from "\.\/guanyaoDynamicsOriginalSelfFoundationAdapter";\n/,
    "",
  );
  const transpiledDynamicsReadiness = ts.transpileModule(dynamicsReadinessRuntimeSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  fs.writeFileSync(
    tempModulePath,
    `${transpiledAdapter.outputText}\n${transpiledValidator.outputText}\n${transpiledResolver.outputText}\n${transpiledSourceAdapter.outputText}\n${transpiledEntry.outputText}\n${transpiledConsumption.outputText}\n${transpiledEndpoint.outputText}\n${transpiledDynamicsBridge.outputText}\n${transpiledDynamicsReadiness.outputText}`,
  );

  const {
    adaptOriginalSelfFoundation,
    adaptOriginalSelfFoundationSource,
    consumeOriginalSelfFoundationResult,
    resolveOriginalSelfFoundation,
    resolveOriginalSelfFoundationConsumption,
    resolveOriginalSelfFoundationFromSources,
    resolveDynamicsOriginalSelfFoundation,
    resolveDynamicsOriginalSelfFoundationReadiness,
    validateOriginalSelfFoundation,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const hexagram = Object.freeze({ marker: "existing-hexagram" });
  const yao = Object.freeze({ marker: "existing-yao" });
  const crystal = Object.freeze({ marker: "existing-crystal" });
  const input = Object.freeze({
    starBeast: Object.freeze({
      status: "READY",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      calculationBasis: "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION",
      gregorianBirthDate: "1979-04-15",
      lunarBirthDate: Object.freeze({ relatedYear: 1979, month: 3, day: 19, isLeapMonth: false }),
      mansionIndex: 6,
      mansion: "箕",
      fourSymbol: "青龙",
      direction: "东",
      symbolicTrigram: "震",
      locationIndependent: true,
      birthTimeIndependent: true,
    }),
    currentPhase: "YAO",
    hexagram,
    yao,
    crystal,
  });
  const inputSnapshot = JSON.stringify(input);
  const state = adaptOriginalSelfFoundation(input);

  assertEqual("adapter returns original self", state.semanticRole, "ORIGINAL_SELF");
  assertEqual("adapter projects star beast manifestation", state.starBeast.semanticRole, "ORIGINAL_SELF_LIFE_MANIFESTATION");
  assertEqual("adapter preserves four symbol", state.starBeast.fourSymbol, "青龙");
  assertEqual("adapter preserves mansion", state.starBeast.mansion, "箕");
  assertEqual("adapter shares one life archetype", state.starBeast.lifeArchetype === state.journey.lifeArchetype, true);
  assertEqual("adapter keeps explicit phase", state.journey.currentPhase, "YAO");
  assertEqual("adapter keeps semantic path", state.journey.semanticPath.join(" → "), "ORIGINAL_SELF → STAR_BEAST → LIFE_ARCHETYPE → HEXAGRAM → YAO → CRYSTAL");
  assertEqual("adapter preserves hexagram reference", state.journey.hexagram === hexagram, true);
  assertEqual("adapter preserves yao reference", state.journey.yao === yao, true);
  assertEqual("adapter preserves crystal reference", state.journey.crystal === crystal, true);
  assertEqual("adapter freezes original self", Object.isFrozen(state), true);
  assertEqual("adapter freezes star beast", Object.isFrozen(state.starBeast), true);
  assertEqual("adapter freezes life archetype", Object.isFrozen(state.starBeast.lifeArchetype), true);
  assertEqual("adapter freezes journey", Object.isFrozen(state.journey), true);
  assertEqual("adapter does not mutate input", JSON.stringify(input), inputSnapshot);

  const validValidation = validateOriginalSelfFoundation(state);
  assertEqual("validator accepts adapter state", validValidation.status, "VALID_ORIGINAL_SELF_FOUNDATION");
  assertEqual("validator returns no valid-state reasons", validValidation.reasons.length, 0);

  const mismatchedFourSymbol = {
    ...state,
    starBeast: {
      ...state.starBeast,
      lifeArchetype: {
        ...state.starBeast.lifeArchetype,
        fourSymbol: "白虎",
      },
    },
  };
  assertEqual(
    "validator rejects four-symbol mismatch",
    validateOriginalSelfFoundation(mismatchedFourSymbol).reasons.includes("FOUR_SYMBOL_MISMATCH"),
    true,
  );

  const detachedLifeArchetype = {
    ...state,
    journey: {
      ...state.journey,
      lifeArchetype: { ...state.journey.lifeArchetype },
    },
  };
  assertEqual(
    "validator rejects detached life archetype",
    validateOriginalSelfFoundation(detachedLifeArchetype).reasons.includes("LIFE_ARCHETYPE_SOURCE_MISMATCH"),
    true,
  );

  const invalidPath = {
    ...state,
    journey: {
      ...state.journey,
      semanticPath: ["ORIGINAL_SELF", "STAR_BEAST", "CRYSTAL"],
    },
  };
  assertEqual(
    "validator rejects invalid semantic path",
    validateOriginalSelfFoundation(invalidPath).reasons.includes("SEMANTIC_PATH_INVALID"),
    true,
  );

  const invalidReference = {
    ...state,
    journey: {
      ...state.journey,
      hexagram: "generated-hexagram",
    },
  };
  assertEqual(
    "validator rejects invented journey reference",
    validateOriginalSelfFoundation(invalidReference).reasons.includes("JOURNEY_REFERENCE_INVALID"),
    true,
  );

  const invalidGuardrails = {
    ...state,
    guardrails: {
      ...state.guardrails,
      noStorageWrite: false,
    },
  };
  assertEqual(
    "validator rejects opened guardrail",
    validateOriginalSelfFoundation(invalidGuardrails).reasons.includes("FOUNDATION_GUARDRAILS_INVALID"),
    true,
  );

  const validationSnapshot = JSON.stringify(state);
  validateOriginalSelfFoundation(state);
  assertEqual("validator does not mutate state", JSON.stringify(state), validationSnapshot);

  const resolverInputSnapshot = JSON.stringify(input);
  const readyResult = resolveOriginalSelfFoundation(input);
  assertEqual("resolver accepts ready star beast", readyResult.status, "READY");
  assertEqual("resolver exposes original self source", readyResult.source, "original_self_foundation");
  assertEqual("resolver preserves ready hexagram reference", readyResult.state?.journey.hexagram === hexagram, true);
  assertEqual("resolver preserves ready yao reference", readyResult.state?.journey.yao === yao, true);
  assertEqual("resolver preserves ready crystal reference", readyResult.state?.journey.crystal === crystal, true);
  assertEqual("resolver freezes ready result", Object.isFrozen(readyResult), true);
  assertEqual("resolver does not mutate ready input", JSON.stringify(input), resolverInputSnapshot);

  const invalidDateResult = resolveOriginalSelfFoundation({
    ...input,
    starBeast: Object.freeze({
      status: "INVALID_DATE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "INVALID_GREGORIAN_BIRTH_DATE",
    }),
  });
  assertEqual("resolver blocks invalid date", invalidDateResult.status, "NOT_READY");
  assertEqual("resolver maps invalid date reason", invalidDateResult.reason, "STAR_BEAST_INVALID_DATE");
  assertEqual("resolver preserves invalid date reason", invalidDateResult.upstreamReason, "INVALID_GREGORIAN_BIRTH_DATE");
  assertEqual("resolver freezes invalid date result", Object.isFrozen(invalidDateResult), true);

  const unavailableResult = resolveOriginalSelfFoundation({
    ...input,
    starBeast: Object.freeze({
      status: "CALENDAR_UNAVAILABLE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "CHINESE_CALENDAR_NOT_SUPPORTED",
    }),
  });
  assertEqual("resolver blocks unavailable calendar", unavailableResult.status, "NOT_READY");
  assertEqual(
    "resolver maps unavailable calendar reason",
    unavailableResult.reason,
    "STAR_BEAST_CALENDAR_UNAVAILABLE",
  );
  assertEqual(
    "resolver preserves unavailable calendar reason",
    unavailableResult.upstreamReason,
    "CHINESE_CALENDAR_NOT_SUPPORTED",
  );

  const invalidFoundationResult = resolveOriginalSelfFoundation({
    ...input,
    starBeast: Object.freeze({
      ...input.starBeast,
      fourSymbol: "麒麟",
    }),
  });
  assertEqual("resolver blocks invalid foundation", invalidFoundationResult.status, "NOT_READY");
  assertEqual(
    "resolver maps validation failure",
    invalidFoundationResult.reason,
    "FOUNDATION_VALIDATION_FAILED",
  );
  assertEqual(
    "resolver preserves validation reasons",
    invalidFoundationResult.validationReasons?.includes("FOUR_SYMBOL_MISMATCH"),
    true,
  );
  assertEqual(
    "resolver freezes validation reasons",
    Object.isFrozen(invalidFoundationResult.validationReasons),
    true,
  );

  const formation = Object.freeze({
    source: "dynamics",
    currentHexagramProfile: hexagram,
  });
  const sourceInput = Object.freeze({
    starBeastResult: input.starBeast,
    currentPhase: "HEXAGRAM",
    formation,
    yao,
    crystal,
  });
  const sourceInputSnapshot = JSON.stringify(sourceInput);
  const resolverInput = adaptOriginalSelfFoundationSource(sourceInput);
  assertEqual("source adapter preserves star beast result", resolverInput.starBeast === input.starBeast, true);
  assertEqual("source adapter keeps explicit phase", resolverInput.currentPhase, "HEXAGRAM");
  assertEqual("source adapter extracts current hexagram reference", resolverInput.hexagram === hexagram, true);
  assertEqual("source adapter preserves yao reference", resolverInput.yao === yao, true);
  assertEqual("source adapter preserves crystal reference", resolverInput.crystal === crystal, true);
  assertEqual("source adapter freezes resolver input", Object.isFrozen(resolverInput), true);
  assertEqual("source adapter does not mutate input", JSON.stringify(sourceInput), sourceInputSnapshot);
  assertEqual(
    "source adapter output resolves without an engine call",
    resolveOriginalSelfFoundation(resolverInput).status,
    "READY",
  );

  const withoutFormation = adaptOriginalSelfFoundationSource({
    ...sourceInput,
    formation: null,
  });
  assertEqual("source adapter keeps missing formation nullable", withoutFormation.hexagram, null);

  const invalidSourceResult = adaptOriginalSelfFoundationSource({
    ...sourceInput,
    starBeastResult: Object.freeze({
      status: "INVALID_DATE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "OUTSIDE_SUPPORTED_GREGORIAN_RANGE",
    }),
  });
  assertEqual("source adapter preserves invalid star beast result", invalidSourceResult.starBeast.status, "INVALID_DATE");
  assertEqual(
    "resolver keeps source adapter invalid result not ready",
    resolveOriginalSelfFoundation(invalidSourceResult).reason,
    "STAR_BEAST_INVALID_DATE",
  );

  const entryInputSnapshot = JSON.stringify(sourceInput);
  const entryResult = resolveOriginalSelfFoundationFromSources(sourceInput);
  assertEqual("entry resolves ready sources", entryResult.status, "READY");
  assertEqual("entry returns foundation result source", entryResult.source, "original_self_foundation");
  assertEqual("entry preserves explicit journey phase", entryResult.state?.journey.currentPhase, "HEXAGRAM");
  assertEqual("entry preserves source hexagram reference", entryResult.state?.journey.hexagram === hexagram, true);
  assertEqual("entry preserves source yao reference", entryResult.state?.journey.yao === yao, true);
  assertEqual("entry preserves source crystal reference", entryResult.state?.journey.crystal === crystal, true);
  assertEqual("entry returns frozen resolver result", Object.isFrozen(entryResult), true);
  assertEqual("entry does not mutate source input", JSON.stringify(sourceInput), entryInputSnapshot);

  const invalidEntryResult = resolveOriginalSelfFoundationFromSources({
    ...sourceInput,
    starBeastResult: Object.freeze({
      status: "CALENDAR_UNAVAILABLE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "CHINESE_CALENDAR_NOT_SUPPORTED",
    }),
  });
  assertEqual("entry preserves not-ready status", invalidEntryResult.status, "NOT_READY");
  assertEqual(
    "entry preserves upstream not-ready reason",
    invalidEntryResult.reason,
    "STAR_BEAST_CALENDAR_UNAVAILABLE",
  );

  const readyConsumptionInputSnapshot = JSON.stringify(entryResult);
  const readyConsumption = consumeOriginalSelfFoundationResult(entryResult);
  assertEqual("consumption exposes ready result", readyConsumption.status, "AVAILABLE");
  assertEqual("consumption identifies its source", readyConsumption.source, "original_self_foundation_consumption");
  assertEqual("consumption preserves ready result reference", readyConsumption.result === entryResult, true);
  assertEqual("consumption preserves original self reference", readyConsumption.state === entryResult.state, true);
  assertEqual("consumption freezes available output", Object.isFrozen(readyConsumption), true);
  assertEqual("consumption does not mutate ready result", JSON.stringify(entryResult), readyConsumptionInputSnapshot);

  const invalidDateConsumption = consumeOriginalSelfFoundationResult(invalidDateResult);
  assertEqual("consumption exposes invalid date as unavailable", invalidDateConsumption.status, "UNAVAILABLE");
  assertEqual("consumption preserves invalid date result reference", invalidDateConsumption.result === invalidDateResult, true);
  assertEqual("consumption preserves invalid date reason", invalidDateConsumption.reason, "STAR_BEAST_INVALID_DATE");
  assertEqual(
    "consumption preserves invalid date upstream reason",
    invalidDateConsumption.result.upstreamReason,
    "INVALID_GREGORIAN_BIRTH_DATE",
  );

  const calendarUnavailableConsumption = consumeOriginalSelfFoundationResult(invalidEntryResult);
  assertEqual("consumption exposes calendar failure as unavailable", calendarUnavailableConsumption.status, "UNAVAILABLE");
  assertEqual(
    "consumption preserves calendar failure result reference",
    calendarUnavailableConsumption.result === invalidEntryResult,
    true,
  );
  assertEqual(
    "consumption preserves calendar failure reason",
    calendarUnavailableConsumption.reason,
    "STAR_BEAST_CALENDAR_UNAVAILABLE",
  );
  assertEqual(
    "consumption preserves calendar upstream reason",
    calendarUnavailableConsumption.result.upstreamReason,
    "CHINESE_CALENDAR_NOT_SUPPORTED",
  );

  const validationFailureConsumption = consumeOriginalSelfFoundationResult(invalidFoundationResult);
  assertEqual("consumption exposes validation failure as unavailable", validationFailureConsumption.status, "UNAVAILABLE");
  assertEqual(
    "consumption preserves validation failure result reference",
    validationFailureConsumption.result === invalidFoundationResult,
    true,
  );
  assertEqual(
    "consumption preserves validation failure reason",
    validationFailureConsumption.reason,
    "FOUNDATION_VALIDATION_FAILED",
  );
  assertEqual(
    "consumption preserves validation reasons reference",
    validationFailureConsumption.result.validationReasons === invalidFoundationResult.validationReasons,
    true,
  );
  assertEqual("consumption freezes unavailable output", Object.isFrozen(validationFailureConsumption), true);

  const endpointInputSnapshot = JSON.stringify(sourceInput);
  const endpointConsumption = resolveOriginalSelfFoundationConsumption(sourceInput);
  assertEqual("endpoint exposes available consumption", endpointConsumption.status, "AVAILABLE");
  assertEqual("endpoint exposes consumption source", endpointConsumption.source, "original_self_foundation_consumption");
  assertEqual("endpoint preserves explicit journey phase", endpointConsumption.state?.journey.currentPhase, "HEXAGRAM");
  assertEqual("endpoint preserves source hexagram reference", endpointConsumption.state?.journey.hexagram === hexagram, true);
  assertEqual("endpoint preserves source yao reference", endpointConsumption.state?.journey.yao === yao, true);
  assertEqual("endpoint preserves source crystal reference", endpointConsumption.state?.journey.crystal === crystal, true);
  assertEqual("endpoint freezes consumption", Object.isFrozen(endpointConsumption), true);
  assertEqual("endpoint does not mutate source input", JSON.stringify(sourceInput), endpointInputSnapshot);

  const unavailableEndpointConsumption = resolveOriginalSelfFoundationConsumption({
    ...sourceInput,
    starBeastResult: Object.freeze({
      status: "INVALID_DATE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "OUTSIDE_SUPPORTED_GREGORIAN_RANGE",
    }),
  });
  assertEqual("endpoint exposes unavailable consumption", unavailableEndpointConsumption.status, "UNAVAILABLE");
  assertEqual(
    "endpoint preserves unavailable reason",
    unavailableEndpointConsumption.reason,
    "STAR_BEAST_INVALID_DATE",
  );
  assertEqual(
    "endpoint preserves unavailable upstream reason",
    unavailableEndpointConsumption.result.upstreamReason,
    "OUTSIDE_SUPPORTED_GREGORIAN_RANGE",
  );

  const dynamicsBridgeInput = Object.freeze({
    starBeastResult: input.starBeast,
    journeyPhase: "YAO",
    currentHexagramFormation: formation,
    yaoTransmissionProfile: yao,
    crystalState: crystal,
  });
  const dynamicsBridgeInputSnapshot = JSON.stringify(dynamicsBridgeInput);
  const dynamicsBridgeConsumption = resolveDynamicsOriginalSelfFoundation(dynamicsBridgeInput);
  assertEqual("dynamics bridge exposes available consumption", dynamicsBridgeConsumption.status, "AVAILABLE");
  assertEqual("dynamics bridge keeps explicit journey phase", dynamicsBridgeConsumption.state?.journey.currentPhase, "YAO");
  assertEqual("dynamics bridge preserves formation hexagram reference", dynamicsBridgeConsumption.state?.journey.hexagram === hexagram, true);
  assertEqual("dynamics bridge preserves yao reference", dynamicsBridgeConsumption.state?.journey.yao === yao, true);
  assertEqual("dynamics bridge preserves crystal reference", dynamicsBridgeConsumption.state?.journey.crystal === crystal, true);
  assertEqual("dynamics bridge freezes consumption", Object.isFrozen(dynamicsBridgeConsumption), true);
  assertEqual("dynamics bridge does not mutate input", JSON.stringify(dynamicsBridgeInput), dynamicsBridgeInputSnapshot);

  const unavailableDynamicsBridgeConsumption = resolveDynamicsOriginalSelfFoundation({
    ...dynamicsBridgeInput,
    starBeastResult: Object.freeze({
      status: "CALENDAR_UNAVAILABLE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "CHINESE_CALENDAR_NOT_SUPPORTED",
    }),
  });
  assertEqual("dynamics bridge preserves unavailable status", unavailableDynamicsBridgeConsumption.status, "UNAVAILABLE");
  assertEqual(
    "dynamics bridge preserves unavailable reason",
    unavailableDynamicsBridgeConsumption.reason,
    "STAR_BEAST_CALENDAR_UNAVAILABLE",
  );
  assertEqual(
    "dynamics bridge preserves upstream reason",
    unavailableDynamicsBridgeConsumption.result.upstreamReason,
    "CHINESE_CALENDAR_NOT_SUPPORTED",
  );

  const emptyDynamicsReadinessInput = Object.freeze({
    starBeastResult: null,
    journeyPhase: null,
    currentHexagramFormation: null,
    yaoTransmissionProfile: null,
    crystalState: null,
  });
  const missingStarBeastReadiness = resolveDynamicsOriginalSelfFoundationReadiness(emptyDynamicsReadinessInput);
  assertEqual("readiness blocks missing star beast result", missingStarBeastReadiness.status, "NOT_READY");
  assertEqual("readiness reports missing star beast result", missingStarBeastReadiness.reason, "STAR_BEAST_RESULT_MISSING");
  assertEqual("readiness freezes missing result", Object.isFrozen(missingStarBeastReadiness), true);

  const missingPhaseReadiness = resolveDynamicsOriginalSelfFoundationReadiness({
    ...emptyDynamicsReadinessInput,
    starBeastResult: input.starBeast,
  });
  assertEqual("readiness blocks missing journey phase", missingPhaseReadiness.status, "NOT_READY");
  assertEqual("readiness reports missing journey phase", missingPhaseReadiness.reason, "JOURNEY_PHASE_MISSING");

  const lifeArchetypeReadiness = resolveDynamicsOriginalSelfFoundationReadiness({
    ...emptyDynamicsReadinessInput,
    starBeastResult: input.starBeast,
    journeyPhase: "LIFE_ARCHETYPE",
  });
  assertEqual("readiness permits null future sources", lifeArchetypeReadiness.status, "READY");
  assertEqual("readiness exposes formal ready marker", lifeArchetypeReadiness.readiness, "READY_FOR_ORIGINAL_SELF_FOUNDATION");
  assertEqual("readiness delegates early phase to bridge", lifeArchetypeReadiness.consumption?.status, "AVAILABLE");

  const missingFormationReadiness = resolveDynamicsOriginalSelfFoundationReadiness({
    ...emptyDynamicsReadinessInput,
    starBeastResult: input.starBeast,
    journeyPhase: "HEXAGRAM",
  });
  assertEqual("readiness blocks hexagram without formation", missingFormationReadiness.status, "NOT_READY");
  assertEqual(
    "readiness reports missing formation",
    missingFormationReadiness.reason,
    "CURRENT_HEXAGRAM_FORMATION_MISSING",
  );

  const missingYaoReadiness = resolveDynamicsOriginalSelfFoundationReadiness({
    ...emptyDynamicsReadinessInput,
    starBeastResult: input.starBeast,
    journeyPhase: "YAO",
    currentHexagramFormation: formation,
  });
  assertEqual("readiness blocks yao phase without yao", missingYaoReadiness.status, "NOT_READY");
  assertEqual("readiness reports missing yao", missingYaoReadiness.reason, "YAO_TRANSMISSION_PROFILE_MISSING");

  const missingCrystalReadiness = resolveDynamicsOriginalSelfFoundationReadiness({
    ...emptyDynamicsReadinessInput,
    starBeastResult: input.starBeast,
    journeyPhase: "CRYSTAL",
    currentHexagramFormation: formation,
    yaoTransmissionProfile: yao,
  });
  assertEqual("readiness blocks crystal phase without crystal", missingCrystalReadiness.status, "NOT_READY");
  assertEqual("readiness reports missing crystal", missingCrystalReadiness.reason, "CRYSTAL_STATE_MISSING");

  const readyDynamicsReadinessInput = Object.freeze({
    starBeastResult: input.starBeast,
    journeyPhase: "CRYSTAL",
    currentHexagramFormation: formation,
    yaoTransmissionProfile: yao,
    crystalState: crystal,
  });
  const readyDynamicsReadinessInputSnapshot = JSON.stringify(readyDynamicsReadinessInput);
  const readyDynamicsReadiness = resolveDynamicsOriginalSelfFoundationReadiness(readyDynamicsReadinessInput);
  assertEqual("readiness accepts phase-complete formal sources", readyDynamicsReadiness.status, "READY");
  assertEqual("readiness delegates ready sources to bridge", readyDynamicsReadiness.consumption?.status, "AVAILABLE");
  assertEqual("readiness preserves crystal phase", readyDynamicsReadiness.consumption?.state?.journey.currentPhase, "CRYSTAL");
  assertEqual("readiness freezes ready result", Object.isFrozen(readyDynamicsReadiness), true);
  assertEqual("readiness does not mutate input", JSON.stringify(readyDynamicsReadinessInput), readyDynamicsReadinessInputSnapshot);

  const unavailableStarBeastReadiness = resolveDynamicsOriginalSelfFoundationReadiness({
    ...emptyDynamicsReadinessInput,
    starBeastResult: Object.freeze({
      status: "CALENDAR_UNAVAILABLE",
      protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
      reason: "CHINESE_CALENDAR_NOT_SUPPORTED",
    }),
    journeyPhase: "STAR_BEAST",
  });
  assertEqual("readiness accepts present unavailable source", unavailableStarBeastReadiness.status, "READY");
  assertEqual("readiness preserves foundation unavailability", unavailableStarBeastReadiness.consumption?.status, "UNAVAILABLE");
  assertEqual(
    "readiness preserves foundation unavailable reason",
    unavailableStarBeastReadiness.consumption?.reason,
    "STAR_BEAST_CALENDAR_UNAVAILABLE",
  );
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("[ORIGINAL SELF FOUNDATION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF FOUNDATION] PASS");
