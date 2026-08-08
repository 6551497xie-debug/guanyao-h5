import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const host = read("src/components/XinmaiContinuousSceneHost.tsx");
const sceneResolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const inertia = read("src/components/RealityGravityInertiaField.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  sceneResolver.includes("semanticProjection") &&
    sceneResolver.includes("SEMANTIC_PROJECTION_MISMATCH") &&
    sceneResolver.includes("presentableSemanticProjection"),
  "Motion/Static plans do not consume one validated semantic projection",
);
assert(
  host.includes('nativeReducedMotion') &&
    host.includes('presentationMode !== "MOTION"') &&
    host.includes('webglContextCount: 0') &&
    host.includes('rafOwnerCount: 0') &&
    host.includes("resolveXinmaiContinuousSceneStaticFallback"),
  "Native Reduced Motion or WebGL failure no longer uses the unique Static presenter",
);
assert(
  inertia.includes("const reducedMotion") &&
    inertia.includes('transition: reducedMotion ? "none"'),
  "V3 physical plan does not preserve semantic parity under Reduced Motion",
);
assert(
  packageJson.scripts?.["check:xinmai-reality-gravity-choice-scene-motion-static"] ===
    "node scripts/check-xinmai-reality-gravity-choice-scene-motion-static.mjs",
  "Motion/static gate is not registered",
);

console.log("[XINMAI REALITY GRAVITY CHOICE SCENE MOTION STATIC] PASS");
