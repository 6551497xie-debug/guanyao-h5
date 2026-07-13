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
  { dimension: "body", fixtureKey: "body", smoke: "body-awareness", layerLabel: "身体" },
  { dimension: "emotion", fixtureKey: "emotion", smoke: "emotion-change", layerLabel: "情绪" },
  { dimension: "thought", fixtureKey: "thought", smoke: "thought-change", layerLabel: "思想" },
  { dimension: "action", fixtureKey: "behavior", smoke: "action-five", layerLabel: "行动" },
  { dimension: "memory", fixtureKey: "memory", smoke: "memory-wisdom", layerLabel: "记忆" },
  { dimension: "motivation", fixtureKey: "motivation", smoke: "motivation-drive", layerLabel: "动机" },
];

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { resolveChangeExperienceRuntimeRoute } = requireFromTemp(
    "./src/services/changeExperienceRuntimeRoutingService.js",
  );

  assertEqual("gravity change experience route count", routingCases.length, 6);
  assertEqual(
    "gravity change experience route uniqueness",
    new Set(routingCases.map(({ dimension }) => dimension)).size,
    6,
  );

  routingCases.forEach(({ dimension, fixtureKey, smoke, layerLabel }) => {
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

    const smokeRoute = resolveChangeExperienceRuntimeRoute(
      { layerLabel, yaoName: "初爻 · 触发" },
      smoke,
    );
    assertEqual(`${dimension} smoke route dimension`, smokeRoute?.dimension, dimension);
    assertIncludes(`${dimension} fixture route is connected`, gravityPageSource, `fixtureKey === "${fixtureKey}"`);
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
