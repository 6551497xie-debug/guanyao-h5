import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoOfficialAssetObjectResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-official-asset-object-${process.pid}.mjs`);
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
const forbiddenNarrativeWords = ["大吉", "大凶", "不利", "凶险", "成功打卡", "任务完成", "通过考验", "失败", "未完成", "能量不足", "购买", "已解锁"];

const allGenerationRequirements = {
  personaSource: true,
  pressureTrace: true,
  primaryDimension: true,
  sixNodeCompletion: true,
  starbeastFeedback: true,
  forceTranslation: true,
  renderBlueprint: true,
  noLegacyRoute: true,
  noCommercialPayload: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveOfficialAssetObject } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by generation readiness stays object-not-ready",
      input: {
        status: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
        sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE",
        readiness: "NOT_READY",
        primaryDimension: "body",
        motherCode: "乾",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        renderTone: "稳定 / 承载 / 回流",
        generationRequirements: allGenerationRequirements,
        generationReason: "这局已具备进入正式资产对象生成的候选条件。",
        officialAssetObjectRequired: true,
        forbiddenLegacyRoute: true,
        commercialPayloadForbidden: true,
      },
      expected: {
        readiness: "NOT_READY",
        motherCode: "乾",
        hasPressureSeedText: true,
      },
    },
    {
      name: "ready full generation candidate enters official asset object",
      input: {
        status: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
        sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE",
        readiness: "READY_FOR_OFFICIAL_ASSET_OBJECT",
        primaryDimension: "body",
        motherCode: "乾",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        forceTheme: "身体回流",
        forcePhrase: "稳定原力",
        shellTheme: "身体回流壳",
        renderTone: "稳定 / 承载 / 回流",
        generationRequirements: allGenerationRequirements,
        generationReason: "这局已具备进入正式资产对象生成的候选条件。",
        officialAssetObjectRequired: true,
        forbiddenLegacyRoute: true,
        commercialPayloadForbidden: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_CARD_RENDER",
        motherCode: "乾",
        hasPressureSeedText: true,
      },
    },
    {
      name: "ready generation can produce object with optional persona source missing",
      input: {
        status: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
        sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE",
        readiness: "READY_FOR_OFFICIAL_ASSET_OBJECT",
        primaryDimension: "emotion",
        pressureSeedText: "你明明很委屈，却还在假装没事。",
        forceTheme: "情绪共振",
        forcePhrase: "接纳原力",
        shellTheme: "情绪共振壳",
        renderTone: "接纳 / 流动 / 共振",
        generationRequirements: allGenerationRequirements,
        generationReason: "这局已具备进入正式资产对象生成的候选条件。",
        officialAssetObjectRequired: true,
        forbiddenLegacyRoute: true,
        commercialPayloadForbidden: true,
      },
      expected: {
        readiness: "READY_FOR_ASSET_CARD_RENDER",
        motherCode: undefined,
        hasPressureSeedText: true,
      },
    },
    {
      name: "commercial payload flag false blocks object readiness",
      input: {
        status: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
        sourceFinalAssetStatus: "FINAL_ASSET_CANDIDATE",
        readiness: "READY_FOR_OFFICIAL_ASSET_OBJECT",
        primaryDimension: "motivation",
        motherCode: "兑",
        pressureSeedText: "你不知道该往哪走。",
        forceTheme: "方向重燃",
        forcePhrase: "目标原力",
        shellTheme: "方向重燃壳",
        renderTone: "点火 / 方向 / 重启",
        generationRequirements: allGenerationRequirements,
        generationReason: "这局已具备进入正式资产对象生成的候选条件。",
        officialAssetObjectRequired: true,
        forbiddenLegacyRoute: true,
        commercialPayloadForbidden: false,
      },
      expected: {
        readiness: "NOT_READY",
        motherCode: "兑",
        hasPressureSeedText: true,
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveOfficialAssetObject(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const narrativeText = [
      actual.assetNarrative?.originTrace,
      actual.assetNarrative?.forceReflection,
      actual.assetNarrative?.completionTrace,
      actual.officialAssetObjectReason,
    ].join("");
    const hasForbiddenNarrativeWord = forbiddenNarrativeWords.some((word) => narrativeText.includes(word));
    const passed =
      actual.status === "OFFICIAL_ASSET_OBJECT" &&
      actual.sourceGenerationStatus === "OFFICIAL_ASSET_GENERATION_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.assetSource.motherCode === fixture.expected.motherCode &&
      Boolean(actual.assetSource.pressureSeedText) === fixture.expected.hasPressureSeedText &&
      actual.forceIdentity.forceTheme === fixture.input.forceTheme &&
      actual.forceIdentity.forcePhrase === fixture.input.forcePhrase &&
      actual.forceIdentity.shellTheme === fixture.input.shellTheme &&
      actual.forceIdentity.renderTone === fixture.input.renderTone &&
      actual.assetNarrative.originTrace === "本局现实扰动已被温和记录。" &&
      actual.assetNarrative.forceReflection === "这局原力已经形成可沉淀的对象。" &&
      actual.assetNarrative.completionTrace === "六节点调频完成态已经被保留。" &&
      actual.assetCardRenderRequired === true &&
      actual.forbiddenLegacyRoute === true &&
      actual.commercialPayloadForbidden === true &&
      !hasForbiddenField &&
      !hasForbiddenNarrativeWord;

    return {
      name: fixture.name,
      expected: fixture.expected,
      actual,
      hasForbiddenField,
      hasForbiddenNarrativeWord,
      passed,
    };
  });

  rows.forEach((row) => {
    const mark = row.passed ? "PASS" : "FAIL";
    console.log(
      `${mark} | ${row.name} | expected=${row.expected.readiness}/mother=${row.expected.motherCode ?? "undefined"}/pressure=${row.expected.hasPressureSeedText} | actual=${row.actual.readiness}/${JSON.stringify(row.actual.assetSource)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[OFFICIAL ASSET OBJECT] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[OFFICIAL ASSET OBJECT] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
