import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoForceTranslationCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-force-translation-candidate-${process.pid}.mjs`);
const forbiddenFields = [
  "hexagramCode",
  "hexagramName",
  "cardName",
  "price",
  "paywall",
  "unlock",
  "collection",
  "archiveRoute",
  "legacyRoute",
];
const forbiddenReasonWords = ["大吉", "大凶", "不利", "凶险", "成功打卡", "任务完成", "通过考验", "失败", "未完成", "能量不足", "命中注定"];

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveForceTranslationCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready mapping stays force-translation-not-ready",
      input: {
        status: "MAPPING",
        sourceDraftStatus: "DRAFT",
        readiness: "NOT_READY",
        primaryDimension: "body",
        possibleHexagramCluster: "BODY_STABILIZATION_CLUSTER",
        mappingTheme: "BODY_STABILITY_MAPPING",
        mappingReason: "这枚资产草稿还在安静等待回流完成。",
        forceTranslationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
      },
    },
    {
      name: "ready body mapping translates to body force",
      input: {
        status: "MAPPING",
        sourceDraftStatus: "DRAFT",
        readiness: "READY_FOR_LANGUAGE_TRANSLATION",
        primaryDimension: "body",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        possibleHexagramCluster: "BODY_STABILIZATION_CLUSTER",
        mappingTheme: "BODY_STABILITY_MAPPING",
        mappingReason: "这枚资产草稿已经进入映射层。",
        forceTranslationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_SHELL",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
      },
    },
    {
      name: "ready thought mapping translates to seeing force",
      input: {
        status: "MAPPING",
        sourceDraftStatus: "DRAFT",
        readiness: "READY_FOR_LANGUAGE_TRANSLATION",
        primaryDimension: "thought",
        pressureSeedId: "seed-thought-001",
        pressureSeedText: "你一直解释，脑海停不下来。",
        possibleHexagramCluster: "THOUGHT_REFRAME_CLUSTER",
        mappingTheme: "THOUGHT_REFRAME_MAPPING",
        mappingReason: "这枚资产草稿已经进入映射层。",
        forceTranslationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_SHELL",
        forceTheme: "认知换轨",
        forcePhrase: "看见原力",
      },
    },
    {
      name: "ready motivation mapping translates to direction force",
      input: {
        status: "MAPPING",
        sourceDraftStatus: "DRAFT",
        readiness: "READY_FOR_LANGUAGE_TRANSLATION",
        primaryDimension: "motivation",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        possibleHexagramCluster: "MOTIVATION_REORIENTATION_CLUSTER",
        mappingTheme: "MOTIVATION_REORIENTATION_MAPPING",
        mappingReason: "这枚资产草稿已经进入映射层。",
        forceTranslationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_SHELL",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveForceTranslationCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.translatedReason.includes(word));
    const passed =
      actual.status === "FORCE_TRANSLATION" &&
      actual.sourceMappingStatus === "MAPPING" &&
      actual.readiness === fixture.expected.readiness &&
      actual.forceTheme === fixture.expected.forceTheme &&
      actual.forcePhrase === fixture.expected.forcePhrase &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.mappingTheme === fixture.input.mappingTheme &&
      actual.assetShellRequired === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.forceTheme}/${row.expected.forcePhrase} | actual=${row.actual.readiness}/${row.actual.forceTheme}/${row.actual.forcePhrase}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[FORCE TRANSLATION CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[FORCE TRANSLATION CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
