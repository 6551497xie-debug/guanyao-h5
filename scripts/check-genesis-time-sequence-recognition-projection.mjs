import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_TIME_SEQUENCE_RECOGNITION_PROTOCOL.md",
  type: "src/types/genesisTimeSequenceRecognitionProjection.ts",
  service: "src/services/genesisTimeSequenceRecognitionProjection.ts",
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

  [
    "Life Arrival Coordinate Reference",
    "Time Sequence Recognition Projection",
    "Life Presence Projection",
    "timeAlignmentExpression",
    "cosmicResponseExpression",
    "recognitionStage",
    "temporalRhythm",
    "宇宙开始回应我的到来",
    "本命星宿点亮",
    "四象显化",
    "MotherCode 原力显化",
  ].forEach((marker) =>
    assertIncludes("P103 protocol", source.protocol, marker),
  );

  [
    "export type GenesisTimeSequenceRecognitionProjection",
    "export type GenesisTimeSequenceRecognitionInput",
    "GenesisTimeSequenceRecognitionStage",
    "timeAlignmentExpression",
    "cosmicResponseExpression",
    "temporalRhythm",
    "presenceIntensity",
    "noMansionReveal: true",
    "noFourSymbolReveal: true",
    "noMotherCodeExpression: true",
    "noPersonalStarBeastReveal: true",
    "identityBlind: true",
    "referenceOnly: true",
  ].forEach((marker) => assertIncludes("P103 projection type", source.type, marker));

  [
    "export function projectGenesisTimeSequenceRecognition",
    "originCoordinateReference",
    "timeSequenceReference",
    "sequencePhase",
    "responseStrength",
    "recognitionStage",
    "noMansionCalculation",
    "noFourSymbolCalculation",
    "noMotherCodeCalculation",
    "noPersonalStarBeastGeneration",
  ].forEach((marker) => assertIncludes("P103 mapping service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "fourSymbol",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("P103 mapping remains time-only", source.service, marker));

  [
    "timeSequenceResponse",
    "timeSequenceProjectionReference",
    "GenesisTimeSequenceRecognitionProjection",
  ].forEach((marker) => assertIncludes("P103 presence bridge", source.presenceType, marker));
  assertIncludes(
    "P103 presence service accepts projection",
    source.presenceService,
    "timeSequenceProjection",
  );
  assertIncludes(
    "P103 renderer consumes projection",
    source.renderer,
    "timeSequenceRecognition",
  );
  assertIncludes(
    "P103 renderer receives projection",
    source.renderer,
    "timeSequenceRecognitionProjection",
  );
  assertIncludes(
    "P103 harness supplies projection",
    source.harness,
    ".projectionBundle",
  );
  assertIncludes(
    "P103 harness remains prototype-only",
    source.harness,
    "projectionBundle.timeSequenceRecognitionProjection",
  );
  assertIncludes(
    "P103 renderer contract carries projection",
    source.rendererType,
    "timeSequenceRecognition: GenesisTimeSequenceRecognitionProjection | null",
  );
  assertIncludes(
    "P103 gate registered",
    packageJson.scripts?.["check-genesis-time-sequence-recognition-projection"] ?? "",
    "node scripts/check-genesis-time-sequence-recognition-projection.mjs",
  );
  assertIncludes(
    "release includes P103 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-time-sequence-recognition-projection",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-genesis-time-sequence-recognition-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectGenesisTimeSequenceRecognition } from "./src/services/genesisTimeSequenceRecognitionProjection.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-time-sequence-recognition-gate-entry.ts",
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
  const originCoordinateReference = Object.freeze({
    referenceType: "STAR_BEAST_GENESIS_ORIGIN_COORDINATE",
    referenceId: "gate:life-arrival:shared",
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });
  const timeReferenceA = Object.freeze({
    referenceType: "GENESIS_TIME_SEQUENCE_REFERENCE",
    referenceId: "gate:time-sequence:a",
  });
  const timeReferenceB = Object.freeze({
    referenceType: "GENESIS_TIME_SEQUENCE_REFERENCE",
    referenceId: "gate:time-sequence:b",
  });
  const resultA = runtime.projectGenesisTimeSequenceRecognition(
    Object.freeze({ originCoordinateReference, timeSequenceReference: timeReferenceA }),
  );
  const resultB = runtime.projectGenesisTimeSequenceRecognition(
    Object.freeze({ originCoordinateReference, timeSequenceReference: timeReferenceB }),
  );
  const missing = runtime.projectGenesisTimeSequenceRecognition(
    Object.freeze({ originCoordinateReference, timeSequenceReference: null }),
  );
  const blocked = runtime.projectGenesisTimeSequenceRecognition(
    Object.freeze({
      originCoordinateReference,
      timeSequenceReference: Object.freeze({
        referenceType: "WRONG_REFERENCE",
        referenceId: "gate:time-sequence:wrong",
      }),
    }),
  );

  assertEqual("time recognition A available", resultA.status, "AVAILABLE");
  assertEqual("time recognition B available", resultB.status, "AVAILABLE");
  assertEqual("missing time reference unavailable", missing.status, "UNAVAILABLE");
  assertEqual("invalid time reference blocked", blocked.status, "BLOCKED");

  if (resultA.status === "AVAILABLE" && resultB.status === "AVAILABLE") {
    assertEqual(
      "time recognition preserves origin reference",
      resultA.projection.originCoordinateReferenceId,
      originCoordinateReference.referenceId,
    );
    assertEqual("time recognition has no mansion reveal", resultA.projection.noMansionReveal, true);
    assertEqual("time recognition has no four symbol reveal", resultA.projection.noFourSymbolReveal, true);
    assertEqual("time recognition has no mother code expression", resultA.projection.noMotherCodeExpression, true);
    assertEqual("time recognition has no personal star beast reveal", resultA.projection.noPersonalStarBeastReveal, true);
    assertEqual(
      "different time inputs produce different alignment",
      JSON.stringify(resultA.projection.timeAlignmentExpression) !==
        JSON.stringify(resultB.projection.timeAlignmentExpression),
      true,
    );
    assertEqual(
      "different time inputs produce different cosmic response",
      JSON.stringify(resultA.projection.cosmicResponseExpression) !==
        JSON.stringify(resultB.projection.cosmicResponseExpression),
      true,
    );

    const planResult = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
      runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.sceneModelReference,
    );
    assertEqual("time recognition fixture plan available", planResult.status, "PLANNED");
    if (planResult.status === "PLANNED") {
      const before = JSON.stringify(planResult.plan);
      const presenceA = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
        planResult.plan,
        resultA.projection,
      );
      const presenceB = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
        planResult.plan,
        resultB.projection,
      );
      const sceneA = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
        planResult.plan,
        resultA.projection,
      );
      const sceneB = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
        planResult.plan,
        resultB.projection,
      );
      assertEqual(
        "same life plan keeps core stable",
        JSON.stringify(presenceA.corePresence),
        JSON.stringify(presenceB.corePresence),
      );
      assertEqual(
        "same life plan receives different time response",
        JSON.stringify(presenceA.timeSequenceResponse) !==
          JSON.stringify(presenceB.timeSequenceResponse),
        true,
      );
      assertEqual(
        "scene carries time response A",
        sceneA.timeSequenceRecognition?.timeSequenceReferenceId,
        timeReferenceA.referenceId,
      );
      assertEqual(
        "scene carries time response B",
        sceneB.timeSequenceRecognition?.timeSequenceReferenceId,
        timeReferenceB.referenceId,
      );
      assertEqual("time projection does not mutate plan", JSON.stringify(planResult.plan), before);
    }
  }

  fs.unlinkSync(modulePath);
}

if (failures.length > 0) {
  console.error("\nGenesis Time Sequence Recognition Projection gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGenesis Time Sequence Recognition Projection gate passed.");
