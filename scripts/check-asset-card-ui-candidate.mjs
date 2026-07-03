import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoAssetCardUiCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-asset-card-ui-${process.pid}.mjs`);
const forbiddenFields = [
  "reactComponent",
  "component",
  "ui",
  "route",
  "pagePath",
  "hexagramCode",
  "hexagramName",
  "cardName",
  "finalAssetId",
  "officialAssetId",
  "price",
  "paywall",
  "unlock",
  "collection",
  "archiveRoute",
  "legacyRoute",
];
const forbiddenNarrativeWords = ["大吉", "大凶", "不利", "凶险", "成功打卡", "任务完成", "通过考验", "失败", "未完成", "能量不足", "购买", "已解锁"];

const allRenderSlots = {
  starbeastSlot: true,
  forceIdentitySlot: true,
  pressureTraceSlot: true,
  sixNodeTraceSlot: true,
  imprintSlot: true,
};

const baseAssetCardRenderCandidate = {
  status: "ASSET_CARD_RENDER_CANDIDATE",
  sourceOfficialAssetObjectStatus: "OFFICIAL_ASSET_OBJECT",
  readiness: "READY_FOR_ASSET_CARD_UI_PROTOCOL",
  primaryDimension: "body",
  renderSource: {
    assetSource: {
      motherCode: "乾",
      trigram: "乾",
      fourSymbol: "白虎",
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
  },
  renderSlots: allRenderSlots,
  renderCandidateReason: "这局资产对象已经具备进入卡片渲染候选的条件。",
  assetCardUiProtocolRequired: true,
  forbiddenLegacyRoute: true,
  commercialPayloadForbidden: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveAssetCardUiCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by readiness stays ui-not-ready",
      input: {
        ...baseAssetCardRenderCandidate,
        readiness: "NOT_READY",
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "body",
        uiToneIncludes: "稳定",
        sections: {
          starbeastSection: true,
          forceIdentitySection: true,
          pressureTraceSection: true,
          sixNodeTraceSection: true,
          imprintSection: true,
        },
      },
    },
    {
      name: "ready full render candidate enters asset card ui candidate",
      input: baseAssetCardRenderCandidate,
      expected: {
        readiness: "READY_FOR_UI_COMPONENT_PROTOCOL",
        primaryDimension: "body",
        uiToneIncludes: "稳定",
        sections: {
          starbeastSection: true,
          forceIdentitySection: true,
          pressureTraceSection: true,
          sixNodeTraceSection: true,
          imprintSection: true,
        },
      },
    },
    {
      name: "ready behavior keeps behavior internal key and action tone",
      input: {
        ...baseAssetCardRenderCandidate,
        primaryDimension: "behavior",
      },
      expected: {
        readiness: "READY_FOR_UI_COMPONENT_PROTOCOL",
        primaryDimension: "behavior",
        uiToneIncludes: "微动作",
        sections: {
          starbeastSection: true,
          forceIdentitySection: true,
          pressureTraceSection: true,
          sixNodeTraceSection: true,
          imprintSection: true,
        },
      },
    },
    {
      name: "route and commercial protection failure blocks ui readiness",
      input: {
        ...baseAssetCardRenderCandidate,
        primaryDimension: "motivation",
        forbiddenLegacyRoute: false,
        commercialPayloadForbidden: false,
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "motivation",
        uiToneIncludes: "方向",
        sections: {
          starbeastSection: true,
          forceIdentitySection: true,
          pressureTraceSection: true,
          sixNodeTraceSection: true,
          imprintSection: true,
        },
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveAssetCardUiCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const narrativeText = actual.uiCandidateReason ?? "";
    const hasForbiddenNarrativeWord = forbiddenNarrativeWords.some((word) => narrativeText.includes(word));
    const sectionsMatch = Object.entries(fixture.expected.sections).every(([section, expected]) => actual.uiSections[section] === expected);
    const passed =
      actual.status === "ASSET_CARD_UI_CANDIDATE" &&
      actual.sourceAssetCardRenderStatus === "ASSET_CARD_RENDER_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.expected.primaryDimension &&
      sectionsMatch &&
      actual.uiTone.includes(fixture.expected.uiToneIncludes) &&
      actual.uiComponentProtocolRequired === true &&
      actual.routeForbidden === true &&
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
    console.log(`${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.primaryDimension}/${row.expected.uiToneIncludes} | actual=${row.actual.readiness}/${row.actual.primaryDimension}/${row.actual.uiTone}/${JSON.stringify(row.actual.uiSections)}`);
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[ASSET CARD UI] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[ASSET CARD UI] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
