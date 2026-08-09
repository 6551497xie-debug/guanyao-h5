import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const page = read("src/pages/GravityPage.tsx");
const host = read("src/components/GravityProductionSurfaceHost.tsx");
const route = read("src/pages/GravityProductionRouteEntry.tsx");

const requireMarker = (source, marker, label) => {
  if (!source.includes(marker)) {
    throw new Error(`${label} missing ${marker}`);
  }
};

for (const [source, marker, label] of [
  [page, "onExplicitDepartureCommitted: () => void", "page typed handoff"],
  [page, "onExplicitDepartureCommitted();", "confirmed departure handoff"],
  [host, "onExplicitDepartureCommitted={onExplicitDepartureCommitted}", "host typed forwarding"],
  [route, 'navigate("/launch-lab", { replace: true })', "route-owned navigation"],
  [route, "onExplicitDepartureCommitted={", "production route wiring"],
]) {
  requireMarker(source, marker, label);
}

requireMarker(
  host,
  "noNavigation: true as const",
  "surface host navigation boundary",
);
requireMarker(
  page,
  'departed.status !== "DEPARTED"',
  "canonical departure result guard",
);
requireMarker(
  page,
  'departed.status !== "ALREADY_DEPARTED"',
  "idempotent departure result guard",
);

if (page.includes('navigate("/launch-lab"')) {
  throw new Error("page bypasses route-owned formal handoff");
}

console.log("[XINMAI FORMAL PRODUCT CHAIN DEPARTURE HANDOFF] PASS");
