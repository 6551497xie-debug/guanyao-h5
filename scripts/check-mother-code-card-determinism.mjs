#!/usr/bin/env node

import { build } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const runs = 10;
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gy-mother-card-determinism-"));
const entryPath = path.join(tmpDir, "entry.ts");
const outPath = path.join(tmpDir, "check.mjs");

const enginePath = path.join(root, "src/services/guanyaoDeterministicPersonaEngine.ts");

fs.writeFileSync(
  entryPath,
  `
    import { generatePersona, buildPersonaOutputSnapshot } from ${JSON.stringify(enginePath)};

    const input = Object.freeze({
      chrono: Object.freeze({
        year: 1995,
        month: 6,
        day: 2,
        hour: "酉时",
      }),
      geo: Object.freeze({
        province: "广东",
        city: "广州",
      }),
    });

    const outputs = [];

    for (let index = 0; index < ${runs}; index += 1) {
      const result = generatePersona(input);
      const snapshot = buildPersonaOutputSnapshot(result);
      outputs.push(snapshot.motherCodeCard);
    }

    const serialized = outputs.map((output) => JSON.stringify(output));
    const first = serialized[0];
    const diffs = serialized
      .map((output, index) => (output === first ? null : { index, value: outputs[index] }))
      .filter(Boolean);

    globalThis.__GY_MOTHER_CARD_DETERMINISM_RESULT__ = {
      pass: serialized.every((output) => output === first),
      runs: outputs.length,
      uniqueCount: new Set(serialized).size,
      diffs,
    };
  `,
);

await build({
  entryPoints: [entryPath],
  outfile: outPath,
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});

await import(`${pathToFileURL(outPath).href}?t=${Date.now()}`);

const result = globalThis.__GY_MOTHER_CARD_DETERMINISM_RESULT__;
const pass = Boolean(result?.pass && result.uniqueCount === 1 && result.diffs.length === 0);

console.log(`✔ Determinism Check: ${pass ? "PASS" : "FAIL"}`);
console.log(`Runs: ${result?.runs ?? 0}`);
console.log(`Unique: ${result?.uniqueCount ?? 0}`);
console.log(`Diffs: ${JSON.stringify(result?.diffs ?? [])}`);

if (!pass) {
  process.exit(1);
}
