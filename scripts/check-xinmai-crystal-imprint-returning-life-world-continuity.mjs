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
    launch.includes("readXinmaiCanonicalBodyImprintRecovery") &&
    launch.includes("canonicalBodyImprintDecision"),
  "Returning life world still interprets PersonalityRingLite as Body Imprint",
);
check(
  !route.includes("readPersonalityRingLite") &&
    route.includes("readXinmaiCanonicalBodyImprintRecovery") &&
    route.includes(
      "canonicalBodyImprintDecision={canonicalBodyImprintDecision}",
    ),
  "Reality Route still reads Legacy PersonalityRing as current Body memory",
);
check(
  archive.includes(
    'data-personality-ring-page="CANONICAL_BODY_IMPRINT_WITH_LEGACY_HISTORY"',
  ) &&
    archive.includes("readXinmaiCanonicalBodyImprintRecovery") &&
    archive.includes('data-personality-ring-body-authority="FORBIDDEN"'),
  "Archive does not separate canonical Body Imprint from Legacy history",
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
