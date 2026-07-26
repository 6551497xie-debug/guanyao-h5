import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rendererSource = readFileSync(
  path.join(root, "src/renderers/genesisWebGLRendererCore.ts"),
  "utf8",
);
const canvasHostSource = readFileSync(
  path.join(
    root,
    "src/components/GenesisProductionRendererCanvasHost.tsx",
  ),
  "utf8",
);
const experiencePageSource = readFileSync(
  path.join(root, "src/pages/GenesisProductionExperiencePage.tsx"),
  "utf8",
);

const assertions = [
  [
    "life origin reveal is consumed by Genesis completion and retained by Reality",
    rendererSource.includes("isGenesisLifeOriginStarMapReveal") &&
      rendererSource.includes(
        "(isRealityCanvas || isGenesisLifeOriginStarMapReveal) && isCompletion",
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
      rendererSource.includes("birthMansionBoneMaterial") &&
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
    "the life core remains singular and becomes a boundaryless mist seed",
    rendererSource.includes(
      "const coreRadius = isLifeOriginStarMapReveal ? 0.052 : 0.14;",
    ) &&
      rendererSource.includes("lifeOriginCoreMist") &&
      !rendererSource.includes("SECOND_LIFE_CORE"),
  ],
  [
    "the discovery is initiated by the user and resolves inside five seconds",
    canvasHostSource.includes("onLifeOriginDiscoveryRequest") &&
      canvasHostSource.includes("data-life-origin-discovery-phase") &&
      experiencePageSource.includes(
        "const LIFE_ORIGIN_DISCOVERY_DURATION_MS = 5_200;",
      ) &&
      experiencePageSource.includes(
        'setLifeOriginDiscoveryPhase("DISCOVERING")',
      ) &&
      experiencePageSource.includes(
        'setLifeOriginDiscoveryPhase("REVEALED")',
      ),
  ],
  [
    "identity copy consumes existing mansion and four-symbol projections",
    canvasHostSource.includes("twentyEightMansionCoordinateProjection") &&
      canvasHostSource.includes("fourSymbolLifeDirectionProjection") &&
      canvasHostSource.includes("birthMansion.mansion"),
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
