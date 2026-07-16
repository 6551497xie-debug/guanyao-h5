import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  productConstitution: "docs/GUANYAO_PRODUCT_ENGINEERING_CONSTITUTION.md",
  engineeringLayerBoundary: "docs/GUANYAO_ENGINEERING_LAYER_BOUNDARY.md",
  lifeConstitution: "docs/GUANYAO_LIFE_SYSTEM_CONSTITUTION.md",
  p89TrajectoryType: "src/types/starMansionLifeTrajectory.ts",
  p89TrajectoryProtocol:
    "docs/GUANYAO_STAR_MANSION_LIFE_TRAJECTORY_SOURCE_FREEZE_PROTOCOL.md",
  lifeSchema: "src/types/originalSelfLifeSchema.ts",
  lifeArchetypeBridge: "src/services/motherCodeLifeArchetypeSource.ts",
  starbeastEngine: "src/services/guanyaoStarbeastEngineService.ts",
  motherCodeEngine: "src/services/guanyaoLunarMotherCodeLandingAdapter.ts",
  causalEngine: "src/services/guanyaoCausalEngineService.ts",
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
    "P0 freezes LIFE SYSTEM layer",
    source.engineeringLayerBoundary,
    "LIFE SYSTEM",
  );
  assertIncludes(
    "P0 forbids visual identity creation",
    source.productConstitution,
    "禁止视觉创造身份",
  );

  const highestLifeChain = [
    "宇宙秩序",
    "生命降临坐标",
    "二十八宿",
    "本命星宿",
    "四象",
    "MotherCode",
    "LifeArchetype",
    "PersonalStarBeastIdentity",
    "Reality Pressure",
    "Gravity 六维体验",
    "Choice 人格迁移",
    "Crystal",
    "Archive",
  ];
  assertOrdered(
    "highest life semantic chain remains complete",
    source.lifeConstitution,
    highestLifeChain,
  );

  [
    "GUANYAO Life System Constitution V1.0",
    "LIFE SYSTEM",
    "生命体验最高语义链",
    "不得压缩",
    "Gravity 与 Choice 不是过渡文案",
    "职责：提供生命进入宇宙时空的定位",
    "职责：生命星辰来源",
    "职责：个人生命种子",
    "职责：生命形态场",
    "职责：生命原力来源",
    "职责：MotherCode 语义桥接",
    "职责：三源汇合后的身份引用",
    "四象不等同动物模型",
    "不得反推 MotherCode",
    "MotherCode 不生成兽形",
    "不是 Renderer Input",
    "Reality Pressure",
    "Gravity 六维体验",
    "Choice 人格迁移",
    "Crystal",
    "Archive",
    "四象直接生成个人星兽",
    "Pressure Seed 修改生命本源",
    "所有新增生命模块五问",
    "EXPERIMENT",
    "CANDIDATE",
    "PRODUCTION",
    "Engine 不得读取视觉偏好",
  ].forEach((marker) =>
    assertIncludes("life system constitution", source.lifeConstitution, marker),
  );

  assertOrdered(
    "P89 keeps reality change process",
    source.p89TrajectoryType,
    [
      '"REALITY_PRESSURE"',
      '"GRAVITY_SIX_SPACE_EXPERIENCE"',
      '"CHOICE_PERSONA_MIGRATION"',
      '"CRYSTAL_IMPRINT"',
    ],
  );
  assertOrdered(
    "P89 protocol keeps Gravity and Choice",
    source.p89TrajectoryProtocol,
    [
      "→ REALITY_PRESSURE",
      "→ GRAVITY_SIX_SPACE_EXPERIENCE",
      "→ CHOICE_PERSONA_MIGRATION",
      "→ CRYSTAL_IMPRINT",
    ],
  );
  assertIncludes(
    "life journey schema retains archive",
    source.lifeSchema,
    '| "ARCHIVE"',
  );

  [
    "export function resolveLifeArchetypeProfileFromMotherCode",
    'source: "mother_code_profile"',
    "sourceMotherCodeId: motherCodeProfile.motherCodeId",
    'semanticRole: "ORIGINAL_LIFE_FORCE"',
    "notHexagram: true",
    "notPersonalityLabel: true",
  ].forEach((marker) =>
    assertIncludes("formal LifeArchetype bridge remains", source.lifeArchetypeBridge, marker),
  );

  const upstreamSources = [
    ["starbeast engine", source.starbeastEngine],
    ["mother code engine", source.motherCodeEngine],
    ["causal engine", source.causalEngine],
    ["LifeArchetype bridge", source.lifeArchetypeBridge],
  ];
  const forbiddenDownstreamDependencies = [
    "starBeastVisualStateMapping",
    "starBeastRenderPlanAdapter",
    "starBeastRendererPrototypeAdapter",
    "starBeastGenesisRendererPrototype",
    "starBeastAssetArchitectureMapping",
    "StarBeastGenesisPreview",
    "StarBeastGenesisRendererSlicePreview",
    "GravityPage",
    "CanvasRenderingContext",
    "getContext(",
  ];
  for (const [name, upstreamSource] of upstreamSources) {
    forbiddenDownstreamDependencies.forEach((marker) =>
      assertExcludes(`${name} has no downstream definition`, upstreamSource, marker),
    );
  }

  assertIncludes(
    "life constitution gate registered",
    packageJson.scripts?.["check:life-system-constitution"] ?? "",
    "node scripts/check-life-system-constitution.mjs",
  );
  assertIncludes(
    "release retains P0 constitution gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:product-engineering-constitution",
  );
  assertIncludes(
    "release includes P1 constitution gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:life-system-constitution",
  );
}

if (failures.length > 0) {
  console.error("\nGUANYAO Life System Constitution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGUANYAO Life System Constitution gate passed.");
