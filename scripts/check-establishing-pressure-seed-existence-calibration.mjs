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

const expectedExistenceSeeds = Object.freeze([
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_01", pressureNature: "EVALUATION", surface: "生日那晚，你把毕业后定下的计划重新列了一遍。", shell: "计划还在，进度没有对齐。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_02", pressureNature: "EVALUATION", surface: "你刷朋友圈，别人的生活都在往前。", shell: "比较压力让状态停住。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_03", pressureNature: "SURVIVAL", surface: "连续几周早起后，你在通勤路上又睡过了站。", shell: "日程没有停，身体先慢了下来。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_04", pressureNature: "EVALUATION", surface: "你翻到三年前写下的目标，完成的一栏仍然空着。", shell: "时间过去了，记录没有跟上。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_05", pressureNature: "CONTROL", surface: "你突然不知道下一步要选什么。", shell: "外部目标盖住了方向。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_06", pressureNature: "EVALUATION", surface: "阶段目标达成了，状态却没有松开。", shell: "新的压力接着出现。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_07", pressureNature: "CONTROL", surface: "你问下一步要往哪走，没有答案。", shell: "忙碌暂时替代了方向。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_08", pressureNature: "OBLIGATION", surface: "你每天早上醒来，不知道今天为什么要上班。", shell: "日程变成了压力任务。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_09", pressureNature: "EVALUATION", surface: "你照镜子时，发现最近的状态和证件照差了很多。", shell: "状态发生了变化，原因还没有说清。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_10", pressureNature: "EVALUATION", surface: "你问自己“现在好吗”，答不上来。", shell: "状态反馈暂时中断。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_11", pressureNature: "CONTROL", surface: "你把每天排得很满，空下来的半小时却不知道做什么。", shell: "日程很满，方向仍然空着。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_12", pressureNature: "CONTROL", surface: "你突然想辞职，但不知道下一步去哪。", shell: "出口还没有形成。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_13", pressureNature: "EVALUATION", surface: "你开始评估这一路的投入和回报。", shell: "结果压力压住判断。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_14", pressureNature: "OBLIGATION", surface: "工作、租房和家里的临时事情排在了同一周。", shell: "多条责任同时占住了日程。" }),
  Object.freeze({ id: "ESTABLISHING_EXISTENCE_15", pressureNature: "CONTROL", surface: "你问自己“还能调整吗”，沉默了。", shell: "可选路径暂时收窄。" }),
]);

const obsoleteExistenceCopy = [
  "四十岁生日那晚，你列了一下当前进度。",
  "你不服老，身体先认了。",
  "你复盘这十年的进度，想了很久。",
  "当前状态变得陌生。",
  "停下来会暴露空档。",
  "父母老了，孩子大了，你的日程被挤满。",
];

const stripChinesePunctuation = (value) =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

try {
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "calibration gate is registered",
    packageJson.scripts?.[
      "check-establishing-pressure-seed-existence-calibration"
    ] ?? "",
    "node scripts/check-establishing-pressure-seed-existence-calibration.mjs",
  );

  for (const marker of obsoleteExistenceCopy) {
    assertExcludes("obsolete EXISTENCE copy is absent", source.matrix, marker);
  }
  assertExcludes(
    "candidate source remains independent from copy calibration",
    source.candidateSource,
    "check-establishing-pressure-seed-existence-calibration",
  );
  assertExcludes(
    "scene binding algorithm is not changed by copy calibration",
    source.sceneBinding,
    "ESTABLISHING_EXISTENCE_01",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-establishing-existence-calibration-"),
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
  const existenceNode = matrix.find(
    (node) =>
      node.ageGroup === "ESTABLISHING" && node.pressureField === "EXISTENCE",
  );
  assertEqual("EXISTENCE node exists", Boolean(existenceNode), true);
  assertEqual("EXISTENCE node remains locked", existenceNode.status, "locked");
  assertEqual("EXISTENCE retains fifteen slots", existenceNode.seeds.length, 15);
  assertEqual(
    "EXISTENCE IDs remain stable",
    existenceNode.seeds.map((seed) => seed.id).join(","),
    expectedExistenceSeeds.map((seed) => seed.id).join(","),
  );
  assertEqual(
    "EXISTENCE calibrated copy matches frozen review",
    JSON.stringify(existenceNode.seeds),
    JSON.stringify(expectedExistenceSeeds),
  );

  const natureCoverage = existenceNode.seeds.reduce((coverage, seed) => {
    coverage[seed.pressureNature] = (coverage[seed.pressureNature] ?? 0) + 1;
    return coverage;
  }, {});
  assertEqual("EVALUATION distribution stays fixed", natureCoverage.EVALUATION, 7);
  assertEqual("CONTROL distribution stays fixed", natureCoverage.CONTROL, 5);
  assertEqual("OBLIGATION distribution stays fixed", natureCoverage.OBLIGATION, 2);
  assertEqual("SURVIVAL distribution stays fixed", natureCoverage.SURVIVAL, 1);
  assertEqual(
    "EXISTENCE surfaces remain distinct",
    new Set(existenceNode.seeds.map((seed) => seed.surface)).size,
    15,
  );

  for (const seed of existenceNode.seeds) {
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

  console.log("\n[ESTABLISHING PRESSURE SEED EXISTENCE CALIBRATION] PASS");
} catch (error) {
  console.error("[ESTABLISHING PRESSURE SEED EXISTENCE CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
