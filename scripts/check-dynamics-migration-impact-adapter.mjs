import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsMigrationImpactAdapter.ts");
const routingPath = path.join(rootDir, "src/services/changeExperienceRuntimeRoutingService.ts");
const smokeFixturePath = path.join(rootDir, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-migration-impact-${process.pid}.mjs`);

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
        `export { resolveDynamicsMigrationImpact } from ${JSON.stringify(adapterPath)};`,
        `export { resolveChangeExperienceRuntimeRoute } from ${JSON.stringify(routingPath)};`,
        `export { resolveChangeExperienceRuntimeSmokeRevisionAction } from ${JSON.stringify(smokeFixturePath)};`,
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "dynamics-migration-impact-gate.ts",
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
    resolveDynamicsMigrationImpact,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  for (const [smokeKey, expectedDimension] of smokeCases) {
    const action = resolveChangeExperienceRuntimeSmokeRevisionAction(smokeKey);
    const route = resolveChangeExperienceRuntimeRoute(action, smokeKey);
    const impact = resolveDynamicsMigrationImpact({ action, changeExperienceRoute: route });

    assertEqual(`${smokeKey} resolves route`, Boolean(route), true);
    assertEqual(`${smokeKey} resolves migration impact`, Boolean(impact), true);
    assertEqual(`${smokeKey} migration dimension`, impact?.dimension, expectedDimension);
    assertEqual(`${smokeKey} migration yao stage`, impact?.yaoStage, "awareness");
    assertEqual(`${smokeKey} migration source id`, impact?.sourceUnit.unitId, `gravity-${expectedDimension}-awareness`);
    assertEqual(`${smokeKey} migration uses routed old reaction`, impact?.fromModel, route?.unit.recognition.oldReaction);
    assertEqual(`${smokeKey} migration uses routed new response`, impact?.toResponse, route?.unit.revision.newResponse);
    assertEqual(`${smokeKey} migration uses routed crystal imprint`, impact?.crystalImprint.imprintLine, route?.unit.meaning.crystalImprint);
    assertEqual(`${smokeKey} migration is ready for crystal`, impact?.impactReadiness, "READY_FOR_CRYSTAL");
    assertEqual(`${smokeKey} migration blocks storage`, impact?.guardrails.noStorageWrite, true);
  }

  const baseAction = resolveChangeExperienceRuntimeSmokeRevisionAction("body-awareness");
  const baseRoute = resolveChangeExperienceRuntimeRoute(baseAction, "body-awareness");
  const stageCases = [
    ["初爻 · 触发", "trigger"],
    ["二爻 · 接管", "takeover"],
    ["三爻 · 解释", "explain"],
    ["四爻 · 固化", "solidify"],
    ["五爻 · 觉察", "awareness"],
    ["上爻 · 修正", "revision"],
  ];

  for (const [yaoName, expectedStage] of stageCases) {
    const impact = resolveDynamicsMigrationImpact({
      action: { ...baseAction, yaoName },
      changeExperienceRoute: baseRoute,
    });
    assertEqual(`${yaoName} maps persona yao stage`, impact?.yaoStage, expectedStage);
  }

  assertEqual(
    "unknown yao name blocks migration impact",
    resolveDynamicsMigrationImpact({
      action: { ...baseAction, yaoName: "未知爻" },
      changeExperienceRoute: baseRoute,
    }),
    null,
  );
  assertEqual(
    "missing action blocks migration impact",
    resolveDynamicsMigrationImpact({ action: null, changeExperienceRoute: baseRoute }),
    null,
  );
  assertEqual(
    "missing route blocks migration impact",
    resolveDynamicsMigrationImpact({ action: baseAction, changeExperienceRoute: null }),
    null,
  );

  assertIncludes("migration adapter owns independent input", adapterSource, "export type DynamicsMigrationImpactAdapterInput");
  assertIncludes("migration adapter delegates formal impact formation", adapterSource, "formRuntimePersonaMigrationImpact({");
  assertIncludes("migration adapter maps awareness stage", adapterSource, 'return "awareness"');
  assertIncludes("migration adapter uses routed recognition", adapterSource, "unit.recognition.oldReaction");
  assertIncludes("migration adapter uses routed revision", adapterSource, "unit.revision.newResponse");
  assertIncludes("Gravity delegates migration impact", gravitySource, "resolveDynamicsMigrationImpact({");
  assertExcludes("Gravity no longer forms migration impact", gravitySource, "formRuntimePersonaMigrationImpact");
  assertExcludes("Gravity no longer owns yao stage mapping", gravitySource, "resolvePersonaYaoStageFromYaoName");
  assertExcludes("Gravity no longer owns migration impact resolver", gravitySource, "resolveCrystalMigrationImpactForAction");

  console.log("\n[DYNAMICS MIGRATION IMPACT ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS MIGRATION IMPACT ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
