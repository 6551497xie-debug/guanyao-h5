import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_FOUR_SYMBOL_ALIGNMENT_PROTOCOL.md",
  type: "src/types/genesisFourSymbolAlignmentProjection.ts",
  service: "src/services/genesisFourSymbolAlignmentProjection.ts",
  birthMansionType: "src/types/genesisBirthMansionIgnitionProjection.ts",
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
    "四象不是召唤出来的兽",
    "本命星宿生命被宇宙看见后的形态场",
    "Formal Four Symbol Result Reference",
    "Genesis Four Symbol Alignment Projection",
    "FIELD_ALIGNED",
    "morphologicalFieldExpression",
    "noAnimalGeometry",
    "ISOLATED_PROTOTYPE_ONLY",
  ].forEach((marker) => assertIncludes("P105 protocol", source.protocol, marker));

  [
    "export type GenesisFourSymbolAlignmentInput",
    "export type GenesisFourSymbolAlignmentProjection",
    "GenesisFourSymbolAlignmentStage",
    "morphologicalFieldExpression",
    "cosmicRecognitionExpression",
    "EXTENDING_ARC",
    "RISING_FLOW",
    "CONVERGING_BOUNDARY",
    "ENCLOSING_DEPTH",
    "noAnimalIdentity: true",
    "noAnimalGeometry: true",
    "noMotherCodeExpression: true",
    "noPersonalStarBeastReveal: true",
  ].forEach((marker) => assertIncludes("P105 projection type", source.type, marker));

  [
    "export function projectGenesisFourSymbolAlignment",
    "birthMansionIgnitionProjection",
    "fourSymbolResultReference",
    "SEED_CLAIMED",
    "FORMAL_FOUR_SYMBOL_RESULT_REFERENCE_ONLY",
    "noAnimalModelGeneration",
    "noMotherCodeCalculation",
    "noPersonalStarBeastGeneration",
  ].forEach((marker) => assertIncludes("P105 mapping service", source.service, marker));
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
    assertExcludes("P105 mapping remains morphology-only", source.service, marker),
  );

  [
    "morphologicalFieldAlignmentResponse",
    "morphologicalFieldAlignmentProjectionReference",
    "GenesisFourSymbolAlignmentProjection",
  ].forEach((marker) => assertIncludes("P105 presence bridge", source.presenceType, marker));
  assertIncludes("P105 presence service accepts alignment", source.presenceService, "morphologicalFieldAlignmentProjection");
  assertIncludes("P105 renderer consumes alignment", source.renderer, "morphologicalFieldAlignment");
  assertIncludes("P105 renderer receives alignment", source.renderer, "morphologicalFieldAlignmentProjection");
  assertIncludes("P105 harness supplies alignment", source.harness, "projectGenesisFourSymbolAlignment");
  assertIncludes("P105 renderer contract carries alignment", source.rendererType, "morphologicalFieldAlignment: GenesisFourSymbolAlignmentProjection | null");
  assertIncludes("P105 gate registered", packageJson.scripts?.["check-genesis-four-symbol-alignment-projection"] ?? "", "node scripts/check-genesis-four-symbol-alignment-projection.mjs");
  assertIncludes("release includes P105 gate", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-four-symbol-alignment-projection");

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-genesis-four-symbol-alignment-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A, PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectGenesisTimeSequenceRecognition } from "./src/services/genesisTimeSequenceRecognitionProjection.ts";
        export { projectGenesisBirthMansionIgnition } from "./src/services/genesisBirthMansionIgnitionProjection.ts";
        export { projectGenesisFourSymbolAlignment } from "./src/services/genesisFourSymbolAlignmentProjection.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-four-symbol-alignment-gate-entry.ts",
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
  assertEqual("P105 time input available", timeResult.status, "AVAILABLE");

  const planResult = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.sceneModelReference,
  );
  assertEqual("P105 formal plan available", planResult.status, "PLANNED");

  if (timeResult.status === "AVAILABLE" && planResult.status === "PLANNED") {
    const mansionResultReference = Object.freeze({
      referenceType: "STAR_BEAST_GENESIS_MANSION",
      referenceId: "gate:birth-mansion:case-a",
      sourceStarbeastDerivationReference:
        runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.mansionSeedReference
          .sourceMansionResultReference.resultReference,
    });
    const ignitionResult = runtime.projectGenesisBirthMansionIgnition(
      Object.freeze({
        timeSequenceRecognitionProjection: timeResult.projection,
        mansionResultReference,
      }),
    );
    assertEqual("P105 birth mansion ignition available", ignitionResult.status, "AVAILABLE");

    if (ignitionResult.status === "AVAILABLE") {
      const fourSymbolResultReference = Object.freeze({
        referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
        sourceEngine: "guanyao_starbeast_engine",
        resultReference:
          runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.fourSymbolFieldReference
            .sourceFourSymbolResultReference.resultReference,
      });
      const available = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({
          birthMansionIgnitionProjection: ignitionResult.projection,
          fourSymbolResultReference,
        }),
      );
      const missingIgnition = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({ birthMansionIgnitionProjection: null, fourSymbolResultReference }),
      );
      const waiting = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({
          birthMansionIgnitionProjection: Object.freeze({
            ...ignitionResult.projection,
            ignitionStage: "SEED_APPROACHING",
          }),
          fourSymbolResultReference,
        }),
      );
      const missingFourSymbol = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({
          birthMansionIgnitionProjection: ignitionResult.projection,
          fourSymbolResultReference: null,
        }),
      );
      const invalidFourSymbol = runtime.projectGenesisFourSymbolAlignment(
        Object.freeze({
          birthMansionIgnitionProjection: ignitionResult.projection,
          fourSymbolResultReference: Object.freeze({
            ...fourSymbolResultReference,
            sourceEngine: "wrong_engine",
          }),
        }),
      );
      assertEqual("P105 available", available.status, "AVAILABLE");
      assertEqual("P105 missing ignition unavailable", missingIgnition.status, "UNAVAILABLE");
      assertEqual("P105 seed not claimed unavailable", waiting.status, "UNAVAILABLE");
      assertEqual("P105 missing four symbol unavailable", missingFourSymbol.status, "UNAVAILABLE");
      assertEqual("P105 malformed four symbol blocked", invalidFourSymbol.status, "BLOCKED");

      if (available.status === "AVAILABLE") {
        const projection = available.projection;
        assertEqual("P105 alignment stage", projection.alignmentStage, "FIELD_ALIGNED");
        assertEqual("P105 no animal identity", projection.noAnimalIdentity, true);
        assertEqual("P105 no animal geometry", projection.noAnimalGeometry, true);
        assertEqual("P105 no MotherCode expression", projection.noMotherCodeExpression, true);
        assertEqual("P105 no Personal Star Beast reveal", projection.noPersonalStarBeastReveal, true);
        assertEqual("P105 source role", projection.sourceRole, "FORMAL_FOUR_SYMBOL_RESULT_REFERENCE_ONLY");
        assertEqual("P105 no animal field geometry", projection.morphologicalFieldExpression.noAnimalGeometry, true);
        assertEqual("P105 opaque four symbol reference", projection.sourceResultReferenceId, fourSymbolResultReference.referenceType);
        assertTrue("P105 field mode is generic", ["EXTENDING_ARC", "RISING_FLOW", "CONVERGING_BOUNDARY", "ENCLOSING_DEPTH"].includes(projection.morphologicalFieldExpression.fieldMode));
        assertTrue("P105 does not copy mansion fact", !("mansion" in projection));

        const before = JSON.stringify(planResult.plan);
        const presence = runtime.projectPersonalStarBeastRenderPlanToLifePresence(
          planResult.plan,
          timeResult.projection,
          ignitionResult.projection,
          projection,
        );
        const scene = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
          planResult.plan,
          timeResult.projection,
          ignitionResult.projection,
          projection,
        );
        assertEqual("presence receives four symbol alignment", presence.morphologicalFieldAlignmentResponse.alignmentStage, "FIELD_ALIGNED");
        assertEqual("scene carries four symbol alignment", scene.morphologicalFieldAlignment?.alignmentStage, "FIELD_ALIGNED");
        assertEqual("P105 does not mutate plan", JSON.stringify(planResult.plan), before);

        const caseBResult = runtime.projectGenesisFourSymbolAlignment(
          Object.freeze({
            birthMansionIgnitionProjection: ignitionResult.projection,
            fourSymbolResultReference: Object.freeze({
              referenceType: "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
              sourceEngine: "guanyao_starbeast_engine",
              resultReference:
                runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B.fourSymbolFieldReference
                  .sourceFourSymbolResultReference.resultReference,
            }),
          }),
        );
        assertEqual("P105 case B available", caseBResult.status, "AVAILABLE");
        if (caseBResult.status === "AVAILABLE") {
          assertTrue(
            "P105 A/B morphology differs",
            JSON.stringify(projection.morphologicalFieldExpression) !==
              JSON.stringify(caseBResult.projection.morphologicalFieldExpression),
          );
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`P105 four symbol alignment gate failed (${failures.length})`);
  for (const failure of failures) console.error(`FAIL | ${failure}`);
  process.exitCode = 1;
} else {
  console.log("P105 four symbol alignment gate passed");
}
