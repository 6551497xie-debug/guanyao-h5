import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const launch = read("src/pages/LaunchLab.tsx");
const sceneResolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const sceneHost = read("src/components/XinmaiContinuousSceneHost.tsx");
const genesis = read("src/components/GenesisProductionRendererCanvasHost.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  launch.includes('registrationReferenceId: "CONTINUOUS_SCENE:ENTRY_BIRTH"') &&
    launch.includes('nearObjectKind: "BIRTH_COORDINATE" as const') &&
    launch.includes('pointerInteraction: "NONE" as const'),
  "Entry birth is not published through the single Continuous Scene Host",
);
assert(
  sceneResolver.includes('"NATIVE_CONTROL" as const') &&
    !sceneResolver.includes('input.consumerSurface === "ENTRY_BIRTH"\n            ? "HOST_CANVAS_SINGLE_TARGET"'),
  "ENTRY_BIRTH can still expose a Canvas hit contract",
);
assert(
  sceneHost.includes("XinmaiContinuousSceneHost") &&
    genesis.includes("轻触这束光") &&
    !genesis.includes("轻触星河，发现属于你的生命星宿"),
  "Genesis does not preserve the single Host to visible-object contract",
);
assert(
  packageJson.scripts?.["check:xinmai-genesis-birth-coordinate-continuous-scene-contract"] ===
    "node scripts/check-xinmai-genesis-birth-coordinate-continuous-scene-contract.mjs",
  "Continuous-scene contract gate is not registered",
);

console.log("[XINMAI GENESIS BIRTH COORDINATE CONTINUOUS SCENE CONTRACT] PASS");
