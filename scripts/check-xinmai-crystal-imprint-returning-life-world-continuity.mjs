import fs from "node:fs";

const launch = fs.readFileSync("src/pages/LaunchLab.tsx", "utf8");
const route = fs.readFileSync(
  "src/pages/RealityProductionRouteEntry.tsx",
  "utf8",
);
const archive = fs.readFileSync("src/pages/PersonalityRingPage.tsx", "utf8");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

check(
  launch.includes("hasPersistedRecognizedLifeIdentity()") &&
    launch.includes("restorePersistedRealUserGenesisVisualSourceContext()") &&
    launch.includes("readPersistedGenesisVisualContinuity()"),
  "same recognized life identity is not restored",
);
check(
  !launch.includes("readPersonalityRingLite") &&
    !launch.includes("LATEST_CRYSTAL_ON_SAME_BODY") &&
    launch.includes(
      'data-returning-life-body-imprint-authority="SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER"',
    ),
  "Returning life world still interprets PersonalityRingLite as Body Imprint",
);
check(
  !route.includes("readPersonalityRingLite") &&
    route.includes("latestCrystalMemoryKey={") &&
    route.includes("latestCrystalSourceSlot={"),
  "Reality Route still reads Legacy PersonalityRing as current Body memory",
);
check(
  archive.includes('data-personality-ring-page="LEGACY_HISTORY_READ_ONLY"') &&
    archive.includes(
      'data-body-imprint-authority="SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER"',
    ) &&
    archive.includes("canonicalBodyImprintReadModelAvailable = false"),
  "Legacy Archive still declares canonical Body Imprint success",
);
check(
  packageJson.scripts?.[
    "check-xinmai-crystal-imprint-returning-life-world-continuity"
  ] ===
    "node scripts/check-xinmai-crystal-imprint-returning-life-world-continuity.mjs",
  "package script is missing or incorrect",
);

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}
console.log(
  "XINMAI Legacy Body Imprint safe-withheld continuity gate passed.",
);
