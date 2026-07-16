import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol:
    "docs/GUANYAO_P111_FIRST_IMPRESSION_MOTION_CONTRAST_CALIBRATION_PROTOCOL.md",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  p110Protocol:
    "docs/GUANYAO_P110_FIRST_IMPRESSION_AB_CONTRAST_CALIBRATION_PROTOCOL.md",
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
    "GUANYAO P111 First Impression Motion Contrast Calibration Protocol",
    "RC-GUANYAO-GENESIS-FIRST-IMPRESSION-MOTION-CONTRAST-CALIBRATION-P111",
    "生命组织已经不同，但运动太慢",
    "0.060 + flowUnit × 0.140",
    "0.180 + |bend| × 0.220",
    "不调整：",
    "工程 Gate 只能确认速率契约和隔离边界",
  ].forEach((marker) =>
    assertIncludes("P111 motion protocol", source.protocol, marker),
  );

  [
    "const FIRST_IMPRESSION_MOTION_CALIBRATION = Object.freeze({",
    "rotationBase: 0.06",
    "rotationRange: 0.14",
    "fieldFlowBase: 0.18",
    "fieldFlowBendScale: 0.22",
    "FIRST_IMPRESSION_MOTION_CALIBRATION.fieldFlowBase",
    "FIRST_IMPRESSION_MOTION_CALIBRATION.rotationBase",
    "flowUnit * FIRST_IMPRESSION_MOTION_CALIBRATION.rotationRange",
    "Math.abs(lifePresence.morphologicalField.bend)",
  ].forEach((marker) =>
    assertIncludes("P111 renderer motion contract", source.renderer, marker),
  );

  [
    "P110 First Impression A/B Contrast Calibration Protocol",
    "Case A Genesis Projection Bundle",
    "Case B Genesis Projection Bundle",
    "同一套 Manifestation Grammar 与同一个 Renderer",
  ].forEach((marker) =>
    assertIncludes("P111 keeps P110 A/B source", source.p110Protocol, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "PersonalStarBeastSceneModel",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("P111 renderer remains isolated", source.renderer, marker),
  );

  assertIncludes(
    "P111 standalone gate registered",
    packageJson.scripts?.["check-genesis-first-impression-motion-contrast-calibration"] ?? "",
    "node scripts/check-genesis-first-impression-motion-contrast-calibration.mjs",
  );
  assertIncludes(
    "P111 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-first-impression-motion-contrast-calibration",
  );
}

if (failures.length > 0) {
  console.error("FAIL | P111 first-impression motion contrast calibration");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | P111 first-impression motion contrast calibration gate");
}
