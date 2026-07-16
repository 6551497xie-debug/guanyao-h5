import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  visualGrammar: "docs/GUANYAO_VISUAL_MANIFESTATION_GRAMMAR.md",
  architectureReview: "docs/GUANYAO_VISUAL_TECHNICAL_ARCHITECTURE_REVIEW.md",
  manifestationReadinessType:
    "src/types/personalStarBeastManifestationReadiness.ts",
  visualStateType: "src/types/starBeastVisualState.ts",
  rendererContractType: "src/types/starBeastRendererContract.ts",
  backendReadinessProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_READINESS_PROTOCOL.md",
  backendSelectionProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_RESOLVER_PROTOCOL.md",
  backendConsumptionProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_CONSUMPTION_PROTOCOL.md",
  experimentStatus:
    "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIMENT_STATUS_PROTOCOL.md",
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
const assertP99DependencyBoundary = (packageJson) => {
  if (!Object.hasOwn(packageJson.dependencies ?? {}, "three")) {
    failures.push("P99 authorized Three.js dependency is required");
  } else {
    console.log("PASS | Three.js exists only after P98 authorization");
  }
  if (!Object.hasOwn(packageJson.devDependencies ?? {}, "@types/three")) {
    failures.push("P99 Three.js type dependency is required");
  } else {
    console.log("PASS | Three.js types support the isolated module");
  }
  if (Object.hasOwn(packageJson.dependencies ?? {}, "@react-three/fiber")) {
    failures.push("React Three Fiber remains unauthorized");
  } else {
    console.log("PASS | React Three Fiber remains absent");
  }
  if (
    !fs.existsSync(
      path.join(
        rootDir,
        "docs/GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_SLICE_PROTOCOL.md",
      ),
    )
  ) {
    failures.push("P99 isolated Renderer protocol is required");
  } else {
    console.log("PASS | P99 owns the post-review dependency activation");
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

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  assertIncludes(
    "P0 keeps downstream visual boundary",
    source.productConstitution,
    "Identity\n↓\nManifestation\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P1 keeps personal identity convergence",
    source.lifeConstitution,
    "PersonalStarBeastIdentity",
  );
  assertIncludes(
    "P92 keeps formal visual chain",
    source.visualGrammar,
    "Manifestation Grammar\n↓\nVisual State\n↓\nRenderer",
  );

  [
    "GUANYAO Visual Technical Architecture Review V1.0",
    "ARCHITECTURE REVIEW ONLY / NO RENDERER AUTHORIZATION",
    "技术只实现显化语法。技术不能补造生命身份",
    "Personal Star Beast Renderer-neutral Scene Model Contract",
    "Mansion Seed Structure Reference",
    "Four Symbol Spatial Field Reference",
    "Life Force Modulation Reference",
    "Optional Crystal Imprint Reference",
    "RECOMMENDED_FOR_ISOLATED_PROTOTYPE_CANDIDATE",
    "RETAIN_AS_FALLBACK_AND_EXPERIMENT",
    "REQUIRED_FOR_PRODUCTION_CANDIDATE",
    "WebGL2 / Three.js 进入隔离 Prototype 推荐候选，但仍为 `NOT_AUTHORIZED`",
    "Claude / 视觉模型允许提供 Art Direction Evidence，不拥有决定权",
    "至少准备两个不同正式身份来源的对照案例",
    "停止继续优化 P84–P87 白虎实验",
    "Personal Star Beast Scene Model Contract",
    "Explicit WebGL Prototype Authorization Review",
  ].forEach((marker) =>
    assertIncludes("technical architecture review", source.architectureReview, marker),
  );

  [
    "noManifestationDesign: true",
    "noVisualParameterGeneration: true",
    "noAssetCreation: true",
    "noRendererInvocation: true",
  ].forEach((marker) =>
    assertIncludes("P90 remains readiness-only", source.manifestationReadinessType, marker),
  );

  [
    "rendererNeutral: true",
    "semanticChannelsOnly: true",
    "noPixelOutput: true",
    "noDrawCommands: true",
    "noAssetGeneration: true",
    "noWebGLImplementation: true",
    "noThreeJsImplementation: true",
  ].forEach((marker) =>
    assertIncludes("P40 remains renderer neutral", source.rendererContractType, marker),
  );

  assertIncludes(
    "P73 still has no backend selection",
    source.backendReadinessProtocol,
    "noBackendSelection: true",
  );
  assertIncludes(
    "P75 still defers candidate resolution",
    source.backendSelectionProtocol,
    "candidateResolutionDeferred: true",
  );
  assertIncludes(
    "P76 still defers backend activation",
    source.backendConsumptionProtocol,
    "backendActivationDeferred: true",
  );
  assertIncludes(
    "four symbol prototype remains experiment",
    source.experimentStatus,
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
  );
  assertIncludes(
    "four symbol prototype still failed personal validation",
    source.experimentStatus,
    "PERSONAL_STAR_BEAST_SOURCE_VALIDATION",
  );

  assertP99DependencyBoundary(packageJson);

  [
    "CanvasRenderingContext2D",
    "WebGLRenderingContext",
    "new WebGLRenderer",
    "from \"three\"",
    "from '@react-three/fiber'",
  ].forEach((marker) =>
    assertExcludes("review has no renderer implementation", source.architectureReview, marker),
  );

  assertIncludes(
    "technical review gate registered",
    packageJson.scripts?.["check-visual-technical-architecture-review"] ?? "",
    "node scripts/check-visual-technical-architecture-review.mjs",
  );
  assertIncludes(
    "release includes technical review gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-visual-technical-architecture-review",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Visual Technical Architecture Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Visual Technical Architecture Review gate passed.");
