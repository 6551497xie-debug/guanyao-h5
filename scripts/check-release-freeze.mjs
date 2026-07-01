#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const freezeFile = path.join(root, "src/governance/releaseFreeze.ts");

const requiredMarkers = [
  "RELEASE_FREEZE: true",
  "ARCHITECTURE_LOCKED: true",
  'EVOLUTION_MODE: "OFF"',
  "deterministic engine architecture",
  "trigger system",
  "snapshot system",
  "render system",
  "protocol system",
  "add new engines",
  "modify generation flow",
  "change snapshot schema",
  "introduce new state machines",
  "alter trigger logic",
];

const violations = [];

if (!fs.existsSync(freezeFile)) {
  violations.push("missing src/governance/releaseFreeze.ts");
} else {
  const source = fs.readFileSync(freezeFile, "utf8");

  for (const marker of requiredMarkers) {
    if (!source.includes(marker)) {
      violations.push(`missing freeze marker: ${marker}`);
    }
  }

  if (!/Object\.freeze\(\{/.test(source)) {
    violations.push("release freeze state must be Object.freeze");
  }
}

if (violations.length > 0) {
  console.error("[RELEASE FREEZE] FAIL");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("[RELEASE FREEZE] PASS");
