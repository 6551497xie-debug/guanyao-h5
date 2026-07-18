import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  matrix: "src/data/guanyaoPressureSeedMatrix.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
  sceneBinding: "src/services/guanyaoPressureSeedSceneBindingService.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};

const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

const expectedFamilySeeds = Object.freeze([
  Object.freeze({ id: "ESTABLISHING_FAMILY_01", pressureNature: "OBLIGATION", surface: "工资到账，房贷、车贷、孩子学费一扣，没了。", shell: "你挣的钱，不是你的。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_02", pressureNature: "OBLIGATION", surface: "你说今天很累，家人的回复是“大家都累”。", shell: "疲惫被比较，安排没有减少。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_03", pressureNature: "OBLIGATION", surface: "你加班回家，家人问：“这周你还会一起吃饭吗？”", shell: "工作占满了原本留给家的时间。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_04", pressureNature: "OBLIGATION", surface: "你生病躺下后，家人先问：“明天的事情谁来处理？”", shell: "身体停下了，责任还在排队。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_05", pressureNature: "CONTROL", surface: "你提出换工作，家人只问：“稳定怎么办？”", shell: "新的方向停在了安全标准前。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_06", pressureNature: "OBLIGATION", surface: "你给家里买了东西，收到的第一句是“怎么又花钱”。", shell: "心意出现了，支出先被看见。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_07", pressureNature: "OBLIGATION", surface: "你提出周末休息，家人列出了还没完成的家事。", shell: "休息进入了责任清单之后。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_08", pressureNature: "OBLIGATION", surface: "孩子的老师发来成绩提醒，家人问：“最近是谁在辅导？”", shell: "问题出现后，责任开始寻找归属。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_09", pressureNature: "OBLIGATION", surface: "家里临时需要一笔钱，所有人都等你先开口安排。", shell: "需求到了，分担方式还没出现。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_10", pressureNature: "EVALUATION", surface: "家庭聚会中，有人当面问：“你现在这份工作有前途吗？”", shell: "你的选择被放上了公开评价桌。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_11", pressureNature: "OBLIGATION", surface: "你提出请人分担家务，家人问：“家里的事还要外人做吗？”", shell: "分担没有开始，解释先开始了。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_12", pressureNature: "OBLIGATION", surface: "你想给自己买一件贵的东西，家人提醒还有长期支出。", shell: "个人需要排在了家庭预算之后。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_13", pressureNature: "OBLIGATION", surface: "家里的账单同时到期，大家把付款提醒都转给了你。", shell: "支出被集中，分担没有说清。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_14", pressureNature: "SURVIVAL", surface: "你生病了不敢休假，怕扣钱。", shell: "你的健康，被放在了最后。" }),
  Object.freeze({ id: "ESTABLISHING_FAMILY_15", pressureNature: "CONTROL", surface: "你提出想独处一会儿，家人追问：“是不是家里哪里不好？”", shell: "个人空间被带回了关系判断。" }),
]);

const obsoleteFamilyCopy = [
  "你父母病了，你两头跑，没人帮你。",
  "你岳母说“你这女婿不行”。你听见了。",
  "你的尊严，被当众扒了。",
  "你的欲望，被压下去了。",
  "你的痛苦，被比较掉了。",
  "你的空间，被当成了背叛。",
];

const stripChinesePunctuation = (value) =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

try {
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "calibration gate is registered",
    packageJson.scripts?.[
      "check-establishing-pressure-seed-family-calibration"
    ] ?? "",
    "node scripts/check-establishing-pressure-seed-family-calibration.mjs",
  );

  for (const marker of obsoleteFamilyCopy) {
    assertExcludes("obsolete FAMILY copy is absent", source.matrix, marker);
  }
  assertExcludes(
    "candidate source remains independent from copy calibration",
    source.candidateSource,
    "check-establishing-pressure-seed-family-calibration",
  );
  assertExcludes(
    "scene binding algorithm is not changed by copy calibration",
    source.sceneBinding,
    "ESTABLISHING_FAMILY_01",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-establishing-family-calibration-"),
  );
  const outPath = path.join(tempDir, "matrix.mjs");
  await build({
    entryPoints: [path.join(rootDir, paths.matrix)],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const matrix = runtime.GUANYAO_PRESSURE_SEED_MATRIX_V2;
  const familyNode = matrix.find(
    (node) =>
      node.ageGroup === "ESTABLISHING" && node.pressureField === "FAMILY",
  );
  assertEqual("FAMILY node exists", Boolean(familyNode), true);
  assertEqual("FAMILY node remains locked", familyNode.status, "locked");
  assertEqual("FAMILY retains fifteen slots", familyNode.seeds.length, 15);
  assertEqual(
    "FAMILY IDs remain stable",
    familyNode.seeds.map((seed) => seed.id).join(","),
    expectedFamilySeeds.map((seed) => seed.id).join(","),
  );
  assertEqual(
    "FAMILY calibrated copy matches frozen review",
    JSON.stringify(familyNode.seeds),
    JSON.stringify(expectedFamilySeeds),
  );

  const natureCoverage = familyNode.seeds.reduce((coverage, seed) => {
    coverage[seed.pressureNature] = (coverage[seed.pressureNature] ?? 0) + 1;
    return coverage;
  }, {});
  assertEqual("OBLIGATION distribution stays fixed", natureCoverage.OBLIGATION, 11);
  assertEqual("CONTROL distribution stays fixed", natureCoverage.CONTROL, 2);
  assertEqual("EVALUATION distribution stays fixed", natureCoverage.EVALUATION, 1);
  assertEqual("SURVIVAL distribution stays fixed", natureCoverage.SURVIVAL, 1);
  assertEqual(
    "fixed gender and in-law assumptions are absent",
    ["她", "岳母", "女婿"].some((marker) =>
      JSON.stringify(familyNode.seeds).includes(marker),
    ),
    false,
  );
  assertEqual(
    "FAMILY surfaces remain distinct",
    new Set(familyNode.seeds.map((seed) => seed.surface)).size,
    15,
  );

  for (const seed of familyNode.seeds) {
    assertEqual(
      `${seed.id} surface stays within protocol`,
      stripChinesePunctuation(seed.surface).length <= 30,
      true,
    );
    assertEqual(
      `${seed.id} shell stays within protocol`,
      stripChinesePunctuation(seed.shell).length <= 20,
      true,
    );
  }

  const totalSeedCount = matrix.reduce(
    (total, node) => total + node.seeds.length,
    0,
  );
  assertEqual("Matrix keeps six nodes", matrix.length, 6);
  assertEqual("Matrix keeps ninety seeds", totalSeedCount, 90);
  assertEqual("Matrix audit remains green", runtime.auditGuanyaoPressureSeedMatrixV2().ok, true);

  console.log("\n[ESTABLISHING PRESSURE SEED FAMILY CALIBRATION] PASS");
} catch (error) {
  console.error("[ESTABLISHING PRESSURE SEED FAMILY CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
