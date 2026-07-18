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

const expectedInterestSeeds = Object.freeze([
  Object.freeze({ id: "ESTABLISHING_INTEREST_01", pressureNature: "RESOURCE", surface: "分成比例改了，会议结束后你才看见新版本账目。", shell: "规则已经改变，说明没有跟上。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_02", pressureNature: "RESOURCE", surface: "客户是你拉的，他绕过你单独对接。", shell: "你种树，他摘果。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_03", pressureNature: "RESOURCE", surface: "项目已经回本，对方仍没有给出下一次分成日期。", shell: "收益产生了，分配仍在等待。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_04", pressureNature: "RESOURCE", surface: "你想退出，他说按合同你拿不到多少。", shell: "你签的每一页，都在替今天的你认亏。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_05", pressureNature: "RESOURCE", surface: "公司估值涨了，你的股份没变。", shell: "公司升值，你被留在原地。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_06", pressureNature: "RESOURCE", surface: "你投的钱已经用了两年，对方每次只回复“再等等”。", shell: "资金在项目里，期限没有落下。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_07", pressureNature: "RESOURCE", surface: "你提出加薪，对方说公司困难；当月新增了管理层福利。", shell: "成本被说明了，分配没有说明。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_08", pressureNature: "EVALUATION", surface: "对方主动联系你入职，最终报价比原岗位低了30%。", shell: "邀请到了，价值标准没有对齐。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_09", pressureNature: "RESOURCE", surface: "你帮公司赚了钱，他说“这是团队的努力”。", shell: "你的功劳，被归给了大家。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_10", pressureNature: "RESOURCE", surface: "你的项目成功了，奖金和别人一样。", shell: "你的努力，没有被区别对待。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_11", pressureNature: "RESOURCE", surface: "股权约定写进了邮件，几轮融资后仍没有正式协议。", shell: "承诺被记录，权益没有落定。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_12", pressureNature: "RESOURCE", surface: "公司被收购了，你的期权被稀释了。", shell: "你的股份，变成了一张纸。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_13", pressureNature: "RESOURCE", surface: "你垫了钱，公司报销拖了半年。", shell: "你的钱，被公司用了。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_14", pressureNature: "RESOURCE", surface: "你说按贡献分，他说“我们要看长期”。", shell: "你的付出，被当成了投资。" }),
  Object.freeze({ id: "ESTABLISHING_INTEREST_15", pressureNature: "RESOURCE", surface: "你的客户被公司划走了，没有补偿。", shell: "你的资源，被收走了。" }),
]);

const obsoleteInterestCopy = [
  "账目你没细看，分成被改了。",
  "项目赚钱了，他说先回本。你等了一轮又一轮。",
  "你的钱，他在用，你不敢问。",
  "你信了，他骗了。",
  "你被挖了，他说“我尽力了”。报价比对方低30%。",
  "你的期权，永远在账上。",
];

const stripChinesePunctuation = (value) =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

try {
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "calibration gate is registered",
    packageJson.scripts?.[
      "check-establishing-pressure-seed-interest-calibration"
    ] ?? "",
    "node scripts/check-establishing-pressure-seed-interest-calibration.mjs",
  );

  for (const marker of obsoleteInterestCopy) {
    assertExcludes("obsolete INTEREST copy is absent", source.matrix, marker);
  }
  assertExcludes(
    "candidate source remains independent from copy calibration",
    source.candidateSource,
    "check-establishing-pressure-seed-interest-calibration",
  );
  assertExcludes(
    "scene binding algorithm is not changed by copy calibration",
    source.sceneBinding,
    "ESTABLISHING_INTEREST_01",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-establishing-interest-calibration-"),
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
  const interestNode = matrix.find(
    (node) =>
      node.ageGroup === "ESTABLISHING" && node.pressureField === "INTEREST",
  );
  assertEqual("INTEREST node exists", Boolean(interestNode), true);
  assertEqual("INTEREST node remains locked", interestNode.status, "locked");
  assertEqual("INTEREST retains fifteen slots", interestNode.seeds.length, 15);
  assertEqual(
    "INTEREST IDs remain stable",
    interestNode.seeds.map((seed) => seed.id).join(","),
    expectedInterestSeeds.map((seed) => seed.id).join(","),
  );
  assertEqual(
    "INTEREST calibrated copy matches frozen review",
    JSON.stringify(interestNode.seeds),
    JSON.stringify(expectedInterestSeeds),
  );

  const natureCoverage = interestNode.seeds.reduce((coverage, seed) => {
    coverage[seed.pressureNature] = (coverage[seed.pressureNature] ?? 0) + 1;
    return coverage;
  }, {});
  assertEqual("RESOURCE distribution stays fixed", natureCoverage.RESOURCE, 14);
  assertEqual("EVALUATION distribution stays fixed", natureCoverage.EVALUATION, 1);

  for (const seed of interestNode.seeds) {
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

  console.log("\n[ESTABLISHING PRESSURE SEED INTEREST CALIBRATION] PASS");
} catch (error) {
  console.error("[ESTABLISHING PRESSURE SEED INTEREST CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
