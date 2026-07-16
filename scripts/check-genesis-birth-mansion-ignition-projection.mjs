import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_BIRTH_MANSION_IGNITION_PROTOCOL.md",
  type: "src/types/genesisBirthMansionIgnitionProjection.ts",
  service: "src/services/genesisBirthMansionIgnitionProjection.ts",
  timeService: "src/services/genesisTimeSequenceRecognitionProjection.ts",
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
    "Time Sequence Recognition Projection",
    "Formal Mansion Result Reference",
    "Birth Mansion Ignition Projection",
    "宇宙第一次认领",
    "seedClaimExpression",
    "cosmicRecognitionExpression",
    "ignitionStage",
    "SEED_CLAIMED",
    "本命星宿名称",
    "四象显化",
    "MotherCode 原力显化",
  ].forEach((marker) =>
    assertIncludes("P104 protocol", source.protocol, marker),
  );

  [
    "export type GenesisBirthMansionIgnitionProjection",
    "export type GenesisBirthMansionIgnitionInput",
    "GenesisBirthMansionIgnitionStage",
    "seedClaimExpression",
    "cosmicRecognitionExpression",
    "ignitionStage",
    "noMansionFactCopy: true",
    "noMansionName: true",
    "noFourSymbolReveal: true",
    "noMotherCodeExpression: true",
    "noPersonalStarBeastReveal: true",
    "identityBlind: true",
    "referenceOnly: true",
  ].forEach((marker) => assertIncludes("P104 projection type", source.type, marker));

  [
    "export function projectGenesisBirthMansionIgnition",
    "timeSequenceRecognitionProjection",
    "mansionResultReference",
    "seedClaimExpression",
    "cosmicRecognitionExpression",
    "noMansionCalculation",
    "noFourSymbolCalculation",
    "noMotherCodeCalculation",
    "noPersonalStarBeastGeneration",
  ].forEach((marker) => assertIncludes("P104 mapping service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "fourSymbol",
    "localStorage",
    "sessionStorage",
    "createIsolatedWebGLRendererPrototype",
  ].forEach((marker) => assertExcludes("P104 mapping remains source-only", source.service, marker));

  [
    "birthMansionIgnitionResponse",
    "birthMansionIgnitionProjectionReference",
    "GenesisBirthMansionIgnitionProjection",
  ].forEach((marker) => assertIncludes("P104 presence bridge", source.presenceType, marker));
  assertIncludes("P104 presence service accepts ignition", source.presenceService, "birthMansionIgnitionProjection");
  assertIncludes("P104 renderer consumes ignition", source.renderer, "birthMansionIgnition");
  assertIncludes("P104 renderer receives ignition", source.renderer, "birthMansionIgnitionProjection");
  assertIncludes("P104 harness supplies ignition", source.harness, "projectGenesisBirthMansionIgnition");
  assertIncludes(
    "P104 harness remains prototype-only",
    source.harness,
    "birthMansionIgnitionProjection: BIRTH_MANSION_IGNITION_PROJECTION",
  );
  assertIncludes(
    "P104 renderer contract carries ignition",
    source.rendererType,
    "birthMansionIgnition: GenesisBirthMansionIgnitionProjection | null",
  );
  assertIncludes(
    "P104 gate registered",
    packageJson.scripts?.["check-genesis-birth-mansion-ignition-projection"] ?? "",
    "node scripts/check-genesis-birth-mansion-ignition-projection.mjs",
  );
  assertIncludes(
    "release includes P104 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-birth-mansion-ignition-projection",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-genesis-birth-mansion-ignition-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectGenesisTimeSequenceRecognition } from "./src/services/genesisTimeSequenceRecognitionProjection.ts";
        export { projectGenesisBirthMansionIgnition } from "./src/services/genesisBirthMansionIgnitionProjection.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-birth-mansion-ignition-gate-entry.ts",
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
    referenceId: "prototype:life-arrival:shared",
    sourceRole: "SHARED_TEMPORAL_BIRTH_COORDINATE",
    birthLocationContextOnly: true,
    birthLocationExcludedFromStarBeastDerivation: true,
  });
  const timeResult = runtime.projectGenesisTimeSequenceRecognition(
    Object.freeze({
      originCoordinateReference,
      timeSequenceReference: Object.freeze({
        referenceType: "GENESIS_TIME_SEQUENCE_REFERENCE",
        referenceId: "prototype:time-sequence:arrival",
      }),
    }),
  );
  const planResult = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.sceneModelReference,
  );
  assertEqual("P104 time input available", timeResult.status, "AVAILABLE");
  assertEqual("P104 formal plan available", planResult.status, "PLANNED");

  if (timeResult.status === "AVAILABLE" && planResult.status === "PLANNED") {
    const mansionResultReference = Object.freeze({
      referenceType: "STAR_BEAST_GENESIS_MANSION",
      referenceId: "gate:birth-mansion:case-a",
      sourceStarbeastDerivationReference:
        runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.mansionSeedReference
          .sourceMansionResultReference.resultReference,
    });
    const available = runtime.projectGenesisBirthMansionIgnition(
      Object.freeze({
        timeSequenceRecognitionProjection: timeResult.projection,
        mansionResultReference,
      }),
    );
    const missingTime = runtime.projectGenesisBirthMansionIgnition(
      Object.freeze({
        timeSequenceRecognitionProjection: null,
        mansionResultReference,
      }),
    );
    const waiting = runtime.projectGenesisBirthMansionIgnition(
      Object.freeze({
        timeSequenceRecognitionProjection: Object.freeze({
          ...timeResult.projection,
          recognitionStage: "WAITING",
        }),
        mansionResultReference,
      }),
    );
    const invalidMansion = runtime.projectGenesisBirthMansionIgnition(
      Object.freeze({
        timeSequenceRecognitionProjection: timeResult.projection,
        mansionResultReference: Object.freeze({
          ...mansionResultReference,
          referenceType: "WRONG_REFERENCE",
        }),
      }),
    );
    assertEqual("birth mansion ignition available", available.status, "AVAILABLE");
    assertEqual("missing time is unavailable", missingTime.status, "UNAVAILABLE");
    assertEqual("waiting time is unavailable", waiting.status, "UNAVAILABLE");
    assertEqual("invalid mansion is blocked", invalidMansion.status, "BLOCKED");

    if (available.status === "AVAILABLE") {
      assertEqual("ignition keeps formal mansion reference", available.projection.mansionSeedReferenceId, mansionResultReference.referenceId);
      assertEqual("ignition does not copy mansion fact", available.projection.noMansionFactCopy, true);
      assertEqual("ignition does not copy mansion name", available.projection.noMansionName, true);
      assertEqual("ignition does not reveal four symbol", available.projection.noFourSymbolReveal, true);
      assertEqual("ignition does not express mother code", available.projection.noMotherCodeExpression, true);
      assertEqual("ignition does not reveal personal star beast", available.projection.noPersonalStarBeastReveal, true);
      assertEqual("recognized time claims seed", available.projection.ignitionStage, "SEED_CLAIMED");

      const before = JSON.stringify(planResult.plan);
      const presence = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
        planResult.plan,
        timeResult.projection,
        available.projection,
      );
      const scene = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
        planResult.plan,
        timeResult.projection,
        available.projection,
      );
      assertEqual("presence receives seed claim", presence.birthMansionIgnitionResponse.ignitionStage, "SEED_CLAIMED");
      assertEqual("scene carries seed claim", scene.birthMansionIgnition?.mansionSeedReferenceId, mansionResultReference.referenceId);
      assertEqual("ignition remains identity blind", scene.identityBlind, true);
      assertEqual("ignition does not mutate plan", JSON.stringify(planResult.plan), before);
    }
  }

  fs.unlinkSync(modulePath);
}

if (failures.length > 0) {
  console.error("\nGenesis Birth Mansion Ignition Projection gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGenesis Birth Mansion Ignition Projection gate passed.");
