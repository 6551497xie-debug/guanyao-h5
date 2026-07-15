import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeGeometry.ts",
  service: "src/services/starBeastPrototypeGeometryService.ts",
  lab: "src/pages/StarbeastLab.tsx",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_GEOMETRY_PROTOCOL.md",
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
    "export type StarBeastPrototypeGeometryPoint",
    "export type StarBeastPrototypeCoreStar",
    "export type StarBeastPrototypeGeometryPath",
    "export type StarBeastPrototypeGeometryProfile",
    'semanticRole: "STAR_BEAST_PROTOTYPE_GEOMETRY_PROFILE"',
    'prototypeGeometryId: "BAIHU_CONSTELLATION_V1"',
    "sourceProjectionReference: StarBeastPrototypeRenderProjection",
    "coreStars: readonly StarBeastPrototypeCoreStar[]",
    "silhouettePaths: readonly StarBeastPrototypeGeometryPath[]",
    "normalizedCoordinates: true",
    "staticPrototypeGeometry: true",
    "visualReferenceOnly: true",
    "noStarBeastIdentityInference: true",
    "noBusinessStateMutation: true",
    "noAssetGeneration: true",
  ].forEach((marker) => assertIncludes("prototype geometry type", typeSource, marker));

  [
    'from "../types/starBeastRendererPrototypeAdapter"',
    "const BAIHU_CORE_STARS",
    "const BAIHU_SILHOUETTE_PATHS",
    "export function resolveBaihuPrototypeGeometryProfile",
    "projection: StarBeastPrototypeRenderProjection",
    "): StarBeastPrototypeGeometryProfile",
    'prototypeGeometryId: "BAIHU_CONSTELLATION_V1"',
    "sourceProjectionReference: projection",
    "coreStars: BAIHU_CORE_STARS",
    "silhouettePaths: BAIHU_SILHOUETTE_PATHS",
    "Object.freeze({",
  ].forEach((marker) => assertIncludes("projection drives geometry profile", serviceSource, marker));

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
    "identityReference",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "requestAnimationFrame",
    "getContext(",
    "CanvasRenderingContext",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("geometry service stays projection-only", serviceSource, marker));

  [
    "resolveBaihuPrototypeGeometryProfile(",
    "PROTOTYPE_GEOMETRY.coreStars",
    "PROTOTYPE_GEOMETRY.silhouettePaths",
    "PROTOTYPE_GEOMETRY.crystalAnchorIndex",
    'ctx.fillText("西方白虎 ｜ 安静在场"',
  ].forEach((marker) => assertIncludes("StarbeastLab consumes Baihu geometry", labSource, marker));

  ["DRAGON", "东方青龙", "localStorage", "sessionStorage", 'from "three"', "WebGLRenderingContext"].forEach(
    (marker) => assertExcludes("StarbeastLab keeps P78 isolated", labSource, marker),
  );

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveBaihuPrototypeGeometryProfile(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "geometry profile has one isolated consumer",
    callSites.sort().join(","),
    [files.service, files.lab].sort().join(","),
  );

  [
    "RC-STAR-BEAST-PROTOTYPE-GEOMETRY-P78",
    "BAIHU PROTOTYPE GEOMETRY PROFILE",
    "P77 Prototype Render Projection",
    "P78 Baihu Prototype Geometry Profile",
    "七枚核心星点",
    "几何坐标范围固定为 `0..1`",
    "只接收 P77 `StarBeastPrototypeRenderProjection`",
    "不是对用户星兽身份的判断",
    "唯一允许消费者是 `src/pages/StarbeastLab.tsx`",
    "不引入 WebGL、Three.js、3D 模型和正式视觉资产",
  ].forEach((marker) => assertIncludes("prototype geometry protocol", protocolSource, marker));

  assertIncludes("type index exports geometry profile", typeIndexSource, "StarBeastPrototypeGeometryProfile");
  assertIncludes(
    "geometry gate command registered",
    packageJson.scripts?.["check:star-beast-prototype-geometry"] ?? "",
    "node scripts/check-star-beast-prototype-geometry.mjs",
  );
  assertIncludes(
    "geometry gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-prototype-geometry",
  );

  const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-prototype-geometry-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.service],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolveBaihuPrototypeGeometryProfile } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const projection = Object.freeze({ semanticRole: "STAR_BEAST_PROTOTYPE_RENDER_PROJECTION" });
  const profile = resolveBaihuPrototypeGeometryProfile(projection);
  const allPoints = [
    ...profile.coreStars,
    ...profile.silhouettePaths.flatMap((geometryPath) => geometryPath.points),
  ];

  assertEqual("projection reference is preserved", profile.sourceProjectionReference === projection, true);
  assertEqual("Baihu has seven core stars", profile.coreStars.length, 7);
  assertEqual("Baihu has multiple silhouette paths", profile.silhouettePaths.length >= 6, true);
  assertEqual(
    "all geometry is normalized",
    allPoints.every(({ x, y }) => x >= 0 && x <= 1 && y >= 0 && y <= 1),
    true,
  );
  assertEqual(
    "geometry profile is immutable",
    Object.isFrozen(profile) &&
      Object.isFrozen(profile.coreStars) &&
      Object.isFrozen(profile.silhouettePaths) &&
      profile.silhouettePaths.every((geometryPath) => Object.isFrozen(geometryPath.points)),
    true,
  );
  assertEqual("geometry does not infer identity", profile.noStarBeastIdentityInference, true);
  fs.rmSync(tempModulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast prototype geometry | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype geometry gate");
