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

const expectedRelationSeeds = Object.freeze([
  Object.freeze({ id: "ESTABLISHING_RELATION_01", pressureNature: "ATTACHMENT", surface: "你们躺在一张床上，中间隔着一道墙。", shell: "你们没吵架，也没话说了。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_02", pressureNature: "ATTACHMENT", surface: "你们约好的单独出行又取消了，原因仍是“最近太忙”。", shell: "共同时间一次次被推后。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_03", pressureNature: "ATTACHMENT", surface: "对方答应的事又忘了。你提醒后，收到的回复是“别计较”。", shell: "约定没有被重新确认。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_04", pressureNature: "ATTACHMENT", surface: "你说了今天的委屈，他只回了一个“嗯”。", shell: "你后面的话全咽回去了。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_05", pressureNature: "ATTACHMENT", surface: "你提出见面，对方只回复“最近太忙”，没有再约时间。", shell: "见面的日期没有落下。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_06", pressureNature: "ATTACHMENT", surface: "你发出一段很长的消息，对方隔天只回复了一个表情。", shell: "回应到了，内容没有被接住。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_07", pressureNature: "ATTACHMENT", surface: "你在对方手机里看到一个陌生名字，聊天停在深夜。", shell: "信息出现了，关系没有说明。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_08", pressureNature: "ATTACHMENT", surface: "你生病时告诉对方，对话停在一句“多喝热水”。", shell: "照顾停在了消息里。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_09", pressureNature: "ATTACHMENT", surface: "你问“我们怎么了”，得到的回复是“你想多了”。", shell: "问题被退回，没有被讨论。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_10", pressureNature: "ATTACHMENT", surface: "你等他先开口，他等你先开口。你们都等。", shell: "你们把关系，等成了陌生人。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_11", pressureNature: "ATTACHMENT", surface: "你说“我今天真的很累”，对方只回复“早点睡”。", shell: "疲惫被听见，处境没有被问。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_12", pressureNature: "ATTACHMENT", surface: "你们有孩子后，再也没有二人世界。", shell: "你们成了孩子爸妈，不是夫妻。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_13", pressureNature: "ATTACHMENT", surface: "你想商量换工作的决定，对方只说“你决定就好”。", shell: "决定回到你手里，讨论没有开始。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_14", pressureNature: "ATTACHMENT", surface: "你问“你还爱我吗”，对方回答“都老夫老妻了”。", shell: "问题被带过，回应没有落下。" }),
  Object.freeze({ id: "ESTABLISHING_RELATION_15", pressureNature: "ATTACHMENT", surface: "对方的手机换了密码，你问起时只得到“没什么”。", shell: "边界改变了，原因没有说明。" }),
]);

const obsoleteRelationCopy = [
  "你们都假装不需要。",
  "你收起了在乎。",
  "你知道他不是忙。",
  "你被降级了，还没收到通知。",
  "你不看，就不用面对。",
  "你病了，他不在。",
  "你开始怀疑是不是自己太敏感。",
  "你在喊救命，他以为是晚安。",
  "你的压力，他不想接。",
  "你的问题，被当成了矫情。",
  "你怕知道答案。",
];

const stripChinesePunctuation = (value) =>
  value.replace(/[，。！？；：“”‘’（）《》、·…—\s]/g, "");

try {
  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "calibration gate is registered",
    packageJson.scripts?.[
      "check-establishing-pressure-seed-relation-calibration"
    ] ?? "",
    "node scripts/check-establishing-pressure-seed-relation-calibration.mjs",
  );

  for (const marker of obsoleteRelationCopy) {
    assertExcludes("obsolete RELATION inference is absent", source.matrix, marker);
  }
  assertExcludes(
    "candidate source remains independent from copy calibration",
    source.candidateSource,
    "check-establishing-pressure-seed-relation-calibration",
  );
  assertExcludes(
    "scene binding algorithm is not changed by copy calibration",
    source.sceneBinding,
    "ESTABLISHING_RELATION_01",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-establishing-relation-calibration-"),
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
  const relationNode = matrix.find(
    (node) =>
      node.ageGroup === "ESTABLISHING" && node.pressureField === "RELATION",
  );
  assertEqual("RELATION node exists", Boolean(relationNode), true);
  assertEqual("RELATION node remains locked", relationNode.status, "locked");
  assertEqual("RELATION retains fifteen slots", relationNode.seeds.length, 15);
  assertEqual(
    "RELATION IDs remain stable",
    relationNode.seeds.map((seed) => seed.id).join(","),
    expectedRelationSeeds.map((seed) => seed.id).join(","),
  );
  assertEqual(
    "RELATION calibrated copy matches frozen review",
    JSON.stringify(relationNode.seeds),
    JSON.stringify(expectedRelationSeeds),
  );
  assertEqual(
    "RELATION Nature stays ATTACHMENT",
    relationNode.seeds.every((seed) => seed.pressureNature === "ATTACHMENT"),
    true,
  );
  assertEqual(
    "RELATION surfaces remain distinct",
    new Set(relationNode.seeds.map((seed) => seed.surface)).size,
    15,
  );

  for (const seed of relationNode.seeds) {
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

  console.log("\n[ESTABLISHING PRESSURE SEED RELATION CALIBRATION] PASS");
} catch (error) {
  console.error("[ESTABLISHING PRESSURE SEED RELATION CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
