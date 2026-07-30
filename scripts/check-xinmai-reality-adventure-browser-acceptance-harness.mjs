import fs from "node:fs";

const runner = fs.readFileSync(
  "scripts/run-xinmai-reality-adventure-continuity-browser-acceptance.mjs",
  "utf8",
);
const scenario = fs.readFileSync(
  "src/acceptance/xinmaiGravityEntryAcceptanceScenario.ts",
  "utf8",
);
const panel = fs.readFileSync(
  "src/acceptance/XinmaiGravityEntryAcceptanceEvidencePanel.tsx",
  "utf8",
);
const productionPort = fs.readFileSync(
  "src/services/gravityEntryAcceptanceRuntimePort.ts",
  "utf8",
);
const acceptancePort = fs.readFileSync(
  "src/acceptance/xinmaiGravityEntryAcceptanceFaultPort.ts",
  "utf8",
);
const genesis = fs.readFileSync(
  "src/pages/GenesisProductionExperiencePage.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "REALITY_ADVENTURE_MOTION",
  "REALITY_ADVENTURE_REDUCED_MOTION",
  "REALITY_ADVENTURE_DIRECT_URL",
]) {
  assert(runner.includes(marker), `browser runner missing ${marker}`);
  assert(scenario.includes(marker), `acceptance scenario missing ${marker}`);
}
for (const marker of [
  "observeRealityEncounterRequestOutcome",
  "observeRealityPressureRecognitionOutcome",
  "observeRealityToGravityCutoverResult",
]) {
  assert(productionPort.includes(marker), `neutral port missing ${marker}`);
  assert(acceptancePort.includes(marker), `acceptance port missing ${marker}`);
}
assert(
  scenario.includes('typeof indexedDB.databases === "function"') &&
    scenario.includes("return emptySnapshot"),
  "acceptance evidence must not create an empty canonical database",
);
assert(
  genesis.indexOf('intentResult?.status === "READY"') <
    genesis.indexOf("setRecognitionRealityResult(result)") &&
    genesis.includes("observeRealityEncounterRequestOutcome(intentResult)"),
  "Genesis must preserve the entry action until canonical Intent confirmation",
);
for (const marker of [
  "data-xinmai-recognition-receipt-count",
  "data-xinmai-gravity-transfer-count",
  "data-xinmai-gravity-admission-count",
  "readRealityAdventureContinuityAcceptanceSnapshot",
]) {
  assert(panel.includes(marker), `read-only evidence panel missing ${marker}`);
}
console.log("[XINMAI REALITY ADVENTURE BROWSER ACCEPTANCE HARNESS] PASS");
