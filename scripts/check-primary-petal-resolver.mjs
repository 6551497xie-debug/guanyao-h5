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
const runtimeTypeSource = fs.readFileSync(path.join(rootDir, "src/runtime/guanyaoRuntimeTypes.ts"), "utf8");
const runtimeEngineSource = fs.readFileSync(path.join(rootDir, "src/runtime/guanyaoRuntimeEngine.ts"), "utf8");
const sceneGraphSource = fs.readFileSync(path.join(rootDir, "src/runtime/sceneGraph.ts"), "utf8");
const smokeFixtureSource = fs.readFileSync(
  path.join(rootDir, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts"),
  "utf8",
);
const primaryPetalDevFixtureSource = fs.readFileSync(
  path.join(rootDir, "src/services/fixtures/primaryPetalDevFixtures.ts"),
  "utf8",
);
const hexagramAssetCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoHexagramAssetCandidateResolver.ts"),
  "utf8",
);
const hexagramAssetDraftCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoHexagramAssetDraftCandidateResolver.ts"),
  "utf8",
);
const hexagramAssetMappingCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoHexagramAssetMappingCandidateResolver.ts"),
  "utf8",
);
const forceTranslationCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoForceTranslationCandidateResolver.ts"),
  "utf8",
);
const assetShellCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoAssetShellCandidateResolver.ts"),
  "utf8",
);
const cardBlueprintCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoCardBlueprintCandidateResolver.ts"),
  "utf8",
);
const assetRenderCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoAssetRenderCandidateResolver.ts"),
  "utf8",
);
const finalAssetCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoFinalAssetCandidateResolver.ts"),
  "utf8",
);
const officialAssetGenerationCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoOfficialAssetGenerationCandidateResolver.ts"),
  "utf8",
);
const officialAssetObjectSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoOfficialAssetObjectResolver.ts"),
  "utf8",
);
const assetCardRenderCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoAssetCardRenderCandidateResolver.ts"),
  "utf8",
);
const assetCardUiCandidateSource = fs.readFileSync(
  path.join(rootDir, "src/services/guanyaoAssetCardUiCandidateResolver.ts"),
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
  assertIncludes(
    "runtime types consume neutral primary petal types",
    runtimeTypeSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "runtime types no longer depend on primary petal service",
    runtimeTypeSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "scene graph consumes neutral primary petal types",
    sceneGraphSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "scene graph no longer depends on primary petal service",
    sceneGraphSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "runtime engine consumes neutral selected pressure context type",
    runtimeEngineSource,
    'import type { SelectedPressureSeedContext } from "../types/primaryPetal"',
  );
  assertIncludes(
    "runtime engine keeps primary petal runtime functions",
    runtimeEngineSource,
    'import { derivePrimaryPetal, toProtocolPrimaryPetal } from "../services/guanyaoPrimaryPetalResolver"',
  );
  assertIncludes(
    "gravity consumes neutral selected pressure context type",
    gravityPageSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "gravity no longer depends on primary petal service types",
    gravityPageSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "change experience smoke fixtures consume neutral primary petal type",
    smokeFixtureSource,
    'from "../../types/primaryPetal"',
  );
  assertNotIncludes(
    "change experience smoke fixtures no longer depend on primary petal service types",
    smokeFixtureSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "primary petal dev fixtures consume neutral primary petal types",
    primaryPetalDevFixtureSource,
    'from "../../types/primaryPetal"',
  );
  assertNotIncludes(
    "primary petal dev fixtures no longer depend on primary petal service types",
    primaryPetalDevFixtureSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "hexagram asset candidate consumes neutral primary petal types",
    hexagramAssetCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertIncludes(
    "hexagram asset candidate keeps primary petal runtime function only",
    hexagramAssetCandidateSource,
    'import { toProtocolPrimaryPetal } from "./guanyaoPrimaryPetalResolver"',
  );
  assertEqual(
    "hexagram asset candidate primary petal service import count",
    hexagramAssetCandidateSource.split("guanyaoPrimaryPetalResolver").length - 1,
    1,
  );
  assertIncludes(
    "hexagram asset draft candidate consumes neutral primary petal type",
    hexagramAssetDraftCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "hexagram asset draft candidate no longer depends on primary petal service",
    hexagramAssetDraftCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "hexagram asset mapping candidate consumes neutral primary petal type",
    hexagramAssetMappingCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "hexagram asset mapping candidate no longer depends on primary petal service",
    hexagramAssetMappingCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "force translation candidate consumes neutral primary petal type",
    forceTranslationCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "force translation candidate no longer depends on primary petal service",
    forceTranslationCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "asset shell candidate consumes neutral primary petal type",
    assetShellCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "asset shell candidate no longer depends on primary petal service",
    assetShellCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "card blueprint candidate consumes neutral primary petal type",
    cardBlueprintCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "card blueprint candidate no longer depends on primary petal service",
    cardBlueprintCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "asset render candidate consumes neutral primary petal type",
    assetRenderCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "asset render candidate no longer depends on primary petal service",
    assetRenderCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "final asset candidate consumes neutral primary petal type",
    finalAssetCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "final asset candidate no longer depends on primary petal service",
    finalAssetCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "official asset generation candidate consumes neutral primary petal type",
    officialAssetGenerationCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "official asset generation candidate no longer depends on primary petal service",
    officialAssetGenerationCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "official asset object consumes neutral primary petal type",
    officialAssetObjectSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "official asset object no longer depends on primary petal service",
    officialAssetObjectSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "asset card render candidate consumes neutral primary petal type",
    assetCardRenderCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "asset card render candidate no longer depends on primary petal service",
    assetCardRenderCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );
  assertIncludes(
    "asset card ui candidate consumes neutral primary petal type",
    assetCardUiCandidateSource,
    'from "../types/primaryPetal"',
  );
  assertNotIncludes(
    "asset card ui candidate no longer depends on primary petal service",
    assetCardUiCandidateSource,
    "guanyaoPrimaryPetalResolver",
  );

  console.log(`\n[PRIMARY PETAL RESOLVER] PASS: ${fixtures.length}/${fixtures.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
