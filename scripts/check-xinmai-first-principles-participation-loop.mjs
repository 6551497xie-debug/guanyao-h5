import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[first-principles-participation] ${message}`);
};

const choreography = read("src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const map = read("src/components/XinmaiSixDimensionResponseMap.tsx");
const returned = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const ownership = read("src/components/XinmaiCrystalFormationOwnershipMoment.tsx");
const timing = read("src/services/genesisFrozenTimelineTiming.ts");
const genesis = read("src/pages/GenesisProductionExperiencePage.tsx");
const sixCss = read("src/styles/xinmai-six-dimension-semantic-choreography.css");

for (const copy of [
  "身体先在哪里发出信号",
  "紧接着出现的感受",
  "脑中最先给出了什么判断",
  "这个判断最先把你推向哪里",
  "过去也出现过吗",
  "最怕失去什么",
]) assert(choreography.includes(copy), `missing causal-path prompt: ${copy}`);

assert(
  guide.includes("void chooseResponse(response)") &&
    guide.includes("await saveResponse(response)") &&
    !guide.includes("第一次靠近") &&
    !guide.includes("第二次靠近") &&
    !guide.includes("第三次靠近"),
  "six-dimension still behaves like a repeated ritual or separate-save questionnaire",
);
assert(
  map.includes("自动反应路径") &&
    map.includes("身体与安全正在保护什么") &&
    map.includes("关系、身份或规则正在要求什么") &&
    map.includes("你愿意把什么价值带到未来"),
  "response path or three-layer lens is incomplete",
);
assert(
  returned.includes("补充一条现实细节（可选）") &&
    returned.includes("只选结果就可以；补充细节完全可选。") &&
    !returned.includes("实验编号") &&
    !returned.includes("compact\n                />"),
  "Return/Ownership still requires feedback prose or repeats the full map",
);
assert(
  ownership.includes("查看本轮现实实验的模型更新") &&
    ownership.includes("查看本轮更新，或直接开始下一次实验。"),
  "ownership does not close the reality experiment loop",
);
for (const reviewedTiming of [
  "MOON_ORIGIN: 900",
  "STAR_RIVER: 700",
  "SYMBOL_REVEAL: 1200",
  "LIFE_FORCE: 1200",
  "STAR_BEAST_REVEAL: 800",
]) assert(timing.includes(reviewedTiming), `Genesis still uses long wait: ${reviewedTiming}`);
assert(genesis.includes("LIFE_ORIGIN_DISCOVERY_DURATION_MS = 1_800"), "Genesis discovery still strands the user in a long wait");
assert(sixCss.includes("min-height: 52px") && sixCss.includes("grid-template-columns: 1fr"), "mobile action hierarchy is incomplete");

console.log("[XINMAI FIRST-PRINCIPLES PARTICIPATION LOOP] PASS");
