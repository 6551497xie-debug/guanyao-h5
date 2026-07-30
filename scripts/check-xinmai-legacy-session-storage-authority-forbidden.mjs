import fs from "node:fs";

const paths = [
  "src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts",
  "src/services/xinmaiGravityEntryRecoveryAdapter.ts",
  "src/services/xinmaiRealityEncounterIntentController.ts",
  "src/services/xinmaiGravityEntryAdmissionController.ts",
  "src/services/realityToGravityCutoverTransaction.ts",
  "src/services/xinmaiRealityPressureRecognitionController.ts",
];
const sources = paths.map((path) => [path, fs.readFileSync(path, "utf8")]);
for (const [path, source] of sources) {
  for (const forbidden of [
    "sessionStorage.setItem",
    "sessionStorage.removeItem",
    ".setItem(RECOVERY_STORAGE_KEY",
    ".removeItem(RECOVERY_STORAGE_KEY",
    ".setItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY",
    ".removeItem(GRAVITY_ENTRY_RECOVERY_STORAGE_KEY",
  ]) {
    if (source.includes(forbidden)) {
      throw new Error(`${path} retains legacy writer ${forbidden}`);
    }
  }
}
const legacy = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityLegacyAdapter.ts",
  "utf8",
);
for (const marker of [
  "readOnlyLegacy: true",
  "hasRealityAdventureLegacyWriterChanged",
  "noStorageWrite: true",
]) {
  if (!legacy.includes(marker)) throw new Error(`legacy boundary missing ${marker}`);
}
console.log("[XINMAI LEGACY SESSION STORAGE AUTHORITY FORBIDDEN] PASS");
