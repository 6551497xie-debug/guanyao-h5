import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const renderer = read("src/renderers/genesisWebGLRendererCore.ts");
const packageJson = JSON.parse(read("package.json"));

const checks = [
  [
    "presence signature consumes the existing birth-mansion coordinate only",
    renderer.includes("const birthMansionPresenceIndex =") &&
      renderer.includes(
        "mansionCoordinateVisualLayer?.birthCoordinate.coordinateIndex",
      ) &&
      renderer.includes(
        "sceneProjection.mansionCoordinateField?.birthCoordinateIndex",
      ) &&
      renderer.includes("renderer-only reading of the existing") &&
      !/calculateBirthMansionPresence|createStarBeastIdentity/.test(renderer),
  ],
  [
    "the personal source remains the existing seven-mansion group",
    renderer.includes("const birthQuarterStart = Math.floor(birthIndex / 7) * 7") &&
      renderer.includes("const birthQuarterEnd = birthQuarterStart + 6") &&
      renderer.includes("birthQuarterCompanionCoordinates") &&
      renderer.includes("No inner star or") &&
      renderer.includes("seven-star meridian is added"),
  ],
  [
    "birth star anchors the existing skeleton without a new constellation",
    renderer.includes("[birthIndex - 2, birthIndex + 2]") &&
      renderer.includes("lifeOriginCoordinatePosition(birthIndex)") &&
      renderer.includes("birthMansionBoneMaterial") &&
      renderer.includes("birthMansionPointMaterial"),
  ],
  [
    "mansion skeleton and source stars share one personal breath",
    renderer.includes("birthMansionPresenceBreathRate") &&
      renderer.includes("birthMansionPresencePhase") &&
      renderer.includes("identityBoneBreath") &&
      renderer.includes("sourceGroupBreath"),
  ],
  [
    "the same mansion signature shapes the existing ink-wash body aura",
    renderer.includes("birthMansionAuraCurl") &&
      renderer.includes("birthMansionAuraEnclosure") &&
      renderer.includes("identityWash") &&
      renderer.includes("lifeAuraPhases[index]") &&
      renderer.includes("finalSpinePositions[sourceOffset]"),
  ],
  [
    "recognition remains low-presence and never becomes a role reveal",
    renderer.includes("lifeAuraMaterial.opacity = Math.min(") &&
      renderer.includes("0.2,") &&
      !/GLTFLoader|FBXLoader|SkinnedMesh|SUMMON|PET_ACTION|SKILL_REVEAL/.test(
        renderer,
      ),
  ],
  [
    "one renderer and one body topology remain authoritative",
    renderer.includes("const lifeAura = new Points") &&
      renderer.includes("const bodyField = new Points") &&
      !renderer.includes("const starBeastPresenceRenderer = new WebGLRenderer"),
  ],
  [
    "gate is registered",
    packageJson.scripts?.["check-xinmai-28-mansion-starbeast-presence"] ===
      "node scripts/check-xinmai-28-mansion-starbeast-presence.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error("\n[XINMAI 28 MANSION STARBEAST PRESENCE] FAILED");
  process.exit(1);
}

console.log("\n[XINMAI 28 MANSION STARBEAST PRESENCE] PASS");
