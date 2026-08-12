import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[not-attempted-checkpoint] ${message}`);
};

const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const semantic = read("src/services/xinmaiJourneySemanticPresentationResolver.ts");
const styles = read("src/styles/xinmai-lived-response-checkpoint.css");
const packageJson = read("package.json");
const pendingStart = surface.indexOf("pendingNoFactResolution !== null ?");
const pendingEnd = surface.indexOf(") : (\n          <>", pendingStart);

assert(pendingStart >= 0 && pendingEnd > pendingStart, "pending branch is not inspectable");
const pendingBranch = surface.slice(pendingStart, pendingEnd);

for (const copy of [
  "你准备带回生活的这一步",
  "这次先结束；以后想试，再开始一次新的现实实验。",
]) {
  assert(pendingBranch.includes(copy), `missing plain-language contract: ${copy}`);
}
for (const copy of [
  "这次还没试",
  "实验会留在这里，真正发生后再回来。",
  "先回到生活",
  "换一个实验",
  "这次不记录",
  "结束本轮",
  "返回重新选择",
]) {
  assert(semantic.includes(copy), `semantic owner missing plain-language contract: ${copy}`);
}

assert(
  !pendingBranch.includes("Fact 或 Crystal") &&
    !pendingBranch.includes("事实或 Crystal") &&
    !pendingBranch.includes("不会形成 Fact") &&
    !pendingBranch.includes("不会形成 Crystal"),
  "public pending branch exposes internal Fact / Crystal jargon",
);

assert(
  surface.includes('pendingNoFactResolution === null ? (\n        <header') &&
    surface.includes("admissions.length > 1 &&\n      pendingNoFactResolution === null"),
  "generic header or choice switcher still competes with the pending decision",
);
assert(
  pendingBranch.includes("resolveWithoutFact(pendingNoFactResolution)") &&
    pendingBranch.includes("setPendingNoFactResolution(null)"),
  "primary Authority command or presentation-local cancellation drifted",
);
assert(
  styles.includes("min-height: 44px") &&
    styles.includes(":focus-visible") &&
    styles.includes("safe-area-inset-bottom") &&
    styles.includes("overflow-wrap: anywhere") &&
    styles.includes("prefers-reduced-motion: reduce"),
  "mobile, focus, or Reduced Motion contract is incomplete",
);
assert(
  packageJson.includes('"check:xinmai-not-attempted-return-checkpoint-plain-language"'),
  "direct gate is not registered",
);

console.log("[XINMAI NOT ATTEMPTED RETURN CHECKPOINT PLAIN LANGUAGE] PASS");
