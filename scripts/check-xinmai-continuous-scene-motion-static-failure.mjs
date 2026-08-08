import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const host = read("src/components/XinmaiContinuousSceneHost.tsx");
const resolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const adapter = read("src/renderers/xinmaiContinuousSceneRendererAdapter.ts");
const sameLifeConsumer = read("src/components/RealityLifeUniverseCanvas.tsx");
const sameLifeResolver = read("src/services/xinmaiSameLifeSurfaceHostResolver.ts");
const packageJson = JSON.parse(read("package.json"));

assert(
  host.includes('matchMedia("(prefers-reduced-motion: reduce)")') &&
    host.indexOf("plan.presentationMode === \"MOTION\"") <
      host.indexOf("registration.runtimeFactory.create"),
  "Reduced Motion must select Static before Renderer creation",
);
assert(
  resolver.includes("resolveXinmaiContinuousSceneStaticFallback") &&
    host.includes('requestStaticFallback("WEBGL_INITIALIZATION_FAILED")') &&
    host.includes('requestStaticFallback("WEBGL_RUNTIME_FAILED")') &&
    host.includes("setFailedMotionPlanReferenceId"),
  "WebGL initialization/runtime failure does not converge on Static",
);
assert(
  host.includes("worldContextCount: 0 as const") &&
    host.includes("webglContextCount: 0 as const") &&
    host.includes("rafOwnerCount: 0 as const") &&
    adapter.includes("worldContextCount: 1 as const") &&
    adapter.includes("webglContextCount: 1 as const") &&
    adapter.includes("rafOwnerCount: 1 as const"),
  "Motion and Static resource proofs are incomplete",
);
assert(
  host.includes("Math.min(2, Math.max(1, window.devicePixelRatio || 1))") &&
    host.includes("document.hidden") &&
    host.includes("window.cancelAnimationFrame(animationFrame)") &&
    host.includes("connection?.saveData === true"),
  "DPR, background pause, or Save-Data policy is missing",
);
for (const forbidden of [
  "frameCount > 0",
  ".isConnected",
  "animationend",
]) {
  assert(
    !host.includes(forbidden) && !resolver.includes(forbidden),
    `Forbidden scene success source remains: ${forbidden}`,
  );
}
const sameLifeCommitIndex = sameLifeConsumer.lastIndexOf(
  "const outcome = commitXinmaiSameLifeSurfaceOutcome",
);
const sameLifeCommitGuard = sameLifeConsumer.slice(
  Math.max(0, sameLifeCommitIndex - 320),
  sameLifeCommitIndex,
);
const sameLifeCommitEffect = sameLifeConsumer.slice(
  sameLifeCommitIndex,
  sameLifeCommitIndex + 1_900,
);
assert(
  sameLifeCommitIndex > 0 &&
    sameLifeCommitGuard.includes(
      'sameLifeSurfaceSelection.status === "SAFE_WITHHELD"',
    ) &&
    !sameLifeCommitGuard.includes("arrivalPhase") &&
    !sameLifeCommitEffect.match(/arrivalPhase,\s*\]/),
  "Trusted Same-Life presenter proof must commit without an arrival timer dependency",
);
assert(
  sameLifeResolver.includes('reason: "PRESENTER_COMMIT_MISMATCH"') &&
    sameLifeResolver.includes("proof.sourceReferenceId !== facts.sourceReferenceId") &&
    sameLifeResolver.includes("proof.bodyPresenterCount !== 1"),
  "Same-Life proof mismatch must remain SAFE_WITHHELD after scheduling correction",
);
assert(
  packageJson.scripts?.["check:xinmai-continuous-scene-motion-static-failure"] ===
    "node scripts/check-xinmai-continuous-scene-motion-static-failure.mjs",
  "Continuous Scene motion/static/failure gate is not registered",
);

console.log("[XINMAI CONTINUOUS SCENE MOTION STATIC FAILURE] PASS");
