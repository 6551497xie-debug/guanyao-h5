import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  visualGrammar: "docs/GUANYAO_VISUAL_MANIFESTATION_GRAMMAR.md",
  technicalReview: "docs/GUANYAO_VISUAL_TECHNICAL_ARCHITECTURE_REVIEW.md",
  sceneModelProtocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_CONTRACT.md",
  authorizationReview:
    "docs/GUANYAO_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW_PROTOCOL.md",
  sceneModelType: "src/types/personalStarBeastSceneModel.ts",
  rendererContractType: "src/types/starBeastRendererContract.ts",
  experimentStatus:
    "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIMENT_STATUS_PROTOCOL.md",
  starbeastLab: "src/pages/StarbeastLab.tsx",
  genesisPreview: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
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

const forbiddenImplementationPaths = [
  "src/renderers/personalStarBeastWebGLRenderer.ts",
  "src/services/personalStarBeastWebGLRenderer.ts",
  "src/services/personalStarBeastThreeRenderer.ts",
];

for (const relativePath of forbiddenImplementationPaths) {
  if (fs.existsSync(path.join(rootDir, relativePath))) {
    failures.push(`P95 must not create Renderer implementation=${relativePath}`);
  } else {
    console.log(`PASS | Renderer implementation remains absent | ${relativePath}`);
  }
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  assertIncludes(
    "P0 visual boundary remains",
    source.productConstitution,
    "Identity\n↓\nManifestation\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P1 formal life identity remains",
    source.lifeConstitution,
    "PersonalStarBeastIdentity",
  );
  assertIncludes(
    "P92 manifestation grammar remains",
    source.visualGrammar,
    "Manifestation Grammar\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P93 recommends isolated candidate only",
    source.technicalReview,
    "RECOMMENDED_FOR_ISOLATED_PROTOTYPE_CANDIDATE",
  );
  assertIncludes(
    "P93 keeps WebGL unauthorized",
    source.technicalReview,
    "WebGL2 / Three.js 进入隔离 Prototype 推荐候选，但仍为 `NOT_AUTHORIZED`",
  );
  assertIncludes(
    "P94 scene model is renderer neutral",
    source.sceneModelType,
    "rendererNeutral: true",
  );
  assertIncludes(
    "P94 forbids direct renderer consumption",
    source.sceneModelType,
    "directRendererConsumptionForbidden: true",
  );
  assertIncludes(
    "P94 defers WebGL authorization",
    source.sceneModelType,
    "webGLPrototypeAuthorizationDeferred: true",
  );
  assertIncludes(
    "P94 protocol names explicit authorization review",
    source.sceneModelProtocol,
    "Explicit WebGL Prototype Authorization Review",
  );

  [
    "GUANYAO WebGL Prototype Authorization Review V1.0",
    "RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION",
    "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION",
    "CANDIDATE_ONLY / NOT_ACTIVATED",
    "PersonalStarBeastIdentityReference",
    "P92 Manifestation Grammar",
    "PersonalStarBeastSceneModel",
    "Future P40 Scene Model Adapter",
    "StarBeastRenderPlan",
    "Renderer 只能消费 `StarBeastRenderPlan`",
    "Case A｜现有正式来源基线",
    "Case B｜独立正式来源对照",
    "禁止人工指定星宿、四象、母码或动物形态",
    "Canvas 2D Semantic Fallback",
    "Static Accessible Fallback",
    "COSMIC_LAYER",
    "MANSION_LAYER",
    "FIELD_LAYER",
    "FORCE_LAYER",
    "REVEAL_LAYER",
    "完整 3D 动物模型",
    "Memory",
    "Archive",
    "Gravity 视觉接入",
    "稳定 `60fps`",
    "稳定 `30fps`",
    "webglcontextlost",
    "webglcontextrestored",
    "RECOMMENDED_FOR_ISOLATED_PROTOTYPE",
    "NOT_RECOMMENDED_FOR_FIRST_PROTOTYPE",
    "该建议不等于本刀允许 `npm install three`",
    "总控的独立显式授权决定",
  ].forEach((marker) =>
    assertIncludes("P95 authorization review", source.authorizationReview, marker),
  );

  [
    "rendererNeutral: true",
    "semanticChannelsOnly: true",
    "noPixelOutput: true",
    "noDrawCommands: true",
    "noAssetGeneration: true",
  ].forEach((marker) =>
    assertIncludes("P40 remains renderer neutral", source.rendererContractType, marker),
  );

  assertIncludes(
    "P84-P87 remain experiment",
    source.experimentStatus,
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
  );
  assertIncludes(
    "P84-P87 remain invalid as personal source",
    source.experimentStatus,
    "PERSONAL_STAR_BEAST_SOURCE_VALIDATION",
  );

  const dependencies = Object.freeze({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });
  if (!Object.hasOwn(dependencies, "three")) {
    failures.push("P99 authorized Three.js dependency is required");
  } else {
    console.log("PASS | P95 recommendation is activated only by P98/P99");
  }
  if (Object.hasOwn(dependencies, "@react-three/fiber")) {
    failures.push("React Three Fiber remains outside P99 scope");
  } else {
    console.log("PASS | React Three Fiber remains absent");
  }

  [source.starbeastLab, source.genesisPreview].forEach((pageSource, index) => {
    const pageName = index === 0 ? "StarbeastLab" : "Genesis Preview";
    [
      'from "three"',
      "from 'three'",
      "@react-three/fiber",
      "WebGLRenderingContext",
      "WebGL2RenderingContext",
      "WebGLRenderer",
    ].forEach((marker) =>
      assertExcludes(`${pageName} remains unchanged by P95`, pageSource, marker),
    );
  });

  assertIncludes(
    "P95 gate registered",
    packageJson.scripts?.["check-webgl-prototype-authorization-review"] ?? "",
    "node scripts/check-webgl-prototype-authorization-review.mjs",
  );
  assertIncludes(
    "release includes P95 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-webgl-prototype-authorization-review",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO WebGL Prototype Authorization Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO WebGL Prototype Authorization Review gate passed.");
