import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  layerBoundary: "docs/GUANYAO_ENGINEERING_LAYER_BOUNDARY.md",
  visualGrammar: "docs/GUANYAO_VISUAL_MANIFESTATION_GRAMMAR.md",
  experimentStatus:
    "docs/GUANYAO_STAR_BEAST_GENESIS_EXPERIMENT_STATUS_PROTOCOL.md",
  visualStateMapping: "src/services/starBeastVisualStateMapping.ts",
  renderPlanAdapter: "src/services/starBeastRenderPlanAdapter.ts",
  rendererPrototypeAdapter:
    "src/services/starBeastRendererPrototypeAdapter.ts",
  genesisRendererPrototype:
    "src/services/starBeastGenesisRendererPrototype.ts",
  genesisPrototypeCanvas:
    "src/components/StarBeastGenesisRendererPrototypeCanvas.tsx",
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
const assertOrdered = (name, source, markers) => {
  let cursor = -1;
  for (const marker of markers) {
    const next = source.indexOf(marker, cursor + 1);
    if (next === -1) {
      failures.push(`${name} missing=${marker}`);
      return;
    }
    if (next <= cursor) {
      failures.push(`${name} order-invalid=${marker}`);
      return;
    }
    cursor = next;
  }
  console.log(`PASS | ${name} | order=${markers.join("→")}`);
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
    "P0 keeps visual below life system",
    source.layerBoundary,
    "LIFE SYSTEM",
  );
  assertIncludes(
    "P0 forbids visual identity creation",
    source.productConstitution,
    "禁止视觉创造身份",
  );
  assertIncludes(
    "P1 freezes personal identity sources",
    source.lifeConstitution,
    "本命星宿\n+ 四象形态场\n+ LifeArchetype 生命原力",
  );

  [
    "GUANYAO Visual Manifestation Grammar V1.0",
    "视觉不创造生命。视觉只显化生命",
    "Layer 1：Life Identity Grammar",
    "Layer 2：Manifestation Grammar",
    "Layer 3：Visual Style Grammar",
    "Identity Expression Rules",
    "Mansion Seed Expression",
    "Four Symbol Field Expression",
    "Life Force Expression",
    "Crystal Imprint Expression",
    "四象不是动物模型",
    "MotherCode 不生成兽形",
    "个人星宿兽显化规则",
    "本命星宿生命种子，在四象生命形态场中，经由生命原力表达后形成的个人生命显化",
    "AI 输出默认属于视觉探索",
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
    "PERSONAL_STAR_BEAST_SOURCE_VALIDATION",
    "Preview 可见、视觉满意或技术可运行均不构成状态升级授权",
    "Visual Technical Architecture Review",
  ].forEach((marker) =>
    assertIncludes("visual manifestation grammar", source.visualGrammar, marker),
  );

  assertOrdered("formal visual chain", source.visualGrammar, [
    "Identity\n",
    "Manifestation Grammar\n",
    "Visual State\n",
    "Renderer\n",
  ]);
  assertOrdered("identity expression sources", source.visualGrammar, [
    "本命星宿\n",
    "+ 四象结果\n",
    "+ LifeArchetypeProfile\n",
    "PersonalStarBeastIdentity\n",
    "Identity Expression Rules\n",
  ]);

  [
    "本命星宿提供什么？",
    "四象提供什么？",
    "MotherCode 提供什么？",
    "Crystal 提供什么？",
  ].forEach((question) =>
    assertIncludes("future asset source question", source.visualGrammar, question),
  );

  [
    "FOUR_SYMBOL_VISUAL_EXPERIMENT",
    "PERSONAL_STAR_BEAST_SOURCE_VALIDATION",
    "不能直接作为正式 Renderer",
  ].forEach((marker) =>
    assertIncludes("prototype governance remains frozen", source.experimentStatus, marker),
  );

  const rendererSources = [
    ["visual state mapping", source.visualStateMapping],
    ["render plan adapter", source.renderPlanAdapter],
    ["renderer prototype adapter", source.rendererPrototypeAdapter],
    ["genesis renderer prototype", source.genesisRendererPrototype],
    ["genesis prototype canvas", source.genesisPrototypeCanvas],
  ];
  const forbiddenIdentityCalculations = [
    "guanyaoStarbeastEngineService",
    "guanyaoLunarMotherCodeLandingAdapter",
    "guanyaoCausalEngineService",
    "resolveStarbeastFromBirthDate(",
    "runMotherCodeLandingEngine(",
    "resolveLifeArchetypeProfileFromMotherCode(",
    "resolvePersonalStarBeastManifestationReadiness(",
    "localStorage",
    "sessionStorage",
  ];
  for (const [name, rendererSource] of rendererSources) {
    forbiddenIdentityCalculations.forEach((marker) =>
      assertExcludes(`${name} does not calculate identity`, rendererSource, marker),
    );
  }

  assertIncludes(
    "visual grammar gate registered",
    packageJson.scripts?.["check-visual-manifestation-grammar"] ?? "",
    "node scripts/check-visual-manifestation-grammar.mjs",
  );
  assertIncludes(
    "release includes visual grammar gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-visual-manifestation-grammar",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Visual Manifestation Grammar gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Visual Manifestation Grammar gate passed.");
