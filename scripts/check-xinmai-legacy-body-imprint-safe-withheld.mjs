import fs from "node:fs";

const files = {
  launch: fs.readFileSync("src/pages/LaunchLab.tsx", "utf8"),
  route: fs.readFileSync("src/pages/RealityProductionRouteEntry.tsx", "utf8"),
  archive: fs.readFileSync("src/pages/PersonalityRingPage.tsx", "utf8"),
  formation: fs.readFileSync("src/services/xinmaiCrystalFormationConsumer.ts", "utf8"),
  orchestrator: fs.readFileSync(
    "src/services/xinmaiCrystalFormationProductionOrchestrator.ts",
    "utf8",
  ),
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(
  !files.launch.includes("readPersonalityRingLite") &&
    !files.route.includes("readPersonalityRingLite"),
  "Production Returning consumers still read PersonalityRingLite",
);
assert(
  files.launch.includes("canonicalBodyImprintDecision") &&
    files.archive.includes('data-personality-ring-body-authority="FORBIDDEN"'),
  "Canonical cutover does not safely isolate Legacy Body Imprint",
);
for (const forbiddenApi of [
  "readPersonalityRingLite",
  "writePersistedPersonalityRingLiteState",
  "reconcileCanonicalFormationReceiptsToPersonalityRing",
]) {
  assert(
    !files.formation.includes(forbiddenApi) &&
      !files.orchestrator.includes(forbiddenApi),
    `New Formation still consumes Legacy mirror API: ${forbiddenApi}`,
  );
}
assert(
  files.archive.includes("LEGACY_HISTORY_READ_ONLY") &&
    files.archive.includes("LEGACY_HISTORY_LABEL_ONLY") &&
    !files.archive.includes("resolveLifeUniverseCrystalImprintGeometry") &&
    !files.archive.includes("resolveLifeUniverseCrystalSourceSlot"),
  "Legacy Archive is not constrained to read-only history",
);
console.log("[XINMAI LEGACY BODY IMPRINT SAFE WITHHELD] PASS");
