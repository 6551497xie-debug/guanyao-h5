import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastRendererPrototypeAdapter.ts",
  service: "src/services/starBeastRendererPrototypeAdapter.ts",
  lab: "src/pages/StarbeastLab.tsx",
  protocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_PROTOTYPE_ADAPTER_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});

const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(absolute.type, "utf8");
  const serviceSource = fs.readFileSync(absolute.service, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const packageJson = JSON.parse(
    fs.readFileSync(absolute.packageManifest, "utf8"),
  );

  [
    "export type StarBeastPrototypeRenderProjection",
    'semanticRole: "STAR_BEAST_PROTOTYPE_RENDER_PROJECTION"',
    "sourceRenderPlanReference: StarBeastRenderPlan",
    "starCore",
    "starPattern",
    "boundaryLight",
    "internalStardust",
    "crystalNodes",
    "canvas2dPrototypeCompatible: true",
    "prototypeOnly: true",
    "noLifeStateMutation: true",
    "noBusinessInference: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("prototype projection type", typeSource, marker),
  );

  [
    'import type { StarBeastRenderPlan } from "../types/starBeastRendererContract"',
    "export function adaptStarBeastRenderPlanToPrototype",
    "renderPlan: StarBeastRenderPlan",
    "): StarBeastPrototypeRenderProjection",
    "renderPlan.channels.light.intensity",
    "renderPlan.channels.starField.particleDensity",
    "renderPlan.channels.starField.constellationComplexity",
    "renderPlan.channels.crystal.presence",
    "sourceRenderPlanReference: renderPlan",
    "Object.freeze({",
  ].forEach((marker) =>
    assertIncludes("RenderPlan drives prototype adapter", serviceSource, marker),
  );

  [
    "MotherCode",
    "motherCode",
    "Hexagram",
    "hexagram",
    "LifeArchetype",
    "lifeArchetype",
    "fourSymbol",
    "FourSymbol",
    "UserProfile",
    "userProfile",
    "StarBeastLifeState",
    "mapStarBeastLifeStateToVisualState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "requestAnimationFrame",
    "getContext(",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) =>
    assertExcludes("prototype adapter stays RenderPlan-only", serviceSource, marker),
  );

  [
    "mapStarBeastLifeStateToVisualState(",
    "PROTOTYPE_RENDERER_INPUT",
    "resolveStarBeastRenderPlanConsumption(",
    "PROTOTYPE_PLAN_RESULT.consumption.renderPlanReference",
    "adaptStarBeastRenderPlanToPrototype(",
    "PROTOTYPE_PROJECTION.layers.starCore",
    "PROTOTYPE_PROJECTION.layers.starPattern",
    "PROTOTYPE_PROJECTION.layers.boundaryLight",
    "PROTOTYPE_PROJECTION.layers.internalStardust",
    "PROTOTYPE_PROJECTION.layers.crystalNodes",
  ].forEach((marker) =>
    assertIncludes("StarbeastLab consumes isolated projection", labSource, marker),
  );

  [
    "localStorage",
    "sessionStorage",
    "LaunchLab",
    "GravityPage",
    "DynamicsPage",
    "CrystalPage",
    'from "three"',
    "WebGLRenderingContext",
  ].forEach((marker) =>
    assertExcludes("StarbeastLab remains isolated", labSource, marker),
  );

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("adaptStarBeastRenderPlanToPrototype(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "prototype adapter has one isolated consumer",
    callSites.sort().join(","),
    [files.service, files.lab].sort().join(","),
  );

  [
    "RC-STAR-BEAST-RENDERER-PROTOTYPE-ADAPTER-P77",
    "PROTOTYPE ADAPTER",
    "StarBeastVisualState",
    "StarBeastRendererInput",
    "StarBeastRenderPlan",
    "Prototype Renderer Adapter",
    "StarbeastLab Canvas2D",
    "只接收一个不可变 `StarBeastRenderPlan` 引用",
    "唯一允许的原型消费者是 `src/pages/StarbeastLab.tsx`",
    "不是正式 Renderer",
    "不引入 WebGL、Three.js、3D 模型、图片资产或正式渲染后端",
  ].forEach((marker) =>
    assertIncludes("prototype adapter protocol", protocolSource, marker),
  );

  assertIncludes(
    "type index exports prototype projection",
    typeIndexSource,
    "StarBeastPrototypeRenderProjection",
  );
  assertIncludes(
    "prototype gate command registered",
    packageJson.scripts?.["check:star-beast-renderer-prototype-adapter"] ?? "",
    "node scripts/check-star-beast-renderer-prototype-adapter.mjs",
  );
  assertIncludes(
    "prototype gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-prototype-adapter",
  );

  const tempModulePath = path.join(
    os.tmpdir(),
    `guanyao-star-beast-renderer-prototype-adapter-${process.pid}.mjs`,
  );
  await build({
    entryPoints: [absolute.service],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { adaptStarBeastRenderPlanToPrototype } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );
  const renderPlan = Object.freeze({
    semanticRole: "STAR_BEAST_RENDER_PLAN",
    sourceVisualStateReference: Object.freeze({}),
    channels: Object.freeze({
      manifestation: Object.freeze({
        depth: "IMPRINTED",
        presence: "INTEGRATED_PRESENCE",
      }),
      energy: Object.freeze({
        flow: "INTEGRATED",
        breathingRhythm: "RESONANT",
      }),
      light: Object.freeze({
        state: "CRYSTALLIZED",
        direction: "RADIAL",
        intensity: 0.88,
      }),
      starField: Object.freeze({
        pattern: "LIFE_TEXTURE_ADDED",
        particleDensity: 0.76,
        constellationComplexity: 0.84,
      }),
      crystal: Object.freeze({ presence: "PRESENT" }),
    }),
    rendererNeutral: true,
    semanticChannelsOnly: true,
    noPixelOutput: true,
    noDrawCommands: true,
    noAssetGeneration: true,
  });
  const before = JSON.stringify(renderPlan);
  const projection = adaptStarBeastRenderPlanToPrototype(renderPlan);

  assertEqual(
    "RenderPlan reference is preserved",
    projection.sourceRenderPlanReference === renderPlan,
    true,
  );
  assertEqual(
    "RenderPlan is not mutated",
    JSON.stringify(renderPlan),
    before,
  );
  assertEqual(
    "projection is immutable",
    Object.isFrozen(projection) && Object.isFrozen(projection.layers),
    true,
  );
  assertEqual(
    "Crystal channel drives visible nodes",
    projection.layers.crystalNodes.visible,
    true,
  );
  assertEqual(
    "prototype output stays Canvas2D-only",
    projection.canvas2dPrototypeCompatible,
    true,
  );

  fs.rmSync(tempModulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast renderer prototype adapter | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast renderer prototype adapter gate");
