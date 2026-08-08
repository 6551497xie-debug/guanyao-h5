import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const mirror = read("src/services/xinmaiRealityGravityChoiceSceneAccessibleSemanticMirror.ts");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const packageJson = JSON.parse(read("package.json"));

for (const meaning of [
  "现实正在靠近同一生命",
  "这条现实已经被认出",
  "保护与代价同时保留",
  "选择仍由你决定",
  "真实行动还没有被宣称完成",
]) {
  assert(mirror.includes(meaning), `Accessible semantic meaning missing: ${meaning}`);
}
assert(
  mirror.includes('authorityWriteback: "FORBIDDEN"') &&
    canvas.includes('data-scene-semantic-mirror') &&
    canvas.includes('aria-live="polite"') &&
    canvas.includes("hasObservedSemanticProjectionRef") &&
    canvas.includes("lastSemanticProjectionReferenceRef") &&
    canvas.includes("return;"),
  "Accessible mirror can write Authority or replay recovery as a new transition",
);
assert(
  packageJson.scripts?.["check:xinmai-reality-gravity-choice-scene-accessible-mirror"] ===
    "node scripts/check-xinmai-reality-gravity-choice-scene-accessible-mirror.mjs",
  "Accessible-mirror gate is not registered",
);

console.log("[XINMAI REALITY GRAVITY CHOICE SCENE ACCESSIBLE MIRROR] PASS");
