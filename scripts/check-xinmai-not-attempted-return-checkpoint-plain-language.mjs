import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[not-attempted-checkpoint] ${message}`);
};

const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const styles = read("src/styles/xinmai-lived-response-checkpoint.css");
const packageJson = read("package.json");
const pendingStart = surface.indexOf("pendingNoFactResolution !== null ?");
const pendingEnd = surface.indexOf(") : (\n          <>", pendingStart);

assert(pendingStart >= 0 && pendingEnd > pendingStart, "pending branch is not inspectable");
const pendingBranch = surface.slice(pendingStart, pendingEnd);

for (const copy of [
  "你准备带回生活的这一步",
  "还没有在现实里试过，也没关系。",
  "这次不会留下成长记录。你可以先把这一步带回生活，真正试过以后再回来；如果刚才选错了，也可以返回重新选择。",
  "先回到生活",
  "保留这一步，不留下成长记录；等你真正试过，再从返回入口继续。",
  "返回重新选择",
  "不想留下这次记录，也可以。",
  "确认不记录，回到生命世界",
]) {
  assert(pendingBranch.includes(copy), `missing plain-language contract: ${copy}`);
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
