import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_MOTHER_CODE_INFUSION_PROTOCOL.md",
  type: "src/types/genesisLifeForceInfusionProjection.ts",
  service: "src/services/genesisLifeForceInfusionProjection.ts",
  alignmentType: "src/types/genesisFourSymbolAlignmentProjection.ts",
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
    "Formal MotherCodeProfile",
    "LifeArchetypeProfile",
    "Genesis Life Force Infusion Projection",
    "母码原力落入形态场",
    "FIELD_ALIGNED",
    "force mode",
    "core pull",
    "ISOLATED_PROTOTYPE_ONLY",
  ].forEach((marker) => assertIncludes("P106 protocol", source.protocol, marker));

  [
    "export type GenesisLifeForceInfusionInput",
    "export type GenesisLifeForceInfusionProjection",
    "GenesisLifeForceInfusionStage",
    "GenesisLifeForceExpressionMode",
    "lifeForceExpression",
    "cosmicRecognitionExpression",
    "FORCE_INFUSED",
    "noFourSymbolMutation: true",
    "noAnimalIdentity: true",
    "noAnimalGeometry: true",
    "noPersonalStarBeastReveal: true",
  ].forEach((marker) => assertIncludes("P106 projection type", source.type, marker));

  [
    "export function projectGenesisLifeForceInfusion",
    "morphologicalFieldAlignmentProjection",
    "motherCodeProfileReference",
    "lifeArchetypeProfileReference",
    "sourceMotherCodeId",
    "MOTHER_CODE_PROFILE_REFERENCE_INVALID",
    "LIFE_ARCHETYPE_SOURCE_MISMATCH",
    "noMotherCodeCalculation",
    "noFourSymbolMutation",
    "noPersonalStarBeastGeneration",
  ].forEach((marker) => assertIncludes("P106 mapping service", source.service, marker));
  [
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
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
    assertExcludes("P106 mapping remains source-only", source.service, marker),
  );

  [
    "lifeForceInfusionResponse",
    "lifeForceInfusionProjectionReference",
    "GenesisLifeForceInfusionProjection",
  ].forEach((marker) => assertIncludes("P106 presence bridge", source.presenceType, marker));
  assertIncludes("P106 presence service accepts infusion", source.presenceService, "lifeForceInfusionProjection");
  assertIncludes("P106 renderer consumes infusion", source.renderer, "lifeForceInfusion");
  assertIncludes("P106 renderer receives infusion", source.renderer, "lifeForceInfusionProjection");
  assertIncludes("P106 harness consumes adapter infusion", source.harness, "projectionBundle.lifeForceInfusionProjection");
  assertIncludes("P106 renderer contract carries infusion", source.rendererType, "lifeForceInfusion: GenesisLifeForceInfusionProjection | null");
  assertIncludes("P106 gate registered", packageJson.scripts?.["check-genesis-life-force-infusion-projection"] ?? "", "node scripts/check-genesis-life-force-infusion-projection.mjs");
  assertIncludes("release includes P106 gate", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-life-force-infusion-projection");

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-genesis-life-force-infusion-${process.pid}.mjs`,
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
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-life-force-infusion-gate-entry.ts",
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
  assertEqual("P106 time input available", timeResult.status, "AVAILABLE");
  assertEqual("P106 formal plan available", planResult.status, "PLANNED");

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
    assertEqual("P106 birth mansion ignition available", ignitionResult.status, "AVAILABLE");

    if (ignitionResult.status === "AVAILABLE") {
      const makeFieldReference = (fixture, referenceId) =>
        Object.freeze({
          referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
          sourceEngine: "guanyao_starbeast_engine",
          resultReference:
            fixture.fourSymbolFieldReference.sourceFourSymbolResultReference.resultReference,
          referenceId,
        });
      const fieldReferenceA = makeFieldReference(fixtureA, "field:case-a");
      const fieldReferenceB = makeFieldReference(fixtureB, "field:case-b");
      const fieldA = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({
          birthMansionIgnitionProjection: ignitionResult.projection,
          fourSymbolResultReference: fieldReferenceA,
        }),
      );
      const fieldB = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({
          birthMansionIgnitionProjection: ignitionResult.projection,
          fourSymbolResultReference: fieldReferenceB,
        }),
      );
      assertEqual("P106 field A available", fieldA.status, "AVAILABLE");
      assertEqual("P106 field B available", fieldB.status, "AVAILABLE");

      if (fieldA.status === "AVAILABLE") {
        const motherCodeReference = fixtureA.identitySourceReference.lifeArchetypeForce.sourceMotherCodeProfileReference;
        const archetypeReference = fixtureA.identitySourceReference.lifeArchetypeForce.sourceLifeArchetypeProfileReference;
        const available = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: fieldA.projection,
            motherCodeProfileReference: motherCodeReference,
            lifeArchetypeProfileReference: archetypeReference,
          }),
        );
        const missingField = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: null,
            motherCodeProfileReference: motherCodeReference,
            lifeArchetypeProfileReference: archetypeReference,
          }),
        );
        const waitingField = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: Object.freeze({
              ...fieldA.projection,
              alignmentStage: "FIELD_FORMING",
            }),
            motherCodeProfileReference: motherCodeReference,
            lifeArchetypeProfileReference: archetypeReference,
          }),
        );
        const missingMotherCode = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: fieldA.projection,
            motherCodeProfileReference: null,
            lifeArchetypeProfileReference: archetypeReference,
          }),
        );
        const missingArchetype = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: fieldA.projection,
            motherCodeProfileReference: motherCodeReference,
            lifeArchetypeProfileReference: null,
          }),
        );
        const invalidMotherCode = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: fieldA.projection,
            motherCodeProfileReference: Object.freeze({
              ...motherCodeReference,
              sourceEngine: "wrong_engine",
            }),
            lifeArchetypeProfileReference: archetypeReference,
          }),
        );
        const mismatchedArchetype = runtime.projectGenesisLifeForceInfusion(
          Object.freeze({
            morphologicalFieldAlignmentProjection: fieldA.projection,
            motherCodeProfileReference: motherCodeReference,
            lifeArchetypeProfileReference: Object.freeze({
              ...archetypeReference,
              sourceMotherCodeId: "mismatched-source",
            }),
          }),
        );
        assertEqual("P106 available", available.status, "AVAILABLE");
        assertEqual("P106 missing field unavailable", missingField.status, "UNAVAILABLE");
        assertEqual("P106 unaligned field unavailable", waitingField.status, "UNAVAILABLE");
        assertEqual("P106 missing MotherCode unavailable", missingMotherCode.status, "UNAVAILABLE");
        assertEqual("P106 missing archetype unavailable", missingArchetype.status, "UNAVAILABLE");
        assertEqual("P106 invalid MotherCode blocked", invalidMotherCode.status, "BLOCKED");
        assertEqual("P106 mismatched archetype blocked", mismatchedArchetype.status, "BLOCKED");

        if (available.status === "AVAILABLE") {
          const projection = available.projection;
          assertEqual("P106 infusion stage", projection.infusionStage, "FORCE_INFUSED");
          assertEqual("P106 source role", projection.sourceRole, "FORMAL_MOTHER_CODE_AND_LIFE_ARCHETYPE_REFERENCE_ONLY");
          assertEqual("P106 identity blind", projection.identityBlind, true);
          assertEqual("P106 no four symbol mutation", projection.noFourSymbolMutation, true);
          assertEqual("P106 no animal identity", projection.noAnimalIdentity, true);
          assertEqual("P106 no animal geometry", projection.noAnimalGeometry, true);
          assertEqual("P106 no Personal Star Beast reveal", projection.noPersonalStarBeastReveal, true);
          assertTrue("P106 generic force mode", ["DIRECTED_CORE", "DEEP_SUPPORT", "SPARK_RISE", "DIFFUSE_FLOW", "DEEP_RESERVE", "RADIANT_PRESENCE", "STILL_CORE", "OPEN_EXCHANGE"].includes(projection.lifeForceExpression.mode));
          assertTrue("P106 core pull positive", projection.lifeForceExpression.corePull > 0);
          assertTrue("P106 stability positive", projection.lifeForceExpression.stability > 0);

          const before = JSON.stringify(planResult.plan);
          const presence = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
            planResult.plan,
            timeResult.projection,
            ignitionResult.projection,
            fieldA.projection,
            projection,
          );
          const scene = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
            planResult.plan,
            timeResult.projection,
            ignitionResult.projection,
            fieldA.projection,
            projection,
          );
          assertEqual("presence receives force infusion", presence.lifeForceInfusionResponse.infusionStage, "FORCE_INFUSED");
          assertEqual("scene carries force infusion", scene.lifeForceInfusion?.infusionStage, "FORCE_INFUSED");
          assertEqual("P106 does not mutate plan", JSON.stringify(planResult.plan), before);

          if (fieldB.status === "AVAILABLE") {
            const availableB = runtime.projectGenesisLifeForceInfusion(
              Object.freeze({
                morphologicalFieldAlignmentProjection: fieldB.projection,
                motherCodeProfileReference: fixtureB.identitySourceReference.lifeArchetypeForce.sourceMotherCodeProfileReference,
                lifeArchetypeProfileReference: fixtureB.identitySourceReference.lifeArchetypeForce.sourceLifeArchetypeProfileReference,
              }),
            );
            assertEqual("P106 case B available", availableB.status, "AVAILABLE");
            if (availableB.status === "AVAILABLE") {
              assertTrue(
                "P106 A/B force expression differs",
                JSON.stringify(projection.lifeForceExpression) !==
                  JSON.stringify(availableB.projection.lifeForceExpression),
              );
            }
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`P106 life force infusion gate failed (${failures.length})`);
  for (const failure of failures) console.error(`FAIL | ${failure}`);
  process.exitCode = 1;
} else {
  console.log("P106 life force infusion gate passed");
}
