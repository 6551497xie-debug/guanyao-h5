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
  p97Protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_RENDER_PLAN_ADAPTER_PROTOCOL.md",
  p98Protocol:
    "docs/GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_PROTOCOL.md",
  protocol:
    "docs/GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_SLICE_PROTOCOL.md",
  prototypeType: "src/types/isolatedWebGLRendererPrototype.ts",
  rendererCoreType: "src/types/genesisWebGLRendererCore.ts",
  prototype:
    "src/prototypes/isolatedWebGLRendererPrototype.ts",
  rendererCore:
    "src/renderers/genesisWebGLRendererCore.ts",
  planReference:
    "src/services/isolatedWebGLPrototypeRenderPlanReference.ts",
  authorizationService:
    "src/services/isolatedWebGLRendererPrototypeAuthorizationService.ts",
  typeIndex: "src/types/index.ts",
  starbeastLab: "src/pages/StarbeastLab.tsx",
  genesisPreview: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  app: "src/App.tsx",
  previewRoutes: "src/router/previewRoutes.ts",
  productionRoutes: "src/routes/guanyaoRoutes.ts",
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

const listSourceFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(entryPath);
    return /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);
  const dependencies = Object.freeze({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });

  assertIncludes(
    "P0 keeps identity upstream of Renderer",
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
    "P97 supplies identity-blind RenderPlan",
    source.p97Protocol,
    "只表达“如何表现”，不表达“它是谁”",
  );
  assertIncludes(
    "P98 explicitly authorizes the first isolated experiment",
    source.p98Protocol,
    "AUTHORIZED_FOR_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE",
  );

  [
    "export type IsolatedWebGLRendererPrototypeSceneProjection",
    "export type IsolatedWebGLRendererPrototypeInput",
    "export type IsolatedWebGLRendererPrototypeController",
    "export type IsolatedWebGLRendererPrototypeFallback",
    "export type IsolatedWebGLRendererPrototypeResult",
    "export type IsolatedWebGLRendererPrototypeBoundary",
    'semanticRole: "ISOLATED_WEBGL_LIFE_MANIFESTATION_SCENE"',
    'mode: "SEMANTIC_STATIC_FALLBACK"',
    "identityBlind: true",
    "renderPlanOnly: true",
    "authorizationRequired: true",
    "manualFrameDriverOnly: true",
    "noAnimationLoopOwnership: true",
    "noProductionIntegration: true",
    "noUIIntegration: true",
    "noFormalUserIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes(
      "P99 prototype-compatible shared contract",
      `${source.prototypeType}\n${source.rendererCoreType}`,
      marker,
    ),
  );

  [
    "export function projectPersonalStarBeastRenderPlanToWebGLScene",
    'from "three"',
    "new WebGLRenderer",
    'getContext("webgl2"',
    "new Scene()",
    "new PerspectiveCamera",
    "new Points",
    "new Line",
    "new Mesh",
    "new PointLight",
    "renderer.render(scene, camera)",
    'addEventListener("webglcontextlost"',
    'addEventListener("webglcontextrestored"',
    "renderFrame:",
    "resize:",
    "dispose:",
    'status: "FALLBACK_REQUIRED"',
  ].forEach((marker) =>
    assertIncludes("P99 shared visual implementation", source.rendererCore, marker),
  );

  [
    "export function createIsolatedWebGLRendererPrototype",
    "createGenesisWebGLRendererCore",
    'return blocked("AUTHORIZATION_REQUIRED")',
    'return blocked("RENDER_PLAN_NOT_AUTHORIZED")',
  ].forEach((marker) =>
    assertIncludes("P99 isolated renderer facade", source.prototype, marker),
  );

  [
    "requestAnimationFrame",
    "setAnimationLoop",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "fourSymbol",
    "MotherCode",
    "mansionName",
    "animalIdentity",
    "localStorage",
    "sessionStorage",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) =>
    assertExcludes(
      "P99 Renderer stays identity blind",
      `${source.prototype}\n${source.rendererCore}`,
      marker,
    ),
  );

  [
    "GUANYAO Isolated WebGL Renderer Prototype Slice Protocol V1.0",
    "EXPERIMENT ONLY / NO PRODUCTION / NO UI / NO FORMAL USER",
    "P97 PersonalStarBeastRenderPlan",
    "P98 `GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_V1`",
    "Renderer-neutral Scene Projection",
    "Three.js / WebGL2",
    "帧驱动权留给未来独立 Prototype Harness",
    "webglcontextlost",
    "SEMANTIC_STATIC_FALLBACK",
    "自动 gate 不执行真实 GPU 截图验收",
    "RC-ISOLATED-WEBGL-RENDERER-HARNESS-P100",
  ].forEach((marker) =>
    assertIncludes("P99 protocol", source.protocol, marker),
  );

  assertIncludes(
    "shared authorization reference is exported",
    source.planReference,
    "export function createIsolatedWebGLPrototypeRenderPlanReference",
  );
  assertIncludes(
    "P98 uses shared plan reference",
    source.authorizationService,
    "createIsolatedWebGLPrototypeRenderPlanReference",
  );
  assertIncludes(
    "type index exports P99 contract",
    source.typeIndex,
    'from "./isolatedWebGLRendererPrototype"',
  );

  assertEqual(
    "Three.js dependency is activated",
    Object.hasOwn(dependencies, "three"),
    true,
  );
  assertEqual(
    "Three.js types are present",
    Object.hasOwn(dependencies, "@types/three"),
    true,
  );
  assertEqual(
    "React Three Fiber remains outside P99",
    Object.hasOwn(dependencies, "@react-three/fiber"),
    false,
  );

  const threeImportSites = listSourceFiles(path.join(rootDir, "src"))
    .filter((filePath) =>
      fs.readFileSync(filePath, "utf8").includes('from "three"'),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "Three.js exists only in shared P99 renderer core",
    threeImportSites.join(","),
    files.rendererCore,
  );

  [
    ["StarbeastLab", source.starbeastLab],
    ["Genesis Preview", source.genesisPreview],
    ["App", source.app],
    ["preview routes", source.previewRoutes],
    ["Production routes", source.productionRoutes],
  ].forEach(([name, consumerSource]) => {
    [
      "isolatedWebGLRendererPrototype",
      "createIsolatedWebGLRendererPrototype",
      'from "three"',
    ].forEach((marker) =>
      assertExcludes(`${name} does not consume P99`, consumerSource, marker),
    );
  });

  assertIncludes(
    "P99 gate registered",
    packageJson.scripts?.["check-isolated-webgl-renderer-prototype-slice"] ??
      "",
    "node scripts/check-isolated-webgl-renderer-prototype-slice.mjs",
  );
  assertIncludes(
    "release includes P99 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-isolated-webgl-renderer-prototype-slice",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-isolated-webgl-renderer-prototype-slice-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export {
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
        } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { authorizeIsolatedWebGLRendererPrototype } from "./src/services/isolatedWebGLRendererPrototypeAuthorizationService.ts";
        export {
          createIsolatedWebGLRendererPrototype,
          projectPersonalStarBeastRenderPlanToWebGLScene,
        } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "isolated-webgl-renderer-prototype-slice-gate-entry.ts",
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
  const resultA = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.sceneModelReference,
  );
  const resultB = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B.sceneModelReference,
  );
  assertEqual("case A produces P97 plan", resultA.status, "PLANNED");
  assertEqual("case B produces P97 plan", resultB.status, "PLANNED");

  const reviewReference = Object.freeze({
    referenceType: "ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW",
    protocolId: "RC-EXPLICIT-WEBGL-PROTOTYPE-AUTHORIZATION-REVIEW-P95",
    recommendation:
      "RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION",
    priorExecutionStatus: "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION",
  });
  const authorityReference = Object.freeze({
    referenceType: "ISOLATED_WEBGL_PROTOTYPE_EXPLICIT_AUTHORITY",
    authority: "TOTAL_CONTROL_EXPLICIT_DECISION",
    decision: "AUTHORIZE_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE",
    decisionReferenceId: "RC-ISOLATED-WEBGL-RENDERER-PROTOTYPE-AUTHORIZATION-P98",
  });
  const authorizationResult = runtime.authorizeIsolatedWebGLRendererPrototype(
    Object.freeze({
      authorizationReviewReference: reviewReference,
      explicitAuthorityReference: authorityReference,
      renderPlanResults: Object.freeze([resultA, resultB]),
      prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY",
    }),
  );
  assertEqual(
    "P98 authorization remains valid",
    authorizationResult.status,
    "AUTHORIZED",
  );

  if (
    resultA.status === "PLANNED" &&
    resultB.status === "PLANNED" &&
    authorizationResult.status === "AUTHORIZED"
  ) {
    const planA = resultA.plan;
    const planB = resultB.plan;
    const authorization = authorizationResult.authorization;
    const projectionA = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
      planA,
    );
    const projectionB = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
      planB,
    );
    const repeatedA = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
      planA,
    );
    assertEqual("projection A is identity blind", projectionA.identityBlind, true);
    assertEqual("projection B is identity blind", projectionB.identityBlind, true);
    assertEqual(
      "projection is deterministic",
      JSON.stringify(repeatedA),
      JSON.stringify(projectionA),
    );
    assertEqual(
      "different formal plans produce different scene projections",
      JSON.stringify(projectionA) !== JSON.stringify(projectionB),
      true,
    );
    assertEqual(
      "mansion projection differs",
      JSON.stringify(projectionA.mansionStructure) !==
        JSON.stringify(projectionB.mansionStructure),
      true,
    );
    assertEqual(
      "field projection differs",
      JSON.stringify(projectionA.formField) !==
        JSON.stringify(projectionB.formField),
      true,
    );
    assertEqual(
      "life core projection differs",
      JSON.stringify(projectionA.lifeCore) !==
        JSON.stringify(projectionB.lifeCore),
      true,
    );

    const baseInput = Object.freeze({
      canvas: null,
      renderPlan: planA,
      authorization,
      width: 390,
      height: 844,
      pixelRatio: 2,
      reducedMotion: false,
    });
    const missingAuthorization = runtime.createIsolatedWebGLRendererPrototype(
      Object.freeze({ ...baseInput, authorization: null }),
    );
    assertEqual(
      "missing authorization blocks Renderer",
      missingAuthorization.status,
      "BLOCKED",
    );
    assertEqual(
      "missing authorization reason",
      missingAuthorization.reason,
      "AUTHORIZATION_REQUIRED",
    );

    const missingCanvas = runtime.createIsolatedWebGLRendererPrototype(baseInput);
    assertEqual(
      "missing Canvas selects semantic fallback",
      missingCanvas.status,
      "FALLBACK_REQUIRED",
    );
    assertEqual(
      "missing Canvas fallback reason",
      missingCanvas.fallback.reason,
      "CANVAS_REQUIRED",
    );

    const reducedMotion = runtime.createIsolatedWebGLRendererPrototype(
      Object.freeze({ ...baseInput, reducedMotion: true }),
    );
    assertEqual(
      "reduced motion selects semantic fallback",
      reducedMotion.status,
      "FALLBACK_REQUIRED",
    );
    assertEqual(
      "reduced motion fallback reason",
      reducedMotion.fallback.reason,
      "REDUCED_MOTION_REQUESTED",
    );

    const noWebGLCanvas = Object.freeze({
      getContext: () => null,
    });
    const noWebGL = runtime.createIsolatedWebGLRendererPrototype(
      Object.freeze({ ...baseInput, canvas: noWebGLCanvas }),
    );
    assertEqual(
      "missing WebGL2 selects semantic fallback",
      noWebGL.status,
      "FALLBACK_REQUIRED",
    );
    assertEqual(
      "missing WebGL2 fallback reason",
      noWebGL.fallback.reason,
      "WEBGL2_UNAVAILABLE",
    );

    const invalidViewport = runtime.createIsolatedWebGLRendererPrototype(
      Object.freeze({ ...baseInput, width: 0 }),
    );
    assertEqual("invalid viewport is blocked", invalidViewport.status, "BLOCKED");
    assertEqual(
      "invalid viewport reason",
      invalidViewport.reason,
      "VIEWPORT_INVALID",
    );
    const invalidPixelRatio = runtime.createIsolatedWebGLRendererPrototype(
      Object.freeze({ ...baseInput, pixelRatio: Number.NaN }),
    );
    assertEqual(
      "invalid pixel ratio is blocked",
      invalidPixelRatio.status,
      "BLOCKED",
    );
    assertEqual(
      "invalid pixel ratio reason",
      invalidPixelRatio.reason,
      "VIEWPORT_INVALID",
    );

    const unauthorizedPlan = Object.freeze({
      ...planA,
      qualityProfile: Object.freeze({
        ...planA.qualityProfile,
        expressionReference: Object.freeze({
          ...planA.qualityProfile.expressionReference,
          referenceId: "psb-expression:unauthorized-plan",
        }),
      }),
    });
    const planNotAuthorized = runtime.createIsolatedWebGLRendererPrototype(
      Object.freeze({ ...baseInput, renderPlan: unauthorizedPlan }),
    );
    assertEqual(
      "unbound RenderPlan is blocked",
      planNotAuthorized.status,
      "BLOCKED",
    );
    assertEqual(
      "unbound RenderPlan reason",
      planNotAuthorized.reason,
      "RENDER_PLAN_NOT_AUTHORIZED",
    );

    console.log(
      `INFO | P99 projection pair | A=${projectionA.sourceRenderPlanReferenceId} particles=${projectionA.cosmicField.particleCount} anchors=${projectionA.mansionStructure.anchorCount} | B=${projectionB.sourceRenderPlanReferenceId} particles=${projectionB.cosmicField.particleCount} anchors=${projectionB.mansionStructure.anchorCount}`,
    );
  }

  fs.unlinkSync(modulePath);
}

if (failures.length > 0) {
  console.error("\nIsolated WebGL Renderer Prototype Slice gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nIsolated WebGL Renderer Prototype Slice gate passed.");
