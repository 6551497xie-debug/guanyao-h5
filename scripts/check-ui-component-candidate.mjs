import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoUiComponentCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-ui-component-${process.pid}.mjs`);
const forbiddenFields = [
  "reactComponent",
  "component",
  "componentPath",
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

const allUiSections = {
  starbeastSection: true,
  forceIdentitySection: true,
  pressureTraceSection: true,
  sixNodeTraceSection: true,
  imprintSection: true,
};

const baseAssetCardUiCandidate = {
  status: "ASSET_CARD_UI_CANDIDATE",
  sourceAssetCardRenderStatus: "ASSET_CARD_RENDER_CANDIDATE",
  readiness: "READY_FOR_UI_COMPONENT_PROTOCOL",
  primaryDimension: "body",
  uiSections: allUiSections,
  uiTone: "稳定 / 承载 / 回流",
  uiCandidateReason: "这局资产对象已经具备进入 UI 候选的条件。",
  uiComponentProtocolRequired: true,
  routeForbidden: true,
  forbiddenLegacyRoute: true,
  commercialPayloadForbidden: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveUiComponentCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by readiness stays component-not-ready",
      input: {
        ...baseAssetCardUiCandidate,
        readiness: "NOT_READY",
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "body",
        componentTone: "稳定 / 承载 / 回流",
        sections: {
          starbeastComponent: true,
          forceIdentityComponent: true,
          pressureTraceComponent: true,
          sixNodeTraceComponent: true,
          imprintComponent: true,
        },
      },
    },
    {
      name: "ready full ui candidate enters component candidate",
      input: baseAssetCardUiCandidate,
      expected: {
        readiness: "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL",
        primaryDimension: "body",
        componentTone: "稳定 / 承载 / 回流",
        sections: {
          starbeastComponent: true,
          forceIdentityComponent: true,
          pressureTraceComponent: true,
          sixNodeTraceComponent: true,
          imprintComponent: true,
        },
      },
    },
    {
      name: "ready behavior keeps behavior internal key",
      input: {
        ...baseAssetCardUiCandidate,
        primaryDimension: "behavior",
        uiTone: "微动作 / 对齐 / 校准",
      },
      expected: {
        readiness: "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL",
        primaryDimension: "behavior",
        componentTone: "微动作 / 对齐 / 校准",
        sections: {
          starbeastComponent: true,
          forceIdentityComponent: true,
          pressureTraceComponent: true,
          sixNodeTraceComponent: true,
          imprintComponent: true,
        },
      },
    },
    {
      name: "route protection failure blocks component readiness",
      input: {
        ...baseAssetCardUiCandidate,
        primaryDimension: "motivation",
        uiTone: "点火 / 方向 / 重启",
        routeForbidden: false,
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "motivation",
        componentTone: "点火 / 方向 / 重启",
        sections: {
          starbeastComponent: true,
          forceIdentityComponent: true,
          pressureTraceComponent: true,
          sixNodeTraceComponent: true,
          imprintComponent: true,
        },
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveUiComponentCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const narrativeText = actual.componentCandidateReason ?? "";
    const hasForbiddenNarrativeWord = forbiddenNarrativeWords.some((word) => narrativeText.includes(word));
    const sectionsMatch = Object.entries(fixture.expected.sections).every(([section, expected]) => actual.componentSections[section] === expected);
    const passed =
      actual.status === "UI_COMPONENT_CANDIDATE" &&
      actual.sourceAssetCardUiStatus === "ASSET_CARD_UI_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.expected.primaryDimension &&
      sectionsMatch &&
      actual.componentTone === fixture.expected.componentTone &&
      actual.componentImplementationProtocolRequired === true &&
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
    console.log(
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.primaryDimension}/${row.expected.componentTone} | actual=${row.actual.readiness}/${row.actual.primaryDimension}/${row.actual.componentTone}/${JSON.stringify(row.actual.componentSections)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[UI COMPONENT] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[UI COMPONENT] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
