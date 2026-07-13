import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-gravity-change-experience-routing-"));
const gravityPageSource = fs.readFileSync(path.join(rootDir, "src/pages/GravityPage.tsx"), "utf8");

const sourceFiles = [
  "src/services/fixtures/personaTransmissionFixtures.ts",
  "src/services/fixtures/personaTransmissionExperienceFixtures.ts",
  "src/services/fixtures/changeExperienceFixtures.ts",
  "src/services/changeExperiencePresentationAdapter.ts",
  "src/services/fixtures/changeExperiencePresentationFixtures.ts",
  "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts",
  "src/services/changeExperienceRuntimeRoutingService.ts",
];

const transpileToTemp = (sourcePath) => {
  const absoluteSourcePath = path.join(rootDir, sourcePath);
  const source = fs.readFileSync(absoluteSourcePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const outputPath = path.join(tempRoot, sourcePath.replace(/\.ts$/, ".js"));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, transpiled.outputText);
};

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }

  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }

  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertNotIncludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }

  console.log(`PASS | ${name} | forbidden=absent`);
};

const routingCases = [
  { dimension: "body", fixtureKey: "body", smokeKeys: ["body-awareness", "body"], layerLabel: "身体" },
  {
    dimension: "emotion",
    fixtureKey: "emotion",
    smokeKeys: ["emotion-change", "emotion"],
    layerLabel: "情绪",
  },
  {
    dimension: "thought",
    fixtureKey: "thought",
    smokeKeys: ["thought-change", "thought"],
    layerLabel: "思想",
  },
  { dimension: "action", fixtureKey: "behavior", smokeKeys: ["action-five"], layerLabel: "行动" },
  {
    dimension: "memory",
    fixtureKey: "memory",
    smokeKeys: ["memory-wisdom", "memory"],
    layerLabel: "记忆",
  },
  {
    dimension: "motivation",
    fixtureKey: "motivation",
    smokeKeys: ["motivation-drive", "motivation"],
    layerLabel: "动机",
  },
];

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { resolveChangeExperienceRuntimeRoute } = requireFromTemp(
    "./src/services/changeExperienceRuntimeRoutingService.js",
  );
  const {
    changeExperienceRuntimeSmokeFixtures,
    resolveChangeExperienceRuntimeSmokeFixture,
  } = requireFromTemp("./src/services/fixtures/changeExperienceRuntimeSmokeFixtures.js");

  assertEqual("gravity change experience route count", routingCases.length, 6);
  assertEqual(
    "gravity change experience route uniqueness",
    new Set(routingCases.map(({ dimension }) => dimension)).size,
    6,
  );
  assertEqual("gravity change experience smoke fixture count", changeExperienceRuntimeSmokeFixtures.length, 6);
  assertEqual(
    "gravity change experience smoke fixture key uniqueness",
    new Set(changeExperienceRuntimeSmokeFixtures.map(({ fixtureKey }) => fixtureKey)).size,
    6,
  );
  const registeredSmokeKeys = changeExperienceRuntimeSmokeFixtures.flatMap(({ smokeKeys }) => smokeKeys);
  assertEqual("gravity change experience smoke key count", registeredSmokeKeys.length, 11);
  assertEqual("gravity change experience smoke key uniqueness", new Set(registeredSmokeKeys).size, 11);

  routingCases.forEach(({ dimension, fixtureKey, smokeKeys, layerLabel }) => {
    const awarenessRoute = resolveChangeExperienceRuntimeRoute(
      { layerLabel, yaoName: "五爻 · 觉察" },
      null,
    );
    assertEqual(`${dimension} awareness route dimension`, awarenessRoute?.dimension, dimension);
    assertEqual(`${dimension} awareness route unit`, awarenessRoute?.unit.dimension, dimension);
    assertEqual(
      `${dimension} presentation matches unit imprint`,
      awarenessRoute?.presentation.meaning.crystalImprint,
      awarenessRoute?.unit.meaning.crystalImprint,
    );

    smokeKeys.forEach((smokeKey) => {
      const smokeRoute = resolveChangeExperienceRuntimeRoute(
        { layerLabel, yaoName: "初爻 · 触发" },
        smokeKey,
      );
      assertEqual(`${dimension} ${smokeKey} route dimension`, smokeRoute?.dimension, dimension);
      assertEqual(
        `${dimension} ${smokeKey} fixture key`,
        resolveChangeExperienceRuntimeSmokeFixture(smokeKey)?.fixtureKey,
        fixtureKey,
      );
    });
    const smokeFixture = resolveChangeExperienceRuntimeSmokeFixture(smokeKeys[0]);
    assertEqual(`${dimension} smoke pressure context is present`, Boolean(smokeFixture?.pressureContext), true);
    assertEqual(`${dimension} smoke mother profile is present`, Boolean(smokeFixture?.motherCodeProfile), true);
    assertEqual(`${dimension} smoke persona output is present`, Boolean(smokeFixture?.personaOutputSnapshot), true);
  });

  assertEqual(
    "non-awareness route without smoke stays disconnected",
    resolveChangeExperienceRuntimeRoute({ layerLabel: "身体", yaoName: "初爻 · 触发" }, null),
    null,
  );
  assertEqual(
    "unknown layer stays disconnected",
    resolveChangeExperienceRuntimeRoute({ layerLabel: "未知", yaoName: "五爻 · 觉察" }, null),
    null,
  );

  assertIncludes(
    "gravity consumes centralized route",
    gravityPageSource,
    "resolveChangeExperienceRuntimeRoute(singleModelRevisionAction, experienceSmokeFixture)",
  );
  assertIncludes(
    "gravity consumes centralized smoke fixture",
    gravityPageSource,
    "resolveChangeExperienceRuntimeSmokeFixture(readDevExperienceSmokeFixture())",
  );
  assertNotIncludes(
    "gravity no longer owns smoke fixture constants",
    gravityPageSource,
    "DEV_ACTION_FIVE_PRESSURE_CONTEXT",
  );
  assertIncludes(
    "gravity presentation marker follows routed dimension",
    gravityPageSource,
    'data-change-experience-presentation={changeExperienceRoute?.dimension ?? "inactive"}',
  );
  assertNotIncludes(
    "gravity no longer owns unit routing",
    gravityPageSource,
    "function resolveChangeExperienceUnitForAction",
  );
  assertNotIncludes(
    "gravity no longer owns presentation routing",
    gravityPageSource,
    "function resolveChangeExperiencePresentationForUnit",
  );
  assertNotIncludes(
    "gravity no longer owns layer dimension routing",
    gravityPageSource,
    "function resolvePersonaDimensionFromLayerLabel",
  );

  console.log("[GRAVITY CHANGE EXPERIENCE ROUTING] PASS");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
