#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contractPath = path.join(root, "src/expression/guanyaoExpressionLayerV1.ts");
const source = fs.readFileSync(contractPath, "utf8");

const requiredSnippets = [
  "This layer is NOT expandable.",
  "你在压力下更倾向于：先收敛再行动",
  "你会在观察完成后才启动关键决策",
  "你更倾向保持边界清晰，而非持续融合",
  "收缩: \"光点聚合\"",
  "展开: \"光场扩散\"",
  "稳定: \"光点均匀\"",
  "波动: \"光点闪烁\"",
  "\"behaviorProfile\"",
  "\"lightBeastState\"",
  "\"geoAnchor\"",
  "\"chronoState\"",
];

const forbiddenSnippets = [
  "原力人格",
  "天赋人格",
  "神兽化",
  "动物化",
  "角色化对话",
  "八卦解释",
  "星宿解释",
  "卦名解释",
];

const failures = [];

for (const snippet of requiredSnippets) {
  if (!source.includes(snippet)) {
    failures.push(`missing required expression contract: ${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (source.includes(snippet)) {
    failures.push(`forbidden expression drift inside V1 contract: ${snippet}`);
  }
}

if (failures.length > 0) {
  console.error("[EXPRESSION LAYER V1] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("[EXPRESSION LAYER V1] PASS");
