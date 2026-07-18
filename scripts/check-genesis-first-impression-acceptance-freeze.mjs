import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol:
    "docs/GUANYAO_P112_GENESIS_FIRST_IMPRESSION_ACCEPTANCE_FREEZE_PROTOCOL.md",
  p110Protocol:
    "docs/GUANYAO_P110_FIRST_IMPRESSION_AB_CONTRAST_CALIBRATION_PROTOCOL.md",
  p111Protocol:
    "docs/GUANYAO_P111_FIRST_IMPRESSION_MOTION_CONTRAST_CALIBRATION_PROTOCOL.md",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  fixtureConsumer: "src/services/fixtureGenesisVisualConsumerSource.ts",
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
    "GUANYAO P112 Genesis First Impression Acceptance Freeze Protocol",
    "RC-GUANYAO-GENESIS-FIRST-IMPRESSION-ACCEPTANCE-FREEZE-P112",
    "不同生命的星空组织已经能够在第一眼体验中被感知为不同",
    "ARRIVAL 0–1400ms / FORMATION 1400–3800ms / PRESENCE 3800ms",
    "同一套 Manifestation Grammar、同一个 Renderer、两个正式身份 Fixture",
    "星核与周围结构的关系",
    "Stellar Skeleton",
    "Morphological Field",
    "运动速率与姿态响应",
    "必须重新进行第一眼验收",
    "不把 Prototype 升级为 Production",
    "人工预览",
  ].forEach((marker) =>
    assertIncludes("P112 acceptance freeze protocol", source.protocol, marker),
  );

  [
    "Case A Genesis Projection Bundle",
    "Case B Genesis Projection Bundle",
    "同一套 Manifestation Grammar 与同一个 Renderer",
  ].forEach((marker) =>
    assertIncludes("P112 preserves P110 contrast baseline", source.p110Protocol, marker),
  );

  [
    "0.060 + flowUnit × 0.140",
    "0.180 + |bend| × 0.220",
    "ARRIVAL 0–1400ms / FORMATION 1400–3800ms / PRESENCE 3800ms",
  ].forEach((marker) =>
    assertIncludes("P112 preserves P111 motion baseline", source.p111Protocol, marker),
  );

  [
    "resolveGenesisVisualConsumerSource({",
    "fixtureCaseIndex: formalCaseIndex === 0 ? 0 : 1",
    "consumerSource?.projectionBundle",
    "看看另一种生命",
  ].forEach((marker) =>
    assertIncludes("P112 formal A/B harness remains", source.harness, marker),
  );
  [
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.visualSourceReference",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B.visualSourceReference",
    "FIXTURE_VISUAL_SOURCES[fixtureCaseIndex]",
  ].forEach((marker) =>
    assertIncludes("P112 formal A/B fixture boundary remains", source.fixtureConsumer, marker),
  );

  [
    "PersonalStarBeastSceneModel",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("P112 renderer remains identity blind", source.renderer, marker),
  );

  assertIncludes(
    "P112 standalone gate registered",
    packageJson.scripts?.["check-genesis-first-impression-acceptance-freeze"] ?? "",
    "node scripts/check-genesis-first-impression-acceptance-freeze.mjs",
  );
  assertIncludes(
    "P112 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-first-impression-acceptance-freeze",
  );
}

if (failures.length > 0) {
  console.error("FAIL | P112 genesis first-impression acceptance freeze");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | P112 genesis first-impression acceptance freeze gate");
}
