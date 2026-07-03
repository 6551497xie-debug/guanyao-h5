import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoAssetCardRenderCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-asset-card-render-${process.pid}.mjs`);
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

const baseOfficialAssetObject = {
  status: "OFFICIAL_ASSET_OBJECT",
  sourceGenerationStatus: "OFFICIAL_ASSET_GENERATION_CANDIDATE",
  readiness: "READY_FOR_ASSET_CARD_RENDER",
  primaryDimension: "body",
  assetSource: {
    motherCode: "乾",
    trigram: "乾",
    fourSymbol: "白虎",
    pressureSeedId: "seed-body-001",
    pressureSeedText: "你在这个行业十年了，抬头还是经理。",
  },
  forceIdentity: {
    forceTheme: "身体回流",
    forcePhrase: "稳定原力",
    shellTheme: "身体回流壳",
    renderTone: "稳定 / 承载 / 回流",
  },
  assetNarrative: {
    originTrace: "本局现实扰动已被温和记录。",
    forceReflection: "这局原力已经形成可沉淀的对象。",
    completionTrace: "六节点调频完成态已经被保留。",
  },
  officialAssetObjectReason: "这局原力已经进入正式资产对象层。",
  assetCardRenderRequired: true,
  forbiddenLegacyRoute: true,
  commercialPayloadForbidden: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveAssetCardRenderCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by readiness stays render-not-ready",
      input: {
        ...baseOfficialAssetObject,
        readiness: "NOT_READY",
      },
      expected: {
        readiness: "NOT_READY",
        starbeastSlot: true,
        forceIdentitySlot: true,
        pressureTraceSlot: true,
        sixNodeTraceSlot: true,
        imprintSlot: true,
      },
    },
    {
      name: "ready full object enters asset card render candidate",
      input: baseOfficialAssetObject,
      expected: {
        readiness: "READY_FOR_ASSET_CARD_UI_PROTOCOL",
        starbeastSlot: true,
        forceIdentitySlot: true,
        pressureTraceSlot: true,
        sixNodeTraceSlot: true,
        imprintSlot: true,
      },
    },
    {
      name: "ready object with missing persona source keeps starbeast slot false",
      input: {
        ...baseOfficialAssetObject,
        primaryDimension: "emotion",
        assetSource: {
          pressureSeedText: "你明明很委屈，却还在假装没事。",
        },
        forceIdentity: {
          forceTheme: "情绪共振",
          forcePhrase: "接纳原力",
          shellTheme: "情绪共振壳",
          renderTone: "接纳 / 流动 / 共振",
        },
      },
      expected: {
        readiness: "READY_FOR_ASSET_CARD_UI_PROTOCOL",
        starbeastSlot: false,
        forceIdentitySlot: true,
        pressureTraceSlot: true,
        sixNodeTraceSlot: true,
        imprintSlot: true,
      },
    },
    {
      name: "commercial payload flag false blocks render readiness",
      input: {
        ...baseOfficialAssetObject,
        primaryDimension: "motivation",
        commercialPayloadForbidden: false,
        assetSource: {
          motherCode: "兑",
          pressureSeedText: "你不知道该往哪走。",
        },
        forceIdentity: {
          forceTheme: "方向重燃",
          forcePhrase: "目标原力",
          shellTheme: "方向重燃壳",
          renderTone: "点火 / 方向 / 重启",
        },
      },
      expected: {
        readiness: "NOT_READY",
        starbeastSlot: true,
        forceIdentitySlot: true,
        pressureTraceSlot: true,
        sixNodeTraceSlot: true,
        imprintSlot: true,
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveAssetCardRenderCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const narrativeText = actual.renderCandidateReason ?? "";
    const hasForbiddenNarrativeWord = forbiddenNarrativeWords.some((word) => narrativeText.includes(word));
    const passed =
      actual.status === "ASSET_CARD_RENDER_CANDIDATE" &&
      actual.sourceOfficialAssetObjectStatus === "OFFICIAL_ASSET_OBJECT" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.input.primaryDimension &&
      actual.renderSource.assetSource === fixture.input.assetSource &&
      actual.renderSource.forceIdentity === fixture.input.forceIdentity &&
      actual.renderSource.assetNarrative === fixture.input.assetNarrative &&
      actual.renderSlots.starbeastSlot === fixture.expected.starbeastSlot &&
      actual.renderSlots.forceIdentitySlot === fixture.expected.forceIdentitySlot &&
      actual.renderSlots.pressureTraceSlot === fixture.expected.pressureTraceSlot &&
      actual.renderSlots.sixNodeTraceSlot === fixture.expected.sixNodeTraceSlot &&
      actual.renderSlots.imprintSlot === fixture.expected.imprintSlot &&
      actual.assetCardUiProtocolRequired === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${JSON.stringify(row.expected)} | actual=${row.actual.readiness}/${JSON.stringify(row.actual.renderSlots)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[ASSET CARD RENDER] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[ASSET CARD RENDER] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
