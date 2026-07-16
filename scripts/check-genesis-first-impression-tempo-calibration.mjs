import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_P109_FIRST_IMPRESSION_TEMPO_CALIBRATION_PROTOCOL.md",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  styles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
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
    "GUANYAO P109 First Impression Tempo Calibration Protocol",
    "RC-GUANYAO-GENESIS-FIRST-IMPRESSION-TEMPO-CALIBRATION-P109",
    "加快生命抵达，保留生命在场",
    "ARRIVAL    0ms → 1400ms",
    "FORMATION  1400ms → 3800ms",
    "PRESENCE   3800ms → 持续停留",
    "不改变生命身份、显化语法、Scene Model、RenderPlan、Renderer",
    "人工验收",
  ].forEach((marker) =>
    assertIncludes("P109 tempo protocol", source.protocol, marker),
  );

  [
    "const FIRST_IMPRESSION_TIMING = Object.freeze({",
    "arrivalEndMs: 1400",
    "presenceStartMs: 3800",
    "FIRST_IMPRESSION_TIMING.arrivalEndMs",
    "FIRST_IMPRESSION_TIMING.presenceStartMs",
    'type FirstImpressionPhase = "ARRIVAL" | "FORMATION" | "PRESENCE"',
    "window.requestAnimationFrame(animate)",
    "看看另一种生命",
  ].forEach((marker) =>
    assertIncludes("P109 harness tempo contract", source.harness, marker),
  );

  [
    "opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
    "filter 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
    "transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)",
    "transition: opacity 1400ms ease, transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
    "transition: opacity 520ms ease 320ms, transform 520ms ease 320ms",
    ".gy-p100--arrival",
    ".gy-p100--formation",
    ".gy-p100--presence",
  ].forEach((marker) =>
    assertIncludes("P109 tempo shell", source.styles, marker),
  );

  [
    "requestAnimationFrame",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "PersonalStarBeastSceneModel",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("P109 renderer remains isolated", source.renderer, marker),
  );

  assertIncludes(
    "P109 standalone gate registered",
    packageJson.scripts?.["check-genesis-first-impression-tempo-calibration"] ?? "",
    "node scripts/check-genesis-first-impression-tempo-calibration.mjs",
  );
  assertIncludes(
    "P109 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-first-impression-tempo-calibration",
  );
}

if (failures.length > 0) {
  console.error("FAIL | P109 first-impression tempo calibration");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | P109 first-impression tempo calibration gate");
}
