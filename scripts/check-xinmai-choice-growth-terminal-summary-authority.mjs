import fs from "node:fs";

const adapter = fs.readFileSync(
  "src/services/xinmaiChoiceGrowthTerminalSummaryAdapter.ts",
  "utf8",
);
const route = fs.readFileSync(
  "src/pages/GravityProductionRouteEntry.tsx",
  "utf8",
);
const host = fs.readFileSync(
  "src/components/GravityProductionSurfaceHost.tsx",
  "utf8",
);
const page = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const acceptance = fs.readFileSync(
  "src/pages/XinmaiLivedGrowthAcceptancePage.tsx",
  "utf8",
);
const renderer = fs.readFileSync(
  "src/renderers/genesisWebGLRendererCore.ts",
  "utf8",
);

const requireSource = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
};
const forbidSource = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
};

requireSource(
  "summary adapter canonical read",
  adapter,
  "readXinmaiLivedGrowthCanonicalState",
);
requireSource(
  "summary adapter read-only boundary",
  adapter,
  "readOnly: true",
);
requireSource(
  "summary adapter no backfill",
  adapter,
  "noBackfill: true",
);
for (const state of [
  "NONE",
  "CHOICE_COMMITTED",
  "LIVED_RESPONSE_RECORDED",
  "ELIGIBILITY_AVAILABLE",
  "CRYSTAL_FORMED",
  "RECOVERY_UNAVAILABLE",
  "RECOVERY_CORRUPTED",
]) {
  requireSource(`summary state ${state}`, adapter, `"${state}"`);
}
requireSource(
  "route owns adapter",
  route,
  "readChoiceGrowthTerminalSummary",
);
requireSource(
  "route owns revision reread",
  route,
  "subscribeToXinmaiLivedGrowthRecoveryRevision",
);
requireSource(
  "host only forwards summary",
  host,
  "growthTerminalSummary={growthTerminalSummary}",
);
forbidSource(
  "host direct canonical read",
  host,
  "readXinmaiLivedGrowthCanonicalState",
);
forbidSource(
  "page direct canonical read",
  page,
  "readXinmaiLivedGrowthCanonicalState",
);
forbidSource("page direct indexeddb", page, "indexedDB.open");
forbidSource(
  "renderer terminal summary",
  renderer,
  "ChoiceGrowthTerminalSummary",
);
requireSource(
  "acceptance reads through summary adapter",
  acceptance,
  "readChoiceGrowthTerminalSummary(growthSummaryRequest)",
);
requireSource(
  "acceptance exposes typed summary evidence",
  acceptance,
  'data-testid="choice-terminal-summary"',
);

const receiptIndex = adapter.indexOf(
  'state: "CRYSTAL_FORMED" as const',
);
const eligibilityIndex = adapter.indexOf(
  'state: "ELIGIBILITY_AVAILABLE" as const',
);
const factIndex = adapter.indexOf(
  'state: "LIVED_RESPONSE_RECORDED" as const',
);
const choiceIndex = adapter.indexOf(
  'state: "CHOICE_COMMITTED" as const',
);
if (
  receiptIndex < 0 ||
  eligibilityIndex < 0 ||
  factIndex < 0 ||
  choiceIndex < 0 ||
  !(receiptIndex < eligibilityIndex &&
    eligibilityIndex < factIndex &&
    factIndex < choiceIndex)
) {
  throw new Error("growth terminal priority drifted");
}

console.log("[XINMAI CHOICE GROWTH TERMINAL SUMMARY AUTHORITY] PASS");
