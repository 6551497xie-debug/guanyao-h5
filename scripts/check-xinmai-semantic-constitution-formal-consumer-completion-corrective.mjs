import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { build } from "esbuild";

const read = (path) => readFileSync(path, "utf8");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[semantic-consumer-completion] ${message}`);
};

const packageJson = JSON.parse(read("package.json"));
assert(
  packageJson.scripts?.["check:xinmai-semantic-constitution-formal-consumer-completion-corrective"] ===
    "node scripts/check-xinmai-semantic-constitution-formal-consumer-completion-corrective.mjs",
  "direct corrective gate is not registered",
);
assert(
  packageJson.scripts?.["check:xinmai-lived-growth-authority"]?.includes(
    "check:xinmai-semantic-constitution-formal-consumer-completion-corrective",
  ),
  "full Authority suite does not include the direct corrective gate",
);

const formalConsumers = Object.freeze([
  "src/components/XinmaiGenesisBirthCoordinateControls.tsx",
  "src/pages/GenesisProductionExperiencePage.tsx",
  "src/pages/LaunchLab.tsx",
  "src/components/RealityPressureSeedPresentation.tsx",
  "src/components/RealityLifeUniverseCanvas.tsx",
  "src/pages/GravityPage.tsx",
  "src/components/XinmaiLifeReflectionGuide.tsx",
  "src/components/XinmaiSixDimensionResponseMap.tsx",
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "src/components/XinmaiCrystalFormationOwnershipMoment.tsx",
  "src/pages/PersonalityRingPage.tsx",
  "src/services/xinmaiJourneySemanticPresentationResolver.ts",
  "src/services/xinmaiRealityGravityChoiceSceneAccessibleSemanticMirror.ts",
  "src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts",
  "src/services/guanyaoDynamicsExperienceStateAdapter.ts",
]);
const formalSource = formalConsumers.map(read).join("\n");
for (const forbidden of [
  "你已经认出这条现实。它仍在同一生命中显现。",
  "这条现实已经被认出。",
  "靠近生命正在变化的位置",
  "青龙七宿在当前现实引力下进入六个空间",
  "触碰本命生命星群，观察现实引力如何展开",
  "轻触那颗正在呼吸的星",
  "按住生命核心，陪它完成一次呼吸",
  "真实回应已经形成一颗属于这次行动的 Crystal。",
  "下一段现实会建立新 Intent 与 Encounter。",
  "原始输入与推导结果一致后，才会形成唯一生命起点。",
]) {
  assert(!formalSource.includes(forbidden), `forbidden formal copy remains: ${forbidden}`);
}
assert(
  !/aria-label="[^"]*(?:Crystal|Intent|Encounter|Fact|Receipt|Authority|digest|Choice V[34]|SAFE_WITHHELD|本命|生命核心)[^"]*"/.test(formalSource),
  "an accessible label leaks internal or mystical operation language",
);

const choreography = read("src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts");
for (const label of ["身体", "情绪", "想法", "行动冲动", "记忆联想", "需要与方向"]) {
  assert(choreography.includes(`label: "${label}"`), `missing dimension label: ${label}`);
}
for (const action of [
  "保存这次身体观察",
  "保存这次情绪观察",
  "保存这次想法观察",
  "保存这次行动冲动观察",
  "保存这次记忆联想观察",
  "保存这次需要与方向观察",
]) {
  assert(choreography.includes(action), `missing dimension save action: ${action}`);
}

const reality = read("src/components/RealityLifeUniverseCanvas.tsx");
assert(
  reality.includes('aria-label="开始六维观察"') && reality.includes(">开始六维观察<"),
  "Reality does not expose a visible and accessible six-dimension CTA",
);
const launch = read("src/pages/LaunchLab.tsx");
assert(
  /returningHasCrystal\s*&&\s*returningRelationshipNaming\.status !== "UNAVAILABLE"/.test(launch) &&
    launch.includes("beginReturningRelationshipNameEdit") &&
    launch.includes("saveReturningRelationshipName") &&
    launch.includes("可选：设置同行称呼"),
  "post-closure Naming entry is not a real existing-writer consumer",
);
assert(
  !/returningHasCrystal\s*&&\s*returningChoiceAdmissions\.length === 0/.test(launch),
  "post-closure Naming remains hidden while a completed admission exists",
);
const genesis = read("src/pages/GenesisProductionExperiencePage.tsx");
assert(
  genesis.includes("firstRealityNamingDeferred = true") && genesis.includes("!firstRealityNamingDeferred"),
  "Naming is not deferred before the first Reality",
);

const bundle = await build({
  stdin: {
    contents: 'export * from "./src/services/xinmaiSixDimensionResponseMapPresentationResolver.ts";',
    resolveDir: process.cwd(),
    sourcefile: "semantic-consumer-completion-gate.ts",
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
for (const action of ["ADVANCE", "WITHDRAW", "PAUSE"]) {
  for (const goal of ["NEED", "VALUE", "UNCERTAIN"]) {
    const sentence = runtime.resolveXinmaiMicroActionCausalExplanation(
      action,
      goal,
      "先停一口呼吸，再决定是否回应",
    );
    assert(sentence.includes("下一次可以先尝试【先停一口呼吸，再决定是否回应】"), `${action}/${goal} loses the selected micro-action`);
    assert(!sentence.includes("人格结论") && !sentence.includes("被看见，但"), `${action}/${goal} reuses explanatory summary as a phrase`);
    assert(goal !== "UNCERTAIN" || sentence.includes("还不完全确定"), `${action}/${goal} invents a certain protected need`);
  }
}

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

console.log("[XINMAI SEMANTIC CONSTITUTION FORMAL CONSUMER COMPLETION] PASS · ACTION×GOAL 9/9 · UNKNOWN=0");
