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
    "stellar density is derived from the existing life body",
    renderer.includes("const lifeAuraParticleCount = isPresenceStage ? 168 : 0") &&
      renderer.includes("finalSpinePositions[sourceOffset]") &&
      renderer.includes("lifeAuraSpineOrigins") &&
      renderer.includes("lifeAuraLateralOffsets") &&
      renderer.includes("lifeAuraAxialOffsets"),
  ],
  [
    "ink-wash aura remains a material layer rather than an animal model",
    renderer.includes("createInkWashLifeAuraTexture") &&
      renderer.includes("Ink-Wash Life Aura uses the same immutable spine") &&
      renderer.includes("map: inkWashLifeAuraTexture") &&
      renderer.includes("blending: NormalBlending") &&
      !/GLTFLoader|FBXLoader|SkinnedMesh|SECOND_STAR_BEAST/.test(renderer),
  ],
  [
    "star dust carries a deterministic life direction and low-frequency flow",
    renderer.includes("lifeAuraFlowSpeed") &&
      renderer.includes("lifePresence.morphologicalField.flowDirection") &&
      renderer.includes("lifeAuraPhases[index]") &&
      renderer.includes("lifeAuraPositionAttribute.needsUpdate = true"),
  ],
  [
    "pressure contracts and recovery releases the same aura",
    renderer.includes("pressureAuraContraction") &&
      renderer.includes("pressureAuraContraction * 0.2") &&
      renderer.includes("realityPressureRecoveryProgress * 0.78") &&
      renderer.includes("choiceResponseSpaceProgress * 0.14"),
  ],
  [
    "the deep universe recedes behind the living density field",
    renderer.includes("? 0.026") &&
      renderer.includes(": 0.038") &&
      renderer.includes("cosmicPointMaterial.opacity"),
  ],
  [
    "Nadir Seed reads as mist and breath instead of a solid moon",
    renderer.includes("lifeOriginCoreMist") &&
      renderer.includes("originMistBreath") &&
      renderer.includes("core.visible = !isLifeOriginStarMapReveal") &&
      renderer.includes("coreSurface.visible = !isLifeOriginStarMapReveal") &&
      renderer.includes("coreHalo.visible = !isLifeOriginStarMapReveal") &&
      renderer.includes("? 0.008 + lifeOriginRevealProgress * 0.006") &&
      renderer.includes(": 0.045 + lifeOriginRevealProgress * 0.018"),
  ],
  [
    "relationship recognition increases presence without a reveal burst",
    renderer.includes(
      "recognizedLifeRelationshipContinuity * 0.03",
    ) &&
      !/LIFE_AURA_EXPLOSION|SUMMON_AURA|BOSS_REVEAL/.test(renderer),
  ],
  [
    "mobile cost stays bounded to one small additional points layer",
    renderer.includes("const lifeAuraParticleCount = isPresenceStage ? 168 : 0") &&
      renderer.includes("const lifeAura = new Points") &&
      !renderer.includes("const lifeAuraRenderer = new WebGLRenderer"),
  ],
  [
    "aura texture is explicitly disposed with the shared renderer",
    renderer.includes("inkWashLifeAuraTexture?.dispose()"),
  ],
  [
    "gate is registered",
    packageJson.scripts?.["check-xinmai-life-presence-star-dust-aura"] ===
      "node scripts/check-xinmai-life-presence-star-dust-aura.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error("\n[XINMAI LIFE PRESENCE STAR DUST AURA] FAILED");
  process.exit(1);
}

console.log("\n[XINMAI LIFE PRESENCE STAR DUST AURA] PASS");
