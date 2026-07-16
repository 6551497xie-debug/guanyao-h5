import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  constitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  layerBoundary: "docs/GUANYAO_ENGINEERING_LAYER_BOUNDARY.md",
  experimentStatus:
    "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIMENT_STATUS_PROTOCOL.md",
  genesisPreview: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  visualState: "src/services/starBeastVisualStateMapping.ts",
  renderPlan: "src/services/starBeastRenderPlanAdapter.ts",
  rendererPrototype: "src/services/starBeastRendererPrototypeAdapter.ts",
  genesisRenderer: "src/services/starBeastGenesisRendererPrototype.ts",
  cosmicConsciousness: "src/services/starBeastCosmicConsciousnessMapping.ts",
  stellarFlesh: "src/services/starBeastStellarFleshMapping.ts",
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

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GUANYAO Product & Engineering Constitution V1.0",
    "先建立系统，再优化局部",
    "局部效果",
    "重新定义系统",
    "生命对象",
    "来源引擎",
    "显化表达",
    "禁止视觉创造身份",
    "计算链与体验链分离",
    "体验顺序不得成为新的计算依赖",
    "`EXPERIMENT`",
    "`CANDIDATE`",
    "`PRODUCTION`",
    "Identity",
    "Manifestation",
    "Visual State",
    "Renderer",
    "本命星宿",
    "四象",
    "MotherCode",
    "LifeArchetype",
    "Gravity",
    "Choice",
    "Crystal",
    "工程施工五问",
    "Renderer → 修改 Identity",
    "Visual Asset → 修改 Life Model",
    "UI 反馈 → 修改计算规则",
    "Prototype 结果 → 自动升级 Production",
    "先审查，再施工，再 gate，再提交",
  ].forEach((marker) =>
    assertIncludes("product engineering constitution", source.constitution, marker),
  );

  const layers = [
    "WORLDVIEW",
    "LIFE SYSTEM",
    "ENGINE",
    "EXPERIENCE",
    "VISUAL",
    "UI",
    "IMPLEMENTATION",
  ];
  layers.forEach((layer) =>
    assertIncludes("engineering layer boundary", source.layerBoundary, layer),
  );
  [
    "修改只能向下",
    "下位层不得反向定义、重算或修改上位层",
    "上位定义",
    "稳定契约",
    "下位消费",
    "Review / Evidence",
    "MansionSeed + FourSymbolField + LifeArchetypeForce",
    "PersonalStarBeastIdentityReference",
    "Preview URL 或人工视觉满意不能作为 Production 授权",
    "发现指令截断、来源冲突、跨层上行或 Prototype 冒充 Production",
  ].forEach((marker) =>
    assertIncludes("engineering layer boundary", source.layerBoundary, marker),
  );

  [
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
    "PERSONAL_STAR_BEAST_SOURCE_VALIDATION",
    "不能直接作为正式 Renderer",
  ].forEach((marker) =>
    assertIncludes("prototype status remains explicit", source.experimentStatus, marker),
  );
  assertIncludes(
    "isolated genesis preview remains explicit",
    source.genesisPreview,
    "ISOLATED_PROTOTYPE_ONLY",
  );

  const visualSources = [
    ["visual state mapping", source.visualState],
    ["render plan adapter", source.renderPlan],
    ["renderer prototype adapter", source.rendererPrototype],
    ["genesis renderer prototype", source.genesisRenderer],
    ["cosmic consciousness mapping", source.cosmicConsciousness],
    ["stellar flesh mapping", source.stellarFlesh],
  ];
  const forbiddenUpstreamExecutions = [
    "guanyaoStarbeastEngineService",
    "guanyaoLunarMotherCodeLandingAdapter",
    "guanyaoCausalEngineService",
    "resolveStarbeastFromBirthDate(",
    "runMotherCodeLandingEngine(",
    "resolveLifeArchetypeProfileFromMotherCode(",
    "freezeStarMansionLifeTrajectorySource(",
    "resolvePersonalStarBeastManifestationReadiness(",
    "localStorage",
    "sessionStorage",
  ];
  for (const [name, visualSource] of visualSources) {
    forbiddenUpstreamExecutions.forEach((marker) =>
      assertExcludes(`${name} does not redefine upstream`, visualSource, marker),
    );
  }

  assertIncludes(
    "constitution gate registered",
    packageJson.scripts?.["check:product-engineering-constitution"] ?? "",
    "node scripts/check-product-engineering-constitution.mjs",
  );
  assertIncludes(
    "release includes constitution gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:product-engineering-constitution",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Product & Engineering Constitution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Product & Engineering Constitution gate passed.");
