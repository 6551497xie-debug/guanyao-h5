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

const expectedPowerSeeds = Object.freeze([
  Object.freeze({ id: "ESTABLISHING_POWER_01", pressureNature: "EVALUATION", surface: "试用期快结束了，主管仍没有告诉你转正标准。", shell: "评价悬着，下一步也悬着。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_02", pressureNature: "EVALUATION", surface: "同批入职的人先升了一级，你没有收到任何说明。", shell: "差距出现了，标准没有出现。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_03", pressureNature: "EVALUATION", surface: "新人接手了你负责的一部分。交接会没有说明原因。", shell: "职责边界正在改变。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_04", pressureNature: "CONTROL", surface: "你休了几天假，回来流程改了。没人通知你。", shell: "你不在的时候，他们替你做了决定。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_05", pressureNature: "BELONGING", surface: "你开始带项目后，重要会议仍只通知你的上级。", shell: "责任到了，位置还没到。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_06", pressureNature: "EVALUATION", surface: "你第一次独立汇报，主管把问题都转向了旁边的资深同事。", shell: "你的判断还没有被单独接住。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_07", pressureNature: "EVALUATION", surface: "你提了一个建议，他说“我们以前试过，不行”。", shell: "你的想法，还没开始就被否了。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_08", pressureNature: "RESOURCE", surface: "你完成了主要工作，项目署名里没有你的名字。", shell: "贡献留下了，位置没有留下。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_09", pressureNature: "CONTROL", surface: "他说“公司要优化结构”，你收到了邮件。", shell: "结构变化先于通知到来。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_10", pressureNature: "EVALUATION", surface: "面试结束后，对方说你的经验与岗位级别不匹配。", shell: "岗位标准没有给出明确位置。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_11", pressureNature: "RESOURCE", surface: "你问晋升标准，他说“这个级别暂时没有名额”。", shell: "你再努力，也没有位置。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_12", pressureNature: "EVALUATION", surface: "你加班完成方案，第二天收到的反馈只有“注意效率”。", shell: "投入没有换来清晰评价。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_13", pressureNature: "EVALUATION", surface: "你的方案被否了，用了别人的。三个月后又用回了你的。", shell: "你的价值，被反复否定又捡起来。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_14", pressureNature: "CONTROL", surface: "你接下团队协调工作，排期和人选仍由别人决定。", shell: "责任增加了，决定权没有增加。" }),
  Object.freeze({ id: "ESTABLISHING_POWER_15", pressureNature: "CONTROL", surface: "你提出转岗，回复是“现在的岗位更需要你”。", shell: "你的选择暂时没有进入安排。" }),
]);

const obsoletePowerCopy = [
  "你在这个行业十年了，抬头还是经理。",
  "公司来了个比你小十岁的总监。",
  "你升职后，以前一起吃饭的人不再叫你。",
  "他说“你经验丰富，但这个方向我们想用年轻人”。",
  "你的下属被越级提拔，成了你的平级。",
  "你带团队十年，公司空降了一个领导管你。",
];

const stripChinesePunctuation = (value) =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

try {
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "calibration gate is registered",
    packageJson.scripts?.[
      "check-establishing-pressure-seed-power-calibration"
    ] ?? "",
    "node scripts/check-establishing-pressure-seed-power-calibration.mjs",
  );

  for (const marker of obsoletePowerCopy) {
    assertExcludes("moved or removed POWER copy is absent", source.matrix, marker);
  }
  assertIncludes(
    "SOCIAL ownership of the former duplicate remains",
    source.matrix,
    '{ id: "ESTABLISHING_SOCIAL_01", pressureNature: "BELONGING", surface: "你升职后，以前一起吃饭的人不叫你了。"',
  );
  assertExcludes(
    "candidate source remains independent from copy calibration",
    source.candidateSource,
    "check-establishing-pressure-seed-power-calibration",
  );
  assertExcludes(
    "scene binding algorithm is not changed by copy calibration",
    source.sceneBinding,
    "ESTABLISHING_POWER_01",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-establishing-power-calibration-"),
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
  const powerNode = matrix.find(
    (node) =>
      node.ageGroup === "ESTABLISHING" && node.pressureField === "POWER",
  );
  assertEqual("POWER node exists", Boolean(powerNode), true);
  assertEqual("POWER node remains locked", powerNode.status, "locked");
  assertEqual("POWER retains fifteen slots", powerNode.seeds.length, 15);
  assertEqual(
    "POWER IDs remain stable",
    powerNode.seeds.map((seed) => seed.id).join(","),
    expectedPowerSeeds.map((seed) => seed.id).join(","),
  );
  assertEqual(
    "POWER calibrated copy matches frozen review",
    JSON.stringify(powerNode.seeds),
    JSON.stringify(expectedPowerSeeds),
  );

  const natureCoverage = powerNode.seeds.reduce((coverage, seed) => {
    coverage[seed.pressureNature] = (coverage[seed.pressureNature] ?? 0) + 1;
    return coverage;
  }, {});
  assertEqual("EVALUATION distribution stays fixed", natureCoverage.EVALUATION, 8);
  assertEqual("CONTROL distribution stays fixed", natureCoverage.CONTROL, 4);
  assertEqual("RESOURCE distribution stays fixed", natureCoverage.RESOURCE, 2);
  assertEqual("BELONGING distribution stays fixed", natureCoverage.BELONGING, 1);

  for (const seed of powerNode.seeds) {
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

  console.log("\n[ESTABLISHING PRESSURE SEED POWER CALIBRATION] PASS");
} catch (error) {
  console.error("[ESTABLISHING PRESSURE SEED POWER CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
