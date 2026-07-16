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
  p95Review: "docs/GUANYAO_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW_PROTOCOL.md",
  p96Protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_PROTOCOL.md",
  p97Protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_RENDER_PLAN_ADAPTER_PROTOCOL.md",
  protocol:
    "docs/GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_PROTOCOL.md",
  p97Type: "src/types/personalStarBeastRenderPlan.ts",
  authorizationType:
    "src/types/isolatedWebGLRendererPrototypeAuthorization.ts",
  authorizationService:
    "src/services/isolatedWebGLRendererPrototypeAuthorizationService.ts",
  fixtureData: "src/mocks/starBeastSceneModelFixtures.ts",
  renderPlanAdapter: "src/services/personalStarBeastRenderPlanAdapter.ts",
  typeIndex: "src/types/index.ts",
  p40Contract: "src/types/starBeastRendererContract.ts",
  starbeastLab: "src/pages/StarbeastLab.tsx",
  genesisPreview: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  packageManifest: "package.json",
});

const forbiddenImplementationPaths = Object.freeze([
  "src/renderers/personalStarBeastWebGLRenderer.ts",
  "src/renderers/isolatedWebGLRendererPrototype.ts",
  "src/prototypes/isolatedWebGLRendererPrototype.ts",
  "src/services/personalStarBeastWebGLRenderer.ts",
]);

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

