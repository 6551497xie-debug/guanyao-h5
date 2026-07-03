import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoHexagramAssetDraftCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-hexagram-asset-draft-candidate-${process.pid}.mjs`);
const forbiddenFields = ["hexagramCode", "hexagramName", "cardName", "price", "paywall", "unlock"];
const forbiddenReasonWords = ["成功打卡", "任务完成", "失败", "未完成", "能量不足", "大吉", "大凶", "不利", "你通过了考验"];

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveHexagramAssetDraftCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "incomplete candidate remains draft-not-ready",
      input: {
        status: "PENDING",
        primaryDimension: "thought",
        completedNodeCount: 3,
        completionState: "INCOMPLETE",
        candidateReason: "这颗现实扰动正在被你轻轻看见。",
      },
      expected: {
        readiness: "NOT_READY",
        possibleHexagramCluster: "THOUGHT_REFRAME_CLUSTER",
      },
    },
    {
      name: "ready body candidate maps to body cluster",
      input: {
        status: "PENDING",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        primaryDimension: "body",
        completedNodeCount: 6,
        completionState: "READY_TO_CRYSTALLIZE",
        candidateReason: "这颗现实扰动已经被你送回一轮光。",
      },
      expected: {
        readiness: "READY_FOR_ASSET_MAPPING",
        possibleHexagramCluster: "BODY_STABILIZATION_CLUSTER",
      },
    },
    {
      name: "ready motivation candidate maps to motivation cluster",
      input: {
        status: "PENDING",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        primaryDimension: "motivation",
        completedNodeCount: 6,
        completionState: "READY_TO_CRYSTALLIZE",
        candidateReason: "这颗现实扰动已经被你送回一轮光。",
      },
      expected: {
        readiness: "READY_FOR_ASSET_MAPPING",
        possibleHexagramCluster: "MOTIVATION_REORIENTATION_CLUSTER",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveHexagramAssetDraftCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.draftReason.includes(word));
    const passed =
      actual.status === "DRAFT" &&
      actual.sourceCandidateStatus === "PENDING" &&
      actual.readiness === fixture.expected.readiness &&
      actual.possibleHexagramCluster === fixture.expected.possibleHexagramCluster &&
      actual.forbiddenLegacyRoute === true &&
      !hasForbiddenField &&
      !hasForbiddenReasonWord;

    return {
      name: fixture.name,
      expected: fixture.expected,
      actual,
      hasForbiddenField,
      hasForbiddenReasonWord,
      passed,
    };
  });

  rows.forEach((row) => {
    const mark = row.passed ? "PASS" : "FAIL";
    console.log(
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.possibleHexagramCluster} | actual=${row.actual.readiness}/${row.actual.possibleHexagramCluster}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[HEXAGRAM ASSET DRAFT CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[HEXAGRAM ASSET DRAFT CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
