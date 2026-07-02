export const GUANYAO_ROUTES = {
  launch: "/launch",
  motherCode: "/mother-code",
  // Deprecated / isolated legacy route. Kept as a named path only; not active in the forward user flow.
  pressureSeed: "/pressure-seed",
  // Deprecated / isolated legacy route. Kept as a named path only; not active in the forward user flow.
  hexagramStamp: "/hexagram-stamp",
  dynamics: "/dynamics",
  breachScan: "/breach-scan",
  yaoDevice: "/yao-device",
  repairMethod: "/repair-method",
  archive: "/archive",
} as const;

export const LEGACY_ISOLATED_ROUTES = {
  [GUANYAO_ROUTES.pressureSeed]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
  [GUANYAO_ROUTES.hexagramStamp]: "DEPRECATED / ISOLATED / NOT IN ACTIVE FLOW",
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
