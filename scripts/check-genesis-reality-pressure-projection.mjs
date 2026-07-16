import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_REALITY_PRESSURE_PROJECTION_PROTOCOL.md",
  type: "src/types/genesisRealityPressureProjection.ts",
  service: "src/services/genesisRealityPressureProjection.ts",
  presenceType: "src/types/personalStarBeastLifePresenceProjection.ts",
  presenceService: "src/services/personalStarBeastLifePresenceProjection.ts",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  rendererType: "src/types/isolatedWebGLRendererPrototype.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
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
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};
const assertTrue = (name, condition) => {
  if (!condition) failures.push(`${name} expected=true actual=false`);
  else console.log(`PASS | ${name} | expected=true`);
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "Personal Star Beast Reveal",
    "Reality Pressure Reference",
    "Genesis Reality Pressure Projection",
    "field compression",
    "boundary load",
    "core resistance",
    "flow deflection",
    "Gravity",
    "Choice",
    "Crystal",
    "ISOLATED_PROTOTYPE_ONLY",
  ].forEach((marker) => assertIncludes("P108 protocol", source.protocol, marker));

  [
    "export type GenesisRealityPressureInput",
    "export type GenesisRealityPressureProjection",
    "GenesisRealityPressureStage",
    "pressureExpression",
    "presenceResponse",
    "PRESSURE_PRESENT",
    "noGravityInvocation: true",
    "noChoiceCalculation: true",
    "noCrystalGeneration: true",
    "noIdentityFactCopy: true",
    "noAnimalGeometry: true",
  ].forEach((marker) => assertIncludes("P108 projection type", source.type, marker));

  [
    "export function projectGenesisRealityPressure",
    "personalRevealProjection",
    "realityPressureReference",
    "PERSONAL_REVEAL_REQUIRED",
    "REALITY_PRESSURE_REFERENCE_REQUIRED",
    "PERSONAL_REVEAL_REFERENCE_INVALID",
    "REALITY_PRESSURE_REFERENCE_INVALID",
    "noGravityInvocation",
    "noChoiceCalculation",
    "noCrystalGeneration",
  ].forEach((marker) => assertIncludes("P108 mapping service", source.service, marker));
  [
    "resolveGravity",
    "runGravity",
    "resolveChoice",
    "runChoice",
    "resolveCrystal",
    "CrystalEngine",
    "createIsolatedWebGLRendererPrototype",
    "PersonalStarBeastSceneModel",
    "localStorage",
    "sessionStorage",
    "WHITE_TIGER",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) => assertExcludes("P108 service remains projection-only", source.service, marker));

  [
    "realityPressureResponse",
    "realityPressureProjectionReference",
    "GenesisRealityPressureProjection",
  ].forEach((marker) => assertIncludes("P108 presence bridge", source.presenceType, marker));
  assertIncludes("P108 presence accepts pressure", source.presenceService, "realityPressureProjection");
  assertIncludes("P108 renderer consumes pressure", source.renderer, "realityPressure");
  assertIncludes("P108 renderer receives pressure", source.renderer, "realityPressureProjection");
  assertIncludes("P108 harness supplies pressure", source.harness, "projectGenesisRealityPressure");
  assertIncludes("P108 renderer contract carries pressure", source.rendererType, "realityPressure: GenesisRealityPressureProjection | null");
  assertIncludes(
    "P108 gate registered",
    packageJson.scripts?.["check-genesis-reality-pressure-projection"] ?? "",
    "node scripts/check-genesis-reality-pressure-projection.mjs",
  );
  assertIncludes(
    "release includes P108 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-reality-pressure-projection",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-reality-pressure-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `
        export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A, PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectGenesisRealityPressure } from "./src/services/genesisRealityPressureProjection.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-reality-pressure-gate-entry.ts",
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
  const fixtureA = runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A;
  const fixtureB = runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B;
  const reveal = (identityReferenceId) =>
    Object.freeze({
      semanticRole: "GENESIS_PERSONAL_STAR_BEAST_REVEAL_PROJECTION",
      birthMansionSeedReferenceId: "gate:mansion-seed",
      morphologicalFieldReferenceId: "gate:field",
      lifeForceReferenceId: "gate:force",
      identityReferenceId,
      revealExpression: Object.freeze({
        presenceMode: "PERSONAL_PRESENCE",
        seedContinuity: 0.72,
        fieldIntegration: 0.68,
        forceIntegration: 0.74,
        coreConvergence: 0.76,
        boundaryContinuity: 0.66,
        revealOpacity: 0.7,
        noAnimalIdentity: true,
        noAnimalGeometry: true,
      }),
      cosmicRecognitionExpression: Object.freeze({
        personalAttention: 0.64,
        sourceConvergence: 0.72,
        quietReveal: 0.78,
      }),
      revealStage: "PERSONAL_STAR_BEAST_REVEALED",
      temporalRhythm: Object.freeze({
        periodSeconds: 12,
        phaseOffset: 0.2,
        breathingAmplitude: 0.02,
        noCountdown: true,
      }),
      presenceIntensity: 0.72,
      sourceRole: "FORMAL_THREE_SOURCE_PERSONAL_IDENTITY_REFERENCE_ONLY",
      referenceOnly: true,
      identityBlind: true,
      noIdentityFactCopy: true,
      noFourSymbolMutation: true,
      noMotherCodeCalculation: true,
      noAnimalIdentity: true,
      noAnimalGeometry: true,
      noAssetGeneration: true,
      noLifeStateMutation: true,
      noRendererInvocation: true,
      noRuntimeIntegration: true,
    });
  const pressureReference = (referenceId) =>
    Object.freeze({
      referenceType: "GENESIS_REALITY_PRESSURE_REFERENCE",
      referenceId,
      sourceRole: "REALITY_PRESSURE_ENGINE_REFERENCE",
      pressureReferenceOnly: true,
      noRawPressureCopy: true,
    });

  const availableA = runtime.projectGenesisRealityPressure(
    Object.freeze({
      personalRevealProjection: reveal("identity:a"),
      realityPressureReference: pressureReference("pressure:entry:a"),
    }),
  );
  const availableB = runtime.projectGenesisRealityPressure(
    Object.freeze({
      personalRevealProjection: reveal("identity:b"),
      realityPressureReference: pressureReference("pressure:entry:a"),
    }),
  );
  const missingReveal = runtime.projectGenesisRealityPressure(
    Object.freeze({
      personalRevealProjection: null,
      realityPressureReference: pressureReference("pressure:entry:a"),
    }),
  );
  const missingPressure = runtime.projectGenesisRealityPressure(
    Object.freeze({
      personalRevealProjection: reveal("identity:a"),
      realityPressureReference: null,
    }),
  );
  const blocked = runtime.projectGenesisRealityPressure(
    Object.freeze({
      personalRevealProjection: reveal("identity:a"),
      realityPressureReference: Object.freeze({
        ...pressureReference("pressure:invalid"),
        noRawPressureCopy: false,
      }),
    }),
  );
  assertEqual("P108 available A", availableA.status, "AVAILABLE");
  assertEqual("P108 available B", availableB.status, "AVAILABLE");
  assertEqual("P108 missing reveal unavailable", missingReveal.status, "UNAVAILABLE");
  assertEqual("P108 missing pressure unavailable", missingPressure.status, "UNAVAILABLE");
  assertEqual("P108 invalid pressure blocked", blocked.status, "BLOCKED");

  if (availableA.status === "AVAILABLE" && availableB.status === "AVAILABLE") {
    assertEqual("P108 pressure stage", availableA.projection.pressureStage, "PRESSURE_PRESENT");
    assertTrue(
      "P108 A/B pressure response differs",
      JSON.stringify(availableA.projection.pressureExpression) !==
        JSON.stringify(availableB.projection.pressureExpression),
    );
    assertEqual("P108 no Gravity invocation", availableA.projection.noGravityInvocation, true);
    assertEqual("P108 no Choice calculation", availableA.projection.noChoiceCalculation, true);
    assertEqual("P108 no Crystal generation", availableA.projection.noCrystalGeneration, true);
    assertEqual("P108 no life mutation", availableA.projection.noLifeStateMutation, true);

    const planResult = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
      fixtureA.sceneModelReference,
    );
    assertEqual("P108 formal plan available", planResult.status, "PLANNED");
    if (planResult.status === "PLANNED") {
      const before = JSON.stringify(planResult.plan);
      const presence = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
        planResult.plan,
        null,
        null,
        null,
        null,
        reveal("identity:a"),
        availableA.projection,
      );
      const scene = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
        planResult.plan,
        null,
        null,
        null,
        null,
        reveal("identity:a"),
        availableA.projection,
      );
      assertEqual("P108 presence receives pressure", presence.realityPressureResponse.pressureStage, "PRESSURE_PRESENT");
      assertEqual("P108 scene carries pressure", scene.realityPressure?.pressureStage, "PRESSURE_PRESENT");
      assertEqual("P108 plan remains unchanged", JSON.stringify(planResult.plan), before);
      assertEqual("P108 crystal is not created", planResult.plan.crystalExpression, null);
    }
  }
}

if (failures.length > 0) {
  console.error(`P108 reality pressure gate failed (${failures.length})`);
  for (const failure of failures) console.error(`FAIL | ${failure}`);
  process.exitCode = 1;
} else {
  console.log("P108 reality pressure gate passed");
}
