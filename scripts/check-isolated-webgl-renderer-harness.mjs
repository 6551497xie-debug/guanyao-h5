import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol: "docs/GUANYAO_ISOLATED_WEBGL_RENDERER_HARNESS_PROTOCOL.md",
  firstImpressionReview: "docs/GUANYAO_P100_FIRST_IMPRESSION_REVIEW.md",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  styles: "src/styles/personal-star-beast-webgl-prototype-harness.css",
  previewRoutes: "src/router/previewRoutes.ts",
  productionRoutes: "src/routes/guanyaoRoutes.ts",
  appShell: "src/components/AppShell.tsx",
  prototype: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  fixtureData: "src/mocks/starBeastSceneModelFixtures.ts",
  renderPlanAdapter: "src/services/personalStarBeastRenderPlanAdapter.ts",
  authorizationService:
    "src/services/isolatedWebGLRendererPrototypeAuthorizationService.ts",
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
  if (actual !== expected) {
    failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  } else {
    console.log(`PASS | ${name} | expected=${String(expected)}`);
  }
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

const listSourceFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(entryPath);
    return /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GUANYAO Isolated WebGL Renderer Harness Protocol V1.0",
    "RC-ISOLATED-WEBGL-RENDERER-HARNESS-P100",
    "IMPLEMENTED_FOR_HUMAN_FIRST_IMPRESSION_REVIEW / NOT VISUALLY ACCEPTED",
    "P96 两个正式身份样本",
    "P97 PersonalStarBeastRenderPlan",
    "P98 Explicit Authorization",
    "P99 Isolated WebGL Renderer",
    "P100 Human First Impression Harness",
    "用户有没有感到一个生命正在靠近、形成并在场",
    "ARRIVAL｜抵达",
    "FORMATION｜形成",
    "PRESENCE｜在场",
    "第一眼人工验收问题",
    "第一眼否决条件",
    "P100 自动 gate 不得替人回答这些问题",
    "PENDING_HUMAN_FIRST_IMPRESSION_REVIEW",
    "FIRST_IMPRESSION_ACCEPTED",
    "FIRST_IMPRESSION_NEEDS_CALIBRATION",
    "FIRST_IMPRESSION_REJECTED",
  ].forEach((marker) =>
    assertIncludes("P100 first-impression protocol", source.protocol, marker),
  );

  [
    "GUANYAO P100 First Impression Review",
    "FIRST_IMPRESSION_NEEDS_CALIBRATION",
    "总控最终决定：`PENDING`",
    "Mobile：`355 × 706`",
    "Desktop：`1280 × 800`",
    "多边形星图围绕一个发光核心",
    "同一套视觉模板换参数",
    "P99 Scene Projection",
    "RC-PERSONAL-STAR-BEAST-LIFE-PRESENCE-SCENE-PROJECTION-CALIBRATION-P101",
    "禁止把下一刀变成“再加特效”",
  ].forEach((marker) =>
    assertIncludes(
      "P100 observed first-impression review",
      source.firstImpressionReview,
      marker,
    ),
  );

  [
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B",
    "adaptPersonalStarBeastSceneModelToRenderPlan",
    "authorizeIsolatedWebGLRendererPrototype",
    "createIsolatedWebGLRendererPrototype",
    'prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY"',
    'type FirstImpressionPhase = "ARRIVAL" | "FORMATION" | "PRESENCE"',
    'data-prototype-scope="ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY"',
    "window.requestAnimationFrame(animate)",
    "window.cancelAnimationFrame(animationFrame)",
    "new ResizeObserver",
    "resizeObserver.disconnect()",
    "controller.dispose()",
    "prefers-reduced-motion: reduce",
    "再看一次",
    "看看另一种生命",
    "原来，它一直在这里。",
    "它不是答案。它会陪你经历，你正在成为谁。",
  ].forEach((marker) =>
    assertIncludes("P100 isolated Harness", source.harness, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "calibrateStarBeastGenesisSource",
    "localStorage",
    "sessionStorage",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) =>
    assertExcludes("Harness does not infer life identity", source.harness, marker),
  );

  [
    ".gy-p100--arrival",
    ".gy-p100--formation",
    ".gy-p100--presence",
    ".gy-p100__canvas",
    ".gy-p100__life-halo",
    ".gy-p100__veil",
    ".gy-p100__actions",
    ".gy-p100__static-presence",
    "@media (max-width: 560px)",
    "@media (prefers-reduced-motion: reduce)",
  ].forEach((marker) =>
    assertIncludes("P100 first-impression visual shell", source.styles, marker),
  );

  assertIncludes(
    "P100 exists only as preview route",
    source.previewRoutes,
    '"/personal-star-beast-webgl-prototype"',
  );
  assertIncludes(
    "P100 preview route consumes isolated Harness",
    source.previewRoutes,
    "createElement(PersonalStarBeastWebGLPrototypeHarness)",
  );
  assertIncludes(
    "P100 route is development-only",
    source.previewRoutes,
    "import.meta.env.DEV",
  );
  assertIncludes(
    "P100 module is dynamically isolated",
    source.previewRoutes,
    'import("../pages/PersonalStarBeastWebGLPrototypeHarness")',
  );
  assertIncludes(
    "P100 lazy module has a Suspense boundary",
    source.previewRoutes,
    "createElement(\n            Suspense,",
  );
  assertIncludes(
    "P100 receives fullscreen shell boundary",
    source.appShell,
    'location.pathname === "/personal-star-beast-webgl-prototype"',
  );
  assertExcludes(
    "Production routes exclude P100",
    source.productionRoutes,
    "personal-star-beast-webgl-prototype",
  );
  assertExcludes(
    "P99 Renderer does not own animation loop",
    source.prototype,
    "requestAnimationFrame",
  );
  assertExcludes(
    "P99 Renderer remains Scene Model blind",
    source.prototype,
    "PersonalStarBeastSceneModel",
  );

  const rendererCallSites = listSourceFiles(path.join(rootDir, "src"))
    .filter((filePath) =>
      fs
        .readFileSync(filePath, "utf8")
        .includes("createIsolatedWebGLRendererPrototype("),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P99 Renderer has one isolated Harness consumer",
    rendererCallSites.join(","),
    [files.harness, files.prototype].sort().join(","),
  );

  const visibleTechnicalFragments = [
    ">P100<",
    ">WebGL<",
    ">RenderPlan<",
    ">Case A<",
    ">Case B<",
    ">EXPERIMENT<",
    ">ISOLATED<",
  ];
  visibleTechnicalFragments.forEach((fragment) =>
    assertExcludes("user viewport excludes engineering labels", source.harness, fragment),
  );

  assertIncludes(
    "P100 gate registered",
    packageJson.scripts?.["check-isolated-webgl-renderer-harness"] ?? "",
    "node scripts/check-isolated-webgl-renderer-harness.mjs",
  );
  assertIncludes(
    "release includes P100 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-isolated-webgl-renderer-harness",
  );
}

if (failures.length > 0) {
  console.error("\nIsolated WebGL Renderer Harness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nIsolated WebGL Renderer Harness gate passed.");
