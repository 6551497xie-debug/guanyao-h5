import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoPrimaryPetalResolver.ts");
const source = fs.readFileSync(resolverPath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

const tempModulePath = path.join(os.tmpdir(), `guanyao-primary-petal-resolver-${process.pid}.mjs`);
fs.writeFileSync(tempModulePath, transpiled.outputText);

try {
  const { derivePrimaryPetal, toProtocolPrimaryPetal } = await import(`file://${tempModulePath}`);
  const fixtures = [
    {
      name: "body / somatic pressure",
      expected: "body",
      context: {
        surface: "你在这个行业十年了，抬头还是经理。",
        bodySignal: "胸口发闷，肩膀沉重。",
      },
    },
    {
      name: "emotion / relationship disturbance",
      expected: "emotion",
      context: {
        surface: "对方一个眼神，你瞬间被不安接管。",
        emotionalTone: "fear",
      },
    },
    {
      name: "thought / explanation loop",
      expected: "thought",
      context: {
        surface: "你还没说完，脑子里已经开始组织下一句解释了。",
        thoughtPattern: "反复解释，用证明换安全。",
      },
    },
    {
      name: "behavior / action block",
      expected: "behavior",
      context: {
        surface: "你脑子里想了无数遍，手还在原处。",
        behaviorBlock: "想做，但卡住很久了。",
      },
    },
    {
      name: "memory / past echo",
      expected: "memory",
      context: {
        surface: "以前也这样过，你还没反应，记忆已经先替你回答了。",
        memoryEcho: "旧经验正在把你拉回过去。",
      },
    },
    {
      name: "motivation / direction loss",
      expected: "motivation",
      context: {
        surface: "你不知道该往哪走，假装不需要，就不怕得不到。",
        motivationLoss: "方向感变得模糊。",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const actual = toProtocolPrimaryPetal(derivePrimaryPetal(fixture.context));
    return {
      name: fixture.name,
      expected: fixture.expected,
      actual,
      passed: actual === fixture.expected,
    };
  });

  rows.forEach((row) => {
    const mark = row.passed ? "PASS" : "FAIL";
    console.log(`${mark} | ${row.name} | expected=${row.expected} | actual=${row.actual}`);
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[PRIMARY PETAL RESOLVER] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    process.exit(1);
  }

  console.log(`\n[PRIMARY PETAL RESOLVER] PASS: ${rows.length}/${rows.length} fixture(s) matched.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
