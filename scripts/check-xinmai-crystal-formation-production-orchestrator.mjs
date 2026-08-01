import fs from "node:fs";

const orchestrator = fs.readFileSync(
  "src/services/xinmaiCrystalFormationProductionOrchestrator.ts",
  "utf8",
);
const surface = fs.readFileSync(
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "utf8",
);
const acceptance = fs.readFileSync(
  "src/pages/XinmaiLivedGrowthAcceptancePage.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const marker of [
  '"UNIQUE_PRODUCTION_CALLER"',
  'trigger: "POST_FACT_COMMIT"',
  'trigger: "RECOVERY_RETRY"',
  "readXinmaiLivedGrowthCanonicalState",
  "formCrystalFromEligibility",
  'successAuthority: "IDB_TRANSACTION_COMPLETE"',
  "recoveryCreatesEligibility: false",
  'XINMAI_PRODUCTION_CRYSTAL_FORMATION_REQUEST_POLICY:',
  '| "ENABLED"',
  '| "PAUSED" = "ENABLED"',
  'return safeWithheld("PRODUCTION_FORMATION_PAUSED")',
]) {
  assert(
    orchestrator.includes(marker) || surface.includes(marker),
    `missing Production Formation marker ${marker}`,
  );
}
assert(
  surface.includes("orchestrateProductionCrystalFormation") &&
    !surface.includes("formCrystalFromEligibility"),
  "Page bypasses the unique Production Orchestrator",
);
const confirmStart = surface.indexOf("const confirmFact");
const retryStart = surface.indexOf("const retryFormation", confirmStart);
assert(confirmStart >= 0 && retryStart > confirmStart, "Fact flow is not inspectable");
assert(
  !surface.slice(confirmStart, retryStart).includes("onRealityHandoff"),
  "Fact confirmation still hands off to /reality before Formation",
);
assert(
  surface.includes("currentFormationReceipt === null") &&
    surface.includes("handoffConfirmedCrystal"),
  "Reality handoff is not gated by a confirmed Formation Receipt",
);
assert(
  acceptance.includes("formCrystalFromEligibility"),
  "Development Acceptance lost its isolated low-level Formation harness",
);
console.log("[XINMAI CRYSTAL FORMATION PRODUCTION ORCHESTRATOR] PASS");
