import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsCrystalRuntimeAdapter.ts");
const formationAdapterPath = path.join(rootDir, "src/services/guanyaoCurrentHexagramFormationAdapter.ts");
const migrationAdapterPath = path.join(rootDir, "src/services/guanyaoDynamicsMigrationImpactAdapter.ts");
const routingPath = path.join(rootDir, "src/services/changeExperienceRuntimeRoutingService.ts");
const smokeFixturePath = path.join(rootDir, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-crystal-runtime-${process.pid}.mjs`);

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
    selectedPressureSeedId: "crystal-runtime-seed",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    surface: "上级要求立刻给出结论",
    shell: "担心判断失误",
    scenarioDomain: "BOSS",
    pressureIntensity: 80,
    primaryRelation: "BOSS",
  },
  motherCodeProfile: {
    motherCodeId: "mother-dui",
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑",
    baseForce: "连接",
    defaultReactionPattern: "先回应关系",
    pressureSensitiveZones: ["评价"],
    defenseTendency: "维持连接",
    behaviorBias: "为了维持连接而快速回应",
  },
  motherTrigram: "兑",
};

try {
  await build({
    stdin: {
      contents: [
        `export { resolveDynamicsCurrentCrystalEndState } from ${JSON.stringify(adapterPath)};`,
        `export { resolveCurrentHexagramFormation } from ${JSON.stringify(formationAdapterPath)};`,
        `export { resolveDynamicsMigrationImpact } from ${JSON.stringify(migrationAdapterPath)};`,
        `export { resolveChangeExperienceRuntimeRoute } from ${JSON.stringify(routingPath)};`,
        `export { resolveChangeExperienceRuntimeSmokeRevisionAction } from ${JSON.stringify(smokeFixturePath)};`,
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "dynamics-crystal-runtime-gate.ts",
      loader: "ts",
    },
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    resolveChangeExperienceRuntimeRoute,
    resolveChangeExperienceRuntimeSmokeRevisionAction,
    resolveCurrentHexagramFormation,
    resolveDynamicsCurrentCrystalEndState,
    resolveDynamicsMigrationImpact,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const formation = resolveCurrentHexagramFormation(readyInput);
  const revisionAction = resolveChangeExperienceRuntimeSmokeRevisionAction("action-five");
  const changeExperienceRoute = resolveChangeExperienceRuntimeRoute(revisionAction, "action-five");
  const migrationImpact = resolveDynamicsMigrationImpact({
    action: revisionAction,
    changeExperienceRoute,
  });
  const baseInput = {
    formation,
    migrationImpact,
    completedNodeCount: 6,
    primaryDimension: "action",
    assetCompletionState: "READY_TO_CRYSTALLIZE",
    revisionAction,
    revisionActionConfirmed: true,
    createdAt: "2026-07-14T00:00:00.000Z",
  };

  const endState = resolveDynamicsCurrentCrystalEndState(baseInput);
  assertEqual("ready runtime resolves current crystal end state", Boolean(endState), true);
  assertEqual("current crystal source stays dynamics", endState?.source, "dynamics");
  assertEqual("current crystal status is crystallized", endState?.status, "CRYSTALLIZED");
  assertEqual("current crystal keeps adapter timestamp", endState?.createdAt, "2026-07-14T00:00:00.000Z");
  assertEqual("current crystal inherits formation mother", endState?.mother.motherCodeName, "兑｜连接者");
  assertEqual("current crystal inherits formation pressure", endState?.pressure.selectedPressureSeedId, "crystal-runtime-seed");
  assertEqual("current crystal inherits formation hexagram", endState?.hexagram.hexagramName, formation?.currentHexagramProfile.hexagramName);
  assertEqual("current crystal keeps primary dimension", endState?.transmission.primaryDimension, "action");
  assertEqual(
    "current crystal copy follows migration impact",
    endState?.crystal.copy,
    "这一局把你习惯通过行动快速恢复掌控。转向先判断真正要解决的问题，再采取行动。",
  );

  assertEqual(
    "missing formation blocks current crystal",
    resolveDynamicsCurrentCrystalEndState({ ...baseInput, formation: null }),
    null,
  );
  assertEqual(
    "incomplete asset blocks current crystal",
    resolveDynamicsCurrentCrystalEndState({ ...baseInput, assetCompletionState: "INCOMPLETE" }),
    null,
  );
  assertEqual(
    "five completed spaces block current crystal",
    resolveDynamicsCurrentCrystalEndState({ ...baseInput, completedNodeCount: 5 }),
    null,
  );
  assertEqual(
    "missing migration impact blocks current crystal",
    resolveDynamicsCurrentCrystalEndState({ ...baseInput, migrationImpact: null }),
    null,
  );
  assertEqual(
    "unconfirmed revision action blocks current crystal",
    resolveDynamicsCurrentCrystalEndState({ ...baseInput, revisionActionConfirmed: false }),
    null,
  );
  assertEqual(
    "no revision action does not require confirmation",
    Boolean(resolveDynamicsCurrentCrystalEndState({
      ...baseInput,
      revisionAction: null,
      revisionActionConfirmed: false,
    })),
    true,
  );

  assertIncludes("crystal adapter owns independent input", adapterSource, "export type DynamicsCrystalRuntimeAdapterInput");
  assertIncludes("crystal adapter consumes formal formation", adapterSource, "formation.currentHexagramProfile");
  assertIncludes("crystal adapter consumes formal migration impact", adapterSource, "migrationImpact: input.migrationImpact");
  assertIncludes("crystal adapter owns asset readiness", adapterSource, 'input.assetCompletionState === "READY_TO_CRYSTALLIZE"');
  assertIncludes("crystal adapter owns revision confirmation", adapterSource, "!input.revisionAction || input.revisionActionConfirmed");
  assertIncludes("crystal adapter delegates runtime endpoint", adapterSource, "resolveRuntimeCurrentCrystalEndState({");
  assertIncludes("Gravity delegates current crystal resolution", gravitySource, "resolveDynamicsCurrentCrystalEndState({");
  assertIncludes("Gravity passes formal formation", gravitySource, "formation: currentHexagramFormation");
  assertExcludes("Gravity no longer calls runtime crystal endpoint", gravitySource, "resolveRuntimeCurrentCrystalEndState");
  assertExcludes("Gravity no longer owns current crystal proxy", gravitySource, "function resolveCurrentCrystalEndState");
  assertExcludes("Gravity no longer assembles endpoint readiness", gravitySource, "readyToCrystallize:");

  console.log("\n[DYNAMICS CRYSTAL RUNTIME ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS CRYSTAL RUNTIME ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
