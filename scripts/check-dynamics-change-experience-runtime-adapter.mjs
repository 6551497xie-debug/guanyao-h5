import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsChangeExperienceRuntimeAdapter.ts");
const formationAdapterPath = path.join(rootDir, "src/services/guanyaoCurrentHexagramFormationAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-change-experience-${process.pid}.mjs`);

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
    selectedPressureSeedId: "change-experience-runtime-seed",
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

const smokeCases = [
  ["body-awareness", "body"],
  ["emotion-change", "emotion"],
  ["thought-change", "thought"],
  ["action-five", "action"],
  ["memory-wisdom", "memory"],
  ["motivation-drive", "motivation"],
];

try {
  await build({
    stdin: {
      contents: [
        `export { resolveDynamicsChangeExperienceRuntime } from ${JSON.stringify(adapterPath)};`,
        `export { resolveCurrentHexagramFormation } from ${JSON.stringify(formationAdapterPath)};`,
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "dynamics-change-experience-runtime-gate.ts",
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
    resolveDynamicsChangeExperienceRuntime,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const formation = resolveCurrentHexagramFormation(readyInput);
  const formationRuntime = resolveDynamicsChangeExperienceRuntime({
    formation,
    experienceSmokeFixture: null,
  });
  assertEqual("formation resolves revision action", Boolean(formationRuntime.revisionAction), true);
  assertEqual(
    "formation revision action owns formal source",
    formationRuntime.revisionActionSource,
    "CURRENT_HEXAGRAM_FORMATION",
  );

  const invalidSmokeRuntime = resolveDynamicsChangeExperienceRuntime({
    formation,
    experienceSmokeFixture: "unknown-smoke",
  });
  assertEqual(
    "unknown smoke falls back to formation",
    invalidSmokeRuntime.revisionActionSource,
    "CURRENT_HEXAGRAM_FORMATION",
  );

  smokeCases.forEach(([smokeKey, dimension]) => {
    const runtime = resolveDynamicsChangeExperienceRuntime({
      formation,
      experienceSmokeFixture: smokeKey,
    });
    assertEqual(`${dimension} smoke action has priority`, runtime.revisionActionSource, "SMOKE_FIXTURE");
    assertEqual(`${dimension} smoke route`, runtime.route?.dimension, dimension);
    assertEqual(`${dimension} presentation follows route`, runtime.presentation, runtime.route?.presentation);
    assertEqual(
      `${dimension} presentation keeps crystal imprint`,
      runtime.presentation?.meaning.crystalImprint,
      runtime.route?.unit.meaning.crystalImprint,
    );
    assertEqual(
      `${dimension} migration impact is ready`,
      runtime.migrationImpact?.impactReadiness,
      "READY_FOR_CRYSTAL",
    );
    assertEqual(`${dimension} migration impact dimension`, runtime.migrationImpact?.dimension, dimension);
  });

  const smokeWithoutFormation = resolveDynamicsChangeExperienceRuntime({
    formation: null,
    experienceSmokeFixture: "action-five",
  });
  assertEqual("smoke runtime does not require formation", smokeWithoutFormation.revisionActionSource, "SMOKE_FIXTURE");
  assertEqual("smoke runtime keeps action route", smokeWithoutFormation.route?.dimension, "action");

  const inactiveRuntime = resolveDynamicsChangeExperienceRuntime({
    formation: null,
    experienceSmokeFixture: null,
  });
  assertEqual("missing inputs yield no revision action", inactiveRuntime.revisionAction, null);
  assertEqual("missing inputs yield no revision source", inactiveRuntime.revisionActionSource, null);
  assertEqual("missing inputs yield no route", inactiveRuntime.route, null);
  assertEqual("missing inputs yield no presentation", inactiveRuntime.presentation, null);
  assertEqual("missing inputs yield no migration impact", inactiveRuntime.migrationImpact, null);

  assertIncludes(
    "runtime adapter owns independent input",
    adapterSource,
    "export type DynamicsChangeExperienceRuntimeAdapterInput",
  );
  assertIncludes(
    "runtime adapter owns independent result",
    adapterSource,
    "export type DynamicsChangeExperienceRuntimeResult",
  );
  assertIncludes(
    "runtime adapter defines smoke precedence",
    adapterSource,
    "smokeRevisionAction ?? resolveDynamicsRevisionAction(input.formation)",
  );
  assertIncludes("runtime adapter owns route", adapterSource, "resolveChangeExperienceRuntimeRoute(");
  assertIncludes("runtime adapter owns presentation", adapterSource, "presentation: route?.presentation ?? null");
  assertIncludes("runtime adapter owns migration impact", adapterSource, "resolveDynamicsMigrationImpact({");
  assertIncludes(
    "Gravity delegates unified runtime",
    gravitySource,
    "resolveDynamicsChangeExperienceRuntime({",
  );
  assertIncludes(
    "Gravity consumes unified presentation",
    gravitySource,
    "changeExperienceRuntime.presentation",
  );
  assertIncludes(
    "Gravity consumes unified migration impact",
    gravitySource,
    "changeExperienceRuntime.migrationImpact",
  );
  assertExcludes(
    "Gravity no longer resolves smoke revision action",
    gravitySource,
    "resolveChangeExperienceRuntimeSmokeRevisionAction",
  );
  assertExcludes(
    "Gravity no longer resolves formal revision action",
    gravitySource,
    "resolveDynamicsRevisionAction",
  );
  assertExcludes(
    "Gravity no longer resolves change experience route",
    gravitySource,
    "resolveChangeExperienceRuntimeRoute",
  );
  assertExcludes(
    "Gravity no longer resolves migration impact",
    gravitySource,
    "resolveDynamicsMigrationImpact",
  );

  console.log("\n[DYNAMICS CHANGE EXPERIENCE RUNTIME ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS CHANGE EXPERIENCE RUNTIME ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
