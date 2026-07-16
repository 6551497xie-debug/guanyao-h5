import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol:
    "docs/GUANYAO_P110_FIRST_IMPRESSION_AB_CONTRAST_CALIBRATION_PROTOCOL.md",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  fixtures: "src/mocks/starBeastSceneModelFixtures.ts",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
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
    "GUANYAO P110 First Impression A/B Contrast Calibration Protocol",
    "RC-GUANYAO-GENESIS-FIRST-IMPRESSION-AB-CONTRAST-CALIBRATION-P110",
    "Case A Genesis Projection Bundle",
    "Case B Genesis Projection Bundle",
    "同一套 Manifestation Grammar 与同一个 Renderer",
    "不能作为真实 A/B 第一眼验收样本",
    "核心与骨架的组织关系",
    "人工第一眼验收",
  ].forEach((marker) =>
    assertIncludes("P110 contrast protocol", source.protocol, marker),
  );

  [
    "const createGenesisProjectionBundle =",
    "const FORMAL_PROJECTION_BUNDLES = Object.freeze([",
    "createGenesisProjectionBundle(PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A)",
    "createGenesisProjectionBundle(PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B)",
    "fixture.mansionSeedReference",
    "fixture.fourSymbolFieldReference",
    "fixture.identitySourceReference",
    "referenceId: `prototype:reality-pressure:${fixture.fixtureId}`",
    "const projectionBundle = FORMAL_PROJECTION_BUNDLES[formalCaseIndex]",
    "projectionBundle.morphologicalFieldAlignmentProjection",
    "projectionBundle.lifeForceInfusionProjection",
    "projectionBundle.personalRevealProjection",
    "projectionBundle.realityPressureProjection",
    "}, [plan, projectionBundle, replayKey]);",
  ].forEach((marker) =>
    assertIncludes("P110 per-case projection binding", source.harness, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B",
  ].forEach((marker) =>
    assertIncludes("P110 formal fixture sources", source.fixtures, marker),
  );

  [
    "const BIRTH_MANSION_RESULT_REFERENCE =",
    "const FOUR_SYMBOL_RESULT_REFERENCE =",
    "const PERSONAL_REVEAL_RESULT =",
    "const REALITY_PRESSURE_RESULT =",
  ].forEach((marker) =>
    assertExcludes("P110 no shared Case A projection", source.harness, marker),
  );

  [
    "PersonalStarBeastSceneModel",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "requestAnimationFrame",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("P110 renderer remains identity blind", source.renderer, marker),
  );

  assertIncludes(
    "P110 standalone gate registered",
    packageJson.scripts?.["check-genesis-first-impression-ab-contrast-calibration"] ?? "",
    "node scripts/check-genesis-first-impression-ab-contrast-calibration.mjs",
  );
  assertIncludes(
    "P110 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-first-impression-ab-contrast-calibration",
  );
}

if (failures.length > 0) {
  console.error("FAIL | P110 first-impression A/B contrast calibration");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | P110 first-impression A/B contrast calibration gate");
}
