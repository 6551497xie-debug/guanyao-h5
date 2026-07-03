import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const serviceDir = path.join(rootDir, "src/services");
const sourceFiles = [
  "guanyaoPrimaryPetalResolver.ts",
  "guanyaoHexagramAssetCandidateResolver.ts",
];
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-hexagram-candidate-"));
const forbiddenReasonWords = ["失败", "未完成", "能量不足", "大凶", "不利", "你没有做到", "任务完成", "打卡成功"];

function transpileService(filename) {
  const sourcePath = path.join(serviceDir, filename);
  const source = fs.readFileSync(sourcePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });

  const output = transpiled.outputText.replace(
    /from "\.\/guanyaoPrimaryPetalResolver"/g,
    'from "./guanyaoPrimaryPetalResolver.js"',
  );
  fs.writeFileSync(path.join(tempDir, filename.replace(/\.ts$/, ".js")), output);
}

try {
  sourceFiles.forEach(transpileService);
  const { resolveHexagramAssetCandidate } = await import(
    `file://${path.join(tempDir, "guanyaoHexagramAssetCandidateResolver.js")}`
  );
  const fixtures = [
    {
      name: "incomplete / thought petal",
      input: {
        personaSnapshot: {
          motherCode: "兑",
          trigram: "兑为泽",
          direction: "白虎",
        },
        selectedPressureSeedContext: {
          selectedPressureSeedId: "seed-thought-001",
          surface: "你还没说完，脑子里已经开始组织下一句解释了。",
        },
        currentPrimarySpaceId: "thought",
        completedNodeCount: 3,
        starbeastFeedbackComplete: false,
      },
      expected: {
        status: "PENDING",
        completionState: "INCOMPLETE",
        primaryDimension: "thought",
      },
    },
    {
      name: "ready / behavior petal",
      input: {
        personaSnapshot: {
          motherCode: "兑",
          trigram: "兑为泽",
          direction: "白虎",
        },
        selectedPressureSeedContext: {
          selectedPressureSeedId: "seed-action-001",
          surface: "你脑子里想了无数遍，手还在原处。",
        },
        currentPrimarySpaceId: "action",
        completedNodeCount: 6,
        starbeastFeedbackComplete: true,
      },
      expected: {
        status: "PENDING",
        completionState: "READY_TO_CRYSTALLIZE",
        primaryDimension: "behavior",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveHexagramAssetCandidate(fixture.input);
    const hasFormalHexagramCode = Object.prototype.hasOwnProperty.call(actual, "hexagramCode");
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.candidateReason.includes(word));
    const passed =
      actual.status === fixture.expected.status &&
      actual.completionState === fixture.expected.completionState &&
      actual.primaryDimension === fixture.expected.primaryDimension &&
      !hasFormalHexagramCode &&
      !hasForbiddenReasonWord;

    return {
      name: fixture.name,
      expected: fixture.expected,
      actual,
      hasFormalHexagramCode,
      hasForbiddenReasonWord,
      passed,
    };
  });

  rows.forEach((row) => {
    const mark = row.passed ? "PASS" : "FAIL";
    console.log(
      `${mark} | ${row.name} | expected=${row.expected.completionState}/${row.expected.primaryDimension} | actual=${row.actual.completionState}/${row.actual.primaryDimension}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[HEXAGRAM ASSET CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[HEXAGRAM ASSET CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
