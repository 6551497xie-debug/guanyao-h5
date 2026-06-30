#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const generationFile = "src/services/guanyaoDeterministicPersonaEngine.ts";

const uiPrefixes = [
  "src/App.tsx",
  "src/main.tsx",
  "src/pages/",
  "src/components/",
  "src/canvas/",
];

const inferencePrefix = "src/inference/";

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

function classify(file) {
  if (file === generationFile) return "generation";
  if (file.startsWith(inferencePrefix)) return "inference";
  if (uiPrefixes.some((prefix) => file === prefix || file.startsWith(prefix))) return "ui";
  return "support";
}

function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith(".")) return null;

  const fromDir = path.dirname(path.join(root, fromFile));
  const base = path.resolve(fromDir, specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return toPosix(path.relative(root, candidate));
  }

  return null;
}

function importSpecifiers(source) {
  const specs = [];
  const importPattern = /import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;
  let match;

  while ((match = importPattern.exec(source))) {
    specs.push(match[1]);
  }

  return specs;
}

const files = walk(srcRoot).map((file) => toPosix(path.relative(root, file)));
const violations = [];
const graph = new Map();

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const layer = classify(file);
  const deps = [];

  for (const specifier of importSpecifiers(source)) {
    const resolved = resolveImport(file, specifier);
    if (!resolved) continue;

    deps.push(resolved);
    const targetLayer = classify(resolved);

    if (layer === "ui" && targetLayer === "inference") {
      violations.push(`${file} imports inference layer ${resolved}`);
    }

    if (layer === "inference" && targetLayer === "ui") {
      violations.push(`${file} imports UI layer ${resolved}`);
    }

    if (layer === "generation" && targetLayer === "ui") {
      violations.push(`${file} imports UI layer ${resolved}`);
    }

    if (layer === "inference" && targetLayer === "generation" && /generateMotherCode|generatePersona/.test(source)) {
      violations.push(`${file} imports generation output functions instead of read-only feedback types`);
    }
  }

  graph.set(file, deps);

  if (file !== generationFile && /\bexport\s+function\s+generateMotherCode\b/.test(source)) {
    violations.push(`${file} exports generateMotherCode outside deterministic generation layer`);
  }

  if (file !== generationFile && /\bgenerateMotherCodeFrom/.test(source)) {
    violations.push(`${file} contains legacy generateMotherCodeFrom* naming outside deterministic generation layer`);
  }

  if (file !== generationFile && /axisMotherCode/.test(source)) {
    violations.push(`${file} writes or references legacy axisMotherCode key`);
  }
}

function hasPath(start, target, seen = new Set()) {
  if (start === target) return true;
  if (seen.has(start)) return false;
  seen.add(start);

  for (const dep of graph.get(start) ?? []) {
    if (hasPath(dep, target, seen)) return true;
  }

  return false;
}

for (const file of files) {
  const layer = classify(file);
  if (layer !== "generation" && layer !== "inference") continue;

  for (const dep of graph.get(file) ?? []) {
    const targetLayer = classify(dep);
    if ((layer === "generation" && targetLayer === "inference") || (layer === "inference" && targetLayer === "generation")) {
      if (hasPath(dep, file)) {
        violations.push(`circular dependency detected between ${file} and ${dep}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error("[ARCH LAYER ISOLATION] FAIL");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("[ARCH LAYER ISOLATION] PASS");
