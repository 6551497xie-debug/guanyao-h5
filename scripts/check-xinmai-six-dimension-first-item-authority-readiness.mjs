import { readFileSync } from "node:fs";
const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(`[six-dimension-first-item-readiness] ${message}`); };
const page = read("src/pages/GravityPage.tsx");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");

assert(page.includes('sixDimensionAuthority.status === "LOADING"') && page.includes('sixDimensionAuthority.observationSet?.lifecycle === "OPEN"') && page.includes('currentCanonicalDimensionItem.state !== "OBSERVED"') && page.includes("!sixDimensionMutationPending") && page.includes("const sixDimensionCommitReady ="), "typed readiness is not canonical");
assert(page.includes("if (!sixDimensionCommitReady || dimensionTransitionLockRef.current)") && page.includes("setSixDimensionMutationPending(true);") && page.includes("setSixDimensionMutationPending(false);"), "commit can race OPEN or duplicate pending mutation");
assert(guide.includes('finalActionState === "PREPARING"') && guide.includes('finalActionState === "SAVING"') && guide.includes("finalDisabled") && guide.includes('aria-busy={') && guide.includes("生命观察正在准备，尚未保存") && guide.includes("确认保存后才会成为生命观察"), "pre-persistence state is not visible or accessible");
assert(guide.includes("const saved = await onContinue?.(selectedResponse);") && guide.includes("if (saved) setSavedAnnouncement") && !guide.includes("onContinue?.(selectedResponse);\n              setSavedAnnouncement"), "saved presentation can precede canonical success");
assert(guide.includes('finalActionState === "RETRYABLE"') && guide.includes("重新${grammar.acknowledgementLabel}") && guide.includes('finalActionState === "SAFE_WITHHELD"') && guide.includes("已有生命记录仍被保留"), "typed recovery/protection is not preserved");
assert(!guide.includes("setTimeout") && !page.includes("setTimeout(() => setSixDimensionMutationPending"), "readiness uses a timer");
console.log("[XINMAI SIX-DIMENSION FIRST ITEM AUTHORITY READINESS] PASS");
