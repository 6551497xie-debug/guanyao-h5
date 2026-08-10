import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[six-dimension-reflection-reset] ${message}`);
  }
};

const page = read("src/pages/GravityPage.tsx");
const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  page.includes("key={sequentialCurrentSpaceId}") &&
    page.includes(
      "data-dynamics-dimension-presentation-token={`${activeConfig.id}:${activeDimensionStep}`}",
    ),
  "the presentation instance is not scoped to the active canonical dimension",
);

assert(
  page.includes('>("OBSERVING");') &&
    page.includes("useState(false);") &&
    !page.includes("initialInnerViewRelation={innerViewRelation}"),
  "a new dimension can inherit a prior confirmed relation or phase",
);

const lifeCoreHandler = page.slice(
  page.indexOf("function handleLifeCoreApproach()"),
  page.indexOf("return (", page.indexOf("function handleLifeCoreApproach()")),
);
assert(
  lifeCoreHandler.includes("approachLifeState();") &&
    !lifeCoreHandler.includes("onNodeBloom();"),
  "the visual life core can bypass the dimension-specific final action",
);

const explicitContinuation = page.slice(
  page.indexOf("function continueObservation()"),
  page.indexOf("function handleLifeCoreApproach()"),
);
assert(
  explicitContinuation.includes("if (!innerViewRelationEstablished) return false;") &&
    explicitContinuation.includes("return onNodeBloom();"),
  "the explicit final continuation is not the sole item-commit presentation path",
);

assert(
  page.includes('role="status"') &&
    page.includes('aria-live="polite"') &&
    page.includes('data-dynamics-current-dimension-label={currentDimensionLabel}') &&
    page.includes("当前观察 · {currentDimensionLabel}"),
  "the pending dimension is not visibly and accessibly identified",
);

assert(
  guide.includes("const [lifeContinuityStable, setLifeContinuityStable] = useState(false)") &&
    guide.includes("setLifeContinuityStable(true);") &&
    guide.includes("const saved = await onContinue?.();") &&
    guide.includes("if (saved) setLifeContinuityStable(true);"),
  "the final local settling state is not explicit or resettable by dimension remount",
);

assert(
  packageJson.scripts[
    "check:xinmai-six-dimension-per-dimension-reflection-state-reset"
  ] ===
    "node scripts/check-xinmai-six-dimension-per-dimension-reflection-state-reset.mjs" &&
    packageJson.scripts["check:xinmai-lived-growth-authority"].includes(
      "check:xinmai-six-dimension-per-dimension-reflection-state-reset",
    ),
  "corrective gate is not fully registered",
);

console.log("[XINMAI SIX-DIMENSION PER-DIMENSION REFLECTION RESET] PASS");
