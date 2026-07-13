import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-primary-petal-resolver-"));
const gravityPageSource = fs.readFileSync(path.join(rootDir, "src/pages/GravityPage.tsx"), "utf8");
const resolverSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoPrimaryPetalResolver.ts"),
  "utf8",
);
const primaryPetalTypeSource = fs.readFileSync(path.join(rootDir, "src/types/primaryPetal.ts"), "utf8");
const gravityRuntimeInputTypeSource = fs.readFileSync(
  path.join(rootDir, "src/types/gravityRuntimeInput.ts"),
  "utf8",
);
const sourceFiles = [
  "src/services/guanyaoPrimaryPetalResolver.ts",
  "src/services/fixtures/primaryPetalDevFixtures.ts",
];

const transpileToTemp = (sourcePath) => {
  const source = fs.readFileSync(path.join(rootDir, sourcePath), "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const outputPath = path.join(tempRoot, `${path.basename(sourcePath, ".ts")}.cjs`);
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

const fixtureNames = {
  body: "body / somatic pressure",
  emotion: "emotion / relationship disturbance",
  thought: "thought / explanation loop",
  behavior: "behavior / action block",
  memory: "memory / past echo",
  motivation: "motivation / direction loss",
};

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { derivePrimaryPetal, toProtocolPrimaryPetal } = requireFromTemp("./guanyaoPrimaryPetalResolver.cjs");
  const { primaryPetalDevFixtures, resolvePrimaryPetalDevFixture } = requireFromTemp(
    "./primaryPetalDevFixtures.cjs",
  );
  const fixtures = Object.entries(primaryPetalDevFixtures);

  assertEqual("primary petal dev fixture count", fixtures.length, 6);
  assertEqual("primary petal dev fixture key uniqueness", new Set(fixtures.map(([key]) => key)).size, 6);

  fixtures.forEach(([expected, context]) => {
    const actual = toProtocolPrimaryPetal(derivePrimaryPetal(context));
    assertEqual(fixtureNames[expected], actual, expected);
    assertEqual(`${expected} dev fixture resolver`, resolvePrimaryPetalDevFixture(expected) === context, true);
  });

  assertEqual("unknown dev fixture stays disconnected", resolvePrimaryPetalDevFixture("unknown"), null);
  assertIncludes(
    "gravity consumes centralized primary petal dev fixture",
    gravityPageSource,
    "resolvePrimaryPetalDevFixture(fixtureKey)",
  );
  assertNotIncludes(
    "gravity no longer owns primary petal dev fixtures",
    gravityPageSource,
    "DEV_PRIMARY_PETAL_FIXTURES",
  );
  assertIncludes(
    "neutral primary petal types own primary petal id",
    primaryPetalTypeSource,
    "export type PrimaryPetalId =",
  );
  assertIncludes(
    "neutral primary petal types own protocol dimension",
    primaryPetalTypeSource,
    "export type PrimaryPetalProtocolDimension =",
  );
  assertIncludes(
    "neutral primary petal types own selected pressure context",
    primaryPetalTypeSource,
    "export type SelectedPressureSeedContext =",
  );
  assertIncludes(
    "primary petal resolver re-exports neutral types",
    resolverSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "primary petal resolver no longer owns selected pressure context type",
    resolverSource,
    "export type SelectedPressureSeedContext =",
  );
  assertIncludes(
    "gravity runtime input consumes neutral primary petal type",
    gravityRuntimeInputTypeSource,
    'from "./primaryPetal"',
  );
  assertNotIncludes(
    "gravity runtime input no longer depends on primary petal service",
    gravityRuntimeInputTypeSource,
    "guanyaoPrimaryPetalResolver",
  );

  console.log(`\n[PRIMARY PETAL RESOLVER] PASS: ${fixtures.length}/${fixtures.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
