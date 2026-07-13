import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoCurrentHexagramFormationAdapter.ts");
const typePath = path.join(rootDir, "src/types/currentHexagramFormation.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-current-hexagram-formation-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const readyInput = {
  status: "READY",
  readiness: "READY_FOR_CURRENT_HEXAGRAM",
  hasPressureContext: true,
  selectedPressureSeedContext: {
    selectedPressureSeedId: "formation-seed",
    matrixCode: "POWER-EVALUATION",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    surface: "上级要求立刻给出结论",
    shell: "担心判断失误",
    scenarioDomain: "BOSS",
    pressureIntensity: 80,
    primaryRelation: "BOSS",
    tags: ["deadline"],
  },
  motherCodeProfile: {
    motherCodeId: "mother-dui",
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑",
    baseForce: "连接",
    defaultReactionPattern: "先回应关系",
    pressureSensitiveZones: ["评价"],
    defenseTendency: "维持连接",
    behaviorBias: "快速回应",
  },
  motherTrigram: "兑",
};

try {
  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    resolveCurrentHexagramFormation,
    resolveDynamicsPressureFieldLabel,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const formation = resolveCurrentHexagramFormation(readyInput);
  assertEqual("ready input forms current hexagram", Boolean(formation), true);
  assertEqual("formation source stays dynamics", formation?.source, "dynamics");
  assertEqual("formation preserves selected pressure seed", formation?.selectedPressureSeedContext.selectedPressureSeedId, "formation-seed");
  assertEqual("formation normalizes pressure seed id", formation?.pressureSeed.seedId, "formation-seed");
  assertEqual("formation normalizes pressure field label", formation?.pressureSeed.pressureType, "权力压力");
  assertEqual("formation normalizes relationship role", formation?.pressureSeed.relationshipRole, "上级 / 权力关系");
  assertEqual("formation normalizes intensity", formation?.pressureSeed.intensityLevel, "high");
  assertEqual("formation preserves mother lower trigram", formation?.currentHexagramProfile.lowerTrigram, "兑");
  assertEqual("formation locks lower source", formation?.currentHexagramProfile.lowerSource, "mother_code");
  assertEqual("formation locks upper source", formation?.currentHexagramProfile.upperSource, "pressure_seed_classification");
  assertEqual("formation exposes pressure field", Boolean(formation?.pressureField.fieldId), true);
  assertEqual("formation timestamp is ISO", Number.isNaN(Date.parse(formation?.createdAt ?? "")), false);

  const repeatedFormation = resolveCurrentHexagramFormation(readyInput);
  assertEqual(
    "same ready input repeats current hexagram profile",
    JSON.stringify(repeatedFormation?.currentHexagramProfile),
    JSON.stringify(formation?.currentHexagramProfile),
  );

  assertEqual(
    "pressure-missing readiness cannot form hexagram",
    resolveCurrentHexagramFormation({
      status: "NOT_READY",
      readiness: "NOT_READY",
      reason: "PRESSURE_CONTEXT_MISSING",
      hasPressureContext: false,
    }),
    null,
  );
  assertEqual(
    "mother-missing readiness cannot form hexagram",
    resolveCurrentHexagramFormation({
      status: "NOT_READY",
      readiness: "NOT_READY",
      reason: "MOTHER_CONTEXT_MISSING",
      hasPressureContext: true,
    }),
    null,
  );
  assertEqual("pressure label keeps unknown values", resolveDynamicsPressureFieldLabel("CUSTOM"), "CUSTOM");
  assertEqual("pressure label keeps empty fallback", resolveDynamicsPressureFieldLabel(null), "现实压力");

  assertIncludes("formation type owns formal result", typeSource, "export type CurrentHexagramFormationResult");
  assertIncludes("formation result carries normalized pressure seed", typeSource, "pressureSeed: PressureSeed;");
  assertIncludes("formation result carries current hexagram", typeSource, "currentHexagramProfile: CurrentHexagramProfile;");
  assertIncludes("formation adapter delegates pressure field building", adapterSource, "buildPressureField(readiness.motherCodeProfile, pressureSeed)");
  assertIncludes("formation adapter delegates current hexagram formation", adapterSource, "formCurrentHexagramProfile(");
  assertIncludes("Gravity consumes formation adapter", gravitySource, "resolveCurrentHexagramFormation(dynamicsInputReadiness)");
  assertIncludes("Gravity reuses formation pressure seed", gravitySource, "formation.pressureSeed");
  assertExcludes("Gravity no longer builds pressure fields", gravitySource, "buildPressureField");
  assertExcludes("Gravity no longer forms current hexagram directly", gravitySource, "formCurrentHexagramProfile");
  assertExcludes("Gravity no longer owns pressure seed construction", gravitySource, "function buildPressureSeedForHexagram");
  assertExcludes("Gravity no longer owns active formation context type", gravitySource, "type ActiveCurrentHexagramContext");

  console.log("\n[CURRENT HEXAGRAM FORMATION ADAPTER] PASS");
} catch (error) {
  console.error("[CURRENT HEXAGRAM FORMATION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
