import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoHexagramAssetMappingCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-hexagram-asset-mapping-candidate-${process.pid}.mjs`);
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
const forbiddenReasonWords = ["大吉", "大凶", "不利", "凶险", "失败", "未完成", "能量不足", "任务完成", "通过考验"];

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveHexagramAssetMappingCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready draft stays mapping-not-ready",
      input: {
        status: "DRAFT",
        sourceCandidateStatus: "PENDING",
        readiness: "NOT_READY",
        primaryDimension: "body",
        possibleHexagramCluster: "BODY_STABILIZATION_CLUSTER",
        draftReason: "这一轮光还在回流途中。",
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        mappingTheme: "BODY_STABILITY_MAPPING",
      },
    },
    {
      name: "ready body draft maps to body stability",
      input: {
        status: "DRAFT",
        sourceCandidateStatus: "PENDING",
        readiness: "READY_FOR_ASSET_MAPPING",
        primaryDimension: "body",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        possibleHexagramCluster: "BODY_STABILIZATION_CLUSTER",
        draftReason: "这一轮光已经完成回流。",
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_LANGUAGE_TRANSLATION",
        mappingTheme: "BODY_STABILITY_MAPPING",
      },
    },
    {
      name: "ready emotion draft maps to emotional resonance",
      input: {
        status: "DRAFT",
        sourceCandidateStatus: "PENDING",
        readiness: "READY_FOR_ASSET_MAPPING",
        primaryDimension: "emotion",
        pressureSeedId: "seed-emotion-001",
        pressureSeedText: "你被不安接管了。",
        possibleHexagramCluster: "EMOTIONAL_RESONANCE_CLUSTER",
        draftReason: "这一轮光已经完成回流。",
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_LANGUAGE_TRANSLATION",
        mappingTheme: "EMOTIONAL_RESONANCE_MAPPING",
      },
    },
    {
      name: "ready motivation draft maps to motivation reorientation",
      input: {
        status: "DRAFT",
        sourceCandidateStatus: "PENDING",
        readiness: "READY_FOR_ASSET_MAPPING",
        primaryDimension: "motivation",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        possibleHexagramCluster: "MOTIVATION_REORIENTATION_CLUSTER",
        draftReason: "这一轮光已经完成回流。",
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_LANGUAGE_TRANSLATION",
        mappingTheme: "MOTIVATION_REORIENTATION_MAPPING",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveHexagramAssetMappingCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.mappingReason.includes(word));
    const passed =
      actual.status === "MAPPING" &&
      actual.sourceDraftStatus === "DRAFT" &&
      actual.readiness === fixture.expected.readiness &&
      actual.mappingTheme === fixture.expected.mappingTheme &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.possibleHexagramCluster === fixture.input.possibleHexagramCluster &&
      actual.forceTranslationRequired === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.mappingTheme} | actual=${row.actual.readiness}/${row.actual.mappingTheme}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[HEXAGRAM ASSET MAPPING CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[HEXAGRAM ASSET MAPPING CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
