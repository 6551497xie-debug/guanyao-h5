export const GUANYAO_ROUTES = {
  launch: "/launch",
  genesis: "/genesis",
  reality: "/reality",
  // DEPRECATED / ISOLATED. Kept as a named path only; /launch-lab owns the active 1.0 mother-card flow.
  motherCode: "/mother-code",
  // DEPRECATED / ISOLATED. Kept as a named path only; not active in the forward user flow.
  pressureSeed: "/pressure-seed",
  // DEPRECATED / ISOLATED. Kept as a named path only; not active in the forward user flow.
  hexagramStamp: "/hexagram-stamp",
  dynamics: "/dynamics",
  // DEPRECATED / ISOLATED. Legacy breach scan is not part of the active 1.0 forward flow.
  breachScan: "/breach-scan",
  // DEPRECATED / ISOLATED. Legacy yao-device is not part of the active 1.0 forward flow.
  yaoDevice: "/yao-device",
  // DEPRECATED / ISOLATED. Legacy repair-method is not part of the active 1.0 forward flow.
  repairMethod: "/repair-method",
  // DEPRECATED / ISOLATED. Legacy archive is not part of the active 1.0 forward flow.
  archive: "/archive",
} as const;

export const LEGACY_ISOLATED_ROUTES = {
  [GUANYAO_ROUTES.motherCode]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.pressureSeed]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.hexagramStamp]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.breachScan]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.yaoDevice]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.repairMethod]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.archive]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
} as const;

export const LEGACY_ROUTE_REDIRECTS = {
  "/chrono": GUANYAO_ROUTES.motherCode,
  "/force": GUANYAO_ROUTES.motherCode,
  "/scene": GUANYAO_ROUTES.dynamics,
  "/identity": GUANYAO_ROUTES.dynamics,
  "/gravity": GUANYAO_ROUTES.dynamics,
  "/collapse": GUANYAO_ROUTES.dynamics,
  "/choice": GUANYAO_ROUTES.breachScan,
  "/migration": GUANYAO_ROUTES.yaoDevice,
  "/result": GUANYAO_ROUTES.repairMethod,
} as const;
