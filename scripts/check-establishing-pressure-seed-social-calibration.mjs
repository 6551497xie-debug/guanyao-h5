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

const expectedSocialSeeds = Object.freeze([
  Object.freeze({ id: "ESTABLISHING_SOCIAL_01", pressureNature: "BELONGING", surface: "你升职后，以前一起吃饭的人不叫你了。", shell: "你站高了，也站远了。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_02", pressureNature: "BELONGING", surface: "你被分到新部门，老同事不联系你，新同事不理你。", shell: "你哪边都不是，两边都不要你。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_03", pressureNature: "BELONGING", surface: "你帮对方处理过几次事情，轮到你求助时收到“不方便”。", shell: "往来的分量没有落在同一边。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_04", pressureNature: "BELONGING", surface: "你走进休息区时，正在聊天的几个人停下了话题。", shell: "声音停了，关系没有说明。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_05", pressureNature: "BELONGING", surface: "你发了朋友圈，没人点赞。你删了。", shell: "外部回应牵动了状态。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_06", pressureNature: "BELONGING", surface: "聚会开始很久，身边的位置换了几轮，仍没人和你交谈。", shell: "你在场，连接没有发生。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_07", pressureNature: "BELONGING", surface: "你主动打招呼，对方看了很久才问：“我们见过吗？”", shell: "记忆没有对上，距离先出现了。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_08", pressureNature: "BELONGING", surface: "你说了一个想法，大家没反应。五分钟后别人说了同样的话，大家说“好主意”。", shell: "你的声音，被当成空气。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_09", pressureNature: "BELONGING", surface: "你约朋友吃饭，对方说最近忙；当天出现在另一场聚会照片里。", shell: "拒绝没有说透，距离已经出现。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_10", pressureNature: "BELONGING", surface: "你发了求助信息，没人回。", shell: "没人接住你。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_11", pressureNature: "BELONGING", surface: "你参加了同学会，发现已经融不进去了。", shell: "你坐在那里，像个外人。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_12", pressureNature: "BELONGING", surface: "你从同事转发的截图里，看见了一个没有你的新群。", shell: "信息继续流动，你不在其中。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_13", pressureNature: "BELONGING", surface: "项目停下来后，你发出的几条近况消息一直没有回复。", shell: "事情变了，原来的联系也停了。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_14", pressureNature: "BELONGING", surface: "你主动约人，被拒绝了三次。你不再约了。", shell: "你把主动，戒掉了。" }),
  Object.freeze({ id: "ESTABLISHING_SOCIAL_15", pressureNature: "BELONGING", surface: "你在群里说话，没人接。你不再说了。", shell: "你把自己，也禁言了。" }),
]);

const obsoleteSocialCopy = [
  "你怕知道真相，只能活在猜测里。",
  "你在人群里，比一个人还空。",
  "你被忘了，还不自知。",
  "他不是忙，是不想见你。",
  "你的老领导退休了，他的饭局不再叫你。",
  "你落魄了，关系就断了。",
];

const stripChinesePunctuation = (value) =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

try {
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "calibration gate is registered",
    packageJson.scripts?.[
      "check-establishing-pressure-seed-social-calibration"
    ] ?? "",
    "node scripts/check-establishing-pressure-seed-social-calibration.mjs",
  );

  for (const marker of obsoleteSocialCopy) {
    assertExcludes("obsolete SOCIAL copy is absent", source.matrix, marker);
  }
  assertExcludes(
    "candidate source remains independent from copy calibration",
    source.candidateSource,
    "check-establishing-pressure-seed-social-calibration",
  );
  assertExcludes(
    "scene binding algorithm is not changed by copy calibration",
    source.sceneBinding,
    "ESTABLISHING_SOCIAL_01",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-establishing-social-calibration-"),
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
  const socialNode = matrix.find(
    (node) =>
      node.ageGroup === "ESTABLISHING" && node.pressureField === "SOCIAL",
  );
  assertEqual("SOCIAL node exists", Boolean(socialNode), true);
  assertEqual("SOCIAL node remains locked", socialNode.status, "locked");
  assertEqual("SOCIAL retains fifteen slots", socialNode.seeds.length, 15);
  assertEqual(
    "SOCIAL IDs remain stable",
    socialNode.seeds.map((seed) => seed.id).join(","),
    expectedSocialSeeds.map((seed) => seed.id).join(","),
  );
  assertEqual(
    "SOCIAL calibrated copy matches frozen review",
    JSON.stringify(socialNode.seeds),
    JSON.stringify(expectedSocialSeeds),
  );
  assertEqual(
    "SOCIAL Nature stays BELONGING",
    socialNode.seeds.every((seed) => seed.pressureNature === "BELONGING"),
    true,
  );
  assertEqual(
    "SOCIAL surfaces remain distinct",
    new Set(socialNode.seeds.map((seed) => seed.surface)).size,
    15,
  );

  for (const seed of socialNode.seeds) {
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

  console.log("\n[ESTABLISHING PRESSURE SEED SOCIAL CALIBRATION] PASS");
} catch (error) {
  console.error("[ESTABLISHING PRESSURE SEED SOCIAL CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
