import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoAssetShellCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-asset-shell-candidate-${process.pid}.mjs`);
const forbiddenFields = [
  "hexagramCode",
  "hexagramName",
  "cardName",
  "price",
  "paywall",
  "unlock",
  "collection",
  "route",
  "archiveRoute",
  "legacyRoute",
];
const forbiddenReasonWords = ["大吉", "大凶", "不利", "凶险", "成功打卡", "任务完成", "通过考验", "失败", "未完成", "能量不足", "购买", "已解锁"];

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveAssetShellCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready force translation stays shell-not-ready",
      input: {
        status: "FORCE_TRANSLATION",
        sourceMappingStatus: "MAPPING",
        readiness: "NOT_READY",
        primaryDimension: "body",
        mappingTheme: "BODY_STABILITY_MAPPING",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        translatedReason: "这局光还在靠近可读状态。",
        assetShellRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        shellTheme: "身体回流壳",
        shellToneIncludes: "稳定",
      },
    },
    {
      name: "ready body force enters body shell",
      input: {
        status: "FORCE_TRANSLATION",
        sourceMappingStatus: "MAPPING",
        readiness: "READY_FOR_ASSET_SHELL",
        primaryDimension: "body",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        mappingTheme: "BODY_STABILITY_MAPPING",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        translatedReason: "这局光已经形成一种可读的原力。",
        assetShellRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_CARD_BLUEPRINT",
        shellTheme: "身体回流壳",
        shellToneIncludes: "回流",
      },
    },
    {
      name: "ready behavior force enters action shell",
      input: {
        status: "FORCE_TRANSLATION",
        sourceMappingStatus: "MAPPING",
        readiness: "READY_FOR_ASSET_SHELL",
        primaryDimension: "behavior",
        pressureSeedId: "seed-behavior-001",
        pressureSeedText: "你明明知道要开始，却一直停在原地。",
        mappingTheme: "ACTION_ALIGNMENT_MAPPING",
        forceTheme: "行动校准",
        forcePhrase: "微动作原力",
        translatedReason: "这局光已经形成一种可读的原力。",
        assetShellRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_CARD_BLUEPRINT",
        shellTheme: "行动校准壳",
        shellToneIncludes: "微动作",
      },
    },
    {
      name: "ready motivation force enters direction shell",
      input: {
        status: "FORCE_TRANSLATION",
        sourceMappingStatus: "MAPPING",
        readiness: "READY_FOR_ASSET_SHELL",
        primaryDimension: "motivation",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        mappingTheme: "MOTIVATION_REORIENTATION_MAPPING",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
        translatedReason: "这局光已经形成一种可读的原力。",
        assetShellRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_CARD_BLUEPRINT",
        shellTheme: "方向重燃壳",
        shellToneIncludes: "方向",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveAssetShellCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.shellReason.includes(word));
    const passed =
      actual.status === "ASSET_SHELL" &&
      actual.sourceForceTranslationStatus === "FORCE_TRANSLATION" &&
      actual.readiness === fixture.expected.readiness &&
      actual.shellTheme === fixture.expected.shellTheme &&
      actual.shellTone.includes(fixture.expected.shellToneIncludes) &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.forceTheme === fixture.input.forceTheme &&
      actual.forcePhrase === fixture.input.forcePhrase &&
      actual.cardBlueprintRequired === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.shellTheme}/${row.expected.shellToneIncludes} | actual=${row.actual.readiness}/${row.actual.shellTheme}/${row.actual.shellTone}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[ASSET SHELL CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[ASSET SHELL CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