for (const relativePath of forbiddenImplementationPaths) {
  if (fs.existsSync(path.join(rootDir, relativePath))) {
    failures.push(`P98 must not create Renderer implementation=${relativePath}`);
  } else {
    console.log(`PASS | Renderer implementation remains absent | ${relativePath}`);
  }
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
    "P95 recommends explicit isolated authorization",
    source.p95Review,
    "RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION",
  );
  assertIncludes(
    "P95 prior state requires total control decision",
    source.p95Review,
    "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION",
  );
  assertIncludes(
    "P96 supplies two formal cases",
    source.p96Protocol,
    "同一语法、不同生命",
  );
  assertIncludes(
    "P97 supplies identity-blind plans",
    source.p97Protocol,
    "计划本体禁止包含",
  );
  assertIncludes(
    "P97 remains renderer neutral",
    source.p97Type,
    "identityBlind: true",
  );

  [
    "export type IsolatedWebGLPrototypeAuthorizationReviewReference",
    "export type IsolatedWebGLPrototypeExplicitAuthorityReference",
    "export type IsolatedWebGLPrototypeRenderPlanReference",
    "export type IsolatedWebGLRendererPrototypeAuthorizationInput",
    "export type IsolatedWebGLRendererPrototypeAuthorization",
    "export type IsolatedWebGLRendererPrototypeAuthorizationResult",
    "export type IsolatedWebGLRendererPrototypeAuthorizationBoundary",
    'protocolId: "RC-EXPLICIT-WEBGL-PROTOTYPE-AUTHORIZATION-REVIEW-P95"',
    'decision: "AUTHORIZE_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE"',
    'prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY"',
    'classification: "EXPERIMENT"',
    'authorizedInput: "PERSONAL_STAR_BEAST_RENDER_PLAN_ONLY"',
    'backendCandidate: "THREE_JS_WEBGL2"',
    'implementationStatus: "AUTHORIZED_NOT_IMPLEMENTED"',
    'backendActivationStatus: "AUTHORIZED_NOT_ACTIVATED"',
    'productionStatus: "FORBIDDEN"',
    'uiIntegrationStatus: "FORBIDDEN"',
    'formalUserStatus: "FORBIDDEN"',
    "noRendererImplementation: true",
    "noDependencyInstallation: true",
    "noBackendActivation: true",
    "noProductionIntegration: true",
    "noUIIntegration: true",
    "noFormalUserIntegration: true",
  ].forEach((marker) =>
    assertIncludes("P98 authorization contract", source.authorizationType, marker),
  );

  [
    "export function authorizeIsolatedWebGLRendererPrototype",
    '"AUTHORIZATION_REVIEW_REFERENCE_REQUIRED"',
    '"EXPLICIT_AUTHORITY_REFERENCE_REQUIRED"',
    '"TWO_RENDER_PLAN_RESULTS_REQUIRED"',
    '"AUTHORIZATION_REVIEW_INVALID"',
    '"EXPLICIT_AUTHORITY_DECISION_INVALID"',
    '"PROTOTYPE_SCOPE_INVALID"',
    '"RENDER_PLAN_RESULT_NOT_PLANNED"',
    '"RENDER_PLAN_BOUNDARY_INVALID"',
    '"RENDER_PLAN_PAIR_NOT_DISTINCT"',
    "leftResult.status !== \"PLANNED\"",
    "leftResult.boundary.outputPlanIsIdentityBlind !== true",
    "plan.identityBlind === true",
    "plan.noIdentityCalculation === true",
    "plan.noRendererInvocation === true",
    'status: "AUTHORIZED"',
    'classification: "EXPERIMENT"',
    'implementationStatus: "AUTHORIZED_NOT_IMPLEMENTED"',
    'backendActivationStatus: "AUTHORIZED_NOT_ACTIVATED"',
  ].forEach((marker) =>
    assertIncludes("P98 authorization service", source.authorizationService, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "adaptPersonalStarBeastSceneModelToRenderPlan",
    "WebGLRenderingContext",
    "WebGL2RenderingContext",
    "new WebGLRenderer",
    "requestAnimationFrame",
    "getContext(",
    'from "three"',
    "@react-three/fiber",
    "CanvasRenderingContext2D",
    "localStorage",
    "sessionStorage",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) =>
    assertExcludes("authorization does not implement or infer", source.authorizationService, marker),
  );

  [
    "GUANYAO Isolated WebGL Renderer Prototype Authorization Protocol V1.0",
    "AUTHORIZED_FOR_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE",
    "AUTHORIZED_NOT_IMPLEMENTED / AUTHORIZED_NOT_ACTIVATED",
    "EXPERIMENT ONLY / NO PRODUCTION / NO UI / NO FORMAL USER",
    "P97 PersonalStarBeastRenderPlan 是否能够被技术转换为具有生命显化感的视觉体验",
    "授权不等于实现，授权不等于激活，实验不等于产品能力",
    "TOTAL_CONTROL_EXPLICIT_DECISION",
    "PERSONAL_STAR_BEAST_RENDER_PLAN_ONLY",
    "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY",
    "THREE_JS_WEBGL2",
    "未来实验只能接收 P97 的 `plan`",
    "implementationStatus: AUTHORIZED_NOT_IMPLEMENTED",
    "backendActivationStatus: AUTHORIZED_NOT_ACTIVATED",
    "Canvas 2D Semantic Fallback",
    "Static Accessible Fallback",
    "RC-ISOLATED-WEBGL-RENDERER-PROTOTYPE-SLICE-P99",
  ].forEach((marker) =>
    assertIncludes("P98 authorization protocol", source.protocol, marker),
  );

  [
    "IsolatedWebGLRendererPrototypeAuthorization",
    "IsolatedWebGLRendererPrototypeAuthorizationResult",
    'from "./isolatedWebGLRendererPrototypeAuthorization"',
  ].forEach((marker) =>
    assertIncludes("type index exports P98 contract", source.typeIndex, marker),
  );

  [
    'semanticRole: "STAR_BEAST_RENDER_PLAN"',
    "rendererNeutral: true",
    "noDrawCommands: true",
  ].forEach((marker) =>
    assertIncludes("P40 remains unchanged", source.p40Contract, marker),
  );

  const dependencies = Object.freeze({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });
  ["three", "@react-three/fiber"].forEach((dependency) => {
    if (Object.hasOwn(dependencies, dependency)) {
      failures.push(`P98 must not install dependency=${dependency}`);
    } else {
      console.log(`PASS | WebGL dependency remains absent | ${dependency}`);
    }
  });

  [source.starbeastLab, source.genesisPreview].forEach((pageSource, index) => {
    const pageName = index === 0 ? "StarbeastLab" : "Genesis Preview";
    [
      "authorizeIsolatedWebGLRendererPrototype",
      "isolatedWebGLRendererPrototypeAuthorizationService",
      'from "three"',
      "@react-three/fiber",
      "WebGLRenderer",
    ].forEach((marker) =>
      assertExcludes(`${pageName} remains outside P98`, pageSource, marker),
    );
  });

  const srcFiles = [];
  const collectSourceFiles = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collectSourceFiles(entryPath);
      else if (/\.tsx?$/.test(entry.name)) srcFiles.push(entryPath);
    }
  };
  collectSourceFiles(path.join(rootDir, "src"));
  const authorizationCallSites = srcFiles
    .filter((filePath) =>
      fs
        .readFileSync(filePath, "utf8")
        .includes("authorizeIsolatedWebGLRendererPrototype("),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P98 authorization has no Production consumer",
    authorizationCallSites.join(","),
    files.authorizationService,
  );

  assertIncludes(
    "P98 gate registered",
    packageJson.scripts?.["check-isolated-webgl-renderer-prototype-authorization"] ?? "",
    "node scripts/check-isolated-webgl-renderer-prototype-authorization.mjs",
  );
  assertIncludes(
    "release includes P98 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-isolated-webgl-renderer-prototype-authorization",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-isolated-webgl-renderer-prototype-authorization-${process.pid}.mjs`,
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
      `,
      resolveDir: rootDir,
      sourcefile: "isolated-webgl-renderer-prototype-authorization-gate-entry.ts",
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
  const planResultA = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    caseA.sceneModelReference,
  );
  const planResultB = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    caseB.sceneModelReference,
  );
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
  const input = Object.freeze({
    authorizationReviewReference: reviewReference,
    explicitAuthorityReference: authorityReference,
    renderPlanResults: Object.freeze([planResultA, planResultB]),
    prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY",
  });
  const before = JSON.stringify(input);
  const result = runtime.authorizeIsolatedWebGLRendererPrototype(input);
  assertEqual("P98 explicit decision authorizes experiment", result.status, "AUTHORIZED");
  assertEqual("P98 input is not mutated", JSON.stringify(input) === before, true);

  if (result.status === "AUTHORIZED") {
    const authorization = result.authorization;
    assertEqual("authorization is frozen", Object.isFrozen(authorization), true);
    assertEqual("classification remains experiment", authorization.classification, "EXPERIMENT");
    assertEqual(
      "target is first isolated Renderer prototype",
      authorization.authorizedTarget,
      "FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE",
    );
    assertEqual(
      "only P97 RenderPlan is authorized",
      authorization.authorizedInput,
      "PERSONAL_STAR_BEAST_RENDER_PLAN_ONLY",
    );
    assertEqual("two plan references are bound", authorization.renderPlanReferences.length, 2);
    assertEqual(
      "two plan references are distinct",
      authorization.renderPlanReferences[0].referenceId !==
        authorization.renderPlanReferences[1].referenceId,
      true,
    );
    assertEqual(
      "implementation remains pending",
      authorization.implementationStatus,
      "AUTHORIZED_NOT_IMPLEMENTED",
    );
    assertEqual(
      "backend remains inactive",
      authorization.backendActivationStatus,
      "AUTHORIZED_NOT_ACTIVATED",
    );
    assertEqual("Production remains forbidden", authorization.productionStatus, "FORBIDDEN");
    assertEqual("UI remains forbidden", authorization.uiIntegrationStatus, "FORBIDDEN");
    assertEqual("formal users remain forbidden", authorization.formalUserStatus, "FORBIDDEN");
    assertEqual("fallback remains required", authorization.fallbackRequired, true);

    const collectKeys = (value, keys = []) => {
      if (value === null || typeof value !== "object") return keys;
      for (const [key, nested] of Object.entries(value)) {
        keys.push(key);
        collectKeys(nested, keys);
      }
      return keys;
    };
    const authorizationKeys = collectKeys(authorization);
    [
      "sourceIdentityReference",
      "sourceSceneModelReference",
      "mansionName",
      "fourSymbolName",
      "motherCodeId",
      "lifeArchetypeId",
      "birthData",
      "userIdentity",
    ].forEach((field) =>
      assertEqual(
        `authorization record excludes ${field}`,
        authorizationKeys.includes(field),
        false,
      ),
    );
    console.log(
      `INFO | P98 authorized plan pair | A=${authorization.renderPlanReferences[0].referenceId} | B=${authorization.renderPlanReferences[1].referenceId}`,
    );
  }

  const missingAuthority = runtime.authorizeIsolatedWebGLRendererPrototype(
    Object.freeze({ ...input, explicitAuthorityReference: null }),
  );
  assertEqual("missing authority is unavailable", missingAuthority.status, "UNAVAILABLE");
  assertEqual(
    "missing authority reason",
    missingAuthority.reason,
    "EXPLICIT_AUTHORITY_REFERENCE_REQUIRED",
  );

  const wrongScope = runtime.authorizeIsolatedWebGLRendererPrototype(
    Object.freeze({ ...input, prototypeScope: "PRODUCTION" }),
  );
  assertEqual("Production scope is blocked", wrongScope.status, "BLOCKED");
  assertEqual("Production scope reason", wrongScope.reason, "PROTOTYPE_SCOPE_INVALID");

  const duplicatePlan = runtime.authorizeIsolatedWebGLRendererPrototype(
    Object.freeze({
      ...input,
      renderPlanResults: Object.freeze([planResultA, planResultA]),
    }),
  );
  assertEqual("duplicate plans are blocked", duplicatePlan.status, "BLOCKED");
  assertEqual(
    "duplicate plan reason",
    duplicatePlan.reason,
    "RENDER_PLAN_PAIR_NOT_DISTINCT",
  );

  const unavailablePlan = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(null);
  const invalidPlanPair = runtime.authorizeIsolatedWebGLRendererPrototype(
    Object.freeze({
      ...input,
      renderPlanResults: Object.freeze([planResultA, unavailablePlan]),
    }),
  );
  assertEqual("unplanned result is blocked", invalidPlanPair.status, "BLOCKED");
  assertEqual(
    "unplanned result reason",
    invalidPlanPair.reason,
    "RENDER_PLAN_RESULT_NOT_PLANNED",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Isolated WebGL Renderer Prototype Authorization gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Isolated WebGL Renderer Prototype Authorization gate passed.");
