import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoCardBlueprintCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-card-blueprint-candidate-${process.pid}.mjs`);
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
  const { resolveCardBlueprintCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready shell stays blueprint-not-ready",
      input: {
        status: "ASSET_SHELL",
        sourceForceTranslationStatus: "FORCE_TRANSLATION",
        readiness: "NOT_READY",
        primaryDimension: "body",
        mappingTheme: "BODY_STABILITY_MAPPING",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        shellTone: "稳定 / 承载 / 回流",
        shellReason: "这局原力还在靠近卡壳条件。",
        cardBlueprintRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        sectionKey: "starbeastArea",
      },
    },
    {
      name: "ready body shell enters card blueprint",
      input: {
        status: "ASSET_SHELL",
        sourceForceTranslationStatus: "FORCE_TRANSLATION",
        readiness: "READY_FOR_CARD_BLUEPRINT",
        primaryDimension: "body",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        mappingTheme: "BODY_STABILITY_MAPPING",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        shellTone: "稳定 / 承载 / 回流",
        shellReason: "这局原力已经具备卡壳条件。",
        cardBlueprintRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_RENDER_PROTOCOL",
        sectionKey: "forceThemeArea",
      },
    },
    {
      name: "ready behavior shell keeps six node section",
      input: {
        status: "ASSET_SHELL",
        sourceForceTranslationStatus: "FORCE_TRANSLATION",
        readiness: "READY_FOR_CARD_BLUEPRINT",
        primaryDimension: "behavior",
        pressureSeedId: "seed-behavior-001",
        pressureSeedText: "你明明知道要开始，却一直停在原地。",
        mappingTheme: "ACTION_ALIGNMENT_MAPPING",
        forceTheme: "行动校准",
        forcePhrase: "微动作原力",
        shellTheme: "行动校准壳",
        shellTone: "微动作 / 对齐 / 校准",
        shellReason: "这局原力已经具备卡壳条件。",
        cardBlueprintRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_RENDER_PROTOCOL",
        sectionKey: "sixNodeCompletionArea",
      },
    },
    {
      name: "ready motivation shell keeps imprint section",
      input: {
        status: "ASSET_SHELL",
        sourceForceTranslationStatus: "FORCE_TRANSLATION",
        readiness: "READY_FOR_CARD_BLUEPRINT",
        primaryDimension: "motivation",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        mappingTheme: "MOTIVATION_REORIENTATION_MAPPING",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
        shellTheme: "方向重燃壳",
        shellTone: "点火 / 方向 / 重启",
        shellReason: "这局原力已经具备卡壳条件。",
        cardBlueprintRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_RENDER_PROTOCOL",
        sectionKey: "imprintArea",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveCardBlueprintCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.blueprintReason.includes(word));
    const sections = actual.blueprintSections ?? {};
    const allSectionsEnabled =
      sections.starbeastArea === true &&
      sections.forceThemeArea === true &&
      sections.pressureSeedTraceArea === true &&
      sections.sixNodeCompletionArea === true &&
      sections.imprintArea === true;
    const passed =
      actual.status === "CARD_BLUEPRINT" &&
      actual.sourceAssetShellStatus === "ASSET_SHELL" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.forceTheme === fixture.input.forceTheme &&
      actual.forcePhrase === fixture.input.forcePhrase &&
      actual.shellTheme === fixture.input.shellTheme &&
      actual.assetRenderProtocolRequired === true &&
      actual.forbiddenLegacyRoute === true &&
      allSectionsEnabled &&
      sections[fixture.expected.sectionKey] === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.sectionKey} | actual=${row.actual.readiness}/${JSON.stringify(row.actual.blueprintSections)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[CARD BLUEPRINT CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[CARD BLUEPRINT CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
