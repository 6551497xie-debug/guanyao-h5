import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { build } from "esbuild";

const read = (path) => readFileSync(path, "utf8");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[formal-state-matrix] ${message}`);
};

const packageJson = JSON.parse(read("package.json"));
const gateName = "check:xinmai-semantic-constitution-final-formal-state-matrix";
assert(packageJson.scripts?.[gateName] === "node scripts/check-xinmai-semantic-constitution-final-formal-state-matrix.mjs", "direct gate is not registered");
assert(packageJson.scripts?.["check:xinmai-lived-growth-authority"]?.includes(gateName), "full suite does not include the direct gate");

const bundle = await build({
  stdin: { contents: 'export * from "./src/services/xinmaiSemanticConstitutionFormalStateMatrix.ts"; export * from "./src/services/xinmaiSemanticConstitutionFormalStateConsumerMap.ts";', resolveDir: process.cwd(), sourcefile: "formal-state-matrix-gate.ts", loader: "ts" },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const runtime = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const matrix = runtime.XINMAI_SEMANTIC_CONSTITUTION_FORMAL_STATE_MATRIX;
const required = Object.freeze({
  BIRTH: ["EMPTY", "VALID", "RANGE", "UNKNOWN", "FAILURE", "RECOVERY"],
  GENESIS: ["LOADING", "FORMING", "READY", "FAILURE", "RETURNING"],
  REALITY: ["NO_INTENT", "LOADING", "ADMISSION_READY", "CANDIDATE_LOADING", "CANDIDATE_READY", "SELECTED", "RETRYABLE", "NON_RETRYABLE", "WITHHELD", "ALREADY_ACTIVE", "RECOVERY", "FRESH_CYCLE"],
  SIX_DIMENSION: ["LOADING", "PREPARING", "OPEN", "SAVING", "SAVED", "RETRYABLE", "NON_RETRYABLE", "RECEIPT_COMPLETE", "LEGACY_GENERIC_RECOVERY"],
  CHOICE: ["LOADING", "READY", "COMMITTED", "DEPARTURE_PREPARING", "DEPARTED", "RECOVERY"],
  RETURN: ["PENDING", "SELECTION", "NOT_ATTEMPTED", "REJECTED", "FORMATION_PENDING", "RETRYABLE", "NON_RETRYABLE", "FORMED"],
  OWNERSHIP: ["PENDING", "READY", "NAMING_SAVE", "NAMING_SKIP", "OLD_NAME_ADJUST", "FRESH_CYCLE_PREPARING", "FAILURE", "RECOVERY"],
  ARCHIVE: ["EMPTY", "ONE", "MULTIPLE", "LOADING", "RECOVERY", "DIRECT_GUARD"],
});
for (const [area, states] of Object.entries(required)) {
  for (const state of states) {
    const rows = matrix.filter((row) => row.area === area && row.state === state);
    assert(rows.length === 1, `${area}/${state} must appear exactly once`);
    for (const key of ["purpose", "currentFact", "nextAction", "exitConsequence"]) assert(rows[0][key].trim(), `${area}/${state} missing ${key}`);
    assert(["NOT_APPLICABLE", "RETRYABLE", "NON_RETRYABLE"].includes(rows[0].retryability), `${area}/${state} invalid retryability`);
  }
}
assert(matrix.length === Object.values(required).flat().length, "matrix contains unknown or duplicate states");
const bindings = runtime.XINMAI_FORMAL_STATE_CONSUMER_BINDINGS;
assert(bindings.length === matrix.length, "consumer map must bind every formal state");
assert(runtime.XinmaiSemanticConstitutionFormalStateConsumerMap.unknownConsumers === 0, "consumer map UNKNOWN must be zero");
for (const row of matrix) {
  const matches = bindings.filter((binding) => binding.area === row.area && binding.state === row.state);
  assert(matches.length === 1, `${row.area}/${row.state} must have one consumer binding`);
  assert(matches[0].applicability === "WIRED" || Boolean(matches[0].notApplicableReason), `${row.area}/${row.state} unaccounted consumer`);
  assert(matches[0].publicChannels.includes("VISIBLE") && matches[0].publicChannels.includes("STATUS") && matches[0].publicChannels.includes("ARIA"), `${row.area}/${row.state} public channels incomplete`);
}

const formalConsumers = Object.freeze([
  "src/App.tsx",
  "src/components/XinmaiGenesisBirthCoordinateControls.tsx",
  "src/pages/GenesisProductionExperiencePage.tsx",
  "src/pages/LaunchLab.tsx",
  "src/pages/RealityProductionRouteEntry.tsx",
  "src/pages/GravityProductionRouteEntry.tsx",
  "src/pages/GravityPage.tsx",
  "src/components/XinmaiLifeReflectionGuide.tsx",
  "src/components/XinmaiSixDimensionResponseMap.tsx",
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "src/components/XinmaiCrystalFormationOwnershipMoment.tsx",
  "src/pages/PersonalityRingPage.tsx",
  "src/services/xinmaiRealityEntryPresentationResolver.ts",
  "src/services/xinmaiPostOwnershipNextRealityCyclePresentationResolver.ts",
  "src/services/guanyaoDynamicsExperienceReadinessPresentationAdapter.ts",
  "src/services/guanyaoDynamicsExperienceStateAdapter.ts",
  "src/services/guanyaoDynamicsCurrentCrystalPresentationAdapter.ts",
  "src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts",
  "src/services/xinmaiJourneySemanticPresentationResolver.ts",
  "src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts",
  "src/services/xinmaiSemanticConstitutionFormalStateMatrix.ts",
  "src/styles/xinmai-visual-life-system.css",
]);
const source = formalConsumers.map((path) => read(path)).join("\n");
const publicSource = source
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|\n)\s*\/\/[^\n]*/g, "$1");
for (const forbidden of ["本命", "原始生命倾向", "同一生命", "生命核心", "生命的流动", "这一轮先到这里", "回到生命世界"]) {
  assert(!publicSource.includes(forbidden), `forbidden public semantic remains: ${forbidden}`);
}
for (const forbidden of ["Crystal", "Intent", "Encounter", "Fact", "Receipt", "Authority", "digest", "SAFE_WITHHELD"]) {
  const jsxText = new RegExp(`>\\s*[\\u3400-\\u9fff][^<{]{0,160}\\b${forbidden}\\b[^<{]{0,160}<`);
  const publicAttribute = new RegExp(`(?:aria-label|title|placeholder)=["'][^"']*\\b${forbidden}\\b[^"']*["']`);
  assert(!jsxText.test(publicSource), `internal term visible in JSX: ${forbidden}`);
  assert(!publicAttribute.test(publicSource), `internal term visible in accessible copy: ${forbidden}`);
}
for (const requiredCopy of ["正在准备身体观察。", "你选择的现实情境已经保留；控件就绪后可开始选择。", "重试准备现实入口", "返回旅程入口", "旧记录证明六个窗口曾完成，但没有保存每项具体选择。"]) {
  assert(source.includes(requiredCopy), `required factual state copy missing: ${requiredCopy}`);
}
assert(read("src/services/xinmaiRealityEntryPresentationResolver.ts").includes("readXinmaiFormalStatePresentation"), "Reality entry does not consume the formal state matrix");
for (const path of [
  "src/components/XinmaiGenesisBirthCoordinateControls.tsx",
  "src/pages/GenesisProductionExperiencePage.tsx",
  "src/pages/GravityProductionRouteEntry.tsx",
  "src/pages/GravityPage.tsx",
  "src/components/XinmaiLifeReflectionGuide.tsx",
  "src/services/guanyaoDynamicsExperienceReadinessPresentationAdapter.ts",
  "src/services/guanyaoDynamicsExperienceStateAdapter.ts",
  "src/services/guanyaoDynamicsCurrentCrystalPresentationAdapter.ts",
  "src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts",
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "src/components/XinmaiCrystalFormationOwnershipMoment.tsx",
  "src/services/xinmaiPostOwnershipNextRealityCyclePresentationResolver.ts",
  "src/pages/PersonalityRingPage.tsx",
]) {
  assert(read(path).includes("xinmaiSemanticConstitutionFormalStateMatrix"), `actual consumer is not wired: ${path}`);
}
assert(!read("src/pages/GravityPage.tsx").includes("刚才回应的地方，开始显出生命的流动。"), "Gravity transient still uses old public copy");
assert(read("src/pages/GravityPage.tsx").includes("sixDimensionFormalPresentation.currentFact"), "Gravity transient does not render typed state fact");

const frozenAuthorityDigests = Object.freeze({
  "src/services/xinmaiSixDimensionObservationAuthorityController.ts": "7365fc289b61851b98d9b21f1b2d280b6d217833830b890c64f66ecebe9006f9",
  "src/services/xinmaiChoiceActionIntentionController.ts": "a61df98d3783fedd5428422faf7a7759f55466bdebd3c41a3e7d717579cdbe83",
  "src/services/xinmaiLivedResponseAuthorityController.ts": "123a9c31ba62a06b319de9283d57d65cf1ac3382f1064f7760ffa0dbdb861fa8",
  "src/services/xinmaiCrystalFormationProductionOrchestrator.ts": "6702c5e9f1c32f3ea153c5067f3cb18ad9610e1248cf763fde6049fdbef1068c",
  "src/services/xinmaiRealityEncounterIntentController.ts": "8f602950e350ef005307249d2c1e5b55da3eeae352ca6c808e9139c78ee41293",
  "src/services/xinmaiRealityAdventureLifecycleReconciliationController.ts": "b6f6518c397b1725dc5cdfdb91d04fbd4e049e8815be1b82261ef017f6740296",
});
for (const [path, digest] of Object.entries(frozenAuthorityDigests)) assert(sha256(path) === digest, `frozen Authority drifted: ${path}`);

console.log(`[XINMAI FORMAL STATE MATRIX] PASS · ${matrix.length}/${matrix.length} states · ${bindings.length}/${bindings.length} actual consumer bindings · 8/8 areas · UNKNOWN=0 · public forbidden=0`);
