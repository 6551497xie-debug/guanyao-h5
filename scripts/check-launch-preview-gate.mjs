#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = process.cwd();
const sourceDir = path.join(root, "src/pages");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "launch-preview-gate-"));

const modules = [
  "LaunchLabPreview.audit",
  "LaunchLabPreview.runner",
  "LaunchLabPreview.check",
];

function transpileModule(moduleName) {
  const sourcePath = path.join(sourceDir, `${moduleName}.ts`);
  const outputPath = path.join(tempDir, `${moduleName}.mjs`);
  const source = fs.readFileSync(sourcePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
    },
  }).outputText
    .replaceAll(
      'from "./LaunchLabPreview.audit";',
      'from "./LaunchLabPreview.audit.mjs";'
    )
    .replaceAll(
      'from "./LaunchLabPreview.runner";',
      'from "./LaunchLabPreview.runner.mjs";'
    );

  fs.writeFileSync(outputPath, output);
  return outputPath;
}

try {
  for (const moduleName of modules) {
    transpileModule(moduleName);
  }

  const runnerModule = await import(
    pathToFileURL(path.join(tempDir, "LaunchLabPreview.runner.mjs")).href
  );
  const checkModule = await import(
    pathToFileURL(path.join(tempDir, "LaunchLabPreview.check.mjs")).href
  );

  const { runCognitiveDivergenceCheck, runCognitiveDivergenceGate } =
    runnerModule;
  const { runPreviewGateCheck } = checkModule;

  const previewGateCheck = runPreviewGateCheck();
  const cognitiveDivergenceCheck = runCognitiveDivergenceCheck();
  const cognitiveDivergenceGate = runCognitiveDivergenceGate();
  const gateMatchesCheck =
    JSON.stringify(cognitiveDivergenceCheck) ===
    JSON.stringify(cognitiveDivergenceGate);
  const pass =
    previewGateCheck.pass === true &&
    cognitiveDivergenceCheck.pass === true &&
    cognitiveDivergenceGate.pass === true &&
    gateMatchesCheck;
  const result = {
    pass,
    previewGateCheck,
    cognitiveDivergenceCheck,
    cognitiveDivergenceGate,
    gateMatchesCheck,
  };

  console.log("ENTRY PREVIEW GATE CHECK START");
  console.log(JSON.stringify(result, null, 2));
  console.log("ENTRY PREVIEW GATE CHECK END");

  fs.rmSync(tempDir, { recursive: true, force: true });
  process.exit(pass ? 0 : 1);
} catch (error) {
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log("ENTRY PREVIEW GATE CHECK START");
  console.log(
    JSON.stringify(
      {
        pass: false,
        error: error instanceof Error ? error.message : String(error),
      },
      null,
      2
    )
  );
  console.log("ENTRY PREVIEW GATE CHECK END");
  process.exit(1);
}
