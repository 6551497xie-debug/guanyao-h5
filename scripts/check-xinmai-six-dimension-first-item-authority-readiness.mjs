import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[six-dimension-first-item-readiness] ${message}`);
  }
};

const page = read("src/pages/GravityPage.tsx");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  page.includes('sixDimensionAuthority.status === "LOADING"') &&
    page.includes('sixDimensionAuthority.observationSet?.lifecycle === "OPEN"') &&
    page.includes('currentCanonicalDimensionItem.state !== "OBSERVED"') &&
    page.includes("!sixDimensionMutationPending") &&
    page.includes("const sixDimensionCommitReady ="),
  "final commit readiness is not derived from the typed canonical authority",
);

assert(
  page.includes("if (!sixDimensionCommitReady || dimensionTransitionLockRef.current)") &&
    page.includes("setSixDimensionMutationPending(true);") &&
    page.includes("setSixDimensionMutationPending(false);") &&
    page.includes("return await handleSpatialInteraction"),
  "the commit path can run before OPEN or accept duplicate in-flight clicks",
);

assert(
  guide.includes('finalActionState === "PREPARING"') &&
    guide.includes('finalActionState === "SAVING"') &&
    guide.includes('aria-busy={') &&
    guide.includes("disabled={") &&
    guide.includes("生命观察正在准备，尚未保存") &&
    guide.includes("这一维观察尚未保存"),
  "loading, pending and pre-persistence semantics are not visible and accessible",
);

assert(
  guide.includes("const saved = await onContinue?.();") &&
    guide.includes("if (saved) setLifeContinuityStable(true);") &&
    !guide.includes("setLifeContinuityStable(true);\n                onContinue"),
  "terminal continuity can be entered before the canonical item is saved",
);

assert(
  page.includes('sixDimensionAuthority.cause?.retryability !== "NOT_RETRYABLE"') &&
    guide.includes('finalActionState === "RETRYABLE"') &&
    guide.includes("重新保存这一维观察") &&
    guide.includes('finalActionState === "SAFE_WITHHELD"') &&
    guide.includes("已有生命记录仍被保留") &&
    guide.includes("先停在这里"),
  "typed retryability is not preserved as a recoverable or protective presentation",
);

assert(
  page.includes('[data-scene-semantic-mirror="GRAVITY_RECOGNIZED"]') &&
    page.includes("生命观察正在准备；已保存") &&
    page.includes('data-six-dimension-commit-readiness={'),
  "global Gravity recognition can still masquerade as a persisted dimension item",
);

assert(
  !page.includes("setTimeout(() => setSixDimensionMutationPending") &&
    !guide.includes("setTimeout(() => setContinuePending"),
  "readiness is delayed by a timer instead of the typed authority",
);

assert(
  packageJson.scripts[
    "check:xinmai-six-dimension-first-item-authority-readiness"
  ] ===
    "node scripts/check-xinmai-six-dimension-first-item-authority-readiness.mjs" &&
    packageJson.scripts["check:xinmai-lived-growth-authority"].includes(
      "check:xinmai-six-dimension-first-item-authority-readiness",
    ),
  "the corrective gate is not fully registered",
);

console.log("[XINMAI SIX-DIMENSION FIRST ITEM AUTHORITY READINESS] PASS");
