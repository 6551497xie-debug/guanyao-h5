import { build } from "esbuild";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[semantic-selection-phase-2] ${message}`);
};

const types = read("src/types/xinmaiSixDimensionObservation.ts");
const policy = read("src/services/xinmaiSixDimensionSemanticSelectionMutationPolicy.ts");
const controller = read("src/services/xinmaiSixDimensionObservationAuthorityController.ts");
const store = read("src/services/xinmaiLivedGrowthTransactionalStore.ts");
const host = read("src/components/GravityProductionSurfaceHost.tsx");
const gravity = read("src/pages/GravityPage.tsx");
const choice = read("src/services/xinmaiChoiceActionIntentionController.ts");
const readiness = read("src/services/xinmaiChoicePresentationReadinessResolver.ts");
const responseMap = read("src/services/xinmaiSixDimensionResponseMapPresentationResolver.ts");
const responseMapComponent = read("src/components/XinmaiSixDimensionResponseMap.tsx");
const returning = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const launchLab = read("src/pages/LaunchLab.tsx");

assert(
  /XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION:[\s\S]*?=\s*"(?:ENABLED|SAFE_WITHHELD)"/.test(policy) &&
    policy.includes('=== "ENABLED"'),
  "new semantic mutation/counter policy is not explicitly frozen",
);
for (const marker of [
  "ACKNOWLEDGE_SEMANTIC_SELECTION_V3",
  "createSixDimensionSemanticSelectionDigest",
  "createSixDimensionSemanticSelectionReferenceId",
  "createSixDimensionSemanticSelectionAggregateDigest",
  "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION",
]) assert(controller.includes(marker), `controller missing ${marker}`);
assert(
  controller.includes("completionReceipt: receipt") &&
    controller.includes("commandFence: fence") &&
    store.includes("transactXinmaiSixDimensionObservation"),
  "item, fence and Receipt V2 do not share the canonical transaction",
);
assert(
  host.includes("semanticResponseId") &&
    host.includes('type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3"') &&
    host.includes('type: "ACKNOWLEDGE_DIMENSION"'),
  "V3 activation or V2 in-progress compatibility is missing",
);
assert(
  choice.includes("commitChoiceActionIntentionV4") &&
    choice.includes("semanticSelectionAggregateDigest") &&
    readiness.includes("validateChoiceActionIntentionV4Prerequisites") &&
    readiness.includes("createChoiceRouteFormationSourceSnapshotV3"),
  "Choice V4 is not bound to Receipt V2 aggregate evidence",
);
assert(
  responseMap.includes("XINMAI_SIX_DIMENSION_RESPONSE_MAP_PRESENTATION_RESOLVER") &&
    responseMap.includes("LEGACY_GENERIC_ONLY") &&
    responseMap.includes("SEMANTIC_SELECTION_MAP_INCOMPLETE") &&
    responseMapComponent.includes("EXACT_PERSISTED_SELECTIONS") &&
    returning.includes("XinmaiSixDimensionResponseMap") &&
    gravity.includes("XinmaiSixDimensionResponseMap"),
  "unique exact/legacy response-map consumer cutover is incomplete",
);
assert(
  gravity.includes('resolveXinmaiJourneySemanticPresentation("CHOICE")') &&
    gravity.includes("semantic.primaryAction") &&
    gravity.includes('data-choice-click-confirm="AVAILABLE"'),
  "ordinary click/keyboard-equivalent Choice confirmation is missing",
);
assert(
  !returning.includes("已保存的 Fact") &&
    !returning.includes("检查 Crystal 是否正式形成") &&
    launchLab.includes("returningChoiceAdmissions.length === 0"),
  "Return still exposes internal jargon or naming as a lifecycle exit",
);
assert(
  (types.match(/six-dimension-[a-z-]+" as const/g) ?? []).length === 3 &&
    (store.match(/\.createIndex\(/g) ?? []).length === 14 &&
    !store.includes("XINMAI_LIVED_GROWTH_DATABASE_VERSION = 4"),
  "DB/store/index topology drifted",
);
for (const source of [gravity, host, responseMapComponent]) {
  assert(!source.includes("localStorage.setItem"), "Presentation writes localStorage");
}

const bundle = await build({
  stdin: {
    contents: `
      export * from "./src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts";
      export * from "./src/services/xinmaiSixDimensionResponseMapPresentationResolver.ts";
    `,
    resolveDir: process.cwd(), sourcefile: "phase-2-value-closure-gate.ts", loader: "ts",
  },
  bundle: true, platform: "node", format: "esm", write: false, logLevel: "silent",
});
const runtime = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const dimensions = ["body", "emotion", "thought", "action", "memory", "goal"];
const responses = ["LOCATED", "MIXED", "FRAGMENT", "PAUSE", "NOW", "VALUE"];
const recovery = Object.freeze({
  status: "EXACT_COMPLETE",
  observationSet: Object.freeze({ pressure: Object.freeze({ runtimeSeedId: "YOUTH_POWER_01", catalogRevision: "GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0" }) }),
  completionReceipt: Object.freeze({}),
  selections: Object.freeze(dimensions.map((dimensionId, index) => Object.freeze({
    dimensionId,
    state: "OBSERVED",
    selection: Object.freeze({ semanticResponseId: responses[index] }),
  }))),
  cause: null,
});
const map = runtime.resolveXinmaiSixDimensionResponseMapPresentation(recovery);
assert(map.state === "EXACT" && map.items.length === 6, "exact six-item map is not recoverable");
assert(map.actionImpulse && map.protectedNeed, "ACTION/GOAL causal inputs are missing");
const legacy = runtime.resolveXinmaiSixDimensionResponseMapPresentation(Object.freeze({
  status: "LEGACY_GENERIC_ONLY", observationSet: Object.freeze({ pressure: recovery.observationSet.pressure }),
  completionReceipt: null, observedDimensionIds: Object.freeze(dimensions), selections: null,
  cause: Object.freeze({ code: "SEMANTIC_SELECTION_NOT_RECORDED" }),
}));
assert(legacy.state === "LEGACY_GENERIC_ONLY" && legacy.items.length === 0, "legacy response map invents exact choices");

console.log("[XINMAI SEMANTIC SELECTION RECEIPT V2 CHOICE V4 VALUE CLOSURE] PASS");
