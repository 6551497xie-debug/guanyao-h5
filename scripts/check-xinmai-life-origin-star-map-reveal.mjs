import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rendererSource = readFileSync(
  path.join(root, "src/renderers/genesisWebGLRendererCore.ts"),
  "utf8",
);

const assertions = [
  [
    "life origin reveal is isolated to the existing Reality completion canvas",
    rendererSource.includes(
      "const isLifeOriginStarMapReveal = isRealityCanvas && isCompletion;",
    ),
  ],
  [
    "existing 28-mansion coordinates form the ordered heaven field",
    rendererSource.includes("mansionHeavenOrderMaterial") &&
      rendererSource.includes("mansionGroupIndex < 4") &&
      rendererSource.includes("mansionSlot < 6"),
  ],
  [
    "birth coordinate remains the source response instead of a new identity",
    rendererSource.includes(
      "The 28 points read as one ordered sky before the personal body is",
    ) &&
      rendererSource.includes("birthCoordinateAxisMaterial") &&
      rendererSource.includes("birthMansionPointMaterial"),
  ],
  [
    "the same body gains a low-density spirit-shadow treatment",
    rendererSource.includes("lifeOriginRevealProgress") &&
      rendererSource.includes("bodyFieldMaterial.opacity") &&
      rendererSource.includes("structureGroup.scale.multiplyScalar"),
  ],
  [
    "pixel squares are replaced by a restrained stellar powder sprite",
    rendererSource.includes("createLifeOriginStarTexture") &&
      rendererSource.includes("new CanvasTexture(sprite)") &&
      rendererSource.includes("map: lifeOriginStarTexture"),
  ],
  [
    "the life core remains singular and becomes less disk-like in Reality",
    rendererSource.includes(
      "const coreRadius = isLifeOriginStarMapReveal ? 0.082 : 0.14;",
    ) &&
      !rendererSource.includes("SECOND_LIFE_CORE"),
  ],
];

let failed = false;
for (const [name, passed] of assertions) {
  if (passed) {
    console.log(`PASS | ${name}`);
    continue;
  }
  failed = true;
  console.error(`FAIL | ${name}`);
}

if (failed) process.exit(1);

console.log(
  "PASS | XINMAI life origin star map reveal is structurally aligned",
);
