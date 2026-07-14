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
const protocolPath = path.join(rootDir, "docs/GUANYAO_ORIGINAL_SELF_ARCHITECTURE_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-original-self-foundation-${process.pid}.mjs`);

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

for (const [name, filePath] of [
  ["original self type", typePath],
  ["type index", typeIndexPath],
  ["foundation adapter", adapterPath],
  ["foundation validator", validatorPath],
  ["foundation resolver", resolverPath],
  ["foundation source adapter", sourceAdapterPath],
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
  fs.writeFileSync(
    tempModulePath,
    `${transpiledAdapter.outputText}\n${transpiledValidator.outputText}\n${transpiledResolver.outputText}\n${transpiledSourceAdapter.outputText}`,
  );

  const {
    adaptOriginalSelfFoundation,
    adaptOriginalSelfFoundationSource,
    resolveOriginalSelfFoundation,
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
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("[ORIGINAL SELF FOUNDATION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF FOUNDATION] PASS");
