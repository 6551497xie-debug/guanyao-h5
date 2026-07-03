import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoSafeComponentStubCandidateResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-safe-component-stub-${process.pid}.mjs`);
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

const allImplementationSections = {
  starbeastImplementation: true,
  forceIdentityImplementation: true,
  pressureTraceImplementation: true,
  sixNodeTraceImplementation: true,
  imprintImplementation: true,
};

const baseComponentImplementationCandidate = {
  status: "COMPONENT_IMPLEMENTATION_CANDIDATE",
  sourceUiComponentStatus: "UI_COMPONENT_CANDIDATE",
  readiness: "READY_FOR_SAFE_COMPONENT_STUB_PROTOCOL",
  primaryDimension: "body",
  implementationSections: allImplementationSections,
  implementationTone: "稳定 / 承载 / 回流",
  implementationCandidateReason: "这局资产卡组件已具备进入实现候选的条件。",
  safeComponentStubProtocolRequired: true,
  routeForbidden: true,
  forbiddenLegacyRoute: true,
  commercialPayloadForbidden: true,
};

fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { resolveSafeComponentStubCandidate } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "not-ready by readiness stays stub-not-ready",
      input: {
        ...baseComponentImplementationCandidate,
        readiness: "NOT_READY",
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "body",
        stubTone: "稳定 / 承载 / 回流",
        sections: {
          starbeastStub: true,
          forceIdentityStub: true,
          pressureTraceStub: true,
          sixNodeTraceStub: true,
          imprintStub: true,
        },
      },
    },
    {
      name: "ready full implementation candidate enters safe component stub",
      input: baseComponentImplementationCandidate,
      expected: {
        readiness: "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION",
        primaryDimension: "body",
        stubTone: "稳定 / 承载 / 回流",
        sections: {
          starbeastStub: true,
          forceIdentityStub: true,
          pressureTraceStub: true,
          sixNodeTraceStub: true,
          imprintStub: true,
        },
      },
    },
    {
      name: "ready behavior keeps behavior internal key",
      input: {
        ...baseComponentImplementationCandidate,
        primaryDimension: "behavior",
        implementationTone: "微动作 / 对齐 / 校准",
      },
      expected: {
        readiness: "READY_FOR_SAFE_COMPONENT_STUB_IMPLEMENTATION",
        primaryDimension: "behavior",
        stubTone: "微动作 / 对齐 / 校准",
        sections: {
          starbeastStub: true,
          forceIdentityStub: true,
          pressureTraceStub: true,
          sixNodeTraceStub: true,
          imprintStub: true,
        },
      },
    },
    {
      name: "route protection failure blocks stub readiness",
      input: {
        ...baseComponentImplementationCandidate,
        primaryDimension: "motivation",
        implementationTone: "点火 / 方向 / 重启",
        routeForbidden: false,
      },
      expected: {
        readiness: "NOT_READY",
        primaryDimension: "motivation",
        stubTone: "点火 / 方向 / 重启",
        sections: {
          starbeastStub: true,
          forceIdentityStub: true,
          pressureTraceStub: true,
          sixNodeTraceStub: true,
          imprintStub: true,
        },
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = resolveSafeComponentStubCandidate(fixture.input);
    const hasForbiddenField = forbiddenFields.some((field) => Object.prototype.hasOwnProperty.call(actual, field));
    const narrativeText = actual.stubCandidateReason ?? "";
    const hasForbiddenNarrativeWord = forbiddenNarrativeWords.some((word) => narrativeText.includes(word));
    const sectionsMatch = Object.entries(fixture.expected.sections).every(([section, expected]) => actual.stubSections[section] === expected);
    const passed =
      actual.status === "SAFE_COMPONENT_STUB_CANDIDATE" &&
      actual.sourceComponentImplementationStatus === "COMPONENT_IMPLEMENTATION_CANDIDATE" &&
      actual.readiness === fixture.expected.readiness &&
      actual.primaryDimension === fixture.expected.primaryDimension &&
      sectionsMatch &&
      actual.stubTone === fixture.expected.stubTone &&
      actual.safeStubImplementationAllowed === true &&
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
      `${mark} | ${row.name} | expected=${row.expected.readiness}/${row.expected.primaryDimension}/${row.expected.stubTone} | actual=${row.actual.readiness}/${row.actual.primaryDimension}/${row.actual.stubTone}/${JSON.stringify(row.actual.stubSections)}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[SAFE COMPONENT STUB] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[SAFE COMPONENT STUB] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
