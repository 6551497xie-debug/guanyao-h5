import { build } from "esbuild";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[crystal-fresh-reality-presentation] ${message}`);
};

const mapping = read("src/services/crystalMappingService.ts");
const ownership = read("src/services/xinmaiCrystalOwnershipPresentationResolver.ts");
const pressurePresentation = read("src/components/RealityPressureSeedPresentation.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const route = read("src/pages/RealityProductionRouteEntry.tsx");
const policy = read("src/services/xinmaiCrystalFreshRealityPresentationPolicy.ts");
const historyReader = read("src/services/xinmaiCompletedRealityVisibleHistoryReader.ts");

assert(
  mapping.includes("crystalMeaning: `这一局把${dominantImpact.fromModel}转向${dominantImpact.toResponse}`"),
  "persisted Crystal mapping copy drifted",
);
assert(
  ownership.includes("resolveXinmaiCrystalValueLinePresentation") &&
    !ownership.includes("crystalLine: receipt.formedCrystal.crystal.copy"),
  "Ownership still exposes persisted concatenation directly",
);
assert(
  pressurePresentation.includes("resolveXinmaiFreshRealityVisibleNoveltyPresentation") &&
    pressurePresentation.includes("刚刚完成过的一幕") &&
    pressurePresentation.includes("data-fresh-reality-visible-novelty"),
  "fresh Reality visible novelty consumer is incomplete",
);
assert(
  host.includes("freshPostOwnershipCycle={freshPostOwnershipCycle}") &&
    host.includes("historicalRealityMemoryKey={historicalRealityMemoryKey}") &&
    route.includes('nextRealityCycle === "POST_OWNERSHIP_FRESH_INTENT"'),
  "typed post-Ownership history is not wired read-only",
);
assert(
  route.includes("readXinmaiCompletedRealityVisibleHistory") &&
    historyReader.includes("consumedByChoiceActionIntentionReferenceId") &&
    historyReader.includes("pressureProvenance.candidateReferenceId") &&
    !/localStorage|sessionStorage/.test(historyReader),
  "fresh Reality completed-scene provenance is not recovered read-only",
);
assert(
  /XINMAI_CRYSTAL_FRESH_REALITY_PRESENTATION_POLICY:[\s\S]*?=\s*"(?:ENABLED|SAFE_WITHHELD)"/.test(policy),
  "Candidate/Counter presentation policy is not frozen",
);

const bundle = await build({
  stdin: {
    contents: `
      export * from "./src/services/xinmaiCrystalValueLinePresentationResolver.ts";
      export * from "./src/services/xinmaiFreshRealityVisibleNoveltyPresentationResolver.ts";
    `,
    resolveDir: process.cwd(),
    sourcefile: "crystal-fresh-reality-gate.ts",
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

const malformed = "这一局把熟悉的回应仍在影响当前生命转向下一次先停一下。";
const valueLine = runtime.resolveXinmaiCrystalValueLinePresentation(malformed);
assert(!valueLine.line.includes("这一局把") && valueLine.persistedCrystalCopyPreserved, "Crystal value line is not safe");

const candidates = Object.freeze([
  Object.freeze({ candidateReferenceId: "MID_LIFE_POWER_01", surface: "刚完成的一幕" }),
  Object.freeze({ candidateReferenceId: "MID_LIFE_RELATION_01", surface: "另一幕" }),
  Object.freeze({ candidateReferenceId: "MID_LIFE_FAMILY_01", surface: "第三幕" }),
]);
const novelty = runtime.resolveXinmaiFreshRealityVisibleNoveltyPresentation({
  candidates,
  freshPostOwnershipCycle: true,
  historicalRealityMemoryKey: "MID_LIFE_POWER_01",
});
if (valueLine.presentationPolicy === "ENABLED") {
  assert(
    novelty.candidates[0].candidate.candidateReferenceId !== "MID_LIFE_POWER_01" &&
      novelty.candidates[2].recentlyCompleted,
    "fresh cycle does not foreground a different eligible scene",
  );
} else {
  assert(
    novelty.state === "SAFE_WITHHELD" &&
      novelty.candidates[0].candidate.candidateReferenceId === "MID_LIFE_POWER_01" &&
      novelty.candidates[0].recentlyCompleted,
    "Counter does not preserve a coherent marked static presenter",
  );
}
assert(
  novelty.writesCatalog === false && novelty.writesHistory === false,
  "presentation resolver writes Catalog or history",
);
const ordinary = runtime.resolveXinmaiFreshRealityVisibleNoveltyPresentation({
  candidates,
  freshPostOwnershipCycle: false,
  historicalRealityMemoryKey: "MID_LIFE_POWER_01",
});
assert(ordinary.candidates[0].candidate === candidates[0], "ordinary Reality order drifted");

console.log("[XINMAI CRYSTAL VALUE LINE + FRESH REALITY VISIBLE NOVELTY] PASS");
