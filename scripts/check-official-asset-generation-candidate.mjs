import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoOfficialAssetGenerationCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-official-asset-generation-candidate-${process.pid}.mjs`);
const forbiddenFields = [
  "hexagramCode",
  "hexagramName",
  "cardName",
  "finalAssetId",
  "officialAssetId",
  "price",
  "paywall",
  "unlock",
  "collection",
  "route",
  "archiveRoute",
  "legacyRoute",
  "reactComponent",
  "ui",
];
const forbiddenReasonWords = ["大吉", "大凶", "不利", "凶险", "成功打卡", "任务完成", "通过考验", "失败", "未完成", "能量不足", "购买", "已解锁"];

const allAssetElementsReady = {
  personaSource: true,
  pressureTrace: true,
  primaryDimension: true,
  sixNodeCompletion: true,
  starbeastFeedback: true,
  forceTranslation: true,
  renderBlueprint: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveOfficialAssetGenerationCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by source readiness stays generation-not-ready",
      input: {
        status: "FINAL_ASSET_CANDIDATE",
        sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE",
        readiness: "NOT_READY",
        primaryDimension: "body",
        motherCode: "乾",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        renderTone: "稳定 / 承载 / 回流",
        assetElementsReady: allAssetElementsReady,
        finalAssetReason: "这局原力已经走到最终资产候选层。",
        officialAssetGenerationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        personaSource: true,
        renderBlueprint: true,
      },
    },
    {
      name: "ready full final candidate enters official generation candidate",
      input: {
        status: "FINAL_ASSET_CANDIDATE",
        sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE",
        readiness: "READY_FOR_OFFICIAL_ASSET_GENERATION",
        primaryDimension: "body",
        motherCode: "乾",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        renderTone: "稳定 / 承载 / 回流",
        assetElementsReady: allAssetElementsReady,
        finalAssetReason: "这局原力已经走到最终资产候选层。",
        officialAssetGenerationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_OFFICIAL_ASSET_OBJECT",
        personaSource: true,
        renderBlueprint: true,
      },
    },
    {
      name: "missing persona source blocks official generation readiness",
      input: {
        status: "FINAL_ASSET_CANDIDATE",
        sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE",
        readiness: "READY_FOR_OFFICIAL_ASSET_GENERATION",
        primaryDimension: "emotion",
        pressureSeedText: "你明明很委屈，却还在假装没事。",
        forceTheme: "情绪共振",
        forcePhrase: "接纳原力",
        shellTheme: "情绪共振壳",
        renderTone: "接纳 / 流动 / 共振",
        assetElementsReady: {
          ...allAssetElementsReady,
          personaSource: false,
        },
        finalAssetReason: "这局原力已经走到最终资产候选层。",
        officialAssetGenerationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        personaSource: false,
        renderBlueprint: true,
      },
    },
    {
      name: "missing render blueprint blocks official generation readiness",
      input: {
        status: "FINAL_ASSET_CANDIDATE",
        sourceAssetRenderStatus: "ASSET_RENDER_CANDIDATE",
        readiness: "READY_FOR_OFFICIAL_ASSET_GENERATION",
        primaryDimension: "motivation",
        motherCode: "兑",
        pressureSeedText: "你不知道该往哪走。",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
        shellTheme: "方向重燃壳",
        renderTone: "点火 / 方向 / 重启",
        assetElementsReady: {
          ...allAssetElementsReady,
          renderBlueprint: false,
        },
        finalAssetReason: "这局原力已经走到最终资产候选层。",
        officialAssetGenerationRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        personaSource: true,
        renderBlueprint: false,
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveOfficialAssetGenerationCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.generationReason.includes(word));
    const requirements = actual.generationRequirements ?? {};
    const passed =
      actual.status === "OFFICIAL_ASSET_GENERATION_CANDIDATE" &&
      actual.sourceFinalAssetStatus === "FINAL_ASSET_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.forceTheme === fixture.input.forceTheme &&
      actual.forcePhrase === fixture.input.forcePhrase &&
      actual.shellTheme === fixture.input.shellTheme &&
      actual.renderTone === fixture.input.renderTone &&
      requirements.personaSource === fixture.expected.personaSource &&
      requirements.pressureTrace === Boolean(fixture.input.assetElementsReady.pressureTrace) &&
      requirements.primaryDimension === Boolean(fixture.input.assetElementsReady.primaryDimension) &&
      requirements.sixNodeCompletion === Boolean(fixture.input.assetElementsReady.sixNodeCompletion) &&
      requirements.starbeastFeedback === Boolean(fixture.input.assetElementsReady.starbeastFeedback) &&
      requirements.forceTranslation === Boolean(fixture.input.assetElementsReady.forceTranslation) &&
      requirements.renderBlueprint === fixture.expected.renderBlueprint &&
      requirements.noLegacyRoute === true &&
      requirements.noCommercialPayload === true &&
      actual.officialAssetObjectRequired === true &&
      actual.forbiddenLegacyRoute === true &&
      actual.commercialPayloadForbidden === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/persona=${row.expected.personaSource}/blueprint=${row.expected.renderBlueprint} | actual=${row.actual.readiness}/${JSON.stringify(row.actual.generationRequirements)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[OFFICIAL ASSET GENERATION CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[OFFICIAL ASSET GENERATION CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
