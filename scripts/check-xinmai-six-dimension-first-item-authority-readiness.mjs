import { readFileSync } from "node:fs";
const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(`[six-dimension-first-item-readiness] ${message}`); };
const page = read("src/pages/GravityPage.tsx");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");

assert(page.includes('sixDimensionAuthority.status === "LOADING"') && page.includes('sixDimensionAuthority.observationSet?.lifecycle === "OPEN"') && page.includes('currentCanonicalDimensionItem.state !== "OBSERVED"') && page.includes("!sixDimensionMutationPending") && page.includes("const sixDimensionCommitReady ="), "typed readiness is not canonical");
assert(page.includes("if (!sixDimensionCommitReady || dimensionTransitionLockRef.current)") && page.includes("setSixDimensionMutationPending(true);") && page.includes("setSixDimensionMutationPending(false);"), "commit can race OPEN or duplicate pending mutation");
assert(guide.includes('finalActionState === "PREPARING"') && guide.includes('finalActionState === "SAVING"') && guide.includes("finalDisabled") && guide.includes('aria-live="polite"') && guide.includes("正在准备保存；你的选择还没有丢失。") && guide.includes("正在加入反应路径"), "pre-persistence state is not visible or accessible");
assert(guide.includes("const saved = await onContinue?.(response);") && guide.includes("if (saved) {") && guide.includes("committedResponseRef.current = response.id"), "saved presentation can precede canonical success");
assert(guide.includes('finalActionState === "RETRYABLE"') && guide.includes("重新加入路径") && guide.includes('finalActionState === "SAFE_WITHHELD"') && guide.includes("已经完成的步骤不受影响"), "typed recovery/protection is not preserved");
assert(!guide.includes("setTimeout") && !page.includes("setTimeout(() => setSixDimensionMutationPending"), "readiness uses a timer");
console.log("[XINMAI SIX-DIMENSION FIRST ITEM AUTHORITY READINESS] PASS");
