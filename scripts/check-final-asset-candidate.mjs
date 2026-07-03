import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoFinalAssetCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-final-asset-candidate-${process.pid}.mjs`);
const forbiddenFields = [
  "hexagramCode",
  "hexagramName",
  "cardName",
  "finalAssetId",
  "price",
  "paywall",
  "unlock",
  "collection",
  "route",
  "archiveRoute",
  "legacyRoute",
];
const forbiddenReasonWords = ["大吉", "大凶", "不利", "凶险", "成功打卡", "任务完成", "通过考验", "失败", "未完成", "能量不足", "购买", "已解锁"];

const allRenderBlocks = {
  starbeastRenderBlock: true,
  forceThemeRenderBlock: true,
  pressureSeedTraceRenderBlock: true,
  sixNodeCompletionRenderBlock: true,
  imprintRenderBlock: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveFinalAssetCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready render stays final-not-ready",
      input: {
        status: "ASSET_RENDER_CANDIDATE",
        sourceCardBlueprintStatus: "CARD_BLUEPRINT",
        readiness: "NOT_READY",
        primaryDimension: "body",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        renderBlocks: allRenderBlocks,
        renderTone: "稳定 / 承载 / 回流",
        renderReason: "这局原力还在靠近渲染候选条件。",
        finalAssetProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        personaSource: false,
        pressureTrace: false,
        renderBlueprint: true,
      },
    },
    {
      name: "ready full body render enters final candidate",
      input: {
        status: "ASSET_RENDER_CANDIDATE",
        sourceCardBlueprintStatus: "CARD_BLUEPRINT",
        readiness: "READY_FOR_FINAL_ASSET_PROTOCOL",
        primaryDimension: "body",
        motherCode: "乾",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        renderBlocks: allRenderBlocks,
        renderTone: "稳定 / 承载 / 回流",
        renderReason: "这局原力已经具备进入渲染候选的条件。",
        finalAssetProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_OFFICIAL_ASSET_GENERATION",
        personaSource: true,
        pressureTrace: true,
        renderBlueprint: true,
      },
    },
    {
      name: "ready emotion render can stay missing persona source",
      input: {
        status: "ASSET_RENDER_CANDIDATE",
        sourceCardBlueprintStatus: "CARD_BLUEPRINT",
        readiness: "READY_FOR_FINAL_ASSET_PROTOCOL",
        primaryDimension: "emotion",
        pressureSeedText: "你明明很委屈，却还在假装没事。",
        forceTheme: "情绪共振",
        forcePhrase: "接纳原力",
        shellTheme: "情绪共振壳",
        renderBlocks: allRenderBlocks,
        renderTone: "接纳 / 流动 / 共振",
        renderReason: "这局原力已经具备进入渲染候选的条件。",
        finalAssetProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_OFFICIAL_ASSET_GENERATION",
        personaSource: false,
        pressureTrace: true,
        renderBlueprint: true,
      },
    },
    {
      name: "ready motivation render with partial blocks is not full blueprint",
      input: {
        status: "ASSET_RENDER_CANDIDATE",
        sourceCardBlueprintStatus: "CARD_BLUEPRINT",
        readiness: "READY_FOR_FINAL_ASSET_PROTOCOL",
        primaryDimension: "motivation",
        motherCode: "兑",
        pressureSeedText: "你不知道该往哪走。",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
        shellTheme: "方向重燃壳",
        renderBlocks: {
          starbeastRenderBlock: true,
          forceThemeRenderBlock: true,
          pressureSeedTraceRenderBlock: true,
          sixNodeCompletionRenderBlock: true,
          imprintRenderBlock: false,
        },
        renderTone: "点火 / 方向 / 重启",
        renderReason: "这局原力已经具备进入渲染候选的条件。",
        finalAssetProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_OFFICIAL_ASSET_GENERATION",
        personaSource: true,
        pressureTrace: true,
        renderBlueprint: false,
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveFinalAssetCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.finalAssetReason.includes(word));
    const elements = actual.assetElementsReady ?? {};
    const passed =
      actual.status === "FINAL_ASSET_CANDIDATE" &&
      actual.sourceAssetRenderStatus === "ASSET_RENDER_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.forceTheme === fixture.input.forceTheme &&
      actual.forcePhrase === fixture.input.forcePhrase &&
      actual.shellTheme === fixture.input.shellTheme &&
      actual.renderTone === fixture.input.renderTone &&
      elements.personaSource === fixture.expected.personaSource &&
      elements.pressureTrace === fixture.expected.pressureTrace &&
      elements.primaryDimension === true &&
      elements.sixNodeCompletion === Boolean(fixture.input.renderBlocks.sixNodeCompletionRenderBlock) &&
      elements.starbeastFeedback === Boolean(fixture.input.renderBlocks.starbeastRenderBlock) &&
      elements.forceTranslation === Boolean(fixture.input.forceTheme && fixture.input.forcePhrase) &&
      elements.renderBlueprint === fixture.expected.renderBlueprint &&
      actual.officialAssetGenerationRequired === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/persona=${row.expected.personaSource}/pressure=${row.expected.pressureTrace}/blueprint=${row.expected.renderBlueprint} | actual=${row.actual.readiness}/${JSON.stringify(row.actual.assetElementsReady)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[FINAL ASSET CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[FINAL ASSET CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
