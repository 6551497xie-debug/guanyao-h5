import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoAssetRenderCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-asset-render-candidate-${process.pid}.mjs`);
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

const allBlueprintSections = {
  starbeastArea: true,
  forceThemeArea: true,
  pressureSeedTraceArea: true,
  sixNodeCompletionArea: true,
  imprintArea: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveAssetRenderCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready blueprint stays render-not-ready",
      input: {
        status: "CARD_BLUEPRINT",
        sourceAssetShellStatus: "ASSET_SHELL",
        readiness: "NOT_READY",
        primaryDimension: "body",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        blueprintSections: allBlueprintSections,
        blueprintReason: "这局原力还在靠近卡片蓝图条件。",
        assetRenderProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "NOT_READY",
        toneIncludes: "稳定",
        blockKey: "starbeastRenderBlock",
      },
    },
    {
      name: "ready body blueprint enters asset render candidate",
      input: {
        status: "CARD_BLUEPRINT",
        sourceAssetShellStatus: "ASSET_SHELL",
        readiness: "READY_FOR_ASSET_RENDER_PROTOCOL",
        primaryDimension: "body",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        blueprintSections: allBlueprintSections,
        blueprintReason: "这局原力已经具备进入卡片蓝图的条件。",
        assetRenderProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_FINAL_ASSET_PROTOCOL",
        toneIncludes: "稳定",
        blockKey: "forceThemeRenderBlock",
      },
    },
    {
      name: "ready behavior blueprint keeps six node render block",
      input: {
        status: "CARD_BLUEPRINT",
        sourceAssetShellStatus: "ASSET_SHELL",
        readiness: "READY_FOR_ASSET_RENDER_PROTOCOL",
        primaryDimension: "behavior",
        pressureSeedId: "seed-behavior-001",
        pressureSeedText: "你明明知道要开始，却一直停在原地。",
        forceTheme: "行动校准",
        forcePhrase: "微动作原力",
        shellTheme: "行动校准壳",
        blueprintSections: allBlueprintSections,
        blueprintReason: "这局原力已经具备进入卡片蓝图的条件。",
        assetRenderProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_FINAL_ASSET_PROTOCOL",
        toneIncludes: "微动作",
        blockKey: "sixNodeCompletionRenderBlock",
      },
    },
    {
      name: "ready motivation blueprint keeps imprint render block",
      input: {
        status: "CARD_BLUEPRINT",
        sourceAssetShellStatus: "ASSET_SHELL",
        readiness: "READY_FOR_ASSET_RENDER_PROTOCOL",
        primaryDimension: "motivation",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
        shellTheme: "方向重燃壳",
        blueprintSections: allBlueprintSections,
        blueprintReason: "这局原力已经具备进入卡片蓝图的条件。",
        assetRenderProtocolRequired: true,
        forbiddenLegacyRoute: true,
      },
      expected: {
        readiness: "READY_FOR_FINAL_ASSET_PROTOCOL",
        toneIncludes: "方向",
        blockKey: "imprintRenderBlock",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveAssetRenderCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const hasForbiddenReasonWord = forbiddenReasonWords.some((word) => actual.renderReason.includes(word));
    const blocks = actual.renderBlocks ?? {};
    const allBlocksEnabled =
      blocks.starbeastRenderBlock === true &&
      blocks.forceThemeRenderBlock === true &&
      blocks.pressureSeedTraceRenderBlock === true &&
      blocks.sixNodeCompletionRenderBlock === true &&
      blocks.imprintRenderBlock === true;
    const passed =
      actual.status === "ASSET_RENDER_CANDIDATE" &&
      actual.sourceCardBlueprintStatus === "CARD_BLUEPRINT" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.forceTheme === fixture.input.forceTheme &&
      actual.forcePhrase === fixture.input.forcePhrase &&
      actual.shellTheme === fixture.input.shellTheme &&
      actual.renderTone.includes(fixture.expected.toneIncludes) &&
      actual.finalAssetProtocolRequired === true &&
      actual.forbiddenLegacyRoute === true &&
      allBlocksEnabled &&
      blocks[fixture.expected.blockKey] === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.blockKey}/${row.expected.toneIncludes} | actual=${row.actual.readiness}/${JSON.stringify(row.actual.renderBlocks)}/${row.actual.renderTone}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[ASSET RENDER CANDIDATE] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[ASSET RENDER CANDIDATE] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
