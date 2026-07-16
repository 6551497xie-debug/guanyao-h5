import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  visualGrammar: "docs/GUANYAO_VISUAL_MANIFESTATION_GRAMMAR.md",
  sceneModelProtocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_CONTRACT.md",
  fixtureProtocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_PROTOCOL.md",
  authorizationReview:
    "docs/GUANYAO_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW_PROTOCOL.md",
  protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_RENDER_PLAN_ADAPTER_PROTOCOL.md",
  sceneModelType: "src/types/personalStarBeastSceneModel.ts",
  renderPlanType: "src/types/personalStarBeastRenderPlan.ts",
  adapter: "src/services/personalStarBeastRenderPlanAdapter.ts",
  fixtureData: "src/mocks/starBeastSceneModelFixtures.ts",
  p40Contract: "src/types/starBeastRendererContract.ts",
  p40Adapter: "src/services/starBeastRenderPlanAdapter.ts",
  p40AdapterGate: "scripts/check-star-beast-render-plan-adapter.mjs",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});

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
  if (actual !== expected) {
    failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  } else {
    console.log(`PASS | ${name} | expected=${String(expected)}`);
  }
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  assertIncludes(
    "P0 visual boundary remains",
    source.productConstitution,
    "Identity\n↓\nManifestation\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P1 formal identity remains",
    source.lifeConstitution,
    "PersonalStarBeastIdentity",
  );
  assertIncludes(
    "P92 grammar remains identity downstream",
    source.visualGrammar,
    "Identity\n↓\nManifestation Grammar\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P94 requires a future P40 adapter",
    source.sceneModelProtocol,
    "Future P40 Adapter",
  );
  assertIncludes(
    "P96 freezes same grammar different life",
    source.fixtureProtocol,
    "同一语法、不同生命",
  );
  assertIncludes(
    "P95 keeps WebGL unauthorized",
    source.authorizationReview,
    "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION",
  );

  [
    "export type PersonalStarBeastRenderExpressionChannel",
    "export type PersonalStarBeastRenderExpressionReference",
    "export type PersonalStarBeastRenderPlan",
    "export type PersonalStarBeastRenderPlanAdapterResult",
    "export type PersonalStarBeastRenderPlanAdapterBoundary",
    'semanticRole: "PERSONAL_STAR_BEAST_RENDER_PLAN"',
    "manifestationStage:",
    "spatialExpression:",
    "fieldBehavior:",
    "lightExpression:",
    "motionExpression:",
    "crystalExpression:",
    "qualityProfile:",
    "fallbackProfile:",
    'canvas: "SEMANTIC_2D_FALLBACK"',
    'static: "SEMANTIC_STATIC_FALLBACK"',
    "identityBlind: true",
    "rendererNeutral: true",
    "noIdentityCalculation: true",
    "noPixelOutput: true",
    "noDrawCommands: true",
    "noRendererInvocation: true",
    "noWebGLActivation: true",
  ].forEach((marker) =>
    assertIncludes("P97 RenderPlan contract", source.renderPlanType, marker),
  );

  [
    "mansionName",
    "fourSymbolName",
    "motherCodeId",
    "lifeArchetypeId",
    "animalIdentity",
    "birthData",
    "userIdentity",
  ].forEach((field) =>
    assertExcludes("RenderPlan excludes identity field", source.renderPlanType, field),
  );

  [
    "export function adaptPersonalStarBeastSceneModelToRenderPlan",
    "createOpaqueReferenceId",
    'referenceType: "PERSONAL_STAR_BEAST_RENDER_EXPRESSION"',
    'expressionMode: "DECLARED_STAGE_REFERENCE"',
    '"STRUCTURE_DENSITY"',
    '"ANCHOR_BEHAVIOR"',
    '"FORMATION_PATTERN"',
    '"SPATIAL_BIAS"',
    '"BOUNDARY_BEHAVIOR"',
    '"FLOW_DIRECTION"',
    '"ENERGY_RHYTHM"',
    '"CORE_BEHAVIOR"',
    '"AGGREGATION_MODE"',
    '"CRYSTAL_IMPRINT"',
    "noAnimalSilhouetteInstruction: true",
    "baseStructureInvariant: true",
    "sourceSceneModelReference: sceneModel",
    "plan,",
  ].forEach((marker) =>
    assertIncludes("P97 semantic adapter", source.adapter, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "resolvePersonalStarBeastManifestationReadiness",
    "adaptStarBeastRendererInputToRenderPlan",
    "consumeStarBeastRenderPlan",
    "requestAnimationFrame",
    "getContext(",
    "WebGLRenderingContext",
    'from "three"',
    "@react-three/fiber",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("adapter stays identity and backend neutral", source.adapter, marker),
  );

  [
    "GUANYAO Personal Star Beast Render Plan Adapter Protocol V1.0",
    "SEMANTIC ADAPTER ONLY / RENDERER NOT AUTHORIZED / WEBGL NOT ACTIVATED",
    "RenderPlan 不是生命层，不是视觉资产，也不是 Renderer",
    "P97 不修改、不覆盖、不替换 P40",
    "计划本体禁止包含",
    "不可逆的 Renderer-neutral 表达令牌",
    "Mansion Seed → Spatial Expression",
    "Four Symbol Field → Field Behavior",
    "Life Force → Light / Motion Expression",
    "Crystal Trace",
    "同一个 `adaptPersonalStarBeastSceneModelToRenderPlan`",
    "Renderer：`NOT_AUTHORIZED`",
    "WebGL：`NOT_ACTIVATED`",
    "RenderPlan → WebGL Prototype Authorization Review",
  ].forEach((marker) =>
    assertIncludes("P97 protocol", source.protocol, marker),
  );

  [
    "PersonalStarBeastRenderPlan",
    "PersonalStarBeastRenderPlanAdapterResult",
    'from "./personalStarBeastRenderPlan"',
  ].forEach((marker) =>
    assertIncludes("type index exports P97 contract", source.typeIndex, marker),
  );

  [
    'semanticRole: "STAR_BEAST_RENDER_PLAN"',
    "rendererNeutral: true",
    "semanticChannelsOnly: true",
    "noDrawCommands: true",
  ].forEach((marker) =>
    assertIncludes("P40 contract remains intact", source.p40Contract, marker),
  );
  assertIncludes(
    "P40 adapter remains intact",
    source.p40Adapter,
    "export function adaptStarBeastRendererInputToRenderPlan",
  );
  assertExcludes(
    "P40 adapter does not consume P97",
    source.p40Adapter,
    "PersonalStarBeastRenderPlan",
  );
  assertIncludes(
    "P40 ownership gate distinguishes the Personal specialization",
    source.p40AdapterGate,
    '.replaceAll("personalStarBeastRenderPlan", "")',
  );

  const dependencies = Object.freeze({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });
  if (!Object.hasOwn(dependencies, "three")) {
    failures.push("P99 authorized Three.js dependency is required");
  } else {
    console.log("PASS | P97 stays Three.js-neutral despite P99 installation");
  }
  if (Object.hasOwn(dependencies, "@react-three/fiber")) {
    failures.push("React Three Fiber remains outside P99 scope");
  } else {
    console.log("PASS | React Three Fiber remains absent");
  }

  const srcFiles = [];
  const collectSourceFiles = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collectSourceFiles(entryPath);
      else if (/\.tsx?$/.test(entry.name)) srcFiles.push(entryPath);
    }
  };
  collectSourceFiles(path.join(rootDir, "src"));
  const adapterCallSites = srcFiles
    .filter((filePath) =>
      fs
        .readFileSync(filePath, "utf8")
        .includes("adaptPersonalStarBeastSceneModelToRenderPlan("),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P97 adapter has no Production consumer and only isolated consumers",
    adapterCallSites.join(","),
    [files.adapter, "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx"]
      .sort()
      .join(","),
  );

  assertIncludes(
    "P97 gate registered",
    packageJson.scripts?.["check-personal-star-beast-render-plan-adapter"] ?? "",
    "node scripts/check-personal-star-beast-render-plan-adapter.mjs",
  );
  assertIncludes(
    "release includes P97 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-personal-star-beast-render-plan-adapter",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-personal-star-beast-render-plan-adapter-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export {
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
        } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { validatePersonalStarBeastSceneModelFixturePair } from "./src/services/personalStarBeastSceneModelFixtureValidation.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "personal-star-beast-render-plan-adapter-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const caseA = runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A;
  const caseB = runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B;
  const fixtureValidation = runtime.validatePersonalStarBeastSceneModelFixturePair(
    Object.freeze([caseA, caseB]),
  );
  assertEqual("P96 pair remains valid", fixtureValidation.status, "VALID");
  assertEqual(
    "P96 grammar reference remains shared",
    caseA.sceneModelReference.sourceManifestationGrammarReference.referenceId,
    caseB.sceneModelReference.sourceManifestationGrammarReference.referenceId,
  );

  const beforeA = JSON.stringify(caseA.sceneModelReference);
  const beforeB = JSON.stringify(caseB.sceneModelReference);
  const resultA = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    caseA.sceneModelReference,
  );
  const resultB = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    caseB.sceneModelReference,
  );
  assertEqual("case A produces a plan", resultA.status, "PLANNED");
  assertEqual("case B produces a plan", resultB.status, "PLANNED");
  assertEqual(
    "adapter does not mutate case A",
    JSON.stringify(caseA.sceneModelReference) === beforeA,
    true,
  );
  assertEqual(
    "adapter does not mutate case B",
    JSON.stringify(caseB.sceneModelReference) === beforeB,
    true,
  );

  if (resultA.status === "PLANNED" && resultB.status === "PLANNED") {
    const planA = resultA.plan;
    const planB = resultB.plan;
    const collectKeys = (value, keys = []) => {
      if (value === null || typeof value !== "object") return keys;
      for (const [key, nested] of Object.entries(value)) {
        keys.push(key);
        collectKeys(nested, keys);
      }
      return keys;
    };
    const planKeys = Object.freeze([...collectKeys(planA), ...collectKeys(planB)]);
    [
      "mansionName",
      "fourSymbolName",
      "motherCodeId",
      "lifeArchetypeId",
      "animalIdentity",
      "birthData",
      "userIdentity",
      "sourceSceneModelReference",
      "sourceIdentityReference",
    ].forEach((field) =>
      assertEqual(`runtime RenderPlan excludes ${field}`, planKeys.includes(field), false),
    );
    assertEqual("case A plan is frozen", Object.isFrozen(planA), true);
    assertEqual("case B plan is frozen", Object.isFrozen(planB), true);
    assertEqual("case A plan is identity blind", planA.identityBlind, true);
    assertEqual("case B plan is identity blind", planB.identityBlind, true);
    assertEqual(
      "different Scene Models produce different RenderPlans",
      JSON.stringify(planA) !== JSON.stringify(planB),
      true,
    );
    assertEqual(
      "mansion semantics produce different spatial plans",
      JSON.stringify(planA.spatialExpression) !==
        JSON.stringify(planB.spatialExpression),
      true,
    );
    assertEqual(
      "four symbol semantics produce different field plans",
      JSON.stringify(planA.fieldBehavior) !== JSON.stringify(planB.fieldBehavior),
      true,
    );
    assertEqual(
      "life force semantics produce different motion plans",
      JSON.stringify(planA.motionExpression) !==
        JSON.stringify(planB.motionExpression),
      true,
    );
    const repeatedA = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
      caseA.sceneModelReference,
    );
    assertEqual(
      "same Scene Model produces deterministic RenderPlan",
      repeatedA.status === "PLANNED" &&
        JSON.stringify(repeatedA.plan) === JSON.stringify(planA),
      true,
    );
    console.log(
      `INFO | case A plan | spatial=${planA.spatialExpression.structureDensity.referenceId} | field=${planA.fieldBehavior.spatialBias.referenceId} | motion=${planA.motionExpression.energyRhythm.referenceId}`,
    );
    console.log(
      `INFO | case B plan | spatial=${planB.spatialExpression.structureDensity.referenceId} | field=${planB.fieldBehavior.spatialBias.referenceId} | motion=${planB.motionExpression.energyRhythm.referenceId}`,
    );
  }

  const missing = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(null);
  assertEqual("missing Scene Model is blocked", missing.status, "BLOCKED");
  assertEqual("missing Scene Model reason", missing.reason, "SCENE_MODEL_REQUIRED");
  const invalidBoundary = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    Object.freeze({
      ...caseA.sceneModelReference,
      rendererNeutral: false,
    }),
  );
  assertEqual("invalid Scene Model boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual(
    "invalid Scene Model boundary reason",
    invalidBoundary.reason,
    "SCENE_MODEL_BOUNDARY_INVALID",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Personal Star Beast Render Plan Adapter gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Personal Star Beast Render Plan Adapter gate passed.");
