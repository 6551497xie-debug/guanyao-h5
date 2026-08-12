import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { build } from "esbuild";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[semantic-constitution-cutover] ${message}`);
};
const sha256 = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");

const packageJson = JSON.parse(read("package.json"));
const resolver = read("src/services/xinmaiJourneySemanticPresentationResolver.ts");
const policy = read("src/services/xinmaiSemanticConstitutionExperiencePolicy.ts");
const genesis = read("src/pages/GenesisProductionExperiencePage.tsx");
const launchLab = read("src/pages/LaunchLab.tsx");
const reality = read("src/components/RealityPressureSeedPresentation.tsx");
const gravity = read("src/pages/GravityPage.tsx");
const reflection = read("src/components/XinmaiLifeReflectionGuide.tsx");
const map = read("src/components/XinmaiSixDimensionResponseMap.tsx");
const returned = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const ownership = read("src/components/XinmaiCrystalFormationOwnershipMoment.tsx");
const archive = read("src/pages/PersonalityRingPage.tsx");

assert(
  packageJson.scripts?.["check:xinmai-semantic-constitution-atomic-consumer-cutover"] ===
    "node scripts/check-xinmai-semantic-constitution-atomic-consumer-cutover.mjs",
  "direct gate is not registered",
);
assert(
  packageJson.scripts?.["check:xinmai-lived-growth-authority"]?.includes(
    "check:xinmai-semantic-constitution-atomic-consumer-cutover",
  ),
  "full lived-growth suite does not include the semantic cutover gate",
);
assert(
  /XINMAI_SEMANTIC_CONSTITUTION_EXPERIENCE_POLICY:[\s\S]*?=\s*"(?:ENABLED|SAFE_WITHHELD)"/.test(policy),
  "Candidate/Counter policy is not a single frozen switch",
);
assert(
  genesis.includes("firstRealityNamingDeferred = true") &&
    genesis.includes("!firstRealityNamingDeferred") &&
    launchLab.includes("returningHasCrystal &&") &&
    launchLab.includes('resolveXinmaiJourneySemanticPresentation("NAMING")'),
  "Naming is not deferred from first Reality to post-cycle optional use",
);
for (const [label, source, needle] of [
  ["Reality", reality, "resolveXinmaiJourneySemanticPresentation"],
  ["six-dimension", reflection, "resolveXinmaiSixDimensionSemanticChoreography"],
  ["Response Map", map, 'resolveXinmaiJourneySemanticPresentation("RESPONSE_MAP")'],
  ["Choice/Departure", gravity, "resolveXinmaiJourneySemanticPresentation"],
  ["Return/Formation", returned, 'resolveXinmaiJourneySemanticPresentation("RETURN")'],
  ["Ownership", ownership, 'resolveXinmaiJourneySemanticPresentation("CRYSTAL_OWNERSHIP")'],
  ["Archive", archive, 'resolveXinmaiJourneySemanticPresentation("ARCHIVE")'],
]) {
  assert(source.includes(needle), `${label} is not consuming the unique semantic owner`);
}
assert(
  map.includes("PRESENTATION_ONLY_NO_WRITE") &&
    map.includes("身体与安全正在保护什么") &&
    map.includes("关系、身份或规则正在要求什么") &&
    map.includes("你愿意把什么价值带到未来"),
  "the three-layer lens is missing or claims write authority",
);
assert(
  returned.includes("notAttemptedSemantic") &&
    returned.includes("rejectedRecordSemantic") &&
    !ownership.includes('aria-label="轻触这颗 Crystal'),
  "Return/no-fact/Ownership public language did not converge",
);

const frozenAuthorityDigests = Object.freeze({
  "src/services/xinmaiSixDimensionObservationAuthorityController.ts": "7365fc289b61851b98d9b21f1b2d280b6d217833830b890c64f66ecebe9006f9",
  "src/services/xinmaiChoiceActionIntentionController.ts": "a61df98d3783fedd5428422faf7a7759f55466bdebd3c41a3e7d717579cdbe83",
  "src/services/xinmaiLivedResponseAuthorityController.ts": "123a9c31ba62a06b319de9283d57d65cf1ac3382f1064f7760ffa0dbdb861fa8",
  "src/services/xinmaiCrystalFormationProductionOrchestrator.ts": "6702c5e9f1c32f3ea153c5067f3cb18ad9610e1248cf763fde6049fdbef1068c",
  "src/services/xinmaiRealityEncounterIntentController.ts": "8f602950e350ef005307249d2c1e5b55da3eeae352ca6c808e9139c78ee41293",
  "src/services/xinmaiRealityAdventureLifecycleReconciliationController.ts": "b6f6518c397b1725dc5cdfdb91d04fbd4e049e8815be1b82261ef017f6740296",
});
for (const [path, digest] of Object.entries(frozenAuthorityDigests)) {
  assert(sha256(path) === digest, `frozen Authority drifted: ${path}`);
}

const bundle = await build({
  stdin: {
    contents: 'export * from "./src/services/xinmaiJourneySemanticPresentationResolver.ts";',
    resolveDir: process.cwd(),
    sourcefile: "semantic-constitution-cutover-gate.ts",
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
assert(runtime.XINMAI_JOURNEY_SEMANTIC_NODE_IDS.length === 23, "node coverage is not 23/23");
assert(new Set(runtime.XINMAI_JOURNEY_SEMANTIC_NODE_IDS).size === 23, "semantic node IDs are not unique");
const forbidden = /Authority|Receipt|digest|Fact|Choice\s+V[34]|SAFE_WITHHELD|兽性|神性|你就是|注定|必然/;
for (const nodeId of runtime.XINMAI_JOURNEY_SEMANTIC_NODE_IDS) {
  const presentation = runtime.resolveXinmaiJourneySemanticPresentation(nodeId);
  assert(presentation.nodeId === nodeId, `${nodeId} resolver mismatch`);
  assert(presentation.writesAuthority === false, `${nodeId} claims Authority writes`);
  for (const key of ["purpose", "explanation", "primaryAction", "secondaryAction", "consequence"]) {
    assert(presentation[key].trim().length > 0, `${nodeId}.${key} is empty`);
    assert(!forbidden.test(presentation[key]), `${nodeId}.${key} leaks forbidden public language`);
  }
}
assert(
  resolver.includes("XINMAI_JOURNEY_SEMANTIC_NODE_IDS") &&
    !/localStorage|sessionStorage|indexedDB/.test(resolver),
  "semantic owner is not read-only or does not expose the complete inventory",
);

console.log("[XINMAI SEMANTIC CONSTITUTION ATOMIC CONSUMER CUTOVER] PASS · 23/23 · UNKNOWN=0");
