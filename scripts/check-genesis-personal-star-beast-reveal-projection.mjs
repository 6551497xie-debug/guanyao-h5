import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_PERSONAL_STAR_BEAST_REVEAL_PROTOCOL.md",
  type: "src/types/genesisPersonalRevealProjection.ts",
  service: "src/services/genesisPersonalRevealProjection.ts",
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
const assertTrue = (name, condition) => {
  if (!condition) failures.push(`${name} expected=true actual=false`);
  else console.log(`PASS | ${name} | expected=true`);
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
    "Birth Mansion Life Seed",
    "Four Symbol Morphological Field",
    "MotherCode / LifeArchetype Life Force",
    "Genesis Personal Star Beast Reveal Projection",
    "不是召唤一个兽",
    "PERSONAL_STAR_BEAST_REVEALED",
    "ISOLATED_PROTOTYPE_ONLY",
  ].forEach((marker) => assertIncludes("P107 protocol", source.protocol, marker));

  [
    "export type GenesisPersonalRevealInput",
    "export type GenesisPersonalRevealProjection",
    "GenesisPersonalRevealStage",
    "GenesisPersonalRevealPresenceMode",
    "revealExpression",
    "cosmicRecognitionExpression",
    "PERSONAL_STAR_BEAST_REVEALED",
    "noIdentityFactCopy: true",
    "noFourSymbolMutation: true",
    "noMotherCodeCalculation: true",
    "noAnimalIdentity: true",
    "noAnimalGeometry: true",
  ].forEach((marker) => assertIncludes("P107 projection type", source.type, marker));

  [
    "export function projectGenesisPersonalReveal",
    "birthMansionIgnitionProjection",
    "morphologicalFieldAlignmentProjection",
    "lifeForceInfusionProjection",
    "personalStarBeastIdentityReference",
    "SEED_CLAIMED",
    "FIELD_ALIGNED",
    "FORCE_INFUSED",
    "noIdentityFactCopy",
    "noAnimalModelGeneration",
    "noAssetGeneration",
  ].forEach((marker) => assertIncludes("P107 mapping service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "localStorage",
    "sessionStorage",
    "createIsolatedWebGLRendererPrototype",
    "WHITE_TIGER",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) =>
    assertExcludes("P107 mapping remains convergence-only", source.service, marker),
  );

  [
    "personalRevealResponse",
    "personalRevealProjectionReference",
    "GenesisPersonalRevealProjection",
  ].forEach((marker) => assertIncludes("P107 presence bridge", source.presenceType, marker));
  assertIncludes("P107 presence service accepts reveal", source.presenceService, "personalRevealProjection");
  assertIncludes("P107 renderer consumes reveal", source.renderer, "personalReveal");
  assertIncludes("P107 renderer receives reveal", source.renderer, "personalRevealProjection");
  assertIncludes("P107 harness supplies reveal", source.harness, "projectGenesisPersonalReveal");
  assertIncludes("P107 renderer contract carries reveal", source.rendererType, "personalReveal: GenesisPersonalRevealProjection | null");
  assertIncludes("P107 gate registered", packageJson.scripts?.["check-genesis-personal-star-beast-reveal-projection"] ?? "", "node scripts/check-genesis-personal-star-beast-reveal-projection.mjs");
  assertIncludes("release includes P107 gate", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-personal-star-beast-reveal-projection");

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-genesis-personal-reveal-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A, PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectGenesisTimeSequenceRecognition } from "./src/services/genesisTimeSequenceRecognitionProjection.ts";
        export { projectGenesisBirthMansionIgnition } from "./src/services/genesisBirthMansionIgnitionProjection.ts";
        export { projectGenesisFourSymbolAlignment } from "./src/services/genesisFourSymbolAlignmentProjection.ts";
        export { projectGenesisLifeForceInfusion } from "./src/services/genesisLifeForceInfusionProjection.ts";
        export { projectGenesisPersonalReveal } from "./src/services/genesisPersonalRevealProjection.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-personal-reveal-gate-entry.ts",
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
    fixtureA.sceneModelReference,
  );
  assertEqual("P107 time input available", timeResult.status, "AVAILABLE");
  assertEqual("P107 formal plan available", planResult.status, "PLANNED");

  if (timeResult.status === "AVAILABLE" && planResult.status === "PLANNED") {
    const mansionResultReference = Object.freeze({
      referenceType: "STAR_BEAST_GENESIS_MANSION",
      referenceId: "gate:birth-mansion:case-a",
      sourceStarbeastDerivationReference:
        fixtureA.mansionSeedReference.sourceMansionResultReference.resultReference,
    });
    const ignitionResult = runtime.projectGenesisBirthMansionIgnition(
      Object.freeze({
        timeSequenceRecognitionProjection: timeResult.projection,
        mansionResultReference,
      }),
    );
    assertEqual("P107 birth mansion ignition available", ignitionResult.status, "AVAILABLE");

    if (ignitionResult.status === "AVAILABLE") {
      const makeFieldReference = (fixture) =>
        Object.freeze({
          referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
          sourceEngine: "guanyao_starbeast_engine",
          resultReference:
            fixture.fourSymbolFieldReference.sourceFourSymbolResultReference.resultReference,
        });
      const makeField = (fixture) =>
        runtime.projectGenesisFourSymbolAlignment(
          Object.freeze({
            birthMansionIgnitionProjection: ignitionResult.projection,
            fourSymbolResultReference: makeFieldReference(fixture),
          }),
        );
      const fieldA = makeField(fixtureA);
      const fieldB = makeField(fixtureB);
      assertEqual("P107 field A available", fieldA.status, "AVAILABLE");
      assertEqual("P107 field B available", fieldB.status, "AVAILABLE");

      if (fieldA.status === "AVAILABLE" && fieldB.status === "AVAILABLE") {
        const makeForce = (fixture, field) =>
          runtime.projectGenesisLifeForceInfusion(
            Object.freeze({
              morphologicalFieldAlignmentProjection: field.projection,
              motherCodeProfileReference:
                fixture.identitySourceReference.lifeArchetypeForce
                  .sourceMotherCodeProfileReference,
              lifeArchetypeProfileReference:
                fixture.identitySourceReference.lifeArchetypeForce
                  .sourceLifeArchetypeProfileReference,
            }),
          );
        const forceA = makeForce(fixtureA, fieldA);
        const forceB = makeForce(fixtureB, fieldB);
        assertEqual("P107 force A available", forceA.status, "AVAILABLE");
        assertEqual("P107 force B available", forceB.status, "AVAILABLE");

        if (forceA.status === "AVAILABLE" && forceB.status === "AVAILABLE") {
          const identityA = fixtureA.identitySourceReference.personalStarBeastReference;
          const identityB = fixtureB.identitySourceReference.personalStarBeastReference;
          const available = runtime.projectGenesisPersonalReveal(
            Object.freeze({
              birthMansionIgnitionProjection: ignitionResult.projection,
              morphologicalFieldAlignmentProjection: fieldA.projection,
              lifeForceInfusionProjection: forceA.projection,
              personalStarBeastIdentityReference: identityA,
            }),
          );
          const missingIgnition = runtime.projectGenesisPersonalReveal(
            Object.freeze({
              birthMansionIgnitionProjection: null,
              morphologicalFieldAlignmentProjection: fieldA.projection,
              lifeForceInfusionProjection: forceA.projection,
              personalStarBeastIdentityReference: identityA,
            }),
          );
          const missingField = runtime.projectGenesisPersonalReveal(
            Object.freeze({
              birthMansionIgnitionProjection: ignitionResult.projection,
              morphologicalFieldAlignmentProjection: null,
              lifeForceInfusionProjection: forceA.projection,
              personalStarBeastIdentityReference: identityA,
            }),
          );
          const missingForce = runtime.projectGenesisPersonalReveal(
            Object.freeze({
              birthMansionIgnitionProjection: ignitionResult.projection,
              morphologicalFieldAlignmentProjection: fieldA.projection,
              lifeForceInfusionProjection: null,
              personalStarBeastIdentityReference: identityA,
            }),
          );
          const missingIdentity = runtime.projectGenesisPersonalReveal(
            Object.freeze({
              birthMansionIgnitionProjection: ignitionResult.projection,
              morphologicalFieldAlignmentProjection: fieldA.projection,
              lifeForceInfusionProjection: forceA.projection,
              personalStarBeastIdentityReference: null,
            }),
          );
          const invalidIdentity = runtime.projectGenesisPersonalReveal(
            Object.freeze({
              birthMansionIgnitionProjection: ignitionResult.projection,
              morphologicalFieldAlignmentProjection: fieldA.projection,
              lifeForceInfusionProjection: forceA.projection,
              personalStarBeastIdentityReference: Object.freeze({
                ...identityA,
                notFourSymbolAnimal: false,
              }),
            }),
          );
          assertEqual("P107 available", available.status, "AVAILABLE");
          assertEqual("P107 missing ignition unavailable", missingIgnition.status, "UNAVAILABLE");
          assertEqual("P107 missing field unavailable", missingField.status, "UNAVAILABLE");
          assertEqual("P107 missing force unavailable", missingForce.status, "UNAVAILABLE");
          assertEqual("P107 missing identity unavailable", missingIdentity.status, "UNAVAILABLE");
          assertEqual("P107 invalid identity blocked", invalidIdentity.status, "BLOCKED");

          if (available.status === "AVAILABLE") {
            const projection = available.projection;
            assertEqual("P107 reveal stage", projection.revealStage, "PERSONAL_STAR_BEAST_REVEALED");
            assertEqual("P107 source role", projection.sourceRole, "FORMAL_THREE_SOURCE_PERSONAL_IDENTITY_REFERENCE_ONLY");
            assertEqual("P107 identity blind", projection.identityBlind, true);
            assertEqual("P107 no identity fact copy", projection.noIdentityFactCopy, true);
            assertEqual("P107 no four symbol mutation", projection.noFourSymbolMutation, true);
            assertEqual("P107 no MotherCode calculation", projection.noMotherCodeCalculation, true);
            assertEqual("P107 no animal identity", projection.noAnimalIdentity, true);
            assertEqual("P107 no animal geometry", projection.noAnimalGeometry, true);
            assertTrue("P107 convergence positive", projection.revealExpression.coreConvergence > 0);
            assertTrue("P107 presence positive", projection.presenceIntensity > 0);

            const before = JSON.stringify(planResult.plan);
            const presence = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
              planResult.plan,
              timeResult.projection,
              ignitionResult.projection,
              fieldA.projection,
              forceA.projection,
              projection,
            );
            const scene = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
              planResult.plan,
              timeResult.projection,
              ignitionResult.projection,
              fieldA.projection,
              forceA.projection,
              projection,
            );
            assertEqual("presence receives personal reveal", presence.personalRevealResponse.revealStage, "PERSONAL_STAR_BEAST_REVEALED");
            assertEqual("scene carries personal reveal", scene.personalReveal?.revealStage, "PERSONAL_STAR_BEAST_REVEALED");
            assertEqual("P107 does not mutate plan", JSON.stringify(planResult.plan), before);

            const availableB = runtime.projectGenesisPersonalReveal(
              Object.freeze({
                birthMansionIgnitionProjection: ignitionResult.projection,
                morphologicalFieldAlignmentProjection: fieldB.projection,
                lifeForceInfusionProjection: forceB.projection,
                personalStarBeastIdentityReference: identityB,
              }),
            );
            assertEqual("P107 case B available", availableB.status, "AVAILABLE");
            if (availableB.status === "AVAILABLE") {
              assertTrue(
                "P107 A/B reveal expression differs",
                JSON.stringify(projection.revealExpression) !==
                  JSON.stringify(availableB.projection.revealExpression),
              );
            }
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`P107 personal reveal gate failed (${failures.length})`);
  for (const failure of failures) console.error(`FAIL | ${failure}`);
  process.exitCode = 1;
} else {
  console.log("P107 personal reveal gate passed");
}
