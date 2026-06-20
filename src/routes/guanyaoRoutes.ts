export const GUANYAO_ROUTES = {
  launch: "/launch",
  motherCode: "/mother-code",
  pressureSeed: "/pressure-seed",
  hexagramStamp: "/hexagram-stamp",
  dynamics: "/dynamics",
  breachScan: "/breach-scan",
  yaoDevice: "/yao-device",
  repairMethod: "/repair-method",
  archive: "/archive",
} as const;

export const LEGACY_ROUTE_REDIRECTS = {
  "/chrono": GUANYAO_ROUTES.motherCode,
  "/force": GUANYAO_ROUTES.motherCode,
  "/scene": GUANYAO_ROUTES.pressureSeed,
  "/identity": GUANYAO_ROUTES.dynamics,
  "/gravity": GUANYAO_ROUTES.dynamics,
  "/collapse": GUANYAO_ROUTES.dynamics,
  "/choice": GUANYAO_ROUTES.breachScan,
  "/migration": GUANYAO_ROUTES.yaoDevice,
  "/result": GUANYAO_ROUTES.repairMethod,
} as const;
