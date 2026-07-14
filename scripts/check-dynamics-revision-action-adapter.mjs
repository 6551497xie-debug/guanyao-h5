import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsRevisionActionAdapter.ts");
const formationAdapterPath = path.join(rootDir, "src/services/guanyaoCurrentHexagramFormationAdapter.ts");
const typePath = path.join(rootDir, "src/types/dynamicsRevisionAction.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const runtimeAdapterPath = path.join(rootDir, "src/services/guanyaoDynamicsChangeExperienceRuntimeAdapter.ts");
const smokeFixturePath = path.join(rootDir, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const runtimeAdapterSource = fs.readFileSync(runtimeAdapterPath, "utf8");
const smokeFixtureSource = fs.readFileSync(smokeFixturePath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-revision-action-${process.pid}.mjs`);

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
    selectedPressureSeedId: "revision-seed",
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
        `export { resolveDynamicsRevisionAction } from ${JSON.stringify(adapterPath)};`,
        `export { resolveCurrentHexagramFormation } from ${JSON.stringify(formationAdapterPath)};`,
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "dynamics-revision-action-gate.ts",
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
    resolveCurrentHexagramFormation,
    resolveDynamicsRevisionAction,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const formation = resolveCurrentHexagramFormation(readyInput);
  const action = resolveDynamicsRevisionAction(formation);
  assertEqual("formed context resolves revision action", Boolean(action), true);
  assertEqual("main cut resolves behavior layer", action?.layerLabel, "行为");
  assertEqual("main cut resolves fourth yao", action?.yaoName, "四爻");
  assertEqual("action line comes from main transmission", action?.actionLine, "在行为落地前切出一个反本能动作。");
  assertEqual("source reason comes from normalized mother profile", action?.sourceReason, "为了维持连接而快速回应");
  assertEqual("action carries intervention potential", typeof action?.interventionPotential, "number");
  assertEqual("action carries user agency", typeof action?.userAgency, "number");
  assertEqual(
    "same formation repeats revision action",
    JSON.stringify(resolveDynamicsRevisionAction(formation)),
    JSON.stringify(action),
  );
  assertEqual("missing formation yields no revision action", resolveDynamicsRevisionAction(null), null);

  const changedAction = resolveDynamicsRevisionAction({
    ...formation,
    motherCodeProfile: {
      ...formation.motherCodeProfile,
      behaviorBias: "先停下来确认事实",
    },
  });
  assertEqual("changed mother behavior changes source reason", changedAction?.sourceReason, "先停下来确认事实");

  assertIncludes("revision action type is independent", typeSource, "export type SingleModelRevisionAction");
  assertIncludes("revision adapter delegates yao transmission", adapterSource, "buildYaoTransmissionChain(");
  assertIncludes("revision adapter forces runtime pressure seed", adapterSource, "preferRuntimePressureSeed: true");
  assertIncludes("revision adapter selects the main cut layer", adapterSource, "yaoTransmissionChain.mainCut.yaoLayer");
  assertIncludes("change experience runtime delegates revision action resolution", runtimeAdapterSource, "resolveDynamicsRevisionAction(input.formation)");
  assertIncludes("Gravity delegates change experience runtime", gravitySource, "resolveDynamicsChangeExperienceRuntime({");
  assertExcludes("Gravity no longer imports causal engine service", gravitySource, "guanyaoCausalEngineService");
  assertExcludes("Gravity no longer owns revision action resolver", gravitySource, "function resolveSingleModelRevisionAction");
  assertExcludes("Gravity no longer owns revision action type", gravitySource, "type SingleModelRevisionAction =");
  assertIncludes("smoke fixtures reuse formal action type", smokeFixtureSource, "ChangeExperienceRuntimeSmokeRevisionAction = SingleModelRevisionAction");

  console.log("\n[DYNAMICS REVISION ACTION ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS REVISION ACTION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
