import fs from "node:fs";

const page = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const route = fs.readFileSync(
  "src/pages/GravityProductionRouteEntry.tsx",
  "utf8",
);
const host = fs.readFileSync(
  "src/components/GravityProductionSurfaceHost.tsx",
  "utf8",
);
const resolver = fs.readFileSync(
  "src/services/xinmaiChoicePresentationReadinessResolver.ts",
  "utf8",
);

const requireSource = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
};
const forbidSource = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
};

requireSource(
  "browser readiness mirror",
  page,
  "data-choice-presentation-readiness",
);
requireSource(
  "browser reason mirror",
  page,
  "data-choice-presentation-reason",
);
requireSource(
  "browser terminal mirror",
  page,
  "data-choice-growth-terminal-summary",
);
requireSource(
  "route rereads on revision",
  route,
  "subscribeToXinmaiLivedGrowthRecoveryRevision",
);
requireSource(
  "host typed forwarding",
  host,
  "growthTerminalSummary={growthTerminalSummary}",
);
requireSource(
  "host resolves typed Action Routes",
  host,
  "resolveProductionChoiceActionRoutes({",
);
requireSource(
  "host forwards typed Action Routes",
  host,
  "actionRouteResolution={actionRouteResolution}",
);
requireSource(
  "resolver motion agnostic",
  resolver,
  "noCommitAuthority: true",
);
forbidSource(
  "resolver reduced-motion branch",
  resolver,
  "prefers-reduced-motion",
);
forbidSource(
  "page dom reverse read",
  page,
  "closest(",
);
forbidSource(
  "page mutation observer authority",
  page,
  "MutationObserver",
);

console.log("[XINMAI GRAVITY CHOICE PRESENTATION BROWSER CONTRACT] PASS");
