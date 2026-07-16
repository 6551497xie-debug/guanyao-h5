import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  page: "src/pages/StarBeastGenesisPreview.tsx",
  style: "src/styles/starbeast-genesis-preview.css",
  routes: "src/router/previewRoutes.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  schemaGate: "scripts/check-star-beast-genesis-experience-schema.mjs",
  readinessGate: "scripts/check-star-beast-genesis-experience-presentation-readiness.mjs",
  motherSourceGate: "scripts/check-mother-code-life-archetype-source.mjs",
  foundationFreezeGate: "scripts/check-original-self-life-schema-foundation-freeze.mjs",
  assetArchitectureGate: "scripts/check-star-beast-asset-architecture.mjs",
  protocol: "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIENCE_PREVIEW_PROTOCOL.md",
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
  const pageSource = fs.readFileSync(absolute.page, "utf8");
  const styleSource = fs.readFileSync(absolute.style, "utf8");
  const routesSource = fs.readFileSync(absolute.routes, "utf8");
  const appSource = fs.readFileSync(absolute.app, "utf8");
  const launchSource = fs.readFileSync(absolute.launch, "utf8");
  const schemaGateSource = fs.readFileSync(absolute.schemaGate, "utf8");
  const readinessGateSource = fs.readFileSync(absolute.readinessGate, "utf8");
  const motherSourceGateSource = fs.readFileSync(absolute.motherSourceGate, "utf8");
  const foundationFreezeGateSource = fs.readFileSync(absolute.foundationFreezeGate, "utf8");
  const assetArchitectureGateSource = fs.readFileSync(absolute.assetArchitectureGate, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(absolute.packageManifest, "utf8"));

  [
    "export function StarBeastGenesisPreview",
    "resolveStarbeastFromBirthDate(DEMO_BIRTH)",
    "resolveLunarTrigramLanding(DEMO_BIRTH)",
    "resolveLifeArchetypeProfileFromMotherCode(motherProfile)",
    "resolveStarBeastAssetDefinition(",
    "resolveStarBeastGenesisExperience(",
    "resolveStarBeastGenesisExperiencePresentationReadiness(",
    'data-preview-scope="ISOLATED_GENESIS_PREVIEW_ONLY"',
    'data-readiness="READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW"',
    'data-manual-acceptance="required"',
    "星兽不是生成，是显化。",
    "原来，它一直在那里。",
    "体验顺序，不是因果推导顺序",
    "本我生命显化 · 非最终视觉资产",
    "等待人工验收 · 不进入正式流程",
    'stage: "COSMIC_ORIGIN"',
    'stage: "ORIGIN_COORDINATE"',
    'stage: "STAR_MANSION_ALIGNMENT"',
    'stage: "FOUR_SYMBOL_FORMATION"',
    'stage: "LIFE_ARCHETYPE_INFUSION"',
    'stage: "STAR_BEAST_REVEAL"',
  ].forEach((marker) => assertIncludes("genesis preview page", pageSource, marker));

  [
    "localStorage",
    "sessionStorage",
    "fetch(",
    "useNavigate",
    "navigate(",
    "LaunchLab",
    "GravityPage",
    "StarbeastLab",
    "CanvasRenderingContext",
    "getContext(",
    'from "three"',
  ].forEach((marker) => assertExcludes("preview remains isolated", pageSource, marker));

  [
    ".gy-genesis-preview",
    ".gy-genesis-preview__hero",
    ".gy-genesis-beast__constellation",
    ".gy-genesis-preview__stages",
    "@media (max-width: 860px)",
    "@media (prefers-reduced-motion: reduce)",
  ].forEach((marker) => assertIncludes("genesis preview style", styleSource, marker));

  [
    'export const STAR_BEAST_GENESIS_PREVIEW_ROUTE = "/starbeast-genesis-preview"',
    "import { StarBeastGenesisPreview }",
    "path: STAR_BEAST_GENESIS_PREVIEW_ROUTE",
    "element: createElement(StarBeastGenesisPreview)",
  ].forEach((marker) => assertIncludes("isolated preview route", routesSource, marker));

  assertExcludes("App has no direct genesis preview route", appSource, "StarBeastGenesisPreview");
  assertExcludes("Launch has no genesis preview link", launchSource, "starbeast-genesis-preview");
  assertIncludes("P86 gate allows isolated preview only", schemaGateSource, "mapping consumer stays isolated preview only");
  assertIncludes("P87 gate allows isolated preview only", readinessGateSource, "readiness consumer stays isolated preview only");
  assertIncludes(
    "Mother Code source gate allows only schema entry and isolated preview",
    motherSourceGateSource,
    "source bridge is only consumed by schema entry, isolated genesis previews, scene model fixtures, and formal identity convergence",
  );
  assertIncludes(
    "foundation freeze allows only entry and isolated preview",
    foundationFreezeGateSource,
    "mother code source is owned by entry, isolated genesis previews, scene model fixtures, and formal identity convergence",
  );
  assertIncludes(
    "asset architecture allows only isolated preview consumption",
    assetArchitectureGateSource,
    "asset mapping is consumed only by the isolated genesis preview",
  );

  [
    "RC-STAR-BEAST-GENESIS-EXPERIENCE-PREVIEW-P88",
    "/starbeast-genesis-preview",
    "现有正式 Star Beast、母码、LifeArchetype、Asset、P86、P87 链",
    "非最终视觉资产",
    "不加入 Launch、Gravity、Dynamics 或正式导航",
    "不消费真实用户资料",
    "只等待主体人工验收",
  ].forEach((marker) => assertIncludes("genesis preview protocol", protocolSource, marker));

  assertIncludes(
    "preview gate registered",
    packageJson.scripts?.["check:star-beast-genesis-experience-preview"] ?? "",
    "node scripts/check-star-beast-genesis-experience-preview.mjs",
  );
  assertIncludes(
    "preview gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-genesis-experience-preview",
  );
  assertIncludes(
    "asset consumption postcheck remains intact",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-asset-prototype-consumption",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-preview-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.page],
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    jsx: "automatic",
    loader: { ".css": "empty" },
    logLevel: "silent",
  });
  const { StarBeastGenesisPreview } = await import(`file://${modulePath}?t=${Date.now()}`);
  const element = StarBeastGenesisPreview();
  assertEqual("preview component renders main", element.type, "main");
  assertEqual("preview scope is isolated", element.props["data-preview-scope"], "ISOLATED_GENESIS_PREVIEW_ONLY");
  assertEqual("preview readiness is ready", element.props["data-readiness"], "READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW");
  assertEqual("manual acceptance is required", element.props["data-manual-acceptance"], "required");
  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast genesis experience preview | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast genesis experience preview gate");
