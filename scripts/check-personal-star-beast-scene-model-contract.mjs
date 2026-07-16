import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  visualGrammar: "docs/GUANYAO_VISUAL_MANIFESTATION_GRAMMAR.md",
  technicalReview: "docs/GUANYAO_VISUAL_TECHNICAL_ARCHITECTURE_REVIEW.md",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_SCENE_MODEL_CONTRACT.md",
  contractType: "src/types/personalStarBeastSceneModel.ts",
  typeIndex: "src/types/index.ts",
  manifestationReadinessType:
    "src/types/personalStarBeastManifestationReadiness.ts",
  visualStateType: "src/types/starBeastVisualState.ts",
  rendererContractType: "src/types/starBeastRendererContract.ts",
  experimentStatus:
    "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIMENT_STATUS_PROTOCOL.md",
  packageManifest: "package.json",
});

const forbiddenServicePath = path.join(
  rootDir,
  "src/services/personalStarBeastSceneModelService.ts",
);
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

if (fs.existsSync(forbiddenServicePath)) {
  failures.push(`contract knife must not create service=${forbiddenServicePath}`);
} else {
  console.log("PASS | no Scene Model service created");
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
    "P0 formal visual boundary remains",
    source.productConstitution,
    "Identity\n↓\nManifestation\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P1 formal identity remains",
    source.lifeConstitution,
    "PersonalStarBeastIdentity",
  );
  assertIncludes(
    "P92 manifestation grammar remains",
    source.visualGrammar,
    "Manifestation Grammar\n↓\nVisual State\n↓\nRenderer",
  );
  assertIncludes(
    "P93 requires scene model contract",
    source.technicalReview,
    "Personal Star Beast Renderer-neutral Scene Model Contract",
  );
  assertIncludes(
    "P90 remains design readiness only",
    source.manifestationReadinessType,
    "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN",
  );

  [
    "export type PersonalStarBeastManifestationReadinessReference",
    "export type PersonalStarBeastManifestationGrammarReference",
    "export type PersonalStarBeastMansionSeedStructureReference",
    "export type PersonalStarBeastFourSymbolSpatialFieldReference",
    "export type PersonalStarBeastLifeForceModulationReference",
    "export type PersonalStarBeastManifestationStageReference",
    "export type PersonalStarBeastSceneQualityProfileReference",
    "export type PersonalStarBeastSceneModelInput",
    "export type PersonalStarBeastSceneModel",
    "export type PersonalStarBeastSceneModelBoundary",
    'semanticRole: "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL"',
    "visualStateSpecialization: true",
    "rendererNeutral: true",
    "referenceOnly: true",
    "noLifeFactCopy: true",
    "noIdentityCalculation: true",
    "noCoordinateData: true",
    "noParticleParameters: true",
    "noAnimationParameters: true",
    "noShaderDefinition: true",
    "noMaterialDefinition: true",
    "noAssetGeneration: true",
    "noDrawCommands: true",
    "noRendererInvocation: true",
    "directRendererConsumptionForbidden: true",
    "futureP40AdapterRequired: true",
    "webGLPrototypeAuthorizationDeferred: true",
  ].forEach((marker) =>
    assertIncludes("Scene Model contract type", source.contractType, marker),
  );

  [
    "CanvasRenderingContext2D",
    "Path2D",
    "WebGLRenderingContext",
    "Object3D",
    "ShaderMaterial",
    "requestAnimationFrame",
    'from "three"',
    "@react-three/fiber",
    "localStorage",
    "sessionStorage",
    "../services/",
  ].forEach((marker) =>
    assertExcludes("Scene Model contract stays semantic-only", source.contractType, marker),
  );

  [
    "PersonalStarBeastSceneModel",
    "PersonalStarBeastSceneModelBoundary",
    "PersonalStarBeastSceneModelInput",
    'from "./personalStarBeastSceneModel"',
  ].forEach((marker) =>
    assertIncludes("type index exports Scene Model contract", source.typeIndex, marker),
  );

  [
    "GUANYAO Personal Star Beast Scene Model Contract V1.0",
    "RENDERER-NEUTRAL CONTRACT ONLY / NO WEBGL AUTHORIZATION",
    "Identity\n↓\nManifestation\n↓\nScene Model\n↓\nRenderer",
    "Mansion Seed Structure Reference",
    "Four Symbol Spatial Field Reference",
    "Life Force Modulation Reference",
    "Optional Crystal Imprint Reference",
    "Manifestation Stage Reference",
    "Quality Profile Reference",
    "四象不是动物资产",
    "生命原力不生成兽形",
    "Future P40 Adapter",
    "直接调用 Renderer",
    "至少需要两个正式身份来源的 Scene Model 对照案例",
    "Explicit WebGL Prototype Authorization Review",
  ].forEach((marker) =>
    assertIncludes("Scene Model protocol", source.protocol, marker),
  );

  assertIncludes(
    "P39 remains generic visual state",
    source.visualStateType,
    'semanticRole: "STAR_BEAST_VISUAL_STATE"',
  );
  assertIncludes(
    "P40 remains renderer neutral",
    source.rendererContractType,
    "rendererNeutral: true",
  );
  assertIncludes(
    "P40 still has no draw commands",
    source.rendererContractType,
    "noDrawCommands: true",
  );
  assertIncludes(
    "P84-P87 remain visual experiment",
    source.experimentStatus,
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
  );

  const dependencies = Object.freeze({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  });
  ["three", "@react-three/fiber"].forEach((dependency) => {
    if (Object.hasOwn(dependencies, dependency)) {
      failures.push(`WebGL dependency must remain absent=${dependency}`);
    } else {
      console.log(`PASS | WebGL dependency remains absent | ${dependency}`);
    }
  });

  assertIncludes(
    "Scene Model gate registered",
    packageJson.scripts?.["check-personal-star-beast-scene-model-contract"] ?? "",
    "node scripts/check-personal-star-beast-scene-model-contract.mjs",
  );
  assertIncludes(
    "release includes Scene Model gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-personal-star-beast-scene-model-contract",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Personal Star Beast Scene Model Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Personal Star Beast Scene Model Contract gate passed.");
