import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoComponentImplementationCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-component-implementation-${process.pid}.mjs`);
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

const allComponentSections = {
  starbeastComponent: true,
  forceIdentityComponent: true,
  pressureTraceComponent: true,
  sixNodeTraceComponent: true,
  imprintComponent: true,
};

const baseUiComponentCandidate = {
  status: "UI_COMPONENT_CANDIDATE",
  sourceAssetCardUiStatus: "ASSET_CARD_UI_CANDIDATE",
  readiness: "READY_FOR_COMPONENT_IMPLEMENTATION_PROTOCOL",
  primaryDimension: "body",
  componentSections: allComponentSections,
  componentTone: "稳定 / 承载 / 回流",
  componentCandidateReason: "这局资产卡 UI 已具备进入组件候选的条件。",
  componentImplementationProtocolRequired: true,
  routeForbidden: true,
  forbiddenLegacyRoute: true,
  commercialPayloadForbidden: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveComponentImplementationCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by readiness stays implementation-not-ready",
      input: {
        ...baseUiComponentCandidate,
        readiness: "NOT_READY",
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "body",
        implementationTone: "稳定 / 承载 / 回流",
        sections: {
          starbeastImplementation: true,
          forceIdentityImplementation: true,
          pressureTraceImplementation: true,
          sixNodeTraceImplementation: true,
          imprintImplementation: true,
        },
      },
    },
    {
      name: "ready full component candidate enters implementation candidate",
      input: baseUiComponentCandidate,
      expected: {
        readiness: "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL",
        primaryDimension: "body",
        implementationTone: "稳定 / 承载 / 回流",
        sections: {
          starbeastImplementation: true,
          forceIdentityImplementation: true,
          pressureTraceImplementation: true,
          sixNodeTraceImplementation: true,
          imprintImplementation: true,
        },
      },
    },
    {
      name: "ready behavior keeps behavior internal key",
      input: {
        ...baseUiComponentCandidate,
        primaryDimension: "behavior",
        componentTone: "微动作 / 对齐 / 校准",
      },
      expected: {
        readiness: "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL",
        primaryDimension: "behavior",
        implementationTone: "微动作 / 对齐 / 校准",
        sections: {
          starbeastImplementation: true,
          forceIdentityImplementation: true,
          pressureTraceImplementation: true,
          sixNodeTraceImplementation: true,
          imprintImplementation: true,
        },
      },
    },
    {
      name: "route protection failure blocks implementation readiness",
      input: {
        ...baseUiComponentCandidate,
        primaryDimension: "motivation",
        componentTone: "点火 / 方向 / 重启",
        routeForbidden: false,
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "motivation",
        implementationTone: "点火 / 方向 / 重启",
        sections: {
          starbeastImplementation: true,
          forceIdentityImplementation: true,
          pressureTraceImplementation: true,
          sixNodeTraceImplementation: true,
          imprintImplementation: true,
        },
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveComponentImplementationCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const narrativeText = actual.implementationCandidateReason ?? "";
    const hasForbiddenNarrativeWord = forbiddenNarrativeWords.some((word) => narrativeText.includes(word));
    const sectionsMatch = Object.entries(fixture.expected.sections).every(([section, expected]) => actual.implementationSections[section] === expected);
    const passed =
      actual.status === "COMPONENT_IMPLEMENTATION_CANDIDATE" &&
      actual.sourceUiComponentStatus === "UI_COMPONENT_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.expected.primaryDimension &&
      sectionsMatch &&
      actual.implementationTone === fixture.expected.implementationTone &&
      actual.safeComponentStubProtocolRequired === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.primaryDimension}/${row.expected.implementationTone} | actual=${row.actual.readiness}/${row.actual.primaryDimension}/${row.actual.implementationTone}/${JSON.stringify(row.actual.implementationSections)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[COMPONENT IMPLEMENTATION] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[COMPONENT IMPLEMENTATION] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
