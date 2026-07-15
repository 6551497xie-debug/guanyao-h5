import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeFrame.ts",
  service: "src/services/starBeastPrototypeFrameSampler.ts",
  lab: "src/pages/StarbeastLab.tsx",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_FRAME_SAMPLER_PROTOCOL.md",
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
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
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
  const packageJson = JSON.parse(fs.readFileSync(absolute.packageManifest, "utf8"));

  [
    "export type StarBeastPrototypeFrameInput",
    "geometryProfile: StarBeastPrototypeGeometryProfile",
    "motionProfile: StarBeastPrototypeMotionProfile",
    "timeSeconds: number",
    "export type StarBeastPrototypeFrameState",
    'semanticRole: "STAR_BEAST_PROTOTYPE_FRAME_STATE"',
    "sourceGeometryReference: StarBeastPrototypeGeometryProfile",
    "sourceMotionReference: StarBeastPrototypeMotionProfile",
    "breathingOffset: number",
    "starCorePulse: number",
    "boundaryShimmerScale: number",
    "normalizedFrame: true",
    "deterministicSample: true",
    "projectionAligned: true",
    "noLifeStateMutation: true",
    "noBusinessInference: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("prototype frame type", typeSource, marker));

  [
    "export function sampleStarBeastPrototypeFrame",
    "input: StarBeastPrototypeFrameInput",
    "): StarBeastPrototypeFrameState",
    "input.geometryProfile.sourceProjectionReference !==",
    "input.motionProfile.sourceProjectionReference",
    "sourceGeometryReference: input.geometryProfile",
    "sourceMotionReference: motionProfile",
    "sampleTimeSeconds: timeSeconds",
    "Object.freeze({",
  ].forEach((marker) => assertIncludes("frame sampler contract", serviceSource, marker));

  [
    "performance.now",
    "Date.now",
    "setTimeout",
    "requestAnimationFrame",
    "MotherCode",
    "Hexagram",
    "LifeArchetype",
    "fourSymbol",
    "UserProfile",
    "StarBeastIdentity",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "CanvasRenderingContext",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("frame sampler stays pure", serviceSource, marker));

  [
    "sampleStarBeastPrototypeFrame({",
    "geometryProfile: PROTOTYPE_GEOMETRY",
    "motionProfile: PROTOTYPE_MOTION",
    "timeSeconds: now",
    "frame.breathingOffset",
    "frame.tail",
    "prototypeFrame.stardust",
    "prototypeFrame.crystal.pulseScale",
    "prototypeFrame.boundaryShimmerScale",
  ].forEach((marker) => assertIncludes("StarbeastLab consumes frame state", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("sampleStarBeastPrototypeFrame(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "frame sampler has one isolated consumer",
    callSites.sort().join(","),
    [files.service, files.lab].sort().join(","),
  );

  [
    "RC-STAR-BEAST-PROTOTYPE-FRAME-SAMPLER-P80",
    "P78 Geometry Profile",
    "P79 Motion Profile",
    "Explicit Time Input",
    "P80 Prototype Frame Sampler",
    "Immutable Prototype Frame State",
    "相同输入必须得到相同结果",
    "Geometry Profile 与 Motion Profile 必须来自同一个 P77 Projection",
    "Sampler 内部不得读取系统时钟",
    "不持有跨帧状态",
    "唯一允许的页面消费者是 `src/pages/StarbeastLab.tsx`",
  ].forEach((marker) => assertIncludes("frame sampler protocol", protocolSource, marker));

  assertIncludes("type index exports frame input", typeIndexSource, "StarBeastPrototypeFrameInput");
  assertIncludes("type index exports frame state", typeIndexSource, "StarBeastPrototypeFrameState");
  assertIncludes(
    "frame sampler gate registered",
    packageJson.scripts?.["check:star-beast-prototype-frame-sampler"] ?? "",
    "node scripts/check-star-beast-prototype-frame-sampler.mjs",
  );
  assertIncludes(
    "frame sampler participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-frame-sampler",
  );

  const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-prototype-frame-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.service],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { sampleStarBeastPrototypeFrame } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const projection = Object.freeze({ semanticRole: "STAR_BEAST_PROTOTYPE_RENDER_PROJECTION" });
  const geometryProfile = Object.freeze({ sourceProjectionReference: projection });
  const motionProfile = Object.freeze({
    sourceProjectionReference: projection,
    breathing: Object.freeze({ amplitude: 0.007, frequencyHz: 0.24 }),
    tail: Object.freeze({ amplitude: 0.012, frequencyHz: 0.17, phaseOffset: 0.9 }),
    stardust: Object.freeze({ driftRate: 0.9, orbitAmplitude: 6 }),
    crystalPulse: Object.freeze({ enabled: true, amplitude: 0.5, frequencyHz: 0.48 }),
    boundaryShimmer: Object.freeze({ amplitude: 0.1, frequencyHz: 0.3 }),
  });
  const input = Object.freeze({ geometryProfile, motionProfile, timeSeconds: 2.5 });
  const frameA = sampleStarBeastPrototypeFrame(input);
  const frameB = sampleStarBeastPrototypeFrame(input);
  const laterFrame = sampleStarBeastPrototypeFrame({ ...input, timeSeconds: 2.75 });

  assertEqual("same input produces same frame", JSON.stringify(frameA), JSON.stringify(frameB));
  assertEqual("explicit time advances frame", JSON.stringify(frameA) !== JSON.stringify(laterFrame), true);
  assertEqual("geometry reference is preserved", frameA.sourceGeometryReference === geometryProfile, true);
  assertEqual("motion reference is preserved", frameA.sourceMotionReference === motionProfile, true);
  assertEqual(
    "frame state is immutable",
    Object.isFrozen(frameA) && Object.isFrozen(frameA.tail) && Object.isFrozen(frameA.stardust) && Object.isFrozen(frameA.crystal),
    true,
  );
  assertEqual("frame keeps life state immutable", frameA.noLifeStateMutation, true);

  let mismatchRejected = false;
  try {
    sampleStarBeastPrototypeFrame({
      ...input,
      geometryProfile: Object.freeze({ sourceProjectionReference: Object.freeze({}) }),
    });
  } catch {
    mismatchRejected = true;
  }
  assertEqual("projection mismatch is rejected", mismatchRejected, true);

  let invalidTimeRejected = false;
  try {
    sampleStarBeastPrototypeFrame({ ...input, timeSeconds: Number.NaN });
  } catch {
    invalidTimeRejected = true;
  }
  assertEqual("invalid time is rejected", invalidTimeRejected, true);
  fs.rmSync(tempModulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast prototype frame sampler | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype frame sampler gate");
