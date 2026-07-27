import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const launchPath = path.join(root, "src/pages/LaunchLab.tsx");
const packagePath = path.join(root, "package.json");
const launch = fs.readFileSync(launchPath, "utf8");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const failures = [];

const requireIncludes = (label, source, markers) => {
  for (const marker of markers) {
    if (!source.includes(marker)) {
      failures.push(`${label}: missing ${JSON.stringify(marker)}`);
    }
  }
};

requireIncludes("persisted life identity stays authoritative", launch, [
  "hasPersistedRecognizedLifeIdentity()",
  "restorePersistedRealUserGenesisVisualSourceContext()",
  "readPersistedGenesisVisualContinuity()",
  'data-returning-life-world={',
  '"SAME_RECOGNIZED_LIFE"',
]);

requireIncludes("latest archived imprint is restored", launch, [
  "readPersonalityRingLite()",
  "returningLatestImprint",
  "returningLatestImprintSourceSlot",
  "resolveLifeUniverseCrystalImprintGeometry({",
  'data-returning-life-imprint="LATEST_CRYSTAL_ON_SAME_BODY"',
]);

requireIncludes("same source position becomes body memory", launch, [
  "returningLatestImprintBodyPath",
  "returningLatestImprintBodyPoint",
  'data-returning-life-imprint-source="ARCHIVED_USER_RECOGNIZED_RESPONSE"',
  'data-returning-life-imprint-direction="SAME_RESPONSE_POSITION_INTO_SAME_BODY"',
  'data-returning-life-imprint-form="LIFE_TEXTURE_NOT_COLLECTIBLE"',
  'data-returning-life-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"',
]);

requireIncludes("memory remains memory", launch, [
  'data-returning-life-imprint-status="REMEMBERED_NOT_CURRENT_EVENT"',
  'data-returning-life-priority="IDENTITY_THEN_STATE_THEN_EXPERIENCE_THEN_IMPRINT"',
  '"那次变化，仍在它的生命纹路里。"',
]);

requireIncludes("returned imprint is a restrained trace", launch, [
  "gy-returning-life-world__imprint-flow",
  "gy-returning-life-world__imprint-origin",
  "gy-returning-life-world__imprint-trace",
  "@keyframes gy-returning-life-imprint-remember",
]);

const returningSurfaceStart = launch.indexOf(
  'className="gy-returning-life-world__imprint"',
);
const returningSurfaceEnd = launch.indexOf(
  "</svg>",
  returningSurfaceStart,
);
const returningSurface =
  returningSurfaceStart >= 0 && returningSurfaceEnd >= 0
    ? launch.slice(returningSurfaceStart, returningSurfaceEnd)
    : "";
for (const forbidden of ["<rect", "LEVEL", "SCORE", "REWARD"]) {
  if (returningSurface.includes(forbidden)) {
    failures.push(
      `returning imprint must stay a body texture: found ${JSON.stringify(forbidden)}`,
    );
  }
}

const script =
  packageJson.scripts?.[
    "check-xinmai-crystal-imprint-returning-life-world-continuity"
  ];
if (
  script !==
  "node scripts/check-xinmai-crystal-imprint-returning-life-world-continuity.mjs"
) {
  failures.push("package script is missing or incorrect");
}

if (failures.length > 0) {
  console.error(
    `XINMAI Crystal imprint returning life world gate failed:\n${failures
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log(
  "XINMAI Crystal imprint returning life world continuity gate passed.",
);
